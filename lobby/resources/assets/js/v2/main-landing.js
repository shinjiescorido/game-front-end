import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';
import rmformat from '../factories/formatter';
import sboard from '../factories/scoreboard_draw';

let drawSboard = sboard();
let formatData = rmformat();

let landing_canvas = document.createElement("canvas");
$(landing_canvas).attr({
  'id' : 'landing',
  'width' : '1280px',
  'height' : '620px'
});
$(landing_canvas).css({
  'top': '97px',
  'position': 'absolute'
})

$('.lobby-main-container').append(landing_canvas)

let component_landing = {
  hotGames : [],
  stage : new createjs.Stage("landing"),
  hotGames_container : new createjs.Container(),
  main () {
    this.setUser();

    if (window.nonInstall) {
      if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
        this.stage.regX = 2;
        this.stage.regY = 610;
        this.stage.rotation = 90;
      } else {
        this.stage.regX = 0;
        this.stage.regY = 0;
        this.stage.rotation = 0;
      }
		} //nonInstall

    let hot_live_tables_label = new createjs.Text(window.language.lobby.hotlivecaps,"bold 24px arvoBold","#ffb849")
    hot_live_tables_label.x = 18 ;
    hot_live_tables_label.y = 20 ;
    this.stage.addChild(hot_live_tables_label);

    let table_games_label = new createjs.Text(window.language.lobby.allgamescaps, "24px arvoBold","#ffb849");

    table_games_label.x = 620 ;
    table_games_label.y = 20 ;

    this.stage.addChild(table_games_label);

    let all_Games = [
      {
        "group": "all-games",
        "game_name": "baccarat",
      },
      {
        "group": "all-games",
        "game_name": "poker",
      },
      {
        "group": "all-games",
        "game_name": "sicbo",
      },
      {
        "group": "all-games",
        "game_name": "dragonTiger",
      },
      {
        "group": "all-games",
        "game_name": "roulette",
      },
      {
        "group": "all-games",
        "game_name": "redwhite",
      },
      {
        "group": "all-games",
        "game_name": "paigow",
      },
      {
        "group": "all-games",
        "game_name": "kagaming",
        "ka_gaming": true
      },
      {
        "group": "all-games",
        "game_name": "kagaming",
        "ka_gaming": true
      }

    ]

    let all_Games_zh = [
      {
        "group": "all-games",
        "game_name": "baccarat",
      },
      {
        "group": "all-games",
        "game_name": "poker",
      },
      {
        "group": "all-games",
        "game_name": "sicbo",
      },
      {
        "group": "all-games",
        "game_name": "dragonTiger",
      },
      {
        "group": "all-games",
        "game_name": "roulette_zh",
      },
      {
        "group": "all-games",
        "game_name": "redwhite_zh",
      },
      {
        "group": "all-games",
        "game_name": "paigow_zh",
      },
      {
        "group": "all-games",
        "game_name": "kagaming_zh",
        "ka_gaming": true
      },
      {
        "group": "all-games",
        "game_name": "kagaming_zh",
        "ka_gaming": true
      }
    ]

    let all_Games_th = [
      {
        "group": "all-games",
        "game_name": "baccarat",
      },
      {
        "group": "all-games",
        "game_name": "poker",
      },
      {
        "group": "all-games",
        "game_name": "sicbo",
      },
      {
        "group": "all-games",
        "game_name": "dragonTiger",
      },
      {
        "group": "all-games",
        "game_name": "roulette_th",
      },
      {
        "group": "all-games",
        "game_name": "redwhite_th",
      },
      {
        "group": "all-games",
        "game_name": "paigow_th",
      },
      {
        "group": "all-games",
        "game_name": "kagaming",
        "ka_gaming": true
      },
      {
        "group": "all-games",
        "game_name": "kagaming",
        "ka_gaming": true
      }
    ]

    setTimeout(() => {
      this.drawTableGames(window.language.locale == "zh" ? all_Games_zh : window.language.locale == "th" ? all_Games_th : all_Games);
    }, 2000)

    this.stage.addChild(this.hotGames_container);
  }, // end of main
  setRandom(data) {
    let random = data[Math.floor(Math.random()*data.length)];
    return random;
  },
  drawTableGames(data) {
    this.allTablesContainer = new createjs.Container();
    this.allTablesContainer.set({x:616, y:68})
    this.stage.addChild(this.allTablesContainer);

    let gameArr = ['DaVinci', 'Giants', '777Vegas', 'MayanGold', 'SuperKeno', 'Poseidon', 'Stonehenge', 'RedRidingHood', 'GoldRush', 'SuperShot'];
    let random1 = Math.floor(Math.random()*gameArr.length);
    let random2 = random1 == 0 ? (random1 + 1) : (random1 - 1);

    for (var x = 0; x < data.length; x++) {
      let img;
      let imgSrc;

      if (data[x].ka_gaming) {
        if (!data[x].img_src && x == 7) {
          imgSrc = this.context.imgSrc1;

          if (!imgSrc) {
            imgSrc = 'https://rmpiconcdn.kaga88.com/kaga/gameIcon?game='+gameArr[random1]+'&lang=en&type=square';
          }
        }
        else if (!data[x].img_src && x == 8) {
          imgSrc = this.context.imgSrc2;

          if (!imgSrc) {
            imgSrc = 'https://rmpiconcdn.kaga88.com/kaga/gameIcon?game='+gameArr[random2]+'&lang=en&type=square';
          }
        }

        img = new createjs.Bitmap(imgSrc);
        img.setBounds(0,0,457,270);
        img.scaleX = 0.475;
        img.scaleY = 0.36;
      }
      else {
        img = new createjs.Bitmap(this.context.load.getResources(data[x].group + "-" + data[x].game_name));
        img.scaleX = img.scaleY = .96;
      }
      img.shadow = new createjs.Shadow("rgba(0,0,0,0.3)", 0, 2, 5);

      let text;

      switch (window.language.locale == "zh" ? data[x].game_name.toLowerCase() : window.language.locale == "th" ? data[x].game_name.toLowerCase() : data[x].game_name.toLowerCase()) {
        case "dragontiger":
        text = window.language.lobby.dragontigercaps;
        break;
        case "roulette":
        case "roulette_zh":
        case "roulette_th":
        text = window.language.lobby.roulettecaps;
        break;
        case "sicbo":
        text = window.language.lobby.sicbocaps;
        break;
        case "poker":
        text = window.language.lobby.texascaps;
        break;
        case "baccarat":
        text = window.language.lobby.baccaratcaps;
        break;
        case "spinwin":
        text = window.language.lobby.spinwincaps;
        break;
        case "redwhite":
        case "redwhite_zh":
        case "redwhite_th":
        text = window.language.lobby.redwhitecaps;
        break;
        case "kagaming":
        case "kagaming_zh":
        text = ''; // window.language.lobby.kagamingreelcaps
        break;
        case "betsoft":
        case "betsoft_zh":
        text = window.language.lobby.betsoftreelcaps;
        break;
        case "paigow":
        case "paigow_zh":
        case "paigow_th":
        text = window.language.lobby.paigowcaps;
        break;
        default:
        text = data[x].game_name.toUpperCase();
      }
      let game_label = [];

      game_label[x] = new createjs.Text(text, window.language.locale == "zh" ? "25px latoRegular" : "18px latoRegular", "#000");

      if(window.language.locale == "zh") {
        game_label[x].font = "25px latoRegular";

        if(data[x].game_name.toLowerCase() == "kagaming_zh" || data[x].game_name.toLowerCase() == "betsoft_zh"){
          game_label[x].font = "19px latoRegular";
        }
      }

      if (x > 2 && x < 6) {
        img.y = 168;
        img.x = (x - 3) * (img.getTransformedBounds().width + 8);
        game_label[x].x = (img.x - 3) + (img.getTransformedBounds().width / 2) + 20;
        game_label[x].y = img.getTransformedBounds().height + 129;
        game_label[x].textAlign = "center";

        if(window.language.locale == "zh") {
          game_label[x].y = img.getTransformedBounds().height + 124.5;
        }
      }
      else if (x > 5) {
        img.y = 336;
        img.x = (x - 5) * (img.getTransformedBounds().width + 8) - 223;
        game_label[x].x = (img.x - 3) + (img.getTransformedBounds().width / 2) + 20;
        game_label[x].y = img.getTransformedBounds().height + 297;
        game_label[x].textAlign = "center";

        if(window.language.locale == "zh") {
          game_label[x].y = img.getTransformedBounds().height + 290 + 5;
        }

        if (data[x].ka_gaming) {
          img.y = 340;
        }
      }
      else {
        img.x = x * (img.getTransformedBounds().width + 8);
        game_label[x].x = (img.x - 3) + (img.getTransformedBounds().width / 2) + 20;
        game_label[x].y = img.getTransformedBounds().height - 39;
        game_label[x].textAlign = "center";

        if(window.language.locale == "zh") {
          game_label[x].y = img.getTransformedBounds().height - 39 - 5;
        }
      }

      this.allTablesContainer.addChild(img);
      img.gamename = data[x].game_name;

      if (data[x].ka_gaming) {
        let mask = new createjs.Shape();
        mask.graphics.beginFill("#000").drawRoundRect(0, 0, 202, 153, 8);
        mask.alpha = 0.01;
        mask.x = img.x;
        mask.y = img.y;
        mask.gamename = "kagaming";
        img.mask = mask;
        this.allTablesContainer.addChild(mask);

        mask.addEventListener("click", (e) => {
          if(e.currentTarget.gamename == "kagaming" && window.reel_yn === 0) return;

          if(window.game_settings.sicbo == 1 || window.game_settings.paigow == 1) return;
          if(_.find(arr, (a)=> { return a === e.currentTarget.gamename})) return;
          toggle.toggleView(e.currentTarget.gamename);
        });
      }

      let arr = ["betsoft_zh", "betsoft", "redwhite", "redwhite_zh", "roulette", "roulette_zh", "paigow", "paigow_zh"];

      img.addEventListener("click", (e) => {
        if(e.currentTarget.gamename == "kagaming") return;
        if(_.find(arr, (a)=> { return a === e.currentTarget.gamename})) return;
        $('.header-sub-mb__items').removeClass('active');
        $('.header-subnav-mb').hide();

        if(e.currentTarget.gamename == "baccarat") {
          $('#livegames-mb, #baccarat-classic-mb, .header-sub-mb__items.-baccarat-mb').addClass('active');
          $('.header-sub-mb.-livegames-sub').show();
        }
        else if(e.currentTarget.gamename == "poker") {
          $('#livegames-mb, .header-sub-mb__items.-poker-mb').addClass('active');
          $('.header-sub-mb.-livegames-sub').show();
        }
        else if(e.currentTarget.gamename == "dragonTiger") {
          $('#livegames-mb, .header-sub-mb__items.-dragontiger-mb').addClass('active');
          $('.header-sub-mb.-livegames-sub').show();
        }
        else if(e.currentTarget.gamename == "sicbo") {
          $('#livegames-mb, #sicbo-classic-mb, .header-sub-mb__items.-sicbo-mb').addClass('active');
          $('.header-sub-mb.-livegames-sub').show();
        }
        else if(e.currentTarget.gamename == "kagaming") {
          $('#reelgames-mb, .header-sub-mb__items.-all-mb').addClass('active');
          $('.header-sub-mb.-reelgames-sub').show();
        }
        toggle.toggleView(e.currentTarget.gamename);
      });

      this.allTablesContainer.addChild(game_label[x]);
    }

    setTimeout(() => {
      this.stage.update()
    }, 1000)
  }, // end of drawTablegames
  createHotGames(data) {
    if(this.hotGames.length) { //emptying containers
      this.hotGames.forEach((e) => {
        e.removeAllChildren();
      });

      this.hotGames_container.removeAllChildren();
    } // end if

    for (var x = 0; x < data.length; x++) {
      this.hotGames[x] = new createjs.Container();
      this.hotGames[x].set({y : (x * 168) + 72, x : 18, type : 'game_container'});
      this.hotGames_container.addChild(this.hotGames[x]);

      let bg = new createjs.Shape();
      bg.graphics.beginFill("#fff").drawRect(0, 38, 555, 150 - 38);
      this.hotGames[x].addChild(bg);

      let game_preset = {
        game_name_bg : ["#980000", "#2b0000"],
        text_color : "#efb052",
        gameStr : '',
        gameRoomName : '',
        redirect_link : '',
        rangeToUse : []
      }

      if (window.userType == 'TS' || window.userType == 'S') {
        game_preset.rangeToUse = data[x].sportBetRanges;
      }
      else if (window.userType == 'TC' || window.userType == 'C') {
        game_preset.rangeToUse = data[x].casinoBetRanges;
      }

      switch (data[x].gameName) {
        case "Baccarat":
          game_preset.gameStr = window.language.lobby.baccarat;
          game_preset.gameName = "baccarat";
          if (window.nonInstall) {
            game_preset.redirect_link = window.bc_domain+"non/Baccarat/"+data[x].tableNumber + "/" + game_preset.rangeToUse[0].min + "-" + game_preset.rangeToUse[0].max;
          } else {
            game_preset.redirect_link = window.bc_domain+"m/Baccarat/"+data[x].tableNumber + "/" + game_preset.rangeToUse[0].min + "-" + game_preset.rangeToUse[0].max;
          }
          break;
        case "Dragon-Tiger":
          game_preset.gameStr = window.language.lobby.dragontiger;
          game_preset.gameName = "dragonTiger";
          if (window.nonInstall) {
            game_preset.redirect_link = window.dt_domain+"non/Dragon-Tiger/"+data[x].tableNumber + "/" + game_preset.rangeToUse[0].min + "-" + game_preset.rangeToUse[0].max;
          } else {
            game_preset.redirect_link = window.dt_domain+"m/Dragon-Tiger/"+data[x].tableNumber + "/" + game_preset.rangeToUse[0].min + "-" + game_preset.rangeToUse[0].max;
          }
          break;
        case "Sicbo":
          game_preset.gameStr = window.language.lobby.sicbo;
          game_preset.gameName = "sicbo";
          if (window.nonInstall) {
            game_preset.redirect_link = window.sb_domain+"non/Sicbo/"+data[x].tableNumber + "/" + game_preset.rangeToUse[0].min + "-" + game_preset.rangeToUse[0].max;
          } else {
            game_preset.redirect_link = window.sb_domain+"m/Sicbo/"+data[x].tableNumber + "/" + game_preset.rangeToUse[0].min + "-" + game_preset.rangeToUse[0].max;
          }
          break;
        case "Poker":
          game_preset.gameStr = window.language.lobby.texas;
          game_preset.gameName = "poker";

          if (window.nonInstall) {
            game_preset.redirect_link = window.poker_domain+"non/Poker/"+data[x].tableNumber + "/" + game_preset.rangeToUse[0].min + "-" + game_preset.rangeToUse[0].max;
          } else {
            game_preset.redirect_link = window.poker_domain+"m/Poker/"+data[x].tableNumber + "/" + game_preset.rangeToUse[0].min + "-" + game_preset.rangeToUse[0].max;
          }
          break;
      }

      if (data[x].roomType == "p") {
        game_preset.game_name_bg = ["#bd0000", "#7c0000"];
        game_preset.text_color = "#efb052";
        game_preset.gameRoomName = game_preset.gameStr + " " + window.language.level.premium;
      } else if (data[x].roomType == "v") {
        game_preset.game_name_bg = ["#fedd78", "#d5a515"];
        game_preset.text_color = "#000";
        game_preset.gameRoomName = game_preset.gameStr + " " + window.language.level.vip;
      } else {
        game_preset.game_name_bg = ["#980000", "#2b0000"];
        game_preset.text_color = "#efb052";
        game_preset.gameRoomName = game_preset.gameStr;
      }

      this.hotGames[x].redirect_link = game_preset.redirect_link;

      this.hotGames[x].game_bg = new createjs.Shape();
      this.hotGames[x].game_bg.graphics.beginLinearGradientFill(game_preset.game_name_bg, [0, 1], 0, 0, 0, 50).drawRoundRectComplex(0, 0, 555, 38, 8, 8, 0, 0);
      this.hotGames[x].addChild(this.hotGames[x].game_bg);

      this.hotGames[x].table_num = new createjs.Text(data[x].tableNumber.length > 1 ? data[x].tableNumber : "0" + data[x].tableNumber, "bold 20px ArvoBold", game_preset.text_color);
      this.hotGames[x].table_num.y = 8
      this.hotGames[x].table_num.x = 12
      this.hotGames[x].addChild(this.hotGames[x].table_num);

      this.hotGames[x].gameName = game_preset.gameName;
      this.hotGames[x].game_name = new createjs.Text(game_preset.gameRoomName, "bold 20px ArvoItalic", game_preset.text_color);
      this.hotGames[x].game_name.x = 48
      this.hotGames[x].game_name.y = 8
      this.hotGames[x].addChild(this.hotGames[x].game_name);

      let lines = new createjs.Shape();
      lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0, 29)
      this.hotGames[x].addChild(lines);

      let posY = bg.y + 38;
      let posX = bg.x

      for (var i = 0; i <= 6; i++) {
        lines.graphics.moveTo(posX, posY + (18.5 * i)).lineTo(posX + 555, posY + (18.5 * i))
      }
      lines.graphics.moveTo(posX, posY)
      for (var i = 0; i <= 30; i++) {
        lines.graphics.moveTo(posX + (18.5 * i), posY).lineTo(posX + (18.5 * i), posY + 111)
      }
      // lines.shadow = new createjs.Shadow("#000",2,2,5);
      lines.alpha = .5;

      // ==roadmap
      this.hotGames[x].roadmap_container = new createjs.Container();
      this.hotGames[x].roadmap_container.x = this.hotGames[x].x;
      this.hotGames[x].roadmap_container.y = this.hotGames[x].y + 38;
      this.hotGames_container.addChild(this.hotGames[x].roadmap_container);
      this.makeRoadmap(data[x], this.hotGames[x]);

      this.hotGames[x].addEventListener("click", (e) => {
        if(e.currentTarget.gameName == "baccarat" || e.currentTarget.gameName == "dragonTiger") {
          window.location.href = e.currentTarget.redirect_link + "/0";
          return;
        }
        window.location.href = e.currentTarget.redirect_link;
      });
    } // end for loop
    this.stage.update()
  }, // end of createHotGames
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

    $(".header-avatar-mb img").attr("src","/img/avatar/"+window.config.default+'.png')
    $(".header-userinfo-mb__name span").text(window.username)
    $(".header-userinfo-mb__holdings span").text(currency+numberWithCommas(window.money))

    if((currency+numberWithCommas(window.money)).length > 8) {
      $(".header-userinfo-mb__holdings span").wrap("<div class='marquee'>")
    }
  },
  makeRoadmap (data, _target) {
    _target.roadmap_container.removeAllChildren();
    //== baccarat roadmap
    if (data.gameName == "Baccarat") {
      let rm_data = formatData.fnFormatBCBigRoad(data.marks, 6, 32);

      for (var i = 0; i < rm_data.matrix.length; i++) {
        for (var e = 0; e < rm_data.matrix[i].length; e++) {
          if (rm_data.matrix[i][e] === undefined) continue;
          let sp = createSpriteRoadMap(this.context.load.getResources("all_scoreboard"), 40, 40, sp);

          sp.x = e * 18.5;
          sp.y = i * 18.5;
          sp.scaleX = sp.scaleY = .47;

          if (rm_data.matrix[i][e].ties) {
            if (rm_data.matrix[i][e].ties > 1) {
              let tie_text = new createjs.Text(rm_data.matrix[i][e].ties, "bold 16px BebasNeue", "#000");
              tie_text.y = sp.y + (20 / 2) + 1;
              tie_text.x = sp.x + (20 / 2) - 1;
              tie_text.textAlign = "center";
              tie_text.textBaseline = "middle";
              _target.roadmap_container.addChild(tie_text);
            }
            sp.gotoAndStop("big-" + rm_data.matrix[i][e].mark + "-t");
          } else {
            sp.gotoAndStop("big-" + rm_data.matrix[i][e].mark);
          }
          _target.roadmap_container.addChild(sp);
        }
      }
    } // end if baccarat

    // == dragontiger roadmap
    if (data.gameName == "Dragon-Tiger") {
      let rm_data = formatData.fnFormatDTBigRoad(data.marks, 6, 30);
      for (var i = 0; i < rm_data.matrix.length; i++) {
        for (var e = 0; e < rm_data.matrix[i].length; e++) {
          if (rm_data.matrix[i][e] === undefined) continue;
          let sp = drawSboard("bigroad")[rm_data.matrix[i][e].mark];
          sp.x = (e * 18.5) + 1.5;
          sp.y = (i * 18.5) + 1.5;
          sp.scaleX = sp.scaleY = .65;

          if (rm_data.matrix[i][e].ties) {
            if (rm_data.matrix[i][e].ties > 1) {
              let tie_text = new createjs.Text(rm_data.matrix[i][e].ties, "bold 16px BebasNeue", "#000");
              tie_text.y = sp.y + 10 + 1;
              tie_text.x = sp.x + 10;
              tie_text.textAlign = "center";
              tie_text.textBaseline = "middle";
              _target.roadmap_container.addChild(tie_text);
            }
            sp.children[sp.children.length - 1].visible = true;
            if(rm_data.matrix[i][e].suited_tie) {
              sp.children[sp.children.length-1].graphics.clear().beginFill("#ff9800").drawRect(0,0,3,30);
            }
          }
          _target.roadmap_container.x = _target.x + -2;
          _target.roadmap_container.y = _target.y + 35;
          _target.roadmap_container.addChild(sp);
        }
      }
    } // end if dragontiger

    // == sicbo roadmap
    if (data.gameName == "Sicbo") {
      let rm_data = formatData.fnFormatSicbo(data.marks, 29, 6).size;
      for (var e = 0; e < rm_data.length; e++) {
        if (rm_data[e] !== undefined) {
          for (var i = 0; i < rm_data[e].length; i++) {
            if (!rm_data[e][i]) continue;

            if (rm_data[e][i] !== undefined) {
              let color = "#e5b241";
              let text_val = rm_data[e][i];
              let font_size = "10px";

              if (text_val.length > 2) {
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
              rm_data[e][i].graphics.beginFill(color).drawCircle(8, 8, 8);
              rm_data[e][i].x = (e * 18.5) + 1.5;
              rm_data[e][i].y = (i * 18.5) + 1.5;

              rm_data[e][i].text = new createjs.Text(text_val, window.language.locale == "zh" ? font_size + " lato" : "bold " + font_size + " lato", "#fff");
              rm_data[e][i].text.x = rm_data[e][i].x + 8;
              rm_data[e][i].text.y = rm_data[e][i].y + 7.5;

              rm_data[e][i].text.textAlign = "center";
              rm_data[e][i].text.textBaseline = "middle";
              _target.roadmap_container.addChild(rm_data[e][i], rm_data[e][i].text);
            }
          } //end for
        } //end if
      }
    } // end if

    // == poker
    if (data.gameName == "Poker") {
      let rm_data = formatData.fnFormatPokerRoadMap(data.marks, 6, 30);
      let circle = "";
      let radius = "";
      let text = "";
      for (var e = 0; e < rm_data.length; e++) {
        for (var i = 0; i < rm_data[e].length; i++) {
          var sp = new createjs.Shape();
          if (!rm_data[e][i]) continue;

          if (rm_data[e][i] == "D") {
            circle = "#cd342f"
          } else if (rm_data[e][i] == "T") {
            circle = "#41a257"
          } else if (rm_data[e][i] == "P") {
            circle = "#1268cb"
          }

          sp.graphics.beginFill(circle).drawCircle(8, 8, 8);
          sp.x = (e * 18.5) + 1.5;
          sp.y = (i * 18.5) + 1.5;

          let text;

          if(window.language.locale == "zh") {
            if(rm_data[e][i] == "P") { text = new createjs.Text("闲", "11px lato", "#fff"); }
            if(rm_data[e][i] == "T") { text = new createjs.Text("和", "11px lato", "#fff"); }
            if(rm_data[e][i] == "D") { text = new createjs.Text("荷", "11px lato", "#fff"); }
          } else {
            if(rm_data[e][i] == "P") { text = new createjs.Text("P", "10px lato", "#fff"); }
            if(rm_data[e][i] == "T") { text = new createjs.Text("T", "10px lato", "#fff"); }
            if(rm_data[e][i] == "D") { text = new createjs.Text("D", "10px lato", "#fff"); }
          }

          text.x = sp.x + 8;
          text.y = sp.y + 8;
          text.textAlign = "center";
          text.textBaseline = "middle";
          _target.roadmap_container.addChild(sp, text);
        }
      } // end for
    }

    this.stage.update()
  } // end make roadmap
}

export default {
  component_landing
}
