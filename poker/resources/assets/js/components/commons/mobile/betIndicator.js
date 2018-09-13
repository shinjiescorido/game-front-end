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

			this.visible = true;
			this.bet_indicator_text.text = amt.toLocaleString();

			setTimeout(()=> {
				this.visible = false
			},3000);
		}
	});

	return instance;
}