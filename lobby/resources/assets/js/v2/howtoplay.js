let component_howtoplay = {
  main() {

    var c = document.createElement("canvas");
    c.setAttribute("id", "popup-howto");
    c.setAttribute("width", "1280px");
    c.setAttribute("height", "930px");
    c.setAttribute("style", "position: absolute;top: 96px;display:none");
    $(".lobby-main-container").append(c);

    this.stage = new createjs.Stage("popup-howto");
    createjs.Touch.enable(this.stage);

    if (window.nonInstall) {
      if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
        c.setAttribute("width", "930px");
		    c.setAttribute("height", "1280px");
				$(c).css({
					'transform': 'rotate(-90deg)',
		      'left' : 175,
		      'top'  : -230
				});

        this.stage.regX =  0;
        this.stage.regY =  778;
        this.stage.rotation = 90;
      } else {
        this.stage.regX =  0;
        this.stage.regY =  0;
        this.stage.rotation = 0;
      }
		} //nonInstall

    this.width = 1280;
    this.height = 930;
    let bg = new createjs.Shape();
    bg.graphics.beginLinearGradientFill(["#494949", "#343434"], [0, 1], 0, 0, 0, this.height).drawRect(0,0,this.width,this.height);
    this.stage.addChild(bg);
    this.preloadImages(); // loads openRulesPage after exec
    this.down = false;
  },
  init() {
    this.header_container = new createjs.Container();
    this.header_container.x = 40;
    this.header_container.y = 0.5;
    this.stage.addChild(this.header_container);
    this.header_tabs = [];

    let games = ["baccarat", "sicbo", "texas hold'em", "dragon tiger", "paigow"/*, "Spin n' Win", "red white"*/ , "roulette"]; //"roulette",
    let tab_w = (this.width - 100) / games.length;
    let tab_h = (this.width - 100) / games.length - 70;
    let iconshadow = new createjs.Shadow("rgba(51, 51, 51, 0.4)", -2, 2, 6);

    this.active_page;

    for(let i = 0; i < games.length; i++) {

      this.header_tabs[i] = {};
      let name = games[i].replace(/[^A-Z0-9]/ig, "").toLowerCase();

      this.header_tabs[i].tab = new createjs.Rectangle(0, 0, tab_w, tab_h);
      this.header_tabs[i].tab_x = i * tab_w;
      this.header_tabs[i].bg = new createjs.Shape();
      this.header_tabs[i].bg.graphics.beginFill("#b40708").drawRect(0, 0, tab_w, tab_h);
      this.header_tabs[i].bg.x = this.header_tabs[i].tab_x;
      this.header_tabs[i].bg.alpha = 0;

      this.header_tabs[i].bg.hitArea = new createjs.Shape();
      this.header_tabs[i].bg.hitArea.graphics.beginFill("#fff").drawRect(0, 0, tab_w, tab_h);
      this.header_tabs[i].bg.name = games[i].replace(/[^A-Z0-9]/ig, "").toLowerCase();
      this.header_container.addChild(this.header_tabs[i].bg);

      this.header_tabs[i].border = new createjs.Shape();
      this.header_tabs[i].border.graphics.setStrokeStyle(10).beginLinearGradientStroke(["#fbce6b", "#bb891c"], [0.3, 0.7], 0, 0, 0, 13).moveTo(-0.5, 5).lineTo(tab_w, 5);
      this.header_tabs[i].border.x = this.header_tabs[i].tab_x;
      this.header_tabs[i].border.alpha = 0;
      this.header_container.addChild(this.header_tabs[i].border);

      this.header_tabs[i].iconbg = new createjs.Shape();
      this.header_tabs[i].iconbg.graphics.beginFill("#fff").drawCircle(0, 0, (tab_w - 110) / 2);
      this.header_tabs[i].iconbg.x = this.header_tabs[i].tab_x + (tab_w / 2);
      this.header_tabs[i].iconbg.y = (tab_h / 2) - 10;
      this.header_tabs[i].iconbg.scaleX = this.header_tabs[i].iconbg.scaleY = 0.8;
      this.header_tabs[i].iconbg.shadow = iconshadow;
      this.header_tabs[i].iconbg.radius = (tab_w - 110) / 2
      this.header_container.addChild(this.header_tabs[i].iconbg);

      this.header_tabs[i].icon = new createjs.Bitmap(this.images["header_" + name]);
      this.header_tabs[i].icon.regX = this.header_tabs[i].icon.image.width / 2;
      this.header_tabs[i].icon.regY = this.header_tabs[i].icon.image.height / 2;
      this.header_tabs[i].icon.x = this.header_tabs[i].tab_x + (tab_w / 2);
      this.header_tabs[i].icon.y = (tab_h / 2) - 10;
      this.header_tabs[i].icon.scaleX = this.header_tabs[i].icon.scaleY = 0.8;
      if(name == "baccarat")  this.header_tabs[i].icon.scaleX = this.header_tabs[i].icon.scaleY = 0.9;
      this.header_container.addChild(this.header_tabs[i].icon);

      let game_name = "";
      switch(name){

        case "baccarat":
        game_name = window.language.lobby.baccaratcaps
        break;
        case "sicbo":
        game_name = window.language.lobby.sicbocaps
        break;
        case "texasholdem":
        game_name = window.language.lobby.texascaps
        break;
        case "dragontiger":
        game_name = window.language.lobby.dragontigercaps
        break;
        case "paigow":
        game_name = window.language.lobby.paigowcaps
        break;
        case "spinnwin":
        game_name = window.language.lobby.spinwincaps
        break;
        case "redwhite":
        game_name = window.language.lobby.redwhitecaps
        break;
        case "roulette":
        game_name = window.language.lobby.roulettecaps
        break;
        dafault:
        game_name = games[i].toUpperCase()
      }


      this.header_tabs[i].label = new createjs.Text(game_name, "19px LatoRegular", "#fff");
      this.header_tabs[i].label.textAlign = "center";
      this.header_tabs[i].label.x = this.header_tabs[i].tab_x + (tab_w / 2);
      this.header_tabs[i].label.y = (tab_h / 2) + 30;
      this.header_container.addChild(this.header_tabs[i].label);

      if(/*name == "spinnwin" || */name == "redwhite" || name == "roulette" /*|| (window.userAuthority == "user" && name == 'paigow')*/) {
        this.header_tabs[i].label.visible = false;
        this.header_tabs[i].soon = {
          "bg": new createjs.Shape(),
          "text": new createjs.Text("COMING SOON!", "italic 14px ArvoItalic", "#000")
        }
        this.header_tabs[i].soon.bg.graphics.beginFill("#f2e283").drawRect(-65, this.header_tabs[i].soon.text.lineHeight, 130, 20);
        this.header_tabs[i].soon.bg.x = this.header_tabs[i].tab_x + (tab_w / 2);
        this.header_tabs[i].soon.bg.y = this.header_tabs[i].label.y + 2;
        this.header_tabs[i].soon.text.textAlign = "center";
        this.header_tabs[i].soon.text.textBaseline = "middle";
        this.header_tabs[i].soon.text.x = this.header_tabs[i].soon.bg.x;
        this.header_tabs[i].soon.text.y = this.header_tabs[i].soon.bg.y + 10;
        this.header_container.addChild(this.header_tabs[i].soon.bg, this.header_tabs[i].soon.text)
      }

      // mouse event listeners
      this.header_tabs[i].bg.addEventListener("click", (e) => {
        if (this.header_tabs[i].bg.name == 'redwhite' || this.header_tabs[i].bg.name == 'roulette' /*|| (window.userAuthority == "user" && this.header_tabs[i].bg.name == 'paigow')*/) return;
        this.active_page = this.header_tabs[i].bg.name;
        this.openRulesPage();
      });

    } // end for

    let header_bg = new createjs.Shape();
    header_bg.graphics.beginFill("#262626").drawRect(0, 0, this.width, tab_h);
    header_bg.x = -40;
    this.header_container.addChildAt(header_bg, 0);

    let backgroundimage = new createjs.Bitmap(this.images.nihtan_logo);
    backgroundimage.x = -20;
    backgroundimage.y = 160;
    backgroundimage.mask = new createjs.Shape();
    backgroundimage.mask.graphics.beginFill("#00e").drawRect(0, 0, 1280, 930);
    this.stage.addChild(backgroundimage);


  },
  initPages() {
    this.init();

    // this.context.lobby_baccarat_rules.init();
    // this.context.lobby_sicbo_rules.init();
    // this.context.lobby_texasholdem_rules.init();
    // this.context.lobby_dragontiger_rules.init();
    // this.context.lobby_roulette_rules.init();
    // this.context.lobby_bigwheel_rules.init();
    // this.context.lobby_redwhite_rules.init();
  }, // end of initPages
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


    this.closeAll();

    // toggle howto content
    let arrayGames = ["sicbo","texasholdem","baccarat","dragontiger","paigow",/*"redwhite"*/,"roulette"/*,"spinnwin"*/];
    let arrayElement = ["#sicbo-toggle","#poker-toggle","#baccarat-toggle","#dragontiger-toggle","#paigow-toggle",/*"#red-white-toggle"*/,"#roulette-toggle"/*,"#bigwheel-toggle"*/];
    for(let e = 0; e < arrayElement.length; e++) {
      if(this.active_page == arrayGames[e]) {
        $(arrayElement[e]).css("display","block");
        $(".howto-contents").scrollTop(0);

        $('a[href*="#"]').click(function() {
          if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (window.nonInstall) {
              if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
                  var scale = $(`${arrayElement[e]}`)[0].getBoundingClientRect().height / $(`${arrayElement[e]}`).width();

                  var topPosition = $(this).attr('href') == '#game-objective' ? topPosition = 0 : ( (target.prev().position().left / scale) - $(`${arrayElement[e]} .howto-contents`).scrollTop() - 440 ); //35

                  var tarheight = target.height();
                  if(topPosition > tarheight) {
                    topPosition = Math.abs(topPosition) - tarheight;
                  }

                } else {
                  var scale = $(`${arrayElement[e]}`)[0].getBoundingClientRect().width / $(`${arrayElement[e]}`).width();

                  var topPosition = $(this).attr('href') == '#game-objective' ? topPosition = 0 : ((target.position().top / scale) + $(`${arrayElement[e]} .howto-contents`).scrollTop()) + 5; //35
                }
        		} else {
              var scale = $(`${arrayElement[e]}`)[0].getBoundingClientRect().width / $(`${arrayElement[e]}`).width();

              var topPosition = $(this).attr('href') == '#game-objective' ? topPosition = 0 : ((target.position().top / scale) + $(`${arrayElement[e]} .howto-contents`).scrollTop()) + 5; //35
            }//nonInstall


            if (target.length) {
              $(`${arrayElement[e]} .howto-contents`).animate({
                scrollTop: Math.abs(topPosition)
              }, 500);
              return false;
            }
          }
        });
      } else {
        $(arrayElement[e]).css("display","none");
      }
    }

  }, // end of openRulesPage
  closeAll() {
    $("#sicbo-toggle, #poker-toggle, #baccarat-toggle, #dragontiger-toggle, #paigow-toggle, #red-white-toggle, #bigwheel-toggle, #roulette-toggle").css("display","none")
  }, // end of closeAll
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

    con.width = width;
    con.height = height;
    con.columns = columnwidths.length;
    con.columnwidths = columnwidths;
    con.rows = rowcount;

    con.addChild(b);

    return con;


  }, // end of drawTable
  preloadImages() {
    this.images = {
      "nihtan_logo" : "/img/howtoplay/lobby/nihtan-logo.png",
      "header_baccarat" : "/img/howtoplay/lobby/header-baccarat.png",
      "header_dragontiger" : "/img/howtoplay/lobby/header-dragontiger.png",
      "header_paigow" : "/img/howtoplay/lobby/header-paigow.png",
      "header_redwhite" : "/img/howtoplay/lobby/header-redwhite.png",
      "header_roulette" : "/img/howtoplay/lobby/header-roulette.png",
      "header_sicbo" : "/img/howtoplay/lobby/header-sicbo.png",
      "header_spinnwin" : "/img/howtoplay/lobby/header-spinwin.png",
      "header_texasholdem" : "/img/howtoplay/lobby/header-texasholdem.png",
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
  } // end of preloadImages
}

export default {
  component_howtoplay
}
