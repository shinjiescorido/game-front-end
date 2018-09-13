<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Redirect;
use App;
use DB;
use Auth;
use Carbon\Carbon;

class PaigowController extends Controller
{
    /**
     * Language map
     *
     * @var array
     */
    protected $map = [
        'japan' => 'jp',
        'korea' => 'kr',
        'english' => 'en',
        'chinese' => 'zh',
        'thai' => 'th'
    ];
    public function setGameSettings(Request $r) {
        $default = json_decode(Auth::user()->last_game_info);

        if(!is_null($r->input('game')))
            $default->game = $r->input('game');
        // dd($r->input('slave'), $r->input('range'), $r->input('game'));

        if(!is_null($r->input('data')))
            $default->multibet = $r->input('data');

        if(!is_null($r->input('range')))
            $default->bet_range = $r->input('range');
        if(!is_null($r->input('slave')))
            $default->slave = $r->input('slave') === 'classic' ? '' : $r->input('slave');
        if(!is_null($r->input('multiplayer')))
            $default->multi_yn = $r->input('multiplayer');

        app('db')->table('users')->where('id', app('auth')->user()->id)
        ->update([
            'last_game_info' => json_encode($default)
        ]);

    }
    /**
     * Check if maintenance setting has 1 or more true statuses,
     * returns true if none
     *
     * @param $table
     * @return bool
     */
     public function isLive($table)
     {
         $maintenance = app('db')->connection('paigow')
             ->table('game_tables')
             ->where('id', $table)
             ->first();

         $maintenance = is_object($maintenance) ? json_decode($maintenance->maintenance_setting, true) : [];

         return !array_filter($maintenance, function ($row) {
             return (int) $row['status'];
         });
     }

