import {
  createSprite,
  randomNum,
  createCardSprite,
  numberCounter,
  playSound,
  numberWithCommas,
  createSpriteRoadMap
}  from '../../../factories/factories';

let instance = null;

export default (opposite_bet) => {
	instance = instance || new blu.Component({
		bet_areas: [],
		opposites: null,
		user_1 : [],
		user_2 : [],
		user_3 : [],
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

			let default_color = "rgba(0,0,0,0.01)";
			let adjustX = 0;
			let adjustY = 0;

			this.visible = false;
			let table_img = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "multiplayer_table_flat_chinese" : "multiplayer_table_flat"));

			table_img.scaleX = table_img.scaleY = 0.47;
			table_img.regX = table_img.getBounds().width/2;
			table_img.regY = table_img.getBounds().height/2;
			table_img.x = (this.context.context.width/2 - 70) - adjustX;
			table_img.y = (this.context.context.height/2 - 100) + adjustY;
			table_img.multiplayer = true;

			this.context.component_betBoard.bet_areas[20] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[20].graphics.beginFill(default_color).drawRect(0, 0, 160, 95);
			this.context.component_betBoard.bet_areas[20].setBounds(0,0,160,95);
			this.context.component_betBoard.bet_areas[20].x = 490;
			this.context.component_betBoard.bet_areas[20].y = 379;
			this.context.component_betBoard.bet_areas[20].table_name = "tiger";
			this.context.component_betBoard.bet_areas[20].min_bet = mainAreaMin;
			this.context.component_betBoard.bet_areas[20].max_bet = mainAreaMax;
			this.context.component_betBoard.bet_areas[20].payout_multiplier = 1;

			this.context.component_betBoard.bet_areas[20].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0, 0, 160, 95);
			}

			this.context.component_betBoard.bet_areas[20].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[20].normal_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[21] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[21].graphics.beginFill(default_color).drawRect(0, 0, 160, 95);
			this.context.component_betBoard.bet_areas[21].setBounds(0,0,160,95);
			this.context.component_betBoard.bet_areas[21].x = 490;
			this.context.component_betBoard.bet_areas[21].y = 94;
			this.context.component_betBoard.bet_areas[21].table_name = "tie";
			this.context.component_betBoard.bet_areas[21].min_bet = tieMin;
			this.context.component_betBoard.bet_areas[21].max_bet = tieMax;
			this.context.component_betBoard.bet_areas[21].payout_multiplier = 10;

			this.context.component_betBoard.bet_areas[21].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0, 0, 160, 95);
			}

			this.context.component_betBoard.bet_areas[21].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[21].normal_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[22] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[22].graphics.beginFill(default_color).drawRect(0, 0, 160, 95);
			this.context.component_betBoard.bet_areas[22].setBounds(0,0,160,95);
			this.context.component_betBoard.bet_areas[22].x = 490;
			this.context.component_betBoard.bet_areas[22].y = 189;
			this.context.component_betBoard.bet_areas[22].table_name = "suited_tie";
			this.context.component_betBoard.bet_areas[22].min_bet = suitedTieMin;
			this.context.component_betBoard.bet_areas[22].max_bet = suitedTieMax;
			this.context.component_betBoard.bet_areas[22].payout_multiplier = 50;

			this.context.component_betBoard.bet_areas[22].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0, 0, 160, 95);
			}

			this.context.component_betBoard.bet_areas[22].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[22].normal_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[23] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[23].graphics.beginFill(default_color).drawRect(0, 0, 160, 95);
			this.context.component_betBoard.bet_areas[23].setBounds(0,0,160,95);
			this.context.component_betBoard.bet_areas[23].x = 490;
			this.context.component_betBoard.bet_areas[23].y = 284;
			this.context.component_betBoard.bet_areas[23].table_name = "dragon";
			this.context.component_betBoard.bet_areas[23].min_bet = mainAreaMin;
			this.context.component_betBoard.bet_areas[23].max_bet = mainAreaMax;
			this.context.component_betBoard.bet_areas[23].payout_multiplier = 1

			this.context.component_betBoard.bet_areas[23].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0, 0, 160, 95);
			}

			this.context.component_betBoard.bet_areas[23].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[23].normal_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[24] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[24].graphics.beginFill(default_color).drawRect(0, 0, 110, 85);
			this.context.component_betBoard.bet_areas[24].setBounds(0,0,110,85);
			this.context.component_betBoard.bet_areas[24].x = 25;
			this.context.component_betBoard.bet_areas[24].y = -3;
			this.context.component_betBoard.bet_areas[24].table_name = "dragon_even";
			this.context.component_betBoard.bet_areas[24].min_bet = oddEvenMin;
			this.context.component_betBoard.bet_areas[24].max_bet = oddEvenMax;
			this.context.component_betBoard.bet_areas[24].payout_multiplier = 1

			this.context.component_betBoard.bet_areas[24].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0, 0, 110, 85);
			}

			this.context.component_betBoard.bet_areas[24].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[24].normal_state =  function (e) {
				e.dropped_state(e);
			}


			this.context.component_betBoard.bet_areas[25] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[25].graphics.beginFill(default_color).drawRect(0, 0, 120, 85);
			this.context.component_betBoard.bet_areas[25].setBounds(0,0,120,85);
			this.context.component_betBoard.bet_areas[25].x = 135;
			this.context.component_betBoard.bet_areas[25].y = -3;
			this.context.component_betBoard.bet_areas[25].table_name = "dragon_odd";
			this.context.component_betBoard.bet_areas[25].min_bet = oddEvenMin;
			this.context.component_betBoard.bet_areas[25].max_bet = oddEvenMax;
			this.context.component_betBoard.bet_areas[25].payout_multiplier = 1

			this.context.component_betBoard.bet_areas[25].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0, 0, 120, 85);
			}

			this.context.component_betBoard.bet_areas[25].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[25].normal_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[26] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[26].graphics.beginFill(default_color).drawRect(0, 0, 117, 85);
			this.context.component_betBoard.bet_areas[26].setBounds(0,0,117,85);
			this.context.component_betBoard.bet_areas[26].x = 255;
			this.context.component_betBoard.bet_areas[26].y = -3;
			this.context.component_betBoard.bet_areas[26].table_name = "dragon_big";
			this.context.component_betBoard.bet_areas[26].min_bet = bigSmallMin;
			this.context.component_betBoard.bet_areas[26].max_bet = bigSmallMax;
			this.context.component_betBoard.bet_areas[26].payout_multiplier = 1

			this.context.component_betBoard.bet_areas[26].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0, 0, 117, 85);
			}

			this.context.component_betBoard.bet_areas[26].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[26].normal_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[27] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[27].graphics.beginFill(default_color).drawRect(0, 0, 117, 85);
			this.context.component_betBoard.bet_areas[27].setBounds(0,0,117,85);
			this.context.component_betBoard.bet_areas[27].x = 370;
			this.context.component_betBoard.bet_areas[27].y = -3;
			this.context.component_betBoard.bet_areas[27].table_name = "dragon_small";
			this.context.component_betBoard.bet_areas[27].min_bet = bigSmallMin;
			this.context.component_betBoard.bet_areas[27].max_bet = bigSmallMax;
			this.context.component_betBoard.bet_areas[27].payout_multiplier = 1

			this.context.component_betBoard.bet_areas[27].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0, 0, 117, 85);
			}

			this.context.component_betBoard.bet_areas[27].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[27].normal_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[28] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[28].graphics.beginFill(default_color).drawRect(0, 0, 113, 85);
			this.context.component_betBoard.bet_areas[28].setBounds(0,0,113,85);
			this.context.component_betBoard.bet_areas[28].x = 655;
			this.context.component_betBoard.bet_areas[28].y = -3;
			this.context.component_betBoard.bet_areas[28].table_name = "tiger_small";
			this.context.component_betBoard.bet_areas[28].min_bet = bigSmallMin;
			this.context.component_betBoard.bet_areas[28].max_bet = bigSmallMax;
			this.context.component_betBoard.bet_areas[28].payout_multiplier = 1

			this.context.component_betBoard.bet_areas[28].dropped_state = function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0, 0, 113, 85);
			}

			this.context.component_betBoard.bet_areas[28].win_state = function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[28].normal_state = function (e) {
				e.dropped_state(e);
			}


			this.context.component_betBoard.bet_areas[29] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[29].graphics.beginFill(default_color).drawRect(0, 0, 118, 85);
			this.context.component_betBoard.bet_areas[29].setBounds(0,0,118,85);
			this.context.component_betBoard.bet_areas[29].x = 768;
			this.context.component_betBoard.bet_areas[29].y = -3;
			this.context.component_betBoard.bet_areas[29].table_name = "tiger_big";
			this.context.component_betBoard.bet_areas[29].min_bet = bigSmallMin;
			this.context.component_betBoard.bet_areas[29].max_bet = bigSmallMax;
			this.context.component_betBoard.bet_areas[29].payout_multiplier = 1

			this.context.component_betBoard.bet_areas[29].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0, 0, 118, 85);
			}

			this.context.component_betBoard.bet_areas[29].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[29].normal_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[30] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[30].graphics.beginFill(default_color).drawRect(0, 0, 120, 85);
			this.context.component_betBoard.bet_areas[30].setBounds(0,0,118,85);
			this.context.component_betBoard.bet_areas[30].x = 885;
			this.context.component_betBoard.bet_areas[30].y = -3;
			this.context.component_betBoard.bet_areas[30].table_name = "tiger_odd";
			this.context.component_betBoard.bet_areas[30].min_bet = oddEvenMin;
			this.context.component_betBoard.bet_areas[30].max_bet = oddEvenMax;
			this.context.component_betBoard.bet_areas[30].payout_multiplier = 1

			this.context.component_betBoard.bet_areas[30].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0, 0, 120, 85);
			}

			this.context.component_betBoard.bet_areas[30].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[30].normal_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[31] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[31].graphics.beginFill(default_color).drawRect(0, 0, 110, 85);
			this.context.component_betBoard.bet_areas[31].setBounds(0,0,110,85);
			this.context.component_betBoard.bet_areas[31].x = 1005;
			this.context.component_betBoard.bet_areas[31].y = -3;
			this.context.component_betBoard.bet_areas[31].table_name = "tiger_even";
			this.context.component_betBoard.bet_areas[31].min_bet = oddEvenMin;
			this.context.component_betBoard.bet_areas[31].max_bet = oddEvenMax;
			this.context.component_betBoard.bet_areas[31].payout_multiplier = 1

			this.context.component_betBoard.bet_areas[31].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0, 0, 110, 85);
			}

			this.context.component_betBoard.bet_areas[31].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[31].normal_state =  function (e) {
				e.dropped_state(e);
			}


			for(var x = 20; x < this.context.component_betBoard.bet_areas.length; x++ ) {
				this.context.component_betBoard.bet_areas[x].multiplayer = true;
				this.context.component_betBoard.bet_areas[x].visible = false;


				// if (window.casino == 'SS') {
				// 	this.context.component_betBoard.bet_areas[x].min_betAmt = parseInt(this.context.component_betBoard.bet_areas[x].min_bet) / 1000;
		  //   		this.context.component_betBoard.bet_areas[x].max_betAmt = parseInt(this.context.component_betBoard.bet_areas[x].max_bet) / 1000;
				// }
				// else {
				// }
				this.context.component_betBoard.bet_areas[x].min_betAmt = parseInt(this.context.component_betBoard.bet_areas[x].min_bet);
				this.context.component_betBoard.bet_areas[x].max_betAmt = parseInt(this.context.component_betBoard.bet_areas[x].max_bet);
				
				this.context.component_betBoard.bet_areas[x].chip_anim_toPlay = 0;
				this.context.component_betBoard.bet_areas[x].chip_drop_scale = 1;
				this.context.component_betBoard.bet_areas[x].chips = []
				this.context.component_betBoard.bet_areas[x].x -= adjustX;
				this.context.component_betBoard.bet_areas[x].y += 25 + adjustY;

				table_img.hitArea = this.context.component_betBoard.bet_areas[x];

				this.context.component_betBoard.addChild(this.context.component_betBoard.bet_areas[x]);
				this.context.component_betBoard.addChild(table_img);
			}

			let user_1_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_1_icon.x = 35;
			user_1_icon.y = 510;
			user_1_icon.scaleX = user_1_icon.scaleY = 0.5;
			this.addChild(user_1_icon);

			let user_2_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_2_icon.x = 185;
			user_2_icon.y = 510;
			user_2_icon.scaleX = user_2_icon.scaleY = 0.5;
			this.addChild(user_2_icon);

			let user_3_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_3_icon.x = 345;
			user_3_icon.y = 510;
			user_3_icon.scaleX = user_3_icon.scaleY = 0.5;
			this.addChild(user_3_icon);

			let user_6_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_6_icon.x = 665;
			user_6_icon.y = 510;
			user_6_icon.scaleX = user_6_icon.scaleY = 0.5;
			this.addChild(user_6_icon);

			let user_7_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_7_icon.x = 820;
			user_7_icon.y = 510;
			user_7_icon.scaleX = user_7_icon.scaleY = 0.5;
			this.addChild(user_7_icon);

			let user_8_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_8_icon.x = 980;
			user_8_icon.y = 510;
			user_8_icon.scaleX = user_8_icon.scaleY = 0.5;
			this.addChild(user_8_icon);

			this.user_1_name = new createjs.Text("","18px lato-regular","#fff");
			this.user_1_name.x = user_1_icon.x + 20;
			this.user_1_name.y = user_1_icon.y;
			this.addChild(this.user_1_name);

			this.user_2_name = new createjs.Text("","18px lato-regular","#fff");
			this.user_2_name.x = user_2_icon.x + 20;
			this.user_2_name.y = user_2_icon.y;
			this.addChild(this.user_2_name);

			this.user_3_name = new createjs.Text("","18px lato-regular","#fff");
			this.user_3_name.x = user_3_icon.x + 20;
			this.user_3_name.y = user_3_icon.y;
			this.addChild(this.user_3_name);

			this.user_6_name = new createjs.Text("","18px lato-regular","#fff");
			this.user_6_name.x = user_6_icon.x + 20;
			this.user_6_name.y = user_6_icon.y;
			this.addChild(this.user_6_name);

			this.user_7_name = new createjs.Text("","18px lato-regular","#fff");
			this.user_7_name.x = user_7_icon.x + 20;
			this.user_7_name.y = user_7_icon.y;
			this.addChild(this.user_7_name);

			this.user_8_name = new createjs.Text("","18px lato-regular","#fff");
			this.user_8_name.x = user_8_icon.x + 20;
			this.user_8_name.y = user_8_icon.y;
			this.addChild(this.user_8_name);

			this.user_1_bet = new createjs.Text("","18px bebas-regular","#d8bd69");
			this.user_1_bet.x = this.user_1_name.x;
			this.user_1_bet.y = this.user_1_name.y + 20;
			this.addChild(this.user_1_bet);

			this.user_2_bet = new createjs.Text("","18px bebas-regular","#d8bd69");
			this.user_2_bet.x = this.user_2_name.x;
			this.user_2_bet.y = this.user_2_name.y + 20;
			this.addChild(this.user_2_bet);

			this.user_3_bet = new createjs.Text("","18px bebas-regular","#d8bd69");
			this.user_3_bet.x = this.user_3_name.x;
			this.user_3_bet.y = this.user_3_name.y + 20;
			this.addChild(this.user_3_bet);

			this.user_6_bet = new createjs.Text("","18px bebas-regular","#d8bd69");
			this.user_6_bet.x = this.user_6_name.x;
			this.user_6_bet.y = this.user_6_name.y + 20;
			this.addChild(this.user_6_bet);

			this.user_7_bet = new createjs.Text("","18px bebas-regular","#d8bd69");
			this.user_7_bet.x = this.user_7_name.x ;
			this.user_7_bet.y = this.user_7_name.y + 20;
			this.addChild(this.user_7_bet);

			this.user_8_bet = new createjs.Text("","18px bebas-regular","#d8bd69");
			this.user_8_bet.x = this.user_8_name.x ;
			this.user_8_bet.y = this.user_8_name.y + 20;
			this.addChild(this.user_8_bet);

			// === user bets
			// let color_def2 = "rgba(255,255,255,0.1)";
			let color_def2 = "rgba(0,0,0,0.01)";

			// ==== player 1
			this.user_1[0] = new createjs.Shape();
			this.user_1[0].graphics.beginFill(color_def2).drawRect(0, 0, 148, 94);
			this.user_1[0].x = 25;
			this.user_1[0].y = 118;
			this.user_1[0].betarea = "tie";
			this.user_1[0].chips = []
			this.addChild(this.user_1[0]);

			this.user_1[1] = new createjs.Shape();
			this.user_1[1].graphics.beginFill(color_def2).drawRect(0, 0, 148, 94);
			this.user_1[1].x = 25;
			this.user_1[1].y = 214;
			this.user_1[1].betarea = "suited_tie";
			this.user_1[1].chips = []
			this.addChild(this.user_1[1]);

			this.user_1[2] = new createjs.Shape();
			this.user_1[2].graphics.beginFill(color_def2).drawRect(0, 0, 148, 94);
			this.user_1[2].x = 25;
			this.user_1[2].y = 309;
			this.user_1[2].betarea = "dragon";
			this.user_1[2].chips = []
			this.addChild(this.user_1[2]);

			this.user_1[3] = new createjs.Shape();
			this.user_1[3].graphics.beginFill(color_def2).drawRect(0, 0, 148, 94);
			this.user_1[3].x = 25;
			this.user_1[3].y = 404;
			this.user_1[3].betarea = "tiger";
			this.user_1[3].chips = []
			this.addChild(this.user_1[3]);

			// ==== player 2
			this.user_2[0] = new createjs.Shape();
			this.user_2[0].graphics.beginFill(color_def2).drawRect(0, 0, 155, 94);
			this.user_2[0].x = 176;
			this.user_2[0].y = 118;
			this.user_2[0].betarea = "tie";
			this.user_2[0].chips = []
			this.addChild(this.user_2[0]);

			this.user_2[1] = new createjs.Shape();
			this.user_2[1].graphics.beginFill(color_def2).drawRect(0, 0, 155, 94);
			this.user_2[1].x = 176;
			this.user_2[1].y = 214;
			this.user_2[1].betarea = "suited_tie";
			this.user_2[1].chips = []
			this.addChild(this.user_2[1]);

			this.user_2[2] = new createjs.Shape();
			this.user_2[2].graphics.beginFill(color_def2).drawRect(0, 0, 155, 94);
			this.user_2[2].x = 176;
			this.user_2[2].y = 309;
			this.user_2[2].betarea = "dragon";
			this.user_2[2].chips = []
			this.addChild(this.user_2[2]);

			this.user_2[3] = new createjs.Shape();
			this.user_2[3].graphics.beginFill(color_def2).drawRect(0, 0, 155, 94);
			this.user_2[3].x = 176;
			this.user_2[3].y = 404;
			this.user_2[3].betarea = "tiger";
			this.user_2[3].chips = []
			this.addChild(this.user_2[3]);

			// ==== player 3
			this.user_3[0] = new createjs.Shape();
			this.user_3[0].graphics.beginFill(color_def2).drawRect(0, 0, 155, 94);
			this.user_3[0].x = 334;
			this.user_3[0].y = 118;
			this.user_3[0].betarea = "tie";
			this.user_3[0].chips = []
			this.addChild(this.user_3[0]);

			this.user_3[1] = new createjs.Shape();
			this.user_3[1].graphics.beginFill(color_def2).drawRect(0, 0, 155, 94);
			this.user_3[1].x = 334;
			this.user_3[1].y = 214;
			this.user_3[1].betarea = "suited_tie";
			this.user_3[1].chips = []
			this.addChild(this.user_3[1]);

			this.user_3[2] = new createjs.Shape();
			this.user_3[2].graphics.beginFill(color_def2).drawRect(0, 0, 155, 94);
			this.user_3[2].x = 334;
			this.user_3[2].y = 309;
			this.user_3[2].betarea = "dragon";
			this.user_3[2].chips = []
			this.addChild(this.user_3[2]);

			this.user_3[3] = new createjs.Shape();
			this.user_3[3].graphics.beginFill(color_def2).drawRect(0, 0, 155, 94);
			this.user_3[3].x = 334;
			this.user_3[3].y = 404;
			this.user_3[3].betarea = "tiger";
			this.user_3[3].chips = []
			this.addChild(this.user_3[3]);

			// ==== player 6
			this.user_6[0] = new createjs.Shape();
			this.user_6[0].graphics.beginFill(color_def2).drawRect(0, 0, 156, 94);
			this.user_6[0].x = 650;
			this.user_6[0].y = 118;
			this.user_6[0].betarea = "tie";
			this.user_6[0].chips = []
			this.addChild(this.user_6[0]);

			this.user_6[1] = new createjs.Shape();
			this.user_6[1].graphics.beginFill(color_def2).drawRect(0, 0, 156, 94);
			this.user_6[1].x = 650;
			this.user_6[1].y = 214;
			this.user_6[1].betarea = "suited_tie";
			this.user_6[1].chips = []
			this.addChild(this.user_6[1]);

			this.user_6[2] = new createjs.Shape();
			this.user_6[2].graphics.beginFill(color_def2).drawRect(0, 0, 156, 94);
			this.user_6[2].x = 650;
			this.user_6[2].y = 309;
			this.user_6[2].betarea = "dragon";
			this.user_6[2].chips = []
			this.addChild(this.user_6[2]);

			this.user_6[3] = new createjs.Shape();
			this.user_6[3].graphics.beginFill(color_def2).drawRect(0, 0, 156, 94);
			this.user_6[3].x = 650;
			this.user_6[3].y = 404;
			this.user_6[3].betarea = "tiger";
			this.user_6[3].chips = []
			this.addChild(this.user_6[3]);

			// ==== player 7
			this.user_7[0] = new createjs.Shape();
			this.user_7[0].graphics.beginFill(color_def2).drawRect(0, 0, 156, 94);
			this.user_7[0].x = 809;
			this.user_7[0].y = 118;
			this.user_7[0].betarea = "tie";
			this.user_7[0].chips = []
			this.addChild(this.user_7[0]);

			this.user_7[1] = new createjs.Shape();
			this.user_7[1].graphics.beginFill(color_def2).drawRect(0, 0, 156, 94);
			this.user_7[1].x = 809;
			this.user_7[1].y = 214;
			this.user_7[1].betarea = "suited_tie";
			this.user_7[1].chips = []
			this.addChild(this.user_7[1]);

			this.user_7[2] = new createjs.Shape();
			this.user_7[2].graphics.beginFill(color_def2).drawRect(0, 0, 156, 94);
			this.user_7[2].x = 809;
			this.user_7[2].y = 309;
			this.user_7[2].betarea = "dragon";
			this.user_7[2].chips = []
			this.addChild(this.user_7[2]);

			this.user_7[3] = new createjs.Shape();
			this.user_7[3].graphics.beginFill(color_def2).drawRect(0, 0, 156, 94);
			this.user_7[3].x = 809;
			this.user_7[3].y = 404;
			this.user_7[3].betarea = "tiger";
			this.user_7[3].chips = []
			this.addChild(this.user_7[3]);

			// ==== player 8
			this.user_8[0] = new createjs.Shape();
			this.user_8[0].graphics.beginFill(color_def2).drawRect(0, 0, 156, 94);
			this.user_8[0].x = 967;
			this.user_8[0].y = 118;
			this.user_8[0].betarea = "tie";
			this.user_8[0].chips = []
			this.addChild(this.user_8[0]);

			this.user_8[1] = new createjs.Shape();
			this.user_8[1].graphics.beginFill(color_def2).drawRect(0, 0, 156, 94);
			this.user_8[1].x = 967;
			this.user_8[1].y = 214;
			this.user_8[1].betarea = "suited_tie";
			this.user_8[1].chips = []
			this.addChild(this.user_8[1]);

			this.user_8[2] = new createjs.Shape();
			this.user_8[2].graphics.beginFill(color_def2).drawRect(0, 0, 156, 94);
			this.user_8[2].x = 967;
			this.user_8[2].y = 309;
			this.user_8[2].betarea = "dragon";
			this.user_8[2].chips = []
			this.addChild(this.user_8[2]);

			this.user_8[3] = new createjs.Shape();
			this.user_8[3].graphics.beginFill(color_def2).drawRect(0, 0, 156, 94);
			this.user_8[3].x = 967;
			this.user_8[3].y = 404;
			this.user_8[3].betarea = "tiger";
			this.user_8[3].chips = []
			this.addChild(this.user_8[3]);

			this.user_8.forEach((e,x) => {
			})

			this.chips_container = new createjs.Container();
			this.addChild(this.chips_container);

			let areaMaxBet = 0;
			let moneyCheck = 0;
			let table_chip = {};

			for(var x = 1; x <=8; x++) {
				if(x!=4 && x!=5) {
					for(var  i =0; i < this["user_"+x].length; i++) {
						// this["user_"+x][i].alpha = 0.1;
						this["user_"+x][i].x -= adjustX;
						this["user_"+x][i].y += adjustY;

						this["user_"+x][i].y = this["user_"+1][i].y;

						if(this["user_"+x][i].betarea == "dragon" || this["user_"+x][i].betarea == "tiger" ) {
							this["user_"+x][i].min_betAmt = mainAreaMin;
							this["user_"+x][i].max_betAmt = mainAreaMax;
			                this["user_"+x][i].payout_multiplier = 1;
						}

						if(this["user_"+x][i].betarea =="tie") {
							this["user_"+x][i].min_betAmt = tieMin;
							this["user_"+x][i].max_betAmt = tieMax;
			                this["user_"+x][i].payout_multiplier = 10;
						}

						if(this["user_"+x][i].betarea == "suited_tie") {
							this["user_"+x][i].min_betAmt = suitedTieMin;
							this["user_"+x][i].max_betAmt = suitedTieMax;
			                this["user_"+x][i].payout_multiplier = 50;
						}

						table_img.hitArea = this["user_"+x][i]

						this["user_"+x][i].addEventListener("click", (area) => {
							if(!this.context.component_chips.selected_chip) return;

							if (!this.context.component_chips.selected_chip || this.context.component_chips.selected_chip === undefined ) {
								return;
							} // end if

							if (!this.context.component_timer.betting_start) {
					          return;
					        } // end if

							let dropArea = null;

							if(area.currentTarget.betarea == "tiger") {
								dropArea = this.context.component_betBoard.bet_areas[20];
							} else if(area.currentTarget.betarea == "tie") {
								dropArea = this.context.component_betBoard.bet_areas[21];
							} else if(area.currentTarget.betarea == "suited_tie") {
								dropArea = this.context.component_betBoard.bet_areas[22];
							} else if(area.currentTarget.betarea == "dragon") {
								dropArea = this.context.component_betBoard.bet_areas[23];
							}

							try  {
								let condition = opposite_bet(dropArea.table_name,this.context.component_betBoard.bet_areas);

								if (condition) {
									dropArea.chips = [];
									this.context.component_betBoard.checkTableHighlight();
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

							this.context.component_gameButtons.repeatButton.visible = false;
							this.context.component_gameButtons.undoButton.visible = true;

							this.context.component_chips.selected_chip.is_dropped = true;

							table_chip =_.clone(this.context.component_chips.selected_chip);
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
								this.context.component_chips.changeCurrentChips(table_chip,dropArea);
							},200)


							if (this.context.component_chips.selected_chip.chip_amt != "max") {
					          	dropArea.total_bet_amt += parseInt(table_chip.chip_amt);
					        }
					        else {
					          	dropArea.total_bet_amt = dropArea.max_betAmt;

					          	if (areaMaxBet > moneyCheck) {
					            	dropArea.total_bet_amt = moneyCheck;
					          	}
					        } // end if

							this.context.component_chips.selected_chip.alpha = 0;
							this.context.component_chips.selectNewChip(); /** select chip new **/

							this.context.component_gameButtons.checkButtonState();
						});
					}
				}
			}
		},
		setPlayerBets(data) {
			var loop = 0;

			for(var x = 1; x < data.length + 1; x++) {
			    if (window.userId != data[x - 1].id && data[x - 1].id != undefined) {
			     loop++;

			     for (var i = 0; i < this["user_" + (loop > 3 ? (loop + 2) : loop)].length; i++) {
			      	if (loop > 3) {
			      		if(!data[x - 1].name) {
				      		data[x - 1].name = "..."
				      	}

			       		if(data[x - 1].name.split("").length > 3) {
				       		this["user_" + (loop + 2) + "_name"].text = data[x - 1].name.substr(0,3) + "***";
			       		} else {
			       			this["user_" + (loop + 2) + "_name"].text = data[x - 1].name;
			       		}

			       		this["user_" + (loop + 2) + "_name"].user_name = data[x - 1].name;
			       		this["user_" + (loop + 2) + "_name"].user_id = data[x - 1].id;

			       		this["user_" + (loop + 2)+"_bet"].text  = "0"

			       		if (!data[x - 1].bets.length) {
			        		continue;
			       		}


			       		data[x - 1].bets.forEach((row) => {
			        		if (this["user_" + (loop + 2)][i].betarea == row.bet) {
			        			this["user_" + (loop + 2)][i].alpha = 1;
			        			this["user_" + (loop + 2)][i].set = true;

								let calc = (parseInt(row.bet_amount) / parseInt(row.currencyMultiplier ? row.currencyMultiplier : 1))
								row.bet_amount = (calc/parseInt(row.userMultiplier ? row.userMultiplier : 1) * window.currencyMultiplier) * window.userMultiplier
								
			         			this["user_" + (loop + 2)+"_bet"].text = numberWithCommas(row.bet_amount);
			        			this.changeCurrentChips(row.bet_amount, this["user_" + (loop + 2)][i]);
			        		}
			       		});
			      }
			      else {
			      		if(!data[x - 1].name) {
				      		data[x - 1].name = "..."
				      	}

				       		if(data[x - 1].name.split("").length > 3) {
				       			this["user_" + loop + "_name"].text = data[x - 1].name.substr(0,3) + "***";
				       		} else {
				       			this["user_" + loop + "_name"].text = data[x - 1].name;
				       		}

				       		this["user_" + loop + "_name"].user_name = data[x - 1].name;
				       		this["user_" + loop + "_name"].user_id = data[x - 1].id;

			       			this["user_" + loop+"_bet"].text  = "0"

			       			if (!data[x - 1].bets.length) {
			        			continue;
			       			}

			       			data[x - 1].bets.forEach((row) => {
			        			if (this["user_" + loop][i].betarea == row.bet) {
			         				this["user_" + loop][i].alpha = 1;
			         				this["user_" + loop][i].set = true;
									let calc = (parseInt(row.bet_amount) / parseInt(row.currencyMultiplier ? row.currencyMultiplier : 1))
									row.bet_amount = (calc/parseInt(row.userMultiplier ? row.userMultiplier : 1) * window.currencyMultiplier) * window.userMultiplier
			         				this["user_" + loop+"_bet"].text = numberWithCommas(row.bet_amount);
			        				this.changeCurrentChips(row.bet_amount, this["user_" + loop][i]);
			    				}
			    			});
			    		}
			    	}
			    }
			} // end for
		},
		changeCurrentChips(amount,betArea) {
	      	let avail_chips = [];
			let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
			}

	      	//Chip container init and stacking
	      	let posX = betArea.x + 80;
	      	let posY = betArea.y + 40;

			let count = avail_chips.length-1;
			let chips = [];
	      	let chipsfrombanker = amount;

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

		        instance = createSprite(this.context.getResources(chip_name), 72, 72, instance);
		        instance.regX = instance.getBounds().width / 2;
		        instance.regY = instance.getBounds().height / 2;
		        instance.x = 0;
		        instance.y = 0;
		        instance.gotoAndStop(0);

		        chipDataCon = new createjs.Container();
		        chipDataCon.x = posX;
		        chipDataCon.y = (posY + 4) - (betArea.chips.length * 4);
		        chipDataCon.chip_amt = chips[x].value;

		        chipDataCon.addChild(instance);

		        instanceMask = new createjs.Shape();
		        instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 25);
		        instanceMask.x = instance.x;
		        instanceMask.y = instance.y;
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

		        instanceTxt = new createjs.Text(instanceAmt, 'normal 25px bebas-regular', '#000');
		        instanceTxt.textBaseline = 'middle';
		        instanceTxt.textAlign = 'center';
		        instanceTxt.x = instance.x;
		        instanceTxt.y = instance.y;
		        chipDataCon.addChild(instanceTxt);

		        // Chip adjustment
		      	let table = betArea.table_name;
		     		if (table == 'tiger') {
		          	instanceTxt.skewX = -10;
		        }
		        else if (table == 'dragon') {
		          instanceTxt.skewX = 10;
		        }

		        betArea.chips.push(chipDataCon);
				this.chips_container.addChild(chipDataCon);
			} //end for
		},
		cancelBet (data) {
			if(data.data[0].range != window.range) return;
			let seat_num = this.checkUser(data.data[0]);

			this["user_" + seat_num+"_bet"].text = 0;

			this["user_"+seat_num+"_name"].total_bet = 0;

			this["user_"+seat_num].forEach((e) => {
				e.alpha = 0.1;
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

			let seat_num = 0;

			if(data.type == 'join') {
				seat_num = this.checkUser(data.data);
				this["user_"+seat_num+"_name"].user_name = data.data.name;
				this["user_"+seat_num+"_name"].user_id = data.data.userId;
				// this["user_"+seat_num+"_name"].user_id = data.data.id;

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
		checkUser(user,param) {
			let u_count = 0;
			let u_count2 = 0;

			let id = null;

			if('id' in user) {
				id = user.id
			} else {
				id = user.userId
			}

			for(var e = 0; e < 8; e++) {
				u_count ++;

				if(u_count!=4 && u_count!=5) {

					if(this["user_"+u_count+"_name"].user_id == id) {
						return u_count;
					}
				}
			}

			for(var e = 0; e < 8; e++) {
				u_count2 ++;

				if(u_count2!=4 && u_count2!=5) {

					if(!this["user_"+u_count2+"_name"].user_id || !('user_id' in this["user_"+u_count2+"_name"]) ){
						this["user_"+u_count2+"_name"].user_name = user.name;
						this["user_"+u_count2+"_name"].user_id = id;
						return u_count2;
					}
				}
			}
		},
		setMultiplayer (data) {
			let u_count = 0;

			if(data.id == window.userId) return;
			let seat_num = data.seat+1;
			let bet_amt = 0;

			if(seat_num == 4) {
				seat_num += 2;
			}
			if(seat_num == 5) {
				seat_num += 2;
			}

			seat_num = this.checkUser(data.data[0]);

			this["user_"+seat_num+"_name"].total_bet = 0;

			for(var i = 0; i < data.data.length; i++ ) {

				// if(data.data[i].currency == "N" && window.casino == "SS") {
				// 	data.data[i].bet_amount = parseInt(data.data[i].bet_amount)/1000

				// } else if(data.data[i].currency == "SS" && window.casino == "N") {
				// 	data.data[i].bet_amount = parseInt(data.data[i].bet_amount)*1000
				// }
				
				let calc = (parseInt(data.data[i].bet_amount) / parseInt(data.data[i].currencyMultiplier ? data.data[i].currencyMultiplier : 1))
				data.data[i].bet_amount = (calc/parseInt(data.data[i].userMultiplier ? data.data[i].userMultiplier : 1) * window.currencyMultiplier) * window.userMultiplier

				for(var x = 0; x < this["user_"+seat_num].length;x++) {
					if(this["user_"+seat_num][x].betarea == data.data[i].bet) {
						this["user_"+seat_num][x].alpha = 1
						this["user_"+seat_num+"_name"].total_bet += parseInt(data.data[i].bet_amount)

						this["user_"+seat_num][x].chips.forEach((chip) =>{
							this.chips_container.removeChild(chip)
						});

						this["user_"+seat_num][x].chips = [];
						
						this.changeCurrentChips(data.data[i].bet_amount, this["user_"+seat_num][x])

						if(data.data[i].name.split("").length > 3) {
			       			this["user_" + seat_num + "_name"].text = data.data[i].name.substr(0,3) + "***";
			       		} else {
			       			this["user_" + seat_num + "_name"].text = data.data[i].name;
			       		}

						this["user_"+seat_num+"_bet"].text = numberWithCommas(this["user_"+seat_num+"_name"].total_bet);
					}
				}
				bet_amt = 0;
			}
		},
		reset () {
			this.chips_container.removeAllChildren();
			for(var x = 1; x <=8; x++) {
				if(x!=4 && x!=5) {
					for(var  i =0; i < this["user_"+x].length; i++) {
						this["user_"+x][i].chips = [];

           		 		createjs.Tween.removeTweens(this["user_"+x][i]);

						if(!this["user_" +x+ "_name"].user_id) {
							this["user_"+x+"_bet"].text = "";
						} else {
							this["user_"+x+"_bet"].text = "0";
						}
						this["user_"+x+"_name"].total_bet = 0;
					}
				}
			}
		},
		tableWin (winning) {
			let loop = 0;
			let lose_chips_to_animate = [];

		    this.isTie = winning.some((e) => {
		        return e == 'tie';
		    });

			for (var x = 0; x < 6; x++) {
				loop++;

			    for (var i = 0; i < this["user_" + (loop > 3 ? (loop + 2) : loop)].length; i++) {
			    	let betArea = [];

			    	if (loop > 3) {
			    		betArea = this["user_" + (loop + 2)][i];
				    }
				    else {
			    		betArea = this["user_" + (loop)][i];
				    }

				    for (var j = 0; j < winning.length; j++) {
			          	if (betArea.betarea == winning[j]) {
			            	createjs.Tween.get(betArea, {loop: true})
			              	.to({
			                	alpha: 1
			              	}, 500)
			              	.to({
			                	alpha: .4
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
					      			if (betArea.betarea == 'tie' || betArea.betarea == 'dragon' || betArea.betarea == 'tiger') {
					      				return;
					      			}
					      		}

				          		lose_chips_to_animate.push(e);
				          	}
			          	});
		      		} // end if

				    if (this.isTie) {
			            if (betArea.betarea == 'dragon' || betArea.betarea == 'tiger') {
			              	this.createTieChip(betArea, 'win');
			              	this.createTieChip(betArea, 'lose');

			              	betArea.chips.forEach((e) => {
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
			            }
		          	} //end of tie condition
				}
			}

			setTimeout(() => {
	        	this.loseTableChipsAnimation(lose_chips_to_animate);
	      	}, 2000);

	     	setTimeout(() => {
	        	this.setWinChips(winning);
	      	}, 4000);
		},
		createTieChip(betArea, type) {
	      	let chips = [];
	      	let totalBet = 0;

	     	betArea.chips.forEach((e) => {
	      		if (!e.tiePayout) totalBet += e.chip_amt;
	      	});

	      	let winnings = totalBet / 2;
	      	let chipsfrombanker = winnings;

	      	//Chip container init and stacking
	      	let posX = betArea.x + 90;
	      	let posY = betArea.y + 16;

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
		        chipDataCon.y = (posY + 4) - (betArea.chips.length * 4);
		        chipDataCon.animate = type;
		        chipDataCon.tiePayout = true;
		        chipDataCon.chip_amt = chips[x].value;

		        chipDataCon.addChild(instance);

		        instanceMask = new createjs.Shape();
		        instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 25);
		        instanceMask.x = instance.x;
		        instanceMask.y = instance.y;
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
		        chipDataCon.addChild(instanceTxt);

		        // Chip adjustment
		       	let table = betArea.table_name;
		     		if (table == 'tiger') {
		          instanceTxt.skewX = -10;

		        }
		        else if (table == 'dragon') {
		          instanceTxt.skewX = 10;

		        }

		        betArea.tiePayout = true;
		        betArea.animate = type;
		        betArea.chips.push(chipDataCon);
				this.chips_container.addChild(chipDataCon);
	      } //end for
	    },
		setWinChips(winning) {
			let loop = 0;

			for (var x = 0; x < 6; x++) {
				loop++;

			    for (var i = 0; i < this["user_" + (loop > 3 ? (loop + 2) : loop)].length; i++) {
			    	let betArea = [];
					let totalBet = 0;

			    	if (loop > 3) {
			    		betArea = this["user_" + (loop + 2)][i];
				    }
				    else {
			    		betArea = this["user_" + (loop)][i];
				    }

				    for (var j = 0; j < winning.length; j++) {
			          	if (betArea.betarea == winning[j]) {

				    		if (betArea.chips.length) {
						        betArea.chips.forEach((e) => {
				            		totalBet += e.chip_amt;
						        });

						        this.createWinningChips(totalBet, betArea);
						    }
			          	} //end of checking bet area win
			      	} //end of  bet area loop
			    }
		  	}
		},
		loseTableChipsAnimation(chips) {
	      	let posX = (this.context.stage.baseWidth / 2);
	      	let posY = (this.context.stage.baseHeight / 2) - 500;

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
	    createWinningChips(winAmount, betArea) {
	      	if (this.isTie) {
		        if (betArea.betarea == 'dragon' || betArea.betarea == 'tiger') {
		          	return;
		        }
	      	}

	      	let chips = [];
	      	let chipsfrombanker = winAmount;

	      	//Chip container init and stacking
	      	let posX = betArea.x + 40;
	      	let posY = betArea.y + 10;

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
		        chipDataCon.y = posY - 120;
		        chipDataCon.alpha = 0;
		        chipDataCon.chip_amt = chips[x].value;

		        chipDataCon.addChild(instance);

		        instanceMask = new createjs.Shape();
		        instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 25);
		        instanceMask.x = instance.x;
		        instanceMask.y = instance.y;
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
		        chipDataCon.addChild(instanceTxt);

		        // Chip adjustment
			    let table = betArea.table_name;
		     		if (table == 'tiger') {
		          	instanceTxt.skewX = -10;
		        }
		        else if (table == 'dragon') {
		          	instanceTxt.skewX = 10;
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
	    }				
	}); 
	return instance;
}
