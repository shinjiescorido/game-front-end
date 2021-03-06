import {createSprite, randomNum} from '../../../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		win_res : [],
		main() {
			this.visible = false;
			this.gold_spotlight_container = new createjs.Container();

			let spotlight_1 = new createjs.Shape();
			spotlight_1.graphics.beginRadialGradientFill(["#edd791","rgba(216, 182, 88, 0.01)"],[0,1], 0, 0, 20,0,0,220).drawCircle(0,0,220);

			let spotlight_2 = new createjs.Shape();
			spotlight_2.graphics.beginRadialGradientFill(["#edd791","rgba(216, 182, 88, 0.01)"],[0,1], 0, 0, 50,0,0,200).drawCircle(0,0,200);

			this.gold_spotlight_container.addChild(spotlight_1, spotlight_2);
			this.gold_spotlight_container.regX = 220/2;
			this.gold_spotlight_container.regY = 220/2;
			this.gold_spotlight_container.x = this.context.context.width/2 + (220/2);
			this.gold_spotlight_container.y = 560;
			this.gold_spotlight_container.scaleY = 0;
			this.gold_spotlight_container.scaleX = 0;
			this.gold_spotlight_container.visible = true;

			this.addChild(this.gold_spotlight_container);

			this.text_container = new createjs.Container();

			this.win_text = new createjs.Text("","40px arvo-regular","#1d265b");
			this.win_text.shadow = new createjs.Shadow("#fff",0,3,0)
			this.win_text.y = 500;


			this.text_container.addChild(this.win_text);

			this.addChild(this.text_container);

			this.x  = 35;
			this.y = -30;

		},
		setResult (data) {
			this.win_text.text = data;
			this.visible = true;

			this.text_container.regX = this.text_container.getBounds().width/2;
			this.text_container.x = this.context.context.width/2;

			createjs.Tween.get(this.gold_spotlight_container)
			.to({
				scaleY: 0.3
			},80)
			.to({
				scaleX : 1
			},80);
		},
		hideRes() {

			this.visible = false;

			createjs.Tween.get(this.gold_spotlight_container)
			.to({
				scaleY: 0
			},80)
			.to({
				scaleX : 0
			},80);
		}

	});

	return instance;
}
