import {
  createSprite,
  randomNum,
  createCardSprite,
  numberCounter,
  playSound,
  numberWithCommas,
  createSpriteRoadMap,
  getSlaveParam
} from '../../factories/factories';

let instance = null;

export default (opposite_bet) => {
	instance = instance || new blu.Component({
		bet_areas: [],
		opposites: null,
		user_1 : [],
		user_2 : [],
		user_3 : [],
		user_5 : [],
		user_6 : [],
		user_7 : [],
		user_8 : [],
		user_1_name : null,
		user_2_name : null,
		user_3_name : null,
		user_5_name : null,
		user_7_name : null,
		user_8_name : null,
		main() {
			this.visible = false;
			this.rangeDetails = window.rangeDetails;

			//Main area range
			let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
			if (window.mainMultiplier % 10) mainMultiplier = 1;
			let mainAreaMin = (this.rangeDetails.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
    	let mainAreaMax = ((this.rangeDetails.max * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

			this.x -= 15;

			// Super6
			this.y = 120;

			//Side ranges
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

			let default_color = "rgba(255,255,255,0.01)";
			let dragonbonus_color = "rgba(153, 101, 21, 1)"; //#996515
			let dgbdef2 = "rgba(153, 101, 21, 0.01)"; //#996515

			this.banker_color = this.context.component_tableDraw.banker_color;
			this.player_color = this.context.component_tableDraw.player_color;
			this.tie_color = this.context.component_tableDraw.tie_color;
			this.supersix_color = this.context.component_tableDraw.supersix_color;
			this.playerpair_color = this.context.component_tableDraw.playerpair_color;
			this.bankerpair_color = this.context.component_tableDraw.bankerpair_color;


			this.classic_outline =this.context.component_tableOutline.multiClassic();
			this.classic_outline.singleplayer = false;
			this.classic_outline.multiplayer = true;
			// this.addChild(this.classic_outline);
			// this.classic_outline.x = 300;
			// this.classic_outline.y = 504;

			this.supersix_outline = this.context.component_tableOutline.multiSuper();
			this.supersix_outline.singleplayer = false;
			this.supersix_outline.multiplayer = true;
			// this.supersix_outline.x = 300;
			// this.supersix_outline.y = 504;
			// this.addChild(this.supersix_outline);

			this.bonus_outline = this.context.component_tableOutline.multiBonus();
			this.bonus_outline.singleplayer = false;
			this.bonus_outline.multiplayer = true;

			//player
			this.bet_areas[0] = new createjs.Shape();
			this.bet_areas[0].width = 288;
			this.bet_areas[0].height = 54;
			this.bet_areas[0].x = 816;
			this.bet_areas[0].y = 762;
			this.bet_areas[0].color = this.player_color;
			this.bet_areas[0].gradientOptions = [[0.2,1], 10,-136,this.bet_areas[0].width,0];
			this.bet_areas[0].fillCmd = this.bet_areas[0].graphics.beginLinearGradientFill(this.player_color.default, ...this.bet_areas[0].gradientOptions).command;
			this.bet_areas[0].graphics.moveTo(0, 0).lineTo(this.bet_areas[0].width, 0)
			.lineTo(this.bet_areas[0].width+8, this.bet_areas[0].height)
			.lineTo(-8, this.bet_areas[0].height)
			.lineTo(0, 0);
			this.bet_areas[0].setBounds(0,0,this.bet_areas[0].width,this.bet_areas[0].height);
			this.bet_areas[0].table_name = "player";
			this.bet_areas[0].min_bet = mainAreaMin;
			this.bet_areas[0].max_bet = mainAreaMax;
			this.bet_areas[0].chips = [];
			//banker
			this.bet_areas[1] = new createjs.Shape();
			this.bet_areas[1].width = 276;
			this.bet_areas[1].height = 48;
			this.bet_areas[1].x = 822;
			this.bet_areas[1].y = 714;
			this.bet_areas[1].color = this.banker_color;
			this.bet_areas[1].gradientOptions = [[0.2,1], 10,-136,this.bet_areas[1].width,0];
			this.bet_areas[1].fillCmd = this.bet_areas[1].graphics.beginLinearGradientFill(this.banker_color.default, ...this.bet_areas[1].gradientOptions).command;
			this.bet_areas[1].graphics.moveTo(0, 0).lineTo(this.bet_areas[1].width, 0)
			.lineTo(this.bet_areas[1].width+6.5, this.bet_areas[1].height)
			.lineTo(-6.5, this.bet_areas[1].height)
			.lineTo(0, 0);
			this.bet_areas[1].setBounds(0,0,this.bet_areas[1].width,this.bet_areas[1].height);
			this.bet_areas[1].table_name = "banker";
			this.bet_areas[1].min_bet = mainAreaMin;
			this.bet_areas[1].max_bet = mainAreaMax;
			this.bet_areas[1].chips = [];

			//banker
			this.bet_areas[2] = new createjs.Shape();
			this.bet_areas[2].width = 264;
			this.bet_areas[2].height = 48;
			this.bet_areas[2].x = 828;
			this.bet_areas[2].y = 714 - 46;
			this.bet_areas[2].color = this.tie_color;
			this.bet_areas[2].gradientOptions = [[0.2,1], 10,-136,this.bet_areas[2].width,0];
			this.bet_areas[2].fillCmd = this.bet_areas[2].graphics.beginLinearGradientFill(this.tie_color.default, ...this.bet_areas[2].gradientOptions).command;
			this.bet_areas[2].graphics.moveTo(0, 0).lineTo(this.bet_areas[2].width, 0)
			.lineTo(this.bet_areas[2].width+6.5, this.bet_areas[2].height)
			.lineTo(-6.5, this.bet_areas[2].height)
			.lineTo(0, 0);
			this.bet_areas[2].setBounds(0,0,this.bet_areas[2].width,this.bet_areas[2].height);
			this.bet_areas[2].table_name = "tie";
			this.bet_areas[2].min_bet = tieMin;
			this.bet_areas[2].max_bet = tieMax;
			this.bet_areas[2].chips = [];

			//playerpair
			this.bet_areas[3] = new createjs.Shape();
			this.bet_areas[3].width = 160;
			this.bet_areas[3].height = 48;
			this.bet_areas[3].x = 546;
			this.bet_areas[3].y = 624;
			this.bet_areas[3].color = this.player_color;
			this.bet_areas[3].gradientOptions = [[0.2,1], 10,-136,this.bet_areas[3].width,0];
			this.bet_areas[3].fillCmd = this.bet_areas[3].graphics.beginLinearGradientFill(this.player_color.default, ...this.bet_areas[3].gradientOptions).command;
			this.bet_areas[3].graphics.moveTo(0, 0).lineTo(this.bet_areas[3].width, 0)
			.lineTo(this.bet_areas[3].width-14, this.bet_areas[3].height)
			.lineTo(-20, this.bet_areas[3].height)
			.lineTo(0, 0);
			this.bet_areas[3].setBounds(0,0,this.bet_areas[3].width,this.bet_areas[3].height);
			this.bet_areas[3].table_name = "playerpair";
			this.bet_areas[3].min_bet = pairMin;
			this.bet_areas[3].max_bet = pairMax;
			this.bet_areas[3].chips = [];

			//bankerpair
			this.bet_areas[4] = new createjs.Shape();
			this.bet_areas[4].width = 160;
			this.bet_areas[4].height = 48;
			this.bet_areas[4].x = 1212;
			this.bet_areas[4].y = 624;
			this.bet_areas[4].color = this.banker_color;
			this.bet_areas[4].gradientOptions = [[0.2,1], 10,-136,this.bet_areas[4].width,0];
			this.bet_areas[4].fillCmd = this.bet_areas[4].graphics.beginLinearGradientFill(this.banker_color.default, ...this.bet_areas[4].gradientOptions).command;
			this.bet_areas[4].graphics.moveTo(0, 0).lineTo(this.bet_areas[4].width, 0)
			.lineTo(this.bet_areas[4].width+20, this.bet_areas[4].height)
			.lineTo(14, this.bet_areas[4].height)
			.lineTo(0, 0);
			this.bet_areas[4].setBounds(0,0,this.bet_areas[4].width,this.bet_areas[4].height);
			this.bet_areas[4].table_name = "bankerpair";
			this.bet_areas[4].min_bet = pairMin;
			this.bet_areas[4].max_bet = pairMax;
			this.bet_areas[4].chips = [];

			//supersix
			this.bet_areas[5] = new createjs.Shape();
			this.bet_areas[5].width = 138;
			this.bet_areas[5].height = 48;
			this.bet_areas[5].x = 960;
			this.bet_areas[5].y = 714;
			this.bet_areas[5].color = this.supersix_color;
			this.bet_areas[5].gradientOptions = [[0.2,1], 10,-136,this.bet_areas[5].width,0];
			this.bet_areas[5].fillCmd = this.bet_areas[5].graphics.beginLinearGradientFill(this.supersix_color.default, ...this.bet_areas[5].gradientOptions).command;
			this.bet_areas[5].graphics.moveTo(0, 0).lineTo(this.bet_areas[5].width, 0)
			.lineTo(this.bet_areas[5].width+6, this.bet_areas[5].height)
			.lineTo(0, this.bet_areas[5].height)
			.lineTo(0, 0);
			this.bet_areas[5].setBounds(0,0,this.bet_areas[5].width,this.bet_areas[5].height);
			this.bet_areas[5].table_name = "supersix";
			this.bet_areas[5].min_bet = pairMin;
			this.bet_areas[5].max_bet = pairMax;
			this.bet_areas[5].chips = [];
			this.bet_areas[5].visible = false;

			//big
			this.bet_areas[6] = new createjs.Shape();
			this.bet_areas[6].width = 170;
			this.bet_areas[6].height = 42;
			this.bet_areas[6].x = 308;
			this.bet_areas[6].y = 630;
			this.bet_areas[6].color = this.playerpair_color;
			this.bet_areas[6].gradientOptions = [[0.2,1], 0,0,this.bet_areas[6].width,0];
			this.bet_areas[6].fillCmd = this.bet_areas[6].graphics.beginLinearGradientFill(this.playerpair_color.hover, ...this.bet_areas[6].gradientOptions).command;
			this.bet_areas[6].graphics.moveTo(0, 0).lineTo(this.bet_areas[6].width, 0)
			.lineTo(this.bet_areas[6].width-20, this.bet_areas[6].height)
			.lineTo(-28, this.bet_areas[6].height)
			.lineTo(0, 0);
			this.bet_areas[6].setBounds(0,0,this.bet_areas[6].width,this.bet_areas[6].height);
			this.bet_areas[6].table_name = "big";
			this.bet_areas[6].min_bet = sizeMin;
			this.bet_areas[6].max_bet = sizeMax;
			this.bet_areas[6].chips = [];
			this.bet_areas[6].visible = false;

			//small
			this.bet_areas[7] = new createjs.Shape();
			this.bet_areas[7].width = 170;
			this.bet_areas[7].height = 42;
			this.bet_areas[7].x = 1440;
			this.bet_areas[7].y = 630;
			this.bet_areas[7].color = this.bankerpair_color;
			this.bet_areas[7].gradientOptions = [[0.2,1], 0,0,this.bet_areas[7].width,0];
			this.bet_areas[7].fillCmd = this.bet_areas[7].graphics.beginLinearGradientFill(this.bankerpair_color.hover, ...this.bet_areas[7].gradientOptions).command;
			this.bet_areas[7].graphics.moveTo(0, 0)
			.lineTo(this.bet_areas[7].width, 0)
			.lineTo(this.bet_areas[7].width+28, this.bet_areas[7].height)
			.lineTo(20, this.bet_areas[7].height)
			.lineTo(0, 0);
			this.bet_areas[7].setBounds(0,0,this.bet_areas[7].width,this.bet_areas[7].height);
			this.bet_areas[7].table_name = "small";
			this.bet_areas[7].min_bet = sizeMin;
			this.bet_areas[7].max_bet = sizeMax;
			this.bet_areas[7].chips = [];
			this.bet_areas[7].visible = false;

			//playerbonus
			this.bet_areas[8] = new createjs.Shape();
			this.bet_areas[8].width = 238;
			this.bet_areas[8].height = 42;
			this.bet_areas[8].x = 478;
			this.bet_areas[8].y = 630;
			this.bet_areas[8].color = this.supersix_color;
			this.bet_areas[8].gradientOptions = [[0.2,1], 0,0,this.bet_areas[8].width,0];
			this.bet_areas[8].fillCmd = this.bet_areas[8].graphics.beginLinearGradientFill(this.supersix_color.hover, ...this.bet_areas[8].gradientOptions).command;
			this.bet_areas[8].graphics.moveTo(0, 0).lineTo(this.bet_areas[8].width, 0)
			.lineTo(this.bet_areas[8].width-12, this.bet_areas[8].height)
			.lineTo(-20, this.bet_areas[8].height)
			.lineTo(0, 0);
			this.bet_areas[8].setBounds(0,0,this.bet_areas[8].width,this.bet_areas[8].height);
			this.bet_areas[8].table_name = "bonus_player";
			this.bet_areas[8].min_bet = bonusMin;
			this.bet_areas[8].max_bet = bonusMax;
			this.bet_areas[8].chips = [];
			this.bet_areas[8].visible = false;

			//bankerbonus
			this.bet_areas[9] = new createjs.Shape();
			this.bet_areas[9].width = 238;
			this.bet_areas[9].height = 42;
			this.bet_areas[9].x = 1205;
			this.bet_areas[9].y = 630;
			this.bet_areas[9].color = this.supersix_color;
			this.bet_areas[9].gradientOptions = [[0.2,1], 0,0,this.bet_areas[9].width,0];
			this.bet_areas[9].fillCmd = this.bet_areas[9].graphics.beginLinearGradientFill(this.supersix_color.hover, ...this.bet_areas[9].gradientOptions).command;
			this.bet_areas[9].graphics.moveTo(0, 0).lineTo(this.bet_areas[9].width, 0)
			.lineTo(this.bet_areas[9].width+20, this.bet_areas[9].height)
			.lineTo(10, this.bet_areas[9].height)
			.lineTo(0, 0);
			this.bet_areas[9].setBounds(0,0,this.bet_areas[9].width,this.bet_areas[9].height);
			this.bet_areas[9].table_name = "bonus_banker";
			this.bet_areas[9].min_bet = bonusMin;
			this.bet_areas[9].max_bet = bonusMax;
			this.bet_areas[9].chips = [];
			this.bet_areas[9].visible = false;


			for(var x =0; x < this.bet_areas.length; x++) {
				this.bet_areas[x].multiplayer = true;
				this.bet_areas[x].false = true;
				this.bet_areas[x].total_bet_amt = 0;

				this.bet_areas[x].chip_anim_toPlay = 0;
				this.bet_areas[x].chip_drop_scale = 0.8;

				this.bet_areas[x].min_betAmt = this.bet_areas[x].min_bet;
				this.bet_areas[x].max_betAmt = this.bet_areas[x].max_bet;

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

				if(this.context.junketAgent) {
					this.bet_areas[x].visible = false;
				}
				// this.context.component_betBoard.addChild(this.bet_areas[x]);
			}

			let users = [1,2,3,6,7,8];
			if(this.context.junketAgent) {
				users = [1,2,3,5,6,7,8]
			}

			var user_icons = [];
			for(var x = 0; x < users.length; x++) {
				user_icons[`user_${users[x]}_icon`] = new createjs.Bitmap(this.context.getResources("user_icon"));
				user_icons[`user_${users[x]}_icon`].scaleX = user_icons[`user_${users[x]}_icon`].scaleY  = 0.5;
				user_icons[`user_${users[x]}_icon`].x =  ((users[x]-1)* 192) + 210
				if(users[x] == 3) {
					user_icons[`user_${users[x]}_icon`].x +=  25
				}
				if(users[x] == 6) {
					user_icons[`user_${users[x]}_icon`].x -=  20
				}
				if(users[x] == 5) {
					user_icons[`user_${users[x]}_icon`].x -=  120
				}
				if(users[x] == 7) {
					user_icons[`user_${users[x]}_icon`].x +=  5
				}
				if(users[x] == 8) {
					user_icons[`user_${users[x]}_icon`].x +=  30
				}
				user_icons[`user_${users[x]}_icon`].y = 720;
				this.addChild(user_icons[`user_${users[x]}_icon`]);

				this[`user_${users[x]}_name`] = new createjs.Text("","16px lato","#fff");
				this[`user_${users[x]}_name`].y = 720;
				this[`user_${users[x]}_name`].x = user_icons[`user_${users[x]}_icon`].x  + 24;
				this.addChild(this[`user_${users[x]}_name`]);

				this[`user_${users[x]}_bet`] = new createjs.Text("","18px bebas-regular","#d8bd69");
				this[`user_${users[x]}_bet`].y = 720;
				this[`user_${users[x]}_bet`].x = this[`user_${users[x]}_name`].x + 155;
				
				if(users[x] == 5) {
					this[`user_${users[x]}_bet`].x = this[`user_${users[x]}_name`].x + 220;
				}

				this[`user_${users[x]}_bet`].textAlign = "right";
				this.addChild(this[`user_${users[x]}_bet`]);

				if(users[x] == 1 || users[x] == 8) {
					this[`user_${users[x]}_bet`].x -= 25;
				  }
			}

			// === user bets
			let color_def2 = "rgba(255,255,255,0.1)";
			let tempColor = 'rgba(255,255,255,0.1)';

			this.default_color = 'rgba(255,255,255,0.4)';

			this.toSet = ["user_1", "user_2","user_3","user_6","user_7","user_8"]

			if(this.context.junketAgent) {
				this.toSet = ["user_1", "user_2","user_3","user_5","user_6","user_7","user_8"]
			}

			// ==== player 1
			this.user_1[0] = new createjs.Shape();
			this.user_1[0].x = 295;
			this.user_1[0].graphics.beginFill(this.default_color)/*.beginLinearGradientFill(["transparent","rgba(255,255,255,0.4)"],[0,1],0,0,60,30)*/
			.moveTo(0,0).lineTo(170,0).lineTo(149,45).lineTo(-30,45).lineTo(0,0);
			this.user_1[0].setBounds(0,0,170,45);
			this.user_1[0].bonus = [0,18, 162,18, 140,62, -40,62, -12,18];
			this.user_1[0].classic = [0,0, 170,0, 149,45, -30,45, 0,0];
			this.user_1[0].y = 551;
			this.user_1[0].betarea = "tie";
			this.user_1[0].alpha = 1;
			this.user_1[0].chips = [];
			this.user_1[0].payout_multiplier = 8;
			this.addChild(this.user_1[0]);

			this.user_1[1] = new createjs.Shape();
			this.user_1[1].x = 363;
			this.user_1[1].graphics.beginFill(this.default_color)/*.beginLinearGradientFill(["transparent","rgba(255,255,255,0.4)"],[0,1],0,0,60,30)*/
			.moveTo(0,0).lineTo(80,0).lineTo(58,46).lineTo(-26,46).lineTo(0,0);
			this.user_1[1].setBounds(0,0,80,48);
			this.user_1[1].y = this.user_1[0].y + 45;
			this.user_1[1].betarea = "supersix";
			this.user_1[1].alpha = 1;
			this.user_1[1].chips = [];
			this.user_1[1].payout_multiplier = 12;
			// this.user_1[1].visible = isSuperSix();
			this.addChild(this.user_1[1]);

			this.user_1[2] = new createjs.Shape();
			this.user_1[2].graphics.beginFill(this.default_color)/*beginLinearGradientFill(["transparent","rgba(255,255,255,0.4)"],[0,1],0,0,50,40)*/
			.moveTo(0,0).lineTo(179,0).lineTo(157,46).lineTo(-29,46).lineTo(0,0);
			this.user_1[2].supersix = [0,0, 98,0, 72,46, -30,46, 0,0];
			this.user_1[2].classic = [0,0, 179,0, 155,46, -29,46, 0,0];

			this.user_1[2].bonus = [0,17, 170,17, 150,56, -38,56, -11,17];
			this.user_1[2].setBounds(0,0,180,46);
			this.user_1[2].x = 265;
			this.user_1[2].y = 596;
			this.user_1[2].betarea = "banker";
			this.user_1[2].alpha = 0;
			this.user_1[2].chips = [];
			this.user_1[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			this.addChild(this.user_1[2]);

			this.user_1[3] = new createjs.Shape();
			this.user_1[3].graphics.beginFill(this.default_color)/*.beginLinearGradientFill(["transparent","rgba(255,255,255,0.4)"],[0,1],0,0,40,45)*/.moveTo(0,-1).lineTo(186,0).lineTo(160,54).lineTo(-34,54).lineTo(0,0);
			this.user_1[3].setBounds(0,0,192,54);
			this.user_1[3].x = 235;
			this.user_1[3].y = 642;
			this.user_1[3].bonus = [0,10, 180,10, 160,56, -40,56, -8,10];
			this.user_1[3].classic = [0,-1, 186,0, 160,54, -34,54, 0,0];
			this.user_1[3].betarea = "player";
			this.user_1[3].alpha = 0;
			this.user_1[3].chips = [];
			this.user_1[3].payout_multiplier = 1;
			this.addChild(this.user_1[3]);

			this.user_1[4] = new createjs.Shape();
			this.user_1[4].graphics
			.beginLinearGradientFill(["rgba(255,255,255,0.01)",this.default_color],[0,1],0,0,40,30)
			.moveTo(0,0).lineTo(67,0).lineTo(40 ,48).lineTo(-30,48).lineTo(0,0);
			this.user_1[4].setBounds(0,0,67,48);
			this.user_1[4].x = 325;
			this.user_1[4].y = 503;
			this.user_1[4].betarea = "playerpair";
			this.user_1[4].alpha = 0;
			this.user_1[4].chips = [];
			this.user_1[4].payout_multiplier = 11;
			this.user_1[4].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_1[4]);

			this.user_1[5] = new createjs.Shape();
			this.user_1[5].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(84,0).lineTo(89,48).lineTo(-1, 48).lineTo(0,0);
			this.user_1[5].setBounds(0,0,84,48);
			this.user_1[5].x = 975;
			this.user_1[5].y = 503;
			this.user_1[5].betarea = "bankerpair";
			this.user_1[5].alpha = 0;
			this.user_1[5].chips = [];
			this.user_1[5].payout_multiplier = 11;
			this.user_1[5].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_1[5]);

			// ==== player 2
			this.user_2[0] = new createjs.Shape();
			this.user_2[0].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(190,0).lineTo(176,45).lineTo(-21,45).lineTo(0,0);
			this.user_2[0].bonus = [-8,18, 190-8,18, 176-8,45+18, -21-8,45+18, -8,18];
			this.user_2[0].classic = [0,0, 190,0, 176,45, -21,45, 0,0];
			this.user_2[0].x = 464; // player 1 tie + player 1 tie width
			this.user_2[0].y = 551;
			this.user_2[0].betarea = "tie";
			this.user_2[0].alpha = 0;
			this.user_2[0].chips = [];
			this.user_2[0].payout_multiplier = 8;
			this.addChild(this.user_2[0]);

			this.user_2[1] = new createjs.Shape();
			this.user_2[1].x = 548;
			this.user_2[1].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(92,0).lineTo(75,46).lineTo(-18,46).lineTo(0,0);
			this.user_2[1].y = 596;
			this.user_2[1].betarea = "supersix";
			this.user_2[1].setBounds(0,0,92,46);
			this.user_2[1].alpha = 0;
			this.user_2[1].chips = [];
			this.user_2[1].payout_multiplier = 12;
			// this.user_2[1].visible = isSuperSix();
			this.addChild(this.user_2[1]);

			this.user_2[2] = new createjs.Shape();
			this.user_2[2].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(196,0).lineTo(181,46).lineTo(-22,46).lineTo(0,0);
			this.user_2[2].supersix = [-2,0, 104,0, 86,46, -24,46, -2,0];
			this.user_2[2].classic = [0,0, 196,0, 181,46, -24,46, 0,0];
			this.user_2[2].bonus = [-10,18,188,18,178,56,-28,56,-10,18];
			this.user_2[2].x = 444; // player 1 banker + player 1 banker width
			this.user_2[2].y = 596;
			this.user_2[2].setBounds(0,0,196,46);
			this.user_2[2].betarea = "banker";
			this.user_2[2].alpha = 0;
			this.user_2[2].chips = [];
			this.user_2[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			this.addChild(this.user_2[2]);

			this.user_2[3] = new createjs.Shape();
			this.user_2[3].graphics.beginFill(this.default_color).moveTo(0,-1).lineTo(204,0).lineTo(187,54).lineTo(-26,54).lineTo(0,0);
			this.user_2[3].classic = [0,-1, 204,0, 187,54, -26,54, 0,0];
			this.user_2[3].bonus = [0,10, 200,10, 187,56, -26,56, -6,10];
			this.user_2[3].x = 421;
			this.user_2[3].y = 642;
			this.user_2[3].setBounds(0,0,204,54);
			this.user_2[3].betarea = "player";
			this.user_2[3].alpha = 0;
			this.user_2[3].chips = [];
			this.user_2[3].payout_multiplier = 1;
			this.addChild(this.user_2[3]);

			this.user_2[4] = new createjs.Shape();
			this.user_2[4].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(85,0).lineTo(63,48).lineTo(-27,48).lineTo(0,0);
			this.user_2[4].setBounds(0,0,85,48);
			this.user_2[4].x = 392;
			this.user_2[4].y = 503;
			this.user_2[4].betarea = "playerpair";
			this.user_2[4].alpha = 0;
			this.user_2[4].chips = [];
			this.user_2[4].payout_multiplier = 11;
			this.user_2[4].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_2[4]);

			this.user_2[5] = new createjs.Shape();
			this.user_2[5].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(83,0).lineTo(93,48).lineTo(5,48).lineTo(0,0);
			this.user_2[5].setBounds(0,0,83,48);
			this.user_2[5].x = 1059;
			this.user_2[5].y = 503;
			this.user_2[5].betarea = "bankerpair";
			this.user_2[5].alpha = 0;
			this.user_2[5].chips = [];
			this.user_2[5].payout_multiplier = 11;
			this.user_2[5].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_2[5]);

			// ==== player 3
			this.user_3[0] = new createjs.Shape();
			this.user_3[0].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(189,0).lineTo(182,45).lineTo(-15.2,45).lineTo(0,0);
			this.user_3[0].classic = [-2,0, 189,0, 182,45, -14.2,45, -2,0];
			this.user_3[0].bonus = [-11,18, 183,18, 179,63, -22,63, -11,18];
			this.user_3[0].x = 655; // player 2 tie + player 2 tie width;
			this.user_3[0].y = 551;
			this.user_3[0].setBounds(0,0,189,45)
			this.user_3[0].betarea = "tie";
			this.user_3[0].alpha = 0;
			this.user_3[0].chips = [];
			this.user_3[0].payout_multiplier = 8;
			this.addChild(this.user_3[0]);

			this.user_3[1] = new createjs.Shape();
			this.user_3[1].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(98,0).lineTo(91,46).lineTo(-12,46).lineTo(0,0);
			this.user_3[1].x = 740;
			this.user_3[1].y = 596;
			this.user_3[1].betarea = "supersix";
			this.user_3[1].setBounds(0,0,98,46);
			this.user_3[1].alpha = 0;
			this.user_3[1].chips = [];
			this.user_3[1].payout_multiplier = 12;
			// this.user_3[1].visible = isSuperSix();
			this.addChild(this.user_3[1]);

			this.user_3[2] = new createjs.Shape();
			this.user_3[2].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(197,0).lineTo(191,46).lineTo(-15.3,46).lineTo(0,0);
			this.user_3[2].supersix = [0,0, 100,0, 88,46, -17,46, 0,0];
			this.user_3[2].classic = [0,0, 197,0, 191,46, -15.3,46, 0,0];
			this.user_3[2].bonus = [-8,18, 194,18, 190,58, -19.3,58, -8,18];
			this.user_3[2].x = 640;
			this.user_3[2].y = 596;
			this.user_3[2].betarea = "banker";
			this.user_3[2].setBounds(0,0,191,46)
			this.user_3[2].alpha = 0;
			this.user_3[2].chips = [];
			this.user_3[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			this.addChild(this.user_3[2]);

			this.user_3[3] = new createjs.Shape();
			this.user_3[3].graphics.beginFill(this.default_color).moveTo(0,-1).lineTo(207.5,0).lineTo(199,54).lineTo(-17.3,54).lineTo(0,0);
			this.user_3[3].classic = [0,-1, 207.5,0 ,199,54, -17.3,54, 0,0];
			this.user_3[3].bonus = [-4,10, 205,10, 200,56, -17.3,56, -4,10];
			this.user_3[3].x = 625;
			this.user_3[3].y = 642;
			this.user_3[3].betarea = "player";
			this.user_3[3].setBounds(0,0,207,54);
			this.user_3[3].alpha = 0;
			this.user_3[3].chips = [];
			this.user_3[3].payout_multiplier = 1;
			this.addChild(this.user_3[3]);

			this.user_3[4] = new createjs.Shape();
			this.user_3[4].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(85,0).lineTo(66,48).lineTo(-22.4,48).lineTo(0,0);
			this.user_3[4].setBounds(0,0,85,48);
			this.user_3[4].x = 477;
			this.user_3[4].y = 503;
			this.user_3[4].betarea = "playerpair";
			this.user_3[4].alpha = 0;
			this.user_3[4].chips = [];
			this.user_3[4].payout_multiplier = 11;
			this.user_3[4].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_3[4]);

			this.user_3[5] = new createjs.Shape();
			this.user_3[5].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(85,0).lineTo(98.7,48).lineTo(9.5,48).lineTo(0,0);
			this.user_3[5].setBounds(0,0,85,48);
			this.user_3[5].x = 1142;
			this.user_3[5].y = 503;
			this.user_3[5].betarea = "bankerpair";
			this.user_3[5].alpha = 0;
			this.user_3[5].chips = [];
			this.user_3[5].payout_multiplier = 11;
			this.user_3[5].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_3[5]);

			// ==== player 5
			this.user_5[0] = new createjs.Shape();
			this.user_5[0].graphics.beginFill(this.default_color).moveTo(1,0).lineTo(265,0).lineTo(272,45).lineTo(-4,45).lineTo(1,0);
			this.user_5[0].x = 842;
			this.user_5[0].y = 551;
			this.user_5[0].betarea = "tie";
			this.user_5[0].visible = this.context.junketAgent;
			this.user_5[0].alpha = 0;
			this.user_5[0].chips = [];
			this.user_5[0].payout_multiplier = 8;
			this.user_5[0].setBounds(0,0,265,45);
			this.addChild(this.user_5[0]);

			this.user_5[1] = new createjs.Shape();
			this.user_5[1].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(140,0).lineTo(146,46).lineTo(0,46).lineTo(0,0);
			this.user_5[1].x = 974;
			this.user_5[1].y = 596;
			this.user_5[1].betarea = "supersix";
			this.user_5[1].visible = this.context.junketAgent;
			this.user_5[1].setBounds(0,0,144,46);
			this.user_5[1].alpha = 0;
			this.user_5[1].chips = [];
			this.user_5[1].payout_multiplier = 12;
			this.addChild(this.user_5[1]);

			this.user_5[2] = new createjs.Shape();
			this.user_5[2].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(275,0).lineTo(282,46).lineTo(-6,46).lineTo(0,0);
			this.user_5[2].supersix = [0,0, 136,0, 136,46, -6,46, 0,0];
			this.user_5[2].classic = [0,0, 275,0, 282,46, -6,46, 0,0];
			this.user_5[2].x = 838;
			this.user_5[2].y = 596;
			this.user_5[2].betarea = "banker";
			this.user_5[2].visible = this.context.junketAgent;
			this.user_5[2].setBounds(0,0,275,46)
			this.user_5[2].alpha = 0;
			this.user_5[2].chips = [];
			this.user_5[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			this.addChild(this.user_5[2]);

			this.user_5[3] = new createjs.Shape();
			this.user_5[3].graphics.beginFill(this.default_color).moveTo(0,-1).lineTo(287,-1).lineTo(296,54).lineTo(-8,54).lineTo(0,0);
			this.user_5[3].classic = [0,-1 ,286,-1 ,294,54 ,-8,54 ,0,0];
			this.user_5[3].x = 832;
			this.user_5[3].y = 642;
			this.user_5[3].betarea = "player";
			this.user_5[3].visible = this.context.junketAgent;
			this.user_5[3].setBounds(0,0,287,54)
			this.user_5[3].alpha = 0;
			this.user_5[3].chips = [];
			this.user_5[3].payout_multiplier = 1;
			this.addChild(this.user_5[3]);

			this.user_5[4] = new createjs.Shape();
			this.user_5[4].graphics.beginFill(this.default_color)/*beginLinearGradientFill(["transparent","rgba(255,255,255,0.4)"],[0,1],0,0,40,45)*/
			.moveTo(0,0).lineTo(160,0).lineTo(146,48).lineTo(-20,48).lineTo(0,0);
			this.user_5[4].setBounds(0,0,160,48);
			this.user_5[4].x = 562;
			this.user_5[4].y = 503;
			this.user_5[4].betarea = "playerpair";
			this.user_5[4].visible = this.context.junketAgent;;
			this.user_5[4].alpha = 0;
			this.user_5[4].chips = [];
			this.user_5[4].payout_multiplier = 11;
			this.addChild(this.user_5[4]);

			this.user_5[5] = new createjs.Shape();
			this.user_5[5].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(160,0).lineTo(182,48).lineTo(15,48).lineTo(0,0);
			this.user_5[5].setBounds(0,0,160,48);
			this.user_5[5].x = 1225;
			this.user_5[5].y = 503;
			this.user_5[5].betarea = "bankerpair";
			this.user_5[5].visible = this.context.junketAgent;
			this.user_5[5].alpha = 0;
			this.user_5[5].chips = [];
			this.user_5[5].payout_multiplier = 11;
			this.addChild(this.user_5[5]);
			// ==== player 6
			this.user_6[0] = new createjs.Shape();
			this.user_6[0].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(188,0).lineTo(204,45).lineTo(5,45).lineTo(0,0);
			this.user_6[0].classic = [-1,0 ,188,0 ,204,45 ,5,45 ,-1,0];
			this.user_6[0].bonus = [3,18, 194,18, 210,63, 8,63, 3,18];
			this.user_6[0].x = 1108;
			this.user_6[0].y = 551;
			this.user_6[0].setBounds(0,0,188,45);
			this.user_6[0].betarea = "tie";
			this.user_6[0].alpha = 0;
			this.user_6[0].chips = [];
			this.user_6[0].payout_multiplier = 8;
			this.addChild(this.user_6[0]);

			this.user_6[1] = new createjs.Shape();
			this.user_6[1].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(98,0).lineTo(112,46).lineTo(10,46).lineTo(0,0);
			this.user_6[1].x = 1214;
			this.user_6[1].y = 596;
			this.user_6[1].betarea = "supersix";
			this.user_6[1].setBounds(0,0,112,46);
			this.user_6[1].alpha = 0;
			this.user_6[1].chips = [];
			this.user_6[1].payout_multiplier = 12;
			this.addChild(this.user_6[1]);

			this.user_6[2] = new createjs.Shape();
			this.user_6[2].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(198.5,0).lineTo(213,46).lineTo(6.5,46).lineTo(0,0);
			this.user_6[2].supersix = [0,0, 101,0, 111,46, 6,46, 0,0];
			this.user_6[2].classic = [0,0, 198.5,0, 213,46, 6.5,46, 0,0];
			this.user_6[2].bonus = [3,18, 204,18, 216,56, 8,56, 3,18];
			this.user_6[2].x = 1113;
			this.user_6[2].y = 596;
			this.user_6[2].betarea = "banker";
			this.user_6[2].setBounds(0,0,198,46)
			this.user_6[2].alpha = 0;
			this.user_6[2].chips = [];
			this.user_6[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			this.addChild(this.user_6[2]);

			this.user_6[3] = new createjs.Shape();
			this.user_6[3].graphics.beginFill(this.default_color).moveTo(0,-1).lineTo(206,-1).lineTo(224,54).lineTo(5.5,54).lineTo(0,0);
			this.user_6[3].bonus = [0,10 ,210,10, 224,56, 5.5,56, 0,10];
			this.user_6[3].classic = [0,-1 ,206,-1 ,224,54 ,5.5,54 ,0,0];
			this.user_6[3].x = 1120;
			this.user_6[3].y = 642;
			this.user_6[3].betarea = "player";
			this.user_6[3].setBounds(0,0,210,56)
			this.user_6[3].alpha = 0;
			this.user_6[3].chips = [];
			this.user_6[3].payout_multiplier = 1;
			this.addChild(this.user_6[3]);

			this.user_6[4] = new createjs.Shape();
			this.user_6[4].graphics.beginFill(this.default_color)/*beginLinearGradientFill(["transparent","rgba(255,255,255,0.4)"],[0,1],0,0,40,45)*/
			.moveTo(0,0).lineTo(87,0).lineTo(75,48).lineTo(-14,48).lineTo(0,0);
			// this.user_6[4].classic = [0,0 ,87,0 ,75,48 ,-14,48 ,0,0];
			// this.user_6[4].bonus = [0,10 ,210,10, 224,54, 5.5,54, 0,10];
			this.user_6[4].setBounds(0,0,87,48);
			this.user_6[4].x = 721.5;
			this.user_6[4].y = 503;
			this.user_6[4].betarea = "playerpair";
			this.user_6[4].alpha = 0;
			this.user_6[4].chips = [];
			this.user_6[4].payout_multiplier = 11;
			this.user_6[4].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_6[4]);

			this.user_6[5] = new createjs.Shape();
			this.user_6[5].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(85,0).lineTo(108,48).lineTo(20,48).lineTo(0,0);
			this.user_6[5].setBounds(0,0,85,48);
			this.user_6[5].x = 1386.5;
			this.user_6[5].y = 503;
			this.user_6[5].betarea = "bankerpair";
			this.user_6[5].alpha = 0;
			this.user_6[5].chips = [];
			this.user_6[5].payout_multiplier = 11;
			this.user_6[5].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_6[5]);

			// ==== player 7
			this.user_7[0] = new createjs.Shape();
			this.user_7[0].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(190,0).lineTo(214,45).lineTo(15.8,45).lineTo(0,0);
			this.user_7[0].classic = [0,0 ,190,0 ,214,45 ,15.8,45, 0,0];
			this.user_7[0].bonus = [6,18, 200,18, 222,63, 22,63,6,18];
			this.user_7[0].x = 1296;
			this.user_7[0].y = 551;
			this.user_7[0].betarea = "tie";
			this.user_7[0].setBounds(0,0,190,45)
			this.user_7[0].alpha = 0;
			this.user_7[0].chips = [];
			this.user_7[0].payout_multiplier = 8;
			this.addChild(this.user_7[0]);

			this.user_7[1] = new createjs.Shape();
			this.user_7[1].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(106,0).lineTo(125,46).lineTo(20,46).lineTo(0,0);
			this.user_7[1].x = 1404.5;
			this.user_7[1].y = 596;
			this.user_7[1].betarea = "supersix";
			this.user_6[1].setBounds(0,0,106,46);
			this.user_7[1].alpha = 0;
			this.user_7[1].chips = [];
			this.user_7[1].payout_multiplier = 12;
			// this.user_7[1].visible = isSuperSix();
			this.addChild(this.user_7[1]);

			this.user_7[2] = new createjs.Shape();
			this.user_7[2].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(197,0).lineTo(219,46).lineTo(14.2,46).lineTo(0,0);
			this.user_7[2].supersix = [0,0, 93,0, 113,46, 14,46, 0,0];
			this.user_7[2].classic = [0,0, 197,0, 219,46, 14.2,46, 0,0];
			this.user_7[2].bonus = [6,18, 206,18, 222,56 ,16,56,6,18];
			this.user_7[2].x = 1311.5;
			this.user_7[2].y = 596;
			this.user_7[2].betarea = "banker";
			this.user_7[2].setBounds(0,0,197,46)
			this.user_7[2].alpha = 0;
			this.user_7[2].chips = [];
			this.user_7[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			this.addChild(this.user_7[2]);

			this.user_7[3] = new createjs.Shape();
			this.user_7[3].graphics.beginFill(this.default_color).moveTo(0,-1).lineTo(204,0).lineTo(231,54).lineTo(18,54).lineTo(0,0);
			this.user_7[3].classic = [0,-1, 204,0 ,231,54 , 18,54 , 0,0];
			this.user_7[3].bonus = [4,10, 208,10, 231,56, 18,56, 4,10]
			this.user_7[3].x = 1326;
			this.user_7[3].y = 642;
			this.user_7[3].betarea = "player";
			this.user_7[3].setBounds(0,0,204,54)
			this.user_7[3].alpha = 0;
			this.user_7[3].chips = [];
			this.user_7[3].payout_multiplier = 1;
			this.addChild(this.user_7[3]);

			this.user_7[4] = new createjs.Shape();
			this.user_7[4].graphics.beginFill(this.default_color).moveTo(-1,0).lineTo(82,0).lineTo(77,48).lineTo(-11.5,48).lineTo(-1,0);
			this.user_7[4].setBounds(0,0,82,48);
			this.user_7[4].x = 808.5;
			this.user_7[4].y = 503;
			this.user_7[4].betarea = "playerpair";
			this.user_7[4].alpha = 0;
			this.user_7[4].chips = [];
			this.user_7[4].payout_multiplier = 11;
			this.user_7[4].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_7[4]);

			this.user_7[5] = new createjs.Shape();
			this.user_7[5].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(86,0).lineTo(113,48).lineTo(22.7,48).lineTo(0,0);
			this.user_7[5].setBounds(0,0,86,48);
			this.user_7[5].x = 1471.5;
			this.user_7[5].y = 503;
			this.user_7[5].betarea = "bankerpair";
			this.user_7[5].alpha = 0;
			this.user_7[5].chips = [];
			this.user_7[5].payout_multiplier = 11;
			this.user_7[5].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_7[5]);

			// ==== player 8
			this.user_8[0] = new createjs.Shape();
			this.user_8[0].graphics.beginFill(this.default_color)/*beginLinearGradientFill(["rgba(255,255,255,0.4)","transparent"],[0,1],100,0,130,-30)*/.moveTo(0,0).lineTo(168,0).lineTo(195,45).lineTo(23,45).lineTo(0,0);
			this.user_8[0].classic = [0,0 ,168,0 ,195,45 ,23,45 ,0,0];
			this.user_8[0].bonus = [10,18,180,18,206,63,32,63,10,18];
			this.user_8[0].x = 1486;
			this.user_8[0].y = 551;
			this.user_8[0].betarea = "tie";
			this.user_8[0].setBounds(0,0,168,45)
			this.user_8[0].alpha = 0;
			this.user_8[0].chips = [];
			this.user_8[0].payout_multiplier = 8;
			this.addChild(this.user_8[0]);


			this.user_8[1] = new createjs.Shape();
			this.user_8[1].graphics.beginLinearGradientFill([this.default_color,"transparent"],[0,1],100,0,130,-30)
			.moveTo(0,0).lineTo(92,0).lineTo(120,46).lineTo(28,46).lineTo(0,0);
			this.user_8[1].x = 1590;
			this.user_8[1].y = 596;
			this.user_8[1].betarea = "supersix";
			this.user_8[1].setBounds(0,0,92,46);
			this.user_8[1].alpha = 0;
			this.user_8[1].chips = [];
			this.user_8[1].payout_multiplier = 12;
			// this.user_8[1].visible = isSuperSix();
			this.addChild(this.user_8[1]);

			this.user_8[2] = new createjs.Shape();
			this.user_8[2].graphics.beginFill(this.default_color)/*beginLinearGradientFill(["rgba(255,255,255,0.4)","transparent"],[0,1],110,0,135,-28)*/
			this.user_8[2].graphics.moveTo(0,0).lineTo(173,0).lineTo(202,46).lineTo(21,46).lineTo(0,0).command;
			this.user_8[2].supersix = [0,0, 82,0, 110,46, 22,46, 0,0];
			this.user_8[2].classic = [0,0, 173,0, 202,46, 21,46, 0,0];
			this.user_8[2].bonus = [9,18, 183,18, 208,56, 25,56, 9,18];

			this.user_8[2].x = 1508.5;
			this.user_8[2].y = 596;
			this.user_8[2].betarea = "banker";
			this.user_8[2].setBounds(0,0,179,46)
			this.user_8[2].alpha = 0;
			this.user_8[2].chips = [];
			this.user_8[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			this.addChild(this.user_8[2]);

			this.user_8[3] = new createjs.Shape();
			this.user_8[3].graphics.beginFill(this.default_color)/*beginLinearGradientFill(["rgba(255,255,255,0.4)","transparent"],[0,1],120,0,150,-34)*/.moveTo(0,0).lineTo(181,0).lineTo(215,54).lineTo(28,54).lineTo(0,-1);
			this.user_8[3].classic = [0,0 ,181,0 ,215,54 ,28,54 ,0,-1];
			this.user_8[3].bonus = [4, 10, 186, 10, 218,56 ,26,56, 4,10];
			this.user_8[3].x = 1529;
			this.user_8[3].y = 642;
			this.user_8[3].betarea = "player";
			this.user_8[3].setBounds(0,0,181,54)
			this.user_8[3].alpha = 0;
			this.user_8[3].chips = [];
			this.user_8[3].payout_multiplier = 1;
			this.addChild(this.user_8[3]);

			this.user_8[4] = new createjs.Shape();
			this.user_8[4].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(84,0).lineTo(84,48).lineTo(-5.2,48).lineTo(0,0);
			this.user_8[4].setBounds(0,0,84,48);
			this.user_8[4].x = 890.5;
			this.user_8[4].y = 503;
			this.user_8[4].betarea = "playerpair";
			this.user_8[4].alpha = 0;
			this.user_8[4].chips = [];
			this.user_8[4].payout_multiplier = 11;
			this.user_8[4].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_8[4]);

			this.user_8[5] = new createjs.Shape();
			this.user_8[5].graphics.beginLinearGradientFill([this.default_color,"rgba(255,255,255,0.01)"],[0,1],20,0,50,-25)
			.moveTo(0,0).lineTo(66,0).lineTo(97,48).lineTo(26.5,48).lineTo(0,0);
			this.user_8[5].setBounds(0,0,66,48);
			this.user_8[5].x = 1557.5;
			this.user_8[5].y = 503;
			this.user_8[5].betarea = "bankerpair";
			this.user_8[5].alpha = 0;
			this.user_8[5].chips = [];
			this.user_8[5].payout_multiplier = 11;
			this.user_8[5].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_8[5]);

			this.chips_container = new createjs.Container();
			this.chips_container.x = this.x;
			this.chips_container.y = this.y;
			this.chips_container.visible = false;

			let areaMaxBet = 0;
			let moneyCheck = 0;

			let table_chip = {};

			let users_area = ["user_1", "user_2","user_3","user_5","user_6","user_7","user_8"];

			for(var x = 0; x< users_area.length; x++) {
				for(var  i =0; i < this[users_area[x]].length; i++) {
					let user = this[users_area[x]];
					user[i].alpha = 0.05;
					user[i].alpha = 1;
					user[i].set = false;

					if(user[i].betArea == "banker" || user[i].betArea == "player" ) {
						user[i].min_betAmt = mainAreaMin;
						user[i].max_betAmt = mainAreaMax;
					}

					if(user[i].betArea =="playerpair" || user[i].betArea =="bankerpair") {
						user[i].min_betAmt = pairMin;
						user[i].max_betAmt = pairMax;
					}

					if(user[i].betArea =="tie") {
						user[i].min_betAmt = tieMin;
						user[i].max_betAmt = tieMax;
					}

					this.bonus_outline.hitArea = user[i];
					this.classic_outline.hitArea = user[i];
					this.supersix_outline.hitArea = user[i];

					user[i].addEventListener("click", (area) => {
						if(this.context.junketAgent) return;

						if(this.context.firstRound) {
              this.context.component_messages.setMessage(window.language.prompts.promptfirstround, 1);
              return;
            }
						
						if (!this.context.component_timer.betting_start) {
							return;
						} // end if

						if (!this.context.component_chips.selected_chip) return;

						if (!this.context.component_chips.selected_chip || this.context.component_chips.selected_chip === undefined ) {
							return;
						} // end if

						let dropArea = null;

						if(area.currentTarget.betarea == "player") {
							dropArea = this.context.component_betBoard.bet_areas[10];
						} else if(area.currentTarget.betarea == "banker") {
							dropArea = this.context.component_betBoard.bet_areas[11];
						} else if(area.currentTarget.betarea == "tie") {
							dropArea = this.context.component_betBoard.bet_areas[12];
						} else if(area.currentTarget.betarea == "playerpair") {
							dropArea = this.context.component_betBoard.bet_areas[13];
						} else if(area.currentTarget.betarea == "bankerpair") {
							dropArea = this.context.component_betBoard.bet_areas[14];
						} else if(area.currentTarget.betarea == "supersix") {
							dropArea = this.context.component_betBoard.bet_areas[15];
						}

						try  {
							let condition = opposite_bet(dropArea.table_name,this.context.component_betBoard.bet_areas);

							if (condition) {
								dropArea.chips = [];
            	}

							this.context.component_betBoard.checkTableHighlight();
							
							if (!this.context.component_timer.betting_start) {
								return;
							} // end if
						} // end try
						catch(e) {
						} // end catch

						if ((dropArea.total_bet_amt+this.context.component_chips.selected_chip.chip_amt) > dropArea.max_betAmt) {
							this.context.component_messages.setMessage(window.language.prompts.promptmaxbet,1);
							return;
						} // end if

						if (dropArea.total_bet_amt == dropArea.max_betAmt) {
							this.context.component_messages.setMessage(window.language.prompts.promptmaxbet,1);
							return;
						} // end if

						if (this.context.component_chips.selected_chip.chip_amt == "max") {
	          	areaMaxBet = parseInt(dropArea.max_betAmt);

	          	moneyCheck = parseInt(this.context.context.user_money) - this.context.component_chips.total_ingame_bet;
	          	this.context.component_chips.total_ingame_bet -=  parseInt(dropArea.total_bet_amt);

	          	if (areaMaxBet > moneyCheck && parseInt(this.context.context.user_money) != 0) {
	            	if (moneyCheck == 0) {
              		this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
              		return;
	            	}

	            	this.context.component_chips.total_ingame_bet +=  moneyCheck;
	          	}
	          	else {
	            	this.context.component_chips.total_ingame_bet +=  parseInt(dropArea.max_betAmt);
	          	}
		        }
		        else {
		          	this.context.component_chips.total_ingame_bet += parseInt(this.context.component_chips.selected_chip.chip_amt);
		        } // end if

				    if (parseInt(this.context.component_chips.total_ingame_bet) > parseInt(this.context.context.user_money)) {
							if (this.context.component_chips.selected_chip.chip_amt == "max") {
								this.context.component_chips.total_ingame_bet -= parseInt(dropArea.max_betAmt);
							} // end if
							else {
								this.context.component_chips.total_ingame_bet -= parseInt(this.context.component_chips.selected_chip.chip_amt);
							} // end else

							this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
							return;
						} // end

						// try  {
						// 	let condition = opposite_bet(dropArea.table_name,this.context.component_betBoard.bet_areas);

						// 	if (condition) {
						// 		console.log(this.context.component_chips.total_ingame_bet, "walalalalala");
						// 		dropArea.chips = [];
						// 		this.context.component_betBoard.checkTableHighlight();
						// 		return;
						// 	} // end if
						// } // end try
						// catch(e) {

						// } // end catch

						this.context.component_gameButtons.repeatButton.visible = false;
						this.context.component_gameButtons.undoButton.visible = true;
						this.context.component_chips.selected_chip.is_dropped = true;

						table_chip = _.clone(this.context.component_chips.selected_chip);
						table_chip.scaleX = table_chip.scaleY = dropArea.chip_drop_scale;
						table_chip.dropped_at = dropArea;
						table_chip.confirmed_bet = false;
						dropArea.chips.push(table_chip);

						if(!dropArea.is_advanced_bet) {
							this.context.component_chips.actions.push({
								chip_amount_used:table_chip.chip_amt,
								drop_area: dropArea
							}); // end of push
						}

						setTimeout(() => {
							this.context.component_gameButtons.is_confirmed_bet = false;

							if(!this.context.component_timer.betting_start) return;
							this.context.component_chips.changeCurrentChips(table_chip, dropArea, false, false, true);
						},200)


						if (this.context.component_chips.selected_chip.chip_amt != "max") {
		          dropArea.total_bet_amt += parseInt(table_chip.chip_amt);
		        } else {
	          	dropArea.total_bet_amt = dropArea.max_betAmt;

	          	if (areaMaxBet > moneyCheck) {
	            	dropArea.total_bet_amt = moneyCheck;
	          	}
		        } // end if

						// this.context.component_chips.selected_chip.alpha = 0;
						// this.context.component_chips.selectNewChip(); /** select chip new **/
						this.context.component_gameButtons.checkButtonState();
					});

				}
				
			}

   		this.context.component_toggle.toggleMultiSlave(this.context.component_toggle.classicButton);
		},
		setPlayerBets(data) {
			var loop = 0;

			let users_area = this.toSet;
			for(var x = 0; x < data.length; x++) {
      		if(!users_area[x]) continue;

      		if(!data[x].name) {
	      		data[x].name = "..."
	      	}

       		if(data[x].name.split("").length > 3) {
	       		this[`${users_area[x]}_name`].text = data[x].name.substr(0,3) + "***";
       		} else {
       			this[`${users_area[x]}_name`].text = data[x].name;
       		}
       		this[`${users_area[x]}_name`].user_id = data[x].id;
       		
       		this[`${users_area[x]}_bet`].text = 0;
       		if (!data[x].bets.length) {
        		continue;
       		}

			    for (var i = 0; i < this[`${users_area[x]}`].length; i++) {
				    data[x].bets.forEach((row) => {
		     			if (this[`${users_area[x]}`][i].betarea == row.bet) {
		      			this[`${users_area[x]}`][i].alpha = 1;
		      			this[`${users_area[x]}`][i].set = true;
		     				let calc = (parseInt(row.bet_amount) / parseInt(row.currencyMultiplier ? row.currencyMultiplier : 1 ));
		     				row.bet_amount = (calc/parseInt(row.userMultiplier ? row.userMultiplier : 1) * window.currencyMultiplier) * window.userMultiplier
	        			this.changeCurrentChips(row.bet_amount, this[`${users_area[x]}`][i]);
	        		}
						})

				  }
					let total = _.sumBy(data[x].bets, function (e) {
						return e.bet_amount
					});

					this[`${users_area[x]}_bet`].text = numberWithCommas(total);
			} // end for
		
		},

		checkUser(user) {
				let u_count = 0;
				let u_count2 = 0;

				let id = null;

				if('id' in user) {
					id = user.id
				} else {
					id = user.userId
				}

				let users_area = this.toSet;

				for(var x = 0; x < users_area.length; x++) {
					if(this[`${users_area[x]}_name`].user_id == id) {
						return users_area[x].split('_')[1];
					}
				}


				for(var x = 0; x < users_area.length; x++) {
					if(!this[`${users_area[x]}_name`].user_id || !('user_id' in this[`${users_area[x]}_name`]) ){
						this[`${users_area[x]}_name`].user_name = user.name;
						this[`${users_area[x]}_name`].user_id = id;
						return users_area[x].split('_')[1];
					}
				}
		},
		makeTableDraw () {
				if(window.slave === 'supersix') {
						return this.context.component_tableOutline.multiSuper();
				} else if(window.slave === 'bonus') {
						return this.context.component_tableOutline.multiBonus();
				}
				return this.context.component_tableOutline.multiClassic();
	 	},
		cancelBet (data) {
			if(window.junket == '' || !window.junket) {
				if(data.data[0].range != window.range) return;
			}

			let seat_num = this.checkUser(data.data[0]);

			this["user_" + seat_num+"_bet"].text = 0;
			this["user_"+seat_num+"_name"].total_bet = 0;

			this["user_"+seat_num].forEach((e) => {
				e.alpha = 0.05;
				// e.alpha = 0.01;
				e.chips.forEach((chip)=> {
					this.chips_container.removeChild(chip);
				});
				setTimeout(() => {
					e.chips = [];
				}, 500)
			})
		},
		toRemovePlayer : [],
		roomEvent (data) {
			if(data.id == window.userId) return;
			if(window.junket != 0) {
				if(data.id ==window.vendorData.bankerId ) return;
			}

			let seat_num = 0;

			if(data.type == 'join') {
				seat_num = this.checkUser(data.data);
				this["user_"+seat_num+"_name"].user_name = data.data.name;
				this["user_"+seat_num+"_name"].user_id = data.data.userId;

				this["user_"+seat_num+"_bet"].text = "0";

				if(data.data.name.split("").length > 3) {
	   			this["user_" + seat_num + "_name"].text = data.data.name.substr(0,3) + "***";
	   		} else {
	   			this["user_" + seat_num + "_name"].text = data.data.name;
	   		}

			} else if(data.type == "leave") {
				seat_num = this.checkUser(data.data);

				if(_.filter(this["user_"+seat_num], (e) =>{ return e.chips.length}).length) {
					this.toRemovePlayer.push(seat_num)
					return;
				}
				this["user_"+seat_num+"_bet"].text = "";

	       		this["user_" + seat_num + "_name"].text = "";

				this["user_"+seat_num+"_name"].user_name = "";
				this["user_"+seat_num+"_name"].user_id = null;

			}
		},
		removePlayersOnNewRound() {
			this.toRemovePlayer.forEach((seat_num) => {
	      this["user_" + seat_num + "_name"].text = "";

				this["user_"+seat_num+"_name"].user_name = "";
				this["user_"+seat_num+"_name"].user_id = null;

				// === remove money
				this["user_" + seat_num+"_bet"].text = "";
				this["user_"+seat_num+"_name"].total_bet = 0;
			});

			this.toRemovePlayer = []
		},
		setMultiplayer (data) {

			if(data.id == window.userId) return;
			let seat_num = 0;
			let bet_amt = 0;
			data = _.cloneDeep(data)

			seat_num = this.checkUser(data.data[0]);

			this["user_"+seat_num+"_name"].total_bet = 0;

			for(var i = 0; i < data.data.length; i++ ) {

				let calc = (parseInt(data.data[i].bet_amount) / parseInt(data.data[i].currencyMultiplier ? data.data[i].currencyMultiplier : 1))
				data.data[i].bet_amount = (calc/parseInt(data.data[i].userMultiplier ? data.data[i].userMultiplier : 1) * window.currencyMultiplier) * window.userMultiplier

				if(data.data[i].name.split("").length > 3) {
     			this["user_" + seat_num + "_name"].text = data.data[i].name.substr(0,3) + "***";
     		} else {
     			this["user_" + seat_num + "_name"].text = data.data[i].name;
     		}

				for(var x = 0; x < this["user_"+seat_num].length;x++) {
					if(this["user_"+seat_num][x].betarea == data.data[i].bet) {
						this["user_"+seat_num][x].alpha = 1
						this["user_"+seat_num+"_name"].total_bet += parseInt(data.data[i].bet_amount)
       			// this["user_"+seat_num+"_name"].user_id = data[x].data[i].id;

						this["user_"+seat_num][x].chips.forEach((chip) =>{
							this.chips_container.removeChild(chip);
						});
						this["user_"+seat_num][x].chips = [];

						this.changeCurrentChips(data.data[i].bet_amount, this["user_"+seat_num][x])

						this["user_"+seat_num+"_bet"].text = numberWithCommas(this["user_"+seat_num+"_name"].total_bet);
					}
				}
				bet_amt = 0;
			}
		},
		changeCurrentChips(amount,betArea) {
	    let avail_chips = [];
      let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
				if(!isSuperSix() && betArea.betarea != "supersix") {
					avail_chips.push({'chip': chipArr[i], 'value': chipVal});
				}
			}

	    //Chip container init and stacking
	    let posX = betArea.x + betArea.getBounds().x + betArea.getBounds().width/2;
			let posY = betArea.y + betArea.getBounds().y  + betArea.getBounds().height/2;

			if(window.slave === 'bonus') {
				posY = posY - 10;
			}

			let count = avail_chips.length-1;
			let chips = [];
	    let chipsfrombanker = amount;

			for (var x = avail_chips.length - 1; x > -1; x--) {
        if (chipsfrombanker == avail_chips[x].value) {
        	chips.push(avail_chips[x]);
        	break;
        } // end if
        else if (chipsfrombanker - avail_chips[x].value >= 0) {
        	chipsfrombanker -= avail_chips[x].value;
        	chips.push(avail_chips[x]);
        	x++;
        } // end elseif
    	} // end for

			let instance = [];
    	let instanceTxt = [];
    	let instanceMask = [];
    	let chipDataCon = [];
    	let chipsToAnimate = [];

	    for (var x = 0; x < chips.length; x++) {
				let chip_name = "chip_"+(chips[x].chip);

        this.context.chipsConf.forEach((c) => {
          if(chips[x].chip == c.chipval) {
            chip_name = "chip_"+c.chipName.split("_")[2]
          }
        });

        instance = createSprite(this.context.getResources(chip_name), 80, 80, instance);
        instance.regX = 40;
        instance.regY = 40;
        instance.x = 0;
        instance.y = 0;
        instance.gotoAndStop(1);

        chipDataCon = new createjs.Container();
        chipDataCon.x = posX;
        chipDataCon.y = (posY + 4) - (betArea.chips.length * 4);
        chipDataCon.scaleX = chipDataCon.scaleY = 0.7;
        chipDataCon.chip_amt = chips[x].value;

        chipDataCon.addChild(instance);

        // instanceMask = new createjs.Shape();
        // instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 23);
        // instanceMask.x = instance.x;
        // instanceMask.y = instance.y;
        // chipDataCon.addChild(instanceMask);

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

        instanceTxt = new createjs.Text(instanceAmt, 'normal 28px bebas-regular', '#000');
        instanceTxt.textBaseline = 'middle';
        instanceTxt.textAlign = 'center';
        instanceTxt.x = instance.x;
        instanceTxt.y = instance.y - 3;
        chipDataCon.addChild(instanceTxt);

        instanceTxt.scaleY = 0.6;
        // instanceMask.scaleY = 0.6;

        if(instanceTxt.text[0] == '1') {
        	instanceTxt.x -= 2
        }

				if (instanceTxt.text.toString().length > 4) {
				  instanceTxt.font = 'normal 21px bebas-regular';
				}

				if(chipDataCon.x > 900) {
					instanceTxt.skewX = -16
					instanceTxt.rotate = -4
				} else if(chipDataCon.x < 800){
					instanceTxt.skewX = 16
					// instanceTxt.rotate = 4
				}
				if(chipDataCon.x > 800 && chipDataCon.x < 1000) {
					instanceTxt.skewX = 0
					instanceTxt.rotate = 0
				}

      	betArea.chips.push(chipDataCon);
				this.chips_container.addChild(chipDataCon);
			} //end for
		},
		reset (flag) {
			this.chips_container.removeAllChildren();

			let users_area = this.toSet;

			for(var x = 0; x < users_area.length; x++) {
				for(var  i =0; i < this[`${users_area[x]}`].length; i++) {
					this[`${users_area[x]}`][i].chips = [];
					this[`${users_area[x]}`][i].alpha = 0.05;
					this[`${users_area[x]}`][i].set = false;
					// this["user_"+x][i].alpha = 0.01;
          createjs.Tween.removeTweens(this[`${users_area[x]}`][i]);
				}
				this[`${users_area[x]}_bet`].text = "";
				
				if(!this[`${users_area[x]}_name`].user_id) {
					this[`${users_area[x]}_bet`].text = "";
				} else {
					this[`${users_area[x]}_bet`].text = "0";
				}

				this[`${users_area[x]}_name`].total_bet = 0;
			}

			if(flag) {

				for(var x = 0; x < users_area.length; x++) {
					
					this[`${users_area[x]}_bet`].text = "";
					this[`${users_area[x]}_name`].user_id = 0;
					this[`${users_area[x]}_name`].text = "";
					this[`${users_area[x]}_name`].total_bet = 0;

					for(var  i =0; i < this[`${users_area[x]}`].length; i++) {
						this[`${users_area[x]}`][i].chips = [];
						this[`${users_area[x]}`][i].alpha = 0.05;
						this[`${users_area[x]}`][i].set = false;
						// this["user_"+x][i].alpha = 0.01;
	          createjs.Tween.removeTweens(this[`${users_area[x]}`][i]);
					}
				}
			}
		},
		hardReset() {
			let users = ["user_1","user_2","user_3", "user_6","user_7","user_8"];
			this.chips_container.removeAllChildren();

			for(var x = 0; x < users.length; x++) {
				for(var i = 0; i < this[users[x]].length; i++) {
					this[`${users[x]}`][i].chips = [];
					this[`${users[x]}`][i].alpha = 0.05;
          createjs.Tween.removeTweens(this[`${users[x]}`][i]);
				}
				this[`${users[x]}_bet`].text = "";
				this[`${users[x]}_name`].total_bet = 0;
				this[`${users[x]}_name`].user_id = 0;
				this[`${users[x]}_name`].text = "";
			}

		},
		tableWin (winning) {
			let loop = 0;
			let lose_chips_to_animate = [];

	      	this.isTie = winning.some((e) => {
	        	return e == 'tie';
	      	});

			let users_area = this.toSet;

			for (var x = 0; x < users_area.length; x++) {
			  for (var i = 0; i < this[users_area[x]].length; i++) {
			    let betArea = [];
					betArea = this[users_area[x]][i];
			    for (var j = 0; j < winning.length; j++) {
          	if (betArea.betarea == winning[j]) {
            	createjs.Tween.get(betArea, {loop: true})
                .to({
                  alpha: 1
                }, 500)
                .to({
                  alpha: 0.4
                }, 500)

              	betArea.chips.forEach((e) => {
                	e.is_win = true;
              	});
          	} //end of checking if table win
			    } //end of  bet area loop

      		if (betArea.chips.length) {
			    	betArea.chips.forEach((e) => {
        			if (!e.is_win) {
              	if (this.isTie) {
                	if (betArea.betarea == 'player' || betArea.betarea == 'banker' || betArea.betarea == 'tie') {
                  		return;
                	}
              	}
	            	lose_chips_to_animate.push(e);
				      }
		        });
      		} // end if
			  }
			}

			setTimeout(() => {
    		this.loseTableChipsAnimation(lose_chips_to_animate);
  		}, 1500);

	    setTimeout(() => {
	      this.setWinChips(winning);
	    }, 3700);
		},
		setWinChips(winning) {
			let loop = 0;

			let users_area = this.toSet;

			for (var x = 0; x < users_area.length; x++) {
				// loop++;
		    for (var i = 0; i < this[users_area[x]].length; i++) {
					let betArea = [];
					let totalBet = 0;
					let userName = null;

					betArea = this[users_area[x]][i];
					userName = this[users_area[x]+"_name"];

			    for (var j = 0; j < winning.length; j++) {
		        if (betArea.betarea == winning[j]) {
			    		if (betArea.chips.length) {
				        betArea.chips.forEach((e) => {
		            	totalBet += e.chip_amt;
							  });
				        this.createWinningChips(totalBet, betArea, userName);
				      }
		      	} //end of checking bet area win
		      } //end of  bet area loop
		    }
			}
		},
		loseTableChipsAnimation(chips) {
	    let posX = (this.context.stage.baseWidth / 2) + 70;
	    let posY = (this.context.stage.baseHeight / 2) - 100;

	    for (var x = 0; x < chips.length; x++) {
        createjs.Tween.get(chips[x], {override: true})
        	.wait(1500)
        	.to({
            alpha: 0,
            x: posX,
            y: posY
        	}, 1200, createjs.Ease.quadOut)
	    }
    }, // end of loseTableChipsAnimation
	  createWinningChips(amount, betArea, userName) {
	    if (this.isTie) {
        if (betArea.betarea == 'player' || betArea.betarea == 'banker') {
          return;
        }
	    }

	    let avail_chips = [];
      let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
			}

    	let chips = [];
    	let winnings = amount * betArea.payout_multiplier;
    	let chipsfrombanker = winnings;

    	//Chip container init and stacking
    	let posX = betArea.x + 40;
    	let posY = betArea.y + 16;

    	if (betArea.betarea == 'bankerpair' || betArea.betarea == 'playerpair') {
      	posX = betArea.x - 10;
       	posY = betArea.y;
    	}

    	for (var x = avail_chips.length - 1; x > -1; x--) {
        if (chipsfrombanker == avail_chips[x].value) {
        	chips.push(avail_chips[x]);
        	break;
        } // end if
        else if (chipsfrombanker - avail_chips[x].value >= 0) {
        	chipsfrombanker -= avail_chips[x].value;
        	chips.push(avail_chips[x]);
        	x++;
        } // end elseif
    	} // end for

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

        instance = createSprite(this.context.getResources(chip_name), 80, 80, instance);
        instance.regX = instance.getBounds().width / 2;
        instance.regY = instance.getBounds().height / 2;
        instance.x = 0;
        instance.y = 0;
        instance.gotoAndStop(1);

        chipDataCon = new createjs.Container();
        chipDataCon.x = posX;
        chipDataCon.y = posY - 120;
        chipDataCon.alpha = 0;
        chipDataCon.scaleX = chipDataCon.scaleY = 0.7;
        chipDataCon.chip_amt = chips[x].value;
        chipDataCon.addChild(instance);

        //Bet amount text
        // let totalBet = winnings;
        // let instanceAmt = totalBet;

        //Bet amount text
        let totalBet = window.casino == 'SS' ? parseFloat(winnings).toFixed(2) : parseInt(winnings);
        let instanceAmt = window.casino == 'SS' ? parseFloat(totalBet).toFixed(2) : parseInt(totalBet);

        if (window.casino == 'SS') {
          totalBet = parseFloat(totalBet);
          instanceAmt = parseFloat(instanceAmt);
        }

        if (parseInt(totalBet) > 999) {
        	totalBet = winnings / 1000;
        	instanceAmt = totalBet+"K";
        }

        if (parseInt(totalBet) > 999) {
          instanceAmt = totalBet/1000+'M';
        }

        instanceTxt = new createjs.Text(instanceAmt, 'normal 25px bebas-regular', '#000');
        instanceTxt.textBaseline = 'middle';
        instanceTxt.textAlign = 'center';
        instanceTxt.x = instance.x;
        instanceTxt.y = instance.y- 3;;
        chipDataCon.addChild(instanceTxt);

        instanceTxt.scaleY = 0.6;

        if (instanceTxt.text.toString().length > 4) {
          instanceTxt.font = 'normal 21px bebas-regular';
        }

        instanceTxt.scaleY = 0.7;

				if(chipDataCon.x > 900) {
					instanceTxt.skewX = -16
					instanceTxt.rotate = -4
				} else if(chipDataCon.x < 780){
					instanceTxt.skewX = 16
					instanceTxt.rotate = 4
				}

				if(chipDataCon.x > 780 && chipDataCon.x < 1000) {
					instanceTxt.skewX = 0
					instanceTxt.rotate = 0
				}

        createjs.Tween.get(chipDataCon)
          	.wait(x*200)
          	.to({
            	alpha: 1,
            	y: (posY + 4) - (betArea.chips.length * 4)
          	}, 120, createjs.Ease.quadOut)

		    betArea.chips.push(chipDataCon);
				this.chips_container.addChild(chipDataCon);
		  } //end for

		  setTimeout(() => {
				for (var x = 0; x < betArea.chips.length; x++) {
					betArea.chips[x].alpha = 1;
					createjs.Tween.get(betArea.chips[x])
						.wait(1500)
						.to({
						alpha: 0,
						x: userName.x + 60,
						y: userName.y
						}, 1200, createjs.Ease.quadOut)
				}//end for
		  }, x*200);
	  }
	});

  let isSuperSix = () =>{
		return getSlaveParam('supersix');
  }

  let isDragonBonus = () =>{
		return getSlaveParam('bonus');
  }

	return instance;
}
