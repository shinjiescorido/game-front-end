let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
			this.bar = new createjs.Shape();
			this.bar.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0,0,220,this.context.stage.baseHeight);

			this.addChild(this.bar);
		},

		changeTheme(new_theme)
		{
			this.bar.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0,0,220,this.context.stage.baseHeight);
		}
	});

	return instance;
}