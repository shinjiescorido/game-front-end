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
		},
		drawCardGameInfo (card, scaleVal, card_res, width, height) {
			let card_data = {};
			this.visible = (window.tutorial_enabled) ? false : true;
			for(var key in card) {
				if(!this[key]) {
					this[key] = [];
				}

				if(!card[key] || !card[key].length) continue
				card_data[key] = card[key];
				for(var x = 0; x < card[key].length; x++ ) {
					this[key][x] = createCardSprite(this,width,height,card_res);
					this[key][x].scaleX = this[key][x].scaleY = scaleVal;
					this[key][x].scaleVal = scaleVal;
					this[key][x].regX = this[key][x].getBounds().width/2;

					this.addChild(this[key][x]);
					this[key][x].isAdded = true;
				}
			}
		},
		drawCards(card, scaleVal, card_res, width, height) {
			this.visible = (window.tutorial_enabled) ? false : true;
			for(var key in card) {
				if(!this[key]) {
					this[key] = [];
				}

				if(!this[key][card[key].length-1]) {
					this[key][card[key].length-1] = createCardSprite(this,width,height,card_res);
					this[key][card[key].length-1].scaleX = this[key][card[key].length-1].scaleY = scaleVal;
					this[key][card[key].length-1].scaleVal = scaleVal;
					this[key][card[key].length-1].regX = this[key][this[key].length-1].getBounds().width/2;

					this.addChild(this[key][card[key].length-1]);
					this[key][card[key].length-1].isAdded = true;
				}
			}

			playSound("card-deal");

		},

		setCardResult(card) {

			for(var key in card) {
				if(card[key].length) {
					for(var x = 0;x<card[key].length;x++) {
						if(!this[key][x].isAnim) {
							this[key][x].isAnim = true;
							createjs.Tween.get(this[key][x])
							.to({
								scaleX:0
							},200)
							.call((obj,anim)=>{
								obj.gotoAndPlay(anim)
							},[this[key][x],card[key][x]])
							.to( {
								scaleX: this[key][x].scaleVal
							},200)
						}// end if
					} // end for
				} // end if
			} // end for

			playSound("card-show");
		},

		deleteCard(card) {
			this.removeChild(this[card][this[card].length-1]);
			this[card].splice(this[card].length-1,1)
		}
	});

	return instance;
}
