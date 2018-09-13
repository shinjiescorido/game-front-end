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

				chips[i].chip_value = isNaN(parseInt(window.user_chips[i])) ? "max" : parseInt(window.user_chips[i]);
				chips[i].chip_amt = isNaN(parseInt(chipAmt)) ? "max" : chipAmt;
				chips[i].children[1].text = chipText;
				if(chipText.toString().indexOf('1') == 0) {
					chips[i].children[1].x -= 2;
				}
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
		dropEvent() {
			let table_chip = {};
		  let areaMaxBet = 0;
		  let moneyCheck = 0;

			this.context.component_betBoard.on("click", (e) => {
				if(this.context.junketAgent) return;
				
				if(this.context.firstRound) {
	        this.context.component_messages.setMessage(window.language.prompts.promptfirstround, 1);
	        return;
				}
				if (e.target.is_child) {
					e.target = e.target.parent
				}

				if (!this.context.component_timer.betting_start) return;

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
				} catch(e) { } // end try catch

				if ((e.target.total_bet_amt+this.selected_chip.chip_amt) > e.target.max_betAmt) {
					this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_maxbetexceeded,1);
					return;
				} // end if

				if (e.target.total_bet_amt == e.target.max_betAmt) {
					this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_maxbetexceeded,1);
					return;
				} // end if

				if (this.selected_chip.chip_amt == "max") {
					areaMaxBet = parseInt(e.target.max_betAmt);

					let additional = _.sumBy(this.context.component_gameButtons.yourBets, (bets) => { if(bets.table_id === e.target.table_name) return bets.amount });
					if(!additional) additional = 0;

					let moneyLeft = parseInt(this.context.context.user_money)-parseInt(this.total_ingame_bet);
					moneyCheck = parseInt(this.context.context.user_money) - this.total_ingame_bet  - this.context.component_multibetBetting2.fngetRawTotal();;
					moneyCheck = moneyCheck % window.currencyMultiplier > 0 ? moneyCheck - (moneyCheck % window.currencyMultiplier) : moneyCheck;

					if (moneyCheck < e.target.total_bet_amt && e.target.total_bet_amt > 0) {
						let temp = (this.context.context.user_money + additional);
						temp = temp % window.currencyMultiplier > 0 ? temp - (temp % window.currencyMultiplier) : temp;
						if((moneyCheck + e.target.total_bet_amt) > temp) {
						this.context.component_messages.setMessage(window.language2.com_sub_rooms_notenoughbalance,1);
							return;
						}
					}

					if ((moneyCheck + e.target.total_bet_amt) < e.target.min_betAmt) {
						this.context.component_messages.setMessage(window.language2.com_sub_rooms_notenoughbalance,1);
						return;
					}

					if (areaMaxBet > moneyCheck && parseInt(this.context.context.user_money) != 0) {
						if (moneyCheck == 0) {
							this.context.component_messages.setMessage(window.language2.com_sub_rooms_notenoughbalance,1);
							return;
						}

						if(e.target.total_bet_amt > 0) {
							moneyCheck =  e.target.total_bet_amt + moneyCheck;
						}

						this.total_ingame_bet -= parseInt(e.target.total_bet_amt);
						this.total_ingame_bet +=  moneyCheck;
					} else {
						this.total_ingame_bet -= parseInt(e.target.total_bet_amt);
						this.total_ingame_bet +=  parseInt(e.target.max_betAmt);
					}
	    	} else {
	        this.total_ingame_bet += parseInt(this.selected_chip.chip_amt)

	        if (parseInt(this.total_ingame_bet)+this.context.component_multibetBetting2.fngetRawTotal() > parseInt(this.context.context.user_money)) {
	        	this.total_ingame_bet -= parseInt(this.selected_chip.chip_amt);
						this.context.component_messages.setMessage(window.language2.com_sub_rooms_notenoughbalance, 1);
						return;
	        }
	      } // end if

				try {
					e.target.gotoAndStop(1)
				} catch(e) {}

				table_chip = _.clone(this.selected_chip.children[0]); //_.clone(this.selected_chip) ;
				table_chip.scaleX = table_chip.scaleY = e.target.chip_drop_scale;
				table_chip.gotoAndStop(1);
				table_chip.dropped_at = e.target;
				table_chip.confirmed_bet = false;
				table_chip.chip_amt = this.selected_chip.chip_amt;
				table_chip.chip_value = this.selected_chip.chip_value;
				e.target.chips.push(table_chip);

				this.context.component_gameButtons.repeatButton.visible = false;
				this.context.component_gameButtons.undoButton.visible = true;

				let animate_chip = _.clone(this.selected_chip.children[0]); //_.clone(this.selected_chip);
				 this.context.component_betBoard.addChild(animate_chip);

				animate_chip.alpha = 0;
				animate_chip.scaleY = animate_chip.scaleX = 0.8;
				animate_chip.x = e.localX;
				animate_chip.y = e.localY;
				animate_chip.gotoAndStop(1);
				animate_chip.hitArea = e.target;

				let targetX = e.target.x + ((e.target.getTransformedBounds().width/2) - (animate_chip.getTransformedBounds().width / 2));
				let targetY = e.target.y + ((e.target.getTransformedBounds().height/2) - (animate_chip.getTransformedBounds().height / 2));
				let timeOut = 200;

				createjs.Tween.get(animate_chip)
				.to({x: targetX, y: targetY, alpha : 1}, timeOut)
				.call((obj,parent)=>{
					parent.removeChild(obj);
				},[animate_chip, this.context.component_betBoard])

				this.selected_chip.is_dropped = true;

				if (this.selected_chip.chip_amt != "max") {
	         e.target.total_bet_amt += parseInt(table_chip.chip_amt);
	      } else {
        	e.target.total_bet_amt = e.target.max_betAmt;
        	if (areaMaxBet > moneyCheck) {
          	e.target.total_bet_amt = moneyCheck;
        	}
      	} // end if

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
					this.changeCurrentChips(table_chip,e.target, false, false, true);
				},timeOut)

				this.context.component_gameButtons.checkButtonState();
			});
		},
		setPlayerBets(data) {
			if(this.context.multiplayer) return;
			
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

			for (var i = 0; i < data.length; i++) {
				for (var x = 0; x < data[i].data.length; x++) {
					let calc = (parseInt(data[i].data[x].bet_amount) / parseInt(data[i].data[x].currencyMultiplier ? data[i].data[x].currencyMultiplier : 1))
					data[i].data[x].bet_amount = (calc/parseInt(data[i].data[x].userMultiplier ? data[i].data[x].userMultiplier : 1) * window.currencyMultiplier) * window.userMultiplier;
					totalBets += data[i].data[x].bet_amount;

					_.find(this.context.component_tableDraw.bet_areas, (area) => {
            if(area.table_name == data[i].data[x].bet && area.singleplayer) {
            	if (area.total_bet_amt) {
                area.total_bet_amt += data[i].data[x].bet_amount;
            	} else {
               	area.total_bet_amt = data[i].data[x].bet_amount;
            	}

              this.changeCurrentChips(area.total_bet_amt, area, true);
            };
          });
				}
			}
	        
			if (this.context.is_banker) {
				this.context.component_betDetails.bet_amount = totalBets;
				this.context.component_betDetails.reinit(false);
			}
		},
		changeCurrentChips(chip, target, is_confirmed, no_anim, toLog) {
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


				if (parseInt(multiplayer)) {
         	instanceTxt.scaleY = 0.7;
					switch(target.table_name) {
            case "tiger_big":
              instanceTxt.skewX = -15;
							break;
						case "tiger_small":
              instanceTxt.skewX = -15;
							break;
						case "tiger_even":
              instanceTxt.skewX = -18;
              break;
            case "tiger_odd":
              instanceTxt.skewX = -18;
							break;

            case "dragon_big":
              instanceTxt.skewX = 15;
							break;
						case "dragon_small":
              instanceTxt.skewX = 15;
							break;
						case "dragon_even":
              instanceTxt.skewX = 18;
              break;
            case "dragon_odd":
              instanceTxt.skewX = 18;
							break;
            }
        } else {

        	if(target.table_name.indexOf('tiger') >-1) {
						instanceTxt.skewX = -14;
        	}
        	if(target.table_name.indexOf('dragon') >-1) {
						instanceTxt.skewX = 14;
        	}
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
		}
	});

	return instance;
}
