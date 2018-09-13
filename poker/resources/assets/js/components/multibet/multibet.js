import multibetListen from '../../listeners/multibet-events';
import format from '../../factories/formatter';
import dboard from '../../factories/scoreboard_draw';
import drawTables  from './multibetTableDraw';
import pred from './multibetPrediction';
import Xpacket from '../../lib/XPacket';
import timer_anim from './multiTimer';

import {confirmButton, clearButton, repeatButton, initButton } from './multiButtons';

import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, getSlaveParam } from '../../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		games: [],
		data: [],
		selected_games : [],
		marks : [],
		bg : [],
		theme: window.theme,
		g_height : 190,
		multibetGames : [],
		isRoom: (window.isRoom && window.isBanker) === undefined ? false : (window.isRoom && window.isBanker),
		main() {

			multibetListen(this);

			let mask = new createjs.Shape();
			mask.graphics.beginFill("red").drawRect(0,0,220,this.context.stage.baseHeight - 190);
			this.selected_games_container = new createjs.Container();
			this.addChild(this.selected_games_container);

			this.fixed_games_container = new createjs.Container();
			this.fixed_games_container.wheelHitArea = new createjs.Shape();
			this.fixed_games_container.wheelHitArea.graphics.beginFill("red").drawRect(0,0,220,this.context.stage.baseHeight - 190);
			this.fixed_games_container.wheelHitArea.alpha = 0.01;
			this.addChild(this.fixed_games_container);

			this.all_games_container = new createjs.Container();
			this.fixed_games_container.addChild(this.fixed_games_container.wheelHitArea, this.all_games_container);

			this.color_settings = this.context.theme_color[this.theme]; // color settings for theme
		},
		createGames (multibetgames) {

			this.all_games_container.removeAllChildren();
			this.current_games = multibetgames;

			for(var x = 0; x < multibetgames.length; x++) {
				this.marks[x] = multibetgames[x].marks

				this.games[x] = new createjs.Container();
				this.games[x].index = x;
				this.games[x].data = multibetgames[x];
				this.games[x].bets = [];
				this.games[x].logs = [];
				this.games[x].betting_start = false;
				this.games[x].temp_money = 0;
				this.games[x].response_cleared = false;
				this.games[x].response_confirmed = false;

				this.games[x].socket_link = window.socket + multibetgames[x].gameName +"/"+multibetgames[x].tableNumber;

				this.games[x].y = this.games[x].index * this.g_height;
				this.games[x].currentRound = multibetgames[x].currentRound;
				this.games[x].game = multibetgames[x].tableNumber + "_" + multibetgames[x].gameName;
				this.all_games_container.addChild(this.games[x]);

				this.games[x].totalGameBetAmt = 0;

				// === bet areas container
				this.games[x].betarea = [];
				this.games[x].betareas_container = new createjs.Container();
				this.games[x].betareas_container.x = 0
				this.games[x].betareas_container.alpha = 0
				this.games[x].addChild(this.games[x].betareas_container);

				this.bg[x] = new createjs.Shape();
				this.bg[x].graphics.beginLinearGradientFill([this.color_settings.multibetgradColor1,this.color_settings.multibetgradColor2],[0,1],0,0,0,100).drawRect(0,0,218,this.g_height);
				this.bg[x].setBounds(0,0,218,this.g_height);
				this.games[x].addChild(this.bg[x]);

				this.games[x].road_map_container = new createjs.Container();
				this.games[x].road_map_container.set({y: 48})
				this.games[x].roadmap_bg_container = new createjs.Container();
				this.games[x].roadmap_bg_container.set({y: 16})

				let rmColor = "#fff";
				let rmLines = "#2b2b2b";

				if(multibetgames[x].gameName == "Pula-Puti") {
					rmColor = "#636363";
					rmLines = "rgba(255,255,255,0.2)";
				}

				let rmBg = new createjs.Shape();
				rmBg.graphics.beginFill(rmColor).drawRect(10,37,152,114);
				this.games[x].roadmap_bg_container.addChild(rmBg);

				let lines = new createjs.Shape();
				lines.graphics.ss(1).s(rmLines);
				this.games[x].roadmap_bg_container.addChild(lines);

				// == roadmap bg
				for(var e = 0; e < 6; e++) {
					lines.graphics.moveTo(10,(e*19)+37).lineTo((8*19)+10,(e*19)+37)
				}

				for(var i = 0; i < 8; i++) {
					lines.graphics.moveTo((i*19)+10,37).lineTo((i*19)+10,(6*19)+37)
				}
				lines.graphics.moveTo((8*19)+10, (6*19) + 37).lineTo((8*19)+10, 37)
				lines.graphics.moveTo((8*19)+10, (6*19) + 37).lineTo(10, (6*19) + 37)

				this.games[x].addChild(this.games[x].roadmap_bg_container);
				this.games[x].addChild(this.games[x].road_map_container);

				if(this.games[x].data.gameName == "Baccarat" || this.games[x].data.gameName == "Dragon-Tiger") {
					// prediction
					this.games[x].pred_bg_player = pred().player_prediction(this.games[x].data, this);
					this.games[x].pred_bg_player.target_game = this.games[x]
					this.games[x].pred_bg_player.set({x:163, y:37.5 + 16, visible: false})

					this.games[x].pred_bg_player.on("click",(e) => {
						if(e.currentTarget.target_game.data.gameName == "Baccarat") {
							this.context.component_multibetRoadmap.predictMarks(e.currentTarget.target_game,"p")
						} else {
							this.context.component_multibetRoadmap.predictMarks(e.currentTarget.target_game,"d")
						}
					});

					this.games[x].pred_bg_banker = pred().banker_prediciton(this.games[x].data, this);
					this.games[x].pred_bg_banker.target_game = this.games[x]
					this.games[x].pred_bg_banker.set({x:186, y:37.5 + 16, visible:false})

					this.games[x].pred_bg_banker.on("click",(e) => {
						if(e.currentTarget.target_game.data.gameName == "Baccarat") {
							this.context.component_multibetRoadmap.predictMarks(e.currentTarget.target_game,"b")
						} else {
							this.context.component_multibetRoadmap.predictMarks(e.currentTarget.target_game,"z")
						}
					});

					this.games[x].addChild(this.games[x].pred_bg_player, this.games[x].pred_bg_banker)
				}

				// shoe count
				this.games[x].shoe_cnt_bg = new createjs.Shape();
				this.games[x].shoe_cnt_bg.graphics.ss(2).s(this.color_settings.text_color).drawRoundRect(176,132 + 6,34,30,6);

				this.games[x].shoe_cnt_text = new createjs.Text(this.games[x].data.marks.length, "24px bebasNeue", this.color_settings.text_color);
				this.games[x].shoe_cnt_text.set({textAlign:"center", textBaseline: "middle" , x:193, y:136+17});

				if(this.games[x].data.gameName === 'Baccarat' || this.games[x].data.gameName === 'Dragon-Tiger') {
					this.games[x].addChild(this.games[x].shoe_cnt_bg);
					this.games[x].addChild(this.games[x].shoe_cnt_text);
				}

				// === player stat
				this.games[x].player_win_stat = new createjs.Shape();
				this.games[x].player_win_stat.graphics.beginFill("#0d47a1").drawRect(0,0,15,86);
				this.games[x].player_win_stat.x = 173;
				this.games[x].player_win_stat.y = 152 + 12;
				this.games[x].player_win_stat.regY = 86;
				// this.games[x].addChild(this.games[x].player_win_stat);

				this.games[x].player_lose_stat = new createjs.Shape();
				this.games[x].player_lose_stat.graphics.beginFill("#b71c1c").drawRect(0,0,15,86);
				this.games[x].player_lose_stat.x = 173 + 22;
				this.games[x].player_lose_stat.y = 152 + 12;
				this.games[x].player_lose_stat.regY = 86;
				// this.games[x].addChild(this.games[x].player_lose_stat);

				this.games[x].result_container = new createjs.Container();

				this.games[x].cosmetics_container = new createjs.Container();

				this.games[x].eye_view_container = new createjs.Container();
        this.games[x].eye_view_container.name = "eye_view";
				this.games[x].eye_view_container.alpha = 0;
				this.games[x].eye_view_container.x = 10;

				let eyeMask = new createjs.Shape();
				eyeMask.graphics.drawRect(0,0,1200,this.g_height);
				eyeMask.x = 220;
				this.games[x].eye_view_container.mask = eyeMask;

				// === eye view container
				this.games[x].addChild(this.games[x].eye_view_container);

				this.games[x].eye_panel_container = new createjs.Container();
				this.games[x].addChild(this.games[x].eye_panel_container)

				this.games[x].imgBg = new createjs.Shape();
				this.games[x].imgBg.graphics.beginFill("#d12e2e").drawCircle(0, 0, 42);
				this.games[x].imgBg.x = 64;
				this.games[x].imgBg.y = 72 + 10;
				this.games[x].eye_panel_container.addChild(this.games[x].imgBg);

				// var image = document.createElement("img");
				// image.crossOrigin = "Anonymous";
				// image.src = sample_games_multibet[x].dealerImage;

				this.games[x].dealer_img = new createjs.Bitmap();
				// this.games[x].dealer_img.image = image;
				this.games[x].dealer_img.x = 22;
				this.games[x].dealer_img.y = 29 + 10;
				this.games[x].dealer_img.scaleX = this.games[x].dealer_img.scaleY = 0.65;
				this.games[x].eye_panel_container.addChild(this.games[x].dealer_img);
				this.games[x].eye_panel_container.visible = false;

				this.games[x].dealer_id = multibetgames[x].dealerId;

				// For blob dealer image
				$.post(`/getDealerImg`, {dealerId : multibetgames[x].dealerId}, (response) => {
					for (var j = 0; j < this.games.length; j++) {
						if (this.games[j].dealer_id == response[0].id) {
							let dbImage = new Image();
							dbImage.src = response[0].dealer_image;

							this.games[j].dealer_img.image = dbImage;
							this.games[j].dealer_img.mask = this.games[j].imgBg;
						}
					}
        });

				if(multibetgames[x].gameName != 'Pula-Puti') {
					// == eye container player win
					this.games[x].eye_player_win = new createjs.Shape();
					this.games[x].eye_player_win.graphics.beginFill("#0d47a1").drawRect(0,0,175,15);
					this.games[x].eye_player_win.x = 20
					this.games[x].eye_player_win.y = 118 + 12
					this.games[x].eye_panel_container.addChild(this.games[x].eye_player_win);

					this.games[x].eye_player_lose = new createjs.Shape();
					this.games[x].eye_player_lose.graphics.beginFill("#b71c1c").drawRect(0,0,175,15);
					this.games[x].eye_player_lose.x = 20;
					this.games[x].eye_player_lose.y = 118 + 18  + 12;
					this.games[x].eye_panel_container.addChild(this.games[x].eye_player_lose);
				}

				this.setExtraEyeData(this.games[x]);  //if there is extra data

				this.games[x].dealer_name = new createjs.Text(multibetgames[x].currentDealer, "20px latobold",this.color_settings.dealer_color);
				this.games[x].dealer_name.x = 115;
				this.games[x].dealer_name.y = 68;
				this.games[x].eye_panel_container.addChild(this.games[x].dealer_name);

				this.games[x].game_buttons_container = new createjs.Container();
				this.games[x].game_buttons_container.table = true;
				let shape = new createjs.Shape();
				shape.graphics.beginLinearGradientFill([this.context.theme_color["black"].multibetgradColor1,this.context.theme_color["black"].multibetgradColor2],[0,1],0,0,0,(this.g_height/2)).drawRoundRectComplex(0,0,65,this.g_height,0,10,10,0);
				shape.x = -235.5;
				shape.y = -88;
				shape.table = true;

				this.games[x].game_buttons_container.addChild(shape)
				// this.games[x].game_buttons_container.addChild(initButton().gradient_background_1,initButton().gradient_background_2,initButton().gradient_background_3);

				this.games[x].confirmButton = confirmButton();
				this.games[x].confirmButton.set({x:-240, y:-30, scaleX: 0.65, scaleY: 0.65});

				this.games[x].clearButton = clearButton();
				this.games[x].clearButton.set({x:-232, y:-82, scaleX: 0.5, scaleY: 0.5});

				this.games[x].repeatButton = repeatButton();
				this.games[x].repeatButton.set({x:-232, y:42, scaleX: 0.5, scaleY: 0.5});

				this.games[x].game_buttons_container.addChild(this.games[x].confirmButton, this.games[x].clearButton, this.games[x].repeatButton);
				this.games[x].game_buttons_container.visible = false

				this.games[x].game_buttons_container.y = 88;

				this.context.component_multibetRoadmap.update(this.games[x].data, this.games);//mini road map

				if(multibetgames[x].gameName == "Sicbo") {
					// this.context.component_multibetRoadmap.sicbo_roadmap(x, this.games); //mini road map

					drawTables(this).drawSicbo(this.games[x]); //sicbo bet areas
					drawTables(this).drawSicboInfo(this.games[x]); //dice info on betting
					drawTables(this).drawSicboRoadMap(this.games[x]); //eye view roadmap

					// drawTables(this).setScoreBoardText(this.games[x].data.marks, this.games[x]);//eye view roadmap
					drawTables(this).doubleTripleCount(this.games[x]);//eye view roadmap

					this.games[x].game_buttons_container.y = 80 + 44.5;
				}

				if(multibetgames[x].gameName == "Poker") {
					// this.context.component_multibetRoadmap.poker_roadmap(x, this.games);//mini road map

					for(var i = 0; i < multibetgames[x].meta.length; i++) {
						if(typeof(multibetgames[x].meta[i].gameInfo) == "string") {
							multibetgames[x].meta[i].gameInfo = JSON.parse(multibetgames[x].meta[i].gameInfo);
						}

						if(typeof(multibetgames[x].meta[i].gameResult) == "string") {
							multibetgames[x].meta[i].gameResult = JSON.parse(multibetgames[x].meta[i].gameResult);
						}
					}

					drawTables(this).drawPoker(this.games[x]); //poker bet areas
					drawTables(this).pokerSetResult(this.games[x].data.meta, this.games[x]); // table on eye view
					drawTables(this).pokerEyeRoadmapUpdate(this.games[x]); //eye view road map

					this.games[x].betareas_container.addChild(this.games[x].flop_area); //extra bet areas
					this.games[x].betareas_container.addChild(this.games[x].turn_area);//extra bet areas
					this.games[x].betareas_container.addChild(this.games[x].river_area);//extra bet areas
				}

				if(multibetgames[x].gameName == "Baccarat") {
					drawTables(this).drawBaccarat(this.games[x]); //baccarat bet areas
					drawTables(this).drawBaccaratRoadMap(this.games[x].data.marks, this.games[x], "init");  // eye view roadmap
					drawTables(this).updateBaccaratScoreBoard(this.games[x].data.marks, this.games[x]); // eye view roadmap
					drawTables(this).checkPrediction(_.clone(this.games[x].data.marks),"baccarat", this.games[x]); // eye view roadmap
				}

				if(multibetgames[x].gameName == "Pula-Puti") {
					drawTables(this).drawRedWhite(this.games[x]); //baccarat bet areas
					drawTables(this).drawRedWhiteRoadmap(this.games[x]);//eye view roadmap
					drawTables(this).setRDscoreboard(this.games[x]);//eye view roadmap
				}

				if(multibetgames[x].gameName == "Dragon-Tiger") {
					drawTables(this).drawDragonTiger(this.games[x]); //dragontiger bet areas
					drawTables(this).drawDtRoadMap(this.games[x].data.marks, this.games[x]);//eye view roadmap
					drawTables(this).updateDtScoreBoard(this.games[x].data.marks, this.games[x]);//eye view roadmap
					drawTables(this).checkPrediction(_.clone(this.games[x].data.marks),"dragon-tiger", this.games[x]); // eye view roadmap
				}

				if(this.games[x].data.slave && ( _.includes(this.games[x].data.slave, 'bonus') ||  _.includes(this.games[x].data.slave, 'supersix'))) {

					this.games[x].currentSlave = 'normal';

					this.games[x].slave_buttons = [];

					if(this.games[x].data.gameName == "Baccarat") {

						this.games[x].normal_toggle = this.createToggleButton("normal");
						this.games[x].normal_toggle.data = this.games[x].data
						this.games[x].betareas_container.addChild(this.games[x].normal_toggle);

						this.games[x].normal_toggle.on("click", (e) => {
							this.toggleSlave(e.currentTarget.data, e.currentTarget.children[0], 'normal');
						});

						this.games[x].slave_buttons.push(this.games[x].normal_toggle);

						if(_.find(this.games[x].data.slave, (slave) => { return slave == 'supersix'}) ) {
							this.games[x].supersix_toggle = this.createToggleButton("supersix");
							this.games[x].supersix_toggle.data = this.games[x].data;
							this.games[x].betareas_container.addChild(this.games[x].supersix_toggle);
							// //supersix toggle
							this.games[x].supersix_toggle.on("click", (e) => {
								this.toggleSlave(e.currentTarget.data, e.currentTarget.children[0], 'supersix');
							});
							this.games[x].slave_buttons.push(this.games[x].supersix_toggle);
						}

						if(_.find(this.games[x].data.slave, (slave) => { return slave == 'bonus'}) ) {
							this.games[x].bonus_toggle = this.createToggleButton("bonus");
							this.games[x].bonus_toggle.data = this.games[x].data
							this.games[x].betareas_container.addChild(this.games[x].bonus_toggle);

							this.games[x].bonus_toggle.on("click", (e) => {
								this.toggleSlave(e.currentTarget.data, e.currentTarget.children[0], 'bonus');
							});
							this.games[x].slave_buttons.push(this.games[x].bonus_toggle);
						}
						// setting slave buttons position
						for(var i = 0; i < this.games[x].slave_buttons.length; i++) {
							let w = this.games[x].slave_buttons.length === 2 ? 58 : 15
							this.games[x].slave_buttons[i].x =  ((i * 85) + (450/this.games[x].slave_buttons.length)) - w;
							this.games[x].slave_buttons[i].ox = this.games[x].slave_buttons[i].x;
						}

					} // end if baccarat toggle

					if(this.games[x].data.gameName == "Poker") {
						this.games[x].bonus_plus_toggle = this.createToggleButton("bonusplus");
						this.games[x].bonus_plus_toggle.set({x:150, ox:150})
						this.games[x].bonus_plus_toggle.data = this.games[x].data
						this.games[x].betareas_container.addChild(this.games[x].bonus_plus_toggle);

						this.games[x].poker_toggle = this.createToggleButton("classicPoker");
						this.games[x].poker_toggle.set({x:250 - 10, ox:250 - 10})
						this.games[x].poker_toggle.data = this.games[x].data
						this.games[x].betareas_container.addChild(this.games[x].poker_toggle);

						this.games[x].slave_buttons.push(this.games[x].bonus_plus_toggle, this.games[x].poker_toggle);

						this.games[x].poker_toggle.on("click", (e) => {
							this.toggleSlave(e.currentTarget.data, e.currentTarget.children[0], 'classicPoker');
						});

						this.games[x].bonus_plus_toggle.on("click", (e) => {
							this.toggleSlave(e.currentTarget.data, e.currentTarget.children[0], 'bonusplus');
						});
					} //end if poker toggle
				}

				this.games[x].game_buttons_container.x = this.games[x].game_buttons_container.ox = this.games[x].betareas_container.children[0].getTransformedBounds().width  + 235;

				for(var i = 0; i < this.games[x].betarea.length; i++) {
					this.games[x].betareas_container.addChild(this.games[x].betarea[i]);
				}

				// === cosmetics
				this.games[x].betareas_container.addChild(this.games[x].cosmetics_container);

				// // === eye view container
				// this.games[x].addChild(this.games[x].eye_view_container);

				// === chips mcontainer
				this.games[x].chips_container = new createjs.Container();
				this.games[x].betareas_container.addChild(this.games[x].chips_container);
				this.games[x].betareas_container.addChild(this.games[x].game_buttons_container);
				// === result view
				this.games[x].result_bg = _.clone(this.bg[x]);
				this.games[x].result_bg.visible = false;
				this.games[x].result_container.visible = false;
				this.games[x].addChild(this.games[x].result_bg, this.games[x].result_container);

				this.games[x].game_description = new createjs.Text('',"21px latoregular", this.color_settings.text_color);
				this.games[x].game_description.x = 41;
				this.games[x].game_description.y = 4;

				let gameNameText = "";
				// game name and num
				if(multibetgames[x].gameName == "Poker") {
					gameNameText = window.language.gamename.poker_game;
					this.games[x].fold_check_container = new createjs.Container();
					this.games[x].betareas_container.addChild(this.games[x].fold_check_container);
				}

				if(multibetgames[x].gameName == "Baccarat") {
					gameNameText = window.language.gamename.baccarat_game;
				}

				if(multibetgames[x].gameName == "Dragon-Tiger") {
					gameNameText = window.language.gamename.dragontiger_game;
				}

				if(multibetgames[x].gameName == "Sicbo") {
					gameNameText = window.language.gamename.sicbo_game;
				}

				if(multibetgames[x].gameName == "Pula-Puti") {
					gameNameText = window.language.gamename.redwhite_game;
				}

				this.games[x].game_description.text = gameNameText;

				this.games[x].game_round = new createjs.Text(multibetgames[x].currentRound,"14px latoregular", this.color_settings.text_color);
				this.games[x].game_round.y = this.games[x].game_description.y + 18;
				this.games[x].game_round.x = this.games[x].game_description.x;
				this.games[x].game_round.visible = false;

				this.games[x].addChild(this.games[x].game_description, this.games[x].game_round);

				this.games[x].gamenum = new createjs.Text(multibetgames[x].tableNumber.length > 1 ? multibetgames[x].tableNumber : "0"+multibetgames[x].tableNumber ,"22px latobold",this.color_settings.text_color);
				this.games[x].gamenum.x = 10;
				this.games[x].addChild(this.games[x].gamenum);

				this.setGameDesc(this.games[x]);
				// this.games[x].gamenum.y = this.games[x].game_description.y;

				// === timer
				this.games[x].timer = timer_anim(); //new createjs.Shape();
				this.games[x].timer.set({x: 10, y: 44, oy : 44, alpha : 1, visible: false})
				this.games[x].addChild(this.games[x].timer);

				// === mininmize icon
				let min_hit = new createjs.Shape();
				min_hit.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(0,0,this.g_height,35);
				min_hit.set({rotation: 0, x: -165, y: -10, is_minimize_btn: true});
				if(multibetgames[x].gameName === 'Sicbo') {
					min_hit.set({rotation: 0, x: -355, y: -10, is_minimize_btn: true, scaleX: 2});
				}
				this.games[x].minimize_btn = new createjs.Container();
				let min_arrow1 = new createjs.Shape();
				min_arrow1.graphics.beginFill("#efdf82").drawRoundRect(0,-2,4,20,2.5);
				min_arrow1.rotation = 35;
				min_arrow1.is_minimize_btn = true;
				let min_arrow2 = new createjs.Shape();
				min_arrow2.graphics.beginFill("#efdf82").drawRoundRect(0,0,4,20,2.5);
				min_arrow2.rotation = -35;
				min_arrow2.is_minimize_btn = true;
				this.games[x].minimize_btn.addChild(min_hit, min_arrow1, min_arrow2);
				this.games[x].betareas_container.addChild(this.games[x].minimize_btn);
				this.games[x].minimize_btn.set({x : this.games[x].betareas_container.children[0].getBounds().width - 25, ox: this.games[x].betareas_container.children[0].getBounds().width - 25})
				this.games[x].minimize_btn.y = 25;
				this.games[x].minimize_btn.is_minimize_btn = true;
				this.games[x].minimize_btn.target_game = this.games[x];
				this.games[x].minimize_btn.rotation = -90

				this.games[x].minimize_btn.addEventListener("click",(e)=> {
					this.toggleMinimize(e.currentTarget);
				});

				this.games[x].minimize_btn.addEventListener("mouseover",(e)=> {
        	$('body').css('cursor','pointer');
					e.currentTarget.children[0].graphics.clear().beginFill("rgba(255,255,255,0.2)").drawRect(0,0,this.g_height,35);
				});

				this.games[x].minimize_btn.addEventListener("mouseout",(e)=> {
        	$('body').css('cursor','default');
					e.currentTarget.children[0].graphics.clear().beginFill("rgba(255,255,255,0.01)").drawRect(0,0,this.g_height,35);
				});

				// link icon
        let ss = new createjs.SpriteSheet({
          images: ["/img/multibet/link_icon.png"],
          frames: {width:34, height: 15}
        })
        this.games[x].link_icon = new createjs.Sprite(ss);
        this.games[x].link_icon.x = 175;
        this.games[x].link_icon.y = 80;
        this.games[x].link_icon.oy = 80;
        this.games[x].link_icon.hitArea = new createjs.Shape();
        this.games[x].link_icon.hitArea.graphics.beginFill("#000").drawRect(0, 0, 34, 15);
        this.games[x].link_icon.on("mouseover", (e) => {
        	if (this.isRoom) return;
        	e.target.gotoAndStop(1);
        	$('body').css('cursor','pointer');
        });
        this.games[x].link_icon.on("mouseout", (e) => {
        	if (this.isRoom) return;
        	e.target.gotoAndStop(0);
        	$('body').css('cursor','default');
        });
        this.games[x].link_icon.redirecting = false;
        this.games[x].addChild(this.games[x].link_icon);
        this.games[x].link_icon.on("click", (e) => {
        	if (this.isRoom) return;
          e.target.redirecting = true;
          let link = e.target.parent.links.game;
          window.location = link;
        })
       	// plus icon
				let plushit = new createjs.Shape();
				plushit.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(-15,-15,30,30);
				this.games[x].addChild(plushit);

				this.games[x].plus_icon = new createjs.Container();
				this.games[x].plus_icon.x = 195 - 6;
				this.games[x].plus_icon.y = 18;
				this.games[x].plus_icon.addChild(plushit);

				// this.games[x].is_selected = false;
				let plus1 = new createjs.Shape();
				plus1.graphics.beginFill(this.color_settings.plusBtn).drawRoundRect(0,-8,4,21,2);
				let plus2 = new createjs.Shape();
				plus2.graphics.beginFill(this.color_settings.plusBtn).drawRoundRect(-8,0,21,4,2);

				this.games[x].plus_icon.addChild(plus1, plus2);
				this.games[x].targ_game = this.games[x];
				this.games[x].addChild(this.games[x].plus_icon);

				this.games[x].plus_icon.active = (e) => {
					createjs.Tween.get(e)
					.to({
						rotation : 45
					},150)

					e.children[1].graphics.clear().beginFill(this.color_settings.closebtn).drawRoundRect(0,-8,4,21,2);
					e.children[2].graphics.clear().beginFill(this.color_settings.closebtn).drawRoundRect(-8,0,21,4,2);
				}

				this.games[x].plus_icon.default = (e) => {
					createjs.Tween.get(e)
					.to({
						rotation : 0
					},150)

					e.children[1].graphics.clear().beginFill(this.color_settings.plusBtn).drawRoundRect(0,-8,4,21,2);
					e.children[2].graphics.clear().beginFill(this.color_settings.plusBtn).drawRoundRect(-8,0,21,4,2);
				}

				let eye_hit_icon = new createjs.Shape();
				eye_hit_icon.graphics.beginFill("rgba(0,0,0,0.03)").drawRect(0,0,40,28);

				let eye = new createjs.SpriteSheet({
        	images: [this.context.getResources(window.theme+'_eye_icon')],
        	frames: {width: 74/2, height: 23},
        	animations: {
						"up": [0],
						"hover" : [1],
					}
		    });

				this.games[x].eyeImg = new createjs.Sprite(eye, "up");
				// this.games[x].eyeImg.scaleX = this.games[x].eyeImg.scaleY = 0.36;
				this.games[x].eyeImg.on("mouseover", (e) => {
					e.target.gotoAndStop(1);
        	$('body').css('cursor','pointer');
				});
				this.games[x].eyeImg.on("mouseout", (e) => {
					e.target.gotoAndStop(0);
					$('body').css('cursor','default');
				});

				this.games[x].eye_icon = new createjs.Container();
		    this.games[x].eye_icon.x = this.games[x].link_icon.x;
				this.games[x].eye_icon.y = this.games[x].plus_icon.y + 28;
				this.games[x].eye_icon.addChild(eye_hit_icon, this.games[x].eyeImg)

				this.games[x].eye_icon.is_minimize_btn = true;
				this.games[x].eye_icon.target_view = this.games[x];
				this.games[x].eye_icon.is_show = false;
				this.games[x].is_show = false;

				this.games[x].plus_icon.on("click", (e) => {
					// if(window.userAuthority != 'admin') return;
        	if (this.isRoom) return;

					if(e.currentTarget.is_selected) {
						if(e.currentTarget.parent.targ_game.isBetting) return; //dont minimize if betting
						e.currentTarget.default(e.currentTarget); // set deafult/active plus_icon

						createjs.Tween.get(e.currentTarget.parent.targ_game.betareas_container)
						.to({
							alpha : 0,
							x : 0
						},150)
						.call( () => {
							this.reRender("remove", e.currentTarget.parent.targ_game);
						})

						e.currentTarget.parent.targ_game.removeAllEventListeners();
						this.removeSelectedBet(e.currentTarget.parent.targ_game);



					} else {

						if(this.selected_games.length == 3) return;

						e.currentTarget.active(e.currentTarget); // set deafult/active plus_icon

						createjs.Tween.get(e.currentTarget.parent.targ_game.betareas_container)
						.to({
							x : 220,
							alpha : 1
						},150);

						this.reRender("add", e.currentTarget.parent.targ_game);
					}

					e.currentTarget.is_selected = !e.currentTarget.is_selected;
				});

				this.games[x].eye_icon.on("click",(e) => {
					if(!e.currentTarget.is_show) {

						this.games.forEach((tar) => {
							tar.eye_icon.is_show = false
		        	tar.eyeImg.gotoAndStop(0);
							tar.eye_icon.is_show = false;
							tar.is_show = false;

							tar.eye_view_container.alpha = 0;
							tar.eye_view_container.x = 0;
							tar.link_icon.y = tar.link_icon.oy
						});

						createjs.Tween.get(e.currentTarget.target_view.eye_view_container)
						.wait(100)
						.to({
							x : 220,
							alpha : 1
						},150)

						e.currentTarget.is_show = true
						e.currentTarget.alpha = 1;
						e.currentTarget.target_view.link_icon.y += 16;
					} else {
						e.currentTarget.alpha = 1;
						e.currentTarget.target_view.link_icon.y = e.currentTarget.target_view.link_icon.oy
						e.currentTarget.is_show = false
						createjs.Tween.get(e.currentTarget.target_view.eye_view_container)
						.to({
							x : 0,
							alpha : 0
						},150)
					}
					this.toggleEyeView(e.currentTarget.is_show, e.currentTarget.target_view);
				});

				this.games[x].addChild(this.games[x].eye_icon);

				/// player win
				this.games[x].player_win_val = new createjs.Text("0","30px bebasNeue","#fff");
				this.games[x].addChild(this.games[x].player_win_val);
				this.games[x].player_win_val.x = this.games[x].betareas_container.children[0].getBounds().width - 55;//20;
				this.games[x].player_win_val.textAlign = "right";
				this.games[x].player_win_val.textBaseline = "middle";
				this.games[x].player_win_val.y = 24; //this.games[x].betareas_container.children[0].getBounds().height-14;
				this.games[x].betareas_container.addChild(this.games[x].player_win_val);

				this.games[x].total_game_bet.x = this.games[x].betareas_container.children[0].x + 30
				this.games[x].total_game_bet.textBaseline= "middle";
				this.games[x].total_game_bet.textAlign = "left";
				this.games[x].total_game_bet.y =  24;//this.games[x].betareas_container.children[0].getBounds().height-14;
				this.games[x].total_game_bet.text = "0"

				//adjustment
				//
				if(this.games[x].data.gameName != "Poker") {
					this.games[x].cosmetics_container.children.forEach((e) => {
						e.y -= 16
					})

					for(var e = 0; e <this.games[x].betarea.length; e++ ) {
						this.games[x].betarea[e].y -= 18;
					}
				}

			}

			this.context.component_multibetBetting.register();
		},
		setGameDesc (target, type = 'deafult') {
			let font = "20px latoregular", y = 4, y2= 18, y3 = 0;
			if(type === 'deafult') {
				switch (window.language.locale) {
					case "zh":
						font = "20px latoregular";
						y3 = 3.5;
						break;
					case "th":
						font = "26px latoregular";
						y = -1.5;
						y3 = 3.5;
						break;
					case "en":
					case "jp":
						font = "22px latoregular";
						y = 3;
						break;
					case "kr":
						font = "20px latoregular";
						y = 6.5;
						y3 = 3.5;
						break;
				} // end swtitch
			} else {
				font = "16px latoregular";
				switch (window.language.locale) {
					case "zh":
						font = "18px latoregular";
						y3 = 3.5;
						break;
					case "th":
						font = "17px latoregular";
						y = 2;
						y2 = 20;
						y3 = 3.5;
						break;
					case "en":
					case "jp":
						font = "18px latoregular";
						y = 4;
						break;
					case "kr":
						font = "16px latoregular";
						y = 6.5;
						y3 = 3.5;
						break;
				} // end swtitch
			}

			target.game_description.font = font;
			target.game_description.y = y;
			target.gamenum.y = y3 ? y3 : target.game_description.y;
			target.game_round.y = target.game_description.y + y2;
		},
		changeTheme (new_theme) {
			this.context.component_multibetbar.changeTheme(new_theme);
			this.context.component_multinav.changeTheme(new_theme);
			this.theme = new_theme;

			this.gamesThemeChange(this.games, new_theme, false);
			this.gamesThemeChange(this.selected_games, new_theme, true);

			this.color_settings = this.context.theme_color[this.theme]; // color settings for theme
		},
		gamesThemeChange (game, new_theme, is_selected) {
			let newThemeColor = this.context.theme_color[new_theme];

			if(!game.length) return;
			for(var x = 0; x < game.length; x++) {
				try {

					let bgColor = !game[x].is_active ? [newThemeColor.multibetgradColor1, newThemeColor.multibetgradColor2] : newThemeColor.selected;
					let bgHeight = this.g_height;

					if(is_selected && game[x].data.gameName.toLowerCase() === 'sicbo') {
						bgHeight = this.g_height * 2;
					}

					if(!game[x].is_active){
						game[x].children[1].graphics.clear().beginLinearGradientFill(bgColor,[0,1],0,0,0,bgHeight - (bgHeight/2) ).drawRect(0,0,218,bgHeight);
					} else {
						game[x].children[1].graphics.clear().beginFill(bgColor).drawRect(0,0,218,bgHeight);
					}

					game[x].dealer_name.color =  newThemeColor.dealer_color;
					game[x].game_description.color = newThemeColor.text_color;
					game[x].game_round.color = newThemeColor.text_color;
					game[x].gamenum.color = newThemeColor.text_color;

					let eye = new createjs.SpriteSheet({
	        	images: [this.context.getResources(new_theme+'_eye_icon')],
	        	frames: {width: 74/2, height: 23},
	        	animations: {
							"up": [0],
							"hover" : [1],
						}
			    });

					game[x].eyeImg = new createjs.Sprite(eye, "up");
					game[x].eye_icon.removeChild(game[x].eye_icon.children[1]);
					game[x].eye_icon.addChild(game[x].eyeImg);

					game[x].plus_icon.children[1].graphics.clear().beginFill(newThemeColor.plusBtn).drawRoundRect(0,-8,4,21,2);
					game[x].plus_icon.children[2].graphics.clear().beginFill(newThemeColor.plusBtn).drawRoundRect(-8,0,21,4,2);

					game[x].shoe_cnt_text.color = newThemeColor.text_color;
					game[x].shoe_cnt_bg.graphics.clear().ss(2).s(newThemeColor.text_color).drawRoundRect(176,132 + 6,34,30,6);

				} catch(err) {

				}
			}
		},
		toggleEyeView (show, target) {
			this.games.forEach((target)=>{
				target.player_win_stat.visible = true;
				target.player_lose_stat.visible = true;
				target.road_map_container.visible = true;
				target.eye_panel_container.visible = false;
				target.roadmap_bg_container.visible = true;

				target.link_icon.visible = true;
				target.shoe_cnt_bg.visible = true;
				target.shoe_cnt_text.visible = true;
			});

			if(show) {
				target.player_win_stat.visible = false;
				target.player_lose_stat.visible = false;
				target.road_map_container.visible = false;
				target.eye_panel_container.visible = true;
				target.roadmap_bg_container.visible = false;

				target.link_icon.visible = true;
				target.shoe_cnt_bg.visible = false;
				target.shoe_cnt_text.visible = false;
				target.timer.visible = false;
			} else {
				target.player_win_stat.visible = true;
				target.player_lose_stat.visible = true;
				target.road_map_container.visible = true;
				target.eye_panel_container.visible = false;
				target.roadmap_bg_container.visible = true;

				target.link_icon.visible = true;
				target.shoe_cnt_bg.visible = true;
				target.shoe_cnt_text.visible = true;

				if(target.timer_start) {
					target.timer.visible = true;
				}
			}
		},
		setVoid (gameName, data) {
			switch(gameName) {
				case "Sicbo":
					drawTables(this).drawSicboInfo(data); //dice info on betting
					drawTables(this).drawSicboRoadMap(data); //eye view roadmap
					drawTables(this).doubleTripleCount(data);//eye view roadmap
					break;
				case "Poker":
					drawTables(this).pokerSetResult(data.data.meta, data); // table on eye view
					drawTables(this).pokerEyeRoadmapUpdate(data); //eye view road map
					break;
				case "Baccarat":
					drawTables(this).drawBaccaratRoadMap(data.data.marks, data);  // eye view roadmap
					drawTables(this).updateBaccaratScoreBoard(data.data.marks, data); // eye view roadmap
					drawTables(this).checkPrediction(_.clone(data.data.marks),"baccarat", data); // eye view roadmap
					break;
				case "Dragon-Tiger":
					drawTables(this).drawDtRoadMap(data.data.marks, data);//eye view roadmap
					drawTables(this).updateDtScoreBoard(data.data.marks, data);//eye view roadmap
					drawTables(this).checkPrediction(_.clone(data.data.marks),"dragon-tiger", data); // eye view roadmap
					break;
			}
		},
		predictRoadMap (game, type) {

			let cloned_marks = _.clone(game.data.marks);
			cloned_marks.push({mark : type});

			if(game.data.gameName == "Baccarat") {

				drawTables(this).drawBaccaratRoadMap(cloned_marks, game);
				// drawTables(this).updateBaccaratScoreBoard(cloned_marks , game);

				setTimeout(() => {
					drawTables(this).drawBaccaratRoadMap(game.data.marks, game);
					// drawTables(this).updateBaccaratScoreBoard(game.data.marks, game);
				},2500)
			} else {

				drawTables(this).drawDtRoadMap(cloned_marks, game);//eye view roadmap
				// drawTables(this).updateDtScoreBoard(cloned_marks, game);//eye view roadmap

				setTimeout(() => {

					drawTables(this).drawDtRoadMap(game.data.marks, game);//eye view roadmap
					// drawTables(this).updateDtScoreBoard(game.data.marks, game);//eye view roadmap

				},2500)
			}
		},
		toggleMinimize (minButton) {

			if(!minButton.target_game.minimized) {

				minButton.rotation = 90;
				minButton.children[0].set({x: -25, y: -10, scaleX: 1});
				if(minButton.target_game.data.gameName == 'Sicbo') {
					minButton.children[0].set({rotation: 0, x: -25, y: -10, is_minimize_btn: true, scaleX: 2});
				}

				minButton.x = minButton.target_game.betareas_container.children[0].getTransformedBounds().width - 10

				createjs.Tween.get(minButton.target_game.betareas_container)
				.to({
					x : minButton.target_game.betareas_container.x - (minButton.target_game.betareas_container.children[0].getTransformedBounds().width - 40)
				},100)

				minButton.target_game.minimized = true;

				minButton.target_game.cosmetics_container.visible = false;

				minButton.target_game.betareas_container.children.forEach((area, x) => {
					if(area.table) {
						area.visible = false
					}
				});

				if(minButton.target_game.betboard_2) {
					minButton.target_game.betboard_2.visible = false
				}

				if(minButton.target_game.is_active) {
					minButton.target_game.game_buttons_container.visible = true;
				}

			} else {
				minButton.x = minButton.target_game.betareas_container.children[0].getTransformedBounds().width - 30

				minButton.rotation = -90;
				minButton.children[0].set({rotation: 0, x: -165, y: -6, is_minimize_btn: true, scaleX: 1});
				if(minButton.target_game.data.gameName == 'Sicbo') {
					minButton.children[0].set({rotation: 0, x: -355, y: -6, is_minimize_btn: true, scaleX: 2});
				}

				createjs.Tween.get(minButton.target_game.betareas_container)
				.to({
					x : minButton.target_game.betareas_container.x + (minButton.target_game.betareas_container.children[0].getTransformedBounds().width - 40)
				},100)

				minButton.target_game.minimized = false;

				minButton.target_game.cosmetics_container.visible = true;

				let areasToShow;

				if (minButton.target_game.data.slave && minButton.target_game.currentSlave === 'supersix') {
					areasToShow = ['supersix'];
				}

				if (minButton.target_game.data.slave && minButton.target_game.currentSlave === 'bonus') {
					areasToShow = ['bonus_banker', 'bonus_player', 'big', 'small'];
				}

				if (minButton.target_game.data.slave && minButton.target_game.currentSlave === 'bonusplus') {
					areasToShow = ['pocket', 'bonusplus'];
				}

				if (minButton.target_game.data.slave && minButton.target_game.currentSlave === 'normal' && minButton.target_game.data.gameName === 'Poker') {
					areasToShow = ['bonus'];
				}

				if (minButton.target_game.data.gameName === 'Sicbo') {
					areasToShow = ['big', 'small'];
				}

				minButton.target_game.betareas_container.children.forEach((area, x) => {
					if(area.table != "bonus" && area.table != "supersix" && area.table != "bonus_banker" && area.table != "bonus_player" && area.table != "big" && area.table != "small" && area.table != "bonusplus" && area.table != "pocket") {
						area.visible = true
					}
					if(_.includes(areasToShow, area.table)) {
						area.visible = true
					}
				});

				if(minButton.target_game.betboard_2) {
					minButton.target_game.betboard_2.visible = true
				}
			}
		},
		resetSlave (data) {

			let tables = ['supersix','small', 'big', 'bonus_banker', 'bonus_player', 'bonusplus', 'pocket'];
			this.selected_games.forEach((game) => {
				if (game.data.gameName === data.gameName && data.tableNumber === game.data.tableNumber) {
					if(game.isBetting) return;
					else {

						game.link_icon.y = game.link_icon.oy;
						game.eye_icon.is_show = false;

						game.minimize_btn.x = game.minimize_btn.ox;

						if(data.gameName == 'Baccarat') {

							game.currentSlave = 'normal';

							if(!game.data.slave.length) return;

							// reset shape and buttons position
							game.slave_buttons.forEach((button) => {
								button.x = button.ox;
								button.children[0].graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(["#fff39f", "#c3a240"], [0,1], 0,0,0,15).drawRoundRect(0,0,button.children[0].getBounds().width, 20, 10);
							});

							// == setting degfault ttogle button to classic
							game.normal_toggle.children[0].graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(["#c3a240", "#fff39f"], [0,1], 0,0,0,15).drawRoundRect(0,0,game.normal_toggle.children[0].getBounds().width, 20, 10);

							createjs.Tween.get(game.betareas_container.children[0])
							.to({
								scaleX : 1
							}, 100)
							.call((e) =>{
								game.player_win_val.x = game.betareas_container.children[0].getTransformedBounds().width - 55;
							}, [game]);

							createjs.Tween.get(game.game_buttons_container)
							.to({
								x : game.game_buttons_container.ox
							}, 100)

							for(var x = 0;x < game.betarea.length;  x++ ) {
					  		game.betarea[x].x = game.betarea[x].ox;
					  		game.betarea[x].payout_multiplier = game.betarea[x].o_payout_multiplier;

					  		if(game.betarea[x].table == "tie") {
									game.betarea[x].graphics.clear().beginFill("#689f38").drawRoundRect(0,0,game.betarea[x].getBounds().width,114,2);
					  			game.betarea[x].setBounds(0,0,game.betarea[x].getBounds().width,114);
								}// end if

								if(_.includes(tables, game.betarea[x].table)) {
									game.betarea[x].visible = false;
								}
							} //end for

							for(var a = 0; a < game.cosmetics_container.children.length;  a++ ) {
								game.cosmetics_container.children[a].x = game.cosmetics_container.children[a].ox

								if(game.cosmetics_container.children[a].supersixSlave || game.cosmetics_container.children[a].bonusSlave) {
									game.cosmetics_container.children[a].visible = false
								}// end if
							} // end for
						} else if(data.gameName == 'Poker' && data.slave) {
							if(!game.data.slave.length) return;

							// == setting degfault ttogle button to classic
							game.poker_toggle.children[0].graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(["#c3a240", "#fff39f"], [0,1], 0,0,0,15).drawRoundRect(0,0,game.poker_toggle.children[0].getBounds().width, 20, 10);
							game.bonus_plus_toggle.children[0].graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(["#fff39f", "#c3a240"], [0,1], 0,0,0,15).drawRoundRect(0,0,game.bonus_plus_toggle.children[0].getBounds().width, 20, 10);

							game.bonus_plus_toggle.x = game.bonus_plus_toggle.ox;
							game.poker_toggle.x = game.poker_toggle.ox;

							game.currentSlave = 'normal';

							createjs.Tween.get(game.betareas_container.children[0])
							.to({
								scaleX : 1
							}, 100)
							.call((game) =>{
								game.player_win_val.x = game.betareas_container.children[0].getTransformedBounds().width - 55;
							}, [game]);

							createjs.Tween.get(game.game_buttons_container)
							.to({
								x : game.game_buttons_container.ox
							}, 100)

							let areas = ['flop_area', 'turn_area', 'river_area'];
							areas.forEach((a) => {
								game[a].x = game[a].ox
							});

							for(var x = 0; x < game.betarea.length; x++) {
								if(_.includes(tables, game.betarea[x].table)) {
									game.betarea[x].visible = false;
								} else {
									game.betarea[x].x = game.betarea[x].ox;
									game.betarea[x].visible = true;
								}
							}

							game.cosmetics_container.children.forEach((c) => {
								try{
									c.x = c.ox;
									game.visible = true;
								} catch(err){

								}
							});
						} //end else if
					} //end if
				}
			});

			return;
		},
		toggleSlave (data, button, type) {

			let parentTarget = button.parent.parent.parent;

			if(parentTarget.currentSlave === type) return;

			if(parentTarget.isBetting) {
				return;
			}

			this.resetSlave(data)

			if(parentTarget.data.gameName == 'Baccarat') {
				parentTarget.slave_buttons.forEach((button) => {
					button.x = button.ox;
					button.children[0].graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(["#fff39f", "#c3a240"], [0,1], 0,0,0,15).drawRoundRect(0,0,button.children[0].getBounds().width, 20, 10);
				});
			}

			if(parentTarget.data.gameName == 'Poker') {
				parentTarget.bonus_plus_toggle.children[0].graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(["#fff39f", "#c3a240"], [0,1], 0,0,0,15).drawRoundRect(0,0,parentTarget.bonus_plus_toggle.children[0].getBounds().width, 20, 10);
				parentTarget.poker_toggle.children[0].graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(["#fff39f", "#c3a240"], [0,1], 0,0,0,15).drawRoundRect(0,0,parentTarget.poker_toggle.children[0].getBounds().width, 20, 10);

				parentTarget.bonus_plus_toggle.x = parentTarget.bonus_plus_toggle.ox;
				parentTarget.poker_toggle.x = parentTarget.poker_toggle.ox;
			}

			this.selected_games.forEach((e, i) => {
				if(e.data.gameName == data.gameName && data.tableNumber == e.data.tableNumber) {
					if(data.gameName == "Baccarat") {
						// == superix baccarat
						switch(type) {
							case "supersix" :

								parentTarget.currentSlave = 'supersix';

								button.graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(["#c3a240", "#fff39f"], [0,1], 0,0,0,15).drawRoundRect(0,0,button.getBounds().width, 20, 10);
								e.slave_visible = true;
								for(var x = 0;x < e.betarea.length;  x++ ) {
									if(e.betarea[x].table == "tie") {
										e.betarea[x].graphics.clear().beginFill("#689f38").drawRoundRect(0,0,e.betarea[x].getBounds().width,(114/2)-2,2);
						  				e.betarea[x].setBounds(0,0,e.betarea[x].getBounds().width,(114/2)-2);
									} //end if

									if(e.betarea[x].table == "supersix") {
						  				e.betarea[x].visible = true
									} //end if

									if(e.betarea[x].table == "banker") {
						  				e.betarea[x].payout_multiplier = 1
									} //end if

								} //end for

								for(var a = 0;a < e.cosmetics_container.children.length;  a++ ) {
									if(e.cosmetics_container.children[a].supersixSlave) {
										e.cosmetics_container.children[a].visible = true
									} //end if
								} //end for

								// this.context.component_multibetBetting.repeatBetEvent({currentTarget: {target_game: parentTarget}}, true , true); // check if slave has bets

								parentTarget.data.slave = "supersix";
								this.context.component_multibetRoadmap.baccarat_roadmap(i, this.selected_games, parentTarget.data)
								break;
							case "normal":

								parentTarget.currentSlave = 'normal';
								button.graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(["#c3a240", "#fff39f"], [0,1], 0,0,0,15).drawRoundRect(0,0,button.getBounds().width, 20, 10);
								e.slave_visible = false;

								for(var x = 0;x < e.betarea.length;  x++ ) {
									if(e.betarea[x].table == "tie") {
										e.betarea[x].graphics.clear().beginFill("#689f38").drawRoundRect(0,0,e.betarea[x].getBounds().width,114,2);
						  				e.betarea[x].setBounds(0,0,e.betarea[x].getBounds().width,114);
									}// end if
								}// end for

								parentTarget.data.slave = "";
								this.context.component_multibetRoadmap.baccarat_roadmap(i, this.selected_games);
								break;
							case "bonus"	:
								if(e.betareas_container.children[0].scaleX > 1) return;

								parentTarget.currentSlave = 'bonus';

								if(e.game_buttons_container.x == e.game_buttons_container.ox) {
									createjs.Tween.get(e.game_buttons_container)
									.to({
										x : 634.4  + 222
									}, 200)
								}

								createjs.Tween.get(e.betareas_container.children[0])
								.to({
									scaleX : 1.3
								}, 200)
								.call((e, parentTarget) => {

									e.player_win_val.x = e.betareas_container.children[0].getTransformedBounds().width - 55;

									e.minimize_btn.x = e.betareas_container.children[0].getTransformedBounds().width - 25

									e.bonus_toggle.children[0].graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(["#c3a240", "#fff39f"], [0,1], 0,0,0,15).drawRoundRect(0,0,e.bonus_toggle.children[0].getBounds().width , 20, 10);

									e.slave_buttons.forEach((button) => {
										button.x += 74
									});

									for(var x = 0;x < e.betarea.length;  x++ ) {
										if(e.betarea[x].table == "big" || e.betarea[x].table == "small" || e.betarea[x].table == "bonus_player" || e.betarea[x].table == "bonus_banker") {
							  				e.betarea[x].visible = true
										}// end if

										if(e.betarea[x].table!= "big" &&  e.betarea[x].table != "bonus_player") {
											e.betarea[x].x += 74
										}
									}// end for

									for(var a = 0;a < e.cosmetics_container.children.length;  a++ ) {
										if(e.cosmetics_container.children[a].bonusSlave) {
											e.cosmetics_container.children[a].visible = true
											if(e.cosmetics_container.children[a].move) e.cosmetics_container.children[a].x += 74
										}// end if
										else {
											e.cosmetics_container.children[a].x += 74
										}
									} // end for

									// this.context.component_multibetBetting.repeatBetEvent({currentTarget: {target_game: parentTarget}}, true , true); // check if slave has bets

								}, [e, parentTarget]);

								parentTarget.data.slave = "bonus";
								this.context.component_multibetRoadmap.baccarat_roadmap(i, this.selected_games);
								break;
						}

						this.disconnectSocket(parentTarget);
						this.connectToSocket(parentTarget);
					} else if(data.gameName == "Poker") {
						switch(type) {
							case "classicPoker":
								parentTarget.currentSlave = 'normal';
								e.poker_toggle.children[0].graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(["#c3a240", "#fff39f"], [0,1], 0,0,0,15).drawRoundRect(0,0,e.poker_toggle.children[0].getBounds().width, 20, 10);
								break;
							case "bonusplus":
								parentTarget.currentSlave = 'bonusplus';

								e.bonus_plus_toggle.children[0].graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(["#c3a240", "#fff39f"], [0,1], 0,0,0,15).drawRoundRect(0,0,e.bonus_plus_toggle.children[0].getBounds().width, 20, 10);

								if(e.betareas_container.children[0].scaleX > 1) return;


								parentTarget.currentSlave = 'bonusplus';

								if(e.game_buttons_container.x == e.game_buttons_container.ox) {
									createjs.Tween.get(e.game_buttons_container)
									.to({
										x : 507  + 235
									}, 200)
								}

								createjs.Tween.get(e.betareas_container.children[0])
								.to({
									scaleX : 1.3
								}, 200)
								.call((e, parentTarget) => {

									parentTarget.slave_buttons.forEach((slaveB) => {
										slaveB.x = slaveB.ox + 54
									});

									e.minimize_btn.x = e.betareas_container.children[0].getTransformedBounds().width - 25

									e.player_win_val.x = e.betareas_container.children[0].getTransformedBounds().width - 55;

									let areas = ['flop_area', 'turn_area', 'river_area'];
									areas.forEach((a) => {
										e[a].x = e[a].ox + 130
									});

									e.betarea.forEach((table)=>{
										if(table.table == 'bonusplus' || table.table == 'pocket') table.visible = true;
										if(table.table == 'bonus') table.visible = false;
										if(table.table == 'ante') table.x = table.ox + 130;
									});

									e.cosmetics_container.children.forEach((c) => {
										try{
											c.x = c.ox + 130
										} catch(err){

										}
									});


									this.context.component_multibetBetting.repeatBetEvent({currentTarget: {target_game: parentTarget}}, true , true, true); // check if slave has bets
									this.pokerCheck(parentTarget);

								},[e, parentTarget]);
								break;
						}

						this.disconnectSocket(parentTarget);
						this.connectToSocket(parentTarget);
					}
					this.context.component_multibetBetting.checkButtonState(e)
				} // end cehck
			});

			parentTarget.logs = [];
		},
		updateEyeData (data) {
			if(this.selected_games.length) { //selected games
				for(var x = 0; x  <this.selected_games.length; x++) {
					if(this.selected_games[x].game == data.tableId+"_"+data.gameName) {

						this.context.component_multibetRoadmap.update(this.selected_games[x].data,this.selected_games)//updates mini roadmap

						switch (data.gameName) {
							case "Poker" :
								this.selected_games[x].data.meta = data.meta;
								drawTables(this,x).pokerSetResult(data.meta,this.selected_games[x]);
								drawTables(this,x).pokerEyeRoadmapUpdate(this.selected_games[x]);
								break;
							case "Baccarat" :
								// this.selected_games[x].data.marks.push(data.mark);
								// this.context.component_multibetRoadmap.baccarat_roadmap(x,this.selected_games)//updates mini roadmap

								drawTables(this,x).drawBaccaratRoadMap(this.selected_games[x].data.marks,this.selected_games[x]);
								drawTables(this,x).updateBaccaratScoreBoard(this.selected_games[x].data.marks, this.selected_games[x]);
							break;
							case "Sicbo" :
								// this.selected_games[x].data.marks.push(data.mark);
								// this.context.component_multibetRoadmap.sicbo_roadmap(x,this.selected_games)//updates mini roadmap

								drawTables(this,x).drawSicboRoadMap(this.selected_games[x]);
								drawTables(this,x).doubleTripleCount(this.selected_games[x]);
							break;
							case "Dragon-Tiger" :
								// this.selected_games[x].data.marks.push(data.mark);
								// this.context.component_multibetRoadmap.dragontiger_roadmap(x,this.selected_games)//updates mini roadmap
								drawTables(this,x).drawDtRoadMap(this.selected_games[x].data.marks, this.selected_games[x]);
								drawTables(this,x).updateDtScoreBoard(this.selected_games[x].data.marks, this.selected_games[x]);
							break;
						}
					}
				}
			}

			for(var x = 0; x  <this.games.length; x++) {
				if(this.games[x].game == data.tableId+"_"+data.gameName) {
					switch (data.gameName) {
						case "Poker" :
							this.games[x].data.meta = data.meta;
							drawTables(this,x).pokerSetResult(data.meta,this.games[x]);
							drawTables(this,x).pokerEyeRoadmapUpdate(this.games[x]);
							break;
						case "Baccarat" :
							drawTables(this,x).drawBaccaratRoadMap(this.games[x].data.marks, this.games[x]);
							drawTables(this,x).updateBaccaratScoreBoard(this.games[x].data.marks, this.games[x]);
							break;
						case "Dragon-Tiger" :
							drawTables(this,x).drawDtRoadMap(this.games[x].data.marks, this.games[x]);
							drawTables(this,x).updateDtScoreBoard(this.games[x].data.marks, this.games[x]);
							break;
						case "Sicbo" :
							drawTables(this,x).drawSicboRoadMap(this.games[x]);
							// drawTables(this,x).setScoreBoardText(this.games[x].data.marks, this.games[x]);
							drawTables(this,x).doubleTripleCount(this.games[x]);
							break
					}
				} // end if
			} // end for
		},
		/**
		 * redraws target to normal state
		 * @param target obj
		 */
		removeSelectedBet(game) {
			game.is_active = false;
			game.betareas_container.children[0].graphics.clear().beginFill(this.color_settings.inactive).drawRect(0,0,game.betareas_container.children[0].getBounds().width, game.betareas_container.children[0].getBounds().height);
			game.children[1].graphics.clear().beginLinearGradientFill([this.color_settings.multibetgradColor1,this.color_settings.multibetgradColor2],[0,1],0,0,0,100).drawRect(0,0,218,this.g_height);
			game.height = this.g_height
			this.toggleResultVeiw(game, false)
		},
		/**
		 * redraws target to normal state
		 * @param target obj
		 */
		removeActive (game) {
			game.is_active = false;
			game.betareas_container.children[0].graphics.clear().beginFill(this.color_settings.inactive).drawRect(0,0,game.betareas_container.children[0].getBounds().width, game.betareas_container.children[0].getBounds().height);
			game.children[1].graphics.clear().beginLinearGradientFill([this.color_settings.multibetgradColor1,this.color_settings.multibetgradColor2],[0,1],0,0,0,100).drawRect(0,0,218,this.g_height);
			if(game.game.indexOf("icbo") > -1) {
				game.children[1].graphics.clear().beginLinearGradientFill([this.color_settings.multibetgradColor1,this.color_settings.multibetgradColor2],[0,1],0,0,0,100).drawRect(0,0,218,this.g_height + this.g_height);
			}
			game.height = this.g_height
			this.toggleResultVeiw(game, false)
		},
		/**
		 * displays result win/lose state to game
		 * @param (obj, string, bol)
		 */
		winLoseState(game, winner ,win) {
			if(game.data.gameName != "Sicbo") {
				if(winner == "tiger" || winner == "banker" || winner == "dealer") {
					game.children[1].graphics.clear().beginFill("#7f1d1d").drawRect(0,0,218,this.g_height);
				}
				else if(winner == "tie" || winner == "suited tie") {
					game.children[1].graphics.clear().beginFill("#689f38").drawRect(0,0,218,this.g_height);
				}
				else {
					game.children[1].graphics.clear().beginFill("#0c3e66").drawRect(0,0,218,this.g_height);
				}
			} else {
				game.children[1].graphics.clear().beginFill("#0c3e66").drawRect(0,0,218,this.g_height+this.g_height);
			}
		},
		tableWinning (area, isStyle) {
			let color = "rgba(255,255,255,0.4)";
			if(isStyle) {
		  	area.graphics.clear().beginFill(color).drawRoundRect(0,0,area.getBounds().width,area.getBounds().height, !area.radius ? 5 : area.radius);
			}
  		createjs.Tween.get(area)
  		.to({ alpha : 1 }, 200)
  		.to({ alpha : 0 }, 200)
  		.to({ alpha : 1 }, 200)
  		.to({ alpha : 0 }, 200)
  		.to({ alpha : 1 }, 200)
  		.to({ alpha : 0 }, 200)
  		.to({ alpha : 1 }, 200)
  		.call((area) => {
				let color = "rgba(255,255,255,0.01)";
  			if(area.parent.parent.data.gameName.toLowerCase() === 'sicbo') {
		  		area.graphics.clear().beginFill(color).drawRoundRect(0,0,area.getBounds().width,area.getBounds().height, !area.radius ? 5 : area.radius);
  			}
  		}, [area]);
		},
		playerWinLose (win, game, amt) {
			if(win) {
				// game.gamenum.visible = false;
				game.gamenum.color = "#000";
				game.game_round.color = "#000";
				game.game_description.color = "#000";

				game.player_win_val.text = "+ " + this.numberWithCommas(amt);

				game.player_win_val.visible = true;

				game.children[1].graphics.clear().beginLinearGradientFill(["#d9be6a","#f0e182","#d9be6a"],[0,0.5,1], 60,0,150,0,150,0).drawRect(0,0,218,this.g_height);

				if(game.game.indexOf("icbo") > -1) {
					game.children[1].graphics.clear().beginLinearGradientFill(["#d9be6a","#f0e182","#d9be6a"],[0,0.5,1], 20,0,100,0,150,0).drawRect(0,0,218,this.g_height + this.g_height);
				}
			} else {
				game.betareas_container.children[0].graphics.clear().beginFill(this.color_settings.inactive).drawRect(0,0,game.betareas_container.children[0].getBounds().width, game.betareas_container.children[0].getBounds().height);
				game.children[1].graphics.clear().beginLinearGradientFill([this.color_settings.multibetgradColor1, this.color_settings.multibetgradColor2],[0,1],0,0,0,100).drawRect(0,0,218,this.g_height);
				if(game.game.indexOf("icbo") > -1) {
					game.children[1].graphics.clear().beginLinearGradientFill([this.color_settings.multibetgradColor1, this.color_settings.multibetgradColor2],[0,1],0,0,0,100).drawRect(0,0,218,this.g_height + this.g_height);
				}
			}
		},
		defaultState(game) {
			game.game_description.visible = true;
			// game.game_round.visible = true;
			// game.player_win_val.visible = false;
			game.gamenum.visible =true;
			if(game.is_active) {

				game.betareas_container.children[0].graphics.clear().beginFill(this.color_settings.active).drawRect(0,0,game.betareas_container.children[0].getBounds().width, game.betareas_container.children[0].getBounds().height);
				game.children[1].graphics.clear().beginFill(this.color_settings.selected).drawRect(0,0,218,this.g_height);

				if(game.game.indexOf("icbo") > -1) {
					game.children[1].graphics.clear().beginFill(this.color_settings.selected).drawRect(0,0,218,this.g_height + this.g_height);
				}

				if(game.game.toLowerCase().indexOf("poker") > -1) {
					game.poker_raise_button.visible = false;//new createjs.Shape();
					game.poker_fold_button.visible = false;//new createjs.Shape();
				}

			} else {
				game.betareas_container.children[0].graphics.clear().beginFill(this.color_settings.inactive).drawRect(0,0,game.betareas_container.children[0].getBounds().width, game.betareas_container.children[0].getBounds().height);
				game.children[1].graphics.clear().beginLinearGradientFill([this.color_settings.multibetgradColor1, this.color_settings.multibetgradColor2],[0,1],0,0,0,100).drawRect(0,0,218,this.g_height);
				if(game.game.indexOf("icbo") > -1) {
					game.children[1].graphics.clear().beginLinearGradientFill([this.color_settings.multibetgradColor1, this.color_settings.multibetgradColor2],[0,1],0,0,0,100).drawRect(0,0,218,this.g_height + this.g_height);
				}
			}
			game.totalGameBetAmt = 0;
		},
		activeWindowBet (target) {

			if(target.currentTarget.is_active && target.target.table) {
				return;
			}

			if(target.currentTarget.is_active && !target.target.table) {
				return;
			}

			this.active_game = {}

			target = target.currentTarget;

			if(target.is_active) {
				this.removeActive(target)
				return;
			}

			this.selected_games.forEach((game) => {
				game.betareas_container.children[0].graphics.clear().beginFill(this.color_settings.inactive).drawRect(0,0,game.betareas_container.children[0].getBounds().width, game.betareas_container.children[0].getBounds().height);
				game.is_active = false
				game.game_buttons_container.visible = false;

				game.game_description.color = this.color_settings.text_color;
				game.game_round.color = this.color_settings.text_color;
				game.gamenum.color = this.color_settings.text_color;

				if(game.game.indexOf("icbo") > -1) {
					game.children[1].graphics.clear().beginLinearGradientFill([this.color_settings.multibetgradColor1,this.color_settings.multibetgradColor2],[0,1],0,0,0,100).drawRect(0,0,218,this.g_height + this.g_height);
					game.height = this.g_height + this.g_height
				} else {
					game.children[1].graphics.clear().beginLinearGradientFill([this.color_settings.multibetgradColor1, this.color_settings.multibetgradColor2],[0,1],0,0,0,100).drawRect(0,0,218,this.g_height);
					game.height = this.g_height;
				}
			});

			let width = target.betareas_container.children[0].getBounds().width
			let height = target.betareas_container.children[0].getBounds().height
			let width2 = target.children[1].getBounds().width;
			let height2 = target.children[1].getBounds().height;

			target.children[1].graphics.clear().beginFill(this.color_settings.selected).drawRect(0,0,width2, height2)
			target.betareas_container.children[0].graphics.clear().beginFill(this.color_settings.active).drawRect(0,0,width, height);

			target.game_buttons_container.visible = true;
			target.is_active = true;

			if(target.game.indexOf("icbo") > -1) {
				target.betareas_container.children[0].graphics.clear().beginFill(this.color_settings.active).drawRect(0,0,width, height);
				target.children[1].graphics.clear().beginFill(this.color_settings.selected).drawRect(0,0,width2, height2+this.g_height)
			}

			target.game_description.color = this.color_settings.text_color;
			target.game_round.color = this.color_settings.text_color;
			target.gamenum.color = this.color_settings.text_color;

			this.active_game = {
				gameName : target.game,
				game : target
			}
		},
		reRender (type, target) {
			let mask = new createjs.Shape();
			mask.graphics.clear().beginFill("red").drawRect(0,0,this.context.stage.baseWidth,(this.all_games_container.getBounds() ? this.all_games_container.getBounds().height :  this.g_height) + this.g_height);

			this.fixed_games_container.mask = mask;

			if(type == "add") {
				this.selected_games.push(target);
				this.toggleEyeView(false, target)
				this.games.splice(this.selected_games[this.selected_games.length-1].index,1);

				this.all_games_container.removeChild(this.selected_games[this.selected_games.length-1]);
				this.selected_games_container.addChild(this.selected_games[this.selected_games.length-1]);
				// === adding event listener to game
				if(this.selected_games[this.selected_games.length-1].data.gameName == "Sicbo" || this.selected_games[this.selected_games.length-1].data.gameName == "Poker") {
					// this.selected_games[this.selected_games.length-1].timer.y = 32
				}
				this.selected_games[this.selected_games.length-1].eye_icon.visible = false;
				this.selected_games[this.selected_games.length-1].link_icon.visible = false;
				this.selected_games[this.selected_games.length-1].shoe_cnt_text.visible = false;
				this.selected_games[this.selected_games.length-1].shoe_cnt_bg.visible = false;
				this.selected_games[this.selected_games.length-1].eye_view_container.alpha = 0;
				this.selected_games[this.selected_games.length-1].game_round.visible = true;
				try {
					this.selected_games[this.selected_games.length-1].pred_bg_player.visible = true;
					this.selected_games[this.selected_games.length-1].pred_bg_banker.visible = true;
				} catch (err) {

				}

				let tables = ['supersix', 'big', 'small', 'bonus_banker', 'bonus_player', 'bonusplus', 'pocket']
				this.selected_games[this.selected_games.length-1].betareas_container.children.forEach((area) => {
					if(area.table && !_.includes(tables, area.table))  {
						area.visible = true;
					}
				});

				if(this.selected_games[this.selected_games.length-1].betboard_2) {
					this.selected_games[this.selected_games.length-1].betboard_2.visible = true
				}

				this.selected_games[this.selected_games.length-1].eye_view_container.x = 0;
				this.selected_games[this.selected_games.length-1].is_active = false
				this.selected_games[this.selected_games.length-1].totalWinning = 0
				this.selected_games[this.selected_games.length-1].addEventListener("click",this.activeWindowBet.bind(this), false);
				this.showExtraInfo(this.selected_games[this.selected_games.length-1])

				this.resetSlave(target.data);
				this.setGameDesc(this.selected_games[this.selected_games.length-1], "selected");

				this.connectToSocket(this.selected_games[this.selected_games.length-1]);

			} else if(type == "remove") {
				if(target.data.gameName == "Sicbo" || target.data.gameName == "Poker") {
					// target.timer.y = 44
				}
				target.eye_icon.visible = true;
				target.link_icon.visible = true;
				target.shoe_cnt_text.visible = true;
				target.shoe_cnt_bg.visible = true;
				try {
					target.pred_bg_player.visible = false;
					target.pred_bg_banker.visible = false;
				} catch (err) {

				}

				// reset gamen name
				if(target.data.gameName == "Poker") {
					target.game_description.text = window.language.gamename.poker_game;
				}

				if(target.data.gameName == "Baccarat") {
					target.game_description.text = window.language.gamename.baccarat_game;
				}

				if(target.data.gameName == "Dragon-Tiger") {
					target.game_description.text = window.language.gamename.dragontiger_game;
				}

				if(target.data.gameName == "Sicbo") {
					target.game_description.text = window.language.gamename.sicbo_game;
				}

				target.game_description.color = this.color_settings.text_color;
				target.game_round.visible = false;
				this.resetSlave(target.data);
				this.setGameDesc(target);

				this.games.unshift(target);
				this.all_games_container.addChild(target);

				this.selected_games = _.filter(this.selected_games, (e)=> {
					return e.game != target.game
				});
				target.game_buttons_container.visible = false;

				this.hideExtraInfo(target);

				this.disconnectSocket(target);
				this.resetSlave(target.data);

				if(target.data.gameName == 'Baccarat') {
					target.data.slave = "";
					this.context.component_multibetRoadmap.baccarat_roadmap(0, this.games);
				}

				if(target.minimized) {
					this.toggleMinimize(target.minimize_btn);
				}
			}

			this.fixed_games_container.y = 0;
			mask.y = 0;

			this.all_games_container.y = 0
			if(this.selected_games.length) {
				this.selected_games[0].y = 0;
			}

			for(var x = 0; x < this.selected_games.length; x++) {

				if(x > 0) {
					this.selected_games[x].y = this.selected_games[x-1].y + this.selected_games[x-1].height
				}
				this.fixed_games_container.y += this.g_height;
				mask.y += this.g_height;
				if(this.selected_games[x].game.indexOf("icbo") > -1) {
					mask.y += this.g_height
					this.fixed_games_container.y += this.g_height
				}
			}
			for(var x =0 ; x < this.games.length; x++) {
				this.games[x].index = x;
				this.games[x].y = ((x) * this.g_height);

				this.all_games_container.setChildIndex(this.games[x], x)
			}

		},
		disconnectSocket (game) {
			game.socket.disconnect();
		},
		connectToSocket (game) {
			game.socket = io.connect(game.socket_link , {
				transports: ['websocket']
			});

			let range;
			if(game.data.gameName ===  'Baccarat') {
				let tableSlave = game.currentSlave ? game.currentSlave : 'normal';
				if(tableSlave === 'normal') {
					range = `${game.bet_range.min}-${game.bet_range.max}`
				} else {
					range = `${game.bet_range.min}-${game.bet_range.max}_${game.currentSlave}`
				}
			} else {
				range = `${game.bet_range.min}-${game.bet_range.max}`
			}

			let initData = {
			    userId : window.userId,
			    range : range,
    			userName : window.user_name
			}

			// ** emit join room
			game.socket.on('connect', () => {
				game.socket.emit('data', {eventName : 'room', data: initData}, (d)=> {

					if(!d.roomates.length) return;

					let user = _.filter(d.roomates, (a) => {return a.userId === window.userId});

					console.log(user, "user")
					if(!user.length) return;
					console.log(user, "SUD")
					user = user[0];
					// == slave checking here
					if(user.bets.length) {
						let slave = user.bets[0].slave ? user.bets[0].slave : null;
						if(slave) {
							if(	range.split("_")[1]) {
								this.toggleSlave(game.data, game[range.split("_")[1]+"_toggle"].children[0], slave);
							}

							// === for poker
							if(user.bets[0].slave && user.bets[0].slave == 'bonusplus') {
								for(var x = 0; x < d.bets[range][game.currentRound].length; x++) {
									if(user.bets[x].bet == 'bonus') {
										user.bets.bet = 'pocket';
									}
								}
								this.toggleSlave(game.data, game.bonus_plus_toggle.children[0], 'bonusplus');
							} // end if
						}
					}

      		if(!user.bets.length) return;

      		let prev_bets = [];

          user.bets.forEach((data) => {
          	prev_bets.push({
							"amount" : data.bet_amount,
							"table_id": data.bet,
							"is_confirmed": true,
							"slave" : !data.slave ? '' : data.slave ,
							"cancel" : !data.cancel ? '' : data.cancel
        		});
        	});

        	prev_bets = _.uniqBy(prev_bets, 'table_id')

       		game.previous_bet = prev_bets;
        	game.bets = prev_bets;

        	if(game.data.roundStatus.toLowerCase() !== 'e') {
        		this.context.component_multibetBetting.repeatBetEvent({currentTarget: {target_game: game} }, true , true, true)
        	}

					game.betarea.forEach((e) => {
						e.chips.forEach((chip) => {
							chip.is_confirmed = true;
						});
					});
					game.is_confirmed = true;

					this.context.component_multibetBetting.checkButtonState(game);

					// == setting for poker extra bets /flop/turn/river
					if(game.data.gameName == "Poker") {

	        	if(game.data.roundStatus.toLowerCase() !== 'e') {
							this.pokerCheck(game);
						}

						if(game.timer_type != 'startround') {
							game.response_confirmed = true;
							this.context.component_multibetBetting.disableAllButtons(game)
						}

					} // end if poker

				});
			});

			// ** multiplayer event data
			game.socket.on("multi-player", (data) => {
        data = Xpacket.received(data)
        console.log("multiplayer data", data)
				switch(data.type) {
					case "bet" :
						if(data.id == window.userId) {
			        let total = 0;
			        let bets = [];
			        let actions = [];
			        for(var x = 0; x < data.data.length;x++) {

			        	if(data.data[x].slave && data.data[x].slave == 'bonusplus' && data.data[x].bet == 'bonus') {
			        		data.data[x].bet = 'pocket';
			        	}

		            bets[x] = {
		              "amount" : data.data[x].bet_amount,
		              "table_id" : data.data[x].bet,
		              "is_confirmed" : true,
		              "slave":  data.data[x].slave ? data.data[x].slave : "",
		              "cancel": data.data[x].cancel
		            }

		            total += data.data[x].bet_amount;

		            actions[x] = {
		              chip_amount_used:data.data[x].bet_amount,
		              drop_area: data.data[x].bet
		            }
			        }

			        game.previous_bet = bets;
			        game.bets = game.previous_bet;

							this.context.component_multibetBetting.repeatBetEvent({currentTarget: {target_game: game}}, true , true, true);

							game.betarea.forEach((e) => {
								e.chips.forEach((chip) => {
									chip.is_confirmed = true;
								});
							});
							game.is_confirmed = true;

			        this.context.component_multibetBetting.checkButtonState(game);


							if(game.data.gameName == 'Poker') {

				        let flopBet = _.find(bets, (e) => { return e.table_id == 'flop'});
				        let turnBet = _.find(bets, (e) => { return e.table_id == 'turn'});
				        let riverBet = _.find(bets, (e) => { return e.table_id == 'river'});

				        this.pokerCheck(game, false, true);
							} // end if

			        //**change bet detaik **//
					  }
						break;
					case "cancel" :
						if(data.id == window.userId) {
							this.context.component_multibetBetting.clearButtonEvent({currentTarget : game.clearButton }, true)
						}
						break;
				}
			});
		},
		/**
		 * shows extra game info on selected game for bets
		 * @param  game target
		 */
		showExtraInfo (target) {
			if(target.game.indexOf("icbo") > -1) {
				target.roadmap_bg_container.y += 182;
				target.road_map_container.y += 182;
				target.player_lose_stat.visible = false;
				target.player_win_stat.visible = false;
				target.hot_cold_container.visible = true;
				target.last_5_res_container.visible = true;
				target.hot_cold_bg_container.visible = true;
			} else {

			}
		},
		/**
		 * hides extra game info on selected game for bets
		 * @param  game target
		 */
		hideExtraInfo (target) {
			if(target.game.indexOf("icbo") > -1) {
				target.hot_cold_bg_container.visible = false;
				target.hot_cold_container.visible = false;
				target.last_5_res_container.visible = false;
				target.roadmap_bg_container.y -= 182;
				target.road_map_container.y -= 182;
				target.player_lose_stat.visible = true;
				target.player_win_stat.visible = true;
			} else {

			}
		},

		/**
		 * for card games shows card result
		 * @param  game target
		 */
		setCardResult (data) {

			for(var x = 0; x  < this.selected_games.length; x++ ) {
				if((this.selected_games[x].game) == (data.tableId + "_" +data.gameName) && this.selected_games[x].game.indexOf("icbo")  == -1) {
						if(data.gameName == "Dragon-Tiger") {
							if(data.type == "burn") return
						}
						this.selected_games[x].timer_start = false;
						this.toggleResultVeiw(this.selected_games[x],true);
						this.selected_games[x].game_description.text = window.language.betting.dealing

						if(this.selected_games[x].data.gameName == 'Poker') {
						  if(this.isBurnCard(data)) return;
						  this.pokerCheck(this.selected_games[x]);
						}

						drawTables(this).swipeCards(this.selected_games[x],data);
				} // end if
			} // end for

		},
		isBurnCard (data) {
			let isBurn = false;
			if(data.gameInfo.player.length == 2 && data.gameInfo.burn.length == 1 && !data.gameInfo.flop.length)
				isBurn = true;
			if(data.gameInfo.player.length == 2 && data.gameInfo.flop.length == 3 && data.gameInfo.burn.length == 2 && !data.gameInfo.turn)
				isBurn = true;
			if(data.gameInfo.player.length == 2 && data.gameInfo.flop.length == 3 && data.gameInfo.burn.length == 3 && !data.gameInfo.turn)
				isBurn = true;
			if(data.gameInfo.player.length == 2 && data.gameInfo.flop.length == 3 && data.gameInfo.burn.length == 3 && data.gameInfo.turn && !data.gameInfo.river)
				isBurn = true;

			return isBurn;
		},
		deleteCard (data) {

			for(var x = 0; x  < this.selected_games.length; x++ ) {
				if((this.selected_games[x].game) == (data.tableId + "_" +data.gameName) && this.selected_games[x].game.indexOf("icbo")  == -1) {
					if(data.gameName == "Baccarat") {
						this.selected_games[x].banker_val.text = 0;
						this.selected_games[x].player_val.text = 0;

						this.selected_games[x].banker_card.forEach((bankercard) => {
							bankercard.visible = false
						});

						this.selected_games[x].player_card.forEach((playercard) => {
							playercard.visible = false
						});
					}
				} // end if
			} // end for

		},
		/**
		 * toggles result view
		 * @param  (obj, bolean) {target game, show or hide}
		 */
		toggleResultVeiw(target, type) {
			if(target.game.indexOf("icbo") > -1) return;
			if(type) {
				target.result_container.visible = true;
				target.result_bg.visible = true;
			} else {
				target.result_container.visible = false;
				target.result_bg.visible = false;
				if(target.data.gameName == "Baccarat" || target.data.gameName == "Dragon-Tiger" || target.data.gameName == "Poker") {
					target.card_result_container.children.forEach((e)=>{
						e.visible = false
					});
				}
			}
		},
		updateInfo (data, res) {
			for(var x = 0; x  < this.selected_games.length; x++) {
				if((data.tableNumber +"_"+ data.gameName) == this.selected_games[x].game && this.selected_games[x].data.gameName == 'Sicbo') {
						drawTables(this,x).drawSicboInfo(this.selected_games[x]);
						let total = _.reduce(res.gameResult.winner.split(""), (sum, n)=> {
							return parseInt(sum) + parseInt(n);
						});

						this.selected_games[x].game_description.text = total >= 11 ? "Big Wins" : "Small Wins"
				} // end if
			} // end for

			for(var x = 0; x  < this.games.length; x++) {
				if((data.tableNumber +"_"+ data.gameName) == this.games[x].game && this.games[x].data.gameName == 'Sicbo') {
						drawTables(this,x).drawSicboInfo(this.games[x]);
				} // end if
			} // end for
		},
		startBetting (data) {

			for(var x = 0; x  < this.games.length; x++) {
				if((data.tableId +"_"+ data.gameName) == this.games[x].game ) {
					if(this.games[x].timer_start) {
						if(parseInt(data.bettingTime) <= 0) {
							this.games[x].timer.visible = false;
							this.games[x].timer_start = false;
							this.games[x].timer.children[0].is_tween = false;
						}
						return;
					}
					// hides timer if eye view visible
					if(!this.games[x].eye_icon.is_show) {
						this.games[x].timer.visible = true;
					}
					this.games[x].timer_type = data.type;
					if(this.games[x].data.gameName == "Poker" && this.games[x].timer_type == "startround") {
						this.games[x].timer.timer(parseInt(data.bettingTime), parseInt(data.totalTime));
					} else if(this.games[x].data.gameName != "Poker") {
						this.games[x].timer.timer(parseInt(data.bettingTime), parseInt(data.totalTime));
					}

					this.games[x].timer_start = true;
					this.games[x].isBetting = false;
					if(this.games[x].data.gameName == "Poker" && this.games[x].timer_type != "startround") {
						this.games[x].timer_start = false;
						this.games[x].timer.visible = false;
					}
				}
			}

			for(var x = 0; x  < this.selected_games.length; x++) {
				if(parseInt(data.bettingTime) <= 0 && (data.tableId +"_"+ data.gameName) == this.selected_games[x].game) {
	    		this.context.component_multibetBetting.removeUnconfirmedChips(data, this.selected_games[x]);
					this.selected_games[x].timer_start = false;
					this.selected_games[x].timer.visible = false;
					this.selected_games[x].timer.children[0].is_tween = false;

					if(data.gameName== "Poker") {
						this.selected_games[x].poker_raise_button.registered = false;
						this.selected_games[x].poker_fold_button.registered = false;
						this.selected_games[x].poker_raise_button.visible = false;
						this.selected_games[x].poker_fold_button.visible = false;
						this.selected_games[x].pokerIsTime = false;

						this.pokerCheck(this.selected_games[x], true);
					}
				}

				if((data.tableId +"_"+ data.gameName) == this.selected_games[x].game ) {

					if(this.selected_games[x].timer_start || this.selected_games[x].pokerIsTime) return;
					if(data.bettingTime <= 0) {
						return;
					}

					this.selected_games[x].timer.timer(parseInt(data.bettingTime), parseInt(data.totalTime));

					//setting is betting false only if start round for poker(slave toggle need)
					this.selected_games[x].timer_type = data.type;

					if(this.selected_games[x].data.gameName !== 'Poker') {
						this.selected_games[x].isBetting = false;
					} else {
						if(this.selected_games[x].timer_type == 'startround') {
							this.selected_games[x].isBetting = false;
						} else {
							if(this.selected_games[x].bets.length) {
								this.selected_games[x].isBetting = true;
							}
						}
					}

					this.selected_games[x].timer_start = true;

					this.context.component_multibetBetting.checkButtonState(this.selected_games[x])

					this.selected_games[x].timer.visible = true;

					if(data.gameName != "Poker") {
						this.toggleResultVeiw(this.selected_games[x], false)
					} else {
						if(data.type == "startround") {
							this.toggleResultVeiw(this.selected_games[x], false)
						} else {
							this.toggleResultVeiw(this.selected_games[x], true)
							this.selected_games[x].timer_start = false;
							this.selected_games[x].pokerIsTime = true;
							this.setFlopTurnRiver(this.selected_games[x], data.type);

						}
					}
				}
			}
		},
		shoechange (_target, data) {
			for(var x = 0; x < _target.length; x++) {

				if((_target[x].data.gameName + _target[x].data.tableNumber) == (data.gameName+data.tableId)) {
					_target[x].data.marks = [];
					this.initround(_target[x]);

					if (_target[x].road_map_container) {
						_target[x].road_map_container.removeAllChildren();
					}
					if (_target[x].pearlroad_container) {
						_target[x].pearlroad_container.removeAllChildren();
					}
					if (_target[x].bigroad_container) {
						_target[x].bigroad_container.removeAllChildren();
					}
					if (_target[x].bigeyeboy_container) {
						_target[x].bigeyeboy_container.removeAllChildren();
					}
					if (_target[x].smallroad_container) {
						_target[x].smallroad_container.removeAllChildren();
					}
					if(_target[x].cockroachroad_container) {
						_target[x].cockroachroad_container.removeAllChildren();
					}

					_target[x].shoe_counter.text = 0;
					_target[x].shoe_cnt_text.text = 0;

					_target[x].total_game_bet.text = 0;
					_target[x].player_win_val.text = 0;

					if(data.gameName === 'Baccarat') {
					  _target[x].tie_total_text.text= 0;
					  _target[x].player_total_text.text = 0;
					  _target[x].playerpair_total_text.text= 0;
					  _target[x].playernatural_total_text.text = 0;
					  _target[x].banker_total_text.text = 0;
					  _target[x].bankerpair_total_text.text = 0;
					  _target[x].bankernautral_total_text.text = 0;

					} else if (data.gameName === 'Dragon-Tiger') {
					  _target[x].dragon_text.text = 0;
					  _target[x].dragon_small_text.text = 0;
					  _target[x].dragon_big_text.text = 0;
					  _target[x].dragon_even_text.text = 0;
					  _target[x].dragon_odd_text.text = 0;
						_target[x].tie_text.text = 0;
					  _target[x].tiger_text.text = 0;
					  _target[x].tiger_big_text.text = 0;
					  _target[x].tiger_small_text.text = 0;
					  _target[x].tiger_odd_text.text = 0;
					  _target[x].tiger_even_text.text = 0;
					}
				} // end if
			} // end for
		},
		setFoldCheck(game) {
			console.log(game.bets, "setfold check bets existing")

			if(game.phase == "flop") {

				if(game.betarea[0].total_bet_amt && !game.flop_area.total_bet_amt) {
					let fold_check = new createjs.Bitmap(this.context.getResources('multibet-fold'));
					fold_check.regX =  fold_check.getBounds().width/2
					fold_check.regY =  fold_check.getBounds().height/2
					fold_check.x = game.flop_area.x + game.flop_area.getBounds().width/2
					fold_check.y = game.flop_area.y + game.flop_area.getBounds().height/2
					game.fold_check_container.addChild(fold_check);
				}

				for(var x = 0; x < game.bets.length; x++) {
					if(game.bets[x].table_id === "flop") {
						game.bets[x].cancel = 1
					}
				}
			}

			if(game.phase == "turn") {

				if(game.flop_area.total_bet_amt && !game.turn_area.total_bet_amt) {
					let fold_check = new createjs.Bitmap(this.context.getResources('multibet-check'));
					fold_check.regX =  fold_check.getBounds().width/2
					fold_check.regY =  fold_check.getBounds().height/2
					fold_check.x = game.turn_area.x + game.turn_area.getBounds().width/2
					fold_check.y = game.turn_area.y + game.turn_area.getBounds().height/2
					game.fold_check_container.addChild(fold_check);
				}

				for(var x = 0; x < game.bets.length; x++) {
					if(game.bets[x].table_id === "turn") {
						game.bets[x].cancel = 1
					}
				}
			}

			if(game.phase == "river") {

				if(game.flop_area.total_bet_amt && !game.river_area.total_bet_amt) {
					let fold_check = new createjs.Bitmap(this.context.getResources('multibet-check'));
					fold_check.regX =  fold_check.getBounds().width/2
					fold_check.regY =  fold_check.getBounds().height/2
					fold_check.x = game.river_area.x + game.river_area.getBounds().width/2
					fold_check.y = game.river_area.y + game.river_area.getBounds().height/2
					game.fold_check_container.addChild(fold_check);
				}

				for(var x = 0; x < game.bets.length; x++) {
					if(game.bets[x].table_id === "river") {
						game.bets[x].cancel = 1
					}
				}
			}

			let emit_data = [];

			game.bets = _.uniqBy(game.bets, (e) => {
        return e.table_id
      });

			game.previous_bet = game.bets

			game.previous_bet.forEach( (bet) => {
				emit_data.push({
          	"roundNum" : parseInt(game.currentRound),
          	"bet_amount" : bet.amount,
          	"cancel" : !bet.cancel ? 0 : 1,
          	"name" : window.user_name,
          	"id" : window.userId,
          	"bet" : bet.table_id,
          	"is_mobile" : this.context.mobile,
          	'currency' : window.casino,
          	"slave" : !game.currentSlave ? '' : game.currentSlave
      	});
			});

			game.socket.emit('data', {eventName : 'bet', data:emit_data });

			$.post(game.links.setFoldCheck, {type : game.phase}, (response) => {

			});

		},
		pokerCheck (game, aftertime, frmSocket) {

			console.log(frmSocket, "pokercheck frmSocket")

			console.log(game, "\ntimer type :: -> " , game.timer_type, "\nbets:: ->", game.bets, "Poker check::");

			game.fold_check_container.removeAllChildren(); //test

			switch(game.timer_type) {
				case "flop":
					for(var x = 0; x < game.bets.length; x++) {
						if(game.bets[x].table_id == 'flop' && game.bets[x].amount <= 0) {
							if(aftertime) {
								game.bets[x].cancel = 1
							} // end if
						}	// end if
					}	// end for

					break;
				case "turn":
					for(var x = 0; x < game.bets.length; x++) {
						if(game.bets[x].table_id == 'flop' && game.bets[x].amount <= 0) {
							game.bets[x].cancel = 1
						}	// end if

						if(game.bets[x].table_id == 'turn' && game.bets[x].amount <= 0) {
							if(aftertime) {
								game.bets[x].cancel = 1
							} // end if
						}	// end if
					}	// end for

					break;
				case "river":
					for(var x = 0; x < game.bets.length; x++) {

						if(game.bets[x].table_id == 'flop' && game.bets[x].amount <= 0) {
							game.bets[x].cancel = 1
						}	// end if

						if(game.bets[x].table_id == 'turn' && game.bets[x].amount <= 0) {
							game.bets[x].cancel = 1
						}	// end if

						if(game.bets[x].table_id == 'river' && game.bets[x].amount <= 0) {
							if(aftertime) {
								game.bets[x].cancel = 1
							} // end if
						}	// end if
					}	// end for

					break;
			}

			if(_.find(game.bets, {table_id : 'flop'})) {

				let flopBet = _.find(game.bets, {table_id : 'flop'});

				if(flopBet.slave !== game.currentSlave) return;

				if(flopBet.amount > 0 && !game.flop_area.is_dropped) {
					this.context.component_multibetBetting.addChip({target:game.flop_area}, {chip_amt : flopBet.amount}, true);
					game.flop_area.is_dropped = true;
				}

				if(flopBet.cancel) {
					game.phase = 'flop';
					this.setFoldCheck(game);
				}

				if(!frmSocket) {
					game.response_cleared = true;
					game.response_confirmed = true;
				}

				game.poker_raise_button.visible = false;
				game.poker_fold_button.visible = false;
				game.clearButton.gotoAndStop("disabled");
				game.repeatButton.gotoAndStop("disabled");
			}

			if(_.find(game.bets, {table_id : 'turn'})) {

				let turnBet = _.find(game.bets, {table_id : 'turn'});

				if(turnBet.slave !== game.currentSlave) return;

				if(turnBet.amount > 0 && !game.turn_area.is_dropped) {
					this.context.component_multibetBetting.addChip({target:game.turn_area}, {chip_amt : turnBet.amount}, true);
					game.turn_area.is_dropped = true;
				}
				if(turnBet.cancel) {
					game.phase = 'turn'
					this.setFoldCheck(game)
				}

				if(!frmSocket) {
					game.response_cleared = true;
					game.response_confirmed = true;
				}

				game.poker_raise_button.visible = false;
				game.poker_fold_button.visible = false;
				game.clearButton.gotoAndStop("disabled");
				game.repeatButton.gotoAndStop("disabled");
			}

			if(_.find(game.bets, {table_id : 'river'})) {

				let riverBet = _.find(game.bets, {table_id : 'river'});

				if(riverBet.slave !== game.currentSlave) return;

				if (riverBet.amount > 0 && !game.river_area.is_dropped) {
					this.context.component_multibetBetting.addChip({target:game.river_area}, {chip_amt : (parseInt(game.betarea[0].total_bet_amt))}, true);
					game.river_area.is_dropped = true;
				}

				if(riverBet.cancel) {
					game.phase = 'river'
					this.setFoldCheck(game)
				}

				if(!frmSocket) {
					game.response_cleared = true;
					game.response_confirmed = true;
				}

				game.poker_raise_button.visible = false;
				game.poker_fold_button.visible = false;
				game.clearButton.gotoAndStop("disabled");
				game.repeatButton.gotoAndStop("disabled");
			}

		},
		pokerExtraCallback (game) {

			if(game.timer_type == "flop") {
				let flop_bet_amt = parseInt(game.betarea[0].total_bet_amt) *2;

				if(_.find(game.bets, (e) => { return e.table_id == 'flop'})) {
					game.bets.forEach((e) => {
						if(e.table_id == 'flop') {
							e.amount = flop_bet_amt;
							e.cancel = 0;
							e.is_confirmed = true;
							e.slave = game.currentSlave;
						}
					})
				} else {
					game.bets.push({
						"amount" : flop_bet_amt,
						"table_id": "flop",
						"is_confirmed": true,
						"slave": game.currentSlave,
						cancel : 0
					});
				}

				game.previous_bet = game.bets

				game.flop_area.total_bet_amt = flop_bet_amt
			}

			if(game.timer_type == "turn") {
				let turn_bet_amt = parseInt(game.betarea[0].total_bet_amt);


				if(_.find(game.bets, (e) => { return e.table_id == 'turn'})) {
					game.bets.forEach((e) => {
						if(e.table_id == 'turn') {
							e.amount = turn_bet_amt;
							e.cancel = 0;
							e.is_confirmed = true;
							e.slave = game.currentSlave;
						}
					})
				} else {
					game.bets.push({
						"amount" : turn_bet_amt,
						"table_id": "turn",
						"is_confirmed": true,
						"slave": game.currentSlave,
						cancel : 0
					});
				}

				game.previous_bet = game.bets

				game.turn_area.total_bet_amt = turn_bet_amt
			}

			if(game.timer_type == "river") {
				let river_bet_amt = parseInt(game.betarea[0].total_bet_amt);

				if(_.find(game.bets, (e) => { return e.table_id == 'river'})) {
					game.bets.forEach((e) => {
						if(e.table_id == 'river') {
							e.amount = river_bet_amt;
							e.cancel = 0;
							e.is_confirmed = true;
							e.slave = game.currentSlave;
						}
					})
				} else {
					game.bets.push({
						"amount" : river_bet_amt,
						"table_id": "river",
						"is_confirmed": true,
						"slave": game.currentSlave,
						cancel : 0
					});
				}

				game.previous_bet = game.bets
				game.river_area.total_bet_amt = river_bet_amt
			}

			$.post(game.links.confirm, {data: game.bets, type : game.currentSlave == 'bonusplus' ? 'b' : 'r'}, (response) => {

				game.bets = [];
				let data;
				if(typeof response.data === "string") data = JSON.parse(response.data);
				else data = response.data;

				let total = 0;

				for(var key in data) {
					game.bets.push({
						"amount" : data[key].bet,
						"table_id": key,
						"is_confirmed": true,
						"slave": game.currentSlave,
						cancel : 0
					});

					total += data[key].bet;
				}
				game.previous_bet = game.bets;

				if(response.fail) {
					if(window.casino == "N") {
	        	this.context.context.user_money = parseInt(response.money);
	        	this.context.component_betDetails.reinit(true);
	        } else {
	        	this.context.context.user_money = parseFloat(response.money);
	        	this.context.component_betDetails.reinit(true);
	        }
					return;
				}

				if(game.timer_type == "flop") {
					let flop_bet_amt = parseInt(game.betarea[0].total_bet_amt) *2;
					game.flop_area.is_dropped = true;
					this.context.component_multibetBetting.addChip({target:game.flop_area, pokerextra:true}, {chip_amt : flop_bet_amt}, true);
				}

				if(game.timer_type == "turn") {
					let turn_bet_amt = parseInt(game.betarea[0].total_bet_amt);
					game.turn_area.is_dropped = true;
					this.context.component_multibetBetting.addChip({target:game.turn_area,pokerextra:true}, {chip_amt : turn_bet_amt}, true);
				}

				if(game.timer_type == "river") {
					let river_bet_amt = parseInt(game.betarea[0].total_bet_amt);
					game.river_area.is_dropped = true;
					this.context.component_multibetBetting.addChip({target:game.river_area,pokerextra:true}, {chip_amt : river_bet_amt}, true);
				}

				try {
					game.totalGameBetAmt = total;
					game.total_game_bet.text = this.context.component_multibetBetting.numberWithCommas(total);
				}
				catch(err) {
					console.log(err)
				}

				// ** for socket **//
				let emit_data = [];

				game.previous_bet.forEach( (bet) => {
					emit_data.push({
          	"roundNum" : parseInt(game.currentRound),
          	"bet_amount" : bet.amount,
          	"name" : window.user_name,
          	"id" : window.userId,
          	"bet" : bet.table_id,
          	"is_mobile" : this.context.mobile,
          	'currency' : window.casino,
          	"slave" : !game.currentSlave ? '' : game.currentSlave,
          	"cancel" : !bet.cancel ? 0 : 1
	      	});
				});

				game.socket.emit('data', {eventName : 'bet', data:emit_data });

			 	game.bets = _.uniqBy(game.bets, (e) => {
	        return e.table_id
	      });

	      if(window.casino == "N") {
        	this.context.context.user_money = parseInt(response.money);
        	this.context.component_betDetails.reinit(true);
        } else {
        	this.context.context.user_money = parseFloat(response.money);
        	this.context.component_betDetails.reinit(true);
        }

			});
		},
		setFlopTurnRiver(game, phase) {

			game.phase = phase;

			if(!game.betarea[0].total_bet_amt) {
				game.poker_raise_button.visible = false;
				game.poker_fold_button.visible = false;
				return;
			}

			if(!game.flop_area.total_bet_amt && (phase == "turn" || phase == "river")) {
				game.poker_raise_button.visible = false;
				game.poker_fold_button.visible = false;
				return;
			}

			if(phase == "flop") {
				game.poker_raise_button.children[1].text = "RAISE"
				game.poker_fold_button.children[1].text = "FOLD"
			}
			else if(phase == "turn" || phase == "river") {
				game.poker_raise_button.children[1].text = "CALL"
				game.poker_fold_button.children[1].text = "CHECK"
			}

			if(game.poker_raise_button.registered && game.poker_fold_button.registered) return;

			game.poker_raise_button.visible = true;
			game.poker_fold_button.visible = true;

			game.poker_raise_button.registered = true;
			game.poker_fold_button.registered = true;

			if(game.poker_raise_button.event && game.poker_fold_button.event) return;

			game.poker_raise_button.event = true;
			game.poker_fold_button.event = true;

			game.poker_raise_button.on("click",(e) => {

				game.poker_raise_button.visible = false;
				game.poker_fold_button.visible = false;

				game.response_cleared = true;
				game.response_confirmed = true;

				game.clearButton.gotoAndStop("disabled");
				game.repeatButton.gotoAndStop("disabled");

				this.pokerExtraCallback(game)
			});

			game.poker_fold_button.on("click", (e)=> {

				game.poker_raise_button.visible = false;
				game.poker_fold_button.visible = false;

				game.response_cleared = true;
				game.response_confirmed = true;

				game.clearButton.gotoAndStop("disabled");
				game.repeatButton.gotoAndStop("disabled");

				this.setFoldCheck(game);
			});
		},
		setWinLoseAnimation(target) {
			for(var x = 0; x < target.betarea.length; x++) {
				for(var  i = 0; i < target.betarea[x].chips.length; i++) {
					if(target.betarea[x].chips[i].is_win) {
						createjs.Tween.get(target.betarea[x].chips[i])
						.wait(3000)
						.to({
							y : target.betarea[x].chips[i].y + target.betarea[x].getBounds().height,
							alpha : 0
						},1000)
					} //end of if win
					else {
						createjs.Tween.get(target.betarea[x].chips[i])
						.wait(2000)
						.to({
							y : target.betarea[x].chips[i].y - target.betarea[x].getBounds().height,
							alpha : 0
						},1000)
					} //end of lose
				}
			}

			/// ===poker
			let poker_area = ["flop","turn","river"];
			if(target.data.gameName == "Poker") {

				for(var x = 0; x < poker_area.length; x++) {
					if(!target[poker_area[x]+"_area"].chips.length) continue;

					for(var  i = 0; i < target[poker_area[x]+"_area"].chips.length; i++) {
						if(target[poker_area[x]+"_area"].chips[i].is_win) {
							createjs.Tween.get(target[poker_area[x]+"_area"].chips[i])
							.wait(3000)
							.to({
								y : target[poker_area[x]+"_area"].chips[i].y + target[poker_area[x]+"_area"].getBounds().height,
								alpha : 0
							},1000)
						} //end of if win
						else {
							createjs.Tween.get(target[poker_area[x]+"_area"].chips[i])
							.wait(2000)
							.to({
								y : target[poker_area[x]+"_area"].chips[i].y - target[poker_area[x]+"_area"].getBounds().height,
								alpha : 0
							},1000)
						}
					}
				}

			}
		},
		winDefaultSet (game) {
			game.chips_container.removeAllChildren();
			game.betarea.forEach((area) => {
				area.total_bet_amt = 0;
				area.chips = [];
			});
		},
		pokerWinDefaultSet (game) {
			// game.chips_container.removeAllChildren();

			let poker_area = ["flop","turn","river"];
			for(var x = 0; x < poker_area.length; x++) {
				for(var  i = 0; i < game[poker_area[x]+"_area"].chips.length; i++) {
					game[poker_area[x]+"_area"].chips[i].is_win = false;
					game[poker_area[x]+"_area"].chips[i].visible = true;
				}
			}
		},
		initround (game) {
			// reset gamename
			if(game.data.gameName == "Poker") {
				game.game_description.text = window.language.gamename.poker_game;
				game.flop_area.is_dropped = false;
				game.turn_area.is_dropped = false;
				game.river_area.is_dropped = false;
			}

			game.logs = [];

			if(game.data.gameName == "Baccarat") {

				game.banker_val.text = 0;
				game.player_val.text = 0;

				game.game_description.text = window.language.gamename.baccarat_game;
			}

			if(game.data.gameName == "Dragon-Tiger") {
				game.game_description.text = window.language.gamename.dragontiger_game;
			}

			if(game.data.gameName == "Sicbo") {
				game.game_description.text = window.language.gamename.sicbo_game;
			}

			game.game_description.color = this.color_settings.text_color
			game.game_round.color = this.color_settings.text_color
			game.gamenum.color = this.color_settings.text_color

			game.betarea = game.betarea.map((g) => {
				g.total_bet_amt = 0;
				g.alreadyMax = false;
				g.is_win = false;
				return g;
			});

			this.defaultState(game);
			this.slaveButtonState(game, "enabled");

			game.is_repeat = false;
			game.is_confirmed = false;
			game.isBetting = false;
			game.betting_start = true; //flag for new round check
			game.chips_container.removeAllChildren();

			game.response_confirmed = false;
			game.response_cleared = false;

			game.temp_prev_bet = [];
			this.context.component_multibetBetting.setTempMoney();

			game.totalWinning = 0;
			if(game.previous_bet) {
				game.previous_bet = _.map(game.previous_bet, (e)=>{
					e.is_confirmed = false;
					return e;
				});
			}

			game.bets= [];

			game.betarea.forEach((area) => {
				area.total_bet_amt = 0;
				area.payout_multiplier = !area.o_payout_multiplier ? area.payout_multiplier : area.o_payout_multiplier
			});

			this.context.component_multibetBetting.checkButtonState(game)
			if(game.data.gameName == "Poker") {
				game.fold_check_container.removeAllChildren();
				game.phase = "";
				game.flop_area.total_bet_amt = 0;
				game.turn_area.total_bet_amt = 0;
				game.river_area.total_bet_amt = 0;
			}
		},
		setExtraEyeData(_target) {
			var cnt = 0;

			if(_target.data.gameName == 'Pula-Puti') {
				let redCount = 0;
				let whiteCount = 0;
				let goldCount = 0;

				_target.g_resultCircle = [];

				for(var i in _target.data.gameInfo) {
					_target.g_resultCircle[i] = new createjs.Shape();

					if(_target.data.gameInfo[i] == 'R') {
						_target.g_resultCircle[i].graphics.beginStroke('#6d0a0a').setStrokeStyle(1).beginFill('#c62828').drawCircle(0, 0, 12);
							redCount++;
					} else if(_target.data.gameInfo[i] == 'W') {
						_target.g_resultCircle[i].graphics.beginStroke('#3d3d3d').setStrokeStyle(1).beginFill('#fff').drawCircle(0, 0, 12);
						whiteCount++;
					} else {
						_target.g_resultCircle[i].graphics.beginStroke('#966e25').setStrokeStyle(1).beginFill('#e5b241').drawCircle(0, 0, 12);
						goldCount++;
					}

					_target.g_resultCircle[i].x = (cnt * 28) + 35
					_target.g_resultCircle[i].y = 140
					_target.eye_panel_container.addChild(_target.g_resultCircle[i]);

					cnt++;
				}

				if (redCount >= 2 && goldCount == 0) {
					_target.last_res_text = new createjs.Text(redCount,'33px bebasneue', "#b71c1c");
				}
				else if (whiteCount >= 2 && goldCount == 0) {
					_target.last_res_text = new createjs.Text(whiteCount,'33px bebasneue', "#fff");
				}
				else {
					_target.last_res_text = new createjs.Text(goldCount,'33px bebasneue', "#e5b241");
				} // end if

				_target.eye_panel_container.addChild(_target.last_res_text);
				_target.last_res_text.set({textAlign:'center', textBaseline:'middle', x : (4 * 28) + 35, y: 140});
			} //end if pula puti
		},
		createToggleButton (type){
			let btn_container = new createjs.Container();
			btn_container.y = 165;

			let btn = new createjs.Shape();
			btn_container.addChild(btn);

			let def = ["#fff39f", "#c3a240"];
			if(type === 'classicPoker' || type === 'normal') {
					def = ["#c3a240", "#fff39f"];
			}

			btn.graphics.ss(1).s("#8a6d34").beginLinearGradientFill(def, [0,1], 0,0,0,15).drawRoundRect(0,0,80, 20, 10);
			btn.setBounds(0,0,80, 18);
			btn_container.regX = (80/2);

			let text = new createjs.Text("", "14px latoregular", '#000');
			text.set({x : 10, y : 10   , textAlign: 'left', textBaseline: 'middle'});
			btn_container.addChild(text);


			switch(type) {
				case "supersix":

					var image_asset = new createjs.Bitmap(this.context.getResources("super6btn_multibet"));
					btn_container.addChild(image_asset);
					image_asset.set({x: 62, y: 4 });

					text.text = window.language.multibet_betareas.supersix;
					if(window.language.locale == 'zh') {
						image_asset.set({x: 60, y: 3 });
						text.set({x : 22, y: 10})
					}
					break;
				case "normal":

					var image_asset = new createjs.Bitmap(this.context.getResources("classic_multibet"));
					btn_container.addChild(image_asset);
					image_asset.set({x: 58, y: 4 });
					text.set({x : 6, y: 10})

					text.text = window.language.multibet_betareas.classic;
					if(window.language.locale == 'zh') {
						image_asset.set({x: 55, y: 4 });
						text.set({x : 22, y: 10})
					}
					break;
				case "bonus":

					var image_asset = new createjs.Bitmap(this.context.getResources("bonus_multibet"));
					btn_container.addChild(image_asset);
					image_asset.set({x: 62, y: 4 });

					text.text = window.language.multibet_betareas.bonusbaccarat;
					if(window.language.locale == 'zh') {
						image_asset.set({x: 56, y: 3 });
						text.set({x : 22, y: 10})
					}
					break;
				case "classicPoker":

					var image_asset = new createjs.Bitmap(this.context.getResources("classicPoker_multibet"));
					btn_container.addChild(image_asset);
					image_asset.set({x: 58, y: 2 });
					text.set({x : 10})

					text.text = window.language.multibet_betareas.classicPoker;
					if(window.language.locale == 'zh') {
						image_asset.set({x: 54, y: 2 });
						text.set({x : 10})
					}
					break;
				case "bonusplus" :

					var image_asset = new createjs.Bitmap(this.context.getResources("bonus_multibet"));
					btn_container.addChild(image_asset);
					image_asset.set({x: 62, y: 4 });

					text.text = window.language.multibet_betareas.bonuspluspoker;
					if(window.language.locale == 'zh') {
						image_asset.set({x: 58, y: 3 });
						text.set({x : 22, y: 10})
					}
					break;
			}

			return btn_container;
		},
		maintenanceChange (data) {

			//ovveride
			this.multibetGames.forEach((mul)=>{
				window.all_games.forEach((all)=>{
					if(`${mul.gameName}${mul.tableNumber}` == `${all.gameName}${all.tableNumber}` ) {
						mul = all;
					}
				});
			});

			switch (data.gameName) {
				case "Baccarat":
				case "Poker":
					for(var x = 0; x < this.multibetGames.length; x++) {
						if(`${data.gameName}${data.tableId}` == `${this.multibetGames[x].gameName}${this.multibetGames[x].tableNumber}`) {
							for(var  i =0; i < this.multibetGames[x].maintenanceSetting.maintenance.length; i++) {
								if(this.multibetGames[x].maintenanceSetting.maintenance[i].type === data.data.slave) {
									this.multibetGames[x].maintenanceSetting.maintenance[i].info.forEach((m) =>{
										if(m.division == data.data.division) {
											 m.status = data.data.status
										}
									});
								}
								// if all change all status
								if(data.data.slave == "all") {
									this.multibetGames[x].maintenanceSetting.maintenance[i].info.forEach((m) =>{
										if(m.division == data.data.division) {
											 m.status = data.data.status
										}
									});
								}
							}
						}
					} // end for
					break;

				case "Dragon-Tiger":
				case "Sicbo":
					for(var x = 0; x < this.multibetGames.length; x++) {
						if(`${data.gameName}${data.tableId}` == `${this.multibetGames[x].gameName}${this.multibetGames[x].tableNumber}`) {
							this.multibetGames[x].maintenanceSetting.forEach((m) =>{
								if(m.division == data.data.division) {
									 m.status = data.data.status
								}
							});
						}
					} // end for

					break;
			}

			this.filterGames();

			if(parseInt(data.data.status) && _.find(this.selected_games, (a) => {return `${data.gameName}${data.tableId}` === `${a.data.gameName}${a.data.tableNumber}`})) {
				this.reRender("remove", _.find(this.selected_games, (a) => {return `${data.gameName}${data.tableId}` === `${a.data.gameName}${a.data.tableNumber}`}));
			}

			this.createGames(window.all_games);
		}, // end setmaintenance
		filterGames() {
      window.all_games = _.filter(this.multibetGames,(e) => {
      	var mtns = [];
      	if(e.maintenanceSetting.maintenance) {
      		mtns = _.map(e.maintenanceSetting.maintenance, (m) => {
      			if(_.find(m.info, (s) => { return parseInt(s.status) })) {
      				return _.find(m.info, (s) => { return parseInt(s.status) });
      			}
      		});

      		mtns = _.filter(mtns, (o) => { // filtering undefined
      			return o;
      		});

      		if(!mtns.length) {
      			return e.namespace != "Baccarat/"+ window.tableNum
      		}

      	} else {
        	return e.namespace != "Baccarat/"+ window.tableNum && (!parseInt(e.maintenanceSetting[0].status) && !parseInt(e.maintenanceSetting[1].status))
      	}
			});

			window.all_games = _.filter(window.all_games, (a) => {
				if(_.find(this.selected_games, (e) => {return e.data.namespace === a.namespace})) {
					return a.namespace != _.find(this.selected_games, (e) => {return e.data.namespace === a.namespace}).data.namespace;
				} else {
					return a;
				}
			});
		},
		numberWithCommas (x) {
			try {
		    	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			catch(e) {

			}
		},
		slaveButtonState(target, type) {

			if(target.data.gameName == 'Sicbo' || target.data.gameName == 'Dragon-Tiger') return;

			let colors = {
				selected : ["#c3a240", "#fff39f"],
				disabled : ["#797979", "#797979"],
				enabled : ["#fff39f", "#c3a240"],
			}

			target.slave_buttons.forEach((e) => { // disable all
				e.children[0].graphics.clear().ss(1).s("#5f5f5f").beginLinearGradientFill(colors[type], [0,1], 0,0,0,15).drawRoundRect(0,0,e.children[0].getBounds().width, 20, 10);
			});

			switch(target.currentSlave) {
				case "normal":
					if(target.data.gameName.toLowerCase() === 'baccarat') {
						target.normal_toggle.children[0].graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(colors.selected, [0,1], 0,0,0,15).drawRoundRect(0,0,target.normal_toggle.children[0].getBounds().width, 20, 10);
					} else if(target.data.gameName.toLowerCase() === 'poker') {
						target.poker_toggle.children[0].graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(colors.selected, [0,1], 0,0,0,15).drawRoundRect(0,0,target.poker_toggle.children[0].getBounds().width, 20, 10);
					}
					break
				case "supersix":
					target.supersix_toggle.children[0].graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(colors.selected, [0,1], 0,0,0,15).drawRoundRect(0,0,target.supersix_toggle.children[0].getBounds().width, 20, 10);
					break
				case "bonus":
					target.bonus_toggle.children[0].graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(colors.selected, [0,1], 0,0,0,15).drawRoundRect(0,0,target.bonus_toggle.children[0].getBounds().width, 20, 10);
					break
				case "bonusplus":
					target.bonus_plus_toggle.children[0].graphics.clear().ss(1).s("#8a6d34").beginLinearGradientFill(colors.selected, [0,1], 0,0,0,15).drawRoundRect(0,0,target.bonus_plus_toggle.children[0].getBounds().width, 20, 10);
					break
			}
		}

	});

	return instance;
}
