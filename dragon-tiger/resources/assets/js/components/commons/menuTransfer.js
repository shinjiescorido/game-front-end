/**
 * menuTransfer.js
 * @author Kevin Villanueva
 * @since 2017.06.15
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 * Handles all transfer menu functionalities
**/

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {

			this.y = 520;
			this.x = 1360;
			this.visible = false;

			this._modalWidth = 450;
			this._modalHeight = 270;

			//Modal Header
			this._modalHeader = new createjs.Shape();
			this._modalHeader.graphics.beginLinearGradientFill([this.context.theme_color[window.theme].base_color, this.context.theme_color[window.theme].gradColor2], [.1, .9], 10, 10, 10, 35)
				.drawRoundRect(0, 0, this._modalWidth, 35, 3);
			this.addChild(this._modalHeader);

			//Header Text
			this._headerTxt = new createjs.Text(window.language.menu.transferfundscaps,"bold 15px arial", this.context.theme_color[window.theme].labelcolor);
			this._headerTxt.x = this._modalHeader.x + 10;
			this._headerTxt.y = this._modalHeader.y + 9;
			this.addChild(this._headerTxt);

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
	        });

			this._modalBg = new createjs.Shape();
			this._modalBg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);
			this._modalBg.y = this._modalHeader.y + 35;
			this.addChild(this._modalBg);

			this.txtTitleFunds = new createjs.Text(window.language.menu.enteramount,"bold 13px arial", this.context.theme_color[window.theme].labelcolor);
			this.txtTitleFunds.x = this._modalWidth / 2;
			this.txtTitleFunds.y = this._modalHeader.y + 50;
			this.txtTitleFunds.textAlign = "center";

			this.txtBalance = new createjs.Text(window.language.menu.availablebalance,"bold 13px arial", this.context.theme_color[window.theme].modal_txt_color);
			this.txtBalance.x = this._modalWidth / 2;
			this.txtBalance.y = this.txtTitleFunds.y + 50;
			this.txtBalance.textAlign = "center";

			this.fundsBg = new createjs.Shape();
			this.fundsBg.graphics.beginFill("#ff9c28").drawRect(0, 0, this._modalWidth, 50);
			this.fundsBg.y = this.txtBalance.y + 25;

			this.txtTotalFunds = new createjs.Text("99,000,000","bold 23px arial", "#000");
			this.txtTotalFunds.x = this._modalWidth / 2;
			this.txtTotalFunds.y = this.fundsBg.y + 12;
			this.txtTotalFunds.textAlign = "center";

			//Button border
			this.btnTransfer = new createjs.Shape();
			this.btnTransfer.graphics.beginStroke(this.context.theme_color[window.theme].btnBorder);
			this.btnTransfer.graphics.setStrokeStyle(2);
			this.btnTransfer.graphics.drawRect(0, 0, 130, 30);
			this.btnTransfer.x = (this._modalWidth / 2) - 65;
			this.btnTransfer.y = this.fundsBg.y + 115;

			//Button hit area
			this.btnTransferHit = new createjs.Shape();
			this.btnTransferHit.graphics.beginFill("#000").drawRect(0, 0, 130, 30);
			this.btnTransferHit.x = (this._modalWidth / 2) - 65;
			this.btnTransferHit.y = this.fundsBg.y + 115;
			this.btnTransferHit.alpha = 0.01;
			this.btnTransferHit.cursor = "pointer";

			this.lblTransfer = new createjs.Text(window.language.menu.transfercaps,"bold 13px arial", this.context.theme_color[window.theme].btnBorder);
			this.lblTransfer.x = this._modalWidth / 2;
			this.lblTransfer.y = this.fundsBg.y + 123;
			this.lblTransfer.textAlign = "center";

			this.addChild(this.txtTitleFunds, this.txtBalance, this.fundsBg, this.txtTotalFunds, this.btnTransfer, this.btnTransferHit, this.lblTransfer);

			//Transfer funds
			this.btnTransferHit.addEventListener("mousedown", (e) => {
		        alert(document.getElementById("transferFunds").value);
	        });
		},
		
		changeTheme(new_theme) {
			this._modalHeader.graphics.clear().beginLinearGradientFill([this.context.theme_color[new_theme].base_color, this.context.theme_color[new_theme].gradColor2], [.1, .9], 10, 10, 10, 35)
			.drawRoundRect(0, 0, this._modalWidth, 35, 3);
			this._headerTxt.color = this.context.theme_color[new_theme].labelcolor;
			this._headerClose.color = this.context.theme_color[new_theme].labelcolor;
			this._modalBg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);
			this.txtTitleFunds.color = this.context.theme_color[new_theme].labelcolor;
			this.txtBalance.color = this.context.theme_color[new_theme].modal_txt_color;
			this.btnTransfer.graphics.clear().beginStroke(this.context.theme_color[new_theme].btnBorder);
			this.lblTransfer.color = this.context.theme_color[new_theme].btnBorder;
		}
	});
	return instance;
}