/**
 * bet-details-mobile.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** screen/container for all game components. handles preloading and loading screen and adding components to stage **/

import {createSprite, randomNum, cardRes, numberCounter} from '../../../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {

			this.bet_amount = 0;
			this.win_amount = 0;

			this.bg = new createjs.Shape();
			this.bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRoundRectComplex(0, 0, 220, 110, 0, 10, 10, 0);
			this.bg.alpha = 0.8;
			this.addChild(this.bg);

			this.user_money = new createjs.Text("0", "26px bebas-regular", this.context.theme_color[window.theme].menu_text_color);
			this.user_money.textAlign = "right";
			this.user_money.x = 180;
			this.user_money.y = 15;
			this.addChild(this.user_money);

			this.total_bet_amt = new createjs.Text("0", "22px bebas-regular", this.context.theme_color[window.theme].text_color);
			this.total_bet_amt.textAlign = "center";
			this.total_bet_amt.x = 40;
			this.total_bet_amt.y = 54;
			this.addChild(this.total_bet_amt);

			this.total_win_amt = new createjs.Text("0", "22px bebas-regular", this.context.theme_color[window.theme].text_color);
			this.total_win_amt.textAlign = "center";
			this.total_win_amt.x = 150;
			this.total_win_amt.y = 54;
			this.addChild(this.total_win_amt);

			this.x = 0;
			this.y = 130;

			let chip = window.theme+"-theme-chip_icon";
			if(window.currencyAbbrev == "USD") {
				chip = window.theme + "-theme-chip_icon-dollar"
			} else if(window.currencyAbbrev == "KRW"){
				chip = window.theme + "-theme-chip_icon-won"
			} else if(window.currencyAbbrev == "CNY" || window.currencyAbbrev == "JPY"){
				chip = window.theme + "-theme-chip_icon-yen-yuan"
			} else if(window.currencyAbbrev == "THB") {
				chip = window.theme + "-theme-chip_icon-baht"
			} else if(window.currencyAbbrev == "MYR") {
				chip = window.theme + "-theme-chip_icon-ringgit"
			} else if(window.currencyAbbrev == "IDR") {
				chip = window.theme + "-theme-chip_icon-rupiah"
			}

			this.chip_icon = new createjs.Bitmap(this.context.getResources(chip));
			this.chip_icon.scaleX = this.chip_icon.scaleY = 0.45;
			this.chip_icon.y = 14;
			this.chip_icon.x = 10;
			this.addChild(this.chip_icon);

	      	this.user_money.x = 60;
	      	this.user_money.con = new createjs.Container();
	      	this.user_money.twin = this.user_money.clone();

	      	this.user_money.con.mask = new createjs.Shape();
	      	this.user_money.con.mask.x = this.user_money.x;
	      	this.user_money.con.mask.y = this.user_money.y;
	      	this.user_money.con.mask.alpha = 0.4;

	      	this.user_money.twin.y = this.user_money.y;
	      	this.addChild(this.user_money.con);

			this.reinit();

			this.total_bet_label = new createjs.Text(window.language.menu.totalbetcaps, window.language.locale == "zh" ? "17px arial" : "12px arial", this.context.theme_color[window.theme].text_color);
			this.total_bet_label.textAlign = "center";
			this.total_bet_label.y = 80;
			window.language.locale == "zh" ? this.total_bet_label.x = 48 : this.total_bet_label.x = 40;
			this.addChild(this.total_bet_label);

			this.winning_label = new createjs.Text(window.language.bet_details.winningscaps, window.language.locale == "zh" ? "17px arial" : "12px arial", this.context.theme_color[window.theme].text_color);
			this.winning_label.textAlign = "center";
			this.winning_label.y = 80;
			this.winning_label.x = 150;
			this.addChild(this.winning_label);

			if (window.theme == 'white') {
				this.total_bet_label.font = window.language.locale == "zh" ? "bold 17px arial" : "bold 12px arial";
				this.winning_label.font = window.language.locale == "zh" ? "bold 17px arial" : "bold 12px arial";
			}
			else {
				this.total_bet_label.font = window.language.locale == "zh" ? "17px arial" : "12px arial";
				this.winning_label.font = window.language.locale == "zh" ? "17px arial" : "12px arial";
			}
		},
		changeTheme(new_theme) {
			let chip = new_theme+"-theme-chip_icon";
			if(window.currencyAbbrev == "USD" || window.currencyAbbrev == "JPY") {
				chip = new_theme + "-theme-chip_icon-dollar"
			} else if(window.currencyAbbrev == "KRW"){
				chip = new_theme + "-theme-chip_icon-won"
			} else if(window.currencyAbbrev == "CNY"){
				chip = new_theme + "-theme-chip_icon-yen-yuan"
			} else if(window.currencyAbbrev == "THB") {
				chip = new_theme + "-theme-chip_icon-baht"
			} else if(window.currencyAbbrev == "MYR") {
				chip = new_theme + "-theme-chip_icon-ringgit"
			} else if(window.currencyAbbrev == "IDR") {
				chip = new_theme + "-theme-chip_icon-rupiah"
			}

			this.bg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRoundRectComplex(0, 0, 220, 110, 0, 10, 10, 0);
			this.user_money.color = this.context.theme_color[new_theme].menu_text_color;
			this.total_bet_amt.color = this.context.theme_color[new_theme].text_color;
			this.total_win_amt.color = this.context.theme_color[new_theme].text_color;
			this.chip_icon.image = this.context.getResources(chip);
			this.total_bet_label.color = this.context.theme_color[new_theme].text_color;
			this.winning_label.color = this.context.theme_color[new_theme].text_color;
			this.user_money.twin.color = this.context.theme_color[new_theme].menu_text_color;

			if (new_theme == 'white') {
				this.total_bet_label.font = window.language.locale == "zh" ? "bold 17px arial" : "bold 12px arial";
				this.winning_label.font = window.language.locale == "zh" ? "bold 17px arial" : "bold 12px arial";
			}
			else {
				this.total_bet_label.font = window.language.locale == "zh" ? "17px arial" : "12px arial";
				this.winning_label.font = window.language.locale == "zh" ? "17px arial" : "12px arial";
			}
		},
		reinit(anim) {
			let lengthCheck = 0;
			let userMoney = 0;

			let currency = "";

			if (window.casino == 'SS') {
				this.total_bet_amt.text = this.numberWithCommas(this.bet_amount.toFixed(2));
				this.total_win_amt.text = this.numberWithCommas(this.win_amount.toFixed(2));
				userMoney = parseFloat(this.context.context.user_money).toFixed(2);
				lengthCheck = 5;
			}
			else {

				if(parseInt(this.bet_amount)) {
					this.total_bet_amt.text = this.numberWithCommas(parseInt(this.bet_amount));
				} else {
					this.total_bet_amt.text = this.bet_amount;
				}

				if(parseInt(this.win_amount)) {
					this.total_win_amt.text = this.numberWithCommas(parseInt(this.win_amount));
				} else {
					this.total_win_amt.text = this.win_amount;
				}

				userMoney = parseInt(this.context.context.user_money);
				lengthCheck = 7;
			}

			if(this.context.context.user_money != 0) {
				if(anim) {
					if(userMoney > 0 && userMoney < 1) {
						this.user_money.text = this.numberWithCommas(userMoney);
					} else {
						this.user_money.text = numberCounter(this.user_money, userMoney, this);
		        		this.user_money.twin.text = numberCounter(this.user_money.twin, userMoney, this);
					}
				} else if(!anim) {
					this.user_money.text = this.numberWithCommas(userMoney);
				}
				if(this.context.context.user_money.toString().length > 8) {
					this.user_money.font = "28px bebas-regular";
				}

        		if(this.context.component_menuPlayerInfo.balance) { this.context.component_menuPlayerInfo.balance.text = this.numberWithCommas(userMoney) }
			}
			else {
				this.user_money.text = 0
			}

			if (this.bet_amount.toString().length > lengthCheck) {
				this.total_bet_amt.font = "20px bebas-regular";
				this.total_bet_amt.y = 63;

				this.total_bet_amt.font = "19px bebas-regular";
			}

			if (this.win_amount.toString().length > lengthCheck) {
				this.total_win_amt.font = "20px bebas-regular";
				this.total_win_amt.y = 103;

				this.total_win_amt.font = "19px bebas-regular";
			}

			// ==== for marqueee
			// if(this.user_money.text.indexOf(currency) > -1 && this.user_money.text.indexOf("undefined") < 0 ) {
	      		this.user_money.bounds = this.user_money.getBounds() || this.user_money.bounds;
			// } else if(this.user_money.text.indexOf("undefined") > -1 ) {
			// 	this.user_money.text = currency + this.numberWithCommas(userMoney)
	  		//     this.user_money.bounds = this.user_money.getBounds() || this.user_money.bounds;
			// } else {
	  		//    this.user_money.bounds = this.user_money.getBounds() || this.user_money.bounds;
			// 	this.user_money.bounds.width += 30
			// }

	      	// if(this.user_money.text.length > 10) {
	      	if(this.user_money.bounds.width > 160) {

		        this.user_money.con.mask.graphics.clear().beginFill("#fff").drawRect(-5, 0, 135, this.user_money.bounds.height + 10);

		        this.user_money.twin.x = this.user_money.x + this.user_money.bounds.width + 70;
		        this.user_money.twin.text = this.user_money.text;

		        this.user_money.con.addChild(this.user_money, this.user_money.twin);

		        this.marquee(this.user_money, (this.user_money.bounds.width + 70));
		        this.marquee(this.user_money.twin, (this.user_money.bounds.width + 70));

	      	} else {
	        	createjs.Tween.removeTweens(this.user_money)
	        	createjs.Tween.removeTweens(this.user_money.twin)
	        	this.user_money.con.removeChild(this.user_money.twin)
	        	this.user_money.con.addChild(this.user_money);
	      		this.user_money.x = 190;
	      	}
		},
		numberWithCommas (x) {
		    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
	    marquee (obj, toX) {
	      createjs.Tween.get(obj ,{loop:true}).to({
	        x : obj.x - toX
	      }, 5000)
	    }
	});

	return instance;
}
