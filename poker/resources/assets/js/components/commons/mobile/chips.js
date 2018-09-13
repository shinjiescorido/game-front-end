/**
 * chips.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/**common component. draws chips, handles chip click events, drop events and chip animations**/

import { createSprite, randomNum, createCardSprite, numberCounter, playSound } from '../../../factories/factories';

let instance = null;

export default(opposite_bet) => {
	instance = instance || new blu.Component({
		chips:[],
		actions: [],
		row_counter: {
			"1" : 0,
			"2" : 0,
			"3" : 0,
			"4" : 0,
			"5" : 0
		},
		total_ingame_bet: 0,
		ante_check_amt : 0,
		chip_names : [
			"single_chip_1",
			"single_chip_3",
			"single_chip_5",
			"single_chip_10",
			"single_chip_30",
			"single_chip_50",
			"single_chip_100",
			"single_chip_200",
			"single_chip_300",
			"single_chip_500",
			"single_chip_1000",
			"single_chip_max"
		],
		chipval : {
			'PTS': ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000', 'max'],
			'USD': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ],
			'KRW': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ],
			'CNY': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ],
			'IDR': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ],
      'JPY': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ],
			'default': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ]
		},
		init(set) {
			this.dollar = false;
			let chipsTemp = _.clone(window.user_chips).splice(0,4);

			if(!this.chipval[window.currencyAbbrev]) {
				this.chipval[window.currencyAbbrev] = this.chipval['default'];
			}

			if(_.difference(chipsTemp, this.chipval[window.currencyAbbrev]).length) {
				window.user_chips = _.cloneDeep(this.chipval[window.currencyAbbrev]).splice(0,5);
				$.post("/settings", {chips : window.user_chips}, (response) => {
				});
			}
			
			if (window.casino == 'SS') {
				this.dollar = true;
			}

			if (set) {
				for (var x = 0; x < this.chips.length; x++) {
					this.removeChild(this.chips[x]);
				} //end for
				this.chips = [];
			} //end if

			this.chips = this.makeChips();

			for (var x = 16; x >- 1; x--){
				this.addChild(this.chips[x]);
			} //end for

			this.chipEvent();
		},
		main() {
			let chip_bg = [];

			for (var x = 0; x < 4; x++) {
				chip_bg[x] = new createjs.Shape();
				chip_bg[x].graphics.ss(0.5).beginStroke("#fff").beginLinearGradientFill(["transparent","#636467"], [0, 1], 0, -60,0,20).drawCircle(0, 0, 50);
				chip_bg[x].x = this.context.stage.baseWidth - 78;
				chip_bg[x].y = (x * 120) + 145;
				this.addChild(chip_bg[x])
			} //end for

			this.init();
			this.dropEvent();
			
			// Click mask on load
			this.chipWrap = new createjs.Shape();
			this.chipWrap.graphics.beginFill('#000').drawRect(0, 0, 130, 480);
			this.chipWrap.x = 1135;
			this.chipWrap.y = 85;
			this.chipWrap.alpha = 0.01;
			this.addChild(this.chipWrap);

			this.chipWrap.addEventListener("click", (e) => {
        		this.context.component_messages.setMessage(window.language.prompts.promptfirstround, 1);
				return;
			});
		},
		cloneChips(){
			
			let fakechipsCon = new createjs.Container();

			let chips_bg = [];
			
			for (var x = 0; x < 4; x++) {

			chips_bg[x] = new createjs.Shape();
			chips_bg[x].graphics.ss(0.5).beginStroke("#fff").beginLinearGradientFill(["transparent","#636467"], [0, 1], 0, -60,0,20).drawCircle(0, 0, 50);
			chips_bg[x].shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);
			chips_bg[x].x = this.context.stage.baseWidth - 78;
			chips_bg[x].cache(-50,-50,100,100)
			chips_bg[x].y = (x * 120) + 145;

			fakechipsCon.addChild(chips_bg[x]);
			
			let fakechips = this.makeChips();
			if(x == 3)
				{
					for (var y = fakechips.length - 1 ; y >- 1; y--) {
						fakechipsCon.addChild(fakechips[y]);
					} //end for
				}
			} //end for

			return fakechipsCon;
		},
			
		makeChips(){
			
			let count = 0;
			let chip_name = "";
			let posY = -112;

			let posY1 = 16;

			let chips = [];
			
			this.chipsConf = this.context.chipsConf;

			for (var i = 0; i < 16; i++) {
				posY1--;

				if (i % 4 ==0 ) {
					let condition = (isNaN(parseInt(window.user_chips[count])) && window.user_chips[count].toLowerCase() =="max");

					if(condition) {
						chip_name = "chip_max";	
					} else {
						var c = _.find(this.chipsConf, function(e) { return e.chipval == window.user_chips[count]}).chipName.split("_")[2];
						chip_name = "chip_"+c;
					}

					count++;
					posY += 140;
				} //end if

				let sprite_instance = createSprite(this.context.getResources(chip_name), 72, 72, this.chips[i]);
				let sprite_mask = new createjs.Shape();
				sprite_mask.graphics.beginFill("#e1e9ff").drawCircle(25+ 12,25+ 12,25);
				let sprite_text = new createjs.Text("text","26px bebas-regular", "#000");
				sprite_text.set({textBaseline : "middle",textAlign : "center" , x : 36, y : 39});

				chips[i] = new createjs.Container();
				chips[i].addChild(sprite_instance, sprite_mask, sprite_text);
				chips[i].x = this.context.stage.baseWidth - 120;
				chips[i].ox = this.context.stage.baseWidth - 120;
				chips[i].scaleX = chips[i].scaleY = 1.18;
				chips[i].row = count;
				chips[i].y = (posY1 * 5) + posY;
				chips[i].oy = (posY1 * 5) + posY;
				chips[i].is_dropped = false;

				let chipAmt = (parseInt(window.user_chips[count-1]) * currencyMultiplier) * this.context.chipsMultiplier;
				let chipText = chipAmt;

				if (parseInt(chipText) > 999 && parseInt(chipText) < 1000000) {
					chipText = (chipText/1000) + 'K';
				} else if(parseInt(chipText) >= 1000000) {
					chipText = (chipText/1000000) + 'M';
				}
				else if (isNaN(parseInt(window.user_chips[count-1]))) {
					chipText = 'MAX';
				}

				chips[i].chip_value = isNaN(parseInt(window.user_chips[count-1])) ? "max" : parseInt(window.user_chips[count-1]);
				chips[i].chip_amt = isNaN(parseInt(chipAmt)) ? "max" : chipAmt;
				chips[i].children[2].text = chipText;

				// chips[i] = createSprite(this.context.getResources(chip_name), 72, 72, chips[i]);
				// chips[i].x = this.context.stage.baseWidth - 120;
				// chips[i].ox = this.context.stage.baseWidth - 120;
				// chips[i].scaleX = chips[i].scaleY = 1.18;
				// chips[i].row = count;
				// chips[i].y = (posY1 * 5) + posY;
				// chips[i].oy = (posY1 * 5) + posY;
				// chips[i].is_dropped = false;
				// chips[i].chip_amt = isNaN(parseInt(window.user_chips[count-1])) ? "max" : parseInt(window.user_chips[count-1]);

				// if (this.dollar) {
				// 	if (chips[i].chip_amt != 'max') {
				// 		chips[i].chip_amt = chips[i].chip_amt / 1000;
				// 	}
				// }
			} //end of for

			return chips;
		},
		chipEvent () {
			for (var x = 0; x < this.chips.length; x++) {
				this.chips[x].addEventListener("click", function (e) {

					if (this.selected_chip) {
						this.selected_chip.y = this.selected_chip.oy;
						this.selected_chip.shadow = null;
					} //end if

					playSound('chip1');

					let target = {
						'1': 0,
						'2': 4,
						'3': 8,
						'4': 12,
						'5' : 16
					};

					let ix = 0;
					ix = target[e.currentTarget.row];

					while (this.chips[ix].is_dropped) {
						ix++;
					}

					e.currentTarget = this.chips[ix];
					if (this.selected_chip && this.selected_chip.shadow) {
						createjs.Tween.removeTweens(this.selected_chip.shadow)
						this.selected_chip.shadow = null;
					}

					this.selected_chip = e.currentTarget;
					this.selected_chip.shadow = new createjs.Shadow("#fff", 0, 0, 0);

					let shadow = this.selected_chip.shadow;
					createjs.Tween.get(shadow,{loop:true})
					.to({
						blur: 20
					},500, createjs.Ease.quadInOut)
					.to({
						blur: 0
					},500, createjs.Ease.quadInOut)

					createjs.Tween.get(this.selected_chip)
					.to({
						y: this.selected_chip.oy - 20
					},150);
				}.bind(this))
			}
		},
		dropEvent () {
			let table_chip = {};
		    let areaMaxBet = 0;
		    let moneyCheck = 0;

			this.context.component_betBoard.on("click", (e) => {
				if(e.target.is_child) {
					e.target = e.target.parent
				}

				if (this.context.roundphase != 'startround') {
					return;
				}
				
				if (!this.context.component_timer.betting_start) { //checking if betting_start
					return;
				}

				// check other conditions
		        if (!this.context.checkStatus(e.target)) {
		          return;
		        }

				if (e.target.table_name === undefined) { //if clicked is chip on table and not the table
					e.target = e.target.dropped_at; //changing target to droparea stored on chip.dropped_at prop
				}

				if (!this.selected_chip || this.selected_chip === undefined ) { //cannot proceed if not selected chip
					return;
				}

				try {
					e.target.gotoAndStop(1)
				}
				catch(e) {
				}

				if ((e.target.total_bet_amt + this.selected_chip.chip_amt) > e.target.max_betAmt) {
					this.context.component_messages.setMessage(window.language.prompts.promptmaxbet,1);
					return;
				}

				/***checking for bet amt and user money*****/

				if (e.target.total_bet_amt == e.target.max_betAmt)  {
					this.context.component_messages.setMessage(window.language.prompts.promptmaxbet,1);
					return;
				}

				// Minimum money required to bet
		        let minMoney = parseInt(e.target.min_betAmt) * 3;
		        let maxMoney = parseInt(e.target.max_betAmt) * 3;

				if (e.target.table_name == 'ante') {
	        		if (minMoney > parseInt(this.context.context.user_money)) {
	              		this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
	              		return;
			        }
			    }

				if (this.selected_chip.chip_amt == "max") {
		          	areaMaxBet = parseInt(e.target.max_betAmt);

		          	let moneyLeft = parseInt(this.context.context.user_money)-parseInt(this.total_ingame_bet);
		          	moneyCheck = parseInt(this.context.context.user_money) - this.total_ingame_bet;

			        if(moneyCheck < e.target.total_bet_amt && e.target.total_bet_amt > 0) return;
			        if(moneyCheck < e.target.min_betAmt) return;

		          	this.total_ingame_bet -= parseInt(e.target.total_bet_amt);

		          	if (areaMaxBet > moneyCheck && parseInt(this.context.context.user_money) != 0) {
		            	if (moneyCheck == 0) {
		              		this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
		              		return;
		            	}

		            	// **** whole numbers divisble by 100***//
		            	let div = "1";
		            	for (var i = 0; i < parseInt(moneyCheck).toString().length-2; i++) {
		            		div = div.concat(0)
						}

						// New div calculation using smallest chip value
						if (parseInt(moneyCheck) > 1*window.currencyMultiplier) {
							div = 1*window.currencyMultiplier;
						}

						// Betting conditions
		          		if (e.target.table_name == 'ante') {
							moneyCheck = moneyCheck/3;

							if (e.target.total_bet_amt != 0) {
								if (this.context.component_gameButtons.is_confirmed_bet) {
									moneyCheck = (parseInt(this.context.context.user_money) + e.target.total_bet_amt) / 3;
								}
								else {
									moneyCheck = parseInt(this.context.context.user_money) / 3;
								}
							}

							if ((e.target.total_bet_amt * 3) > parseInt(this.context.context.user_money) - e.target.total_bet_amt) {
		          				this.total_ingame_bet += parseInt(e.target.total_bet_amt);
								return;
							}
						}	

		          		moneyCheck = parseInt((moneyCheck/parseInt(div))) * parseInt(div)
		            	this.total_ingame_bet += moneyCheck;
		          	}
		          	else {
						let anteBetArea = this.context.component_betBoard.bet_areas[0];
						let bonusBetArea = this.context.component_betBoard.bet_areas[1];
						let bonusplusBetArea = this.context.component_betBoard.bet_areas[2] ||
								{max_betAmt:0,total_bet_amt:0};
						let bonusTotalMaxBetAmt = bonusBetArea.max_betAmt + bonusplusBetArea.max_betAmt;

						var check = anteBetArea.total_bet_amt * 3;

						// if(anteBetArea.total_bet_amt > 0){
						if(_.find(this.context.component_gameButtons.previousBet,'is_confirmed')) {
							check = anteBetArea.total_bet_amt * 2;
						}

						let total = bonusTotalMaxBetAmt+check;
						let temp = parseInt(this.context.context.user_money)-(check+bonusTotalMaxBetAmt);

						var checkTemp = total;

						if(_.find(this.context.component_gameButtons.previousBet,'is_confirmed') ) {
							checkTemp = total ;
						} else {
							if(bonusBetArea.total_bet_amt + bonusplusBetArea.total_bet_amt > 0 ){
								// if(bonusBetArea.total_bet_amt > 0 || (anteBetArea.total_bet_amt <= 0 && bonusBetArea.total_bet_amt <= 0)){
								checkTemp = temp ;
							}
						}

						if (e.target.table_name.startsWith('bonus')) {
		          			if(e.target.table_name == "bonus") bonusTotalMaxBetAmt = bonusBetArea.max_betAmt + bonusplusBetArea.total_bet_amt;
		          			else if(e.target.table_name == "bonusplus") bonusTotalMaxBetAmt = bonusplusBetArea.max_betAmt + bonusBetArea.total_bet_amt;
		          			
		          			if((check+bonusTotalMaxBetAmt) > this.context.context.user_money) {
		          				if(e.target.table_name == "bonus") bonusTotalMaxBetAmt = bonusBetArea.min_betAmt + bonusplusBetArea.total_bet_amt;
		          				else if(e.target.table_name == "bonusplus") bonusTotalMaxBetAmt = bonusplusBetArea.min_betAmt + bonusBetArea.total_bet_amt;
		          				// bonusTotalMaxBetAmt =  bonusBetArea.min_betAmt + bonusplusBetArea.min_betAmt;
		          			}

			        		if ((check+bonusTotalMaxBetAmt) > this.context.context.user_money) { // - anteBetArea.total_bet_amt) {
								this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
				          		return;
			        		}
							let tempMoney = this.getDivisible(this.context.context.user_money); //parseInt((this.context.context.user_money/parseInt(div))) * parseInt(div); 

			        		if(check == tempMoney || tempMoney == (check+bonusplusBetArea.total_bet_amt + bonusBetArea.total_bet_amt)) {
			        			this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
			          			return;
			        		}
			        		
			        		if ((total) > parseInt(this.context.context.user_money)) { // - anteBetArea.total_bet_amt) {

			        			let bonusMoney = this.getDivisible((this.context.context.user_money) - check);

			        			if(bonusMoney >= e.target.min_betAmt && bonusMoney <= e.target.max_betAmt) {
			        				this.selected_chip.chip_amt = bonusMoney;
			        				this.selected_chip.hitBonus = true;
			        			} else {
			        				this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
			          				return;
			        			}
			        		}
			        	}

						if ((total) > parseInt(this.context.context.user_money) && !e.target.table_name.startsWith('bonus')) { // - anteBetArea.total_bet_amt) {
							this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
			          		return;
		        		}

						if (maxMoney > parseInt(this.context.context.user_money)) {
							this.total_ingame_bet += parseInt(e.target.max_betAmt) / 3;
						}
						else {
							this.total_ingame_bet += parseInt(e.target.max_betAmt);
						}
		          	}
		        } // end if
		        else {
		          	this.total_ingame_bet += parseInt(this.selected_chip.chip_amt);

		          	let anteBetArea = this.context.component_betBoard.bet_areas[0];
		        	let bonusBetArea = this.context.component_betBoard.bet_areas[1];
					let bonusplusBetArea = this.context.component_betBoard.bet_areas[2] ||
								{max_betAmt:0,total_bet_amt:0};

		          	let total = this.total_ingame_bet * 3;

		          	if(e.target.table_name == "ante" ) {
		          		total = this.total_ingame_bet * 3;
		          	}

		          	if(_.find(this.context.component_gameButtons.previousBet,'is_confirmed')) {
						total = (anteBetArea.total_bet_amt * 2) + this.total_ingame_bet;
	        		} else {
			          	if(e.target.table_name == 'bonus' || e.target.table_name == 'bonusplus') {
			          		total = (anteBetArea.total_bet_amt * 3) + (this.total_ingame_bet - (anteBetArea.total_bet_amt));
			          	}
	        		}

		          	if ((total) > parseInt(this.context.context.user_money)) {
						this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
		          		this.total_ingame_bet -= parseInt(this.selected_chip.chip_amt);
		          		return;
		          	}

					if (e.target.table_name == 'bonus' || e.target.table_name == 'bonusplus') {
		        		let anteBetArea = this.context.component_betBoard.bet_areas[0];

		        		if ((anteBetArea.total_bet_amt * 2) >= parseInt(this.context.context.user_money)) {
							this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
			          		this.total_ingame_bet -= parseInt(this.selected_chip.chip_amt);
			          		return;
		        		}
		        	}
		        }// end else

				if (parseInt(this.total_ingame_bet) > parseInt(this.context.context.user_money)) {
					if (this.selected_chip.chip_amt == "max") {
						this.total_ingame_bet -= e.target.max_betAmt;
					} // end if
					else {
						this.total_ingame_bet -= this.selected_chip.chip_amt;
					} // end else

					this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
					return;
				}

				table_chip = _.clone(this.selected_chip.children[0]);
				table_chip.scaleX = table_chip.scaleY = e.target.chip_drop_scale;
				table_chip.gotoAndStop(e.target.chip_anim_toPlay);
				table_chip.dropped_at = e.target;
				table_chip.confirmed_bet = false;
				table_chip.chip_amt = this.selected_chip.chip_amt;
				e.target.chips.push(table_chip);

				try {
					let condition = opposite_bet(e.target.table_name,this.context.component_betBoard.bet_areas);

					if (condition) {
						e.target.chips = [];
						this.context.component_betBoard.checkTableHighlight();
						return;
					} // end if
				} //end try
				catch(e) {
				}

				let target_amt = parseInt(e.target.total_bet_amt); 
				let area_max = parseInt(e.target.max_betAmt); 
				let ante_area_amt = parseInt(this.context.component_betBoard.bet_areas[0].total_bet_amt); 
				let bonus_area_amt = parseInt(this.context.component_betBoard.bet_areas[1].total_bet_amt); 
				
				// ante raise area condition
				// if(this.selected_chip.chip_amt != "max") {
				// 	if(e.target.table_name =="ante") {
				// 		ante_area_amt +=  parseInt(this.selected_chip.chip_amt);
				// 	} else {
				// 		bonus_area_amt +=  parseInt(this.selected_chip.chip_amt);
				// 	}
					
				// 	this.ante_check_amt = ante_area_amt + bonus_area_amt
				// }
				// else if(this.selected_chip.chip_amt == "max") {
				// 	if(e.target.table_name =="ante") {
				// 		ante_area_amt +=  parseInt(e.target.max_betAmt);
				// 	} else {
				// 		bonus_area_amt +=  parseInt(this.context.component_betBoard.bet_areas[1].max_betAmt);
				// 	}
					
				// 	this.ante_check_amt = ante_area_amt + bonus_area_amt
				// }
				
				// if( ((ante_area_amt*2) + this.ante_check_amt) >  parseInt(this.context.temp_user_money)) {
				// 	this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
				// 	e.target.chips = []
				// 	return;
				// }


				this.context.component_gameButtons.repeatButton.visible = false;
				this.context.component_gameButtons.undoButton.visible = true;

				// === chip animation init
				let animate_chip = _.clone(this.selected_chip.children[0]);
				this.addChild(animate_chip);

				animate_chip.alpha = 1;
				animate_chip.scaleY = animate_chip.scaleX = 0.6;
				animate_chip.x = e.localX;
				animate_chip.y = e.localY;
				animate_chip.hitArea = e.target;

				let targetX = e.target.x + ((e.target.getTransformedBounds().width/2) - (animate_chip.getTransformedBounds().width / 2));
				let targetY = e.target.y + ((e.target.getTransformedBounds().height/2) - (animate_chip.getTransformedBounds().height / 2));
				let timeOut = 200;

				createjs.Tween.get(animate_chip)
				.to({x: targetX, y: targetY}, timeOut)
				.call((obj,parent)=>{
					parent.removeChild(obj);
				},[animate_chip, this])

				this.selected_chip.is_dropped = true;

				if (this.selected_chip.chip_amt != "max") {
		          	e.target.total_bet_amt += parseInt(table_chip.chip_amt);
		        } 
		        else {
		          	e.target.total_bet_amt = e.target.max_betAmt;

		          	if (areaMaxBet > moneyCheck) {
		            	e.target.total_bet_amt = moneyCheck;
		          	}
		          	else if (maxMoney > parseInt(this.context.context.user_money)) {
		          		// let amt = parseInt(parseInt(e.target.max_betAmt) / 3)
		          		let amt = parseInt(parseInt(this.context.context.user_money) / 3)

		          		let div = "1";
		            	for (var i = 0; i < parseInt(amt).toString().length-2; i++) {
		            		div = div.concat(0)
						}

						if((parseInt(amt).toString().length-2) == 0) {
							div = "10"
						}

						// New div calculation using smallest chip value
						if (parseInt(amt) > 1*window.currencyMultiplier) {
							div = 1*window.currencyMultiplier;
						}
						
		          		amt = parseInt((amt/parseInt(div))) * parseInt(div);

		            	e.target.total_bet_amt = amt;
		          	}
		        } // end if

				this.selected_chip.alpha = 0;
				this.selectNewChip();

				if(!e.target.is_advanced_bet) {
					this.actions.push({
						chip_amount_used:table_chip.chip_amt,
						drop_area: e.target
					});
				}

				if (this.context.component_betindicator) {
					this.context.component_betindicator.betindicator_container.x =  e.target.x + e.target.getTransformedBounds().width/2;
					this.context.component_betindicator.betindicator_container.y = e.target.y - 20
					this.context.component_betindicator.setChildIndex(this.context.component_betindicator.betindicator_container, this.context.component_betBoard.children.length-1)
					this.context.component_betindicator.setIndicatorText(e.target.total_bet_amt);
				} // end if

				if (e.target.bet_amt_text) {
					e.target.bet_amt_text.text = e.target.total_bet_amt.toLocaleString();
				}

				setTimeout( () => {
          this.context.component_gameButtons.is_confirmed_bet = false;
					if(!this.context.component_timer.betting_start) return;
					this.changeCurrentChips(table_chip,e.target, false, false, true);
				},timeOut)

				this.context.component_gameButtons.checkButtonState();
			});
		},
		selectNewChip () {
			this.row_counter[this.selected_chip.row]++;

			if (this.row_counter[this.selected_chip.row] == 4) {
				this.row_counter[this.selected_chip.row] = 0
				this.chips.forEach( (e) => {
					if (e.row == this.selected_chip.row)	{
						e.alpha = 1
						e.y = e.oy;
						e.is_dropped = false;
					} //end if
				}) //end foreach
			} // end if

			let chip_x = ((this.selected_chip.row *4)-4)+this.row_counter[this.selected_chip.row];

			this.selected_chip =  this.chips[chip_x];
			createjs.Tween.get(this.selected_chip)
			.to({
				y: this.selected_chip.oy - 20
			},100)
		},
		changeCurrentChips(chip,target,is_confirmed,no_anim,toLog) {
			if(toLog) {
				this.context.callback(target, 'insert');
			}

			let avail_chips = [];
			let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];
			let targetAmt = parseInt(target.total_bet_amt);

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
			}

			if (isNaN(parseInt(chip.chip_amt))) {
		        if (!chip.chip_amt || chip.chip_amt.toLowerCase() != "max"){
		          	targetAmt = chip;
		          	target.total_bet_amt = chip;
		        }
			}

			let count = avail_chips.length-1;
			let chips = [];

			for (var x = avail_chips.length-1;x > -1;x--) {
				if (targetAmt == avail_chips[x].value) {
					chips.push(avail_chips[x]);
					break;
				} else if (targetAmt-avail_chips[x].value >= 0){
					targetAmt -= avail_chips[x].value;
					chips.push(avail_chips[x]);
					x++;
				}
			}

			let instance = null;
			let instanceTxt = null;
			let instanceMask = null;
			let chipDataCon = null;

			if (chips.length > 2) {
				playSound("chip3")
			} else if (chips.length == 2) {
				playSound("chip2")
			} else {
				playSound("chip1")
			}

			target.chips.forEach((e) => {
				this.context.component_betBoard.removeChild(e);
			})

			target.chips = []

			for (var x = 0; x < chips.length; x++) {
				let chip_name = "chip_"+(chips[x].chip);
				
				this.chipsConf.forEach((c) => {
					if(chips[x].chip == c.chipval) {
						chip_name = "chip_"+c.chipName.split("_")[2]
					}
				});

				instance = createSprite(this.context.getResources(chip_name), 72, 72, instance);
				instance.scaleX = instance.scaleY = target.chip_drop_scale;
				instance.regX = instance.getBounds().width / 2;
        		instance.regY = instance.getBounds().height / 2;
        		instance.x = instance.y = 0;
        		instance.confirmed_bet = false;
				instance.scaleX = instance.scaleY = target.chip_drop_scale;
				instance.alpha = 1;
				instance.chip_amt = chips[x].value;

				if (is_confirmed) {
					instance.confirmed_bet = true
				} // end if

				instance.gotoAndStop(target.chip_anim_toPlay);
				instance.dropped_at = target;

				//Chip container init and stacking
				chipDataCon = new createjs.Container();
		        chipDataCon.x = target.x + target.getTransformedBounds().width / 2
		        chipDataCon.y = (target.y + target.getTransformedBounds().height / 2) - (target.chips.length * 4);
		        chipDataCon.hitArea = target;
		        chipDataCon.addChild(instance);

		        //Bet mask
				instanceMask = new createjs.Shape();
				instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 18);
				instanceMask.x = instanceMask.y = 0;
				chipDataCon.addChild(instanceMask);

				//Bet amount text
				let totalBet = target.total_bet_amt;
	          	let instanceAmt = totalBet;

				if (parseInt(totalBet) > 999) {
					totalBet = target.total_bet_amt / 1000;
	          		instanceAmt = totalBet+"k";
				}

	          	if (parseInt(totalBet) > 999) {
	            	instanceAmt = totalBet/1000+'M';
	          	}

				instanceTxt = new createjs.Text(instanceAmt,'normal 19px bebas-regular','#000');
				instanceTxt.textBaseline = 'middle';
				instanceTxt.textAlign = 'center';
				instanceTxt.x = instanceTxt.y = 0;
				chipDataCon.addChild(instanceTxt);

				if (!target.is_advanced_bet) {
					instanceTxt.scaleY = 0.7;
					instanceMask.scaleY = 0.7;
				}

				if (instanceTxt.text.toString().length > 4) {
					instanceTxt.font = 'normal 17px bebas-regular'
				}

				target.chips.push(chipDataCon);
				this.context.component_betBoard.addChild(chipDataCon);
			} //end for

			this.context.component_betBoard.checkTableHighlight();
		},
		getSavedBets() {
			if (!window.sample_saved_bets.length)  {
				return;
			} // end if

			if (this.context.component_dealer.round_id!=window.bets.round_id) {
				this.context.component_betBoard.clearTableChipBets();
				return;
			} //end if

			for (var x = 0; x < this.context.component_betBoard.bet_areas.length; x++) {
				for (var i = 0;i<window.sample_saved_bets.length;i++) {
					if (window.sample_saved_bets[i].table_id == this.context.component_betBoard.bet_areas[x].table_name) {
						this.context.component_gameButtons.is_confirmed_bet = true;
						this.changeCurrentChips(window.sample_saved_bets[i].bet_amt,this.context.component_betBoard.bet_areas[x], true);
						this.context.component_gameButtons.previousBet.push({
							"amount" : window.sample_saved_bets[i].bet_amt,
							"table_id": window.sample_saved_bets[i].table_id,
						});
					} //end if
				} //end for
			} //end for

			this.context.component_gameButtons.checkRepeatButton();
		},
		removeBetAreaChips (table,index) {
			for (var x = 0; x < table.chips.length; x++) {
				this.context.component_betBoard.removeChild(table.chips[x]);
			} // end for

			table.chips = [];
			table.total_bet_amt = 0;

			if (table.graphics) {
				table.normal_state(table,index)
			} // end if
			else {
				table.gotoAndPlay("steady");
			} // end else
		},
		getDivisible (amt) {
			let div = "1";
			for (var i = 0; i < parseInt(amt).toString().length-2; i++) {
				div = div.concat(0)
			}
			if((parseInt(amt).toString().length-2) == 0) {
				div = "10"
			}
			// New div calculation using smallest chip value
			if (parseInt(amt) > 1*window.currencyMultiplier) {
				div = 1*window.currencyMultiplier;
			}

			amt = parseInt((amt/parseInt(div))) * parseInt(div); 
			return amt;
		}
	});

	return instance;
}
