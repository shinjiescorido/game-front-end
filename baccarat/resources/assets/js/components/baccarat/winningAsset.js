/**
 * dragon-tiger-mobile.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** winning images **/

import {
	getSlaveParam
  } from '../../factories/factories';
let instance = null;

export default() => {
	instance = instance || new blu.Component({
		win_text : [],
		main() {
      let dragonbonus_text = "";
			this.x  = (this.context.stage.baseWidth/2);
			this.y  = (this.context.stage.baseHeight/2) - 208;
			this.winning_asset = {
				"supersix" : new createjs.Bitmap(this.context.getResources("supersix_img")),
				"dragonbonus" : new createjs.Bitmap(this.context.getResources("dragonbonus_win")),
				"dragonbonus_glow" : new createjs.Bitmap(this.context.getResources("dragonbonus_win_glow")),
				"dragonbonus_bg" : new createjs.Shape()
			}
			
			//==supersix winning asset
			this.winning_asset["supersix"].alpha = 1;
			this.winning_asset["supersix"].regX = this.winning_asset["supersix"].getBounds().width/2;
			this.winning_asset["supersix"].regY = this.winning_asset["supersix"].getBounds().height/2;
			this.winning_asset["supersix"].scaleX = this.winning_asset["supersix"].scaleY = 0;
			this.winning_asset["supersix"].alpha = 0;

			// dragonbonus winning asset
			// this.winning_asset["dragonbonus"].alpha = 0;
			// this.winning_asset["dragonbonus"].regX = this.winning_asset["dragonbonus"].getBounds().width/2;
			// this.winning_asset["dragonbonus"].regY = this.winning_asset["dragonbonus"].getBounds().height/2;
			// this.winning_asset["dragonbonus"].x = this.context.stage.baseWidth/2 - 95;
			// this.winning_asset["dragonbonus"].y = 20;

			// this.winning_asset["dragonbonus_glow"].alpha = 0;
			// this.winning_asset["dragonbonus_glow"].regX = this.winning_asset["dragonbonus_glow"].getBounds().width/2;
			// this.winning_asset["dragonbonus_glow"].regY = this.winning_asset["dragonbonus_glow"].getBounds().height/2;
			// this.winning_asset["dragonbonus_glow"].x = this.context.stage.baseWidth/2 - 95;
			// this.winning_asset["dragonbonus_glow"].y = 340/2;

			// this.winning_asset["dragonbonus_bg"].graphics.beginLinearGradientFill(["#d8bd69","transparent"], [1,0.5], 0, 100, 0, 0).moveTo(0,0).curveTo(200,300,400,0).moveTo(100,0).moveTo(0,0);
			// this.winning_asset["dragonbonus_bg"].graphics.beginFill("#fbd86d").moveTo(0,0).curveTo(200,300,400,0).moveTo(100,0).moveTo(0,0);
			// this.winning_asset["dragonbonus_bg"].alpha = 0.5;
			// this.winning_asset["dragonbonus_bg"].x = this.context.stage.baseWidth/2 - 295;
			// this.winning_asset["dragonbonus_bg"].y = 350/2;

			this.addChild(this.winning_asset["supersix"])//, this.winning_asset["dragonbonus"], this.winning_asset["dragonbonus_glow"]);

			// Spotlight container
			this.gold_spotlight_container = new createjs.Container();
			this.addChild(this.gold_spotlight_container);

			let spotlight_1 = new createjs.Shape();
			spotlight_1.graphics.beginRadialGradientFill(["rgba(237, 214, 144,1)", "rgba(237, 214, 144,0.8)","rgba(230, 206, 132, 0.01)"],[0.3,0.5,1], 0, 0, 0,0,0,320).drawCircle(0,0,320);
			spotlight_1.scaleY = 0.12;

			this.gold_spotlight_container.addChild(spotlight_1)//, spotlight_2, spotlight_3, spotlight_4);
			this.gold_spotlight_container.alpha = 0;
			this.gold_spotlight_container.y = 160;

			// Text container
			this.text_container = new createjs.Container();
			this.addChild(this.text_container);
			this.win_text = [];
		},

		resetWinAssets() {
			this.visible = false;
			// this.winning_asset["dragonbonus"].alpha = 0;
			// this.winning_asset["dragonbonus"].scaleX = this.winning_asset["dragonbonus"].scaleY = 0;

			this.winning_asset["supersix"].alpha = 0;
			this.winning_asset["supersix"].scaleX = this.winning_asset["supersix"].scaleY = 0;
			this.gold_spotlight_container.alpha = 0;
			this.win_text = [];
			this.text_container.removeAllChildren()
		},

		createWinText(text, is_win) {
			if(!text.length) return;
				
			this.win_text = [];
			this.text_container.removeAllChildren()

			text.forEach((t, x) => {
				this.win_text.push(new createjs.Text(t.text, '35px arvo-regular', t.color));
				this.win_text[x].shadow = new createjs.Shadow("#fff", 2, 2, 0);
				this.win_text[x].set({x:0,textAlign:'left', textBaseline:'middle', y : 160, visible: false});
				this.text_container.addChild(this.win_text[x]);
			});
			
			if(text.length > 1) {
				let w = 0;
				let space = 15;
				if(window.language.locale === 'en') space = 30;
				this.win_text[0].x = -space;
				this.win_text[1].x = this.win_text[0].x + this.win_text[0].getMeasuredWidth() + space;
				w = this.win_text[0].getMeasuredWidth() + this.win_text[1].getMeasuredWidth() ;

				if(this.win_text[2]) {
					this.win_text[2].x = this.win_text[1].x + this.win_text[1].getMeasuredWidth() + space;
					w += (this.win_text[2].getMeasuredWidth()+space); 
				}
				this.text_container.regX = w/2//this.text_container.getBounds().width/2
			} else {
				let w = 1;
				w = this.win_text[0].getMeasuredWidth()
				this.text_container.regX = w/2//this.text_container.getBounds().width/2
			}

			createjs.Tween.get(this.gold_spotlight_container, {override: true})
			.wait(1500)
			.to({
				alpha: 1,
			}, 500, createjs.Ease.linear)
			.call(()=>{
				// this.win_text.alpha = 1;
				this.win_text.forEach((t, x) => {
					t.visible = true;
				});
			})

			if(!_.isEmpty(_.find(text, function (e) {return e.value === 'supersix'})) && window.slave === 'supersix') {
				setTimeout(() => {
					createjs.Tween.get(this.winning_asset["supersix"], {override: true})
					.to({
						scaleX: 1.3,
						scaleY: 1.3,
						alpha: 1
					}, 300)
					.to({
						scaleX: 1,
						scaleY: 1
					}, 80)
				},2000)

				setTimeout(() => {
					createjs.Tween.get(this.winning_asset["supersix"], {override: true})
					.to({
						scaleX: 1,
						scaleY: 1,
						alpha: 1
					}, 300)
					.to({
						scaleX: 0,
						scaleY: 0,
						alpha: 0
					}, 80)
				},8000)
			}

			// if(isDragonBonus())
			// {
			// 	let bonus_player_bet = _.find(this.context.component_gameButtons.previousBet, {'table_id' : 'bonus_player', 'is_confirmed' : true}) != undefined;
			// 	let bonus_banker_bet = _.find(this.context.component_gameButtons.previousBet, {'table_id' : 'bonus_banker', 'is_confirmed' : true}) != undefined;

			// 	if ((is_win.indexOf('bonus_player') > -1 && bonus_player_bet) || (is_win.indexOf('bonus_banker') > -1) && bonus_banker_bet) {
	
			// 		this.animateDragonWinText(text);
	
			// 		setTimeout(() => {
			// 			createjs.Tween.get(this.winning_asset["dragonbonus"])
			// 			.to({
			// 				scaleX: 1.3,
			// 				scaleY: 1.3,
			// 				alpha: 1
			// 			}, 300)
			// 			.to({
			// 				scaleX: 1,
			// 				scaleY: 1
			// 			}, 80)
			// 		},3000)
	
			// 		setTimeout(() => {
			// 			createjs.Tween.get(this.winning_asset["dragonbonus"])
			// 			.to({
			// 				scaleX: 1,
			// 				scaleY: 1,
			// 				alpha: 1
			// 			}, 300)
			// 			.to({
			// 				scaleX: 0,
			// 				scaleY: 0,
			// 				alpha: 0
			// 			}, 80)
			// 		},8500)
	
			// 		setTimeout(() => {
			// 			createjs.Tween.get(this.winning_asset["dragonbonus_glow"])
			// 			.to({
			// 				scaleX: 1.3,
			// 				scaleY: 1.3,
			// 				alpha: 1
			// 			}, 300)
			// 			.to({
			// 				scaleX: 1,
			// 				scaleY: 1
			// 			}, 80)
			// 		},3000)
	
			// 		setTimeout(() => {
			// 			createjs.Tween.get(this.winning_asset["dragonbonus_glow"])
			// 			.to({
			// 				scaleX: 1,
			// 				scaleY: 1,
			// 				alpha: 1
			// 			}, 300)
			// 			.to({
			// 				scaleX: 0,
			// 				scaleY: 0,
			// 				alpha: 0
			// 			}, 80)
			// 		},8500)
	
			// 		for(var x = 0 ;x<this.win_text.length;x++) {
	
			// 			createjs.Tween.get(this.win_text[x])
			// 			.wait(3000)
			// 			.to({
			// 				scaleX : 6,
			// 				scaleY: 6
			// 			})
			// 			.wait(x*35)
			// 			.to({
			// 				scaleX : 1,
			// 				scaleY: 1,
			// 				alpha: 1
			// 			},200);
			// 		}
			// 	} else {
			// 		this.visible = false;
			// 	}
			// }
		},

		// animateDragonWinText(text) {
		// 	let textArray = text.split("");

		// 	for(var x = 0;x<textArray.length;x++) {
		// 		this.win_text[x] = new createjs.Text(textArray[x].toUpperCase(),window.language.locale == "zh"? "400 70px arvo" : "700 60px arvo", "#846c00");
		// 		this.win_text[x].shadow = new createjs.Shadow("#ecd489",4,4,0);
		// 		this.win_text[x].textBaseline = "middle";
		// 		this.win_text[x].skewX = 10;

		// 		if(x > 0) {
		// 			this.win_text[x].x = this.win_text[x-1].x + this.win_text[x-1].getMeasuredWidth() +5;
		// 		} else {
		// 			this.win_text[x].x = 0
		// 		}

		// 		this.win_text[x].alpha = 0;
		// 		this.win_text[x].y = 340/2;

		// 		this.text_container.addChild(this.win_text[x]);
		// 	}
		// 	this.text_container.regX = (this.text_container.getTransformedBounds().width/2);
		// }

	});

	return instance;
}
