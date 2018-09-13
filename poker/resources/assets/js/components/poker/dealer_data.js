let instance = null;

export default() => {
	instance = instance || new blu.Component({
		dealer_data :{
			total_num_games : 0,
			total_lose : 0,
			total_win : 0
		},
		main() {

			// background
			this.bg = new createjs.Shape();
			this.bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0,-120,220,190);
			this.addChild(this.bg);

			this.y = 1010;
			this.win_bar = new createjs.Shape();
			this.win_bar.graphics.beginFill("#0d47a1").drawRect(0,0,140,14);
			this.addChild(this.win_bar);
			this.win_bar.x = 20

			this.lose_bar = new createjs.Shape();
			this.lose_bar.graphics.beginFill("#b71c1c").drawRect(0,0,140,14);
			this.addChild(this.lose_bar);
			this.lose_bar.y = 30
			this.lose_bar.x = 20

			this.win_percent = new createjs.Text("100%", "18px bebas-regular",this.context.theme_color[window.theme].text_color);
			this.win_percent.textAlign = "left";
			this.addChild(this.win_percent)
			this.win_percent.y = -2;
			this.win_percent.x = 170;

			this.lose_percent = new createjs.Text("100%", "18px bebas-regular",this.context.theme_color[window.theme].text_color);
			this.lose_percent.textAlign = "left";
			this.addChild(this.lose_percent)
			this.lose_percent.y = 28;
			this.lose_percent.x = 170;

		},
		setData(stats) {

			this.win_bar.scaleX = stats.total_win / stats.total_num_games;
			this.lose_bar.scaleX = stats.total_lose / stats.total_num_games;

			this.win_percent.text = Math.round((stats.total_win / stats.total_num_games) * 100) + "%";
			this.lose_percent.text = Math.round((stats.total_lose / stats.total_num_games) * 100) + "%";

		},
		changeTheme(new_theme) {
			this.bg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0,-120,220,190);
			this.win_bar.graphics.clear().beginFill("#0d47a1").drawRect(0,0,140,14);
			this.lose_bar.graphics.clear().beginFill("#b71c1c").drawRect(0,0,140,14);
			this.win_percent.color = this.context.theme_color[new_theme].text_color;
			this.lose_percent.color = this.context.theme_color[new_theme].text_color;
		}
	});

	return instance;
}
