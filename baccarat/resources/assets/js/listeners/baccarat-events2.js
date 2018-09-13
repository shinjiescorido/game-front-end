import Xpacket from '../lib/XPacket';
import cardsModule from '../factories/cards';
import baccaratTotal from '../factories/baccaratTotal';
import {
  playSound,
  numberWithCommas,
  getSlaveParam
} from '../factories/factories';

import {flippy as fpf} from '../flippy-controller';
import emulator from '../components/emulate';

import multibet from './multibet-events2';

let lang = window.language.locale == 'kr' ? 'ko' : window.language.locale;
let sounds = [{
    id: "tie",
    src: "/snd_v2_1/baccarat-" + lang + "/mode-1/tie.mp3"
  },
  {
    id: "welcome",
    src: "/snd_v2_1/baccarat-" + lang + "/mode-1/welcome.mp3"
  },
  {
    id: "player-win",
    src: "/snd_v2_1/baccarat-" + lang + "/mode-1/player-win.mp3"
  },
  {
    id: "player-pair",
    src: "/snd_v2_1/baccarat-" + lang + "/mode-1/player-pair.mp3"
  },
  {
    id: "bet-start",
    src: "/snd_v2_1/baccarat-" + lang + "/mode-1/bet-start.mp3"
  },
  {
    id: "banker-win",
    src: "/snd_v2_1/baccarat-" + lang + "/mode-1/banker-win.mp3"
  },
  {
    id: "banker-pair",
    src: "/snd_v2_1/baccarat-" + lang + "/mode-1/banker-pair.mp3"
  },
  {
    id: "banker-wins-super6",
    src: "/snd_v2_1/baccarat-" + lang + "/mode-1/banker-wins-super6.mp3"
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
	let flip_time_cnt = 0;
	let flipEnd_cnt = 0;

	let redirectTo = self.mobile ? window.lobby_domain+'m?game=true' : window.lobby_domain;
  if (window.nonInstall) redirectTo = window.lobby_domain+'non?game=true';

  let timer_start = false;
  let betTime = 0;
  let cards = {};
  let dealer_game_stat = {
    total_games: 0,
    banker_win: 0,
    player_win: 0
  };

  let flippyFlag = false;
  let flippy_data = null;
  let bankerhit;
  let playerhit;
  let toFlipcards = [];
  let cardResAdjustX = 715;
  let cardResAdjustY = 50;
  let visible = false;
  let tableSlave = getSlaveParam(window.slave != "" ? window.slave : 'normal')?window.slave:'normal';

  // === flippy
  let flipCard = null;
  let flippyStage = null;
  let selected_flip_card = null;
  let tempFlipData = null;
  let flippyFlip = true;
  let player_info_stat = {
    total_bets: 0,
    total_win: 0
  }
  let isflip = false;

  let detele_flag = 0;
  let maxtimer = 15;
  let redirect_timer = maxtimer;
  let flippy_timer_start = false;
  let _cardFlip = false;

  self.user_no_bet_count = 0;

 	//new init flippy
  if(window.t_type == "flippy") {
    fpf.init(self);
  }

  self.card_flip_cnt = 0;
  self.flipped_game_info = {};

  let isSuperSix = () =>{
    return getSlaveParam('supersix');
  }

  let isDragonBonus = () =>{
    return getSlaveParam('bonus');
  }

  let formatTemp = (data) => {
		let _temp = {};

    let player1 = data.player1, player2 = data.player2, player3 = data.player3;
    let banker1 = data.banker1, banker2 = data.banker2, banker3 = data.banker3;

    // === player
    if (player1) {
      _temp["player"] = ["C" + player1];
    } //
    if (player2) {
      _temp["player"][1] = "C" + player2;
    } //
    if (player3) {
      _temp["player"][2] = "C" + player3;
    } //

    // === banker
    if (banker1) {
      _temp["banker"] = ["C" + banker1];
    } //
    if (banker2) {
      _temp["banker"][1] = "C" + banker2;
    } //
    if (banker3) {
      _temp["banker"][2] = "C" + banker3;
    } //

    return _temp;
	}

	let setCardPositions = () => {

    let space = 20;
    let  cardH = 123.61, cardW = 89.3;

    let stageWidth = self.stage.baseWidth;
    let stageHeight = self.stage.baseHeight;
    let offsetX = 620;
    let additionalX = 150;
    let additionalY = 25;

    if(!self.mobile) { //if desktop
      if (self.component_card_result.player && self.component_card_result.player.length) {
        for(var x=0; x < self.component_card_result.player.length; x++) {
          if(!self.component_card_result.player[x]) continue
          let card = self.component_card_result.player[x];

          let xPos = offsetX - ((cardW + space) * x) - additionalX;
          let yPos = (stageHeight - cardH) - additionalY;

          if(x == 2) {
            yPos += (cardW - 10);
            xPos += ((cardH/2)-space)
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

      if (self.component_card_result.banker && self.component_card_result.banker.length) {
        for(var x=0; x < self.component_card_result.banker.length; x++) {
          let card = self.component_card_result.banker[x];

          let xPos = (stageWidth - offsetX) + ((cardW + space) * x) + additionalX;
          let yPos = (stageHeight - cardH) - additionalY;

          if(x == 2) {
            yPos += (cardW - 10);
            xPos += ((cardH/2)+space)
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
    } else { //if mobile
      self.setCardPositions();
    } //end if
	}

	let formatCards = (data) => {
    let player1 = data.player1, player2 = data.player2, player3 = data.player3;
    let banker1 = data.banker1, banker2 = data.banker2, banker3 = data.banker3;

    if(player1) {
      cards["player"] = ["C" + player1];
    }

    if(player1 && player2) {
      cards["player"][1] = "C" + player2;
    }

    if(player1 && player2 && player3) {
      cards["player"][2] = "C" + player3;
    }

    if(banker1) {
      cards["banker"] = ["C" + banker1];
    }

    if(banker1 && banker2) {
      cards["banker"][1] = "C" + banker2;
    }

    if(banker1 && banker2 && banker3) {
      cards["banker"][2] = "C" + banker3;
    }
    // let playerCard = self.component_card_result.player && self.component_card_result.player.length ? self.component_card_result.player[0] : null;
    // let bankerCard = self.component_card_result.banker && self.component_card_result.banker.length ? self.component_card_result.banker[0] : null;
    // // === player
    // if (player1) {
    //   cards["player"] = ["C" + player1];
    // } //
    // if (player1 && player2 && playerCard && cards["player"][0]) {
    //   cards["player"][1] = "C" + player2;
    // } //
    // if (player3 && cards["player"][1]) {
    //   cards["player"][2] = "C" + player3;
    // } //

    // // === banker
    // if (banker1) {
    //   cards["banker"] = ["C" + banker1];
    // } //
    // if (banker1 && banker2 && bankerCard && cards["banker"][0]) {
    //   cards["banker"][1] = "C" + banker2;
    // } //
    // if (banker3 && cards["banker"][1]) {
    //   cards["banker"][2] = "C" + banker3;
    // } //

    let cond1 = player1 && banker1;

    _cardFlip = true
    // if(cond1) {
    //   _cardFlip = true
    //   if(banker2 && !player2) _cardFlip = false;
    //   if(player2 && !banker2) _cardFlip = false;

    //   if(banker2 && player2) _cardFlip = true;
    // };
  }

 	let isNatural =  (side) => {
    let scores = baccaratTotal(self.cards_gameInfo);
    return self.component_card_result[side] && self.component_card_result[side].length == 2 && [8, 9].indexOf(scores[side]) !== -1;
  }

  let shouldHit = (type) => {
    let scores = {};
    const playerCardLen = self.component_card_result.player ? self.component_card_result.player.length : 0;
    const playerLastCard = !_.isEmpty(self.cards_gameInfo) && self.cards_gameInfo.player3 ? cardsModule(self.cards_gameInfo.player3).value : '';

    let playerGameInfo = _.pickBy(self.cards_gameInfo, function(value, key) {
      return _.startsWith(key, "player");
    });
    let bankerGameInfo = _.pickBy(self.cards_gameInfo, function(value, key) {
      return _.startsWith(key, "banker");
    });
    scores = baccaratTotal(self.cards_gameInfo);

    if (isNatural('banker') || isNatural('player')) {
        return false;
    }

    if (self.component_card_result[type].length >= 3) {
        return false;
    }

    if (type == 'player' && scores.player <= 5) {
        return true;
    }

    if (type == 'player') {
        return false;
    }

    // banker rules
    if (scores.banker <= 2) {
        return true;
    }

    if (shouldHit('player') && scores.banker > 2) {
        return false;
    }

    if (playerCardLen == 2 && [3, 4, 5].indexOf(scores.banker) !== -1) {
        return true;
    }

    if (scores.banker === 3 && playerLastCard !== 8) {
        return true;
    }

    if (scores.banker <= 5 && [6, 7].indexOf(scores.player) !== -1 && playerCardLen == 2) {
        return true;
    }

    if (scores.banker === 4 && [0, 1, 8, 9].indexOf(playerLastCard) == -1) {
        return true;
    }

    if (scores.banker === 5 && [0, 1, 2, 3, 8, 9].indexOf(playerLastCard) == -1) {
        return true
    }

    return scores.banker === 6 && [6, 7].indexOf(playerLastCard) !== -1;
  }

	let evt = {

		init : function (data) {
			// if(!this.fnFilterData(data)) return;
      // for(var key in data.rooms) {
      //   var splitKey = key.split(':');
      //   let roomId = splitKey[5];
      //   let game = splitKey[2].split('|')[2];
      //   if(parseInt(roomId) === parseInt(window.vendorData.roomId) && game === window.game) {
      //     window.multiplayer = data.rooms[key].isMulti == true ? 1 : 0
      //     console.log(data.rooms[key].isMulti, "window", window.multiplayer) 
      //     self.multiplayer =  parseInt(window.multiplayer);
      //     self.toggleBet();
      //     console.log(window.multiplayer, "toglg here222")
      //   }
      // }

		},
    mainmaintenancechange : function(data) {
      if(!this.fnFilterData(data)) return;
      if (parseInt(data.data.status) && window.userAuthority != "admin") {
        if(window.lobby_type == 'integrated'){
          window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
        } else {
          window.location = redirectTo;
        }
      }
    },
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
    mainnoticechange: function (data) {
      if(!this.fnFilterData(data)) return;
      // self.component_announcement.setAnnouncement(data.data);
    },
		dealerchange : function(data) {
			if(!this.fnFilterData(data)) return;
      let dealerData = {
        "name": data.dealerName,
        "image": data.dealerImage
      }
      self.component_dealer.setDealer(dealerData);
		},
		removeitem: function (data) {
      if(!this.fnFilterData(data)) return;
	    detele_flag = 1;
	    cards = {};

	    self.component_card_result.removeAllChildren();
	    self.component_card_result.player = [];
	    self.component_card_result.banker = [];

	    delete self.component_card_result.banker;
	    delete self.component_card_result.player;

	    self.component_card_result_total.setPlayerValue(0);
	    self.component_card_result_total.setBankerValue(0);

	    self.burn_card_con.removeAllChildren();
		},
		setbettingtime : function(data) {
			if(!this.fnFilterData(data)) return;

			if (!self.component_timer.timer) timer_start = false;
			if (!timer_start) {
				playSound('bet-start');
				self.component_timer.startTime(parseInt(data.bettingTime)+1, false, false, parseInt(data.totalTime));
				timer_start = true;
			}
		},
		inputitem : function(data) {
      if(!this.fnFilterData(data)) return;
      if(window.tutorial_enabled) return;
	    if(toFlipcards && toFlipcards.length && toFlipcards[0].card_type == "player" && toFlipcards.length == 2) {
	    	// toFlipcards = toFlipcards.reverse()
	    }

	    if(detele_flag) {
	      self.component_card_result.player = []
	      self.component_card_result.banker = []

	      delete self.component_card_result.player;
	      delete self.component_card_result.banker;
	      detele_flag = 0;
	    }

	    if (window.t_type != "flippy") {
        (()=> {
          setTimeout((info) => {
            self.component_card_result_total.setPlayerValue(baccaratTotal(data.gameInfo).player);
            self.component_card_result_total.setBankerValue(baccaratTotal(data.gameInfo).banker);
          }, 2500);
        })(data.gameinfo);

	    }

	    self.cards_gameInfo = data.gameInfo;

	    if(!self.component_card_result_total.visible) {
	     self.showResult();
	    //   visible = true;
	    }

      formatCards(self.cards_gameInfo);

	    if (self.mobile) {
	      self.component_card_result.drawCards(cards, 0.94, "cards", 75, 100);
	    } else {
	      self.component_card_result.drawCards(cards, 0.47, "cards", 190, 263);
	    }

	    if (self.component_card_result.banker && self.component_card_result.banker.length) {
	      self.component_card_result.banker.forEach((banker, x) => {
	        banker.code = cards.banker[x]
	        if (!banker.flag) {
	          banker.gotoAndStop("back_red")
            banker.flag = 1;
	        }
	      });
	    }

	    if (self.component_card_result.player && self.component_card_result.player.length) {
	      self.component_card_result.player.forEach((player, x) => {
	        player.code = cards.player[x]
	        if (!player.flag) {
	          player.gotoAndStop("back_blue")
            player.flag = 1;
	        }
	      });
	    }

	    if (window.t_type != "flippy") {
	      if(_cardFlip) { // if card should flip
	        var timeout = 3000;
	        if(self.mobile) {
	          timeout = 3000
	        }

	        ((cards, data) => {
	          // let _tempCards = formatTemp(data.gameInfo);
	          setTimeout(() => {
	            self.component_card_result.setCardResult(cards)//(_tempCards);
	          }, timeout);

	        })(cards, data);
	      }

	    } else if (window.t_type == "flippy") {
        $('#open-all').text(window.language2.baccarat_winningdisplay_openall);

	      if(self.mobile) {
	        $(".fpf-container").show();
	      }
	      //player 2 cards on 3rd card swipe
	      if(self.saved_bets && self.saved_bets.length) {
	        if((cards.player && cards.player.length > 2) || (cards.banker && cards.banker.length > 2)) {
	          self.component_card_result.player[0].gotoAndStop(cards.player[0]);
	          self.component_card_result.player[0].isAnim = true;
	          self.component_card_result.player[0].is_flip = true;
	          self.component_card_result.player[1].gotoAndStop(cards.player[1]);
	          self.component_card_result.player[1].isAnim = true;
	          self.component_card_result.player[1].is_flip = true;

	          self.component_card_result.banker[0].gotoAndStop(cards.banker[0]);
	          self.component_card_result.banker[0].isAnim = true;
	          self.component_card_result.banker[0].is_flip = true;
	          self.component_card_result.banker[1].gotoAndStop(cards.banker[1]);
	          self.component_card_result.banker[1].isAnim = true;
	          self.component_card_result.banker[1].is_flip = true;
	        }
	      }

	      var betType = '';

	      if(!self.component_gameButtons.yourBets.length) {
	        if(_.find(self.saved_bets, function (e) {return e.bet === 'banker'})) {
	          betType = 'banker'
	        }
	        if(_.find(self.saved_bets, function (e) {return e.bet === 'player'})) {
	          betType = 'player'
	        }
	      } else if(self.component_gameButtons.yourBets.length) {
	        if(_.find(self.component_gameButtons.yourBets, function (e) {return e.table_id === 'banker'})) {
	          betType = 'banker'
	        }
	        if(_.find(self.component_gameButtons.yourBets, function (e) {return e.table_id === 'player'})) {
	          betType = 'player'
	        }
	      }

	      if (self.component_card_result[betType] && self.component_card_result[betType].length) {

	        self.component_card_result[betType].forEach((c) => {
	          if (!c.isAnim) c.flag = 0;
	        });

	        self.component_card_result[betType].forEach((c,e) => {
	          c.card_type = betType;
	          if (!c.flag) {
	            c.gotoAndStop(60)
	            if(e==2) {
                $('#open-all').text(window.language2.baccarat_winningdisplay_open);
	              c.gotoAndStop(61)
	            }
	            c.flag = 1;
	          }
	        });
	      }

	      toFlipcards = self.component_card_result[betType];
	    }

      setCardPositions();

	    if(window.t_type == 'flippy') {
	      // flippy case if flippy event first before swipe card
	      if(flippyFlag) {
	        if(self.component_card_result.player.length >= 2 && self.component_card_result.banker.length >= 2) {
	          this.flippytimer(flippy_data);
	          flippyFlag = false;
	        }
	      }
	    }
		},
		newround : function(data) {
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

      flippyFlag = false;
      flippyFlip = true;
      tempFlipData = null;
      _cardFlip = false;
      // Hide chip mask
      if(!self.mobile) {
        self.firstRound = false;
	      // self.component_betBoard.chipWrap.visible = false;
	    } else {
	      self.component_chips.chipWrap.visible = false;
	    }

	    flip_time_cnt = 0;
	    flipEnd_cnt = 0;

      fpf.newround();

	    $("#flipclick").hide();
	    $(".flip-control-container").hide();
	    self.component_betBoard.bet_cnt = 0;

	    self.logUserMoney = 0;

	    self.component_gameButtons.is_confirmed_bet = true;
	    self.component_gameButtons.yourBets = [];
	    self.saved_bets = [];

	    toFlipcards = [];

	    self.component_card_result.icon_click = [];
	    selected_flip_card = null;
	    self.selected_flip_card = null;
	    self.component_timer.clearTimer();
	    self.card_flip_cnt = 0;
	    self.flipped_game_info = {};

	    cards = {};
	    self.cards_gameInfo = null;

	    self.component_card_result_total.visible = false;

	    self.confirm = false;
	    self.component_timer.betting_start = true;

	    $.post('/get/user', (response) => {

	      self.context.user_money = JSON.parse(response).money;
	      self.component_betDetails.reinit(false)

	      let amount = 0;

	      if (window.casino == 'SS') {
	          amount = self.component_winAmount.numberWithCommas(parseFloat(JSON.parse(response).money).toFixed(2));
	      } else {
	          amount = self.component_winAmount.numberWithCommas(parseInt(JSON.parse(response).money));
	      }

	      // self.component_menuPlayerInfo.balance.text = amount;
	      // self.component_menuPlayerInfo.round.text = data.roundNum;
	      self.component_burnCard.removeBurnCard();
	    });

	    window.bets = {
	      round_id: data.roundNum
	    }

	    self.component_dealer.setRound(data.roundNum);
      if(self.mobile) {
        self.component_channel.setRound(data.roundNum);
      }
	    self.initRound();
	    timer_start = false;

			// ==== ///
			flippy_timer_start = false;
      isflip = false;

      // Room info
      if (parseInt(window.room_yn) === 1) {
        self.component_roomInfo.resetData();
        self.component_roomInfo.visible = true;
      }

      if (!self.mobile) {
        self.component_multiplayer.removePlayersOnNewRound()
      }
		},
		
    displayresult : function (data) {
			if(!this.fnFilterData(data)) return;
      self.user_no_bet_count++;
      if(window.junket != 0 && !_.isEmpty(window.vendorData)) {
        self.user_no_bet_count = 0;

        if(self.isKicked) {
          let redirectTo = self.mobile ? window.lobby_domain+'m?game=true' : window.lobby_domain;
          if (window.nonInstall) redirectTo = window.lobby_domain+'non?game=true';

          $('#mdlConfirmation').show();
          $('#mdl_kick-con').show();
          $('.mdl_msg_bet').show();
          $('.mdl_message').css({'padding-top': '15px'});
          $('#mdl_gen_message').html('The banker has left the room. You will be\nredirected to the lobby in 10 seconds.')
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
          }, 10000)
        }

      }
      setTimeout(() => {
        self.initRound();
      }, 10000)
      
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
                window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
              } else {
                window.location = redirectTo;
              }
              clearInterval(promptInterval);
          });

      }

      if (self.component_gameButtons.is_confirmed_bet) {
        self.player_data.total_bets += self.component_gameButtons.yourBets.filter((o, i) => {
          return o.table_id == "banker" || o.table_id == "player";
        }).length;
      }

      // ****** //
	    setTimeout(() => {
	      self.hideResult()
	      visible = false;
	    },6000);

	    let win_amt = 0;
	    let winners = [];
	    let win_res = "";

	    winners.push(data.gameResult.winner);

	    if (data.gameResult.pairs) {
	      data.gameResult.pairs.forEach((row) => {
	        winners.push(row + "pair");
	      });
	    }

	    // supersix
	    if (data.gameResult.supersix) {
	      winners.push("supersix");
	    }

	    let odds = {
	      'bonus_9' : true,//30,
	      'bonus_8' : true,//10,
	      'bonus_7' : true,//6,
	      'bonus_6' : true,//4,
	      'bonus_5' : true,//2,
	      'bonus_4' : true,//1,
	      'natural_banker'  : true,//1,
	      'natural_player'  : true// 1
	    };

	    // dragonbonus
	    if (data.gameResult.bonus && data.gameResult.winner != "tie" && (odds[data.gameResult.bonus.type] || odds[data.gameResult.bonus.diff])) {
	      if (data.gameResult.winner == 'banker') {
	        winners.push('bonus_banker');
	      }
	      else if(data.gameResult.winner == 'player') {
	        winners.push('bonus_player');
	      }
	    }

	    //dragonbonus natural tie
	    if(data.gameResult.bonus && data.gameResult.bonus.type == 'natural_tie') {
	      winners = [...winners, 'bonus_player', 'bonus_banker'];
	    }

	    // bigsmall
	    if(data.gameResult.size) winners.push(data.gameResult.size);

	    if (data.gameResult.winner == "banker") {
	      playSound('banker-win')
	      dealer_game_stat.banker_win++;
	      win_res = window.language.game_specific.bankerwins;
	    } else if (data.gameResult.winner == "player") {
	      playSound('player-win')
	      dealer_game_stat.player_win++;
	      win_res = window.language.game_specific.playerwins;
	    } else if (data.gameResult.winner == "tie") {
	      playSound('tie')
	      dealer_game_stat.player_win += .5;
	      dealer_game_stat.banker_win += .5;
	      win_res = window.language.game_specific.tie;

	      if (self.component_gameButtons.is_confirmed_bet) {
	        // self.player_data.total_bets --;
	      }
	    }

	    let winner = data.gameResult.winner;
	    self.component_winnings.showWinAnimation(win_res, data.gameResult.winner == 'banker' ? "#7f1d1d" : data.gameResult.winner == 'player' ? "#0c3e66" : '#567f39');

      let winAnim = [];
      if(data.gameResult.supersix) {
        if(window.slave === 'supersix') {
          winAnim.push({
            text : window.language.gamename.supersix,
            color : "#604101",
            value : 'supersix'
          });
        }
      } // if slave spersix

      if(winners.indexOf('playerpair') > -1) {
        winAnim.push({
          text : window.language.game_specific.playerpair,
          color : "#114268",
            value : 'playerpair'
        });
      } //end

      if(winners.indexOf('bankerpair') > -1) {
        winAnim.push({
          text : window.language.game_specific.bankerpair,
          color : "#811e20",
            value : 'bankerpair'
        });
      } //end

      self.component_winning_assets.createWinText(winAnim); //extra winning text at the bottom

	    if (data.gameResult.pairs.length == 1) {
	      setTimeout(() => {
	        playSound(data.gameResult.pairs[data.gameResult.pairs.length - 1] + '-pair');
	      }, (data.gameResult.pairs.length) * 1000)
	    }

	    if (data.gameResult.pairs.length == 2) {
	      setTimeout(() => {
	        playSound(data.gameResult.pairs[0] + '-pair');
	      }, 1000)

	      setTimeout(() => {
	        playSound(data.gameResult.pairs[1] + '-pair');
	      }, 2000)
	    }

	    if (window.t_type == "flippy") {
	      self.component_card_result.setCardResult(cards);

	      let total = baccaratTotal(self.cards_gameInfo);
	      let player_val = total.player;
	      let banker_val = total.banker;

	      self.component_card_result_total.setPlayerValue(player_val);
	      self.component_card_result_total.setBankerValue(banker_val);
	    }

	    self.roadMarks.push(data.mark);

	    self.component_roadmap.shoe_counter.text = self.roadMarks.length
	    self.component_roadmap.setPercentages(self.roadMarks);

	    self.component_roadmap.drawPearlRoad(self.roadMarks);
	    self.component_roadmap.drawBigRoad(self.roadMarks);
	    self.component_roadmap.drawBigeyeboy(self.roadMarks);
	    self.component_roadmap.drawSmallRoad(self.roadMarks);
	    self.component_roadmap.drawCockroachroad(self.roadMarks);

      self.component_roadmap.checkPrediction(self.roadMarks);
	    self.component_roadmap.fnUpdateCaching(true);

	    // Animate winning
	    let multiplayerFlag = false;
	    if (parseInt(window.multiplayer)) {
	      multiplayerFlag = true;
	      if (!self.mobile) {
          self.component_multiplayer.tableWin(winners);
	      }
	    }

      self.component_betBoard.tableWinning(winners, multiplayerFlag)
      self.component_card_result_total.setWin(winner); //highligts card bg background
	    // if (self.mobile) {
	    //   if (self.component_betBoard.visible) {
	    //       self.component_tableDraw.redrawChips();
	    //       self.toggleView();
	    //   }
	    // }

	    self.component_betBoard.bet_areas.forEach((e) => {

	      if (_.includes(winners, e.table_name) && e.chips.length && self.component_gameButtons.is_confirmed_bet) {
	        if(e.table_name == "banker" || e.table_name == "player") {
	          self.player_data.total_win++;
	        }
	      }
	    });
		  console.log(winners, "winnninnngggg");
      if(self.junketAgent && !self.multiplayer) {
        self.component_betBoard.bet_areas.forEach((e)=> {
          if(e.chips.length) {
            if(_.find(winners, function(a) {return a == e.table_name})) {
              console.log(e, "winnninnngggg", e.payout_multiplier)
              let win_money = e.payout_multiplier * e.total_bet_amt;

              setTimeout(() => {
                self.component_winChips.createWinningChips(e, win_money);
              },1600)
              
            } else {
              self.component_winChips.animateWinLose(e, 'lose');
            }
          }
        });
      }
    },
		updatecredits : function(data) {
			if(!this.fnFilterData(data)) return;
      if(self.junketAgent) return;
      /* web winning anim starts here */
      //add chip settings
      let options = {
        font1 : 'normal 24px bebas-regular',
        font2 : 'normal 20px bebas-regular',
        radius : 18,
        maskScale : 0.6,
        textScale : 0.6,
        chipScale : 0.8
      }

      if(parseInt(window.multiplayer)) {
        options.textScale = 0.7;
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
      } else {
        if (parseInt(data.payload.credits.total_winning) > 0) {

          let typeSlave = window.slave === 'supersix' ? 's' : window.slave === 'bonus' ? 'b' : 'r';

          if(data.payload.credits.type == 'f') {
            data.payload.credits.type = 'r';
          }

          if(typeSlave == data.payload.credits.type) {
            let diff = parseFloat(data.payload.credits.total_winning) - parseFloat(self.component_betDetails.bet_amount);
            if(diff > 0) {
              setTimeout(() => {
                self.component_winnings.isWin();
              }, 2000)
            }

            self.component_betDetails.win_amount = data.payload.credits.total_winning;
            self.component_winAmount.total_win_text.text = self.component_winAmount.numberWithCommas(data.payload.credits.total_winning);

            setTimeout(() => {
              self.component_winAmount.total_win_text.visible = true;
              self.component_winAmount.animateAmtWin();
              self.component_betDetails.reinit(true);
            },8000)
          }
        } //end if
      }
		},
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
    }, // === end of create_room
		setroundprogress : function(data) {
			if(!this.fnFilterData(data)) return;
      self.component_roomInfo.visible = false;
      self.component_timer.timer = 0
		},
		displaymodify : function(data) {
			if(!this.fnFilterData(data)) return;
      if (!data.data.mark.length) {
        return;
      }

      // Update display
      self.roadMarks = data.data.mark;

      self.component_roadmap.drawPearlRoad(self.roadMarks);
      self.component_roadmap.shoe_counter.text = self.roadMarks.length
      self.component_roadmap.setPercentages(self.roadMarks);
      self.component_roadmap.drawBigRoad(self.roadMarks);
      self.component_roadmap.drawBigeyeboy(self.roadMarks);
      self.component_roadmap.drawSmallRoad(self.roadMarks);
      self.component_roadmap.drawCockroachroad(self.roadMarks);

      self.component_roadmap.checkPrediction(self.roadMarks);

      if(self.component_roadmap.cacheCanvas) {
        self.component_roadmap.updateCache();
      }

      $.post('/get/winAll/' + window.tableNum, {round_id: data.data.roundId}, (response) => {
        if (!parseInt(response.bet)) {
            return;
        } //end if
        if (parseInt(response.total_win) > 0) {
            let newMoney = parseInt(response.total_win) + self.context.user_money;
            self.context.user_money = newMoney;
            self.component_betDetails.reinit(true);

            if(response.slave == tableSlave)
            {
              // self.component_winAmount.total_win_text.text = self.component_winAmount.numberWithCommas(newMoney);
              self.component_winAmount.animateAmtWin();
            }
        }
      });
		},
		displayRollback : function(data) {
			if(!this.fnFilterData(data)) return;

      self.roadMarks = data.data.mark;
      self.component_roadmap.drawPearlRoad(self.roadMarks);
      self.component_roadmap.shoe_counter.text = self.roadMarks.length
      self.component_roadmap.setPercentages(self.roadMarks);
      self.component_roadmap.drawBigRoad(self.roadMarks);
      self.component_roadmap.drawBigeyeboy(self.roadMarks);
      self.component_roadmap.drawSmallRoad(self.roadMarks);
      self.component_roadmap.drawCockroachroad(self.roadMarks);

      self.component_roadmap.checkPrediction(self.roadMarks);

      if(self.component_roadmap.cacheCanvas) {
        self.component_roadmap.updateCache();
      }
		},
    bets : function (data) {
      if(!this.fnFilterData(data)) return;
      self.component_roomInfo.updateInfo(data.data, data.totalBettingUsers);
    },
		maintenanceChange : function(data) {
			if(!this.fnFilterData(data)) return;

      let slave = window.slave === '' ? 'normal' : window.slave;

      if (window.userAuthority != "admin") {
        if (parseInt(data.data.status) === 1 && slave === data.data.slave) {
          if(window.lobby_type == 'integrated'){
            window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
          } else {
            window.location = redirectTo;
          }
        }
        else if (parseInt(data.data.status) === 1 && data.data.slave === 'all') {
          if(window.lobby_type == 'integrated'){
            window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
          } else {
            window.location = redirectTo;
          }
        }
        else if (slave === 'normal' && data.data.slave === 'flippy') {
          if(window.lobby_type == 'integrated'){
            window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
          } else {
            window.location = redirectTo;
          }
        }
      }
		},
		shoeburncard: function (data) {
			if(!this.fnFilterData(data)) return;
    	self.component_burnCard.burnCard(data.value);
		},
		flip: function (data) {
			if(!this.fnFilterData(data)) return;

	    if(!toFlipcards || !toFlipcards.length) {
        self.component_card_result.setCardResult(cards);

        // *** flip val** //
        self.component_card_result_total.setPlayerValue(baccaratTotal(data.gameInfo).player);
        self.component_card_result_total.setBankerValue(baccaratTotal(data.gameInfo).banker);
        return;
      }

	    if(flipEnd_cnt === 0) {
	      if(self.component_card_result.player.length < 2 || self.component_card_result.banker.length < 2) {
	        flippyFlip = false;
	        return;
	      }
	    }

	    if (self.component_card_result.icon_click && self.component_card_result.icon_click.length) {
	      self.component_card_result.icon_click.forEach((e) => {
	        e.visible = false;
	      })
	    }

	    toFlipcards.forEach((card) => {
	      card.shadow = null;
	      card.is_flip = true;
	    })

	    fpf.forceFlip();

	    // *** flip val** //
	    let total = baccaratTotal(self.cards_gameInfo);
	    let player_val = total.player;
	    let banker_val = total.banker;
	    let delayTime = 3000;

	    if (self.cards_gameInfo.banker3 || self.cards_gameInfo.player3) {
	      delayTime = 2000;
	    }

	    var hit3rd = false;

	    if(flipEnd_cnt > 0) {
	      hit3rd = shouldHit('banker');
	    }

	    setTimeout(() => {

	      if(flipEnd_cnt == 0 && self.component_card_result.player.length == 3) {
	        self.component_card_result.player[2].isAnim = true
	      } else if(flipEnd_cnt > 0) {
	        if(self.component_card_result.player.length == 3) {
	          if(toFlipcards.length && toFlipcards[0].card_type != 'player') {
	            self.component_card_result.player[2].isAnim = false
	          } else if(!toFlipcards.length) {
	            self.component_card_result.player[2].isAnim = false
	          }
	        }
	      }

	      if(flipEnd_cnt == 0 && self.component_card_result.banker.length == 3) {
	        self.component_card_result.banker[2].isAnim = true
	      } else if(flipEnd_cnt > 0) {
	        if(self.component_card_result.banker.length == 3) {
	          if(toFlipcards.length && toFlipcards[0].card_type != 'banker') {
	            self.component_card_result.banker[2].isAnim = false
	          } else if(!toFlipcards.length) {
	            self.component_card_result.banker[2].isAnim = false
	          }
	        }
	      }

	      if(flipEnd_cnt == 1 && hit3rd && self.component_card_result.banker.length == 3) {
	        self.component_card_result.banker[2].isAnim = true
	        self.component_card_result.banker[2].force = true
	      }

	      if(flipEnd_cnt > 1){
	        self.component_card_result.banker[2].isAnim = false
	        self.component_card_result.banker[2].force = false
	        if(toFlipcards.length && toFlipcards[0].card_type == 'banker') {
	          self.component_card_result.banker[2].isAnim = true
	        }
	        self.component_card_result.player[2].isAnim = true
	      }


	      self.component_card_result.setCardResult(cards);

	      // *** flip val** //
	      self.component_card_result_total.setPlayerValue(player_val);
	      self.component_card_result_total.setBankerValue(banker_val);
	      flipEnd_cnt++;
	    }, delayTime);

	    flippy_timer_start = false;
		},
    flipTimerStart : false,
		handleFlippy: function (data) {
			if(!this.fnFilterData(data)) return;

      if(!flippyFlip) {
        this.flip(tempFlipData);
        flippyFlip = true;
      }

      flippy_data = data;

      if(bankerhit && flipEnd_cnt === 1) {
        if(self.component_card_result.banker.length < 3) {
          flippyFlag = true;
        }
        bankerhit = false;
      }

      if(playerhit && flipEnd_cnt === 1) {
        if(self.component_card_result.player.length < 3) {
          flippyFlag = true;
        }
        playerhit = false;
      }

      bankerhit = shouldHit('banker');
      playerhit = shouldHit('player');

      if(self.component_card_result.player.length < 2 || self.component_card_result.banker.length < 2) {
        flippyFlag = true;
      }

      if(!flippyFlag) {
        this.flippytimer(flippy_data);
      }
		},
    flippytimer: function (data) {
      if(!this.fnFilterData(data)) return;

      if (!flippy_timer_start) {
        flip_time_cnt++;


        self.component_timer.visible = true
        self.component_timer.timer_instance.visible = true
        self.component_timer.timer_instance.timer(parseInt(data.flipTime), parseInt(data.totalTime));
        console.log("flippy timer", data.flipTime, data.totalTime, self.component_timer);

        if(toFlipcards){
          if(toFlipcards.length && toFlipcards[0].card_type == "player") {
            if(flip_time_cnt == 2 && self.component_card_result.player.length == 3) {
              self.component_card_result.player[2].isAnim = false
            }
          }
          else if(toFlipcards.length && toFlipcards[0].card_type == "banker") {
            if(flip_time_cnt == 2 && self.component_card_result.banker.length == 3) {
              self.component_card_result.banker[2].isAnim = false
            }
          }
        } // end if flippy

        flippy_timer_start = true;
        self.selected_flip_card = null
        this.flippyStartFlipping();
      }
      if (data.flipTime == 0) {
        self.component_timer.timer_instance.visible = false;
        flippy_timer_start = false;
      }
    },
    flippyStartFlipping: function (data) {
      console.log("checking yourBets length flippstart", toFlipcards)
      if(!toFlipcards || !toFlipcards.length) return;

      let cardData = [];
      toFlipcards.forEach((flipc) => {
        if(!flipc.is_flip) {
          cardData.push({
            backImg : `/img/cards/back-${flipc.card_type}.png`,
            frontImg: `/img/cards/hidden/${flipc.code.split('C')[1]}.png`,
            openImg: `/img/cards/${flipc.code.split('C')[1]}.png`,
            attached : flipc
          });
        }
      });

      if(toFlipcards.length && toFlipcards[0].card_type == "player" && toFlipcards.length == 2) {
          // toFlipcards = toFlipcards.reverse()
          cardData = cardData.reverse()
      }
      let offset = [0];

      let point = (fpf.fpfWrap.width() * 0.22);
      if(cardData.length > 1) {
        offset = [point * (-1), point];
      }
      // calling controller to handle create cards and etc
      if(cardData.length) {
        var ratio = 1.4;
        if(self.mobile) {
          ratio = 0.8;
          if(window.nonInstall) {
            if (window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
              point = (fpf.fpfWrap.height() * 0.16);
              ratio = window.innerWidth / 1080;
            } else {
              ratio = window.innerHeight / 1080;
              point = (fpf.fpfWrap.width() * 0.16);
            }
          } else {
            if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
              ratio = window.innerHeight / 1280;
              point = (fpf.fpfWrap.width() * 0.24);
            } else {
              point = (fpf.fpfWrap.width() * 0.16);
            }
          }
          if(cardData.length > 1) {
            offset = [point * (-1), point]
          }
        } //self.mobile

        if(window.nonInstall) {
          if (window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
            fpf.createCards(cardData, {ratio: ratio, offset : offset, orientation:'landscape', y:true}, self.cards_gameInfo);
          } else {
            fpf.createCards(cardData, {ratio: ratio, offset : offset, orientation:'portrait'}, self.cards_gameInfo);
          }

          window.addEventListener("resize", () => {
            let flipCnt = 0;
            cardData = [];
            toFlipcards.forEach((flipc) => {
              if(flipc.is_flip) flipCnt++;
              cardData.push({
                backImg : `/img/cards/back-${flipc.card_type}.png`,
                frontImg: `/img/cards/hidden/${flipc.code.split('C')[1]}.png`,
                openImg: `/img/cards/${flipc.code.split('C')[1]}.png`,
                attached : flipc,
                isflip : flipc.is_flip ?flipc.is_flip : false
              });
            });

            if(flip_time_cnt === 2 && cardData.length === 3) {
               cardData = [cardData[2]];
               flipCnt -= 2;
            }
            if(cardData.length == flipCnt) {
              isflip = true;
            } else {
              isflip = false;
            }
            if(isflip) fpf.hide();

            if(!flippy_timer_start || isflip) return;
            if (window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
              if(window.nonInstall) ratio = window.innerWidth / 1080; // adjust size of non install and portrait
              fpf.createCards(cardData, {ratio: ratio, offset : offset, orientation:'landscape', y:true}, self.cards_gameInfo);
            } else {
              if(window.nonInstall) ratio = window.innerHeight / 1080; // adjust size of non install and portrait
              fpf.createCards(cardData, {ratio: ratio, offset : offset, orientation:'portrait'}, self.cards_gameInfo);
            }
          });
        } else {
          fpf.createCards(cardData, {ratio: ratio, offset : offset, orientation:'portrait'}, self.cards_gameInfo);
        }
      }

      $("#open-all").on("click", function () {
        fpf.forceFlip();
        isflip = true;
      });
    },
    shoechange: function(data) {
      if(!this.fnFilterData(data)) return;

      self.component_betDetails.win_amount = 0;
      self.component_betDetails.bet_amount = 0;
      self.component_betDetails.reinit(false);

      self.roadMarks = [];
      self.component_card_result_total.visible = false;

      self.component_roadmap.shoeChange();

      let game_stat = {
        total_games: 1,
        banker_win: 0,
        player_win: 0,
        tie_win: 0
      }

      //Set message
      self.component_messages.setMessage(window.language2.com_sub_ingameprompts_shoechanged);

      self.component_burnCard.removeBurnCard();
      self.initRound();

      setTimeout(() => {
        self.component_messages.gold_instance.scaleX = 0;
        self.component_messages.message_text.scaleX = 0;
        self.component_messages.message_text.alpha = 0;
      }, 3000);

      self.component_gameButtons.confirmButton.gotoAndStop("disabled");
      self.component_gameButtons.repeatButton.gotoAndStop("disabled");
      self.component_gameButtons.undoButton.gotoAndStop("disabled");

    },
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
		connect: function () {
			 self.socketAll.emit('data', {
	      eventName: 'init',
	      data: {
	        userId: window.userId
	      }
	    });
		}
	} //end of evt

  emulator.start(self, evt, multi);
  window.socketConnect = (self) => {
  	self.socket = io.connect(window.socket + "Baccarat/" + window.tableNum, {
      transports: ['websocket']
    });

  	self.socket.on('connect', function(socket) {
      evt.connect();
    });

    self.socket.on("data", (data) => {
      data = Xpacket.received(data);
      /**
      // Check if banker in another game
      if (window.isPlayer.toLowerCase() == 'f') {
        let delay = self.mobile ? 500 : 0;
        setTimeout(() => {
          $('#mdlConfirmation').show();
        }, delay)

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
      }**/

      self.cards_gameInfo = {};

      if(!window.tutorial_enabled) {
        self.cards_gameInfo = data.data.gameInfo;
      }

      if(!_.isEmpty(self.cards_gameInfo) && self.cards_gameInfo.player1 && self.cards_gameInfo.player2 && self.cards_gameInfo.banker1 && self.cards_gameInfo.banker2 && (self.cards_gameInfo.player3 || self.cards_gameInfo.banker3)) {
        flipEnd_cnt = 1;
      }

      if (data.data.marks.length) {
        if (window.t_type != "flippy") {
          let total = baccaratTotal(data.data.gameInfo);
          let player_val = total.player;
          let banker_val = total.banker;

          self.component_card_result_total.setPlayerValue(player_val);
          self.component_card_result_total.setBankerValue(banker_val);
        }
      }

      let dealerData = {
        name: data.data.currentDealer,
        image: data.data.dealerImage
      }

      self.component_dealer.setDealer(dealerData);

      //set round num
      window.round_id = data.data.currentRound;
      self.component_dealer.setRound(data.data.currentRound);

      if (!_.isEmpty(self.cards_gameInfo)) {
        cards = {
          player: [],
          banker: []
        };

        _.forEach(data.data.gameInfo, (row, key) => {
          if (!row || !cards[key.substring(0, key.length - 1)]) {
            return;
          }

          cards[key.substring(0, key.length - 1)].push(`C${row}`);
        });

        self.showResult();

        visible = true;
        if (data.data.marks.length) {
          if (self.mobile) {
            self.component_card_result.drawCardGameInfo(cards, 0.94, "cards", 75, 100);
          } else {
            self.component_card_result.drawCardGameInfo(cards, 0.47, "cards", 190, 263);
          }
        }

        if (self.component_card_result.banker && self.component_card_result.banker.length) {
          self.component_card_result.banker.forEach((banker, x) => {
            banker.code = cards.banker[x]
            if (!banker.flag) {
              banker.gotoAndStop("back_red")
              banker.flag = 1;
            }
          });
        }

        if (self.component_card_result.player && self.component_card_result.player.length) {
          self.component_card_result.player.forEach((player, x) => {
            player.code = cards.player[x]
            if (!player.flag) {
              player.gotoAndStop("back_blue")
              player.flag = 1;
            }
          });
        }

        if (data.data.marks.length) {
          if (window.t_type != "flippy") {
            self.component_card_result.setCardResult(cards);
          } else{
            if(flipEnd_cnt === 1) {
              self.component_betBoard.bet_areas.forEach((table) => {
                if (table.chips.length) {
                  self.component_card_result.player[0].gotoAndStop(cards.player[0]);
                  self.component_card_result.player[1].gotoAndStop(cards.player[1]);
                  self.component_card_result.player[0].isAnim = true;
                  self.component_card_result.player[1].isAnim = true;
                  self.component_card_result.player[0].is_flip = true;
                  self.component_card_result.player[1].is_flip = true;

                  self.component_card_result.banker[0].gotoAndStop(cards.banker[0]);
                  self.component_card_result.banker[1].gotoAndStop(cards.banker[1]);
                  self.component_card_result.banker[0].isAnim = true;
                  self.component_card_result.banker[1].isAnim = true;
                  self.component_card_result.banker[0].is_flip = true;
                  self.component_card_result.banker[1].is_flip = true;
                }
              });
            }
          }
        }

        setCardPositions();

        // Remove chips if round end
        if (data.data.roundStatus == 'E') {
          self.initRound();
        }

        // Redirect if maintenance
        if (window.userAuthority != "admin") {
          let mainSetting = [];

          if (parseInt(data.data.mainMaintenance.status) === 1) {
            if(window.lobby_type == 'integrated'){
              window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
            } else {
              window.location = redirectTo;
            }
          }

          for (var i = 0; i < data.data.maintenanceSetting.maintenance.length; i++) {
            let maintenanceData = data.data.maintenanceSetting.maintenance[i];

            if (window.slave == '' && maintenanceData.type === 'normal') {
              mainSetting = maintenanceData.info;
            }
            else if (window.slave === maintenanceData.type) {
              mainSetting = maintenanceData.info;
            }
          }

          for (var i = 0; i < mainSetting.length; i++) {
            if (parseInt(mainSetting[i].status) === 1) {
              if(window.lobby_type == 'integrated'){
                window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
              } else {
                window.location = redirectTo;
              }
            }
          }
        }
      } //end of drawing gameinfo if not empty
      // Notice

      if (parseInt(data.data.noticeSetting.status)) {
        let notice_content = data.data.noticeSetting.content;
        $('#notice').addClass('active').css({'left': 0});
        if (typeof data.data.noticeSetting.content !== 'object') {
          notice_content = JSON.parse(data.data.noticeSetting.content);
        }

        let notice_msg = window.language.locale == 'zh' ? notice_content['cn'] : notice_content[window.language.locale];

        $('#notice-msg').text(notice_msg)
      } else {
        $('.maintenance-con').removeClass('active')
      }

      self.roadMarks = data.data.marks;

      self.component_roadmap.drawPearlRoad(self.roadMarks);
      self.component_roadmap.shoe_counter.text = self.roadMarks.length
      self.component_roadmap.setPercentages(self.roadMarks);
      self.component_roadmap.drawBigRoad(self.roadMarks);
      self.component_roadmap.drawBigeyeboy(self.roadMarks);
      self.component_roadmap.drawSmallRoad(self.roadMarks);
      self.component_roadmap.drawCockroachroad(self.roadMarks);
      self.component_roadmap.checkPrediction(self.roadMarks);
      self.component_roadmap.fnUpdateCaching(false);

      if (!data.data.marks.length) {
        self.component_card_result_total.visible = false
      }

      if (data.data.shoeBurnCard) {//undefined, '', '0303'
        self.component_burnCard.burnCard(data.data.shoeBurnCard);
      }

      if(_.isEmpty(self.cards_gameInfo)) {
        self.component_card_result_total.visible = false;
      }

      // Redirect if maintenance
      if (window.userAuthority != "admin") {
        let mainSetting = [];

        if (parseInt(data.data.mainMaintenance.status) === 1) {
          if(window.lobby_type == 'integrated'){
            window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
          } else {
            window.location = redirectTo;
          }
        }

        for (var i = 0; i < data.data.maintenanceSetting.maintenance.length; i++) {
          let maintenanceData = data.data.maintenanceSetting.maintenance[i];

          if (window.slave == '' && maintenanceData.type === 'normal') {
            mainSetting = maintenanceData.info;
          }
          else if (window.slave === maintenanceData.type) {
            mainSetting = maintenanceData.info;
          }
        }
        
        for (var i = 0; i < mainSetting.length; i++) {
          if (parseInt(mainSetting[i].status) === 1) {
            if(window.lobby_type == 'integrated'){
              window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
            } else {
              window.location = redirectTo;
            }
          }
        }
      }
      // end Redirect if maintenance
    });
    
    self.socketAll = io.connect(window.socket + "all", {
      transports: ['websocket']
    });

  	self.socketAll.on('connect',() => {
  		self.socketAll.emit('register', {id: window.userId});
  	});

  	self.socketAll.on("data", (data)=>{
      data = Xpacket.received(data)
      // if(data.gameName === 'Poker') return;
  		// if(evt.fnFilterData(data)) return;
      switch(data.eventName) {
      	case "reject":
          // window.location = "/rejected"
      		break;
        case "init":
          evt.init(data);
          if(!self.mobile)
           multi.init(data.data);
          break;
        case "displayresults" :
        	evt.displayresult(data);
            if(!self.mobile)
            multi.displayresult(data);
          break;
        case "inputitem":
          evt.inputitem(data);
          if(!self.mobile)
            multi.inputitem(data);
          break;
        case "removeitem":
          evt.removeitem(data);
          break;
        case "setroundhold" :
          break;
        case "setroundprogress" :
          evt.setroundprogress(data);
          if(!self.mobile)
            multi.setroundprogress(data);
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
        case "flip":
          if(!flippyFlip) {
            tempFlipData = data;
            return;
          }
          evt.flip(data);
          if(!self.mobile)
            multi.flip(data);
          break;
        case "flippytimer" :
           evt.handleFlippy(data)
          if(!self.mobile)
            multi.flippytimer(data);
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
          evt.mainnoticechange(data);
          break;
        case "noticechange":
          evt.noticechange(data)
          break;
        case "shoeburncard":
          evt.shoeburncard(data);
          break;
        case "bets":
          evt.bets(data)
          break;
        case "updatecredits":
          evt.updatecredits(data);
          if(!self.mobile)
           multi.updatecredits(data);
          break;
        case "displayRollback":
          evt.displayRollback(data);
          if(!self.mobile)
           multi.displayRollback(data);
          break;
        case "displaymodify" :
          evt.displaymodify(data);
          if(!self.mobile)
           multi.displaymodify(data);
          break;
        case "setbettingtime":
          evt.setbettingtime(data);
          if(!self.mobile)
           multi.setbettingtime(data);
          break;
        case "newround":
          evt.newround(data);
          if(!self.mobile)
        	 multi.newround(data);
        	break;
        case "create_room":
          // if (parseInt(data.data.banker.user_id) == parseInt(window.userId)) {
          //   $('#mdlConfirmation').show();

          //   $('.mdl_lobby').click(function() {
          //     if(window.lobby_type == 'integrated'){
          //       window.location = window.lobby_redirect_url;
          //     } else {
          //       window.location = redirectTo;
          //     }
          //   });

          //   setTimeout(() => {
          //     if(window.lobby_type == 'integrated'){
          //        window.location = window.lobby_redirect_url;
          //     } else {
          //       window.location = redirectTo;
          //     }
          //   }, 5000)
          // }

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
          console.log('chatData: ', data)

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
        case ("remove_room"):
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
  } //end connecto to socket
  window.socketConnect(self);
}
