import {createSprite, randomNum, createCardSprite, numberCounter, playSound } from '../../factories/factories';

export default()=> {
	return new blu.Component({
		main() {


			let underlay = new createjs.Shape();
			underlay.graphics.beginFill("rgba(0,0,0,0.6)").drawRoundRect(-22,-160,400,365,15);
			this.addChild(underlay);

			this.dragon_bg = new createjs.Shape();
			this.dragonFill = this.dragon_bg.graphics.beginFill("rgba(22, 22, 22, 0.9)").command;
			this.dragon_bg.graphics.drawRect(0,0,721,180);
			this.addChild(this.dragon_bg);

			this.tiger_bg = new createjs.Shape();
			this.tigerFill = this.tiger_bg.graphics.beginFill("rgba(22, 22, 22, 0.9)").command;
			this.tiger_bg.graphics.drawRect(1200-1,0,721,180);
			this.addChild(this.tiger_bg);

			this.dragon_circle = new createjs.Shape()
			this.dragon_circle.graphics.ss(2).beginFill("#1976d2").drawCircle(0,0,55);
			this.dragon_circle.x = 620
			this.dragon_circle.y = 75
			this.dragon_circle.scaleX = this.dragon_circle.scaleY = 0.9;
			this.addChild(this.dragon_circle)

			this.tiger_circle = new createjs.Shape()
			this.tiger_circle.graphics.beginFill("#d32f2f").drawCircle(0,0,55);
			this.tiger_circle.x = this.context.stage.baseWidth - 620
			this.tiger_circle.y = this.dragon_circle.y
			this.tiger_circle.scaleX = this.tiger_circle.scaleY = 0.9;
			this.addChild(this.tiger_circle);

			this.dragon_value = new createjs.Text("0","80px bebas-regular","#fff");
			this.dragon_value.x = this.dragon_circle.x;
			this.dragon_value.y = this.dragon_circle.y - 42
			this.dragon_value.textAlign = "center";
			this.dragon_value.baseline = "middle";
			this.addChild(this.dragon_value);

			this.tiger_value = new createjs.Text("0","80px bebas-regular","#fff");
			this.tiger_value.x = this.tiger_circle.x;
			this.tiger_value.y = this.tiger_circle.y - 42
			this.tiger_value.textAlign = "center";
			this.tiger_value.baseline = "middle";
			this.addChild(this.tiger_value)

			this.dragon_text = new createjs.Text("DRAGON","24px lato-black","#1565c0");
			this.dragon_text.x = this.dragon_circle.x;
			this.dragon_text.y = this.dragon_circle.y + 55
			this.dragon_text.textAlign = "center";
			this.dragon_text.baseline = "middle";
			this.addChild(this.dragon_text);

			this.tiger_text = new createjs.Text("TIGER","24px lato-black","#d32f2f");
			this.tiger_text.x = this.tiger_circle.x;
			this.tiger_text.y = this.tiger_circle.y + 55
			this.tiger_text.textAlign = "center";
			this.tiger_text.baseline = "middle";
			this.addChild(this.tiger_text)

			this.visible = false;
		},

		play() {
			this.visible = true;
			let self = this;
			let dragonCard = "C0020";
			let tigerCard = "C0039";
			setTimeout(() =>{
				createjs.Tween.get(self.dragon)
				.to({
					scaleX:0
				},200)
				.call((obj,anim)=>{
					obj.gotoAndPlay(anim);
				},[self.dragon, dragonCard])
				.to( {
					scaleX: 0.74
				},200);
				createjs.Tween.get(self.tiger)
				.to({
					scaleX:0
				},200)
				.call((obj,anim)=>{
					obj.gotoAndPlay(anim);
				},[self.tiger, tigerCard])
				.to( {
					scaleX: 0.74
				},200);
			}, 1000);
		},
		setVal(type, data) {
			this[type+"_total"].text = data;
		}

	});
}
