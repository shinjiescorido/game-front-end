<!DOCTYPE html>
<html>
<head>
	<title>BACCARAT </title>
	<link rel="stylesheet" href="/css/howto.css" />
	<link rel="stylesheet" href="/css/app.css">
	<link rel="stylesheet" href="/css/tutorials.css" />
	<link rel="stylesheet" href="/css/prompts.css" />
	<link rel="stylesheet" href="/css/menu.css" />
	<link rel="stylesheet" href="/css/channel.css" />
	<link rel="stylesheet" href="/css/multibet.css" />
	<link rel="stylesheet" href="/css/notification.css" />
	<link rel="stylesheet" href="/css/junket.css" />
	<link rel="stylesheet" href="/css/balance-bet.css" />
	{{-- <link rel="stylesheet" href="/css/modal.css" /> --}}

	<link rel="stylesheet" type="text/css" href="/css/fpf-controller.css" />
	<script src="/js/createjs/createjs-2015.11.26.min.js"></script>
	<script src="/js/createjs/easeljs-0.8.2.min.js"></script>
	<script src="/js/createjs/tweenjs-0.6.2.min.js"></script>
	<script src="/js/createjs/soundjs-0.6.2.min.js"></script>
	<script src="/js/createjs/preloadjs-0.6.2.min.js"></script>
	<script src="/js/createjs/preloadjs-0.6.2.min.js"></script>
	<script src="/js/draggable/jquery.js"></script>
	<script src="/js/draggable/jquery-ui.js"></script>
<!-- 	<script type="text/javascript" src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
	<script type="text/javascript" src="https://code.createjs.com/1.0.0/easeljs.min.js"></script>
	<script type="text/javascript" src="https://code.createjs.com/1.0.0/tweenjs.min.js"></script>
	<script type="text/javascript" src="https://code.createjs.com/1.0.0/preloadjs.min.js"></script>
	<script type="text/javascript" src="https://code.createjs.com/1.0.0/soundjs.min.js"></script> -->
	{{-- <script src="/js/flippify-js/dependency/jquery-1.11.3.min.js"></script> --}}
	<script src="/js/flippify-js/dependency/hammer.min.js"></script>
	<script src="/js/flippify-js/dependency/isMobile.min.js"></script>
	<script src="/js/flippify-js/dependency/device.min.js"></script>
	<script src="/js/flippify-js/dependency/rAF.js"></script>
	<script src="/js/flippify-js/dependency/TweenMax.min.js"></script>
	<script src="/js/flippify-js/flippify-2.min.js"></script>
	<script src="/js/jsmpeg.pipe.js"></script>
	<link rel="stylesheet" type="text/css" href="/css/main-web.css">
	<script type="text/javascript">
		// URL
		window.socket =  '{{ env('APP_SOCKET') }}';
		window.p_domain = '{{ env('P_DOMAIN') }}';
		window.bc_domain = '{{ env('BC_DOMAIN') }}';
		window.sb_domain = '{{ env('SB_DOMAIN') }}';
		window.dt_domain = '{{ env('DT_DOMAIN') }}';
		window.pg_domain = '{{ env('PG_DOMAIN') }}';
		window.lobby_domain = '{{ env('LOBBY_DOMAIN') }}';

		// Table
		window.currencyAbbrev = '{!! $currencyAbbrev !!}';
		window.currencyMultiplier = {!! $currencyMultiplier !!};
		window.range = '{{$range}}';
		window.rangeDetails = {!! $rangeDetails !!};
		window.round_id = {!! $round_id !!}
		window.tableNum = {{$tableNum}}
		window.multiplayer = '{{$multiplayer}}';
		if ('{{$countryCheck}}' == 'KR') {
	      window.videostream_url = '{{ $stream ? $stream->korea_stream : '' }}';
	    } else {
	      window.videostream_url = '{{ $stream ? $stream->web_stream : '' }}';
	    }
		window.casino = @if($currency == 'KRW' || $currency == 'THB') 'N' @else 'SS' @endif;
		window.mainMultiplier = {!! $mainMultiplier !!};
		window.allRange = {!!json_encode($allRange)!!};
		window.vendorEndDate = '{!! $vendorEndDate !!}';
		window.vendorSound = '{!! $vendorSound !!}';

		// User
		window.t_type = '{{ $betConfig ? is_array($betConfig->type)?$betConfig->type[0]:$betConfig->type : 'normal' }}';
		window.userMultiplier = {!! $userMultiplier !!};
		window.userId = {{Auth::user()->id}}
		window.user_type = "{{ app('auth')->user()->user_type }}";
		window.userAuthority = '{{Auth::user()->authority == "a" ? "admin" : "user" }}';
		window.user_chips = {!! $userChips !!};
		window.integrationType = '{!! $integrationType !!}';
		window.reel_yn = {!! $reel_yn !!};
		window.room_yn = {!! $room_yn !!};
		window.lobby_type = '{!! $lobby_type !!}';
		window.lobby_redirect_url = '{!! $lobby_redirect_url !!}';
		{{-- window.isPlayer = '{!! $isPlayer !!}'; --}}

    //agent range
    window.agent_range =  {!! $agentRange !!};

		window.gameInfo = {!! $gameInfo !!};
		window.game = '{{ env('CUR_GAME') }}';
		window.junket = {!! $junket !!};
		window.vendorData = {!! $vendorData !!};
		window.vendor_id = {!! $vendor_id !!};

		// window.user_chips = ["1","5","10","30","max"];

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

		window.vendorTable = '{!!$vendorTables!!}'
	</script>

	<style type="text/css">
	#flippy-wrapper {
		background-color: transparent;
		position: absolute;
		width: 100%;
		height: 100%;
