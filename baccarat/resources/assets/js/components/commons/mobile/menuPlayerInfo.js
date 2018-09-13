import { moneyFormat, numberWithCommas } from '../../../factories/factories';

/**
 * menuChips.js
 * @author Kevin Villanueva
 * @since 2017.06.15
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 * Handles all modify chips functionalities
**/

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {

			this.x = 460;
			this.y = 90;
			this.visible = false;

      this.scaleX = this.scaleY = 1.5;

			this._modalWidth = 460;
			this._modalHeight = 250;

			//Modal Header
			this._modalHeader = new createjs.Shape();
			this._modalHeader.graphics.beginLinearGradientFill([this.context.theme_color[window.theme].base_color, this.context.theme_color[window.theme].gradColor2], [.1, .9], 10, 10, 10, 35)
				.drawRoundRect(0, 0, this._modalWidth, 35, 3);
			this.addChild(this._modalHeader);

			//Header Text
			this._headerTxt = new createjs.Text(window.language.menu.playerinfocaps, window.language.locale == "zh" ? "bold 20px arial" : "bold 15px arial", this.context.theme_color[window.theme].labelcolor);
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
			this._headerCloseHit.graphics.beginFill("#000").drawRect(0, 0, 45, 35);
			this._headerCloseHit.x = this._headerClose.x - 15;
			this._headerCloseHit.y = this._headerClose.y - 8;
			this._headerCloseHit.cursor = "pointer";
			this._headerCloseHit.alpha = 0.01;
			this.addChild(this._headerCloseHit);

			//Close modal
			this._headerCloseHit.addEventListener("mousedown", (e) => {
	        	this.context.component_menu.setActiveModal();
	        	this.visible = false;
	        });

			this._modalBg = new createjs.Shape();
			this._modalBg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);
			this._modalBg.y = this._modalHeader.y + 35;
			this.addChild(this._modalBg);

			let line = [];
			this.textLabel = [window.language.menu.playername, window.language.menu.playerbalance, window.language.menu.roundid, window.language.menu.dealernamecaps, window.language.menu.channelcaps];

			for(var x = 0; x <= 4; x++) {
				line[x] = new createjs.Shape();
				line[x].graphics.setStrokeStyle(1).beginStroke("#4a4a4a");
				line[x].graphics.moveTo(0, (50 * x+1) + 83);
				line[x].graphics.lineTo(450, (50 * x+1) + 83);
				line[x].graphics.endStroke();

				this.textLabel[x] = new createjs.Text(this.textLabel[x], window.language.locale == "zh" ? "bold 18px arial" : "bold 13px arial", this.context.theme_color[window.theme].labelcolor);
				this.textLabel[x].x = 50;

				if(window.language.locale == "zh") {
					this.textLabel[x].y = (50 * x+1) + 47;
				} else {
					this.textLabel[x].y = (50 * x+1) + 50;
				}

				this.addChild(line[x], this.textLabel[x]);
			}

			this.player = new createjs.Text(window.user_name,"13px arial", this.context.theme_color[window.theme].modal_txt_color);
			this.player.x = 250;
			this.player.y = this._modalHeader.y + 50;

			this.balance = new createjs.Text(window.casino == "SS" ? moneyFormat(this.context.context.user_money) : numberWithCommas(this.context.context.user_money),"13px arial", this.context.theme_color[window.theme].modal_txt_color);
			this.balance.x = this.player.x;
			this.balance.y = this.player.y + 50;

			this.round = new createjs.Text(window.round_id,"13px arial", this.context.theme_color[window.theme].modal_txt_color);
			this.round.x = this.player.x;
			this.round.y = this.balance.y + 50;

			this.dealer = new createjs.Text("","13px arial", this.context.theme_color[window.theme].modal_txt_color);
			this.dealer.x = this.player.x;
			this.dealer.y = this.round.y + 50;

			this.channel = new createjs.Text("Baccarat "+window.tableNum,"13px arial", this.context.theme_color[window.theme].modal_txt_color);
			this.channel.x = this.player.x;
			this.channel.y = this.dealer.y + 50;

			this.addChild(this.player, this.balance, this.round, this.dealer, this.channel);
		},
		changeTheme(new_theme) {
			this._modalHeader.graphics.clear().beginLinearGradientFill([this.context.theme_color[new_theme].base_color, this.context.theme_color[new_theme].gradColor2], [.1, .9], 10, 10, 10, 35)
			.drawRoundRect(0, 0, this._modalWidth, 35, 3);
			this._headerTxt.color = this.context.theme_color[new_theme].labelcolor;
			this._headerClose.color = this.context.theme_color[new_theme].labelcolor;
			this._modalBg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);

			for(var x = 0; x <= 4; x++) {
				
				this.textLabel[x].color = this.context.theme_color[new_theme].labelcolor;
			}
			this.player.color = this.context.theme_color[new_theme].modal_txt_color;
			this.balance.color = this.context.theme_color[new_theme].modal_txt_color;
			this.round.color = this.context.theme_color[new_theme].modal_txt_color;
			this.dealer.color = this.context.theme_color[new_theme].modal_txt_color;
			this.channel.color = this.context.theme_color[new_theme].modal_txt_color;

		},
		updateDealer(deal) {
			this.dealer.text = deal;
		},
		updatePlayerInfo(balance, round, dealer) {
			if(balance) {
				this.balance.text = balance;
			}
			if(round) {
				this.round.text = round;
			}
			// if(dealer) {
			// 	this.dealer.text = dealer;
			// }
		}
	});
	return instance;
}
