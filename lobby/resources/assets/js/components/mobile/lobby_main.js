import {
    createSprite,
    randomNum,
    createCardSprite,
    numberCounter,
    playSound,
    numberWithCommas,
    createSpriteRoadMap,
    setCurrentTimezone
} from '../../factories/factories';
import rmformat from '../../factories/formatter';
import sboard from '../../factories/scoreboard_draw';

let drawSboard = sboard();
let formatData = rmformat();

let instance = null;

export default() => {
    instance = instance || new blu.Component({
            ads: [],
            circle_indicator: [],
            is_hover: true,
            hot_game: [],
            main() {
                // === header slider
                this.createMain();
            },
            createMain () {
                /*let bg_container = new createjs.Shape();
                 bg_container.graphics.beginFill("transparent").drawRect(0,0,1500,250);*/
                // let bg = new createjs.Bitmap("/img/Lobby-MOBILE_v2.1-update/slices/livegames-bg-mobile.png");
                // bg.setBounds(0,0,1400,900);
                // bg.x=0;
                // bg.y=0;
                this.hot_games_container = new createjs.Container();
                this.addChild(this.hot_games_container);

                /*bg_container.graphics.beginFill("transparent").drawRect(0,0,1500,250);
                 this.hot_games_container = new createjs.Container();
                 this.addChild(bg_container, this.hot_games_container);*/

                this.hot_game = [];

                // for(var x = 0; x < 4; x++) {
                // 	this.hot_game[x] = new createjs.Container();
                // 	this.hot_games_container.addChild(this.hot_game[x])
                // }

                let hot_live_tables_label = new createjs.Text(window.language.lobby.hotlivecaps,"bold 20px arvoBold","#ffb849");

                hot_live_tables_label.x = 60;
                hot_live_tables_label.y = 40;

                let hot_live_tables_width =( hot_live_tables_label.getBounds().width) + 80;

                let hot_live_games_box = new createjs.Shape();
                hot_live_games_box.graphics.setStrokeStyle(2).beginStroke("#d89e45").beginLinearGradientFill(['#cf0000', '#9b0000', '#710000'], [0, 0.5, 1], 0, 0, 273, 0).drawRoundRect(0, 0, hot_live_tables_width , 44, 7);
                hot_live_games_box.x = 18;
                hot_live_games_box.y = 30;

                let hot_live_games_border1 = new createjs.Shape();
                hot_live_games_border1.graphics.setStrokeStyle(1).beginStroke("#d89e45").drawRect(0, 0, (hot_live_tables_width - 18 ) , 28);
                hot_live_games_border1.x = hot_live_games_box.x + 9;
                hot_live_games_border1.y = hot_live_games_box.y + 8;


                let hot_live_games_border2 = new createjs.Shape();
                hot_live_games_border2.graphics.beginStroke("#d89e45")
                .moveTo(hot_live_games_border1.x + 4, hot_live_games_border1.y - 3)
                .lineTo(hot_live_tables_width + 5, hot_live_games_border1.y - 3);

                let hot_live_games_border3 = new createjs.Shape();
                hot_live_games_border3.graphics.beginStroke("#d89e45")
                .moveTo(hot_live_games_border1.x + 4, hot_live_games_border1.y + 31)
                .lineTo(hot_live_tables_width + 5, hot_live_games_border1.y + 31);

                let hot_live_games_bleft = new createjs.Bitmap("/img/seasonal_theme/chinese_newyear_theme/border.png");
                hot_live_games_bleft.scaleX = hot_live_games_bleft.scaleY = 0.93;
                hot_live_games_bleft.x = hot_live_games_box.x + 6;
                hot_live_games_bleft.y = hot_live_games_box.y + 4;

                let hot_live_games_bright = new createjs.Bitmap("/img/seasonal_theme/chinese_newyear_theme/border.png");
                hot_live_games_bright.scaleX = hot_live_games_bright.scaleY = 0.93;
                hot_live_games_bright.skewX = hot_live_games_bright.skewY = 180;
                hot_live_games_bright.x = hot_live_tables_width + 12;
                hot_live_games_bright.y = hot_live_games_box.y + 41;


                this.addChild(hot_live_games_box);
                this.addChild(hot_live_games_bright, hot_live_games_bleft, hot_live_games_border3, hot_live_games_border2, hot_live_games_border1 );
                this.addChild(hot_live_tables_label);

                /*// === arrow bg
                 let arrow_bg = new createjs.Shape();
                 arrow_bg.graphics.beginLinearGradientFill(["transparent", "rgba(0,0,0,0.5)"], [0,1], 0,0,100,0).drawRect(0,0,200,446);
                 arrow_bg.x = 1120
                 this.addChild(arrow_bg);

                 let arrow_bg2 = new createjs.Shape();
                 arrow_bg2.graphics.beginLinearGradientFill(["rgba(0,0,0,0.5)", "transparent"], [0,1], 50,0,160,0).drawRect(0,0,200,446);
                 arrow_bg2.x = 0
                 this.addChild(arrow_bg2);

                 // === arrow right
                 let arrow1 = new createjs.Shape();
                 arrow1.graphics.beginFill("#f1cf87").drawRoundRect(0,-50,8,80,4.5);
                 arrow1.x = 1236;
                 arrow1.y = 130;
                 arrow1.rotation = -35;
                 arrow1.hitArea = arrow_bg;
                 this.addChild(arrow1);

                 let arrow2 = new createjs.Shape();
                 arrow2.graphics.beginFill("#f1cf87").drawRoundRect(0,-50,8,80,4.5);
                 arrow2.x = 1225;
                 arrow2.y = 184;
                 arrow2.rotation = 35;
                 arrow2.hitArea = arrow_bg;
                 this.addChild(arrow2);

                 // === arrow left
                 let arrow3 = new createjs.Shape();
                 arrow3.graphics.beginFill("#f1cf87").drawRoundRect(0,-50,8,80,4.5);
                 arrow3.x = 34;
                 arrow3.y = 124;
                 arrow3.rotation = 35;
                 arrow3.hitArea = arrow_bg2;
                 this.addChild(arrow3);

                 let arrow4 = new createjs.Shape();
                 arrow4.graphics.beginFill("#f1cf87").drawRoundRect(0,-50,8,80,4.5);
                 arrow4.x = 45;
                 arrow4.y = 190;
                 arrow4.rotation = -35;
                 arrow4.hitArea = arrow_bg2;
                 this.addChild(arrow4);

                 arrow_bg2.visible = false;
                 arrow3.visible = false;
                 arrow4.visible = false;

                 arrow_bg.on("click", (e) => {
                 createjs.Tween.get(this.hot_games_container)
                 .to({
                 x : -1050
                 },150)
                 .call( () => {
                 arrow_bg2.visible = true;
                 arrow3.visible = true;
                 arrow4.visible = true;

                 arrow_bg.visible = false;
                 arrow1.visible = false;
                 arrow2.visible = false;
                 })
                 });

                 arrow_bg2.on("click", (e) => {
                 createjs.Tween.get(this.hot_games_container)
                 .to({
                 x : 0
                 },150)
                 .call( () => {
                 arrow_bg2.visible = false;
                 arrow3.visible = false;
                 arrow4.visible = false;

                 arrow_bg.visible = true;
                 arrow1.visible = true;
                 arrow2.visible = true;
                 })
                 });
                 */

                // === table games

                this.table_games_container = new createjs.Container();
                this.addChild(this.table_games_container);
                // this.table_games_container.y = 88;
                this.table_games_container.y = 88;
                this.table_games_container.x = 616;

                let table_games_label = new createjs.Text(window.language.lobby.allgamescaps, "20px arvoBold","#ffb849");

                table_games_label.x = 660;
                table_games_label.y = 40;

                let table_games_label_width = (table_games_label.getBounds().width) + 80;

                let table_games_box = new createjs.Shape();
                table_games_box.graphics.setStrokeStyle(2).beginStroke("#d89e45").beginLinearGradientFill(['#cf0000', '#9b0000', '#710000'], [0, 0.5, 1], 0, 0, 273, 0).drawRoundRect(0, 0, table_games_label_width , 44, 7);
                table_games_box.x = 620;
                table_games_box.y = 30;

                let table_games_border1 = new createjs.Shape();
                table_games_border1.graphics.setStrokeStyle(1).beginStroke("#d89e45").drawRect(0, 0, (table_games_label_width - 18 ) , 28);
                table_games_border1.x = table_games_box.x + 9;
                table_games_border1.y = table_games_box.y + 8;

                let table_games_border2 = new createjs.Shape();
                table_games_border2.graphics.beginStroke("#d89e45")
                .moveTo(table_games_border1.x + 4 , table_games_box.y + 5)
                .lineTo(table_games_label_width + 606, table_games_box.y + 5);

                let table_games_border3 = new createjs.Shape();
                table_games_border3.graphics.beginStroke("#d89e45")
                .moveTo(table_games_border1.x + 4, table_games_border1.y + 31)
                .lineTo(table_games_label_width + 606, table_games_border1.y + 31);

                let table_games_bleft = new createjs.Bitmap("/img/seasonal_theme/newyear_theme/border.png");
                table_games_bleft.scaleX = table_games_bleft.scaleY = 0.93;
                table_games_bleft.x = table_games_box.x + 6;
                table_games_bleft.y = table_games_box.y + 4;

                let table_games_bright = new createjs.Bitmap("/img/seasonal_theme/newyear_theme/border.png");
                table_games_bright.scaleX = table_games_bright.scaleY = 0.93;
                table_games_bright.skewX = table_games_bright.skewY = 180;
                table_games_bright.x = table_games_bleft.x  + table_games_label_width - 12;
                table_games_bright.y = table_games_box.y + 40;

                this.addChild(table_games_box);
                this.addChild(table_games_border1, table_games_border2, table_games_border3, table_games_bleft, table_games_bright);
                this.addChild(table_games_label);

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
                        "game_name": "kagaming"
                    },
                    {
                        "group": "all-games",
                        "game_name": "betsoft"
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
                        "game_name": "kagaming_zh"
                    },
                    {
                        "group": "all-games",
                        "game_name": "betsoft_zh"
                    }
                ]

                this.drawTableGames(window.language.locale == "zh" ? all_Games_zh : all_Games, this.table_games_container, all_Games);

                // === themed games
                /*this.themed_games_container = new createjs.Container();
                 this.addChild(this.themed_games_container);
                 this.themed_games_container.y = 542
                 this.themed_games_container.x = 20

                 let themed_games_label = new createjs.Text(window.language.lobby.themedgamescaps,"24px arvoBold","#e9ac4a");
                 themed_games_label.x = 18;
                 themed_games_label.y = 500;
                 this.addChild(themed_games_label);

                 let themed_Games = [
                 {
                 "group" : "themed-games",
                 "game_name" : "spinwin",
                 "icon" : "poker_icon"
                 },
                 {
                 "group" : "themed-games",
                 "game_name" : "pulaputi",
                 "icon" : "sicbo_icon"
                 }
                 ]

                 this.drawTableGames(themed_Games, this.themed_games_container);*/
            },
            makeHotTables(data) {
                if (this.hot_game.length) {
                    this.hot_game.forEach((e) => {
                        e.removeAllChildren();
                    })
                    this.hot_game = [];
                }

                this.hot_games_container.removeAllChildren();

                for (var x = 0; x < data.length; x++) {

                    this.hot_game[x] = new createjs.Container();
                    this.hot_game[x].y = 360;
                    this.hot_game[x].type = "game_container";
                    this.hot_game[x].is_hover = false;
                    this.hot_games_container.addChild(this.hot_game[x])
                }

                for (var x = 0; x < data.length; x++) {

                    this.hot_game[x].x = 18
                    this.hot_game[x].y = (x * 168) + 92
                    // this.hot_game[x].y = (x * 168) + 72
                    let bg = null;
                    bg = new createjs.Shape();
                    bg.graphics.beginFill("#fff").drawRect(0, 38, 555, 150 - 38);

                    this.hot_game[x].addChild(bg);

                    let game_name_bg = ["#980000", "#2b0000"];
                    let text_color = "#efb052";
                    let gameStr = '';
                    let gameName = "";
                    let gameRoomName = "";
                    let redirect_link = "";
                    let rangeToUse = [];
                    if (window.userType == 'TS' || window.userType == 'S') {
                        rangeToUse = data[x].sportBetRanges;
                    }
                    else if (window.userType == 'TC' || window.userType == 'C') {
                        rangeToUse = data[x].casinoBetRanges;
                    }

                    switch (data[x].gameName) {
                        case "Baccarat":
                            gameStr = window.language.lobby.baccarat;
                            gameName = "baccarat";
                            redirect_link = window.bc_domain+"m/Baccarat/"+data[x].tableNumber + "/" + rangeToUse[0].min + "-" + rangeToUse[0].max;
                            break;

                        case "Dragon-Tiger":
                            gameStr = window.language.lobby.dragontiger;
                            gameName = "dragonTiger";
                            redirect_link = window.dt_domain+"m/Dragon-Tiger/"+data[x].tableNumber + "/" + rangeToUse[0].min + "-" + rangeToUse[0].max;
                            break;

                        case "Sicbo":
                            gameStr = window.language.lobby.sicbo;
                            gameName = "sicbo";
                            redirect_link = window.sb_domain+"m/Sicbo/"+data[x].tableNumber + "/" + rangeToUse[0].min + "-" + rangeToUse[0].max;
                            break;

                        case "Poker":
                            gameStr = window.language.lobby.texas;

                            gameName = "poker";
                            redirect_link = window.poker_domain+"m/Poker/"+data[x].tableNumber + "/" + rangeToUse[0].min + "-" + rangeToUse[0].max;
                            break;
                        case "Roulette":
                            gameStr = window.language.lobby.rolette;
                            gameName = "rolette";
                            redirect_link = window.bc_domain+"m/Baccarat/"+data[x].tableNumber + "/" + rangeToUse[0].min + "-" + rangeToUse[0].max;
                            break;
                    }

                    if (data[x].roomType == "p") {
                        game_name_bg = ["#bd0000", "#7c0000"];
                        text_color = "#efb052";
                        gameRoomName = gameStr + " " + window.language.level.premium;
                    } else if (data[x].roomType == "v") {
                        game_name_bg = ["#fedd78", "#d5a515"];
                        text_color = "#000";
                        gameRoomName = gameStr + " " + window.language.level.vip;
                    } else {
                        game_name_bg = ["#980000", "#2b0000"];
                        text_color = "#efb052";
                        gameRoomName = gameStr;
                    }
                    // console.log("gameName = ", gameRoomName);
                    this.hot_game[x].redirect_link = redirect_link;

                    this.hot_game[x].game_bg = new createjs.Shape();
                    this.hot_game[x].game_bg.graphics.beginLinearGradientFill(game_name_bg, [0, 1], 0, 0, 0, 50).drawRoundRectComplex(0, 0, 555, 38, 8, 8, 0, 0);
                    this.hot_game[x].addChild(this.hot_game[x].game_bg);

                    this.hot_game[x].table_num = new createjs.Text(data[x].tableNumber.length > 1 ? data[x].tableNumber : "0" + data[x].tableNumber, "bold 20px ArvoBold", text_color);
                    this.hot_game[x].table_num.y = 8
                    this.hot_game[x].table_num.x = 12
                    this.hot_game[x].addChild(this.hot_game[x].table_num);

                    this.hot_game[x].gameName = gameName;
                    this.hot_game[x].game_name = new createjs.Text(gameRoomName, "bold 20px ArvoItalic", text_color);
                    this.hot_game[x].game_name.x = 48
                    this.hot_game[x].game_name.y = 8
                    this.hot_game[x].addChild(this.hot_game[x].game_name);

                    // for(var i = 0; i < 6; i++) {
                    // 	for(var e = 0; e < 30; e++) {
                    // 		let sp = new createjs.Shape();
                    // 		sp.graphics.beginFill("#fff").ss(1).s("rgba(0,0,0,0.4)").drawRect(0,0,18.5,18.5);
                    // 		sp.x = 18.5 * e;
                    // 		sp.y = (18.5 * i) + 38;
                    // 		this.hot_game[x].addChild(sp);
                    // 	}
                    // }

                    let lines = new createjs.Shape();
                    lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0, 29)
                    this.hot_game[x].addChild(lines);
                    let posY = bg.y + 38;
                    let posX = bg.x

                    for (var i = 0; i <= 6; i++) {
                        lines.graphics.moveTo(posX, posY + (18.5 * i)).lineTo(posX + 555, posY + (18.5 * i))
                    }
                    lines.graphics.moveTo(posX, posY)
                    for (var i = 0; i <= 30; i++) {
                        lines.graphics.moveTo(posX + (18.5 * i), posY).lineTo(posX + (18.5 * i), posY + 111)
                    }
                    lines.shadow = new createjs.Shadow("#000",2,2,5);
                    lines.alpha = .5;
                    // ==roadmap
                    this.hot_game[x].roadmap_container = new createjs.Container();
                    this.hot_game[x].roadmap_container.x = this.hot_game[x].x;
                    this.hot_game[x].roadmap_container.y = this.hot_game[x].y + 38;
                    this.hot_games_container.addChild(this.hot_game[x].roadmap_container);
                    this.makeRoadmap(data[x], x);
                    this.hot_game[x].addEventListener("click", (e) => {
                        if(e.currentTarget.gameName == "baccarat" || e.currentTarget.gameName == "dragonTiger") {
                            window.location.href = e.currentTarget.redirect_link + "/0";
                            return;
                        }
                        window.location.href = e.currentTarget.redirect_link;
                    })
                } // end for
            },
            drawTableGames (data, games_container, check) {
                games_container.cache(0, 0, 662, 500);
                for (var x = 0; x < data.length; x++) {
                    let img = new createjs.Bitmap(this.context.getResources(data[x].group + "-" + data[x].game_name));
                    img.scaleX = img.scaleY = .96;
                    img.shadow = new createjs.Shadow("rgba(0,0,0,0.3)", 0, 2, 5);
                    let text;
                    switch (window.language.locale == "zh" ? check[x].game_name.toLowerCase() : data[x].game_name.toLowerCase()) {
                        case "dragontiger":
                            text = window.language.lobby.dragontigercaps;
                            break;
                        case "roulette":
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
                            text = window.language.lobby.redwhitecaps;
                            break;
                        case "kagaming":
                            text = window.language.lobby.kagamingreelcaps;
                            break;
                        case "betsoft":
                            text = window.language.lobby.betsoftreelcaps;
                            break;
                        case "paigow":
                            text = window.language.lobby.paigowcaps;
                            break;
                        default:
                            text = data[x].game_name.toUpperCase();
                    }
                    let game_label = [];

                    game_label[x] = new createjs.Text(text, window.language.locale == "zh" ? "25px latoRegular" : "18px latoRegular", "#000");

                    if(window.language.locale == "zh") {
                        game_label[x].font = "25px latoRegular";

                        if(check[x].game_name.toLowerCase() == "kagaming" || check[x].game_name.toLowerCase() == "betsoft" || check[x].game_name.toLowerCase() == "roulette" || check[x].game_name.toLowerCase() == "paigow"){
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

                    games_container.addChild(img);
                    img.gamename = data[x].game_name;

                    if (img.gamename != "roulette") {
                        img.addEventListener("click", (e) => {
                            if ("sub_" + e.currentTarget.gamename != "sub_redwhite" 
                                && "sub_" + e.currentTarget.gamename != "sub_redwhite_zh" 
                                && "sub_" + e.currentTarget.gamename != "sub_roulette" 
                                && "sub_" + e.currentTarget.gamename != "sub_paigow" 
                                && "sub_" + e.currentTarget.gamename != "sub_paigow_zh" 
                                && "sub_" + e.currentTarget.gamename != "sub_roulette_zh"
                                && "sub_" + e.currentTarget.gamename != "sub_betsoft"
                                && "sub_" + e.currentTarget.gamename != "sub_betsoft_zh") {
                                    toggleView("sub_" + e.currentTarget.gamename);
                            }
                        })
                    }

                    img.on("click", (e) =>{
                          if(e.currentTarget.gamename == "kagaming_zh" || e.currentTarget.gamename == "kagaming") {
                            reelClicked++;
                            if(window.reel_yn === 1) {
                              window.toggleView("reel_games");
                              this.context.lobby_reelGames.toggleView("kagaming");
                            }
                              try {
                                    this.context.lobby_reelGames_subHeader.subheader_con.children[4].graphics.clear().beginFill("#d06900").drawRect(0, 0, 220, 68);
                              } catch (e) { }
                          }
                    });

                    games_container.addChild(game_label[x]);
                }
                setTimeout(() => {
                    games_container.updateCache();
                },100)

            },
            makeRoadmap(data, x) {
                this.hot_game[x].roadmap_container.cache(0, 0, 557, 112);
                this.hot_game[x].roadmap_container.removeAllChildren();

                if (data.gameName == "Baccarat") {
                    let rm_data = formatData.fnFormatBCBigRoad(data.marks, 6, 32);

                    for (var i = 0; i < rm_data.matrix.length; i++) {
                        for (var e = 0; e < rm_data.matrix[i].length; e++) {
                            if (rm_data.matrix[i][e] === undefined) continue;
                            let sp = createSpriteRoadMap(this.context.getResources("all_scoreboard"), 40, 40, sp);

                            sp.x = e * 18.5;
                            sp.y = i * 18.5;
                            sp.scaleX = sp.scaleY = .47;

                            if (rm_data.matrix[i][e].ties) {
                                if (rm_data.matrix[i][e].ties > 1) {
                                    let tie_text = new createjs.Text(rm_data.matrix[i][e].ties, "bold 12px BebasNeue", "#000");
                                    tie_text.y = sp.y + (20 / 2) + 1;
                                    tie_text.x = sp.x + 20 / 2;
                                    tie_text.textAlign = "center";
                                    tie_text.textBaseline = "middle";
                                    this.hot_game[x].roadmap_container.addChild(tie_text);
                                }

                                sp.gotoAndStop("big-" + rm_data.matrix[i][e].mark + "-t");
                            } else {
                                sp.gotoAndStop("big-" + rm_data.matrix[i][e].mark);
                            }
                            this.hot_game[x].roadmap_container.addChild(sp);
                        }
                    }

                } // end if
                // dragon tiger roadmap
                if (data.gameName == "Dragon-Tiger") {
                    let rm_data = formatData.fnFormatDTBigRoad(data.marks, 6, 30);
                    this.hot_game[x].roadmap_container.cache(0, 0, 557, 112);
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
                                    this.hot_game[x].roadmap_container.addChild(tie_text);
                                }
                                sp.children[sp.children.length - 1].visible = true;
                                if(rm_data.matrix[i][e].suited_tie) {
                                    sp.children[sp.children.length-1].graphics.clear().beginFill("#ff9800").drawRect(0,0,3,30);
                                }
                            }
                            this.hot_game[x].roadmap_container.x = this.hot_game[x].x + -2;
                            this.hot_game[x].roadmap_container.y = this.hot_game[x].y + 35;
                            this.hot_game[x].roadmap_container.addChild(sp);
                        }
                    }

                } // end if
                // sicbo road map
                if (data.gameName == "Sicbo") {
                    let rm_data = formatData.fnFormatSicbo(data.marks, 30, 6).size;
                    this.hot_game[x].roadmap_container.cache(0, 0, 557, 112);
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
                                    this.hot_game[x].roadmap_container.addChild(rm_data[e][i], rm_data[e][i].text);
                                }
                            } //end for
                        } //end if
                    }

                } // end if

                if (data.gameName == "Poker") {
                    this.hot_game[x].roadmap_container.cache(0, 0, 557, 112);
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

                            this.hot_game[x].roadmap_container.addChild(sp, text);

                        }
                    } // end for

                }

                this.hot_game[x].roadmap_container.updateCache();
            }

        });

    return instance;
}
