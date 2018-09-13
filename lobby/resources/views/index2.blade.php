<!DOCTYPE html>
<html>
<head>
  <title>LOBBY</title>
  <link href="https://fonts.googleapis.com/css?family=Arvo:400,700,700i" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
  <link rel="stylesheet" href="/fonts/font-awesome.min.css">
  <link rel="stylesheet" href="/css/app.css">

  <script src="/js/createjs/createjs-2015.11.26.min.js"></script>
  <script src="/js/createjs/easeljs-0.8.2.min.js"></script>
  <script src="/js/createjs/tweenjs-0.6.2.min.js"></script>
  <script src="/js/createjs/soundjs-0.6.2.min.js"></script>
  <script src="/js/createjs/preloadjs-0.6.2.min.js"></script>

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

    window.theme = "black";
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
    window.userType =  '{{Auth::user()->user_type}}';
    window.userId =  {{Auth::user()->id}};
    window.userAuthority = '{{Auth::user()->authority == "a" ? "admin" : "user" }}';
    window.casino = @if($currency == 'KRW' || $currency == 'THB') 'N' @else 'SS' @endif;
    window.vendor_id = {{ $vendor->id }};
    window.vendor_type = '{{ $vendor->deployment_type }}';
    window.reel_yn = {{ $vendor->reel_yn }};
    window.room_info = {{ $vendor->room_info_yn }};
    window.mainMultiplier = {!! $mainMultiplier !!};
    window.is_room = {{ $vendor->is_room }};
    window.game_settings = {!! $gameSetting !!};

    window.bcSetting =  {!! $baccaratBetSetting !!};

    window.language = {
      locale: '{{ App::getLocale() }}',
      menu: {
        exit				        : '{{ trans('ingame.exit') }}',
        fullscreen			    : '{{ trans('ingame.fullscreen') }}',
        howtoplay			      : '{{ trans('ingame.howtoplay') }}',
        refreshvideo		    : '{{ trans('ingame.refreshvideo') }}',
        playerinfo			    : '{{ trans('ingame.playerinfo') }}',
        records				      : '{{ trans('ingame.records') }}',
        transfer			      : '{{ trans('ingame.transfer') }}',
        modifychips			    : '{{ trans('ingame.modifychips') }}',
        multiplayer			    : '{{ trans('ingame.multiplayer') }}',
        singleplayer		    : '{{ trans('ingame.singleplayer') }}',
        settings			      : '{{ trans('ingame.settings') }}',
        cashin			        : '{{ trans('ingame.cashin') }}',
        cashout			        : '{{ trans('ingame.cashout') }}',

        playerinfocaps 		  : '{{ trans('ingame.playerinfocaps') }}',
        playername 			    : '{{ trans('ingame.playername') }}',
        playerbalance 		  : '{{ trans('ingame.playerbalance') }}',
        roundid 			      : '{{ trans('ingame.roundid') }}',
        dealernamecaps 		  : '{{ trans('ingame.dealernamecaps') }}',
        channelcaps			    : '{{ trans('ingame.channelcaps') }}',
        dealercaps 			    : '{{ trans('ingame.dealercaps') }}',

        howtoplaycaps 		  : '{{ trans('ingame.howtoplaycaps') }}',
        gamerules 			    : '{{ trans('ingame.gamerules') }}',
        gameplaytutorial	  : '{{ trans('ingame.gameplaytutorial') }}',

        recordscaps 		    : '{{ trans('ingame.recordscaps') }}',
        transferlogscaps	  : '{{ trans('ingame.transferlogscaps') }}',
        datecaps			      : '{{ trans('ingame.datecaps') }}',
        typecaps 			      : '{{ trans('ingame.typecaps') }}',
        oldcreditcaps 		  : '{{ trans('ingame.oldcreditcaps') }}',
        transferamountcaps	: '{{ trans('ingame.transferamountcaps') }}',
        newcreditcaps 		  : '{{ trans('ingame.newcreditcaps') }}',
        ipcaps 				      : '{{ trans('ingame.ipcaps') }}',
        countrycaps			    : '{{ trans('ingame.countrycaps') }}',
        gametypecaps     : '{{ trans('ingame.gametypecaps') }}',

        betlogscaps 		    : '{{ trans('ingame.betlogscaps') }}',
        gamenocaps 			    : '{{ trans('ingame.gamenocaps') }}',
        tablecaps			      : '{{ trans('ingame.tablecaps') }}',
        roomcaps 			      : '{{ trans('ingame.roomcaps') }}',
        startingcreditcaps 	: '{{ trans('ingame.startingcreditcaps') }}',
        totalbetcaps		    : '{{ trans('ingame.totalbetcaps') }}',
        totalwinningscaps 	: '{{ trans('ingame.totalwinningscaps') }}',
        resultcaps 			    : '{{ trans('ingame.resultcaps') }}',
        betscaps 			      : '{{ trans('ingame.betscaps') }}',
        winningresultcaps 	: '{{ trans('ingame.winningresultcaps') }}',
        wincaps 			      : '{{ trans('ingame.wincaps') }}',
        losecaps 			      : '{{ trans('ingame.losecaps') }}',
        betcaps 			      : '{{ trans('ingame.betcaps') }}',
        payoutcaps 			    : '{{ trans('ingame.payoutcaps') }}',
        bettypecaps         : '{{ trans('ingame.bettypecaps') }}',
        bonussmall          : '{{ trans('ingame.bonussmall') }}',
        normalsmall         : '{{ trans('ingame.normalsmall') }}',
        freeplay            : '{{ trans('ingame.freeplay') }}',

        gamehistorycaps 	  : '{{ trans('ingame.gamehistorycaps') }}',

        transferfundscaps 	: '{{ trans('ingame.transferfundscaps') }}',
        enteramount 		    : '{{ trans('ingame.enteramount') }}',
        availablebalance	  : '{{ trans('ingame.availablebalance') }}',
        transfercaps 		    : '{{ trans('ingame.transfercaps') }}',

        modifychipscaps 	  : '{{ trans('ingame.modifychipscaps') }}',
        changechipshere 	  : '{{ trans('ingame.changechipshere') }}',
        applynowcaps		    : '{{ trans('ingame.applynowcaps') }}',
        clearchipscaps 		  : '{{ trans('ingame.clearchipscaps') }}',

        settingscaps 		    : '{{ trans('ingame.settingscaps') }}',
        mastervolume 		    : '{{ trans('ingame.mastervolume') }}',
        soundeffects		    : '{{ trans('ingame.soundeffects') }}',
        voice 				      : '{{ trans('ingame.voice') }}',
        darktheme			      : '{{ trans('ingame.darktheme') }}',
        showtutorial 		    : '{{ trans('ingame.showtutorial') }}',

        nodata 				      : '{{ trans('ingame.nodata') }}'
      },
      channel: {
        channel 			: '{{ trans('ingame.channel') }}',
        bet 				  : '{{ trans('ingame.bet') }}'
      },
      bet_details: {
        winningscaps 		: '{{ trans('ingame.winningscaps') }}'
      },
      player_info: {
        win 				: '{{ trans('ingame.win') }}',
        lose 				: '{{ trans('ingame.lose') }}'
      },
      statistics: {
        autobetcaps 		  : '{{ trans('ingame.autobetcaps') }}',
        whitecaps 			  : '{{ trans('ingame.whitecaps') }}',
        redcaps 			    : '{{ trans('ingame.redcaps') }}',
        gamestatscaps 		: '{{ trans('ingame.gamestatscaps') }}',
        statscaps 			  : '{{ trans('ingame.statscaps') }}',
        livebetscaps 		  : '{{ trans('ingame.livebetscaps') }}',
        playerscaps 		  : '{{ trans('ingame.playerscaps') }}',
        last150results 		: '{{ trans('ingame.last150results') }}',
      },
      advanced_bet: {
        advancebetcaps 		  : '{{ trans('ingame.advancebetcaps') }}',
        advancebettingcaps 	: '{{ trans('ingame.advancebettingcaps') }}',
        rounds 				      : '{{ trans('ingame.rounds') }}',
        customcaps 			    : '{{ trans('ingame.customcaps') }}',
        oddcaps 			      : '{{ trans('ingame.oddcaps') }}',
        evencaps 			      : '{{ trans('ingame.evencaps') }}',

        msgmain 			      : '{{ trans('ingame.msgmain') }}',
        msgplacebets 		    : '{{ trans('ingame.msgplacebets') }}',
        msgminimum 			    : '{{ trans('ingame.msgminimum') }}',
        msgcustom 			    : '{{ trans('ingame.msgcustom') }}',

        msgodd 				      : '{{ trans('ingame.msgodd') }}',
        msgeven 			      : '{{ trans('ingame.msgeven') }}',
        msgselectrounds 	  : '{{ trans('ingame.msgselectrounds') }}',
        msgconfirm 			    : '{{ trans('ingame.msgconfirm') }}',
        msgcondition1 		  : '{{ trans('ingame.msgcondition1') }}',
        msgcondition2 		  : '{{ trans('ingame.msgcondition2') }}',
        msgcondition3 		  : '{{ trans('ingame.msgcondition3') }}',
        msgwait 			      : '{{ trans('ingame.msgwait') }}',
        msgoddplaced 		    : '{{ trans('ingame.msgoddplaced') }}',
        msgevenplaced 		  : '{{ trans('ingame.msgevenplaced') }}',
        msgclear 			      : '{{ trans('ingame.msgclear') }}',
        msgbalance 			    : '{{ trans('ingame.msgbalance') }}',
        msgbetsconfirmed 	  : '{{ trans('ingame.msgbetsconfirmed') }}',
        msgremaining 		    : '{{ trans('ingame.msgremaining') }}',
        msgwin 				      : '{{ trans('ingame.msgwin') }}',
        msgcancelling 		  : '{{ trans('ingame.msgcancelling') }}',
        msgallbetsdone 		  : '{{ trans('ingame.msgallbetsdone') }}',
        msgfunds 			      : '{{ trans('ingame.msgfunds') }}'
      },
      game_buttons: {
        confirmcaps 		: '{{ trans('ingame.confirmcaps') }}',
        clearcaps 			: '{{ trans('ingame.clearcaps') }}',
        repeatcaps 			: '{{ trans('ingame.repeatcaps') }}',
        undocaps 			  : '{{ trans('ingame.undocaps') }}'
      },
      prompts: {
        promptnobets      : '{{ trans('ingame.promptnobets') }}',
        promptdealer      : '{{ trans('ingame.promptdealer') }}',
        promptmaxbet      : '{{ trans('ingame.promptmaxbet') }}',
        promptminbet      : '{{ trans('ingame.promptminbet') }}',
        promptshoechange  : '{{ trans('ingame.promptshoechange') }}',
        promptshuffling   : '{{ trans('ingame.promptshuffling') }}',
        promptmaintenance : '{{ trans('ingame.promptmaintenance') }}',
        promptlanguage    : '{{ trans('ingame.promptlanguage') }}',
        prompttheme       : '{{ trans('ingame.prompttheme') }}',
        promptrefresh     : '{{ trans('ingame.promptrefresh') }}',
        promptyes         : '{{ trans('ingame.promptyes') }}',
        promptcancel      : '{{ trans('ingame.promptcancel') }}',

        promptplacebets   : '{{ trans('ingame.promptplacebets') }}',
        promptactivated   : '{{ trans('ingame.promptactivated') }}',
        promptcancelauto  : '{{ trans('ingame.promptcancelauto') }}',
        promptcancelbets  : '{{ trans('ingame.promptcancelbets') }}',
        promptautoactive  : '{{ trans('ingame.promptautoactive') }}',
        promptnoreel      : '{{ trans('ingame.promptnoreel') }}',
      },
      level:{
        vip       : '{{ trans('ingame.vip') }}',
        premium   : '{{ trans('ingame.premium') }}',
        normal    : '{{ trans('ingame.normal') }}',
        flippy    : '{{ trans('ingame.flippy') }}',
        supersix  : '{{ trans('ingame.supersix') }}',
        bonusplus : '{{ trans('ingame.lobby_bonusplus') }}'
      },
      modal: {
        exitnihtancaps 		: '{{ trans('ingame.exitnihtancaps') }}',
        redirectcasino 		: '{{ trans('ingame.redirectcasino') }}',
        redirectcontinue 	: '{{ trans('ingame.redirectcontinue') }}',
        promptyescaps 		: '{{ trans('ingame.promptyescaps') }}',
        promptnocaps 		  : '{{ trans('ingame.promptnocaps') }}',
      },
      lobby: {
        bonusdragoncaps   : '{{ trans('ingame.bonusdragoncaps') }}',
        bonuspokercaps    : '{{ trans('ingame.bonuspokercaps') }}',
        pluspokercaps     : '{{ trans('ingame.pluspokercaps') }}',
        supercaps         : '{{ trans('ingame.supercaps') }}',
        sixcaps           : '{{ trans('ingame.sixcaps') }}',

        livegamescaps 		: '{{ trans('ingame.livegamescaps') }}',
        themedgamescaps 	: '{{ trans('ingame.themedgamescaps') }}',
        reelgamescaps 		: '{{ trans('ingame.reelgamescaps') }}',
        tablegamescaps 		: '{{ trans('ingame.tablegamescaps') }}',
        hotlivecaps 		  : '{{ trans('ingame.hotlivecaps') }}',
        comingsooncaps 		: '{{ trans('ingame.comingsooncaps') }}',
        newgamecaps	 		  : '{{ trans('ingame.newgamecaps') }}',
        sooncaps          : '{{ trans('ingame.sooncaps') }}',
        newcaps           : '{{ trans('ingame.newcaps') }}',

        livecaps 			    : '{{ trans('ingame.livecaps') }}',
        themedcaps 			  : '{{ trans('ingame.themedcaps') }}',
        reelcaps 			    : '{{ trans('ingame.reelcaps') }}',
        bethistorycaps 		: '{{ trans('ingame.bethistorycaps') }}',
        transactioncaps 	: '{{ trans('ingame.transactioncaps') }}',
        howtoplaycaps 		: '{{ trans('ingame.howtoplaycaps') }}',

        baccarat 			    : '{{ trans('ingame.baccarat') }}',
        dragontiger 		  : '{{ trans('ingame.dragontiger') }}',
        poker 				    : '{{ trans('ingame.poker') }}',
        texas 				    : "{!! trans('ingame.texas') !!}",
        sicbo 				    : '{{ trans('ingame.sicbo') }}',
        roulette 			    : '{{ trans('ingame.roulette') }}',
        redwhite 			    : '{{ trans('ingame.redwhite') }}',
        spinwin 			    : "{!! trans('ingame.spinwin') !!}",
        paigow            : '{{ trans('ingame.paigow') }}',

        kagamingreel 		  : '{!! trans('ingame.kagamingreel') !!}',
        betsoftreel 		  : '{!! trans('ingame.betsoftreel') !!}',

        kagamingreelcaps 	: '{!! trans('ingame.kagamingreelcaps') !!}',
        betsoftreelcaps 	: '{!! trans('ingame.betsoftreelcaps') !!}',

        dragoncaps 			  : '{{ trans('ingame.dragoncaps') }}',
        tigercaps 			  : '{{ trans('ingame.tigercaps') }}',
        reelcaps 			    : '{{ trans('ingame.reelcaps') }}',
        gamescaps 			  : '{{ trans('ingame.gamescaps') }}',
        spincaps 			    : '{{ trans('ingame.spincaps') }}',
        ncaps 				    : '{{ trans('ingame.ncaps') }}',

        dragon 				    : '{{ trans('ingame.dragon') }}',
        tiger 				    : '{{ trans('ingame.tiger') }}',

        baccaratcaps 		  : '{{ trans('ingame.baccaratcaps') }}',
        supersixcaps 		  : '{{ trans('ingame.supersixcaps') }}',
        dragontigercaps 	: '{{ trans('ingame.dragontigercaps') }}',
        pokercaps 			  : '{{ trans('ingame.pokercaps') }}',
        bonuspluscaps 		: '{{ trans('ingame.bonuspluscaps') }}',
        dragonbonuscaps   : '{{ trans('ingame.dragonbonuscaps') }}',
        texascaps			    : "{!! trans('ingame.texascaps') !!}",
        sicbocaps 			  : '{{ trans('ingame.sicbocaps') }}',
        roulettecaps 		  : '{{ trans('ingame.roulettecaps') }}',
        redwhitecaps 		  : '{{ trans('ingame.redwhitecaps') }}',
        spinwincaps			  : "{!! trans('ingame.spinwincaps') !!}",
        bonusbaccaratcaps : "{!! trans('ingame.bonusbaccaratcaps') !!}",
        paigowcaps        : '{{ trans('ingame.paigowcaps') }}',

        allgamescaps 		  : '{{ trans('ingame.allgamescaps') }}',
        hotgamescaps 		  : '{{ trans('ingame.hotgamescaps') }}',
        entercaps 			  : '{{ trans('ingame.entercaps') }}',
        singleplayercaps 	: '{{ trans('ingame.singleplayercaps') }}',

        gamecaps 			    : '{{ trans('ingame.gamecaps') }}',
        gameroutecaps 	  : '{{ trans('ingame.gameroutecaps') }}',
        last5roundscaps   : '{{ trans('ingame.last5roundscaps') }}',
        roadmapcaps       : '{{ trans('ingame.roadmapcaps') }}',

        playnow 			    : '{{ trans('ingame.playnow') }}',
        nowbetting 			  : '{{ trans('ingame.nowbetting') }}',
        bettingend 			  : '{{ trans('ingame.bettingend') }}',
        result 				    : '{{ trans('ingame.result') }}',
        set               : '{{ trans('ingame.set') }}',
        game 				      : '{{ trans('ingame.game') }}',
        deal 				      : '{{ trans('ingame.deal') }}',
        latestresult 		  : '{{ trans('ingame.latestresult') }}',
        newround 			    : '{{ trans('ingame.newround') }}',
        roundhold 			  : '{{ trans('ingame.roundhold') }}',
        dealing 			    : '{{ trans('ingame.dealing') }}',
        cardswipe 			  : '{{ trans('ingame.cardswipe') }}',
        total 				    : '{{ trans('ingame.total') }}',

        bettinghistory		: '{{ trans('ingame.bettinghistory') }}',
        transactions 		  : '{{ trans('ingame.transactions') }}',

        bankercaps			  : '{{ trans('ingame.bankercaps') }}',
        playercaps 			  : '{{ trans('ingame.playercaps') }}',
        dealerspaced		  : '{{ trans('ingame.dealerspaced') }}',
        playerspaced 		  : '{{ trans('ingame.playerspaced') }}',

        account 			    : '{{ trans('ingame.account') }}',
        avatar				    : '{{ trans('ingame.avatar') }}',
        language 			    : '{{ trans('ingame.language') }}',

        maintextCap1Thumb : '{{ trans('ingame.maintextCap1Thumb') }}',
        maintextCap1      : '{{ trans('ingame.maintextCap1') }}',
        subtextCap1       : '{{ trans('ingame.subtextCap1') }}',

        maintextCap2Thumb : "{!! trans('ingame.maintextCap2Thumb') !!}",
        maintextCap2      : "{!! trans('ingame.maintextCap2') !!}",
        subtextCap2       : '{{ trans('ingame.subtextCap2') }}',

        maintextCap3Thumb : '{{ trans('ingame.maintextCap3Thumb') }}',
        maintextCap3      : '{{ trans('ingame.maintextCap3') }}',
        subtextCap3       : '{{ trans('ingame.subtextCap3') }}',

        timeleft			    : '{{ trans('ingame.timeleft') }}',
        days			        : '{{ trans('ingame.days') }}',
        hours			        : '{{ trans('ingame.hours') }}',
        mins			        : '{{ trans('ingame.mins') }}',
        secs			        : '{{ trans('ingame.secs') }}',

        request           : '{{ trans('ingame.request') }}',
        join              : '{{ trans('ingame.join') }}',
        create_room       : '{{ trans('ingame.create_room') }}',
        bet_range         : '{{ trans('ingame.bet_range') }}',
        banker_capital    : '{{ trans('ingame.banker_capital') }}',
        availablemaximumbets : '{{ trans('ingame.availablemaximumbets') }}',
      },
      red_white: {
        redwins 			  : '{{ trans('ingame.redwins') }}',
        whitewins 			: '{{ trans('ingame.whitewins') }}',
        bonus 				  : '{{ trans('ingame.rw_bonus') }}',
        jackpot 			  : '{{ trans('ingame.jackpot') }}',
        bonuscaps 			: '{{ trans('ingame.bonuscaps') }}',
        jackpotcaps 		: '{{ trans('ingame.jackpotcaps') }}'
      },
      poker: {
        gameno 				    : '{{ trans('ingame.gameno') }}',
        player 				    : '{{ trans('ingame.player') }}',
        communitycard 		: '{{ trans('ingame.communitycard') }}',
        dealer				    : '{{ trans('ingame.dealer') }}',
        betflop 			    : '{{ trans('ingame.betflop') }}',
        betturn 			    : '{{ trans('ingame.betturn') }}',
        betriver			    : '{{ trans('ingame.betriver') }}',
        dealerwins        : '{{ trans('ingame.dealerwins') }}',
        playerwins        : '{{ trans('ingame.playerwins') }}',
        tiewins           : '{{ trans('ingame.tie') }}',

        pokerbonuscaps		: '{{ trans('ingame.pokerbonuscaps') }}',
        antecaps 			    : '{{ trans('ingame.antecaps') }}',
        flopcaps 			    : '{{ trans('ingame.flopcaps') }}',
        turncaps 			    : '{{ trans('ingame.turncaps') }}',
        rivercaps			    : '{{ trans('ingame.rivercaps') }}'
      },
      sicbo: {
        oddevencaps 		  : '{{ trans('ingame.oddevencaps') }}',
        bigsmallcaps 		  : '{{ trans('ingame.bigsmallcaps') }}',
        sumcaps 			    : '{{ trans('ingame.sumcaps') }}',
        dicecaps			    : '{{ trans('ingame.dicecaps') }}',
        hotcaps 			    : '{{ trans('ingame.hotcaps') }}',
        coldcaps 			    : '{{ trans('ingame.coldcaps') }}',
        oddcaps 			    : '{{ trans('ingame.oddcaps') }}',
        evencaps			    : '{{ trans('ingame.evencaps') }}',
        bigcaps 			    : '{{ trans('ingame.bigcaps') }}',
        smallcaps 			  : '{{ trans('ingame.smallcaps') }}',
        doublecaps 			  : '{{ trans('ingame.doublecaps') }}',
        triplecaps			  : '{{ trans('ingame.triplecaps') }}',
        latestresultcaps 	: '{{ trans('ingame.latestresultcaps') }}'
      }
    }
  </script>
  <style type="text/css">
    canvas {
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-size: 100% 100%;
      background-position: 0px -4px;
      /*background: #4d4d4d;*/
    }
  </style>