    /**
     * @param $table
     * @param $range
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
     public function init($table, $gameType = null)
     {
        $user = Auth::user();
        $userId = app('auth')->user()->id;
        $userType = app('auth')->user()->user_type;

        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();
        // Bet range start
        // $currRange = explode("-",$range);
        $hasRange = false;

        if (!$this->isLive($table) && $user->authority != "a") {
            // return redirect('https://lobby.nihtanv2.com/?game=true');
        }

        // Check if user is banker in Sicbo
        $isPlayer = $this->checkBanker();

        // === Currency
        $currencyArr = $this->getCurrencyData();
        $currencyMultiplier = $currencyArr[0]->multiplier;
        $currencyAbbrev = $currencyArr[0]->currency;
        $mainMultiplier = $currencyArr[0]->main_multiplier;

        //Check room if normal or created room
        $isBanker = 0;
        $isRoom = 0;
        $vendorData = [];
        if (isset($_GET['token'])) {
            $vendorData = $this->getVendor($_GET['token'], $table, null, $gameType);
            //$checkRoom = $this->checkRoom($_GET['token'], $table, $range);
            if ($vendorData == false) {
                app('log')->info('here 2::: ->' . json_encode($vendorData));
                return Redirect::to('http://lobby.nihtanv2.com?game=true');
            }

            if ($gameType == null) {
                $checkRoom = $this->checkRoom($_GET['token'], $table, $range, $gameType);
                dd($checkRoom);
                if ($checkRoom[0]->flag == 'true') {
                    $isRoom = 1;

                    if ($checkRoom[0]->cnt > 0) {
                        $isBanker = 1;
                    }
                }
                else {
                    return Redirect::to(env('LOBBY_DOMAIN').'?game=true');
                }
            }
        }

        // // === start of range === //
        $rangeInfo = $this->getBetRangeInfo($userId, $table);
        if ($userType == 'C' || $userType == 'TC') {
            $currentRange = json_decode($rangeInfo[0]->casino_bet_ranges);
        }
        else if ($userType == 'S' || $userType == 'TS') {
            $currentRange = json_decode($rangeInfo[0]->sport_bet_ranges);
        }

        // $hasRange = true;
        //$range = $rangeDetails->min.'-'.$rangeDetails->max;
        
        $rangeDetails = $currentRange[0];
        $hasRange = true;
        $range = $rangeDetails->min.'-'.$rangeDetails->max;
        
        $isMatch = false;
        //agent range
        $usergroup= Auth::user()->user_group_id;
        $agentRange = [];
        if(!is_null($usergroup)) {
            $agentRange = $group_data = DB::connection('nihtan_api')->table('user_groups')
                ->where('vendor_id', Auth::user()->vendor_id)
                ->where('id', $usergroup)
                ->get();

            if(!$agentRange->isEmpty()) {
                $tableInfo = DB::connection('paigow')->table('game_tables')
                    ->where('id', $table)
                    ->get();

                $roomType = $tableInfo[0]->room_type;
                $isFlippy = (int) $table === 1 || (int) $table === 2;

                $roomType = ($table == 2 || $table == 1) ? $roomType.'f' : $roomType;
                
                $agentRange = json_decode($agentRange[0]->ranges);


                for($x = 0; $x < count($agentRange); $x++) {

                    if($agentRange[$x]->type == 'vip') {
                        $rtype = 'v';
                    } else if($agentRange[$x]->type == 'premium') {
                        $rtype = 'p';
                    } else {
                        $rtype = 'n';
                    }

                    $agentFlippy = strtolower($agentRange[$x]->gameType) === 'flippy';

                    $rtype = $agentFlippy  ? $rtype.'f' : $rtype;

                    if($agentRange[$x]->game === env('CUR_GAME') && $rtype === $roomType) {
                        $currentRange = $agentRange[$x]->ranges;
                    }
                }
            } // end if not empty collection

            $agentRange = empty($agentRange) ? [] : $agentRange;
        }
        //getting range using gameinfo
        //game info
        $gameInfo = Auth::user()->last_game_info;

        $gamesettings = json_decode($gameInfo);

        if($gamesettings->game === env('CUR_GAME').'/'.$table) {
            $range = $gamesettings->bet_range;
            $slave = $gamesettings->slave;
            $multiplayer = $gamesettings->multi_yn;

            for($x = 0; $x < count($currentRange); $x++) {
                $min =  explode('-', $range)[0];
                $max =  explode('-', $range)[1];

                if($min == $currentRange[$x]->min && $max == $currentRange[$x]->max) {
                    $rangeDetails = $currentRange[$x];       
                    $isMatch = true;
                }
            }
        }


        // if(isset($config->avarta->range)) {
        //     $range  = $config->avarta->range;

        //     for($x = 0; $x < count($currentRange); $x++) {
        //         $min =  explode('-', $range)[0];
        //         $max =  explode('-', $range)[1];

        //         if($min == $currentRange[$x]->min && $max == $currentRange[$x]->max) {
        //             $rangeDetails = $currentRange[$x];       
        //             $isMatch = true;
        //         }
        //     }
        // }
        
        // checking if betrange on config matches betranges in table. if not, use minimum betrange as default
        if(!$isMatch) {
            $rangeDetails = $currentRange[0];
            $range = $currentRange[0]->min.'-'.$currentRange[0]->max;
            $multiplayer = 0;
        }

        if(!empty($vendorData) && $range != $vendorData['betRange']) {
            if($vendor->lobby_type === 'integrated') {
                return Redirect::to(Auth::user()->pc_redirect_url);
            } else {
                return Redirect::to(env('LOBBY_DOMAIN').'3');
            }
        }

        if (!$hasRange) {
            // return Redirect::to('http://lobby.nihtanv2.com/?game=true');
        }

        // Bet range end
        $stream = json_decode($rangeInfo[0]->env_setting);
        $betConfig = json_decode($rangeInfo[0]->bet_setting);

        $data = DB::connection('paigow');

        $round_id = $data->table('rounds')
            ->where('table_id', $table)
            ->orderBy('id','desc')->limit(1)->pluck('round_num');
        $round_id = count($round_id) > 0 ? $round_id[0] : 0;

        $bets = $data->table('bets')->where('user_id', $user->id)->orderBy('id','desc')->first();

        $bets_all = $data->table('bets')->where('user_id', $user->id)
            ->orderBy('id','desc')->paginate(10)->toJson();

        $config = $this->getUserConfig();

        $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

        App::setLocale($locale);

        $currency = app('db')->table('vendors')
        ->where('id', app('auth')->user()->vendor_id)->first()->currency;

        if(empty($config->avarta->chips)) {
            $config->avarta->chips = ["1","5","10","30","max"];
        }

        $vendorEndDate = '';
        if ((int)Auth::user()->is_junket > 0) {
            $vendorEndDate = app('db')->table('vendors')
                ->where('id', app('auth')->user()->vendor_id)->first()->junket_end_date;
        }
        

        //disabled room check
        $checkTable =  gettype($vendor->junket_table) === 'string' ? json_decode($vendor->junket_table) : $vendor->junket_table;
        $currentTable = strtolower(env('CUR_GAME').'-'.$table);

        for($x = 0;$x < count($checkTable->disable_table); $x++) {
            $disabled = strtolower($checkTable->disable_table[$x]);
            if($disabled === $currentTable) {
                if($vendor->lobby_type === 'integrated') {
                    return Redirect::to(Auth::user()->pc_redirect_url);
                } else {
                    return Redirect::to(env('LOBBY_DOMAIN'));
                }
            }
        }

        dd($currentTable);

        return view('index', [
            'config' => $config,
            'stream' => $stream,
            'betConfig' => $betConfig,
            'money' => $this->getUserCredits(),
            'currency' => $currency,
            'user_name' => $user->user_name,
            'round_id' => $round_id,
            'bets' => $bets,
            'all_bets' => $bets_all,
            'tableNum' => $table,
            'range' => $range,
            "rangeDetails" => json_encode($rangeDetails),
            'multiplayer' => $multiplayer,
            'currencyMultiplier' => $currencyMultiplier,
            'currencyAbbrev' => $currencyAbbrev,
            'userMultiplier' => app('auth')->user()->multiplier,
            'userChips' => json_encode($config->avarta->chips),
            'mainMultiplier' => $mainMultiplier,
            'integrationType' => $vendor->integration_type,
            'reel_yn' => $vendor->reel_yn,
            'room_yn' => $vendor->room_info_yn,
            'lobby_redirect_url' => Auth::user()->pc_redirect_url,
            'lobby_type' => $vendor->lobby_type,
            'isRoom' => $isRoom,
            'isBanker' => $isBanker,
            'vendorData' => json_encode($vendorData),
            'isClassic' => empty($vendorData) ? true : false,
            'isPlayer' => $isPlayer[0]->flag,
            'vendor_id' => $vendor->id,
            'allRange' => $currentRange,
            'gameInfo' => $gameInfo,
            'junket' => is_null(Auth::user()->is_junket) ? 0 : Auth::user()->is_junket,
            'agentRange' => json_encode($agentRange),
            'vendorTables' => $vendor->junket_table,
            'vendorEndDate' => $vendorEndDate,
            'vendorSound' => $vendor->is_sound
        ]);
    }

    /**
     * @param $table
     * @param $range
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
     public function initMobile ($table, $range, $multiplayer)
     {
         $user = Auth::user();
         $userId = app('auth')->user()->id;
         $userType = app('auth')->user()->user_type;
 
         if (!$this->isLive($table) && $user->authority != "a") {
             // return redirect('https://lobby.nihtanv2.com/m?game=true');
         }
 
         // Check room if normal or created room
         $isBanker = 0;
         $isRoom = 0;
         $vendorData = [];
         if (isset($_GET['token'])) {
             $vendorData = $this->getVendor($_GET['token'], $table, $range);
             $checkRoom = $this->checkRoom($_GET['token'], $table, $range);
             if ($vendorData == false) {
                 return Redirect::to('http://lobby.nihtanv2.com?game=true');
             }
 
             if ($checkRoom[0]->flag == 'true') {
                 $isRoom = 1;
 
                 if ($checkRoom[0]->cnt > 0) {
                     $isBanker = 1;
                 }
             }
             else {
                 return Redirect::to(env('LOBBY_DOMAIN').'?game=true');
             }
         }
 
         // === Currency
         $currencyArr = $this->getCurrencyData();
         $currencyMultiplier = $currencyArr[0]->multiplier;
         $currencyAbbrev = $currencyArr[0]->currency;
         $mainMultiplier = $currencyArr[0]->main_multiplier;
 
         $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();
         //==== Bet range start
         $currRange = explode("-",$range);
         $hasRange = false;
 
         $rangeInfo = $this->getBetRangeInfo($userId, $table);
         $betConfig = json_decode($rangeInfo[0]->bet_setting);
         if ($userType == 'C' || $userType == 'TC') {
             $currentRange = json_decode($rangeInfo[0]->casino_bet_ranges);
         }
         else if ($userType == 'S' || $userType == 'TS') {
             $currentRange = json_decode($rangeInfo[0]->sport_bet_ranges);
         }
 
         for ($i=0; $i < count($currentRange); $i++) {
             if ($currentRange[$i]->min == $currRange[0] && $currentRange[$i]->max == $currRange[1]) {
                 $rangeDetails = $currentRange[$i];
                 $hasRange = true;
             }
         }
 
         if (!$hasRange) {
             return Redirect::to('http://lobby.nihtanv2.com/m?game=true');
         }
 
         $data = DB::connection('paigow');
         $round_id = $data->table('rounds')->where('table_id',$table)->orderBy('id','desc')->limit(1)->pluck('round_num')[0];
         $bets = $data->table('bets')->where('user_id', $user->id)->orderBy('id','desc')->first();
         $bets_all = $data->table('bets')->where('user_id', $user->id)->orderBy('id','desc')->paginate(10)->toJson();
 
         $config = $this->getUserConfig();
         $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];
 
         App::setLocale($locale);
 
         $currency = app('db')->table('vendors')
           ->where('id', app('auth')->user()->vendor_id)->first()->currency;
 
         if(empty($config->avarta->chips)) {
             $config->avarta->chips = ["1","5","10","30","max"];
         }
 
         return view('index-mobile', [
             'config' => $config,
             'betConfig' => $betConfig,
             'range' => $range,
             'money' => $this->getUserCredits(),
             'currency' => $currency,
             'user_name' => $user->user_name,
             'round_id' => $round_id,
             'bets' => $bets,
             'all_bets' => $bets_all,
             'table' => $table,
             'rangeDetails' => json_encode($rangeDetails),
             'multiplayer' => $multiplayer,
             'currencyMultiplier' => $currencyMultiplier,
             'currencyAbbrev' => $currencyAbbrev,
             'userMultiplier' => app('auth')->user()->multiplier,
             'userChips' => json_encode($config->avarta->chips),
             'mainMultiplier' => $mainMultiplier,
             'integrationType' => $vendor->integration_type,
             'room_yn' => $vendor->room_info_yn,
             'lobby_redirect_url' => Auth::user()->mo_redirect_url,
             'lobby_type' => $vendor->lobby_type,
             'isRoom' => $isRoom,
             'isBanker' => $isBanker,
             'vendorData' => json_encode($vendorData),
             'vendorSound' => $vendor->is_sound
         ]);
     }

    /**
     * @param $table
     * @param $range
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
     public function initNonMobile ($table, $range, $multiplayer)
     {
         $user = Auth::user();
         $userId = app('auth')->user()->id;
         $userType = app('auth')->user()->user_type;
 
         if (!$this->isLive($table) && $user->authority != "a") {
             // return redirect('https://lobby.nihtanv2.com/m?game=true');
         }
 
         // Check room if normal or created room
         $isBanker = 0;
         $isRoom = 0;
         $vendorData = [];
         if (isset($_GET['token'])) {
             $vendorData = $this->getVendor($_GET['token'], $table, $range);
             $checkRoom = $this->checkRoom($_GET['token'], $table, $range);
             if ($vendorData == false) {
                 return Redirect::to('http://lobby.nihtanv2.com?game=true');
             }
 
             if ($checkRoom[0]->flag == 'true') {
                 $isRoom = 1;
 
                 if ($checkRoom[0]->cnt > 0) {
                     $isBanker = 1;
                 }
             }
             else {
                 return Redirect::to(env('LOBBY_DOMAIN').'?game=true');
             }
         }
 
         // === Currency
         $currencyArr = $this->getCurrencyData();
         $currencyMultiplier = $currencyArr[0]->multiplier;
         $currencyAbbrev = $currencyArr[0]->currency;
         $mainMultiplier = $currencyArr[0]->main_multiplier;
 
         $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();
         //==== Bet range start
         $currRange = explode("-",$range);
         $hasRange = false;
 
         $rangeInfo = $this->getBetRangeInfo($userId, $table);
         $betConfig = json_decode($rangeInfo[0]->bet_setting);
         if ($userType == 'C' || $userType == 'TC') {
             $currentRange = json_decode($rangeInfo[0]->casino_bet_ranges);
         }
         else if ($userType == 'S' || $userType == 'TS') {
             $currentRange = json_decode($rangeInfo[0]->sport_bet_ranges);
         }
 
         for ($i=0; $i < count($currentRange); $i++) {
             if ($currentRange[$i]->min == $currRange[0] && $currentRange[$i]->max == $currRange[1]) {
                 $rangeDetails = $currentRange[$i];
                 $hasRange = true;
             }
         }
 
         if (!$hasRange) {
             return Redirect::to('http://lobby.nihtanv2.com/m?game=true');
         }
 
         $data = DB::connection('paigow');
         $round_id = $data->table('rounds')->where('table_id',$table)->orderBy('id','desc')->limit(1)->pluck('round_num')[0];
         $bets = $data->table('bets')->where('user_id', $user->id)->orderBy('id','desc')->first();
         $bets_all = $data->table('bets')->where('user_id', $user->id)->orderBy('id','desc')->paginate(10)->toJson();
 
         $config = $this->getUserConfig();
         $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];
 
         App::setLocale($locale);
 
         $currency = app('db')->table('vendors')
           ->where('id', app('auth')->user()->vendor_id)->first()->currency;
 
         if(empty($config->avarta->chips)) {
             $config->avarta->chips = ["1","5","10","30","max"];
         }
 
         return view('index-mobile-non', [
             'config' => $config,
             'betConfig' => $betConfig,
             'range' => $range,
             'money' => $this->getUserCredits(),
             'currency' => $currency,
             'user_name' => $user->user_name,
             'round_id' => $round_id,
             'bets' => $bets,
             'all_bets' => $bets_all,
             'table' => $table,
             'rangeDetails' => json_encode($rangeDetails),
             'multiplayer' => $multiplayer,
             'currencyMultiplier' => $currencyMultiplier,
             'currencyAbbrev' => $currencyAbbrev,
             'userMultiplier' => app('auth')->user()->multiplier,
             'userChips' => json_encode($config->avarta->chips),
             'mainMultiplier' => $mainMultiplier,
             'integrationType' => $vendor->integration_type,
             'room_yn' => $vendor->room_info_yn,
             'lobby_redirect_url' => Auth::user()->mo_redirect_url,
             'lobby_type' => $vendor->lobby_type,
             'isRoom' => $isRoom,
             'isBanker' => $isBanker,
             'vendorData' => json_encode($vendorData),
              'nonInstall' => true,
             'vendorSound' => $vendor->is_sound
         ]);
     }

    public function checkBanker()
    {
        // T - can enter
        // F - return to lobby
        $token = '';

        if (isset($_GET['token'])) {
            $token = $_GET['token'];
        }

        return DB::select('CALL nihtan_api.USP_GET_BANKER_CHECK(?, ?, ?)', array(app('auth')->user()->id, 'sicbo', $token));
    }

    public function getVendor($token, $table, $range, $gameType)
    {
        $roomData;
        
        if ($range == null) {
            $roomData = DB::connection('paigow')->table("paigow.rooms")
                ->select('user_id', 'id', 'players_cnt', 'title', 'bet_range', 'password')
                ->where('table_id', $table)
                ->where('token', $token)
                ->get()->first();
        }
        else {
            $roomData = DB::connection('paigow')->table("paigow.rooms")
                ->select('user_id', 'id', 'players_cnt', 'title', 'bet_range', 'password')
                ->where('table_id', $table)
                ->where('bet_range', $range)
                ->where('token', $token)
                ->get()->first();
        }

        if ($roomData == null) {
            return false;
        }

        $banker = DB::table('users')
            ->leftJoin('vendors', [
                ['users.vendor_id', '=', 'vendors.id']
            ])
            ->where([
                ['users.id', '=', $roomData->user_id]
            ])
            ->select('users.user_name', 'users.vendor_id', 'users.multiplier', 'vendors.vendor_name')
            ->get()->first();

        $bankerData = [
            'bankerId' => $roomData->user_id,
            'roomId' => $roomData->id,
            'userCnt' => $roomData->players_cnt,
            'title' => $roomData->title,
            'betRange' => $roomData->bet_range,
            'roomPass' => $roomData->password,
            'bankerUsername' => $banker->user_name,
            'vendorId' => $banker->vendor_id,
            'bankerMultiplier' => $banker->multiplier,
            'vendorName' => $banker->vendor_name,
            'token' => $token,
            'isJunket' => app('auth')->user()->is_junket
        ];

        return $bankerData;
    }

    public function checkRoom($token, $table, $range)
    {
        return DB::select('CALL paigow.USP_GET_BET_RANGE(?, ?, ?, ?)', array($table, app('auth')->user()->id, $range, $token));
    }

    public function getJunketUsers($roomId) 
    {
       return DB::select('CALL paigow.USP_JUNKET_PAYOUT('. $roomId .')');
    }

    public function getCurrencyData()
    {
        return DB::table('vendors')
            ->select('multiplier', 'currency', 'main_multiplier')
            ->where('id', '=', app('auth')->user()->vendor_id)
            ->get();
    }
    /**
     * Return user configs
     *
     * @return array
     */
    public function getUserConfig()
    {
        $user = app('db')->table('users')->where('id', app('auth')->user()->id)
            ->first();

        return is_object($user) ? json_decode($user->configs) : [];
    }

