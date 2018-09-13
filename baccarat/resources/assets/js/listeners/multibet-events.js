import Xpacket from '../lib/XPacket';

export default (self) => {
	// var socket = io.connect(window.socket + 'all', {transports: ['websocket']});

	let timer_start = false;
	self.context.socketAll.on('connect',() => {
		self.context.socketAll.emit('register', {id: window.userId});
	});

	self.context.socketAll.on("data", (data)=>{
		setTimeout(() => {
	    let data_res = Xpacket.received(data)

      if(data_res.eventName != "displaymodify" && data_res.eventName != "displayRollback") {
        data_res.data = _.filter(data_res.data, (game)=>{
		        if((game.gameName == "Baccarat" ||
		        	game.gameName == "Dragon-Tiger" ||
		        	game.gameName == "Poker" ||
		        	game.gameName == "Sicbo")
		        	&& game.namespace != `Baccarat/${window.tableNum}`)
		        		return game;
        })
      } // end if

	        
	    switch(data_res.eventName) {
	    	case "reject":
          window.location = "/rejected"
	    		break;
	      case "init":
	      	initGames(data_res);
			    self.createGames(window.all_games);
	        break
	      case "dealerchange" :
	      	dealerChange(data_res);
	      	break;
	      case "displayresults":
	      case "displayresult":
	        displayResult(data_res)
					self.context.component_multibetRoadmap.update(data_res, self.games);
	       	break;
				case ("shoechange"):
					shoechange(data_res);
					break;
	      case "setbettingtime" :
					self.startBetting(data_res);
	       	break;
	      case "inputitem" :
	      	swipeCard(data_res);
	      	break;
	      case "removeitem" :
	      	deleteCard(data_res);
	      	break;
	      case "newround" :
	      	setNewRound(data_res);
	      	break;
	       case "updatecredits":
	       	console.log("UPDATE CREDITS", data_res);
	       	updateCredits(data_res)
	       	break;
	      case "setroundprogress" :
	      	setRoundProgess(data_res);
	      	break;
	      case "displaymodify" :
	       	displaymodify(data_res);
	       	break;
	      case "displayRollback" :
	       	setVoid(data_res);
	       	break;
	      case "maintenanceChange":
	      	self.maintenanceChange(data_res);
	      	break;
	    }
		}, 1000)
	});

	function byKey(key) {
		return function (o) {
			var v = parseInt(o[key], 10);
			return isNaN(v) ? o[key] : v;
		};
	}

	let dealerChange = (data) => {
		let game = `${data.gameName}${data.tableId}`;

		let getGame = null;

		if(_.find(self.games, (e) => { return `${e.data.gameName}${e.data.tableNumber}` === game})) {
			getGame = _.find(self.games, (e) => { return `${e.data.gameName}${e.data.tableNumber}` === game})
		}

		if(_.find(self.selected_games, (e) => { return `${e.data.gameName}${e.data.tableNumber}` === game })) {
			getGame = _.find(self.selected_games, (e) => { return `${e.data.gameName}${e.data.tableNumber}` === game})
		}

		if(!getGame) return;
		
    getGame.dealer_name.text = data.dealerName;
    
    $.post(`/getDealerImg`, {dealerId : data.dealerId}, (response) => {
      let dbImage = new Image();
      dbImage.src = response[0].dealer_image;
      getGame.dealer_img.image = dbImage;
    });

	} 

	let initGames = (data) => {
		if(self.all_games_container && self.all_games_container.children.length) {
  		return;
  	}

  	self.multibetGames = _.cloneDeep(data.data);

    if(window.userAuthority != "admin") {
      data.data = _.filter(data.data,(e) => {
      	var mtns = [];

      	if(e.maintenanceSetting.maintenance) {
      		mtns = _.map(e.maintenanceSetting.maintenance, (m) => {
      			if(_.find(m.info, (s) => { return parseInt(s.status) })) {
      				return _.find(m.info, (s) => { return parseInt(s.status) });
      			}
      		});

      		mtns = _.filter(mtns, (o) => { // filtering undefined
      			return o;
      		});

      		if(!mtns.length) {
      			return e.namespace != "Baccarat/"+ window.tableNum 
      		}

      	} else {
        	return e.namespace != "Baccarat/"+ window.tableNum && (!parseInt(e.maintenanceSetting[0].status) && !parseInt(e.maintenanceSetting[1].status))
      	}
			})
    } // end if

    for (var x=  0; x < data.data.length; x++) {
    	if(data.data[x].gameName == "Dragon-Tiger") {
      	data.data[x].marks = _.filter(data.data[x].marks, (e) => { 
      		if('mark' in e ) {
      			return e;
      		}
      	});
  			data.data[x].marks = _.filter(data.data[x].marks, (e) => { 
  				return e.mark !== undefined && e.mark !== "undefined"
  			});
  		}
  	} //end for

		window.all_games = _.sortBy(data.data, ['gameName', byKey('tableNumber')]);
		self.multibetGames = _.sortBy(self.multibetGames, ['gameName', byKey('tableNumber')]);
		
		for (var x = 0; x < data.data.length; x++) {
			if(data.data[x].gameName == "Dragon-Tiger") {
				data.data[x].marks = _.filter(data.data[x].marks, (e) => {
					if(e.mark) {
						return e;
					}
				})
			}
		} // end for
	} // end init

	let setVoid = (data) => {
  	let game;
  	var flag = false;
  	if(_.find(self.games, (e) => { return `${e.data.gameName}${e.data.tableNumber}` === `${data.gameName}${data.tableId}`})) {
  		game = _.find(self.games, (e) => { return `${e.data.gameName}${e.data.tableNumber}` === `${data.gameName}${data.tableId}`});
  		flag = true;
  	}

  	if(_.find(self.selected_games, (e) => { return `${e.data.gameName}${e.data.tableNumber}` === `${data.gameName}${data.tableId}` })) {
  		game = _.find(self.selected_games, (e) => { return `${e.data.gameName}${e.data.tableNumber}` === `${data.gameName}${data.tableId}`});
  	}

  	if(!game) return;
  	
    switch(data.gameName) {
      case "Sicbo":
        if(typeof game.data.marks[game.data.marks.length-1].game_info === 'string') {
          game.data.marks[game.data.marks.length-1].game_info = JSON.parse(game.data.marks[game.data.marks.length-1].game_info);
        }

        game.data.marks[game.data.marks.length-1].game_info.isVoid = true;
        game.data.marks[game.data.marks.length-1].isVoid = true;

        self.setVoid(data.gameName, game)

				self.context.component_multibetRoadmap.update(game.data, flag ? self.games : self.selected_games);//mini road map
        break;
      case "Poker":
        game.data.meta = data.meta;

        game.data.meta.forEach((info) => {
        	if(typeof info.gameInfo === 'string') {
         		info.gameInfo = JSON.parse(info.gameInfo);
        	}

        	if(info.gameInfo.isVoid) {
        		info.isVoid = true
        	}
        });

        game.data.marks.pop();

        self.setVoid(data.gameName, game)

				self.context.component_multibetRoadmap.update(game.data, flag ? self.games : self.selected_games);//mini road map
        break;
      case "Baccarat":
        game.data.marks.pop();
        self.setVoid(data.gameName, game)
				self.context.component_multibetRoadmap.update(game.data, flag ? self.games : self.selected_games);//mini road map
      	break;
      case "Dragon-Tiger":
        game.data.marks.pop();
        self.setVoid(data.gameName, game)
				self.context.component_multibetRoadmap.update(game.data, flag ? self.games : self.selected_games);//mini road map
      	break;
    }
  }

	let displaymodify = (data) => {

		if(data.gameName == "Baccarat") {
			data.marks = data.mark;
		} else if( data.gameName == "Dragon-Tiger") {
			data.marks =  data.data.mark
		}

		if(data.gameName == "Poker") {

			for(var x = 0; x < data.meta.length; x++) {
				if(typeof(data.meta[x].gameInfo) == "string") {
					data.meta[x].gameInfo = JSON.parse(data.meta[x].gameInfo);
				}
				if(typeof(data.meta[x].gameResult) == "string") {
					data.meta[x].gameResult = JSON.parse(data.meta[x].gameResult);
				}
			}

		}

		for(var x = 0; x  < window.all_games.length; x++ ) {
			if((window.all_games[x].gameName + window.all_games[x].tableNumber) == (data.gameName+data.tableId)) {
				if(data.gameName == "Sicbo" || data.gameName == "Poker") {
					self.marks[x].splice(self.marks[x].length-1, 1);
					self.marks[x].push(data.data.mark)
					self.games[x].marks =self.marks[x];
				} else {
					self.marks[x] = data.data.mark
					self.games[x].marks =self.marks[x];
				}
				self.updateInfo(window.all_games, data);
			}
		}


		self.context.component_multibetRoadmap.update(data, window.all_games);

		self.updateEyeData(data);
	}

  let shoechange = (data) => {
  	for(var x = 0; x  < window.all_games.length; x++ ) {
			if((window.all_games[x].gameName + window.all_games[x].tableNumber) == (data.gameName+data.tableId)) {
				self.marks[x] = []
				window.all_games[x].marks = [];
			}
		}

		for(var x = 0; x  < self.selected_games.length; x++ ) {
			if((self.selected_games[x].data.gameName + self.selected_games[x].data.tableNumber) == (data.gameName+data.tableId)) {
				self.toggleResultVeiw(self.selected_games[x], false);
			}
		}
		self.shoechange(self.games, data)
		self.shoechange(self.selected_games, data)
  } //end shoechange

  let setRoundProgess = function (data) {
  }

	let setNewRound = function (data) {
		for(var x = 0; x  < self.selected_games.length; x++ ) {
			if(`${self.selected_games[x].data.gameName}${self.selected_games[x].data.tableNumber}` === `${data.gameName}${data.tableId}`) {
			// if((self.selected_games[x].game) == (data.tableId + "_" +data.gameName)) {
				self.context.component_multibetBetting.newRound(self.selected_games[x]);
				// self.selected_games[x].game_description.text = data.gameName
				self.selected_games[x].currentRound = data.roundNum
				self.selected_games[x].game_round.text = data.roundNum
				self.selected_games[x].player_win_val.text = "0"
				self.selected_games[x].total_game_bet.text = "0"
				self.initround(self.selected_games[x]);
			} // end if
		} // end for

		for(var x = 0; x  < self.games.length; x++ ) {
			if(`${self.games[x].data.gameName}${self.games[x].data.tableNumber}` === `${data.gameName}${data.tableId}`) {
				self.games[x].betting_start = true;
				
				if(self.games[x].data.gameName == "Poker") {
					self.games[x].game_description.text = window.language.gamename.poker_game;
				}

				if(self.games[x].data.gameName == "Baccarat") {
					self.games[x].game_description.text = window.language.gamename.baccarat_game;
				}

				if(self.games[x].data.gameName == "Dragon-Tiger") {
					self.games[x].game_description.text = window.language.gamename.dragontiger_game;
				}

				if(self.games[x].data.gameName == "Sicbo") {
					self.games[x].game_description.text = window.language.gamename.sicbo_game;
				}
				self.games[x].currentRound = data.roundNum
				self.games[x].game_round.text = data.roundNum
				self.games[x].betting_start = true;

				self.initround(self.games[x]);
			} // end if
		} // end for

	} // end set new round

	let swipeCard = function (data) {
		self.setCardResult(data);
	} // end swipecard

	let deleteCard = function (data) {
		self.deleteCard(data);
	} // end swipecard

	let result_countdown = 4;

	let mock_handType = ["Four of a Kind","Three of a Kind", "Pair", "High Card", "Two Pair", "Flush", "Straight Flush", "Full House", "Royal Flush"]

	let displayResult = function (data) {

		let resultGame = null;
		for(var x = 0; x < all_games.length; x++) {
			if(`${all_games[x].tableNumber}${all_games[x].gameName}` == `${data.tableId}${data.gameName}`) {
				
				if(all_games[x].gameName == 'Sicbo') {
					all_games[x].marks.shift();
				}
				
				all_games[x].marks.push(data.mark);
					
				for(var i = 0; i < self.games.length; i++) {
					if(`${all_games[x].tableNumber}${all_games[x].gameName}` == `${self.games[i].data.tableNumber}${self.games[i].data.gameName}`) {
						self.games[i].data.marks = all_games[x].marks;
						self.updateInfo(self.games[i].data, data);
					} // end if
				} // end for

				// == selected games
				for(var i = 0; i < self.selected_games.length; i++) {
					if(`${all_games[x].tableNumber}${all_games[x].gameName}` == `${self.selected_games[i].data.tableNumber}${self.selected_games[i].data.gameName}`) {
						self.selected_games[i].data.marks = all_games[x].marks;
						self.updateInfo(self.selected_games[i].data, data);
					} // end if
				} // end for

			}
		}

		self.updateEyeData(data);
		// ** setting game reuult arrray **//
		let winres = [];
		
		winres.push(data.gameResult.winner);

		switch (data.gameName) {
			case "Baccarat" :
				// == bonus
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
		    if(data.gameResult.bonus && data.gameResult.winner != "tie" && (odds[data.gameResult.bonus.type] || odds[data.gameResult.bonus.diff])) {
		      if(data.gameResult.winner == 'banker') {
		        winres.push('bonus_banker');
		      }
		      else if(data.gameResult.winner == 'player')
		      {
		        winres.push('bonus_player');
		      }
		    }

		    //dragonbonus natural tie
		    if(data.gameResult.bonus && data.gameResult.bonus.type == 'natural_tie') {
		      winres = [...winres, 'bonus_player', 'bonus_banker'];
		    }

			 	if(data.gameResult.supersix) { //supersix win bolean
		      winres.push("supersix");
		    }
				if(data.gameResult.pairs.length) {
					data.gameResult.pairs.forEach((p) => {
						winres.push(p+"pair");
					});
				}
				winres.push(data.gameResult.size);
				break;
			case "Sicbo" :
				winres = winres.concat(data.gameResult.side_win)
				break;
			case "Dragon-Tiger" :
				// === copied winning specifics from dragontiger source
				if(data.gameResult.side_bets["dragon"] == "seven" && data.gameResult.side_bets["tiger"] == "seven") {
          winres.push('tie');
        }
        else if(data.gameResult.side_bets["dragon"] == "seven"){
          let tiger_pair = !data.gameResult.side_bets["tiger"].parity ? "" : "tiger" + "_" + data.gameResult.side_bets["tiger"].parity;
          let tiger_size = !data.gameResult.side_bets["tiger"].size ? "" : "tiger" + "_" + data.gameResult.side_bets["tiger"].size;
          let tiger_suite = !data.gameResult.side_bets["tiger"].suite ? "" : "tiger" + "_" + data.gameResult.side_bets["tiger"].suite + "s";
          winres.push(tiger_pair, tiger_size, tiger_suite, data.gameResult.winner);
        }
        else if(data.gameResult.side_bets["tiger"] == "seven"){
          let dragon_pair = !data.gameResult.side_bets["dragon"].parity ? "" : "dragon" + "_" + data.gameResult.side_bets["dragon"].parity;
          let dragon_size = !data.gameResult.side_bets["dragon"].size ? "" : "dragon" + "_" + data.gameResult.side_bets["dragon"].size;
          let dragon_suite = !data.gameResult.side_bets["dragon"].suite ? "" : "dragon" + "_" + data.gameResult.side_bets["dragon"].suite + "s";
          winres.push(dragon_pair, dragon_size, dragon_suite, data.gameResult.winner);
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
            winres.push('tie');
          }

          winres.push(dragon_pair, dragon_size, dragon_suite, tiger_pair, tiger_size, tiger_suite, data.gameResult.winner);
        }

				break;
		}

		// ** getting winning bet areas from game result array **//
		let winning = [];

		// let bc_is_tie = _.find(winres, (data) => { return data == "tie"}) ? true : false;

		for(var x = 0; x  < self.selected_games.length; x++ ) {
			if((self.selected_games[x].game) == (data.tableId + "_" +data.gameName) ) { // && self.selected_games[x].game.indexOf("icbo")  == -1) {
				
				switch (data.gameName) {
					case "Baccarat" :
						
						let bcWin = "";

						if(data.gameResult.winner === 'tie') {
							bcWin = window.language.game_specific.tie;
						} else if(data.gameResult.winner === 'banker') {
							bcWin = window.language.game_specific.bankerwins;
						} else {
							bcWin = window.language.game_specific.playerwins;
						}

						self.selected_games[x].game_description.text = bcWin.toUpperCase();

						self.winLoseState(self.selected_games[x], data.gameResult.winner, false);
						break;
					case "Dragon-Tiger" :
						let dtWin = "";
						if(data.gameResult.winner.toLowerCase() === 'dragon') {
							dtWin =  window.language.multibet_dragontiger.dragonwins;
						} else if(data.gameResult.winner.toLowerCase() === 'tiger'){
							dtWin =  window.language.multibet_dragontiger.tigerwins;
						} else if(data.gameResult.winner.toLowerCase() === 'tie') {
							dtWin =  window.language.multibet_dragontiger.tie;
						} else if(data.gameResult.winner.toLowerCase() === 'suited_tie') {
							dtWin =  window.language.multibet_dragontiger.suitedtie;
						}

						self.selected_games[x].game_description.text = dtWin.toUpperCase();
						self.winLoseState(self.selected_games[x], data.gameResult.winner, false);
						break;
					case "Poker" :
					 	let pokerwin = data.gameResult.winner;

						if(data.gameResult.winner == 'player') {
						 pokerwin =  window.language.multibet_poker.playerwins;
						} else if(data.gameResult.winner == 'dealer') {
						 pokerwin =  window.language.multibet_poker.dealerwins;
						} else if(data.gameResult.winner == 'tie') {
						 pokerwin =  window.language.multibet_poker.tie;
						}

						self.selected_games[x].game_description.text = pokerwin;
						self.winLoseState(self.selected_games[x], data.gameResult.winner, false);
						break;
					case "Sicbo" :
						let dice = data.gameResult.winner.split("");
						
						dice = _.map(dice, (e) => {
							return parseInt(e);
						});

						let total = _.sum(dice);

						let uniqDice = _.uniq(dice);

						let win = "";
						if(uniqDice == 1) {
							win = "triple"
						} else {
							win = total <= 10 ? "small" : "big"								
						}

						let sicboWin = "";

						if(win === 'small') {
							sicboWin = `${window.language.multibet_sicbo.smallcaps} - ${dice[0]} ${dice[1]} ${dice[2]}` ;
						} else if(win === 'big') {
							sicboWin = `${window.language.multibet_sicbo.bigcaps} - ${dice[0]} ${dice[1]} ${dice[2]}`;
						} else {
							sicboWin = `${window.language.multibet_sicbo.tie} - ${dice[0]} ${dice[1]} ${dice[2]}`;
						}

						self.selected_games[x].game_description.text = sicboWin.toUpperCase();
						self.winLoseState(self.selected_games[x], data.gameResult.winner, false);
						break;
				}
			} // end if

			let winArray = [];
	
			if(data.gameName == "Poker") {
				
				if (data.gameResult.winner == 'player') {
					winArray.push({'area' : 'ante', 'hand' : data.gameResult.handtype});
				}

				if (parseInt(data.gameResult.bonusAmount) > 0) {
					winArray.push({'area' : 'bonus', 'multiplier' : data.gameResult.bonusAmount});
				}

				if (data.gameResult.winner == 'tie') {
					winArray.push({'area' : 'tie'});
				}
			}


			if((self.selected_games[x].game) == (data.tableId + "_" +data.gameName)) {

				/** setting win prop to false**/
				for(var a = 0; a < self.selected_games[x].betarea.length; a++) {
					self.selected_games[x].betarea[a].chips = _.map(self.selected_games[x].betarea[a].chips, (c) => {
						c.is_win = false;
						return c;
					});
				}
				
				self.selected_games[x].betarea.forEach((e) => {

					if(_.includes(winres, e.table)) winning.push(e);
					
					if(_.find(winres, (data) => { return data == "tie"})) {
						if(self.selected_games[x].data.gameName == "Baccarat") {
							if(e.table == "banker") {
								if(e.chips.length) {
									e.total_bet_amt = (e.total_bet_amt)/2;
								}
								winning.push(e)
							}

							if(e.table == "player") {
								if(e.chips.length) {
									e.total_bet_amt = (e.total_bet_amt)/2;
								}
								winning.push(e)
							}
						}

						if(self.selected_games[x].data.gameName == "Dragon-Tiger") {
							if(e.table == "dragon") {
								if(e.chips.length) {
									e.total_bet_amt = (e.total_bet_amt)/2;
								}
								winning.push(e)
							}

							if(e.table == "tiger") {
								if(e.chips.length) {
									e.total_bet_amt = (e.total_bet_amt)/2;
								}
								winning.push(e)
							}
						}
					}
				});
			
			} // end if
		}

		let isSupersixWin = false;

		if(_.find(winning, (data) => { return data.table == "supersix"})) isSupersixWin = true;

		for(var a = 0; a < winning.length; a++) {
			// table blink blink
			if(data.gameName == "Sicbo") {
				self.tableWinning(winning[a], true)
			} else {
				self.tableWinning(winning[a], false)
			}
			
		} //end winning loop
		
	} // end displayresult

	let getWinningAreas = (data) => {
		let winning = [];
		let area = [];

		for(var x = 0; x < self.selected_games.length; x++) {
  		if(`${self.selected_games[x].data.gameName}${self.selected_games[x].data.tableNumber}` === `${data.gameName}${data.tableId}`) {
  			if(self.selected_games[x].data.gameName !== 'Poker') {
	  			winning = _.filter(self.selected_games[x].betarea, (item) => {
						return _.find(data.payload.credits.bets, (row) => row.win_money > 0 && row.bet === item.table)
					});
  			} else {
  				winning = _.filter(self.selected_games[x].betarea, (item) => {
						return _.find(data.payload.credits.bets, (row, key) => key === item.table && row.win > 0)
  				});

  				// flop
  				if(data.payload.credits.bets.flop.win > 0) {
  					winning.push(self.selected_games[x].flop_area)
  				}
  				// turn
  				if(data.payload.credits.bets.turn.win > 0) {
  					winning.push(self.selected_games[x].turn_area)
  				}

  				// river
  				if(data.payload.credits.bets.river.win > 0) {
  					winning.push(self.selected_games[x].river_area)
  				}
  			} // end else

  			area = self.selected_games[x].betarea;
  		}
  	} // end for
  	if(!winning.length) {
			return {area: area, is_win:false};
  	}
  	return {area: winning, is_win:true};
	} // end get winning areas 

  let updateCredits = (data) => {

    /* web winning anim starts here */
  	//add chip settings
  	let options = {
  		font1 : 'normal 20px BebasNeue',
  		font2 : 'normal 15px BebasNeue',
  		radius : 18,
  		maskScale : 0.6,
  		textScale : 0.6,
  		chipScale : 0.8 
  	}

  	if(parseInt(window.multiplayer)) {
  		options.chipScale = 0.7;
  		options.maskScale = 0.7;
  		options.textScale = 0.7;
  	}

		let bets = data.payload.credits.bets;
		let _toUseAreas = _.filter(self.context.component_betBoard.bet_areas, function (area) {
			if(parseInt(window.multiplayer)) {
				return area.multiplayer
			}
			return area.singleplayer
		});

    if(parseInt(data.tableId) === parseInt(window.tableNum) && data.gameName == 'Baccarat') {
			//winning animation here
      ((bets, _toUseAreas) => {
        setTimeout(() => {
					for(var  i = 0; i < bets.length; i++) {
						for(var x = 0; x < _toUseAreas.length; x++) {
							if(bets[i].bet === _toUseAreas[x].table_name) {
								let win_money = bets[i].win_money - _toUseAreas[x].total_bet_amt;
								if(win_money > 0) {
				          self.context.component_winChips.createWinningChips(_toUseAreas[x], win_money, options);
				          self.context.component_winChips.animateWinLose(_toUseAreas[x], 'win');
								} else if(win_money == 0) {
				          self.context.component_winChips.animateWinLose(_toUseAreas[x], 'win');
								} else {
				          self.context.component_winChips.animateWinLose(_toUseAreas[x], 'lose');
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
				if(window.casino == "N") {
					self.context.context.user_money = parseInt(data.payload.credits.money);
				} else {
					self.context.context.user_money = parseFloat(data.payload.credits.money).toFixed(2);
				}
				self.context.component_betDetails.reinit(true);
  		}
  	} else { 
  		// if seamless get money frm api
  		$.post('/get/user', (response) => {
  			response = typeof response === 'string' ? JSON.parse(response) : response; 
  			if(response.money) {
					if(window.casino == "N") {
						self.context.context.user_money = parseInt(response.money);
					} else {
						self.context.context.user_money = parseFloat(response.money).toFixed(2);
					}
					self.context.component_betDetails.reinit(true);
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
         self.context.component_winAmount.animatePopup(`${gameText} #${data.tableId}`, parseInt(data.payload.credits.total_winning));
      }
    } else {
      if (parseInt(data.payload.credits.total_winning) > 0) {

        let typeSlave = window.slave === 'supersix' ? 's' : window.slave === 'bonus' ? 'b' : 'r';
        
        if(data.payload.credits.type == 'f') {
        	data.payload.credits.type = 'r';
        }

        if(typeSlave == data.payload.credits.type) {
		    	let diff = parseFloat(data.payload.credits.total_winning) - parseFloat(self.context.component_betDetails.bet_amount);
		    	if(diff > 0) {
						setTimeout(() => {
							self.context.component_winnings.isWin();
						}, 2000)
		    	}
          self.context.component_winAmount.animateAmtWin();
          self.context.component_betDetails.win_amount = data.payload.credits.total_winning;
          self.context.component_winAmount.total_win_text.text = self.context.component_winAmount.numberWithCommas(data.payload.credits.total_winning);
          self.context.component_betDetails.reinit(true);
        }
      } //end if
    }

    // animation for winning areas + chips starts here
  	if(!getWinningAreas(data).area.length) return; // stop here if no area wins
		
  	let winMoney = data.payload.credits.totalWinning ? data.payload.credits.totalWinning : data.payload.credits.total_winning;
  	
  	if(window.casino == 'N') {
			winMoney = parseInt(winMoney)
		} else {
			winMoney = parseFloat(winMoney).toFixed(2)
		}

  	// === win money
  	if(winMoney > 0) {

	  	((data, winMoney) => {
	  		setTimeout(() =>{
			  	getWinningAreas(data).area[0].parent.parent.totalWinning = winMoney;
					self.playerWinLose(true, getWinningAreas(data).area[0].parent.parent, winMoney)
	  		},1500)
	  	})(data, winMoney);
  	
		}

  	let winningAreas = getWinningAreas(data);

  	if(data.gameName !== 'Poker') {

			// self.winDefaultSet(_.find(self.selected_games, (a) => { return a.data.gameName === data.gameName}) );
			let parentArea = winningAreas.area[0].parent.parent;

	  	for(var x = 0; x < winningAreas.area.length; x++) {
				// == set winning chips true
				if(winningAreas.is_win) {
					(function(area) {
						setTimeout (() => {
							area.chips = area.chips.map((chip) => {
								chip.is_win = true;
								return chip;
							});
						}, 2000)
					})(winningAreas.area[x]) 
				}

	  		for(var  i = 0; i < data.payload.credits.bets.length; i++) {
	  			if(data.payload.credits.bets[i].bet !== winningAreas.area[x].table) continue;
	  			let winMoney = data.payload.credits.bets[i].win_money;
	  			
	  			if(window.casino == 'N') {
	  				winMoney = parseInt(winMoney)
	  			} else {
	  				winMoney = parseFloat(winMoney).toFixed(2)
	  			}

	  			let betMoney = data.payload.credits.bets[i].bet_money;
	  			if(winMoney > 0) {
						self.context.component_multibetBetting.addChip({target:winningAreas.area[x]}, {chip_amt: winMoney}, true); //== adding win chips, 3rd param if win
						winningAreas.area[x].is_win = true;
	  			} // end if
	  		}
	  	}
  	} else {
			// *** poker special case **//
			self.pokerWinDefaultSet(_.find(self.selected_games, (a) => { return a.data.gameName === 'Poker'}) );

  		// === poker bets not array
  		for(var x = 0; x < winningAreas.area.length; x++) {
				// == set winning chips true
				
				if(winningAreas.is_win) {
					(function(area) {
						setTimeout (() => {
							area.chips = area.chips.map((chip) => {
								chip.is_win = true;
								return chip;
							});
						}, 2000)
					})(winningAreas.area[x]) 
				}

	  		for(var  key in data.payload.credits.bets) {
	  			if(key !== winningAreas.area[x].table) continue;
	  			let winMoney = data.payload.credits.bets[key].win;
	  			if(window.casino == 'N') {
	  				winMoney = parseInt(winMoney)
	  			} else {
	  				winMoney = parseFloat(winMoney).toFixed(2)
	  			}
					self.context.component_multibetBetting.addChip({target:winningAreas.area[x]}, {chip_amt: winMoney}, true); //== adding win chips, 3rd param if win
					winningAreas.area[x].is_win = true;
	  		}
	  	}
  	}

  	((winningAreas, winMoney) => {
  		setTimeout(() => {
  			self.setWinLoseAnimation(winningAreas.area[0].parent.parent) // chips animation

  			if(winningAreas.area[0].parent.parent.data.gameName == "Poker") {
  				if(winningAreas.area[0].parent.parent.fold_check_container.children.length) {
  					
  					winningAreas.area[0].parent.parent.fold_check_container.children.forEach((foldCheck) => {
  						createjs.Tween.get(foldCheck)
  						.wait(3200)
  						.to({
  							alpha : 0
  						}, 400)
  					});

  				}
  			}
  			
  		}, 2000)
  	})(winningAreas, winMoney);

  } //end update credits
}
