import Xpacket from '../lib/XPacket';
import cardsModule from '../factories/cards';
import {
  createSprite,
  randomNum,
  createCardSprite,
  numberCounter,
  playSound,
  numberWithCommas,
  createSpriteRoadMap,
  getSlaveParam
} from '../factories/factories'

import {flippy as fpf} from '../flippy-controller';
import emulator from '../components/emulate';

// sound preload
self.cards_gameInfo = null;
let flip_time_cnt = 0;
let flipEnd_cnt = 0;
let redirectTo;

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
  }
]

for (var x = 0; x < sounds.length; x++) {
  createjs.Sound.registerSound(sounds[x]);
}

// ==
const baccaratTotal = (gameInfo) => {
  let total = {
    player: 0,
    banker: 0
  };

  _.forEach(gameInfo, (row, key) => {
    if (!row) {
      return;
    }

    let card = cardsModule(row).value;
    card = card >= 10 ? 0 : card;

    total[key.indexOf('banker') !== -1 ? 'banker' : 'player'] += card;
    total[key.indexOf('banker') !== -1 ? 'banker' : 'player'] %= 10;
  });

  return total;
};

export default (self) => {
  var socket = io.connect(window.socket + "Baccarat/" + window.tableNum, {
    transports: ['websocket']
  });

  self.socketAll = io.connect(window.socket + "all", {
    transports: ['websocket']
  });

  redirectTo = self.mobile ? window.lobby_domain+'m?game=true' : window.lobby_domain+"?game=true";
  if (window.nonInstall) redirectTo = window.lobby_domain+'non?game=true';

  let timer_start = false;
  let data_push = null;
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

  self.card_flip_cnt = 0;
  self.flipped_game_info = {};

  //new init flippy
  if(window.t_type == "flippy") {
    fpf.init(self);

    $("#landscape").on('click', function() {
      fpf.changeOrientation('landscape');
    })

    $("#portrait").on('click', function() {
      fpf.changeOrientation('portrait');
    })
  }

  function setCardPositions() {
    if (!self.mobile) {
      if (self.component_card_result.player && self.component_card_result.player.length) {

        self.component_card_result.player[0].x = 1504;
        self.component_card_result.player[0].y = 145;

        if (self.component_card_result.player[1]) {
          self.component_card_result.player[1].x = 1400 + 5;
          self.component_card_result.player[1].y = 145;
        } //end if

        if (self.component_card_result.player[2]) {
          self.component_card_result.player[2].rotation = 90;
          self.component_card_result.player[2].x = 1385 + 132;
          self.component_card_result.player[2].y = 330 - 6;
        } //end if
      } //end if

      if (self.component_card_result.banker && self.component_card_result.banker.length) {
        self.component_card_result.banker[0].x = 1620 + 6;
        self.component_card_result.banker[0].y = 145;

        if (self.component_card_result.banker[1]) {
          self.component_card_result.banker[1].x = 1725;
          self.component_card_result.banker[1].y = 145;
        } //end if

        if (self.component_card_result.banker[2]) {
          self.component_card_result.banker[2].rotation = 90;
          self.component_card_result.banker[2].x = 1605 +132;
          self.component_card_result.banker[2].y = 330 - 6;
        } //end if
      } //end if
    } //end if
    else {
      if (self.component_card_result.banker !== undefined && self.component_card_result.banker.length) {
        self.component_card_result.banker[0].x = 1010 - cardResAdjustX;
        self.component_card_result.banker[0].y = 200 + cardResAdjustY;
        if (self.component_card_result.banker[1]) {
          self.component_card_result.banker[1].x = 1090 - cardResAdjustX;
          self.component_card_result.banker[1].y = 200 + cardResAdjustY;
        }
        if (self.component_card_result.banker[2]) {
          self.component_card_result.banker[2].x = 1108 - cardResAdjustX;
          self.component_card_result.banker[2].y = 355 + cardResAdjustY;
          self.component_card_result.banker[2].rotation = 90;
        }
      }
      if (self.component_card_result.player !== undefined && self.component_card_result.player.length) {
        self.component_card_result.player[0].x = 880 - cardResAdjustX;
        self.component_card_result.player[0].y = 200 + cardResAdjustY;
        if (self.component_card_result.player[1]) {
          self.component_card_result.player[1].x = 800 - cardResAdjustX;
          self.component_card_result.player[1].y = 200 + cardResAdjustY;
        }
        if (self.component_card_result.player[2]) {
          self.component_card_result.player[2].x = 895 - cardResAdjustX;
          self.component_card_result.player[2].y = 355 + cardResAdjustY;
          self.component_card_result.player[2].rotation = 90;
        }
      } //end if
    }
  }

    self.socketAll.on("disconnect", () => {
      connect();
    });

    self.user_no_bet_count = 0;

    let connect = () => {

    self.socketAll.emit('data', {
      eventName: 'init',
      data: {
        userId: window.userId
      }
    });

    if(self.mobile) {
      self.socketAll.emit('register', {id: window.userId});
    }

    self.socketAll.on("data", (data) => {
      data = Xpacket.received(data);

      switch(data.eventName) {
        case "reject" :
          window.location = "/rejected"
          break;
        case "maintenanceChange" :
          if(window.userAuthority != "admin") {
            if(!self.mobile) {
              self.component_multibet.maintenanceChange(data);
            }
          }
          break;

        case "updatecredits":
          if(self.mobile) {
            updateCredits(data)
          }
          break;

        case "create_room":
          if (parseInt(data.data.banker.user_id) == parseInt(window.userId)) {
            $('#mdlConfirmation').show();

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
  }

  // connect();

  socket.on('connect', function(socket) {
    connect();
  });

  socket.on("data", (data) => {
    data = Xpacket.received(data);

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
    //        window.location = window.lobby_redirect_url;
    //     } else {
    //       window.location = redirectTo;
    //     }
    //   }, 5000)
    // }

    // // == for test
    // if(_.isEmpty(data.data.gameInfo)) {
    //   data.data.gameInfo = {
    //     player1 : "0032",
    //     player2 : "0040",
    //     banker1 : "0012",
    //     banker2 : "0009"
    //   }
    // }
    self.cards_gameInfo = data.data.gameInfo;

    if(self.cards_gameInfo.player1 && self.cards_gameInfo.player2 && self.cards_gameInfo.banker1 && self.cards_gameInfo.banker2 && (self.cards_gameInfo.player3 || self.cards_gameInfo.banker3)) {
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

    if (!_.isEmpty(data.data.gameInfo)) {
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

      self.toggleResult();
      visible = true;
      if (data.data.marks.length) {
        if (self.mobile) {
          self.component_card_result.drawCardGameInfo(cards, 0.94, "new_cards", 80, 120);
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
          if(flipEnd_cnt ===  1) {
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
    if (data.data.mainNotice) {
      if (parseInt(data.data.mainNotice.status)) {
        self.component_announcement.setAnnouncement(data.data.mainNotice, true);
      }

      if (parseInt(data.data.noticeSetting.status)) {
        self.component_announcement.setAnnouncement(data.data.noticeSetting, false);
      }
    }

    // roadMapMarks = data.data.marks;
    self.roadMarks = data.data.marks;

    self.component_roadmap.drawPearlRoad(self.roadMarks);
    self.component_roadmap.shoe_counter.text = self.roadMarks.length
    self.component_roadmap.setPercentages(self.roadMarks);
    self.component_roadmap.drawBigRoad(self.roadMarks);
    self.component_roadmap.drawBigeyeboy(self.roadMarks);
    self.component_roadmap.drawSmallRoad(self.roadMarks);
    self.component_roadmap.drawCockroachroad(self.roadMarks);
    self.component_roadmap.checkPrediction(self.roadMarks);

    if (!data.data.marks.length) {
      self.component_card_result_total.visible = false
    }

    if (data.data.shoeBurnCard) {//undefined, '', '0303'
      self.component_burnCard.burnCard(data.data.shoeBurnCard);
    }

  });

  let detele_flag = 0;
  let maxtimer = 15;
  let redirect_timer = maxtimer;
  let flippy_timer_start = false;

  socket.on("push", (data) => {
    let d = Xpacket.received(data);

    if(d.eventName == 'regionalcredits') return;

    setTimeout(() => {
      data_push = Xpacket.received(data);
      if(['setbettingtime','newround','setroundprogress','inputitem','displayresults'].indexOf(data_push.eventName) > -1){
        self.component_burnCard.removeBurnCard();
      }

      switch (data_push.eventName) {
        case ("setbettingtime"):
          startBetting(data_push)
          break;

        case ("newround"):
          newround(data_push);
          flippy_timer_start = false;
          isflip = false;

          // Room info
          if (parseInt(window.room_yn) === 1) {
            self.component_roomInfo.resetData();
            self.component_roomInfo.visible = true;
          }

          self.component_multiplayer.removePlayersOnNewRound()

          if (self.mobile) {
            self.component_firstViewMultiplayer.removePlayersOnNewRound()
          }
          break;

        case ("displayresults"):
          setTimeout(() => {
            self.initRound();
          }, 10000)
          
          self.user_no_bet_count++;

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
          // self.player_data.total_bets += self.component_gameButtons.yourBets.length;
          if (self.component_gameButtons.is_confirmed_bet) {
            self.player_data.total_bets += self.component_gameButtons.yourBets.filter((o, i) => {
              return o.table_id == "banker" || o.table_id == "player";
            }).length;
          }

          var timeout = 0;
          if(self.mobile) {
            timeout = 0;
          }

          setTimeout(() => {
            setResult(data_push);
          }, timeout)
          break;

        case ("inputitem"):
          swipeCard(data_push);
          break;

        case ("removeitem") :
          deleteCard(data_push);
          break;

        case ("setroundprogress"):
          self.component_roomInfo.visible = false;
          self.component_timer.timer = 0
          break;

        case ("setroundhold"):
          setRoundHold(data_push);
          break;

        case ("shoechange"):
          shoechange(data_push);
          break;

        case ("dealerchange"):
          let dealerData = {
            "name": data_push.dealerName,
            "image": data_push.dealerImage
          }
          self.component_dealer.setDealer(dealerData);
          break;

        case ("displaymodify"):
          displaymodify(data_push);
          break;

        case ('flip'):
          if(!flippyFlip) {
            tempFlipData = data_push;
            return;
          }
          flipFlippy(data_push);
          // force flip opened card
          break;

        case ('flippytimer'):
          // enable flippy cards to be clicked
          handleFlippy(data_push);
          break;

        case ("stoptimer"):
          stopTimer();
          break;

        case ("mainmaintenancechange"):
          if (parseInt(data_push.data.status) && window.userAuthority != "admin") {
            if(window.lobby_type == 'integrated'){
              window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
            } else {
              window.location = redirectTo;
            }
          }
          break;

        case ("maintenanceChange"):
          let slave = window.slave === '' ? 'normal' : window.slave;

          if (window.userAuthority != "admin") {
            if (parseInt(data_push.data.status) === 1 && slave === data_push.data.slave) {
              if(window.lobby_type == 'integrated'){
                window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
              } else {
                window.location = redirectTo;
              }
            }
            else if (parseInt(data_push.data.status) === 1 && data_push.data.slave === 'all') {
              if(window.lobby_type == 'integrated'){
                window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
              } else {
                window.location = redirectTo;
              }
            }
            else if (slave === 'normal' && data_push.data.slave === 'flippy') {
              if(window.lobby_type == 'integrated'){
                window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
              } else {
                window.location = redirectTo;
              }
            }
          }
          break;

        case ("mainnoticechange"):
          self.component_announcement.setAnnouncement(data_push.data);
          break;

        case ("noticechange"):
          if (parseInt(data_push.tableId) == parseInt(window.tableNum)) {
            self.component_announcement.setAnnouncement(data_push.data);
          }
          break;

        case ("shoeburncard"):
          burnCard(data_push.value);
          break;

        case ("bets"):
          setRoomInfo(data_push);
          break;

        case "displayRollback":
          setVoid();
          break;
      }
    }, 1200)
  });

  let handleFlippy = (data) => {
    if(!flippyFlip) {
      flipFlippy(tempFlipData);
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
      flippyTimer(flippy_data);
    }
  }

  let setVoid = (data) => {

    self.roadMarks.pop();
    self.component_roadmap.drawPearlRoad(self.roadMarks);
    self.component_roadmap.shoe_counter.text = self.roadMarks.length
    self.component_roadmap.setPercentages(self.roadMarks);
    self.component_roadmap.drawBigRoad(self.roadMarks);
    self.component_roadmap.drawBigeyeboy(self.roadMarks);
    self.component_roadmap.drawSmallRoad(self.roadMarks);
    self.component_roadmap.drawCockroachroad(self.roadMarks);

    self.component_roadmap.checkPrediction(self.roadMarks);
  }

  let flipFlippy = (data) =>{

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
    isflip = true;

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

      if(flipEnd_cnt == 1) {
         console.log(hit3rd, "SHOULDHIT");
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
  }

  let flippyTimer = (data) => {
    if (!flippy_timer_start) {
      flip_time_cnt++;

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
      self.component_timer.timer_instance.visible = true
      self.component_timer.timer_instance.timer(parseInt(data.flipTime), parseInt(data.totalTime));
      // self.addChild(flippy_timer);
      flippy_timer_start = true;
      self.selected_flip_card = null
      flippyClickCards();
    }
    if (data.flipTime == 0) {
      self.component_timer.timer_instance.visible = false;
      flippy_timer_start = false;
    }
  }

  let displaymodify = (data) => {
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
            self.component_winAmount.total_win_text.text = self.component_winAmount.numberWithCommas(newMoney);
            self.component_winAmount.animateAmtWin();
          }
      }
    });
  }

  let shoechange = (data) => {
    self.component_betDetails.win_amount = 0;
    self.component_betDetails.bet_amount = 0;
    self.component_betDetails.reinit(false);

    self.component_roadmap.pearlroad_container.removeAllChildren();
    self.component_roadmap.bigeyeboy_container.removeAllChildren();
    self.component_roadmap.smallroad_container.removeAllChildren();
    self.component_roadmap.bigroad_container.removeAllChildren();
    self.component_roadmap.cockroachroad_container.removeAllChildren();
    self.roadMarks = [];
    self.component_roadmap.shoe_counter.text = 0;
    self.component_card_result_total.visible = false;

    self.component_roadmap.player_prediction1.graphics.clear().ss(3).s("#fff").drawCircle(0, 0, 8);
    self.component_roadmap.player_prediction2.graphics.clear().beginFill("#fff").drawCircle(0, 0, 9);
    self.component_roadmap.player_prediction3.graphics.clear().beginFill("#fff").drawRoundRect(0, 0, 5, 20, 2);

    self.component_roadmap.banker_prediction1.graphics.clear().ss(3).s("#fff").drawCircle(0, 0, 8);
    self.component_roadmap.banker_prediction2.graphics.clear().beginFill("#fff").drawCircle(0, 0, 9);
    self.component_roadmap.banker_prediction3.graphics.clear().beginFill("#fff").drawRoundRect(0, 0, 5, 20, 2);


    // if (!self.mobile) {
      self.component_roadmap.tie_total_text.text = 0;
      self.component_roadmap.player_total_text.text = 0;
      self.component_roadmap.playerpair_total_text.text = 0;
      self.component_roadmap.playernatural_total_text.text = 0;
      // ===  banker total texts
      self.component_roadmap.banker_total_text.text = 0;
      self.component_roadmap.bankerpair_total_text.text = 0;
      self.component_roadmap.bankernautral_total_text.text = 0;

      self.component_roadmap.player_prediction1.graphics.clear().ss(3).s("#fff").drawCircle(0, 0, 10);
      self.component_roadmap.player_prediction2.graphics.clear().beginFill("#fff").drawCircle(0, 0, 10);
      self.component_roadmap.player_prediction3.graphics.clear().beginFill("#fff").drawRoundRect(0, 0, 5, 25, 2);

      self.component_roadmap.banker_prediction1.graphics.clear().ss(3).s("#fff").drawCircle(0, 0, 10);
      self.component_roadmap.banker_prediction2.graphics.clear().beginFill("#fff").drawCircle(0, 0, 10);
      self.component_roadmap.banker_prediction3.graphics.clear().beginFill("#fff").drawRoundRect(0, 0, 5, 25, 2);
    // }

    let game_stat = {
      total_games: 1,
      banker_win: 0,
      player_win: 0,
      tie_win: 0
    }

    self.component_dealer_data.setStats(game_stat);

    //Set message
    self.component_messages.setMessage('SHOE SUCCESSFULLY CHANGED');

    self.component_burnCard.removeBurnCard();
    self.initRound();

    setTimeout(() => {
      self.component_messages.gold_instance.scaleX = 0;
      self.component_messages.message_text.scaleX = 0;
      self.component_messages.message_text.alpha = 0;
    }, 3000);
  }

  let updateCredits = (data) => {
    let user_money = 0;

    // amount reinit on update credit event //update money here
    if(window.integrationType == "transfer") {
      if(window.casino == "N") {
        self.context.user_money = parseInt(data.payload.credits.money);
      } else {
        self.context.user_money = parseFloat(data.payload.credits.money).toFixed(2);
      }
      self.component_betDetails.reinit(true);
    } else {
      // if seamless get money frm api
      console.log("INTEGARATION TYPE", window.integrationType)
      $.post('/get/user', (response) => {
        response = typeof response === 'string' ? JSON.parse(response) : response;
        console.log("INTEGARATION TYPE", window.integrationType, response, response.money, typeof response)
        if(response.money) {
          if(window.casino == "N") {
            self.context.user_money = parseInt(response.money);
          } else {
            self.context.user_money = parseFloat(response.money).toFixed(2);
          }
          self.component_betDetails.reinit(true);
        } // end if
      });
    }

    // notification for win starts here
    if (data.gameName != "Baccarat" || (data.gameName == "Baccarat" && data.tableId != window.tableNum)) {
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
          self.component_winnings.visible = true;
          self.component_winAmount.animateAmtWin();
          self.component_betDetails.win_amount = data.payload.credits.total_winning;
          self.component_winAmount.total_win_text.text = self.component_winAmount.numberWithCommas(data.payload.credits.total_winning);
          self.component_betDetails.reinit(true);
        }
      } //end if
    }
  }

  let setRoundHold = function(data) {
    self.component_timer.timer_instance.tween_time.setPaused(data.pause);
    self.component_timer.startTime(betTime, data.pause, true)
  }

  let stopTimer = function() {
    self.component_timer.timer = 0;
  }

  let setResult = function(data) {

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
    self.component_winnings.showWinAnimation(win_res, data.gameResult.winner == 'banker' ? "#7f1d1d" : "#0c3e66");
    if(data.gameResult.supersix) {
      if(isSuperSix()) {
        self.component_winning_assets.createWinText(window.language.gamename.supersix);
      }
    }

    if(data.gameResult.bonus) {
      if(isDragonBonus()) {
        self.component_winning_assets.createWinText(window.language.gamename.dragonbonus, winners);
      }
    }

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

    if(isSuperSix() && data.gameResult.winner == "banker" && baccaratTotal(self.cards_gameInfo).banker == 6) {
      self.component_betBoard.bet_areas[3].payout_multiplier = 0.5;
      self.component_betBoard.bet_areas[8].payout_multiplier = 0.5;
      self.component_multiplayer.user_1[2].payout_multiplier = 0.5;
      self.component_multiplayer.user_2[2].payout_multiplier = 0.5;
      self.component_multiplayer.user_3[2].payout_multiplier = 0.5;
      self.component_multiplayer.user_6[2].payout_multiplier = 0.5;
      self.component_multiplayer.user_7[2].payout_multiplier = 0.5;
      self.component_multiplayer.user_8[2].payout_multiplier = 0.5;
    }

    if (window.t_type == "flippy") {
      self.component_card_result.setCardResult(cards);

      let total = baccaratTotal(self.cards_gameInfo);
      let player_val = total.player;
      let banker_val = total.banker;

      self.component_card_result_total.setPlayerValue(player_val);
      self.component_card_result_total.setBankerValue(banker_val);
    }
    if(isDragonBonus()) {
      let bonusMultiplier = data.gameResult.bonus && data.gameResult.bonus.oddsbonus !== null ?
                                data.gameResult.bonus.oddsbonus //has 0 multiplier
                                : 1;// default
      self.component_betBoard.bet_areas[8].payout_multiplier = bonusMultiplier;//bonus_player
      self.component_betBoard.bet_areas[9].payout_multiplier = bonusMultiplier;//bonus_banker
      self.component_betBoard.bet_areas[17+1].payout_multiplier = bonusMultiplier;//bonus_player multi
      self.component_betBoard.bet_areas[18+1].payout_multiplier = bonusMultiplier;//bonus_banker multi

      if(self.mobile) {
        // self.component_firstViewSingle.bet_areas[8].payout_multiplier = bonusMultiplier;//bonus_player
        // self.component_firstViewSingle.bet_areas[9].payout_multiplier = bonusMultiplier;//bonus_banker
        self.component_firstViewMultiplayer.bet_areas[7].payout_multiplier = bonusMultiplier;//bonus_player multi
        self.component_firstViewMultiplayer.bet_areas[8].payout_multiplier = bonusMultiplier;//bonus_banker multi
      }

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

    // Animate winning
    let multiplayerFlag = false;
    if (parseInt(window.multiplayer)) {
      multiplayerFlag = true;
      self.component_multiplayer.tableWin(winners);

      if (self.mobile) {
        self.component_firstViewMultiplayer.tableWin(winners);
      }
    }

    self.component_betBoard.tableWinning(winners, multiplayerFlag)

    if (self.mobile) {
      if (self.component_betBoard.visible) {
          self.component_tableDraw.redrawChips();
          self.toggleView();
      }

      self.component_firstViewMultiplayer.tableWinning(winners, multiplayerFlag);
      // self.component_firstViewSingle.tableWinning(winners);
    }

    self.component_betBoard.bet_areas.forEach((e) => {

      if (_.includes(winners, e.table_name) && e.chips.length && self.component_gameButtons.is_confirmed_bet) {
        if(e.table_name == "banker" || e.table_name == "player") {
          self.player_data.total_win++;
        }
      }
    });

    self.component_playerInfo.setUserStat(self.player_data);

  };

  let w = 380;
  let h = 550;

  if (self.mobile) {
    w = 660;
    h = 600 + 180
  }
  /**
   * Flippy baccarat handling
   */
  let flippyClickCards = () => {

    if(toFlipcards.length && toFlipcards[0].card_type == "player" && toFlipcards.length == 2) {
        toFlipcards = toFlipcards.reverse()
    }
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

    let offset = [0];

    let point = (fpf.fpfWrap.width() * 0.22);
    if(cardData.length > 1) {
      offset = [point * (-1), point];
    }
    // calling controller to handle create cards and etc
    if(cardData.length) {
      var ratio = 1.6;
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
          
          // window.addEventListener("resize", () => {
          //   if (window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
          //     point = (fpf.fpfWrap.height() * 0.16);
          //   } else {
          //     point = (fpf.fpfWrap.width() * 0.16);
          //   }
          // })
        } else {
          point = (fpf.fpfWrap.width() * 0.16);
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
  }

  let deleteCard = (data) => {
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
  }

  let _cardFlip = false;

  let formatCards = (data) => {
    let player1 = data.player1, player2 = data.player2, player3 = data.player3;
    let banker1 = data.banker1, banker2 = data.banker2, banker3 = data.banker3;

    let playerCard = self.component_card_result.player && self.component_card_result.player.length ? self.component_card_result.player[0] : null;
    let bankerCard = self.component_card_result.banker && self.component_card_result.banker.length ? self.component_card_result.banker[0] : null;
    // === player
    if (player1) {
      cards["player"] = ["C" + player1];
    } //
    if (player1 && player2 && playerCard) {
      cards["player"][1] = "C" + player2;
    } //
    if (player3) {
      cards["player"][2] = "C" + player3;
    } //

    // === banker
    if (banker1) {
      cards["banker"] = ["C" + banker1];
    } //
    if (banker1 && banker2 && bankerCard) {
      cards["banker"][1] = "C" + banker2;
    } //
    if (banker3) {
      cards["banker"][2] = "C" + banker3;
    } //

    let cond1 = player1 && banker1;

    if(cond1) {
      _cardFlip = true
      if(banker2 && !player2) _cardFlip = false;
      if(player2 && !banker2) _cardFlip = false;

      if(banker2 && player2) _cardFlip = true;
    };
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

  let swipeCard = function(data) {

    if(toFlipcards && toFlipcards.length && toFlipcards[0].card_type == "player" && toFlipcards.length == 2) {
        toFlipcards = toFlipcards.reverse()
    }

    if(detele_flag) {
      self.component_card_result.player = []
      self.component_card_result.banker = []

      delete self.component_card_result.player;
      delete self.component_card_result.banker;
      detele_flag = 0;
    }

    if (window.t_type != "flippy") {
      let total = baccaratTotal(data.gameInfo);
      let player_val = total.player;
      let banker_val = total.banker;

      setTimeout(() => {
        self.component_card_result_total.setPlayerValue(player_val);
        self.component_card_result_total.setBankerValue(banker_val);
      }, 2500);
    }

    self.cards_gameInfo = data.gameInfo;

    if (!visible) {
      self.toggleResult();
      visible = true;
    }

    self.component_card_result.visible = (window.tutorial_enabled) ? false : true;
    self.component_card_result_total.visible = (window.tutorial_enabled) ? false : true;

    // formatCards2(data);
    formatCards(self.cards_gameInfo);

    if (self.mobile) {
      self.component_card_result.drawCards(cards, 0.94, "new_cards", 80, 120);
    } else {
      self.component_card_result.drawCards(cards, 0.47, "cards", 190, 263);
    }

    if(self.component_card_result.player && self.component_card_result.banker) {
      console.log("shouldhit player ::: ",shouldHit('player'), self.component_card_result.player.length, "shouldhit banker ::: ",shouldHit('banker'), self.component_card_result.banker.length);
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

          let _tempCards = formatTemp(data.gameInfo);

          setTimeout(() => {
            self.component_card_result.setCardResult(_tempCards);
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

      self.component_betBoard.bet_areas.forEach((table) => {
        if (table.chips.length) {
          if (table.table_name == "player") {
            if (self.component_card_result.player && self.component_card_result.player.length) {

              self.component_card_result.player.forEach((c) => {
                if (!c.isAnim) c.flag = 0;
              });
              self.component_card_result.player.forEach((c,e) => {
                c.card_type = "player";
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
            toFlipcards = self.component_card_result.player;
          } else if (table.table_name == "banker") {
            if (self.component_card_result.banker && self.component_card_result.banker.length) {
              self.component_card_result.banker.forEach((c) => {
                if (!c.isAnim) c.flag = 0;
              });
              self.component_card_result.banker.forEach((c, e) => {
                c.card_type = "banker"
                if (!c.flag) {
                  c.gotoAndStop(60)
                  if(e==2) {
                    c.gotoAndStop(61)
                  }
                  c.flag = 1;
                }
              });
            }
            toFlipcards = self.component_card_result.banker;
          }
        }
      });
    }

    setCardPositions();
    if(window.t_type == 'flippy') {
      // flippy special case
      if(flippyFlag) {
        if(self.component_card_result.player.length >= 2 && self.component_card_result.banker.length >= 2) {
          flippyTimer(flippy_data);
          flippyFlag = false;
        }
      }
    }
  };

  let newround = function(data) {
    flippyFlag = false;
    flippyFlip = true;
    tempFlipData = null;
    _cardFlip = false;
    // Hide chip mask
    if(!self.mobile) {
      self.component_betBoard.chipWrap.visible = false;
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

    self.component_gameButtons.is_confirmed_bet = true

    if(isSuperSix()) {
      self.component_betBoard.bet_areas[3].payout_multiplier = 1;
      self.component_betBoard.bet_areas[8].payout_multiplier = 1;
      self.component_multiplayer.user_1[2].payout_multiplier = 1;
      self.component_multiplayer.user_2[2].payout_multiplier = 1;
      self.component_multiplayer.user_3[2].payout_multiplier = 1;
      self.component_multiplayer.user_6[2].payout_multiplier = 1;
      self.component_multiplayer.user_7[2].payout_multiplier = 1;
      self.component_multiplayer.user_8[2].payout_multiplier = 1;
    }

    toFlipcards = [];
    self.component_card_result.icon_click = [];
    selected_flip_card = null;
    self.selected_flip_card = null;
    self.component_timer.clearTimer();
    self.component_card_result.visible = (window.tutorial_enabled) ? false : true;
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

      self.component_menuPlayerInfo.balance.text = amount;
      self.component_menuPlayerInfo.round.text = data.roundNum;
      self.component_burnCard.removeBurnCard();
    });

    window.bets = {
      round_id: data.roundNum
    }

    self.component_dealer.setRound(data.roundNum);
    self.initRound();
    timer_start = false;
  } // === end new round

  let startBetting = function(data) {
    if (!self.component_timer.timer) timer_start = false;

    if (!timer_start) {
        playSound('bet-start');
        self.component_timer.startTime(parseInt(data.bettingTime), false, false, parseInt(data.totalTime));
        timer_start = true;
    }
  } // === end of startbetting

  let isSuperSix = () =>{
    return getSlaveParam('supersix');
  }

  let isDragonBonus = () =>{
    return getSlaveParam('bonus');
  }

  let isNatural =  (side) => {
    let scores = baccaratTotal(self.cards_gameInfo);
    return self.component_card_result[side].length == 2 && [8, 9].indexOf(scores[side]) !== -1;
  }

  let shouldHit = (type) => {
    let scores = {};
    const playerCardLen = self.component_card_result.player.length;
    const playerLastCard = self.cards_gameInfo.player3 ? cardsModule(self.cards_gameInfo.player3).value : '';

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

  let burnCard = function(data) {
    self.component_burnCard.burnCard(data);
  }

  let setRoomInfo = function(data) {
    self.component_roomInfo.updateInfo(data.data, data.totalBettingUsers);
  }

  let obj = {
    swipeCard: swipeCard,
    startBetting: startBetting,
    newround: newround,
    flipFlippy: flipFlippy,
    flippyTimer: flippyTimer
  }


  $("#flippytimer").on("click", ()=>{
    handleFlippy({dealerId: 101,
          eventName : "flippytimer",
          flipTime : 6,
          round_id : 799342,
          totalTime : 6,
          tableId : 1});
  })

  $("#flip").on("click", ()=>{
    flipFlippy()
  });

  emulator.start(self, obj);

}
