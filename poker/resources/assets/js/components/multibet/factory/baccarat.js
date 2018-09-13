
import {  createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap } from '../../../factories/factories';

import sboard from '../../../factories/scoreboard_draw';
import format from '../../../factories/formatter';

let baccarat = {
	droppedState (area) {
	},
	normalState (area) {
	},
	winState (area) {

	},
	createGame(_target,self) {
		// baccarat.createGame(_target);

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

		console.log(_target.bet_range, "baccarat multibet range");

		let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
		if (window.mainMultiplier % 10) mainMultiplier = 1;
		//Main area range
		let mainAreaMin = (_target.bet_range.min * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
		let mainAreaMax = (_target.bet_range.max * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier) * mainMultiplier;

		//Side ranges
		let sideBet = [];
		for (var i = 0; i < _target.bet_range.side_bet.length; i++) {
			sideBet = _target.bet_range.side_bet[i];
			
			switch (sideBet.division) {
      	case ('Player Pair - Banker Pair'):
      		let pairMin = (sideBet.min * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
      		let pairMax = (sideBet.max * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
   				break;

   			case ('Tie'):
      		let tieMin = (sideBet.min * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
      		let tieMax = (sideBet.max * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
   				break;

   			case ('Super 6'):
      		let superMin = (sideBet.min * parseInt(window.currencyMultiplier))  * parseInt(window.userMultiplier);
      		let superMax = (sideBet.max * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
   				break;
     		}
			}

		  let bet_area_bg = new createjs.Shape();
		  bet_area_bg.graphics.beginFill("rgba(60, 60, 60, 0.78)").drawRect(0,0,418 + 60,self.g_height);
		  bet_area_bg.setBounds(0, 0, 418 + 60, self.g_height);

		  _target.betareas_container.addChild(bet_area_bg);

		  let adjustY = 32;

		  if(_target.data.slave && ( _.includes(_target.data.slave, 'bonus') ||  _.includes(_target.data.slave, 'supersix'))) {
		  	adjustY = 24;
		  }

		  _target.betarea[0] = new createjs.Shape();
		  _target.betarea[0].x = 20;
		  _target.betarea[0].y = 35 + adjustY;
		  _target.betarea[0].table = "playerpair";
		  _target.betarea[0].min_betAmt = pairMin; 
		  _target.betarea[0].max_betAmt = pairMax; 
		  _target.betarea[0].payout_multiplier = 11; 
		  _target.betarea[0].fillCmd = _target.betarea[0].graphics.beginFill("#1565c0").command; 
		  _target.betarea[0].graphics.drawRoundRect(0,0,70,114,2);
		  _target.betarea[0].fillCmd.style = "#1565c0"; 
		  _target.betarea[0].setBounds(0,0,70,114);

		  let player_pair_label = new createjs.Text(window.language.multibet_betareas.playerpair,"bold 16px lato","#fff");
		  player_pair_label.lineWidth = 20;
		  player_pair_label.x = player_pair_label.ox = 55;
		  player_pair_label.y = 35 + adjustY;
		  player_pair_label.is_text = true;
		  player_pair_label.textAlign = "center";
		  player_pair_label.targ = _target.betarea[0];
		  _target.cosmetics_container.addChild(player_pair_label)

		  _target.betarea[1] = new createjs.Shape();
		  _target.betarea[1].x = _target.betarea[0].x + 5 + _target.betarea[0].getBounds().width;
		  _target.betarea[1].y = 35+ adjustY;
		  _target.betarea[1].table = "player";
		  _target.betarea[1].min_betAmt = mainAreaMin;
		  _target.betarea[1].max_betAmt = mainAreaMax;
		  _target.betarea[1].payout_multiplier = 1;
		  _target.betarea[1].fillCmd = _target.betarea[1].graphics.beginFill("#1565c0").command; 
		  _target.betarea[1].graphics.drawRoundRect(0,0,80,114,2);
		  _target.betarea[1].setBounds(0,0,80,114);

		  let player_label = new createjs.Text(window.language.multibet_betareas.player,"bold 16px lato","#fff");
		  player_label.x = player_label.ox = _target.betarea[1].x + (_target.betarea[1].getBounds().width/2);
		  player_label.y = 35+ adjustY;
		  player_label.is_text = true;
		  player_label.textAlign = "center";
		  player_label.targ = _target.betarea[1];
		  // player_label.hitArea = _target.betarea[1];
		  _target.cosmetics_container.addChild(player_label)

		  _target.betarea[2] = new createjs.Shape();
		  _target.betarea[2].x = _target.betarea[1].x + 5 + _target.betarea[1].getBounds().width;
		  _target.betarea[2].y = 35 + adjustY;
		  _target.betarea[2].table = "tie";
		  _target.betarea[2].min_betAmt = tieMin;
		  _target.betarea[2].max_betAmt = tieMax;
		  _target.betarea[2].payout_multiplier = 8;
		  _target.betarea[2].fillCmd = _target.betarea[2].graphics.beginFill("#689f38").command;
		  _target.betarea[2].graphics.drawRoundRect(0,0,80,114,2);
		  _target.betarea[2].setBounds(0,0,80,114);

		  let tie_label = new createjs.Text(window.language.multibet_betareas.tie,"bold 16px lato","#fff");
		  tie_label.x = tie_label.ox = _target.betarea[2].x + ( _target.betarea[2].getBounds().width/2);
		  tie_label.y = 35 + adjustY;
		  tie_label.is_text = true;
		  tie_label.textAlign = "center";
		  tie_label.targ = _target.betarea[2];
		  // tie_label.hitArea = _target.betarea[2];
		  _target.cosmetics_container.addChild(tie_label)

		  _target.betarea[3] = new createjs.Shape();
		  _target.betarea[3].x = _target.betarea[2].x + 5 + _target.betarea[2].getBounds().width;
		  _target.betarea[3].y = 35 + adjustY;
		  _target.betarea[3].table = "banker";
		  _target.betarea[3].min_betAmt = mainAreaMin;
		  _target.betarea[3].max_betAmt = mainAreaMax;
		  _target.betarea[3].payout_multiplier = 0.95;
		  _target.betarea[3].fillCmd = _target.betarea[3].graphics.beginFill("#d32f2f").command;
		  _target.betarea[3].graphics.drawRoundRect(0,0,80,114,2);
		  _target.betarea[3].setBounds(0,0,80,114);

		  let banker_label = new createjs.Text(window.language.multibet_betareas.banker,"bold 16px lato","#fff");
		  banker_label.x = banker_label.ox = _target.betarea[3].x + (_target.betarea[3].getBounds().width/2);
		  banker_label.y = 35 + adjustY;
		  banker_label.is_text = true;
		  banker_label.textAlign = "center";
		  banker_label.targ = _target.betarea[3];
		  // banker_label.hitArea = _target.betarea[3];
		  _target.cosmetics_container.addChild(banker_label)

		  _target.betarea[4] = new createjs.Shape();
		  _target.betarea[4].x = _target.betarea[3].x + 5 + _target.betarea[3].getBounds().width;
		  _target.betarea[4].y = 35 + adjustY;
		  _target.betarea[4].table = "bankerpair";
		  _target.betarea[4].min_betAmt = pairMin;
		  _target.betarea[4].max_betAmt = pairMax;
		  _target.betarea[4].payout_multiplier = 11;
		  _target.betarea[4].fillCmd = _target.betarea[4].graphics.beginFill("#d32f2f").command;
		  _target.betarea[4].graphics.drawRoundRect(0,0,70,114,2);
		  _target.betarea[4].setBounds(0,0,70,114);

		  // *** super six
		  _target.betarea[5] = new createjs.Shape();
		  _target.betarea[5].x = _target.betarea[2].x;
		  _target.betarea[5].y = _target.betarea[2].y +(120/2);
		  _target.betarea[5].table = "supersix";
		  _target.betarea[5].min_betAmt = superMin;
		  _target.betarea[5].max_betAmt = superMax;
		  _target.betarea[5].payout_multiplier = 12;
		  _target.betarea[5].visible = false;
		  _target.betarea[5].graphics.ss(1.5).s("#9c7935").beginLinearGradientFill(["#dcc36d", "#efe083", "#dcc36d"], [0,0.5,1], 20,0,80,0,110,0).drawRoundRect(0,0,80,(114/2)-3,2);
		  _target.betarea[5].setBounds(0,0,80,(114/2)-2);

		  //** dragonbonus
		  _target.betarea[6] = new createjs.Shape();
		  _target.betarea[6].x = _target.betarea[0].x;
		  _target.betarea[6].y = _target.betarea[0].y;
		  _target.betarea[6].table = "bonus_player";
		  _target.betarea[6].min_betAmt = superMin;
		  _target.betarea[6].max_betAmt = superMax;
		  _target.betarea[6].payout_multiplier = 12;
		  _target.betarea[6].visible = false;
		  _target.betarea[6].graphics.ss(1.5).s("#9c7935").beginLinearGradientFill(["#dcc36d", "#efe083", "#dcc36d"], [0,0.5,1], 0,0,60,0,80,0).drawRoundRect(0,0,70,(114/2)-2 ,2);
		  _target.betarea[6].setBounds(0,0,70,(114/2)-2);

		  // ** player big
		  _target.betarea[7] = new createjs.Shape();
		  _target.betarea[7].x = _target.betarea[0].x;
		  _target.betarea[7].y = _target.betarea[0].y +(114/2) +2;
		  _target.betarea[7].table = "big";
		  _target.betarea[7].min_betAmt = superMin;
		  _target.betarea[7].max_betAmt = superMax;
		  _target.betarea[7].payout_multiplier = .54;
		  _target.betarea[7].visible = false;
		  _target.betarea[7].graphics.ss(1.5).s("#9c7935").beginLinearGradientFill(["#dcc36d", "#efe083", "#dcc36d"], [0,0.5,1], 0,0,60,0,80,0).drawRoundRect(0,0,70,(114/2)-2 ,2);
		  _target.betarea[7].setBounds(0,0,70,(114/2)-2);

		  //** dragonbonus
		  _target.betarea[8] = new createjs.Shape();
		  _target.betarea[8].x = _target.betarea[4].x + 74;
		  _target.betarea[8].y = _target.betarea[4].y;
		  _target.betarea[8].table = "bonus_banker";
		  _target.betarea[8].min_betAmt = superMin;
		  _target.betarea[8].max_betAmt = superMax;
		  _target.betarea[8].payout_multiplier = 12;
		  _target.betarea[8].visible = false;
		  _target.betarea[8].graphics.ss(1.5).s("#9c7935").beginLinearGradientFill(["#dcc36d", "#efe083", "#dcc36d"], [0,0.5,1], 0,0,60,0,80,0).drawRoundRect(0,0,70,(114/2)-2 ,2);
		  _target.betarea[8].setBounds(0,0,70,(114/2)-2);

		  // ** player big
		  _target.betarea[9] = new createjs.Shape();
		  _target.betarea[9].x = _target.betarea[4].x + 74;
		  _target.betarea[9].y = _target.betarea[4].y +(114/2) +2;
		  _target.betarea[9].table = "small";
		  _target.betarea[9].min_betAmt = superMin;
		  _target.betarea[9].max_betAmt = superMax;
		  _target.betarea[9].payout_multiplier = 1.5;
		  _target.betarea[9].visible = false;
		  _target.betarea[9].graphics.ss(1.5).s("#9c7935").beginLinearGradientFill(["#dcc36d", "#efe083", "#dcc36d"], [0,0.5,1], 0,0,60,0,80,0).drawRoundRect(0,0,70,(114/2)-2 ,2);
		  _target.betarea[9].setBounds(0,0,70,(114/2)-2);

		  _target.betarea.forEach((e) => {
		  	e.ox = e.x;
		  	e.o_payout_multiplier = e.payout_multiplier;
		  });

		  let supersixAsset = new createjs.Bitmap(self.context.getResources("super6_multibet"));
		  _target.cosmetics_container.addChild(supersixAsset)
		  supersixAsset.x = supersixAsset.ox = _target.betarea[5].x + (_target.betarea[5].getBounds().width/2);
		  supersixAsset.y = _target.betarea[5].y + 2;
		  supersixAsset.regX = supersixAsset.getBounds().width/2
		  supersixAsset.hitArea = _target.betarea[5];
		  supersixAsset.supersixSlave = true;
		  supersixAsset.visible = false;
		  supersixAsset.targ = _target.betarea[5];

		  let banker_pair_label = new createjs.Text(window.language.multibet_betareas.bankerpair,"bold 16px lato","#fff");
		  banker_pair_label.lineWidth = 20;
		  banker_pair_label.ox = banker_pair_label.x = _target.betarea[4].x + (70/2);
		  banker_pair_label.y = 35 + adjustY;
		  banker_pair_label.is_text = true;
		  banker_pair_label.textAlign = "center";
		  banker_pair_label.targ = _target.betarea[4]
		  _target.cosmetics_container.addChild(banker_pair_label)

		  let player_bonus_asset = new createjs.Bitmap("/img/multibet/bonus_b.png");
		  player_bonus_asset.ox = player_bonus_asset.x = _target.betarea[6].x + (5);
		  player_bonus_asset.y = 35 + adjustY;
		  player_bonus_asset.textAlign = "center";
		  player_bonus_asset.bonusSlave = true;
		  // player_bonus_asset.scaleX = 0.5;
		  // player_bonus_asset.scaleY = 0.5;
		  player_bonus_asset.visible = false
		  player_bonus_asset.targ = _target.betarea[6];
		  _target.cosmetics_container.addChild(player_bonus_asset)

		  let banker_bonus_asset = new createjs.Bitmap("/img/multibet/bonus_b.png");
		  banker_bonus_asset.ox = banker_bonus_asset.x = _target.betarea[8].x + (5);
		  banker_bonus_asset.y = 35 + adjustY;
		  banker_bonus_asset.textAlign = "center";
		  banker_bonus_asset.bonusSlave = true;
		  // banker_bonus_asset.scaleX = 0.5;
		  // banker_bonus_asset.scaleY = 0.5;
		  banker_bonus_asset.visible = false
		  banker_bonus_asset.move = true
		  banker_bonus_asset.targ = _target.betarea[8];
		  _target.cosmetics_container.addChild(banker_bonus_asset)

		  let big_label = new createjs.Text(window.language.multibet_betareas.big,"16px lato","#000");
		  big_label.lineWidth = 20;
		  big_label.ox = big_label.x = _target.betarea[7].x + (70/2);
		  big_label.y = _target.betarea[7].y + 2;
		  big_label.is_text = true;
		  big_label.textAlign = "center";
		  big_label.bonusSlave = true;
		  big_label.visible = false
		  big_label.targ = _target.betarea[7];
		  _target.cosmetics_container.addChild(big_label)

		  let small_label = new createjs.Text(window.language.multibet_betareas.small,"16px lato","#000");
		  small_label.lineWidth = 20;
		  small_label.ox = small_label.x = _target.betarea[9].x + (70/2);
		  small_label.y = _target.betarea[9].y + 2;
		  small_label.is_text = true;
		  small_label.textAlign = "center";
		  small_label.bonusSlave = true;
		  small_label.move = true;
		  small_label.visible = false
		  small_label.targ = _target.betarea[9];
		  _target.cosmetics_container.addChild(small_label)


		  let player_circle = new createjs.Shape();
		  player_circle.graphics.beginFill("#1565c0").drawCircle(54, 160, 20);
		  let banker_circle = new createjs.Shape();
		  banker_circle.graphics.beginFill("#d32f2f").drawCircle(144, 160, 20);
		  _target.result_container.addChild(player_circle, banker_circle);

		  _target.card_result_container = new createjs.Container();
		  _target.card_result_container.set({y : 12})
		  _target.result_container.addChild(_target.card_result_container)


		  _target.player_card = [];
		  _target.banker_card = [];
		  for(var i = 0; i < 3; i++) {
			  _target.player_card[i] = createCardSprite(self,40.7,54.5,"multi-bet-cards");
			  _target.player_card[i].regX = _target.player_card[i].getTransformedBounds().width/2;
			  _target.player_card[i].visible = false;
			  _target.player_card[i].shadow = new createjs.Shadow("#2b2b2b",-2,2,2);
			  _target.card_result_container.addChild(_target.player_card[i]);

			  if(i === 1) {
			  	_target.player_card[i].shadow = new createjs.Shadow("#2b2b2b",2,2,2);
			  }

			  _target.banker_card[i] = createCardSprite(self,40.7,54.5,"multi-bet-cards");
			  _target.banker_card[i].visible = false;
			  // _target.banker_card[i].scaleX = _target.banker_card[i].scaleY = .55
			  _target.banker_card[i].regX = _target.banker_card[i].getTransformedBounds().width/2;
			  _target.banker_card[i].shadow = new createjs.Shadow("#2b2b2b",-2,2,2);
			  _target.card_result_container.addChild(_target.banker_card[i]);
			  
			  if(i === 2) {
				  _target.banker_card[i].shadow = new createjs.Shadow("#2b2b2b",-2,-2,2);
				  _target.player_card[i].shadow = new createjs.Shadow("#2b2b2b",-2,-2,2);

			  }
		  }

		  let cardAdjustX = 8;
		  _target.player_card[0].x = 50 + 10 + cardAdjustX;//20 + 10;
		  _target.player_card[0].y = 38;

		  _target.player_card[1].x = 20 + 10 + cardAdjustX;//50 + 10;
		  _target.player_card[1].y = 38;


		  _target.banker_card[0].x = 110 + 10 + cardAdjustX;
		  _target.banker_card[0].y = 38;

		  _target.banker_card[1].x = 140 + 10 + cardAdjustX;
		  _target.banker_card[1].y = 38;

		  // == third card
		  _target.player_card[2].x = 79;
		  _target.player_card[2].y = 98;
		  _target.player_card[2].rotation = 90;

		  _target.banker_card[2].x = 172;
		  _target.banker_card[2].y = 98;
		  _target.banker_card[2].rotation = 90;

		  _target.banker_val = new createjs.Text("0","25px BebasNeue","#fff");
		  _target.banker_val.x = 144
		  _target.banker_val.y = 145 + 3
		  _target.banker_val.textAlign = "center"
		  _target.banker_val.textBaseline = "middle"
		  _target.card_result_container.addChild(_target.banker_val);

		  _target.player_val = new createjs.Text("0","25px BebasNeue","#fff");
		  _target.player_val.x = 54
		  _target.player_val.y = 145 + 3
		  _target.player_val.textAlign = "center"
		  _target.player_val.textBaseline = "middle"
		  _target.card_result_container.addChild(_target.player_val);

		  _target.total_game_bet = new createjs.Text("0","30px BebasNeue","#fff");
		  _target.total_game_bet.textAlign = "center";
		  _target.total_game_bet.x = bet_area_bg.x + bet_area_bg.getBounds().width/2;
		  _target.betareas_container.addChild(_target.total_game_bet);

		  // === eye
		  let eye_bg = new createjs.Shape();
		  eye_bg.graphics.beginFill("rgba(255, 255, 255, 0.4)").drawRect(0,0,980,self.g_height);
		  eye_bg.setBounds(0,0,800,self.g_height);

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

		  // =end of roadmap

		  let showcount_bg = new createjs.Shape();
		  showcount_bg.graphics.ss(1).s("rgba(255,255,255,0.3)").beginFill("#393939").drawRect(1,0,58,48);
		  showcount_bg.x = 765;
		  showcount_bg.y = 142;
			// showcount_bg.visible = false;
		  _target.eye_view_container.addChild(showcount_bg);

		  _target.shoe_counter = new createjs.Text("0","35px BebasNeue",'#fff');
		  _target.shoe_counter.x = showcount_bg.x + 58/2;
		  _target.shoe_counter.y = showcount_bg.y + 6;
		  _target.shoe_counter.textAlign = "center";
			// _target.shoe_counter.visible = false;
		  _target.eye_view_container.addChild(_target.shoe_counter);

		  // === count
		  let tiecount_bg = new createjs.Shape();
		  tiecount_bg.graphics.beginFill("#567f2e").drawRoundRect(0,0,56,34,8);
		  tiecount_bg.x = 800 + 74;
		  tiecount_bg.y = 12;
			// tiecount_bg.visible = false;
		  _target.eye_view_container.addChild(tiecount_bg);

		  for(var i = 0; i < 3; i++) {
			  let playercountbg = new createjs.Shape();
			  playercountbg.graphics.beginFill("#0c3e66").drawRoundRect(0,0,54,34,8);
			  playercountbg.y = (i* 39.5) + 52;
			  playercountbg.x = 844;
				// playercountbg.visible = false;
			  _target.eye_view_container.addChild(playercountbg);

			  let dealercountbg = new createjs.Shape();
			  dealercountbg.graphics.beginFill("#7f1d1d").drawRoundRect(0,0,54,34,8);
			  dealercountbg.y = (i* 39.5) + 52;
			  dealercountbg.x = 844 + 61.5;
				// dealercountbg.visible = false;
			  _target.eye_view_container.addChild(dealercountbg);
		  }

		  //cosmetics
		  let tie_indi = createSpriteRoadMap(self.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, tie_indi);
		  tie_indi.x = tiecount_bg.x+ 4
		  tie_indi.y = tiecount_bg.y + 5
		  tie_indi.scaleX = tie_indi.scaleY= 0.6;
		  tie_indi.gotoAndStop(8);
			// tie_indi.visible = false;
		  _target.eye_view_container.addChild(tie_indi)

		  let player_indi = createSpriteRoadMap(self.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, tie_indi);
		  player_indi.x = tiecount_bg.x - 26
		  player_indi.y = tiecount_bg.y + 44.5
		  player_indi.scaleX = player_indi.scaleY= 0.6;
		  player_indi.gotoAndStop(0);
			// player_indi.visible = false;
		  _target.eye_view_container.addChild(player_indi)

		  let banker_indi = createSpriteRoadMap(self.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, tie_indi);
		  banker_indi.x = player_indi.x + 60
		  banker_indi.y = player_indi.y + .5
		  banker_indi.scaleX = banker_indi.scaleY= 0.6;
		  banker_indi.gotoAndStop(4);
			// banker_indi.visible = false;
		  _target.eye_view_container.addChild(banker_indi)

		  let playerpair_indi = createSpriteRoadMap(self.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, tie_indi);
		  playerpair_indi.x = player_indi.x
		  playerpair_indi.y = player_indi.y  + 40 - .5
		  playerpair_indi.scaleX = playerpair_indi.scaleY= 0.6;
		  playerpair_indi.gotoAndStop(1);
			// playerpair_indi.visible = false;
		  _target.eye_view_container.addChild(playerpair_indi)

		  let bankerpair_indi = createSpriteRoadMap(self.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, tie_indi);
		  bankerpair_indi.x = player_indi.x+ 60
		  bankerpair_indi.y = player_indi.y  + 40 - .5
		  bankerpair_indi.scaleX = bankerpair_indi.scaleY= 0.6;
		  bankerpair_indi.gotoAndStop(6);
			// bankerpair_indi.visible = false;
		  _target.eye_view_container.addChild(bankerpair_indi)

		  let playernatural_indi = createSpriteRoadMap(self.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, tie_indi);
		  playernatural_indi.x = playerpair_indi.x
		  playernatural_indi.y = playerpair_indi.y  + 40 - .5
		  playernatural_indi.scaleX = playernatural_indi.scaleY= 0.6;
		  playernatural_indi.gotoAndStop(12);
			// playernatural_indi.visible = false;
		  _target.eye_view_container.addChild(playernatural_indi)

		  let bankernatural_indi = createSpriteRoadMap(self.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, tie_indi);
		  bankernatural_indi.x = bankerpair_indi.x
		  bankernatural_indi.y = bankerpair_indi.y  + 40 - .5
		  bankernatural_indi.scaleX = bankernatural_indi.scaleY= 0.6;
		  bankernatural_indi.gotoAndStop(13);
			// bankernatural_indi.visible = false;
		  _target.eye_view_container.addChild(bankernatural_indi);

		  let p_natural_text = new createjs.Text("N","12px lato", "#fff");
		  p_natural_text.x = playernatural_indi.x + 12;
		  p_natural_text.y = playernatural_indi.y + 12;
		  p_natural_text.textAlign = "center";
		  p_natural_text.textBaseline = "middle";
			// p_natural_text.visible = false;
		  _target.eye_view_container.addChild(p_natural_text);


		  let b_natural_text = new createjs.Text("N","12px lato", "#fff");
		  b_natural_text.x = bankernatural_indi.x + 12;
		  b_natural_text.y = bankernatural_indi.y + 12;
		  b_natural_text.textAlign = "center";
		  b_natural_text.textBaseline = "middle";
			// b_natural_text.visible = false;
		  _target.eye_view_container.addChild(b_natural_text);


		  _target.tie_total_text = new createjs.Text("0","24px BebasNeue","#fff");
		  _target.tie_total_text.x = tiecount_bg.x + 42;
		  _target.tie_total_text.y = tiecount_bg.y + 3;
		  _target.tie_total_text.textAlign = "right"
			// _target.tie_total_text.visible = false;
		  _target.eye_view_container.addChild(_target.tie_total_text);

		  _target.player_total_text = new createjs.Text("0","24px BebasNeue","#fff");
		  _target.player_total_text.x = _target.tie_total_text.x - 22;
		  _target.player_total_text.y = _target.tie_total_text.y + 40;
		  _target.player_total_text.textAlign = "right";
			// _target.player_total_text.visible = false;
		  _target.eye_view_container.addChild(_target.player_total_text);

		  _target.playerpair_total_text  = new createjs.Text("0","24px BebasNeue","#fff");
		  _target.playerpair_total_text.x = _target.player_total_text.x;
		  _target.playerpair_total_text.y = _target.player_total_text.y + 40;
		  _target.playerpair_total_text.textAlign = "right";
			// _target.playerpair_total_text.visible = false;
		  _target.eye_view_container.addChild(_target.playerpair_total_text);

		  _target.playernatural_total_text = new createjs.Text("0","24px BebasNeue","#fff");
		  _target.playernatural_total_text.x = _target.playerpair_total_text.x;
		  _target.playernatural_total_text.y = _target.playerpair_total_text.y + 40;
		  _target.playernatural_total_text.textAlign = "right";
			// _target.playernatural_total_text.visible = false;
		  _target.eye_view_container.addChild(_target.playernatural_total_text);

		  // ===  banker total texts
		  _target.banker_total_text  = new createjs.Text("0","24px BebasNeue","#fff");
		  _target.banker_total_text.x = _target.player_total_text.x + 60;
		  _target.banker_total_text.y = _target.player_total_text.y ;
		  _target.banker_total_text.textAlign = "right";
			// _target.banker_total_text.visible = false;
		  _target.eye_view_container.addChild(_target.banker_total_text);

		  _target.bankerpair_total_text = new createjs.Text("0","24px BebasNeue","#fff");
		  _target.bankerpair_total_text.x = _target.playerpair_total_text.x + 60;
		  _target.bankerpair_total_text.y = _target.playerpair_total_text.y ;
		  _target.bankerpair_total_text.textAlign = "right";
			// _target.bankerpair_total_text.visible = false;
		  _target.eye_view_container.addChild(_target.bankerpair_total_text);

		  _target.bankernautral_total_text = new createjs.Text("0","24px BebasNeue","#fff");
		  _target.bankernautral_total_text.x = _target.playernatural_total_text.x + 60;
		  _target.bankernautral_total_text.y = _target.playernatural_total_text.y ;
		  _target.bankernautral_total_text.textAlign = "right";
			// _target.bankernautral_total_text.visible = false;
		  _target.eye_view_container.addChild(_target.bankernautral_total_text);

		  // == road map containers
		  _target.pearlroad_container = new createjs.Container();
		  _target.pearlroad_container.y = -2
		  _target.eye_view_container.addChild(_target.pearlroad_container);

		  _target.bigroad_container = new createjs.Container();
		  _target.bigroad_container.x = 350;
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
		  prediction_bg2.baccaratbtn = true;
		  prediction_bg2.target = _target;
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
		  let p_text = new createjs.Text("P","14px lato", "#fff");
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

		  let b_text = new createjs.Text("B","14px lato", "#fff");
		  b_text.x = banker_prediction.x
		  b_text.y = banker_prediction.y + 5
		  b_text.textAlign = "center"
		  b_text.textBaseline = "center"
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
			  self.predictRoadMap(e.currentTarget.target, "p");
		  });

		  prediction_bg2.on("click",(e) => {
			  self.predictRoadMap(e.currentTarget.target, "b");
		  });
	},
	updateScoreboard(data, _target) {
		data =  _.filter(data, function (e) {
			return e;
		});

		let count = _.groupBy(data, function (e) {
			return e.mark;
		});

		let player_count = 0;
		let banker_count = 0;
		let tie_count = 0;

		let player_pair_cnt = 0;
		let banker_pair_cnt = 0;

		let banker_natural_cnt = 0;
		let player_natural_cnt = 0;
		let natural = {
			player: 0,
			banker: 0
		};

		data.forEach(function (e) {
			if(e.mark == "b" || e.mark == "q" || e.mark == "w"|| e.mark == "e") {
				banker_count ++
			} else if(e.mark  == "p" || e.mark  == "f" || e.mark  == "g" || e.mark  == "h" ) {
				player_count ++
			}
			 else if(e.mark  == "t" || e.mark  == "i" || e.mark  == "j" || e.mark  == "k" ) {
				tie_count ++
			}

			if(e.mark == "q" || e.mark == "w" || e.mark == "f" || e.mark == "g" || e.mark == "i" || e.mark == "j") {
				banker_pair_cnt ++;
			}

			if(e.mark == "w" || e.mark == "e" || e.mark == "g" || e.mark == "h"  || e.mark == "j" || e.mark == "k") {
				player_pair_cnt ++;
			}

			_.forEach(e.natural, (element) => {
			   	natural[element]++;
			})
		});

	  _target.tie_total_text.text= tie_count;
	  _target.player_total_text.text = player_count;
	  _target.playerpair_total_text.text= player_pair_cnt;
	  _target.playernatural_total_text.text= natural.player;
	  // ===  banker total texts
	  _target.banker_total_text.text = banker_count;
	  _target.bankerpair_total_text.text= banker_pair_cnt;
	  _target.bankernautral_total_text.text= natural.banker;

	  _target.shoe_counter.text = data.length;
	  _target.shoe_cnt_text.text = data.length;

	  //Stat count
	  let totalPlayer = parseInt(player_count) + parseInt(player_pair_cnt) + parseInt(player_natural_cnt);
	  let totalBanker = parseInt(banker_count) + parseInt(banker_pair_cnt) + parseInt(banker_natural_cnt);
	  let totalBankerPlayer = totalPlayer + totalBanker;

	  if (totalBankerPlayer) {
		  // Set vertical data
		  _target.player_win_stat.scaleY = totalPlayer/totalBankerPlayer;
		  _target.player_lose_stat.scaleY = totalBanker/totalBankerPlayer;

		  // Set horizontal data
		  _target.eye_player_win.scaleX = totalPlayer/totalBankerPlayer;
		  _target.eye_player_lose.scaleX = totalBanker/totalBankerPlayer;
	  }
	},
	swipeCards (data, total, _target) {
		
		((total, _target) => {
			setTimeout(() => {
				_target.banker_val.text = total.banker;
				_target.player_val.text = total.player;
			}, 2000);
		})(total, _target);
		
		function animCards(card, card_data, total, _target) {
			
			if(!card.visible) {
				
				card.gotoAndStop(0);
				
				createjs.Tween.get(card)
				.to({
					scaleX : 1
				})
				.wait(2000)
				.to({
					scaleX : 0
				}, 200)
				.call((obj, card_data) => {
					obj.gotoAndStop(card_data)
				}, [card, card_data])
				.to({
					scaleX : 1
				}, 200)

				card.visible = true;
			}			
		}

		if(data.gameInfo.banker1) {
			// _target.banker_val.text = total.banker;
			animCards(_target.banker_card[0], "C"+ data.gameInfo.banker1, total, _target);
		}
		if(data.gameInfo.banker2) {

			// _target.banker_val.text = total.banker;
			animCards(_target.banker_card[1], "C"+ data.gameInfo.banker2, total, _target);
		}

		if(data.gameInfo.banker3) {

			// _target.banker_val.text = total.banker;
			animCards(_target.banker_card[2], "C"+ data.gameInfo.banker3, total, _target);
		}
		if(data.gameInfo.player1) {

			// _target.player_val.text = total.player;
			animCards(_target.player_card[0], "C"+ data.gameInfo.player1, total, _target);
		}
		if(data.gameInfo.player2) {
			// _target.player_val.text = total.player;
			animCards(_target.player_card[1], "C"+ data.gameInfo.player2, total, _target);
		}
		if(data.gameInfo.player3) {
			// _target.player_val.text = total.player;
			animCards(_target.player_card[2], "C"+ data.gameInfo.player3, total, _target);
		}
	},
	drawRoadMap(pearl, bigroad, bigeye, smallroad, cockroach, _target, self) {
		// === pearl road
		  _target.pearlroad_container.removeAllChildren();
		  for(var i = 0; i < pearl.matrix.length; i++) {
			  for(var e = 0; e < pearl.matrix[i].length; e++) {
				  if(pearl.matrix[i][e] === undefined) continue;
				  let sp = createSpriteRoadMap(self.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, sp);
				  sp.x = (e * 29) + 0.5;
				  sp.y = i * 32;
				  sp.scaleX = sp.scaleY = .8;

				  if((i+1) == pearl.row) {
					  if(pearl.matrix[0][e + 1] == undefined) {
						  sp.last_child = true;
					  }
				  }

				  sp.gotoAndStop("pearl-"+pearl.matrix[i][e].mark);
				  _target.pearlroad_container.addChild(sp);

			  }
		  }

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

		  // === big road
		  _target.bigroad_container.removeAllChildren();
		  for(var i = 0; i < bigroad.matrix.length; i++) {
			  for(var e = 0; e < bigroad.matrix[i].length; e++) {
				  if(bigroad.matrix[i][e] === undefined) continue;
				  let sp = createSpriteRoadMap(self.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40);
				  sp.scaleX = sp.scaleY = .4
				  sp.x = (e * (sp.getTransformedBounds().width)) - 1;
				  sp.y = i * (sp.getTransformedBounds().height);

				  _target.bigroad_container.addChild(sp);
				  if(bigroad.matrix[i][e].ties) {
					  if(bigroad.matrix[i][e].ties > 1) {
						  let tie_text = new createjs.Text(bigroad.matrix[i][e].ties, "bold 16px BebasNeue","#000");
						  tie_text.y = sp.y + (sp.getTransformedBounds().height/2) + 1;
						  tie_text.x = sp.x  + (sp.getTransformedBounds().width/2) - 0.5;
						  tie_text.textAlign = "center";
						  tie_text.textBaseline = "middle";
						  _target.bigroad_container.addChild(tie_text);
					  }

					  sp.gotoAndStop("big-"+bigroad.matrix[i][e].mark+"-t");
				  } else {
					  sp.gotoAndStop("big-"+bigroad.matrix[i][e].mark);
				  }

				  if((i) == bigroad.row) {
					  if(bigroad.matrix[0][e+1] == undefined) {
						  sp.last_child = true;
					  }
				  }

			  }
		  }

		  _target.bigroad_container.children.forEach((e) => {
			  if(e.last_child) {
				  createjs.Tween.get(e).wait(100)
				  .to({ alpha : 1 },150)
				  .to({ alpha : 0 },150)
				  .to({ alpha : 1 },150)
				  .to({ alpha : 0 },150)
				  .to({ alpha : 1 },150)
			  }
		  })

		  // === bigeyeboy
		  _target.bigeyeboy_container.removeAllChildren();
		  for(var i = 0; i < bigeye.matrix.length; i++) {
			  for(var e = 0; e < bigeye.matrix[i].length; e++) {
				  if(bigeye.matrix[i][e] === undefined) continue;
				  let sp = createSpriteRoadMap(self.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, sp);
				  sp.scaleX = sp.scaleY = 0.2
				  // sp.y = i * 8;
				  // sp.x = e * 8;
				  sp.x = (e * (sp.getTransformedBounds().width)) - 1;
				  sp.y = i * (sp.getTransformedBounds().height);

				  if((i) == bigeye.row) {
					  if(bigeye.matrix[0][e+1] == undefined) {
						  sp.last_child = true;
						  sp.mark = bigeye.matrix[i][e].mark
					  }
				  }

				  sp.gotoAndStop("bigeye-"+bigeye.matrix[i][e].mark);

				  _target.bigeyeboy_container.addChild(sp);
			  }
		  }

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
				  let sp = createSpriteRoadMap(self.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, sp);
				  sp.scaleX = sp.scaleY = 0.2
				  // sp.y = i * 8;
				  // sp.x = (e * 8) + 1;
				  sp.x = (e * (sp.getTransformedBounds().width)) + 0.6;
				  sp.y = i * (sp.getTransformedBounds().height - 0.4);

				  sp.gotoAndStop("bigsmall-"+smallroad.matrix[i][e].mark);

				  if((i) == smallroad.row) {
					  if(smallroad.matrix[0][e+1] == undefined) {
						  sp.last_child = true;
						  sp.mark = smallroad.matrix[i][e].mark;
					  }
				  }

				  _target.smallroad_container.addChild(sp);
			  }
		  }
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

		  // === cockroach road
		  _target.cockroachroad_container.removeAllChildren();
		  for(var i = 0; i < cockroach.matrix.length; i++) {
			  for(var e = 0; e < cockroach.matrix[i].length; e++) {
				  if(cockroach.matrix[i][e] === undefined) continue;
				  let sp = createSpriteRoadMap(self.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, sp);
				  sp.scaleX = sp.scaleY = 0.19
				  // sp.y = i * 7.2;
				  // sp.x = e * 7.5 + 1;
				  sp.x = (e * (sp.getTransformedBounds().width + 0.2));
				  sp.y = i * (sp.getTransformedBounds().height - 0.4);

				  sp.gotoAndStop("roach-"+cockroach.matrix[i][e].mark);

				  if((i) == cockroach.row) {
					  if(cockroach.matrix[0][e+1] == undefined) {
						  sp.last_child = true;
						  sp.mark = cockroach.matrix[i][e].mark;
					  }
				  }

				  _target.cockroachroad_container.addChild(sp);
			  }
		  } // end for

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
	baccarat
}