<!DOCTYPE html>
<html>
<head>
	<title>M BACCARAT</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="mobile-web-app-capable" content="yes">
  	<meta name="apple-mobile-web-app-capable" content="yes" />
  	<meta name="apple-mobile-web-app-status-bar-style" content="black" />

	<link href="https://fonts.googleapis.com/css?family=Arvo:400,700,700i" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
	<link rel="stylesheet" href="/css/howto-m.css" />
	<link rel="stylesheet" href="/css/app.css">
	<link rel="stylesheet" href="/css/tutorials-mobile.css" />
	<link rel="stylesheet" href="/css/prompt-mobile.css" />
	<link rel="stylesheet" type="text/css" href="/css/fpf-controller.css" />
	<script src="/js/createjs/createjs-2015.11.26.min.js"></script>
	<script src="/js/createjs/easeljs-0.8.2.min.js"></script>
	<script src="/js/createjs/tweenjs-0.6.2.min.js"></script>
	<script src="/js/createjs/soundjs-0.6.2.min.js"></script>
	<script src="/js/createjs/preloadjs-0.6.2.min.js"></script>
	<script src="/js/flippify-js/dependency/jquery-1.11.3.min.js"></script>
	<script src="/js/flippify-js/dependency/hammer.min.js"></script>
	<script src="/js/flippify-js/dependency/isMobile.min.js"></script>
	<script src="/js/flippify-js/dependency/device.min.js"></script>
	<script src="/js/flippify-js/dependency/rAF.js"></script>
	<script src="/js/flippify-js/dependency/TweenMax.min.js"></script>
	<script src="/js/flippify-js/flippify-2-mobile.js"></script>
	{{-- <script src="/js/test/flippy2.js"></script>
	<script src="/js/flippify-controller-v2.2.js"></script> --}}
	<script src="/js/jsmpeg.pipe.js"></script>
	<link rel="stylesheet" href="/css/main.css">
	<script type="text/javascript">
		<?php $tutorial_enabled = isset($config->avarta->tutorial->enabled) ? $config->avarta->tutorial->enabled : "true"; ?>

		window.socket =  '{{ env('APP_SOCKET') }}';
		window.poker_domain = '{{ env('P_DOMAIN') }}';
		window.bc_domain = '{{ env('BC_DOMAIN') }}';
		window.sb_domain = '{{ env('SB_DOMAIN') }}';
		window.dt_domain = '{{ env('DT_DOMAIN') }}';
		window.lobby_domain = '{{ env('LOBBY_DOMAIN') }}';

		window.currencyAbbrev = '{!! $currencyAbbrev !!}';
		window.currencyMultiplier = {!! $currencyMultiplier !!};
		window.videostream_url = "rtmp://54.65.138.39:1935/BC01/video";

		window.userMultiplier = {!! $userMultiplier !!};
		window.user_money = {{$money}};
		window.user_name = '{{$user_name}}';
		window.user_chips = {!! $userChips !!};
		window.integrationType = '{!! $integrationType !!}';

		window.lobby_type = '{!! $lobby_type !!}';
		window.lobby_redirect_url = '{!! $lobby_redirect_url !!}';

		window.config = {
			default: '{{ $config->avarta->default->data[$config->avarta->default->select] }}',
			language: '{{ $config->avarta->language->data[$config->avarta->language->select] }}',
			voice: '{{ $config->avarta->sound->voice }}',
			effect: '{{ $config->avarta->sound->effect }}',
			volume: '{{ $config->avarta->sound->volum }}',
			screen: '{{ $config->avarta->screen->data[$config->avarta->screen->select] }}',
			tutorial: '{{ $tutorial_enabled }}',
			video: '{{ $config->avarta->video }}'
		};

		window.rawConfig = {
			default: {!! json_encode($config->avarta->default->data) !!},
			language: {!! json_encode($config->avarta->language->data) !!},
			screen: {!! json_encode($config->avarta->language->data) !!}
		};

		window.t_type = '{{ $betConfig ? is_array($betConfig->type)?$betConfig->type[0]:$betConfig->type : 'normal' }}';
		window.round_id = {!! $round_id !!}
		window.tableNum = {{$table}};
		window.range = '{{$range}}';
		window.userId = {{Auth::user()->id}}
		window.user_type = "{{ app('auth')->user()->user_type }}";
		window.userAuthority = '{{Auth::user()->authority == "a" ? "admin" : "user" }}';
		window.rangeDetails = {!! $rangeDetails !!};
		window.mainMultiplier = {!! $mainMultiplier !!};
		window.room_yn = {!! $room_yn !!};
		{{-- window.isPlayer = '{!! $isPlayer !!}'; --}}
		window.nonInstall = {!! $nonInstall !!};
		window.vendorSound = '{!! $vendorSound !!}';

		window.casino = @if($currencyAbbrev == 'KRW' || $currencyAbbrev == 'THB') 'N' @else 'SS' @endif;
	</script>
	<style type="text/css">
		html,body {
			-webkit-overflow-scrolling: touch;
			background-attachment: fixed;
			background-position: center;
			background: #000;
			display: block;
			margin: 0;
			padding: 0;
			border: 0;
			overflow-y: hidden;
		}
		canvas {
			display: block;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		 	background-size: 100% 100%;
		}

		#vidCanvas {
			display: none;
			width: 1310px;
		    height: 745px;
		    top: 52%;
		    left: 49.9%;
		}

		#volumeCircle {
			background: #2e7d32;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			top: 28.8%;
			left: 845px;
			position: absolute;
			display: none;
		}

		input[type=number]::-webkit-inner-spin-button,
		input[type=number]::-webkit-outer-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
		.container-wrap {
			-webkit-overflow-scrolling: touch;
			display: block;
			position: relative;
			background: #000;
			overflow: hidden;
			height: 100%;
			width: 100%;
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
			width: 90%;
			height: 90%;
			position: absolute;
			left: 8.5%;
		}

		#transferFunds{
			border: none;
			height: 35px;
			font-size: 18px;
			text-align: center;
			width: 220px;
			position: absolute;
			left: 810px;
			top: 278px;
		}

		#howtowrap{
			height: 460px;
			width: 430px;
			background: transparent;
			overflow-y: auto;
			overflow-x: hidden;
		}

		#howtocon{
			height: auto;
			font: bold 13px arial;
			width: 100%;
		}
		.howtocontent { padding-right: 20px; }

		@font-face {
			font-family: LatoBlack;
			src: url("/fonts/lato-Black.ttf") format("truetype"); /* IE9 Compat Modes */;
			font-weight: normal;
			font-style: normal;
		}
		@font-face {
			font-family: lato-black;
			src: url("/fonts/lato-Black.ttf") format("truetype"); /* IE9 Compat Modes */;
			font-weight: normal;
			font-style: normal;
		}
		@font-face {
			font-family: Arvo;
			src: url("/fonts/Arvo-Bold.ttf") format("truetype"); /* IE9 Compat Modes */;
			font-weight: normal;
			font-style: normal;
		}
		@font-face {
			font-family: LatoRegular;
			src: url("/fonts/Lato-Regular.ttf") format("truetype"); /* IE9 Compat Modes */;
			font-weight: normal;
			font-style: normal;
		}
		@font-face {
			font-family: lato-regular;
			src: url("/fonts/Lato-Regular.ttf") format("truetype"); /* IE9 Compat Modes */;
			font-weight: normal;
			font-style: normal;
		}
		@font-face {
			font-family: LatoBold;
			src: url("/fonts/Lato-Bold.ttf") format("truetype"); /* IE9 Compat Modes */;
			font-weight: normal;
			font-style: normal;
		}

		@font-face {
			font-family: BebasNeue;
			src: url("/fonts/BebasNeueRegular.eot"); /* IE9 Compat Modes */
			src: url("/fonts/BebasNeueRegular.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
			url("/fonts/BebasNeue.otf") format("opentype"); /* Open Type Font */
			font-weight: normal;
			font-style: normal;
		}
		.tblbetrecords{
			height: auto;
			width: 870px;
			font: bold 13px arial;
		}
		#vwdetails{
			background: #9c9c9c;
			border-radius: 5px;
			height: 300px;
			margin-left: 150px;
			position: absolute;
			width: 450px;
		}
		.mdlheader{
			background: #ff9a28;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			color: #2b2b2b;
			font: bold 15px arial;
			height: 25px;
			text-align: center;
			padding-top: 5px;
			width: 100%;
		}
		.closebtn{
			cursor: pointer;
			float: right;
			height: 25px;
			padding-right: 5px;
			width: 25px;
		}
		tr { height: 32px; cursor: pointer; }
		th {
			background: #a7a7a7;
			height: 30px;
		}
		th:first-child {
			border-top-left-radius: 5px;
			border-bottom-left-radius: 5px;
		}
		th:last-child {
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px;
		}
		tbody{
			color: #a7a7a7;
			text-align: center;
		}
		td:not(:last-child) { border-right: 1px solid #696969; }


		.pagination{
			text-align: center;
			margin-top: 20px;
		}
		.btnpagination{
			border: 1px solid #cb7f29;
			background: transparent;
			color: #cb7f29;
			cursor: pointer;
			font: bold 15px arial;
			height: 30px;
			outline: none;
			width: 100px;
		}
		.currentpage{
			background: #cb7f29;
			border: none;
			cursor: default;
			color: #2b2b2b;
			height: 30px;
			font: bold 15px arial;
			width: 30px;
		}
		.alignright { text-align: right; padding-right: 10px; }
		#flippy-wrapper {
			background-color: transparent;
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 999;
			transform: translate(-50%,-50%);
			position: absolute;
			/*width: 34%;
			height: 50%;*/
			left: 50%;
			top: 50%;
		}

		#flipclick {
			z-index: 9999;
			/*transform: scale(0.520833);*/
			left: 196%;
			position: relative;
			top: 50%;
			transform-origin: left top;
			display: none;
		}

		#SUPER-CONTAINER{
			width: 1280px;
			height: 720px;
			position:absolute;
			top:50%;
			left: 50%;
			margin-left: -640px;
			margin-top: -360px;
			overflow-x: hidden;
			overflow-y: scroll;
		}
		#SUPER-CONTAINER::-webkit-scrollbar {
		    width: 0 !important;
		}

		.hack {
			width:100px;
			height: 100%;
			transform-origin: left;
			position: absolute;
			z-index: 9999;
		}

		.logout-overlay {
			/*background: rgba(255,255,255,0.01);*/
			background: transparent;
			width: 100px;
			height: 120px;
			position: absolute;
			transform-origin: top left;
			left:0;
			z-index: 999999999
		}

		/*Confirmation Modal*/
		#mdlConfirmation {
			display: none;
		}

		.mdl_overlay {
			position: absolute;
			background: rgba(0, 0, 0, 0.75);
			width: 1345px;
			height: 755px;
	    	right: 0px;
		}

		.mdl_bg {
			position: absolute;
			width: 560px;
			height: 320px;
			background: #e6e6e6;
			border-radius: 10px;
		    top: 15%;
		    right: 29%;
		}
		.mdl_warning_ico {
			background-repeat: no-repeat;
			-webkit-background-size: contain;
			-moz-background-size: contain;
			-ms-background-size: contain;
			-o-background-size: contain;
			background-size: contain;
			background-image: url("/img/v2_1/icons/room_info/warning_icon.png");
			width: 85px;
			height: 80px;
			display: block;
			margin: 6% 0 0 42%;
		}
		.mdl_message {
			text-align: center;
			font: 28px Lato;
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
			font: bold 30px Lato;
		    color: #fcfffd;
		    padding-top: 15px;
		    display: block;
		}

		#flippy-wrap {
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5);
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			z-index: 999;
			display: none
		}
		#flippy-wrap canvas {
			top:46%;
		}
	</style>
