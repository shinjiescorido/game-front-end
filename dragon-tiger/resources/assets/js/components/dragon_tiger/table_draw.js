import {createSprite, randomNum} from '../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		bet_areas: [],
		main () {

			//===required props
			/**
			chip_drop_scale
			chip_anim_toPlay
			payout_multiplier
			min_betAmt
			max_betAmt
			setboujds

			**/

			//===optional
			/**
			text
			bet_amt_text
			board_img
			**/

			let adjustX = 2;
			let adjustY = 20;

			this.rangeDetails = window.rangeDetails;

			//Main area range
			let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
			if (window.mainMultiplier % 10) mainMultiplier = 1;
			let mainAreaMin = (this.rangeDetails.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
    		let mainAreaMax = ((this.rangeDetails.max * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

			//Side ranges
			let sideBet = [];
			for (var i = 0; i < this.rangeDetails.side_bet.length; i++) {
				sideBet = this.rangeDetails.side_bet[i];

				switch (sideBet.division) {
		        	case ('Tie'):
		        		let tieMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
		        		let tieMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
	       				break;

	       			case ('Big&Small'):
		        		let bigSmallMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
		        		let bigSmallMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
	       				break;

	       			case ('Odd or Even'):
		        		let oddEvenMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
		        		let oddEvenMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
	       				break;

	       			case ('Suited Tie'):
		        		let suitedTieMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
		        		let suitedTieMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
	       				break;

	       			case ('Suit'):
		        		let suitMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
		        		let suitMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
	       				break;
	       		}
			}

			let default_color = "rgba(255,255,255,0.01)";
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
			this.bet_areas[0].min_bet = oddEvenMin;
			this.bet_areas[0].max_bet = oddEvenMax;

			this.bet_areas[1] = new createjs.Shape();
			this.bet_areas[1].move = [0,0];
			this.bet_areas[1].lineTo1 = [254, 0];
			this.bet_areas[1].lineTo2 = [234, 30];
			this.bet_areas[1].lineTo3 = [-36, 30];
			this.bet_areas[1].lineTo4 = [0, 0];
			this.bet_areas[1].table_name = "dragon_odd";
			this.bet_areas[1].x = 414;
			this.bet_areas[1].y = 562;
			this.bet_areas[1].min_bet = oddEvenMin;
			this.bet_areas[1].max_bet = oddEvenMax;

			this.bet_areas[2] = new createjs.Shape();
			this.bet_areas[2].move = [0,0];
			this.bet_areas[2].lineTo1 = [270, 0];
			this.bet_areas[2].lineTo2 = [250, 33];
			this.bet_areas[2].lineTo3 = [-40, 33];
			this.bet_areas[2].lineTo4 = [0, 0];
			this.bet_areas[2].table_name = "dragon_big";
			this.bet_areas[2].x = 378;
			this.bet_areas[2].y = 592;
			this.bet_areas[2].min_bet = bigSmallMin;
			this.bet_areas[2].max_bet = bigSmallMax;

			this.bet_areas[3] = new createjs.Shape();
			this.bet_areas[3].move = [0,0];
			this.bet_areas[3].lineTo1 = [288, 0];
			this.bet_areas[3].lineTo2 = [260, 38];
			this.bet_areas[3].lineTo3 = [-45, 38];
			this.bet_areas[3].lineTo4 = [0, 0];
			this.bet_areas[3].table_name = "dragon_small";
			this.bet_areas[3].x = 338;
			this.bet_areas[3].y = 625;
			this.bet_areas[3].min_bet = bigSmallMin;
			this.bet_areas[3].max_bet = bigSmallMax;

			this.bet_areas[4] = new createjs.Shape();
			this.bet_areas[4].move = [0,0];
			this.bet_areas[4].lineTo1 = [158, 0];
			this.bet_areas[4].lineTo2 = [116, 44];
			this.bet_areas[4].lineTo3 = [-52, 44];
			this.bet_areas[4].lineTo4 = [0, 0];
			this.bet_areas[4].table_name = "dragon_clubs";
			this.bet_areas[4].x = 293;
			this.bet_areas[4].y = 663;
			this.bet_areas[4].min_bet = suitMin;
			this.bet_areas[4].max_bet = suitMax;

			this.bet_areas[5] = new createjs.Shape();
			this.bet_areas[5].move = [0,0];
			this.bet_areas[5].lineTo1 = [152, 0];
			this.bet_areas[5].lineTo2 = [118, 44];
			this.bet_areas[5].lineTo3 = [-44, 44];
			this.bet_areas[5].lineTo4 = [0, 0];
			this.bet_areas[5].table_name = "dragon_hearts";
			this.bet_areas[5].x = 450;
			this.bet_areas[5].y = 663;
			this.bet_areas[5].min_bet = suitMin;
			this.bet_areas[5].max_bet = suitMax;

			this.bet_areas[6] = new createjs.Shape();
			this.bet_areas[6].move = [0,0];
			this.bet_areas[6].lineTo1 = [238, 0];
			this.bet_areas[6].lineTo2 = [216, 130];
			this.bet_areas[6].lineTo3 = [-88, 130];
			this.bet_areas[6].lineTo4 = [0, 0];
			this.bet_areas[6].table_name = "dragon";
			this.bet_areas[6].x = 686;
			this.bet_areas[6].y = 534;
			this.bet_areas[6].min_bet = mainAreaMin;
			this.bet_areas[6].max_bet = mainAreaMax;

			this.bet_areas[7] = new createjs.Shape();
			this.bet_areas[7].move = [0,0];
			this.bet_areas[7].lineTo1 = [150, 0];
			this.bet_areas[7].lineTo2 = [132, 42];
			this.bet_areas[7].lineTo3 = [-30, 42];
			this.bet_areas[7].lineTo4 = [0, 0];
			this.bet_areas[7].table_name = "dragon_spades";
			this.bet_areas[7].x = 600;
			this.bet_areas[7].y = 664;
			this.bet_areas[7].min_bet = suitMin;
			this.bet_areas[7].max_bet = suitMax;

			this.bet_areas[8] = new createjs.Shape();
			this.bet_areas[8].move = [0,0];
			this.bet_areas[8].lineTo1 = [150, 0];
			this.bet_areas[8].lineTo2 = [144, 42];
			this.bet_areas[8].lineTo3 = [-20, 42];
			this.bet_areas[8].lineTo4 = [0, 0];
			this.bet_areas[8].table_name = "dragon_diamonds";
			this.bet_areas[8].x = 750;
			this.bet_areas[8].y = 664;
			this.bet_areas[8].min_bet = suitMin;
			this.bet_areas[8].max_bet = suitMax;

			this.bet_areas[9] = new createjs.Shape();
			this.bet_areas[9].move = [0,0];
			this.bet_areas[9].lineTo1 = [178, 0];
			this.bet_areas[9].lineTo2 = [188, 58];
			this.bet_areas[9].lineTo3 = [-10, 58];
			this.bet_areas[9].lineTo4 = [0, 0];
			this.bet_areas[9].table_name = "tie";
			this.bet_areas[9].x = 922;
			this.bet_areas[9].y = 534;
			this.bet_areas[9].min_bet = tieMin;
			this.bet_areas[9].max_bet = tieMax;

			this.bet_areas[10] = new createjs.Shape();
			this.bet_areas[10].move = [0,0];
			this.bet_areas[10].lineTo1 = [236, 0];
			this.bet_areas[10].lineTo2 = [324, 130];
			this.bet_areas[10].lineTo3 = [22, 130];
			this.bet_areas[10].lineTo4 = [0, 0];
			this.bet_areas[10].table_name = "tiger";
			this.bet_areas[10].x = 1100;
			this.bet_areas[10].y = 534;
			this.bet_areas[10].min_bet = mainAreaMin;
			this.bet_areas[10].max_bet = mainAreaMax;

			this.bet_areas[11] = new createjs.Shape();
			this.bet_areas[11].move = [0,0];
			this.bet_areas[11].lineTo1 = [152, 0];
			this.bet_areas[11].lineTo2 = [170, 42];
			this.bet_areas[11].lineTo3 = [10, 42];
			this.bet_areas[11].lineTo4 = [0, 0];
			this.bet_areas[11].table_name = "tiger_diamonds";
			this.bet_areas[11].x = 1122;
			this.bet_areas[11].y = 664;
			this.bet_areas[11].min_bet = suitMin;
			this.bet_areas[11].max_bet = suitMax;

			this.bet_areas[12] = new createjs.Shape();
			this.bet_areas[12].move = [0,0];
			this.bet_areas[12].lineTo1 = [152, 0];
			this.bet_areas[12].lineTo2 = [180, 42];
			this.bet_areas[12].lineTo3 = [20, 42];
			this.bet_areas[12].lineTo4 = [0, 0];
			this.bet_areas[12].table_name = "tiger_spades";
			this.bet_areas[12].x = 1272;
			this.bet_areas[12].y = 664;
			this.bet_areas[12].min_bet = suitMin;
			this.bet_areas[12].max_bet = suitMax;

			this.bet_areas[13] = new createjs.Shape();
			this.bet_areas[13].move = [0,0];
			this.bet_areas[13].lineTo1 = [240, 0];
			this.bet_areas[13].lineTo2 = [280, 30];
			this.bet_areas[13].lineTo3 = [20, 30];
			this.bet_areas[13].lineTo4 = [0, 0];
			this.bet_areas[13].table_name = "tiger_even";
			this.bet_areas[13].x = 1334;
			this.bet_areas[13].y = 534;
			this.bet_areas[13].min_bet = oddEvenMin;
			this.bet_areas[13].max_bet = oddEvenMax;

			this.bet_areas[14] = new createjs.Shape();
			this.bet_areas[14].move = [0,-1];
			this.bet_areas[14].lineTo1 = [258, -1];
			this.bet_areas[14].lineTo2 = [298, 30];
			this.bet_areas[14].lineTo3 = [20, 30];
			this.bet_areas[14].lineTo4 = [0, -1];
			this.bet_areas[14].table_name = "tiger_odd";
			this.bet_areas[14].x = 1356 ;
			this.bet_areas[14].y = 564;
			this.bet_areas[14].min_bet = oddEvenMin;
			this.bet_areas[14].max_bet = oddEvenMax;

			this.bet_areas[15] = new createjs.Shape();
			this.bet_areas[15].move = [0,-1];
			this.bet_areas[15].lineTo1 = [278, -1];
			this.bet_areas[15].lineTo2 = [323, 33];
			this.bet_areas[15].lineTo3 = [22, 33];
			this.bet_areas[15].lineTo4 = [-1, -1];
			this.bet_areas[15].table_name = "tiger_big";
			this.bet_areas[15].x = 1376;
			this.bet_areas[15].y = 594;
			this.bet_areas[15].min_bet = bigSmallMin;
			this.bet_areas[15].max_bet = bigSmallMax;

			this.bet_areas[16] = new createjs.Shape();
			this.bet_areas[16].move = [0,0];
			this.bet_areas[16].lineTo1 = [301, 0];
			this.bet_areas[16].lineTo2 = [348, 38];
			this.bet_areas[16].lineTo3 = [25, 38];
			this.bet_areas[16].lineTo4 = [0, 0];
			this.bet_areas[16].table_name = "tiger_small";
			this.bet_areas[16].x = 1398;
			this.bet_areas[16].y = 627;
			this.bet_areas[16].min_bet = bigSmallMin;
			this.bet_areas[16].max_bet = bigSmallMax;

			this.bet_areas[17] = new createjs.Shape();
			this.bet_areas[17].move = [0,0];
			this.bet_areas[17].lineTo1 = [150, 0];
			this.bet_areas[17].lineTo2 = [190, 42];
			this.bet_areas[17].lineTo3 = [28, 42];
			this.bet_areas[17].lineTo4 = [0, 0];
			this.bet_areas[17].table_name = "tiger_hearts";
			this.bet_areas[17].x = 1424;
			this.bet_areas[17].y = 664;
			this.bet_areas[17].min_bet = suitMin;
			this.bet_areas[17].max_bet = suitMax;

			this.bet_areas[18] = new createjs.Shape();
			this.bet_areas[18].move = [0,0];
			this.bet_areas[18].lineTo1 = [170, 0];
			this.bet_areas[18].lineTo2 = [226, 42];
			this.bet_areas[18].lineTo3 = [38, 42];
			this.bet_areas[18].lineTo4 = [0, 0];
			this.bet_areas[18].table_name = "tiger_clubs";
			this.bet_areas[18].x = 1576;
			this.bet_areas[18].y = 664;
			this.bet_areas[18].min_bet = suitMin;
			this.bet_areas[18].max_bet = suitMax;

			this.bet_areas[19] = new createjs.Shape();
			this.bet_areas[19].move = [0,0];
			this.bet_areas[19].lineTo1 = [197, 0];
			this.bet_areas[19].lineTo2 = [220, 115];
			this.bet_areas[19].lineTo3 = [-20, 115];
			this.bet_areas[19].lineTo4 = [0, 0];
			this.bet_areas[19].table_name = "suited_tie";
			this.bet_areas[19].x = 913;
			this.bet_areas[19].y = 591;
			this.bet_areas[19].min_bet = suitedTieMin;
			this.bet_areas[19].max_bet = suitedTieMax;

			let table_outline = null;

			let dragon_color = "#1565c0";
			let d_trans = "rgba(21, 101, 192, 0.01)";
			let tiger_color = "#d12f2f";
			let t_trans = "rgba(209, 47, 47, 0.01)";
			let tie_color = "#689f38";
			let suited_color = '#996515';

			let color = "";

			if(this.context.getResources(window.language.locale == "zh" ? "dt_betboard_chinese" : "the_betboard")) {
				table_outline = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "dt_betboard_chinese" : "the_betboard"));
				table_outline.regX =  table_outline.getBounds().width/2;
				table_outline.regY =  table_outline.getBounds().height/2;
				table_outline.x = this.context.stage.baseWidth/2 + 52 + adjustX;
				table_outline.y = this.context.stage.baseHeight/2 + 81 + adjustY
				table_outline.scaleY = 0.85
				table_outline.scaleX = 0.85
				table_outline.singleplayer = true
			}

			for(var x = 0; x < this.bet_areas.length; x++) {
				this.bet_areas[x].payout_multiplier = 1;
				this.bet_areas[x].singleplayer = true;
				this.bet_areas[x].multiplayer = false;
				this.bet_areas[x].x += adjustX;
				this.bet_areas[x].y += adjustY;

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

				this.bet_areas[x].min_betAmt = parseInt(this.bet_areas[x].min_bet);
		    	this.bet_areas[x].max_betAmt = parseInt(this.bet_areas[x].max_bet);

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
							.beginLinearGradientFill([d_trans, dragon_color],[0,1],-20,0,50,42)
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
				else if (x == 19) {
					this.bet_areas[x].dropped_state = (e,x) => {
						e.alpha = 1;
						e.graphics.clear().beginFill(suited_color).moveTo(...e.move)
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
							e.graphics.clear().beginLinearGradientFill([tiger_color, t_trans],[0,1],(e.lineTo1[0] - 70),0,(e.lineTo1[0]-10),-38)
							.lineTo(...e.lineTo1)
							.lineTo(...e.lineTo2)
							.lineTo(...e.lineTo3)
							.lineTo(...e.lineTo4)

						} 
						else {
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
					e.dropped_state(e,x);
				}

				this.bet_areas[x].hover_state = (e,x) => {
					e.dropped_state(e,x);
					e.alpha = .5;
				}

				if(table_outline) {
					table_outline.hitArea = this.bet_areas[x];
				}
			}

			let index_count = 0;

			if(table_outline) {
				this.context.component_betBoard.addChild(table_outline);
				let setchild = setInterval(()=> {
					if (this.context.component_betBoard.bet_areas.length) {
						for(var x = 0;x<this.context.component_betBoard.children.length; x++) {
							if(!this.context.component_betBoard.children[x].chip_amt) {
								index_count ++;
								this.context.component_betBoard.setChildIndex(table_outline,index_count -1);
							}
						}
						clearInterval(setchild);
					}
				},1000)
			}

		},
		cloneTableDraw() {
			let adjustX = 2;
			let adjustY = 20;
			let table_outline = null;
			
			if(this.context.getResources(window.language.locale == "zh" ? "dt_betboard_chinese" : "the_betboard")) {
				table_outline = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "dt_betboard_chinese" : "the_betboard"));
				table_outline.regX =  table_outline.getBounds().width/2;
				table_outline.regY =  table_outline.getBounds().height/2;
				table_outline.x = this.context.stage.baseWidth/2 + 52 + adjustX;
				table_outline.y = this.context.stage.baseHeight/2 + 81 +adjustY
				table_outline.scaleY = 0.85
				table_outline.scaleX = 0.85
				table_outline.singleplayer = true
			}
			return table_outline;
		}
	});

	return instance;
}
