/**
 * winAmount.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** view calculates win and displays win amount and animate **/

import {createSprite, randomNum,createCardSprite, numberCounter, fontFormat} from '../../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		win_text : [],
		win_suit_obj: [],
		lines_obj: [],
		main() {
			this.total_win_text = new createjs.Text("", fontFormat(45, 'normal', 'bebas', false), "#f1be29");
			this.total_win_text.shadow = new createjs.Shadow("#ffd73e", 0, 0, 6);
			this.total_win_text.textAlign = "center";
			this.total_win_text.textBaseline = "middle";
			this.total_win_text.alpha = 0;
			this.total_win_text.x = 640;
			this.total_win_text.y = 885;
			this.addChild(this.total_win_text);
			this.total_win_text.visible = false;

			this.winsArray = [];
			this.winpopupContainer = new createjs.Container();
			this.winpopupContainer.x = this.context.stage.baseWidth - 260
			this.winpopupContainer.y = this.context.context.height - 190;
			this.addChild(this.winpopupContainer);

			this.clearStacksTimeout = null;
			this.background = '#E5C160';

			this.shineContainer = new createjs.Container();
			this.shineContainer.x = this.context.component_betDetails.x;
			this.shineContainer.y = this.context.component_betDetails.y;

			var shape = new createjs.Shape();
			shape.graphics.beginFill("#fff").drawRect(0,0,15,160).drawRect(25,0,50,160);
			shape.rotation = 45;
			shape.x = shape.ox = -50;
			shape.y = -60;
			shape.alpha = 0.5;

			this.shineContainer.addChild(shape);
			this.shineContainer.mask = new createjs.Shape();
			this.shineContainer.mask.graphics.drawRect(0,0,210,45);
			this.shineContainer.mask.x = this.shineContainer.x
			this.shineContainer.mask.y = this.shineContainer.y;

			this.addChild(this.shineContainer);
		},

		animatePopup(tableName, amount, prefix = '+') {
			let self = this;

			if (this.winsArray.length) {
				this.moveStacks();
			}

			let winBox = this.makeWinBox(tableName, amount, prefix);
			this.addStack(winBox);
		},

		clearStacks () {
			clearTimeout(this.clearStacksTimeout);
			let self = this;

			this.clearStacksTimeout = setTimeout(function() {
				for (let i = 0; i < self.winsArray.length; i++) {
					createjs.Tween.get(self.winsArray[i])
						.wait(i * 100)
						.to({
							alpha : 0,
							x : 260
						}, 500)
						.call(function(){
							self.winsArray = [];
							self.winpopupContainer.removeAllChildren();
						});
				}
			}, 3000);
		},

		moveStacks () {
			let self = this;
			let pos = 1;
			
			for (let i = this.winsArray.length - 1; i >= 0; i--) {
				createjs.Tween.get(this.winsArray[i])
					.to({
						y : pos * 64
					}, 250)
					.call(function(){
						if(self.winsArray.length > 3)
						{
							self.winsArray = _.drop(self.winsArray, self.winsArray.length - 3)
						}
						self.clearStacks();
					});
				pos++;
			}
		},

		addStack (winBox) {
			let self = this;
			this.winsArray.push(winBox);

			createjs.Tween.get(winBox)
				.to({
					alpha : 1,
					x : 0
				},250)
				.call(function(param){
					param.target.close.addEventListener("click", function(e) {
						self.winsArray.splice(self.winsArray.indexOf(e.currentTarget.parent), 1);
						self.rearrangeStack();

						createjs.Tween.get(e.currentTarget.parent)
							.to({
								alpha : 0,
								x : 260
							}, 250)
					});
				});
			
				self.clearStacks();
		},
		
		rearrangeStack () {
			let self = this;
			let pos = 0;

			for (let i = this.winsArray.length - 1; i >= 0; i--) {
				createjs.Tween.get(this.winsArray[i])
					.to({
						y : pos * 64
					}, 250)
					.call(function(){
						self.clearStacks();
					});

				pos++;
			}
		},

		makeWinBox (tableName, amount, prefix, point = 0) {

			let winArrCon = new createjs.Container();
			winArrCon.setBounds(0,0,260,64);
			winArrCon.y = point;
			winArrCon.x += 260;
			winArrCon.alpha = 0;
			this.winpopupContainer.addChild(winArrCon);

			let winpopupRec = new createjs.Shape();

			if (this.winsArray[this.winsArray.length - 1]) {
				this.background = this.winsArray[this.winsArray.length - 1].background == "#E5C160" ? '#F1E382' : "#E5C160";
			}

			winpopupRec.graphics.f(this.background).drawRect(0,0,260, 64).f('#568E23').drawRect(0,0, 10, 64);
			winArrCon.addChild(winpopupRec);
			winArrCon.background = this.background;

			let closeBtn = new createjs.Text("X","bold 15px arial", '#424345');
			closeBtn.x = 260 - 20;
			closeBtn.y = 9;
			winArrCon.addChild(closeBtn);

			let closeBtnHitArea = new createjs.Shape();
			closeBtnHitArea.graphics.f('#000').drawRect(0,0,20,20);
			closeBtnHitArea.x = 260 - 25;
			closeBtnHitArea.y = 5;
			closeBtnHitArea.cursor = "pointer";
			closeBtnHitArea.alpha = 0.01;
			winArrCon.addChild(closeBtnHitArea);
			winArrCon.close = closeBtnHitArea;

			let winpopupTxt = new createjs.Text(`${tableName}`, "bold 20px arial", "#211F20");
			winpopupTxt.textAlign = "left";
			winpopupTxt.x = 30;
			winpopupTxt.y = 18;
			winpopupTxt.textBaseline = "middle";
			winArrCon.addChild(winpopupTxt);

			let winpopupAmt = new createjs.Text(`${prefix} ${this.numberWithCommas(amount)}`, "28px bebasNeue", "#568E23");
			winpopupAmt.textAlign = "left";
			winpopupAmt.x = 30;
			winpopupAmt.y = 45;
			winpopupAmt.textBaseline = "middle";
			winArrCon.addChild(winpopupAmt);

			return winArrCon;
		},

		animateAmtWin () {
			createjs.Tween.get(this.shineContainer.children[0])
			.to({
				x : 320
			},800, createjs.Ease.circInOut)
			.call((target) => {
				target.x = target.ox;
			},[this.shineContainer.children[0]])

			createjs.Tween.get(this.total_win_text)
				.to({
					alpha : 1
				},250)
				.wait(1000)
				.to({
					y: 700,
					scaleX: 1.3,
					scaleY: 1.3
				},500, createjs.Ease.linear)
				.to({
					scaleX: 1,
					scaleY: 1,
					y: 850
				},300, createjs.Ease.linear)
				.to({
					alpha: 0
				},200)
		},
		numberWithCommas (x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		giveWinChips(amt) {
			this.winning_chips = [];
			let avail_chips = [];

			if (this.dollar) {
				avail_chips = [1,3,5,10,30,50,100,200,300,500,1000];
			}
			else {
				avail_chips = [1000,3000,5000,10000,30000,50000,100000,200000,300000,500000,1000000];
			}

			let sample = parseInt(amt);
			let count = avail_chips.length-1;
			let chips = [];

			for (var x = avail_chips.length-1; x > -1; x--) {
				if (sample == avail_chips[x]) {
					chips.push(avail_chips[x]);
					break;
				} // end if 
				else if (sample-avail_chips[x] >= 0){
					sample -= avail_chips[x];
					chips.push(avail_chips[x]);
					x++;
				} // end elseif
			} // end for

			let last_instance = null;

			for (var x = 0; x < chips.length; x++) {
				let chip_name = '';

				if (this.dollar) {
					chip_name = "chip_$"+(chips[x]);
				}
				else {
					chip_name = "chip_"+(chips[x]/1000)+"k";
				}

				this.winning_chips[x] = createSprite(this.context.getResources(chip_name), 72, 72, instance);
				this.winning_chips[x].gotoAndStop(2); 
				this.winning_chips[x].chip_name = chip_name; 
				this.winning_chips[x].x = this.context.context.width/2 - 50; 
				this.winning_chips[x].y = this.context.context.height/2 - 250; 
				this.winning_chips[x].alpha = 0;

				if(this.winning_chips[x-1] ) {
					if(this.winning_chips[x].chip_name != this.winning_chips[x-1].chip_name){
						this.winning_chips[x].x += 50
					}                   
				}

				createjs.Tween.get(this.winning_chips[x])
					.wait(1500)
					.to({
						y:  this.winning_chips[x].y + 200,
						alpha : 1
					},400)
					.wait(250)
					.to({
						x : this.context.component_betDetails.x + 50, //this.winning_chips[x].x + 550,
						y : this.context.component_betDetails.y //this.winning_chips[x].y + 660,
					},800)
					.wait(150)
					.to({
						alpha : 0
					},250) 

				this.addChild(this.winning_chips[x])
			}

		}
	});

	return instance;
}