<!DOCTYPE html>
<html>
<head>
	<title>POKER</title>
	<link href="https://fonts.googleapis.com/css?family=Arvo:400,700,700i" rel="stylesheet">
	<script src="/js/createjs/createjs-2015.11.26.min.js"></script>
	<script src="/js/createjs/easeljs-0.8.2.min.js"></script>
	<script src="/js/createjs/tweenjs-0.6.2.min.js"></script>
	<script src="/js/createjs/soundjs-0.6.2.min.js"></script>
	<script src="/js/createjs/preloadjs-0.6.2.min.js"></script>
	<script src="/js/jsmpeg.pipe.js"></script>

	<link rel="stylesheet" type="text/css" href="/css/main-web.css">
	<link rel="stylesheet" href="/css/junket.css" />

	<script type="text/javascript">
		window.socket =  '{{ env('APP_SOCKET') }}';
		window.p_domain = '{{ env('P_DOMAIN') }}';
		window.bc_domain = '{{ env('BC_DOMAIN') }}';
		window.sb_domain = '{{ env('SB_DOMAIN') }}';
		window.dt_domain = '{{ env('DT_DOMAIN') }}';
		window.pg_domain = '{{ env('PG_DOMAIN') }}';
		window.lobby_domain = '{{ env('LOBBY_DOMAIN') }}';

		window.currencyAbbrev = '{!! $currencyAbbrev !!}';
		window.currencyMultiplier = {!! $currencyMultiplier !!};
		window.userMultiplier = {!! $userMultiplier !!};
		window.mainMultiplier = {!! $mainMultiplier !!};
		window.user_money = {{$money}};
		window.user_name = '{{$user_name}}';
		window.round_id = {!! $round_id !!}
		window.user_chips = {!! $userChips !!};
		window.integrationType = '{!! $integrationType !!}';
		window.reel_yn = {!! $reel_yn !!};
		window.lobby_type = '{!! $lobby_type !!}';
		window.lobby_redirect_url = '{!! $lobby_redirect_url !!}';
		{{-- window.isPlayer = '{!! $isPlayer !!}'; --}}

		window.userId = {{Auth::user()->id}}
		window.user_type = "{{ app('auth')->user()->user_type }}";
		window.userAuthority = '{{Auth::user()->authority == "a" ? "admin" : "user" }}';
		window.range = '{{$range}}';
		window.tableNum = '{{$tableNum}}';
		window.rangeDetails = {!! $rangeDetails !!};
		window.allRange = {!!json_encode($allRange)!!};
		window.vendorEndDate = '{!! $vendorEndDate !!}';
		window.vendorSound = '{!! $vendorSound !!}';

    //agent range
    window.agent_range =  {!! $agentRange !!};

		window.gameInfo = {!! $gameInfo !!};
		window.game = '{{ env('CUR_GAME') }}';

		<?php $tutorial_enabled = isset($config->avarta->tutorial->enabled) ? $config->avarta->tutorial->enabled : "true"; ?>
		window.config = {
			default: '{{ $config->avarta->default->data[$config->avarta->default->select] }}',
			language: '{{ $config->avarta->language->data[$config->avarta->language->select] }}',
			voice: '{{ $config->avarta->sound->voice }}',
			effect: '{{ $config->avarta->sound->effect }}',
			volume: '{{ $config->avarta->sound->volum }}',
			screen: '{{ $config->avarta->screen->data[$config->avarta->screen->select] }}',
			tutorial: '{{ $tutorial_enabled }}',
			video: '{{ $config->avarta->video }}',
			music: '{{ $config->avarta->sound->music }}',
			bgm: '{{ $config->avarta->music }}'
		};

		window.rawConfig = {
			default: {!! json_encode($config->avarta->default->data) !!},
			language: {!! json_encode($config->avarta->language->data) !!},
			screen: {!! json_encode($config->avarta->screen->data) !!}
		};

		if ('{{$countryCheck}}' == 'KR') {
      window.videostream_url = '{{ $stream ? $stream->korea_stream : '' }}';
    } else {
      window.videostream_url = '{{ $stream ? $stream->web_stream : '' }}';
    }
		window.casino = @if($currency == 'KRW' || $currency == 'THB') 'N' @else 'SS' @endif;
		
    window.junket = {!! $junket !!};
    window.vendorTable = '{!!$vendorTables!!}';
    window.vendor_id = {!! $vendor_id !!};
	</script>
	<style type="text/css">
		* {
			-webkit-tap-highlight-color: rgba(0,0,0,0);
			-moz-tap-highlight-color: rgba(0,0,0,0);
		}
		html,body {
			margin:0;
			padding:0;
			background: #000;
			height: 100%;
			width: 100%;
			overflow:hidden;
		}
		canvas {
			position: absolute;
			right: 0;
			
			/*display: block;
			position: absolute;
			left: 50%;
			top: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
			background-size: 100% 100%;*/
			/* background: aquamarine; */
		}
		#vidCanvas {
			display: none;
			position: absolute;
			right: 0;
			top: 0;
	    width: 1920px;
	    height: 1075px;
		}
		input[type=number]::-webkit-inner-spin-button,
		input[type=number]::-webkit-outer-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}

		.bg {
			width: 100%;
			height: 100%;
			background: #000;
		}
		.container {
			left: 0;
			right: 0;
			margin: auto;
			position: absolute;
			top: 0;
			bottom: 0;
			overflow: hidden;
		}

		.osmf-video {
			width: 100%;
			height: 100%;
			position: absolute;
		}

		#transferFunds{
			border: none;
			height: 35px;
			font-size: 18px;
			text-align: center;
			width: 220px;
		}

		#howtowrap{
			height: 460px;
			width: 430px;
			background: transparent;
			overflow-y: auto;
			overflow-x: hidden;
		}

		#howtocon{
			font: bold 13px arial;
			height: auto;
			width: 100%;
		}
		.howtocontent { padding-right: 20px; }

		::-webkit-scrollbar{
			width: 5px;  /* for vertical scrollbars */
			height: 5px; /* for horizontal scrollbars */
		}

		::-webkit-scrollbar-thumb{
			background: #ff9a28;
		}

    .get-flash {
      position: absolute;
      z-index: 9;
      right: 0;
      top: 0;
      background: rgba(0,0,0,0.8);
      border: 0;
      display: none;
      outline: 0;
      width: 1921px;
      height: 1100px;
      padding: 0;
    }

		/*Confirmation Modal*/
		/*#mdlConfirmation {
			display: none;
		}

		.mdl_overlay {
			position: absolute;
			background: rgba(0, 0, 0, 0.75);
			width: 1602px;
			height: 890px;
			right: 99px;
		}

		.mdl_bg {
			position: absolute;
			width: 560px;
			height: 320px;
			background: #e6e6e6;
			border-radius: 10px;
			top: 260px;
			right: 620px;
		}
		.mdl_warning_ico {
			background-repeat: no-repeat;
			-webkit-background-size: contain;
			-moz-background-size: contain;
			-ms-background-size: contain;
			-o-background-size: contain;
			background-size: contain;
			background-image: url("/img/icons/room_info/warning_icon.png");
			width: 85px;
			height: 80px;
			display: block;
			margin: 6% 0 0 42%;
		}
		.mdl_message {
			text-align: center;
			font: 28px lato-regular;
			color: #333333;
			padding-top: 20px;
			display: block;
			white-space: pre-wrap;
		}
		.mdl_lobby {
			position: absolute;
			bottom: 0;
			height: 70px;
			width: 100%;
			background: #d8961e;
			border-radius: 0 0 10px 10px;
			cursor: pointer;
			text-align: center;
		}
		.mdl_lobby span {
			font: bold 30px lato-regular;
			color: #fcfffd;
			padding-top: 15px;
			display: block;
		}*/
	</style>
	<link rel="stylesheet" type="text/css" href="/css/sicbo.css">
	<link rel="stylesheet" type="text/css" href="/css/howto.css">
	<link rel="stylesheet" href="/css/app.css">
	<link rel="stylesheet" type="text/css" href="/css/tutorials.css">
	<link rel="stylesheet" type="text/css" href="/css/prompts.css" />
	<link rel="stylesheet" href="/css/menu.css" />
	<link rel="stylesheet" href="/css/channel.css" />
	<link rel="stylesheet" href="/css/multibet.css" />
	<link rel="stylesheet" href="/css/notification.css" />

	<style type="text/css">
		@font-face {
			font-family: bebas-regular;
			src: url("/fonts/BebasNeue.eot"), /* IE9 Compat Modes */
			url("/fonts/BebasNeue.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
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
			font-family: arvo-bolditalic;
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

	<style type="text/css">
		.container::after {
			/*background: url('/img/temp.jpg');*/
			background-size: 100% 100%;
			/* content: ""; */
			position: absolute;
			height: 100%;
			width: 100%;
			left: 0;
			opacity: 0.1;
			z-index: 0;
			top: 0;
		}
		.guideline {
			width: 50%;
			border-right: 2px solid red;
			height: 100%;
			position: absolute;
			z-index: 111;

		}
	</style>
</head>
<body>
	<!-- simulatro here -->
	{{-- <button id="newround">newround</button>
	<button id="setbettingtime">timer</button>
	<button id="floptime">flop</button>
	<button id="turntime">turn</button>
	<button id="rivertime">river</button>

	<button id="player1">player1</button>
	<button id="player2">player2</button>
	<button id="burn1">burn1</button>
	<button id="flop1">flop1</button>
	<button id="flop2">flop2</button>
	<button id="flop3">flop3</button>
	<button id="burn2">burn2</button>
	<button id="turn">turn</button>
	<button id="river">river</button>
	<button id="burn3">burn3</button>
	<button id="banker1">banker1</button>
	<button id="banker2">banker2</button>
	<button id="checkround">checkround</button>
	<button id="roundprog">roundprog</button>  --}}

	<span style = "font-family: arvo-regular"></span>
	<span style = "font-family: arvo-black"></span>
	<span style = "font-family: lato-regular"></span>
	<span style = "font-family: lato-bold"></span>
	<span style = "font-family: lato-black"></span>
	<span style = "font-family: bebas-regular"></span>

	<div class="bg"></div>
	<div class="container">

		{{-- <div class="guideline"></div> --}}

		<div id="player" class="dom-resizable"></div>
		<div class="notification-container dom-resizable"></div>
		<canvas id="myCanvas" width="1920px" width="1080px"></canvas>

		@include('multibet')
		@include('channel')
		@include('menu')

		{{-- Junket modal --}}
		<div class="junket-confirm">
			<div class="mdl_overlay"></div>
			<div class="mdl_bg -closeroom dom-resizable"> {{-- close room --}}
				<div class="mdl_warning_ico"></div>
				<div class="mdl_alert_txt">{!! trans('ingame-web.com_sub_ingameprompts_alert') !!}</div>
				<div class="mdl_message">{!! trans('ingame-web.com_sub_rooms_closetheroom') !!}</div>
				<div id="junketNo" class="mdl_btn -no">
					<span>{!! trans('ingame-web.com_sub_rooms_no') !!}</span>
				</div>
				<div id="junketYes" class="mdl_btn -yes">
					<span>{!! trans('ingame-web.com_sub_rooms_yes') !!}</span>
				</div>
				<div class="mdl_lobby">
					<span>{!! trans('ingame-web.com_sub_rooms_backtolobby') !!}</span>
				</div>
			</div>
		</div>

		<div class="wrapper">
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
		</div>

		{{-- Modal --}}
		{{-- <div id="mdlConfirmation" class="dom-resizable">
			<div class="mdl_overlay"></div>
			<div id="mdl_kick-con" class="mdl_bg">
				<div class="mdl_warning_ico"></div>
				<div class="mdl_message">You are already a banker<br/>in another game.</div>
				<div class="mdl_lobby">
					<span>EXIT TO LOBBY</span>
				</div>
			</div>
		</div>--}}

			{{-- <div class="emulator-container" style="position: absolute;z-index: 99999999999999; width: 70px">
				<button id="newround">new round</button>
				<button id ="setbettingtime">bettimer</button>
				<button id ="floptime">flop bettimer</button>
				<button id ="turntime">turn bettimer</button>
				<button id ="rivertime">river bettimer</button>


				<button id ="player1">swipecard player</button>
				<button id ="player2">swipecard player 2</button>

				<button id ="burn1">swipecard BURN</button>
				<button id ="burn2">swipecard BURN 2</button>

				<button id ="flop1">swipecard flop 1</button>
				<button id ="flop2">swipecard flop 2</button>
				<button id ="flop3">swipecard flop 3</button>

				<button id ="swipeturn">swipecard turn</button>
				<button id ="swiperiver">swipecard river</button>
				<button id ="swipedealer">swipecard dealer</button>
				<button id ="flopbet">flopbet</button>
				<button id ="turnfold">turn fold</button>
			</div>    --}}

		<a href="https://www.macromedia.com/go/getflashplayer">
			<button class="get-flash dom-resizable">
				<img src="/img/icons/getFlash.png" style="width: 500px">
				<div style="color: #fff; font: 26px Arvo; margin-top: 10px;">{!! trans('ingame-web.other_prompts_mobile_flashplayer') !!}</div>
			</button>
		</a>

  	@if($tutorial_enabled == "true")
		<div class="tutorial-wrap dom-resizable lang-{{ App::getLocale() }} {{ !$isClassic ? 'junketMode' : '' }}">
			<div class="tutorial-modal">
				<div class="tutorial-modal__body">
					<div class="tutorial-modal__header">{!! trans('tutorials.gameGuide') !!}</div>
					<div class="tutorial-modal__sub-header">{!! trans('tutorials.gameGuide_desc') !!}</div>
				</div>
				<div class="tutorial-modal__footer">
					<div class="tutorial-modal__button -nevershow" id="neverShow">{!! trans('tutorials.neverShow') !!}</div>
					<div class="tutorial-modal__button -start" id="startGame">{!! trans('tutorials.startGame_web') !!}</div>
				</div>
			</div>
			@if($isClassic)
			<div class="tutorial-items -upper">
				<div class="tutorial-item -left">
					<div class="tutorial-item__header">{!! trans('tutorials.multibet') !!}</div>
					<div class="tutorial-item__sub-header">{!! trans('tutorials.multibet_desc_web') !!}</div>
				</div>
				<div class="tutorial-item -right">
					<div class="tutorial-item__header">{!! trans('tutorials.multibet') !!}</div>
					<div class="tutorial-item__sub-header">{!! trans('tutorials.multibet_desc2_web') !!}</div>
				</div>
			</div>
			@endif
			<div class="tutorial-items -lower">
				<div class="tutorial-item -left">
					<div class="tutorial-item__header">{!! trans('tutorials.betInfo') !!}</div>
					<div class="tutorial-item__sub-header">{!! trans('tutorials.betInfo_desc_web') !!}</div>
				</div>
				<div class="tutorial-item -center">
					<div class="tutorial-item__header">{!! trans('tutorials.placingBets') !!}</div>
					<div class="tutorial-item__sub-header">{!! trans('tutorials.placingBets_desc') !!}</div>
				</div>
				<div class="tutorial-item -right">
					<div class="tutorial-item__header">{!! trans('tutorials.gameStatistics') !!}</div>
					<div class="tutorial-item__sub-header">{!! trans('tutorials.gameStatistics_desc_web') !!}</div>
				</div>
			</div>
		</div>
    @endif

		<div id="promptnobet" class="selected-lang-{{ App::getLocale() }}">
			<div class="prompt_overlay"></div>
			<div class="prompt_wrap dom-resizable">
				<div class="prompt">
					<div class="prompt-body">
						<i class="ico-alert"></i>
						<span class="alert">{!! trans('ingame-web.com_sub_ingameprompts_alert') !!}</span>
						<h4>{!! trans('ingame-web.com_sub_ingameprompts_notbet7rounds') !!}</h4>
						{{-- <div class="redirect_timer">15</div> --}}
					</div>

					<div class="prompt-btn clearfix">
						<div class="divider">
							<div class="btn btn-back"><span>{!! trans('ingame-web.com_sub_rooms_backtolobby') !!}</span></div>
						</div>
						<div class="divider">
							<div class="btn btn-cont"><span>{!! trans('ingame-web.com_sub_rooms_yes') !!}</span></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div> {{-- .container --}}
</body>

<script type="text/javascript">

window.bet_type = '{{ $bet_type }}' || "r";
window.bets = {!!$bets!!};
window.sample_saved_bets = [];
window.dealer = {
	"screen_name" : "april",
	"img" : "april.png",
	"image" : "april.png"
}

window.tutorial_enabled = window.config.tutorial == "true";
window.theme = window.config.screen; //window.tutorial_enabled ? (window.config.screen == "black" ? "white" : "black") : window.config.screen;
window.slave = '{{$slave}}';

window.bet_limit = {
	min: 1000,
	max: 200000
}
</script>

<script type="text/javascript">
window.language = {
	locale: '{{ App::getLocale() }}',
	menu: {
		cashin			: '{{ trans('ingame.cashin') }}',
		cashout			        : '{{ trans('ingame.cashout') }}',
		betscaps 		        : '{{ trans('ingame.betscaps') }}',
		winningresultcaps   : '{{ trans('ingame.winningresultcaps') }}',
		payoutcaps          : '{{ trans('ingame.payoutcaps') }}',

		exit				        : '{{ trans('ingame.exit') }}',
		fullscreen			    : '{{ trans('ingame.fullscreen') }}',
		howtoplay			      : '{{ trans('ingame.howtoplay') }}',
		refreshvideo		    : '{{ trans('ingame.refreshvideo') }}',
		videosettings		    : '{{ trans('ingame.videosettings') }}',
		playerinfo			    : '{{ trans('ingame.playerinfo') }}',
		records				      : '{{ trans('ingame.records') }}',
		transfer			      : '{{ trans('ingame.transfer') }}',
		modifychips			    : '{{ trans('ingame.modifychips') }}',
		multiplayer			    : '{{ trans('ingame.multiplayer') }}',
		settings			      : '{{ trans('ingame.settings') }}',
		transferlogs        : '{{ trans('ingame.transferlogs') }}',
		betlogs             : '{{ trans('ingame.betlogs') }}',
		gamehistory         : '{{ trans('ingame.gamehistory') }}',

		playerinfocaps 		  : '{{ trans('ingame.playerinfocaps') }}',
		playername 			    : '{{ trans('ingame.playername') }}',
		playerbalance 		  : '{{ trans('ingame.playerbalance') }}',
		roundid 			      : '{{ trans('ingame.roundid') }}',
		dealernamecaps 		  : '{{ trans('ingame.dealernamecaps') }}',
		channelcaps			    : '{{ trans('ingame.channelcaps') }}',
		cardvaluescaps			: '{{ trans('ingame.cardvaluescaps') }}',
		total 				      : '{{ trans('ingame.total') }}',
		bet_info 				    : '{{ trans('ingame.bet_info') }}',
		tie_info 				    : '{{ trans('ingame.tie_info') }}',
		pair_info 				  : '{{ trans('ingame.pair_info') }}',
		howtoplaycaps 		  : '{{ trans('ingame.howtoplaycaps') }}',
		gamerules 			    : '{{ trans('ingame.gamerules') }}',
		gameplaytutorial	  : '{{ trans('ingame.gameplaytutorial') }}',

		recordscaps 		    : '{{ trans('ingame.recordscaps') }}',
		transferlogscaps	  : '{{ trans('ingame.transferlogscaps') }}',
		datecaps			      : '{{ trans('ingame.datecaps') }}',
		betcaps 			      : '{{ trans('ingame.betcaps') }}',
		typecaps 			      : '{{ trans('ingame.typecaps') }}',
		oldcreditcaps 		  : '{{ trans('ingame.oldcreditcaps') }}',
		transferamountcaps	: '{{ trans('ingame.transferamountcaps') }}',
		newcreditcaps 		  : '{{ trans('ingame.newcreditcaps') }}',
		ipcaps 				      : '{{ trans('ingame.ipcaps') }}',
		countrycaps			    : '{{ trans('ingame.countrycaps') }}',
		nodata				      : '{{ trans('ingame.nodata') }}',

		betlogscaps 		    : '{{ trans('ingame.betlogscaps') }}',
		gamenocaps 			    : '{{ trans('ingame.gamenocaps') }}',
		tablecaps			      : '{{ trans('ingame.tablecaps') }}',
		roomcaps 			      : '{{ trans('ingame.roomcaps') }}',
		startingcreditcaps 	: '{{ trans('ingame.startingcreditcaps') }}',
		totalbetcaps		    : '{{ trans('ingame.totalbetcaps') }}',
		totalwinningscaps 	: '{{ trans('ingame.totalwinningscaps') }}',
		resultcaps 			    : '{{ trans('ingame.resultcaps') }}',

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
		wincaps 			      : '{{ trans('ingame.wincaps') }}',
		losecaps 		        : '{{ trans('ingame.losecaps') }}',
		showtutorial 		    : '{{ trans('ingame.showtutorial') }}',
		flashmsg 			      : '{{ trans('ingame.flashmsg') }}'

	},
  gamename: {
    dragontiger_game  : '{{ trans('ingame.dragontiger_game') }}',
    sicbo_game      : '{{ trans('ingame.sicbo_game') }}',
    poker_game      : '{{ trans('ingame.poker_game') }}',
    baccarat_game     : '{{ trans('ingame-web.lobby_gamename_baccarat') }}',
    roulette_game     : '{{ trans('ingame.roulette_game') }}',
    redwhite_game     : '{{ trans('ingame.redwhite_game') }}',
    spinwin_game    : '{{ trans('ingame.spinwin_game') }}',
    paigow_game     : '{{ trans('ingame.paigow_game') }}',
    supersix      : '{{ trans('ingame-web.lobby_gamename_supersix') }}',
    dragonbonus   : '{{ trans('ingame.dragonbonus') }}',
		texas   : 	"{!! trans('ingame-web.lobby_gamename_texasholdem') !!}",
    bonusplus   : '{{trans('ingame-web.poker_betlayout_bonusplus')}}',
    bc_classic : '{{trans('ingame-web.baccarat_betlayout_classic')}}'
  },
	channel: {
		channel 			  : '{{ trans('ingame.channel') }}',
		bet 				    : '{{ trans('ingame.bet') }}',
		bonus 			    : '{{ trans('ingame.bonus') }}',
		bonusplus 			: '{{ trans('ingame.bonusplus') }}',
		pocket 			    : '{{ trans('ingame.pocket') }}'
	},
	toggle_button : {
		'texas'  : "{!! trans('ingame.texas') !!}"
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
		advancebetcaps 		: '{{ trans('ingame.advancebetcaps') }}',
		rounds 				    : '{{ trans('ingame.rounds') }}',
		customcaps 			  : '{{ trans('ingame.customcaps') }}',
		oddcaps 			    : '{{ trans('ingame.oddcaps') }}',
		evencaps 			    : '{{ trans('ingame.evencaps') }}',

		msgmain 			    : '{{ trans('ingame.msgmain') }}',
		msgplacebets 		  : '{{ trans('ingame.msgplacebets') }}',
		msgminimum 			  : '{{ trans('ingame.msgminimum') }}',
		msgcustom 			  : '{{ trans('ingame.msgcustom') }}',

		msgodd 				    : '{{ trans('ingame.msgodd') }}',
		msgeven 			    : '{{ trans('ingame.msgeven') }}',
		msgselectrounds 	: '{{ trans('ingame.msgselectrounds') }}',
		msgconfirm 			  : '{{ trans('ingame.msgconfirm') }}',
		msgcondition2 		: '{{ trans('ingame.msgcondition2') }}',
		msgcondition3 		: '{{ trans('ingame.msgcondition3') }}',
		msgwait 			    : '{{ trans('ingame.msgwait') }}',
		msgoddplaced 		  : '{{ trans('ingame.msgoddplaced') }}',
		msgevenplaced 		: '{{ trans('ingame.msgevenplaced') }}',
		msgclear 			    : '{{ trans('ingame.msgclear') }}',
		msgbalance 			  : '{{ trans('ingame.msgbalance') }}',
		msgbetsconfirmed 	: '{{ trans('ingame.msgbetsconfirmed') }}',
		msgremaining 		  : '{{ trans('ingame.msgremaining') }}',
		msgwin 				    : '{{ trans('ingame.msgwin') }}',
		msgcancelling 		: '{{ trans('ingame.msgcancelling') }}',
		msgallbetsdone 		: '{{ trans('ingame.msgallbetsdone') }}',
		msgfunds 			    : '{{ trans('ingame.msgfunds') }}'
	},
	game_buttons: {
		confirmcaps 		: '{{ trans('ingame.confirmcaps') }}',
		clearcaps 			: '{{ trans('ingame.clearcaps') }}',
		repeatcaps 			: '{{ trans('ingame.repeatcaps') }}',
		undocaps 			  : '{{ trans('ingame.undocaps') }}'
	},
	prompts: {
		promptnobets 		: '{{ trans('ingame.promptnobets') }}',
		promptdealer 		    : '{{ trans('ingame.promptdealer') }}',
		promptmaxbet 		    : '{{ trans('ingame.promptmaxbet') }}',
		promptminbet 		    : '{{ trans('ingame.promptminbet') }}',
		promptshoechange 	  : '{{ trans('ingame.promptshoechange') }}',
		promptshuffling 	  : '{{ trans('ingame.promptshuffling') }}',
		promptmaintenance 	: '{{ trans('ingame.promptmaintenance') }}',
		promptnobetcaps 	  : '{{ trans('ingame.promptnobetcaps') }}',
		promptbackcaps 		  : '{{ trans('ingame.promptbackcaps') }}',
		promptcontcaps 		  : '{{ trans('ingame.promptcontcaps') }}',
		promptfunds 		    : '{{ trans('ingame.promptfunds') }}',
		promptlanguage 		  : '{{ trans('ingame.promptlanguage') }}',
		prompttheme 		    : '{{ trans('ingame.prompttheme') }}',
		promptrefresh 		  : '{{ trans('ingame.promptrefresh') }}',
		promptyes 			    : '{{ trans('ingame.promptyes') }}',
		promptcancel 		    : '{{ trans('ingame.promptcancel') }}',
		promptbetfail       : '{{ trans('ingame.promptbetfail') }}',

		promptplacebets 	  : '{{ trans('ingame.promptplacebets') }}',
		promptactivated 	  : '{{ trans('ingame.promptactivated') }}',
		promptcancelauto 	  : '{{ trans('ingame.promptcancelauto') }}',
		promptcancelbets 	  : '{{ trans('ingame.promptcancelbets') }}',
		promptfirstround 	  : '{{ trans('ingame.promptfirstround') }}',
		promptaddfail       : '{{trans('ingame.promptaddfail')}}'
	},
	game_specific: {
		dealer 				    : '{{ trans('ingame.dealer') }}',
		player 				    : '{{ trans('ingame.player') }}',
		gameno 				    : '{{ trans('ingame.gameno') }}',
		communitycard 		: '{{ trans('ingame.communitycard') }}',
		bonus 			      : '{{ trans('ingame.bonus') }}',
		ante 			        : '{{ trans('ingame.ante') }}',
		flop 			        : '{{ trans('ingame.flop') }}',
		turn 			        : '{{ trans('ingame.turn') }}',
		river 			      : '{{ trans('ingame.river') }}',
		result 			      : '{{ trans('ingame.result') }}',
		playerwins 			  : '{{ trans('ingame.playerwins') }}',
		dealerwins 			  : '{{ trans('ingame.dealerwins') }}',
		bonuspayout       : '{{ trans('ingame.bonuspayout') }}',
		bonuspluspayout   : '{{ trans('ingame.bonuspluspayout') }}',
		pocketpayout      : '{{ trans('ingame.pocketpayout') }}',
		badbeatpayout     : '{{ trans('ingame.badbeatpayout') }}',
		tie 		          : '{{ trans('ingame.tie') }}',
	},
	multibet_poker: {
		dealer        : '{{ trans('ingame.dealer') }}',
		player        : '{{ trans('ingame.player') }}',
		gameno        : '{{ trans('ingame.gameno') }}',
		communitycard : '{{ trans('ingame.communitycard') }}',
		result        : '{{ trans('ingame.result') }}',
		playerwins    : '{{ trans('ingame.playerwins') }}',
		dealerwins    : '{{ trans('ingame.dealerwins') }}',
		tie           : '{{ trans('ingame.tie') }}'
	},

	multibet_baccarat: {
		playerwins 			: '{{ trans('ingame.playerwins') }}',
		bankerwins 			: '{{ trans('ingame.bankerwins') }}',
		tie 			      : "{!! trans('ingame.tie') !!}"
	},
	multibet_sicbo: {
		oddevencaps 		: '{{ trans('ingame.oddevencaps') }}',
		bigsmallcaps 		: '{{ trans('ingame.bigsmallcaps') }}',
		sumcaps 			  : '{{ trans('ingame.sumcaps') }}',
		dicecaps			  : '{{ trans('ingame.dicecaps') }}',
		hotcaps 			  : '{{ trans('ingame.hotcaps') }}',
		coldcaps 			  : '{{ trans('ingame.coldcaps') }}',
		oddcaps 			  : '{{ trans('ingame.oddcaps') }}',
		evencaps			  : '{{ trans('ingame.evencaps') }}',
		bigcaps 			  : '{{ trans('ingame.bigcaps') }}',
		smallcaps 			: '{{ trans('ingame.smallcaps') }}',
		doublecaps 			: '{{ trans('ingame.doublecaps') }}',
		triplecaps			: '{{ trans('ingame.triplecaps') }}',
		tie			        : '{{ trans('ingame.tie') }}'
	},

	multibet_dragontiger: {
		dragonwins 		: '{{ trans('ingame.dragonwins') }}',
		tigerwins 		: '{{ trans('ingame.tigerwins') }}',
		tie			      : '{{ trans('ingame.tie') }}',
		suitedtie			: '{{ trans('ingame.suitedtie') }}'
	},
	payouts: {
		players_whole_card 				    : '{{ trans('howto.players_whole_card') }}',
		players_whole_card_1 				  : '{{ trans('howto.players_whole_card_1') }}',
		players_whole_card_2 				  : '{{ trans('howto.players_whole_card_2') }}',
		players_whole_card_3 				  : '{{ trans('howto.players_whole_card_3') }}',
		players_whole_card_4 				  : '{{ trans('howto.players_whole_card_4') }}',
		players_whole_card_5 				  : '{{ trans('howto.players_whole_card_5') }}',
		players_whole_card_6 				  : '{{ trans('howto.players_whole_card_6') }}',
		players_whole_card_7 				  : '{{ trans('howto.players_whole_card_7') }}',
		players_whole_card_8 				  : '{{ trans('howto.players_whole_card_8') }}',
		poker_hand_ranking_list_1 		: '{{ trans('howto.poker_hand_ranking_list_1') }}',
		poker_hand_ranking_list_2 		: '{{ trans('howto.poker_hand_ranking_list_2') }}',
		poker_hand_ranking_list_3 		: '{{ trans('howto.poker_hand_ranking_list_3') }}',
		poker_hand_ranking_list_4 		: '{{ trans('howto.poker_hand_ranking_list_4') }}',
		poker_hand_ranking_list_5 		: '{{ trans('howto.poker_hand_ranking_list_5') }}',
		poker_hand_ranking_list_6 		: '{{ trans('howto.poker_hand_ranking_list_6') }}'
	},
  multibet_betareas : {
  	playerpair 	: '{{trans('ingame.m_playerpair')}}',
  	bankerpair 	: '{{trans('ingame.m_bankerpair')}}',
  	banker 	: '{{trans('ingame.m_banker')}}',
  	player 	: '{{trans('ingame.m_player')}}',
  	tie 	: '{{trans('ingame.m_tie')}}',
  	//dt
  	dragon 	: '{{trans('ingame.m_dragon')}}',
  	tiger 	: '{{trans('ingame.m_tiger')}}',
  	odd 	: '{{trans('ingame.m_odd')}}',
  	even 	: '{{trans('ingame.m_even')}}',
  	small 	: '{{trans('ingame.m_small')}}',
  	big 	: '{{trans('ingame.m_big')}}',
  	//poker
  	ante 	: '{{trans('ingame.m_ante')}}',
  	flop 	: '{{trans('ingame.m_flop')}}',
  	turn 	: '{{trans('ingame.m_turn')}}',
  	river 	: '{{trans('ingame.m_river')}}',
  	//sb

  	triple 	: '{{trans('ingame.m_triple')}}',
  	//butons

    classic     : '{{trans('ingame.m_classic')}}',
    supersix    : '{{trans('ingame.m_supersix')}}',
  	bonusbaccarat 	: '{{trans('ingame.m_bonusbaccarat')}}',
  	bonuspluspoker 	: '{{trans('ingame.m_bonuspluspoker')}}',
  	classicPoker 	: '{{trans('ingame.m_classicPoker')}}',
  },
    multibet_status : {
    	bettingend: '{{trans('ingame.bettingend')}}',
    	dealing : '{{trans('ingame.dealing')}}',
    	big : '{{trans('ingame.big')}}',
    	player : '{{trans('ingame.player')}}',
    	dealer : '{{trans('ingame.dealer')}}',
    	small : '{{trans('ingame.small')}}',
    	triple : '{{trans('ingame.triple')}}',
    	banker : '{{trans('ingame.banker')}}',
    	bankerpair : '{{trans('ingame.bankerpair')}}',
    	playerpair : '{{trans('ingame.playerpair')}}',
    	up : '{{trans('ingame.up')}}',
    	down : '{{trans('ingame.down')}}',
    	heaven : '{{trans('ingame.heaven')}}',
    	dragon : '{{trans('ingame.dragon')}}',
    	tiger : '{{trans('ingame.tiger')}}',
      tie : '{{trans('ingame.tie')}}',
      suitedtie : '{{trans('ingame.suitedtie')}}',

    	communitycard : '{{trans('ingame.communitycard')}}',

      maintenance : '{{trans('ingame.maintenance_list')}}',
    }

}

window.language2 = {
	locale: '{{ App::getLocale() }}',

	/***** Lobby ******/
	// Game Name
	lobby_gamename_texasholdem: "{!! trans('ingame-web.lobby_gamename_texasholdem') !!}",

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
	com_sub_ingameprompts_changebetrange:'{{trans('ingame-web.com_sub_ingameprompts_changebetrange')}}',
	com_sub_ingameprompts_changegamemode:'{{trans('ingame-web.com_sub_ingameprompts_changegamemode')}}',
	com_sub_ingameprompts_betfailed:'{{trans('ingame-web.com_sub_ingameprompts_betfailed')}}',
	com_sub_ingameprompts_shoechanged:'{{trans('ingame-web.com_sub_ingameprompts_shoechanged')}}',
	com_sub_ingameprompts_expiredroom:'{{trans('ingame-web.com_sub_ingameprompts_expiredroom')}}',
	com_sub_ingameprompts_disableroom:'{{trans('ingame-web.com_sub_ingameprompts_disableroom')}}',

	/***** Other Prompts ******/
	// Mobile
	other_prompts_mobile_fullscreen:'{{trans('ingame-web.other_prompts_mobile_fullscreen')}}',
	other_prompts_mobile_nodata:'{{trans('ingame-web.other_prompts_mobile_nodata')}}',
	other_prompts_mobile_flashplayer:'{{trans('ingame-web.other_prompts_mobile_flashplayer')}}',

	/***** Nihtan Junket ******/
	// Ingame
	nihtanjunket_ingame_user:'{{trans('ingame-web.nihtanjunket_ingame_user')}}',
	nihtanjunket_ingame_bets:'{{trans('ingame-web.nihtanjunket_ingame_bets')}}',
	nihtanjunket_ingame_winlose:'{{trans('ingame-web.nihtanjunket_ingame_winlose')}}',
	nihtanjunket_ingame_totalplayers:'{{trans('ingame-web.nihtanjunket_ingame_totalplayers')}}',
	nihtanjunket_ingame_totalbets:'{{trans('ingame-web.nihtanjunket_ingame_totalbets')}}',

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
	poker_winningdisplay_tie:'{{trans('ingame-web.poker_winningdisplay_tie')}}'
}


</script>
<script type="text/javascript" src="/js/screenfull.min.js"></script>
<script type="text/javascript" src="/osmf/swfobject.min.js"></script>
<script type="text/javascript" src="/dist/poker.min.js"></script>
<script type="text/javascript" src="/videoStream.js"></script>
<script type="text/javascript">

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

	// tutorials
	$('.tutorials--con, .progress-bar').hide();
	$('.btn-close, .btn-nevershow, .btn-cancel, .btn-startGame').click(function(){
		$('.progress-bar').hide();
		$('.tutorials').fadeOut('fast');
	});
	$('.btn-continue').click(function(){
		$('.progress-bar').show();
		$('.tutorials--img').hide();
		$(this).parent().hide();
		$(this).parent().next().fadeIn('slow');
		$('.progress-bar #'+$(this).parent().next().attr('id')).addClass("on");
		$('.progress').show();

		$('.btn-next').click(function(){
			var el = $(this).parent().parent();
			el.hide().next().fadeIn('slow'); //hide parent and show next
			$('.progress-bar #'+el.attr('id')).removeClass("on");
			$('.progress-bar #'+el.next().attr('id')).addClass("on");
			$('.progress-bar #'+el.prev().attr('id')).removeClass("on");
		});
	});
	// if(window.theme == 'white') {
	// 	$(".howto-wrap").addClass("white-theme");
	// 	$(".howto-wrap").removeClass("black-theme");
	// 	let img = $(".changeImg").each(function() {
	// 		let theme, src, path, newSrc;
	// 		src = $(this).attr("src");
	// 		path  = src.split("/");
	// 		theme = path.indexOf("dark");
	// 		path.splice(theme, 1, "light");
	// 		newSrc = path.join("/");
	// 		$(this).attr("src",newSrc);
	// 	});
	// }
});

