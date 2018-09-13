import Xpacket from '../lib/XPacket';
import cardsModule from '../factories/cards';
import fnFormat from '../factories/formatter';
import {
	createSprite,
	randomNum,
	createCardSprite,
	numberCounter,
	playSound,
	numberWithCommas,
	createSpriteRoadMap
} from '../factories/factories';

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

for (var x = 0; x < sounds.length; x++) {
	createjs.Sound.registerSound(sounds[x]);
}

var redirectTo = self.mobile ? window.lobby_domain+'m?game=true' : window.lobby_domain+"?game=true";
if (window.nonInstall) redirectTo = window.lobby_domain+'non?game=true';

export default (self) => {
	var socket = io.connect(window.socket + 'Dragon-Tiger/' + window.tableNum, {
		transports: ['websocket']
	});
	self.socketAll = io.connect(window.socket + 'all', {
		transports: ['websocket']
	});

	let card_data = {};
	let card = '';
	let round_id = '';

	//positions card
	let dragonX = 0;
	let tigerX = 0;
	let dragonY = 0;
	let tigerY = 0;

	let timer_start = false;
	let refresh_card = {};

	let dealer_game_stat = {
		total_games: 0,
		dragon_win: 0,
		tiger_win: 0,
		tie_win: 0
	}
	let visible = false;

	let data_push = null;
	let betTime = 0;
	let dragontiger_marks = null;

	self.user_no_bet_count = 0;
	self.currently_ingame = false;

	let connect = () => {
		self.socketAll.emit('data', {
			eventName: 'init',
			data: {
				userId: window.userId,
				username: window.user_name
			}
		});

		if(self.mobile) {
			self.socketAll.emit('register', {id: window.userId});
		}

		self.socketAll.on("data", (data) => {
			data = Xpacket.received(data);

			switch(data.eventName) {
				case "maintenanceChange" :
				if(window.userAuthority != "admin") {
					if(!self.mobile) {
						self.component_multibet.maintenanceChange(data);
					}
				}
				break;
				case "reject" :
				window.location = "/rejected"
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

	self.socketAll.on("disconnect", () => {
		connect();
	});

	socket.on('connect', function (socket) {
		connect();
	});

	socket.on('data', function (data) {
		data = Xpacket.received(data);

		// Check if banker in another game
		// if (window.isPlayer.toLowerCase() == 'f') {
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
		// self.component_menuPlayerInfo.dealer.text = dealerData.name;

		//set round num
		window.round_id = data.data.currentRound;
		self.component_dealer.setRound(data.data.currentRound);

		// if (!self.mobile) {
		self.component_roadmap.shoe_counter.text = self.roadMarks.length;
		// }

		// if (data.data.gameInfo.tiger || data.data.gameInfo.dragon) {
		// 	self.component_card_result_total.visible = (window.tutorial_enabled) ? false : true;
		// }

		dragontiger_marks = data.data.marks;
		if (data.data.gameInfo.tiger) {
			card_data.tiger = [data.data.gameInfo.tiger]
		}
		if (data.data.gameInfo.dragon) {
			card_data.dragon = [data.data.gameInfo.dragon]
		}

		for (var key in card_data) {
			card_data[key] = card_data[key].map((e) => {
				return "C" + e;
			});
		}

		// self.showResult();
		visible = true;
		if (self.mobile) {
			self.component_card_result.drawCardGameInfo(card_data, 0.74, "cards", 80, 120);
		} else {
			self.component_card_result.drawCardGameInfo(card_data, 0.47, "cards", 190, 263);
		}

		if (self.component_card_result.dragon) {
			self.component_card_result.dragon[0].gotoAndStop("back_blue")
		}
		if (self.component_card_result.tiger) {
			self.component_card_result.tiger[0].gotoAndStop("back_red")
		}

		setCardPositions();

		// if (!self.mobile) {
			// self.component_roadmap.drawPearlRoad(fnFormat().fnFormatDTPearlRoad(self.roadMarks, 6, 12))
		// } else {
			// self.component_roadmap.drawPearlRoad(fnFormat().fnFormatDTPearlRoad(self.roadMarks, 6, 13))
		// }
		self.component_roadmap.drawPearlRoad(self.roadMarks);
		self.component_roadmap.drawBigRoad(self.roadMarks);
		self.component_roadmap.drawBigeyeBoy(self.roadMarks);
		self.component_roadmap.drawSmallRoad(self.roadMarks);
		self.component_roadmap.drawCockroachRoad(self.roadMarks);

		self.component_roadmap.checkPrediction(self.roadMarks)
		self.component_roadmap.setScoreCount(self.roadMarks);
		// self.component_roadmap.fnUpdateCaching(false);

		if(!data.data.marks.length) {
			self.currently_ingame = false;
			self.component_card_result.visible = false;
			self.component_card_result_total.visible = false;
		}

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

		// Notice
		if (data.data.mainNotice) {
			if (parseInt(data.data.mainNotice.status)) {
				self.component_announcement.setAnnouncement(data.data.mainNotice, true);
			}

			if (parseInt(data.data.noticeSetting.status)) {
				self.component_announcement.setAnnouncement(data.data.noticeSetting, false);
			}
		}
	});

	let maxtimer = 15;
	let redirect_timer = maxtimer;

	socket.on('push', function (data) {
		let d = Xpacket.received(data);

		if(d.eventName == 'regionalcredits') return;

		setTimeout(() => {
			data_push = Xpacket.received(data);
			switch (data_push.eventName) {
				case("setbettingtime") :
					startBetting(data_push)
					break;

				case ("setroundprogress"):
					self.component_roomInfo.visible = false;
					self.component_timer.timer = 0;
					break;

				case ("displayresult"):
				case ("displayresults"):
					if(self.component_gameButtons.is_confirmed_bet) {
						self.player_data.total_bets += self.component_gameButtons.yourBets.length;
					}
					
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
									window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
								} else {
									window.location = redirectTo;
								}
								clearInterval(promptInterval);
							}

							redirect_timer--;

							if (redirect_timer >= 0) {
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

					setResult(data_push);
				break;

				case ("newround"):
					newround(data_push);
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
					break;

				case ("setroundhold"):
					setRoundHold(data_push);
					break;

				case ("stoptimer"):
					stopTimer();
					break;

				case ("removeitem") :
					deleteCard(data_push);
					break;

				case ("inputitem"):
					swipecard(data_push);
					break;

				case ("shoechange"):
					shoechange(data_push);
					break;

				case ("dealerchange") :
					let dealerData = {"name": data_push.dealerName, "image": data_push.dealerImage}
					self.component_dealer.setDealer(dealerData);
					break;

				case ("displaymodify"):
					displaymodify(data_push);
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
					if (parseInt(data_push.data.status) && window.userAuthority != "admin") {
						if(window.lobby_type == 'integrated'){
							window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
						} else {
							window.location = redirectTo;
						}
					}
					break;

				case ("mainnoticechange"):
					self.component_announcement.setAnnouncement(data_push.data, true);
					break;

					case ("noticechange"):
					if (parseInt(data_push.tableId) == parseInt(window.tableNum)) {
						self.component_announcement.setAnnouncement(data_push.data, false);
					}
					break;

				case ("bets"):
					setRoomInfo(data_push);
					break;

				case "displayRollback":
					setVoid();
					break;
			}
		}, 1000)
	});

	let setVoid = (data) => {
		self.roadMarks.pop();
		self.component_roadmap.shoe_counter.text = self.roadMarks.length


		if (!self.mobile) {
			self.component_roadmap.drawPearlRoad(fnFormat().fnFormatDTPearlRoad(self.roadMarks, 6, 12))
		} else {
			self.component_roadmap.drawPearlRoad(fnFormat().fnFormatDTPearlRoad(self.roadMarks, 6, 13))
		}
		self.component_roadmap.drawPearlRoad(self.roadMarks);
		self.component_roadmap.drawBigRoad(self.roadMarks);
    self.component_roadmap.drawBigeyeBoy(self.roadMarks);
    self.component_roadmap.drawSmallRoad(self.roadMarks);
    self.component_roadmap.drawCockroachRoad(self.roadMarks);

		self.component_roadmap.checkPrediction(self.roadMarks)
		self.component_roadmap.setScoreCount(self.roadMarks);

	}

	let displaymodify = (data) => {
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

		// self.component_roadmap.fnUpdateCaching(true);

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
	}
	$("#shoechange").on("click", function (argument) {
		shoechange();
	})
	let shoechange = (data) => {

		self.component_betDetails.win_amount = 0;
		self.component_betDetails.bet_amount = 0;
		self.component_betDetails.reinit(false);

		self.component_roadmap.pearlroad_container.removeAllChildren();
		self.component_roadmap.bigeyeboy_container.removeAllChildren();
		self.component_roadmap.smallroad_container.removeAllChildren();
		self.component_roadmap.bigroad_container.removeAllChildren();
		self.component_roadmap.cockroachroad_container.removeAllChildren();

		self.roadMarks = []
		dragontiger_marks = [];
		self.currently_ingame = false;
		self.component_card_result_total.visible = false;
		// == rreset prediction
		self.component_roadmap.player_prediction1.graphics.clear().ss(3).s("#fff").drawCircle(0, 0, 8);
		self.component_roadmap.player_prediction2.graphics.clear().beginFill("#fff").drawCircle(0, 0, 9);
		self.component_roadmap.player_prediction3.graphics.clear().beginFill("#fff").drawRoundRect(0, 0, 5, 20, 2);

		self.component_roadmap.banker_prediction1.graphics.clear().ss(3).s("#fff").drawCircle(0, 0, 8);
		self.component_roadmap.banker_prediction2.graphics.clear().beginFill("#fff").drawCircle(0, 0, 9);
		self.component_roadmap.banker_prediction3.graphics.clear().beginFill("#fff").drawRoundRect(0, 0, 5, 20, 2);

		self.component_roadmap.shoe_counter.text = 0
		self.component_roadmap.dragon_total_text.text = 0;
		self.component_roadmap.tiger_total_text.text = 0;
		self.component_roadmap.tie_total_text.text = 0;
		if (!self.mobile) {
			try {
				self.component_scoreBoard.updateCache();
				// self.component_roadmap.updateCache();
			} catch (err) {
				console.log(err)
			}

			//==reset preditioction
			//
			self.component_roadmap.player_prediction1.graphics.clear().ss(3).s("#fff").drawCircle(0, 0, 10);
			self.component_roadmap.player_prediction2.graphics.clear().beginFill("#fff").drawCircle(0, 0, 10);
			self.component_roadmap.player_prediction3.graphics.clear().beginFill("#fff").drawRoundRect(0, 0, 5, 25, 2);

			self.component_roadmap.banker_prediction1.graphics.clear().ss(3).s("#fff").drawCircle(0, 0, 10);
			self.component_roadmap.banker_prediction2.graphics.clear().beginFill("#fff").drawCircle(0, 0, 10);
			self.component_roadmap.banker_prediction3.graphics.clear().beginFill("#fff").drawRoundRect(0, 0, 5, 25, 2);

		}

		self.component_roadmap.updateCache();

		let game_stat = {
			total_games: 1,
			dragon_win: 0,
			tiger_win: 0,
			tie_win: 0
		}

		self.component_dealer_data.setStats(game_stat);

		//Set message
		self.component_messages.setMessage('SHOE SUCCESSFULLY CHANGED');

		setTimeout(() => {
			self.component_messages.gold_instance.scaleX = 0;
			self.component_messages.message_text.scaleX = 0;
			self.component_messages.message_text.alpha = 0;
		}, 3000);

		self.initRound();
	}


	let updateCredits = (data) => {
		/* mobile winning anim starts here */
    //add chip settings
    let options = {
      font1 : 'normal 20px BebasNeue',
      font2 : 'normal 15px BebasNeue',
      radius : 18,
      maskScale : 0.6,
      textScale : 0.6,
      chipScale : 0.8
    }

    //hides main bet area when result
    if (self.mobile) {
      if (self.component_betBoard.visible) {
          self.component_tableDraw.redrawChips();
          self.toggleView();
      }
    }

    let winOptions = {toScale : 0.8};
    let bets = data.payload.credits.bets;

    let _toUseAreas = _.filter(self.component_betBoard.bet_areas, function(area) {
      if(parseInt(window.multiplayer)) {
        return area.multiplayer
      }
      return area.singleplayer
    });

    if(parseInt(window.multiplayer)) {
      options.chipScale = 0.6;
      options.maskScale = 0.6;
      options.textScale = 0.6;
      options.radius = 14;
      options.font1 = 'normal 16px BebasNeue';
      options.font2 = 'normal 12px BebasNeue';
      _toUseAreas = self.component_firstViewMultiplayer.bet_areas;
    }

    if(parseInt(data.tableId) === parseInt(window.tableNum) && data.gameName == 'DragonTiger') {
      //winning animation here
      ((bets, _toUseAreas) => {
        setTimeout(() => {
          for(var  i = 0; i < bets.length; i++) {
            for(var x = 0; x < _toUseAreas.length; x++) {
              if(bets[i].bet === _toUseAreas[x].table_name) {
                let win_money = bets[i].win_money - _toUseAreas[x].total_bet_amt;
                if(win_money > 0) {
                  self.component_winChips.createWinningChips(_toUseAreas[x], win_money, options);
                  self.component_winChips.animateWinLose(_toUseAreas[x], 'win', winOptions);
                } else if(win_money == 0) {
                  self.component_winChips.animateWinLose(_toUseAreas[x], 'win', winOptions);
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


		let user_money = 0;

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
					self.component_betDetails.reinit(true);
				} // end if
			});
		}

		// notification for win starts here
		if (data.gameName != "Dragon-Tiger" || (data.gameName == "Dragon-Tiger" && data.tableId != window.tableNum)) {
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
			if(data.payload.credits.total_winning > 0) {
				self.component_winnings.isWin();
				self.component_winnings.visible = true;
				self.component_betDetails.win_amount = parseInt(data.payload.credits.total_winning);
				self.component_winAmount.total_win_text.text = self.component_winAmount.numberWithCommas(data.payload.credits.total_winning);

				self.component_winAmount.animateAmtWin();
				self.component_betDetails.reinit(true, "is win events");
			}
		}

	}

	let stopTimer = function () {
		self.component_timer.timer = 0;
	}

	let setRoundHold = function (data) {
		self.component_timer.timer_instance.tween_time.setPaused(data.pause);
		self.component_timer.startTime(betTime, data.pause, true)
	}

	let setCardPositions = function (argument) {
		if (!self.mobile) {
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
							y: yPos,
							x : xPos,
							isset : true
						});
					}
				}

				// self.component_card_result.dragon[0].x = 1470;
				// self.component_card_result.dragon[0].y = 160;
			}
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
							y: yPos,
							x : xPos,
							isset : true
						});
					}
				}
				// self.component_card_result.tiger[0].x = 1670;
				// self.component_card_result.tiger[0].y = 160;
			}

		} else {
			if (self.component_card_result.dragon) {
				self.component_card_result.dragon[0].x = 170;
				self.component_card_result.dragon[0].y = 250;
			}
			if (self.component_card_result.tiger) {
				self.component_card_result.tiger[0].x = 170;
				self.component_card_result.tiger[0].y = 370;
			}
		}
	} //setCardPositions

	let newround = function (data) {
		// Hide chip mask
		if(!self.mobile) {
			// self.component_betBoard.chipWrap.visible = false;
		} else {
			self.component_chips.chipWrap.visible = false;
		}

		self.component_betBoard.bet_cnt = 0;

		self.logUserMoney = 0;
		self.component_gameButtons.is_confirmed_bet = true;
		self.component_gameButtons.yourBets = [];
		self.saved_bets = [];

		self.component_timer.clearTimer();
		// self.component_dealer_data.setStats(dealer_game_stat);

		// self.component_roadmap.roadMapCache();

		self.confirm = false;

		self.component_betDetails.bet_amount = 0;

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

		self.currently_ingame = false;
		self.component_card_result_total.visible = false;

		self.component_dealer.setRound(data.roundNum);
		self.initRound();
		timer_start = false;
		refresh_card = {};
		card_data = {};
	}

	let startBetting = function (data) {
		// body...
		betTime = data.bettingTime;

		if (!timer_start) {
			playSound('bet-start');

			self.component_timer.startTime(parseInt(data.bettingTime), false, false, parseInt(data.totalTime));
			timer_start = true;
		}
		if (self.mobile) {
			if (betTime <= 0) {
				// self.component_firstView.visible = true;
				// self.component_betBoard.visible = false;
			}
		}
	}

	let deleteCard = (data) => {
		let mod_cards = {
			dragon: [],
			tiger: []
		}

		if(data.gameInfo.tiger) {
			mod_cards.tiger = ["C"+data.gameInfo.tiger]
		} else {
			mod_cards.tiger = []
		}

		if(data.gameInfo.dragon) {
			mod_cards.dragon = ["C"+data.gameInfo.dragon]
		} else {
			mod_cards.dragon = []
		}
		for(var key in card_data) {
			for(var x = 0;x < card_data[key].length; x++) {
				if(card_data[key][x] != mod_cards[key][x]) {
					self.component_card_result.deleteCard(key)
					delete self.component_card_result[key]
				}
			}
		}

		card_data = mod_cards;
	} //deleteCard

	let swipecard = function (data) {
		if (data.type == "burn") return;

		card_data[data.type] = [data.value ? "C" + data.value : ""];
		self.currently_ingame = true;

		self.component_card_result_total.visible = true;

		self.cards_gameInfo = data.gameInfo;

		// if (!visible) {
    //   self.showResult();
    //   visible = true;
    // }

		self.component_card_result_total.visible = (window.tutorial_enabled) ? false : true;
		self.component_card_result.visible = (window.tutorial_enabled) ? false : true;

		if (self.mobile) {
			self.component_card_result.drawCards(card_data, 0.74, "cards", 80, 120);
		} else {
			self.component_card_result.drawCards(card_data, 0.47, "cards", 190, 263);
		}

		// if (self.component_card_result.dragon) {
		// 	self.component_card_result.dragon[0].gotoAndStop("back_blue")
		// } else {
		// 	self.component_card_result.tiger[0].gotoAndStop("back_red")
		// }
		if (self.component_card_result.dragon && self.component_card_result.dragon.length) {
			self.component_card_result.dragon.forEach((dragon, x) => {
				dragon.code = card_data.dragon[x]
				if (!dragon.flag) {
					dragon.gotoAndStop("back_blue")
					dragon.flag = 1;
				}
			});
		}

		if (self.component_card_result.tiger && self.component_card_result.tiger.length) {
			self.component_card_result.tiger.forEach((tiger, x) => {
				tiger.code = card_data.tiger[x]
				if (!tiger.flag) {
					tiger.gotoAndStop("back_red")
					tiger.flag = 1;
				}
			});
		}



		setCardPositions();

		// Display card
		setTimeout(() => {
			self.component_card_result.setCardResult(card_data);

			// it_roadmap.fnUpdateCf (data.type == 'dragon') {
			// 	self.component_card_result_total.setDragonValue(cardsModule(data.value).value);
			// } else {
			// 	self.component_card_result_total.setTigerValue(cardsModule(data.value).value);
			// }

			if (self.mobile) {
				if (data.type == 'dragon') {
					self.component_card_result_total.setVal("dragon", cardsModule(data.value).value);
				} else {
					self.component_card_result_total.setVal("tiger", cardsModule(data.value).value);
				}
			}
		}, 2000)
	} //end of swipecard

	let color = "";

	// setTimeout(() => {
	//     card_data.tiger =  ['C0011'];
	//     card_data.dragon =  ['C0010'];
	//     self.component_card_result.drawCards(card_data, 0.74, "cards", 190, 263);
	//     setCardPositions();
	//     setResult({
	//         eventName : 'displayresult',
	//         gameResult : {"winner": "dragon", "side_bets": {"tiger": {"size": "big", "suite": "club", "parity": "odd"}, "dragon": {"size": "big", "suite": "club", "parity": "even"}}},
	//         gameInfo : {"burn": "0011", "tiger": "0010", "dragon": "0011"},
	//         mark : {num:12, mark:'g'}
	//     })
	// },4000)

	let setResult = function (data) {
		setTimeout(() => {
      // self.hideResult()
      visible = false;
    },6000);

		dealer_game_stat.total_games++;

		let winning = [];
		let win = "";
		let winning_asset = "";

		// dragontiger_marks.push(data.mark);
		self.roadMarks.push(data.mark);
		// if(!self.mobile) {
			// self.component_roadmap.drawPearlRoad(fnFormat().fnFormatDTPearlRoad(self.roadMarks, 6, 12))
		// } else {
			// self.component_roadmap.drawPearlRoad(fnFormat().fnFormatDTPearlRoad(self.roadMarks, 6, 13))
		// }
		// self.component_roadmap.drawBigRoad(fnFormat().fnFormatDTBigRoad(self.roadMarks, 6, 41))
		// self.component_roadmap.drawBigeyeBoy(fnFormat().fnFormatDTBigEyeBoy(self.roadMarks, 6, 41))
		// self.component_roadmap.drawSmallRoad(fnFormat().fnFormatDTSmallRoad(self.roadMarks, 6, 20))
		// self.component_roadmap.drawCockroachRoad(fnFormat().fnFormatDTCockroachPig(self.roadMarks, 6, 20))
		// self.component_roadmap.checkPrediction(_.clone(self.roadMarks))
		self.component_roadmap.drawPearlRoad(self.roadMarks);
		self.component_roadmap.drawBigRoad(self.roadMarks);
    self.component_roadmap.drawBigeyeBoy(self.roadMarks);
    self.component_roadmap.drawSmallRoad(self.roadMarks);
    self.component_roadmap.drawCockroachRoad(self.roadMarks);

    self.component_roadmap.checkPrediction(self.roadMarks);
		self.component_roadmap.setScoreCount(self.roadMarks);

		if (data.gameResult.winner == "tiger") {
			dealer_game_stat.tiger_win++;
			winning_asset = "tiger";
			playSound('tiger-win');
		}

		if (data.gameResult.winner == "dragon") {
			dealer_game_stat.dragon_win++;
			winning_asset = "dragon";
			playSound('dragon-win');
		}

		if (data.gameResult.winner == "tie") {
			winning_asset = "tie";
			dealer_game_stat.tie_win++;
			playSound('tie');
		}

		if(data.gameResult.winner == "suited tie") {
			winning_asset = "tie";
			dealer_game_stat.tie_win++;
			playSound('suited-tie');
		}

		// self.component_dealer_data.setStats(dealer_game_stat);


		// if (data.gameResult.side_bets != "seven") {
		//     /*if (!data.gameResult.side_bets[data.gameResult.winner]) return;*/
		//     let dragon_pair = !data.gameResult.side_bets["dragon"].parity ? "" : "dragon" + "_" + data.gameResult.side_bets["dragon"].parity;
		//     let dragon_size = !data.gameResult.side_bets["dragon"].size ? "" : "dragon" + "_" + data.gameResult.side_bets["dragon"].size;
		//     let dragon_suite = !data.gameResult.side_bets["dragon"].suite ? "" : "dragon" + "_" + data.gameResult.side_bets["dragon"].suite + "s";
		//     let tiger_pair = !data.gameResult.side_bets["tiger"].parity ? "" : "tiger" + "_" + data.gameResult.side_bets["tiger"].parity;
		//     let tiger_size = !data.gameResult.side_bets["tiger"].size ? "" : "tiger" + "_" + data.gameResult.side_bets["tiger"].size;
		//     let tiger_suite = !data.gameResult.side_bets["tiger"].suite ? "" : "tiger" + "_" + data.gameResult.side_bets["tiger"].suite + "s";
		//     winning.push(dragon_pair, dragon_size, dragon_suite, tiger_pair, tiger_size, tiger_suite, data.gameResult.winner);

		//     if (data.gameResult.winner == 'suited tie') {
		//         winning.push('tie');
		//     }
		// }
		// else{
		//     winning.push(data.gameResult.winner);
		// }

		// To check (BONO)
		if(data.gameResult.side_bets["dragon"] == "seven" && data.gameResult.side_bets["tiger"] == "seven") {
			winning.push('tie');
		}
		else if(data.gameResult.side_bets["dragon"] == "seven"){
			let tiger_pair = !data.gameResult.side_bets["tiger"].parity ? "" : "tiger" + "_" + data.gameResult.side_bets["tiger"].parity;
			let tiger_size = !data.gameResult.side_bets["tiger"].size ? "" : "tiger" + "_" + data.gameResult.side_bets["tiger"].size;
			let tiger_suite = !data.gameResult.side_bets["tiger"].suite ? "" : "tiger" + "_" + data.gameResult.side_bets["tiger"].suite + "s";
			winning.push(tiger_pair, tiger_size, tiger_suite, data.gameResult.winner);
		}
		else if(data.gameResult.side_bets["tiger"] == "seven"){
			let dragon_pair = !data.gameResult.side_bets["dragon"].parity ? "" : "dragon" + "_" + data.gameResult.side_bets["dragon"].parity;
			let dragon_size = !data.gameResult.side_bets["dragon"].size ? "" : "dragon" + "_" + data.gameResult.side_bets["dragon"].size;
			let dragon_suite = !data.gameResult.side_bets["dragon"].suite ? "" : "dragon" + "_" + data.gameResult.side_bets["dragon"].suite + "s";
			winning.push(dragon_pair, dragon_size, dragon_suite, data.gameResult.winner);
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
				winning.push('tie');
			}

			winning.push(dragon_pair, dragon_size, dragon_suite, tiger_pair, tiger_size, tiger_suite, data.gameResult.winner);
		}

		if (data.gameResult.winner == "dragon") {
			win = window.language2.dragontiger_winningdisplay_dragonwins;
		} else if (data.gameResult.winner == "tiger") {
			win = window.language2.dragontiger_winningdisplay_tigerwins;
		} else if (data.gameResult.winner == "tie") {
			win = window.language2.dragontiger_winningdisplay_tie;
		} else if (data.gameResult.winner == "suited_tie") {
			win = window.language2.dragontiger_betlayout_suitedtie;
		}
		self.component_card_result.setCardResult(card_data);

		let winner = data.gameResult.winner;
		// self.component_card_result_total.setWin(winner); //highligts card bg background

		// self.component_card_result_total.setDragonValue(cardsModule(data.gameInfo.dragon).value);
		// self.component_card_result_total.setTigerValue(cardsModule(data.gameInfo.tiger).value);


		if (self.mobile) {
			self.component_card_result_total.setVal("dragon", cardsModule(data.gameInfo.dragon).value);
			self.component_card_result_total.setVal("tiger", cardsModule(data.gameInfo.tiger).value);
		}

		let win_amt = 0;

		if (data.gameResult.winner == "tiger") {
			color = "#7f1d1d";
		} else {
			color = "#0c3e66";
		}

		self.component_betBoard.bet_areas.forEach((e) => {
			if (_.includes(winning, e.table_name) && e.chips.length && self.component_gameButtons.is_confirmed_bet) {
				self.player_data.total_win++;
			}
			// if (e.chips.length && e.alpha != 1) {
			// }
		});

		self.component_playerInfo.setUserStat(self.player_data);
		self.component_winning_assets.winning_asset[winning_asset].scaleX = self.component_winning_assets.winning_asset[winning_asset].scaleY = 0;
		setTimeout(() => {
			createjs.Tween.get(self.component_winning_assets.winning_asset[winning_asset])
			// .wait(2000)
			.to({
				scaleX: 1.5,
				scaleY: 1.5,
				alpha: 1
			}, 300)
			.to({
				scaleX: 1.1,
				scaleY: 1.1
			}, 80)

		}, 2000)

		setTimeout(() => {

			createjs.Tween.get(self.component_winning_assets.winning_asset[winning_asset])
			// .wait(5000)
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

		if (!self.component_winnings.visible) {
			self.component_winnings.visible = 1;

		} else {
			self.component_winnings.visible = 0;
		}
		setTimeout(() => {
			self.component_winnings.showWinAnimation(win, color);
		}, 2000)

		// if (!self.mobile) {
		self.component_roadmap.shoe_counter.text = self.roadMarks.length
		// }

		let multiplayerFlag = false;

		// Multiplayer win anim
		if (parseInt(multiplayer)) {
			multiplayerFlag = true;
			// self.component_multiplayer.tableWin(winning);

			if (self.mobile) {
				self.component_firstViewMultiplayer.tableWin(winning);
			}
		}

		//Win anim
		// self.component_betBoard.tableWinning(winning, multiplayerFlag);

		if (self.mobile) {
			if (self.component_betBoard.visible) {
				self.component_tableDraw.redrawChips();
				self.toggleView();
			}

			self.component_secondView.tableWinning(winning);
			self.component_firstViewMultiplayer.tableWinning(winning);
		}
	} //end of setResult

	let setRoomInfo = function(data) {
		self.component_roomInfo.updateInfo(data.data, data.totalBettingUsers);
	}
}
