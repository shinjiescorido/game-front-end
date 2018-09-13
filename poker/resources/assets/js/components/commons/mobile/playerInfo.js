let instance = null;

export default() => {
	instance = instance || new blu.Component({
		total_bets : 2,
		total_win : 1,
		main() {

			this.bg = new createjs.Shape();
			this.bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(-30,10,245,150);
			this.addChild(this.bg);

			this.user_avatar = this.makeUserAvatar();
			this.addChild(this.user_avatar);

			this.user_name = new createjs.Text(window.user_name,"bold 22px arial",this.context.theme_color[window.theme].text_color	);
			this.user_name.textAlign = "center";
			this.user_name.x = 100;
			this.user_name.y = 85;
			this.addChild(this.user_name);
      // === long string marquee
      let marquee_con = new createjs.Container();
      let textbounds = this.user_name.getBounds();
      this.twin = this.user_name.clone();
      let marquee = function(obj) {
        createjs.Tween.get(obj ,{loop:true}).to({
          x : obj.x - (textbounds.width + 45)
        }, 4000)
      }

      if(textbounds.width > 120) {
        marquee_con.mask = new createjs.Shape();
        marquee_con.mask.graphics.beginFill("#fff").drawRect(-65, 0, 120, textbounds.height);
        marquee_con.mask.x = this.user_name.x;
        marquee_con.mask.y = this.user_name.y;

        this.twin.x = this.user_name.x + textbounds.width + 45;
        this.twin.y = this.user_name.y;
        marquee_con.addChild(this.user_name, this.twin);

        marquee(this.user_name);
        marquee(this.twin);

        this.addChild(marquee_con);
      } else {
        this.addChild(this.user_name);
      }

			this.bar_red = new createjs.Shape();
			this.bar_red.graphics.beginFill("#b71c1c").drawRect(0,0,200,20);
			this.bar_red.y = 125;
			this.bar_red.regX = this.bar_red.x = 200;
			this.red_bar_text = new createjs.Text("0%","18px bebas-regular","#fff");
			this.red_bar_text.y = 125;
			this.red_bar_text.x = 195;
			this.red_bar_text.textAlign = "right";
			this.addChild(this.bar_red,this.red_bar_text);

			this.bar_blue = new createjs.Shape();
			this.bar_blue.graphics.beginFill("#0d47a1").drawRect(0,0,200,20);
			this.bar_blue.y = 125;
			this.blue_bar_text = new createjs.Text("0%","18px bebas-regular","#fff");
			this.blue_bar_text.y = 125;
			this.blue_bar_text.x = 5
			this.addChild(this.bar_blue, this.blue_bar_text);

			this.x = this.context.stage.baseWidth - 655;
			this.y = this.context.stage.baseHeight - 160;

			let data = {
				total_bets : this.total_bets,
				total_win: this.total_win,
				initialize: true,
			}

			this.setUserStat(data);

			this.win_label = new createjs.Text(window.language.player_info.win,window.language.locale == "zh" ? "21px arial" : "16px arial",this.context.theme_color[window.theme].text_color);
			this.win_label.y = this.bar_blue.y -25;
			this.win_label.x = this.bar_blue.x + 2;
			this.win_label.textAlign = "left";
			this.addChild(this.win_label);

			this.lose_label = new createjs.Text(window.language.player_info.lose,window.language.locale == "zh" ? "21px arial" : "16px arial",this.context.theme_color[window.theme].text_color);
			this.lose_label.y = this.bar_red.y - 25;
			this.lose_label.x = this.bar_red.x - 2;
			this.lose_label.textAlign = "right";
			this.addChild(this.lose_label);
		},
		makeUserAvatar(){
			let user_avatar = new createjs.Bitmap(this.context.getResources(window.config.default));
			user_avatar.scaleX = user_avatar.scaleY = 0.8;
			user_avatar.x = 55;
			this.addChild(user_avatar);

			return user_avatar;
		},

		cloneUserAvatar(){
			let userAvatarContainer = new createjs.Container();
			userAvatarContainer.x = this.context.stage.baseWidth - 655;
			userAvatarContainer.y = this.context.stage.baseHeight - 160;
			userAvatarContainer.addChild(this.makeUserAvatar());
			return userAvatarContainer;
		},

		changeTheme(new_theme) {
			this.bg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(-30,10,245,150);
			this.twin.color = this.context.theme_color[new_theme].text_color;
			this.user_name.color = this.context.theme_color[new_theme].text_color;
			this.win_label.color = this.context.theme_color[new_theme].text_color;
			this.lose_label.color = this.context.theme_color[new_theme].text_color;
		},
		setUserStat(obj) {
			if(!obj.total_bets) return;

			if(obj.initialize)
			{
				this.bar_blue.scaleX = 0.5;
				this.bar_red.scaleX = 0.5;
				this.blue_bar_text.text = "0%";
				this.red_bar_text.text =  "0%";

				return;
			}

			let total_lose =  obj.total_bets - obj.total_win;

			this.bar_blue.scaleX = obj.total_win/obj.total_bets;
			this.bar_red.scaleX = total_lose/obj.total_bets;

			let lose_percent = Math.round((total_lose/obj.total_bets) *100);
			let win_percent = Math.round((obj.total_win/obj.total_bets) *100);

			this.blue_bar_text.text = win_percent+"%";
			this.red_bar_text.text = lose_percent+"%";

		}
	});

	return instance;
}
