import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';
import rmformat from '../factories/formatter';
import sboard from '../factories/scoreboard_draw';

let drawSboard  = sboard();
let formatData = rmformat();

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		ads : [],
		circle_indicator : [],
		is_hover : true,
		activeBanner : 0,
		main() {

			hotCanvas = new createjs.Stage("hot");
			this.container = new createjs.Container();
			hotCanvas.addChild(this.container);
			hotCanvas.enableMouseOver(10);

			this.createMain();

			switch(window.language.locale) {
				case "kr":
				$(".ico-lang.ico-lang--kr").addClass("active")
				break;
				case "en":
				$(".ico-lang.ico-lang--en").addClass("active")
				break;
				case "jp":
				$(".ico-lang.ico-lang--jp").addClass("active")
				break;
				case "zh":
				$(".ico-lang.ico-lang--zh").addClass("active")
				break;
			}
		},
		createMain () {
			// === header slider1
			let header_mask = new createjs.Shape();
			// header_mask.graphics.beginFill("#191919").drawRect(0,0,1255,246);
			header_mask.graphics.beginFill("#191919").drawRect(0,0,1248,241);
			header_mask.x = 56;
			header_mask.y = 33;
			// header_mask.y = 30;
			this.container.addChild(header_mask);

			let image_arr = ["nihtan_banner", "red-white_banner", "poker-bonus_banner", "dragon-bonus_banner", "super-six_banner", "spin-n-win_banner","dragon-tiger_banner","reel-games_banner"]

			let banner_data = [
				{
					banner_image : "nihtan_banner",
					gameName : "nihtan-banner",
					icon : "",
					src : "/img/banner/chinese-newyear-theme/lobby/lobby_bg.png",
				},
				{
					banner_image : "poker-bonus_banner",
					gameName : "poker-bonus",
					icon : "",
					src : "/img/banner/chinese-newyear-theme/lobby/lobby_bg.png",
				},
				{
					banner_image : "mahjong_banner",
					gameName : "mahjong",
					icon : "",
					src : "/img/banner/chinese-newyear-theme/lobby/lobby_bg.png",
				},
				{
					banner_image : "dragon-bonus_banner",
					gameName : "dragon-bonus",
					icon : "",
					src : "/img/banner/chinese-newyear-theme/lobby/lobby_bg.png",
				},
				{
					banner_image : "super-six_banner",
					gameName : "super-six",
					icon : "",
					src : "/img/banner/chinese-newyear-theme/lobby/lobby_bg.png",

				},
				{
					banner_image : "roulette_banner",
					gameName : "roulette",
					icon : "",
					src : "/img/banner/chinese-newyear-theme/lobby/lobby_bg.png"
				},
				{
					banner_image : "red-white_banner",
					gameName : "redwhite",
					icon : "",
					src : "/img/banner/chinese-newyear-theme/lobby/lobby_bg.png"
				},
				// {
				// 	banner_image : "dragon-tiger_banner",
				// 	gameName : "dragon-tiger",
				// 	icon : "",
				// 	src : "/img/banner/regular-theme/lobby/dragon-tiger_banner.png",
        //
				// },
				{
					banner_image : "reel-games_banner",
					gameName : "reel-games",
					icon : "",
					src : "/img/banner/chinese-newyear-theme/lobby/lobby_bg.png",

				}
			]

			this.createAds(banner_data);

			this.hot_games_container = new createjs.Container();
			this.addChild(this.hot_games_container);
			this.hot_games_container.y = 340;

			this.hot_game = [];

			// let hot_live_tables_label = new createjs.Text(window.language.lobby.hotlivecaps,"bold 25px arvoBold","#e9ac4a");
			// hot_live_tables_label.x = 56;
			// hot_live_tables_label.y = 280;
			// this.addChild(hot_live_tables_label);
      //
			// if(window.language.locale == "zh") {
			// 	hot_live_tables_label.font = "bold 34px arvoBold";
			// 	hot_live_tables_label.y = 270;
			// }

			// CHINESE NEW YEAR

			let hot_live_tables_label = new createjs.Text(window.language.lobby.hotlivecaps,"bold 20px arvoBold","#ffb849");

			hot_live_tables_label.x = 95;
			hot_live_tables_label.y = 312;

			let hot_live_tables_width =( hot_live_tables_label.getBounds().width) + 80;

			let hot_live_games_box = new createjs.Shape();
			hot_live_games_box.graphics.setStrokeStyle(2).beginStroke("#d89e45").beginLinearGradientFill(['#cf0000', '#9b0000', '#710000'], [0, 0.5, 1], 0, 0, 273, 0).drawRoundRect(0, 0, hot_live_tables_width , 48, 7);
			hot_live_games_box.x = 56;
			hot_live_games_box.y = 300;

			let hot_live_games_border1 = new createjs.Shape();
			hot_live_games_border1.graphics.setStrokeStyle(1).beginStroke("#d89e45").drawRect(0, 0, (hot_live_tables_width - 18 ) , 32);
			hot_live_games_border1.x = hot_live_games_box.x + 9;
			hot_live_games_border1.y = hot_live_games_box.y + 8;

			let hot_live_games_border2 = new createjs.Shape();
			hot_live_games_border2.graphics.beginStroke("#d89e45")
			.moveTo(hot_live_games_border1.x + 4, hot_live_games_border1.y - 3)
			.lineTo(hot_live_tables_width + 44, hot_live_games_border1.y - 3);

			let hot_live_games_border3 = new createjs.Shape();
			hot_live_games_border3.graphics.beginStroke("#d89e45")
			.moveTo(hot_live_games_border1.x + 4, hot_live_games_border1.y + 35)
			.lineTo(hot_live_tables_width + 44, hot_live_games_border1.y + 35);

			let hot_live_games_bleft = new createjs.Bitmap("/img/seasonal_theme/chinese_newyear_theme/border.png");
			hot_live_games_bleft.x = hot_live_games_box.x + 5;
			hot_live_games_bleft.y = hot_live_games_box.y + 5;

			let hot_live_games_bright = new createjs.Bitmap("/img/seasonal_theme/chinese_newyear_theme/border.png");
			hot_live_games_bright.skewX = hot_live_games_bright.skewY = 180;
			hot_live_games_bright.x = hot_live_tables_width + 50;
			hot_live_games_bright.y = hot_live_games_box.y + 44;

			this.container.addChild(hot_live_games_box);
			this.container.addChild(hot_live_games_border1, hot_live_games_border2,hot_live_games_border3, hot_live_games_bleft, hot_live_games_bright);
			this.container.addChild(hot_live_tables_label);

			// === Notice
			this.announcementCon  = new createjs.Container();
			this.announcementCon.x = 0;
			this.announcementCon.y = 950;
			this.announcementCon.visible = false;
			this.container.addChild(this.announcementCon);
			// this.addChild(this.announcementCon);

			if (window.all_tables.length) {
				if (window.all_tables[0].mainNotice) {
					if (parseInt(window.all_tables[0].mainNotice.status)) {
						this.setAnnouncement(window.all_tables[0].mainNotice)
					}
				}
			}


			this.resize()
			window.addEventListener("resize", function() {
				this.resize()
				hotCanvas.update()
			}.bind(this));

      // COUNTDOWN
      this.countDownCon = new createjs.Container();
      this.container.addChild(this.countDownCon);
      this.countDownCon.x = 770;
      this.countDownCon.y = 95;

			let timeleft = new createjs.Text(window.language.lobby.timeleft," bold 18px LatoBold", "#fff9d5");
      timeleft.x = 85;
      timeleft.y = 85;

			let days_con =  new createjs.Shape();
      days_con.graphics.beginFill('#ad211a').drawRoundRectComplex( 0, 0, 50, 50, 8, 8, 0, 0);
			let days_text_con =  new createjs.Shape();
      days_text_con.graphics.beginFill('#c3271f').drawRoundRectComplex( 0, 50, 50, 30, 0, 0, 8, 8);

      this.days = new createjs.Text("00"," 35px BebasNeue", "#f2f018");
      this.days.x = 11;
      this.days.y = 7;

      let days_text = new createjs.Text(window.language.lobby.days," 11px LatoRegular", "#fff9d5");
      days_text.x = this.days.x;
      days_text.y = this.days.y + 50;

      let colon1 = new createjs.Text(":"," 35px BebasNeue", "#fff9d5");
      colon1.x = this.days.x + 44;
      colon1.y = days_con.y + 4;

			let hours_con =  new createjs.Shape();
      hours_con.graphics.beginFill('#ad211a').drawRoundRectComplex( 0, 0, 50, 50, 8, 8, 0, 0);
			hours_con.x = colon1.x + 15;

			let hours_text_con =  new createjs.Shape();
      hours_text_con.graphics.beginFill('#c3271f').drawRoundRectComplex( 0, 50, 50, 30, 0, 0, 8, 8);
			hours_text_con.x = hours_con.x;

      this.hours = new createjs.Text("00"," 35px BebasNeue", "#f2f018");
      this.hours.x = hours_con.x + 11;
      this.hours.y =this.days.y;

      let hours_text = new createjs.Text(window.language.lobby.hours,"11px LatoRegular", "#fff9d5");
      hours_text.x = this.hours.x - 5;
      hours_text.y = days_text.y;

      let colon2 = new createjs.Text(":"," 35px BebasNeue", "#fff9d5");
      colon2.x = this.hours.x + 45;
      colon2.y = colon1.y;

			let minutes_con =  new createjs.Shape();
      minutes_con.graphics.beginFill('#ad211a').drawRoundRectComplex( 0, 0, 50, 50, 8, 8, 0, 0);
			minutes_con.x = colon2.x + 16;

			let minutes_text_con =  new createjs.Shape();
      minutes_text_con.graphics.beginFill('#c3271f').drawRoundRectComplex( 0, 50, 50, 30, 0, 0, 8, 8);
			minutes_text_con.x = minutes_con.x;

      this.minutes = new createjs.Text("00"," 35px BebasNeue", "#f2f018");
      this.minutes.x = minutes_con.x + 11;
      this.minutes.y =this.days.y;

      let minutes_text = new createjs.Text(window.language.lobby.mins,"11px LatoRegular", "#fff9d5");
      minutes_text.x = this.minutes.x;
      minutes_text.y = days_text.y ;

      let colon3 = new createjs.Text(":"," 35px BebasNeue", "#fff9d5");
      colon3.x = this.minutes.x + 45;
      colon3.y = colon1.y;

			let seconds_con =  new createjs.Shape();
      seconds_con.graphics.beginFill('#ad211a').drawRoundRectComplex( 0, 0, 50, 50, 8, 8, 0, 0);
			seconds_con.x = colon3.x + 15;

			let seconds_text_con =  new createjs.Shape();
      seconds_text_con.graphics.beginFill('#c3271f').drawRoundRectComplex( 0, 50, 50, 30, 0, 0, 8, 8);
			seconds_text_con.x = seconds_con.x;

      this.seconds = new createjs.Text("00"," 35px BebasNeue", "#f2f018");
      this.seconds.x = seconds_con.x + 11;
      this.seconds.y = this.days.y;

      let seconds_text = new createjs.Text(window.language.lobby.secs,"11px LatoRegular", "#fff9d5");
      seconds_text.x = this.seconds.x + 5;
      seconds_text.y = days_text.y;

			if(window.language.locale == "zh") {
				timeleft.font = "20px latoblack";
				timeleft.x = 100;

				days_text.font = "16px latoblack";
				days_text.x = this.days.x + 6;
				days_text.y = this.days.y + 47;

				hours_text.font = "16px latoblack";
				hours_text.x = this.hours.x - 2;
				hours_text.y = days_text.y ;

				minutes_text.font = "16px latoblack";
				minutes_text.y = days_text.y ;

				seconds_text.font = "16px latoblack";
				seconds_text.x = this.seconds.x + 8;
				seconds_text.y = days_text.y ;
			}
			else if(window.language.locale == "jp") {
				timeleft.font = "20px latoblack";
				timeleft.x = 95;

				days_text.font = "16px latoblack";
				days_text.x = this.days.x + 6;
				days_text.y = this.days.y + 47;

				hours_text.font = "16px latoblack";
				hours_text.x = this.hours.x + 5;
				hours_text.y = days_text.y ;

				minutes_text.font = "16px latoblack";
				minutes_text.x = this.minutes.x + 5;
				minutes_text.y = days_text.y ;

				seconds_text.font = "16px latoblack";
				seconds_text.x = this.seconds.x + 8;
				seconds_text.y = days_text.y ;
			}

			else if(window.language.locale == "kr") {
				timeleft.font = "20px latoblack";
				timeleft.x = 95;

				days_text.font = "16px latoblack";
				days_text.x = this.days.x + 6;
				days_text.y = this.days.y + 47;

				hours_text.font = "16px latoblack";
				hours_text.x = this.hours.x - 1;
				hours_text.y = days_text.y ;

				minutes_text.font = "16px latoblack";
				minutes_text.x = this.minutes.x + 5;
				minutes_text.y = days_text.y ;

				seconds_text.font = "16px latoblack";
				seconds_text.x = this.seconds.x + 8;
				seconds_text.y = days_text.y ;
			}

      this.countDownCon.addChild(
				timeleft,
				days_con, days_text_con, this.days, days_text,
				hours_con, hours_text_con, colon1, this.hours, hours_text,
				minutes_con, minutes_text_con, colon2, this.minutes,minutes_text,
				seconds_con, seconds_text_con, colon3, this.seconds, seconds_text
			);

      this.setCountDown();
		},

		setAnnouncement(data) {
			this.announcementCon.removeAllChildren();

			if (parseInt(data.status)) {
				this.announcementCon.visible = true;
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

			let announcementIcon = new createjs.Bitmap(this.context.getResources('notice_ico'));
			announcementIcon.x = announcementIconBg.x + 13;
			announcementIcon.y = announcementIconBg.y + 8;
			announcementIcon.scaleX = announcementIcon.scaleY = 0.6;
			this.announcementCon.addChild(announcementIcon);

			let announcementTextBg = new createjs.Shape();
			announcementTextBg.graphics.beginLinearGradientFill(['#59090a', 'rgba(89, 9, 10, 0.1)'], [0,1],0,0,1300,0).drawRect(0,0,1300,56);
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
			marquee_con.mask.graphics.beginFill("#fff").drawRect(0, 0, 1270, textbounds.height + 5);
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
				}, 15000)
			}

			marquee(announcementText);
			marquee(twin);
			this.announcementCon.addChild(marquee_con);
		},
		createAds (data) {
			let header_mask = new createjs.Shape();
			header_mask.graphics.beginFill("red").drawRect(0,0,1248,241);
			header_mask.x = 56;
			header_mask.y = 33;
			// header_mask.y = 27;

			this.indi_ads = []

			for(var x = 0;x < data.length; x++) {
				this.indi_ads[x] = new createjs.Container();
				this.indi_ads[x].mask = header_mask;

				this.ads[x] = new createjs.Bitmap(data[x].src);
				this.ads[x].x = 54;
				this.ads[x].y = 30;
				this.indi_ads[x].addChild(this.ads[x]);
				this.ads[x].scaleX = this.ads[x].scaleY = 1.2;

				if(data[x].gameName == "redwhite") {
					this.ads[x].redwhite_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/lobby/red-white.png");

					if(window.language.locale == "zh") {
						this.ads[x].redwhite_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/lobby/red-white-zh.png");
					}

					this.ads[x].redwhite_img.x = 35;
					this.ads[x].redwhite_img.y = 30;
					this.ads[x].redwhite_img.scaleX = this.ads[x].redwhite_img.scaleY = 1.02;
					this.setFireworks(x);
					this.setLanternBanner(x);
					this.indi_ads[x].addChild(this.ads[x].redwhite_img);
				}  //END REDWHITE

				else if(data[x].gameName == "dragon-tiger") {
					this.ads[x].dragontiger_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/lobby/dragon-tiger.png");

					if(window.language.locale == "zh") {
						this.ads[x].dragontiger_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/lobby/dragon-tiger-zh.png");
					}
					this.ads[x].dragontiger_img.x = 35;
					this.ads[x].dragontiger_img.y = 30;
					this.ads[x].dragontiger_img.scaleX = this.ads[x].dragontiger_img.scaleY = 1.02;
					this.setFireworks(x);
					this.setLanternBanner(x);
					this.indi_ads[x].addChild(this.ads[x].dragontiger_img);
				}  // END gradon-tiger

				else if(data[x].gameName == "reel-games") {
					this.ads[x].reelgames_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/lobby/reel-games.png");

					if(window.language.locale == "zh") {
						this.ads[x].reelgames_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/lobby/reel-games-zh.png");
					}

					this.ads[x].reelgames_img.x = 35;
					this.ads[x].reelgames_img.y = 30;
					this.ads[x].reelgames_img.scaleX = this.ads[x].reelgames_img.scaleY = 1.02;
					this.setFireworks(x);
					this.setLanternBanner(x);
					this.indi_ads[x].addChild(this.ads[x].reelgames_img);
				} //END REEL GAMES

				else if(data[x].gameName == "spinnwin") {

				} // END spinnwin banner

				else if (data[x].gameName == "dragon-bonus") {
					this.ads[x].dragonbonus_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/lobby/dragon-bonus.png");
					this.ads[x].dragonbonus_img.x = 35;
					this.ads[x].dragonbonus_img.y = 30;
					this.ads[x].dragonbonus_img.scaleX = this.ads[x].dragonbonus_img.scaleY = 1.02;
			    // Draw fireworks

					this.setFireworks(x);
					this.setLanternBanner(x);
					this.indi_ads[x].addChild(this.ads[x].dragonbonus_img);

				} //END nihtan banner

				else if (data[x].gameName == "super-six") {
					this.ads[x].supersix_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/lobby/super-six.png");
					this.ads[x].supersix_img.x = 60;
					this.ads[x].supersix_img.y = 30;
					this.ads[x].supersix_img.scaleX = this.ads[x].supersix_img.scaleY = 1.02;
					// Draw fireworks
					this.setFireworks(x);
					this.setLanternBanner(x);
					this.indi_ads[x].addChild(this.ads[x].supersix_img);
				} //END nihtan banner

				else if (data[x].gameName == "poker-bonus") {
					this.ads[x].pokerbonus_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/lobby/poker-bonus.png");
					this.ads[x].pokerbonus_img.x = 35;
					this.ads[x].pokerbonus_img.y = 30;
					this.ads[x].pokerbonus_img.scaleX = this.ads[x].pokerbonus_img.scaleY = 1.02;
			    // Draw fireworks
					this.setFireworks(x);
					this.setLanternBanner(x);
					this.indi_ads[x].addChild(this.ads[x].pokerbonus_img);
				} //END nihtan banner

				else if (data[x].gameName == "nihtan-banner") {
					if(window.language.locale == "zh") {
						this.ads[x].chinesenewyear_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/lobby/chinese-newyear-zh.png");
						this.ads[x].chinesenewyear_img.x = 50;
						this.ads[x].chinesenewyear_img.y = 30;
					} else {
						this.ads[x].chinesenewyear_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/lobby/chinese-newyear.png");
						this.ads[x].chinesenewyear_img.x = 65;
						this.ads[x].chinesenewyear_img.y = 30;
					}

					this.setFireworks(x);
					this.setLanternNihtan(x);
					this.indi_ads[x].addChild( this.ads[x].chinesenewyear_img);
				} //END nihtan banner

				else if (data[x].gameName == "roulette") {
					this.ads[x].pokerbonus_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/lobby/roulette.png");
					if(window.language.locale == "zh") {
						this.ads[x].pokerbonus_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/lobby/roulette-zh.png");
					}
					this.ads[x].pokerbonus_img.x = 35;
					this.ads[x].pokerbonus_img.y = 30;
					this.ads[x].pokerbonus_img.scaleX = this.ads[x].pokerbonus_img.scaleY = 1.02;
			    // Draw fireworks
					this.setFireworks(x);
					this.setLanternBanner(x);
					this.indi_ads[x].addChild(this.ads[x].pokerbonus_img);
				} //END nihtan banner

				else if (data[x].gameName == "mahjong") {
					this.ads[x].paigow_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/lobby/pai-gow.png");
					if(window.language.locale == "zh") {
						this.ads[x].paigow_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/lobby/pai-gow-zh.png");
					}
					this.ads[x].paigow_img.x = 35;
					this.ads[x].paigow_img.y = 30;
					this.ads[x].paigow_img.scaleX = this.ads[x].paigow_img.scaleY = 1.02;
			    // Draw fireworks
					this.setFireworks(x);
					this.setLanternBanner(x);
					this.indi_ads[x].addChild(this.ads[x].paigow_img);
				} //END mahjong_banner banner

				// === for play bittons
				if(data[x].gameName == "dragon-tiger") { // || data[x].gameName == "reel-games"

					this.ads[x].enter_text = new createjs.Text(window.language.lobby.playnow,"16px latoblack", "#543d0b");
					this.ads[x].enter_text.shadow = new createjs.Shadow("#fbf956",0,1.5,0)
					this.ads[x].enter_text.textAlign = "center";
					this.ads[x].enter_text.textBaseline = "middle";
					this.ads[x].enter_text.y = 195 + (30/2);
					this.ads[x].enter_text.visible = false;

					if(window.language.locale == "zh") {
						this.ads[x].enter_text.x = 960 + (180/2) - 80;
					} else {
						this.ads[x].enter_text.x = 960 + (180/2) - 30;
					}

					if(window.language.locale == "zh") { this.ads[x].enter_text.font = "23px latoblack"; }

					this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);
				} // END DRAGON TIGER BUTTONS
				else if (data[x].gameName == "dragon-bonus") {
					this.ads[x].enter_button = new createjs.Shape();
					this.ads[x].enter_button.graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,200,37,20);
					this.ads[x].enter_button.cursor = 'pointer';
					this.ads[x].enter_button.viewPage = 'sub_bonus';
					this.ads[x].enter_button.x = 300;
					this.ads[x].enter_button.y = 180;

					this.ads[x].enter_text = new createjs.Text(window.language.lobby.playnow,"22px latoblack", "#462f04");
					this.ads[x].enter_text.shadow = new createjs.Shadow("#fbf956",0,1.5,0)
					this.ads[x].enter_text.textAlign = "center";
					this.ads[x].enter_text.textBaseline = "middle";
					this.ads[x].enter_text.hitArea = this.ads[x].enter_button;

					if(window.language.locale == "zh") {
						this.ads[x].enter_text.font = "23px latoblack";
						this.ads[x].enter_text.x = this.ads[x].enter_button.x + (200/2) + 5;
					} else {
						this.ads[x].enter_text.x = this.ads[x].enter_button.x + (200/2) + 5;
					}

					this.ads[x].enter_text.y = this.ads[x].enter_button.y + (22/2) + 5;

					this.ads[x].enter_button.on("click",(e)=>{
						$('.sidebar').css({'width' : '231px'});
						$('.sidebar--lobby').hide();
						$('.sidebar--game, .header-subnav:not(.reelgames)').css({'display': 'block'});
						this.context.toggleView(e.target.viewPage);
					});

					this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);
				} // END DRAGON TIGER BONUS BUTTONS
				else if (data[x].gameName == "super-six") {
					this.ads[x].enter_button = new createjs.Shape();
					this.ads[x].enter_button.graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,200,37,20);
					this.ads[x].enter_button.y = 175;
					this.ads[x].enter_button.cursor = 'pointer';
					this.ads[x].enter_button.viewPage = 'sub_supersix';
					this.ads[x].enter_button.x = 300;

					this.ads[x].enter_text = new createjs.Text(window.language.lobby.playnow,"22px latoblack", "#462f04");
					this.ads[x].enter_text.shadow = new createjs.Shadow("#fbf956",0,1.5,0)
					this.ads[x].enter_text.textAlign = "cenhter";
					this.ads[x].enter_text.textBaseline = "middle";
					this.ads[x].enter_text.hitArea = this.ads[x].enter_button;
					this.ads[x].enter_text.y = this.ads[x].enter_button.y  + (22/2) + 5;

					if(window.language.locale == "zh") {
						this.ads[x].enter_text.font = "25px latoblack";
						this.ads[x].enter_text.x = this.ads[x].enter_button.x + (200/2) - 50;
					} else {
						this.ads[x].enter_text.x = this.ads[x].enter_button.x + (200/2) - 45;
					}

					this.ads[x].enter_button.on("click",(e)=>{
						$('#supersix').addClass("active");
						$('.sidebar').css({'width' : '231px'});
						$('.sidebar--lobby').hide();
						$('.sidebar--game, .header-subnav:not(.reelgames)').css({'display': 'block'});

						this.context.toggleView(e.target.viewPage);
					});

					this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);
				} // END DRAGON TIGER BONUS BUTTONS
				else if (data[x].gameName == "poker-bonus") {
					this.ads[x].enter_button = new createjs.Shape();
					this.ads[x].enter_button.graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,200,37,20);
					this.ads[x].enter_button.cursor = 'pointer';
					this.ads[x].enter_button.viewPage = 'sub_poker';

					this.ads[x].enter_text = new createjs.Text(window.language.lobby.playnow,"22px latoblack", "#462f04");
					this.ads[x].enter_text.shadow = new createjs.Shadow("#fbf956",0,1.5,0)
					this.ads[x].enter_text.textAlign = "center";
					this.ads[x].enter_text.textBaseline = "middle";
					this.ads[x].enter_text.hitArea = this.ads[x].enter_button;

					this.ads[x].enter_button.x = 295;
					this.ads[x].enter_text.x = this.ads[x].enter_button.x + (200/2) + 5;
					this.ads[x].enter_button.y = 200;

					this.ads[x].enter_text.y = this.ads[x].enter_button.y + (22/2) + 5;

					this.ads[x].enter_button.on("click",(e)=>{
						$('.sidebar').css({'width' : '231px'});
						$('.sidebar--lobby').hide();
						$('.sidebar--game, .header-subnav:not(.reelgames)').css({'display': 'block'});
						this.context.toggleView(e.target.viewPage);
					});

					this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);
				} // END DRAGON TIGER BONUS BUTTONS

				this.indi_ads[x].on("click", (e) =>{
					if(e.target.alpha == 0) e.stopPropagation();
				});

				this.container.addChild(this.indi_ads[x]);
				// this.addChild(this.indi_ads[x]);
				// this.ads[x].y = -180;

				this.container.addChild(this.indi_ads[x]);
		} //END FORLOOP

		this.ads_container = new createjs.Container();
		this.container.addChild(this.ads_container);
		this.ads_container.mask = header_mask;

		for(var x = 0;x < data.length; x++) {
			this.circle_indicator[x] = new createjs.Shape();
			this.circle_indicator[x].graphics.beginFill("#fff").drawCircle(0,0,6);
			this.circle_indicator[x].x = (x*28) + 580
			// this.circle_indicator[x].x = (x*28) + 630
			this.circle_indicator[x].y = 235
			this.circle_indicator[x].alpha = 0.5;
			this.circle_indicator[x].active = false;
			this.circle_indicator[x].cursor = 'pointer';
			this.ads_container.addChild(this.circle_indicator[x]);
		}

		this.playAds();
	},

	setFireworks(index) {
		this.fireworks_con = new createjs.Container();
		this.indi_ads[index].addChild(this.fireworks_con)
		// this.container.addChild(this.fireworks_con);
		this.fireworks_con.x = 56;
		this.fireworks_con.y = 33;

		this.banner_mask = new createjs.Shape();
		this.banner_mask.graphics.beginFill("red").drawRect(0,0,1248,244);
		this.banner_mask.x = 0;
		this.banner_mask.y = 0;

		let fireworks01 =  new createjs.Bitmap("/img/seasonal_theme/chinese_newyear_theme/fw_green.png");
		fireworks01.alpha = 0;
		fireworks01.scaleX = fireworks01.scaleY = 0;
		fireworks01.regX = 150 / 2;
		fireworks01.regY = 150 / 2;
		fireworks01.mask = this.banner_mask;

		createjs.Tween.get(fireworks01, {loop:true}).to({
		    scaleX: 0.8,
		    scaleY: 0.8,
		    alpha: 1,
		  }, 1500).to({
		    scaleX: 1,
		    scaleY: 1,
		    alpha: 0
		  }, 500).wait(1000);

		let fireworks02 =  new createjs.Bitmap("/img/seasonal_theme/chinese_newyear_theme/fw_blue.png");
		fireworks02.alpha = 0;
		fireworks02.scaleX = fireworks02.scaleY = 0;
		fireworks02.regX = 150 / 2;
		fireworks02.regY = 150 / 2;
		fireworks02.mask = this.banner_mask;

		createjs.Tween.get(fireworks02, {loop:true}).to({
		  scaleX: 0.8,
		  scaleY: 0.8,
		  alpha: 1,
		}, 1500).to({
		  scaleX: 1,
		  scaleY: 1,
		  alpha: 0
		}, 500).wait(1300);

		let fireworks03 =  new createjs.Bitmap("/img/seasonal_theme/chinese_newyear_theme/fw_yellow.png");
		fireworks03.alpha = 0;
		fireworks03.scaleX = fireworks03.scaleY = 0;
		fireworks03.regX = 150 / 2;
		fireworks03.regY = 150 / 2;
		fireworks03.mask = this.banner_mask;

		createjs.Tween.get(fireworks03, {loop:true}).to({
		  scaleX: 0.8,
		  scaleY: 0.8,
		  alpha: 1,
		}, 1500).to({
		  scaleX: 1,
		  scaleY: 1,
		  alpha: 0
		}, 500);

		this.fireworks_con.addChild(fireworks01, fireworks02, fireworks03);

		var firepos = setInterval( () => {
		  fireworks01.scaleX = fireworks01.scaleY = (Math.random() * 1 - 0.7) + 0.7;
		  fireworks01.x = (Math.floor(Math.random() * 1248) - 20).toFixed();
		  fireworks01.y = (Math.floor(Math.random() * 244) - 20).toFixed();

		  fireworks02.scaleX = fireworks02.scaleY = (Math.random() * 1 - 0.7) + 0.7;
		  fireworks02.x = (Math.floor(Math.random() * 1248) - 20).toFixed();
		  fireworks02.y = (Math.floor(Math.random() * 244) - 20).toFixed();

		  fireworks03.scaleX = fireworks03.scaleY = (Math.random() * 1 - 0.7) + 0.7;
		  fireworks03.x = (Math.floor(Math.random() * 1248) - 20).toFixed();
		  fireworks03.y = (Math.floor(Math.random() * 244) - 20).toFixed();
		}, 2000);

		this.fireworks_con.addChild(fireworks01, fireworks02, fireworks03);

		for(let  i=0; i<1; i++){
		  let dup_fireworks = fireworks01.clone();
		  dup_fireworks.alpha = 1;
		  dup_fireworks.scaleX = dup_fireworks.scaleY = 0;
		  dup_fireworks.regX = 150 / 2;
		  dup_fireworks.regY = 150 / 2;
		  createjs.Tween.get(dup_fireworks, {loop:true}).to({
		    scaleX: 0.8,
		    scaleY: 0.8,
		    alpha: 1,
		  }, 1500).to({
		    scaleX: 1,
		    scaleY: 1,
		    alpha: 0
		  }, 500).wait(1000);
		  dup_fireworks.mask = this.banner_mask;
		  dup_fireworks.scaleX = dup_fireworks.scaleY = (Math.random() * 1 - 0.7) + 0.7;
		  dup_fireworks.x =(Math.floor(Math.random() * 1248) - 20).toFixed();
		  dup_fireworks.y = (Math.floor(Math.random() * 244) - 20).toFixed();

		  let dup_fireworks02 = 	fireworks02.clone();
		  dup_fireworks02.alpha = 1;
		  dup_fireworks02.scaleX = dup_fireworks02.scaleY = 0;
		  dup_fireworks02.regX = 150 / 2;
		  dup_fireworks02.regY = 150 / 2;

		  createjs.Tween.get(dup_fireworks02, {loop:true}).to({
		    scaleX: 0.8,
		    scaleY: 0.8,
		    alpha: 1,
		  }, 1500).to({
		    scaleX: 1,
		    scaleY: 1,
		    alpha: 0
		  }, 500);
		  dup_fireworks02.mask = this.banner_mask;
		  dup_fireworks02.scaleX = dup_fireworks02.scaleY = (Math.random() * 1 - 0.7) + 0.7;
		  dup_fireworks02.x = (Math.floor(Math.random() * 1248) - 20).toFixed();
		  dup_fireworks02.y = (Math.floor(Math.random() * 244) - 20).toFixed();

		  let dup_fireworks03 = 	fireworks03.clone();
		  dup_fireworks03.alpha = 1;
		  dup_fireworks03.scaleX = dup_fireworks03.scaleY = 0;
		  dup_fireworks03.regX = 150 / 2;
		  dup_fireworks03.regY = 150 / 2;

		  createjs.Tween.get(dup_fireworks03, {loop:true}).to({
		    scaleX: 0.8,
		    scaleY: 0.8,
		    alpha: 1,
		  }, 1500).to({
		    scaleX: 1,
		    scaleY: 1,
		    alpha: 0
		  }, 500).wait(1500);
		  dup_fireworks03.mask = this.banner_mask;
		  dup_fireworks03.scaleX = dup_fireworks03.scaleY = (Math.random() * 1 - 0.7) + 0.7;
		  dup_fireworks03.x = (Math.floor(Math.random() * 1248) - 20).toFixed();
		  dup_fireworks03.y = (Math.floor(Math.random() * 244) - 20).toFixed();


		 this.fireworks_con.addChild( dup_fireworks, dup_fireworks02, dup_fireworks03);
		}
	},
	setLanternNihtan(index) {
		//DRAW LANTERN CONTAINER
		this.lantern_con = new createjs.Container();
		this.lantern_con.x = 56;
		this.lantern_con.y = 33;
		this.indi_ads[index].addChild(this.lantern_con)
		//DRAW LANTERN LEFT
		let lantern_01 = new createjs.SpriteSheet({
			images: ["/img/seasonal_theme/chinese_newyear_theme/lantern_sprite.png"],
			frames: {height: 161, width: 212},
			animations: {
				"lantern_01_animate" : {
					frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
					speed: 0.3
				}
			}
		});
		this.lantern_01_animation = new createjs.Sprite(lantern_01, "lantern_01_animate");
		this.lantern_01_animation.x = 30;
		this.lantern_01_animation.y = 50;
		this.lantern_con.addChild(this.lantern_01_animation);

		let lantern_02 = new createjs.SpriteSheet({
			images: ["/img/seasonal_theme/chinese_newyear_theme/lantern_sprite.png"],
			frames: {height: 161, width: 212},
			animations: {
				"lantern_02_animate" : {
					frames: [20, 21, 22, 23, 24, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
					speed: 0.3
				}
			}
		});

		this.lantern_02_animation = new createjs.Sprite(lantern_02, "lantern_02_animate");
		this.lantern_02_animation.scaleX = this.lantern_02_animation.scaleY = 0.8;
		this.lantern_02_animation.x = -40;
		this.lantern_02_animation.y = 80;
		this.lantern_con.addChild(this.lantern_02_animation);

		//DRAW LANTERN RIGHT

		let lantern_03 = new createjs.SpriteSheet({
			images: ["/img/seasonal_theme/chinese_newyear_theme/lantern_sprite.png"],
			frames: {height: 161, width: 212},
			animations: {
				"lantern_03_animate" : {
					frames: [22, 23, 24, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
					speed: 0.3
				}
			}
		});

		this.lantern_03_animation = new createjs.Sprite(lantern_03, "lantern_03_animate");
		this.lantern_03_animation.scaleX = this.lantern_03_animation.scaleY = 0.8;
		this.lantern_03_animation.x = 1035;
		this.lantern_03_animation.y = 80;
		this.lantern_con.addChild(this.lantern_03_animation);

		let lantern_04 = new createjs.SpriteSheet({
			images: ["/img/seasonal_theme/chinese_newyear_theme/lantern_sprite.png"],
			frames: {height: 161, width: 212},
			animations: {
				"lantern_04_animate" : {
					frames: [ 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 0, 1, 2, 3,],
					speed: 0.3
				}
			}
		});
		this.lantern_04_animation = new createjs.Sprite(lantern_04, "lantern_04_animate");
		this.lantern_04_animation.x = 905;
		this.lantern_04_animation.y = 90;
		this.lantern_con.addChild(this.lantern_04_animation);
	}, //END setLantern
	setLanternBanner(index) {
		this.lantern_banner_con = new createjs.Container();
		this.lantern_banner_con.x = 56;
		this.lantern_banner_con.y = 33;
		this.indi_ads[index].addChild(this.lantern_banner_con)
		let lb_03 = new createjs.SpriteSheet({
			images: ["/img/seasonal_theme/chinese_newyear_theme/lantern_sprite.png"],
			frames: {height: 161, width: 212},
			animations: {
				"lb_03_animate" : {
					frames: [22, 23, 24, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
					speed: 0.3
				}
			}
		});

		this.lb_03_animation = new createjs.Sprite(lb_03, "lb_03_animate");
		this.lb_03_animation.scaleX = this.lb_03_animation.scaleY = 1.2;
		this.lb_03_animation.x = 875;
		this.lb_03_animation.y = 30;
		this.lantern_banner_con.addChild(this.lb_03_animation);

		let lb_04 = new createjs.SpriteSheet({
			images: ["/img/seasonal_theme/chinese_newyear_theme/lantern_sprite.png"],
			frames: {height: 161, width: 212},
			animations: {
				"lb_04_animate" : {
					frames: [ 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 0, 1, 2, 3,],
					speed: 0.3
				}
			}
		});
		this.lb_04_animation = new createjs.Sprite(lb_04, "lb_04_animate");
		this.lb_04_animation.scaleX = this.lb_04_animation.scaleY = 0.8;
		this.lb_04_animation.x = 1030;
		this.lb_04_animation.y = 110;
		this.lantern_banner_con.addChild(this.lb_04_animation);
	}, //END setLantern
	playAds (position = 0) {
		if(!this.ads.length) return;

		this.circle_indicator[0].alpha = 1;
		for(var x = 0; x < this.ads.length; x++  ) {
			this.indi_ads[x].alpha = 0
			this.indi_ads[0].alpha = 1

			createjs.Tween.removeTweens(this.indi_ads[x]);
			createjs.Tween.removeTweens(this.circle_indicator[x]);
			this.circle_indicator[x].alpha = 0.5;

			createjs.Tween.get(this.indi_ads[x],{loop:true})
			.wait(4000*x)
			.to({
				alpha: 1
			},(500))
			.wait(4000)
			.to({
				alpha : (x == 0 ? 1 : 0)
			},(500)).wait(4000 * (6-x))
			.setPosition(position);

			this.circle_indicator[x].index = x;

			createjs.Tween.get(this.circle_indicator[x],{loop:true})
			.wait(4000*x)
			.call(function(i, self) {
				self.activeBanner = i
			}, [x, this])
			.to({
				alpha: 1
			},(500))
			.wait(4000)
			.to({
				alpha : 0.5
			},(500))
			.wait(4000* (6-x))
			.setPosition(position)

			this.circle_indicator[x].addEventListener("click", (e) => {
				if(this.activeBanner != e.target.index)
				{
					this.indi_ads[this.activeBanner].alpha = 0;
					this.playAds(e.target.index * 4000);
				}

			});

		} //end for

	},
	makeHotTables (data) {
		if(this.hot_game.length) {
			this.hot_game.forEach((e)=>{
				e.removeAllChildren();
			})
			this.hot_game = []
		}

		for(var x = 0; x < 4; x++) { //data.length
			this.hot_game[x] = new createjs.Container();
			this.hot_game[x].y = 365;
			// this.hot_game[x].y = 340;
			this.hot_game[x].type = "game_container";
			this.hot_game[x].is_hover = false;
			// this.addChild(this.hot_game[x])
			this.container.addChild(this.hot_game[x])
		}

		this.hot_games_container.removeAllChildren();

		this.tables = [];

		let game_name_bg = ["#00838f","#005145"];
		let text_color = "#edc54e";
		let mask_name = [];
		let mask = [];

		// Cover table
		this.coverTable = []
		let emptySlot = 4 - data.length;
		let leftPattern = [];
		let rightPattern = [];
		let nihtanLogo = [];
		let gameImg = [];
		let hotGames = ['baccarat', 'dragon-tiger', 'poker', 'sicbo']
		let imageArr = [];

		for (var i = 0; i < 4; i++) {
			if (data[i] !== undefined) {
				imageArr.push(data[i].gameName.toLowerCase() == 'dragon-tiger' ? 'rightside-dragontiger' : 'rightside-'+data[i].gameName.toLowerCase());

				for (var x = 0; x < hotGames.length; x++) {
					if (hotGames[x] == data[i].gameName.toLowerCase()) {
						hotGames.splice(x, 1);
					}
				}
			}
		}

		for (var i = 0; i < hotGames.length; i++) {
			imageArr.push(hotGames[i] == 'dragon-tiger' ? 'rightside-dragontiger' : 'rightside-'+hotGames[i]);
		}

		for(var x = 0; x < 4; x++) {
			this.tables[x] = new createjs.Shape();
			this.tables[x].graphics.beginFill("#fff").drawRect(0,180,608,100);

			this.tables[x].setBounds(0,0,608,280);
			this.tables[x].x = (x*(this.tables[x].getBounds().width+32)) + 57;

			if(x > 1) {
				this.tables[x].y = 310;
				this.tables[x].x -= 1282;
			}
			this.hot_game[x].addChild(this.tables[x]);
			this.hot_game[x].index = (x+1);

			// Call if there are empty spaces
			if (emptySlot) {
				if (x >= data.length) {
					this.tables[x].graphics.clear().beginFill("#262626").drawRect(0,0,610,285);

					leftPattern[x] = new createjs.Bitmap("/img/maintenance/s_pattern_left.png");
					leftPattern[x].x = this.tables[x].x;
					leftPattern[x].y = this.tables[x].y;
					leftPattern[x].alpha = 0.2;
					leftPattern[x].scaleX = leftPattern[x].scaleY = 0.5;
					this.hot_game[x].addChild(leftPattern[x]);

					rightPattern[x] = new createjs.Bitmap("/img/maintenance/s_pattern_right.png");
					rightPattern[x].x = this.tables[x].x + 466;
					rightPattern[x].y = this.tables[x].y + 150;
					rightPattern[x].alpha = 0.2;
					rightPattern[x].scaleX = rightPattern[x].scaleY = 0.6;
					this.hot_game[x].addChild(rightPattern[x]);

					gameImg[x] = new createjs.Bitmap("/img/howtoplay/lobby/"+imageArr[x]+'.png');
					gameImg[x].x = this.tables[x].x + 175;
					gameImg[x].y = this.tables[x].y - 20;
					gameImg[x].skewX = gameImg[x].skewY = 25;
					gameImg[x].scaleX = gameImg[x].scaleY = 0.5;
					this.hot_game[x].addChild(gameImg[x]);

					if (imageArr[x] == 'rightside-poker') {
						gameImg[x].y -= 10;
					}

					nihtanLogo[x] = new createjs.Bitmap("/img/maintenance/logo.png");
					nihtanLogo[x].x = this.tables[x].x + 290;
					nihtanLogo[x].y = this.tables[x].y + 130;
					nihtanLogo[x].scaleX = nihtanLogo[x].scaleY = 0.4;
					this.hot_game[x].addChild(nihtanLogo[x]);

					this.tables[x].cache(0,0,610,285);
					continue;
				}
			}
			else {
				this.tables[x].cache(0,180,608,100);
			}

			if(data[x].gameName.indexOf("icbo") > -1) {
				this.tables[x].image = new createjs.Bitmap("/img/table_image/sicbo_table_img.jpg");
			} else if(data[x].gameName.indexOf("accarat") >-1) {
				this.tables[x].image = new createjs.Bitmap("/img/table_image/baccarat_table_img.jpg");
			} else if(data[x].gameName.indexOf("oker") >-1) {
				this.tables[x].image = new createjs.Bitmap("/img/table_image/poker_table_img.jpg");
			} else if(data[x].gameName.indexOf("iger") >-1) {
				this.tables[x].image = new createjs.Bitmap("/img/table_image/dragontiger_table_img.jpg");
			}

			this.tables[x].image.x = this.tables[x].x;

			let img_mask = new createjs.Shape();
			img_mask.graphics.beginFill("#424242").drawRoundRectComplex(0,0,608,200,0,20,0,0);
			img_mask.x =this.tables[x].x
			img_mask.y =this.tables[x].y
			this.hot_game[x].addChild(img_mask);

			this.tables[x].image.y = this.tables[x].y - 18;
			this.tables[x].image.mask = img_mask
			this.tables[x].image.scaleY = this.tables[x].image.scaleX = 1.12;
			this.tables[x].image.target_parent = this.tables[x];
			this.hot_game[x].addChild(this.tables[x].image);

			this.tables[x].roadmap_bg = new createjs.Shape();
			this.tables[x].roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,608,90);
			this.tables[x].roadmap_bg.cache(0,0,608,90);
			this.tables[x].roadmap_bg.x = this.tables[x].x;
			this.tables[x].roadmap_bg.y = this.tables[x].y+ 280 - 90;

			this.hot_game[x].addChild(this.tables[x].roadmap_bg);

			let roadmap_bg = new createjs.Shape();
			roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,607.6,90);
			roadmap_bg.y = (this.tables[x].y)  + 190 ;
			roadmap_bg.x = this.tables[x].x;
			roadmap_bg.cache(0,0,607.6,90);
			this.hot_game[x].addChild(roadmap_bg);

			let lines = new createjs.Shape();
			lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0,29);

			this.hot_game[x].addChild(lines);
			let posY =  roadmap_bg.y;
			let posX =  roadmap_bg.x

			for(var i = 0; i <= 6 ; i++) {
				lines.graphics.moveTo(posX,posY+ (15*i)).lineTo(posX + 607, posY+ (15*i))
			}
			lines.graphics.moveTo(posX,posY)
			for(var i = 0; i <= 41 ; i++) {
				lines.graphics.moveTo(posX+(14.82*i),posY).lineTo(posX+(14.82*i),posY + 90)
			}

			lines.shadow = new createjs.Shadow("#000",3,3,5);
			lines.alpha =.5;
			// === game name
			let gameStr = '';
			switch(data[x].gameName) {
				case "Baccarat":
				gameStr = window.language.lobby.baccarat;
				break;

				case "Dragon-Tiger":
				gameStr = window.language.lobby.dragontiger;
				break;

				case "Sicbo":
				gameStr = window.language.lobby.sicbo;
				break;

				case "Poker":
				gameStr = window.language.lobby.texas;
				break;
			}
			// ===table name
			this.tables[x].game_name = new createjs.Shape();
			let game_name_bg = ["#980000","#2b0000"];
			let text_color = "#efb052";

			if(data[x].roomType == "p") {
				game_name_bg = ["#bd0000","#7c0000"];
				text_color = "#efb052";
				//		gameStr = gameStr +' Premium';
			} else if(data[x].roomType == "v") {
				game_name_bg = ["#fedd78","#d5a515"];
				text_color = "#000";
				//		gameStr = gameStr +' VIP';
			}

			//PM-0918 change poker positions
			let xPos = 255;
			let xWidth = 250;
			let xWidthMask = 0;
			if(data[x].sportBetRanges.length >3) {
				xPos = 510;
				xWidth = 485;
				xWidthMask = 235;
			}
			this.hot_game[x].bet_range_length = data[x].sportBetRanges.length;

			// === game label bg
			this.tables[x].game_name_bg = new createjs.Shape();
			this.tables[x].game_name_bg.graphics.beginLinearGradientFill(game_name_bg, [0,1],0,0,190,0).drawRect(0,0,xWidth,34);
			this.tables[x].game_name_bg.cache(0,0,xWidth,34);
			this.tables[x].game_name_bg.x = this.tables[x].x;
			this.tables[x].game_name_bg.y = this.tables[x].y-1;

			mask_name[x] = new createjs.Shape();
			mask_name[x].graphics.beginFill("red").drawRect(0,0,xWidth,34);
			mask_name[x].x = this.tables[x].game_name_bg.x-xWidthMask;
			mask_name[x].y = this.tables[x].game_name_bg.y;

			this.tables[x].game_name_bg.mask = mask_name[x];
			this.hot_game[x].addChild(this.tables[x].game_name_bg)

			// === game number
			this.tables[x].table_num = new createjs.Text(data[x].tableNumber.length > 1 ? data[x].tableNumber : "0"+data[x].tableNumber, "bold 20px latoblack", text_color);
			this.tables[x].table_num.x = this.tables[x].game_name_bg.x + 20;
			this.tables[x].table_num.y = this.tables[x].game_name_bg.y + 5;
			this.hot_game[x].addChild(this.tables[x].table_num);

			//PM-0918 kr,jp,en
			let name_posY = 6;
			if(window.language.locale == "kr"){
				name_posY = 6;
			}

			this.tables[x].game_name = new createjs.Text(gameStr, "20px ArvoItalic", text_color);
			this.tables[x].game_name.x = this.tables[x].game_name_bg.x + 50;
			//this.tables[x].game_name.y = this.tables[x].game_name_bg.y + 4; //old
			this.tables[x].game_name.y = this.tables[x].game_name_bg.y + name_posY; //new
			this.hot_game[x].addChild(this.tables[x].game_name);

			this.tables[x].namespace = data[x].gameName+"/"+data[x].tableNumber

			if(window.language.locale == "zh") {
				// this.tables[x].table_num.font = "bold 25px latoblack";
				this.tables[x].game_name.font = "27px ArvoItalic";
				this.tables[x].game_name.y = this.tables[x].game_name_bg.y + name_posY - 5;
			}

			// ==roadmap
			this.tables[x].roadmap_container = new createjs.Container();
			this.tables[x].roadmap_container.x = this.tables[x].x;
			this.tables[x].roadmap_container.y = this.tables[x].y + 190;
			this.tables[x].roadmap_container.shadow = new createjs.Shadow("#949494",1,1,2);
			this.hot_game[x].addChild(this.tables[x].roadmap_container);
			this.makeRoadmap(data[x], x);

			// === bet ranges
			mask[x] = new createjs.Shape();
			mask[x].graphics.beginFill("red").drawRect(0,0,608,280);
			mask[x].x = this.tables[x].game_name_bg.x;
			mask[x].y = this.tables[x].game_name_bg.y;

			this.tables[x].bet_range_container = new createjs.Container();


			this.tables[x].bet_range_container.x = (this.tables[x].x + 25) - xPos;
			this.tables[x].bet_range_container.xPOsition = (this.tables[x].x + 25) - xPos;

			this.tables[x].bet_range_container.y = (x *155) + 410 - 360;
			this.tables[x].bet_range_container.target_parent = this.tables[x]

			if(x == 3) {
				this.tables[x].bet_range_container.y = 720 - 360;
			} else if(x ==1) {
				this.tables[x].bet_range_container.y = 410 - 360;
			}

			this.tables[x].bet_range_container.mask = mask[x];
			this.hot_game[x].addChild(this.tables[x].bet_range_container)


			this.tables[x].bet_range_bg = new createjs.Shape();

			//PM-0918 change poker positions
			this.tables[x].bet_range_bg.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0,-1,xWidth,156);
			this.tables[x].bet_range_bg.cache(0,0,xWidth,156);


			this.tables[x].bet_range_bg.x = -24;
			this.tables[x].bet_range_bg.y = -17;
			this.tables[x].bet_range_bg.type = "game_container"
			this.tables[x].bet_range_container.addChild(this.tables[x].bet_range_bg);

			this.tables[x].bet_range = [];
			// this.tables[x].bet_range_text = [];
			this.tables[x].bet_range_text_hyphen = [];
			this.tables[x].bet_range_text_min = [];
			this.tables[x].bet_range_text_max = [];

			for(var i = 0; i < data[x].sportBetRanges.length; i++) {

				this.tables[x].bet_range[i] = new createjs.Shape();
				this.tables[x].bet_range[i].graphics.beginLinearGradientFill(["#ffd576","#c29321"],[0,1],0,0,0,20).drawRoundRect(0,0,200,30,15);

				this.tables[x].bet_range[i].y = i*40;

				//PM-0918 change poker positions
				if(data[x].sportBetRanges.length > 3 && i > 2){
					this.tables[x].bet_range[i].x = 235;
					this.tables[x].bet_range[i].y = (i-3)*40;
				}

				this.tables[x].bet_range[i].type = "game_container";
				this.tables[x].bet_range[i].button = true;
				this.tables[x].bet_range[i].gamename = data[x].gameName;

				this.tables[x].bet_range[i].hover =  (e) => {
					e.graphics.clear().beginLinearGradientFill(["#c29321","#ffd576"],[0,1],0,0,0,20).drawRoundRect(0,0,200,30,15);
				}

				this.tables[x].bet_range[i].normal =  (e) => {
					e.graphics.clear().beginLinearGradientFill(["#ffd576","#c29321"],[0,1],0,0,0,20).drawRoundRect(0,0,200,30,15);
				}

				this.tables[x].bet_range_container.addChild(this.tables[x].bet_range[i]);

				// this.tables[x].bet_range_text[i] = new createjs.Text(numberWithCommas(data[x].sportBetRanges[i].min) + " to " + numberWithCommas(data[x].sportBetRanges[i].max), "bold 15px latoRegular", "#000");
				// this.tables[x].bet_range_text[i].y = (i*40) + 6;
				// this.tables[x].bet_range_text[i].textAlign = "center";
				// this.tables[x].bet_range_text[i].x =  100;
				// this.tables[x].bet_range_text[i].type = "game_container";
				// this.tables[x].bet_range_text[i].hitArea = this.tables[x].bet_range[i];
				// this.tables[x].bet_range_container.addChild(this.tables[x].bet_range_text[i]);

				let dividend
				if (window.casino == 'SS') {
					dividend = 1000;
				}
				else {
					dividend = 1;
				}

				let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
				if (window.mainMultiplier % 10 || data[x].gameName == 'Sicbo') mainMultiplier = 1;
				let betRangeMin = (data[x].sportBetRanges[i].min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
				let betRangeMax = ((data[x].sportBetRanges[i].max * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

				this.tables[x].bet_range_text_hyphen[i] = new createjs.Text("-", "bold 15px latoRegular", "#000");
				this.tables[x].bet_range_text_hyphen[i].x = this.tables[x].bet_range[i].x + 100;
				this.tables[x].bet_range_text_hyphen[i].textAlign = "center";
				this.tables[x].bet_range_text_min[i] = new createjs.Text(numberWithCommas(betRangeMin), "bold 15px latoRegular", "#000");
				this.tables[x].bet_range_text_min[i].x = this.tables[x].bet_range_text_hyphen[i].x - 12;
				this.tables[x].bet_range_text_min[i].textAlign = "right";
				this.tables[x].bet_range_text_max[i] = new createjs.Text(numberWithCommas(betRangeMax), "bold 15px latoRegular", "#000");
				this.tables[x].bet_range_text_max[i].x = this.tables[x].bet_range_text_hyphen[i].x + 12;
				this.tables[x].bet_range_text_max[i].textAlign = "left";
				this.tables[x].bet_range_text_hyphen[i].y = this.tables[x].bet_range_text_min[i].y = this.tables[x].bet_range_text_max[i].y = this.tables[x].bet_range[i].y + 6;
				this.tables[x].bet_range_text_hyphen[i].type = this.tables[x].bet_range_text_min[i].type = this.tables[x].bet_range_text_max[i].type = "game_container";
				this.tables[x].bet_range_text_hyphen[i].hitArea = this.tables[x].bet_range_text_min[i].hitArea = this.tables[x].bet_range_text_max[i].hitArea = this.tables[x].bet_range[i];

				this.tables[x].bet_range_container.addChild(this.tables[x].bet_range_text_hyphen[i], this.tables[x].bet_range_text_min[i], this.tables[x].bet_range_text_max[i]);
				this.tables[x].bet_range_container.cursor = "pointer";

				// if(window.language.locale == "zh") {
				// 			this.tables[x].bet_range_text_hyphen[i].font = 	"bold 20px latoRegular";
				// 			this.tables[x].bet_range_text_min[i].font = "bold 20px latoRegular";
				// 			this.tables[x].bet_range_text_max[i].font = "bold 20px latoRegular";
				// }

				this.tables[x].bet_range_container.addEventListener("mouseover",(e)=> {
					if(e.target.text) {
						e.target = e.target.hitArea
					}
					if(e.target.button) {
						//$(".container").css('cursor','pointer');
						e.target.hover(e.target)
					}
				})
				this.tables[x].bet_range_container.addEventListener("mouseout",(e)=> {
					if(e.target.text) {
						e.target = e.target.hitArea
					}
					if(e.target.button) {
						//$(".container").css('cursor','default');
						e.target.normal(e.target)
					}
				});


				if(data[x].gameName == "Sicbo") {
					this.tables[x].bet_range[i].redirect_link = window.sb_domain+data[x].tableNumber + "/" +data[x].sportBetRanges[i].min + "-" + data[x].sportBetRanges[i].max;
				}
				if(data[x].gameName == "Baccarat") {
					this.tables[x].bet_range[i].redirect_link = window.bc_domain+data[x].tableNumber + "/" +data[x].sportBetRanges[i].min + "-" + data[x].sportBetRanges[i].max;
				}
				if(data[x].gameName == "Dragon-Tiger") {
					this.tables[x].bet_range[i].redirect_link = window.dt_domain+data[x].tableNumber + "/"+data[x].sportBetRanges[i].min + "-" + data[x].sportBetRanges[i].max;
				}
				if(data[x].gameName == "Poker") {
					this.tables[x].bet_range[i].redirect_link = window.poker_domain+data[x].tableNumber + "/"+data[x].sportBetRanges[i].min + "-" + data[x].sportBetRanges[i].max;
				}


				this.tables[x].bet_range_container.addEventListener("click",(e)=> {
					if(e.target.text) {
						e.target = e.target.hitArea
					}
					if(e.target.button) {
						//	$(".container").css('cursor','default');
						// e.target.normal(e.target)
						if(e.target.gamename == "Baccarat" || e.target.gamename == "Dragon-Tiger") {
							window.location.href = e.target.redirect_link + "/"+0
						} else {
							window.location.href = e.target.redirect_link
						}
					}
				});

				// this.tables[x].bet_range[i].addEventListener("click",(e)=> {
				// 	window.location.href = e.currentTarget.redirect_link
				// });
			}

			// === mouseevents
			this.currentMouseOver = null;
			var Ease = createjs.Ease; // shortcut.
			this.hot_game[x].addEventListener("mouseover", (e) => {

				if(this.currentMouseOver && (this.currentMouseOver != e.currentTarget.index)) {
					//PM-0918 change poker positions
					let xPos = 255;
					if(this.hot_game[this.currentMouseOver-1].bet_range_length >3) {
						xPos = 510;
						createjs.Tween.get(this.hot_game[this.currentMouseOver-1].children[0].game_name_bg.mask)
						.to({
							x: (this.hot_game[this.currentMouseOver-1].children[0].x)-235

						},300);
					}
					createjs.Tween.get(this.hot_game[this.currentMouseOver-1].children[0].bet_range_container)
					.to({
						x: (this.hot_game[this.currentMouseOver-1].children[0].x + 24 )-xPos
					},300);


					this.currentMouseOver = null;
				}

				createjs.Tween.get(e.currentTarget.children[0].bet_range_container)
				.to({
					x: (e.currentTarget.children[0].x + 24)
				},300,Ease.bounceOut)

				createjs.Tween.get(e.currentTarget.children[0].game_name_bg.mask)
				.to({
					x: (e.currentTarget.children[0].x)
				},300,Ease.bounceOut)


				if(!this.currentMouseOver) {
					this.currentMouseOver = e.currentTarget.index;
				}

			});
		} //end for
	},
	makeRoadmap(data,x) {
		this.tables[x].roadmap_container.cache(0, 0, 608, 90);
		this.tables[x].roadmap_container.removeAllChildren();

		if(data.gameName == "Baccarat") {
			let rm_data = formatData.fnFormatBCBigRoad(data.marks,6,41);

			for(var i = 0; i < rm_data.matrix.length; i++) {
				for(var e = 0; e < rm_data.matrix[i].length; e++) {
					if(rm_data.matrix[i][e] === undefined) continue;
					let sp = createSpriteRoadMap("/img/all_scoreboard_16.png" , 16,16, sp);
					// rm_data[e][i].x = (e*18.5) + 1.5;
					// rm_data[e][i].y = (i*18.5) + 1.5;
					sp.x = (e*14.8);
					sp.y = (i*15);
					//	sp.scaleX = sp.scaleY = .4;

					if(rm_data.matrix[i][e].ties) {
						sp.gotoAndStop("big-"+rm_data.matrix[i][e].mark+"-t");
					} else {
						sp.gotoAndStop("big-"+rm_data.matrix[i][e].mark);
					}
					this.tables[x].roadmap_container.addChild(sp);
					if(rm_data.matrix[i][e].ties) {
						if(rm_data.matrix[i][e].ties > 1) {
							let tie_text = new createjs.Text(rm_data.matrix[i][e].ties, "bold 12px BebasNeue","#000");
							tie_text.y = sp.y + 8 +1;
							tie_text.x = sp.x  + 8;
							tie_text.textAlign = "center";
							tie_text.textBaseline = "middle";
							this.tables[x].roadmap_container.addChild(tie_text);
							// if(window.language.locale == "zh") { tie_text.font = "bold 19px BebasNeue"; }
						}
					}

				}
			}
		} // end if
		// dragon tiger roadmap
		if(data.gameName == "Dragon-Tiger") {
			let rm_data = formatData.fnFormatDTBigRoad(data.marks,6,41);

			for(var i = 0; i < rm_data.matrix.length; i++) {
				for(var e = 0; e < rm_data.matrix[i].length; e++) {
					if(rm_data.matrix[i][e] === undefined) continue;
					let sp = drawSboard("bigroad")[rm_data.matrix[i][e].mark];
					sp.x = e * 14.8 - 1.5;
					sp.y = i * 14.6 - 1.5;
					sp.scaleX = sp.scaleY = .6;

					if(rm_data.matrix[i][e].ties) {
						if(rm_data.matrix[i][e].ties > 1) {
							let tie_text = new createjs.Text(rm_data.matrix[i][e].ties, "bold 12px BebasNeue","#000");
							tie_text.y = sp.y + 8 + 1;
							tie_text.x = sp.x  + 8 + 1.5;
							tie_text.textAlign = "center";
							tie_text.textBaseline = "middle";
							this.tables[x].roadmap_container.addChild(tie_text);

							// if(window.language.locale == "zh") { tie_text.font = "bold 19px BebasNeue";	 }
						}
						sp.children[sp.children.length-1].visible = true;

						if(rm_data.matrix[i][e].suited_tie) {
							sp.children[sp.children.length-1].graphics.clear().beginFill("#ff9800").drawRect(0,0,3,30);
						}
					}
					this.tables[x].roadmap_container.addChild(sp);
				}
			}
		} // end if
		// sicbo road map
		if(data.gameName == "Sicbo") {
			let rm_data = formatData.fnFormatSicbo(data.marks,41,6).size;
			for(var e = 0; e< rm_data.length;e++) {
				if(rm_data[e] !== undefined) {
					for(var i = 0; i < rm_data[e].length; i++) {
						if(!rm_data[e][i]) continue ;

						if(rm_data[e][i] !== undefined) {

							let color = "#e5b241";
							let text_val = rm_data[e][i];
							let font_size = "10px";

							if(text_val.length > 2) {
								font_size = "10px"
							}

							if (rm_data[e][i] == "odd") {
								color = "#d32f2f";
								text_val = window.language.locale == "zh" ? "单" : "O";
							}
							if (rm_data[e][i] == "even") {
								color = "#1565c0";
								text_val = window.language.locale == "zh" ? "双" : "E";
							}
							if (rm_data[e][i] == "big") {
								color = "#d32f2f";
								text_val = window.language.locale == "zh" ? "大" : "B";
							}
							if (rm_data[e][i] == "small") {
								color = "#1565c0";
								text_val = window.language.locale == "zh" ? "小" : "S";
							}
							if (rm_data[e][i] == "triple") {
								color = "#41a257";
								text_val = window.language.locale == "zh" ? "和" : "T";
							}

							rm_data[e][i] = new createjs.Shape();
							rm_data[e][i].graphics.beginFill(color).drawCircle(8,6.5,6.5);
							rm_data[e][i].x = e * 14.8;
							rm_data[e][i].y = i * 15 + 1;

							rm_data[e][i].text = new createjs.Text(text_val, window.language.locale == "zh" ? font_size+" lato" : "bold "+font_size+" lato", "#fff");
							rm_data[e][i].text.x = rm_data[e][i].x + 8;
							rm_data[e][i].text.y = rm_data[e][i].y + 6.2;

							rm_data[e][i].text.textAlign = "center";
							rm_data[e][i].text.textBaseline = "middle";
							this.tables[x].roadmap_container.addChild(rm_data[e][i], rm_data[e][i].text);
							// if(window.language.locale == "zh") {
							// 	rm_data[e][i].text.font = "bold 15px lato";
							// }
						}
					} //end for
				} //end if
			}
		} // end if

		if(data.gameName == "Poker") {

			let rm_data = formatData.fnFormatPokerRoadMap(data.marks,6,40);
			let circle = "";
			let radius = "";
			let text = "";
			for(var e = 0; e < rm_data.length; e++) {
				for(var i = 0; i < rm_data[e].length; i++) {
					var sp = new createjs.Shape();
					if(!rm_data[e][i]) continue;

					if(rm_data[e][i] == "D") {
						circle = "#cd342f"
					} else if(rm_data[e][i] == "T") {
						circle = "#41a257"
					}else if(rm_data[e][i] == "P") {
						circle = "#1268cb"
					}

					sp.graphics.beginFill(circle).drawCircle(6.5,6.5,6.5);
					sp.x = e*14.8 + 1;
					sp.y = i*15 + 1;
					// rm_data[e][i].x = e * 14.8;
					// rm_data[e][i].y = i * 15 + 1;

					let text;

					if(window.language.locale == "zh") {
						if(rm_data[e][i] == "P") { text = new createjs.Text("闲", "10px lato", "#fff"); }
						if(rm_data[e][i] == "T") { text = new createjs.Text("和", "10px lato", "#fff"); }
						if(rm_data[e][i] == "D") { text = new createjs.Text("荷", "10px lato", "#fff"); }
					} else {
						if(rm_data[e][i] == "P") { text = new createjs.Text("P", "10px lato", "#fff"); }
						if(rm_data[e][i] == "T") { text = new createjs.Text("T", "10px lato", "#fff"); }
						if(rm_data[e][i] == "D") { text = new createjs.Text("D", "10px lato", "#fff"); }
					}

					if(window.language.locale == "zh") {
						text.y = sp.y + 6;
					} else {
						text.y = sp.y + 6;
					}

					text.x = sp.x + 6.5;
					text.textAlign = "center";
					text.textBaseline = "middle";
					this.tables[x].roadmap_container.addChild(sp, text);
					// if(window.language.locale == "zh") { text.font = "17px Arial"; }
				}
			} // end for
		}


		setTimeout(() => {
			// console.log("::::", this.tables[x].roadmap_container.getBounds(), data.gameName, x);
			// let kk = new createjs.Shape();
			// kk.graphics.beginFill("#a0a").drawRect(0, 0, 608, 90);
			// kk.alpha = 0.4;
			// this.tables[x].roadmap_container.addChild(kk);
			this.tables[x].roadmap_container.updateCache();
		}, 1000);


	},
	resize () {

		var newWidth = window.innerWidth;
		var newHeight = window.innerHeight;

		var baseRatio = 1920 / 1080,
		newRatio = newWidth / newHeight;

		if(newRatio > baseRatio) {
			newWidth = newHeight * baseRatio;
		} else {
			newHeight = newWidth / baseRatio;
		}


		hotCanvas.canvas.width = newWidth;
		hotCanvas.canvas.height = newHeight;


		hotCanvas.scaleX = hotCanvas.scaleY = newWidth / 1920;
	},
  setCountDown() {
    var target_date = new Date("Feb 16, 2018 00:00:00").getTime();
    var counter_days, counter_hours, counter_minutes, counter_seconds;

    var count = setInterval( () => {
      var current_date = new Date().getTime();
      var seconds_left = target_date - current_date;

      // Time calculations for days, hours, minutes and seconds
      counter_days = Math.floor(seconds_left / (1000 * 60 * 60 * 24));
      counter_hours = Math.floor((seconds_left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      counter_minutes = Math.floor((seconds_left % (1000 * 60 * 60)) / (1000 * 60));
      counter_seconds = Math.floor((seconds_left % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      this.days.text = ("0" + counter_days).slice(-2);
      this.hours.text = ("0" + counter_hours).slice(-2);
      this.minutes.text = ("0" + counter_minutes).slice(-2);
      this.seconds.text = ("0" + counter_seconds).slice(-2);

      // If the count down is over, write some text
      if (seconds_left < 0) {
        clearInterval(count);
				this.days.text = "00";
	      this.hours.text = "00";
	      this.minutes.text = "00";
	      this.seconds.text = "00";
        this.countDownCon.visible = false;
      }

    }, 1000);


  } //setCountDown
});

return instance;
}
