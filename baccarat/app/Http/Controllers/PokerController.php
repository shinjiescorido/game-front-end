<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Redirect;
use App;
use Auth;
use DB;
use Carbon\Carbon;

class PokerController extends Controller
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

    public function getUser()
    {
        $nihtan = DB::connection('mysql');

        $user = $nihtan->table('users')->where('id', Auth::user()->id)->first();

        $user->money = $this->getUserCredits();

        return json_encode($user);
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

    public function index($table, $range, Request $request)
    {
        $nihtan = DB::connection('mysql');
        $user = Auth::user();
        $userId = app('auth')->user()->id;
        $userType = app('auth')->user()->user_type;
        $type = $request->input('slave') ?? 'normal';

        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();

        // Check if user is banker in Sicbo
        $isPlayer = $this->checkBanker();

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

        //==== Bet range & type(normal or bonusplus) start
        $currRange = explode("-",$range);
        $hasRange = false;

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

        $table_types = json_decode($rangeInfo[0]->bet_setting)->type;
        if (!$hasRange || array_search($type, $table_types) === false) {
            return Redirect::to('http://lobby.nihtanv2.com');
        }

        $bet_type = ['normal' => 'r', 'bonusplus' => 'b'][$type];
        //==== Bet range & type(normal or bonusplus) end
        $data = DB::connection('poker');

        $round_id = $data->table('rounds')->where('table_id',$table)->orderBy('id','desc')->limit(1)->pluck('round_num')[0];

        $bets = $data->table('bets')->where('bets.user_id', $user->id)->join('rounds', 'rounds.id', 'bets.round_id')
        ->orderBy('bets.id','desc')->first();

        $bets_all = $data->table('bets')->where('user_id', $user->id)->orderBy('id','desc')->paginate(10)->toJson();

        $config = $this->getUserConfig();

        // if(intval($config->avarta->language->select) >= 4) {
        //   $config->avarta->language->select = 0;
        // }

        $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

        App::setLocale($locale);  
        
        $stream = json_decode($rangeInfo[0]->env_setting);

        if(empty($config->avarta->chips)) {
          $config->avarta->chips = ["1","5","10","30","max"];
        }

        return view('index', [
            'stream' => $stream,
            'config' => $config,
            'money' => $this->getUserCredits(),
            'user_name' => $user->user_name,
            'round_id' => $round_id,
            'bets' => json_encode($bets),
            'bet_type' => $bet_type,
            'all_bets' => $bets_all,
            'tableNum' => $table,
            'range' => $range,
            'rangeDetails' => json_encode($rangeDetails),
            'currencyMultiplier' => $currencyMultiplier,
            'currencyAbbrev' => $currencyAbbrev,
            'userMultiplier' => app('auth')->user()->multiplier,
            'userChips' => json_encode($config->avarta->chips),
            'mainMultiplier' => $mainMultiplier,
            'integrationType' => $vendor->integration_type,
            'reel_yn' => $vendor->reel_yn,
            'lobby_redirect_url' => Auth::user()->pc_redirect_url,
            'lobby_type' => $vendor->lobby_type,
            'isPlayer' => $isPlayer[0]->flag
          ]);

    }
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
            else{
                $config->avarta->{$key}->select = $value;
            }
        }

        app('db')->table('users')->where('id', app('auth')->user()->id)
            ->update([
                'configs' => json_encode($config)
            ]);
    }

    public function indexMobile($table, $range, Request $request)
    {
        $nihtan = DB::connection('mysql');
        $user = Auth::user();

        $userId = app('auth')->user()->id;
        $userType = app('auth')->user()->user_type;
        $type = $request->input('slave') ?? 'normal';

        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();

        // Check if user is banker in Sicbo
        $isPlayer = $this->checkBanker();

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

        //==== Bet range & type(normal or bonusplus) start
        $currRange = explode("-",$range);
        $hasRange = false;
        
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

        $table_types = json_decode($rangeInfo[0]->bet_setting)->type;
        if (!$hasRange || array_search($type, $table_types) === false) {
            return Redirect::to('http://lobby.nihtanv2.com/m');
        }

        $bet_type = ['normal' => 'r', 'bonusplus' => 'b'][$type];
        //==== Bet range & type(normal or bonusplus) end

        $data = DB::connection('poker');

        $round_id = $data->table('rounds')->where('table_id',$table)->orderBy('id','desc')->limit(1)->pluck('round_num')[0];

        $bets = $data->table('bets')->where('bets.user_id', $user->id)->join('rounds', 'rounds.id', 'bets.round_id')
        ->orderBy('bets.id','desc')->first();

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
            'range' => $range,
            'money' => $this->getUserCredits(),
            'user_name' => $user->user_name,
            'round_id' => $round_id,
            'bets' => json_encode($bets),
            'bet_type' => $bet_type,
            'all_bets' => $bets_all,
            'table' => $table,
            "rangeDetails" => json_encode($rangeDetails),
            'currencyMultiplier' => $currencyMultiplier,
            'currencyAbbrev' => $currencyAbbrev,
            'userMultiplier' => app('auth')->user()->multiplier,
            'userChips' => json_encode($config->avarta->chips),
            'mainMultiplier' => $mainMultiplier,
            'integrationType' => $vendor->integration_type,
            'lobby_redirect_url' => Auth::user()->mo_redirect_url,
            'lobby_type' => $vendor->lobby_type,
            'isPlayer' => $isPlayer[0]->flag
        ]);
    }

    public function indexNonMobile($table, $range, Request $request)
    {
        $nihtan = DB::connection('mysql');
        $user = Auth::user();

        $userId = app('auth')->user()->id;
        $userType = app('auth')->user()->user_type;
        $type = $request->input('slave') ?? 'normal';

        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();

        // Check if user is banker in Sicbo
        $isPlayer = $this->checkBanker();

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

        //==== Bet range & type(normal or bonusplus) start
        $currRange = explode("-",$range);
        $hasRange = false;
        
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

        $table_types = json_decode($rangeInfo[0]->bet_setting)->type;
        if (!$hasRange || array_search($type, $table_types) === false) {
            return Redirect::to('http://lobby.nihtanv2.com/m');
        }

        $bet_type = ['normal' => 'r', 'bonusplus' => 'b'][$type];
        //==== Bet range & type(normal or bonusplus) end

        $data = DB::connection('poker');
        $round_id = $data->table('rounds')->where('table_id',$table)->orderBy('id','desc')->limit(1)->pluck('round_num')[0];
        $bets = $data->table('bets')->where('bets.user_id', $user->id)->join('rounds', 'rounds.id', 'bets.round_id')->orderBy('bets.id','desc')->first();
        $bets_all = $data->table('bets')->where('user_id', $user->id)->orderBy('id','desc')->paginate(10)->toJson();

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
            'bets' => json_encode($bets),
            'bet_type' => $bet_type,
            'all_bets' => $bets_all,
            'table' => $table,
            "rangeDetails" => json_encode($rangeDetails),
            'currencyMultiplier' => $currencyMultiplier,
            'currencyAbbrev' => $currencyAbbrev,
            'userMultiplier' => app('auth')->user()->multiplier,
            'userChips' => json_encode($config->avarta->chips),
            'mainMultiplier' => $mainMultiplier,
            'integrationType' => $vendor->integration_type,
            'lobby_redirect_url' => Auth::user()->mo_redirect_url,
            'lobby_type' => $vendor->lobby_type,
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

        return DB::select('CALL nihtan_api.USP_GET_BANKER_CHECK(?, ?, ?)', array(app('auth')->user()->id, 'poker', $token));
    }

    public function getCurrencyData()
    {
        return DB::table('vendors')
            ->select('multiplier', 'currency', 'main_multiplier')
            ->where('id', '=', app('auth')->user()->vendor_id)
            ->get();
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

      return DB::connection('poker')->table("poker.game_tables")
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
        $type = $request->input('bet_type') ?? 'r';

        return DB::connection('poker')->table("poker.bets")
            ->join('poker.rounds', 'bets.round_id', '=', 'rounds.id')
            ->join('poker.game_marks', 'rounds.id', '=', 'game_marks.round_id')
            ->select('bets.round_id', 'bets.user_id', 'bets.bet_history', 'bets.total_bet', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'game_marks.mark', 'bets.total_rolling', 'bets.total_win', 'rounds.table_id', 'bets.total_lost', 'rounds.round_num', 'rounds.status')
            ->where('bets.user_id', '=', $userId)
            ->where('bets.type', '=', $type)
            ->where('rounds.table_id', '=', $table)
            ->whereIn('rounds.status', ['E', 'W'])
            ->orderBy('bets.round_id', 'DESC')
            ->paginate(10)->setPath('/betlogs')->toJson();
    }

    public function getDetails(Request $request) {
      $userId = app('auth')->user()->id;
      $table = $request->input('tableId');
      $roundNum = $request->input('round');
      $type = $request->input('type') ?? 'r';//is bonus plus channel 'b'

      $betHistory = DB::connection('poker')->table("poker.bets")
          ->leftJoin('poker.rounds', [
            // ['bets.table_id', '=', 'rounds.table_id'],
            ['bets.round_id', '=', 'rounds.id']
          ])
          ->where([
            ['bets.round_id', '=', $roundNum],
            ['bets.type', '=', $type],//filter by channel
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

      $currentRound = DB::connection('poker')->table("poker.rounds")
          ->where('table_id', $table)
          ->max('round_num');

      return DB::connection('poker')->table("poker.game_tables")
          ->join('poker.rounds', 'game_tables.id', '=', 'rounds.table_id')
          ->join('nihtan_api.dealers', 'rounds.dealer_id', '=', 'nihtan_api.dealers.id')
          ->join('poker.game_marks', function($join)
          {
              $join->on('rounds.id', '=', 'game_marks.round_id');
              $join->on('rounds.table_id', '=', 'game_marks.table_id');
          })
          ->select('rounds.round_num', 'rounds.created_at', 'nihtan_api.dealers.name', 'rounds.game_info', 'game_marks.mark', 'rounds.status')
          ->where('game_tables.id', '=', $table)
          ->where('rounds.round_num', '<', $currentRound)
          ->orderBy('rounds.round_num', 'desc')
          ->paginate(10)->setPath('/gamehistory')->toJson();
    }

    /**
     * @param $table
     * @param Request $request
     * @return 
     */
    public function setFoldCheck($table, Request $request)
    {
      $type = $request->input('type');

      // Get current round ID
      $currentRound = DB::connection('poker')->table("poker.rounds")
        ->where('table_id', $table)
        ->max('id');

      // Get current bet
      $currentBet = DB::connection('poker')->table("poker.bets")
        ->where('user_id', Auth::user()->id)
        ->where('round_id', $currentRound)
        ->get();

      if(count($currentBet)) {
        $betHistory = json_decode($currentBet[0]->bet_history, true);
        $betHistory[$type]['cancel'] = 1;

        DB::connection('poker')->table("poker.bets")
          ->where('user_id', Auth::user()->id)
          ->where('round_id', $currentRound)
          ->update(['bet_history' => json_encode($betHistory)]);

        return $betHistory;
      }
    }

    /**
     * @param $table
     * @param $range
     * @param Request $request
     * @return string
     */
    public function store($table, $range, Request $request)
    {
        $uMoney = $this->getUserCredits();

        $data = $request->input('data');
        $logs = $request->input('logs');
        $type = $request->input('type');
        $bonus = $type === 'b' ? 'pocket' : 'bonus';

        app('log')->info('BET TYPE/SLAVE: -> '. $type . 'BONUS: ->' . $bonus);

        $insert = [
            'ante' => [ 'bet' => 0, 'win' => 0, 'user_money' => 0 ],
            'bonusplus' => [ 'bet' => 0, 'win' => 0, 'user_money' => 0 ],
            $bonus => [ 'bet' => 0, 'win' => 0, 'user_money' => 0 ],
            'flop' => [ 'bet' => 0, 'win' => 0, 'user_money' => 0, 'cancel' => 0 ],
            'turn' => [ 'bet' => 0, 'win' => 0, 'user_money' => 0, 'cancel' => 0 ],
            'river' => [ 'bet' => 0, 'win' => 0, 'user_money' => 0, 'cancel' => 0 ],
        ];

        if($type !== 'b'){
            unset($insert['bonusplus']);
        }

        $round = $this->getLatestRound($table);
        $is_mobile = $request->input('is_mobile') ? 'm' : 'w';

        if($request->input('is_multibet')) {
            $is_mobile = 's';
        }

        $vendor = app('db')->table('vendors')->where('id', $request->user()->vendor_id)->first();

        $temp = $current = DB::connection('poker')->table('bets')
            ->select(
                '*',
                app('db')->raw('bets.type as bet_type')
                )
            ->where('user_id', Auth::user()->id)
            ->where('round_id', $round->id)->first();

        $prevBetType = null;  

        if($current && $current->bet_type != $type) {
          $prevBetType = $current->bet_type;
          $fail_ret = [
              'data' => [],
              'fail' => 1,
              'money' => $this->getUserCredits()                       
          ];
          return response()->json($fail_ret);
        }

        $prevTotalBets = $current ? json_decode($current->total_bet, true) : [];

        $current = $current ? json_decode($current->bet_history, true) : [];

        foreach ($current as $key => $value) {
            $insert[$key]['bet'] = $value['bet'];
        }


        $betAmount = 0;

        for($x = 0; $x < count($data); $x++) {
            $key = $data[$x]['table_id'] == 'bonus' ? $bonus : $data[$x]['table_id'];//replace bonus with pocket when BP
            $insert[$key]['bet'] = abs($data[$x]['amount']);

            if($key == 'ante' || $key == 'bonus' || $key == 'bonusplus') {
                $insert[$key]['user_money'] = $current && $current[$key]['bet'] ? ($current[$key]['user_money']) : ($uMoney);
            }
            else {
                $insert[$key]['user_money'] = $current && $current[$key]['bet'] ? ($current[$key]['user_money'] - $betAmount) : ($uMoney - $betAmount);

                if(isset($current[$key]['cancel']) && $current[$key]['cancel'] == 1) {
                  $insert[$key]['cancel'] = 1;
                }
            }

            $betAmount += (!array_key_exists($key, $current) || !$current[$key]['bet']) && $data[$x]['amount']
                ? abs($data[$x]['amount']) : ($data[$x]['amount'] - $current[$key]['bet']);
        }

        $bets = json_encode($insert);
        $totalBets = $current ? $betAmount + $temp->total_bet : $betAmount;
        app('log')->info('TOTAL BET AMOUNT  > ' . $totalBets);
        app('log')->info('TOTAL AMOUNT TO BE DEDUCTED > ' . $betAmount);

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

        $now = Carbon::now()->toDateTimeString();

        $check = $this->checking('bet', $request->user()->id, [
            'amount' => $betAmount,
            'round' => $round,
            'prevBets' => $current,
            'prevBetType' => $prevBetType,
            'slave' => $type
        ]);

        $sessionId = app('session')->getId();
        $transactionId = md5($request->user()->id . $request->user()->user_name . $round->id);
        if($check === true) {
            try {
                $this->actionLogs($table, $request, []);

                $insertQry = "INSERT INTO bets (`bet_history`, `created_at`, `round_id`, `type`, `user_id`,"
                    . " `total_bet`, `total_rolling`, `total_win`, `total_lost`, `bet_range`, `device`, `bet_id`, `session_id`) VALUES (?, now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE "
                    . "bet_history = ?, total_bet = ?"; //, updated_at = ?";
                    
                DB::connection('poker')->statement(DB::raw($insertQry), [
                    $bets,
                    $round->id,
                    $type,
                    Auth::user()->id,
                    $totalBets,
                    $totalBets,
                    0,
                    0,
                    $newRange,
                    $is_mobile,
                    $transactionId,
                    $sessionId,
                    $bets,
                    $totalBets
                ]);
                
                // decrement nihtan db or send request to operator api
                $transaction = $this->transact('bet', $vendor, $request->user()->id, [
                    'type' => 'bet',
                    'game' => 'Poker',
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

                // check if transaction was successful and if the round is still in betting phase
                if(!$transaction) {

                   return $this->failHandle('', $current, $request, [
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
                        'now' => $now,
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
                app('log')->info('ERRRRRRRRR:: -> '. $e);
                return $this->failHandle('err', $current, $request, [
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
                    'now' => $now,
                    'bet_id' => $transactionId,
                    'session_id' => $sessionId
                ]);
            }
        } else {
            return response()->json($check);
        }
    }

    public function failHandle($type, $current, Request $request, $data)
    {
        if($type == 'err') {
            $this->actionLogs($data['table'], $request, ['comment' => 'catch err']);
        } else {
            $this->actionLogs($data['table'], $request, ['comment' => 'fail']);
        }
   
        $this->remove($data['round'], $data['newRange'], $request, $data['betAmount']);

        $insertQry = "INSERT INTO bets (`bet_history`, `created_at`, `round_id`, `type`, `user_id`,"
            . " `total_bet`, `total_rolling`, `total_win`, `total_lost`, `bet_range`, `device`, `bet_id`, `session_id`) VALUES (?, now(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE "
            . "bet_history = ?, total_bet = ?"; //, updated_at = ?";
        
        if(!empty($current)) {
          DB::connection('poker')->statement(DB::raw($insertQry), [
              json_encode($current),
              $data['round']->id,
              $data['type'],
              Auth::user()->id,
              $data['prevTotalBets'],
              $data['prevTotalBets'],
              0,
              0,
              $data['newRange'],
              $data['is_mobile'],
              $data['bet_id'],
              $data['session_id'],

              $data['bets'],
              $data['totalBets'],
          ]);
        }

        $fail_ret = [
            'data' => count($current) > 0 ? $current : [],
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

    public function remove($round, $range, Request $request, $betAmount) 
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
        
        $this->checking('cancel', Auth::user()->id, [
            'amount' => $betAmount
        ]);

        // $bet = app('db')->connection('poker')->table('bets')
        //     ->where('user_id', Auth::user()->id)
        //     ->where('round_id', $round->id)
        //     ->where('bet_range', $newRange)->first();

        // if(!$bet) return;

        app('db')->connection('poker')->table('bets')
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
     * @param Request $request
     * @return int
     */
    public function cancel($table, $range, Request $request)
    {
        $round = $this->getLatestRound($table);
        $vendor = app('db')->table('vendors')->where('id', $request->user()->vendor_id)->first();
        $response = 0;
        $logs = $request->input('logs');

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
            $bet = app('db')->connection('poker')->table('bets')
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
            
            $type = $bet->type == 'b' ? 'bonusplus' : 'normal';

            if($request->input('slave') != $type) {
              $response = 1;
              return $response;
            }
          
            $this->actionLogs($table, $request, []);
            // increment nihtan db or send request to operator api
            $transaction = $this->transact('cancel', $vendor, $request->user()->id, [
                'type' => 'cancel',
                'game' => 'Poker',
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
                app('db')->connection('poker')->table('bets')
                    ->where('id', $bet->id)->delete();
                $response = 1;
                //$this->storeBetLogs($table, $request['logs'], $request);
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
        $logs = $request->input('logs');

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
            $bet = app('db')->connection('poker')->table('bets')
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
            
            $type = $bet->type == 'b' ? 'bonusplus' : 'normal';

            if($request->input('slave') != $type) {
              $response = 1;
              return $response;
            }
            
            $this->actionLogs($table, $request, []);
            // increment nihtan db or send request to operator api
            $transaction = $this->transact('cancel', $vendor, $request->user()->id, [
                'type' => 'cancel',
                'game' => 'Poker',
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
                app('db')->connection('poker')->table('bets')
                    ->where('id', $bet->id)->delete();
                $response = 1;
                //$this->storeBetLogs($table, $request['logs'], $request);
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
    // public function storeBetLogs($table, $logs, Request $request)
    // {
    //     $round = $this->getLatestRoundNum($table);
    //     $type = 'r';

    //     $qry = " INSERT INTO bet_logs (`user_id`, `table_id`, `round_num`, `type`, `actions`, `ip`)"
    //         . "VALUES (?, ?, ?, ?, ?, ?)"
    //         . "ON DUPLICATE KEY UPDATE `actions` = JSON_MERGE(actions, ?)";

    //     DB::connection('poker')->statement(DB::raw($qry), [
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

        DB::connection('poker')->statement(DB::raw($qry), [
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
    public function getLatestRound($table)
    {
        return app('db')->connection('poker')
            ->table('rounds')
            ->where('table_id', $table)
            ->orderBy('id', 'desc')->select('id', 'round_num', 'status')->first();
    }

    public function getLatestRoundNum($table)
    {
        return app('db')->connection('poker')
            ->table('rounds')
            ->where('table_id', $table)
            ->orderBy('id', 'desc')->select('round_num')->first()->round_num;
    }

    public function getAllWin ($table) {
        $round = $this->getLatestRound($table);

        $win = DB::connection('poker')
            ->table('bets')->where('round_id', $round->id)
            ->where('user_id',Auth::user()->id)->pluck('total_win');

        $type = DB::connection('poker')->table('bets')->where('round_id', $round->id)
            ->where('user_id',Auth::user()->id)->pluck('type');

        $slaves = ["b" => "bonusplus", "r" => "normal"];

        $usermoney = $this->getUserCredits();
        
        $bet = DB::connection('poker')
            ->table('bets')->where('round_id', $round->id)
            ->where('user_id',Auth::user()->id)->pluck('total_bet');

        if(!count($win) && !count($bet)) {
            return 0;
        }

        return ["total_win" => $win[0], "bet" => $bet[0], "slave" => $slaves[$type[0]], "user_money" => $usermoney];
    }

    public function getDealerImg(Request $request)
    {
      $dealerId = $request->input('dealerId');

      $query = app('db')->connection('nihtan_api')->table('dealers')
              ->select(DB::raw('CONCAT("data:image/png;base64,", TO_BASE64(dealer_images)) AS dealer_image, id'))
              ->where('id', $dealerId)
              ->get();

      return $query;
    }
}
