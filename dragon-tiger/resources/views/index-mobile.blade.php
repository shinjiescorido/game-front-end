<!DOCTYPE html>
<html>
  <head>
    <title>DT mobile</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
{{--
    <link href="https://fonts.googleapis.com/css?family=Arvo:400,700,700i" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=lato-regular" rel="stylesheet"> --}}

    <script src="/js/createjs/createjs-2015.11.26.min.js"></script>
    <script src="/js/createjs/easeljs-0.8.2.min.js"></script>
    <script src="/js/createjs/tweenjs-0.6.2.min.js"></script>
    <script src="/js/createjs/soundjs-0.6.2.min.js"></script>
    <script src="/js/createjs/preloadjs-0.6.2.min.js"></script>

    <link rel="stylesheet" href="/css/howto.css" />
    <link rel="stylesheet" href="/css/app.css">
    <link rel="stylesheet" href="/css/tutorials-mobile.css" />
    <link rel="stylesheet" href="/css/prompt-mobile.css" />
    <link rel="stylesheet" href="/css/main.css">

    <script type="text/javascript">
      window.socket =  '{{ env('APP_SOCKET') }}';
      window.poker_domain = '{{ env('P_DOMAIN') }}';
      window.bc_domain = '{{ env('BC_DOMAIN') }}';
      window.sb_domain = '{{ env('SB_DOMAIN') }}';
      window.dt_domain = '{{ env('DT_DOMAIN') }}';
      window.lobby_domain = '{{ env('LOBBY_DOMAIN') }}';

      window.round_id = '{{$round_id}}';
      window.tableNum = {{$table}}
      window.range = '{{$range}}';
      window.userId = {{Auth::user()->id}}
      window.user_type = "{{ app('auth')->user()->user_type }}";
      window.user_money = {{$money}};
      window.user_name = '{{$user_name}}';
      window.user_chips = {!! $userChips !!};
      window.lobby_type = '{!! $lobby_type !!}';
      window.lobby_redirect_url = '{!! $lobby_redirect_url !!}';
      window.room_yn = {!! $room_yn !!};
      {{-- window.isPlayer = '{!! $isPlayer !!}'; --}}

      window.currencyAbbrev = '{!! $currencyAbbrev !!}';
      window.currencyMultiplier = {!! $currencyMultiplier !!};
      window.userMultiplier = {!! $userMultiplier !!};
      window.mainMultiplier = {!! $mainMultiplier !!};
      window.integrationType = '{!! $integrationType !!}';
      window.vendorSound = '{!! $vendorSound !!}';

      <?php $tutorial_enabled = isset($config->avarta->tutorial->enabled) ? $config->avarta->tutorial->enabled : "true"; ?>
      window.userAuthority = '{{Auth::user()->authority == "a" ? "admin" : "user" }}';

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

      window.rangeDetails = {!! $rangeDetails !!};
      window.multiplayer = {{$multiplayer}};
      window.casino = @if($currencyAbbrev == 'KRW' || $currencyAbbrev == 'THB') 'N' @else 'SS' @endif;
      window.videostream_url = "http://d556i00mq0ud2.cloudfront.net/Poker01/video/playlist.m3u8";
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
        overflow: hidden;
      }
      canvas {
        -webkit-overflow-scrolling: touch;
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        /*background-image:url('/img/dt/dt.png');*/
        background: #000;
        background-size: 100% 100%;
      }

      input[type=number]::-webkit-inner-spin-button,
      input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      #canvasTextbox {
        background: transparent;
        display: none;
        transform: translate(0%, 0%);
        left: 77%;
        top: 65%;
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
      #SUPER-CONTAINER {
        width: 1280px;
        height: 720px;
        position:absolute;
        top:50%;
        left: 50%;
        margin-left: -640px;
        margin-top: -360px;
      }
      .osmf-video {
        /*width: 90%;
        height: 90%;
        position: absolute;
        left: 8.5%;*/

        width: 100%;
        height: 100%;
        position: absolute;
        left: 2.2%;
        top: -8%;
        transform: scale(0.85);
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
  </head>
  <body>
    <span style = "font-family: arvo-regular"></span>
    <span style = "font-family: arvo-black"></span>
    <span style = "font-family: lato-regular"></span>
    <span style = "font-family: lato-bold"></span>
    <span style = "font-family: lato-black"></span>
    <span style = "font-family: bebas-regular"></span>

    <div class="container" id="SUPER-CONTAINER">
      <!-- <div class="black"></div> -->
      <canvas id="myCanvas" width="1080px" width="720px"></canvas>

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

      <div class="howto-wrap--accent howto-wrap--accent-mb"></div>
      <div id="top" class="howto-wrap howto-wrap-m"> {{-- .howto-wrap --}}

        <div id="gamerules" class="howto-wrap__items -gamerules"> {{-- .howto-wrap__items --}}
          <ul class="gamerules-menu"> {{-- .gamerules-menu --}}
            <li class="gamerules-menu__items">
              <a href="#game"></a>
              <span>{!! trans('howto.game_objective') !!}</span>
            </li>
            <li class="gamerules-menu__items">
              <a href="#gameplay"></a>
              <span>{!! trans('howto.gameplay') !!}</span>
            </li>
            <li class="gamerules-menu__items">
              <a href="#type-of-bets"></a>
              <span>{!! trans('howto.types_of_bet') !!}</span>
            </li>
            <li class="gamerules-menu__items">
              <a href="#suit"></a>
              <span>{!! trans('howto.suit_suited') !!}</span>
            </li>
          </ul> {{-- // .gamerules-menu --}}

          <div id="game" class="howto--layers"> {{-- .game-objective --}}
            <p>{!! trans('howto.MB_gameobj_desc') !!}</p>
          </div> {{-- // .game-objective --}}

          <div id="gameplay" class="howto--layers"> {{-- .gameplay --}}
            <h4>{!! trans('howto.gameplay') !!}</h4>

            <ul class="gameplay-list">
              {!! trans('howto.MB_gameplay_list') !!}
            </ul>
          </div> {{-- // .gameplay --}}

          <div  class="howto--layers"> {{-- .type-of-bets --}}
            <h4 id="type-of-bets">{!! trans('howto.types_of_bet') !!}</h4>
            <table class="tbl--typeofbets">
              <thead>
                <tr>
                  <th class="bet">{!! trans('howto.bet') !!}</th>
                  <th class="payout">{!! trans('howto.payout') !!}</th>
                  <th class="condition">{!! trans('howto.condition_of_winning') !!}</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td class="bet">{!! trans('howto.bet_dragon') !!}</td>
                  <td class="payout">{!! trans('howto.payout_1_1') !!}</td>
                  <td class="condition">{!! trans('howto.MB_condition_1') !!}</td>
                </tr>

                <tr>
                  <td class="bet">{!! trans('howto.bet_tiger') !!}</td>
                  <td class="payout">{!! trans('howto.payout_1_1') !!}</td>
                  <td class="condition">{!! trans('howto.MB_condition_2') !!}</td>
                </tr>

                <tr>
                  <td class="bet">{!! trans('howto.bet_tie') !!}</td>
                  <td class="payout">{!! trans('howto.payout_10_1') !!}</td>
                  <td class="condition">{!! trans('howto.MB_condition_3') !!}</td>
                </tr>

                <tr>
                  <td class="bet">{!! trans('howto.bet_suitedtie') !!}</td>
                  <td class="payout">{!! trans('howto.payout_50_1') !!}</td>
                  <td class="condition">{!! trans('howto.MB_condition_6') !!}</td>
                </tr>

                <tr>
                  <td class="bet">{!! trans('howto.bet_bigsmall') !!}</td>
                  <td class="payout">{!! trans('howto.payout_1_1') !!}</td>
                  <td class="condition">{!! trans('howto.MB_condition_4') !!}</td>
                </tr>

                <tr>
                  <td class="bet">{!! trans('howto.bet_oddeven') !!}</td>
                  <td class="payout">{!! trans('howto.payout_1_1') !!}</td>
                  <td class="condition">{!! trans('howto.MB_condition_5') !!}</td>
                </tr>

                <tr>
                  <td class="bet">{!! trans('howto.bet_suit') !!}</td>
                  <td class="payout">{!! trans('howto.payout_3_1') !!}</td>
                  <td class="condition">{!! trans('howto.MB_condition_7') !!}</td>
                </tr>
              </tbody>
            </table>
          </div> {{--  //.type-of-bets --}}

          <div id="suit" class="howto--layers clearfix"> {{-- #suit --}}
            <!-- <h4 id="type-of-bets">{!! trans('howto.suit_suited') !!}</h4> -->
            <div class="suit__items -suit">
              <h4>{!! trans('howto.suit_title') !!}</h4>
              <p>{!! trans('howto.MB_suit_desc') !!}</p>
            </div>

            <div class="suit__items -suited-tie">
              <h4>{!! trans('howto.suitedtie_title') !!}</h4>
              <p>{!! trans('howto.MB_suitedtie_desc') !!}</p>
            </div>
          </div> {{-- // #suit --}}

          <div id="suit" class="howto--layers clearfix"> {{-- #suit --}}
            <div class="suit__items -suit">
              <img src="/img/howtoplay/dt_suit1_pc.png" alt="suit" />
            </div>
            <div class="suit__items -suited-tie">
              <img src="/img/howtoplay/dt_suit2_pc.png" alt="suited tie" />
            </div>
          </div>
        </div> {{-- // .howto-wrap__items --}}

        <div class="howto-wrap__items -gameplay clearfix" hidden> {{-- .howto-wrap__items --}}
          <div class="howto--layers -two clearfix"> {{-- #howto--layers --}}
            <div class="howto--layers__items -thumb">
              {!! trans('howto.MB_dealers_info_chanel_bet_img') !!}
            </div>

            <div class="howto--layers__items -desc">
              <p>{!! trans('howto.MB_dealers_info_chanel_bet_desc') !!}</p>
            </div>
          </div> {{-- // #howto--layers --}}

          <div class="howto--layers -two clearfix"> {{-- #howto--layers --}}
            <div class="howto--layers__items -thumb">
              {!! trans('howto.MB_playerinfo_img') !!}
            </div>

            <div class="howto--layers__items -desc">
              <h4>{!! trans('howto.playerinfo_title') !!}</h4>
              <p>{!! trans('howto.MB_playerinfo_desc') !!}</p>
            </div>
          </div> {{-- // #howto--layers --}}

          <div class="howto--layers clearfix"> {{-- #howto--layers --}}
            <h4>{!! trans('howto.betinfo_title') !!}</h4>
            {!! trans('howto.MB_betinfo_img') !!}
            <p>{!! trans('howto.MB_betinfo_desc') !!}</p>
          </div> {{-- // #howto--layers --}}

          <div class="howto--layers game-stats clearfix">
            <h4>{!! trans('howto.gamestatistics_title') !!}</h4>
            <p>{!! trans('howto.MB_gamestatistics_desc') !!}</p>
          </div>


          <div class="howto--layers card-display clearfix"> {{-- #howto--layers --}}
            <div class="howto--layers__items">
              <h4>{!! trans('howto.card_display_title') !!}</h4>
              <span class="tx-card-values">{!! trans('howto.card_values') !!}</span>
              <img src="/img/howtoplay/dark/card_display_mb.png" class="card-display-mb changeImg" alt="card_display" />

              <div class="clearfix dragon-tiger">
                <span class="tx-card-dragon1">{!! trans('howto.dragon') !!}</span>
                <span class="tx-card-tiger1">{!! trans('howto.tiger') !!}</span>
              </div>

              <br />

              <span class="tx-card-duringdeal">{!! trans('howto.during_deal') !!}</span>
              <span class="tx-card-resultsshow">{!! trans('howto.results_show') !!}</span>
            </div>
          </div> {{-- // #howto--layers --}}


          <div class="howto--layers betting-wrap clearfix"> {{-- #howto--layers --}}
            <div class="howto--layers__items">
              <h4>{!! trans('howto.betting_buttons_timer_title') !!}</h4>
              <p>{!! trans('howto.MB_betting_buttons_timer_desc') !!}</p>
            </div>
          </div> {{-- // #howto--layers --}}

          <div class="howto--layers chipsrack-wrap clearfix"> {{-- #howto--layers --}}
            <div class="howto--layers__items">
              <h4>{!! trans('howto.chips_rack_title') !!}</h4>
              <p>{!! trans('howto.chips_rack_desc') !!}</p>
              {!! trans('howto.MB_chips_rack_img') !!}
            </div>
          </div> {{-- // #howto--layers --}}

          <div class="howto--layers menu-toggle-wrap clearfix"> {{-- #howto--layers --}}
            <div class="howto--layers__items">
              <h4>{!! trans('howto.menu_toggle_button_title') !!}</h4>
              <p>{!! trans('howto.MB_menu_toggle_button_desc') !!}</p>
            </div>
          </div> {{-- // #howto--layers --}}

          <div class="howto--layers modifychips-wrap clearfix"> {{-- #howto--layers --}}
            <div class="howto--layers__items">
              <h4>{!! trans('howto.modify_chips_title') !!}</h4>
              <p>{!! trans('howto.MB_modify_chips_desc') !!}</p>
              {!! trans('howto.MB_modify_chips_img') !!}
            </div>
          </div> {{-- // #howto--layers --}}

        </div> {{-- // .howto-wrap__items --}}

        <a href="#gamerules" id="arr"><div class="arrow-up -mb"></div></a>
      </div> {{-- // .howto-wrap --}}

      <input type="number" id="transferFunds" disabled hidden>

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
      </div> {{-- // wrappe--}}

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
            {!! trans('tutorials.bettingLayoutMulti_img') !!}
            <h2>{!! trans('tutorials.bettingLayoutMulti_title') !!}</h2>
            <p>{!! trans('tutorials.bettingLayoutMulti_desc') !!}</p>
            <div class="btn-center clearfix">
              <div class="btn btn-cancel">{!! trans('tutorials.cancelButton') !!}</div>
              <div class="btn btn-next">{!! trans('tutorials.nextButton') !!}</div>
            </div>
          </div> {{-- // bettingLayoutMulti--}}

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
            <li id="cardDisplay" class="progress"></li>
          </ul>
        </div> {{-- // progress-bar--}}
      @endif
      <div id="promptnobet">
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
      </div>
    </div>
  </body>
  <script type="text/javascript">
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
    window.tableNum = {{$table}}
  </script>

  <script type="text/javascript">
    window.language = {
    locale: '{{ App::getLocale() }}',
    menu: {
      cashin			: '{{ trans('ingame.cashin') }}',
      cashout			: '{{ trans('ingame.cashout') }}',
      betscaps    		: '{{ trans('ingame.betscaps') }}',
      winningresultcaps   : '{{ trans('ingame.winningresultcaps') }}',

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
      transferlogs        : '{{ trans('ingame.transferlogs') }}',
      betlogs             : '{{ trans('ingame.betlogs') }}',
      gamehistory         : '{{ trans('ingame.gamehistory') }}',

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
      betcaps 			: '{{ trans('ingame.betcaps') }}',
      datecaps			: '{{ trans('ingame.datecaps') }}',
      typecaps 			: '{{ trans('ingame.typecaps') }}',
      oldcreditcaps 		: '{{ trans('ingame.oldcreditcaps') }}',
      transferamountcaps	: '{{ trans('ingame.transferamountcaps') }}',
      newcreditcaps 		: '{{ trans('ingame.newcreditcaps') }}',
      ipcaps 				: '{{ trans('ingame.ipcaps') }}',
      countrycaps			: '{{ trans('ingame.countrycaps') }}',
      nodata				: '{{ trans('ingame.nodata') }}',
      payoutcaps          : '{{ trans('ingame.payoutcaps') }}',

      betlogscaps 		: '{{ trans('ingame.betlogscaps') }}',
      gamenocaps 			: '{{ trans('ingame.gamenocaps') }}',
      tablecaps			: '{{ trans('ingame.tablecaps') }}',
      roomcaps 			: '{{ trans('ingame.roomcaps') }}',
      startingcreditcaps 	: '{{ trans('ingame.startingcreditcaps') }}',
      totalbetcaps		: '{{ trans('ingame.totalbetcaps') }}',
      totalwinningscaps 	: '{{ trans('ingame.totalwinningscaps') }}',
      resultcaps 			: '{{ trans('ingame.resultcaps') }}',

      gamehistorycaps 	: '{{ trans('ingame.gamehistorycaps') }}',
      transferscaps       : '{{ trans('ingame.transferscaps') }}',
      bethistorycaps      : '{{ trans('ingame.bethistorycaps') }}',

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
      promptcancel 		 : '{{ trans('ingame.promptcancel') }}',
      promptbetfail     : '{{ trans('ingame.promptbetfail') }}',
      promptaddfail     : '{{ trans('ingame.promptaddfail') }}',

      promptplacebets 	: '{{ trans('ingame.promptplacebets') }}',
      promptactivated 	: '{{ trans('ingame.promptactivated') }}',
      promptcancelauto 	: '{{ trans('ingame.promptcancelauto') }}',
      promptcancelbets 	: '{{ trans('ingame.promptcancelbets') }}',
      promptfirstround  : '{{ trans('ingame.promptfirstround') }}'
    },
    game_specific: {
      dragonwins 			  : '{{ trans('ingame.dragonwins') }}',
      tigerwins 			 : '{{ trans('ingame.tigerwins') }}',
      dragon 				   : '{{ trans('ingame.dragon') }}',
      tiger 			     : '{{ trans('ingame.tiger') }}',
      tie 			       : '{{ trans('ingame.tie') }}',
      suitedtie           : '{{ trans('ingame.suitedtie') }}',
      dragoncaps          : '{{ trans('ingame.dragoncaps') }}',
      tigercaps           : '{{ trans('ingame.tigercaps') }}'
    }
  }

  window.language2 = {
    locale: '{{ App::getLocale() }}',
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

    // Bet layout
    com_sub_betlayout_singleplayer:'{{trans('ingame-web.com_sub_betlayout_singleplayer')}}',
    com_sub_betlayout_multiplayer: '{{trans('ingame-web.com_sub_betlayout_multiplayer')}}',

    // Menu Area
    com_sub_menuarea_betlogs:'{{trans('ingame-web.com_sub_menuarea_betlogs')}}',
    com_sub_menuarea_gameno:'{{trans('ingame-web.com_sub_menuarea_gameno')}}',
    com_sub_menuarea_dealername: '{{trans('ingame-web.com_sub_menuarea_dealername')}}',
    com_sub_menuarea_totalbet:'{{trans('ingame-web.com_sub_menuarea_totalbet')}}',
    com_sub_menuarea_channel:'{{trans('ingame-web.com_sub_menuarea_channel')}}',
    com_sub_menuarea_winlose: '{{trans('ingame-web.com_sub_menuarea_winlose')}}',
    com_sub_menuarea_newbalance:'{{trans('ingame-web.com_sub_menuarea_newbalance')}}',
    com_sub_menuarea_winningresult:'{{trans('ingame-web.com_sub_menuarea_winningresult')}}',
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

    /***** Nihtan Junket ******/
    // Ingame
    nihtanjunket_ingame_user:'{{trans('ingame-web.nihtanjunket_ingame_user')}}',
    nihtanjunket_ingame_bets:'{{trans('ingame-web.nihtanjunket_ingame_bets')}}',
    nihtanjunket_ingame_winlose:'{{trans('ingame-web.nihtanjunket_ingame_winlose')}}',
    nihtanjunket_ingame_totalplayers:'{{trans('ingame-web.nihtanjunket_ingame_totalplayers')}}',
    nihtanjunket_ingame_totalbets:'{{trans('ingame-web.nihtanjunket_ingame_totalbets')}}',
    lobby_baccaratpage_multiplayer: '{{trans('ingame-web.lobby_baccaratpage_multiplayer')}}',

    /***** Dragon Tiger ******/
    //BetLayout
    dragontiger_betlayout_dragon:'{{trans('ingame-web.dragontiger_betlayout_dragon')}}',
    dragontiger_betlayout_tiger:'{{trans('ingame-web.dragontiger_betlayout_tiger')}}',
    dragontiger_betlayout_tie:'{{trans('ingame-web.dragontiger_betlayout_tie')}}',
    dragontiger_betlayout_even:'{{trans('ingame-web.dragontiger_betlayout_even')}}',
    dragontiger_betlayout_odd:'{{trans('ingame-web.dragontiger_betlayout_odd')}}',
    dragontiger_betlayout_big:'{{trans('ingame-web.dragontiger_betlayout_big')}}',
    dragontiger_betlayout_small:'{{trans('ingame-web.dragontiger_betlayout_small')}}',
    dragontiger_betlayout_suitedtie:'{{trans('ingame-web.dragontiger_betlayout_suitedtie')}}',

    //WinningDisplay
    dragontiger_winningdisplay_dragonwins:'{{trans('ingame-web.dragontiger_winningdisplay_dragonwins')}}',
    dragontiger_winningdisplay_tigerwins:'{{trans('ingame-web.dragontiger_winningdisplay_tigerwins')}}',
    dragontiger_winningdisplay_tie:'{{trans('ingame-web.dragontiger_winningdisplay_tie')}}'
  }
  </script>

  <script type="text/javascript" src="/osmf/swfobject.min.js"></script>
  <script type="text/javascript" src="/dist/dragon-tiger-mobile.min.js"></script>
  <script type="text/javascript" src="/temp/CanvasInput.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.3/vue.js"></script>
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
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

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

      $('.howto-wrap-m').scroll(function() {
        var height = $(this).height();
        var scroll = $(this).scrollTop();
        if(scroll <= 10) {
          $('.arrow-up').fadeOut();
          $('.howto-wrap--accent-mb').fadeOut();
        } else {
          $('.arrow-up').fadeIn();
          $('.howto-wrap--accent-mb').fadeIn();
        }
      });

      // tutorials
      window.multiplayer == 1 ? $("#bettingLayout, li#bettingLayout").remove() : $("#bettingLayoutMulti, li#bettingLayoutMulti").remove();
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
  </script>
</html>
