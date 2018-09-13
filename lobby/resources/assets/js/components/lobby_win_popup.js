let instance = null;

export default() => {
	instance = instance || new blu.Component({

		main() {
            
            
            winPop = new createjs.Stage("winPop");
            winPop.enableMouseOver(10);

            this.winsArray = [];
			this.winpopupContainer = new createjs.Container();
			winPop.addChild(this.winpopupContainer);

			this.clearStacksTimeout = null;
			this.background = '#E5C160';

			this.firstBg = new createjs.Shape();
			this.firstBg.graphics.f('#111111').drawRect(0,0,280, 84);
			this.firstBg.x = 280;
			this.firstBg.y = 128;
			this.firstBg.alpha = 0;
			this.winpopupContainer.addChild(this.firstBg);

			this.secondBg = new createjs.Shape();
			this.secondBg.graphics.f('#111111').drawRect(0,0,280, 148);
			this.secondBg.x = 280;
			this.secondBg.y = 64;
			this.secondBg.alpha = 0;
			this.winpopupContainer.addChild(this.secondBg);

			this.thirdBg = new createjs.Shape();
			this.thirdBg.graphics.f('#111111').drawRect(0,0,280, 212);
			this.thirdBg.x = 280;
			this.thirdBg.y = 0;
			this.thirdBg.alpha = 0;
			this.winpopupContainer.addChild(this.thirdBg);

			this.removedArrs = [];
			this.init = 0;

            this.resize()
            window.addEventListener("resize", function() {
                this.resize()
                winPop.update()
			}.bind(this));
        },

        resize () {
			
			var newWidth = window.innerWidth;
			var newHeight = window.innerHeight;

			var baseRatio = 1920 / 1080,
				newRatio = newWidth / newHeight;

			if(newRatio > baseRatio) {
				newWidth = newHeight * baseRatio;
			} else {
				newHeight = newWidth / baseRatio;
			}

			winPop.canvas.width = newWidth * (560 / 1920);
			winPop.canvas.height = newHeight * (212 / 1080);
			this.winpopupContainer.scaleX = this.winpopupContainer.scaleY = 1920 / 560;
			winPop.scaleX = winPop.scaleY = (newWidth * (560 / 1920)) / 1920;
		},

        animatePopup (tableName, amount, prefix = '+') {
			
			if(!$('#hot').is(':visible'))
			{
				$('#winPop').hide();
				return;
			}
            
			$('#winPop').show();

			let self = this;
			if(this.winsArray.length >= 3)
			{
				this.removedArrs = _.dropRight(this.winsArray, this.winsArray.length - 1);
				this.winsArray = _.drop(this.winsArray, this.winsArray.length - 2)
			}

			if (this.init >= 3) {
				this.moveStacks();
			}

			this.init++;

			let winBox = this.makeWinBox(tableName, amount, prefix, this.firstPos());
			this.addStack(winBox);
		},

		firstPos () {
			return this.init == 1 ? 128 : this.init == 2 ? 64 : 0;
		},

		clearStacks () {

			clearTimeout(this.clearStacksTimeout);
			let self = this;

			this.clearStacksTimeout = setTimeout(function() {

				self.init = 0;
				self.updateBG(500);
				for (let i = 0; i < self.winsArray.length; i++) {
					createjs.Tween.get(self.winsArray[i])
						.wait(i * 100)
						.to({
							alpha : 0,
							x : 560
						}, 500)
						.call(function(){
							self.winsArray = [];
							self.winpopupContainer.removeAllChildren();
							self.winpopupContainer.addChild(self.firstBg);
							self.winpopupContainer.addChild(self.secondBg);
							self.winpopupContainer.addChild(self.thirdBg);
                            $('#winPop').hide();
						});
				}
			}, 3000);
		},

		moveStacks () {
			let self = this;

			_.each(self.removedArrs, (arr)=>{
				createjs.Tween.get(arr)
				.wait(100)
				.to({
					alpha : 0
				}, 250)
			});

			let pos = 3 - this.winsArray.length;
			for (let i = this.winsArray.length - 1; i >= 0; i--) {
				createjs.Tween.get(this.winsArray[i])
					.to({
						y : pos * 64
					}, 250)
					.call(function(){
						if(self.winsArray.length > 3)
						{
							self.removedArrs = _.dropRight(self.winsArray, self.winsArray.length - 1);
							self.winsArray = _.drop(self.winsArray, self.winsArray.length - 2)
						}
						self.clearStacks();
					});
				pos++;	
			}
		},

		addStack (winBox) {
			let self = this;
			this.winsArray.push(winBox);

			this.updateBG();
			
			createjs.Tween.get(winBox)
				.to({
					alpha : 1,
					x : 280,
					y :  self.firstPos()
				},250)
				.call(function(param){
					param.target.close.addEventListener("click", function(e) {
						self.winsArray.splice(self.winsArray.indexOf(e.currentTarget.parent), 1);
						self.rearrangeStack();

						createjs.Tween.get(e.currentTarget.parent)
							.to({
								alpha : 0,
								x : 560
							}, 250)
					});
				});
			self.clearStacks();
		},

		updateBG (duration = 200) {

			let arr = [];
			for( let i=1; i <= 3 ; i++ )
			{
				let alpha = 0;
				if(i <= this.init) alpha = 1;
				arr.push(alpha);
			}
			
			createjs.Tween.get(this.firstBg)
			.to({
				alpha : arr[0]
			},duration)

			createjs.Tween.get(this.secondBg)
			.to({
				alpha : arr[1]
			},duration)
			
			createjs.Tween.get(this.thirdBg)
			.to({
				alpha : arr[2]
			},duration)
		},

		rearrangeStack () {
			let self = this;
			let pos = 3 - this.winsArray.length;

			if(self.winsArray.length < 3) self.init = self.winsArray.length;

			this.updateBG();
			
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
			winArrCon.x += 560;
			winArrCon.alpha = 0;
			this.winpopupContainer.addChild(winArrCon);

			let winpopupRec = new createjs.Shape();

			if (this.winsArray[this.winsArray.length - 1]) {
				this.background = this.winsArray[this.winsArray.length - 1].background == "#E5C160" ? '#F1E382' : "#E5C160";
			}

			winpopupRec.graphics.f(this.background).drawRect(10,10,260, 64).f('#568E23').drawRect(10,10, 10, 64);
			winArrCon.addChild(winpopupRec);
			winArrCon.background = this.background;

			let closeBtn = new createjs.Text("X","bold 15px arial", '#424345');
			closeBtn.x = 260 - 20;
			closeBtn.y = 19;
			winArrCon.addChild(closeBtn);

			let closeBtnHitArea = new createjs.Shape();
			closeBtnHitArea.graphics.f('#000').drawRect(0,0,20,20);
			closeBtnHitArea.x = 260 - 25;
			closeBtnHitArea.y = 15;
			closeBtnHitArea.cursor = "pointer";
			closeBtnHitArea.alpha = 0.01;
			winArrCon.addChild(closeBtnHitArea);
			winArrCon.close = closeBtnHitArea;

			let winpopupTxt = new createjs.Text(`${tableName}`, "bold 20px arial", "#211F20");
			winpopupTxt.textAlign = "left";
			winpopupTxt.x = 30;
			winpopupTxt.y = 28;
			winpopupTxt.textBaseline = "middle";
			winArrCon.addChild(winpopupTxt);

			let winpopupAmt = new createjs.Text(`${prefix} ${this.numberWithCommas(amount)}`, "28px bebasNeue", "#568E23");
			winpopupAmt.textAlign = "left";
			winpopupAmt.x = 30;
			winpopupAmt.y = 55;
			winpopupAmt.textBaseline = "middle";
			winArrCon.addChild(winpopupAmt);

			return winArrCon;
        },

        numberWithCommas (x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},

	});
    
    return instance;
}