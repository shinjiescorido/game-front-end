import {createSprite, randomNum} from '../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		bet_areas: [],
		main () {
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
			//
			// let default_color = "rgba(255,255,255,0.5)";
			// let win_color = "rgba(255, 203, 104, 0.6)";

      this.default_color = "rgba(255,255,255,0.01)";
      this.dragon_color =  {
        default : ['rgba(21,101,192,0.01)', 'rgba(21,101,192,0.01)'],
				dropped : ['rgba(21,101,192,0.01)', 'rgba(21,101,192,0.01)'],
				win : ['rgba(21,101,192,0.3)', 'rgba(21,101,192,0.3)'],
				hover : ['rgba(21,101,192,0.3)', 'rgba(21,101,192,0.3)']
      } //dragon_color

			this.dragon_element_color =  {
        default : ['rgba(21,101,192,0.01)', 'rgba(21,101,192,0.01)'],
				dropped : ['rgba(21,101,192,0)', 'rgba(21,101,192, 0.01)'],
				win : ['rgba(21,101,192,0)', 'rgba(21,101,192,0.3)'],
				hover : ['rgba(21,101,192,0)', 'rgba(21,101,192,0.3)']
      } //dragon_color

      this.tiger_color = {
        default : ['rgba(209,47,47,0.01)', 'rgba(209,47,47,0.01)'],
				dropped : ['rgba(209,47,47,0.01)', 'rgba(209,47,47,0.01)'],
				win : ['rgba(209,47,47,0.3)', 'rgba(209,47,47,0.3)'],
				hover : ['rgba(209,47,47,0.3)', 'rgba(209,47,47,0.3)']
      } //tiger_color

			this.tiger_element_color = {
        default : ['rgba(209,47,47,0.01)', 'rgba(209,47,47,0.01)'],
				dropped : ['rgba(209,47,47,0.01)', 'rgba(209,47,47,0)'],
				win : ['rgba(209,47,47,0.3)', 'rgba(209,47,47,0)'],
				hover : ['rgba(209,47,47,0.3)', 'rgba(209,47,47,0)']
      } //tiger_color

      this.tie_color = {
        default : ['rgba(104, 159, 56,0.01)', 'rgba(104, 159, 56,0.01)'],
				dropped : ['rgba(104, 159, 56,0.01)', 'rgba(104, 159, 56,0.01)'],
				win : ['rgba(104, 159, 56,0.3)', 'rgba(104, 159, 56,0.3)'],
				hover : ['rgba(104, 159, 56,0.3)', 'rgba(104, 159, 56,0.3)']
      } //tie_color

      this.suitedtie_color = {
        default : ['rgba(153, 100, 20,0.01)', 'rgba(153, 100, 20,0.01)'],
				dropped : ['rgba(153, 100, 20,0.01)', 'rgba(153, 100, 20,0.01)'],
				win : ['rgba(153, 100, 20,0.3)', 'rgba(153, 100, 20,0.3)'],
				hover : ['rgba(153, 100, 20,0.3)', 'rgba(153, 100, 20,0.3)']
      } //suitedtie_color

      let y = this.context.stage.baseHeight /2 + 92;


			// dragon_even
			this.bet_areas[0] = new createjs.Shape();
			this.bet_areas[0].width = 268;
			this.bet_areas[0].x = 295;
			this.bet_areas[0].y = y;
			this.bet_areas[0].color = this.dragon_element_color;
			this.bet_areas[0].gradientOptions = [[0.2,1], 10,-140,this.bet_areas[0].width,0];
			this.bet_areas[0].fillCmd = this.bet_areas[0].graphics.beginLinearGradientFill(this.dragon_element_color.default, ...this.bet_areas[0].gradientOptions).command;

			this.bet_areas[0].graphics.moveTo(0, 0).lineTo(this.bet_areas[0].width, 0)
			.lineTo(this.bet_areas[0].width-13, 36)
			.lineTo(-23, 36)
			.lineTo(0, 0);
			this.bet_areas[0].setBounds(0,0,this.bet_areas[0].width, 36);
			this.bet_areas[0].table_name = "dragon_even";
			this.bet_areas[0].min_bet = oddEvenMin;
			this.bet_areas[0].max_bet = oddEvenMax;
			this.bet_areas[0].chips = [];

			// dragon_odd
			this.bet_areas[1] = new createjs.Shape();
			this.bet_areas[1].width = 277;
			this.bet_areas[1].x = this.bet_areas[0].x - 23; //272
			this.bet_areas[1].y = this.bet_areas[0].y + 36;
			this.bet_areas[1].color = this.dragon_element_color;
			this.bet_areas[1].gradientOptions = [[0.2,1], 10,-140,this.bet_areas[1].width,0];
			this.bet_areas[1].fillCmd = this.bet_areas[1].graphics.beginLinearGradientFill(this.dragon_element_color.default, ...this.bet_areas[1].gradientOptions).command;

			this.bet_areas[1].graphics.moveTo(0, 0).lineTo(this.bet_areas[1].width, 0)
			.lineTo(this.bet_areas[1].width-14, 37)
			.lineTo(-23, 37)
			.lineTo(0, 0);
			this.bet_areas[1].setBounds(this.bet_areas[1].x,this.bet_areas[1].y,this.bet_areas[1].width, 37);
			this.bet_areas[1].table_name = "dragon_odd";
			this.bet_areas[1].min_bet = oddEvenMin;
			this.bet_areas[1].max_bet = oddEvenMax;
			this.bet_areas[1].chips = [];

			// dragon_big
			this.bet_areas[2] = new createjs.Shape();
			this.bet_areas[2].width = 286;
			this.bet_areas[2].x = this.bet_areas[1].x - 24; //248;
			this.bet_areas[2].y = this.bet_areas[1].y + 37;
			this.bet_areas[2].color = this.dragon_element_color;
			this.bet_areas[2].gradientOptions = [[0.2,1], 10,-140,this.bet_areas[2].width,0];
			this.bet_areas[2].fillCmd = this.bet_areas[2].graphics.beginLinearGradientFill(this.dragon_element_color.default, ...this.bet_areas[2].gradientOptions).command;

			this.bet_areas[2].graphics.moveTo(0, 0).lineTo(this.bet_areas[2].width, 0)
			.lineTo(this.bet_areas[2].width-14, 41)
			.lineTo(-25, 41)
			.lineTo(0, 0);
			this.bet_areas[2].setBounds(this.bet_areas[2].x, this.bet_areas[2].y, this.bet_areas[2].width, 41);
			this.bet_areas[2].table_name = "dragon_big";
			this.bet_areas[2].min_bet = bigSmallMin;
			this.bet_areas[2].max_bet = bigSmallMax;
			this.bet_areas[2].chips = [];

			// dragon_small
			this.bet_areas[3] = new createjs.Shape();
			this.bet_areas[3].width = 296;
			this.bet_areas[3].x = this.bet_areas[2].x - 25; //223
			this.bet_areas[3].y = this.bet_areas[2].y + 41;
			this.bet_areas[3].color = this.dragon_element_color;
			this.bet_areas[3].gradientOptions = [[0.2,1], 10,-140,this.bet_areas[3].width,0];
			this.bet_areas[3].fillCmd = this.bet_areas[3].graphics.beginLinearGradientFill(this.dragon_element_color.default, ...this.bet_areas[3].gradientOptions).command;

			this.bet_areas[3].graphics.moveTo(0, 0).lineTo(this.bet_areas[3].width, 0)
			.lineTo(this.bet_areas[3].width-16, 45)
			.lineTo(-28, 45)
			.lineTo(0, 0);
			this.bet_areas[3].setBounds(this.bet_areas[3].x, this.bet_areas[3].y, this.bet_areas[3].width, 45);
			this.bet_areas[3].table_name = "dragon_small";
			this.bet_areas[3].min_bet = bigSmallMin;
			this.bet_areas[3].max_bet = bigSmallMax;
			this.bet_areas[3].chips = [];

			// dragon_clubs
			this.bet_areas[4] = new createjs.Shape();
			this.bet_areas[4].width = 148;
			this.bet_areas[4].x = this.bet_areas[3].x - 29; //194
			this.bet_areas[4].y = this.bet_areas[3].y + 45;
			this.bet_areas[4].color = this.dragon_element_color;
			this.bet_areas[4].gradientOptions = [[0.2,1], 10, -74,this.bet_areas[4].width,0];
			this.bet_areas[4].fillCmd = this.bet_areas[4].graphics.beginLinearGradientFill(this.dragon_element_color.default, ...this.bet_areas[4].gradientOptions).command;

			this.bet_areas[4].graphics.moveTo(0, 0).lineTo(this.bet_areas[4].width, 0)
			.lineTo(this.bet_areas[4].width-23, 48)
			.lineTo(-29, 48)
			.lineTo(0, 0);
			this.bet_areas[4].setBounds(this.bet_areas[4].x, this.bet_areas[4].y, this.bet_areas[4].width, 48);
			this.bet_areas[4].table_name = "dragon_clubs";
			this.bet_areas[4].min_bet = suitMin;
			this.bet_areas[4].max_bet = suitMax;
			this.bet_areas[4].chips = [];

			// dragon_hearts
			this.bet_areas[5] = new createjs.Shape();
			this.bet_areas[5].width = 159;
			this.bet_areas[5].x = this.bet_areas[4].x + this.bet_areas[4].width + 1;
			this.bet_areas[5].y = this.bet_areas[4].y;
			this.bet_areas[5].color = this.dragon_color;
			this.bet_areas[5].gradientOptions = [[0,1], 0, 0,this.bet_areas[5].width,0];
			this.bet_areas[5].fillCmd = this.bet_areas[5].graphics.beginLinearGradientFill(this.dragon_color.default, ...this.bet_areas[5].gradientOptions).command;

			this.bet_areas[5].graphics.moveTo(0, 0).lineTo(this.bet_areas[5].width, 0)
			.lineTo(this.bet_areas[5].width-19, 48)
			.lineTo(-23, 48)
			.lineTo(0, 0);
			this.bet_areas[5].setBounds(this.bet_areas[5].x, this.bet_areas[5].y, this.bet_areas[5].width, 48);
			this.bet_areas[5].table_name = "dragon_hearts";
			this.bet_areas[5].min_bet = suitMin;
			this.bet_areas[5].max_bet = suitMax;
			this.bet_areas[5].chips = [];

			// dragon
			this.bet_areas[6] = new createjs.Shape();
			this.bet_areas[6].width = 271;
			this.bet_areas[6].x = this.bet_areas[0].x + this.bet_areas[0].width; //270
			this.bet_areas[6].y = y;
			this.bet_areas[6].color = this.dragon_color;
			this.bet_areas[6].gradientOptions = [[0,1], 0, 0,this.bet_areas[6].width,0];
			this.bet_areas[6].fillCmd = this.bet_areas[6].graphics.beginLinearGradientFill(this.dragon_color.default, ...this.bet_areas[6].gradientOptions).command;

			this.bet_areas[6].graphics.moveTo(0, 0).lineTo(this.bet_areas[6].width, 0)
			.lineTo(this.bet_areas[6].width-19, 160)
			.lineTo(-61, 160)
			.lineTo(0, 0);
			this.bet_areas[6].setBounds(this.bet_areas[6].x, this.bet_areas[6].y, this.bet_areas[6].width, 160);
			this.bet_areas[6].table_name = "dragon";
			this.bet_areas[6].min_bet = mainAreaMin;
			this.bet_areas[6].max_bet = mainAreaMax;
			this.bet_areas[6].chips = [];

			// dragon_spades
			this.bet_areas[7] = new createjs.Shape();
			this.bet_areas[7].width = 156;
			this.bet_areas[7].x = this.bet_areas[5].x + this.bet_areas[5].width + 1;
			this.bet_areas[7].y = this.bet_areas[6].y + 160;
			this.bet_areas[7].color = this.dragon_color;
			this.bet_areas[7].gradientOptions = [[0,1], 0, 0,this.bet_areas[7].width,0];
			this.bet_areas[7].fillCmd = this.bet_areas[7].graphics.beginLinearGradientFill(this.dragon_color.default, ...this.bet_areas[7].gradientOptions).command;

			this.bet_areas[7].graphics.moveTo(0, 0).lineTo(this.bet_areas[7].width, 0)
			.lineTo(this.bet_areas[7].width-9, 47)
			.lineTo(-18, 47)
			.lineTo(0, 0);
			this.bet_areas[7].setBounds(this.bet_areas[7].y, this.bet_areas[7].y, this.bet_areas[7].width, 47);
			this.bet_areas[7].table_name = "dragon_spades";
			this.bet_areas[7].min_bet = suitMin;
			this.bet_areas[7].max_bet = suitMax;
			this.bet_areas[7].chips = [];

			// dragon_diamonds
			this.bet_areas[8] = new createjs.Shape();
			this.bet_areas[8].width = 156;
			this.bet_areas[8].x = this.bet_areas[7].x + this.bet_areas[7].width + 1;
			this.bet_areas[8].y = this.bet_areas[7].y;
			this.bet_areas[8].color = this.dragon_color;
			this.bet_areas[8].gradientOptions = [[0,1], 0, 0,this.bet_areas[8].width,0];
			this.bet_areas[8].fillCmd = this.bet_areas[8].graphics.beginLinearGradientFill(this.dragon_color.default, ...this.bet_areas[8].gradientOptions).command;

			this.bet_areas[8].graphics.moveTo(0, 0).lineTo(this.bet_areas[8].width, 0)
			.lineTo(this.bet_areas[8].width-6, 47)
			.lineTo(-11, 47)
			.lineTo(0, 0);
			this.bet_areas[8].setBounds(this.bet_areas[8].x, this.bet_areas[8].y, this.bet_areas[8].width, 47);
			this.bet_areas[8].table_name = "dragon_diamonds";
			this.bet_areas[8].min_bet = suitMin;
			this.bet_areas[8].max_bet = suitMax;
			this.bet_areas[8].chips = [];

			// tie
			this.bet_areas[9] = new createjs.Shape();
			this.bet_areas[9].width = 250;
			this.bet_areas[9].x = this.bet_areas[6].x +  this.bet_areas[6].width;
			this.bet_areas[9].y = y;
			this.bet_areas[9].color = this.tie_color;
			this.bet_areas[9].gradientOptions = [[0,1], 0, 0,this.bet_areas[9].width,0];
			this.bet_areas[9].fillCmd = this.bet_areas[9].graphics.beginLinearGradientFill(this.tie_color.default, ...this.bet_areas[9].gradientOptions).command;

			this.bet_areas[9].graphics.moveTo(0, 0).lineTo(this.bet_areas[9].width, 0)
			.lineTo(this.bet_areas[9].width + 10, 76)
			.lineTo(-10, 76)
			.lineTo(0, 0);
			this.bet_areas[9].setBounds(this.bet_areas[9].x, this.bet_areas[9].y, this.bet_areas[9].width, 76);
			this.bet_areas[9].table_name = "tie";
			this.bet_areas[9].min_bet = tieMin;
			this.bet_areas[9].max_bet = tieMax;
			this.bet_areas[9].chips = [];

			// suited_tie
			this.bet_areas[10] = new createjs.Shape();
			this.bet_areas[10].width = 270;
			this.bet_areas[10].x = this.bet_areas[9].x - 10;
			this.bet_areas[10].y = this.bet_areas[9].y + 77;
			this.bet_areas[10].color = this.suitedtie_color;
			this.bet_areas[10].gradientOptions = [[0,1], 0, 0,this.bet_areas[10].width,0];
			this.bet_areas[10].fillCmd = this.bet_areas[10].graphics.beginLinearGradientFill(this.suitedtie_color.default, ...this.bet_areas[10].gradientOptions).command;

			this.bet_areas[10].graphics.moveTo(0, 0).lineTo(this.bet_areas[10].width, 0)
			.lineTo(this.bet_areas[10].width + 16, 129)
			.lineTo(-16, 129)
			.lineTo(0, 0);
			this.bet_areas[10].setBounds(this.bet_areas[10].x, this.bet_areas[10].y, this.bet_areas[10].width, 129);
			this.bet_areas[10].table_name = "suited_tie";
			this.bet_areas[10].min_bet = suitedTieMin;
			this.bet_areas[10].max_bet = suitedTieMax;
			this.bet_areas[10].chips = [];

			// tiger
			this.bet_areas[11] = new createjs.Shape();
			this.bet_areas[11].width = 270;
			this.bet_areas[11].x = this.bet_areas[9].x + this.bet_areas[9].width + 1; //270
			this.bet_areas[11].y = y;
			this.bet_areas[11].color = this.tiger_color;
			this.bet_areas[11].gradientOptions = [[0,1], 0, 0,this.bet_areas[11].width,0];
			this.bet_areas[11].fillCmd = this.bet_areas[11].graphics.beginLinearGradientFill(this.tiger_color.default, ...this.bet_areas[11].gradientOptions).command;

			this.bet_areas[11].graphics.moveTo(0, 0).lineTo(this.bet_areas[11].width, 0)
			.lineTo(this.bet_areas[11].width + 64 , 160)
			.lineTo(19, 160)
			.lineTo(0, 0);
			this.bet_areas[11].setBounds(this.bet_areas[11].x, this.bet_areas[11].y, this.bet_areas[11].width, 160);
			this.bet_areas[11].table_name = "tiger";
			this.bet_areas[11].min_bet = mainAreaMin;
			this.bet_areas[11].max_bet = mainAreaMax;
			this.bet_areas[11].chips = [];


			// tiger_diamonds
			this.bet_areas[12] = new createjs.Shape();
			this.bet_areas[12].width = 158;
			this.bet_areas[12].x = this.bet_areas[11].x + 18; //270
			this.bet_areas[12].y = this.bet_areas[11].y + 161;
			this.bet_areas[12].color = this.tiger_color;
			this.bet_areas[12].gradientOptions = [[0,1], 0, 0,this.bet_areas[12].width,0];
			this.bet_areas[12].fillCmd = this.bet_areas[12].graphics.beginLinearGradientFill(this.tiger_color.default, ...this.bet_areas[12].gradientOptions).command;

			this.bet_areas[12].graphics.moveTo(0, 0).lineTo(this.bet_areas[12].width, 0)
			.lineTo(this.bet_areas[12].width + 12 , 46)
			.lineTo(9, 46)
			.lineTo(0, 0);
			this.bet_areas[12].setBounds(this.bet_areas[12].x, this.bet_areas[12].y, this.bet_areas[12].width, 46);
			this.bet_areas[12].table_name = "tiger_diamonds";
			this.bet_areas[12].min_bet = suitMin;
			this.bet_areas[12].max_bet = suitMax;
			this.bet_areas[12].chips = [];

			// tiger_spades
			this.bet_areas[13] = new createjs.Shape();
			this.bet_areas[13].width = 157;
			this.bet_areas[13].x = this.bet_areas[12].x + this.bet_areas[12].width + 1; //270
			this.bet_areas[13].y = this.bet_areas[12].y;
			this.bet_areas[13].color = this.tiger_color;
			this.bet_areas[13].gradientOptions = [[0,1], 0, 0,this.bet_areas[13].width,0];
			this.bet_areas[13].fillCmd = this.bet_areas[13].graphics.beginLinearGradientFill(this.tiger_color.default, ...this.bet_areas[13].gradientOptions).command;

			this.bet_areas[13].graphics.moveTo(0, 0).lineTo(this.bet_areas[13].width, 0)
			.lineTo(this.bet_areas[13].width + 19 , 46)
			.lineTo(12, 46)
			.lineTo(0, 0);
			this.bet_areas[13].setBounds(this.bet_areas[13].x, this.bet_areas[13].y, this.bet_areas[13].width, 46);
			this.bet_areas[13].table_name = "tiger_spades";
			this.bet_areas[13].min_bet = suitMin;
			this.bet_areas[13].max_bet = suitMax;
			this.bet_areas[13].chips = [];

			// tiger_even
			this.bet_areas[14] = new createjs.Shape();
			this.bet_areas[14].width = 263;
			this.bet_areas[14].x = this.bet_areas[11].x + this.bet_areas[11].width + 1;
			this.bet_areas[14].y = y;
			this.bet_areas[14].color = this.tiger_element_color;
			this.bet_areas[14].gradientOptions = [[0,1], 0, 0,this.bet_areas[14].width,0];
			this.bet_areas[14].fillCmd = this.bet_areas[14].graphics.beginLinearGradientFill(this.tiger_element_color.default, ...this.bet_areas[14].gradientOptions).command;

			this.bet_areas[14].graphics.moveTo(0, 0).lineTo(this.bet_areas[14].width, 0)
			.lineTo(this.bet_areas[14].width + 22 , 36)
			.lineTo(14, 36)
			.lineTo(0, 0);
			this.bet_areas[14].setBounds(this.bet_areas[14].x, this.bet_areas[14].y, this.bet_areas[14].width, 36);
			this.bet_areas[14].table_name = "tiger_even";
			this.bet_areas[14].min_bet = oddEvenMin;
			this.bet_areas[14].max_bet = oddEvenMax;
			this.bet_areas[14].chips = [];

			// tiger_odd
			this.bet_areas[15] = new createjs.Shape();
			this.bet_areas[15].width = 271;
			this.bet_areas[15].x = this.bet_areas[14].x + 14;
			this.bet_areas[15].y = this.bet_areas[14].y + 36;
			this.bet_areas[15].color = this.tiger_element_color;
			this.bet_areas[15].gradientOptions = [[0,1], 0, 0,this.bet_areas[15].width,0];
			this.bet_areas[15].fillCmd = this.bet_areas[15].graphics.beginLinearGradientFill(this.tiger_element_color.default, ...this.bet_areas[15].gradientOptions).command;

			this.bet_areas[15].graphics.moveTo(0, 0).lineTo(this.bet_areas[15].width, 0)
			.lineTo(this.bet_areas[15].width + 23 , 37)
			.lineTo(14, 37)
			.lineTo(0, 0);
			this.bet_areas[15].setBounds(this.bet_areas[15].x, this.bet_areas[15].y, this.bet_areas[15].width, 37);
			this.bet_areas[15].table_name = "tiger_odd";
			this.bet_areas[15].min_bet = oddEvenMin;
			this.bet_areas[15].max_bet = oddEvenMax;
			this.bet_areas[15].chips = [];

			// tiger_big
			this.bet_areas[16] = new createjs.Shape();
			this.bet_areas[16].width = 280;
			this.bet_areas[16].x = this.bet_areas[15].x + 14;
			this.bet_areas[16].y = this.bet_areas[15].y + 37;
			this.bet_areas[16].color = this.tiger_element_color;
			this.bet_areas[16].gradientOptions = [[0,1], 0, 0,this.bet_areas[16].width,0];
			this.bet_areas[16].fillCmd = this.bet_areas[16].graphics.beginLinearGradientFill(this.tiger_element_color.default, ...this.bet_areas[16].gradientOptions).command;

			this.bet_areas[16].graphics.moveTo(0, 0).lineTo(this.bet_areas[16].width, 0)
			.lineTo(this.bet_areas[16].width + 25 , 41)
			.lineTo(16, 41)
			.lineTo(0, 0);
			this.bet_areas[16].setBounds(this.bet_areas[16].x, this.bet_areas[16].y, this.bet_areas[16].width, 41);
			this.bet_areas[16].table_name = "tiger_big";
			this.bet_areas[16].min_bet = bigSmallMin;
			this.bet_areas[16].max_bet = bigSmallMax;
			this.bet_areas[16].chips = [];

			// tiger_small
			this.bet_areas[17] = new createjs.Shape();
			this.bet_areas[17].width = 289;
			this.bet_areas[17].x = this.bet_areas[16].x + 16;
			this.bet_areas[17].y = this.bet_areas[16].y + 41;
			this.bet_areas[17].color = this.tiger_element_color;
			this.bet_areas[17].gradientOptions = [[0,1], 0, 0,this.bet_areas[17].width,0];
			this.bet_areas[17].fillCmd = this.bet_areas[17].graphics.beginLinearGradientFill(this.tiger_element_color.default, ...this.bet_areas[17].gradientOptions).command;

			this.bet_areas[17].graphics.moveTo(0, 0).lineTo(this.bet_areas[17].width, 0)
			.lineTo(this.bet_areas[17].width + 27 , 45)
			.lineTo(20, 45)
			.lineTo(0, 0);
			this.bet_areas[17].setBounds(this.bet_areas[17].x, this.bet_areas[17].y, this.bet_areas[17].width, 45);
			this.bet_areas[17].table_name = "tiger_small";
			this.bet_areas[17].min_bet = bigSmallMin;
			this.bet_areas[17].max_bet = bigSmallMax;
			this.bet_areas[17].chips = [];

			// tiger_hearts
			this.bet_areas[18] = new createjs.Shape();
			this.bet_areas[18].width = 158;
			this.bet_areas[18].x = this.bet_areas[17].x + 19;
			this.bet_areas[18].y = this.bet_areas[17].y + 45;
			this.bet_areas[18].color = this.tiger_color;
			this.bet_areas[18].gradientOptions = [[0,1], 0, 0,this.bet_areas[18].width,0];
			this.bet_areas[18].fillCmd = this.bet_areas[18].graphics.beginLinearGradientFill(this.tiger_color.default, ...this.bet_areas[18].gradientOptions).command;

			this.bet_areas[18].graphics.moveTo(0, 0).lineTo(this.bet_areas[18].width, 0)
			.lineTo(this.bet_areas[18].width + 22 , 48)
			.lineTo(18, 48)
			.lineTo(0, 0);
			this.bet_areas[18].setBounds(this.bet_areas[18].x, this.bet_areas[18].y, this.bet_areas[18].width, 48);
			this.bet_areas[18].table_name = "tiger_hearts";
			this.bet_areas[18].min_bet = suitMin;
			this.bet_areas[18].max_bet = suitMax;
			this.bet_areas[18].chips = [];

			// tiger_clubs
			this.bet_areas[19] = new createjs.Shape();
			this.bet_areas[19].width = 139;
			this.bet_areas[19].x = this.bet_areas[18].x + this.bet_areas[18].width + 1;
			this.bet_areas[19].y = this.bet_areas[18].y;
			this.bet_areas[19].color = this.tiger_element_color;
			this.bet_areas[19].gradientOptions = [[0,1], 0, 0,this.bet_areas[19].width + 20,0];
			this.bet_areas[19].fillCmd = this.bet_areas[19].graphics.beginLinearGradientFill(this.tiger_element_color.default, ...this.bet_areas[19].gradientOptions).command;

			this.bet_areas[19].graphics.moveTo(0, 0).lineTo(this.bet_areas[19].width, 0)
			.lineTo(this.bet_areas[19].width + 30 , 48)
			.lineTo(21, 48)
			.lineTo(0, 0);
			this.bet_areas[19].setBounds(this.bet_areas[19].x, this.bet_areas[19].y, this.bet_areas[19].width, 47);
			this.bet_areas[19].table_name = "tiger_clubs";
			this.bet_areas[19].min_bet = suitMin;
			this.bet_areas[19].max_bet = suitMax;
			this.bet_areas[19].chips = [];

			this.classic_outline = this.context.component_tableOutline.singleClassic();
			this.classic_outline.singleplayer = true;
			this.classic_outline.multiplayer = false;

			for(var x = 0; x < this.bet_areas.length; x++) {
				// this.bet_areas[x].y = y;
				this.bet_areas[x].chip_anim_toPlay = 1;
				this.bet_areas[x].chip_drop_scale = 0.8;
				this.bet_areas[x].singleplayer = true;
				this.bet_areas[x].multiplayer = false;
				this.bet_areas[x].total_bet_amt = 0;
				this.bet_areas[x].min_betAmt = this.bet_areas[x].min_bet;
				this.bet_areas[x].max_betAmt = this.bet_areas[x].max_bet;
				this.bet_areas[x].payout_multiplier = 1;

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

				this.classic_outline.hitArea = this.bet_areas[x];

				this.bet_areas[x].normal_state = (e,x) => {
					e.fillCmd.linearGradient(e.color.default, ...e.gradientOptions)
				}

				this.bet_areas[x].dropped_state = (e,x) => {
					e.fillCmd.linearGradient(e.color.dropped, ...e.gradientOptions)
				}

				this.bet_areas[x].hover_state = (e,x) => {
					e.fillCmd.linearGradient(e.color.hover, ...e.gradientOptions)
				}

				this.bet_areas[x].win_state = (e,x) => {
					e.fillCmd.linearGradient(e.color.win, ...e.gradientOptions)
				}
			}

			// this.context.component_toggle.toggleSlave();
		}
	});

	return instance;
}
