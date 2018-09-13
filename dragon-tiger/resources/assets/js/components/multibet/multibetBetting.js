import { createSprite, randomNum, createCardSprite, numberCounter, playSound } from '../../factories/factories';
import  {bc_opposite, dt_opposite, sb_opposite, poker_opposite} from './multiOppositebet';

import {baccarat} from './factory/baccarat';
import {dragonTiger} from './factory/dragonTiger';
import {poker} from './factory/poker';
import {sicbo} from './factory/sicbo';
import {redwhite} from './factory/redwhite';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		multibet_amount : 0,
		response_cleared : false,
		response_confirmed : false,
		actions : [],
		main() {

		},
		numberWithCommas (x) {
			try {
		    	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			catch(e) {

			}
		},
		register () {

			for(var x = 0; x < this.context.component_multibet.games.length; x++) {

				for(var i = 0; i < this.context.component_multibet.games[x].betarea.length; i++ ) {
					this.context.component_multibet.games[x].betarea[i].total_bet_amt = 0;
					this.context.component_multibet.games[x].betarea[i].chips = [];
					this.context.component_multibet.games[x].betarea[i].addEventListener("click", this.multibetDropevent.bind(this), false );
				}

				this.context.component_multibet.games[x].confirmButton.target_game = this.context.component_multibet.games[x]

				switch(this.context.component_multibet.games[x].data.gameName) {
					case "Baccarat" :
						this.context.component_multibet.games[x].links = {
							confirm : window.bc_domain + 'bet/store/'+this.context.component_multibet.games[x].data.tableNumber, //'http://10.1.10.231:8002/bet/store/'+this.context.component_multibet.games[x].data.tableNumber,
							cancel : window.bc_domain + 'bet/cancelMulti/'+ this.context.component_multibet.games[x].data.tableNumber,//'http://10.1.10.231:8002/bet/cancel/'+this.context.component_multibet.games[x].data.tableNumber
							game : window.bc_domain +this.context.component_multibet.games[x].data.tableNumber,//'http://10.1.10.231:8002/bet/cancel/'+this.context.component_multibet.games[x].data.tableNumber
							logs : window.bc_domain +'actionlogs/store/'+this.context.component_multibet.games[x].data.tableNumber,//'http://10.1.10.231:8002/bet/cancel/'+this.context.component_multibet.games[x].data.tableNumber
							getWin : window.bc_domain +'get/winAll/'+this.context.component_multibet.games[x].data.tableNumber//'http://10.1.10.231:8002/bet/cancel/'+this.context.component_multibet.games[x].data.tableNumber
						}
						this.context.component_multibet.games[x].links.confirm += "/"+this.context.component_multibet.games[x].bet_range.min+"-"+this.context.component_multibet.games[x].bet_range.max;
						this.context.component_multibet.games[x].links.cancel += "/"+this.context.component_multibet.games[x].bet_range.min+"-"+this.context.component_multibet.games[x].bet_range.max;
						this.context.component_multibet.games[x].links.logs += "/"+this.context.component_multibet.games[x].bet_range.min+"-"+this.context.component_multibet.games[x].bet_range.max;
						this.context.component_multibet.games[x].links.game += "/"+this.context.component_multibet.games[x].bet_range.min+"-"+this.context.component_multibet.games[x].bet_range.max + "/0";
					break;
					case "Dragon-Tiger" :
						this.context.component_multibet.games[x].links = {
							confirm : window.dt_domain +'bet/store/'+this.context.component_multibet.games[x].data.tableNumber, //'http://10.1.10.231:8000/bet/store/'+this.context.component_multibet.games[x].data.tableNumber,
							cancel : window.dt_domain + 'bet/cancelMulti/'+this.context.component_multibet.games[x].data.tableNumber, //'http://10.1.10.231:8000/bet/cancel/'+this.context.component_multibet.games[x].data.tableNumber
							game : window.dt_domain +this.context.component_multibet.games[x].data.tableNumber, //'http://10.1.10.231:8000/bet/cancel/'+this.context.component_multibet.games[x].data.tableNumber
							logs : window.dt_domain +'actionlogs/store/'+this.context.component_multibet.games[x].data.tableNumber,//'http://10.1.10.231:8002/bet/cancel/'+this.context.component_multibet.games[x].data.tableNumber
							getWin : window.dt_domain +'get/winAll/'+this.context.component_multibet.games[x].data.tableNumber//'http://10.1.10.231:8002/bet/cancel/'+this.context.component_multibet.games[x].data.tableNumber
						}
						this.context.component_multibet.games[x].links.confirm += "/"+this.context.component_multibet.games[x].bet_range.min+"-"+this.context.component_multibet.games[x].bet_range.max;
						this.context.component_multibet.games[x].links.cancel += "/"+this.context.component_multibet.games[x].bet_range.min+"-"+this.context.component_multibet.games[x].bet_range.max;
						this.context.component_multibet.games[x].links.logs += "/"+this.context.component_multibet.games[x].bet_range.min+"-"+this.context.component_multibet.games[x].bet_range.max;
						this.context.component_multibet.games[x].links.game += "/"+this.context.component_multibet.games[x].bet_range.min+"-"+this.context.component_multibet.games[x].bet_range.max + "/0";
					break;
					case "Sicbo" :
						this.context.component_multibet.games[x].links = {
							confirm : window.sb_domain + 'bet/store/'+this.context.component_multibet.games[x].data.tableNumber, //'http://10.1.10.231:8001/bet/store/'+this.context.component_multibet.games[x].data.tableNumber,
							cancel : window.sb_domain + 'bet/cancelMulti/'+this.context.component_multibet.games[x].data.tableNumber, //'http://10.1.10.231:8001/bet/cancel/'+this.context.component_multibet.games[x].data.tableNumber
							game : window.sb_domain +this.context.component_multibet.games[x].data.tableNumber, //'http://10.1.10.231:8001/bet/cancel/'+this.context.component_multibet.games[x].data.tableNumber
							logs : window.sb_domain +'actionlogs/store/'+this.context.component_multibet.games[x].data.tableNumber,//'http://10.1.10.231:8002/bet/cancel/'+this.context.component_multibet.games[x].data.tableNumber
							getWin : window.sb_domain +'get/winAll/'+this.context.component_multibet.games[x].data.tableNumber//'http://10.1.10.231:8002/bet/cancel/'+this.context.component_multibet.games[x].data.tableNumber
						}
						this.context.component_multibet.games[x].links.confirm += "/"+this.context.component_multibet.games[x].bet_range.min+"-"+this.context.component_multibet.games[x].bet_range.max;
						this.context.component_multibet.games[x].links.cancel += "/"+this.context.component_multibet.games[x].bet_range.min+"-"+this.context.component_multibet.games[x].bet_range.max;
						this.context.component_multibet.games[x].links.logs += "/"+this.context.component_multibet.games[x].bet_range.min+"-"+this.context.component_multibet.games[x].bet_range.max;
						this.context.component_multibet.games[x].links.game += "/"+this.context.component_multibet.games[x].bet_range.min+"-"+this.context.component_multibet.games[x].bet_range.max;
					break;
					case "Poker" :
						this.context.component_multibet.games[x].links = {
							confirm : window.p_domain+'bet/store/'+this.context.component_multibet.games[x].data.tableNumber,
							cancel : window.p_domain+'bet/cancelMulti/'+this.context.component_multibet.games[x].data.tableNumber,
							game : window.p_domain +this.context.component_multibet.games[x].data.tableNumber, //'http://10.1.10.231:8001/bet/cancel/'+this.context.component_multibet.games[x].data.tableNumber
							logs : window.p_domain +'actionlogs/store/'+this.context.component_multibet.games[x].data.tableNumber,//'http://10.1.10.231:8002/bet/cancel/'+this.context.component_multibet.games[x].data.tableNumber
							getWin : window.p_domain +'get/winAll/'+this.context.component_multibet.games[x].data.tableNumber,
							setFoldCheck : window.p_domain +'bet/setFoldCheck/'+this.context.component_multibet.games[x].data.tableNumber,
						}
						this.context.component_multibet.games[x].links.confirm += "/"+this.context.component_multibet.games[x].bet_range.min+"-"+this.context.component_multibet.games[x].bet_range.max;
						this.context.component_multibet.games[x].links.cancel += "/"+this.context.component_multibet.games[x].bet_range.min+"-"+this.context.component_multibet.games[x].bet_range.max;
						this.context.component_multibet.games[x].links.logs += "/"+this.context.component_multibet.games[x].bet_range.min+"-"+this.context.component_multibet.games[x].bet_range.max;
						this.context.component_multibet.games[x].links.game += "/"+this.context.component_multibet.games[x].bet_range.min+"-"+this.context.component_multibet.games[x].bet_range.max;
					break;
				}

				this.context.component_multibet.games[x].clearButton.target_game = this.context.component_multibet.games[x]
				this.context.component_multibet.games[x].repeatButton.target_game = this.context.component_multibet.games[x]
				this.context.component_multibet.games[x].confirmButton.on("click", this.confirmButtonEvent.bind(this));
				this.context.component_multibet.games[x].clearButton.on("click", this.clearButtonEvent.bind(this));
				this.context.component_multibet.games[x].repeatButton.on("click", this.repeatBetEvent.bind(this));

				if(this.context.component_multibet.games[x].data.gameName == "Poker") {

				}
			}
		},
		confirmButtonEvent (e) {

			if(_.isEmpty(this.context.component_multibet.active_game)) return;

			if(!this.context.component_multibet.active_game.game.timer_start) {
				return;
			}

			let bets = [];

			let target = e.currentTarget.target_game;

			if(!target.chips_container.children.length) return; //if game no chips cannot confirm

			let unconfirmedChips = _.filter(target.betarea, (e) => { return _.find(e.chips, (a) => { return !a.is_confirmed} ) });

			if(!unconfirmedChips.length) return;

			if(target.response_confirmed || target.response_cleared) return;

			for(var x = 0; x < target.betarea.length; x++) {
				if(target.betarea[x].total_bet_amt != 0) {
					if(parseInt(target.betarea[x].total_bet_amt) <  parseInt(target.betarea[x].min_betAmt)) {
						this.context.component_messages.setMessage(window.language.prompts.promptminbet,1);
						return
					}
				}
			}

			target.betarea.forEach((e) => {
				if(parseInt(e.total_bet_amt)) {
					bets.push({
						"amount" : e.total_bet_amt,
						"table_id": e.table,
						"is_confirmed": true,
						"slave" : target.currentSlave
					});

					e.chips.forEach((chip) => {
						chip.is_confirmed = true
					})
				}
			});

			target.confirmButton.gotoAndStop("click");

			target.bets = bets;

			target.previous_bet = bets;
			target.temp_prev_bet = bets;

			let emit_data = [];

			this.context.user_no_bet_count = 0;

			target.response_confirmed = true;

			let slaveType = {slave : "r"};

			if(target.data.gameName == "Baccarat") {
			 	slaveType = {slave : target.currentSlave == 'supersix' ? 's' : target.currentSlave.indexOf('bonus') > -1 ? 'b' : 'r'};
			}

			if(target.data.gameName == "Poker") {
				slaveType = {type : target.currentSlave.indexOf('bonus') > -1 ? 'b' : 'r'};
			}

			this.setActionLogs('confirm', target);

			let betData = {
				data: bets,
				logs : target.logs,
				type: 'm',
				is_multibet : true
			}

			betData[slaveType.type ? 'type' : 'slave'] = slaveType.type || slaveType.slave

			this.confirmReq(target, betData);

			this.context.component_multibet.slaveButtonState(target, "disabled");

		},
		confirmReq (target, betData) {

			let emit_data = [];

			$.post(target.links.confirm, betData, (response) => {

				let type = "";

				target.is_confirmed = true;

				target.response_confirmed = false;

				target.response_cleared = false;

				let betData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;

				if(parseInt(response.fail) && !betData.length ) {  //if insert failed

					this.context.component_messages.setMessage(window.language.prompts.promptbetfail, 1); // set message to no money //window.language.prompts.promptfunds
        	type = "fail";
        	emit_data = [];					

					this.handleBetFail(target);

        }  else if(parseInt(response.fail) && (betData.length || !_.isEmpty(betData))) { // if inssert failed but with prev bets
          type = "fail_add_bet";

          target.isBetting = true;

					let total = 0;

					emit_data = [];

					let bets = [];
					
					let betInfo = [];

					if(target.data.gameName != 'Poker') {

						betData.forEach((data) => {
							betInfo.push({
								amt: data.bet_money,
								bet: data.bet
							})
			
							total += data.bet_money
						});

					} else {

						for(var key in betData) {
							betInfo.push({
								amt: betData[key].bet,
								bet: key,
								cancel: betData[key].cancel
							});

							total += betData[key].bet
						}

					} //end else

					betInfo.forEach((data) => {
						emit_data.push({
							"roundNum" : parseInt(target.currentRound),
							"bet_amount" : data.amt,
							"name" : window.user_name,
							"id" : window.userId,
							"bet" : data.bet,
							"is_mobile" : this.context.mobile,
							'currency' : window.casino,
						  'slave' : !target.currentSlave ? '' : target.currentSlave,
						  'currencyMultiplier' : window.currencyMultiplier,
						  'userMultiplier' : window.userMultiplier
						});

						bets.push({
							"amount" : data.amt,
							"table_id": data.bet,
							"is_confirmed": true,
							"slave" : target.currentSlave,
							"cancel" : data.cancel ? data.cancel : 0
						});

					});

					target.bets = bets;
					target.previous_bet = bets;
					target.temp_prev_bet = bets;
        	this.setTempMoney();

          target.socket.emit('data', {
          	eventName : 'bet',
          	data: emit_data,
          	gameName: target.data.gameName,
          	tableId: target.data.tableNumber,
          	roundNum: parseInt(target.currentRound)
          }, (e) => {});

					this.removeUnsucessfullchips(target, response, type)

        } else if(!parseInt(response.fail) && (betData.length || !_.isEmpty(betData))) { // if success bet
          type = "success";

          target.isBetting = true;
          target.is_repeat = true;

					let total = 0;
					let bets = [];

					let betInfo = [];

					if(target.data.gameName != 'Poker') {

						betData.forEach((data) => {
							betInfo.push({
								amt: data.bet_money,
								bet: data.bet
							})
			
							total += data.bet_money
						});

					} else {

						for(var key in betData) {
							betInfo.push({
								amt: betData[key].bet,
								bet: key,
								cancel: betData[key].cancel
							});

							total += betData[key].bet
						}
					} //end else

					betInfo.forEach((data) => {
						emit_data.push({
							"roundNum" : parseInt(target.currentRound),
							"bet_amount" : data.amt,
							"name" : window.user_name,
							"id" : window.userId,
							"bet" : data.bet,
							"is_mobile" : this.context.mobile,
							'currency' : window.casino,
						  'slave' : !target.currentSlave ? '' : target.currentSlave,
						  'currencyMultiplier' : window.currencyMultiplier,
						  'userMultiplier' : window.userMultiplier
						});

						bets.push({
							"amount" : data.amt,
							"table_id": data.bet,
							"is_confirmed": true,
							"slave" : target.currentSlave,
							"cancel" : data.cancel ? data.cancel : 0
						});

					});

					target.bets = bets;
					target.previous_bet = bets;
					target.temp_prev_bet = bets;
					this.setTempMoney();

					//== addition to handle temp money
					target.temp_money = total;

					// this.setTempMoney("decrement",target, "response");

          target.socket.emit('data', {
          	eventName: 'bet', 
          	data: emit_data,
          	gameName: target.data.gameName, 
          	tableId: target.data.tableNumber, 
          	roundNum: parseInt(target.currentRound)
          } , (e) => {});
        } // end ese if

        if(window.casino == "N") {
        	this.context.context.user_money = parseInt(response.money);
        	this.context.component_betDetails.reinit(true);
        } else {
        	this.context.context.user_money = parseFloat(response.money);
        	this.context.component_betDetails.reinit(true);
        }

        this.checkButtonState(target)
			}).fail(() => {
				// this.confirmReq(target, betData);
				this.handleBetFail(target)
			});
		},
		//if bet fail but there is success bet
		removeUnsucessfullchips (target,response, type) {
			target.chips_container.removeAllChildren();

			this.repeatBetEvent({currentTarget : { target_game: target } }, true, true, true)
			// this.repeatBet(target, response);
		},

		handleBetFail(target) {

			target.response_confirmed  = false;
			target.response_cleared  = false;

			target.is_confirmed = false

    	target.betarea.forEach((e) => {
				e.chips.forEach((chip) => {
					chip.is_confirmed = false;
				});
			});

			target.bets = [];
			target.previous_bet = [];
			target.temp_prev_bet = [];
			
	   	this.removeUnconfirmedChips('', target);
		},

		/**
		 * repeats bet
		 * @param  obj e  target object where repeat will take place
		 * @param  bollean flag true if repeat is from removing unconfirmed chips, false if repeat is from normal repeat
		 * @param  bollean side for poker side extra bets
		 * @return null
		 */

		repeatBetEvent (e, flag, side, noLog) {
			let prev_bets = e.currentTarget.target_game.previous_bet;

			if(!prev_bets) return;

			if(e.currentTarget.target_game.currentSlave) {
				if(prev_bets[0].slave != e.currentTarget.target_game.currentSlave) {
					return;
				}
			}

			let target = e.currentTarget.target_game;

			if(!flag) {
				if(_.isEmpty(this.context.component_multibet.active_game)) return;

				if(!this.context.component_multibet.active_game.game.timer_start) {
					return;
				}
				if(target.is_repeat) return;
			}

			for(var x = 0; x < target.chips_container.children.length; x++) {
				if(!target.chips_container.children[x].pokerextra) {
					target.chips_container.removeChild(target.chips_container.children[x]);
					x --;
				}
			}
			target.is_repeat = true;

			let total = 0;

			if(!prev_bets && !prev_bets.length) return;

			if(!noLog) {
				this.setActionLogs('repeat', target);
			}

			target.betarea.forEach((table) => {
				table.total_bet_amt = 0;
				table.chips = [];

				for(var a = 0; a < prev_bets.length; a++) {
					if(prev_bets[a].table_id == table.table) {
						table.total_bet_amt = prev_bets[a].amount;
						this.addChip({target:table}, {chip_amt:prev_bets[a].amount} , true)
						total += prev_bets[a].amount

					}
				}
			});

			this.setTempMoney()
			
			if(!flag && !side) {
			  // this.setTempMoney("decrement",target, "repeatBetEvent")
				target.temp_money = total;
			  // this.setTempMoney("increment",target, "repeatBetEvent")
			}

			if (side) {

				let areas = ["flop", "turn", "river"];

				if(target.data.gameName === 'Poker') {
					for(var x = 0; x < areas.length; x++) {
						for(var a = 0; a < prev_bets.length; a++) {

							if(prev_bets[a].table_id == areas[x]) {
								target[areas[x]+"_area"].total_bet_amt = prev_bets[a].amount;
								target[areas[x]+"_area"].is_dropped = false;
								total += prev_bets[a].amount
							}

						}
					}
				}

				// for(var a = 0; a < prev_bets.length; a++) {
				// 	if(prev_bets[a].type && (prev_bets[a].type == 'flop' || prev_bets[a].type == 'turn' || prev_bets[a].type == 'river')) {
				// 		this.addChip({target:prev_bets[a].table_id}, {chip_amt:prev_bets[a].amount} , true);
				// 		total += prev_bets[a].amount
				// 	}
				// }
			}

 			target.isBetting = true;

			target.totalGameBetAmt = total;
			target.total_game_bet.text = this.numberWithCommas(total);

			this.checkButtonState(target)

			this.context.component_multibet.slaveButtonState(target, "disabled");
		},

		repeatBet (target, data) {

			this.removeBetChips(target);

			for(var x = 0; x < target.betarea.length; x++ ) {
				for(var i = 0; i < data.length; i++ ) {
					if(data[i].bet == target.betarea[x].table ) {
						this.addChip({target: target.betarea[x]}, {chip_amt: data[i].bet_money} )
					}
				}
			}
		},
		clearButtonEvent (e, socket) {

			let target = e.currentTarget.target_game;

			if(_.isEmpty(this.context.component_multibet.active_game)) return;

			if(!this.context.component_multibet.active_game.game.timer_start) {
				return;
			}

			if(!target.chips_container.children.length) return;

			if(target.response_cleared || target.response_confirmed) return;

			target.response_cleared = true;

			e.currentTarget.gotoAndStop('click');

			this.setActionLogs('clear', target);

			$.post(target.links.cancel, {type: 'm', logs : target.logs, slave : !target.currentSlave ? '' : target.currentSlave == 'bonus' || target.currentSlave == 'bonusplus' ? target.currentSlave : 'normal'}, (response) => {

 				let status = response.status;

 				let userMoney = window.casino.toLowerCase() == 'n' ? parseInt(response.money) : parseFloat(response.money);

 				if (parseInt(status)) {

 					target.isBetting = false;
 					target.temp_prev_bet = [];

					target.bets = [];
					target.is_confirmed = false;

					target.response_confirmed = false;
					target.response_cleared = false;

					if('previous_bet' in target && target.previous_bet.length) {
						if(target.previous_bet[0].is_confirmed) this.context.context.user_money += parseInt(target.totalGameBetAmt);
					}

					this.context.component_betDetails.reinit(true);

					target.totalGameBetAmt = 0;

					this.removeBetChips(target, true)

					target.betarea.forEach((e) => {
						e.chips = [];
						e.total_bet_amt = 0;
						e.alreadyMax = false;
					});

					if(target.previous_bet && target.previous_bet.length) {
						target.previous_bet.forEach((e) => {
							e.is_confirmed = false;
						});
					}

					target.is_repeat = false;

 					this.setTempMoney();
					this.checkButtonState(target);

					let range;
					if(target.data.gameName ===  'Baccarat') {
						let tableSlave = target.currentSlave ? target.currentSlave : 'normal';
						if(tableSlave === 'normal') {
							range = `${target.bet_range.min}-${target.bet_range.max}`
						} else {
							range = `${target.bet_range.min}-${target.bet_range.max}_${target.currentSlave}`
						}
					} else {
						range = `${target.bet_range.min}-${target.bet_range.max}`
					}

					let initData = {
					    userId : window.userId,
					    range : range,
		    			userName : window.user_name
					}

        	this.context.context.user_money = userMoney;
        	this.context.component_betDetails.reinit(true);

        	if(!socket) {
        		let slave = '';

        		if(target.currentSlave) {
        			if(target.currentSlave === 'classicPoker') {
        				slave = 'normal'
        			} else {
        				slave = target.currentSlave
        			}
        		}

						target.socket.emit('data', {
							eventName : 'cancel',
	          	gameName: target.data.gameName, 
	          	tableId: target.data.tableNumber, 
	          	roundNum: parseInt(target.currentRound),
							data : [{
		              roundNum : parseInt(target.currentRound),
		              range : initData.range,
		              name : window.user_name,
		              id : window.userId,
		              slave : slave
		          }]
	          }, (e) => {});
        	} // end if

        } else {
					target.betarea.forEach((e) => {
						e.chips.forEach((chip) => {
							chip.is_confirmed = true;
						});
					});
					this.checkButtonState(target);
        } // end if else

      }).fail(() => {
				target.betarea.forEach((e) => {
					e.chips.forEach((chip) => {
						chip.is_confirmed = true;
					});
				});
				this.checkButtonState(target);
      });

			this.context.component_multibet.slaveButtonState(target, "enabled");
		},
		multibetDropevent(e) {

			if(_.isEmpty(this.context.component_multibet.active_game)) return;

			this.is_betting = true;

			if(e.currentTarget.is_chip) {
				e.target = e.currentTarget.target_game
			}

			if(!this.context.component_chips.selected_chip) return;

			let toPasstarget = null;
			let target_area = null;

			if(e.currentTarget.is_chip) {
				toPasstarget = e.currentTarget.target_game.parent.parent;
				target_area = e.currentTarget.drop_area
			} else {
				toPasstarget = e.currentTarget.parent.parent;
				target_area = e.currentTarget
			}

			if(!toPasstarget.timer_start || !toPasstarget.betting_start) { // check if betting time && newround start
				if(!toPasstarget.betting_start) {
        	this.context.component_messages.setMessage(window.language.prompts.promptfirstround, 1);
				}
				return;
			}

			let condition = false;

			if(toPasstarget.game.toLowerCase().indexOf("baccarat") > -1) {
				condition = bc_opposite(toPasstarget, target_area);
			}
			if(toPasstarget.game.toLowerCase().indexOf("dragon-tiger") > -1) {
				condition = dt_opposite(toPasstarget, target_area);
			}
			if(toPasstarget.game.toLowerCase().indexOf("sicbo") > -1) {
				condition = sb_opposite(toPasstarget, target_area);
			}
			if(toPasstarget.game.toLowerCase().indexOf("poker") > -1) {
				condition = poker_opposite(toPasstarget, target_area);
			}

			if(condition) return; //checking for opposite betarea

			if(target_area.alreadyMax) {
				if(!target_area.chips.length) {
					target_area.alreadyMax = false;
				} else {
					return;
				}
			}

			let tempAmt = target_area.total_bet_amt;
			if(this.context.component_chips.selected_chip.chip_amt != "max"){
				tempAmt += this.context.component_chips.selected_chip.chip_amt;
			}

			if(tempAmt > target_area.max_betAmt) { // checks if total bet amount is greater than max bet amt
				this.context.component_messages.setMessage(window.language.prompts.promptmaxbet,1);
				return;
			}

			// checks if chip amt is not greater than max bet amt
			if(this.context.component_chips.selected_chip.chip_amt != "max" && this.context.component_chips.selected_chip.chip_amt > parseInt(target_area.max_betAmt)) {
				this.context.component_messages.setMessage(window.language.prompts.promptmaxbet,1);
				return;
			}

			let total_area_bet = this.addChip(e, this.context.component_chips.selected_chip);

			e.target.parent.parent.totalGameBetAmt = _.sumBy(toPasstarget.betarea, 'total_bet_amt');

			e.target.parent.parent.total_game_bet.text = e.target.parent.parent.totalGameBetAmt > 0 ? numberCounter(e.target.parent.parent.total_game_bet, e.target.parent.parent.totalGameBetAmt, this) : 0;

			e.target.parent.parent.is_confirmed = false;

			e.target.parent.parent.isBetting = true; // for slave toggle

			if(total_area_bet) {
				this.setActionLogs('insert', target_area, this.context.component_chips.selected_chip);
			}

			switch(e.target.parent.parent.data.gameName) {
				case "Baccarat" :
					baccarat.droppedState(e.target)
					break;
			}

			this.checkButtonState(toPasstarget)
			if(e.target.parent.parent.totalGameBetAmt > 0) {
				this.context.component_multibet.slaveButtonState(toPasstarget, "disabled");
			}
		},
		checkButtonState(target) {
			let count_chips = 0;

			if(!target.timer_start || (target.timer_type && target.timer_type !== 'startround')) {
				this.disableAllButtons(target);
				return;
			}
			// if(target.currentTarget.is_chip) {
			// 	target.currentTarget =  target.currentTarget.target_game
			// }
			target.betarea.forEach((e) => {
				if(e.chips.length) count_chips += e.chips.length;
			});

			let confirmButton = target.confirmButton
			let clearButton = target.clearButton
			let repeatButton = target.repeatButton

			if(count_chips) {
				confirmButton.gotoAndStop("up");
				clearButton.gotoAndStop("up");
			} else {
				confirmButton.gotoAndStop("disabled");
				clearButton.gotoAndStop("disabled");
			}

			let unconfirmed_cnt = 0;

			target.betarea.forEach((e) => {
				e.chips.forEach((chip) => {
					if(!chip.is_confirmed) {
						unconfirmed_cnt++;
					}
				});
			});

			if(unconfirmed_cnt) {
				confirmButton.gotoAndStop("up")
			} else {
				confirmButton.gotoAndStop("disabled")
			}

			if(target.previous_bet && target.previous_bet.length) {
				repeatButton.gotoAndStop("up");
			}

			if(!target.is_repeat && target.currentSlave && target.previous_bet && target.previous_bet.length) {
				if(target.previous_bet[0].slave != target.currentSlave) {
					repeatButton.gotoAndStop("disabled");
					return;
				}
			}

			if(target.is_repeat) {
				repeatButton.gotoAndStop("disabled");
			}
		},
		disableAllButtons (target) {

			let confirmButton = target.confirmButton
			let clearButton = target.clearButton
			let repeatButton = target.repeatButton

			repeatButton.gotoAndStop("disabled");
			confirmButton.gotoAndStop("disabled")
			clearButton.gotoAndStop("disabled");

		},
		createTieChip(e, chip, win) {
		      if(e.target.is_child) {
				e.target = e.target.parent
				}

			let avail_chips = [];

			if (window.casino == "SS") {
				avail_chips = [1,3,5,10,30,50,100,200,300,500,1000];
			}
			else {
				avail_chips = [1000,3000,5000,10000,30000,50000,100000,200000,300000,500000,1000000];
			}

			let sample = parseInt(e.target.total_bet_amt);

			if (isNaN(parseInt(chip.chip_amt))) {
				if ( chip.chip_amt && chip.chip_amt.toLowerCase() == "max") {
					sample = e.target.max_betAmt;

				}
				else if (!chip.chip_amt || chip.chip_amt.toLowerCase() != "max"){
					sample = chip;
				}
			}

			let count = avail_chips.length-1;

			let chips = [];

			e.target.chips.forEach((d) => {
				e.target.parent.parent.chips_container.removeChild(d);
			});

			e.target.chips = [];

			try {
				e.target.chips.forEach((e) => {
					e.target.parent.parent.chips_container.addChild(e);
				});
			} catch(err) {

			}
			for (var x = avail_chips.length-1; x > -1; x--) {
				if (sample == avail_chips[x]) {
					chips.push(avail_chips[x]);
					break;
				} // end if
				else if (sample-avail_chips[x] >= 0){
					sample -= avail_chips[x];
					chips.push(avail_chips[x]);
					x++;
				} // end elseif
			} // end for

			let instance = null;
			for (var x = 0; x < chips.length; x++) {
				let chip_container = new createjs.Container();

				let chip_name = "";

				if (window.casino == "SS") {
					chip_name = "blank-chip_"+(chips[x])+"k";
				}
				else {
					chip_name = "blank-chip_"+(chips[x]/1000)+"k";
				}

				instance = new createjs.Bitmap(this.context.getResources(chip_name));
				instance.scaleX = instance.scaleY = 0.6;
				// instance.regX = instance.getBounds().width/2;
				// instance.regY = instance.getBounds().height/2;
				instance.is_instance = true;

				let bet_amt = '';

				if(window.casino == "SS") {
					bet_amt = "$"+e.target.total_bet_amt
				} else {
					bet_amt = (e.target.total_bet_amt/1000)+"k"
				}

				let text = new createjs.Text(bet_amt, "20px bebasNeue","#000");
				text.textAlign = "center";
				text.textBaseline = "middle";
				text.x = (instance.getTransformedBounds().width/2);
				text.y = (instance.getTransformedBounds().height/2);
				text.is_text = true;


				chip_container.is_chip = true;
				chip_container.addChild(instance, text);
				chip_container.target_game = e.target;
				chip_container.is_win = false;

				chip_container.drop_area = e.target;
				chip_container.addEventListener("click", this.multibetDropevent.bind(this), false);

				chip_container.regX = chip_container.getBounds().width/2;
				chip_container.regY = chip_container.getBounds().height/2

				chip_container.x = e.target.x + e.target.getBounds().width/2 ;
				chip_container.y = e.target.y + e.target.getBounds().height/2 ;
				chip_container.scaleY = chip_container.scaleX = 0;
				e.target.chips.push(chip_container);

				createjs.Tween.get(chip_container)
				.to({
					scaleX:1,
					scaleY:1
				},150);
				if(win) {
					chip_container.is_win = true;
				}
				e.target.parent.parent.chips_container.addChild(chip_container);
			} //end for

			return e.target.total_bet_amt
		},
		addChip (e, chip, win, is_dt_tie, from) {

			let amt_dropped = 0;
			let areaMaxBet = 0;
			let moneyCheck = 0;

			let prevamt = 0;

			if(e.target.is_child) {
				e.target = e.target.parent
			}

			let avail_chips = [];

      let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

			for(var i = 0; i < chipArr.length; i++) {

				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});

			}
			
			if(!win && !is_dt_tie) {

				var temp = e.target.total_bet_amt;
				var temp1 = this.context.component_chips.selected_chip.chip_amt;
				// if betting drop chip
				e.target.prev_bet_amt = e.target.total_bet_amt;
				// == checking if chip drop max
				if(chip.chip_amt == "max") {
					if(this.multibet_amount >= this.context.context.user_money) {
						this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
						return;
					}
					if(e.target.total_bet_amt == e.target.max_betAmt) return;

					if(e.target.total_bet_amt > 0) {
						prevamt = e.target.total_bet_amt;
					}

					// start of poker special calcu
					if(e.target.parent.parent.data.gameName == 'Poker') {
						let pokerAmt = this.getPokerBetAmt(e.target);

						if(!pokerAmt) {
							return;
						}

						e.target.total_bet_amt = pokerAmt;
						amt_dropped = e.target.total_bet_amt;
						temp = e.target.total_bet_amt;
						temp1 = e.target.total_bet_amt;
					} else {
						temp = e.target.max_betAmt; 
						temp1 = e.target.max_betAmt;

						if(e.target.max_betAmt > (this.context.context.user_money - this.multibet_amount)) {
							temp = this.calculatedMax(e.target);
						}
						
						// e.target.total_bet_amt = e.target.max_betAmt;
						// amt_dropped = e.target.max_betAmt
					}

					e.target.alreadyMax = true;

				} else {

					temp += this.context.component_chips.selected_chip.chip_amt; 
					temp1 = this.context.component_chips.selected_chip.chip_amt
					// e.target.total_bet_amt += this.context.component_chips.selected_chip.chip_amt;
					amt_dropped = this.context.component_chips.selected_chip.chip_amt
				}

				// === money checking starts here
				e.target.parent.parent.temp_money += parseInt(amt_dropped);

				e.target.total_bet_amt = temp;

		  	if(e.target.total_bet_amt <= 0) {
		  		return;
		  	}

		  	this.setTempMoney();

				if( this.multibet_amount  >  parseInt(this.context.context.user_money) ) {
					e.target.total_bet_amt -= temp1;
					this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
					return 0;
				}

			} else if (win && !is_dt_tie) { // if winning drop chip
				e.target.total_bet_amt = chip.chip_amt;
			}

			// == setting what chips to draw
			let sample = parseInt(e.target.total_bet_amt);

			if (isNaN(parseInt(chip.chip_amt))) {
				if ( chip.chip_amt && chip.chip_amt.toLowerCase() == "max") {
					sample = e.target.max_betAmt;

				}
				else if (!chip.chip_amt || chip.chip_amt.toLowerCase() != "max"){
					sample = chip;
				}
			}

			let count = avail_chips.length-1;

			let chips = [];

			// e.target.chips = [];
			if(!win) {
				e.target.chips.forEach((d) => {
					e.target.parent.parent.chips_container.removeChild(d);
				});

				e.target.chips = [];
			}

			try {
				e.target.chips.forEach((e) => {
					e.target.parent.parent.chips_container.addChild(e);
				});
			} catch(err) {

			}
			for (var x = avail_chips.length-1; x > -1; x--) {
				if (sample == avail_chips[x].value) {
					chips.push(avail_chips[x].chip);
					break;
				} // end if
				else if (sample-avail_chips[x].value >= 0){
					sample -= avail_chips[x].value;
					chips.push(avail_chips[x].chip);
					x++;
				} // end elseif
			} // end for

			let instance = null;

			for (var x = 0; x < chips.length; x++) {
				let chip_container = new createjs.Container();

				let chip_name = "";

				chip_name = "blank-chip_"+(chips[x]);

        this.context.chipsConf.forEach((c) => {
          if(chips[x] == c.chipval) {
            chip_name = "blank-chip_"+c.chipName.split("_")[2]
          }
        });

				instance = new createjs.Bitmap(this.context.getResources(chip_name));
				instance.scaleX = instance.scaleY = 0.8;

				instance.is_instance = true;

				let bet_amt = '';

				bet_amt = e.target.total_bet_amt

				if(is_dt_tie) {
					bet_amt = (chip.chip_amt)
				}

				if(bet_amt > 999 && bet_amt < 1000000) {
					bet_amt = bet_amt/1000 + "K"
				} else if(bet_amt >= 1000000){
					bet_amt = bet_amt/1000000 + "M"
				}

				let text = new createjs.Text(bet_amt, "18px bebasNeue","#000");
				text.textAlign = "center";
				text.textBaseline = "middle";
				text.x = (instance.getTransformedBounds().width/2);
				text.y = (instance.getTransformedBounds().height/2);
				text.is_text = true;

				chip_container.is_chip = true;
				chip_container.addChild(instance, text);
				chip_container.target_game = e.target;
				chip_container.is_win = false;

				chip_container.drop_area = e.target;
				chip_container.addEventListener("click", this.multibetDropevent.bind(this), false);

				if(e.pokerextra) {
					chip_container.pokerextra = true;
				}

				chip_container.regX = chip_container.getBounds().width/2;
				chip_container.regY = chip_container.getBounds().height/2

				chip_container.x = e.target.x + e.target.getBounds().width/2 ;
				chip_container.y = e.target.y + e.target.getBounds().height/2 ;
				chip_container.scaleY = chip_container.scaleX = 0;
				e.target.chips.push(chip_container);

				createjs.Tween.get(chip_container)
				.to({
					scaleX:1,
					scaleY:1
				},150);

				if(win) {
					chip_container.is_win = true;
				}

				e.target.parent.parent.chips_container.addChild(chip_container);
			} //end for

		  this.setTempMoney();

			return e.target.total_bet_amt
		},
		newRound (target) {
			target.chips_container.removeAllChildren();

			target.total_game_bet.text = 0;

			target.betarea.forEach((area)=>{
				area.total_bet_amt = 0;
				area.chips = [];
			});
		},
		removeBetChips(area, flag) {
			let flag1 = false;
			// area.chips_container.removeAllChildren();

			for(var x = 0; x < area.chips_container.children.length; x++) {
				if(!area.chips_container.children[x].pokerextra) {
					area.chips_container.removeChild(area.chips_container.children[x]);
					x --;
				}
			}


			let total_unconfirmed = 0;
			let total_confirmed = 0;

			if(_.find(area.previous_bet,'is_confirmed') ) {
				area.previous_bet.forEach((e) => {
					total_confirmed += e.amount
				})
				// flag1 = true;
			}

			area.betarea.forEach((e) => {
				total_unconfirmed += e.total_bet_amt
				e.total_bet_amt = 0;
				e.chips = [];
			});

			area.temp_money = Math.abs(total_unconfirmed - total_confirmed);
			// this.setTempMoney("decrement",area, "removeBetChips")
			//total_game_bet
			area.total_game_bet.text = 0
		},
		removeUnconfirmedChips (data, _target) {
			// if(!this.context.component_multibet.games.length) return;
			if(!this.context.component_multibet.selected_games.length) return;
			this.removeBetChips(_target);

			if(_.find(_target.previous_bet,'is_confirmed') ) {
				_target.is_confirmed = true;
			// }
			// if(_target.is_confirmed) {
				this.repeatBetEvent({currentTarget: {target_game: _target}}, true , true, true);
			} else {
				setTimeout(() => {
					_target.total_game_bet.text = 0;
					_target.totalGameBetAmt = 0;
					_target.betarea.forEach((area)=> {
						area.alreadyMax = false;
					})
				}, 1000)
				_target.isBetting = false;
				this.context.component_multibet.slaveButtonState(_target, "enabled");
			}

			this.setTempMoney();

			this.disableAllButtons(_target);
		},
		setTempMoney (type,target, from) {

			// if(type == "increment") {
			// 	this.multibet_amount += target.temp_money
			// } else if (type== "decrement") {
			// 	this.multibet_amount -= target.temp_money
			// 	target.temp_money = 0; //test
			// }
			let prevBetAmt = _.sumBy(this.context.component_multibet.selected_games, (e) => {
					return _.sumBy(e.temp_prev_bet, 'amount');
			});

			this.multibet_amount = _.sumBy(this.context.component_multibet.selected_games, (e) => {
					return _.sumBy(e.betarea, function (a) {
						if(!a.is_confirmed && !a.is_win) return a.total_bet_amt
					});
			});

			this.context.component_multibet.selected_games.forEach((e) => {
				e.betarea.forEach((a) => {
					if(a.is_win) {
					}
				});
			});

			this.multibet_amount -= prevBetAmt;

			if(this.multibet_amount <= 0) {
				this.multibet_amount = 0;
			}
		},
		calculatedMax (target) {
			let amt = 0;
			// if(target.max_betAmt > parseInt(this.context.context.user_money)) {
			amt =  window.casino == 'N' ? parseInt(this.context.context.user_money) : parseFloat(this.context.context.user_money);

			let remain = amt % window.currencyMultiplier;
			// check if there is remainder
			if(remain > 0) {
				amt -= remain;
			}
			// check if there is dropped bet somewhere else
			if(this.multibet_amount > 0) {
				amt -= this.multibet_amount;
			}
			// increments if already dropped a chip
			if(target.total_bet_amt > 0) {
				amt += target.total_bet_amt;
			}
			// }
			return amt;
		},
		getPokerBetAmt (target) {
			let amt = 0;

			let parentTarget = target.parent.parent;

			let bonusArea = parentTarget.betarea[1];
			let bonusPlusArea = parentTarget.betarea[2];
			let pocketArea = parentTarget.betarea[3];

			let anteMultiplier = 3;

			if(parentTarget.is_confirmed) {
				anteMultiplier = 2;
			}

			let calc = this.context.context.user_money -  this.multibet_amount;
			
			if(target.table == 'ante') {

				if((target.max_betAmt * anteMultiplier) > calc) {
					amt = (calc/3)
				} else {
					 amt = target.max_betAmt;
				}
				// amt = (target.max_betAmt * anteMultiplier) >= this.context.context.user_money ? (this.context.context.user_money/3) : target.max_betAmt;
			}

			if(target.table.indexOf('bonus') > -1 || target.table === 'pocket' ) {

				amt =  target.max_betAmt;

				if(this.multibet_amount + (parentTarget.betarea[0].total_bet_amt * 2) + amt > parseInt(this.context.context.user_money)) {
					
					let remain = (parentTarget.betarea[0].total_bet_amt * 2) + this.multibet_amount;
					amt = this.context.context.user_money - remain; 
					
				}
			}

			let minAmt = window.currencyMultiplier * window.userMultiplier;

			if(amt % minAmt > 0) {
				amt = amt - (amt % minAmt);
			}

			return amt >= target.min_betAmt && amt <= target.max_betAmt ? parseInt(amt) : null;
		},
		setActionLogs(type, target, chip) {
			
			let _t = target;
			_t.type = _t.currentSlave === 'supersix' ? 's' : _t.currentSlave === 'normal' || _t.currentSlave === 'classicPoker' || _t.currentSlave === '' ? 'r' : 'b';
			
			let amt = _.sumBy(target.bets, 'amount'); 
			let comment = `${type}, ${amt}`;
			let u_money = this.context.context.user_money;
			
			switch(type) {
				case "repeat":
					comment = 'repeat';
					_t.previous_bet.forEach( (e) => {
						comment += `, ${e.table_id} ${e.amount}`
					});
					break;
				case "insert":
					if(chip.chip_amt == 'max') {
						amt = target.total_bet_amt;
					} else {
						amt = chip.chip_amt
					}
					_t = target.parent.parent;
					comment = `${target.table}, ${amt}`;
					// u_money = u_money - _.sumBy(target.parent.parent.betarea, 'total_bet_amt');
					break;
				case "confirm":
					// u_money = u_money - _.sumBy(target.bets, 'amount');
					break;
			}
			
			_t.logs = [];
			_t.logs.push({action: type, "comment" : comment, user_money: u_money , timeDate : this.fnFormatTime(new Date().getTime(), 'MM/dd/yyyy HH:mm:ss')});
			
			if(type === 'insert'|| type === 'repeat'|| (type === 'clear' && !_t.is_confirmed)) {
				
				if(type == 'clear') {
					_t.logs.pop();	
					_t.logs.push({action: type});	
				}

        $.post(_t.links.logs, {logs : _t.logs, type : 'm'},  (response) => {
        });
			}
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
		}
	});

	return instance;
}
