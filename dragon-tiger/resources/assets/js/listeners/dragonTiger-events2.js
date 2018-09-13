import Xpacket from '../lib/XPacket';
import cardsModule from '../factories/cards';
import fnFormat from '../factories/formatter';
import dragontigerTotal from '../factories/dragontigerTotal';
import {
  createSprite,
  randomNum,
  createCardSprite,
  numberCounter,
  playSound,
  numberWithCommas,
  createSpriteRoadMap,
  fontFormat
} from '../factories/factories';

import multibet from './multibet-events2';

let lang = window.language.locale == 'kr' ? 'ko' : window.language.locale;
let sounds = [
  {
    id: "tie",
    src: "/snd_v2_1/DragonTiger-" + lang + "/mode-1/tie.mp3"
  },
  {
    id: "welcome",
    src: "/snd_v2_1/DragonTiger-" + lang + "/mode-1/welcome.mp3"
  },
  {
    id: "dragon-win",
    src: "/snd_v2_1/DragonTiger-" + lang + "/mode-1/dragon-win.mp3"
  },
  {
    id: "bet-start",
    src: "/snd_v2_1/DragonTiger-" + lang + "/mode-1/bet-start.mp3"
  },
  {
    id: "tiger-win",
    src: "/snd_v2_1/DragonTiger-" + lang + "/mode-1/tiger-win.mp3"
  },
  {
    id: "suited-tie",
    src: "/snd_v2_1/DragonTiger-" + lang + "/mode-1/suited-tie.mp3"
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
  },
  {
    id : "alert",
    src : "/sound/alert.mp3"
  }
]
for (var x = 0; x < sounds.length; x++) {
  createjs.Sound.registerSound(sounds[x]);
}
export default(self) => {
  let multi = multibet(self.component_multibetv2);

  self.cards_gameInfo = null;

  let redirectTo = self.mobile ? window.lobby_domain+'m?game=true' : window.lobby_domain;
  if (window.nonInstall) redirectTo = window.lobby_domain+'non?game=true';

  let timer_start = false;
  let betTime = 0;
  let card_data = {};
  let cards = {};
  let refresh_card = {};

  let dealer_game_stat = {
    total_games: 0,
    dragon_win: 0,
    tiger_win: 0,
    tie_win: 0
  }

  //positions card
  let dragonX = 0;
  let tigerX = 0;
  let dragonY = 0;
  let tigerY = 0;
  let visible = false;

  let data_push = null;
  let dragontiger_marks = null;

  let detele_flag = 0;
  let maxtimer = 15;
  let redirect_timer = maxtimer;

  let _cardFlip = false;

  //not sure
  self.user_no_bet_count = 0;
  self.currently_ingame = false;

  let formatTemp = (data) => {
		let _temp = {};

    let dragon = data.dragon;
    let tiger = data.tiger;

    // === player
    if (dragon) {
      _temp["dragon"] = ["C" + dragon];
    } //
    // === banker
    if (tiger) {
      _temp["tiger"] = ["C" + tiger];
    } //

    return _temp;
	}

  let setCardPositions = () => {
    if (self.component_card_result.dragon && self.component_card_result.dragon.length) {
      let cardW = 0;
      let cardH = 0;
      cardH = 123.61;
      cardW = 89.3;

      for(var x=0; x < self.component_card_result.dragon.length; x++) {
        let card = self.component_card_result.dragon[x];

        let xPos = 620 - ((cardW + 20) * x) - 150;
        let yPos = (self.stage.baseHeight - cardH) - 25;

        if(x == 2) {
          yPos += (cardW - 10);
          xPos -= ((cardH/2)+20)
          card.rotation = -90;
        }

        if(!card.isset) {
          card.set({
            y: yPos - 50,
            x : xPos,
            isset : true
          });
           card.alpha = 0;
          createjs.Tween.get(card)
          .to({ alpha : 1 , y : card.y + 50 }, 500, createjs.Ease.quintInOut);
        }
      }
    } //end if

    if (self.component_card_result.tiger && self.component_card_result.tiger.length) {
      let cardW = 0;
      let cardH = 0;
      cardH = 123.61;
      cardW = 89.3;

      for(var x=0; x < self.component_card_result.tiger.length; x++) {
        let card = self.component_card_result.tiger[x];

        let xPos = (self.stage.baseWidth - 620) + ((cardW + 20) * x) + 150;
        let yPos = (self.stage.baseHeight - cardH) - 25;

        if(x == 2) {
          yPos += (cardW - 10);
          xPos += ((cardH/2)+20)
          card.rotation = 90;
        }

        if(!card.isset) {
          card.set({
            y: yPos - 50,
            x : xPos,
            isset : true
          });
          card.alpha = 0;
          createjs.Tween.get(card)
          .to({ alpha : 1 , y : card.y + 50 }, 500, createjs.Ease.quintInOut);
        }
      }
    } //end if
  } // end setCardPositions

  let formatCards = (data) => {
    let dragon = data.dragon;
    let tiger = data.tiger;

    let dragonCard = self.component_card_result.dragon && self.component_card_result.dragon.length ? self.component_card_result.dragon[0] : null;
    let tigerCard = self.component_card_result.tiger && self.component_card_result.tiger.length ? self.component_card_result.tiger[0] : null;
    // === player
    if (dragon) {
      cards["dragon"] = ["C" + dragon];
    } //

    // === banker
    if (tiger) {
      cards["tiger"] = ["C" + tiger];
    } //

    let cond1 = dragon && tiger;

    if(cond1) {
      _cardFlip = true
    };
  } //formatCards

  let evt = {
    init : function (games) {
      if(!this.fnFilterData(data)) return;
    }, //end init

    dealerchange : function (data) {
      if(!this.fnFilterData(data)) return;
      let dealerData = {
        "name": data.dealerName,
        "image": data.dealerImage
      }
      self.component_dealer.setDealer(dealerData);
    }, //end dealerchange

    removeitem : function (data) {
      detele_flag = 1;
      cards = {};

      self.component_card_result.removeAllChildren();
      self.component_card_result.draon = [];
      self.component_card_result.tiger = [];

      delete self.component_card_result.dragon;
      delete self.component_card_result.tiger;

      self.component_card_result_total.setDragonValue(0);
      self.component_card_result_total.setTigerValue(0);
    }, //end removeitem

    shoechange: function (data) {
      if(!this.fnFilterData(data)) return;

      self.component_betDetails.win_amount = 0;
      self.component_betDetails.bet_amount = 0;
      self.component_betDetails.reinit(false);

      self.component_roomInfo.resetData();

      self.roadMarks = []
      dragontiger_marks = [];
      self.currently_ingame = false;
      self.component_card_result_total.visible = false;

      self.component_roadmap.shoeChange();

      // if (!self.mobile) {
      //   try {
      //     self.component_scoreBoard.updateCache();
      //     // self.component_roadmap.updateCache();
      //   } catch (err) {
      //     console.log(err)
      //   }
      // }

      // self.component_roadmap.updateCache();

      let game_stat = {
        total_games: 1,
        dragon_win: 0,
        tiger_win: 0,
        tie_win: 0
      }

      // self.component_dealer_data.setStats(game_stat);

      //Set message
      self.component_messages.setMessage(window.language2.com_sub_ingameprompts_shoechanged);

      setTimeout(() => {
        self.component_messages.gold_instance.scaleX = 0;
        self.component_messages.message_text.scaleX = 0;
        self.component_messages.message_text.alpha = 0;
      }, 3000);

      self.initRound();

      self.component_gameButtons.confirmButton.gotoAndStop("disabled");
      self.component_gameButtons.repeatButton.gotoAndStop("disabled");
      self.component_gameButtons.undoButton.gotoAndStop("disabled");

    }, //end shoechange

    setbettingtime: function (data) {
      if(!this.fnFilterData(data)) return;

      if (!self.component_timer.timer) timer_start = false;
      if (!timer_start) {
        playSound('bet-start');
        self.component_timer.startTime(parseInt(data.bettingTime), false, false, parseInt(data.totalTime));
        timer_start = true;
      }
    }, //end setbettingtime

    inputitem: function (data) {
      if(!this.fnFilterData(data)) return;
      if (data.type == "burn") return;

      if(detele_flag) {
        self.component_card_result.dragon = []
        self.component_card_result.tiger = []

        delete self.component_card_result.dragon;
        delete self.component_card_result.tiger;
        detele_flag = 0;
      }
      // card_data[data.type] = [data.value ? "C" + data.value : ""];

      setTimeout(() => {
        if (data.type == 'dragon') {
          self.component_card_result_total.setDragonValue(cardsModule(data.value).value);
        } else {
          self.component_card_result_total.setTigerValue(cardsModule(data.value).value);
        }
      }, 2500);

      self.cards_gameInfo = data.gameInfo;

      if(!self.component_card_result_total.visible) {
	     self.showResult();
	    //   visible = true;
	    }

      // self.component_card_result_total.visible = true;
      // self.component_card_result.visible = (window.tutorial_enabled) ? false : true;
      // self.component_card_result_total.visible = (window.tutorial_enabled) ? false : true;

      formatCards(self.cards_gameInfo);

      if (self.mobile) {
        self.component_card_result.drawCards(cards, 0.74, "cards", 80, 120);
      } else {
        self.component_card_result.drawCards(cards, 0.47, "cards", 190, 263);
      }

      if (self.component_card_result.dragon && self.component_card_result.dragon.length) {
        self.component_card_result.dragon.forEach((dragon, x) => {
          dragon.code = cards.dragon[x]
          if (!dragon.flag) {
            dragon.gotoAndStop("back_blue")
            dragon.flag = 1;
          }
        });
      }

      if (self.component_card_result.tiger && self.component_card_result.tiger.length) {
        self.component_card_result.tiger.forEach((tiger, x) => {
          tiger.code = cards.tiger[x]
          if (!tiger.flag) {
            tiger.gotoAndStop("back_red")
            tiger.flag = 1;
          }
        });
      }

      if(_cardFlip) { // if card should flip
        var timeout = 3000;
        if(self.mobile) {
          timeout = 3000
        }

        ((cards, data) => {
          let _tempCards = formatTemp(data.gameInfo);
          setTimeout(() => {
            self.component_card_result.setCardResult(_tempCards);
          }, timeout);

        })(cards, data);
      }

      setCardPositions();

      // Display card
  		// setTimeout(() => {
  		// 	self.component_card_result.setCardResult(card_data);
      //
  		// 	if (data.type == 'dragon') {
  		// 		self.component_card_result_total.setDragonValue(cardsModule(data.value).value);
  		// 	} else {
  		// 		self.component_card_result_total.setTigerValue(cardsModule(data.value).value);
  		// 	}
      //
  		// 	if (self.mobile) {
  		// 		if (data.type == 'dragon') {
  		// 			self.component_card_result_total.setVal("dragon", cardsModule(data.value).value);
  		// 		} else {
  		// 			self.component_card_result_total.setVal("tiger", cardsModule(data.value).value);
  		// 		}
  		// 	}
  		// }, 2000)

    }, //end inputitem

    newround: function (data) {
      if(!this.fnFilterData(data)) return;

      if (window.junket) {
        for (var i = 0; i < self.component_junketEvents.junketUsers.length; i++) {
          if (self.component_junketEvents.junketUsers[i].isBetting) {
            self.component_junketEvents.junketUsers[i].isBetting = false;
          }
        }
      }

      if (self.disabledRoom) {
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
      }

	    _cardFlip = false;

      if(!self.mobile) {
        // self.component_betBoard.chipWrap.visible = false;
        self.firstRound = false;
      } else {
        self.component_chips.chipWrap.visible = false;
      }

      // Room info
      self.component_roomInfo.resetData();
      // if (parseInt(window.room_yn) === 1) {
      //   self.component_roomInfo.resetData();
      //   self.component_roomInfo.visible = true;
      // }

      self.component_betBoard.bet_cnt = 0;

      self.logUserMoney = 0;

      self.component_gameButtons.is_confirmed_bet = true;
      self.component_gameButtons.yourBets = [];
      self.saved_bets = [];

      self.component_card_result.icon_click = [];
      self.component_timer.clearTimer();
      // self.component_card_result.visible = (window.tutorial_enabled) ? false : true;

      cards = {};
      self.cards_gameInfo = null;

      self.component_card_result_total.visible = false;

      self.confirm = false;
      self.component_timer.betting_start = true;

      $.post('/get/user', {userid: window.userId}, (response) => {
  			let amount = 0;
  			self.context.user_money = JSON.parse(response).money;

  			self.component_betDetails.reinit(false)

  			if (window.casino == 'SS') {
  				amount = self.component_winAmount.numberWithCommas(parseFloat(JSON.parse(response).money).toFixed(2));
  			}
  			else {
  				amount = self.component_winAmount.numberWithCommas(parseInt(JSON.parse(response).money));
  			}

  			// self.component_betDetails.user_money.text = self.component_betDetails.setUserMoney(parseInt(self.context.user_money))

  			self.component_menuPlayerInfo.balance.text = amount;
  			self.component_menuPlayerInfo.round.text = data.roundNum;
  		});

      window.round_id = data.roundNum
  		window.bets = {
  			round_id: data.roundNum
  		}

      self.component_dealer.setRound(data.roundNum);
      self.initRound();
      timer_start = false;
      refresh_card = {};
      card_data = {};

      self.component_multiplayer.removePlayersOnNewRound()

      // Room info
      if (parseInt(window.room_yn) === 1) {
        self.component_roomInfo.resetData();
        self.component_roomInfo.visible = true;
      }

      // self.component_multiplayer.removePlayersOnNewRound()

      if (self.mobile) {
        self.component_firstViewMultiplayer.removePlayersOnNewRound()
      }
    }, //end newround

    displayresult : function (data) {
      if (data.type == "burn") return;
      if (!this.fnFilterData(data)) return;
      self.user_no_bet_count++;

      setTimeout(() => {
        self.initRound();
      }, 10000)

      if (self.is_create === false || (self.is_create === true && self.is_banker === false)) {
        if (window.junket && !_.isEmpty(window.vendorData)) self.user_no_bet_count = 0;

        if (self.user_no_bet_count > 7) {
          $('#promptnobet').show();
          $('.howto-wrap').css("z-index", 0);
          let promptInterval = setInterval(() => {
            if(redirect_timer == 0) {
              if(window.lobby_type == 'integrated'){
                window.location = window.lobby_redirect_url;
              } else {
                window.location = redirectTo;
              }
              clearInterval(promptInterval);
            }

            redirect_timer--;
            if(redirect_timer >= 0)
            {
              $('#promptnobet .redirect_timer').text(redirect_timer);
            }
          }, 1000);

          $('#promptnobet .btn-cont').click(() =>{
            $('#promptnobet').hide();
            $('.howto-wrap').css("z-index", "");
            $('#promptnobet .redirect_timer').text(maxtimer);

            clearInterval(promptInterval);
            redirect_timer = maxtimer;

            self.user_no_bet_count = 0;
          });

          $('#promptnobet .btn-back').click(() =>{
            if(window.lobby_type == 'integrated'){
              window.location = window.lobby_redirect_url;
            } else {
              window.location = redirectTo;
            }
            clearInterval(promptInterval);
          });
        }
      }

      if (self.component_gameButtons.is_confirmed_bet) {
        self.player_data.total_bets += self.component_gameButtons.yourBets.filter((o, i) => {
          return o.table_id == "dragon" || o.table_id == "tiger";
        }).length;
      }

      self.roadMarks.push(data.mark);
      self.component_roadmap.shoe_counter.text = self.roadMarks.length
      self.component_roadmap.drawPearlRoad(self.roadMarks);
      self.component_roadmap.drawBigRoad(self.roadMarks);
      self.component_roadmap.drawBigeyeBoy(self.roadMarks);
      self.component_roadmap.drawSmallRoad(self.roadMarks);
      self.component_roadmap.drawCockroachRoad(self.roadMarks);
      self.component_roadmap.checkPrediction(self.roadMarks);
      self.component_roadmap.setScoreCount(self.roadMarks);
      self.component_roadmap.fnUpdateCaching(true);

      setTimeout(() => {
        self.hideResult()
        visible = false;
      },6000);

      dealer_game_stat.total_games++;

      let win_amt = 0;
      let winners = [];
      let win = "";
  		let winning_asset = "";
      let color = "";

      winners.push(data.gameResult.winner);

      if (data.gameResult.winner == "tiger") {
        dealer_game_stat.tiger_win++;
        winning_asset = "tiger";
        playSound('tiger-win');
        win = window.language2.dragontiger_winningdisplay_tigerwins;
      } else if (data.gameResult.winner == "dragon") {
        dealer_game_stat.dragon_win++;
        winning_asset = "dragon";
        playSound('dragon-win');
        win = window.language2.dragontiger_winningdisplay_dragonwins;
      } else if (data.gameResult.winner == "tie") {
        winning_asset = "tie";
        dealer_game_stat.tie_win++;
        playSound('tie');
        win = window.language2.dragontiger_winningdisplay_tie;
      } else if(data.gameResult.winner == "suited tie") {
        winning_asset = "tie";
        dealer_game_stat.tie_win++;
        playSound('suited-tie');
        win = window.language2.dragontiger_betlayout_suitedtie;
      }

      // To check (BONO)
  		if(data.gameResult.side_bets["dragon"] == "seven" && data.gameResult.side_bets["tiger"] == "seven") {
  			winners.push('tie');
  		}
  		else if(data.gameResult.side_bets["dragon"] == "seven"){
  			let tiger_pair = !data.gameResult.side_bets["tiger"].parity ? "" : "tiger" + "_" + data.gameResult.side_bets["tiger"].parity;
  			let tiger_size = !data.gameResult.side_bets["tiger"].size ? "" : "tiger" + "_" + data.gameResult.side_bets["tiger"].size;
  			let tiger_suite = !data.gameResult.side_bets["tiger"].suite ? "" : "tiger" + "_" + data.gameResult.side_bets["tiger"].suite + "s";
  			winners.push(tiger_pair, tiger_size, tiger_suite, data.gameResult.winner);
  		}
  		else if(data.gameResult.side_bets["tiger"] == "seven"){
  			let dragon_pair = !data.gameResult.side_bets["dragon"].parity ? "" : "dragon" + "_" + data.gameResult.side_bets["dragon"].parity;
  			let dragon_size = !data.gameResult.side_bets["dragon"].size ? "" : "dragon" + "_" + data.gameResult.side_bets["dragon"].size;
  			let dragon_suite = !data.gameResult.side_bets["dragon"].suite ? "" : "dragon" + "_" + data.gameResult.side_bets["dragon"].suite + "s";
  			winners.push(dragon_pair, dragon_size, dragon_suite, data.gameResult.winner);
  		}
  		else{
  			let dragon_pair = !data.gameResult.side_bets["dragon"].parity ? "" : "dragon" + "_" + data.gameResult.side_bets["dragon"].parity;
  			let dragon_size = !data.gameResult.side_bets["dragon"].size ? "" : "dragon" + "_" + data.gameResult.side_bets["dragon"].size;
  			let dragon_suite = !data.gameResult.side_bets["dragon"].suite ? "" : "dragon" + "_" + data.gameResult.side_bets["dragon"].suite + "s";
  			let tiger_pair = !data.gameResult.side_bets["tiger"].parity ? "" : "tiger" + "_" + data.gameResult.side_bets["tiger"].parity;
  			let tiger_size = !data.gameResult.side_bets["tiger"].size ? "" : "tiger" + "_" + data.gameResult.side_bets["tiger"].size;
  			let tiger_suite = !data.gameResult.side_bets["tiger"].suite ? "" : "tiger" + "_" + data.gameResult.side_bets["tiger"].suite + "s";

  			if (data.gameResult.winner == 'suited tie') {
  				data.gameResult.winner = 'suited_tie';
  				winners.push('tie');
  			}

  			winners.push(dragon_pair, dragon_size, dragon_suite, tiger_pair, tiger_size, tiger_suite, data.gameResult.winner);
  		}

      let winner = data.gameResult.winner == 'suited tie' ? 'suited_tie' : data.gameResult.winner;
  		self.component_card_result_total.setWin(winner); //highligts card bg background

  		if (self.mobile) {
  			self.component_card_result_total.setVal("dragon", cardsModule(data.gameInfo.dragon).value);
  			self.component_card_result_total.setVal("tiger", cardsModule(data.gameInfo.tiger).value);
  		}

      if (data.gameResult.winner == "tiger") {
  			color = "#7f1d1d";
  		} else {
  			color = "#0c3e66";
  		}

  		self.component_winning_assets.winning_asset[winning_asset].scaleX = self.component_winning_assets.winning_asset[winning_asset].scaleY = 0;
  		setTimeout(() => {
  			createjs.Tween.get(self.component_winning_assets.winning_asset[winning_asset])
  			.to({
  				scaleX: 1.3,
  				scaleY: 1.3,
  				alpha: 1
  			}, 300)
  			.to({
  				scaleX: 1,
  				scaleY: 1
  			}, 80)

  		}, 2000)

  		setTimeout(() => {
  			createjs.Tween.get(self.component_winning_assets.winning_asset[winning_asset])
  			.to({
  				scaleX: 1,
  				scaleY: 1,
  				alpha: 1
  			}, 300)
  			.to({
  				scaleX: 0,
  				scaleY: 0,
  				alpha: 0
  			}, 80)
  		}, 5000)

  		self.component_winning_assets.visible = 1;

      setTimeout(() => {
        if (!self.component_winnings.visible) {
          self.component_winnings.visible = 1;
        } else {
          self.component_winnings.visible = 0;
        }

  			self.component_winnings.showWinAnimation(win, color);
  		}, 2000)


  		// if (!self.mobile) {
  		self.component_roadmap.shoe_counter.text = self.roadMarks.length
  		// }

      // Animate winning
      let multiplayerFlag = false;
      if (parseInt(window.multiplayer)) {
        multiplayerFlag = true;
        self.component_multiplayer.tableWin(winners);

        // if (self.mobile) {
        //   self.component_firstViewMultiplayer.tableWin(winners);
        // }
      }

      self.component_betBoard.tableWinning(winners, multiplayerFlag)

      if (self.mobile) {
        if (self.component_betBoard.visible) {
          self.component_tableDraw.redrawChips();
          self.toggleView();
        }
      }

      self.component_betBoard.bet_areas.forEach((e) => {
	      if (_.includes(winners, e.table_name) && e.chips.length && self.component_gameButtons.is_confirmed_bet) {
	        if(e.table_name == "dragon" || e.table_name == "tiger") {
	          self.player_data.total_win++;
	        }
	      }
	    });

      if (self.mobile) {
  			if (self.component_betBoard.visible) {
  				self.component_tableDraw.redrawChips();
  				self.toggleView();
  			}

  			self.component_secondView.tableWinning(winning);
  			self.component_firstViewMultiplayer.tableWinning(winning);
  		}

      let options = {
        font1 : fontFormat(24, 'normal', 'bebas', false),
        font2 : fontFormat(20, 'normal', 'bebas', false),
        radius : 18,
        maskScale : 0.6,
        textScale : 0.6,
        chipScale : 0.8
      }

      if(self.junketAgent && !self.multiplayer) {
        self.component_betBoard.bet_areas.forEach((e)=> {
          if(e.chips.length) {
            if(_.find(winners, function(a) {return a == e.table_name})) {
              console.log(e, "winnninnngggg", e.payout_multiplier)
              let win_money = e.payout_multiplier * e.total_bet_amt;

              setTimeout(() => {
                self.component_winChips.createWinningChips(e, win_money, options);
              },1600)
              
            } else {
              self.component_winChips.animateWinLose(e, 'lose');
            }
          }
        });
      }
    }, //end displayresult

    updatecredits : function (data) {
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
        options.maskScale = 0.8;
        options.textScale = 0.7;
      }

      if (self.mobile) {
        if (self.component_betBoard.visible) {
          self.component_tableDraw.redrawChips();
          self.toggleView();
        }
      }

      let bets = data.payload.credits.bets;
      let _toUseAreas = _.filter(self.component_betBoard.bet_areas, function (area) {
        if(parseInt(window.multiplayer)) {
          return area.multiplayer
        }
        return area.singleplayer
      });

      if(parseInt(data.tableId) === parseInt(window.tableNum) && data.gameName == `${window.game}`) {
        //winning animation here
        ((bets, _toUseAreas) => {
          setTimeout(() => {
            for(var  i = 0; i < bets.length; i++) {
              for(var x = 0; x < _toUseAreas.length; x++) {
                if(bets[i].bet === _toUseAreas[x].table_name) {
                  // Temp checking for tie / suited tie
                  // if(bets[i].bet === 'dragon' || bets[i].bet === 'tiger') {
                  //   bets[i].win_money = _toUseAreas[x].total_bet_amt / 2;
                  // }

                  let win_money = bets[i].win_money - _toUseAreas[x].total_bet_amt;

                  if(win_money > 0) {
                    (function (_toUseAreas, win_money, options) {
                      setTimeout(() => {
                        self.component_winChips.createWinningChips(_toUseAreas, win_money, options);
                        self.component_winChips.animateWinLose(_toUseAreas , 'win');
                      },1600)
                    })(_toUseAreas[x], win_money, options)
                  } else if (win_money < 0 && bets[i].win_money > 0) { //suited tie/tie wins

                    let win = bets[i].win_money;
                    let indicator = '';

                    if(win >= 1000 && win < 1000000) {
                      win = win/1000;
                      indicator = 'K';
                    } else if(win >= 1000000) {
                      win = win/1000;
                      indicator = 'M';
                    }

                    (function (_toUseAreas, win_money, options) {
                      setTimeout(() => {
                        self.component_winChips.animateWinLose(_toUseAreas, 'lose');
                        _toUseAreas.winChips = [];
                        self.component_winChips.createWinningChips(_toUseAreas, win_money, {}, true);
                      },1600)
                    })(_toUseAreas[x], bets[i].win_money, options)

                  } else if(win_money < 0 && bets[i].win_money === 0) { // no win
                    self.component_winChips.animateWinLose(_toUseAreas[x], 'lose');
                  }
                }
              }
            }
          }, 2000)
        })(bets, _toUseAreas);
      }
      /* end of web winning here*/

      // amount reinit on update credit event //update money here
      if(window.integrationType == "transfer") {
        if(parseInt(data.payload.credits.total_winning) > 0) {
          if(window.casino == "SS") {
            self.context.user_money = parseInt(data.payload.credits.money);
          } else {
            self.context.user_money = parseFloat(data.payload.credits.money).toFixed(2);
          }
          self.component_betDetails.reinit(true);
        }
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
            self.component_betDetails.reinit(true);
          } // end if
        });
      }
      // notification for win starts here
      if (data.gameName != window.game || (data.gameName == window.game && data.tableId != window.tableNum)) {
        if(data.payload.credits.total_winning) {
          let gameText = data.gameName;

          switch(data.gameName){
            case "Baccarat" :
            gameText = window.language2.lobby_gamename_baccarat;
            break;
            case "Dragon-Tiger" :
            gameText = window.language2.lobby_gamename_dragontiger;
            break;
            case "Sicbo":
            gameText = window.language2.lobby_gamename_sicbo;
            break;
            case "Poker":
            gameText = window.language2.lobby_gamename_poker;
            break;
          }
          self.component_winAmount.animatePopup(`${gameText} #${data.tableId}`, parseInt(data.payload.credits.total_winning));
        }
      } else {
        if (parseInt(data.payload.credits.total_winning) > 0) {

          let diff = parseFloat(data.payload.credits.total_winning) - parseFloat(self.component_betDetails.bet_amount);
          if(diff > 0) {
            setTimeout(() => {
              self.component_winnings.isWin();
            }, 2000)
          }

          self.component_betDetails.win_amount = data.payload.credits.total_winning;
          self.component_betDetails.reinit(false);
          self.component_winAmount.total_win_text.text = self.component_winAmount.numberWithCommas(data.payload.credits.total_winning);

          setTimeout(() => {
            self.component_winAmount.total_win_text.visible = true;
            self.component_winAmount.animateAmtWin();
            self.component_betDetails.reinit(true);
          },8000)
        }
      } //end if
    }, //end updatecredits

    create_room: function(data) {
      if(!this.fnFilterData(data)) return;

      if (window.junket) {
        if (data.namespace == `${window.game}/${window.tableNum}`) {
          $('.junket-confirm').show();
          $('.mdl_message').html(window.language2.com_sub_ingameprompts_createsecretroom)
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

    setroundprogress : function (data) {
      if(!this.fnFilterData(data)) return;
      self.component_timer.timer = 0
    }, //end setroundprogress

    displaymodify : function (data) {
      if(!this.fnFilterData(data)) return;

      if (!data.data.mark.length) {
        return;
      }

      self.roadMarks = data.data.mark;

      // Update displayed data
      // if(!self.mobile) {
      // 	self.component_roadmap.drawPearlRoad(fnFormat().fnFormatDTPearlRoad(self.roadMarks, 6, 12))
      // } else {
      // 	self.component_roadmap.drawPearlRoad(fnFormat().fnFormatDTPearlRoad(self.roadMarks, 6, 13))
      // }
      self.component_roadmap.drawPearlRoad(self.roadMarks);
      self.component_roadmap.drawBigRoad(self.roadMarks);
      self.component_roadmap.drawBigeyeBoy(self.roadMarks);
      self.component_roadmap.drawSmallRoad(self.roadMarks);
      self.component_roadmap.drawCockroachRoad(self.roadMarks);
      self.component_roadmap.checkPrediction(self.roadMarks)
      self.component_roadmap.setScoreCount(self.roadMarks);

      self.component_roadmap.fnUpdateCaching(true);

      $.post('/get/winAll/' + window.tableNum, {round_id: data.data.roundId}, (response) => {
        if (!parseInt(response.bet)) {
          return;
        } //end if

        if (parseInt(response.total_win) > 0) {
          let newMoney = parseInt(response.total_win) + self.context.user_money;
          self.component_winAmount.total_win_text.text = self.component_winAmount.numberWithCommas(newMoney);
          self.component_winAmount.animateAmtWin();
          self.context.user_money = newMoney;
          self.component_betDetails.reinit(true, "is win events");
        }
      });
    }, //end displaymodify

    displayRollback : function (data) {
      if(!this.fnFilterData(data)) return;

      self.roadMarks.pop();
      self.component_roadmap.shoe_counter.text = self.roadMarks.length;

      // if (!self.mobile) {
      //   self.component_roadmap.drawPearlRoad(fnFormat().fnFormatDTPearlRoad(self.roadMarks, 6, 12))
      // } else {
      //   self.component_roadmap.drawPearlRoad(fnFormat().fnFormatDTPearlRoad(self.roadMarks, 6, 13))
      // }

      self.component_roadmap.drawPearlRoad(self.roadMarks);
      self.component_roadmap.drawBigRoad(self.roadMarks);
      self.component_roadmap.drawBigeyeBoy(self.roadMarks);
      self.component_roadmap.drawSmallRoad(self.roadMarks);
      self.component_roadmap.drawCockroachRoad(self.roadMarks);
      self.component_roadmap.checkPrediction(self.roadMarks)
      self.component_roadmap.setScoreCount(self.roadMarks);

      self.component_roadmap.fnUpdateCaching(true);
    }, //end displayRollback

    bets : function (data) {
      if(!this.fnFilterData(data)) return;
      self.component_roomInfo.updateInfo(data.data, data.totalBettingUsers);
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
      if (self.component_gameButtons.yourBets.length) {
        self.disabledRoom = true;
      } else {
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
      }
    },
    disablechange: function (data) {
      if(!this.fnFilterData(data)) return;

      if (data.gameName == window.game && data.vendor_id == window.vendor_id && data.tableId == window.tableNum) {
        if (data.status) {
          if (self.component_gameButtons.yourBets.length) {
            self.disabledRoom = true;
          } else {
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
          }
        } else {
          self.disabledRoom = false;
        }
      }
    },
    fnFilterData: function (data) {
      if(`${data.gameName}/${data.tableId}` === `${window.game}/${window.tableNum}`) return true;
      return false;
    },

    connect : function (data) {
      self.socketAll.emit('data', {
        eventName: 'init',
        data: {
          userId: window.userId
        }
      });
    } //end connect

  } //en evt

  // self.socket = io.connect(window.socket + "Dragon-Tiger/" + window.tableNum, {
  //   transports: ['websocket']
  // });

  // self.socket.on('connect', function(socket) {
  //   evt.connect();
  // });
  // self.socket.on("data", (data) => {
  //   data = Xpacket.received(data);

  //   if (window.isPlayer.toLowerCase() == 'f') {
		// 	let delay = self.mobile ? 500 : 0;
		// 	setTimeout(() => {
		// 		$('#mdlConfirmation').show();
		// 	}, delay)

		// 	$('.mdl_lobby').click(function() {
		// 		if(window.lobby_type == 'integrated'){
		// 			window.location = window.lobby_redirect_url;
		// 		} else {
		// 			window.location = redirectTo;
		// 		}
		// 	});

		// 	setTimeout(() => {
		// 		if(window.lobby_type == 'integrated'){
		// 			window.location = window.lobby_redirect_url;
		// 		} else {
		// 			window.location = redirectTo;
		// 		}
		// 	}, 5000)
		// }

  //   self.currently_ingame = true;
		// self.roadMarks = data.data.marks;

  //   let dealerData = {
  //     name: data.data.currentDealer,
  //     image: data.data.dealerImage
  //   }

  //   self.component_dealer.setDealer(dealerData);

  //   //set round num
  //   window.round_id = data.data.currentRound;
  //   self.component_dealer.setRound(data.data.currentRound);
  //   self.component_roadmap.shoe_counter.text = self.roadMarks.length;

  //   if (!_.isEmpty(data.data.gameInfo) && (data.data.gameInfo.dragon || data.data.gameInfo.tiger)) {
  //     cards = {
  //       dragon: [],
  //       tiger: []
  //     };

  //     _.forEach(data.data.gameInfo, (row, key) => {
  //       if (!row || !cards[key]) {
  //         return;
  //       }

  window.socketConnect = (self) => {
    self.socket = io.connect(window.socket + "Dragon-Tiger/" + window.tableNum, {
      transports: ['websocket']
    });

    self.socket.on('connect', function(socket) {
      evt.connect();
    });
    self.socket.on("data", (data) => {
      data = Xpacket.received(data);

    //   if (window.isPlayer.toLowerCase() == 'f') {
  		// 	let delay = self.mobile ? 500 : 0;
  		// 	setTimeout(() => {
  		// 		$('#mdlConfirmation').show();
  		// 	}, delay)

  		// 	$('.mdl_lobby').click(function() {
  		// 		if(window.lobby_type == 'integrated'){
  		// 			window.location = window.lobby_redirect_url;
  		// 		} else {
  		// 			window.location = redirectTo;
  		// 		}
  		// 	});

  		// 	setTimeout(() => {
  		// 		if(window.lobby_type == 'integrated'){
  		// 			window.location = window.lobby_redirect_url;
  		// 		} else {
  		// 			window.location = redirectTo;
  		// 		}
  		// 	}, 5000)
  		// }

      self.currently_ingame = true;
  		self.roadMarks = data.data.marks;

      let dealerData = {
        name: data.data.currentDealer,
        image: data.data.dealerImage
      }

      self.component_dealer.setDealer(dealerData);

      //set round num
      window.round_id = data.data.currentRound;
      self.component_dealer.setRound(data.data.currentRound);
      self.component_roadmap.shoe_counter.text = self.roadMarks.length;

      if (!_.isEmpty(data.data.gameInfo) && (data.data.gameInfo.dragon || data.data.gameInfo.tiger)) {
        cards = {
          dragon: [],
          tiger: []
        };

        _.forEach(data.data.gameInfo, (row, key) => {
          if (!row || !cards[key]) {
            return;
          }

          cards[key].push(`C${row}`);
        });

        // if (data.data.gameInfo.tiger || data.data.gameInfo.dragon) {
    		// 	self.component_card_result_total.visible = (window.tutorial_enabled) ? false : true;
    		// }

    		self.showResult();
    		visible = true;

    		if (self.mobile) {
    			self.component_card_result.drawCardGameInfo(cards, 0.74, "cards", 80, 120);
    		} else {
    			self.component_card_result.drawCardGameInfo(cards, 0.47, "cards", 190, 263);
    		}

        self.component_card_result_total.setDragonValue(cardsModule(data.data.gameInfo.dragon).value);
        self.component_card_result_total.setTigerValue(cardsModule(data.data.gameInfo.tiger).value);

        if (self.component_card_result.dragon && self.component_card_result.dragon.length) {
          self.component_card_result.dragon.forEach((dragon, x) => {
            dragon.code = cards.dragon[x]
            if (!dragon.flag) {
              dragon.gotoAndStop("back_blue")
              dragon.flag = 1;
            }
          });
        }

        if (self.component_card_result.tiger && self.component_card_result.tiger.length) {
          self.component_card_result.tiger.forEach((tiger, x) => {
            tiger.code = cards.tiger[x]
            if (!tiger.flag) {
              tiger.gotoAndStop("back_red")
              tiger.flag = 1;
            }
          });
        }

        self.component_card_result.setCardResult(cards);

        setCardPositions();

        // Remove chips if round end
        if (data.data.roundStatus == 'E') {
          self.initRound();
        }

        // Redirect if maintenance
        if (window.userAuthority != "admin" && (  parseInt(data.data.mainMaintenance.status) || parseInt(data.data.maintenanceSetting[0].status) || parseInt(data.data.maintenanceSetting[1].status)  )  ) {
          if(window.lobby_type == 'integrated'){
            window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
          } else {
            window.location = redirectTo;
          }
        }
      } //end of drawing gameinfo if not empty

      if (data.data.totalBettingUsers == 0 ) {
        self.component_roomInfo.resetData();
      } else {
        self.component_roomInfo.updateInfo(data.data.betInfo, data.data.totalBettingUsers);
      }

      // Notice
      if (parseInt(data.data.noticeSetting.status)) {
        let notice_content;
        $('#notice').addClass('active').css({'left' : 0 });
        if (typeof data.data.noticeSetting.content !== 'object') {
          notice_content = JSON.parse(data.data.noticeSetting.content);
        } else {
          notice_content = data.data.noticeSetting.content;
        }

        let notice_msg = window.language.locale == 'zh' ? notice_content['cn'] : notice_content[window.language.locale];
        $('#notice-msg').text(notice_msg)
      } else {
        $('.maintenance-con').removeClass('active')
      }

      // if (data.data.mainNotice) {
      //   if (parseInt(data.data.mainNotice.status)) {
      //     self.component_announcement.setAnnouncement(data.data.mainNotice, true);
      //   }
      //
      //   if (parseInt(data.data.noticeSetting.status)) {
      //     self.component_announcement.setAnnouncement(data.data.noticeSetting, false);
      //   }
      // }
      self.roadMarks = data.data.marks;
      self.component_roadmap.shoe_counter.text = self.roadMarks.length

      self.component_roadmap.drawPearlRoad(self.roadMarks);
      self.component_roadmap.drawBigRoad(self.roadMarks);
      self.component_roadmap.drawBigeyeBoy(self.roadMarks);
      self.component_roadmap.drawSmallRoad(self.roadMarks);
      self.component_roadmap.drawCockroachRoad(self.roadMarks);

      self.component_roadmap.checkPrediction(self.roadMarks);
      self.component_roadmap.setScoreCount(self.roadMarks);

      self.component_roadmap.fnUpdateCaching(false);

      if (!data.data.marks.length) {
        self.component_card_result_total.visible = false
      }
    });

    self.socketAll = io.connect(window.socket + "all", {
      transports: ['websocket']
    });

    self.socketAll.on('connect',() => {
      self.socketAll.emit('register', {id: window.userId});
    });

    self.socketAll.on("data", (data)=>{
      data = Xpacket.received(data)

      switch(data.eventName) {
        case "reject":
          window.location = "/rejected"
          break;

        case "init":
          if(!self.mobile)
           multi.init(data.data);
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
          evt.shoechange(data);
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
          evt.noticechange(data)
          break;

        case "bets":
          evt.bets(data);
          break;

        case "updatecredits":
          multi.updatecredits(data);
          evt.updatecredits(data);
          break;

        case "displayRollback":
          evt.displayRollback(data);
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
          //
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
        case ("chatFromSocket"):
          if (window.junket) {
            if (parseInt(data.roomId) == parseInt(window.vendorData.roomId)) {
              self.component_junketEvents.setMessage(data, 'receive', data.sender);
            }
          }
          break;
        case ("roomBroadcast"):
          if (window.junket) {
            if (data.token == window.vendorData.token && window.userId != window.vendorData.bankerId) {
              self.component_junketEvents.setMessage(data, 'receiveBroadcast', window.userId);
            }
          }
          break;
        case "remove_room":
          if (!data.vendorExpired) {
            self.component_junketEvents.removeRoom(data.data.roomId);
          }

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
          evt.disablechange(data);
          multi.enableDsiableChange(data);
          break;
        case "disable_room":
          // evt.disableRoom(data);
          break;
      }
    });
  }

  window.socketConnect(self);
} // end export