</script>
<!-- <script type="text/javascript" src="/dist/pagination.min.js"></script> -->
<!-- <script type="text/javascript">
window.videoStream.setVolume(parseFloat(window.config.volume));
if(!parseInt(window.config.voice)) {
window.videoStream.setMuted(true);
} else {
window.videoStream.setMuted(false);
}
</script> -->

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js"></script>
<script type="text/javascript" src="/js/dom-events.js"></script>
<script type="text/javascript">
	window.setVideoVol = function () {
		if(window.component_has_loaded) {
			if(!parseFloat(window.config.voice)) {
				try {
					window.videoStream.setMuted(true);
				} catch(err) {

				}
			} else {
				try {
					window.videoStream.setMuted(false);
					window.videoStream.setVolume(parseFloat(window.config.voice));
				}
				catch(err) {

				}
			}
		}
	}
</script>
<script type="text/javascript">
$(function(){
	var win       = $(window);
	var howtowrap = $('.howto-wrap');
	var accent    = $('.howto-wrap--accent');
	var top       = $('#top');
	var wrapitems = $('.howto-wrap__items');

	$('a[href*="#"]').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target      = $(this.hash);
			target          = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			var ua = window.navigator.userAgent; // ie
			var trident = ua.indexOf('Trident/');
			if (trident > 0) {
				var scale = top[0].getBoundingClientRect().width / (top.width() + 17);
			} else {
				var scale = top[0].getBoundingClientRect().width / top.width();
			}

			var topPosition = $(this).attr('href') == '#gamerules' ? topPosition = 0 : (target.position().top / scale) + howtowrap.scrollTop();

			if (target.length) {
				howtowrap.animate({
					scrollTop: topPosition
				}, 500);
				return false;
			}
		}
	});

	howtowrap.scroll(function() {
		var scroll = $(this).scrollTop();
		resizeAccent();
		if (scroll <= 10) {
			$('.arrow-up').fadeOut();
			accent.fadeOut();
		} else {
			$('.arrow-up').fadeIn();
			accent.fadeIn();
		}
	});

	function resizeAccent() {
		var positionY = howtowrap.offset().top - wrapitems.scrollTop();
		var positionX = howtowrap.offset().left;
		var scale     = top[0].getBoundingClientRect().width / top.width();

		accent.css({
			'top'   : positionY,
			'left'  : (positionX - 3),
			'height': 30 * scale,
			'width' : (howtowrap.innerWidth() * scale)
		});
	}

	win.on('resize', resizeAccent);
	resizeAccent();
});

</script>
</html>
