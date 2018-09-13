/**
 * dragon-tiger.js
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

//===common components
import chips from '../../components/commons/chips';
import timer from '../../components/commons/timer';

import game_buttons from '../../components/commons/gameButtons';
// import player_info from '../../components/commons/playerInfo';
import bet_board from '../../components/commons/table';
import dealer from '../../components/commons/dealer';
import win_result from '../../components/commons/winning';
import messages from '../../components/commons/messages';
// import menu from '../../components/commons/menu';
import menuEvents from '../../components/commons/menuEvents';
import menuSettingsEvents from '../../components/commons/menuSettingsEvents';
import channel from '../../components/commons/channel';

import betRecords from '../../components/commons/menuBetRecords';
import transfer from '../../components/commons/menuTransfer';
import menuChips from '../../components/commons/menuChips';
import settings from '../../components/commons/menuSettings';
import menuPlayerInfo from '../../components/commons/menuPlayerInfo';
import menuRoomInfo from '../../components/commons/menuRoomInfo';
import howToPlay from '../../components/commons/menuHowToPlay';
import menuVideoSettings from '../../components/commons/menuVideoSettings';
import bet_indicator from '../../components/commons/betIndicator';
import notifications from '../../components/commons/notifications';
import announcement from '../../components/commons/announcement';
import winChips from '../../components/commons/winChips';
import toggle from '../../components/commons/toggle';
import lines from '../../components/commons/lines';

//===uncommon components
import multiplayer from '../../components/baccarat/multiplayer';
import test_button from '../../components/baccarat/test_button';
import drawn_table from '../../components/baccarat/tableDraw2';
// import game_info from '../../components/baccarat/gameInfo';
import card_result from '../../components/baccarat/cardResult';
import fake_card_result from '../../components/baccarat/fake-cardResult';
import dealer_data from '../../components/baccarat/dealer_data';
import scoreboard from '../../components/baccarat/scoreboard';
import card_extra from '../../components/baccarat/cardResultExtra';
import winning_assets from '../../components/baccarat/winningAsset';
import bet_details from '../../components/baccarat/betDetails';
import win_amount from '../../components/baccarat/winAmount';
import player_dealer_stat from '../../components/baccarat/playerDealerStat';
import menuBetData from '../../components/baccarat/menuBetData';
import roomInfo from '../../components/baccarat/roomInfo';
import tableOutline from '../../components/baccarat/outline';
import junketEvents from '../../components/baccarat/junketEvents';
import balanceBet from '../../components/baccarat/balanceBet';

import multibet from '../../components/multibet/multibet';
import multibetv2 from '../../components/multibet/multibetv2';
import multibetNav from '../../components/multibet/multibetNav';
import multibetTableDraw from '../../components/multibet/multibetTableDraw';
import multibetBetting from '../../components/multibet/multibetBetting';
import multibetBetting2 from '../../components/multibet/multibet-betting2';
import multibetButtons from '../../components/multibet/multibetButtons';
import multibetRoadmap from '../../components/multibet/multibetRoadmap';

import roadmap_data from '../../components/baccarat/ingame-roadmap_data';
import roadmap from '../../components/baccarat/ingame-roadmap';
import multibet_sidebar from '../../components/baccarat/multibetSide';
//===unique game configuration
import betboard_config from '../../assets/dt_betboard_config';
import theme_config from '../../assets/theme_colors_config';
import opposite_bet from '../../assets/dt_betarea_opposite_condition';
//===ingmae tutorial for first time users
import ingame_tutorial from '../../components/baccarat/ingame-tutorial';
//burn card
import burn_card from '../../components/baccarat/burnCard';
//===loading screen/animation
// import loading_init from '../../screens/loading_init';
// import load from '../../screens/loading';
//===dragon tiger events
import listen from '../../listeners/baccarat-events2';
//=== links for gamebuttons
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
let tableSlave = window.slave =='' ? 'normal' : window.slave; //getSlaveParam(window.slave != "" ? window.slave : 'normal')?window.slave:'normal';
let initData = {
    userId : window.userId,
    range : window.range,//(tableSlave !== 'normal')?window.range+'_'+window.slave:window.range,
    userName : window.user_name,
    token : window.vendorData ? window.vendorData.token : '',
    money : window.user_money,
    vendor_id : window.vendor_id,
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
    resources: "/assets.json",

    // component_menu : menu(),
    component_menuEvents : menuEvents(),
    component_menuSettingsEvents : menuSettingsEvents(),
    component_junketEvents: junketEvents(),
    component_balanceBet: balanceBet(),
    component_betRecords : betRecords(links),
    component_transfer : transfer(),
    component_menuChips : menuChips(),
    component_settings : settings(),
    component_menuPlayerInfo : menuPlayerInfo(),
    component_menuRoomInfo : menuRoomInfo(),
    component_howToPlay : howToPlay(),
    component_menuVideoSettings : menuVideoSettings(links),
    component_menuBetData : menuBetData(links),
    component_roomInfo : roomInfo(),
    component_winChips : winChips(),
    component_toggle : toggle(),
    component_lines : lines(),

    // component_gameInfo : game_info(),
    component_betBoard : bet_board(),
    component_chips : chips(opposite_bet),
    component_gameButtons : game_buttons(links),
    component_timer : timer(),
    component_messages: messages(),
    component_card_result: card_result(),
    component_fake_cardResult: fake_card_result(),
    component_winnings: win_result(win_suits),
    // component_multibetbar: multibet_sidebar(),
    component_dealer : dealer(),
    component_dealer_data : dealer_data(),
    component_roadmap: roadmap(),
    // component_playerInfo: player_info(),
    component_betDetails: bet_details(),
    component_channel: channel(),
    component_scoreBoard: scoreboard(),
    component_winning_assets: winning_assets(),
    // component_betindicator: bet_indicator(),
    component_winAmount: win_amount(),
    component_tableDraw: drawn_table(betboard_config),
    component_testButton : test_button(),
    component_playerDealerStat : player_dealer_stat(),
    component_notifications: notifications(),
    component_announcement: announcement(),
    component_tableOutline: tableOutline(),

    // component_multinav: multibetNav(),
    // component_multibet: multibet(),
    component_multibetv2: multibetv2(),
    component_multibetBetting2: multibetBetting2(),
    // component_multibetTableDraw: multibetTableDraw(),
    // component_multibetBetting: multibetBetting(),
    component_multibetButtons  : multibetButtons(),
    component_multibetRoadmap  : multibetRoadmap(),
    component_multiplayer : multiplayer(opposite_bet),

    component_card_result_total : card_extra(),
    confirm_failed: false,
    theme_color: theme_config(),
    component_ingameTutorial : ingame_tutorial(),
    component_burnCard : burn_card(),
    multiplayer : false,
    loaded_asset: function (e) {
        this.loaded = e;
    },
    chipsMultiplier : window.currencyAbbrev === "PTS" ? 1 : 1,
    loading: function(e) {

        try{
            window.videoStream.setMuted(true);
            window.videoStream.setVolume(0);
        }
        catch(err) {

        }

        $(".card--percent").html("" + Math.round((e * 100)) + "%")
    },
    success_bet : [],
    getTheme() {
         return window.theme = 'black';
    },
    init () {
        // loading_init(this);
    },
    actions : [],
    is_repeat : 0,
    mobile: false,
    currentLog : null,
    junketAgent: window.junket == 2 ? true : false,
    disabledRoom: false,
    is_create: false,
    is_banker: false,
    isKicked : false,
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
    firstRound : true,
    main() {

        this.chipsConf = [];

        this.chip_names.forEach((chip, index) => {
            this.chipsConf.push({
                chipName : chip,
                chipval : this.chipval[window.currencyAbbrev] === undefined ? this.chipval.default[index] : this.chipval[window.currencyAbbrev][index]
            });
        });

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

        window.component_has_loaded = true;

        playSound("welcome", 1);

        if (window.user_type == 'S') {
          $('#player').hide();
        }

        function isFlashEnabled() {
            var hasFlash = false;
            try {
                var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                if(fo) hasFlash = true;
            }
            catch(e) {
                if(navigator.mimeTypes ["application/x-shockwave-flash"] != undefined) hasFlash = true;
            }
            return hasFlash;
        }

        setTimeout(()=>{
            $(".wrapper").hide();
            if(isFlashEnabled()) {
                $(".get-flash").hide();
            } else {
                $(".get-flash").show();
            }
        },500)

        this.player_stat = {
            total : 0
        }

        listen(this);

        createjs.MotionGuidePlugin.install(createjs.Tween);

        let self = this;

        this.addComponent(this.component_toggle);
        this.addComponent(this.component_tableOutline);
        this.addComponent(this.component_tableDraw);
        this.addComponent(this.component_multiplayer);

        this.component_tableDraw.bet_areas.push(...this.component_multiplayer.bet_areas);
        this.addComponent(this.component_betBoard);
        //adding outlines
        this.component_betBoard.addChild(this.component_tableDraw.classic_outline);
        this.component_betBoard.addChild(this.component_tableDraw.supersix_outline);
        // this.component_betBoard.addChild(this.component_tableDraw.bonus_outline);

        this.component_betBoard.addChild(this.component_multiplayer.classic_outline);
        this.component_betBoard.addChild(this.component_multiplayer.supersix_outline);
        this.component_betBoard.addChild(this.component_multiplayer.chips_container);

        this.addComponent(this.component_winChips);

        this.addComponent(this.component_winning_assets);
        this.addComponent(this.component_winnings);

        this.addComponent(this.component_ingameTutorial);
        this.addComponent(this.component_multibetv2);
        this.addComponent(this.component_multibetBetting2);

        this.addComponent(this.component_gameButtons);

        this.addComponent(this.component_timer);
        this.addComponent(this.component_channel);
        this.addComponent(this.component_roadmap);
        this.addComponent(this.component_betDetails);

        this.addComponent(this.component_chips);
        this.addComponent(this.component_messages);
        this.addComponent(this.component_roomInfo);

        this.addComponent(this.component_menuEvents);
        this.addComponent(this.component_menuSettingsEvents);
        this.addComponent(this.component_betRecords);
        this.addComponent(this.component_menuChips);
        this.addComponent(this.component_burnCard);
        this.addComponent(this.component_notifications);
        this.addComponent(this.component_announcement);
        this.addComponent(this.component_dealer);
        this.addComponent(this.component_lines);
        this.addComponent(this.component_card_result_total);
        this.addComponent(this.component_card_result);
        this.addComponent(this.component_junketEvents);
        this.addComponent(this.component_winAmount);
        this.addComponent(this.component_balanceBet);

        this.socket.on("disconnect", ()=>{
            this.initRound();
            this.connect();
        });

        this.isIpad = false;
        if (window.navigator.platform.toLowerCase() == 'ipad' && window.junket > 0) { // iPad
            this.isIpad = true;
            $('.osmf-video').css({display: 'none'});
            $('.get-flash').remove();
            $('#myCanvas').before('<canvas class="dom-resizable" id="vidCanvas" width="800" height="450"></canvas>');
            $('#vidCanvas').show();
            $('#vidCanvas').css({
                'transform': 'scale('+((window.innerWidth / 1920))+')'
            })
            this.setVideo(window.config.video);
        }

        if (window.junket && !_.isEmpty(window.vendorData)) {
            this.component_betBoard.visible = false;
            this.isBalance = false;

            this.socket.emit('data', { eventName: 'get_junket_room', token: window.vendorData.token }, (data) => {
                let slaveButton;
                let betInfo = null;
                console.log(data, "data onn receive")
                if (data == 'no data sent') {
                    console.error('Data sent from socket error.');
                    return;
                } else {
                    for(var key in data) {
                        if (data[key].isMulti) {
                            this.multiplayer = 1;
                            window.multiplayer = 1;
                        } else {
                            this.multiplayer = 0;
                            window.multiplayer = 0;
                        }
                        
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

                console.log(betInfo, ":::::::::BETINFO")

                if(this.multiplayer) {
                    this.component_toggle.toggleMultiSlave(this.component_toggle[slaveButton]);
                    //balance bet
                    if(window.junket > 0 && this.isBalance) {
                        $(".balancebet-con").addClass('-active');                        
                        $(".tutorial-items.-balancebet").show();      
                        if(window.tutorial_enabled) {
                            this.component_channel.infoToggle(true)           
                        }       
                    }
                } else {
                    this.component_toggle.toggleSlave(this.component_toggle[slaveButton]);
                }
                this.toggleBet();
                this.component_betBoard.visible = true;
                this.component_junketEvents.setCountdown(data);

                //balance bet
                this.component_balanceBet.initData(betInfo);
                this.toggleSlaveDisp();
            });
        } else {
            this.multiplayer = parseInt(window.multiplayer);
            this.toggleBet();
        }

        this.room_bets = [];
        this.connect();

        window.setVideoVol();

        // Check if table is disabled
        if (window.vendorTable && window.junket) { // !_.isEmpty(window.vendorData
            let vendorTable = JSON.parse(window.vendorTable);
            for (var i = 0; i < vendorTable.disable_table.length; i++) {
                if (vendorTable.disable_table[i] == `${window.game}-${window.tableNum}`) {
                    $('.junket-confirm').show();
                  $('.mdl_message').html(window.language2.com_sub_ingameprompts_disableroom);
                  $('.mdl_bg.-closeroom').show();
                  $('.mdl_alert_txt').css({'margin-bottom': '17px'});
                  $('.mdl_lobby').html(`<span>${window.language2.com_sub_rooms_confirm}</span>`);
                  $('.mdl_btn').hide();
                  $('.mdl_lobby').show();

                    $('.mdl_lobby').click(function() {
              if(window.lobby_type == 'integrated'){
                  window.location = window.lobby_redirect_url;
                } else {
                  window.location = window.lobby_domain;
                }
                    });

                    setTimeout(() => {
              if(window.lobby_type == 'integrated'){
                  window.location = window.lobby_redirect_url;
                } else {
                  window.location = window.lobby_domain;
                }
                    }, 10000)
            return;
                }
            }

            $.post('/checkTable', {vendorId: window.vendor_id}, (response) => {
                let disabledTables = JSON.parse(response[0].junket_table).disable_table;
                console.log('disabledTables: ', disabledTables);
                for (var i = 0; i < disabledTables.length; i++) {
                  if (disabledTables[i] == `${window.game}-${window.tableNum}`) {
                    $('.junket-confirm').show();
                    $('.mdl_message').html(window.language2.com_sub_ingameprompts_disableroom)
                    $('.mdl_bg.-closeroom').show();
                    $('.mdl_alert_txt').css({'margin-bottom': '17px'});
                    $('.mdl_btn').hide();
                    $('.mdl_lobby').show();

                    $('.mdl_lobby').click(function() {
                      if(window.lobby_type == 'integrated'){
                        window.location = window.lobby_redirect_url;
                      } else {
                        window.location = window.lobby_domain;
                      }
                    });

                    setTimeout(() => {
                      if(window.lobby_type == 'integrated'){
                        window.location = window.lobby_redirect_url;
                      } else {
                        window.location = window.lobby_domain;
                      }
                    }, 10000)
                    return;
                  }
                }
            });
        }

        /** range togg;e */
        $(".channel-con.-betrange > span").on('click', function () {
            if(window.junket && !_.isEmpty(window.vendorData)) return;
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
                $('#range-list').animate({'height': $('#range-list').children().length *40 + 'px'},200);
                $(this).addClass('active');
                // $(this).removeClass('active');
            }
        });

        $(".range-select").on('click', function () {
          if(window.junket && !_.isEmpty(window.vendorData)) return;
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

          let mainAreaMin = (parseInt($(this).attr('data').split('-')[0]) * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          let mainAreaMax = (parseInt($(this).attr('data').split('-')[1]) * parseInt(window.currencyMultiplier)) * window.userMultiplier;

          if (mainAreaMin > 999999) {
            mainAreaMin = `${mainAreaMin / 1000000}M`;
          }else if (mainAreaMin > 999) {
            mainAreaMin = `${mainAreaMin / 1000}K`;
          }

          if (mainAreaMax > 999999) {
            mainAreaMax = `${mainAreaMax / 1000000}M`;
          }
          else if (mainAreaMax > 999) {
            mainAreaMax = `${mainAreaMax / 1000}K`;
          }

          $('#range-disp').html(`${mainAreaMin} - ${mainAreaMax}`);
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
        this.component_multiplayer.hardReset();
        this.component_betBoard.clearTableChipBets();
        this.socket.disconnect();
        this.socketAll.disconnect();
        window.socketConnect(this);
        this.connect();
    },
    toggleSlaveDisp () {
        if(window.slave == 'supersix') {
            $('.table-tr.supersix').removeClass('-hidden'); 
            $('.-banker-payout').html('1:1'); 

            $("#balance-info").addClass('-top-betlimit-supersix')
        } else {
            $('.table-tr.supersix').addClass('-hidden'); 
            $('.-banker-payout').html('0.95:1');
            
            $("#balance-info").addClass('-top-betlimit')
        }
    },
    connect() {
        //, token: initData.token
        let emit = 'room';
        if(window.junket != 0 && !_.isEmpty(window.vendorData)) {
            emit = 'join_junket_room';
        }

        this.socket.emit('data', { eventName : emit, data: initData }, (d) => {
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

            //end set for junket

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
            this.component_multiplayer.setPlayerBets(_.cloneDeep(filteredRoomates))
            // if(!this.roadMarks.length) return;

            //for myuser
            let user = _.filter(d.roomates, (e) => {
                return e.userId == window.userId
            });

            console.log(user, ":my usserrrrrr")
            if(!user.length) return;

            this.component_gameButtons.is_confirmed_bet = true;
            // toggle slave based on previous bets
            let data = [];
            let slave = window.slave;//user[0].bets.length ? user[0].bets[0].slave : '';
            tableSlave = this.getSlave();

            if(!parseInt(window.multiplayer)) {
                if(user[0].bets.length) {
                    window.slave = slave = user[0].bets[0].slave;
                    tableSlave = this.getSlave();
                }
                var button = slave == 'bonus' ? this.component_toggle.bonusButton : slave == 'supersix' ? this.component_toggle.supersixButton : this.component_toggle.classicButton;
                this.component_toggle.toggleSlave(button)
            } else {
                if(user[0].bets.length) {
                    window.slave = slave = user[0].bets[0].slave;
                    tableSlave = this.getSlave();
                }
                var button = slave == 'bonus' ? this.component_toggle.bonusButton : slave == 'supersix' ? this.component_toggle.supersixButton : this.component_toggle.classicButton;
                this.component_toggle.toggleMultiSlave(button)
            }

            // toggle
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

            if (!window.junket) {
                this.component_gameButtons.yourBets = data;
            }

            this.component_betDetails.bet_amount = total_bet_amt;
            this.component_betDetails.reinit();

            this.component_gameButtons.previousBet = data;
            this.component_gameButtons.repeatBet(true, true);

            if (this.component_gameButtons.previousBet.length) {
                // this.component_betBoard.chipWrap.visible = false;
                this.firstRound = false;
            }
        });

        this.multiplayer_data = {};
        this.allMultiplayer_data = [];

        this.socket.on("multi-player", (data) => {
            data = Xpacket.received(data)

            console.log("multiplayer data", data)

            this.multiplayer_data = _.cloneDeep(data);
            // this.allMultiplayer_data.push(_.cloneDeep(data));

            switch(data.type) {
                case "bet" :
                    /** not needed
                        if(data.id == window.userId) {
                            let total = 0;
                            let bets = [];
                            let actions = [];
                            for(var x = 0; x < data.data.length;x++) {
                                total += data.data[x].bet_amount;

                                if(tableSlave == data.data[x].slave) {
                                    actions[x] = {
                                        chip_amount_used:data.data[x].bet_amount,
                                        drop_area: data.data[x].bet
                                    }

                                    bets[x] = {
                                        "amount" : data.data[x].bet_amount,
                                        "table_id" : data.data[x].bet,
                                        "is_confirmed" : true
                                    }
                                }
                            }

                            this.context.user_money += this.component_betDetails.bet_amount;
                            this.context.user_money -= total;
                            this.component_betDetails.bet_amount = total;
                            this.component_betDetails.reinit(false);

                            this.component_chips.actions = actions;

                            this.component_gameButtons.yourBets = bets;
                            this.component_gameButtons.previousBet = bets;

                            this.component_timer.removeUnconfirmedChips();
                            this.component_gameButtons.repeatBet();

                            this.component_betBoard.bet_areas.forEach(function(betarea) {
                                betarea.chips = _.filter(betarea.chips, function(e) { e.confirmed_bet = true; return e; });
                            });

                            this.component_gameButtons.checkButtonState();
                            this.user_no_bet_count = 0;
                        }
                    **/
                    let slave = 'normal';
                    if(this.multiplayer_data.data.length) {
                        slave = this.multiplayer_data.data[0].slave;
                    }

                    if(slave == this.getSlave()) {
                        this.component_multiplayer.setMultiplayer(this.multiplayer_data)
                    }

                    if(window.junket != 0) {

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
                    this.component_multiplayer.roomEvent(this.multiplayer_data);

                    if (window.junket != 0 && !_.isEmpty(window.vendorData) && window.vendorData.token == data.data.token) {
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
                    /** not needed
                        if(data.id == window.userId) {
                            this.component_betBoard.bet_areas.forEach(function(betarea) {
                                betarea.chips = _.filter(betarea.chips, function(e) { e.confirmed_bet = false; return e; });
                            });

                            this.component_gameButtons.previousBet = _.filter(this.component_gameButtons.previousBet, (e) => {
                                e.is_confirmed = false;
                                return e;
                            });

                            this.component_gameButtons.responseClear();
                            this.component_gameButtons.checkButtonState();
                        }**/
                    this.component_multiplayer.cancelBet(this.multiplayer_data);

                    if(window.junket != 0 && !_.isEmpty(window.vendorData)) {
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
                    console.log('leave: ', data);

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

                    this.component_multiplayer.roomEvent(this.multiplayer_data)
                    console.log(this.component_junketEvents.junketUsers, "JUNKET USERS ON LEAVE")
                    if (window.junket != 0 && !_.isEmpty(window.vendorData)) {
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

                }
                break;
            case 'repeat':
                let rCmt = '';
                for(var x = 0; x < this.component_gameButtons.previousBet.length; x++) {
                    rCmt += `,${this.component_gameButtons.previousBet[x].table_id} ${this.component_gameButtons.previousBet[x].amount}`;
                    this.tempLog.push({comment: `${this.component_gameButtons.previousBet[x].table_id}, ${this.component_gameButtons.previousBet[x].amount}`});
                }
                comment = `repeat ${rCmt}`
                this.actionlogs[0].comment = comment;
                this.log();
                break;

            case 'ping':
                this.actionlogs = [{
                    action: 'fail',
                    comment: 'ping failed',
                    timeDate: this.fnFormatTime(new Date().getTime(), 'MM/dd/yyyy HH:mm:ss')
                }];
                this.log();
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
    total_bets_length : 0,
    actionCallback(type, param) {
        this.callback(null, type)

        let range = '';
        let mainarea = _.find(this.component_betBoard.bet_areas, (area) => {
            return area.table_name === 'player';
        });

        range = `${mainarea.min_betAmt}-${mainarea.max_betAmt}`;

        tableSlave = this.getSlave();

        switch(type) {
            case "clear":
                let betAmount = this.component_betDetails.bet_amount;

                this.current_action = "clear";
                // this.callback({table_name : ""});

                this.component_gameButtons.process_clear = true;

                let balance = 0;
                
                if(window.junket == 1 && !_.isEmpty(window.vendorData) && this.isBalance) {
                    balance = this.component_balanceBet.currentBalance;
                }

                $.post(links.cancel, {
                    logs : this.actionlogs,
                    slave: tableSlave,
                    data: this.component_gameButtons.yourBets,
                    range: range,
                    balance_bet : balance,
                    device : 'w'
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
                                slave : tableSlave,
                                token : !_.isEmpty(window.vendorData) ?  window.vendorData.token : ''
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
                        this.component_balanceBet.setBets([{id: window.userId}], 'cancel')
                    } else {
                        this.component_gameButtons.process_clear = false;
                        this.component_gameButtons.process_confirm = false;
                        this.component_gameButtons.checkButtonState();

                        this.component_gameButtons.is_clear = false;

                        if(response.balance !== undefined && response.balance) {
                            this.component_messages.setMessage(window.language2.nihtanjunket_ingame_balancebetcancelfail, 1);
                        }
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

                this.component_gameButtons.process_confirm = true;

                this.current_action = "insert";
                this.user_no_bet_count = 0;
                let data = []

                this.component_gameButtons.yourBets.forEach( (row) => {
                    data.push({
                        "roundNum" : parseInt(this.component_dealer.round_id),
                        "bet_amount" : row.amount,
                        "name" : window.user_name,
                        "id" : window.userId,
                        "bet" : row.table_id,
                        "is_mobile" : this.mobile,
                        'currency' : window.casino,
                        'currencyMultiplier' : window.currencyMultiplier,
                        'userMultiplier' : window.userMultiplier
                    })
                });

                if(this.component_gameButtons.yourBets.length) {
                    let totalBetAmt = _.sumBy(this.component_gameButtons.yourBets, 'amount');
                    let logData = [{'action' : 'confirm', 'comment' : 'total, '+totalBetAmt, 'user_money' : parseInt(this.context.user_money)}]
					let slaveJson = {
						'supersix' : 's',
						'insurance' : 'i',
						'bonus' : 'b',
                        'normal' : 'r'
					};

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
						type : log_type,
						slave : slaveParam,
                        roomId : roomId,
                        range : range,
                        balance_bet : balance,
                        device : 'w'
					}, (response) => {
                        // === Ping fail handling
                        if (response.pingFail) {
                            this.callback('', 'ping');
                        }
                        // === End of ping fail handling

                        if (response.fail && !response.data.length) {//(_.isEmpty(response)) {  //if insert failed
                            if(response.fail === 3) {
                                this.component_messages.setMessage(window.language2.nihtanjunket_ingame_balancebetfail, 1);
                            } else {
                                this.component_messages.setMessage(window.language.prompts['promptbetfail'+(response.fail == 2 ? '2' : '')], 1);
                            }

                            this.component_gameButtons.previousBet.forEach( (e) => {
                                e.is_confirmed = false
                            });

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
                            this.component_betDetails.reinit(true);

                            this.component_gameButtons.checkButtonState();

                            this.component_chips.actions = [];
                            this.component_timer.removeUnconfirmedChips(true);

                            // reinit user money
                            if(window.casino == "SS") {
                                this.context.user_money = parseFloat(response.money).toFixed(2);
                            } else {
                                this.context.user_money = parseInt(response.money);
                            }
                            this.component_betDetails.reinit(true);

                            this.component_gameButtons.yourBets = [];

                        }
                        else if(response.fail && response.data.length) { // if inssert failed but with prev bets
                            if(response.fail === 3) {
                                this.component_messages.setMessage(window.language2.nihtanjunket_ingame_balancebetfail, 1);
                            } else {
                                this.component_messages.setMessage(window.language.prompts.promptaddfail, 1);
                            }

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
                                    "slave" : tableSlave,
                                    'currencyMultiplier' : window.currencyMultiplier,
                                    'userMultiplier' : window.userMultiplier,
                                    'token' : !_.isEmpty(window.vendorData) ?  window.vendorData.token : ''
                                });

                            });

                            this.context.user_money += this.component_betDetails.bet_amount;
                            this.component_betDetails.bet_amount = tot;
                            this.context.user_money -= tot;
                            this.component_betDetails.reinit(true);


                            this.component_gameButtons.process_confirm = false;
                            this.component_gameButtons.checkButtonState();

                            this.confirm_failed = false;
                            this.component_gameButtons.bet_saved = true;

                            this.socket.emit('data', {
                                eventName: 'bet',
                                data: data_2,
                                gameName: 'Baccarat',
                                tableId: window.tableNum,
                                roundNum: parseInt(this.component_dealer.round_id)
                            } , function (e) {
                            });

                            this.component_gameButtons.previousBet = prevBet;
                            this.component_gameButtons.yourBets = prevBet;
                            setTimeout(() => {
                                this.component_chips.actions = [];
                                this.component_timer.removeUnconfirmedChips(true);
                            },50)

                            // reinit user money
                            if(window.casino == "SS") {
                                this.context.user_money = parseFloat(response.money).toFixed(2);
                            } else {
                                this.context.user_money = parseInt(response.money);
                            }
                            this.component_betDetails.reinit(true)
                        }
                        else if(!response.fail && response.data.length) { //(response.length) { // if success

                            let total = 0;
                            let data_2 = [];

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
                                    "slave" : tableSlave,
                                    'currencyMultiplier' : window.currencyMultiplier,
                                    'userMultiplier' : window.userMultiplier,
                                    'token' : !_.isEmpty(window.vendorData) ?  window.vendorData.token : ''
                                });
                                total += bet.bet_money
                            });

                            this.socket.emit('data', {
                                eventName: 'bet',
                                data: data_2,
                                gameName: 'Baccarat',
                                tableId: window.tableNum,
                                roundNum: parseInt(this.component_dealer.round_id)
                            } , function (e) {
                            });

                            this.component_gameButtons.previousBet = this.success_bet;
                            this.component_gameButtons.yourBets = this.success_bet;

                            setTimeout(() => {
                                this.component_chips.actions = [];
                                this.component_timer.removeUnconfirmedChips(true);
                            },50)

                            //**change bet detaik **//
                            this.context.user_money += this.component_betDetails.bet_amount;
                            this.context.user_money -= total;
                            this.component_betDetails.bet_amount = total;
                            this.component_betDetails.reinit(false);

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
                            this.component_betDetails.reinit(true);
                        }

                        this.component_gameButtons.checkButtonState();

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
                        this.confirm_failed = true;
                        this.component_gameButtons.is_confirmed_bet = false;
                        this.component_gameButtons.process_confirm = false;
                        this.component_gameButtons.process_clear = false;

                        this.component_betBoard.bet_areas.forEach(function(betarea) {
                            for(var a = 0; a< betarea.chips.length; a++) {
                                betarea.chips[a].confirmed_bet = false;
                                betarea.chips[a].is_confirmed = false;
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
                    });
                }

                this.logUserMoney = 0;

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
            break;
        }
    },
    toggleResult () {
        // this.component_card_result_total.alpha = 0;
        // this.component_card_result.alpha = 0;

        // this.component_card_result_total.visible = !this.component_card_result_total.visible;

        // createjs.Tween.get(this.component_card_result_total)
        // .to({
        //     alpha : this.component_card_result_total.visible ? 1 : 0
        // }, 500)

        // createjs.Tween.get(this.component_card_result)
        // .to({
        //     alpha : this.component_card_result.visible ? 1 : 0
        // }, 500)

        // if(window.tutorial_enabled) this.component_card_result_total.visible = false;
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
    toggleBet () {
        if(this.component_gameButtons.yourBets.length) {
            return;
        }

        var tempBets = [];
        if(!this.component_gameButtons.is_confirmed_bet) {
            this.component_toggle.toggleSlaveBet();
        } else {
            this.component_betBoard.clearTableChipBets();
            this.component_gameButtons.repeatBet(false, true);
        }

        let b = this.getSlave()  === 'normal' ? 'classic' : this.getSlave();

        if(this.multiplayer) {
            this.component_multiplayer.visible = true;
            this.component_multiplayer.chips_container.visible = true;
            this.component_betBoard.children.forEach((e)=>{
                if(e.multiplayer && !this.junketAgent) {
                    // extra slave tables will have their own settings for visible attribute
                    if(!_.includes(["supersix", "big","small","bonus_player","bonus_banker"], e.table_name)) {
                        e.visible = true
                    }
                }
                if(e.singleplayer) {
                    e.visible = false
                }
            });

            this.component_toggle.toggleMultiSlave(this.component_toggle[b+'Button'], true);
            //button
            this.component_toggle.multiButton.active();
            this.component_toggle.singleButton.default();
        } else {

            this.component_multiplayer.visible = false;
            this.component_multiplayer.chips_container.visible = false;
            this.component_betBoard.children.forEach((e)=>{
                if(e.multiplayer) {
                    e.visible = false
                }
                if(e.singleplayer) {
                     // extra slave tables will have their own settings for visible attribute
                    if(!_.includes(["supersix", "big","small","bonus_player","bonus_banker"], e.table_name)) {
                        e.visible = true
                    }
                }
            });

            this.component_toggle.toggleSlave(this.component_toggle[b+'Button'], true);
            //button
            this.component_toggle.multiButton.default();
            this.component_toggle.singleButton.active();
        }

        this.component_betBoard.checkTableHighlight();
    },
    endRound() {
        this.component_chips.chips.forEach((chips)=>{
            chips.y = chips.oy;
            chips.shadow = null
        });
    },
    initRound () {
        //balance
        this.component_balanceBet.resetBalanceBet();

        this.room_bets = [];
        $("#totalJunketBets").html(0);

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
        this.allMultiplayer_data = [];

        this.actionlogs = [];
        this.tempLog = [];
        this.success_bet = [];
        this.component_gameButtons.process_confirm = false;
        this.component_gameButtons.process_clear = false;

        this.confirm_failed = false;

        this.component_betBoard.bet_cnt = 0;

        this.component_gameButtons.previousBet.forEach((e)=>{
            e.is_confirmed = false;
        })

        this.component_card_result_total.setPlayerValue(0)
        this.component_card_result_total.setBankerValue(0)
        this.component_multiplayer.reset();

        this.component_card_result_total.resetWin();

        this.component_winnings.animationContainer.visible =false

        if(this.component_gameButtons.previousBet.length) {
            this.component_gameButtons.repeatButton.visible = true;
            this.component_gameButtons.undoButton.visible = false;
        }

        delete this.component_card_result.banker;
        delete this.component_card_result.player;

        this.component_gameButtons.repeat = false;

        //this.actions = [];
        this.is_repeat = 0;
        this.current_action = "";

        this.component_winAmount.total_win_text.alpha = 0;
        this.component_gameButtons.is_confirmed_bet = false;
        this.component_winnings.hideResult();
        this.component_card_result.removeAllChildren();

        this.component_chips.actions = [];
        // this.component_chips.removeChild(this.component_chips.mouse_chip);
        // this.component_chips.mouse_chip = null;
        // this.component_chips.selected_chip = null;
        this.component_chips.chips.forEach((chips)=>{
            chips.y = chips.oy;
            chips.shadow = null
        });

        if(this.component_chips.selected_chip) {
            this.component_chips.selected_chip.shadow = new createjs.Shadow("#fff", 0, 0, 0);
            createjs.Tween.get(this.component_chips.selected_chip.shadow,{loop:true})
            .to({
             blur:10
            },500, createjs.Ease.quadInOut)
            .to({
             blur:0
            },500, createjs.Ease.quadInOut)

            this.component_chips.selected_chip.y = this.component_chips.selected_chip.y - 10;
        }

        this.component_winnings.visible = false;
        this.component_winning_assets.visible = false;
        this.component_winning_assets.resetWinAssets();

        this.component_chips.total_ingame_bet = 0;
        this.component_betDetails.win_amount = 0;
        this.component_betDetails.bet_amount = 0;
        this.component_betDetails.reinit(false);

        //reset betdetails fobt size and position
        // if(this.component_betDetails && this.component_betDetails.total_bet_amt) {
        //     this.component_betDetails.total_bet_amt.font = "24px BebasNeue";
        //     this.component_betDetails.total_win_amt.font = "24px BebasNeue";
        // }

        // let single = this.component_tableDraw.classic_outline;
        //
        // for (var k = 0; k < single.children.length; k++) {
        //   if(single.children[k].tablename == 'dragon') {
        //     single.children[k].color='rgba(21,101,192,1)';
        //   } else if (single.children[k].tablename == 'tiger') {
        //     single.children[k].color='rgba(209,47,47,1)';
        //   } else if (single.children[k].tablename == 'tie') {
        //     single.children[k].color='rgba(104, 159, 56,1)';
        //   }
        // }
        //
        // this.component_tableDraw.classic_outline.updateCache();
        //
        // let multi = this.component_multiplayer.classic_outline;
        //
        // for (var k = 0; k < multi.children.length; k++) {
        //   if(multi.children[k].tablename == 'dragon') {
        //     multi.children[k].color='rgba(21,101,192,1)';
        //   } else if (multi.children[k].tablename == 'tiger') {
        //     multi.children[k].color='rgba(209,47,47,1)';
        //   } else if (multi.children[k].tablename == 'tie') {
        //     multi.children[k].color='rgba(104, 159, 56,1)';
        //   }
        // }
        //
        // this.component_multiplayer.classic_outline.updateCache();

        this.component_betBoard.bet_areas.forEach((e,x)=> {
            e.chips.forEach((chip) => {
                this.component_betBoard.removeChild(chip);
            });
            e.chips = [];
            e.total_bet_amt = 0;
            e.isWin_anim  = false;
            if(e.graphics) {
                e.normal_state(e,x);
            } else {
                e.gotoAndStop(0);
            }
            e.alpha = 1;
            createjs.Tween.removeTweens(e);
        });

        this.component_gameButtons.disableAllButtons();
    },
    getSlave () {
        return window.slave == '' ? 'normal' : window.slave;
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
        if (parseInt(window.config.voice) === 1) {
            this.playerVid.volume = parseFloat(window.config.volume);
        }
        else {
            this.playerVid.volume = 0;
        }
    }
});

function isSuperSix()
{
    return getSlaveParam('supersix')
}

function isDragonBonus()
{
    return getSlaveParam('bonus')
}
