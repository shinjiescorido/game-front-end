import Xpacket from '../lib/XPacket';
import cardsModule from '../factories/cards';
import formatter from '../factories/formatter';
import {  createSprite,
  randomNum,
  createCardSprite,
  numberCounter,
  playSound,
  numberWithCommas,
  createSpriteRoadMap,
  fontFormat
} from '../factories/factories';

import multibet from './multibet-events2';

let redirectTo;
let lang = window.language.locale == 'kr' ? 'ko' : window.language.locale;
let tableSlave = window.bet_type == 'b' ? 'bonusplus' : 'normal';

let sounds = [
  {
    id:"welcome",
    src:"/snd_v2_1/poker-"+lang+"/mode-1/welcome.mp3"
  },
  {
    id:"bet-start",
    src:"/snd_v2_1/poker-"+lang+"/mode-1/bet-start.mp3"
  },
  {
    id:"player-win",
    src:"/snd_v2_1/poker-"+lang+"/mode-1/player-win.mp3"
  },
  {
    id:"dealer-win",
    src:"/snd_v2_1/poker-"+lang+"/mode-1/dealer-win.mp3"
  },
  {
    id:"two-pair",
    src:"/snd_v2_1/poker-"+lang+"/mode-1/two-pair.mp3"
  },
  {
    id:"one-pair",
    src:"/snd_v2_1/poker-"+lang+"/mode-1/one-pair.mp3"
  },
  {
    id:"straight-flush",
    src:"/snd_v2_1/poker-"+lang+"/mode-1/straight-flush.mp3"
  },
  {
    id:"flush",
    src:"/snd_v2_1/poker-"+lang+"/mode-1/flush.mp3"
  },
  {
    id:"high-card",
    src:"/snd_v2_1/poker-"+lang+"/mode-1/high-card.mp3"
  },
  {
    id:"royal-flush",
    src:"/snd_v2_1/poker-"+lang+"/mode-1/royal-flush.mp3"
  },
  {
    id:"full-house",
    src:"/snd_v2_1/poker-"+lang+"/mode-1/full-house.mp3"
  },
  {
    id:"straight",
    src:"/snd_v2_1/poker-"+lang+"/mode-1/straight.mp3"
  },
  {
    id:"three-of-a-kind",
    src:"/snd_v2_1/poker-"+lang+"/mode-1/three-of-a-kind.mp3"
  },
  {
    id:"tie",
    src:"/snd_v2_1/poker-"+lang+"/mode-1/tie.mp3"
  },
  {
    id:"music_1",
    src:`/snd_v2_1/bgm/music_1.mp3`
  },
  {
    id:"music_2",
    src:`/snd_v2_1/bgm/music_2.mp3`
  },
  {
    id:"music_3",
    src:`/snd_v2_1/bgm/music_3.mp3`
  },
  {
    id:"music_4",
    src:`/snd_v2_1/bgm/music_4.mp3`
  },
  {
    id:"music_5",
    src:`/snd_v2_1/bgm/music_5.mp3`
  }
]

for(var x = 0; x < sounds.length; x++) {
  createjs.Sound.registerSound(sounds[x]);
}

let has_db_bets = false;

