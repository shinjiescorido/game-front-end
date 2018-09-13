import {createSprite, randomNum} from '../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		bet_areas: [],
		main () {

			let table_outline = null;

			if(this.context.getResources("the_betboard")) {
				table_outline = new createjs.Bitmap(this.context.getResources("the_betboard"));
				table_outline.regX =  table_outline.getBounds().width/2;
				table_outline.regY =  table_outline.getBounds().height/2;
				table_outline.x = 1018;
				table_outline.y = 579;
				table_outline.alpha = 0.9;
				table_outline.scaleY = 0.88
				table_outline.scaleX = 0.88
			}

			let default_color = "rgba(255,255,255,0.01)";

			let adjustX = 20;

			// let TEST = new createjs.Bitmap(this.context.getResources("bet_area_test"));
			// TEST.x = 550;
			// TEST.y = 650;
			// this.addChild(TEST);

			// === bonus bet area init

			let bonus_default = "#ecdb80";
			let bonus_dropped = "red";
			let bonus_win = "blue";

			let bonus_area = new createjs.Shape();
			bonus_area.graphics.ss(2.5).beginStroke(bonus_default).beginFill(default_color).drawCircle(0,0,72.4);
			bonus_area.x = 49.5;
			bonus_area.y = 78.5;
			bonus_area.skewY = -8;
			bonus_area.is_child = true;

			let bonus_area_2 = new createjs.Shape();
			bonus_area_2.graphics.ss(1.6).beginStroke(bonus_default).beginFill(default_color).drawCircle(0,0,60);
			bonus_area_2.x = 50;
			bonus_area_2.y = 78;
			bonus_area_2.skewY = -8;
			bonus_area_2.scaleX = 1.05;
			bonus_area_2.is_child = true;

			let bonus_area_3 = new createjs.Shape();
			bonus_area_3.graphics.ss(1.6).beginStroke(bonus_default).beginFill(default_color).drawCircle(0,0,52);
			bonus_area_3.x = 50;
			bonus_area_3.y = 78;
			bonus_area_3.skewY = -8;
			bonus_area_3.scaleX = 1.05;
			bonus_area_3.is_child = true;

			let bonus_area_bars = new createjs.Shape();
			bonus_area_bars.graphics.beginFill(bonus_default).moveTo(0,2).bezierCurveTo(0, 2, 15, 8, 24, 2).lineTo(22,16)
				.bezierCurveTo(0, 18, -5, 24, 2, 0).lineTo(0,2);
			bonus_area_bars.x = 28;
			bonus_area_bars.y = 134;

			let bonus_area_bars_2 = new createjs.Shape();
			bonus_area_bars_2.graphics.beginFill(bonus_default).moveTo(0,0).bezierCurveTo(0, 0, 10, -5, 15, -16).lineTo(22,-6)
				.bezierCurveTo(-8, 18, 12, 18, -2, 0).lineTo(-1,0);
			bonus_area_bars_2.x = 83;
			bonus_area_bars_2.y = 124;

			let bonus_area_bars_3 = new createjs.Shape();
			bonus_area_bars_3.graphics.beginFill(bonus_default).moveTo(2,0).bezierCurveTo(10, 16, 14, 16, 17, 20).lineTo(10,30)
				.bezierCurveTo(0, 20, 10, 30, -6, 10).lineTo(4,0);
			bonus_area_bars_3.x = -12;
			bonus_area_bars_3.y = 106;

			let bonus_area_bars_4 = new createjs.Shape();
			bonus_area_bars_4.graphics.beginFill(bonus_default).moveTo(0,0).bezierCurveTo(-2, 6, 0, -2, 18, -12).lineTo(26,-3)
				.bezierCurveTo(0, 10, 14, 18, 0, 4).lineTo(-2,5);
			bonus_area_bars_4.x = 0;
			bonus_area_bars_4.y = 30;

			let bonus_area_bars_5 = new createjs.Shape();
			bonus_area_bars_5.graphics.beginFill(bonus_default).moveTo(0,0).bezierCurveTo(6, -4, 20, 0, 20, 0).lineTo(19,10)
				.bezierCurveTo(0, 10, 14, 12, 0, 11).lineTo(0,18);
			bonus_area_bars_5.x = 51;
			bonus_area_bars_5.y = 7;

			let bonus_area_bars_6 = new createjs.Shape();
			bonus_area_bars_6.graphics.beginFill(bonus_default).moveTo(4,2).bezierCurveTo(6, 2, 20, 16, 20, 20).lineTo(14,30)
				.bezierCurveTo(0, 14, 2, 12, -4, 13).lineTo(4,2);
			bonus_area_bars_6.x = 92;
			bonus_area_bars_6.y = 13;

			this.bet_areas[0] = new createjs.Container();
			this.bet_areas[0].x  = 604;
			this.bet_areas[0].y  = 659;
			this.bet_areas[0].table_name = "bonus_bet";
			this.bet_areas[0].addChild(bonus_area, bonus_area_2, bonus_area_bars, bonus_area_bars_2, bonus_area_bars_3, bonus_area_bars_4, bonus_area_bars_5, bonus_area_bars_6, bonus_area_3);
			this.bet_areas[0].setBounds(0,0,100,100);
			this.bet_areas[0].graphics = true;
			this.bet_areas[0].scaleY = 0.6;
			this.bet_areas[0].skewX = 12;

			this.bet_areas[0].normal_state = (e,x) => {
				e.children[0].graphics.clear().ss(2.5).beginStroke(bonus_default).beginFill(default_color).drawCircle(0,0,72.4);
				e.children[1].graphics.clear().ss(1.6).beginStroke(bonus_default).beginFill(default_color).drawCircle(0,0,60);
				e.children[2].graphics.clear().beginFill(bonus_default).moveTo(0,2).bezierCurveTo(0, 2, 15, 8, 24, 2).lineTo(22,16)
				.bezierCurveTo(0, 18, -5, 24, 2, 0).lineTo(0,2);
				e.children[3].graphics.clear().beginFill(bonus_default).moveTo(0,0).bezierCurveTo(0, 0, 10, -5, 15, -16).lineTo(22,-6)
				.bezierCurveTo(-8, 18, 12, 18, -2, 0).lineTo(-1,0);
				e.children[4].graphics.clear().beginFill(bonus_default).moveTo(2,0).bezierCurveTo(10, 16, 14, 16, 17, 20).lineTo(10,30)
				.bezierCurveTo(0, 20, 10, 30, -6, 10).lineTo(4,0);
				e.children[5].graphics.clear().beginFill(bonus_default).moveTo(0,0).bezierCurveTo(-2, 6, 0, -2, 18, -12).lineTo(26,-3)
				.bezierCurveTo(0, 10, 14, 18, 0, 4).lineTo(-2,5);
				e.children[6].graphics.clear().beginFill(bonus_default).moveTo(0,0).bezierCurveTo(6, -4, 20, 0, 20, 0).lineTo(19,10)
				.bezierCurveTo(0, 10, 14, 12, 0, 11).lineTo(0,18);
				e.children[7].graphics.clear().beginFill(bonus_default).moveTo(4,2).bezierCurveTo(6, 2, 20, 16, 20, 20).lineTo(14,30)
				.bezierCurveTo(0, 14, 2, 12, -4, 13).lineTo(4,2);

				e.children[8].graphics.clear().ss(1.6).beginStroke(bonus_default).beginFill(default_color).drawCircle(0,0,52);
			}

			this.bet_areas[0].dropped_state = (e,x) => {
				e.children[0].graphics.clear().ss(2.5).beginStroke(bonus_dropped).beginFill(default_color).drawCircle(0,0,72.4);
				e.children[1].graphics.clear().ss(1.6).beginStroke(bonus_dropped).beginFill(default_color).drawCircle(0,0,60);
				e.children[2].graphics.clear().beginFill(bonus_dropped).moveTo(0,2).bezierCurveTo(0, 2, 15, 8, 24, 2).lineTo(22,16)
				.bezierCurveTo(0, 18, -5, 24, 2, 0).lineTo(0,2);
				e.children[3].graphics.clear().beginFill(bonus_dropped).moveTo(0,0).bezierCurveTo(0, 0, 10, -5, 15, -16).lineTo(22,-6)
				.bezierCurveTo(-8, 18, 12, 18, -2, 0).lineTo(-1,0);
				e.children[4].graphics.clear().beginFill(bonus_dropped).moveTo(2,0).bezierCurveTo(10, 16, 14, 16, 17, 20).lineTo(10,30)
				.bezierCurveTo(0, 20, 10, 30, -6, 10).lineTo(4,0);
				e.children[5].graphics.clear().beginFill(bonus_dropped).moveTo(0,0).bezierCurveTo(-2, 6, 0, -2, 18, -12).lineTo(26,-3)
				.bezierCurveTo(0, 10, 14, 18, 0, 4).lineTo(-2,5);
				e.children[6].graphics.clear().beginFill(bonus_dropped).moveTo(0,0).bezierCurveTo(6, -4, 20, 0, 20, 0).lineTo(19,10)
				.bezierCurveTo(0, 10, 14, 12, 0, 11).lineTo(0,18);
				e.children[7].graphics.clear().beginFill(bonus_dropped).moveTo(4,2).bezierCurveTo(6, 2, 20, 16, 20, 20).lineTo(14,30)
				.bezierCurveTo(0, 14, 2, 12, -4, 13).lineTo(4,2);
				e.children[8].graphics.clear().ss(1.6).beginStroke(bonus_dropped).beginFill(default_color).drawCircle(0,0,52);
			}

			this.bet_areas[0].win_state = (e,x) => {
				e.children[0].graphics.clear().ss(2.5).beginStroke(win_color).beginFill(win_color).drawCircle(0,0,72.4);
				e.children[1].graphics.clear().ss(1.6).beginStroke(win_color).beginFill(win_color).drawCircle(0,0,60);
				e.children[2].graphics.clear().beginFill(win_color).moveTo(0,2).bezierCurveTo(0, 2, 15, 8, 24, 2).lineTo(22,16)
				.bezierCurveTo(0, 18, -5, 24, 2, 0).lineTo(0,2);
				e.children[3].graphics.clear().beginFill(win_color).moveTo(0,0).bezierCurveTo(0, 0, 10, -5, 15, -16).lineTo(22,-6)
				.bezierCurveTo(-8, 18, 12, 18, -2, 0).lineTo(-1,0);
				e.children[4].graphics.clear().beginFill(win_color).moveTo(2,0).bezierCurveTo(10, 16, 14, 16, 17, 20).lineTo(10,30)
				.bezierCurveTo(0, 20, 10, 30, -6, 10).lineTo(4,0);
				e.children[5].graphics.clear().beginFill(win_color).moveTo(0,0).bezierCurveTo(-2, 6, 0, -2, 18, -12).lineTo(26,-3)
				.bezierCurveTo(0, 10, 14, 18, 0, 4).lineTo(-2,5);
				e.children[6].graphics.clear().beginFill(win_color).moveTo(0,0).bezierCurveTo(6, -4, 20, 0, 20, 0).lineTo(19,10)
				.bezierCurveTo(0, 10, 14, 12, 0, 11).lineTo(0,18);
				e.children[7].graphics.clear().beginFill(win_color).moveTo(4,2).bezierCurveTo(6, 2, 20, 16, 20, 20).lineTo(14,30)
				.bezierCurveTo(0, 14, 2, 12, -4, 13).lineTo(4,2);
				e.children[8].graphics.clear().ss(1.6).beginStroke(win_color).beginFill(default_color).drawCircle(0,0,52);
			}

			// === ante bet area init

			let ante_bet_default = "#3a7484";
			let ante_bet_default2 = "#006064";

			let ante_area = new createjs.Shape();
			ante_area.graphics.ss(4.5).beginStroke("#fff").beginFill(ante_bet_default).drawRoundRect(0,0,120,120,14);
			ante_area.rotation = 45;
			ante_area.x = +50;
			ante_area.is_child = true;
			ante_area.alpha = 0.8;

			let ante_area_2 = new createjs.Shape();
			ante_area_2.graphics.ss(2).beginStroke("#fff").beginFill(ante_bet_default2).drawRoundRect(5.5,5.5,90,90,6);
			ante_area_2.rotation = 45;
			ante_area_2.x = +50;
			ante_area_2.y = 10;
			ante_area_2.is_child = true;

			this.bet_areas[1] = new createjs.Container();
			this.bet_areas[1].x  = 810;
			this.bet_areas[1].y  = 660;
			this.bet_areas[1].table_name = "ante_bet";
			this.bet_areas[1].addChild(ante_area, ante_area_2);
			this.bet_areas[1].setBounds(0,0,80,120);
			this.bet_areas[1].graphics = true;
			this.bet_areas[1].scaleY = 0.53;
			this.bet_areas[1].skewX = 10;
			this.bet_areas[1].alpha = 0.6;

			this.bet_areas[1].normal_state = (e,x) => {
				e.alpha = 0.6;
				createjs.Tween.removeAllTweens(e.children[0]);
			}

			this.bet_areas[1].dropped_state = (e,x) => {
				e.alpha = 1;
			}

			this.bet_areas[1].win_state = (e,x) => {
				createjs.Tween.get(e.children[0], {loop:true})
				.to({
					alpha: .2
				},500)
				.to({
					alpha: .8
				},500)
				e.alpha = 1;
			}

			// === flop bet area init

			let side_bet_default = "#558b2f";
			let side_bet_default2 = "#454c33";

			let flop = new createjs.Shape();
			flop.graphics.ss(4.5).beginStroke("#fff").beginFill(side_bet_default).drawRoundRect(0,0,120,120,14);
			flop.rotation = 45;
			flop.x = +50;
			flop.is_child = true;
			flop.alpha = 0.8;

			let flop2 = new createjs.Shape();
			flop2.graphics.ss(2).beginStroke("#fff").beginFill(side_bet_default2).drawRoundRect(5.5,5.5,90,90,6);
			flop2.rotation = 45;
			flop2.x = +50;
			flop2.y = 10;
			flop2.is_child = true;

			this.bet_areas[2] = new createjs.Container();
			this.bet_areas[2].x  = 1005;
			this.bet_areas[2].y  = 660;
			this.bet_areas[2].table_name = "ante_bet";
			this.bet_areas[2].addChild(flop, flop2);
			this.bet_areas[2].setBounds(0,0,80,120);
			this.bet_areas[2].graphics = true;
			this.bet_areas[2].scaleY = 0.53;
			this.bet_areas[2].skewX = 10;
			this.bet_areas[2].alpha = 0.6;

			this.bet_areas[2].normal_state = (e,x) => {
				e.alpha = 0.6;
				createjs.Tween.removeAllTweens(e.children[0]);
			}

			this.bet_areas[2].dropped_state = (e,x) => {
				e.alpha = 1;
			}

			this.bet_areas[2].win_state = (e,x) => {
				createjs.Tween.get(e.children[0], {loop:true})
				.to({
					alpha: .2
				},500)
				.to({
					alpha: .8
				},500)
				e.alpha = 1;
			}


			for(var x = 0; x < this.bet_areas.length; x++) {
				this.bet_areas[x].min_betAmt = 6000;
				this.bet_areas[x].max_betAmt = 20000;
				this.bet_areas[x].payout_multiplier = 2;
				this.bet_areas[x].chip_anim_toPlay = 2;
				this.bet_areas[x].chip_drop_scale = 0.5;
				this.bet_areas[x].total_bet_amt = 0;
				this.bet_areas[x].x += adjustX;

				/// ====

				if (table_outline) {
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

		}
	});

	return instance;
}
