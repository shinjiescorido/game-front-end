/**
 * cardResultExtra.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** extra assets for card result **/

export default()=> {
	return new blu.Component({
		main() {

			this.banker_color = 'rgba(234, 67, 53, 1)';
			this.player_color = 'rgba(21, 101, 192, 1)';
			this.overlay_color = "rgba(22, 22, 22, 0.9)"

			this.player_overlay = new createjs.Shape();
			this.player_overlay.graphics.beginFill(this.overlay_color).drawRect(0,0,721,180);
			this.addChild(this.player_overlay);

			this.banker_overlay = new createjs.Shape();
			this.banker_overlay.graphics.beginFill(this.overlay_color).drawRect(1200-1,0,721,180);
			this.addChild(this.banker_overlay);

			this.player_bg = new createjs.Shape();
			this.player_bg.graphics.beginLinearGradientFill(['rgba(21, 101, 192, 0.2)', this.player_color], [0,1], 721 * 0.2, 0, 721, 0);
			this.player_bg.graphics.drawRect(0,0,721,180);
			this.player_bg.alpha = 0;
			this.addChild(this.player_bg);

			this.banker_bg = new createjs.Shape();
			this.banker_bg.graphics.beginLinearGradientFill([this.banker_color, 'rgba(234, 67, 53, 0.2)'], [0,1], 1200-1, 0, 1200-1 + 721 * 0.8, 0);
			this.banker_bg.graphics.drawRect(1200-1,0,721,180);
			this.banker_bg.alpha = 0;
			this.addChild(this.banker_bg);

			this.player_circle = new createjs.Shape()
			this.player_circle.graphics.ss(2).beginFill("#1976d2").drawCircle(0,0,55);
			this.player_circle.x = 620
			this.player_circle.y = 90
			this.player_circle.scaleX = this.player_circle.scaleY = 0.9;
			this.addChild(this.player_circle)

			this.banker_circle = new createjs.Shape()
			this.banker_circle.graphics.beginFill("#d32f2f").drawCircle(0,0,55);
			this.banker_circle.x = this.context.stage.baseWidth - 620
			this.banker_circle.y = this.player_circle.y
			this.banker_circle.scaleX = this.banker_circle.scaleY = 0.9;
			this.addChild(this.banker_circle);

			this.player_text = new createjs.Text("0","80px bebas-regular","#fff");
			this.player_text.x = this.player_circle.x;
			this.player_text.y = this.player_circle.y - 42
			this.player_text.textAlign = "center";
			this.player_text.baseline = "middle";
			this.addChild(this.player_text);
			
			this.banker_text = new createjs.Text("0","80px bebas-regular","#fff");
			this.banker_text.x = this.banker_circle.x;
			this.banker_text.y = this.banker_circle.y - 42
			this.banker_text.textAlign = "center";
			this.banker_text.baseline = "middle";
			this.addChild(this.banker_text)

			this.x = 0;
			this.visible = false;
			this.y = this.context.stage.baseHeight - 180;
		},
		setPlayerValue(val) {
			this.player_text.text = val;
		},
		setBankerValue(val) {
			this.banker_text.text = val;
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
		}

	});
}