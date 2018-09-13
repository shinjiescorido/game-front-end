<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use DB;
use Auth;
use Carbon\Carbon;

use App;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;

class BetHistoryController extends Controller
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

    public function index() {
        $config = $this->getUserConfig();
        $is_sicbo_room = $config->avarta->is_room;
        $settings = [];

        $settings = $config->avarta->is_room;

        if(!isset($config->avarta->language->data[$config->avarta->language->select])) {
          $config->avarta->language->select = 0;
        }

        $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

        App::setLocale($locale);

        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();
        $maintenance = app('db')->connection('nihtan_api')->table('maintenance')->first();

        // === Currency
        // $currencyArr = $this->getCurrencyData();
        $currencyMultiplier = $vendor->multiplier;
        $currencyAbbrev = $vendor->currency;
        $mainMultiplier = $vendor->main_multiplier;

        if(Auth::user()->denomination) {
          $currencyMultiplier = Auth::user()->denomination;
        }

        if(Auth::user()->currency) {
          $currencyAbbrev = Auth::user()->currency;
        }

        //agent range
        $usergroup = Auth::user()->user_group_id;
        $agentRange = [];
        if(!is_null($usergroup)) {
          $group_data = DB::connection('nihtan_api')->table('user_groups')
              ->where('vendor_id', Auth::user()->vendor_id)
              ->where('id', $usergroup)
              ->get();

          $agentRange = !$group_data->isEmpty() ? json_decode($group_data[0]->ranges) : [];
          $agentRange = empty($agentRange) ? [] : $agentRange;
        }

        return view('index')->with([
          'config' => $config,
          "baccaratBetSetting" => $this->getBaccaratBetSetting(),
          'vendor' => $this->getVendor(),
          'money' => $this->getUserCredits(),
          'currencyMultiplier' => $currencyMultiplier,
          'currencyAbbrev' => $currencyAbbrev,
          'userMultiplier' => app('auth')->user()->multiplier,
          'maintenance' => json_encode($maintenance),
          'mainMultiplier' => $mainMultiplier,
          'integrationType' => $vendor->integration_type,
          'gameSetting' => json_encode($settings),
          'agentRange' => json_encode($agentRange)
        ]);
    }

    public function index3() {
      $config = $this->getUserConfig();
      $is_sicbo_room = $config->avarta->is_room;
      $settings = [];

      $settings = $config->avarta->is_room;

      if(!isset($config->avarta->language->data[$config->avarta->language->select])) {
        $config->avarta->language->select = 0;
      }

      $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

      App::setLocale($locale);

      $currency = app('db')->connection('nihtan_api')->table('vendors')
        ->where('id', app('auth')->user()->vendor_id)->first()->currency;

      $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();
      $maintenance = app('db')->connection('nihtan_api')->table('maintenance')->first();

      // === Currency
      $currencyArr = $this->getCurrencyData();
      $currencyMultiplier = $currencyArr[0]->multiplier;
      $currencyAbbrev = $currencyArr[0]->currency;
      $mainMultiplier = $currencyArr[0]->main_multiplier;

      if(Auth::user()->denomination) {
        $currencyMultiplier = Auth::user()->denomination;
      }

      if(Auth::user()->currency) {
        $currency = Auth::user()->currency;
        $currencyAbbrev = Auth::user()->currency;
      }

      //agent range
      $usergroup = Auth::user()->user_group_id;
      $agentRange = [];
      if(!is_null($usergroup)) {
        $group_data = DB::connection('nihtan_api')->table('user_groups')
            ->where('vendor_id', Auth::user()->vendor_id)
            ->where('id', $usergroup)
            ->get();

        $agentRange = !$group_data->isEmpty() ? json_decode($group_data[0]->ranges) : [];
        $agentRange = empty($agentRange) ? [] : $agentRange;
      }

      $vendor = $this->getVendor();
      if(gettype($vendor->junket_auth) === 'string') {
        $vendor->junket_auth = json_decode($vendor->junket_auth);
      }

      $pc_redirect_url = Auth::user()->pc_redirect_url;

      return view('index3-0')->with([
        'config' => $config,
        "baccaratBetSetting" => $this->getBaccaratBetSetting(),
        'currency' => $currency,
        'vendor' => $vendor,
        'money' => $this->getUserCredits(),
        'currencyMultiplier' => $currencyMultiplier,
        'currencyAbbrev' => $currencyAbbrev,
        'userMultiplier' => app('auth')->user()->multiplier,
        'maintenance' => json_encode($maintenance),
        'mainMultiplier' => $mainMultiplier,
        'integrationType' => $vendor->integration_type,
        'gameSetting' => json_encode($settings),
        'junket' => is_null(Auth::user()->is_junket) ? 0 : Auth::user()->is_junket,
        'agentRange' => json_encode($agentRange),
        'vendorData' => json_encode($vendor),
        'pc_redirect_url' => $pc_redirect_url
      ]);
    }

    public function indexMobile() {
        $config = $this->getUserConfig();
        $is_sicbo_room = $config->avarta->is_room;
        $settings = [];

        $settings = $config->avarta->is_room;

        if(!isset($config->avarta->language->data[$config->avarta->language->select])) {
          $config->avarta->language->select = 0;
        }

        $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

        App::setLocale($locale);

        $maintenance = app('db')->connection('nihtan_api')->table('maintenance')->first();
        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();

        // === Currency
        // $currencyArr = $this->getCurrencyData();
        $currencyMultiplier = $vendor->multiplier;
        $currencyAbbrev = $vendor->currency;
        $mainMultiplier = $vendor->main_multiplier;

        if(Auth::user()->denomination) {
          $currencyMultiplier = Auth::user()->denomination;
        }

        if(Auth::user()->currency) {
          $currencyAbbrev = Auth::user()->currency;
        }

        //agent range
        $usergroup = Auth::user()->user_group_id;
        $agentRange = [];
        if(!is_null($usergroup)) {
          $group_data = DB::connection('nihtan_api')->table('user_groups')
              ->where('vendor_id', Auth::user()->vendor_id)
              ->where('id', $usergroup)
              ->get();

          $agentRange = !$group_data->isEmpty() ? json_decode($group_data[0]->ranges) : [];
          $agentRange = empty($agentRange) ? [] : $agentRange;
        }

        return view('index-mobile')->with([
          'config' => $config,
          "baccaratBetSetting" => $this->getBaccaratBetSetting(),
          'vendor' => $this->getVendor(),
          'money' => $this->getUserCredits(),
          'currencyMultiplier' => $currencyMultiplier,
          'currencyAbbrev' => $currencyAbbrev,
          'userMultiplier' => app('auth')->user()->multiplier,
          'maintenance' => json_encode($maintenance),
          'mainMultiplier' => $mainMultiplier,
          'gameSetting' => json_encode($settings),
          'integrationType' => $vendor->integration_type,
          'agentRange' => json_encode($agentRange),
          'vendorData' => json_encode($vendor)
        ]);
    }

    public function indexMobile3() {
        $config = $this->getUserConfig();
        $is_sicbo_room = $config->avarta->is_room;
        $settings = [];

        $settings = $config->avarta->is_room;

        if(!isset($config->avarta->language->data[$config->avarta->language->select])) {
          $config->avarta->language->select = 0;
        }

        $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

        App::setLocale($locale);

        $maintenance = app('db')->connection('nihtan_api')->table('maintenance')->first();
        $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();

        // === Currency
        // $currencyArr = $this->getCurrencyData();
        $currencyMultiplier = $vendor->multiplier;
        $currencyAbbrev = $vendor->currency;
        $mainMultiplier = $vendor->main_multiplier;

        if(Auth::user()->denomination) {
          $currencyMultiplier = Auth::user()->denomination;
        }

        if(Auth::user()->currency) {
          $currencyAbbrev = Auth::user()->currency;
        }

        //agent range
        $usergroup = Auth::user()->user_group_id;
        $agentRange = [];
        if(!is_null($usergroup)) {
          $group_data = DB::connection('nihtan_api')->table('user_groups')
              ->where('vendor_id', Auth::user()->vendor_id)
              ->where('id', $usergroup)
              ->get();

          $agentRange = !$group_data->isEmpty() ? json_decode($group_data[0]->ranges) : [];
          $agentRange = empty($agentRange) ? [] : $agentRange;
        }

        return view('index-mobile-3')->with([
          'config' => $config,
          "baccaratBetSetting" => $this->getBaccaratBetSetting(),
          'vendor' => $this->getVendor(),
          'money' => $this->getUserCredits(),
          'currencyMultiplier' => $currencyMultiplier,
          'currencyAbbrev' => $currencyAbbrev,
          'userMultiplier' => app('auth')->user()->multiplier,
          'maintenance' => json_encode($maintenance),
          'mainMultiplier' => $mainMultiplier,
          'gameSetting' => json_encode($settings),
          'integrationType' => $vendor->integration_type,
          'junket' => is_null(Auth::user()->is_junket) ? 0 : Auth::user()->is_junket,
          'agentRange' => json_encode($agentRange)
        ]);
    }

    public function indexMobileNoinstall() {
      $config = $this->getUserConfig();
      $is_sicbo_room = $config->avarta->is_room;
      $settings = [];

      $settings = $config->avarta->is_room;
      $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

      App::setLocale($locale);

      $maintenance = app('db')->connection('nihtan_api')->table('maintenance')->first();
      $vendor = app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)->first();

      // === Currency
      // $currencyArr = $this->getCurrencyData();
      $currencyMultiplier = $vendor->multiplier;
      $currencyAbbrev = $vendor->currency;
      $mainMultiplier = $vendor->main_multiplier;

      if(Auth::user()->denomination) {
        $currencyMultiplier = Auth::user()->denomination;
      }

      if(Auth::user()->currency) {
        $currencyAbbrev = Auth::user()->currency;
      }

      //agent range
      $usergroup = Auth::user()->user_group_id;
      $agentRange = [];
      if(!is_null($usergroup)) {
        $group_data = DB::connection('nihtan_api')->table('user_groups')
            ->where('vendor_id', Auth::user()->vendor_id)
            ->where('id', $usergroup)
            ->get();

        $agentRange = !$group_data->isEmpty() ? json_decode($group_data[0]->ranges) : [];
        $agentRange = empty($agentRange) ? [] : $agentRange;
      }

      return view('index-mobile-non')->with([
        'config' => $config,
        "baccaratBetSetting" => $this->getBaccaratBetSetting(),
        'vendor' => $this->getVendor(),
        'money' => $this->getUserCredits(),
        'currencyMultiplier' => $currencyMultiplier,
        'currencyAbbrev' => $currencyAbbrev,
        'userMultiplier' => app('auth')->user()->multiplier,
        'maintenance' => json_encode($maintenance),
        'mainMultiplier' => $mainMultiplier,
        'gameSetting' => json_encode($settings),
        'integrationType' => $vendor->integration_type,
        'nonInstall' => true,
        'agentRange' => json_encode($agentRange),
        'vendorData' => json_encode($vendor)
      ]);
    }

    public function checkReject() {
        $config = $this->getUserConfig();

        $locale = $this->map[$config->avarta->language->data[$config->avarta->language->select]];

        App::setLocale($locale);

        return view('rejected');
    }

    public function getCurrencyData() {
        return app('db')->connection('nihtan_api')->table('vendors')
            ->select('multiplier', 'currency', 'main_multiplier')
            ->where('id', '=', app('auth')->user()->vendor_id)
            ->get();
    }

    public function getDealerImg(Request $request) {
      $dealerId = $request->input('dealerId');

      $query = app('db')->connection('nihtan_api')->table('dealers')
              ->select(DB::raw('CONCAT("data:image/png;base64,", TO_BASE64(dealer_images)) AS dealer_image, id'))
              ->whereIn('id', $dealerId)
              ->get();

      return $query;
    }

    public function getChangeDealerImg(Request $request) {
      $dealerId = $request->input('dealerId');

      $query = app('db')->connection('nihtan_api')->table('dealers')
              ->select(DB::raw('CONCAT("data:image/png;base64,", TO_BASE64(dealer_images)) AS dealer_image, id'))
              ->where('id', $dealerId)
              ->get();

      return $query;
    }

    public function getBaccaratBetSetting() {
      return DB::connection('baccarat')->table("baccarat.game_tables")
          ->select('bet_setting', 'id')
          ->orderBy('id', 'asc')
          ->get()->toJson();
    }

    /**
     * Return user configs
     *
     * @return array
     */
    public function getUserConfig() {
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
     * Return vendor
     *
     * @return array
     */
    public function getVendor() {
        return app('db')->connection('nihtan_api')->table('vendors')
        ->where('id', app('auth')->user()->vendor_id)
        ->first();
    }

    /**
     * updates user configs
     *
     * @param Request $request
     */
    public function setUserConfig(Request $request) {
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



    //=== TRANSFER LOGS STARTS HERE
    public function getTransferLogs(Request $request) {
      $userId = app('auth')->user()->id;
      $url = env("LOBBY_DOMAIN", "https://lobby.cxz777.com/");

      return DB::table("api_transfer_log")
          ->where('user_id', '=', $userId)
          ->orderBy('id', 'desc')
          ->paginate(10)->setPath($url.'transferlogs')->toJson();
    }
    //=== TRANSFER LOGS ENDS HERE

    //=== ALL LOGS STARTS HERE
    public function getAllLogs(Request $request) {
      $pageDisplay = $request->input('betPage');

      $page = Input::get('page', 1);

      $paginate = 10;
      $pageDisplay = empty($pageDisplay) ? 0 : $pageDisplay;
      $data = DB::select('CALL USP_GET_NEW_ALL_BET_HISTORY(?, ?)', array(app('auth')->user()->id, $pageDisplay));

      if(Auth::user()->is_junket == 2) {
        $userId = is_null($request->input('user_id')) ? '' : $request->input('user_id');
        $vendor_id = $request->input('vendor_id');
        $table = 0;
        $roundNum = (int)$request->input('roundNum');
        $startDate = '2018-01-23';
        $endDate = '2018-08-10';
        $page = empty($page) ? 0 : (int)$page;
        $gameType = $request->input('gameType');
        $game = '';
        return DB::select('CALL nihtan_api.USP_GET_JUNKET_ALL_BET_HISTORY(?, ?, ?, ?, ?, ?, ?, ?, ?)', array($gameType, $game, $userId, $vendor_id, $table, $roundNum, $startDate, $endDate, $page));
      }

      return $data;


      // $offSet = ($page * $paginate) - $paginate;
      // $itemsForCurrentPage = array_slice($data, $offSet, $paginate, true);
      // $data = new \Illuminate\Pagination\LengthAwarePaginator($itemsForCurrentPage, count($data), $paginate, $page);

      // return $data->setPath($url.'alllogs')->toJson();
    }

    public function getAllLogsMobile(Request $request) {
      $url = env("LOBBY_DOMAIN", "https://lobby.cxz777.com/");
      $pageDisplay = $request->input('pageNum');

      $page = Input::get('page', 1);
      $paginate = 10;

      $data = DB::select('CALL USP_GET_ALL_BET_HISTORY(?, ?)', array(app('auth')->user()->id, $pageDisplay));
      return $data;
    }

    // v3.0 game logs getting is here
    public function getGameLogs (Request $request) {

      $userId = app('auth')->user()->id;
      $table = $request->input('tableId');
      $page = $request->input('betPage');
      $tableId = $table;
      $gameType = $request->input('gameType');
      $roundNum = $request->input('roundNum');
      $playType = $request->input('playType');
      $page = empty($page) ? 0 : $page;

      // Junket
      $gameName = $request->input('gameName');
      $startDate = $request->input('startDate');
      $endDate = $request->input('endDate');
      $searchId = $request->input('searchId');
      $vendor_id = $request->input('vendor_id');
      $timeZone = $request->input('timeZone');

      if(Auth::user()->is_junket  == 2) {
        // return DB::select('CALL nihtan_api.USP_GET_JUNKET_ALL_BET_HISTORY(?, ?, ?, ?, ?, ?, ?, ?, ?)', array($gameType, $game, $userId, $vendor_id, $table, $roundNum, $startDate, $endDate, $page));

        // return $searchId
        $searchId = $searchId === NULL ? '' : $searchId;
        $startDate = $startDate == NULL? '0000-00-00 00' : $startDate;
        $endDate = $endDate == NULL? '0000-00-00 00' : $endDate;
        $gameName = $gameName == 'allgames' ? '' : $gameName;
        return DB::select('CALL nihtan_api.USP_GET_JUNKET_AGENT_BET_HISTORY(?, ?, ?, ?, ?, ?, ?, ?, ?,?)', array($gameType, $gameName, $searchId, (int)$vendor_id, (int)$tableId, (int)$roundNum, $startDate, $endDate, (int)$timeZone, (int)$page));

      } else if(Auth::user()->is_junket  == 1) {
        if ($gameName == 'allgames') {
          $gameType = 'L';
        }

        return DB::select('CALL nihtan_api.USP_GET_JUNKET_USER_BET_HISTORY(?, ?, ?, ?, ?, ?, ?)', array($gameType, $gameName, (int)$userId, (int)$vendor_id, (int)$tableId, (int)$roundNum, (int)$page));
      }

      // dd($gameType, 'baccarat', $playType, app('auth')->user()->id, $tableId, $roundNum, $page);

      if($gameName === 'allgames') {
        $data = DB::select('CALL USP_GET_NEW_ALL_BET_HISTORY(?, ?)', array(app('auth')->user()->id, $page));
        return $data;
      }

      $gameName = $gameName == 'allgames'? '':$gameName;

      return DB::select('CALL nihtan_api.USP_GET_GAME_BET_HISTORY(?, ?, ?, ?, ?, ?, ?)', array($gameType, $gameName, $playType, app('auth')->user()->id, $tableId, $roundNum, $page));
    }
    //=== ALL LOGS ENDS HERE

    //=== BACCARAT STARTS HERE
    public function getBaccaratBetLogs(Request $request) {

      // $userId = app('auth')->user()->id;
      // $table = $request->input('tableId');
      // $page = $request->input('betPage');
      // $tableId = $table;
      // $gameType = $request->input('gameType');
      // $roundNum = $request->input('roundNum');
      // $playType = $request->input('playType');
      // $page = empty($page) ? 0 : $page;
      // // dd($gameType, 'baccarat', $playType, app('auth')->user()->id, $tableId, $roundNum, $page);
      // return DB::select('CALL nihtan_api.USP_GET_GAME_BET_HISTORY(?, ?, ?, ?, ?, ?, ?)', array($gameType, 'baccarat', $playType, app('auth')->user()->id, $tableId, $roundNum, $page));
      $userId = app('auth')->user()->id;
      $url = env("LOBBY_DOMAIN", "https://lobby.cxz777.com/");

      return DB::connection('baccarat')->table("baccarat.bets")
      ->join('rounds', 'bets.round_id', '=', 'rounds.id')
      ->join('nihtan_api.dealers', 'dealers.id', '=', 'rounds.dealer_id')
      ->select('bets.id', 'bets.round_id', 'bets.user_id', 'bets.bet_history','bets.type', 'bets.total_bet', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'rounds.table_id', 'dealers.name', 'rounds.game_result', 'total_win', 'total_rolling', 'total_lost', 'rounds.round_num', 'bets.bet_range', 'rounds.status')
      ->where('bets.user_id', '=', $userId)
      ->whereIn('bets.type', ['r', 'f'])
      ->whereIn('rounds.status', ['E', 'W'])
      ->orderBy('bets.round_id', 'DESC')
      ->paginate(10)->setPath($url.'baccaratlogs')->toJson();

    }

    public function getBaccaratDetails(Request $request) {
      $roundNum = $request->input('round');
      $game_name = $request->input('game_name');
      $betId = $request->input('betId');
      $table = $request->input('table');
      $userId = app('auth')->user()->id;

      $betHistory = DB::connection('baccarat')->table("baccarat.bets")
          ->leftJoin('baccarat.rounds', [
            ['bets.round_id', '=', 'rounds.id']
          ])
          ->where([
            ['bets.id', '=', $betId],
            ['bets.user_id', '=', $userId],
            ['rounds.round_num', '=', (int)$roundNum],
            ['rounds.table_id', '=', (int)$table]
          ])
          ->select('bets.bet_history', 'rounds.game_info', 'rounds.game_result')
          ->limit(1)->get();

      return $betHistory;
    }

    public function getSupersixBetLogs() {
      $userId = app('auth')->user()->id;
      $url = env("LOBBY_DOMAIN", "https://lobby.cxz777.com/");

      return DB::connection('baccarat')->table("baccarat.bets")
          ->join('rounds', 'bets.round_id', '=', 'rounds.id')
          ->join('nihtan_api.dealers', 'dealers.id', '=', 'rounds.dealer_id')
          ->select('bets.id', 'bets.round_id', 'bets.user_id', 'bets.bet_history', 'bets.total_bet','bets.type', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'rounds.table_id', 'dealers.name', 'rounds.game_result', 'total_win', 'total_rolling', 'total_lost', 'rounds.round_num', 'bets.bet_range', 'rounds.status')
          ->where('bets.user_id', '=', $userId)
          ->where('bets.type', '=', 's')
          ->whereIn('rounds.status', ['E', 'W'])
          ->orderBy('bets.round_id', 'DESC')
          ->paginate(10)->setPath($url.'supersixlogs')->toJson();
    }

    public function getSupersixDetails(Request $request) {
      $roundNum = $request->input('round');
      $game_name = $request->input('game_name');
      $betId = $request->input('betId');
      $table = $request->input('table');
      $userId = app('auth')->user()->id;

      $betHistory = DB::connection('baccarat')->table("baccarat.bets")
          ->leftJoin('baccarat.rounds', [
            ['bets.round_id', '=', 'rounds.id']
          ])
          ->where([
            ['bets.id', '=', $betId],
            ['bets.user_id', '=', $userId],
            ['bets.type', '=', 's'],
            ['rounds.round_num', '=', (int)$roundNum],
            ['rounds.table_id', '=', (int)$table]
          ])
          ->select('bets.bet_history', 'rounds.game_info', 'rounds.game_result')
          ->limit(1)->get();

      return $betHistory;
    }

    public function getDragonBonusBetLogs() {
      $userId = app('auth')->user()->id;
      $url = env("LOBBY_DOMAIN", "https://lobby.cxz777.com/");

      return DB::connection('baccarat')->table("baccarat.bets")
          ->join('rounds', 'bets.round_id', '=', 'rounds.id')
          ->join('nihtan_api.dealers', 'dealers.id', '=', 'rounds.dealer_id')
          ->select('bets.id', 'bets.round_id', 'bets.user_id', 'bets.bet_history', 'bets.total_bet','bets.type', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'rounds.table_id', 'dealers.name', 'rounds.game_result', 'total_win', 'total_rolling', 'total_lost', 'rounds.round_num', 'bets.bet_range', 'rounds.status')
          ->where('bets.user_id', '=', $userId)
          ->where('bets.type', '=', 'b')
          ->whereIn('rounds.status', ['E', 'W'])
          ->orderBy('bets.round_id', 'DESC')
          ->paginate(10)->setPath($url.'dragonbonuslogs')->toJson();
    }

    public function getDragonBonusDetails(Request $request) {
      $roundNum = $request->input('round');
      $game_name = $request->input('game_name');
      $betId = $request->input('betId');
      $table = $request->input('table');
      $userId = app('auth')->user()->id;

      $betHistory = DB::connection('baccarat')->table("baccarat.bets")
          ->leftJoin('baccarat.rounds', [
            ['bets.round_id', '=', 'rounds.id']
          ])
          ->where([
            ['bets.id', '=', $betId],
            ['bets.user_id', '=', $userId],
            ['bets.type', '=', 'b'],
            ['rounds.round_num', '=', (int)$roundNum],
            ['rounds.table_id', '=', (int)$table]
          ])
          ->select('bets.bet_history', 'rounds.game_info', 'rounds.game_result')
          ->limit(1)->get();

      return $betHistory;
    }
    //=== BACCARAT ENDS HERE

    //=== POKER STARTS HERE
    public function getPokerBetLogs(Request $request) {
      // $userId = app('auth')->user()->id;
      // $table = $request->input('tableId');
      // $page = $request->input('betPage');
      // $tableId = $table;
      // $gameType = $request->input('gameType');
      // $roundNum = $request->input('roundNum');
      // $playType = $request->input('playType');
      // $page = empty($page) ? 0 : $page;

      // return DB::select('CALL nihtan_api.USP_GET_GAME_BET_HISTORY(?, ?, ?, ?, ?, ?, ?)', array($gameType, 'poker', $playType, app('auth')->user()->id, $tableId, $roundNum, $page));

      $userId = app('auth')->user()->id;
      $url = env("LOBBY_DOMAIN", "https://lobby.cxz777.com/");

      return DB::connection('poker')->table("poker.bets")
      ->join('rounds', 'bets.round_id', '=', 'rounds.id')
      ->join('nihtan_api.dealers', 'dealers.id', '=', 'rounds.dealer_id')
      ->select('bets.id', 'bets.round_id', 'bets.user_id', 'bets.bet_history', 'bets.total_bet', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'rounds.table_id', 'dealers.name', 'rounds.game_result', 'total_win', 'total_rolling', 'total_lost', 'rounds.round_num', 'bets.bet_range', 'rounds.status')
      ->where('bets.user_id', '=', $userId)
      ->where('bets.type', '=', 'r')
      ->whereIn('rounds.status', ['E', 'W'])
      ->orderBy('bets.round_id', 'DESC')
      ->paginate(10)->setPath($url.'pokerlogs')->toJson();

    }

    public function getBonusPlusBetLogs() {
      $userId = app('auth')->user()->id;
      $url = env("LOBBY_DOMAIN", "https://lobby.cxz777.com/");

      return DB::connection('poker')->table("poker.bets")
          ->join('rounds', 'bets.round_id', '=', 'rounds.id')
          ->join('nihtan_api.dealers', 'dealers.id', '=', 'rounds.dealer_id')
          ->select('bets.id', 'bets.round_id', 'bets.user_id','bets.type', 'bets.bet_history', 'bets.total_bet', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'rounds.table_id', 'dealers.name', 'rounds.game_result', 'total_win', 'total_rolling', 'total_lost', 'rounds.round_num', 'bets.bet_range', 'rounds.status')
          ->where('bets.user_id', '=', $userId)
          ->whereIn('rounds.status', ['E', 'W'])
          ->where('bets.type', '=', 'b')
          ->orderBy('bets.round_id', 'DESC')
          ->paginate(10)->setPath($url.'bonuspluslogs')->toJson();
    }

    public function getPokerDetails(Request $request) {
      $roundNum = $request->input('round');
      $game_name = $request->input('game_name');
      $betId = $request->input('betId');
      $table = $request->input('table');
      $userId = app('auth')->user()->id;

      $betHistory = DB::connection('poker')->table("poker.bets")
          ->leftJoin('poker.rounds', [
            ['bets.round_id', '=', 'rounds.id']
          ])
          ->where([
            ['bets.id', '=', $betId],
            ['bets.user_id', '=', $userId],
            ['rounds.round_num', '=', (int)$roundNum],
            ['rounds.table_id', '=', (int)$table]
          ])
          ->select('bets.bet_history', 'rounds.game_info', 'rounds.game_result')
          ->limit(1)->get();

      return $betHistory;
    }

    public function getBonusPlusDetails(Request $request) {
      $roundNum = $request->input('round');
      $game_name = $request->input('game_name');
      $betId = $request->input('betId');
      $table = $request->input('table');
      $userId = app('auth')->user()->id;

      $betHistory = DB::connection('poker')->table("poker.bets")
          ->leftJoin('poker.rounds', [
            ['bets.round_id', '=', 'rounds.id']
          ])
          ->where([
            ['bets.id', '=', $betId],
            ['bets.user_id', '=', $userId],
            ['rounds.round_num', '=', (int)$roundNum],
            ['rounds.table_id', '=', (int)$table]
          ])
          ->select('bets.bet_history', 'rounds.game_info', 'rounds.game_result')
          ->limit(1)->get();

      return $betHistory;
    }
    //=== POKER ENDS HERE

    //=== SICBO STARTS HERE
    public function getSicboBetLogs(Request $request) {
      // $userId = app('auth')->user()->id;
      // $table = $request->input('tableId');
      // $page = $request->input('betPage');
      // $tableId = 1;
      // $gameType = $request->input('gameType');
      // $roundNum = $request->input('roundNum');
      // $playType = $request->input('playType');
      // $mobile = $request->input('mobile');

      // return DB::select('CALL sicbo.USP_NEW_GET_BET_HISTORY(?, ?, ?, ?, ?)', array($gameType, app('auth')->user()->id, $tableId, $roundNum, $page));

      $userId = app('auth')->user()->id;
      $url = env("LOBBY_DOMAIN", "https://lobby.cxz777.com/");

      return DB::connection('sicbo')->table("sicbo.bets")
          ->join('rounds', 'bets.round_id', '=', 'rounds.id')
          ->join('nihtan_api.dealers', 'dealers.id', '=', 'rounds.dealer_id')
          ->select('bets.id', 'bets.round_id', 'bets.user_id', 'bets.bet_history', 'bets.total_bet', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'rounds.table_id', 'dealers.name', 'rounds.game_result', 'rounds.game_info', 'total_win', 'total_rolling', 'total_lost', 'rounds.round_num', 'bets.bet_range', 'rounds.status')
          ->where('bets.user_id', '=', $userId)
          ->whereIn('rounds.status', ['E', 'W'])
          ->orderBy('bets.round_id', 'DESC')
          ->paginate(10)->setPath($url.'sicbologs')->toJson();
    }

    public function getSicboDetails(Request $request) {
      $roundNum = $request->input('round');
      $game_name = $request->input('game_name');
      $betId = $request->input('betId');
      $table = $request->input('table');
      $userId = app('auth')->user()->id;

      $betHistory = DB::connection('sicbo')->table("sicbo.bets")
          ->leftJoin('sicbo.rounds', [
            ['bets.round_id', '=', 'rounds.id']
          ])
          ->where([
            ['bets.id', '=', $betId],
            ['bets.user_id', '=', $userId],
            ['rounds.round_num', '=', (int)$roundNum],
            ['rounds.table_id', '=', (int)$table]
          ])
          ->select('bets.bet_history', 'rounds.game_info', 'rounds.game_result')
          ->limit(1)->get();

      return $betHistory;
    }
    //=== SICBO ENDS HERE

    //=== DRAGON TIGER STARTS HERE
    public function getDragontigerBetLogs(Request $request) {
      // $userId = app('auth')->user()->id;
      // $table = $request->input('tableId');
      // $page = $request->input('betPage');
      // $tableId = 1;
      // $gameType = $request->input('gameType');
      // $roundNum = $request->input('roundNum');
      // $playType = $request->input('playType');
      // $mobile = $request->input('mobile');

      // return DB::select('CALL dragontiger.USP_NEW_GET_BET_HISTORY(?, ?, ?, ?, ?)', array($gameType, app('auth')->user()->id, $tableId, $roundNum, $page));

      $userId = app('auth')->user()->id;
      $url = env("LOBBY_DOMAIN", "https://lobby.cxz777.com/");

      return DB::connection('dragontiger')->table("dragontiger.bets")
      ->join('rounds', 'bets.round_id', '=', 'rounds.id')
      ->join('nihtan_api.dealers', 'dealers.id', '=', 'rounds.dealer_id')
      ->select('bets.id', 'bets.round_id', 'bets.user_id', 'bets.bet_history', 'bets.total_bet', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'rounds.table_id', 'dealers.name', 'rounds.game_result', 'total_win', 'total_rolling', 'total_lost', 'rounds.round_num', 'bets.bet_range', 'rounds.status')
      ->where('bets.user_id', '=', $userId)
      ->whereIn('rounds.status', ['E', 'W'])
      ->orderBy('bets.round_id', 'DESC')
      ->paginate(10)->setPath($url.'dragontigerlogs')->toJson();

    }

    public function getDragontigerDetails(Request $request) {
      $roundNum = $request->input('round');
      $game_name = $request->input('game_name');
      $betId = $request->input('betId');
      $table = $request->input('table');
      $userId = app('auth')->user()->id;

      $betHistory = DB::connection('dragontiger')->table("dragontiger.bets")
          ->leftJoin('dragontiger.rounds', [
            ['bets.round_id', '=', 'rounds.id']
          ])
          ->where([
            ['bets.id', '=', $betId],
            ['bets.user_id', '=', $userId],
            ['rounds.round_num', '=', (int)$roundNum],
            ['rounds.table_id', '=', (int)$table]
          ])
          ->select('bets.bet_history', 'rounds.game_info', 'rounds.game_result')
          ->limit(1)->get();

      return $betHistory;
    }
    //=== DRAGON TIGER ENDS HERE

    //=== PULA PUTI STARTS HERE
    public function getPulaputiBetLogs() {
      $userId = app('auth')->user()->id;
      $url = env("LOBBY_DOMAIN", "https://lobby.cxz777.com/");

      return DB::connection('pulaputi')->table("pulaputi.bets")
          ->join('rounds', 'bets.round_num', '=', 'rounds.round_num')
          ->join('game_marks', 'rounds.id', '=', 'game_marks.round_id')
          ->join('nihtan_api.dealers', 'dealers.id', '=', 'rounds.dealer_id')
          ->select('bets.id', 'bets.round_num', 'bets.user_id', 'bets.bet_history', 'bets.total_bet', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'game_marks.mark', 'rounds.table_id', 'dealers.name', 'bets.total_win', 'bets.total_rolling', 'bets.total_lost', 'bets.bet_range')
          ->where('bets.user_id', '=', $userId)
          ->orderBy('bets.round_num', 'DESC')
          ->paginate(10)->setPath($url.'pulaputilogs')->toJson();
    }

    public function getPulaputiDetails(Request $request) {
      $roundNum = $request->input('round');
      $game_name = $request->input('game_name');
      $betId = $request->input('betId');
      $table = $request->input('table');
      $userId = app('auth')->user()->id;

      $betHistory = DB::connection('pulaputi')->table("pulaputi.bets")
          ->leftJoin('pulaputi.rounds', [
            ['bets.table_id', '=', 'rounds.table_id'],
            ['bets.round_num', '=', 'rounds.round_num']
          ])
          ->where([
            ['bets.id', '=', $betId],
            ['bets.user_id', '=', $userId],
            ['bets.round_num', '=', (int)$roundNum],
            ['bets.table_id', '=', (int)$table]
          ])
          ->select('bets.bet_history', 'rounds.game_info', 'rounds.game_result')
          ->limit(1)->get();

      return $betHistory;
    }
    //=== PULA PUTI ENDS HERE

    //=== BIG WHEEL STARTS HERE
    public function getBigWheelBetLogs() {
      $userId = app('auth')->user()->id;
      $url = env("LOBBY_DOMAIN", "https://lobby.cxz777.com/");

      return DB::connection('bigwheel')->table("bigwheel.bets")
          ->join('rounds', 'bets.round_num', '=', 'rounds.round_num')
          ->join('game_marks', 'rounds.id', '=', 'game_marks.round_id')
          ->join('nihtan_api.dealers', 'dealers.id', '=', 'rounds.dealer_id')
          ->select('bets.round_num', 'bets.user_id', 'bets.bet_history', 'bets.total_bet', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'game_marks.mark', 'rounds.table_id', 'dealers.name', 'total_win', 'total_rolling', 'total_lost', 'bets.bet_range')
          ->where('bets.user_id', '=', $userId)
          ->orderBy('bets.round_num', 'DESC')
          ->paginate(10)->setPath($url.'bigwheellogs')->toJson();
    }

    public function getBigWheelDetails(Request $request) {
      $roundNum = $request->input('round');
      $range = $request->input('range');
      $table = $request->input('table');
      $userId = app('auth')->user()->id;

      $betHistory = DB::connection('bigwheel')->table("bigwheel.bets")
          ->leftJoin('bigwheel.rounds', [
            ['bets.table_id', '=', 'rounds.table_id'],
            ['bets.round_num', '=', 'rounds.round_num']
          ])
          ->where([
            ['bets.user_id', '=', $userId],
            ['bets.bet_range', '=', $range],
            ['bets.round_num', '=', (int)$roundNum],
            ['bets.table_id', '=', (int)$table]
          ])
          ->select('bets.bet_history', 'rounds.game_info', 'rounds.game_result')
          ->limit(1)->get();

      return $betHistory;
    }

    public function getUserMoney()
    {
      return $this->getUserCredits();
    }
    //=== BIG WHEEL ENDS HERE

    //=== KAGA STARTS HERE
    public function getKagaLogs() {
      $userId = app('auth')->user()->id;
      $url = env("LOBBY_DOMAIN", "https://lobby.cxz777.com/");

      return app('db')->connection('nihtan_api')->table('kaga_transactions')
          ->select('game_id', 'bet_amount', 'credit_amount', 'new_amount', 'old_amount', 'created_at', 'is_free', 'type')
          ->whereIn('type', ['play', 'credit'])
          ->where('user_id', '=', $userId)
          ->orderBy('id', 'DESC')
          ->paginate(10)->setPath($url.'kagalogs')->toJson();
    }
    //=== KAGA ENDS HERE

    //=== PAIGOW STARTS HERE
    public function getPaigowLogs(Request $request) {
      // $userId = app('auth')->user()->id;
      // $page = $request->input('betPage');
      // $tableId = 1;
      // $gameType = $request->input('gameType');
      // $roundNum = $request->input('roundNum');
      // $playType = $request->input('playType');

      // return DB::select('CALL paigow.USP_NEW_GET_BET_HISTORY(?, ?, ?, ?, ?)', array($gameType, app('auth')->user()->id, $tableId, $roundNum, $page));

      $userId = app('auth')->user()->id;
      $url = env("LOBBY_DOMAIN", "https://lobby.cxz777.com/");

      return DB::connection('paigow')->table("paigow.bets")
          ->join('rounds', 'bets.round_id', '=', 'rounds.id')
          ->join('nihtan_api.dealers', 'dealers.id', '=', 'rounds.dealer_id')
          ->select('bets.id', 'bets.round_id', 'bets.user_id', 'bets.bet_history', 'bets.total_bet', 'bets.total_winning', 'bets.created_at', 'bets.updated_at', 'rounds.table_id', 'dealers.name', 'rounds.game_result', 'rounds.game_info', 'total_win', 'total_rolling', 'total_lost', 'rounds.round_num', 'bets.bet_range', 'rounds.status')
          ->where('bets.user_id', '=', $userId)
          ->whereIn('rounds.status', ['E', 'W'])
          ->orderBy('bets.round_id', 'DESC')
          ->paginate(10)->setPath($url.'paigowlogs')->toJson();

    }

    public function getPaigowDetails(Request $request) {
      $roundNum = $request->input('round');
      $game_name = $request->input('game_name');
      $betId = $request->input('betId');
      $table = $request->input('table');
      $userId = app('auth')->user()->id;

      $betHistory = DB::connection('paigow')->table("paigow.bets")
          ->leftJoin('paigow.rounds', [
            ['bets.round_id', '=', 'rounds.id']
          ])
          ->where([
            ['bets.id', '=', $betId],
            ['bets.user_id', '=', $userId],
            ['rounds.round_num', '=', (int)$roundNum],
            ['rounds.table_id', '=', (int)$table]
          ])
          ->select('bets.bet_history', 'rounds.game_info', 'rounds.game_result')
          ->limit(1)->get();

      return $betHistory;
    }

    //=== PAIGOW ENDS HERE

    public function setLastGameInfo(Request $r)
    {
        $default = json_decode(Auth::user()->last_game_info);

        if(is_null($default)) {
          $default = (object) [
            "game" => "",
            "slave" => "",
            "multi_yn" => "",
            "bet_range" => "",
            "multibet" => []
          ];
        }

        if(!is_null($r->input('game')))
            $default->game = $r->input('game');

        if(!is_null($r->input('data')))
            $default->multibet = $r->input('data');

        if(!is_null($r->input('range')))
            $default->bet_range = $r->input('range');
        if(!is_null($r->input('slave')))
            $default->slave = $r->input('slave') === 'classic' || $r->input('slave') === 'normal' ? '' : $r->input('slave');
        if(!is_null($r->input('multiplayer')))
            $default->multi_yn = $r->input('multiplayer');

        app('db')->table('users')->where('id', app('auth')->user()->id)
        ->update([
            'last_game_info' => json_encode($default)
        ]);

        $tables = (object) [
          "created_room" => [],
          "disable_table" => []
        ];
        $vendorData = $this->getVendor();
        if(is_null($vendorData->junket_table) && Auth::user()->is_junket) {
          app('db')->table('vendors')->where('id', app('auth')->user()->vendor_id)
          ->update([
              'junket_table' => json_encode($tables)
          ]);
        }
    }

    public function setJunketTableInfo(Request $r) {
      $vendorData = $this->getVendor();
      $type = $r->input('type');
      $game = $r->input('game');
      $active = (int) $r->input('active');

      if(!$vendorData->junket_table) {
        $junket_table = (array)[
          "disable_table" => [],
          "created_room" => []
        ];
      } else {
        $junket_table = $vendorData->junket_table;
      }

      $junket_table = gettype($junket_table) === 'string' ? (array)json_decode($junket_table) : $junket_table;
      if($active) {
        array_push($junket_table[$type], $game);
      } else {
        $diff = array_values(array_diff($junket_table[$type], [$game]));
        $junket_table[$type] = (array)$diff;
      }

      if(!empty($type)) {
        $junket_table[$type] = array_unique($junket_table[$type]);
      }

      DB::connection('nihtan_api')->table('vendors')->where('id', $vendorData->id)
        ->update([
            'junket_table' => json_encode($junket_table)
        ]);

      return ["all_disabled" => $junket_table[$type], "current_state" => $active , "current_game" => $game];
    }

    /**
     * set room info
     *
     * @param Request $request
     * @return integer insertID
     */
    public function setRoomData(Request $request) {
      $tableId = $request->input('tableId');
      $roomName = $request->input('roomName');
      $password = $request->input('password');
      $betRange = $request->input('betRange');
      $maxPlayers = $request->input('maxPlayers');
      $avatar = $request->input('avatar');
      $gamename = $request->input('gamename');
      $roomType = $request->input('roomType');
      $duration = $request->input('duration');
      $returnArr = [];

      $hash = '';
      if ($password) {
        $hash = hash("SHA256", $password);
      }

      $data = DB::select('CALL nihtan_api.USP_ROOMS_SAVE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      array(
        'I',
        $gamename,
        0,
        $tableId,
        $roomType,
        app('auth')->user()->id,
        '1',
        $roomName,
        $hash,
        $betRange,
        $maxPlayers,
        $duration
      ));

      if ($data) {
        $returnArr = [
          'tableId' => $tableId,
          'userId' => app('auth')->user()->id,
          'roomName' => $roomName,
          'roomToken' => $data[0]->token,
          'flag' => $data[0]->flag,
          'betRange' => $betRange,
          'gamename' => $gamename,
          'maxPlayers' => $maxPlayers,
          'password' => $hash,
          'duration' => $duration,
        ];
      }
      //store to vendor config
      if(!empty($returnArr)) {
        $vendorData = $this->getVendor();
        if(!$vendorData->junket_table) {
          $junket_table = (array)[
            "disable_table" => [],
            "created_room" => []
          ];
        } else {
          $junket_table = $vendorData->junket_table;
        }
        $junket_table = gettype($junket_table) === 'string' ? (array)json_decode($junket_table) : $junket_table;
        $game = $gamename.'-'.$tableId;
        array_push($junket_table['created_room'], $game);
        DB::connection('nihtan_api')->table('vendors')->where('id', $vendorData->id)
        ->update([
            'junket_table' => json_encode($junket_table)
        ]);
      }

      return $returnArr;
    }


    public function checkPass(Request $request)
    {
        $roomId = $request->input('roomId');
        $password = $request->input('password');
        $hash = hash("SHA256", $password);
        $game = $request->input('game');

        if($game == 'pai-gow') {
          $game = 'paigow';
        } else if ($game == 'dragon-tiger') {
          $game = 'dragontiger';
        }
        // else {
        //   $game = 'sicbo';
        // }

        $currPassword = app('db')->connection($game)->table($game.'.rooms')
            ->select('password')
            ->where('id', $roomId)
            ->get();
        if($hash == $currPassword[0]->password) {
            return 'true';
        } else {
            return 'false';
        }
    }

    public function getToken($length) { // 20
        $token = "";
        $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        $max = strlen($codeAlphabet); // edited

        for ($i = 0; $i < $length; $i++) {
            $token .= $codeAlphabet[$this -> cryptoRandSecure(0, $max - 1)];
        }

        return $token;
    }

    public function cryptoRandSecure($min, $max) {
        $range = $max - $min;

        if ($range < 1) {
            return $min;
        }

        $log = ceil(log($range, 2));
        $bytes = (int) ($log / 8) + 1; // length in bytes
        $bits = (int) $log + 1; // length in bits
        $filter = (int) (1 << $bits) - 1; // set all lower bits to 1

        do {
            $rnd = hexdec(bin2hex(openssl_random_pseudo_bytes($bytes)));
            $rnd = $rnd & $filter; // discard irrelevant bits
        }
        while ($rnd > $range);

        return $min + $rnd;
    }

    public function canCreateRoom(Request $request)
    {
      $vendor_id = $request->input('vendor_id');

      return DB::select('CALL nihtan_api.USP_GET_CAN_CREATE_ROOM(?)', array($vendor_id));



      // return DB::select('CALL nihtan_api.USP_GET_JUNKET_AGENT_BET_HISTORY(?, ?, ?, ?, ?, ?, ?, ?, ?)', array($gameType, $gameName, $searchId, (int)$vendor_id, (int)$tableId, (int)$roundNum, $startDate, $endDate, (int)$page));
    }
    //=== GET ROOM INFO ENDS HERE

}
