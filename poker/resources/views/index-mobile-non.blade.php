<!DOCTYPE html>
<html>
<head>
	<title>POKER-M</title>
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
	<link href="https://fonts.googleapis.com/css?family=Arvo:400,700,700i" rel="stylesheet">
	{{-- <link href="https://fonts.googleapis.com/css?family=lato-regular" rel="stylesheet"> --}}
	<script src="/js/createjs/createjs-2015.11.26.min.js"></script>
	<script src="/js/createjs/easeljs-0.8.2.min.js"></script>
	<script src="/js/createjs/tweenjs-0.6.2.min.js"></script>
	<script src="/js/createjs/soundjs-0.6.2.min.js"></script>
	<script src="/js/createjs/preloadjs-0.6.2.min.js"></script>
	<script src="/js/jsmpeg.pipe.js"></script>
	<link rel="stylesheet" href="/css/main.css">
	<link rel="stylesheet" type="text/css" href="/css/howto-mobile.css">
	<link rel="stylesheet" href="/css/app.css">
	<link rel="stylesheet" type="text/css" href="/css/tutorials-mobile.css">
	<link rel="stylesheet" type="text/css" href="/css/prompts-mobile.css">
	<script type="text/javascript">
		window.socket =  '{{ env('APP_SOCKET') }}';
		window.poker_domain = '{{ env('P_DOMAIN') }}';
		window.bc_domain = '{{ env('BC_DOMAIN') }}';
		window.sb_domain = '{{ env('SB_DOMAIN') }}';
		window.dt_domain = '{{ env('DT_DOMAIN') }}';
		window.lobby_domain = '{{ env('LOBBY_DOMAIN') }}';

		window.currencyAbbrev = '{!! $currencyAbbrev !!}';
		window.currencyMultiplier = {!! $currencyMultiplier !!};
		window.userMultiplier = {!! $userMultiplier !!};
		window.user_chips = {!! $userChips !!};
		window.integrationType = '{!! $integrationType !!}';
		window.lobby_type = '{!! $lobby_type !!}';
		window.lobby_redirect_url = '{!! $lobby_redirect_url !!}';
		{{-- window.isPlayer = '{!! $isPlayer !!}'; --}}

		window.userId = {{Auth::user()->id}}
		window.user_type = "{{ app('auth')->user()->user_type }}";
		window.userAuthority = '{{Auth::user()->authority == "a" ? "admin" : "user" }}';
		window.round_id = {!! $round_id !!}
		window.bet_type = '{{ $bet_type }}' || "r";
		window.tableNum = {{$table}};
		window.range = '{{$range}}';
		window.rangeDetails = {!! $rangeDetails !!};
		<?php $tutorial_enabled = isset($config->avarta->tutorial->enabled) ? $config->avarta->tutorial->enabled : "true"; ?>
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

		window.casino = @if($currencyAbbrev == 'KRW' || $currencyAbbrev == 'THB') 'N' @else 'SS' @endif;
		window.videostream_url = "http://d556i00mq0ud2.cloudfront.net/Poker01/video/playlist.m3u8";
		window.mainMultiplier = {!! $mainMultiplier !!};
		window.nonInstall = {!! $nonInstall !!};
		window.vendorSound = '{!! $vendorSound !!}';
  </script>

	<style type="text/css">
		* {
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
		}
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
			background-size: 99%;
			z-index: -1;
			background-size: 100%;
		}

		#vidCanvas {
			display: none;
			width: 1310px;
	    height: 745px;
     	top: 47.5%;
    	left: 50.17%;
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
		tbody tr:hover{ background: #3d3d3d; }


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

		#sicbo-table {
			width: 95%;
			height: 50%;
			overflow: hidden;
			position: absolute;
			top: 33%;
			z-index: 4
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
		}

		#SUPER-CONTAINER {
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
	</style>
	<!-- font face here -->
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
	<link rel="stylesheet" type="text/css" href="/css/sicbo.css">
