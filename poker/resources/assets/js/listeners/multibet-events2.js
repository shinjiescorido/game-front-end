import {numberWithCommas } from '../factories/factories';
import Xpacket from '../lib/XPacket';

export default (self) => {

	let evt = {
		init : function (games) {
			if(self.isInit) return;

			games.forEach((e) => {
				e.isNewRound = false;
			});

    	window.all_games = _.sortBy(games, function (e) {
    		let table = e.tableNumber.length > 1 ? e.tableNumber : `0${e.tableNumber}`;

    		return `${e.gameName}/${table}`//e.namespace
    	});
    	window.all_games = _.filter(window.all_games, function (e) {
    		return e.namespace != `${window.game}/${window.tableNum}`
    	});

    	//filter paigow
    	if(window.userAuthority != "admin") {
    		// window.all_games = _.filter(window.all_games, function (e) {
    		// 	return e.gameName !== 'Pai-Gow';
    		// })
    	}

    	if(window.userAuthority === "admin") {
 	   		for(var x = 0; x < window.all_games.length; x++) {
 	   			let game = window.all_games[x];
 	   			if(game.namespace.indexOf('Baccarat') > -1|| game.namespace.indexOf('Poker') > -1) {
 	   				for(var  i = 0; i < game.maintenanceSetting.maintenance.length; i++) {
 	   					let maintenance = game.maintenanceSetting.maintenance[i];
 	   					maintenance.info[0].status = 0;
 	   					maintenance.info[1].status = 0;
 	   				}
 	   			} else {
		   				let maintenance = game.maintenanceSetting;
		   				maintenance[0].status = 0;
		   				maintenance[1].status = 0;
 	   			}
 	   		}
    	}

    	games = window.all_games;

    	//check maintenance games to store
    	for(var x = 0; x < games.length;x++) {
    		let maintenanceCheck = {};

    		if(games[x].gameName.indexOf('Baccarat') > -1 || games[x].gameName.indexOf('Poker') > -1) {
    			maintenanceCheck = _.find(games[x].maintenanceSetting.maintenance, function (e) {
						return _.find(e.info, function (a) {return a.status === 1})
					})
    		} else {
		    	maintenanceCheck = _.find(games[x].maintenanceSetting, function(e) {
	    			return e.status === 1
	    		});
    		}
    		if(!_.isEmpty(maintenanceCheck)) {
	    		self.maintenanceGames.push(games[x]);
    		}
    	}

    	//check disabled tables if junket
    	if(window.junket && _.isEmpty(window.vendorData)) {
    		let junket = !_.isEmpty(window.vendorTable) ? typeof window.vendorTable === 'string' ? JSON.parse(window.vendorTable) : window.vendorTable : '';

    		console.log("::::disabled", junket)
    		if(junket && (junket.disable_table.length || junket.created_room.length)) {
    			junket.disable_table = _.map(junket.disable_table, function (e) {
						if(e.toLowerCase().indexOf('dragon') > -1 || e.toLowerCase().indexOf('pai') > -1) {
							var stringSplit = e.split('-');
							return `${stringSplit[0]}-${stringSplit[1]}/${stringSplit[2]}`
						}
						return e.replace('-','/')
					});

    			junket.created_room = _.map(junket.created_room, function (e) {
						if(e.toLowerCase().indexOf('dragon-') > -1 || e.toLowerCase().indexOf('pai-') > -1) {
							var stringSplit = e.split('-');
							return `${stringSplit[0]}-${stringSplit[1]}/${stringSplit[2]}`
						} else if(e.toLowerCase().indexOf('dragontiger') > -1 || e.toLowerCase().indexOf('paigow') > -1) {
							let split = e.replace('-','/').split('/');
							let table = split[1];
							return split[0] == 'dragontiger' ? `dragon-tiger/${table}` : `pai-gow/${table}`
						}
						return e.replace('-','/');
					});

	    		for(var x = 0; x < games.length; x++) {
	    			let game = _.find(junket.disable_table, function (e) {return e.toLowerCase() === games[x].namespace.toLowerCase()})
	    			if(game) {
	    				self.disabledGames.push(games[x]);
	    			}

	    			let roomgame = _.find(junket.created_room, function (e) {return e.toLowerCase() === games[x].namespace.toLowerCase()})
	    			if(roomgame) {
	    				self.roomGames.push(games[x]);
	    			}

	    		}
    		}

    		console.log("////is there disabled tables", self.disabledGames, "///// maintenance tables", self.maintenanceGames, "::::/// room games", self.roomGames)
    	}

    	//sorting
    	let sorted = [];
    	let temp = _.filter(games, function(e) {return _.find(window.gameInfo.multibet, (a) => {return a.game === e.namespace})});

    	if(!temp.length) { // if multibet game info null
    		temp = _.cloneDeep(all_games).splice(0,4);
    		window.gameInfo.multibet = [];
    		temp.forEach((e) => {
    			window.gameInfo.multibet.push({
    				game : e.namespace,
    				range : `${e.casinoBetRanges[0].min}-${e.casinoBetRanges[0].max}`
    			})
    		})
    	}

    	for(var x = 0; x < window.gameInfo.multibet.length; x++) {
    		let index = _.findIndex(temp, function (e) {
    			return e.namespace === window.gameInfo.multibet[x].game
    		});
    		sorted[x] = temp[index];
    	}

    	sorted = _.filter(sorted, function(e) { return e });

    	if(sorted.length<4) {
    		let g = null;
    		g = _.filter(games, function (e) { return e.gameName.indexOf('Pai') <= -1 && !_.find(sorted,function(a){return a == e})})[0];
    		sorted.push(g);
    	}

    	//if sorted has maintenance
    	let tempselected = [];
    	for(var x = 0; x < sorted.length;x++) {
	    	let game = _.find(self.maintenanceGames, function(e) { return e.namespace === sorted[x].namespace})
	    	///additional on disabled game
	    	let disgame = _.find(self.disabledGames, function(e) { return e.namespace === sorted[x].namespace});
	    	let roomGames = _.find(self.roomGames, function(e) { return e.namespace === sorted[x].namespace})
	    	if(!_.isEmpty(game) || !_.isEmpty(disgame) || !_.isEmpty(roomGames)) {
	    		
	    		let g = _.difference(all_games, self.maintenanceGames);
	    		//additional if filtered not maintenance tables is in disabled
	    		g = _.difference(g, self.disabledGames);
	    		g = _.difference(g, self.roomGames);

	    		if(g.length) {
	    			tempselected = _.filter(g, function (a) {
	    				return !_.find(sorted, function (e){return e && e.namespace === a.namespace})
	    			});
	    			if(tempselected.length) {
		    			sorted[x] = tempselected[0];
		    			x--;
	    			} else {
		    			sorted[x] = null;
	    			}
	    		} else {
	    			sorted = [];
	    			x = 0;
	    		}
	    	}
    	}

    	self.selectedGames = _.filter(sorted, function (e){return e});

    	for(var x = 0; x < self.selectedGames.length; x++) {
				self.createGames(self.selectedGames[x],x );
    	}

			this.fnRenderToSelect();
			this.fnRenderRange();
			self.isInit = true;
		},
		dealerchange : function(data) {
			self.dealerchange(data);
		},
		shoechange : function(data) {
			if(this.fnFilterData(data)) return;

			for(var x = 0; x < all_games.length; x++) {
				if(`${all_games[x].namespace}` != `${data.gameName}/${data.tableId}`) continue;

				all_games[x].marks = [];
				all_games[x].gameInfo = [];

				for(var i = 0; i < self.selectedGames.length; i++) {
					if(`${all_games[x].namespace}` == `${self.selectedGames[i].namespace}`) {
						self.selectedGames[i] = all_games[x];
					}
				} //end for
			}

			self.shoechange(data);
		},
		flippytimer : function (data) {
			self.flippytimer(data);
		},
		flip : function(data) {
			self.flip(data);
		},
		setbettingtime : function(data) {
			if(this.fnFilterData(data)) return;
			self.startBetting(data);
		},
		inputitem : function(data) {
			if(this.fnFilterData(data)) return;

			for(var x = 0; x < all_games.length; x++) {
				if(`${all_games[x].namespace}` != `${data.gameName}/${data.tableId}`) continue;
				all_games[x].gameInfo = data.gameInfo;
				for(var i = 0; i < self.selectedGames.length; i++) {
					if(`${all_games[x].namespace}` == `${self.selectedGames[i].namespace}`) {
						self.selectedGames[i] = all_games[x];
					}
				} //end for
			}

			self.inputItem(data);
		},
		newround : function(data) {
			if(this.fnFilterData(data)) return;

			for(var x = 0; x < all_games.length; x++) {
				if(`${all_games[x].namespace}` != `${data.gameName}/${data.tableId}`) continue;

				all_games[x].gameInfo = {};
				all_games[x].currentRound = data.roundNum;

				for(var i = 0; i < self.selectedGames.length; i++) {
					if(`${all_games[x].namespace}` == `${self.selectedGames[i].namespace}`) {
						self.selectedGames[i] = all_games[x];
					}
				} //end for
			}

			self.newRound(data);

		},
		displayresult : function (data) {
			if(this.fnFilterData(data)) return;
			for(var x = 0; x < all_games.length; x++) {
				if(`${all_games[x].tableNumber}${all_games[x].gameName}` == `${data.tableId}${data.gameName}`) {
					if(all_games[x].gameName == 'Sicbo') {
						all_games[x].marks.shift();
					}
					all_games[x].marks.push(data.mark);
				}

				for(var i = 0; i < self.selectedGames.length; i++) {
					if(`${all_games[x].namespace}` == `${self.selectedGames[i].namespace}`) {
						self.selectedGames[i] = all_games[x];
					}
				} //end for

			}
			self.displayResult(data);
		},
		updatecredits : function(data) {
			if(this.fnFilterData(data)) return;
			self.updateCredits(data);

			if (data.payload.credits.total_winning) {
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
	        case "Pai-Gow":
	        gameText = window.language.gamename.paigow_game;
	        break;
	      }

	      if(window.integrationType.toLowerCase() === 'transfer') {
	      	self.context.component_multibetBetting2.moneyChange(data.payload.credits.money);
	      } else {
	      	// if seamless get money frm api
		  		$.post('/get/user', (response) => {
		  			response = typeof response === 'string' ? JSON.parse(response) : response;
		  			if(response.money) {
							if(window.casino == "SS") {
								self.context.context.user_money = parseInt(response.money);
							} else {
								self.context.context.user_money = parseFloat(response.money).toFixed(2);
							}
							self.context.component_betDetails.reinit(true);
		  			} // end if
		  		});
	      }

	      if(self.context.component_multibetv2.isActive) {
		      $(`.${data.gameName}-${data.tableId}-win`).show();
	      }

	      $(`.${data.gameName}-${data.tableId}-win > .win-wrap`).animate({'right' : 0, 'opacity': 1}, 'fast');
	      let winning = window.casino ==='N' ? parseInt(data.payload.credits.total_winning) : parseFloat(data.payload.credits.total_winning).toFixed(2);
	      $(`.${data.gameName}-${data.tableId}-win .win-amt`).html(numberWithCommas(winning));

				let bets = data.payload.credits.bets;
	      if(data.gameName === 'Baccarat') {
					let mainBet = _.find(data.payload.credits.bets, function (e) {return e.bet === 'player' || e.bet === 'banker'})
					let tieBet = _.find(data.payload.credits.bets, function (e) {return e.bet === 'tie'})
					
					if(mainBet && mainBet.win_money === mainBet.bet_money && _.isEmpty(tieBet)) {
						$(`.${data.gameName}-${data.tableId}-win .you-win-text`).html(window.language2.baccarat_betlayout_tie)
					}

	      } else if(data.gameName === 'Dragon-Tiger') {
					let mainBet = _.find(data.payload.credits.bets, function (e) {return e.bet === 'dragon' || e.bet === 'tiger'})
					let tieBet = _.find(data.payload.credits.bets, function (e) {return e.bet === 'tie' || e.bet === 'suited_tie'})
					if(mainBet && mainBet.win_money > 0 && mainBet.win_money < mainBet.bet_money && _.isEmpty(tieBet)) {
						$(`.${data.gameName}-${data.tableId}-win .you-win-text`).html(window.language2.baccarat_betlayout_tie)
					}
	      }

	      setTimeout(() => {
	      	$(`.${data.gameName}-${data.tableId}-win > .win-wrap`).animate({'right' : '-360px', 'opacity': 0}, {
	          complete: function () {
	      			$(`.${data.gameName}-${data.tableId}-win`).hide();
	      			$(`.${data.gameName}-${data.tableId}-win .you-win-text`).html(window.language.locale === 'zh' ? window.language.multibet_status.youwin :'You Win!')
	      		}
	        })
	      }, 6000)
	      // self.context.component_notifications.animatePopup(`${gameText} #${data.tableId}`, parseInt(data.payload.credits.total_winning));
	    }

		},
		setroundprogress : function(data) {
			if(this.fnFilterData(data)) return;
			self.setRoundProgress(data);
		},
		displaymodify : function(data) {
			if(this.fnFilterData(data)) return;

			for(var x = 0; x < all_games.length; x++) {
				if(`${all_games[x].tableNumber}${all_games[x].gameName}` == `${data.tableId}${data.gameName}`) {
					if(all_games[x].gameName == 'Sicbo' || all_games[x].gameName == 'Poker' || all_games[x].gameName == 'Pai-Gow') {
						all_games[x].marks.pop();
						all_games[x].marks.push(data.data.mark);
					} else {
						all_games[x].marks = data.data.mark;
					}
				}

				for(var i = 0; i < self.selectedGames.length; i++) {
					if(`${all_games[x].namespace}` == `${self.selectedGames[i].namespace}`) {
						self.selectedGames[i] = all_games[x];
					}
				} //end for

			}

			self.displaymodify(data)
		},
		displayRollback : function(data) {
			if(this.fnFilterData(data)) return;

			for(var x = 0; x < all_games.length; x++) {
				if(`${all_games[x].tableNumber}${all_games[x].gameName}` == `${data.tableId}${data.gameName}`) {
					if(all_games[x].gameName == 'Sicbo' || all_games[x].gameName == 'Poker' || all_games[x].gameName == 'Pai-Gow') {
						all_games[x].marks.pop();
						all_games[x].marks.push(data.data.mark);
					} else {
						all_games[x].marks = data.data.mark;
					}
				}

				for(var i = 0; i < self.selectedGames.length; i++) {
					if(`${all_games[x].namespace}` == `${self.selectedGames[i].namespace}`) {
						self.selectedGames[i] = all_games[x];
					}
				} //end for

			}

			self.displayRollback(data)
		},
		maintenanceChange : function(data) {
			if(this.fnFilterData(data)) return;
			let status = parseInt(data.data.status); //1 mantenance true / 0 maintenance false

			if(status) {
				let g = _.find(all_games, function (e) {return `${e.namespace}` === `${data.gameName}/${data.tableId}`});
				if(!_.isEmpty(g)) {
					self.maintenanceGames.push(g);
				}
			} else {
				self.maintenanceGames = _.filter(self.maintenanceGames, function (e) {return `${e.namespace}` !== `${data.gameName}/${data.tableId}`});
			}

			let index = _.findIndex(self.games, function (e) {return e.data.namespace === `${data.gameName}/${data.tableId}` });

			let toDisp = _.filter(all_games, function(game) {
				return !_.find(self.maintenanceGames, function(e){return e.namespace == game.namespace}) 
				&& !_.find(self.selectedGames, function(e){return e.namespace == game.namespace}) 
				&&  !_.find(self.disabledGames, function(e){return e.namespace == game.namespace})
				&&  !_.find(self.roomGames, function(e){return e.namespace == game.namespace});
			});
			
			if(index > -1 && status) {
				self.toSwitchRoom = `${data.gameName}/${data.tableId}`;
				console.log(index, "maintenance CHange", toDisp)
				if(toDisp.length) {
					self.createGames(toDisp[0], index, true);
				} else {
					self.createGames([], index, false, true);
				}

			} else { 
				//upon table activation and if game not exist in games
				let i = 0;
				self.toSwitchRoom = '';
				if(self.selectedGames.length < 4) {
					if(self.games.length < 4) {
						i = self.selectedGames.length;
					}

					if(self.games.length === 4 && _.find(self.games, function (e) {return e.isRemoved})) {
						i = _.findIndex(self.games, function (e) {return e.isRemoved});
					}
					if(toDisp.length) {
						self.createGames(toDisp[0], i, false);
					}
				}
				
			}

			this.fnFilterSelected();
			this.fnRenderToSelect();
			this.fnRenderRange();

			self.maintenanceChange(data);
			self.setUnavailable(status);
		},
		enableDsiableChange (data) {
			if(this.fnFilterData(data)) return;
			if(window.junket == 0) return;
			let status = parseInt(data.status); //1 mantenance true / 0 maintenance false
			if(data.vendor_id != window.vendor_id) return;
			if(status) {
				let g = _.find(all_games, function (e) {return `${e.namespace}` === `${data.gameName}/${data.tableId}`});
				if(!_.isEmpty(g)) {
					self.disabledGames.push(g);
				}
			} else {
				self.disabledGames = _.filter(self.disabledGames, function (e) {return `${e.namespace}` !== `${data.gameName}/${data.tableId}`});
			}

			let index = _.findIndex(self.games, function (e) {return e.data.namespace === `${data.gameName}/${data.tableId}` });

			self.toSwitchRoom = `${data.gameName}/${data.tableId}`;
			
			let toDisp = _.filter(all_games, function(game) {
				return !_.find(self.maintenanceGames, function(e){return e.namespace == game.namespace}) 
				&& !_.find(self.selectedGames, function(e){return e.namespace == game.namespace}) 
				&&  !_.find(self.disabledGames, function(e){return e.namespace == game.namespace})
				&&  !_.find(self.roomGames, function(e){return e.namespace == game.namespace});
			});

			if(index > -1 && status) {
				
				if(toDisp.length) {
					self.createGames(toDisp[0], index, true);
				} else {
					self.createGames([], index, false, true);
				}
			} else { 
				//upon table activation and if game not exist in games
				let i = 0;
				self.toSwitchRoom = '';
				if(self.selectedGames.length < 4) {
					if(self.games.length < 4) {
						i = self.selectedGames.length;
					}

					if(self.games.length === 4 && _.find(self.games, function (e) {return e.isRemoved})) {
						i = _.findIndex(self.games, function (e) {return e.isRemoved});
					}
					if(toDisp.length) {
						self.createGames(toDisp[0], i, false);
					}
				}
				
			}

			this.fnFilterSelected()

			this.fnRenderToSelect();

			this.fnRenderRange();
			self.enableDsiableChange(data);
			self.setUnavailable(status);
		},
		createRemoveRoom (data, status) {
			if(this.fnFilterData(data)) return;
			if(window.junket == 0) return;
			if(status) {
				let g = _.find(all_games, function (e) {return `${e.namespace}` === `${data.gameName}/${data.tableId}`});
				if(!_.isEmpty(g)) {
					self.roomGames.push(g);
				}
			} else {
				self.roomGames = _.filter(self.roomGames, function (e) {return `${e.namespace}` !== `${data.gameName}/${data.tableId}`});
			}

			let index = _.findIndex(self.games, function (e) {return e.data.namespace === `${data.gameName}/${data.tableId}` });

			let toDisp = _.filter(all_games, function(game) {
				return !_.find(self.maintenanceGames, function(e){return e.namespace == game.namespace}) 
				&& !_.find(self.selectedGames, function(e){return e.namespace == game.namespace}) 
				&&  !_.find(self.disabledGames, function(e){return e.namespace == game.namespace})
				&&  !_.find(self.roomGames, function(e){return e.namespace == game.namespace});
			});

			if(status) {
				if(index > -1) {
					self.toSwitchRoom = `${data.gameName}/${data.tableId}`;

					if(toDisp.length) {
						self.createGames(toDisp[0], index, true);
					} else {
						self.createGames([], index, false, true);
					}
				}
			} else if(!status) {
				let i = 0;
				self.toSwitchRoom = '';
				if(self.selectedGames.length < 4) {
					if(self.games.length < 4) {
						i = self.selectedGames.length;
					}

					if(self.games.length === 4 && _.find(self.games, function (e) {return e.isRemoved})) {
						i = _.findIndex(self.games, function (e) {return e.isRemoved});
					}
					if(toDisp.length) {
						self.createGames(toDisp[0], i, false);
					}
				}
			}

			this.fnFilterSelected();

			this.fnRenderToSelect();
			this.fnRenderRange();

			self.setUnavailable(status);
		},
		fnFilterData: function(data) {
			// if(`${data.gameName}/${data.tableId}` === `${window.game}/${window.tableNum}` && data.eventName != 'updatecredits') return true;
			if(`${data.gameName}/${data.tableId}` === `${window.game}/${window.tableNum}`) return true;
			return false;
		},
		fnRenderRange : function () {
			$('.range-list').empty();

			for(var x= 0; x < self.games.length; x++) {
				self.games[x].allRanges.forEach((e) => {
					var target = $($(".multi-range")[x]).next();
					var range = `${self.games[x].betrange.min}-${self.games[x].betrange.max}`;
					if(range === `${e.min}-${e.max}`) {
						$($(".multi-range")[x]).attr('data', range);
						return;
					}
					let rMin = (e.min * parseInt(window.currencyMultiplier))*parseInt(window.userMultiplier);
					let rMax = ((e.max * parseInt(window.currencyMultiplier))*parseInt(window.userMultiplier)) * self.games[x].mainMultiplier;

					$(target).append(`
						<div data-game='${self.games[x].data.namespace}' data='${e.min}-${e.max}' class='range'>
							<span data='${self.games[x].data.namespace}' data='${e.min}-${e.max}'>${numberWithCommas(rMin)} - ${numberWithCommas(rMax)}</span>
						</div>`);
				}); // end foreach

			} //end for

			var ctx = this;
			$('.range').unbind('click').on("click", function (e) {
				e.preventDefault();
				if(window.tutorial_enabled) return;
				$(".multi-range .drop-down").removeClass('up');
				$($(this).parent()).hide();

				var namespace = $(this).attr('data-game');
				var game = _.find(self.games, function(e) { return e.namespace ===  namespace });
				game.prevBets = [];
				game.checkButtonState();
				if(!game.toggleSlaveCheck()) {
					self.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_unabletochange,1);
					return;
				}

				var target = $($(this).parent()).prev();

				let text = $($(this).children()[0]).text();
				let min = text.split('-')[0];
				let max = text.split('-')[1];
				min = parseInt(min.replaceAll(',',''));
				max = parseInt(max.replaceAll(',',''));

				let indiMin = '';
				let indiMax = '';
				if(min >= 1000 && min < 999999 ) {
					min = min/1000;
					indiMin = 'K';
				}

				if(min >= 1000000 ) {
					min = min/1000000;
					indiMin = 'M';
				}

				if(max >= 1000 && max < 999999 ) {
					max = max/1000;
					indiMax = 'K';
				}

				if(max >= 1000000 ) {
					max = max/1000000;
					indiMax = 'M';
				}

				text = `${numberWithCommas(min)}${indiMin} - ${numberWithCommas(max)}${indiMax}`;

				$($(target).children()[0]).html(text);

				var range = $(this).attr('data');

				var selectedRange = _.find(game.allRanges, function (e) { return `${e.min}-${e.max}` === range});

				game.setBetrange(selectedRange, true)

				ctx.fnRenderRange();

				let gameMap = _.map(self.games, function (a) {
					return  {
						game : a.namespace,
						range : `${a.betrange.min}-${a.betrange.max}`
					}
				});
				gameMap = _.uniqBy(gameMap, 'game');
				if(gameMap.length < 4) {
					let g = _.find(all_games, function (game) {
						return !_.find(gameMap, function (e) {return e.game == game.namespace})
					})

					gameMap.push({
						game: g.namespace, 
						range : `${g.casinoBetRanges[0].min}-${g.casinoBetRanges[1].max}`
					});
				}
				$.post('/setGameSettings', {data:gameMap})
			});

		},
		fnRenderToSelect : function() {

			let toDispAll = all_games;

			$('.all-table-list').empty();

			//order by maintenance
			let temp = _.filter(toDispAll, function (disp) {
				return !_.find(self.maintenanceGames, function(e){return e.namespace == disp.namespace}) && !_.find(self.disabledGames, function(e){return e.namespace == disp.namespace});
			});
			self.maintenanceGames = _.sortBy(self.maintenanceGames, function (e) {
    		let table = e.tableNumber.length > 1 ? e.tableNumber : `0${e.tableNumber}`;
    		return `${e.gameName}/${table}`//e.namespace
    	});

			self.disabledGames = _.sortBy(self.disabledGames, function (e) {
    		let table = e.tableNumber.length > 1 ? e.tableNumber : `0${e.tableNumber}`;
    		return `${e.gameName}/${table}`//e.namespace
    	});

			let filteredDisabled = self.disabledGames;
			for(var x = 0; x < self.maintenanceGames.length; x++) {
				filteredDisabled = _.filter(filteredDisabled, function (e) {
					return e.namespace != self.maintenanceGames[x].namespace
				});
			}

			temp.push(...filteredDisabled);
			temp.push(...self.maintenanceGames);

			let r_link = '';

			let tempRoomGames = _.filter(temp, function (e) {
				return _.find(self.roomGames, function (a) {return a.namespace === e.namespace})
			});

			temp = _.filter(temp, function (e) {
				return !_.find(self.roomGames, function (a) {return a.namespace === e.namespace})
			});

			temp.push(...tempRoomGames);
			toDispAll = temp;
			//end order by maintenance

			toDispAll.forEach((disp) => {
				let gName = '';
				let maintenanceClass = '';
				let flippyClass = '';
				if(!_.isEmpty(_.find(self.maintenanceGames, function(e){return e.namespace == disp.namespace}))) {
					maintenanceClass = 'maintenance';
				}
				if(!_.isEmpty(_.find(filteredDisabled, function(e){return e.namespace == disp.namespace}))) {
					maintenanceClass = 'disabled';
				}

				if(!_.isEmpty(_.find(self.roomGames, function(e){return e.namespace == disp.namespace}))) {
					maintenanceClass = 'rooms';
				}

				if(disp.type && disp.type === 'flippy') {
					flippyClass = 'flippy';
				}
				switch(disp.gameName) {
					case "Baccarat":
						gName = 'BAC';
						r_link = window.bc_domain;
						break;
					case "Dragon-Tiger":
						gName = 'DT';
						r_link = window.dt_domain;
						break;
					case "Poker":
						gName = 'POK';
						r_link = window.p_domain;
						break;
					case "Sicbo":
						gName = 'SIC';
						r_link = window.sb_domain;
						break;
					case "Pai-Gow":
						gName = 'PAI';
						r_link = window.pg_domain;
						break;
				}

				$('.all-table-list').append(`
					<div class='game-table ${maintenanceClass} ${flippyClass}' data='${disp.namespace}' id='${disp.gameName}-${disp.tableNumber}'>
						<span class="game-name">${gName} ${['PAI', 'POK', 'SIC'].indexOf(gName) > -1 ? '' : disp.tableNumber}</span>
						<span class="game-status"></span>
						<span class="game-status-maintenance">${window.language.multibet_status.maintenance}</span>
						<span class="game-status-disabled">Disabled</span>
						<span class="game-status-rooms">Rooms Created</span>
						<span class="game-link" href-data="${r_link}${disp.tableNumber}"></span>
					</div>`);

			})

			$(".game-table > .game-link").on("click", function (e) {
				let link = $(this).attr('href-data');
				let namespace = $($(this).parent()).attr('data');
				let game = _.find(all_games, function (e) {return e.namespace === namespace});

				if(!_.isEmpty(game)) {
					let range = game.casinoBetRanges[0];

					//agent range
					if(window.agent_range.length) {
						let roomType = game.roomType === 'n'? 'normal' : game.roomType === 'v'? 'vip' : 'premium';
						let isFlippy = game.gameName === 'Baccarat' && game.type === 'flippy';
						let a_range = _.find(window.agent_range, (a)=> {
							if(a.gameType.toLowerCase() === 'flippy') {
								return a.game === game.gameName && a.type === roomType && isFlippy;
							} else {
								return a.game === game.gameName && a.type === roomType && !isFlippy;
							}
						});

						range = !_.isEmpty(a_range) ? a_range.ranges[0] : range;
					}

					$.post("/setGameSettings", {range : `${range.min}-${range.max}`, game: namespace}, function () {
	        	window.location = link;
	        });
				}// end if
			});

			$('.game-table').on("click", function (e) {
				if($(this).hasClass('maintenance')) return
				if($(this).hasClass('rooms')) return
				if($(this).hasClass('disabled')) return
				$(".game-table").removeClass('active');
				$(this).addClass('active');
				if(self.eyeRoadmap) {
					if(self.eyeRoadmap.namespace === $(this).attr('data')) {
						$(this).removeClass('active')
						$("#roadmap-list-container").hide();
						self.eyeId = null;
						self.eyeRoadmap = null
						return
					}
				}
				self.toggleEye($(this).attr('data'), $(this), e, 'list');
				$("#roadmap-list-container").show();
			});

			let toDisp = _.filter(all_games, function(game) {
				return !_.find(self.maintenanceGames, function(e){return e.namespace == game.namespace})
				&& !_.find(self.selectedGames, function(e){return e.namespace == game.namespace})
				&& !_.find(self.disabledGames, function(e){return e.namespace == game.namespace})
				&& !_.find(self.roomGames, function(e){return e.namespace == game.namespace});
			});
			console.log(self.selectedGames, "on fnRenderToSelect")
			$('.game-list').empty();
			//$('.game-list').hide();

			toDisp.forEach((disp) => {
				let index = $('.game-list').index();

				let gName = '';
				switch(disp.gameName) {
					case "Baccarat":
						gName = window.language.gamename.baccarat_game;
						break;
					case "Dragon-Tiger":
						gName = window.language.gamename.dragontiger_game;
						break;
					case "Poker":
						gName = window.language.gamename.poker_game;
						break;
					case "Sicbo":
						gName = window.language.gamename.sicbo_game;
						break;
					case "Pai-Gow":
						gName = window.language.gamename.paigow_game;
						break;
				}
				let f = '';
				if(disp.type && disp.type === 'flippy') {
					f = 'flippy';
				}
				$('.game-list').append(`
					<div class='eye-cion' data='${disp.namespace}' index='${index}'></div>
					<div data='${disp.namespace}' class='game ${f}'>
						<span data='${disp.namespace}'>${gName} ${disp.tableNumber}</span>
						<i class='${disp.gameName}-${disp.tableNumber}' class=info></i>
					</div>`);
			});

			$('.eye-cion').on("click", function (e) {
				self.toggleEye($(this).attr('data'), $(this), e);
			});

			var ctx = this;
			$('.game').on('click', function(e) {
				if(window.tutorial_enabled) return;

				if(self.eyeRoadmap) {
					self.eyeRoadmap.eye.removeAllChildren();
					self.eyeRoadmap = null;
					$("#roadmap-container").hide();
				}

				let gameCheck = _.find(self.games, function(e) {return e.data.namespace === self.toSwitchRoom});

				if(!_.isEmpty(gameCheck)) {
					let chips = _.find(gameCheck.betarea, function (e){return e.chips.length});
					if(!_.isEmpty(chips)) {
            self.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_unabletochange, 1);
						return;
					}
				}

				if(!self.toSwitchRoom) return;
				 $($(this).parent()).hide();

				let index = _.findIndex(self.games, function(o) { return o.data.namespace == self.toSwitchRoom });
				
				if(index < 0) {
					if(!self.selectedGames.length) {
						index = 0
					} else {
						index = self.selectedGames.length
					}
				}

				let game = _.find(all_games, function(a) { return a.namespace === $(e.currentTarget).attr('data') });
				self.createGames(game, index, true);
				self.toSwitchRoom = null;

				ctx.fnFilterSelected();

				ctx.fnRenderToSelect();
				ctx.fnRenderRange();
				$(this).hide();

				let gameMap = _.map(self.games, function (a) {
					return  {
						game : a.namespace,
						range : `${a.betrange.min}-${a.betrange.max}`
					}
				});

				gameMap = _.uniqBy(gameMap, 'game');
				if(gameMap.length < 4) {
					let g = _.find(all_games, function (game) {
						return !_.find(gameMap, function (e) {return e.game == game.namespace})
					})

					gameMap.push({
						game: g.namespace, 
						range : `${g.casinoBetRanges[0].min}-${g.casinoBetRanges[1].max}`
					});
				}
				$.post('/setGameSettings', {data:gameMap})
			});

		},
		fnFilterSelected: function () {
			let sorted = _.map(self.games, function (e) {
				if(!e.isRemoved) {
					return e.data
				}
			});

			sorted = _.filter(sorted, function (e) {return e});
			self.selectedGames = _.filter(all_games, function (e) {
				return _.find(sorted, function (a) { return a.namespace == e.namespace})
			});
		}
	} //end of evt

	return evt
}
