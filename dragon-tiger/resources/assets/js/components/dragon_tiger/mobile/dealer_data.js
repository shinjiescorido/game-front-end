let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
			//init status bars

			this.x = 190;
			this.y = 50;

			// this.tiger_bar = new createjs.Shape();
			// this.tiger_bar.graphics.beginFill("#b71c1c").drawRect(0,0,176,20);
			// this.tiger_bar.setBounds(0,0,176,16);
			// this.tiger_bar.y = 38;
			// this.tiger_bar.x = 0;
			// this.tiger_bar.regX = 0;
			// this.tiger_bar.scaleX = 0.5;
			// this.addChild(this.tiger_bar);

			// this.dragon_bar = new createjs.Shape() //red bar
			// this.dragon_bar.graphics.beginFill("#0d47a1").drawRect(0,0,176,20);
			// this.dragon_bar.setBounds(0,0,176,16);
			// this.dragon_bar.regX = this.dragon_bar.getBounds().width;
			// this.dragon_bar.x = this.dragon_bar.getBounds().width;
			// this.dragon_bar.y = this.tiger_bar.y;
			// this.dragon_bar.scaleX = 0.3;
			// this.addChild(this.dragon_bar);

			// this.tie_bar = new createjs.Shape() //red bar
			// this.tie_bar.graphics.beginFill("#689f38").drawRect(0,0,176,20);
			// this.tie_bar.setBounds(0,0,176,16);
			// this.tie_bar.y = this.tiger_bar.y;
			// this.tie_bar.x = this.tiger_bar.x + this.tiger_bar.getTransformedBounds().width;
			// this.tie_bar.scaleX = 0.2;
			// this.addChild(this.tie_bar);

			// //init bar text
			// this.tiger_text = new createjs.Text("100%","20px bebas-regular","#fff");
			// this.tiger_text.y = this.tiger_bar.y - 0.6;
			// this.tiger_text.textAlign = "right";
			// this.tiger_text.x = this.tiger_bar.x + 30
			// this.addChild(this.tiger_text);

			// this.dragon_text = new createjs.Text("100%","20px bebas-regular","#fff");
			// this.dragon_text.y = this.dragon_bar.y - 0.6;
			// this.dragon_text.textAlign = "left";
			// this.dragon_text.x = this.dragon_bar.x - 30
			// this.addChild(this.dragon_text);

			// this.tie_text = new createjs.Text("100%","20px bebas-regular","#fff");
			// this.tie_text.y = this.tie_bar.y - 0.6;
			// this.tie_text.textAlign = "center";
			// this.tie_text.x = this.tie_bar.x + this.tie_bar.getTransformedBounds().width/2;
			// this.addChild(this.tie_text);

			let self = this;

			//percentageset
			self.dragon_bar = new createjs.Shape()
			self.dragon_bar.graphics.beginFill("#0e47a1").drawRect(0,0,195,18);
			self.dragon_bar.y = 38;
			self.dragon_bar.x = 0;
			self.dragon_bar.scaleX = 0.1;
			self.dragon_bar.setBounds(0,0,195,18);
			self.addChild(self.dragon_bar);

			self.tiger_bar = new createjs.Shape()
			self.tiger_bar.graphics.beginFill("#b71b1c").drawRect(0,0,195,18);
			self.tiger_bar.y = self.dragon_bar.y
			self.tiger_bar.regX = 195;
			self.tiger_bar.x = self.dragon_bar.x  + 195
			self.tiger_bar.scaleX = .5;
			self.tiger_bar.setBounds(0,0,195,18);
			self.addChild(self.tiger_bar);

			self.tie_bar = new createjs.Shape()
			self.tie_bar.graphics.beginFill("green").drawRect(0,0,195,18);
			self.tie_bar.y = self.tiger_bar.y
			self.tie_bar.setBounds(0,0,195,18);
			self.tie_bar.regX = 195/2;
			self.tie_bar.scaleX = .4;
			self.tie_bar.x = 0  + self.dragon_bar.getTransformedBounds().width + (self.tie_bar.getTransformedBounds().width/2)
			self.addChild(self.tie_bar);

			self.dragon_text = new createjs.Text("0%", "18px bebas-regular","#fff");
			self.dragon_text.x = self.dragon_bar.x + 2;
			self.dragon_text.y = self.dragon_bar.y;
			self.addChild(self.dragon_text);

			self.tiger_text = new createjs.Text("0%", "18px bebas-regular","#fff");
			self.tiger_text.x = self.tiger_bar.x- 2;
			self.tiger_text.y = self.tiger_bar.y;
			self.tiger_text.textAlign = "right";
			self.addChild(self.tiger_text);

			self.tie_text = new createjs.Text("", "18px bebas-regular","#fff");
			self.tie_text.x = self.tie_bar.x;
			self.tie_text.y = self.tie_bar.y;
			self.tie_text.textAlign = "center";
			self.addChild(self.tie_text);

			let game_stat = {
				total_games: 3,
				dragon_win: 1,
				tiger_win: 1,
				tie_win:1,
			}

			this.setStats(game_stat);

		},
		setStats(stats) {
			let self  = this;

			if (!parseInt(stats.total_games)) {
				stats.total_games = 1;
			}

			self.dragon_bar.scaleX = stats.dragon_win/stats.total_games;
			self.tiger_bar.scaleX = stats.tiger_win/stats.total_games;

			self.tie_bar.setBounds(0,0,195,18);
			self.tie_bar.scaleX = stats.tie_win/stats.total_games;
			self.tie_bar.x = 0  + self.dragon_bar.getTransformedBounds().width + (self.tie_bar.getTransformedBounds().width/2)

			let percentArr = [
				Math.round((stats.tie_win/stats.total_games)*100), //tie
				Math.round((stats.tiger_win/stats.total_games)*100), //tiger
				Math.round((stats.dragon_win/stats.total_games)*100) // dragon
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
				// let index = percentArr.indexOf(Math.max.apply(Math, percentArr));
				// percentArr[index] =percentArr[index] - (total - 100);
			}


			this.tie_text.text =   percentArr[0] < 10 ? "" : percentArr[0]+"%";
			this.tiger_text.text =  percentArr[1]+"%";
			this.dragon_text.text =  percentArr[2]+"%";

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

			// this.tiger_bar.scaleX = stats.tiger_win/stats.total_games;
			// this.dragon_bar.scaleX = stats.dragon_win/stats.total_games;
			// this.tie_bar.scaleX = stats.tie_win/stats.total_games;

			// this.tie_text.text = Math.round((stats.tie_win/stats.total_games)*100) +"%";
			// this.tiger_text.text = Math.round((stats.tiger_win/stats.total_games)*100) +"%";
			// this.dragon_text.text = Math.round((stats.dragon_win/stats.total_games)*100) +"%";


			// this.tie_bar.x = this.tiger_bar.x + this.tiger_bar.getTransformedBounds().width;
			// this.tie_text.x = this.tie_bar.x + this.tie_bar.getTransformedBounds().width/2;
		}
	});

	return instance;
}
