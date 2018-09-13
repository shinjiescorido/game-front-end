/**
 * card-result.js
 * @author Lovely Jaca
 * @since 2018.01.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** display BURN CARD **/

import {createSprite, createCardSprite} from '../../../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
			this.burn_card_con = new createjs.Container();
			this.burn_card_con.x = 0;
			this.burn_card_con.y = 220;
			this.addChild(this.burn_card_con);
			// background
			this.card_bg = new createjs.Shape();
      this.card_bg.graphics.beginFill("rgba(0,0,0,0.5)").drawRoundRect(0,0,120,190 ,7
			);

			let burn_text = new createjs.Text("BURN CARD", '15px lato', '#fff');
			burn_text.x = 17;
			burn_text.y = 10;
			this.burn_card_con.addChild(this.card_bg, burn_text);
			this.burn_card_con.visible = false;
		},

		burnCard(card) {
			this.burn_card_result = createCardSprite(this, 80, 120, "new_cards");
			this.burn_card_result.gotoAndStop("C"+card);
			this.burn_card_result.x = 19;
			this.burn_card_result.y = 45;
			this.burn_card_con.addChild(this.burn_card_result);
			this.burn_card_con.visible = true;
		}, // burnCard

		removeBurnCard() {
			this.burn_card_con.visible = false;
		} // removeBurnCard
	});
	return instance;
}
