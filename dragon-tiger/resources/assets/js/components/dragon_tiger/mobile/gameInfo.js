/**
 * game-info.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** drawing footer bg and borders **/

export default () => {
	return new blu.Component({
		main() {

			let height = 150;

			this.y = this.context.context.height - height;

			this.footer_bg = new createjs.Shape();
			this.footer_bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0,0, this.context.context.width, height);
			this.footer_bg.setBounds(0,0, this.context.context.width, height);
			
			this.addChild(this.footer_bg);

		}
	});
}