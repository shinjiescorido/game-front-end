import {createSprite, randomNum, getSlaveParam} from '../../factories/factories';

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

			this.default_color = "rgba(255,255,255,0.01)";

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


			let y = this.context.stage.baseHeight /2 + 84;
			// playerpair
			this.bet_areas[0] = new createjs.Shape();
			this.bet_areas[0].width = 278;
			this.bet_areas[0].x = 295;
			this.bet_areas[0].color = this.playerpair_color;
			this.bet_areas[0].gradientOptions = [[0.2,1], 10,-136,this.bet_areas[0].width,0];
			this.bet_areas[0].fillCmd = this.bet_areas[0].graphics.beginLinearGradientFill(this.playerpair_color.default, ...this.bet_areas[0].gradientOptions).command;
			this.bet_areas[0].graphics.moveTo(0, 0).lineTo(this.bet_areas[0].width, 0)
			.lineTo(this.bet_areas[0].width-78, 210)
			.lineTo(-136, 210)
			.lineTo(0, 0);
			this.bet_areas[0].setBounds(0,0,this.bet_areas[0].width,210);
			this.bet_areas[0].table_name = "playerpair";
			this.bet_areas[0].min_bet = pairMin;
			this.bet_areas[0].max_bet = pairMax;
			this.bet_areas[0].chips = [];
			this.bet_areas[0].payout_multiplier = 11;

			// player
			this.bet_areas[1] = new createjs.Shape();
			this.bet_areas[1].width = 260;
			this.bet_areas[1].x = 574;
			this.bet_areas[1].color = this.player_color;
			this.bet_areas[1].gradientOptions = [[0,1], 0,0,this.bet_areas[1].width,0];
			this.bet_areas[1].fillCmd = this.bet_areas[1].graphics.beginLinearGradientFill(this.player_color.default, ...this.bet_areas[1].gradientOptions).command;

			this.bet_areas[1].graphics.moveTo(0, 0).lineTo(this.bet_areas[1].width, 0)
			.lineTo(this.bet_areas[1].width-28, 210)
			.lineTo(-78, 210)
			.lineTo(0, 0);
			this.bet_areas[1].setBounds(0,0,this.bet_areas[1].width,210);
			this.bet_areas[1].table_name = "player";
			this.bet_areas[1].min_bet = mainAreaMin;
			this.bet_areas[1].max_bet = mainAreaMax;
			this.bet_areas[1].chips = [];
			this.bet_areas[1].payout_multiplier = 1;

			// tie
			this.bet_areas[2] = new createjs.Shape();
			this.bet_areas[2].width = 256;
			this.bet_areas[2].x = 832;
			this.bet_areas[2].color = this.tie_color;
			this.bet_areas[2].gradientOptions = [[0,1], 0,0,this.bet_areas[2].width,0];
			this.bet_areas[2].fillCmd = this.bet_areas[2].graphics.beginLinearGradientFill(this.tie_color.default, ...this.bet_areas[2].gradientOptions).command;

			this.bet_areas[2].graphics.moveTo(0, 0).lineTo(this.bet_areas[2].width, 0)
			.lineTo(this.bet_areas[2].width+27, 210)
			.lineTo(-28, 210)
			.lineTo(0, 0);
			this.bet_areas[2].setBounds(0,0,this.bet_areas[2].width,210);
			this.bet_areas[2].table_name = "tie";
			this.bet_areas[2].min_bet = tieMin;
			this.bet_areas[2].max_bet = tieMax;
			this.bet_areas[2].chips = [];
			this.bet_areas[2].payout_multiplier = 8;

			//banker
			this.bet_areas[3] = new createjs.Shape();
			this.bet_areas[3].width = 258;
			this.bet_areas[3].x = 1090;
			this.bet_areas[3].color = this.banker_color;
			this.bet_areas[3].gradientOptions = [[0,1], 0,0,this.bet_areas[3].width,0];
			this.bet_areas[3].fillCmd = this.bet_areas[3].graphics.beginLinearGradientFill(this.banker_color.default, ...this.bet_areas[3].gradientOptions).command;

			this.bet_areas[3].graphics.moveTo(0, 0).lineTo(this.bet_areas[3].width, 0)
			.lineTo(this.bet_areas[3].width+78, 210)
			.lineTo(28, 210)
			.lineTo(0, 0);
			this.bet_areas[3].setBounds(0,0,this.bet_areas[3].width,210);
			this.bet_areas[3].table_name = "banker";
			this.bet_areas[3].min_bet = mainAreaMin;
			this.bet_areas[3].max_bet = mainAreaMax;
			this.bet_areas[3].chips = [];
			this.bet_areas[3].payout_multiplier = 0.95

			//bankerpair
			this.bet_areas[4] = new createjs.Shape();
			this.bet_areas[4].width = 258;
			this.bet_areas[4].x = 1348;
			this.bet_areas[4].color = this.bankerpair_color;
			this.bet_areas[4].gradientOptions = [[0.2,1], 0,136,this.bet_areas[4].width,0];
			this.bet_areas[4].fillCmd = this.bet_areas[4].graphics.beginLinearGradientFill(this.bankerpair_color.default, ...this.bet_areas[4].gradientOptions).command;

			this.bet_areas[4].graphics.moveTo(0, 0).lineTo(this.bet_areas[4].width, 0)
			.lineTo(this.bet_areas[4].width+136, 210)
			.lineTo(78, 210)
			.lineTo(0, 0);
			this.bet_areas[4].setBounds(0,0,this.bet_areas[4].width,210);
			this.bet_areas[4].table_name = "bankerpair";
			this.bet_areas[4].min_bet = pairMin;
			this.bet_areas[4].max_bet = pairMax;
			this.bet_areas[4].chips = [];
			this.bet_areas[4].payout_multiplier =11

			//supersix
			this.bet_areas[5] = new createjs.Shape();
			this.bet_areas[5].width = 280;
			this.bet_areas[5].x = 820;
			this.bet_areas[5].color = this.supersix_color;
			this.bet_areas[5].gradientOptions = [[0.2,1], 0,136,this.bet_areas[5].width,0];
			this.bet_areas[5].fillCmd = this.bet_areas[5].graphics.beginLinearGradientFill(this.supersix_color.default, ...this.bet_areas[5].gradientOptions).command;
			this.bet_areas[5].graphics.moveTo(0, 0).lineTo(this.bet_areas[5].width, 0)
			.lineTo(this.bet_areas[5].width+14, 110)
			.lineTo(-14, 110)
			.lineTo(0, 0);
			this.bet_areas[5].setBounds(0,0,this.bet_areas[5].width,110);
			this.bet_areas[5].table_name = "supersix";
			this.bet_areas[5].min_bet = superMin;
			this.bet_areas[5].max_bet = superMax;
			this.bet_areas[5].visible = false;
			this.bet_areas[5].payout_multiplier = 12;

			// big
			this.bet_areas[6] = new createjs.Shape();
			this.bet_areas[6].width = 154;
			this.bet_areas[6].x = 300;
			this.bet_areas[6].color = this.playerpair_color;
			this.bet_areas[6].gradientOptions = [[0.2,1], 10, -100 ,this.bet_areas[6].width ,0];
			this.bet_areas[6].fillCmd = this.bet_areas[6].graphics.beginLinearGradientFill(this.playerpair_color.default, ...this.bet_areas[6].gradientOptions).command;
			this.bet_areas[6].graphics.moveTo(0, 0).lineTo(this.bet_areas[6].width, 0)
			.lineTo(this.bet_areas[6].width-82, 162)
			.lineTo(-114, 162)
			.lineTo(0, 0);
			this.bet_areas[6].setBounds(0,0,this.bet_areas[6].width,162);
			this.bet_areas[6].table_name = "big";
			this.bet_areas[6].min_bet = sizeMin;
			this.bet_areas[6].max_bet = sizeMax;
			this.bet_areas[6].visible = false;
			this.bet_areas[6].chips = [];

			// small
			this.bet_areas[7] = new createjs.Shape();
			this.bet_areas[7].width = 154;
			this.bet_areas[7].x = 1464;
			this.bet_areas[7].color = this.bankerpair_color;
			this.bet_areas[7].gradientOptions = [[0.2,1], 0, 100, this.bet_areas[7].width,0];
			this.bet_areas[7].fillCmd = this.bet_areas[7].graphics.beginLinearGradientFill(this.bankerpair_color.default, ...this.bet_areas[7].gradientOptions).command;
			this.bet_areas[7].graphics.moveTo(0, 0).lineTo(this.bet_areas[7].width, 0)
			.lineTo(this.bet_areas[7].width+114, 162)
			.lineTo(81, 162)
			.lineTo(0, 0);
			this.bet_areas[7].setBounds(0,0,this.bet_areas[7].width,162);
			this.bet_areas[7].table_name = "small";
			this.bet_areas[7].min_bet = sizeMin;
			this.bet_areas[7].max_bet = sizeMax;
			this.bet_areas[7].visible = false;
			this.bet_areas[7].chips = [];

			// player bonus
			this.bet_areas[8] = new createjs.Shape();
			this.bet_areas[8].width = 74;
			this.bet_areas[8].x = 580;
			this.bet_areas[8].color = this.player_color;
			this.bet_areas[8].gradientOptions = [[0.2,1], 10,this.bet_areas[8].width/2,this.bet_areas[8].width,0];
			this.bet_areas[8].fillCmd = this.bet_areas[8].graphics.beginLinearGradientFill(this.player_color.default, ...this.bet_areas[8].gradientOptions).command;
			this.bet_areas[8].graphics.drawCircle(0,0,this.bet_areas[8].width);
			this.bet_areas[8].setBounds(0,0,(this.bet_areas[8].width/2) - 20,(this.bet_areas[8].width/2) - 35);
			this.bet_areas[8].scaleY = 0.8;
			this.bet_areas[8].table_name = "bonus_player";
			this.bet_areas[8].min_bet = bonusMin;
			this.bet_areas[8].max_bet = bonusMax;
			this.bet_areas[8].visible = false;
			this.bet_areas[8].chips = [];

			// banker bonus
			this.bet_areas[9] = new createjs.Shape();
			this.bet_areas[9].width = 74;
			this.bet_areas[9].x = 1338;
			this.bet_areas[9].skewX = -6;
			this.bet_areas[9].color = this.banker_color;
			this.bet_areas[9].gradientOptions = [[0.2,1], 10,-136,this.bet_areas[9].width,0];
			this.bet_areas[9].fillCmd = this.bet_areas[9].graphics.beginLinearGradientFill(this.banker_color.default, ...this.bet_areas[9].gradientOptions).command;
			this.bet_areas[9].graphics.drawCircle(0,0,this.bet_areas[9].width);
			this.bet_areas[9].setBounds(0,0,(this.bet_areas[9].width/2) - 20,(this.bet_areas[9].width/2) - 35);
			this.bet_areas[9].scaleY = 0.8;
			this.bet_areas[9].table_name = "bonus_banker";
			this.bet_areas[9].min_bet = bonusMin;
			this.bet_areas[9].max_bet = bonusMax;
			this.bet_areas[9].visible = false;
			this.bet_areas[9].chips = [];

			this.classic_outline =this.context.component_tableOutline.singleClassic();
			this.classic_outline.singleplayer = true;
			this.classic_outline.multiplayer = false;

			this.supersix_outline = this.context.component_tableOutline.singleSuper();
			this.supersix_outline.singleplayer = true;
			this.supersix_outline.multiplayer = false;

			this.bonus_outline = this.context.component_tableOutline.singleBonus();
			this.bonus_outline.singleplayer = true;
			this.bonus_outline.multiplayer = false;

			for(var x = 0; x < this.bet_areas.length; x++) {
				this.bet_areas[x].y = y;
				if(this.bet_areas[x].table_name === 'supersix') {
					this.bet_areas[x].y = y + 100;
				}

				if(this.bet_areas[x].table_name.indexOf('bonus') >-1) {
					this.bet_areas[x].y = y + 148;
				}

				this.bet_areas[x].chip_anim_toPlay = 1;
				this.bet_areas[x].chip_drop_scale = 0.8;
				this.bet_areas[x].singleplayer = true;
				this.bet_areas[x].multiplayer = false;
				this.bet_areas[x].total_bet_amt = 0;
				this.bet_areas[x].min_betAmt = this.bet_areas[x].min_bet;
				this.bet_areas[x].max_betAmt = this.bet_areas[x].max_bet;

				this.classic_outline.hitArea = this.bet_areas[x];
				this.bonus_outline.hitArea = this.bet_areas[x];
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

			// this.context.component_toggle.toggleSlave(this.context.component_toggle.classicButton);
		}
	});

	return instance;
}
