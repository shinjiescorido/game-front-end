/**
 * scoreboard.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** draws the scoreboard **/

let instance = null;

export default () => {

	instance = instance || new blu.Component({
		main() {

			let height = 190;

			this.y = this.context.context.height - height;

			let spriteData = {
				images: [this.context.getResources(window.language.locale == "zh" ? "numeric_stats_zh" : "numeric_stats")],
				frames: {width:44, height: 27},
				animations: {
					"d-0" : 0,
					"d-1" : 1,
					"d-2" : 2,
					"d-3" : 3,
					"d-4" : 4,

					"tie-grey" : 5,
					"tie-green" : 6,

					"t-7" : 7,
					"t-8" : 8,
					"t-9" : 9,
					"t-10" : 10,
					"t-11" : 11
				}
			}

			// game stastics bg
			// this.background = new createjs.Shape();
			// this.background.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0,0,270,190);
			// this.background.cache(0,0,270,190);
			// this.addChild(this.background);
			//
			// let spriteSheet = new createjs.SpriteSheet(spriteData);
			//
			// this.label_text_1 = new createjs.Text(window.language.game_specific.dragoncaps, window.language.locale == "zh" ? "bold 21px lato-regular" : "bold 16px lato-regular", this.context.theme_color[window.theme].text_color);
			// this.label_text_1.x = 265/2;
			// this.label_text_1.textAlign = "center";
			//
			// if(window.language.locale == "zh") {
			// 				this.label_text_1.y = 5;
			// } else {
			// 				this.label_text_1.y = 15;
			// }
			//
			// this.addChild(this.label_text_1);
			//
			// this.label_text_2 = new createjs.Text(window.language.game_specific.tigercaps, window.language.locale == "zh" ? "bold 21px lato-regular" : "bold 16px lato-regular", this.context.theme_color[window.theme].text_color);
			// this.label_text_2.x = 260/2;
			// this.label_text_2.textAlign = "center";
			//
			// if(window.language.locale  == "zh") {
			// 				this.label_text_2.y = 155;
			// } else {
			// 				this.label_text_2.y = 150;
			// }
			//
			// this.addChild(this.label_text_2);
			//
			// let dragon_bg  = [];
			// let tiger_bg = [];
			//
			// let t = 7;
			//
			// for(var x = 0; x < 5; x++) {
			// 	dragon_bg[x] = new createjs.Sprite(spriteSheet,"d-"+x+"");
      //   dragon_bg[x].scaleX = dragon_bg[x].scaleY = 1.05;
			// 	dragon_bg[x].x = (x * 50) + 12;
			// 	dragon_bg[x].y = 40
			// 	this.addChild(dragon_bg[x]);
			//
			// 	tiger_bg[x] = new createjs.Sprite(spriteSheet, "t-" + t + "");
      //   tiger_bg[x].scaleX = tiger_bg[x].scaleY = 1.05;
			// 	tiger_bg[x].x = (x * 50) + 12;
			// 	tiger_bg[x].y = 115;
			// 	this.addChild(tiger_bg[x]);
			// 	t++;
			// }
			//
			// // let grey_bg = new createjs.Sprite(spriteSheet, "tie-grey");
			// // grey_bg.x = 85;
			// // grey_bg.y = 78;
			// // this.addChild(grey_bg);
			//
			// let tie_bg = new createjs.Sprite(spriteSheet, "tie-green");
			// this.addChild(tie_bg);
			// tie_bg.x = 112;
			// tie_bg.y = 78;
			//
 			// this.x = 950;
 			// let pos = 45.5;
			//
 			// //=== text init
 			// this.dragon_text = new createjs.Text("0", "20px bebas-regular", "#fff");
 			// this.dragon_text.textAlign = "right";
      // this.dragon_text.x = dragon_bg[0].x + 42;
 			// this.dragon_text.y = 43;
 			// this.addChild(this.dragon_text);
			// //mark work
			//
 			// this.dragon_big_text = new createjs.Text("0", "20px bebas-regular", "#fff");
 			// this.dragon_big_text.textAlign = "right";
 			// this.dragon_big_text.x = dragon_bg[1].x + 42;
      // this.dragon_big_text.y = this.dragon_text.y;
 			// this.addChild(this.dragon_big_text);
			//
 			// this.dragon_small_text = new createjs.Text("0", "20px bebas-regular", "#fff");
 			// this.dragon_small_text.textAlign = "right";
 			// this.dragon_small_text.x = dragon_bg[2].x + 42;
 			// this.dragon_small_text.y = this.dragon_big_text.y;
 			// this.addChild(this.dragon_small_text);
			//
 			// this.dragon_odd_text = new createjs.Text("0", "20px bebas-regular", "#fff");
 			// this.dragon_odd_text.textAlign = "right";
 			// this.dragon_odd_text.x = dragon_bg[3].x + 42;
 			// this.dragon_odd_text.y = this.dragon_small_text.y;
 			// this.addChild(this.dragon_odd_text);
			//
 			// this.dragon_even_text = new createjs.Text("0", "20px bebas-regular", "#fff");
 			// this.dragon_even_text.textAlign = "right";
 			// this.dragon_even_text.x = dragon_bg[4].x + 42;
 			// this.dragon_even_text.y = this.dragon_odd_text.y;
 			// this.addChild(this.dragon_even_text);
			//
 			// this.tiger_text = new createjs.Text("0", "20px bebas-regular", "#fff");
 			// this.tiger_text.textAlign = "right";
 			// this.tiger_text.x = tiger_bg[0].x + 42;
 			// this.tiger_text.y = 119;
 			// this.addChild(this.tiger_text);
			//
 			// this.tiger_big_text = new createjs.Text("0", "20px bebas-regular", "#fff");
 			// this.tiger_big_text.textAlign = "right";
      // this.tiger_big_text.x = tiger_bg[1].x + 42;
 			// this.tiger_big_text.y = this.tiger_text.y;
 			// this.addChild(this.tiger_big_text);
			//
 			// this.tiger_small_text = new createjs.Text("0", "20px bebas-regular", "#fff");
 			// this.tiger_small_text.textAlign = "right";
 			// this.tiger_small_text.x = tiger_bg[2].x + 42;
 			// this.tiger_small_text.y = this.tiger_big_text.y;
 			// this.addChild(this.tiger_small_text);
			//
 			// this.tiger_odd_text = new createjs.Text("0", "20px bebas-regular", "#fff");
 			// this.tiger_odd_text.textAlign = "right";
 			// this.tiger_odd_text.x = tiger_bg[3].x + 42;
 			// this.tiger_odd_text.y = this.tiger_small_text.y;
 			// this.addChild(this.tiger_odd_text);
			//
 			// this.tiger_even_text = new createjs.Text("0", "20px bebas-regular", "#fff");
 			// this.tiger_even_text.textAlign = "right";
 			// this.tiger_even_text.x = tiger_bg[4].x + 42;
 			// this.tiger_even_text.y = this.tiger_odd_text.y;
 			// this.addChild(this.tiger_even_text);

 		// 	this.shoeDeals_text = new createjs.Text("0", "22px arial", "#fff");
 		// 	this.shoeDeals_text.textAlign = "center";
 		// 	this.shoeDeals_text.x = 102;
 		// 	this.shoeDeals_text.y = 80;
 		// 	this.addChild(this.shoeDeals_text);

 			// this.tie_text = new createjs.Text("0", "20px bebas-regular", "#fff");
 			// this.tie_text.textAlign = "right";
 			// this.tie_text.x = tie_bg.x + 40.5;
 			// this.tie_text.y = 81;
 			// this.addChild(this.tie_text);
			//
 			// this.cache(0,0,300,200);
		},
		setScoreBoardText(data) {

			// data =  _.filter(data, function (e) {
			// 	if(e.mark) return e;
			// });
			//
      //       let count = data.length;
			//
      //       let grouped = _.groupBy(data, function (e) {
			// 	return e.mark;
			// });
			//
			//
			// let rmcount = {
			// 	total  : data.length,
			// 	dragon : 0,
			// 	tiger: 0,
			// 	tie : 0,
			// 	dragon_small : 0,
			// 	dragon_big : 0,
			// 	dragon_odd : 0,
			// 	dragon_even : 0,
			// 	tiger_small : 0,
			// 	tiger_big : 0,
			// 	tiger_odd : 0,
			// 	tiger_even : 0
			// }
			// for(var key in grouped) {
			// 	switch(key) {
			// 		case "d" : //dragon
			// 		case "b" : //dragon
			// 		case "c" : //dragon
			// 		case "g" : //dragon
			// 		case "h" :
			// 		case "i" :
			// 		case "j" :
			// 			rmcount.dragon += grouped[key].length;
			// 			grouped[key].forEach((row) => {
			// 				if(row.num > 7) {
			// 					rmcount.dragon_big ++;
			// 				} else if(row.num < 7) {
			// 					rmcount.dragon_small ++;
			// 				}
			//
			// 				if(row.num % 2 == 0 ){
			// 					rmcount.dragon_even ++;
			// 				} else {
			// 					rmcount.dragon_odd ++;
			// 				}
			// 			})
			// 			break;
			// 		case "e" :
			// 		case "f" :
			// 		case "k" :
			// 		case "l" :
			// 		case "m" :
			// 		case "n" :
			// 			grouped[key].forEach((row) => {
			// 				if(row.num > 7) {
			// 					rmcount.tiger_big ++;
			// 				} else if(row.num < 7) {
			// 					rmcount.tiger_small ++;
			// 				}
			//
			// 				if(row.num % 2 == 0 ){
			// 					rmcount.tiger_even ++;
			// 				} else {
			// 					rmcount.tiger_odd ++;
			// 				}
			// 			})
			// 			rmcount.tiger += grouped[key].length;
			// 			break;
			// 		case "a" :
			// 		case "o" :
			// 		case "p" :
			// 		case "q" :
			// 		case "r" :
			// 		case "s" :
			// 		case "t" :
			// 			rmcount.tie += grouped[key].length;
			// 			break;
			// 	}
			// }
			//
			// this.dragon_text.text = rmcount.dragon;
			// this.dragon_small_text.text = rmcount.dragon_small;
			// this.dragon_big_text.text = rmcount.dragon_big;
			// this.dragon_even_text.text = rmcount.dragon_even;
			// this.dragon_odd_text.text = rmcount.dragon_odd;
			//
			// // this.shoeDeals_text.text = data.shoe_deals;
			// this.tie_text.text = rmcount.tie;
			//
			// this.tiger_text.text = rmcount.tiger;
			// this.tiger_big_text.text = rmcount.tiger_big;
			// this.tiger_small_text.text = rmcount.tiger_small;
			// this.tiger_odd_text.text = rmcount.tiger_odd;
			// this.tiger_even_text.text = rmcount.tiger_even;
			//
			// this.updateCache();
			//
			// let game_stat = {
			// 	total_games: parseInt(rmcount.dragon) + parseInt(rmcount.tiger) + parseInt(rmcount.tie),
			// 	dragon_win: parseInt(rmcount.dragon) ,
			// 	tiger_win: parseInt(rmcount.tiger),
			// 	tie_win:parseInt(rmcount.tie)
			// }

			// this.context.component_dealer_data.setStats(game_stat);

		},
		changeTheme(new_theme){
			// this.background.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0,0,270,190);
			// this.label_text_1.color = this.context.theme_color[new_theme].text_color;
			// this.label_text_2.color = this.context.theme_color[new_theme].text_color;
			// this.background.updateCache();
			// this.updateCache();

		}
	});

	return instance;
}
