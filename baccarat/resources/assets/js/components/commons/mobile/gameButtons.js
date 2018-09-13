/**
 * gameButtons.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** handles all button events **/

import timer_anim from '../timer-animation';
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
} from '../../../factories/factories';


let instance = null;
let timerAnim = timer_anim();

export default(link) => {
	instance = instance || new blu.Component({
		chips: [],
		is_confirmed_bet: false,
		previousBet : [],
		repeat:false,
		confirm:false,
		yourBets : [],

		process_confirm : false,
		process_clear : false,

		main() {
			let height = 166;
			let width = 470;
			let buttonposy = 0;
			let buttonposx = 0;

			this.x = this.context.stage.baseWidth - width;
			this.y = this.context.stage.baseHeight  - height;
			/**
			-------------------------------------
			gradient button backrounds
			-------------------------------------
			**/
			
			this.bg = new createjs.Shape();
			this.bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(-230,-62,470, 150);
			this.addChild(this.bg);

			this.gradient_background_1 = new createjs.Shape();
			this.gradient_background_1.graphics.ss(1.5).beginLinearGradientStroke(["#4c4b4d","#adacad"], [0, 1], 0, 5, 0, 25).beginLinearGradientFill(["#434244","#696a6d"], [0, 1], 0, 0, 0, 47).drawCircle(0,0,53);
			this.gradient_background_1.x = buttonposx;
			this.gradient_background_1.y = buttonposy;
			this.addChild(this.gradient_background_1);

			this.gradient_background_2 = new createjs.Shape();
			this.gradient_background_2.graphics.ss(1.5).beginLinearGradientStroke(["#4c4b4d","#adacad"], [0, 1], 0, 5, 0, 25).beginLinearGradientFill(["#434244","#696a6d"], [0, 1], 0, 0, 0, 47).drawCircle(0,0,53);
			this.gradient_background_2.x = this.gradient_background_1.x+(53*2)+15;
			this.gradient_background_2.y = buttonposy;
			this.addChild(this.gradient_background_2);

			this.gradient_background_3 = new createjs.Shape();
			this.gradient_background_3.graphics.ss(1.5).beginLinearGradientStroke(["#4c4b4d","#adacad"], [0, 1], 0, 5, 0, 25).beginLinearGradientFill(["#434244","#696a6d"], [0, 1], 0, 0, 0, 47).drawCircle(0,0,53);
			this.gradient_background_3.x = this.gradient_background_2.x+(53*2)+15;
			this.gradient_background_3.y = buttonposy;
			this.addChild(this.gradient_background_3);

			//adding timer between gradient and button
			// this.addChild(timerAnim)

			/**
			----------------------
			confirm button instance and confirm event test/sample
			----------------------
			**/

			// this.confirmButton = this.makeButtonSprite("confirm_button",136,134);
			this.confirmButton = this.makeConfirmButton();
			this.addChild(this.confirmButton);
			this.confirmButton.x = (buttonposx-0.5)+(53*2)+15;
			this.confirmButton.y = buttonposy - 2;

			// this.x = this.context.stage.baseWidth - 230;
			// this.y = this.context.stage.baseHeight  - 88;
			// let yourBets = [];

			this.confirmButton.on("click", () => {

				if(this.process_clear) return;
				if(this.process_confirm) return;

				if(this.is_confirmed_bet) return;

				if(this.context.component_betDetails.bet_amount > 0) {
					// this.context.context.user_money += this.context.component_betDetails.bet_amount;
				}

				this.context.component_betBoard.bet_areas.forEach((e) => {
					this.context.component_betBoard.bet_cnt += e.chips.length;
				});

				if(!this.context.component_betBoard.bet_cnt) {
					return;
				}

				if (!this.context.component_timer.betting_start) {
					return;
				} // end if

				playSound("click");

				let all_bet_amt = 0;
				this.yourBets = [];
				for(var x = 0;x<this.context.component_betBoard.bet_areas.length;x++) {
					if(this.context.component_betBoard.bet_areas[x].chips.length && !this.context.component_betBoard.bet_areas[x].is_advanced_bet) {
						let slave = window.slave === 'supersix' ? window.slave : 'classic';

						let condition1 = this.context.component_betBoard.bet_areas[x].slave === slave;
						let condition2 = false;

						if(this.context.isBalance) {
							if(this.context.portrait && this.context.component_betBoard.bet_areas[x].balanceBet) {
								condition2 = true;
							} 
							if(!this.context.portrait && !this.context.component_betBoard.bet_areas[x].balanceBet && !this.context.component_betBoard.bet_areas[x].portrait) {
								condition2 = true;
							}
						} else {
							if(this.context.component_betBoard.bet_areas[x].portrait === this.context.portrait) {
								condition2 = true;
							}
						}

						if(condition2 && condition1) {
							this.yourBets.push({
								"amount" : this.context.component_betBoard.bet_areas[x].total_bet_amt,
								"table_id": this.context.component_betBoard.bet_areas[x].table_name,
								"dividend": this.context.component_betBoard.bet_areas[x].payout_multiplier
							});	
							console.log(this.yourBets, "CONDFIRM", this.context.component_betBoard.bet_areas[x].portrait, this.context.component_betBoard.bet_areas[x].slave)
						}

						if(parseInt(this.context.component_betBoard.bet_areas[x].total_bet_amt) < this.context.component_betBoard.bet_areas[x].min_betAmt) {
							// this.context.component_messages.setMessage("less than min bet",1);

							// this.context.component_chips.removeBetAreaChips(this.context.component_betBoard.bet_areas[x],x);

							// this.yourBets =  _.filter(this.yourBets, (e) => { //do not insert less than min betss
							// 	if(e.table_id != this.context.component_betBoard.bet_areas[x].table_name) {
							// 		return e;
							// 	}
							// });
							// this.is_confirmed_bet = true;

							// this.context.component_betindicator.betindicator_container.x =  this.context.component_betBoard.bet_areas[x].x + this.context.component_betBoard.bet_areas[x].getTransformedBounds().width/2;
							// this.context.component_betindicator.betindicator_container.y = this.context.component_betBoard.bet_areas[x].y - 20
							// this.context.component_betindicator.setChildIndex(this.context.component_betindicator.betindicator_container, this.context.component_betBoard.children.length-1)
							// this.context.component_betindicator.setIndicatorText(this.context.component_betBoard.bet_areas[x].total_bet_amt);

							// this.context.component_messages.setMessage("less than min bet",1);

							// return;

							this.context.component_messages.setMessage(window.language.prompts.promptminbet,1);
							this.context.component_chips.removeBetAreaChips(this.context.component_betBoard.bet_areas[x],x);

							if(this.context.component_betBoard.bet_areas[x].table_name == "player" || this.context.component_betBoard.bet_areas[x].table_name == "banker") {
								this.context.component_betBoard.bet_areas.forEach((area, index) => {
									this.context.component_chips.removeBetAreaChips(area,index);
								})
								this.yourBets = [];
							}

							this.yourBets =  _.filter(this.yourBets, (e) => { //do not insert less than min betss
								if (e.table_id != this.context.component_betBoard.bet_areas[x].table_name) {
									return e;
								} //end if
							});
						}

					}

					for(var i = 0;i<this.context.component_betBoard.bet_areas[x].chips.length;i++) {
						this.context.component_betBoard.bet_areas[x].chips[i].confirmed_bet = true;
					}
				}
				this.is_confirmed_bet = true;

				for(var x = 0;x<this.yourBets.length;x++) {
					all_bet_amt += parseInt(this.yourBets[x].amount);
				}

				/** for bet-details **/
				// this.context.component_betDetails.bet_amount = all_bet_amt;
				// this.context.context.user_money -= this.context.component_betDetails.bet_amount;
				// this.context.component_betDetails.reinit(true);
				this.context.component_chips.total_ingame_bet = 0;
				/**end of for bet-details **/
				this.previousBet = this.yourBets;

				// this.showHideButton();

				// this.checkClearButton();
				// this.checkRepeatButton();
				// this.checkConfirmButton();

				this.context.actionCallback("confirm", this.yourBets);

				if(!this.yourBets.length) {
					this.process_confirm = false;
				}

				this.checkButtonState();
			});

			/**
			----------------------
			clear button instance and clear event sample
			----------------------
			**/

			// this.clearButton = this.makeButtonSprite("clear_button",114,114);
			this.clearButton = this.makeClearButton();
			this.clearButton.x = buttonposx+(53*4)+(15*2)
			this.clearButton.y = buttonposy

			this.addChild(this.clearButton);

			this.clearButton.on("click", () =>{
				if(this.process_confirm) return;
				if(this.is_clear) return;

				if (!this.context.component_timer.betting_start) {
					return;
				}
				this.is_clear = true;

				this.context.actionCallback("clear", this.context.component_betDetails.bet_amount);

				this.context.component_chips.actions = [];

			    this.clearButton.gotoAndStop("click")
				playSound("click");


				// if(this.process_confirm) return;

				// if(this.is_clear) return;

				// if (!this.context.component_timer.betting_start) {
				// 	return;
				// }

				// playSound("click");

				// this.context.actionCallback("clear", this.context.component_betDetails.bet_amount);

				// /** for bet-details **/
				// // if(this.is_confirmed_bet) {
				// 	this.context.context.user_money += this.context.component_betDetails.bet_amount;
				// // }

				// this.context.component_betDetails.bet_amount = 0;
				// this.context.component_betDetails.reinit(true);
				// /**end of for bet-details **/

				// this.is_confirmed_bet = false;
				// this.repeat = false;

				// this.yourBets = [];
				// // this.context.component_chips.actions = [];

				// //clears chips from table
				// this.context.component_betBoard.clearTableChipBets();

				// // this.checkClearButton();
				// // this.checkRepeatButton();
				// // this.checkUndoButton();
				// // this.checkConfirmButton();

				// this.context.component_chips.total_ingame_bet = 0;

				// this.clearButton.gotoAndStop("click");

				// this.context.component_betBoard.bet_cnt = 0;

				// // $.post(link.cancel, {round_id : this.context.component_dealer.round_id}, (response) => {
    //         // console.log("::::: delete ", response);
			 //    // });

				// this.checkButtonState();

			})

			/**
			----------------------
			undo button instance and clear event sample
			----------------------
			**/
			// this.undoButton = this.makeButtonSprite("undo_button",114,114);
			this.undoButton = this.makeUndoButton();
			this.undoButton.x = buttonposx;
			this.undoButton.y = buttonposy

			this.undoButton.visible = false;
			this.addChild(this.undoButton);

			this.undoButton.on("click", () => {

				// if(!this.checkConfirmButton()) return;
				if(this.context.component_chips.actions.length==1) {
					// this.showHideButton();
				}

				if(this.context.component_chips.actions.length - 1 < 0)  {
					return;
				}

				if (this.context.component_chips.actions[this.context.component_chips.actions.length-1].is_response)  {
					this.is_confirmed_bet = true;
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

				playSound("click");

				let amt = this.context.component_chips.actions[this.context.component_chips.actions.length-1].drop_area.total_bet_amt - this.context.component_chips.actions[this.context.component_chips.actions.length-1].chip_amount_used;
				this.context.actionCallback("undo", this.context.component_chips.actions[this.context.component_chips.actions.length-1]);
				
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

				this.context.component_chips.changeCurrentChips(amt,this.context.component_chips.actions[this.context.component_chips.actions.length-1].drop_area);

				this.context.component_chips.actions.splice(this.context.component_chips.actions.length-1,1);

				this.undoButton.gotoAndStop("click");
				this.checkButtonState();
				
				this.repeat = false;
			});

			/**
			----------------------
			repeat button instance and repeat event sample
			----------------------
			**/

			// this.repeatButton = this.makeButtonSprite("repeat_button",114,114);
			this.repeatButton = this.makeRepeatButton();
			this.repeatButton.x = buttonposx;
			this.repeatButton.y =  buttonposy
			this.addChild(this.repeatButton);

			this.repeatButton.addEventListener("click",()=>{
				if (!this.context.component_timer.betting_start) {
					return;
				} // end if


				if (this.is_confirmed_bet) {
					return;
				} // end if

				if(this.repeat) return;
				// var totalAmt = _.sumBy(['amount'], (prop) => {
				//     return _.sumBy(this.yourBets, parseInt(prop));
				// });

				// if(totalAmt > parseInt(this.context.context.user_money)) {
				// 	this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
				// 	return;
				// }

				let totalRepeatAmt = 0;
				for (var i = 0; i < this.previousBet.length; i++) {
					totalRepeatAmt += this.previousBet[i].amount;
				}
				if(totalRepeatAmt > parseInt(this.context.context.user_money)) {
					this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
					return;
				}

				playSound("click");

				this.context.actionCallback("repeat", this.previousBet);

				this.repeatBet();
				this.repeatButton.gotoAndStop('disabled');
				this.repeat = true;
				this.checkButtonState();
			});
		},

		changeTheme(new_theme) {
			this.bg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(-230,-62,470, 150);
		},

		makeConfirmButton () {
			let button = new confirmButton();
			button.container.set({scaleX: 0.94, scaleY: 0.94, y: 0, x:0});
			button.container.gotoAndStop('disabled');
			button.bg.alpha = 0;
			button.bg2.alpha = 0;
			button.container.updateCache();
			return button.container;
		},
		makeUndoButton(){
			let button = new undoButton();
			button.container.gotoAndStop('disabled');
			button.container.set({scaleX: 0.94, scaleY: 0.94, y: 0, x:0});
			button.bg.alpha = 0;
			button.bg2.alpha = 0;
			button.container.updateCache();
			return button.container;
		},
		makeClearButton(){
			let button = new clearButton();
			button.container.gotoAndStop('disabled');
			button.container.set({scaleX: 0.94, scaleY: 0.94, y: 0, x: 0});
			button.bg.alpha = 0;
			button.bg2.alpha = 0;
			button.container.updateCache();
			return button.container;
		},
		makeRepeatButton() {
			let button = new repeatButton();
			button.container.gotoAndStop('disabled');
			button.container.set({scaleX: 0.94, scaleY: 0.94, y: 0, x: 0, x: 0});
			button.bg.alpha = 0;
			button.bg2.alpha = 0;
			button.container.updateCache();
			return button.container;
		},

		cloneButtons(no_glow) {
			let cloneButtonsCon = new createjs.Container();
			cloneButtonsCon.x = this.context.stage.baseWidth - 230;
			cloneButtonsCon.y = this.context.stage.baseHeight  - 88;

			let gradient_background_1 = new createjs.Shape();
			gradient_background_1.graphics.ss(1.5).beginLinearGradientStroke(["#4c4b4d","#adacad"], [0, 1], 0, 5, 0, 30).beginLinearGradientFill(["#434244","#696a6d"], [0, 1], 0, 0, 0, 62).drawCircle(0,2,67);
			gradient_background_1.y = 12;
			gradient_background_1.cache(-70,-70,140,140)
			cloneButtonsCon.addChild(gradient_background_1);

			let gradient_background_2 = new createjs.Shape();
			gradient_background_2.graphics.ss(1.5).beginLinearGradientStroke(["#4c4b4d","#adacad"], [0, 1], 0, 5, 0, 30).beginLinearGradientFill(["#434244","#696a6d"], [0, 1], 0, 0, 0, 62).drawCircle(0,2,67);
			gradient_background_2.x = -140;
			gradient_background_2.y = 12;
			gradient_background_2.cache(-70,-70,140,140)
			cloneButtonsCon.addChild(gradient_background_2);

			let gradient_background_3 = new createjs.Shape();
			gradient_background_3.graphics.ss(1.5).beginLinearGradientStroke(["#4c4b4d","#adacad"], [0, 1], 0, 5, 0, 30).beginLinearGradientFill(["#434244","#696a6d"], [0, 1], 0, 0, 0, 62).drawCircle(0,2,67);
			gradient_background_3.x = 140;
			gradient_background_3.y = 12;
			gradient_background_3.cache(-70,-70,140,140)
			cloneButtonsCon.addChild(gradient_background_3);

			if(!no_glow)
			{
				gradient_background_1.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);
				gradient_background_2.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);
				gradient_background_3.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);
			}

			let confirmButton = this.makeConfirmButton();
			confirmButton.gotoAndStop("up");
			cloneButtonsCon.addChild(confirmButton);

			let clearButton = this.makeClearButton();
			clearButton.gotoAndStop("up");
			cloneButtonsCon.addChild(clearButton);

			let repeatButton = this.makeRepeatButton();
			repeatButton.gotoAndStop("up");
			cloneButtonsCon.addChild(repeatButton);


			return cloneButtonsCon;
		},

		responseClear () {
				// this.context.actionCallback("clear", this.context.component_betDetails.bet_amount);

				this.previousBet.forEach((e)=>{
					e.is_confirmed = false;
				})

				// this.context.context.user_money += this.context.component_betDetails.bet_amount;

				this.context.component_betDetails.bet_amount = 0;
				this.context.component_betDetails.reinit(true);

				this.is_confirmed_bet = false;

				this.yourBets = [];

				this.context.component_betBoard.clearTableChipBets();


				this.context.component_chips.total_ingame_bet = 0;

			    this.repeat = false

				this.is_clear = false
			 //    this.clearButton.gotoAndStop("click")
				// playSound("click");
				// this.clearButton.updateCache();

				this.context.component_betBoard.bet_cnt = 0;
				this.checkButtonState();
		},

		repeatBet (is_set, anim, is_response) {
			if(this.previousBet && this.previousBet.length) {
				for(var x=0;x<this.previousBet.length;x++) {
					for(var i =0;i<this.context.component_betBoard.bet_areas.length;i++) {
						
						let slave = window.slave === 'supersix' ? window.slave : 'classic';

						let condition1 = this.context.component_betBoard.bet_areas[i].slave === slave;
						let condition2 = false;

						if(this.context.isBalance) {
							if(this.context.portrait && this.context.component_betBoard.bet_areas[i].balanceBet) {
								condition2 = true;
							} 
							if(!this.context.portrait && !this.context.component_betBoard.bet_areas[i].balanceBet && !this.context.component_betBoard.bet_areas[i].portrait) {
								condition2 = true;
							}
						} else {
							if(this.context.component_betBoard.bet_areas[i].portrait === this.context.portrait) {
								condition2 = true;
							}
						}

						let condition3 = this.context.component_betBoard.bet_areas[i].table_name == this.previousBet[x].table_id;
						
						if(condition1 && condition2 && condition3) {
							this.context.component_chips.actions.push({
								drop_area : this.context.component_betBoard.bet_areas[i], 
								chip_amount_used : this.previousBet[x].amount,
								is_response : is_response
							})

							this.context.component_betBoard.bet_areas[i].total_bet_amt = this.previousBet[x].amount;
							this.context.component_chips.changeCurrentChips(this.previousBet[x].amount,this.context.component_betBoard.bet_areas[i],is_set, anim)
							if (!is_response) {
								this.context.component_chips.total_ingame_bet += this.previousBet[x].amount;
							}
						}
						//old
						// if(this.context.multiplayer) {
						// 	if(this.context.component_betBoard.bet_areas[i].table_name == this.previousBet[x].table_id && !this.context.component_betBoard.bet_areas[i].is_advanced_bet && this.context.component_betBoard.bet_areas[i].multiplayer) {
								
						// 		this.context.component_chips.actions.push({
						// 			drop_area : this.context.component_betBoard.bet_areas[i], 
						// 			chip_amount_used : this.previousBet[x].amount,
						// 			is_response : is_response
						// 		})

						// 		this.context.component_betBoard.bet_areas[i].total_bet_amt = this.previousBet[x].amount;
						// 		this.context.component_chips.changeCurrentChips(this.previousBet[x].amount,this.context.component_betBoard.bet_areas[i],is_set, anim)
						// 		if (!is_response) {
						// 			this.context.component_chips.total_ingame_bet += this.previousBet[x].amount;
						// 		}
						// 	}
						// } else {
						// 	if(this.context.component_betBoard.bet_areas[i].table_name == this.previousBet[x].table_id && !this.context.component_betBoard.bet_areas[i].is_advanced_bet && this.context.component_betBoard.bet_areas[i].singleplayer) {
						// 		this.context.component_chips.actions.push({
						// 			drop_area : this.context.component_betBoard.bet_areas[i], 
						// 			chip_amount_used : this.previousBet[x].amount,
						// 			is_response : is_response
						// 		})

						// 		this.context.component_betBoard.bet_areas[i].total_bet_amt = this.previousBet[x].amount;
						// 		this.context.component_chips.changeCurrentChips(this.previousBet[x].amount,this.context.component_betBoard.bet_areas[i],is_set, anim);
						// 		if (!is_response) {
						// 			this.context.component_chips.total_ingame_bet += this.previousBet[x].amount;
						// 		}
						// 	}
						// }
					}
				} //end of for loop
			}//end of if
			
			if(is_response) {
				this.context.component_chips.total_ingame_bet = 0;
			}
		},
		toggleMultiplayer (is_set, anim) {
			let data = null;
			data = this.context.component_chips.actions

			if(data.length) {
				for(var x=0;x<data.length;x++) {
					for(var i =0;i<this.context.component_betBoard.bet_areas.length;i++) {
						if(!this.context.multiplayer) {
							if((this.context.component_betBoard.bet_areas[i].table_name == data[x].drop_area.table_name || this.context.component_betBoard.bet_areas[i].table_name == data[x].drop_area) && this.context.component_betBoard.bet_areas[i].singleplayer) {
								this.context.component_betBoard.bet_areas[i].total_bet_amt = data[x].chip_amount_used;
								this.context.component_chips.total_ingame_bet += data[x].chip_amount_used;
								this.context.component_chips.changeCurrentChips(data[x].chip_amount_used == "max" ? this.context.component_betBoard.bet_areas[i].max_betAmt : data[x].chip_amount_used,this.context.component_betBoard.bet_areas[i],is_set, anim)
							}
						} else {
							if((this.context.component_betBoard.bet_areas[i].table_name == data[x].drop_area.table_name || this.context.component_betBoard.bet_areas[i].table_name == data[x].drop_area) && this.context.component_betBoard.bet_areas[i].multiplayer) {
								this.context.component_betBoard.bet_areas[i].total_bet_amt = data[x].chip_amount_used;
								this.context.component_chips.total_ingame_bet += data[x].chip_amount_used;
								this.context.component_chips.changeCurrentChips(data[x].chip_amount_used == "max" ? this.context.component_betBoard.bet_areas[i].max_betAmt : data[x].chip_amount_used,this.context.component_betBoard.bet_areas[i],is_set, anim)
								// this.context.component_chips.changeCurrentChips(data[x].chip_amount_used,this.context.component_betBoard.bet_areas[i],is_set, anim)
							}
						}
					}
				} //end of for loop
			}//end of if
		},
		makeButtonSprite(resource, width, height) {

			let data = {
				images: [this.context.getResources(resource)],
				frames: {width:width,height:height},
				animations: {
					"up" : [2],
					"click" : [3],
					"disabled" : [0],
					"after_click" : [1]
				}
			}

			let data_spriteSheet = new createjs.SpriteSheet(data);
			return new createjs.Sprite(data_spriteSheet,"disabled");
		},
		checkButtonState() {
			if (!this.context.component_timer.betting_start) {
				return;
			}
			//confirm check
		 	let unconfirmed_cnt = 0;

			this.context.component_betBoard.bet_areas.forEach(function(betarea) {
				if(_.filter(betarea.chips, function(e) { return !e.confirmed_bet }).length) unconfirmed_cnt ++
			});

			
			if(unconfirmed_cnt) {
				// setTimeout(()=> {
					this.confirmButton.gotoAndStop("up");
					this.undoButton.gotoAndStop("up");
				// }, 100)
				// this.confirmButton.updateCache();
				// this.undoButton.updateCache();

			} else if(!unconfirmed_cnt) {
				this.confirmButton.gotoAndStop("disabled");
				this.repeatButton.gotoAndStop("disabled");
				this.undoButton.gotoAndStop("disabled");
				console.log(unconfirmed_cnt)

				this.is_clear = false;
			}

			//clear check
			let chips_cnt = 0;

			this.context.component_betBoard.bet_areas.forEach(function(betarea) {
				chips_cnt += betarea.chips.length;
			});

			if(chips_cnt) {
				// setTimeout(()=> {
					this.clearButton.gotoAndStop("up");
				// }, 100)

				this.is_clear = false;
				// this.clearButton.updateCache();

			} else if(!chips_cnt){

				this.is_clear = true;

				this.clearButton.gotoAndStop("disabled");
				// this.clearButton.updateCache();

				this.undoButton.gotoAndStop("disabled");
				this.confirmButton.gotoAndStop("disabled");
				// this.confirmButton.updateCache();
			}

			// == undo button check
			if(unconfirmed_cnt && !this.repeat) {
				this.undoButton.visible = true;
				// setTimeout(()=> {
					this.undoButton.gotoAndStop("up");
				// }, 100)

				// this.undoButton.updateCache();
			} else if(!unconfirmed_cnt && this.repeat) {
				this.undoButton.gotoAndStop("disabled");
				// this.undoButton.updateCache();
			}

			if(!chips_cnt && this.previousBet.length) {
				this.undoButton.visible = false;
				this.repeatButton.visible = true
				// setTimeout(()=> {
					this.repeatButton.gotoAndStop("up")
				// }, 100)
				// this.repeatButton.updateCache();
			} else if(this.repeat && !unconfirmed_cnt){
				this.repeatButton.gotoAndStop("disabled")
				// this.repeatButton.updateCache();
			} else if(this.repeat && unconfirmed_cnt){
				this.repeatButton.gotoAndStop("disabled")
				// this.repeatButton.updateCache();
			}

			let temp = [];

			this.context.component_betBoard.bet_areas.forEach((cur) =>{

				if(parseInt(cur.total_bet_amt) > 0) {
					temp.push({
						table_id : cur.table_name,
						amount : cur.total_bet_amt,
						dividend : cur.payout_multiplier
					})
				}
			});

			if(this.previousBet.length && _.isEqual(this.previousBet, temp)) {
				this.undoButton.visible = false;
				this.repeatButton.visible = true;
				this.repeatButton.gotoAndStop("disabled")
				// this.repeatButton.updateCache()
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
		},
		disableAllButtons (no_time) {

			this.clearButton.gotoAndStop("disabled");
			// this.clearButton.updateCache();

			this.confirmButton.gotoAndStop("disabled");
			// this.confirmButton.updateCache();

			this.undoButton.gotoAndStop("disabled");
			// this.undoButton.updateCache();
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
		},
		
		redrawChips (data) {
			for(var x=0;x<data.length;x++) {
				for(var i =0;i<this.context.component_betBoard.bet_areas.length;i++) {
					let slave = window.slave === 'supersix' ? window.slave : 'classic';
					let condition = this.context.component_betBoard.bet_areas[i].slave === slave;
					let condition1 = this.context.component_betBoard.bet_areas[i].table_name == data[x].table;
					let condition2 = false;

					if(this.context.isBalance) {
						condition2 = false;
						if(this.context.portrait && this.context.component_betBoard.bet_areas[i].balanceBet) {
							condition2 = true;
						} 
						if(!this.context.portrait && !this.context.component_betBoard.bet_areas[i].balanceBet && !this.context.component_betBoard.bet_areas[i].portrait) {
							condition2 = true;
						}
					} else {
						if(this.context.component_betBoard.bet_areas[i].portrait === this.context.portrait) {
							condition2 = true;
						}
					}
					if(condition && condition1 && condition2) {
						this.context.component_betBoard.bet_areas[i].total_bet_amt = data[x].amount;
						for(var a = 0; a < this.context.component_chips.actions.length; a++) {
							if(this.context.component_chips.actions[a].drop_area.table_name == this.context.component_betBoard.bet_areas[i].table_name) {
								this.context.component_chips.actions[a].drop_area = this.context.component_betBoard.bet_areas[i]
							}
						}
						this.context.component_chips.changeCurrentChips(data[x].amount,this.context.component_betBoard.bet_areas[i], false, false)
					}
				}
			} //end of for loop
		},
    screenOrientation() {
      let height = 166;
      let width = 470;
      let buttonposy = 0;
      let buttonposx = 0;
      if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
	       width = 510;
	       height = 167;
	       buttonposy = -78;
	       buttonposx = 31;
	       this.x = 210;
	       this.y = this.context.stage.baseWidth  - (height+210);
	     } else {
	       width = 380;
	       height = 144;
	       buttonposy = 70;
	       buttonposx = 70;
	       this.x = this.context.stage.baseWidth - width;
	       this.y = this.context.stage.baseHeight  - height;
	     }

	     this.bg.graphics.clear().beginFill('#2b2b2b').drawRect(0,0,width, height);

	     this.gradient_background_1.x = buttonposx;
	     this.gradient_background_1.y = buttonposy;

	     this.gradient_background_2.x = this.gradient_background_1.x+(53*2)+15;
	     this.gradient_background_2.y = buttonposy;

	     this.gradient_background_3.x = this.gradient_background_2.x+(53*2)+15;
	     this.gradient_background_3.y = buttonposy;

	     this.confirmButton.x = buttonposx+(53*2)+15;
	     this.confirmButton.y = buttonposy - 2;
	     this.clearButton.x = buttonposx+(53*4)+(15*2)
	     this.clearButton.y = buttonposy
	     this.undoButton.x = buttonposx;
	     this.undoButton.y = buttonposy
	     this.repeatButton.x = buttonposx;
	     this.repeatButton.y =  buttonposy;


			//if have confirmed chips, redraw
  		let betareas = _.map(this.context.component_betBoard.bet_areas, function (e) {
  			if(e.chips.length) {
  				return {table : e.table_name, amount: e.total_bet_amt, unconfirmed: _.filter(e.chips, function (a) {return !a.confirmed_bet})}
  			}
  		});
  		//get data of chips on tabble
    	betareas = _.filter(betareas, function (e) {return e});

     	//remove all chpips
     	for(var x = 0; x < this.context.component_betBoard.bet_areas.length; x++) {
				for(var i = 0; i < this.context.component_betBoard.bet_areas[x].chips.length; i++) {
					this.context.component_betBoard.removeChild(this.context.component_betBoard.bet_areas[x].chips[i]);
					this.context.component_betBoard.bet_areas[x].chips.splice(this.context.component_betBoard.bet_areas[x].chips[i],1);
					i--;
					this.context.component_betBoard.checkTableHighlight();
				} //end for
			} //end for
			//redraw chips on specific table type
  		if(betareas.length) {
  			this.redrawChips(betareas)
  		}
    		// this.repeatBet(true, false, true)
    }

	});

	return instance;
}
