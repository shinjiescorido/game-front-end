let instance = null;

export default() => {
	instance = instance || new blu.Component({
		dealer_image : null,
		round_id : null,
		main() {

			let dealer_details = {
				name : window.dealer.screen_name,
				image : window.dealer.img
			}

			let width = 305;

			this.x = 100;

			this.bg = new createjs.Shape();
			this.bg.graphics.beginFill(this.context.theme_color[window.theme].dealer_channel_rgb).drawRoundRectComplex(0,0,width,80,0,0,10,0);
			this.addChild(this.bg);

			this.imgBg = new createjs.Shape();
			this.imgBg.graphics.beginFill("#d12e2e").drawCircle(0, 0, 35);
			this.imgBg.x = 44;
			this.imgBg.y = 39;
			this.addChild(this.imgBg);

			this.dealer_image = new createjs.Bitmap();
			this.dealer_image.y = 5;
			this.dealer_image.x = 10;
			this.dealer_image.scaleX = 0.7;
			this.dealer_image.scaleY = 0.7;

			this.addChild(this.dealer_image);

			//dealer name init
			this.dealer_name = new createjs.Text("Sunshine","bold 20px arial",this.context.theme_color[window.theme].text_color);
			this.dealer_name.x = this.dealer_image.x + 80;
			this.dealer_name.y = this.dealer_image.y + 8;
			this.addChild(this.dealer_name)

			//round number init
			this.round_num = new createjs.Text("","18px arial",this.context.theme_color[window.theme].text_color);
			this.round_num.textAlign = "right";
			this.round_num.x = this.dealer_name.x  + 195;
			this.round_num.y = this.dealer_name.y;
			this.addChild(this.round_num);

			//setters
			this.setDealer(dealer_details);
			this.y = this.context.component_channel.bg.getTransformedBounds().height;

			this.setRound(window.round_id);
		},
		setDealer(dealer) {
			let image = new Image();
			image.src = dealer.image;
			this.dealer_image.image = image;
			this.dealer_image.scaleX = this.dealer_image.scaleY = 0.53;
			this.dealer_name.text = dealer.name

			if (dealer.name == 'Dealer') {
				this.dealer_image.scaleX = this.dealer_image.scaleY = 0.7;
			}
			this.context.component_menuPlayerInfo.updatePlayerInfo(0,0,dealer.name)
			this.context.component_menuPlayerInfo.updateDealer(dealer.name);
		},
		setRound(round) {
			this.round_num.text = round;
			this.round_id = round;
		},
		changeTheme(new_theme) {
			let width = 305;
			this.bg.graphics.clear().beginFill(this.context.theme_color[new_theme].dealer_channel_rgb).drawRoundRectComplex(0,0,width,80,0,0,10,0);
			this.context.component_channel.changeTheme(new_theme);
			this.context.component_menu.changeExitTheme(new_theme);
			this.dealer_name.color = this.context.theme_color[new_theme].text_color;
			this.round_num.color = this.context.theme_color[new_theme].text_color;
		}
	});

	return instance;
}
