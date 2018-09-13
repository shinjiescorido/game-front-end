/**
 * cardResultExtra.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10P
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** extra assets for card result **/

import {fontFormat} from '../../factories/factories';

export default()=> {
	return new blu.Component({
		main() {
			this.dragon_color = 'rgba(21, 101, 192, 1)';
			this.tiger_color = 'rgba(234, 67, 53, 1)';
			this.overlay_color = "rgba(22, 22, 22, 0.9)"

			this.dragon_overlay = new createjs.Shape();
			this.dragon_overlay.graphics.beginFill(this.overlay_color).drawRect(0,0,721,180);
			this.addChild(this.dragon_overlay);

			this.tiger_overlay = new createjs.Shape();
			this.tiger_overlay.graphics.beginFill(this.overlay_color).drawRect(1200-1,0,721,180);
			this.addChild(this.tiger_overlay);

			this.dragon_bg = new createjs.Shape();
			this.dragon_bg.graphics.beginLinearGradientFill(['rgba(21, 101, 192, 0.2)', this.dragon_color], [0,1], 721 * 0.2, 0, 721, 0);
			this.dragon_bg.graphics.drawRect(0,0,721,181);
			this.dragon_bg.alpha = 0;
			this.addChild(this.dragon_bg);

			this.tiger_bg = new createjs.Shape();
	  	this.tiger_bg.graphics.beginLinearGradientFill([this.tiger_color, 'rgba(234, 67, 53, 0.2)'], [0,1], 1200-1, 0, 1200-1 + 721 * 0.8, 0);
			this.tiger_bg.graphics.drawRect(1200-1,0,721,181);
			this.tiger_bg.alpha = 0;
			this.addChild(this.tiger_bg);

			this.dragon_circle = new createjs.Shape()
			this.dragon_circle.graphics.ss(2).beginFill("#1976d2").drawCircle(0,0,55);
			this.dragon_circle.x = 620
			this.dragon_circle.y = 75
			this.dragon_circle.scaleX = this.dragon_circle.scaleY = 0.9;
			this.addChild(this.dragon_circle)

			this.tiger_circle = new createjs.Shape()
			this.tiger_circle.graphics.beginFill("#d32f2f").drawCircle(0,0,55);
			this.tiger_circle.x = this.context.stage.baseWidth - 620
			this.tiger_circle.y = this.dragon_circle.y
			this.tiger_circle.scaleX = this.tiger_circle.scaleY = 0.9;
			this.addChild(this.tiger_circle);

			this.dragon_total = new createjs.Text("0",fontFormat(80, 'regular', 'bebas', false),"#fff");
			this.dragon_total.x = this.dragon_circle.x;
			this.dragon_total.y = this.dragon_circle.y - 45;
			this.dragon_total.textAlign = "center";
			this.dragon_total.baseline = "middle";
			this.addChild(this.dragon_total);

			this.tiger_total = new createjs.Text("0",fontFormat(80, 'regular', 'bebas', false),"#fff");
			this.tiger_total.x = this.tiger_circle.x;
			this.tiger_total.y = this.tiger_circle.y - 45;
			this.tiger_total.textAlign = "center";
			this.tiger_total.baseline = "middle";
			this.addChild(this.tiger_total)

			this.dragon_text = new createjs.Text(window.language.game_specific.dragoncaps,fontFormat(24, 'black', 'lato', window.language.locale == 'jp' ? false : true),"#1565c0");
			this.dragon_text.x = this.dragon_circle.x;
			this.dragon_text.y = this.dragon_circle.y + 55;
			this.dragon_text.textAlign = "center";
			this.dragon_text.baseline = "middle";
			this.addChild(this.dragon_text);

			this.tiger_text = new createjs.Text(window.language.game_specific.tigercaps,fontFormat(24, 'black', 'lato', window.language.locale == 'jp' ? false : true),"#d32f2f");
			this.tiger_text.x = this.tiger_circle.x;
			this.tiger_text.y = this.tiger_circle.y + 55;
			this.tiger_text.textAlign = "center";
			this.tiger_text.baseline = "middle";
			this.addChild(this.tiger_text)

			this.x = 0;
			this.y = this.context.stage.baseHeight - 180;
			this.visible = false;
		},
		setDragonValue(val) {
			this.dragon_total.x = this.dragon_circle.x;

			if(val.toString().indexOf('1') > -1) {
				this.dragon_total.x = this.dragon_circle.x - 3;
			}
			this.dragon_total.text = val;
		},
		setTigerValue(val) {
			this.tiger_total.x = this.tiger_circle.x;

			if(val.toString().indexOf('1') > -1) {
				this.tiger_total.x = this.tiger_circle.x - 3;
			}
			this.tiger_total.text = val;
		},
		setWin(type) {
			// if(type === 'dragon') {
			// 	this[type+'Fill'].style = 'rgba(4, 38, 51, 0.9)';
			// } else if(type === 'tiger'){
			// 	this[type+'Fill'].style = 'rgba(63, 13, 13, 0.9)';
			// }
			this.dragon_bg.visible = true;
			this.tiger_bg.visible = true;

			if(!(type=='tie' || type=='suited_tie')) {
				createjs.Tween.get(this[`${type}_bg`])
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500);

			}	else {
				createjs.Tween.get(this[`dragon_bg`])
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500);

				createjs.Tween.get(this[`tiger_bg`])
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500).to({alpha : 1}, 500)
				.to({alpha : 0}, 500);
			}
		},
		resetWin(type) {
			// this.dragonFill.style = 'rgba(22, 22, 22, 0.9)';
			// this.tigerFill.style = 'rgba(22, 22, 22, 0.9)';
			this.dragon_bg.visible = false;
			this.tiger_bg.visible = false;
			this.dragon_bg.alpha = 0;
			this.tiger_bg.alpha = 0;

		}

	});
}