</head>
<body>
	<span style = "font-family: arvo-regular"></span>
	<span style = "font-family: arvo-black"></span>
	<span style = "font-family: lato-regular"></span>
	<span style = "font-family: lato-bold"></span>
	<span style = "font-family: lato-black"></span>
	<span style = "font-family: bebas-regular"></span>

	<div class="container-wrap">
		<div class="container" id="SUPER-CONTAINER">
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

			<div id="popup-gofullscreen" class="popup-gofullscreen-wrap"> {{--#popup-gofullscreen--}}
				<div class="popup-fullscreen-inner">
					<div class="popup-body-con">
						<img src="/img/confirmation/nihtan-yellow_logo.png" alt="">
						<p>{!! trans('ingame-web.other_prompts_mobile_fullscreen') !!}</p>
					</div>
					<div class="popup-btn-con">
						<button  id="exitfullscreen" type="button" name="button" class="btn-no"><span>NO</span></button>
						<button id="gofullscreen" type="button" name="button" class="btn-yes"><span>YES</span></button>
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

			<div id="top" class="howto-wrap dom-resizable howto-wrap-m "> {{--howto-wrap--}}
				<div class="howto-wrap--accent howto-wrap--accent-mb"></div>
				<div id="gamerules" class="howto-wrap__items -gamerules" hidden> {{--howto-wrap__items--}}
						<ul class="gamerules-menu"> {{-- .gamerules-menu --}}
								<li class="gamerules-menu__items">
										<a href="#game-objective"></a>
										<span>{!! trans('howto.game_objective') !!}</span>
								</li>
								<li class="gamerules-menu__items">
										<a href="#gameplay"></a>
										<span>{!! trans('howto.gameplay') !!}</span>
								</li>
								@if (trans('howto.card_rank') !== '')
									<li class="gamerules-menu__items">
											<a href="#card_rank"></a>
											<span>{!! trans('howto.card_rank') !!}</span>
									</li>
								@endif
								<li class="gamerules-menu__items">
										<a href="#poker-hand-rankings"></a>
										<span>{!! trans('howto.poker_hand_rankings') !!}</span>
								</li>
								<li class="gamerules-menu__items">
										<a href="#betting-system"></a>
										<span>{!! trans('howto.betting_system') !!}</span>
								</li>
								<li class="gamerules-menu__items">
										<a href="#ante_bet_payouts"></a>
										<span>{!! trans('howto.ante_bet_payouts') !!}</span>
								</li>
								<li class="gamerules-menu__items">
										<a href="#bonus_bet_payouts"></a>
										<span>{!! trans('howto.bonus_bet_payouts') !!}</span>
								</li>
								<li class="gamerules-menu__items">
										<a href="#bonus_plus_payouts"></a>
										<span>{!! trans('howto.bonus_plus_payouts') !!}</span>
								</li>
								<!-- <li class="gamerules-menu__items">
										<a href="#bad_beat"></a>
										<span>{!! trans('howto.bad_beat_rule') !!}</span>
								</li> -->
								<li class="gamerules-menu__items">
										<a href="#pocket_bonus_payouts"></a>
										<span>{!! trans('howto.pocket_bonus_payouts') !!}</span>
								</li>
								<li class="gamerules-menu__items">
										<a href="#same-hand-ranking"></a>
										<span>{!! trans('howto.same_hand_ranking') !!}</span>
								</li>
						</ul> {{-- // .gamerules-menu --}}

						<div id="game-objective" class="howto--layers"> {{--howto--layers--}}
								<h4>{!! trans('howto.game_objective') !!}</h4>
								<p>{!! trans('howto.game_objective_desc_mb') !!}</p>
						</div> {{-- // howto--layers--}}

						<div id="gameplay" class="howto--layers"> {{--howto--layers--}}
								<h4>{!! trans('howto.gameplay') !!}</h4>
								<ol class="gameplay--list">
									{!! trans('howto.gameplay_desc_mb') !!}
								</ol>
						</div> {{-- // howto--layers--}}

						@if (trans('howto.card_rank') !== '')
							<div id="card_rank" class="howto--layers"> {{--howto--layers--}}
									<h4>{!! trans('howto.card_rank') !!}</h4>
									<p>{!! trans('howto.card_rank_desc_mb') !!}</p>
							</div> {{-- // howto--layers--}}
						@endif

						<div id="poker-hand-rankings" class="howto--layers"> {{--howto--layers--}}
								<h4>{!! trans('howto.poker_hand_rankings') !!}</h4>
								<div class="pokerhand-wrap"> {{--pokerhand-wrap--}}
										<div class="pokerhand-con clearfix">
											<h5>1. {!! trans('howto.poker_hand_ranking_list_1') !!}</h5>
											<img src="/img/howtoplay/mb/poker_handranking_1.png" alt="">
											<p>{!! trans('howto.poker_hand_ranking_list_1_desc_mb') !!}</p>

										</div>
										<div class="pokerhand-con clearfix">
											<h5>2. {!! trans('howto.poker_hand_ranking_list_2') !!}</h5>
											<p>{!! trans('howto.poker_hand_ranking_list_2_desc_mb') !!}</p>

											<img src="/img/howtoplay/mb/poker_handranking_2.png" alt="">
											<p class="mb30">{!! trans('howto.poker_hand_ranking_list_3') !!} {!! trans('howto.poker_hand_ranking_list_3_desc_mb') !!}</p>

											<img src="/img/howtoplay/mb/poker_handranking_2-1.png" alt="">
											<p>{!! trans('howto.poker_hand_ranking_list_4') !!} {!! trans('howto.poker_hand_ranking_list_4_desc_mb') !!}</p>
										</div>

										<div class="pokerhand-con clearfix">
											<h5>3. {!! trans('howto.poker_hand_ranking_list_5') !!}</h5>

											<img src="/img/howtoplay/mb/poker_handranking_3.png" alt="">
											<p>{!! trans('howto.poker_hand_ranking_list_5_desc_mb') !!}</p>
										</div>

										<div class="pokerhand-con clearfix">
											<h5>4. {!! trans('howto.poker_hand_ranking_list_6') !!}</h5>

											<img src="/img/howtoplay/mb/poker_handranking_4.png" alt="">
											<p>{!! trans('howto.poker_hand_ranking_list_6_desc_mb') !!}</p>
										</div>

										<div class="pokerhand-con clearfix">
											<h5>5. {!! trans('howto.poker_hand_ranking_list_7') !!}</h5>

											<img src="/img/howtoplay/mb/poker_handranking_5.png" alt="">
											<p>{!! trans('howto.poker_hand_ranking_list_5_desc_mb') !!}</p>
										</div>

										<div class="pokerhand-con clearfix">
											<h5>6. {!! trans('howto.poker_hand_ranking_list_8') !!}</h5>
											<p>{!! trans('howto.poker_hand_ranking_list_8_desc_mb') !!}</p>


											<img src="/img/howtoplay/mb/poker_handranking_6.png" alt="">
											<p class="mb30">{!! trans('howto.poker_hand_ranking_list_9') !!} {!! trans('howto.poker_hand_ranking_list_9_desc_mb') !!}</p>

											<img src="/img/howtoplay/mb/poker_handranking_6-1.png" alt="">
												<p>{!! trans('howto.poker_hand_ranking_list_10') !!} {!! trans('howto.poker_hand_ranking_list_10_desc_mb') !!}</p>
										</div>

										<div class="pokerhand-con clearfix">
											<h5>7. {!! trans('howto.poker_hand_ranking_list_11') !!}</h5>
											<img src="/img/howtoplay/mb/poker_handranking_7.png" alt="">
											<p>{!! trans('howto.poker_hand_ranking_list_11_desc_mb') !!}</p>
										</div>

										<div class="pokerhand-con clearfix">
											<h5>8. {!! trans('howto.poker_hand_ranking_list_12') !!}</h5>
											<img src="/img/howtoplay/mb/poker_handranking_8.png" alt="">
											<p>{!! trans('howto.poker_hand_ranking_list_12_desc_mb') !!}</p>
										</div>

										<div class="pokerhand-con clearfix">
											<h5>9. {!! trans('howto.poker_hand_ranking_list_13') !!}</h5>
											<img src="/img/howtoplay/mb/poker_handranking_9.png" alt="">
											<p>{!! trans('howto.poker_hand_ranking_list_13_desc_mb') !!}</p>
										</div>
										<div class="pokerhand-con clearfix">
											<h5>10. {!! trans('howto.poker_hand_ranking_list_14') !!}</h5>
											<img src="/img/howtoplay/mb/poker_handranking_10.png" alt="">
											<p>{!! trans('howto.poker_hand_ranking_list_14_desc_mb') !!}</p>
										</div>
								</div> {{--pokerhand-wrap--}}
						</div> {{-- // howto--layers--}}

						<div id="betting-system" class="howto--layers"> {{--howto--layers--}}
								<h4>{!! trans('howto.betting_system') !!}</h4>
								<table class="tbl--rules">
										<thead>
												<tr>
														<th class="rules--round">{!! trans('howto.betting_system_round') !!}</th>
														<th class="rules--bet">{!! trans('howto.betting_system_bet') !!}</th>
														<th class="rules--action">{!! trans('howto.betting_system_action') !!}</th>
												</tr>
										</thead>
										<tbody>
											<tr>
													<td rowspan="4">{!! trans('howto.betting_system_round_1') !!}</td>
													<td>{!! trans('howto.betting_system_bet_1') !!}</td>
													<td>{!! trans('howto.betting_system_action_1_mb') !!}</td>
											</tr>

											<tr>
													<td>{!! trans('howto.betting_system_bet_2') !!}</td>
													<td>{!! trans('howto.betting_system_action_2_mb') !!}</td>
											</tr>

											<tr>
													<td>{!! trans('howto.betting_system_bet_3') !!}</td>
													<td>{!! trans('howto.betting_system_action_3_mb') !!}</td>
											</tr>

											<tr>
													<td>{!! trans('howto.betting_system_bet_4') !!}</td>
													<td>{!! trans('howto.betting_system_action_4_mb') !!}</td>
											</tr>

											<tr>
													<td>{!! trans('howto.betting_system_round_2') !!}</td>
													<td>{!! trans('howto.betting_system_bet_5') !!}</td>
													<td>{!! trans('howto.betting_system_action_5_mb') !!}</td>
											</tr>

											<tr>
													<td>{!! trans('howto.betting_system_round_3') !!}</td>
													<td>{!! trans('howto.betting_system_bet_6') !!}</td>
													<td>{!! trans('howto.betting_system_action_6_mb') !!}</td>
											</tr>

											<tr>
													<td>{!! trans('howto.betting_system_round_4') !!}</td>
													<td>{!! trans('howto.betting_system_bet_7') !!}</td>
													<td>{!! trans('howto.betting_system_action_7_mb') !!}</td>
											</tr>
										</tbody>
								</table>
						</div> {{-- // howto--layers--}}

						<div id="ante_bet_payouts" class="howto--layers"> {{--howto--layers--}}
								<h4>{!! trans('howto.ante_bet_payouts') !!}</h4>
								<ol class="antebet--list">
										{!! trans('howto.ante_bet_payouts_desc_mb') !!}
								</ol>
						</div> {{-- // howto--layers--}}

						<div id="bonus_bet_payouts" class="howto--layers"> {{--howto--layers--}}
								<h4>{!! trans('howto.bonus_bet_payouts') !!}</h4>
								<table class="tbl--rules">
										<thead>
												<tr>
														<th class="rules--card">{!! trans('howto.players_whole_card') !!}</th>
														<th class="rules--payout">{!! trans('howto.payout') !!}</th>
												</tr>
										</thead>
										<tbody>
												<tr>
														<td>{!! trans('howto.players_whole_card_1') !!}</td>
														<td>{!! trans('howto.payout_1') !!}</td>
												</tr>
												<tr>
														<td>{!! trans('howto.players_whole_card_2') !!}</td>
														<td>{!! trans('howto.payout_2') !!}</td>
												</tr>
												<tr>
														<td>{!! trans('howto.players_whole_card_3') !!}</td>
														<td>{!! trans('howto.payout_3') !!}</td>
												</tr>
												<tr>
														<td>{!! trans('howto.players_whole_card_4') !!}</td>
														<td>{!! trans('howto.payout_4') !!}</td>
												</tr>
												<tr>
														<td>{!! trans('howto.players_whole_card_5') !!}</td>
														<td>{!! trans('howto.payout_5') !!}</td>
												</tr>
												<tr>
														<td>{!! trans('howto.players_whole_card_6') !!}</td>
														<td>{!! trans('howto.payout_6') !!}</td>
												</tr>
												<tr>
														<td>{!! trans('howto.players_whole_card_7') !!}</td>
														<td>{!! trans('howto.payout_7') !!}</td>
												</tr>
										</tbody>
								</table>
						</div> {{-- // howto--layers--}}

						<div id="bonus_plus_payouts" class="howto--layers"> {{--howto--layers--}}
								<h4>{!! trans('howto.bonus_plus_payouts') !!}</h4>
								<ol class="antebet--list">
									{!! trans('howto.bonus_plus_desc_mb') !!}
								</ol>
								<table class="tbl--rules">
										<thead>
												<tr>
														<th class="rules--card">{!! trans('howto.players_poker_hand') !!}</th>
														<th class="rules--payout">{!! trans('howto.payout') !!}</th>
														<th class="rules--payout">{!! trans('howto.bad_beat') !!}</th>
												</tr>
										</thead>
										<tbody>
												<tr>
														<td>{!! trans('howto.players_poker_hand_1') !!}</td>
														<td>{!! trans('howto.payout_8') !!}</td>
														<td>{!! trans('howto.bad_beat_1') !!}</td>
												</tr>
												<tr>
														<td>{!! trans('howto.players_poker_hand_2') !!}</td>
														<td>{!! trans('howto.payout_9') !!}</td>
														<td>{!! trans('howto.bad_beat_2') !!}</td>
												</tr>
												<tr>
														<td>{!! trans('howto.players_poker_hand_3') !!}</td>
														<td>{!! trans('howto.payout_10') !!}</td>
														<td>{!! trans('howto.bad_beat_3') !!}</td>
												</tr>
												<tr>
														<td>{!! trans('howto.players_poker_hand_4') !!}</td>
														<td>{!! trans('howto.payout_11') !!}</td>
														<td>{!! trans('howto.bad_beat_4') !!}</td>
												</tr>
												<tr>
														<td>{!! trans('howto.players_poker_hand_5') !!}</td>
														<td>{!! trans('howto.payout_12') !!}</td>
														<td>{!! trans('howto.bad_beat_5') !!}</td>
												</tr>
												<tr>
														<td>{!! trans('howto.players_poker_hand_6') !!}</td>
														<td>{!! trans('howto.payout_13') !!}</td>
														<td>{!! trans('howto.bad_beat_6') !!}</td>
												</tr>
												<tr>
														<td>{!! trans('howto.players_poker_hand_7') !!}</td>
														<td>{!! trans('howto.payout_14') !!}</td>
														<td>{!! trans('howto.bad_beat_7') !!}</td>
												</tr>
										</tbody>
								</table>
						</div> {{-- // howto--layers--}}

						<!-- <div id="bad_beat" class="howto--layers"> {{--howto--layers--}}
							<h4>{!! trans('howto.bad_beat_rule') !!}</h4>
							<p class="bonus_plus_note">{!! trans('howto.bad_beat_mb') !!}</p>
							{!! trans('howto.bad_beat_img_mb') !!}
						</div> {{-- // howto--layers--}} -->

						<div id="pocket_bonus_payouts" class="howto--layers"> {{--howto--layers--}}
								<h4>{!! trans('howto.pocket_bonus_payouts') !!}</h4>
								<table class="tbl--rules">
										<thead>
												<tr>
														<th class="rules--card">{!! trans('howto.players_hole_cards') !!}</th>
														<th class="rules--payout">{!! trans('howto.payout') !!}</th>
												</tr>
										</thead>
										<tbody>
												<tr>
														<td>{!! trans('howto.players_hole_cards_1') !!}</td>
														<td>{!! trans('howto.payout_15') !!}</td>
												</tr>
												<tr>
														<td>{!! trans('howto.players_hole_cards_2') !!}</td>
														<td>{!! trans('howto.payout_16') !!}</td>
												</tr>
										</tbody>
								</table>
						</div> {{-- // howto--layers--}}

						<div id="same-hand-ranking" class="howto--layers hand-rank"> {{--howto--layers--}}
								<h4>{!! trans('howto.same_hand_ranking') !!}</h4>
								{!! trans('howto.same_hand_ranking_desc_mb') !!}

								<ol class="handranking--list handranking--list-m">
										<li>
												<span>{!! trans('howto.same_hand_ranking_1') !!}</span>
												<ol class="handranking-sub--list">
														<li>
																<span>{!! trans('howto.same_hand_ranking_1_1_mb') !!}</span>
																<div class="handranking--sub--text">
																	<div>
																		<p>{!! trans('howto.same_hand_ranking_dealer') !!}</p>
																		<p>{!! trans('howto.same_hand_ranking_comcard') !!}</p>
																		<p>{!! trans('howto.same_hand_ranking_player') !!}</p>
																	</div>
																	<img src="/img/howtoplay/dark/mb/same_handranking_1.1_b.png" alt="playboards">
																</div>
														</li>
												</ol>
										</li>
										<li>
												<span>{!! trans('howto.same_hand_ranking_2_mb') !!}</span>
												<ol class="handranking-sub--list">
														<li>
																<span>{!! trans('howto.same_hand_ranking_2_1') !!}</span>
																<div class="handranking--sub--text">
																	<div>
																		<p>{!! trans('howto.same_hand_ranking_dealer') !!}</p>
																		<p>{!! trans('howto.same_hand_ranking_comcard') !!}</p>
																		<p>{!! trans('howto.same_hand_ranking_player') !!}</p>
																	</div>
																	<img src="/img/howtoplay/dark/mb/same_handranking_2.1_b.png" alt="playboards">
																</div>
														</li>
														<li>
																<span>{!! trans('howto.same_hand_ranking_2_2') !!}</span>
																<div class="handranking--sub--text">
																	<div>
																		<p>{!! trans('howto.same_hand_ranking_dealer') !!}</p>
																		<p>{!! trans('howto.same_hand_ranking_comcard') !!}</p>
																		<p>{!! trans('howto.same_hand_ranking_player') !!}</p>
																	</div>
																	<img src="/img/howtoplay/dark/mb/same_handranking_2.2_b.png" alt="playboards">
																</div>
														</li>
												</ol>
										</li>
								</ol>
						</div> {{-- // howto--layers--}}

				</div> {{-- // howto-wrap__items--}}

				<div id="gameplay" class="howto-wrap__items -gameplay" hidden> {{--howto-wrap__items--}}
					<div class="howto--layers -two clearfix"> {{-- #howto--layers --}}
						<div class="howto--layers__items -thumb">
							{!! trans('howto.dealer_info_img_mb') !!}
						</div>

						<div class="howto--layers__items -desc">
							<h4>{!! trans('howto.dealer_info_mb') !!}</h4>
							<p>{!! trans('howto.dealer_info_desc_mb') !!}</p>
						</div>
					</div> {{-- // #howto--layers --}}

					@if (trans('howto.table_bet_range') !== '')
						<div class="howto--layers -two clearfix"> {{-- #howto--layers --}}
							<div class="howto--layers__items -thumb">
								{{-- // leave empty --}}
							</div>
							<div class="howto--layers__items -desc">
								<h4>{!! trans('howto.table_bet_range') !!}</h4>
								<p>{!! trans('howto.table_bet_range_desc') !!}</p>
							</div>
						</div> {{-- // #howto--layers --}}
					@endif

					<div class="howto--layers -two clearfix"> {{-- #howto--layers --}}
						<div class="howto--layers__items -thumb">
							{!! trans('howto.player_info_img_mb') !!}
						</div>

						<div class="howto--layers__items -desc">
							<h4>{!! trans('howto.player_info') !!}</h4>
							<p>{!! trans('howto.player_info_desc_mb') !!}</p>
						</div>
					</div> {{-- // #howto--layers --}}

					<div class="howto--layers clearfix"> {{-- #howto--layers --}}
						<h4>{!! trans('howto.bet_info') !!}</h4>
						{!! trans('howto.bet_info_img_mb') !!}
						<p>{!! trans('howto.bet_info_desc_mb') !!}</p>
						<!-- <div class="howto--layers__items -thumb">
							{!! trans('howto.bet_info_img_mb') !!}
						</div>

						<div class="howto--layers__items -desc">
							<h4>{!! trans('howto.bet_info') !!}</h4>
							<p>{!! trans('howto.bet_info_desc_mb') !!}</p>
						</div> -->
					</div> {{-- // #howto--layers --}}

					<div class="howto--layers -two clearfix"> {{-- #howto--layers --}}
						<div class="howto--layers__items -thumb">
							{!! trans('howto.bonus_payouts_img_mb') !!}
						</div>

						<div class="howto--layers__items -desc">
							<h4>{!! trans('howto.bonus_payouts') !!}</h4>
							<p>{!! trans('howto.bonus_payouts_desc_mb') !!}</p>
						</div>
					</div> {{-- // #howto--layers --}}

					<div class="howto--layers"> {{--howto--layers--}}
						<h4>{!! trans('howto.game_statistics') !!}</h4>
						{!! trans('howto.game_statistics_img_mb') !!}
						<p>{!! trans('howto.game_statistics_desc_mb') !!}</p>
					</div> {{-- // howto--layers--}}

					<div class="howto--layers card-display clearfix"> {{--howto--layers--}}
						<h4>{!! trans('howto.card_display') !!}</h4>
						<img src="/img/howtoplay/dark/mb/card_results.png" class="card_results" alt="card result">

						<ol class="card--list">
							<li><span>{!! trans('howto.card_dealer') !!}</span></li>
							<li><span>{!! trans('howto.card_community_cards') !!}</span></li>
							<li><span>{!! trans('howto.card_player') !!}</span></li>
						</ol>
						<div class="howto--layers__items -desc">
							<p>{!! trans('howto.card_display_desc_mb') !!}</p>
						</div>
					</div> {{-- // howto--layers--}}

					<div class="howto--layers betting-wrap clearfix"> {{--howto--layers--}}
						<h4>{!! trans('howto.betting_buttons') !!}</h4>
						{!! trans('howto.betting_buttons_desc_mb') !!}
					</div> {{-- // howto--layers--}}

					<div class="howto--layers chipsrack-wrap clearfix"> {{--howto--layers--}}
						<h4>{!! trans('howto.chips_rack') !!}</h4>
						<p>{!! trans('howto.chips_rack_desc') !!}</p>
						{!! trans('howto.chips_rack_img_mb') !!}
					</div> {{-- // howto--layers--}}

					<div class="howto--layers menu_toggle-wrap clearfix"> {{--howto--layers--}}
						<h4>{!! trans('howto.menu_toggle') !!}</h4>
						<p>{!! trans('howto.menu_toggle_desc') !!}</p>
					</div> {{-- // howto--layers--}}

					<div class="howto--layers modifychips-wrap "> {{--howto--layers--}}
						<h4>{!! trans('howto.modify_chips') !!}</h4>
						{!! trans('howto.modify_chips_desc_mb') !!}
						{!! trans('howto.modify_chips_img_mb') !!}
					</div> {{-- // howto--layers--}}

				</div> {{-- // howto-wrap__items--}}

				<a href="#gamerules"><div class="arrow-up" hidden></div></a>
	    </div> {{-- // howto-wrap--}}

			<canvas id="vidCanvas" width="1080px" height="720px"></canvas>
			<canvas id="myCanvas" width="1080px" width="720px"></canvas>
			<div id="volumeCircle"></div>

			{{-- Modal --}}
			<div id="mdlConfirmation">
				<div class="mdl_overlay"></div>
				<div id="mdl_kick-con" class="mdl_bg">
					<div class="mdl_warning_ico"></div>
					<div class="mdl_message">You are already a banker<br/>in another game.</div>
					<div class="mdl_lobby">
						<span>EXIT TO LOBBY</span>
					</div>
				</div>
			</div>

			<input type="number" id="transferFunds" disabled hidden>
					@if($tutorial_enabled == "true")
					<div class="tutorials tutorials-wrap-m" style="display:none;"> {{--tutorials--}}
						<div class="tutorials--img clearfix"></div>
						<div class="tutorials--intro clearfix"> {{--intro--}}
							<h4>{!! trans('tutorials.intro') !!}</h4>
							{!! trans('tutorials.intro_img') !!}
							<p class="intro-text">{!! trans('tutorials.intro_desc') !!}</p>
							<div class="btn btn-nevershow">{!! trans('tutorials.intro_firstButton') !!}</div>
							<div class="btn btn-close">{!! trans('tutorials.intro_secondButton') !!}</div>
							<div class="btn btn-continue">{!! trans('tutorials.intro_thirdButton') !!}</div>
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

						<div id="bonusPayout" class="tutorials--con"> {{--bonusPayout--}}
							{!! trans('tutorials.mb_bonusPayout_img') !!}
							<h2>{!! trans('tutorials.mb_bonusPayout_title') !!}</h2>
							<p>{!! trans('tutorials.mb_bonusPayout_desc') !!}</p>
							<div class="btn-center clearfix">
								<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
								<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
							</div>
						</div> {{-- // bonusPayout--}}

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

						<div id="timer" class="tutorials--con"> {{--betButtonTimer--}}
							{!! trans('tutorials.mb_timer_img') !!}
							<h2>{!! trans('tutorials.mb_timer_title') !!}</h2>
							<p>{!! trans('tutorials.mb_timer_desc') !!}</p>
							<div class="btn-center clearfix">
								<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
								<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
							</div>
						</div> {{--betButtonTimer--}}

						<div id="antebonusBets" class="tutorials--con"> {{--antebonusBets--}}
							{!! trans('tutorials.mb_antebonusBets_img') !!}
							<h2>{!! trans('tutorials.mb_antebonusBets_title') !!}</h2>
							<p>{!! trans('tutorials.mb_antebonusBets_desc') !!}</p>
							<div class="btn-center clearfix">
								<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
								<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
							</div>
						</div> {{-- // antebonusBets--}}

						<div id="flopBet" class="tutorials--con"> {{--flopBet--}}
							{!! trans('tutorials.mb_flopBet_img') !!}
							<h2>{!! trans('tutorials.mb_flopBet_title') !!}</h2>
							<p>{!! trans('tutorials.mb_flopBet_desc') !!}</p>
							<div class="btn-center clearfix">
								<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
								<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
							</div>
						</div> {{-- // flopBet--}}

						<div id="turnBet" class="tutorials--con"> {{--turnBet--}}
							{!! trans('tutorials.mb_turnBet_img') !!}
							<h2>{!! trans('tutorials.mb_turnBet_title') !!}</h2>
							<p>{!! trans('tutorials.mb_turnBet_desc') !!}</p>
							<div class="btn-center clearfix">
								<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
								<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
							</div>
						</div> {{-- // turnBet--}}

						<div id="riverBet" class="tutorials--con"> {{--riverBet--}}
							{!! trans('tutorials.mb_riverBet_img') !!}
							<h2>{!! trans('tutorials.mb_riverBet_title') !!}</h2>
							<p>{!! trans('tutorials.mb_riverBet_desc') !!}</p>
							<div class="btn-center clearfix">
								<div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
								<div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
							</div>
						</div> {{-- // riverBet--}}

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
							<li id="bonusPayout" class="progress"></li>
							<li id="gameStatistics" class="progress"></li>
							<li id="playerInfo" class="progress"></li>
							<li id="gameMenu" class="progress"></li>
							<li id="chipRack" class="progress"></li>
							<li id="betButton" class="progress"></li>
							<li id="timer" class="progress"></li>
							<li id="antebonusBets" class="progress"></li>
							<li id="flopBet" class="progress"></li>
							<li id="turnBet" class="progress"></li>
							<li id="riverBet" class="progress"></li>
							<li id="cardDisplay" class="progress"></li>
						</ul>
					</div> {{-- // progress-bar--}}
					@endif
			<div id="promptnobet">
				<div class="prompt_overlay"></div>
				<div class="prompt_wrap dom-resizable m_wrap">
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
			</div>
		</div>
	</div>
</body>
<script type="text/javascript">
window.bets = {!!$bets!!};

window.sample_saved_bets = [];

window.bet_limit = {
	min: 1000,
	max: 200000
}

window.tutorial_enabled = window.config.tutorial == "true";
window.theme = window.tutorial_enabled ? (window.config.screen == "black" ? "white" : "black") : window.config.screen;

	window.dealer = {
		"screen_name" : "april",
		"img" : "april.png",
		"image" : "april.png"
	}

	window.user_money = {{$money}};
	window.user_name = '{{$user_name}}';
</script>

<script type="text/javascript">
	window.language = {
    locale: '{{ App::getLocale() }}',
		menu: {
			cashin			: '{{ trans('ingame.cashin') }}',
			cashout			: '{{ trans('ingame.cashout') }}',
			betscaps    		: '{{ trans('ingame.betscaps') }}',
   			winningresultcaps   : '{{ trans('ingame.winningresultcaps') }}',
        	payoutcaps          : '{{ trans('ingame.payoutcaps') }}',

			exit				: '{{ trans('ingame.exit') }}',
			fullscreen			: '{{ trans('ingame.fullscreen') }}',
			howtoplay			: '{{ trans('ingame.howtoplay') }}',
			refreshvideo		: '{{ trans('ingame.refreshvideo') }}',
			playerinfo			: '{{ trans('ingame.playerinfo') }}',
			records				: '{{ trans('ingame.records') }}',
			transfer			: '{{ trans('ingame.transfer') }}',
			modifychips			: '{{ trans('ingame.modifychips') }}',
			multiplayer			: '{{ trans('ingame.multiplayer') }}',
			settings			: '{{ trans('ingame.settings') }}',

			playerinfocaps 		: '{{ trans('ingame.playerinfocaps') }}',
			playername 			: '{{ trans('ingame.playername') }}',
			playerbalance 		: '{{ trans('ingame.playerbalance') }}',
			roundid 			: '{{ trans('ingame.roundid') }}',
			dealernamecaps 		: '{{ trans('ingame.dealernamecaps') }}',
			channelcaps			: '{{ trans('ingame.channelcaps') }}',
      cardvaluescaps			: '{{ trans('ingame.cardvaluescaps') }}',
			total 				: '{{ trans('ingame.total') }}',
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
			wincaps    : '{{ trans('ingame.wincaps') }}',
   			losecaps    : '{{ trans('ingame.losecaps') }}',
			showtutorial 		: '{{ trans('ingame.showtutorial') }}'

		},
		poker: {
			gameno 				: '{{ trans('ingame.gameno') }}',
			player 				: '{{ trans('ingame.player') }}',
			communitycard 		: '{{ trans('ingame.communitycard') }}',
			dealer				: '{{ trans('ingame.dealer') }}',
			pokerbonuscaps		: '{{ trans('ingame.pokerbonuscaps') }}',
			antecaps 			: '{{ trans('ingame.antecaps') }}',
			flopcaps 			: '{{ trans('ingame.flopcaps') }}',
			turncaps 			: '{{ trans('ingame.turncaps') }}',
			rivercaps			: '{{ trans('ingame.rivercaps') }}'
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
			promptbetfail       : '{{ trans('ingame.promptbetfail') }}',

			promptplacebets 	: '{{ trans('ingame.promptplacebets') }}',
			promptactivated 	: '{{ trans('ingame.promptactivated') }}',
			promptcancelauto 	: '{{ trans('ingame.promptcancelauto') }}',
			promptcancelbets 	: '{{ trans('ingame.promptcancelbets') }}',
      		promptfirstround  	: '{{ trans('ingame.promptfirstround') }}',
      	promptaddfail : '{{trans('ingame.promptaddfail')}}'
		},
		gamename: {
				dragontiger_game 	 : '{{ trans('ingame.dragontiger_game') }}',
				sicbo_game 				: '{{ trans('ingame.sicbo_game') }}',
				poker_game 				: '{{ trans('ingame.poker_game') }}',
				baccarat_game 				: '{{ trans('ingame.baccarat_game') }}',
				roulette_game 				: '{{ trans('ingame.roulette_game') }}',
				redwhite_game 				: '{{ trans('ingame.redwhite_game') }}',
				spinwin_game 				: '{{ trans('ingame.spinwin_game') }}'
		},
		game_specific: {
			dealer 				: '{{ trans('ingame.dealer') }}',
			player 				: '{{ trans('ingame.player') }}',
			gameno 				: '{{ trans('ingame.gameno') }}',
			communitycard 		: '{{ trans('ingame.communitycard') }}',
			bonus 			    : '{{ trans('ingame.bonus') }}',
			ante 			    : '{{ trans('ingame.ante') }}',
			flop 			    : '{{ trans('ingame.flop') }}',
			turn 			    : '{{ trans('ingame.turn') }}',
			river 			    : '{{ trans('ingame.river') }}',
			result 			    : '{{ trans('ingame.result') }}',
			playerwins 			: '{{ trans('ingame.playerwins') }}',
			dealerwins 			: '{{ trans('ingame.dealerwins') }}',
			bonuspayout 		: '{{ trans('ingame.bonuspayout') }}',
			bonuspluspayout     : '{{ trans('ingame.bonuspluspayout') }}',
			pocketpayout        : '{{ trans('ingame.pocketpayout') }}',
			badbeatpayout       : '{{ trans('ingame.badbeatpayout') }}',
			tie 		: '{{ trans('ingame.tie') }}'
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
		  poker_hand_ranking_list_6 		: '{{ trans('howto.poker_hand_ranking_list_6') }}',

			bonus_plus_payout_1 :'{{ trans('howto.bonus_plus_payout_1') }}',
	    bonus_plus_payout_2 :'{{ trans('howto.bonus_plus_payout_2') }}',
	    bonus_plus_payout_3 :'{{ trans('howto.bonus_plus_payout_3') }}',
	    bonus_plus_payout_4 :'{{ trans('howto.bonus_plus_payout_4') }}',
	    bonus_plus_payout_5 :'{{ trans('howto.bonus_plus_payout_5') }}',
	    bonus_plus_payout_6 :'{{ trans('howto.bonus_plus_payout_6') }}',
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
		com_sub_ingameprompts_notbet3rounds:'{{trans('ingame-web.com_sub_ingameprompts_notbet3rounds')}}',
		com_sub_ingameprompts_antebetrequired:'{{trans('ingame-web.com_sub_ingameprompts_antebetrequired')}}',
		com_sub_ingameprompts_changebetrange:'{{trans('ingame-web.com_sub_ingameprompts_changebetrange')}}',
		com_sub_ingameprompts_changegamemode:'{{trans('ingame-web.com_sub_ingameprompts_changegamemode')}}',
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

<script type="text/javascript" src="/osmf/swfobject.min.js"></script>
<script type="text/javascript" src="/dist/poker-mobile.min.js"></script>
<script type="text/javascript" src=""></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js"></script>
<script type="text/javascript" src="/js/dom-events-mobile.js"></script>

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

        if(scroll <= 10) {
            $('.arrow-up').fadeOut();
						$('.howto-wrap--accent').fadeOut();
        } else {
            $('.arrow-up').fadeIn();
						$('.howto-wrap--accent').fadeIn();
        }

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
</html>
