let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {


			// background
			this.bg = new createjs.Shape();
			this.bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(-50,-30,237,190);
			this.addChild(this.bg);

			//init status bars
			this.tiger_bar = new createjs.Shape();
			this.tiger_bar.graphics.beginFill("#0d47a1").drawRect(0,0,90,10);
			this.tiger_bar.y = 95;
			this.addChild(this.tiger_bar);

			this.dragon_bar = new createjs.Shape() //red bar
			this.dragon_bar.graphics.beginFill("#b71c1c").drawRect(0,0,90,10);
			this.dragon_bar.y = 118;
			this.addChild(this.dragon_bar);

			this.tie_bar = new createjs.Shape() //green bar
			this.tie_bar.graphics.beginFill("#689f38").drawRect(0,0,90,10);
			this.tie_bar.y = 141;
			this.addChild(this.tie_bar);

			//init bar text
			this.tiger_text = new createjs.Text("100%","bold 18px bebasneue",this.context.theme_color[window.theme].text_color);
			this.tiger_text.y = this.tiger_bar.y - 6;
			this.tiger_text.textAlign = "left";
			this.tiger_text.x = this.tiger_bar.x + 128;
			this.addChild(this.tiger_text);

			this.dragon_text = new createjs.Text("100%","bold 18px bebasneue",this.context.theme_color[window.theme].text_color);
			this.dragon_text.y = this.dragon_bar.y - 6;
			this.dragon_text.textAlign = "left";
			this.dragon_text.x = this.dragon_bar.x + 128;
			this.addChild(this.dragon_text);

			this.tie_text = new createjs.Text("100%","bold 18px bebasneue",this.context.theme_color[window.theme].text_color);
			this.tie_text.y = this.tie_bar.y - 5;
			this.tie_text.textAlign = "left";
			this.tie_text.x = this.tie_bar.x + 128;
			this.addChild(this.tie_text);

			this.x = 32;
			this.y = 920;

			let game_stat = {
				total_games: 3,
				banker_win: 1,
				tie_win : 1,
				player_win: 1
			}

			this.setStats(game_stat);

		},

		changeTheme(new_theme) {
			this.bg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(-50,-30,237,190);
			this.tiger_text.color = this.context.theme_color[new_theme].text_color;
			this.dragon_text.color = this.context.theme_color[new_theme].text_color;
			this.tie_text.color = this.context.theme_color[new_theme].text_color;
		},

		setStats(stats) {

			if(!stats.total_games) {
				stats.total_games = 1
			}

			this.tiger_bar.scaleX = stats.player_win/stats.total_games;
			this.dragon_bar.scaleX = stats.banker_win/stats.total_games;
			this.tie_bar.scaleX = stats.tie_win/stats.total_games;

			let percentArr = [
				Math.round((stats.tie_win/stats.total_games)*100), //tie
				Math.round((stats.player_win/stats.total_games)*100), //tiger
				Math.round((stats.banker_win/stats.total_games)*100) // dragon
			]
			var total = percentArr[0] + percentArr[1] + percentArr[2];

			if(total != 100 && total != 0)
			{
				var result = { max: null, count: 0 };
				result.max = Math.max.apply(Math, percentArr);
				for(let i = 0; i < percentArr.length; i++ ){
					if (percentArr[i] == result.max) {
						result.count++;
					}
				}
				if(result.count == 1) {
					let index = percentArr.indexOf(Math.max.apply(Math, percentArr));
					percentArr[index] = percentArr[index] - (total - 100);
				}
				if(result.count == 2) {
					let index = percentArr.indexOf(Math.min.apply(Math, percentArr));
					percentArr[index] = percentArr[index] - (total - 100);
				}
				//let index = percentArr.indexOf(Math.max.apply(Math, percentArr));
				//percentArr[index] = percentArr[index] - (total - 100);
			}

			if(percentArr[0] > 0) {
				this.tie_text.text = 100 - percentArr[1] - percentArr[2];
			}
			
			this.tie_text.text =  percentArr[0]+"%";
			this.tiger_text.text =  percentArr[1]+"%";
			this.dragon_text.text =  percentArr[2]+"%";
		}
	});

	return instance;
}
