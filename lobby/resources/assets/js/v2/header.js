import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, setCurrentTimezone } from '../factories/factories';

let header = document.createElement("canvas");

$(header).attr({
	'id' : 'header-1',
	'width' : '1920px',
	'height' : '200px'
});

// $('.lobby-main-container').append(header)

let marquee = (obj, toX, duration) => {
  createjs.Tween.get(obj ,{loop:true, override:true}).to({
    x : obj.x - toX
  }, duration)
}

let component_header = {
		stage : new createjs.Stage("header-1"),
		main ()  {
			let header_bg = new createjs.Shape();
			header_bg.graphics.beginFill("#1f2021").drawRect(0,0,1920, 96.5);
			header_bg.setBounds(0,0,1920 , 96.5);
			this.stage.addChild(header_bg);

			let main_lobby_header = new createjs.Shape();
			main_lobby_header.graphics.beginFill("#1f2021").drawRect(0,0,1920,header_bg.getBounds().height);
			main_lobby_header.name = "main";
			main_lobby_header.active = function (e) {}
			main_lobby_header.normal = function (e) {}
			this.stage.addChild(main_lobby_header);

			let header_width = 141;

			//=== live games
			this.live_games_header = new createjs.Shape();
			this.live_games_header.graphics.beginFill("#1f2021").drawRect(0,0,header_width + 20 ,header_bg.getBounds().height);
			this.live_games_header.x = 96.5;
			this.live_games_header.name = "live_games";
			this.stage.addChild(this.live_games_header);

			this.live_games_header.icon = createSprite("/img/livegames_ico.png",52,44, this.live_games_header.icon);
			this.live_games_header.icon.x = this.live_games_header.x + (header_width / 2) + 20 - (52 / 2 ) /* - 11 - 8 -1 */;
			this.live_games_header.icon.y = 10;
			this.live_games_header.icon.scaleX = this.live_games_header.icon.scaleY = 1.2;
			this.live_games_header.icon.shadow = new createjs.Shadow("#000",0,2,4);
			this.live_games_header.icon.hitArea = this.live_games_header;
			this.stage.addChild(this.live_games_header.icon);

			this.live_games_header.normal = () => {
				this.live_games_header.graphics.clear().beginFill("#1f2021").drawRect(0,0,header_width + 20,header_bg.getBounds().height);
				this.live_games_header.icon.gotoAndPlay("steady");
			}

			this.live_games_header.active =  () => {
				this.live_games_header.graphics.clear().beginFill("#8c1414").drawRect(0,0,header_width + 20,header_bg.getBounds().height);
				this.live_games_header.icon.gotoAndPlay("select");

				if(parseInt(window.all_tables[0].mainNotice.status)) {
					$('.announcement').addClass("active");
					console.log(window.all_tables[0].mainNotice.status);
				}

			}

			let live_games_text = new createjs.Text(window.language.lobby.livecaps,"bold 18px ArvoRegular, Helvetica" ,"#fff");
			live_games_text.x = this.live_games_header.x + (header_width / 2) + 20;
			live_games_text.y = 62;
			live_games_text.textAlign = "center";
			live_games_text.hitArea = this.live_games_header;
			this.stage.addChild(live_games_text);

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
			this.stage.addChild(logo_bg);
			console.log(this)
			let logo = new createjs.Bitmap(this.context.load.getResources("logo"));
			logo.scaleX = logo.scaleY = .48
			logo.x = 20;
			logo.y = 14;
			logo.name = "main"
			this.stage.addChild(logo);

			//=== themed games
			this.themed_games_header = new createjs.Shape();
			this.themed_games_header.graphics.beginFill("#1f2021").drawRect(0,0,header_width, header_bg.getBounds().height);
			this.themed_games_header.x = this.live_games_header.x + header_width + 20;
			this.themed_games_header.name = "themed_games";
			this.stage.addChild(this.themed_games_header);

			this.themed_games_header.icon = createSprite("/img/themedgames_ico.png",52,44,this.themed_games_header.icon);
			this.themed_games_header.icon.x =  this.themed_games_header.x + (header_width / 2) - ((52 / 2) * 1.2);
			this.themed_games_header.icon.y = 10;
			this.themed_games_header.icon.hitArea = this.themed_games_header;
			this.themed_games_header.icon.scaleX = this.themed_games_header.icon.scaleY = 1.2;
			this.themed_games_header.icon.shadow = new createjs.Shadow("#000",0,2,4);
			this.stage.addChild(this.themed_games_header.icon);

			this.themed_games_header.normal = () => {
				return;
				this.themed_games_header.graphics.clear().beginFill("#1f2021").drawRect(0,0,header_width,header_bg.getBounds().height);
				this.themed_games_header.icon.gotoAndPlay("steady");
			}
			this.themed_games_header.active = () => {
				return;
				this.themed_games_header.graphics.clear().beginFill("#890e4f").drawRect(0,0,header_width,header_bg.getBounds().height);
				this.themed_games_header.icon.gotoAndPlay("select");
				$('.announcement').removeClass("active");
			}

			let themed_games_text = new createjs.Text(window.language.lobby.themedcaps,"bold 18px ArvoRegular, Helvetica" ,"#fff");
			themed_games_text.x = this.themed_games_header.x + (header_width / 2);
			themed_games_text.y = 62;
			themed_games_text.textAlign = "center"
			themed_games_text.hitArea = this.themed_games_header;
			this.stage.addChild(themed_games_text);

			if(window.language.locale == "zh") {
				themed_games_text.font = "bold 23px ArvoRegular, Helvetica";
			}

			let theme_gamesSoon = new createjs.Shape();
			theme_gamesSoon.graphics.beginFill("#cf2f1f").drawRect(-67 - 12.5 , -2, 115, 25);
			theme_gamesSoon.mouseEnabled = false;
			theme_gamesSoon.x = 350;
			theme_gamesSoon.y = 84.5 - 47.5 - 13 + 1;

			let theme_gamesSoonText = new createjs.Text(window.language.lobby.comingsooncaps, window.language.locale == "zh" ? "italic 17px TimesNewRoman" : "italic 14px TimesNewRoman", "#fff");
			theme_gamesSoonText.x = theme_gamesSoon.x - 23.5;
			theme_gamesSoonText.y = theme_gamesSoon.y + 1 - 4 + 14.5;
			theme_gamesSoonText.mouseEnabled = false;
			theme_gamesSoonText.textAlign = "center";
			theme_gamesSoonText.textBaseline = "middle";
			this.stage.addChild(theme_gamesSoon, theme_gamesSoonText);

			// === reel games
			this.reel_games_header = new createjs.Shape();
			this.reel_games_header.graphics.beginFill("#1f2021").drawRect(0,0,header_width,header_bg.getBounds().height);
			this.reel_games_header.x = this.themed_games_header.x + header_width;
			this.reel_games_header.name = "reel_games";
			this.stage.addChild(this.reel_games_header);

			this.reel_games_header.icon = createSprite("/img/reelgames_ico.png",52,44,this.reel_games_header.icon);
			this.reel_games_header.icon.x = this.reel_games_header.x + (header_width / 2) - ((52 / 2) * 1.2) + 1;
			this.reel_games_header.icon.y = 10;
			this.reel_games_header.icon.scaleX = this.reel_games_header.icon.scaleY = 1.2;
			this.reel_games_header.icon.hitArea = this.reel_games_header;
			this.reel_games_header.icon.shadow = new createjs.Shadow("#000",0,2,4);
			this.stage.addChild(this.reel_games_header.icon);

			this.reel_games_header.normal = () => {
				this.reel_games_header.graphics.clear().beginFill("#1f2021").drawRect(0,0,header_width,header_bg.getBounds().height);
				this.reel_games_header.icon.gotoAndPlay("steady");
			}
			this.reel_games_header.active = () => {
				this.reel_games_header.graphics.clear().beginFill("#f57c00").drawRect(0,0,header_width,header_bg.getBounds().height);
				this.reel_games_header.icon.gotoAndPlay("select");
				$('.announcement').removeClass("active");
			}

			let reel_games_text = new createjs.Text(window.language.lobby.reelcaps,"bold 18px ArvoRegular, Helvetica" ,"#fff");
			reel_games_text.x = this.reel_games_header.x + (header_width / 2);
			reel_games_text.y = 62;

			if(window.language.locale == "zh") {
				reel_games_text.font = "bold 23px ArvoRegular, Helvetica";
			}

			reel_games_text.textAlign = "center";
			reel_games_text.hitArea = this.reel_games_header;
			this.stage.addChild(reel_games_text);

			// === bet history
			this.bet_history_thumbnail = new createjs.Shape();
			this.bet_history_thumbnail.graphics.beginFill("#1f2021").drawRect(0,0,header_width, header_bg.getBounds().height);
			this.bet_history_thumbnail.x = this.reel_games_header.x + header_width;
			this.bet_history_thumbnail.name = "thumbnail_bethistory";
			this.stage.addChild(this.bet_history_thumbnail);

			this.bet_history_thumbnail.icon = createSprite("/img/bethistory_ico.png",52,44,this.bet_history_thumbnail.icon);
			this.bet_history_thumbnail.icon.x = this.bet_history_thumbnail.x + (header_width / 2) - ((52 / 2) * 1.1);
			this.bet_history_thumbnail.icon.y =  10;
			this.bet_history_thumbnail.icon.scaleY = this.bet_history_thumbnail.icon.scaleX = 1.1
			this.bet_history_thumbnail.icon.hitArea = this.bet_history_thumbnail;
			this.stage.addChild(this.bet_history_thumbnail.icon);

			this.bet_history_thumbnail.active = () => {
				this.bet_history_thumbnail.icon.gotoAndPlay("select");
				$('.announcement').removeClass("active");
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
			this.stage.addChild(bet_history_text);

			// === transfer history
			this.transfer_history_thumbnail = new createjs.Shape();
			this.transfer_history_thumbnail.graphics.beginFill("#1f2021").drawRect(0,0,header_width ,header_bg.getBounds().height);
			this.transfer_history_thumbnail.x = this.bet_history_thumbnail.x + header_width;
			this.transfer_history_thumbnail.name = "thumbnail_transactions";
			this.stage.addChild(this.transfer_history_thumbnail);

			this.transfer_history_thumbnail.icon = createSprite("/img/transactionhistory_ico.png",52,44,this.transfer_history_thumbnail.icon);
			this.transfer_history_thumbnail.icon.x = this.transfer_history_thumbnail.x + (header_width / 2) - ((52 / 2) * 1.1);
			this.transfer_history_thumbnail.icon.y = 10;
			this.transfer_history_thumbnail.icon.scaleX = this.transfer_history_thumbnail.icon.scaleY = 1.1
			this.transfer_history_thumbnail.icon.hitArea = this.transfer_history_thumbnail;
			this.stage.addChild(this.transfer_history_thumbnail.icon)

			this.transfer_history_thumbnail.active = () => {
				this.transfer_history_thumbnail.icon.gotoAndPlay("select")
				$('.announcement').removeClass("active");
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
			this.stage.addChild(transaction_text);

			// === howtoplay history
			this.howtoplay_thumbnail = new createjs.Shape();
			this.howtoplay_thumbnail.graphics.beginFill("#1f2021").drawRect(0,0,150,header_bg.getBounds().height);
			this.howtoplay_thumbnail.x = this.transfer_history_thumbnail.x + header_width;
			this.howtoplay_thumbnail.name = "thumbnail_howtoplay";
			this.stage.addChild(this.howtoplay_thumbnail);

			this.howtoplay_thumbnail.icon = createSprite("/img/gamerules_ico.png",52,44,this.howtoplay_thumbnail.icon);
			this.howtoplay_thumbnail.icon.x = this.howtoplay_thumbnail.x + (header_width / 2) - ((52 / 2) * 1.1);
			this.howtoplay_thumbnail.icon.y = 10;
			this.howtoplay_thumbnail.icon.scaleX = this.howtoplay_thumbnail.icon.scaleY = 1.1
			this.howtoplay_thumbnail.icon.hitArea = this.howtoplay_thumbnail;
			this.stage.addChild(this.howtoplay_thumbnail.icon);

			this.howtoplay_thumbnail.active = () => {
				this.howtoplay_thumbnail.icon.gotoAndPlay("select");
				$('.announcement').removeClass("active");
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
			howtoplay_text.hitArea = this.howtoplay_thumbnail;
			this.stage.addChild(howtoplay_text);

			// === settings
			this.settings_thumbnail = new createjs.Shape();
			this.settings_thumbnail.graphics.beginFill("#1f2021").drawRect(0,0,66,header_bg.getBounds().height);
			this.settings_thumbnail.x = 980;
			this.settings_thumbnail.name = "thumbnail_settings";
			this.stage.addChild(this.settings_thumbnail);

			this.settings_thumbnail.icon = createSprite("/img/settings_ico.png",52,44,this.settings_thumbnail.icon);
			this.settings_thumbnail.icon.x = this.settings_thumbnail.x ;
			this.settings_thumbnail.icon.y = 50;
			this.settings_thumbnail.icon.hitArea = this.settings_thumbnail;
			this.settings_thumbnail.icon.scaleX = this.settings_thumbnail.icon.scaleY = .66;
			this.stage.addChild(this.settings_thumbnail.icon);

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

			  marquee(this.user_name_label, this.user_name_label.bounds.width + 60, 4000);
			  marquee(this.user_name_label.twin, this.user_name_label.bounds.width + 60, 4000);

			  this.stage.addChild(marquee_con);
			} else {
			  this.stage.addChild(this.user_name_label);
			}

			this.userMoneyContainer = new createjs.Container();
			this.stage.addChild(this.userMoneyContainer);

			this.user_money = window.money;
			this.updateMoney();

			// === user avatar
			this.user_avatar = new createjs.Bitmap("/img/avatar/"+window.config.default+'.png');
			this.user_avatar.x = 998;
			this.user_avatar.y = 20;
			this.user_avatar.hitArea = this.settings_thumbnail;

			this.user_avatar.scaleY = this.user_avatar.scaleX = 0.64;
			this.stage.addChild(this.user_avatar);

			// logout button
			let logout_button = createSprite("/img/logout_ico.png", 52, 44, logout_button);
			logout_button.x = 1210;
			logout_button.y = 18;
			logout_button.scaleY = logout_button.scaleX = 1.3;
			logout_button.name = "logout";
			logout_button.active = function() {
				logout_button.gotoAndPlay("select")
			};
			logout_button.normal = function() {
				logout_button.gotoAndPlay("steady")
			};

			logout_button.hitArea = new createjs.Shape();
			logout_button.hitArea.name = "logout";
			logout_button.hitArea.graphics.beginFill("#1F2021").drawRect(0, 0, 70, 96);
			logout_button.hitArea.x = logout_button.x - 4;
			logout_button.hitArea.y = logout_button.y - 20;

			this.stage.addChild(logout_button.hitArea);
			this.stage.addChild(logout_button);


			/** game sub header  */

			//live games subheader
			let live_sub_preset = {
				font : "bold 20px LatoBold",
				subheader_color : "#8c1414",
				subheader_active_color : "#771111",
				subheader_text : [window.language.lobby.baccaratcaps, window.language.lobby.supersixcaps, window.language.lobby.bonusbaccaratcaps, window.language.lobby.texascaps, window.language.lobby.sicbocaps, window.language.lobby.dragontigercaps],
				subheader_names : ["baccarat", "supersix", "bonusbaccarat", "poker", "sicbo", "dragonTiger"],
				width : [190, 140, 260, 220, 140, 260],
				header_height : 68
			}

			this.liveGames_subheader = new createjs.Container();
			this.liveGames_subheader.set({y : 96.5, visible: false});
			this.stage.addChild(this.liveGames_subheader);

			var sub_header_bg = new createjs.Shape();
			sub_header_bg.graphics.beginFill(live_sub_preset.subheader_color).drawRect(-50,0, 1500, live_sub_preset.header_height);
			sub_header_bg.setBounds(-50,0, 1500, 68);
			this.liveGames_subheader.addChild(sub_header_bg);

			for(var x = 0; x < live_sub_preset.subheader_names.length; x++) {
				this['sub_'+live_sub_preset.subheader_names[x]] =  new createjs.Shape();
				this['sub_'+live_sub_preset.subheader_names[x]].name = live_sub_preset.subheader_names[x];
				this['sub_'+live_sub_preset.subheader_names[x]].graphics.beginFill(live_sub_preset.subheader_color).drawRect(0,0,live_sub_preset.width[x],live_sub_preset.header_height);
				this['sub_'+live_sub_preset.subheader_names[x]].setBounds(0,0,live_sub_preset.width[x],live_sub_preset.header_height);
				this['sub_'+live_sub_preset.subheader_names[x]].x = x > 0 ? this['sub_'+live_sub_preset.subheader_names[x-1]].x + this['sub_'+live_sub_preset.subheader_names[x-1]].getBounds().width  : 30;
				this.liveGames_subheader.addChild(this['sub_'+live_sub_preset.subheader_names[x]]);

				this['sub_'+live_sub_preset.subheader_names[x]].active = (e) => {
					e.graphics.clear().beginFill('#771111').drawRect(0,0,e.getBounds().width,e.getBounds().height);
					if(parseInt(window.all_tables[0].mainNotice.status)) {
						$('.announcement').addClass("active");
						console.log(window.all_tables[0].mainNotice.status);
					}
				}
				this['sub_'+live_sub_preset.subheader_names[x]].normal = (e) => {
					e.graphics.clear().beginFill('#8c1414').drawRect(0,0,e.getBounds().width,e.getBounds().height);
				}

				live_sub_preset.font = window.language.locale == 'zh' ? 'bold 25px LatoBold' : live_sub_preset.font;
				let text = new createjs.Text(live_sub_preset.subheader_text[x], live_sub_preset.font, "#fff");
				text.name = live_sub_preset.subheader_names[x];
				text.hitArea = this['sub_'+live_sub_preset.subheader_names[x]];
				text.set({textAlign : 'center', x : this['sub_'+live_sub_preset.subheader_names[x]].x + (this['sub_'+live_sub_preset.subheader_names[x]].getBounds().width/2) , textBaseline : 'middle', y : (68/2) - (window.language.locale == 'zh' ? 7 : 2 ) })
				text.mouseEnabled = false;
				this.liveGames_subheader.addChild(text);

				if(live_sub_preset.subheader_names[x] == 'poker' ||
				live_sub_preset.subheader_names[x] == 'supersix' ||
				live_sub_preset.subheader_names[x] == 'bonusbaccarat' )
				{
					let newBg = new createjs.Shape();
					newBg.graphics.beginFill("#d22f22").drawRect(0,0,50,20);
					let newBgx = window.language.locale == 'zh' ? 15 : -15;
					newBg.x = this['sub_'+live_sub_preset.subheader_names[x]].x + text.getTransformedBounds().width + newBgx;
					newBg.y = 43;
					newBg.hitArea = this['sub_'+live_sub_preset.subheader_names[x]];
					newBg.mouseEnabled = false;
					this.liveGames_subheader.addChild(newBg);

					let newText = new createjs.Text(window.language.lobby.newcaps, "italic 17px TimesNewRoman","#fff");
					newText.x = newBg.x + 25;
					newText.y = newBg.y;
					newText.textAlign = "center";
					newText.m_target = this['sub_'+live_sub_preset.subheader_names[x]];
					newText.hitArea = this['sub_'+live_sub_preset.subheader_names[x]];
					newText.mouseEnabled = false;
					this.liveGames_subheader.addChild(newText);
				}

			}

			//reel games subheader
			let reel_sub_preset = {
				font : "bold 20px LatoBold",
				subheader_color : "#f57c00",
				subheader_active_color : "#d06900",
				subheader_text : [window.language.lobby.allgamescaps, window.language.lobby.kagamingreelcaps, window.language.lobby.betsoftreelcaps],
				subheader_names : ["allgames", "kagaming", "betsoft"],
				width : [190, 220, 220],
				header_height : 68
			}

			this.reelGames_subheader = new createjs.Container();
			this.reelGames_subheader.set({y : 96.5, visible: false});
			this.stage.addChild(this.reelGames_subheader);

			var sub_header_bg = new createjs.Shape();
			sub_header_bg.graphics.beginFill(reel_sub_preset.subheader_color).drawRect(-50,0, 1500, reel_sub_preset.header_height);
			sub_header_bg.setBounds(-50,0, 1500, 68);
			this.reelGames_subheader.addChild(sub_header_bg);

			for(var x = 0; x < reel_sub_preset.subheader_names.length; x++) {
				this['sub_'+reel_sub_preset.subheader_names[x]] =  new createjs.Shape();
				this['sub_'+reel_sub_preset.subheader_names[x]].name = reel_sub_preset.subheader_names[x];
				this['sub_'+reel_sub_preset.subheader_names[x]].graphics.beginFill(reel_sub_preset.subheader_color).drawRect(0,0,reel_sub_preset.width[x],reel_sub_preset.header_height);
				this['sub_'+reel_sub_preset.subheader_names[x]].setBounds(0,0,reel_sub_preset.width[x],reel_sub_preset.header_height);
				this['sub_'+reel_sub_preset.subheader_names[x]].x = x > 0 ? this['sub_'+reel_sub_preset.subheader_names[x-1]].x + this['sub_'+reel_sub_preset.subheader_names[x-1]].getBounds().width  : 30;
				this.reelGames_subheader.addChild(this['sub_'+reel_sub_preset.subheader_names[x]]);

				this['sub_'+reel_sub_preset.subheader_names[x]].active = (e) => {
					e.graphics.clear().beginFill("#d06900").drawRect(0,0,e.getBounds().width,e.getBounds().height);
					$('.announcement').removeClass("active");
				}
				this['sub_'+reel_sub_preset.subheader_names[x]].normal = (e) => {
					e.graphics.clear().beginFill('#f57c00').drawRect(0,0,e.getBounds().width,e.getBounds().height);
				}

				this['sub_'+reel_sub_preset.subheader_names[x]].text = new createjs.Text(reel_sub_preset.subheader_text[x], reel_sub_preset.font, "#fff");
				this['sub_'+reel_sub_preset.subheader_names[x]].text.name = reel_sub_preset.subheader_names[x];
				this['sub_'+reel_sub_preset.subheader_names[x]].text.set({textAlign : 'center', x : this['sub_'+reel_sub_preset.subheader_names[x]].x + (this['sub_'+reel_sub_preset.subheader_names[x]].getBounds().width/2) , textBaseline : 'middle', y : (68/2)})
				this.reelGames_subheader.addChild(this['sub_'+reel_sub_preset.subheader_names[x]].text);

			}

			this.sub_betsoft.soon = {
				"bg": new createjs.Shape(),
				"text": new createjs.Text("SOON!", "italic 16px TimesNewRoman", "#fff")
			}

			this.sub_betsoft.soon.bg.graphics.beginFill("#cf2f1f").drawRect(this.sub_betsoft.soon.text.getBounds().width, this.sub_betsoft.soon.text.lineHeight, 55, 20);
			this.sub_betsoft.soon.bg.x = this.sub_betsoft.text.x - 45 - 15;
			this.sub_betsoft.soon.bg.y = this.sub_betsoft.text.y + 10;
			this.sub_betsoft.soon.text.textAlign = "center";
			this.sub_betsoft.soon.text.textBaseline = "middle";
			this.sub_betsoft.soon.text.x = this.sub_betsoft.soon.bg.x + 75;
			this.sub_betsoft.soon.text.y = this.sub_betsoft.soon.bg.y + 10;
			this.reelGames_subheader.addChild(this.sub_betsoft.soon.bg, this.sub_betsoft.soon.text)


			this.sub_kagaming.new = {
				"bg": new createjs.Shape(),
				"text": new createjs.Text("NEW!", "italic 16px TimesNewRoman", "#fff")
			}
			this.sub_kagaming.new.bg.graphics.beginFill("#cf2f1f").drawRect(this.sub_kagaming.new.text.getBounds().width, this.sub_kagaming.new.text.lineHeight, 55, 20);
			this.sub_kagaming.new.bg.x = this.sub_kagaming.text.x - 45 + 10;
			this.sub_kagaming.new.bg.y = this.sub_kagaming.text.y + 10;
			this.sub_kagaming.new.text.textAlign = "center";
			this.sub_kagaming.new.text.textBaseline = "middle";
			this.sub_kagaming.new.text.x = this.sub_kagaming.new.bg.x + 68;
			this.sub_kagaming.new.text.y = this.sub_kagaming.new.bg.y + 10;
			this.reelGames_subheader.addChild(this.sub_kagaming.new.bg, this.sub_kagaming.new.text)

		}, // end of main

		updateMoney () {

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
			this.user_money = (window.casino == 'SS') ? parseFloat(this.user_money).toFixed(2) : parseInt(this.user_money);

			let user_money_text = new createjs.Text(currency +''+ numberWithCommas(this.user_money),"34px BebasNeue, Helvetica","#ede080");
			user_money_text.x = this.user_name_label.x;
			user_money_text.y = this.user_name_label.y + 26;

			user_money_text.bounds = user_money_text.getBounds();
			user_money_text.twin = user_money_text.clone();

			// === long string marquee
			if(this.user_money.toString().replace(/[^A-Z0-9]/ig, "").length > 9) {
				let marquee_con = new createjs.Container();
				marquee_con.mask = new createjs.Shape();
				marquee_con.mask.graphics.beginFill("#fff").drawRect(6, 0, 132, user_money_text.bounds.height + 20);
				marquee_con.mask.x = user_money_text.x;
				marquee_con.mask.y = user_money_text.y;

				user_money_text.twin.x = user_money_text.x  + user_money_text.bounds.width + 60;
				user_money_text.twin.y = user_money_text.y;
				marquee_con.addChild(user_money_text, user_money_text.twin);

				if(this.user_name_label.bounds.width > 126) {
				  let greater = (user_money_text.bounds.width > this.user_name_label.bounds.width) ? user_money_text.bounds.width : this.user_name_label.bounds.width;
				  let farther = (user_money_text.bounds.width > this.user_name_label.bounds.width) ? user_money_text.twin.x : this.user_name_label.twin.x;
				  this.user_name_label.twin.x = farther;
					user_money_text.twin.x = farther;
				  marquee(this.user_name_label, greater + 60, 4000);
				  marquee(this.user_name_label.twin, greater + 60, 4000);
				  marquee(user_money_text, greater + 60, 4000);
				  marquee(user_money_text.twin, greater + 60, 4000);
				}
				else {
				  marquee(user_money_text, user_money_text.bounds.width + 60, 4000);
				  marquee(user_money_text.twin, user_money_text.bounds.width + 60, 4000);
				}

			  this.userMoneyContainer.addChild(marquee_con);

			} else { // if not long name marquee
			  this.userMoneyContainer.addChild(user_money_text);
			}
		},

		normalMainHead() {
			this.live_games_header.normal(this.live_games_header);
			this.live_games_header.clicked = false;
			this.themed_games_header.normal(this.themed_games_header);
			this.themed_games_header.clicked = false;
			this.reel_games_header.normal(this.reel_games_header);
			this.reel_games_header.clicked = false;

			var subheader_names = ["baccarat", "supersix", "bonusbaccarat", "poker", "sicbo", "dragonTiger", "allgames", "kagaming", "betsoft"];
			subheader_names.forEach((e) => {
				this['sub_'+e].normal(this['sub_'+e])
			})
		},
		normalSubHead () {
			this.bet_history_thumbnail.normal();
			this.bet_history_thumbnail.clicked = false;
			this.transfer_history_thumbnail.normal();
			this.transfer_history_thumbnail.clicked = false;
			this.howtoplay_thumbnail.normal();
			this.howtoplay_thumbnail.clicked = false;
			// this.settings_thumbnail.normal();
			// this.settings_thumbnail.clicked = false;
		}
}

export default {
	component_header
}
