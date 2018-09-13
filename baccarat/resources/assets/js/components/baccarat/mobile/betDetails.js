/**
* bet-details-mobile.js
* @author Marjo Sobrecaray
* @since 2017.05.10
* @version 1.0
* Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** screen/container for all game components. handles preloading and loading screen and adding components to stage **/

import {createSprite, randomNum, cardRes, numberCounter,fontFormat} from '../../../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
			let w = 210;
			let h = 167;
			let goldHeight = 45;
			let margin = 25;
			let font = 27;

			this.bet_amount = 0;
			this.win_amount = 0;

			this.bg = new createjs.Shape();
			this.bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0,0,w,h);
			this.bg.opacity = 0.8;
			this.addChild(this.bg);

			this.goldContainer = new createjs.Shape();
			this.goldContainer.graphics.beginLinearGradientFill(['#d7bc6a', '#ebda7b', '#d7bc6a'], [0,0.5,1], 0,0,w,0).drawRect(0,0,w,goldHeight);
			this.addChild(this.goldContainer);

			//labels
			let betTxt = window.language2.com_sub_bottomgamedetails_bet.toUpperCase();
			this.total_bet_label = new createjs.Text(betTxt, fontFormat(15, 'bold', 'lato', window.language.locale == 'jp' ? false : true), this.context.theme_color[window.theme].text_color);
			this.total_bet_label.x = 15;
			this.total_bet_label.y =  goldHeight + margin;//70;
			this.total_bet_label.textBaseline = "middle"
			this.addChild(this.total_bet_label);

			let winTxt = window.language2.com_sub_bottomgamedetails_win.toUpperCase();
			this.winning_label = new createjs.Text(winTxt, fontFormat(15, 'bold', 'lato', window.language.locale == 'jp' ? false : true), this.context.theme_color[window.theme].text_color);
			this.winning_label.x = 15;
			this.winning_label.y = this.total_bet_label.y + (margin + 10);
			this.winning_label.textBaseline = "middle"
			this.addChild(this.winning_label);


			//values
			this.user_money = new createjs.Text("0", fontFormat(font, 'normal', 'bebas', false), "#000");
			this.user_money.textAlign = "right";
			this.user_money.x = w - 15;
			this.user_money.y = (goldHeight/2 ) + 2;
			this.user_money.textBaseline ="middle"
			this.addChild(this.user_money);

			this.total_bet_amt = new createjs.Text("0", fontFormat(22, 'normal', 'bebas', false), this.context.theme_color[window.theme].text_color);
			this.total_bet_amt.textAlign = "right";
			this.total_bet_amt.x = w - 15;
			this.total_bet_amt.y = this.total_bet_label.y + 2;
			this.total_bet_amt.textBaseline ="middle"
			this.addChild(this.total_bet_amt);

			this.total_win_amt = new createjs.Text("0", fontFormat(22, 'normal', 'bebas', false), this.context.theme_color[window.theme].text_color);
			this.total_win_amt.textAlign = "right";
			this.total_win_amt.x = w - 15;
			this.total_win_amt.y = this.winning_label.y + 2;
			this.total_win_amt.textBaseline ="middle"
			this.addChild(this.total_win_amt);

			let currency = "";
			let currencySize = "13px";
			if(window.currencyAbbrev == "USD" || window.currencyAbbrev == 'HKD') {
				currency = "$"
			} else if(window.currencyAbbrev == "KRW"){
			currency = "₩"
			} else if(window.currencyAbbrev == "CNY"){
			currency = "¥"
			} else if(window.currencyAbbrev == "IDR") {
				currency = "Rp"
			} else if(window.currencyAbbrev == "MYR") {
				currency = "RM"
				currencySize = "12px"
			} else if(window.currencyAbbrev == "THB") {
				currency = "฿"
			} else if(window.currencyAbbrev == "PTS") {
			  currency = "";
			} else if(window.currencyAbbrev == 'JPY') {
				currency = "¥"
			} else if(window.currencyAbbrev == 'RUB') {
				currency = "₽"
			}else if(window.currencyAbbrev == 'UAH') {
				currency = "₴"
			}else if(window.currencyAbbrev == 'GEL') {
				currency = "ლ"
			}else if(window.currencyAbbrev == 'EUR') {
				currency = "€"
			}else if(window.currencyAbbrev == 'GBP') {
				currency = "£"
			}else if(window.currencyAbbrev == 'TRY') {
				currency = "₺"
			}else if(window.currencyAbbrev == 'IRR') {
				currency = "IRR"
				currencySize = "12px"
			}else if(window.currencyAbbrev == 'DGN') {
				currency = "DGN"
				currencySize = "12px"
			}else if(window.currencyAbbrev == 'CZK') {
				currency = "Kč"
			}else if(window.currencyAbbrev == 'HUF') {
				currency = "Ft"
			}else if(window.currencyAbbrev == 'SEK') {
				currency = "kr"
			}else if(window.currencyAbbrev == 'VND') {
				currency = "₫"
			}else if(window.currencyAbbrev == 'BYN') {
				currency = "Br"
			}else if(window.currencyAbbrev == 'BYN') {
				currency = "Br"
			}else if(window.currencyAbbrev == 'INR') {
				currency = "INR"
				currencySize = "12px"
			}


			this.chipCircle = new createjs.Shape();
			this.chipCircle.graphics.f('#3C3C3C').drawCircle(0,0,15);
			this.chipCircle.regX = this.chipCircle.regY = -15;
			this.chipCircle.x = 12;
			this.chipCircle.y = (goldHeight/2)-15;//8;
			this.addChild(this.chipCircle);

			this.chipCircleInner = new createjs.Shape();
			this.chipCircleInner.graphics.beginStroke('#d7bc6a').setStrokeDash([8,4], 0).setStrokeStyle(2).drawCircle(0,0, 12);
			this.chipCircleInner.regX = -12;
			this.chipCircleInner.regY = -17.5;
			this.chipCircleInner.x = 12;
			this.chipCircleInner.y = this.chipCircle.y;
			this.chipCircleInner.rotation = -11;
			this.addChild(this.chipCircleInner);

			this.chipText = new createjs.Text(currency, `800 ${currencySize} lato-bold`, '#d7bc6a');
			this.chipText.x = 27;
			this.chipText.y = this.chipCircle.y + 7.5;
			this.chipText.textAlign = "center";
			this.addChild(this.chipText);

			// === long string marquee
		 this.user_money.con = new createjs.Container();
		 this.user_money.twin = this.user_money.clone();

		 this.user_money.con.mask = new createjs.Shape();
		 this.user_money.con.mask.x = this.user_money.x;
		 this.user_money.con.mask.y = this.user_money.y - 20;
		 this.user_money.con.mask.alpha = 0.4;

		 this.user_money.twin.y = this.user_money.y;
		 this.addChild(this.user_money.con);

		 //user details
		 this.avatarBg = new createjs.Shape();
		 this.avatarBg.graphics.ss(0.8).s('#5c5a5b').beginFill('#dcc871').drawCircle(0, 0, 14);
		 this.avatarBg.x = 29;
		 this.avatarBg.y = h - 25;
		 this.addChild(this.avatarBg);

		 this.user_avatar = new createjs.Bitmap(this.context.getResources('black_joker'));
		 this.user_avatar.scaleX = this.user_avatar.scaleY = 0.65;
		 this.user_avatar.x = 15;
		 this.user_avatar.y = this.avatarBg.y - 13;
		 this.addChild(this.user_avatar);


		 this.user_name = new createjs.Text(window.user_name,fontFormat(18, 'normal', 'lato', false),this.context.theme_color[window.theme].text_color);
		 this.user_name.x = w - 15;
		 this.user_name.y = h - 25;
		 this.user_name.textAlign = "right";
		 this.user_name.textBaseline = "middle";
		 this.addChild(this.user_name);

		 this.setUserAvatar();
		 this.reinit();
		 //
		},
		setUserMoney(money) {
			let userMoney = 0;
			this.context.context.user_money = money;

			if (window.casino == 'SS') {
				userMoney = parseFloat(this.context.context.user_money).toFixed(2);
				lengthCheck = 5;
			}
			else {
				userMoney = parseInt(this.context.context.user_money);
			}

			if(money) {
				return numberCounter(this.user_money, userMoney, this);
			}

		},
		changeTheme(new_theme) {
			let w = 210;
      let h = 167;

      if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
        w = 210;
        h = 167;
      } else {
        w = 165;
        h = 144;
      }

      this.bg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0,0,w,h);

      this.total_bet_label.color = this.context.theme_color[new_theme].text_color;
      this.winning_label.color = this.context.theme_color[new_theme].text_color;
      this.total_bet_amt.color = this.context.theme_color[new_theme].text_color;
      this.total_win_amt.color = this.context.theme_color[new_theme].text_color;
      this.user_name.color = this.context.theme_color[new_theme].text_color;
		},
		setUserAvatar() {
			let avatar = window.config.default.split("_")[0];
			avatar = avatar == 'blue' ? `black_${window.config.default.split("_")[1]}` : `${window.config.default.split("_")[0]}_${window.config.default.split("_")[1]}`;
			this.user_avatar.image = this.context.getResources(avatar);
		},
		reinit(anim) {
			let lengthCheck = 0;
			let userMoney = 0;

			let currency = "";
			let w = 210;
			let usermoneypos = 0;
			let font = 27;
			let marqueeCheck = 120;
			if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
				w = 210;
				font = 27;
			} else {
				w = 165;
				font = 20;
				marqueeCheck = 95;
			}
			usermoneypos = w - 15;

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
					this.user_money.font = fontFormat(font, 'normal', 'bebas', false);
				}
			}
			else {
				this.user_money.text = 0
			}

			if (this.bet_amount.toString().length > lengthCheck) {
				this.total_bet_amt.y = 63;

				this.total_bet_amt.font = fontFormat(22, 'normal', 'bebas', false);
			}

			if (this.win_amount.toString().length > lengthCheck) {
				this.total_win_amt.y = 103;

				this.total_win_amt.font = fontFormat(22, 'normal', 'bebas', false);
			}

			// ==== for marqueee
    	createjs.Tween.removeTweens(this.user_money);
    	createjs.Tween.removeTweens(this.user_money.twin);

    	this.user_money.bounds = this.user_money.getBounds() || this.user_money.bounds;
			this.user_money.x = w - 15;
    	this.user_money.twin = this.user_money.clone();

    	if(this.user_money.con) this.user_money.con.removeAllChildren();

    	if(this.user_money.bounds.width > marqueeCheck) {
        this.user_money.con.mask.graphics.clear().beginFill("#fff").drawRect(marqueeCheck*(-1), 0, marqueeCheck+5, this.user_money.bounds.height + 20);
        this.user_money.twin.x = this.user_money.x + this.user_money.bounds.width + 60;
        this.user_money.twin.text = this.user_money.text;

        if(anim) { // if animating, text will be undefined, handling
        	setTimeout(() => {
        		this.user_money.twin.text = this.user_money.text;
        	},1000)
        }

        this.user_money.con.addChild(this.user_money, this.user_money.twin);
        this.marquee(this.user_money, (this.user_money.bounds.width + 60));
        this.marquee(this.user_money.twin, (this.user_money.bounds.width + 60));
    	} else {
      	this.user_money.con.removeChild(this.user_money.twin)
      	this.user_money.con.addChild(this.user_money);
    		this.user_money.x = usermoneypos;
    	}
		},
		marquee (obj, toX) {
      createjs.Tween.get(obj ,{loop:true, override:true}).to({
        x : obj.x - toX
      }, 5000)
	  },
		numberWithCommas (x) {
			try {
		    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			} catch(e) {}
		},
		screenOrientation() {
			let w = 210;
			let h = 167;
			let goldHeight = 45;
			let margin = 25;
			let font = '27px bebas-regular';
			let marqueeCheck = 120;

			if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
				w = 210;
				h = 167;
				goldHeight = 45;
				margin = 25;
				font = '27px bebas-regular';
				this.y = this.context.stage.baseWidth - (h+210);
				this.x = 0;

			} else {
				w = 165;
				h = 144;
				goldHeight = 35;
				margin = 20;
				font = '20px bebas-regular';
				this.y = this.context.stage.baseHeight - h;
				this.x = 735;
				marqueeCheck = 95;
			}

			this.bg.graphics.clear().beginFill(this.context.theme_color[window.theme].base_color).drawRect(0,0,w,h);

			this.goldContainer.graphics.clear().beginLinearGradientFill(['#d7bc6a', '#ebda7b', '#d7bc6a'], [0,0.5,1], 0,0,w,0).drawRect(0,0,w,goldHeight);

			this.total_bet_label.y =  goldHeight + margin;//70;
			this.winning_label.y = this.total_bet_label.y + (margin + 10);

			this.user_money.font = font;
			this.user_money.x = w - 15;
			this.user_money.y = (goldHeight/2 ) + 2;

			this.total_bet_amt.x = w - 15;
			this.total_bet_amt.y = this.total_bet_label.y + 2;

			this.total_win_amt.x = w - 15;
			this.total_win_amt.y = this.winning_label.y + 2;

			this.chipCircle.y = (goldHeight/2)-15;//8;
			this.chipCircleInner.y = this.chipCircle.y;
			this.chipText.y = this.chipCircle.y + 7.5;

			this.user_money.con.mask.x = this.user_money.x;
			this.user_money.con.mask.y = this.user_money.y - 20;

			this.avatarBg.y = h - 25;
			this.user_avatar.y = this.avatarBg.y - 13;

			this.user_name.x = w - 15;
			this.user_name.y = h - 25;

			// ==== for marqueee
    	this.user_money.bounds = this.user_money.getBounds() || this.user_money.bounds;
    	this.user_money.twin = this.user_money.clone();


    	if(this.user_money.bounds.width > marqueeCheck) {
    		if(this.user_money.con) this.user_money.con.removeAllChildren();
      	createjs.Tween.removeTweens(this.user_money)
      	createjs.Tween.removeTweens(this.user_money.twin)

        this.user_money.con.mask.graphics.clear().beginFill("#fff").drawRect(marqueeCheck*(-1), 0, marqueeCheck+5, this.user_money.bounds.height + 20);
        this.user_money.twin.x = this.user_money.x + this.user_money.bounds.width + 60;
        this.user_money.twin.text = this.user_money.text;

        this.user_money.con.addChild(this.user_money, this.user_money.twin);

        this.marquee(this.user_money, (this.user_money.bounds.width + 60));
        this.marquee(this.user_money.twin, (this.user_money.bounds.width + 60));

    	}

		}
	});

	return instance;
}
