import Xpacket from '../lib/XPacket';
import cardsModule from '../factories/cards';
import formatter from '../factories/formatter';
import {  createSprite,
		randomNum,
		createCardSprite,
		numberCounter,
		playSound,
		numberWithCommas,
		createSpriteRoadMap} from '../factories/factories';

let lang = window.language.locale == 'kr' ? 'ko' : window.language.locale;
let tableSlave = window.bet_type == 'b' ? 'bonusplus' : 'normal';
let redirectTo;

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
	}
]

for(var x = 0; x < sounds.length; x++) {
	createjs.Sound.registerSound(sounds[x]);
}

let has_db_bets = false;
export default (self, type) => {
  redirectTo = self.mobile ? window.lobby_domain+'m?game=true' : window.lobby_domain+"?game=true";
  if (window.nonInstall) redirectTo = window.lobby_domain+'non?game=true';
  
	self.socket = io.connect(window.socket+'Poker/'+window.tableNum, { //io.connect(`https://socket.cxz777.com/Poker/${window.tableNum}`, {
    transports: ['websocket']
	});

	self.socketAll = io.connect(window.socket+'all', { //io.connect('https://socket.cxz777.com/all', {
		transports: ['websocket']
	});

	let timer_start = false;
	let data_push = null;
	let betTime = 0;
	let card_data = {};
	let pcard_x1 = 0;
	let pcard_x2 = 0;
	let posY = 10;

	let marks = [];
	let meta_data = [];

	function setCardPositions() {

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
						self.component_card_result.community[x].x = (x*50) + 198;
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
						self.component_card_result.player[x].x = (x*74) + 815.7;
						self.component_card_result.player[x].y = posY + 1;
						self.component_card_result.player[x].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
					}
				} //end if

				if(self.component_card_result.community) {
					for(var x = 0; x<self.component_card_result.community.length; x++) {
						self.component_card_result.community[x].x = (x*94.7) + 288.5;
						self.component_card_result.community[x].y = posY + 1;
						self.component_card_result.community[x].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
					}
				} //end if

				if(self.component_card_result.dealer) {
					for(var x = 0; x<self.component_card_result.dealer.length; x++) {
						self.component_card_result.dealer[x].x = (x*74) +65;
						self.component_card_result.dealer[x].y = posY + 1;
						self.component_card_result.dealer[x].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
					}
				} //end if
			}
		} //end else
	}

	self.user_no_bet_count = 0;

	let connect = () => {

		if(self.mobile) {
      self.socketAll.emit('register', {id: window.userId});
    }

		self.socketAll.emit('data', {eventName: 'init', data : {userId : window.userId} })

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

	self.socketAll.on("disconnect", ()=> { connect(); });

	self.socket.on('connect',function(socket) {
		connect();
	});

	self.socket.on("data", (data) => {
		data = Xpacket.received(data)
		marks = data.data.marks;
		meta_data = data.data.meta;

		// Check if banker in another game
    // if (window.isPlayer.toLowerCase() == 'f') {
    //   let delay = self.mobile ? 500 : 0;
    // 	setTimeout(() => {
	   //    $('#mdlConfirmation').show();
	   //  }, delay)

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
		if(window.bets) {
			let db_data = window.bets
			if(db_data.round_num == self.component_dealer.round_id) {
				has_db_bets = true;
				/** stop bet area animation on load if has bet */
				if(parseInt(JSON.parse(db_data.bet_history).ante.bet) > 0) {
					self.component_tableDraw.stopBetAreaAnimation(self.component_betBoard.bet_areas[0]);
				}

				if('bonus' in JSON.parse(db_data.bet_history) && parseInt(JSON.parse(db_data.bet_history).bonus.bet) > 0) {
					self.component_tableDraw.stopBetAreaAnimation(self.component_betBoard.bet_areas[1]);
				}

				if(parseInt(JSON.parse(db_data.bet_history).flop.bet) > 0) {
					self.component_extraBetButtons.fold_check_btn.has_fold = true;
					self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.flop_area);
				}
				// checking if flop bet 0 and already on turn time /turn bet
				// case : when user doesnt fold flop & refreshes and doesnt go to roundprogress where insert in database cance = 1 happens
				if(!parseInt(JSON.parse(db_data.bet_history).flop.bet)){
					if(data.data.gameInfo.player && data.data.gameInfo.player.length == 2 && data.data.gameInfo.flop && data.data.gameInfo.flop.length) {
						self.component_extraBetButtons.fold_check_btn.has_fold = true;
						self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.flop_area,"fold");
						self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.flop_area);

						self.component_extraBetButtons.hideButtons();

						$.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'flop'},  (response) => {
						});
					}
				}

				if(parseInt(JSON.parse(db_data.bet_history).turn.bet) > 0) {
					self.component_extraBetButtons.fold_check_btn.has_check_turn = true;
					self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.turn_area);
				}

				if(parseInt(JSON.parse(db_data.bet_history).flop.bet) > 0 && !parseInt(JSON.parse(db_data.bet_history).turn.bet)){
					if(data.data.gameInfo.flop && data.data.gameInfo.flop.length ==  3 && data.data.gameInfo.turn) {

						self.component_extraBetButtons.fold_check_btn.has_check_turn = true;
						self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.turn_area,"check");
						self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.turn_area);
						self.component_extraBetButtons.hideButtons();
						$.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'turn'},  (response) => {
						});
					}
				}


				if(parseInt(JSON.parse(db_data.bet_history).river.bet) > 0) {
					self.component_extraBetButtons.fold_check_btn.has_check_river = true;
					self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.river_area);
				}

				if(parseInt(JSON.parse(db_data.bet_history).flop.bet) > 0 && !parseInt(JSON.parse(db_data.bet_history).river.bet)){
					if(data.data.gameInfo.flop && data.data.gameInfo.flop.length ==  3 && data.data.gameInfo.turn && data.data.gameInfo.river) {


						self.component_extraBetButtons.fold_check_btn.has_check_river = true;
						self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.river_area,"check");
						self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.river_area);

						self.component_extraBetButtons.hideButtons();

						$.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'river'},  (response) => {
						});
					}
				}


				/** if has cancel drop respective fold or check chip */
				if(JSON.parse(db_data.bet_history).flop.cancel && JSON.parse(db_data.bet_history).flop.bet <= 0) {
					self.component_extraBetButtons.fold_check_btn.has_fold = true;
					self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.flop_area,"fold");
					self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.flop_area);

					self.component_extraBetButtons.hideButtons();
				}

				if(JSON.parse(db_data.bet_history).turn.cancel && !self.component_extraBetButtons.fold_check_btn.has_fold) {
					self.component_extraBetButtons.fold_check_btn.has_check_turn = true;
					self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.turn_area,"check");
					self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.turn_area);

					self.component_extraBetButtons.hideButtons();
				}

				if(JSON.parse(db_data.bet_history).river.cancel && !self.component_extraBetButtons.fold_check_btn.has_fold) {
					self.component_extraBetButtons.fold_check_btn.has_check_river = true;
					self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.river_area,"check");
					self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.river_area);

					self.component_extraBetButtons.hideButtons();
				}

			} else {
			}
		}
		/**db data check if cancel**/

		//check
		// if (data.data.gameInfo.player && data.data.gameInfo.player.length == 2 || data.data.gameInfo.flop && data.data.gameInfo.flop.length) {
		//  if(self.component_betBoard.bet_areas[0].total_bet_amt > 0 && !self.component_tableDraw.flop_area.total_bet_amt) {
		//      self.component_extraBetButtons.fold_check_btn.has_fold = true;
		//      self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.flop_area,"fold");
		//      self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.flop_area);

		//      self.component_extraBetButtons.hideButtons();
		//  }
		//  // console.log(data, "bogoa oi", self.component_betBoard.bet_areas[0], self.component_tableDraw.flop_area, self.component_tableDraw.flop_area)
		// }

		// if (!self.component_extraBetButtons.fold_check_btn.has_fold) {
		//  if (data.data.gameInfo.flop && data.data.gameInfo.flop.length == 3 || data.data.gameInfo.turn && data.data.gameInfo.turn.length) {
		//      if(parseInt(self.component_betBoard.bet_areas[0].total_bet_amt) > 0 && !self.component_tableDraw.turn_area.total_bet_amt) {
		//          self.component_extraBetButtons.fold_check_btn.has_check_turn = true;
		//          self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.turn_area,"check");
		//          self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.turn_area);
		//      }
		//      // console.log("turn", self.component_betBoard.bet_areas[0], self.component_tableDraw.turn_area, self.component_tableDraw.turn_area)
		//  }

		//  if (data.data.gameInfo.river && data.data.gameInfo.river.length) {
		//      if(parseInt(self.component_betBoard.bet_areas[0].total_bet_amt) > 0 && !self.component_tableDraw.river_area.total_bet_amt) {
		//          self.component_extraBetButtons.fold_check_btn.has_check_river = true;
		//          self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.river_area,"check");
		//          self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.river_area);
		//      }
		//      // console.log("river", self.component_betBoard.bet_areas[0], self.component_tableDraw.river_area, self.component_tableDraw.river_area)
		//  }
		// }

		for(var key in data.data.gameInfo) {
			if (key == "burn") continue;
			if (key == "flop" && data.data.gameInfo[key].length) {
				card_data.community = data.data.gameInfo[key]
			}
			else if ((key == "turn" && data.data.gameInfo[key]) || (key == "river" && data.data.gameInfo[key])) {
				card_data.community.push(data.data.gameInfo[key])
			} else if (key =="player" || key == "dealer" && data.data.gameInfo[key].length) {
				card_data[key] = data.data.gameInfo[key]
			}
		}

		for(var key in card_data) {

			card_data[key] = card_data[key].map((e) => {
				return "C" + e;
			});
		}

		if(!_.isEmpty(data.data.gameInfo)) {
			self.toggleView("result");

			if(self.mobile) {
				self.component_card_result.drawCardGameInfo(card_data, 0.94,"new_cards",80,120);
			}else {
				self.component_card_result.drawCardGameInfo(card_data, 0.55,"new_cards",190,263);
			}
			setCardPositions();
			self.component_card_result.setCardResult(card_data)
		}


		if(self.mobile) {
			self.component_roadmap.drawRoad(formatter().fnFormatPokerRoadMap(marks,6,23));
		} else {
			self.component_roadmap.drawRoad(formatter().fnFormatPokerRoadMap(marks,6,7));
		}

		self.temp_user_money = self.context.user_money;

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

			  if (tableSlave === maintenanceData.type) {
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

	self.socket.on('connect', function (socket) {
	});

	let maxtimer = 15;
	let redirect_timer = maxtimer;
	$("#poker").on("click", function() {
		setVoid({gameName:'Poker', tableId:1})
	})
	self.socket.on("push", function(data) {
		setTimeout(() => {
			data_push = Xpacket.received(data);

			switch(data_push.eventName) {
				case "setbettingtime" :
					startBetting(data_push)
					break;

				case "setroundprogress" :
				case "setroundstatus" :
					self.component_timer.timer = 0
					setRoundProgress(data_push)
					break;

				case ("stoptimer"):
					stopTimer();
					break;

				case "inputitem" :
					swipeCard(data_push);
					break;

				case ("removeitem") :
					deleteCard(data_push);
					break;

				case "displayresults":
				case "displayresult":
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
					setResult(data_push);
					break;

				case ("newround"):
					newround(data_push);
					break;

				case ("dealerchange") :
					let dealerData = {"name" : data_push.dealerName, "image" : data_push.dealerImage}
					self.component_dealer.setDealer(dealerData);
					break;

				case ("lastrounds"):
					self.component_lastRounds.setRound(data_push.lastround, true);
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
          if (window.userAuthority != "admin") {
            if (parseInt(data_push.data.status) === 1 && tableSlave === data_push.data.slave) {
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
				case ("displayRollback"):
        			console.log('rollback: ', data_push.data)
					setVoid(data_push.data);
					break;
			}
		}, 1000)
	});
/** emulator start*/
	$("#newround").on("click", ()=> {
	 newround({roundNum:111});
	 startBetting({
	     bettingTime : 20,
	     type : 'startround',
	     totalTime : 20
	 })
	});

	$("#setbettingtime").on("click", ()=>{
		startBetting({
			bettingTime : 20,
			type : 'startround',
	     totalTime : 20
		})
	});
	$("#floptime").on("click", ()=>{
		startBetting({
			bettingTime : 6,
			type : 'flop',
	     totalTime : 6
		})
	});

$("#turntime").on("click", ()=>{
		startBetting({
			bettingTime : 6,
			type : 'turn',
	     totalTime : 6
		})
	});

$("#rivertime").on("click", ()=>{
		startBetting({
			bettingTime : 6,
			type : 'river',
	     totalTime : 6
		})
	});

	let dummy_cardgameinfo = {
		gameInfo : {
			player: [],
			dealer: [],
			flop: [],
			turn:null,
			river: null,
			burn: []
		}
	}

	$("#player1").on("click", ()=>{
		dummy_cardgameinfo.gameInfo.player = ['0002'];
		swipeCard(dummy_cardgameinfo)
	});

	$("#player2").on("click", ()=>{
		dummy_cardgameinfo.gameInfo.player = ['0002', '0021'];
		swipeCard(dummy_cardgameinfo)
	});

	$("#burn1").on("click", ()=>{

		dummy_cardgameinfo.gameInfo.burn = ['0000'];

		swipeCard(dummy_cardgameinfo)
	});

	$("#burn2").on("click", ()=>{

		dummy_cardgameinfo.gameInfo.burn = ['0000', '0022'];

		swipeCard(dummy_cardgameinfo)
	});

	$("#flop1").on("click", ()=>{

		dummy_cardgameinfo.gameInfo.flop = ['0033'];
		swipeCard(dummy_cardgameinfo)
	});

	$("#flop2").on("click", ()=>{
		dummy_cardgameinfo.gameInfo.flop = ['0033', '0030'];
		swipeCard(dummy_cardgameinfo)
	});

	$("#flop3").on("click", ()=>{
		dummy_cardgameinfo.gameInfo.flop = ['0033', '0030', '0031'];
		swipeCard(dummy_cardgameinfo)
	});
/** emulator end  */

	let setVoid = (data) => {
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
			self.component_roadmap.drawRoad(formatter().fnFormatPokerRoadMap(marks,6,7));
		}

	}

	let deleteCard = (data) => {

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

	}

	let displaymodify = (data) => {
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
			self.component_roadmap.drawRoad(formatter().fnFormatPokerRoadMap(marks,6,7));
		}

		// $.post('/get/winAll/' + window.tableNum, {round_id: data.data.roundId}, (response) => {
		// 	if (!parseInt(response.bet)) {
		// 		return;
		// 	} //end if
		// 	if (parseInt(response.total_win) > 0) {
		// 		let newMoney = parseInt(response.total_win) + self.context.user_money;
		// 		self.component_winAmount.total_win_text.text = self.component_winAmount.numberWithCommas(newMoney);
		// 		self.component_winAmount.animateAmtWin();
		// 		self.context.user_money = newMoney;
		// 		self.component_betDetails.reinit(true, "on win");
		// 	}
		// });
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
				self.component_winnings.isWin();   
				self.component_winnings.visible = true;
				self.component_betDetails.win_amount = parseInt(data.payload.credits.total_winning);   
				self.component_winAmount.total_win_text.text = self.component_winAmount.numberWithCommas(data.payload.credits.total_winning);   

				self.component_winAmount.animateAmtWin();   
				self.component_betDetails.reinit(true, "is win events");    
			}
		}
  }

	let newround = function (data) {
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

			self.component_betDetails.reinit(false, "on get user")

			self.component_menuPlayerInfo.balance.text = amount
			self.component_menuPlayerInfo.round.text = data.roundNum

			self.component_betDetails.bet_amount = 0;
			self.component_betDetails.reinit(false, "on get user");
		});

		self.initRound();

		self.component_dealer.setRound(data.roundNum);
		timer_start = false;
		card_data = {};

		self.component_gameButtons.repeat = false;
		// self.component_gameButtons.checkRepeatButton();

		self.component_extraBetButtons.fold_check_btn.visible = false;
		self.component_extraBetButtons.fold_check_btn.children[3].text = "FOLD";
		self.component_extraBetButtons.fold_check_btn.type = "flop"
		self.component_extraBetButtons.fold_check_btn.has_fold = false;
		self.component_extraBetButtons.fold_check_btn.has_check_turn = false;
		self.component_extraBetButtons.fold_check_btn.has_check_river = false;
	}

	let setResult = function (data) {
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
			self.component_extraBetButtons.animateChips(data.gameResult.winner);

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
			self.component_extraBetButtons.animateChips('fold');
		}

		self.component_betBoard.tableWinning(winArray);

		if(self.component_gameButtons.is_confirmed_bet) {
			self.component_playerInfo.setUserStat(self.player_data);
		}

		self.component_dealer_data.setData(self.component_dealer_data.dealer_data);

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
			self.component_roadmap.drawRoad(formatter().fnFormatPokerRoadMap(marks,6,7));
		}

		let winner = "";

		if(data.gameResult.winner.toLowerCase() == "dealer") {
			winner = window.language.game_specific.dealerwins
		} else if(data.gameResult.winner.toLowerCase() =="player") {
			winner =  window.language.game_specific.playerwins;
		} else if(data.gameResult.winner.toLowerCase() =="tie") {
			winner =  window.language.game_specific.tie;
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
	}

	let swipeCard = function (data) {

		if(!data.gameInfo.burn.length && !data.gameInfo.dealer.length && !data.gameInfo.player.length && !data.gameInfo.flop.length && !data.gameInfo.river && !data.gameInfo.turn) return;

		self.toggleView("result");

		card_data.player = data.gameInfo.player.map(function (e){ return 'C' + e; })

		if(data.gameInfo.flop.length && !data.gameInfo.turn && !data.gameInfo.river && (data.gameInfo.burn.length == 1)) {
			card_data.community = data.gameInfo.flop.map(function (e){ return 'C' + e; })
			if(self.component_betBoard.bet_areas[0].total_bet_amt && !self.component_tableDraw.flop_area.total_bet_amt) {
				if(!self.component_extraBetButtons.fold_check_btn.has_fold) {
					self.component_extraBetButtons.fold_check_btn.has_fold = true;
					self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.flop_area,"fold");
					self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.flop_area);

					self.component_extraBetButtons.hideButtons();

					$.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'flop'},  (response) => {
					});
				}
			}
		}

		if(data.gameInfo.turn && !data.gameInfo.dealer.length && (data.gameInfo.burn.length == 2)) {
			if (card_data.community.includes("C" + data.gameInfo.turn)) return;
			card_data.community.push("C" + data.gameInfo.turn);

			if(self.component_betBoard.bet_areas[0].total_bet_amt && self.component_tableDraw.flop_area.total_bet_amt && !self.component_tableDraw.turn_area.total_bet_amt) {
				if(!self.component_extraBetButtons.fold_check_btn.has_check_turn) {
					self.component_extraBetButtons.fold_check_btn.has_check_turn = true;
					self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.turn_area,"check");
					self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.turn_area);

					self.component_extraBetButtons.hideButtons();

					$.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'turn'},  (response) => {
					});
				}
			}
		}

		if(data.gameInfo.river && !data.gameInfo.dealer.length && (data.gameInfo.burn.length == 3)) {
			if (card_data.community.includes("C" + data.gameInfo.river)) return;
			card_data.community.push("C" + data.gameInfo.river);

			if(self.component_betBoard.bet_areas[0].total_bet_amt && self.component_tableDraw.flop_area.total_bet_amt && !self.component_tableDraw.river_area.total_bet_amt) {
				if(!self.component_extraBetButtons.fold_check_btn.has_check_river) {
					self.component_extraBetButtons.fold_check_btn.has_check_river = true;
					self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.river_area,"check");
					self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.river_area);

					self.component_extraBetButtons.hideButtons();

					$.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'river'},  (response) => {
					});
				}
			}
		}

		if(data.gameInfo.dealer.length) {
			card_data.dealer = data.gameInfo.dealer.map(function (e){ return 'C' + e; });
		}

		if(self.mobile) {
			self.component_card_result.drawCards(card_data, 0.94,"new_cards",80,120);
		} else {
			self.component_card_result.drawCards(card_data, 0.55,"new_cards",190,263);
		}
		self.component_card_result.setCardResult(card_data);

		setCardPositions();
	}

	let setRoundProgress = function(data) {
		timer_start = false;
		self.roundphase = currentTimeType;
		switch(currentTimeType) {
			case "flop":
				if(!self.component_extraBetButtons.fold_check_btn.has_fold) {
					$.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'flop'},  (response) => {
				});
				}
				break;

			case "turn":
				if(!self.component_extraBetButtons.fold_check_btn.has_check_turn && !self.component_extraBetButtons.fold_check_btn.has_fold) {
					$.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'turn'},  (response) => {
					});
				}
				break;

			case "river":
				if(!self.component_extraBetButtons.fold_check_btn.has_check_river && !self.component_extraBetButtons.fold_check_btn.has_fold) {
					$.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'river'},  (response) => {
				});
				}
				break;
		}

			// case ("setroundprogress"):
			//  self.component_timer.timer = 0
			//  break;

		// switch(currentTimeType) {
		//  case "startround":
		//          self.component_tableDraw.stopBetAreaAnimation(self.component_betBoard.bet_areas[0]);
		//          self.component_tableDraw.stopBetAreaAnimation(self.component_betBoard.bet_areas[1]);
		//          break;
		//      case "flop" :
		//          if(self.component_extraBetButtons.fold_check_btn.has_fold) return;
		//          if(self.component_betBoard.bet_areas[0].total_bet_amt) {

		//              self.component_extraBetButtons.hideButtons();
		//              if(!self.component_tableDraw.flop_area.total_bet_amt)  {
		//                  self.component_extraBetButtons.fold_check_btn.has_fold = true
		//                  self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.flop_area,"fold");
		//              }
		//          }
		//          self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.flop_area);
		//          break;
		//      case "turn" :
		//          if(self.component_extraBetButtons.fold_check_btn.has_fold) return;
		//          if(self.component_extraBetButtons.fold_check_btn.has_check_turn) return;
		//          if(self.component_betBoard.bet_areas[0].total_bet_amt) {
		//              if(!self.component_tableDraw.turn_area.total_bet_amt)  {
		//                  self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.turn_area,"check");
		//              }
		//          }
		//          self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.turn_area);
		//          break;
		//      case "river" :
		//          if(self.component_extraBetButtons.fold_check_btn.has_fold) return;
		//          if(self.component_extraBetButtons.fold_check_btn.has_check_river) return;
		//          if(self.component_betBoard.bet_areas[0].total_bet_amt) {
		//              if(!self.component_tableDraw.river_area.total_bet_amt)  {
		//                  self.component_extraBetButtons.setFoldCheck(self.component_tableDraw.river_area,"check");
		//              }
  //                }
		//          self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.river_area);
  //                self.toggleView("result");
		//          break;
		//  }
	}

	let currentTimeType = null

	let startBetting = function (data) {
		self.roundphase = data.type;
		betTime = data.bettingTime;
		if (!self.component_timer.timer) timer_start = false;

		if(data.type =="flop" || data.type =="turn" || data.type =="river") {
			self.component_timer.betting_start = false;
		}

		if (!timer_start) {
			playSound('bet-start');

			self.component_timer.startTime(parseInt(data.bettingTime), false, false, parseInt(data.totalTime));

			timer_start = true;

			currentTimeType = data.type;

			switch(data.type) {
				case "startround":
					self.component_tableDraw.startBetAreaAnimation(self.component_betBoard.bet_areas[0]);
					self.component_tableDraw.startBetAreaAnimation(self.component_betBoard.bet_areas[1]);
					if(type == 'b'){
						self.component_tableDraw.startBetAreaAnimation(self.component_betBoard.bet_areas[2]);
					}
					break;
				case "flop" :
					self.component_gameButtons.main_bet = false;
					self.component_timer.betting_start = false;

					if(self.component_betBoard.bet_areas[0].total_bet_amt) {
						if (self.component_extraBetButtons.fold_check_btn.has_fold && !has_db_bets) return;

						if(has_db_bets) { //checking if on refresh has DB bets
							let db_data = window.bets;

							if(parseInt(JSON.parse(db_data.bet_history).flop.bet) > 0 || parseInt(JSON.parse(db_data.bet_history).flop.cancel)) {
								self.component_extraBetButtons.fold_check_btn.has_fold = true;
								self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.flop_area);
							}
							// checking if flop has no bet and flop time started
							else if(!parseInt(JSON.parse(db_data.bet_history).flop.bet) && !parseInt(JSON.parse(db_data.bet_history).flop.cancel)) {
								self.component_extraBetButtons.flop_bet_button.visible = true;
								self.component_extraBetButtons.fold_check_btn.visible = true;
								self.component_extraBetButtons.fold_check_btn.children[3].text = "FOLD";
								self.component_extraBetButtons.fold_check_btn.type = "flop"
								self.component_tableDraw.startBetAreaAnimation(self.component_tableDraw.flop_area);
							}
							has_db_bets = false;
						} else {

							self.component_extraBetButtons.flop_bet_button.visible = true;
							self.component_extraBetButtons.fold_check_btn.visible = true;
							self.component_extraBetButtons.fold_check_btn.children[3].text = "FOLD";
							self.component_extraBetButtons.fold_check_btn.type = "flop"
							self.component_tableDraw.startBetAreaAnimation(self.component_tableDraw.flop_area);

						}
					}

					if(self.component_tableDraw.flop_area.total_bet_amt) {
						self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.flop_area);
						self.component_extraBetButtons.hideButtons();
					}

					break;
				case "turn" :
					self.component_gameButtons.main_bet = false;
					self.component_timer.betting_start = false;

					if(self.component_betBoard.bet_areas[0].total_bet_amt && self.component_tableDraw.flop_area.total_bet_amt) {
						if (self.component_extraBetButtons.fold_check_btn.has_check_turn && !has_db_bets) return;

						if(has_db_bets) { //checking if on refresh has DB bets
							let db_data = window.bets;

							if(parseInt(JSON.parse(db_data.bet_history).turn.bet) > 0 || parseInt(JSON.parse(db_data.bet_history).turn.cancel) ) {
								self.component_extraBetButtons.fold_check_btn.has_check_turn = true;
								self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.turn_area);
							}
							// checking if turn has no bet and turn time started
							else if(parseInt(JSON.parse(db_data.bet_history).flop.bet) && !parseInt(JSON.parse(db_data.bet_history).turn.cancel)  && !parseInt(JSON.parse(db_data.bet_history).turn.bet)) {
								self.component_extraBetButtons.flop_bet_button.visible = false;
								self.component_extraBetButtons.turn_bet_button.visible = true;
								self.component_extraBetButtons.fold_check_btn.visible = true;
								self.component_extraBetButtons.fold_check_btn.children[3].text = "CHECK";
								self.component_extraBetButtons.fold_check_btn.type = "turn"
								self.component_tableDraw.startBetAreaAnimation(self.component_tableDraw.turn_area);
							}

							has_db_bets = false;
						} else {
							self.component_extraBetButtons.flop_bet_button.visible = false;

							self.component_extraBetButtons.turn_bet_button.visible = true;
							self.component_extraBetButtons.fold_check_btn.visible = true;
							self.component_extraBetButtons.fold_check_btn.children[3].text = "CHECK";
							self.component_extraBetButtons.fold_check_btn.type = "turn"
							self.component_tableDraw.startBetAreaAnimation(self.component_tableDraw.turn_area);
						}

					}

					if(self.component_tableDraw.turn_area.total_bet_amt) {
						self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.turn_area);
						self.component_extraBetButtons.hideButtons();
					}

					break;
				case "river" :
					self.component_gameButtons.main_bet = false;
					self.component_timer.betting_start = false;

					if(self.component_betBoard.bet_areas[0].total_bet_amt  && self.component_tableDraw.flop_area.total_bet_amt) {

						if (self.component_extraBetButtons.fold_check_btn.has_check_river && !has_db_bets) return;

						if(has_db_bets) { //checking if on refresh has DB bets
							let db_data = window.bets;

							if(parseInt(JSON.parse(db_data.bet_history).river.bet) > 0 || parseInt(JSON.parse(db_data.bet_history).river.cancel)) {
								self.component_extraBetButtons.fold_check_btn.has_check_turn = true;
								self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.turn_area);
							}
							// checking if flop has no bet and flop time started
							else if(parseInt(JSON.parse(db_data.bet_history).flop.bet) && !parseInt(JSON.parse(db_data.bet_history).river.bet)  && !parseInt(JSON.parse(db_data.bet_history).river.cancel)) {
								self.component_extraBetButtons.turn_bet_button.visible = false;
								self.component_extraBetButtons.river_bet_button.visible = true;
								self.component_extraBetButtons.fold_check_btn.visible = true;
								self.component_extraBetButtons.fold_check_btn.children[3].text = "CHECK";
								self.component_extraBetButtons.fold_check_btn.type = "river"
								self.component_tableDraw.startBetAreaAnimation(self.component_tableDraw.river_area);
							}

							has_db_bets = false;
						} else {

							self.component_extraBetButtons.turn_bet_button.visible = false;

							self.component_extraBetButtons.river_bet_button.visible = true;
							self.component_extraBetButtons.fold_check_btn.visible = true;
							self.component_extraBetButtons.fold_check_btn.children[3].text = "CHECK";
							self.component_extraBetButtons.fold_check_btn.type = "river"
							self.component_tableDraw.startBetAreaAnimation(self.component_tableDraw.river_area);
						}

					}

					if(self.component_tableDraw.river_area.total_bet_amt) {
						self.component_tableDraw.stopBetAreaAnimation(self.component_tableDraw.river_area);
						self.component_extraBetButtons.hideButtons();
					}

					break;
			}

		}

	} // === end of startbetting


	let stopTimer = function () {
		self.component_timer.timer = 0;
		timer_start = false
	}


	// ****************************** end ********************************* //
	return;

}