    /**
     * updates user configs
     *
     * @param Request $request
     */
    public function setUserConfig(Request $request)
    {
        $map = [
            'volume' => 'volum',
        ];

        $data = $request->all();

        $config = $this->getUserConfig();

        foreach ($data as $key => $value) {
            if (in_array($key, ['effect', 'sound', 'volume', 'voice', 'music'])) {
                $config->avarta->sound->{array_key_exists($key, $map) ? $map[$key] : $key} = $value;
                continue;
            }

            if ($key == "tutorial") {
                if(!isset( $config->avarta->tutorial))  $config->avarta->tutorial = json_decode('{ "enabled" : "true"}');
                $config->avarta->tutorial->enabled = $value;
            }
            else if ($key == "chips") {
                if(!isset( $config->avarta->chips))  $config->avarta->chips = json_decode('{ "chips" : " ["1", "10", "30", "50", "max"]"}');
                $config->avarta->chips = $value;
            }
            else if($key == "bgm") {
                $config->avarta->music = $value;
            }
            else {
                $config->avarta->{$key}->select = $value;
            }
        }

        app('db')->table('users')->where('id', app('auth')->user()->id)
            ->update([
                'configs' => json_encode($config)
            ]);
    }

    public function getBetRangeInfo($userId, $table)
    {
      $userType = DB::table('users')
          ->select('user_type')
          ->where('id', '=', $userId)
          ->get();

      if (strtoupper($userType[0]->user_type) == 'TC' || strtoupper($userType[0]->user_type) == 'C') {
        $select = "casino_bet_ranges";
      }
      else if (strtoupper($userType[0]->user_type) == 'TS' || strtoupper($userType[0]->user_type) == 'S'){
        $select = "sport_bet_ranges";
      }

      return DB::connection('paigow')->table("paigow.game_tables")
          ->where('id', $table)
          ->where('status', '=', '1')
          ->get();
    }

