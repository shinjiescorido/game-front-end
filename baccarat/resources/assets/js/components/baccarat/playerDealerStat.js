/**
 * card-result.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** draws cards **/

import {createSprite, randomNum, createCardSprite, numberCounter, playSound } from '../../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
			this.background = new createjs.Shape();
			this.background.graphics.beginFill("rgba(0,0,0,0.7)").drawRoundRect(0,0,280,150 ,10);
			this.addChild(this.background)
			this.x = 1530;
			this.y = 400;
			
			
						
			this.player_banker_bg = new createjs.Shape();
			this.player_banker_bg.graphics.beginFill("#e6c160").drawRoundRect(0,0,185,30,5);
			this.player_banker_bg.y = 14;
			this.player_banker_bg.x = 46;
			this.addChild(this.player_banker_bg);

			this.tie_bg = new createjs.Shape();
			this.tie_bg.graphics.beginFill("#e6c160").drawRoundRect(0,0,185,30,5);
			this.tie_bg.y = 14+35+10
			this.tie_bg.x = 46;
			this.addChild(this.tie_bg);

			this.pb_pair_bg = new createjs.Shape();
			this.pb_pair_bg.graphics.beginFill("#e6c160").drawRoundRect(0,0,185,30,5);
			this.pb_pair_bg.y = 14+(35*2)+20
			this.pb_pair_bg.x = 46;
			this.addChild(this.pb_pair_bg);

			let mask = new createjs.Shape();
			mask.graphics.beginFill("#fff").drawRoundRect(0,0,185,30,5);
			mask.x = 46;
			mask.y = 14;

			this.player_bar = new createjs.Shape();
			this.player_bar.graphics.beginFill("rgba(0,0,0,0.2)").drawRect(0,0,185,30);
			this.player_bar.x = this.player_banker_bg.x;
			this.player_bar.y = this.player_banker_bg.y;
			this.player_bar.regX = 0;
			this.player_bar.scaleX = 0.5;
			this.player_bar.mask = mask;
			this.addChild(this.player_bar);

			this.banker_bar = new createjs.Shape();
			this.banker_bar.graphics.beginFill("transparent").drawRect(0,0,185,30);
			this.banker_bar.x = this.player_banker_bg.x + 185;
			this.banker_bar.y = this.player_banker_bg.y;
			this.banker_bar.regX = 185;
			this.banker_bar.scaleX = 0.5;
			this.banker_bar.mask = mask;
			this.addChild(this.banker_bar);

			let mask2 = new createjs.Shape();
			mask2.graphics.beginFill("#fff").drawRoundRect(0,0,185,30,5);
			mask2.x = 46;
			mask2.y = this.tie_bg.y;

			this.tie_bar = new createjs.Shape();
			this.tie_bar.graphics.beginFill("rgba(0,0,0,0.2)").drawRect(0,0,185,30);
			this.tie_bar.x = this.tie_bg.x
			this.tie_bar.y = this.tie_bg.y
			this.tie_bar.scaleX = 0.5;
			this.tie_bar.mask = mask2;
			this.addChild(this.tie_bar);

			let mask3 = new createjs.Shape();
			mask3.graphics.beginFill("#fff").drawRoundRect(0,0,185,30,5);
			mask3.x = 46;
			mask3.y = this.pb_pair_bg.y;

			this.p_pair_bar = new createjs.Shape();
			this.p_pair_bar.graphics.beginFill("rgba(0,0,0,0.2)").drawRect(0,0,185,30);
			this.p_pair_bar.x = this.pb_pair_bg.x;
			this.p_pair_bar.y = this.pb_pair_bg.y;
			this.p_pair_bar.mask = mask3;
			this.p_pair_bar.scaleX = 0.5;

			this.addChild(this.p_pair_bar);

			this.b_pair_bar = new createjs.Shape();
			this.b_pair_bar.graphics.beginFill("transparent").drawRect(0,0,185,30);
			this.b_pair_bar.x = this.pb_pair_bg.x + 185;
			this.b_pair_bar.y = this.pb_pair_bg.y;
			this.b_pair_bar.regX = 185;
			this.b_pair_bar.mask = mask3;
			this.b_pair_bar.scaleX = 0.5;

			this.addChild(this.b_pair_bar);
			//////////////
			this.player_text = new createjs.Text("0", "22px bebasNeue","#212121");
			this.player_text.x = this.player_bar.x +10;
			this.player_text.y = this.player_bar.y + 3;
			this.player_text.textAlign = "left";
			this.addChild(this.player_text);

			this.banker_text = new createjs.Text("0", "22px bebasNeue","#212121");
			this.banker_text.x = this.banker_bar.x - 10;
			this.banker_text.y = this.banker_bar.y + 3;
			this.banker_text.textAlign = "right";
			this.addChild(this.banker_text);
			//////////////
			this.tie_text = new createjs.Text("0", "22px bebasNeue","#212121");
			this.tie_text.x = this.tie_bar.x +10;
			this.tie_text.y = this.tie_bar.y + 3;
			this.tie_text.textAlign = "left";
			this.addChild(this.tie_text);
			//////////////
			this.p_pair_text = new createjs.Text("0", "22px bebasNeue","#212121");
			this.p_pair_text.x = this.p_pair_bar.x +10;
			this.p_pair_text.y = this.p_pair_bar.y + 3;
			this.p_pair_text.textAlign = "left";
			this.addChild(this.p_pair_text);

			this.b_pair_text = new createjs.Text("0", "22px bebasNeue","#212121");
			this.b_pair_text.x = this.b_pair_bar.x -10;
			this.b_pair_text.y = this.b_pair_bar.y + 3;
			this.b_pair_text.textAlign = "right";
			this.addChild(this.b_pair_text);

			let data = {
				"player" : 100,
				"banker" : 130,
				"player_pair" : 100,
				"banker_pair" : 120,
				"tie" : 120,
				"total" : 600
			}

			this.setData(data);
		},
		setData (data) {

			this.player_bar.scaleX = data.player / data.total;
			this.player_text.text = Math.round((data.player/data.total) * 100) +"%";
			this.banker_text.text = Math.round((data.banker/data.total) * 100) +"%";

			this.tie_bar.scaleX = data.tie / data.total;
			this.tie_text.text = Math.round((data.tie/data.total) * 100) +"%";

			this.p_pair_bar.scaleX = data.player_pair / data.total;
			this.p_pair_text.text = Math.round((data.player_pair/data.total) * 100) +"%";
			
			this.b_pair_bar.scaleX = data.banker_pair / data.total;
			this.b_pair_text.text = Math.round((data.banker_pair/data.total) * 100) +"%";

		}
	});

	return instance;
}