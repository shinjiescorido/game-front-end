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

			this.background = new createjs.Shape();
			this.addChild(this.background);

			this.background.graphics.beginFill("rgba(0,0,0,0.5)").drawRoundRect(0,0,610,450 ,16);
			this.regX = 620/2;
			this.x = 1000 + 24;
			this.y = 210;
			this.visible = false;

			if(this.context.mobile) {
				this.background.graphics.clear().beginFill("rgba(0,0,0,0.5)").drawRect(0,0,1920,1080);
				this.regX = 0;
				this.x = 0;
				this.y = 0;
				this.visible = false;				
			}

		},
		for3rdcard () {
			if(!this.context.mobile) {
				this.background.graphics.clear().beginFill("rgba(0,0,0,0.5)").drawRoundRect(0,0,450,450 ,16);
				this.regX = (450/2);
				this.x = 1015 + 10;
			}
		},
		for2cards () {

			if(!this.context.mobile) {
				this.background.graphics.clear().beginFill("rgba(0,0,0,0.5)").drawRoundRect(0,0,610,450 ,16);
				this.regX = 620/2;
				// this.x = 1014;
				this.x = 1000  + 24;
			}
		}
		
	});
}