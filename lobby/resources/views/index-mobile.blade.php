<!DOCTYPE html>
<html>
<head>
  <title></title>
  <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
  <!-- <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet"> -->
  <!-- <link href="https://fonts.googleapis.com/css?family=Arvo:400,700,700i" rel="stylesheet"> -->
  <link rel="stylesheet" href="/css/app.css">
  <script src="/js/createjs/createjs-2015.11.26.min.js"></script>
  <!-- <script src="/js/createjs/luh/easel.min.js"></script> -->
  <script src="/js/createjs/easeljs-0.8.2.min.js"></script>
  <script src="/js/createjs/tweenjs-0.6.2.min.js"></script>
  <script src="/js/createjs/soundjs-0.6.2.min.js"></script>
  <script src="/js/createjs/preloadjs-0.6.2.min.js"></script>
  <script type="text/javascript" src= "/js/fastclick-master/lib/fastclick.js"></script>
  <script type="text/javascript">
    var ka_games = [];
    window.ka_url = '{{ env('KAGA_LAUNCH_URL')  }}';
    window.ka_partner_name = '{{ env('KAGA_PARTNER_NAME')  }}';
    window.socket =  '{{ env('APP_SOCKET') }}';
    window.poker_domain = '{{ env('P_DOMAIN') }}';
    window.bc_domain = '{{ env('BC_DOMAIN') }}';
    window.sb_domain = '{{ env('SB_DOMAIN') }}';
    window.dt_domain = '{{ env('DT_DOMAIN') }}';
    window.paigow_domain = '{{ env('PG_DOMAIN') }}';
    window.lobby_domain = '{{ env('LOBBY_DOMAIN') }}';

    //vendor
    window.integrationType = '{!! $integrationType !!}';

    // Currency
    window.currencyAbbrev = '{!! $currencyAbbrev !!}';
    window.maintenance = '{!! $maintenance !!}';
    window.currencyMultiplier = {!! $currencyMultiplier !!};
    window.userMultiplier = {!! $userMultiplier !!};

    <?php $tutorial_enabled = isset($config->avarta->tutorial->enabled) ? $config->avarta->tutorial->enabled : "true"; ?>

    window.config = {
      default: '{{ $config->avarta->default->data[$config->avarta->default->select] }}',
      language: '{{ $config->avarta->language->data[$config->avarta->language->select] }}',
      voice: '{{ $config->avarta->sound->voice }}',
      effect: '{{ $config->avarta->sound->effect }}',
      volume: '{{ $config->avarta->sound->volum }}',
      screen: '{{ $config->avarta->screen->data[$config->avarta->screen->select] }}',
      tutorial: '{{ $tutorial_enabled }}'
    };

    window.rawConfig = {
      default: {!! json_encode($config->avarta->default->data) !!},
      language: {!! json_encode($config->avarta->language->data) !!},
      screen: {!! json_encode($config->avarta->language->data) !!}
    };

    window.tutorial_enabled = window.config.tutorial == "true";
    window.theme = window.config.screen;

    window.username =  '{{Auth::user()->user_name}}';
    window.money =  {{ $money }};
    window.userId =  {{Auth::user()->id}};
    window.userType =  '{{Auth::user()->user_type}}';
    window.userAuthority = '{{Auth::user()->authority == "a" ? "admin" : "user" }}';
    window.casino = @if($currencyAbbrev == 'KRW' || $currencyAbbrev == 'THB') 'N' @else 'SS' @endif;
    window.vendor_id = {{ $vendor->id }};
    window.vendor_type = '{{ $vendor->deployment_type }}';
    window.reel_yn = {{ $vendor->reel_yn }};
    window.room_info = {{ $vendor->room_info_yn }};
    window.mainMultiplier = {!! $mainMultiplier !!};
    window.vendorSound = '{{ $vendor->is_sound }}';
    window.vendorData = {!! $vendorData !!};

    window.is_room = {{ $vendor->is_room }};
    window.game_settings = {!! $gameSetting !!};
    window.bcSetting =  {!! $baccaratBetSetting !!};

    //agent range
    window.agent_range =  {!! $agentRange !!};

    window.language = {
      locale: '{{ App::getLocale() }}',
      menu: {
        cashin          : '{{ trans('ingame.cashin') }}',
        cashout         : '{{ trans('ingame.cashout') }}',
        exit                : '{{ trans('ingame.exit') }}',
        fullscreen          : '{{ trans('ingame.fullscreen') }}',
        howtoplay           : '{{ trans('ingame.howtoplay') }}',
        refreshvideo        : '{{ trans('ingame.refreshvideo') }}',
        playerinfo          : '{{ trans('ingame.playerinfo') }}',
        records             : '{{ trans('ingame.records') }}',
        transfer            : '{{ trans('ingame.transfer') }}',
        modifychips         : '{{ trans('ingame.modifychips') }}',
        multiplayer         : '{{ trans('ingame.multiplayer') }}',
        singleplayer        : '{{ trans('ingame.singleplayer') }}',
        singleplayercaps    : '{{ trans('ingame.singleplayercaps') }}',
        settings            : '{{ trans('ingame.settings') }}',

        playerinfocaps      : '{{ trans('ingame.playerinfocaps') }}',
        playername          : '{{ trans('ingame.playername') }}',
        playerbalance       : '{{ trans('ingame.playerbalance') }}',
        roundid             : '{{ trans('ingame.roundid') }}',
        dealernamecaps      : '{{ trans('ingame.dealernamecaps') }}',
        channelcaps         : '{{ trans('ingame.channelcaps') }}',
        dealercaps          : '{{ trans('ingame.dealercaps') }}',

        howtoplaycaps       : '{{ trans('ingame.howtoplaycaps') }}',
        gamerules           : '{{ trans('ingame.gamerules') }}',
        gameplaytutorial    : '{{ trans('ingame.gameplaytutorial') }}',

        recordscaps         : '{{ trans('ingame.recordscaps') }}',
        transferlogscaps    : '{{ trans('ingame.transferlogscaps') }}',
        datecaps            : '{{ trans('ingame.datecaps') }}',
        typecaps            : '{{ trans('ingame.typecaps') }}',
        oldcreditcaps       : '{{ trans('ingame.oldcreditcaps') }}',
        transferamountcaps  : '{{ trans('ingame.transferamountcaps') }}',
        newcreditcaps       : '{{ trans('ingame.newcreditcaps') }}',
        ipcaps              : '{{ trans('ingame.ipcaps') }}',
        countrycaps         : '{{ trans('ingame.countrycaps') }}',
        gametypecaps     : '{{ trans('ingame.gametypecaps') }}',

        betlogscaps         : '{{ trans('ingame.betlogscaps') }}',
        gamenocaps          : '{{ trans('ingame.gamenocaps') }}',
        tablecaps           : '{{ trans('ingame.tablecaps') }}',
        roomcaps            : '{{ trans('ingame.roomcaps') }}',
        startingcreditcaps  : '{{ trans('ingame.startingcreditcaps') }}',
        totalbetcaps        : '{{ trans('ingame.totalbetcaps') }}',
        totalwinningscaps   : '{{ trans('ingame.totalwinningscaps') }}',
        resultcaps          : '{{ trans('ingame.resultcaps') }}',
        betscaps            : '{{ trans('ingame.betscaps') }}',
        winningresultcaps   : '{{ trans('ingame.winningresultcaps') }}',
        wincaps             : '{{ trans('ingame.wincaps') }}',
        losecaps            : '{{ trans('ingame.losecaps') }}',
        betcaps             : '{{ trans('ingame.betcaps') }}',
        payoutcaps          : '{{ trans('ingame.payoutcaps') }}',
        bettypecaps         : '{{ trans('ingame.bettypecaps') }}',
        bonussmall          : '{{ trans('ingame.bonussmall') }}',
        normalsmall         : '{{ trans('ingame.normalsmall') }}',
        freeplay            : '{{ trans('ingame.freeplay') }}',

        gamehistorycaps     : '{{ trans('ingame.gamehistorycaps') }}',

        transferfundscaps   : '{{ trans('ingame.transferfundscaps') }}',
        enteramount         : '{{ trans('ingame.enteramount') }}',
        availablebalance    : '{{ trans('ingame.availablebalance') }}',
        transfercaps        : '{{ trans('ingame.transfercaps') }}',

        modifychipscaps     : '{{ trans('ingame.modifychipscaps') }}',
        changechipshere     : '{{ trans('ingame.changechipshere') }}',
        applynowcaps        : '{{ trans('ingame.applynowcaps') }}',
        clearchipscaps      : '{{ trans('ingame.clearchipscaps') }}',

        settingscaps        : '{{ trans('ingame.settingscaps') }}',
        mastervolume        : '{{ trans('ingame.mastervolume') }}',
        soundeffects        : '{{ trans('ingame.soundeffects') }}',
        voice               : '{{ trans('ingame.voice') }}',
        darktheme           : '{{ trans('ingame.darktheme') }}',
        showtutorial        : '{{ trans('ingame.showtutorial') }}',

        nodata              : '{{ trans('ingame.nodata') }}'
      },
      channel: {
        channel             : '{{ trans('ingame.channel') }}',
        bet                 : '{{ trans('ingame.bet') }}'
      },
      bet_details: {
        winningscaps        : '{{ trans('ingame.winningscaps') }}'
      },
      player_info: {
        win                 : '{{ trans('ingame.win') }}',
        lose                : '{{ trans('ingame.lose') }}'
      },
      statistics: {
        autobetcaps         : '{{ trans('ingame.autobetcaps') }}',
        whitecaps           : '{{ trans('ingame.whitecaps') }}',
        redcaps             : '{{ trans('ingame.redcaps') }}',
        gamestatscaps       : '{{ trans('ingame.gamestatscaps') }}',
        statscaps           : '{{ trans('ingame.statscaps') }}',
        livebetscaps        : '{{ trans('ingame.livebetscaps') }}',
        playerscaps         : '{{ trans('ingame.playerscaps') }}',
        last150results      : '{{ trans('ingame.last150results') }}',
      },
      advanced_bet: {
        advancebetcaps      : '{{ trans('ingame.advancebetcaps') }}',
        advancebettingcaps  : '{{ trans('ingame.advancebettingcaps') }}',
        rounds              : '{{ trans('ingame.rounds') }}',
        customcaps          : '{{ trans('ingame.customcaps') }}',
        oddcaps             : '{{ trans('ingame.oddcaps') }}',
        evencaps            : '{{ trans('ingame.evencaps') }}',

        msgmain             : '{{ trans('ingame.msgmain') }}',
        msgplacebets        : '{{ trans('ingame.msgplacebets') }}',
        msgminimum          : '{{ trans('ingame.msgminimum') }}',
        msgcustom           : '{{ trans('ingame.msgcustom') }}',

        msgodd              : '{{ trans('ingame.msgodd') }}',
        msgeven             : '{{ trans('ingame.msgeven') }}',
        msgselectrounds     : '{{ trans('ingame.msgselectrounds') }}',
        msgconfirm          : '{{ trans('ingame.msgconfirm') }}',
        msgcondition1       : '{{ trans('ingame.msgcondition1') }}',
        msgcondition2       : '{{ trans('ingame.msgcondition2') }}',
        msgcondition3       : '{{ trans('ingame.msgcondition3') }}',
        msgwait             : '{{ trans('ingame.msgwait') }}',
        msgoddplaced        : '{{ trans('ingame.msgoddplaced') }}',
        msgevenplaced       : '{{ trans('ingame.msgevenplaced') }}',
        msgclear            : '{{ trans('ingame.msgclear') }}',
        msgbalance          : '{{ trans('ingame.msgbalance') }}',
        msgbetsconfirmed    : '{{ trans('ingame.msgbetsconfirmed') }}',
        msgremaining        : '{{ trans('ingame.msgremaining') }}',
        msgwin              : '{{ trans('ingame.msgwin') }}',
        msgcancelling       : '{{ trans('ingame.msgcancelling') }}',
        msgallbetsdone      : '{{ trans('ingame.msgallbetsdone') }}',
        msgfunds            : '{{ trans('ingame.msgfunds') }}'
      },
      game_buttons: {
        confirmcaps         : '{{ trans('ingame.confirmcaps') }}',
        clearcaps           : '{{ trans('ingame.clearcaps') }}',
        repeatcaps          : '{{ trans('ingame.repeatcaps') }}',
        undocaps            : '{{ trans('ingame.undocaps') }}'
      },
      prompts: {
        promptnobets        : '{{ trans('ingame.promptnobets') }}',
        promptdealer        : '{{ trans('ingame.promptdealer') }}',
        promptmaxbet        : '{{ trans('ingame.promptmaxbet') }}',
        promptminbet        : '{{ trans('ingame.promptminbet') }}',
        promptshoechange    : '{{ trans('ingame.promptshoechange') }}',
        promptshuffling     : '{{ trans('ingame.promptshuffling') }}',
        promptmaintenance   : '{{ trans('ingame.promptmaintenance') }}',
        promptlanguage      : '{{ trans('ingame.promptlanguage') }}',
        prompttheme         : '{{ trans('ingame.prompttheme') }}',
        promptrefresh       : '{{ trans('ingame.promptrefresh') }}',
        promptyes           : '{{ trans('ingame.promptyes') }}',
        promptcancel        : '{{ trans('ingame.promptcancel') }}',

        promptplacebets     : '{{ trans('ingame.promptplacebets') }}',
        promptactivated     : '{{ trans('ingame.promptactivated') }}',
        promptcancelauto    : '{{ trans('ingame.promptcancelauto') }}',
        promptcancelbets    : '{{ trans('ingame.promptcancelbets') }}',
        promptautoactive    : '{{ trans('ingame.promptautoactive') }}',
        promptnoreel        : '{{ trans('ingame.promptnoreel') }}',
        sessionexpire       : '{{ trans('ingame.sessionexpire') }}'
      },
      level:{
        vip         : '{{ trans('ingame.vip') }}',
        premium     : '{{ trans('ingame.premium') }}',
        normal      : '{{ trans('ingame.normal') }}',
        flippy      : '{{ trans('ingame.flippy') }}',
        supersix    : '{{ trans('ingame.supersix') }}',
        bonusplus   : '{{ trans('ingame.lobby_bonusplus') }}'
      },
      modal: {
        exitnihtancaps      : '{{ trans('ingame.exitnihtancaps') }}',
        redirectcasino      : '{{ trans('ingame.redirectcasino') }}',
        redirectcontinue    : '{{ trans('ingame.redirectcontinue') }}',
        promptyescaps       : '{{ trans('ingame.promptyescaps') }}',
        promptnocaps        : '{{ trans('ingame.promptnocaps') }}',
        okcaps              : '{{ trans('ingame.okcaps') }}',
      },
      lobby: {
        livegamescaps     : '{{ trans('ingame.livegamescaps') }}',
        themedgamescaps   : '{{ trans('ingame.themedgamescaps') }}',
        reelgamescaps     : '{{ trans('ingame.reelgamescaps') }}',
        tablegamescaps    : '{{ trans('ingame.tablegamescaps') }}',
        hotlivecaps       : '{{ trans('ingame.hotlivecaps') }}',
        comingsooncaps    : '{{ trans('ingame.comingsooncaps') }}',
        newgamecaps       : '{{ trans('ingame.newgamecaps') }}',
        sooncaps          : '{{ trans('ingame.sooncaps') }}',
        newcaps           : '{{ trans('ingame.newcaps') }}',

        classic           : '{{ trans('ingame.classic') }}',

        livecaps          : '{{ trans('ingame.livecaps') }}',
        themedcaps        : '{{ trans('ingame.themedcaps') }}',
        reelcaps          : '{{ trans('ingame.reelcaps') }}',
        bethistorycaps    : '{{ trans('ingame.bethistorycaps') }}',
        transactioncaps   : '{{ trans('ingame.transactioncaps') }}',
        howtoplaycaps     : '{{ trans('ingame.howtoplaycaps') }}',

        baccarat          : '{{ trans('ingame.baccarat') }}',
        dragontiger       : '{{ trans('ingame.dragontiger') }}',
        poker             : '{{ trans('ingame.poker') }}',
        texas             : "{!! trans('ingame.texas') !!}",
        sicbo             : '{{ trans('ingame.sicbo') }}',
        roulette          : '{{ trans('ingame.roulette') }}',
        redwhite          : '{{ trans('ingame.redwhite') }}',
        spinwin           : "{!! trans('ingame.spinwin') !!}",
        paigow            : '{{ trans('ingame.paigow') }}',

        dragoncaps        : '{{ trans('ingame.dragoncaps') }}',
        tigercaps         : '{{ trans('ingame.tigercaps') }}',
        reelcaps          : '{{ trans('ingame.reelcaps') }}',
        gamescaps         : '{{ trans('ingame.gamescaps') }}',
        spincaps          : '{{ trans('ingame.spincaps') }}',
        ncaps             : '{{ trans('ingame.ncaps') }}',

        dragon            : '{{ trans('ingame.dragon') }}',
        tiger             : '{{ trans('ingame.tiger') }}',

        baccaratcaps      : '{{ trans('ingame.baccaratcaps') }}',
        supersixcaps      : '{{ trans('ingame.supersixcaps') }}',
        dragontigercaps   : '{{ trans('ingame.dragontigercaps') }}',
        pokercaps         : '{{ trans('ingame.pokercaps') }}',
        bonuspluscaps     : '{{ trans('ingame.bonuspluscaps') }}',
        dragonbonuscaps   : '{{ trans('ingame.dragonbonuscaps') }}',
        texascaps         : "{!! trans('ingame.texascaps') !!}",
        sicbocaps         : '{{ trans('ingame.sicbocaps') }}',
        roulettecaps      : '{{ trans('ingame.roulettecaps') }}',
        redwhitecaps      : '{{ trans('ingame.redwhitecaps') }}',
        spinwincaps       : "{!! trans('ingame.spinwincaps') !!}",
        bonusbaccaratcaps : "{{ trans('ingame.bonusbaccaratcaps') }}",
        kagamingreelcaps  : "{{ trans('ingame.kagamingreelcaps') }}",
        betsoftreelcaps   : "{{ trans('ingame.betsoftreelcaps') }}",
        paigowcaps            : '{!! trans('ingame.paigowcaps') !!}',

        allgamescaps      : '{{ trans('ingame.allgamescaps') }}',
        hotgamescaps      : '{{ trans('ingame.hotgamescaps') }}',
        entercaps         : '{{ trans('ingame.entercaps') }}',
        latestresultcaps  : '{{ trans('ingame.latestresultcaps') }}',
        gamecaps          : '{{ trans('ingame.gamecaps') }}',
        gameroutecaps     : '{{ trans('ingame.gameroutecaps') }}',
        last5roundscaps   : '{{ trans('ingame.last5roundscaps') }}',
        roadmapcaps       : '{{ trans('ingame.roadmapcaps') }}',


        playnow           : '{{ trans('ingame.playnow') }}',
        nowbetting        : '{{ trans('ingame.nowbetting') }}',
        bettingend        : '{{ trans('ingame.bettingend') }}',
        result            : '{{ trans('ingame.result') }}',
        set               : '{{ trans('ingame.set') }}',
        game              : '{{ trans('ingame.game') }}',
        deal              : '{{ trans('ingame.deal') }}',
        latestresult      : '{{ trans('ingame.latestresult') }}',
        newround          : '{{ trans('ingame.newround') }}',
        roundhold         : '{{ trans('ingame.roundhold') }}',
        dealing           : '{{ trans('ingame.dealing') }}',
        cardswipe         : '{{ trans('ingame.cardswipe') }}',
        total             : '{{ trans('ingame.total') }}',

        bettinghistory    : '{{ trans('ingame.bettinghistory') }}',
        transactions      : '{{ trans('ingame.transactions') }}',

        bankercaps        : '{{ trans('ingame.bankercaps') }}',
        playercaps        : '{{ trans('ingame.playercaps') }}',
        dealerspaced      : '{{ trans('ingame.dealerspaced') }}',
        playerspaced      : '{{ trans('ingame.playerspaced') }}',

        account           : '{{ trans('ingame.account') }}',
        avatar            : '{{ trans('ingame.avatar') }}',
        language          : '{{ trans('ingame.language') }}',

        maintextCap1      : '{{ trans('ingame.maintextCap1') }}',
        subtextCap1       : '{{ trans('ingame.subtextCap1') }}',

        maintextCap2      : "{!! trans('ingame.maintextCap2') !!}",
        subtextCap2       : '{{ trans('ingame.subtextCap2') }}',

        maintextCap3      : '{{ trans('ingame.maintextCap3') }}',
        subtextCap3       : '{{ trans('ingame.subtextCap3') }}',

        request           : '{{ trans('ingame.request') }}',
        join              : '{{ trans('ingame.join') }}',
        create_room       : '{{ trans('ingame.create_room') }}',
        bet_range         : '{{ trans('ingame.bet_range') }}',
        banker_capital    : '{{ trans('ingame.banker_capital') }}',
        paigow_heaven       : '{{ trans('ingame.paigow_heaven') }}',
            paigow_banker       : '{{ trans('ingame.paigow_banker') }}',
            paigow_up             : '{{ trans('ingame.paigow_up') }}',
        paigow_down         : '{{ trans('ingame.paigow_down') }}',
      },
      red_white: {
        redwins             : '{{ trans('ingame.redwins') }}',
        whitewins           : '{{ trans('ingame.whitewins') }}',
        bonus               : '{{ trans('ingame.rw_bonus') }}',
        jackpot             : '{{ trans('ingame.jackpot') }}',
        bonuscaps           : '{{ trans('ingame.bonuscaps') }}',
        jackpotcaps         : '{{ trans('ingame.jackpotcaps') }}'
      },
      poker: {
        gameno              : '{{ trans('ingame.gameno') }}',
        player              : '{{ trans('ingame.player') }}',
        communitycard       : '{{ trans('ingame.communitycard') }}',
        dealer              : '{{ trans('ingame.dealer') }}',
        betflop             : '{{ trans('ingame.betflop') }}',
        betturn             : '{{ trans('ingame.betturn') }}',
        betriver            : '{{ trans('ingame.betriver') }}',

        pokerbonuscaps      : '{{ trans('ingame.pokerbonuscaps') }}',
        antecaps            : '{{ trans('ingame.antecaps') }}',
        flopcaps            : '{{ trans('ingame.flopcaps') }}',
        turncaps            : '{{ trans('ingame.turncaps') }}',
        rivercaps           : '{{ trans('ingame.rivercaps') }}'
      },
      sicbo: {
        oddevencaps         : '{{ trans('ingame.oddevencaps') }}',
        bigsmallcaps        : '{{ trans('ingame.bigsmallcaps') }}',
        sumcaps             : '{{ trans('ingame.sumcaps') }}',
        dicecaps            : '{{ trans('ingame.dicecaps') }}',
        hotcaps             : '{{ trans('ingame.hotcaps') }}',
        coldcaps            : '{{ trans('ingame.coldcaps') }}',
        oddcaps             : '{{ trans('ingame.oddcaps') }}',
        evencaps            : '{{ trans('ingame.evencaps') }}',
        bigcaps             : '{{ trans('ingame.bigcaps') }}',
        smallcaps           : '{{ trans('ingame.smallcaps') }}',
        doublecaps          : '{{ trans('ingame.doublecaps') }}',
        triplecaps          : '{{ trans('ingame.triplecaps') }}'
      }
    }
  </script>
  <style type="text/css">
    html, body { overflow: hidden; }
    canvas {
      transform: translate3d(0,0,0);
    }
  </style>
