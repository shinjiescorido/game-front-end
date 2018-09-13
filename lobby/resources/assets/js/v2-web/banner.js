import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, setCurrentTimezone } from '../factories/factories';
import rmformat from '../factories/formatter';
import {instance as lobbyBanner} from './factory/banner';

let component_banner = {
	ads : [],
	circle_indicator: [],
	stage : null,
	getText(x,y,text,font,color,align,valign){
		let ctrl = new createjs.Text(text,font,color);
		ctrl.x = x;
		ctrl.y = y;
		ctrl.textAlign = align;
		ctrl.textBaseline = valign;//"middle"
		return ctrl;
	},
	main() {
		var c = document.createElement("canvas");
		c.setAttribute("id", "banner")
	    c.setAttribute("width", "1900px");
	    c.setAttribute("height", "200px");

		$(c).css({
			top : '0px',
			transform : 'translate(-50%,0)'
		});

		$(".banner-container").append(c);

		this.stage = new createjs.Stage("banner");
		this.stage.enableMouseOver(10);

		this.banner_container = new createjs.Container();
		this.banner_container.set({x : 181, y:-48})
		this.stage.addChild(this.banner_container)

		let banner_mask = new createjs.Shape();
		banner_mask.x = this.banner_container.x;
		banner_mask.y = this.banner_container.y;
		banner_mask.graphics.beginFill("red").drawRect(0,0,1692,250);

		let banner_data = [
			{
				banner_image : "poker-bonus_banner",
				gameName : "poker-bonus",
				icon : "",
				src : "/img/banner/regular-theme/livegames/poker-bonus_banner.png"
			},
			{
				banner_image : "mahjong_banner",
				gameName : "mahjong",
				icon : "",
				src : "/img/banner/regular-theme/livegames/pai-gow_banner.png"
			},
			{
				banner_image : "dragon-bonus_banner",
				gameName : "dragon-bonus",
				icon : "",
				src : "/img/banner/regular-theme/livegames/dragon-bonus_banner.png"
			},
			{
				banner_image : "super-six_banner",
				gameName : "super-six",
				icon : "",
				src : "/img/banner/regular-theme/livegames/super-six_banner.png"
			},
			{
				banner_image : "roulette_banner",
				gameName : "roulette",
				icon : "",
				src : "/img/banner/regular-theme/livegames/roulette_banner.png"
			},
			// {
			// 	banner_image : "banner_img1",
			// 	gameName : "redwhite",
			// 	icon : "",
			// 	src : "/img/banner/regular-theme/livegames/red-white_banner.png"
			// },
			{
				banner_image : "reel-games_banner",
				gameName : "reel-games",
				icon : "",
				src : "/img/banner/regular-theme/livegames/reel-games_banner.png"
			}
		]

		this.createAds(banner_data);

		this.banner_container.mask = banner_mask;

		this.table_banner_container = new createjs.Container();
		this.table_banner_container.set({x : 181, y:-48})
		this.table_banner_container.visible = false;
		this.table_banner_container.mask = banner_mask;
		this.stage.addChild(this.table_banner_container)

		this.userBased_banner_container = new createjs.Container();
		this.userBased_banner_container.set({x : 181, y:-48})
		this.userBased_banner_container.visible = false;
		this.userBased_banner_container.mask = banner_mask;
		this.stage.addChild(this.userBased_banner_container)

		// === Notice
		this.announcementCon  = new createjs.Container();
		this.announcementCon.x = 0;
		this.announcementCon.y = 50;
		this.announcementCon.visible = false;
		this.stage.addChild(this.announcementCon);

		this.stage.update();
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
					this.ads[x].redwhite_icon = new createjs.Bitmap("/img/banner/red-white-banner_ico.png");
					this.ads[x].redwhite_icon.scaleX = this.ads[x].redwhite_icon.scaleY = 0.44;
					this.ads[x].redwhite_icon.y = 130;

					this.ads[x].new_game_text = new createjs.Text(window.language.lobby.comingsooncaps,"bold 37px ArvoItalic","#e8d478");
					this.ads[x].new_game_text.y = 85;

					if(window.language.locale == "zh") {
						this.ads[x].redwhite_icon.x = 1100;
						this.ads[x].new_game_text.x = this.ads[x].redwhite_icon.x + 10;
					} else {
						this.ads[x].redwhite_icon.x = 1000;
						this.ads[x].new_game_text.x = this.ads[x].redwhite_icon.x + 55;
					}

					this.ads[x].text1 =  new createjs.Text(window.language.statistics.redcaps,"57px arvobolditalic","#d12f22");
					this.ads[x].text1.x = this.ads[x].redwhite_icon.x + 60;
					this.ads[x].text1.y = this.ads[x].redwhite_icon.y - 14;

					this.ads[x].text2 =  new createjs.Text(window.language.statistics.whitecaps,"57px arvobolditalic","#fff");
					this.ads[x].text2.y = this.ads[x].redwhite_icon.y - 14;

					if(window.language.locale == "zh") {
						this.ads[x].text2.x = (this.ads[x].text1.x + 55) + 20;
					} else {
						this.ads[x].text2.x = (this.ads[x].text1.x + 115);
					}

					this.indi_ads[x].addChild(this.ads[x].new_game_text, this.ads[x].text1,this.ads[x].text2, this.ads[x].redwhite_icon);
				} //END REDWHITE
				else if(data[x].gameName == "reel-games") {
					this.ads[x].reel_icon = new createjs.Bitmap("/img/banner/reel-games-banner_ico.png");
					this.ads[x].reel_icon.scaleX = this.ads[x].reel_icon.scaleY = 0.445;
					this.ads[x].reel_icon.y = 90;

					// this.ads[x].newtext =  new createjs.Text(window.language.lobby.newcaps,"bold 30px LatoBold","#462f04");
					// this.ads[x].newtext.rotation = 45;

					if(window.language.locale == "zh") {
						this.ads[x].reel_icon.x = 1070;
						// this.ads[x].newtext.font = "bold 40px LatoBold";
						// this.ads[x].newtext.x = 1655;
						// this.ads[x].newtext.y = 50;
					} else {
						this.ads[x].reel_icon.x = 1040;
						// this.ads[x].newtext.x = 1630;
						// this.ads[x].newtext.y = 48;
					}

					this.ads[x].text1 =  new createjs.Text(window.language.lobby.reelcaps,"57px arvobolditalic","#ffb74c");
					this.ads[x].text1.x = this.ads[x].reel_icon.x + 60;
					this.ads[x].text1.y = this.ads[x].reel_icon.y - 13;

					this.ads[x].text2 =  new createjs.Text(window.language.lobby.gamescaps,"57px arvobolditalic","#f57b00");
					this.ads[x].text2.y = this.ads[x].reel_icon.y - 13;

					if(window.language.locale == "zh") {
						this.ads[x].text2.x = (this.ads[x].text1.x + 170) + 20;
					} else {
						this.ads[x].text2.x = (this.ads[x].text1.x + 150) + 10;
					}

					this.indi_ads[x].addChild(this.ads[x].text1,this.ads[x].text2, this.ads[x].reel_icon);
				} //END REEL GAMES
				else if (data[x].gameName == "dragon-bonus") {
					// this.ads[x].text1 =  new createjs.Text(window.language.lobby.dragoncaps,"60px arvobolditalic","#f1e283");
					this.ads[x].text1 =  new createjs.Text("DRAGON","57px arvobolditalic","#f1e283");
					this.ads[x].text1.y = 90;
					this.ads[x].text1.x = 1000;
					// this.ads[x].text2 =  new createjs.Text(window.language.lobby.bonusdragoncaps,"60px arvobolditalic","#d8bd69");
					this.ads[x].text2 =  new createjs.Text("BONUS","57px arvobolditalic","#d8bd69");
					this.ads[x].text2.y = this.ads[x].text1.y;
					this.ads[x].text2.x = (this.ads[x].text1.x + 250 ) + 30;

					this.indi_ads[x].addChild(this.ads[x].text1,this.ads[x].text2);
				} //END nihtan banner
				else if (data[x].gameName == "poker-bonus") {
					this.ads[x].text1 =  new createjs.Text(/*window.language.lobby.pokercaps*/"POKER","45px arvobolditalic","#f1e283");
					this.ads[x].text1.y = 65;
					this.ads[x].text1.x = 1090;
					this.ads[x].text2 =  new createjs.Text(/*window.language.lobby.bonuspokercaps*/"BONUS","45px arvobolditalic","#d8bd69");
					this.ads[x].text2.y = this.ads[x].text1.y;
					this.ads[x].text2.x = (this.ads[x].text1.x + 150) + 30;

					this.ads[x].text3 =  new createjs.Text(/*window.language.lobby.pluspokercaps*/"PLUS","45px arvobolditalic","#b53131");
					this.ads[x].text3.y = this.ads[x].text1.y + 50;
					this.ads[x].text3.x = this.ads[x].text1.x + 110;

					// this.ads[x].newtext =  new createjs.Text(window.language.lobby.newcaps,"bold 30px LatoBold","#462f04");
					// this.ads[x].newtext.rotation = 45;

					// if(window.language.locale == "zh") {
					// 	this.ads[x].newtext.font = "bold 40px LatoBold";
					// 	this.ads[x].newtext.x = 1655;
					// 	this.ads[x].newtext.y = 50;
					// } else {
					// 	this.ads[x].newtext.x = 1630;
					// 	this.ads[x].newtext.y = 48;
					// }

					this.indi_ads[x].addChild(this.ads[x].text1, this.ads[x].text2,this.ads[x].text3);
				} //END poker bonus plus banner
				else if (data[x].gameName == "super-six") {
					this.ads[x].text1 =  new createjs.Text(window.language.lobby.supercaps,"57px arvobolditalic","#f1e283");
					this.ads[x].text1.y = 90;

					this.ads[x].text2 =  new createjs.Text(window.language.lobby.sixcaps,"57px arvobolditalic","#d8bd69");
					this.ads[x].text2.y = 90;

					// this.ads[x].newtext =  new createjs.Text(window.language.lobby.newcaps,"bold 30px LatoBold","#462f04");
					// this.ads[x].newtext.rotation = 45;

					if(window.language.locale == "zh") {
						this.ads[x].text1.x = 1160;
						this.ads[x].text2.x = (this.ads[x].text1.x + 110) + 15;

						// this.ads[x].newtext.font = "bold 40px LatoBold";
						// this.ads[x].newtext.x = 1655;
						// this.ads[x].newtext.y = 50;
					} else {
						this.ads[x].text1.x = 1130;
						this.ads[x].text2.x = (this.ads[x].text1.x + 185) + 30;
						// this.ads[x].newtext.x = 1630;
						// this.ads[x].newtext.y = 48;
					}

					this.indi_ads[x].addChild(this.ads[x].text1, this.ads[x].text2);
				} //END supersix banner
				else if (data[x].gameName == "roulette") {
					this.ads[x].roulette_icon = new createjs.Bitmap("/img/banner/roulette-banner_ico.png");
					this.ads[x].roulette_icon.x = 1000;
					this.ads[x].roulette_icon.y = 130;
					this.ads[x].roulette_icon.scaleX = this.ads[x].roulette_icon.scaleY = 0.46;

					this.ads[x].roulette =  new createjs.Text(window.language.lobby.roulettecaps,"57px arvobolditalic","#d1301e");
					this.ads[x].roulette.y = this.ads[x].roulette_icon.y - 10;
					this.ads[x].roulette.x = this.ads[x].roulette_icon.x + 60;

					this.ads[x].comingsoon_text =  new createjs.Text(window.language.lobby.comingsooncaps,"bold 37px ArvoItalic","#e8d478");
					this.ads[x].comingsoon_text.y = 85;
					this.ads[x].comingsoon_text.x = this.ads[x].roulette_icon.x + 90;

					if(window.language.locale == "zh") {
						this.ads[x].roulette_icon.x = 1100;
						this.ads[x].roulette.x = this.ads[x].roulette_icon.x + 60;
						this.ads[x].comingsoon_text.x = this.ads[x].roulette_icon.x + 20;

					}  else if (window.language.locale == "kr") {
						this.ads[x].roulette.text = "ROULETTE";
					}

					this.indi_ads[x].addChild(this.ads[x].comingsoon_text, this.ads[x].roulette, this.ads[x].roulette_icon);

				} //END poker bonus plus banner
				else if (data[x].gameName == "mahjong") {
					this.ads[x].mahjong_icon = new createjs.Bitmap("/img/banner/mahjong-banner_ico.png");
					this.ads[x].mahjong_icon.x = 830;
					this.ads[x].mahjong_icon.y = 120;
					this.ads[x].mahjong_icon.scaleX = this.ads[x].mahjong_icon.scaleY = 0.49;

					this.ads[x].comingsoon = new createjs.Text(window.language.lobby.comingsooncaps,"bold 37px ArvoItalic", "#d22e22");
					this.ads[x].comingsoon.x = this.ads[x].mahjong_icon.x + 280;
					this.ads[x].comingsoon.y = 75;

					this.ads[x].pai =  new createjs.Text("PAI","52px arvobolditalic","#d22e22");
					this.ads[x].pai.y = this.ads[x].mahjong_icon.y - 7;
					this.ads[x].pai.x = this.ads[x].mahjong_icon.x + 40;

					this.ads[x].gow =  new createjs.Text("GOW","52px arvobolditalic","#3271b4");
					this.ads[x].gow.y = this.ads[x].pai.y;
					this.ads[x].gow.x = (this.ads[x].pai.x + 85);

					this.ads[x].mahjong =  new createjs.Text("MAHJONG","52px arvobolditalic","#c4c4c4");
					this.ads[x].mahjong.y = this.ads[x].pai.y;
					this.ads[x].mahjong.x = (this.ads[x].gow.x + 130) + 20;

					if(window.language.locale == "zh") {
						this.ads[x].comingsoon.x = this.ads[x].mahjong_icon.x + 420;
						// this.ads[x].pai.text = "牌九";
						// this.ads[x].pai.font = "bold 57px ArvoItalic";
						// this.ads[x].mahjong.text = "";
						// this.ads[x].pai.x = this.ads[x].mahjong_icon.x + 40;
					}

					this.indi_ads[x].addChild(this.ads[x].mahjong_icon, this.ads[x].pai, this.ads[x].gow, this.ads[x].mahjong,this.ads[x].comingsoon);
				} //END poker bonus plus banner

				// === for play bittons

				this.ads[x].enter_button = new createjs.Shape();
				this.ads[x].enter_button.graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,200,37,20);
				this.ads[x].enter_button.cursor = 'pointer';
				this.ads[x].enter_button.y = 160;

				this.ads[x].enter_text = new createjs.Text(window.language.lobby.playnow,"22px latoblack", "#462f04");
				this.ads[x].enter_text.shadow = new createjs.Shadow("#fbf956",0,1.5,0)
				this.ads[x].enter_text.textAlign = "center";
				this.ads[x].enter_text.textBaseline = "middle";
				this.ads[x].enter_text.hitArea = this.ads[x].enter_button;

				if(data[x].gameName == "reel-games") {
					this.ads[x].enter_button.x = 1170;
					this.ads[x].enter_text.x = this.ads[x].enter_button.x + (200/2) + 5;

					if(!parseInt(window.reel_yn) || parseInt(window.reel_yn) == 2 || window.isBanker){
						this.ads[x].enter_button.visible = false;
						this.ads[x].enter_text.visible = false;
					}

					if(window.language.locale == "zh") {
						this.ads[x].enter_text.font = "23px latoblack";
					}

					this.ads[x].enter_text.y = this.ads[x].enter_button.y + (35/2);

					this.ads[x].enter_button.on("click",(e)=>{
						if(window.reel_yn == 0 || window.game_settings.sicbo == 1 || window.game_settings.paigow == 1) return;

						$('.sidebar').css({'width' : '231px'});
						$('.sidebar--lobby').hide();
						$('.header-game__items').removeClass("active");
						$('#reelgames').addClass("active");
						$('.header-subnav').css({'display': 'none'});
						$('.sidebar--game, .header-subnav.reelgames').css({'display': 'block'});
						this.context.toggle.toggleReelGames('ka_gaming');
					});

					this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);
				} // END reel games BUTTONS
				else if(data[x].gameName == "dragon-bonus") {
					this.ads[x].enter_button.x = 1170;
					this.ads[x].enter_button.viewPage = 'sub_bonus';

					this.ads[x].enter_text.y = this.ads[x].enter_button.y + (35/2);
					this.ads[x].enter_text.x = this.ads[x].enter_button.x + (200/2) + 5;

					this.ads[x].enter_button.on("click",(e)=>{
						//disable reel games for now
						$('.sidebar').css({'width' : '231px'});
						$('.sidebar--lobby').hide();
						$('.header-game__items, .header-subnav__items').removeClass("active");
						$('#livegames, #bonus').addClass("active");
						$('.sidebar--game, .header-subnav:not(.reelgames)').css({'display': 'block'});
						this.context.toggle.toggleBaccarat('dragonbonus', 'thumbnail');
					});

					this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);
				}
				else if(data[x].gameName == "super-six") {
					this.ads[x].enter_button.x = 1170;

					this.ads[x].enter_button.viewPage = 'sub_supersix';

					this.ads[x].enter_text.x = this.ads[x].enter_button.x + (200/2) + 5;
					this.ads[x].enter_text.y = this.ads[x].enter_button.y + (35/2);

					this.ads[x].enter_button.on("click",(e)=>{
						$('.header-game__items, .header-subnav__items').removeClass("active");
						$('#livegames, #bonus').addClass("active");
						$('.sidebar').css({'width' : '231px'});
						$('.sidebar--lobby').hide();
						$('.sidebar--game, .header-subnav:not(.reelgames)').css({'display': 'block'});

						this.context.toggle.toggleBaccarat('supersix', 'thumbnail');
					});

					this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);
				}
				else if(data[x].gameName == "poker-bonus") {
					this.ads[x].enter_button.y = 170;
					this.ads[x].enter_button.x = 1170;
					this.ads[x].enter_button.viewPage = 'sub_poker';

					this.ads[x].enter_text.x = this.ads[x].enter_button.x + (200/2)  + 5;
					this.ads[x].enter_text.y = this.ads[x].enter_button.y + (35/2);

					this.ads[x].enter_button.on("click",(e)=>{
						//disable reel games for now
						$('.header-game__items, .header-subnav__items').removeClass("active");
						$('#livegames, #poker').addClass("active");
						$('.sidebar').css({'width' : '231px'});
						$('.sidebar--lobby').hide();
						$('.sidebar--game, .header-subnav:not(.reelgames)').css({'display': 'block'});
						this.context.toggle.togglePoker();
					});

					this.indi_ads[x].addChild(this.ads[x].enter_button, this.ads[x].enter_text);
				}

				this.banner_container.addChild(this.indi_ads[x]);

				this.indi_ads[x].on("click", (e) =>{
					if(e.target.alpha == 0) e.stopPropagation();
				});
			}

		// this.ads_container = new createjs.Container();
		// this.addChild(this.ads_container);
		// this.ads_container.mask = header_mask;

		for(var x = 0;x < data.length; x++) {
			this.circle_indicator[x] = new createjs.Shape();
			this.circle_indicator[x].graphics.beginFill("#fff").drawCircle(0,0,6);
			this.circle_indicator[x].x = (x*28) + 680
			this.circle_indicator[x].y = 255
			this.circle_indicator[x].alpha = 0.5;
			this.banner_container.addChild(this.circle_indicator[x]);
		}

		this.playAds();
	},
	playAds () {
		if(!this.ads.length) return;

		this.circle_indicator[0].alpha = 1;

		for(var x = 0; x < this.ads.length; x++  ) {
			createjs.Tween.get(this.indi_ads[x],{loop:true})
			.wait(4000*x)
			.to({
				alpha: 0
			},(x*500))
			.wait(4000*x)
			.to({
				alpha : 1
			},(x*500))

		} //end for
	},
	bannerTableShow (data) {
		this.currentSelected = data.namespace;
		this.banner_container.visible = false;
		this.userBased_banner_container.visible = false;
		this.table_banner_container.visible = true;

		this.table_bg = new createjs.Shape();
		this.table_bg.graphics.beginFill("#333333").drawRect(0,0,1690,240);

		this.table_banner_container.removeAllChildren();
		this.table_banner_container.addChild(this.table_bg);

		switch(data.gameName) {
			case "Sicbo" :
				break;
			case "Baccarat" :
				let miscData = (data.slave && data.slave == 'supersix')?data:{};
				lobbyBanner.bcBannerTable(data, this.table_banner_container);
				lobbyBanner.bcSetCount(data.marks);
				lobbyBanner.setBcRoadmap(data)
				break;
			case "dragontiger" :
			case "Dragon-Tiger" :
				break;
			case "Poker" :
				break;
		}

		let gradient_bg = ["#980000","#2b0000"];
		let text_color = "#efb052";
		let level = window.language.level.normal;
    let supersix_level;

		if(data.roomType == "p") {
			gradient_bg = ["#bd0000","#7c0000"];
			text_color = "#efb052";
			level = window.language.level.premium;
		} else if(data.roomType == "v") {
			gradient_bg = ["#fedd78","#d5a515"];
			text_color = "#000";
			level = window.language.level.vip;
		}

		supersix_level = !level ? window.language.level.normal : level;

		this.gameName_bg = new createjs.Shape();
		this.gameName_bg.graphics.beginLinearGradientFill(gradient_bg, [0,1],0,0,190,0).drawRect(0,0,224,52);
		this.gameName_bg.y = 61;

		this.table_banner_container.addChild(this.gameName_bg);

		this.gameNum = this.getText(30,(52/2) + this.gameName_bg.y,data.tableNumber.length == 2 ? data.tableNumber : "0" + data.tableNumber,"24px ArvoBold",text_color,"center","middle");
		this.table_banner_container.addChild(this.gameNum);

		let font = "24px ArvoItalic";
		// === table name
		let nameTitle = '';
		switch(data.gameName) {
		case "Baccarat" :
			for (var i = 0; i < window.bcSetting.length; i++) {
        if (parseInt(data.tableNumber) == window.bcSetting[i].id) {
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
            this.table_banner_container.addChild(this.flippyImg);
          }
        }
	    }
			break;

		case "Dragon-Tiger" :
			nameTitle = window.language.lobby.dragontiger;
			break;

		case "Poker" :
			nameTitle = window.language.lobby.texas;
			// lets check if there is a slave node
			if(data.slave && data.slave == 'bonusplus'){
				level = window.language.level.bonusplus;
			}
			break;

		case "Sicbo" :
			nameTitle = window.language.lobby.sicbo;
			break;
		}

		if(data.slave && data.slave == 'supersix'){
			nameTitle = supersix_level;
		}
		else {
			nameTitle = nameTitle+' '+level;
		}

		let gameName_bg_mask = new createjs.Shape();
		gameName_bg_mask.graphics.beginFill("red").drawRect(50,0,170,100);

		if (data.roomType == "p" || data.roomType == "v" || (data.slave && data.slave == "bonusplus")) {
			// if (data.slave && (data.slave == "supersix" || data.slave == "bonus")) {
				this.gameName = this.getText(60,(52/2) + this.gameName_bg.y,level,"20px ArvoItalic",text_color,"left","middle");
				this.table_banner_container.addChild(this.gameName);
				// return;
			// } else {
			// 	this.gameName = this.getText(230,(52/2) + this.gameName_bg.y,nameTitle,"20px ArvoItalic",text_color,"left","middle");
			// 	this.gameName.mask = gameName_bg_mask;
			// 	this.table_banner_container.addChild(this.gameName);
			// 	createjs.Tween.get(this.gameName, {loop:true}).to({x : -200},10000);
			// }

		}
		else {
			this.gameName = this.getText(60,(52/2) + this.gameName_bg.y,nameTitle,"20px ArvoItalic",text_color,"left","middle");
			this.table_banner_container.addChild(this.gameName);
		}

		//상태표시
		let round_stat ="";
		switch(data.roundStatus){
			case "S":
				round_stat = window.language.lobby.nowbetting;
				break;
			case "E":
				round_stat = window.language.lobby.bettingend;
				break;
			case "P":
				if(data.gameName == "Baccarat" || data.gameName == "Dragon-Tiger" || data.gameName == "Poker"){
					round_stat = window.language.lobby.dealing;
				}else{
					round_stat = window.language.lobby.result;
				}
				break;
			case "R" :
				round_stat = window.language.lobby.result;
				break;
		}

		if(!data.marks.length && data.gameName != 'Pai-Gow') {
			round_stat = window.language.prompts.promptshuffling;
		}

		//게임 번호
		let game_ct = new createjs.Container();
		let game_label = this.getText(0,0,window.language.lobby.game + ":","18px lato","#b5b5b5","left","top");
		this.round_num =  this.getText(177,4,data.currentRound,"18px bebasNeue","#b5b5b5","right","top");
		game_ct.addChild(game_label,this.round_num);
		game_ct.set({x:23,y:117});
		this.table_banner_container.addChild(game_ct);

		//상태 표시
		this.gameStatus = this.getText(23,117+50,round_stat,"18px lato","#b5b5b5","left","top");
		this.table_banner_container.addChild(this.gameStatus);

		// === set betranges
		this.bet_range_buttons = [];

        let rangeToUse = [];
        let initValueMin = 0;
        let initValueMax = 0;
        let betRangeMin = 0;
        let betRangeMax = 0;
        if (window.userType == 'TS' || window.userType == 'S') {
            rangeToUse = data.sportBetRanges;
        }
        else if (window.userType == 'TC' || window.userType == 'C') {
            rangeToUse = data.casinoBetRanges;
        }

        // agent range checking starts here
        let roomType = data.roomType === 'n'? 'normal' : data.roomType === 'v'? 'vip' : 'premium';
        let isFlippy = data.gameName === 'Baccarat' && data.type === 'flippy';
        let a_range = _.find(agent_range, (a)=> {
            if(a.gameType.toLowerCase() === 'flippy') {
                return a.game === data.gameName && a.type === roomType && isFlippy;
            } else {
                return a.game === data.gameName && a.type === roomType && !isFlippy;
            }
        });

        if(window.agent_range.length && !_.isEmpty(a_range)) {
            rangeToUse = a_range.ranges;
        }
        //ends here

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

			let dividend;
      if (window.casino == 'SS') {
          dividend = 1000;
      }
      else {
          dividend = 1;
      }

      let betRangeMin = (rangeToUse[x].min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
			let betRangeMax = (rangeToUse[x].max * parseInt(window.currencyMultiplier)) * window.userMultiplier;

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

			switch(data.gameName) {
				case "Sicbo" :
					this.bet_range_buttons[x].redirectLink = window.sb_domain+data.tableNumber
					this.bet_range_buttons[x].game = 'Sicbo/'+data.tableNumber
					break;
				case "Baccarat" : // supersix
					this.bet_range_buttons[x].redirectLink = window.bc_domain+data.tableNumber
					this.bet_range_buttons[x].game = 'Baccarat/'+data.tableNumber
					break;
				case "Dragon-Tiger" :
					this.bet_range_buttons[x].redirectLink = window.dt_domain+data.tableNumber;
					this.bet_range_buttons[x].game = 'Dragon-Tiger/'+data.tableNumber
					break;
				case "Poker" :
					this.bet_range_buttons[x].redirectLink = window.poker_domain+data.tableNumber;
					this.bet_range_buttons[x].game = 'Poker/'+data.tableNumber
					break;
			}

			this.bet_range_buttons[x].range = rangeToUse[x].min + "-" + rangeToUse[x].max;

			this.bet_range_buttons[x].on("click", (e) => {
				var slave = 'classic';
				if(e.currentTarget.game.indexOf('Baccarat') > -1) {
					if(toggle.getCurrentOpen().split('_')[1] === 'dragonbonus')
						slave = 'bonus';
					else if(toggle.getCurrentOpen().split('_')[1] === 'normal')
						slave = 'classic';
					else 
						slave = toggle.getCurrentOpen().split('_')[1];
				}

				console.log("slave on click", {range:e.currentTarget.range, game:e.currentTarget.game, slave:slave, multiplayer: 0})
        $.post("/settingGame", {range:e.currentTarget.range, game:e.currentTarget.game, slave:slave, multiplayer: 0}, function () {
					window.location.href = e.currentTarget.redirectLink
        });

			});
		} // end for
	},
	setResult (data) {
		if(!this.currentSelected) return;
		if(this.currentSelected != data.namespace) return;

		this.gameStatus.text = window.language.lobby.result;

		let miscData = (data.slave && data.slave == 'supersix')?data:{};
		lobbyBanner.bcBannerTable(data, this.table_banner_container);
		lobbyBanner.bcSetCount(data.marks);
		lobbyBanner.setBcRoadmap(data);

		if(this.deal_count) {
			this.deal_count.text = data[x].marks.length
		}
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
	bannerUserBased(data, type, roomdata) {
		this.currentSelected = data.namespace;
		this.banner_container.visible = false;
		this.table_banner_container.visible = false;
		this.userBased_banner_container.visible = true;

		this.table_bg = new createjs.Shape();
		this.table_bg.graphics.beginFill("#333333").drawRect(0,0,1690,240);

		this.userBased_banner_container.removeAllChildren();
		this.userBased_banner_container.addChild(this.table_bg);

		this.roomid = data.tableNumber;

		let gradient_bg = ["#980000","#2b0000"];
		let text_color = "#efb052";
		let level ='';
    let nameTitle = '';

		switch(data.gameName) {
			case "Sicbo" :
				nameTitle = window.language.lobby.sicbo;
				gradient_bg = ["#bd0000","#7c0000"];
				text_color = "#efb052";
				break;
			case "Pai-Gow" :
			nameTitle = window.language.lobby.paigow;
			gradient_bg = ["#c2185b","#740c43"];
			text_color = "#efb052";
			break;
		}

		if(data.roomType == "p") {
			gradient_bg = ["#bd0000","#7c0000"];
			text_color = "#efb052";
			level = window.language.level.premium;
		} else if(data.roomType == "v") {
			gradient_bg = ["#fedd78","#d5a515"];
			text_color = "#000";
			level = window.language.level.vip;
		}

		let gameName_bg_mask = new createjs.Shape();
		gameName_bg_mask.graphics.beginFill("red").drawRect(50,0,170,100);

		this.gameName_bg = new createjs.Shape();
		this.gameName_bg.graphics.beginLinearGradientFill(gradient_bg, [0,1],0,0,230,0).drawRect(0,0,420,52);
		this.gameName_bg.y = 65;
		this.userBased_banner_container.addChild(this.gameName_bg);

		this.gameNum = this.getText(155,(52/2) + this.gameName_bg.y,data.tableNumber.length == 2 ? data.tableNumber : "0" + data.tableNumber,"24px ArvoBold",text_color,"center","middle");
		this.userBased_banner_container.addChild(this.gameNum);

		this.gameName = this.getText(185,(52/2) + this.gameName_bg.y, data.gameName,"20px ArvoItalic",text_color,"left","middle");
		this.userBased_banner_container.addChild(this.gameName);

		let game_label = this.getText(155,170, `${window.language.lobby.game}:`, "18px lato","#b5b5b5","left","top");
		this.userBased_banner_container.addChild(game_label);

		this.round_num = this.getText(155,195, data.currentRound, "18px latobold","#b5b5b5","left","top");
		this.userBased_banner_container.addChild(this.round_num);

		let round_stat ="";
		switch(data.roundStatus){
			case "S":
				round_stat = window.language.lobby.nowbetting;
				break;
			case "E":
				round_stat = window.language.lobby.bettingend;
				break;
			case "P":
				if(data.gameName == "Baccarat" || data.gameName == "Dragon-Tiger" || data.gameName == "Poker" || data.gameName == "Pai-Gow"){
					round_stat = window.language.lobby.dealing;
				}else{
					round_stat = window.language.lobby.result;
				}
				break;
			case "R" :
				round_stat = window.language.lobby.result;
				break;
		}

		if(!data.marks.length && data.gameName != 'Pai-Gow') {
			round_stat = window.language.prompts.promptshuffling;
		}
		this.gameStatus = this.getText(320,135, round_stat, "22px lato","#fff","center","top");
		this.userBased_banner_container.addChild(this.gameStatus);

		let createFlag = false;
    for (var i = 0; i < roomdata.length; i++) {
      if (roomdata[i].banker.banker.user_id == window.userId) {
        createFlag = true;
      }
    }
		// console.log("roomdata:", roomdata);
		// console.log("createFlag:", createFlag);

		let button_grad = ["#ffd476","#c69522"];

		let currOpen = toggle.getCurrentOpen().split("_")[1] ? toggle.getCurrentOpen().split("_")[1].toLowerCase() : toggle.getCurrentOpen().toLowerCase();

		if(parseInt(window.game_settings[currOpen]) == 1) {
			if (createFlag == false) {
				button_grad = ["#ffd476","#c69522"];
			} else {
				button_grad = ["#b38f40","#b08b3b"]
			}
		} else {
			button_grad = ["#b38f40","#b08b3b"]
		}

		if(window.isBanker == true) {
			button_grad = ["#b38f40","#b08b3b"]
		}

		this.createButton = new createjs.Shape();
		this.createButton.graphics.beginLinearGradientFill( button_grad, [0, 1],0 ,0, 0, 22 ).drawRoundRect(0, 0, 150, 32, 5 );
		this.createButton.x = 245;
		this.createButton.y = 180;
		this.createButton.cursor = "pointer";
		this.userBased_banner_container.addChild(this.createButton);

		this.createButtonText = this.getText(320,182, window.language.lobby.create_room, "20px latobold","#473102","center","middle");
		this.createButtonText.y = this.createButton.y + (30/2);
		this.createButtonText.shadow = new createjs.Shadow("#feff5f",1,2,2);
		this.userBased_banner_container.addChild(this.createButtonText);

		this.createButton.addEventListener('click', (e) => {
			currOpen = toggle.getCurrentOpen().split("_")[1] ? toggle.getCurrentOpen().split("_")[1].toLowerCase() : toggle.getCurrentOpen().toLowerCase();
			if(parseInt(window.game_settings[currOpen]) == 1 && !window.isBanker) {
				if(createFlag == false) {
					let bet_range = [];
					let betRangeMax = 0;
					let betRangeMin = 0;
					let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
					bet_range = data.casinoBetRanges;
					for(var i = 0; i < bet_range.length; i++) {
						betRangeMax = (bet_range[i].max * parseInt(window.currencyMultiplier)) * window.userMultiplier * mainMultiplier;
						betRangeMin = (bet_range[i].min * parseInt(window.currencyMultiplier)) * window.userMultiplier * mainMultiplier;
						let disable = "";

						if(window.money < betRangeMin) {
							disable = "disabled";
						}

						$('.createroom__boxcon.-capital').append(
							"<div class='radio-con -capital'>"
							+"<div class='radio-btn "+ disable +"'>"
							+"<i><input type='radio' name='radio-btn' value='"+ bet_range[i].min +"-"+bet_range[i].max+"' class='radio-capital input-radio'/></i>"
							+"</div>"
							+"<span>"+numberWithCommas(betRangeMin)+" - "+numberWithCommas(betRangeMax)+"</span>"
							+"</div> "
						);
					}
					toggle.togglePopups("createroom");
					$('#roomname').val($('.dropdown-list li:first-child').text());
					$('.dropdown-con > span').text($('.dropdown-list li:first-child').text());
					$('#roomid').val(data.tableNumber);
					$('.popup-bg').css({'top': 0});
				}
			} else {
				$("#popup-failed").show();
				setTimeout(() => {
					$(".popup-container").addClass("isShow").show();
				}, 200)
				$(".popup-container").animate({
					top: '0',
					opacity : 1
				}, 200)
				$('.popup-bg').css({'top': 0}).addClass('active');
			}
		});

		// if(window.isBanker == true) {
		// 	this.createButton.addEventListener('click', (e) => {
		// 		$("#popup-failed").show();
		// 		setTimeout(() => {
		// 			$(".popup-container").addClass("isShow").show();
		// 		}, 200)
		// 		$(".popup-container").animate({
		// 			top: '0',
		// 			opacity : 1
		// 		}, 200)
		// 		$('.popup-bg').css({'top': 0}).addClass('active');
		// 	});
		// }

		$('.radio-con -capital .radio-btn').addClass('disabled');

		// createjs.Tween.get(this.gameName, {loop:true}).to({x : -200},10000);
		this.result_container = new createjs.Container();
		this.stage.data = data;
		this.userBased_banner_container.addChild(this.result_container);

		this.stage.result_container = this.result_container;


		if(type == "Sicbo") {
			this.stage.list_tables = [];
			lobbyBanner.sicboBannerTable(data, this.stage);
		}
		if(type == "Paigow") {
			this.stage.list_tables = [];
			lobbyBanner.paigowBannerTable(data, this.stage, this);
		}
	},
	setResultUserBased(data, type) {
		if(!this.currentSelected) return;
		if(this.currentSelected != data.namespace) return;

		this.gameStatus.text = window.language.lobby.result;
		if(type == "Sicbo") {

			lobbyBanner.sicboBannerTable(data, this.stage);
			lobbyBanner.sicboSetHotColdResult(data);
			lobbyBanner.sicboSetPercentages(data);
			lobbyBanner.sicboDoubleTripleCount(data);
			lobbyBanner.sicboDrawRoadmap(data);
			lobbyBanner.sicboSetResult(data);
		}

		if(type == "Pai-Gow") {
			lobbyBanner.setUsedTiles(data.marks, this.stage);
			lobbyBanner.drawRoadMapPaigow(data.marks, this.stage);
			lobbyBanner.displayRoomRoundsPaigow(data.marks, this);

			((marks, self) => {
				setTimeout(() => {
					let d = rmformat().fnPaigowLastRounds(marks);
					if(d.length >= 5) {
						lobbyBanner.resetInfosPaigow(self);
					}
				}, 10000)
			})(data.marks, this);
			
		}
	},
	setInputItemUserBased(data, gameName, tableId) {
		if(!this.currentSelected) return;
		if(this.currentSelected.toLowerCase() != `${gameName.toLowerCase()}/${tableId}`) return;

		lobbyBanner.drawTilesInput(data.value, this);
		console.log("setbanner input", data, this.currentSelected)
	}
}

export default {
	component_banner
}