    public function getTransferLogs(Request $request)
    {
        $userId = app('auth')->user()->id;

        return DB::table("api_transfer_log")
            ->where('user_id', '=', $userId)
            ->orderBy('id', 'desc')
            ->paginate(10)->setPath('/transferlogs')->toJson();
    }

    public function getBetLogs(Request $request)
    {
        // $userId = app('auth')->user()->id;
        // $table = $request->input('tableId');
        // $slave = ($request->input('slave'))?$request->input('slave')[0]:'r';
        // $slaves = [$slave];
        // // if($slave == 'r') {
        // //     $slaves[] = 'f';
        // // }

        //  //return $userId.'-'.$table.'-'.$slave;
        //  //print_r($request);
        // return DB::connection('paigow')->table("paigow.bets")
        //     ->join('paigow.rounds', 'bets.round_id', '=', 'rounds.id')
        //     ->select('bets.round_id', 'bets.user_id', 'bets.bet_history', 'bets.total_bet', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'rounds.game_result', 'rounds.game_info', 'bets.total_rolling', 'bets.total_win', 'rounds.table_id', 'bets.total_lost', 'rounds.round_num')
        //     ->where('bets.user_id', '=', $userId)
        //     ->whereIn('bets.type', $slaves)
        //     ->where('rounds.status', '=', 'E')
        //     ->where('rounds.table_id', '=', $table)
        //     ->orderBy('bets.round_id', 'DESC')
        //     ->paginate(10)->setPath('/betlogs')->toJson();
        $userId = $request->input('userId');
        $page = $request->input('betPage');
        $tableId = $request->input('tableId');
        $gameType = $request->input('gameType');
        $roundNum = $request->input('roundNum');
        $playType = $request->input('playType'); 

        if(is_null($userId) &&  Auth::user()->isJunket < 2) {
            $userId  = Auth::user()->id;
        }

        return DB::select('CALL paigow.USP_NEW_GET_BET_HISTORY(?, ?, ?, ?, ?)', array($gameType, $userId, $tableId, $roundNum, $page));
    }

    public function getBetLogsMobile(Request $request)
    {
        // $userId = app('auth')->user()->id;
        // $table = $request->input('tableId');
        // $slave = ($request->input('slave'))?$request->input('slave')[0]:'r';
        // $slaves = [$slave];
        // // if($slave == 'r') {
        // //     $slaves[] = 'f';
        // // }

        //  //return $userId.'-'.$table.'-'.$slave;
        //  //print_r($request);
        // return DB::connection('paigow')->table("paigow.bets")
        //     ->join('paigow.rounds', 'bets.round_id', '=', 'rounds.id')
        //     ->select('bets.round_id', 'bets.user_id', 'bets.bet_history', 'bets.total_bet', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'rounds.game_result', 'rounds.game_info', 'bets.total_rolling', 'bets.total_win', 'rounds.table_id', 'bets.total_lost', 'rounds.round_num')
        //     ->where('bets.user_id', '=', $userId)
        //     ->whereIn('bets.type', $slaves)
        //     ->where('rounds.status', '=', 'E')
        //     ->where('rounds.table_id', '=', $table)
        //     ->orderBy('bets.round_id', 'DESC')
        //     ->paginate(10)->setPath('/betlogs')->toJson();
        $userId = $request->input('userId');
        $page = $request->input('betPage');
        $tableId = $request->input('tableId');
        $gameType = $request->input('gameType');
        $roundNum = $request->input('roundNum');
        $playType = $request->input('playType'); 

        if(is_null($userId) &&  Auth::user()->isJunket < 2) {
            $userId  = Auth::user()->id;
        }

        return DB::select('CALL paigow.USP_GET_BET_HISTORY(?, ?, ?, ?, ?)', array($gameType, $userId, $tableId, $roundNum, $page));
    }