</head>
<body class="mb">
  <!--     <button id="void">VOID</button>
  <button id="voidP">VOID</button> -->
  <div class="container" id="SUPER-CONTAINER"> {{--container--}}
    <div class="wrapper"> {{--wrapper--}}
      <div class="wrapper--outer">
        <div class="wrapper--inner">
          <div class="card--wrapper">
            <div class="card">
              <div class="card--percent">0%</div>
              <div class="card--percent">0%</div>
            </div>
          </div>
        </div>
      </div>
    </div> {{-- //wrapper--}}

    <div class="font-preload" style="visibility: hidden; opacity: 0">
      <span class="BebasNeue" style="font-family:BebasNeue"></span>
      <span class="Lato" style="font-family:Lato"></span>
      <span class="LatoRegular" style="font-family:LatoRegular"></span>
      <span class="LatoBlack" style="font-family:LatoBlack"></span>
      <span class="OldStandard" style="font-family:OldStandard"></span>
    </div>
    <div class="header-mb"> {{--header-mb--}}
      <div class="header-main-mb"> {{--header-main-mb--}}
        <div class="header-logo-mb"><div>
          <i class="ico-nihtan-logo"></i>
        </div></div>
        <div class="header-menu-mb"> {{--header-menu-mb--}}
          <div class="header-nav-mb">
            <div id="livegames-mb" class="header-nav-mb__items -livegames-mb active"><div>
              <i class="ico-mb ico-livegames-mb"></i>
              <span>{{trans('ingame.livecaps')}}</span>
            </div></div>
         <!--    <div id="themedgames-mb" class="header-nav-mb__items -themed-mb -soon-mb"><div>
              <i class="ico-mb ico-themedgames-mb"></i>
              <span>{{trans('ingame.themedcaps')}}</span>
              <span class="comingsoon-mb">{{trans('ingame.comingsooncaps')}}</span>
            </div></div> -->
            <div id="reelgames-mb" class="header-nav-mb__items -reel-mb"><div>
              <i class="ico-mb ico-reelgames-mb"></i>
              <span>{{trans('ingame.reelcaps')}}</span>
            </div></div>
            <div id="history-mb" class="header-nav-mb__items -history-mb"><div>
              <i class="ico-mb ico-history-mb"></i>
              <span>{{trans('ingame.bethistorycaps')}}</span>
            </div></div>
            <div id="transaction-mb" class="header-nav-mb__items -trans-mb"><div>
              <i class="ico-mb ico-transaction-mb"></i>
              <span>{{trans('ingame.transactioncaps')}}</span>
            </div></div>
            <div id="howtoplay-mb" class="header-nav-mb__items -howto-mb"><div>
              <i class="ico-mb ico-howtoplay-mb"></i>
              <span>{{trans('ingame.howtoplaycaps')}}</span>
            </div></div>
          </div>
          <div class="header-settings-mb">
            <div class="header-setting-con">
              <div class="header-avatar-mb">
                <img id="avtar" src="/img/avatar/red_queen.png" alt=""></div>
              <i class="ico-setting-mb"></i>
            </div>
            <div class="header-userinfo-mb">
              <div class="header-userinfo-mb__name">
                <span></span>
              </div>
              <div class="header-userinfo-mb__holdings">
                <span></span>
              </div>
            </div>
          </div>
          <div class="header-logout-mb">
            <i class="ico-logout -mb"></i>
          </div>
        </div> {{-- // header-menu-mb--}}
      </div> {{-- // header-main-mb--}}
      <div class="header-sub-mb -livegames-sub"> {{--header-sub-mb--}}
        <div class="header-sub-mb__items -baccarat-mb"> {{--baccarat--}}
          <div id="baccarat-mb" class="header-sub--target"></div>
          <span class="sub-mb__items--lbl">{{trans('ingame.baccaratcaps')}}</span>
          {{-- <span class="new-mb"> {{trans('ingame.newcaps')}}</span> --}}

          <div id="baccarat-sub" class="header-subnav-mb -baccarat-sub">
            <div id="baccarat-classic-mb" class="header-subnav-mb__items -baccarat-classic-mb">
              <span class="subnav--lbl">{{trans('ingame.classic')}}</span>
            </div>
            <div id="baccarat-supersix-mb" class="header-subnav-mb__items -supersix-mb">
              <span class="subnav--lbl">{{trans('ingame.supersix')}}</span>
              {{-- <span class="new-mb"> {{trans('ingame.newcaps')}}</span> --}}
            </div>
             {{-- <div id="baccarat-bonus-mb" class="header-subnav-mb__items -bonusbaccarat-mb">
              <span class="subnav--lbl">{{trans('ingame.bonusbaccaratcaps')}}</span>
                <span class="new-mb"> {{trans('ingame.newcaps')}}</span>
            </div> --}}
          </div>
        </div> {{--// baccarat--}}
        <div class="header-sub-mb__items -poker-mb">
          <div id="poker-mb" class="header-sub--target"></div>
          <span class="sub-mb__items--lbl">{{trans('ingame.texascaps')}}</span>
          {{-- <span class="new-mb"> {{trans('ingame.newcaps')}}</span> --}}
        </div>
        <div class="header-sub-mb__items -sicbo-mb">
          <div id="sicbo-mb" class="header-sub--target"></div>
          <span class="sub-mb__items--lbl">{{trans('ingame.sicbocaps')}}</span>
          {{-- <span class="new-mb"> {{trans('ingame.newcaps')}}</span> --}}
          <div id="sicbo-sub" class="header-subnav-mb">
            <div id="sicbo-classic-mb" class="header-subnav-mb__items -sicbo-classic-mb active">
              <span class="subnav--lbl">{{trans('ingame.classic')}}</span>
              {{-- <span class="new-mb"> {{trans('ingame.newcaps')}}</span> --}}
            </div>
            <div id="sicbo-userbased-mb" class="header-subnav-mb__items -userbased-mb">
              <span class="subnav--lbl">{{trans('ingame.rooms')}}</span>
              <span class="new-mb"> {{trans('ingame.newcaps')}}</span>
            </div>
          </div>
        </div>
        <div class="header-sub-mb__items -dragontiger-mb">
          <div id="dragontiger-mb" class="header-sub--target"></div>
          <span class="sub-mb__items--lbl">{{trans('ingame.dragontigercaps')}}</span>
        </div>
        <div class="header-sub-mb__items -paigow-mb">
          <div id="paigow-mb" class="header-sub--target"></div>
          <span class="sub-mb__items--lbl">{{trans('ingame.paigowcaps')}}</span>
          <span class="new-mb"> {{trans('ingame.newcaps')}}</span>
          <div id="paigow-sub" class="header-subnav-mb">
            <div id="paigow-classic-mb" class="header-subnav-mb__items -paigow-classic-mb">
              <span class="subnav--lbl">{{trans('ingame.classic')}}</span>
              <span class="new-mb"> {{trans('ingame.newcaps')}}</span>
            </div>
            <div id="paigow-userbased-mb" class="header-subnav-mb__items -userbased-mb">
              <span class="subnav--lbl">{{trans('ingame.rooms')}}</span>
              <span class="new-mb"> {{trans('ingame.newcaps')}}</span>
            </div>
          </div>
        </div>
        <div class="header-sub-mb__items -roulette-mb">
          <span class="sub-mb__items--lbl">{{trans('ingame.roulettecaps')}}</span>
          <span class="soon-mb"> {{trans('ingame.sooncaps')}}</span>
        </div>

        <div class="header-subnav__sort -mb -sicbo">
          <span class="sort-value" data-value="all">{{ trans('ingame.all') }}</span>
          <i class="ico-arrow"></i>
          <ul class="header-subnav__sortlist -mb">
            <li data-value="all">{{ trans('ingame.all') }}</li>
            <li data-value="privaterooms">{{ trans('ingame.privaterooms') }}</li>
            <li data-value="publicrooms">{{ trans('ingame.publicrooms') }}</li>
          </ul>
        </div>
      </div> {{-- // header-sub-mb--}}

      <div class="header-sub-mb -themedgames-sub"> {{--header-sub-mb--}}
        <div class="header-sub-mb__items -paigow-mb">
          <div id="paigow-mb" class="header-sub--target"></div>
          <span class="sub-mb__items--lbl">{{trans('ingame.paigowcaps')}}</span>
          <div id="paigow-sub" class="header-subnav-mb">
            <div id="paigow-classic-mb" class="header-subnav-mb__items -paigow-classic-mb">
              <span class="subnav--lbl">{{trans('ingame.classic')}}</span>
              <span class="new-mb"> {{trans('ingame.newcaps')}}</span>
            </div>
            <div id="paigow-userbased-mb" class="header-subnav-mb__items -userbased-mb">
              <span class="subnav--lbl">{{trans('ingame.rooms')}}</span>
              <span class="new-mb"> {{trans('ingame.newcaps')}}</span>
            </div>
          </div>
        </div>
        <div class="header-sub-mb__items -redwhite-mb">
          <span class="sub-mb__items--lbl">{{trans('ingame.redwhitecaps')}}</span>
          <span class="soon-mb">{{trans('ingame.sooncaps')}}</span>
        </div>
        <div class="header-subnav__sort -mb -paigow">
          <span class="sort-value" data-value="all">{{ trans('ingame.all') }}</span>
          <i class="ico-arrow"></i>
          <ul class="header-subnav__sortlist -mb">
            <li data-value="all">{{ trans('ingame.all') }}</li>
            <li data-value="privaterooms">{{ trans('ingame.privaterooms') }}</li>
            <li data-value="publicrooms">{{ trans('ingame.publicrooms') }}</li>
          </ul>
        </div>
      </div> {{-- // header-sub-mb--}}

      <div class="header-sub-mb -reelgames-sub"> {{--header-sub-mb--}}
        {{-- <div  class="header-sub-mb__items -all-mb active">
          <div id="all-mb" class="header-sub--target"></div>
          <span class="sub-mb__items--lbl">{{trans('ingame.allgamescaps')}}</span>
        </div> --}}
        <div  class="header-sub-mb__items -kaga-mb active">
          <div id="kaga-mb" class="header-sub--target"></div>
          <span class="sub-mb__items--lbl">{{trans('ingame.kagamingreelcaps')}}</span>
          <span class="new-mb"> {{trans('ingame.newcaps')}}</span>
        </div>
        {{-- <div  class="header-sub-mb__items -betsoft-mb">
          <div id="betsoft-mb" class="header-sub--target"></div>
          <span class="sub-mb__items--lbl">{{trans('ingame.betsoftreelcaps')}}</span>
          <span class="soon-mb"> {{trans('ingame.sooncaps')}}</span>
        </div> --}}
      </div> {{-- // header-sub-mb--}}
    </div> {{--header-mb--}}
    <div id="roulette-toggle" class="howto-game">{{--roukette-toggle--}}
      <div id="top" class="howto-wrap howto-wrap-m dom-resizable"> {{-- .howto-wrap --}}
        <div class="scroll-position">
          <span class="scroll-button">
            <img src="/img/howtoplay/lobby/Asset 37.png" alt="scroll button">
          </span>
        </div>
        <div class="howto-wrap--accent"></div>
        <div class="howto-wrap__items clearfix -roulette"> {{-- .howto-wrap__items --}}
          <div class="howto-submenu"> {{-- .howto-submenu --}}
              <ul class="gamerules-menu"> {{-- .gamerules-menu --}}
                  <li class="gamerules-menu__items">
                      <a href="#game-objective"></a>
                      <span>{!! trans('howto-roulette.game_objective') !!}</span>
                  </li>
                  <li class="gamerules-menu__items">
                      <a href="#bigwheel-gameplay"></a>
                      <span>{!! trans('howto-roulette.game_play') !!}</span>
                  </li>
                  <li class="gamerules-menu__items">
                      <a href="#bigwheel-typesofbet"></a>
                      <span>{!! trans('howto-roulette.type_bets_payout') !!}</span>
                  </li>
              </ul> {{-- // .gamerules-menu --}}
          </div> {{-- // .howto-submenu --}}

          <div class="howto-contents"> {{-- .howto-contents --}}
            <div id="game-objective" class="howto--layers"> {{-- .game-objective --}}
              {!! trans('howto-roulette.game_objective_desc') !!}
            </div> {{-- // .game-objective --}}

            <div id="roulette-gameplay" class="howto--layers"> {{-- .gameplay --}}
              <h4>{!! trans('howto-roulette.game_play') !!}</h4>
              {!! trans('howto-roulette.game_play_list_mb') !!}
            </div> {{-- // .gameplay --}}

            <div id="roulette-typesofbet" class="howto--layers"> {{-- .typeofbets --}}
              <h4>{!! trans('howto-roulette.type_bets_payout') !!}</h4>
              <p>{!! trans('howto-roulette.type_bets_payout_1') !!}</p>
              <table class="tbl--typeofbets">
                  <thead>
                      <tr>
                          <th class="typeofbet">{!! trans('howto-roulette.type_of_bet') !!}</th>
                          <th class="description">{!! trans('howto-roulette.description') !!}</th>
                          <th class="payout">{!! trans('howto-roulette.payout') !!}</th>
                      </tr>
                  </thead>

                  <tbody>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_a') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_a') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_a') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_b') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_b') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_b') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_c') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_c') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_c') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_d') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_d') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_d') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_e') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_e') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_e') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_f') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_f') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_f') !!}</td>
                      </tr>
                  </tbody>
              </table>
            </div> {{-- // .typeofbets --}}

            <div id="roulette-gameplay" class="howto--layers"> {{-- .typeofbets --}}
              <p>{!! trans('howto-roulette.type_bets_payout_2') !!}</p>
              <table class="tbl--typeofbets">
                  <thead>
                      <tr>
                          <th class="typeofbet">{!! trans('howto-roulette.type_of_bet') !!}</th>
                          <th class="description">{!! trans('howto-roulette.description') !!}</th>
                          <th class="payout">{!! trans('howto-roulette.payout') !!}</th>
                      </tr>
                  </thead>

                  <tbody>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_g') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_g') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_g') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_h') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_h') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_h') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_i') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_i') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_i') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_j') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_j') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_j') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_k') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_k') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_k') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_l') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_l') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_l') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_m') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_m') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_m') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_n') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_n') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_n') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_o') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_o') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_o') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_p') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_p') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_p') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_q') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_q') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_q') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_r') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_r') !!}</td>
                          <td class="payout">{!! trans('howto-roulette.payout_r') !!}</td>
                      </tr>
                  </tbody>
              </table>
            </div> {{-- // .typeofbets --}}
            <div id="roulette-typesofbet" class="howto--layers"> {{-- .typeofbets --}}
              <p>{!! trans('howto-roulette.note') !!}</p>
            </div> {{-- // .typeofbets --}}
            <div id="roulette-typesofbet" class="howto--layers"> {{-- .typeofbets --}}
              <p>{!! trans('howto-roulette.type_bets_payout_3') !!}</p>
              <table class="tbl--typeofbets">
                  <thead>
                      <tr>
                          <th class="typeofbet">{!! trans('howto-roulette.type_of_bet') !!}</th>
                          <th class="description">{!! trans('howto-roulette.description') !!}</th>
                      </tr>
                  </thead>

                  <tbody>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_s') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_s') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_t') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_t') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_u') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_u') !!}</td>
                      </tr>
                      <tr>
                          <td class="typeofbet">{!! trans('howto-roulette.type_of_bet_v') !!}</td>
                          <td class="description">{!! trans('howto-roulette.description_v') !!}</td>
                      </tr>
                  </tbody>
              </table>
            </div> {{-- // .typeofbets --}}

          </div> {{-- // .howto-contents --}}
        </div> {{-- // .howto-wrap__items --}}

        {{-- paste here --}}
      </div> {{-- // .howto-wrap --}}
    </div> {{-- // roukette-toggle--}}
    <div id="bigwheel-toggle" class="howto-game"> {{--bigwheel-toggle--}}
      <div id="top" class="howto-wrap howto-wrap-m dom-resizable"> {{-- .howto-wrap --}}
        <div class="scroll-position">
          <span class="scroll-button">
            <img src="/img/howtoplay/lobby/Asset 37.png" alt="scroll button">
          </span>
        </div>
        <div class="howto-wrap--accent"></div>
        <div class="howto-wrap__items clearfix -spinnwin"> {{-- .howto-wrap__items --}}

          <div class="howto-submenu"> {{-- .howto-submenu --}}
            <ul class="gamerules-menu"> {{-- .gamerules-menu --}}
              <li class="gamerules-menu__items">
                <a href="#game-objective"></a>
                <span>{!! trans('howto-spinnwin.game_objective') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#bigwheel-gameplay"></a>
                <span>{!! trans('howto-spinnwin.gameplay') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#bigwheel-typesofbet"></a>
                <span>{!! trans('howto-spinnwin.types_of_bet') !!}</span>
              </li>
            </ul> {{-- // .gamerules-menu --}}
          </div> {{-- // .howto-submenu --}}

          <div class="howto-wrap__items clearfix -spinnwin"> {{-- .howto-wrap__items --}}


            <div id="bigwheel-top" class="howto-contents"> {{-- .howto-contents --}}
              <div id="game-objective" class="howto--layers objective"> {{-- .game-objective --}}
                {!! trans('howto-spinnwin.gameobj_desc_mb') !!}
              </div> {{-- // .game-objective --}}

              <div id="bigwheel-gameplay" class="howto--layers"> {{-- .gameplay --}}
                <h4>{!! trans('howto-spinnwin.gameplay') !!}</h4>

                <ul class="gameplay-list gameplay-list-m gameplay-list--2">
                  {!! trans('howto-spinnwin.gameplay_list_mb') !!}
                </ul>
              </div> {{-- // .gameplay --}}

              <div id="bigwheel-typesofbet" class="howto--layers"> {{-- .type-of-bets --}}
                <h4 id="type-of-bets">{!! trans('howto-spinnwin.types_of_bet') !!}</h4>
                <table class="tbl--typeofbets">
                  <thead>
                    <tr>
                      <th class="bet">{!! trans('howto-spinnwin.bet_mb') !!}</th>
                      <th class="payout">{!! trans('howto-spinnwin.payout_mb') !!}</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td class="bet">{!! trans('howto-spinnwin.bet_1_mb') !!}</td>
                      <td class="payout">{!! trans('howto-spinnwin.payout_1_1_mb') !!}</td>
                    </tr>

                    <tr>
                      <td class="bet">{!! trans('howto-spinnwin.bet_2_mb') !!}</td>
                      <td class="payout">{!! trans('howto-spinnwin.payout_2_1_mb') !!}</td>
                    </tr>

                    <tr>
                      <td class="bet">{!! trans('howto-spinnwin.bet_3_mb') !!}</td>
                      <td class="payout">{!! trans('howto-spinnwin.payout_5_1_mb') !!}</td>
                    </tr>

                    <tr>
                      <td class="bet">{!! trans('howto-spinnwin.bet_4_mb') !!}</td>
                      <td class="payout">{!! trans('howto-spinnwin.payout_10_1_mb') !!}</td>
                    </tr>

                    <tr>
                      <td class="bet">{!! trans('howto-spinnwin.bet_5_mb') !!}</td>
                      <td class="payout">{!! trans('howto-spinnwin.payout_20_1_mb') !!}</td>
                    </tr>

                    <tr>
                      <td class="bet">{!! trans('howto-spinnwin.bet_6_mb') !!}</td>
                      <td class="payout">{!! trans('howto-spinnwin.payout_45_1_mb') !!}</td>
                    </tr>
                  </tbody>
                </table>
              </div> {{--  //.type-of-bets --}}
            </div> {{-- // .howto-contents --}}
          </div> {{-- // .howto-wrap__items --}}
        </div> {{-- // .howto-wrap__items --}}

        {{-- paste here --}}
      </div> {{-- // .howto-wrap --}}
    </div> {{-- // bigwheel-toggle--}}
    <div id="dragontiger-toggle" class="howto-game"> {{--dmenuragontiger-toggle--}}
      <div id="top" class="howto-wrap howto-wrap-m dom-resizable"> {{-- .howto-wrap --}}
        <div class="scroll-position">
          <span class="scroll-button">
            <img src="/img/howtoplay/lobby/Asset 37.png" alt="scroll button">
          </span>
        </div>
        <div class="howto-wrap--accent"></div>
        <div class="howto-wrap__items clearfix -dragontiger"> {{-- .howto-wrap__items --}}
          <div class="howto-submenu"> {{-- .howto-submenu --}}
            <ul class="gamerules-menu"> {{-- .gamerules-menu --}}
              <li class="gamerules-menu__items">
                <a href="#game-objective"></a>
                <span>{!! trans('howto-dragontiger.game_objective') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#dragontiger-gameplay"></a>
                <span>{!! trans('howto-dragontiger.gameplay') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#dragontiger-typesofbet"></a>
                <span>{!! trans('howto-dragontiger.types_of_bet') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#dragontiger-suitsuitedtie"></a>
                <span>{!! trans('howto-dragontiger.suit_suited') !!}</span>
              </li>
            </ul> {{-- // .gamerules-menu --}}
          </div> {{-- // .howto-submenu --}}

          <div id="dragontiger-top" class="howto-contents"> {{-- .howto-contents --}}
            <div id="game-objective" class="howto--layers"> {{-- .game-objective --}}
              {!! trans('howto-dragontiger.MB_gameobj_desc') !!}
            </div> {{-- // .game-objective --}}

            <div id="dragontiger-gameplay" class="howto--layers"> {{-- .gameplay --}}
              <h4>{!! trans('howto-dragontiger.gameplay') !!}</h4>

              <ul class="gameplay-list gameplay-list-m gameplay-list--2">
                {!! trans('howto-dragontiger.MB_gameplay_list') !!}
              </ul>
            </div> {{-- // .gameplay --}}

            <div id="dragontiger-typesofbet" class="howto--layers dragontiger-payout"> {{-- .type-of-bets --}}
              <h4 id="dragontiger-typeofbets">{!! trans('howto-dragontiger.types_of_bet') !!}</h4>
              <table class="tbl--typeofbets tbl--typeofbets-m">
                <thead>
                  <tr>
                    <th class="bet">{!! trans('howto-dragontiger.bet') !!}</th>
                    <th class="payout">{!! trans('howto-dragontiger.payout') !!}</th>
                    <th class="condition">{!! trans('howto-dragontiger.condition_of_winning') !!}</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td class="bet">{!! trans('howto-dragontiger.bet_dragon') !!}</td>
                    <td class="payout">{!! trans('howto-dragontiger.payout_1_1') !!}</td>
                    <td class="condition">{!! trans('howto-dragontiger.MB_condition_1') !!}</td>
                  </tr>

                  <tr>
                    <td class="bet">{!! trans('howto-dragontiger.bet_tiger') !!}</td>
                    <td class="payout">{!! trans('howto-dragontiger.payout_1_1') !!}</td>
                    <td class="condition">{!! trans('howto-dragontiger.MB_condition_2') !!}</td>
                  </tr>

                  <tr>
                    <td class="bet">{!! trans('howto-dragontiger.bet_tie') !!}</td>
                    <td class="payout">{!! trans('howto-dragontiger.payout_10_1') !!}</td>
                    <td class="condition">{!! trans('howto-dragontiger.MB_condition_3') !!}</td>
                  </tr>

                  <tr>
                    <td class="bet">{!! trans('howto-dragontiger.bet_bigsmall') !!}</td>
                    <td class="payout">{!! trans('howto-dragontiger.payout_1_1') !!}</td>
                    <td class="condition">{!! trans('howto-dragontiger.MB_condition_4') !!}</td>
                  </tr>

                  <tr>
                    <td class="bet">{!! trans('howto-dragontiger.bet_oddeven') !!}</td>
                    <td class="payout">{!! trans('howto-dragontiger.payout_1_1') !!}</td>
                    <td class="condition">{!! trans('howto-dragontiger.MB_condition_5') !!}</td>
                  </tr>

                  <tr>
                    <td class="bet">{!! trans('howto-dragontiger.bet_suit') !!}</td>
                    <td class="payout">{!! trans('howto-dragontiger.payout_3_1') !!}</td>
                    <td class="condition">{!! trans('howto-dragontiger.MB_condition_7') !!}</td>
                  </tr>

                  <tr>
                    <td class="bet">{!! trans('howto-dragontiger.bet_suitedtie') !!}</td>
                    <td class="payout">{!! trans('howto-dragontiger.payout_50_1') !!}</td>
                    <td class="condition">{!! trans('howto-dragontiger.MB_condition_6') !!}</td>
                  </tr>
                </tbody>
              </table>
            </div> {{--  //.type-of-bets --}}

            <div id="dragontiger-suitsuitedtie" class="howto--layers dragontiger-suitsuitedtie-m clearfix"> {{-- #suit --}}
              <div class="suit__items -suit -suit-m">
                <h4>{!! trans('howto-dragontiger.suit_title') !!}</h4>
                <p>{!! trans('howto-dragontiger.MB_suit_desc') !!}</p>
                <img src="/img/howtoplay/mobile/dragontiger/dt_suit1.png" alt="suit" />
              </div>

              <div class="suit__items -suited-tie -suited-tie-m">
                <h4>{!! trans('howto-dragontiger.suitedtie_title') !!}</h4>
                <p>{!! trans('howto-dragontiger.MB_suitedtie_desc') !!}</p>
                <img src="/img/howtoplay/mobile/dragontiger/dt_suit2.png" alt="suited tie" />
              </div>
            </div> {{-- // #suit --}}
          </div> {{-- // .howto-contents --}}
        </div> {{-- // .howto-wrap__items --}}

        {{-- paste here --}}
      </div> {{-- // .howto-wrap --}}
    </div> {{-- // dragontiger-toggle--}}
    <div id="paigow-toggle" class="howto-game"> {{--paigow-toggle--}}
      <div id="top" class="howto-wrap howto-wrap-m dom-resizable"> {{-- .howto-wrap --}}
        <div class="scroll-position">
          <span class="scroll-button">
            <img src="/img/howtoplay/lobby/Asset 37.png" alt="scroll button">
          </span>
        </div>
        <div class="howto-wrap--accent"></div>
        <div class="howto-wrap__items clearfix -paigow"> {{-- .howto-wrap__items --}}
          <div class="howto-submenu"> {{-- .howto-submenu --}}
            <ul class="gamerules-menu"> {{-- .gamerules-menu --}}
              <li class="gamerules-menu__items">
                <a href="#game-objective"></a>
                <span>{!! trans('howto-paigow.game_objective') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#paigow-gameplay"></a>
                <span>{!! trans('howto-paigow.gameplay') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#paigow-playerpayout_bankerwin"></a>
                <span>{!! trans('howto-paigow.playerpayout_bankerwin') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#paigow-tiles_values"></a>
                <span>{!! trans('howto-paigow.tile_values') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#paigow-tile_ranking"></a>
                <span>{!! trans('howto-paigow.tile_ranking') !!}</span>
              </li>
            </ul> {{-- // .gamerules-menu --}}
          </div> {{-- // .howto-submenu --}}
          <div id="paigow-top" class="howto-contents"> {{-- .howto-contents --}}
            <div id="game-objective" class="howto--layers"> {{-- .game-objective --}}
              {!! trans('howto-paigow.mb_gameobj_desc') !!}
            </div> {{-- // .game-objective --}}
            <div id="paigow-gameplay" class="howto--layers"> {{-- .gameplay --}}
              <h4>{!! trans('howto-paigow.gameplay') !!}</h4>
              <ul class="gameplay-list gameplay-list-m gameplay-list--2">
                {!! trans('howto-paigow.mb_gameplay_1') !!}
                <table class="tbl--rules gameplay">
                  <thead>
                    <tr>
                      <th class="rules--card">{!! trans('howto-paigow.totalpoints_diceroll') !!}</th>
                      <th class="rules--payout">{!! trans('howto-paigow.slot_assignment') !!}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{!! trans('howto-paigow.totalpoints_diceroll_1') !!}</td>
                      <td>{!! trans('howto-paigow.slot_assignment_1') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-paigow.totalpoints_diceroll_2') !!}</td>
                      <td>{!! trans('howto-paigow.slot_assignment_2') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-paigow.totalpoints_diceroll_3') !!}</td>
                      <td>{!! trans('howto-paigow.slot_assignment_3') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-paigow.totalpoints_diceroll_4') !!}</td>
                      <td>{!! trans('howto-paigow.slot_assignment_4') !!}</td>
                    </tr>
                  </tbody>
                </table>
                {!! trans('howto-paigow.mb_gameplay_2') !!}
              </ul>
            </div> {{-- // .gameplay --}}
            <div id="paigow-playerpayout_bankerwin" class="howto--layers"> {{-- .playerpayout_bankerwin --}}
              <h4>{!! trans('howto-paigow.playerpayout_bankerwin') !!}</h4>
              <table class="tbl--rules playerpayout">
                <thead>
                  <tr>
                    <th class="rules--card">{!! trans('howto-paigow.bet') !!}</th>
                    <th class="rules--payout">{!! trans('howto-paigow.winning_condition') !!}</th>
                    <th class="rules--payout">{!! trans('howto-paigow.player_payout') !!}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowspan="2">{!! trans('howto-paigow.bet_1') !!}</td>
                    <td>{!! trans('howto-paigow.winning_hand_1') !!}</td>
                    <td>{!! trans('howto-paigow.player_payout_1') !!}</td>
                  </tr>
                  <tr>
                    <td>{!! trans('howto-paigow.winning_hand_2') !!}</td>
                    <td>{!! trans('howto-paigow.player_payout_2') !!}</td>
                  </tr>
                  <tr>
                    <td>{!! trans('howto-paigow.bet_2') !!}</td>
                    <td>{!! trans('howto-paigow.winning_hand_3') !!}</td>
                    <td rowspan="3">{!! trans('howto-paigow.player_payout_3') !!}</td>
                  </tr>
                  <tr>
                    <td>{!! trans('howto-paigow.bet_3') !!}</td>
                    <td>{!! trans('howto-paigow.winning_hand_4') !!}</td>
                  </tr>
                  <tr>
                    <td>{!! trans('howto-paigow.bet_4') !!}</td>
                    <td>{!! trans('howto-paigow.winning_hand_5') !!}</td>
                  </tr>
                </tbody>
              </table>
            </div> {{-- // .playerpayout_bankerwin --}}
            <div id="paigow-tiles_values" class="howto--layers"> {{-- .paigow-tiles_values --}}
              <h4>{!! trans('howto-paigow.tile_values') !!}</h4>
              <p>{!! trans('howto-paigow.mb_tiles_values_desc_1') !!}</p>
              {!! trans('howto-paigow.mb_tiles_values_1_img') !!}
              <p>{!! trans('howto-paigow.mb_tiles_values_desc_2') !!}</p>
            </div> {{-- // .paigow-tiles_values --}}
            <div id="paigow-tile_ranking" class="howto--layers"> {{-- .paigow-tile_ranking --}}
              <h4>{!! trans('howto-paigow.tile_ranking') !!}</h4>
              <p><span>{!! trans('howto-paigow.exact_pair') !!}</span></p>
              <div class="tile-positioning-wrap">
                <div class="tile-positioning__items">
                  {!! trans('howto-paigow.tile_ranking_1_img') !!}
                  <p class="tile-ranking"><span>{!! trans('howto-paigow.window_pair') !!}</span></p>
                  {!! trans('howto-paigow.tile_ranking_3_img') !!}
                  <p class="tile-ranking"><span>{!! trans('howto-paigow.8_pair') !!}</span></p>
                  {!! trans('howto-paigow.tile_ranking_5_img') !!}
                  <p class="tile-ranking"><span>{!! trans('howto-paigow.6_pair') !!}</span></p>
                  {!! trans('howto-paigow.tile_ranking_7_img') !!}
                  <p class="tile-ranking"><span>{!! trans('howto-paigow.4_pair') !!}</span></p>
                  {!! trans('howto-paigow.tile_ranking_9_img') !!}
                  <p class="tile-ranking"><span>{!! trans('howto-paigow.2_pair') !!}</span></p>
                </div>
                <div class="tile-positioning__items">
                  {!! trans('howto-paigow.tile_ranking_2_img') !!}
                  <p class="tile-ranking"><span>{!! trans('howto-paigow.9_pair') !!}</span></p>
                  {!! trans('howto-paigow.tile_ranking_4_img') !!}
                  <p class="tile-ranking"><span>{!! trans('howto-paigow.7_pair') !!}</span></p>
                  {!! trans('howto-paigow.tile_ranking_6_img') !!}
                  <p class="tile-ranking"><span>{!! trans('howto-paigow.5_pair') !!}</span></p>
                  {!! trans('howto-paigow.tile_ranking_8_img') !!}
                  <p class="tile-ranking"><span>{!! trans('howto-paigow.3_pair') !!}</span></p>
                  {!! trans('howto-paigow.tile_ranking_10_img') !!}
                  <p class="tile-ranking"><span>{!! trans('howto-paigow.1_pair') !!}</span></p>
                </div>
              </div>
              <p><span>{!! trans('howto-paigow.highest_sum') !!}</span></p>
              <div class="tile-positioning-wrap highest_sum">
                <p class="tile-ranking"><span>{!! trans('howto-paigow.sum_9') !!}</span></p>
                {!! trans('howto-paigow.tile_ranking_sum_1_img') !!}
                <p class="tile-ranking"><span>{!! trans('howto-paigow.sum_8') !!}</span></p>
                {!! trans('howto-paigow.tile_ranking_sum_2_img') !!}
                <p class="tile-ranking"><span>{!! trans('howto-paigow.sum_7') !!}</span></p>
                {!! trans('howto-paigow.tile_ranking_sum_3_img') !!}
                <p class="tile-ranking"><span>{!! trans('howto-paigow.sum_6') !!}</span></p>
                {!! trans('howto-paigow.tile_ranking_sum_4_img') !!}
                <p class="tile-ranking"><span>{!! trans('howto-paigow.sum_5') !!}</span></p>
                {!! trans('howto-paigow.tile_ranking_sum_5_img') !!}
                <p class="tile-ranking"><span>{!! trans('howto-paigow.sum_4') !!}</span></p>
                {!! trans('howto-paigow.tile_ranking_sum_6_img') !!}
                <p class="tile-ranking"><span>{!! trans('howto-paigow.sum_3') !!}</span></p>
                {!! trans('howto-paigow.tile_ranking_sum_7_img') !!}
                <p class="tile-ranking"><span>{!! trans('howto-paigow.sum_2') !!}</span></p>
                {!! trans('howto-paigow.tile_ranking_sum_8_img') !!}
                <p class="tile-ranking"><span>{!! trans('howto-paigow.sum_1') !!}</span></p>
                {!! trans('howto-paigow.tile_ranking_sum_9_img') !!}
                <p class="tile-ranking"><span>{!! trans('howto-paigow.sum_0') !!}</span></p>
                {!! trans('howto-paigow.tile_ranking_sum_0_img') !!}
              </div>
            </div> {{-- // .paigow-tile_ranking --}}
          </div> {{-- // .howto-contents --}}
        </div> {{-- // .howto-wrap__items --}}
      </div> {{-- // .howto-wrap --}}
    </div> {{-- // paigow-toggle--}}
    <div id="red-white-toggle" class="howto-game"> {{--red-white-toggle--}}
      <div id="top" class="howto-wrap howto-wrap-m dom-resizable"> {{-- .howto-wrap --}}
        <div class="scroll-position">
          <span class="scroll-button">
            <img src="/img/howtoplay/lobby/Asset 37.png" alt="scroll button">
          </span>
        </div>
        <div class="howto-wrap--accent"></div>
        <div class="howto-wrap__items clearfix -redwhite"> {{-- .howto-wrap__items --}}
          <div class="howto-submenu"> {{-- .howto-submenu --}}
            <ul class="gamerules-menu"> {{-- .gamerules-menu --}}
              <li class="gamerules-menu__items">
                <a href="#game-objective"></a>
                <span>{!! trans('howto-redwhite.game_objective') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#redwhite-gameplay"></a>
                <span>{!! trans('howto-redwhite.gameplay') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#redwhite-typesofbet"></a>
                <span>{!! trans('howto-redwhite.types_of_bet') !!}</span>
              </li>
            </ul> {{-- // .gamerules-menu --}}
          </div> {{-- // .howto-submenu --}}

          <div class="howto-wrap__items clearfix -redwhite"> {{-- .howto-wrap__items --}}

            <div id="red-white-top" class="howto-contents custom-m-contents"> {{-- .howto-contents --}}
              <div id="game-objective" class="howto--layers"> {{-- .game-objective --}}
                {!! trans('howto-redwhite.gameobj_desc_mb') !!}
              </div> {{-- // .game-objective --}}

              <div id="redwhite-gameplay" class="howto--layers"> {{-- .gameplay --}}
                <h4>{!! trans('howto-redwhite.gameplay') !!}</h4>

                <ul class="gameplay-list gameplay-list-m gameplay-list--2">
                  {!! trans('howto-redwhite.gameplay_list_mb') !!}
                </ul>
              </div> {{-- // .gameplay --}}

              <div id="redwhite-typesofbet" class="howto--layers"> {{-- .type-of-bets --}}
                <h4 id="redwhite-typeofbets">{!! trans('howto-redwhite.types_of_bet') !!}</h4>
                <table class="tbl--typeofbets redwhite-table">
                  <thead>
                    <tr>
                      <th class="condition">{!! trans('howto-redwhite.bet_mb') !!}</th>
                      <th class="payout">{!! trans('howto-redwhite.payout_mb') !!}</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td class="condition">{!! trans('howto-redwhite.bet_1_mb') !!}</td>
                      <td class="payout">{!! trans('howto-redwhite.payout_1_1_mb') !!}</td>
                    </tr>

                    <tr>
                      <td class="condition">{!! trans('howto-redwhite.bet_2_mb') !!}</td>
                      <td class="payout">{!! trans('howto-redwhite.payout_1_1_mb') !!}</td>
                    </tr>

                    <tr>
                      <td class="condition">{!! trans('howto-redwhite.bet_3_mb') !!}</td>
                      <td class="payout">{!! trans('howto-redwhite.payout_7_1_mb') !!}</td>
                    </tr>

                    <tr>
                      <td class="condition">{!! trans('howto-redwhite.bet_4_mb') !!}</td>
                      <td class="payout">{!! trans('howto-redwhite.payout_7_1_mb') !!}</td>
                    </tr>

                    <tr>
                      <td class="condition">{!! trans('howto-redwhite.bet_5_mb') !!}</td>
                      <td class="payout">{!! trans('howto-redwhite.payout_15_1_mb') !!}</td>
                    </tr>

                    <tr>
                      <td class="condition">{!! trans('howto-redwhite.bet_6_mb') !!}</td>
                      <td class="payout">{!! trans('howto-redwhite.payout_250_1_mb') !!}</td>
                    </tr>
                  </tbody>
                </table>
              </div> {{--  //.type-of-bets --}}
            </div> {{-- // .howto-contents --}}
          </div> {{-- // .howto-wrap__items --}}
        </div> {{-- // .howto-wrap__items --}}

        {{-- paste here --}}
      </div> {{-- // .howto-wrap --}}
    </div> {{-- // red-white-toggle--}}
    <div id="poker-toggle" class="howto-game"> {{--poker-toggle--}}
      <div id="top" class="howto-wrap howto-wrap-m dom-resizable"> {{-- .howto-wrap --}}
        <div class="scroll-position">
          <span class="scroll-button">
            <img src="/img/howtoplay/lobby/Asset 37.png" alt="scroll button">
          </span>
        </div>
        <div class="howto-wrap--accent"></div>
        <div class="howto-wrap__items clearfix -poker"> {{-- .howto-wrap__items --}}
          <div class="howto-wrap__items clearfix -poker"> {{-- .howto-wrap__items --}}
            <div class="howto-submenu"> {{-- .howto-submenu --}}
              <ul class="gamerules-menu"> {{-- .gamerules-menu --}}
                <li class="gamerules-menu__items">
                  <a href="#game-objective"></a>
                  <span>{!! trans('howto-poker.game_objective') !!}</span>
                </li>
                <li class="gamerules-menu__items">
                  <a href="#poker-gameplay"></a>
                  <span>{!! trans('howto-poker.gameplay') !!}</span>
                </li>
                <li class="gamerules-menu__items">
                  <a href="#poker-hand-rankings"></a>
                  <span>{!! trans('howto-poker.poker_hand_rankings') !!}</span>
                </li>
                <li class="gamerules-menu__items">
                  <a href="#poker-bettingsystem"></a>
                  <span>{!! trans('howto-poker.betting_system') !!}</span>
                </li>
                <li class="gamerules-menu__items">
                  <a href="#poker-antebetpayouts"></a>
                  <span>{!! trans('howto-poker.ante_bet_payouts') !!}</span>
                </li>
                <li class="gamerules-menu__items">
                  <a href="#poker-payouts"></a>
                  <span>{!! trans('howto-poker.payouts') !!}</span>
                </li>
                <li class="gamerules-menu__items">
                  <a href="#poker-samehandranking"></a>
                  <span>{!! trans('howto-poker.same_hand_ranking') !!}</span>
                </li>
              </ul> {{-- // .gamerules-menu --}}
            </div> {{-- // .howto-submenu --}}

            <div id="poker-top" class="howto-contents"> {{-- .howto-contents --}}
              <div id="game-objective" class="howto--layers"> {{--howto--layers--}}
                <h4>{!! trans('howto-poker.game_objective') !!}</h4>
                {!! trans('howto-poker.game_objective_desc_mb') !!}
              </div> {{-- // howto--layers--}}

              <div id="poker-gameplay" class="howto--layers"> {{-- .gameplay --}}
                <h4>{!! trans('howto-poker.gameplay') !!}</h4>

                <ul class="gameplay-list gameplay-list-m gameplay-list--2">
                  {!! trans('howto-poker.gameplay_desc_mb') !!}
                </ul>
              </div> {{-- // .gameplay --}}

              <div id="poker-hand-rankings" class="howto--layers"> {{--howto--layers--}}
                <h4>{!! trans('howto-poker.poker_hand_rankings') !!}</h4>
                <div class="pokerhand-wrap"> {{--pokerhand-wrap--}}
                  <div class="pokerhand-con pokerhand-con-m clearfix">
                    <div class="pokerhand-con__items clearfix">
                      <h5>1. {!! trans('howto-poker.poker_hand_ranking_list_1') !!}</h5>
                      {{-- <img src="/img/howtoplay/mobile/poker/poker_handranking_1.png" alt=""> --}}
                      <p>{!! trans('howto-poker.poker_hand_ranking_list_1_desc_mb') !!}</p>
                    </div>
                    <div class="pokerhand-con__items clearfix">
                      <img src="/img/howtoplay/mobile/poker/poker_handranking_1.png" alt="">
                    </div>
                  </div>
                  <div class="pokerhand-con pokerhand-con-m clearfix">
                    <div class="pokerhand-con__items clearfix">
                      <h5>2. {!! trans('howto-poker.poker_hand_ranking_list_2') !!}</h5>
                      <p>{!! trans('howto-poker.poker_hand_ranking_list_2_desc_mb') !!}</p>
                    </div>
                    <div class="pokerhand-con__items clearfix"></div>
                    <div class="pokerhand-con__items clearfix">
                      <h5>a.) {!! trans('howto-poker.poker_hand_ranking_list_3') !!}</h5>
                      {{-- <img src="/img/howtoplay/mobile/poker/poker_handranking_2.png" alt=""> --}}
                      <p class="rankinglist-sub"> {!! trans('howto-poker.poker_hand_ranking_list_3_desc_mb') !!}</p>
                    </div>
                    <div class="pokerhand-con__items clearfix">
                      <img src="/img/howtoplay/mobile/poker/poker_handranking_2.png" alt="">
                    </div>
                  </div>
                  <div class="pokerhand-con pokerhand-con-m clearfix">
                    <div class="pokerhand-con__items clearfix">
                      <h5>b.) {!! trans('howto-poker.poker_hand_ranking_list_4') !!}</h5>
                      <p class="rankinglist-sub">{!! trans('howto-poker.poker_hand_ranking_list_4_desc_mb') !!}</p>
                    </div>
                    <div class="pokerhand-con__items clearfix">
                      <img src="/img/howtoplay/mobile/poker/poker_handranking_2-1.png" alt="">
                    </div>
                  </div>
                  <div class="pokerhand-con pokerhand-con-m clearfix">
                    <div class="pokerhand-con__items clearfix">
                      <h5>3. {!! trans('howto-poker.poker_hand_ranking_list_5') !!}</h5>
                      <p>{!! trans('howto-poker.poker_hand_ranking_list_5_desc_mb') !!}</p>
                    </div>
                    <div class="pokerhand-con__items clearfix">
                      <img src="/img/howtoplay/mobile/poker/poker_handranking_3.png" alt="">
                    </div>
                  </div>
                  <div class="pokerhand-con pokerhand-con-m clearfix">
                    <div class="pokerhand-con__items clearfix">
                      <h5>4. {!! trans('howto-poker.poker_hand_ranking_list_6') !!}</h5>

                      <p>{!! trans('howto-poker.poker_hand_ranking_list_6_desc_mb') !!}</p>
                    </div>
                    <div class="pokerhand-con__items clearfix">
                      <img src="/img/howtoplay/mobile/poker/poker_handranking_4.png" alt="">
                    </div>
                  </div>
                  <div class="pokerhand-con pokerhand-con-m clearfix">
                    <div class="pokerhand-con__items clearfix">
                      <h5>5. {!! trans('howto-poker.poker_hand_ranking_list_7') !!}</h5>
                      <p>{!! trans('howto-poker.poker_hand_ranking_list_7_desc_mb') !!}</p>
                    </div>
                    <div class="pokerhand-con__items clearfix">
                      <img src="/img/howtoplay/mobile/poker/poker_handranking_5.png" alt="">
                    </div>
                  </div>
                  <div class="pokerhand-con pokerhand-con-m clearfix">
                    <div class="pokerhand-con__items clearfix">
                      <h5>6. {!! trans('howto-poker.poker_hand_ranking_list_8') !!}</h5>
                      <p>{!! trans('howto-poker.poker_hand_ranking_list_8_desc_mb') !!}</p>
                    </div>
                    <div class="pokerhand-con__items clearfix"></div>
                    <div class="pokerhand-con__items clearfix">
                      <h5>a.) {!! trans('howto-poker.poker_hand_ranking_list_9') !!} </h5>
                      <p class="rankinglist-sub">{!! trans('howto-poker.poker_hand_ranking_list_9_desc_mb') !!}</p>
                    </div>
                    <div class="pokerhand-con__items clearfix">
                      <img src="/img/howtoplay/mobile/poker/poker_handranking_6.png" alt="">
                    </div>
                  </div>
                  <div class="pokerhand-con pokerhand-con-m clearfix">
                    <div class="pokerhand-con__items clearfix">
                      <h5>b.) {!! trans('howto-poker.poker_hand_ranking_list_10') !!}</h5>
                      <p class="rankinglist-sub">{!! trans('howto-poker.poker_hand_ranking_list_10_desc_mb') !!}</p>
                    </div>
                    <div class="pokerhand-con__items clearfix">
                      <img src="/img/howtoplay/mobile/poker/poker_handranking_6-1.png" alt="">
                    </div>
                  </div>
                  <div class="pokerhand-con pokerhand-con-m clearfix">
                    <div class="pokerhand-con__items clearfix">
                      <h5>7. {!! trans('howto-poker.poker_hand_ranking_list_11') !!}</h5>
                      <p>{!! trans('howto-poker.poker_hand_ranking_list_11_desc_mb') !!}</p>
                    </div>
                    <div class="pokerhand-con__items clearfix">
                      <img src="/img/howtoplay/mobile/poker/poker_handranking_7.png" alt="">
                    </div>
                  </div>
                  <div class="pokerhand-con pokerhand-con-m clearfix">
                    <div class="pokerhand-con__items clearfix">
                      <h5>8. {!! trans('howto-poker.poker_hand_ranking_list_12') !!}</h5>
                      <p>{!! trans('howto-poker.poker_hand_ranking_list_12_desc_mb') !!}</p>
                    </div>
                    <div class="pokerhand-con__items clearfix">
                      <img src="/img/howtoplay/mobile/poker/poker_handranking_8.png" alt="">
                    </div>
                  </div>
                  <div class="pokerhand-con pokerhand-con-m clearfix">
                    <div class="pokerhand-con__items clearfix">
                      <h5>9. {!! trans('howto-poker.poker_hand_ranking_list_13') !!}</h5>
                      <p>{!! trans('howto-poker.poker_hand_ranking_list_13_desc_mb') !!}</p>
                    </div>
                    <div class="pokerhand-con__items clearfix">
                      <img src="/img/howtoplay/mobile/poker/poker_handranking_9.png" alt="">
                    </div>
                  </div>
                  <div class="pokerhand-con pokerhand-con-m clearfix">
                    <div class="pokerhand-con__items clearfix">
                      <h5>10. {!! trans('howto-poker.poker_hand_ranking_list_14') !!}</h5>
                      <p>{!! trans('howto-poker.poker_hand_ranking_list_14_desc_mb') !!}</p>
                    </div>
                    <div class="pokerhand-con__items clearfix">
                      <img src="/img/howtoplay/mobile/poker/poker_handranking_10.png" alt="">
                    </div>
                  </div>
                </div> {{--pokerhand-wrap--}}
              </div> {{-- // howto--layers--}}

              <div id="poker-bettingsystem" class="howto--layers"> {{--howto--layers--}}
                <h4>{!! trans('howto-poker.betting_system') !!}</h4>
                <table class="tbl--rules">
                  <thead>
                    <tr>
                      <th class="rules--round">{!! trans('howto-poker.betting_system_round') !!}</th>
                      <th class="rules--bet">{!! trans('howto-poker.betting_system_bet') !!}</th>
                      <th class="rules--action">{!! trans('howto-poker.betting_system_action') !!}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td rowspan="4">{!! trans('howto-poker.betting_system_round_1') !!}</td>
                      <td>{!! trans('howto-poker.betting_system_bet_1') !!}</td>
                      <td>{!! trans('howto-poker.betting_system_action_1_mb') !!}</td>
                    </tr>

                    <tr>
                      <td>{!! trans('howto-poker.betting_system_bet_2') !!}</td>
                      <td>{!! trans('howto-poker.betting_system_action_2_mb') !!}</td>
                    </tr>

                    <tr>
                      <td>{!! trans('howto-poker.betting_system_bet_3') !!}</td>
                      <td>{!! trans('howto-poker.betting_system_action_3_mb') !!}</td>
                    </tr>

                    <tr>
                      <td>{!! trans('howto-poker.betting_system_bet_4') !!}</td>
                      <td>{!! trans('howto-poker.betting_system_action_4_mb') !!}</td>
                    </tr>

                    <tr>
                      <td>{!! trans('howto-poker.betting_system_round_2') !!}</td>
                      <td>{!! trans('howto-poker.betting_system_bet_5') !!}</td>
                      <td>{!! trans('howto-poker.betting_system_action_5_mb') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-poker.betting_system_round_3') !!}</td>
                      <td>{!! trans('howto-poker.betting_system_bet_6') !!}</td>
                      <td>{!! trans('howto-poker.betting_system_action_6_mb') !!}</td>
                    </tr>

                    <tr>
                      <td>{!! trans('howto-poker.betting_system_round_4') !!}</td>
                      <td>{!! trans('howto-poker.betting_system_bet_7') !!}</td>
                      <td>{!! trans('howto-poker.betting_system_action_7_mb') !!}</td>
                    </tr>
                  </tbody>
                </table>
              </div> {{-- // howto--layers--}}

              <div id="poker-antebetpayouts" class="howto--layers"> {{--howto--layers--}}
                <h4>{!! trans('howto-poker.ante_bet_payouts') !!}</h4>
                <ol class="antebet--list">
                  {!! trans('howto-poker.ante_bet_payouts_desc_mb') !!}
                </ol>
              </div> {{-- // howto--layers--}}

              <div id="poker-payouts" class="howto--layers"> {{--howto--layers--}}
                <h4>{!! trans('howto-poker.payouts') !!}</h4>
                <h5>{!! trans('howto-poker.bonus_bet_payouts') !!}</h5>
                <table class="tbl--rules">
                  <thead>
                    <tr>
                      <th class="rules--card">{!! trans('howto-poker.players_whole_card') !!}</th>
                      <th class="rules--payout">{!! trans('howto-poker.payout_mb') !!}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{!! trans('howto-poker.players_whole_card_1') !!}</td>
                      <td>{!! trans('howto-poker.payout_1') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-poker.players_whole_card_2') !!}</td>
                      <td>{!! trans('howto-poker.payout_2') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-poker.players_whole_card_3') !!}</td>
                      <td>{!! trans('howto-poker.payout_3') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-poker.players_whole_card_4') !!}</td>
                      <td>{!! trans('howto-poker.payout_4') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-poker.players_whole_card_5') !!}</td>
                      <td>{!! trans('howto-poker.payout_5') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-poker.players_whole_card_6') !!}</td>
                      <td>{!! trans('howto-poker.payout_6') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-poker.players_whole_card_7') !!}</td>
                      <td>{!! trans('howto-poker.payout_7') !!}</td>
                    </tr>
                  </tbody>
                </table>

                <h5>{!! trans('howto-poker.bonus_plus_payouts') !!}</h5>
                <ol class="pokerbonusplus--list">
                  {!! trans('howto-poker.bonus_plus_desc') !!}
                </ol>
                <table class="tbl--rules">
                  <thead>
                    <tr>
                      <th class="rules--card">{!! trans('howto-poker.players_poker_hand') !!}</th>
                      <th class="rules--payout">{!! trans('howto-poker.payout_mb') !!}</th>
                      <th class="rules--beat">{!! trans('howto-poker.bad_beat') !!}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{!! trans('howto-poker.players_poker_hand_1') !!}</td>
                      <td>{!! trans('howto-poker.payout_8') !!}</td>
                      <td>{!! trans('howto-poker.bad_beat_1') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-poker.players_poker_hand_2') !!}</td>
                      <td>{!! trans('howto-poker.payout_9') !!}</td>
                      <td>{!! trans('howto-poker.bad_beat_2') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-poker.players_poker_hand_3') !!}</td>
                      <td>{!! trans('howto-poker.payout_10') !!}</td>
                      <td>{!! trans('howto-poker.bad_beat_3') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-poker.players_poker_hand_4') !!}</td>
                      <td>{!! trans('howto-poker.payout_11') !!}</td>
                      <td>{!! trans('howto-poker.bad_beat_4') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-poker.players_poker_hand_5') !!}</td>
                      <td>{!! trans('howto-poker.payout_12') !!}</td>
                      <td>{!! trans('howto-poker.bad_beat_5') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-poker.players_poker_hand_6') !!}</td>
                      <td>{!! trans('howto-poker.payout_13') !!}</td>
                      <td>{!! trans('howto-poker.bad_beat_6') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-poker.players_poker_hand_7') !!}</td>
                      <td>{!! trans('howto-poker.payout_14') !!}</td>
                      <td>{!! trans('howto-poker.bad_beat_7') !!}</td>
                    </tr>
                  </tbody>
                </table>

                <h5>{!! trans('howto-poker.pocket_bonus_payouts') !!}</h5>
                <table class="tbl--rules">
                  <thead>
                    <tr>
                      <th class="rules--card">{!! trans('howto-poker.players_hole_cards') !!}</th>
                      <th class="rules--payout">{!! trans('howto-poker.payout_mb') !!}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{!! trans('howto-poker.players_hole_cards_1') !!}</td>
                      <td>{!! trans('howto-poker.payout_15') !!}</td>
                    </tr>
                    <tr>
                      <td>{!! trans('howto-poker.players_hole_cards_2') !!}</td>
                      <td>{!! trans('howto-poker.payout_16') !!}</td>
                    </tr>
                  </tbody>
                </table>
              </div> {{-- // howto--layers--}}
              <div id="poker-samehandranking" class="howto--layers hand-rank"> {{--howto--layers--}}
                <h4>{!! trans('howto-poker.same_hand_ranking') !!}</h4>
                {!! trans('howto-poker.same_hand_ranking_desc_mb') !!}

                <ol class="handranking--list handranking--list-m">
                  <li>
                    <span>{!! trans('howto-poker.same_hand_ranking_1') !!}</span>
                    <ol class="handranking-sub--list">
                      <li>
                        <span>{!! trans('howto-poker.same_hand_ranking_1_1_mb') !!}</span>
                        <div class="handranking--sub--text">
                          <div>
                            <p>{!! trans('howto-poker.same_hand_ranking_dealer') !!}</p>
                            <p>{!! trans('howto-poker.same_hand_ranking_comcard') !!}</p>
                            <p>{!! trans('howto-poker.same_hand_ranking_player') !!}</p>
                          </div>
                          <img src="/img/howtoplay/mobile/poker/poker_handranking_11.png" alt="playboards">
                        </div>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <span>{!! trans('howto-poker.same_hand_ranking_2_mb') !!}</span>
                    <ol class="handranking-sub--list">
                      <li>
                        <span>{!! trans('howto-poker.same_hand_ranking_2_1') !!}</span>
                        <div class="handranking--sub--text">
                          <div>
                            <p>{!! trans('howto-poker.same_hand_ranking_dealer') !!}</p>
                            <p>{!! trans('howto-poker.same_hand_ranking_comcard') !!}</p>
                            <p>{!! trans('howto-poker.same_hand_ranking_player') !!}</p>
                          </div>
                          <img src="/img/howtoplay/mobile/poker/poker_handranking_12.png" alt="playboards">
                        </div>
                      </li>
                      <li>
                        <span>{!! trans('howto-poker.same_hand_ranking_2_2') !!}</span>
                        <div class="handranking--sub--text">
                          <div>
                            <p>{!! trans('howto-poker.same_hand_ranking_dealer') !!}</p>
                            <p>{!! trans('howto-poker.same_hand_ranking_comcard') !!}</p>
                            <p>{!! trans('howto-poker.same_hand_ranking_player') !!}</p>
                          </div>
                          <img src="/img/howtoplay/mobile/poker/poker_handranking_13.png" alt="playboards">
                        </div>
                      </li>
                    </ol>
                  </li>
                </ol>
              </div> {{-- // howto--layers--}}
            </div> {{-- // .howto-contents --}}
          </div> {{-- // .howto-wrap__items --}}
        </div> {{-- // .howto-wrap__items --}}

        {{-- paste here --}}
      </div> {{-- // .howto-wrap --}}
    </div> {{-- // poker-toggle--}}
    <div id="sicbo-toggle" class="howto-game"> {{--sicbo-toggle--}}
      <div id="top" class="howto-wrap howto-wrap-m dom-resizable"> {{-- .howto-wrap --}}
        <div class="scroll-position">
          <span class="scroll-button">
            <img src="/img/howtoplay/lobby/Asset 37.png" alt="scroll button">
          </span>
        </div>
        <div class="howto-wrap--accent"></div>
        <div class="howto-wrap__items clearfix -sicbo"> {{-- .howto-wrap__items --}}
          <div class="howto-submenu"> {{-- .howto-submenu --}}
            <ul class="gamerules-menu"> {{-- .gamerules-menu --}}
              <li class="gamerules-menu__items">
                <a href="#game-objective"></a>
                <span>{!! trans('howto-sicbo.gameobj_header') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#sicbo-gameplay"></a>
                <span>{!! trans('howto-sicbo.gameplay_header') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#sicbo-typesofbet"></a>
                <span>{!! trans('howto-sicbo.typesofbets_header') !!}</span>
              </li>
            </ul> {{-- // .gamerules-menu --}}
          </div> {{-- // .howto-submenu --}}

          <div id="sicbo-top" class="howto-contents custom-m-contents"> {{-- .howto-contents --}}
            <div id="game-objective" class="howto--layers"> {{-- .game-objective --}}
              {!! trans('howto-sicbo.gameobj_body-mb') !!}
            </div> {{-- // .game-objective --}}

            <div id="sicbo-gameplay" class="howto--layers"> {{-- .gameplay --}}
              <h4>{!! trans('howto-sicbo.gameplay_header') !!}</h4>

              <ul class="gameplay-list gameplay-list-m gameplay-list--2">
                {!! trans('howto-sicbo.gameplay_body-mb') !!}
              </ul>
              <p>{!! trans('howto-sicbo.gameplay_body2-mb') !!}</p>
            </div> {{-- // .gameplay --}}

            <div id="sicbo-typesofbet" class="howto--layers"> {{-- .type-of-bets --}}
              <!-- {!! trans('howto-sicbo.typesofbets_body_mb') !!} -->
              <h4 id="sicbo-typeofbets">{!! trans('howto-sicbo.typesofbets_header') !!}</h4>
              <p><img class="sicbo-img" src="/img/howtoplay/sicbo/dark/types_of_bet_figure.png" alt="types of bet figure" /></p>
              <table class="tbl--typeofbets sicbo-table-m">
                <thead>
                  <tr>
                    <th class="wager">{!! trans('howto-sicbo.type_of_bets') !!}</th>
                    <th class="desc">{!! trans('howto-sicbo.description') !!}</th>
                    <th class="payout">{!! trans('howto-sicbo.nihtan_payouts') !!}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="wager">{!! trans('howto-sicbo.big_type') !!}</td>
                    <td class="desc">{!! trans('howto-sicbo.big_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_1') !!}</td>
                  </tr>
                  <tr>
                    <td class="wager">{!! trans('howto-sicbo.small_type') !!}</td>
                    <td class="desc">{!! trans('howto-sicbo.small_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_2') !!}</td>
                  </tr>
                  <tr>
                    <td class="wager">{!! trans('howto-sicbo.odd_type') !!}</td>
                    <td class="desc">{!! trans('howto-sicbo.odd_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_3') !!}</td>
                  </tr>
                  <tr>
                    <td class="wager">{!! trans('howto-sicbo.even_type') !!}</td>
                    <td class="desc">{!! trans('howto-sicbo.even_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_4') !!}</td>
                  </tr>
                  <tr>
                    <td class="wager" rowspan="7">{!! trans('howto-sicbo.sum4_type') !!}</td>
                    <td class="desc">{!! trans('howto-sicbo.sum4_17_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_5') !!}</td>
                  </tr>
                  <tr>
                    <td class="desc">{!! trans('howto-sicbo.sum5_16_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_6') !!}</td>
                  </tr>
                  <tr>
                    <td class="desc">{!! trans('howto-sicbo.sum6_15_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_7') !!}</td>
                  </tr>
                  <tr>
                    <td class="desc">{!! trans('howto-sicbo.sum7_14_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_8') !!}</td>
                  </tr>
                  <tr>
                    <td class="desc">{!! trans('howto-sicbo.sum8_13_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_9') !!}</td>
                  </tr>
                  <tr>
                    <td class="desc">{!! trans('howto-sicbo.sum9_12_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_10') !!}</td>
                  </tr>
                  <tr>
                    <td class="desc">{!! trans('howto-sicbo.sum10_11_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_11') !!}</td>
                  </tr>
                  <tr>
                    <td class="wager">{!! trans('howto-sicbo.triple_type') !!}</td>
                    <td class="desc">{!! trans('howto-sicbo.triple_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_12') !!}</td>
                  </tr>
                  <tr>
                    <td class="wager">{!! trans('howto-sicbo.anytriple_type') !!}</td>
                    <td class="desc">{!! trans('howto-sicbo.anytriple_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_13') !!}</td>
                  </tr>
                  <tr>
                    <td class="wager">{!! trans('howto-sicbo.specificdouble_type') !!}</td>
                    <td class="desc">{!! trans('howto-sicbo.specificdouble_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_14') !!}</td>
                  </tr>
                  <tr>
                    <td class="wager">{!! trans('howto-sicbo.dicecombination_type') !!}</td>
                    <td class="desc">{!! trans('howto-sicbo.dicecombination_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_15') !!}</td>
                  </tr>
                  <tr>
                    <td class="wager">{!! trans('howto-sicbo.3-singlenumber_type') !!}</td>
                    <td class="desc">{!! trans('howto-sicbo.3-singlenumber_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_16') !!}</td>
                  </tr>
                  <tr>
                    <td class="wager" rowspan="3">{!! trans('howto-sicbo.singledicebet_type') !!}</td>
                    <td class="desc">{!! trans('howto-sicbo.singledicebet1_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_17') !!}</td>
                  </tr>
                  <tr>
                    <td class="desc">{!! trans('howto-sicbo.singledicebet2_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_18') !!}</td>
                  </tr>
                  <tr>
                    <td class="desc">{!! trans('howto-sicbo.singledicebet3_desc-mb') !!}</td>
                    <td class="payout">{!! trans('howto-sicbo.payout_19') !!}</td>
                  </tr>
                </tbody>
              </table>
            </div> {{--  //.type-of-bets --}}
          </div> {{-- // .howto-contents --}}
        </div> {{-- // .howto-wrap__items --}}

        {{-- paste here --}}
      </div> {{-- // .howto-wrap --}}
    </div> {{-- // sicbo-toggle--}}
    <div id="baccarat-toggle" class="howto-game"> {{--baccarat-toggle--}}
      <div class="howto-wrap howto-wrap-m dom-resizable"> {{-- .howto-wrap --}}
        <div class="scroll-position">
          <span class="scroll-button">
            <img src="/img/howtoplay/lobby/Asset 37.png" alt="scroll button">
          </span>
        </div>
        <div class="howto-wrap--accent"></div>
        <div class="howto-wrap__items clearfix -baccarat"> {{-- .howto-wrap__items --}}
          <div class="howto-submenu"> {{-- .howto-submenu --}}
            <ul class="gamerules-menu"> {{-- .gamerules-menu --}}
              <li class="gamerules-menu__items">
                <a href="#game-objective"></a>
                <span>{!! trans('howto-baccarat.game_objective') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#baccarat-cardvalues"></a>
                <span>{!! trans('howto-baccarat.card_values') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#baccarat-typesofbaccarat"></a>
                <span>{!! trans('howto-baccarat.types_baccarat') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#baccarat-gameplay"></a>
                <span>{!! trans('howto-baccarat.game_play') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#baccarat-cardhit"></a>
                <span>{!! trans('howto-baccarat.3_card_hit') !!}</span>
              </li>
              <!-- <li class="gamerules-menu__items">
                <a href="#baccarat-cardpositioning"></a>
                <span>{!! trans('howto-baccarat.card_positioning') !!}</span>
              </li> -->
              <li class="gamerules-menu__items">
                <a href="#baccarat-flippytable"></a>
                <span>{!! trans('howto-baccarat.flippy_table') !!}</span>
              </li>
              <li class="gamerules-menu__items">
                <a href="#baccarat-payouts"></a>
                <span>{!! trans('howto-baccarat.payouts') !!}</span>
              </li>
              <!-- <li class="gamerules-menu__items">
                <a href="#baccarat-classictable"></a>
                <span>{!! trans('howto-baccarat.classic_table') !!}</span>
              </li> -->
              <!-- <li class="gamerules-menu__items">
                <a href="#baccarat-supersixtable"></a>
                <span>{!! trans('howto-baccarat.supersix_table') !!}</span>
              </li> -->
              <!-- <li class="gamerules-menu__items">
                <a href="#baccarat-dragonbonustable"></a>
                <span>{!! trans('howto-baccarat.dragonbonus_table') !!}</span>
              </li> -->
              <!-- <li class="gamerules-menu__items">
                <a href="#baccarat-bigsmalltable"></a>
                <span>{!! trans('howto-baccarat.bigsmall_table') !!}</span>
              </li> -->
              <!-- <li class="gamerules-menu__items">
                  <a href="#baccarat-dragonbonus_win_sample"></a>
                  <span>{!! trans('howto-baccarat.dragonbonus_win_sample') !!}</span>
              </li> -->
            </ul> {{-- // .gamerules-menu --}}
          </div> {{-- // .howto-submenu --}}

          <div id="baccarat-top" class="howto-contents"> {{-- .howto-contents --}}
            <div id="game-objective" class="howto--layers"> {{--howto--layers--}}
              {!! trans('howto-baccarat.mb_game_objective_desc') !!}
            </div> {{--// owto--layers--}}
            <div id="baccarat-cardvalues" class="howto--layers "> {{--howto--layers--}}
              <h4>{!! trans('howto-baccarat.card_values') !!}</h4>
            </div> {{--// owto--layers--}}
            <div class="howto--layers card-values clearfix"> {{-- #howto--layers --}}
              <div class="card-values-con clearfix">
                <div class="card-values__items -thumb -thumb1-m">
                  <img src="/img/howtoplay/mobile/baccarat/card_value_1.png" alt="card value" />
                </div>

                <div class="card-values__items -desc">
                  <p>{!! trans('howto-baccarat.mb_card_values_1') !!}</p>
                </div>
              </div>
              <div class="card-values-con clearfix">
                <div class="card-values__items -thumb -thumb2-m">
                  <img src="/img/howtoplay/mobile/baccarat/card_value_2.png" alt="card value" />
                </div>

                <div class="card-values__items -desc">
                  <p>{!! trans('howto-baccarat.mb_card_values_2') !!}</p>
                </div>
              </div>
              <div class="card-values-con clearfix">
                <div class="card-values__items -thumb -thumb3-m">
                  <img src="/img/howtoplay/mobile/baccarat/card_value_3.png" alt="card value" />
                </div>

                <div class="card-values__items -desc">
                  <p>{!! trans('howto-baccarat.mb_card_values_3') !!}</p>
                </div>
              </div>
            </div> {{-- // #howto--layers --}}
          <div id="baccarat-typesofbaccarat" class="howto--layers gameplay-list gameplay-list-m gameplay-list-m--2"> {{--howto--layers--}}
            {!! trans('howto-baccarat.mb_game_play_list') !!}
          </div> {{--// owto--layers--}}
          <div id="baccarat-gameplay" class="howto--layers gameplay-list gameplay-list-m"> {{--howto--layers--}}
            {!! trans('howto-baccarat.mb_game_play_list_2') !!}
          </div> {{--// owto--layers--}}
          <div id="baccarat-cardhit" class="howto--layers"> {{--howto--layers--}}
            <h4>{!! trans('howto-baccarat.3_card_hit') !!}</h4>
            {!! trans('howto-baccarat.mb_3_card_hit_desc') !!}
          </div> {{--// owto--layers--}}
          <div class="howto--layers players-hand"> {{--howto--layers--}}
            <h5>{!! trans('howto-baccarat.mb_player_hand') !!}</h5>
            <table class="tbl--rules tbl--rules-m">
              <thead>
                <tr>
                  <th class="rules--card-value">{!! trans('howto-baccarat.mb_total_card_value') !!}</th>
                  <th class="rules--action">{!! trans('howto-baccarat.mb_action') !!}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{!! trans('howto-baccarat.total_card_value_1') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_action_1') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.total_card_value_2') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_action_2') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.total_card_value_3') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_action_3') !!}</td>
                </tr>
              </tbody>
            </table>
          </div> {{--// owto--layers--}}
          <div class="howto--layers bankers-hand"> {{--howto--layers--}}
            <h5>{!! trans('howto-baccarat.mb_banker_hand') !!}</h5>
            <table class="tbl--rules tbl--rules-m">
              <thead>
                <tr>
                  <th class="rules--card-value">{!! trans('howto-baccarat.mb_total_card_value') !!}</th>
                  <th colspan="2" class="rules--player-card">{!! trans('howto-baccarat.mb_player_3_card') !!}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{!! trans('howto-baccarat.banker_hand_card_value_1') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_player_3_card_hit_1') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_player_3_card_stand_1') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.banker_hand_card_value_2') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_player_3_card_hit_2') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_player_3_card_stand_2') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.banker_hand_card_value_3') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_player_3_card_hit_3') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_player_3_card_stand_3') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.banker_hand_card_value_4') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_player_3_card_hit_4') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_player_3_card_stand_4') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.banker_hand_card_value_5') !!}</td>
                  <td colspan="2">{!! trans('howto-baccarat.mb_stand') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.banker_hand_card_value_6') !!}</td>
                  <td colspan="2">{!! trans('howto-baccarat.mb_natural_hit') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.banker_hand_card_value_7') !!}</td>
                  <td colspan="2">{!! trans('howto-baccarat.mb_hit') !!}</td>
                </tr>
              </tbody>
            </table>
          </div> {{--// owto--layers--}}

          <div id="baccarat-flippytable" class="howto--layers"> {{--howto--layers--}}
            <h4>{!! trans('howto-baccarat.flippy_table') !!}</h4>
            {!! trans('howto-baccarat.flippy_table_desc1') !!}
            <table class="tbl--rules tbl--rules-m">
              <thead>
                <tr>
                  <th class="rules--card-value">{!! trans('howto-baccarat.mb_action') !!}</th>
                  <th class="rules--action">{!! trans('howto-baccarat.mb_time_peek') !!}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_flippy_action_1') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_time_peek_1') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_flippy_action_2') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_time_peek_2') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_flippy_action_3') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_time_peek_3') !!}</td>
                </tr>
              </tbody>
            </table>
            {!! trans('howto-baccarat.flippy_table_desc2') !!}
            <img src="/img/howtoplay/baccarat/dark/flippy_box.png" alt="card value" class="flippy_box" />
          </div> {{--// owto--layers--}}

          <div id="baccarat-payouts" class="howto--layers"> {{--howto--layers--}}
            <h4>{!! trans('howto-baccarat.payouts') !!}</h4>
            <h5>{!! trans('howto-baccarat.classic_table') !!}</h5>
            <table class="tbl--rules tbl--rules-m">
              <thead>
                <tr>
                  <th class="rules--card-value">{!! trans('howto-baccarat.mb_bet_on') !!}</th>
                  <th class="rules--action">{!! trans('howto-baccarat.mb_payout') !!}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_classic_beton_1') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_classic_result_1') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_classic_beton_2') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_classic_result_2') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_classic_beton_3') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_classic_result_3') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_classic_beton_4') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_classic_result_4') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_classic_beton_5') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_classic_result_5') !!}</td>
                </tr>
              </tbody>
            </table>

            <h5>{!! trans('howto-baccarat.supersix_table') !!}</h5>
            <table class="tbl--rules tbl--rules-m">
              <thead>
                <tr>
                  <th class="rules--card-value">{!! trans('howto-baccarat.mb_bet_on') !!}</th>
                  <th class="rules--action">{!! trans('howto-baccarat.mb_payout') !!}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_supersix_beton_1') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_supersix_result_1') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_supersix_beton_2') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_supersix_result_2') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_supersix_beton_3') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_supersix_result_3') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_supersix_beton_4') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_supersix_result_4') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_supersix_beton_5') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_supersix_result_5') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_supersix_beton_6') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_supersix_result_6') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_supersix_beton_7') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_supersix_result_7') !!}</td>
                </tr>
              </tbody>
            </table>

            {{-- <h5>{!! trans('howto-baccarat.dragonbonus_table') !!}</h5>
            <table class="tbl--rules tbl--rules-m">
              <thead>
                <tr>
                  <th class="rules--card-value">{!! trans('howto-baccarat.mb_bet_on') !!}</th>
                  <th class="rules--action">{!! trans('howto-baccarat.mb_payout') !!}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_dragonbonus_beton_1') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_dragonbonus_result_1') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_dragonbonus_beton_2') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_dragonbonus_result_2') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_dragonbonus_beton_3') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_dragonbonus_result_3') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_dragonbonus_beton_4') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_dragonbonus_result_4') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_dragonbonus_beton_5') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_dragonbonus_result_5') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_dragonbonus_beton_6') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_dragonbonus_result_6') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_dragonbonus_beton_7') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_dragonbonus_result_7') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_dragonbonus_beton_8') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_dragonbonus_result_8') !!}</td>
                </tr>
              </tbody>
            </table>

            <h5>{!! trans('howto-baccarat.bigsmall_table') !!}</h5>
            <table class="tbl--rules tbl--rules-m">
              <thead>
                <tr>
                  <th class="rules--card-value">{!! trans('howto-baccarat.mb_bet_on') !!}</th>
                  <th class="rules--action">{!! trans('howto-baccarat.mb_payout') !!}</th>
                  <th class="rules--action">{!! trans('howto-baccarat.mb_condition') !!}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_bigsmall_beton_1') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_bigsmall_result_1') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_bigsmall_condition_1') !!}</td>
                </tr>
                <tr>
                  <td>{!! trans('howto-baccarat.mb_bigsmall_beton_2') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_bigsmall_result_2') !!}</td>
                  <td>{!! trans('howto-baccarat.mb_bigsmall_condition_2') !!}</td>
                </tr>
              </tbody>
            </table>

            <h5>{!! trans('howto-baccarat.dragonbonus_win_sample') !!}</h5>
            <ol class="dragonbonus_sample">
              <li>
                <p>{!! trans('howto-baccarat.mb_win_natural_banker_bonus') !!}</p>
                <div class="card-positioning__items clearfix">
                  <div class="card-positioning-inner"><img src="/img/howtoplay/baccarat/dark/db_banker1.png" alt="db_banker" /></div>
                  <div class="card-positioning-lbl"><span>{!! trans('howto-baccarat.bonus_sample_banker') !!}</span></div>
                </div>
                <div class="card-positioning__items clearfix">
                  <div class="card-positioning-inner"><img src="/img/howtoplay/baccarat/dark/db_player1.png" class="db_player" alt="db_player" /></div>
                  <div class="card-positioning-lbl"><span>{!! trans('howto-baccarat.bonus_sample_player') !!}</span></div>
                </div>
              </li>
              <li>
                <p>{!! trans('howto-baccarat.mb_win_by_8') !!}</p>
                <ul>
                  <li><p>{!! trans('howto-baccarat.mb_win_by_8_desc1') !!}</p></li>
                  <li><p>{!! trans('howto-baccarat.mb_win_by_8_desc2') !!}</p></li>
                </ul>
                <div class="card-positioning__items clearfix">
                  <div class="card-positioning-inner">
                    <img src="/img/howtoplay/baccarat/dark/db_banker2.png" alt="db_banker" />
                  </div>
                  <div class="card-positioning-lbl">
                    <span>{!! trans('howto-baccarat.bonus_sample_banker') !!}</span>
                  </div>
                </div>
                <div class="card-positioning__items clearfix">
                  <div class="card-positioning-inner">
                    <img src="/img/howtoplay/baccarat/dark/db_player2.png" class="db_player" alt="db_player" />
                  </div>
                  <div class="card-positioning-lbl">
                    <span>{!! trans('howto-baccarat.bonus_sample_player') !!}</span>
                  </div>
                </div>
              </li>
              <li>
                <p>{!! trans('howto-baccarat.mb_win_by_less_4') !!}</p>
                <ul>
                  <li><p>{!! trans('howto-baccarat.mb_win_by_less_4_desc1') !!}</p></li>
                  <li><p>{!! trans('howto-baccarat.mb_win_by_less_4_desc2') !!}</p></li>
                </ul>
                <div class="card-positioning__items clearfix">
                  <div class="card-positioning-inner">
                    <img src="/img/howtoplay/baccarat/dark/db_banker3.png" alt="db_banker" />
                  </div>
                  <div class="card-positioning-lbl">
                    <span>{!! trans('howto-baccarat.bonus_sample_banker') !!}</span>
                  </div>
                </div>
                <div class="card-positioning__items clearfix last-items">
                  <div class="card-positioning-inner">
                    <img src="/img/howtoplay/baccarat/dark/db_player3.png" class="db_player" alt="db_player" />
                  </div>
                  <div class="card-positioning-lbl">
                    <span>{!! trans('howto-baccarat.bonus_sample_player') !!}</span>
                  </div>
                </div>
              </li>
            </ol> --}}
          </div> {{--// howto--layers--}}
        </div> {{-- // .howto-contents --}}
        </div> {{-- // .howto-wrap__items --}}
        {{-- paste here --}}
      </div> {{-- // .howto-wrap --}}
    </div> {{-- // baccarat-toggle--}}

    <!-- do not touch font hack-->
    <span style="font-family: ArvoBold, ArvoItalic, ArvoRegular, helvetica"></span>
    <span style="font-family: ArvoItalic, helvetica"></span>
    <span style="font-family: ArvoRegular, helvetica"></span>
    <span style="font-family: lato, helvetica"></span>
    <span style="font-family: BebasNeue, helvetica"></span>
    <span style="font-family: latobold, helvetica"></span>
    <span style="font-family: latoRegular, helvetica"></span>
    <span style="font-family: latoBlack, helvetica"></span>

    <!-- 1024X768 -->
    <canvas id="lobby" width="1280px" height="0"></canvas>
    {{-- <canvas id="header" width="1280px" height="200px"></canvas> --}}
    <div class="lobby-main-container">
      <div class="reelgames-container">
        <div class ="reelgames-list all"></div>
        <div class ="reelgames-list kagaming"></div>
        <div class ="reelgames-list betsoft"></div>
      </div>
      <canvas id = "lobby-content"></canvas>
    </div>
    <div class="tables-container bc-tables" hidden></div>
    <div class="tables-container sb-tables" hidden></div>
    <div class="tables-container dt-tables" hidden></div>
    <div class="tables-container poker-tables" hidden></div>
    <div class="tables-container pg-tables" hidden></div>
    <div class="tables-container ub-tables" hidden>
      <div class="ub-game"></div>
      <div class="ub-room"></div>
    </div>

    <canvas id = "lobby-announcement" width="1900px" style="display: none"></canvas>

    <div class="popup-mb-container" hidden>
      <div id="popup-createroom" class="createroom-wrap -mb" hidden> {{--popup-createroom--}}
        <div class="createroom__head">
          <span>{{trans('ingame.create_room')}}</span>
        </div>
        <div class="createroom__body">
          <div class="createroom__items">
            <div class="createroom-con"> {{--createroom-con--}}
              <h4>{{trans('ingame.room_name')}}</h4>
              {{-- <div class="dropdown-con">
                <span data-value=""></span>
                <i class="ico-arrow"></i>
                <ul class="dropdown-list">
                  <li>Main UsName01</li>
                  <li>04 Main UsName01</li>
                  <li>04 Main UsName</li>
                  <li class="customizename">Customize</li>
                </ul>
              </div> --}}

              <form class="" autocomplete="false" method="post">
                <div class="createroom-input-con">
                  <input id="roomname" type="text" class="room-name" name="roomname" value="" maxlength="15" placeholder="{{trans('ingame.room_name')}}" required>
                  <i id="checkname"></i>
                </div>
                  <input type="hidden" id="roomid" name="" value="">
              </form>

            </div> {{-- // createroom-con--}}
            <div class="createroom-con"> {{--createroom-con--}}
              <h4>{{trans('ingame.num_players')}}</h4>
              <div class="createroom__boxcon">
                <i class="numplayers ico-minus"></i>
                <label class="numplayers--val" data-value="10">10</label>
                <i class="numplayers ico-plus"></i>
              </div>
            </div> {{-- // createroom-con--}}
            <div class="createroom-con"> {{--createroom-con--}}
              <h4>{{trans('ingame.make_private')}}</h4>
              <div class="createroom__boxcon ">
                <div class="radio-con -makeprivate"> {{--radio-con--}}
                  <div class="radio-btn">
                    <i><input type="radio" name="is_private" value="true" class="radio-private input-radio"/></i>
                  </div>
                  <span>{{trans('ingame.yes')}}</span>
                </div> {{-- // radio-con--}}
                <div class="radio-con -makeprivate"> {{--radio-con--}}
                  <div class="radio-btn checkedRadio">
                    <i><input type="radio" name="is_public"  value="false" class="radio-private input-radio" checked="checked"/></i>
                  </div>
                  <span>{{trans('ingame.no')}}</span>
                </div> {{-- // radio-con--}}
              </div>
            </div> {{-- // createroom-con--}}

            <div class="createroom__boxcon -password">
              <div class="createroom-input-con -password">
                <input type="password" name="password" value="" minlength="4" maxlength="4" placeholder="{{trans('ingame.password')}}" id="roompass">
                <i id="checkpass"></i>
              </div>
              <p>Must contain 4 characters</p>
            </div>
          </div>
          <div class="createroom__items">
            <div class="createroom-con"> {{--createroom-con--}}
              <h4>{{trans('ingame.bet_range')}}</h4>
              <div class="createroom__boxcon -capital">

              </div>
            </div> {{-- // createroom-con--}}

            <div class="createroom-con">
              <button id="createroom_submit" class="btn-createroom btn--create" type="button" name="button">
                <span>{{trans('ingame.create_room')}}</span>
              </button>
              <button id="createroom_cancel" class="btn-createroom btn--cancel" type="button" name="button">
                <span>{{trans('ingame.cancel')}}</span>
              </button>
            </div>

          </div>
        </div>
      </div> {{-- // popup-createroom--}}

      <div id="popup-verification" class="verification-wrap -mb" hidden> {{--popup-verification--}}
        <div class="verification__head">
          <span>{{trans('ingame.private_verification')}}</span>
        </div>
        <div class="verification__body">
          <div class="popup-con">
            <h4>{{trans('ingame.input_room_pass')}}</h4>
            <input type="password" name="" value="" placeholder="{{trans('ingame.password')}}" id="joinpass" maxlength="4">
            <input type="password" name="" value="" id="targetuser">
            <p class="error-text">{{trans('ingame.pass_incorrect')}}</p>
          </div>
          <div class="popup-con button-con">
            <button id="verification-cancel" type="button" name="button" class="btn-verification btn--cancel"><span>{{trans('ingame.cancel')}}</span></button>
            <button  type="button" name="button" id="privatejoin" class="btn-verification btn--join"><span>{!! trans('ingame.join') !!}</span></button>
          </div>
        </div>
      </div> {{-- // popup-verification--}}

      <div id="popup-failed" class="popup-error-wrap -mb" hidden>
        <div class="popup-error-con">
          <i class="ico-error"></i>
          <h4>{{trans('ingame.room_failed_msg')}}</h4>
        </div>
        <div class="pop-failed-btn">
          <button type="button" name="button" class="btn-failed"><span>OK</span></button>
        </div>
      </div> {{-- // popup-failed--}}

      <div id="popup-logout" class="popup-fullscreen">
        <div class="popup-body-con">
          <img src="/img/confirmation/nihtan-yellow_logo.png" alt="">
          {{-- <p>This page will be displayed on full screen.</p> --}}
          <p id="logout-msg">{{trans('ingame.redirectcasino')}}</p>
        </div>
        <div class="popup-btn-con">
          {{-- <button id="gofullscreen" type="button" name="button" class="btn-yes"><span>OK</span></button> --}}
          <button  id="logout-no" type="button" name="button" class="btn-no"><span>{{trans('ingame.promptnocaps')}}</span></button>
          <button id="logout-yes" type="button" name="button" class="btn-yes"><span>{{trans('ingame.promptyescaps')}}</span></button>
        </div>
      </div>
    </div>

    <div class="notification-container"></div>

    <div class="ka-wrap "> {{--ka-wrap--}}
      <div class="ka-inner "> {{--ka-inner--}}
        <div class="ka-prompt-reel dom-resizable">
          <div class="ka-prompt-con">
            <img src="/img/reel_popup.png" alt="reel-popup">
            <p>{!! trans('ingame.promptnoreel') !!}</p>
          </div>
          <div class="ka-prompt-btn-reel">
            <span>OK</span>
          </div>
        </div>
      </div> {{-- // ka-inner--}}
    </div> {{-- // ka-wrap--}}

    <div class="announcement -mb dom-resizable"> {{--annopuncement--}}
      <div class="announcement__ico"><i class="ico-nihtan"></i></div>
      <div class="announcement__msg">
        <div>
          <span id="announcement-text"></span>
        </div>
      </div>
    </div> {{-- // annopuncement--}}

    <div class="maintenanceOverlay -mb">
      <div class="maintenanceBg"></div>
      <div class="nihtanLogo"></div>
      <div class="patternLeft"></div>
      <div class="patternRight"></div>
      <div class="maintenanceLogo"></div>
      <div class="mainText">We're trying to serve you better!</div>
      <div class="subText">Regular Maintenance</div>
      <div class="schedule"></div>
    </div>
  </div> {{-- // container--}}
</body>
<script type="text/javascript">
  var stage1 = null;
  var stage2 = null;

  var sicbo_c = [];
  var poker_c = [];
  var dragontiger_c = [];

  var header_c = null;

  var toggle = {};
  var __global = {};




    var resize = function (newWidth, newHeight) {

        let container = document.getElementById("SUPER-CONTAINER");
        container.style.transform = "scale(" + (newWidth / 1280) + ") ";

    }
    resize(window.innerWidth, window.innerHeight);
</script>
<script type="text/javascript" src="/osmf/swfobject.min.js"></script>
<script type="text/javascript" src ="/dist/main.js"></script>
<!-- <script type="text/javascript" src="/dist/lobby-mobile.min.js"></script>
<script type="text/javascript" src="/dist/lobby-mobile-content.min.js"></script> -->

<script type="text/javascript" src="/js/dom-events-mobile.js"></script>
<!-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js"></script> -->
<script type="text/javascript">
  $(document).ready(function() {
    // scroll-buton show
    $('.howto-contents').scroll(function() {
      if ($(this).scrollTop() > 100 ) {
        $('.scroll-button').fadeIn();
      } else {
        $('.scroll-button').fadeOut();
      }
    });

    //scroll-button click
    $('.scroll-button').click(function() {// When arrow is clicked
      $('.howto-contents').animate({
        scrollTop : 0  // Scroll to top of body
      }, 500);
    });

  });

  // if(parseInt(JSON.parse(window.maintenance).status)) {
  //   $(".maintenanceOverlay").show();
  // }

  window.finished_load  = false;
  // announcement = new createjs.Stage('lobby-announcement');

  // $(".tables-container.bc-tables").on("scroll", function() {
  //     if(!createjs.Ticker.paused)  {
  //         console.log("scroll stop ticker")
  //         createjs.Ticker.paused = true;
  //     }
  // })

  //  $.fn.scrollEnd = function(callback, timeout) {
  //   $(this).scroll(function(){
  //     var $this = $(this);
  //     if ($this.data('scrollTimeout')) {
  //       clearTimeout($this.data('scrollTimeout'));
  //     }
  //     $this.data('scrollTimeout', setTimeout(callback,timeout));
  //   });
  // };

  // $(".tables-container.bc-tables").scrollEnd(function(){
  //     console.log("scroll start ticker")
  //     createjs.Ticker.paused = false;
  // },500);

  // createjs.Ticker.framerate = 60;
  // createjs.Ticker.addEventListener("tick",function (e) {
  //     // if(window.finished_load) {
  //         if(e.paused) return;

  //         if(stage2) stage2.update(e)
  //         if(stage1) stage1.update(e);
  //         if(header_c) header_c.update(e);
  //         announcement.update(e);


  //         for(var x = 0; x < baccarat_c.length;x++){
  //             baccarat_c[x].update()
  //         }

  //         if(sicbo_c.length) {
  //             for(var x = 0; x < sicbo_c.length;x++){
  //                 sicbo_c[x].update(e)
  //             }
  //         }

  //         if(poker_c.length) {
  //             for(var x = 0; x < poker_c.length;x++){
  //                 poker_c[x].update(e)
  //             }
  //         }

  //         if(dragontiger_c.length) {
  //             for(var x = 0; x < dragontiger_c.length;x++){
  //                 dragontiger_c[x].update(e)
  //             }
  //         }
  //     // }
  // });

</script>

<script>
  // web parallax
  $(document).mousemove(function(e){
    var posX = e.pageX / $(this).width() * 100 - 50;
    var posY = e.pageY / $(this).height() * 100 - 50;
    var tiltAmount = .9;
    $('.wrapper--inner').css({
      'transform': 'translate(-50%, -50%) perspective(500px) rotateY('+ tiltAmount * posX+'deg ) rotateX( '+ tiltAmount * posY * -1+'deg )'
    })
  });

  // mobile parallax
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    var origX, origY;
    var tiltAmount_mb = .8;

    function origOrientation(event) {
      origX = event.gamma;
      origY = event.beta;
      window.removeEventListener('deviceorientation', origOrientation);
    }
    window.addEventListener('deviceorientation', origOrientation);

    function handleOrientation(event) {
      var x = origX - event.gamma;
      var y = origY - event.beta;

      $('.card').css({
        'transform': 'perspective(400px) rotateY( '+ (y * tiltAmount_mb) * -1 +'deg ) rotateX( '+ x * tiltAmount_mb +'deg)'
      });
    }
      window.addEventListener('deviceorientation', handleOrientation);
  }

  document.addEventListener("touchstart", function(){}, true)

</script>

</html>
