import { createSprite, randomNum, createCardSprite, numberCounter, playSound } from '../../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		bet_areas: [],
		main () {
			this.scaleY = 0.7;
			this.scaleX = 0.7;
			this.x = -70;
			this.y = 20 + 30;
			// if(window.tableNum == 2) {
			// 	this.y = 20 + 30;
			// }

			let default_color = "rgba(255,255,255,0.01)";
			let win_color = "rgba(255, 203, 104, 0.6)";

			this.bet_areas[0] = new createjs.Shape();
			this.bet_areas[0].move = [0,1];
			this.bet_areas[0].lineTo1 = [238, 1];
			this.bet_areas[0].lineTo2 = [220, 28];
			this.bet_areas[0].lineTo3 = [-36, 28];
			this.bet_areas[0].lineTo4 = [0, 0];
			this.bet_areas[0].table_name = "dragon_even";
			this.bet_areas[0].x = 450;
			this.bet_areas[0].y = 534;

			this.bet_areas[1] = new createjs.Shape();
			this.bet_areas[1].move = [0,0];
			this.bet_areas[1].lineTo1 = [254, 0];
			this.bet_areas[1].lineTo2 = [234, 30];
			this.bet_areas[1].lineTo3 = [-36, 30];
			this.bet_areas[1].lineTo4 = [0, 0];
			this.bet_areas[1].table_name = "dragon_odd";
			this.bet_areas[1].x = 414 + .5;
			this.bet_areas[1].y = 562;

			this.bet_areas[2] = new createjs.Shape();
			this.bet_areas[2].move = [0,0];
			this.bet_areas[2].lineTo1 = [270, 0];
			this.bet_areas[2].lineTo2 = [250, 33];
			this.bet_areas[2].lineTo3 = [-40, 33];
			this.bet_areas[2].lineTo4 = [0, 0];
			this.bet_areas[2].table_name = "dragon_big";
			this.bet_areas[2].x = 378;
			this.bet_areas[2].y = 592;

			this.bet_areas[3] = new createjs.Shape();
			this.bet_areas[3].move = [0,0];
			this.bet_areas[3].lineTo1 = [288, 0];
			this.bet_areas[3].lineTo2 = [262, 38];
			this.bet_areas[3].lineTo3 = [-45, 38];
			this.bet_areas[3].lineTo4 = [0, 0];
			this.bet_areas[3].table_name = "dragon_small";
			this.bet_areas[3].x = 338;
			this.bet_areas[3].y = 625;

			this.bet_areas[4] = new createjs.Shape();
			this.bet_areas[4].move = [0,0];
			this.bet_areas[4].lineTo1 = [158, 0];
			this.bet_areas[4].lineTo2 = [116, 44];
			this.bet_areas[4].lineTo3 = [-52, 44];
			this.bet_areas[4].lineTo4 = [0, 0];
			this.bet_areas[4].table_name = "dragon_clubs";
			this.bet_areas[4].x = 293;
			this.bet_areas[4].y = 663;

			this.bet_areas[5] = new createjs.Shape();
			this.bet_areas[5].move = [0,0];
			this.bet_areas[5].lineTo1 = [152, 0];
			this.bet_areas[5].lineTo2 = [121, 44];
			this.bet_areas[5].lineTo3 = [-44, 44];
			this.bet_areas[5].lineTo4 = [0, 0];
			this.bet_areas[5].table_name = "dragon_hearts";
			this.bet_areas[5].x = 450;
			this.bet_areas[5].y = 663;

			this.bet_areas[6] = new createjs.Shape();
			this.bet_areas[6].move = [0,1];
			this.bet_areas[6].lineTo1 = [238, 1];
			this.bet_areas[6].lineTo2 = [216, 130];
			this.bet_areas[6].lineTo3 = [-88, 130];
			this.bet_areas[6].lineTo4 = [0, 0];
			this.bet_areas[6].table_name = "dragon";
			this.bet_areas[6].x = 687;
			this.bet_areas[6].y = 534;

			this.bet_areas[7] = new createjs.Shape();
			this.bet_areas[7].move = [0,0];
			this.bet_areas[7].lineTo1 = [150, 0];
			this.bet_areas[7].lineTo2 = [132, 42];
			this.bet_areas[7].lineTo3 = [-29, 42];
			this.bet_areas[7].lineTo4 = [0, 0];
			this.bet_areas[7].table_name = "dragon_spades";
			this.bet_areas[7].x = 600;
			this.bet_areas[7].y = 664;

			this.bet_areas[8] = new createjs.Shape();
			this.bet_areas[8].move = [0,0];
			this.bet_areas[8].lineTo1 = [151, 0];
			this.bet_areas[8].lineTo2 = [144, 42];
			this.bet_areas[8].lineTo3 = [-18, 42];
			this.bet_areas[8].lineTo4 = [0, 0];
			this.bet_areas[8].table_name = "dragon_diamonds";
			this.bet_areas[8].x = 750;
			this.bet_areas[8].y = 664;

			this.bet_areas[9] = new createjs.Shape();
			this.bet_areas[9].move = [0,2];
			this.bet_areas[9].lineTo1 = [178, 2];
			this.bet_areas[9].lineTo2 = [188, 59];
			this.bet_areas[9].lineTo3 = [-10, 59];
			this.bet_areas[9].lineTo4 = [0, 0];
			this.bet_areas[9].table_name = "tie";
			this.bet_areas[9].x = 923;
			this.bet_areas[9].y = 534;

			this.bet_areas[10] = new createjs.Shape();
			this.bet_areas[10].move = [0,2];
			this.bet_areas[10].lineTo1 = [236, 2];
			this.bet_areas[10].lineTo2 = [324, 130];
			this.bet_areas[10].lineTo3 = [22, 130];
			this.bet_areas[10].lineTo4 = [0, 0];
			this.bet_areas[10].table_name = "tiger";
			this.bet_areas[10].x = 1102;
			this.bet_areas[10].y = 534;

			this.bet_areas[11] = new createjs.Shape();
			this.bet_areas[11].move = [0,0];
			this.bet_areas[11].lineTo1 = [152, 0];
			this.bet_areas[11].lineTo2 = [170, 42];
			this.bet_areas[11].lineTo3 = [9, 42];
			this.bet_areas[11].lineTo4 = [0, 0];
			this.bet_areas[11].table_name = "tiger_diamonds";
			this.bet_areas[11].x = 1124;
			this.bet_areas[11].y = 664;

			this.bet_areas[12] = new createjs.Shape();
			this.bet_areas[12].move = [0,0];
			this.bet_areas[12].lineTo1 = [152, 0];
			this.bet_areas[12].lineTo2 = [180, 42];
			this.bet_areas[12].lineTo3 = [20, 42];
			this.bet_areas[12].lineTo4 = [0, 0];
			this.bet_areas[12].table_name = "tiger_spades";
			this.bet_areas[12].x = 1272 + 2;
			this.bet_areas[12].y = 664;

			this.bet_areas[13] = new createjs.Shape();
			this.bet_areas[13].move = [0,2];
			this.bet_areas[13].lineTo1 = [240, 2];
			this.bet_areas[13].lineTo2 = [280, 27];
			this.bet_areas[13].lineTo3 = [20, 27];
			this.bet_areas[13].lineTo4 = [0, 0];
			this.bet_areas[13].table_name = "tiger_even";
			this.bet_areas[13].x = 1338;
			this.bet_areas[13].y = 534;

			this.bet_areas[14] = new createjs.Shape();
			this.bet_areas[14].move = [0,-1];
			this.bet_areas[14].lineTo1 = [258, -1];
			this.bet_areas[14].lineTo2 = [298, 28];
			this.bet_areas[14].lineTo3 = [20, 28];
			this.bet_areas[14].lineTo4 = [0, -1];
			this.bet_areas[14].table_name = "tiger_odd";
			this.bet_areas[14].x = 1356 + 2;
			this.bet_areas[14].y = 564;

			this.bet_areas[15] = new createjs.Shape();
			this.bet_areas[15].move = [0,-1];
			this.bet_areas[15].lineTo1 = [278, -1];
			this.bet_areas[15].lineTo2 = [323, 31];
			this.bet_areas[15].lineTo3 = [21, 31];
			this.bet_areas[15].lineTo4 = [-1, -1];
			this.bet_areas[15].table_name = "tiger_big";
			this.bet_areas[15].x = 1376 + 3;
			this.bet_areas[15].y = 594;

			this.bet_areas[16] = new createjs.Shape();
			this.bet_areas[16].move = [0,0];
			this.bet_areas[16].lineTo1 = [301, 0];
			this.bet_areas[16].lineTo2 = [348, 38];
			this.bet_areas[16].lineTo3 = [25, 38];
			this.bet_areas[16].lineTo4 = [0, 0];
			this.bet_areas[16].table_name = "tiger_small";
			this.bet_areas[16].x = 1398 + 3;
			this.bet_areas[16].y = 626;

			this.bet_areas[17] = new createjs.Shape();
			this.bet_areas[17].move = [0,0];
			this.bet_areas[17].lineTo1 = [150, 0];
			this.bet_areas[17].lineTo2 = [190, 42];
			this.bet_areas[17].lineTo3 = [28, 42];
			this.bet_areas[17].lineTo4 = [0, 0];
			this.bet_areas[17].table_name = "tiger_hearts";
			this.bet_areas[17].x = 1424 + 3;
			this.bet_areas[17].y = 664;

			this.bet_areas[18] = new createjs.Shape();
			this.bet_areas[18].move = [0,0];
			this.bet_areas[18].lineTo1 = [170, 0];
			this.bet_areas[18].lineTo2 = [226, 42];
			this.bet_areas[18].lineTo3 = [38, 42];
			this.bet_areas[18].lineTo4 = [0, 0];
			this.bet_areas[18].table_name = "tiger_clubs";
			this.bet_areas[18].x = 1576;
			this.bet_areas[18].y = 664;

			this.bet_areas[19] = new createjs.Shape();
			this.bet_areas[19].move = [0,2];
			this.bet_areas[19].lineTo1 = [197, 2];
			this.bet_areas[19].lineTo2 = [220, 115];
			this.bet_areas[19].lineTo3 = [-18, 115];
			this.bet_areas[19].lineTo4 = [0, 0];
			this.bet_areas[19].table_name = "suited_tie";
			this.bet_areas[19].x = 913;
			this.bet_areas[19].y = 590;

			let table_outline = null;

			let dragon_color = "#1565c0";
			let tiger_color = "#d12f2f";
			let tie_color = "#689f38";
			let suitedtie_color = "#996515";
			let color = "";

			if(this.context.getResources(window.language.locale == "zh" ? "firstView_chinese" : "singleplayer_table")) {
				table_outline = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "firstView_chinese" : "singleplayer_table"));
				this.addChild(table_outline)
				table_outline.x = 248;
				table_outline.y = 535;
				table_outline.scaleX = 0.85;
				table_outline.scaleY = 0.85;
			}

			for(var x = 0; x < this.bet_areas.length; x++) {
				this.addChild(this.bet_areas[x]);
				this.setChildIndex(table_outline, x+1)

				// Payout multiplier
				this.bet_areas[x].payout_multiplier = 1;
				this.bet_areas[x].chips = []

				if(this.bet_areas[x].table_name == "tie") {
					this.bet_areas[x].payout_multiplier = 10;
				}
				else if (this.bet_areas[x].table_name == "suited_tie") {
					this.bet_areas[x].payout_multiplier = 50;
				}

				if(this.bet_areas[x].table_name == "tiger_hearts" || this.bet_areas[x].table_name == "tiger_clubs"
					|| this.bet_areas[x].table_name == "tiger_diamonds" || this.bet_areas[x].table_name == "tiger_spades"
					|| this.bet_areas[x].table_name == "dragon_hearts" || this.bet_areas[x].table_name == "dragon_spades"
					|| this.bet_areas[x].table_name == "dragon_clubs"|| this.bet_areas[x].table_name == "dragon_diamonds") {

					this.bet_areas[x].payout_multiplier = 3;
				}

				this.bet_areas[x].graphics.beginFill(default_color).moveTo(...this.bet_areas[x].move)
				.lineTo(...this.bet_areas[x].lineTo1)
				.lineTo(...this.bet_areas[x].lineTo2)
				.lineTo(...this.bet_areas[x].lineTo3)
				.lineTo(...this.bet_areas[x].lineTo4)

				if(x < 9) {
					this.bet_areas[x].dropped_state = (e,x) => {
						e.alpha = 1;

						if(x < 5) {
							e.graphics.clear()
							.beginLinearGradientFill(["transparent", dragon_color],[0,1],-20,0,50,42)
							.moveTo(...e.move)
							.lineTo(...e.lineTo1)
							.lineTo(...e.lineTo2)
							.lineTo(...e.lineTo3)
							.lineTo(...e.lineTo4)
						} else {
							e.graphics.clear()
							.beginFill(dragon_color)
							.moveTo(...e.move)
							.lineTo(...e.lineTo1)
							.lineTo(...e.lineTo2)
							.lineTo(...e.lineTo3)
							.lineTo(...e.lineTo4)
						}
					};

				}
				else if(x == 9){
					this.bet_areas[x].dropped_state = (e,x) => {
						e.alpha = 1;
						e.graphics.clear().beginFill(tie_color).moveTo(...e.move)
						.lineTo(...e.lineTo1)
						.lineTo(...e.lineTo2)
						.lineTo(...e.lineTo3)
						.lineTo(...e.lineTo4)
					};
				}
				else if(x == 19){
					this.bet_areas[x].dropped_state = (e,x) => {
						e.alpha = 1;
						e.graphics.clear().beginFill(suitedtie_color).moveTo(...e.move)
						.lineTo(...e.lineTo1)
						.lineTo(...e.lineTo2)
						.lineTo(...e.lineTo3)
						.lineTo(...e.lineTo4)
					};
				}
				else  {
					this.bet_areas[x].dropped_state = (e,x) => {
						e.alpha = 1;
						if(x >= 13 && x != 17) {
							e.graphics.clear().beginLinearGradientFill([tiger_color, "transparent"],[0,1],(e.lineTo1[0] - 70),0,(e.lineTo1[0]-10),-38)
							.lineTo(...e.lineTo1)
							.lineTo(...e.lineTo2)
							.lineTo(...e.lineTo3)
							.lineTo(...e.lineTo4)

						} else {
							e.graphics.clear().beginFill(tiger_color).moveTo(...e.move)
							.lineTo(...e.lineTo1)
							.lineTo(...e.lineTo2)
							.lineTo(...e.lineTo3)
							.lineTo(...e.lineTo4)
						}
					};
				}

				this.bet_areas[x].normal_state = (e,x) => {
					e.graphics.clear().beginFill(default_color).moveTo(...e.move)
						.lineTo(...e.lineTo1)
						.lineTo(...e.lineTo2)
						.lineTo(...e.lineTo3)
						.lineTo(...e.lineTo4)
				}

				this.bet_areas[x].win_state = (e,x) => {
					e.dropped_state(e)
				}

				this.bet_areas[x].setBounds(0,0,this.bet_areas[x].lineTo1[0],this.bet_areas[x].lineTo2[1]);
			}

			this.chips_container = new createjs.Container();
			this.addChild(this.chips_container);
			// this.cache(248, 434, 1530, 280);
		},
		addChips (target, amount) {
			target.chips = [];

			let avail_chips = [];
			let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];
			let targetAmt = parseInt(amount);
			let chips = [];

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
			}

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

			for (var x = 0; x < chips.length; x++) {
				let chip_name = "chip_"+(chips[x].chip);

        this.context.chipsConf.forEach((c) => {
          if(chips[x].chip == c.chipval) {
            chip_name = "chip_"+c.chipName.split("_")[2]
          }
        });

				instance = createSprite(this.context.getResources(chip_name), 72, 72, instance);
				instance.scaleX = instance.scaleY = 0.7;
				instance.regX = instance.getBounds().width / 2;
	    		instance.regY = instance.getBounds().height / 2;
	    		instance.x = instance.y = 0;
	    		instance.confirmed_bet = false;
				instance.alpha = 1;
				instance.chip_amt = chips[x].value;
				instance.gotoAndStop(2);
				instance.dropped_at = target;

				//Chip container init and stacking
				chipDataCon = new createjs.Container();
		    	chipDataCon.x = target.x + target.getTransformedBounds().width / 2
		        chipDataCon.y = (target.y + target.getTransformedBounds().height / 2) - (target.chips.length * 4);
		        chipDataCon.hitArea = target;
		        chipDataCon.addChild(instance);

		    	//Bet mask
				instanceMask = new createjs.Shape();
				instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 19);
				instanceMask.x = instanceMask.y = 0;
				instanceMask.scaleY = 0.7;
				chipDataCon.addChild(instanceMask);

				//Bet amount text
				let totalBet = amount;
	          	let instanceAmt = totalBet;

				if (parseInt(totalBet) > 999) {
					totalBet = amount / 1000;
	          		instanceAmt = totalBet+"k";
				}

	          	if (parseInt(totalBet) > 999) {
	            	instanceAmt = totalBet/1000+'M';
	          	}

				instanceTxt = new createjs.Text(instanceAmt,'normal 21px bebas-regular','#000');
				instanceTxt.textBaseline = 'middle';
				instanceTxt.textAlign = 'center';
				instanceTxt.x = instanceTxt.y = 0;
				instanceTxt.scaleY = 0.7;
				chipDataCon.addChild(instanceTxt);

		        if (instanceTxt.text.toString().length > 4) {
		          instanceTxt.font = 'normal 19px bebas-regular';
		        	instanceMask.graphics.clear().beginFill('#e1e9ff').drawCircle(0, 0, 19);
		        }

		        // Chip adjustment
		        if (parseInt(multiplayer)) {
		          instanceTxt.scaleY = 0.7;
		          instanceMask.scaleY = 0.7;
		          instanceTxt.font = 'normal 19px bebas-regular';
		          instanceMask.graphics.clear().beginFill('#e1e9ff').drawCircle(0, 0, 16);

		            let table = target.table_name;
		            if (table == 'tiger_even' || table =='tiger_odd' || table == 'tiger_big' || table == 'tiger_small') {
		                instanceTxt.skewX = -10;

		            }
		            else if (table == 'dragon_even' || table =='dragon_odd' || table == 'dragon_big' || table == 'dragon_small') {
		                instanceTxt.skewX = 10;

		            }
		        }
		        else{
		            let table = target.table_name;

		            if(table == 'tiger' || table == 'tiger_diamonds' || table == 'tiger_spades'){
		                instanceTxt.skewX = -10;
		            }
		            else if(table == 'dragon' || table == 'dragon_diamonds' || table == 'dragon_spades'){
		                instanceTxt.skewX = 10;
		            }
		            else if (table == 'tiger_even' || table =='tiger_odd' || table == 'tiger_big' || table == 'tiger_small' || table == 'tiger_hearts' || table == 'tiger_clubs') {
		                instanceTxt.skewX = -15;
		            }
		            else if (table == 'dragon_even' || table =='dragon_odd' || table == 'dragon_big' || table == 'dragon_small' || table == 'dragon_hearts' || table == 'dragon_clubs') {
		                instanceTxt.skewX = 15;
		            }
		        }

				chipDataCon.dropped_at = target;
				this.chips_container.addChild(chipDataCon);
       			target.chips.push(chipDataCon);
				target.dropped_state(target);

				// this.updateCache()
			} //end for
		},
		newRound() {
			// this.cache(248,434, 1530, 280);

			this.chips_container.removeAllChildren();
			// this.bet_areas.forEach ((e)=> {
			// 	e.normal_state(e);
			// 	this.updateCache()
			// })
			for(var x = 0; x < this.bet_areas.length; x++) {
				this.bet_areas[x].normal_state(this.bet_areas[x]);
				this.bet_areas[x].win = false;
				this.bet_areas[x].total_bet_amt = 0;

				if(this.bet_areas[x].graphics) {
	            	this.bet_areas[x].normal_state(this.bet_areas[x],x);
		        } else {
		            this.bet_areas[x].gotoAndStop(0);
		        }

		        this.bet_areas[x].alpha = 1;
		        createjs.Tween.removeTweens(this.bet_areas[x]);
				// this.updateCache();
			}
		},
		removeAllChips() {
			this.bet_areas.forEach((e) => {
				e.normal_state(e)
				e.total_bet_amt = 0;
			})
			this.chips_container.removeAllChildren();
			// this.updateCache();
		},
		tableWinning(winning) {
			// this.uncache();
		    let lose_chips_to_animate = [];

		    this.isTie = winning.some((e) => {
		        return e == 'tie';
		    });

		    this.suitedTie = winning.some((e) => {
		        return e == 'suited_tie';
		    });

		    for (var i = 0; i < this.bet_areas.length; i++) {
		        for (var x = 0; x < winning.length; x++) {
		          if (!this.bet_areas[i].multiplayer) {
		            if (this.bet_areas[i].table_name == winning[x]) {
		              if (this.bet_areas[i].graphics) {
		                this.bet_areas[i].win_state(this.bet_areas[i], i);
		              } else {
		                this.bet_areas[i].gotoAndStop(1);
		              }
		              createjs.Tween.get(this.bet_areas[i], {loop: true})
		                .to({
		                  alpha: .4
		                }, 500)
		                .to({
		                  alpha: 1
		                }, 500)

		              if (this.isTie || this.suitedTie) {
		                if (this.bet_areas[i].table_name == 'dragon' || this.bet_areas[i].table_name == 'tiger') {
		                  continue;
		                }
		              }

		              this.bet_areas[i].win = true;
		            }
		          } //end of checking if multiplier
		        } //end of bet area loop
		    } //end of forloop winning length

		    // To be fixed temp
	      	this.chips_container.children.forEach((chip) => {
				if(!chip.dropped_at.win) {
					if (this.isTie || this.suitedTie) {
		            	if (chip.dropped_at.table_name == 'dragon' || chip.dropped_at.table_name == 'tiger') {
			              	this.createTieChip(chip.dropped_at, 'win');
			              	this.createTieChip(chip.dropped_at, 'lose');

			              	chip.visible = false;

			              	chip.dropped_at.chips.forEach((e) => {
				                if (e.tiePayout && e.animate == 'lose') {

				                  	lose_chips_to_animate.push(e);
				                }
				                else {
				                  	if (e.animate == 'win') {
				                    	return;
				                  	}

				                  	e.visible = false;
				                }
			              	});

			              return;
			            }
		          	}

					lose_chips_to_animate.push(chip);
				}
			})

		    setTimeout(() => {
		        this.loseTableChipsAnimation(lose_chips_to_animate);
		    }, 2000);

		    setTimeout(() => {
		        this.setWinChips(winning);
		    }, 4000);
    	}, // end of tableWinning
	    createTieChip(betArea, type) {
	      	let chips = [];
	      	let winnings = betArea.total_bet_amt / 2;
	      	let chipsfrombanker = winnings;

	      	//Chip container init and stacking
	      	let posX = betArea.x + (betArea.getTransformedBounds().width/2);
	      	let posY = betArea.y + (betArea.getTransformedBounds().height/2);

	      	let avail_chips = [];
			let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
			}

	      	for (var x = avail_chips.length-1;x > -1;x--) {
				if (chipsfrombanker == avail_chips[x].value) {
					chips.push(avail_chips[x]);
					break;
				} else if (chipsfrombanker-avail_chips[x].value >= 0){
					chipsfrombanker -= avail_chips[x].value;
					chips.push(avail_chips[x]);
					x++;
				}
			}

	      	let instance = null;
	      	let instanceTxt = null;
	      	let instanceMask = null;
	      	let chipDataCon = null;
	      	let chipsToAnimate = [];

	      	for (var x = 0; x < chips.length; x++) {
				let chip_name = "chip_"+(chips[x].chip);
				
        this.context.chipsConf.forEach((c) => {
          if(chips[x].chip == c.chipval) {
            chip_name = "chip_"+c.chipName.split("_")[2]
          }
        });

		        instance = createSprite(this.context.getResources(chip_name), 72, 72, instance);
		        instance.regX = instance.getBounds().width / 2;
		        instance.regY = instance.getBounds().height / 2;
		        instance.x = 0;
		        instance.y = 0;
		        instance.gotoAndStop(2);

		        chipDataCon = new createjs.Container();
		        chipDataCon.x = posX;
		        chipDataCon.y = posY - (betArea.chips.length * 4);
		        chipDataCon.alpha = 1;
		        chipDataCon.animate = type;
		        chipDataCon.tiePayout = true;
		        chipDataCon.scaleX = chipDataCon.scaleY = 0.7;
		        chipDataCon.chip_amt = chips[x].value;
		        chipDataCon.dropped_at = betArea;

		        chipDataCon.addChild(instance);

		        instanceMask = new createjs.Shape();
		        instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 20);
		        instanceMask.x = instance.x;
		        instanceMask.y = instance.y;
		        instanceMask.scaleY = 0.7;
		        chipDataCon.addChild(instanceMask);

		        //Bet amount text
				let totalBet = winnings;
	          	let instanceAmt = totalBet;

				if (parseInt(totalBet) > 999) {
					totalBet = winnings / 1000;
	          		instanceAmt = totalBet+"k";
				}

	          	if (parseInt(totalBet) > 999) {
	            	instanceAmt = totalBet/1000+'M';
	          	}

		        instanceTxt = new createjs.Text(instanceAmt, 'normal 25px bebas-regular', '#000');
		        instanceTxt.textBaseline = 'middle';
		        instanceTxt.textAlign = 'center';
		        instanceTxt.x = instance.x;
		        instanceTxt.y = instance.y;
		        instanceTxt.scaleY = 0.7;
		        chipDataCon.addChild(instanceTxt);

		        // Chip adjustment
		        if (parseInt(multiplayer)) {
		          	instanceTxt.font = 'normal 25px bebas-regular';
		          	instanceMask.graphics.clear().beginFill('#e1e9ff').drawCircle(0, 0, 16);

		            let table = betArea.table_name;
		            if (table == 'tiger_even' || table =='tiger_odd' || table == 'tiger_big' || table == 'tiger_small') {
		                instanceTxt.skewX = -10;

		            }
		            else if (table == 'dragon_even' || table =='dragon_odd' || table == 'dragon_big' || table == 'dragon_small') {
		                instanceTxt.skewX = 10;

		            }
		        }
		        else{
		            let table = betArea.table_name;

		            if(table == 'tiger' || table == 'tiger_diamonds' || table == 'tiger_spades'){
		                instanceTxt.skewX = -10;

		            }
		            else if(table == 'dragon' || table == 'dragon_diamonds' || table == 'dragon_spades'){
		                instanceTxt.skewX = 10;

		            }
		            else if (table == 'tiger_even' || table =='tiger_odd' || table == 'tiger_big' || table == 'tiger_small' || table == 'tiger_hearts' || table == 'tiger_clubs') {
		                instanceTxt.skewX = -15;

		            }
		            else if (table == 'dragon_even' || table =='dragon_odd' || table == 'dragon_big' || table == 'dragon_small' || table == 'dragon_hearts' || table == 'dragon_clubs') {
		                instanceTxt.skewX = 15;
		            }
		        }

		        if (instanceTxt.text.toString().length > 4) {
		          	instanceTxt.font = 'normal 21px bebas-regular';
		        	instanceMask.graphics.clear().beginFill('#e1e9ff').drawCircle(0, 0, 22);
		        }

		        betArea.chips.push(chipDataCon);
				this.chips_container.addChild(chipDataCon);
		    } //end for

	      return chipDataCon;
	    },
	    loseTableChipsAnimation(chips) {
	      let posX = (this.context.stage.baseWidth / 2) + 400;
	      let posY = (this.context.stage.baseHeight / 2);

	      for (var x = 0; x < chips.length; x++) {
	        createjs.Tween.get(chips[x], {override: true})
	          .wait(1500)
	          .to({
	            scaleX: 0.9,
	            scaleY: 0.9,
	            alpha: 0,
	            x: posX,
	            y: posY
	          }, 1200, createjs.Ease.quadOut)
	      }
	    }, // end of loseTableChipsAnimation
	    winTableChipsAnimation(chips) {
	      for (var x = 0; x < chips.length; x++) {

	        createjs.Tween.get(chips[x])
	          .to({
	            x: 1150,
	            y: 1000
	          }, 1200, createjs.Ease.quadOut)
	      }
	    }, // end of winTableChipsAnimation
	    setWinChips(winning) {
	      	let win_chips_to_animate = [];
	      	let winningChips = [];

	       	for (var i = 0; i < this.bet_areas.length; i++) {
		        for (var x = 0; x < winning.length; x++) {
		          	if (!this.bet_areas[i].multiplayer) {
			            if (this.bet_areas[i].table_name == winning[x]) {
			              	if (this.bet_areas[i].chips.length) {
				                let winningAmt = this.setWinAmt(this.bet_areas[i]);
				                winningChips = this.createWinningChips(winningAmt, this.bet_areas[i]);
			              	} 
			            }
		          	}
		        } //end of  bet area loop
	      	} //end of forloop winning length

	    	this.chips_container.children.forEach((chip) => {
				if (this.isTie || this.suitedTie) {
			        if (chip.dropped_at.table_name == 'dragon' || chip.dropped_at.table_name == 'tiger') {
			          	chip.dropped_at.chips.forEach((e) => {
			              	if (e.tiePayout && e.animate == 'win') {
				              	win_chips_to_animate.push(e);
				            }
			            });

			            return;
			        }
		        } //end of check if tie

				if(chip.dropped_at.win) {
					win_chips_to_animate.push(chip);
				}
			})

	      	if (win_chips_to_animate) {
		        setTimeout(() => {
		          	this.winTableChipsAnimation(win_chips_to_animate);
		        }, 1500);
	      	}
	    },
	    setWinAmt(betArea) {
	      	let total = 0;
	      	total = betArea.total_bet_amt * betArea.payout_multiplier;
	      	return total;
	    },
	    createWinningChips(winAmount, betArea) {
	      	if (this.isTie || this.suitedTie) {
		        if (betArea.table_name == 'dragon' || betArea.table_name == 'tiger') {
		          return;
		        }
	      	}

	      	let chips = [];
	      	let chipsfrombanker = winAmount;

	      	//Chip container init and stacking
	      	let posX = betArea.x + (betArea.getTransformedBounds().width/2);
	      	let posY = betArea.y + (betArea.getTransformedBounds().height/2);

	      	let avail_chips = [];
			let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
			}

	      	for (var x = avail_chips.length-1;x > -1;x--) {
				if (chipsfrombanker == avail_chips[x].value) {
					chips.push(avail_chips[x]);
					break;
				} else if (chipsfrombanker-avail_chips[x].value >= 0){
					chipsfrombanker -= avail_chips[x].value;
					chips.push(avail_chips[x]);
					x++;
				}
			}

	      	let instance = null;
	      	let instanceTxt = null;
	      	let instanceMask = null;
	      	let chipDataCon = null;
	      	let chipsToAnimate = [];

	      	for (var x = 0; x < chips.length; x++) {
				let chip_name = "chip_"+(chips[x].chip);
				
        this.context.chipsConf.forEach((c) => {
          if(chips[x].chip == c.chipval) {
            chip_name = "chip_"+c.chipName.split("_")[2]
          }
        });

		        instance = createSprite(this.context.getResources(chip_name), 72, 72, instance);
		        instance.regX = instance.getBounds().width / 2;
		        instance.regY = instance.getBounds().height / 2;
		        instance.x = 0;
		        instance.y = 0;
		        instance.gotoAndStop(2);
				instance.dropped_at = betArea;

		        chipDataCon = new createjs.Container();
		        chipDataCon.x = posX - 60;
		        chipDataCon.y = posY - 120;
		        chipDataCon.alpha = 0;
		        chipDataCon.scaleX = chipDataCon.scaleY = 0.7;
		        chipDataCon.chip_amt = chips[x].value;

		        chipDataCon.addChild(instance);

		        instanceMask = new createjs.Shape();
		        instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 25);
		        instanceMask.x = instance.x;
		        instanceMask.y = instance.y;
		        instanceMask.scaleY = 0.7;
		        chipDataCon.addChild(instanceMask);

		        //Bet amount text
				let totalBet = winAmount;
	          	let instanceAmt = totalBet;

				if (parseInt(totalBet) > 999) {
					totalBet = winAmount / 1000;
	          		instanceAmt = totalBet+"k";
				}

	          	if (parseInt(totalBet) > 999) {
	            	instanceAmt = totalBet/1000+'M';
	          	}

		        instanceTxt = new createjs.Text(instanceAmt, 'normal 25px bebas-regular', '#000');
		        instanceTxt.textBaseline = 'middle';
		        instanceTxt.textAlign = 'center';
		        instanceTxt.x = instance.x;
		        instanceTxt.y = instance.y;
		        instanceTxt.scaleY = 0.7;
		        chipDataCon.addChild(instanceTxt);

		        // Chip adjustment
	            let table = betArea.table_name;
	            if(table == 'tiger' || table == 'tiger_diamonds' || table == 'tiger_spades'){
	                instanceTxt.skewX = -10;
	            }
	            else if(table == 'dragon' || table == 'dragon_diamonds' || table == 'dragon_spades'){
	                instanceTxt.skewX = 10;
	            }
	            else if (table == 'tiger_even' || table =='tiger_odd' || table == 'tiger_big' || table == 'tiger_small' || table == 'tiger_hearts' || table == 'tiger_clubs') {
	                instanceTxt.skewX = -15;
	            }
	            else if (table == 'dragon_even' || table =='dragon_odd' || table == 'dragon_big' || table == 'dragon_small' || table == 'dragon_hearts' || table == 'dragon_clubs') {
	                instanceTxt.skewX = 15;
	            }

		        if (instanceTxt.text.toString().length > 4) {
		          instanceTxt.font = 'normal 21px bebas-regular';
		        }
		        
		        createjs.Tween.get(chipDataCon)
		          	.wait(x*200)
		          	.to({
			            alpha: 1,
			            y: (posY + 4) - (betArea.chips.length * 4)
		          	}, 120, createjs.Ease.quadOut)

		        betArea.chips.push(chipDataCon);
				chipDataCon.dropped_at = betArea;
				this.chips_container.addChild(chipDataCon);
	      	} //end for
	    },
	    cloneTableDraw(){
			let tableContainer = new createjs.Container();
			tableContainer.scaleY = 0.7;
			tableContainer.scaleX = 0.7;
			tableContainer.x = -80;
			tableContainer.y = 20 + 40;
			if(window.tableNum == 2) {
				tableContainer.y = 20 + 30;
			}
			let table_outline = null;
			if(this.context.getResources(window.language.locale == "zh" ? "firstView_chinese" : "singleplayer_table")) {
				table_outline = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "firstView_chinese" : "singleplayer_table"));
				tableContainer.addChild(table_outline)
				table_outline.x = 248;
				table_outline.y = 535;
				table_outline.scaleX = 0.85;
				table_outline.scaleY = 0.85;
			}

			return tableContainer;
		}
	});

	return instance;
}
