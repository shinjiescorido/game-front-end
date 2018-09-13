/**
 * dragon-tiger-mobile.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 **/

/** screen/container for all game components. handles preloading and loading screen and adding components to stage **/

//===common components
import Xpacket from '../../lib/XPacket';
import {
  createSprite,
  randomNum,
  createCardSprite,
  numberCounter,
  playSound,
  numberWithCommas,
  createSpriteRoadMap
} from '../../factories/factories';

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
import menuHowToPlay from '../../components/commons/mobile/menuHowToPlay';
import menuPlayerInfo from '../../components/commons/mobile/menuPlayerInfo';
import menuBetRecords from '../../components/commons/mobile/menuBetRecords';
import menuChips from '../../components/commons/mobile/menuChips';
import menuSettings from '../../components/commons/mobile/menuSettings';
import menuTransfer from '../../components/commons/mobile/menuTransfer';
import announcement from '../../components/commons/mobile/announcement';
// import winChips from '../../components/commons/winChips';


//===uncommon components
import drawn_table from '../../components/dragon_tiger/mobile/table_draw';
import gameInfo from '../../components/dragon_tiger/mobile/gameInfo';
import card_result from '../../components/dragon_tiger/mobile/cardResult';
import fake_card_result from '../../components/dragon_tiger/mobile/fake-cardResult';
import dealer_data from '../../components/dragon_tiger/mobile/dealer_data';
import scoreboard from '../../components/dragon_tiger/mobile/scoreboard';
import card_extra from '../../components/dragon_tiger/mobile/cardResultExtra';
import winning_assets from '../../components/dragon_tiger/mobile/dtWinningAsset';
import bet_details from '../../components/dragon_tiger/mobile/betDetails';
import win_amount from '../../components/dragon_tiger/mobile/winAmount';
import firstView from '../../components/dragon_tiger/mobile/first_view_table';
import firstViewMultiplayer from '../../components/dragon_tiger/mobile/firstViewMultiplayer';

import roomInfo from '../../components/dragon_tiger/mobile/roomInfo';
import multiplayer from '../../components/dragon_tiger/mobile/multiplayer';
import menuBetData from '../../components/dragon_tiger/mobile/menuBetData';
import roadmap from '../../components/dragon_tiger/mobile/ingame-roadmap';
//===ingmae tutorial video overlay
import ingame_overlay from '../../components/dragon_tiger/mobile/ingame-overlay';
//===ingmae tutorial for first time users
import ingame_tutorial from '../../components/dragon_tiger/mobile/ingame-tutorial';
//===unique game configuration
import betboard_config from '../../assets/mobile/dt_betboard_config';
import opposite_bet from '../../assets/mobile/dt_betarea_opposite_condition';
import theme_config from '../../assets/mobile/theme_colors_config';
//===loading screen/animation
import loading_init from '../../screens/loading_init';
import load from '../../screens/loading';
//===dragon tiger events
import listen from '../../listeners/dragonTiger-events';
//=== links for gamebuttons

let links = {
  confirm: `/bet/store/${window.tableNum}/${window.range}`,
  cancel: `/bet/cancel/${window.tableNum}/${window.range}`,
  getDetails: "/details/getDetails",
  videoSetting: "/settings/videoSetting",

  getTransferLogs: '/' + window.tableNum + '/' + window.range + '/' + window.multiplayer + "/transferlogs",
  getBetLogs: '/' + window.tableNum + '/' + window.range + '/' + window.multiplayer + "/betlogs",
  getGameHistory: '/' + window.tableNum + '/' + window.range + '/' + window.multiplayer + "/gamehistory"
}

let log_type = "r";

let win_suits = ["win_heart", "win_clubs", "win_spade", "win_diamond", "win_heart", "win_clubs", "win_spade", "win_diamond"];

// let socket = io.connect(`http://52.192.115.210:81/Dragon-Tiger/${window.tableNum}`);
let socket = io.connect(window.socket+`Dragon-Tiger/${window.tableNum}`, {
    transports: ['websocket']
});

let initData = {
  userId: window.userId,
  range: window.range,
  userName: window.user_name
}

