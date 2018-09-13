import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, setCurrentTimezone } from '../../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {

        	header_c = new createjs.Stage("header");
        	createjs.Touch.enable(header_c ,false, true);
        	header_c.preventSelection = false;

        	var container = new createjs.Container();
        	header_c.addChild(container);

			let header_bg = new createjs.Shape();
			header_bg.graphics.beginFill("#1f2021").drawRect(0,0,this.context.context.width , 96.5);
			header_bg.setBounds(0,0,this.context.context.width , 96.5);
			// this.addChild(header_bg);
			container.addChild(header_bg);
			let last_active_header;
			let last_header = "main";
			let header_width = 141;

			this.main_lobby_header = new createjs.Shape();
			this.main_lobby_header.graphics.beginFill("#1f2021").drawRect(0,0,320,header_bg.getBounds().height);
			this.main_lobby_header.name = "main";
			this.main_lobby_header.active = function (e) {}
			this.main_lobby_header.normal = function (e) {}
			// this.addChild(this.main_lobby_header);
			container.addChild(this.main_lobby_header);

			//=== live games
			this.live_games_header = new createjs.Shape();
			this.live_games_header.graphics.beginFill("#1f2021").drawRect(0,0,header_width + 20 ,header_bg.getBounds().height);
			this.live_games_header.x = 96.5;
			this.live_games_header.name = "live_games";
			// this.addChild(this.live_games_header);
			container.addChild(this.live_games_header);

			this.live_games_header.icon = createSprite(this.context.getResources("livegames_icon"),52,44,this.live_games_header.icon);
			this.live_games_header.icon.x = this.live_games_header.x + (header_width / 2) + 20 - (52 / 2 ) /* - 11 - 8 -1 */;
			this.live_games_header.icon.y = 10;
			this.live_games_header.icon.scaleX = this.live_games_header.icon.scaleY = 1.2;
			this.live_games_header.icon.shadow = new createjs.Shadow("#000",0,2,4);
			this.live_games_header.icon.hitArea = this.live_games_header;
			// this.addChild(this.live_games_header.icon);
			container.addChild(this.live_games_header.icon);


			this.live_games_header.normal = function (e) {
				e.graphics.clear().beginFill("#1f2021").drawRect(0,0,header_width + 20,header_bg.getBounds().height);
				e.icon.gotoAndPlay("steady");
			}

			this.live_games_header.active = function (e) {
				e.graphics.clear().beginFill("#8c1414").drawRect(0,0,header_width + 20,header_bg.getBounds().height);
				e.icon.gotoAndPlay("select");
			}

			let live_games_text = new createjs.Text(window.language.lobby.livecaps,"bold 18px ArvoRegular, Helvetica" ,"#fff");
			live_games_text.x = this.live_games_header.x + (header_width / 2) + 20;
			live_games_text.y = 62;
			live_games_text.textAlign = "center";
			live_games_text.hitArea = this.live_games_header;
			// this.addChild(live_games_text);
			container.addChild(live_games_text);

			if(window.language.locale == "zh") {
							live_games_text.font = "bold 23px ArvoRegular, Helvetica";
							live_games_text.x = this.live_games_header.x + (header_width / 2) + 23;
			}

			// === logo main

			let logo_bg = new createjs.Shape();
			logo_bg.graphics.beginFill("#f1cf87").drawRect(0,0,140,140);
			logo_bg.rotation = 21.5;
			logo_bg.y = -52;
			logo_bg.x = 4;
			logo_bg.mask = header_bg;
			logo_bg.name = "main"
			// this.addChild(logo_bg);
			container.addChild(logo_bg);


			let logo = new createjs.Bitmap(this.context.getResources("logo"));
			logo.scaleX = logo.scaleY = .48
			logo.x = 10;
			logo.y = 8;
			logo.name = "main"
			console.log(logo);
			container.addChild(logo);

			// let logo = new createjs.SpriteSheet({
			// 	images: ["/img/seasonal_theme/newyear_theme/logo_mobile.png"],
			// 	frames: {height: 85, width: 100},
			// 	animations: {
			// 		"logo_animate": {
			// 			frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, ],
			// 			speed: 0.5
			// 		},
			// 	}
			// });
			// let logo_animation = new createjs.Sprite(logo, "logo_animate");
      //
			// logo_animation.name = "main"
			// container.addChild(logo_animation);

			//=== themed games
			this.themed_games_header = new createjs.Shape();
			this.themed_games_header.graphics.beginFill("#1f2021").drawRect(0,0,header_width, header_bg.getBounds().height);
			this.themed_games_header.x = this.live_games_header.x + header_width + 20;
			this.themed_games_header.name = "themed_games";
			// this.addChild(this.themed_games_header);
			container.addChild(this.themed_games_header);

			this.themed_games_header.icon = createSprite(this.context.getResources("themedgames_icon"),52,44,this.themed_games_header.icon);
			this.themed_games_header.icon.x =  this.themed_games_header.x + (header_width / 2) - ((52 / 2) * 1.2);
			this.themed_games_header.icon.y = 10;
			this.themed_games_header.icon.hitArea = this.themed_games_header;
			this.themed_games_header.icon.scaleX = this.themed_games_header.icon.scaleY = 1.2;
			this.themed_games_header.icon.shadow = new createjs.Shadow("#000",0,2,4);
			// this.addChild(this.themed_games_header.icon);
			container.addChild(this.themed_games_header.icon);

			this.themed_games_header.normal = function (e) {
				return;
				e.graphics.clear().beginFill("#1f2021").drawRect(0,0,header_width,header_bg.getBounds().height);
				e.icon.gotoAndPlay("steady");
			}
			this.themed_games_header.active = function (e) {
				return;
				e.graphics.clear().beginFill("#890e4f").drawRect(0,0,header_width,header_bg.getBounds().height);
				e.icon.gotoAndPlay("select");
			}

			let themed_games_text = new createjs.Text(window.language.lobby.themedcaps,"bold 18px ArvoRegular, Helvetica" ,"#fff");
			themed_games_text.x = this.themed_games_header.x + (header_width / 2);
			themed_games_text.y = 62;
			themed_games_text.textAlign = "center"
			themed_games_text.hitArea = this.themed_games_header;
			// this.addChild(themed_games_text);
			container.addChild(themed_games_text);

			if(window.language.locale == "zh") {
							themed_games_text.font = "bold 23px ArvoRegular, Helvetica";
			}

			// === reel games
			this.reel_games_header = new createjs.Shape();
			this.reel_games_header.graphics.beginFill("#1f2021").drawRect(0,0,header_width,header_bg.getBounds().height);
			this.reel_games_header.x = this.themed_games_header.x + header_width;
			this.reel_games_header.name = "reel_games";
			// this.addChild(this.reel_games_header);
			container.addChild(this.reel_games_header);

			this.reel_games_header.icon = createSprite(this.context.getResources("reelgames_icon"),52,44,this.reel_games_header.icon);
			this.reel_games_header.icon.x = this.reel_games_header.x + (header_width / 2) - ((52 / 2) * 1.2) + 1;
			this.reel_games_header.icon.y = 10;
			this.reel_games_header.icon.scaleX = this.reel_games_header.icon.scaleY = 1.2;
			this.reel_games_header.icon.hitArea = this.reel_games_header;
			this.reel_games_header.icon.shadow = new createjs.Shadow("#000",0,2,4);
			// this.addChild(this.reel_games_header.icon);
			container.addChild(this.reel_games_header.icon);

			this.reel_games_header.normal = function (e) {
				e.graphics.clear().beginFill("#1f2021").drawRect(0,0,header_width + 20,header_bg.getBounds().height);
				e.icon.gotoAndPlay("steady");
			}

			this.reel_games_header.active = function (e) {
				e.graphics.clear().beginFill("#f57c00").drawRect(0,0,header_width + 20,header_bg.getBounds().height);
				e.icon.gotoAndPlay("select");
			}

			this.theme_gamesSoon = new createjs.Shape();
			this.theme_gamesSoon.graphics.beginFill("#cf2f1f").drawRect(-67 - 12.5 , -2, 115, 25);
			this.theme_gamesSoon.mouseEnabled = false;
			this.theme_gamesSoon.x = 350;
			this.theme_gamesSoon.y = 84.5 - 47.5 - 13 + 1;

			this.theme_gamesSoonText = new createjs.Text(window.language.lobby.comingsooncaps, window.language.locale == "zh" ? "italic 17px TimesNewRoman" : "italic 14px TimesNewRoman", "#fff");
			this.theme_gamesSoonText.x = this.theme_gamesSoon.x - 23.5;
			this.theme_gamesSoonText.y = this.theme_gamesSoon.y + 1 - 4 + 14.5;
			this.theme_gamesSoonText.mouseEnabled = false;
			this.theme_gamesSoonText.textAlign = "center";
			this.theme_gamesSoonText.textBaseline = "middle";
			container.addChild(this.theme_gamesSoon, this.theme_gamesSoonText);

			let reel_games_text = new createjs.Text(window.language.lobby.reelcaps,"bold 18px ArvoRegular, Helvetica" ,"#fff");
			reel_games_text.x = this.reel_games_header.x + (header_width / 2);
			reel_games_text.y = 62;

			if(window.language.locale == "zh") {
						reel_games_text.font = "bold 23px ArvoRegular, Helvetica";
			}

			reel_games_text.textAlign = "center";
			reel_games_text.hitArea = this.themed_games_header;
			container.addChild(reel_games_text);
			// this.addChild(reel_games_text);

			//reel games soon
			this.reel_gamesSoon = new createjs.Shape();
			this.reel_gamesSoon.graphics.beginFill("#cf2f1f").drawRect(-67 - 12.5 , -2, 115, 25);
			this.reel_gamesSoon.mouseEnabled = false;
			this.reel_gamesSoon.x = 350 + 142 - .5;
			this.reel_gamesSoon.y = 84.5 - 47.5 - 13 + 1;

			this.reel_gamesSoonText = new createjs.Text(window.language.lobby.comingsooncaps, window.language.locale == "zh" ? "italic 17px TimesNewRoman" : "italic 14px TimesNewRoman", "#fff");
			this.reel_gamesSoonText.x = this.reel_gamesSoon.x - 23.5;
			this.reel_gamesSoonText.y = this.reel_gamesSoon.y + 1 - 4 + 14.5;
			this.reel_gamesSoonText.mouseEnabled = false;
			this.reel_gamesSoonText.textAlign = "center";
			this.reel_gamesSoonText.textBaseline = "middle";
			// container.addChild(this.reel_gamesSoon, this.reel_gamesSoonText);

			// === bet history
			this.bet_history_thumbnail = new createjs.Shape();
			this.bet_history_thumbnail.graphics.beginFill("#1f2021").drawRect(0,0,header_width, header_bg.getBounds().height);
			this.bet_history_thumbnail.x = this.reel_games_header.x + header_width;
			this.bet_history_thumbnail.name = "thumbnail_bethistory";
			// this.addChild(this.bet_history_thumbnail);
			container.addChild(this.bet_history_thumbnail);

			this.bet_history_thumbnail.icon = createSprite(this.context.getResources("bethistory_icon"),52,44,this.bet_history_thumbnail.icon);
			this.bet_history_thumbnail.icon.x = this.bet_history_thumbnail.x + (header_width / 2) - ((52 / 2) * 1.1);
			this.bet_history_thumbnail.icon.y =  10;
			this.bet_history_thumbnail.icon.scaleY = this.bet_history_thumbnail.icon.scaleX = 1.1
			this.bet_history_thumbnail.icon.hitArea = this.bet_history_thumbnail;
			container.addChild(this.bet_history_thumbnail.icon);
			// this.addChild(this.bet_history_thumbnail.icon);

			this.bet_history_thumbnail.active = () => {
				this.bet_history_thumbnail.icon.gotoAndPlay("select");
			}
			this.bet_history_thumbnail.normal = () => {
				this.bet_history_thumbnail.icon.gotoAndPlay("steady");
			}

			let bet_history_text;
			if(window.language.lobby.bethistorycaps == "BET HISTORY") {
				bet_history_text = new createjs.Text("HISTORY","bold 18px ArvoRegular, Helvetica" ,"#fff");
			} else {
				bet_history_text = new createjs.Text(window.language.lobby.bethistorycaps,"bold 18px ArvoRegular, Helvetica" ,"#fff");
			}

			if(window.language.locale == "zh") {
						bet_history_text.font = "bold 23px ArvoRegular, Helvetica";
			}

			bet_history_text.x = this.bet_history_thumbnail.x + (header_width / 2);
			bet_history_text.y = 62;
			bet_history_text.textAlign = "center";
			bet_history_text.hitArea = this.bet_history_thumbnail;
			container.addChild(bet_history_text);
			// this.addChild(bet_history_text);

			// === transfer history
			this.transfer_history_thumbnail = new createjs.Shape();
			this.transfer_history_thumbnail.graphics.beginFill("#1f2021").drawRect(0,0,header_width ,header_bg.getBounds().height);
			this.transfer_history_thumbnail.x = this.bet_history_thumbnail.x + header_width;
			this.transfer_history_thumbnail.name = "thumbnail_transactions";
			container.addChild(this.transfer_history_thumbnail);
			// this.addChild(this.transfer_history_thumbnail);

			this.transfer_history_thumbnail.icon = createSprite(this.context.getResources("transactionhistory_icon"),52,44,this.transfer_history_thumbnail.icon);
			this.transfer_history_thumbnail.icon.x = this.transfer_history_thumbnail.x + (header_width / 2) - ((52 / 2) * 1.1);
			this.transfer_history_thumbnail.icon.y = 10;
			this.transfer_history_thumbnail.icon.scaleX = this.transfer_history_thumbnail.icon.scaleY = 1.1
			this.transfer_history_thumbnail.icon.hitArea = this.transfer_history_thumbnail;
			container.addChild(this.transfer_history_thumbnail.icon)
			// this.addChild(this.transfer_history_thumbnail.icon)


			this.transfer_history_thumbnail.active = () => {
				this.transfer_history_thumbnail.icon.gotoAndPlay("select")
			}
			this.transfer_history_thumbnail.normal = () => {
				this.transfer_history_thumbnail.icon.gotoAndPlay("steady")
			}

			let transaction_text;
			if(window.language.lobby.transactioncaps == "TRANSACTION") {
				transaction_text = new createjs.Text("TRANS","bold 18px ArvoRegular, Helvetica" ,"#fff");
			} else {
				transaction_text = new createjs.Text(window.language.lobby.transactioncaps,"bold 18px ArvoRegular, Helvetica" ,"#fff");
			}

			if(window.language.locale == "zh") {
							transaction_text.font = "bold 23px ArvoRegular, Helvetica";
			}

			transaction_text.x = this.transfer_history_thumbnail.x + (header_width / 2);
			transaction_text.y = 62;
			transaction_text.textAlign = "center";
			transaction_text.hitArea = this.bet_history_thumbnail;
			container.addChild(transaction_text);
			// this.addChild(transaction_text);


			// === howtoplay history
			this.howtoplay_thumbnail = new createjs.Shape();
			this.howtoplay_thumbnail.graphics.beginFill("#1f2021").drawRect(0,0,150,header_bg.getBounds().height);
			this.howtoplay_thumbnail.x = this.transfer_history_thumbnail.x + header_width;
			this.howtoplay_thumbnail.name = "thumbnail_howtoplay";
			container.addChild(this.howtoplay_thumbnail);
			// this.addChild(this.howtoplay_thumbnail);

			this.howtoplay_thumbnail.icon = createSprite(this.context.getResources("gamerules_icon"),52,44,this.howtoplay_thumbnail.icon);
			this.howtoplay_thumbnail.icon.x = this.howtoplay_thumbnail.x + (header_width / 2) - ((52 / 2) * 1.1);
			this.howtoplay_thumbnail.icon.y = 10;
			this.howtoplay_thumbnail.icon.scaleX = this.howtoplay_thumbnail.icon.scaleY = 1.1
			this.howtoplay_thumbnail.icon.hitArea = this.howtoplay_thumbnail;
			container.addChild(this.howtoplay_thumbnail.icon);
			// this.addChild(this.howtoplay_thumbnail.icon);

			this.howtoplay_thumbnail.active = () => {
				this.howtoplay_thumbnail.icon.gotoAndPlay("select");
			}
			this.howtoplay_thumbnail.normal = () => {
				this.howtoplay_thumbnail.icon.gotoAndPlay("steady");
			}

			let howtoplay_text;
			if(window.language.lobby.howtoplaycaps == "HOW TO PLAY") {
					howtoplay_text = new createjs.Text("HOW TO","bold 18px ArvoRegular, Helvetica" ,"#fff");
			} else {
					howtoplay_text = new createjs.Text(window.language.lobby.howtoplaycaps,"bold 18px ArvoRegular, Helvetica" ,"#fff");
			}

			if(window.language.locale == "zh") {
							howtoplay_text.font = "bold 23px ArvoRegular, Helvetica";
			}

			howtoplay_text.x = this.howtoplay_thumbnail.x + (header_width / 2);
			howtoplay_text.y = 62;
			howtoplay_text.textAlign = "center";
			howtoplay_text.hitArea = this.bet_history_thumbnail;
			container.addChild(howtoplay_text);
			// this.addChild(howtoplay_text);

			// === settings
			//

			// let settings_hitArea = new createjs.Shape();
			// settings_hitArea.graphics.beginFill("red").drawRect(0,0,80,100);
			// this.addChild(settings_hitArea);

			this.settings_thumbnail = new createjs.Shape();
			this.settings_thumbnail.graphics.beginFill("#1f2021").drawRect(0,0,66,header_bg.getBounds().height);
			this.settings_thumbnail.x = 980;
			this.settings_thumbnail.name = "thumbnail_settings";
			container.addChild(this.settings_thumbnail);
			// this.addChild(this.settings_thumbnail);

			// settings_hitArea.x = this.settings_thumbnail.x;
			// settings_hitArea.target_obj = this.settings_thumbnail;

			this.settings_thumbnail.icon = createSprite(this.context.getResources("settings_icon"),52,44,this.settings_thumbnail.icon);
			this.settings_thumbnail.icon.x = this.settings_thumbnail.x ;
			this.settings_thumbnail.icon.y = 50;
			this.settings_thumbnail.icon.hitArea = this.settings_thumbnail;
			this.settings_thumbnail.icon.scaleX = this.settings_thumbnail.icon.scaleY = .66;
			container.addChild(this.settings_thumbnail.icon);
			// this.addChild(this.settings_thumbnail.icon);

			this.settings_thumbnail.addEventListener("click",(e)=>{
			});

			this.settings_thumbnail.active = () => {
				this.settings_thumbnail.icon.gotoAndPlay("select");
			}

			this.settings_thumbnail.normal = () => {
				this.settings_thumbnail.icon.gotoAndPlay("steady");
			}

			// === username label
			this.user_name_label = new createjs.Text(window.username,"24px LatoRegular, Helvetica","#fff");
			this.user_name_label.x = 1055
			this.user_name_label.y = 15
      this.user_name_label.bounds = this.user_name_label.getBounds();
      this.user_name_label.twin = this.user_name_label.clone();

      // === long string marquee
      if(this.user_name_label.bounds.width > 126) {
        let marquee_con = new createjs.Container();

        marquee_con.mask = new createjs.Shape();
        marquee_con.mask.graphics.beginFill("#fff").drawRect(6, 0, 132, this.user_name_label.bounds.height + 10);
        marquee_con.mask.x = this.user_name_label.x;
        marquee_con.mask.y = this.user_name_label.y;

        this.user_name_label.twin.x = this.user_name_label.x  + this.user_name_label.bounds.width + 60;
        this.user_name_label.twin.y = this.user_name_label.y;
        marquee_con.addChild(this.user_name_label, this.user_name_label.twin);

        this.marquee(this.user_name_label, this.user_name_label.bounds.width + 60, 4000);
        this.marquee(this.user_name_label.twin, this.user_name_label.bounds.width + 60, 4000);

        container.addChild(marquee_con);
        // this.addChild(marquee_con);
      } else {
        container.addChild(this.user_name_label);
        // this.addChild(this.user_name_label);
	  }

	  this.userMoneyContainer = new createjs.Container();
	  container.addChild(this.userMoneyContainer);

		// === user money
		this.user_money = window.money;
	  	this.updateMoney();
		  // ===
			// === user avatar
			window.user_avatar = new createjs.Bitmap("/img/avatar/"+window.config.default+'.png');
			window.user_avatar.x = 998;
			window.user_avatar.y = 20;
			window.user_avatar.hitArea =this.settings_thumbnail;

			window.user_avatar.scaleY = window.user_avatar.scaleX = 0.64;
			container.addChild(window.user_avatar);
			// this.addChild(window.user_avatar);

			this.logout_button = createSprite(this.context.getResources("logout_icon"), 52, 44, this.logout_button);
			this.logout_button.x = this.context.context.width - 80;
			this.logout_button.y = 18;
			this.logout_button.scaleY = this.logout_button.scaleX = 1.3;
			this.logout_button.name = "logout";
			this.logout_button.active = function(e) {
				e.gotoAndPlay("select")
			};
			this.logout_button.normal = function() {
				e.gotoAndPlay("steady")
			};

			this.logout_button.hitArea = new createjs.Shape();
			this.logout_button.hitArea.graphics.beginFill("#1F2021").drawRect(0, 0, 70, 96);
			// this.logout_button.hitArea.graphics.beginFill("#1F2021").drawRect(0, 0, 67.6, 57.2);
			this.logout_button.hitArea.x = this.logout_button.x - 4;
			this.logout_button.hitArea.y = this.logout_button.y - 20;

			this.logout_button.hitArea.addEventListener('mousedown', (e) => {
				this.normalSubHead();
				this.normalMainHead();
				window.redirectCasino();
				this.logout_button.gotoAndPlay("select");
			});

			this.logout_button.hitArea.addEventListener('pressup', (e) => {
				this.logout_button.gotoAndPlay("steady");
			});

			// this.addChild(this.logout_button.hitArea);
			container.addChild(this.logout_button.hitArea);
			// this.addChild(this.logout_button);
			container.addChild(this.logout_button);


			container.on("click", (e) => {
				e.nativeEvent.preventDefault();
				if(!e.target.name) return;

				if(e.target.name == "themed_games"){
					return;
				}

				if(e.target.name == "reel_games") {
					if(window.reel_yn === 0) {
						return;
					}
				}

				if (e.target.name !== 'logout') {

					this.normalSubHead();
					this.normalMainHead();

					try {
						e.target.active(e.target);
					} catch(err) {
						/*console.log(err)*/
					}

					last_header = e.target.name != "thumbnail_settings" ? e.target.name : last_header;
					if(last_active_header == e.target.name && e.target.name == "thumbnail_settings")
					{
						this.context.toggleView(last_header);
						last_active_header = last_header;
					}
					else{
						this.context.toggleView(e.target.name)
						last_active_header = e.target.name;
					}

					e.target.clicked = true;
				}
				playSound('click');
			});

            // === Notice container
            this.announcementCon = new createjs.Container();
            this.announcementCon.x = 0;
            this.announcementCon.y = 40;
            this.announcementCon.visible = false;
            announcement.addChild(this.announcementCon);
		},

		updateMoney () {
			this.userMoneyContainer.removeAllChildren();
			this.user_money = (window.casino == 'SS') ? parseFloat(this.user_money).toFixed(2) : parseInt(this.user_money);

			let currency = "";
			if(window.currencyAbbrev == "USD" || window.currencyAbbrev == "JPY") {
			  currency = "$"
			} else if(window.currencyAbbrev == "KRW"){
			  currency = "₩"
			} else if(window.currencyAbbrev == "CNY"){
			  currency = "¥"
			} else if(window.currencyAbbrev == "IDR") {
				currency = "Rp"
			} else if(window.currencyAbbrev == "MYR") {
				currency = "RM"
			} else if(window.currencyAbbrev == "THB") {
				currency = "฿"
			} else {
			  currency = "RM "
			}

			this.user_money_text = new createjs.Text(currency +''+ numberWithCommas(this.user_money),"34px BebasNeue, Helvetica","#ede080");
			this.user_money_text.x = this.user_name_label.x;
			this.user_money_text.y = this.user_name_label.y + 26;
			// this.addChild(this.user_money_text);

				this.user_money_text.bounds = this.user_money_text.getBounds();
				this.user_money_text.twin = this.user_money_text.clone();

			// === long string marquee
			if(this.user_money.toString().replace(/[^A-Z0-9]/ig, "").length > 7) {
			let marquee_con = new createjs.Container();
			marquee_con.mask = new createjs.Shape();
			marquee_con.mask.graphics.beginFill("#fff").drawRect(6, 0, 132, this.user_money_text.bounds.height + 20);
			marquee_con.mask.x = this.user_money_text.x;
			marquee_con.mask.y = this.user_money_text.y;

			this.user_money_text.twin.x = this.user_money_text.x  + this.user_money_text.bounds.width + 60;
			this.user_money_text.twin.y = this.user_money_text.y;
			marquee_con.addChild(this.user_money_text, this.user_money_text.twin);

			if(this.user_name_label.bounds.width > 126) {
				let greater = (this.user_money_text.bounds.width > this.user_name_label.bounds.width) ? this.user_money_text.bounds.width : this.user_name_label.bounds.width;
				let farther = (this.user_money_text.bounds.width > this.user_name_label.bounds.width) ? this.user_money_text.twin.x : this.user_name_label.twin.x;
				this.user_name_label.twin.x = farther;
				this.user_money_text.twin.x = farther;
				this.marquee(this.user_name_label, greater + 60, 4000);
				this.marquee(this.user_name_label.twin, greater + 60, 4000);
				this.marquee(this.user_money_text, greater + 60, 4000);
				this.marquee(this.user_money_text.twin, greater + 60, 4000);
			}
			else {
				this.marquee(this.user_money_text, this.user_money_text.bounds.width + 60, 4000);
				this.marquee(this.user_money_text.twin, this.user_money_text.bounds.width + 60, 4000);
			}

			// this.addChild(marquee_con);
			this.userMoneyContainer.addChild(marquee_con);
			} else {
			// this.addChild(this.user_money_text);
			this.userMoneyContainer.addChild(this.user_money_text);
			}
		},

		setAnnouncement(data) {
            this.announcementCon.removeAllChildren();

            if (parseInt(data.status)) {
                this.announcementCon.visible = true;
                $("#lobby-announcement").show()
            }
            else {
                this.announcementCon.visible = false;
                return;
            }

            let message;
            let announceText;
            let announceMessage = JSON.parse(data.content);

            switch(window.language.locale) {
                case "zh":
                    message = announceMessage.cn;
                    break;

                case "kr":
                    message = announceMessage.kr;
                    break;

                case "jp":
                    message = announceMessage.jp;
                    break;

                case "en":
                    message = announceMessage.en;
                    break;
            }

            if (parseInt(data.time_yn)) {
                let newStartTime = setCurrentTimezone(data.start_time);
                let newEndTime = setCurrentTimezone(data.end_time);
                announceText = `${newStartTime} ~ ${newEndTime} ${message}`;
            }
            else {
                announceText = message;
            }

            let announcementIconBg = new createjs.Shape();
            announcementIconBg.graphics.beginFill('#f1e382').drawRect(0,0,60,55);
            this.announcementCon.addChild(announcementIconBg);

            let announcementIcon = new createjs.Bitmap('/img/icons/notice_icon.png');
            announcementIcon.x = announcementIconBg.x + 13;
            announcementIcon.y = announcementIconBg.y + 8;
            announcementIcon.scaleX = announcementIcon.scaleY = 0.6;
            this.announcementCon.addChild(announcementIcon);
            let announcementTextBg = new createjs.Shape();

            announcementTextBg.graphics.beginLinearGradientFill(['#59090a', 'rgba(89, 9, 10, 0.1)'], [0,1],0,0,1250,0).drawRect(0,0,1250,58);
            announcementTextBg.x = 60;
            announcementTextBg.y = -1;
            this.announcementCon.addChild(announcementTextBg);

            let announcementText = new createjs.Text(announceText, '25px lato', '#fff');
            announcementText.x = 70;
            announcementText.y = 12;
            this.announcementCon.addChild(announcementText);

            let textbounds = announcementText.getBounds();

            let marquee_con = new createjs.Container();
            marquee_con.mask = new createjs.Shape();
            marquee_con.mask.graphics.beginFill("#fff").drawRect(0, 0, 1200, textbounds.height + 5);
            marquee_con.mask.x = announcementText.x;
            marquee_con.mask.y = announcementText.y;

            let twin = announcementText.clone();
            twin.x = announcementText.x + textbounds.width + 1000;
            twin.y = announcementText.y;
            marquee_con.addChild(announcementText, twin);

            let marquee = function(obj) {
                let toX = obj.x - (textbounds.width + 1000);
                createjs.Tween.get(obj, {loop:true}).to({
                    x : toX
                }, 8000)
            }

            marquee(announcementText);
            marquee(twin);
            this.announcementCon.addChild(marquee_con);
        },

	    marquee(obj, toX, duration) {
	      createjs.Tween.get(obj ,{loop:true, override:true}).to({
	        x : obj.x - toX
	      }, duration)
	    },

		normalMainHead () {
			this.live_games_header.normal(this.live_games_header);
			this.live_games_header.clicked = false;
			this.themed_games_header.normal(this.themed_games_header);
			this.themed_games_header.clicked = false;
			this.reel_games_header.normal(this.reel_games_header);
			this.reel_games_header.clicked = false;
		},
		normalSubHead () {
			this.bet_history_thumbnail.normal();
			this.bet_history_thumbnail.clicked = false;
			this.transfer_history_thumbnail.normal();
			this.transfer_history_thumbnail.clicked = false;
			this.howtoplay_thumbnail.normal();
			this.howtoplay_thumbnail.clicked = false;
			this.settings_thumbnail.normal();
			this.settings_thumbnail.clicked = false;
		}
	});

	return instance;
}
