/**
 * dragon-tiger-mobile.js
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


//===ingame tutorial video overlay
import ingame_overlay from '../../components/poker/mobile/ingame-overlay';
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
import lastRounds from '../../components/commons/mobile/lastRounds';
import announcement from '../../components/commons/mobile/announcement';

import menu from '../../components/commons/mobile/menu';
import menuHowToPlay from '../../components/commons/mobile/menuHowToPlay';
import menuPlayerInfo from '../../components/commons/mobile/menuPlayerInfo';
import menuBetRecords from '../../components/commons/mobile/menuBetRecords';
import menuChips from '../../components/commons/mobile/menuChips';
import menuSettings from '../../components/commons/mobile/menuSettings';
import menuTransfer from '../../components/commons/mobile/menuTransfer';
import bet_indicator from '../../components/commons/mobile/betIndicator';
//===uncommon components
import drawn_table from '../../components/poker/mobile/table_draw';
import gameInfo from '../../components/poker/mobile/gameInfo';
import card_result from '../../components/poker/mobile/cardResult';
import fake_card_result from '../../components/poker/mobile/fake-cardResult';
import dealer_data from '../../components/poker/mobile/dealer_data';
import card_win from '../../components/poker/mobile/cardWinRes';
// import scoreboard from '../../components/poker/mobile/scoreboard';
import payout from '../../components/poker/mobile/bonusPayout';
import card_extra from '../../components/poker/mobile/cardResultExtra';
import betButtonsExtra from '../../components/poker/mobile/betButtonsExtra';
import winning_assets from '../../components/poker/mobile/dtWinningAsset';
import bet_details from '../../components/poker/mobile/betDetails';
import win_amount from '../../components/poker/mobile/winAmount';
import payoutInfo from '../../components/poker/mobile/payoutInfo';

import winRes from '../../components/poker/mobile/winRes';

import menuBetData from '../../components/poker/mobile/menuBetData';

import roadmap from '../../components/poker/mobile/ingame-roadmap';
//===unique game configuration
import betboard_config from '../../assets/mobile/dt_betboard_config';
import opposite_bet from '../../assets/dt_betarea_opposite_condition';
import theme_config from '../../assets/theme_colors_config';
//===ingmae tutorial for first time users
import ingame_tutorial from '../../components/poker/mobile/ingame-tutorial';
//===loading screen/animation
import loading_init from '../../screens/loading_init';
import load from '../../screens/loading';
//===dragon tiger events
import listen from '../../listeners/poker-events';
//=== links for gamebuttons
let links = {
    confirm: `/bet/store/${window.tableNum}/${window.range}`,
    cancel: `/bet/cancel/${window.tableNum}/${window.range}`,
    getDetails: "/details/getDetails",
    videoSetting: "/settings/videoSetting",

    getTransferLogs: '/'+window.tableNum+'/'+window.range+"/transferlogs",
    getGameHistory: '/'+window.tableNum+'/'+window.range+"/gamehistory",
    getBetLogsMobile: '/'+window.tableNum+'/'+window.range+"/betlogs",

    setFoldCheck: `/bet/setFoldCheck/${window.tableNum}`
};

let log_type = window.bet_type;

let win_suits = ["win_heart","win_clubs","win_spade","win_diamond","win_heart","win_clubs","win_spade","win_diamond"];

let initData = {
    userId : window.userId,
    range : window.range
}

let tableSlave = window.bet_type == 'b' ? 'bonusplus' : 'normal';

export default new blu.Screen({
    resources: "/assets_mobile.json",

    component_chips: chips(opposite_bet),
    component_betBoard: bet_board(log_type),
    component_gameInfo: gameInfo(),
    // component_scoreBoard: scoreboard(),
    component_betindicator: bet_indicator(),
    component_gameButtons: game_buttons(links),
    component_playerInfo: player_info(),
    component_betDetails: bet_details(),
    component_timer : timer(),
    component_messages: messages(),
    component_card_result: card_result(),
    component_fake_cardResult: fake_card_result(),
    component_card_winning_res : card_win(),
    component_channel: channel(),
    component_dealer : dealer(),
    component_dealer_data : dealer_data(),
    component_roadmap: roadmap(),
    component_winnings: win_result(win_suits),
    component_lastRounds : lastRounds(),
    component_announcement : announcement(),

    component_menu : menu(),
    component_betRecords : menuBetRecords(links, log_type),
    component_menuBetData : menuBetData(links, log_type),

    component_winning_assets : winning_assets(),
    component_card_result_total : card_extra(),
    component_winAmount: win_amount(),
    component_tableDraw: drawn_table(betboard_config, log_type),
    component_payout: payout(),
    component_howToPlay : menuHowToPlay(),
    component_menuPlayerInfo : menuPlayerInfo(),
    component_menuChips : menuChips(),
    component_settings : menuSettings(),
    component_transfer : menuTransfer(),
    component_payoutInfo : payoutInfo(),
    component_winRes :  winRes(),

    component_extraBetButtons : betButtonsExtra(),
    component_ingameOverlay : ingame_overlay(),
    component_ingameTutorial : ingame_tutorial(),

    current_action : "",
    actions : [],
    mobile: true,
    confirm_failed: false,
    currentLog : null,

    player_data : {
        total_bets : 0,
        total_win : 0
    },
    roundphase : null,
    theme_color: theme_config(),
    chipsMultiplier : window.currencyAbbrev === "PTS" ? 1 : 1,
    detectmob() {
         if( navigator.userAgent.match(/Android/i))
         {
            return 'Android';
         }else if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i))
         {
            return 'iPhone';
         }else {
            return 'none';
         }
    },
    controllermute(muteString) {
      if (window.nonInstall) return;

      var mobileString = this.detectmob();

      if(mobileString == 'Android')
      {
        if(typeof Android !== "undefined" && Android !== null)
        {
            Android.volumeMuteController(muteString);
        }
      }else if(mobileString == 'iPhone')
      {
            try{
                window.webkit.messageHandlers.observe.postMessage(`nihmutebutton,${muteString},`);
            } catch(e) {
                // not using ios device
            }
            document.location = 'nihmutebutton://bluefrog?mute=' + muteString;
      }else{

      }
    },
    init () {
        this.stage.resize(window.innerWidth, window.innerHeight);

        if (window.nonInstall) return;
        this.controllermute(1)
    },
    loading: function(e) {
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

        this.controllermute(0)
        setTimeout(()=>{
            $(".wrapper").hide()
            $("body").css("background","none")
            $("html").css("background","none")


            var mobileString = this.detectmob();
            try{
                if(mobileString == 'iPhone') window.webkit.messageHandlers.observe.postMessage('nihstartbutton,');
            } catch(e) {
                // not using ios device
            }

        },500)
        listen(this, log_type);

        createjs.MotionGuidePlugin.install(createjs.Tween);

        let self = this;
        this.addComponent(this.component_tableDraw);
        this.addComponent(this.component_ingameOverlay);
        this.addComponent(this.component_betBoard);
        this.addComponent(this.component_betindicator);
        this.addComponent(this.component_gameInfo);
        this.addComponent(this.component_timer);
        this.addComponent(this.component_gameButtons);
        this.addComponent(this.component_extraBetButtons);
        this.addComponent(this.component_playerInfo);
        this.addComponent(this.component_betDetails);
        this.addComponent(this.component_card_result_total);
        this.addComponent(this.component_card_result);
        this.addComponent(this.component_lastRounds);
        this.addComponent(this.component_announcement);

        this.component_card_result.x = 10;
        this.component_card_result.y = 580;

        this.addComponent(this.component_channel);
        // this.addComponent(this.component_scoreBoard);
        this.addComponent(this.component_roadmap);
        this.addComponent(this.component_chips);
        this.addComponent(this.component_winning_assets);
        this.addComponent(this.component_card_winning_res);

        this.addComponent(this.component_winRes);
        this.component_winRes.x = -15;
        this.component_winRes.y = -80;
        this.addComponent(this.component_winnings);
        this.addComponent(this.component_messages);

        this.addComponent(this.component_winAmount);
        this.addComponent(this.component_payoutInfo);
        // this.addComponent(this.component_payout);

        this.addComponent(this.component_menu);
        this.addComponent(this.component_menuChips);
        this.addComponent(this.component_menuPlayerInfo);
        this.addComponent(this.component_dealer);
        this.addComponent(this.component_dealer_data);
        this.addComponent(this.component_menuBetData);
        this.addComponent(this.component_betRecords);
        this.addComponent(this.component_howToPlay);
        this.addComponent(this.component_transfer);
        this.addComponent(this.component_settings);
        this.addComponent(this.component_ingameTutorial);
        this.addComponent(this.component_fake_cardResult);

        this.socket.on("disconnect", () => {
            this.connect();
        })

        this.connect();

        // === for detecting ios or android
        function getOS() {
          var userAgent    = window.navigator.userAgent,
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
        this.socket.emit('data', {  eventName :'room', data: initData }, (d) => {
            d.roomates = _.filter(d.roomates, (e) => {
                return e.name != window.user_name
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

            this.saved_bets = _.filter(user[0].bets, { 'slave' : tableSlave });
            let total_bet_amt = 0;

            this.saved_bets.forEach( (row) => {
              // if(row.bet == 'pocket') {
              //     row.bet = 'bonus';
              // }

              total_bet_amt += row.bet_amount;

              data.push({
                  amount : row.bet_amount,
                  table_id : row.bet
              });

              this.component_gameButtons.yourBets.push({
                  "amount" : row.bet_amount,
                  "table_id" : row.bet
              });
              
              this.component_chips.actions.push({
                  chip_amount_used: row.bet_amount,
                  drop_area: _.filter(this.component_betBoard.bet_areas, (e) => {
                      if(e.table_name == row.bet)  {
                          return e
                      }
                  })[0]
              });

              let flopBet = _.find(this.saved_bets, (e) => {return e.bet == 'flop'});
              let turnBet = _.find(this.saved_bets, (e) => {return e.bet == 'turn'});
              let riverBet = _.find(this.saved_bets, (e) => {return e.bet == 'river'});

              if(flopBet) {
                  if(flopBet.cancel && !flopBet.bet_amount) {
                      this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.flop_area,"fold", true);
                      this.component_extraBetButtons.fold_check_btn.has_fold = true;
                  } else {
                      this.component_extraBetButtons.setFlopBet(flopBet.bet_amount, true)
                  }
              }

              if(turnBet) {
                  if(turnBet.cancel && !turnBet.bet_amount && !this.component_extraBetButtons.fold_check_btn.has_fold) {
                      this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.turn_area,"check", true);
                      this.component_extraBetButtons.fold_check_btn.has_check_turn = true;
                  } else {
                      this.component_extraBetButtons.setTurnBet(turnBet.bet_amount, true)
                  }
              }

              if(riverBet) {
                  if(riverBet.cancel && !riverBet.bet_amount && !this.component_extraBetButtons.fold_check_btn.has_fold) {
                      this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.river_area,"check", true);
                      this.component_extraBetButtons.fold_check_btn.has_check_river = true;
                  } else {
                      this.component_extraBetButtons.setRiverBet(riverBet.bet_amount, true);
                  }
              }
            });

            this.component_gameButtons.previousBet = data;
            this.component_gameButtons.repeatBet(true, true);

            this.component_betDetails.bet_amount = total_bet_amt;
            this.component_betDetails.reinit();

            if (this.component_gameButtons.previousBet) {
              this.component_chips.chipWrap.visible = false;
            }
        });

        this.socket.on("multi-player", (data) => {
            data = Xpacket.received(data)
            switch(data.type) {
                case "bet" :
                    this.multiplayerBet(data);
                break;
                case "cancel" :
                    if(data.id == window.userId) {

                        if(data.data[0].slave !== tableSlave) return;

                        // ** clears bet deteails**//
                        this.component_gameButtons.previousBet = _.filter((e) => {
                            e.is_confirmed =false;
                            return e;
                        });

                        this.context.user_money += this.component_betDetails.bet_amount;
                        this.component_betDetails.bet_amount = 0;
                        this.component_betDetails.reinit(true);

                        this.component_gameButtons.is_confirmed_bet = false;
                        this.component_gameButtons.yourBets = [];
                        this.component_betBoard.clearTableChipBets();

                        this.component_betBoard.bet_cnt = 0;
                    }
                    break;
            }
        });
    },
    multiplayerBet (data) {
        console.log(data)
        if(data.id == window.userId) {

            let total = 0;
            let bets = [];
            let actions = [];

            let flop_turn_river_tot = 0;

            //removing and adding fold check chips
            let foldCheck = [];
            this.component_tableDraw.chips_container.children.forEach((e) => {
                if(e.fold_check_chip) {
                    foldCheck.push(e);
                }
            });

            this.component_tableDraw.chips_container.removeAllChildren();

            foldCheck.forEach((a) => {
                this.component_tableDraw.chips_container.addChild(a);
            });

            for(var x = 0; x < data.data.length;x++) {

                if(tableSlave == data.data[x].slave) {

                    if(data.data[x].bet == 'pocket') {
                        data.data[x].bet = 'bonus';
                    }

                    bets[x] = {
                        "amount" : data.data[x].bet_amount,
                        "table_id" : data.data[x].bet,
                        "cancel" : data.data[x].cancel,
                        "is_confirmed" : true
                    }

                    if(data.data[x].bet == "flop") {
                        if(parseInt(data.data[x].bet_amount) > 0){

                            this.component_extraBetButtons.setFlopBet(data.data[x].bet_amount, true)
                            this.component_extraBetButtons.flop_bet_button.visible = false;
                            this.component_extraBetButtons.fold_check_btn.visible = false;
                        }

                        if(data.data[x].cancel && !this.component_extraBetButtons.fold_check_btn.has_fold){
                            this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.flop_area,"fold", true);
                            this.component_extraBetButtons.fold_check_btn.has_fold = true;
                            this.component_extraBetButtons.flop_bet_button.visible = false;
                            this.component_extraBetButtons.fold_check_btn.visible = false;
                        }
                    }
                    if(data.data[x].bet == "turn") {

                        if(parseInt(data.data[x].bet_amount) > 0) {

                            this.component_extraBetButtons.setTurnBet(data.data[x].bet_amount, true)
                            this.component_extraBetButtons.turn_bet_button.visible = false;
                            this.component_extraBetButtons.fold_check_btn.visible = false;
                        }

                        console.log(this.component_extraBetButtons.fold_check_btn.has_fold, "hasfold", this.component_tableDraw.flop_area.total_bet_amt, this.component_extraBetButtons.fold_check_btn.has_check_turn);
                        if(data.data[x].cancel) {
                            if(this.component_tableDraw.flop_area.total_bet_amt  && !this.component_extraBetButtons.fold_check_btn.has_check_turn && (this.component_extraBetButtons.fold_check_btn.has_fold || !this.component_extraBetButtons.fold_check_btn.has_fold)) {
                                this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.turn_area,"check", true);
                                this.component_extraBetButtons.setTurn = true
                                this.component_extraBetButtons.fold_check_btn.has_check_turn = true;
                                this.component_extraBetButtons.turn_bet_button.visible = false;
                                this.component_extraBetButtons.fold_check_btn.visible = false;
                            }

                            if(!this.component_tableDraw.flop_area.total_bet_amt && !this.component_extraBetButtons.fold_check_btn.has_fold) {
                                this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.turn_area,"check", true);
                                this.component_extraBetButtons.setTurn = true
                                this.component_extraBetButtons.fold_check_btn.has_check_turn = true;
                                this.component_extraBetButtons.turn_bet_button.visible = false;
                                this.component_extraBetButtons.fold_check_btn.visible = false;
                            }
                        }

                    }
                    if(data.data[x].bet == "river") {

                        if(parseInt(data.data[x].bet_amount) > 0) {

                            this.component_extraBetButtons.setRiverBet(data.data[x].bet_amount, true)
                            this.component_extraBetButtons.river_bet_button.visible = false;
                            this.component_extraBetButtons.fold_check_btn.visible = false;

                        }

                        if(data.data[x].cancel) {
                            if(this.component_tableDraw.flop_area.total_bet_amt  && !this.component_extraBetButtons.fold_check_btn.has_check_river &&  (this.component_extraBetButtons.fold_check_btn.has_fold || !this.component_extraBetButtons.fold_check_btn.has_fold)) {
                                this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.river_area,"check", true);
                                this.component_extraBetButtons.setRiver = true
                                this.component_extraBetButtons.fold_check_btn.has_check_river = true;
                                this.component_extraBetButtons.river_bet_button.visible = false;
                                this.component_extraBetButtons.fold_check_btn.visible = false;
                            }

                            if(!this.component_tableDraw.flop_area.total_bet_amt && !this.component_extraBetButtons.fold_check_btn.has_fold) {
                                this.component_extraBetButtons.setFoldCheck(this.component_tableDraw.river_area,"check", true);
                                this.component_extraBetButtons.setRiver = true
                                this.component_extraBetButtons.fold_check_btn.has_check_river = true;
                                this.component_extraBetButtons.river_bet_button.visible = false;
                                this.component_extraBetButtons.fold_check_btn.visible = false;
                            }
                        }

                    }

                    total += data.data[x].bet_amount;

                    actions[x] = {
                        chip_amount_used:data.data[x].bet_amount,
                        drop_area: data.data[x].bet
                    }
                }
            }

            this.component_gameButtons.process_confirm = false;
            this.component_gameButtons.bet_saved = true;
            this.component_playerInfo.total_bets++;

            //**change bet detaik **//
            this.context.user_money += this.component_betDetails.bet_amount;
            this.context.user_money -= total;
            this.component_betDetails.bet_amount = total;
            this.component_betDetails.reinit(false);

            this.component_chips.actions = actions;

            console.log(bets, ":::Bets")
            this.component_gameButtons.yourBets = bets;
            this.component_gameButtons.previousBet = bets;
            this.success_bet = bets;

            this.component_timer.removeUnconfirmedChips();
            this.component_gameButtons.repeatBet();

            this.component_betBoard.bet_areas.forEach(function(betarea) {
                betarea.chips = _.filter(betarea.chips, function(e) { e.confirmed_bet = true; return e; });
            });

            this.component_gameButtons.checkButtonState();
            this.user_no_bet_count = 0;
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

    actionCallback(type, param) {
        this.callback(null, type);
        let range = '';
        let mainarea = _.find(this.component_betBoard.bet_areas, (area) => {
            return area.table_name === 'ante';
        });
        range = `${mainarea.min_betAmt}-${mainarea.max_betAmt}`;

        switch(type) {
            case "clear":
                this.confirm_clicked = false;
                this.current_action = "clear";
                this.repeat_clicked = false;
                let betAmount = this.component_betDetails.bet_amount;
                this.component_playerInfo.total_bets--;
                    this.socket.emit('data', {eventName : 'cancel', data : [{
                        roundNum : parseInt(this.component_dealer.round_id),
                        range : initData.range,
                        slave : tableSlave
                    }]
                });

                if(this.component_gameButtons.yourBets.length) {

                    this.component_gameButtons.process_clear = true;
                    $.post(links.cancel, {
                      logs : this.actionlogs,
                      slave: tableSlave,
                      type: window.bet_type,
                      data: this.component_gameButtons.yourBets,
                      range: range,
                      device: 'm'
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
                            this.component_gameButtons.process_confirm = false;
                            this.component_gameButtons.checkButtonState();

                            this.component_playerInfo.total_bets--;
                        }
                    })
                    .fail( (e) => {
                        if(this.confirm_failed) return;

                        if (this.roundphase == 'startround') {
                            for(var i  =0; i < this.component_betBoard.bet_areas.length; i++) {
                                for(var a = 0; a< this.component_betBoard.bet_areas[i].chips.length; a++) {
                                    this.component_betBoard.bet_areas[i].chips[a].confirmed_bet = true;
                                }
                            }

                            for(var x = 0; x < this.component_gameButtons.previousBet.length; x++) {
                                this.component_gameButtons.previousBet[x].is_confirmed = true
                            }

                            this.component_gameButtons.is_confirmed_bet = false;

                            this.component_gameButtons.yourBets = this.component_gameButtons.previousBet

                            this.context.user_money -= betAmount;
                            this.component_betDetails.bet_amount = betAmount;
                            this.component_betDetails.reinit(true);
                            this.component_gameButtons.checkButtonState();
                            // this.component_gameButtons.clearButton.updateCache();

                            this.component_gameButtons.repeatBet();

                            setTimeout(() => {
                                this.component_gameButtons.clearButton.gotoAndStop("up");
                                this.component_gameButtons.confirmButton.gotoAndStop("disabled");
                                this.component_gameButtons.repeatButton.gotoAndStop("disabled");
                                this.component_gameButtons.undoButton.gotoAndStop("disabled");
                            },200)
                        }
                    });
                }

                //this.actions = [];
                this.logUserMoney = 0;

            break;
            case "undo":
            this.current_action = "undo";
            break;
            case "confirm":
                this.user_no_bet_count = 0;
                let data = [];
                this.current_action = "confirm";
                this.confirm_clicked = true;
                this.component_gameButtons.yourBets.forEach( (row) => {
                    data.push({
                        "roundNum" : parseInt(this.component_dealer.round_id),
                        "bet_amount" : row.amount,
                        "bet" : row.table_id,
                        "is_mobile" : this.mobile
                    })
                });

                // === bonusplus replaces bonus with pocket start
                let bonus_index = log_type == 'b' ?
                    _.findIndex(this.component_gameButtons.yourBets.data, ['table_id', 'bonus'])
                    : -1;
                if(bonus_index > -1){
                    this.component_gameButtons.yourBets.data[bonus_index].table_id = 'pocket';
                }
                // === bonusplus replaces bonus with pocket end

                if(this.component_gameButtons.yourBets.length) {

                    this.component_gameButtons.process_confirm = true;

                    let totalBetAmt = _.sumBy(this.component_gameButtons.yourBets, 'amount');
                    let logData = [{'action' : 'confirm '+this.roundphase, 'comment' : 'total, '+totalBetAmt, 'user_money' : parseInt(this.context.user_money)}]
                    $.post(links.confirm, {data: this.component_gameButtons.yourBets,
                      logs : this.actionlogs,
                      type : log_type,
                      type : window.bet_type,
                      device : 'm',
                      range : range
                    }, (response) => {
                         var temp;

                        if(typeof response.data === 'string') {
                            temp = _.clone(JSON.parse(response.data));
                        } else {
                            temp = response.data;
                        }

                        response.fail = parseInt(response.fail);

                        if(response.fail && _.isEmpty(temp)) {
                            this.component_messages.setMessage(window.language.prompts.promptbetfail, 1);
                            this.component_gameButtons.process_confirm = false;

                            this.component_gameButtons.previousBet.forEach( (e) => {
                                e.is_confirmed = false;
                            });

                            this.component_betBoard.clearTableChipBets();
                            this.component_gameButtons.previousBet.forEach((e)=>{
                                e.is_confirmed = false;
                            });

                            this.component_gameButtons.is_confirmed_bet = false;
                        }

                        if(response.fail && !_.isEmpty(temp)) {
                            this.component_messages.setMessage(window.language.prompts.promptaddfail, 1);

                             if(this.roundphase == "startround") {
                                for(var key in temp) {
                                    this.success_bet.push({
                                        'amount' : temp[key].bet,
                                        'table_id' : key,
                                        'is_confirmed': true
                                    });
                                }
                                this.component_gameButtons.previousBet = this.success_bet;
                                this.component_timer.removeUnconfirmedChips(true);

                                this.component_gameButtons.bet_saved = true;
                                this.component_gameButtons.checkButtonState();

                                this.component_gameButtons.yourBets = _.filter(this.component_gameButtons.yourBets, (bets) => {
                                    if(_.find(this.success_bet, (sbet) => {
                                        return sbet.table_id === bets.table_id;
                                    }).amount > 0 ) {
                                        return bets;
                                    }
                                });
                            } else { //flop turn river checking
                                this.failHandling();
                            }
                        }

                        if (!response.fail && !_.isEmpty(temp)) {//(_.size(response)) {
                            let total = 0;
                            this.success_bet = [];
                            let data_2 = [];

                            if (log_type == 'b') {
                              response.data = JSON.parse(response.data); //bonusplus aliasing
                            } else {
                              response.data = JSON.parse(response.data.replace('pocket', 'bonus'));
                            }

                            // reinit user money
                            this.context.user_money = response.money;
                            this.component_betDetails.reinit(false)

                            for(var key in response.data) {
                                this.success_bet.push({
                                    'amount' : response.data[key].bet,
                                    'table_id' : key,
                                    'is_confirmed': true
                                }) ;

                                data_2.push({
                                    "roundNum" : parseInt(this.component_dealer.round_id),
                                    "bet_amount" : response.data[key].bet,
                                    "name" : window.user_name,
                                    "id" : window.userId,
                                    "bet" : key,
                                    "slave" : tableSlave,
                                    "is_mobile" : this.mobile,
                                    cancel: response.data[key].cancel,
                                    'currency' : window.casino
                                });

                                total += parseInt(response.data[key].bet)
                            }

                            this.socket.emit('data', {eventName : 'bet', data : data_2} , function (e) {
                            });

                            if(this.roundphase == "startround") {
                                this.component_gameButtons.bet_saved = true;
                                this.component_playerInfo.total_bets++;

                                //**change bet detaik **//
                                this.component_betDetails.bet_amount = total;
                                this.component_betDetails.reinit(false);

                                this.component_gameButtons.process_confirm = false;
                                this.component_gameButtons.checkButtonState();

                                this.component_gameButtons.previousBet = this.success_bet;

                                setTimeout(() => {
                                    this.component_chips.actions = []
                                    this.component_timer.removeUnconfirmedChips(true);
                                    // this.component_gameButtons.repeatBet(true, true,true);
                                },50)

                                this.confirm_failed = false;

                                this.component_gameButtons.bet_saved = true;
                                this.component_gameButtons.checkButtonState();
                                this.user_no_bet_count = 0;
                            }
                            setTimeout(() =>{
                                // reinit user money
                                if(window.casino == "SS") {
                                    this.context.user_money = parseFloat(response.money);
                                } else {
                                    this.context.user_money = parseInt(response.money);
                                }

                                if(this.roundphase!= "startround") {
                                    this.component_betDetails.reinit(false)
                                } else {
                                    this.component_betDetails.reinit(true)
                                }
                            },100)
                        }

                    })
                    .fail( (e) => {
                        this.component_messages.setMessage(window.language.prompts.promptbetfail, 1);
                        this.component_gameButtons.process_confirm = false;
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
                                this.component_betDetails.reinit(true);

                                this.component_gameButtons.checkButtonState();
                                break;
                            case "flop" :
                                this.flopFail();
                                break;

                            case "turn" :
                                this.turnFail();
                                break;

                            case "river" :
                                this.riverFail();
                                break;
                        } // end switch
                    });
                }

                this.logUserMoney = 0;
            break;

            case "repeat":
              this.repeat_clicked = true;
              this.current_action = "repeat";
            break;
        }

        this.current_action = "";
    },

    checkStatus(param) {
      let ok_go = false;
      if(this.roundphase == "startround") {ok_go = true}
      return ok_go;
    },
    failHandling () {
        switch(this.roundphase) {
            case "flop":
                console.log(this.success_bet, "success_bet")
                let flopBet = _.find(this.success_bet, (e) => { return e.table_id == 'flop' });
                console.log(flopBet, "flopbet")
                if(!parseInt(flopBet.amount)) {
                    this.flopFail();
                }
                break;
            case "turn":
                console.log(this.success_bet, "success_bet")
                let turnBet = _.find(this.success_bet, (e) => { return e.table_id == 'turn' });
                console.log(turnBet, "flopbet")
                if(!parseInt(turnBet.amount)) {
                    this.turnFail();
                }
                break;
            case "river":
                console.log(this.success_bet, "success_bet")
                let riverBet = _.find(this.success_bet, (e) => { return e.table_id == 'river' });
                console.log(riverBet, "flopbet")
                if(!parseInt(riverBet.amount)) {
                    this.riverFail();
                }
                break;
        }
    },
    flopFail() {

        this.component_extraBetButtons.fold_check_btn.has_fold = false;
        this.component_extraBetButtons.flop_bet_button.visible = true;
        this.component_extraBetButtons.fold_check_btn.visible = true;

        this.component_extraBetButtons.setFlop = false;

        this.component_extraBetButtons.flop_indicator.visible = false;
        this.component_extraBetButtons.flop_indicator.children[1].text = 0;

        this.component_betDetails.bet_amount -= parseInt(this.component_tableDraw.flop_area.total_bet_amt);
        this.context.user_money = parseInt(this.context.user_money) + parseInt(this.component_tableDraw.flop_area.total_bet_amt)
        this.component_betDetails.reinit(true)

        this.component_tableDraw.chips_container.removeAllChildren();
        this.component_tableDraw.flop_area.chips = [];
        this.component_tableDraw.flop_area.total_bet_amt = 0;

        _.remove(this.component_gameButtons.yourBets, (n) => { return n.table_id == 'flop'; });
    },
    turnFail() {
        this.component_extraBetButtons.fold_check_btn.has_check_turn = false;
        this.component_extraBetButtons.turn_bet_button.visible = true;
        this.component_extraBetButtons.fold_check_btn.visible = true;

        this.component_extraBetButtons.setTurn = false;

        this.component_extraBetButtons.turn_indicator.visible = false;
        this.component_extraBetButtons.turn_indicator.children[1].text = 0;

        this.component_betDetails.bet_amount -= parseInt(this.component_tableDraw.turn_area.total_bet_amt);
        this.context.user_money = parseInt(this.context.user_money) + parseInt(this.component_tableDraw.turn_area.total_bet_amt)
        this.component_betDetails.reinit(true)

        this.component_tableDraw.turn_area.chips = [];
        this.component_tableDraw.turn_area.total_bet_amt = 0;

        _.remove(this.component_gameButtons.yourBets, (n) => { return n.table_id == 'turn'; });

        for (var i = 0; i < this.component_tableDraw.chips_container.children.length; i++) {
            let turnArea = this.component_tableDraw.chips_container.children[i];
            if (turnArea.droppedAt == 'turn') {
                this.component_tableDraw.chips_container.children.splice(i, 1);
                i--;
            }
        }
    },
    riverFail() {
        this.component_extraBetButtons.fold_check_btn.has_check_river = false;
        this.component_extraBetButtons.river_bet_button.visible = true;
        this.component_extraBetButtons.fold_check_btn.visible = true;

        this.component_extraBetButtons.setRiver = false;

        this.component_extraBetButtons.river_indicator.visible = false;
        this.component_extraBetButtons.river_indicator.children[1].text = 0;

        this.component_betDetails.bet_amount -= parseInt(this.component_tableDraw.river_area.total_bet_amt);
        this.context.user_money = parseInt(this.context.user_money) + parseInt(this.component_tableDraw.river_area.total_bet_amt)
        this.component_betDetails.reinit(true)

        this.component_tableDraw.river_area.chips = [];
        this.component_tableDraw.river_area.total_bet_amt = 0;

        _.remove(this.component_gameButtons.yourBets, (n) => { return n.table_id == 'river'; });

        for (var i = 0; i < this.component_tableDraw.chips_container.children.length; i++) {
            let turnArea = this.component_tableDraw.chips_container.children[i];
            if (turnArea.droppedAt == 'river') {
                this.component_tableDraw.chips_container.children.splice(i, 1);
                i--;
            }
        }
    },
    toggleView (view) {
        if(window.tutorial_enabled) {
            this.component_card_result.visible = false;
            this.component_card_result_total.visible = false;
        }
        else {
            if(view == "result") {
                this.component_roadmap.visible = false;
                this.component_card_result.visible = true;
                this.component_card_result_total.visible = true;
            } else {
                this.component_roadmap.visible = true;
                this.component_card_result.visible = false;
                this.component_card_result_total.visible = false;
            }
        }
    },
    endRound() {

        this.component_chips.chips.forEach((chips)=>{
            chips.y = chips.oy;
            chips.shadow = null
        });
    },
    initRound () {
        this.actionlogs = [];
        this.tempLog = [];
        this.confirm_failed = false;

        this.component_gameButtons.process_confirm = false;
        this.component_gameButtons.process_clear = false;
        this.component_winnings.text_container.removeAllChildren();

        this.component_betBoard.bet_cnt = 0;

        this.component_gameButtons.previousBet.forEach((e)=>{
            e.is_confirmed = false;
        })

        // == reset animations
        this.component_tableDraw.stopBetAreaAnimation(this.component_tableDraw.flop_area);
        this.component_tableDraw.flop_area.alpha = 0.58
        this.component_tableDraw.stopBetAreaAnimation(this.component_tableDraw.turn_area);
        this.component_tableDraw.turn_area.alpha = 0.58
        this.component_tableDraw.stopBetAreaAnimation(this.component_tableDraw.river_area);
        this.component_tableDraw.river_area.alpha = 0.58

        this.component_winnings.animationContainer.visible = false

        if(this.component_gameButtons.previousBet.length) {
            this.component_gameButtons.repeatButton.visible = true;
            this.component_gameButtons.undoButton.visible = false;
            this.component_gameButtons.repeatButton.gotoAndStop("up")
        }

        this.component_gameButtons.previousBet.forEach((e)=>{
            e.is_confirmed = false;
        })

        this.component_gameButtons.main_bet = true;

        this.component_winRes.hideRes();

        // == reset fold check button
        this.component_extraBetButtons.setFlop = false;
        this.component_extraBetButtons.setTurn = false;
        this.component_extraBetButtons.setRiver = false;
        this.component_extraBetButtons.fold_check_btn.has_fold = false;
        this.component_extraBetButtons.fold_check_btn.has_check_turn = false;
        this.component_extraBetButtons.fold_check_btn.has_check_river = false;


        if(this.component_extraBetButtons.flop_indicator) {
            this.component_extraBetButtons.flop_indicator.visible = false
        }

        if(this.component_extraBetButtons.turn_indicator) {
            this.component_extraBetButtons.turn_indicator.visible = false
        }

        if(this.component_extraBetButtons.river_indicator) {
            this.component_extraBetButtons.river_indicator.visible = false
        }

        this.toggleView("game");

        this.component_gameButtons.repeat = false;

        this.component_card_winning_res.removeAllChildren();

        this.component_winAmount.total_win_text.alpha = 0;

        this.component_tableDraw.turn_area.total_bet_amt = 0;
        this.component_tableDraw.flop_area.total_bet_amt = 0;
        this.component_tableDraw.river_area.total_bet_amt = 0;
        // Empty chip
        this.component_tableDraw.turn_area.chips = [];
        this.component_tableDraw.flop_area.chips = [];
        this.component_tableDraw.river_area.chips = [];

        this.component_gameButtons.is_confirmed_bet = false;

        this.component_betDetails.win_amount = 0;
        this.component_betDetails.reinit()
        this.component_card_result.removeAllChildren();

        this.component_chips.actions = [];
        delete this.component_card_result.player;
        delete this.component_card_result.community;
        delete this.component_card_result.dealer;

        this.component_chips.chips.forEach((chips)=>{
            chips.y = chips.oy;
            chips.shadow = null
        });

        // this.component_chips.removeChild(this.component_chips.chip_mouse);

        // this.component_chips.selected_chip = null;
        this.component_chips.chips.forEach((chips)=>{
            chips.y = chips.oy;
            chips.shadow = null
        });

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

            if(e.graphics) {
                e.normal_state(e,x);
            } else {
                e.gotoAndStop(0);
            }
            e.alpha = 1;
            if(log_type == 'b'){
                e.board_img.alpha = 0.58;
                createjs.Tween.removeTweens(e.board_img);
            }
            createjs.Tween.removeTweens(e);

        });

        this.actions = [];

        this.component_tableDraw.resetTable();

        this.component_extraBetButtons.flop_bet_button.visible = false;
        this.component_extraBetButtons.turn_bet_button.visible = false;
        this.component_extraBetButtons.river_bet_button.visible = false;

        let repeatTotal = 0;

        for (var x = 0; x < this.component_gameButtons.previousBet.length; x++) {
            if(this.component_gameButtons.previousBet[x].table_id == "ante") {
                repeatTotal += (this.component_gameButtons.previousBet[x].amount * 3);
            } else {
                repeatTotal += this.component_gameButtons.previousBet[x].amount
            }
        }

        setTimeout(() => {
            if(parseInt(repeatTotal)  > parseInt(this.context.user_money)) {
                this.component_gameButtons.repeat = true;
                this.component_gameButtons.repeatButton.gotoAndStop("disabled");
                // this.component_gameButtons.repeatButton.updateCache();
            }
        }, 100)

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
    }
});
