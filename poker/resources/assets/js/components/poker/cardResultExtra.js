/**
 * cardResultExtra.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** extra assets for card result **/

import {fontFormat} from '../../factories/factories';

export default()=> {
	return new blu.Component({
		main() {

			// this.visible = false;
			this.x = 1200;
			this.y = this.context.context.height - 180;

			this.cardContainer = new createjs.Shape();
			this.cardContainer.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0,0,730,180);
			this.addChild(this.cardContainer);


			let dealer_bg = new createjs.Shape();
			dealer_bg.graphics.beginFill("#d42f2f").drawRoundRect(0,0,151,150,10);
			dealer_bg.x = 33;
			dealer_bg.y = 25;
			dealer_bg.isBg = true;
			this.addChild(dealer_bg)

			this.dealer_text = new createjs.Text(window.language2.poker_betlayout_dealer.toUpperCase(), fontFormat(20, 'black', 'lato', true), '#d22f30');
			this.dealer_text.set({x: 108.5, y: 12.5, textBaseline: 'middle', textAlign: 'center' });
			this.addChild(this.dealer_text);

			let community_bg = new createjs.Shape();
			community_bg.graphics.beginFill("#5b5b5b").drawRoundRect(0,0,286,150,10);
			community_bg.x = dealer_bg.x + 151 + 33;
			community_bg.y = dealer_bg.y
			community_bg.isBg = true;
			this.addChild(community_bg)

			this.community_text = new createjs.Text(window.language2.poker_betlayout_community.toUpperCase(), fontFormat(20, 'black', 'lato', true), this.context.theme_color[window.theme].text_color);
			this.community_text.set({x: 360, y: 12.5, textBaseline: 'middle', textAlign: 'center' });
			this.addChild(this.community_text);

			let player_bg = new createjs.Shape();
			player_bg.graphics.beginFill("#1565c0").drawRoundRect(0,0,151,150,10);
			player_bg.x = community_bg.x + 286 + 33;
			player_bg.y = dealer_bg.y
			player_bg.isBg = true;
			this.addChild(player_bg)

			this.player_text = new createjs.Text(window.language2.poker_betlayout_player.toUpperCase(), fontFormat(20, 'black', 'lato', true), '#1466c0');
			this.player_text.set({x: 611.5, y: 12.5, textBaseline: 'middle', textAlign: 'center' });
			this.addChild(this.player_text);

			// this.cache(0,0,957,this.context.context.height - 180);

		},
		changeTheme(new_theme) {
			this.community_text.color = this.context.theme_color[new_theme].text_color;
			console.log("change thene");
			this.cardContainer.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0,0,730,180);
		},

	});
}
