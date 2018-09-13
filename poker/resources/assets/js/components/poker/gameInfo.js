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

			let height = 190;

			this.y = this.context.context.height - height;

			this.footer_bg = new createjs.Shape();
			this.footer_bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(-870,0, this.context.context.width +1000, height);
			this.footer_bg.setBounds(0,0, this.context.context.width, height);
			this.addChild(this.footer_bg);

			// roadmap
			this.roadmap = new createjs.Shape();
			this.roadmap.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(220,0, 785, height);
			this.addChild(this.roadmap);

			//bonus payout
			this.bonus_payout = new createjs.Shape();
			this.bonus_payout.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(999,0, 213, height);
			this.addChild(this.bonus_payout);


			this.bar_1 = new createjs.Shape();
			this.bar_1.graphics.beginFill(this.context.theme_color[window.theme].bar_color).drawRect(0,0,0.5,height);
			this.bar_1.x = 220;
			this.addChild(this.bar_1);

			this.bar_2 = new createjs.Shape();
			this.bar_2.graphics.beginFill(this.context.theme_color[window.theme].bar_color).drawRect(0,0,0.5,height);
			this.bar_2.x = 1210;
			this.addChild(this.bar_2);

			this.bar_3 = new createjs.Shape();
			this.bar_3.graphics.beginFill(this.context.theme_color[window.theme].bar_color).drawRect(0,0,0.5,height);
			this.bar_3.x = 1430;
			this.addChild(this.bar_3);
		},
		changeThemeRoadMap (new_theme) {

			let height = 190;
			this.context.component_fake_cardResult.changeTheme(new_theme);
			this.roadmap.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(220,0, 785, height);
			// this.footer_bg.graphics.beginFill(this.context.theme_color[new_theme].base_color).drawRect(-870,0, this.context.context.width +1000, height);
			this.bar_1.graphics.beginFill(this.context.theme_color[new_theme].bar_color).drawRect(0,0,0.5,height);
			this.context.component_scoreBoard.changeTheme(new_theme);
			this.context.component_roadmap.changeTheme(new_theme);
		},
		changeThemeBonusPayout(new_theme) {
			let height = 190;
			this.bonus_payout.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(999,0, 213, height);
			this.bar_2.graphics.clear().beginFill(this.context.theme_color[new_theme].bar_color).drawRect(0,0,0.5,height);
			this.context.component_payoutInfo.changeTheme(new_theme);
		}

	});
}
