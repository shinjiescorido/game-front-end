/**
 * chips.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 **/

 /**common component. draws chips, handles chip click events, drop events and chip animations**/

import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, fontFormat } from '../../../factories/factories';

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
			let posY = 108;
			let posY1 = 118;
			let posX = this.context.stage.baseWidth - 107;
			let posX1 = 0;

			this.chip_bg = [];

			for (var x = 0; x < 4; x++) {
				this.chip_bg[x] = new createjs.Shape();
				this.chip_bg[x].graphics.ss(0.5).beginStroke("#fff").beginLinearGradientFill(["rgba(43,43,43, 0.3)","#6a6b6e"], [0, 1], 0, -60,0,20).drawCircle(0, 0, 52);
				this.chip_bg[x].x = (x * posX1) + posX;
				this.chip_bg[x].y = (x * posY1) + posY;
				this.addChild(this.chip_bg[x]);
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
		chipEvent () {
			for (var x = 0; x < this.chips.length; x++) {
				this.chips[x].addEventListener("click", function (e) {
					if (this.context.junketAgent) return;

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
		cloneChips(){

			let fakechipsCon = new createjs.Container();

			let chips_bg = [];

			for (var x = 0; x < 4; x++) {

				chips_bg[x] = new createjs.Shape();
				chips_bg[x].graphics.ss(0.5).beginStroke("#fff").beginLinearGradientFill(["transparent","#636467"], [0, 1], 0, -60,0,20).drawCircle(0, 0, 52);
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
			let posY = 106;
			let posY1 = 118;
			let posX = this.context.stage.baseWidth - 107;
			let posX1 = 0;

			if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
				posX = 238;
				posX1 = 118;
				posY = this.context.stage.baseWidth  - 337;
				posY1 = 0;

			} else {
				posX = this.context.stage.baseWidth - 107;
				posX1 = 0
				posY = 106;
				posY1 = 118;
			}


			let chips = [];

			this.chipsConf = this.context.chipsConf;

			for (var i = 0; i < 4; i++) {

				let condition = (isNaN(parseInt(window.user_chips[count])) && window.user_chips[count].toLowerCase() =="max");

				if(condition) {
					chip_name = "chip_max";
				} else {
					var c = _.find(this.chipsConf, function(e) { return e.chipval == window.user_chips[i]}).chipName.split("_")[2];
					chip_name = "chip_"+c;
				}

				count++;

				let sprite_instance = createSprite(this.context.getResources(chip_name), 80, 80, chips[i]);
				let sprite_mask = new createjs.Shape();
				sprite_mask.graphics.beginFill("#FFFFFF").drawCircle(25+ 14,25+ 16,25);
				let sprite_text = new createjs.Text("text",fontFormat(30, 'normal', 'bebas', false), "#000");
				sprite_text.set({textBaseline : "middle",textAlign : "center" , x : 39.5, y : 43});
				chips[i] = new createjs.Container();
				chips[i].addChild(sprite_instance, sprite_mask, sprite_text)
				chips[i].x = (posX1 * i) + posX;
				chips[i].ox = (posX1 * i) + posX;
				chips[i].scaleX = chips[i].scaleY = 1.18;
				chips[i].row = count;
				chips[i].y = (posY1 * i) + posY;
				chips[i].oy = (posY1 * i) + posY;
				chips[i].is_dropped = false;

				let chipAmt = (parseInt(window.user_chips[count-1]) * currencyMultiplier) * this.context.chipsMultiplier;
				let chipText = chipAmt;

				if (parseInt(chipText) > 999 && parseInt(chipText) < 1000000) {
					chipText = (chipText/1000) + 'K';
				}
				else if (parseInt(chipText) >= 1000000) {
					chipText = (chipText/1000000) + 'M';
				}
				else if (isNaN(parseInt(window.user_chips[count-1]))) {
					chipText = 'MAX';
				}

				if (this.context.junketAgent) {
					let wrap = new createjs.Shape();
					wrap.graphics.beginFill('#000').drawCircle(0, 0, 36);
					wrap.alpha = 0.7;
					wrap.x = 39.5;
					wrap.y = 41.5;
					chips[i].addChild(wrap);
				}

				chips[i].chip_value = isNaN(parseInt(window.user_chips[count-1])) ? "max" : parseInt(window.user_chips[count-1]);
				chips[i].chip_amt = isNaN(parseInt(chipAmt)) ? "max" : chipAmt;
				chips[i].children[2].text = chipText;
				if(chipText.toString().indexOf('1') == 0) {
					chips[i].children[2].x -= 1;
				}
			} //end of for

			return chips;
		},

		dropEvent () {
			let table_chip = {};
		    let areaMaxBet = 0;
		    let moneyCheck = 0;

			this.context.component_betBoard.on("click", (e) => {
				if(e.target.is_child) {
					e.target = e.target.parent
				}

				if (!this.context.component_timer.betting_start) { //checking if betting_start
					if (!e.target.is_advanced_bet) {
						return;
					}
				}

				if (e.target.table_name === undefined) { //if clicked is chip on table and not the table
					e.target = e.target.dropped_at; //changing target to droparea stored on chip.dropped_at prop
				}

				if (!this.selected_chip || this.selected_chip === undefined ) { //cannot proceed if not selected chip
					return;
				}

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

				try {
					e.target.gotoAndStop(1)
				}
				catch(e) {
				}

				if (!e.target) return; 
				
				if ((e.target.total_bet_amt + this.selected_chip.chip_amt) > e.target.max_betAmt) {
					this.context.component_messages.setMessage(window.language.prompts.promptmaxbet,1);
					return;
				}

				/***checking for bet amt and user money*****/
				if (e.target.total_bet_amt == e.target.max_betAmt) {
					this.context.component_messages.setMessage(window.language.prompts.promptmaxbet,1);
					return;
				}

				if (this.selected_chip.chip_amt == "max") {
		          	areaMaxBet = parseInt(e.target.max_betAmt);

		          	let additional = _.sumBy(this.context.component_gameButtons.yourBets, (bets) => { if(bets.table_id === e.target.table_name) return bets.amount });
		          	if(!additional) additional = 0;

		          	let moneyLeft = parseInt(this.context.context.user_money)-parseInt(this.total_ingame_bet);
		          	moneyCheck = parseInt(this.context.context.user_money) - this.total_ingame_bet;

		          	moneyCheck = moneyCheck % window.currencyMultiplier > 0 ? moneyCheck - (moneyCheck % window.currencyMultiplier) : moneyCheck;
		          	console.log("additional::",additional,"\n moneyLeft::", moneyLeft, "\n moneyCheck::", moneyCheck, "\n user_money::",this.context.context.user_money, "\n total_ingame_bet::",this.total_ingame_bet);

		          	if (moneyCheck < e.target.total_bet_amt && e.target.total_bet_amt > 0) {
		          		
		          		let temp = (this.context.context.user_money + additional);
		          		temp = temp % window.currencyMultiplier > 0 ? temp - (temp % window.currencyMultiplier) : temp;

		          			if((moneyCheck + e.target.total_bet_amt) > temp) {
		          				console.log(':: here 1')
			              		this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
			          			return;	
		          			} 
		          	}
		          	if ((moneyCheck + e.target.total_bet_amt) < e.target.min_betAmt) {
		          		console.log(':: here 2')
		              	this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
		          		return;
		          	}

		          	if (areaMaxBet > moneyCheck && parseInt(this.context.context.user_money) != 0) {
		            	if (moneyCheck == 0) {
		          			console.log(':: here 3')
		              		this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
		              		return;
		            	}

		            	// **** whole numbers divisble by 100***//
		   	 			//let div = "1";
		    			//for (var i = 0; i < parseInt(moneyCheck).toString().length-2; i++) {
		    				//div = div.concat(0)
						// }

						// if((parseInt(moneyCheck).toString().length-2) == 0) {
						// 	div = "10"
						// }

						// // New div calculation using smallest chip value
						// if (parseInt(moneyCheck) > 1*window.currencyMultiplier) {
						// 	div = 1*window.currencyMultiplier;
						// }

		            	if(e.target.total_bet_amt > 0) {
		            		moneyCheck =  e.target.total_bet_amt + moneyCheck;
		            	}


		          		this.total_ingame_bet -= parseInt(e.target.total_bet_amt);

		          		// moneyCheck = parseInt((moneyCheck/parseInt(div))) * parseInt(div);
		            	this.total_ingame_bet +=  moneyCheck;
		          	}
		          	else {
				        this.total_ingame_bet -= parseInt(e.target.total_bet_amt);
		            	this.total_ingame_bet +=  parseInt(e.target.max_betAmt);
		          	}
		        }
		        else {
		          	this.total_ingame_bet += parseInt(this.selected_chip.chip_amt);
		        }// end else

				// if (parseInt(this.total_ingame_bet) > parseInt(this.context.context.user_money)) {
				// 	if (this.selected_chip.chip_amt == "max") {
				// 		this.total_ingame_bet -= parseInt(e.target.max_betAmt);
				// 	} // end if
				// 	else {
				// 		this.total_ingame_bet -= parseInt(this.selected_chip.chip_amt);
				// 	} // end else

				// 	this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
				// 	return;
				// }

				table_chip = _.clone(this.selected_chip.children[0]); //_.clone(this.selected_chip);
				table_chip.scaleX = table_chip.scaleY = e.target.chip_drop_scale;
				table_chip.gotoAndStop(e.target.chip_anim_toPlay);
				table_chip.dropped_at = e.target;
				table_chip.chip_amt = this.selected_chip.chip_amt;
		        e.target.chips.push(table_chip);

				// === chip animation init
				let animate_chip = _.clone(this.selected_chip.children[0]); // _.clone(this.selected_chip);
				this.context.component_betBoard.addChild(animate_chip);

				animate_chip.alpha = 1;
				animate_chip.scaleY = animate_chip.scaleX = e.target.chip_drop_scale;
				animate_chip.x = e.localX + (animate_chip.getTransformedBounds().width/2);
				animate_chip.y = e.localY + (animate_chip.getTransformedBounds().height/2);
				animate_chip.hitArea = e.target;

				let targetX = e.target.x + ((e.target.getTransformedBounds().width/2) - (animate_chip.getTransformedBounds().width / 2));
				let targetY = e.target.y + ((e.target.getTransformedBounds().height/2) - (animate_chip.getTransformedBounds().height / 2));
				let timeOut = 200;

				createjs.Tween.get(animate_chip)
				.to({x: targetX, y: targetY}, timeOut)
				.call((obj,parent)=>{
					parent.removeChild(obj);
				},[animate_chip, this.context.component_betBoard]);

				this.selected_chip.is_dropped = true;

				if (this.selected_chip.chip_amt != "max") {
          e.target.total_bet_amt += parseInt(table_chip.chip_amt);
        } 
        else {
        	e.target.total_bet_amt = e.target.max_betAmt;

        	if (areaMaxBet > moneyCheck) {
          	e.target.total_bet_amt = moneyCheck;
        	}
        } // end if

				// this.selected_chip.alpha = 0;
				// this.selectNewChip();

				if(!e.target.is_advanced_bet) {
					this.actions.push({
						chip_amount_used:table_chip.chip_amt,
						drop_area: e.target
					});
				}

				// if (this.context.component_betindicator) {
				// 	this.context.component_betindicator.betindicator_container.x =  e.target.x + e.target.getTransformedBounds().width/2;
				// 	this.context.component_betindicator.betindicator_container.y = e.target.y - 20
				// 	this.context.component_betindicator.setChildIndex(this.context.component_betindicator.betindicator_container, this.context.component_betBoard.children.length-1)
				// 	this.context.component_betindicator.setIndicatorText(numberWithCommas(e.target.total_bet_amt));
				// } // end if

				if (e.target.bet_amt_text) {
					e.target.bet_amt_text.text = e.target.total_bet_amt.toLocaleString();
				}

				setTimeout( () => {
					this.context.component_gameButtons.is_confirmed_bet = false;
					this.changeCurrentChips(table_chip,e.target, false, false, true);
				},timeOut)

				this.context.component_gameButtons.repeatButton.visible = false;
				this.context.component_gameButtons.undoButton.visible = true;
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

		setPlayerBets(data) {
			if(this.context.isBalance) return;
			
			let totalBets = 0;

			// Remove all chips
			for (var x = 0; x < this.context.component_betBoard.bet_areas.length; x++) {
				for (var i = 0; i < this.context.component_betBoard.bet_areas[x].chips.length; i++) {
					this.context.component_betBoard.removeChild(this.context.component_betBoard.bet_areas[x].chips[i]);
					this.context.component_betBoard.bet_areas[x].chips.splice(this.context.component_betBoard.bet_areas[x].chips[i],1);
					i--;
					this.context.component_betBoard.checkTableHighlight();
				}
			}

			let portrait = this.context.portrait;
			let slave = window.slave === 'supersix' ? window.slave : 'classic';

			for (var i = 0; i < data.length; i++) {
				for (var x = 0; x < data[i].data.length; x++) {
					let calc = (parseInt(data[i].data[x].bet_amount) / parseInt(data[i].data[x].currencyMultiplier ? data[i].data[x].currencyMultiplier : 1))
					data[i].data[x].bet_amount = (calc/parseInt(data[i].data[x].userMultiplier ? data[i].data[x].userMultiplier : 1) * window.currencyMultiplier) * window.userMultiplier;
					totalBets += data[i].data[x].bet_amount;

					let betarea = _.find(this.context.component_tableDraw.bet_areas, (area) => {
            return area.table_name == data[i].data[x].bet && area.portrait === portrait && area.slave ===  slave;
          });

        	if (betarea.total_bet_amt) {
            betarea.total_bet_amt += data[i].data[x].bet_amount;
        	} else {
           	betarea.total_bet_amt = data[i].data[x].bet_amount;
        	}

          this.changeCurrentChips(betarea.total_bet_amt, betarea, true);
				}
			}
	        
			if (this.context.is_banker) {
				this.context.component_betDetails.bet_amount = totalBets;
				this.context.component_betDetails.reinit(false);
			}
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
			// let instanceMask = null;
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

				let distance = 6; //isSuperSix() ? 2 : 6;
				instance = createSprite(this.context.getResources(chip_name), 80, 80, instance);
				instance.regX = instance.getBounds().width / 2;
				instance.regY = instance.getBounds().height / 2;
				instance.x = 0;
				instance.y = 0;
				instance.chip_amt = chips[x].value;
				instance.gotoAndStop(target.chip_anim_toPlay);
				instance.dropped_at = target;

				//Chip container init and stacking
				chipDataCon = new createjs.Container();
				chipDataCon.hitArea = target;
				chipDataCon.x = target.x + target.getTransformedBounds().width / 2;
				chipDataCon.y = (target.y + target.getTransformedBounds().height / 2) - target.chips.length * distance;
				chipDataCon.scaleX = chipDataCon.scaleY = target.chip_drop_scale;
				chipDataCon.chip_amt = chips[x].value;
				chipDataCon.confirmed_bet = false;
				if (is_confirmed) {
					chipDataCon.confirmed_bet = true;
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

        //Bet mask
        let maskRadius = 25;

        //Bet amount text
        instanceTxt = new createjs.Text(instanceAmt, fontFormat(32, 'normal', 'bebas', false) ,'#000');
				instanceTxt.textBaseline = 'middle';
				instanceTxt.textAlign = 'center';
        instanceTxt.x = 0;
        instanceTxt.y = 0;

				instanceTxt.scaleY = 0.6;

       if (instanceTxt.text.toString().length > 3) {
					instanceTxt.font = fontFormat(30, 'normal', 'bebas', false);
				}
				if (instanceTxt.text.toString().length > 5) {
					instanceTxt.scaleX = 0.8;
				}

				// if (this.context.portrait) {
				// 	switch(target.table_name) {
				// 		case "banker":
				// 		  instanceTxt.skewX = -10;
				// 		  instanceTxt.skewY = -1;
				// 			break;
				// 		case "bankerpair":
				// 		  instanceTxt.skewX = -18;
				// 		  instanceTxt.skewY = -1;
				// 			break;
				// 		case "player":
				// 		  instanceTxt.skewX = 10;
				// 		  instanceTxt.skewY = 1;
				// 			break;
				// 		case "playerpair":
				// 	    instanceTxt.skewX = 18;
				// 	    instanceTxt.skewY = 1;
				// 			break;
				// 		}
				// }

				if(target.portrait) {
			    instanceTxt.skewX = 1;
			    instanceTxt.skewY = 1;
			    instanceTxt.scaleY = instanceTxt.scaleX = 1;
				}
        target.chips.push(chipDataCon);
        chipDataCon.addChild(instance, instanceTxt);
        this.context.component_betBoard.addChild(chipDataCon);
			} //end for

			this.context.component_betBoard.checkTableHighlight();
			return;
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
		screenOrientation() {
			let chipsY = 106;
			let chipsY1 = 118;
			let chipsX = this.context.stage.baseWidth - 107;
			let chipsX1 = 0;

			let bgY = 106;
			let bgY1 = 118;
			let bgX = this.context.stage.baseWidth - 107;
			let bgX1 = 0;

			if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
				chipsX = 238;
				chipsX1 = 118;
				chipsY = this.context.stage.baseWidth  - 337;
				chipsY1 = 0;

				bgX = 285;
				bgX1 = 118;
				bgY = this.context.stage.baseWidth  - 288.5;
				bgY1 = 0;

			} else {
				chipsX = this.context.stage.baseWidth - 107;
				chipsX1 = 0
				chipsY = 106;
				chipsY1 = 118;

				bgX = this.context.stage.baseWidth - 60;
				bgX1 = 0;
				bgY = 155;
				bgY1 = 118;
			}

			for (var i = 0; i < this.chips.length; i++) {
				this.chips[i].x = (chipsX1 * i) + chipsX;
				this.chips[i].ox = (chipsX1 * i) + chipsX;
				this.chips[i].y = (chipsY1 * i) + chipsY;
				this.chips[i].oy = (chipsY1 * i) + chipsY;

				this.chip_bg[i].x = (bgX1 * i) + bgX;
				this.chip_bg[i].y = (bgY1 * i) + bgY;
			}


		}
	});

	function isSuperSix()
	{
		return getSlaveParam('supersix')
	}


return instance;
}
