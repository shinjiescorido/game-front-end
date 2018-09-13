/**
 * dragon-tiger-mobile.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** winning images **/
import {
  createSprite,
  randomNum,
  createCardSprite,
  numberCounter,
  playSound,
  numberWithCommas,
  createSpriteRoadMap,
  getSlaveParam
} from '../../../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		win_text : [],
		win_suit_obj: [],
		lines_obj: [],
		main() {
      let winTextBonus = "";
			this.x  = 80;
			this.y  = (this.context.stage.baseHeight/2) - 60;
			this.visible = false;

			this.winning_asset = {
				"supersix" : new createjs.Bitmap(this.context.getResources("supersix_img")),
				"dragonbonus" : new createjs.Bitmap(this.context.getResources("dragonbonus_win")),
        		"dragonbonus_glow" : new createjs.Bitmap(this.context.getResources("dragonbonus_win_glow"))
			}
 
			//==supersix winning asset
			this.winning_asset["supersix"].alpha = 1;
			this.winning_asset["supersix"].regX = this.winning_asset["supersix"].getBounds().width/2;
			this.winning_asset["supersix"].regY = this.winning_asset["supersix"].getBounds().height/2;
			this.winning_asset["supersix"].x = this.context.stage.baseWidth/2 - 110;
			this.winning_asset["supersix"].y = -95;
			this.winning_asset["supersix"].scaleX = this.winning_asset["supersix"].scaleY = 0;
			this.winning_asset["supersix"].alpha = 0;

			//==dragonbonus winning asset
			this.winning_asset["dragonbonus"].alpha = 0;
			this.winning_asset["dragonbonus"].regX = this.winning_asset["dragonbonus"].getBounds().width/2;
			this.winning_asset["dragonbonus"].regY = this.winning_asset["dragonbonus"].getBounds().height/2;
			this.winning_asset["dragonbonus"].x = this.context.stage.baseWidth/2 - 95;
			this.winning_asset["dragonbonus"].y = 20;

			this.winning_asset["dragonbonus_glow"].alpha = 0;
			this.winning_asset["dragonbonus_glow"].regX = this.winning_asset["dragonbonus_glow"].getBounds().width/2;
			this.winning_asset["dragonbonus_glow"].regY = this.winning_asset["dragonbonus_glow"].getBounds().height/2;
			this.winning_asset["dragonbonus_glow"].x = this.context.stage.baseWidth/2 - 95;
			this.winning_asset["dragonbonus_glow"].y = 340/2;

			this.addChild(this.winning_asset["supersix"], this.winning_asset["dragonbonus"], this.winning_asset["dragonbonus_glow"]);

			// Spotlight container
			this.gold_spotlight_container = new createjs.Container();
			this.gold_spotlight_container.x = (this.context.stage.baseWidth-180)/2;
			this.addChild(this.gold_spotlight_container);

			let spotlight_1 = new createjs.Shape();
			spotlight_1.graphics.beginRadialGradientFill(["rgba(230, 206, 132, 0.87)","rgba(230, 206, 132, 0.01)"],[0,1], 0, 0, 20,0,0,270).drawCircle(0,0,270);
			spotlight_1.scaleY = 0.23;

			let spotlight_2 = new createjs.Shape();
			spotlight_2.graphics.beginRadialGradientFill(["rgba(230, 206, 132, 0.87)","rgba(230, 206, 132, 0.01)"],[0,1], 0, 0, 50,0,0,250).drawCircle(0,0,250);
			spotlight_2.scaleY = 0.17;

			let spotlight_3 = new createjs.Shape();
			spotlight_3.graphics.beginRadialGradientFill(["rgba(230, 206, 132, 0.87)","rgba(230, 206, 132, 0.01)"],[0,1], 0, 0, 20,0,0,220).drawCircle(0,0,220);
			spotlight_3.scaleX = 0.5;
			spotlight_3.scaleY = 0.3;
			spotlight_3.y = 30;

			let spotlight_4 = new createjs.Shape();
			spotlight_4.graphics.beginRadialGradientFill(["rgba(230, 206, 132, 0.87)","rgba(230, 206, 132, 0.01)"],[0,1], 0, 0, 50,0,0,200).drawCircle(0,0,200);
			spotlight_3.scaleX = 0.8;
			spotlight_4.scaleY = 0.25;
			spotlight_4.y = 30;

			this.gold_spotlight_container.addChild(spotlight_1, spotlight_2, spotlight_3, spotlight_4);
			this.gold_spotlight_container.regX = 220/2;
			this.gold_spotlight_container.regY = 220/2;
			this.gold_spotlight_container.x = 650;
			this.gold_spotlight_container.y = 250;
			this.gold_spotlight_container.alpha = 0;

			// Text container
			this.text_container = new createjs.Container();
			this.text_container.x = (this.context.stage.baseWidth-180)/2;
			this.addChild(this.text_container);
		},
		resetWinAssets() {
			this.visible = false;
			this.winning_asset["supersix"].alpha = 0;
			this.winning_asset["supersix"].scaleX = this.winning_asset["supersix"].scaleY = 0;
			this.gold_spotlight_container.alpha = 0;

			this.text_container.removeAllChildren()
		},
		createWinText(text, is_win) {
			this.text_container.removeAllChildren()
			this.visible = true;


			if(isSuperSix()) {

				let supersix_bet = _.find(this.context.component_gameButtons.previousBet, {'table_id' : 'supersix', 'is_confirmed' : true}) != undefined;
				
				if(!supersix_bet) return;

				let winText = new createjs.Text(text.toUpperCase(), window.language.locale == "zh"? "400 80px arvo" : "700 80px arvo", '#836b00');
				winText.skewX = 10;
				winText.alpha = 0;
				winText.y = 140;
				winText.shadow = new createjs.Shadow("#faf1df",2,2,0);
				winText.textBaseline = "middle";
				winText.textAlign = 'center';
				this.text_container.addChild(winText);

				createjs.Tween.get(this.gold_spotlight_container, {override: true})
			        .wait(1500)
			        .to({
			          alpha: 1,
			        }, 500, createjs.Ease.linear)
			        .call(()=>{
			        	winText.alpha = 1;
			        })

			    setTimeout(() => {
			        createjs.Tween.get(this.winning_asset["supersix"])
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
			        createjs.Tween.get(this.winning_asset["supersix"])
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
			    },5000)

			}

			if(isDragonBonus()) {
				//dragonbonus
				let bonus_player_bet = _.find(this.context.component_gameButtons.previousBet, {'table_id' : 'bonus_player', 'is_confirmed' : true}) != undefined;
				let bonus_banker_bet = _.find(this.context.component_gameButtons.previousBet, {'table_id' : 'bonus_banker', 'is_confirmed' : true}) != undefined;

				if ((is_win.indexOf('bonus_player') > -1 && bonus_player_bet) || (is_win.indexOf('bonus_banker') > -1) && bonus_banker_bet) {

					this.animateDragonWinText(text);
					
					setTimeout(() => {
						createjs.Tween.get(this.winning_asset["dragonbonus"])
						.to({
							scaleX: 1.3,
							scaleY: 1.3,
							alpha: 1
						}, 300)
						.to({
							scaleX: 1,
							scaleY: 1
						}, 80)
					},3000)

					setTimeout(() => {
						createjs.Tween.get(this.winning_asset["dragonbonus"])
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
					},8500)

          setTimeout(() => {
						createjs.Tween.get(this.winning_asset["dragonbonus_glow"])
						.to({
							scaleX: 1.3,
							scaleY: 1.3,
							alpha: 1
						}, 300)
						.to({
							scaleX: 1,
							scaleY: 1
						}, 80)
					},3000)

					setTimeout(() => {
						createjs.Tween.get(this.winning_asset["dragonbonus_glow"])
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
					},8500)

          for(var x = 0 ;x<this.win_text.length;x++) {

            createjs.Tween.get(this.win_text[x])
            .wait(3000)
            .to({
              scaleX : 6,
              scaleY: 6
            })
            .wait(x*35)
            .to({
              scaleX : 1,
              scaleY: 1,
              alpha: 1
            },200);
          }
				}
			} //isDragonBonus

		},

    animateDragonWinText(text) {
      let textArray = text.split("");

      for(var x = 0;x<textArray.length;x++) {
        this.win_text[x] = new createjs.Text(textArray[x].toUpperCase(),window.language.locale == "zh"? "400 60px arvo" : "700 60px arvo", "#846c00");
        this.win_text[x].shadow = new createjs.Shadow("#ecd489",4,4,0);
        this.win_text[x].textBaseline = "middle";
        this.win_text[x].skewX = 10;

        if(x > 0) {
          this.win_text[x].x = this.win_text[x-1].x + this.win_text[x-1].getMeasuredWidth() +5;
        } else {
          this.win_text[x].x = 0
        }

        this.win_text[x].alpha = 0;
        this.win_text[x].y = 340/2;

        this.text_container.addChild(this.win_text[x]);
      }
      this.text_container.regX = (this.text_container.getTransformedBounds().width/2);
    }
	});

	let isSuperSix = () =>{
		return getSlaveParam('supersix');
	}

	let isDragonBonus = () =>{
		return getSlaveParam('bonus');
	}

	return instance;
}
