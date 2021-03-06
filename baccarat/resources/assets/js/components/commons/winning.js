import { fontFormat } from '../../factories/factories';

let instance = null;

export default(win_assets) => {
	instance = instance || new blu.Component({
		win_text : [],
		win_suit_obj: [],
		lines_obj: [],
		main() {

			this.x  = (this.context.stage.baseWidth/2);
			this.y  = 395;
			this.visible = 1;
			//initalization of win effects

			this.animationContainer = new createjs.Container();
			this.animationContainer.x = (850/2);
			this.animationContainer.y = 0

			this.addChild(this.animationContainer);
			let pos = this.circle(20,8,0,0);

			this.animationContainer.visible = false;

			for(var x = 0;x<win_assets.length;x++) {

				this.win_suit_obj[x] = new createjs.Bitmap(this.context.getResources(win_assets[x]));
				this.win_suit_obj[x].regX = this.win_suit_obj[x].getTransformedBounds().width/2;
				this.win_suit_obj[x].regY = this.win_suit_obj[x].getTransformedBounds().height/2;
				this.win_suit_obj[x].scaleX = this.win_suit_obj[x].scaleY = 0.5;
				this.win_suit_obj[x].alpha = 0;
				this.animationContainer.addChild(this.win_suit_obj[x])

				this.win_suit_obj[x].y = pos.yValues[x];
				this.win_suit_obj[x].oy = pos.yValues[x];
				this.win_suit_obj[x].x = pos.xValues[x];
				this.win_suit_obj[x].ox = pos.xValues[x];

				this.lines_obj[x] = new createjs.Shape();
				this.lines_obj[x].graphics.beginFill("#d8bd69").drawRect(0,0,6,90);
				this.lines_obj[x].setBounds(0,0,6,90);
				this.lines_obj[x].regX = this.lines_obj[x].getTransformedBounds().width/2;
				this.lines_obj[x].regY = 0;

				this.animationContainer.addChild(this.lines_obj[x]);
			}

			//gold bar
			this.gold_instance =  new createjs.Shape();
			this.gold_instance.graphics.beginLinearGradientFill(["rgba(215, 189, 105,0.0)","#d7bd69","rgba(215, 189, 105,0.0)"], [0, 0.5, 1], 0, 0, 850, 0).drawRect(0, 0, 850, 80);
			this.regX = (850)/2;
			this.gold_instance.regX = (850)/2;
			this.gold_instance.x = (850)/2
			this.gold_instance.scaleX = 0
			this.addChild(this.gold_instance);

			this.text_container = new createjs.Container();
			this.text_container.x = (850)/2;
			this.addChild(this.text_container);

		},

		circle: function(radius, steps, centerX, centerY) {
		    let xValues = [centerX];
		    let yValues = [centerY];

		    for (var i = 0; i < steps; i++) {
			    xValues[i] = (centerX + radius * Math.cos(2 * Math.PI * i / steps));
			    yValues[i] = (centerY + radius * Math.sin(2 * Math.PI * i / steps));
			}

		    let positions = {
		    	xValues : xValues,
		    	yValues : yValues
		    }

			return positions;
		},

		hideResult () {
			this.gold_instance.scaleX = 0;
		},

		showWinAnimation(win, color, is_win) {

			this.visible = 1
			//win suits animation

			// this.animationContainer.visible = false;
			//
			//gold bar entrance animation
			createjs.Tween.get(this.gold_instance)
			.wait(400)
			.to({
				scaleX: 1
			},300)

			this.createWinText(win, color);

			for(var x = 0 ;x<this.win_text.length;x++) {

				createjs.Tween.get(this.win_text[x])
				.wait(800)
				.to({
					scaleX : 6,
					scaleY: 6
				})
				.wait(x*35)
				.to({
					scaleX : 1,
					scaleY: 1,
					alpha: 1
				},200);
			}

			try {
				this.context.component_winning_assets.winning_asset[win].scaleX = this.context.component_winning_assets.winning_asset[win].scaleY = 0;
				createjs.Tween.get(this.context.component_winning_assets.winning_asset[win])
				.to({
					scaleX : 1.4,
					scaleY : 1.4,
					alpha: 1
				},300)
				.to({
					scaleX : 1.1,
					scaleY : 1.1
				},80)
			}
			catch(e) {

			}
		},
		isWin () {
			let rotationVal = [];
			let line_rotate = [];
			let toPos = this.circle(250,8,0,0);
			let toPos2 = this.circle(350,8,0,0);

			let toPos3 = this.circle(320,8,0,0);
			let toPos4 = this.circle(400,8,0,0);

			let toPos5 = this.circle(300,8,0,0);
			let oPos = this.circle(0,8,0,0);

			this.animationContainer.visible = true;

			for(var x = 0;x<8;x++) {
				this.win_suit_obj[x].alpha = 0;
				this.win_suit_obj[x].x = oPos.xValues[x];
				this.win_suit_obj[x].y = oPos.yValues[x];

				this.lines_obj[x].x = oPos.xValues[x];
				this.lines_obj[x].y = oPos.yValues[x];

				if(x<4) {
					rotationVal[x] = rotationVal[x-1] + 45
					if(x == 0) {
						rotationVal[x] = 90;
					} else if(x == 2) {
						rotationVal[x] = 180
					}
				} else if(x>3) {

					rotationVal[x] = rotationVal[x-1] + 45

					if(x == 4) {
						rotationVal[x] = 270;
					} else if(x == 6) {
						rotationVal[x] = 0
					}
				}

				this.win_suit_obj[x].rotation = rotationVal[x]
				this.lines_obj[x].rotation = rotationVal[x]

				createjs.Tween.get(this.win_suit_obj[x])
				.wait(200)
				.to({
					x:toPos.xValues[x],
					y:toPos.yValues[x],
					alpha: 1
				},400, createjs.Ease.quintOut)
				.to({
					x:toPos2.xValues[x],
					y:toPos2.yValues[x],
					alpha: 0
				},200)
				.to({
					x : oPos.xValues[x],
					y : oPos.yValues[x],
					alpha: 1
				})
				.to({
					x:toPos3.xValues[x],
					y:toPos3.yValues[x],
					alpha: 1
				},400, createjs.Ease.quintOut)
				.to({
					x:toPos4.xValues[x],
					y:toPos4.yValues[x],
					alpha: 0
				},200)

				this.lines_obj[x].alpha	= 0;
				this.lines_obj[x].scaleY = 1;

				createjs.Tween.get(this.lines_obj[x])
				.wait(800)
				.to({
					y:toPos.yValues[x],
					x:toPos.xValues[x],
					alpha: 1
				},400)
				.to({
					y:toPos5.yValues[x],
					x:toPos5.xValues[x],
					scaleY : 0,
					alpha: 0
				},200)

			}

			//text animation
			// if(win=="tie") {
			// 	this.createWinText(win); //creating individual text object
			// } else{
			// 	this.createWinText(win+" wins"); //creating individual text object
			// }


		},
		createWinText(text, color) {

			if(this.win_text.length) {
				this.text_container.removeAllChildren()
			}

			let textArray = text.split("");

			let space = 0;

			for(var x = 0;x<textArray.length;x++) {
				this.win_text[x] = new createjs.Text(textArray[x].toUpperCase(), window.language.locale == "jp" || window.language.locale == "en" ? fontFormat(65, "black", "arvo", false) : fontFormat(60, "black", "noto"), color);
				this.win_text[x].shadow = new createjs.Shadow("#ecd489",4,4,0);
				this.win_text[x].textBaseline = "middle";
				this.win_text[x].skewX = 10;

				if(x > 0) {
					this.win_text[x].x = this.win_text[x-1].x + this.win_text[x-1].getMeasuredWidth() +5;
				} else {
					this.win_text[x].x = 0
				}

				this.win_text[x].alpha = 0;
				this.win_text[x].y = 80/2;

				this.text_container.addChild(this.win_text[x]);
			}

			this.text_container.regX = (this.text_container.getTransformedBounds().width/2);
		}
	});

	return instance;
}
