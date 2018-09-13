import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
			let header_bg = new createjs.Shape();
			header_bg.graphics.beginFill("#1f2021").drawRect(0,0,this.context.context.width , 72);
			header_bg.setBounds(0,0,this.context.context.width , 72);
			this.addChild(header_bg);

			this.main_lobby_header = new createjs.Shape();
			this.main_lobby_header.graphics.beginFill("#1f2021").drawRect(0,0,320,header_bg.getBounds().height);
			this.main_lobby_header.name = "main";
			this.main_lobby_header.active = function (e) {}
			this.main_lobby_header.normal = function (e) {}
			this.addChild(this.main_lobby_header);

			let logo = new createjs.Bitmap("/img/logo.png");
			logo.scaleX = logo.scaleY = .22
			logo.x = 54;
			logo.y = 10;
			logo.hitArea = this.main_lobby_header;
			this.addChild(logo);

			//=== live games
			this.live_games_header = new createjs.Shape();
			this.live_games_header.graphics.beginFill("#1f2021").drawRect(0,0,268,header_bg.getBounds().height);
			this.live_games_header.x = 334;
			this.live_games_header.name = "live_games";
			this.addChild(this.live_games_header);

			this.live_games_header.normal = function (e) {
				e.graphics.clear().beginFill("#1f2021").drawRect(0,0,268,header_bg.getBounds().height);
				e.icon.gotoAndPlay("steady");
				e.live_games_text.font  = "22px ArvoRegular";

				if(window.language.locale == "zh") { e.live_games_text.font  = "bold 30px ArvoBold"; }

				e.live_games_text.color  = "#a2a2a2";
				e.bar.visible = 0
			}

			this.live_games_header.active = function (e) {
				e.graphics.clear().beginFill("#8c1414").drawRect(0,0,268,header_bg.getBounds().height);
				e.icon.gotoAndPlay("select");
				e.live_games_text.font  = "22px ArvoBold";

				if(window.language.locale == "zh") { e.live_games_text.font  = "bold 30px ArvoBold"; }

				e.live_games_text.color  = "#fff";
				e.bar.visible = 1
			}

			this.live_games_header.bar = new createjs.Shape()
			this.live_games_header.bar.graphics.beginFill("#bc2424").drawRect(0,0,268,10);
			this.live_games_header.bar.x = this.live_games_header.x;
			this.live_games_header.bar.visible = 0;
			this.addChild(this.live_games_header.bar);

			this.live_games_header.icon = createSprite("/img/livegames_ico.png",52,44,this.live_games_header.icon);
			this.live_games_header.live_games_text = new createjs.Text(window.language.lobby.livegamescaps," 22px ArvoRegular" ,"#a2a2a2");

			if(window.language.locale == "zh") {
					this.live_games_header.live_games_text.font = "bold 30px ArvoRegular";
					this.live_games_header.icon.x = this.live_games_header.x + 22 + 20;
					this.live_games_header.icon.y = 14;

					this.live_games_header.live_games_text.x = 425 + 10;
					this.live_games_header.live_games_text.y = 19;
			}

			this.live_games_header.icon.shadow = new createjs.Shadow("#000",0,2,4);
			this.live_games_header.icon.hitArea = this.live_games_header;
			this.addChild(this.live_games_header.icon);

			if(window.language.locale == "en") {

				this.live_games_header.icon.x = this.live_games_header.x + 22 + 5;
				this.live_games_header.icon.y = 14;

				this.live_games_header.live_games_text.x = 410 + 10;

				this.live_games_header.live_games_text.y = 22;
			}

			if(window.language.locale == "jp") {

				this.live_games_header.icon.x = this.live_games_header.x + 22 + 10;
				this.live_games_header.icon.y = 14;

				this.live_games_header.live_games_text.x = 420 + 10;

				this.live_games_header.live_games_text.y = 22;
			}

			if(window.language.locale == "kr") {

				this.live_games_header.icon.x = this.live_games_header.x + 22 + 20;
				this.live_games_header.icon.y = 14;

				this.live_games_header.live_games_text.x = 425 + 15;

				this.live_games_header.live_games_text.y = 22;
			}

			this.live_games_header.live_games_text.shadow = new createjs.Shadow("rgba(0,0,0,0,0.8)",0,4,4)
			this.live_games_header.live_games_text.hitArea = this.live_games_header;
			this.addChild(this.live_games_header.live_games_text);

			//=== themed games
			this.themed_games_header = new createjs.Shape();
			this.themed_games_header.graphics.beginFill("#1f2021").drawRect(0,0,328,header_bg.getBounds().height);
			this.themed_games_header.x = 602;
			this.themed_games_header.name = "themed_games";
			this.addChild(this.themed_games_header);

			this.theme_gamesSoon = new createjs.Shape();
			this.theme_gamesSoon.graphics.beginFill("#cf2f1f").drawRect(-62 + 8, -2, 108, 25);
			this.theme_gamesSoon.mouseEnabled = false;
			if(window.language.locale == "en") { this.theme_gamesSoon.x = 787; }
			if(window.language.locale == "jp") { this.theme_gamesSoon.x = 787 + 6; }
			if(window.language.locale == "kr" || window.language.locale == "zh") { this.theme_gamesSoon.x = 787 + 9; }
			this.theme_gamesSoon.y = 50;

			this.theme_gamesSoonText = new createjs.Text(window.language.lobby.comingsooncaps, window.language.locale == "zh" ? "italic 18px TimesNewRoman" : "italic 13px TimesNewRoman", "#fff");
			this.theme_gamesSoonText.x = this.theme_gamesSoon.x - .5;

			if(window.language.locale == "zh") {
							this.theme_gamesSoonText.y = this.theme_gamesSoon.y + 0;
			} else {
							this.theme_gamesSoonText.y = this.theme_gamesSoon.y + 3;
			}

			this.theme_gamesSoonText.mouseEnabled = false;
			this.theme_gamesSoonText.textAlign = "center";
			this.addChild(this.theme_gamesSoon, this.theme_gamesSoonText);

			this.themed_games_header.bar = new createjs.Shape();
			this.themed_games_header.bar.graphics.beginFill("#c3185c").drawRect(0,0,328,10);
			this.themed_games_header.bar.x = this.themed_games_header.x;
			this.themed_games_header.bar.visible = 0
			this.addChild(this.themed_games_header.bar);


			this.themed_games_header.icon = createSprite("/img/themedgames_ico.png",52,44,this.themed_games_header.icon);
			this.themed_games_header.icon.hitArea = this.themed_games_header;
			this.themed_games_header.icon.shadow = new createjs.Shadow("#000",0,2,4);

			this.themed_games_header.themed_games_text = new createjs.Text(window.language.lobby.themedgamescaps," 22px ArvoRegular" ,"#a2a2a2");

			if(window.language.locale == "zh") {
					this.themed_games_header.themed_games_text.font = "bold 30px ArvoRegular";
					this.themed_games_header.icon.x = this.themed_games_header.x + 22 + 60;
					this.themed_games_header.icon.y = 14;

					this.themed_games_header.themed_games_text.x = 720 + 15;
					this.themed_games_header.themed_games_text.y = 10;
			}

			if(window.language.locale == "kr") {
					this.themed_games_header.icon.x = this.themed_games_header.x + 22 + 60;
					this.themed_games_header.icon.y = 14;

					this.themed_games_header.themed_games_text.x = 720 + 30;
					this.themed_games_header.themed_games_text.y = 22;
			}

			if(window.language.locale == "jp") {
					this.themed_games_header.icon.x = this.themed_games_header.x + 22 + 40;
					this.themed_games_header.icon.y = 14;

					this.themed_games_header.themed_games_text.x = 707 + 20;
					this.themed_games_header.themed_games_text.y = 22;
			}

			if(window.language.locale == "en") {
					this.themed_games_header.icon.x = this.themed_games_header.x + 22 + 11;
					this.themed_games_header.icon.y = 14;

					this.themed_games_header.themed_games_text.x = 680 + 11;
					this.themed_games_header.themed_games_text.y = 22;
			}

			this.themed_games_header.themed_games_text.shadow = new createjs.Shadow("rgba(0,0,0,0,0.8)",0,4,4)
			this.themed_games_header.themed_games_text.hitArea = this.themed_games_header;

			this.addChild(this.themed_games_header.icon);
			this.addChild(this.themed_games_header.themed_games_text);

			this.themed_games_header.normal = function (e) {
				e.graphics.clear().beginFill("#1f2021").drawRect(0,0,328,header_bg.getBounds().height);
				e.icon.gotoAndPlay("steady");
				e.themed_games_text.font  = "22px ArvoRegular";

				if(window.language.locale == "zh") { e.themed_games_text.font  = "bold 30px ArvoBold"; }

				e.themed_games_text.color  = "#a2a2a2";
				e.bar.visible = 0
			}
			this.themed_games_header.active = function (e) {
				e.graphics.clear().beginFill("#890e4f").drawRect(0,0,328,header_bg.getBounds().height);
				e.icon.gotoAndPlay("select");
				e.themed_games_text.font  = "22px ArvoBold";

				if(window.language.locale == "zh") { e.themed_games_text.font  = "bold 30px ArvoBold"; }

				e.themed_games_text.color  = "#fff";
				e.bar.visible = 1
			}

			// === reel games
			this.reel_games_header = new createjs.Shape();
			this.reel_games_header.graphics.beginFill("#1f2021").drawRect(0,0,280,header_bg.getBounds().height);
			this.reel_games_header.x = 930;
			this.reel_games_header.name = "reel_games";
			this.addChild(this.reel_games_header);

			// //reel games soon
			// this.reel_gamesSoon = new createjs.Shape();
			// this.reel_gamesSoon.graphics.beginFill("#cf2f1f").drawRect(-62 + 8, -2, 109, 25);
			// this.reel_gamesSoon.mouseEnabled = false;
			// if(window.language.locale == "jp") { this.reel_gamesSoon.x = 787 + 304 + 7; }
			// if(window.language.locale == "en") { this.reel_gamesSoon.x = 787 + 304; }
			// if(window.language.locale == "kr" || window.language.locale == "zh") { this.reel_gamesSoon.x = 787 + 304 + .5; }
			// this.reel_gamesSoon.y = 50;
      //
			// this.reel_gamesSoonText = new createjs.Text(window.language.lobby.comingsooncaps, window.language.locale == "zh" ? "italic 18px TimesNewRoman" : "italic 13px TimesNewRoman", "#fff");
			// this.reel_gamesSoonText.x = this.reel_gamesSoon.x;
      //
			// if(window.language.locale == "zh") {
			// 				this.reel_gamesSoonText.y = this.reel_gamesSoon.y + 0;
			// } else {
			// 				this.reel_gamesSoonText.y = this.reel_gamesSoon.y + 3;
			// }
      //
			// this.reel_gamesSoonText.mouseEnabled = false;
			// this.reel_gamesSoonText.textAlign = "center";
			// this.addChild(this.reel_gamesSoon, this.reel_gamesSoonText);

			this.reel_games_header.bar = new createjs.Shape();
			this.reel_games_header.bar.graphics.beginFill("#ffb74e").drawRect(0,0,280,10);
			this.reel_games_header.bar.x = this.reel_games_header.x;
			this.reel_games_header.bar.visible = 0;
			this.addChild(this.reel_games_header.bar);


			this.reel_games_header.icon = createSprite("/img/reelgames_ico.png",52,44,this.reel_games_header.icon);
			this.reel_games_header.icon.hitArea = this.reel_games_header;
			this.reel_games_header.icon.shadow = new createjs.Shadow("#000",0,2,4);
			this.addChild(this.reel_games_header.icon);

			this.reel_games_header.reel_games_text = new createjs.Text(window.language.lobby.reelgamescaps," 22px ArvoRegular" ,"#a2a2a2");

			if(window.language.locale == "zh") {
				this.reel_games_header.reel_games_text.font = "bold 30px ArvoRegular";
				this.reel_games_header.icon.x = this.reel_games_header.x + 22 + 40;
				this.reel_games_header.icon.y = 14;

				this.reel_games_header.reel_games_text.x = 1025 + 15;
				this.reel_games_header.reel_games_text.y = 18;
			}

			if(window.language.locale == "en") {
				this.reel_games_header.icon.x = this.reel_games_header.x + 22 + 12;
				this.reel_games_header.icon.y = 14;

				this.reel_games_header.reel_games_text.x = 1005 + 12;
				this.reel_games_header.reel_games_text.y = 22;
			}

			if(window.language.locale == "jp") {
				this.reel_games_header.icon.x = this.reel_games_header.x + 22 + 45;
				this.reel_games_header.icon.y = 14;

				this.reel_games_header.reel_games_text.x = 1030 + 25;
				this.reel_games_header.reel_games_text.y = 22;
			}

			if(window.language.locale == "kr") {
				this.reel_games_header.icon.x = this.reel_games_header.x + 22 + 40;
				this.reel_games_header.icon.y = 14;

				this.reel_games_header.reel_games_text.x = 1025 + 20;
				this.reel_games_header.reel_games_text.y = 22;
			}

			this.reel_games_header.reel_games_text.shadow = new createjs.Shadow("rgba(0,0,0,0,0.8)",0,4,4)
			this.reel_games_header.reel_games_text.hitArea = this.themed_games_header;
			this.addChild(this.reel_games_header.reel_games_text);

			this.reel_games_header.normal = function (e) {
				e.graphics.clear().beginFill("#1f2021").drawRect(0,0,280,header_bg.getBounds().height);
				e.icon.gotoAndPlay("steady");
				e.reel_games_text.font  = "22px ArvoRegular";

				if(window.language.locale == "zh") { e.reel_games_text.font  = "bold 30px ArvoBold"; }

				e.reel_games_text.color  = "#a2a2a2";
				e.bar.visible = 0
			}
			this.reel_games_header.active = function (e) {
				e.graphics.clear().beginFill("#f57c00").drawRect(0,0,280,header_bg.getBounds().height);
				e.icon.gotoAndPlay("select");
				e.reel_games_text.font  = "22px ArvoBold";

				if(window.language.locale == "zh") { e.reel_games_text.font  = "bold 30px ArvoBold"; }

				e.reel_games_text.color  = "#fff";
				e.bar.visible = 1
			}

			// === bet history
			this.bet_history_thumbnail = new createjs.Shape();
			this.bet_history_thumbnail.graphics.beginFill("#1f2021").drawRect(0,0,66,72);
			this.bet_history_thumbnail.x = 1289;
			this.bet_history_thumbnail.name = "thumbnail_bethistory";
			this.addChild(this.bet_history_thumbnail);

			this.bet_history_thumbnail.icon = createSprite("/img/bethistory_ico.png",52,44,this.bet_history_thumbnail.icon);
			this.bet_history_thumbnail.icon.x = this.bet_history_thumbnail.x + 8;
			this.bet_history_thumbnail.icon.y =  10;
			this.bet_history_thumbnail.icon.hitArea = this.bet_history_thumbnail;
			this.addChild(this.bet_history_thumbnail.icon);

			this.bet_history_thumbnail.active = () => {
				this.bet_history_thumbnail.icon.gotoAndPlay("select");
			}
			this.bet_history_thumbnail.normal = () => {
				this.bet_history_thumbnail.icon.gotoAndPlay("steady");
			}

			// === transfer history
			this.transfer_history_thumbnail = new createjs.Shape();
			this.transfer_history_thumbnail.graphics.beginFill("#1f2021").drawRect(0,0,68,72);
			this.transfer_history_thumbnail.x = 1365;
			this.transfer_history_thumbnail.name = "thumbnail_transactions";
			this.addChild(this.transfer_history_thumbnail);

			this.transfer_history_thumbnail.icon = createSprite("/img/transactionhistory_ico.png",52,44,this.transfer_history_thumbnail.icon);
			this.transfer_history_thumbnail.icon.x = this.transfer_history_thumbnail.x + 8;
			this.transfer_history_thumbnail.icon.y = 10;
			this.transfer_history_thumbnail.icon.hitArea = this.transfer_history_thumbnail;
			this.addChild(this.transfer_history_thumbnail.icon)

			this.transfer_history_thumbnail.active = () => {
				this.transfer_history_thumbnail.icon.gotoAndPlay("select")
			}
			this.transfer_history_thumbnail.normal = () => {
				this.transfer_history_thumbnail.icon.gotoAndPlay("steady")
			}

			// === howtoplay history
			this.howtoplay_thumbnail = new createjs.Shape();
			this.howtoplay_thumbnail.graphics.beginFill("#1f2021").drawRect(0,0,66,72);
			this.howtoplay_thumbnail.x = 1432;
			this.howtoplay_thumbnail.name = "thumbnail_howtoplay";
			this.addChild(this.howtoplay_thumbnail);

			this.howtoplay_thumbnail.icon = createSprite("/img/gamerules_ico.png",52,44,this.howtoplay_thumbnail.icon);
			this.howtoplay_thumbnail.icon.x = this.howtoplay_thumbnail.x + 10;
			this.howtoplay_thumbnail.icon.y = 10;
			this.howtoplay_thumbnail.icon.hitArea = this.howtoplay_thumbnail;
			this.addChild(this.howtoplay_thumbnail.icon);

			this.howtoplay_thumbnail.active = () => {
				this.howtoplay_thumbnail.icon.gotoAndPlay("select");
			};
			this.howtoplay_thumbnail.normal = () => {
				this.howtoplay_thumbnail.icon.gotoAndPlay("steady");
			};

			// === settings
			this.settings_thumbnail = new createjs.Shape();
			this.settings_thumbnail.graphics.beginFill("#1f2021").drawRect(0,0,66,72);
			this.settings_thumbnail.x = 1502;
			this.settings_thumbnail.name = "thumbnail_settings";
			this.addChild(this.settings_thumbnail);

			this.settings_thumbnail.icon = createSprite("/img/settings_ico.png",52,44,this.settings_thumbnail.icon);
			this.settings_thumbnail.icon.x = this.settings_thumbnail.x + 10;
			this.settings_thumbnail.icon.y = 10;
			this.settings_thumbnail.icon.hitArea = this.settings_thumbnail;
			this.addChild(this.settings_thumbnail.icon);

			this.settings_thumbnail.active = () => {
				this.settings_thumbnail.icon.gotoAndPlay("select");
			}

			this.settings_thumbnail.normal = () => {
				this.settings_thumbnail.icon.gotoAndPlay("steady");
			}

			this.on("mouseover", (e) => {
				try {
					if(e.target.name == "themed_games"){
						e.target.cursor = "default";
						// e.target.normal(e.target)

				  } else if(e.target.name == "reel_games") {
							if(window.reel_yn === 0) {
								e.target.cursor = "default";
							}
					} else {
							e.target.cursor = "pointer";
							e.target.active(e.target)
					}
				} catch(err) {

				}
				// this.updateCache()
			});

			this.on("mouseout", (e) => {
				if(e.target.clicked) return;
				try {
					e.target.normal(e.target)
				} catch(err){

				}
				// this.updateCache()

			});

			this.toggleGamePlay = true;

			this.on("click", (e) => {
				if(!e.target.name) return;

				// if(e.target.name == "themed_games" || e.target.name == "reel_games"){
				// 	return;
				// }

				if(e.target.name == "themed_games") {
					return;
				}

				if(e.target.name == "reel_games") {
					if(window.reel_yn === 0) {
						return;
					}
				}

				if (e.target.name == "logout" && !e.target.clicked) {

					if(this.context.lobby_popup_howTo.visible)
					{
						$("#sicbo-toggle, #poker-toggle, #baccarat-toggle, #dragontiger-toggle, #red-white-toggle, #bigwheel-toggle, #roulette-toggle")
						.css("display","none")
						this.context.lobby_header.toggleGamePlay = true;
						this.context.lobby_popup_howTo.visible = false;
					}

					this.context.confirmation_modal.redirectCasinoPage()
					return;
				}

				playSound('click');

				if(e.target.name == "thumbnail_howtoplay") {
						if(this.toggleGamePlay) {
							this.toggleGamePlay = false;
						} else {
							setTimeout(function() {
								$("#sicbo-toggle").css("display","none");
								$("#poker-toggle").css("display","none");
								$("#baccarat-toggle").css("display","none");
								$("#dragontiger-toggle").css("display","none");
								$("#red-white-toggle").css("display","none");
								$("#bigwheel-toggle").css("display","none");
						 }, 60);
						this.toggleGamePlay = true;
					}
				}

				if(e.target.name != "thumbnail_howtoplay") {
					$("#sicbo-toggle").css("display","none");
					$("#poker-toggle").css("display","none");
					$("#baccarat-toggle").css("display","none");
					$("#dragontiger-toggle").css("display","none");
					$("#red-white-toggle").css("display","none");
					$("#bigwheel-toggle").css("display","none");
					this.toggleGamePlay = true;
				}
				if(e.target.name.indexOf("thumbnail") > -1) {
					this.normalSubHead();
				} else {
					this.normalMainHead();
				}
				this.context.toggleView(e.target.name);
				e.target.active(e.target);
				e.target.clicked = true;

				// if(e.target.name == "thumbnail_howtoplay") {
				// 	setTimeout(function(){
				// 		if(redWhiteToogle) {
				// 			$("#baccarat_toogle").css("visibility","visible");
				// 			redWhiteToogle = false;
				// 		} else {
				// 			$("#red_white_toogle").css("visibility","hidden");
				// 			$("#baccarat_toogle").css("visibility","hidden");
				// 			redWhiteToogle = true;
				// 		}
				// 	}, 100);
				// }


				if(e.target.name == "live_games") {
					// this.sub_header_sicbo.normal(this.sub_header_sicbo);
					// this.context.lobby_liveGames_subHeader.sub_header_allGames.active(this.context.lobby_liveGames_subHeader.sub_header_allGames);
					this.context.lobby_liveGames_subHeader.sub_header_baccarat.active(this.context.lobby_liveGames_subHeader.sub_header_baccarat);
					this.context.lobby_liveGames_subHeader.sub_header_sicbo.normal(this.context.lobby_liveGames_subHeader.sub_header_sicbo);
					this.context.lobby_liveGames_subHeader.sub_header_poker.normal(this.context.lobby_liveGames_subHeader.sub_header_poker);
					this.context.lobby_liveGames_subHeader.sub_header_dragonTiger.normal(this.context.lobby_liveGames_subHeader.sub_header_dragonTiger);

					this.context.lobby_liveGames_subHeader.sub_header_baccarat.clicked = true;
					this.context.lobby_liveGames_subHeader.sub_header_sicbo.clicked = false;
					this.context.lobby_liveGames_subHeader.sub_header_poker.clicked = false;
					this.context.lobby_liveGames_subHeader.sub_header_dragonTiger.clicked = false;

					this.context.lobby_banner.visible = true;
				} else if(e.target.name == "themed_games" || e.target.name == "reel_games"){
					this.context.lobby_banner.visible = false;
				}
				// this.updateCache()
			});

			let shape = new createjs.Shape();
			shape.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0,0,100,header_bg.getBounds().height);
			this.addChild(shape);

			this.logout_button = createSprite("img/logout_ico.png", 52, 44, this.logout_button);
			this.logout_button.x = this.context.context.width - 85;
			this.logout_button.y = 14;
			this.logout_button.name = "logout";
			this.logout_button.addEventListener('mousedown', function(e){
				e.target.gotoAndPlay("select")
			});

			this.logout_button.addEventListener('pressup', function(e) {
				e.target.gotoAndPlay("steady")
			});

			shape.x = this.logout_button.x-10;
			shape.y = 0;
			shape.name = "logout";

			this.addChild(this.logout_button);

			//username label
			let user_name_label = new createjs.Text(window.username,"20px LatoRegular","#fff");
			user_name_label.x = 1670
			user_name_label.y = 9
			let textbounds = user_name_label.getBounds();

      // === long string marquee
      if(textbounds.width > 126) {
        let marquee_con = new createjs.Container();

        marquee_con.mask = new createjs.Shape();
        marquee_con.mask.graphics.beginFill("#fff").drawRect(0, 0, 155, textbounds.height);
        marquee_con.mask.x = user_name_label.x;
        marquee_con.mask.y = user_name_label.y;

        let twin = user_name_label.clone();
        twin.x = user_name_label.x  + textbounds.width + 60;
        twin.y = user_name_label.y;
        marquee_con.addChild(user_name_label, twin);

        let marquee = function(obj) {
          let toX = obj.x - (textbounds.width + 60);
          createjs.Tween.get(obj ,{loop:true}).to({
            x : toX
          }, 4000)
        }

        marquee(user_name_label);
        marquee(twin);

        this.addChild(marquee_con);
      } else {
        this.addChild(user_name_label);
      }

		// === user money
		this.user_money = window.money;

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

	    // ===
	    this.user_money = (window.casino == 'SS') ? parseFloat(this.user_money).toFixed(2) : parseInt(this.user_money);

		this.user_money_text = new createjs.Text(currency +''+ numberWithCommas(this.user_money),"34px BebasNeue","#ede080");
		this.user_money_text.x = user_name_label.x;
		this.user_money_text.y = user_name_label.y + 20;
		// this.addChild(this.user_money_text);

      // === long string marquee
      if(this.user_money.toString().replace(/[^A-Z0-9]/ig, "").length > 10) {
        let marquee_con = new createjs.Container();
        let bounds = this.user_money_text.getBounds();

        marquee_con.mask = new createjs.Shape();
        marquee_con.mask.graphics.beginFill("#fff").drawRect(0, 0, 155, bounds.height + 20);
        marquee_con.mask.x = this.user_money_text.x;
        marquee_con.mask.y = this.user_money_text.y;

        let twin = this.user_money_text.clone();
        twin.x = this.user_money_text.x  + bounds.width + 60;
        twin.y = this.user_money_text.y;
        marquee_con.addChild(this.user_money_text, twin);

        let marquee = function(obj) {
          let toX = obj.x - (bounds.width + 60);
          createjs.Tween.get(obj ,{loop:true}).to({
            x : toX
          }, 4000)
        }

        marquee(this.user_money_text);
        marquee(twin);

        this.addChild(marquee_con);
      } else {
        this.addChild(this.user_money_text);
      }

			// === user avatar
			this.user_avatar = new createjs.Bitmap("/img/avatar/"+window.config.default+'.png');
			this.user_avatar.x = 1598;
			this.user_avatar.y = 6;
			this.user_avatar.scaleY = this.user_avatar.scaleX = 0.8;
			this.addChild(this.user_avatar);

			// this.cache(0,0,this.context.context.width , 72);

			setTimeout(()=>{
				// this.updateCache()
			},500)
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
