/**
 * cardResultExtra.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** extra assets for card result **/

export default()=> {
	return new blu.Component({
		main() {
			this.visible = false;
			this.x = 10;
			this.y = 582;

			let dealer_bg = new createjs.Shape();
			dealer_bg.graphics.beginFill("#7f1d1d").drawRoundRect(0,0,140,128,10);
			dealer_bg.isBg = true;
			this.addChild(dealer_bg)

			let community_bg = new createjs.Shape();
			community_bg.graphics.beginFill("#555555").drawRoundRect(150,0,295,128,10);
			community_bg.isBg = true;
			this.addChild(community_bg)

			let player_bg = new createjs.Shape();
			player_bg.graphics.beginFill("#0c3e66").drawRoundRect(455,0,140,128,10);
			player_bg.isBg = true;
			this.addChild(player_bg)

			this.cache(0,0,455+150,130)
		}

	});
}
