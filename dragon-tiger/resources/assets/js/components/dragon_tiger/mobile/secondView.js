import {createSprite, randomNum} from '../../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		bet_areas: [],
		main () {	

			let default_color = "red";
			// let default_color = "rgba(255,255,255,0.01)";
			let win_color = "rgba(255, 203, 104, 0.6)";

			this.bet_areas[0] = new createjs.Shape();
			this.bet_areas[0].move = [0,0];
			this.bet_areas[0].lineTo1 = [238, 0];
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
			this.bet_areas[1].x = 414;
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
			this.bet_areas[3].lineTo2 = [260, 38];
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
			this.bet_areas[5].lineTo2 = [118, 44];
			this.bet_areas[5].lineTo3 = [-44, 44];
			this.bet_areas[5].lineTo4 = [0, 0];
			this.bet_areas[5].table_name = "dragon_hearts";
			this.bet_areas[5].x = 450;
			this.bet_areas[5].y = 663;

			this.bet_areas[6] = new createjs.Shape();
			this.bet_areas[6].move = [0,0];
			this.bet_areas[6].lineTo1 = [238, 0];
			this.bet_areas[6].lineTo2 = [216, 130];
			this.bet_areas[6].lineTo3 = [-88, 130];
			this.bet_areas[6].lineTo4 = [0, 0];
			this.bet_areas[6].table_name = "dragon";
			this.bet_areas[6].x = 686;
			this.bet_areas[6].y = 534;

			this.bet_areas[7] = new createjs.Shape();
			this.bet_areas[7].move = [0,0];
			this.bet_areas[7].lineTo1 = [150, 0];
			this.bet_areas[7].lineTo2 = [132, 42];
			this.bet_areas[7].lineTo3 = [-30, 42];
			this.bet_areas[7].lineTo4 = [0, 0];
			this.bet_areas[7].table_name = "dragon_spades";
			this.bet_areas[7].x = 600;
			this.bet_areas[7].y = 664;

			this.bet_areas[8] = new createjs.Shape();
			this.bet_areas[8].move = [0,0];
			this.bet_areas[8].lineTo1 = [150, 0];
			this.bet_areas[8].lineTo2 = [144, 42];
			this.bet_areas[8].lineTo3 = [-20, 42];
			this.bet_areas[8].lineTo4 = [0, 0];
			this.bet_areas[8].table_name = "dragon_diamonds";
			this.bet_areas[8].x = 750;
			this.bet_areas[8].y = 664;

			this.bet_areas[9] = new createjs.Shape();
			this.bet_areas[9].move = [0,0];
			this.bet_areas[9].lineTo1 = [178, 0];
			this.bet_areas[9].lineTo2 = [200, 130];
			this.bet_areas[9].lineTo3 = [-20, 130];
			this.bet_areas[9].lineTo4 = [0, 0];
			this.bet_areas[9].table_name = "tie";
			this.bet_areas[9].x = 922;
			this.bet_areas[9].y = 534;

			this.bet_areas[10] = new createjs.Shape();
			this.bet_areas[10].move = [0,0];
			this.bet_areas[10].lineTo1 = [236, 0];
			this.bet_areas[10].lineTo2 = [324, 130];
			this.bet_areas[10].lineTo3 = [22, 130];
			this.bet_areas[10].lineTo4 = [0, 0];
			this.bet_areas[10].table_name = "tiger";
			this.bet_areas[10].x = 1100;
			this.bet_areas[10].y = 534;

			this.bet_areas[11] = new createjs.Shape();
			this.bet_areas[11].move = [0,0];
			this.bet_areas[11].lineTo1 = [152, 0];
			this.bet_areas[11].lineTo2 = [170, 42];
			this.bet_areas[11].lineTo3 = [10, 42];
			this.bet_areas[11].lineTo4 = [0, 0];
			this.bet_areas[11].table_name = "tiger_diamonds";
			this.bet_areas[11].x = 1122;
			this.bet_areas[11].y = 664;

			this.bet_areas[12] = new createjs.Shape();
			this.bet_areas[12].move = [0,0];
			this.bet_areas[12].lineTo1 = [152, 0];
			this.bet_areas[12].lineTo2 = [180, 42];
			this.bet_areas[12].lineTo3 = [20, 42];
			this.bet_areas[12].lineTo4 = [0, 0];
			this.bet_areas[12].table_name = "tiger_spades";
			this.bet_areas[12].x = 1272;
			this.bet_areas[12].y = 664;

			this.bet_areas[13] = new createjs.Shape();
			this.bet_areas[13].move = [0,0];
			this.bet_areas[13].lineTo1 = [240, 0];
			this.bet_areas[13].lineTo2 = [280, 30];
			this.bet_areas[13].lineTo3 = [20, 30];
			this.bet_areas[13].lineTo4 = [0, 0];
			this.bet_areas[13].table_name = "tiger_even";
			this.bet_areas[13].x = 1334;
			this.bet_areas[13].y = 534;

			this.bet_areas[14] = new createjs.Shape();
			this.bet_areas[14].move = [0,-1];
			this.bet_areas[14].lineTo1 = [258, -1];
			this.bet_areas[14].lineTo2 = [298, 30];
			this.bet_areas[14].lineTo3 = [20, 30];
			this.bet_areas[14].lineTo4 = [0, -1];
			this.bet_areas[14].table_name = "tiger_odd";
			this.bet_areas[14].x = 1356 ;
			this.bet_areas[14].y = 564;

			this.bet_areas[15] = new createjs.Shape();
			this.bet_areas[15].move = [0,-1];
			this.bet_areas[15].lineTo1 = [278, -1];
			this.bet_areas[15].lineTo2 = [323, 33];
			this.bet_areas[15].lineTo3 = [22, 33];
			this.bet_areas[15].lineTo4 = [-1, -1];
			this.bet_areas[15].table_name = "tiger_big";
			this.bet_areas[15].x = 1376;
			this.bet_areas[15].y = 594;

			this.bet_areas[16] = new createjs.Shape();
			this.bet_areas[16].move = [0,0];
			this.bet_areas[16].lineTo1 = [301, 0];
			this.bet_areas[16].lineTo2 = [348, 38];
			this.bet_areas[16].lineTo3 = [25, 38];
			this.bet_areas[16].lineTo4 = [0, 0];
			this.bet_areas[16].table_name = "tiger_small";
			this.bet_areas[16].x = 1398;
			this.bet_areas[16].y = 627;

			this.bet_areas[17] = new createjs.Shape();
			this.bet_areas[17].move = [0,0];
			this.bet_areas[17].lineTo1 = [150, 0];
			this.bet_areas[17].lineTo2 = [190, 42];
			this.bet_areas[17].lineTo3 = [28, 42];
			this.bet_areas[17].lineTo4 = [0, 0];
			this.bet_areas[17].table_name = "tiger_hearts";
			this.bet_areas[17].x = 1424;
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

			let table_outline = null;

			let dragon_color = "#1565c0";
			let tiger_color = "#d12f2f";
			let tie_color = "#689f38";

			let color = "";

			let adjustY = 0;
			let adjustX = 0;

			for(var x = 0; x < this.bet_areas.length; x++) {

				this.bet_areas[x].payout_multiplier = 1;
				this.bet_areas[x].singleplayer = true;
				
				if(this.bet_areas[x].table_name == "tie") {
					this.bet_areas[x].payout_multiplier = 10;
				}

				if(this.bet_areas[x].table_name == "tiger_hearts" || this.bet_areas[x].table_name == "tiger_clubs" 
					|| this.bet_areas[x].table_name == "tiger_diamonds" || this.bet_areas[x].table_name == "tiger_spades"
					|| this.bet_areas[x].table_name == "dragon_hearts" || this.bet_areas[x].table_name == "dragon_spades"
					|| this.bet_areas[x].table_name == "dragon_clubs"|| this.bet_areas[x].table_name == "dragon_diamonds") {
					
					this.bet_areas[x].payout_multiplier = 3;

				}


				this.bet_areas[x].chip_anim_toPlay = 2;
				this.bet_areas[x].chip_drop_scale = 0.8;
				this.bet_areas[x].setBounds(0,0,this.bet_areas[x].lineTo1[0],this.bet_areas[x].lineTo2[1]);

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
					// e.graphics.clear().beginFill("#e6c15b").moveTo(...e.move)
					// 	.lineTo(...e.lineTo1)
					// 	.lineTo(...e.lineTo2)
					// 	.lineTo(...e.lineTo3)
					// 	.lineTo(...e.lineTo4)

					e.dropped_state(e,x);
				}

				this.bet_areas[x].hover_state = (e,x) => {
					e.dropped_state(e,x);
					e.alpha = .5;
				}

				this.addChild(this.bet_areas[x])
			}

			this.scaleX = this.scaleY = 0.795;
			this.x = -218; //-192;
			this.y = -96;

			this.chips_container = new createjs.Container();
			this.addChild(this.chips_container);
		},
		addChips (target, amount) {

			let avail_chips = [];

			if (this.dollar) {
				avail_chips = [1,3,5,10,30,50,100,200,300,500,1000];
			}
			else {
				avail_chips = [1000,3000,5000,10000,30000,50000,100000,200000,300000,500000,1000000];
			}

			let sample = parseInt(amount);

			let chips = [];

			for (var x = avail_chips.length-1;x > -1;x--) {
				if (sample == avail_chips[x]) {
					chips.push(avail_chips[x]);
					break;
				} else if (sample-avail_chips[x] >= 0){
					sample -= avail_chips[x];
					chips.push(avail_chips[x]);
					x++;
				}
			}

			let instance = null;
			let instanceTxt = null;
			let instanceMask = null;
			let chipDataCon = null;

			// if (chips.length > 2) {
			// 	playSound("chip3")
			// } else if (chips.length == 2) {
			// 	playSound("chip2")
			// } else {
			// 	playSound("chip1")
			// }

			for (var x = 0; x < chips.length; x++) {
				let chip_name = '';

				if (this.dollar) {
					chip_name = "chip_$"+(chips[x]);
				}
				else {
					chip_name = "chip_"+(chips[x]/1000)+"k";
				}

				instance = createSprite(this.context.getResources(chip_name), 72, 72, instance);
				// instance.scaleX = instance.scaleY = target.chip_drop_scale;
				instance.regX = instance.getBounds().width / 2;
        		instance.regY = instance.getBounds().height / 2;
        		instance.x = instance.y = 0;
        		instance.confirmed_bet = false;
				
				// instance.scaleX = instance.scaleY = target.chip_drop_scale;
				instance.alpha = 1;

				instance.chip_amt = chips[x];

				// instance.gotoAndStop(target.chip_anim_toPlay);
				instance.gotoAndStop(2);
				instance.dropped_at = target;

				//Chip container init and stacking
				chipDataCon = new createjs.Container();
		        chipDataCon.x = target.x + target.getTransformedBounds().width / 2

				// target.chips = [1]
				// target.chips.length
		        chipDataCon.y = (target.y + target.getTransformedBounds().height / 2) - (1 * 4);
		        chipDataCon.hitArea = target;
		        chipDataCon.addChild(instance);

		        //Bet mask
				instanceMask = new createjs.Shape();
				instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 18);
				instanceMask.x = instanceMask.y = 0;
				chipDataCon.addChild(instanceMask);

				//Bet amount text
				let instanceAmt = '';
				if (this.dollar) {
					instanceAmt = "$"+target.total_bet_amt;
				}
				else {
					instanceAmt = target.total_bet_amt/1000+"k";
				}

				instanceTxt = new createjs.Text(instanceAmt,'normal 19px bebas-regular','#000');
				instanceTxt.textBaseline = 'middle';
				instanceTxt.textAlign = 'center';
				instanceTxt.x = instanceTxt.y = 0;
				chipDataCon.addChild(instanceTxt);

				if (instanceTxt.text.toString().length > 4) {
					instanceTxt.font = 'normal 17px bebas-regular'
				}

				chipDataCon.dropped_at = target

				this.chips_container.addChild(chipDataCon);	

				target.dropped_state(target)

				this.updateCache()
			} //end for

		},
		newRound() {

			this.cache(286,400,1480, 357);

			this.chips_container.removeAllChildren();
			// this.bet_areas.forEach ((e)=> {
			// 	e.normal_state(e);	
			// 	this.updateCache()
			// })
			for(var x = 0; x < this.bet_areas.length; x++) {
				this.bet_areas[x].normal_state(this.bet_areas[x]);	
				this.bet_areas[x].win = false;
				this.updateCache()
			}
		},
		removeAllChips() {
			this.bet_areas.forEach((e) => {
				e.normal_state(e)
			})
			this.chips_container.removeAllChildren();
			this.updateCache();
		},
		tableWin (data) {

			this.uncache();

			for(var x =0 ; x < this.bet_areas.length; x++) {
				_.find(data, (e)=>{
                    if(this.bet_areas[x].table_name == e) {

						this.bet_areas[x].win_state(this.bet_areas[x])
						this.bet_areas[x].win = true;
						
                    	createjs.Tween.get(this.bet_areas[x], {loop:true})
                    	.to({
                    		alpha : 1 
                    	},300)
                    	.to({
                    		alpha : 0 
                    	},300)
                    	.to({
                    		alpha : 1 
                    	},300)
                    }
                })
			}

			this.chips_container.children.forEach((chip) => {
				if(chip.dropped_at.win) {
					createjs.Tween.get(chip)
					.wait(1000)
					.to({
						x : chip.x +300,
						y : chip.y +300
					},500)
					.to({
						alpha : 0
					},500)
				} else {
					createjs.Tween.get(chip)
					.wait(1000)
					.to({
						x : this.context.stage.baseWidth / 2
					}, 500)
					.to({
						x : this.context.stage.baseWidth / 2,
						y : chip.y - 500
					},500)
					.to({
						alpha : 0
					},500)
				}
			})
		}

	});

	return instance;
}