export default new blu.Screen({
  resources: "/dt_assets_mobile.json",

  component_chips: chips(opposite_bet),
  component_betBoard: bet_board(),
  component_gameInfo: gameInfo(),
  component_scoreBoard: scoreboard(),
  component_gameButtons: game_buttons(links),
  component_playerInfo: player_info(),
  component_betDetails: bet_details(),
  component_timer: timer(),
  component_messages: messages(),
  component_card_result: card_result(),
  component_fake_cardResult: fake_card_result(),
  component_channel: channel(),
  component_dealer: dealer(),
  component_dealer_data: dealer_data(),
  component_roadmap: roadmap(),
  component_winnings: win_result(win_suits),
  component_announcement : announcement(),
  component_roomInfo : roomInfo(),
  // component_winChips : winChips(),

  component_menu: menu(),
  component_betRecords: menuBetRecords(links),
  component_menuBetData: menuBetData(links),

  component_winning_assets: winning_assets(),
  component_card_result_total: card_extra(),
  component_winAmount: win_amount(),
  component_tableDraw: drawn_table(betboard_config),
  component_secondView: firstView(),
  component_firstViewMultiplayer: firstViewMultiplayer(),
  component_howToPlay: menuHowToPlay(),
  component_menuPlayerInfo: menuPlayerInfo(),
  component_menuChips: menuChips(),
  component_settings: menuSettings(),
  component_transfer: menuTransfer(),

  component_multiplayer: multiplayer(opposite_bet),
  component_ingameOverlay : ingame_overlay(),
  component_ingameTutorial : ingame_tutorial(),
  multiplayer: false,
  confirm_failed : false,

  actions: [],
  is_repeat: 0,
  mobile: true,
  currentLog : null,
  success_bet : [],
  theme_color: theme_config(),
  chipsMultiplier : window.currencyAbbrev === "PTS" ? 1 : 1,
  detectmob() {
    if (navigator.userAgent.match(/Android/i)) {
      return 'Android';
    } else if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
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
      try{
        window.webkit.messageHandlers.observe.postMessage(`nihmutebutton,${muteString},`);
      } catch(e) {
        // not using ios device
      }
      document.location = 'nihmutebutton://bluefrog?mute=' + muteString;
    } else {

    }
  },
  init() {
    this.stage.resize(window.innerWidth, window.innerHeight);

    if (window.nonInstall) return;
    this.controllermute(1)
    // loading_init(this);
  },
  loading: function(e) {
    $(".card--percent").html("" + Math.round((e * 100)) + "%")
    // load(e,this);
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

    this.controllermute(0)

    var mobileString = this.detectmob();
    try{
      if(mobileString == 'iPhone') window.webkit.messageHandlers.observe.postMessage('nihstartbutton,');
    } catch(e) {
      // not using ios device
    }

    setTimeout(() => {
      $(".wrapper").hide()
      $("body").css("background", "none");
      $("html").css("background", "none");
      $("canvas").css("background", "none");

      // window.removeEventListener('deviceorientation', origOrientation);
    }, 500)

    listen(this);

    createjs.MotionGuidePlugin.install(createjs.Tween);

    let self = this;

    // createjs.Tween.get(this.loading_container)
    // .to({
    //     alpha: 0
    // },0)
    // .call(function() {
    //     self.loading_container.visible = false;
    //     self.loading_chip_container.visible = false;
    // })

    // createjs.Tween.get(this.loading_chip_container)
    // .to({
    //     alpha: 0
    // },0)

    // this.addComponent(this.component_secondView);
    this.addComponent(this.component_ingameOverlay);
    this.addComponent(this.component_secondView);
    this.addComponent(this.component_firstViewMultiplayer);

    this.addComponent(this.component_betDetails);
    this.addComponent(this.component_card_result_total);
    this.addComponent(this.component_card_result);
    this.addComponent(this.component_channel);
    this.addComponent(this.component_scoreBoard);
    this.addComponent(this.component_dealer);

    this.addComponent(this.component_dealer_data);
    this.addComponent(this.component_winning_assets);
    this.addComponent(this.component_winnings);
    this.addComponent(this.component_winAmount);
    this.addComponent(this.component_roomInfo);
    this.addComponent(this.component_menu);

    this.addComponent(this.component_tableDraw);
    this.addComponent(this.component_betBoard);
    this.addComponent(this.component_multiplayer);
    this.addComponent(this.component_gameInfo);
    this.addComponent(this.component_timer);
    this.addComponent(this.component_gameButtons);
    this.addComponent(this.component_playerInfo);

    this.addComponent(this.component_messages);
    this.addComponent(this.component_announcement);
    // this.addComponent(this.component_winChips);

    this.addComponent(this.component_chips);
    this.addComponent(this.component_roadmap);

    this.addComponent(this.component_menuBetData);
    this.addComponent(this.component_betRecords);
    this.addComponent(this.component_menuChips);
    this.addComponent(this.component_menuPlayerInfo);
    this.addComponent(this.component_howToPlay);
    this.addComponent(this.component_transfer);
    this.addComponent(this.component_settings);
    this.addComponent(this.component_ingameTutorial);
    this.addComponent(this.component_fake_cardResult);

    // === Single player view
    this.component_betBoard.visible = false;
    this.component_secondView.visible = true;

    this.component_secondView.on("click", () => {
      this.toggleView();
    });
    // === Single player view

    // === Multiplayer view
    this.component_firstViewMultiplayer.on("click", () => {
      this.toggleView();
    });
    // === Multiplayer view

    if (window.multiplayer) {
      this.component_firstViewMultiplayer.visible = true;
      this.toggleBet();
    } else {
      this.component_card_result_total.on("click", () => {
        this.toggleView();
      });
    }

    socket.on("disconnect", () => {
      this.connect();
    })

    this.connect();

    // === for detecting ios or android
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

    // === New video for non-install version
    if (window.nonInstall) {
      if (getOS() == "Android") {
        $('#popup-gofullscreen').show();
      }

      $('#vidCanvas').show();
      this.setVideo(window.config.video);
    }
    // === New video for non-install version
  },
  connect() {
    socket.emit('data', {
      eventName: 'room',
      data: initData
    }, (d) => {

      d.roomates = _.filter(d.roomates, (e) => {
        return e.name != window.user_name
      });

      d.roomates.forEach((e) => {
        e.name = e.userName;
        e.id = e.userId;
      });

      this.component_multiplayer.setPlayerBets(d.roomates);
      this.component_firstViewMultiplayer.setPlayerBets(d.roomates);

      let user = _.filter(d.roomates, (e) => {
        return e.userId == window.userId
      });

      console.log(user, "userrrrrrr", d.roomates)

      if(!user.length) return;

      this.component_gameButtons.is_confirmed_bet = true;

      let data = [];

      this.saved_bets = user[0].bets;

      let total_bet_amt = 0;

      this.saved_bets.forEach((row) => {
        data.push({
          amount: row.bet_amount,
          table_id: row.bet
        });

        total_bet_amt += row.bet_amount;
        this.component_chips.actions.push({

          chip_amount_used: row.bet_amount,
          drop_area: _.filter(this.component_betBoard.bet_areas, (e) => {
            if (e.table_name == row.bet) {
              return e
            }
          })[0]

        });
      });

      this.component_betDetails.bet_amount = total_bet_amt;
      this.component_betDetails.reinit();

      this.component_gameButtons.previousBet = data
      this.component_gameButtons.repeatBet(true, true);

      if (this.component_gameButtons.previousBet) {
        this.component_chips.chipWrap.visible = false;
      }
    });

    socket.on("multi-player", (data) => {

      data = Xpacket.received(data)
      switch(data.type) {
          case "bet" :

              if(data.id == window.userId) {
                  let total = 0;
                  let bets = [];
                  let actions = [];
                  for(var x = 0; x < data.data.length;x++) {
                      bets[x] = {
                          "amount" : data.data[x].bet_amount,
                          "table_id" : data.data[x].bet,
                          "is_confirmed" : true
                      }

                      total += data.data[x].bet_amount;

                      actions[x] = {
                          chip_amount_used:data.data[x].bet_amount,
                          drop_area: data.data[x].bet
                      }
                  }

                  //**change bet detaik **//
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

              if(parseInt(window.multiplayer)) {
                  this.component_multiplayer.setMultiplayer(_.cloneDeep(data));
                  this.component_firstViewMultiplayer.setMultiplayer(_.cloneDeep(data));
              }
              break;
          case "join" :
              this.component_multiplayer.roomEvent(data);
              this.component_firstViewMultiplayer.roomEvent(data);
              break;
          case "cancel" :
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
              }
              this.component_multiplayer.cancelBet(data)
              this.component_firstViewMultiplayer.cancelBet(data);
              break;
          case "leave" :
              this.component_multiplayer.roomEvent(data);
              this.component_firstViewMultiplayer.roomEvent(data);
              break;
      }

    });

  },

  toggleBet() {
    this.multiplayer = !this.multiplayer;

    this.component_secondView.visible = false;
    this.component_betBoard.visible = true;

    this.component_betBoard.clearTableChipBets();

    if (!this.component_gameButtons.is_confirmed_bet) {
      if (this.component_timer.betting_start) {
        this.component_gameButtons.toggleMultiplayer(false, true);
      }
    } else {
      // if(this.component_timer.betting_start) {
      this.component_gameButtons.repeatBet(false, true);
      // }
    }

    if (this.multiplayer) {
      this.component_betBoard.visible = false;
      this.component_betBoard.children.forEach((e) => {
        e.visible = false;
      });
    } else {
      this.component_multiplayer.visible = false
      this.component_betBoard.children.forEach((e) => {
        if (e.multiplayer) {
          e.visible = false
        }

        if (e.singleplayer) {
          e.visible = true
        }
      });
    }
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
  player_data: {
    total_bets: 0,
    total_win: 0
  },
  last_bet: null,
  confirm: false,
  actionCallback(type, param) {
    this.component_betBoard.visible = true;

    this.callback(null, type)

    let range = '';
    let mainarea = _.find(this.component_betBoard.bet_areas, (area) => {
        return area.table_name === 'dragon';
    });

    range = `${mainarea.min_betAmt}-${mainarea.max_betAmt}`;

    if (window.multiplayer) {
      this.component_multiplayer.visible = true;
      this.component_firstViewMultiplayer.visible = false;
    }
    else {
      this.component_secondView.visible = false;
    }

    switch (type) {
      case "clear":

        let betAmount = this.component_betDetails.bet_amount;

        this.is_repeat = 0;
        this.current_action = "clear";

         this.component_gameButtons.process_clear = true;
          $.post(links.cancel, {
            logs : this.actionlogs,
            data: this.component_gameButtons.yourBets,
            range: range,
            device : 'm'
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

                 socket.emit('data', {
                    eventName: 'cancel',
                    gameName: 'Dragon-Tiger',
                    tableId: window.tableNum,
                    roundNum: parseInt(this.component_dealer.round_id),
                    data: [{
                      roundNum: parseInt(this.component_dealer.round_id),
                      range: initData.range,
                      name : window.user_name,
                      id : window.userId
                    }]
                  }, function(e) {

                  });

              } else {
                  this.component_gameButtons.process_clear = false;
                  this.component_gameButtons.process_confirm = false;
                  this.component_gameButtons.checkButtonState();

                  this.component_gameButtons.is_clear = false;

                  this.component_gameButtons.previousBet.forEach((e) => {
                      e.is_confirmed = true;
                  });

              }
            });


        this.actions = [];
        this.logUserMoney = 0;

        break;
      case "undo":
        this.current_action = "undo";
        break;
      case "confirm":
        this.component_gameButtons.process_confirm = true;
        this.last_bet = this.component_gameButtons.yourBets;
        this.current_action = "insert";

        this.user_no_bet_count = 0;
        let data = []
        this.component_gameButtons.yourBets.forEach((row) => {
          data.push({
            "roundNum": parseInt(this.component_dealer.round_id),
            "bet_amount": row.amount,
            "bet": row.table_id,
            "user_name": this.component_playerInfo.user_name.text,
            'currency' : window.casino,
            "name" : window.user_name,
            "id" : window.userId,
          })
        });

        let device;
        if (this.mobile) {
          device = 'm';
        } else {
          device = 'w';
        }

        if(this.component_gameButtons.yourBets.length) {
          let totalBetAmt = _.sumBy(this.component_gameButtons.yourBets, 'amount');
          let logData = [{'action' : 'confirm', 'comment' : 'total, '+totalBetAmt, 'user_money' : parseInt(this.context.user_money)}]

          $.post(links.confirm, {
              data: this.component_gameButtons.yourBets,
              round_id : this.component_dealer.round_id,
              device: device,
              logs : this.actionlogs,
              type : log_type,
              range: range,
              roomId : 0,
              balance_bet : 0
            }, (response) => {
              this.component_tableDraw.redrawChips();
              this.toggleView();

               if (response.fail && !response.data.length) {//(_.isEmpty(response)) {  //if insert failed
                  this.component_messages.setMessage(window.language.prompts.promptbetfail, 1);

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

                  // this.context.user_money += this.component_betDetails.bet_amount;
                  this.component_betDetails.bet_amount = 0;
                  // this.component_betDetails.reinit(true);

                  this.component_gameButtons.checkButtonState();
                  // this.component_gameButtons.confirmButton.updateCache();
                  this.component_chips.actions = [];
                  this.component_timer.removeUnconfirmedChips(true);

                  // reinit user money
                  if(window.casino == "SS") {
                      this.context.user_money = parseFloat(response.money);
                  } else {
                      this.context.user_money = parseInt(response.money);
                  }
                  this.component_betDetails.reinit(true)

              }
              else if (response.fail && response.data.length) {//(response.fail && response.data.length) { // if inssert failed but with prev bets
                   this.component_messages.setMessage(window.language.prompts.promptaddfail, 1);

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
                          'is_confirmed_bet': true
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
                          'currencyMultiplier' : window.currencyMultiplier,
                          'userMultiplier' : window.userMultiplier
                      });
                  });
                  socket.emit('data', {eventName : 'bet', data:data_2, gameName: 'Dragon-Tiger', tableId: window.tableNum, roundNum: parseInt(this.component_dealer.round_id)} , function (e) {
                  });

                  this.context.user_money += this.component_betDetails.bet_amount;
                  this.component_betDetails.bet_amount = tot;
                  this.context.user_money -= tot;
                  this.component_betDetails.reinit(true);

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
                      this.context.user_money = parseFloat(response.money);
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
                          'currencyMultiplier' : window.currencyMultiplier,
                          'userMultiplier' : window.userMultiplier
                      });
                      total += bet.bet_money
                  });

                  socket.emit('data', {eventName : 'bet',data: data_2, gameName: 'Dragon-Tiger', tableId: window.tableNum, roundNum: parseInt(this.component_dealer.round_id)} , function (e) {
                  });

                  this.component_gameButtons.previousBet = this.success_bet;
                  setTimeout(() => {
                      this.component_chips.actions = [];
                      this.component_timer.removeUnconfirmedChips(true);
                  },50)

                  this.component_gameButtons.process_confirm = false;
                  this.component_gameButtons.process_confirm = false;
                  this.component_gameButtons.checkButtonState();

                  this.confirm_failed = false;
                  this.component_gameButtons.bet_saved = true;

                  this.component_betDetails.bet_amount = total;
                  // reinit user money
                  if(window.casino == "SS") {
                      this.context.user_money = parseFloat(response.money);
                  } else {
                      this.context.user_money = parseInt(response.money);
                  }
                  this.component_betDetails.reinit(true)
              }
          })
           .fail( (e) => {
              this.component_messages.setMessage(window.language.prompts.promptbetfail, 1);
              // this.confirm_failed = true;
              // this.component_gameButtons.is_confirmed_bet = false;
              // this.component_gameButtons.process_confirm = false;

              // this.component_betBoard.bet_areas.forEach(function(betarea) {
              //     for(var a = 0; a< betarea.chips.length; a++) {
              //         betarea.chips[a].confirmed_bet = false;
              //     }
              // });

              // this.context.user_money += this.component_betDetails.bet_amount;
              // this.component_betDetails.bet_amount = 0;
              // this.component_betDetails.reinit(true);

              // this.component_gameButtons.checkButtonState();
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

        // if (this.component_gameButtons.yourBets.length) {
        //   $.post(links.confirm, {
        //     data: this.component_gameButtons.yourBets,
        //     round_id: this.component_dealer.round_id,
        //     device: device
        //   }, (response) => {
        //     if (parseInt(response)) {
        //       this.component_gameButtons.bet_saved = true;
        //     }
        //   });
          //   this.component_tableDraw.redrawChips();
          //   this.toggleView();

        // }

        // $.post(`/betlogs/store/${window.tableNum}/${window.range}`, {
        //   logs: this.actions
        // }, (response) => {});

        break;
      case "repeat":
        this.is_repeat = this.component_gameButtons.previousBet.length;
        this.current_action = "repeat";
        this.component_gameButtons.previousBet.forEach((e) => {
          this.component_chips.actions.push({
            // drop_area: e.table_id,
            drop_area: _.filter(this.component_betBoard.bet_areas, (t) => {
              if (t.table_name == e.table_id) {
                return t
              }
            })[0],
            chip_amount_used: e.amount
          })
        });

        this.component_chips.actions = _.uniqBy(this.component_chips.actions, function (e) {
          return e.drop_area.table_name
        });
        break;
    }
  },
  formatNumber(num) {
    num += '';
    var x = _.split(num, '.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  },
  toggleView() {
    if (window.multiplayer) {
      this.component_betBoard.visible = !this.component_betBoard.visible;
      this.component_multiplayer.visible = !this.component_multiplayer.visible;
      this.component_firstViewMultiplayer.visible = !this.component_firstViewMultiplayer.visible;

      this.component_betBoard.children.forEach((e)=>{
        if(e.multiplayer) {
          e.visible = true;
        }

        if (e.propCommon) {
          e.visible = true;
        }
      });
    }
    else {
      this.component_secondView.visible = !this.component_secondView.visible;
      this.component_betBoard.visible = !this.component_betBoard.visible;

      this.component_betBoard.children.forEach((e)=>{
        if(e.multiplayer) {
          e.visible = false;
        }
      });
    }
  },
  endRound() {
    this.component_chips.chips.forEach((chips) => {
      chips.y = chips.oy;
      chips.shadow = null
    });
  },
  initRound() {
    this.actionlogs = [];
    this.tempLog = [];
    this.success_bet = [];
    this.component_betBoard.bet_cnt = 0
    this.confirm_failed = false;
    this.component_gameButtons.process_clear = false;
    this.component_gameButtons.process_confirm = false;
    this.component_winnings.text_container.removeAllChildren();

    this.component_gameButtons.previousBet.forEach((e)=>{
      e.is_confirmed = false;
    })

    this.actions = [];
    this.is_repeat = 0;
    this.current_action = "";

    this.component_multiplayer.reset();
    this.component_firstViewMultiplayer.reset();

    this.component_secondView.newRound();
    this.component_firstViewMultiplayer.newRound();

    if (this.component_gameButtons.previousBet.length) {
      this.component_gameButtons.repeatButton.visible = true;
      this.component_gameButtons.undoButton.visible = false;
      this.component_gameButtons.repeatButton.gotoAndStop("up")
    }

    this.component_gameButtons.repeat = false;

    for (var x = 0; x < this.component_winAmount.winning_chips.length; x++) {
      this.component_winAmount.removeChild(this.component_winAmount.winning_chips[x]);
    }

    // this.component_secondView.removeAnim();
    if (this.component_winnings.win_text.length) {
      this.component_winnings.text_container.removeAllChildren();
      this.component_winnings.gold_instance.scaleX = 0;
    }

    this.component_winAmount.total_win_text.alpha = 0;
    this.component_betDetails.win_amount = 0;
    this.component_betDetails.bet_amount = 0;
    this.component_betDetails.reinit(false);
    this.component_gameButtons.is_confirmed_bet = false;

    this.component_card_result.dragon = [];
    this.component_card_result.tiger = [];

    delete this.component_card_result['dragon'];
    delete this.component_card_result['tiger'];

    this.component_card_result.removeAllChildren();

    this.component_chips.actions = [];

    this.component_chips.chips.forEach((chips) => {
      chips.y = chips.oy;
      chips.shadow = null
    });

    // this.component_chips.removeChild(this.component_chips.chip_mouse);

    // this.component_chips.selected_chip = null;
    if (this.component_chips.selected_chip) {
      this.component_chips.selected_chip.shadow = new createjs.Shadow("#fff", 0, 0, 0);

      createjs.Tween.get(this.component_chips.selected_chip.shadow, {
          loop: true
        })
        .to({
          blur: 20
        }, 500, createjs.Ease.quadInOut)
        .to({
          blur: 0
        }, 500, createjs.Ease.quadInOut)

      createjs.Tween.get(this.component_chips.selected_chip)
        .to({
          y: this.component_chips.selected_chip.oy - 20
        }, 150);
    }

    this.component_winnings.visible = false;
    this.component_winning_assets.visible = false;
    this.component_winning_assets.resetWinAssets();

    this.component_card_result_total.setVal("tiger", 0);
    this.component_card_result_total.setVal("dragon", 0);

    this.component_chips.total_ingame_bet = 0;

    this.component_betBoard.bet_areas.forEach((e, x) => {
      e.chips.forEach((chip) => {
        this.component_betBoard.removeChild(chip);
      });
      e.chips = [];
      e.total_bet_amt = 0;

      if (e.bet_amt_text) {
        e.bet_amt_text.text = 0;
      }

      if (e.graphics) {
        e.normal_state(e, x);
      } else {
        e.gotoAndStop(0);
      }
      e.alpha = 1;
      createjs.Tween.removeTweens(e);

    });
    this.component_gameButtons.disableAllButtons();

    if(this.component_betDetails && this.component_betDetails.total_bet_amt) {
      this.component_betDetails.total_win_amt.font = "22px bebas-regular";
      this.component_betDetails.total_bet_amt.font = "22px bebas-regular";
    }
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
    this.videoSocket = io(`https://lsv.nihtanv2.com/${streamQuality}`, { path: `/dt${tblNum}` });
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