    public function getDetails(Request $request)
    {
        $userId = app('auth')->user()->id;
        $table = $request->input('tableId');
        $roundNum = $request->input('round');

        $betHistory = DB::connection('paigow')->table("paigow.bets")
            ->leftJoin('paigow.rounds', [
                // ['bets.table_id', '=', 'rounds.table_id'],
                ['bets.round_id', '=', 'rounds.id']
            ])
            ->where([
                ['bets.round_id', '=', $roundNum],
                // ['bets.table_id', '=', $table],
                ['bets.user_id', '=', $userId]
          ])
          ->select('bets.bet_history', 'rounds.game_info', 'rounds.game_result')
          ->get();

      return $betHistory;
    }

    /**
     * updates user video settings
     *
     * @param Request $request
     */
    public function setVideoSetting(Request $request)
    {
        $type = $request->input('type');
        DB::select('CALL nihtan_api.USP_VIDEO_SETTING(?,?)', array(app('auth')->user()->id, $type));
    }

    public function getGameHistory(Request $request)
    {
        $table = $request->input('tableId');

        $currentRound = DB::connection('paigow')->table("paigow.rounds")
            ->where('table_id', $table)
            ->max('round_num');

        return DB::connection('paigow')->table("paigow.game_tables")
            ->join('paigow.rounds', 'game_tables.id', '=', 'rounds.table_id')
            ->join('nihtan_api.dealers', 'rounds.dealer_id', '=', 'nihtan_api.dealers.id')
            // ->join('baccarat.game_marks', function($join) {
            //     $join->on('rounds.id', '=', 'game_marks.round_id');
            //     $join->on('rounds.table_id', '=', 'game_marks.table_id');
            // })
            ->select(
                'rounds.created_at',
                'rounds.round_num',
                'rounds.created_at',
                'nihtan_api.dealers.name',
                'rounds.game_info',
                'rounds.game_result'
            )
            ->where('game_tables.id', '=', $table)
            ->where('rounds.round_num', '!=', $currentRound)
            ->orderBy('rounds.round_num', 'desc')
            ->paginate(5)->setPath('/gamehistory')->toJson();
    }


    /**
     * Store user bets
     *
     * @param $table
     * @param $range
     * @param Request $request
     * @return string
     */
     public function storeBet($table, $range, Request $request)
     {

         $uMoney = $this->getUserCredits();
         // DB::transaction();
         $data = $request->input('data');
         $slave = $request->input('slave');
         $playType = $request->input('playType');
         $roomId = $request->input('roomId');

         $now = Carbon::now()->toDateTimeString();
         $insert['bets'] = [];
         $totalBets = 0;
         $is_mobile = $request->input('is_mobile') ? 'm' : 'w';

         if($request->input('is_multibet')) {
             $is_mobile = 's';
         }

         $vendor = app('db')->table('vendors')->where('id', $request->user()->vendor_id)->first();
         $type = ($slave)?$slave:'r';

         if ($request->input('type') == 'f' && (!$slave || $slave == 'r')) {
             $type = 'f';
             $slave = 'f';
         }

         $round = $this->getLatestRound($request->input('table', $table));

         // Bet range calculation
         $vendorArr = $this->getCurrencyData();
         $currency = $vendorArr[0]->currency;
         if(Auth::user()->currency) {
            $currency = Auth::user()->currency;
        }

         $vendorMultiplier = $vendorArr[0]->multiplier;
         if(Auth::user()->denomination) {
            $vendorMultiplier = Auth::user()->denomination;
        }
         $vendorRange = explode("-",$range);

         // Main multiplier
         $mainMultiplier = $vendorArr[0]->main_multiplier;
         if ($mainMultiplier % 10) {
             $mainMultiplier = 1;
         }
         else {
             $mainMultiplier = (floor($mainMultiplier / 10) * 10) * 0.01;
         }

         $rangeMin = $vendorRange[0] * (int)$vendorMultiplier;
         $rangeMax = ($vendorRange[1] * (int)$vendorMultiplier) * $mainMultiplier;
         $newRange = $rangeMin .'-'. $rangeMax;

         $current = DB::connection('paigow')->table('bets')
             ->where('user_id', Auth::user()->id)
             ->where('bet_range', $newRange)
             ->where('round_id', $round->id)->first();

         $prevBets = $current ? collect(json_decode($current->bet_history, true))->toArray(): [];
         $prevBetType = $current ? $current->type : $slave;
         $prevTotalBets = $current ? array_sum(array_column($prevBets, 'bet_money')) : 0;

        // === API ping check
        // if ($vendor->integration_type == 'seamless') {
        //     $pingCheck = $this->pingCheck();
        //     if (!$pingCheck) {
        //         return ['pingFail' => 1, 'money' => $uMoney, 'data' => $prevBets, 'fail' => 1];
        //     }
        // }

         for($x = 0;$x < count($data); $x++) {
             $key = $data[$x]['table_id'];
             $betMoney = !((int) $data[$x]['amount']) && array_key_exists($key, $prevBets)
                 && $prevBets[$key]['bet_money'] ? abs($prevBets[$key]['bet_money']) : abs($data[$x]['amount']);

             $insert['bets'][$x] = [
                 'bet' => $key,
                 'bet_money' =>  $betMoney,
                 'win_money' => 0,
                 'user_money' => ($x == 0)
                     ? $uMoney + $prevTotalBets : ($uMoney + $prevTotalBets) - $totalBets
             ];

             $totalBets += $betMoney;
         }

         $bets = json_encode($insert['bets']);
         app('log')->info($totalBets);
         $betAmount = $current ? $totalBets - $current->total_bet : $totalBets;

         $check = $this->checking('bet', $request->user()->id, [
             'amount' => $betAmount,
             'round' => $round,
             'prevBetType' => $prevBetType,
             'prevBets' => $prevBets,
             'slave' => $slave
         ]);

        $sessionId = session()->get('token');
        $transactionId = md5($request->user()->id . $request->user()->user_name . $round->id);
         if($check ===  true) {
             try {

                 $this->actionLogs($table, $request, []);

                 $insertQry = "INSERT INTO bets "
                     ."(`bet_history`, `created_at`, `bet_range`, "
                     . "`round_id`, `room_id`, `type`, `user_id`, `total_bet`, `total_rolling`, `total_winning`, `total_win`, `total_lost`, `device`,`play_type`, `bet_id`, `session_id`,  `currency`, `multiplier`) "
                     . "VALUES (?, now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE "
                     . "bet_history = ?, total_bet = ?";

                 DB::connection('paigow')->statement(DB::connection('paigow')->raw($insertQry), [
                     $bets,
                     $newRange,
                     $round->id,
                     $roomId,
                     $type,
                     Auth::user()->id,
                     $totalBets,
                     $totalBets,
                     0,
                     0,
                     0,
                     $is_mobile,
                     $playType,
                     $transactionId,
                     $sessionId,
                     $currency,
                     $vendorMultiplier,
                     $bets,
                     $totalBets,
                 ]);

                 app('log')->info('session ID ---->'. $sessionId);
                 app('log')->info('transaction ID ---->'. $transactionId);

                  // decrement nihtan db or send request to operator api
                 $transaction = $this->transact('bet', $vendor, $request->user()->id, [
                     'type' => 'bet',
                     'game' => 'Paigow',
                     'table' => (string) $table,
                     'range' => $newRange,
                     'round_no' => (string) $round->round_num,
                     'amount' => (string) $betAmount,
                     'data' => $bets,
                     'user_id' => $request->user()->user_id,
                     'user_name' => $request->user()->user_name,
                     'currency' => $currency,
                     'multiplier' => $vendorMultiplier,
                     'session_id' => $sessionId,
                     'bet_id' => $transactionId,
                     'vendor_name' => $vendor->vendor_name,
                     'created_at' => $now
                 ]);

                 app('log')->info('transaction -check --->'. $transaction);

                 // check if transaction was successful and if the round is still in betting phase
                 if(!$transaction) {
                     return $this->failHandle('', $prevBets, $request, [
                         'newRange' => $newRange,
                         'round' => $round,
                         'roomId' => $roomId,
                         'type' => $type,
                         'playType' => $playType,
                         'prevTotalBets' => $prevTotalBets,
                         'is_mobile' => $is_mobile,
                         'totalBets' => $totalBets,
                         'betAmount' => $betAmount,
                         'range' => $range,
                         'table' => $table,
                         'bets' => $bets,
                         'currency' => $currency,
                         'multiplier' => $vendorMultiplier,
                         'b_id' => $current ? $current->id : null,
                         'session_id' => $sessionId,
                         'bet_id' => $transactionId
                     ]);
                 }

                 $success_ret = [
                     'data' => $bets,
                     'fail' => 0,
                     'money' => $this->getUserCredits()
                 ];

                 return response()->json($success_ret);
             }
             catch (\Exception $e) {
                app('log')->info($e);

                 return $this->failHandle('err', $prevBets, $request, [
                         'newRange' => $newRange,
                         'round' => $round,
                         'roomId' => $roomId,
                         'playType' => $playType,
                         'type' => $type,
                         'prevTotalBets' => $prevTotalBets,
                         'is_mobile' => $is_mobile,
                         'totalBets' => $totalBets,
                         'betAmount' => $betAmount,
                         'range' => $range,
                         'table' => $table,
                         'bets' => $bets,
                         'currency' => $currency,
                         'multiplier' => $vendorMultiplier,
                         'b_id' => $current ? $current->id : null,
                         'session_id' => $sessionId,
                         'bet_id' => $transactionId
                     ]);
             }
         }
         else {
             return response()->json($check);
         }
     }