/*		width: 40%;
    	height: 70%;*/
		z-index: 999;
		transform: translate(-50%,-50%);
		position: absolute;
		/*  width: 50%;
		height: 50%;*/
		left: 50%;
		top: 50%;
	}

	html,body {
		margin:0;
		padding:0;
		background: #000;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	canvas {
		position: absolute;
		/*left:0;*/
		right: 0;
		/*background: #642121*/
	}
	#vidCanvas {
		display: none;
		position: absolute;
		right: 0;
		top: 0;
    width: 1920px;
    height: 1075px;
	}
	#flip {
		z-index: 999999999999
	}
	#myCanvas {
		display: block;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		-moz-transform: translate(-50%, -50%);
		-o-transform: translate(-50%, -50%);
		background-size: 100% 100%;
		/*background: #828282*/
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
	.bg-guide {
		width: 1921px;
		height: 900px;
		background: url(/img/bg.png);
		position: absolute;
		background-size: cover;
		right: 0px;
		opacity: 0.3;
	}
	.container {
		left: 0;
		right: 0;
		margin: auto;
		position: absolute;
		top: 0;
		bottom: 0;
		overflow: hidden;
		/*z-index: 1;*/
	}
	.container::after {
		background: url('/img/6multi.jpg');
    background-size: 100% 100%;
	  /*content: "";*/
	  position: absolute;
	  height: 100%;
    width: 100%;
    opacity: 0.1;
    z-index: 0;
    top:-9.5px;
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

	::-webkit-scrollbar{
		width: 5px;  /* for vertical scrollbars */
		height: 5px; /* for horizontal scrollbars */
	}

	::-webkit-scrollbar-thumb{
		background: #ff9a28;
	}
	/*#flippy-wrapper > canvas {
		left:20%;
	}*/
	.hack {
		position: absolute;
	    z-index: 999999999;
	    width: 500px;
	    height: 420px;
	    display: block;
	    right: 5.5%;
	    overflow: hidden;
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

	#flippy-wrap {
		position: relative;
		width: 32%;
		height: 43%;
		/*background: rgba(0,0,0,0.5);*/
		border-radius: 10px;
		position: absolute;
		top: -20%;
		left: 0;
		right: 0%;
		bottom: 0;
		margin: auto;
		z-index: 999;
		display: none
	}
	#flippy-wrap > canvas {
		top: -6%;
	}
	.flip-bg {
		position: absolute;
		background:rgba(0,0,0,0.5);
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
	.guideline {
		width: 50%;
		border-right: 2px solid red;
		height: 100%;
		position: absolute;
		z-index: 111;

	}
	.footer-guide {
		width: 480px;
    background: rgba(255,0,0,0.3);
    height: 190px;
    position: absolute;
    z-index: 111;
    right: 50%;
    top: 82.4%;
	}
	.chips-guide {
		width: 450px;
    background: rgba(100,255,255,0.2);
    height: 90px;
    position: absolute;
    z-index: 111;
    right: 50%;
    top: 90.8%;
	}
	.gamebuttons-guide {
		width: 344px;
    background: rgba(255,0,255,0.2);
    height: 120px;
    position: absolute;
    z-index: 111;
    right: 50%;
    top: 78%;
	}
/*	.table-guide {
		width: 80%;
    background: rgba(255,0,0,0.2);
    height: 250px;
    position: absolute;
    z-index: 111;
    right: 50%;
    top: 50.8%;
	}*/
	.playerinfo-guide {
		width: 215px;
		background: rgba(255,255,0,0.2);
		height: 250px;
		position: absolute;
		z-index: 111;
		right: 68.1%;
		top: 82.7%;
	}
	.table-guide {
		perspective: 100px;
    /*background: rgba(255,0,0,0.2);*/
    height: 250px;
    position: absolute;
    z-index: 111;
    right: 50%;
    top: 56.8%;

	}
	.table-guide>div {
    transform: rotateX(5deg) translate(-50%, 0);
	}
	.table-guide>div:nth-child(1) {
		width: 1454px;
    height: 212px;
    background: rgba(255,255,0,0.2);
    position: absolute;
    left:0;
	}
	.table-guide>div:nth-child(2) {
		width: 844px;
    height: 212px;
    background: rgba(255,0,0,0.2);
    position: absolute;
    left:0;
	}
	.table-guide>div:nth-child(3) {
		width: 280px;
    height: 212px;
    background: rgba(0,0,255,0.2);
    position: absolute;
    left:0;
	}
	.howto-wrap { top: 0; }
</style>

<!-- font face here-->
<style type="text/css">
  @font-face {
    font-family: bebas-regular;
    src: url("/fonts/BebasNeue.eot"), /* IE9 Compat Modes */
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

<!-- <style type="text/css">
	@font-face {
		font-family: lato-black;
		src: url("/fonts/Lato-Black.ttf") format("truetype"); /* IE9 Compat Modes */;
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: lato-bold;
		src: url("/fonts/Lato-bold.ttf") format("truetype"); /* IE9 Compat Modes */;
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: lato-regular;
		src: url("/fonts/Lato-Regular.ttf") format("truetype"); /* IE9 Compat Modes */;
		font-weight: normal;
		font-style: normal;
	}
</style> -->

@if(App::getLocale() === 'jp')
<!-- <style type="text/css">
	@font-face {
		font-family: noto-jp-black;
		src: url("/fonts/NotoSansCJKjp-Black.otf") format("opentype"); /* IE9 Compat Modes */;
		font-weight: normal;
		font-style: normal;
	}

	@font-face {
		font-family: noto-jp-regular;
		src: url("/fonts/NotoSansCJKjp-Regular.otf") format("opentype"); /* IE9 Compat Modes */;
		font-weight: normal;
		font-style: normal;
	}

	@font-face {
		font-family: noto-jp-black;
		src: url("/fonts/NotoSansCJKjp-Black.otf") format("opentype"); /* IE9 Compat Modes */;
		font-weight: normal;
		font-style: normal;
	}
</style> -->
@endif

@if(App::getLocale() === 'kr')
<!-- <style type="text/css">
	@font-face {
		font-family: noto-kr-black;
		src: url("/fonts/NotoSansCJKkr-Black.otf") format("opentype"); /* IE9 Compat Modes */;
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: noto-kr-regular;
		src: url("/fonts/NotoSansCJKkr-Regular.otf") format("opentype"); /* IE9 Compat Modes */;
		font-weight: normal;
		font-style: normal;
	}
</style> -->
@endif

@if(App::getLocale() === 'zh')
<!-- <style type="text/css">
	@font-face {
		font-family: noto-zh-black;
		src: url("/fonts/NotoSansCJKsc-Black.otf") format("opentype"); /* IE9 Compat Modes */;
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: noto-zh-regular;
		src: url("/fonts/NotoSansCJKsc-Regular.otf") format("opentype"); /* IE9 Compat Modes */;
		font-weight: normal;
		font-style: normal;
	}

</style> -->
@endif

@if(App::getLocale() === 'th')
<!-- <style type="text/css">
	@font-face {
		font-family: noto-th-black;
		src: url("/fonts/NotoSansThai-Black.ttf") format("opentype"); /* IE9 Compat Modes */;
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: noto-th-regular;
		src: url("/fonts/NotoSansThai-Regular.ttf") format("opentype"); /* IE9 Compat Modes */;
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: noto-th-regular;
		src: url("/fonts/NotoSansThai-Regular.ttf") format("opentype"); /* IE9 Compat Modes */;
		font-weight: normal;
		font-style: normal;
	}
	@font-face {
		font-family: UnBatangBold;
		src: url("/fonts/UnBatangBold.ttf") format("opentype"); /* IE9 Compat Modes */;
		font-weight: normal;
		font-style: normal;
	}
</style> -->
@endif
</head>
<body>
	{{--<div style="position: absolute; z-index: 999999999999">
		<input type="" name="" id="banker-bet" placeholder="banker">
		<input type="" name="" id="player-bet"  placeholder="player">
		<button id="confirmbet">CONFIRM</button>
		<button id="clear">clear</button>
	</div>--}}

    {{-- <input type="text" id="maintenance-gamename">
    <input type="text" id="maintenance-tableid">
    <button id = "maintenanceOnn">maintenanceOnn</button>
    <button id = "maintenanceOff">maintenanceOff</button> --}}


    {{-- <button id = "enable">enable table</button>
    <button id = "disable">disable table</button> --}}
<!-- 	<div style="position: absolute;z-index: 9999">
		<button id="toggle-range">toggle-range	</button>
		<button id="banker1">banker1	</button>
		<button id="player1">	player1</button>
		<button id="banker2">	banker2</button>
		<button id="player2">	player2</button>
		<button id="player3">	player3</button>
		<button id="banker3">	banker3</button>
		@for($x =0; $x < count($allRange); $x++)
		<button class="range-select" data='{{$allRange[$x]->min}}-{{$allRange[$x]->max}}' >{{$allRange[$x]->min}} - {{$allRange[$x]->max}}</button>
		@endfor
	</div> -->

	<span style = "font-family: lato"></span>
	<span style = "font-family: latoblack"></span>
	<span style = "font-family: BebasNeue"></span>
	<span style = "font-family: noto-zh-reg"></span>
	<span style = "font-family: noto-zh-black"></span>
	<span style = "font-family: noto-th-reg"></span>
	<span style = "font-family: noto-th-black"></span>
	<span style = "font-family: noto-kr-reg"></span>
	<span style = "font-family: noto-kr-black"></span>
	<span style = "font-family: noto-jp-reg"></span>
	<span style = "font-family: noto-jp-black"></span>


	<span style = "font-family: lato"></span>
	<span style = "font-family: lato-bold"></span>
	<span style = "font-family: lato-black"></span>
	<span style = "font-family: BebasNeue"></span>
	<span style = "font-family: noto-zh-reg"></span>
	<span style = "font-family: noto-zh-black"></span>
	<span style = "font-family: noto-th-reg"></span>
	<span style = "font-family: noto-th-black"></span>
	<span style = "font-family: noto-kr-reg"></span>
	<span style = "font-family: noto-kr-black"></span>
	<span style = "font-family: noto-jp-reg"></span>
	<span style = "font-family: noto-jp-black"></span>

	<div class="bg"></div>
	<div class="container">

	<!-- 	<div class="guideline"></div>
		<div class="footer-guide dom-resizable guide"></div>
		<div class="gamebuttons-guide dom-resizable guide"></div>
		<div class="chips-guide dom-resizable guide"></div>
		<div class="table-guide dom-resizable guide"></div>
		<div class="playerinfo-guide dom-resizable guide"></div>
		<div class="table-guide dom-resizable guide">
			<div></div>
			<div></div>
			<div></div>
		</div>
 -->
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

		<div class="container">
			<div id="player" class="dom-resizable"></div>

			{{-- Flippy component --}}
			<div id ="flippy-wrap">
				<div class="flip-bg"></div>
				<button id = "open-all" class="dom-resizable">{{ trans('ingame-web.baccarat_winningdisplay_openall') }}</button>
			</div>

			<div class="notification-container dom-resizable"></div>
			<canvas id="myCanvas" width="1920px" width="1080px"></canvas>
			{{--<div class="bg-guide dom-resizable"></div>--}}
			
			@if(isset($_GET['token']))
				@include('balance-bet')
			@endif

			@include('multibet')
			@include('channel')
			@include('junket')
			@include('menu')

			{{-- Modal 
			<div id="mdlConfirmation" class="dom-resizable">
				<div class="mdl_overlay"></div>
				<div id="mdl_kick-con" class="mdl_bg">
					<div class="mdl_warning_ico"></div>
					<div class="mdl_message">You are already a banker<br/>in another game.</div>
					<div class="mdl_lobby">
						<span>EXIT TO LOBBY</span>
					</div>
				</div>
			</div>--}}

			<a href="https://www.macromedia.com/go/getflashplayer">
				<button class="get-flash dom-resizable">
					<img src="/img/icons/getFlash.png" style="width: 500px">
					<div style="color: #fff; font: 26px Arvo; margin-top: 10px;">{!! trans('ingame-web.other_prompts_mobile_flashplayer') !!}</div>
				</button>
			</a>

		</div> {{-- .container --}}

<!-- 		<div style="position: absolute;left: 0; width: 24%; z-index: 99999999999999; background: blue">
			<input type="text" id="user_name" value="username">
			<input type="text" id="user_id" value="user id">
			<input type="text" id="user_range" value="user range">
			<button id="multi-join">join</button>
			<button id="multi-bet">bet</button>
			<button id="multi-leave">leave</button>
			<button id="multi-cancel">cancel</button> -->
		<!-- 	<button id = "newround" style="">newround</button>
			<button id = "bettimer" style="">start time</button>
				<button id = "player1" style="">player1</button>
				<button id = "player2" style="">player2</button>
				<button id = "player3" style="">player3</button>
				<button id = "banker1" style="">banker1</button>
				<button id = "banker2" style="">banker2</button>
				<button id = "banker3" style="">banker3</button>
				<button id = "swipethis" style="">swipethis</button> -->
<!-- 				<button id="poker-newround">poker-newround</button>
				<button id="poker-bettimer">poker-bettimer</button>
				<button id="newround">newround</button>
				<button id="burn1">burn1</button>
				<button id="burn2">burn2</button>
				<button id="player1">player1</button>
				<button id="player2">player2</button>
				<button id="community1">community1</button>
				<button id="community2">community2</button>
				<button id="community3">community3</button>
				<button id="turn">turn</button>
				<button id="river">river</button>
				<button id="dealer1">dealer1</button>
				<button id="dealer2">dealer2</button> -->
				<!-- <button id="checkgameinfo">checkgameinfo</button> -->
  	<!-- </div> -->

  		<!-- <div id="onLoadWrap"></div> -->
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
				@else
				<div class="tutorial-items -upper -balancebet">
					<div class="tutorial-item -left -balancebet">
						<div class="tutorial-item__header">{{trans('tutorials.balanceBet')}}</div>
						<div class="tutorial-item__sub-header">{!!trans('tutorials.balanceBet_desc')!!}</div>
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
</body>

	<script type="text/javascript">
	window.user_money = parseInt('{{$money}}');
	window.user_name = '{{$user_name}}';
	</script>

	<script type="text/javascript">
	window.sample_saved_bets = [];

  window.language = {
      locale: '{{ App::getLocale() }}',
      menu: {
          cashin				: '{{ trans('ingame.cashin') }}',
          cashout				: '{{ trans('ingame.cashout') }}',
          betscaps    		: '{{ trans('ingame.betscaps') }}',
          winningresultcaps   : '{{ trans('ingame.winningresultcaps') }}',

          exit				: '{{ trans('ingame.exit') }}',
          fullscreen			: '{{ trans('ingame.fullscreen') }}',
          howtoplay			: '{{ trans('ingame.howtoplay') }}',
          refreshvideo		: '{{ trans('ingame.refreshvideo') }}',
          videosettings		: '{{ trans('ingame.videosettings') }}',
          playerinfo			: '{{ trans('ingame.playerinfo') }}',
          roominfo			: '{{ trans('ingame.roominfo') }}',
          records				: '{{ trans('ingame.records') }}',
          transfer			: '{{ trans('ingame.transfer') }}',
          modifychips			: '{{ trans('ingame.modifychips') }}',
          multiplayer			: '{{ trans('ingame.multiplayer') }}',
          settings			: '{{ trans('ingame.settings') }}',
          transferlogs        : '{{ trans('ingame.transferlogs') }}',
          betlogs             : '{{ trans('ingame.betlogs') }}',
          gamehistory         : '{{ trans('ingame.gamehistory') }}',

          playerinfocaps 		: '{{ trans('ingame.playerinfocaps') }}',
          playername 			: '{{ trans('ingame.playername') }}',
          playerbalance 		: '{{ trans('ingame.playerbalance') }}',
          roundid 			: '{{ trans('ingame.roundid') }}',
          dealernamecaps 		: '{{ trans('ingame.dealernamecaps') }}',
          channelcaps			: '{{ trans('ingame.channelcaps') }}',
          cardvaluescaps		: '{{ trans('ingame.cardvaluescaps') }}',
          total 				: '{{ trans('ingame.total') }}',
          bet_info 			: '{{ trans('ingame.bet_info') }}',
          tie_info 			: '{{ trans('ingame.tie_info') }}',
          pair_info 			: '{{ trans('ingame.pair_info') }}',

          roominfocaps 		: '{{ trans('ingame.roominfocaps') }}',
          numofplayers 		: '{{ trans('ingame.numofplayers') }}',
          sumofbets 			: '{{ trans('ingame.sumofbets') }}',

          howtoplaycaps 		: '{{ trans('ingame.howtoplaycaps') }}',
          gamerules 			: '{{ trans('ingame.gamerules') }}',
          gameplaytutorial	: '{{ trans('ingame.gameplaytutorial') }}',

          recordscaps 		: '{{ trans('ingame.recordscaps') }}',
          transferlogscaps	: '{{ trans('ingame.transferlogscaps') }}',
          datecaps			: '{{ trans('ingame.datecaps') }}',
          betcaps 			: '{{ trans('ingame.betcaps') }}',
          typecaps 			: '{{ trans('ingame.typecaps') }}',
          oldcreditcaps 		: '{{ trans('ingame.oldcreditcaps') }}',
          transferamountcaps	: '{{ trans('ingame.transferamountcaps') }}',
          newcreditcaps 		: '{{ trans('ingame.newcreditcaps') }}',
          ipcaps 				: '{{ trans('ingame.ipcaps') }}',
          countrycaps			: '{{ trans('ingame.countrycaps') }}',
          nodata				: '{{ trans('ingame.nodata') }}',
          payoutcaps			: '{{ trans('ingame.payoutcaps') }}',

          betlogscaps 		: '{{ trans('ingame.betlogscaps') }}',
          gamenocaps 			: '{{ trans('ingame.gamenocaps') }}',
          tablecaps			: '{{ trans('ingame.tablecaps') }}',
          roomcaps 			: '{{ trans('ingame.roomcaps') }}',
          startingcreditcaps 	: '{{ trans('ingame.startingcreditcaps') }}',
          totalbetcaps		: '{{ trans('ingame.totalbetcaps') }}',
          totalwinningscaps 	: '{{ trans('ingame.totalwinningscaps') }}',
          resultcaps 			: '{{ trans('ingame.resultcaps') }}',

          gamehistorycaps 	: '{{ trans('ingame.gamehistorycaps') }}',

          transferfundscaps 	: '{{ trans('ingame.transferfundscaps') }}',
          enteramount 		: '{{ trans('ingame.enteramount') }}',
          availablebalance	: '{{ trans('ingame.availablebalance') }}',
          transfercaps 		: '{{ trans('ingame.transfercaps') }}',

          modifychipscaps 	: '{{ trans('ingame.modifychipscaps') }}',
          changechipshere 	: '{{ trans('ingame.changechipshere') }}',
          applynowcaps		: '{{ trans('ingame.applynowcaps') }}',
          clearchipscaps 		: '{{ trans('ingame.clearchipscaps') }}',

          settingscaps 		: '{{ trans('ingame.settingscaps') }}',
          mastervolume 		: '{{ trans('ingame.mastervolume') }}',
          soundeffects		: '{{ trans('ingame.soundeffects') }}',
          voice 				: '{{ trans('ingame.voice') }}',
          darktheme			: '{{ trans('ingame.darktheme') }}',
          wincaps    			: '{{ trans('ingame.wincaps') }}',
          losecaps    		: '{{ trans('ingame.losecaps') }}',
          showtutorial 		: '{{ trans('ingame.showtutorial') }}',
          flashmsg 			: '{{ trans('ingame.flashmsg') }}',
          burncardcaps 		: '{{ trans('ingame.burncardcaps') }}'

      },
      toggle_button : {
          single_player : '{{ trans('ingame.singleplayer') }}'
      },
      gamename: {
          dragontiger_game 	: '{{ trans('ingame.dragontiger_game') }}',
          sicbo_game 			: '{{ trans('ingame.sicbo_game') }}',
          poker_game 			: '{{ trans('ingame.poker_game') }}',
          baccarat_game 		: '{{ trans('ingame-web.lobby_gamename_baccarat') }}',
          roulette_game 		: '{{ trans('ingame.roulette_game') }}',
          redwhite_game 		: '{{ trans('ingame.redwhite_game') }}',
          spinwin_game 		: '{{ trans('ingame.spinwin_game') }}',
          paigow_game 		: '{{ trans('ingame.paigow_game') }}',
          supersix 			: '{{ trans('ingame-web.lobby_gamename_supersix') }}',
          dragonbonus   : '{{ trans('ingame.dragonbonus') }}',
          texas   : 	"{!! trans('ingame-web.lobby_gamename_texasholdem') !!}",
          bonusplus   : '{{trans('ingame-web.poker_betlayout_bonusplus')}}',
          bc_classic : '{{trans('ingame-web.baccarat_betlayout_classic')}}'
      },
      channel: {
          channel 			: '{{ trans('ingame.channel') }}',
          bet 				: '{{ trans('ingame.bet') }}'
      },
      bet_details: {
          winningscaps 		: '{{ trans('ingame.winningscaps') }}'
      },
      player_info: {
          win 				: '{{ trans('ingame.win') }}',
          lose 				: '{{ trans('ingame.lose') }}'
      },
      statistics: {
          autobetcaps 		: '{{ trans('ingame.autobetcaps') }}',
          whitecaps 			: '{{ trans('ingame.whitecaps') }}',
          redcaps 			: '{{ trans('ingame.redcaps') }}',
          gamestatscaps 		: '{{ trans('ingame.gamestatscaps') }}',
          statscaps 			: '{{ trans('ingame.statscaps') }}',
          livebetscaps 		: '{{ trans('ingame.livebetscaps') }}',
          playerscaps 		: '{{ trans('ingame.playerscaps') }}',
          last150results 		: '{{ trans('ingame.last150results') }}',
      },
      advanced_bet: {
          advancebetcaps 		: '{{ trans('ingame.advancebetcaps') }}',
          rounds 				: '{{ trans('ingame.rounds') }}',
          customcaps 			: '{{ trans('ingame.customcaps') }}',
          oddcaps 			: '{{ trans('ingame.oddcaps') }}',
          evencaps 			: '{{ trans('ingame.evencaps') }}',

          msgmain 			: '{{ trans('ingame.msgmain') }}',
          msgplacebets 		: '{{ trans('ingame.msgplacebets') }}',
          msgminimum 			: '{{ trans('ingame.msgminimum') }}',
          msgcustom 			: '{{ trans('ingame.msgcustom') }}',

          msgodd 				: '{{ trans('ingame.msgodd') }}',
          msgeven 			: '{{ trans('ingame.msgeven') }}',
          msgselectrounds 	: '{{ trans('ingame.msgselectrounds') }}',
          msgconfirm 			: '{{ trans('ingame.msgconfirm') }}',
          msgcondition2 		: '{{ trans('ingame.msgcondition2') }}',
          msgcondition3 		: '{{ trans('ingame.msgcondition3') }}',
          msgwait 			: '{{ trans('ingame.msgwait') }}',
          msgoddplaced 		: '{{ trans('ingame.msgoddplaced') }}',
          msgevenplaced 		: '{{ trans('ingame.msgevenplaced') }}',
          msgclear 			: '{{ trans('ingame.msgclear') }}',
          msgbalance 			: '{{ trans('ingame.msgbalance') }}',
          msgbetsconfirmed 	: '{{ trans('ingame.msgbetsconfirmed') }}',
          msgremaining 		: '{{ trans('ingame.msgremaining') }}',
          msgwin 				: '{{ trans('ingame.msgwin') }}',
          msgcancelling 		: '{{ trans('ingame.msgcancelling') }}',
          msgallbetsdone 		: '{{ trans('ingame.msgallbetsdone') }}',
          msgfunds 			: '{{ trans('ingame.msgfunds') }}'
      },
      game_buttons: {
          confirmcaps 		: '{{ trans('ingame.confirmcaps') }}',
          clearcaps 			: '{{ trans('ingame.clearcaps') }}',
          repeatcaps 			: '{{ trans('ingame.repeatcaps') }}',
          undocaps 			: '{{ trans('ingame.undocaps') }}'
      },
      prompts: {
          promptnobets 		: '{{ trans('ingame.promptnobets') }}',
          promptdealer 		: '{{ trans('ingame.promptdealer') }}',
          promptmaxbet 		: '{{ trans('ingame.promptmaxbet') }}',
          promptminbet 		: '{{ trans('ingame.promptminbet') }}',
          promptshoechange 	: '{{ trans('ingame.promptshoechange') }}',
          promptshuffling 	: '{{ trans('ingame.promptshuffling') }}',
          promptmaintenance 	: '{{ trans('ingame.promptmaintenance') }}',
          promptnobetcaps 	: '{{ trans('ingame.promptnobetcaps') }}',
          promptbackcaps 		: '{{ trans('ingame.promptbackcaps') }}',
          promptcontcaps 		: '{{ trans('ingame.promptcontcaps') }}',
          promptfunds 		: '{{ trans('ingame.promptfunds') }}',
          promptlanguage 		: '{{ trans('ingame.promptlanguage') }}',
          prompttheme 		: '{{ trans('ingame.prompttheme') }}',
          promptrefresh 		: '{{ trans('ingame.promptrefresh') }}',
          promptyes 			: '{{ trans('ingame.promptyes') }}',
          promptcancel 		: '{{ trans('ingame.promptcancel') }}',
          promptbetfail 		: '{{ trans('ingame.promptbetfail') }}',
          promptbetfail2 		: '{{ trans('ingame.promptbetfail2') }}',
          promptaddfail 		: '{{ trans('ingame.promptaddfail') }}',

          promptplacebets 	: '{{ trans('ingame.promptplacebets') }}',
          promptactivated 	: '{{ trans('ingame.promptactivated') }}',
          promptcancelauto 	: '{{ trans('ingame.promptcancelauto') }}',
          promptcancelbets 	: '{{ trans('ingame.promptcancelbets') }}',
          promptfirstround  	: '{{ trans('ingame.promptfirstround') }}'
      },
      game_specific: {
          playerwins 			: '{{ trans('ingame.playerwins') }}',
          bankerwins 			: '{{ trans('ingame.bankerwins') }}',
          tie 			    	: "{!! trans('ingame.tie') !!}",

          player 			    : "{!! trans('ingame.player') !!}",
          playerpair 			: "{!! trans('ingame.playerpair') !!}",
          banker 			    : "{!! trans('ingame.banker') !!}",
          bankerpair 			: "{!! trans('ingame.bankerpair') !!}",
          big 						: "{!! trans('ingame.big') !!}",
          small 						: "{!! trans('ingame.small') !!}",
          bonus 					: "{!! trans('ingame.bonus') !!}"
      },
      multibet_poker: {
          dealer 				: '{{ trans('ingame.dealer') }}',
          player 				: '{{ trans('ingame.player') }}',
          gameno 				: '{{ trans('ingame.gameno') }}',
          communitycard 		: '{{ trans('ingame.communitycard') }}',
          result 			    : '{{ trans('ingame.result') }}',
          playerwins 			: '{{ trans('ingame.playerwins_poker') }}',
          dealerwins 			: '{{ trans('ingame.dealerwins') }}',
          tie 				: '{{ trans('ingame.tie') }}'
      },

      multibet_sicbo: {
          oddevencaps 		: '{{ trans('ingame.oddevencaps') }}',
          bigsmallcaps 		: '{{ trans('ingame.bigsmallcaps') }}',
          sumcaps 			: '{{ trans('ingame.sumcaps') }}',
          dicecaps			: '{{ trans('ingame.dicecaps') }}',
          hotcaps 			: '{{ trans('ingame.hotcaps') }}',
          coldcaps 			: '{{ trans('ingame.coldcaps') }}',
          oddcaps 			: '{{ trans('ingame.oddcaps') }}',
          evencaps			: '{{ trans('ingame.evencaps') }}',
          bigcaps 			: '{{ trans('ingame.bigcaps') }}',
          smallcaps 			: '{{ trans('ingame.smallcaps') }}',
          doublecaps 			: '{{ trans('ingame.doublecaps') }}',
          triplecaps			: '{{ trans('ingame.triplecaps') }}',
          tie			: '{{ trans('ingame.tie') }}'
      },

      multibet_dragontiger: {
          dragonwins 		: '{{ trans('ingame.dragonwins') }}',
          tigerwins 		: '{{ trans('ingame.tigerwins') }}',
          tie			: '{{ trans('ingame.tie') }}',
          suitedtie			: '{{ trans('ingame.suitedtie') }}'
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
		    	youwin : '{{trans('ingame.youwin')}}',

      }
  }

  window.language2 = {
      locale: '{{ App::getLocale() }}',

			/***** Lobby ******/
			// game names
			lobby_gamename_baccarat: '{{trans('ingame-web.lobby_gamename_baccarat')}}',
			lobby_gamename_supersix: '{{trans('ingame-web.lobby_gamename_supersix')}}',

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
			com_sub_ingameprompts_disableroom:'{{trans('ingame-web.com_sub_ingameprompts_disableroom')}}',
			com_sub_ingameprompts_createsecretroom:'{{trans('ingame-web.com_sub_ingameprompts_createsecretroom')}}',
			com_sub_ingameprompts_expiredroom:'{{trans('ingame-web.com_sub_ingameprompts_expiredroom')}}',
			com_sub_ingameprompts_disbandroom:'{{trans('ingame-web.com_sub_ingameprompts_disbandroom')}}',

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
      nihtanjunket_ingame_balancebetcancelfail:'{{trans('ingame-web.nihtanjunket_ingame_balancebetcancelfail')}}',
      nihtanjunket_ingame_balancebetfail:'{{trans('ingame-web.nihtanjunket_ingame_balancebetfail')}}',
      nihtanjunket_ingame_balancebet:'{{trans('ingame-web.nihtanjunket_ingame_balancebet')}}',

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
			baccarat_winningdisplay_playerpair:'{{trans('ingame-web.baccarat_winningdisplay_playerpair')}}'
  }

	window.language.menuHowToPlay = {gameobjective : ""}

	window.dealer = {
		"screen_name" : "april",
		"img" : "april.png",
		"image" : "april.png"
	}

window.tutorial_enabled = window.config.tutorial == "true";
window.theme = window.config.screen; //window.tutorial_enabled ? (window.config.screen == "black" ? "white" : "black") : window.config.screen;
window.slave = '{{$slave}}';
window.slave = window.slave.indexOf('bonus') > -1? '' : window.slave;

	window.bet_limit = {
		min: 1000,
		max: 200000
	}
	</script>

	<script type="text/javascript" src = "/js/screenfull.min.js"></script>
	<script type="text/javascript" src="/osmf/swfobject.min.js"></script>
	<script type="text/javascript" src="/dist/baccarat.min.js"></script>
	<script type="text/javascript" src="/videoStream.js"></script>
	<script type="text/javascript" src="/js/dom-events.js"></script>
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
	</script>
	<!-- <script type="text/javascript">
	var interval =  setInterval( function() {
	try {
	window.videoStream.setVolume(parseFloat(window.config.volume));
	if(!parseInt(window.config.voice)) {
	window.videoStream.setMuted(true);
} else {
window.videoStream.setMuted(false);
}

clearInterval(interval)
} catch(err) {

}

},1000)
</script> -->
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
	$(document).ready(function() {
		$('a[href*="#"]').click(function() {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				var ua = window.navigator.userAgent; // ie
				var trident = ua.indexOf('Trident/');
				if (trident > 0) {
					var scale = $('#top')[0].getBoundingClientRect().width / ($('#top').width() + 17);
				} else {
					var scale = $('#top')[0].getBoundingClientRect().width / $('#top').width();
				}

				var topPosition = $(this).attr('href') == '#gamerules' ? topPosition = 0 : (target.position().top / scale) + $('.howto-wrap').scrollTop();


				if (target.length) {
					$('.howto-wrap').animate({
						scrollTop: topPosition
					}, 500);
					return false;
				}
			}
		});

		// tutorials
		window.multiplayer == 1 ? $("#bettingLayout, li#bettingLayout").remove() : $("#bettingLayoutMulti, li#bettingLayoutMulti").remove();
		window.t_type == 'flippy' ? $("#flippyCard, li#flippyCard, #flippyCardImg, li#flippyCardImg").add() : $("#flippyCard, li#flippyCard, #flippyCardImg, li#flippyCardImg").remove();
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
    //     let theme, src, path, newSrc;
    //     src = $(this).attr("src");
    //     path  = src.split("/");
    //     theme = path.indexOf("dark");
    //     path.splice(theme, 1, "light");
    //     newSrc = path.join("/");
    //     $(this).attr("src",newSrc);
    //   });
		// }
	});

	$(function(){
			var win       = $(window);
			var howtowrap = $('.howto-wrap');
			var accent    = $('.howto-wrap--accent');
			var top       = $('#top');
			var wrapitems = $('.howto-wrap__items');

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
