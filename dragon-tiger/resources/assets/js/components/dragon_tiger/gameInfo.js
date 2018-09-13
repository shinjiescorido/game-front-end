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

			let height = 180;

			this.y = this.context.context.height - height;

			this.footer_bg = new createjs.Shape();
			this.footer_bg.graphics.beginFill("#2b2b2b").drawRect(0,0, this.context.context.width, height);
			this.footer_bg.setBounds(0,0, this.context.context.width, height);
			this.addChild(this.footer_bg);

			// this.bar_1 = new createjs.Shape();
			// this.bar_1.graphics.beginFill(this.context.theme_color[window.theme].bar_color).drawRect(0,0,0.5,height);
			// this.bar_1.x = 1220;
			// this.addChild(this.bar_1);
			//
			// this.bar_2 = new createjs.Shape();
			// this.bar_2.graphics.beginFill(this.context.theme_color[window.theme].bar_color).drawRect(0,0,0.5,height);
			// this.bar_2.x = 1430;
			// this.addChild(this.bar_2);

		},
		changeTheme (new_theme) {
			let height = 180;
			// this.footer_bg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(-870,0, this.context.context.width +1000, height);

			this.footer_bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0,0, this.context.context.width, height);
			// this.bar_1.graphics.clear().beginFill(this.context.theme_color[new_theme].bar_color).drawRect(0,0,0.5,height);
			// this.bar_2.graphics.clear().beginFill(this.context.theme_color[new_theme].bar_color).drawRect(0,0,0.5,height);
		}
	});
}
