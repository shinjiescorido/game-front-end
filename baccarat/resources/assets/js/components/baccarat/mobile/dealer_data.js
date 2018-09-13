let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
			//init status bars

			this.x = 190;
			this.y = 50;

			this.dragon_bar = new createjs.Shape()
			this.dragon_bar.graphics.beginFill("#0e47a1").drawRect(0,0,195,18);
			this.dragon_bar.y = 38;
			this.dragon_bar.x = 0;
			this.dragon_bar.scaleX = 0.1;
			this.dragon_bar.setBounds(0,0,195,18);
			this.addChild(this.dragon_bar);

			this.tiger_bar = new createjs.Shape()
			this.tiger_bar.graphics.beginFill("#b71b1c").drawRect(0,0,195,18);
			this.tiger_bar.y = this.dragon_bar.y
			this.tiger_bar.regX = 195;
			this.tiger_bar.x = this.dragon_bar.x  + 195
			this.tiger_bar.scaleX = .5;
			this.tiger_bar.setBounds(0,0,195,18);
			this.addChild(this.tiger_bar);

			this.tie_bar = new createjs.Shape()
			this.tie_bar.graphics.beginFill("green").drawRect(0,0,195,18);
			this.tie_bar.y = this.tiger_bar.y
			this.tie_bar.setBounds(0,0,195,18);
			this.tie_bar.regX = 195/2;
			this.tie_bar.scaleX = .4;
			this.tie_bar.x = 0  + this.dragon_bar.getTransformedBounds().width + (this.tie_bar.getTransformedBounds().width/2)
			this.addChild(this.tie_bar);

			this.dragon_text = new createjs.Text("0%", "18px BebasNeue","#fff");
			this.dragon_text.x = this.dragon_bar.x + 2;
			this.dragon_text.y = this.dragon_bar.y;
			this.addChild(this.dragon_text);

			this.tiger_text = new createjs.Text("0%", "18px BebasNeue","#fff");
			this.tiger_text.x = this.tiger_bar.x- 2;
			this.tiger_text.y = this.tiger_bar.y;
			this.tiger_text.textAlign = "right";
			this.addChild(this.tiger_text);

			this.tie_text = new createjs.Text("0%", "18px BebasNeue","#fff");
			this.tie_text.x = this.tie_bar.x;
			this.tie_text.y = this.tie_bar.y;
			this.tie_text.textAlign = "center";
			this.addChild(this.tie_text);

			let game_stat = {
				total_games: 3,
				player_win: 1,
				banker_win: 1,
				tie_win:1
			}
			this.setStats(game_stat);

		},
		setStats(stats) {
			if(!stats.total_games) {
				stats.total_games = 1
			}

			this.dragon_bar.scaleX = stats.player_win/stats.total_games;
			this.tiger_bar.scaleX = stats.banker_win/stats.total_games;


			this.tie_bar.setBounds(0,0,195,18);
			this.tie_bar.scaleX = stats.tie_win/stats.total_games;
			this.tie_bar.x = 0  + this.dragon_bar.getTransformedBounds().width + (this.tie_bar.getTransformedBounds().width/2)

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
				//percentArr[index] =percentArr[index] - (total - 100);
			}

			this.tie_text.text =   percentArr[0] < 10 ? "" : percentArr[0]+"%";
			this.tiger_text.text =  percentArr[2]+"%";
			this.dragon_text.text =  percentArr[1]+"%";


			this.dragon_text.x = this.dragon_bar.x + 2;
			this.tiger_text.x = this.tiger_bar.x- 2;
			this.tie_text.x = this.tie_bar.x;

			if(this.dragon_text.text == "0%"
				&& this.tiger_text.text == "0%"
				&& this.tie_text.text == "0%")
			{
				//this.tie_bar.x = this.tie_text.x = 97.5;
				this.alpha = 0;

			}else if(this.dragon_text.text == "0%"
				&& this.tiger_text.text == "0%"){
				this.tie_text.alpha = 0;
			}else if(this.tiger_text.text == "0%"
			&& this.tie_text.text == "0%")
			{
				this.tie_text.alpha = 0;
			}else{
				this.tie_text.alpha = 1;
			}

		}
	});

	return instance;
}
