let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {

			// player info background
			// this.background = new createjs.Shape();
			// this.background.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(-17,-20,205,190);
			// this.background.cache(-17,-20,205,190);
			// this.addChild(this.background);

			this.user_avatar = new createjs.Bitmap(this.context.getResources(window.config.default));
			this.user_avatar.scaleX = this.user_avatar.scaleY = 0.4;
			this.addChild(this.user_avatar);
			this.user_avatar.y = 20
			this.user_avatar.x = 0


      this.bet_count = 0;
      this.win_count = 0;

			this.user_name = new createjs.Text(window.user_name,"bold 18px arial",this.context.theme_color[window.theme].text_color	);
			this.user_name.x = 180;
			this.user_name.y = 30;
			this.user_name.textAlign = "right";
			this.addChild(this.user_name);

			// === long string marquee
      let marquee_con = new createjs.Container();
      let textbounds = this.user_name.getBounds();
      this.twin = this.user_name.clone();
      let marquee = function(obj) {
        createjs.Tween.get(obj ,{loop:true}).to({
          x : obj.x - (textbounds.width + 30)
        }, 4000)
      }

      if(textbounds.width > 80) {
        marquee_con.mask = new createjs.Shape();
        marquee_con.mask.graphics.beginFill("#fff").drawRect(6, 0, 75, textbounds.height);
        marquee_con.mask.x = this.user_name.x;
        marquee_con.mask.y = this.user_name.y;

        this.twin.x = this.user_name.x + textbounds.width + 30;
        this.twin.y = this.user_name.y;
        marquee_con.addChild(this.user_name, this.twin);

        marquee(this.user_name);
        marquee(this.twin);

        this.addChild(marquee_con);
      } else {
        this.addChild(this.user_name);
      }

			this.x = 525;
      this.y = this.context.stage.baseHeight - 70

			// this.bar_red = new createjs.Shape();
			// this.bar_red.graphics.beginFill("#b71c1c").drawRect(0,0,170,20);
			// this.bar_red.y = 100;
			// this.bar_red.x = 170;
			// this.bar_red.regX = 170;
			// this.red_bar_text = new createjs.Text("","18px bebas-regular","#fff");
			// this.red_bar_text.y = 100;
			// this.red_bar_text.x = this.bar_red.x - 5;
			// this.red_bar_text.textAlign = "right";
			// this.addChild(this.bar_red,this.red_bar_text);
			//
			//
			// this.bar_blue = new createjs.Shape();
			// this.bar_blue.graphics.beginFill("#0d47a1").drawRect(0,0,170,20);
			// this.bar_blue.y = 100;
			// this.blue_bar_text = new createjs.Text("","18px bebas-regular","#fff");
			// this.blue_bar_text.y = 100;
			// this.blue_bar_text.x = this.bar_blue.x + 5
			// this.addChild(this.bar_blue, this.blue_bar_text);
			//
			// this.x = this.context.stage.baseWidth - 680;
			// this.y = this.context.stage.baseHeight - 170;
			//
			// let data = {
			// 	total_bets : 1,
			// 	total_win: 0,
			// 	initialize: true,
			// }
			//
			// this.setUserStat(data);
			//
			// this.win_label = new createjs.Text(window.language.player_info.win, window.language.locale == "zh" ? "21px arial" : "bold 16px arial",this.context.theme_color[window.theme].text_color);
			// this.win_label.y = this.bar_blue.y +25;
			// this.win_label.x = this.bar_blue.x + 2;
			// this.win_label.textAlign = "left";
			// this.addChild(this.win_label);
			//
			// this.lose_label = new createjs.Text(window.language.player_info.lose, window.language.locale == "zh" ? "21px arial" : "bold 16px arial",this.context.theme_color[window.theme].text_color);
			// this.lose_label.y = this.bar_red.y +25;
			// this.lose_label.x = this.bar_red.x - 2;
			// this.lose_label.textAlign = "right";
			// this.addChild(this.lose_label);
		},
		setUserStat(obj) {
			// if(!obj.total_bets) return;
			//
			// if(obj.initialize)
			// {
			// 	this.bar_blue.scaleX = 0.5;
			// 	this.bar_red.scaleX = 0.5;
			// 	this.blue_bar_text.text = "0%";
			// 	this.red_bar_text.text =  "0%";
			//
			// 	return;
			// }

			// let total_lose =  obj.total_bets - obj.total_win;
			//
			// this.bar_blue.scaleX = (obj.total_win/obj.total_bets);
			// this.bar_red.scaleX = (total_lose/obj.total_bets);
			//
			// let lose_percent = Math.round((total_lose/obj.total_bets) *100);
			// let win_percent = Math.round((obj.total_win/obj.total_bets) *100);
			//
			// this.blue_bar_text.text = win_percent+"%";
			// this.red_bar_text.text = lose_percent+"%";

		},
		changeTheme(new_theme) {
			// this.background.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(-17,-20,205,190);
			// this.background.updateCache();
			this.context.component_gameInfo.changeTheme(new_theme);
			this.twin.color = this.context.theme_color[new_theme].text_color;
			this.user_name.color = this.context.theme_color[new_theme].text_color;
			this.win_label.color = this.context.theme_color[new_theme].text_color;
			this.lose_label.color = this.context.theme_color[new_theme].text_color;
		}
	});

	return instance;
}
