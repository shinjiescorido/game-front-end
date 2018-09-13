/**
* gameButtons.js
* @author Marjo Sobrecaray
* @since 2017.05.10
* @version 1.0
* Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** handles all button events **/

import timer_anim from './timer-animation';
import {
	createSprite,
	randomNum,
	createCardSprite,
	numberCounter,
	playSound,
	numberWithCommas,
	confirmButton,
	clearButton,
	undoButton,
	repeatButton
} from '../../factories/factories';

let instance = null;

export default(link) => {
	instance = instance || new blu.Component({
		chips: [],
		is_confirmed_bet: false,
		previousBet : [],
		repeat:false,
		confirm:false,
		yourBets : [],
		is_repeat_bet: false,

		process_confirm : false,
		process_clear : false,

		main() {

			let h = 180;
			this.x = this.context.stage.baseWidth /2;
			this.y = this.context.stage.baseHeight  - (h);

			this.background = new createjs.Shape();
			this.background.graphics.f('#2b2b2b').drawRect(0,0,482,h);
			this.background.regX = 242;

			this.addChild(this.background);

			// === confirm button instance and event
			this.confirmButton = this.makeConfirmButton();
			this.addChild(this.confirmButton);

			// let yourBets = [];

			this.confirmButton.on("mousedown", () =>{
				if(this.process_clear) return;
				if(this.process_confirm) return;
				if(this.is_confirmed_bet) return;

				this.context.component_betBoard.bet_areas.forEach((e) => {
					this.context.component_betBoard.bet_cnt += e.chips.length;
				});

				if(!this.context.component_betBoard.bet_cnt) {
					return;
				}

				if (this.context.component_betDetails.bet_amount > 0) {
					// this.context.context.user_money += this.context.component_betDetails.bet_amount;
				}

				if(this.is_repeat_bet) return;

				if (!this.context.component_timer.betting_start) {
					return;
				} // end if

				playSound("click");
				let all_bet_amt = 0;

				this.repeat = false;
				this.yourBets = [];

				for (var x = 0; x < this.context.component_betBoard.bet_areas.length; x++) {
					if (this.context.component_betBoard.bet_areas[x].chips.length && !this.context.component_betBoard.bet_areas[x].is_advanced_bet) {
						this.yourBets.push({
							"amount" : this.context.component_betBoard.bet_areas[x].total_bet_amt,
							"table_id": this.context.component_betBoard.bet_areas[x].table_name,
							"dividend": this.context.component_betBoard.bet_areas[x].payout_multiplier
						});

						if (this.context.component_betBoard.bet_areas[x].total_bet_amt < this.context.component_betBoard.bet_areas[x].min_betAmt) {
							this.context.log({action : "fail" , comment : "Minimum bet required" , user_money : parseInt(this.context.context.user_money) });
							this.context.component_messages.setMessage(window.language.prompts.promptminbet,1);
							this.context.component_chips.removeBetAreaChips(this.context.component_betBoard.bet_areas[x],x);

							if(this.context.component_betBoard.bet_areas[x].table_name == "ante") {
								this.context.component_chips.removeBetAreaChips(this.context.component_betBoard.bet_areas[1],1);
								if(window.bet_type == "b") {
									this.context.component_chips.removeBetAreaChips(this.context.component_betBoard.bet_areas[2],2);
								}
								this.yourBets = [];
							}

							this.yourBets = _.filter(this.yourBets, (e) => { //do not insert less than min betss
								if (e.table_id != this.context.component_betBoard.bet_areas[x].table_name) {
									return e;
								} //end if
							});
						} // end if
					} //end if


					for (var i = 0; i <this.context.component_betBoard.bet_areas[x].chips.lengthth; i++) {
						this.context.component_betBoard.bet_areas[x].chips[i].confirmed_bet = true;
					} // end for
				}

				// Check if player can still bet
				if (this.context.is_create) {
					// let baseValueBets = _.cloneDeep(this.context.component_gameButtons.yourBets);
					//
					// for (var i = 0; i < baseValueBets.length; i++) {
					// 	baseValueBets[i].amount = (baseValueBets[i].amount / window.currencyMultiplier) * window.vendorData.bankerMultiplier;
					// }
					//
					// this.context.socket.emit('data', {
					// 	eventName: 'roombet',
					// 	gameName: 'Pai-Gow',
					// 	tableId: window.tableNum,
					// 	roundNum: parseInt(this.context.component_dealer.round_id),
					// 	roomId: window.vendorData.roomId,
					// 	isBet: true,
					// 	bankerMoney: this.context.banker_money,
					// 	userId: window.userId,
					// 	data: baseValueBets
					// }, (response) => {
					// 	console.log('roombet ', response);
					// 	if (parseInt(response.total) > parseInt(response.bankerMoney)) {
					// 		$('#mdlConfirmation').show();
					// 		$('#mdl_kick-con').show();
					// 		$('.mdl_msg_bet').show();
					// 		$('.mdl_message').css({'padding-top': '40px'});
					// 		$('#mdl_gen_message').html('Not enough banker money.');
					// 		$('.mdl_lobby span').html('Confirm');
					// 		$('.mdl_btn').hide();
					// 		$('.mdl_lobby').show();
					//
					// 		$('.mdl_lobby').click(function() {
					// 			if ($('.mdl_lobby span').html() == 'Confirm') {
					// 				$('#mdlConfirmation').hide();
					// 			}
					// 		});
					//
					// 		this.context.component_timer.removeUnconfirmedChips();
					// 		this.disableAllButtons();
					// 	}
					// 	else {
					// 		this.confirmBets();
					// 	}
					// });
				}
				else {
					this.confirmBets();
				}

			});

			this.clearButton = this.makeClearButton();
			this.addChild(this.clearButton);

			this.clearButton.on("mousedown", () => {
				if(this.process_confirm) return;
				if(this.is_clear) return;
				
				if(this.context.roundphase !== 'startround') return//poker speicific
				if (!this.context.component_timer.betting_start) return;

				this.is_clear = true;
				this.context.actionCallback("clear", this.context.component_betDetails.bet_amount);
				this.context.component_chips.actions = [];

				// Check if player can still bet
				if (this.context.is_create) {
					this.context.socket.emit('data', {
						eventName: 'roombet',
						gameName: 'Pai-Gow',
						tableId: window.tableNum,
						roundNum: parseInt(this.context.component_dealer.round_id),
						roomId: window.vendorData.roomId,
						isBet: false,
						bankerMoney: this.context.banker_money,
						userId: window.userId,
						data: this.context.component_gameButtons.yourBets
					}, function (e) {
					});
				}

				this.clearButton.gotoAndStop("click")
				playSound("click");
			});


			/**
			----------------------
			undo button instance and clear event sample
			----------------------
			**/
			// this.undoButton = this.makeButtonSprite("undo_button",114,114);
			this.undoButton = this.makeUndoButton();
			this.undoButton.visible = false;
			this.addChild(this.undoButton);

			this.undoButton.on("mousedown", () => {

				// if (!this.checkConfirmButton()) return;

				if (this.context.component_chips.actions.length==1) {
					// this.showHideButton();
				}

				if (this.context.component_chips.actions.length - 1 < 0)  {
					return;
				}

				if (this.context.component_chips.actions[this.context.component_chips.actions.length-1].is_response)  {
					return;
				}

				if (this.is_confirmed_bet) {
					return;
				} // end if

				if (this.context.component_chips.actions[this.context.component_chips.actions.length-2] && this.context.component_chips.actions[this.context.component_chips.actions.length-2].is_response)  {
					this.is_confirmed_bet = true;
				}

				if (!this.context.component_timer.betting_start) {
					return;
				}

				let amt = this.context.component_chips.actions[this.context.component_chips.actions.length-1].drop_area.total_bet_amt - this.context.component_chips.actions[this.context.component_chips.actions.length-1].chip_amount_used;

				if(this.context.component_chips.actions[this.context.component_chips.actions.length-1].chip_amount_used != "max") {
					this.context.component_chips.total_ingame_bet -= this.context.component_chips.actions[this.context.component_chips.actions.length-1].chip_amount_used;
				} else {
					this.context.component_chips.total_ingame_bet -= this.context.component_chips.actions[this.context.component_chips.actions.length-1].drop_area.total_bet_amt;
					let temp = _.filter(this.context.component_chips.actions, (e) => {
						if(e.drop_area.table_name == this.context.component_chips.actions[this.context.component_chips.actions.length-1].drop_area.table_name && e.chip_amount_used != "max")
						return e
					});

					let amt1 = this.context.component_chips.actions[this.context.component_chips.actions.length-1].drop_area.max_betAmt;

					let amt2 = temp.length ? _.sumBy(temp, 'chip_amount_used') : 0

					amt = amt1 + amt2 - amt1;
				}
				
				this.context.actionCallback("undo", this.context.component_chips.actions[this.context.component_chips.actions.length-1]);

				this.context.component_chips.changeCurrentChips(amt,this.context.component_chips.actions[this.context.component_chips.actions.length-1].drop_area);
				this.context.component_chips.actions.splice(this.context.component_chips.actions.length-1,1);
				playSound("click");
				this.undoButton.gotoAndStop("click");
				this.checkButtonState();
				this.repeat = false;
			});

			/**
			----------------------
			repeat button instance and repeat event sample
			----------------------
			**/
			this.repeatButton = this.makeRepeatButton();
			this.addChild(this.repeatButton);

			this.repeatButton.addEventListener("mousedown",()=>{
				if(this.context.roundphase !== 'startround') return//poker specific

				// *** normal betting *** //
				if(this.repeat) return;
				var totalAmt = _.sumBy(['amount'], (prop) => {
					return _.sumBy(this.yourBets, parseInt(prop));
				});

				if(totalAmt > parseInt(this.context.context.user_money)) {
					this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
					return;
				}

				let totalRepeatAmt = 0;
				for (var i = 0; i < this.previousBet.length; i++) {
					totalRepeatAmt += this.previousBet[i].amount;
				}

				if(totalRepeatAmt > parseInt(this.context.context.user_money)) {
					this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
					return;
				}

				if (!this.context.component_timer.betting_start) {
					return;
				} // end if

				if (this.is_confirmed_bet) {
					return;
				} // end if

				this.context.actionCallback("repeat", this.previousBet);

				this.repeat = true;
				this.repeatBet();
				// this.checkClearButton();

				this.repeatButton.gotoAndStop("click");
				playSound("click");
				this.checkButtonState();
			});
		},
		confirmBets() {
			let all_bet_amt = 0;
			this.is_confirmed_bet = true;

			for(var x = 0; x < this.yourBets.length; x++) {
				all_bet_amt += parseInt(this.yourBets[x].amount);
			}

			// === sets betdetails
			// this.context.component_betDetails.bet_amount = all_bet_amt;
			// this.context.context.user_money -= this.context.component_betDetails.bet_amount;
			// this.context.component_betDetails.reinit(true);
			this.context.component_chips.total_ingame_bet = 0;
			this.context.component_chips.ante_check_amt = 0;

			this.previousBet = this.yourBets;
			this.previousBet.forEach((e)=>{
				e.is_confirmed = true;
			})

			this.context.actionCallback("confirm", this.yourBets);

			if(!this.yourBets.length) {
				this.process_confirm = false;
			}

			this.confirmButton.gotoAndStop("click");
			this.checkButtonState();
		},

		responseClear () {
			this.previousBet.forEach((e)=>{
				e.is_confirmed = false;
			})
			
			this.context.component_betDetails.bet_amount = 0;
			this.context.component_betDetails.reinit(true,"responseClear");

			this.is_confirmed_bet = false;
			this.yourBets = [];

			this.context.component_betBoard.clearTableChipBets();
			this.context.component_chips.total_ingame_bet = 0;

			this.repeat = false
			this.is_clear = false

			this.context.component_betBoard.bet_cnt = 0;
			this.checkButtonState();
		},
		repeatBet (is_set, anim, is_response) {
			if (this.previousBet && this.previousBet.length) {
				for(var x = 0; x < this.previousBet.length; x++) {
					// Only ante is allowed on repeat
					if (this.context.roundphase == 'startround' && this.repeat) {
						if (this.previousBet[x].table_id == 'bonusplus' || this.previousBet[x].table_id == 'pocket' || this.previousBet[x].table_id == 'bonus') {
							continue;
						}
					}

					for(var i = 0; i < this.context.component_betBoard.bet_areas.length; i++) {
						if (this.context.component_betBoard.bet_areas[i].table_name == this.previousBet[x].table_id && !this.context.component_betBoard.bet_areas[i].is_advanced_bet)  {
							this.context.component_chips.actions.push({
								drop_area : this.context.component_betBoard.bet_areas[i],
								chip_amount_used : this.previousBet[x].amount,
								is_response : is_response
							});

							this.context.component_betBoard.bet_areas[i].total_bet_amt = this.previousBet[x].amount;
							this.context.component_chips.changeCurrentChips(this.previousBet[x].amount,this.context.component_betBoard.bet_areas[i],is_set, anim)
							if (!is_response) {
								this.context.component_chips.total_ingame_bet += this.previousBet[x].amount;
							}
						}
					}
				} //end of for loop
			}//end of if

			if(is_response) {
				this.context.component_chips.total_ingame_bet = 0;
			}
		},
		makeConfirmButton(type) {
			let button = new confirmButton(0.9);
			button.container.set({scaleX: 0.9, scaleY: 0.9, y: 14});
			button.container.gotoAndStop('disabled');
			return button.container;
		},

		makeUndoButton(){

			let button = new undoButton(0.8);
			button.container.gotoAndStop('disabled');
			button.container.set({scaleX: 0.8, scaleY: 0.8, y: 27, x : -(92+12)})
			return button.container;
		},

		makeClearButton(){
			let button = new clearButton(0.8);
			button.container.gotoAndStop('disabled');
			button.container.set({x : (92+12), scaleX: 0.8, scaleY: 0.8, y: 27})
			return button.container;
		},

		makeRepeatButton() {
			let button = new repeatButton(0.8);
			button.container.gotoAndStop('disabled');
			button.container.set({scaleX: 0.8, scaleY: 0.8, y: 27, x : -(92+12)})
			return button.container;
		},

		checkButtonState() {
			if (this.context.roundphase != 'startround') {
				this.repeatButton.gotoAndStop("disabled");
				return;
			}

			//confirm check
			if (!this.context.component_timer.betting_start) {
				return;
			}

			let unconfirmed_cnt = 0;

			this.context.component_betBoard.bet_areas.forEach(function(betarea) {
				if(_.filter(betarea.chips, function(e) { return !e.confirmed_bet }).length) unconfirmed_cnt ++
			});

			if(unconfirmed_cnt) {
				this.confirmButton.gotoAndStop("up");
				this.undoButton.gotoAndStop("up");
			} else if(!unconfirmed_cnt) {
				this.confirmButton.gotoAndStop("disabled");
				this.repeatButton.gotoAndStop("disabled");
				this.undoButton.gotoAndStop("disabled");

				this.is_clear = false;
			}

			//clear check
			let chips_cnt = 0;

			this.context.component_betBoard.bet_areas.forEach(function(betarea) {
				chips_cnt += betarea.chips.length;
			});

			if(chips_cnt) {
				this.clearButton.gotoAndStop("up");
				// this.is_clear = false
			} else if(!chips_cnt){
				this.clearButton.gotoAndStop("disabled");
				this.undoButton.gotoAndStop("disabled");
				this.confirmButton.gotoAndStop("disabled");
				// this.is_clear = true
			}

			// == undo button check
			if(unconfirmed_cnt && !this.repeat) {
				this.undoButton.visible = true;
				this.undoButton.gotoAndStop("up");
			} else if(!unconfirmed_cnt && this.repeat) {
				this.undoButton.gotoAndStop("disabled");
			}

			if(!chips_cnt && this.previousBet.length) {
				this.undoButton.visible = false;
				this.repeatButton.visible = true
				this.repeatButton.gotoAndStop("up")
			} else if(this.repeat && !unconfirmed_cnt){
				this.repeatButton.gotoAndStop("disabled")
			} else if(this.repeat && unconfirmed_cnt){
				this.repeatButton.gotoAndStop("disabled")
			}

			let temp = [];

			this.context.component_betBoard.bet_areas.forEach((cur) =>{

				if(parseInt(cur.total_bet_amt) > 0) {
					temp.push({
						table_id : cur.table_name,
						amount : cur.total_bet_amt,
						dividend : cur.payout_multiplier,
						is_confirmed : false
					})
				}
			});

			if(this.previousBet.length && _.isEqual(this.previousBet, temp)) {
				this.undoButton.visible = false;
				this.repeatButton.visible = true;
				this.repeatButton.gotoAndStop("disabled")
			}

			//response lalalala
			if(this.process_clear || this.process_confirm) {
				this.confirmButton.gotoAndStop("disabled");
			}

			if(this.process_confirm) {
				this.clearButton.gotoAndStop("disabled");
			}

			if (this.context.component_chips.actions.length && this.context.component_chips.actions[this.context.component_chips.actions.length-1].is_response) {
				this.undoButton.gotoAndStop("disabled");
				this.confirmButton.gotoAndStop("disabled");
			}

			if(this.context.roundphase !== 'startround') {
				this.disableAllButtons();
			}
		},

		disableAllButtons (no_time) {
			this.clearButton.gotoAndStop("disabled");
			this.confirmButton.gotoAndStop("disabled");
			this.undoButton.gotoAndStop("disabled");
			this.repeatButton.gotoAndStop("disabled");

			if(!no_time) {
				if(this.previousBet.length) {
					this.undoButton.visible = false;
					this.repeatButton.visible = true;
					this.repeatButton.gotoAndStop("up");
				} else {
					this.undoButton.visible = true;
					this.repeatButton.visible = false;
					this.repeatButton.gotoAndStop("disabled");
				}
			}
		}
		// showHideButton() {
		// 	if (!this.is_confirmed_bet) {
		// 		if (this.previousBet.length) {
		// 			this.repeatButton.visible = true;
		// 			this.undoButton.visible = false;
		// 		} else {
		// 			this.repeatButton.visible = false;
		// 			this.undoButton.visible = true;
		// 		}
		// 	} else {
		// 		if (this.previousBet.length) {
		// 			this.repeatButton.visible = true;
		// 			this.undoButton.visible = false;
		// 		}
		// 	}
		// },
		// checkConfirmButton () {
		// 	// return;
		// 	for(var x = 0;x<this.context.component_betBoard.bet_areas.length;x++) {
		// 		if (this.context.component_betBoard.bet_areas[x].chips.length) {
		// 			for(var i = 0;i<this.context.component_betBoard.bet_areas[x].chips.length;i++) {
		// 				if (!this.context.component_betBoard.bet_areas[x].chips[i].confirmed_bet && !this.context.component_betBoard.bet_areas[x].is_advanced_bet) {
		// 					this.confirmButton.gotoAndStop("up");
		// 					this.confirmButton.updateCache();
		// 					return true;
		// 				}
		// 				this.confirmButton.gotoAndStop("disabled");
		// 				this.confirmButton.updateCache();
		// 			}
		// 		}
		// 	}
		// },
		// checkClearButton() {
		// 	// return;
		// 	for(var x = 0;x<this.context.component_betBoard.bet_areas.length;x++ ){
		// 		if (this.context.component_betBoard.bet_areas[x].chips.length && !this.context.component_betBoard.bet_areas[x].is_advanced_bet) {
		// 			this.clearButton.gotoAndStop("up");
		// 			this.confirmButton.updateCache();
		// 			return;
		// 		}
		// 		this.clearButton.gotoAndStop("disabled")
		// 		this.confirmButton.updateCache();
		// 	}
		// },
		// checkUndoButton () {
		// 	return;
		// 	if (this.context.component_chips.actions.length) {
		// 		this.undoButton.gotoAndStop("up")
		// 		this.confirmButton.updateCache();
		// 	}
		// },
		// checkRepeatButton() {
		// 	return;
		// 	if (this.previousBet.length) {
		// 		this.repeatButton.gotoAndStop("up")
		// 		this.confirmButton.updateCache();
		// 	}
		// }
	});

	return instance;
}
