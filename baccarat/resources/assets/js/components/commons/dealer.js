let instance = null;

export default() => {
	instance = instance || new blu.Component({
		dealer_image : null,
		round_id : null,
		main() {
/*			let dealer_details = {
				name : window.dealer.screen_name,
				image : window.dealer.img
			}*/

			// this.imgBg = new createjs.Shape();
			// this.imgBg.graphics.beginFill("#d12e2e").drawCircle(0, 0, 50);
			// this.imgBg.x = 40;
			// this.imgBg.y = 60;
			// // this.addChild(this.imgBg)

			// this.dealer_image = new createjs.Bitmap();
			// this.dealer_image.y = 10;
			// this.dealer_image.x = -10;
			// this.dealer_image.scaleX = 0.7;
			// this.dealer_image.scaleY = 0.7;

			// // this.addChild(this.dealer_image);

			// this.bar_1 = new createjs.Shape();
			// this.bar_1.graphics.beginFill(this.context.theme_color[window.theme].bar_color).drawRect(-20,0,220,0.5);
			// // this.addChild(this.bar_1);

			// this.y = this.context.stage.baseHeight - 190;
			// this.x = 20;

			// //dealer name init
			// this.dealer_name = new createjs.Text("","bold 20px arial",this.context.theme_color[window.theme].text_color);
			// this.dealer_name.x = this.dealer_image.x + 110;
			// this.dealer_name.y = this.dealer_image.y + 30;
			// // this.addChild(this.dealer_name)

			// //round number init
			// this.round_num = new createjs.Text("","18px arial",this.context.theme_color[window.theme].text_color);
			// this.round_num.x = this.dealer_name.x;
			// this.round_num.y = this.dealer_name.y + 22;
			// // this.addChild(this.round_num);

			//setters
			// this.setDealer(dealer_details);
			this.setRound(window.round_id);
		},
		changeTheme(new_theme) {

			// this.context.component_dealer_data.changeTheme(new_theme);
			// this.bar_1.graphics.clear().beginFill(this.context.theme_color[new_theme].bar_color).drawRect(-20,0,220,0.5);
			// this.dealer_name.color = this.context.theme_color[new_theme].text_color;
			// this.round_num.color = this.context.theme_color[new_theme].text_color;
		},
		setDealer(dealer) {
			// let image = new Image();
			// image.src = dealer.image;
			// this.dealer_image.image = image;
			// this.dealer_image.scaleX = this.dealer_image.scaleY = 0.77;
			// this.dealer_name.text = dealer.name

			// if (dealer.name == 'Dealer') {
			// 	this.dealer_image.scaleX = this.dealer_image.scaleY = 0.9;
			// }

    	$('.channel-con.-dealername > span').html(dealer.name);
		},
		setRound(round) {
			// this.round_num.text = round;
			this.round_id = round;
    	$('.channel-con.-gamenumber > span').html(round);
		}
	});

	return instance;
}
