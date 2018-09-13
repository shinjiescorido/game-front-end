let instance = null;

export default() => {
    instance = instance || new blu.Component({
        ads : [],
        circle_indicator : [],
        main() {


            popupHowto = new createjs.Stage("popupHowto");
            this.howto_container = new createjs.Container();
            popupHowto.addChild(this.howto_container)
            popupHowto.enableMouseOver(10);

            let popup_bg = new createjs.Shape();
            popup_bg.graphics.beginLinearGradientFill(["#494949", "#343434"],[0,1],0,0,0,300).drawRoundRect(0, 0, 1280, 950, 8);
            popup_bg.setBounds(0, 0, 1280, 950);


            this.howto_container.x = 358;
            this.howto_container.y = -280;
            // this.x = 1000;
            // this.y = -80;

            this.popup_width = popup_bg.getBounds().width;
            this.popup_height = popup_bg.getBounds().height;
            this.regX = this.popup_width/2;
            this.regY = this.popup_height/2;
            // this.visible = false;
            this.howto_container.visible = false;

            // === popup background_overlay
            this.background_overlay = new createjs.Shape();
            this.background_overlay.graphics.beginFill("#000").drawRect(0, 0, this.context.stage.baseWidth, this.context.stage.baseHeight);
            this.background_overlay.x = -360;
            this.background_overlay.y = -25;
            this.background_overlay.alpha = 0.6;
            // this.background_overlay.visible = false;
            this.background_overlay.on("click", (e) => { return; })
            this.howto_container.addChild(this.background_overlay);
            // this.addChild(this.background_overlay);


            this.howto_container.addChild(popup_bg);
            this.preloadImages(); // loads openRulesPage after exec

            this.resize()
            window.addEventListener("resize", function() {
                this.resize()
                popupHowto.update()
            }.bind(this));
        },

        init() {
            let header_container = new createjs.Container();
            header_container.x = 40;
            header_container.y = 0.5;

            // this.addChild(header_container);
            this.howto_container.addChild(header_container);

            this.header_tabs = [];

            let games = ["baccarat", "sicbo", "texasholdem", "dragontiger"/*, "spinnwin"*/, "redwhite", "roulette"];
            let labeltext = [window.language.lobby.baccarat, window.language.lobby.sicbo, window.language.lobby.texas, window.language.lobby.dragontiger/*, window.language.lobby.spinwin*/, window.language.lobby.redwhite, window.language.lobby.roulette];
            let tab_w = (this.popup_width - 100) / games.length;
            let tab_h = 180;
            let iconshadow = new createjs.Shadow("rgba(51, 51, 51, 0.4)", -2, 2, 6);

            this.active_page;

            for(let i = 0; i < games.length; i++) {

                this.header_tabs[i] = {};
                this.header_tabs[i].tab_x = i * tab_w;
                this.header_tabs[i].bg = new createjs.Shape();
                this.header_tabs[i].bg.graphics.beginFill("#b52728").drawRect(0, 0, tab_w, tab_h);
                this.header_tabs[i].bg.x = this.header_tabs[i].tab_x;
                this.header_tabs[i].bg.alpha = 0;

                this.header_tabs[i].bg.hitArea = new createjs.Shape();
                this.header_tabs[i].bg.hitArea.graphics.beginFill("#fff").drawRect(0, 0, tab_w, tab_h);
                this.header_tabs[i].bg.name = games[i];
                header_container.addChild(this.header_tabs[i].bg);
                this.header_tabs[i].border = new createjs.Shape();
                this.header_tabs[i].border.graphics.setStrokeStyle(10).beginLinearGradientStroke(["#fbce6b", "#bb891c"], [0.3, 0.7], 0, 0, 0, 13).moveTo(-0.5, 5).lineTo(tab_w, 5);
                this.header_tabs[i].border.x = this.header_tabs[i].tab_x;
                this.header_tabs[i].border.alpha = 0;
                header_container.addChild(this.header_tabs[i].border);
                this.header_tabs[i].iconbg = new createjs.Shape();
                this.header_tabs[i].iconbg.graphics.beginFill("#fff").drawCircle(0, 0, (tab_h - 100) / 2);
                this.header_tabs[i].iconbg.x = this.header_tabs[i].tab_x + (tab_w / 2);
                this.header_tabs[i].iconbg.y = (tab_h / 2) - 10;
                this.header_tabs[i].iconbg.shadow = iconshadow;
                this.header_tabs[i].iconbg.radius = (tab_h - 100) / 2;
                header_container.addChild(this.header_tabs[i].iconbg);
                this.header_tabs[i].icon = new createjs.Bitmap(this.images["header_" + games[i]]);
                this.header_tabs[i].icon.regX = this.header_tabs[i].icon.image.width / 2;
                this.header_tabs[i].icon.regY = this.header_tabs[i].icon.image.height / 2;
                this.header_tabs[i].icon.x = this.header_tabs[i].tab_x + (tab_w / 2);
                this.header_tabs[i].icon.y = (tab_h / 2) - 10;
                if(games[i] == "baccarat")  this.header_tabs[i].icon.scaleX = this.header_tabs[i].icon.scaleY = 1.1;
                header_container.addChild(this.header_tabs[i].icon);
                this.header_tabs[i].label = new createjs.Text(labeltext[i].toUpperCase(), "19px LatoRegular", "#fff");
                this.header_tabs[i].label.textAlign = "center";
                this.header_tabs[i].label.x = this.header_tabs[i].tab_x + (tab_w / 2);
                this.header_tabs[i].label.y = (tab_h / 2) + 40;
                header_container.addChild(this.header_tabs[i].label);
                if(/*games[i] == "spinnwin" || */games[i] == "redwhite" || games[i] == "roulette") {
                  this.header_tabs[i].soon = {
                    "bg": new createjs.Shape(),
                    "text": new createjs.Text("COMING SOON!", "italic 16px TimesNewRoman", "#000")
                  }
                  this.header_tabs[i].soon.bg.graphics.beginFill("#f2e283").drawRect(-65, this.header_tabs[i].soon.text.lineHeight, 130, 20);
                  this.header_tabs[i].soon.bg.x = this.header_tabs[i].tab_x + (tab_w / 2);
                  this.header_tabs[i].soon.bg.y = this.header_tabs[i].label.y + 23;
                  this.header_tabs[i].soon.text.textAlign = "center";
                  this.header_tabs[i].soon.text.textBaseline = "middle";
                  this.header_tabs[i].soon.text.x = this.header_tabs[i].soon.bg.x;
                  this.header_tabs[i].soon.text.y = this.header_tabs[i].soon.bg.y + 10;
                  header_container.addChild(this.header_tabs[i].soon.bg, this.header_tabs[i].soon.text)
                }

                // mouse event listeners
                this.header_tabs[i].bg.addEventListener("click", (e) => {
                    this.active_page = this.header_tabs[i].bg.name;
                    this.openRulesPage();
                });

            } // end for

            let header_bg = new createjs.Shape();
            header_bg.graphics.beginFill("#262626").drawRoundRectComplex(0, 0, this.popup_width, tab_h, 8, 8, 0, 0);
            header_bg.x = -40;
            header_container.addChildAt(header_bg, 0);

            let bg_nihtanlogo = new createjs.Bitmap(this.images.nihtan_logo);
            bg_nihtanlogo.x = -20;
            bg_nihtanlogo.y = 310;
            this.bg_rightside = new createjs.Bitmap(this.images.rightside_baccarat);
            this.bg_rightside.x = 930;
            this.bg_rightside.y = 300;
            // this.bg_rightside.scaleX = this.bg_rightside.scaleY = 0.53;

            bg_nihtanlogo.mask = new createjs.Shape();
            bg_nihtanlogo.mask.graphics.beginFill("#00e").drawRect(0, 0, 1280, 950);

            // this.addChild(bg_nihtanlogo, this.bg_rightside);
            this.howto_container.addChild(bg_nihtanlogo, this.bg_rightside);

            //close button shape
            let closeshape = new createjs.Shape();
            closeshape.graphics.beginFill("#262626").drawRect(0, 0, 30, 30);
            closeshape.x = 1240;
            closeshape.y = 10;
            closeshape.cursor = 'pointer';
            this.howto_container.addChild(closeshape);
            // this.addChild(closeshape);

            //close button
            let closeBtn = new createjs.Text("X","bold 25px Arial","#9e9e9e");
            closeBtn.x = 1245;
            closeBtn.y = 10;
            this.howto_container.addChild(closeBtn);
            // this.addChild(closeBtn);

            closeshape.on("click", (e) => {
                  setTimeout(function(){
                    $("#sicbo-toggle, #poker-toggle, #baccarat-toggle, #dragontiger-toggle, #red-white-toggle, #bigwheel-toggle, #roulette-toggle")
                    .css("display","none")
                  }, 100);
                  this.context.lobby_header.toggleGamePlay = true
                  e.nativeEvent.preventDefault();
                  this.context.toggleView("thumbnail_howtoplay");
            });

            // this.spinRect = new createjs.Shape();
            // this.spinRect.graphics.beginFill("#343434").drawRect(0, 0, 150, 150);
            // this.spinRect.x = 734;
            // this.spinRect.y = 740;
            // this.addChild(this.spinRect);
            // this.spinRect.visible = false;

            $('.howto-contents').scroll(function() {
              if ($(this).scrollTop() > 100 ) {
                  $('.scroll-button').fadeIn();
              } else {
                  $('.scroll-button').fadeOut();
              }
            });

            //scroll button
            $('.scroll-button').click(function() { // When arrow is clicked
                $('.howto-contents').animate({
                  scrollTop : 0  // Scroll to top of body
                }, 500);
            });

        },

        initPages() {
            this.init();

            this.context.lobby_baccarat_rules.init();
            this.context.lobby_sicbo_rules.init();
            this.context.lobby_texasholdem_rules.init();
            this.context.lobby_dragontiger_rules.init();
            this.context.lobby_roulette_rules.init();
            this.context.lobby_bigwheel_rules.init();
            this.context.lobby_redwhite_rules.init();
        },

        openRulesPage() {
            this.active_page = this.active_page || "baccarat";
            this.header_tabs.forEach((t)=> {
              if(t.bg.name == this.active_page) {
                t.bg.alpha = 1;
                t.border.alpha = 1;
                t.iconbg.graphics.clear().setStrokeStyle(2).beginStroke("#dcc16e").beginLinearGradientFill(["#fdd679", "#b58816"], [0, 1], 0, -(t.iconbg.radius), 0, t.iconbg.radius).drawCircle(0, 0, t.iconbg.radius);
                t.label.color = "#ffd475";
              }
              else {
                t.bg.alpha = 0;
                t.border.alpha = 0;
                t.iconbg.graphics.clear().beginFill("#fff").drawCircle(0, 0, t.iconbg.radius);
                t.label.color = "#fff";
              }

            });

            this.bg_rightside.image = this.images["rightside_" + this.active_page];
            this.bg_rightside.scaleX = this.bg_rightside.scaleY = 1 - .4;
            this.bg_rightside.x = 960;
            this.bg_rightside.y = 400;
            // this.spinRect.visible = false;

            switch (this.active_page) {
              case "baccarat":
                this.bg_rightside.y = 360;
                this.bg_rightside.scaleX = this.bg_rightside.scaleY = 1 - .4;
              break;
              /*case "spinnwin":
                this.bg_rightside.x = 1040;
                this.bg_rightside.y = 260 + 90;
                this.bg_rightside.scaleX = this.bg_rightside.scaleY = 1 -.4;
                break;*/
              case "roulette":
                this.bg_rightside.x = 950;
                this.bg_rightside.y = 260 + 90;
                this.bg_rightside.scaleX = this.bg_rightside.scaleY = 1 -.2;
                break;
              case "redwhite":
                this.bg_rightside.x = 950;
                this.bg_rightside.y = 270 + 70;
                this.bg_rightside.scaleX = this.bg_rightside.scaleY = 1 - .4;
                break;

            }


            // toggle howto content
            let arrayGames = ["sicbo","texasholdem","baccarat","dragontiger","redwhite"/*,"spinnwin"*/, "roulette"];
            let arrayElement = ["#sicbo-toggle","#poker-toggle","#baccarat-toggle","#dragontiger-toggle","#red-white-toggle"/*,"#bigwheel-toggle"*/,"#roulette-toggle"];
            for(let e = 0; e < arrayElement.length; e++) {
              if(this.active_page == arrayGames[e]) {
                  $(arrayElement[e]).css("display","block");
                  $(".howto-contents").scrollTop(0);

                  $('a[href*="#"]').click(function() {
                  	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                  		var target = $(this.hash);
                  		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                  		var scale = $(`${arrayElement[e]} #top`)[0].getBoundingClientRect().width / $(`${arrayElement[e]} #top`).width();
                  		var topPosition = $(this).attr('href') == '#game-objective' ? topPosition = 0 : ((target.position().top / scale) + $(`${arrayElement[e]} .howto-contents`).scrollTop()) + 20;
                  		if (target.length) {
                  			$(`${arrayElement[e]} .howto-contents`).animate({
                  				scrollTop: topPosition
                  			}, 500);
                  			return false;
                  		}
                  	}
                  });
              } else {
                  $(arrayElement[e]).css("display","none");
              }
            }


        },

        drawTable(columnwidths, rowcount, height) { //array of widths
            let con = new createjs.Container();
            let width = 0;

            let b = new createjs.Shape();
            b.graphics.setStrokeStyle(1).beginStroke("#fff");

            for(let i = 0; i < columnwidths.length; i++) {
                width += columnwidths[i];
                if(i < columnwidths.length - 1)
                b.graphics.moveTo(width, 0).lineTo(width, height);
            } // end for


            for(let i = 0; i < rowcount; i++) {
                b.graphics.moveTo(0, (height / rowcount) * (i + 1)).lineTo(width, (height / rowcount) * (i + 1));
            } // end for

            b.graphics.drawRect(0, 0, width, height);

            con.height = height;
            con.width = width;
            con.columns = columnwidths.length;
            con.columnwidths = columnwidths;
            con.rows = rowcount;

            con.addChild(b);

            return con;
        },

        preloadImages() {
            this.images = {
                "nihtan_logo" : "/img/howtoplay/lobby/nihtan-logo.png",
                "rightside_baccarat" : "/img/howtoplay/lobby/rightside-baccarat.png",
                "rightside_dragontiger" : "/img/howtoplay/lobby/rightside-dragontiger.png",
                "rightside_redwhite" : "/img/howtoplay/lobby/rightside-redwhite.png",
                "rightside_sicbo" : "/img/howtoplay/lobby/rightside-sicbo.png",
                "rightside_spinnwin" : "/img/howtoplay/lobby/rightside-spinwin.png",
                "rightside_texasholdem" : "/img/howtoplay/lobby/rightside-poker.png",
                "rightside_roulette" : "/img/howtoplay/lobby/rightside-roulette.png",
                "header_baccarat" : "/img/howtoplay/lobby/header-baccarat.png",
                "header_dragontiger" : "/img/howtoplay/lobby/header-dragontiger.png",
                "header_redwhite" : "/img/howtoplay/lobby/header-redwhite.png",
                "header_roulette" : "/img/howtoplay/lobby/header-roulette.png",
                "header_sicbo" : "/img/howtoplay/lobby/header-sicbo.png",
                "header_spinnwin" : "/img/howtoplay/lobby/header-spinwin.png",
                "header_texasholdem" : "/img/howtoplay/lobby/header-texasholdem.png"
            };

            let cnt = 0;
            for(let id of Object.keys(this.images)) {
                let img = new Image();
                img.src = this.images[id];
                img.id = id;
                img.onload = function() {
                    cnt++;
                    this.images[id] = img;
                    if(cnt >= Object.keys(this.images).length) {
                        this.initPages();
                        // this.openRulesPage(this.images);
                    }
                }.bind(this)

            }

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


            popupHowto.canvas.width = newWidth;
            popupHowto.canvas.height = newHeight;


            popupHowto.scaleX = popupHowto.scaleY = newWidth / 1920;
        }

    });

    return instance;
}
