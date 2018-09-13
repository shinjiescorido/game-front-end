let instance = null;

export default() => {

	instance = instance || new blu.Component({
		main() {

			let width = 305;
			let dividend
            if (window.casino == 'SS') {
                dividend = 1000;
            }
            else {
                dividend = 1;
            }

			this.bg = new createjs.Shape();
			this.bg.graphics.beginFill(this.context.theme_color[window.theme].dealer_channel_rgb).drawRect(0,0,width,40);
			this.bg.setBounds(0,0,width,40);
			this.addChild(this.bg)

			this.bar_1 = new createjs.Shape();
			this.bar_1.graphics.beginFill(this.context.theme_color[window.theme].bar_color).drawRect(0,0,width-8,0.5);
			this.bar_1.y = 38;
			this.addChild(this.bar_1);

			// this.x = this.context.stage.baseWidth - width;
			// this.y = this.context.stage.baseHeight - 190;

			this.x = 100;

			this.channel_num = new createjs.Text(window.tableNum,"20px arial",this.context.theme_color[window.theme].text_color);
			this.channel_num.x = 50;
			this.channel_num.y = 10;
			this.channel_num.textAlign = "left";
			this.addChild(this.channel_num);

			this.channel_icon = new createjs.Bitmap(this.context.getResources("channel-"+window.theme));
			this.channel_icon.scaleX = this.channel_icon.scaleY = .5;
			this.channel_icon.y = 6;
			this.channel_icon.x = 10
			this.addChild(this.channel_icon);

			//Main area range
			let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
			if (window.mainMultiplier % 10) mainMultiplier = 1;
			let mainMin = (parseInt(window.rangeDetails.min) * parseInt(window.currencyMultiplier)) * window.userMultiplier;
			let mainMax = ((parseInt(window.rangeDetails.max) * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

			this.bet_range_1 = new createjs.Text(this.numberWithCommas(mainMin),"18px arial",this.context.theme_color[window.theme].text_color);
			this.bet_range_1.y = 12;
			this.bet_range_1.x = 90;
			this.bet_range_1.textAlign = "left";
			this.addChild(this.bet_range_1);

			this.bet_range_2 = new createjs.Text(this.numberWithCommas(mainMax),"18px arial",this.context.theme_color[window.theme].text_color);
			this.bet_range_2.y = this.bet_range_1.y;
			// this.bet_range_2.x = this.bet_range_1.x + 100;
			this.bet_range_2.x = 285;
			this.bet_range_2.textAlign = "right";
			this.addChild(this.bet_range_2);

			this.separator = new createjs.Text("-","18px arial",this.context.theme_color[window.theme].text_color);
			let center_width = (this.bet_range_2.x - this.bet_range_2.getMeasuredWidth()) - (this.bet_range_1.x + this.bet_range_1.getMeasuredWidth());
			this.separator.x = this.bet_range_1.x + this.bet_range_1.getMeasuredWidth() + (center_width / 2);
			this.separator.textAlign = "center";
			this.separator.y = 12;
			this.addChild(this.separator);

		},
		numberWithCommas (x) {
		    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		changeTheme(new_theme) {
			let width = 305;
			this.bg.graphics.clear().beginFill(this.context.theme_color[new_theme].dealer_channel_rgb).drawRect(0,0,width,40);
			this.bar_1.graphics.clear().beginFill(this.context.theme_color[new_theme].bar_color).drawRect(0,0,width-8,0.5);
			this.channel_num.color = this.context.theme_color[new_theme].text_color;
			this.channel_icon.image = this.context.getResources("channel-"+new_theme);
			this.bet_range_1.color = this.context.theme_color[new_theme].text_color;
			this.bet_range_2.color = this.context.theme_color[new_theme].text_color;
			this.separator.color = this.context.theme_color[new_theme].text_color;
		},
	});

	return instance;
}
