import { moneyFormat, numberWithCommas } from '../../factories/factories';

/**
 * menuChips.js
 * @author Kevin Villanueva
 * @since 2018.02.25
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 * Draws room info details
**/

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		playerCount: 0,
		sumBetsPlaced: 0,
		main() {
			this.y = 355;
			this.x = 1510;
			this.visible = false;

			this._modalWidth = 300;
			this._modalHeight = 120;

			//Modal Header
			this._modalHeader = new createjs.Shape();
			this._modalHeader.graphics.beginLinearGradientFill([this.context.theme_color[window.theme].base_color, this.context.theme_color[window.theme].gradColor2], [.1, .9], 10, 10, 10, 35)
				.drawRoundRect(0, .8, this._modalWidth, 35, 3);
			this.addChild(this._modalHeader);

			//Header Text
			this._headerTxt = new createjs.Text(window.language.menu.roominfocaps, window.language.locale == "zh" ? "bold 20px arial" : "bold 15px arial", this.context.theme_color[window.theme].labelcolor);
			this._headerTxt.x = this._modalHeader.x + 10;
			this.addChild(this._headerTxt);

			if(window.language.locale == "zh") {
				this._headerTxt.y = this._modalHeader.y + 7;
			} else {
				this._headerTxt.y = this._modalHeader.y + 9;
			}

			//Header Close button
			this._headerClose = new createjs.Text("X","bold 15px arial", this.context.theme_color[window.theme].labelcolor);
			this._headerClose.x = this._modalWidth - 30;
			this._headerClose.y = this._modalHeader.y + 9;
			this.addChild(this._headerClose);

			//Close button hitarea
			this._headerCloseHit = new createjs.Shape();
			this._headerCloseHit.graphics.beginFill("#000").drawRect(0, 0, 20, 20);
			this._headerCloseHit.x = this._headerClose.x;
			this._headerCloseHit.y = this._headerClose.y;
			this._headerCloseHit.cursor = "pointer";
			this._headerCloseHit.alpha = 0.01;
			this.addChild(this._headerCloseHit);

			//Close modal
			this._headerCloseHit.addEventListener("mousedown", (e) => {
				this.context.component_menu.setActiveModal();
				this.visible = false;
				// $(".hack").css('height','420px')
			});

			this._modalBg = new createjs.Shape();
			this._modalBg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);
			this._modalBg.y = this._modalHeader.y + 35;
			this.addChild(this._modalBg);

			this.textLabel = []
			this.textLabelArr = [window.language.menu.numofplayers, window.language.menu.sumofbets];

			for(var x = 0; x < this.textLabelArr.length; x++) {
				this.textLabel[x] = new createjs.Text(this.textLabelArr[x], window.language.locale == "zh" ? "bold 18px arial" : "bold 15px Lato", this.context.theme_color[window.theme].labelcolor);
				this.textLabel[x].x = 20;
				this.textLabel[x].y = (45 * x) + 60;
				this.addChild(this.textLabel[x]);
			}

			this.player = new createjs.Text(this.playerCount, "23px Bebasneue", this.context.theme_color[window.theme].text_color);
			this.player.x = 280;
			this.player.y = 55;
			this.player.textAlign = 'right';
			this.addChild(this.player);

			this.betsPlaced = new createjs.Text(window.casino == "SS" ? moneyFormat(this.sumBetsPlaced) : numberWithCommas(this.sumBetsPlaced),"23px Bebasneue", this.context.theme_color[window.theme].text_color);
			this.betsPlaced.x = this.player.x;
			this.betsPlaced.y = 100;
			this.betsPlaced.textAlign = 'right';
			this.addChild(this.betsPlaced);
		},

		updateRoomInfo() {
			this.player.text = this.playerCount;
			this.betsPlaced.text = window.casino == "SS" ? moneyFormat(this.sumBetsPlaced) : numberWithCommas(this.sumBetsPlaced)
		},

		changeTheme(new_theme) {
			this._modalHeader.graphics.clear().beginLinearGradientFill([this.context.theme_color[new_theme].base_color, this.context.theme_color[new_theme].gradColor2], [.1, .9], 10, 10, 10, 35)
				.drawRoundRect(0, .8, this._modalWidth, 35, 3);
			this._headerTxt.color = this.context.theme_color[new_theme].labelcolor;
			this._headerClose.color = this.context.theme_color[new_theme].labelcolor;
			this._modalBg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);

			for(var x = 0; x < this.textLabelArr.length; x++) {
				this.textLabel[x].color = this.context.theme_color[new_theme].labelcolor;
			}

			this.player.color = this.context.theme_color[new_theme].text_color;
			this.betsPlaced.color = this.context.theme_color[new_theme].text_color;
		}
	});

	return instance;
}
