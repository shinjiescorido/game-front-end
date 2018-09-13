/**
 * dragon-tiger-mobile.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

import Xpacket from '../../lib/XPacket';

import {  createSprite,
        randomNum,
        createCardSprite,
        numberCounter,
        playSound,
        numberWithCommas,
        createSpriteRoadMap,
        getSlaveParam} from '../../factories/factories';

//===ingmae tutorial video overlay
import ingame_overlay from '../../components/baccarat/mobile/ingame-overlay';

//===common components
import chips from '../../components/commons/mobile/chips';
import timer from '../../components/commons/mobile/timer';
import game_buttons from '../../components/commons/mobile/gameButtons';
import player_info from '../../components/commons/mobile/playerInfo';
import bet_board from '../../components/commons/mobile/table';
import channel from '../../components/commons/mobile/channel';
import dealer from '../../components/commons/mobile/dealer';
import win_result from '../../components/commons/mobile/winning';
import messages from '../../components/commons/mobile/messages';
import menu from '../../components/commons/mobile/menu';
import bet_indicator from '../../components/commons/mobile/betIndicator';
import announcement from '../../components/commons/mobile/announcement';

import roomInfo from '../../components/baccarat/mobile/roomInfo';
import menuBetRecords from '../../components/commons/mobile/menuBetRecords';
import menuHowToPlay from '../../components/baccarat/mobile/menuHowToPlay';
import menuPlayerInfo from '../../components/commons/mobile/menuPlayerInfo';
import menuChips from '../../components/commons/mobile/menuChips';
import menuSettings from '../../components/commons/mobile/menuSettings';
import menuTransfer from '../../components/commons/mobile/menuTransfer';
import menuEvents from '../../components/commons/mobile/menuEvents';
import menuSettingsEvents from '../../components/commons/mobile/menuSettingsEvents';

import toggle from '../../components/commons/mobile/toggle'
import winChips from '../../components/commons/mobile/winChips';

//===uncommon components
// import firstViewSingle from '../../components/baccarat/mobile/firstViewSingle';
// import firstViewMultiplayer from '../../components/baccarat/mobile/firstViewMultiplayer';
import multiplayer from '../../components/baccarat/mobile/multiplayer';
import tableOutline from '../../components/baccarat/mobile/outline';
import junketEvents from '../../components/baccarat/mobile/junketEvents';
import balanceBet from '../../components/baccarat/mobile/balanceBet';
import drawn_table from '../../components/baccarat/mobile/tableDraw2';
import gameInfo from '../../components/baccarat/mobile/gameInfo';
import card_result from '../../components/baccarat/mobile/cardResult';
import fake_card_result from '../../components/baccarat/mobile/fake-cardResult';
import dealer_data from '../../components/baccarat/mobile/dealer_data';
import scoreboard from '../../components/baccarat/mobile/scoreboard';
import card_extra from '../../components/baccarat/mobile/cardResultExtra';
import winning_assets from '../../components/baccarat/mobile/winningAsset';
import bet_details from '../../components/baccarat/mobile/betDetails';
import win_amount from '../../components/baccarat/mobile/winAmount';
import firstView from '../../components/baccarat/mobile/first_view_table';

import menuBetData from '../../components/baccarat/mobile/menuBetData';
import roadmap from '../../components/baccarat/mobile/ingame-roadmap';

//===unique game configuration
import betboard_config from '../../assets/mobile/dt_betboard_config';
import opposite_bet from '../../assets/dt_betarea_opposite_condition_m';
import theme_config from '../../assets/theme_colors_config';

import lines from '../../components/commons/mobile/lines';
//===ingmae tutorial for first time users
import ingame_tutorial from '../../components/baccarat/mobile/ingame-tutorial';

//burn card
import burn_card from '../../components/baccarat/mobile/burnCard';

//===loading screen/animation
import loading_init from '../../screens/loading_init';
import load from '../../screens/loading';

//===dragon tiger events
import listen from '../../listeners/baccarat-events2';

//=== links for gamebuttons
import flippyBg from '../../components/baccarat/flippy_V2';

let links = {
    confirm: `/bet/store/${window.tableNum}/${window.range}`,
    cancel: `/bet/cancel/${window.tableNum}/${window.range}`,
    getDetails: "/details/getDetails",
    videoSetting: "/settings/videoSetting",

    getTransferLogs: '/'+window.tableNum+'/'+window.range+'/'+window.multiplayer+"/transferlogs",
    getBetLogs: '/'+window.tableNum+'/'+window.range+'/'+window.multiplayer+"/betlogs",
    getGameHistory: '/'+window.tableNum+'/'+window.range+'/'+window.multiplayer+"/gamehistory"
}

let log_type = window.t_type == "flippy" ? "f" : "r";
// let socket  =  io.connect(window.socket + "Baccarat/"+window.tableNum, {transports: ['websocket']});
let tableSlave = window.slave =='' ? 'normal' : window.slave; //getSlaveParam(window.slave != "" ? window.slave : 'normal')?window.slave:'normal';
let initData = {
    userId : window.userId,
    range : window.range,//(getSlaveParam(tableSlave))?window.range+'_'+window.slave:window.range,
    userName : window.user_name,
    vendor_id : window.vendor_id,
    token : window.vendorData ? window.vendorData.token : '',
    vendorEndDate: window.vendorEndDate
}

let win_suits = [];
if (tableSlave == 'supersix') {
    win_suits = ["supersix_win","supersix_win","supersix_win","supersix_win","supersix_win","supersix_win","supersix_win","supersix_win"];
}
else {
    win_suits = ["win_heart","win_clubs","win_spade","win_diamond","win_heart","win_clubs","win_spade","win_diamond"];
}


export default new blu.Screen({
    resources: "/assets_mobile.json",

    component_menuEvents: menuEvents(),
    component_menuSettingsEvents : menuSettingsEvents(),
    component_junketEvents: junketEvents(),
    component_balanceBet: balanceBet(),
    component_toggle : toggle(),
    component_lines : lines(),

    component_chips: chips(opposite_bet),
    component_betBoard: bet_board(),
    component_gameInfo: gameInfo(),
    component_scoreBoard: scoreboard(),
    component_gameButtons: game_buttons(links),
    component_playerInfo: player_info(),
    component_betDetails: bet_details(),
    component_timer : timer(),
    component_messages: messages(),
    component_card_result: card_result(),
    component_fake_cardResult: fake_card_result(),
    component_channel: channel(),
    component_dealer : dealer(),
    component_dealer_data : dealer_data(),
    component_roadmap: roadmap(),
    component_winnings: win_result(win_suits),
    component_announcement : announcement(),

    component_flippyBg : flippyBg(),
    component_roomInfo : roomInfo(),

    component_menu : menu(),
    component_betRecords : menuBetRecords(links),
    component_menuBetData : menuBetData(links),

    component_winning_assets : winning_assets(),
    component_card_result_total : card_extra(),
    component_winAmount: win_amount(),
    component_tableDraw: drawn_table(betboard_config),
    component_tableOutline: tableOutline(),
    // component_firstViewSingle: firstViewSingle(),
    // component_firstViewMultiplayer: firstViewMultiplayer(),
    component_howToPlay : menuHowToPlay(),
    component_menuPlayerInfo : menuPlayerInfo(),
    component_menuChips : menuChips(),
    component_settings : menuSettings(),
    component_transfer : menuTransfer(),
    component_betindicator: bet_indicator(),

    component_multiplayer : multiplayer(opposite_bet),
    // component_ingameOverlay : ingame_overlay(),
    component_ingameTutorial : ingame_tutorial(),
    component_burnCard : burn_card(),


    component_winChips : winChips(),

    multiplayer : false,
    confirm_failed : false,
    actions : [],
    is_repeat : 0,
    currentLog : null,
    junketAgent: window.junket == 2 ? true : false,
    mobile: true,
    success_bet : [],

    theme_color: theme_config(),
    chipsMultiplier : window.currencyAbbrev === "PTS" ? 1 : 1,
    detectmob() {
        if ( navigator.userAgent.match(/Android/i)) {
            return 'Android';
        } else if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
            return 'iPhone';
        } else {
            return 'none';
        }
    },
    controllermute(muteString) {
        if (window.nonInstall) return;

        var mobileString = this.detectmob();

        if (mobileString == 'Android') {
            if (typeof Android !== "undefined" && Android !== null) {
                Android.volumeMuteController(muteString);
            }
        } else if (mobileString == 'iPhone') {
            var mobileString = this.detectmob();
            try {
                window.webkit.messageHandlers.observe.postMessage(`nihmutebutton,${muteString},`);
            } catch(e) {
                // not using ios device
            }
            document.location = 'nihmutebutton://bluefrog?mute=' + muteString;
       } else{

       }
    },

    init () {
        this.stage.resize(window.innerWidth, window.innerHeight);

        if (window.nonInstall) return;
        this.controllermute(1)
        // loading_init(this);
    },
    loading: function(e) {
        // load(e,this);
        $(".card--percent").html("" + Math.round((e * 100)) + "%")
    },
    chip_names : [
      "single_chip_1",
      "single_chip_3",
      "single_chip_5",
      "single_chip_10",
      "single_chip_30",
      "single_chip_50",
      "single_chip_100",
      "single_chip_200",
      "single_chip_300",
      "single_chip_500",
      "single_chip_1000",
      "single_chip_max"
    ],
    chipval : {
        'PTS': [ '1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000', 'max' ],
        'USD': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ],
        'KRW': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ],
        'CNY': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ],
        'IDR': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ],
        'JPY': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ],
        'default': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ]
    },
    main() {
        this.chipsConf = [];

        this.chip_names.forEach((chip, index) => {
            this.chipsConf.push({
                chipName : chip,
                chipval : this.chipval[window.currencyAbbrev] === undefined ? this.chipval.default[index] : this.chipval[window.currencyAbbrev][index]
            });
        });

        $(".wrapper").hide()
        // $("body").css("background","none");
        // $("html").css("background","none");

        var mobileString = this.detectmob();

        try {
            if(mobileString == 'iPhone') window.webkit.messageHandlers.observe.postMessage('nihstartbutton,');
        } catch(e) {
            // not using ios device
        }

        $(".fpf-overlay").css({
            'width' : document.getElementById("SUPER-CONTAINER").getBoundingClientRect().width/2
        })

        /*** flippy preload **/
        let queue = new createjs.LoadQueue(true);
        queue.loadManifest([
            "/img/cards/back-banker.png",
            "/img/cards/back-player.png",
            "/img/cards/0000.png",
            "/img/cards/0001.png",
            "/img/cards/0002.png",
            "/img/cards/0003.png",
            "/img/cards/0004.png",
            "/img/cards/0005.png",
            "/img/cards/0006.png",
            "/img/cards/0007.png",
            "/img/cards/0008.png",
            "/img/cards/0009.png",
            "/img/cards/0010.png",
            "/img/cards/0011.png",
            "/img/cards/0012.png",
            "/img/cards/0013.png",
            "/img/cards/0014.png",
            "/img/cards/0015.png",
            "/img/cards/0016.png",
            "/img/cards/0017.png",
            "/img/cards/0018.png",
            "/img/cards/0019.png",
            "/img/cards/0020.png",
            "/img/cards/0021.png",
            "/img/cards/0022.png",
            "/img/cards/0023.png",
            "/img/cards/0024.png",
            "/img/cards/0025.png",
            "/img/cards/0026.png",
            "/img/cards/0027.png",
            "/img/cards/0028.png",
            "/img/cards/0029.png",
            "/img/cards/0030.png",
            "/img/cards/0031.png",
            "/img/cards/0032.png",
            "/img/cards/0033.png",
            "/img/cards/0034.png",
            "/img/cards/0035.png",
            "/img/cards/0036.png",
            "/img/cards/0037.png",
            "/img/cards/0038.png",
            "/img/cards/0039.png",
            "/img/cards/0040.png",
            "/img/cards/0041.png",
            "/img/cards/0042.png",
            "/img/cards/0043.png",
            "/img/cards/0044.png",
            "/img/cards/0045.png",
            "/img/cards/0046.png",
            "/img/cards/0047.png",
            "/img/cards/0048.png",
            "/img/cards/0050.png",
            "/img/cards/0051.png",

            "/img/cards/hidden/0000.png",
            "/img/cards/hidden/0001.png",
            "/img/cards/hidden/0002.png",
            "/img/cards/hidden/0003.png",
            "/img/cards/hidden/0004.png",
            "/img/cards/hidden/0005.png",
            "/img/cards/hidden/0006.png",
            "/img/cards/hidden/0007.png",
            "/img/cards/hidden/0008.png",
            "/img/cards/hidden/0009.png",
            "/img/cards/hidden/0010.png",
            "/img/cards/hidden/0011.png",
            "/img/cards/hidden/0012.png",
            "/img/cards/hidden/0013.png",
            "/img/cards/hidden/0014.png",
            "/img/cards/hidden/0015.png",
            "/img/cards/hidden/0016.png",
            "/img/cards/hidden/0017.png",
            "/img/cards/hidden/0018.png",
            "/img/cards/hidden/0019.png",
            "/img/cards/hidden/0020.png",
            "/img/cards/hidden/0021.png",
            "/img/cards/hidden/0022.png",
            "/img/cards/hidden/0023.png",
            "/img/cards/hidden/0024.png",
            "/img/cards/hidden/0025.png",
            "/img/cards/hidden/0026.png",
            "/img/cards/hidden/0027.png",
            "/img/cards/hidden/0028.png",
            "/img/cards/hidden/0029.png",
            "/img/cards/hidden/0030.png",
            "/img/cards/hidden/0031.png",
            "/img/cards/hidden/0032.png",
            "/img/cards/hidden/0033.png",
            "/img/cards/hidden/0034.png",
            "/img/cards/hidden/0035.png",
            "/img/cards/hidden/0036.png",
            "/img/cards/hidden/0037.png",
            "/img/cards/hidden/0038.png",
            "/img/cards/hidden/0039.png",
            "/img/cards/hidden/0040.png",
            "/img/cards/hidden/0041.png",
            "/img/cards/hidden/0042.png",
            "/img/cards/hidden/0043.png",
            "/img/cards/hidden/0044.png",
            "/img/cards/hidden/0045.png",
            "/img/cards/hidden/0046.png",
            "/img/cards/hidden/0047.png",
            "/img/cards/hidden/0048.png",
            "/img/cards/hidden/0050.png",
            "/img/cards/hidden/0051.png"
            ]
        );


        queue.on("complete", ()=>{

        })

        listen(this);

        createjs.MotionGuidePlugin.install(createjs.Tween);

        let self = this;
        this.controllermute(0)

        this.addComponent(this.component_toggle);
        this.addComponent(this.component_tableOutline);
        this.addComponent(this.component_channel);
        this.component_channel.visible = false;
        
        this.addComponent(this.component_tableDraw);
        this.addComponent(this.component_multiplayer);

        this.component_tableDraw.bet_areas.push(...this.component_multiplayer.bet_areas);
        this.addComponent(this.component_betBoard);

        this.addComponent(this.component_winChips);

        this.component_betBoard.addChild(
            this.component_tableDraw.classic_outline,
            this.component_tableDraw.supersix_outline,
            this.component_tableDraw.classic_outline_landscape,
            this.component_tableDraw.supersix_outline_landscape,
            this.component_multiplayer.classicMulti_outline,
            this.component_multiplayer.superMulti_outline,
        );

        this.component_tableDraw.addChild(
            this.component_toggle.supersixIndicator,
            this.component_toggle.classicIndicator
        );

        this.addComponent(this.component_betindicator);
        this.addComponent(this.component_betDetails);
        this.component_card_result_total.visible = false;

        this.addComponent(this.component_roomInfo);

        this.addComponent(this.component_scoreBoard);
        this.addComponent(this.component_winning_assets);
        this.addComponent(this.component_winnings);

        this.addComponent(this.component_menu);
        this.component_menu.visible = false;
        this.addComponent(this.component_menuEvents);
        this.addComponent(this.component_menuSettingsEvents);

        this.addComponent(this.component_menuPlayerInfo);
        this.component_menuPlayerInfo.visible = false;
        this.addComponent(this.component_dealer);
        this.component_dealer.visible = false;
        this.addComponent(this.component_dealer_data);
        this.component_dealer_data.visible = false

        this.addComponent(this.component_messages);

        this.addComponent(this.component_gameInfo);
        this.addComponent(this.component_ingameTutorial);
        this.addComponent(this.component_gameButtons);
        this.addComponent(this.component_timer);
        this.addComponent(this.component_playerInfo);
        this.component_playerInfo.visible = false;

        this.addComponent(this.component_chips);
        this.addComponent(this.component_roadmap);

        this.addComponent(this.component_lines);

        this.addComponent(this.component_card_result_total);
        this.addComponent(this.component_card_result);

        this.addComponent(this.component_menuBetData);
        this.addComponent(this.component_betRecords);
        this.addComponent(this.component_howToPlay);
        this.addComponent(this.component_transfer);
        this.addComponent(this.component_settings);
        this.addComponent(this.component_winAmount);
        this.addComponent(this.component_fake_cardResult);

        this.addComponent(this.component_flippyBg);

        this.addComponent(this.component_announcement);
        this.addComponent(this.component_burnCard);

        this.addComponent(this.component_menuChips);

        this.addComponent(this.component_junketEvents);
        this.addComponent(this.component_balanceBet);

        this.isBalance = false;
        if (window.junket && !_.isEmpty(window.vendorData)) {
            this.component_betBoard.visible = false;

            this.socket.emit('data', { eventName: 'get_junket_room', token: window.vendorData.token }, (data) => {
                let slaveButton;
                let betInfo = null;
                console.log(data, "data onn receive")
                if (data == 'no data sent') {
                    console.error('Data sent from socket error.');
                    return;
                } else {
                    for(var key in data) {
                        
                        betInfo = data[key].betInfo;

                        window.slave = data[key].slave;
                        if (data[key].slave == 'supersix') {
                            slaveButton = 'supersixButton';
                        } else {
                            slaveButton = 'classicButton';
                        }

                        if(data[key].balance && data[key].balance != 0) {
                            this.isBalance = true;
                        }
                    }
                }

                console.log(betInfo, ":::::::::BETINFO", this.isBalance)
                //balance bet
                if(window.junket > 0 && this.isBalance) {
                    $(".balancebet-con").addClass('-active');
                    if(this.junketAgent) $(".junket-body-info.-junket-toggle").addClass('balance-bet-active');
                    $(".tutorial-items.-balancebet").show();      
                    if(window.tutorial_enabled) {
                        this.component_channel.infoToggle(true)           
                    }       
                }
                
                this.toggleBet(); //sets position of betboard
                this.betAreaVisibility(); //sets visible areas/landscape portrait
                this.component_toggle.screenOrientation(); //positions of outlines
                this.component_multiplayer.screenOrientation(); //rendering multiplayer areas
                this.component_multiplayer.toggleMulti(); //rendering multiplayer areas

                this.component_betBoard.visible = true;
                this.component_junketEvents.setCountdown(data);

                //balance bet
                this.component_balanceBet.initData(betInfo);
                this.toggleSlaveDisp();
            });
        }
        this.socket.on("disconnect",()=> {
            this.connect();
        });
        this.toggleBet();
        this.room_bets = [];
        this.connect();

        // === New video for non-install version
        function getOS() {
          var userAgent        = window.navigator.userAgent,
          platform         = window.navigator.platform,
          macosPlatforms   = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
          windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
          iosPlatforms     = ['iPhone', 'iPad', 'iPod'],
          os               = null;

          if (macosPlatforms.indexOf(platform) !== -1) {
            os = 'MacOS';
          } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = 'iOS';
          } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = 'Windows';
          } else if (/Android/.test(userAgent)) {
            os = 'Android';
          } else if (!os && /Linux/.test(platform)) {
            os = 'Linux';
          }
          return os;
        }

        if (getOS() == "iOS" && window.nonInstall) {
          $('#popup-enable-sound').show();
          $('#popup-enable-sound').off().on('click', () => {
            $('#popup-enable-sound').hide();
            window.config.effect = 1;
            playSound("welcome");

            this.component_settings.enableSetting(0);
          });
        } else {
          setTimeout(() => {
            playSound("welcome");
          }, 2000);
        }

        if (window.nonInstall) {
          if (getOS() == "Android") {
            $('#popup-gofullscreen').show();
          }

        }
        $('#vidCanvas').show();
        this.setVideo(window.config.video);
        // === New video for non-install version
    
        window.addEventListener("resize", function() {
          self.adjustScreen();
        });
        this.adjustScreen();

        if(window.junket && !_.isEmpty(window.vendorData) ) {
            $("#range-disp.-landscape, #range-disp.-portrait").addClass(`disabled`);
        }

        $("#range-disp.-landscape, #range-disp.-portrait").on('click', function () {
          if(window.junket && !_.isEmpty(window.vendorData)) return;
          console.log("display range", $('#range-list ul').children().length);
          if($('#range-list').is(':visible')) {
            $('#range-list').animate({'height':'0'},{
              duration : 200,
              complete : function () {
                $('#range-list').hide()
              }
            });
            // $(this).addClass('active');
            $(this).removeClass('active');
          } else {
            $('#range-list').show();
            $('#range-list').animate({'height': $('#range-list ul').children().length *60 + 'px'},200);
            $(this).addClass('active');
            // $(this).removeClass('active');
          }
        });

        $(".range-select").on('click', function () {
          if(_.find(self.component_betBoard.bet_areas, function(area) {return area.chips.length}) !== undefined) {
            self.component_messages.setMessage(window.language2.com_sub_ingameprompts_unabletochange, 1);
            return;
          }

          $(".channel-con.-betrange > span").removeClass('active');
          $('.range-select').removeClass('selected');

          let range = $(this).attr('data');
          links.confirm = `/bet/store/${window.tableNum}/${range}`;
          links.cancel = `/bet/cancel/${window.tableNum}/${range}`;
          self.toggleRange(range);

          $('#range-list').animate({'height':'0'},{
            duration : 200,
            complete : function () {
              $('#range-list').hide()
            }
          });

          $(".channel-con.-betrange").removeClass('active')

          // Change text range
          $(this).addClass('selected');
          let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;

          let mainAreaMin = (parseInt($(this).attr('data').split('-')[0]) * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          let mainAreaMax = ((parseInt($(this).attr('data').split('-')[1]) * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

          if (mainAreaMin > 999999) {
            mainAreaMin = `${mainAreaMin / 1000000}M`;
          }else if (mainAreaMin > 999) {
            mainAreaMin = `${mainAreaMin / 1000}K`;
          }

          if (mainAreaMax > 999999) {
            mainAreaMax = `${mainAreaMax / 1000000}M`;
          }else if (mainAreaMax > 999) {
            mainAreaMax = `${mainAreaMax / 1000}K`;
          }

          $('#range-disp.-landscape, #range-disp.-portrait').html(`${mainAreaMin} - ${mainAreaMax}`);
        });
    },
    toggleRange(range) {
        $.post("/setGameSettings", {range : range, game: `Baccarat/${window.tableNum}`});

        this.socket.emit('data', {
            eventName: 'edit-bet-range',
            oldRange : initData.range,
            userId: window.userId
        })
        initData.range = range;
        this.component_toggle.toggleRange(range); //changing bet range amt for each areas
        this.component_betBoard.clearTableChipBets();
        this.socket.disconnect();
        this.socketAll.disconnect();
        window.socketConnect(this);
        this.connect();
    },
    setCardPositions () {
        let stageWidth = this.stage.canvas.width;
        let stageHeight = this.stage.canvas.height;
        var positions = {
          player: [{
            x: (this.stage.baseWidth/2) - (200+50),
            y: this.stage.baseHeight - 115,
            rot : 0
          },{
            x: (this.stage.baseWidth/2) - (290+50),
            y: this.stage.baseHeight - 115,
            rot : 0
          },{
            x: (this.stage.baseWidth/2) - (440+50),
            y: this.stage.baseHeight - 55,
            rot : -90
          }],
          banker: [{
            x: (this.stage.baseWidth/2) + (200+50),
            y: this.stage.baseHeight - 115,
            rot : 0
          },{
            x: (this.stage.baseWidth/2) + (290+50),
            y: this.stage.baseHeight - 115,
            rot : 0
          },{
            x: (this.stage.baseWidth/2) + (440+50),
            y: this.stage.baseHeight - 55,
            rot : 90
          }]
        }
        if(this.portrait) {
            let startX = (stageWidth/2) - 140;
            positions.player[0].x = startX;
            positions.player[1].x = startX - (75 * 0.94) - 7;
            positions.player[2].x = startX - ((100 * 0.94) *2) - 26;

            startX = (stageWidth/2) + 140;
            positions.banker[0].x = startX;
            positions.banker[1].x = startX + (75 * 0.94) +  7;
            positions.banker[2].x = startX + ((100 * 0.94)*2) + 26;

            positions.banker[0].y = positions.banker[1].y = positions.banker[2].y =  this.stage.baseWidth - 165;
            positions.player[0].y = positions.player[1].y = positions.player[2].y =  this.stage.baseWidth - 165;

            positions.player[2].y += 57
            positions.banker[2].y += 57
        }

        for(var key in positions) {
            for(var x = 0; x< positions[key].length;x++) {
              if(this.component_card_result[key]) {
                if(!this.component_card_result[key][x]) continue;
                this.component_card_result[key][x].x = positions[key][x].x;
                this.component_card_result[key][x].y = positions[key][x].y;
                this.component_card_result[key][x].rotation = positions[key][x].rot;
              }
            }
          }
    },
    adjustScreen () {
        this.portrait = window.innerHeight > window.innerWidth ? true : false;
        this.component_betDetails.screenOrientation();
        this.component_lines.screenOrientation();
        this.component_gameButtons.screenOrientation();
        this.component_chips.screenOrientation();
        this.component_roadmap.screenOrientation();
        this.component_card_result_total.screenOrientation();
        this.component_timer.screenOrientation();
        this.component_channel.screenOrientation();

        this.component_menuChips.screenOrientation();
        this.component_winnings.screenOrientation();
        this.component_tableDraw.screenOrientation()
        this.component_messages.screenOrientation();
        this.component_winAmount.screenOrientation();
        this.component_toggle.screenOrientation();
        this.component_ingameTutorial.screenOrientaion();
        this.component_betRecords.screenOrientation();
        this.component_junketEvents.screenOrientation();
        this.component_multiplayer.screenOrientation();
        this.component_balanceBet.screenOrientation();

        this.setCardPositions();

        let div = document.getElementById('SUPER-CONTAINER');
        console.log(div.style, "sakdljslsadja")
        var scale = parseFloat(div.style.transform.split('(')[1].split(')')[0]);

        $("#flippy-wrap").css({
            width: `${$("#SUPER-CONTAINER").width() * scale}px`,
            height: `${$("#SUPER-CONTAINER").height() * scale}px`
        })

        if(this.portrait) {
            $("#flippy-wrap").addClass('mobile--portrait');
            $("#flippy-wrap").removeClass('mobile--landscape');

            /** junket */
            $(".junket-con").addClass('-portrait');
        } else {
            $("#flippy-wrap").removeClass('mobile--portrait');
            $("#flippy-wrap").addClass('mobile--landscape');
            /** junket */
            $(".junket-con").removeClass('-portrait');
        }

      //show hide table based
      this.betAreaVisibility();

      console.log(this.component_multiplayer.superMulti_outline, "atayaaaa")
    },
    betAreaVisibility () {
      for(var x = 0; x < this.component_betBoard.bet_areas.length; x++) {
        //portrait visibiliy
        for(var i = 0;i < this.component_betBoard.bet_areas.length; i++) {
            let area = this.component_betBoard.bet_areas[i];
            if(this.portrait && area.portrait) area.visible = true;
            if(!this.portrait && area.portrait) area.visible = false;

            if(!this.portrait && !area.portrait) area.visible = true;
            if(this.portrait && !area.portrait) area.visible = false;

            if(area.balanceBet) area.visible = false;
            if(this.isBalance && area.portrait) area.visible = false;
            if(area.balanceBet && this.isBalance && this.portrait) area.visible = true;
        }
      }
    },
    connect () {

        let emit = 'room';
        if(window.junket != 0 && !_.isEmpty(window.vendorData)) {
            emit = 'join_junket_room';
        }
        this.socket.emit('data', { eventName :emit, data: initData }, (d) => {
            console.log('join response::', d);
            if (d == 'room not found') {
              if(window.lobby_type == 'integrated'){
                window.location = window.lobby_redirect_url;
              } else {
                window.location = window.lobby_domain;
              }
            }
            
            d = JSON.stringify(d);
            d = JSON.parse(d);


            if(window.junket != 0 && !_.isEmpty(window.vendorData)) {
               if(_.isEmpty(d.roomates) && d.users) {
                    d.roomates = [];
                    for(var key in d.users) {
                        if(typeof d.users[key] === 'string') {
                            let user = JSON.parse(d.users[key]);
                            d.roomates.push(user)
                        } else {
                            let user = d.users[key];
                            d.roomates.push(user)
                        }
                    }
               }
            }

            // d.roomates = _.filter(d.roomates, (e) => {
            //     return e.name != window.user_name
            // })

            d.roomates.forEach((e) => {
                e.name = e.userName;
                e.id = e.userId;
            });

            if(window.junket && !_.isEmpty(window.vendorData)) {
                // set for junket
                let junketRoomates  = _.filter(d.roomates, (e) => {
                    return e.id != window.vendorData.bankerId
                });

                //checking all the roomates in room excluding myself if exceed limit
                if(_.filter(junketRoomates, function (e) {return e.id != window.userId}).length >=7 && window.vendorData.bankerId != window.userId) {
                    $(".junket-confirm").show();
                    $(".mdl_message").html('The room you entered is full. You will be redirected to lobby.')
                    $(".mdl_btn").hide();
                    $(".mdl_lobby").show();

                    let redirectTo = this.mobile ? window.lobby_domain+'m?game=true' : window.lobby_domain;
                    if (window.nonInstall) redirectTo = window.lobby_domain+'non?game=true';

                    $(".mdl_lobby").on("click", function () {
                        window.location.href = redirectTo;
                    });

                    setTimeout(() => {
                        window.location.href = redirectTo;
                    }, 5000)

                }

                // this.component_junketEvents.junketUsers = [];

                for(var x = 0; x < junketRoomates.length; x++) {
                    this.component_junketEvents.junketUsers.push({
                        user_id: junketRoomates[x].userId,
                        username: junketRoomates[x].userName,
                        user_money: junketRoomates[x].money ? junketRoomates[x].money : 0,
                        original_bets: 0,
                        original_money: junketRoomates[x].money ? junketRoomates[x].money : 0,
                        user_bets: 0,
                        win_lose: 0
                    })
                }

                this.component_junketEvents.setPlayers();
                 // Player bets
                let total = 0;
                for (var i = 0; i < junketRoomates.length; i++) {
                  if (junketRoomates[i].bets && junketRoomates[i].bets.length > 0) {
                    this.room_bets.push({id: junketRoomates[i].userId, data: _.cloneDeep(junketRoomates[i].bets)});
                    total += _.sumBy(junketRoomates[i].bets);
                  }
                }

                let playerTotal = 0;
                for (var i = 0; i < this.room_bets.length; i++) {
                    for(var e = 0; e < this.room_bets[i].data.length; e++) {
                        let multiplier = this.room_bets[i].data[e].currencyMultiplier;
                        let amt = this.room_bets[i].data[e].bet_amount/( multiplier ? multiplier : 1);
                        amt *= window.currencyMultiplier;
                        console.log(this.room_bets[i].data[e], "check bettsssss", "converted to base:::", amt)
                        playerTotal += amt;
                    }
                }

                playerTotal += _.sumBy(this.component_gameButtons.yourBets, 'amount');
                $("#totalJunketBets").html(numberWithCommas(playerTotal));

                if (this.junketAgent) {
                    let junketUsers = _.map(junketRoomates, function (e) {return e.userId});
                    $.post('/get/users', {vendor_name:window.vendorData.vendorName, users : junketUsers}, (response) => {
                        let data = response;
                        if(typeof data === 'string') {
                            if(data === 'no users') return;
                            data = JSON.parse(data);
                        }
                        for(var x = 0; x < junketRoomates.length; x++) {
                            let user = _.find(data, function (e) { return e.user_name === junketRoomates[x].userName});
                            if(!_.isEmpty(user) && user.user_name === junketRoomates[x].userName) {
                                junketRoomates[x].money = user.credits;
                            }
                        }
                        this.component_junketEvents.init(junketRoomates);
                    });

                    // this.component_junketEvents.init(junketRoomates);
                    setTimeout(() => {
                      this.component_chips.setPlayerBets(this.room_bets);
                      $("#totalJunketBets").html(numberWithCommas(playerTotal));
                    }, 1000)
                }

            }
            

            let filteredRoomates = [];
            if(window.junket && !_.isEmpty(window.vendorData)) {
                filteredRoomates = _.filter(d.roomates, (e) => {
                    return e.id != window.vendorData.bankerId && e.id != window.userId
                });
            } else {
                filteredRoomates = _.filter(d.roomates, (e) => {
                    return e.id != window.userId
                });
            }


            let multiplayerbets = [];
            for(var x = 0; x < filteredRoomates.length; x++) {
                multiplayerbets.push({
                    id : filteredRoomates[x].id,
                    data : _.cloneDeep(filteredRoomates[x].bets)
                })
            }
            this.allMultiplayer_data = multiplayerbets;
            console.log("filteredRoomates filteredRoomates",filteredRoomates)
            this.component_multiplayer.setPlayerBets(_.cloneDeep(filteredRoomates))

            ///for  my user
            let user = _.filter(d.roomates, (e) => {
                return e.userId == window.userId
            });

            if(!user.length) return;

            this.component_gameButtons.is_confirmed_bet = true;

            let data = [];

            this.saved_bets = _.filter(user[0].bets, { 'slave' : tableSlave });

            let total_bet_amt = 0;

            this.saved_bets.forEach( (row) => {
                data.push({
                    amount : row.bet_amount,
                    table_id : row.bet
                });

                total_bet_amt += row.bet_amount;

                this.component_chips.actions.push({

                    chip_amount_used: row.bet_amount,
                    drop_area: _.filter(this.component_betBoard.bet_areas, (e) => {
                        if(e.table_name == row.bet)  {
                            return e
                        }
                    })[0]

                });
            });

            this.component_betDetails.bet_amount = total_bet_amt;
            this.component_betDetails.reinit();

            this.component_gameButtons.previousBet = data;
            this.component_gameButtons.repeatBet(true, true);

            if (this.component_gameButtons.previousBet) {
                this.component_chips.chipWrap.visible = false;
            }
        });
        
        this.multiplayer_data = {};
        this.allMultiplayer_data = [];

        this.socket.on("multi-player", (data) => {
            data = Xpacket.received(data)

            this.multiplayer_data = _.cloneDeep(data);

            switch(data.type) {
                case "bet" :
                    // console.log("received betdata", data)
                    // if(data.id == window.userId) {
                    //     let total = 0;
                    //     let bets = [];
                    //     let actions = [];

                    //     for(var x = 0; x < data.data.length;x++) {
                    //         total += data.data[x].bet_amount;

                    //         if(tableSlave == data.data[x].slave)
                    //         {
                    //             actions[x] = {
                    //                 chip_amount_used:data.data[x].bet_amount,
                    //                 drop_area: data.data[x].bet
                    //             }

                    //             bets[x] = {
                    //                 "amount" : data.data[x].bet_amount,
                    //                 "table_id" : data.data[x].bet,
                    //                 "is_confirmed" : true
                    //             }
                    //         }

                    //     }

                    //     //**change bet detaik **//
                    //     this.context.user_money += this.component_betDetails.bet_amount;
                    //     this.context.user_money -= total;
                    //     this.component_betDetails.bet_amount = total;
                    //     this.component_betDetails.reinit(false);

                    //     this.component_chips.actions = actions;

                    //     this.component_gameButtons.yourBets = bets;
                    //     this.component_gameButtons.previousBet = bets;

                    //     this.component_timer.removeUnconfirmedChips();
                    //     this.component_gameButtons.repeatBet();

                    //     this.component_betBoard.bet_areas.forEach(function(betarea) {
                    //         betarea.chips = _.filter(betarea.chips, function(e) { e.confirmed_bet = true; return e; });
                    //     });

                    //     this.component_gameButtons.checkButtonState();
                    //     this.user_no_bet_count = 0;

                    //    // this.component_tableDraw.redrawChips();
                    //    this.toggleView();
                    // }


                    // if(parseInt(window.multiplayer)) {
                    //     this.component_multiplayer.setMultiplayer(_.cloneDeep(data));
                    //     this.component_firstViewMultiplayer.setMultiplayer(_.cloneDeep(data));
                    // }
                    /** for JUNKET */

                    if(window.junket != 0) {

                        //multiplayer junket
                        this.component_multiplayer.setMultiplayer(this.multiplayer_data)
                        //end of mutiplayer junket

                        let duplicate = false;
                        let playerTotal = 0;
                        if(this.junketAgent) playerTotal = 0;

                        for (var i = 0; i < this.room_bets.length; i++) {
                            if (parseInt(this.room_bets[i].id) == parseInt(data.id)) {
                                this.room_bets[i] = _.cloneDeep(data);
                                duplicate = true;
                            }
                        }

                        if (duplicate === false) {
                            this.room_bets.push(_.cloneDeep(data));
                        }

                        for (var i = 0; i < this.room_bets.length; i++) {
                            for(var e = 0; e < this.room_bets[i].data.length; e++) {
                                let multiplier = this.room_bets[i].data[e].currencyMultiplier;
                                let amt = this.room_bets[i].data[e].bet_amount/( multiplier ? multiplier : 1);
                                amt *= window.currencyMultiplier;
                                playerTotal += amt;
                            }
                        }

                        playerTotal += _.sumBy(this.component_gameButtons.yourBets, 'amount');
                        $("#totalJunketBets").html(numberWithCommas(playerTotal));

                        if(this.junketAgent) {
                            this.component_chips.setPlayerBets(_.cloneDeep(this.room_bets));
                        }

                        for(var x = 0; x < this.component_junketEvents.junketUsers.length; x++) {
                            if(this.component_junketEvents.junketUsers[x].user_id == data.id) {
                                console.log(data.data, "FOR AGENT checking")
                                let amt = 0;
                                let playerTotal = 0;
                                for(var e = 0; e < data.data.length; e++) {
                                    let multiplier = data.data[e].currencyMultiplier;
                                    let amt = data.data[e].bet_amount/( multiplier ? multiplier : 1);
                                    amt *= window.currencyMultiplier;
                                    playerTotal += amt;
                                }

                                this.component_junketEvents.junketUsers[x].user_bets = this.component_junketEvents.junketUsers[x].original_bets + playerTotal;
                                this.component_junketEvents.junketUsers[x].user_money = this.component_junketEvents.junketUsers[x].original_money - playerTotal;
                                this.component_junketEvents.junketUsers[x].isBetting = true;
                            }
                        }

                        this.component_junketEvents.setPlayers();


                        //for balance bet
                        this.component_balanceBet.setBets(data.data, 'bet')
                        console.log(data, "::::::na receive")
                    }
                    break;
                case "join" :
                    console.log('join', data)
                    /** JUNKET */
                    if (window.junket != 0 && !_.isEmpty(window.vendorData) && window.vendorData.token == data.data.token) {

                        //multiplauer junket
                        this.component_multiplayer.roomEvent(this.multiplayer_data);
                        // end of multiplayer junket
                        
                        let joinFlag = false;
                        for (var i = 0; i < this.component_junketEvents.junketUsers.length; i++) {
                          if (this.component_junketEvents.junketUsers[i].user_id == data.data.userId) joinFlag = true;
                        }

                        if (joinFlag === false) {

                            if(this.junketAgent) {
                                let joinedUser = [{
                                    'userId': data.data.userId,
                                    'userName': data.data.name,
                                    'money': data.data.money ? data.data.money : 0,
                                    original_money : data.data.money ? data.data.money : 0,
                                    original_bets : 0
                                }]
                                this.component_junketEvents.init(joinedUser);

                                let playerTotal = 0;
                                for (var i = 0; i < this.room_bets.length; i++) {
                                    for(var e = 0; e < this.room_bets[i].data.length; e++) {
                                        let multiplier = this.room_bets[i].data[e].currencyMultiplier;
                                        let amt = this.room_bets[i].data[e].bet_amount/( multiplier ? multiplier : 1);
                                        amt *= window.currencyMultiplier;
                                        console.log(this.room_bets[i].data[e], "check bettsssss", "converted to base:::", amt)
                                        playerTotal += amt;
                                    }
                                }
                                playerTotal += _.sumBy(this.component_gameButtons.yourBets, 'amount');
                                setTimeout(()=>{
                                    console.log(this.component_junketEvents.junketUsers, "agent checking")
                                    $("#totalJunketBets").html(numberWithCommas(playerTotal));
                                }, 1000)

                            } else {

                                this.component_junketEvents.junketUsers.push({
                                    user_id: data.data.userId,
                                    username: data.data.name,
                                    user_money: data.data.money ? data.data.money : 0,
                                    original_money: data.data.money ? data.data.money : 0,
                                    user_bets: 0,
                                    original_bets: 0,
                                    win_lose: 0
                                });

                                this.component_junketEvents.setPlayers();
                            }

                        }
                    }
                    break;
                case "cancel" :

                        // if(data.id == window.userId) {
                        //     this.component_betBoard.bet_areas.forEach(function(betarea) {
                        //         betarea.chips = _.filter(betarea.chips, function(e) { e.confirmed_bet = false; return e; });
                        //     });

                        //     this.component_gameButtons.previousBet = _.filter(this.component_gameButtons.previousBet, (e) => {
                        //         e.is_confirmed = false;
                        //         return e;
                        //     });

                        //     this.component_gameButtons.responseClear();
                        //     this.component_gameButtons.checkButtonState();

                        //     // this.component_firstViewMultiplayer.removeAllChips();
                        // }

                        // this.component_multiplayer.cancelBet(data);
                        // this.component_firstViewMultiplayer.cancelBet(data);
                    if(window.junket != 0 && !_.isEmpty(window.vendorData)) {

                        //multiplayer junket
                        this.component_multiplayer.cancelBet(this.multiplayer_data);
                        //end of multiplayer junket

                        let playerTotal = 0;
                        let total = 0;

                        if(this.junketAgent) playerTotal = 0;

                        for (var i = 0; i < this.room_bets.length; i++) {
                          if (parseInt(this.room_bets[i].id) === parseInt(data.id)) {
                            for(var e = 0; e < this.room_bets[i].data.length; e++) {
                                let multiplier = this.room_bets[i].data[e].currencyMultiplier;
                                let amt = this.room_bets[i].data[e].bet_amount/( multiplier ? multiplier : 1);
                                amt *= window.currencyMultiplier;
                                total += amt;
                            }
                            this.room_bets.splice(i, 1);
                          }
                        }

                        for (var i = 0; i < this.room_bets.length; i++) {
                            playerTotal += _.sumBy(this.room_bets[i].data, 'bet_amount');
                            for(var e = 0; e < this.room_bets[i].data.length; e++) {
                                let multiplier = this.room_bets[i].data[e].currencyMultiplier;
                                let amt = this.room_bets[i].data[e].bet_amount/( multiplier ? multiplier : 1);
                                amt *= window.currencyMultiplier;
                                playerTotal += amt;
                            }
                        }

                        playerTotal += _.sumBy(this.component_gameButtons.yourBets, 'amount');
                        $("#totalJunketBets").html(numberWithCommas(playerTotal));

                        for(var x = 0; x < this.component_junketEvents.junketUsers.length; x++) {
                            if(this.component_junketEvents.junketUsers[x].user_id == data.id) {
                                this.component_junketEvents.junketUsers[x].user_bets -= total;
                                this.component_junketEvents.junketUsers[x].user_money += total;
                                this.component_junketEvents.junketUsers[x].isBetting = false;
                            }
                        }
                        if(this.junketAgent) {
                            this.component_chips.setPlayerBets(this.room_bets);
                        }
                        this.component_junketEvents.setPlayers();

                        //for balance bet
                        this.component_balanceBet.setBets(data.data, 'cancel')
                        console.log(data, "::::::na receive")
                    }
                    break;

                case "leave" :
                    
                    /** JUNKET */
                    let redirectTo = this.mobile ? window.lobby_domain+'m?game=true' : window.lobby_domain;
                    if (window.junket && data.data.id == window.userId) {
                        $('.junket-confirm').show();
                        $('.mdl_message').html(window.language2.com_sub_ingameprompts_expiredroom);
                        $('.mdl_bg.-closeroom').show();
                        $('.mdl_alert_txt').css({'margin-bottom': '17px'});
                        $('.mdl_lobby').html(`<span>${window.language2.com_sub_rooms_confirm}</span>`);
                        $('.mdl_btn').hide();
                        $('.mdl_lobby').show();

                      $('.mdl_lobby').click(function() {
                        if(window.lobby_type == 'integrated'){
                          window.location = window.lobby_redirect_url;
                        } else {
                          window.location = redirectTo;
                        }
                      });

                      setTimeout(() => {
                        if(window.lobby_type == 'integrated'){
                          window.location = window.lobby_redirect_url;
                        } else {
                          window.location = redirectTo;
                        }
                      }, 5000)
                    }

                    if (window.junket != 0 && !_.isEmpty(window.vendorData)) {

                        //multiplauer junket
                        this.component_multiplayer.roomEvent(this.multiplayer_data);
                        // end of multiplayer junket

                        _.remove(this.component_junketEvents.junketUsers, function(e) {
                            return e.user_id == data.data.id && !e.isBetting;
                        });

                        this.component_junketEvents.setPlayers();
                    }
                    break;
                case "kick_all" :
                    if (data.vendorExpired) return;
                    this.isKicked = true;

                    $('.junket-confirm').show();
                    $('.mdl_message').html(window.language2.com_sub_ingameprompts_disableroom);
                    $('.mdl_bg.-closeroom').show();
                    $('.mdl_lobby').html(`<span>${window.language2.com_sub_rooms_confirm}</span>`);
                    $('.mdl_alert_txt').css({'margin-bottom': '17px'});
                    $('.mdl_btn').hide();
                    $('.mdl_lobby').show();

                    $('.mdl_lobby').click(function() {
                        window.location = `${window.bc_domain}${window.tableNum}`;
                    });

                    setTimeout(() => {
                        window.location = `${window.bc_domain}${window.tableNum}`;
                    }, 10000)

                    // let redirectTo = this.mobile ? window.lobby_domain+'m?game=true' : window.lobby_domain+"?game=true";
                    // if (window.nonInstall) redirectTo = window.lobby_domain+'non?game=true';

                    // $('#mdlConfirmation').show();
                    // $('#mdl_kick-con').show();
                    // $('.mdl_msg_bet').show();
                    // $('.mdl_message').css({'padding-top': '15px'});
                    // $('#mdl_gen_message').html('The banker has left the room. You will be\nredirected to the lobby in 10 seconds.')
                    // $('.mdl_btn').hide();
                    // $('.mdl_lobby').show();

                    // $('.mdl_lobby').click(function() {
                    //   if(window.lobby_type == 'integrated'){
                    //         window.location = window.lobby_redirect_url;
                    //   } else {
                    //         window.location = redirectTo;
                    //   }
                    // });

                    // setTimeout(() => {
                    //   if(window.lobby_type == 'integrated'){
                    //         window.location = window.lobby_redirect_url;
                    //   } else {
                    //         window.location = redirectTo;
                    //   }
                    // }, 10000)
                    break;
            }
        });
    },
    logUserMoney : 0,
    actionlogs: [],
    tempLog: [],
    callback(target, type) {

        let comment = '';

        this.actionlogs = [{
          action: type,
          comment: `${comment}`,
          timeDate: this.fnFormatTime(new Date().getTime(), 'MM/dd/yyyy HH:mm:ss'),
          user_money: this.context.user_money
        }];

        switch(type) {
            case 'insert':
                comment =`${target.table_name}, ${this.component_chips.selected_chip.chip_amt}`;
                this.actionlogs[0].comment = comment;
                this.tempLog.push({comment: `${target.table_name}, ${this.component_chips.selected_chip.chip_amt}`});
                this.log()
                break;
            case 'confirm':
                comment = `confirm, ${_.sumBy(this.component_gameButtons.yourBets, 'amount')}`;
                this.actionlogs[0].comment = comment;
                break;
            case 'undo':
                let undoComment = this.tempLog[this.tempLog.length-1].comment;
                this.tempLog.pop();
                this.actionlogs[0].comment = undoComment;
                this.log();
                break;
            case 'clear':
                if(!this.component_gameButtons.yourBets.length) {
                    this.actionlogs = [{
                      action: 'clear'
                    }];
                    this.log();
                } else {
                    comment = `all, ${_.sumBy(this.component_gameButtons.yourBets, 'amount')}`;
                    this.actionlogs[0].comment = comment;

                    console.log("clear actionlogs", this.actionlogs)
                }
                break;
            case 'repeat':
                let rCmt = '';
                for(var x = 0; x < this.component_gameButtons.previousBet.length; x++) {
                    rCmt += `,${this.component_gameButtons.previousBet[x].table_id} ${this.component_gameButtons.previousBet[x].amount}`
                }
                comment = `repeat ${rCmt}`
                this.actionlogs[0].comment = comment;
                this.log();
                break;
        }
    },

    log(d){
        $.post(`/actionlogs/store/${window.tableNum}/${window.range}`, {logs : this.actionlogs, type : 'r'});
    },
    fnFormatTime(time, format) {

        var t = new Date(time);
        var tf = function (i) { return (i < 10 ? '0' : '') + i };

        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
            switch (a) {
              case 'yyyy':
                  return tf(t.getFullYear());
                  break;
              case 'MM':
                  return tf(t.getMonth() + 1);
                  break;
              case 'mm':
                  return tf(t.getMinutes());
                  break;
              case 'dd':
                  return tf(t.getDate());
                  break;
              case 'HH':
                  return tf(t.getHours());
                  break;
              case 'ss':
                  return tf(t.getSeconds());
                  break;
            }
        });
    },

    player_data : {
        total_bets : 0,
        total_win : 0
    },
    actionCallback(type,param) {
        if (!this.component_betBoard.visible) {
            this.component_betBoard.visible = true;
            // this.component_betBoard.flatViewBg.visible = true;
            // if (parseInt(window.multiplayer)) this.component_multiplayer.visible = true;
        }

        this.callback(null, type)


        let range = '';
        let mainarea = _.find(this.component_betBoard.bet_areas, (area) => {
            return area.table_name === 'player';
        });

        range = `${mainarea.min_betAmt}-${mainarea.max_betAmt}`;

        switch(type) {
            case "clear":
                this.current_action = "clear";
                let betAmount = this.component_betDetails.bet_amount;

                let balance = 0;
                
                if(window.junket == 1 && !_.isEmpty(window.vendorData) && this.isBalance) {
                    balance = this.component_balanceBet.currentBalance;
                }

                this.component_gameButtons.process_clear = true;
                $.post(links.cancel, {
                    logs : this.actionlogs,
                    slave: tableSlave,
                    range: range,
                    data: this.component_gameButtons.yourBets,
                    device : 'm',
                    balance_bet : balance,
                }, (response) => {
                    if(this.current_action == "clear") {
                        this.component_chips.actions = [];
                    }

                    if(typeof response === 'string') {
                        response = JSON.parse(response)
                    }

                    // reinit user money
                    if(window.casino == "SS") {
                        this.context.user_money = parseFloat(response.money).toFixed(2);
                    } else {
                        this.context.user_money = parseInt(response.money);
                    }
                    this.component_betDetails.reinit(true)

                    if (parseInt(response.status)) {
                        this.component_gameButtons.process_clear = false;
                        this.component_gameButtons.checkButtonState();

                        this.component_gameButtons.responseClear();

                        this.socket.emit('data', {
                            eventName : 'cancel',
                            gameName: 'Baccarat',
                            tableId: window.tableNum,
                            roundNum: parseInt(this.component_dealer.round_id),
                            data : [{
                                roundNum : parseInt(this.component_dealer.round_id),
                                range : initData.range,
                                name : window.user_name,
                                id : window.userId,
                                slave : tableSlave
                            }]
                        }, function (e) {

                        });

                        if(window.junket != 0 && !_.isEmpty(window.vendorData)) {
                            let playerTotal = 0;
                            for (var i = 0; i < this.room_bets.length; i++) {
                                for(var e = 0; e < this.room_bets[i].data.length; e++) {
                                    let multiplier = this.room_bets[i].data[e].currencyMultiplier;
                                    let amt = this.room_bets[i].data[e].bet_amount/( multiplier ? multiplier : 1);
                                    amt *= window.currencyMultiplier;
                                    playerTotal += amt;
                                }
                            }

                            playerTotal += _.sumBy(this.component_gameButtons.yourBets, 'amount');
                            $("#totalJunketBets").html(numberWithCommas(playerTotal));
                        }
                        //balance bet on cancel
                        this.component_balanceBet.setBets([{id: window.userId}], 'cancel');

                    } else {
                        this.component_gameButtons.process_clear = false;
                        this.component_gameButtons.process_confirm = false;
                        this.component_gameButtons.checkButtonState();

                        this.component_gameButtons.is_clear = false;
                    }
                })
                .fail( (e) => {
                    this.component_gameButtons.is_clear = false;
                    this.component_gameButtons.process_clear = false;
                    this.component_gameButtons.process_confirm = false;
                    this.component_gameButtons.checkButtonState();
                });

                this.logUserMoney = 0;
            break;
            case "undo":
                this.current_action = "undo";
            break;
            case "confirm":
            console.log("confirm confirm confirm", links.confirm, this.component_gameButtons.yourBets)
                this.current_action = "insert";

                this.user_no_bet_count = 0;

                let data = []
                this.component_gameButtons.yourBets.forEach( (row) => {
                    data.push({
                        "roundNum" : this.component_dealer.round_id,
                        "bet_amount" : row.amount,
                        "bet" : row.table_id,
                        "name" : window.user_name,
                        "id" : window.userId,
                        "is_mobile" : this.mobile,
                        'currency' : window.casino,
                        'currencyMultiplier' : window.currencyMultiplier,
                        'userMultiplier' : window.userMultiplier
                    })
                });

                if(this.component_gameButtons.yourBets.length) {

                    this.component_gameButtons.process_confirm = true;

                    let totalBetAmt = _.sumBy(this.component_gameButtons.yourBets, 'amount');
                    let logData = [{'action' : 'confirm', 'comment' : 'total, '+totalBetAmt, 'user_money' : parseInt(this.context.user_money)}];
                    let slaveJson = {
                        'supersix' : 's',
                        'insurance' : 'i',
                        'bonus' : 'b',
                        'normal' : 'r'
                    };
                    let hasSlave = getSlaveParam(tableSlave)?tableSlave:'normal';
                    let slaveParam = slaveJson[this.getSlave()];
                    let roomId = window.junket && !_.isEmpty(window.vendorData) ? window.vendorData.roomId : null;

                    let balance = 0;
                    
                    if(window.junket == 1 && !_.isEmpty(window.vendorData) && this.isBalance) {
                        balance = this.component_balanceBet.currentBalance;
                        console.log(":::balance", balance)
                    }

                    $.post(links.confirm, {
                        data: this.component_gameButtons.yourBets,
                        round_id : this.component_dealer.round_id, 
                        logs : this.actionlogs, 
                        type: log_type, 
                        slave:slaveParam,
                        is_mobile: true,
                        range:range,
                        roomId : roomId, 
                        balance_bet : balance,
                        device : 'm'
                    }, (response) => {
                        // this.component_tableDraw.redrawChips();
                        this.toggleView();

                        if (response.fail && !response.data.length) { //(_.isEmpty(response)) {  //if insert failed

                            this.component_messages.setMessage(window.language.prompts['promptbetfail'+(response.fail == 2 ? '2' : '')], 1);
                            // this.component_firstViewMultiplayer.removeAllChips();
                            // this.component_firstViewSingle.removeAllChips();

                            this.component_gameButtons.previousBet.forEach( (e) => {
                                e.is_confirmed = false
                            })

                            this.confirm_failed = true;
                            this.component_gameButtons.is_confirmed_bet = false;
                            this.component_gameButtons.process_confirm = false;

                            this.component_betBoard.bet_areas.forEach(function(betarea) {
                                for(var a = 0; a< betarea.chips.length; a++) {
                                    betarea.chips[a].confirmed_bet = false;
                                    betarea.chips[a].is_confirmed = false;
                                }
                            });

                            this.context.user_money += this.component_betDetails.bet_amount;
                            this.component_betDetails.bet_amount = 0;

                            this.component_gameButtons.checkButtonState();

                            this.component_chips.actions = [];
                            this.component_timer.removeUnconfirmedChips(true);

                            // reinit user money
                            if(window.casino == "SS") {
                                this.context.user_money = parseFloat(response.money).toFixed(2);
                            } else {
                                this.context.user_money = parseInt(response.money);
                            }
                            this.component_betDetails.reinit(true)

                        }
                        else if(response.fail && response.data.length) { // if inssert failed but with prev bets
                            this.component_messages.setMessage(window.language.prompts.promptaddfail, 1);
                            // this.component_firstViewMultiplayer.removeAllChips();
                            // this.component_firstViewSingle.removeAllChips();

                            this.component_gameButtons.process_confirm = false;
                            let prevBet = [];
                            let tot = 0;

                            let data_2 = [];

                            if(typeof response.data === 'string') {
                                response.data = JSON.parse(response.data)
                            }

                            response.data.forEach((bet) =>{
                                prevBet.push({
                                    'amount' : bet.bet_money,
                                    'table_id' : bet.bet,
                                    'is_confirmed': true
                                }) ;
                                tot += parseInt(bet.bet_money);

                                data_2.push({
                                    "roundNum" : parseInt(this.component_dealer.round_id),
                                    "bet_amount" : bet.bet_money,
                                    "name" : window.user_name,
                                    "id" : window.userId,
                                    "bet" : bet.bet,
                                    "is_mobile" : this.mobile,
                                    'currency' : window.casino,
                                    "slave" : window.slave,
                                    'currencyMultiplier' : window.currencyMultiplier,
                                    'userMultiplier' : window.userMultiplier
                                });
                            });

                            this.socket.emit('data', {
                                eventName : 'bet',
                                data:data_2,
                                gameName: 'Baccarat',
                                tableId: window.tableNum,
                                roundNum: parseInt(this.component_dealer.round_id)
                            } , function (e) {
                            });

                            this.context.user_money += this.component_betDetails.bet_amount;
                            this.component_betDetails.bet_amount = tot;
                            this.context.user_money -= tot;
                            // this.component_betDetails.reinit(true);

                            this.component_gameButtons.previousBet = prevBet;
                            setTimeout(() => {
                                this.component_chips.actions = [];
                                this.component_timer.removeUnconfirmedChips(true);
                            },50)

                            this.component_gameButtons.process_confirm = false;
                            this.component_gameButtons.checkButtonState();

                            this.confirm_failed = false;
                            this.component_gameButtons.bet_saved = true;

                            // reinit user money
                            if(window.casino == "SS") {
                                this.context.user_money = parseFloat(response.money).toFixed(2);
                            } else {
                                this.context.user_money = parseInt(response.money);
                            }
                            this.component_betDetails.reinit(true)

                        }
                        else if (!response.fail && response.data.length) {//(response.length) { // if success
                            let data_2 = [];
                            let total = 0;

                            this.success_bet = [];

                            if(typeof response.data === 'string') {
                                response.data = JSON.parse(response.data)
                            }

                            response.data.forEach((bet) =>{
                                this.success_bet.push({
                                    'amount' : bet.bet_money,
                                    'table_id' : bet.bet,
                                    'is_confirmed': true
                                }) ;

                                 data_2.push({
                                    "roundNum" : parseInt(this.component_dealer.round_id),
                                    "bet_amount" : bet.bet_money,
                                    "name" : window.user_name,
                                    "id" : window.userId,
                                    "bet" : bet.bet,
                                    "is_mobile" : this.mobile,
                                    'currency' : window.casino,
                                    "slave" : window.slave,
                                    'currencyMultiplier' : window.currencyMultiplier,
                                    'userMultiplier' : window.userMultiplier
                                });
                                total += bet.bet_money
                            });

                            this.socket.emit('data', {
                                eventName : 'bet',
                                data: data_2,
                                gameName: 'Baccarat',
                                tableId: window.tableNum,
                                roundNum: parseInt(this.component_dealer.round_id)
                            } , function (e) {
                            });

                            this.component_gameButtons.previousBet = this.success_bet;

                            setTimeout(() => {
                                this.component_chips.actions = [];
                                this.component_timer.removeUnconfirmedChips(true);
                            },50)

                            //**change bet detaik **//
                            this.context.user_money += this.component_betDetails.bet_amount;
                            this.context.user_money -= total;
                            this.component_betDetails.bet_amount = total;
                            // this.component_betDetails.reinit(false);

                            this.component_gameButtons.process_confirm = false;
                            this.component_gameButtons.process_confirm = false;
                            this.component_gameButtons.checkButtonState();

                            this.confirm_failed = false;
                            this.component_gameButtons.bet_saved = true;

                            // reinit user money
                            if(window.casino == "SS") {
                                this.context.user_money = parseFloat(response.money).toFixed(2);
                            } else {
                                this.context.user_money = parseInt(response.money);
                            }
                            this.component_betDetails.reinit(true)
                        }

                        if(window.junket != 0 && !_.isEmpty(window.vendorData)) {
                            let playerTotal = 0;
                            for (var i = 0; i < this.room_bets.length; i++) {
                                for(var e = 0; e < this.room_bets[i].data.length; e++) {
                                    let multiplier = this.room_bets[i].data[e].currencyMultiplier;
                                    let amt = this.room_bets[i].data[e].bet_amount/( multiplier ? multiplier : 1);
                                    amt *= window.currencyMultiplier;
                                    playerTotal += amt;
                                }
                            }

                            playerTotal += _.sumBy(this.component_gameButtons.yourBets, 'amount');
                            $("#totalJunketBets").html(numberWithCommas(playerTotal));

                            //balance bet
                            if(parseInt(response.fail) > 0) return;
                            let bet = _.map(this.component_gameButtons.yourBets, function (e) {
                                return {
                                    bet: e.table_id,
                                    bet_amount  : e.amount,
                                    id : window.userId
                                }
                            })
                            this.component_balanceBet.setBets(bet, 'bet');
                        }
                    })
                     .fail( (e) => {

                        this.component_messages.setMessage(window.language.prompts.promptbetfail, 1);
                        // this.component_firstViewMultiplayer.removeAllChips();
                        // this.component_firstViewSingle.removeAllChips();

                        this.confirm_failed = true;
                        this.component_gameButtons.is_confirmed_bet = false;
                        this.component_gameButtons.process_confirm = false;
                        this.component_gameButtons.process_clear = false;

                        this.component_betBoard.bet_areas.forEach(function(betarea) {
                            for(var a = 0; a< betarea.chips.length; a++) {
                                betarea.chips[a].confirmed_bet = false;
                            }
                        });


                        this.component_gameButtons.previousBet.forEach( (e) => {
                            e.is_confirmed = false
                        })

                        this.success_bet.forEach((e) =>{
                            e.is_confirmed = true
                        })
                        this.component_gameButtons.previousBet = this.success_bet; //replacing success previous chips


                        this.context.user_money += this.component_betDetails.bet_amount;
                        this.component_betDetails.bet_amount = 0;
                        this.component_betDetails.reinit(true);

                        this.component_gameButtons.checkButtonState();
                        // this.component_gameButtons.confirmButton.updateCache();
                    });
                }

                //this.actions = [];
                this.logUserMoney = 0;

                // console.log(":::::: actions", this.actions);

                // $.post(`/betlogs/store/${window.tableNum}/${window.range}`, {logs : this.actions},  (response) => {
                // });
            break;
            case "repeat" :
            this.is_repeat = this.component_gameButtons.previousBet.length;
            this.current_action = "repeat";
                this.component_gameButtons.previousBet.forEach( (e) => {
                    this.component_chips.actions.push({
                        drop_area : e.table_id,
                        chip_amount_used : e.amount
                    })
                })
                // this.component_betBoard.visible = false;
                // this.toggleView();
                break;
        }
    },
    toggleSlaveDisp () {

    },
    toggleBet () {

        if(window.slave === 'supersix') {
            this.component_betBoard.x = this.component_toggle.supersixPosition;
            this.component_toggle.supersixIndicator.fillCmd.style = '#fff';
            this.component_toggle.classicIndicator.fillCmd.style = 'transparent';
        } else {
            this.component_betBoard.x = this.component_toggle.classicPosition;
            this.component_toggle.supersixIndicator.fillCmd.style = 'transparent';
            this.component_toggle.classicIndicator.fillCmd.style = '#fff';
        }
             
        this.component_toggle.lastX = this.component_betBoard.x;
        
    },
    showResult() {
        this.component_card_result_total.visible = true;

        this.component_card_result_total.alpha = 0;
        this.component_card_result.alpha = 0;

        createjs.Tween.get(this.component_card_result_total, {override:true})
        .to({
            alpha : 1
        }, 300)

        createjs.Tween.get(this.component_card_result, {override:true})
        .to({
            alpha : 1
        }, 300)
    },
    hideResult() {

        createjs.Tween.get(this.component_card_result_total, {override:true})
        .to({
            alpha : 0
        }, 300).call((target) =>{
            target.visible = false;
        },[this.component_card_result_total])

        createjs.Tween.get(this.component_card_result, {override:true})
        .to({
            alpha : 0
        }, 300)
    },
    toggleView() {

    },
    endRound () {
        this.component_chips.chips.forEach((chips)=>{
            chips.y = chips.oy;
            chips.shadow = null
        });
    },
    initRound () {

        //balance
        this.component_balanceBet.resetBalanceBet();

        $("#totalJunketBets").html(0);

        /** junket */
        if(window.junket && !_.isEmpty(window.vendorData)) {
            let junketRoomates = [];

            let junketUsers = [];

            this.component_junketEvents.junketUsers.forEach((e) => {
                junketRoomates.push({
                    userId : e.user_id,
                    userName: e.username,
                    money: e.user_money,
                    isBetting: false
                });
                junketUsers.push(e.user_id)
            });

            if(this.junketAgent) {
                $.post('/get/users', {vendor_name:window.vendorData.vendorName, users : junketUsers}, (response) => {
                    let data = response;
                    if(typeof data === 'string') {
                        if(data === 'no users') return;
                        data = JSON.parse(data);
                    }

                    let newRoomates = [];
                    for (var i = 0; i < this.component_junketEvents.junketUsers.length; i++) {
                        for (var x = 0; x < junketRoomates.length; x++) {
                            if (this.component_junketEvents.junketUsers[i].user_id == junketRoomates[x].userId) {
                                newRoomates.push(junketRoomates[x]);
                            }
                        }
                    }

                    for(var x = 0; x < newRoomates.length; x++) {
                        let user = _.find(data, function (e) { return e.user_name === newRoomates[x].userName});

                        console.log("on init round user check:::", user)
                        if(!_.isEmpty(user) && user.user_name === newRoomates[x].userName) {
                            newRoomates[x].money = user.credits;
                        }
                    }

                    this.component_junketEvents.init(newRoomates);
                })
            }
        }

        this.multiplayer_data = {};
        this.allMultiplayer_data = {};
        this.actionlogs = [];
        this.tempLog = [];
        this.success_bet = [];
        this.component_gameButtons.process_confirm = false;
        this.component_gameButtons.process_clear = false;
        this.component_winnings.text_container.removeAllChildren();

        this.confirm_failed = false;

        this.component_gameButtons.previousBet.forEach((e)=>{
            e.is_confirmed = false;
        })

        this.component_betBoard.bet_cnt = 0;
        this.component_winnings.hideResult();
        this.component_multiplayer.reset();


        this.component_gameButtons.previousBet.forEach((e)=>{
            e.is_confirmed = false;
        })

        this.component_gameButtons.previousBet.forEach((e)=>{
            e.is_confirmed = false;
        })

        if(this.component_gameButtons.previousBet.length) {
            this.component_gameButtons.repeatButton.visible = true;
            this.component_gameButtons.undoButton.visible = false;
            this.component_gameButtons.repeatButton.gotoAndStop("up")
        }

        this.component_winnings.visible = false;
        this.component_winnings.animationContainer.visible =false

        delete this.component_card_result.banker;
        delete this.component_card_result.player;

        this.component_betDetails.win_amount = 0;
        this.component_betDetails.bet_amount = 0;
        // this.component_betDetails.reinit(false);

        //this.actions = [];
        this.is_repeat = 0;
        this.current_action = "";

        // === setting visible components on new round
        this.component_betDetails.visible = true;

        this.component_gameButtons.is_confirmed_bet = false;
        this.component_gameButtons.repeat = false;

        this.component_card_result.removeAllChildren();
        this.component_chips.actions = [];
        this.component_chips.chips.forEach((chips)=>{
            chips.y = chips.oy;
            chips.shadow = null
        });

        // this.component_card_result.visible = false;
        this.component_card_result_total.visible = false;

        if(this.component_chips.selected_chip) {
            this.component_chips.selected_chip.shadow = new createjs.Shadow("#fff", 0, 0, 0);
            createjs.Tween.get(this.component_chips.selected_chip.shadow,{loop:true})
            .to({
             blur:20
            },500, createjs.Ease.quadInOut)
            .to({
             blur:0
            },500, createjs.Ease.quadInOut)

            createjs.Tween.get(this.component_chips.selected_chip)
            .to({
             y: this.component_chips.selected_chip.oy - 20
            },150);
        }

        this.component_winning_assets.visible = false;
        this.component_winning_assets.resetWinAssets();

        this.component_card_result_total.setPlayerValue(0);
        this.component_card_result_total.setBankerValue(0);
        this.component_chips.total_ingame_bet = 0;
        this.component_betBoard.bet_areas.forEach((e,x)=> {
            e.chips.forEach((chip) => {
                this.component_betBoard.removeChild(chip);
            });
            e.chips = [];
            e.total_bet_amt = 0;

            if(e.graphics) {
                e.normal_state(e,x);
            } else {
                e.gotoAndStop(0);
            }
            e.alpha = 1;
            createjs.Tween.removeTweens(e);

        });
        //reset betdetails fobt size and position
        // if(this.component_betDetails && this.component_betDetails.total_bet_amt) {
        //     this.component_betDetails.total_bet_amt.font = "22px BebasNeue";
        //     this.component_betDetails.total_win_amt.font = "22px BebasNeue";
        // }

        // this.component_betDetails.total_win_amt.y = 44;
    },
    cloneRoadMap () {
        let cloned = _.clone(this.component_roadmap);
        this.addComponent(cloned);
    },
    formatNumber (num) {
        num+= '';
        var x = _.split(num,'.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    },
    setVideo(quality) {
        if (this.playerVid) {
            this.playerVid.destroy();
            this.videoSocket.off();
        }

        let streamQuality = quality == 'HD' ? 'high' : 'low';

        // Save quality
        $.post(links.videoSetting, {type: quality}, (response) => { });

        let tblNum = window.tableNum < 10 ? `0${window.tableNum}` : window.tableNum;
        this.videoSocket = io(`https://lsv.nihtanv2.com/${streamQuality}`, { path: `/bc${tblNum}` });
        this.videoSocket.on('connect', () => {
            this.videoSocket.emit('join', { feed: 0 });
        });

        this.playerVid = new JSMpeg.Player('pipe', { canvas: document.getElementById('vidCanvas') });
        this.videoSocket.on('stream-data', (data) => {
            this.playerVid.write(data.buffer);
        });

        // On load volume
        this.playerVid.volume = parseFloat(window.config.voice);
        // if (parseInt(window.config.voice) === 1) {
        //     this.playerVid.volume = parseFloat(window.config.volume);
        // }
        // else {
        //     this.playerVid.volume = 0;
        // }
    },
    getSlave () {
        return window.slave == '' ? 'normal' : window.slave;
    }
});

function isSuperSix() {
    return getSlaveParam('supersix')
}

function isDragonBonus()
{
    return getSlaveParam('bonus')
}