     public function pingCheck()
      {
        // $info[$i]["address"]: 서버 ip(또는 도메인)을 작성.
        // $info[$i]["port"]: 테스트할 포트를 작성.

        // 서버가 응답을 한다면 "Server Up" 메시지가 나오겠지만, 
        // 응답이 없으면 "Server Down" 메시지가 나오게 됩니다. 
        // 포트번호에 대한 구체적 정보는 아래 링크를 참조해 주세요. 

        // $apiURL = explode(":",env('API_URL'));

        // 야후 80포트 Down 여부 확인.
        $info[1]["address"]=env('API_URL'); //$apiURL[0].':'.$apiURL[1];  
        $info[1]["port"]='80'; 

        // Checking
        // $info[1]["address"]="yahoo.co.kr";  
        // $info[1]["port"]="80"; 

        // 확인할 ip 수 
        $infocount = 1;  
        // 지연시간, 기본 5초 
        $timeout = 1;  

        for ($i=1; $i<=$infocount; $i++){  
          $fp = @fsockopen($info[$i]["address"], $info[$i]["port"], $errno, $errstr, $timeout); 
          if ($fp) {  
            return 1; //"<br />Server Up: ".$info[$i]["address"]." [".$info[$i]["port"]. "]"; 
          } else { 
            return 0; //"<br /><font color='red'>Server Down: " . $info[$i]["address"] . " [" . $info[$i]["port"] . "]</font>";  
          } 
        } 
      }

     public function failHandle($type, $prevBets, Request $request, $data)
     {
         if($type == 'err') {
             $this->actionLogs($data['table'], $request, ['comment' => 'catch err']);
         } else {
             $this->actionLogs($data['table'], $request, ['comment' => 'fail']);
         }

         $this->remove($data['round'], $data['newRange'], $request, $data['betAmount'], $data['b_id']);

         $insertQry = "INSERT INTO bets "
         ."(`bet_history`, `created_at`, `bet_range`, "
         . "`round_id`, `room_id`, `type`, `user_id`, `total_bet`, `total_rolling`, `total_winning`, `total_win`, `total_lost`, `device`,`play_type`, `bet_id`, `session_id`,`currency`, `multiplier`) "
         . "VALUES (?, now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE "
         . "bet_history = ?, total_bet = ?";

         if(!empty($prevBets)) {
            DB::connection('paigow')->statement(DB::connection('paigow')->raw($insertQry), [
                json_encode($prevBets),
                $data['newRange'],
                $data['round']->id,
                $data['roomId'],
                $data['type'],
                Auth::user()->id,
                $data['prevTotalBets'],
                $data['prevTotalBets'],
                0,
                0,
                0,
                $data['device'],
                $data['playType'],
                $data['bet_id'],
                $data['session_id'],
                $data['currency'],
                $data['multiplier'],
                $data['bets'],
                $data['total_bet_money'],
            ]);
         }

         $fail_ret = [
             'data' => count($prevBets) > 0 ? $prevBets : [],
             'fail' => 1,
             'money' => $this->getUserCredits()
         ];

         return response()->json($fail_ret);
     }

    public function remove($round, $range, Request $request, $betAmount, $b_id) 
    {

        $this->checking('cancel', Auth::user()->id, [
            'amount' => $betAmount
        ]);

        app('db')->connection('paigow')->table('bets')
            ->where('round_id', $round->id)
            ->where('bet_range', $range)
            ->where('user_id', Auth::user()->id)
            ->delete();
    }

