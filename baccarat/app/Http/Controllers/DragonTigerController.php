<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; use App\Http\Controllers\Controller;

use App;
use Redirect;
use DB;
use Auth;
use Carbon\Carbon;

class DragonTigerController extends Controller
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
        if(!is_null($r->input('slave'))) {
            $default->slave = $r->input('slave') === 'classic' ? '' : $r->input('slave');
        } else {
            $default->slave = "";
        }
          
        if(!is_null($r->input('multiplayer')))
            $default->multi_yn = $r->input('multiplayer');

        app('db')->table('users')->where('id', app('auth')->user()->id)
        ->update([
            'last_game_info' => json_encode($default)
        ]);

    }

    public function isLive($table)
    {
        $maintenance = json_decode(app('db')->connection('dragontiger')
            ->table('game_tables')
            ->where('id', $table)
            ->first()->maintenance_setting, true);

        return !array_filter($maintenance ? $maintenance : [], function ($row) {
            return (int) $row['status'];
        });
    }

    public function getUser() {
        $nihtan = DB::connection('mysql');

        $user = $nihtan->table('users')->where('id',Auth::user()->id)->first();

        // return json_encode($user);

        $user->money = $this->getUserCredits();
        return json_encode($user);
    }

    public function init($table)
    {
        $nihtan = DB::connection('mysql');
        $user = Auth::user();
        $userId = app('auth')->user()->id;
        $userType = app('auth')->user()->user_type;
        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();

        //==== Bet range start
        $hasRange = false;

        if (!$this->isLive($table) && $user->authority != "a") {
            // return redirect('https://lobby.nihtanv2.com/?game=true');
        }

        // Check if user is banker in Sicbo
        // $isPlayer = $this->checkBanker();

        // === Currency
        $currencyArr = $this->getCurrencyData();
        $currencyMultiplier = $currencyArr[0]->multiplier;
        $currencyAbbrev = $currencyArr[0]->currency;
        $mainMultiplier = $currencyArr[0]->main_multiplier;
        $currency = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first()->currency;

        if(Auth::user()->denomination) {
            $currencyMultiplier = Auth::user()->denomination;
        }

        if(Auth::user()->currency) {
            $currency = Auth::user()->currency;
            $currencyAbbrev = Auth::user()->currency;
        }

        $rangeInfo = $this->getBetRangeInfo($userId, $table);
        if ($userType == 'C' || $userType == 'TC') {
            $currentRange = json_decode($rangeInfo[0]->casino_bet_ranges);
        }
        else if ($userType == 'S' || $userType == 'TS') {
            $currentRange = json_decode($rangeInfo[0]->sport_bet_ranges);
        }

        $rangeDetails = $currentRange[0];
        $hasRange = true;
        $range = $rangeDetails->min.'-'.$rangeDetails->max;

        // if (!$hasRange) {
            // return Redirect::to('http://lobby.nihtanv2.com');
        // }
        //==== Bet range end

        $stream = json_decode($rangeInfo[0]->env_setting);
        $betConfig = json_decode($rangeInfo[0]->env_setting);

        $data = DB::connection('dragontiger');
        $round_id = $data->table('rounds')
            ->where('table_id',$table)
            ->orderBy('id','desc')
            ->first();

        $round_id = $round_id ? $round_id->round_num : 0;
        $bets = $data->table('bets')->where('user_id', $user->id)->orderBy('id','desc')->first();
        $bets_all = $data->table('bets')->where('user_id', $user->id)->orderBy('id','desc')->paginate(10)->toJson();

        $config = $this->getUserConfig();
        $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

        App::setLocale($locale);
        if(empty($config->avarta->chips)) {
            $config->avarta->chips = ["1","5","10","30","max"];
        }

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
                $tableInfo = DB::connection('dragontiger')->table('game_tables')
                            ->where('id', $table)
                            ->get();

                $roomType = $tableInfo[0]->room_type;

                $agentRange = json_decode($agentRange[0]->ranges);

                for($x = 0; $x < count($agentRange); $x++) {

                    if($agentRange[$x]->type == 'vip') {
                        $rtype = 'v';
                    } else if($agentRange[$x]->type == 'premium') {
                        $rtype = 'p';
                    } else {
                        $rtype = 'n';
                    }
                    if($agentRange[$x]->game === env('CUR_GAME') && $rtype === $roomType) {
                        $currentRange = $agentRange[$x]->ranges;
                    }
                }
            } // end if checking collection empty

            $agentRange = empty($agentRange) ? [] : $agentRange; 
        }
        //game info
        $gameInfo = Auth::user()->last_game_info;
        $gamesettings = json_decode($gameInfo);

        $multiplayer = 0;
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

        // checking if betrange on config matches betranges in table. if not, use minimum betrange as default
        if(!$isMatch) {
          $rangeDetails = $currentRange[0];
          $range = $currentRange[0]->min.'-'.$currentRange[0]->max;
        }

        // $multiplayer = 0;

        $vendorEndDate = '';
        if ((int)Auth::user()->is_junket > 0) {
          $vendorEndDate = app('db')->table('vendors')
              ->where('id', app('auth')->user()->vendor_id)->first()->junket_end_date;
        }
        
        return view('index', [
            'config' => $config,
            'stream' => $stream,
            'currency' => $currency,
            'betConfig' => $betConfig,
            // 'money' => $user->money,
            'user_name' => $user->user_name,
            'money' => $this->getUserCredits(),
            'round_id' => $round_id,
            'bets' => $bets,
            'tableNum' => $table,
            'range' => $range,
            "rangeDetails" => json_encode($rangeDetails),
            "multiplayer" => $multiplayer,
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
            // 'isPlayer' => $isPlayer[0]->flag,
            'allRange' => $currentRange,
            'gameInfo' => $gameInfo,
            'agentRange' => json_encode($agentRange),
            'junket' => is_null(Auth::user()->is_junket) ? 0 :Auth::user()->is_junket,
            'vendorTables' => $vendor->junket_table,
            'vendor_id' => $vendor->id,
            'vendorEndDate' => $vendorEndDate,
            'isClassic' => !is_null(Auth::user()->is_junket) && Auth::user()->is_junket > 0 ? false : true,
        ]);
    }

    public function initMobile($table, $range, $multiplayer)
    {
        $nihtan = DB::connection('mysql');
        $user = $nihtan->table('users')->where('id',Auth::user()->id)->first();
        $userId = app('auth')->user()->id;
        $userType = app('auth')->user()->user_type;

        if (!$this->isLive($table)) {
            // return redirect('https://lobby.nihtanv2.com/m?game=true');
        }

        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();

        // Check if user is banker in Sicbo
        // $isPlayer = $this->checkBanker();

        // === Currency
        $currencyMultiplier = $vendor->multiplier;
        $currencyAbbrev = $vendor->currency;
        $mainMultiplier = $vendor->main_multiplier;

        if(Auth::user()->denomination) {
            $currencyMultiplier = Auth::user()->denomination;
        }

        if(Auth::user()->currency) {
            $currencyAbbrev = Auth::user()->currency; 
        }

        //==== Bet range start
        $currRange = explode("-",$range);
        $hasRange = false;

        $rangeInfo = $this->getBetRangeInfo($userId, $table);
        if ($userType == 'C' || $userType == 'TC') {
            $currentRange = json_decode($rangeInfo[0]->casino_bet_ranges);
        }
        else if ($userType == 'S' || $userType == 'TS') {
            $currentRange = json_decode($rangeInfo[0]->sport_bet_ranges);
        }

        //agent range
        $usergroup= Auth::user()->user_group_id;
        $agentRange = [];
        if(!is_null($usergroup)) {
            $agentRange = $group_data = DB::connection('nihtan_api')->table('user_groups')
            ->where('vendor_id', Auth::user()->vendor_id)
            ->where('id', $usergroup)
            ->get();

            if(!$agentRange->isEmpty()) {
                $tableInfo = DB::connection('dragontiger')->table('game_tables')
                            ->where('id', $table)
                            ->get();

                $roomType = $tableInfo[0]->room_type;

                $agentRange = json_decode($agentRange[0]->ranges);

                for($x = 0; $x < count($agentRange); $x++) {

                    if($agentRange[$x]->type == 'vip') {
                        $rtype = 'v';
                    } else if($agentRange[$x]->type == 'premium') {
                        $rtype = 'p';
                    } else {
                        $rtype = 'n';
                    }
                    if($agentRange[$x]->game === 'Dragon-Tiger' && $rtype === $roomType) {
                        $currentRange = $agentRange[$x]->ranges;
                    }
                }
            } // end if checking collection empty

            $agentRange = empty($agentRange) ? [] : $agentRange; 
        }
        //end of agent checking
        for ($i=0; $i < count($currentRange); $i++) {
            if ($currentRange[$i]->min == $currRange[0] && $currentRange[$i]->max == $currRange[1]) {
              $rangeDetails = $currentRange[$i];
              $hasRange = true;
            }
        }

        if (!$hasRange) {
            return Redirect::to('http://lobby.nihtanv2.com/m');
        }
        //==== Bet range end

        $data = DB::connection('dragontiger');

        $round_id = $data->table('rounds')->where('table_id',$table)->orderBy('id','desc')->limit(1)->pluck('round_num')[0];

        $bets = $data->table('bets')->where('user_id', Auth::user()->id)->orderBy('id','desc')->first();

        $config = $this->getUserConfig();

        // if(intval($config->avarta->language->select) >= 4) {
        //   $config->avarta->language->select = 0;
        // }
        
        $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

        App::setLocale($locale);

        if(empty($config->avarta->chips)) {
            $config->avarta->chips = ["1","5","10","30","max"];
        }

        return view('index-mobile', [
            'config' => $config,
            'range' => $range,
            // 'money' => $user->money,
            'money' => $this->getUserCredits(),
            'user_name' => $user->user_name,
            'round_id' => $round_id,
            'bets' => $bets,
            'table' => $table,
            "rangeDetails" => json_encode($rangeDetails),
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
            // 'isPlayer' => $isPlayer[0]->flag
        ]);

    }

    public function initNonMobile($table, $range, $multiplayer)
    {
        $nihtan = DB::connection('mysql');
        $user = $nihtan->table('users')->where('id',Auth::user()->id)->first();
        $userId = app('auth')->user()->id;
        $userType = app('auth')->user()->user_type;

        if (!$this->isLive($table)) {
            // return redirect('https://lobby.nihtanv2.com/m?game=true');
        }

        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();

        // Check if user is banker in Sicbo
        // $isPlayer = $this->checkBanker();

        // === Currency
        $currencyMultiplier = $vendor->multiplier;
        $currencyAbbrev = $vendor->currency;
        $mainMultiplier = $vendor->main_multiplier;

        if(Auth::user()->denomination) {
            $currencyMultiplier = Auth::user()->denomination;
        }

        if(Auth::user()->currency) {
            $currencyAbbrev = Auth::user()->currency; 
        }

        //==== Bet range start
        $currRange = explode("-",$range);
        $hasRange = false;

        $rangeInfo = $this->getBetRangeInfo($userId, $table);
        if ($userType == 'C' || $userType == 'TC') {
            $currentRange = json_decode($rangeInfo[0]->casino_bet_ranges);
        }
        else if ($userType == 'S' || $userType == 'TS') {
            $currentRange = json_decode($rangeInfo[0]->sport_bet_ranges);
        }

        //agent range
        $usergroup= Auth::user()->user_group_id;
        $agentRange = [];
        if(!is_null($usergroup)) {
            $agentRange = $group_data = DB::connection('nihtan_api')->table('user_groups')
            ->where('vendor_id', Auth::user()->vendor_id)
            ->where('id', $usergroup)
            ->get();

            if(!$agentRange->isEmpty()) {
                $tableInfo = DB::connection('dragontiger')->table('game_tables')
                            ->where('id', $table)
                            ->get();

                $roomType = $tableInfo[0]->room_type;

                $agentRange = json_decode($agentRange[0]->ranges);

                for($x = 0; $x < count($agentRange); $x++) {

                    if($agentRange[$x]->type == 'vip') {
                        $rtype = 'v';
                    } else if($agentRange[$x]->type == 'premium') {
                        $rtype = 'p';
                    } else {
                        $rtype = 'n';
                    }
                    if($agentRange[$x]->game === 'Dragon-Tiger' && $rtype === $roomType) {
                        $currentRange = $agentRange[$x]->ranges;
                    }
                }
            } // end if checking collection empty
            
            $agentRange = empty($agentRange) ? [] : $agentRange; 
        }
        //end of agent checking
        for ($i=0; $i < count($currentRange); $i++) {
            if ($currentRange[$i]->min == $currRange[0] && $currentRange[$i]->max == $currRange[1]) {
              $rangeDetails = $currentRange[$i];
              $hasRange = true;
            }
        }

        if (!$hasRange) {
            return Redirect::to('http://lobby.nihtanv2.com/m');
        }
        //==== Bet range end

        $data = DB::connection('dragontiger');
        $round_id = $data->table('rounds')->where('table_id',$table)->orderBy('id','desc')->limit(1)->pluck('round_num')[0];
        $bets = $data->table('bets')->where('user_id', Auth::user()->id)->orderBy('id','desc')->first();

        $config = $this->getUserConfig();
        $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

        App::setLocale($locale);

        if(empty($config->avarta->chips)) {
            $config->avarta->chips = ["1","5","10","30","max"];
        }

        return view('index-mobile-non', [
            'config' => $config,
            'range' => $range,
            'money' => $this->getUserCredits(),
            'user_name' => $user->user_name,
            'round_id' => $round_id,
            'bets' => $bets,
            'table' => $table,
            "rangeDetails" => json_encode($rangeDetails),
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
            // 'isPlayer' => $isPlayer[0]->flag,
            'nonInstall' => true
        ]);

    }

    public function checkReject() {
        $config = $this->getUserConfig();

        $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

        App::setLocale($locale);

        return view('rejected');
    }

    public function checkBanker()
    {
        // T - can enter
        // F - return to lobby
        $token = '';

        if (isset($_GET['token'])) {
            $token = $_GET['token'];
        }

        return DB::select('CALL nihtan_api.USP_GET_BANKER_CHECK(?, ?, ?)', array(app('auth')->user()->id, 'dragontiger', $token));
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

        $config = is_object($user) ? json_decode($user->configs) : [];

        if(!array_key_exists('music', $config->avarta)) $config->avarta->music = "1";
        if(!array_key_exists('music', $config->avarta->sound)) $config->avarta->sound->music = "0.2";

        if(!isset($config->avarta->language->data[$config->avarta->language->select])) {
            $config->avarta->language->select = 0;
        }

        return $config;
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
          else if($key == "range") {
              $config->avarta->range = $data['range'];
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

      return DB::connection('dragontiger')->table("dragontiger.game_tables")
          ->where('id', $table)
          ->where('status', '=', '1')
          ->get();
    }

    public function getTransferLogs(Request $request) {
      $userId = app('auth')->user()->id;

      return DB::table("api_transfer_log")
          ->where('user_id', '=', $userId)
          ->orderBy('id', 'desc')
          ->paginate(10)->setPath('/transferlogs')->toJson();
    }

    public function getBetLogs(Request $request) {
        $userId = app('auth')->user()->id;
        $table = $request->input('tableId');
        $page = $request->input('betPage');
        $tableId = $request->input('tableId');
        $gameType = $request->input('gameType');
        $roundNum = $request->input('roundNum');
        $playType = $request->input('playType');
        $mobile = $request->input('mobile');

        if ($mobile) {
            return DB::connection('dragontiger')->table("dragontiger.bets")
                ->join('dragontiger.rounds', 'bets.round_id', '=', 'rounds.id')
                // ->join('dragontiger.game_marks', 'rounds.id', '=', 'game_marks.round_id')
                ->select('bets.round_id', 'bets.user_id', 'bets.bet_history', 'bets.total_bet', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'rounds.game_result', 'rounds.game_info', 'bets.total_rolling', 'bets.total_win', 'rounds.table_id', 'bets.total_lost', 'rounds.round_num', 'rounds.status')
                ->where('bets.user_id', '=', $userId)
                ->where('rounds.table_id', '=', $table)
                ->whereIn('rounds.status', ['E', 'W'])
                ->orderBy('bets.round_id', 'DESC')
                ->paginate(10)->setPath('/betlogs')->toJson();
        } else {
            return DB::select('CALL dragontiger.USP_NEW_GET_BET_HISTORY(?, ?, ?, ?, ?)', array($gameType, app('auth')->user()->id, $tableId, $roundNum, $page));
        }
    }

    public function getDetails(Request $request) {
      $userId = app('auth')->user()->id;
      $table = $request->input('tableId');
      $roundNum = $request->input('round');

      $betHistory = DB::connection('dragontiger')->table("dragontiger.bets")
          ->leftJoin('dragontiger.rounds', [
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

    public function getGameHistory(Request $request) {
        $table = $request->input('tableId');

        $currentRound = DB::connection('dragontiger')->table("dragontiger.rounds")
            ->where('table_id', $table)
            ->max('round_num');

        return DB::connection('dragontiger')->table("dragontiger.game_tables")
            ->join('dragontiger.rounds', 'game_tables.id', '=', 'rounds.table_id')
            ->join('nihtan_api.dealers', 'rounds.dealer_id', '=', 'nihtan_api.dealers.id')
            ->select('rounds.round_num', 'rounds.created_at', 'nihtan_api.dealers.name', 'rounds.game_info', 'rounds.game_result', 'rounds.status')
            ->where('game_tables.id', '=', $table)
            ->where('rounds.round_num', '<', $currentRound)
            ->orderBy('rounds.round_num', 'desc')
            ->paginate(10)->setPath('/gamehistory')->toJson();
    }

    /*
        test storebet with storedprocedure
     */
    public function testStore($table, $range, Request $request)
    {
        $uMoney = $this->getUserCredits();
        $round = $this->getLatestRound($request->input('table', $table));

        $data       = $request->input('data');
        $range      = $request->input('range'); // raw range
        $device     = $request->input('device');
        $logs       = $request->input('logs');
        $insert['bets'] = [];
        $roomId = null;
        $slave = 'r';
        $balance = 0;

        if($request->input('is_multibet')) {
            $device = 's';
        }
        
        $vendor = app('db')->table('vendors')->where('id', $request->user()->vendor_id)->first();

        $type = 'r';
        
        $current = DB::connection('dragontiger')->table('bets')
            ->where('user_id', Auth::user()->id)
            ->where('bet_range', $range)
            ->join('rounds', 'rounds.id', '=', 'bets.round_id')
            ->where('rounds.round_num', $round->round_num)
            ->where('rounds.table_id', $table)
            ->first([ 
                    'bets.bet_history as bet_history',
                    'bets.total_bet as total_bet',
                    'bets.id as id'
                ]);

        $prevBets = $current ? collect(json_decode($current->bet_history, true))->toArray(): [];

        $prevTotalBets = $current ? array_sum(array_column($prevBets, 'bet_money')) : 0;
        $totalBets = 0;

        for($x = 0;$x < count($data);$x++) {

            $key = $data[$x]['table_id'];
            $betMoney = !((int) $data[$x]['amount']) && array_key_exists($key, $prevBets)
                && $prevBets[$key]['bet_money'] ? abs($prevBets[$key]['bet_money']) : abs($data[$x]['amount']);

            $insert['bets'][$x] = [
                'bet' => $key,
                'bet_money' => $betMoney,
                'win_money' => 0,
                'user_money' => ($x == 0)
                    ? $uMoney + $prevTotalBets : ($uMoney + $prevTotalBets) - $totalBets
            ];

            $totalBets += $betMoney;
        }

        $bets = json_encode($insert['bets']);
        $logs = json_encode($request->input('logs'));
        
        app('log')->info($totalBets);
        $betAmount = $current ? $totalBets - $current->total_bet : $totalBets;
        
        $isJunket = Auth::user()->is_junket ? 'j' : 'p';

        $vendorArr = $this->getCurrencyData();
        $currency = $vendorArr[0]->currency;
        $vendorMultiplier = $vendorArr[0]->multiplier;
        if(Auth::user()->curreny) {
            $currency = Auth::user()->curreny;
        }
        if(Auth::user()->denomination) {
            $vendorMultiplier = Auth::user()->denomination;
        }

        //api vars
        $now = Carbon::now()->toDateTimeString();
        $vendor = app('db')->table('vendors')->where('id', $request->user()->vendor_id)->first();

        $sessionId = Auth::user()->token;
        $transactionId = md5($request->user()->id . $request->user()->user_name . $round->id);

        $db = DB::connection('dragontiger');
           
        $stored = $db->select('CALL USP_STORE_BET(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            array(
                  'I',
                  Auth::user()->id
                , $range 
                , (int)$table
                , (int)$round->round_num
                , $slave
                , (int)$totalBets
                , $prevTotalBets
                , $bets
                , $prevBets ? json_encode($prevBets) : null
                , $logs
                , $device
                , $vendor->integration_type === "seamless" ? $uMoney : 0
                , $isJunket
                , $roomId
                , $transactionId
                , $sessionId
                , $currency
                , $vendorMultiplier
                , $balance
            )
        );
        
        app('log')->info(" ================ STORED CHECKINGGGGGGGGG ================== >>>>". (int)$stored[0]->flag);

        if((int)$stored[0]->flag) {

            // decrement nihtan db or send request to operator api
            $transaction = $this->transact('bet', $vendor, $request->user()->id, [
                'type' => 'bet',
                'game' => 'Dragon-Tiger',
                'table' => $table,
                'range' => $range,
                'round_no' => $round->round_num,
                'amount' => $betAmount,
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
            // check if transaction was successful and if the round is still in betting phase
            if(!$transaction) {

                return $this->testFail([
                    'range'     => $range,
                    'table'     => $table,
                    'round_num' => $round->round_num,
                    'slave'     => $slave,
                    'totalBets' => (int)$totalBets,
                    'prevTotalBets'=> $prevTotalBets,
                    'bets'      => $bets,
                    'prevBets'  => $prevBets ? json_encode($prevBets) : null,
                    'logs'      => $logs,
                    'device'    => $device,
                    'usermoney' => $vendor->integration_type === "seamless" ? $uMoney : 0,
                    'junket'    => $isJunket,
                    'roomId'    => $roomId,
                    'transactionId' => $transactionId,
                    'sessionId' => $sessionId,
                    'currency'  => $currency,
                    'vendorMultiplier' => $vendorMultiplier,
                    'balance' => $balance
                ]);
            }

            $success_ret = [
                'data' => $bets,
                'fail' => 0,
                'money' => $this->getUserCredits()
            ];

            return response()->json($success_ret);

        } else {

            $return = [
                'data' => count($prevBets) > 0 ? $prevBets : [],
                'fail' => 1,
                'user' => Auth::user()->id,
                'money' => $this->getUserCredits() 
            ];

            return $return;
        }
    }

    /**
     * @param $table
     * @param $range
     * @param Request $request
     * @return string
     */
    public function storeBet($table, $range, Request $request)
    {
        $uMoney = $this->getUserCredits();

        $data = $request->input('data');
        $device = $request->input('device');
        $logs = $request->input('logs');
        $now = Carbon::now()->toDateTimeString();
        $insert['bets'] = [];
        $is_mobile = $request->input('is_mobile') ? 'm' : 'w';
        $playType = Auth::user()->is_junket == 1 ? 'j' : 'p';

        if($request->input('is_multibet')) {
            $device = 's';
        }
        
        $vendor = app('db')->table('vendors')->where('id', $request->user()->vendor_id)->first();

        $type = 'r';

        $round = $this->getLatestRound($table);

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
        
        $current = DB::connection('dragontiger')->table('bets')
            ->where('user_id', Auth::user()->id)
            ->where('bet_range', $newRange)
            ->where('round_id', $round->id)->first();

        $prevBets = $current ? collect(json_decode($current->bet_history, true))->toArray(): [];
        $prevTotalBets = $current ? array_sum(array_column($prevBets, 'bet_money')) : 0;
        $totalBets = 0;

        // === API ping check
        // if ($vendor->integration_type == 'seamless') {
        //     $pingCheck = $this->pingCheck();
        //     if (!$pingCheck) {
        //         return ['pingFail' => 1, 'money' => $uMoney, 'data' => $prevBets, 'fail' => 1];
        //     }
        // }

        for($x = 0;$x < count($data);$x++) {

            $key = $data[$x]['table_id'];
            $betMoney = !((int) $data[$x]['amount']) && array_key_exists($key, $prevBets)
                && $prevBets[$key]['bet_money'] ? abs($prevBets[$key]['bet_money']) : abs($data[$x]['amount']);

            $insert['bets'][$x] = [
                'bet' => $key,
                'bet_money' => $betMoney,
                'win_money' => 0,
                'user_money' => ($x == 0)
                    ? $uMoney + $prevTotalBets : ($uMoney + $prevTotalBets) - $totalBets
            ];

            $totalBets += $betMoney;
        }

        $bets = json_encode($insert['bets']);
        $betAmount = $current ? $totalBets - $current->total_bet : $totalBets;

        $check = $this->checking('bet', $request->user()->id, [
            'amount' => $betAmount,
            'round' => $round,
            'prevBets' => $prevBets
        ]);

        $sessionId = Auth::user()->token;
        $transactionId = md5($request->user()->id . $request->user()->user_name . $round->id);

        if($check ===  true) {
            try {
                
                $this->actionLogs($table, $request, []);

                $insertQry = "INSERT INTO bets"
                    . " (`bet_history`, `created_at`,"
                    . " `round_id`, `type`, `user_id`, `total_bet`, `total_rolling`, `total_winning`, `total_win`, `total_lost`, `bet_range`, `device`, `bet_id`, `session_id`, `currency`, `play_type`)"
                    . " VALUES (?, now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE"
                    . " `bet_history` = ?, `total_bet` = ?";

                DB::connection('dragontiger')->statement(DB::raw($insertQry), [
                    $bets,
                    $round->id,
                    $type,
                    Auth::user()->id,
                    $totalBets,
                    $totalBets,
                    0,
                    0,
                    0,
                    $newRange,
                    $device,
                    $transactionId,
                    $sessionId,
                    $currency,
                    $playType,
                    $bets,
                    $totalBets
                ]);

                // decrement nihtan db or send request to operator api
                $transaction = $this->transact('bet', $vendor, $request->user()->id, [
                    'type' => 'bet',
                    'game' => 'Dragon-Tiger',
                    'table' => $table,
                    'range' => $newRange,
                    'round_no' => $round->round_num,
                    'amount' => $betAmount,
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

                // check if transaction was successful and if the round is still in betting phase
                if(!$transaction) {
                    return $this->failHandle('', $prevBets, $request, [
                        'newRange' => $newRange,
                        'round' => $round,
                        'type' => $type,
                        'prevTotalBets' => $prevTotalBets,
                        'device' => $device,
                        'totalBets' => $totalBets,
                        'betAmount' => $betAmount,
                        'range' => $range,
                        'table' => $table,
                        'bets' => $bets,
                        'currency' => $currency,
                        'b_id' => $current ? $current->id : null,
                        'bet_id' => $transactionId,
                        'session_id' => $sessionId
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

                return $this->failHandle('err', $prevBets, $request, [
                    'newRange' => $newRange,
                    'round' => $round,
                    'type' => $type,
                    'prevTotalBets' => $prevTotalBets,
                    'device' => $device,
                    'totalBets' => $totalBets,
                    'betAmount' => $betAmount,
                    'range' => $range,
                    'table' => $table,
                    'bets' => $bets,
                    'currency' => $currency,
                    'b_id' => $current ? $current->id : null,
                    'bet_id' => $transactionId,
                    'session_id' => $sessionId
                ]);
            }
        } else {
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
        
         $insertQry = "INSERT INTO bets"
        . " (`bet_history`, `created_at`,"
        . " `round_id`, `type`, `user_id`, `total_bet`, `total_rolling`, `total_winning`, `total_win`, `total_lost`, `bet_range`, `device`, `bet_id`, `session_id`, `currency`)"
        . " VALUES (?, now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE"
        . " `bet_history` = ?, `total_bet` = ?";

        if(!empty($prevBets)) {
            DB::connection('dragontiger')->statement(DB::raw($insertQry), [
                json_encode($prevBets),
                $data['round']->id,
                $data['type'],
                Auth::user()->id,
                $data['prevTotalBets'],
                $data['prevTotalBets'],
                0,
                0,
                0,
                $data['newRange'],
                $data['device'],
                $data['bet_id'],
                $data['currency'],
                $data['session_id'],
                $data['bets'],
                $data['totalBets']
            ]);
        }

        $fail_ret = [
            'data' => count($prevBets) > 0 ? $prevBets : [],
            'fail' => 1,
            'money' => $this->getUserCredits()                       
        ];

        return response()->json($fail_ret);
    }

    /**
     * fail; using stored
     */
    public function testFail($data)
    {
        $db = DB::connection('dragontiger');

        $stored = $db->select('CALL USP_STORE_BET(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            array(
                  'F',
                  Auth::user()->id
                , $data['range'] 
                , (int)$data['table']
                , (int)$data['round_num']
                , $data['slave']
                , $data['totalBets']
                , $data['prevTotalBets']
                , $data['bets']
                , $data['prevBets']
                , $data['logs']
                , $data['device']
                , $data['usermoney']
                , $data['junket']
                , $data['roomId']
                , $data['transactionId']
                , $data['sessionId']
                , $data['currency']
                , $data['vendorMultiplier']
                , $data['balance']  
            )
        );

        $prevBets = gettype($data['prevBets']) === 'string' ? json_decode($data['prevBets']) : $data['prevBets'];

        $fail_ret = [
            'data' => count($prevBets) > 0 ? $prevBets : [],
            'fail' => 1,
            'money' => $this->getUserCredits()
        ];

        return response()->json($fail_ret);
    }
    /**
     * remvove user bet and credit bet amount back to the user// doesn't call api
     *
     * @param $round
     * @param $range
     * @param Request $request
     */

    public function remove($round, $range, Request $request, $betAmount, $bet_id)
    {

        // $vendor = app('db')->table('vendors')->where('id', $request->user()->vendor_id)->first();

        // // Bet range calculation
        // $vendorArr = $this->getCurrencyData();
        // $vendorMultiplier = $vendorArr[0]->multiplier;
        // $vendorRange = explode("-",$range);

        // // Main multiplier
        // $mainMultiplier = $vendorArr[0]->main_multiplier;
        // if ($mainMultiplier % 10) {
        //     $mainMultiplier = 1;
        // }
        // else {
        //     $mainMultiplier = (floor($mainMultiplier / 10) * 10) * 0.01;
        // }

        // $rangeMin = $vendorRange[0] * (int)$vendorMultiplier;
        // $rangeMax = ($vendorRange[1] * (int)$vendorMultiplier) * $mainMultiplier;
        // $newRange = $rangeMin .'-'. $rangeMax;

        // $this->checking('cancel', Auth::user()->id, [
        //     'amount' => $betAmount
        // ]);

        $this->checking('cancel', Auth::user()->id, [
            'amount' => $betAmount
        ]);

        // if(!$bet_id) {
        //     return;
        // }

        app('db')->connection('dragontiger')->table('bets')
            ->where('round_id', $round->id)
            ->where('bet_range', $range)
            ->where('user_id', Auth::user()->id)
            ->delete();
    }
    /**
     * Cancel user bet
     *
     * @param $table
     * @param $range
     */
    public function cancel($table, $range, Request $request)
    {
        $round = $this->getLatestRound($table);
        $vendor = app('db')->table('vendors')->where('id', $request->user()->vendor_id)->first();
        $response = 0;
        $logs = $request['logs'];

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

        app('db')->transaction(function () use ($round, $newRange, $table, $request, $vendor, &$response, $logs, $currency, $vendorMultiplier) {
            $bet = app('db')->connection('dragontiger')->table('bets')
                ->where('user_id', Auth::user()->id)
                ->where('round_id', $round->id)
                ->where('bet_range', $newRange)->first();

            if (!$bet) {
                $response = 1;
                $ret = new \stdClass;
                $ret->status = $response;
                $ret->money = $this->getUserCredits();

                return response()->json($ret);
            }

            $this->actionLogs($table, $request, []);
            // increment nihtan db or send request to operator api
            $transaction = $this->transact('cancel', $vendor, $request->user()->id, [
                'type' => 'cancel',
                'game' => 'Dragon-Tiger',
                'amount' => $bet->total_bet,
                'id' => $request->user()->id,
                'user_id' => $request->user()->user_id,
                'user_name' => $request->user()->user_name,
                'range' => $newRange,
                'table' => $table,
                'round_no' => $round->round_num,
                'currency' => $currency,
                'multiplier' => $vendorMultiplier,
                'session_id'=> Auth::user()->token,
                'bet_id'=> md5($request->user()->id . $request->user()->user_name . $round->id),
                'vendor_id' => $vendor->id,
                'vendor_name' => $vendor->vendor_name,
            ]);

            if ($transaction) {
                app('db')->connection('dragontiger')->table('bets')
                    ->where('id', $bet->id)->delete();
                $response = 1;
                // $this->storeBetLogs($table, $request, $request['logs']);
                //$this->storeBetLogs($table, $logs, $request);
            } else {
                $this->actionLogs($table, $request, ['comment' => 'fail']);
            }
        });

        $success_ret = new \stdClass;
        $success_ret->status = $response;
        $success_ret->money = $this->getUserCredits();

        return response()->json($success_ret);

        // return $response;
    }

    /*
        test cancel stored
     */
    public function testCancel($table, $range, Request $request)
    {
        $uMoney = $this->getUserCredits();
        $round = $this->getLatestRound($table);
        $range = $request->input('range');
        
        $bet = app('db')->connection('dragontiger')->table('bets')
                ->where('user_id', Auth::user()->id)
                ->where('round_id', $round->id)
                ->where('bet_range', $range)->first();

        $db = DB::connection('dragontiger');
        $data  = $request->input('data');
        $logs = json_encode($request->input('logs'));
        $roomId  = $request->input('room_id');
        $device = $request->input('device');
        $balance = $request->input('balance_bet') ? $request->input('balance_bet')  : 0;
        $bets = json_encode($request->input('data'));
        $vendor = app('db')->table('vendors')->where('id', $request->user()->vendor_id)->first();
        $slave = 'r';

        $prevTotalBets = 0;
        $prevBets = null;

        $totalBets = 0;

        for($x = 0;$x < count($data); $x++) {
            $key = $data[$x]['table_id'];
            $betMoney = abs($data[$x]['amount']);

            $totalBets += $betMoney;
        }

        $isJunket = Auth::user()->is_junket ? 'j' : 'p';

        $vendorArr = $this->getCurrencyData();
        $currency = $vendorArr[0]->currency;
        $vendorMultiplier = $vendorArr[0]->multiplier;
        if(Auth::user()->curreny) {
            $currency = Auth::user()->curreny;
        }
        if(Auth::user()->denomination) {
            $vendorMultiplier = Auth::user()->denomination;
        }
        $slave = $slave == 'normal' ? 'r' : 's';

        $sessionId = Auth::user()->token;
        $transactionId = md5($request->user()->id . $request->user()->user_name . $round->id);

        $response = new \stdClass;
        $response->money = $this->getUserCredits();

        if (!$bet) {
            $response->status = 1;
            return response()->json($response);
        }

        // increment nihtan db or send request to operator api
        $transaction = $this->transact('cancel', $vendor, $request->user()->id, [
            'type' => 'cancel',
            'game' => 'Dragon-Tiger',
            'amount' => (int)$bet->total_bet,
            'id' => $request->user()->id,
            'user_id' => $request->user()->user_id,
            'user_name' => $request->user()->user_name,
            'range' => $range,
            'table' => $table,
            'round_no' => $round->round_num,
            'currency' => $currency,
            'multiplier' => $vendorMultiplier,
            'session_id'=> Auth::user()->token,
            'bet_id'=> $transactionId,
            'vendor_id' => $vendor->id,
            'vendor_name' => $vendor->vendor_name,
        ]);


        if(!$transaction) {
            return response()->json($response);
        }

        $stored = $db->select('CALL USP_STORE_BET(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
           array(
                  'D',
                  Auth::user()->id
                , $range 
                , (int)$table
                , (int)$round->round_num
                , $slave
                , (int)$bet->total_bet
                , $prevTotalBets
                , $bets
                , $prevBets
                , $logs
                , $device
                , $vendor->integration_type === "seamless" ? $uMoney : 0
                , $isJunket
                , $roomId
                , $transactionId
                , $sessionId
                , $currency
                , $vendorMultiplier
                , $balance  
            )
        );
        
        $response->status = 1;
        $response->money = $this->getUserCredits();

        return response()->json($response);
    }

    public function cancelMulti($table, $range, Request $request)
    {
        $round = $this->getLatestRound($table);
        $vendor = app('db')->table('vendors')->where('id', $request->user()->vendor_id)->first();
        $response = 0;
        $logs = $request['logs'];

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

        app('db')->transaction(function () use ($round, $newRange, $table, $request, $vendor, &$response, $logs, $currency, $vendorMultiplier) {
            $bet = app('db')->connection('dragontiger')->table('bets')
                ->where('user_id', Auth::user()->id)
                ->where('round_id', $round->id)
                ->where('bet_range', $newRange)->first();

            if (!$bet) {
                $response = 1;
                $ret = new \stdClass;
                $ret->status = $response;
                $ret->money = $this->getUserCredits();
                return response()->json($ret);
            }

            $this->actionLogs($table, $request, []);
            // increment nihtan db or send request to operator api
            $transaction = $this->transact('cancel', $vendor, $request->user()->id, [
                'type' => 'cancel',
                'game' => 'Dragon-Tiger',
                'amount' => $bet->total_bet,
                'id' => $request->user()->id,
                'user_id' => $request->user()->user_id,
                'user_name' => $request->user()->user_name,
                'range' => $newRange,
                'table' => $table,
                'round_no' => $round->round_num,
                'currency' => $currency,
                'multiplier' => $vendorMultiplier,
                'session_id'=> Auth::user()->token,
                'bet_id'=> md5($request->user()->id . $request->user()->user_name . $round->id),
                'vendor_id' => $vendor->id,
                'vendor_name' => $vendor->vendor_name,
            ]);

            if ($transaction) {
                app('db')->connection('dragontiger')->table('bets')
                    ->where('id', $bet->id)->delete();
                $response = 1;
                // $this->storeBetLogs($table, $request, $request['logs']);
                //$this->storeBetLogs($table, $logs, $request);
            } else {
                $this->actionLogs($table, $request, ['comment' => 'fail']);
            }
        });

        $success_ret = new \stdClass;
        $success_ret->status = $response;
        $success_ret->money = $this->getUserCredits();

        return response()->json($success_ret);
    }



    /**
     * Store actions
     *
     * @param $table
     * @param Request $request
     */
    // public function storeBetLogs($table, $logs, $request)
    // {
    //     $round = $this->getLatestRoundNum($table);
    //     $type = 'r';

    //     $qry = "INSERT INTO bet_logs (`user_id`, `table_id`, `round_num`, `type`, `actions`, `ip`)"
    //         . " VALUES (?, ?, ?, ?, ?, ?)"
    //         . "ON DUPLICATE KEY UPDATE `actions` = JSON_MERGE(actions, ?)";

    //     DB::connection('dragontiger')->statement(DB::raw($qry), [
    //         Auth::user()->id,
    //         $table,
    //         $round,
    //         $type,
    //         json_encode($logs),
    //         $request->ip(),
    //         json_encode($logs)
    //     ]);

    //     // return json_encode($request->input('logs'));
    // }

        /**
     * @param $table
     * @param Request $request
     */

     public function actionLogs ($table, Request $request, $failLog)
     {
        $userIp = $request->ip();

        if(isset($failLog['comment'])) {
            $logs = json_encode($failLog);
        } else {
            $logs = json_encode($request->input('logs'));
        }

         $type = $request->input('type');

         $qry = " INSERT INTO action_logs (`user_id`, `table_id`, `round_num`, `type`, `actions`, `ip`, `created_at`)"
             . "VALUES (?, ?, ?, ?, ?, ?, CONCAT(UTC_DATE(), ' ', UTC_TIME())) "
             . "ON DUPLICATE KEY UPDATE `actions` = JSON_MERGE(actions, ?)";

         DB::connection('dragontiger')->statement(DB::raw($qry), [
             Auth::user()->id,
             $table,
             $this->getLatestRoundNum($request->input('table', $table)),
             $type,
             $logs,
             $userIp,
             $logs
         ]);
     }

    public function getLatestRoundNum($table)
    {
        return app('db')->connection('dragontiger')
            ->table('rounds')
            ->where('table_id', $table)
            ->orderBy('id', 'desc')->select('round_num')->first()->round_num;
    }


    public function getLatestRound($table)
    {
        return app('db')->connection('dragontiger')->table('rounds')
            ->where('table_id', $table)
            ->orderBy('id', 'desc')->select('id', 'round_num', 'status')->first();
    }

    public function getTotalBet(Request $request) {
        $round_id = $request->input('round_id');

        return  DB::connection('dragontiger')
            ->table('bets')
            ->where('round_id', $round_id)
            ->where('user_id',Auth::user()->id)->pluck('total_bet');
    }

    public function getTotalWin(Request $request) {
        $round_id = $request->input('round_id');

        return  DB::connection('dragontiger')
            ->table('bets')
            ->where('round_id', $round_id)
            ->where('user_id',Auth::user()->id)->pluck('total_winning');
    }

    public function getAllWin ($table) {

        $round = $this->getLatestRound($table);

        $win = DB::connection('dragontiger')->table('bets')
            ->where('round_id', $round->id)
            ->where('user_id',Auth::user()->id)->pluck('total_win');

        $bet = DB::connection('dragontiger')->table('bets')
            ->where('round_id', $round->id)
            ->where('user_id',Auth::user()->id)->pluck('total_bet');

        if(!count($win) && !count($bet)) {
            return 0;
        }

        return ["total_win" => $win[0], "bet" => $bet[0]];

    }
    public function deleteBet (Request $request) {
        var_dump($request->all());
        $round_id = $request->round_id;

        $stmt = "DELETE from bets where user_id = Auth::user()->id and round_id = ".$round_id;

        $db = DB::connection('dragontiger')->statement($stmt);
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
}
