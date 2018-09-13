import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		bet_areas: [],
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
		currentBet : [],
		main () {
			this.visible = false;

			let default_color = "rgba(0,0,0,0.01)";
			let adjustX = 0;
			let adjustY = 0;

			if(window.tableNum == 2) {
				adjustX = 12;
			}
			else if(window.tableNum == 1) {
				adjustX = 10;
			}

			let table_img = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "multiplayer_table_chinese" : "multiplayer_table"));

			table_img.scaleX = table_img.scaleY = 0.39;
			table_img.regX = table_img.getBounds().width/2;
			table_img.regY = table_img.getBounds().height/2;
			table_img.x = 640 - adjustX;
			table_img.y = 455 + adjustY; //475


			this.bet_areas[0] =  new createjs.Shape();
			this.bet_areas[0].graphics.beginFill(default_color).moveTo(0,0).lineTo(158,0).lineTo(164,32).lineTo(-5,32).lineTo(0,0);
			this.bet_areas[0].setBounds(0,0,160,25);
			this.bet_areas[0].x = 564 - 1; // 562
			this.bet_areas[0].y = 492; //506
			this.bet_areas[0].table_name = "tiger";
			this.bet_areas[0].payout_multiplier = 1;

			this.bet_areas[0].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill('#d12f2f').moveTo(0,0).lineTo(158,0).lineTo(164,32).lineTo(-5,32).lineTo(0,0);
			}

			this.bet_areas[0].win_state =  function (e) {
				e.dropped_state(e);
				e.alpha = 1
			}

			this.bet_areas[0].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(158,0).lineTo(164,32).lineTo(-5,32).lineTo(0,0);
			}

			this.bet_areas[1] =  new createjs.Shape();
			this.bet_areas[1].graphics.beginFill(default_color).moveTo(0,0).lineTo(132,0).lineTo(135,22).lineTo(-4,22).lineTo(0,0);
			this.bet_areas[1].setBounds(0,0,140,20);
			this.bet_areas[1].x = 577; //573
			this.bet_areas[1].y = 414; // 442
			this.bet_areas[1].table_name = "tie";
			this.bet_areas[1].payout_multiplier = 10;

			this.bet_areas[1].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill('#6a8d3a').moveTo(0,0).lineTo(132,0).lineTo(135,22).lineTo(-4,22).lineTo(0,0);
			}

			this.bet_areas[1].win_state =  function (e) {
				e.dropped_state(e);
				e.alpha = 1
			}

			this.bet_areas[1].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(132,0).lineTo(135,22).lineTo(-4,22).lineTo(0,0);
			}

			this.bet_areas[2] =  new createjs.Shape();
			this.bet_areas[2].graphics.beginFill(default_color).moveTo(0,0).lineTo(140,0).lineTo(144,24.5).lineTo(-4,24.5).lineTo(0,0);
			this.bet_areas[2].setBounds(0,0,145,20);
			this.bet_areas[2].x = 572; //570
			this.bet_areas[2].y = 437; // 462
			this.bet_areas[2].table_name = "suited_tie";
			this.bet_areas[2].payout_multiplier = 50;

			this.bet_areas[2].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill('#996515').moveTo(0,0).lineTo(140,0).lineTo(144,24.5).lineTo(-4,24.5).lineTo(0,0);
			}

			this.bet_areas[2].win_state =  function (e) {
				e.dropped_state(e);
				e.alpha = 1
			}

			this.bet_areas[2].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(140,0).lineTo(144,24.5).lineTo(-4,24.5).lineTo(0,0);
			}

			this.bet_areas[3] =  new createjs.Shape();
			this.bet_areas[3].graphics.beginFill(default_color).moveTo(0,0).lineTo(149,0).lineTo(154,28).lineTo(-4,28).lineTo(0,0);
			this.bet_areas[3].setBounds(0,0,150,28);
			this.bet_areas[3].x = 568;
			this.bet_areas[3].y = 463;
			this.bet_areas[3].table_name = "dragon";
			this.bet_areas[3].payout_multiplier = 1

			this.bet_areas[3].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill('#1565c0').moveTo(0,0).lineTo(149,0).lineTo(154,28).lineTo(-4,28).lineTo(0,0);
			}

			this.bet_areas[3].win_state =  function (e) {
				e.dropped_state(e);
				e.alpha = 1
			}

			this.bet_areas[3].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(149,0).lineTo(154,28).lineTo(-4,28).lineTo(0,0);
			}

			this.bet_areas[4] =  new createjs.Shape();
			this.bet_areas[4].graphics.beginFill(default_color).moveTo(0,0).lineTo(69,0).lineTo(49,21).lineTo(-18,21).lineTo(6,0);
			this.bet_areas[4].setBounds(0,0,76,20);
			this.bet_areas[4].x = 214; //181
			this.bet_areas[4].y = 386; //417
			this.bet_areas[4].table_name = "dragon_even";
			this.bet_areas[4].payout_multiplier = 1

			this.bet_areas[4].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill('#1565c0').moveTo(0,0).lineTo(69,0).lineTo(49,21).lineTo(-18,21).lineTo(6,0);
			}

			this.bet_areas[4].win_state =  function (e) {
				e.dropped_state(e);
				e.alpha = 1
			}

			this.bet_areas[4].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(69,0).lineTo(49,21).lineTo(-18,21).lineTo(6,0);
			}

			this.bet_areas[5] =  new createjs.Shape();
			this.bet_areas[5].graphics.beginFill(default_color).moveTo(0,0).lineTo(70,0).lineTo(54,21).lineTo(-21,21).lineTo(0,0);
			this.bet_areas[5].setBounds(0,0,76,20);
			this.bet_areas[5].x = 284; //261
			this.bet_areas[5].y = 386; //417
			this.bet_areas[5].table_name = "dragon_odd";
			this.bet_areas[5].payout_multiplier = 1

			this.bet_areas[5].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill('#1565c0').moveTo(0,0).lineTo(70,0).lineTo(54,21).lineTo(-21,21).lineTo(0,0);
			}

			this.bet_areas[5].win_state =  function (e) {
				e.dropped_state(e);
				e.alpha = 1
			}

			this.bet_areas[5].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(70,0).lineTo(54,21).lineTo(-21,21).lineTo(0,0);
			}

			this.bet_areas[6] =  new createjs.Shape();
			this.bet_areas[6].graphics.beginFill(default_color).moveTo(0,0).lineTo(70,0).lineTo(60,21).lineTo(-16,21).lineTo(0,0);
			this.bet_areas[6].setBounds(0,0,76,20);
			this.bet_areas[6].x = 355; //336
			this.bet_areas[6].y = 386; //417
			this.bet_areas[6].table_name = "dragon_big";
			this.bet_areas[6].payout_multiplier = 1

			this.bet_areas[6].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill('#1565c0').moveTo(0,0).lineTo(70,0).lineTo(60,21).lineTo(-16,21).lineTo(0,0);
			}

			this.bet_areas[6].win_state =  function (e) {
				e.dropped_state(e);
				e.alpha = 1
			}

			this.bet_areas[6].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(70,0).lineTo(65,21).lineTo(-16,21).lineTo(0,0);
			}

			this.bet_areas[7] =  new createjs.Shape();
			this.bet_areas[7].graphics.beginFill(default_color).moveTo(0,0).lineTo(73,0).lineTo(65,21).lineTo(-11,21).lineTo(0,0);
			this.bet_areas[7].setBounds(0,0,76,20);
			this.bet_areas[7].x = 425; //411
			this.bet_areas[7].y = 386; //417
			this.bet_areas[7].table_name = "dragon_small";
			this.bet_areas[7].payout_multiplier = 1

			this.bet_areas[7].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill('#1565c0').moveTo(0,0).lineTo(73,0).lineTo(65,21).lineTo(-11,21).lineTo(0,0);
			}

			this.bet_areas[7].win_state =  function (e) {
				e.dropped_state(e);
				e.alpha = 1
			}

			this.bet_areas[7].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(73,0).lineTo(65,21).lineTo(-11,21).lineTo(0,0);
			}

			this.bet_areas[8] =  new createjs.Shape();
			this.bet_areas[8].graphics.beginFill(default_color).moveTo(0,0).lineTo(72,0).lineTo(84,21).lineTo(9,21).lineTo(0,0);
			this.bet_areas[8].setBounds(0,0,76,20);
			this.bet_areas[8].x = 785; //795
			this.bet_areas[8].y = 386; //417
			this.bet_areas[8].table_name = "tiger_small";
			this.bet_areas[8].payout_multiplier = 1

			this.bet_areas[8].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill('#d12f2f').moveTo(0,0).lineTo(72,0).lineTo(84,21).lineTo(9,21).lineTo(0,0);
			}

			this.bet_areas[8].win_state =  function (e) {
				e.dropped_state(e);
				e.alpha = 1
			}

			this.bet_areas[8].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(72,0).lineTo(84,21).lineTo(9,21).lineTo(0,0);
			}

			this.bet_areas[9] =  new createjs.Shape();
			this.bet_areas[9].graphics.beginFill(default_color).moveTo(0,0).lineTo(71,0).lineTo(88,21).lineTo(12,21).lineTo(0,0);
			this.bet_areas[9].setBounds(0,0,76,20);
			this.bet_areas[9].x = 857; //870
			this.bet_areas[9].y = 386; //417
			this.bet_areas[9].table_name = "tiger_big";
			this.bet_areas[9].payout_multiplier = 1

			this.bet_areas[9].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill('#d12f2f').moveTo(0,0).lineTo(71,0).lineTo(88,21).lineTo(12,21).lineTo(0,0);
			}

			this.bet_areas[9].win_state =  function (e) {
				e.dropped_state(e);
				e.alpha = 1
			}

			this.bet_areas[9].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(71,0).lineTo(88,21).lineTo(12,21).lineTo(0,0);
			}

			this.bet_areas[10] =  new createjs.Shape();
			this.bet_areas[10].graphics.beginFill(default_color).moveTo(0,0).lineTo(71,0).lineTo(91,21).lineTo(16,21).lineTo(0,0);
			this.bet_areas[10].setBounds(0,0,76,20);
			this.bet_areas[10].x = 929; //947
			this.bet_areas[10].y = 386; //417
			this.bet_areas[10].table_name = "tiger_odd";
			this.bet_areas[10].payout_multiplier = 1

			this.bet_areas[10].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill('#d12f2f').moveTo(0,0).lineTo(71,0).lineTo(91,21).lineTo(16,21).lineTo(0,0);
			}

			this.bet_areas[10].win_state =  function (e) {
				e.dropped_state(e);
				e.alpha = 1
			}

			this.bet_areas[10].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(71,0).lineTo(91,21).lineTo(16,21).lineTo(0,0);
			}


			this.bet_areas[11] =  new createjs.Shape();
			this.bet_areas[11].graphics.beginFill(default_color).moveTo(0,0).lineTo(68,0).lineTo(91,21).lineTo(20,21).lineTo(0,0);
			this.bet_areas[11].setBounds(0,0,76,20);
			this.bet_areas[11].x = 1000; //1020
			this.bet_areas[11].y = 386; //417
			this.bet_areas[11].table_name = "tiger_even";
			this.bet_areas[11].payout_multiplier = 1

			this.bet_areas[11].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill('#d12f2f').moveTo(0,0).lineTo(68,0).lineTo(91,21).lineTo(20,21).lineTo(0,0);
			}

			this.bet_areas[11].win_state =  function (e) {
				e.dropped_state(e);
				e.alpha = 1
			}

			this.bet_areas[11].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(68,0).lineTo(91,21).lineTo(20,21).lineTo(0,0);
			}

			for(var x = 0; x < this.bet_areas.length; x++) {
				this.addChild(this.bet_areas[x]);
				this.addChild(table_img);
				// this.setChildIndex(table_img, x+1);

				this.bet_areas[x].chip_anim_toPlay = 0;
				this.bet_areas[x].chip_drop_scale = 1;
				this.bet_areas[x].chips = []
				this.bet_areas[x].x -= adjustX;
				this.bet_areas[x].y += adjustY;

				table_img.hitArea = this.bet_areas[x];
			}

			this.chips_container = new createjs.Container();
			this.addChild(this.chips_container);
			// this.cache(248, 434, 1530, 280);

			this.chips_container_main = new createjs.Container();
			this.addChild(this.chips_container_main);

			// === User data
			let user_1_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_1_icon.x = 60 - adjustX;
			user_1_icon.y = 530;
			user_1_icon.scaleX = user_1_icon.scaleY = 0.5;
			this.addChild(user_1_icon);

			let user_2_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_2_icon.x = 230 - adjustX;
			user_2_icon.y = 530;
			user_2_icon.scaleX = user_2_icon.scaleY = 0.5;
			this.addChild(user_2_icon);

			let user_3_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_3_icon.x = 400 - adjustX;
			user_3_icon.y = 530;
			user_3_icon.scaleX = user_3_icon.scaleY = 0.5;
			this.addChild(user_3_icon);

			let user_6_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_6_icon.x = 740 - adjustX;
			user_6_icon.y = 530;
			user_6_icon.scaleX = user_6_icon.scaleY = 0.5;
			this.addChild(user_6_icon);

			let user_7_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_7_icon.x = 910 - adjustX;
			user_7_icon.y = 530;
			user_7_icon.scaleX = user_7_icon.scaleY = 0.5;
			this.addChild(user_7_icon);

			let user_8_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_8_icon.x = 1080 - adjustX;
			user_8_icon.y = 530;
			user_8_icon.scaleX = user_8_icon.scaleY = 0.5;
			this.addChild(user_8_icon);

			this.user_1_name = new createjs.Text('',"18px lato-regular","#fff");
			this.user_1_name.x = user_1_icon.x + 20;
			this.user_1_name.y = user_1_icon.y;
			this.addChild(this.user_1_name);

			this.user_2_name = new createjs.Text('',"18px lato-regular","#fff");
			this.user_2_name.x = user_2_icon.x + 20;
			this.user_2_name.y = user_2_icon.y;
			this.addChild(this.user_2_name);

			this.user_3_name = new createjs.Text('',"18px lato-regular","#fff");
			this.user_3_name.x = user_3_icon.x + 20;
			this.user_3_name.y = user_3_icon.y;
			this.addChild(this.user_3_name);

			this.user_6_name = new createjs.Text('',"18px lato-regular","#fff");
			this.user_6_name.x = user_6_icon.x + 20;
			this.user_6_name.y = user_6_icon.y;
			this.addChild(this.user_6_name);

			this.user_7_name = new createjs.Text('',"18px lato-regular","#fff");
			this.user_7_name.x = user_7_icon.x + 20;
			this.user_7_name.y = user_7_icon.y;
			this.addChild(this.user_7_name);

			this.user_8_name = new createjs.Text('',"18px lato-regular","#fff");
			this.user_8_name.x = user_8_icon.x + 20;
			this.user_8_name.y = user_8_icon.y;
			this.addChild(this.user_8_name);

			this.user_1_bet = new createjs.Text('',"18px bebas-regular","#d8bd69");
			this.user_1_bet.x = this.user_1_name.x;
			this.user_1_bet.y = this.user_1_name.y + 20;
			this.addChild(this.user_1_bet);

			this.user_2_bet = new createjs.Text('',"18px bebas-regular","#d8bd69");
			this.user_2_bet.x = this.user_2_name.x;
			this.user_2_bet.y = this.user_2_name.y + 20;
			this.addChild(this.user_2_bet);

			this.user_3_bet = new createjs.Text('',"18px bebas-regular","#d8bd69");
			this.user_3_bet.x = this.user_3_name.x;
			this.user_3_bet.y = this.user_3_name.y + 20;
			this.addChild(this.user_3_bet);

			this.user_6_bet = new createjs.Text('',"18px bebas-regular","#d8bd69");
			this.user_6_bet.x = this.user_6_name.x;
			this.user_6_bet.y = this.user_6_name.y + 20;
			this.addChild(this.user_6_bet);

			this.user_7_bet = new createjs.Text('',"18px bebas-regular","#d8bd69");
			this.user_7_bet.x = this.user_7_name.x;
			this.user_7_bet.y = this.user_7_name.y + 20;
			this.addChild(this.user_7_bet);

			this.user_8_bet = new createjs.Text('',"18px bebas-regular","#d8bd69");
			this.user_8_bet.x = this.user_8_name.x;
			this.user_8_bet.y = this.user_8_name.y + 20;
			this.addChild(this.user_8_bet);
			// === User data

			// === Other user bets
			let color_def2 = "rgba(255,255,255,0.1)";

			// ==== player 1
			this.user_1[0] = new createjs.Shape();
			this.user_1[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(129,0).lineTo(110,22).lineTo(-27,22).lineTo(0,0);
			this.user_1[0].setBounds(0,0,135,20);
			this.user_1[0].x = 186 - 4; //160
			this.user_1[0].y = 414;
			this.user_1[0].betarea = "tie";
			this.user_1[0].chips = []
			this.addChild(this.user_1[0]);

			this.user_1[1] = new createjs.Shape();
			this.user_1[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(138,0).lineTo(116,25).lineTo(-28,25).lineTo(0,0);
			this.user_1[1].setBounds(0,0,145,20);
			this.user_1[1].x = 158 - 4; //133
			this.user_1[1].y = 437;
			this.user_1[1].betarea = "suited_tie";
			this.user_1[1].chips = []
			this.addChild(this.user_1[1]);

			this.user_1[2] = new createjs.Shape();
			this.user_1[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(145,0).lineTo(121,28).lineTo(-34,28).lineTo(0,0);
			this.user_1[2].setBounds(0,0,155,20);
			this.user_1[2].x = 128 - 4;
			this.user_1[2].y = 463;
			this.user_1[2].betarea = "dragon";
			this.user_1[2].chips = []
			this.addChild(this.user_1[2]);

			this.user_1[3] = new createjs.Shape();
			this.user_1[3].graphics.beginFill(color_def2).moveTo(0,0).lineTo(155,0).lineTo(128,32).lineTo(-38,32).lineTo(0,0);
			this.user_1[3].setBounds(0,0,167,26);
			this.user_1[3].x = 94 - 4;
			this.user_1[3].y = 492;
			this.user_1[3].betarea = "tiger";
			this.user_1[3].chips = []
			this.addChild(this.user_1[3]);

			// ==== player 2
			this.user_2[0] = new createjs.Shape();
			this.user_2[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(131,0).lineTo(120,22).lineTo(-19,22).lineTo(0,0);
			this.user_2[0].setBounds(0,0,140,20);
			this.user_2[0].x = 316 - 4; //294
			this.user_2[0].y = 414; //442
			this.user_2[0].betarea = "tie";
			this.user_2[0].chips = []
			this.addChild(this.user_2[0]);

			this.user_2[1] = new createjs.Shape();
			this.user_2[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(139,0).lineTo(126,25).lineTo(-22,25).lineTo(0,0);
			this.user_2[1].setBounds(0,0,140,20);
			this.user_2[1].x = 297 - 4; //278
			this.user_2[1].y = 437; //461
			this.user_2[1].betarea = "suited_tie";
			this.user_2[1].chips = []
			this.addChild(this.user_2[1]);

			this.user_2[2] = new createjs.Shape();
			this.user_2[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(148,0).lineTo(134,28).lineTo(-24,28).lineTo(0,0);
			this.user_2[2].setBounds(0,0,154,20);
			this.user_2[2].x = 274 - 4; //259
			this.user_2[2].y = 463; //483
			this.user_2[2].betarea = "dragon";
			this.user_2[2].chips = []
			this.addChild(this.user_2[2]);

			this.user_2[3] = new createjs.Shape();
			this.user_2[3].graphics.beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(141,32).lineTo(-27,32).lineTo(0,0);
			this.user_2[3].setBounds(0,0,161,25);
			this.user_2[3].x = 250 - 4;
			this.user_2[3].y = 492; //506
			this.user_2[3].betarea = "tiger";
			this.user_2[3].chips = []
			this.addChild(this.user_2[3]);

			// ==== player 3
			this.user_3[0] = new createjs.Shape();
			this.user_3[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(132,0).lineTo(128,22).lineTo(-11,22).lineTo(0,0);
			this.user_3[0].setBounds(0,0,139,20);
			this.user_3[0].x = 447 - 3; //434
			this.user_3[0].y = 414; //442
			this.user_3[0].betarea = "tie";
			this.user_3[0].chips = []
			this.addChild(this.user_3[0]);

			this.user_3[1] = new createjs.Shape();
			this.user_3[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(139,0).lineTo(134,25).lineTo(-13,25).lineTo(0,0);
			this.user_3[1].setBounds(0,0,145,20);
			this.user_3[1].x = 436 - 3; //424
			this.user_3[1].y = 437; //461
			this.user_3[1].betarea = "suited_tie";
			this.user_3[1].chips = []
			this.addChild(this.user_3[1]);

			this.user_3[2] = new createjs.Shape();
			this.user_3[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(149,0).lineTo(144,28).lineTo(-14,28).lineTo(0,0);
			this.user_3[2].setBounds(0,0,153,25);
			this.user_3[2].x = 422 - 3;
			this.user_3[2].y = 463; //483
			this.user_3[2].betarea = "dragon";
			this.user_3[2].chips = []
			this.addChild(this.user_3[2]);

			this.user_3[3] = new createjs.Shape();
			this.user_3[3].graphics.beginFill(color_def2).moveTo(0,-1).lineTo(157,0).lineTo(152,32).lineTo(-17,32).lineTo(0,0);
			this.user_3[3].setBounds(0,0,163,25);
			this.user_3[3].x = 408 - 3; //400
			this.user_3[3].y = 492; //507
			this.user_3[3].betarea = "tiger";
			this.user_3[3].chips = []
			this.addChild(this.user_3[3]);

			// ==== player 6
			this.user_6[0] = new createjs.Shape();
			this.user_6[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(131,0).lineTo(142,22).lineTo(3,22).lineTo(0,0);
			this.user_6[0].setBounds(0,0,140,20);
			this.user_6[0].x = 710;
			this.user_6[0].y = 414; //441
			this.user_6[0].betarea = "tie";
			this.user_6[0].chips = []
			this.addChild(this.user_6[0]);

			this.user_6[1] = new createjs.Shape();
			this.user_6[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(140,0).lineTo(152,25).lineTo(5,25).lineTo(0,0);
			this.user_6[1].setBounds(0,0,146,22);
			this.user_6[1].x = 713;
			this.user_6[1].y = 437;//461
			this.user_6[1].betarea = "suited_tie";
			this.user_6[1].chips = []
			this.addChild(this.user_6[1]);

			this.user_6[2] = new createjs.Shape();
			this.user_6[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(148,0).lineTo(162,28).lineTo(4,28).lineTo(0,0);
			this.user_6[2].setBounds(0,0,153,25);
			this.user_6[2].x = 718;
			this.user_6[2].y = 463; //483
			this.user_6[2].betarea = "dragon";
			this.user_6[2].chips = []
			this.addChild(this.user_6[2]);

			this.user_6[3] = new createjs.Shape();
			this.user_6[3].graphics.beginFill(color_def2).moveTo(0,0).lineTo(157,0).lineTo(174,32).lineTo(5,32).lineTo(0,0);
			this.user_6[3].setBounds(0,0,162,25);
			this.user_6[3].x = 723;
			this.user_6[3].y = 492;//506
			this.user_6[3].betarea = "tiger";
			this.user_6[3].chips = []
			this.addChild(this.user_6[3]);

			// ==== player 7
			this.user_7[0] = new createjs.Shape();
			this.user_7[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(131,0).lineTo(150,22).lineTo(11,22).lineTo(0,0);
			this.user_7[0].setBounds(0,0,140,20);
			this.user_7[0].x = 842;//851
			this.user_7[0].y = 414;
			this.user_7[0].betarea = "tie";
			this.user_7[0].chips = []
			this.addChild(this.user_7[0]);

			this.user_7[1] = new createjs.Shape();
			this.user_7[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(139,0).lineTo(159,25).lineTo(12,25).lineTo(0,0);
			this.user_7[1].setBounds(0,0,148,22);
			this.user_7[1].x = 854; //860
			this.user_7[1].y = 437;
			this.user_7[1].betarea = "suited_tie";
			this.user_7[1].chips = []
			this.addChild(this.user_7[1]);

			this.user_7[2] = new createjs.Shape();
			this.user_7[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(148,0).lineTo(171,28).lineTo(14,28).lineTo(0,0);
			this.user_7[2].setBounds(0,0,154,25);
			this.user_7[2].x = 867; //872
			this.user_7[2].y = 463;
			this.user_7[2].betarea = "dragon";
			this.user_7[2].chips = []
			this.addChild(this.user_7[2]);

			this.user_7[3] = new createjs.Shape();
			this.user_7[3].graphics.beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(185,32).lineTo(17,32).lineTo(0,0);
			this.user_7[3].setBounds(0,0,163,25);
			this.user_7[3].x = 881;
			this.user_7[3].y = 492;
			this.user_7[3].betarea = "tiger";
			this.user_7[3].chips = []
			this.addChild(this.user_7[3]);

			// ==== player 8
			this.user_8[0] = new createjs.Shape();
			this.user_8[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(137,0).lineTo(163,22).lineTo(19,22).lineTo(0,0);
			this.user_8[0].setBounds(0,0,137,20);
			this.user_8[0].x = 974; //990
			this.user_8[0].y = 414;
			this.user_8[0].betarea = "tie";
			this.user_8[0].chips = []
			this.addChild(this.user_8[0]);

			this.user_8[1] = new createjs.Shape();
			this.user_8[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(144,0).lineTo(173,25).lineTo(20,25).lineTo(0,0);
			this.user_8[1].setBounds(0,0,150,22);
			this.user_8[1].x = 994; //1006
			this.user_8[1].y = 437;
			this.user_8[1].betarea = "suited_tie";
			this.user_8[1].chips = []
			this.addChild(this.user_8[1]);

			this.user_8[2] = new createjs.Shape();
			this.user_8[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(153,0).lineTo(186,28).lineTo(24,28).lineTo(0,-1);
			this.user_8[2].setBounds(0,0,160,23);
			this.user_8[2].x = 1015; //1024
			this.user_8[2].y = 463;
			this.user_8[2].betarea = "dragon";
			this.user_8[2].chips = []
			this.addChild(this.user_8[2]);

			this.user_8[3] = new createjs.Shape();
			this.user_8[3].graphics.beginFill(color_def2).moveTo(0,0).lineTo(162,0).lineTo(200,32).lineTo(27,32).lineTo(0,0);
			this.user_8[3].setBounds(0,0,173,25);
			this.user_8[3].x = 1040;
			this.user_8[3].y = 492;
			this.user_8[3].betarea = "tiger";
			this.user_8[3].chips = []
			this.addChild(this.user_8[3]);

			for(var x = 1; x <= 8; x++) {
				if(x!=4 && x!=5) {
					for(var  i =0; i < this["user_"+x].length; i++) {
						this["user_"+x][i].alpha = 0.1;
						this["user_"+x][i].x -= adjustX;
						switch (this["user_"+x][i].betarea) {
							case "tie" :
								this["user_"+x][i].payout_multiplier = 10;
								break;
							case "suited_tie" :
								this["user_"+x][i].payout_multiplier = 50;
								break;
							case "dragon" :
								this["user_"+x][i].payout_multiplier = 1;
								break;
							case "tiger" :
								this["user_"+x][i].payout_multiplier = 1;
								break;
						} // end switch case
					} // end user for loop
				}
			}
			// === Other user bets
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

									this["user_" + (loop + 2)+"_bet"].text = numberWithCommas(row.bet_amount);
									this.changeCurrentChips(row.bet_amount, this["user_" + (loop + 2)][i], true, false);
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
									this["user_" + loop+"_bet"].text = numberWithCommas(row.bet_amount);
									this.changeCurrentChips(row.bet_amount, this["user_" + loop][i], true, false);
								}
							});
						}
					}
				}
			} // end for
		},
		changeCurrentChips(amount,betArea,isMulti,isMain) {
			let avail_chips = [];
			let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
			}

			//Chip container init and stacking
			let posX = betArea.x + (betArea.getTransformedBounds().width / 2);
			let posY = betArea.y + ((betArea.getTransformedBounds().height / 2) - 5);

			let count = avail_chips.length-1;
			let chips = [];
			let chipsfrombanker = amount;

			// Remove all chip components
			if (betArea.chips.length) {
				betArea.chips = [];
			}

			for (var x = avail_chips.length-1; x > -1; x--) {
				if (chipsfrombanker == avail_chips[x].value) {
					chips.push(avail_chips[x]);
					break;
				} // end if
				else if (chipsfrombanker-avail_chips[x].value >= 0){
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

				instance = createSprite(this.context.getResources(chip_name), 72, 72, instance);
				instance.regX = instance.getBounds().width / 2;
				instance.regY = instance.getBounds().height / 2;
				instance.x = 0;
				instance.y = 0;
				instance.gotoAndStop(2);
				instance.dropped_at = betArea;

				chipDataCon = new createjs.Container();
				chipDataCon.x = posX;
				chipDataCon.y = (posY + 4) - (betArea.chips.length * 4);
				chipDataCon.scaleX = chipDataCon.scaleY = 0.53;
				chipDataCon.chip_amt = chips[x].value;
				chipDataCon.addChild(instance);

				instanceMask = new createjs.Shape();
				instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 22);
				instanceMask.x = instance.x;
				instanceMask.y = instance.y;
				instanceMask.scaleY = 0.6;
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

				instanceTxt = new createjs.Text(instanceAmt, 'normal 30px bebas-regular', '#000');
				instanceTxt.textBaseline = 'middle';
				instanceTxt.textAlign = 'center';
				instanceTxt.x = instance.x;
				instanceTxt.y = instance.y;
				instanceTxt.scaleY = 0.6;
				chipDataCon.addChild(instanceTxt);

				// Chip adjustment
				if (isMulti) {
					let table = betArea.table_name;
					if (table == 'tiger') {
						instanceTxt.skewX = -10;
					}
					else if (table == 'dragon') {
						instanceTxt.skewX = 10;
					}
				}

				chipDataCon.dropped_at = betArea;
				betArea.chips.push(chipDataCon);

				if (isMain) {
					betArea.dropped_state(betArea);
					this.chips_container_main.addChild(chipDataCon);
				}
				else {
					this.chips_container.addChild(chipDataCon);
				}
			} //end for
		},
		cancelBet (data) {
			if(data.data[0].range != window.range) return;
			let seat_num = this.checkUser(data.data[0]);

			this["user_" + seat_num+"_bet"].text = 0;
			this["user_"+seat_num+"_name"].total_bet = 0;

			this["user_"+seat_num].forEach((e) => {
				e.alpha = 1;
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
				this["user_"+seat_num+"_name"].text = "";
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
				u_count2++;

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

			if (!this.currentBet.length) {
				this.currentBet.push(_.cloneDeep(data));
			}
			else {
				for (var i = 0; i < this.currentBet.length; i++) {
					if (this.currentBet[i].id != data.id) {
						this.currentBet.push(_.cloneDeep(data));
					}
					else {
						this.currentBet[i] = _.cloneDeep(data);
					}
				}
			}

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

				// seat_num = this.checkUser(data.data[i].name);
				// if(data.data[i].currency == "N" && window.casino == "SS") {
				// 	data.data[i].bet_amount = parseInt(data.data[i].bet_amount)/1000

				// } else if(data.data[i].currency == "SS" && window.casino == "N") {
				// 	data.data[i].bet_amount = parseInt(data.data[i].bet_amount)*1000
				// }
				//
				data.data[i].bet_amount = (parseInt(data.data[i].bet_amount) / parseInt(data.data[i].currencyMultiplier)) * window.currencyMultiplier

				for(var x = 0; x < this["user_"+seat_num].length;x++) {
					if(this["user_"+seat_num][x].betarea == data.data[i].bet) {
						this["user_"+seat_num][x].alpha = 1
						this["user_"+seat_num+"_name"].total_bet += parseInt(data.data[i].bet_amount)

						this["user_"+seat_num][x].chips.forEach((chip) =>{
							this.chips_container.removeChild(chip)
						});

						this.changeCurrentChips(data.data[i].bet_amount, this["user_"+seat_num][x], true, false)
						// this["user_"+seat_num+"_name"].text = "user_id_"+data.id;
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
						this["user_"+x][i].alpha = 0.1;

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
		newRound() {
			// this.cache(248,434, 1530, 280);

			this.chips_container_main.removeAllChildren();
			this.currentBet = [];
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
				e.chips = [];
			})
			this.chips_container_main.removeAllChildren();
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
				} //end of for loop winning length

				if (this.bet_areas[i].chips) {
					if (this.bet_areas[i].chips.length) {
						if (!this.bet_areas[i].win) {
							this.bet_areas[i].chips.forEach((e) => {
								lose_chips_to_animate.push(e);
							});
						}

						if (this.isTie || this.suitedTie) {
							if (this.bet_areas[i].table_name == 'dragon' || this.bet_areas[i].table_name == 'tiger') {
								this.createTieChip(this.bet_areas[i], 'win', true);
								this.createTieChip(this.bet_areas[i], 'lose', true);

								this.bet_areas[i].chips.forEach((e) => {
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
						}
					} // end if chips has length
				} // end for loop bet area chips
			} //end of bet area loop

			setTimeout(() => {
				this.loseTableChipsAnimation(lose_chips_to_animate);
			}, 2000);

			setTimeout(() => {
				this.setWinChips(winning);
			}, 4000);
		}, // end of tableWinning
		tableWin (winning) {
			let loop = 0;
			let lose_chips_to_animate = [];

			this.isTie = winning.some((e) => {
				return e == 'tie';
			});

			this.suitedTie = winning.some((e) => {
				return e == 'suited_tie';
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
								if (this.isTie || this.suitedTie) {
									if (betArea.betarea == 'dragon' || betArea.betarea == 'tiger') {
										return;
									}
								}

								lose_chips_to_animate.push(e);
							}
						});
					} // end if

					if (this.isTie || this.suitedTie) {
						if (betArea.betarea == 'dragon' || betArea.betarea == 'tiger') {
							if (betArea.chips.length) {
								this.createTieChip(betArea, 'win', false);
								this.createTieChip(betArea, 'lose', false);

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
							} // end if has chips
						}
					} //end of tie condition
				}
			}

			setTimeout(() => {
				this.loseTableChipsAnimation(lose_chips_to_animate);
			}, 2000);

			setTimeout(() => {
				this.setWinChipsMulti(winning);
			}, 4000);
		},
		createTieChip(betArea, type, isMain) {
			let chips = [];
			let winnings = betArea.total_bet_amt / 2;

			if (!isMain) {
				let totalBet = 0;
				betArea.chips.forEach((e) => {
					if (!e.tiePayout) totalBet += e.chip_amt;
				});

				winnings = totalBet / 2;
			}

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

			for (var x = avail_chips.length-1; x > -1; x--) {
				if (chipsfrombanker == avail_chips[x].value) {
					chips.push(avail_chips[x]);
					break;
				} // end if
				else if (chipsfrombanker-avail_chips[x].value >= 0){
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
				chipDataCon.scaleX = chipDataCon.scaleY = 0.53;
				chipDataCon.chip_amt = chips[x].value;
				chipDataCon.dropped_at = betArea;

				chipDataCon.addChild(instance);

				instanceMask = new createjs.Shape();
				instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 22);
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

				instanceTxt = new createjs.Text(instanceAmt, 'normal 28px bebas-regular', '#000');
				instanceTxt.textBaseline = 'middle';
				instanceTxt.textAlign = 'center';
				instanceTxt.x = instance.x;
				instanceTxt.y = instance.y;
				instanceTxt.scaleY = 0.7;
				chipDataCon.addChild(instanceTxt);

				// Chip adjustment
				if (parseInt(multiplayer)) {
					instanceTxt.font = 'normal 28px bebas-regular';
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
					instanceTxt.font = 'normal 25px bebas-regular';
				}

				betArea.chips.push(chipDataCon);

				if (isMain) {
					this.chips_container_main.addChild(chipDataCon);
				}
				else {
					betArea.animate = type;
					betArea.tiePayout = true;
					this.chips_container.addChild(chipDataCon);
				}
			} //end for
		},
		loseTableChipsAnimation(chips) {
			let posX = (this.context.stage.baseWidth / 2);
			let posY = (this.context.stage.baseHeight / 2);

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
		winTableChipsAnimation(chips) {
			for (var x = 0; x < chips.length; x++) {

				createjs.Tween.get(chips[x])
				.to({
					scaleX: 0.6,
					scaleY: 0.6,
					x: 750,
					y: 650
				}, 1700, createjs.Ease.quadOut)
			}
		}, // end of winTableChipsAnimation
		setWinChipsMulti(winning) {
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

								let winningAmt = totalBet * betArea.payout_multiplier;
								this.createWinningChips(winningAmt, betArea, false);
							}
						} //end of checking bet area win
					} //end of  bet area loop
				}
			}
		},
		setWinChips(winning) {
			let win_chips_to_animate = [];
			let winningChips = [];

			for (var i = 0; i < this.bet_areas.length; i++) {
				for (var x = 0; x < winning.length; x++) {
					if (!this.bet_areas[i].multiplayer) {
						if (this.bet_areas[i].table_name == winning[x]) {
							if (this.bet_areas[i].chips.length) {
								let winningAmt = this.setWinAmt(this.bet_areas[i]);
								winningChips = this.createWinningChips(winningAmt, this.bet_areas[i], true);
							}
						}
					}
				} //end of  bet area loop

				if (this.bet_areas[i].chips) {
					this.bet_areas[i].chips.forEach((chip) => {
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
				}
			} //end of forloop winning length

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
		createWinningChips(winAmount, betArea, isMain) {
			if (this.isTie || this.suitedTie) {
				if (betArea.table_name == 'dragon' || betArea.table_name == 'tiger') {
					return;
				}
			}

			let chips = [];
			let chipsfrombanker = winAmount;

			//Chip container init and stacking
			let posX = betArea.x + (betArea.getTransformedBounds().width/2) + 15;
			let posY = betArea.y + ((betArea.getTransformedBounds().height/2) - 5);

			let avail_chips = [];
			let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
			}

			for (var x = avail_chips.length-1; x > -1; x--) {
				if (chipsfrombanker == avail_chips[x].value) {
					chips.push(avail_chips[x]);
					break;
				} // end if
				else if (chipsfrombanker-avail_chips[x].value >= 0){
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
				chipDataCon.scaleX = chipDataCon.scaleY = 0.53;
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

				instanceTxt = new createjs.Text(instanceAmt, 'normal 28px bebas-regular', '#000');
				instanceTxt.textBaseline = 'middle';
				instanceTxt.textAlign = 'center';
				instanceTxt.x = instance.x;
				instanceTxt.y = instance.y;
				instanceTxt.scaleY = 0.7;
				chipDataCon.addChild(instanceTxt);

				// Chip adjustment
				if (parseInt(multiplayer)) {
					instanceTxt.font = 'normal 28px bebas-regular';
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
					instanceTxt.font = 'normal 25px bebas-regular';
				}

				createjs.Tween.get(chipDataCon)
				.wait(x*200)
				.to({
					alpha: 1,
					y: (posY + 4) - (betArea.chips.length * 4)
				}, 120, createjs.Ease.quadOut)

				betArea.chips.push(chipDataCon);
				chipDataCon.dropped_at = betArea;

				if (isMain) {
					this.chips_container_main.addChild(chipDataCon);
				}
				else {
					this.chips_container.addChild(chipDataCon);
				}
			} //end for
		},
		cloneTableDraw() {
					let table_img = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "multiplayer_table_chinese" : "multiplayer_table"));

					table_img.scaleX = table_img.scaleY = 0.39;
					table_img.regX = table_img.getBounds().width/2;
					table_img.regY = table_img.getBounds().height/2;
					table_img.x = 640;
					table_img.y = 455; //

					return table_img;
				}
	});

	return instance;
}
