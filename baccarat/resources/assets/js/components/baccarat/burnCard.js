/**
 * card-result.js
 * @author Lovely Jaca
 * @since 2018.01.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** display BURN CARD **/

import {createSprite, createCardSprite} from '../../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
			this.burn_card_con = new createjs.Container();
			this.burn_card_con.x = this.context.stage.baseWidth - 210;
			this.burn_card_con.ox = this.context.stage.baseWidth - 210;
			this.burn_card_con.y = 87;
			this.addChild(this.burn_card_con);
			// background
			this.card_bg = new createjs.Shape();
      this.card_bg.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0,0,195,260);

			this.header = new createjs.Shape();
			this.header.graphics.beginLinearGradientFill(['#d7bc6a', '#ebda7b', '#d7bc6a'], [0,0.5,1], 0,0,195,0).drawRect(0,0,195,55);
			this.burn_card_con.addChild(this.header);

			let burn_text = new createjs.Text("BURN CARD", '18px lato-black', '#000');
			burn_text.x = this.header.x + (195/2);
			burn_text.y = this.header.y + (55/2);
			burn_text.textAlign = 'center';
			burn_text.textBaseline = 'middle';
			this.burn_card_con.addChild(this.card_bg, burn_text);
			this.burn_card_con.visible = false;
			
			this.burn_card_result = createCardSprite(this, 190, 263, "cards");
			this.burn_card_result.x = 40;
			this.burn_card_result.y = 70;
			this.burn_card_result.scaleY = this.burn_card_result.scaleX = 0.6;
			this.burn_card_con.addChild(this.burn_card_result);
		},

		burnCard(card) {
			if(this.context.component_multibetv2.isActive) {
				this.x = -355;
			} else {
				this.x = 0;
			}
			this.burn_card_result.gotoAndStop("C"+card);
			this.burn_card_con.visible = true;
		}, // burnCard

		removeBurnCard() {
			this.x = 0;
			this.burn_card_con.visible = false;
		} // removeBurnCard
	});
	return instance;
}