export default (self, type) => {
  let multi = multibet(self.component_multibetv2);
  self.cards_gameInfo = null;

  let redirectTo = self.mobile ? window.lobby_domain+'m?game=true' : window.lobby_domain;
  if (window.nonInstall) redirectTo = window.lobby_domain+'non?game=true';

  let timer_start = false;
  let data_push = null;
  let betTime = 0;
  let card_data = {};
  let pcard_x1 = 0;
  let pcard_x2 = 0;
  let posY = 10;

  let marks = [];
  let meta_data = [];

  let visible = false;

  let cards = {};

  let detele_flag = 0;
  let maxtimer = 15;
  let _cardFlip = false;

  let redirect_timer = maxtimer;

  let currentTimeType = null

	self.user_no_bet_count = 0;

  let setCardPositions = () => {
    if(self.component_card_result.player.length) {
      if(self.mobile) {
        if(self.component_card_result.player) {
          for(var x = 0; x<self.component_card_result.player.length; x++) {
            self.component_card_result.player[x].x = (x*50) + 500;
            self.component_card_result.player[x].y = posY;
            self.component_card_result.player[x].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
          }
        } //end if

        if(self.component_card_result.community) {
          for(var x = 0; x<self.component_card_result.community.length; x++) {
            self.component_card_result.community[x].x = (x*50) + 33;
            self.component_card_result.community[x].y = posY;
            self.component_card_result.community[x].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
          }
        } //end if

        if(self.component_card_result.dealer) {
          for(var x = 0; x<self.component_card_result.dealer.length; x++) {
            self.component_card_result.dealer[x].x = (x*50) + 45;
            self.component_card_result.dealer[x].y = posY;
            self.component_card_result.dealer[x].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
          }
        } //end if
      } //end if

      else {
        if(self.component_card_result.player) {
          for(var x = 0; x<self.component_card_result.player.length; x++) {
            self.component_card_result.player[x].x = (x*39) + 592.5;
            self.component_card_result.player[x].y = posY + 1;
            self.component_card_result.player[x].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
          }
        } //end if

        if(self.component_card_result.community) {
          for(var x = 0; x<self.component_card_result.community.length; x++) {
            self.component_card_result.community[x].x = (x*43) + 274;
            self.component_card_result.community[x].y = posY + 1;
            self.component_card_result.community[x].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
          }
        } //end if

        if(self.component_card_result.dealer) {
          for(var x = 0; x<self.component_card_result.dealer.length; x++) {
            self.component_card_result.dealer[x].x = (x*39) + 89.5;
            self.component_card_result.dealer[x].y = posY + 1;
            self.component_card_result.dealer[x].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
          }
        } //end if
      }
    } //end else
  }

  let evt = {
    init : function (games) {
      if(!this.fnFilterData(data)) return;
    },

    dealerchange : function(data) {
      if(!this.fnFilterData(data)) return;
      let dealerData = {"name" : data.dealerName, "image" : data.dealerImage}
      self.component_dealer.setDealer(dealerData);
    },

    lastrounds: function(data) {
      if(!this.fnFilterData(data)) return;
      self.component_lastRounds.setRound(data.lastround, true);
    }, // === end of lastrounds

    removeitem: function (data) {
      if(!this.fnFilterData(data)) return;
      let mod_cards = {
        player : [],
        community : [],
        dealer : []
      }

      if(data.gameInfo.player.length) {
        for(var x = 0; x < data.gameInfo.player.length; x++) {
          mod_cards.player.push("C"+data.gameInfo.player[x])
        }
      } else {
        mod_cards.player = []
      }

      if(data.gameInfo.flop.length) {
        for(var x = 0; x < data.gameInfo.flop.length; x++) {
          mod_cards.community.push("C"+data.gameInfo.flop[x])
        }

        if(data.gameInfo.turn) {
          mod_cards.community.push("C"+data.gameInfo.turn)
        }

        if(data.gameInfo.river) {
          mod_cards.community.push("C"+data.gameInfo.river)
        }
      } else {
        mod_cards.community = [];
      }

      if(data.gameInfo.dealer.length) {
        for(var x = 0; x < data.gameInfo.dealer.length; x++) {
          mod_cards.dealer.push("C"+data.gameInfo.dealer[x])
        }
      } else {
        mod_cards.dealer = []
      }

      for(var key in card_data) {
        for(var x = 0;x < card_data[key].length; x++) {
          if(card_data[key][x] != mod_cards[key][x]) {
            self.component_card_result.deleteCard(key)
          }
        }
      }

      mod_cards = _.pickBy(mod_cards,  (value, key) => {
        if(value.length) return {key : value}
      });

      card_data = mod_cards;

    },
    setbettingtime : function(data) {
      if(!this.fnFilterData(data)) return;

      self.roundphase = data.type;
      betTime = data.bettingTime;

      if (!self.component_timer.timer) timer_start = false;

      if (!timer_start) {
        playSound('bet-start');

        self.component_timer.startTime(parseInt(data.bettingTime), false, false, parseInt(data.totalTime));
        timer_start = true;

        currentTimeType = data.type;

        if (data.bettingTime < 2) return;

        switch(data.type) {
          case "startround":
            self.component_tableDraw.startBetAreaAnimation(self.component_betBoard.bet_areas[0]);
            self.component_tableDraw.startBetAreaAnimation(self.component_betBoard.bet_areas[1]);
            self.component_tableDraw.startBetAreaAnimation(self.component_betBoard.bet_areas[2]);
            break;

          case "flop" :
            self.component_timer.betting_start = false;
            if(self.component_extraBetButtons.getAmt('ante') && !self.component_extraBetButtons.foldCheckStatus.flop) {
              self.component_extraBetButtons.showButtons();
              self.component_tableDraw.startBetAreaAnimation(self.component_tableDraw.flop_area);
            }

            break;
          case "turn" :
            self.component_timer.betting_start = false;
            if(self.component_extraBetButtons.getAmt('flop') && !self.component_extraBetButtons.foldCheckStatus.turn) {
              self.component_extraBetButtons.showButtons();
              self.component_tableDraw.startBetAreaAnimation(self.component_tableDraw.turn_area);
            }

            break;
          case "river" :
            self.component_timer.betting_start = false;
            if(self.component_extraBetButtons.getAmt('flop') && !self.component_extraBetButtons.foldCheckStatus.river) {
              self.component_extraBetButtons.showButtons();
              self.component_tableDraw.startBetAreaAnimation(self.component_tableDraw.river_area);
            }

            break;
        } // end switch case
      }
    },
    inputitem : function(data) {
      if(!this.fnFilterData(data)) return;

      if(!data.gameInfo.burn.length && !data.gameInfo.dealer.length && !data.gameInfo.player.length && !data.gameInfo.flop.length && !data.gameInfo.river && !data.gameInfo.turn) return;

      self.component_card_result.visible = true;
      self.toggleView("result");
      //
      var temp = {
        community: [],
        player: [],
        dealer: []
      }

      for(var key in data.gameInfo) {
        if(key == 'flop') {
          temp.community.push(...data.gameInfo[key])
        }

        if(key == 'turn') {
          if(data.gameInfo[key])
            temp.community.push(data.gameInfo[key])
        }

        if(key == 'river') {
          if(data.gameInfo[key])
            temp.community.push(data.gameInfo[key])
        }

        if(key === 'player') {
          temp.player = data.gameInfo[key]
        }

        if(key === 'dealer') {
          temp.dealer = data.gameInfo[key]
        }

      } //end for

      for(var key in temp) {

        temp[key] = temp[key].map((e) => {
          if(e !== null) return "C" + e;
        });
      }

      for(var key in temp) {
        if(temp[key].length) {
          card_data[key] = temp[key]
        }
      }

      // if(data.gameInfo.flop.length && !data.gameInfo.turn && !data.gameInfo.river && (data.gameInfo.burn.length == 1)) {
      //   console.log("swipe for flop");
      //   card_data.community = data.gameInfo.flop.map(function (e){ return 'C' + e; })
      //   // if(self.component_betBoard.bet_areas[0].total_bet_amt && !self.component_tableDraw.flop_area.total_bet_amt) {
      //   //   if(!self.component_extraBetButtons.fold_check_btn.has_fold) {
      //   //     self.component_extraBetButtons.fold_check_btn.has_fold = true;
      //   //     self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.flop_area,"fold");
      //   //     self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.flop_area);

      //   //     self.component_extraBetButtons.hideButtons();

      //   //     $.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'flop'},  (response) => {
      //   //     });
      //   //   }
      //   // }
      // }

      // if(data.gameInfo.turn && !data.gameInfo.dealer.length && (data.gameInfo.burn.length == 2)) {
      //   console.log("swipe for turn");
      //   if (card_data.community.includes("C" + data.gameInfo.turn)) return;
      //   card_data.community.push("C" + data.gameInfo.turn);

      //   // if(self.component_betBoard.bet_areas[0].total_bet_amt && self.component_tableDraw.flop_area.total_bet_amt && !self.component_tableDraw.turn_area.total_bet_amt) {
      //   //   if(!self.component_extraBetButtons.fold_check_btn.has_check_turn) {
      //   //     self.component_extraBetButtons.fold_check_btn.has_check_turn = true;
      //   //     self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.turn_area,"check");
      //   //     self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.turn_area);

      //   //     self.component_extraBetButtons.hideButtons();

      //   //     $.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'turn'},  (response) => {
      //   //     });
      //   //   }
      //   // }
      // }

      // if(data.gameInfo.river && !data.gameInfo.dealer.length && (data.gameInfo.burn.length == 3)) {
      //   console.log("swipe for river");
      //   if (card_data.community.includes("C" + data.gameInfo.river)) return;
      //   card_data.community.push("C" + data.gameInfo.river);

      //   // if(self.component_betBoard.bet_areas[0].total_bet_amt && self.component_tableDraw.flop_area.total_bet_amt && !self.component_tableDraw.river_area.total_bet_amt) {
      //   //   if(!self.component_extraBetButtons.fold_check_btn.has_check_river) {
      //   //     self.component_extraBetButtons.fold_check_btn.has_check_river = true;
      //   //     self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.river_area,"check");
      //   //     self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.river_area);

      //   //     self.component_extraBetButtons.hideButtons();

      //   //     $.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'river'},  (response) => {
      //   //     });
      //   //   }
      //   // }
      // }

      // if(data.gameInfo.dealer.length) {
      //   card_data.dealer = data.gameInfo.dealer.map(function (e){ return 'C' + e; });
      // }

      if(self.mobile) {
        self.component_card_result.drawCards(card_data, 0.94,"new_cards",80,120);
      } else {
        self.component_card_result.drawCards(card_data, 0.49,"new_cards",190,263);
      }
      self.component_card_result.setCardResult(card_data);

      setCardPositions();
    },
    newround : function(data) {
      if(!this.fnFilterData(data)) return;

      console.log('newround: ', data);

      if (window.junket) {
        let date1 = new Date(data.currentDate);
        let date2 = new Date(window.vendorEndDate);

        if (date1 > date2) {
          let redirectTo = window.lobby_domain;
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
      }

      // Hide chip mask
      if(!self.mobile) {
        self.component_betBoard.chipWrap.visible = false;
      } else {
        self.component_chips.chipWrap.visible = false;
      }

      has_db_bets = false;
      // Last 10 rounds check
      if (!self.component_lastRounds.countdown) {
        self.component_lastRounds.visible = false;
      }

      self.temp_user_money = self.context.user_money;
      self.logUserMoney = 0;

      self.component_gameButtons.is_confirmed_bet = true;
      self.component_gameButtons.yourBets = [];
      self.saved_bets = [];
      self.component_betBoard.bet_cnt = 0;
      self.component_timer.clearTimer();

      $.post('/get/user', {userid : 997}, (response) => {
        self.context.user_money = JSON.parse(response).money;
        let amount = 0;

        if (window.casino == 'SS') {
          amount = self.component_winAmount.numberWithCommas(parseFloat(JSON.parse(response).money).toFixed(2));
        }
        else {
          amount = self.component_winAmount.numberWithCommas(parseInt(JSON.parse(response).money));
        }

        self.component_menuPlayerInfo.balance.text = amount;
        self.component_menuPlayerInfo.round.text = data.roundNum;
        self.component_betDetails.bet_amount = 0;
        self.component_betDetails.reinit(false, "on get user");
      });

      self.initRound();

      self.component_dealer.setRound(data.roundNum);
      timer_start = false;
      card_data = {};

      self.component_gameButtons.repeat = false;
      // self.component_gameButtons.checkRepeatButton();

      // self.component_extraBetButtons.fold_check_btn.visible = false;
      // self.component_extraBetButtons.fold_check_btn.type = "flop"
      // self.component_extraBetButtons.fold_check_btn.has_fold = false;
      // self.component_extraBetButtons.fold_check_btn.has_check_turn = false;
      // self.component_extraBetButtons.fold_check_btn.has_check_river = false;
    },
    displayresult : function (data) {
      if(!this.fnFilterData(data)) return;

      setTimeout(() => {
        self.initRound();
      }, 10000)
      
      self.user_no_bet_count++;

      if (self.user_no_bet_count > 7) {
        $('#promptnobet').show();
        $('.howto-wrap').css('z-index', 0);
        let promptInterval = setInterval(() => {
          if(redirect_timer == 0) {
            if(window.lobby_type == 'integrated'){
              window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
            } else {
              window.location = redirectTo;
            }
            clearInterval(promptInterval);
          }

          redirect_timer--;
          if(redirect_timer >= 0) {
            $('#promptnobet .redirect_timer').text(redirect_timer);
          }
        }, 1000);

        $('#promptnobet .btn-cont').click(() =>{
          $('#promptnobet').hide();
          $('.howto-wrap').css('z-index', "");
          clearInterval(promptInterval);
          redirect_timer = maxtimer;
          $('#promptnobet .redirect_timer').text(maxtimer);
          self.user_no_bet_count = 0;
        });

        $('#promptnobet .btn-back').click(() =>{
          if(window.lobby_type == 'integrated'){
            window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
          } else {
            window.location = redirectTo;
          }
          clearInterval(promptInterval);
        });
      }

      let color = null;
      let win_amt = 0;

      if(self.component_gameButtons.is_confirmed_bet) {
        self.player_data.total_bets ++;
      }

      self.component_dealer_data.dealer_data.total_num_games ++;
      self.component_winRes.setResult(data.gameResult.handtype);

      if(data.gameResult.winner == "dealer") {
        color = "#7f1d1d";
        playSound('dealer-win')
        self.component_dealer_data.dealer_data.total_win ++;

      } else if(data.gameResult.winner == "player"){
        color = "#0c3e66";
        playSound('player-win')
        if(self.component_gameButtons.is_confirmed_bet && self.component_tableDraw.flop_area.total_bet_amt) {
          self.player_data.total_win ++;
        }
        self.component_dealer_data.dealer_data.total_lose ++;
      } else if(data.gameResult.winner == "tie"){
        color = "#689f38";
        playSound('tie');
        if(self.component_gameButtons.is_confirmed_bet) {
          self.player_data.total_win ++;
        }
        self.component_dealer_data.dealer_data.total_win ++;
      }

      //New win animation
      let winArray = [];
      if (self.component_tableDraw.flop_area.total_bet_amt) {
        // Animation for FLOP, TURN, RIVER
        // self.component_extraBetButtons.animateChips(data.gameResult.winner);

        if (data.gameResult.winner == 'player') {
          winArray.push({'area' : 'ante', 'hand' : data.gameResult.handtype});
        }

        if (parseInt(data.gameResult[({b:"pocket",r:"bonus"})[type]+'Amount'] ) > 0) {
          winArray.push({'area' : 'bonus', 'multiplier' : data.gameResult[({b:"pocket",r:"bonus"})[type]+'Amount']});
        }

        if (type == 'b' && +data.gameResult.bonusplusAmount > 0) {
          winArray.push({'area' : 'bonusplus', 'multiplier' : data.gameResult.bonusplusAmount});
        }

        if (data.gameResult.winner == 'tie') {
          winArray.push({'area' : 'tie'});
        }
      }
      else {
        // self.component_extraBetButtons.animateChips('fold');
      }

      // self.component_betBoard.tableWinning(winArray);

      // if(self.component_gameButtons.is_confirmed_bet && self.mobile) {
      //   self.component_playerInfo.setUserStat(self.player_data);
      // }


      // if (self.mobile) {
      //   self.component_dealer_data.setData(self.component_dealer_data.dealer_data);
      // }

      if(data.gameResult.handtype == "Two Pair") {
        setTimeout(()=>{
          playSound('two-pair')
        },1000)
      }

      if(data.gameResult.handtype == "Pair") {
        setTimeout(()=>{
          playSound('one-pair')
        },1000)
      }

      if(data.gameResult.handtype == "Straight Flush") {
        setTimeout(()=>{
          playSound('straight-flush')
        },1000)
      }

      if(data.gameResult.handtype == "Three of a Kind") {
        setTimeout(()=>{
          playSound('three-of-a-kind')
        },1000)
      }

      if(data.gameResult.handtype == "Flush") {
        setTimeout(()=>{
          playSound('flush')
        },1000)
      }


      if(data.gameResult.handtype == "Royal Flush") {
        setTimeout(()=>{
          playSound('royal-flush')
        },1000)
      }

      if(data.gameResult.handtype == "Straight") {
        setTimeout(()=>{
          playSound('straight')
        },1000)
      }

      if(data.gameResult.handtype == "High Card") {
        setTimeout(()=>{
          playSound('high-card')
        },1000)
      }

      meta_data = data.meta;
      marks.push(data.mark);
      if(self.mobile) {
        self.component_roadmap.drawRoad(formatter().fnFormatPokerRoadMap(marks,6,23));
      } else {
        self.component_scoreBoard.setResult(data.meta);
        self.component_roadmap.drawRoad(formatter().fnFormatPokerRoadMap(marks,6,16));
      }

      self.component_roadmap.fnUpdateCaching(true);

      let winner = "";

      if(data.gameResult.winner.toLowerCase() == "dealer") {
        winner = window.language2.poker_winningdisplay_dealerwins;
      } else if(data.gameResult.winner.toLowerCase() =="player") {
        winner =  window.language2.poker_winningdisplay_playerwins;
      } else if(data.gameResult.winner.toLowerCase() =="tie") {
        winner =  window.language2.poker_winningdisplay_tie;
      }

      self.component_winnings.showWinAnimation(winner.toUpperCase(),color)

      if (data.gameResult.winner != "tie") {
        self.component_card_winning_res.createWin(data.gameResult.cardsCode.map((e)=>{return "C"+e }));
      }

      let tableSlave = window.bet_type == 'b' ? 'bonusplus' : 'normal';

      // $.post('/get/winAll/'+ window.tableNum, {round_id : self.component_dealer.round_id}, (response) => {
      // 	if(!parseInt(response.bet)) {
      // 		return;
      // 	} //end if

      // 	if(parseInt(response.total_win)) {
      // 		let win_amt = parseInt(response.total_win);

      // 		self.component_winnings.isWin();

      // 		if(response.slave == tableSlave) {
      // 			self.component_betDetails.win_amount = win_amt;
      // 			self.component_winAmount.total_win_text.text = self.component_winAmount.numberWithCommas(win_amt);
      // 			self.component_winAmount.animateAmtWin();
      // 			self.component_playerInfo.total_win++;
      // 		}

      // 		let u_money = 0;
      // 		if(response.user_money){
      // 		  u_money = window.casino == "SS" ? parseFloat(response.user_money) : parseInt(response.user_money)
      // 		} else {
      // 		  u_money = (window.casino == "SS" ? parseFloat(self.context.user_money) : parseInt(self.context.user_money))  + win_amt;
      // 		}
      // 		self.context.user_money = u_money
      // 		self.component_betDetails.reinit(true, "on win");
      // 	} //end if
      // });
    },
    updatecredits : function(data) {
      if(!this.fnFilterData(data)) return;

      let options = {
        font1 : fontFormat(24, 'normal', 'bebas', false),
        font2 : fontFormat(20, 'normal', 'bebas', false),
        radius : 18,
        maskScale : 0.6,
        textScale : 0.6,
        chipScale : 0.8
      }

      if(parseInt(window.multiplayer)) {
        options.chipScale = 0.8;
        options.maskScale = 0.6;
        options.textScale = 0.6;
        options.radius = 14;
        options.font1 = 'normal 16px BebasNeue';
        options.font2 = 'normal 12px BebasNeue';
        _toUseAreas = self.component_firstViewMultiplayer.bet_areas;
      }

      if (self.mobile) {
        if (self.component_betBoard.visible) {
          self.component_tableDraw.redrawChips();
          self.toggleView();
        }
      }

      let winOptions = {toScale : 0.8};
      let bets = [];
      let tempBets = data.payload.credits.bets;
      let user_money = 0;

      for(var key in tempBets) {
        bets.push({
          bet_money: tempBets[key].bet,
          bet: key,
          cancel : tempBets[key].cancel === undefined ? 0 : tempBets[key].cancel,
          win_money : tempBets[key].win
        })
      }

      let _toUseAreas = self.component_betBoard.bet_areas;

      if(parseInt(data.tableId) === parseInt(window.tableNum) && data.gameName == 'Poker') {
        //winning animation here
        ((bets, _toUseAreas) => {
          setTimeout(() => {
            for(var  i = 0; i < bets.length; i++) {
              for(var x = 0; x < _toUseAreas.length; x++) {

                //poker speicific
                if(bets[i].bet === 'flop' || bets[i].bet === 'turn' || bets[i].bet === 'river') {
                  var area = self.component_tableDraw[`${bets[i].bet}_area`];
                  let win = bets[i].win_money - area.total_bet_amt;
                  if(win > 0 ) {
                    (function (area, win, options, winOptions) {
                      setTimeout(() => {
                        self.component_winChips.createWinningChips(area, win, options);
                        self.component_winChips.animateWinLose(area, 'win', winOptions);
                      },1600)
                    })(area, win, options, winOptions)
                  } else if(win === 0) {
                    self.component_winChips.animateWinLose(area, 'win', winOptions);
                  } else {
                    self.component_winChips.animateWinLose(area, 'lose', winOptions);
                  }
                }

                if(bets[i].bet === _toUseAreas[x].table_name) {
                  let win_money = bets[i].win_money - _toUseAreas[x].total_bet_amt;
                  if(win_money > 0) {
                    (function (_toUseAreas, win_money, options) {
                      setTimeout(() => {
                        self.component_winChips.createWinningChips(_toUseAreas, win_money, options);
                        self.component_winChips.animateWinLose(_toUseAreas , 'win');
                      },1600)
                    })(_toUseAreas[x], win_money, options)

                  } else if(win_money == 0) {
                    (function (_toUseAreas) {
                      setTimeout(() => {
                        self.component_winChips.animateWinLose(_toUseAreas, 'win');
                      },1600)
                    })(_toUseAreas[x])
                  } else {
                    self.component_winChips.animateWinLose(_toUseAreas[x], 'lose', winOptions);
                  }
                }
              }
            }
          }, 2000)
        })(bets, _toUseAreas);
      }
      /* end of mobile winning here*/

      // amount reinit on update credit event //update money here
      if(window.integrationType == "transfer") {
        if(window.casino == "SS") {
          self.context.user_money = parseInt(data.payload.credits.money);
        } else {
          self.context.user_money = parseFloat(data.payload.credits.money).toFixed(2);
        }
        self.component_betDetails.reinit(true);
      } else {
        // if seamless get money frm api
        $.post('/get/user', (response) => {
          response = typeof response === 'string' ? JSON.parse(response) : response;
          if(response.money) {
            if(window.casino == "SS") {
              self.context.user_money = parseInt(response.money);
            } else {
              self.context.user_money = parseFloat(response.money).toFixed(2);
            }

            // self.component_betDetails.reinit(true);
          } // end if
        });
      }

      // notification for win starts here
      if (data.gameName != "Poker" || (data.gameName == "Poker" && data.tableId != window.tableNum)) {
        if(data.payload.credits.total_winning) {
          let gameText = data.gameName;

          switch(data.gameName){
            case "Baccarat" :
            gameText = window.language.gamename.baccarat_game;
            break;
            case "Dragon-Tiger" :
            gameText = window.language.gamename.dragontiger_game;
            break;
            case "Sicbo":
            gameText = window.language.gamename.sicbo_game;
            break;
            case "Poker":
            gameText = window.language.gamename.poker_game;
            break;
          }
          self.component_winAmount.animatePopup(`${gameText} #${data.tableId}`, parseInt(data.payload.credits.total_winning));
        }
      }
      else {
        if(parseInt(data.payload.credits.total_winning) > 0 && window.bet_type == data.payload.credits.type) {
          let diff = parseFloat(data.payload.credits.total_winning) - parseFloat(self.component_betDetails.bet_amount);
          if(diff > 0) {
            setTimeout(() => {
              self.component_winnings.isWin();
            }, 1000)
          }

          self.component_betDetails.win_amount = parseInt(data.payload.credits.total_winning);
          self.component_winAmount.total_win_text.text = self.component_winAmount.numberWithCommas(data.payload.credits.total_winning);

          setTimeout(() => {
            self.component_winAmount.total_win_text.visible = true;
            self.component_winAmount.animateAmtWin();
            self.component_betDetails.reinit(true);
          }, 1000)
        }
      }
    },
    create_room: function(data) {
      if(!this.fnFilterData(data)) return;

      if (window.junket) {
        console.log('createRoom: ', data)

        if (data.namespace == `${window.game}/${window.tableNum}`) {
          $('.junket-confirm').show();
          $('.mdl_message').html(window.language2.com_sub_ingameprompts_disableroom)
          $('.mdl_message').css({ 'padding-top': '17px' });
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
        }
      }

      // if (parseInt(data.data.banker.user_id) == parseInt(window.userId)) {
   //      $('#mdl_password-con').hide();
   //      $('#mdlConfirmation').show();
   //      $('#mdl_kick-con').show();
   //      $('.mdl_msg_bet').show();
   //      $('.mdl_message').css({'padding-top': '25px'});
   //      $('#mdl_gen_message').html("Banker can't play other games.")
   //      $('.mdl_lobby').show();
   //      $('.mdl_btn').hide();

   //     $('.mdl_lobby').click(function() {
   //        if(window.lobby_type == 'integrated'){
   //          window.location = window.lobby_redirect_url;
   //        } else {
   //          window.location = redirectTo;
   //        }
   //     });

   //     setTimeout(() => {
   //        if(window.lobby_type == 'integrated'){
   //          window.location = window.lobby_redirect_url;
   //        } else {
   //          window.location = redirectTo;
   //        }
   //      }, 5000)
   //   }
    }, // === end of create_room
    setroundprogress : function(data) {
      if(!this.fnFilterData(data)) return;

      timer_start = false;

      switch(self.roundphase) {
        case "startround":
          self.component_tableDraw.stopBetAreaAnimation(self.component_betBoard.bet_areas[0]);
          self.component_tableDraw.stopBetAreaAnimation(self.component_betBoard.bet_areas[1]);
          break;
        case "flop":
          self.component_extraBetButtons.hideButtons();
          self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.flop_area);

          // if(!self.component_extraBetButtons.fold_check_btn.has_fold) {
          //   $.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'flop'},  (response) => {
          //   });
          // }
          break;

        case "turn":
          self.component_extraBetButtons.hideButtons();
          self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.turn_area);
          // if(!self.component_extraBetButtons.fold_check_btn.has_check_turn && !self.component_extraBetButtons.fold_check_btn.has_fold) {
          //   $.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'turn'},  (response) => {
          //   });
          // }
          break;

        case "river":
          self.component_extraBetButtons.hideButtons();
          self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.river_area);
          // if(!self.component_extraBetButtons.fold_check_btn.has_check_river && !self.component_extraBetButtons.fold_check_btn.has_fold) {
          //   $.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'river'},  (response) => {
          //   });
          // }
          break;
      }
    },
    displaymodify : function(data) {
      if(!this.fnFilterData(data)) return;

      marks.pop();
      marks.push(data.data.mark);

      // for(var x = 0; x < data.data.meta; x++) {
      //  data.data.meta[x].gameInfo = JSON.parse(data.data.meta[x].gameInfo);
      // }

      for(var x = 0; x < data.meta.length; x++) {
        if(typeof(data.meta[x].gameInfo) == "string") {
          data.meta[x].gameInfo = JSON.parse(data.meta[x].gameInfo);
        }
        if(typeof(data.meta[x].gameResult) == "string") {
          data.meta[x].gameResult = JSON.parse(data.meta[x].gameResult);
        }
      }

      meta_data = data.meta

      if(self.mobile) {
        self.component_roadmap.drawRoad(formatter().fnFormatPokerRoadMap(marks,6,23));
      } else {
        self.component_scoreBoard.setResult(data.meta);
        self.component_roadmap.drawRoad(formatter().fnFormatPokerRoadMap(marks,6,16));
      }

      self.component_roadmap.updateCache();

      $.post('/get/winAll/' + window.tableNum, {round_id: data.data.roundId}, (response) => {
      	if (!parseInt(response.bet)) {
      		return;
      	} //end if
      	if (parseInt(response.total_win) > 0) {
      		let newMoney = parseInt(response.total_win) + self.context.user_money;
      		self.component_winAmount.total_win_text.text = self.component_winAmount.numberWithCommas(newMoney);
      		self.component_winAmount.animateAmtWin();
      		self.context.user_money = newMoney;
      		self.component_betDetails.reinit(true, "on win");
      	}
      });
    },
    displayRollback : function(data) {
      if(!this.fnFilterData(data)) return;

      marks.pop();

      for(var x = 0; x < meta_data.length; x++) {
        if(typeof(meta_data[x].gameInfo) == "string") {
          meta_data[x].gameInfo = JSON.parse(meta_data[x].gameInfo);
        }
        if(typeof(meta_data[x].gameResult) == "string") {
          meta_data[x].gameResult = JSON.parse(meta_data[x].gameResult);
        }
      }

      meta_data[0].isVoid = true;
      meta_data[0].gameInfo.isVoid = true;

      if(self.mobile) {
        self.component_roadmap.drawRoad(formatter().fnFormatPokerRoadMap(marks,6,23));
      } else {
        self.component_scoreBoard.setResult(meta_data);
        self.component_roadmap.drawRoad(formatter().fnFormatPokerRoadMap(marks,6,16));
      }

      self.component_roadmap.updateCache();
    },

    mainmaintenancechange: function(data) {
      if(!this.fnFilterData(data)) return;
      if (parseInt(data.data.status) && window.userAuthority != "admin") {
        if(window.lobby_type == 'integrated'){
          window.location = window.lobby_redirect_url;
        } else {
          window.location = redirectTo;
        }
      }
    }, // === end of mainmaintenancechange
    
    maintenanceChange: function(data) {
      if(!this.fnFilterData(data)) return;
      if (parseInt(data.data.status) && window.userAuthority != "admin") {
        if(window.lobby_type == 'integrated'){
          window.location = window.lobby_redirect_url;
        } else {
          window.location = redirectTo;
        }
      }
    }, // === end of maintenanceChange
    noticechange : function (data) {
      if(!this.fnFilterData(data)) return;
      if (parseInt(data.tableId) == parseInt(window.tableNum)) {
        let notice_content;

        if (typeof data.data.content !== 'object') {
  				notice_content = JSON.parse(data.data.content);
  			}

  			let notice_msg = window.language.locale == 'zh' ? notice_content['cn'] : notice_content[window.language.locale];

  			$('#notice-msg').text(notice_msg)

  			if (parseInt(data.data.status)) {
  				// $('#notice').addClass('active');
          $('#notice').animate({'left' : 0}, {
            duration: 200,
            start : function () {
              $(this).addClass('active')
            }
          });
  			} else {
  				// $('.maintenance-con').removeClass('active')
          $('#notice').animate({'left' : '-100%'}, {
            duration: 200,
            complete : function () {
              $(this).removeClass('active')
            }
          });
  			}


      }
    }, // end noticechange
    disableRoom: function (data) {
      if(window.lobby_type == 'integrated'){
        window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
      } else {
        window.location = redirectTo;
      }
    },
    fnFilterData: function (data) {
      if(`${data.gameName}/${data.tableId}` === `${window.game}/${window.tableNum}`) return true;
      return false;
    },
    connect: function () {
      self.socketAll.emit('data', {
        eventName: 'init',
        data: {
          userId: window.userId
        }
      });
    }
  } //evt

  self.socket = io.connect(window.socket + "Poker/" + window.tableNum, {
    transports: ['websocket']
  });

  self.socket.on('connect', function(socket) {
    evt.connect();
  });

  self.socket.on("data", (data) => {
    data = Xpacket.received(data)

    marks = data.data.marks;
    meta_data = data.data.meta;

    let gameInfo = data.data.gameInfo;

    if(_.isEmpty(gameInfo)) {
      self.roundphase = 'startround';
    } else {
      if(gameInfo.player.length === 1 || (gameInfo.player.length === 2 && !gameInfo.flop.length)) self.roundphase = 'startround';
      if(gameInfo.player.length === 2 && gameInfo.flop.length&& !gameInfo.turn) self.roundphase = 'flop';
      if(gameInfo.flop.length === 3 && gameInfo.turn && !gameInfo.river) self.roundphase = 'turn';
      if(gameInfo.turn && gameInfo.river) self.roundphase = 'river';
      if(gameInfo.turn && gameInfo.river && gameInfo.dealer.length) self.roundphase = 'endround';
    }

    // Check if banker in another game
    // if (window.isPlayer.toLowerCase() == 'f') {
    //   let delay = self.mobile ? 500 : 0;
    //   setTimeout(() => {
    //     $('#mdlConfirmation').show();
    //   }, delay)

    //   $('.mdl_lobby').click(function() {
    //     if(window.lobby_type == 'integrated'){
    //       window.location = window.lobby_redirect_url;
    //     } else {
    //       window.location = redirectTo;
    //     }
    //   });

    //   setTimeout(() => {
    //     if(window.lobby_type == 'integrated'){
    //       window.location = window.lobby_redirect_url;
    //     } else {
    //       window.location = redirectTo;
    //     }
    //   }, 5000)
    // }

    let dealerData = {
      name : data.data.currentDealer,
      image : data.data.dealerImage
    };

    self.component_dealer.setDealer(dealerData);

    //set round num
    window.round_id = data.data.currentRound;
    self.component_dealer.setRound(data.data.currentRound);

    if(!self.mobile) {
      for(var x = 0; x < data.data.meta.length; x++) {
        if(typeof(data.data.meta[x].gameInfo) == "string") {
          data.data.meta[x].gameInfo = JSON.parse(data.data.meta[x].gameInfo);
        }

        if(typeof(data.data.meta[x].gameResult) == "string") {
          data.data.meta[x].gameResult = JSON.parse(data.data.meta[x].gameResult);
        }
      }

      data.data.meta = _.filter(data.data.meta, (data) => {
        if(data.gameInfo) return data;
      });

      self.component_scoreBoard.setResult(data.data.meta);
    }

    /**db data check if cancel**/
    // if(window.bets) {
    //   let db_data = window.bets
    //   if(db_data.round_num == self.component_dealer.round_id) {
    //     has_db_bets = true;
    //     /** stop bet area animation on load if has bet */
    //     if(parseInt(JSON.parse(db_data.bet_history).ante.bet) > 0) {
    //       self.component_tableDraw.stopBetAreaAnimation(self.component_betBoard.bet_areas[0]);
    //     }

    //     if('bonus' in JSON.parse(db_data.bet_history) && parseInt(JSON.parse(db_data.bet_history).bonus.bet) > 0) {
    //       self.component_tableDraw.stopBetAreaAnimation(self.component_betBoard.bet_areas[1]);
    //     }

    //     if(parseInt(JSON.parse(db_data.bet_history).flop.bet) > 0) {
    //       // self.component_extraBetButtons.fold_check_btn.has_fold = true;
    //       self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.flop_area);
    //     }
    //     // checking if flop bet 0 and already on turn time /turn bet
    //     // case : when user doesnt fold flop & refreshes and doesnt go to roundprogress where insert in database cance = 1 happens
    //     if(!parseInt(JSON.parse(db_data.bet_history).flop.bet)){
    //       if(data.data.gameInfo.player && data.data.gameInfo.player.length == 2 && data.data.gameInfo.flop && data.data.gameInfo.flop.length) {
    //         // self.component_extraBetButtons.fold_check_btn.has_fold = true;
    //         // self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.flop_area,"fold");
    //         self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.flop_area);

    //         // self.component_extraBetButtons.hideButtons();

    //         $.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'flop'},  (response) => {
    //         });
    //       }
    //     }

    //     if(parseInt(JSON.parse(db_data.bet_history).turn.bet) > 0) {
    //       // self.component_extraBetButtons.fold_check_btn.has_check_turn = true;
    //       self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.turn_area);
    //     }

    //     if(parseInt(JSON.parse(db_data.bet_history).flop.bet) > 0 && !parseInt(JSON.parse(db_data.bet_history).turn.bet)){
    //       if(data.data.gameInfo.flop && data.data.gameInfo.flop.length ==  3 && data.data.gameInfo.turn) {

    //         // self.component_extraBetButtons.fold_check_btn.has_check_turn = true;
    //         // self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.turn_area,"check");
    //         // self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.turn_area);
    //         // self.component_extraBetButtons.hideButtons();
    //         $.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'turn'},  (response) => {
    //         });
    //       }
    //     }


    //     if(parseInt(JSON.parse(db_data.bet_history).river.bet) > 0) {
    //       // self.component_extraBetButtons.fold_check_btn.has_check_river = true;
    //       self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.river_area);
    //     }

    //     if(parseInt(JSON.parse(db_data.bet_history).flop.bet) > 0 && !parseInt(JSON.parse(db_data.bet_history).river.bet)){
    //       if(data.data.gameInfo.flop && data.data.gameInfo.flop.length ==  3 && data.data.gameInfo.turn && data.data.gameInfo.river) {


    //         // self.component_extraBetButtons.fold_check_btn.has_check_river = true;
    //         // self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.river_area,"check");
    //         // self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.river_area);

    //         // self.component_extraBetButtons.hideButtons();

    //         $.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'river'},  (response) => {
    //         });
    //       }
    //     }


    //     /** if has cancel drop respective fold or check chip */
    //     if(JSON.parse(db_data.bet_history).flop.cancel && JSON.parse(db_data.bet_history).flop.bet <= 0) {
    //       // self.component_extraBetButtons.fold_check_btn.has_fold = true;
    //       // self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.flop_area,"fold");
    //       // self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.flop_area);

    //       // self.component_extraBetButtons.hideButtons();
    //     }

    //     if(JSON.parse(db_data.bet_history).turn.cancel && !self.component_extraBetButtons.fold_check_btn.has_fold) {
    //       // self.component_extraBetButtons.fold_check_btn.has_check_turn = true;
    //       // self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.turn_area,"check");
    //       // self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.turn_area);

    //       // self.component_extraBetButtons.hideButtons();
    //     }

    //     if(JSON.parse(db_data.bet_history).river.cancel && !self.component_extraBetButtons.fold_check_btn.has_fold) {
    //       // self.component_extraBetButtons.fold_check_btn.has_check_river = true;
    //       // self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.river_area,"check");
    //       // self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.river_area);

    //       // self.component_extraBetButtons.hideButtons();
    //     }
    //   }
    // }

    var temp = {
      community: [],
      player: [],
      dealer: []
    }

    for(var key in data.data.gameInfo) {
      if(key == 'flop') {
        temp.community.push(...data.data.gameInfo[key])
      }

      if(key == 'turn') {
        temp.community.push(data.data.gameInfo[key])
      }

      if(key == 'river') {
        temp.community.push(data.data.gameInfo[key])
      }

      if(key === 'player') {
        temp.player = data.data.gameInfo[key]
      }

      if(key === 'dealer') {
        temp.dealer = data.data.gameInfo[key]
      }

    } //end for

    for(var key in temp) {

      temp[key] = temp[key].map((e) => {
        if(e !== null)
          return "C" + e;
      });

      temp[key] = _.filter(temp[key], function(e) {return e});
    }

    for(var key in temp) {
      if(temp[key].length) {
        card_data[key] = temp[key]
      }
    }


    if(!_.isEmpty(data.data.gameInfo)) {
      self.toggleView("result");

      if(self.mobile) {
        self.component_card_result.drawCardGameInfo(card_data, 0.94,"new_cards",80,120);
      }else {
        self.component_card_result.drawCardGameInfo(card_data, 0.49,"new_cards",190,263);
      }
      setCardPositions();
      self.component_card_result.setCardResult(card_data)
    }

    if(self.mobile) {
      self.component_roadmap.drawRoad(formatter().fnFormatPokerRoadMap(marks,6,23));
    } else {
      self.component_roadmap.drawRoad(formatter().fnFormatPokerRoadMap(marks,6,16));
    }

    self.component_roadmap.fnUpdateCaching(false);
    self.temp_user_money = self.context.user_money;

    // Remove chips if round end
    if (data.data.roundStatus == 'E') {
      self.initRound();
    }

    // Notice
    if (parseInt(data.data.noticeSetting.status)) {
      let notice_content;
      $('#notice').addClass('active').css({'left' : 0 });
      if (typeof data.data.noticeSetting.content !== 'object') {
        notice_content = JSON.parse(data.data.noticeSetting.content);
      }

      let notice_msg = window.language.locale == 'zh' ? notice_content['cn'] : notice_content[window.language.locale];

      $('#notice-msg').text(notice_msg)
    }

    // Redirect if maintenance
    if (window.userAuthority != "admin") {
      let mainSetting = [];

      if (parseInt(data.data.mainMaintenance.status) === 1) {
        var redirectTo = self.mobile ? window.lobby_domain+'m?game=true' : window.lobby_domain;
        if(window.lobby_type == 'integrated'){
          window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
        } else {
          window.location = redirectTo;
        }
      }

      for (var i = 0; i < data.data.maintenanceSetting.maintenance.length; i++) {
        let maintenanceData = data.data.maintenanceSetting.maintenance[i];

        if (tableSlave === maintenanceData.type) {
          mainSetting = maintenanceData.info;
        }
      }

      for (var i = 0; i < mainSetting.length; i++) {
        if (parseInt(mainSetting[i].status) === 1) {
          var redirectTo = self.mobile ? window.lobby_domain+'m?game=true' : window.lobby_domain;
          if(window.lobby_type == 'integrated'){
            window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
          } else {
            window.location = redirectTo;
          }
        }
      }
    }
  }); // end of socket on data

  self.socketAll = io.connect(window.socket + "all", {
    transports: ['websocket']
  });

  self.socketAll.on('connect',() => {
    self.socketAll.emit('register', {id: window.userId});
  });

  self.socketAll.on("data", (data)=>{
    data = Xpacket.received(data)
    // if(evt.fnFilterData(data)) return;
    switch(data.eventName) {
      case "reject":
        window.location = "/rejected"
        break;
      case "init":
        window.all_games = _.sortBy(data.data, function (e) {return e.namespace});
        window.all_games = _.filter(window.all_games, function (e) {
          return e.namespace != `${window.game}/${window.tableNum}`
        });
        multi.init(window.all_games);

        break;
      case "displayresults" :
        multi.displayresult(data);
        evt.displayresult(data);
        break;
      case "inputitem":
        multi.inputitem(data);
        evt.inputitem(data);
        break;
      case "removeitem":
        evt.removeitem(data);
        break;
      case "setroundhold" :
        break;
      case "setroundprogress" :
        multi.setroundprogress(data);
        evt.setroundprogress(data);
        break;
      case "shoechange" :
        if(!self.mobile)
          multi.shoechange(data);
        break;
      case "dealerchange" :
        evt.dealerchange(data);
        if(!self.mobile)
          multi.dealerchange(data);
        break;
      case "displaymodify" :
        evt.displaymodify(data);
        if(!self.mobile)
          multi.displaymodify(data);
        break;
      case ("lastrounds"):
        evt.lastrounds(data);
        break;
      case "stoptimer" :
        break;
      case "mainmaintenancechange" :
        evt.mainmaintenancechange(data);
        break;
      case "maintenanceChange":
        evt.maintenanceChange(data);
        if(!self.mobile)
          multi.maintenanceChange(data);
        break;
      case "mainnoticechange":
        break;
      case "noticechange":
        evt.noticechange(data);
        break;
      case "bets":
        break;
      case "updatecredits":
        multi.updatecredits(data);
        evt.updatecredits(data);
        break;
      case "displayRollback":
        evt.displayRollback(data)
        if(!self.mobile)
          multi.displayRollback(data);
        break;
      case "setbettingtime":
        multi.setbettingtime(data);
        evt.setbettingtime(data);
        break;
      case "newround":
        multi.newround(data);
        evt.newround(data);
        break;
      case "flip":
        if(!self.mobile)
          multi.flip(data);
        break;
      case "flippytimer" :
        if(!self.mobile)
          multi.flippytimer(data);
        break;
      case "create_room":
        let split_objt = {};
        let getdata = data.data;
        let split_data = getdata.id.split(/[|:]+/);

        split_objt.roomTable = split_data[1];
        split_objt.tableId = split_data[1];
        split_objt.vendorId = split_data[2];
        split_objt.roomName = split_data[3];
        split_objt.gameName = split_data[4];
        split_objt.roomType = split_data[5];
        split_objt.token = split_data[6];
        split_objt.betRange = split_data[7];
        split_objt.maxPlayer = split_data[8];
        split_objt.roomId = split_data[9];
        split_objt.namespace = split_data[4]+'/'+split_data[1];
        split_objt.avatar = getdata.avatar;
        split_objt.money = getdata.money;
        split_objt.password = getdata.password;
        split_objt.users = getdata.users;
        split_objt.userId = getdata.banker.user_id;
        split_objt.roundCount = getdata.roundCount;
        split_objt.userName = getdata.banker.user_name;
        split_objt.isMulti = getdata.isMulti;
        split_objt.gameDuration = getdata.expireDateUTC;

        data = split_objt;

        if(data.vendorId != window.vendor_id) return;

        evt.create_room(data);
        multi.createRemoveRoom(data, 1);
        break;
      case "remove_room":
        split_objt = {};
        getdata = data.data;
        split_data = getdata.roomId.split(/[|:]+/);

        split_objt.roomTable = split_data[1];
        split_objt.tableId = split_data[1];
        split_objt.vendorId = split_data[2];
        split_objt.roomName = split_data[3];
        split_objt.gameName = split_data[4];
        split_objt.roomType = split_data[5];
        split_objt.token = split_data[6];
        split_objt.betRange = split_data[7];
        split_objt.maxPlayer = split_data[8];
        split_objt.roomId = split_data[9];
        split_objt.namespace = split_data[4]+'/'+split_data[1];

        data = split_objt;

        if(data.vendorId != window.vendor_id) return;

        multi.createRemoveRoom(data, 0)
        break;
      case "disablechange":
        multi.enableDsiableChange(data);
        break;
      case "disable_room":
        evt.disableRoom(data);
        break;
    }
  });


  /***** simulate sample *****/
  $("#newround").on("click", function () {
    console.log("newround")
    evt.newround({"eventName":"newround","tableId":1,"roundId":72835,"roundNum":117124,"bettimer":10,"status":"S","dealerId":107, gameName: 'Poker'})
  })
  $("#setbettingtime").on("click", function () {
    console.log("timer")
    evt.setbettingtime({"eventName":"setbettingtime","roundId":72835,"roundNum":117124,"type":"startround","tableId":1,"bettingTime":30,"totalTime":30, gameName: 'Poker'})
  })
  $("#floptime").on("click", function () {
    console.log("timer")
    evt.setbettingtime({"eventName":"setbettingtime","roundId":72835,"roundNum":117124,"type":"flop","tableId":1,"bettingTime":10,"totalTime":10, gameName: 'Poker'})
  })
  $("#turntime").on("click", function () {
    console.log("timer")
    evt.setbettingtime({"eventName":"setbettingtime","roundId":72835,"roundNum":117124,"type":"turn","tableId":1,"bettingTime":10,"totalTime":10, gameName: 'Poker'})
  })
  $("#rivertime").on("click", function () {
    console.log("timer")
    evt.setbettingtime({"eventName":"setbettingtime","roundId":72835,"roundNum":117124,"type":"river","tableId":1,"bettingTime":10,"totalTime":10, gameName: 'Poker'})
  })

  var iItem = {
    inputitem1: {"roundId":72835,"eventName":"inputitem","tableId":1,"roundNum":117124,"gameInfo":{"burn":[],"player":["0005"],"dealer":[],"flop":[],"turn":null,"river":null}, gameName: 'Poker'},
    inputitem2: {"roundId":72835,"eventName":"inputitem","tableId":1,"roundNum":117124,"gameInfo":{"burn":[],"player":["0005","0044"],"dealer":[],"flop":[],"turn":null,"river":null}, gameName: 'Poker'},
    inputitem3: {"roundId":72835,"eventName":"inputitem","tableId":1,"roundNum":117124,"gameInfo":{"burn":["0037"],"player":["0005","0044"],"dealer":[],"flop":[],"turn":null,"river":null}, gameName: 'Poker'},
    inputitem4: {"roundId":72835,"eventName":"inputitem","tableId":1,"roundNum":117124,"gameInfo":{"burn":["0037"],"player":["0005","0044"],"dealer":[],"flop":["0024"],"turn":null,"river":null}, gameName: 'Poker'},
    inputitem5: {"roundId":72835,"eventName":"inputitem","tableId":1,"roundNum":117124,"gameInfo":{"burn":["0037"],"player":["0005","0044"],"dealer":[],"flop":["0024","0034"],"turn":null,"river":null}, gameName: 'Poker'},
    inputitem6: {"roundId":72835,"eventName":"inputitem","tableId":1,"roundNum":117124,"gameInfo":{"burn":["0037"],"player":["0005","0044"],"dealer":[],"flop":["0024","0034","0048"],"turn":null,"river":null}, gameName: 'Poker'},
    inputitem7: {"roundId":72835,"eventName":"inputitem","tableId":1,"roundNum":117124,"gameInfo":{"burn":["0037", "0037"],"player":["0005","0044"],"dealer":[],"flop":["0024","0034","0048"],"turn":null,"river":null}, gameName: 'Poker'},
    inputitem8: {"roundId":72835,"eventName":"inputitem","tableId":1,"roundNum":117124,"gameInfo":{"burn":["0037", "0037"],"player":["0005","0044"],"dealer":[],"flop":["0024","0034","0048"],"turn":"0048","river":null}, gameName: 'Poker'},
    inputitem9: {"roundId":72835,"eventName":"inputitem","tableId":1,"roundNum":117124,"gameInfo":{"burn":["0037", "0037","0005"],"player":["0005","0044"],"dealer":[],"flop":["0024","0034","0048"],"turn":"0048","river":null}, gameName: 'Poker'},
    inputitem10: {"roundId":72835,"eventName":"inputitem","tableId":1,"roundNum":117124,"gameInfo":{"burn":["0037", "0037","0005"],"player":["0005","0044"],"dealer":[],"flop":["0024","0034","0048"],"turn":"0048","river":"0049"}, gameName: 'Poker'},
    inputitem11: {"roundId":72835,"eventName":"inputitem","tableId":1,"roundNum":117124,"gameInfo":{"burn":["0037", "0037","0005"],"player":["0005","0044"],"dealer":["0021"],"flop":["0024","0034","0048"],"turn":"0048","river":"0049"}, gameName: 'Poker'},
    inputitem12: {"roundId":72835,"eventName":"inputitem","tableId":1,"roundNum":117124,"gameInfo":{"burn":["0037", "0037","0005"],"player":["0005","0044"],"dealer":["0021", "0032"],"flop":["0024","0034","0048"],"turn":"0048","river":"0049"}, gameName: 'Poker'}
  }

  $("#player1").on("click", function() {
    evt.inputitem(iItem.inputitem1);
  });

  $("#player2").on("click", function() {
    evt.inputitem(iItem.inputitem2);
  });
  $("#burn1").on("click", function() {
    evt.inputitem(iItem.inputitem3);
  });
  $("#flop1").on("click", function() {
    evt.inputitem(iItem.inputitem4);
  });
  $("#flop2").on("click", function() {
    evt.inputitem(iItem.inputitem5);
  });
  $("#flop3").on("click", function() {
    evt.inputitem(iItem.inputitem6);
  });
  $("#burn2").on("click", function() {
    evt.inputitem(iItem.inputitem7);
  });
  $("#turn").on("click", function() {
    evt.inputitem(iItem.inputitem8);
  });
  $("#burn3").on("click", function() {
    evt.inputitem(iItem.inputitem9);
  });
  $("#river").on("click", function() {
    evt.inputitem(iItem.inputitem10);
  });
  $("#banker1").on("click", function() {
    evt.inputitem(iItem.inputitem11);
  });
  $("#banker2").on("click", function() {
    evt.inputitem(iItem.inputitem12);
  });
  $("#roundprog").on("click", function() {
    evt.setroundprogress({"eventName":"setroundprogress","roundId":72835,"roundNum":117124, gameName: 'Poker'})
  });

  // for(var key in iItem) {
  //   //cards
  //   console.log($(`#${key}`), "ang gi call lol")
  //    $(`#${key}`).on("click", function () {
  //     evt.inputitem(iItem[key]);
  //   })
  // }

} //setCardPositions
