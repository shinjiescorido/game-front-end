<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App;
use Auth;
use DB;
use Redirect;
use Carbon\Carbon;

class SicboController extends Controller
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
    public function isLive($table)
    {
        $maintenance = app('db')->connection('sicbo')
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
    public function index($table, $range)
    {   
        $nihtan = DB::connection('mysql');
        $user = Auth::user();
        $userId = app('auth')->user()->id;
        $userType = app('auth')->user()->user_type;

        //==== Bet range start
        $currRange = explode("-",$range);
        $hasRange = false;
        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();

        if (!$this->isLive($table)) {
            // return redirect('https://lobby.nihtanv2.com/?game=true');
        }

        // Check if user is banker in Sicbo
        $isPlayer = $this->checkBanker();

        // === Currency
        $currencyMultiplier = $vendor->multiplier;
        $currencyAbbrev = $vendor->currency;

        if(Auth::user()->denomination) {
            $currencyMultiplier = Auth::user()->denomination;
        }

        if(Auth::user()->currency) {
            $currencyAbbrev = Auth::user()->currency; 
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

        // === start of range === //
        $rangeInfo = $this->getBetRangeInfo($userId, $table);

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
            return Redirect::to('http://lobby.nihtanv2.com');
        }

        $stream = json_decode($rangeInfo[0]->env_setting);
        // === end of range === //

        $data = DB::connection('sicbo');
        $round_id = $data->table('rounds')->orderBy('id','desc')->limit(1)->pluck('round_num')[0];
        $bets = $data->table('bets')->where('user_id', $user->id)->orderBy('id','desc')->first();
        $bets_all = $data->table('bets')->where('user_id', $user->id)->orderBy('id','desc')->paginate(10)->toJson();
        $last150res = $data->table('rounds')->select('game_info')->where('table_id',13)->orderBy('id','desc')->limit(150)->get();

        $config = $this->getUserConfig();
        
        // if(intval($config->avarta->language->select) >= 4) {
        //   $config->avarta->language->select = 0;
        // }

        $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

        App::setLocale($locale);

        if(empty($config->avarta->chips)) {
            $config->avarta->chips = ["1","5","10","30","max"];
        }
        return view('index', [
            'stream' => $stream,
            'config' => $config,
            'money' => $this->getUserCredits(),
            'user_name' => $user->user_name,
            'round_id' => $round_id,
            'bets' => $bets,
            'all_bets' => $bets_all,
            'last150res' => $last150res,
            "tableNum" => $table,
            "range" => (string) $range,
            'rangeDetails' => json_encode($rangeDetails),
            'currencyMultiplier' => $currencyMultiplier,
            'currencyAbbrev' => $currencyAbbrev,
            'userMultiplier' => app('auth')->user()->multiplier,
            'userChips' => json_encode($config->avarta->chips),
            'integrationType' => $vendor->integration_type,
            'reel_yn' => $vendor->reel_yn,
            'room_yn' => $vendor->room_info_yn,
            'lobby_redirect_url' => Auth::user()->pc_redirect_url,
            'lobby_type' => $vendor->lobby_type,
            'isRoom' => $isRoom,
            'isBanker' => $isBanker,
            'vendorData' => json_encode($vendorData),
            'isPlayer' => $isPlayer[0]->flag
        ]);
    }

    public function indexNonMobile($table, $range)
    {
        $nihtan = DB::connection('mysql');
        $user = $nihtan->table('users')->where('id',Auth::user()->id)->first();
        $userType = app('auth')->user()->user_type;

        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();

        // Check if user is banker in Sicbo
        $isPlayer = $this->checkBanker();

        // === Currency
        $currencyMultiplier = $vendor->multiplier;
        $currencyAbbrev = $vendor->currency;

        if(Auth::user()->denomination) {
            $currencyMultiplier = Auth::user()->denomination;
        }

        if(Auth::user()->currency) {
            $currencyAbbrev = Auth::user()->currency; 
        }

        // Check room if normal or created room
        $isBanker = 0;
        $isRoom = 0;
        $vendorData = [];
        if (isset($_GET['token'])) {
            $vendorData = $this->getVendor($_GET['token'], $table, $range);
            $checkRoom = $this->checkRoom($_GET['token'], $table, $range);

            if ($vendorData == false) {
                return Redirect::to('http://lobby.nihtanv2.com/m?game=true');
            }

            if ($checkRoom[0]->flag == 'true') {
                $isRoom = 1;

                if ($checkRoom[0]->cnt > 0) {
                    $isBanker = 1;
                }
            }
            else {
                return Redirect::to(env('LOBBY_DOMAIN').'m?game=true');
            }
        }

        //==== Bet range start
        $currRange = explode("-",$range);
        $hasRange = false;

        $rangeInfo = $this->getBetRangeInfo(Auth::user()->id, $table);
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
        // === end of range === //

        $data = DB::connection('sicbo');
        $round_id = $data->table('rounds')->where('table_id',$table)->orderBy('id','desc')->limit(1)->pluck('round_num')[0];
        $bets = $data->table('bets')->where('user_id', Auth::user()->id)->orderBy('id','desc')->first();
        $bets_all = $data->table('bets')->where('user_id', Auth::user()->id)->orderBy('id','desc')->paginate(10)->toJson();
        $last150res = $data->table('rounds')->select('game_info')->where('table_id',$table)->orderBy('id','desc')->limit(150)->get();

        $config = $this->getUserConfig();
        $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

        App::setLocale($locale);
        if(empty($config->avarta->chips)) {
            $config->avarta->chips = ["1","5","10","30","max"];
        }

        return view('index-mobile-non', [
            'config' => $config,
            'money' => $this->getUserCredits(),
            'user_name' => $user->user_name,
            'round_id' => $round_id,
            'bets' => $bets,
            'all_bets' => $bets_all,
            'last150res' => $last150res,
            'table' => $table,
            'range' => $range,
            'rangeDetails' => json_encode($rangeDetails),
            'currencyMultiplier' => $currencyMultiplier,
            'currencyAbbrev' => $currencyAbbrev,
            'userMultiplier' => app('auth')->user()->multiplier,
            'userChips' => json_encode($config->avarta->chips),
            'integrationType' => $vendor->integration_type,
            'lobby_redirect_url' => Auth::user()->mo_redirect_url,
            'lobby_type' => $vendor->lobby_type,
            'room_yn' => $vendor->room_info_yn,
            'isRoom' => $isRoom,
            'isBanker' => $isBanker,
            'vendorData' => json_encode($vendorData),
            'isPlayer' => $isPlayer[0]->flag,
            'nonInstall' => true
        ]);
    }

    public function indexMobile($table, $range)
    {
        $nihtan = DB::connection('mysql');

        $user = $nihtan->table('users')->where('id',Auth::user()->id)->first();
        $userType = app('auth')->user()->user_type;

        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();

        // Check if user is banker in Sicbo
        $isPlayer = $this->checkBanker();

        // === Currency
        $currencyMultiplier = $vendor->multiplier;
        $currencyAbbrev = $vendor->currency;

        if(Auth::user()->denomination) {
            $currencyMultiplier = Auth::user()->denomination;
        }

        if(Auth::user()->currency) {
            $currencyAbbrev = Auth::user()->currency; 
        }

        // Check room if normal or created room
        $isBanker = 0;
        $isRoom = 0;
        $vendorData = [];
        if (isset($_GET['token'])) {
            $vendorData = $this->getVendor($_GET['token'], $table, $range);
            $checkRoom = $this->checkRoom($_GET['token'], $table, $range);

            if ($vendorData == false) {
                return Redirect::to('http://lobby.nihtanv2.com/m?game=true');
            }

            if ($checkRoom[0]->flag == 'true') {
                $isRoom = 1;

                if ($checkRoom[0]->cnt > 0) {
                    $isBanker = 1;
                }
            }
            else {
                return Redirect::to(env('LOBBY_DOMAIN').'m?game=true');
            }
        }

        //==== Bet range start
        $currRange = explode("-",$range);
        $hasRange = false;

        $rangeInfo = $this->getBetRangeInfo(Auth::user()->id, $table);
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
        // === end of range === //

        $data = DB::connection('sicbo');

        $round_id = $data->table('rounds')->where('table_id',$table)->orderBy('id','desc')->limit(1)->pluck('round_num')[0];

        $bets = $data->table('bets')->where('user_id', Auth::user()->id)->orderBy('id','desc')->first();

        $bets_all = $data->table('bets')->where('user_id', Auth::user()->id)->orderBy('id','desc')->paginate(10)->toJson();

        $last150res = $data->table('rounds')->select('game_info')->where('table_id',$table)->orderBy('id','desc')->limit(150)->get();

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
            'money' => $this->getUserCredits(),
            'user_name' => $user->user_name,
            'round_id' => $round_id,
            'bets' => $bets,
            'all_bets' => $bets_all,
            'last150res' => $last150res,
            'table' => $table,
            'range' => $range,
            'rangeDetails' => json_encode($rangeDetails),
            'currencyMultiplier' => $currencyMultiplier,
            'currencyAbbrev' => $currencyAbbrev,
            'userMultiplier' => app('auth')->user()->multiplier,
            'userChips' => json_encode($config->avarta->chips),
            'integrationType' => $vendor->integration_type,
            'lobby_redirect_url' => Auth::user()->mo_redirect_url,
            'lobby_type' => $vendor->lobby_type,
            'room_yn' => $vendor->room_info_yn,
            'isRoom' => $isRoom,
            'isBanker' => $isBanker,
            'vendorData' => json_encode($vendorData),
            'isPlayer' => $isPlayer[0]->flag
        ]);
    }

    public function checkReject()
    {
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

        return DB::select('CALL nihtan_api.USP_GET_BANKER_CHECK(?, ?, ?)', array(app('auth')->user()->id, 'sicbo', $token));
    }
    
    public function getVendor($token, $table, $range)
    {
        $roomData = DB::connection('sicbo')->table("sicbo.rooms")
            ->select('user_id', 'id', 'players_cnt', 'title', 'bet_range', 'password')
            ->where('table_id', $table)
            ->where('bet_range', $range)
            ->where('token', $token)
            ->get()->first();

        if ($roomData == null) {
            return false;
        }

        $banker = DB::table('users')->select('user_name', 'vendor_id', 'multiplier')->where('id', $roomData->user_id)->get()->first();

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
            'token' => $token
        ];

        return $bankerData;
    }

    public function checkRoom($token, $table, $range)
    {
        return DB::select('CALL sicbo.USP_GET_BET_RANGE(?, ?, ?, ?)', array($table, app('auth')->user()->id, $range, $token));
    }

    public function getCurrencyData()
    {
        return DB::table('vendors')
            ->select('multiplier', 'currency')
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

            if($key == "tutorial") {
                if(!isset( $config->avarta->tutorial))  $config->avarta->tutorial = json_decode('{ "enabled" : "true"}');
                $config->avarta->tutorial->enabled = $value;
            }
            else if ($key == "chips") {
                if(!isset( $config->avarta->chips))  $config->avarta->chips = json_decode('{ "chips" : " ["1", "10", "30", "50", "max"]"}');
                $config->avarta->chips = $value;
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

    public function getTransferLogs(Request $request)
    {
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

        // return DB::connection('sicbo')->table("sicbo.bets")
        //     ->join('sicbo.rounds', 'bets.round_id', '=', 'rounds.id')
        //     // ->join('sicbo.game_marks', 'rounds.id', '=', 'game_marks.round_id')
        //     ->select('bets.round_id', 'bets.user_id', 'bets.bet_history', 'bets.total_bet', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'rounds.game_result', 'rounds.game_info', 'bets.total_rolling', 'bets.total_win', 'rounds.table_id', 'bets.total_lost', 'rounds.round_num', 'rounds.status')
        //     ->where('bets.user_id', '=', $userId)
        //     ->where('rounds.table_id', '=', $table)
        //     ->whereIn('rounds.status', ['E', 'W'])
        //     ->orderBy('bets.round_id', 'DESC')
        //     ->paginate(10)->setPath('/betlogs')->toJson();
        
        return DB::select('CALL nihtan_api.USP_GET_GAME_BET_HISTORY(?, ?, ?, ?, ?, ?, ?)', array($gameType, 'sicbo', $playType, app('auth')->user()->id, $tableId, $roundNum, $page));
    }

    public function getDetails(Request $request) {
        $userId = app('auth')->user()->id;
        $table = $request->input('tableId');
        $roundNum = $request->input('round');

        $betHistory = DB::connection('sicbo')->table("sicbo.bets")
            ->leftJoin('sicbo.rounds', [
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

        $currentRound = DB::connection('sicbo')->table("sicbo.rounds")
            ->where('table_id', $table)
            ->max('round_num');

        return DB::connection('sicbo')->table("sicbo.game_tables")
            ->join('sicbo.rounds', 'game_tables.id', '=', 'rounds.table_id')
            ->join('nihtan_api.dealers', 'rounds.dealer_id', '=', 'nihtan_api.dealers.id')
            // ->join('sicbo.game_marks', function($join) {
            //     $join->on('rounds.id', '=', 'game_marks.round_id');
            //     $join->on('rounds.table_id', '=', 'game_marks.table_id');
            // })
            ->select('rounds.round_num', 'rounds.created_at', 'nihtan_api.dealers.name', 'rounds.game_info', 'rounds.id', 'rounds.status')
            ->where('game_tables.id', '=', $table)
            ->where('rounds.round_num', '<', $currentRound)
            ->orderBy('rounds.round_num', 'desc')
            ->paginate(10)->setPath('/gamehistory')->toJson();
    }

    public function getUser() {
        $nihtan = DB::connection('mysql');

        $user = $nihtan->table('users')->where('id',Auth::user()->id)->first();

        $user->money = $this->getUserCredits();

        return json_encode($user);
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
        $roomId = $request->input('roomId');

        $now = Carbon::now()->toDateTimeString();
        $insert['bets'] = [];
        $totalBets = 0;

        $round = $this->getLatestRound($request->input('table', $table));
        $device = $request->input('device');

        if($request->input('is_multibet')) {
            $device = 's';
        }
        
        $vendor = app('db')->table('vendors')->where('id', $request->user()->vendor_id)->first();
        $logs = $request->input('logs');
        $type = 'r';

        if ($roomId != null) {
            $type = 'u';
        }

        // Bet range calculation
        $vendorArr = $this->getCurrencyData();
        $vendorMultiplier = $vendorArr[0]->multiplier;
        $uCurrency = Auth::user()->denomination;
        if($uCurrency) {
            $vendorMultiplier = $uCurrency;
        }
        $vendorRange = explode("-",$range);

        $rangeMin = $vendorRange[0] * (int)$vendorMultiplier;
        $rangeMax = $vendorRange[1] * (int)$vendorMultiplier;
        $newRange = $rangeMin .'-'. $rangeMax;
        
        $current = DB::connection('sicbo')->table('bets')
            ->where('user_id', Auth::user()->id)
            ->where('bet_range', $newRange)
            ->where('round_id', $round->id)->first();

        $prevBets = $current ? collect(json_decode($current->bet_history, true))->toArray(): []; //->groupBy('bet')
        $prevTotalBets = $current ? array_sum(array_column($prevBets, 'bet_money')) : 0;

        $total_bet_money = 0;

        for($x = 0; $x < count($data); $x++) {
            $key = $data[$x]['table_id'];

            $betMoney = !((int) $data[$x]['amount']) && array_key_exists($key, $prevBets)
            && $prevBets[$key]['bet_money'] ? abs($prevBets[$key]['bet_money']) : abs($data[$x]['amount']);

            $insert['bets'][$x] = [
                'bet' => $key,
                'bet_money' => $betMoney,
                'user_money' => ($x == 0)
                    ? $uMoney + $prevTotalBets : ($uMoney + $prevTotalBets) - $totalBets,
                // 'dividends' => $data[$x]['dividend'] ,
                'win_money' => 0
            ];

            $totalBets += $betMoney;
            $total_bet_money += $betMoney;
        }

        $betAmount = $current ? $total_bet_money - $current->total_bet : $totalBets;
        // decrement nihtan db or send request to operator api
        $bets = json_encode($insert['bets']);

        $check = $this->checking('bet', $request->user()->id, [
            'amount' => $betAmount,
            'round' => $round,
            'prevBets' => $prevBets
        ]);
        
        $sessionId = app('session')->getId();
        $transactionId = md5($request->user()->id . $request->user()->user_name . $round->id);
        if($check ===  true) {
            try {
                $this->actionLogs($table, $request, []);

                
                $insertQry = "INSERT INTO bets"
                    . " (`bet_history`, `created_at`,"
                    . " `round_id`, `type`, `user_id`, `total_bet`, `total_rolling`, `total_winning`, `total_win`, `total_lost`, `bet_range`, `device`, `commission`, `play_type`, `room_id`, `commission_info`, `bet_id`, `session_id`) "
                    . "VALUES (?, now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'p', ?, NULL, ?, ?) ON DUPLICATE KEY UPDATE "
                    . "`bet_history` = ?, `total_bet` = ?, `total_rolling` = ?";

                DB::connection('sicbo')->statement(DB::raw($insertQry), [
                    $bets,
                    $round->id,
                    $type,
                    Auth::user()->id,
                    $total_bet_money,
                    $total_bet_money,
                    0,
                    0,
                    0,
                    $newRange,
                    $device,
                    $roomId,
                    $transactionId,
                    $sessionId,
                    $bets,
                    $total_bet_money,
                    $total_bet_money
                ]);

                 $transaction = $this->transact('bet', $vendor, $request->user()->id, [
                    'type' => 'bet',
                    'game' => 'Sicbo',
                    'table' => $table,
                    'range' => $newRange,
                    'round_no' => $round->round_num,
                    'amount' => $betAmount,
                    'data' => $bets,
                    'user_id' => $request->user()->user_id,
                    'user_name' => $request->user()->user_name,
                    'session_id' => $sessionId,
                    'bet_id' => $transactionId,
                    'vendor_name' => $vendor->vendor_name,
                    'created_at' => $now
                ]);

                if(!$transaction) {

                    return $this->failHandle('', $prevBets, $request, [
                        'newRange' => $newRange,
                        'round' => $round,
                        'type' => $type,
                        'prevTotalBets' => $prevTotalBets,
                        'device' => $device,
                        'total_bet_money' => $total_bet_money,
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
            catch(\Exception $e) {

                return $this->failHandle('err', $prevBets, $request, [
                    'newRange' => $newRange,
                    'round' => $round,
                    'type' => $type,
                    'prevTotalBets' => $prevTotalBets,
                    'device' => $device,
                    'total_bet_money' => $total_bet_money,
                    'betAmount' => $betAmount,
                    'range' => $range,
                    'table' => $table,
                    'bets' => $bets,
                    'b_id' => $current ? $current->id : null,
                    'bet_id' => $transactionId,
                    'session_id' => $sessionId
                ]);
            }
        } else {
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

        $this->remove($data['round'], $data['range'], $request, $data['betAmount'], $data['b_id']);

        $insertQry = "INSERT INTO bets"
            . " (`bet_history`, `created_at`,"
            . " `round_id`, `type`, `user_id`, `total_bet`, `total_rolling`, `total_winning`, `total_win`, `total_lost`, `bet_range`, `device`, `bet_id`, `session_id`)"
            . " VALUES (?, now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE"
            . " `bet_history` = ?, `total_bet` = ?";

        if(!empty($prevBets)) {
            DB::connection('sicbo')->statement(DB::raw($insertQry), [
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
                $data['session_id'],
                $data['bets'],
                $data['total_bet_money']
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
     * remvove user bet and credit bet amount back to the user// doesn't call api
     *
     * @param $round
     * @param $range
     * @param Request $request
     */

    public function remove($round, $range, Request $request, $betAmount, $b_id) 
    {

        // $vendor = app('db')->table('vendors')->where('id', $request->user()->vendor_id)->first();
        // $response = 0;

        // // Bet range calculation
        // $vendorArr = $this->getCurrencyData();
        // $vendorMultiplier = $vendorArr[0]->multiplier;
        // $vendorRange = explode("-",$range);

        // $rangeMin = $vendorRange[0] * (int)$vendorMultiplier;
        // $rangeMax = $vendorRange[1] * (int)$vendorMultiplier;
        // $newRange = $rangeMin .'-'. $rangeMax;
        
        // $this->checking('cancel', Auth::user()->id, [
        //     'amount' => $betAmount
        // ]);

        // $bet = app('db')->connection('sicbo')->table('bets')
        //     ->where('user_id', Auth::user()->id)
        //     ->where('round_id', $round->id)
        //     ->where('bet_range', $newRange)->first();

        if(!$b_id) return;

        app('db')->connection('sicbo')->table('bets')
            ->where('id', $b_id)->delete();
    }

    /**
     * Cancel user bet
     *
     * @param $table
     * @param $range
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

        $rangeMin = $vendorRange[0] * (int)$vendorMultiplier;
        $rangeMax = $vendorRange[1] * (int)$vendorMultiplier;
        $newRange = $rangeMin .'-'. $rangeMax;

        app('db')->transaction(function () use ($round, $newRange, $table, $request, $vendor, &$response) {
            $bet = app('db')->connection('sicbo')->table('bets')
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
                'game' => 'Sicbo',
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
                app('db')->connection('sicbo')->table('bets')
                    ->where('id', $bet->id)->delete();
                $response = 1;

                //$this->storeBetLogs($table,  $request['logs'], $request);
                // $this->storeBetLogs($table, $request, $request['logs']);
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

        $rangeMin = $vendorRange[0] * (int)$vendorMultiplier;
        $rangeMax = $vendorRange[1] * (int)$vendorMultiplier;
        $newRange = $rangeMin .'-'. $rangeMax;

        app('db')->transaction(function () use ($round, $newRange, $table, $request, $vendor, &$response) {
            $bet = app('db')->connection('sicbo')->table('bets')
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
                'game' => 'Sicbo',
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
                app('db')->connection('sicbo')->table('bets')
                    ->where('id', $bet->id)->delete();
                $response = 1;

                //$this->storeBetLogs($table,  $request['logs'], $request);
                // $this->storeBetLogs($table, $request, $request['logs']);
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
     */
    // public function storeBetLogs ($table, $logs, Request $request) {

    //     $round = $this->getLatestRoundNum($table);
    //     $type = 'r';

    //     $qry = " INSERT INTO bet_logs (`user_id`, `table_id`, `round_num`, `type`, `actions`, `ip`)"
    //         . "VALUES (?, ?, ?, ?, ?, ?)"
    //         . "ON DUPLICATE KEY UPDATE `actions` = JSON_MERGE(actions, ?)";

    //     DB::connection('sicbo')->statement(DB::raw($qry), [
    //         Auth::user()->id,
    //         $table,
    //         $round,
    //         $type,
    //         json_encode($logs),
    //         $request->ip(),
    //         json_encode($logs)
    //     ]);
    // }

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

        DB::connection('sicbo')->statement(DB::raw($qry), [
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
        return app('db')->connection('sicbo')->table('rounds')
            ->where('table_id', $table)
            ->orderBy('id', 'desc')->select('round_num')->first()->round_num;
    }

    public function getLatestRound($table)
    {

        return app('db')->connection('sicbo')->table('rounds')
            ->where('table_id', $table)
            ->orderBy('id', 'desc')->select('id', 'status', 'round_num')->first();
    }

    public function getAllWin ($table) {

        $round = $this->getLatestRound($table);

        $win = DB::connection('sicbo')->table('bets')
            ->where('round_id', $round->id)

            ->where('user_id', Auth::user()->id)->pluck('total_win');

        $bet = DB::connection('sicbo')->table('bets')
            ->where('round_id', $round->id)
            ->where('user_id', Auth::user()->id)->pluck('total_bet');

        if(!count($win) && !count($bet)) {
            return 0;
        }

        return ["total_win" => $win[0], "bet" => $bet[0]];
    }

    public function sample ()
    {
        $d = DB::table('rounds')->get();

        $data = [];

        $qry = "";
        $temp = [];
        for($x  = 0; $x < count($d); $x++) {

            $data[$x] = json_decode($d[$x]->game_info);

            if( property_exists($data[$x], 'dice') && strlen($data[$x]->dice) > 2) {
                $temp[$x] = [
                    'one' => $data[$x]->dice[0],
                    'two' => $data[$x]->dice[1],
                    'three' => $data[$x]->dice[2]
                ];


                $qry = "UPDATE rounds set game_info = '" . json_encode($temp[$x]) . "' where id = ". $d[$x]->id."; ";
                DB::connection('sicbo')->statement(DB::raw($qry));

                // $qry .= 'UPDATE rounds set game_info =  "{ "one" : '.$data[$x]->dice[0].'",two" : '.$data[$x]->dice[1].', "three":'.$data[$x]->dice[2].'}" where id = '.  $d[$x]->id.'; ';
            }
        }
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

        return DB::connection('sicbo')->table("sicbo.game_tables")
            ->where('id', $table)
            ->where('status', '=', '1')
            ->get();
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
        $password;

        if ($request->input('password') != '') {
            $password = hash("SHA256", $request->input('password'));
        }
        else {
            $password = '';
        }

        DB::select('CALL USP_ROOMS_SAVE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', array($flag, 'sicbo', $roomId, $tableId, $userId, $status, '', $password, '', 0));
        return $password;
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

        return DB::select('CALL USP_ROOM_USER_SAVE(?, ?, ?, ?, ?)', array($roomId, $tableId, $roundNum, 'sicbo', $users));
    }

    public function getRoomStatus(Request $request)
    {
        $roomId = $request->input('roomId');
        return DB::select('CALL sicbo.USP_GET_ACTIVE_CHECK(?)', array($roomId));
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
}