    /**
     * Cancel user bet and credit bet amount back to the user
     *
     * @param $table
     * @param $range
     * @param Request $request
     * @return int
     */
    public function cancel($table, $range, Request $request)
    {
        $round = $this->getLatestRound($table);
        $vendor = app('db')->table('vendors')->where('id', $request->user()->vendor_id)->first();
        $response = 0;

        // if ($round->status !== 'S') {
        //     return 0;
        // }

        // Bet range calculation
        $vendorArr = $this->getCurrencyData();
        $currency = $vendorArr[0]->currency;
        if(Auth::user()->currency) {
            $currency = Auth::user()->currency;
        }
        $vendorMultiplier = $vendorArr[0]->multiplier;
        if(Auth::user()->denomination) {
            $vendorMultiplier = Auth::user()->denomination;
        }
        $vendorRange = explode("-",$range);

        // Main multiplier
        $mainMultiplier = $vendorArr[0]->main_multiplier;
        if ($mainMultiplier % 10) {
            $mainMultiplier = 1;
        }
        else {
            $mainMultiplier = (floor($mainMultiplier / 10) * 10) * 0.01;
        }

        $rangeMin = $vendorRange[0] * (int)$vendorMultiplier;
        $rangeMax = ($vendorRange[1] * (int)$vendorMultiplier) * $mainMultiplier;
        $newRange = $rangeMin .'-'. $rangeMax;

        app('db')->transaction(function () use ($round, $newRange, $table, $request, $vendor, &$response,  $currency, $vendorMultiplier) {
            $bet = app('db')->connection('paigow')->table('bets')
                ->where('user_id', Auth::user()->id)
                ->where('round_id', $round->id)
                ->where('bet_range', $newRange)->first();

            if (!$bet) {
                $response = 1;
                return $response;
            }

            // increment nihtan db or send request to operator api
            $transaction = $this->transact('cancel', $vendor, $request->user()->id, [
                'type' => 'cancel',
                'game' => 'paigow',
                'amount' => $bet->total_bet,
                'id' => $request->user()->id,
                'user_id' => $request->user()->user_id,
                'user_name' => $request->user()->user_name,
                'range' => $newRange,
                'table' => $table,
                'round_no' => $round->round_num,
                'currency' => $currency,
                'multiplier' => $vendorMultiplier,
                'session_id'=> session()->get('token'),
                'bet_id'=> md5($request->user()->id . $request->user()->user_name . $round->id),
                'vendor_id' => $vendor->id,
                'vendor_name' => $vendor->vendor_name,
            ]);

            if ($transaction) {
                app('db')->connection('paigow')->table('bets')
                    ->where('id', $bet->id)->delete();
                $response = 1;
                //$this->storeBetLogs($table, $request, $request['logs']);
                $this->actionLogs($table, $request);
            }
        });

        $success_ret = new \stdClass;
        $success_ret->status = $response;
        $success_ret->money = $this->getUserCredits();

        return response()->json($success_ret);
    }

    public function cancelMulti($table, $range, Request $request)
    {
        $round = $this->getLatestRound($table);
        $vendor = app('db')->table('vendors')->where('id', $request->user()->vendor_id)->first();
        $response = 0;

        // Bet range calculation
        $vendorArr = $this->getCurrencyData();
        $currency = $vendorArr[0]->currency;
        if(Auth::user()->currency) {
            $currency = Auth::user()->currency;
        }
        $vendorMultiplier = $vendorArr[0]->multiplier;
        if(Auth::user()->denomination) {
            $vendorMultiplier = Auth::user()->denomination;
        }
        $vendorRange = explode("-",$range);

        // Main multiplier
        $mainMultiplier = $vendorArr[0]->main_multiplier;
        if ($mainMultiplier % 10) {
            $mainMultiplier = 1;
        }
        else {
            $mainMultiplier = (floor($mainMultiplier / 10) * 10) * 0.01;
        }

        $rangeMin = $vendorRange[0] * (int)$vendorMultiplier;
        $rangeMax = ($vendorRange[1] * (int)$vendorMultiplier) * $mainMultiplier;
        $newRange = $rangeMin .'-'. $rangeMax;

        app('db')->transaction(function () use ($round, $newRange, $table, $request, $vendor, &$response, $currency, $vendorMultiplier) {
            $bet = app('db')->connection('paigow')->table('bets')
                ->where('user_id', Auth::user()->id)
                ->where('round_id', $round->id)
                ->where('bet_range', $newRange)->first();

            if (!$bet) {
                $response = 1;
                return $response;
            }

            // increment nihtan db or send request to operator api
            $transaction = $this->transact('cancel', $vendor, $request->user()->id, [
                'type' => 'cancel',
                'game' => 'Pai-Gow',
                'amount' => $bet->total_bet,
                'id' => $request->user()->id,
                'user_id' => $request->user()->user_id,
                'user_name' => $request->user()->user_name,
                'range' => $newRange,
                'table' => $table,
                'round_no' => $round->round_num,
                'currency' => $currency,
                'multiplier' => $vendorMultiplier,
                'session_id'=> session()->get('token'),
                'bet_id'=> md5($request->user()->id . $request->user()->user_name . $round->id),
                'vendor_id' => $vendor->id,
                'vendor_name' => $vendor->vendor_name,
            ]);

            if ($transaction) {
                app('db')->connection('paigow')->table('bets')
                    ->where('id', $bet->id)->delete();
                $response = 1;
                //$this->storeBetLogs($table, $request, $request['logs']);
                $this->actionLogs($table, $request);
            }
        });


        $success_ret = new \stdClass;
        $success_ret->status = $response;
        $success_ret->money = $this->getUserCredits();

        return response()->json($success_ret);
    }
    /**
     * @param $table
     * @param Request $request
     * @param $logs
     * @return string
     */
    // public function storeBetLogs ($logs, Request $request)
    // public function storeBetLogs ($table, Request $request, $logs)
    // {
    //     $userIp = $request->ip();
    //     // $logs = json_encode($request->input('logs'));
    //     $logs = json_encode($logs);
    //     $type = 'r';

    //     $qry = " INSERT INTO bet_logs (`user_id`, `table_id`, `round_num`, `type`, `actions`, `ip`)"
    //         . "VALUES (?, ?, ?, ?, ?, ?) "
    //         . "ON DUPLICATE KEY UPDATE `actions` = JSON_MERGE(actions, ?)";

    //     DB::connection('baccarat')->statement(DB::raw($qry), [
    //         Auth::user()->id,
    //         $table,
    //         $this->getLatestRoundNum($request->input('table', $table)),
    //         $type,
    //         $logs,
    //         $userIp,
    //         $logs
    //     ]);
    // }

    /**
     * @param $table
     * @param Request $request
     */
    public function actionLogs ($table, Request $request)
    {
        $userIp = $request->ip();
        $logs = json_encode($request->input('logs'));
        $type = $request->input('type');

        $qry = " INSERT INTO action_logs (`user_id`, `table_id`, `round_num`, `type`, `actions`, `ip`, `created_at`)"
            . "VALUES (?, ?, ?, ?, ?, ?, CONCAT(UTC_DATE(), ' ', UTC_TIME())) "
            . "ON DUPLICATE KEY UPDATE `actions` = JSON_MERGE(actions, ?)";

        DB::connection('paigow')->statement(DB::raw($qry), [
            Auth::user()->id,
            $table,
            $this->getLatestRoundNum($request->input('table', $table)),
            $type,
            $logs,
            $userIp,
            $logs
        ]);
    }

