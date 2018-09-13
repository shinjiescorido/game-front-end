
import {  createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap } from '../../../factories/factories';

import {scoreboard as sboard} from '../../../factories/scoreboard_draw';
import format from '../../../factories/formatter';

let drawSboard  = sboard;

let dragonTiger = {
	createGame (_target,self) {
	  let adjustY = 30;

		if(window.user_type == "C" || window.user_type == "TC") {
			_target.bet_range = _target.data.casinoBetRanges[0]
		} else {
			_target.bet_range = _target.data.sportBetRanges[0]
		}

		// agent range checking starts here
		let roomType = _target.data.roomType === 'n'? 'normal' : _target.data.roomType === 'v'? 'vip' : 'premium';
		let isFlippy = _target.data.gameName === 'Baccarat' && _target.data.type === 'flippy';
		let a_range = _.find(window.agent_range, (a)=> {
			if(a.gameType.toLowerCase() === 'flippy') {
				return a.game === _target.data.gameName && a.type === roomType && isFlippy;
			} else {
				return a.game === _target.data.gameName && a.type === roomType && !isFlippy;
			} 
		});

		if(window.agent_range.length && !_.isEmpty(a_range)) {
			_target.bet_range = a_range.ranges[0];
		}
		//ends here

	  let bet_area_bg = new createjs.Shape();
	  bet_area_bg.graphics.beginFill("rgba(60, 60, 60, 0.78)").drawRect(0,0,590 + 60,self.g_height);
	  bet_area_bg.setBounds(0,0,590 + 60,self.g_height);

	  _target.betareas_container.addChild(bet_area_bg);

	  _target.betarea[0] = new createjs.Shape();
	  _target.betarea[0].x = 20;
	  _target.betarea[0].y = 32;
	  _target.betarea[0].table = "dragon_big";
	  _target.betarea[0].payout_multiplier = 1;
	  _target.betarea[0].graphics.beginFill("#1565c0").drawRoundRect(0,0,70,62,2);
	  _target.betarea[0].setBounds(0,0,70,62);

	  let dragon_big_label = new createjs.Text(window.language.multibet_betareas.big,"18px lato","#fff");
	  dragon_big_label.y = _target.betarea[0].y + 2 + adjustY;
	  dragon_big_label.x = _target.betarea[0].x + (70/2);
	  dragon_big_label.textAlign = "center"
	  dragon_big_label.is_text = true
	  // dragon_big_label.hitArea = _target.betarea[1]
	  _target.cosmetics_container.addChild(dragon_big_label);

	  _target.betarea[1] = new createjs.Shape();
	  _target.betarea[1].x = _target.betarea[0].x + 5 + 70;
	  _target.betarea[1].y = 32;
	  _target.betarea[1].table = "dragon_even";
	  _target.betarea[1].payout_multiplier = 1;
	  _target.betarea[1].graphics.beginFill("#1565c0").drawRoundRect(0,0,70,62,2);
	  _target.betarea[1].setBounds(0,0,70,62);

	  let dragon_even_label = new createjs.Text(window.language.multibet_betareas.even,"18px lato","#fff");
	  dragon_even_label.y = _target.betarea[1].y + 2 + adjustY;
	  dragon_even_label.x = _target.betarea[1].x + (70/2);
	  dragon_even_label.textAlign = "center"
	  dragon_even_label.is_text = true
	  // dragon_even_label.hitArea = _target.betarea[1]
	  _target.cosmetics_container.addChild(dragon_even_label);

	  _target.betarea[2] = new createjs.Shape();
	  _target.betarea[2].x = 20;
	  _target.betarea[2].y = 98;
	  _target.betarea[2].table = "dragon_small";
	  _target.betarea[2].payout_multiplier = 1;
	  _target.betarea[2].graphics.beginFill("#1565c0").drawRoundRect(0,0,70,62,2);
	  _target.betarea[2].setBounds(0,0,70,62);

	  let dragon_small_label = new createjs.Text(window.language.multibet_betareas.small,"18px lato","#fff");
	  dragon_small_label.y = _target.betarea[2].y + 2 + adjustY;
	  dragon_small_label.x = _target.betarea[2].x + (70/2);
	  dragon_small_label.textAlign = "center"
	  dragon_small_label.is_text = true
	  // dragon_small_label.hitArea = _target.betarea[2]
	  _target.cosmetics_container.addChild(dragon_small_label);

	  _target.betarea[3] = new createjs.Shape();
	  _target.betarea[3].x = _target.betarea[2].x + 5 + 70;
	  _target.betarea[3].y = 98;
	  _target.betarea[3].table = "dragon_odd";
	  _target.betarea[3].payout_multiplier = 1;
	  _target.betarea[3].graphics.beginFill("#1565c0").drawRoundRect(0,0,70,62,2);
	  _target.betarea[3].setBounds(0,0,70,62);

	  let dragon_odd_label = new createjs.Text(window.language.multibet_betareas.odd,"18px lato","#fff");
	  dragon_odd_label.y = _target.betarea[3].y + 2 + adjustY;
	  dragon_odd_label.x = _target.betarea[3].x + (70/2);
	  dragon_odd_label.textAlign = "center"
	  dragon_odd_label.is_text = true
	  // dragon_odd_label.hitArea = _target.betarea[3]
	  _target.cosmetics_container.addChild(dragon_odd_label);

	  _target.betarea[4] = new createjs.Shape();
	  _target.betarea[4].x = _target.betarea[3].x + 5 + 70;
	  _target.betarea[4].y = 32;
	  _target.betarea[4].table = "dragon";
	  _target.betarea[4].payout_multiplier = 1;
	  _target.betarea[4].graphics.beginFill("#1565c0").drawRoundRect(0,0,80,130,2);
	  _target.betarea[4].setBounds(0,0,80,132);

	  let dragon_label = new createjs.Text(window.language.multibet_betareas.dragon,"18px lato","#fff");
	  dragon_label.y = _target.betarea[4].y + 2 + adjustY;
	  dragon_label.x = _target.betarea[4].x + (80/2);
	  dragon_label.textAlign = "center"
	  dragon_label.is_text = true
	  // dragon_label.hitArea = _target.betarea[4]
	  _target.cosmetics_container.addChild(dragon_label);

	  _target.betarea[5] = new createjs.Shape();
	  _target.betarea[5].x = _target.betarea[4].x + 5 + 80;
	  _target.betarea[5].y = 32 ;
	  _target.betarea[5].table = "tie";
	  _target.betarea[5].payout_multiplier = 10;
	  _target.betarea[5].graphics.beginFill("#689f38").drawRoundRect(0,0,90,(132/2) -3,2);
	  _target.betarea[5].setBounds(0,0,90,(132/2) -3);

	  let tie_label = new createjs.Text(window.language.multibet_betareas.tie,"18px lato","#fff");
	  tie_label.y = _target.betarea[5].y + 2 + adjustY;
	  tie_label.x = _target.betarea[5].x + (90/2);
	  tie_label.textAlign = "center"
	  tie_label.is_text = true
	  // tie_label.hitArea = _target.betarea[5]
	  _target.cosmetics_container.addChild(tie_label);

	  _target.betarea[6] = new createjs.Shape();
	  _target.betarea[6].x = _target.betarea[5].x + 5 + 90;
	  _target.betarea[6].y = 32;
	  _target.betarea[6].table = "tiger";
	  _target.betarea[6].payout_multiplier = 1;
	  _target.betarea[6].graphics.beginFill("#d32f2f").drawRoundRect(0,0,80,130,2);
	  _target.betarea[6].setBounds(0,0,80,132);

	  let tiger_label = new createjs.Text(window.language.multibet_betareas.tiger,"18px lato","#fff");
	  tiger_label.y = _target.betarea[6].y + 2 + adjustY;
	  tiger_label.x = _target.betarea[6].x + (80/2);
	  tiger_label.textAlign = "center"
	  tiger_label.is_text = true
	  // tiger_label.hitArea = _target.betarea[6]
	  _target.cosmetics_container.addChild(tiger_label);

	  _target.betarea[7] = new createjs.Shape();
	  _target.betarea[7].x = _target.betarea[6].x + 5 + 80;
	  _target.betarea[7].y = 32;
	  _target.betarea[7].table = "tiger_even";
	  _target.betarea[7].payout_multiplier = 1;
	  _target.betarea[7].graphics.beginFill("#d32f2f").drawRoundRect(0,0,70,62,2);
	  _target.betarea[7].setBounds(0,0,70,62);

	  let tiger_even_label = new createjs.Text(window.language.multibet_betareas.even,"18px lato","#fff");
	  tiger_even_label.y = _target.betarea[7].y + 2 + adjustY;
	  tiger_even_label.x = _target.betarea[7].x + (70/2);
	  tiger_even_label.textAlign = "center"
	  tiger_even_label.is_text = true
	  // tiger_even_label.hitArea = _target.betarea[7]
	  _target.cosmetics_container.addChild(tiger_even_label);

	  _target.betarea[8] = new createjs.Shape();
	  _target.betarea[8].x = _target.betarea[7].x + 5 + 70;
	  _target.betarea[8].y = 32;
	  _target.betarea[8].table = "tiger_big";
	  _target.betarea[8].payout_multiplier = 1;
	  _target.betarea[8].graphics.beginFill("#d32f2f").drawRoundRect(0,0,70,62,2);
	  _target.betarea[8].setBounds(0,0,70,62);

	  let tiger_big_label = new createjs.Text(window.language.multibet_betareas.big,"18px lato","#fff");
	  tiger_big_label.y = _target.betarea[8].y + 2 + adjustY;
	  tiger_big_label.x = _target.betarea[8].x + (70/2);
	  tiger_big_label.textAlign = "center"
	  tiger_big_label.is_text = true
	  // tiger_big_label.hitArea = _target.betarea[8]
	  _target.cosmetics_container.addChild(tiger_big_label);

	  _target.betarea[9] = new createjs.Shape();
	  _target.betarea[9].x = _target.betarea[6].x + 5 + 80;
	  _target.betarea[9].y = 98;
	  _target.betarea[9].table = "tiger_odd";
	  _target.betarea[9].payout_multiplier = 1;
	  _target.betarea[9].graphics.beginFill("#d32f2f").drawRoundRect(0,0,70,62,2);
	  _target.betarea[9].setBounds(0,0,70,62);

	  let tiger_odd_label = new createjs.Text(window.language.multibet_betareas.odd,"18px lato","#fff");
	  tiger_odd_label.y = _target.betarea[9].y + 2 + adjustY;
	  tiger_odd_label.x = _target.betarea[9].x + (70/2);
	  tiger_odd_label.textAlign = "center"
	  tiger_odd_label.is_text = true
	  // tiger_odd_label.hitArea = _target.betarea[9]
	  _target.cosmetics_container.addChild(tiger_odd_label);

	  _target.betarea[10] = new createjs.Shape();
	  _target.betarea[10].x = _target.betarea[9].x + 5 + 70;
	  _target.betarea[10].y = 98;
	  _target.betarea[10].table = "tiger_small";
	  _target.betarea[10].payout_multiplier = 1;
	  _target.betarea[10].graphics.beginFill("#d32f2f").drawRoundRect(0,0,70,62,2);
	  _target.betarea[10].setBounds(0,0,70,62);			

	  _target.betarea[11] = new createjs.Shape();
	  _target.betarea[11].x = _target.betarea[5].x;
	  _target.betarea[11].y = 32 + (132/2) +1;
	  _target.betarea[11].table = "suited_tie";
	  _target.betarea[11].payout_multiplier = 50;
	  _target.betarea[11].graphics.ss(1.5).s("#9c7935").beginLinearGradientFill(["#dcc36d", "#efe083", "#dcc36d"], [0,0.5,1], 20,0,60,0,100,0).drawRoundRect(0,0,90,(132/2) -3,2);
	  _target.betarea[11].setBounds(0,0,90,(132/2) -3);

	  let suited_tie_label = new createjs.Text("suited \n tie".toUpperCase(),"15px lato","#000");
	  suited_tie_label.y = _target.betarea[11].y + 2 + adjustY ;
	  suited_tie_label.x = _target.betarea[11].x + (80/2);
	  suited_tie_label.textAlign = "center"
	  suited_tie_label.is_text = true;

	  let suited_tie_asset = new createjs.Bitmap(window.language.locale == 'zh' ? self.context.getResources("suited-tie-multibet-zh") : self.context.getResources("suited-tie-multibet"));
	  suited_tie_asset.y = _target.betarea[11].y + 2 + adjustY ;
	  suited_tie_asset.set({regX: suited_tie_asset.getTransformedBounds().width/2});
	  suited_tie_asset.x = _target.betarea[11].x + (90/2);
	  suited_tie_asset.textAlign = "center"
	  suited_tie_asset.hitArea = _target.betarea[11]
	  _target.cosmetics_container.addChild(suited_tie_asset);

		for(var a = 0; a < _target.betarea.length; a++) {
			if(_target.betarea[a].table == "dragon" || _target.betarea[a].table == "tiger") {
				_target.betarea[a].min_betAmt = (_target.bet_range.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
				_target.betarea[a].max_betAmt = (_target.bet_range.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
			}

			for(var e = 0; e < _target.bet_range.side_bet.length; e++) {
				switch (_target.bet_range.side_bet[e].division ) {
					case  "Tie" :
						if(_target.betarea[a].table == "tie") {
							_target.betarea[a].min_betAmt = (_target.bet_range.side_bet[e].min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
							_target.betarea[a].max_betAmt = (_target.bet_range.side_bet[e].max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
						}
					break;
					case  "Big&Small" :
						if(_target.betarea[a].table == "dragon_big" || _target.betarea[a].table == "dragon_small" || _target.betarea[a].table == "tiger_big" || _target.betarea[a].table == "tiger_small") {
							_target.betarea[a].min_betAmt = (_target.bet_range.side_bet[e].min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
							_target.betarea[a].max_betAmt = (_target.bet_range.side_bet[e].max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
						}
					break;

       				case ('Suited Tie'):
						if(_target.betarea[a].table == "suited_tie") {
							_target.betarea[a].min_betAmt = (_target.bet_range.side_bet[e].min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
							_target.betarea[a].max_betAmt = (_target.bet_range.side_bet[e].max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
		        		}
       				break;

					case  "Odd or Even" :
						if(_target.betarea[a].table == "tiger_odd" || _target.betarea[a].table == "tiger_even" || _target.betarea[a].table == "dragon_odd" || _target.betarea[a].table == "dragon_even") {
							_target.betarea[a].min_betAmt = (_target.bet_range.side_bet[e].min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
							_target.betarea[a].max_betAmt = (_target.bet_range.side_bet[e].max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
						}
					break;
				}
			}

			_target.betarea[a].y += adjustY;
		}


	  let tiger_small_label = new createjs.Text(window.language.multibet_betareas.small,"18px lato","#fff");
	  tiger_small_label.y = _target.betarea[10].y + 2;
	  tiger_small_label.x = _target.betarea[10].x + (70/2);
	  tiger_small_label.textAlign = "center"
	  tiger_small_label.is_text = true
	  // tiger_odd_label.hitArea = _target.betarea[10]
	  _target.cosmetics_container.addChild(tiger_small_label);

	  let dragon_circle = new createjs.Shape();
	  dragon_circle.graphics.beginFill("#1565c0").drawCircle((25*2) + 5 ,135 + 12,25);
	  let tiger_circle = new createjs.Shape();
	  tiger_circle.graphics.beginFill("#d32f2f").drawCircle(((25*2)*2) + 36,135 + 12,25);
	  _target.result_container.addChild(dragon_circle, tiger_circle);

	  _target.card_result_container = new createjs.Container();
	  _target.card_result_container.set({y: 12});
	  _target.result_container.addChild(_target.card_result_container)

	  let cardAdjustX = 8;

	  _target.tiger_card = createCardSprite(self,40.7,54.5,"multi-bet-cards");
	  _target.tiger_card.scaleX = _target.tiger_card.scaleY = 1.2
	  _target.tiger_card.x = (110 + cardAdjustX) + _target.tiger_card.getTransformedBounds().width/2
	  _target.tiger_card.y = 30
	  _target.tiger_card.visible = false
	  _target.tiger_card.shadow = new createjs.Shadow("#2b2b2b",-2,2,2);
	  _target.tiger_card.regX = _target.tiger_card.getTransformedBounds().width/2;
	  _target.card_result_container.addChild(_target.tiger_card);

	  _target.dragon_card = createCardSprite(self,40.7,54.5,"multi-bet-cards");
	  _target.dragon_card.scaleX = _target.dragon_card.scaleY = 1.2
	  _target.dragon_card.x = (28 + cardAdjustX) + _target.dragon_card.getTransformedBounds().width/2
	  _target.dragon_card.y = 30
	  _target.dragon_card.shadow = new createjs.Shadow("#2b2b2b",-2,2,2);
	  _target.dragon_card.regX = _target.dragon_card.getTransformedBounds().width/2;
	  _target.dragon_card.visible = false
	  _target.card_result_container.addChild(_target.dragon_card);

	  _target.tiger_val = new createjs.Text("0","25px BebasNeue","#fff");
	  _target.tiger_val.x = 135
	  _target.tiger_val.y = 135
	  _target.tiger_val.visible = false
	  _target.tiger_val.textAlign = "center"
	  _target.tiger_val.textBaseline = "middle"
	  _target.card_result_container.addChild(_target.tiger_val);

	  _target.dragon_val = new createjs.Text("0","25px BebasNeue","#fff");
	  _target.dragon_val.x = 55
	  _target.dragon_val.y = 135
	  _target.dragon_val.textAlign = "center"
	  _target.dragon_val.textBaseline = "middle"
	  _target.dragon_val.visible = false
	  _target.card_result_container.addChild(_target.dragon_val);

	  _target.total_game_bet = new createjs.Text("0","30px BebasNeue","#fff");
	  _target.total_game_bet.textAlign = "center";
	  _target.total_game_bet.x = bet_area_bg.x + bet_area_bg.getBounds().width/2;
	  _target.betareas_container.addChild(_target.total_game_bet)

	  // === eye
	  let eye_bg = new createjs.Shape();
	  eye_bg.graphics.beginFill("rgba(255, 255, 255, 0.4)").drawRect(0,0,1070 + 30,self.g_height);
	  eye_bg.setBounds(0,0,1070 + 30,self.g_height);

	  _target.eye_view_container.addChild(eye_bg)

	  let row = 6;
	  let col = 12;

	  let lines = new createjs.Shape();
	  lines.graphics.ss(1).s("rgba(0,0,0,0.3)").moveTo(0,0);
	  _target.eye_view_container.addChild(lines);

	  // == pearl road
	  for(var i = 0; i < row; i++) { //row
		  lines.graphics.lineTo(0, (i*32)).lineTo(col*29, (i*32)).moveTo(0,(i*32))
	  } // end for
	  for(var e = 0; e < col; e++) {
		  lines.graphics.lineTo((e*29), 0).lineTo((e*29), (32*row) - 0.6).moveTo((e*29),0)
	  } // end for

	  let borderlines = new createjs.Shape();
	  borderlines.graphics.s("#000").ss(1).moveTo(348, 0).lineTo(348, self.g_height);
	  borderlines.graphics.moveTo(348,96).lineTo(765,96);
	  borderlines.graphics.moveTo(348,144).lineTo(765,144);
	  borderlines.graphics.moveTo(348 + 210,144).lineTo(348 + 210,144 + 48);
	  _target.eye_view_container.addChild(borderlines);

	  col = 26;
	  row = 12;

	  for(var i = 0; i < row; i++) { //row
		  lines.graphics.lineTo(348, (i*16)).lineTo(348+(col*16), (i*16)).moveTo(348,(i*16))
	  } // end for
	  for(var e = 0; e < col; e++) {
		  lines.graphics.lineTo(348+(e*16), 0).lineTo(348+(e*16), (16*row) - 0.6).moveTo(348+(e*16),0)
	  } // end for1616


		  // let row_line = new createjs.Shape();
		  // row_line.graphics.ss(1).s("#000").moveTo(336,90).lineTo(756,90);
		  // _target.eye_view_container.addChild(row_line);

		  // let row_line2 = new createjs.Shape();
		  // row_line2.graphics.ss(1).s("#000").moveTo(336,(90 + 45)).lineTo(756,(90 + 45));
		  // _target.eye_view_container.addChild(row_line2);

		  // let row_line3 = new createjs.Shape();
		  // row_line3.graphics.ss(1).s("#000").moveTo(336 + 210,(90 + 45)).lineTo(336 + 210,(90 + 45) + 45);
		  // _target.eye_view_container.addChild(row_line3);

		  // let prediction_bg = new createjs.Shape();
		  // prediction_bg.graphics.ss(1).s("rgba(0,0,0,0.5)").beginFill("#fff").drawRect(0,0,30,130);
		  // prediction_bg.x = 756
		  // _target.eye_view_container.addChild(prediction_bg);

		  // let prediction_bg2 = new createjs.Shape();
		  // prediction_bg2.graphics.ss(1).s("rgba(0,0,0,0.5)").beginFill("#fff").drawRect(0,0,30,130);
		  // prediction_bg2.x = 756 + 30
		  // _target.eye_view_container.addChild(prediction_bg2);

	  let showcount_bg = new createjs.Shape();
	  showcount_bg.graphics.ss(1).s("rgba(255,255,255,0.3)").beginFill("#393939").drawRect(1,0,58,48);
	  showcount_bg.x = 765;
	  showcount_bg.y = 142;
		// showcount_bg.visible = false;
	  _target.eye_view_container.addChild(showcount_bg);

	  let cosmeticsAdjustX = 14;
	  // === text
	  let label_text_1 = new createjs.Text("dragon".toUpperCase(), "bold 16px arial", "#000");
	  label_text_1.x = 935 + cosmeticsAdjustX;
	  label_text_1.textAlign = "center";
	  label_text_1.y = 15;
		// label_text_1.visible = false;
		// label_text_1.visible = false;
	  _target.eye_view_container.addChild(label_text_1);

	  let label_text_2 = new createjs.Text("tiger".toUpperCase(), "bold 16px arial", "#000");
	  label_text_2.x = 935 + cosmeticsAdjustX;
	  label_text_2.textAlign = "center";
	  label_text_2.y = 150;
		// label_text_2.visible = false;
	  _target.eye_view_container.addChild(label_text_2);

	  // ===
	  //
	  let spriteData = {
		  images: [window.language.locale == 'zh'? self.context.getResources("numeric_stats_zh") : self.context.getResources("numeric_stats")],
		  frames: {width:44, height: 27},
		  animations: {
			  "d-0" : 0,
			  "d-1" : 1,
			  "d-2" : 2,
			  "d-3" : 3,
			  "d-4" : 4,

			  "tie-grey" : 5,
			  "tie-green" : 6,

			  "t-7" : 7,
			  "t-8" : 8,
			  "t-9" : 9,
			  "t-10" : 10,
			  "t-11" : 11
		  }
	  }

	  let spriteSheet = new createjs.SpriteSheet(spriteData);
		// spriteSheet.visible = false;
	  let dragon_bg  = [];
	  let tiger_bg = [];

	  let t = 7;

	  for(var i = 0; i < 5; i++) {
		  dragon_bg[i] = new createjs.Sprite(spriteSheet,"d-"+i+"");
		  dragon_bg[i].x = (i * 46.5) + 830 + cosmeticsAdjustX;
		  dragon_bg[i].y = 40
			// dragon_bg[i].visible = false;
		  _target.eye_view_container.addChild(dragon_bg[i]);

		  tiger_bg[i] = new createjs.Sprite(spriteSheet, "t-" + t + "");
		  tiger_bg[i].x = (i* 46.5) + 830 + cosmeticsAdjustX;
		  tiger_bg[i].y = 115;
			// tiger_bg[i].visible = false;
		  _target.eye_view_container.addChild(tiger_bg[i]);
		  t++;
	  }

	  // let grey_bg = new createjs.Sprite(spriteSheet, "tie-grey");
	  // grey_bg.x = 85 + 825;
	  // grey_bg.y = 78;
	  // _target.eye_view_container.addChild(grey_bg);

	  let tie_bg = new createjs.Sprite(spriteSheet, "tie-green");
	  _target.eye_view_container.addChild(tie_bg);
	  tie_bg.x = 98 + 825 + cosmeticsAdjustX;
	  tie_bg.y = 78;
		// tie_bg.visible = false;

	  _target.shoe_counter = new createjs.Text("0","35px BebasNeue",'#fff');
	  _target.shoe_counter.x = showcount_bg.x + 58/2;
	  _target.shoe_counter.y = showcount_bg.y + 6;
	  _target.shoe_counter.textAlign = "center";
		// _target.shoe_counter.visible = false;
	  _target.eye_view_container.addChild(_target.shoe_counter);

	  // == road maps
	  _target.pearlroad_container = new createjs.Container();
	  console.log(_target.pearlroad_container, "pearlroad_container")
	  _target.eye_view_container.addChild(_target.pearlroad_container);

	  _target.bigroad_container = new createjs.Container();
	  _target.bigroad_container.x = 349;
	  _target.bigroad_container.y = -1;
	  console.log(_target.bigroad_container, "bigroad")
	  _target.eye_view_container.addChild(_target.bigroad_container);

	  _target.bigeyeboy_container = new createjs.Container();
	  _target.bigeyeboy_container.x = 350;
	  _target.bigeyeboy_container.y = 96;
	  _target.eye_view_container.addChild(_target.bigeyeboy_container);

	  _target.smallroad_container = new createjs.Container();
	  _target.smallroad_container.x = 348;
	  _target.smallroad_container.y = 145;
	  _target.eye_view_container.addChild(_target.smallroad_container);

	  _target.cockroachroad_container = new createjs.Container();
	  _target.cockroachroad_container.x = 558;
	  _target.cockroachroad_container.y = 145;
	  _target.eye_view_container.addChild(_target.cockroachroad_container);

	  //=== text init
	   let pos = 46.5;
	   let posX = 825 + cosmeticsAdjustX;

	   _target.dragon_text = new createjs.Text("0", "16px arial", "#fff");
	   _target.dragon_text.textAlign = "right";
	   _target.dragon_text.y = 45;
	   _target.dragon_text.x = pos + posX;
		 // _target.dragon_text.visible = false;
	   _target.eye_view_container.addChild(_target.dragon_text);

	   _target.dragon_big_text = new createjs.Text("0", "16px arial", "#fff");
	   _target.dragon_big_text.textAlign = "right";
	   _target.dragon_big_text.y = _target.dragon_text.y;
	   _target.dragon_big_text.x = _target.dragon_text.x + pos;
		 // _target.dragon_big_text.visible = false;
	   _target.eye_view_container.addChild(_target.dragon_big_text);

	   _target.dragon_small_text = new createjs.Text("0", "16px arial", "#fff");
	   _target.dragon_small_text.textAlign = "right";
	   _target.dragon_small_text.x = _target.dragon_big_text.x + pos;
	   _target.dragon_small_text.y = _target.dragon_big_text.y;
		 // _target.dragon_small_text.visible = false;
	   _target.eye_view_container.addChild(_target.dragon_small_text);

	   _target.dragon_odd_text = new createjs.Text("0", "16px arial", "#fff");
	   _target.dragon_odd_text.textAlign = "right";
	   _target.dragon_odd_text.x = _target.dragon_small_text.x + pos;
	   _target.dragon_odd_text.y = _target.dragon_small_text.y;
		 // _target.dragon_odd_text.visible = false;
	   _target.eye_view_container.addChild(_target.dragon_odd_text);

	   _target.dragon_even_text = new createjs.Text("0", "16px arial", "#fff");
	   _target.dragon_even_text.textAlign = "right";
	   _target.dragon_even_text.x = _target.dragon_odd_text.x + pos;
	   _target.dragon_even_text.y = _target.dragon_odd_text.y;
		 // _target.dragon_even_text.visible = false;
	   _target.eye_view_container.addChild(_target.dragon_even_text);

	   _target.tiger_text = new createjs.Text("0", "16px arial", "#fff");
	   _target.tiger_text.textAlign = "right";
	   _target.tiger_text.x = pos + posX;
	   _target.tiger_text.y = 121;
		 // _target.tiger_text.visible = false;
	   _target.eye_view_container.addChild(_target.tiger_text);

	   _target.tiger_big_text = new createjs.Text("0", "16px arial", "#fff");
	   _target.tiger_big_text.textAlign = "right";
	   _target.tiger_big_text.y = _target.tiger_text.y;
	   _target.tiger_big_text.x = _target.tiger_text.x + pos;
		 // _target.tiger_big_text.visible = false;
	   _target.eye_view_container.addChild(_target.tiger_big_text);

	   _target.tiger_small_text = new createjs.Text("0", "16px arial", "#fff");
	   _target.tiger_small_text.textAlign = "right";
	   _target.tiger_small_text.x = _target.tiger_big_text.x + pos;
	   _target.tiger_small_text.y = _target.tiger_big_text.y;
		 // _target.tiger_small_text.visible = false;
	   _target.eye_view_container.addChild(_target.tiger_small_text);

	   _target.tiger_odd_text = new createjs.Text("0", "16px arial", "#fff");
	   _target.tiger_odd_text.textAlign = "right";
	   _target.tiger_odd_text.x = _target.tiger_small_text.x + pos;
	   _target.tiger_odd_text.y = _target.tiger_small_text.y;
		 // _target.tiger_odd_text.visible = false;
	   _target.eye_view_container.addChild(_target.tiger_odd_text);

	   _target.tiger_even_text = new createjs.Text("0", "16px arial", "#fff");
	   _target.tiger_even_text.textAlign = "right";
	   _target.tiger_even_text.x = _target.tiger_odd_text.x + pos;
	   _target.tiger_even_text.y = _target.tiger_odd_text.y;
		 // _target.tiger_even_text.visible = false;
	   _target.eye_view_container.addChild(_target.tiger_even_text);

	   // _target.shoeDeals_text = new createjs.Text("0", "22px arial", "#fff");
	   // _target.shoeDeals_text.textAlign = "right";
	   // _target.shoeDeals_text.x = 102;
	   // _target.shoeDeals_text.y = 80;
	   // _target.eye_view_container.addChild(_target.shoeDeals_text);

	   _target.tie_text = new createjs.Text("0", "16px arial", "#fff");
	   _target.tie_text.textAlign = "right";
	   _target.tie_text.x = 135 + posX;
	   _target.tie_text.y = 83;
		 // _target.tie_text.visible = false;
	   _target.eye_view_container.addChild(_target.tie_text);


		   ////////////////////
		  // === prediction //
		  ////////////////////

	  let prediction_bg = new createjs.Shape();
	  prediction_bg.graphics.ss(1).s("rgba(0,0,0,0.5)").beginFill("#fff").drawRect(0,0,30,142);
	  prediction_bg.x = 765;
	  prediction_bg.baccaratbtn = true;
	  prediction_bg.target = _target;
		// prediction_bg.visible = false;
	  _target.eye_view_container.addChild(prediction_bg);

	  let prediction_bg2 = new createjs.Shape();
	  prediction_bg2.graphics.ss(1).s("rgba(0,0,0,0.5)").beginFill("#fff").drawRect(0,0,30,142);
	  prediction_bg2.x = prediction_bg.x + 30
	  prediction_bg2.target = _target;
	  prediction_bg2.baccaratbtn = true;
		// prediction_bg2.visible = false;
	  _target.eye_view_container.addChild(prediction_bg2);

	  let player_prediction = new createjs.Shape();
	  player_prediction.x = prediction_bg.x + 16;
	  player_prediction.y = prediction_bg.y + 15;
	  player_prediction.graphics.beginFill("#1565c0").drawCircle(0,0,11);
	  player_prediction.hitArea = prediction_bg
		// player_prediction.visible = false;
	  _target.eye_view_container.addChild(player_prediction);
	  // ==
	  let p_text = new createjs.Text("D","14px lato", "#fff");
	  p_text.x = player_prediction.x
	  p_text.y = player_prediction.y + 5
	  p_text.textAlign = "center"
	  p_text.textBaseline = "center"
		// p_text.visible = false;
	  _target.eye_view_container.addChild(p_text);

	  let banker_prediction = new createjs.Shape();
	  banker_prediction.x = prediction_bg2.x + 16;
	  banker_prediction.y = prediction_bg2.y + 15;
	  banker_prediction.hitArea = prediction_bg2;
	  banker_prediction.graphics.beginFill("#d33030").drawCircle(0,0,11);
		// banker_prediction.visible = false;
	  _target.eye_view_container.addChild(banker_prediction);

	  let b_text = new createjs.Text("T","14px lato", "#fff");
	  b_text.x = banker_prediction.x
	  b_text.y = banker_prediction.y + 5
	  b_text.textAlign = "center"
	  b_text.textBaseline = "center"
		// b_text.visible = false;
	  _target.eye_view_container.addChild(b_text);

	  let line = new createjs.Shape();
	  line.graphics.ss(1).s("#757575").moveTo(0,0).lineTo(60, 0);
	  line.x= banker_prediction.x-45
	  line.y= banker_prediction.y +16
		// line.visible = false;
	  _target.eye_view_container.addChild(line);

	  _target.player_prediction1 = new createjs.Shape();
	  _target.player_prediction1.x = prediction_bg.x + 16;
	  _target.player_prediction1.y = prediction_bg.y + 50;
	  _target.player_prediction1.graphics.ss(3).s("#1565c0").drawCircle(0,0,10);
	  _target.player_prediction1.hitArea = prediction_bg
		// _target.player_prediction1.visible = false;
	  _target.eye_view_container.addChild(_target.player_prediction1);

	  _target.player_prediction2 = new createjs.Shape();
	  _target.player_prediction2.x = prediction_bg.x + 16;
	  _target.player_prediction2.y = prediction_bg.y + 52+30;
	  _target.player_prediction2.graphics.beginFill("#1565c0").drawCircle(0,0,10);
	  _target.player_prediction2.hitArea = prediction_bg
		// _target.player_prediction2.visible = false;
	  _target.eye_view_container.addChild(_target.player_prediction2);

	  _target.player_prediction3 = new createjs.Shape();
	  _target.player_prediction3.x = prediction_bg.x + 16 + 5;
	  _target.player_prediction3.y = prediction_bg.y + 55+30+20;
	  _target.player_prediction3.rotation = 30
	  _target.player_prediction3.graphics.beginFill("#1565c0").drawRoundRect(0,0,5,25,2);
	  _target.player_prediction3.hitArea = prediction_bg
		// _target.player_prediction3.visible = false;
	  _target.eye_view_container.addChild(_target.player_prediction3);

	  _target.banker_prediction1 = new createjs.Shape();
	  _target.banker_prediction1.x = prediction_bg2.x + 16;
	  _target.banker_prediction1.y = prediction_bg2.y + 50;
	  _target.banker_prediction1.hitArea = prediction_bg2;
	  _target.banker_prediction1.graphics.ss(3).s("#d33030").drawCircle(0,0,10);
		 // _target.banker_prediction1.visible = false;
	  _target.eye_view_container.addChild(_target.banker_prediction1);

	  _target.banker_prediction2 = new createjs.Shape();
	  _target.banker_prediction2.x = prediction_bg2.x + 16;
	  _target.banker_prediction2.y = prediction_bg2.y + 52+30;
	  _target.banker_prediction2.hitArea = prediction_bg2;
	  _target.banker_prediction2.graphics.beginFill("#d33030").drawCircle(0,0,10);
		// _target.banker_prediction2.visible = false;
	  _target.eye_view_container.addChild(_target.banker_prediction2);

	  _target.banker_prediction3 = new createjs.Shape();
	  _target.banker_prediction3.x = prediction_bg2.x + 16 + 5;
	  _target.banker_prediction3.y = prediction_bg2.y + 55+30 + 20;
	  _target.banker_prediction3.hitArea = prediction_bg2;
	  _target.banker_prediction3.rotation = 30
	  _target.banker_prediction3.graphics.beginFill("#d33030").drawRoundRect(0,0,5,25,2);
		// _target.banker_prediction3.visible = false;
	  _target.eye_view_container.addChild(_target.banker_prediction3);

  	 prediction_bg.on("click",(e) => {
		  self.predictRoadMap(e.currentTarget.target, "d");
	  });

	  prediction_bg2.on("click",(e) => {
		  self.predictRoadMap(e.currentTarget.target, "z");
	  });
	},
	updateScoreboard (data, _target) {

	  data =  _.filter(data, function (e) {
		  if(e.mark) return e;
	  });

		let count = data.length;

	  let grouped = _.groupBy(data, function (e) {
		  return e.mark;
	  });

	  let rmcount = {
		  total  : data.length,
		  dragon : 0,
		  tiger: 0,
		  tie : 0,
		  dragon_small : 0,
		  dragon_big : 0,
		  dragon_odd : 0,
		  dragon_even : 0,
		  tiger_small : 0,
		  tiger_big : 0,
		  tiger_odd : 0,
		  tiger_even : 0
	  }
	  for(var key in grouped) {
		  switch(key) {
			  case "d" : //dragon
			  case "b" : //dragon
			  case "c" : //dragon
			  case "g" : //dragon
			  case "h" :
			  case "i" :
			  case "j" :
				  rmcount.dragon += grouped[key].length;
				  grouped[key].forEach((row) => {
					  if(row.num > 7) {
						  rmcount.dragon_big ++;
					  } else if(row.num < 7) {
						  rmcount.dragon_small ++;
					  }

					  if(row.num % 2 == 0 ){
						  rmcount.dragon_even ++;
					  } else {
						  rmcount.dragon_odd ++;
					  }
				  })
				  break;
			  case "e" :
			  case "f" :
			  case "k" :
			  case "l" :
			  case "m" :
			  case "n" :
				  grouped[key].forEach((row) => {
					  if(row.num > 7) {
						  rmcount.tiger_big ++;
					  } else if(row.num < 7) {
						  rmcount.tiger_small ++;
					  }

					  if(row.num % 2 == 0 ){
						  rmcount.tiger_even ++;
					  } else {
						  rmcount.tiger_odd ++;
					  }
				  })
				  rmcount.tiger += grouped[key].length;
				  break;
			  case "a" :
			  case "o" :
			  case "p" :
			  case "q" :
			  case "r" :
			  case "s" :
			  case "t" :
				  rmcount.tie += grouped[key].length;
				  break;
		  }
	  }

	  _target.shoe_counter.text = data.length;
	  _target.shoe_cnt_text.text = data.length;

	  _target.dragon_text.text = rmcount.dragon;
	  _target.dragon_small_text.text = rmcount.dragon_small;
	  _target.dragon_big_text.text = rmcount.dragon_big;
	  _target.dragon_even_text.text = rmcount.dragon_even;
	  _target.dragon_odd_text.text = rmcount.dragon_odd;

		_target.tie_text.text = rmcount.tie;

	  _target.tiger_text.text = rmcount.tiger;
	  _target.tiger_big_text.text = rmcount.tiger_big;
	  _target.tiger_small_text.text = rmcount.tiger_small;
	  _target.tiger_odd_text.text = rmcount.tiger_odd;
	  _target.tiger_even_text.text = rmcount.tiger_even;

	  //Stat count
	  let totalDragon = parseInt(rmcount.dragon) + parseInt(rmcount.dragon_small) + parseInt(rmcount.dragon_big) + parseInt(rmcount.dragon_even) + parseInt(rmcount.dragon_odd);
	  let totalTiger = parseInt(rmcount.tiger) + parseInt(rmcount.tiger_big) + parseInt(rmcount.tiger_small) + parseInt(rmcount.tiger_odd) + parseInt(rmcount.tiger_even);
	  let totalDragonTiger = totalDragon + totalTiger;

	  if (totalDragonTiger) {
		  // Set vertical data
		  _target.player_win_stat.scaleY = totalDragon/totalDragonTiger;
		  _target.player_lose_stat.scaleY = totalTiger/totalDragonTiger;

		  // Set horizontal data
		  _target.eye_player_win.scaleX = totalDragon/totalDragonTiger;
		  _target.eye_player_lose.scaleX = totalTiger/totalDragonTiger;
	  }
	},
	swipeCards (_target, data) {
		function animCards(card, card_data) {

			if(!card.visible) {
				card.gotoAndStop(0);
				
				createjs.Tween.get(card)
				.to({
					scaleX : 1.2
				})
				.wait(2000)
				.to({
					scaleX : 0
				}, 200)
				.call((obj, card_data) => {
					obj.gotoAndStop(card_data)
				}, [card, card_data])
				.to({
					scaleX : 1.2
				}, 200)
				card.visible = true;
			}			
		}

		if(data.gameInfo.dragon) {
			animCards(_target.dragon_card, "C"+ data.gameInfo.dragon)
		}

		if(data.gameInfo.tiger) {
			animCards(_target.tiger_card, "C"+ data.gameInfo.tiger)
		}
	},
	drawRoadMap (pearl,bigroad, bigeye, smallroad, cockroach, _target, self) {
	  _target.pearlroad_container.removeAllChildren();
	  for(var i = 0; i < pearl.matrix.length; i++) {
		  for(var e = 0; e < pearl.matrix[i].length; e++) {
			  if(pearl.matrix[i][e] === undefined) continue;
			  let sp = createSpriteRoadMap(self.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, sp);
			  sp.x = (e * 29) + 1;
			  sp.y = i * 31.8;
			  sp.scaleX = sp.scaleY = .8;

		  	if((i+1) == pearl.row) {
				  if(pearl.matrix[0][e + 1] == undefined) {
					  sp.last_child = true;
				  }
			  } // end if

			  sp.gotoAndStop("pearl-dt-"+pearl.matrix[i][e].mark);
			  _target.pearlroad_container.addChild(sp);

		  } //end for
	  } //end for

		_target.pearlroad_container.children.forEach((e) => {
		  if(e.last_child) {
			  createjs.Tween.get(e).wait(100)
			  .to({ alpha : 1 },150)
			  .to({ alpha : 0 },150)
			  .to({ alpha : 1 },150)
			  .to({ alpha : 0 },150)
			  .to({ alpha : 1 },150)
		  }
		})

	  // == bigroad
	  _target.bigroad_container.removeAllChildren();
	  for(var i = 0; i < bigroad.matrix.length; i++) {
		  for(var e = 0; e < bigroad.matrix[i].length; e++) {
			  if(bigroad.matrix[i][e] === undefined) continue;
			  if(bigroad.matrix[i][e].mark === undefined)  { continue; }
			  let sp = drawSboard("bigroad")[bigroad.matrix[i][e].mark];
			  sp.scaleX = sp.scaleY = 0.55;
			  sp.x = (e * 16) - 1;
			  sp.y = i * 16;

			  if(bigroad.matrix[i][e].ties) {
				  sp.children[sp.children.length-1].visible = true;

				  if(bigroad.matrix[i][e].ties > 1) {
					  let text = new createjs.Text(bigroad.matrix[i][e].ties, "bold 18px bebasNeue","#000");
					  text.x = sp.x + (10);
					  text.y = sp.y;
					  text.textAlign = "center";

					  _target.bigroad_container.addChild(text);
				  }

			  	if(bigroad.matrix[i][e].suited_tie) {
						sp.children[sp.children.length-1].graphics.clear().beginFill("#ff9800").drawRect(0,0,3,30);
					}
		  	}
				
				if((i) == bigroad.row) {
				  if(bigroad.matrix[0][e+1] == undefined) {
					  sp.last_child = true;
				  }
			  }

			  _target.bigroad_container.addChild(sp);
		  } //end for
	  } //end for

	  _target.bigroad_container.children.forEach((e) => {
		  if(e.last_child) {
			  createjs.Tween.get(e).wait(100)
			  .to({ alpha : 1 },150)
			  .to({ alpha : 0 },150)
			  .to({ alpha : 1 },150)
			  .to({ alpha : 0 },150)
			  .to({ alpha : 1 },150)
		  }
	  });

	  // === bigeye boy
	  _target.bigeyeboy_container.removeAllChildren();
	  for(var i = 0; i < bigeye.matrix.length; i++) {
		  for(var e = 0; e < bigeye.matrix[i].length; e++) {
			  if(bigeye.matrix[i][e] === undefined) continue;
			  let sp = drawSboard("bigeyeboy")[bigeye.matrix[i][e].mark];
			  sp.scaleX = sp.scaleY = 0.28;
			  sp.x = (e * 7) - 1;
			  sp.y = (i * 7.8) - 0.4;
			  _target.bigeyeboy_container.addChild(sp);

			  if((i) == bigeye.row) {
				  if(bigeye.matrix[0][e+1] == undefined) {
					  sp.last_child = true;
					  sp.mark = bigeye.matrix[i][e].mark
				  }
			  }

		  } //end for
	  } //end for

		_target.bigeyeboy_container.children.forEach((e) => {
		  if(e.last_child) {
			  createjs.Tween.get(e).wait(100)
			  .to({ alpha : 1 },150)
			  .to({ alpha : 0 },150)
			  .to({ alpha : 1 },150)
			  .to({ alpha : 0 },150)
			  .to({ alpha : 1 },150)
		  }
	  })

	   // === small road
	  _target.smallroad_container.removeAllChildren();
	   for(var i = 0; i < smallroad.matrix.length; i++) {
		  for(var e = 0; e < smallroad.matrix[i].length; e++) {
			  if(smallroad.matrix[i][e] === undefined) continue;
			  let sp = drawSboard("smallroad")[smallroad.matrix[i][e].mark];
			  sp.x = (e * 8) - 1;
			  sp.y = (i * 7.8) - 1.5;
			  sp.scaleX = sp.scaleY = 0.31;
			  _target.smallroad_container.addChild(sp);

			  if((i) == smallroad.row) {
				  if(smallroad.matrix[0][e+1] == undefined) {
					  sp.last_child = true;
					  sp.mark = smallroad.matrix[i][e].mark;
				  }
				}

		  } //end for
	  } //end for

    _target.smallroad_container.children.forEach((e) => {
		  if(e.last_child) {
			  createjs.Tween.get(e).wait(100)
			  .to({ alpha : 1 },150)
			  .to({ alpha : 0 },150)
			  .to({ alpha : 1 },150)
			  .to({ alpha : 0 },150)
			  .to({ alpha : 1 },150)
		  }
	  })

	  // === roach
	  _target.cockroachroad_container.removeAllChildren();
	  for(var i = 0; i < cockroach.matrix.length; i++) {
		  for(var e = 0; e < cockroach.matrix[i].length; e++) {
			  if(cockroach.matrix[i][e] === undefined) continue;
			  let sp = drawSboard("cockroach")[cockroach.matrix[i][e].mark];
			  sp.scaleX = sp.scaleY = 0.28;
			  sp.x = e * 7.3;
			  sp.y = i * 7.2;
			  _target.cockroachroad_container.addChild(sp);

			  if((i) == cockroach.row) {
				  if(cockroach.matrix[0][e+1] == undefined) {
					  sp.last_child = true;
					  sp.mark = cockroach.matrix[i][e].mark;
				  }
			  }
		  } //end for
	  } //end for

	  _target.cockroachroad_container.children.forEach((e) => {
			if(e.last_child) {
			  createjs.Tween.get(e).wait(100)
			  .to({ alpha : 1 },150)
			  .to({ alpha : 0 },150)
			  .to({ alpha : 1 },150)
			  .to({ alpha : 0 },150)
			  .to({ alpha : 1 },150)
			}
		});
	  	
	}
}

export default {
	dragonTiger
}