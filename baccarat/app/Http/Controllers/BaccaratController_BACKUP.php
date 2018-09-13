<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Redirect;
use App;
use DB;
use Auth;
use Carbon\Carbon;

class BaccaratController extends Controller
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

    /**
     * Check if maintenance setting has 1 or more true statuses,
     * returns true if none
     *
     * @param $table
     * @return bool
     */
    
    public function setGameSettings(Request $r) {
        $default = json_decode(Auth::user()->last_game_info);
        $default->multibet = $r->input('data');

        app('db')->table('users')->where('id', app('auth')->user()->id)
        ->update([
            'last_game_info' => json_encode($default)
        ]);

    }

    public function isLive($table)
    {
        $maintenance = app('db')->connection('baccarat')
            ->table('game_tables')
            ->where('id', $table)
            ->first();

        $maintenance = is_object($maintenance) ? json_decode($maintenance->maintenance_setting, true) : [];
        $maintenanceData = [];

        for ($i=0; $i < count($maintenance['maintenance']); $i++) {
            if (isset($_GET['slave'])) {
                if ($maintenance['maintenance'][$i]['type'] === $_GET['slave']) {
                    $maintenanceData = $maintenance['maintenance'][$i]['info'];
                }
            }
            else {
                if ($maintenance['maintenance'][$i]['type'] === 'normal') {
                    $maintenanceData = $maintenance['maintenance'][$i]['info'];
                }
            }
        }

        return !array_filter($maintenanceData, function ($row) {
            return (int) $row['status'];
        });
    }

    /**
     * @param $table
     * @param $range
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function init($table)
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
        $currency = app('db')->table('vendors')
          ->where('id', app('auth')->user()->vendor_id)->first()->currency;

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
   
        // for ($i=0; $i < count($currentRange); $i++) {
        //     if ($currentRange[$i]->min == $currRange[0] && $currentRange[$i]->max == $currRange[1]) {
        //       $rangeDetails = $currentRange[$i];
        //       $hasRange = true;
        //     }
        // }

        if (!$hasRange) {
            // return Redirect::to('http://lobby.nihtanv2.com/?game=true');
        }

        // Bet range end
        $stream = json_decode($rangeInfo[0]->env_setting);
        $betConfig = json_decode($rangeInfo[0]->bet_setting);
        $bType = $betConfig->type;
        $type = null;
        $slave = null;
        // we check if betConfig is an array here
        if(is_array ($bType)) {
            foreach ($bType as &$value) {

                if($value == app('request')->input('slave'))
                     $slave=$value;
                if($value == 'normal' || $value == 'flippy')
                    $type = $value;
            }
        } else {
            $type = $betConfig->type;
        }
        //print_r();

        $data = DB::connection('baccarat');

        $round_id = $data->table('rounds')
            ->where('table_id', $table)
            ->orderBy('id','desc')->limit(1)->pluck('round_num')[0];

        $bets = $data->table('bets')->where('user_id', $user->id)->orderBy('id','desc')->first();

        $bets_all = $data->table('bets')->where('user_id', $user->id)
            ->orderBy('id','desc')->paginate(10)->toJson();

        $config = $this->getUserConfig();

        // if(intval($config->avarta->language->select) >= 4) {
        //   $config->avarta->language->select = 0;
        // }

        $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

        App::setLocale($locale);

        if(empty($config->avarta->chips)) {
            $config->avarta->chips = ["1","5","10","30","max"];
        }

        //checking previous bet to get slave
        $rid = $data->table('rounds')
            ->where('table_id', $table)
            ->orderBy('id','desc')->limit(1)->pluck('id')[0];

        if(!empty($bets) && $rid === $bets->round_id) {
            if($bets->type === 'b') {
                $slave = 'bonus';
            } else if($bets->type === 's') {
                $slave = 'supersix';
            }

        } 

        $isMatch = false;
        if(isset($config->avarta->range)) {
            $range  = $config->avarta->range;

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

        $multiplayer = 0;

        //game info
        $gameInfo = Auth::user()->last_game_info;
        // dd($gameInfo, $range);

        return view('index', [
            'config' => $config,
            'stream' => $stream,
            'betConfig' => $betConfig,
            'type' => $type,
            'slave' => $slave,
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
            'isPlayer' => $isPlayer[0]->flag,
            'allRange' => $currentRange,
            'gameInfo' => $gameInfo
        ]);
    }

    /**
     * @param $table
     * @param $range
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function initMobile ($table)
    {
        $user = Auth::user();
        $userId = app('auth')->user()->id;
        $userType = app('auth')->user()->user_type;

        if (!$this->isLive($table) && $user->authority != "a") {
            // return redirect('https://lobby.nihtanv2.com/m?game=true');
        }

        // Check if user is banker in Sicbo
        $isPlayer = $this->checkBanker();

        // === Currency
        $currencyArr = $this->getCurrencyData();
        $currencyMultiplier = $currencyArr[0]->multiplier;
        $currencyAbbrev = $currencyArr[0]->currency;
        $mainMultiplier = $currencyArr[0]->main_multiplier;

        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();
        $currency = app('db')->table('vendors')
          ->where('id', app('auth')->user()->vendor_id)->first()->currency;
        //==== Bet range start
        $currRange = explode("-",$range);
        $hasRange = false;

        if(Auth::user()->denomination) {
            $currencyMultiplier = Auth::user()->denomination;
        }

        if(Auth::user()->currency) {
            $currency = Auth::user()->currency; 
            $currencyAbbrev = Auth::user()->currency; 
        }
        
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

        $type = null;
        $slave = 'normal';
        // we check if betConfig is an array here
        if(is_array ($betConfig->type)) {
            foreach ($betConfig->type as &$value) {
                if($value == 'supersix' || $value == 'insurance' || $value == 'bonus')
                    $slave = $value;
                if($value == 'normal' || $value == 'flippy')
                    $type = $value;
            }
        } else {
            $type = $betConfig->type;
        }

        if (!$hasRange) {
            return Redirect::to('http://lobby.nihtanv2.com/m?game=true');
        }
        // Bet range end

        $type = null;
        $slave = 'normal';
        // we check if betConfig is an array here
        if(is_array ($betConfig->type)) {
          foreach ($betConfig->type as &$value) {
            if($value == app('request')->input('slave'))
            $slave = $value;
            if($value == 'normal' || $value == 'flippy')
            $type = $value;
          }
        } else {
          $type = $betConfig->type;
        }

        $data = DB::connection('baccarat');
        $round_id = $data->table('rounds')->where('table_id',$table)->orderBy('id','desc')->limit(1)->pluck('round_num')[0];
        $bets = $data->table('bets')->where('user_id', $user->id)->orderBy('id','desc')->first();
        $bets_all = $data->table('bets')->where('user_id', $user->id)->orderBy('id','desc')->paginate(10)->toJson();

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
            'betConfig' => $betConfig,
            'type' => $type,
            'slave' => $slave,
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
            'lobby_redirect_url' => Auth::user()->mo_redirect_url,
            'lobby_type' => $vendor->lobby_type,
            'room_yn' => $vendor->room_info_yn,
            'isPlayer' => $isPlayer[0]->flag
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

        // Check if user is banker in Sicbo
        $isPlayer = $this->checkBanker();

        // === Currency
        $currencyArr = $this->getCurrencyData();
        $currencyMultiplier = $currencyArr[0]->multiplier;
        $currencyAbbrev = $currencyArr[0]->currency;
        $mainMultiplier = $currencyArr[0]->main_multiplier;

        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();
        $currency = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first()->currency;

        //==== Bet range start
        $currRange = explode("-",$range);
        $hasRange = false;

        if(Auth::user()->denomination) {
            $currencyMultiplier = Auth::user()->denomination;
        }

        if(Auth::user()->currency) {
            $currency = Auth::user()->currency; 
            $currencyAbbrev = Auth::user()->currency; 
        }
        
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

        $type = null;
        $slave = 'normal';
        // we check if betConfig is an array here
        if(is_array ($betConfig->type)) {
            foreach ($betConfig->type as &$value) {
                if($value == 'supersix' || $value == 'insurance' || $value == 'bonus')
                    $slave = $value;
                if($value == 'normal' || $value == 'flippy')
                    $type = $value;
            }
        } else {
            $type = $betConfig->type;
        }

        if (!$hasRange) {
            return Redirect::to('http://lobby.nihtanv2.com/m?game=true');
        }
        // Bet range end

        $type = null;
        $slave = 'normal';

        // we check if betConfig is an array here
        if(is_array ($betConfig->type)) {
          foreach ($betConfig->type as &$value) {
            if($value == app('request')->input('slave'))
            $slave = $value;
            if($value == 'normal' || $value == 'flippy')
            $type = $value;
          }
        } else {
          $type = $betConfig->type;
        }

        $data = DB::connection('baccarat');
        $round_id = $data->table('rounds')->where('table_id',$table)->orderBy('id','desc')->limit(1)->pluck('round_num')[0];
        $bets = $data->table('bets')->where('user_id', $user->id)->orderBy('id','desc')->first();
        $bets_all = $data->table('bets')->where('user_id', $user->id)->orderBy('id','desc')->paginate(10)->toJson();

        $config = $this->getUserConfig();

        $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

        App::setLocale($locale);

        if(empty($config->avarta->chips)) {
            $config->avarta->chips = ["1","5","10","30","max"];
        }

        return view('index-mobile-non', [
            'config' => $config,
            'betConfig' => $betConfig,
            'type' => $type,
            'slave' => $slave,
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
            'lobby_redirect_url' => Auth::user()->mo_redirect_url,
            'lobby_type' => $vendor->lobby_type,
            'room_yn' => $vendor->room_info_yn,
            'isPlayer' => $isPlayer[0]->flag,
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

        return DB::select('CALL nihtan_api.USP_GET_BANKER_CHECK(?, ?, ?)', array(app('auth')->user()->id, 'baccarat', $token));
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
            if (in_array($key, ['effect', 'sound', 'volume', 'voice'])) {
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

      return DB::connection('baccarat')->table("baccarat.game_tables")
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

        //     //return $userId.'-'.$table.'-'.$slave;
        //     //print_r($request);
        // return DB::connection('baccarat')->table("baccarat.bets")
        //     ->join('baccarat.rounds', 'bets.round_id', '=', 'rounds.id')
        //     ->select('bets.round_id', 'bets.user_id', 'bets.bet_history', 'bets.total_bet', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'rounds.game_result', 'rounds.game_info', 'bets.total_rolling', 'bets.total_win', 'rounds.table_id', 'bets.total_lost', 'rounds.round_num', 'rounds.status')
        //     ->where('bets.user_id', '=', $userId)
        //     ->whereIn('bets.type', $slaves)
        //     ->where('rounds.table_id', '=', $table)
        //     ->whereIn('rounds.status', ['E', 'W'])
        //     ->orderBy('bets.round_id', 'DESC')
        //     ->paginate(18)->setPath('/betlogs');
            
        $userId = app('auth')->user()->id;
        $table = $request->input('tableId');
        $page = $request->input('betPage');
        $tableId = $request->input('tableId');
        $gameType = $request->input('gameType');
        $roundNum = $request->input('roundNum');
        $playType = $request->input('playType');

        // return DB::connection('dragontiger')->table("dragontiger.bets")
        //     ->join('dragontiger.rounds', 'bets.round_id', '=', 'rounds.id')
        //     // ->join('dragontiger.game_marks', 'rounds.id', '=', 'game_marks.round_id')
        //     ->select('bets.round_id', 'bets.user_id', 'bets.bet_history', 'bets.total_bet', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'rounds.game_result', 'rounds.game_info', 'bets.total_rolling', 'bets.total_win', 'rounds.table_id', 'bets.total_lost', 'rounds.round_num', 'rounds.status')
        //     ->where('bets.user_id', '=', $userId)
        //     ->where('rounds.table_id', '=', $table)
        //     ->whereIn('rounds.status', ['E', 'W'])
        //     ->orderBy('bets.round_id', 'DESC')
        //     ->paginate(10)->setPath('/betlogs')->toJson();

        return DB::select('CALL baccarat.USP_NEW_GET_BET_HISTORY(?, ?, ?, ?, ?)', array($gameType, app('auth')->user()->id, $tableId, $roundNum, $page));
    }

    public function getDetails(Request $request)
    {
        $userId = app('auth')->user()->id;
        $table = $request->input('tableId');
        $roundNum = $request->input('round');

        $betHistory = DB::connection('baccarat')->table("baccarat.bets")
            ->leftJoin('baccarat.rounds', [
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

        $currentRound = DB::connection('baccarat')->table("baccarat.rounds")
            ->where('table_id', $table)
            ->max('round_num');

        return DB::connection('baccarat')->table("baccarat.game_tables")
            ->join('baccarat.rounds', 'game_tables.id', '=', 'rounds.table_id')
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
                'rounds.game_result',
                'rounds.status'
            )
            ->where('game_tables.id', '=', $table)
            ->where('rounds.round_num', '<', $currentRound)
            ->orderBy('rounds.round_num', 'desc')
            ->paginate(10)->setPath('/gamehistory')->toJson();
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
        $vendorMultiplier = $vendorArr[0]->multiplier;

        $uCurrency = Auth::user()->denomination;
        if($uCurrency) {
            $vendorMultiplier = $uCurrency;
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

        $current = DB::connection('baccarat')->table('bets')
            ->where('user_id', Auth::user()->id)
            ->where('bet_range', $newRange)
            ->where('round_id', $round->id)->first();

        $prevBets = $current ? collect(json_decode($current->bet_history, true))->toArray(): [];
        $prevBetType = $current ? $current->type : $slave;
        $prevTotalBets = $current ? array_sum(array_column($prevBets, 'bet_money')) : 0;

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

        $sessionId = app('session')->getId();
        $transactionId = md5($request->user()->id . $request->user()->user_name . $round->id);
        if($check ===  true) {
            try {
                
                $this->actionLogs($table, $request, []);

                $insertQry = "INSERT INTO bets "
                    ."(`bet_history`, `created_at`, `bet_range`, "
                    . "`round_id`, `type`, `user_id`, `total_bet`, `total_rolling`,"
                    . "`total_winning`, `total_win`, `total_lost`, `device`, `bet_id`, `session_id`) "
                    . "VALUES (?, now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE "
                    . "bet_history = ?, total_bet = ?";

                DB::connection('baccarat')->statement(DB::connection('baccarat')->raw($insertQry), [
                    $bets,
                    $newRange,
                    $round->id,
                    $type,
                    Auth::user()->id,
                    $totalBets,
                    $totalBets,
                    0,
                    0,
                    0,
                    $is_mobile,
                    $transactionId,
                    $sessionId,
                    $bets,
                    $totalBets
                ]);

                 // decrement nihtan db or send request to operator api
                $transaction = $this->transact('bet', $vendor, $request->user()->id, [
                    'type' => 'bet',
                    'game' => 'Baccarat',
                    'table' => (string) $table,
                    'range' => $newRange,
                    'round_no' => (string) $round->round_num,
                    'amount' => (string) $betAmount,
                    'data' => $bets,
                    'user_id' => $request->user()->user_id,
                    'user_name' => $request->user()->user_name,
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
                        'is_mobile' => $is_mobile,
                        'totalBets' => $totalBets,
                        'betAmount' => $betAmount,
                        'range' => $range,
                        'table' => $table,
                        'bets' => $bets,
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
                app('log')->error($e);
                return $this->failHandle('err', $prevBets, $request, [
                        'newRange' => $newRange,
                        'round' => $round,
                        'type' => $type,
                        'prevTotalBets' => $prevTotalBets,
                        'is_mobile' => $is_mobile,
                        'totalBets' => $totalBets,
                        'betAmount' => $betAmount,
                        'range' => $range,
                        'table' => $table,
                        'bets' => $bets,
                        'b_id' => $current ? $current->id : null,
                        'bet_id' => $transactionId,
                        'session_id' => $sessionId
                    ]);
            }         
        }
        else {
            return response()->json($check);
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
            . "`round_id`, `type`, `user_id`, `total_bet`, `total_rolling`, `total_winning`, `total_win`,"
            . " `total_lost`, `device`, `bet_id`, `session_id`) "
            . "VALUES (?, now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE "
            . "bet_history = ?, total_bet = ?";

        if(!empty($prevBets)) {
            DB::connection('baccarat')->statement(DB::connection('baccarat')->raw($insertQry), [
                json_encode($prevBets),
                $data['newRange'],
                $data['round']->id,
                $data['type'],
                Auth::user()->id,
                $data['prevTotalBets'],
                $data['prevTotalBets'],
                0,
                0,
                0,
                $data['is_mobile'],
                $data['bet_id'],
                $data['session_id'],
                $data['bets'],
                $data['totalBets']
            ]);
        }

        $fail_ret = [
            'data' => count($prevBets) > 0 ? $prevBets : [],
            'fail' => 2,
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

    public function remove($round, $range, Request $request, $betAmount, $b_id) 
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
        
        // $current = DB::connection('baccarat')->table('bets')
        //     ->where('user_id', Auth::user()->id)
        //     ->where('bet_range', $newRange)
        //     ->where('round_id', $round->id)->first();

        $this->checking('cancel', Auth::user()->id, [
            'amount' => $betAmount
        ]);

        // if(!$current) {
        //     return;
        // }

        app('db')->connection('baccarat')->table('bets')
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

        // Bet range calculation
        $vendorArr = $this->getCurrencyData();
        $vendorMultiplier = $vendorArr[0]->multiplier;
        $uCurrency = Auth::user()->denomination;
        if($uCurrency) {
            $vendorMultiplier = $uCurrency;
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

        app('db')->transaction(function () use ($round, $newRange, $table, $request, $vendor, &$response) {
            $bet = app('db')->connection('baccarat')->table('bets')
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
            
            $prevBetType = $bet->type === 'f' ? 'r' : $bet->type;
            $slave = 'r';

            if($request->input('slave') == 'bonus') {
                $slave = 'b';
            } else if($request->input('slave') == 'supersix') {
                $slave = 's';
            }
            
            if($prevBetType != $slave) {
                $response = 1;
                $success_ret = new \stdClass;
                $success_ret->status = $response;
                $success_ret->money = $this->getUserCredits();

                return response()->json($success_ret);
            }
            
            $this->actionLogs($table, $request, []);

            // increment nihtan db or send request to operator api
            $transaction = $this->transact('cancel', $vendor, $request->user()->id, [
                'type' => 'cancel',
                'game' => 'Baccarat',
                'amount' => $bet->total_bet,
                'id' => $request->user()->id,
                'user_id' => $request->user()->user_id,
                'user_name' => $request->user()->user_name,
                'range' => $newRange,
                'table' => $table,
                'round_no' => $round->round_num,
                'session_id'=> app('session')->getId(),
                'bet_id'=> md5($request->user()->id . $request->user()->user_name . $round->id),
                'vendor_id' => $vendor->id,
                'vendor_name' => $vendor->vendor_name,
            ]);

            if ($transaction) {
                app('db')->connection('baccarat')->table('bets')
                    ->where('id', $bet->id)->delete();
                $response = 1;
            } else {
                $this->actionLogs($table, $request, ['comment' => 'fail']);
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
        $vendorMultiplier = $vendorArr[0]->multiplier;
        $uCurrency = Auth::user()->denomination;
        if($uCurrency) {
            $vendorMultiplier = $uCurrency;
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

        app('db')->transaction(function () use ($round, $newRange, $table, $request, $vendor, &$response) {
            $bet = app('db')->connection('baccarat')->table('bets')
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
                'game' => 'Baccarat',
                'amount' => $bet->total_bet,
                'id' => $request->user()->id,
                'user_id' => $request->user()->user_id,
                'user_name' => $request->user()->user_name,
                'range' => $newRange,
                'table' => $table,
                'round_no' => $round->round_num,
                'session_id'=> app('session')->getId(),
                'bet_id'=> md5($request->user()->id . $request->user()->user_name . $round->id),
                'vendor_id' => $vendor->id,
                'vendor_name' => $vendor->vendor_name,
            ]);

            if ($transaction) {
                app('db')->connection('baccarat')->table('bets')
                    ->where('id', $bet->id)->delete();
                $response = 1;
                //$this->storeBetLogs($table, $request, $request['logs']);
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

        DB::connection('baccarat')->statement(DB::raw($qry), [
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
        return app('db')->connection('baccarat')->table('rounds')
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
        return app('db')->connection('baccarat')->table('rounds')
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
        return  app('db')->connection('baccarat')->table('bets')
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

        return  app('db')->connection('baccarat')
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
        $conn = app('db')->connection('baccarat');
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
