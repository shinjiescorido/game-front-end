import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, setCurrentTimezone } from '../factories/factories';
import listSicbo from './factory/l_sicbo';
import listDt from './factory/l_dragonTiger';
import listBaccarat from './factory/l_baccarat';
import lobbyBanner from './factory/l_banner';
import rmformat from '../factories/formatter';

let instance = null;
let formatData = rmformat();

export default() => {
	instance = instance || new blu.Component({
		ads : [],
		circle_indicator: [],
		main() {

			this.y = 72;

			this.visible = false;

			this.banner_container = new createjs.Container();

			bannerCanvas = new createjs.Stage("bannerCanvas");
			bannerCanvas.addChild(this.banner_container)
			bannerCanvas.enableMouseOver(10);


			let banner_mask = new createjs.Shape();
			banner_mask.graphics.beginFill("red").drawRect(0,0,1690,230);

			let banner_data = [
				{
					banner_image : "nihtan_banner",
					gameName : "nihtan-banner",
					icon : "",
					src : "/img/banner/chinese-newyear-theme/livegames/inner_bg.png",
				},
				{
					banner_image : "poker-bonus_banner",
					gameName : "poker-bonus",
					icon : "",
					src : "/img/banner/chinese-newyear-theme/livegames/inner_bg.png"
				},
				{
					banner_image : "mahjong_banner",
					gameName : "mahjong",
					icon : "",
					src : "/img/banner/chinese-newyear-theme/livegames/inner_bg.png"
				},
				{
					banner_image : "dragon-bonus_banner",
					gameName : "dragon-bonus",
					icon : "",
					src : "/img/banner/chinese-newyear-theme/livegames/inner_bg.png"
				},
				{
					banner_image : "super-six_banner",
					gameName : "super-six",
					icon : "",
					src : "/img/banner/chinese-newyear-theme/livegames/inner_bg.png"
				},
				{
					banner_image : "roulette_banner",
					gameName : "roulette",
					icon : "",
					src : "/img/banner/chinese-newyear-theme/livegames/inner_bg.png"
				},
				{
					banner_image : "banner_img1",
					gameName : "redwhite",
					icon : "",
					src : "/img/banner/chinese-newyear-theme/livegames/inner_bg.png"
				},
				// {
				// 	banner_image : "dragon-tiger_banner",
				// 	gameName : "dragon-tiger",
				// 	icon : "",
				// 	src : "/img/banner/chinese-newyear-theme/livegames/inner_bg.png"
				// },
				{
					banner_image : "reel-games_banner",
					gameName : "reel-games",
					icon : "",
					src : "/img/banner/chinese-newyear-theme/livegames/inner_bg.png"
				}
			]

			this.createAds(banner_data);
			// this.addChild(this.banner_container);

			this.banner_container.mask = banner_mask;
			// === banner
			this.table_banner_container = new createjs.Container();
			this.table_banner_container.visible = false;
			this.table_banner_container.mask = banner_mask;
			bannerCanvas.addChild(this.table_banner_container);
			// this.addChild(this.table_banner_container);

			this.meta_poker_sample = [{"roundId":328,"roundNum":318,"gameInfo":{"burn":["0005","0026","0020"],"flop":["0035","0046","0027"],"turn":"0000","river":"0049","dealer":["0002","0048"],"player":["0039","0009"]},"gameResult":{"cards":["0039","0000","0009","0035","0049"],"winner":"player","handtype":"Two Pair"}},{"roundId":327,"roundNum":317,"gameInfo":{"burn":["0005","0026","0049"],"flop":["0035","0046","0027"],"turn":"0000","river":"0002","dealer":["0048","0028"],"player":["0039","0009"]},"gameResult":{"cards":["0039","0000","0009","0035","0046"],"winner":"player","handtype":"Two Pair"}},{"roundId":326,"roundNum":316,"gameInfo":{"burn":["0005","0026","0020"],"flop":["0035","0046","0027"],"turn":"0000","river":"0049","dealer":["0002","0048"],"player":["0039","0009"]},"gameResult":{"cards":["0039","0000","0009","0035","0049"],"winner":"player","handtype":"Two Pair"}}];

			// === Notice
			this.announcementCon  = new createjs.Container();
			this.announcementCon.x = 0;
			this.announcementCon.y = 50;
			this.announcementCon.visible = false;
			bannerCanvas.addChild(this.announcementCon);

			// if (window.all_tables.length) {
				// setTimeout(() => {
					// window.all_tables[0].mainNotice.status = 1
					// if (parseInt(window.all_tables[0].mainNotice.status)) {
						// this.setAnnouncement(window.all_tables[0].mainNotice)
					// }
				// },2500)
			// }

        	this.resize()
        	window.addEventListener("resize", function() {
        		this.resize()
        		bannerCanvas.update()
			}.bind(this));

			// COUNTDOWN
      this.countDownCon = new createjs.Container();
      this.banner_container.addChild(this.countDownCon);
      this.countDownCon.x = 1120;
      this.countDownCon.y = 88;

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
		resize() {

			var newWidth = window.innerWidth;
			var newHeight = window.innerHeight;

			var baseRatio = 1920 / 1080,
				newRatio = newWidth / newHeight;

			if(newRatio > baseRatio) {
				newWidth = newHeight * baseRatio;
			} else {
				newHeight = newWidth / baseRatio;
			}


			bannerCanvas.canvas.width = newWidth;
			bannerCanvas.canvas.height = newHeight;


			bannerCanvas.scaleX = bannerCanvas.scaleY = newWidth / 1920;
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
			console.log(this.announcementCon)

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
			announcementTextBg.graphics.beginLinearGradientFill(['#59090a', 'rgba(89, 9, 10, 0.1)'], [0,1],0,0,1150,0).drawRect(0,0,1150,56);
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
	        marquee_con.mask.graphics.beginFill("#fff").drawRect(0, 0, 1120, textbounds.height + 5);
	        marquee_con.mask.x = announcementText.x;
	        marquee_con.mask.y = announcementText.y;

	        let twin = announcementText.clone();
	        twin.x = announcementText.x + textbounds.width + 900;
	        twin.y = announcementText.y;
	        marquee_con.addChild(announcementText, twin);

	        let marquee = function(obj) {
	          	let toX = obj.x - (textbounds.width + 900);
	          	createjs.Tween.get(obj, {loop:true}).to({
	            	x : toX
	          	}, 15000)
	        }

	        marquee(announcementText);
	        marquee(twin);
	        this.announcementCon.addChild(marquee_con);
		},
		createAds(data) {
			this.indi_ads = []
			for(var x = 0;x < data.length; x++) {
				this.indi_ads[x] = new createjs.Container();
				// this.indi_ads[x].mask = header_mask;

				this.ads[x] = new createjs.Bitmap(data[x].src);
				this.ads[x].x = 0;
				// this.ads[x].y = 30;
				this.ads[x].y = 50;
				this.indi_ads[x].addChild(this.ads[x]);
				this.ads[x].scaleX = this.ads[x].scaleY = 1.4;

				if(data[x].gameName == "redwhite") {
					this.ads[x].redwhite_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/livegames/red-white.png");

					if(window.language.locale == "zh") {
						this.ads[x].redwhite_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/livegames/red-white-zh.png");
					}
					this.ads[x].redwhite_img.y = 50;
					this.setFireworks(x);
					this.setLanternBanner(x);
					this.indi_ads[x].addChild(this.ads[x].redwhite_img);
				} //END REDWHITE

				else if(data[x].gameName == "dragon-tiger") {
					this.ads[x].dragontiger_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/livegames/dragon-tiger.png");

					if(window.language.locale == "zh") {
						this.ads[x].dragontiger_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/livegames/dragon-tiger-zh.png");
					}
					this.ads[x].dragontiger_img.y = 50;
					this.setFireworks(x);
					this.setLanternBanner(x);
					this.indi_ads[x].addChild(this.ads[x].dragontiger_img);
				} //END DRAGON TIGER
				else if(data[x].gameName == "reel-games") {
					this.ads[x].reelgames_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/livegames/reel-games.png");

					if(window.language.locale == "zh") {
						this.ads[x].reelgames_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/livegames/reel-games-zh.png");
					}
					this.ads[x].reelgames_img.y = 50;
					this.setFireworks(x);
					this.setLanternBanner(x);
					this.indi_ads[x].addChild(this.ads[x].reelgames_img);
				} //END REEL GAMES
				else if(data[x].gameName == "spinnwin") {

				} //END SPIN N WIN
				else if (data[x].gameName == "dragon-bonus") {
					this.ads[x].dragonbonus_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/livegames/dragon-bonus.png");
					this.ads[x].dragonbonus_img.y = 50;

					this.setFireworks(x);
					this.setLanternBanner(x);
					this.indi_ads[x].addChild(this.ads[x].dragonbonus_img);
				} //END nihtan banner
				else if (data[x].gameName == "super-six") {
					this.ads[x].supersix_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/livegames/super-six.png");
					this.ads[x].supersix_img.y = 50;

					this.setFireworks(x);
					this.setLanternBanner(x);
					this.indi_ads[x].addChild(this.ads[x].supersix_img);
				} //END supersix banner
				else if (data[x].gameName == "poker-bonus") {
					this.ads[x].pokerbonus_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/livegames/poker-bonus.png");
					this.ads[x].pokerbonus_img.y = 50;
			    // // Draw fireworks
					this.setFireworks(x);
					this.setLanternBanner(x);
					this.indi_ads[x].addChild(this.ads[x].pokerbonus_img);
				} //END poker bonus plus banner
				else if (data[x].gameName == "roulette") {
					this.ads[x].roulette_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/livegames/roulette.png");
					if(window.language.locale == "zh") {
						this.ads[x].roulette_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/livegames/roulette-zh.png");
					}
					this.ads[x].roulette_img.y = 50;
			    // // Draw fireworks
					this.setFireworks(x);
					this.setLanternBanner(x);
					this.indi_ads[x].addChild(this.ads[x].roulette_img);
				} //END poker bonus plus banner
				else if (data[x].gameName == "mahjong") {
					if(window.language.locale == "zh") {
						this.ads[x].mahjong_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/livegames/pai-gow-zh.png");
					} else {
						this.ads[x].mahjong_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/livegames/pai-gow.png");
					}
					this.ads[x].mahjong_img.y = 50;
			    // // Draw fireworks
					this.setFireworks(x);
					this.setLanternBanner(x);
					this.indi_ads[x].addChild(this.ads[x].mahjong_img);
				} //END poker bonus plus banner
				else if (data[x].gameName == "nihtan-banner") {
					if(window.language.locale == "zh") {
						this.ads[x].chinesenewyear_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/livegames/chinese-newyear-zh.png");

					} else {
						this.ads[x].chinesenewyear_img = new createjs.Bitmap("/img/banner/chinese-newyear-theme/livegames/chinese-newyear.png");
					}
					this.ads[x].chinesenewyear_img.x = -10;
					this.ads[x].chinesenewyear_img.y = 50;

					this.setFireworks(x);
					this.setLanternNihtan(x);
					this.indi_ads[x].addChild( this.ads[x].chinesenewyear_img);
				} //END nihtan banner

				// === for play bittons
				if(data[x].gameName == "dragon-tiger") { //data[x].gameName == "reel-games"

					// this.ads[x].enter_button = new createjs.Shape();
					// this.ads[x].enter_button.graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,180,30,15);
					// this.ads[x].enter_button.visible = false;

					// if(window.language.locale == "zh") {
					// 				this.ads[x].enter_button.x = 1180;
					// } else {
					// 				this.ads[x].enter_button.x = 1240;
					// }

					// this.ads[x].enter_button.y = 185;
					// this.ads[x].enter_button.viewPage = data[x].gameName == "dragon-tiger" ? "sub_dragonTiger" : "reel_games";
					this.ads[x].enter_text = new createjs.Text(window.language.lobby.playnow,"16px latoblack", "#543d0b");
					this.ads[x].enter_text.shadow = new createjs.Shadow("#fbf956",0,1.5,0)
					this.ads[x].enter_text.textAlign = "center";
					this.ads[x].enter_text.textBaseline = "middle";
					//this.ads[x].enter_text.hitArea = this.ads[x].enter_button;
					this.ads[x].enter_text.y = 185 + (30/2);
					this.ads[x].enter_text.visible = false;

					if(window.language.locale == "zh") {
									this.ads[x].enter_text.x = 1300 + (180/2) - 50 - 70;
					} else {
									this.ads[x].enter_text.x = 1300 + (180/2) - 30 - 25;
					}

					// this.ads[x].enter_button.on("click",(e)=>{
					// 	//disable reel games for now
					// 	if(e.target.viewPage == "reel_games") return;
					// 	this.context.toggleView(e.target.viewPage);
					// });

					//this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);
					this.indi_ads[x].addChild(this.ads[x].enter_text);
				}
				else if(data[x].gameName == "dragon-bonus") { //data[x].gameName == "reel-games"

					this.ads[x].enter_button = new createjs.Shape();
					this.ads[x].enter_button.graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,180,35,15);
					this.ads[x].enter_button.x = 510;
					this.ads[x].enter_button.y = 158;
					this.ads[x].enter_button.cursor = "pointer";
					this.ads[x].enter_button.viewPage = 'sub_bonus';

					this.ads[x].enter_text = new createjs.Text(window.language.lobby.playnow,"20px latoblack", "#543d0b");
					this.ads[x].enter_text.shadow = new createjs.Shadow("#fbf956",0,1.5,0)
					this.ads[x].enter_text.textAlign = "center";
					this.ads[x].enter_text.textBaseline = "middle";
					this.ads[x].enter_text.hitArea = this.ads[x].enter_button;
					this.ads[x].enter_text.y = this.ads[x].enter_button.y + (30/2);
					this.ads[x].enter_text.x = this.ads[x].enter_button.x + (180/2) + 5;

					if(window.language.locale == "zh") {
						this.ads[x].enter_text.x = this.ads[x].enter_button.x + (180/2) + 5;
					} else {
						this.ads[x].enter_text.x = this.ads[x].enter_button.x + (180/2) + 5;
					}

					this.ads[x].enter_text.y = this.ads[x].enter_button.y + (22/2) + 5;

					this.ads[x].enter_button.on("click",(e)=>{
						//disable reel games for now
						$('.sidebar').css({'width' : '231px'});
						$('.sidebar--lobby').hide();
						$('.sidebar--game, .header-subnav:not(.reelgames)').css({'display': 'block'});
						this.context.toggleView(e.target.viewPage);
					});

					this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);
				}
				else if(data[x].gameName == "super-six") {
					this.ads[x].enter_button = new createjs.Shape();
					this.ads[x].enter_button.graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,180,35,15);
					this.ads[x].enter_button.x = 510;
					this.ads[x].enter_button.y = 158;
					this.ads[x].enter_button.cursor = "pointer";

					this.ads[x].enter_button.viewPage = 'sub_supersix';
					this.ads[x].enter_text = new createjs.Text(window.language.lobby.playnow,"20px latoblack", "#543d0b");
					this.ads[x].enter_text.shadow = new createjs.Shadow("#fbf956",0,1.5,0)
					this.ads[x].enter_text.textAlign = "center";
					this.ads[x].enter_text.textBaseline = "middle";
					this.ads[x].enter_text.hitArea = this.ads[x].enter_button;
					this.ads[x].enter_text.y = this.ads[x].enter_button.y + (30/2);
					this.ads[x].enter_text.x = this.ads[x].enter_button.x + (180/2);

					this.ads[x].enter_button.on("click",(e)=>{
						$('#supersix').addClass("active");
						$('.sidebar').css({'width' : '231px'});
						$('.sidebar--lobby').hide();
						$('.sidebar--game, .header-subnav:not(.reelgames)').css({'display': 'block'});

						this.context.toggleView(e.target.viewPage);
					});

					this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);
				}
				else if(data[x].gameName == "poker-bonus") { //data[x].gameName == "reel-games"
					this.ads[x].enter_button = new createjs.Shape();
					this.ads[x].enter_button.graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,180,35,15);
					this.ads[x].enter_button.x = 497;
					this.ads[x].enter_button.y = 158;
					this.ads[x].enter_button.viewPage = 'sub_poker';
					this.ads[x].enter_button.cursor = "pointer";

					this.ads[x].enter_text = new createjs.Text(window.language.lobby.playnow,"20px latoblack", "#543d0b");
					this.ads[x].enter_text.shadow = new createjs.Shadow("#fbf956",0,1.5,0)
					this.ads[x].enter_text.textAlign = "center";
					this.ads[x].enter_text.textBaseline = "middle";
					this.ads[x].enter_text.hitArea = this.ads[x].enter_button;
					this.ads[x].enter_text.y = this.ads[x].enter_button.y + (30/2);


					this.ads[x].enter_text.x = this.ads[x].enter_button.x + (180/2) + 5;

					this.ads[x].enter_text.y = this.ads[x].enter_button.y + (22/2) + 5;

					this.ads[x].enter_button.on("click",(e)=>{
						//disable reel games for now
						$('.sidebar').css({'width' : '231px'});
						$('.sidebar--lobby').hide();
						$('.sidebar--game, .header-subnav:not(.reelgames)').css({'display': 'block'});
						this.context.toggleView(e.target.viewPage);
					});

					this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);
				}

				this.indi_ads[x].on("click", (e) =>{
					if(e.target.alpha == 0) e.stopPropagation();
				});

				this.banner_container.addChild(this.indi_ads[x]);
			}

			// this.ads_container = new createjs.Container();
			// this.addChild(this.ads_container);
			// this.ads_container.mask = header_mask;

			for(var x = 0;x < data.length; x++) {
				this.circle_indicator[x] = new createjs.Shape();
				this.circle_indicator[x].graphics.beginFill("#fff").drawCircle(0,0,6);
				this.circle_indicator[x].x = (x*28) + 580
				this.circle_indicator[x].y = 255
				this.circle_indicator[x].alpha = 0.5;
				this.banner_container.addChild(this.circle_indicator[x]);
			}

			this.playAds();
		},
		setFireworks(index) {
			this.fireworks_con = new createjs.Container();
			this.indi_ads[index].addChild(this.fireworks_con)
			// this.container.addChild(this.fireworks_con);

			this.fireworks_con.x = 56;
			this.fireworks_con.y = 33;

			let banner_mask = new createjs.Shape();
			banner_mask.graphics.beginFill("red").drawRect(0,0,1690,230);
			banner_mask.x = 0;
			banner_mask.y = 0;

			let fireworks =  new createjs.Bitmap("/img/seasonal_theme/chinese_newyear_theme/fw_green.png");
			fireworks.alpha = 1;
			fireworks.scaleX = fireworks.scaleY = 0;
			fireworks.regX = 150 / 2;
			fireworks.regY = 150 / 2;

			createjs.Tween.get(fireworks, {loop:true}).to({
				scaleX: 0.8,
				scaleY: 0.8,
				alpha: 1,
			}, 1500).to({
				scaleX: 1,
				scaleY: 1,
				alpha: 0
			}, 500);
			fireworks.mask = banner_mask;

			let fireworks02 =  new createjs.Bitmap("/img/seasonal_theme/chinese_newyear_theme/fw_blue.png");
			fireworks02.alpha = 1;
			fireworks02.scaleX = fireworks02.scaleY = 0;
			fireworks02.regX = 150 / 2;
			fireworks02.regY = 150 / 2;

			createjs.Tween.get(fireworks02, {loop:true}).to({
				scaleX: 0.8,
				scaleY: 0.8,
				alpha: 1,
			}, 1500).to({
				scaleX: 1,
				scaleY: 1,
				alpha: 0
			}, 500);
			fireworks02.mask = banner_mask;


			let fireworks03 =  new createjs.Bitmap("/img/seasonal_theme/chinese_newyear_theme/fw_yellow.png");
			fireworks03.alpha = 1;
			fireworks03.scaleX = fireworks03.scaleY = 0;
			fireworks03.regX = 150 / 2;
			fireworks03.regY = 150 / 2;

			createjs.Tween.get(fireworks03, {loop:true}).to({
				scaleX: 0.8,
				scaleY: 0.8,
				alpha: 1,
			}, 1500).to({
				scaleX: 1,
				scaleY: 1,
				alpha: 0
			}, 500);
			fireworks02.mask = banner_mask;

			this.fireworks_con.addChild(fireworks, fireworks02, fireworks03);

			var firepos = setInterval( () => {
				fireworks.scaleX = fireworks.scaleY = (Math.random() * 1 - 0.7) + 0.7;
				fireworks.x = (Math.floor(Math.random() * 1690) - 20).toFixed();
				fireworks.y = (Math.floor(Math.random() * 230) - 20).toFixed();

				fireworks02.scaleX = fireworks02.scaleY = (Math.random() * 1 - 0.7) + 0.7;
				fireworks02.x = (Math.floor(Math.random() * 1690) - 20).toFixed();
				fireworks02.y = (Math.floor(Math.random() * 230) - 20).toFixed();

				fireworks03.scaleX = fireworks03.scaleY = (Math.random() * 1 - 0.7) + 0.7;
				fireworks03.x = (Math.floor(Math.random() * 1690) - 20).toFixed();
				fireworks03.y = (Math.floor(Math.random() * 230) - 20).toFixed();
	    }, 2000);

			for(let  i=0; i<2; i++){
				let dup_fireworks = fireworks.clone();
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
				}, 500).wait(1500);
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
				}, 500)
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
			this.lantern_con.x = 0;
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
			this.lantern_01_animation.x = 50;
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
			this.lantern_02_animation.x = -15;
			this.lantern_02_animation.y = 75;
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
			this.lantern_03_animation.x = 1450;
			this.lantern_03_animation.y = 50;
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
			this.lantern_04_animation.x = 1320;
			this.lantern_04_animation.y = 65;
			this.lantern_con.addChild(this.lantern_04_animation);
		}, //END setLantern
		setLanternBanner(index) {
			this.lantern_banner_con = new createjs.Container();
			this.lantern_banner_con.x = 0;
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
			// this.lb_03_animation.scaleX = this.lb_03_animation.scaleY = 1.2;
			this.lb_03_animation.x = 1330;
			this.lb_03_animation.y = 50;
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
			this.lb_04_animation.x = 1460;
			this.lb_04_animation.y = 85;
			this.lantern_banner_con.addChild(this.lb_04_animation);
		}, //END setLantern
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


	  }, //setCountDown
		playAds () {
			if(!this.ads.length) return;

			this.circle_indicator[0].alpha = 1;

			for(var x = 0; x < this.ads.length; x++  ) {
				this.indi_ads[x].alpha = 0;
				this.indi_ads[0].alpha = 1;

				createjs.Tween.removeTweens(this.indi_ads[x]);

				createjs.Tween.get(this.indi_ads[x],{loop:true})
				.wait(4000*x)
				.to({
					alpha: 1
				},(500))
				.wait(4000)
				.to({
					alpha : (x == 0 ? 1 : 0)
				},(500)).wait(4000 * (7-x))

			} //end for
		},
		bannerTableShow (data) {
			this.currentSelected = data.data.namespace;

			this.banner_container.visible = false;
			this.table_banner_container.visible = true;

			this.table_bg = new createjs.Shape();
			this.table_bg.graphics.beginFill("#333333").drawRect(0,0,1690,240);

			this.table_banner_container.removeAllChildren();
			this.table_banner_container.addChild(this.table_bg);

			switch(data.data.gameName) {
				case "Sicbo" :
					lobbyBanner(this).sicboBannerTable(data.data)
					lobbyBanner(this).setHotCold(data.data.marks)
					lobbyBanner(this).set150res(data.data.marks)
					lobbyBanner(this).setPercentage(data.data.marks)
					lobbyBanner(this).doubleTripleCount(data.data.marks)
					lobbyBanner(this).drawSBRoadMap(formatData.fnFormatSicbo(data.data.marks,24,6))
					break;
				case "Baccarat" :
					let miscData = (data.data.slave && data.data.slave == 'supersix')?data.data:{};
					lobbyBanner(this).bcBannerTable(data.data);
					lobbyBanner(this).bcSetCount(data.data.marks)
					lobbyBanner(this).bcPearlRoad(formatData.fnFormatBCPearlRoad(data.data.marks,6,14,miscData))
					lobbyBanner(this).bcBigRoad(formatData.fnFormatBCBigRoad(data.data.marks,6,42,miscData))
					lobbyBanner(this).bcBigEyeBoy(formatData.fnFormatBigEyeBoy(data.data.marks,6,28))
					lobbyBanner(this).drawSmallRoad(formatData.fnFormatSmallRoad(data.data.marks,6,24));
					lobbyBanner(this).drawCockroachRoad(formatData.fnFormatCockroachPig(data.data.marks,6,24));
					break;
				case "dragontiger" :
				case "Dragon-Tiger" :
					lobbyBanner(this).dtBannerTable(data.data);
					lobbyBanner(this).dtSetPercentages(data.data.marks);
					lobbyBanner(this).dtSetCount(data.data.marks);
					lobbyBanner(this).dtDrawPearlRoad(formatData.fnFormatDTPearlRoad(data.data.marks,6,12));
					lobbyBanner(this).dtDrawBigRoad(formatData.fnFormatDTBigRoad(data.data.marks,6,42));
					lobbyBanner(this).drawBigEyeBoy(formatData.fnFormatDTBigEyeBoy(data.data.marks,6,28));
					lobbyBanner(this).drawDTSmallRoad(formatData.fnFormatDTSmallRoad(data.data.marks,6,12));
					lobbyBanner(this).drawDTCockroachRoad(formatData.fnFormatDTCockroachPig(data.data.marks,6,12));
					break;
				case "Poker" :
					lobbyBanner(this).pokerBannerTable(data.data);
					lobbyBanner(this).drawPokerRoadmap(formatData.fnFormatPokerRoadMap(data.data.marks,6,19))
					lobbyBanner(this).drawPokerResultTable(data.data.meta)
					break;
			}

			let gradient_bg = ["#980000","#2b0000"];
			let text_color = "#efb052";
			let level ='';
            let supersix_level;

			if(data.data.roomType == "p") {
				gradient_bg = ["#bd0000","#7c0000"];
				text_color = "#efb052";
				level = window.language.level.premium;
			} else if(data.data.roomType == "v") {
				gradient_bg = ["#fedd78","#d5a515"];
				text_color = "#000";
				level = window.language.level.vip;
			}

			supersix_level = !level ? window.language.level.normal : level;

			this.gameName_bg = new createjs.Shape();
			this.gameName_bg.graphics.beginLinearGradientFill(gradient_bg, [0,1],0,0,190,0).drawRect(0,0,224,52);
			this.gameName_bg.y = 61;

			this.table_banner_container.addChild(this.gameName_bg);

			this.gameNum = this.getText(30,(52/2) + this.gameName_bg.y,data.data.tableNumber.length == 2 ? data.data.tableNumber : "0" + data.data.tableNumber,"24px ArvoBold",text_color,"center","middle");
			this.table_banner_container.addChild(this.gameNum);

			let font = "24px ArvoItalic";
			// === table name
			let nameTitle = '';
			switch(data.data.gameName) {
			case "Baccarat" :
				nameTitle = window.language.lobby.baccarat;

				for (var i = 0; i < window.bcSetting.length; i++) {
                    if (parseInt(data.data.tableNumber) == window.bcSetting[i].id) {
                        let betSetting = JSON.parse(window.bcSetting[i].bet_setting);

                        if (betSetting.type[0] == 'flippy') {
                            let menu_spritesheet_data = {
                                images: ["/img/flippy.png"],
                                frames: {width:59,height:42},
                                animations: {
                                    "first": {
                                        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 23, 24, 25, 26, 27],
                                        speed: 0.4
                                    },
                                }
                            }

                            this.flippy_spriteSheet = new createjs.SpriteSheet(menu_spritesheet_data);
                            this.flippyImg = new createjs.Sprite(this.flippy_spriteSheet,"first");
                            this.flippyImg.scaleX = this.flippyImg.scaleY = 0.8;
                            // this.flippyImg.x = 290;
                            // this.flippyImg.y = self.all_list_table[x].y + 8;
                            this.table_banner_container.addChild(this.flippyImg);

                            if (!level) {
                                level = 'Main';
                                supersix_level = window.language.level.flippy +' '+ window.language.level.normal;
                            }

                            nameTitle = window.language.level.flippy +' ';
                        }

						// lets check if there is a slave node
						// if(data.data.slave){
						// 	if(data.data.slave == 'supersix'){
						// 		level = 'Super Six';
						// 	}
						// }
                    }
                }
				break;

			case "Dragon-Tiger" :
				nameTitle = window.language.lobby.dragontiger;
				break;

			case "Poker" :
				nameTitle = window.language.lobby.texas;
				// lets check if there is a slave node
					if(data.data.slave && data.data.slave == 'bonusplus'){
						level = window.language.level.bonusplus;
					}
				break;

			case "Sicbo" :
				nameTitle = window.language.lobby.sicbo;
				break;
			}

			if(data.data.slave && (data.data.slave == 'supersix' || data.data.slave == 'bonus')){
				nameTitle = supersix_level;
			}else{
				nameTitle = nameTitle+' '+level;
			}

			let gameName_bg_mask = new createjs.Shape();
				gameName_bg_mask.graphics.beginFill("red").drawRect(50,0,170,100);
				// this.gameName = this.getText(60,(52/2) + this.gameName_bg.y,nameTitle,"20px ArvoItalic",text_color,"left","middle");
				// this.table_banner_container.addChild(this.gameName);

			if (data.data.roomType == "p" || data.data.roomType == "v" || (data.data.slave && data.data.slave == "bonusplus")) {
				if (data.data.slave && (data.data.slave == "supersix" || data.data.slave == "bonus")) {
					this.gameName = this.getText(60,(52/2) + this.gameName_bg.y,level,"20px ArvoItalic",text_color,"left","middle");
					this.table_banner_container.addChild(this.gameName);
					// return;
				} else {
					this.gameName = this.getText(230,(52/2) + this.gameName_bg.y,nameTitle,"20px ArvoItalic",text_color,"left","middle");
					this.gameName.mask = gameName_bg_mask;
					this.table_banner_container.addChild(this.gameName);
					createjs.Tween.get(this.gameName, {loop:true}).to({x : -200},10000);
					// if (this.gameName.text.length > 5 && !data.data.slave) {
					// 	createjs.Tween.get(this.gameName, {loop:true}).to({x : -200},10000);
					// 	console.log(this.gameName.text, "sdjakfhjahksd TWEEN")
					// }

				}

			}
			else {
				this.gameName = this.getText(60,(52/2) + this.gameName_bg.y,nameTitle,"20px ArvoItalic",text_color,"left","middle");
				this.table_banner_container.addChild(this.gameName);
			}

			//상태표시
			let round_stat ="";
			switch(data.data.roundStatus){
				case "S":
					round_stat = window.language.lobby.nowbetting;
					break;
				case "E":
					round_stat = window.language.lobby.bettingend;
					break;
				case "P":
					if(data.data.gameName == "Baccarat" || data.data.gameName == "Dragon-Tiger" || data.data.gameName == "Poker"){
						round_stat = window.language.lobby.dealing;
					}else{
						round_stat = window.language.lobby.result;
					}
					break;
				case "R" :
					round_stat = window.language.lobby.result;
					break;
			}

			if(!data.data.marks.length) {
				round_stat = window.language.prompts.promptshuffling;
			}

			//게임 번호
			let game_ct = new createjs.Container();
			let game_label = this.getText(0,0,window.language.lobby.game + ":","18px lato","#b5b5b5","left","top");
			this.round_num =  this.getText(177,4,data.data.currentRound,"18px bebasNeue","#b5b5b5","right","top");
			game_ct.addChild(game_label,this.round_num);
			game_ct.set({x:23,y:117});
			this.table_banner_container.addChild(game_ct);

			//상태 표시
			this.gameStatus = this.getText(23,117+50,round_stat,"18px lato","#b5b5b5","left","top");
			this.table_banner_container.addChild(this.gameStatus);

			// === set betranges
			this.bet_range_buttons = [];

			let rangeToUse = [];
			if (window.userType == 'TS' || window.userType == 'S') {
				rangeToUse = data.data.sportBetRanges;
			}
			else if (window.userType == 'TC' || window.userType == 'C') {
				rangeToUse = data.data.casinoBetRanges;
			}

			for(var x = 0; x < rangeToUse.length; x++) {
				this.bet_range_buttons[x] = new createjs.Shape();
				this.bet_range_buttons[x].graphics.beginLinearGradientFill(["#ffd270","#bf901e"],[0,1],0,0,0,30).drawRoundRect(0,0,190,24,12);
				this.bet_range_buttons[x].x = rangeToUse.length ==3 ? 1470 + 11 : 1270;
				this.bet_range_buttons[x].y = (x*33) + 95;
				if(x > 2) {
					this.bet_range_buttons[x].x = 1470 + 11;
					this.bet_range_buttons[x].y = ((x-3)*33) + 95;
				}
				this.bet_range_buttons[x].shadow = new createjs.Shadow("rgba(0,0,0,0.2)",0,5,2);
				this.table_banner_container.addChild(this.bet_range_buttons[x]);

				let dividend
                if (window.casino == 'SS') {
                    dividend = 1000;
                }
                else {
                    dividend = 1;
                }

				let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
				if (window.mainMultiplier % 10) mainMultiplier = 1;
                let betRangeMin = (rangeToUse[x].min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
				let betRangeMax = ((rangeToUse[x].max * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

				this.bet_range_buttons[x].text_hyphen = new createjs.Text(" - ", "bold 14px lato","#000");
        		this.bet_range_buttons[x].text_hyphen.x = this.bet_range_buttons[x].x + (190/2);
				this.bet_range_buttons[x].text_hyphen.textAlign = "center";
		        this.bet_range_buttons[x].text_min = new createjs.Text(numberWithCommas(betRangeMin), "bold 14px lato","#000");
		        this.bet_range_buttons[x].text_min.x = this.bet_range_buttons[x].text_hyphen.x - 8;
		        this.bet_range_buttons[x].text_min.textAlign = "right";
		        this.bet_range_buttons[x].text_max = new createjs.Text(numberWithCommas(betRangeMax), "bold 14px lato","#000");
		        this.bet_range_buttons[x].text_max.x = this.bet_range_buttons[x].text_hyphen.x + 8;
		        this.bet_range_buttons[x].text_max.textAlign = "left";

		        this.bet_range_buttons[x].text_hyphen.y = this.bet_range_buttons[x].text_min.y = this.bet_range_buttons[x].text_max.y = this.bet_range_buttons[x].y + 12;
		        this.bet_range_buttons[x].text_hyphen.textBaseline = this.bet_range_buttons[x].text_min.textBaseline = this.bet_range_buttons[x].text_max.textBaseline = "middle";
						this.table_banner_container.addChild(this.bet_range_buttons[x].text_hyphen, this.bet_range_buttons[x].text_min, this.bet_range_buttons[x].text_max);

				this.bet_range_buttons[x].hover =  function (e, type) {
					if(type == "hover") {
						e.graphics.clear().beginLinearGradientFill(["#c69522", "#ffd476"],[0,1],0,0,0,30).drawRoundRect(0,0,190,24,12);
					} else {
						e.graphics.clear().beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,30).drawRoundRect(0,0,190,24,12);
					}
				} //end of active

				this.bet_range_buttons[x].on("mouseover", (e) => {
					e.target.hover(e.target,"hover");
					$(".container").css('cursor','pointer')
				});

				this.bet_range_buttons[x].on("mouseout", (e) => {
					e.target.hover(e.target,"");
					$(".container").css('cursor','default')
				});

				switch(data.data.gameName) {
					case "Sicbo" :
						this.bet_range_buttons[x].redirectLink = window.sb_domain+data.data.tableNumber+"/"+ rangeToUse[x].min + "-" + rangeToUse[x].max;
						break;
					case "Baccarat" : // supersix
						this.bet_range_buttons[x].redirectLink = window.bc_domain+data.data.tableNumber+"/"+ rangeToUse[x].min + "-" + rangeToUse[x].max +"/0"
						+((data.data.slave)?"?slave=" + data.data.slave:"");
						break;
					case "Dragon-Tiger" :
						this.bet_range_buttons[x].redirectLink = window.dt_domain+data.data.tableNumber+"/"+ data.data.sportBetRanges[x].min + "-" + rangeToUse[x].max +"/0";
						break;
					case "Poker" :
						this.bet_range_buttons[x].redirectLink = window.poker_domain+data.data.tableNumber+"/"+ rangeToUse[x].min + "-" + rangeToUse[x].max;
						break;
				}

				this.bet_range_buttons[x].on("click", (e) => {
					window.location.href = e.currentTarget.redirectLink
				});
			} // end for
		},
		setResult (data, e_gameName,tId , meta) {
			if(!this.currentSelected) return;
			for(var x = 0; x < data.length; x++) {
				if(e_gameName == data[x].gameName && tId == data[x].tableNumber) {
					if(this.currentSelected != data[x].namespace) return;

					this.gameStatus.text = window.language.lobby.result;

					switch (data[x].gameName) {
						case "Sicbo" :
							lobbyBanner(this).setHotCold(data[x].marks)
							lobbyBanner(this).set150res(data[x].marks)
							lobbyBanner(this).setPercentage(data[x].marks)
							lobbyBanner(this).doubleTripleCount(data[x].marks)
							lobbyBanner(this).drawSBRoadMap(formatData.fnFormatSicbo(data[x].marks,24,6))
							break;
						case "Baccarat" :
							let miscData = (data[x].slave && data[x].slave == 'supersix')?data[x]:{};
							lobbyBanner(this).bcSetCount(data[x].marks)
							lobbyBanner(this).bcPearlRoad(formatData.fnFormatBCPearlRoad(data[x].marks,6,14,miscData))
							lobbyBanner(this).bcBigRoad(formatData.fnFormatBCBigRoad(data[x].marks,6,48,miscData))
							lobbyBanner(this).bcBigEyeBoy(formatData.fnFormatBigEyeBoy(data[x].marks,6,28))
							lobbyBanner(this).drawSmallRoad(formatData.fnFormatSmallRoad(data[x].marks,6,24));
							lobbyBanner(this).drawCockroachRoad(formatData.fnFormatCockroachPig(data[x].marks,6,24));
							break;
						case "dragontiger" :
						case "Dragon-Tiger" :
							lobbyBanner(this).dtSetPercentages(data[x].marks)
							lobbyBanner(this).dtSetCount(data[x].marks);
							lobbyBanner(this).dtDrawPearlRoad(formatData.fnFormatDTPearlRoad(data[x].marks,6,12));
							lobbyBanner(this).dtDrawBigRoad(formatData.fnFormatDTBigRoad(data[x].marks,6,42));
							lobbyBanner(this).drawBigEyeBoy(formatData.fnFormatDTBigEyeBoy(data[x].marks,6,28));
							lobbyBanner(this).drawDTSmallRoad(formatData.fnFormatDTSmallRoad(data[x].marks,6,12));
							lobbyBanner(this).drawDTCockroachRoad(formatData.fnFormatDTCockroachPig(data[x].marks,6,12));
							break;
						case "Poker" :
							lobbyBanner(this).drawPokerRoadmap(formatData.fnFormatPokerRoadMap(data[x].marks,6,19))
							lobbyBanner(this).drawPokerResultTable(meta)
							break;
					}

					if(this.deal_count) {
						this.deal_count.text = data[x].marks.length
					}
				} //end if
			} //end for
		},
		inputResult (data,d ) {
			if(!this.currentSelected) return;
			for(var x = 0; x < data.length; x++) {
				if((d.tableId == data[x].tableNumber) && (d.gameName == data[x].gameName)) {
					if(this.currentSelected != data[x].namespace) return;

					switch (data[x].gameName) {
						case "Poker" :
							lobbyBanner(this).pokerInputRes(d)
							// this.gameStatus.text = window.language.lobby.dealing;
							break;
						case "Sicbo" :
							this.gameStatus.text = window.language.lobby.result;
							break;
					}
				} //end if
			} //end for
		},
		setNewround(data, e_gameName,tId , meta) {
			if(!this.currentSelected) return;
			for(var x = 0; x < data.length; x++) {
				if(e_gameName == data[x].gameName && tId == data[x].tableNumber) {
					if(this.currentSelected != data[x].namespace) return;
					this.round_num.text = data[x].currentRound;
					this.gameStatus.text = window.language.lobby.nowbetting;
				} //end if
			} //end for
		},
		setroundprogress (data, e_gameName,tId , meta) {
			if(!this.currentSelected) return;
			for(var x = 0; x < data.length; x++) {
				if(e_gameName == data[x].gameName && tId == data[x].tableNumber) {
					if(this.currentSelected != data[x].namespace) return;
					this.round_num.text = data[x].currentRound;
					this.gameStatus.text = window.language.lobby.bettingend;
				} //end if
			} //
		},
		getText(x,y,text,font,color,align,valign){
			let ctrl = new createjs.Text(text,font,color);
			ctrl.x = x;
			ctrl.y = y;
			ctrl.textAlign = align;
			ctrl.textBaseline = valign;//"middle"
			return ctrl;
		}


	});

	return instance;
}