</head>
<body>
    {{-- <!-- 	<div class="loading">
    <div class="rot"></div>
    </div> --> --}}
<!--     <button id="void">VOID</button>
    <button id="voidP">VOID</button> -->
    <div class="font-preload" style="visibility: hidden; opacity: 0">
        <span class="BebasNeue" style="font-family:BebasNeue"></span>
        <span class="Lato" style="font-family:Lato"></span>
        <span class="LatoRegular" style="font-family:LatoRegular"></span>
        <span class="LatoBlack" style="font-family:LatoBlack"></span>
        <span class="OldStandard" style="font-family:OldStandard"></span>
    </div>

    <img src = "/img/cards/lobby_sprite_cards.png" hidden>
    <img src = "/img/cards/mobile_sprite_cards.png" hidden>
    <img src = "/img/all_scoreboard.png" hidden>
    <img src = "/img/livegames_ico.png" hidden>
    <img src = "/img/themedgames_ico.png" hidden>
    <img src = "/img/reelgames_ico.png" hidden>
    <img src = "/img/bethistory_ico.png" hidden>
    <img src = "/img/transactionhistory_ico.png" hidden>
    <img src = "/img/gamerules_ico.png" hidden>
    <img src = "/img/settings_ico.png" hidden>
    <img src = "/img/logout_ico.png" hidden>

    <img src = "/img/themed_games/redwhite_ico.png" hidden>
    <img src = "/img/themed_games/moneywheel_ico.png" hidden>

    <div class="container"> {{-- .container --}}
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
      </div> {{-- // wrapper--}}

      <div class="content-container" hidden> {{--content-container--}}
        <div class="header dom-resizable"> {{--header--}}
          <div class="header-nav clearfix"> {{--header-nav--}}
            <div id="lobby" class="header-nav__items header-nav--logo">
              <div class="logo"></div>
              {{-- <img src="/img/header/logo.png" alt="niihtan logo"> --}}
            </div>
            <div class="header-nav__items header-nav--games clearfix">
              <div id="baccarat" class="header-game__items -baccarat active">
                <div class="header-game__items-inner">
                  <i class="ico-baccarat-lobby"></i>
                  <span>{{trans('ingame.baccarat')}}</span>
                </div>
                <div class="header-subnav -baccarat">
                  <div id="baccarat-classic" class="header-subnav__items -classic active">
                    <span>{{trans('ingame.classic')}}</span>
                  </div>
                  <div id="baccarat-rooms" class="header-subnav__items -rooms">
                    <span>{{trans('ingame.rooms')}}</span>
                    <span class="new"> {{trans('ingame.newcaps')}}</span>
                  </div>
                </div>
              </div>
              <div id="othergames" class="header-game__items -othergames">
                <div class="header-game__items-inner">
                  <i class="ico-othergames"></i>
                  <span>OTHER GAMES</span>
                </div>
                <div class="header-subnav -othergames">
                  <div id="othergames-classic" class="header-subnav__items -classic active">
                    <span>{{trans('ingame.classic')}}</span>
                  </div>
                  <div id="othergames-rooms" class="header-subnav__items -sicbo-rooms">
                    <span>SICBO ROOMS</span>
                    <span class="new"> {{trans('ingame.newcaps')}}</span>
                  </div>
                  <div id="othergames-paigow" class="header-subnav__items -paigow-rooms">
                    <span>PAIGOW ROOMS</span>
                    <span class="new"> {{trans('ingame.newcaps')}}</span>
                  </div>
                </div>
              </div>
              <div id="reelgames" class="header-game__items -reelgames">
                <div class="header-game__items-inner">
                  <i class="ico-reelgames"></i>
                  <span>{{trans('ingame.reelgamescaps')}}</span>
                </div>
                <!-- <span class="comingsoon"> {{trans('ingame.comingsooncaps')}}</span> -->
              </div>
              <div id="multibet" class="header-game__items -multibet">
                <div class="header-game__items-inner">
                  <i class="ico-multibet"></i>
                  <span>MULTIBET</span>
                </div>
                <span class="comingsoon"> SOON!</span>
              </div>
            </div>
            <div class="header-nav__items header-nav--others">
              <div class="header__menu clearfix"><div>
                <i id="howtoplay" class="ico-howtoplay menu__items"></i>
                <i id="bethistory" class="ico-bethistory menu__items"></i>
                <i id="transactions" class="ico-transactions menu__items"></i>
                <i id="settings" class="ico-settings menu__items"></i>
                <!-- <div id="language" class="language-con menu__items">
                    <div class="language-outline"></div>
                    <i class="ico-language"></i>
                    <div class="language-arrow"></div>
                </div> -->
              </div></div>
              <div class="header__userinfo"><div>
                <div class="userinfo__avatar">
                  <img src="/img/avatar/red_queen.png" alt="">
                </div>
                <div class="userinfo__dtl">
                  <span class="userinfo-dtl__holdings" style="overflow: hidden;">0.00</span>
                  <span class="userinfo-dtl__name"> </span>
                </div>
              </div></div>
              <div class="header__logout">
                <i class="ico-logout"></i>
              </div>
            </div>
          </div> {{-- //header-nav--}}

          <div class="header-subnav language"> {{--header-sub-nav--}}
            <ul>
              <li class="ico-lang ico-lang--en"></li>
              <li class="ico-lang ico-lang--jp"></li>
              <li class="ico-lang ico-lang--kr"></li>
              <li class="ico-lang ico-lang--zh"></li>
              <li class="ico-lang ico-lang--th"></li>
            </ul>
          </div> {{--header-sub-nav--}}

        </div> {{-- // header--}}

        <div class="canvas-container black-theme"> {{--canvas-container--}}
          <div class="hot-container  dom-resizable">
          </div>
          <div class="main-container dom-resizable">
            <div class="bc-tables table-thumbnail"></div>
            <div class="bc-tables table-list"></div>
            <div class="dt-tables table-list"></div>
            <div class="sb-tables table-list"></div>
            <div class="ub-tables table-list"></div>
            <div class="poker-tables table-list"></div>
            <div class="pg-classic-tables table-list"></div>
          </div>
          <div class="banner-container dom-resizable"></div>
          <div class="reelgames-container dom-resizable">
            <div class ="reelgames-list all"></div>
            <div class ="reelgames-list kagaming"></div>
            <div class ="reelgames-list betsoft"></div>
          </div>
          <div class="popup-container dom-resizable">
            <div id="popup-createroom" class="createroom-wrap"> {{--popup-createroom--}}
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
            <div id="popup-verification" class="verification-wrap">
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
            </div>
            <div id="popup-failed" class="popup-error-wrap">
              <div class="popup-error-con">
                <i class="ico-error"></i>
                <h4>{{trans('ingame.room_failed_msg')}}</h4>
              </div>
              <div class="pop-failed-btn">
                <button type="button" name="button" class="btn-failed"><span>OK</span></button>
              </div>
            </div> {{-- // popup-failed--}}
          </div>
          <div class="notification-container dom-resizable">
          </div>
          <div class="popup-bg"></div>

          <div class="lobby-popup-con dom-resizable"> {{-- lobby-popup-con --}}
            <div class="lobby-popup-con__header"> {{-- lobby-popup-con__header --}}
              <span class="howtoplay popup-name">{!! trans('ingame.howtoplay') !!}</span>
              <span class="bethistory popup-name">{!! trans('ingame.betlogs') !!}</span>
              <span class="transactions popup-name">{!! trans('ingame.transactions') !!}</span>
              <span class="settings popup-name">{!! trans('ingame.settings') !!}</span>
              <i class="ico ico-not"></i>
            </div> {{-- // lobby-popup-con__header --}}
            <div class="lobby-popup-con__body"> {{-- lobby-popup-con__body --}}
              <div class="howtoplay popup-name">
                <select class="howtoplay_games">
                  <option value="baccarat-toggle">{!! trans('ingame.baccarat_game') !!}</option>
                  <option value="sicbo-toggle">{!! trans('ingame.sicbo_game') !!}</option>
                  <option value="poker-toggle">{!! trans('ingame.poker_game') !!}</option>
                  <option value="dragontiger-toggle">{!! trans('ingame.dragontiger_game') !!}</option>
                  <option value="paigow-toggle">{!! trans('ingame.paigow') !!}</option>
                </select>
                <hr>
              </div>
              <div class="bethistory popup-name">
                <table>
                  <thead>
                    <tr>
                      <th>Game #</th>
                      <th>Starting Balance</th>
                      <th>Total Bet</th>
                      <th>Win/Lose</th>
                      <th>New Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>498353</td>
                      <td>1,000,000</td>
                      <td>562,0000</td>
                      <td>1,000,000</td>
                      <td>12,470,000</td>
                    </tr>
                    <tr>
                      <td>498353</td>
                      <td>1,000,000</td>
                      <td>562,0000</td>
                      <td>1,000,000</td>
                      <td>12,470,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="transactions popup-name">
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Initial Credit</th>
                      <th>Transferred</th>
                      <th>Total Credit</th>
                      <th>IP</th>
                      <th>Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Cash-in</td>
                      <td>120,000</td>
                      <td>100,000</td>
                      <td>120,000</td>
                      <td>112.198.15.69</td>
                      <td>Philippines</td>
                    </tr>
                    <tr>
                      <td>Cash-in</td>
                      <td>120,000</td>
                      <td>100,000</td>
                      <td>120,000</td>
                      <td>112.198.15.69</td>
                      <td>Indonesia</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="settings popup-name">
                <div class="sounds setting-con">
                  <span>Sound</span>
                  <div class="sounds__col">
                    <p>Dealer's Voice</p>
                    <p>Game Sound</p>
                  </div>
                  <div class="sounds__col">
                    <div class="sounds-con"><input class="dealersvoice rangeSlider" type="range" min="0" max="100"></div>
                    <div class="sounds-con"><input class="gamesound rangeSlider" type="range" min="0" max="100"></div>
                  </div>
                </div>
                <div class="display setting-con">
                  <span>Display</span>
                  <div class="sounds__col">
                    <p>Dark Theme</p>
                    <p>Show Tutorial</p>
                    <p>Language</p>
                  </div>
                  <div class="sounds__col">
                    <div class="switch darktheme">
                      <input type="checkbox" id="checkbox1">
                      <label for="checkbox1"></label>
                    </div>
                    <div class="switch showtutorial">
                      <input type="checkbox" id="checkbox2">
                      <label for="checkbox2"></label>
                    </div>
                    <ul>
                      <li class="en language"></li>
                      <li class="jp language"></li>
                      <li class="kr language"></li>
                      <li class="zh language"></li>
                      <li class="th language"></li>
                    </ul>
                  </div>
                </div>
                <div class="avatar setting-con">
                  <span>Avatar</span>
                  <ul>
                    <li class="blue_jack avatarimg"><a href="#"></a></li>
                    <li class="blue_joker avatarimg"><a href="#"></a></li>
                    <li class="blue_king avatarimg"><a href="#"></a></li>
                    <li class="blue_queen avatarimg"><a href="#"></a></li>
                    <li class="red_jack avatarimg"><a href="#"></a></li>
                    <li class="red_joker avatarimg"><a href="#"></a></li>
                    <li class="red_king avatarimg"><a href="#"></a></li>
                    <li class="red_queen avatarimg"><a href="#"></a></li>
                  </ul>
                </div>
              </div>
            </div> {{-- // lobby-popup-con__body --}}
          </div> {{-- // lobby-popup-con --}}
        </div> {{-- // canvas-container--}}
          <!--    <canvas id="betHistory" width="1920px" height="1080px" style="z-index: 99999; top:57%; display: none" ></canvas>
          <canvas id="transHistory" width="1920px" height="1080px" style="z-index: 99999; top:57%; display: none" ></canvas>
          <canvas id="popupHowto" width="1920px" height="1080px" style="z-index: 99999; top:57%; display: none" ></canvas>
          <div class="popup-settings-container" style="    position: absolute; height: 60%; width: 20%; left: 64%; overflow: hidden; top: 7%; display: none">
          <canvas id="popupSettings" width="1920px" height="1080px" style="z-index: 99999; top:57%; display: none; top: 72%; left: -70%;" ></canvas>
        </div> -->
        <canvas id="confirmationModal" width="1920px" height="1080px" style="z-index: 99999; display: none" ></canvas>

        <div class="announcement dom-resizable"> {{--annopuncement--}}
          <div class="announcement__ico"><i class="ico-nihtan"></i></div>
          <div class="announcement__msg">
            <div>
              <span id="announcement-text"></span>
            </div>
          </div>
        </div> {{-- // annopuncement--}}
        <div id="roulette-toggle" class="ingame-howtoplay">{{--roukette-toggle--}}
          <div id="top" class="howto-wrap dom-resizable"> {{-- .howto-wrap --}}
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
                    <a href="#game-objective" class="menu-game-scroll">{!! trans('howto-roulette.game_objective') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#roulette-gameplay" class="menu-game-scroll">{!! trans('howto-roulette.game_play') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#roulette-typesofbet" class="menu-game-scroll">{!! trans('howto-roulette.type_bets_payout') !!}</a>
                  </li>
                </ul> {{-- // .gamerules-menu --}}
              </div> {{-- // .howto-submenu --}}

              <div class="howto-contents"> {{-- .howto-contents --}}
                <div id="game-objective" class="howto--layers"> {{-- .game-objective --}}
                  {!! trans('howto-roulette.game_objective_desc') !!}
                </div> {{-- // .game-objective --}}

                <div id="roulette-gameplay" class="howto--layers"> {{-- .gameplay --}}
                  <h4>{!! trans('howto-roulette.game_play') !!}</h4>
                  {!! trans('howto-roulette.game_play_list') !!}
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
        <div id="bigwheel-toggle" class="ingame-howtoplay"> {{--bigwheel-toggle--}}
          <div id="top" class="howto-wrap dom-resizable"> {{-- .howto-wrap --}}
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
                    <a href="#game-objective" class="menu-game-scroll">{!! trans('howto-spinnwin.game_objective') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#bigwheel-gameplay" class="menu-game-scroll">{!! trans('howto-spinnwin.gameplay') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#bigwheel-typesofbet" class="menu-game-scroll">{!! trans('howto-spinnwin.types_of_bet') !!}</a>
                  </li>
                </ul> {{-- // .gamerules-menu --}}
              </div> {{-- // .howto-submenu --}}

              <div class="howto-contents"> {{-- .howto-contents --}}
                <div id="game-objective" class="howto--layers"> {{-- .game-objective --}}
                  {!! trans('howto-spinnwin.gameobj_desc') !!}
                </div> {{-- // .game-objective --}}

                <div id="bigwheel-gameplay" class="howto--layers"> {{-- .gameplay --}}
                  <h4>{!! trans('howto-spinnwin.gameplay') !!}</h4>

                  <ul class="gameplay-list gameplay-list--2">
                    {!! trans('howto-spinnwin.gameplay_list') !!}
                  </ul>
                </div> {{-- // .gameplay --}}

                <div id="bigwheel-typesofbet" class="howto--layers"> {{-- .type-of-bets --}}
                  <h4 id="type-of-bets">{!! trans('howto-spinnwin.types_of_bet') !!}</h4>
                  <table class="tbl--typeofbets">
                    <thead>
                      <tr>
                        <th class="bet">{!! trans('howto-spinnwin.bet') !!}</th>
                        <th class="payout">{!! trans('howto-spinnwin.payout') !!}</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td class="bet">{!! trans('howto-spinnwin.bet_1') !!}</td>
                        <td class="payout">{!! trans('howto-spinnwin.payout_1_1') !!}</td>
                      </tr>

                      <tr>
                        <td class="bet">{!! trans('howto-spinnwin.bet_2') !!}</td>
                        <td class="payout">{!! trans('howto-spinnwin.payout_2_1') !!}</td>
                      </tr>

                      <tr>
                        <td class="bet">{!! trans('howto-spinnwin.bet_3') !!}</td>
                        <td class="payout">{!! trans('howto-spinnwin.payout_5_1') !!}</td>
                      </tr>

                      <tr>
                        <td class="bet">{!! trans('howto-spinnwin.bet_4') !!}</td>
                        <td class="payout">{!! trans('howto-spinnwin.payout_10_1') !!}</td>
                      </tr>

                      <tr>
                        <td class="bet">{!! trans('howto-spinnwin.bet_5') !!}</td>
                        <td class="payout">{!! trans('howto-spinnwin.payout_20_1') !!}</td>
                      </tr>

                      <tr>
                        <td class="bet">{!! trans('howto-spinnwin.bet_6') !!}</td>
                        <td class="payout">{!! trans('howto-spinnwin.payout_45_1') !!}</td>
                      </tr>
                    </tbody>
                  </table>
                </div> {{--  //.type-of-bets --}}
              </div> {{-- // .howto-contents --}}
            </div> {{-- // .howto-wrap__items --}}

            {{-- paste here --}}
          </div> {{-- // .howto-wrap --}}
        </div> {{-- // bigwheel-toggle--}}
        <div id="dragontiger-toggle" class="ingame-howtoplay"> {{--dragontiger-toggle--}}
          <div id="top" class="howto-wrap dom-resizable"> {{-- .howto-wrap --}}
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
                    <a href="#game-objective" class="menu-game-scroll">{!! trans('howto-dragontiger.game_objective') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#dragontiger-gameplay" class="menu-game-scroll">{!! trans('howto-dragontiger.gameplay') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#dragontiger-typesofbet" class="menu-game-scroll">{!! trans('howto-dragontiger.types_of_bet') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#dragontiger-suit" class="menu-game-scroll">{!! trans('howto-dragontiger.suit_suited') !!}</a>
                  </li>
                </ul> {{-- // .gamerules-menu --}}
              </div> {{-- // .howto-submenu --}}
              <div class="howto-contents"> {{-- .howto-contents --}}
                <div id="game-objective" class="howto--layers"> {{-- .game-objective --}}
                  {!! trans('howto-dragontiger.gameobj_desc') !!}
                </div> {{-- // .game-objective --}}

                <div id="dragontiger-gameplay" class="howto--layers"> {{-- .gameplay --}}
                  <h4>{!! trans('howto-dragontiger.gameplay') !!}</h4>

                  <ul class="gameplay-list gameplay-list--2">
                    {!! trans('howto-dragontiger.gameplay_list') !!}
                  </ul>
                </div> {{-- // .gameplay --}}

                <div id="dragontiger-typesofbet" class="howto--layers dragon-tiger"> {{-- .type-of-bets --}}
                  <h4 id="type-of-bets">{!! trans('howto-dragontiger.types_of_bet') !!}</h4>
                  <table class="tbl--typeofbets">
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
                        <td class="condition">{!! trans('howto-dragontiger.condition_1') !!}</td>
                      </tr>

                      <tr>
                        <td class="bet">{!! trans('howto-dragontiger.bet_tiger') !!}</td>
                        <td class="payout">{!! trans('howto-dragontiger.payout_1_1') !!}</td>
                        <td class="condition">{!! trans('howto-dragontiger.condition_2') !!}</td>
                      </tr>

                      <tr>
                        <td class="bet">{!! trans('howto-dragontiger.bet_tie') !!}</td>
                        <td class="payout">{!! trans('howto-dragontiger.payout_10_1') !!}</td>
                        <td class="condition">{!! trans('howto-dragontiger.condition_3') !!}</td>
                      </tr>

                      <tr>
                        <td class="bet">{!! trans('howto-dragontiger.bet_bigsmall') !!}</td>
                        <td class="payout">{!! trans('howto-dragontiger.payout_1_1') !!}</td>
                        <td class="condition">{!! trans('howto-dragontiger.condition_4') !!}</td>
                      </tr>

                      <tr>
                        <td class="bet">{!! trans('howto-dragontiger.bet_oddeven') !!}</td>
                        <td class="payout">{!! trans('howto-dragontiger.payout_1_1') !!}</td>
                        <td class="condition">{!! trans('howto-dragontiger.condition_5') !!}</td>
                      </tr>

                      <tr>
                        <td class="bet">{!! trans('howto-dragontiger.bet_suit') !!}</td>
                        <td class="payout">{!! trans('howto-dragontiger.payout_3_1') !!}</td>
                        <td class="condition">{!! trans('howto-dragontiger.condition_7') !!}</td>
                      </tr>

                      <tr>
                        <td class="bet">{!! trans('howto-dragontiger.bet_suitedtie') !!}</td>
                        <td class="payout">{!! trans('howto-dragontiger.payout_50_1') !!}</td>
                        <td class="condition">{!! trans('howto-dragontiger.condition_6') !!}</td>
                      </tr>
                    </tbody>
                  </table>
                </div> {{--  //.type-of-bets --}}

                <div id="dragontiger-suit" class="howto--layers clearfix"> {{-- #suit --}}
                  <div class="suit__items -suit">
                    <h4>{!! trans('howto-dragontiger.suit_title') !!}</h4>
                    <p>{!! trans('howto-dragontiger.suit_desc') !!}</p>
                    <img src="/img/howtoplay/dragontiger/dark/dt_suit1.png" alt="suit" />
                  </div>

                  <div class="suit__items -suited-tie">
                    <h4>{!! trans('howto-dragontiger.suitedtie_title') !!}</h4>
                    <p>{!! trans('howto-dragontiger.suitedtie_desc') !!}</p>
                    <img src="/img/howtoplay/dragontiger/dark/dt_suit2.png" alt="suited tie" />
                  </div>
                </div> {{-- // #suit --}}
              </div> {{-- // .howto-contents --}}
            </div> {{-- // .howto-wrap__items --}}

            {{-- paste here --}}
          </div> {{-- // .howto-wrap --}}
        </div> {{--dragontiger-toggle--}}

        <div id="paigow-toggle" class="ingame-howtoplay"> {{--paigow-toggle--}}
          <div id="top" class="howto-wrap dom-resizable"> {{-- .howto-wrap --}}
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
                    <a href="#game-objective" class="menu-game-scroll">{!! trans('howto-paigow.game_objective') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#paigow-gameplay" class="menu-game-scroll">{!! trans('howto-paigow.gameplay') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#paigow-playerpayout_bankerwin" class="menu-game-scroll">{!! trans('howto-paigow.playerpayout_bankerwin') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#paigow-tiles_values" class="menu-game-scroll">{!! trans('howto-paigow.tile_values') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#paigow-tile_ranking" class="menu-game-scroll">{!! trans('howto-paigow.tile_ranking') !!}</a>
                  </li>
                </ul> {{-- // .gamerules-menu --}}
              </div> {{-- // .howto-submenu --}}
              <div class="howto-contents"> {{-- .howto-contents --}}
                <div id="game-objective" class="howto--layers"> {{-- .game-objective --}}
                  {!! trans('howto-paigow.gameobj_desc') !!}
                </div> {{-- // .game-objective --}}

                <div id="paigow-gameplay" class="howto--layers"> {{-- .paigow-gameplay --}}
                  <h4>{!! trans('howto-paigow.gameplay') !!}</h4>
                  <ul class="gameplay-list gameplay-list--2">
                    {!! trans('howto-paigow.gameplay_1') !!}
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
                    {!! trans('howto-paigow.gameplay_2') !!}
                  </ul>
                </div> {{-- // .paigow-gameplay --}}
                <div id="paigow-playerpayout_bankerwin" class="howto--layers"> {{-- .paigow-playerpayout_bankerwin --}}
                  <h4>{!! trans('howto-paigow.playerpayout_bankerwin') !!}</h4>
                  <table class="tbl--rules playerpayout">
                    <thead>
                      <tr>
                        <th class="rules--card">{!! trans('howto-paigow.winning_hand') !!}</th>
                        <th class="rules--payout">{!! trans('howto-paigow.player_payout') !!}</th>
                        <th class="rules--payout">{!! trans('howto-paigow.banker_win') !!}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{!! trans('howto-paigow.winning_hand_1') !!}</td>
                        <td>{!! trans('howto-paigow.player_payout_1') !!}</td>
                        <td rowspan="2">{!! trans('howto-paigow.banker_win_1') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-paigow.winning_hand_2') !!}</td>
                        <td>{!! trans('howto-paigow.player_payout_2') !!}</td>
                      </tr>
                    </tbody>
                  </table>
                  <span class="winning_commission">{!! trans('howto-paigow.winning_commission') !!}</span>
                </div> {{-- // .paigow-playerpayout_bankerwin --}}
                <div id="paigow-tiles_values" class="howto--layers"> {{-- .paigow-tiles_values --}}
                  <h4>{!! trans('howto-paigow.tile_values') !!}</h4>
                  <p>{!! trans('howto-paigow.tiles_values_desc_1') !!}</p>
                  {!! trans('howto-paigow.tiles_values_1_img') !!}
                  <p>{!! trans('howto-paigow.tiles_values_desc_2') !!}</p>
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

        <div id="red-white-toggle" class="ingame-howtoplay"> {{--red-white-toggle--}}
          <div id="top" class="howto-wrap dom-resizable"> {{-- .howto-wrap --}}
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
                    <a href="#game-objective" class="menu-game-scroll">{!! trans('howto-redwhite.game_objective') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#redwhite-gameplay" class="menu-game-scroll">{!! trans('howto-redwhite.gameplay') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#redwhite-typesofbet" class="menu-game-scroll">{!! trans('howto-redwhite.types_of_bet') !!}</a>
                  </li>
                </ul> {{-- // .gamerules-menu --}}
              </div> {{-- // .howto-submenu --}}

              <div class="howto-contents"> {{-- .howto-contents --}}
                <div id="game-objective" class="howto--layers"> {{-- .game-objective --}}
                  {!! trans('howto-redwhite.gameobj_desc') !!}
                </div> {{-- // .game-objective --}}

                <div id="redwhite-gameplay" class="howto--layers"> {{-- .gameplay --}}
                  <h4>{!! trans('howto-redwhite.gameplay') !!}</h4>

                  <ul class="gameplay-list gameplay-list--2">
                    {!! trans('howto-redwhite.gameplay_list') !!}
                  </ul>
                </div> {{-- // .gameplay --}}

                <div id="redwhite-typesofbet" class="howto--layers"> {{-- .type-of-bets --}}
                  <h4 id="type-of-bets">{!! trans('howto-redwhite.types_of_bet') !!}</h4>
                  <table class="tbl--typeofbets">
                    <thead>
                      <tr>
                        <th class="condition">{!! trans('howto-redwhite.bet') !!}</th>
                        <th class="payout">{!! trans('howto-redwhite.payout') !!}</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td class="condition">{!! trans('howto-redwhite.bet_1') !!}</td>
                        <td class="payout">{!! trans('howto-redwhite.payout_1_1') !!}</td>
                      </tr>

                      <tr>
                        <td class="condition">{!! trans('howto-redwhite.bet_2') !!}</td>
                        <td class="payout">{!! trans('howto-redwhite.payout_1_1') !!}</td>
                      </tr>

                      <tr>
                        <td class="condition">{!! trans('howto-redwhite.bet_3') !!}</td>
                        <td class="payout">{!! trans('howto-redwhite.payout_7_1') !!}</td>
                      </tr>

                      <tr>
                        <td class="condition">{!! trans('howto-redwhite.bet_4') !!}</td>
                        <td class="payout">{!! trans('howto-redwhite.payout_7_1') !!}</td>
                      </tr>

                      <tr>
                        <td class="condition">{!! trans('howto-redwhite.bet_5') !!}</td>
                        <td class="payout">{!! trans('howto-redwhite.payout_15_1') !!}</td>
                      </tr>

                      <tr>
                        <td class="condition">{!! trans('howto-redwhite.bet_6') !!}</td>
                        <td class="payout">{!! trans('howto-redwhite.payout_250_1') !!}</td>
                      </tr>
                    </tbody>
                  </table>
                </div> {{--  //.type-of-bets --}}
              </div> {{-- // .howto-contents --}}
            </div> {{-- // .howto-wrap__items --}}

            {{-- paste here --}}
          </div> {{-- // .howto-wrap --}}
        </div> {{--red-white-toggle--}}
        <div id="poker-toggle" class="ingame-howtoplay"> {{--poker-toggle--}}
          <div id="top" class="howto-wrap dom-resizable"> {{-- .howto-wrap --}}
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
                      <a href="#game-objective" class="menu-game-scroll">{!! trans('howto-poker.game_objective') !!}</a>
                    </li>
                    <li class="gamerules-menu__items">
                      <a href="#poker-gameplay" class="menu-game-scroll">{!! trans('howto-poker.gameplay') !!}</a>
                    </li>
                    <li class="gamerules-menu__items">
                      <a href="#poker-hand-rankings" class="menu-game-scroll">{!! trans('howto-poker.poker_hand_rankings') !!}</a>
                    </li>
                    <li class="gamerules-menu__items">
                      <a href="#poker-betting-system" class="menu-game-scroll">{!! trans('howto-poker.betting_system') !!}</a>
                    </li>
                    <li class="gamerules-menu__items">
                      <a href="#poker-antebetpayouts" class="menu-game-scroll">{!! trans('howto-poker.ante_bet_payouts') !!}</a>
                    </li>
                    <li class="gamerules-menu__items">
                      <a href="#poker-bonusbetpayouts" class="menu-game-scroll">{!! trans('howto-poker.bonus_bet_payouts') !!}</a>
                    </li>
                    <li class="gamerules-menu__items">
                      <a href="#poker-bonuspluspayouts" class="menu-game-scroll">{!! trans('howto-poker.bonus_plus_payouts') !!}</a>
                    </li>
                    <li class="gamerules-menu__items">
                      <a href="#poker-pocketbonuspayouts" class="menu-game-scroll">{!! trans('howto-poker.pocket_bonus_payouts') !!}</a>
                    </li>
                    <li class="gamerules-menu__items">
                      <a href="#poker-same-hand-ranking" class="menu-game-scroll">{!! trans('howto-poker.same_hand_ranking') !!}</a>
                    </li>
                  </ul> {{-- // .gamerules-menu --}}
                </div> {{-- // .howto-submenu --}}

                <div class="howto-contents"> {{-- .howto-contents --}}
                  <div id="game-objective" class="howto--layers"> {{--howto--layers--}}
                    <h4>{!! trans('howto-poker.game_objective') !!}</h4>
                    {!! trans('howto-poker.game_objective_desc_pc') !!}
                  </div> {{-- // howto--layers--}}

                  <div id="poker-gameplay" class="howto--layers"> {{-- .gameplay --}}
                    <h4>{!! trans('howto-poker.gameplay') !!}</h4>

                    <ul class="gameplay-list gameplay-list--2">
                      {!! trans('howto-poker.gameplay_desc_pc') !!}
                    </ul>
                  </div> {{-- // .gameplay --}}

                  <div id="poker-hand-rankings" class="howto--layers"> {{--howto--layers--}}
                    <h4>{!! trans('howto-poker.poker_hand_rankings') !!}</h4>
                    <div class="pokerhand-wrap"> {{--pokerhand-wrap--}}
                      <div class="pokerhand-con clearfix">
                        <div class="pokerhand-con__items clearfix">
                          <h5>1. {!! trans('howto-poker.poker_hand_ranking_list_1') !!}</h5>
                          <img src="/img/howtoplay/poker/dark/poker_handranking_01.png" alt="">
                          <p>{!! trans('howto-poker.poker_hand_ranking_list_1_desc_pc') !!}</p>
                        </div>
                      </div>
                      <div class="pokerhand-con clearfix">
                        <div class="pokerhand-con__items clearfix">
                          <h5>2. {!! trans('howto-poker.poker_hand_ranking_list_2') !!}</h5>
                          <p>{!! trans('howto-poker.poker_hand_ranking_list_2_desc_pc') !!}</p>
                          <div class="pokerhand-con__items clearfix">
                            <img src="/img/howtoplay/poker/dark/poker_handranking_2.png" alt="">
                            <p class="rankinglist-sub">{!! trans('howto-poker.poker_hand_ranking_list_2_sub_1') !!}</p>
                          </div>
                          <div class="pokerhand-con__items clearfix">
                            <img src="/img/howtoplay/poker/dark/poker_handranking_2-1.png" alt="">
                            <p class="rankinglist-sub">{!! trans('howto-poker.poker_hand_ranking_list_2_sub_2') !!}</p>
                          </div>
                        </div>
                      </div>
                      <div class="pokerhand-con clearfix">
                        <div class="pokerhand-con__items clearfix">
                          <h5>3. {!! trans('howto-poker.poker_hand_ranking_list_3') !!}</h5>
                          <img src="/img/howtoplay/poker/dark/poker_handranking_3.png" alt="">
                          <p>{!! trans('howto-poker.poker_hand_ranking_list_3_desc_pc') !!}</p>
                        </div>
                      </div>
                      <div class="pokerhand-con clearfix">
                        <div class="pokerhand-con__items clearfix">
                          <h5>4. {!! trans('howto-poker.poker_hand_ranking_list_4') !!}</h5>
                          <img src="/img/howtoplay/poker/dark/poker_handranking_4.png" alt="">
                          <p>{!! trans('howto-poker.poker_hand_ranking_list_4_desc_pc') !!}</p>
                        </div>
                      </div>
                      <div class="pokerhand-con clearfix">
                        <div class="pokerhand-con__items clearfix">
                          <h5>5. {!! trans('howto-poker.poker_hand_ranking_list_5') !!}</h5>
                          <img src="/img/howtoplay/poker/dark/poker_handranking_5.png" alt="">
                          <p>{!! trans('howto-poker.poker_hand_ranking_list_5_desc_pc') !!}</p>
                        </div>
                      </div>
                      <div class="pokerhand-con clearfix">
                        <div class="pokerhand-con__items clearfix">
                          <h5>6. {!! trans('howto-poker.poker_hand_ranking_list_6') !!}</h5>
                          <p>{!! trans('howto-poker.poker_hand_ranking_list_6_desc_pc') !!}</p>
                          <div class="pokerhand-con__items clearfix">
                            <img src="/img/howtoplay/poker/dark/poker_handranking_6.png" alt="">
                            <p class="rankinglist-sub">{!! trans('howto-poker.poker_hand_ranking_list_6_sub_1') !!}</p>
                          </div>
                          <div class="pokerhand-con__items clearfix">
                            <img src="/img/howtoplay/poker/dark/poker_handranking_6-1.png" alt="">
                            <p class="rankinglist-sub">{!! trans('howto-poker.poker_hand_ranking_list_6_sub_2') !!}</p>
                          </div>
                        </div>
                      </div>
                      <div class="pokerhand-con clearfix">
                        <div class="pokerhand-con__items clearfix">
                          <h5>7. {!! trans('howto-poker.poker_hand_ranking_list_7') !!}</h5>
                          <img src="/img/howtoplay/poker/dark/poker_handranking_7.png" alt="">
                          <p>{!! trans('howto-poker.poker_hand_ranking_list_7_desc_pc') !!}</p>
                        </div>
                      </div>
                      <div class="pokerhand-con clearfix">
                        <div class="pokerhand-con__items clearfix">
                          <h5>8. {!! trans('howto-poker.poker_hand_ranking_list_8') !!}</h5>
                          <img src="/img/howtoplay/poker/dark/poker_handranking_8.png" alt="">
                          <p>{!! trans('howto-poker.poker_hand_ranking_list_8_desc_pc') !!}</p>
                        </div>
                      </div>
                      <div class="pokerhand-con clearfix">
                        <div class="pokerhand-con__items clearfix">
                          <h5>9. {!! trans('howto-poker.poker_hand_ranking_list_9') !!}</h5>
                          <img src="/img/howtoplay/poker/dark/poker_handranking_9.png" alt="">
                          <p>{!! trans('howto-poker.poker_hand_ranking_list_9_desc_pc') !!}</p>
                        </div>
                      </div>
                      <div class="pokerhand-con clearfix">
                        <div class="pokerhand-con__items clearfix">
                          <h5>10. {!! trans('howto-poker.poker_hand_ranking_list_10') !!}</h5>
                          <img src="/img/howtoplay/poker/dark/poker_handranking_10.png" alt="">
                          <p>{!! trans('howto-poker.poker_hand_ranking_list_10_desc_pc') !!}</p>
                        </div>
                      </div>
                    </div> {{--pokerhand-wrap--}}
                  </div> {{-- // howto--layers--}}

                  <div id="poker-betting-system" class="howto--layers"> {{--howto--layers--}}
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
                          <td>{!! trans('howto-poker.betting_system_action_1_pc') !!}</td>
                        </tr>

                        <tr>
                          <td>{!! trans('howto-poker.betting_system_bet_2') !!}</td>
                          <td>{!! trans('howto-poker.betting_system_action_2_pc') !!}</td>
                        </tr>

                        <tr>
                          <td>{!! trans('howto-poker.betting_system_bet_3') !!}</td>
                          <td>{!! trans('howto-poker.betting_system_action_3_pc') !!}</td>
                        </tr>

                        <tr>
                          <td>{!! trans('howto-poker.betting_system_bet_4') !!}</td>
                          <td>{!! trans('howto-poker.betting_system_action_4_pc') !!}</td>
                        </tr>

                        <tr>
                          <td>{!! trans('howto-poker.betting_system_round_2') !!}</td>
                          <td>{!! trans('howto-poker.betting_system_bet_5') !!}</td>
                          <td>{!! trans('howto-poker.betting_system_action_5_pc') !!}</td>
                        </tr>

                        <tr>
                          <td>{!! trans('howto-poker.betting_system_round_3') !!}</td>
                          <td>{!! trans('howto-poker.betting_system_bet_6') !!}</td>
                          <td>{!! trans('howto-poker.betting_system_action_6_pc') !!}</td>
                        </tr>

                        <tr>
                          <td>{!! trans('howto-poker.betting_system_round_4') !!}</td>
                          <td>{!! trans('howto-poker.betting_system_bet_7') !!}</td>
                          <td>{!! trans('howto-poker.betting_system_action_7_pc') !!}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div> {{-- // howto--layers--}}

                  <div id="poker-antebetpayouts" class="howto--layers"> {{--howto--layers--}}
                    <h4>{!! trans('howto-poker.ante_bet_payouts') !!}</h4>
                    <ol class="antebet--list">
                      {!! trans('howto-poker.ante_bet_payouts_desc_pc') !!}
                    </ol>
                  </div> {{-- // howto--layers--}}

                  <div id="poker-bonusbetpayouts" class="howto--layers bonus-payout"> {{--howto--layers--}}
                    <h4>{!! trans('howto-poker.bonus_bet_payouts') !!}</h4>
                    <table class="tbl--rules">
                      <thead>
                        <tr>
                          <th class="rules--card">{!! trans('howto-poker.players_whole_card') !!}</th>
                          <th class="rules--payout">{!! trans('howto-poker.payout') !!}</th>
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
                  </div> {{-- // howto--layers--}}

                  <div id="poker-bonuspluspayouts" class="howto--layers bonus-payout"> {{--howto--layers--}}
                    <h4>{!! trans('howto-poker.bonus_plus_payouts') !!}</h4>
                    <ol class="pokerbonusplus--list">
                      {!! trans('howto-poker.bonus_plus_desc') !!}
                    </ol>
                    <table class="tbl--rules">
                      <thead>
                        <tr>
                          <th class="rules--card">{!! trans('howto-poker.players_poker_hand') !!}</th>
                          <th class="rules--payout">{!! trans('howto-poker.payout') !!}</th>
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
                    <!-- <p class="bonus_plus_note">{!! trans('howto-poker.bonus_plus_note') !!}</p> -->
                  </div> {{-- // howto--layers--}}

                  <div id="poker-pocketbonuspayouts" class="howto--layers"> {{--howto--layers--}}
                    <h4>{!! trans('howto-poker.pocket_bonus_payouts') !!}</h4>
                    <table class="tbl--rules">
                      <thead>
                        <tr>
                          <th class="rules--card">{!! trans('howto-poker.players_hole_cards') !!}</th>
                          <th class="rules--payout">{!! trans('howto-poker.payout') !!}</th>
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

                  <div id="poker-same-hand-ranking" class="howto--layers hand-rank"> {{--howto--layers--}}
                    <h4>{!! trans('howto-poker.same_hand_ranking') !!}</h4>
                    {!! trans('howto-poker.same_hand_ranking_desc_pc') !!}

                    <ol class="handranking--list">
                      <li>
                        <span>{!! trans('howto-poker.same_hand_ranking_1') !!}</span>
                        <ol class="handranking-sub--list">
                          <li>
                            <span>{!! trans('howto-poker.same_hand_ranking_1_1_pc') !!}</span>
                            <div class="handranking--sub--text">
                              <div>
                                <p>{!! trans('howto-poker.same_hand_ranking_dealer') !!}</p>
                                <p>{!! trans('howto-poker.same_hand_ranking_comcard') !!}</p>
                                <p>{!! trans('howto-poker.same_hand_ranking_player') !!}</p>
                              </div>
                              <img src="/img/howtoplay/poker/dark/poker_handranking_11_b.png" alt="playboards">
                            </div>
                          </li>
                        </ol>
                      </li>
                      <li>
                        <span>{!! trans('howto-poker.same_hand_ranking_2_pc') !!}</span>
                        <ol class="handranking-sub--list">
                          <li>
                            <span>{!! trans('howto-poker.same_hand_ranking_2_1') !!}</span>
                            <div class="handranking--sub--text">
                              <div>
                                <p>{!! trans('howto-poker.same_hand_ranking_dealer') !!}</p>
                                <p>{!! trans('howto-poker.same_hand_ranking_comcard') !!}</p>
                                <p>{!! trans('howto-poker.same_hand_ranking_player') !!}</p>
                              </div>
                              <img src="/img/howtoplay/poker/dark/poker_handranking_12_b.png" alt="playboards">
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
                              <img src="/img/howtoplay/poker/dark/poker_handranking_13_b.png" alt="playboards">
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
        </div> {{-- //poker-toggle--}}
        <div id="sicbo-toggle" class="ingame-howtoplay"> {{--sicbo-toggle--}}
          <div id="top" class="howto-wrap dom-resizable"> {{-- .howto-wrap --}}
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
                    <a href="#game-objective" class="menu-game-scroll">{!! trans('howto-sicbo.gameobj_header') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#sicbo-gameplay" class="menu-game-scroll">{!! trans('howto-sicbo.gameplay_header') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#typesofbet-sicbo" class="menu-game-scroll">{!! trans('howto-sicbo.typesofbets_header') !!}</a>
                  </li>
                </ul> {{-- // .gamerules-menu --}}
              </div> {{-- // .howto-submenu --}}

              <div class="howto-contents"> {{-- .howto-contents --}}
                <div id="game-objective" class="howto--layers"> {{-- .game-objective --}}
                  {!! trans('howto-sicbo.gameobj_body') !!}
                </div> {{-- // .game-objective --}}

                <div id="sicbo-gameplay" class="howto--layers"> {{-- .gameplay --}}
                  <h4>{!! trans('howto-sicbo.gameplay_header') !!}</h4>

                  <ul class="gameplay-list gameplay-list--2">
                    {!! trans('howto-sicbo.gameplay_body') !!}
                  </ul>
                  <p>{!! trans('howto-sicbo.gameplay_body2') !!}</p>
                </div> {{-- // .gameplay --}}

                <div id="typesofbet-sicbo" class="howto--layers"> {{-- .type-of-bets --}}
                  <!-- {!! trans('howto-sicbo.typesofbets_body') !!} -->
                  <h4 id="sicbo-typeofbets">{!! trans('howto-sicbo.typesofbets_header') !!}</h4>
                  <p><img class="sicbo-img" src="/img/howtoplay/sicbo/dark/types_of_bet_figure.png" alt="types of bet figure" /></p>
                  <table class="tbl--typeofbets ">
                    <thead>
                      <tr>
                        <th class="wager">{!! trans('howto-sicbo.wager_header') !!}</th>
                        <th class="payout">{!! trans('howto-sicbo.payout_header') !!}</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.big') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_1') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.small') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_2') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.odd') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_3') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.even') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_4') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.sum4') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_5') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.sum5') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_6') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.sum6') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_7') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.sum7') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_8') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.sum8') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_9') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.sum9') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_10') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.sum10') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_11') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.triple') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_12') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.anytriple') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_13') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.pair') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_14') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.domino') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_15') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.four') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_16') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.singledice1') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_17') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.singledice2') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_18') !!}</td>
                      </tr>

                      <tr>
                        <td class="wager">{!! trans('howto-sicbo.singledice3') !!}</td>
                        <td class="payout">{!! trans('howto-sicbo.payout_19') !!}</td>
                      </tr>
                    </tbody>
                  </table>
                </div> {{--  //.type-of-bets --}}
              </div> {{-- // .howto-contents --}}
            </div> {{-- // .howto-wrap__items --}}

            {{-- paste here --}}
          </div> {{-- // .howto-wrap --}}
        </div> {{-- //sicbo-toggle--}}
        <div id="baccarat-toggle" class="ingame-howtoplay"> {{--baccarat-toggle--}}
          <!-- <a href="#topContents"></a> -->
          <div id="top" class="howto-wrap dom-resizable"> {{-- .howto-wrap --}}
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
                    <a href="#game-objective" class="menu-game-scroll">{!! trans('howto-baccarat.game_objective') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#baccarat-cardvalues" class="menu-game-scroll">{!! trans('howto-baccarat.card_values') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#baccarat-typesofbaccarat" class="menu-game-scroll">{!! trans('howto-baccarat.types_baccarat') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#baccarat-gameplay" class="menu-game-scroll">{!! trans('howto-baccarat.game_play') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#baccarat-cardhit" class="menu-game-scroll">{!! trans('howto-baccarat.3_card_hit') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#baccarat-cardpositioning" class="menu-game-scroll">{!! trans('howto-baccarat.card_positioning') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#baccarat-flippytable" class="menu-game-scroll">{!! trans('howto-baccarat.flippy_table') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#baccarat-classictable" class="menu-game-scroll">{!! trans('howto-baccarat.classic_table') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#baccarat-supersixtable" class="menu-game-scroll">{!! trans('howto-baccarat.supersix_table') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#baccarat-dragonbonustable" class="menu-game-scroll">{!! trans('howto-baccarat.dragonbonus_table') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                    <a href="#baccarat-bigsmalltable" class="menu-game-scroll">{!! trans('howto-baccarat.bigsmall_table') !!}</a>
                  </li>
                  <li class="gamerules-menu__items">
                      <a href="#baccarat-dragonbonus_win_sample" class="menu-game-scroll">{!! trans('howto-baccarat.dragonbonus_win_sample') !!}</a>
                  </li>
                  {{-- <li class="gamerules-menu__items">
                  <a href="#baccarat-speedflippytable" class="menu-game-scroll">{!! trans('howto-baccarat.speedy_flippy_table_baccarat') !!}</a>
                  </li> --}}
                </ul> {{-- // .gamerules-menu --}}
              </div> {{-- // .howto-submenu --}}

              <div class="howto-contents"> {{-- .howto-contents --}}
                <div id="game-objective" class="howto--layers"> {{--howto--layers--}}
                  {!! trans('howto-baccarat.game_objective_desc') !!}
                </div> {{--// owto--layers--}}
                <div id="baccarat-cardvalues" class="howto--layers "> {{--howto--layers--}}
                  <h4>{!! trans('howto-baccarat.card_values') !!}</h4>
                </div> {{--// owto--layers--}}
                <div class="howto--layers card-values clearfix"> {{-- #howto--layers --}}
                  <div class="card-values-con clearfix">
                    <div class="card-values__items -thumb -thumb1">
                      <img src="/img/howtoplay/baccarat/dark/card_value_1.png" alt="card value" />
                    </div>

                    <div class="card-values__items -desc">
                      <p>{!! trans('howto-baccarat.card_values_1') !!}</p>
                    </div>
                  </div>
                  <div class="card-values-con clearfix">
                    <div class="card-values__items -thumb -thumb2">
                      <img src="/img/howtoplay/baccarat/dark/card_value_2.png" alt="card value" />
                    </div>

                    <div class="card-values__items -desc">
                      <p>{!! trans('howto-baccarat.card_values_2') !!}</p>
                    </div>
                  </div>
                  <div class="card-values-con clearfix">
                    <div class="card-values__items -thumb -thumb3">
                      <img src="/img/howtoplay/baccarat/dark/card_value_3.png" alt="card value" />
                    </div>

                    <div class="card-values__items -desc">
                      <p>{!! trans('howto-baccarat.card_values_3') !!}</p>
                    </div>
                  </div>
                </div> {{-- // #howto--layers --}}
                <div id="baccarat-typesofbaccarat" class="howto--layers gameplay-list"> {{--howto--layers--}}
                  {!! trans('howto-baccarat.game_play_list') !!}
                </div> {{--// owto--layers--}}
                <div id="baccarat-gameplay" class="howto--layers gameplay-list"> {{--howto--layers--}}
                  {!! trans('howto-baccarat.game_play_list_2') !!}
                </div> {{--// owto--layers--}}
                <div id="baccarat-cardhit" class="howto--layers"> {{--howto--layers--}}
                  <h4>{!! trans('howto-baccarat.3_card_hit') !!}</h4>
                  {!! trans('howto-baccarat.3_card_hit_desc') !!}
                </div> {{--// owto--layers--}}
                <div class="howto--layers"> {{--howto--layers--}}
                  <h5>{!! trans('howto-baccarat.player_hand') !!}</h5>
                  <table class="tbl--rules">
                    <thead>
                      <tr>
                        <th class="rules--card-value">{!! trans('howto-baccarat.total_card_value') !!}</th>
                        <th class="rules--action">{!! trans('howto-baccarat.action') !!}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{!! trans('howto-baccarat.total_card_value_1') !!}</td>
                        <td>{!! trans('howto-baccarat.action_1') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.total_card_value_2') !!}</td>
                        <td>{!! trans('howto-baccarat.action_2') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.total_card_value_3') !!}</td>
                        <td>{!! trans('howto-baccarat.action_3') !!}</td>
                      </tr>
                    </tbody>
                  </table>
                </div> {{--// owto--layers--}}
                <div class="howto--layers banker-hand-pc"> {{--howto--layers--}}
                  <h5>{!! trans('howto-baccarat.banker_hand') !!}</h5>
                  <table class="tbl--rules">
                    <thead>
                      <tr>
                        <th class="rules--card-value">{!! trans('howto-baccarat.total_card_value') !!}</th>
                        <th colspan="2" class="rules--player-card">{!! trans('howto-baccarat.player_3_card') !!}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{!! trans('howto-baccarat.banker_hand_card_value_1') !!}</td>
                        <td>{!! trans('howto-baccarat.player_3_card_hit_1') !!}</td>
                        <td>{!! trans('howto-baccarat.player_3_card_stand_1') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.banker_hand_card_value_2') !!}</td>
                        <td>{!! trans('howto-baccarat.player_3_card_hit_2') !!}</td>
                        <td>{!! trans('howto-baccarat.player_3_card_stand_2') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.banker_hand_card_value_3') !!}</td>
                        <td>{!! trans('howto-baccarat.player_3_card_hit_3') !!}</td>
                        <td>{!! trans('howto-baccarat.player_3_card_stand_3') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.banker_hand_card_value_4') !!}</td>
                        <td>{!! trans('howto-baccarat.player_3_card_hit_4') !!}</td>
                        <td>{!! trans('howto-baccarat.player_3_card_stand_4') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.banker_hand_card_value_5') !!}</td>
                        <td colspan="2">{!! trans('howto-baccarat.stand') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.banker_hand_card_value_6') !!}</td>
                        <td colspan="2">{!! trans('howto-baccarat.natural_hit') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.banker_hand_card_value_7') !!}</td>
                        <td colspan="2">{!! trans('howto-baccarat.hit') !!}</td>
                      </tr>
                    </tbody>
                  </table>
                </div> {{--// owto--layers--}}
                <div id="baccarat-cardpositioning" class="howto--layers"> {{--howto--layers--}}
                  <h4>{!! trans('howto-baccarat.card_positioning') !!}</h4>

                  <div class="card-positioning-wrap clearfix">
                    <div class="card-positioning__items card-positioning__items-pc clearfix">
                      <div class="card-positioning-inner">
                        <div class="card-positioning-con">
                          <span>{!! trans('howto-baccarat.card_positioning_1') !!}</span>
                          <div>
                            <img src="/img/howtoplay/baccarat/dark/card_position_1.png" alt="9 hearts">
                          </div>
                        </div>
                        <div class="card-positioning-con">
                          <span>{!! trans('howto-baccarat.card_positioning_2') !!}</span>
                          <div>
                            <img src="/img/howtoplay/baccarat/dark/card_position_2.png" alt="king spade">
                          </div>
                        </div>
                        <div class="card-positioning-con">
                          <span>{!! trans('howto-baccarat.card_positioning_3') !!}</span>
                          <div>
                            <img src="/img/howtoplay/baccarat/dark/card_position_3.png" alt="ace heart">
                          </div>
                        </div>
                      </div>
                      <div class="card-positioning-lbl">
                        <span>{!! trans('howto-baccarat.banker') !!}</span>
                      </div>
                    </div>
                    <div class="card-positioning__items card-positioning__items-pc clearfix">
                      <div class="card-positioning-inner">
                        <div class="card-positioning-con">
                          <span>{!! trans('howto-baccarat.card_positioning_4') !!}</span>
                          <div>
                            <img src="/img/howtoplay/baccarat/dark/card_position_4.png" alt="9 hearts">
                          </div>

                        </div>
                        <div class="card-positioning-con">
                          <span>{!! trans('howto-baccarat.card_positioning_5') !!}</span>
                          <div>
                            <img src="/img/howtoplay/baccarat/dark/card_position_5.png" alt="king spade">
                          </div>
                        </div>
                        <div class="card-positioning-con">
                          <span>{!! trans('howto-baccarat.card_positioning_6') !!}</span>
                          <div>
                            <img src="/img/howtoplay/baccarat/dark/card_position_6.png" alt="ace heart">
                          </div>
                        </div>
                      </div>
                      <div class="card-positioning-lbl">
                        <span>{!! trans('howto-baccarat.player') !!}</span>
                      </div>
                    </div>
                  </div>
                </div> {{--// owto--layers--}}

                <div id="baccarat-flippytable" class="howto--layers"> {{--howto--layers--}}
                  <h4>{!! trans('howto-baccarat.flippy_table') !!}</h4>
                  <table class="tbl--rules">
                    <thead>
                      <tr>
                        <th class="rules--card-value">{!! trans('howto-baccarat.action') !!}</th>
                        <th class="rules--action">{!! trans('howto-baccarat.time_peek') !!}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{!! trans('howto-baccarat.flippy_action_1') !!}</td>
                        <td>{!! trans('howto-baccarat.time_peek_1') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.flippy_action_2') !!}</td>
                        <td>{!! trans('howto-baccarat.time_peek_2') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.flippy_action_3') !!}</td>
                        <td>{!! trans('howto-baccarat.time_peek_3') !!}</td>
                      </tr>
                    </tbody>
                  </table>
                </div> {{--// owto--layers--}}

                <div id="baccarat-classictable" class="howto--layers"> {{--howto--layers--}}
                  <h4>{!! trans('howto-baccarat.classic_table') !!}</h4>
                  <table class="tbl--rules">
                    <thead>
                      <tr>
                        <th class="rules--card-value">{!! trans('howto-baccarat.bet_on') !!}</th>
                        <th class="rules--action">{!! trans('howto-baccarat.payout') !!}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{!! trans('howto-baccarat.classic_beton_1') !!}</td>
                        <td>{!! trans('howto-baccarat.classic_result_1') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.classic_beton_2') !!}</td>
                        <td>{!! trans('howto-baccarat.classic_result_2') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.classic_beton_3') !!}</td>
                        <td>{!! trans('howto-baccarat.classic_result_3') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.classic_beton_4') !!}</td>
                        <td>{!! trans('howto-baccarat.classic_result_4') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.classic_beton_5') !!}</td>
                        <td>{!! trans('howto-baccarat.classic_result_5') !!}</td>
                      </tr>
                    </tbody>
                  </table>
                </div> {{--// owto--layers--}}
                <div id="baccarat-supersixtable" class="howto--layers"> {{--howto--layers--}}
                  <h4>{!! trans('howto-baccarat.supersix_table') !!}</h4>
                  <table class="tbl--rules">
                    <thead>
                      <tr>
                        <th class="rules--card-value">{!! trans('howto-baccarat.bet_on') !!}</th>
                        <th class="rules--action">{!! trans('howto-baccarat.payout') !!}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{!! trans('howto-baccarat.supersix_beton_1') !!}</td>
                        <td>{!! trans('howto-baccarat.supersix_result_1') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.supersix_beton_2') !!}</td>
                        <td>{!! trans('howto-baccarat.supersix_result_2') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.supersix_beton_3') !!}</td>
                        <td>{!! trans('howto-baccarat.supersix_result_3') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.supersix_beton_4') !!}</td>
                        <td>{!! trans('howto-baccarat.supersix_result_4') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.supersix_beton_5') !!}</td>
                        <td>{!! trans('howto-baccarat.supersix_result_5') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.supersix_beton_6') !!}</td>
                        <td>{!! trans('howto-baccarat.supersix_result_6') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.supersix_beton_7') !!}</td>
                        <td>{!! trans('howto-baccarat.supersix_result_7') !!}</td>
                      </tr>
                    </tbody>
                  </table>
                </div> {{--// owto--layers--}}
                <div id="baccarat-dragonbonustable" class="howto--layers"> {{--howto--layers--}}
                  <h4>{!! trans('howto-baccarat.dragonbonus_table') !!}</h4>
                  <table class="tbl--rules">
                    <thead>
                      <tr>
                        <th class="rules--card-value">{!! trans('howto-baccarat.bet_on') !!}</th>
                        <th class="rules--action">{!! trans('howto-baccarat.payout') !!}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{!! trans('howto-baccarat.dragonbonus_beton_1') !!}</td>
                        <td>{!! trans('howto-baccarat.dragonbonus_result_1') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.dragonbonus_beton_2') !!}</td>
                        <td>{!! trans('howto-baccarat.dragonbonus_result_2') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.dragonbonus_beton_3') !!}</td>
                        <td>{!! trans('howto-baccarat.dragonbonus_result_3') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.dragonbonus_beton_4') !!}</td>
                        <td>{!! trans('howto-baccarat.dragonbonus_result_4') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.dragonbonus_beton_5') !!}</td>
                        <td>{!! trans('howto-baccarat.dragonbonus_result_5') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.dragonbonus_beton_6') !!}</td>
                        <td>{!! trans('howto-baccarat.dragonbonus_result_6') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.dragonbonus_beton_7') !!}</td>
                        <td>{!! trans('howto-baccarat.dragonbonus_result_7') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.dragonbonus_beton_8') !!}</td>
                        <td>{!! trans('howto-baccarat.dragonbonus_result_8') !!}</td>
                      </tr>
                    </tbody>
                  </table>
                </div> {{--// owto--layers--}}
                <div id="baccarat-bigsmalltable" class="howto--layers"> {{--howto--layers--}}
                  <h4>{!! trans('howto-baccarat.bigsmall_table') !!}</h4>
                  <table class="tbl--rules">
                    <thead>
                      <tr>
                        <th class="rules--card-value">{!! trans('howto-baccarat.bet_on') !!}</th>
                        <th class="rules--action">{!! trans('howto-baccarat.payout') !!}</th>
                        <th class="rules--action">{!! trans('howto-baccarat.condition') !!}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{!! trans('howto-baccarat.bigsmall_beton_1') !!}</td>
                        <td>{!! trans('howto-baccarat.bigsmall_result_1') !!}</td>
                        <td>{!! trans('howto-baccarat.bigsmall_condition_1') !!}</td>
                      </tr>
                      <tr>
                        <td>{!! trans('howto-baccarat.bigsmall_beton_2') !!}</td>
                        <td>{!! trans('howto-baccarat.bigsmall_result_2') !!}</td>
                        <td>{!! trans('howto-baccarat.bigsmall_condition_2') !!}</td>
                      </tr>
                    </tbody>
                  </table>
                </div> {{--// owto--layers--}}
                <div id="baccarat-dragonbonus_win_sample" class="howto--layers"> {{--howto--layers--}}
                  <!-- <h4>{!! trans('howto-baccarat.dragonbonus_win_sample') !!}</h4> -->
                  {!! trans('howto-baccarat.dragonbonus_win_sample_list') !!}
                </div>
              </div> {{-- // .howto-contents --}}
            </div> {{-- // .howto-wrap__items --}}
            {{-- paste here --}}
          </div> {{-- // .howto-wrap --}}
        </div> {{-- //baccarat-toggle--}}
      </div> {{-- // content-container--}}
      <div class="ka-wrap "> {{--ka-wrap--}}
          <div class="ka-inner "> {{--ka-inner--}}
              <div class="ka-prompt dom-resizable">
                  <div class="ka-prompt-con">
                      <img src="/img/reel-tutorial/ico_warning.png" alt="">
                      <p>{!! trans('reelpopup.reel-prompt') !!}</p>
                  </div>
                  <div class="ka-prompt-btn">
                      <span>OK</span>
                  </div>
              </div>
              <div class="ka-prompt-reel dom-resizable">
                  <div class="ka-prompt-con">
                      <img src="/img/reel_popup.png" alt="reel-popup">
                      <p>{!! trans('ingame.promptnoreel') !!}</p>
                  </div>
                  <div class="ka-prompt-btn-reel">
                      <span>OK</span>
                  </div>
              </div>
              <div class="ka-con dom-resizable">
                  <div class="ka__head">
                      <h4>{{(trans('reelpopup.reel-title-head'))}}</h4>
                     <i id="ka-close" class="ico-close"></i>
                  </div>
                  <div class="ka__body">
                      <p>{{(trans('reelpopup.reel-desc'))}}</p>
                      <div class="ka-slider-con">
                        <ul class="slider-chrome"> {{--slider-chrome--}}
                            <li class="first-slide">
                                <p>{{(trans('reelpopup.reel-slide-alert'))}}</p>
                                {!! trans('reelpopup.reel-prompt-img') !!}
                            </li>
                            <li>
                                <p>{{(trans('reelpopup.reel-chrome2'))}}</p>
                                <img src="/img/reel-tutorial/chrome2.png" alt="">
                            </li>
                            <li>
                                <p>{{(trans('reelpopup.reel-chrome3'))}}</p>
                                <img src="/img/reel-tutorial/chrome3.png" alt="">
                            </li>
                            <li>
                                <p>{{(trans('reelpopup.reel-chrome4'))}}</p>
                                <img src="/img/reel-tutorial/chrome4.png" alt="">
                            </li>
                        </ul> {{--// slider-chrome--}}

                        <ul class="slider-firefox"> {{--slider-firefox--}}
                            <li class="first-slide">
                                <p>{{(trans('reelpopup.reel-slide-alert'))}}</p>
                                {!! trans('reelpopup.reel-prompt-img') !!}
                            </li>
                            <li>
                                <p>{{(trans('reelpopup.reel-firefox2'))}}</p>
                                <img src="/img/reel-tutorial/firefox2.png" alt="">
                            </li>
                            <li>
                                <p>{{(trans('reelpopup.reel-firefox3'))}}</p>
                                <img src="/img/reel-tutorial/firefox3.png" alt="">
                            </li>
                        </ul> {{--// slider-firefox--}}

                        <ul class="slider-ie"> {{--slider-ie--}}
                            <li class="first-slide">
                                <p>{!! trans('reelpopup.reel-slide-alert') !!}</p>
                                {!! trans('reelpopup.reel-prompt-img') !!}
                            </li>
                            <li>
                                <p>{!! trans('reelpopup.reel-ie2') !!}</p>
                                <img src="/img/reel-tutorial/ie2.png" alt="">
                            </li>
                            <li>
                                <p>{!! trans('reelpopup.reel-ie2') !!}</p>
                                <img src="/img/reel-tutorial/ie3.png" alt="">
                            </li>
                        </ul> {{--// slider-ie--}}
                        <div class="prev-button"></div>
                        <div class="next-button"></div>
                      </div>
                  </div>
              </div>

          </div> {{-- // ka-inner--}}
      </div> {{--ka-wrap--}}
    </div> {{-- // .container --}}

    <div class="maintenanceOverlay"> {{--maintenanceOverlay--}}
        <div class="maintenanceBg"></div>
        <div class="nihtanLogo"></div>
        <div class="patternLeft"></div>
        <div class="patternRight"></div>
        <div class="maintenanceLogo"></div>
        <div class="mainText">{{(trans('ingame.maintextCap2'))}}</div>
        <div class="subText">{{ trans('ingame.subtextCap2') }}</div>
        <div class="schedule"></div>
    </div> {{--maintenanceOverlay--}}
</body>

<script type="text/javascript">
  // var toggle;
  // var _this;
  // var betHistory = null;
  // var transHistory = null;
  // var popupHowto = null;
  // var mainStage = null;
  // var bannerCanvas = null;
  // var hotCanvas = null;
  // var popupSettings = null;
  // var confirmationModal = null;

  // var finished_load = false;
  // var _global = {};
  // createjs.Ticker.addEventListener("tick",function (e) {
  //     if(finished_load) {
  //         // window.stage2.update(e)
  //         // window.stage1.update(e);
  //         mainStage.update(e)
  //         betHistory.update(e)
  //         transHistory.update(e)
  //         popupHowto.update(e)
  //         bannerCanvas.update(e)
  //         hotCanvas.update(e)
  //         popupSettings.update(e)
  //         confirmationModal.update(e)
  //     }
  // });
  var toggle = {};



    var resize = function (newWidth, newHeight) {
        var baseRatio = 1920 / 1080,
        newRatio = newWidth / newHeight;

        if(newRatio > baseRatio) {
        newWidth = newHeight * baseRatio;
        } else {
        newHeight = newWidth / baseRatio;
        }

        let container = document.getElementsByClassName("container")[0];
        container.style.width = newWidth;
        container.style.height = newHeight;

        let c_container = document.getElementsByClassName("canvas-container")[0];
        c_container.style.width = newWidth;
        c_container.style.height = newHeight;

        let wrapper = document.getElementsByClassName("wrapper")[0];
        wrapper.style.width = newWidth;
        wrapper.style.height = newHeight;

        let d_resizable = document.getElementsByClassName("dom-resizable");

        for (var i = 0; i < d_resizable.length; i++) {
            d_resizable[i].style.transform = "scale(" + (newWidth / 1920) + ") ";
        }

        let wrapper_outer = document.getElementsByClassName("wrapper--outer")[0];
        wrapper_outer.style.transform = "scale(" + (newWidth / 1920) + ") ";
    }
    resize(window.innerWidth, window.innerHeight);
</script>
<script type="text/javascript" src="/osmf/swfobject.min.js"></script>
<script type="text/javascript" src ="/dist/main-2.js"></script>
<!-- <script type="text/javascript" src="/js/dom-events.js"></script> -->
<script type="text/javascript" src="/js/dom-events-2.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js"></script>
<script>
  $(document).ready(function(){

      $(this).hover(function() {
          $(this).mousemove(function(e){
              var posX = e.pageX / $(document).width() * 100 - 50;
              var posY = e.pageY / $(document).height() * 100 - 50;

              $('.card').css({
                  '-ms-transform': 'perspective(500px) rotateY( '+ 0.20 * posX +'deg ) rotateX( '+ 0.20 * posY +'deg )',
                  '-o-transform': 'perspective(500px) rotateY( '+ 0.20 * posX +'deg ) rotateX( '+ 0.20 * posY +'deg )',
                  '-moz-transform': 'perspective(500px) rotateY( '+ 0.20 * posX +'deg ) rotateX( '+ 0.20 * posY +'deg )',
                  '-webkit-transform': 'perspective(500px) rotateY( '+ 0.20 * posX +'deg ) rotateX( '+ 0.20 * posY +'deg )',
                  'transform': 'perspective(500px) rotateY( '+ 0.20 * posX +'deg ) rotateX( '+ 0.20 * posY +'deg )'
              })
          });
      }, function() {
          $('.card').css({
              '-ms-transform': 'perspective(500px) rotateY(0deg) rotateX(0deg)',
              '-o-transform': 'perspective(500px) rotateY(0deg) rotateX(0deg)',
              '-moz-transform': 'perspective(500px) rotateY(0deg) rotateX(0deg)',
              '-webkit-transform': 'perspective(500px) rotateY(0deg) rotateX(0deg)',
              'transform': 'perspective(500px) rotateY(0deg) rotateX(0deg)'
          })
      });

  });

  // if(parseInt(JSON.parse(window.maintenance).status)) {
  //     $(".maintenanceOverlay").show();
  // }
</script>
</html>
