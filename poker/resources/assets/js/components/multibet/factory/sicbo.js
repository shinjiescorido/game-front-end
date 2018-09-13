
import {  createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap } from '../../../factories/factories';

import format from '../../../factories/formatter';

let sicbo = {
	createGame(_target,self) {
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
		  bet_area_bg.graphics.beginFill("rgba(60, 60, 60, 0.78)").drawRect(0,0,685,self.g_height*2);
		  bet_area_bg.setBounds(0,0,685,self.g_height*2);

		  _target.betareas_container.addChild(bet_area_bg);

		  let adjustY = 32;

		  _target.betboard_2 = new createjs.Bitmap(window.language.locale == 'zh' ? self.context.getResources("sicbo_betboard_zh") : self.context.getResources("sicbo_betboard"));
		  // _target.betboard_2.scaleX = 0.62;
		  // _target.betboard_2.scaleY = 0.62;
		  _target.betboard_2.y = 28 - 18 + adjustY;
		  _target.betboard_2.x = 18;
		  _target.betareas_container.addChild(_target.betboard_2);

		  let default_color = "rgba(255, 255, 255, 0.01)";
		  let drop_color = "rgba(255, 255, 255, 0.3)";
		  let win_color = "rgba(249, 227, 113, 0.6)";

		  _target.betarea[0] = new createjs.Shape();
		  _target.betarea[0].graphics.beginFill(default_color).drawRoundRect(0,0,72,40,5);
		  _target.betarea[0].table = "even"
		  _target.betarea[0].x = 18;
		  _target.betarea[0].y = 34;
		  _target.betarea[0].payout_multiplier = 1;
		  _target.betarea[0].setBounds(0,0,72,40);

		  _target.betarea[1] = new createjs.Shape();
		  _target.betarea[1].graphics.beginFill(default_color).drawRoundRect(0,0,72,62,5);
		  _target.betarea[1].table = "small"
		  _target.betarea[1].x = 18;
		  _target.betarea[1].y = 82;
		  _target.betarea[1].setBounds(0,0,72,62);
		  _target.betarea[1].payout_multiplier = 1;

		  _target.betarea[2] = new createjs.Shape();
		  _target.betarea[2].graphics.beginFill(default_color).drawRoundRect(0,0,62,32,5);
		  _target.betarea[2].table = "double-1"
		  _target.betarea[2].x = 96;
		  _target.betarea[2].y = 34;
		  _target.betarea[2].setBounds(0,0,62,32);
		  _target.betarea[2].payout_multiplier = 8;

		  _target.betarea[3] = new createjs.Shape();
		  _target.betarea[3].graphics.beginFill(default_color).drawRoundRect(0,0,62,32,5);
		  _target.betarea[3].table = "double-2"
		  _target.betarea[3].x = 96;
		  _target.betarea[3].y = 72;
		  _target.betarea[3].setBounds(0,0,62,32);
		  _target.betarea[3].payout_multiplier = 8;

		  _target.betarea[4] = new createjs.Shape();
		  _target.betarea[4].graphics.beginFill(default_color).drawRoundRect(0,0,62,32,5);
		  _target.betarea[4].table = "double-3"
		  _target.betarea[4].x = 96;
		  _target.betarea[4].y = 112;
		  _target.betarea[4].setBounds(0,0,62,32);
		  _target.betarea[4].payout_multiplier = 8;

		  _target.betarea[5] = new createjs.Shape();
		  _target.betarea[5].graphics.beginFill(default_color).drawRoundRect(0,0,94,34,5);
		  _target.betarea[5].table = "triple-1"
		  _target.betarea[5].x = 165;
		  _target.betarea[5].y = 34;
		  _target.betarea[5].setBounds(0,0,94,34);
		  _target.betarea[5].payout_multiplier = 150;

		  _target.betarea[6] = new createjs.Shape();
		  _target.betarea[6].graphics.beginFill(default_color).drawRoundRect(0,0,94,34,5);
		  _target.betarea[6].table = "triple-2"
		  _target.betarea[6].x = 165;
		  _target.betarea[6].y = 72;
		  _target.betarea[6].setBounds(0,0,94,34);
		  _target.betarea[6].payout_multiplier = 150;

		  _target.betarea[7] = new createjs.Shape();
		  _target.betarea[7].graphics.beginFill(default_color).drawRoundRect(0,0,94,34,5);
		  _target.betarea[7].table = "triple-3"
		  _target.betarea[7].x = 165;
		  _target.betarea[7].y = 112;
		  _target.betarea[7].setBounds(0,0,94,34);
		  _target.betarea[7].payout_multiplier = 150;

		  _target.betarea[8] = new createjs.Shape();
		  _target.betarea[8].graphics.beginFill(default_color).drawRoundRect(0,0,121,108,5);
		  _target.betarea[8].table = "anytriple"
		  _target.betarea[8].x = 268;
		  _target.betarea[8].y = 36;
		  _target.betarea[8].setBounds(0,0,121,108);
		  _target.betarea[8].payout_multiplier = 24;

		  _target.betarea[9] = new createjs.Shape();
		  _target.betarea[9].graphics.beginFill(default_color).drawRoundRect(0,0,94,32,5);
		  _target.betarea[9].table = "triple-4"
		  _target.betarea[9].x = 396;
		  _target.betarea[9].y = 36;
		  _target.betarea[9].setBounds(0,0,94,32);
		  _target.betarea[9].payout_multiplier = 150;

		  _target.betarea[10] = new createjs.Shape();
		  _target.betarea[10].graphics.beginFill(default_color).drawRoundRect(0,0,94,32,5);
		  _target.betarea[10].table = "triple-5"
		  _target.betarea[10].x = 396;
		  _target.betarea[10].y = 74;
		  _target.betarea[10].setBounds(0,0,94,32);
		  _target.betarea[10].payout_multiplier = 150;

		  _target.betarea[11] = new createjs.Shape();
		  _target.betarea[11].graphics.beginFill(default_color).drawRoundRect(0,0,94,32,5);
		  _target.betarea[11].table = "triple-6"
		  _target.betarea[11].x = 396;
		  _target.betarea[11].y = 112;
		  _target.betarea[11].setBounds(0,0,94,32);
		  _target.betarea[11].payout_multiplier = 150;

		  _target.betarea[12] = new createjs.Shape();
		  _target.betarea[12].graphics.beginFill(default_color).drawRoundRect(0,0,62,32,5);
		  _target.betarea[12].table = "double-4"
		  _target.betarea[12].x = 498;
		  _target.betarea[12].y = 36;
		  _target.betarea[12].setBounds(0,0,62,32);
		  _target.betarea[12].payout_multiplier = 8;

		  _target.betarea[13] = new createjs.Shape();
		  _target.betarea[13].graphics.beginFill(default_color).drawRoundRect(0,0,62,32,5);
		  _target.betarea[13].table = "double-5"
		  _target.betarea[13].x = 498;
		  _target.betarea[13].y = 74;
		  _target.betarea[13].setBounds(0,0,62,32);
		  _target.betarea[13].payout_multiplier = 8;

		  _target.betarea[14] = new createjs.Shape();
		  _target.betarea[14].graphics.beginFill(default_color).drawRoundRect(0,0,62,32,5);
		  _target.betarea[14].table = "double-6"
		  _target.betarea[14].x = 498;
		  _target.betarea[14].y = 112;
		  _target.betarea[14].setBounds(0,0,62,32);
		  _target.betarea[14].payout_multiplier = 8;

		  _target.betarea[15] = new createjs.Shape();
		  _target.betarea[15].graphics.beginFill(default_color).drawRoundRect(0,0,72,40,5);
		  _target.betarea[15].table = "odd"
		  _target.betarea[15].x = 566;
		  _target.betarea[15].y = 34;
		  _target.betarea[15].setBounds(0,0,72,40);
		  _target.betarea[15].payout_multiplier = 1;

		  _target.betarea[16] = new createjs.Shape();
		  _target.betarea[16].graphics.beginFill(default_color).drawRoundRect(0,0,72,62,5);
		  _target.betarea[16].table = "big"
		  _target.betarea[16].x = 566;
		  _target.betarea[16].y = 82;
		  _target.betarea[16].setBounds(0,0,72,62);
		  _target.betarea[16].payout_multiplier = 1;

		  let temp = 0;
		  for(var a = 17; a < 31; a++) {
				_target.betarea[a] = new createjs.Shape();
				_target.betarea[a].graphics.beginFill(default_color).drawRoundRect(0,0,38,46,3);
				_target.betarea[a].table = "sum-"+(temp+4)
				_target.betarea[a].x = (temp * (36 + 8.54)) + 19.2;
				_target.betarea[a].y = 150;
				_target.betarea[a].radius = 4;
				_target.betarea[a].setBounds(0,0,37,45);			  	
				temp++
				switch("sum-"+(temp+4)) {
					case "sum-4" :
					case "sum-17" :
						_target.betarea[a].payout_multiplier = 50
						break			  	
					case "sum-5" :
					case "sum-16" :
						_target.betarea[a].payout_multiplier = 18
						break
					case "sum-6" :
						_target.betarea[a].payout_multiplier = 14
						break;
					case "sum-15" :
						_target.betarea[a].payout_multiplier = 15
						break
					case "sum-7" :
					case "sum-14" :
						_target.betarea[a].payout_multiplier = 12
						break
					case "sum-8" :
					case "sum-13" :
						_target.betarea[a].payout_multiplier = 8
						break
					case "sum-9" :
					case "sum-12" :
					case "sum-10" :
					case "sum-11" :
						_target.betarea[a].payout_multiplier = 8
						break
				}
		  }

			temp = 0;
			var bet_name = ["domino-1&2","domino-1&3","domino-1&4","domino-1&5","domino-1&6","domino-2&3","domino-2&4","domino-2&5","domino-2&6","domino-3&4","domino-3&5","domino-3&6","domino-4&5","domino-4&6","domino-5&6"]
			for(var a = 31; a <= 45; a++) {
				_target.betarea[a] = new createjs.Shape();
				_target.betarea[a].graphics.beginFill(default_color).drawRoundRect(0,0,29,62,3);
				_target.betarea[a].table = bet_name[temp];
				_target.betarea[a].x = (temp * (28 + 10.65)) + 20;
				_target.betarea[a].y = 204;
				_target.betarea[a].setBounds(0,0,29,62);			  	
				_target.betarea[a].radius = 4;			  	
				_target.betarea[a].payout_multiplier = 5			  	
				temp++
			}

			var group_bet_name = ["group-1234","group-2345", "group-2356", "group-3456"];

			temp = 0;
			for(var a = 46; a <= 49; a++) {
				_target.betarea[a] = new createjs.Shape();
				_target.betarea[a].graphics.beginFill(default_color).drawRoundRect(0,0,149,30,4);
				_target.betarea[a].table = group_bet_name[temp]
				_target.betarea[a].x = (temp * (148 + 8.7)) + 19;
				_target.betarea[a].y = 204 + 60 + 10;
				_target.betarea[a].setBounds(0,0,148,30);			  	
				_target.betarea[a].radius = 4;			  	
				_target.betarea[a].payout_multiplier = 7  	
				temp++
			}

			temp = 0;
			for(var a = 50; a <= 55; a++) {
				_target.betarea[a] = new createjs.Shape();
				_target.betarea[a].graphics.beginFill(default_color).drawRoundRect(0,0,98,30,4);
				_target.betarea[a].table = "dice-"+ (parseInt(temp)+1);
				_target.betarea[a].x = (temp * (98 + 6)) + 19;
				_target.betarea[a].y = 274 + 30 + 10;
				_target.betarea[a].setBounds(0,0,98,30);			  	
				_target.betarea[a].radius = 4;			  	
				_target.betarea[a].payout_multiplier = 1		  	
				temp++
			}

		  	if(window.user_type == "C") {
				_target.bet_range = _target.data.casinoBetRanges[0]
			} else {
				_target.bet_range = _target.data.sportBetRanges[0]
			}

			for (var a = 0; a < _target.betarea.length; a++) {
				if(_target.betarea[a].table == "big" || _target.betarea[a].table == "small" || _target.betarea[a].table == "odd" || _target.betarea[a].table == "even") {
					_target.betarea[a].min_betAmt = (parseInt(_target.bet_range.min) * parseInt(window.currencyMultiplier))  * parseInt(window.userMultiplier);
					_target.betarea[a].max_betAmt = (parseInt(_target.bet_range.max) * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
				}

				_target.betarea[a].y += adjustY; //adjust
				
				for(var e = 0; e < _target.bet_range.side_bet.length; e++) {
				
					if(_target.bet_range.side_bet[e].division == _target.betarea[a].table) {
						_target.betarea[a].min_betAmt = (parseInt(_target.bet_range.side_bet[e].min) * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
						_target.betarea[a].max_betAmt = (parseInt(_target.bet_range.side_bet[e].max) * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
					} else if(_target.betarea[a].table.indexOf(_target.bet_range.side_bet[e].division) >-1 ) {
						_target.betarea[a].min_betAmt = (parseInt(_target.bet_range.side_bet[e].min) * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
						_target.betarea[a].max_betAmt = (parseInt(_target.bet_range.side_bet[e].max) * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
					}
				}

			}
		  let hot_bg = new createjs.Shape();
		  hot_bg.graphics.beginFill("#d32f2f").drawRect(0,0,28,150);
		  let cold_bg = new createjs.Shape();
		  cold_bg.graphics.beginFill("#1565c0").drawRect(28,0,25,150);

		  _target.hot_cold_bg_container = new createjs.Container();
		  _target.hot_cold_bg_container.x = 10;
		  _target.hot_cold_bg_container.y = 60;//42;
		  _target.hot_cold_bg_container.visible = false;
		  _target.hot_cold_bg_container.addChild(hot_bg, cold_bg);
		  _target.addChild(_target.hot_cold_bg_container);

		  _target.hot_cold_container = new createjs.Container();
		  _target.hot_cold_container.x = 10;
		  _target.hot_cold_container.y = 60;//42;
		  _target.hot_cold_container.visible = false;
		  _target.addChild(_target.hot_cold_container);

		  _target.last_5_res_container = new createjs.Container();
		  _target.last_5_res_container.x = 80;
		  _target.last_5_res_container.y = 60//40;
		  _target.last_5_res_container.visible = false;
		  _target.addChild(_target.last_5_res_container);

		  _target.total_game_bet = new createjs.Text("0","30px BebasNeue","#fff");
		  _target.total_game_bet.textAlign = "center";
		  _target.total_game_bet.x = bet_area_bg.x + bet_area_bg.getBounds().width/2;
		  _target.betareas_container.addChild(_target.total_game_bet)

		  // === eye
		  let button_height = 36;
		  let button_width = 70;

		  let eye_bg = new createjs.Shape();
		  eye_bg.graphics.beginFill("rgba(255, 255, 255, 0.4)").drawRect(0,0,835,self.g_height);
		  eye_bg.setBounds(0,0,835,self.g_height);

		  _target.eye_view_container.addChild(eye_bg)

		  _target.size_button = new createjs.Shape();
		  _target.size_button.graphics.beginLinearGradientFill(["#8f7d46","#bba35b","#8f7d46"], [0, 0.5, 1], 10, 0, 70, 0, 90, 0).drawRoundRect(0, 0, 70, button_height, 8);
		  _target.size_button.y = 7;
		  _target.size_button.x = 5;
		  _target.eye_view_container.addChild(_target.size_button)
		  _target.size_button.text =  new createjs.Text(window.language.multibet_sicbo.bigsmallcaps, window.language.locale == "zh" ? "bold 15px arial" : "bold 12px arial", "#fff");
		  _target.size_button.text.textAlign = "center";
		  _target.size_button.text.textBaseline = "middle";
		  _target.size_button.text.x = button_width/2 + 5;
		  _target.size_button.text.y = button_height/2 + _target.size_button.y;
		  _target.size_button.sicboBtn = true;
		  _target.size_button.text.sicboBtn = true;
		  _target.size_button.text.hitArea = _target.size_button;
		  _target.eye_view_container.addChild(_target.size_button.text);

		  _target.parity_button = new createjs.Shape();
		  _target.parity_button.graphics.beginLinearGradientFill(["#dcc46e","#dcc46e","#dcc46e"], [0, 0.5, 1], 10, 0, 70, 0, 90, 0).drawRoundRect(0, 0, 70, button_height, 8);
		  _target.eye_view_container.addChild(_target.parity_button);
		  _target.parity_button.x = 5;
		  _target.parity_button.y = _target.size_button.y + button_height + 8;
		  _target.parity_button.text = new createjs.Text(window.language.multibet_sicbo.oddevencaps, window.language.locale == "zh" ? "bold 15px arial" : "bold 12px arial" , "#000");
		  _target.parity_button.text.textAlign = "center";
		  _target.parity_button.text.textBaseline = "middle";
		  _target.parity_button.text.x = button_width/2 + 5
		  _target.parity_button.text.y = button_height/2 + _target.parity_button.y
		  _target.parity_button.sicboBtn = true;
		  _target.parity_button.text.sicboBtn = true;
		  _target.parity_button.text.hitArea = _target.parity_button;
		  _target.eye_view_container.addChild(_target.parity_button.text)

		  _target.sum_button = new createjs.Shape();
		  _target.sum_button.graphics.beginLinearGradientFill(["#dcc46e","#f9e391","#dcc46e"], [0, 0.5, 1], 10, 0, 70, 0, 90, 0).drawRoundRect(0, 0, 70, button_height, 8);
		  _target.sum_button.y = _target.parity_button.y + button_height + 8;
		  _target.sum_button.x = 5;
		  _target.eye_view_container.addChild(_target.sum_button);
		  _target.sum_button.text = new createjs.Text(window.language.multibet_sicbo.sumcaps, window.language.locale == "zh" ? "bold 15px arial" : "bold 12px arial", "#000");
		  _target.sum_button.text.textAlign = "center";
		  _target.sum_button.text.textBaseline = "middle";
		  _target.sum_button.text.x = button_width/2 + 5;
		  _target.sum_button.text.y = button_height/2 + _target.sum_button.y;
		  _target.sum_button.sicboBtn = true;
		  _target.sum_button.text.sicboBtn = true;
		  _target.sum_button.text.hitArea = _target.sum_button;
		  _target.eye_view_container.addChild(_target.sum_button.text);

		  _target.dice_button = new createjs.Shape();
		  _target.dice_button.graphics.beginLinearGradientFill(["#dcc46e","#f9e391","#dcc46e"], [0, 0.5, 1], 10, 0, 70, 0, 90, 0).drawRoundRect(0, 0, 70, button_height, 8);
		  _target.dice_button.y = _target.sum_button.y + button_height + 8;
		  _target.dice_button.x = 5;
		  _target.eye_view_container.addChild(_target.dice_button);
		  _target.dice_button.text = new createjs.Text(window.language.multibet_sicbo.dicecaps, window.language.locale == "zh" ? "bold 15px arial" : "bold 12px arial", "#000");
		  _target.dice_button.text.textAlign = "center";
		  _target.dice_button.text.textBaseline = "middle";
		  _target.dice_button.text.x = button_width/2 + 5;
		  _target.dice_button.text.y = button_height/2 + _target.dice_button.y;
		  _target.dice_button.sicboBtn = true;
		  _target.dice_button.text.sicboBtn = true;
		  _target.dice_button.text.hitArea =_target.dice_button ;
		  _target.eye_view_container.addChild(_target.dice_button.text);

		  let squares = [];
		  let row = 6
		  let col = 16
		  let wh = 23;
		  let h = 22.6;

		  let lines = new createjs.Shape();
		  lines.graphics.ss(1).s("rgba(0,0,0,0.3)").moveTo(60,0);
		  _target.eye_view_container.addChild(lines);

		  // == pearl road
		  for(var i = 0; i < row; i++) { //row
			  lines.graphics.moveTo(80, (i*32)).lineTo(80+((col-1)*30.5), (i*32))
		  } // end for
		  for(var e = 0; e < col; e++) {
			  lines.graphics.moveTo((e*30.5)+80, 0).lineTo((e*30.5)+80, (31.6*row))
		  } // end for

			let posX = 550 + 42 + 10;

		  _target.odd_bar = new createjs.Shape();
		  _target.odd_bar.graphics.beginFill("#b71c1c").drawRect(0,0,165,14);
		  _target.odd_bar.setBounds(0,0,165,16);
		  _target.eye_view_container.addChild(_target.odd_bar);
		  _target.odd_bar.regX = 0;
		  _target.odd_bar.scaleX = .5
		  _target.odd_bar.y = 85;
		  _target.odd_bar.x = posX;
		  // ====
		  _target.even_bar = new createjs.Shape();
		  _target.even_bar.graphics.beginFill("#0d47a1").drawRect(0,0,165,14);
		  _target.even_bar.setBounds(0,0,165,16);
		  _target.eye_view_container.addChild(_target.even_bar);
		  _target.even_bar.regX = _target.even_bar.getBounds().width;
		  _target.even_bar.x = _target.even_bar.getBounds().width + posX;
		  _target.even_bar.scaleX = .5
		  _target.even_bar.y = 85;
		  // ====
		  _target.big_bar = new createjs.Shape();
		  _target.big_bar.graphics.beginFill("#b71c1c").drawRect(0,0,165,14);
		  _target.big_bar.setBounds(0,0,165,16);
		  _target.eye_view_container.addChild(_target.big_bar);
		  _target.big_bar.regX = 0;
		  _target.big_bar.scaleX = .5
		  _target.big_bar.y = 25;
		  _target.big_bar.x = posX;
		  // ===
		  _target.small_bar = new createjs.Shape();
		  _target.small_bar.graphics.beginFill("#0d47a1").drawRect(0,0,165,14);
		  _target.small_bar.setBounds(0,0,165,16);
		  _target.eye_view_container.addChild(_target.small_bar);
		  _target.small_bar.regX = _target.small_bar.getBounds().width;
		  _target.small_bar.x = _target.small_bar.getBounds().width + posX;
		  _target.small_bar.scaleX = .5
		  _target.small_bar.y = 25;

		  // ====
		  _target.big_text = new createjs.Text(window.language.multibet_sicbo.bigcaps, window.language.locale == "zh" ? "18px arial" : "14px arial","#000");
			_target.big_text.textAlign = "center";
			_target.big_text.y = _target.big_bar.y;
			_target.big_text.x = posX - 32;
			_target.eye_view_container.addChild(_target.big_text);
			// ====
			_target.small_text = new createjs.Text(window.language.multibet_sicbo.smallcaps, window.language.locale == "zh" ? "18px arial" : "14px arial","#000");
			_target.small_text.textAlign = "center";
			_target.small_text.y = _target.small_bar.y;
			_target.small_text.x = posX + 197 - .5;
			_target.eye_view_container.addChild(_target.small_text);
			// ====
			_target.even_text = new createjs.Text(window.language.multibet_sicbo.evencaps, window.language.locale == "zh" ? "18px arial" : "14px arial","#000");
			_target.even_text.y = _target.even_bar.y;
			_target.even_text.textAlign = "center";
			_target.even_text.x = posX + 197 - .5;
			_target.eye_view_container.addChild(_target.even_text);
			// ====
			_target.odd_text = new createjs.Text(window.language.multibet_sicbo.oddcaps, window.language.locale == "zh" ? "18px arial" : "14px arial" ,"#000");
			_target.odd_text.textAlign = "center";
			_target.odd_text.y = _target.odd_bar.y;
			_target.odd_text.x = posX - 32;
			_target.eye_view_container.addChild(_target.odd_text);

		  // ====
		  _target.odd_percent = new createjs.Text("20%", "12px arial", "#000");
		  _target.odd_percent.y = _target.odd_bar.y + _target.odd_bar.getBounds().height + 2;
		  _target.odd_percent.x = _target.odd_bar.x;
		  _target.eye_view_container.addChild(_target.odd_percent);
		  // ====
		  _target.even_percent = new createjs.Text("20%", "12px arial", "#000");
		  _target.even_percent.y = _target.even_bar.y + _target.even_bar.getBounds().height + 2;
		  _target.even_percent.x = _target.even_bar.x - _target.even_percent.getMeasuredWidth();
		  _target.eye_view_container.addChild(_target.even_percent);
		  // ====
		  _target.big_percent = new createjs.Text("20%", "12px arial", "#000");
		  _target.big_percent.y = _target.big_bar.y + _target.big_bar.getBounds().height + 2;
		  _target.big_percent.x = _target.big_bar.x;
		  _target.eye_view_container.addChild(_target.big_percent);
		  // ====
		  _target.small_percent = new createjs.Text("20%", "12px arial", "#000");
		  _target.small_percent.y = _target.small_bar.y + _target.small_bar.getBounds().height + 2;
		  _target.small_percent.x = _target.small_bar.x - _target.small_percent.getMeasuredWidth();
		  _target.eye_view_container.addChild(_target.small_percent);

		  _target.double_bg = new createjs.Shape();
		  _target.double_bg.graphics.beginFill("#e5b241").drawRoundRect(0,0,80,50,8);
		  _target.double_bg.setBounds(0,0,80,30);
		  _target.double_bg.y = 125;
		  _target.double_bg.x = posX - 3;
		  _target.eye_view_container.addChild(_target.double_bg);

			_target.double_text_bg = new createjs.Shape()
		  _target.double_text_bg.graphics.beginFill("#333333").drawRoundRect(5,20,70,25,3);
		  _target.double_text_bg.y = 125;
		  _target.double_text_bg.x = _target.double_bg.x;
		  _target.eye_view_container.addChild(_target.double_text_bg);

		  _target.triple_bg = new createjs.Shape();
		  _target.triple_bg.graphics.beginFill("#e5b241").drawRoundRect(0,0,80,50,8);
		  _target.triple_bg.setBounds(0,0,80,30);
		  _target.triple_bg.x = _target.double_bg.x + 91;
		  _target.triple_bg.y = 125;
		  _target.eye_view_container.addChild(_target.triple_bg);

			_target.triple_text_bg = new createjs.Shape()
		  _target.triple_text_bg.graphics.beginFill("#333333").drawRoundRect(5,20,70,25,3);
		  _target.triple_text_bg.x = _target.triple_bg.x;
		  _target.triple_text_bg.y = 125;
		  _target.eye_view_container.addChild(_target.triple_text_bg);

		  _target.double_text = new createjs.Text(window.language.multibet_sicbo.doublecaps, window.language.locale == "zh" ? "bold 13px arial" : "bold 11px arial", "#000");
		  _target.double_text.textBaseline = "middle";
		  _target.double_text.textAlign = "center";
		  _target.double_text.x = _target.double_text_bg.x + 80 /2;
		  _target.double_text.y = _target.double_bg.y + (_target.double_bg.getBounds().height/2) - 4.5;
		  _target.eye_view_container.addChild(_target.double_text);

		  _target.triple_text = new createjs.Text(window.language.multibet_sicbo.triplecaps, window.language.locale == "zh" ? "bold 13px arial" : "bold 11px arial", "#000");
		  _target.triple_text.textBaseline = "middle";
		  _target.triple_text.textAlign = "center";
		  _target.triple_text.x = _target.triple_bg.x + 80 / 2;
		  _target.triple_text.y = _target.triple_bg.y + (_target.triple_bg.getBounds().height/2) - 4.5;
		  _target.eye_view_container.addChild(_target.triple_text);

		  _target.double_val = new createjs.Text("0", "16px BebasNeue", "#ffffff");
		  _target.double_val.textBaseline = "middle";
		  _target.double_val.textAlign = "center";
		  _target.eye_view_container.addChild(_target.double_val);
		  _target.double_val.x = _target.double_text_bg.x + 80 /2;
		  _target.double_val.y = _target.double_text.y + 2 + 45 -24;

		  _target.triple_val = new createjs.Text("0", "16px BebasNeue", "#ffffff");
		  _target.triple_val.textBaseline = "middle";
		  _target.triple_val.textAlign = "center";
		  _target.eye_view_container.addChild(_target.triple_val);
		  _target.triple_val.x = _target.triple_text_bg.x + 80 /2;
		  _target.triple_val.y = _target.triple_text.y + 2 +45 - 24;

		  // === roadmap
		  _target.parity_container = new createjs.Container();
		  _target.eye_view_container.addChild(_target.parity_container);
		  _target.parity_container.visible = 0;

		  _target.size_container = new createjs.Container();
		  _target.eye_view_container.addChild(_target.size_container);
		  // _target.size_container.visible = 0;

		  _target.sum_container = new createjs.Container();
		  _target.eye_view_container.addChild(_target.sum_container);
		  _target.sum_container.visible = 0;

		  _target.dice_container = new createjs.Container();
		  _target.eye_view_container.addChild(_target.dice_container);
		  _target.dice_container.visible = 0;

			let changeButtonState = function(o, e) {
			  if(o.state == "active") return;
			  if(e == "hover") {
				o.text.color = "#fff";
						o.graphics.clear().beginLinearGradientFill(["#8f7d46","#bba35b","#8f7d46"], [0, 0.5, 1], 10, 0, 70, 0, 90, 0).drawRoundRect(0, 0, 70, button_height, 8);
			  }
			  else {
				o.text.color = "#000";
						o.graphics.clear().beginLinearGradientFill(["#dcc46e","#f9e391","#dcc46e"], [0, 0.5, 1], 10, 0, 70, 0, 90, 0).drawRoundRect(0, 0, 70, button_height, 8);
			  }

			}.bind(this)

			let deactivateAll = (target) => {
		  	target.parent.parent.sum_container.visible = false;
				target.parent.parent.dice_container.visible = false;
				target.parent.parent.parity_container.visible = false;
				target.parent.parent.size_container.visible = false;
	  		target.parent.parent.sum_button.state = "normal";
	  		target.parent.parent.dice_button.state = "normal";
	  		target.parent.parent.parity_button.state = "normal";
	  		target.parent.parent.size_button.state = "normal";
	  		changeButtonState(target.parent.parent.sum_button, "normal");
	  		changeButtonState(target.parent.parent.dice_button, "normal");
	  		changeButtonState(target.parent.parent.parity_button, "normal");
	  		changeButtonState(target.parent.parent.size_button, "normal");
	  		changeButtonState(target, "hover");
		  	target.state = "active";
			}

			let tabletype_buttons = [_target.sum_button, _target.dice_button, _target.parity_button, _target.size_button]
			tabletype_buttons.forEach((o) => {
				o.addEventListener("mouseover", (e) => {
					changeButtonState(e.target, "hover");
				});
				o.addEventListener("mouseout", (e) => {
					changeButtonState(e.target, "normal");
				});
			})

	  	_target.sum_button.addEventListener("click", (e) => {
  			deactivateAll(e.target);
		  	e.target.parent.parent.sum_container.visible = true;
	  	});
	  	_target.dice_button.addEventListener("click", (e) => {
  			deactivateAll(e.target);
		  	e.target.parent.parent.dice_container.visible = true;
	  	});
	  	_target.parity_button.addEventListener("click", (e) => {
	  			deactivateAll(e.target);
			  	e.target.parent.parent.parity_container.visible = true;
		 	});
	  	_target.size_button.addEventListener("click", (e) => {
  			deactivateAll(e.target);
		  	e.target.parent.parent.size_container.visible = true;
	  	});
			// === toggle container view
	},
	drawRoadMap (arr, sel, _target, _self) {

		  _target[sel+"_container"].removeAllChildren();

		  let color = "";
		  let text_val = "";
		  let font_size = "13px";

		  for(var e = 0; e< arr.length;e++) {
			  if(arr[e] !== undefined) {
				  for(var i = 0; i < arr[e].length; i++) {
					  if(!arr[e][i]) continue ;

					  if(arr[e][i] !== undefined) {

						  color = "#e5b241";
						  text_val = arr[e][i];

						  if(text_val.length > 2) {
							  font_size = window.language.locale == "zh" ? "14px" : "10px";
						  }

						  if (arr[e][i] == "odd") {
							  color = "#d32f2f";
							  text_val = window.language.locale == "zh" ? "单" : "O";
						  }
						  if (arr[e][i] == "even") {
							  color = "#1565c0";
							  text_val = window.language.locale == "zh" ? "双" : "E";
						  }
						  if (arr[e][i] == "big") {
							  color = "#d32f2f";
							  text_val = window.language.locale == "zh" ? "大" : "B";
						  }
						  if (arr[e][i] == "small") {
							  color = "#1565c0";
							  text_val = window.language.locale == "zh" ? "小" : "S";
						  }
						  if (arr[e][i] == "triple") {
							  color = "#41a257";
							  text_val = window.language.locale == "zh" ? "和" : "T";
						  }

						  arr[e][i] = new createjs.Shape();
						  arr[e][i].graphics.beginFill(color).drawCircle(0,0,14);
						  arr[e][i].x = e *30.5;
						  arr[e][i].y = (i *32) +3;
						  let color = "#fff"
						  if(sel == "dice" || sel == "sum") {
							  color = "#000"
						  }
						  arr[e][i].text = new createjs.Text(text_val, window.language.locale == "zh" ? font_size+" lato" : "bold "+font_size+" lato", color);
						  arr[e][i].text.x = arr[e][i].x;
						  arr[e][i].text.y = arr[e][i].y - 1;

						  arr[e][i].text.textAlign = "center";
						  arr[e][i].text.textBaseline = "middle";

						  _target[sel+"_container"].addChild(arr[e][i], arr[e][i].text);
					  }
				  } //end for
			  } //end if
		  } //end for

		  _target[sel+"_container"].x = 95;
		  _target[sel+"_container"].y = 12;
	},
	udpateLast5(_target, self) {

		  let container;
			container = _target
		  container.last_5_res_container.removeAllChildren();
		  container.hot_cold_container.removeAllChildren();

		  // == data 
		  _target.data.marks = _.filter(_target.data.marks, (m)=>{
		  	if(m.game_info && typeof m.game_info ==='string') {
		  		m.game_info = JSON.parse(m.game_info)
		  	} 
		  	return m;
		  });

		  _target.data.marks.forEach(function (row) {
			  row.total = _.reduce( [row.game_info.one, row.game_info.two, row.game_info.three] , function (sum, n) {
							  return parseInt(sum) + parseInt(n);
						  });
		  });

		  // == hot cold 
		  let hotCold = _.clone(_.filter(_target.data.marks, (m)=>{
		  	return !m.isVoid
		  }));

		  let res =_.sortBy( _.groupBy(hotCold, function(row) {
			   return row.total
		   }), 'length');

		  let cold_res = res.slice(0,5);

		  let hot_res = res.slice(Math.max(res.length - 5, 1));
		  hot_res = _.map(hot_res, function (e) {
			  return isNaN(e[0].total) ? 1 : e[0].total;
		  });
		  cold_res = _.map(cold_res, function (e) {
			  return isNaN(e[0].total) ? 1 : e[0].total;
		  });

			hot_res = hot_res.reverse();
			
		  hot_res.forEach( (e, i) => {
			  let text = new createjs.Text(e, "20px BebasNeue" ,"#fff");
			  text.y = i*30;
			  text.x = 10;
			  text.textAlign = "center";
			  container.hot_cold_container.addChild(text)
		  });

		  cold_res.forEach( (e, i) => {
			  let text = new createjs.Text(e, "20px BebasNeue" ,"#fff");
			  text.y = i*30;
			  text.x = 40;
			  text.textAlign = "center";
			  container.hot_cold_container.addChild(text)
		  });

		  // === last 5 res

		  let marks = _.clone(_target.data.marks).reverse().slice(0,5);

		  let diceres = [];
		  let size = [];
		  let total = [];
		  
		  _target.shoe_cnt_text.text = marks.length;

		  for(var i = 0; i  < marks.length; i++) {
			  let dice = marks[i].game_info.one +""+ marks[i].game_info.two +""+ marks[i].game_info.three;

			  diceres.push({
				  dice1 : new createjs.Bitmap(self.context.getResources("dice-" + dice[0])),
				  dice2 : new createjs.Bitmap(self.context.getResources("dice-" + dice[1])),
				  dice3 : new createjs.Bitmap(self.context.getResources("dice-" + dice[2]))
			  });


			  diceres[i].dice1.y = (i*32);
			  diceres[i].dice2.y = (i*32);
			  diceres[i].dice3.y = (i*32);

			  diceres[i].dice1.x = 0;
			  diceres[i].dice2.x = 26;
			  diceres[i].dice3.x = 26*2;

			  diceres[i].dice1.scaleX = diceres[i].dice1.scaleY = .26
			  diceres[i].dice2.scaleX = diceres[i].dice2.scaleY = .26
			  diceres[i].dice3.scaleX = diceres[i].dice3.scaleY = .26

			  container.last_5_res_container.addChild(diceres[i].dice1);
			  container.last_5_res_container.addChild(diceres[i].dice2);
			  container.last_5_res_container.addChild(diceres[i].dice3);

			  let totalnum = _.reduce(dice.split("") , function (sum, n) {
						  return parseInt(sum) + parseInt(n);
					  });

			  let uniqDice = _.uniq(dice.split(""));

			  let text = uniqDice.length == 1 ? "T" : (totalnum >= 11 ? "B" : "S");

			  size[i] = new createjs.Text(text, "26px BebasNeue", text == "T" ? "#3aa955": (text == "B"? "#d22f2f"  : "#1665c1"));

			  size[i].x = diceres[i].dice3.x + 34;
			  size[i].y = diceres[i].dice3.y + 12.5;
			  size[i].textBaseline = "middle";
			  container.last_5_res_container.addChild(size[i]);

			  total[i] = new createjs.Text(totalnum, "26px BebasNeue", text == "T" ? "#3aa955": (text == "B"? "#d22f2f"  : "#1665c1"));
			  total[i].x = size[i].x + 14;
			  total[i].y = size[i].y;
			  total[i].textBaseline = "middle";
			  container.last_5_res_container.addChild(total[i]);

			  if(marks[i].game_info.isVoid || marks[i].isVoid) {
				  let voidContainer = new createjs.Container();

				  let voidShape = new createjs.Shape();
				  voidShape.graphics.beginFill("#212120").drawRect(-15,-4,140,30);
				  voidContainer.addChild(voidShape);
				  voidContainer.y = diceres[i].dice1.y;
				  voidContainer.x = 0;

				  let voidText = new createjs.Text("GAME VOID", "14px lato", "#fff");
				  voidText.set({x: -2, y: (30/2) - 4, textBaseline:"middle"});
				  voidContainer.addChild(voidText);

				  let voidImg = new createjs.Bitmap(self.context.getResources("void"));
				  voidImg.set({x: voidText.x + voidText.getMeasuredWidth() + 5 , regY: voidImg.getBounds().height/2, y: (30/2) - 4});
				  voidContainer.addChild(voidImg);

				  container.last_5_res_container.addChild(voidContainer);
			  }
		  }
	},
	updateScoreboard (_target,self) {
		// == double triple cnt
		let data = _target.data.marks;

	  data = _.filter(data = _.filter(data, (d) => {
	  	if('game_info' in d) {
	  		return d;
	  	}
	  }), (data) => {
	  	return data.game_info && !data.isVoid;
	  })

	  let data2 = format().fnsbDataHelper(data);

	  data2.forEach((e) => {
		  e.dice = [e.one, e.two, e.three]
	  });

	  let double_count = 0;
	  let triple_count = 0;

	  data2.forEach(function (e) {
		  if(_.uniq(e.dice).length == 2 ) {
			  double_count++;
		  } else if(_.uniq(e.dice).length == 1) {
			  triple_count++;
		  }
	  });

	  _target.double_val.text = double_count;
	  _target.triple_val.text = triple_count;

	  
		  //set data
		  let result = {
			  total : data.length,
			  big : 0,
			  small: 0,
			  odd : 0,
			  even :0
		  }

		  let sum = 0;

		  data = _.filter (_.filter(data, (d)=>{
			  if('game_info' in d) return d;
		  }), (data) =>{
		  	if(data.game_info) return data;
		  });

		  data = _.filter(data, (d)=>{
			  if(d.game_info && typeof d.game_info === 'string') {
					d.game_info = JSON.parse(d.game_info);
			  }
				return !d.isVoid;
		  });

		  data.forEach((row)=>{
			  let dice = [parseInt(row.game_info.one), parseInt(row.game_info.two), parseInt(row.game_info.three)];

			  sum = _.reduce(dice, (sum, n) => {
								  return parseInt(sum) + parseInt(n)
							  });

			  if(sum % 2 == 0) result.even ++;
			  else result.odd ++;

			  if(sum >= 11) result.big ++;
			  else result.small ++;
		  });

		  _target.small_percent.text = Math.round((result.small / result.total) * 100) + "%";
		  _target.big_percent.text = Math.round((result.big / result.total) * 100) + "%";
		  _target.odd_percent.text = Math.round((result.odd / result.total) * 100) + "%";
		  _target.even_percent.text = Math.round((result.even / result.total) * 100) + "%";

		  _target.small_percent.x = _target.small_bar.x - _target.small_percent.getMeasuredWidth();
		  _target.even_percent.x = _target.even_bar.x - _target.even_percent.getMeasuredWidth();

		  _target.odd_bar.scaleX = result.odd /  result.total;
		  _target.even_bar.scaleX = result.even /  result.total;
		  _target.big_bar.scaleX = result.big /  result.total;
		  _target.small_bar.scaleX = result.small /  result.total;

		  //Stat count
		  let totalSmall = parseInt(result.small);
		  let totalBig = parseInt(result.big);
		  let totalBigSmall = totalBig + totalSmall;

		  if (totalBigSmall) {
			  // Set vertical data
			  _target.player_win_stat.scaleY = totalSmall/totalBigSmall;
			  _target.player_lose_stat.scaleY = totalBig/totalBigSmall;

			  // Set horizontal data
			  _target.eye_player_win.scaleX = totalSmall/totalBigSmall;
			  _target.eye_player_lose.scaleX = totalBig/totalBigSmall;
		  }
	}
}

export default {
	sicbo
}