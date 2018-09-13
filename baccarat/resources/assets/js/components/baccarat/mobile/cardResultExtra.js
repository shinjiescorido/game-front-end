/**
 * cardResultExtra.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** extra assets for card result **/
import {fontFormat} from '../../../factories/factories';

export default()=> {
	return new blu.Component({
		main() {
let width = 0;
			let height = 205;
			let dragonCirclePos = 0
			let tigerCirclePos = 0
			let rad = 42;
			let font = 65;
			let font2 = 30;
			let lblMargin = 55;
			this.x = 0;
			this.y = this.context.stage.baseHeight - height;

			this.player_color = 'rgba(21, 101, 192, 1)';
			this.banker_color = 'rgba(234, 67, 53, 1)';
			this.overlay_color = "rgba(22, 22, 22, 0.9)"

			this.player_overlay = new createjs.Shape();
			this.player_overlay.graphics.beginFill(this.overlay_color).drawRect(0,0,width,height);
			this.addChild(this.player_overlay);

			this.banker_overlay = new createjs.Shape();
			this.banker_overlay.graphics.beginFill(this.overlay_color).drawRect(width,0,width,height);
			this.addChild(this.banker_overlay);

			this.player_bg = new createjs.Shape();
			this.player_bg.graphics.beginLinearGradientFill(['rgba(21, 101, 192, 0.2)', this.player_color], [0,1], width * 0.2, 0, width, 0);
			this.player_bg.graphics.drawRect(0,0,width,height);
			this.player_bg.alpha = 0;
			this.addChild(this.player_bg);

			this.banker_bg = new createjs.Shape();
	  	this.banker_bg.graphics.beginLinearGradientFill([this.banker_color, 'rgba(234, 67, 53, 0.2)'], [0,1], 1200-1, 0, 1200-1 + width * 0.8, 0);
			this.banker_bg.graphics.drawRect(width ,0,width,height);
			this.banker_bg.alpha = 0;
			this.addChild(this.banker_bg);

			this.player_circle = new createjs.Shape()
			this.player_circle.graphics.ss(2).beginFill("#1976d2").drawCircle(0,0,rad);
			this.player_circle.x = dragonCirclePos
			this.player_circle.y = (height/ 2) - 20;
			this.player_circle.scaleX = this.player_circle.scaleY = 0.9;
			this.addChild(this.player_circle)

			this.banker_circle = new createjs.Shape()
			this.banker_circle.graphics.beginFill("#d32f2f").drawCircle(0,0,rad);
			this.banker_circle.x = tigerCirclePos
			this.banker_circle.y = this.player_circle.y
			this.banker_circle.scaleX = this.banker_circle.scaleY = 0.9;
			this.addChild(this.banker_circle);

			this.player_total = new createjs.Text("0",fontFormat(font, 'regular', 'bebas', false),"#fff");
			this.player_total.x = this.player_circle.x;
			this.player_total.y = this.player_circle.y - ((font/2)+5);
			this.player_total.textAlign = "center";
			this.player_total.baseline = "middle";
			this.addChild(this.player_total);

			this.banker_total = new createjs.Text("0",fontFormat(font, 'regular', 'bebas', false),"#fff");
			this.banker_total.x = this.banker_circle.x;
			this.banker_total.y = this.banker_circle.y - ((font/2)+5);
			this.banker_total.textAlign = "center";
			this.banker_total.baseline = "middle";
			this.addChild(this.banker_total)

			this.player_text = new createjs.Text(window.language2.baccarat_betlayout_player,fontFormat(font2, 'black', 'lato', window.language.locale == 'jp' ? false : true),"#1565c0");
			this.player_text.x = this.player_circle.x;
			this.player_text.y = this.player_circle.y + lblMargin;
			this.player_text.textAlign = "center";
			this.player_text.baseline = "middle";
			this.addChild(this.player_text);

			this.banker_text = new createjs.Text(window.language2.baccarat_betlayout_banker,fontFormat(font2, 'black', 'lato', window.language.locale == 'jp' ? false : true),"#d32f2f");
			this.banker_text.x = this.banker_circle.x;
			this.banker_text.y = this.banker_circle.y + lblMargin;
			this.banker_text.textAlign = "center";
			this.banker_text.baseline = "middle";
			this.addChild(this.banker_text)

			this.visible = false;

		},
		setPlayerValue(val) {
			this.player_total.text = val;
		},
		setBankerValue(val) {
			this.banker_total.text = val;
		},
		setWin(type) {

			this.banker_bg.visible = true;
			this.player_bg.visible = true;
			// if(type === 'banker' || type === 'player') {
			// 	this[type+'Fill'].style = this[type+'_color'];
			// }
			
			if(type!='tie') {
				createjs.Tween.get(this[`${type}_bg`])
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500);

			}	else {
				createjs.Tween.get(this[`player_bg`])
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500);

				createjs.Tween.get(this[`banker_bg`])
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500);
			}
		},
		resetWin(type) {
			this.banker_bg.visible = false;
			this.player_bg.visible = false;
			this.banker_bg.alpha = 0;
			this.player_bg.alpha = 0;
			// this.bankerFill.style = 'rgba(22, 22, 22, 0.9)';
			// this.playerFill.style = 'rgba(22, 22, 22, 0.9)';
		},
		screenOrientation() {
			let width = 0;
			let height = 205;
			let dragonCirclePos = 0
			let tigerCirclePos = 0
			let rad = 42;
			let font = 65;
			let font2 = 30;
			let lblMargin = 55;

			this.x = 0;
			if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
				width = this.context.stage.baseHeight/2;
				height = 210;
				dragonCirclePos = width - 60
				tigerCirclePos = width + 60;
				rad = 42;
				font = 65;
				font2 = 30;
				lblMargin = 55;
				this.y = this.context.stage.baseWidth - height;
			} else {
				width = this.context.stage.baseWidth/2;
				height = 144;
				dragonCirclePos = width - 120
				tigerCirclePos = width + 120;
				rad = 40;
				font = 60;
				font2 = 25;
				lblMargin = 40;
				this.y = this.context.stage.baseHeight - height;
			}

			this.player_overlay.graphics.clear().beginFill(this.overlay_color).drawRect(0,0,width,height);

			this.banker_overlay.graphics.clear().beginFill(this.overlay_color).drawRect(width,0,width,height);

			this.player_bg.graphics.clear().beginLinearGradientFill(['rgba(21, 101, 192, 0.2)', this.player_color], [0,1], width * 0.2, 0, width, 0).drawRect(0,0,width,height);

			this.banker_bg.graphics.clear().beginLinearGradientFill([this.banker_color, 'rgba(234, 67, 53, 0.2)'], [0,1], width, 0, width + width * 0.8, 0).drawRect(width ,0,width,height);
			this.banker_bg.alpha = 0;

			this.player_circle.graphics.clear().ss(2).beginFill("#1976d2").drawCircle(0,0,rad);
			this.player_circle.x = dragonCirclePos
			this.player_circle.y = (height/ 2) - 20;

			this.banker_circle.graphics.clear().beginFill("#d32f2f").drawCircle(0,0,rad);
			this.banker_circle.x = tigerCirclePos
			this.banker_circle.y = this.player_circle.y

			this.player_total.font = fontFormat(font, 'regular', 'bebas', false)
			this.player_total.x = this.player_circle.x;
			this.player_total.y = this.player_circle.y - ((font/2)+5);

			this.banker_total.font = fontFormat(font, 'regular', 'bebas', false)
			this.banker_total.x = this.banker_circle.x;
			this.banker_total.y = this.banker_circle.y - ((font/2)+5);

			this.player_text.font = fontFormat(font2, 'black', 'lato', window.language.locale == 'jp' ? false : true)
			this.player_text.x = this.player_circle.x;
			this.player_text.y = this.player_circle.y + lblMargin;

			this.banker_text.font = fontFormat(font2, 'black', 'lato', window.language.locale == 'jp' ? false : true)
			this.banker_text.x = this.banker_circle.x;
			this.banker_text.y = this.banker_circle.y + lblMargin;



		}
	});
}
