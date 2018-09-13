/**
* chips.js
* @author Marjo Sobrecaray
* @since 2017.05.10
* @version 1.0
* Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/**common component. draws chips, handles chip click events, drop events and chip animations**/

import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, fontFormat } from '../../factories/factories';

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
		chip_mouse : null,
		mouse_chip :null,
		total_ingame_bet: 0,
		ante_check_amt : 0,
		chip_names : [
			"chip_1",
			"chip_3",
			"chip_5",
			"chip_10",
			"chip_30",
			"chip_50",
			"chip_100",
			"chip_200",
			"chip_300",
			"chip_500",
			"chip_1000",
			"chip_max"
		],
		chipval : {
			'PTS': [ '1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000', 'max' ],
			'USD': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ],
			'KRW': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ],
			'CNY': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ],
			'IDR': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ],
			'JPY': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ],
			'default': [ '1', '3', '5', '10', '30', '50', '100', '200', '300', '500', '1000', 'max' ]
		},
		init(set) {
			this.dollar = false;

			if(!this.chipval[window.currencyAbbrev]) {
				this.chipval[window.currencyAbbrev] = this.chipval['default'];
			}

			if(_.difference(window.user_chips, this.chipval[window.currencyAbbrev]).length) {
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
				} // end for
				this.chips = [];
			} // end if

			this.chips = this.makeChips();

			for (var x = this.chips.length - 1 ; x >- 1; x--) {
				this.addChild(this.chips[x]);
			} //end for

			this.setChipEvent();
		},
		main() {

			let chips_bg = [];

			this.baseX = ((this.context.stage.baseWidth / 2) - 184);
			this.baseY = this.context.stage.baseHeight - 180 + 87 + 20 + 20;

			for (var x = 0; x < 5; x++) {
				chips_bg[x] = new createjs.Shape();
				chips_bg[x].graphics.ss(1).beginLinearGradientFill(["transparent","#636467"], [0, 1], 0, -40, 0, 20).drawCircle(0, 0, 42);
				chips_bg[x].alpha = 0.7;
				chips_bg[x].x = (x * 92) + this.baseX;
				chips_bg[x].y = this.baseY;
				this.addChild(chips_bg[x]);
			} //end for

			let modChipsBG = new createjs.Bitmap(this.context.getResources("mod-chip_cont"));
			modChipsBG.x = this.baseX + (4*92);
			modChipsBG.y = this.baseY;
			modChipsBG.regX = modChipsBG.regY = 32;
			this.addChild(modChipsBG);

			let modChipsState = new createjs.Bitmap(this.context.getResources("mod-chip_state"));
			modChipsState.x = modChipsBG.x + 16;
			modChipsState.y = modChipsBG.y + 15;
			modChipsState.regX = modChipsState.regY = 32;
			this.addChild(modChipsState);

			this.modChipsStateOverlay = new createjs.Shape();
			this.modChipsStateOverlay.graphics.f("#000").drawCircle(0,0,24);
			this.modChipsStateOverlay.x = modChipsState.x;
			this.modChipsStateOverlay.y = modChipsState.y;
			this.modChipsStateOverlay.alpha = 0.5;
			this.modChipsStateOverlay.regX = 15;
			this.modChipsStateOverlay.regY = 14;
			this.modChipsStateOverlay.visible = false;
			this.addChild(this.modChipsStateOverlay);

			this.modifyChipsHit = new createjs.Shape();
			this.modifyChipsHit.graphics.f("#000").drawCircle(0,0,33);
			this.modifyChipsHit.x = modChipsBG.x;
			this.modifyChipsHit.y = modChipsBG.y;
			this.modifyChipsHit.alpha = 0.01;
			this.modifyChipsHit.regX = this.modifyChipsHit.regY = -1;
			this.addChild(this.modifyChipsHit);

			if (this.context.junketAgent) {
				let modChipsWrap = new createjs.Shape();
				modChipsWrap.graphics.beginFill('#000').drawCircle(0, 0, 36);
				modChipsWrap.alpha = 0.7;
				modChipsWrap.x = this.baseX + (4*92);
				modChipsWrap.y = this.baseY;
				this.addChild(modChipsWrap);
			}

			this.modifyChipsHit.addEventListener("mousedown", (e) => {
				if (this.context.junketAgent) return;
				if (window.tutorial_enabled) return;

				this.context.component_menuChips.visible = !this.context.component_menuChips.visible;
				this.modChipsStateOverlay.visible = !this.modChipsStateOverlay.visible;

				if(this.context.component_menuChips.visible) {
					this.context.component_menuChips.reInitChips();
				}
			});

			this.init();
			this.dropEvent();
		},
		makeChips () {
			let width = 500;
			let chip_name = "";
			let tempScale = 0.95;
			let posX = 0;
			let posY = 0;
			let chips = [];
			this.chipsConf = this.context.chipsConf;

			for (var i = 0; i < 4; i++) {
				let condition = (isNaN(parseInt(window.user_chips[i])) && window.user_chips[i].toLowerCase() =="max");

				if(condition) {
					chip_name = "chip_max";
				} else {
					var c = _.find(this.chipsConf, function(e) { return e.chipval == window.user_chips[i]}).chipName.split("_")[2];
					chip_name = "chip_"+c;
				}

				posX = (i*92);

				let sprite_instance = createSprite(this.context.getResources(chip_name), 80, 80, chips[i]);
				sprite_instance.gotoAndStop(0);

				let spriteH = sprite_instance.getTransformedBounds().height/2;
				let spriteW = sprite_instance.getTransformedBounds().width/2;

				let sprite_text = new createjs.Text("text", fontFormat(28, 'normal', 'bebas', false), "#000");
				sprite_text.set({textBaseline : "middle",textAlign : "center" , x : spriteW, y : spriteH + 2});

				chips[i] = new createjs.Container();
				chips[i].addChild(sprite_instance, sprite_text);
				chips[i].x = posX + this.baseX;
				chips[i].ox = posX + this.baseX;
				chips[i].row = (i+1);
				chips[i].is_dropped = false;
				chips[i].counter = 0;
				chips[i].alpha = 1;
				chips[i].regX = spriteW
				chips[i].y = this.baseY - spriteH;
				chips[i].oy = this.baseY - spriteH;
				chips[i].set({scaleY : tempScale, scaleX : tempScale});

				if (this.context.junketAgent) {
					let wrap = new createjs.Shape();
					wrap.graphics.beginFill('#000').drawCircle(0, 0, 36);
					wrap.alpha = 0.7;
					wrap.x = 39.5;
					wrap.y = 41.5;
					chips[i].addChild(wrap);
				}

				let chipAmt = (parseInt(window.user_chips[i]) * currencyMultiplier) * this.context.chipsMultiplier;
				let chipText = chipAmt;

				if (parseInt(chipText) > 999 && parseInt(chipText) < 1000000) {
					chipText = (chipText/1000) + 'K';
				} else if (parseInt(chipText) >= 1000000) {
					chipText = (chipText/1000000) + 'M';
				} else if (isNaN(parseInt(window.user_chips[i]))) {
					chipText = 'MAX';
				}

				if(chipText.toString().indexOf('1') == 0) {
					chips[i].children[1].x -=2;
				}

				chips[i].chip_value = isNaN(parseInt(window.user_chips[i])) ? "max" : parseInt(window.user_chips[i]);
				chips[i].chip_amt = isNaN(parseInt(chipAmt)) ? "max" : chipAmt;
				chips[i].children[1].text = chipText;
			}

			return chips;
		},

		cloneChips(){

			let fakechipsCon = new createjs.Container();

			let chips_bg = [];

			for (var x = 0; x < 5; x++) {
				chips_bg[x] = new createjs.Shape();
				chips_bg[x].graphics.ss(1).beginLinearGradientFill(["transparent","#636467"], [0, 1], 0, -40, 0, 20).drawCircle(0, 0, 42);
				chips_bg[x].alpha = 0.7;
				chips_bg[x].x = (x * 90) + this.baseX;
				chips_bg[x].y = this.baseY;
				fakechipsCon.addChild(chips_bg[x]);

				let fakechips = this.makeChips();

				if(x == 4) {
					for (var y = fakechips.length - 1 ; y >- 1; y--) {
						fakechipsCon.addChild(fakechips[y]);
					} //end for
				}
			} //end for

			return fakechipsCon;
		},

		setChipEvent() {
			for (var x = 0; x < this.chips.length; x++) {
				this.chips[x].addEventListener("click", (e) => {
					if (this.context.junketAgent) return;
					this.chips.forEach((chip)=>{
						chip.shadow = null;
						chip.y = chip.oy;
					});

					if (this.selected_chip && this.selected_chip.chip_amt == e.currentTarget.chip_amt) {
						this.selected_chip.shadow = null;
						this.selected_chip = null;
						$("body").css({
							"cursor": "default"
						});
						return;
					} else if(this.selected_chip && this.selected_chip.chip_amt != e.currentTarget.chip_amt) {
						this.selected_chip.shadow = null;
						this.selected_chip = null;
					}

					playSound('chip1');

					let target = {
						'1' : 0,
						'2' : 4,
						'3' : 8,
						'4' : 12,
						'5' : 16
					};

					if (this.selected_chip && this.selected_chip.shadow) {
						createjs.Tween.removeTweens(this.selected_chip.shadow)
						this.selected_chip.shadow = null;
					} //end if

					this.selected_chip = e.currentTarget;
					this.selected_chip.shadow = new createjs.Shadow("#fff", 0, 0, 0);

					let shadow = this.selected_chip.shadow;
					createjs.Tween.get(shadow,{loop:true})
					.to({
						blur:10
					},500, createjs.Ease.quadInOut)
					.to({
						blur:0
					},500, createjs.Ease.quadInOut)

					createjs.Tween.get(this.selected_chip)
					.to({
						y : this.selected_chip.y - 10
					},150)

					if (this.mouse_chip) {
						this.removeChild(this.mouse_chip)
					}//end if

					let chip_name = "";

					if(this.selected_chip.chip_amt == "max") {
						chip_name = "chip_max";
					} else {
						chip_name = "chip_"+parseInt(this.selected_chip.chip_amt)
					}

					$("body").css({
						"cursor": "pointer"
					});
				}); //end click
			} //end for
		},
		// dropEvent() {
		// 	let table_chip = {};
		// 	let areaMaxBet = 0;

		// 	this.context.component_betBoard.on("click", (e) => {
		// 		let moneyCheck = 0;

		// 		if (e.target.is_child) {
		// 			e.target = e.target.parent
		// 		}

		// 		if (this.context.roundphase != 'startround') {
		// 			return;
		// 		}

		// 		if (!this.context.component_timer.betting_start) return;

		// 		if (e.target.table_name === undefined) {
		// 			e.target = e.target.dropped_at;
		// 		} // end if

		// 		if (!this.selected_chip || this.selected_chip === undefined ) {
		// 			return;
		// 		} // end if

		// 		try  {
		// 			let condition = opposite_bet(e.target.table_name,this.context.component_betBoard.bet_areas);

		// 			if (condition) {
		// 				e.target.chips = [];
		// 				this.context.component_betBoard.checkTableHighlight();
		// 				return;
		// 			} // end if
		// 		} catch(e) { } // end try catch

		// 		if ((e.target.total_bet_amt+this.selected_chip.chip_amt) > e.target.max_betAmt) {
		// 			this.context.component_messages.setMessage(window.language.prompts.promptmaxbet, 1);
		// 			return;
		// 		} // end if

		// 		if (e.target.total_bet_amt == e.target.max_betAmt) {
		// 			this.context.component_messages.setMessage(window.language.prompts.promptmaxbet, 1);
		// 			return;
		// 		} // end if

		// 		// Minimum money required to bet
		// 		let minMoney = parseInt(e.target.min_betAmt) * 3;
		// 		let maxMoney = parseInt(e.target.max_betAmt) * 3;

		// 		if (e.target.table_name == 'ante') {
		// 			if (minMoney > parseInt(this.context.context.user_money)) {
		// 				this.context.component_messages.setMessage(window.language.prompts.promptfunds, 1);
		// 				return;
		// 			}
		// 		}

		// 		if (!this.context.component_gameButtons.yourBets.length) {
		// 			if (e.target.table_name == 'bonus' || e.target.table_name == 'pocket' || e.target.table_name == 'bonusplus') {
		// 				this.context.component_messages.setMessage('Ante bet is required.', 1);
		// 				return;
		// 			}
		// 		}

		// 		console.log('totalBet: ', this.total_ingame_bet);

		// 		if (this.selected_chip.chip_amt == "max") {
		// 			let confirmedBets = this.context.component_gameButtons.yourBets;
		// 			areaMaxBet = parseInt(e.target.max_betAmt);

		// 			let confirmedAmt = _.sumBy(this.context.component_gameButtons.yourBets, (bets) => { if(bets.table_id === e.target.table_name) return bets.amount });
		// 			if(!confirmedAmt) confirmedAmt = 0;

		// 			// let moneyLeft = parseInt(this.context.context.user_money)-parseInt(this.total_ingame_bet);
		// 			moneyCheck = parseInt(this.context.context.user_money) - this.total_ingame_bet;
		// 			moneyCheck = moneyCheck % window.currencyMultiplier > 0 ? moneyCheck - (moneyCheck % window.currencyMultiplier) : moneyCheck;

		// 			console.log('checking11');

		// 			if (moneyCheck < e.target.total_bet_amt && e.target.total_bet_amt > 0) {
		// 				let temp = (this.context.context.user_money); // + additional);
		// 				temp = temp % window.currencyMultiplier > 0 ? temp - (temp % window.currencyMultiplier) : temp;
		// 				if((moneyCheck + e.target.total_bet_amt) > temp) {
		// 					this.context.component_messages.setMessage(window.language.prompts.promptfunds, 1);
		// 					return;
		// 				}
		// 			}

		// 			console.log('checking22: ', moneyCheck);

		// 			if ((moneyCheck + e.target.total_bet_amt) < e.target.min_betAmt) {
		// 				if (e.target.total_bet_amt) {}
		// 				this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
		// 				return;
		// 			}

		// 			console.log('checking33');

		// 			if (areaMaxBet > moneyCheck && parseInt(this.context.context.user_money) != 0) {
		// 				if (moneyCheck == 0) {
		// 					this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
		// 					return;
		// 				}

		// 				console.log('checking44');

		// 				if(e.target.total_bet_amt > 0) {
		// 					moneyCheck =  e.target.total_bet_amt + moneyCheck;
		// 				}

		// 				// **** whole numbers divisble by 100***//
		// 				let div = "1";
		// 				for (var i = 0; i < parseInt(moneyCheck).toString().length-2; i++) {
		// 					div = div.concat(0)
		// 				}

		// 				if((parseInt(moneyCheck).toString().length-2) == 0) {
		// 					div = "10"
		// 				}

		// 				// New div calculation using smallest chip value
		// 				if (parseInt(moneyCheck) > 1*window.currencyMultiplier) {
		// 					div = 1*window.currencyMultiplier;
		// 				}

		// 				// Betting conditions
		// 				if (e.target.table_name == 'ante') {
		// 					moneyCheck = moneyCheck/3;

		// 					if (e.target.total_bet_amt != 0) {
		// 						if (this.context.component_gameButtons.is_confirmed_bet) {
		// 							moneyCheck = (parseInt(this.context.context.user_money) + e.target.total_bet_amt) / 3;
		// 						}
		// 						else {
		// 							moneyCheck = parseInt(this.context.context.user_money) / 3;
		// 						}
		// 					}

		// 					if ((e.target.total_bet_amt * 3) > parseInt(this.context.context.user_money) - e.target.total_bet_amt) {
		// 						// this.total_ingame_bet += parseInt(e.target.total_bet_amt);
		// 						console.log(this.total_ingame_bet)
		// 						return;
		// 					}
		// 				}

		// 				this.total_ingame_bet -= parseInt(e.target.total_bet_amt);
		// 				moneyCheck = parseInt((moneyCheck/parseInt(div))) * parseInt(div);
		// 				this.total_ingame_bet += moneyCheck;
		// 			}
		// 			else {
		// 				let anteBetArea = this.context.component_betBoard.bet_areas[0];
		// 				let bonusBetArea = this.context.component_betBoard.bet_areas[1];
		// 				let bonusplusBetArea = this.context.component_betBoard.bet_areas[2] || {max_betAmt:0,total_bet_amt:0};
		// 				let bonusTotalMaxBetAmt = bonusBetArea.max_betAmt + bonusplusBetArea.max_betAmt;

		// 				var check = anteBetArea.total_bet_amt * 3;

		// 				console.log('checking55');

		// 				// Ante initial check
		// 				if (e.target.table_name == 'ante') {
		// 					if (!this.context.component_gameButtons.is_confirmed_bet) {
		// 						// if (e.target.max_betAmt*3 > moneyCheck+this.total_ingame_bet) {
		// 						// 	this.context.component_messages.setMessage(window.language.prompts.promptfunds, 1);
		// 						// 	return;
		// 						// }

		// 						console.log('checking66');

		// 						if (e.target.total_bet_amt != 0) {
		// 							if (e.target.max_betAmt*3 > parseInt(this.context.context.user_money)) {
		// 								// this.context.component_messages.setMessage(window.language.prompts.promptfunds, 1);
		// 								return;
		// 							}
		// 						}
		// 					}
		// 				}

		// 				// Bonus areas betting conditions
		// 				if (e.target.table_name == 'bonus' || e.target.table_name == 'pocket' || e.target.table_name == 'bonusplus') {
		// 					if (anteBetArea.total_bet_amt*2 >= moneyCheck) {
		// 						this.context.component_messages.setMessage(window.language.prompts.promptfunds, 1);
		// 						return;
		// 					}
		// 				}

		// 				// if(anteBetArea.total_bet_amt > 0){
		// 				if(_.find(this.context.component_gameButtons.previousBet,'is_confirmed')) {
		// 					check = anteBetArea.total_bet_amt * 2;
		// 				}

		// 				let total = bonusTotalMaxBetAmt+check;
		// 				let temp = parseInt(this.context.context.user_money)-(check+bonusTotalMaxBetAmt);

		// 				var checkTemp = total;

		// 				if(_.find(this.context.component_gameButtons.previousBet,'is_confirmed') ) {
		// 					checkTemp = total ;
		// 				}
		// 				else {
		// 					if(bonusBetArea.total_bet_amt + bonusplusBetArea.total_bet_amt > 0 ){
		// 						// if(bonusBetArea.total_bet_amt > 0 || (anteBetArea.total_bet_amt <= 0 && bonusBetArea.total_bet_amt <= 0)){
		// 						checkTemp = temp ;
		// 					}
		// 				}

		// 				if (e.target.table_name.startsWith('bonus')) {
		// 					if(e.target.table_name == "bonus") {
		// 						bonusTotalMaxBetAmt = bonusBetArea.max_betAmt + bonusplusBetArea.total_bet_amt;
		// 					}
		// 					else if(e.target.table_name == "bonusplus") {
		// 						bonusTotalMaxBetAmt = bonusplusBetArea.max_betAmt + bonusBetArea.total_bet_amt;
		// 					}

		// 					if((check+bonusTotalMaxBetAmt) > this.context.context.user_money) {
		// 						if(e.target.table_name == "bonus") {
		// 							bonusTotalMaxBetAmt = bonusBetArea.min_betAmt + bonusplusBetArea.total_bet_amt;
		// 						}
		// 						else if(e.target.table_name == "bonusplus") {
		// 							bonusTotalMaxBetAmt = bonusplusBetArea.min_betAmt + bonusBetArea.total_bet_amt;
		// 						}
		// 					}

		// 					if ((check+bonusTotalMaxBetAmt) > parseInt(this.context.context.user_money)) { // - anteBetArea.total_bet_amt) {
		// 						this.context.component_messages.setMessage(window.language.prompts.promptfunds, 1);
		// 						return;
		// 					}

		// 					let tempMoney = this.getDivisible(this.context.context.user_money); //parseInt((this.context.context.user_money/parseInt(div))) * parseInt(div);
		// 					if(check == tempMoney || tempMoney == (check+bonusplusBetArea.total_bet_amt + bonusBetArea.total_bet_amt)) {
		// 						this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
		// 						return;
		// 					}

		// 					if ((total) > parseInt(this.context.context.user_money)) { // - anteBetArea.total_bet_amt) {

		// 						let bonusMoney = this.getDivisible((this.context.context.user_money) - check);

		// 						console.log('checking77');

		// 						if(bonusMoney >= e.target.min_betAmt && bonusMoney <= e.target.max_betAmt) {
		// 							console.log('checking88: ', bonusMoney);

		// 							this.selected_chip.chip_amt = bonusMoney;
		// 							this.selected_chip.hitBonus = true;
		// 						} else {
		// 							this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
		// 							return;
		// 						}
		// 					}
		// 				}

		// 				// if ((total) > parseInt(this.context.context.user_money) && !e.target.table_name.startsWith('bonus')) { // - anteBetArea.total_bet_amt) {
		// 				// 	this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
		// 				// 	return;
		// 				// }

		// 				if (maxMoney > parseInt(this.context.context.user_money)) {
		// 					this.total_ingame_bet += parseInt(e.target.max_betAmt) / 3;

		// 					console.log('checking99: ', this.total_ingame_bet);
		// 				}
		// 				else {
		// 					this.total_ingame_bet -= parseInt(e.target.total_bet_amt);
		// 					this.total_ingame_bet +=  parseInt(e.target.max_betAmt);

		// 					console.log('checking10: ', this.total_ingame_bet);
		// 				}
		// 			}
		// 		} // end of max bet
		// 		else {
		// 			this.total_ingame_bet += parseInt(this.selected_chip.chip_amt);

		// 			let anteBetArea = this.context.component_betBoard.bet_areas[0];
		// 			let bonusBetArea = this.context.component_betBoard.bet_areas[1];
		// 			let bonusplusBetArea = this.context.component_betBoard.bet_areas[2] ||
		// 			{max_betAmt:0,total_bet_amt:0};

		// 			let total = this.total_ingame_bet * 3;

		// 			if(e.target.table_name == "ante" ) {
		// 				total = this.total_ingame_bet * 3;
		// 			}

		// 			if(_.find(this.context.component_gameButtons.previousBet,'is_confirmed')) {
		// 				total = (anteBetArea.total_bet_amt * 2) + this.total_ingame_bet;
		// 			} else {
		// 				if(e.target.table_name == 'bonus' || e.target.table_name == 'bonusplus') {
		// 					total = (anteBetArea.total_bet_amt * 3) + (this.total_ingame_bet - (anteBetArea.total_bet_amt));
		// 				}
		// 			}

		// 			if ((total) > parseInt(this.context.context.user_money)) {
		// 				this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
		// 				this.total_ingame_bet -= parseInt(this.selected_chip.chip_amt);
		// 				return;
		// 			}

		// 			if (e.target.table_name == 'bonus' || e.target.table_name == 'bonusplus') {
		// 				let anteBetArea = this.context.component_betBoard.bet_areas[0];

		// 				if ((anteBetArea.total_bet_amt * 2) >= parseInt(this.context.context.user_money)) {
		// 					this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
		// 					this.total_ingame_bet -= parseInt(this.selected_chip.chip_amt);
		// 					return;
		// 				}
		// 			}
		// 		} // end if
		// 		try {
		// 			e.target.gotoAndStop(1)
		// 		} catch(e) {}

		// 		console.log('checking11: ', this.total_ingame_bet);

		// 		table_chip = _.clone(this.selected_chip.children[0]); //_.clone(this.selected_chip) ;
		// 		table_chip.scaleX = table_chip.scaleY = e.target.chip_drop_scale;
		// 		table_chip.gotoAndStop(1);
		// 		table_chip.dropped_at = e.target;
		// 		table_chip.confirmed_bet = false;
		// 		table_chip.chip_amt = this.selected_chip.chip_amt;
		// 		table_chip.chip_value = this.selected_chip.chip_value;
		// 		e.target.chips.push(table_chip);

		// 		console.log('checking12: ', table_chip);

		// 		this.context.component_gameButtons.repeatButton.visible = false;
		// 		this.context.component_gameButtons.undoButton.visible = true;

		// 		let animate_chip = _.clone(this.selected_chip.children[0]); //_.clone(this.selected_chip);
		// 		this.context.component_betBoard.addChild(animate_chip);

		// 		animate_chip.alpha = 0;
		// 		animate_chip.scaleY = animate_chip.scaleX = 0.8;
		// 		animate_chip.x = e.localX;
		// 		animate_chip.y = e.localY;
		// 		animate_chip.gotoAndStop(1);
		// 		animate_chip.hitArea = e.target;

		// 		let targetX = e.target.x + ((e.target.getTransformedBounds().width/2) - (animate_chip.getTransformedBounds().width / 2));
		// 		let targetY = e.target.y + ((e.target.getTransformedBounds().height/2) - (animate_chip.getTransformedBounds().height / 2));
		// 		let timeOut = 200;

		// 		createjs.Tween.get(animate_chip)
		// 		.to({x: targetX, y: targetY, alpha : 1}, timeOut)
		// 		.call((obj,parent)=>{
		// 			parent.removeChild(obj);
		// 		},[animate_chip, this.context.component_betBoard])

		// 		this.selected_chip.is_dropped = true;

		// 		if (this.selected_chip.chip_amt != "max") {
		// 			e.target.total_bet_amt += parseInt(table_chip.chip_amt);
		// 		} else {
		// 			console.log('checking13: ', e.target);

		// 			e.target.total_bet_amt = e.target.max_betAmt;

		// 			console.log('checking14: ', moneyCheck);
		// 			if (areaMaxBet > moneyCheck) {
		// 				e.target.total_bet_amt = moneyCheck;
		// 			}

		// 			if (areaMaxBet*3 > moneyCheck) {
		// 				let dividedMaxBet = this.getDivisible(this.context.context.user_money/3);
		// 				e.target.total_bet_amt = dividedMaxBet;
		// 			}
		// 		} // end if

		// 		console.log('checking15: ', e.target);

		// 		if(!e.target.is_advanced_bet) {
		// 			this.actions.push({
		// 				chip_amount_used:table_chip.chip_amt,
		// 				drop_area: e.target
		// 			}); // end of push
		// 		}

		// 		if (this.context.component_betindicator) {
		// 			this.context.component_betindicator.betindicator_container.x =  e.target.x + e.target.getTransformedBounds().width/2;
		// 			this.context.component_betindicator.betindicator_container.y = e.target.y - 20
		// 			this.context.component_betindicator.setChildIndex(this.context.component_betindicator.betindicator_container, this.context.component_betBoard.children.length-1)
		// 			this.context.component_betindicator.setIndicatorText(numberWithCommas(e.target.total_bet_amt));
		// 		} // end if

		// 		setTimeout(() => {
		// 			this.context.component_gameButtons.is_confirmed_bet = false;
		// 			if(!this.context.component_timer.betting_start) return;
		// 			this.changeCurrentChips(table_chip,e.target, false, false, true);
		// 		},timeOut)

		// 		this.context.component_gameButtons.checkButtonState();
		// 	});
		// },

		dropEvent() {
			let table_chip = {};
	    let areaMaxBet = 0;
	    let moneyCheck = 0;

			this.context.component_betBoard.on("click", (e) => {
				if(this.context.junketAgent) return;
				if(e.target.is_child) {
					e.target = e.target.parent
				}

				if (this.context.component_gameButtons.process_confirm) return;

				if (this.context.roundphase != 'startround') {
					return;
				}

				if (!this.context.component_timer.betting_start) {
					if (!e.target.is_advanced_bet) {
						return;
					}
				} // end if

				//Advance bet
				if (e.target.is_advanced_bet) {
					if (this.context.checkStatus()) {
						return;
					}
				}

				if (e.target.table_name === undefined) {
					e.target = e.target.dropped_at;
				} // end if

				if (!this.selected_chip || this.selected_chip === undefined ) {
					return;
				} // end if


				try  {
					let condition = opposite_bet(e.target.table_name,this.context.component_betBoard.bet_areas);

					if (condition) {
						e.target.chips = [];
						this.context.component_betBoard.checkTableHighlight();
						return;
					} // end if
				} // end try
				catch(e) {

				} // end catch
				
				if ((e.target.total_bet_amt+this.selected_chip.chip_amt) > e.target.max_betAmt) {
					this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_maxbetexceeded, 1);
					return;
				} // end if

				if (e.target.total_bet_amt == e.target.max_betAmt) {
					this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_maxbetexceeded, 1);
					return;
				} // end if

				// Minimum money required to bet
        let minMoney = parseInt(e.target.min_betAmt) * 3;
        let maxMoney = parseInt(e.target.max_betAmt) * 3;

				if (e.target.table_name == 'ante') {
      		if (minMoney > parseInt(this.context.context.user_money)) {
        		this.context.component_messages.setMessage(window.language2.com_sub_rooms_notenoughbalance,1);
        		return;
	        }
		    }

		    if (!this.context.component_gameButtons.yourBets.length) {
					if (e.target.table_name == 'bonus' || e.target.table_name == 'pocket' || e.target.table_name == 'bonusplus') {
						this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_antebetrequired, 1);
						return;
					}
				}

				if (this.selected_chip.chip_amt == "max") {
        	areaMaxBet = parseInt(e.target.max_betAmt);

        	let moneyLeft = parseInt(this.context.context.user_money)-parseInt(this.total_ingame_bet);
        	moneyCheck = parseInt(this.context.context.user_money) - this.total_ingame_bet - this.context.component_multibetBetting2.fngetRawTotal();

        	if(moneyCheck < e.target.total_bet_amt && e.target.total_bet_amt > 0) {
            this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
        		return;	
        	}

        	console.log('check11: ')

        	if(moneyCheck < e.target.min_betAmt) {
            this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
        		return;
        	}

        	console.log('check22: ', moneyCheck)

        	this.total_ingame_bet -= parseInt(e.target.total_bet_amt);

        	if (areaMaxBet > moneyCheck && parseInt(this.context.context.user_money) != 0) {
          	if (moneyCheck == 0) {
          		this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
          		return;
          	}

        		console.log('check33')

          	// **** whole numbers divisble by 100***//
          	let div = "1";
          	for (var i = 0; i < parseInt(moneyCheck).toString().length-2; i++) {
          		div = div.concat(0)
						}

						if((parseInt(moneyCheck).toString().length-2) == 0) {
							div = "10"
						}

						// New div calculation using smallest chip value
						if (parseInt(moneyCheck) > 1*window.currencyMultiplier) {
							div = 1*window.currencyMultiplier;
						}
						
						// Betting conditions
						if (e.target.table_name == 'ante') {
							moneyCheck = moneyCheck/3;

							if (e.target.total_bet_amt != 0) {
								console.log("::::should be hereeeee", this.context.component_gameButtons.is_confirmed_bet)
								if (this.context.component_gameButtons.is_confirmed_bet) {
									moneyCheck = (parseInt(this.context.context.user_money) + e.target.total_bet_amt) / 3;
									console.log("::::should be hereeeee222", e.target.total_bet_amt, moneyCheck)
								}
								else {
									moneyCheck = parseInt(this.context.context.user_money) / 3;
								}
							}

							if ((e.target.total_bet_amt * 3) > parseInt(this.context.context.user_money) - e.target.total_bet_amt) {
		          	// this.total_ingame_bet += parseInt(e.target.total_bet_amt);
								return;
							}
						}

        		moneyCheck = parseInt((moneyCheck/parseInt(div))) * parseInt(div);
          	this.total_ingame_bet += moneyCheck;
        	}
          else {
        		console.log('check44')

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
							console.log('============================================', temp)
		        if(_.find(this.context.component_gameButtons.previousBet,'is_confirmed') ) {
							checkTemp = total ;
						} else {
							console.log('-----------------------------------------------')


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
						console.log('7777777777777777777777777777777777777')
		        		if ((check+bonusTotalMaxBetAmt) > parseInt(this.context.context.user_money)) { // - anteBetArea.total_bet_amt) {
									// this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
															console.log('0000000000000000000000000000000000000000')
		          		return;
		        		}

	        			console.log('check55')

								let tempMoney = this.getDivisible(this.context.context.user_money); //parseInt((this.context.context.user_money/parseInt(div))) * parseInt(div); 

		        		if(check == tempMoney || tempMoney == (check+bonusplusBetArea.total_bet_amt + bonusBetArea.total_bet_amt)) {
		        			console.log('final!')
		        			// this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
		          		return;
		        		}


	        			console.log('check66')
				        		
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

				      console.log('here!-->')

				      if ((total) > parseInt(this.context.context.user_money) && !e.target.table_name.startsWith('bonus')) { // - anteBetArea.total_bet_amt) {
				      	console.log('here!')
								// this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
			          return;
		        	}

        		console.log('check77')

        		if (maxMoney > parseInt(this.context.context.user_money)) {
          		this.total_ingame_bet += parseInt(e.target.max_betAmt) / 3;
		        }
		        else {
            	this.total_ingame_bet += parseInt(e.target.max_betAmt);
		        }
		      }
		    } 
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

		      if ((total) > parseInt(this.context.context.user_money)- this.context.component_multibetBetting2.fngetRawTotal()) {		  
						this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
        		this.total_ingame_bet -= parseInt(this.selected_chip.chip_amt);
        		return;
        	}

        	if (e.target.table_name == 'bonus' || e.target.table_name == 'bonusplus') {
        		let anteBetArea = this.context.component_betBoard.bet_areas[0];

        		if ((anteBetArea.total_bet_amt * 2) >= parseInt(this.context.context.user_money)- this.context.component_multibetBetting2.fngetRawTotal()) {
							this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
          		this.total_ingame_bet -= parseInt(this.selected_chip.chip_amt);
          		return;
        		}
        	}
		    } // end if

        	console.log('check99')

				if (parseInt(this.total_ingame_bet) > parseInt(this.context.context.user_money)) {
					if (this.selected_chip.chip_amt == "max") {
						this.total_ingame_bet -= parseInt(e.target.max_betAmt);
					} // end if
					else {
						this.total_ingame_bet -= parseInt(this.selected_chip.chip_amt);
					} // end else

					this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
					return;
				} // end if

        	console.log('check10')

				try {
					e.target.gotoAndStop(2)
				} //end try
				catch(e) { }

				table_chip = _.clone(this.selected_chip.children[0]); //_.clone(this.selected_chip) ;
				table_chip.scaleX = table_chip.scaleY = e.target.chip_drop_scale;
				table_chip.gotoAndStop(e.target.chip_anim_toPlay);
				table_chip.dropped_at = e.target;
				table_chip.confirmed_bet = false;
				table_chip.chip_amt = this.selected_chip.chip_amt;
				table_chip.chip_value = this.selected_chip.chip_value;
				e.target.chips.push(table_chip);

				this.context.component_gameButtons.repeatButton.visible = false;
				this.context.component_gameButtons.undoButton.visible = true;

				let animate_chip = _.clone(this.selected_chip.children[0]); //_.clone(this.selected_chip);
				this.context.component_betBoard.addChild(animate_chip);

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
				},[animate_chip, this.context.component_betBoard])

				this.selected_chip.is_dropped = true;

				if (this.selected_chip.chip_amt != "max") {
        	e.target.total_bet_amt += parseInt(table_chip.chip_amt);
        	if(this.selected_chip.hitBonus) { //reset
        		this.selected_chip.chip_amt = "max";
        	}
        	// e.target.total_value_amt += parseInt(table_chip.chip_value);
      	} 
        else {
        	e.target.total_bet_amt = e.target.max_betAmt;
        	
        	if (areaMaxBet > moneyCheck) {
          	e.target.total_bet_amt = moneyCheck;
        	}
        	else if (maxMoney > parseInt(this.context.context.user_money)) {
          		
        		// let amt = parseInt(parseInt(e.target.max_betAmt) / 3)
        		let amt = parseInt(parseInt(this.context.context.user_money - this.context.component_multibetBetting2.fngetRawTotal())) / 3
        		// addition on confirmed bets checking to money amount
          	if(e.target.table_name === 'ante') {
          		let anteConfirmed = _.find(this.context.component_gameButtons.yourBets, function(e){return e.table_id === 'ante'});
          		if(!_.isEmpty(anteConfirmed)) {
          			amt = parseInt(parseInt(this.context.context.user_money+anteConfirmed.amount - this.context.component_multibetBetting2.fngetRawTotal())) / 3
          		}
          	}

        		let div = "1";
          	for (var i = 0; i < parseInt(amt).toString().length-2; i++) {
          		div = div.concat(0)
						}

						if((parseInt(amt).toString().length-2) == 0) {
							div = "10"
						}

						// New div calculation using smallest chip value
						if (parseInt(moneyCheck) > 1*window.currencyMultiplier) {
							div = 1*window.currencyMultiplier;
						}
						
        		amt = parseInt((amt/parseInt(div))) * parseInt(div);

          	e.target.total_bet_amt = amt;
		      }
		    } // end if

				// this.selected_chip.alpha = 0;
				// this.selectNewChip(); /** select chip new **/

				if(!e.target.is_advanced_bet) {
					this.actions.push({
						chip_amount_used:table_chip.chip_amt,
						drop_area: e.target
					}); // end of push
				}

				if (this.context.component_betindicator) {
					this.context.component_betindicator.betindicator_container.x =  e.target.x + e.target.getTransformedBounds().width/2;
					this.context.component_betindicator.betindicator_container.y = e.target.y - 20
					this.context.component_betindicator.setChildIndex(this.context.component_betindicator.betindicator_container, this.context.component_betBoard.children.length-1)
					this.context.component_betindicator.setIndicatorText(numberWithCommas(e.target.total_bet_amt));
				} // end if

				setTimeout(() => {
					this.context.component_gameButtons.is_confirmed_bet = false;
					if(!this.context.component_timer.betting_start) return;

					console.log('last! I WANT GO HOME!', table_chip, e.target)

					this.changeCurrentChips(table_chip,e.target, false, false, true);
				},timeOut)
				
				this.context.component_gameButtons.checkButtonState();
			});
		},
		changeCurrentChips(chip,target,is_confirmed,no_anim, toLog) {
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

			for (var x = avail_chips.length-1; x > -1; x--) {
				if (targetAmt == avail_chips[x].value) {
					chips.push(avail_chips[x]);
					break;
				} // end if
				else if (targetAmt-avail_chips[x].value >= 0){
					targetAmt -= avail_chips[x].value;
					chips.push(avail_chips[x]);
					x++;
				} // end elseif
			} // end for

			let instance = null;
			let instanceTxt = null;
			let chipDataCon = null;

			if (chips.length > 2) {
				playSound("chip3");
			} else if (chips.length == 2) {
				playSound("chip2");
			} else {
				playSound("chip1");
			}

			target.chips.forEach((e) => {
				this.context.component_betBoard.removeChild(e);
			});

			target.chips = [];

			for (var x = 0; x < chips.length; x++) {
				let chip_name = "chip_"+(chips[x].chip);

				this.chipsConf.forEach((c) => {
					if(chips[x].chip == c.chipval) {
						chip_name = "chip_"+c.chipName.split("_")[2]
					}
				})

				instance = createSprite(this.context.getResources(chip_name), 80, 80, instance);
				instance.scaleX = instance.scaleY = target.chip_drop_scale;
				instance.regX = instance.getBounds().width / 2;
				instance.regY = instance.getBounds().height / 2;
				instance.x = instance.y = 0;
				instance.confirmed_bet = false;

				instance.chip_amt = chips[x].value;
				instance.gotoAndStop(1);
				instance.dropped_at = target;

				//Chip container init and stacking
				chipDataCon = new createjs.Container();
				chipDataCon.x = target.x + target.getTransformedBounds().width / 2
				chipDataCon.y = (target.y + target.getTransformedBounds().height / 2) - (target.chips.length * 4);
				chipDataCon.hitArea = target;
				chipDataCon.addChild(instance);

				if (is_confirmed) {
					chipDataCon.confirmed_bet = true;
					instance.confirmed_bet = true;
				}// end if

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

				instanceTxt = new createjs.Text(instanceAmt, fontFormat(24, 'normal', 'bebas', false),'#000');
				instanceTxt.textBaseline = 'middle';
				instanceTxt.textAlign = 'center';
				instanceTxt.x = 0;
				instanceTxt.y = -2;
				chipDataCon.addChild(instanceTxt);

				if (!target.is_advanced_bet) {
					instanceTxt.scaleY = 0.6;
				}

				if (instanceTxt.text.toString().length > 3) {
					instanceTxt.font = fontFormat(20, 'normal', 'bebas', false);
				}

				if (instanceTxt.text.toString().length > 5) {
					instanceTxt.scaleX = 0.8;
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

			if (this.context.component_dealer.round_id != window.bets.round_id) {
				return;
			} //end if

			for (var x = 0; x < this.context.component_betBoard.bet_areas.length; x++) {
				for (var i = 0;i<window.sample_saved_bets.length;i++) {
					if (window.sample_saved_bets[i].table_id == this.context.component_betBoard.bet_areas[x].table_name) {
						this.changeCurrentChips(window.sample_saved_bets[i].bet_amt,this.context.component_betBoard.bet_areas[x]);
					} //end if
				} //end for
			} //end for
		},
		removeBetAreaChips (table,index) {
			for (var x = 0; x < table.chips.length; x++) {
				this.context.component_betBoard.removeChild(table.chips[x]);
			} //end for

			table.chips = [];
			table.total_bet_amt = 0;

			if(table.graphics) {
				table.normal_state(table,index)
			} else {
				table.gotoAndPlay("steady");
			}
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
