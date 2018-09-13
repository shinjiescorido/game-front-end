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

			let height = 500;

			this.y = 580;

			let spriteData = {
				images: [this.context.getResources("numeric_stats")],
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
			
			let spriteSheet = new createjs.SpriteSheet(spriteData);

			//=== dragon data
			let dragon_bg  = [];
			let tiger_bg = [];

			let t = 7;
			for(var x = 0;x<5;x++) {
				dragon_bg[x] = new createjs.Sprite(spriteSheet,"d-"+x+"");
				this.addChild(dragon_bg[x]);

				tiger_bg[x] = new createjs.Sprite(spriteSheet,"t-"+t+"");
				tiger_bg[x].x = (x* 46.5) + 16;
				tiger_bg[x].y = 115 
				this.addChild(tiger_bg[x]);
				t++;
			}
			dragon_bg[1].x = 50;
			dragon_bg[2].x = 100;
			
			dragon_bg[3].x = 50;
			dragon_bg[3].y = 35;

			dragon_bg[4].x = 100;
			dragon_bg[4].y = 35;

			tiger_bg[0].y = 70;
			tiger_bg[0].x = 50;

			tiger_bg[1].y = 70;
			tiger_bg[1].x = 100;

			tiger_bg[2].y = 105;
			tiger_bg[2].x = 0;

			tiger_bg[3].y = 105;
			tiger_bg[3].x = 50;

			tiger_bg[4].y = 105;
			tiger_bg[4].x = 100;

			let grey_bg = new createjs.Sprite(spriteSheet, "tie-grey");
			grey_bg.x = 0;
			grey_bg.y = 35;
			this.addChild(grey_bg);

			let tie_bg = new createjs.Sprite(spriteSheet, "tie-green");
			this.addChild(tie_bg);
			tie_bg.x = 0;
			tie_bg.y = 70;

 			this.x = 400;
 			let pos = 46.5;

 			//=== text init
 			this.dragon_text = new createjs.Text("0", "16px arial", "#fff");
 			this.dragon_text.textAlign = "center";
 			this.dragon_text.x = 32;
 			this.dragon_text.y = 5;
 			this.addChild(this.dragon_text);

 			this.dragon_big_text = new createjs.Text("0", "16px arial", "#fff");
 			this.dragon_big_text.textAlign = "center";
 			this.dragon_big_text.y = 5;
 			this.dragon_big_text.x = 50 + 32;
 			this.addChild(this.dragon_big_text);

 			this.dragon_small_text = new createjs.Text("0", "16px arial", "#fff");
 			this.dragon_small_text.textAlign = "center";
 			this.dragon_small_text.x = 100 + 32;
 			this.dragon_small_text.y = 5;
 			this.addChild(this.dragon_small_text);

 			this.dragon_odd_text = new createjs.Text("0", "16px arial", "#fff");
 			this.dragon_odd_text.textAlign = "center";
 			this.dragon_odd_text.x = 50 + 32;
 			this.dragon_odd_text.y = 35 + 5
 			this.addChild(this.dragon_odd_text);

 			this.dragon_even_text = new createjs.Text("0", "16px arial", "#fff");
 			this.dragon_even_text.textAlign = "center";
 			this.dragon_even_text.x = 100 + 32;
 			this.dragon_even_text.y = 35 + 5;
 			this.addChild(this.dragon_even_text);

 			this.tiger_text = new createjs.Text("0", "16px arial", "#fff");
 			this.tiger_text.textAlign = "center";
 			this.tiger_text.x = 50 + 32;
 			this.tiger_text.y = 70 + 5;
 			this.addChild(this.tiger_text);

 			this.tiger_big_text = new createjs.Text("0", "16px arial", "#fff");
 			this.tiger_big_text.textAlign = "center";
 			this.tiger_big_text.y = 70 + 5;
 			this.tiger_big_text.x = 100 + 32;
 			this.addChild(this.tiger_big_text);

 			this.tiger_small_text = new createjs.Text("0", "16px arial", "#fff");
 			this.tiger_small_text.textAlign = "center";
 			this.tiger_small_text.x = 32;
 			this.tiger_small_text.y = 105 + 5;
 			this.addChild(this.tiger_small_text);

 			this.tiger_odd_text = new createjs.Text("0", "16px arial", "#fff");
 			this.tiger_odd_text.textAlign = "center";
 			this.tiger_odd_text.x = 50 + 32;
 			this.tiger_odd_text.y = 105 + 5;
 			this.addChild(this.tiger_odd_text);

 			this.tiger_even_text = new createjs.Text("0", "16px arial", "#fff");
 			this.tiger_even_text.textAlign = "center";
 			this.tiger_even_text.x = 100 + 32;
 			this.tiger_even_text.y = 105 + 5;
 			this.addChild(this.tiger_even_text);

 			this.shoeDeals_text = new createjs.Text("0", "22px arial", "#fff");
 			this.shoeDeals_text.textAlign = "center";
 			this.shoeDeals_text.x = 22;
 			this.shoeDeals_text.y = 35 + 2;
 			this.addChild(this.shoeDeals_text);

 			this.tie_text = new createjs.Text("0", "16px arial", "#fff");
 			this.tie_text.textAlign = "center";
 			this.tie_text.x = 32;
 			this.tie_text.y = 70 + 5;
 			this.addChild(this.tie_text);

 			// let scoreboard_data  = {
 			// 	dragon : 20,
 			// 	dragon_small : 10,
 			// 	dragon_big : 21,
 			// 	dragon_even : 50,
 			// 	dragon_odd : 20,
 			// 	tie : 23,
 			// 	shoe_deals : 10,
 			// 	tiger : 30,
 			// 	tiger_big : 30,
 			// 	tiger_small : 30,
 			// 	tiger_odd : 30,
 			// 	tiger_even : 30
 			// };

 			// this.setScoreBoardText(scoreboard_data);

		},
		setScoreBoardText(data) {
			
			data =  _.filter(data, function (e) {
				if(e.mark) return e;
			});

            let count = data.length;

            let grouped = _.groupBy(data, function (e) {
				return e.mark;
			});


			let rmcount = {
				total  : data.length,
				dragon : 0,
				tiger: 0,
				tie : 0,
				dragon_small : 0,
				dragon_big : 0,
				dragon_odd : 0,
				dragon_even : 0,
				tiger_small : 0,
				tiger_big : 0,
				tiger_odd : 0,
				tiger_even : 0
			}
			for(var key in grouped) {
				switch(key) {
					case "d" : //dragon
					case "b" : //dragon
					case "c" : //dragon
					case "g" : //dragon
					case "h" :
					case "i" :
					case "j" :
						rmcount.dragon += grouped[key].length;
						grouped[key].forEach((row) => {
							if(row.num > 7) {
								rmcount.dragon_big ++;
							} else if(row.num < 7) {
								rmcount.dragon_small ++;
							}

							if(row.num % 2 == 0 ){
								rmcount.dragon_even ++;
							} else {
								rmcount.dragon_odd ++;
							}
						})
						break;
					case "e" :
					case "f" :
					case "k" :
					case "l" :
					case "m" :
					case "n" :
						grouped[key].forEach((row) => {
							if(row.num > 7) {
								rmcount.tiger_big ++;
							} else if(row.num < 7) {
								rmcount.tiger_small ++;
							}

							if(row.num % 2 == 0 ){
								rmcount.tiger_even ++;
							} else {
								rmcount.tiger_odd ++;
							}
						})
						rmcount.tiger += grouped[key].length;
						break;
					case "a" :
					case "o" :
					case "p" :
					case "q" :
					case "r" :
					case "s" :
					case "t" :
						rmcount.tie += grouped[key].length;
						break;
				}
			}

			this.dragon_text.text = rmcount.dragon;
			this.dragon_small_text.text = rmcount.dragon_small;
			this.dragon_big_text.text = rmcount.dragon_big;
			this.dragon_even_text.text = rmcount.dragon_even;
			this.dragon_odd_text.text = rmcount.dragon_odd;

			// this.shoeDeals_text.text = data.shoe_deals;
			this.tie_text.text = rmcount.tie;

			this.tiger_text.text = rmcount.tiger;
			this.tiger_big_text.text = rmcount.tiger_big;
			this.tiger_small_text.text = rmcount.tiger_small;
			this.tiger_odd_text.text = rmcount.tiger_odd;
			this.tiger_even_text.text = rmcount.tiger_even;

			// this.updateCache();
			
			let game_stat = {
				total_games: parseInt(rmcount.dragon) + parseInt(rmcount.tiger) + parseInt(rmcount.tie),
				dragon_win: parseInt(rmcount.dragon) ,
				tiger_win: parseInt(rmcount.tiger),
				tie_win:parseInt(rmcount.tie)
			}

			this.context.component_dealer_data.setStats(game_stat);

		}
	});

	return instance;
}