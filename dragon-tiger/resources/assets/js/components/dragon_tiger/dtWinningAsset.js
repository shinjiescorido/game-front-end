/**
 * dragon-tiger-mobile.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** winning images **/

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		win_text : [],
		win_suit_obj: [],
		lines_obj: [],
		main() {

			// this.x  = 120;

			// this.y  = (this.context.stage.baseHeight/2) - 180;
			this.x  = 0;
			this.y = 0;
			this.visible = 0;

			this.winning_asset = {
				"dragon" : new createjs.Bitmap(this.context.getResources("dragon_win")),
				"tiger" : new createjs.Bitmap(this.context.getResources("tiger_win")),
				"tie" : new createjs.Bitmap(this.context.getResources("dragon_tiger_tie"))
			}
			//==dragon winning asset
			this.winning_asset["dragon"].alpha = 0;
			this.winning_asset["dragon"].regX = this.winning_asset["dragon"].getBounds().width/2;
			this.winning_asset["dragon"].regY = this.winning_asset["dragon"].getBounds().height/2;
			this.winning_asset["dragon"].x = this.context.stage.baseWidth/2 ;
			this.winning_asset["dragon"].y = (this.winning_asset["dragon"].getBounds().height/2) + 200;

			//==tiger winning asset
			this.winning_asset["tiger"].alpha = 0
			this.winning_asset["tiger"].regX = this.winning_asset["tiger"].getBounds().width/2;
			this.winning_asset["tiger"].regY = this.winning_asset["tiger"].getBounds().height/2;
			this.winning_asset["tiger"].x = this.context.stage.baseWidth/2;
			this.winning_asset["tiger"].y = (this.winning_asset["tiger"].getBounds().height/2) + 200;

			//==tie winning asset
			this.winning_asset["tie"].alpha = 0;
			this.winning_asset["tie"].regX = this.winning_asset["tie"].getBounds().width/2;
			this.winning_asset["tie"].regY = this.winning_asset["tie"].getBounds().height/2;
			this.winning_asset["tie"].x = this.context.stage.baseWidth/2;
			this.winning_asset["tie"].y = (this.winning_asset["tie"].getBounds().height/2) + 200;

			this.addChild(this.winning_asset["dragon"],this.winning_asset["tiger"],this.winning_asset["tie"]);
		},
		resetWinAssets() {

			this.winning_asset["tie"].alpha = 0;
			this.winning_asset["tiger"].alpha = 0
			this.winning_asset["dragon"].alpha = 0;

		}
	});

	return instance;
}