    /**
     * @param $table
     * @return mixed
     */
    public function getLatestRoundNum($table)
    {
        return app('db')->connection('paigow')->table('rounds')
            ->where('table_id', $table)
            ->orderBy('id', 'desc')->select('round_num')->first()->round_num;
    }

    /**
     * Return last round for selected table
     *
     * @param $table
     * @return int
     */
    public function getLatestRound($table)
    {
        return app('db')->connection('paigow')->table('rounds')
            ->where('table_id', $table)
            ->orderBy('id', 'desc')->select('id', 'status', 'round_num')->first();
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function getTotalBet(Request $request)
    {
        $round_id = $request->input('round_id');
        return  app('db')->connection('paigow')->table('bets')
            ->where('round_id', $round_id)
            ->where('user_id',Auth::user()->id)->pluck('total_bet');
    }

    /**
     * @param Request $request
     * @return mixed
     */
    public function getTotalWin(Request $request)
    {

        $round_id = $request->input('round_id');

        return  app('db')->connection('paigow')
            ->table('bets')
            ->where('round_id', $round_id)
            ->where('user_id', app('auth')->user()->id)->pluck('total_winning');
    }

    /**
     * @param Request $request
     * @return array
     */
    public function getAllWin ($table)
    {

        $round = $this->getLatestRound($table);
        $conn = app('db')->connection('paigow');
        $win = $conn->table('bets')->where('round_id', $round->id)
            ->where('user_id',Auth::user()->id)->pluck('total_win');

        $bet = $conn->table('bets')->where('round_id', $round->id)
            ->where('user_id',Auth::user()->id)->pluck('total_bet');

        $type = $conn->table('bets')->where('round_id', $round->id)
            ->where('user_id',Auth::user()->id)->pluck('type');

        $slaves = ["r" => "normal", "s" => "supersix", "f" => "flippy", "b" => "bonus", "i" =>"insurance"];

        $usermoney = $this->getUserCredits();

        if(!count($win) && !count($bet)) {
            return 0;
        }

        return ["total_win" => $win[0], "bet" => $bet[0], "user_money" => $usermoney, "slave" => $slaves[$type[0]]];
    }

    public function getUser() {
        $nihtan = DB::connection('mysql');

        $user = $nihtan->table('users')->where('id', Auth::user()->id)->first();

        $user->money = $this->getUserCredits();

        return json_encode($user);
    }

    public function getUsers (Request $r) {
        
        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();

        if(empty($r->input('users'))) {
            return "no users"; 
        }

        $users = DB::connection('nihtan_api')->table("nihtan_api.users")
            ->whereIn('id', $r->input('users'))
            ->get();

        $format = [];
        for($x = 0; $x < count($users); $x++) {

            $format[$x] = [
                "user_id" => $users[$x]->user_id,
                "user_name" => $users[$x]->user_name,
                "credits" => $users[$x]->money
            ];
        }   

        $api_response = $this->getJunketCredits($r->input('vendor_name'), $format);
        
        if($api_response !== 'transfer') {
            return $api_response;
        } else {
            return json_encode($format);
        }
    }

    public function getDealerImg(Request $request)
    {
      $dealerId = $request->input('dealerId');

      $query = app('db')->connection('mysql')->table('dealers')
              ->select(DB::raw('CONCAT("data:image/png;base64,", TO_BASE64(dealer_images)) AS dealer_image, id'))
              ->where('id', $dealerId)
              ->get();

      return $query;
    }

    public function setRoomInfo(Request $request)
    {
        $userId = Auth::user()->id;
        $flag = $request->input('flag');
        $tableId = $request->input('tableId');
        $roomId = $request->input('roomId');
        $status = $request->input('status');
        $roomType = $request->input('roomType');
        $password;

        if ($request->input('password') != '') {
            $password = hash("SHA256", $request->input('password'));
        }
        else {
            $password = '';
        }

        DB::select('CALL nihtan_api.USP_ROOMS_SAVE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', array($flag, 'paigow', $roomId, $tableId, $roomType, $userId, $status, '', $password, '', 0, 0));
        return $password;
    }

    /**
     * Return user credits
     *
     * @return float|int
     */
     public function getBankerMoney(Request $request)
     {
         $bankerData = $request->input('vendorData');

         $bankerId = $bankerData['bankerId'];
         $vendorId = $bankerData['vendorId'];
         $bankerUsername = $bankerData['bankerUsername'];

         $vendor = app('db')->table('vendors')->where('id', $vendorId)->first();

         app('log')->info('CREDIT: User -> '. $bankerId . ', Type -> ' . $vendor->integration_type);
         app('log')->info('VENDOR: Id -> '. $vendor->id . ', Name -> ' . $vendor->vendor_name);

         if ($vendor->integration_type == 'seamless') {
             try {
                 $data = json_encode([
                     'user_id' => $bankerUsername,
                     'user_name' => $bankerUsername,
                     'vendor_name' => $vendor->vendor_name,
                 ]);

                 $hash = '?hash=' . $this->hash($data, $vendor->secret_key);

                 $response = (string) $this->client
                     ->request('post', env('API_URL') . '/api/check' . $hash, [
                         'headers' => ['Content-Type' => 'application/json'],
                         'body' => $data
                     ])->getBody();

                 $response = json_decode($response);
                 return is_float($response) ? (float) $response : (int) $response;
             }
             catch (BadResponseException $error) {
                 app('log')->info((string) $error);
                 return 0;
             }
         }

         return app('db')->table('users')->where('id', $bankerId)->first()->money;
     }

     public function setUserList(Request $request)
     {
         $userId = Auth::user()->id;
         $roundNum = $request->input('roundNum');
         $tableId = $request->input('tableId');
         $roomId = $request->input('roomId');
         $users = $request->input('users');

         if (!$users) {
             $users = "{}";
         }
         else {
             $users = json_encode($request->input('users'));
         }

         return DB::select('CALL USP_ROOM_USER_SAVE(?, ?, ?, ?, ?)', array($roomId, $tableId, $roundNum, 'paigow', $users));
     }

     public function getRoomStatus(Request $request)
     {
         $roomId = $request->input('roomId');
         return DB::select('CALL paigow.USP_GET_ACTIVE_CHECK(?)', array($roomId));
     }

    public function checkPassword(Request $request)
    {
        $password = $request->input('password');
        if ($password) {
            return hash("SHA256", $password);
        }
    }
    
    public function checkReject() {
        $config = $this->getUserConfig();

        $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

        App::setLocale($locale);

        return view('rejected');
    }
}
