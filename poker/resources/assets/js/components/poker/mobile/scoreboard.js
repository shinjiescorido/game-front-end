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

 			let scoreboard_data  = {
 				dragon : 20,
 				dragon_small : 10,
 				dragon_big : 21,
 				dragon_even : 50,
 				dragon_odd : 20,
 				tie : 23,
 				shoe_deals : 10,
 				tiger : 30,
 				tiger_big : 30,
 				tiger_small : 30,
 				tiger_odd : 30,
 				tiger_even : 30
 			};

 			this.setScoreBoardText(scoreboard_data);

		},
		setScoreBoardText(data) {
			
			this.dragon_text.text = data.dragon;
			this.dragon_small_text.text = data.dragon_small;
			this.dragon_big_text.text = data.dragon_big;
			this.dragon_even_text.text = data.dragon_even;
			this.dragon_odd_text.text = data.dragon_odd;

			this.shoeDeals_text.text = data.shoe_deals;
			this.tie_text.text = data.tie;

			this.tiger_text.text = data.tiger;
			this.tiger_big_text.text = data.tiger_big;
			this.tiger_small_text.text = data.tiger_small;
			this.tiger_odd_text.text = data.tiger_odd;
			this.tiger_even_text.text = data.tiger_even;
		}
	});

	return instance;
}