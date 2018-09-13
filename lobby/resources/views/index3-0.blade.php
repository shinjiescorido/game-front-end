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

  @if($junket == 2)
    <script src="/js/datepicker/jquery.js"></script>
    <script src="/js/datepicker/jquery.datetimepicker.full.js"></script>
  @endif

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
      tutorial: '{{ $tutorial_enabled }}',
      music: '{{ $config->avarta->sound->music }}',
      bgm: '{{ $config->avarta->music }}'
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
    window.vendorSound = '{{ $vendor->is_sound }}';

    window.isJunket =   {{ $junket }};
    window.junketAuth = {!! json_encode($vendor->junket_auth) !!};
    window.vendorName = '{{ $vendor->vendor_name }}';
    window.vendorEndDate = '{{ $vendor->junket_end_date }}';
    window.vendorTables = '{!! $vendor->junket_table !!}';
    //agent range
    window.agent_range =  {!! $agentRange !!};

    window.bcSetting =  {!! $baccaratBetSetting !!};
    window.vendorData = {!! $vendorData !!};
    window.pc_redirect_url = '{!! $pc_redirect_url !!}';

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

        nodata 				      : '{{ trans('ingame.nodata') }}',

        bankercaps 			: '{{ trans('ingame.bankercaps') }}',
        heavencaps 			: '{{ trans('ingame.heavencaps') }}',
        upcaps 				: '{{ trans('ingame.upcaps') }}',
        downcaps 			: '{{ trans('ingame.downcaps') }}'

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
        availablemaximumbets : '{{ trans('ingame.availablemaximumbets') }}'
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
        latestresultcaps 	: '{{ trans('ingame.latestresultcaps') }}',
        small 			      : '{{ trans('ingame.small') }}',
        big 			        : '{{ trans('ingame.big') }}',
        triple 			      : '{{ trans('ingame.triple') }}'
      },
      dragontiger: {
        dragonwins      : '{{ trans('ingame.dragonwins') }}',
        tigerwins       : '{{ trans('ingame.tigerwins') }}',
        tiewins         : '{{ trans('ingame.tie') }}',
        suitedtiewins   : '{{ trans('ingame.suitedtie') }}'
      },
      baccarat: {
        bankerwins      : '{{ trans('ingame.bankerwins') }}',
        playerwins      : '{{ trans('ingame.playerwins') }}',
        tiewins         : '{{ trans('ingame.tie') }}'
      },

      rooms : {
        roomname : '{{trans('ingame.room_name')}}',
        classic : '{{trans('ingame.classic')}}',
        cancel : '{{trans('ingame.cancel')}}',
      }
    }

    window.language2 = {
      locale: '{{ App::getLocale() }}',

      /***** Lobby ******/
      // Game Names
      lobby_gamename_baccarat: '{{trans('ingame-web.lobby_gamename_baccarat')}}',
      lobby_gamename_flippybaccarat: '{{trans('ingame-web.lobby_gamename_flippybaccarat')}}',
      lobby_gamename_supersix: '{{trans('ingame-web.lobby_gamename_supersix')}}',
      lobby_gamename_dragonbonus: '{{trans('ingame-web.lobby_gamename_dragonbonus')}}',
      lobby_gamename_sicbo: '{{trans('ingame-web.lobby_gamename_sicbo')}}',
      lobby_gamename_poker: '{{trans('ingame-web.lobby_gamename_poker')}}',
      lobby_gamename_texasholdem: '{{trans('ingame-web.lobby_gamename_texasholdem')}}',
      lobby_gamename_texasholdembonusplus: '{{trans('ingame-web.lobby_gamename_texasholdembonusplus')}}',
      lobby_gamename_dragontiger: '{{trans('ingame-web.lobby_gamename_dragontiger')}}',
      lobby_gamename_paigow: '{{trans('ingame-web.lobby_gamename_paigow')}}',
      lobby_gamename_crazypaigow: '{{trans('ingame-web.lobby_gamename_crazypaigow')}}',
      lobby_gamename_redwhite: '{{trans('ingame-web.lobby_gamename_redwhite')}}',
      lobby_gamename_roulette: '{{trans('ingame-web.lobby_gamename_roulette')}}',
      lobby_gamename_europeanroulette: '{{trans('ingame-web.lobby_gamename_europeanroulette')}}',

      // Header
      lobby_header_baccarat: '{{trans('ingame-web.lobby_header_baccarat')}}',
      lobby_header_othergames: '{{trans('ingame-web.lobby_header_othergames')}}',
      lobby_header_reelgames: '{{trans('ingame-web.lobby_header_reelgames')}}',
      lobby_header_classic: '{{trans('ingame-web.lobby_header_classic')}}',
      lobby_header_rooms: '{{trans('ingame-web.lobby_header_rooms')}}',
      lobby_header_sicborooms: '{{trans('ingame-web.lobby_header_sicborooms')}}',
      lobby_header_paigowrooms: '{{trans('ingame-web.lobby_header_paigowrooms')}}',
      lobby_header_multibet: '{{trans('ingame-web.lobby_header_multibet')}}',
      lobby_header_howtoplay: '{{trans('ingame-web.lobby_header_howtoplay')}}',
      lobby_header_bethistory: '{{trans('ingame-web.lobby_header_bethistory')}}',
      lobby_header_transactions: '{{trans('ingame-web.lobby_header_transactions')}}',
      lobby_header_transactionhistory: '{{trans('ingame-web.lobby_header_transactionhistory')}}',
      lobby_header_settings: '{{trans('ingame-web.lobby_header_settings')}}',
      lobby_header_username: '{{trans('ingame-web.lobby_header_username')}}',
      lobby_header_logout: '{{trans('ingame-web.lobby_header_logout')}}',
      lobby_header_junket: '{{trans('ingame-web.lobby_header_junket')}}',

      // Settings
      lobby_settings_video: '{{trans('ingame-web.lobby_settings_video')}}',
      lobby_settings_videoquality: '{{trans('ingame-web.lobby_settings_videoquality')}}',
      lobby_settings_hd: '{{trans('ingame-web.lobby_settings_hd')}}',
      lobby_settings_sd: '{{trans('ingame-web.lobby_settings_sd')}}',
      lobby_settings_sound: '{{trans('ingame-web.lobby_settings_sound')}}',
      lobby_settings_dealersvoice: '{{trans('ingame-web.lobby_settings_dealersvoice')}}',
      lobby_settings_gamesound: '{{trans('ingame-web.lobby_settings_gamesound')}}',
      lobby_settings_display: '{{trans('ingame-web.lobby_settings_display')}}',
      lobby_settings_darktheme: '{{trans('ingame-web.lobby_settings_darktheme')}}',
      lobby_settings_showtutorial: '{{trans('ingame-web.lobby_settings_showtutorial')}}',
      lobby_settings_language: '{{trans('ingame-web.lobby_settings_language')}}',
      lobby_settings_avatar: '{{trans('ingame-web.lobby_settings_avatar')}}',
      lobby_settings_music: '{{trans('ingame-web.lobby_settings_music')}}',

      // Baccarat Page
      lobby_baccaratpage_main: '{{trans('ingame-web.lobby_baccaratpage_main')}}',
      lobby_baccaratpage_premium: '{{trans('ingame-web.lobby_baccaratpage_premium')}}',
      lobby_baccaratpage_vip: '{{trans('ingame-web.lobby_baccaratpage_vip')}}',
      lobby_baccaratpage_flippymain: '{{trans('ingame-web.lobby_baccaratpage_flippymain')}}',
      lobby_baccaratpage_flippyvip: '{{trans('ingame-web.lobby_baccaratpage_flippyvip')}}',
      lobby_baccaratpage_dealing: '{{trans('ingame-web.lobby_baccaratpage_dealing')}}',
      lobby_baccaratpage_nowbetting00: '{{trans('ingame-web.lobby_baccaratpage_nowbetting00')}}',
      lobby_baccaratpage_playerwins: '{{trans('ingame-web.lobby_baccaratpage_playerwins')}}',
      lobby_baccaratpage_bankerwins: '{{trans('ingame-web.lobby_baccaratpage_bankerwins')}}',
      lobby_baccaratpage_shuffling: '{{trans('ingame-web.lobby_baccaratpage_shuffling')}}',
      lobby_baccaratpage_player: '{{trans('ingame-web.lobby_baccaratpage_player')}}',
      lobby_baccaratpage_banker: '{{trans('ingame-web.lobby_baccaratpage_banker')}}',
      lobby_baccaratpage_singleplayer: '{{trans('ingame-web.lobby_baccaratpage_singleplayer')}}',
      lobby_baccaratpage_multiplayer: '{{trans('ingame-web.lobby_baccaratpage_multiplayer')}}',

      // Game Status
      lobby_gamestatus_nowbetting: '{{trans('ingame-web.lobby_gamestatus_nowbetting')}}',
      lobby_gamestatus_bettingend: '{{trans('ingame-web.lobby_gamestatus_bettingend')}}',
      lobby_gamestatus_nowdealing: '{{trans('ingame-web.lobby_gamestatus_nowdealing')}}',
      lobby_gamestatus_shoechange: '{{trans('ingame-web.lobby_gamestatus_shoechange')}}',
      lobby_gamestatus_maintenance: '{{trans('ingame-web.lobby_gamestatus_maintenance')}}',
      lobby_gamestatus_shaking: '{{trans('ingame-web.lobby_gamestatus_shaking')}}',

      /***** Common Subpages ******/
      // Settings
      com_sub_settings_video: '{{trans('ingame-web.com_sub_settings_video')}}',
      com_sub_settings_videoquality:'{{trans('ingame-web.com_sub_settings_videoquality')}}',
      com_sub_settings_hd:'{{trans('ingame-web.com_sub_settings_hd')}}',
      com_sub_settings_sd: '{{trans('ingame-web.com_sub_settings_sd')}}',
      com_sub_settings_sound:'{{trans('ingame-web.com_sub_settings_sound')}}',
      com_sub_settings_dealersvoice:'{{trans('ingame-web.com_sub_settings_dealersvoice')}}',
      com_sub_settings_gamesound: '{{trans('ingame-web.com_sub_settings_gamesound')}}',
      com_sub_settings_display:'{{trans('ingame-web.com_sub_settings_display')}}',
      com_sub_settings_darktheme:'{{trans('ingame-web.com_sub_settings_darktheme')}}',
      com_sub_settings_showtutorial: '{{trans('ingame-web.com_sub_settings_showtutorial')}}',
      com_sub_settings_language:'{{trans('ingame-web.com_sub_settings_language')}}',
      com_sub_settings_avatar:'{{trans('ingame-web.com_sub_settings_avatar')}}',
      com_sub_settings_music:'{{trans('ingame-web.com_sub_settings_music')}}',

      // Bet layout
      com_sub_betlayout_singleplayer:'{{trans('ingame-web.com_sub_betlayout_singleplayer')}}',
      com_sub_betlayout_multiplayer: '{{trans('ingame-web.com_sub_betlayout_multiplayer')}}',

      // Menu Area
      com_sub_menuarea_betlogs:'{{trans('ingame-web.com_sub_menuarea_betlogs')}}',
      com_sub_menuarea_gameno:'{{trans('ingame-web.com_sub_menuarea_gameno')}}',
      com_sub_menuarea_date:'{{trans('ingame-web.com_sub_menuarea_date')}}',
      com_sub_menuarea_dealername: '{{trans('ingame-web.com_sub_menuarea_dealername')}}',
      com_sub_menuarea_totalbet:'{{trans('ingame-web.com_sub_menuarea_totalbet')}}',
      com_sub_menuarea_channel:'{{trans('ingame-web.com_sub_menuarea_channel')}}',
      com_sub_menuarea_winlose: '{{trans('ingame-web.com_sub_menuarea_winlose')}}',
      com_sub_menuarea_newbalance:'{{trans('ingame-web.com_sub_menuarea_newbalance')}}',
      com_sub_menuarea_winningresult:'{{trans('ingame-web.com_sub_menuarea_winningresult')}}',
      com_sub_menuarea_gamevoid:'{{trans('ingame-web.com_sub_menuarea_gamevoid')}}',
      com_sub_menuarea_game: '{{trans('ingame-web.com_sub_menuarea_game')}}',
      com_sub_menuarea_bettype:'{{trans('ingame-web.com_sub_menuarea_bettype')}}',
      com_sub_menuarea_players:'{{trans('ingame-web.com_sub_menuarea_players')}}',
      com_sub_menuarea_bets: '{{trans('ingame-web.com_sub_menuarea_bets')}}',
      com_sub_menuarea_total:'{{trans('ingame-web.com_sub_menuarea_total')}}',
      com_sub_menuarea_rooms:'{{trans('ingame-web.com_sub_menuarea_rooms')}}',
      com_sub_menuarea_videosettings:'{{trans('ingame-web.com_sub_menuarea_videosettings')}}',
      com_sub_menuarea_refreshvideo:'{{trans('ingame-web.com_sub_menuarea_refreshvideo')}}',
      com_sub_menuarea_fullscreen:'{{trans('ingame-web.com_sub_menuarea_fullscreen')}}',
      com_sub_menuarea_multibet:'{{trans('ingame-web.com_sub_menuarea_multibet')}}',
      com_sub_menuarea_chat:'{{trans('ingame-web.com_sub_menuarea_chat')}}',
      com_sub_menuarea_userinfo:'{{trans('ingame-web.com_sub_menuarea_userinfo')}}',
      com_sub_menuarea_roominfo:'{{trans('ingame-web.com_sub_menuarea_roominfo')}}',
      com_sub_menuarea_howtoplay:'{{trans('ingame-web.com_sub_menuarea_howtoplay')}}',
      com_sub_menuarea_bethistory:'{{trans('ingame-web.com_sub_menuarea_bethistory')}}',
      com_sub_menuarea_settings:'{{trans('ingame-web.com_sub_menuarea_settings')}}',
      com_sub_menuarea_allgames:'{{trans('ingame-web.com_sub_menuarea_allgames')}}',

      // Rooms
      com_sub_rooms_roomnamehere:'{{trans('ingame-web.com_sub_rooms_roomnamehere')}}',
      com_sub_rooms_roomname:'{{trans('ingame-web.com_sub_rooms_roomname')}}',
      com_sub_rooms_totalbets:'{{trans('ingame-web.com_sub_rooms_totalbets')}}',
      com_sub_rooms_totalplayers:'{{trans('ingame-web.com_sub_rooms_totalplayers')}}',
      com_sub_rooms_minimumcapital:'{{trans('ingame-web.com_sub_rooms_minimumcapital')}}',
      com_sub_rooms_bankercapital:'{{trans('ingame-web.com_sub_rooms_bankercapital')}}',
      com_sub_rooms_username:'{{trans('ingame-web.com_sub_rooms_username')}}',
      com_sub_rooms_balance:'{{trans('ingame-web.com_sub_rooms_balance')}}',
      com_sub_rooms_changepassword:'{{trans('ingame-web.com_sub_rooms_changepassword')}}',
      com_sub_rooms_makepublic:'{{trans('ingame-web.com_sub_rooms_makepublic')}}',
      com_sub_rooms_inputnewroompassword:'{{trans('ingame-web.com_sub_rooms_inputnewroompassword')}}',
      com_sub_rooms_confirmpassword:'{{trans('ingame-web.com_sub_rooms_confirmpassword')}}',
      com_sub_rooms_cancel:'{{trans('ingame-web.com_sub_rooms_cancel')}}',
      com_sub_rooms_confirm:'{{trans('ingame-web.com_sub_rooms_confirm')}}',
      com_sub_rooms_backtolobby:'{{trans('ingame-web.com_sub_rooms_backtolobby')}}',
      com_sub_rooms_ok:'{{trans('ingame-web.com_sub_rooms_ok')}}',
      com_sub_rooms_yes:'{{trans('ingame-web.com_sub_rooms_yes')}}',
      com_sub_rooms_no:'{{trans('ingame-web.com_sub_rooms_no')}}',
      com_sub_rooms_removeroom:'{{trans('ingame-web.com_sub_rooms_removeroom')}}',
      com_sub_rooms_inputroompassword:'{{trans('ingame-web.com_sub_rooms_inputroompassword')}}',
      com_sub_rooms_removeroompassword:'{{trans('ingame-web.com_sub_rooms_removeroompassword')}}',
      com_sub_rooms_gameprogress:'{{trans('ingame-web.com_sub_rooms_gameprogress')}}',
      com_sub_rooms_closetheroom:'{{trans('ingame-web.com_sub_rooms_closetheroom')}}',
      com_sub_rooms_lowfunds:'{{trans('ingame-web.com_sub_rooms_lowfunds')}}',
      com_sub_rooms_notenoughbalance:'{{trans('ingame-web.com_sub_rooms_notenoughbalance')}}',
      com_sub_rooms_notenoughplayers:'{{trans('ingame-web.com_sub_rooms_notenoughplayers')}}',
      com_sub_rooms_bankerleftroom:'{{trans('ingame-web.com_sub_rooms_bankerleftroom')}}',
      com_sub_rooms_continuebetting:'{{trans('ingame-web.com_sub_rooms_continuebetting')}}',
      com_sub_rooms_removebybanker:'{{trans('ingame-web.com_sub_rooms_removebybanker')}}',

      // Bet Info Area
      com_sub_betinfoarea_betlimits:'{{trans('ingame-web.com_sub_betinfoarea_betlimits')}}',
      com_sub_betinfoarea_bettype:'{{trans('ingame-web.com_sub_betinfoarea_bettype')}}',
      com_sub_betinfoarea_min:'{{trans('ingame-web.com_sub_betinfoarea_min')}}',
      com_sub_betinfoarea_max:'{{trans('ingame-web.com_sub_betinfoarea_max')}}',
      com_sub_betinfoarea_payouts:'{{trans('ingame-web.com_sub_betinfoarea_payouts')}}',
      com_sub_betinfoarea_livebets:'{{trans('ingame-web.com_sub_betinfoarea_livebets')}}',
      com_sub_betinfoarea_bets:'{{trans('ingame-web.com_sub_betinfoarea_bets')}}',
      com_sub_betinfoarea_players:'{{trans('ingame-web.com_sub_betinfoarea_players')}}',
      com_sub_betinfoarea_total:'{{trans('ingame-web.com_sub_betinfoarea_total')}}',

      // Bottom Game Details
      com_sub_bottomgamedetails_bet:'{{trans('ingame-web.com_sub_bottomgamedetails_bet')}}',
      com_sub_bottomgamedetails_win:'{{trans('ingame-web.com_sub_bottomgamedetails_win')}}',
      com_sub_bottomgamedetails_modifychips:'{{trans('ingame-web.com_sub_bottomgamedetails_modifychips')}}',
      com_sub_bottomgamedetails_clearchips:'{{trans('ingame-web.com_sub_bottomgamedetails_clearchips')}}',
      com_sub_bottomgamedetails_applynow:'{{trans('ingame-web.com_sub_bottomgamedetails_applynow')}}',

      // Ingame Prompts
      com_sub_ingameprompts_gamenametable:'{{trans('ingame-web.com_sub_ingameprompts_gamenametable')}}',
      com_sub_ingameprompts_baccarattable:'{{trans('ingame-web.com_sub_ingameprompts_baccarattable')}}',
      com_sub_ingameprompts_nomorebets:'{{trans('ingame-web.com_sub_ingameprompts_nomorebets')}}',
      com_sub_ingameprompts_dealerchanged:'{{trans('ingame-web.com_sub_ingameprompts_dealerchanged')}}',
      com_sub_ingameprompts_maxbetexceeded:'{{trans('ingame-web.com_sub_ingameprompts_maxbetexceeded')}}',
      com_sub_ingameprompts_minimumbetrequired:'{{trans('ingame-web.com_sub_ingameprompts_minimumbetrequired')}}',
      com_sub_ingameprompts_shoechange:'{{trans('ingame-web.com_sub_ingameprompts_shoechange')}}',
      com_sub_ingameprompts_shuffling:'{{trans('ingame-web.com_sub_ingameprompts_shuffling')}}',
      com_sub_ingameprompts_burncard:'{{trans('ingame-web.com_sub_ingameprompts_burncard')}}',
      com_sub_ingameprompts_announcements:'{{trans('ingame-web.com_sub_ingameprompts_announcements')}}',
      com_sub_ingameprompts_alert:'{{trans('ingame-web.com_sub_ingameprompts_alert')}}',
      com_sub_ingameprompts_notbet7rounds:'{{trans('ingame-web.com_sub_ingameprompts_notbet7rounds')}}',
      com_sub_ingameprompts_antebetrequired:'{{trans('ingame-web.com_sub_ingameprompts_antebetrequired')}}',
      com_sub_ingameprompts_unabletochange:'{{trans('ingame-web.com_sub_ingameprompts_unabletochange')}}',
      com_sub_ingameprompts_betfailed:'{{trans('ingame-web.com_sub_ingameprompts_betfailed')}}',
      com_sub_ingameprompts_shoechanged:'{{trans('ingame-web.com_sub_ingameprompts_shoechanged')}}',
      com_sub_ingameprompts_tapactivatesound:'{{trans('ingame-web.com_sub_ingameprompts_tapactivatesound')}}',

      /***** Other Prompts ******/
      // Mobile
      other_prompts_mobile_fullscreen:'{{trans('ingame-web.other_prompts_mobile_fullscreen')}}',
      other_prompts_mobile_nodata:'{{trans('ingame-web.other_prompts_mobile_nodata')}}',
      other_prompts_mobile_flashplayer:'{{trans('ingame-web.other_prompts_mobile_flashplayer')}}',

      /***** Baccaarat ******/
      // Bet Layout
      baccarat_betlayout_player:'{{trans('ingame-web.baccarat_betlayout_player')}}',
      baccarat_betlayout_banker:'{{trans('ingame-web.baccarat_betlayout_banker')}}',
      baccarat_betlayout_tie:'{{trans('ingame-web.baccarat_betlayout_tie')}}',
      baccarat_betlayout_bankerpair:'{{trans('ingame-web.baccarat_betlayout_bankerpair')}}',
      baccarat_betlayout_playerpair:'{{trans('ingame-web.baccarat_betlayout_playerpair')}}',
      baccarat_betlayout_big:'{{trans('ingame-web.baccarat_betlayout_big')}}',
      baccarat_betlayout_small:'{{trans('ingame-web.baccarat_betlayout_small')}}',
      baccarat_betlayout_bonus:'{{trans('ingame-web.baccarat_betlayout_bonus')}}',
      baccarat_betlayout_classic:'{{trans('ingame-web.baccarat_betlayout_classic')}}',

      // Winning Display
      baccarat_winningdisplay_playerwins:'{{trans('ingame-web.baccarat_winningdisplay_playerwins')}}',
      baccarat_winningdisplay_bankerwins:'{{trans('ingame-web.baccarat_winningdisplay_bankerwins')}}',
      baccarat_winningdisplay_tie:'{{trans('ingame-web.baccarat_winningdisplay_tie')}}',
      baccarat_winningdisplay_bonusbaccarat:'{{trans('ingame-web.baccarat_winningdisplay_bonusbaccarat')}}',
      baccarat_winningdisplay_supersix:'{{trans('ingame-web.baccarat_winningdisplay_supersix')}}',
      baccarat_winningdisplay_dragonbonus:'{{trans('ingame-web.baccarat_winningdisplay_dragonbonus')}}',
      baccarat_winningdisplay_openall:'{{trans('ingame-web.baccarat_winningdisplay_openall')}}',
      baccarat_winningdisplay_open:'{{trans('ingame-web.baccarat_winningdisplay_open')}}',
      baccarat_winningdisplay_bankerpair:'{{trans('ingame-web.baccarat_winningdisplay_bankerpair')}}',
      baccarat_winningdisplay_playerpair:'{{trans('ingame-web.baccarat_winningdisplay_playerpair')}}',

      /***** Poker ******/
      // Bet Layout
      poker_betlayout_player:'{{trans('ingame-web.poker_betlayout_player')}}',
      poker_betlayout_dealer:'{{trans('ingame-web.poker_betlayout_dealer')}}',
      poker_betlayout_community:'{{trans('ingame-web.poker_betlayout_community')}}',
      poker_betlayout_ante:'{{trans('ingame-web.poker_betlayout_ante')}}',
      poker_betlayout_flop:'{{trans('ingame-web.poker_betlayout_flop')}}',
      poker_betlayout_turn:'{{trans('ingame-web.poker_betlayout_turn')}}',
      poker_betlayout_river:'{{trans('ingame-web.poker_betlayout_river')}}',
      poker_betlayout_check:'{{trans('ingame-web.poker_betlayout_check')}}',
      poker_betlayout_raise:'{{trans('ingame-web.poker_betlayout_raise')}}',
      poker_betlayout_classic:'{{trans('ingame-web.poker_betlayout_classic')}}',
      poker_betlayout_bonus:'{{trans('ingame-web.poker_betlayout_bonus')}}',
      poker_betlayout_bonusplus:'{{trans('ingame-web.poker_betlayout_bonusplus')}}',
      poker_betlayout_pocket:'{{trans('ingame-web.poker_betlayout_pocket')}}',

      // Winning Display
      poker_winningdisplay_playerwins:'{{trans('ingame-web.poker_winningdisplay_playerwins')}}',
      poker_winningdisplay_dealerwins:'{{trans('ingame-web.poker_winningdisplay_dealerwins')}}',
      poker_winningdisplay_royalflush:'{{trans('ingame-web.poker_winningdisplay_royalflush')}}',
      poker_winningdisplay_straightflush:'{{trans('ingame-web.poker_winningdisplay_straightflush')}}',
      poker_winningdisplay_fourofakind:'{{trans('ingame-web.poker_winningdisplay_fourofakind')}}',
      poker_winningdisplay_fullhouse:'{{trans('ingame-web.poker_winningdisplay_fullhouse')}}',
      poker_winningdisplay_flush:'{{trans('ingame-web.poker_winningdisplay_flush')}}',
      poker_winningdisplay_straight:'{{trans('ingame-web.poker_winningdisplay_straight')}}',
      poker_winningdisplay_threeofakind:'{{trans('ingame-web.poker_winningdisplay_threeofakind')}}',
      poker_winningdisplay_twopairs:'{{trans('ingame-web.poker_winningdisplay_twopairs')}}',
      poker_winningdisplay_pair:'{{trans('ingame-web.poker_winningdisplay_pair')}}',
      poker_winningdisplay_highcard:'{{trans('ingame-web.poker_winningdisplay_highcard')}}',
      poker_winningdisplay_tie:'{{trans('ingame-web.poker_winningdisplay_tie')}}',

      /***** Sicbo ******/
      // Bet Layout
      sicbo_betlayout_hot:'{{trans('ingame-web.sicbo_betlayout_hot')}}',
      sicbo_betlayout_cold:'{{trans('ingame-web.sicbo_betlayout_cold')}}',
      sicbo_betlayout_odd:'{{trans('ingame-web.sicbo_betlayout_odd')}}',
      sicbo_betlayout_even:'{{trans('ingame-web.sicbo_betlayout_even')}}',
      sicbo_betlayout_big:'{{trans('ingame-web.sicbo_betlayout_big')}}',
      sicbo_betlayout_small:'{{trans('ingame-web.sicbo_betlayout_small')}}',
      sicbo_betlayout_double:'{{trans('ingame-web.sicbo_betlayout_double')}}',
      sicbo_betlayout_triple:'{{trans('ingame-web.sicbo_betlayout_triple')}}',
      sicbo_betlayout_anytriple:'{{trans('ingame-web.sicbo_betlayout_anytriple')}}',
      sicbo_betlayout_1wins5:'{{trans('ingame-web.sicbo_betlayout_1wins5')}}',

      /***** Dragon Tiger ******/
      // Bet Layout
      dragontiger_betlayout_dragon:'{{trans('ingame-web.dragontiger_betlayout_dragon')}}',
      dragontiger_betlayout_tiger:'{{trans('ingame-web.dragontiger_betlayout_tiger')}}',
      dragontiger_betlayout_tie:'{{trans('ingame-web.dragontiger_betlayout_tie')}}',
      dragontiger_betlayout_even:'{{trans('ingame-web.dragontiger_betlayout_even')}}',
      dragontiger_betlayout_odd:'{{trans('ingame-web.dragontiger_betlayout_odd')}}',
      dragontiger_betlayout_big:'{{trans('ingame-web.dragontiger_betlayout_big')}}',
      dragontiger_betlayout_small:'{{trans('ingame-web.dragontiger_betlayout_small')}}',
      dragontiger_betlayout_suitedtie:'{{trans('ingame-web.dragontiger_betlayout_suitedtie')}}',

      // Winning Display
      dragontiger_winningdisplay_dragonwins:'{{trans('ingame-web.dragontiger_winningdisplay_dragonwins')}}',
      dragontiger_winningdisplay_tigerwins:'{{trans('ingame-web.dragontiger_winningdisplay_tigerwins')}}',
      dragontiger_winningdisplay_tie:'{{trans('ingame-web.dragontiger_winningdisplay_tie')}}',

      /***** Crazy Pai Gow ******/
      // Bet Layout
      paigow_betlayout_heaven:'{{trans('ingame-web.paigow_betlayout_heaven')}}',
      paigow_betlayout_banker:'{{trans('ingame-web.paigow_betlayout_banker')}}',
      paigow_betlayout_up:'{{trans('ingame-web.paigow_betlayout_up')}}',
      paigow_betlayout_down:'{{trans('ingame-web.paigow_betlayout_down')}}',
      paigow_betlayout_classic:'{{trans('ingame-web.paigow_betlayout_classic')}}',
      paigow_betlayout_bankermode:'{{trans('ingame-web.paigow_betlayout_bankermode')}}',
      paigow_betlayout_playermode:'{{trans('ingame-web.paigow_betlayout_playermode')}}',

      // Winning Display
      paigow_winningdisplay_bankerwins:'{{trans('ingame-web.paigow_winningdisplay_bankerwins')}}',
      paigow_winningdisplay_upwins:'{{trans('ingame-web.paigow_winningdisplay_upwins')}}',
      paigow_winningdisplay_playerwins:'{{trans('ingame-web.paigow_winningdisplay_playerwins')}}',
      paigow_winningdisplay_heavenwins:'{{trans('ingame-web.paigow_winningdisplay_heavenwins')}}',
      paigow_winningdisplay_downwins:'{{trans('ingame-web.paigow_winningdisplay_downwins')}}',
      paigow_winningdisplay_bankerpair:'{{trans('ingame-web.paigow_winningdisplay_bankerpair')}}',
      paigow_winningdisplay_uppair:'{{trans('ingame-web.paigow_winningdisplay_uppair')}}',
      paigow_winningdisplay_heavenpair:'{{trans('ingame-web.paigow_winningdisplay_heavenpair')}}',
      paigow_winningdisplay_downpair:'{{trans('ingame-web.paigow_winningdisplay_downpair')}}',
      paigow_winningdisplay_heavendownpair:'{{trans('ingame-web.paigow_winningdisplay_heavendownpair')}}',
      paigow_winningdisplay_updownpair:'{{trans('ingame-web.paigow_winningdisplay_updownpair')}}',
      paigow_winningdisplay_upheavenpair:'{{trans('ingame-web.paigow_winningdisplay_upheavenpair')}}',
      paigow_winningdisplay_upheavendownpair:'{{trans('ingame-web.paigow_winningdisplay_upheavendownpair')}}',

      /***** Nihtan Junket ******/
      // Lobby
      nihtanjunket_lobby_roomlimit:'{{trans('ingame-web.nihtanjunket_lobby_roomlimit')}}',
      nihtanjunket_lobby_createroom:"{!!trans('ingame-web.nihtanjunket_lobby_createroom')!!}",
      nihtanjunket_lobby_close:'{{trans('ingame-web.nihtanjunket_lobby_close')}}',
      nihtanjunket_lobby_roomname:'{{trans('ingame-web.nihtanjunket_lobby_roomname')}}',
      nihtanjunket_lobby_gameduration:'{{trans('ingame-web.nihtanjunket_lobby_gameduration')}}',
      nihtanjunket_lobby_nolimit:'{{trans('ingame-web.nihtanjunket_lobby_nolimit')}}',
      nihtanjunket_lobby_setlimit:'{{trans('ingame-web.nihtanjunket_lobby_setlimit')}}',
      nihtanjunket_lobby_bettype:'{{trans('ingame-web.nihtanjunket_lobby_bettype')}}',
      nihtanjunket_lobby_gametype:'{{trans('ingame-web.nihtanjunket_lobby_gametype')}}',
      nihtanjunket_lobby_betrange:'{{trans('ingame-web.nihtanjunket_lobby_betrange')}}',
      nihtanjunket_lobby_hours:'{{trans('ingame-web.nihtanjunket_lobby_hours')}}',
      nihtanjunket_lobby_baccaratclassic:'{{trans('ingame-web.nihtanjunket_lobby_baccaratclassic')}}',
      nihtanjunket_lobby_supersix:'{{trans('ingame-web.nihtanjunket_lobby_supersix')}}',
      nihtanjunket_lobby_cancel:'{{trans('ingame-web.nihtanjunket_lobby_cancel')}}',
      nihtanjunket_lobby_customname:'{{trans('ingame-web.nihtanjunket_lobby_customname')}}',
      nihtanjunket_lobby_success:'{{trans('ingame-web.nihtanjunket_lobby_success')}}',
      nihtanjunket_lobby_vroomcreationfailed:'{{trans('ingame-web.nihtanjunket_lobby_vroomcreationfailed')}}',
      nihtanjunket_lobby_wrongaccess:'{{trans('ingame-web.nihtanjunket_lobby_wrongaccess')}}',
      nihtanjunket_lobby_enter:'{{trans('ingame-web.nihtanjunket_lobby_enter')}}',
      nihtanjunket_lobby_join:'{{trans('ingame-web.nihtanjunket_lobby_join')}}',
      nihtanjunket_lobby_room:'{{trans('ingame-web.nihtanjunket_lobby_room')}}',
      nihtanjunket_lobby_searchuserid:'{{trans('ingame-web.nihtanjunket_lobby_searchuserid')}}',
      nihtanjunket_lobby_noroomscreated:'{{trans('ingame-web.nihtanjunket_lobby_noroomscreated')}}',
      nihtanjunket_lobby_pleasetryagainlater:'{{trans('ingame-web.nihtanjunket_lobby_pleasetryagainlater')}}',
      nihtanjunket_lobby_exit:'{{trans('ingame-web.nihtanjunket_lobby_exit')}}',
      nihtanjunket_lobby_roomremovednextround:'{{trans('ingame-web.nihtanjunket_lobby_roomremovednextround')}}',
      nihtanjunket_lobby_roomcreationfailed:'{{trans('ingame-web.nihtanjunket_lobby_roomcreationfailed')}}',
      nihtanjunket_lobby_roomcreationfailedncoin:'{{trans('ingame-web.nihtanjunket_lobby_roomcreationfailedncoin')}}',
      nihtanjunket_lobby_roomfulltojoin:'{{trans('ingame-web.nihtanjunket_lobby_roomfulltojoin')}}',
      nihtanjunket_lobby_noroomscreated:'{{trans('ingame-web.nihtanjunket_lobby_noroomscreated')}}',
      nihtanjunket_lobby_roomname4characters:'{{trans('ingame-web.nihtanjunket_lobby_roomname4characters')}}',
      nihtanjunket_lobby_changetoclassic : '{{trans('ingame-web.nihtanjunket_lobby_changetoclassic')}}',
      nihtanjunket_lobby_allfieldsrequired : '{{ trans('ingame-web.nihtanjunket_lobby_allfieldsrequired')}}',
      nihtanjunket_lobby_wrongpassword : '{{ trans('ingame-web.nihtanjunket_lobby_wrongpassword')}}',
      nihtanjunket_lobby_passwordnotmatch : '{{ trans('ingame-web.nihtanjunket_lobby_passwordnotmatch')}}',
      nihtanjunket_lobby_atleast4 : '{{ trans('ingame-web.nihtanjunket_lobby_atleast4')}}',

      nihtanjunket_clientpage_password:'{{trans('ingame-web.nihtanjunket_clientpage_password')}}',


      // Ingame
      nihtanjunket_ingame_user:'{{trans('ingame-web.nihtanjunket_ingame_user')}}',
      nihtanjunket_ingame_username:'{{trans('ingame-web.nihtanjunket_ingame_user')}}',
      nihtanjunket_ingame_bets:'{{trans('ingame-web.nihtanjunket_ingame_bets')}}',
      nihtanjunket_ingame_winlose:'{{trans('ingame-web.nihtanjunket_ingame_winlose')}}',
      nihtanjunket_ingame_credit:'{{trans('ingame-web.nihtanjunket_ingame_credit')}}',
      nihtanjunket_ingame_totalplayers:'{{trans('ingame-web.nihtanjunket_ingame_totalplayers')}}',
      nihtanjunket_ingame_totalbets:'{{trans('ingame-web.nihtanjunket_ingame_totalbets')}}',
      nihtanjunket_ingame_closeroom:'{{trans('ingame-web.nihtanjunket_ingame_closeroom')}}',
      nihtanjunket_ingame_balancebet:'{{trans('ingame-web.nihtanjunket_ingame_balancebet')}}',
      nihtanjunket_ingame_chat:'{{trans('ingame-web.nihtanjunket_ingame_chat')}}',
      nihtanjunket_ingame_agentdisabledroom:'{{trans('ingame-web.nihtanjunket_ingame_agentdisabledroom')}}',
      nihtanjunket_ingame_roomisfull:'{{trans('ingame-web.nihtanjunket_ingame_roomisfull')}}',
      nihtanjunket_lobby_outofdate :'{{trans('ingame-web.nihtanjunket_lobby_outofdate')}}',
      nihtanjunket_lobby_currentroomoutofdate :'{{trans('ingame-web.nihtanjunket_lobby_currentroomoutofdate')}}',
      nihtanjunket_lobby_wrongpassword :'{{trans('ingame-web.nihtanjunket_lobby_wrongpassword')}}',
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

    #all-container, #other-container, #junket-container {
      width: 1893px;
      height: 960px;
      right: 1%;
      top:9%;
      position: absolute;
    }

    #all-container, #other-container { overflow: auto; }

  </style>

  <style type="text/css">

    @font-face {
        font-family: arvoItalic;
        src: url("/fonts/Arvo-Italic.ttf") format("truetype"); /* IE9 Compat Modes */;
        font-weight: normal;
        font-style: normal;
    }

  	@font-face {
  		font-family: BebasNeue;
  		src: url("/fonts/BebasNeue-Regular.ttf") format('truetype'),
      url("/fonts/BebasNeue.eot"), /* IE9 Compat Modes */
  		url("/fonts/BebasNeueRegular.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
  		url("/fonts/BebasNeue.otf") format("opentype"); /* Open Type Font */
  		font-weight: normal;
  		font-style: normal;
  	}

    @font-face {
        font-family: arvo;
        src: url("/fonts/Arvo-Regular.ttf") format("truetype"); /* IE9 Compat Modes */;
        font-weight: normal;
        font-style: normal;
    }

  	@font-face {
  		font-family: arvoBoldItalic;
  		src: url("/fonts/Arvo-BoldItalic.ttf") format("truetype"); /* IE9 Compat Modes */;
  		font-weight: normal;
  		font-style: normal;
  	}
  	@font-face {
  		font-family: arvoBold;
  		src: url("/fonts/Arvo-Bold.ttf") format("truetype"); /* IE9 Compat Modes */;
  		font-weight: normal;
  		font-style: normal;
  	}
  	@font-face {
  		font-family: latoblack;
  		src: url("/fonts/Lato-Black.ttf") format("truetype"); /* IE9 Compat Modes */;
  		font-weight: normal;
  		font-style: normal;
  	}
  	@font-face {
  		font-family: lato;
  		src: url("/fonts/Lato-Regular.ttf") format("truetype"); /* IE9 Compat Modes */;
  		font-weight: normal;
  		font-style: normal;
  	}
  </style>
  <!-- font face here -->
  <style type="text/css">
    @font-face {
      font-family: bebas-regular;
      src: url("/fonts/BebasNeue-Regular.ttf") format('truetype'),
      url("/fonts/BebasNeue.eot"), /* IE9 Compat Modes */
      url("/fonts/BebasNeueRegular.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
      url("/fonts/BebasNeue.otf") format("opentype"); /* Open Type Font */
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
        font-family: arvo-regular;
        src: url("/fonts/Arvo-Regular.ttf") format("truetype"); /* IE9 Compat Modes */;
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: arvo-black;
        src: url("/fonts/Arvo-Bold.ttf") format("truetype"); /* IE9 Compat Modes */;
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: avro-bolditalic;
        src: url("/fonts/Arvo-BoldItalic.ttf") format("truetype"); /* IE9 Compat Modes */;
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
      font-family: lato-bold;
      src: url("/fonts/Lato-Bold.ttf") format("truetype"); /* IE9 Compat Modes */;
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: lato-black;
      src: url("/fonts/Lato-Black.ttf") format("truetype"); /* IE9 Compat Modes */;
      font-weight: normal;
      font-style: normal;
    }
    @font-face {
      font-family: lato-regular;
      src: url("/fonts/Lato-Regular.ttf") format("truetype"); /* IE9 Compat Modes */;
      font-weight: normal;
      font-style: normal;
    }
  </style>
</head>
<body>
    <span style = "font-family: arvo-regular"></span>
    <span style = "font-family: arvo-black"></span>
    <span style = "font-family: lato-regular"></span>
    <span style = "font-family: lato-bold"></span>
    <span style = "font-family: lato-black"></span>
    <span style = "font-family: bebas-regular"></span>
    {{-- <button id = "checktick">checktickchecktick</button> --}}
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

    <div class="maintenanceOverlay dom-resizable"> {{--maintenanceOverlay--}}
        <div class="maintenanceBg"></div>
        <div class="nihtanLogo"></div>
        <div class="patternLeft"></div>
        <div class="patternRight"></div>
        <div class="maintenanceLogo"></div>
        <div class="mainText">{{(trans('ingame.maintextCap2'))}}</div>
        <div class="subText">{{ trans('ingame.subtextCap2') }}</div>
        <div class="schedule"></div>
    </div> {{--maintenanceOverlay--}}

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
      {{-- <div class="test_container baccarat" style="position: absolute;top: 0;left: 32px;z-index: 120;">
        <button id="initdata" class="test_button">init data</button>
        <button id="newround" class="test_button">New Round</button>
        <button id="bettimer" class="test_button">Start Betting</button>
        <button id="player1" class="test_button">Player 1</button>
        <button id="banker1" class="test_button">Banker 1</button>
        <button id="player2" class="test_button">Player 2</button>
        <button id="banker2" class="test_button">Banker 2</button>
        <button id="player3" class="test_button">Player 3</button>
        <button id="banker3" class="test_button">Banker 3</button>
        <button id="displayresult" class="test_button">Display Result</button>
        <button id="checktick" class="test_button">CHECK TICK</button>
        <button id="shoechange" class="test_button">Shoe Change</button>
        <button id="maintenanceChangeOn" class="test_button">Maintenance Dragontiger On</button>
        <button id="maintenanceChangeOff" class="test_button">Maintenance Dragontiger Off</button>
        <button id="updatecredits" class="test_button">updatecredits</button>
      </div>
      <!-- <div class="test_container paigow" style="position: absolute;top: 0;left: 32px;z-index: 120;">
        <button id="initdata" class="test_button">init data</button>
  			<button id="newround" class="test_button">New Round</button>
  			<button id="bettimer" class="test_button">Start Betting</button>
  			<button id="showbanker" class="test_button">Banker</button>
  			<button id="showup" class="test_button">Up</button>
  			<button id="showheaven" class="test_button">Heaven</button>
  			<button id="showdown" class="test_button">Down</button>
  			<button id="setresult" class="test_button">Setresult</button>
  		</div> -->
      <!-- <div class="test_container poker" style="  position: absolute;top: 0;left: 32px;z-index: 120;">
        <button id="initdata" class="test_button">init data</button>
        <button id="newround" class="test_button">New Round</button>
        <button id="timer" class="test_button">Timer</button>
        <button id="floptime" class="test_button">Flop</button>
        <button id="turntime" class="test_button">Turn</button>
        <button id="rivertime" class="test_button">River</button>
        <button id="player1" class="test_button">Player 1</button>
        <button id="player2" class="test_button">Player 2</button>
        <button id="burn1" class="test_button">Burn 1</button>
        <button id="flop1" class="test_button">Flop 1</button>
        <button id="flop2" class="test_button">Flop 2</button>
        <button id="flop3" class="test_button">Flop 3</button>
        <button id="burn2" class="test_button">Burn 2</button>
        <button id="turn" class="test_button">Turn</button>
        <button id="burn3" class="test_button">Burn 3</button>
        <button id="river" class="test_button">River</button>
        <button id="banker1" class="test_button">Banker 1</button>
        <button id="banker2" class="test_button">Banker 2</button>
        <button id="roundprog" class="test_button">Round Progress</button>
      </div> -->

      <div class="content-container" hidden> {{--content-container--}}
        <div class="header dom-resizable"> {{--header--}}
          <div class="header-nav clearfix"> {{--header-nav--}}
            <div id="lobby" class="header-nav__items header-nav--logo">
              @if( strpos($pc_redirect_url, 'mt-jk.com') > -1)
              <div class="logo mountain-logo"></div>
              @else
                @if(!$junket)
                <div class="logo"></div>
                @else
                <div class="logo kirin-logo"></div>
                @endif
              @endif
              {{-- <img src="/img/header/logo.png" alt="niihtan logo"> --}}
            </div>
            <div class="header-nav__items header-nav--games clearfix">
            @if(!$junket)
              <div id="baccarat" class="header-game__items -baccarat active">
                <div class="header-game__items-inner">
                  <i class="ico-baccarat-lobby"></i>
                  <span>{{trans('ingame-web.lobby_header_baccarat')}}</span>
                </div>
                <!-- <div class="header-subnav -baccarat">
                  <div id="baccarat-classic" class="header-subnav__items -classic active">
                    <span>{{trans('ingame.classic')}}</span>
                  </div>
                  <div id="baccarat-rooms" class="header-subnav__items -rooms">
                    <span>{{trans('ingame.rooms')}}</span>
                    <span class="new"> {{trans('ingame.newcaps')}}</span>
                  </div>
                </div> -->
              </div>
              <div id="othergames" class="header-game__items -othergames">
                <div class="header-game__items-inner">
                  <i class="ico-othergames"></i>
                  <span>{{trans('ingame-web.lobby_header_othergames')}}</span>
                </div>
                <!-- <div class="header-subnav -othergames">
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
                </div> -->
              </div>
              <div id="reelgames" class="header-game__items -reelgames">
                <div class="header-game__items-inner">
                  <i class="ico-reelgames"></i>
                  <span>{{trans('ingame-web.lobby_header_reelgames')}}</span>
                </div>
                <!-- <span class="comingsoon"> {{trans('ingame.comingsooncaps')}}</span> -->
              </div>
            @else
              <div id="junket" class="header-game__items -junket">
                <div class="header-game__items-inner">
                  <i class="ico-multibet"></i>
                  <div class="junket-headername">
                    <span>{{ $vendor->vendor_name }} {{trans('ingame-web.lobby_header_junket')}}</span>
                  </div>
                </div>
              </div>
            @endif
            </div>
            <div class="header-nav__items header-nav--others">
              <div class="header__menu clearfix"><div>
                <i id="menu-howtoplay" class="ico-howtoplay menu-list-bg" value="howtoplay"></i>
                <i id="menu-betlogs" class="ico-bethistory menu-list-bg" value="betlogs"></i>
                <i id="menu-settings" class="ico-settings menu-list-bg" value="settings"></i>
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


            @if($junket == 2)
            <div class="header-nav__items header-nav--admin-btn clearfix" id="admin-btn">
              <div class="header-game__items -admin-btn">
                <div class="header-game__items-inner">
                  <div class="junket-header-admin">
                    <span>{{trans('ingame.admin')}}</span>
                  </div>
                </div>
              </div>
            </div>
            @endif
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

          <div id="all-container" class="dom-resizable"></div>
          <div id="other-container" class="dom-resizable"></div>
          <div id="junket-container" class="dom-resizable">
            @if($junket)
            <div class="junket-menu">
              <div id="junket-baccarat" class="junket-menu__items active">{{trans('ingame-web.lobby_gamename_baccarat')}}</div>
              <div id="junket-other" class="junket-menu__items">{{trans('ingame-web.lobby_header_othergames')}}</div>

              <div class="junket-menu__information -dragontiger_limit">
                <span>{{trans('ingame-web.lobby_gamename_dragontiger')}}:</span>
                <span class="junket_limit">1</span>
              </div>

              <div class="junket-menu__information -paigow_limit">
                  <span>{{trans('ingame-web.lobby_gamename_crazypaigow')}}:</span>
                  <span class="junket_limit">1</span>
              </div>

              <div class="junket-menu__information -sicbo_limit">
                  <span>{{trans('ingame-web.lobby_gamename_sicbo')}}:</span>
                  <span class="junket_limit">1</span>
              </div>

              <div class="junket-menu__information -baccarat_limit">
                  <span>{{trans('ingame-web.lobby_gamename_baccarat')}}:</span>
                  <span class="junket_limit">1</span>
              </div>

              {{-- <div id="junket-paigow" class="junket-menu__items">Pai gow</div> --}}
            </div>
            @endif

            {{-- <div class="junket-tables">
              <i id="back-junket" class="ico-arrowright"></i>
              <span>Choose Tables</span>
            </div> --}}

            <div id="junket-baccarat-list" class="junket-con"></div>
            <div id="junket-other-list" class="junket-con"></div>
            <div id="junket-no-rooms" class="junket-con">
              <div class="junketnorooms">
                <img src="/img/v3/icons/room_info/no-rooms_ico.png" alt="no rooms">
                <p>NO ROOMS CREATED</p>
              </div>
            </div>

            {{-- <div id="junket-banner-con" class="junket-con">
              <div class="junket-banner">
                <canvas id="game-banner" width="1885px" height="218px"></canvas>
              </div>
              <div class="junket-room-con"></div>
            </div>
            <div id="junket-sicbo-con" class="junket-con">
              <div id="junket-sicbo-banner" class="junket-banner"></div>
              <div class="junket-room-con"></div>
            </div>
            <div id="junket-paigow-con" class="junket-con">
              <div class="junket-banner"></div>
              <div class="junket-room-con"></div>
            </div> --}}
          </div>
          <div id="reelgames-container" class="dom-resizable">
            <div class ="reelgames-list all"></div>
            <div class ="reelgames-list kagaming"></div>
            <div class ="reelgames-list betsoft"></div>
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
          <div class="popup-container dom-resizable">
            <div id="popup-junket" class="popup-box popup--junket">
              <div class="popup-header">
                <span class="popup-header--lbl">{{trans('ingame.create_room')}}</span>
              </div>
              <div class="popup-body"> {{--popup-body--}}

              </div> {{-- // popup-body--}}
              <div class="popup-room-btn">
                {{-- <button id="junket-cancel" type="button" name="button" class="popup-btn--cancel">
                  <span>{{trans('ingame.cancel')}}</span>
                </button>
                <button id="junket-createroom" type="button" name="button" class="popup-btn--create">
                  <span>{{trans('ingame.create_room')}}</span>
                </button> --}}
              </div>
            </div>

            <div id="popup-removeroom" class="popup-box popup--alert">
              <div class="popup__body">
                <i class="ico-alert"></i>
                <span class="alert-txt">{{ trans('ingame.alert')}}</span>
                <p>{{--{{trans('ingame-web.nihtanjunket_lobby_roomremovednextround')}}--}}</p>
              </div>
              <div class="popup-room-btn">
                {{-- <button id="junket-cancelremove" type="button" name="button" class="popup-btn--cancel">
                  <span>{{trans('ingame.promptnocaps')}}</span>
                </button>
                <button id="junket-removeroom" type="button" name="button" class="popup-btn--create">
                  <span>{{trans('ingame.promptyescaps')}}</span>
                </button> --}}
              </div>
            </div>

            <div id="popup-fail" class="popup-alert-box popup--alert">
              <div class="popup__body">
                <i class="ico-alert"></i>
                <span class="alert-txt">{{trans('ingame-web.nihtanjunket_lobby_roomcreationfailed')}}</span>
                <p id="fail-msg">Something went wrong.</p>
                <p class="fail-msg2">{{trans('ingame-web.nihtanjunket_lobby_pleasetryagainlater')}}</p>
              </div>
              <div class="popup-alert-btn popup-room-btn-close">
                <div class="btn-popup popup-btn--close">
                 <span>{{trans('ingame-web.nihtanjunket_lobby_close')}}</span>
                </div>
              </div>
            </div>

            <div id="popup-success" class="popup-alert-box popup--alert">
              <div class="popup__body">
                <i class="ico-success"></i>
                <span class="alert-txt">Success</span>
                {{-- <p>Room successfully created.</p> --}}
              </div>
              <div class="popup-alert-btn popup-room-btn-close">
              </div>
            </div>

            <div id="popup-logoutlobby" class="popup-box popup--alert">
              <div class="popup__body">
                <i class="ico-alert"></i>
                <span class="alert-txt">{{ trans('ingame.alert')}}</span>
                <p>{{trans('ingame-web.com_sub_ingameprompts_exitroom')}}</p>
              </div>
              <div class="popup-room-btn">
                <div id="lobby-cancelremove" type="button" name="button" class="btn-popup popup-btn--cancel">
                  <span>{{trans('ingame.promptnocaps')}}</span>
                </div>
                <div id="looby-removeroom" type="button" name="button" class="btn-popup popup-btn--create">
                  <span>{{trans('ingame.promptyescaps')}}</span>
                </div>
              </div>
            </div>

            <div id="popup-sessionlogout" class="popup-box popup--alert">
              <div class="popup__body">
                <i class="ico-alert"></i>
                <span class="alert-txt">{{ trans('ingame.alert')}}</span>
                <p>Your session has expired.</p> {{-- {{ trans('ingame.sessionexpire')}} --}}
              </div>
              <div class="popup-room-btn">
                <div id="session-logout" type="button" name="button" class="btn-popup popup-btn--create">
                  <span>{{trans('ingame.okcaps')}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="notification-container dom-resizable">
          </div>
          <div class="popup-bg"></div>

          {{-- Menu How to Play --}}
          <div class="modal-con modal-con--howtoplay dom-resizable"> {{--modal-con--}}
            <div class="modal-header modal-header-howtoplay">
              <span class="menu-header-txt">{!! trans('ingame.howtoplay') !!}</span>
              <span class="menu-close-ico" value='howtoplay'></span>
            </div>
            <div class="modal-body modal-body-howtoplay --howtoplay">
              <div class="modal-option">
                <div class="modal-select range-hide">
                  <span class="range-disp howtoplay" data="howtoplay">{!! trans('ingame-web.lobby_gamename_baccarat') !!}</span>
                </div>
              </div>
              <div class="range-list howtoplay" data="howtoplay">
                <button class="range-select" data="baccarat-toggle">{!! trans('ingame-web.lobby_gamename_baccarat') !!}</button>
                <button class="range-select" data="poker-toggle">{!! trans('ingame-web.lobby_gamename_poker') !!}</button>
                <button class="range-select" data="sicbo-toggle">{!! trans('ingame-web.lobby_gamename_sicbo') !!}</button>
                <button class="range-select" data="dragontiger-toggle">{!! trans('ingame-web.lobby_gamename_dragontiger') !!}</button>
                <button class="range-select" data="paigow-toggle">{!! trans('ingame-web.lobby_gamename_crazypaigow') !!}</button>
              </div>

              <div id="baccarat-toggle" class="ingame-howtoplay"> {{--baccarat-toggle--}}
                <!-- <a href="#topContents"></a> -->
                <div id="top" class="howto-wrap"> {{-- .howto-wrap --}}
                  <div class="scroll-position">
                    <span class="scroll-button">
                      <img src="/img/howtoplay/lobby/Asset 37.png" alt="scroll button">
                    </span>
                  </div>
                  <div class="howto-wrap--accent"></div>
                  <div class="howto-wrap__items clearfix -baccarat"> {{-- .howto-wrap__items --}}
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

                      <div id="baccarat-flippytable" class="howto--layers"> {{--howto--layers--}}
                        <h4>{!! trans('howto-baccarat.flippy_table') !!}</h4>
                        {!! trans('howto-baccarat.flippy_table_desc1') !!}
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
                        {!! trans('howto-baccarat.flippy_table_desc2') !!}
                        <img src="/img/howtoplay/baccarat/dark/flippy_box.png" alt="card value" class="flippy_box" />
                      </div> {{--// owto--layers--}}

                      <div id="baccarat-payouts" class="howto--layers"> {{--howto--layers--}}
                        <h4>{!! trans('howto-baccarat.payouts') !!}</h4>
                        <h5>{!! trans('howto-baccarat.classic_table') !!}</h5>
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

                        <h5>{!! trans('howto-baccarat.supersix_table') !!}</h5>
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

                        {{-- <h5>{!! trans('howto-baccarat.dragonbonus_table') !!}</h5>
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

                        <h5>{!! trans('howto-baccarat.bigsmall_table') !!}</h5>
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

                        <h5>{!! trans('howto-baccarat.dragonbonus_win_sample') !!}</h5>
                        <ol class="dragonbonus_sample">
                          <li>
                            <p>{!! trans('howto-baccarat.win_natural_banker_bonus') !!}</p>
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
                            <p>{!! trans('howto-baccarat.win_by_8') !!}</p>
                            <ul>
                              <li><p>{!! trans('howto-baccarat.win_by_8_desc1') !!}</p></li>
                              <li><p>{!! trans('howto-baccarat.win_by_8_desc2') !!}</p></li>
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
                            <p>{!! trans('howto-baccarat.win_by_less_4') !!}</p>
                            <ul>
                              <li><p>{!! trans('howto-baccarat.win_by_less_4_desc1') !!}</p></li>
                              <li><p>{!! trans('howto-baccarat.win_by_less_4_desc2') !!}</p></li>
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
                      @if($junket > 0)
                      <div id="baccarat-balancebet" class="howto--layers"> {{--howto--layers--}}
                        <h4>{!! trans('howto-baccarat.balance_bet') !!}</h4>
                        <p>{!! trans('howto-baccarat.balance_bet_desc') !!}</p>
                        <h5>{!! trans('howto-baccarat.balance_bet_gameplay') !!}</h5>
                        <ul class="gameplay-list gameplay-list--2">
                          <li><span>{!! trans('howto-baccarat.balance_bet_1') !!}</span></li>
                          <li><span>{!! trans('howto-baccarat.balance_bet_2') !!}</span></li>
                          <li><span>{!! trans('howto-baccarat.balance_bet_3') !!}</span></li>
                        </ul>
                      </div> {{--// howto--layers--}}
                      @endif
                    </div> {{-- // .howto-contents --}}
                  </div> {{-- // .howto-wrap__items --}}
                  {{-- paste here --}}
                </div> {{-- // .howto-wrap --}}

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
                      <a href="#baccarat-flippytable" class="menu-game-scroll">{!! trans('howto-baccarat.flippy_table') !!}</a>
                    </li>
                    <li class="gamerules-menu__items">
                      <a href="#baccarat-payouts" class="menu-game-scroll">{!! trans('howto-baccarat.payouts') !!}</a>
                    </li>
                    @if($junket > 0)
                    <li class="gamerules-menu__items">
                      <a href="#baccarat-balancebet" class="menu-game-scroll">{!! trans('howto-baccarat.balance_bet') !!}</a>
                    </li>
                    @endif
                  </ul> {{-- // .gamerules-menu --}}
                </div> {{-- // .howto-submenu --}}
              </div> {{-- //baccarat-toggle--}}

              <div id="poker-toggle" class="ingame-howtoplay"> {{--poker-toggle--}}
                <div id="top" class="howto-wrap"> {{-- .howto-wrap --}}
                  <div class="scroll-position">
                    <span class="scroll-button">
                      <img src="/img/howtoplay/lobby/Asset 37.png" alt="scroll button">
                    </span>
                  </div>
                  <div class="howto-wrap--accent"></div>
                  <div class="howto-wrap__items clearfix -poker"> {{-- .howto-wrap__items --}}
                    <div class="howto-wrap__items clearfix -poker"> {{-- .howto-wrap__items --}}
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

                        @if (trans('howto-poker.card_rank') !== '')
                        <div id="poker-card_rank" class="howto--layers"> {{--howto--layers--}}
                          <h4>{!! trans('howto-poker.card_rank') !!}</h4>
                          {!! trans('howto-poker.card_rank_desc_pc') !!}
                        </div> {{-- // howto--layers--}}
                        @endif

                        <div id="poker-hand-rankings" class="howto--layers"> {{--howto--layers--}}
                          <h4>{!! trans('howto-poker.poker_hand_rankings') !!}</h4>
                          <div class="pokerhand-wrap"> {{--pokerhand-wrap--}}
                            <div class="pokerhand-con clearfix">
                              <div class="pokerhand-con__items clearfix">
                                <h5>1. {!! trans('howto-poker.poker_hand_ranking_list_1') !!}</h5>
                                <p>{!! trans('howto-poker.poker_hand_ranking_list_1_desc_pc') !!}</p>
                              </div>
                              <div class="pokerhand-con__items clearfix">
                                <img src="/img/howtoplay/poker/dark/poker_handranking_01.png" alt="">
                              </div>
                            </div>
                            <div class="pokerhand-con clearfix">
                              <div class="pokerhand-con__items clearfix">
                                <h5>2. {!! trans('howto-poker.poker_hand_ranking_list_2') !!}</h5>
                                <p>{!! trans('howto-poker.poker_hand_ranking_list_2_desc_pc') !!}</p>
                              </div>
                            </div>
                            <div class="pokerhand-con clearfix">
                              <div class="pokerhand-con__items clearfix">
                                <h5>a.) {!! trans('howto-poker.poker_hand_ranking_list_3') !!}</h5>
                                <p>{!! trans('howto-poker.poker_hand_ranking_list_3_desc_pc') !!}</p>
                              </div>
                              <div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/poker/dark/poker_handranking_2.png" alt=""></div>
                            </div>
                            <div class="pokerhand-con clearfix">
                              <div class="pokerhand-con__items clearfix">
                                <h5>b.) {!! trans('howto-poker.poker_hand_ranking_list_4') !!}</h5>
                                <p>{!! trans('howto-poker.poker_hand_ranking_list_4_desc_pc') !!}</p>
                              </div>
                              <div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/poker/dark/poker_handranking_2-1.png" alt=""></div>
                            </div>
                            <div class="pokerhand-con clearfix">
                              <div class="pokerhand-con__items clearfix">
                                <h5>3. {!! trans('howto-poker.poker_hand_ranking_list_5') !!}</h5>
                                <p>{!! trans('howto-poker.poker_hand_ranking_list_5_desc_pc') !!}</p>
                              </div>
                              <div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/poker/dark/poker_handranking_3.png" alt=""></div>
                            </div>
                            <div class="pokerhand-con clearfix">
                              <div class="pokerhand-con__items clearfix">
                                <h5>4. {!! trans('howto-poker.poker_hand_ranking_list_6') !!}</h5>
                                <p>{!! trans('howto-poker.poker_hand_ranking_list_6_desc_pc') !!}</p>
                              </div>
                              <div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/poker/dark/poker_handranking_4.png" alt=""></div>
                            </div>
                            <div class="pokerhand-con clearfix">
                              <div class="pokerhand-con__items clearfix">
                                <h5>5. {!! trans('howto-poker.poker_hand_ranking_list_7') !!}</h5>
                                <p>{!! trans('howto-poker.poker_hand_ranking_list_7_desc_pc') !!}</p>
                              </div>
                              <div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/poker/dark/poker_handranking_5.png" alt=""></div>
                            </div>
                            <div class="pokerhand-con clearfix">
                              <div class="pokerhand-con__items clearfix">
                                <h5>6. {!! trans('howto-poker.poker_hand_ranking_list_8') !!}</h5>
                                <p>{!! trans('howto-poker.poker_hand_ranking_list_8_desc_pc') !!}</p>
                              </div>
                            </div>
                            <div class="pokerhand-con clearfix">
                              <div class="pokerhand-con__items clearfix">
                                <h5>a.) {!! trans('howto-poker.poker_hand_ranking_list_9') !!}</h5>
                                <p>{!! trans('howto-poker.poker_hand_ranking_list_9_desc_pc') !!}</p>
                              </div>
                              <div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/poker/dark/poker_handranking_6.png" alt=""></div>
                            </div>
                            <div class="pokerhand-con clearfix">
                              <div class="pokerhand-con__items clearfix">
                                <h5>b.) {!! trans('howto-poker.poker_hand_ranking_list_10') !!}</h5>
                                <p>{!! trans('howto-poker.poker_hand_ranking_list_10_desc_pc') !!}</p>
                              </div>
                              <div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/poker/dark/poker_handranking_6-1.png" alt=""></div>
                            </div>
                            <div class="pokerhand-con clearfix">
                              <div class="pokerhand-con__items clearfix">
                                <h5>7. {!! trans('howto-poker.poker_hand_ranking_list_11') !!}</h5>
                                <p>{!! trans('howto-poker.poker_hand_ranking_list_11_desc_pc') !!}</p>
                              </div>
                              <div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/poker/dark/poker_handranking_7.png" alt=""></div>
                            </div>
                            <div class="pokerhand-con clearfix">
                              <div class="pokerhand-con__items clearfix">
                                <h5>8. {!! trans('howto-poker.poker_hand_ranking_list_12') !!}</h5>
                                <p>{!! trans('howto-poker.poker_hand_ranking_list_12_desc_pc') !!}</p>
                              </div>
                              <div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/poker/dark/poker_handranking_8.png" alt=""></div>
                            </div>
                            <div class="pokerhand-con clearfix">
                              <div class="pokerhand-con__items clearfix">
                                <h5>9. {!! trans('howto-poker.poker_hand_ranking_list_13') !!}</h5>
                                <p>{!! trans('howto-poker.poker_hand_ranking_list_13_desc_pc') !!}</p>
                              </div>
                              <div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/poker/dark/poker_handranking_9.png" alt=""></div>
                            </div>
                            <div class="pokerhand-con clearfix">
                              <div class="pokerhand-con__items clearfix">
                                <h5>10. {!! trans('howto-poker.poker_hand_ranking_list_14') !!}</h5>
                                <p>{!! trans('howto-poker.poker_hand_ranking_list_14_desc_pc') !!}</p>
                              </div>
                              <div class="pokerhand-con__items clearfix"><img src="/img/howtoplay/poker/dark/poker_handranking_10.png" alt=""></div>
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

                        <div id="poker-payouts" class="howto--layers bonus-payout"> {{--howto--layers--}}
                          <h4>{!! trans('howto-poker.payouts') !!}</h4>
                          <h5>{!! trans('howto-poker.bonus_bet_payouts') !!}</h5>
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

                          <h5>{!! trans('howto-poker.bonus_plus_payouts') !!}</h5>
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

                          <h5>{!! trans('howto-poker.pocket_bonus_payouts') !!}</h5>
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
                <div class="howto-submenu"> {{-- .howto-submenu --}}
                  <ul class="gamerules-menu"> {{-- .gamerules-menu --}}
                    <li class="gamerules-menu__items">
                      <a href="#game-objective" class="menu-game-scroll">{!! trans('howto-poker.game_objective') !!}</a>
                    </li>
                    <li class="gamerules-menu__items">
                      <a href="#poker-gameplay" class="menu-game-scroll">{!! trans('howto-poker.gameplay') !!}</a>
                    </li>
                    @if (trans('howto-poker.card_rank') !== '')
                    <li class="gamerules-menu__items">
                      <a href="#poker-card_rank" class="menu-game-scroll">{!! trans('howto-poker.card_rank') !!}</a>
                    </li>
                    @endif
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
                      <a href="#poker-payouts" class="menu-game-scroll">{!! trans('howto-poker.payouts') !!}</a>
                    </li>
                    <!-- <li class="gamerules-menu__items">
                      <a href="#poker-bonusbetpayouts" class="menu-game-scroll">{!! trans('howto-poker.bonus_bet_payouts') !!}</a>
                    </li> -->
                    <!-- <li class="gamerules-menu__items">
                      <a href="#poker-bonuspluspayouts" class="menu-game-scroll">{!! trans('howto-poker.bonus_plus_payouts') !!}</a>
                    </li> -->
                    <!-- <li class="gamerules-menu__items">
                      <a href="#poker-pocketbonuspayouts" class="menu-game-scroll">{!! trans('howto-poker.pocket_bonus_payouts') !!}</a>
                    </li> -->
                    <li class="gamerules-menu__items">
                      <a href="#poker-same-hand-ranking" class="menu-game-scroll">{!! trans('howto-poker.same_hand_ranking') !!}</a>
                    </li>
                  </ul> {{-- // .gamerules-menu --}}
                </div> {{-- // .howto-submenu --}}
              </div> {{-- //poker-toggle--}}

              <div id="sicbo-toggle" class="ingame-howtoplay"> {{--sicbo-toggle--}}
                <div id="top" class="howto-wrap"> {{-- .howto-wrap --}}
                  <div class="scroll-position">
                    <span class="scroll-button">
                      <img src="/img/howtoplay/lobby/Asset 37.png" alt="scroll button">
                    </span>
                  </div>
                  <div class="howto-wrap--accent"></div>
                  <div class="howto-wrap__items clearfix -sicbo"> {{-- .howto-wrap__items --}}
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
                        <h4 id="sicbo-typeofbets">{!! trans('howto-sicbo.typesofbets_header') !!}</h4>
                        <p><img class="sicbo-img" src="/img/howtoplay/sicbo/dark/types_of_bet_figure.png" alt="types of bet figure" /></p>
                        <table class="tbl--typeofbets">
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
                              <td class="desc">{!! trans('howto-sicbo.big_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_1') !!}</td>
                            </tr>
                            <tr>
                              <td class="wager">{!! trans('howto-sicbo.small_type') !!}</td>
                              <td class="desc">{!! trans('howto-sicbo.small_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_2') !!}</td>
                            </tr>
                            <tr>
                              <td class="wager">{!! trans('howto-sicbo.odd_type') !!}</td>
                              <td class="desc">{!! trans('howto-sicbo.odd_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_3') !!}</td>
                            </tr>
                            <tr>
                              <td class="wager">{!! trans('howto-sicbo.even_type') !!}</td>
                              <td class="desc">{!! trans('howto-sicbo.even_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_4') !!}</td>
                            </tr>
                            <tr>
                              <td class="wager" rowspan="7">{!! trans('howto-sicbo.sum4_type') !!}</td>
                              <td class="desc">{!! trans('howto-sicbo.sum4_17_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_5') !!}</td>
                            </tr>
                            <tr>
                              <td class="desc">{!! trans('howto-sicbo.sum5_16_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_6') !!}</td>
                            </tr>
                            <tr>
                              <td class="desc">{!! trans('howto-sicbo.sum6_15_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_7') !!}</td>
                            </tr>
                            <tr>
                              <td class="desc">{!! trans('howto-sicbo.sum7_14_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_8') !!}</td>
                            </tr>
                            <tr>
                              <td class="desc">{!! trans('howto-sicbo.sum8_13_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_9') !!}</td>
                            </tr>
                            <tr>
                              <td class="desc">{!! trans('howto-sicbo.sum9_12_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_10') !!}</td>
                            </tr>
                            <tr>
                              <td class="desc">{!! trans('howto-sicbo.sum10_11_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_11') !!}</td>
                            </tr>
                            <tr>
                              <td class="wager">{!! trans('howto-sicbo.triple_type') !!}</td>
                              <td class="desc">{!! trans('howto-sicbo.triple_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_12') !!}</td>
                            </tr>
                            <tr>
                              <td class="wager">{!! trans('howto-sicbo.anytriple_type') !!}</td>
                              <td class="desc">{!! trans('howto-sicbo.anytriple_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_13') !!}</td>
                            </tr>
                            <tr>
                              <td class="wager">{!! trans('howto-sicbo.specificdouble_type') !!}</td>
                              <td class="desc">{!! trans('howto-sicbo.specificdouble_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_14') !!}</td>
                            </tr>
                            <tr>
                              <td class="wager">{!! trans('howto-sicbo.dicecombination_type') !!}</td>
                              <td class="desc">{!! trans('howto-sicbo.dicecombination_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_15') !!}</td>
                            </tr>
                            <tr>
                              <td class="wager">{!! trans('howto-sicbo.3-singlenumber_type') !!}</td>
                              <td class="desc">{!! trans('howto-sicbo.3-singlenumber_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_16') !!}</td>
                            </tr>
                            <tr>
                              <td class="wager" rowspan="3">{!! trans('howto-sicbo.singledicebet_type') !!}</td>
                              <td class="desc">{!! trans('howto-sicbo.singledicebet1_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_17') !!}</td>
                            </tr>
                            <tr>
                              <td class="desc">{!! trans('howto-sicbo.singledicebet2_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_18') !!}</td>
                            </tr>
                            <tr>
                              <td class="desc">{!! trans('howto-sicbo.singledicebet3_desc') !!}</td>
                              <td class="payout">{!! trans('howto-sicbo.payout_19') !!}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div> {{--  //.type-of-bets --}}
                    </div> {{-- // .howto-contents --}}
                  </div> {{-- // .howto-wrap__items --}}

                  {{-- paste here --}}
                </div> {{-- // .howto-wrap --}}
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
              </div> {{-- //sicbo-toggle--}}

              <div id="dragontiger-toggle" class="ingame-howtoplay"> {{--dragontiger-toggle--}}
                <div id="top" class="howto-wrap"> {{-- .howto-wrap --}}
                  <div class="scroll-position">
                    <span class="scroll-button">
                      <img src="/img/howtoplay/lobby/Asset 37.png" alt="scroll button">
                    </span>
                  </div>
                  <div class="howto-wrap--accent"></div>
                  <div class="howto-wrap__items clearfix -dragontiger"> {{-- .howto-wrap__items --}}
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
                  </ul> {{-- // .gamerules-menu --}}
                </div> {{-- // .howto-submenu --}}
              </div> {{--dragontiger-toggle--}}

              <div id="paigow-toggle" class="ingame-howtoplay"> {{--paigow-toggle--}}
                <div id="top" class="howto-wrap"> {{-- .howto-wrap --}}
                  <div class="scroll-position">
                    <span class="scroll-button">
                      <img src="/img/howtoplay/lobby/Asset 37.png" alt="scroll button">
                    </span>
                  </div>
                  <div class="howto-wrap--accent"></div>
                  <div class="howto-wrap__items clearfix -paigow"> {{-- .howto-wrap__items --}}
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
                              <th class="rules--bet">{!! trans('howto-paigow.bet') !!}</th>
                              <th class="rules--wincondition">{!! trans('howto-paigow.winning_condition') !!}</th>
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
                        <!-- <span class="winning_commission">{!! trans('howto-paigow.winning_commission') !!}</span> -->
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
                <div class="howto-submenu"> {{-- .howto-submenu --}}
                  <ul class="gamerules-menu"> {{-- .gamerules-menu --}}
                    <li class="gamerules-menu__items">
                      <a href="#game-objective" class="menu-game-scroll">{!! trans('howto-paigow.game_objective') !!}</a>
                    </li>
                    <li class="gamerules-menu__items">
                      <a href="#paigow-gameplay" class="menu-game-scroll">{!! trans('howto-paigow.gameplay') !!}</a>
                    </li>
                    <li class="gamerules-menu__items">
                      <a href="#paigow-playerpayout_bankerwin" class="menu-game-scroll payoutbankerwin">{!! trans('howto-paigow.playerpayout_bankerwin') !!}</a>
                    </li>
                    <li class="gamerules-menu__items">
                      <a href="#paigow-tiles_values" class="menu-game-scroll">{!! trans('howto-paigow.tile_values') !!}</a>
                    </li>
                    <li class="gamerules-menu__items">
                      <a href="#paigow-tile_ranking" class="menu-game-scroll">{!! trans('howto-paigow.tile_ranking') !!}</a>
                    </li>
                  </ul> {{-- // .gamerules-menu --}}
                </div> {{-- // .howto-submenu --}}
              </div> {{-- // paigow-toggle--}}

            </div>
          </div> {{-- // modal-con--}}

          {{-- Menu Bet Logs --}}
          <div class="modal-con noselect modal-con--betlogs dom-resizable"> {{--modal-con--}}
            <div class="modal-betlogs-con -betlogslist"> {{--modal-betlogs-con--}}
              <div class="modal-header modal-header-betlogs">
                <span class="menu-header-txt --betlogs">{!! trans('ingame-web.com_sub_menuarea_betlogs') !!}</span>
                <span class="menu-close-ico" value='betlogs'></span>
              </div>
              @if($junket == 2)
                <div id="datetimepicker-wrap" class="datetimepicker-con">

                </div>
              @endif

              <div class="modal-body modal-body-betlogs --betlogs">
                <div class="modal-option">
                  <div class="modal-select range-hide">
                    <span class="range-disp betlogs" game="baccarat" data="betlogs">{!! trans('ingame-web.lobby_gamename_baccarat') !!}</span>
                  </div>
                  @if($junket == 2)
                    <div class="modal-betlog-search">
                      <div class="modal-reload-ico search__items reload--icon">
                        <i id="reloadlogs" class="ico-reload"></i>
                      </div>
                      <div class="modal-startdate  search__items search--datetimepicker">
                        <input id="date_timepicker_start" type="text" value="">
                        <i id="calendar-start" class="ico-calendar"></i>
                      </div>
                      <div class="modal-enddate  search__items search--datetimepicker">
                        <input id="date_timepicker_end" type="text" value="">
                        <i id="calendar-end" class="ico-calendar"></i>
                      </div>
                      <div class="modal-userid search__items">
                        <input id="search-userid" type="text" name="" value="" placeholder="User ID">
                      </div>
                      <div class="modal-search-ico search__items search--icon">
                        <i id="searchlogs" class="ico-search"></i>
                      </div>
                    </div>
                  @endif

                </div>

                <div class="range-list betlogs" data="betlogs">
                  @if($junket > 0 && $vendor->junket_auth->baccarat->auth ==1 )
                    <button class="range-select" game="baccarat" data="baccaratlogs">{!! trans('ingame-web.lobby_gamename_baccarat') !!}</button>
                  @elseif($junket == 0)
                    <button class="range-select" game="baccarat" data="baccaratlogs">{!! trans('ingame-web.lobby_gamename_baccarat') !!}</button>
                  @endif

                  @if($junket > 0)
                    <button class="range-select" game="poker" data="pokerlogs">{!! trans('ingame-web.lobby_gamename_poker') !!}</button>
                  @elseif($junket == 0)
                    <button class="range-select" game="poker" data="pokerlogs">{!! trans('ingame-web.lobby_gamename_poker') !!}</button>
                  @endif


                  @if($junket > 0 && $vendor->junket_auth->sicbo->auth ==1 )
                    <button class="range-select" game="sicbo" data="sicbologs">{!! trans('ingame-web.lobby_gamename_sicbo') !!}</button>
                  @elseif($junket == 0)
                    <button class="range-select" game="sicbo" data="sicbologs">{!! trans('ingame-web.lobby_gamename_sicbo') !!}</button>
                  @endif

                  @if($junket > 0)
                    <button class="range-select" game="dragontiger" data="dragontigerlogs">{!! trans('ingame-web.lobby_gamename_dragontiger') !!}</button>
                  @elseif($junket == 0)
                    <button class="range-select" game="dragontiger" data="dragontigerlogs">{!! trans('ingame-web.lobby_gamename_dragontiger') !!}</button>
                  @endif


                  @if($junket > 0 && $vendor->junket_auth->paigow->auth ==1 )
                    <button class="range-select" game="paigow" data="paigowlogs">{!! trans('ingame-web.lobby_gamename_crazypaigow') !!}</button>
                  @elseif($junket == 0)
                    <button class="range-select" game="paigow" data="paigowlogs">{!! trans('ingame-web.lobby_gamename_crazypaigow') !!}</button>
                  @endif

                  <button class="range-select" game="allgames" data="alllogs">{!! trans('ingame-web.com_sub_menuarea_allgames') !!}</button>
                </div>
                <div id="tblBetLogs" class="modal-tbl">
                  <div class="modal-tbl-header">
                    <div class="tbl-header-list -list_gameno">{!! trans('ingame-web.com_sub_menuarea_gameno') !!}</div>
                    <div class="tbl-header-list -list_date">{!! trans('ingame-web.com_sub_menuarea_date') !!}</div>
                    <div class="tbl-header-list -list_channel">{!! trans('ingame-web.com_sub_menuarea_channel') !!}</div>
                    @if($junket > 1)
                    <div class="tbl-header-list -list_userid">{!! trans('ingame-web.nihtanjunket_clientpage_userid') !!}</div>
                    @endif
                    @if($junket < 2)<div class="tbl-header-list -list_dealer">{!! trans('ingame-web.com_sub_menuarea_dealername') !!}</div>@endif
                    <!-- @if($junket > 1)<div class="tbl-header-list -list_userid">User Id</div> @endif -->
                    <!-- @if($junket > 1)<div class="tbl-header-list -list_currency">Currency</div> @endif -->
                    <div class="tbl-header-list -list_totalbet">{!! trans('ingame-web.com_sub_menuarea_totalbet') !!}</div>
                    <div class="tbl-header-list -list_winlose">{!! trans('ingame-web.com_sub_menuarea_winlose') !!}</div>
                  </div>

                  <div id="tblBodyBetlogs" class="modal-tbl-body"></div>
                  <div class="modal-tbl-footer center-content">
                    <div id="prevPageBetlogs" class="page-ico prev-page-ico"></div>
                    <div id="tblFooterBetlogs"></div>
                    <div id="nextPageBetlogs" class="page-ico next-page-ico"></div>
                  </div>
                </div>
              </div>

              <div class="modal-body modal-body-nodata --betlogs">{!! trans('ingame-web.other_prompts_mobile_nodata') !!}</div>
            </div> {{-- // modal-betlogs-con--}}

            <div id="modalResult"  class="modal-betlogs-con -betlogsresult"> {{--modal-betlogs-con--}}
              <div class="modal-con -result noselect">
                <div class="modal-header modal-header-result">
                  <span class="menu-header-txt">{!! trans('ingame-web.com_sub_menuarea_betlogs') !!}</span>
                  <span class="menu-close-ico" value='result'></span>
                </div>

                <div class="modal-body modal-body-result">
                  <div class="result-header">
                    <div class="result-header-list header-list-left"></div>
                    <div class="result-header-list header-list-center">
                      <div class="header-result-con center-content"></div>
                    </div>
                    <div class="result-header-list header-list-right"></div>
                  </div>
                  <div class="result-body">
                    <div class="result-main-con center-content"></div>
                  </div>
                  <div class="result-table">
                    <div class="result-table-head">
                      <div class="result-tr">
                        <div class="result-th bet-type">{!! trans('ingame-web.com_sub_menuarea_bettype') !!}</div>
                        <div class="result-th bets">{!! trans('ingame-web.com_sub_menuarea_bets') !!}</div>
                        <div class="result-th win-lose">{!! trans('ingame-web.com_sub_menuarea_winlose') !!}</div>
                      </div>
                    </div>
                    <div class="result-table-body">
                    </div>
                  </div>

                  {{-- <div class="result-footer">
                    <div class="bets-tbl-header">
                      <div class="bets-tbl-header-list bets-list-bettype">Bet Type</div>
                      <div class="bets-tbl-header-list bets-list-bets tbl-align-right">Bets</div>
                      <div class="bets-tbl-header-list bets-list-winlose tbl-align-right">Win/Lose</div>
                    </div>
                    <div class="bets-tbl-body"></div>
                  </div> --}}
                </div>
              </div>
            </div>{{--modal-betlogs-con--}}
          </div> {{-- // modal-betlogs-con--}}

          {{-- Menu Settings --}}
          <div class="modal-con noselect modal-con--settings dom-resizable"> {{--modal-con--}}
            <div class="modal-header modal-header-settings">
              <span class="menu-header-txt">{!! trans('ingame-web.com_sub_menuarea_settings') !!}</span>
              <span class="menu-close-ico" value='settings'></span>
            </div>

            <div class="modal-body modal-body-settings --settings">
              <div class="modal-holder -sound"> {{--modal-holder--}}
                <h3>{!! trans('ingame-web.lobby_settings_sound') !!}</h3>
                <div class="modal-holder__items"> {{--modal-holder__items--}}
                    <span class="settings-lbl">{!! trans('ingame-web.lobby_settings_dealersvoice') !!}</span>
                </div> {{--// modal-holder__items--}}
                <div class="modal-holder__items"> {{--modal-holder__items--}}
                    <span class="settings-lbl">{!! trans('ingame-web.lobby_settings_gamesound') !!}</span>
                </div> {{--// modal-holder__items--}}
                <div class="modal-holder__items"> {{--modal-holder__items--}}
                    <span class="settings-lbl">{!! trans('ingame-web.lobby_settings_music') !!}</span>
                </div> {{--// modal-holder__items--}}

                <div class="modal-holder__items"> {{--modal-holder__items--}}
                    <div class="music-dropdown-con">
                        <span class="music-active"></span>
                    </div>
                </div> {{--// modal-holder__items--}}

                <div class="music-list-con">
                    <div class="music-list__items items_music-1" value='1'><span>{!! trans('ingame-web.lobby_settings_music') !!} 1</span></div>
                    <div class="music-list__items items_music-2" value='2'><span>{!! trans('ingame-web.lobby_settings_music') !!} 2</span></div>
                    <div class="music-list__items items_music-3" value='3'><span>{!! trans('ingame-web.lobby_settings_music') !!} 3</span></div>
                    <div class="music-list__items items_music-4" value='4'><span>{!! trans('ingame-web.lobby_settings_music') !!} 4</span></div>
                    <div class="music-list__items items_music-5" value='5'><span>{!! trans('ingame-web.lobby_settings_music') !!} 5</span></div>
                </div>

                <div id="dealerMuteIco" class="settings-ico settings-mute-ico"></div>
                <div class="settings-volume-bg">
                  <div id="dealerSndSlider" class="settings-vol-slider"></div>
                </div>
                <div id="dealerSndCircle" class="settings-volume-circle"></div>
                <div id="dealerMaxIco" class="settings-ico settings-max-ico"></div>

                <div id="gameMuteIco" class="settings-ico settings-mute-ico game-sound-min"></div>
                <div class="settings-volume-bg game-sound game-sound-vol-bg">
                  <div id="gameSndSlider" class="settings-vol-slider"></div>
                </div>
                <div id="gameSndCircle" class="settings-volume-circle game-sound-circle"></div>
                <div id="gameMaxIco" class="settings-ico settings-max-ico game-sound-max"></div>

                <div id="musicMuteIco" class="settings-ico settings-mute-ico music-sound-min"></div>
                <div class="settings-volume-bg game-sound music-sound-vol-bg">
                    <div id="musicSndSlider" class="settings-vol-slider"></div>
                </div>
                <div id="musicSndCircle" class="settings-volume-circle music-sound-circle"></div>
                <div id="musicMaxIco" class="settings-ico settings-max-ico music-sound-max"></div>
              </div> {{-- // modal-holder--}}

              <div class="modal-holder -theme"> {{--modal-holder--}}
                <h3>{!! trans('ingame-web.lobby_settings_display') !!}</h3>
                <div class="modal-holder__items">
                  <span class="settings-lbl">{!! trans('ingame-web.com_sub_settings_darktheme') !!}</span>
                  <div id="setTheme" class="settings-switch-bg">
                    <div id="setThemeCircle" class="settings-switch-circle"></div>
                  </div>
                </div>
                <div class="modal-holder__items">
                  <span class="settings-lbl">{!! trans('ingame-web.com_sub_settings_showtutorial') !!}</span>
                  <div id="setTut" class="settings-switch-bg switch-tutorial">
                    <div id="setTutCircle" class="settings-switch-circle"></div>
                  </div>
                </div>
                <div class="modal-holder__items sub-language">
                  <span class="settings-lbl">{!! trans('ingame-web.com_sub_settings_language') !!}</span>
                  <div class="settings-language-con">
                    <div class="settings-circle-highlight flag-con flag-english" value="0"><span class="settings-flag flag-en"></span></div>
                    <div class="settings-circle-highlight flag-con flag-japan" value="1"><span class="settings-flag flag-jp"></span></div>
                    <div class="settings-circle-highlight flag-con flag-korea" value="2"><span class="settings-flag flag-kr"></span></div>
                    <div class="settings-circle-highlight flag-con flag-chinese" value="3"><span class="settings-flag flag-zh"></span></div>
                    <div class="settings-circle-highlight flag-con flag-thai" value="4"><span class="settings-flag flag-th"></span></div>
                  </div>
                </div>
              </div> {{-- // modal-holder--}}

              <div class="modal-holder -avatar"> {{--modal-holder--}}
                <h3>{!! trans('ingame-web.com_sub_settings_avatar') !!}</h3>
                <div class="settings-avatar-con">
                  <div class="settings-circle-highlight avatar-cont -red_king" value="0" avatar="red_king">
                    <div class="settings-avatar-bg"><span class="settings-avatar avatar-king-red"></span></div>
                  </div>
                  <div class="settings-circle-highlight avatar-cont -red_queen" value="1" avatar="red_queen">
                    <div class="settings-avatar-bg"><span class="settings-avatar avatar-queen-red"></span></div>
                  </div>
                  <div class="settings-circle-highlight avatar-cont -red_jack" value="2" avatar="red_jack">
                    <div class="settings-avatar-bg"><span class="settings-avatar avatar-jack-red"></span></div>
                  </div>
                  <div class="settings-circle-highlight avatar-cont -red_joker" value="3" avatar="red_joker">
                    <div class="settings-avatar-bg"><span class="settings-avatar avatar-joker-red"></span></div>
                  </div>
                  <div class="settings-circle-highlight avatar-cont -blue_king" value="4" avatar="blue_king">
                    <div class="settings-avatar-bg"><span class="settings-avatar avatar-king-blue"></span></div>
                  </div>
                  <div class="settings-circle-highlight avatar-cont -blue_queen" value="5" avatar="blue_queen">
                    <div class="settings-avatar-bg"><span class="settings-avatar avatar-queen-blue"></span></div>
                  </div>
                  <div class="settings-circle-highlight avatar-cont -blue_jack" value="6" avatar="blue_jack">
                    <div class="settings-avatar-bg"><span class="settings-avatar avatar-jack-blue"></span></div>
                  </div>
                  <div class="settings-circle-highlight avatar-cont -blue_joker" value="7" avatar="blue_joker">
                    <div class="settings-avatar-bg"><span class="settings-avatar avatar-joker-blue"></span></div>
                  </div>
                </div>
              </div> {{-- // modal-holder--}}
            </div>
          </div> {{-- // modal-con--}}
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
          <div id="top" class="howto-wrap"> {{-- .howto-wrap --}}
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
          <div id="top" class="howto-wrap"> {{-- .howto-wrap --}}
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

        <div id="red-white-toggle" class="ingame-howtoplay"> {{--red-white-toggle--}}
          <div id="top" class="howto-wrap"> {{-- .howto-wrap --}}
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
</body>
<script type="text/javascript">
  if(window.isJunket == 2) {
    var datenow = new Date();
    var year = datenow.getFullYear();
    var month = datenow.getMonth()+1
    var date =  datenow.getDate()

    month = month < 10? '0'+month : month;
    date = date < 10? '0'+date : date;
    $('#date_timepicker_start').val(year+'-'+month+'-'+date)
    $('#date_timepicker_end').val(year+'-'+month+'-'+date)
    // console.log("datenow", setCurrentTimezone(datenow));
    $('#date_timepicker_start').datetimepicker({
      format: "Y-m-d",
      onGenerate:function(ct){
        jQuery(this).css({
          right : 180,
          top: 90
        });
      },
      onShow:function(ct){
        this.setOptions({
          maxDate:jQuery('#date_timepicker_end').val()?jQuery('#date_timepicker_end').val():false
        })
      },
      // defaultDate: datenow,
      timepicker : false,
    });

    $('#date_timepicker_end').datetimepicker({
      format: "Y-m-d",
      onGenerate:function(ct){
        jQuery(this).css({
          right : 25,
          top: 90
        });
      },
      onShow:function(ct){
        this.setOptions({
          minDate:jQuery('#date_timepicker_start').val()?jQuery('#date_timepicker_start').val():false
        })
      },
      defaultDate: '+1970/01/02',
      timepicker : false,
    });

  }


</script>

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
  var settings = {};
  var popup_notification = {};
  var bet_records = {};
  var reelgames = {};


    var resize = function (newWidth, newHeight) {
        var baseRatio = 1920 / 1080,
        newRatio = newWidth / newHeight;

        if(newRatio > baseRatio) {
        newWidth = newHeight * baseRatio;
        } else {
        newHeight = newWidth / baseRatio;
        }

        var container = document.getElementsByClassName("container")[0];
        container.style.width = newWidth;
        container.style.height = newHeight;

        var c_container = document.getElementsByClassName("canvas-container")[0];
        c_container.style.width = newWidth;
        c_container.style.height = newHeight;

        var wrapper = document.getElementsByClassName("wrapper")[0];
        wrapper.style.width = newWidth;
        wrapper.style.height = newHeight;

        var d_resizable = document.getElementsByClassName("dom-resizable");

        for (var i = 0; i < d_resizable.length; i++) {
            d_resizable[i].style.transform = "scale(" + (newWidth / 1920) + ") ";
        }

        var wrapper_outer = document.getElementsByClassName("wrapper--outer")[0];
        wrapper_outer.style.transform = "scale(" + (newWidth / 1920) + ") ";
    }
    resize(window.innerWidth, window.innerHeight);
</script>
<script type="text/javascript" src="/osmf/swfobject.min.js"></script>
<script type="text/javascript" src ="/dist/main-3.0.js"></script>
<!-- <script type="text/javascript" src="/js/dom-events.js"></script> -->
<script type="text/javascript" src="/js/dom-events-3.js"></script>
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