</head>
<body>
  {{-- <button id = "open-all" class="dom-resizable open-all-mobile" style="display: none;"> OPEN ALL</button>
	<div id="flip-card-canvas1" class="fpf-overlay card-1-m" width = "300" height="680"></div>
	<div id="flip-card-canvas2" class="fpf-overlay card-2 card-2-m" width = "300" height="680"></div>
	<div id="flip-card-canvas3" class="fpf-overlay fpf-overlay-centered fpf-overlay-centered-m" width = "300" height="680"></div> --}}

	<div id ="flippy-wrap">
		<button id = "open-all" class="dom-resizable open-all-mobile">{{ trans('ingame-web.baccarat_winningdisplay_openall') }}</button>
	</div>

	<div class="container-wrap"> {{--container-wrap--}}
		<div class="container" id="SUPER-CONTAINER" > {{--.container--}}
			<div class="wrapper"> {{--#wrapper--}}
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
			</div> {{-- //#wrapper--}}

			<div id="popup-gofullscreen" class="popup-gofullscreen-wrap"> {{--#popup-gofullscreen--}}
				<div class="popup-fullscreen-inner">
					<div class="popup-body-con">
						<img src="/img/confirmation/nihtan-yellow_logo.png" alt="">
						<p>{!! trans('ingame-web.other_prompts_mobile_fullscreen') !!}</p>
					</div>
					<div class="popup-btn-con">
						<button  id="exitfullscreen" type="button" name="button" class="btn-no"><span>{!! trans('ingame-web.com_sub_rooms_no') !!}</span></button>
						<button id="gofullscreen" type="button" name="button" class="btn-yes"><span>{!! trans('ingame-web.com_sub_rooms_yes') !!}</span></button>
					</div>
				</div>
			</div> {{-- // #popup-gofullscreen--}}

			<div id="popup-enable-sound" class="popup-gofullscreen-wrap"> {{--#popup-enable-sound--}}
				<div class="popup-sound-con">
					<div class="popup-sound-bg">
						<span class="popup-sound-ico"></span>
					</div>
					<div class="popup-sound-text">Tap to enable sound.</div>
				</div>
			</div> {{-- // #popup-enable-sound--}}

			<canvas id="vidCanvas" width="1080px" height="720px"></canvas>
			<canvas id="myCanvas" width="1080px" height="720px"></canvas>
			<div id="volumeCircle"></div>

			{{-- Modal --}}
			<div id="mdlConfirmation"> {{--#mdlConfirmation--}}
				<div class="mdl_overlay"></div>
				<div id="mdl_kick-con" class="mdl_bg">
					<div class="mdl_warning_ico"></div>
					<div class="mdl_message">You are already a banker<br/>in another game.</div>
					<div class="mdl_lobby">
						<span>EXIT TO LOBBY</span>
					</div>
				</div>
			</div> {{-- // #mdlConfirmation--}}

		  {{-- Flippy component --}}
		  {{-- HOW TO CONTENT --}}
			<div class="howto-wrap--accent -mb"></div>
			<div id="top" class="howto-wrap howto_content  howto-wrap-m">
				<div id="gamerules" class="howto-wrap__items -gamerules" hidden> {{--howto-wrap__items--}}
					<ul class="gamerules-menu"> {{-- .gamerules-menu --}}
						<li class="gamerules-menu__items">
							<a href="#game-objective"></a>
							<span>{!! trans('howto.game_objective') !!}</span>
						</li>
						<li class="gamerules-menu__items">
							<a href="#card-values"></a>
							<span>{!! trans('howto.card_values') !!}</span>
						</li>
						<li class="gamerules-menu__items">
							<a href="#types-baccarat"></a>
							<span>{!! trans('howto.types_baccarat') !!}</span>
						</li>
						<li class="gamerules-menu__items">
							<a href="#game-play"></a>
							<span>{!! trans('howto.game_play') !!}</span>
						</li>
						<li class="gamerules-menu__items">
							<a href="#card-hit"></a>
							<span>{!! trans('howto.3_card_hit') !!}</span>
						</li>
						<li class="gamerules-menu__items">
							<a href="#card-positioning"></a>
							<span>{!! trans('howto.card_positioning') !!}</span>
						</li>
						<li class="gamerules-menu__items">
							<a href="#flippy-table"></a>
							<span>{!! trans('howto.flippy_table') !!}</span>
						</li>
						<li class="gamerules-menu__items">
							<a href="#classic-table"></a>
							<span>{!! trans('howto.classic_table') !!}</span>
						</li>
						<li class="gamerules-menu__items">
							<a href="#supersix-table"></a>
							<span>{!! trans('howto.supersix_table') !!}</span>
						</li>
						{{-- <li class="gamerules-menu__items">
							<a href="#dragonbonus-table"></a>
							<span>{!! trans('howto.dragonbonus_table') !!}</span>
						</li>
						<li class="gamerules-menu__items">
							<a href="#bigsmall-table"></a>
							<span>{!! trans('howto.bigsmall_table') !!}</span>
						</li>
						<li class="gamerules-menu__items">
							<a href="#dragonbonus_win_sample"></a>
							<span>{!! trans('howto.dragonbonus_win_sample') !!}</span>
						</li> --}}
					</ul> {{-- // .gamerules-menu --}}

					<div id="game-objective" class="howto--layers"> {{--howto--layers--}}
						{!! trans('howto.mb_game_objective_desc') !!}
					</div> {{--// owto--layers--}}
					<div id="card-values" class="howto--layers "> {{--howto--layers--}}
						<h4>{!! trans('howto.card_values') !!}</h4>
					</div> {{--// owto--layers--}}
					<div class="howto--layers card-values clearfix"> {{-- #howto--layers --}}
						<div class="card-values-con clearfix">
							<div class="card-values__items -thumb">
								<img src="/img/menu/howtoplay/mb-card_value_1.png" alt="card value" class="card-display-1"/>
							</div>

							<div class="card-values__items -desc">
								<p>{!! trans('howto.mb_card_values_1') !!}</p>
							</div>
						</div>
						<div class="card-values-con clearfix">
							<div class="card-values__items -thumb">
								<img src="/img/menu/howtoplay/mb-card_value_2.png" alt="card value" class="card-display-2"/>
							</div>

							<div class="card-values__items -desc">
								<p>{!! trans('howto.mb_card_values_2') !!}</p>
							</div>
						</div>
						<div class="card-values-con clearfix">
							<div class="card-values__items -thumb">
								<img src="/img/menu/howtoplay/mb-card_value_3.png" alt="card value" class="card-display-3"/>
							</div>

							<div class="card-values__items -desc">
								<p>{!! trans('howto.mb_card_values_3') !!}</p>
							</div>
						</div>
					</div> {{-- // #howto--layers --}}
					<div id="types-baccarat" class="howto--layers gameplay-list"> {{--howto--layers--}}
						{!! trans('howto.mb_game_play_list') !!}
					</div> {{--// owto--layers--}}
					<div id="game-play" class="howto--layers gameplay-list"> {{--howto--layers--}}
						{!! trans('howto.mb_game_play_list_2') !!}
					</div> {{--// owto--layers--}}
					<div id="card-hit" class="howto--layers"> {{--howto--layers--}}
						<h4>{!! trans('howto.3_card_hit') !!}</h4>
						{!! trans('howto.mb_3_card_hit_desc') !!}
					</div> {{--// owto--layers--}}
					<div class="howto--layers"> {{--howto--layers--}}
						<h5>{!! trans('howto.mb_player_hand') !!}</h5>
						<table class="tbl--rules">
							<thead>
								<tr>
									<th class="rules--card-value">{!! trans('howto.mb_total_card_value') !!}</th>
									<th class="rules--action">{!! trans('howto.mb_action') !!}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{!! trans('howto.total_card_value_1') !!}</td>
									<td>{!! trans('howto.mb_action_1') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.total_card_value_2') !!}</td>
									<td>{!! trans('howto.mb_action_2') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.total_card_value_3') !!}</td>
									<td>{!! trans('howto.mb_action_3') !!}</td>
								</tr>
							</tbody>
						</table>
					</div> {{--// owto--layers--}}
					<div class="howto--layers"> {{--howto--layers--}}
						<h5>{!! trans('howto.mb_banker_hand') !!}</h5>
						<table class="tbl--rules">
							<thead>
								<tr>
									<th class="rules--card-value">{!! trans('howto.mb_total_card_value') !!}</th>
									<th colspan="2" class="rules--player-card">{!! trans('howto.mb_player_3_card') !!}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{!! trans('howto.banker_hand_card_value_1') !!}</td>
									<td>{!! trans('howto.mb_player_3_card_hit_1') !!}</td>
									<td>{!! trans('howto.mb_player_3_card_stand_1') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.banker_hand_card_value_2') !!}</td>
									<td>{!! trans('howto.mb_player_3_card_hit_2') !!}</td>
									<td>{!! trans('howto.mb_player_3_card_stand_2') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.banker_hand_card_value_3') !!}</td>
									<td>{!! trans('howto.mb_player_3_card_hit_3') !!}</td>
									<td>{!! trans('howto.mb_player_3_card_stand_3') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.banker_hand_card_value_4') !!}</td>
									<td>{!! trans('howto.mb_player_3_card_hit_4') !!}</td>
									<td>{!! trans('howto.mb_player_3_card_stand_4') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.banker_hand_card_value_5') !!}</td>
									<td colspan="2">{!! trans('howto.mb_stand') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.banker_hand_card_value_6') !!}</td>
									<td colspan="2">{!! trans('howto.mb_natural_hit') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.banker_hand_card_value_7') !!}</td>
									<td colspan="2">{!! trans('howto.mb_hit') !!}</td>
								</tr>
							</tbody>
						</table>
					</div> {{--// owto--layers--}}

					<div id="card-positioning" class="howto--layers"> {{--howto--layers--}}
						<h4>{!! trans('howto.card_positioning') !!}</h4>

						<div class="card-positioning-wrap clearfix">
							<div class="card-positioning__items clearfix">
								<div class="card-positioning-inner">
									<div class="card-positioning-con">
										<span>{!! trans('howto.mb_card_positioning_1') !!}</span>
										<div>
											<img src="/img/menu/howtoplay/mb-card_position_1.png" alt="9 hearts" class="card-positioning-1">
										</div>
									</div>
									<div class="card-positioning-con">
										<span>{!! trans('howto.mb_card_positioning_2') !!}</span>
										<div>
											<img src="/img/menu/howtoplay/mb-card_position_2.png" alt="king spade" class="card-positioning-2">
										</div>
									</div>
									<div class="card-positioning-con">
										<span>{!! trans('howto.mb_card_positioning_3') !!}</span>
										<div>
											<img src="/img/menu/howtoplay/mb-card_position_3.png" alt="ace heart" class="card-positioning-2">
										</div>
									</div>
								</div>
								<div class="card-positioning-lbl">
									<span>{!! trans('howto.mb_banker') !!}</span>
								</div>
							</div>
							<div class="card-positioning__items clearfix">
								<div class="card-positioning-inner">
									<div class="card-positioning-con">
										<span>{!! trans('howto.mb_card_positioning_4') !!}</span>
										<div>
											<img src="/img/menu/howtoplay/mb-card_position_4.png" alt="9 hearts" class="card-positioning-2">
										</div>

									</div>
									<div class="card-positioning-con">
										<span>{!! trans('howto.mb_card_positioning_5') !!}</span>
										<div>
											<img src="/img/menu/howtoplay/mb-card_position_5.png" alt="king spade" class="card-positioning-2">
										</div>
									</div>
									<div class="card-positioning-con">
										<span>{!! trans('howto.mb_card_positioning_6') !!}</span>
										<div>
											<img src="/img/menu/howtoplay/mb-card_position_6.png" alt="ace heart" class="card-positioning-1">
										</div>
									</div>
								</div>
								<div class="card-positioning-lbl">
									<span>{!! trans('howto.mb_player') !!}</span>
								</div>
							</div>
						</div>
					</div> {{--//h owto--layers--}}

					<div id="flippy-table" class="howto--layers"> {{--howto--layers--}}
						<h4>{!! trans('howto.flippy_table') !!}</h4>
						<table class="tbl--rules">
							<thead>
								<tr>
									<th class="rules--card-value">{!! trans('howto.mb_flippy_action') !!}</th>
									<th class="rules--action">{!! trans('howto.mb_time_peek') !!}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{!! trans('howto.mb_flippy_action_1') !!}</td>
									<td>{!! trans('howto.mb_time_peek_1') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_flippy_action_2') !!}</td>
									<td>{!! trans('howto.mb_time_peek_2') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_flippy_action_3') !!}</td>
									<td>{!! trans('howto.mb_time_peek_3') !!}</td>
								</tr>
							</tbody>
						</table>
					</div> {{--// howto--layers--}}

					<div id="classic-table" class="howto--layers"> {{--howto--layers--}}
						<h4>{!! trans('howto.classic_table') !!}</h4>
						<table class="tbl--rules">
							<thead>
								<tr>
									<th class="rules--card-value">{!! trans('howto.mb_bet_on') !!}</th>
									<th class="rules--action">{!! trans('howto.mb_payout') !!}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{!! trans('howto.mb_classic_beton_1') !!}</td>
									<td>{!! trans('howto.mb_classic_result_1') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_classic_beton_2') !!}</td>
									<td>{!! trans('howto.mb_classic_result_2') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_classic_beton_3') !!}</td>
									<td>{!! trans('howto.mb_classic_result_3') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_classic_beton_4') !!}</td>
									<td>{!! trans('howto.mb_classic_result_4') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_classic_beton_5') !!}</td>
									<td>{!! trans('howto.mb_classic_result_5') !!}</td>
								</tr>
							</tbody>
						</table>
					</div> {{--// howto--layers--}}

					<div id="supersix-table" class="howto--layers"> {{--howto--layers--}}
						<h4>{!! trans('howto.supersix_table') !!}</h4>
						<table class="tbl--rules">
							<thead>
								<tr>
									<th class="rules--card-value">{!! trans('howto.mb_bet_on') !!}</th>
									<th class="rules--action">{!! trans('howto.mb_payout') !!}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{!! trans('howto.mb_supersix_beton_1') !!}</td>
									<td>{!! trans('howto.mb_supersix_result_1') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_supersix_beton_2') !!}</td>
									<td>{!! trans('howto.mb_supersix_result_2') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_supersix_beton_3') !!}</td>
									<td>{!! trans('howto.mb_supersix_result_3') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_supersix_beton_4') !!}</td>
									<td>{!! trans('howto.mb_supersix_result_4') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_supersix_beton_5') !!}</td>
									<td>{!! trans('howto.mb_supersix_result_5') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_supersix_beton_6') !!}</td>
									<td>{!! trans('howto.mb_supersix_result_6') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_supersix_beton_7') !!}</td>
									<td>{!! trans('howto.mb_supersix_result_7') !!}</td>
								</tr>
							</tbody>
						</table>
					</div> {{--// howto--layers--}}

					{{-- <div id="dragonbonus-table" class="howto--layers">
						<h4>{!! trans('howto.dragonbonus_table') !!}</h4>
						<table class="tbl--rules">
							<thead>
								<tr>
									<th class="rules--card-value">{!! trans('howto.mb_bet_on') !!}</th>
									<th class="rules--action">{!! trans('howto.mb_payout') !!}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{!! trans('howto.mb_dragonbonus_beton_1') !!}</td>
									<td>{!! trans('howto.mb_dragonbonus_result_1') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_dragonbonus_beton_2') !!}</td>
									<td>{!! trans('howto.mb_dragonbonus_result_2') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_dragonbonus_beton_3') !!}</td>
									<td>{!! trans('howto.mb_dragonbonus_result_3') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_dragonbonus_beton_4') !!}</td>
									<td>{!! trans('howto.mb_dragonbonus_result_4') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_dragonbonus_beton_5') !!}</td>
									<td>{!! trans('howto.mb_dragonbonus_result_5') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_dragonbonus_beton_6') !!}</td>
									<td>{!! trans('howto.mb_dragonbonus_result_6') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_dragonbonus_beton_7') !!}</td>
									<td>{!! trans('howto.mb_dragonbonus_result_7') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_dragonbonus_beton_8') !!}</td>
									<td>{!! trans('howto.mb_dragonbonus_result_8') !!}</td>
								</tr>
							</tbody>
						</table>
					</div>  --}}

					{{-- <div id="bigsmall-table" class="howto--layers">
						<h4>{!! trans('howto.bigsmall_table') !!}</h4>
						<table class="tbl--rules">
							<thead>
								<tr>
									<th class="rules--card-value">{!! trans('howto.mb_bet_on') !!}</th>
									<th class="rules--action">{!! trans('howto.mb_payout') !!}</th>
									<th class="rules--action">{!! trans('howto.mb_condition') !!}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{!! trans('howto.mb_bigsmall_beton_1') !!}</td>
									<td>{!! trans('howto.mb_bigsmall_result_1') !!}</td>
									<td>{!! trans('howto.mb_bigsmall_condition_1') !!}</td>
								</tr>
								<tr>
									<td>{!! trans('howto.mb_bigsmall_beton_2') !!}</td>
									<td>{!! trans('howto.mb_bigsmall_result_2') !!}</td>
									<td>{!! trans('howto.mb_bigsmall_condition_2') !!}</td>
								</tr>
							</tbody>
						</table>
					</div>  --}}
					{{-- <div id="dragonbonus_win_sample" class="howto--layers gameplay--list">
						{!! trans('howto.mb_dragonbonus_win_sample_list') !!}
					</div>  --}}
				</div> {{-- // howto-wrap__items--}}

				<div id="gameplay" class="howto-wrap__items -gameplay" hidden> {{--howto-wrap__items--}}
					<div class="howto--layers -two clearfix"> {{-- #howto--layers --}}
						<div class="howto--layers__items -thumb">
							{!! trans('howto.mb_dealer_channel_img') !!}
						</div>

						<div class="howto--layers__items -desc">
							<h4>{!! trans('howto.mb_dealer_channel') !!}</h4>
							{!! trans('howto.mb_dealer_channel_desc') !!}
						</div>
					</div> {{-- // #howto--layers --}}
					<div class="howto--layers -two clearfix"> {{-- #howto--layers --}}
						<div class="howto--layers__items -thumb">
							{!! trans('howto.mb_player_info_img') !!}
						</div>

						<div class="howto--layers__items -desc">
							<h4>{!! trans('howto.mb_player_info') !!}</h4>
							<p>{!! trans('howto.mb_player_info_desc') !!}</p>
						</div>
					</div> {{-- // #howto--layers --}}
					<div class="howto--layers clearfix"> {{-- #howto--layers --}}
						<h4>{!! trans('howto.mb_bet_info') !!}</h4>
						{!! trans('howto.mb_bet_info_img') !!}
						<p>{!! trans('howto.mb_bet_info_desc') !!}</p>
						<!-- <div class="howto--layers__items -thumb">
						{!! trans('howto.mb_bet_info_img') !!}
							</div>
							<div class="howto--layers__items -desc">

						</div> -->
					</div> {{-- // #howto--layers --}}

					<div class="howto--layers game-stats clearfix">
						<h4>{!! trans('howto.mb_game_stats') !!}</h4>
						{!! trans('howto.mb_game_stats_desc') !!}
						<!-- <img src="/img/menu/howtoplay/dark/mb-stats2.png", alt="game stats" class="roadmap" /> -->
						<span class="game-stats-tx">{!! trans('howto.mb_no_of_deals') !!}</span>
					</div>
					<div class="howto--layers card-display">
						<h4>{!! trans('howto.mb_card_display') !!}</h4>
						<h5>{!! trans('howto.mb_regular_baccarat_display') !!}</h5>
						<div class="card-display--lbl"><span>{!! trans('howto.mb_card_display_lbl') !!}</span></div>
						<img src="/img/menu/howtoplay/mb-card_display1.png" alt="baccarat card display" class="regular-card"/>
						<div class="card-display--type clearfix -regular">
							<span>{!! trans('howto.ingame_player') !!}</span>
							<span>{!! trans('howto.ingame_banker') !!}</span>
						</div>
					</div> {{--// howto--layers--}}
					<div class="howto--layers card-display">
						<h5>{!! trans('howto.mb_flippy_baccarat_display') !!}</h5>
						<img src="/img/menu/howtoplay/mb-card_display2.png" alt="flippy baccarat card display" class="flippy-card">
						<div class="card-display--type clearfix -flippy">
							<span>{!! trans('howto.ingame_player') !!}</span>
							<span>{!! trans('howto.ingame_banker') !!}</span>
						</div>
					</div> {{--// howto--layers--}}
					<div class="howto--layers ">
						<h4>{!! trans('howto.mb_flippy_baccarat') !!}</h4>
						{!! trans('howto.mb_flippy_baccarat_desc') !!}
					</div> {{--// howto--layers--}}
					<div class="howto--layers betting-wrap clearfix"> {{--howto--layers--}}
						<h4>{!! trans('howto.mb_betting_buttons') !!}</h4>
						{!! trans('howto.mb_betting_buttons_desc') !!}
					</div> {{-- // howto--layers--}}
					<div class="howto--layers chipsrack-wrap clearfix"> {{--howto--layers--}}
						<h4>{!! trans('howto.mb_chips_rack') !!}</h4>
						<p>{!! trans('howto.mb_chips_rack_desc') !!}</p>
						{!! trans('howto.mb_chips_rack_img') !!}
					</div> {{-- // howto--layers--}}
					<div class="howto--layers menu-toggle"> {{--howto--layers--}}
						<h4>{!! trans('howto.mb_menu_toggle') !!}</h4>
						<p>{!! trans('howto.mb_menu_toggle_desc') !!}</p>
					</div> {{-- // howto--layers--}}
					<div class="howto--layers modifychips-wrap"> {{--howto--layers--}}
						<h4>{!! trans('howto.mb_modify_chips') !!}</h4>
						{!! trans('howto.mb_modify_chips_desc') !!}
						{!! trans('howto.mb_modify_chips_img') !!}
					</div> {{-- // howto--layers--}}
				</div> {{-- // howto-wrap__items--}}
				<a href="#gamerules" id="arr"><div class="arrow-up -mb"></div></a>
			</div>

			{{--HOW TO CONTENT ENDS--}}

			@if($tutorial_enabled == "true")
				<div class="tutorials tutorials-wrap-m" hidden> {{--tutorials--}}
					<div class="tutorials--img clearfix"></div>
					<div class="tutorials--intro clearfix"> {{--intro--}}
						<h4>{!! trans('tutorials.mb_intro') !!}</h4>
						{!! trans('tutorials.mb_intro_img') !!}
						<p class="intro-text">{!! trans('tutorials.mb_intro_desc') !!}</p>
						<div class="btn btn-nevershow">{!! trans('tutorials.mb_intro_firstButton') !!}</div>
						<div class="btn btn-close">{!! trans('tutorials.mb_intro_secondButton') !!}</div>
						<div class="btn btn-continue">{!! trans('tutorials.mb_intro_thirdButton') !!}</div>
					</div> {{-- // intro--}}

					<div id="dealerInfoChannel" class="tutorials--con">  {{--dealerInfoChannel--}}
						{!! trans('tutorials.mb_delearInfoChannel_img') !!}
						<h2>{!! trans('tutorials.mb_delearInfoChannel_title') !!}</h2>
						<p>{!! trans('tutorials.mb_delearInfoChannel_desc') !!}</p>
						<div class="btn-center clearfix">
							<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
							<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
						</div>
					</div> {{-- // dealerInfoChannel--}}

					<div id="betInfo" class="tutorials--con"> {{--betInfo--}}
						{!! trans('tutorials.mb_betInfo_img') !!}
						<h2>{!! trans('tutorials.mb_betInfo_title') !!}</h2>
						<p>{!! trans('tutorials.mb_betInfo_desc') !!}</p>
						<div class="btn-center clearfix">
							<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
							<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
						</div>
					</div> {{-- // betInfo--}}

					<div id="gameStatistics" class="tutorials--con"> {{--gameStatistics--}}
						{!! trans('tutorials.mb_gameStatistics_img') !!}
						<h2>{!! trans('tutorials.mb_gameStatistics_title') !!}</h2>
						<p>{!! trans('tutorials.mb_gameStatistics_desc') !!}</p>
						<div class="btn-center clearfix">
							<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
							<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
						</div>
					</div> {{-- // gameStatistics--}}

					<div id="playerInfo" class="tutorials--con"> {{--playerInfo--}}
						{!! trans('tutorials.mb_playerInfo_img') !!}
						<h2>{!! trans('tutorials.mb_playerInfo_title') !!}</h2>
						<p>{!! trans('tutorials.mb_playerInfo_desc') !!}</p>
						<div class="btn-center clearfix">
							<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
							<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
						</div>
					</div> {{-- // playerInfo--}}

					<div id="gameMenu" class="tutorials--con"> {{--playerInfo--}}
						{!! trans('tutorials.mb_gameMenu_img') !!}
						<h2>{!! trans('tutorials.mb_gameMenu_title') !!}</h2>
						<p>{!! trans('tutorials.mb_gameMenu_desc') !!}</p>
						<div class="btn-center clearfix">
							<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
							<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
						</div>
					</div> {{-- // playerInfo--}}

					<div id="chipRack" class="tutorials--con"> {{--chipRack--}}
						{!! trans('tutorials.mb_chipRack_img') !!}
						<h2>{!! trans('tutorials.mb_chipRack_title') !!}</h2>
						<p>{!! trans('tutorials.mb_chipRack_desc') !!}</p>
						<div class="btn-center clearfix">
							<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
							<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
						</div>
					</div> {{-- // chipRack--}}

					<div id="betButton" class="tutorials--con"> {{--betButton--}}
						{!! trans('tutorials.mb_betButton_img') !!}
						<h2>{!! trans('tutorials.mb_betButton_title') !!}</h2>
						<p>{!! trans('tutorials.mb_betButton_desc') !!}</p>
						<div class="btn-center clearfix">
							<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
							<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
						</div>
					</div> {{--betButton--}}

					<div id="timer" class="tutorials--con"> {{--timer--}}
						{!! trans('tutorials.mb_timer_img') !!}
						<h2>{!! trans('tutorials.mb_timer_title') !!}</h2>
						<p>{!! trans('tutorials.mb_timer_desc') !!}</p>
						<div class="btn-center clearfix">
							<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
							<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
						</div>
					</div> {{--timer--}}

					<div id="bettingLayout" class="tutorials--con"> {{--bettingLayout--}}
						{!! trans('tutorials.mb_bettingLayout_img') !!}
						<h2>{!! trans('tutorials.mb_bettingLayout_title') !!}</h2>
						<p>{!! trans('tutorials.mb_bettingLayout_desc') !!}</p>
						<div class="btn-center clearfix">
							<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
							<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
						</div>
					</div> {{-- // bettingLayout--}}

					<div id="bettingLayoutMulti" class="tutorials--con"> {{--bettingLayoutMulti--}}
						{!! trans('tutorials.mb_bettingLayoutMulti_img') !!}
						<h2>{!! trans('tutorials.mb_bettingLayoutMulti_title') !!}</h2>
						<p>{!! trans('tutorials.mb_bettingLayoutMulti_desc') !!}</p>
						<div class="btn-center clearfix">
							<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
							<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
						</div>
					</div> {{-- // bettingLayoutMulti--}}

					<div id="flippyCard" class="tutorials--con"> {{--flippyCard--}}
						{!! trans('tutorials.mb_flippyCard_img') !!}
						<h2>{!! trans('tutorials.mb_flippyCard_title') !!}</h2>
						<p>{!! trans('tutorials.mb_flippyCard_desc') !!}</p>
						<div class="btn-center clearfix">
							<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
							<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
						</div>
					</div> {{-- // flippyCard--}}

					<div id="flippyCardImg" class="tutorials--con"> {{--flippyCardImg--}}
						{!! trans('tutorials.mb_flippyCardImg_img') !!}
						<h2>{!! trans('tutorials.mb_flippyCardImg_title') !!}</h2>
						<p>{!! trans('tutorials.mb_flippyCardImg_img2') !!}</p>
						<div class="btn-center clearfix">
							<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
							<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
						</div>
					</div> {{-- // flippyCardImg--}}

					<div id="cardDisplay" class="tutorials--con"> {{--cardDisplay--}}
						{!! trans('tutorials.mb_cardDisplay_img') !!}
						<h2>{!! trans('tutorials.mb_cardDisplay_title') !!}</h2>
						<p>{!! trans('tutorials.mb_cardDisplay_desc') !!}</p>
						<div class="btn-center clearfix">
							<div class="btn btn-startGame">{!! trans('tutorials.startGame') !!}</div>
						</div>
					</div> {{-- // cardDisplay--}}
				</div> {{-- // tutorials--}}
				<div class="progress-bar progress-bar-m" hidden> {{--progress-bar--}}
					<ul>
						<li id="dealerInfoChannel" class="progress"></li>
						<li id="betInfo" class="progress"></li>
						<li id="gameStatistics" class="progress"></li>
						<li id="playerInfo" class="progress"></li>
						<li id="gameMenu" class="progress"></li>
						<li id="chipRack" class="progress"></li>
						<li id="betButton" class="progress"></li>
						<li id="timer" class="progress"></li>
						<li id="bettingLayout" class="progress"></li>
						<li id="bettingLayoutMulti" class="progress"></li>
						<li id="flippyCard" class="progress"></li>
						<li id="flippyCardImg" class="progress"></li>
						<li id="cardDisplay" class="progress"></li>
					</ul>
				</div> {{-- // progress-bar--}}
			@endif

			<div id="promptnobet"> {{--promptnobet--}}
				<div class="prompt_overlay"></div>
				<div class="prompt_wrap m_wrap">
					<div class="prompt">
						<h4>{!! trans('ingame.promptnobetcaps') !!}</h4>
						<div class="redirect_timer">15</div>
						<div class="clearfix">
							<div class="divider">
								<div class="btn btn-back">{!! trans('ingame.promptbackcaps') !!}</div>
							</div>
							<div class="divider">
								<div class="btn btn-cont">{!! trans('ingame.promptcontcaps') !!}</div>
							</div>
						</div>
					</div>
				</div>
			</div> {{-- // promptnobet--}}
		</div> {{-- //.container--}}
	</div>

</body>

<script type="text/javascript">
	window.sample_saved_bets = [];

	window.language = {
    locale: '{{ App::getLocale()  }}',
		menu: {
			cashin			        : '{{ trans('ingame.cashin') }}',
			cashout			        : '{{ trans('ingame.cashout') }}',
			betscaps 		        : '{{ trans('ingame.betscaps') }}',
 			winningresultcaps   : '{{ trans('ingame.winningresultcaps') }}',

			exit				        : '{{ trans('ingame.exit') }}',
			fullscreen			    : '{{ trans('ingame.fullscreen') }}',
			howtoplay			      : '{{ trans('ingame.howtoplay') }}',
			refreshvideo		    : '{{ trans('ingame.refreshvideo') }}',
			playerinfo			    : '{{ trans('ingame.playerinfo') }}',
			records				      : '{{ trans('ingame.records') }}',
			transfer			      : '{{ trans('ingame.transfer') }}',
			modifychips			    : '{{ trans('ingame.modifychips') }}',
			multiplayer			    : '{{ trans('ingame.multiplayer') }}',
			settings			      : '{{ trans('ingame.settings') }}',

			playerinfocaps 		  : '{{ trans('ingame.playerinfocaps') }}',
			playername 			    : '{{ trans('ingame.playername') }}',
			playerbalance 		  : '{{ trans('ingame.playerbalance') }}',
			roundid 			      : '{{ trans('ingame.roundid') }}',
			dealernamecaps 		  : '{{ trans('ingame.dealernamecaps') }}',
			channelcaps			    : '{{ trans('ingame.channelcaps') }}',
			cardvaluescaps		  : '{{ trans('ingame.cardvaluescaps') }}',
			total 				      : '{{ trans('ingame.total') }}',

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
			payoutcaps          : '{{ trans('ingame.payoutcaps') }}',

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
			wincaps             : '{{ trans('ingame.wincaps') }}',
			losecaps            : '{{ trans('ingame.losecaps') }}',
			showtutorial 		    : '{{ trans('ingame.showtutorial') }}',
			burncardcaps 		    : '{{ trans('ingame.burncardcaps') }}'
		},
		gamename: {
			dragontiger_game    : '{{ trans('ingame.dragontiger_game') }}',
			sicbo_game          : '{{ trans('ingame.sicbo_game') }}',
			poker_game          : '{{ trans('ingame.poker_game') }}',
			baccarat_game       : '{{ trans('ingame.baccarat_game') }}',
			roulette_game       : '{{ trans('ingame.roulette_game') }}',
			redwhite_game       : '{{ trans('ingame.redwhite_game') }}',
			spinwin_game        : '{{ trans('ingame.spinwin_game') }}',
			supersix            : '{{ trans('ingame.supersix') }}',
			dragonbonus         : '{{ trans('ingame.dragonbonus') }}'
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
			promptnobets 		    : '{{ trans('ingame.promptnobets') }}',
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
			promptfirstround    : '{{ trans('ingame.promptfirstround') }}',
			promptbetfail       : '{{ trans('ingame.promptbetfail') }}',
			promptbetfail2 		  : '{{ trans('ingame.promptbetfail2') }}',
			promptaddfail       : '{{ trans('ingame.promptaddfail') }}',

			promptplacebets 	  : '{{ trans('ingame.promptplacebets') }}',
			promptactivated 	  : '{{ trans('ingame.promptactivated') }}',
			promptcancelauto 	  : '{{ trans('ingame.promptcancelauto') }}',
			promptcancelbets 	  : '{{ trans('ingame.promptcancelbets') }}',
		},
		game_specific: {
			playerwins 			: '{{ trans('ingame.playerwins') }}',
			bankerwins 			: '{{ trans('ingame.bankerwins') }}',
			tie 		        : "{!! trans('ingame.tie') !!}"
		},
		multibet_poker: {
			dealer 				    : '{{ trans('ingame.dealer') }}',
			player 				    : '{{ trans('ingame.player') }}',
			gameno 				    : '{{ trans('ingame.gameno') }}',
			communitycard 		: '{{ trans('ingame.communitycard') }}',
			result 			      : '{{ trans('ingame.result') }}',
			playerwins 			  : '{{ trans('ingame.playerwins_poker') }}',
			dealerwins 			  : '{{ trans('ingame.dealerwins') }}',
			tie 				      : '{{ trans('ingame.tie') }}'
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
    com_sub_ingameprompts_unabletochange:'{{trans('ingame-web.com_sub_ingameprompts_unabletochange')}}',
		com_sub_ingameprompts_betfailed:'{{trans('ingame-web.com_sub_ingameprompts_betfailed')}}',
		com_sub_ingameprompts_shoechanged:'{{trans('ingame-web.com_sub_ingameprompts_shoechanged')}}',

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

	window.bet_limit = {
		min: 1000,
		max: 200000
	}

	window.tutorial_enabled = window.config.tutorial == "true";
	window.theme = window.tutorial_enabled ? (window.config.screen == "black" ? "white" : "black") : window.config.screen;
	window.slave = '{{ $slave }}';

	window.dealer = {
		"screen_name" : "april",
		"img" : "april.png",
		"image" : "april.png"
	}

	window.multiplayer = '{{$multiplayer}}';
</script>
<script type="text/javascript" src="/osmf/swfobject.min.js"></script>
<script type="text/javascript" src="/dist/baccarat-mobile.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.3/vue.js"></script>
<script type="text/javascript" src="/js/dom-events-mobile.js"></script>

<script type="text/javascript">

    function detectmob() {
        if( navigator.userAgent.match(/Android/i))
        {
        return 'Android';
        }else if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i))
        {
        return 'iPhone';
        }else {
        return 'none';
        }
    }

    $(".hack").css('left', (($("#SUPER-CONTAINER").offset().left / $("#SUPER-CONTAINER").parent().width() * 100) ) + '%')

    window.addEventListener("resize",function() {
        $(".logout-overlay").css('top', (($("#SUPER-CONTAINER").offset().top / $("#SUPER-CONTAINER").parent().height() * 100) ) + '%')
    });

    $(".logout-overlay").css('top', (($("#SUPER-CONTAINER").offset().top / $("#SUPER-CONTAINER").parent().height() * 100) ) + '%')

    $(".logout-overlay").on("click", function() {
        // window.location
        var mobileString = detectmob();
        try{
            if(mobileString == 'iPhone') window.webkit.messageHandlers.observe.postMessage('nihstopbutton,');
        } catch(e) {
            // not using ios device
        }
        window.location.href = window.lobby_domain+'m?game=true';
    });
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
</script>
<script type="text/javascript">
    $(document).ready(function() {
			$('a[href*="#"]').click(function() {
				if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

					if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
						var scale = $('#top')[0].getBoundingClientRect().height / $('#top').width();
						var topPosition = $(this).attr('href') == '#gamerules' ? topPosition = 0 : ((target.prev().position().left / scale) + $('.howto-wrap').scrollTop() - 320);

					} else {
						var scale = $('#top')[0].getBoundingClientRect().width / $('#top').width();
						var topPosition = $(this).attr('href') == '#gamerules' ? topPosition = 0 : (target.position().top / scale) + $('.howto-wrap').scrollTop();
					}

					console.log("topPosition: ", topPosition)

					if (target.length) {
						$('.howto-wrap').animate({
							scrollTop: Math.abs(topPosition)
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

		if(window.theme == 'white') {
			$(".howto-wrap").addClass("white-theme");
			$(".howto-wrap").removeClass("black-theme");

			let img = $(".changeImg").each(function() {
				let theme, src, path, newSrc;

				src = $(this).attr("src");
				path  = src.split('/');
				theme = path.indexOf('dark');
				path.splice(theme, 1, "light");
				newSrc = path.join('/');
				$(this).attr("src",newSrc);
			});
		}
    });

	$('.howto-wrap').scroll(function() {
			var scroll = $(this).scrollTop();

        if (scroll <= 10) {
    			$('.arrow-up').fadeOut();
    			$('.howto-wrap--accent').fadeOut();
    		} else {
    			$('.arrow-up').fadeIn();
    			$('.howto-wrap--accent').fadeIn();
    		}
	});


    // window.addEventListener("resize", function (argument) {
    //     var newWidth  = window.innerWidth;
    //     var newHeight  = window.innerHeight;

    //     var baseRatio = 400 / 720,
    //         newRatio = newWidth / newHeight;

    //     if(newRatio > baseRatio) {
    //         newWidth = newHeight * baseRatio;
    //     } else {
    //         newHeight = newWidth / baseRatio;
    //     }

    //     $('#flipclick').css({
    //          'transform': 'scale('+((newWidth / 400) )+')'
    //     })
    // });

   //      BLU.FluidStage.prototype.resize = function(newWidth, newHeight) {

   //      var baseRatio = this.baseWidth / this.baseHeight,
   //          newRatio = newWidth / newHeight;

   //      if(newRatio > baseRatio) {
   //          newWidth = newHeight * baseRatio;
   //      } else {
   //          newHeight = newWidth / baseRatio;
   //      }

   //      this.canvas.width = 1280;
   //      this.canvas.height = 720;
   //      /*$('#video-player').width(newWidth);
   //      $('#video-player').height(newHeight);*/

   //      //this.scaleX = this.scaleY = newWidth / this.baseWidth;
   //      $('#SUPER-CONTAINER').css({
   //          'transform': 'scale('+((newWidth / 1280) )+')'
   //      })
   //      // $('#flipclick').css({
   //       //     'transform': 'scale('+((newWidth / 1280) )+')'
   //      // })

   //      // let offsetY = ((newHeight/720) *.3) * 100;

   // //      $("#flipclick").css('top', (($("#SUPER-CONTAINER").offset().top / $("#SUPER-CONTAINER").parent().height() * 100) + offsetY) + '%')

   //      console.log(newHeight, newWidth, "on blu resize")
   //      // alert("scale: "+(newWidth / 1280)+ "--width: "+newWidth +"--height: "+newHeight);
   //  };

</script>
</html>
