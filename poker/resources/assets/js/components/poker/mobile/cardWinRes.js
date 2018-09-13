/**
 * card-result.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** draws cards **/

import {createSprite, randomNum, createCardSprite, numberCounter, playSound } from '../../../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		win_cards : [],
		main() {
			
			this.x = this.context.context.width/2;
			this.y = 370
		},
		createWin (data)  {
			for(var x = 0; x < data.length; x++) {
				this.win_cards[x]= createCardSprite(this,80,120,"new_cards");
				this.win_cards[x].gotoAndStop(data[x]);
				this.win_cards[x].scaleX = this.win_cards[x].scaleY = 2
				this.addChild(this.win_cards[x])
			}

			this.animateCards(this.win_cards);
		},
		animateCards (cards) {

			let rotation_val = -((cards.length-1)*20);

			for(var x = 0;x< cards.length; x++) {
				cards[x].regX = cards[x].getBounds().width/2;
				cards[x].regY = cards[x].getBounds().height;
				createjs.Tween.get(cards[x])
				.to({
					rotation: rotation_val
				},150)
				rotation_val += (1*20)

				createjs.Tween.get(this)
				.to({
					rotation : (cards.length*10)  - 10
				},150)
			}

		}
	});

	return instance;
}