
import {createSprite, randomNum, createCardSprite, numberCounter, playSound } from '../../factories/factories';

let instance = null;

export default (config, type) => {
	instance = instance || new blu.Component({
		bet_areas: [],
		default_color :"#fff",
		hit_color :"rgba(255, 58, 58, 0.4)",
		fill_color : "rgba(255,255,255,0.1)",

		ante_bet_color2: "#3a7484",
		ante_bet_color1: "#006064",

		side_bet_2 : "#558b2f",
		side_bet_1 : "#454c33",

		bonus_color : "#ddc671",
		bonusplus_color : "#ddc671",

		flop_area : null,
		turn_area : null,
		river_area : null,
		main () {

			let adustX_ftr = 65;
			let table_outline = null;

			// let TEST = new createjs.Bitmap(this.context.getResources("bet_area_test"));
			// TEST.x = 550;
			// TEST.y = 650;

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
			}

			// ========== ante
			this.bet_areas[0] = this.makeAnte();
			this.bet_areas[0].min_bet = mainAreaMin;
			this.bet_areas[0].max_bet = mainAreaMax;

			if(window.language.locale == "zh") {
				this.bet_areas[0].board_img.scaleX = 0.9
				this.bet_areas[0].board_img.scaleY = 0.9
				this.bet_areas[0].board_img.y = 689 - 2;
				this.bet_areas[0].board_img.x = 836 + 5;
			} else {
				this.bet_areas[0].board_img.scaleX = 0.46
				this.bet_areas[0].board_img.scaleY = 0.46
				this.bet_areas[0].board_img.y = 692;
				this.bet_areas[0].board_img.x = 812;
			}

			this.bet_areas[0].dropped_state = (e,x) => {
				// e.shadow = null
				if(e.chips.length && e.is_animate) {
					for(var i = 0;i<e.children.length; i++) {
						e.children[i].shadow = null
					}
					e.alpha = 1;
				}
				// e.alpha = 1
			}

			this.bet_areas[0].normal_state = (e,x) => {
				if(e.is_animate) {
					for(var i = 0; i < e.children.length; i++) {
						if(!e.children[i].shadow) {
							e.children[i].shadow = new createjs.Shadow("#fff", 0, 0,0);
							createjs.Tween.get(e.children[i].shadow, {loop:true})
							.to({ blur : 12 },600)
							.to({ blur : 0 },600)
						}
					} //end for
					return;
				}

				e.alpha = 0.58

			}

			this.bet_areas[0].win_state = (e,x) => {
				e.alpha = 0.58
			}

			// ========== flop
			this.flop_area = this.makeFlop();
			this.flop_area.chips = [];

			this.flop_area.total_bet_amt = 0;

			this.flop_area.dropped_state = (e,x) => {
				e.alpha = 1
			}

			this.flop_area.normal_state = (e,x) => {
				e.alpha = 0.4
			}

			this.addChild(this.flop_area)
			this.addChild(this.flop_area.flop_label)

			// ========== turn
			this.turn_area = this.makeTurn()
			this.turn_area.chips = [];


			this.turn_area.dropped_state = (e,x) => {
				e.alpha = 1
			}

			this.turn_area.normal_state = (e,x) => {
				e.alpha = 0.58
			}

			this.addChild(this.turn_area);
			this.addChild(this.turn_area.turn_label);

			// ================ river

			this.river_area = this.makeRiver();
			this.river_area.chips = [];

			this.river_area.dropped_state = (e,x) => {
				e.alpha = 1
			}

			this.river_area.normal_state = (e,x) => {
				e.alpha = 0.58
			}

			this.addChild(this.river_area);
			this.addChild(this.river_area.river_label);

			// ========== bonus

			this.bet_areas[1] = this.makeBonus();
			this.bet_areas[1].min_bet = bonusMin;
			this.bet_areas[1].max_bet = bonusMax;

			// type bonusplus
			if(type == 'b'){
				this.bet_areas[1].dropped_state = (e,x) => {
					if(e.chips.length && e.is_animate) {
						e.board_img.shadow = null
						e.board_img.alpha = 1;
					}
				}

				this.bet_areas[1].normal_state = (e,x) => {
					if(e.is_animate) {

						if(!e.board_img.shadow) {
							e.board_img.shadow = new createjs.Shadow("yellow", 0, 0,0);
							createjs.Tween.get(e.board_img.shadow, {loop:true})
									.to({ blur : 12 },600)
									.to({ blur : 0 },600)
						}

						return;
					}
					e.board_img.alpha = 0.7
				}

				this.bet_areas[1].win_state = (e,x) => {
					e.board_img.alpha = 0.7
				}
			}
			//type normal
			else {
				this.bet_areas[1].dropped_state = (e,x) => {
					if(e.chips.length && e.is_animate) {
						for(var i = 0;i<e.children.length; i++) {
							e.children[i].shadow = null
						}
						e.alpha = 1;
					}
				}

				this.bet_areas[1].normal_state = (e,x) => {
					if(e.is_animate) {
						for(var i = 0; i < e.children.length; i++) {
							if(!e.children[i].shadow) {
								e.children[i].shadow = new createjs.Shadow("yellow", 0, 0,0);
								createjs.Tween.get(e.children[i].shadow, {loop:true})
										.to({ blur : 12 },600)
										.to({ blur : 0 },600)
							}
						} //end for
						return;
					}
					e.alpha = 0.58
				}

				this.bet_areas[1].win_state = (e,x) => {
					e.alpha = 0.58
				}
			}



		// ========== bonusplus start
		if(type == 'b'){
			this.bet_areas[2] = this.makeBonusplus();
			this.bet_areas[2].min_bet = bonusplusMin;
			this.bet_areas[2].max_bet = bonusplusMax;

			this.bet_areas[2].dropped_state = (e,x) => {
				if(e.chips.length && e.is_animate) {
					e.board_img.shadow = null
					e.board_img.alpha = 1;
				}
			}

			this.bet_areas[2].normal_state = (e,x) => {
				if(e.is_animate) {

					if(!e.board_img.shadow) {
						e.board_img.shadow = new createjs.Shadow("yellow", 0, 0,0);
						createjs.Tween.get(e.board_img.shadow, {loop:true})
								.to({ blur : 12 },600)
								.to({ blur : 0 },600)
					}

					return;
				}
				e.board_img.alpha = 0.7
			}

			this.bet_areas[2].win_state = (e,x) => {
				e.board_img.alpha = 0.7
			}
		}
		// ========== bonusplus end

			if(this.context.getResources("the_betboard")) {
				table_outline = new createjs.Bitmap(this.context.getResources("the_betboard"));
				table_outline.regX =  table_outline.getBounds().width/2;
				table_outline.regY =  table_outline.getBounds().height/2;
				table_outline.x = this.context.stage.baseWidth/2 + 52;
				table_outline.y = this.context.stage.baseHeight/2 + 81
				table_outline.scaleY = 0.85
				table_outline.scaleX = 0.85
			}

			for(var x = 0; x < this.bet_areas.length; x++) {
	    		this.bet_areas[x].min_betAmt = parseInt(this.bet_areas[x].min_bet);
	    		this.bet_areas[x].max_betAmt = parseInt(this.bet_areas[x].max_bet);

				this.bet_areas[x].payout_multiplier = 1;
				this.bet_areas[x].chip_anim_toPlay = 2;
				this.bet_areas[x].chip_drop_scale = 0.8;
				if(this.bet_areas[x].table_name.startsWith('bonus') && type == 'b'){
					this.bet_areas[x].board_img.alpha = 0.7;
				}else{
					this.bet_areas[x].alpha = 0.5;
				}

				this.bet_areas[x].total_bet_amt = 0;

				if(table_outline) {
					table_outline.hitArea = this.bet_areas[x];
				}
			}

			if(table_outline) {
				this.context.component_betBoard.addChild(table_outline);
				let setchild = setInterval(()=> {
					if (this.context.component_betBoard.bet_areas.length) {
						this.context.component_betBoard.setChildIndex(table_outline,this.context.component_betBoard.children.length-1 );
						clearInterval(setchild);
					}
				},1000)

			}

			this.chips_container = new createjs.Container();
			this.addChild(this.chips_container);
		},
		startBetAreaAnimation (area) {
			let color = "#fff";

			if(area.table_name == "bonus" || area.table_name == "bonusplus") {
				color = "yellow";
			}

			area.alpha = 1;
			area.is_animate = true;

			if(type == 'b' && area.table_name.startsWith('bonus')){// type is bonusplus
				//=== type bonusplus image glow start
				area.board_img.shadow = new createjs.Shadow(color, 0, 0,0);
				createjs.Tween.get(area.board_img.shadow, {loop:true})
						.to({
							blur : 12
						},600)
						.to({
							blur : 0
						},600);
				//=== type bonusplus image glow end
			}else{
				for(var x = 0; x < area.children.length; x++) {
					area.children[x].shadow = new createjs.Shadow(color, 0, 0,0);

					createjs.Tween.get(area.children[x].shadow, {loop:true})
							.to({
								blur : 12
							},600)
							.to({
								blur : 0
							},600)
				} //end for
			}
		},

		stopBetAreaAnimation (area) {
			if(!area){
				return;
			}

			area.is_animate = false;
			if(type == 'b' && area.table_name.startsWith('bonus')){
				if (area.board_img.shadow) area.board_img.shadow = null;
			} else {
				for(var x = 0;x<area.children.length; x++) {
					// createjs.Tween.removeTweens(area.children[x].shadow)
					area.children[x].shadow = null;
				}
			}
		},
		resetTable () {
			this.chips_container.removeAllChildren();
		},

		cloneAnte(){

			let betCon = new createjs.Container();
			let ante = this.makeAnte();
			ante.outer.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);

			let bonus = this.makeBonus();
			bonus.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);

			if(window.language.locale == "zh") {
				ante.board_img.scaleX = 0.9
				ante.board_img.scaleY = 0.9
				ante.board_img.y = 689 - 2;
				ante.board_img.x = 836 + 18;
			} else {
				ante.board_img.scaleX = 0.46
				ante.board_img.scaleY = 0.46
				ante.board_img.y = 692;
				ante.board_img.x = 825;
			}

			betCon.addChild(bonus, bonus.board_img, ante, ante.board_img);

			return betCon;
		},

		cloneFlop(){
			let flopCon = new createjs.Container();
			let flop = this.makeFlop();
			flop.outer.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);

			flopCon.addChild(flop, flop.flop_label);
			return flopCon;
		},

		cloneTurn(){
			let turnCon = new createjs.Container();
			let turn = this.makeTurn();
			turn.outer.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);

			turnCon.addChild(turn, turn.turn_label);
			return turnCon;
		},

		cloneRiver(){
			let riverCon = new createjs.Container();
			let river = this.makeRiver();
			river.outer.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);

			riverCon.addChild(river, river.river_label);
			return riverCon;
		},

		makeBonus(){
			let bonus_area = new createjs.Shape();
			let bonus = new createjs.Container();

			// pocket type
			if(type == 'b'){
				bonus_area.graphics.ss(2.5).beginStroke(this.bonus_color).beginFill("rgba(255,255,255,1)").drawRoundRect(0,0,95,100,12);
				//bonus_area.setBounds(0,0,115,115,12);
				bonus_area.rotation = 55;
				bonus_area.x = 57.5;
				bonus_area.y = 5;
				bonus_area.scaleX = 0.8;
				bonus_area.scaleY = 0.86;
				bonus_area.alpha = 0.01;
				bonus_area.skewX = 5;
				bonus_area.skewY = -5;
				bonus_area.is_child = true;

				let bonus_area_2 = new createjs.Bitmap(this.context.getResources("pocket_text"));
				bonus_area_2.x = -42;
				bonus_area_2.y = 46;
				bonus_area_2.scaleX = 0.46;
				bonus_area_2.scaleY = 0.88;
				bonus_area_2.alpha =  1;
				bonus_area_2.is_child = true;

				bonus.graphics = true;
				bonus.x = 637;
				bonus.y = 665;
				//bonus.skewX = 10;
				bonus.table_name = "bonus";
				bonus.addChild(bonus_area, bonus_area_2);
				bonus.scaleY = 0.58;
				bonus.setBounds(-10,0,80,100);
				bonus.board_img = new createjs.Bitmap(this.context.getResources("pocket_cont"));
				bonus.board_img.scaleX = 0.47;
				bonus.board_img.scaleY = 0.47;
				bonus.board_img.alpha = 0.58;
				bonus.board_img.x = 615;
				bonus.board_img.y = 657.8;
			}
			// normal type
			else {
				bonus_area.graphics.ss(2.5).beginStroke(this.bonus_color).beginFill("rgba(255,255,255,0.01)").drawCircle(0,0,72.4);
				bonus_area.x = 49.5;
				bonus_area.y = 78.5;
				bonus_area.skewY = -8;
				bonus_area.is_child = true;

				let bonus_area_2 = new createjs.Shape();
				bonus_area_2.graphics.ss(1.6).beginStroke(this.bonus_color).beginFill("rgba(255,255,255,0.01)").drawCircle(0,0,60);
				bonus_area_2.x = 50;
				bonus_area_2.y = 78;
				bonus_area_2.skewY = -8;
				bonus_area_2.scaleX = 1.05;
				bonus_area_2.is_child = true;

				let bonus_area_3 = new createjs.Shape();
				bonus_area_3.graphics.ss(1.6).beginStroke(this.bonus_color).beginFill("rgba(255,255,255,0.01)").drawCircle(0,0,52);
				bonus_area_3.x = 50;
				bonus_area_3.y = 78;
				bonus_area_3.skewY = -8;
				bonus_area_3.scaleX = 1.05;
				bonus_area_3.is_child = true;

				let bonus_area_bars = new createjs.Shape();
				bonus_area_bars.graphics.beginFill(this.bonus_color).moveTo(0,2).bezierCurveTo(0, 2, 15, 8, 24, 2).lineTo(22,16)
						.bezierCurveTo(0, 18, -5, 24, 2, 2).lineTo(0,2);
				bonus_area_bars.x = 28;
				bonus_area_bars.y = 134;
				bonus_area_bars.is_child = true;

				let bonus_area_bars_2 = new createjs.Shape();
				bonus_area_bars_2.graphics.beginFill(this.bonus_color).moveTo(0,0).bezierCurveTo(0, 0, 10, -5, 15, -16).lineTo(22,-6)
						.bezierCurveTo(-8, 18, 12, 18, -2, 0).lineTo(-1,0);
				bonus_area_bars_2.x = 83;
				bonus_area_bars_2.y = 124;
				bonus_area_bars_2.is_child = true;

				let bonus_area_bars_3 = new createjs.Shape();
				bonus_area_bars_3.graphics.beginFill(this.bonus_color).moveTo(2,0).bezierCurveTo(10, 16, 14, 16, 17, 20).lineTo(10,30)
						.bezierCurveTo(0, 20, 10, 30, -6, 10).lineTo(4,0);
				bonus_area_bars_3.x = -12;
				bonus_area_bars_3.y = 106;
				bonus_area_bars_3.is_child = true;

				let bonus_area_bars_4 = new createjs.Shape();
				bonus_area_bars_4.graphics.beginFill(this.bonus_color).moveTo(0,0).bezierCurveTo(-2, 6, 0, -2, 18, -12).lineTo(26,-3)
						.bezierCurveTo(0, 10, 14, 18, 0, 4).lineTo(-2,5);
				bonus_area_bars_4.x = 0;
				bonus_area_bars_4.y = 30;
				bonus_area_bars_4.is_child = true;

				let bonus_area_bars_5 = new createjs.Shape();
				bonus_area_bars_5.graphics.beginFill(this.bonus_color).moveTo(0,0).bezierCurveTo(6, -4, 20, 0, 20, 0).lineTo(19,10)
						.bezierCurveTo(0, 10, 14, 12, 0, 10).lineTo(0,18);
				bonus_area_bars_5.x = 51;
				bonus_area_bars_5.y = 7;
				bonus_area_bars_5.is_child = true;

				let bonus_area_bars_6 = new createjs.Shape();
				bonus_area_bars_6.graphics.beginFill(this.bonus_color).moveTo(4,2).bezierCurveTo(6, 2, 20, 16, 20, 20).lineTo(14,30)
						.bezierCurveTo(0, 14, 2, 12, -4, 13).lineTo(4,2);
				bonus_area_bars_6.x = 92;
				bonus_area_bars_6.y = 13;
				bonus_area_bars_6.is_child = true;

				bonus.graphics = true;
				bonus.x = 622;
				bonus.y = 660 - 2;
				bonus.skewX = 10;
				bonus.table_name = "bonus";
				bonus.addChild(bonus_area, bonus_area_2, bonus_area_bars, bonus_area_bars_2, bonus_area_bars_3, bonus_area_bars_4, bonus_area_bars_5, bonus_area_bars_6, bonus_area_3)
				bonus.scaleY = 0.58;
				bonus.setBounds(-10,0,80,100);
				bonus.board_img = new createjs.Bitmap(this.context.getResources("bonus_label"));
				bonus.board_img.scaleX = 0.46
				bonus.board_img.scaleY = 0.46
				bonus.board_img.x = 597;
				bonus.board_img.y = 692;
			}
			return bonus;
		},

		makeBonusplus(){
			let bonusplus_area = new createjs.Shape();

			bonusplus_area.graphics.ss(2.5).beginStroke(this.bonusplus_color).beginFill("rgba(255,255,255,1)").drawCircle(0,0,65.4);
			bonusplus_area.x = 35.8;
			bonusplus_area.y = 66.5;
			bonusplus_area.scaleY = 0.85;
			bonusplus_area.alpha = 0.01;
			bonusplus_area.skewX = 10;
			bonusplus_area.skewY = -14;
			bonusplus_area.is_child = true;

			let bonusplus_area_2 = new createjs.Bitmap(this.context.getResources("bonusplus_text"));
			bonusplus_area_2.x = -45;
			bonusplus_area_2.y = 45;
			bonusplus_area_2.scaleX = 0.45;
			bonusplus_area_2.scaleY = 0.8;
			bonusplus_area_2.alpha =  1;
			bonusplus_area_2.is_child = true;

			let bonusplus = new createjs.Container();
			bonusplus.graphics = true;
			bonusplus.x = 457;
			bonusplus.y = 663;
			bonusplus.table_name = "bonusplus";
			bonusplus.addChild(bonusplus_area, bonusplus_area_2);
			bonusplus.scaleY = 0.58;
			bonusplus.setBounds(-10,0,80,100);
			bonusplus.board_img = new createjs.Bitmap(this.context.getResources("bonusplus_cont"));
			bonusplus.board_img.scaleX = 0.46;
			bonusplus.board_img.scaleY = 0.46;
			bonusplus.board_img.alpha = 0.58;
			bonusplus.board_img.x = 417;
			bonusplus.board_img.y = 652;

			return bonusplus;
		},

		makeAnte(){

			let ante_area_1 = new createjs.Shape();
			ante_area_1.graphics.ss(3).beginStroke(this.default_color).beginFill(this.ante_bet_color1).drawRoundRect(0,0,115,115,12);
			ante_area_1.setBounds(0,0,115,115,12);
			ante_area_1.is_child = true;
			ante_area_1.rotation = 45;
			ante_area_1.x = 50;

			let ante_area_2 = new createjs.Shape();
			ante_area_2.graphics.ss(3).beginStroke(this.default_color).beginFill(this.ante_bet_color2).drawRoundRect(0,0,90,90,8);
			ante_area_2.setBounds(0,0,90,90,12);
			ante_area_2.is_child = true;
			ante_area_2.rotation = 45;
			ante_area_2.y = 14;
			ante_area_2.x = 50;

			let ante = new createjs.Container();
			ante.graphics = true;
			ante.x = 820;
			ante.y = 660;
			ante.table_name = "ante";
			ante.outer = ante_area_1;
			ante.addChild(ante_area_1, ante_area_2)
			ante.skewX = 11;
			ante.scaleY = 0.54;
			ante.setBounds(-30,10,60,130);
			ante.board_img = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "ante_label_zh" : "ante_label"));
			ante.board_img.scaleX = window.language.locale == "zh" ? 0.6 : 0.46
			ante.board_img.scaleY = window.language.locale == "zh" ? 0.6 : 0.46
			ante.board_img.x = window.language.locale == "zh" ? 860 : 825;
			ante.board_img.y = 692;

			return ante;
		},

		makeFlop() {
			let adustX_ftr = 65;
			let flop_area_1 = new createjs.Shape();
			flop_area_1.graphics.ss(3).beginStroke(this.default_color).beginFill(this.side_bet_1).drawRoundRect(0,0,117,117,12);
			flop_area_1.setBounds(0,0,117,117,12);
			flop_area_1.is_child = true;
			flop_area_1.rotation = 45;
			flop_area_1.x = 50;

			let flop_area_2 = new createjs.Shape();
			flop_area_2.graphics.ss(3).beginStroke(this.default_color).beginFill(this.side_bet_2).drawRoundRect(0,0,92,92,8);
			flop_area_2.setBounds(0,0,92,92,12);
			flop_area_2.is_child = true;
			flop_area_2.rotation = 45;
			flop_area_2.y = 14;
			flop_area_2.x = 50;


			let flop_label = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "flop_label_zh" : "flop_label"));
			flop_label.x = 1036 + adustX_ftr;
			flop_label.y = 692;
			flop_label.scaleY = flop_label.scaleX = 0.58;

			if(window.language.locale == "zh") {
								flop_label.x = 1036 + adustX_ftr + 15;
								flop_label.y = 689;
								flop_label.scaleY = flop_label.scaleX = 0.85;
			} else {
								flop_label.x = 1036 + adustX_ftr;
								flop_label.y = 692;
								flop_label.scaleY = flop_label.scaleX = 0.58;
			}

			let flop = new createjs.Container();
			flop.graphics = true;
			flop.x = 1026 + adustX_ftr;
			flop.y = 660;
			flop.table_name = "flop";
			flop.outer = flop_area_1;
			flop.addChild(flop_area_1, flop_area_2)
			flop.flop_label = flop_label;
			flop.skewX = -8;
			flop.scaleY = 0.52;
			flop.alpha = 0.58;
			flop.setBounds(-30,10,60,130);

			return flop;
		},

		makeTurn() {
			let adustX_ftr = 65;
			let turn_area_1 = new createjs.Shape();
			turn_area_1.graphics.ss(3).beginStroke(this.default_color).beginFill(this.side_bet_1).drawRoundRect(0,0,115,115,12);
			turn_area_1.setBounds(0,0,115,115,12);
			turn_area_1.is_child = true;
			turn_area_1.rotation = 45;
			turn_area_1.x = 50;

			let turn_area_2 = new createjs.Shape();
			turn_area_2.graphics.ss(3).beginStroke(this.default_color).beginFill(this.side_bet_2).drawRoundRect(0,0,90,90,7);
			turn_area_2.setBounds(0,0,90,90,12);
			turn_area_2.is_child = true;
			turn_area_2.rotation = 45;
			turn_area_2.y = 14;
			turn_area_2.x = 50;

			let turn_label = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "turn_label_zh" : "turn_label"));

			if(window.language.locale == "zh") {
							turn_label.x = 1205 + adustX_ftr + 15;
							turn_label.y = 689;
							turn_label.scaleY = turn_label.scaleX = 0.85;
			} else {
							turn_label.x = 1205 + adustX_ftr;
							turn_label.y = 692;
							turn_label.scaleY = turn_label.scaleX = 0.58;
			}

			let turn = new createjs.Container();
			turn.graphics = true;
			turn.x = 1190 + adustX_ftr;
			turn.y = 660;
			turn.table_name = "turn";
			turn.outer = turn_area_1;
			turn.turn_label = turn_label;
			turn.addChild(turn_area_1, turn_area_2)
			turn.skewX = -24;
			turn.scaleY = 0.58;
			turn.alpha = 0.58;
			turn.setBounds(-30,10,60,130);

			return turn;
		},
		makeRiver(){
			let adustX_ftr = 75;
			let river_area_1 = new createjs.Shape();
			river_area_1.graphics.ss(3).beginStroke(this.default_color).beginFill(this.side_bet_1).drawRoundRect(0,0,126,122,12);
			river_area_1.setBounds(0,0,117,128);
			river_area_1.is_child = true;
			river_area_1.rotation = 45;
			river_area_1.x = 50;

			let river_area_2 = new createjs.Shape();
			river_area_2.graphics.ss(3).beginStroke(this.default_color).beginFill(this.side_bet_2).drawRoundRect(0,0,100,94,12);
			river_area_2.setBounds(0,0,94,95);
			river_area_2.is_child = true;
			river_area_2.rotation = 45;
			river_area_2.y = 16;
			river_area_2.x = 49;

			let river = new createjs.Container();
			river.graphics = true;
			river.x = 1356 + adustX_ftr;
			river.y = 660;
			river.table_name = "river";
			river.outer = river_area_1;
			river.addChild(river_area_1, river_area_2)
			river.skewX = -32;
			river.skewY = -2;
			river.scaleY = 0.58;
			river.alpha = 0.58;
			river.setBounds(-30,10,60,130);

			let river_label = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "river_label_zh" : "river_label"));

			if(window.language.locale == "zh") {
							river_label.x = 1378 + adustX_ftr + 12;
							river_label.y = 685;
							river_label.scaleY = river_label.scaleX = 0.85;
			} else {
							river_label.x = 1378 + adustX_ftr;
							river_label.y = 692;
							river_label.scaleY = river_label.scaleX = 0.58;
			}

			river.river_label = river_label;

			return river;
		}
	});

	return instance;
}
