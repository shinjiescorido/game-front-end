/**
 * betIndicator.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** bitmap of bubble text indicator for bet amounts **/

let instance = null;

export default () => {
	instance = instance || new blu.Component({
		click : false,
		cnt : 3,
		interval : [],
		timeout : [],
		main () {

			this.betindicator_container = new createjs.Container();
			this.bet_indicator = new createjs.Bitmap(this.context.getResources("bet_indicator"));
			this.bet_indicator.scaleX = this.bet_indicator.scaleY = 0.8;

			this.bet_indicator_text = new createjs.Text("0","bold 30px arial","#fff");
			this.bet_indicator_text.textAlign = "center";
			this.bet_indicator_text.textBaseline = "middle";
			this.bet_indicator_text.x = (this.bet_indicator.getTransformedBounds().width/2);
			this.bet_indicator_text.y = (this.bet_indicator.getTransformedBounds().height/2) - 8;

			this.betindicator_container.regX = this.bet_indicator.getTransformedBounds().width/2;
			this.betindicator_container.regY = this.bet_indicator.getTransformedBounds().height/2;
			this.betindicator_container.addChild(this.bet_indicator,this.bet_indicator_text);
			this.addChild(this.betindicator_container);
			this.visible = false;

		},
		setIndicatorText (amt) {
			// console.log("click2x");

			if(this.cnt <= 20) {
				this.cnt++;
			}

			if(!this.click) {
				this.timeout.push(setTimeout(() => {
					this.interval.push(setInterval(() => {
						this.cnt --;
						// console.log("neg", this.cnt);
						if(this.cnt <= 0) {
							this.timeout.forEach((e) => {
								clearTimeout(e)
								// console.log("STOPED");
							})
							this.interval.forEach((e) => {
								clearInterval(e)
								// console.log("STOPED");
								this.click = false;
								this.visible = false
							})
						}
					}, 200));
				}, 1000));
			}

			this.click = true;
			// if(this.click) {
			// 	this.interval.push(setInterval(() => {
			// 		this.cnt --;
			// 		if(this.cnt < 0) {
			// 			console.log("stopped click");
			// 			this.interval.forEach((e) =>{
			// 				clearInterval(e);
			// 				this.click =  false;
			// 			});
			// 		}
			// 	}, 1000));
			// }

			this.visible = true;
			this.bet_indicator_text.text = amt.toLocaleString();

			// setTimeout(()=> {
			// 	this.visible = false
			// },3000);
		},
		forceHideIndicator () {
			this.visible = true;
		}
	});

	return instance;
}
