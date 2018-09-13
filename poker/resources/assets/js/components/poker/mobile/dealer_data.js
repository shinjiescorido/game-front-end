let instance = null;

export default() => {
	instance = instance || new blu.Component({
		dealer_data :{
			total_num_games : 0,
			total_lose : 0,
			total_win : 0
		},
		main() {
			//init status bars

			this.x = 190;
			this.y = 50;

			this.player_bar = new createjs.Shape();
			this.player_bar.graphics.beginFill("#0d47a1").drawRect(0,0,195,20);
			this.player_bar.setBounds(0,0,195,16);
			this.player_bar.y = 38;
			this.player_bar.x = 0;
			this.player_bar.regX = 0;
			this.player_bar.scaleX = 0.5;
			this.addChild(this.player_bar);

			this.banker_bar = new createjs.Shape() //red bar
			this.banker_bar.graphics.beginFill("#b71c1c").drawRect(0,0,195,20);
			this.banker_bar.setBounds(0,0,195,16);
			this.banker_bar.regX = this.banker_bar.getBounds().width;
			this.banker_bar.x = this.banker_bar.getBounds().width;
			this.banker_bar.y = this.player_bar.y;
			this.banker_bar.scaleX = 0.5;
			this.addChild(this.banker_bar);

			//init bar text
			this.player_text = new createjs.Text("0%","20px bebas-regular","#fff");
			this.player_text.y = this.player_bar.y - 0.6;
			this.player_text.textAlign = "left";
			this.player_text.x = this.player_bar.x + 5;
			this.addChild(this.player_text);

			this.banker_text = new createjs.Text("0%","20px bebas-regular","#fff");
			this.banker_text.y = this.banker_bar.y - 0.6;
			this.banker_text.textAlign = "right";
			this.banker_text.x = this.banker_bar.x - 5;
			this.addChild(this.banker_text);

		},
		setData(stats) {
			this.banker_bar.scaleX = stats.total_win/stats.total_num_games; 
			this.player_bar.scaleX = stats.total_lose/stats.total_num_games; 

			this.banker_text.text = Math.round((stats.total_win / stats.total_num_games) * 100) + "%";
			this.player_text.text = Math.round((stats.total_lose / stats.total_num_games) * 100) + "%";
		}
	});

	return instance;
}