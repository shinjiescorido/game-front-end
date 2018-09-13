
import {createSprite, randomNum, createCardSprite, numberCounter, playSound } from '../../factories/factories';

let instance = null;

export default (config, type) => {
	instance = instance || new blu.Component({
		bet_areas: [],
		hit_color :"rgba(255, 58, 58, 0.4)",
		fill_color : "rgba(255,255,255,0.1)",

		main () {
			this.rangeDetails = window.rangeDetails;
			let table_outline = null;

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
					case ('BonusBet'):
					let bonusMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					let bonusMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					break;

					case ('BonusplusBet'):
					let bonusplusMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					let bonusplusMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					break;

					case ('FlopBet'):
					let flopMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					let flopMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					break;

					case ('TurnBet'):
					let turnMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					let turnMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					break;

					case ('RiverBet'):
					let riverMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					let riverMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					break;
				}
			} //end for

			//Define colors
			this.default_color = "rgba(255,255,255,1)";

			this.ante_color = {
				default : ["rgba(3, 95, 102, 0.5)", "rgba(3, 95, 102, 0.5)"],
				dropped : ["rgba(3, 95, 102, 1)", "rgba(3, 95, 102, 1)"],
				win : ["rgba(3, 95, 102, 0.7)", "rgba(3, 95, 102, 0.7)"],
				hover : ["rgba(3, 95, 102, 0.7)","rgba(3, 95, 102, 0.7)"],
			}

			this.ante_color2 = {
				default : ["rgba(0,153,170, 0.5)", "rgba(0,153,170, 0.5)"],
				dropped : ["rgba(0,153,170, 1)", "rgba(0,153,170, 1)"],
				win : ["rgba(0,153,170, 0.7)", "rgba(0,153,170, 0.7)"],
				hover : ["rgba(0,153,170, 0.7)", "rgba(0,153,170, 0.7)"],
			}

			this.sidebet_color1 = {
				default : ["rgba(28,96,47, 0.5)", "rgba(28,96,47, 0.5)"],
				dropped : ["rgba(28,96,47, 1)", "rgba(28,96,47, 1)"],
				win : ["rgba(28,96,47, 0.7)", "rgba(28,96,47, 0.7)"],
				hover : ["rgba(28,96,47, 0.7)", "rgba(28,96,47, 0.7)"],
			}

			this.sidebet_color2 = {
				default : ["rgba(86,139,62, 0.5)", "rgba(86,139,62, 0.5)"],
				dropped : ["rgba(86,139,62, 1)", "rgba(86,139,62, 1)"],
				win : ["rgba(86,139,62, 0.7)", "rgba(86,139,62, 0.7)"],
				hover : ["rgba(86,139,62, 0.7)", "rgba(86,139,62, 0.7)"],
			}

			let y = this.context.stage.baseHeight /2 + 195;

			//antebet
			let ante_area_1 = new createjs.Shape();
			ante_area_1.graphics.ss(3.5).beginStroke(this.default_color);
			ante_area_1.color = this.ante_color;
			ante_area_1.gradientOptions = [[0,1], 0,0,120,0];
			ante_area_1.fillCmd = ante_area_1.graphics.beginLinearGradientFill(this.ante_color.default, ...ante_area_1.gradientOptions).command;
			ante_area_1.graphics.drawRoundRect(0,0,120,120,13);
			ante_area_1.setBounds(0,0,120,120,13);
			ante_area_1.is_child = true;
			ante_area_1.rotation = 45;
			ante_area_1.x = 50;

			let ante_area_2 = new createjs.Shape();
			ante_area_2.graphics.ss(1).beginStroke(this.default_color);
			ante_area_2.color = this.ante_color2;
			ante_area_2.gradientOptions = [[0,1], 0,0,120,0];
			ante_area_2.fillCmd = ante_area_2.graphics.beginLinearGradientFill(this.ante_color2.default, ...ante_area_2.gradientOptions).command;
			ante_area_2.graphics.drawRoundRect(0,0,95,95,20);
			ante_area_2.setBounds(0,0,95,95,20);
			ante_area_2.is_child = true;
			ante_area_2.rotation = 45;
			ante_area_2.y = 16;
			ante_area_2.x = 50;

			this.bet_areas[0] = new createjs.Container();
			this.bet_areas[0].graphics = true;
			this.bet_areas[0].x = 750;
			this.bet_areas[0].y = y;
			this.bet_areas[0].scaleY = 0.68;
			this.bet_areas[0].skewX = 10;
			this.bet_areas[0].addChild(ante_area_1, ante_area_2)

			this.bet_areas[0].setBounds(0,0,60,150);
			this.bet_areas[0].outer = ante_area_1;
			this.bet_areas[0].table_name = "ante";
			this.bet_areas[0].min_bet = mainAreaMin;
			this.bet_areas[0].max_bet = mainAreaMax;
			this.bet_areas[0].chips = [];

			// Bonus
			let bonus = new createjs.Bitmap(this.context.getResources("bonus_cont"));
			bonus.is_child = true;
			let bonus_label = new createjs.Bitmap(this.context.getResources("bonus_label"));
			bonus_label.label = 'yes';
			bonus_label.x = 0;
			bonus_label.y = 38;
			bonus_label.is_child = true;

			let bonus_bg = new createjs.Shape();
			bonus_bg.graphics.beginFill('rgba(255,255,255,0.01)').drawCircle(0,0,79);
			bonus_bg.x = 81;
			bonus_bg.y = 53;
			bonus_bg.is_child = true;
			bonus_bg.skewX = 20;
			bonus_bg.scaleY = 0.71;

			this.bet_areas[1] = new createjs.Container();
			this.bet_areas[1].graphics = true;
			this.bet_areas[1].x = 490;
			this.bet_areas[1].y = y;
			this.bet_areas[1].addChild(bonus_bg,bonus, bonus_label)
			this.bet_areas[1].fillarea = bonus_bg;
			this.bet_areas[1].outer = bonus;

			this.bet_areas[1].setBounds(0,0,150,80);
			this.bet_areas[1].table_name = "bonus";
			this.bet_areas[1].min_bet = bonusMin;
			this.bet_areas[1].max_bet = bonusMax;
			this.bet_areas[1].chips = [];

			//bonus plus
			let bonusplus = new createjs.Bitmap(this.context.getResources("bonusplus_cont"));
			let bonusplus_label = new createjs.Bitmap(this.context.getResources("bonusplus_label"));
			bonusplus_label.x = 0;
			bonusplus_label.y = 39;
			bonusplus_label.is_child = true;

			bonusplus_label.x = 0;
			bonusplus_label.is_child = true;
			bonusplus_label.y = 49;

			let bonusplus_bg = new createjs.Shape();
			bonusplus_bg.graphics.beginFill('rgba(255,255,255,0.01)').drawCircle(0,0,79);
			bonusplus_bg.x = 92;
			bonusplus_bg.y = 64;
			bonusplus_bg.is_child = true;
			bonusplus_bg.skewX = 28;
			bonusplus_bg.scaleY = 0.71;

			this.bet_areas[2] = new createjs.Container();
			this.bet_areas[2].graphics = true;
			this.bet_areas[2].x = 261;
			this.bet_areas[2].y = y - 8;
			this.bet_areas[2].addChild(bonusplus_bg, bonusplus, bonusplus_label)
			this.bet_areas[2].outer = bonusplus;
			this.bet_areas[2].visible = false;

			this.bet_areas[2].setBounds(0,0,150,120);
			this.bet_areas[2].table_name = "bonusplus";
			this.bet_areas[2].min_bet = bonusplusMin;
			this.bet_areas[2].max_bet = bonusplusMax;
			this.bet_areas[2].chips = [];

			//pocket

			let pocket = new createjs.Bitmap(this.context.getResources("pocket_cont"));
			pocket.is_child = true;
			let pocket_label = new createjs.Bitmap(this.context.getResources("pocket_label"));
			pocket_label.is_child = true;
			pocket_label.x = 0;
			pocket_label.y = 49;

			let pocket_bg = new createjs.Shape();
			pocket_bg.is_child = true;
			pocket_bg.graphics.ss(2).s('rgba(255,255,255,0.01)').beginFill('rgba(255,255,255,0.01)')
			pocket_bg.graphics.moveTo(0,0)
			.lineTo(60,60)
			.lineTo(-35,110)
			.lineTo(-50,110)
			.lineTo(-60,110)
			.lineTo(-110,60)
			.lineTo(0,0)
			pocket_bg.x = 120

			this.bet_areas[3] = new createjs.Container();
			this.bet_areas[3].graphics = true;
			this.bet_areas[3].x = 480;
			this.bet_areas[3].y = y-5;
			this.bet_areas[3].addChild(pocket_bg, pocket, pocket_label)
			this.bet_areas[3].outer = pocket;
			this.bet_areas[3].visible = false;

			this.bet_areas[3].setBounds(0,0,160,120);
			this.bet_areas[3].table_name = "pocket";
			this.bet_areas[3].min_bet = bonusMin;
			this.bet_areas[3].max_bet = bonusMax;
			this.bet_areas[3].chips = [];

			this.classic_outline =this.context.component_tableOutline.singleClassic();

			for (var x = 0; x < this.bet_areas.length; x++) {
				this.bet_areas[x].chip_anim_toPlay = 1;
				this.bet_areas[x].chip_drop_scale = 0.8;
				this.bet_areas[x].total_bet_amt = 0;
				this.bet_areas[x].min_betAmt = this.bet_areas[x].min_bet;
				this.bet_areas[x].max_betAmt = this.bet_areas[x].max_bet;
				this.bet_areas[x].singleplayer = true;

				this.classic_outline.hitArea = this.bet_areas[x];

				this.bet_areas[x].normal_state = (e,x) => {
					for (let i = 0; i < e.children.length; i++) {
						if (e.children[i].fillCmd) {
							e.children[i].fillCmd.linearGradient(e.children[i].color.default, ...e.children[i].gradientOptions)
						}

					}
				// e.fillCmd.linearGradient(e.color.default, ...e.gradientOptions)
				} //end normal_state
				//
				this.bet_areas[x].dropped_state = (e,x) => {
					if(e.chips.length && e.is_animate) {
						for(var i = 0;i<e.children.length; i++) {
							e.children[i].shadow = null
						}
					}
				}

				this.bet_areas[x].hover_state = (e,x) => {
					for (let i = 0; i < e.children.length; i++) {
						if (e.children[i].fillCmd) {
							e.children[i].fillCmd.linearGradient(e.children[i].color.hover, ...e.children[i].gradientOptions)
						}
					}
				}

				this.bet_areas[x].win_state = (e,x) => {
					this.bet_areas[x].hover_state = (e,x) => {
						for (let i = 0; i < e.children.length; i++) {
							if (e.children[i].fillCmd) {
								e.children[i].fillCmd.linearGradient(e.children[i].color.win, ...e.children[i].gradientOptions)
							}
						}
					}
				}
			} //end for

			let flop_area_1 = new createjs.Shape();
			flop_area_1.graphics.ss(3.5).beginStroke(this.default_color);
			flop_area_1.color = this.sidebet_color1;
			flop_area_1.gradientOptions = [[0,1], 0,0,120,0];
			flop_area_1.fillCmd = flop_area_1.graphics.beginLinearGradientFill(this.sidebet_color1.default, ...flop_area_1.gradientOptions).command;
			flop_area_1.graphics.drawRoundRect(0,0,120,120,13);
			// flop_area_1.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 5);
			flop_area_1.setBounds(0,0,120,120,13);
			flop_area_1.is_child = true;
			flop_area_1.rotation = 45;
			flop_area_1.x = 50;

			let flop_area_2 = new createjs.Shape();
			flop_area_2.graphics.ss(1).beginStroke(this.default_color);
			flop_area_2.color = this.sidebet_color2;
			flop_area_2.gradientOptions = [[0,1], 0,0,95,0];
			flop_area_2.fillCmd = flop_area_2.graphics.beginLinearGradientFill(this.sidebet_color2.default, ...flop_area_2.gradientOptions).command;
			flop_area_2.graphics.drawRoundRect(0,0,95,95,20);
			flop_area_2.setBounds(0,0,92,92,20);
			flop_area_2.is_child = true;
			flop_area_2.rotation = 45;
			flop_area_2.y = 16;
			flop_area_2.x = 50;

			this.flop_area = new createjs.Container();
			this.flop_area.graphics = true;
			this.flop_area.x = this.flop_area.ox = this.bet_areas[0].x + 320;
			this.flop_area.y = y;
			this.flop_area.scaleY = 0.68;
			this.flop_area.skewX = -10;
			this.flop_area.outer = flop_area_1;
			this.flop_area.addChild(flop_area_1, flop_area_2);

			this.flop_area.setBounds(0,0,60,150);
			this.flop_area.table_name = "flop";
			this.flop_area.chips = [];

			this.addChild(this.flop_area)

			this.flop_area.dropped_state = (e,x) => {
				for (let i = 0; i < e.children.length; i++) {
					e.children[i].fillCmd.linearGradient(e.children[i].color.dropped, ...e.children[i].gradientOptions)
				}
			}

			this.flop_area.normal_state = (e,x) => {
				for (let i = 0; i < e.children.length; i++) {
					e.children[i].fillCmd.linearGradient(e.children[i].color.default, ...e.children[i].gradientOptions)
				}
			}

			this.flop_area.win_state = (e,x) => {
				for (let i = 0; i < e.children.length; i++) {
					e.children[i].fillCmd.linearGradient(e.children[i].color.win, ...e.children[i].gradientOptions)
				}
			}


			let turn_area_1 = new createjs.Shape();
			turn_area_1.graphics.ss(3.5).beginStroke(this.default_color);
			turn_area_1.color = this.sidebet_color1;
			turn_area_1.gradientOptions = [[0,1], 0,0,120,0];
			turn_area_1.fillCmd = turn_area_1.graphics.beginLinearGradientFill(this.sidebet_color1.default, ...turn_area_1.gradientOptions).command;
			turn_area_1.graphics.drawRoundRect(0,0,120,120,13);
			// turn_area_1.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 5);
			turn_area_1.setBounds(0,0,120,120,13);
			turn_area_1.is_child = true;
			turn_area_1.rotation = 45;
			turn_area_1.x = 50;

			let turn_area_2 = new createjs.Shape();
			turn_area_2.graphics.ss(1).beginStroke(this.default_color);
			turn_area_2.color = this.sidebet_color2;
			turn_area_2.gradientOptions = [[0,1], 0,0,95,0];
			turn_area_2.fillCmd = turn_area_2.graphics.beginLinearGradientFill(this.sidebet_color2.default, ...turn_area_2.gradientOptions).command;
			turn_area_2.graphics.drawRoundRect(0,0,95,95,20);
			turn_area_2.setBounds(0,0,95,95,20);
			turn_area_2.is_child = true;
			turn_area_2.rotation = 45;
			turn_area_2.y = 16;
			turn_area_2.x = 50;

			this.turn_area = new createjs.Container();
			this.turn_area.graphics = true;
			this.turn_area.x = this.turn_area.ox = this.flop_area.x + 205;
			this.turn_area.y = y;
			this.turn_area.scaleY = 0.71;
			this.turn_area.skewX = -21;
			this.turn_area.outer = turn_area_1;
			this.turn_area.addChild(turn_area_1, turn_area_2)

			this.turn_area.setBounds(0,0,60,140);
			this.turn_area.table_name = "turn";
			this.turn_area.chips = [];

			this.addChild(this.turn_area);

			this.turn_area.dropped_state = (e,x) => {
				for (let i = 0; i < e.children.length; i++) {
					e.children[i].fillCmd.linearGradient(e.children[i].color.dropped, ...e.children[i].gradientOptions)
				}
			}

			this.turn_area.normal_state = (e,x) => {
				for (let i = 0; i < e.children.length; i++) {
					e.children[i].fillCmd.linearGradient(e.children[i].color.default, ...e.children[i].gradientOptions)
				}
			}

			this.turn_area.win_state = (e,x) => {
				for (let i = 0; i < e.children.length; i++) {
					e.children[i].fillCmd.linearGradient(e.children[i].color.win, ...e.children[i].gradientOptions)
				}
			}

			//riverBet
			let river_area_1 = new createjs.Shape();
			river_area_1.graphics.ss(3.5).beginStroke(this.default_color)
			river_area_1.color = this.sidebet_color1;
			river_area_1.gradientOptions = [[0,1], 0,0,126,0];
			river_area_1.fillCmd = river_area_1.graphics.beginLinearGradientFill(this.sidebet_color1.default, ...river_area_1.gradientOptions).command;
			river_area_1.graphics.drawRoundRect(0,0,126,115,13);
			// river_area_1.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 5);
			river_area_1.setBounds(0,0,126,122);
			river_area_1.is_child = true;
			river_area_1.rotation = 45;
			river_area_1.x = 50;

			let river_area_2 = new createjs.Shape();
			river_area_2.graphics.ss(1).beginStroke(this.default_color);
			river_area_2.color = this.sidebet_color2;
			river_area_2.gradientOptions = [[0,1], 0,0,100,0];
			river_area_2.fillCmd = river_area_2.graphics.beginLinearGradientFill(this.sidebet_color2.default, ...river_area_2.gradientOptions).command;
			river_area_2.graphics.drawRoundRect(0,0,100,90,20);
			river_area_2.setBounds(0,0,100,95);
			river_area_2.is_child = true;
			river_area_2.rotation = 45;
			river_area_2.y = 17;
			river_area_2.x = 50;

			this.river_area = new createjs.Container();
			this.river_area.graphics = true;
			this.river_area.x = this.river_area.ox = this.turn_area.x + 205;
			this.river_area.y = y;
			this.river_area.scaleY = 0.77;
			this.river_area.skewX = -27;
			this.river_area.skewY = -3;
			this.river_area.outer = river_area_1;
			this.river_area.addChild(river_area_1, river_area_2)

			this.river_area.setBounds(0,0,60,140);
			this.river_area.table_name = "river";
			this.river_area.chips = [];

			this.addChild(this.river_area);

			this.river_area.dropped_state = (e,x) => {
				for (let i = 0; i < e.children.length; i++) {
					e.children[i].fillCmd.linearGradient(e.children[i].color.dropped, ...e.children[i].gradientOptions)
				}
			}

			this.river_area.normal_state = (e,x) => {
				for (let i = 0; i < e.children.length; i++) {
					e.children[i].fillCmd.linearGradient(e.children[i].color.default, ...e.children[i].gradientOptions)
				}
			}

			this.river_area.win_state = (e,x) => {
				for (let i = 0; i < e.children.length; i++) {
					e.children[i].fillCmd.linearGradient(e.children[i].color.win, ...e.children[i].gradientOptions)
				}
			}
			// this.context.component_toggle.toggleSlave(this.context.component_toggle.classicButton);
			this.chips_container = new createjs.Container();
		},

		startBetAreaAnimation (area) {
			let color = "#fff";

			area.alpha = 1;
			area.is_animate = true;

			if(area.table_name.startsWith('bonus')) {
				color = "#ffff00";

				area.outer.shadow = new createjs.Shadow(color, 0, 0,0);
				createjs.Tween.get(area.outer.shadow, {loop:true})
						.to({
							blur : 4
						},600)
						.to({
							blur : 0
						},600);

			} else {
				for(var x = 0; x < area.children.length; x++) {
					area.children[x].shadow = new createjs.Shadow(color, 0, 0,0);
					createjs.Tween.get(area.children[x].shadow, {loop:true})
					.to({
						blur : 4
					},600)
					.to({
						blur : 0
					},600)

				} //end for
			}
		},

		stopBetAreaAnimation (area) {
			if(!area) return;

			area.is_animate = false;
			if (type == 'b' && area.table_name.startsWith('bonus')){
				if (area.board_img) area.board_img.shadow = null;
			} else {
				for(var x = 0;x<area.children.length; x++) {
					// createjs.Tween.removeTweens(area.children[x].shadow)
					area.children[x].shadow = null;
				}
			}
		},
		resetTable () {

		},
		togglePositions (isActive) {
			if(isActive) {
				createjs.Tween.get(this)
				.to({
					alpha : 0
				},100)
				.to({
					alpha : 1
				},1).call(() => {
					this.scaleX = 0.8;
					this.x += 190;
					// this.flop_area.x -= 27;
					// this.flop_area.scaleX = 0.8;
					// this.turn_area.x -= 72;
					// this.turn_area.scaleX = 0.8;
					// this.river_area.x -= 112;
					// this.river_area.scaleX = 0.8;
					// this.chips_container.scaleX = 1.2;
				})
			} else {
				createjs.Tween.get(this)
				.to({
					alpha : 0
				},100)
				.to({
					alpha : 1
				},1).call(() => {
					this.scaleX = 1;
					this.x -= 190;
					// this.flop_area.x = this.flop_area.ox;
					// this.flop_area.scaleX = 1;
					// this.turn_area.x = this.turn_area.ox;
					// this.turn_area.scaleX = 1;
					// this.river_area.x = this.river_area.ox;
					// this.river_area.scaleX = 1;
					// this.chips_container.scaleX = 1;
				});
			}
		}
	});

	return instance;
}
