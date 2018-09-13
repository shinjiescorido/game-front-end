import {createSprite, randomNum, getSlaveParam} from '../../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		bet_areas: [],
		main () {
      let y = 0;
      let width = 0;
      let hide = false;

      if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
        width = this.context.stage.baseHeight;
        y = 320;
        hide = true;
      } else {
        width = 0;
        y = this.context.stage.baseHeight /2 - 50;
        hide = false;
      }

			this.rangeDetails = window.rangeDetails;
			//Main area range
			let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
			if (window.mainMultiplier % 10) mainMultiplier = 1;
			let mainAreaMin = (this.rangeDetails.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
    	let mainAreaMax = ((this.rangeDetails.max * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

			//Side bet ranges
			let sideBet = [];
			for (var i = 0; i < this.rangeDetails.side_bet.length; i++) {
				sideBet = this.rangeDetails.side_bet[i];

				switch (sideBet.division) {
        	case ('Player Pair - Banker Pair'):
        		let pairMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
        		let pairMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
     				break;

     			case ('Tie'):
        		let tieMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
        		let tieMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
     				break;

     			case ('Super 6'):
        		let superMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
        		let superMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
     				break;

					case ('Big - Small'):
						let sizeMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
						let sizeMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
						break;

					case ('Bonus'):
						let bonusMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
						let bonusMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
						break;
       		}
			}

			this.default_color = 'rgba(255,255,255,0.2)';

			this.playerpair_color = {
				default : [this.default_color, this.default_color],
				dropped : ['rgba(21,101,192,0)', 'rgba(21,101,192,0.01)'],
				win : ['rgba(21,101,192,0)', 'rgba(21,101,192,0.3)'],
				hover : ['rgba(21,101,192,0)', 'rgba(21,101,192,0.2)']
			}

			this.player_color = {
				default : [this.default_color, this.default_color],
				dropped : ['rgba(21,101,192,0.01)', 'rgba(21,101,192,0.01)'],
				win : ['rgba(21,101,192,0.3)', 'rgba(21,101,192,0.3)'],
				hover : ['rgba(21,101,192,0.2)', 'rgba(21,101,192,0.2)']
			}

			this.tie_color = {
				default : [this.default_color, this.default_color],
				dropped : ['rgba(104, 159, 56,0.01)', 'rgba(104, 159, 56,0.01)'],
				win : ['rgba(104, 159, 56,0.3)', 'rgba(104, 159, 56,0.3)'],
				hover : ['rgba(104, 159, 56,0.2)', 'rgba(104, 159, 56,0.2)']
			}

			this.banker_color = {
				default : [this.default_color, this.default_color],
				dropped : ['rgba(209,47,47,0.01)', 'rgba(209,47,47,0.01)'],
				win : ['rgba(209,47,47,0.3)', 'rgba(209,47,47,0.3)'],
				hover : ['rgba(209,47,47,0.2)', 'rgba(209,47,47,0.2)']
			}

			this.bankerpair_color = {
				default : [this.default_color, this.default_color],
				dropped : ['rgba(209,47,47,0.01)', 'rgba(209,47,47,0)'],
				win : ['rgba(209,47,47,0.3)', 'rgba(209,47,47,0)'],
				hover : ['rgba(209,47,47,0.2)', 'rgba(209,47,47,0)']
			}

			this.supersix_color = {
				default : [this.default_color, this.default_color],
				dropped : ['rgba(153, 101, 21, 0.01)', 'rgba(153, 101, 21, 0.01)'],
				win : ['rgba(153, 101, 21, 0.3)', 'rgba(153, 101, 21, 0.3)'],
				hover : ['rgba(153, 101, 21, 0.2)', 'rgba(153, 101, 21, 0.2)'],
			}


			let posY = this.context.stage.baseHeight /2 + 84;

      this.tableBg = new createjs.Shape();
      this.tableBg.graphics.beginFill('#572e34').drawRect(0,y,width, 700)
      this.tableBg.visible = hide;
      this.addChild(this.tableBg)

			// playerpair
			this.bet_areas[0] = new createjs.Shape();
			this.bet_areas[0].width = 278;
			this.bet_areas[0].height = 202;
			this.bet_areas[0].x = 10;
			this.bet_areas[0].posY = 520;
			this.bet_areas[0].color = this.playerpair_color;
			this.bet_areas[0].gradientOptions = [[0.2,1], 10,-136,this.bet_areas[0].width,0];
			this.bet_areas[0].fillCmd = this.bet_areas[0].graphics.beginLinearGradientFill(this.playerpair_color.default, ...this.bet_areas[0].gradientOptions).command;
			this.bet_areas[0].graphics.drawRect(0,0,this.bet_areas[0].width,this.bet_areas[0].height)
			this.bet_areas[0].setBounds(0,0,this.bet_areas[0].width,this.bet_areas[0].height);
			this.bet_areas[0].table_name = "playerpair";
			this.bet_areas[0].min_bet = pairMin;
			this.bet_areas[0].max_bet = pairMax;
			this.bet_areas[0].chips = [];
			this.bet_areas[0].payout_multiplier = 11;
			this.bet_areas[0].portrait = true
			this.bet_areas[0].slave = "classic"

			// player
			this.bet_areas[1] = new createjs.Shape();
			this.bet_areas[1].width = 278;
			this.bet_areas[1].height = 204;
			this.bet_areas[1].x = 10;
			this.bet_areas[1].posY = 320;
			this.bet_areas[1].color = this.player_color;
			this.bet_areas[1].gradientOptions = [[0,1], 0,0,this.bet_areas[1].width,0];
			this.bet_areas[1].fillCmd = this.bet_areas[1].graphics.beginLinearGradientFill(this.player_color.default, ...this.bet_areas[1].gradientOptions).command;
			this.bet_areas[1].graphics.drawRect(0,0,this.bet_areas[1].width, this.bet_areas[1].height)
			this.bet_areas[1].setBounds(0,0,this.bet_areas[1].width,210);
			this.bet_areas[1].table_name = "player";
			this.bet_areas[1].min_bet = mainAreaMin;
			this.bet_areas[1].max_bet = mainAreaMax;
			this.bet_areas[1].chips = [];
			this.bet_areas[1].payout_multiplier = 1;
			this.bet_areas[1].portrait = true
			this.bet_areas[1].slave = "classic"

			// tie
			this.bet_areas[2] = new createjs.Shape();
			this.bet_areas[2].width = 140;
			this.bet_areas[2].height = 402;
			this.bet_areas[2].x = 290;
			this.bet_areas[2].posY = 320;
			this.bet_areas[2].color = this.tie_color;
			this.bet_areas[2].gradientOptions = [[0,1], 0,0,this.bet_areas[2].width,0];
			this.bet_areas[2].fillCmd = this.bet_areas[2].graphics.beginLinearGradientFill(this.tie_color.default, ...this.bet_areas[2].gradientOptions).command;
			this.bet_areas[2].graphics.drawRect(0,0,this.bet_areas[2].width, this.bet_areas[2].height)
			this.bet_areas[2].setBounds(0,0,this.bet_areas[2].width,this.bet_areas[2].height);
			this.bet_areas[2].table_name = "tie";
			this.bet_areas[2].min_bet = tieMin;
			this.bet_areas[2].max_bet = tieMax;
			this.bet_areas[2].chips = [];
			this.bet_areas[2].payout_multiplier = 8;
			this.bet_areas[2].portrait = true;
			this.bet_areas[2].slave = "classic"

			//banker
			this.bet_areas[3] = new createjs.Shape();
			this.bet_areas[3].width = 278;
			this.bet_areas[3].height = 204;
			this.bet_areas[3].x = 430;
			this.bet_areas[3].posY = 320;
			this.bet_areas[3].color = this.banker_color;
			this.bet_areas[3].gradientOptions = [[0,1], 0,0,this.bet_areas[3].width,0];
			this.bet_areas[3].fillCmd = this.bet_areas[3].graphics.beginLinearGradientFill(this.banker_color.default, ...this.bet_areas[3].gradientOptions).command;
			this.bet_areas[3].graphics.drawRect(0,0, this.bet_areas[3].width, this.bet_areas[3].height);
			this.bet_areas[3].setBounds(0,0,this.bet_areas[3].width,210);
			this.bet_areas[3].table_name = "banker";
			this.bet_areas[3].min_bet = mainAreaMin;
			this.bet_areas[3].max_bet = mainAreaMax;
			this.bet_areas[3].chips = [];
			this.bet_areas[3].payout_multiplier = 0.95
			this.bet_areas[3].portrait = true
			this.bet_areas[3].slave = "classic"


			//bankerpair
			this.bet_areas[4] = new createjs.Shape();
			this.bet_areas[4].width = 278;
			this.bet_areas[4].height = 202;
			this.bet_areas[4].x = 430;
			this.bet_areas[4].posY = 520;
			this.bet_areas[4].color = this.bankerpair_color;
			this.bet_areas[4].gradientOptions = [[0.2,1], 0,136,this.bet_areas[4].width,0];
			this.bet_areas[4].fillCmd = this.bet_areas[4].graphics.beginLinearGradientFill(this.bankerpair_color.default, ...this.bet_areas[4].gradientOptions).command;
			this.bet_areas[4].graphics.drawRect(0,0,this.bet_areas[4].width, this.bet_areas[4].height)
			this.bet_areas[4].setBounds(0,0,this.bet_areas[4].width,this.bet_areas[4].height);
			this.bet_areas[4].table_name = "bankerpair";
			this.bet_areas[4].min_bet = pairMin;
			this.bet_areas[4].max_bet = pairMax;
			this.bet_areas[4].chips = [];
			this.bet_areas[4].payout_multiplier =11
			this.bet_areas[4].portrait = true
			this.bet_areas[4].slave = "classic"

			//start for slave when swipe
			let startX = 720// (this.context.stage.canvas.width);

			// playerpair
			this.bet_areas[5] = new createjs.Shape();
			this.bet_areas[5].width = 278;
			this.bet_areas[5].height = 202;
			this.bet_areas[5].x = startX + 10;
			this.bet_areas[5].posX = 10;
			this.bet_areas[5].posY = 520;
			this.bet_areas[5].color = this.playerpair_color;
			this.bet_areas[5].gradientOptions = [[0.2,1], 10,-136,this.bet_areas[5].width,0];
			this.bet_areas[5].fillCmd = this.bet_areas[5].graphics.beginLinearGradientFill(this.playerpair_color.default, ...this.bet_areas[5].gradientOptions).command;
			this.bet_areas[5].graphics.drawRect(0,0,this.bet_areas[5].width,this.bet_areas[5].height)
			this.bet_areas[5].setBounds(0,0,this.bet_areas[5].width,this.bet_areas[5].height);
			this.bet_areas[5].table_name = "playerpair";
			this.bet_areas[5].min_bet = pairMin;
			this.bet_areas[5].max_bet = pairMax;
			this.bet_areas[5].chips = [];
			this.bet_areas[5].payout_multiplier = 11;
			this.bet_areas[5].portrait = true
			this.bet_areas[5].slave = "supersix"

			// player
			this.bet_areas[6] = new createjs.Shape();
			this.bet_areas[6].width = 278;
			this.bet_areas[6].height = 204;
			this.bet_areas[6].x = startX +  10;
			this.bet_areas[6].posX = 10;
			this.bet_areas[6].posY = 320;
			this.bet_areas[6].color = this.player_color;
			this.bet_areas[6].gradientOptions = [[0,1], 0,0,this.bet_areas[6].width,0];
			this.bet_areas[6].fillCmd = this.bet_areas[6].graphics.beginLinearGradientFill(this.player_color.default, ...this.bet_areas[6].gradientOptions).command;
			this.bet_areas[6].graphics.drawRect(0,0,this.bet_areas[6].width, this.bet_areas[6].height)
			this.bet_areas[6].setBounds(0,0,this.bet_areas[6].width,this.bet_areas[6].height);
			this.bet_areas[6].table_name = "player";
			this.bet_areas[6].min_bet = mainAreaMin;
			this.bet_areas[6].max_bet = mainAreaMax;
			this.bet_areas[6].chips = [];
			this.bet_areas[6].payout_multiplier = 1;
			this.bet_areas[6].portrait = true
			this.bet_areas[6].slave = "supersix"

			// tie
			this.bet_areas[7] = new createjs.Shape();
			this.bet_areas[7].width = 140;
			this.bet_areas[7].height = 201;
			this.bet_areas[7].x = startX +  290;
			this.bet_areas[7].posX = 290;
			this.bet_areas[7].posY = 320;
			this.bet_areas[7].color = this.tie_color;
			this.bet_areas[7].gradientOptions = [[0,1], 0,0,this.bet_areas[7].width,0];
			this.bet_areas[7].fillCmd = this.bet_areas[7].graphics.beginLinearGradientFill(this.tie_color.default, ...this.bet_areas[7].gradientOptions).command;

			this.bet_areas[7].graphics.drawRect(0,0,this.bet_areas[7].width, this.bet_areas[7].height)
			this.bet_areas[7].setBounds(0,0,this.bet_areas[7].width,this.bet_areas[7].height);
			this.bet_areas[7].table_name = "tie";
			this.bet_areas[7].min_bet = tieMin;
			this.bet_areas[7].max_bet = tieMax;
			this.bet_areas[7].chips = [];
			this.bet_areas[7].payout_multiplier = 8;
			this.bet_areas[7].portrait = true;
			this.bet_areas[7].slave = "supersix"

			//banker
			this.bet_areas[8] = new createjs.Shape();
			this.bet_areas[8].width = 278;
			this.bet_areas[8].height = 204;
			this.bet_areas[8].x =startX +  430;
			this.bet_areas[8].posX = 430;
			this.bet_areas[8].posY = 320;
			this.bet_areas[8].color = this.banker_color;
			this.bet_areas[8].gradientOptions = [[0,1], 0,0,this.bet_areas[8].width,0];
			this.bet_areas[8].fillCmd = this.bet_areas[8].graphics.beginLinearGradientFill(this.banker_color.default, ...this.bet_areas[8].gradientOptions).command;
			this.bet_areas[8].graphics.drawRect(0,0, this.bet_areas[8].width, this.bet_areas[8].height);
			this.bet_areas[8].setBounds(0,0,this.bet_areas[8].width,210);
			this.bet_areas[8].table_name = "banker";
			this.bet_areas[8].min_bet = mainAreaMin;
			this.bet_areas[8].max_bet = mainAreaMax;
			this.bet_areas[8].chips = [];
			this.bet_areas[8].payout_multiplier = 0.95
			this.bet_areas[8].portrait = true
			this.bet_areas[8].slave = "supersix"

			//bankerpair
			this.bet_areas[9] = new createjs.Shape();
			this.bet_areas[9].width = 278;
			this.bet_areas[9].height = 202;
			this.bet_areas[9].x =startX +  430;
			this.bet_areas[9].posX = 430;
			this.bet_areas[9].posY = 520;
			this.bet_areas[9].color = this.bankerpair_color;
			this.bet_areas[9].gradientOptions = [[0.2,1], 0,136,this.bet_areas[9].width,0];
			this.bet_areas[9].fillCmd = this.bet_areas[9].graphics.beginLinearGradientFill(this.bankerpair_color.default, ...this.bet_areas[9].gradientOptions).command;
			this.bet_areas[9].graphics.drawRect(0,0,this.bet_areas[4].width, this.bet_areas[9].height)
			this.bet_areas[9].setBounds(0,0,this.bet_areas[9].width,this.bet_areas[9].height);
			this.bet_areas[9].table_name = "bankerpair";
			this.bet_areas[9].min_bet = pairMin;
			this.bet_areas[9].max_bet = pairMax;
			this.bet_areas[9].chips = [];
			this.bet_areas[9].payout_multiplier =11
			this.bet_areas[9].portrait = true;
			this.bet_areas[9].slave = "supersix"

			//supersix
			this.bet_areas[10] = new createjs.Shape();
			this.bet_areas[10].width = 140;
			this.bet_areas[10].height = 201;
			this.bet_areas[10].x = startX + 290;
			this.bet_areas[10].posX = 290;
			this.bet_areas[10].posY = 320 + (201);
			this.bet_areas[10].color = this.supersix_color;
			this.bet_areas[10].gradientOptions = [[0.2,1], 0,136,this.bet_areas[10].width,0];
			this.bet_areas[10].fillCmd = this.bet_areas[10].graphics.beginLinearGradientFill(this.supersix_color.default, ...this.bet_areas[10].gradientOptions).command;
			this.bet_areas[10].graphics.drawRect(0,0,this.bet_areas[10].width, this.bet_areas[10].height)
			this.bet_areas[10].setBounds(0,0,this.bet_areas[10].width,this.bet_areas[10].height);
			this.bet_areas[10].table_name = "supersix";
			this.bet_areas[10].min_bet = superMin;
			this.bet_areas[10].max_bet = superMax;
			this.bet_areas[10].visible = true;
			this.bet_areas[10].payout_multiplier = 12;
			this.bet_areas[10].portrait = true
			this.bet_areas[10].slave = "supersix"

			/** landscape areas start here */
			this.bet_areas[11] = new createjs.Shape();
			this.bet_areas[11].width = 205;
			this.bet_areas[11].x = 160;
			this.bet_areas[11].posY = 425;
			this.bet_areas[11].color = this.playerpair_color;
			this.bet_areas[11].gradientOptions = [[0.2,1], 10,-136,this.bet_areas[11].width,0];
			this.bet_areas[11].fillCmd = this.bet_areas[11].graphics.beginLinearGradientFill(this.playerpair_color.default, ...this.bet_areas[11].gradientOptions).command;
			this.bet_areas[11].graphics.moveTo(0, 0).lineTo(this.bet_areas[11].width, 0)
			.lineTo(this.bet_areas[11].width-82, 134)
			.lineTo(-136, 134)
			.lineTo(0, 0);
			this.bet_areas[11].setBounds(0,0,this.bet_areas[11].width,134);
			this.bet_areas[11].table_name = "playerpair";
			this.bet_areas[11].min_bet = pairMin;
			this.bet_areas[11].max_bet = pairMax;
			this.bet_areas[11].chips = [];
			this.bet_areas[11].payout_multiplier = 11;
			this.bet_areas[11].portrait = false
			this.bet_areas[11].slave = "classic"


			// player
			this.bet_areas[12] = new createjs.Shape();
			this.bet_areas[12].width = 184;
			this.bet_areas[12].x = 366;
			this.bet_areas[12].posY = 425;
			this.bet_areas[12].color = this.player_color;
			this.bet_areas[12].gradientOptions = [[0,1], 0,0,this.bet_areas[12].width,0];
			this.bet_areas[12].fillCmd = this.bet_areas[12].graphics.beginLinearGradientFill(this.player_color.default, ...this.bet_areas[12].gradientOptions).command;
			this.bet_areas[12].graphics.moveTo(0, 0).lineTo(this.bet_areas[12].width, 0)
			.lineTo(this.bet_areas[12].width-28, 134)
			.lineTo(-82, 134)
			.lineTo(0, 0);
			this.bet_areas[12].setBounds(0,0,this.bet_areas[12].width,134);
			this.bet_areas[12].table_name = "player";
			this.bet_areas[12].min_bet = mainAreaMin;
			this.bet_areas[12].max_bet = mainAreaMax;
			this.bet_areas[12].chips = [];
			this.bet_areas[12].payout_multiplier = 1;
			this.bet_areas[12].portrait = false
			this.bet_areas[12].slave = "classic"

			// tie
			this.bet_areas[13] = new createjs.Shape();
			this.bet_areas[13].x = 550;
			this.bet_areas[13].width = 184;
			this.bet_areas[13].posY = 425;
			this.bet_areas[13].color = this.tie_color;
			this.bet_areas[13].gradientOptions = [[0,1], 0,0,this.bet_areas[13].width,0];
			this.bet_areas[13].fillCmd = this.bet_areas[13].graphics.beginLinearGradientFill(this.tie_color.default, ...this.bet_areas[13].gradientOptions).command;
			this.bet_areas[13].graphics.moveTo(0, 0).lineTo(this.bet_areas[13].width, 0)
			.lineTo(this.bet_areas[13].width+27, 134)
			.lineTo(-28, 134)
			.lineTo(0, 0);
			this.bet_areas[13].setBounds(0,0,this.bet_areas[13].width,134);
			this.bet_areas[13].table_name = "tie";
			this.bet_areas[13].min_bet = tieMin;
			this.bet_areas[13].max_bet = tieMax;
			this.bet_areas[13].chips = [];
			this.bet_areas[13].payout_multiplier = 8;
			this.bet_areas[13].portrait = false
			this.bet_areas[13].slave = "classic"

			//banker
			this.bet_areas[14] = new createjs.Shape();
			this.bet_areas[14].width = 182;
			this.bet_areas[14].x = 735;
			this.bet_areas[14].posY = 425;
			this.bet_areas[14].color = this.banker_color;
			this.bet_areas[14].gradientOptions = [[0,1], 0,0,this.bet_areas[14].width,0];
			this.bet_areas[14].fillCmd = this.bet_areas[14].graphics.beginLinearGradientFill(this.banker_color.default, ...this.bet_areas[14].gradientOptions).command;
			this.bet_areas[14].graphics.moveTo(0, 0).lineTo(this.bet_areas[14].width, 0)
			.lineTo(this.bet_areas[14].width+84, 134)
			.lineTo(28, 134)
			.lineTo(0, 0);
			this.bet_areas[14].setBounds(0,0,this.bet_areas[14].width,134);
			this.bet_areas[14].table_name = "banker";
			this.bet_areas[14].min_bet = mainAreaMin;
			this.bet_areas[14].max_bet = mainAreaMax;
			this.bet_areas[14].chips = [];
			this.bet_areas[14].payout_multiplier = 0.95
			this.bet_areas[14].portrait = false
			this.bet_areas[14].slave = "classic"

			//bankerpair
			this.bet_areas[15] = new createjs.Shape();
			this.bet_areas[15].width = 200;
			this.bet_areas[15].x = 920;
			this.bet_areas[15].posY = 425;
			this.bet_areas[15].color = this.bankerpair_color;
			this.bet_areas[15].gradientOptions = [[0.2,1], 0,136,this.bet_areas[15].width,0];
			this.bet_areas[15].fillCmd = this.bet_areas[15].graphics.beginLinearGradientFill(this.bankerpair_color.default, ...this.bet_areas[15].gradientOptions).command;
			this.bet_areas[15].graphics.moveTo(0, 0).lineTo(this.bet_areas[15].width, 0)
			.lineTo(this.bet_areas[15].width+136, 134)
			.lineTo(84, 134)
			.lineTo(0, 0);
			this.bet_areas[15].setBounds(0,0,this.bet_areas[15].width,134);
			this.bet_areas[15].table_name = "bankerpair";
			this.bet_areas[15].min_bet = pairMin;
			this.bet_areas[15].max_bet = pairMax;
			this.bet_areas[15].chips = [];
			this.bet_areas[15].payout_multiplier =11
			this.bet_areas[15].portrait = false
			this.bet_areas[15].slave = "classic"
			console.log(this.bet_areas[15], "bankerpair")

			//**landscape supersix **//
			this.bet_areas[16] = new createjs.Shape();
			this.bet_areas[16].width = 205;
			this.bet_areas[16].x = 160;
			this.bet_areas[16].posY = 425;
			this.bet_areas[16].color = this.playerpair_color;
			this.bet_areas[16].gradientOptions = [[0.2,1], 10,-136,this.bet_areas[16].width,0];
			this.bet_areas[16].fillCmd = this.bet_areas[16].graphics.beginLinearGradientFill(this.playerpair_color.default, ...this.bet_areas[16].gradientOptions).command;
			this.bet_areas[16].graphics.moveTo(0, 0).lineTo(this.bet_areas[16].width, 0)
			.lineTo(this.bet_areas[16].width-82, 134)
			.lineTo(-136, 134)
			.lineTo(0, 0);
			this.bet_areas[16].setBounds(0,0,this.bet_areas[16].width,134);
			this.bet_areas[16].table_name = "playerpair";
			this.bet_areas[16].min_bet = pairMin;
			this.bet_areas[16].max_bet = pairMax;
			this.bet_areas[16].chips = [];
			this.bet_areas[16].payout_multiplier = 11;
			this.bet_areas[16].portrait = false
			this.bet_areas[16].slave = "supersix"


			// player
			this.bet_areas[17] = new createjs.Shape();
			this.bet_areas[17].width = 184;
			this.bet_areas[17].x = 366;
			this.bet_areas[17].posY = 425;
			this.bet_areas[17].color = this.player_color;
			this.bet_areas[17].gradientOptions = [[0,1], 0,0,this.bet_areas[17].width,0];
			this.bet_areas[17].fillCmd = this.bet_areas[17].graphics.beginLinearGradientFill(this.player_color.default, ...this.bet_areas[17].gradientOptions).command;
			this.bet_areas[17].graphics.moveTo(0, 0).lineTo(this.bet_areas[17].width, 0)
			.lineTo(this.bet_areas[17].width-28, 134)
			.lineTo(-82, 134)
			.lineTo(0, 0);
			this.bet_areas[17].setBounds(0,0,this.bet_areas[17].width,134);
			this.bet_areas[17].table_name = "player";
			this.bet_areas[17].min_bet = mainAreaMin;
			this.bet_areas[17].max_bet = mainAreaMax;
			this.bet_areas[17].chips = [];
			this.bet_areas[17].payout_multiplier = 1;
			this.bet_areas[17].portrait = false
			this.bet_areas[17].slave = "supersix"

			// tie
			this.bet_areas[18] = new createjs.Shape();
			this.bet_areas[18].x = 550;
			this.bet_areas[18].width = 184;
			this.bet_areas[18].posY = 425;
			this.bet_areas[18].color = this.tie_color;
			this.bet_areas[18].gradientOptions = [[0,1], 0,0,this.bet_areas[18].width,0];
			this.bet_areas[18].fillCmd = this.bet_areas[18].graphics.beginLinearGradientFill(this.tie_color.default, ...this.bet_areas[18].gradientOptions).command;
			this.bet_areas[18].graphics.moveTo(0, 0).lineTo(this.bet_areas[18].width, 0)
			.lineTo(this.bet_areas[18].width+12, 60)
			.lineTo(-12, 60)
			.lineTo(0, 0);
			this.bet_areas[18].setBounds(0,0,this.bet_areas[18].width,60);
			this.bet_areas[18].table_name = "tie";
			this.bet_areas[18].min_bet = tieMin;
			this.bet_areas[18].max_bet = tieMax;
			this.bet_areas[18].chips = [];
			this.bet_areas[18].payout_multiplier = 8;
			this.bet_areas[18].portrait = false
			this.bet_areas[18].slave = "supersix"
			console.log("supersix tie", this.bet_areas[18])

			//banker
			this.bet_areas[19] = new createjs.Shape();
			this.bet_areas[19].width = 182;
			this.bet_areas[19].x = 735;
			this.bet_areas[19].posY = 425;
			this.bet_areas[19].color = this.banker_color;
			this.bet_areas[19].gradientOptions = [[0,1], 0,0,this.bet_areas[19].width,0];
			this.bet_areas[19].fillCmd = this.bet_areas[19].graphics.beginLinearGradientFill(this.banker_color.default, ...this.bet_areas[19].gradientOptions).command;
			this.bet_areas[19].graphics.moveTo(0, 0).lineTo(this.bet_areas[19].width, 0)
			.lineTo(this.bet_areas[19].width+84, 134)
			.lineTo(28, 134)
			.lineTo(0, 0);
			this.bet_areas[19].setBounds(0,0,this.bet_areas[19].width,134);
			this.bet_areas[19].table_name = "banker";
			this.bet_areas[19].min_bet = mainAreaMin;
			this.bet_areas[19].max_bet = mainAreaMax;
			this.bet_areas[19].chips = [];
			this.bet_areas[19].payout_multiplier = 0.95
			this.bet_areas[19].portrait = false
			this.bet_areas[19].slave = "supersix"

			//bankerpair
			this.bet_areas[20] = new createjs.Shape();
			this.bet_areas[20].width = 200;
			this.bet_areas[20].x = 920;
			this.bet_areas[20].posY = 425;
			this.bet_areas[20].color = this.bankerpair_color;
			this.bet_areas[20].gradientOptions = [[0.2,1], 0,136,this.bet_areas[20].width,0];
			this.bet_areas[20].fillCmd = this.bet_areas[20].graphics.beginLinearGradientFill(this.bankerpair_color.default, ...this.bet_areas[20].gradientOptions).command;
			this.bet_areas[20].graphics.moveTo(0, 0).lineTo(this.bet_areas[20].width, 0)
			.lineTo(this.bet_areas[20].width+136, 134)
			.lineTo(84, 134)
			.lineTo(0, 0);
			this.bet_areas[20].setBounds(0,0,this.bet_areas[20].width,134);
			this.bet_areas[20].table_name = "bankerpair";
			this.bet_areas[20].min_bet = pairMin;
			this.bet_areas[20].max_bet = pairMax;
			this.bet_areas[20].chips = [];
			this.bet_areas[20].payout_multiplier =11
			this.bet_areas[20].portrait = false
			this.bet_areas[20].slave = "supersix"
			//supersix
			this.bet_areas[21] = new createjs.Shape();
			this.bet_areas[21].width = 208;
			this.bet_areas[21].x = 538;
			this.bet_areas[21].posY = 425 + 60;
			this.bet_areas[21].color = this.supersix_color;
			this.bet_areas[21].gradientOptions = [[0,1], 0,0,this.bet_areas[21].width,0];
			this.bet_areas[21].fillCmd = this.bet_areas[21].graphics.beginLinearGradientFill(this.supersix_color.default, ...this.bet_areas[21].gradientOptions).command;
			this.bet_areas[21].graphics.moveTo(0, 0).lineTo(this.bet_areas[21].width, 0)
			.lineTo(this.bet_areas[21].width+18, 74)
			.lineTo(-18, 74)
			.lineTo(0, 0);
			this.bet_areas[21].setBounds(0,0,this.bet_areas[21].width,74);
			this.bet_areas[21].table_name = "supersix";
			this.bet_areas[21].min_bet = tieMin;
			this.bet_areas[21].max_bet = tieMax;
			this.bet_areas[21].chips = [];
			this.bet_areas[21].payout_multiplier = 8;
			this.bet_areas[21].portrait = false
			this.bet_areas[21].slave = "supersix"
			console.log("supersix tie", this.bet_areas[21])


			this.classic_outline =this.context.component_tableOutline.singleClassic().portrait;
			this.supersix_outline = this.context.component_tableOutline.singleSuper().portrait;
			this.classic_outline_landscape =this.context.component_tableOutline.singleClassic().landscape;
			this.supersix_outline_landscape = this.context.component_tableOutline.singleSuper().landscape;

			for(var x = 0; x < this.bet_areas.length; x++) {
				this.bet_areas[x].y = posY;
				
				if(this.bet_areas[x].posY) this.bet_areas[x].y = this.bet_areas[x].posY;

				if(x > 15) this.bet_areas[x].x += 1280;

				this.bet_areas[x].chip_anim_toPlay = 1;
				this.bet_areas[x].chip_drop_scale = 0.8;
				
				if(this.bet_areas[x].portrait) {
					this.bet_areas[x].chip_anim_toPlay = 0;
					this.bet_areas[x].chip_drop_scale = 1;
				}

				this.bet_areas[x].total_bet_amt = 0;
				this.bet_areas[x].min_betAmt = this.bet_areas[x].min_bet;
				this.bet_areas[x].max_betAmt = this.bet_areas[x].max_bet;
				this.bet_areas[x].balanceBet = false;

				this.classic_outline.hitArea = this.bet_areas[x];
				this.supersix_outline.hitArea = this.bet_areas[x];

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
		},
    screenOrientation() {
      let y = 0;
      let width = 0;
      let hide = false;

      if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
        width = this.context.stage.baseHeight;
        y = 320;
        hide = true;
      } else {
        width = this.context.stage.baseWidth;
        // y = this.context.stage.baseHeight /2 - 50;
        y = 320;
        hide = false;
      }

      // this.classic_outline.updateCache();

      console.log('hide', hide);

      this.tableBg.graphics.clear().beginFill('#572e34').drawRect(0,y,width, 700)
      this.tableBg.visible = false;

      console.log('classic_outline', this.classic_outline);

      console.log('crash', this.tableBg);

      // this.removeAllChildren();
      // this.main()

    }
	});

	return instance;
}
