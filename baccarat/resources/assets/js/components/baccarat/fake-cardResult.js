
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
		icon_click : [],
		main() {


			let cardContainer = new createjs.Container();

			this.underlay = new createjs.Shape();
			this.underlay.graphics.beginFill("rgba(0,0,0,0.5)").drawRoundRect(-110,-215,450,382 ,12);
			this.addChild(this.underlay);

			this.background = new createjs.Shape();
			this.background.graphics.beginFill("rgba(0,0,0,0.5)").drawRoundRect(-110,-215,450,382 ,12);
			this.addChild(this.background);

			this.player_circle = new createjs.Shape()
			this.player_circle.graphics.ss(2).s("#5a5a5a").beginFill("#1976d2").drawCircle(0,0,55);
			this.player_circle.x = 12
			this.player_circle.y = -145
			this.player_circle.scaleX = this.player_circle.scaleY = 0.9;
			this.addChild(this.player_circle)

			this.banker_circle = new createjs.Shape()
			this.banker_circle.graphics.ss(2).s("#5a5a5a").beginFill("#d32f2f").drawCircle(0,0,55);
			this.banker_circle.x = 220
			this.banker_circle.y = this.player_circle.y
			this.banker_circle.scaleX = this.banker_circle.scaleY = 0.9;
			this.addChild(this.banker_circle);

			this.player_text = new createjs.Text("0","80px bebasNeue","#fff");
			this.player_text.x = this.player_circle.x;
			this.player_text.y = this.player_circle.y - 42
			this.player_text.textAlign = "center";
			this.player_text.baseline = "middle";
			this.addChild(this.player_text);
			
			this.banker_text = new createjs.Text("0","80px bebasNeue","#fff");
			this.banker_text.x = this.banker_circle.x;
			this.banker_text.y = this.banker_circle.y - 42
			this.banker_text.textAlign = "center";
			this.banker_text.baseline = "middle";
			this.addChild(this.banker_text)

			this.x = 1450;
			this.visible = false;
			this.y = 220;

			this.playerCards = ["C0023", "C0038", "C0024"];
			this.bankerCards = ["C0044", "C0045", "C0004"];
			this.playerCardObj = [];
			this.bankerCardObj = [];
			let self = this;
			this.playerCards.forEach((player, x) => {
				self.playerCardObj[x] = createCardSprite(self, 190, 263,"cards");
				self.playerCardObj[x].scaleX = self.playerCardObj[x].scaleY = 0.47;
				self.playerCardObj[x].regX = self.playerCardObj[x].getBounds().width/2;
				self.playerCardObj[x].gotoAndStop("back_blue");
				switch(x)
				{
					case 0:
					self.playerCardObj[x].x = 54;
					self.playerCardObj[x].y = -75;
					break;
					case 1:
					self.playerCardObj[x].x = -45;
					self.playerCardObj[x].y = -75;
					break;
					case 2:
					self.playerCardObj[x].x = 67;
					self.playerCardObj[x].y = 106;
					self.playerCardObj[x].rotation = 90;
					break;
				}
				cardContainer.addChild(self.playerCardObj[x]);
			});

			this.bankerCards.forEach((banker, y) => {
				self.bankerCardObj[y] = createCardSprite(self, 190, 263,"cards");
				self.bankerCardObj[y].scaleX = self.bankerCardObj[y].scaleY = 0.47;
				self.bankerCardObj[y].regX = self.bankerCardObj[y].getBounds().width/2;
				if(window.t_type == "flippy" && y < 2)
				{
					self.bankerCardObj[y].gotoAndStop(60);
				}
				else
				{
					self.bankerCardObj[y].gotoAndStop("back_red");
				}
				
				switch(y)
				{
					case 0:
					self.bankerCardObj[y].x = 176;
					self.bankerCardObj[y].y = -75;
					break;
					case 1:
					self.bankerCardObj[y].x = 275;
					self.bankerCardObj[y].y = -75;
					break;
					case 2:
					self.bankerCardObj[y].x = 287;
					self.bankerCardObj[y].y = 106;
					self.bankerCardObj[y].rotation = 90;
					break;
				}
				cardContainer.addChild(self.bankerCardObj[y]);
			});
			
			this.addChild(cardContainer);
		},

		play(){

			this.visible = true;
			let playerResult = [0,0,0];
			let bankerResult = [6,3,8];

			if(window.t_type == "flippy") return;
			for(let i =0; i < this.playerCards.length;i++)
			{
				let self = this;
				setTimeout(()=>{
					createjs.Tween.get(self.playerCardObj[i])
					.to({
						scaleX:0
					},200)
					.call((obj,anim)=>{
						obj.gotoAndPlay(anim);
					},[self.playerCardObj[i], self.playerCards[i]])
					.to( {
						scaleX: 0.47
					},200)
					.call(()=>{
						self.setPlayerValue(playerResult[i])
					});

				}, 1000 * (i+1));
			}
			for(let j =0; j < this.bankerCards.length;j++)
			{
				let self = this;
				setTimeout(()=>{
					createjs.Tween.get(self.bankerCardObj[j])
					.to({
						scaleX:0
					},200)
					.call((obj,anim)=>{
						obj.gotoAndPlay(anim);
					},[self.bankerCardObj[j], self.bankerCards[j]])
					.to( {
						scaleX: 0.47
					},200)
					.call(()=>{
						self.setBankerValue(bankerResult[j]);
					});

				}, 1000 * (j+1));
			}
		},

		playFlippy(){

			this.visible = true;
			for(let j =0; j < this.bankerCards.length - 1;j++){
				let self = this;
				setTimeout(()=>{
					createjs.Tween.get(self.bankerCardObj[j])
					.to({
						scaleX:0
					},200)
					.call((obj,anim)=>{
						obj.gotoAndPlay(anim);
					},[self.bankerCardObj[j], self.bankerCards[j]])
					.to( {
						scaleX: 0.47
					},200)
					.call(()=>{
						self.setBankerValue(3);
					});

				}, 500);
			}
		},

		setPlayerValue(val) {
			this.player_text.text = val;
		},
		setBankerValue(val) {
			this.banker_text.text = val;
		}
	});

	return instance;
}