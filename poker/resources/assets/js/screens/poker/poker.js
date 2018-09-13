/**
* dragon-tiger.js
* @author Marjo Sobrecaray
* @since 2017.05.10
* @version 1.0
* Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** screen/container for all game components. handles preloading and loading screen and adding components to stage **/

import Xpacket from '../../lib/XPacket';
import {  createSprite,
  randomNum,
  createCardSprite,
  numberCounter,
  playSound,
  numberWithCommas,
  createSpriteRoadMap} from '../../factories/factories';

  //===common components
  import chips from '../../components/commons/chips';
  import timer from '../../components/commons/timer';

  import game_buttons from '../../components/commons/gameButtons';
  // import player_info from '../../components/commons/playerInfo';
  import bet_board from '../../components/commons/table';
  import channel from '../../components/commons/channel';
  import dealer from '../../components/commons/dealer';
  import win_result from '../../components/commons/winning';
  import messages from '../../components/commons/messages';
  import menuEvents from '../../components/commons/menuEvents';
  import menuSettingsEvents from '../../components/commons/menuSettingsEvents';
  import lastRounds from '../../components/commons/lastRounds';

  // import menu from '../../components/commons/menu';
  import betRecords from '../../components/commons/menuBetRecords';
  import transfer from '../../components/commons/menuTransfer';
  import menuChips from '../../components/commons/menuChips';
  import settings from '../../components/commons/menuSettings';
  import menuPlayerInfo from '../../components/commons/menuPlayerInfo';
  import howToPlay from '../../components/commons/menuHowToPlay';
  import menuVideoSettings from '../../components/commons/menuVideoSettings';
  import bet_indicator from '../../components/commons/betIndicator';

  import notifications from '../../components/commons/notifications';
  import announcement from '../../components/commons/announcement';
  import winChips from '../../components/commons/winChips';
  import toggle from '../../components/commons/toggle';
  import lines from '../../components/commons/lines';

  //===uncommon components
  import test_button from '../../components/poker/test_button';
  import drawn_table from '../../components/poker/tableDraw2';
  // import game_info from '../../components/poker/gameInfo';
  import card_result from '../../components/poker/cardResult';
  import fake_card_result from '../../components/poker/fake-cardResult';
  import dealer_data from '../../components/poker/dealer_data';
  import scoreboard from '../../components/poker/scoreboard';
  import card_extra from '../../components/poker/cardResultExtra';
  import winning_assets from '../../components/poker/dtWinningAsset';
  import bet_details from '../../components/poker/betDetails';
  import win_amount from '../../components/poker/winAmount';
  import menuBetData from '../../components/poker/menuBetData';

  import card_win from '../../components/poker/cardWinRes';
  import payoutInfo from '../../components/poker/payoutInfo';

  import winRes from '../../components/poker/winRes';
  import tableOutline from '../../components/poker/outline';

  import multibet from '../../components/multibet/multibet';
  import multibetv2 from '../../components/multibet/multibetv2';
  import multibetNav from '../../components/multibet/multibetNav';
  import multibetTableDraw from '../../components/multibet/multibetTableDraw';
  import multibetBetting from '../../components/multibet/multibetBetting';
  import multibetBetting2 from '../../components/multibet/multibet-betting2';
  import multibetButtons from '../../components/multibet/multibetButtons';
  import multibetRoadmap from '../../components/multibet/multibetRoadmap';

  import betButtonsExtra from '../../components/poker/betButtonsExtra2';

  // import roadmap_data from '../../components/poker/ingame-roadmap_data';
  import roadmap from '../../components/poker/ingame-roadmap';
  import multibet_sidebar from '../../components/poker/multibetSide';
  //===unique game configuration
  import betboard_config from '../../assets/dt_betboard_config';
  import theme_config from '../../assets/theme_colors_config';
  import opposite_bet from '../../assets/dt_betarea_opposite_condition';
  //===ingmae tutorial for first time users
  import ingame_tutorial from '../../components/poker/ingame-tutorial';
  //===loading screen/animation
  import loading_init from '../../screens/loading_init';
  import load from '../../screens/loading';
  //===dragon tiger events
  // import listen from '../../listeners/poker-events';

  import listen from '../../listeners/poker-events2';
  //=== links for gamebuttons
  let links = {
    confirm: `/bet/store/${window.tableNum}/${window.range}`,
    cancel: `/bet/cancel/${window.tableNum}/${window.range}`,
    getDetails: "/details/getDetails",

    videoSetting: "/settings/videoSetting",

    getTransferLogs: '/'+window.tableNum+'/'+window.range+"/transferlogs",
    getBetLogs: '/'+window.tableNum+'/'+window.range+"/betlogs",
    getGameHistory: '/'+window.tableNum+'/'+window.range+"/gamehistory",

    setFoldCheck: `/bet/setFoldCheck/${window.tableNum}`
  };

  let log_type = window.bet_type;

  let win_suits = ["win_heart","win_clubs","win_spade","win_diamond","win_heart","win_clubs","win_spade","win_diamond"];

  let initData = {
    userId : window.userId,
    range : window.range,
    userName : window.user_name,
    vendor_id : window.vendor_id,
    vendorEndDate: window.vendorEndDate
  }

  let tableSlave = window.bet_type == 'b' ? 'bonusplus' : 'normal';

  export default new blu.Screen({
    resources: "/assets.json",

    // component_menu : menu(),
    component_menuEvents : menuEvents(),
    component_menuSettingsEvents : menuSettingsEvents(),
    component_betRecords : betRecords(links, log_type),
    component_transfer : transfer(),
    component_menuChips : menuChips(),
    component_settings : settings(),
    component_menuPlayerInfo : menuPlayerInfo(),
    component_howToPlay : howToPlay(),
    component_menuVideoSettings : menuVideoSettings(links),
    component_menuBetData : menuBetData(links, log_type),
    component_lastRounds : lastRounds(),
    component_notifications: notifications(),
    component_announcement : announcement(),
    component_winChips : winChips(),
    component_toggle : toggle(),
    component_lines : lines(),

    // component_gameInfo : game_info(),
    component_betBoard : bet_board(log_type),
    component_chips : chips(opposite_bet),
    component_gameButtons : game_buttons(links),
    component_timer : timer(),
    component_messages: messages(),
    component_card_result : card_result(),
    component_fake_cardResult: fake_card_result(),
    component_card_winning_res : card_win(),
    component_winnings: win_result(win_suits),

    component_dealer : dealer(),
    component_dealer_data : dealer_data(),
    // component_playerInfo: player_info(),
    component_roadmap : roadmap(),

    component_betDetails: bet_details(),
    component_channel: channel(),

    component_scoreBoard: scoreboard(),
    component_winning_assets: winning_assets(),
    // component_betindicator: bet_indicator(),
    component_winAmount: win_amount(),
    component_tableDraw: drawn_table(betboard_config, log_type),
    component_testButton : test_button(),
    component_tableOutline: tableOutline(),

    // omponent_multibetbar: multibet_sidebar(),
    // component_multinav: multibetNav(),
    // component_multibet: multibet(),
    // component_multibetTableDraw: multibetTableDraw(),
    // component_multibetBetting: multibetBetting(),
    component_multibetv2: multibetv2(),
    component_multibetBetting2: multibetBetting2(),
    component_multibetButtons  : multibetButtons(),
    component_multibetRoadmap  : multibetRoadmap(),

    component_cardExtra : card_extra(),

    component_winRes :  winRes(),

    component_payoutInfo : payoutInfo(),

    component_extraBetButtons : betButtonsExtra(),

    theme_color: theme_config(),
    component_ingameTutorial : ingame_tutorial(),
    loaded_asset: function (e) {
      this.loaded = e;
    },
    success_bet : [],
    loading: function(e) {
      // load(e,this);
      try{
        window.videoStream.setMuted(true);
        window.videoStream.setVolume(0);
      }
      catch(err) {

      }
      $(".card--percent").html("" + Math.round((e * 100)) + "%")
    },
    getTheme() {
      return window.theme = 'black';
    },
    init () {
      // loading_init(this);
    },
    chipsMultiplier : window.currencyAbbrev === "PTS" ? 1 : 1,
    current_action : "",
    actions : [],
    confirm_clicked : false,
    confirm_failed: false,
    repeat_clicked : 0,
    mobile: false,
    currentLog : null,

    player_data : {
      total_bets : 0,
      total_win : 0
    },
    junketAgent: window.junket == 2 ? true : false,
    roundphase : "",
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
      'PTS': ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000', 'max'],
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

      function isFlashEnabled()
      {
        var hasFlash = false;
        try
        {
          var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
          if(fo) hasFlash = true;
        }
        catch(e)
        {
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


      playSound('welcome');

      listen(this, log_type);

      if (window.user_type == 'S') {
        $('#player').hide();
      }

      createjs.MotionGuidePlugin.install(createjs.Tween);

      let self = this;


      this.addComponent(this.component_tableOutline);
      this.addComponent(this.component_tableDraw);

      this.addComponent(this.component_betBoard);
      this.component_betBoard.addChild(this.component_tableDraw.classic_outline);
      this.component_betBoard.addChild(this.component_tableDraw.chips_container);

      this.addComponent(this.component_toggle);
      this.addComponent(this.component_card_winning_res);

      this.addComponent(this.component_winChips);
      this.addComponent(this.component_winRes);

      this.addComponent(this.component_winning_assets);
      this.addComponent(this.component_winnings);


      // this.addComponent(this.component_betindicator);
      this.addComponent(this.component_ingameTutorial);
      this.addComponent(this.component_gameButtons);
      this.addComponent(this.component_extraBetButtons);
      this.addComponent(this.component_lastRounds);
      this.addComponent(this.component_notifications);
      this.addComponent(this.component_announcement);

      // this.addComponent(this.component_multibetbar);
      // this.addComponent(this.component_multibet);
      // this.addComponent(this.component_multibetRoadmap);
      // this.addComponent(this.component_multinav);
      // this.addComponent(this.component_multibetBetting);
      // this.addComponent(this.component_multibetButtons);

      this.addComponent(this.component_multibetv2);
      this.addComponent(this.component_multibetBetting2);

      // this.addComponent(this.component_gameInfo);

      this.addComponent(this.component_timer);
      this.addComponent(this.component_channel);
      this.addComponent(this.component_roadmap);
      this.addComponent(this.component_betDetails);
      // this.addComponent(this.component_dealer_data);
      this.addComponent(this.component_chips);
      this.addComponent(this.component_scoreBoard);
      this.component_scoreBoard.visible = false;

      // this.addComponent(this.component_payoutInfo);


      // this.addComponent(this.component_menu);
      this.addComponent(this.component_menuEvents);
      this.addComponent(this.component_menuSettingsEvents);
      // this.addComponent(this.component_menuBetData);
      this.addComponent(this.component_betRecords);
      // this.addComponent(this.component_transfer);
      this.addComponent(this.component_menuChips);
      // this.addComponent(this.component_settings);
      // this.addComponent(this.component_howToPlay);
      // this.addComponent(this.component_menuVideoSettings);
      this.addComponent(this.component_dealer);
      this.addComponent(this.component_menuPlayerInfo);
      this.component_menuPlayerInfo.visible = false;
      this.addComponent(this.component_cardExtra);

      this.addComponent(this.component_lines);
      this.addComponent(this.component_card_result);
      this.component_card_result.x = 1200;
      this.component_card_result.y = (this.context.height - 180) + 25;
      // this.addComponent(this.component_fake_cardResult);

      this.addComponent(this.component_winAmount);
      this.addComponent(this.component_messages);

      this.socket.on("disconnect", ()=>{
        this.initRound();
        this.connect();
      })

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

      this.connect();
      window.component_has_loaded = true;

      this.toggleBet();
      window.setVideoVol()

      // Check if table is disabled
      if (window.vendorTable && window.junket) { // !_.isEmpty(window.vendorData
        let vendorTable = JSON.parse(window.vendorTable);
        for (var i = 0; i < vendorTable.disable_table.length; i++) {
          if (vendorTable.disable_table[i] == `${window.game}-${window.tableNum}`) {
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

        $.post('/checkTable', {vendorId: window.vendor_id}, (response) => {
          let disabledTables = JSON.parse(response[0].junket_table).disable_table;
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

      $(".channel-con.-betrange > span").on('click', function () {
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
        if(_.find(self.component_betBoard.bet_areas, function(area) {return area.chips.length}) !== undefined) {
          self.component_messages.setMessage('cannot switch', 1);
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
        } else if (mainAreaMin > 999) {
          mainAreaMin = `${mainAreaMin / 1000}K`;
        }

        if (mainAreaMax > 999999) {
          mainAreaMax = `${mainAreaMax / 1000000}M`;
        } else if (mainAreaMax > 999) {
          mainAreaMax = `${mainAreaMax / 1000}K`;
        }

        $('#range-disp').html(`${mainAreaMin} - ${mainAreaMax}`);
      });
    },
    toggleRange(range) {
      $.post("/setGameSettings", {range : range, game: `${window.game}/${window.tableNum}`});

      this.socket.emit('data', {
        eventName: 'edit-bet-range',
        oldRange : initData.range,
        userId: window.userId
      })

      initData.range = range;
      this.component_toggle.toggleRange(range); //changing bet range amt for each areas
      // this.component_multiplayer.reset();
      this.component_betBoard.clearTableChipBets();
      this.connect();
    },
    connect() {
      this.socket.emit('data', { eventName :'room', data: initData }, (d) => {
        d.roomates = _.filter(d.roomates, (e) => {
          return e.id != window.userId;
        });

        d.roomates.forEach((e) => {
          e.name = e.userName;
          e.id = e.userId;
        });

        let user = _.filter(d.roomates, (e) => {
          return e.userId == window.userId
        });

        if(!user.length) return;
        this.component_gameButtons.is_confirmed_bet = true;

        let data = [];
        if(!user[0].bets.length) return;

        //set active slave to saved bets
        window.slave = tableSlave = user[0].bets[0].slave;

        if(user[0].bets.length) {
          window.slave = slave = user[0].bets[0].slave;
        }

        window.bet_type = window.slave === 'bonusplus' ? 'b' : 'r';
        this.saved_bets = _.filter(user[0].bets, { 'slave' : tableSlave });

        var button = window.slave === 'bonusplus' ? this.component_toggle.bonusButton: this.component_toggle.classicButton;
        this.component_toggle.toggleSlave(button);
        //end

        this.component_gameButtons.yourBets = [];
        let total_bet_amt = 0;

        this.saved_bets.forEach( (row) => {
          data.push({
            amount : row.bet_amount,
            table_id : row.bet
          });

          this.component_gameButtons.yourBets.push({
            "amount" : row.bet_amount,
            "table_id" : row.bet
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

        let flopBet = _.find(this.saved_bets, (e) => {return e.bet == 'flop'});
        let turnBet = _.find(this.saved_bets, (e) => {return e.bet == 'turn'});
        let riverBet = _.find(this.saved_bets, (e) => {return e.bet == 'river'});

        if(!_.isEmpty(flopBet)) {
          if(flopBet.bet_amount) {
            this.component_extraBetButtons.setFlopBet(flopBet.bet_amount, true)
          } else if(!flopBet.bet_amount && flopBet.cancel) {
            this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.flop_area, "fold", true);
            this.component_extraBetButtons.foldCheckStatus.flop = 1;
            $.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'flop'})
          }
        }

        if(!_.isEmpty(turnBet)) {
          if(turnBet.bet_amount) {
            this.component_extraBetButtons.setTurnBet(turnBet.bet_amount, true)
          } else if(!turnBet.bet_amount && turnBet.cancel) {
            this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.turn_area, "check", true);
            this.component_extraBetButtons.foldCheckStatus.turn = 1;
            $.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'turn'})
          }
        }

        if(!_.isEmpty(riverBet)) {
          if(riverBet.bet_amount) {
            this.component_extraBetButtons.setRiverBet(riverBet.bet_amount, true)
          } else if(!riverBet.bet_amount && riverBet.cancel) {
            this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.river_area, "check", true);
            this.component_extraBetButtons.foldCheckStatus.river = 1;
            $.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'river'})
          }
        }

        this.component_betDetails.bet_amount = total_bet_amt;
        this.component_betDetails.reinit();

        this.component_gameButtons.previousBet = this.component_gameButtons.yourBets;
        this.component_gameButtons.repeatBet(true, true);
        this.component_gameButtons.checkButtonState();

        if (this.component_gameButtons.previousBet.length) {
          this.component_betBoard.chipWrap.visible = false;
        }

        this.component_extraBetButtons.extraTimeHandle('start');
      });

      //tets receive bet
      // $("#flopbet").on("click", ()=>{
      //   var d = {"id":2906,"seat":0,"type":"bet","data":[{"roundNum":80961,"bet_amount":150000,"cancel":0,"name":"PH7365","id":2906,"bet":"ante","is_mobile":false,"currency":"N","slave":"normal"},{"roundNum":80961,"bet_amount":5000,"cancel":0,"name":"PH7365","id":2906,"bet":"bonus","is_mobile":false,"currency":"N","slave":"normal"},{"roundNum":80961,"bet_amount":300000,"cancel":0,"name":"PH7365","id":2906,"bet":"flop","is_mobile":false,"currency":"N","slave":"normal"},{"roundNum":80961,"bet_amount":0,"cancel":0,"name":"PH7365","id":2906,"bet":"turn","is_mobile":false,"currency":"N","slave":"normal"},{"roundNum":80961,"bet_amount":0,"cancel":0,"name":"PH7365","id":2906,"bet":"river","is_mobile":false,"currency":"N","slave":"normal"}]};
      //   this.multiplayerBet(d)
      // });

      // $("#turnfold").on("click", ()=>{
      //   var d = {"id":2906,"seat":0,"type":"bet","data":[{"roundNum":80961,"bet_amount":150000,"cancel":0,"name":"PH7365","id":2906,"bet":"ante","is_mobile":false,"currency":"N","slave":"normal"},{"roundNum":80961,"bet_amount":5000,"cancel":0,"name":"PH7365","id":2906,"bet":"bonus","is_mobile":false,"currency":"N","slave":"normal"},{"roundNum":80961,"bet_amount":300000,"cancel":0,"name":"PH7365","id":2906,"bet":"flop","is_mobile":false,"currency":"N","slave":"normal"},{"roundNum":80961,"bet_amount":0,"cancel":1,"name":"PH7365","id":2906,"bet":"turn","is_mobile":false,"currency":"N","slave":"normal"},{"roundNum":80961,"bet_amount":0,"cancel":0,"name":"PH7365","id":2906,"bet":"river","is_mobile":false,"currency":"N","slave":"normal"}]};
      //   this.multiplayerBet(d)
      // });
      ///


      this.socket.on("multi-player", (data) => {
        data = Xpacket.received(data)
        switch(data.type) {
          // case "bet" :
            // this.multiplayerBet(data);
            // break;

          // case "cancel" :
            // if(data.id == window.userId) {
            //   let tableSlave = window.bet_type == 'b' ? 'bonusplus' : 'normal';

            //   console.log(data, "multi-player", tableSlave, data.data[0].slave)
            //   if(data.data[0].slave !== tableSlave) return;

            //   // ** clears bet deteails**//
            //   this.component_gameButtons.previousBet = _.filter((e) => {
            //     e.is_confirmed =false;
            //     return e;
            //   });

            //   this.context.user_money += this.component_betDetails.bet_amount;
            //   this.component_betDetails.bet_amount = 0;
            //   this.component_betDetails.reinit(true);

            //   this.component_gameButtons.is_confirmed_bet = false;
            //   this.component_gameButtons.yourBets = [];
            //   this.component_betBoard.clearTableChipBets();

            //   this.component_betBoard.bet_cnt = 0;
            // }
            // break;

          case "leave" :
            let redirectTo = window.lobby_domain;

            if (window.junket && data.data.id == window.userId) {
              $('.junket-confirm').show();
              $('.mdl_message').html(window.language2.com_sub_ingameprompts_expiredroom);
              $('.mdl_lobby').html(`<span>${window.language2.com_sub_rooms_confirm}</span>`);
              $('.mdl_message').css({ 'padding-top': '17px' });
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
            break;
        }
      });
    },
    multiplayerBet (data) {
      // if(data.id == window.userId) {
      //   let total = 0;
      //   let bets = [];
      //   let actions = [];

      //   let flop_turn_river_tot = 0;

      //   //removing and adding fold check chips
      //   let foldCheck = [];
      //   this.component_tableDraw.chips_container.children.forEach((e) => {
      //     if(e.fold_check_chip) {
      //       foldCheck.push(e);
      //     }
      //   });

      //   this.component_tableDraw.chips_container.removeAllChildren();

      //   foldCheck.forEach((a) => {
      //     // this.component_tableDraw.chips_container.addChild(a);
      //   });

      //   for(var x = 0; x < data.data.length;x++) {

      //     if(tableSlave == data.data[x].slave) {

      //       if(data.data[x].bet == 'pocket') {
      //         data.data[x].bet = 'bonus';
      //       }

      //       bets[x] = {
      //         "amount" : data.data[x].bet_amount,
      //         "table_id" : data.data[x].bet,
      //         "cancel" : data.data[x].cancel,
      //         "is_confirmed" : true
      //       }

      //       if(data.data[x].bet == "flop") {
      //         if(parseInt(data.data[x].bet_amount) > 0){

      //           this.component_extraBetButtons.setFlopBet(data.data[x].bet_amount, true)
      //           this.component_extraBetButtons.flop_bet_button.visible = false;
      //           this.component_extraBetButtons.fold_check_btn.visible = false;
      //         }

      //         if(data.data[x].cancel && !this.component_extraBetButtons.fold_check_btn.has_fold){
      //           this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.flop_area,"fold", true);
      //           this.component_extraBetButtons.fold_check_btn.has_fold = true;
      //           this.component_extraBetButtons.flop_bet_button.visible = false;
      //           this.component_extraBetButtons.fold_check_btn.visible = false;
      //         }
      //       }
      //       if(data.data[x].bet == "turn") {

      //         if(parseInt(data.data[x].bet_amount) > 0) {

      //           this.component_extraBetButtons.setTurnBet(data.data[x].bet_amount, true)
      //           this.component_extraBetButtons.turn_bet_button.visible = false;
      //           this.component_extraBetButtons.fold_check_btn.visible = false;
      //         }

      //         console.log(this.component_extraBetButtons.fold_check_btn.has_fold, "hasfold", this.component_tableDraw.flop_area.total_bet_amt, this.component_extraBetButtons.fold_check_btn.has_check_turn);
      //         if(data.data[x].cancel) {
      //           if(this.component_tableDraw.flop_area.total_bet_amt  && !this.component_extraBetButtons.fold_check_btn.has_check_turn && (this.component_extraBetButtons.fold_check_btn.has_fold || !this.component_extraBetButtons.fold_check_btn.has_fold)) {
      //             this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.turn_area,"check", true);
      //             this.component_extraBetButtons.setTurn = true
      //             this.component_extraBetButtons.fold_check_btn.has_check_turn = true;
      //             this.component_extraBetButtons.turn_bet_button.visible = false;
      //             this.component_extraBetButtons.fold_check_btn.visible = false;
      //           }

      //           if(!this.component_tableDraw.flop_area.total_bet_amt && !this.component_extraBetButtons.fold_check_btn.has_fold) {
      //             this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.turn_area,"check", true);
      //             this.component_extraBetButtons.setTurn = true
      //             this.component_extraBetButtons.fold_check_btn.has_check_turn = true;
      //             this.component_extraBetButtons.turn_bet_button.visible = false;
      //             this.component_extraBetButtons.fold_check_btn.visible = false;
      //           }
      //         }

      //       }
      //       if(data.data[x].bet == "river") {

      //         if(parseInt(data.data[x].bet_amount) > 0) {

      //           this.component_extraBetButtons.setRiverBet(data.data[x].bet_amount, true)
      //           this.component_extraBetButtons.river_bet_button.visible = false;
      //           this.component_extraBetButtons.fold_check_btn.visible = false;

      //         }

      //         if(data.data[x].cancel) {
      //           if(this.component_tableDraw.flop_area.total_bet_amt  && !this.component_extraBetButtons.fold_check_btn.has_check_river &&  (this.component_extraBetButtons.fold_check_btn.has_fold || !this.component_extraBetButtons.fold_check_btn.has_fold)) {
      //             this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.river_area,"check", true);
      //             this.component_extraBetButtons.setRiver = true
      //             this.component_extraBetButtons.fold_check_btn.has_check_river = true;
      //             this.component_extraBetButtons.river_bet_button.visible = false;
      //             this.component_extraBetButtons.fold_check_btn.visible = false;
      //           }

      //           if(!this.component_tableDraw.flop_area.total_bet_amt && !this.component_extraBetButtons.fold_check_btn.has_fold) {
      //             this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.river_area,"check", true);
      //             this.component_extraBetButtons.setRiver = true
      //             this.component_extraBetButtons.fold_check_btn.has_check_river = true;
      //             this.component_extraBetButtons.river_bet_button.visible = false;
      //             this.component_extraBetButtons.fold_check_btn.visible = false;
      //           }
      //         }

      //       }

      //       total += data.data[x].bet_amount;

      //       actions[x] = {
      //         chip_amount_used:data.data[x].bet_amount,
      //         drop_area: data.data[x].bet
      //       }
      //     }
      //   }

      //   this.component_gameButtons.process_confirm = false;
      //   this.component_gameButtons.bet_saved = true;
      //   // this.component_playerInfo.total_bets++;

      //   //**change bet detaik **//
      //   this.context.user_money += this.component_betDetails.bet_amount;
      //   this.context.user_money -= total;
      //   this.component_betDetails.bet_amount = total;
      //   this.component_betDetails.reinit(false);

      //   this.component_chips.actions = actions;


      //   this.component_gameButtons.yourBets = bets;
      //   this.component_gameButtons.previousBet = bets;
      //   this.success_bet = bets;

      //   this.component_timer.removeUnconfirmedChips();
      //   this.component_gameButtons.repeatBet();

      //   this.component_betBoard.bet_areas.forEach(function(betarea) {
      //     betarea.chips = _.filter(betarea.chips, function(e) { e.confirmed_bet = true; return e; });
      //   });

      //   this.component_gameButtons.checkButtonState();
      //   this.user_no_bet_count = 0;
      // }
    },

    toggleView (view) {
      // if(window.tutorial_enabled){
      //   this.component_scoreBoard.visible = true;
      //   this.component_roadmap.visible = true;
      //   this.component_card_result.visible = false;
      //   this.component_cardExtra.visible = false;
      // } else  {
      //
        // if(view == "result") {
      //     this.component_scoreBoard.visible = false;
      //     this.component_roadmap.visible = false;
          // this.component_card_result.visible = true;
      //     this.component_cardExtra.visible = true;
      //   } else if (view == "game") {
      //     this.component_scoreBoard.visible = true;
      //     this.component_roadmap.visible = true;
      //     this.component_card_result.visible = false;
      //     this.component_cardExtra.visible = false;
        // }
      // }

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
        case 'insert-fold':
        case 'insert-check':
          comment = `${target.table_name}, ${type.split('-')[1]}`
          this.actionlogs[0].comment = comment;
          this.actionlogs[0].action = 'insert';
          this.log()
          break;

        case 'insert-flop':
        case 'insert-turn':
        case 'insert-river':
          comment = `${type.split('-')[1]}, ${target}`
          this.actionlogs[0].comment = comment;
          this.actionlogs[0].action = 'insert';
          this.log()
          break;

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
            let betAreaName = this.component_gameButtons.previousBet[x].table_id;
            if (betAreaName == 'bonus' || betAreaName == 'bonusplus' || betAreaName == 'pocket') continue;

            rCmt += `, ${betAreaName} ${this.component_gameButtons.previousBet[x].amount}`;
            this.tempLog.push({comment: `${betAreaName}, ${this.component_gameButtons.previousBet[x].amount}`});
          }
          comment = `repeat${rCmt}`
          this.actionlogs[0].comment = comment;
          this.log();
          break;

        case 'fail':
          this.actionlogs = [{
            action: type,
            comment: `${target}`,
            timeDate: this.fnFormatTime(new Date().getTime(), 'MM/dd/yyyy HH:mm:ss')
          }];
          this.log();

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
    actionCallback(type, param, isMain = true) {

      this.callback(null, type);

      let range = '';
      let mainarea = _.find(this.component_betBoard.bet_areas, (area) => {
          return area.table_name === 'ante';
      });
      range = `${mainarea.min_betAmt}-${mainarea.max_betAmt}`;
      // tableSlave = this.getSlave();

      switch(type) {
        case "clear":
          let betAmount = this.component_betDetails.bet_amount;

          // this.confirm_clicked = false;
          // this.repeat_clicked = 0;
          // this.current_action = "clear";

          this.is_repeat = 0;
          this.current_action = "clear";

          this.component_gameButtons.process_clear = true;

          this.socket.emit('data', {
            eventName : 'cancel',
            tableId: window.tableNum,
            roundNum: parseInt(this.component_dealer.round_id),
            data : [{
              roundNum : parseInt(this.component_dealer.round_id),
              range : initData.range,
              name : window.user_name,
              id : window.userId,
              slave : window.bet_type === 'b' ? 'bonusplus' : 'normal'
            }]
          }, function (e) {

          });

          $.post(links.cancel, {
            logs : this.actionlogs,
            slave : window.bet_type === 'b' ? 'bonusplus' : 'normal',
            device: 'w',
            type: window.bet_type,
            data: this.component_gameButtons.yourBets,
            range: range
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
              // this.component_gameButtons.process_confirm = false;
              this.component_gameButtons.checkButtonState();
              this.component_gameButtons.responseClear();

              // this.component_playerInfo.total_bets--;
            } else {
              this.component_gameButtons.process_clear = false;
              this.component_gameButtons.process_confirm = false;
              this.component_gameButtons.checkButtonState();

              this.component_gameButtons.is_clear = false
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

          this.user_no_bet_count = 0;
          this.current_action = "insert";

          let data = [];
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
            let logData = [{'action' : 'confirm '+this.roundphase, 'comment' : 'total, '+totalBetAmt, 'user_money' : parseInt(this.context.user_money)}]

            $.post(links.confirm, {
              data: this.component_gameButtons.yourBets,
              logs : this.actionlogs,
              type : window.bet_type,
              device : 'w',
              range: range
            }, (response) => {
              let betdata = [];
              let isfail = parseInt(response.fail) ? true : false;
              if(typeof response.data === 'string') {
                response.data = JSON.parse(response.data);
              }

              for(var key in response.data) {
                betdata.push({
                  bet_money: response.data[key].bet,
                  bet: key,
                  cancel : response.data[key].cancel === undefined ? 0 : response.data[key].cancel
                })
              }

              // === Ping fail handling
              if (response.pingFail) {
                this.callback('', 'ping');

                if (!betdata.length) {
                  this.component_messages.setMessage(window.language.prompts['promptbetfail'+(response.fail == 2 ? '2' : '')], 1);

                  this.component_gameButtons.previousBet.forEach( (e) => {
                    e.is_confirmed = false
                  })

                  this.confirm_failed = true;
                  this.component_gameButtons.is_confirmed_bet = false;
                  this.component_gameButtons.process_confirm = false;

                  this.component_betBoard.bet_areas.forEach(function(betarea) {
                    for(var a = 0; a < betarea.chips.length; a++) {
                      betarea.chips[a].confirmed_bet = false;
                      betarea.chips[a].is_confirmed = false;
                    }
                  });

                  this.context.user_money = response.money;
                  this.component_betDetails.bet_amount = 0;
                  this.component_chips.actions = [];
                  this.component_timer.removeUnconfirmedChips(true);
                  this.component_gameButtons.checkButtonState();

                  this.component_betDetails.reinit(true);

                  return;
                }
              }
              // === End of ping fail handling

              this.success_bet = [];
              let emit_data = [];

              if(betdata.length) {
                let total = 0;

                betdata.forEach((bet) =>{
                  if((bet.bet_money > 0 && !bet.cancel) || (!bet.bet_money && bet.cancel)) {
                    this.success_bet.push({
                        'amount' : bet.bet_money,
                        'table_id' : bet.bet,
                        'is_confirmed': true
                    }) ;

                    emit_data.push({
                      "roundNum" : parseInt(this.component_dealer.round_id),
                      "bet_amount" : bet.bet_money,
                      "name" : window.user_name,
                      "id" : window.userId,
                      "bet" : bet.bet,
                      "is_mobile" : this.mobile,
                      'currency' : window.casino,
                      "slave" : window.bet_type === 'b' ? 'bonusplus' : 'normal',
                      "cancel" : bet.cancel === undefined ? 0 : bet.cancel,
                      'currencyMultiplier' : window.currencyMultiplier,
                      'userMultiplier' : window.userMultiplier
                    });
                  }
                  total += bet.bet_money;
                });

                this.socket.emit('data', {
                    eventName: 'bet',
                    data: emit_data,
                    gameName: 'Poker',
                    tableId: window.tableNum,
                    roundNum: parseInt(this.component_dealer.round_id)
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

                this.confirm_failed = false;
                this.component_gameButtons.bet_saved = true;

                this.component_gameButtons.repeatBet(true, false, true);
                if(this.roundphase === 'startround') {
                  this.component_gameButtons.checkButtonState();
                }

                if(isfail) {
                  this.component_messages.setMessage(window.language.prompts['promptbetfail'+(response.fail == 2 ? '2' : '')], 1);
                  this.handleExtraFail(betdata)
                }
              } else if(isfail && !betdata.length) {
                if (isMain) {
                  this.callback('ante', 'fail');

                  if (this.component_tableDraw.flop_area.chips.length) {
                    this.removeChips('flop');
                  }
                }
                // else { // if (!response.data.length && !isMain)
                //   if (this.roundphase != 'flop') {
                //     if (this.component_betBoard.bet_areas[0].chips.length) {
                //       this.removeChips('flop');
                //     }
                //   }
                  // else if (this.roundphase == 'turn') {
                  //   this.removeChips('flop');
                  //   this.removeChips('turn');
                  // }f
                  // else if (this.roundphase == 'river') {
                  //   this.removeChips('flop');
                  //   this.removeChips('turn');
                  //   this.removeChips('river');
                  // }
                // }

                this.component_messages.setMessage(window.language.prompts['promptbetfail'+(response.fail == 2 ? '2' : '')], 1);
                this.component_gameButtons.previousBet.forEach( (e) => {
                    e.is_confirmed = false
                })

                this.confirm_failed = true;
                this.component_gameButtons.is_confirmed_bet = false;
                this.component_gameButtons.process_confirm = false;

                this.component_betBoard.bet_areas.forEach(function(betarea) {
                  for(var a = 0; a < betarea.chips.length; a++) {
                    betarea.chips[a].confirmed_bet = false;
                    betarea.chips[a].is_confirmed = false;
                  }
                });

                this.context.user_money += this.component_betDetails.bet_amount;
                this.component_betDetails.bet_amount = 0;
                this.component_chips.actions = [];
                this.component_timer.removeUnconfirmedChips(true);
                this.component_gameButtons.checkButtonState();
              }

              // reinit user money
              if(window.casino == "SS") {
                this.context.user_money = parseFloat(response.money).toFixed(2);
              } else {
                this.context.user_money = parseInt(response.money);
              }

              this.component_betDetails.reinit(true);
            })
            .fail( (e) => {
              this.component_messages.setMessage(window.language.prompts.promptbetfail, 1);
              this.component_gameButtons.process_confirm = false;

              this.component_gameButtons.previousBet = _.filter(this.component_gameButtons.previousBet, (e) => { return _.find(this.success_bet, (a) => {return e.table_id === a.table_id}) })
              this.component_gameButtons.previousBet.forEach((e) => {
                e.is_confirmed = true;
              });

              switch(this.roundphase) {
                case "startround":
                  this.confirm_failed = true;
                  this.component_gameButtons.is_confirmed_bet = false;

                  this.component_betBoard.bet_areas.forEach(function(betarea) {
                    for(var a = 0; a< betarea.chips.length; a++) {
                      betarea.chips[a].confirmed_bet = false;
                    }
                  });

                  this.context.user_money += this.component_betDetails.bet_amount;
                  this.component_betDetails.bet_amount = 0;
                  this.component_betDetails.reinit(true, "on fail");

                  this.component_gameButtons.checkButtonState();
                  // this.component_gameButtons.confirmButton.updateCache();
                  break;
                case "flop" :
                  // this.flopFail();
                  this.handleExtraFail([{bet:'flop'}]);
                  break;
                case "turn" :
                  // this.turnFail();
                  this.handleExtraFail([{bet:'turn'}]);
                  break;
                case "river" :
                  this.handleExtraFail([{bet:'river'}]);
                  // this.riverFail();
                  break;
              } // end switch
            });
          }

          this.actions = [];
          this.logUserMoney = 0;
          break;

        case "repeat" :
          this.current_action = "repeat";
          this.repeat_clicked = this.component_gameButtons.previousBet.length;
          this.component_gameButtons.previousBet.forEach( (e) => {
            this.component_chips.actions.push({
              drop_area : e.table_id,
              chip_amount_used : e.amount
            })
          })
          break;
      }
    },
    removeChips(area) {
      area = this.component_tableDraw[`${area}_area`];
      this.component_tableDraw.stopBetAreaAnimation(this.component_tableDraw[`${area}_area`]);

      if (!this.component_extraBetButtons.foldCheckStatus['flop']) {
        this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.flop_area, 'fold');
      }

      area.total_bet_amt = 0;
      area.chips.forEach((chip) => {
        this.component_tableDraw.chips_container.removeChild(chip);
      });
    },
    handleExtraFail(data) {
      if (this.roundphase == 'startround') return;

      let failed = _.find(data, (e)=> {return e.bet === this.roundphase});
      let area = this.component_tableDraw[`${failed.bet}_area`];

      area.total_bet_amt = 0;
      area.chips.forEach((chip) => {
        this.component_tableDraw.chips_container.removeChild(chip);
      });

      area.chips = [];

      if (this.component_timer.betting_start) {
        this.component_extraBetButtons.showButtons();
      }

      for (var i = 0; i < this.component_gameButtons.yourBets.length; i++) {
        if (this.component_gameButtons.yourBets[i].table_id == this.roundphase) {
          this.component_gameButtons.yourBets[i].amount = 0;
          break;
        }
      }

      // this.component_extraBetButtons.foldCheckStatus[failed.bet] = 1;
      // if(failed.bet === 'flop') this.component_extraBetButtons.setFoldCheck(area, "fold");
      // else  this.component_extraBetButtons.setFoldCheck(area, "check");
    },
    failHandling () {
      switch(this.roundphase) {
        case "flop":
          let flopBet = _.find(this.success_bet, (e) => { return e.table_id == 'flop' });
          if(!parseInt(flopBet.amount)) {
            this.flopFail();
          }
          break;

        case "turn":
          let turnBet = _.find(this.success_bet, (e) => { return e.table_id == 'turn' });
          if(!parseInt(turnBet.amount)) {
            this.turnFail();
          }
          break;

        case "river":
          let riverBet = _.find(this.success_bet, (e) => { return e.table_id == 'river' });
          if(!parseInt(riverBet.amount)) {
            this.riverFail();
          }
          break;
      }
    },
    flopFail(data) {
      // this.component_extraBetButtons.fold_check_btn.has_fold = false;
      // this.component_extraBetButtons.flop_bet_button.visible = true;
      // this.component_extraBetButtons.fold_check_btn.visible = true;

      // this.component_extraBetButtons.setFlop = false;

      // this.component_extraBetButtons.flop_indicator.visible = false;
      // this.component_extraBetButtons.flop_indicator.children[1].text = 0;

      // this.component_betDetails.bet_amount -= parseInt(this.component_tableDraw.flop_area.total_bet_amt);
      // this.context.user_money = parseInt(this.context.user_money) + parseInt(this.component_tableDraw.flop_area.total_bet_amt)
      // this.component_betDetails.reinit(true, "on fail")

      // this.component_tableDraw.chips_container.removeAllChildren();
      // this.component_tableDraw.flop_area.chips = [];
      // this.component_tableDraw.flop_area.total_bet_amt = 0;

      // _.remove(this.component_gameButtons.yourBets, (n) => { return n.table_id == 'flop'; });
    },
    turnFail () {

      // this.component_extraBetButtons.fold_check_btn.has_check_turn = false;
      // this.component_extraBetButtons.turn_bet_button.visible = true;
      // this.component_extraBetButtons.fold_check_btn.visible = true;

      // this.component_extraBetButtons.setTurn = false;

      // this.component_extraBetButtons.turn_indicator.visible = false;
      // this.component_extraBetButtons.turn_indicator.children[1].text = 0;

      // this.component_betDetails.bet_amount -= parseInt(this.component_tableDraw.turn_area.total_bet_amt);
      // this.context.user_money = parseInt(this.context.user_money) + parseInt(this.component_tableDraw.turn_area.total_bet_amt)
      // this.component_betDetails.reinit(true, "on fail")

      // this.component_tableDraw.turn_area.chips = [];
      // this.component_tableDraw.turn_area.total_bet_amt = 0;

      // _.remove(this.component_gameButtons.yourBets, (n) => { return n.table_id == 'turn'; });

      // for (var i = 0; i < this.component_tableDraw.chips_container.children.length; i++) {
      //   let turnArea = this.component_tableDraw.chips_container.children[i];
      //   if (turnArea.droppedAt == 'turn') {
      //     this.component_tableDraw.chips_container.children.splice(i, 1);
      //     i--;
      //   }
      // }
    },
    riverFail() {

      // this.component_extraBetButtons.fold_check_btn.has_check_river = false;
      // this.component_extraBetButtons.river_bet_button.visible = true;
      // this.component_extraBetButtons.fold_check_btn.visible = true;

      // this.component_extraBetButtons.setRiver = false;

      // this.component_extraBetButtons.river_indicator.visible = false;
      // this.component_extraBetButtons.river_indicator.children[1].text = 0;

      // this.component_betDetails.bet_amount -= parseInt(this.component_tableDraw.river_area.total_bet_amt);
      // this.context.user_money = parseInt(this.context.user_money) + parseInt(this.component_tableDraw.river_area.total_bet_amt)
      // this.component_betDetails.reinit(true, "on fail")

      // this.component_tableDraw.river_area.chips = [];
      // this.component_tableDraw.river_area.total_bet_amt = 0;

      // _.remove(this.component_gameButtons.yourBets, (n) => { return n.table_id == 'river'; });

      // for (var i = 0; i < this.component_tableDraw.chips_container.children.length; i++) {
      //   let turnArea = this.component_tableDraw.chips_container.children[i];
      //   if (turnArea.droppedAt == 'river') {
      //     this.component_tableDraw.chips_container.children.splice(i, 1);
      //     i--;
      //   }
      // }
    },
    toggleBet () {

      if(window.bet_type === 'b') {
        this.component_toggle.toggleSlave(this.component_toggle.bonusButton);
        $('.slave-classic').hide();
        $('.slave-bonus').show();
      } else {
        this.component_toggle.toggleSlave(this.component_toggle.classicButton);
        $('.slave-classic').show();
        $('.slave-bonus').hide();
      }

      // if(this.component_gameButtons.yourBets.length) {
      //   return;
      // }
      // var tempBets = [];

      // if (!this.component_gameButtons.is_confirmed_bet) {
      //   this.component_toggle.toggleSlaveBet();
      //   // if (this.component_timer.betting_start) {
      //   // this.component_gameButtons.toggleMultiplayer(false, true);
      //   // }
      // } else {
      //   // if(this.component_timer.betting_start) {
      //   this.component_betBoard.clearTableChipBets();
      //   this.component_gameButtons.repeatBet(false, true);
      //   // }
      // }
      // this.component_toggle.toggleSlave(this.component_toggle[b+'Button'], true);
      // this.component_betBoard.checkTableHighlight();
    },
    endRound() {
      this.component_chips.chips.forEach((chips)=>{
        chips.y = chips.oy;
        chips.shadow = null
      });
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
      this.videoSocket = io(`https://lsv.nihtanv2.com/${streamQuality}`, { path: `/pk${tblNum}` });
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
    },
    initRound () {
      this.actionlogs = [];
      this.tempLog = [];
      this.confirm_failed = false;

      this.component_gameButtons.process_confirm = false;
      this.component_gameButtons.process_clear = false;
      this.component_betBoard.bet_cnt = 0;

      if(this.component_gameButtons.previousBet.length) {
        this.component_gameButtons.repeatButton.visible = true;
        this.component_gameButtons.repeatButton.gotoAndStop("up");;
        this.component_gameButtons.undoButton.visible = false;
      }

      this.component_gameButtons.previousBet.forEach((e)=>{
        e.is_confirmed = false;
      })

      this.component_extraBetButtons.newround();
      this.success_bet = [];
      this.component_winRes.hideRes();

      // ==resetanimation
      this.component_tableDraw.stopBetAreaAnimation(this.component_tableDraw.flop_area);
      this.component_tableDraw.stopBetAreaAnimation(this.component_tableDraw.turn_area);
      this.component_tableDraw.stopBetAreaAnimation(this.component_tableDraw.river_area);

      this.actions = [];
      this.repeat_clicked = 0;

      this.component_gameButtons.main_bet = true;
      this.component_gameButtons.repeat = false;

      this.component_tableDraw.turn_area.total_bet_amt = 0
      this.component_tableDraw.flop_area.total_bet_amt = 0
      this.component_tableDraw.river_area.total_bet_amt = 0

      // Empty chip
      this.component_tableDraw.turn_area.chips = [];
      this.component_tableDraw.flop_area.chips = [];
      this.component_tableDraw.river_area.chips = [];

      this.component_card_winning_res.removeAllChildren();
      this.component_winnings.animationContainer.visible = false;
      this.component_winAmount.total_win_text.alpha = 0;
      this.component_gameButtons.is_confirmed_bet = false;

      this.component_betDetails.win_amount = 0;
      this.component_betDetails.bet_amount = 0;
      this.component_betDetails.reinit(false,"newround");

      delete this.component_card_result.player;
      delete this.component_card_result.community;
      delete this.component_card_result.dealer;

      this.component_winnings.hideResult();
      this.component_card_result.removeAllChildren();
      this.component_chips.actions = [];

      this.component_chips.chips.forEach((chips)=>{
        chips.y = chips.oy;
        // chips.shadow = null
      });

      if(this.component_chips.selected_chip) {
        this.component_chips.selected_chip.y = this.component_chips.selected_chip.y - 10;
      }

      this.component_winnings.visible = false;
      this.component_winning_assets.visible = false;
      this.component_winning_assets.resetWinAssets();
      this.component_chips.total_ingame_bet = 0;

      this.component_betBoard.bet_areas.forEach((e,x)=> {
        e.chips.forEach((chip) => {
          this.component_betBoard.removeChild(chip);
        });
        e.chips = [];
        e.total_bet_amt = 0;
      });

      this.component_tableDraw.resetTable();

      let repeatTotal = 0;

      for (var x = 0; x < this.component_gameButtons.previousBet.length; x++) {
        if(this.component_gameButtons.previousBet[x].table_id == "ante") {
          repeatTotal += (this.component_gameButtons.previousBet[x].amount * 3);
        } else {
          repeatTotal += this.component_gameButtons.previousBet[x].amount
        }
      }

      setTimeout(() => {
        if(parseInt(repeatTotal) > parseInt(this.context.user_money)) {
          this.component_gameButtons.repeat = true;
          this.component_gameButtons.repeatButton.gotoAndStop("disabled");
          this.component_gameButtons.repeatButton.updateCache();
        }
      }, 100)

    }
  });
