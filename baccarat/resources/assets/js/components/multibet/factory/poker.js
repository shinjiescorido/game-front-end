
import {  createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap } from '../../../factories/factories';

import sboard from '../../../factories/scoreboard_draw';
import format from '../../../factories/formatter';

let poker = {
	createGame(_target,self) {

		  let bet_area_bg = new createjs.Shape();
		  bet_area_bg.graphics.beginFill("rgba(60, 60, 60, 0.78)").drawRect(0,0,390,self.g_height);
		  bet_area_bg.setBounds(0,0,390,self.g_height);
		  _target.betareas_container.addChild(bet_area_bg);

		  let ante_area_1 = new createjs.Shape();
		  ante_area_1.graphics.ss(3).beginStroke("#fff").beginFill("#2e7c7f").drawRoundRect(0,0,100,100,12);
		  ante_area_1.setBounds(0,0,115,115,12);
		  ante_area_1.is_child = true;
		  ante_area_1.rotation = 45;
		  ante_area_1.table = "ante"
		  ante_area_1.x = 50;

		  let ante_area_2 = new createjs.Shape();
		  ante_area_2.graphics.ss(3).beginStroke("#fff").beginFill("#00838f").drawRoundRect(0,0,80,80,8);
		  ante_area_2.setBounds(0,0,90,90,12);
		  ante_area_2.is_child = true;
		  ante_area_2.rotation = 45;
		  ante_area_2.y = 13;
		  ante_area_2.table = "ante"
		  ante_area_2.x = 50;

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

			let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
			if (window.mainMultiplier % 10) mainMultiplier = 1;

			let mainAreaMin = (_target.bet_range.min * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
			let mainAreaMax = (_target.bet_range.max * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier) * mainMultiplier;
			
			let bonusMin =  (_target.bet_range.side_bet[0].min * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
			let bonusMax = (_target.bet_range.side_bet[0].max * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);

			let bonusplusMin =  (_target.bet_range.side_bet[0].min * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
			let bonusplusMax = (_target.bet_range.side_bet[0].max * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);

			let sideBet = [];
			for (var i = 0; i < _target.bet_range.side_bet.length; i++) {
				sideBet = _target.bet_range.side_bet[i];

				switch (sideBet.division) {
	      	case ('BonusBet'):
	      		bonusMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
	      		bonusMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
	   				break;

					case ('BonusplusBet'):
						bonusplusMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
						bonusplusMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
						break;
	       	}
			}

		  _target.betarea[0] = new createjs.Container();
		  _target.betarea[0].scaleX = _target.betarea[0].scaleY = 0.6;
		  _target.betarea[0].set({x : 26, ox : 26, y: 80});
		  _target.betarea[0].type = "ante"
		  _target.betarea[0].table = "ante"
		  _target.betarea[0].chips = [];
		  _target.betarea[0].min_betAmt = mainAreaMin;
		  _target.betarea[0].max_betAmt = mainAreaMax;
		  _target.betarea[0].addChild(ante_area_1,ante_area_2);
		  _target.betarea[0].setBounds(0,0,60,100);

		  let ante_label = new createjs.Text(window.language.multibet_betareas.ante,"18px lato","#fff");
		  ante_label.y = _target.betarea[0].y + 30;
		  ante_label.textAlign = "center"
		  ante_label.x = ante_label.ox = _target.betarea[0].x + 30;
		  ante_label.hitArea = _target.betarea[0]
		  _target.cosmetics_container.addChild(ante_label);

		  let flop_area_1 = new createjs.Shape();
		  flop_area_1.graphics.ss(3).beginStroke("#fff").beginFill("#426140").drawRoundRect(0,0,100,100,12);
		  flop_area_1.setBounds(0,0,115,115,12);
		  flop_area_1.is_child = true;
		  flop_area_1.rotation = 45;
		  flop_area_1.table = "flop";
		  flop_area_1.x = 50;

		  let flop_area_2 = new createjs.Shape();
		  flop_area_2.graphics.ss(3).beginStroke("#fff").beginFill("#558b2f").drawRoundRect(0,0,80,80,8);
		  flop_area_2.setBounds(0,0,90,90,12);
		  flop_area_2.is_child = true;
		  flop_area_2.rotation = 45;
		  flop_area_2.table = "flop";
		  flop_area_2.y = 14;
		  flop_area_2.x = 50;

		  _target.flop_area = new createjs.Container();
		  _target.flop_area.scaleX = _target.flop_area.scaleY = 0.6;
		  _target.flop_area.set({x : 160, ox : 160, y : 80}); //190;
		  _target.flop_area.chips = []
		  _target.flop_area.type = "flop"
		  _target.flop_area.table = "flop"
		  _target.flop_area.total_bet_amt = 0;
		  _target.flop_area.addChild(flop_area_1,flop_area_2);
		  _target.flop_area.setBounds(0,0,60,100);

		  let flop_label = new createjs.Text(window.language.multibet_betareas.flop,"18px lato","#fff");
		  flop_label.y = _target.flop_area.y + 30;
		  flop_label.textAlign = "center"
		  flop_label.x = flop_label.ox = _target.flop_area.x + 30;
		  flop_label.hitArea = _target.betarea[1]
		  _target.cosmetics_container.addChild(flop_label);

		  _target.turn_area = new createjs.Container();
		  _target.turn_area.scaleX = _target.turn_area.scaleY = 0.6;
		  _target.turn_area.set({x: 210, ox : 210, y: 30}); //290;
		  _target.turn_area.type = "turn"
		  _target.turn_area.total_bet_amt = 0;
		  _target.turn_area.table = "turn"
		  _target.turn_area.chips = []
		  _target.turn_area.addChild(_.clone(flop_area_1),_.clone(flop_area_2));
		  _target.turn_area.setBounds(0,0,60,100);

		  let turn_label = new createjs.Text(window.language.multibet_betareas.turn,"18px lato","#fff");
		  turn_label.y = _target.turn_area.y + 30;
		  turn_label.textAlign = "center";
		  turn_label.x = turn_label.ox = _target.turn_area.x + 30;
		  turn_label.hitArea = _target.betarea[2]
		  _target.cosmetics_container.addChild(turn_label);

		  _target.river_area = new createjs.Container();
		  _target.river_area.scaleX = _target.river_area.scaleY = 0.6;
		  _target.river_area.set({x: 260, ox: 260, y: 80}); //390;
		  _target.river_area.total_bet_amt = 0;
		  _target.river_area.chips = [];
		  _target.river_area.type = "river"
		  _target.river_area.table = "river"
		  _target.river_area.textAlign = "center"
		  _target.river_area.addChild(_.clone(flop_area_1),_.clone(flop_area_2));
		  _target.river_area.setBounds(0,0,60,100);

		  let river_label = new createjs.Text(window.language.multibet_betareas.river,"18px lato","#fff");
		  river_label.y = _target.river_area.y + 30;
		  river_label.x = river_label.ox = _target.river_area.x + 30;
		  river_label.hitArea = _target.betarea[3]
		  river_label.textAlign ="center"
		  _target.cosmetics_container.addChild(river_label);

		  let bonus_1 = new createjs.Shape();
		  bonus_1.graphics.beginFill("rgba(255,255,255,0.1)").drawCircle(0,0,60); //.ss(3).beginStroke("#eddd82")
		  bonus_1.setBounds(0,0,115,115,12);
		  bonus_1.is_child = true;
		  bonus_1.rotation = 45;
		  bonus_1.x = 58;
		  bonus_1.y = 22;
		  bonus_1.table = "bonus";

		  let bonus_img = new createjs.Bitmap(self.context.getResources("bonus_poker"));
		  bonus_img.table = "bonus";
		  bonus_img.hitArea = bonus_1;
		  bonus_img.is_child = true;
		  bonus_img.x = -4;
		  bonus_img.setBounds(0,0,90,90,12);
		  bonus_img.y = -40;

		  _target.betarea[1] = new createjs.Container();
		  _target.betarea[1].scaleX = _target.betarea[1].scaleY = 0.6;
		  _target.betarea[1].set({x : 86, ox : 86, y: 58});
		  _target.betarea[1].type = "bonus"
		  _target.betarea[1].table = "bonus"
		  _target.betarea[1].min_betAmt = bonusMin;
		  _target.betarea[1].max_betAmt = bonusMax;
		  _target.betarea[1].chips = []
		  _target.betarea[1].addChild(bonus_1,bonus_img);
		  _target.betarea[1].setBounds(0,0,65,20);

		  //bonus plus
		  
		  let bPLus_1 = new createjs.Shape();
		  bPLus_1.graphics.beginFill("rgba(255,255,255,0.1)").drawCircle(0,0,60); //.ss(3).beginStroke("#eddd82")
		  bPLus_1.setBounds(0,0,115,115,12);
		  bPLus_1.is_child = true;
		  bPLus_1.x = 65;
		  bPLus_1.y = 38;
		  bPLus_1.table = "bonusplus";

		  let bonusPlus_img = new createjs.Bitmap(self.context.getResources("bonusplus_multibet"));
		  bonusPlus_img.table = "bonusplus";
		  bonusPlus_img.is_child = true;
		  bonusPlus_img.hitArea = bPLus_1;
		  bonusPlus_img.x = -4;
		  bonusPlus_img.setBounds(0,0,90,90,12);
		  bonusPlus_img.y = -40;

		  _target.betarea[2] = new createjs.Container();
		  _target.betarea[2].set({x : 82, ox : 86, y: 50, scaleX: 0.6, scaleY: 0.6});
		  _target.betarea[2].type = "bonusplus"
		  _target.betarea[2].table = "bonusplus"
		  _target.betarea[2].min_betAmt = bonusplusMin;
		  _target.betarea[2].max_betAmt = bonusplusMax;
		  _target.betarea[2].chips = []
		  _target.betarea[2].visible = false;
		  _target.betarea[2].addChild(bPLus_1,bonusPlus_img);
		  _target.betarea[2].setBounds(0,0,75,60);

		  //poket
		  let pocket = new createjs.Shape();
		  pocket.graphics.beginFill("rgba(255,255,255,0.1)").drawRoundRect(0,0,100,100,12); //.ss(3).beginStroke("#eddd82")
		  pocket.setBounds(0,0,115,115,12);
		  pocket.is_child = true;
		  pocket.x = 78;
		  pocket.y = -26;
		  pocket.rotation = 45;
		  pocket.table = "pocket";

		  let pocket_img = new createjs.Bitmap(self.context.getResources("pocket_multibet"));
		  pocket_img.table = "pocket";
		  pocket_img.hitArea = pocket;
		  pocket_img.is_child = true;
		  pocket_img.x = -4;
		  pocket_img.setBounds(0,0,90,90,12);
		  pocket_img.y = -40;

		  _target.betarea[3] = new createjs.Container();
		  _target.betarea[3].set({x : 12, ox : 12, y: 94, scaleX: 0.6, scaleY: 0.6});
		  _target.betarea[3].type = "pocket"
		  _target.betarea[3].table = "pocket"
		  _target.betarea[3].chips = [];
		  _target.betarea[3].visible = false;
		  _target.betarea[3].min_betAmt = bonusMin;
		  _target.betarea[3].max_betAmt = bonusMax;
		  _target.betarea[3].addChild(pocket,pocket_img);
		  _target.betarea[3].setBounds(0,0,100, 60);

		  _target.card_result_container = new createjs.Container();
		  _target.card_result_container.set({y: 12})
		  _target.result_container.addChild(_target.card_result_container)

		  _target.community_card = [];

		  for(var i = 0; i < 5; i++) {
			  _target.community_card[i] = createCardSprite(self,40.7,54.5,"multi-bet-cards");
			  _target.community_card[i].x = (i *30) + 20 + 10 + 10;
			  _target.community_card[i].y = 30+ 5;
			  _target.community_card[i].visible = false;
			  _target.community_card[i].shadow = new createjs.Shadow("#2b2b2b",-2,2,2);
			  // _target.community_card[i].scaleY = _target.community_card[i].scaleX = .55
			  _target.community_card[i].regX = _target.community_card[i].getTransformedBounds().width/2;
			  _target.card_result_container.addChild(_target.community_card[i]);
		  }

		  _target.dealer_card = [];
		  _target.player_card = [];

		  for(var i = 0; i < 2; i++) {
			  _target.dealer_card[i]= createCardSprite(self,40.7,54.5,"multi-bet-cards");
			  // _target.dealer_card[i].scaleX = _target.dealer_card[i].scaleY = 0.55;
			  _target.dealer_card[i].x = (i*30) +20 + 10 + 10;
			  _target.dealer_card[i].y = 90 + 5;
			  _target.dealer_card[i].shadow = new createjs.Shadow("#2b2b2b",-2,2,2);
			  _target.dealer_card[i].regX = _target.dealer_card[i].getTransformedBounds().width/2;
			  _target.dealer_card[i].visible = false
			  _target.card_result_container.addChild(_target.dealer_card[i]);


			  _target.player_card[i] = createCardSprite(self,40.7,54.5,"multi-bet-cards");
			  // _target.player_card[i].scaleX = _target.player_card[i].scaleY = 0.55;
			  _target.player_card[i].x = (i*30) + 110 + 10 + 10;
			  _target.player_card[i].y = 90 + 5
			  _target.player_card[i].visible = false
			  _target.player_card[i].shadow = new createjs.Shadow("#2b2b2b",-2,2,2);
			  _target.player_card[i].regX = _target.player_card[i].getTransformedBounds().width/2;
			  _target.card_result_container.addChild(_target.player_card[i]);
		  }

		  _target.card_result_container.addChild(_target.dragon_card);

		  let table_dealer_label = new createjs.Text(window.language.multibet_poker.dealer,"18px lato","#fff");
		  table_dealer_label.y = 90 + 60 +12;
		  table_dealer_label.textAlign = "center"
		  table_dealer_label.x = 55

		  let table_player_label = new createjs.Text(window.language.multibet_poker.player,"18px lato","#fff");
		  table_player_label.y = 90 + 60 +12;
		  table_player_label.textAlign = "center"
		  table_player_label.x = 145
		  _target.result_container.addChild(table_player_label, table_dealer_label)

		  _target.total_game_bet = new createjs.Text("0","30px BebasNeue","#fff");
		  _target.total_game_bet.textAlign = "center";
		  _target.total_game_bet.x = bet_area_bg.x + bet_area_bg.getBounds().width/2;
		  _target.betareas_container.addChild(_target.total_game_bet);

		  // === ppoker game buttons
		  _target.poker_raise_button = new createjs.Container();//new createjs.Shape();
		  _target.poker_fold_button = new createjs.Container();//new createjs.Shape();

		  let red = ["#a22828","#cc282a","#a22828"]
		  let green = ["#279144","#37b14a","#279144"]

		  let raise_btn = new createjs.Shape();
		  raise_btn.graphics.beginLinearGradientFill(green,[0,0.5,1], -30,0,30,0,30,0).drawCircle(0,0,28);
		  _target.poker_raise_button.set({x: -203, y: 8, is_instance: true, visible: false});
		  _target.poker_raise_button.shadow = new createjs.Shadow("rgba(0,0,0,0.4)",0,2.5,4);
		  _target.poker_raise_button.addChild(raise_btn);
		  _target.game_buttons_container.addChild(_target.poker_raise_button);

		  let fold_btn = new createjs.Shape();
		  fold_btn.graphics.beginLinearGradientFill(red,[0,0.5,1], -30,0,30,0,30,0).drawCircle(0,0,22);
		  _target.poker_fold_button.set({x: -203, y: -55, is_instance: true, visible: false });
		  _target.poker_fold_button.shadow = new createjs.Shadow("rgba(0,0,0,0.4)",0,2.5,4);
		  _target.poker_fold_button.addChild(fold_btn);
		  _target.game_buttons_container.addChild(_target.poker_fold_button);

		  let raise_label = new createjs.Text("RAISE","16px lato", "#fff");
		  raise_label.set({x:0, y:0, textBaseline:"middle", textAlign : "center"}) ;
		  _target.poker_raise_button.addChild(raise_label);

		  let fold_label = new createjs.Text("FOLD","14px lato", "#fff");
		  fold_label.set({x:0, y:0, textBaseline:"middle", textAlign : "center"});
		  _target.poker_fold_button.addChild(fold_label);

			// === eye
		  let eye_bg = new createjs.Shape();
		  eye_bg.graphics.beginFill("rgba(255, 255, 255, 0.4)").drawRect(0,0,824,self.g_height);
		  eye_bg.setBounds(0,0,815,self.g_height);

		  _target.eye_view_container.addChild(eye_bg)

		  let row = 6;
		  let col = 12;

		  let lines = new createjs.Shape();
		  lines.graphics.ss(1).s("rgba(0,0,0,0.3)").moveTo(0,0);
		  _target.eye_view_container.addChild(lines);

		  for(var e = 0; e < row; e++) {
			  lines.graphics.lineTo(0, e*31.5).lineTo((29*(col-1)), e*31.5).moveTo(0, e*31.5)
		  } // end for

		  for(var i = 0; i < col; i++) {
			  lines.graphics.lineTo(i*29, 0).lineTo(i*29, (31.5*row)).moveTo(i*28, 0)
		  } // end for

		  // === table

		  let table_width = 485;

		  let tableposX = 320 + 6;
		  let tableposY = 5 + 6;

		  // === init
		  let table = new createjs.Shape();
		  table.graphics.ss(1).beginStroke("rgba(60,60,60,0.6)").beginFill("#e6e6e6").drawRoundRectComplex(0,0,table_width,168,8,8,0,0);
		  table.cache(0,0,table_width,168);
		  _target.eye_view_container.addChild(table);
		  table.x = tableposX
		  table.y = tableposY

		  let table_line = new createjs.Shape();
		  table_line.graphics.ss(1).beginStroke("rgba(60,60,60,0.6)").drawRoundRectComplex(0,0,table_width,32,8,8,0,0);
		  table_line.x = tableposX
		  table_line.y = tableposY
		  table_line.cache(0,0,table_width,32)
		  _target.eye_view_container.addChild(table_line);

		  let table_1 = new createjs.Shape();
		  table_1.graphics.ss(1).beginStroke("rgba(60,60,60,0.6)").drawRect(0,32,table_width,46);
		  table_1.x = tableposX
		  table_1.y = tableposY
		  table_1.cache(0,32,table_width,46)
		  _target.eye_view_container.addChild(table_1);

		  let table_2 = new createjs.Shape();
		  table_2.graphics.ss(1).beginStroke("rgba(60,60,60,0.6)").drawRect(0,79,table_width,45);
		  table_2.x = tableposX
		  table_2.y = tableposY
		  table_2.cache(0,79,table_width,45)
		  _target.eye_view_container.addChild(table_2);

		  var game_no_label = new createjs.Text(window.language.multibet_poker.gameno, "bold 16px arial", "#000");
		  game_no_label.textAlign = "center";
		  game_no_label.textBaseline = "middle";
		  game_no_label.x = 30 + tableposX;
		  game_no_label.y = 16 + tableposY;
		  _target.eye_view_container.addChild(game_no_label);

		  var player_label = new createjs.Text(window.language.multibet_poker.player, "bold 16px arial", "#000");
		  player_label.textAlign = "center";
		  player_label.textBaseline = "middle";
		  player_label.x = 325 + tableposX//105 + tableposX;
		  player_label.y = 16 + tableposY;
		  _target.eye_view_container.addChild(player_label);

		  var community_card_label = new createjs.Text(window.language.multibet_poker.communitycard, "bold 16px arial", "#000");
		  community_card_label.textAlign = "center";
		  community_card_label.textBaseline = "middle";
		  community_card_label.x = 215 + tableposX;
		  community_card_label.y = 16 + tableposY;
		  _target.eye_view_container.addChild(community_card_label)

		  var dealer_label = new createjs.Text(window.language.multibet_poker.dealer, "bold 16px arial", "#000");
		  dealer_label.textAlign = "center";
		  dealer_label.textBaseline = "middle";
		  dealer_label.x = 105 + tableposX//325 + tableposX;
		  dealer_label.y = 16 + tableposY;
		  _target.eye_view_container.addChild(dealer_label)

		  var result_label = new createjs.Text(window.language.multibet_poker.result, "bold 16px arial", "#000");
		  result_label.textAlign = "center";
		  result_label.textBaseline = "middle";
		  result_label.x = 425 + tableposX;
		  result_label.y = 16 + tableposY;
		  _target.eye_view_container.addChild(result_label);

		  _target.table_container = new createjs.Container();
		  _target.table_container.set({x : 6, y : 6});
		  _target.eye_view_container.addChild(_target.table_container);

		  _target.roadMap_container = new createjs.Container();
		  _target.roadMap_container.x = 14;
		  _target.roadMap_container.y = 15;
		  _target.eye_view_container.addChild(_target.roadMap_container);
	},
	updateScoreboard(data, _target) {
	},
	drawRoadMap(arr, _target, self) {

		  let color = "";
		  let res_text = "";
		  let totalDealer = 0;
		  let totalPlayer = 0;

		  _target.shoe_cnt_text.text = arr.length;

		  if(_target.roadMap_container) {
		  	_target.roadMap_container.removeAllChildren();
		  }
		  
		  for(var e = 0; e < arr.length; e++) {
			  for(var i = 0;i < arr[e].length; i++) {
					if(!arr[e][i]) continue;
				  if(arr[e][i] == "D") {
					  color = "#d32f2f"
					  res_text = window.language.locale == "zh" ? "荷" : "D";
					  totalDealer++;
				  } //end if
				  else if(arr[e][i] == "P") {
					  color = "#1565c0"
					  res_text = window.language.locale == "zh" ? "闲" : "P";
					  totalPlayer++;
				  } //else if
				  else if(arr[e][i] == "T") {
					  res_text = window.language.locale == "zh" ? '和' : 'T';
					  color = "#41a257"
				  } //else if

				  arr[e][i] = new createjs.Shape();
				  arr[e][i].graphics.beginFill(color).drawCircle(0,0,13.5);
				  arr[e][i].x = (e*29) + 0.5;
				  arr[e][i].y = i*31.5;

				  arr[e][i].text = new createjs.Text(res_text,window.language.locale == "zh" ? "18px arial" : "13px arial" ,"#fff");

					if(window.language.locale == "zh") {
								arr[e][i].text.x = arr[e][i].x - 9;
								arr[e][i].text.y = arr[e][i].y - 9;
					} else {
								arr[e][i].text.x = arr[e][i].x - 4;
								arr[e][i].text.y = arr[e][i].y - 7;
					}

				  _target.roadMap_container.addChild(arr[e][i], arr[e][i].text);
			  }
		  }

		  //Stat count
		  let totalPlayerDealer = totalPlayer + totalDealer;

		  if (totalPlayerDealer) {
			  // Set vertical data
			  _target.player_win_stat.scaleY = totalPlayer/totalPlayerDealer;
			  _target.player_lose_stat.scaleY = totalDealer/totalPlayerDealer;

			  // Set horizontal data
			  _target.eye_player_win.scaleX = totalPlayer/totalPlayerDealer;
			  _target.eye_player_lose.scaleX = totalDealer/totalPlayerDealer;
		  }
	},
	swipeCards (_target, data) {
		function animCards(card, card_data) {

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

		if(data.gameInfo.player) {
			if(data.gameInfo.player[0]) {
				animCards(_target.player_card[0], "C"+ data.gameInfo.player[0])
			}

			if(data.gameInfo.player[1]) {
				animCards(_target.player_card[1], "C"+ data.gameInfo.player[1])
			}
		} // ne dif player

		if(data.gameInfo.dealer) {
			if(data.gameInfo.dealer[0]) {
				animCards(_target.dealer_card[0], "C"+ data.gameInfo.dealer[0])
			}

			if(data.gameInfo.dealer[1]) {
				animCards(_target.dealer_card[1], "C"+ data.gameInfo.dealer[1])
			}
		} // end if dealer

		if(data.gameInfo.flop) {
			if(data.gameInfo.flop[0]) {
				animCards(_target.community_card[0], "C"+ data.gameInfo.flop[0])
			}
			if(data.gameInfo.flop[1]) {
				animCards(_target.community_card[1], "C"+ data.gameInfo.flop[1])
			}
			if(data.gameInfo.flop[2]) {
				animCards(_target.community_card[2], "C"+ data.gameInfo.flop[2])
			}
		}

		if(data.gameInfo.turn) {
			animCards(_target.community_card[3], "C"+ data.gameInfo.turn)
		}
		if(data.gameInfo.river) {
			animCards(_target.community_card[4], "C"+ data.gameInfo.river)
		}
	},
	setResult(res, _target, self) {
		  _target.table_container.removeAllChildren();
	  		res = _.filter(res, (data) =>{
				if(data.gameInfo) return data;
			});

		  let tableposX = 320;
		  let tableposY = 5;

		  let round_num = [];
		  let dealer_card = [];
		  let community_card = [];
		  let player_card = [];
		  let result = [];
		  for(var e = 0; e < res.length; e++) {
			  round_num[e] = new createjs.Text(res[e].roundNum,"16px arial", "#000");
			  round_num[e].textAlign = "center";
			  round_num[e].x = 30 + tableposX;
			  round_num[e].y = (e*46.5) + 46 + tableposY;
			  _target.table_container.addChild(round_num[e]);
			  //== dealerc

			  dealer_card[e] = [];

			  for(var i = 0;  i < res[e].gameInfo.dealer.length; i++ ) {
				  dealer_card[e][i] = createCardSprite(self,40.7,54.5,"multi-bet-cards");
				  dealer_card[e][i].gotoAndPlay("C"+res[e].gameInfo.dealer[i]);
				  dealer_card[e][i].scaleX = dealer_card[e][i].scaleY = 0.6
				  dealer_card[e][i].x = 80 + (i*24) + tableposX //(i*24) + xo + tableposX;
					dealer_card[e][i].y = (e*46.4) + 36 + tableposY;
				  dealer_card[e][i].shadow = new createjs.Shadow("#000000", 1, 0, 6);
			  } //end for

			  let cnt = res[e].gameInfo.dealer.length - 1;
			  for(var i = 0;  i < res[e].gameInfo.dealer.length; i++ ) {
				  _target.table_container.addChild(dealer_card[e][cnt]);
				  cnt--;
			  } //end for

			  //== community
			  let community_card_data = res[e].gameInfo.flop;
			  community_card_data.push(res[e].gameInfo.turn);
			  community_card_data.push(res[e].gameInfo.river);
			  community_card[e] = [];
			  for(var i = 0;  i < community_card_data.length; i++ ) {
					let xo = (community_card_data.length == 3) ? 143 : 155;
				  community_card[e][i]= createCardSprite(self,40.7,54.5,"multi-bet-cards");
				  community_card[e][i].gotoAndPlay("C"+community_card_data[i]);
				  community_card[e][i].x = xo + (i*24) + tableposX;
				  community_card[e][i].y = 36 + (e*46.6) + tableposY;
				  community_card[e][i].scaleY = community_card[e][i].scaleX = 0.6
				  community_card[e][i].shadow = new createjs.Shadow("#000000", 1, 0, 6);
			  } // end for

			  let cnt2 = community_card_data.length - 1;
			  for(var i = 0;  i < community_card_data.length; i++ ) {
				  _target.table_container.addChild(community_card[e][cnt2]);
				  cnt2--;
			  }

			  //== player
			  player_card[e] = [];

			  for(var i = 0;  i < res[e].gameInfo.player.length; i++ ) {
					let xo = (res[e].gameInfo.player.length == 3) ? 288 : 300;
				  player_card[e][i]= createCardSprite(self,40.7,54.5,"multi-bet-cards");
				  player_card[e][i].gotoAndPlay("C"+res[e].gameInfo.player[i]);
				  player_card[e][i].x = (i*24) + xo + tableposX//80 + (i*24) + tableposX;
				  player_card[e][i].y = 36 + (e*46.6) + tableposY;
				  player_card[e][i].scaleY = player_card[e][i].scaleX = 0.6
				  player_card[e][i].shadow = new createjs.Shadow("#000000", 1, 0, 6);
			  } // end for

			  let cnt3 = res[e].gameInfo.player.length - 1;
			  for(var i = 0;  i < res[e].gameInfo.player.length; i++ ) {
				  _target.table_container.addChild(player_card[e][cnt3]);
				  cnt3--;
			  }
			  let color = "#0d47a1";
			  let text = window.language.multibet_poker.playerwins
			  if(res[e].gameResult.winner == "dealer") {
				  color = "#b71c1c";
					text = window.language.multibet_poker.dealerwins;
			  } else if(res[e].gameResult.winner == "tie") {
					text = window.language.multibet_poker.tie;
					color = '#689f38';
			  }
			  result[e] = new createjs.Text(text, window.language.locale == "zh" ? "bold 20px arial" : "bold 14px arial", color);
			  result[e].textAlign = "center"
			  result[e].x = 425 + tableposX;

				if(window.language.locale == "zh") {
					result[e].y = (e*46.8) + 43 + tableposY;
				} else {
					result[e].y = (e*46.8) + 46 + tableposY;
				}

			  _target.table_container.addChild(result[e])

				if(res[e].gameInfo.isVoid) {
					console.log("void draw");
				  let voidContainer = new createjs.Container();
				  voidContainer.set({x:tableposX, y:tableposY+ (e*46.8)+32});

				  let voidShape = new createjs.Shape();
				  voidShape.graphics.beginFill("#212120").drawRect(0,0,482,44);
			  	voidContainer.addChild(voidShape)

				  let voidText = new createjs.Text("GAME VOID", "14px lato", "#fff");
				  voidText.set({x: (480/3) + 30, y: (44/2), textBaseline:"middle"});
				  voidContainer.addChild(voidText);

				  let voidImg = new createjs.Bitmap(self.context.getResources("void"));
				  voidImg.set({x: voidText.x + voidText.getMeasuredWidth() + 8 , regY: voidImg.getBounds().height/2, y: (44/2)});
				  voidContainer.addChild(voidImg);

			  	_target.table_container.addChild(voidContainer)
				}
		  } // end for
	}
}

export default {
	poker
}