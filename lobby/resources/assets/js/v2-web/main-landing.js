 import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';
import rmformat from '../factories/formatter';
import sboard from '../factories/scoreboard_draw';

let formatData = rmformat();
let drawSboard = sboard();

let landing_canvas = document.createElement("canvas");

$(landing_canvas).attr({
	'id' : 'landing',
	'width' : '1920px',
	'height' : '620px'
});
$(landing_canvas).css({
	'top': '388px',
  'position': 'absolute',
  'left': '640px'
})

$(landing_canvas).css({
	'top': '388px',
  'position': 'absolute',
  'left': '960px'
})

$('.hot-container').append(landing_canvas)


// let announcementC = document.createElement("canvas");
// $(announcementC).attr({
// 	'id' : 'announce',
// 	'width' : '1920px',
// 	'height' : '220px'
// });
// $(announcementC).css({
//   'top': '1131px',
//   'z-index': '9999999'
// });
//
// $('.hot-container').append(announcementC)

let component_landing = {
	ads : [],
	circle_indicator : [],
	is_hover : true,
	activeBanner : 0,
	stage : new createjs.Stage("landing"),
	container : new createjs.Container(),
	announcementStage : new createjs.Stage('announce'),
	hot_stage : null,
	hot_stages : [],
	main() {
		this.setUser();
		this.stage.addChild(this.container);
		this.stage.enableMouseOver(10);

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
			case "th":
				$(".ico-lang.ico-lang--th").addClass("active")
				break;
		}

		this.setTimeDate();
	},
	newDate : "",
	setTimeDate () {
    setTimeout(() => {
      this.newDate = moment().format('MMMM Do YYYY, h:mm:ss a');
      $(".timer__items.-timer > span").html(this.newDate);
      this.setTimeDate();
    },1000)
	},
	setUser() {
	  let currency = "";
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
    }else if(window.currencyAbbrev == 'DGN') {
    	currency = "DGN"
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
    }

    window.money = (window.casino == 'SS') ? parseFloat(window.money).toFixed(2) : parseInt(window.money);

	  $(".userinfo__avatar img").attr("src","/img/avatar/"+window.config.default+'.png')
    $(".userinfo-dtl__name").text(window.username)
	  $(".userinfo-dtl__holdings").text(currency+numberWithCommas(window.money))

	  if(window.money.toString().split('').length > 8) {
	  // if((currency+numberWithCommas(window.money)).length > 10) {
	      $(".userinfo-dtl__holdings").wrap("<div class='marquee'>")
	  }

	},
	createMain () {
		if (this.container && this.container.children.length) {
			this.container.removeAllChildren();
		}
		let header_mask = new createjs.Shape();
		header_mask.graphics.beginFill("#191919").drawRect(0,0,1248,244);
		header_mask.x = 56;
		header_mask.y = 33;
		// this.addChild(header_mask);
		this.container.addChild(header_mask);

		let image_arr = ["red-white_banner", "dragon-bonus_banner", "super-six_banner","reel-games_banner","mahjong_banner", "roulette_banner"]

		let banner_data = [
			{
				banner_image : "poker-bonus_banner",
				gameName : "poker-bonus",
				icon : "",
				src : "/img/banner/regular-theme/lobby/poker-bonus_banner.png",
			},
			{
				banner_image : "mahjong_banner",
				gameName : "mahjong",
				icon : "",
				src : "/img/banner/regular-theme/lobby/pai-gow_banner.png"
			},
			{
				banner_image : "dragon-bonus_banner",
				gameName : "dragon-bonus",
				icon : "",
				src : "/img/banner/regular-theme/lobby/dragon-bonus_banner.png",
			},
			{
				banner_image : "super-six_banner",
				gameName : "super-six",
				icon : "",
				src : "/img/banner/regular-theme/lobby/super-six_banner.png",
			},
			{
				banner_image : "roulette_banner",
				gameName : "roulette",
				icon : "",
				src : "/img/banner/regular-theme/lobby/roulette_banner.png"
			},
			{
				banner_image : "red-white_banner",
				gameName : "redwhite",
				icon : "",
				src : "/img/banner/regular-theme/lobby/red-white_banner.png"
			},
			{
				banner_image : "reel-games_banner",
				gameName : "reel-games",
				icon : "",
				src : "/img/banner/regular-theme/lobby/reel-games_banner.png",
			}
		]

		this.createAds(banner_data);

		this.hot_games_container = new createjs.Container();
		this.container.addChild(this.hot_games_container);
		this.hot_games_container.y = 340;

		this.hot_game = [];

		let hot_live_tables_label = new createjs.Text(window.language.lobby.hotlivecaps,"bold 25px arvoBold","#e9ac4a");
		hot_live_tables_label.x = 56;
		hot_live_tables_label.y = 300;
		this.container.addChild(hot_live_tables_label);

		// === Notice
		this.announcementCon  = new createjs.Container();
		this.announcementStage.addChild(this.announcementCon);
		this.announcementCon.x = 0;
		this.announcementCon.visible = false;

		// if (window.all_tables.length) {
		// 	if (window.all_tables[0].mainNotice) {
		// 		if (parseInt(window.all_tables[0].mainNotice.status)) {
		// 			if(this.announcementStage.children.length) this.announcementStage.removeAllChildren();
		// 			this.setAnnouncement(window.all_tables[0].mainNotice)
		// 			this.announcementStage.addChild(this.announcementCon);
		// 		}
		// 	}
		// }
	},
	createAds (data) {
		let header_mask = new createjs.Shape();
		header_mask.graphics.beginFill("red").drawRect(0,0,1248,244);
		header_mask.x = 56;
		header_mask.y = 33;

		this.indi_ads = []

		for(var x = 0;x < data.length; x++) {
			this.indi_ads[x] = new createjs.Container();
			this.indi_ads[x].mask = header_mask;

			this.ads[x] = new createjs.Bitmap(data[x].src);
			this.ads[x].x = 50;
			this.ads[x].y = 30;
			this.indi_ads[x].addChild(this.ads[x]);
			this.ads[x].scaleX = this.ads[x].scaleY = 1.2;

			if(data[x].gameName == "redwhite") {
				this.ads[x].redwhite_icon = new createjs.Bitmap("/img/banner/red-white-banner_ico.png");

				this.ads[x].new_game_text =  new createjs.Text(window.language.lobby.comingsooncaps,"bold 40px ArvoItalic","#f0e183");
				this.ads[x].new_game_text.y = 90;

				if(window.language.locale == "zh") {
					this.ads[x].redwhite_icon.x = 980;
					this.ads[x].redwhite_icon.y = 140;
					this.ads[x].redwhite_icon.scaleX = this.ads[x].redwhite_icon.scaleY = 0.5;
					this.ads[x].new_game_text.x = 985;
				} else {
					this.ads[x].redwhite_icon.x = 820;
					this.ads[x].redwhite_icon.y = 140;
					this.ads[x].redwhite_icon.scaleX = this.ads[x].redwhite_icon.scaleY = 0.46;
					this.ads[x].new_game_text.x = 880;
				}

				this.ads[x].text1 =  new createjs.Text(window.language.statistics.redcaps,"60px arvobolditalic","#d12f22");
				this.ads[x].text1.x = this.ads[x].redwhite_icon.x + 60;
				this.ads[x].text1.y = this.ads[x].redwhite_icon.y - 12;

				this.ads[x].text2 =  new createjs.Text(window.language.statistics.whitecaps,"60px arvobolditalic","#fff");
				this.ads[x].text2.y = this.ads[x].text1.y;

				if(window.language.locale == "zh") {
					this.ads[x].text2.x = (this.ads[x].text1.x + 55) + 10;
				} else {
					this.ads[x].text2.x = this.ads[x].text1.x + 120;
				}

				this.indi_ads[x].addChild(this.ads[x].new_game_text, this.ads[x].text1,this.ads[x].text2, this.ads[x].redwhite_icon);

			}  //END REDWHITE

			else if(data[x].gameName == "reel-games") {
				this.ads[x].reel_icon = new createjs.Bitmap("/img/banner/reel-games-banner_ico.png");
				this.ads[x].reel_icon.scaleX = this.ads[x].reel_icon.scaleY = 0.5;
				this.ads[x].reel_icon.y = 90;

				if(window.language.locale == "zh") {
					this.ads[x].reel_icon.x = 800;
				} else {
					this.ads[x].reel_icon.x = 760;
				}

				this.ads[x].text1 =  new createjs.Text(window.language.lobby.reelcaps,"60px arvobolditalic","#ffb74c");
				this.ads[x].text1.y = this.ads[x].reel_icon.y - 10;
				this.ads[x].text1.x = this.ads[x].reel_icon.x + 70;

				this.ads[x].text2 =  new createjs.Text(window.language.lobby.gamescaps,"60px arvobolditalic","#f57b00");
				this.ads[x].text2.y = this.ads[x].reel_icon.y - 10;

				// this.ads[x].newtext =  new createjs.Text(window.language.lobby.newcaps,"bold 30px LatoBold","#462f04");
				// this.ads[x].newtext.y = 30;
				// this.ads[x].newtext.rotation = 45;

				if(window.language.locale == "zh") {
					this.ads[x].text2.x = (this.ads[x].text1.x + 150) + 40;
					// this.ads[x].newtext.font = "bold 40px LatoBold";
					// this.ads[x].newtext.x = 1270;
				} else {
					this.ads[x].text2.x = (this.ads[x].text1.x + 150) + 10;
					// this.ads[x].newtext.x = 1250;
				}

				this.indi_ads[x].addChild(this.ads[x].text1,this.ads[x].text2, this.ads[x].reel_icon);

			} //END REEL GAMES

			else if (data[x].gameName == "dragon-bonus") {
				// this.ads[x].text1 =  new createjs.Text(window.language.lobby.dragoncaps,"55px arvobolditalic","#f1e283");
				this.ads[x].text1 =  new createjs.Text("DRAGON","55px arvobolditalic","#f1e283");
				this.ads[x].text1.y = 90;
				this.ads[x].text1.x = 750;

				this.ads[x].text2 =  new createjs.Text("BONUS","55px arvobolditalic","#d8bd69");
				// this.ads[x].text2 =  new createjs.Text(window.language.lobby.bonusdragoncaps,"55px
				//  arvobolditalic","#d8bd69");
				this.ads[x].text2.y = this.ads[x].text1.y;
				this.ads[x].text2.x = (this.ads[x].text1.x + 240) + 29;

				// this.ads[x].newtext =  new createjs.Text(window.language.lobby.newcaps,"bold 30px LatoBold","#462f04");
				// this.ads[x].newtext.y = 30;
				// this.ads[x].newtext.rotation = 45;

				// if(window.language.locale == "zh") {
				// 	this.ads[x].newtext.font = "bold 40px LatoBold";
				// 	this.ads[x].newtext.x = 1270;
				// } else {
				// 	this.ads[x].newtext.x = 1250;
				// }

				this.indi_ads[x].addChild(this.ads[x].text1, this.ads[x].text2);

			} //END dragon-bonus banner

			else if (data[x].gameName == "super-six") {
				this.ads[x].text1 =  new createjs.Text(window.language.lobby.supercaps,"60px arvobolditalic","#f1e283");
				this.ads[x].text1.y = 90;
				this.ads[x].text2 =  new createjs.Text(window.language.lobby.sixcaps,"60px arvobolditalic","#d8bd69");
				this.ads[x].text2.y = this.ads[x].text1.y ;

				// this.ads[x].newtext =  new createjs.Text(window.language.lobby.newcaps,"bold 30px LatoBold","#462f04");
				// this.ads[x].newtext.y = 30;
				// this.ads[x].newtext.rotation = 45;

				if(window.language.locale == "zh") {
					this.ads[x].text1.x = 910;
					this.ads[x].text2.x = (this.ads[x].text1.x + 110) + 15;
					// this.ads[x].newtext.font = "bold 40px LatoBold";
					// this.ads[x].newtext.x = 1270;
				} else {
					this.ads[x].text1.x = 880;
					this.ads[x].text2.x = (this.ads[x].text1.x + 185) + 35;
					// this.ads[x].newtext.x = 1250;
				}

				this.indi_ads[x].addChild(this.ads[x].text1, this.ads[x].text2);

			} //END super-six banner

			else if (data[x].gameName == "poker-bonus") {
				this.ads[x].text1 = new createjs.Text(/*window.language.lobby.pokercaps*/"POKER","55px arvobolditalic","#f1e283");
				this.ads[x].text1.y = 60;
				this.ads[x].text1.x = 780;

				this.ads[x].text2 = new createjs.Text(/*window.language.lobby.bonuspokercaps*/"BONUS","55px arvobolditalic","#d8bd69");
				this.ads[x].text2.y = this.ads[x].text1.y;
				this.ads[x].text2.x = (this.ads[x].text1.x + 190) + 30;

				this.ads[x].text3 = new createjs.Text(/*window.language.lobby.pluspokercaps*/ "PLUS","55px arvobolditalic","#b53131");
				this.ads[x].text3.y = this.ads[x].text1.y + 60;
				this.ads[x].text3.x = this.ads[x].text1.x + 130;

				// this.ads[x].newtext = new createjs.Text(window.language.lobby.newcaps,"bold 30px LatoBold","#462f04");
				// this.ads[x].newtext.y = 30;
				// this.ads[x].newtext.rotation = 45;

				// if(window.language.locale == "zh") {
				// 	this.ads[x].newtext.font = "bold 40px LatoBold";
				// 	this.ads[x].newtext.x = 1270;
				// } else {
				// 	this.ads[x].newtext.x = 1250;
				// }

				this.indi_ads[x].addChild( this.ads[x].text1, this.ads[x].text2, this.ads[x].text3);

			} //END poker-bonus banner

			else if (data[x].gameName == "roulette") {
				this.ads[x].roulette_icon = new createjs.Bitmap("/img/banner/roulette-banner_ico.png");
				this.ads[x].roulette_icon.x = 820;
				this.ads[x].roulette_icon.y = 140;
				this.ads[x].roulette_icon.scaleX = this.ads[x].roulette_icon.scaleY = 0.46;

				this.ads[x].roulette =  new createjs.Text(window.language.lobby.roulettecaps,"60px arvobolditalic","#d1301e");
				this.ads[x].roulette.y = this.ads[x].roulette_icon.y - 11;
				this.ads[x].roulette.x = this.ads[x].roulette_icon.x + 60;

				this.ads[x].comingsoon_text =  new createjs.Text(window.language.lobby.comingsooncaps,"bold 40px ArvoItalic","#e8d478");
				this.ads[x].comingsoon_text.x = this.ads[x].roulette_icon.x + 90;
				this.ads[x].comingsoon_text.y = 90;

				if(window.language.locale == "zh") {
					this.ads[x].roulette_icon.x = 980;
					this.ads[x].roulette.x = this.ads[x].roulette_icon.x + 60;
					this.ads[x].comingsoon_text.x = this.ads[x].roulette_icon.x + 10;
				} else if (window.language.locale == "kr") {
					this.ads[x].roulette.text = "ROULETTE";
				}
				this.indi_ads[x].addChild(this.ads[x].comingsoon_text, this.ads[x].roulette, this.ads[x].roulette_icon);

			} //END roulette banner

			else if (data[x].gameName == "mahjong") {
				this.ads[x].mahjong_icon = new createjs.Bitmap("/img/banner/mahjong-banner_ico.png");
				this.ads[x].mahjong_icon.x = 640;
				this.ads[x].mahjong_icon.y = 140;
				this.ads[x].mahjong_icon.scaleX = this.ads[x].mahjong_icon.scaleY = 0.49;

				this.ads[x].pai =  new createjs.Text("PAI","52px arvobolditalic","#d1301e");
				this.ads[x].pai.y = this.ads[x].mahjong_icon.y - 7;
				this.ads[x].pai.x = this.ads[x].mahjong_icon.x + 50;

				this.ads[x].gow =  new createjs.Text("GOW","52px arvobolditalic","#3271b4");
				this.ads[x].gow.y = this.ads[x].pai.y;
				this.ads[x].gow.x = (this.ads[x].pai.x + 85);

				this.ads[x].mahjong =  new createjs.Text("MAHJONG","52px arvobolditalic","#c4c4c4");
				this.ads[x].mahjong.y = this.ads[x].pai.y;
				this.ads[x].mahjong.x = (this.ads[x].gow.x + 120) + 30;;

				this.ads[x].comingsoon = new createjs.Text(window.language.lobby.comingsooncaps,"bold 40px ArvoItalic", "#d22e22");
				this.ads[x].comingsoon.x = 910;
				this.ads[x].comingsoon.y = 90;

				if(window.language.locale == "zh") {
					this.ads[x].comingsoon.x = this.ads[x].pai.x + 380;
					// this.ads[x].comingsoon.y = 100;

					// this.ads[x].mahjong_icon.scaleX = this.ads[x].mahjong_icon.scaleY = 0.5;
					// this.ads[x].mahjong_icon.x = 345;
					//
					// this.ads[x].pai.text = "牌九";
					// this.ads[x].pai.font = "bold 57px ArvoItalic";
					// this.ads[x].pai.y = this.ads[x].mahjong_icon.y - 10;
					// this.ads[x].mahjong.text = "";
					// this.ads[x].pai.x = this.ads[x].mahjong_icon.x + 50;
				}
				this.indi_ads[x].addChild(this.ads[x].mahjong_icon, this.ads[x].pai, this.ads[x].mahjong, this.ads[x].gow , this.ads[x].comingsoon);

			} //END mahjong_banner banner

			// === for play bittons

      this.ads[x].enter_button = new createjs.Shape();
      this.ads[x].enter_button.graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,200,37,20);
      this.ads[x].enter_button.cursor = 'pointer';
      this.ads[x].enter_button.y = 165;

      this.ads[x].enter_text = new createjs.Text(window.language.lobby.playnow,"22px latoblack", "#462f04");
      this.ads[x].enter_text.shadow = new createjs.Shadow("#fbf956",0,1.5,0)
      this.ads[x].enter_text.textAlign = "center";
      this.ads[x].enter_text.textBaseline = "middle";
      this.ads[x].enter_text.hitArea = this.ads[x].enter_button;

			if(data[x].gameName == "reel-games") {
				if(!parseInt(window.reel_yn) || window.isBanker) {
					this.ads[x].enter_button.visible = false;
					this.ads[x].enter_text.visible = false;
				}

				if(window.language.locale == "zh") {
					this.ads[x].enter_text.font = "23px latoblack";
					this.ads[x].enter_button.x = 900;
					this.ads[x].enter_text.x = this.ads[x].enter_button.x + (200/2) + 5;
				} else {
					this.ads[x].enter_button.x = 900;
					this.ads[x].enter_text.x = this.ads[x].enter_button.x + (200/2) + 5;
				}

				this.ads[x].enter_text.y = this.ads[x].enter_button.y + (35/2);

				this.ads[x].enter_button.on("click",(e) => {
					if(window.reel_yn == 0 || window.game_settings.sicbo == 1 || window.game_settings.paigow == 1) return;
					
					$('.sidebar').css({'width' : '231px'});
					$('.sidebar--lobby').hide();
					$('.header-game__items').removeClass("active");
					$('#reelgames').addClass("active");
					$('.sidebar--game, .header-subnav.reelgames').css({'display': 'block'});
					this.context.toggle.toggleReelGames('ka_gaming');
				});

				this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);
			} // END reel games BUTTONS
			else if (data[x].gameName == "dragon-bonus") {
				this.ads[x].enter_button.viewPage = 'sub_bonus';
				// this.ads[x].enter_button.viewPage = data[x].gameName == "dragon-tiger" ? "sub_dragonTiger" : "reel_games";

				if(window.language.locale == "zh") {
					this.ads[x].enter_text.font = "23px latoblack";
					this.ads[x].enter_button.x = 920;
					this.ads[x].enter_text.x = this.ads[x].enter_button.x + (200/2) + 5;
					this.ads[x].enter_button.y = 165;
				} else {
					this.ads[x].enter_button.x = 920;
					this.ads[x].enter_text.x = this.ads[x].enter_button.x + (200/2) + 5;
					this.ads[x].enter_button.y = 165;
				}

				this.ads[x].enter_text.y = this.ads[x].enter_button.y + (35/2);

				this.ads[x].enter_button.on("click",(e)=>{
					$('.sidebar').css({'width' : '231px'});
					$('.sidebar--lobby').hide();
					$('.header-game__items,.header-subnav__items').removeClass("active");
					$('#livegames, #bonus').addClass("active");
					$('.sidebar--game, .header-subnav:not(.reelgames)').css({'display': 'block'});

					$(".hot-container").hide();
			    $(".main-container").show();
			    $(".banner-container").show();
					this.context.toggle.toggleBaccarat('dragonbonus', 'thumbnail');
				});

				this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);
			} // END DRAGON TIGER BONUS BUTTONS
			else if (data[x].gameName == "super-six") {
				this.ads[x].enter_button.viewPage = 'sub_supersix';
				this.ads[x].enter_button.x = 900;
				this.ads[x].enter_text.y = this.ads[x].enter_button.y  + (35/2);
				this.ads[x].enter_text.x = this.ads[x].enter_button.x + (200/2) + 5;

				this.ads[x].enter_button.on("click",(e)=>{
					$('.sidebar').css({'width' : '231px'});
					$('.sidebar--lobby').hide();
					$('.header-game__items, .header-subnav__items').removeClass("active");
					$('#livegames, #supersix').addClass("active");
					$('.sidebar--game, .header-subnav:not(.reelgames)').css({'display': 'block'});

					$(".hot-container").hide();
			    $(".main-container").show();
			    $(".banner-container").show();

					this.context.toggle.toggleBaccarat('supersix', 'thumbnail');
				});

				this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);
			} // END DRAGON TIGER BONUS BUTTONS
			else if (data[x].gameName == "poker-bonus") {
				this.ads[x].enter_button.viewPage = 'sub_poker';
				this.ads[x].enter_button.x = 890;
				this.ads[x].enter_text.x = this.ads[x].enter_button.x + (200/2) + 5;
				this.ads[x].enter_button.y = 190;

				this.ads[x].enter_text.y = this.ads[x].enter_button.y + (35/2);

				this.ads[x].enter_button.on("click",(e)=>{
					$('.sidebar').css({'width' : '231px'});
					$('.sidebar--lobby').hide();
					$('.sidebar--game, .header-subnav:not(.reelgames)').css({'display': 'block'});
					$('.header-game__items, .header-subnav__items').removeClass("active");
					$('#livegames, #poker').addClass("active");

					$(".hot-container").hide();
			    $(".main-container").show();
			    $(".banner-container").show();
					this.context.toggle.togglePoker();
				});

				this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);
			} // END DRAGON TIGER BONUS BUTTONS

			this.indi_ads[x].on("click", (e) =>{
				if(e.target.alpha == 0) e.stopPropagation();
			});
			this.container.addChild(this.indi_ads[x]);
			// this.addChild(this.indi_ads[x]);
			// this.ads[x].y = -180;

		} //END FORLOOP

		this.ads_container = new createjs.Container();
		this.container.addChild(this.ads_container);
		// this.addChild(this.ads_container);
		this.ads_container.mask = header_mask;

		for(var x = 0;x < data.length; x++) {
			this.circle_indicator[x] = new createjs.Shape();
			this.circle_indicator[x].graphics.beginFill("#fff").drawCircle(0,0,6);
			// this.circle_indicator[x].x = (x*28) + 680
			this.circle_indicator[x].x = (x*28) + 580
			this.circle_indicator[x].y = 255
			this.circle_indicator[x].alpha = 0.5;
			this.circle_indicator[x].active = false;
			this.circle_indicator[x].cursor = 'pointer';
			this.ads_container.addChild(this.circle_indicator[x]);
		}

		this.playAds();
	},
	playAds (position = 0) {
		if(!this.ads.length) return;

		this.circle_indicator[0].alpha = 1;

		for(var x = 0; x < this.ads.length; x++  ) {
			this.indi_ads[x].alpha = 0
			this.indi_ads[0].alpha = 1

			createjs.Tween.removeTweens(this.indi_ads[x]);
			this.indi_ads[x].alpha = 0;
			createjs.Tween.removeTweens(this.circle_indicator[x]);
			this.circle_indicator[x].alpha = 0.5;

			createjs.Tween.get(this.indi_ads[x],{loop:true})
			.wait(4000*x)
			.to({
				alpha: 1
			},(500))
			.wait(4000)
			.to({
				alpha : 0
			},(500)).wait(4000 * ((this.ads.length - 1)-x))
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
			.wait(4000* ((this.ads.length - 1)-x))
			.setPosition(position)

			this.circle_indicator[x].addEventListener("click", (e) => {
				if(this.activeBanner != e.target.index)
				{
					this.playAds(e.target.index * 4000);
				}

			});

		} //end for
	},
	/** hot 4 tables */
	hot_games : [],
	hotLiveGames : [],
	createHotGames(data) {
		if(!this.hot_stages.length) {
			for(var x = 0; x < 4; x++) {
				let h = document.createElement("canvas");
				$(h).attr({
					'id' : 'hot-game-'+x,
					'width' : '610px',
					'height' : '280px'
				})

				$(h).css({
					'left' : (x > 1 ? ((x-2)* 634) + 54 : (x* 634) + 54) + 'px',
					'top' : x > 1 ?'885px' : '575px',
					'transform' : 'translate(0%, -50%)'
				})

				$(".hot-container").append(h);

				this.hot_stages[x] = new createjs.Stage("hot-game-"+x)
				this.hot_stages[x].is_maintenance = false;
				this.hot_stages[x].enableMouseOver(10)
			}
		}

		if(this.hot_stages.length) {
			this.hot_stages.forEach((s) => {
				s.removeAllChildren();
			});
		}

		this.tables = [];

		let game_name_bg = ["#00838f","#005145"];
		let text_color = "#edc54e";
		let mask_name = [];
		let mask = [];

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
					} //endif
				}// end for
			}// end if
		} // end for

		for (var i = 0; i < hotGames.length; i++) {
			imageArr.push(hotGames[i] == 'dragon-tiger' ? 'rightside-dragontiger' : 'rightside-'+hotGames[i]);
		}

		for(var x = 0; x < 4; x++) {
			this.tables[x] = new createjs.Shape();
			this.tables[x].graphics.beginFill("#fff").drawRect(0,180,608,100);
			this.tables[x].setBounds(0,0,608,280);
			this.hot_stages[x].addChild(this.tables[x]);

			if (emptySlot) {
				if (x >= data.length) {
					this.hot_stages[x].is_maintenance = true;
					this.tables[x].graphics.clear().beginFill("#262626").drawRect(0,0,610,285);

					leftPattern[x] = new createjs.Bitmap("/img/maintenance/s_pattern_left.png");
					leftPattern[x].x = this.tables[x].x;
					leftPattern[x].y = this.tables[x].y;
					leftPattern[x].alpha = 0.2;
					leftPattern[x].scaleX = leftPattern[x].scaleY = 0.5;
					this.hot_stages[x].addChild(leftPattern[x]);

					rightPattern[x] = new createjs.Bitmap("/img/maintenance/s_pattern_right.png");
					rightPattern[x].x = this.tables[x].x + 466;
					rightPattern[x].y = this.tables[x].y + 150;
					rightPattern[x].alpha = 0.2;
					rightPattern[x].scaleX = rightPattern[x].scaleY = 0.6;
					this.hot_stages[x].addChild(rightPattern[x]);

					gameImg[x] = new createjs.Bitmap("/img/howtoplay/lobby/"+imageArr[x]+'.png');
					gameImg[x].x = this.tables[x].x + 175;
					gameImg[x].y = this.tables[x].y - 20;
					gameImg[x].skewX = gameImg[x].skewY = 25;
					gameImg[x].scaleX = gameImg[x].scaleY = 0.5;
					this.hot_stages[x].addChild(gameImg[x]);

					if (imageArr[x] == 'rightside-poker') {
						gameImg[x].y -= 10;
					}

					nihtanLogo[x] = new createjs.Bitmap("/img/maintenance/logo.png");
					nihtanLogo[x].x = this.tables[x].x + 290;
					nihtanLogo[x].y = this.tables[x].y + 130;
					nihtanLogo[x].scaleX = nihtanLogo[x].scaleY = 0.4;
					this.hot_stages[x].addChild(nihtanLogo[x]);
					this.hot_stages[x].is_tween = true
					continue;
				}
			}
			// this.tables[x].x = (x*(this.tables[x].getBounds().width+32)) + 57;

			if(data[x].gameName.indexOf("icbo") > -1) {
				this.tables[x].image = new createjs.Bitmap(this.context.load.getResources("hot-sicbo"));
			} else if(data[x].gameName.indexOf("accarat") >-1) {
				this.tables[x].image = new createjs.Bitmap(this.context.load.getResources("hot-baccarat"));
			} else if(data[x].gameName.indexOf("oker") >-1) {
				this.tables[x].image = new createjs.Bitmap(this.context.load.getResources("hot-poker"));
			} else if(data[x].gameName.indexOf("iger") >-1) {
				this.tables[x].image = new createjs.Bitmap(this.context.load.getResources("hot-dragontiger"));
			}
			let w = 608;

			this.tables[x].image.x = this.tables[x].x;
			this.tables[x].img_mask = new createjs.Shape();
			this.tables[x].img_mask.graphics.beginFill("#424242").drawRoundRectComplex(0,0,w,200,0,20,0,0);
			this.tables[x].img_mask.x =this.tables[x].x
			this.tables[x].img_mask.y =this.tables[x].y
			this.hot_stages[x].addChild(this.tables[x].img_mask);

			this.tables[x].image.y = this.tables[x].y - 18;
			this.tables[x].image.mask = this.tables[x].img_mask
			this.tables[x].image.scaleY = this.tables[x].image.scaleX = 1.12;
			this.tables[x].image.target_parent = this.tables[x];
			this.hot_stages[x].addChild(this.tables[x].image);

			this.tables[x].roadmap_bg = new createjs.Shape();
			this.tables[x].roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,608,90);
			this.tables[x].roadmap_bg.cache(0,0,608,90);
			this.tables[x].roadmap_bg.x = this.tables[x].x;
			this.tables[x].roadmap_bg.y = this.tables[x].y+ 280 - 90;
			this.hot_stages[x].addChild(this.tables[x].roadmap_bg);

			let roadmap_bg = new createjs.Shape();
			roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,607.6,90);
			roadmap_bg.y = (this.tables[x].y)  + 190 ;
			roadmap_bg.x = this.tables[x].x;
			roadmap_bg.cache(0,0,607.6,90);
			this.hot_stages[x].addChild(roadmap_bg);

			this.hot_stages[x].update();

			let lines = new createjs.Shape();
			lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0,29);

			this.hot_stages[x].addChild(lines);

			let posY =  roadmap_bg.y;
			let posX =  roadmap_bg.x

			for(var i = 0; i <= 6 ; i++) {
				lines.graphics.moveTo(posX,posY+ (15*i)).lineTo(posX + 607, posY+ (15*i))
			}
			lines.graphics.moveTo(posX,posY)
			for(var i = 0; i <= 41 ; i++) {
				lines.graphics.moveTo(posX+(14.82*i),posY).lineTo(posX+(14.82*i),posY + 90)
			}

			// lines.shadow = new createjs.Shadow("#000",3,3,5);
			lines.alpha =.5;

			let gameStr = '';
			switch(data[x].gameName) {
				case "Baccarat":
        if (data[x].roomType == "p") {
          gameStr = window.language.lobby.baccarat + " " + window.language.level.premium;
        } else if (data[x].roomType == "v") {
          gameStr = window.language.lobby.baccarat + " " + window.language.level.vip;
        } else {
          gameStr = window.language.lobby.baccarat;
        }
				// gameStr = window.language.lobby.baccarat;
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
			} else if(data[x].roomType == "v") {
				game_name_bg = ["#fedd78","#d5a515"];
				text_color = "#000";
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
			this.hot_stages[x].bet_range_length = data[x].sportBetRanges.length;

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
			this.hot_stages[x].addChild(this.tables[x].game_name_bg)

			// === game number
			this.tables[x].table_num = new createjs.Text(data[x].tableNumber.length > 1 ? data[x].tableNumber : "0"+data[x].tableNumber, "bold 20px latoblack", text_color);
			this.tables[x].table_num.x = this.tables[x].game_name_bg.x + 20;
			this.tables[x].table_num.y = this.tables[x].game_name_bg.y + 5;
			this.hot_stages[x].addChild(this.tables[x].table_num);

			//PM-0918 kr,jp,en
			let name_posY = 6;
			if(window.language.locale == "kr"){
				name_posY = 6;
			}

			this.tables[x].game_name = new createjs.Text(gameStr, "20px ArvoItalic", text_color);
			this.tables[x].game_name.x = this.tables[x].game_name_bg.x + 50;
			this.tables[x].game_name.y = this.tables[x].game_name_bg.y + name_posY; //new
			this.hot_stages[x].addChild(this.tables[x].game_name);

			this.tables[x].namespace = data[x].gameName+"/"+data[x].tableNumber

			if(window.language.locale == "zh") {
				this.tables[x].game_name.font = "27px ArvoItalic";
				this.tables[x].game_name.y = this.tables[x].game_name_bg.y + name_posY - 5;
			}

			this.tables[x].roadmap_container = new createjs.Container();
			this.tables[x].roadmap_container.x = this.tables[x].x;
			this.tables[x].roadmap_container.y = this.tables[x].y + 190;
			// this.tables[x].roadmap_container.shadow = new createjs.Shadow("#949494",1,1,2);
			this.hot_stages[x].addChild(this.tables[x].roadmap_container);
			this.makeRoadmap(data[x], x);

			mask[x] = new createjs.Shape();
			mask[x].graphics.beginFill("red").drawRect(0,0,608,280);
			mask[x].x = this.tables[x].game_name_bg.x;
			mask[x].y = this.tables[x].game_name_bg.y;

			this.tables[x].bet_range_container = new createjs.Container();

			this.tables[x].bet_range_container.x = (this.tables[x].x + 25) - xPos;
			this.tables[x].bet_range_container.xPOsition = (this.tables[x].x + 25) - xPos;

			this.tables[x].bet_range_container.y = 410 - 360;
			this.tables[x].bet_range_container.target_parent = this.tables[x]

			if(x == 3) {
				this.tables[x].bet_range_container.y = 410 - 360;
			} else if(x ==1) {
				this.tables[x].bet_range_container.y = 410 - 360;
			}

			this.tables[x].bet_range_container.mask = mask[x];
			this.hot_stages[x].addChild(this.tables[x].bet_range_container)

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

				let dividend = null;
				if (window.casino == 'SS') {
					dividend = 1000;
				}
				else {
					dividend = 1;
				}

				let betRangeMin = (data[x].sportBetRanges[i].min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
				let betRangeMax = (data[x].sportBetRanges[i].max * parseInt(window.currencyMultiplier)) * window.userMultiplier;

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

				this.tables[x].bet_range_container.addEventListener("mouseover",(e)=> {
					if(e.target.text) {
						e.target = e.target.hitArea
					}
					if(e.target.button) {
						e.target.hover(e.target)
					}
				})
				this.tables[x].bet_range_container.addEventListener("mouseout",(e)=> {
					if(e.target.text) {
						e.target = e.target.hitArea
					}
					if(e.target.button) {
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
						if(e.target.gamename == "Baccarat" || e.target.gamename == "Dragon-Tiger") {
							window.location.href = e.target.redirect_link + "/"+0
						} else {
							window.location.href = e.target.redirect_link
						}
					}
				});

				var Ease = createjs.Ease; // shortcut.
				this.hot_stages[x].addEventListener("mouseenter",  (e) => {
					if(e.currentTarget.is_maintenance) return;
					if(!e.currentTarget.is_hover) {
						e.currentTarget.is_hover = true
						createjs.Tween.get(e.currentTarget.children[0].bet_range_container)
						.to({
							x : e.currentTarget.children[0].x + 24
						}, 300, Ease.bounceOut)

						createjs.Tween.get(e.currentTarget.children[0].game_name_bg.mask)
						.to({
							x: (e.currentTarget.children[0].x)
						},300,Ease.bounceOut)
					}
				});

				this.hot_stages[x].addEventListener("mouseleave",  (e) => {
					if(e.currentTarget.is_maintenance) return;
					if(e.currentTarget.is_hover) {
						e.currentTarget.is_hover = false
						e.currentTarget.is_tween = true
						if(e.currentTarget.children[0].namespace.indexOf('Poker') > -1) {
							createjs.Tween.get(e.currentTarget.children[0].bet_range_container)
							.to({
								x :  e.currentTarget.children[0].x - 510
							}, 300)
							.call(()=>{
								e.currentTarget.stage.update();
								e.currentTarget.is_tween = false;
							})

							createjs.Tween.get(e.currentTarget.children[0].game_name_bg.mask)
							.to({
								x: (e.currentTarget.children[0].x - 255)
							},300)
							.call(()=>{
								e.currentTarget.stage.update();
									e.currentTarget.is_tween = false;
							})

						} else {
							createjs.Tween.get(e.currentTarget.children[0].bet_range_container)
							.to({
								x : (e.currentTarget.children[0].x + 24) - 255
							}, 300)
							.call(()=>{
								e.currentTarget.stage.update();
								e.currentTarget.is_tween = false;
							})

							createjs.Tween.get(e.currentTarget.children[0].game_name_bg.mask)
							.to({
								x: (e.currentTarget.children[0].x)
							},300)
							.call(()=>{
								e.currentTarget.stage.update();
									e.currentTarget.is_tween = false;
							});
						}


					}
				});
			} // end for

			this.hot_stages[x].update();
		}
	},
	makeRoadmap(data,x) {
		this.tables[x].roadmap_container.cache(0, 0, 608, 90);
		this.tables[x].roadmap_container.removeAllChildren();

		if(data.gameName == "Baccarat") {
			let rm_data = formatData.fnFormatBCBigRoad(data.marks,6,41);

			for(var i = 0; i < rm_data.matrix.length; i++) {
				for(var e = 0; e < rm_data.matrix[i].length; e++) {
					if(rm_data.matrix[i][e] === undefined) continue;
					let sp = createSpriteRoadMap(this.context.load.getResources("roadmap-16") , 16,16, sp);
					// rm_data[e][i].x = (e*18.5) + 1.5;
					// rm_data[e][i].y = (i*18.5) + 1.5;
					sp.x = (e*14.8) + 0.5;
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
							tie_text.y = sp.y + 8 + 2;
							tie_text.x = sp.x  + 10;
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
			let rm_data = formatData.fnFormatSicbo(data.marks,40,6).size;
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


		// setTimeout(() => {
			// console.log("::::", this.tables[x].roadmap_container.getBounds(), data.gameName, x);
			// let kk = new createjs.Shape();
			// kk.graphics.beginFill("#a0a").drawRect(0, 0, 608, 90);
			// kk.alpha = 0.4;
			// this.tables[x].roadmap_container.addChild(kk);
			this.tables[x].roadmap_container.updateCache();
			this.hot_stages[x].update();
		// }, 500);
	},
	// setAnnouncement(data) {
	// 	this.announcementCon.removeAllChildren();

	// 	if (parseInt(data.status)) {
	// 		this.announcementCon.visible = true;
	// 	}
	// 	else {
	// 		this.announcementCon.visible = false;
	// 		return;
	// 	}

	// 	let announceText;
	// 	let announceMessage = JSON.parse(data.content);
	// 	let message = window.language.locale == 'zh' ? announceMessage['cn'] : announceMessage[window.language.locale];

	// 	if (parseInt(data.time_yn)) {
	// 		let newStartTime = setCurrentTimezone(data.start_time);
	// 		let newEndTime = setCurrentTimezone(data.end_time);
	// 		announceText = `${newStartTime} ~ ${newEndTime} ${message}`;
	// 	}
	// 	else {
	// 		announceText = message;
	// 	}

	// 	let announcementIconBg = new createjs.Shape();
	// 	announcementIconBg.graphics.beginFill('#f1e382').drawRect(0,0,60,55);
	// 	this.announcementCon.addChild(announcementIconBg);

	// 	let announcementIcon = new createjs.Bitmap(this.context.load.getResources('notice_ico'));
	// 	announcementIcon.x = announcementIconBg.x + 13;
	// 	announcementIcon.y = announcementIconBg.y + 8;
	// 	announcementIcon.scaleX = announcementIcon.scaleY = 0.6;
	// 	this.announcementCon.addChild(announcementIcon);

	// 	let announcementTextBg = new createjs.Shape();
	// 	announcementTextBg.graphics.beginLinearGradientFill(['#59090a', 'rgba(89, 9, 10, 0.1)'], [0,1],0,0,1300,0).drawRect(0,0,1300,56);
	// 	announcementTextBg.x = 60;
	// 	announcementTextBg.y = -1;
	// 	this.announcementCon.addChild(announcementTextBg);

	// 	let announcementText = new createjs.Text(announceText, '25px lato', '#fff');
	// 	announcementText.x = 70;
	// 	announcementText.y = 12;
	// 	this.announcementCon.addChild(announcementText);

	// 	let textbounds = announcementText.getBounds();

	// 	let marquee_con = new createjs.Container();
	// 	marquee_con.mask = new createjs.Shape();
	// 	marquee_con.mask.graphics.beginFill("#fff").drawRect(0, 0, 1270, textbounds.height + 5);
	// 	marquee_con.mask.x = announcementText.x;
	// 	marquee_con.mask.y = announcementText.y;

	// 	let twin = announcementText.clone();
	// 	twin.x = announcementText.x + textbounds.width + 1000;
	// 	twin.y = announcementText.y;
	// 	marquee_con.addChild(announcementText, twin);

	// 	let marquee = function(obj) {
	// 		let toX = obj.x - (textbounds.width + 1000);
	// 		createjs.Tween.get(obj, {loop:true}).to({
	// 			x : toX
	// 		}, 8000)
	// 	}

	// 	marquee(announcementText);
	// 	marquee(twin);
	// 	this.announcementCon.addChild(marquee_con);
	// },
}

export default {
	component_landing
}
