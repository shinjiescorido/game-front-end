let confirmButton = null;
let clearButton = null;
let repeatButton = null;

confirmButton = confirmButton || function(state) {
	let confirmButton = new createjs.Container();
	let c_button = new createjs.Shape();
	c_button.graphics.ss(1).beginStroke("rgba(255,255,255,0.5)").drawCircle(57,55,43);

	let check_1 = new createjs.Shape();
	check_1.graphics.beginFill("#a1a1a2").drawRoundRect(-10,90,70,13,4);
	check_1.rotation = -40;

	let check_2 = new createjs.Shape();
	check_2.graphics.beginFill("#a1a1a2").drawRoundRect(-12,60,13,40,4);
	check_2.rotation = -40;

	check_1.scaleX = check_1.scaleY = 0.76;
	check_2.scaleX = check_2.scaleY = 0.76;
	check_1.x = check_2.x = 2;//20 - 5;
	check_1.y = check_2.y = 10; //8 + 12;

	let c_button_text = new createjs.Text(window.language.game_buttons.confirmcaps, "bold 15px lato , helvetica", "#fff");
	c_button_text.textAlign = "center";
	c_button_text.x = 57;
	c_button_text.y = 62;
	if(window.language.locale == "jp") {
		c_button_text.y = 68;
		c_button_text.font = "bold 15px lato , helvetica"
	}
	else if(window.language.locale == "kr")
	{
		c_button_text.y = 68;
		c_button_text.font = "bold 15px lato , helvetica"
	}

	confirmButton.button_bg = c_button;
	confirmButton.check_1 = check_1;
	confirmButton.check_2 = check_2;
	confirmButton.c_text = c_button_text;
	confirmButton.addChild(c_button, check_1,check_2);

	confirmButton.gotoAndStop = function (state)  {
		switch(state) {
			case "disabled" :
				this.button_bg.graphics.clear().beginStroke("rgba(255,255,255,0.5)").beginFill("#282828").drawCircle(57,55,43);
				this.check_1.graphics.clear().f("#a1a1a2").drawRoundRect(-10,90,70,13,4);
				this.check_2.graphics.clear().f("#a1a1a2").drawRoundRect(-12,60,13,40,4);
				this.c_text.color = "#797979"
				break;

			case "up" :
				this.button_bg.graphics.clear().beginLinearGradientFill(["#279144","#37b14a","#279144"],[0,0.5,1], 0,0,130,0,170,0).drawCircle(57,55,43);
				this.button_bg.shadow = new createjs.Shadow("rgba(0,0,0,0.5)",0,2,5)
				this.check_1.graphics.clear().f("#fff").drawRoundRect(-10,90,70,13,4);
				this.check_2.graphics.clear().f("#fff").drawRoundRect(-12,60,13,40,4);
				this.c_text.color = "#fff"
				break;

			case "click" :
				this.button_bg.graphics.clear().beginFill("#246342").drawCircle(57,55,43);
				this.check_1.graphics.clear().f("#1b3c29").drawRoundRect(-10,90,70,13,4);
				this.check_2.graphics.clear().f("#1b3c29").drawRoundRect(-12,60,13,40,4);
				this.c_text.color = "#1b3c29"
				break;

			case "after_click" :
				this.button_bg.graphics.clear().beginLinearGradientFill(["#266443","#33805c","#266443"],[0,0.5,1], 0,0,130,0,170,0).drawCircle(57,55,43);
				this.check_1.graphics.clear().f("#fff").drawRoundRect(-10,90,70,13,4);
				this.check_2.graphics.clear().f("#fff").drawRoundRect(-12,60,13,40,4);
				this.c_text.color = "#1b3c29"
				break;

		}

	}
	
	confirmButton.children.forEach((e) => {
		e.table = true;
	});

	if(!state) {
		confirmButton.gotoAndStop("disabled");
	} else {
		confirmButton.gotoAndStop(state);
	}


	return confirmButton;
}

clearButton = clearButton || function(state) {

	let clearButton = new createjs.Container();

	let clear_button = new createjs.Shape();
	clear_button.graphics.beginStroke("rgba(255,255,255,0.5)").drawCircle(57,55,43);

	let cross_1 = new createjs.Shape();
	cross_1.graphics.beginFill("#8a898b").drawRoundRect(48,-8,52,12,4);
	cross_1.rotation = 42;

	let cross_2 = new createjs.Shape();
	cross_2.graphics.beginFill("#8a898b").drawRoundRect(-16,68,52,12,4);
	cross_2.rotation = -42;

	cross_1.scaleX = cross_1.scaleY = 0.9;
	cross_2.scaleX = cross_2.scaleY = 0.9;
	cross_1.x = cross_2.x = 6; //17;
	cross_1.y = cross_2.y = 10; //8 + 12;

	let clear_button_text = new createjs.Text(window.language.game_buttons.clearcaps, "bold 16px lato , helvetica", "#f7a5a8");
	// let c_button_text = new createjs.Text(window.language.game_buttons.confirmcaps,"16px latobold", "#fff");
	clear_button_text.textAlign = "center";
	clear_button_text.x = 57;
	clear_button_text.y = 62;

	clearButton.button_bg = clear_button;
	clearButton.cross_1 = cross_1;
	clearButton.cross_2 = cross_2;
	clearButton.clear_button_text = clear_button_text;
	clearButton.addChild(clear_button, cross_1, cross_2);

	clearButton.gotoAndStop = function (state) {
		switch(state) {
			case "disabled" :
				this.button_bg.graphics.clear().beginStroke("rgba(255,255,255,0.5)").beginFill("#282828").drawCircle(57,55,43);
				this.cross_1.graphics.clear().beginFill("#8a898b").drawRoundRect(48,-8,52,12,4);
				this.cross_2.graphics.clear().beginFill("#8a898b").drawRoundRect(-16,68,52,12,4);
				this.clear_button_text.color = "#797979";
				break;

			case "up" :
				this.button_bg.graphics.clear().beginLinearGradientFill(["#a22828","#cc282a","#a22828"],[0,0.5,1], 30,0,80,0,140,0).drawCircle(57,55,43);
				this.button_bg.shadow = new createjs.Shadow("rgba(0,0,0,0.5)",0,2,5)
				this.cross_1.graphics.clear().beginFill("#f7a5a8").drawRoundRect(48,-8,52,12,4);
				this.cross_2.graphics.clear().beginFill("#f7a5a8").drawRoundRect(-16,68,52,12,4);
				this.clear_button_text.color = "#f7a5a8";
				break;

			case "click" :
				this.button_bg.graphics.clear().beginFill("#812727").drawCircle(57,55,43);
				this.cross_1.graphics.clear().beginFill("#461b1b").drawRoundRect(48,-8,52,12,4);
				this.cross_2.graphics.clear().beginFill("#461b1b").drawRoundRect(-16,68,52,12,4);
				this.clear_button_text.color = "#461b1b";
				break;

			case "after_click" :
				this.button_bg.graphics.clear().beginLinearGradientFill(["#822727","#922a2a","#822727"],[0,0.5,1], 30,0,80,0,140,0).drawCircle(57,55,43);
				this.cross_1.graphics.clear().beginFill("#c68080").drawRoundRect(48,-8,52,12,4);
				this.cross_2.graphics.clear().beginFill("#c68080").drawRoundRect(-16,68,52,12,4);
				this.clear_button_text.color = "#461b1b";
				break;
		}
	}

	clearButton.children.forEach((e) => {
		e.table = true;
	});

	if(!state) {
		clearButton.gotoAndStop("disabled");
	} else {
		clearButton.gotoAndStop(state);
	}


	return clearButton;
}

repeatButton = repeatButton || function(state) {

	let repeatButton = new createjs.Container();

	let repeat_button = new createjs.Shape();
	repeat_button.graphics.beginStroke("rgba(255,255,255,0.5)").drawCircle(57,53,43);

	let repeat_icon = new createjs.Shape();
	repeat_icon.graphics.ss(6).beginStroke("#8a898b").drawRoundRect(38,28,40,26,8);

	let arrow = new createjs.Shape();
	arrow.graphics.beginFill("#8a898b").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
	arrow.x = 30
	arrow.y = 53
	arrow.scaleX = arrow.scaleY = .9

	let arrow_1 = new createjs.Shape();
	arrow_1.graphics.beginFill("#444345").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
	arrow_1.x = 26
	arrow_1.y = 51
	arrow_1.scaleX = arrow_1.scaleY = 1.1

	let arrow2 = new createjs.Shape();
	arrow2.graphics.beginFill("#8a898b").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
	arrow2.x = 86
	arrow2.y = 30
	arrow2.rotation = 180;
	arrow2.scaleX = arrow2.scaleY = .9

	let arrow2_1 = new createjs.Shape();
	arrow2_1.graphics.beginFill("#444345").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
	arrow2_1.x = 89
	arrow2_1.y = 33
	arrow2_1.rotation = 180;
	arrow2_1.scaleX = arrow2_1.scaleY = 1.1

	let arrow_container = new createjs.Container();
	arrow_container.addChild(repeat_icon, arrow_1, arrow, arrow2_1, arrow2);
	arrow_container.x = -2;
	// arrow_container.x = 16 -14;
	arrow_container.y = 8;
	arrow_container.scaleX = arrow_container.scaleY = 1;

	let repeat_button_text = new createjs.Text(window.language.game_buttons.repeatcaps, "bold 16px lato , helvetica", "#ffd086");
	repeat_button_text.textAlign = "center";
	repeat_button_text.x = 58;
	repeat_button_text.y = 60;

	repeatButton.addChild(repeat_button, arrow_container);
	repeatButton.button_bg = repeat_button;
	repeatButton.repeat_icon = repeat_icon;
	repeatButton.arrow = arrow;
	repeatButton.arrow_1 = arrow_1;
	repeatButton.arrow2 = arrow2;
	repeatButton.arrow2_1 = arrow2_1;
	repeatButton.repeat_button_text = repeat_button_text;

	repeatButton.gotoAndStop =  function (state) {
		switch(state) {
			case "disabled" :

				this.button_bg.graphics.clear().beginStroke("rgba(255,255,255,0.5)").beginFill("#282828").drawCircle(57,53,43);
				this.arrow_1.graphics.clear().beginFill("#282828").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
				this.arrow2_1.graphics.clear().beginFill("#282828").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
				this.arrow.graphics.clear().beginFill("#8a898b").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
				this.arrow2.graphics.clear().beginFill("#8a898b").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
				this.repeat_icon.graphics.clear().ss(6).beginStroke("#8a898b").drawRoundRect(38,28,40,26,8);
				this.repeat_button_text.color = "#797979";
				break;

			case "up" :
				this.button_bg.graphics.clear().beginLinearGradientFill(["#d28328","#ed9e22","#d28328"],[0,0.5,1], 30,0,80,0,140,0).drawCircle(57,53,43);
				this.button_bg.shadow = new createjs.Shadow("rgba(0,0,0,0.5)",0,2,5)
				this.arrow_1.graphics.clear().beginFill("#d28328").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
				this.arrow2_1.graphics.clear().beginFill("#d28328").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
				this.arrow.graphics.clear().beginFill("#ffd086").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
				this.arrow2.graphics.clear().beginFill("#ffd086").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
				this.repeat_icon.graphics.clear().ss(6).beginStroke("#ffd086").drawRoundRect(38,28,40,26,8);
				this.repeat_button_text.color = "#ffd086";
				break;

			case "click" :
				this.button_bg.graphics.clear().beginFill("#b16b29").drawCircle(57,53,43);
				this.arrow_1.graphics.clear().beginFill("#b16b29").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
				this.arrow2_1.graphics.clear().beginFill("#b16b29").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
				this.arrow.graphics.clear().beginFill("#5d3b15").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
				this.arrow2.graphics.clear().beginFill("#5d3b15").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
				this.repeat_icon.graphics.clear().ss(6).beginStroke("#5d3b15").drawRoundRect(38,28,40,26,8);
				this.repeat_button_text.color = "#5d3b15";
				break;

			case "after_click" :
				this.button_bg.graphics.clear().beginLinearGradientFill(["#a26b13","#c08000","#a26b13"],[0,0.5,1], 30,0,80,0,140,0).drawCircle(57,53,43);
				this.arrow_1.graphics.clear().beginFill("#a26b13").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
				this.arrow2_1.graphics.clear().beginFill("#a26b13").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
				this.arrow.graphics.clear().beginFill("#bfa680").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
				this.arrow2.graphics.clear().beginFill("#bfa680").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
				this.repeat_icon.graphics.clear().ss(6).beginStroke("#bfa680").drawRoundRect(38,28,40,26,8);
				this.repeat_button_text.color = "#5d3b15";
				break;
		}
	}

	repeatButton.children.forEach((e) => {
		e.table = true;
	});
	if(!state) {
		repeatButton.gotoAndStop("disabled");
	} else {
		repeatButton.gotoAndStop(state);
	}

	return repeatButton;

}

let initstance = {};

const initButton =  function () {
	// === gamebutton backgrounds init
		let buttton_sold_bg_1 = new createjs.Shape();
		buttton_sold_bg_1.graphics.beginFill("#2b2b2b").drawCircle(0,0,62);
		buttton_sold_bg_1.x  = -135 - (20+16);
		buttton_sold_bg_1.y  = 14 + 5;
		buttton_sold_bg_1.alpha = 0.5;
		buttton_sold_bg_1.table = true;
		// buttton_sold_bg_1.cache(-62,-62,124, 124)

		initstance.buttton_sold_bg_1 = buttton_sold_bg_1;

		let buttton_sold_bg_2 = new createjs.Shape();
		buttton_sold_bg_2.graphics.beginFill("#2b2b2b").drawCircle(0,0,62);
		buttton_sold_bg_2.y = 14+ 5;
		buttton_sold_bg_2.x = - (28+30)
		buttton_sold_bg_2.alpha = 0.5;
		buttton_sold_bg_2.table = true;
		// buttton_sold_bg_2.cache(-74,-74,148, 148)

		initstance.buttton_sold_bg_2 = buttton_sold_bg_2;

		let buttton_sold_bg_3 = new createjs.Shape();
		buttton_sold_bg_3.graphics.beginFill("#2b2b2b").drawCircle(0,0,62);
		buttton_sold_bg_3.y = 14+ 5;
		buttton_sold_bg_3.x = 135 - (34+44);
		buttton_sold_bg_3.alpha = 0.5;
		buttton_sold_bg_3.table = true;
		// buttton_sold_bg_3.cache(-62,-62,124, 124)
		initstance.buttton_sold_bg_3 = buttton_sold_bg_3;

		// === gamebutton gradient backgrounds init
		let gradient_background_1 = new createjs.Shape();
		gradient_background_1.graphics.ss(1.5).beginLinearGradientStroke(["#4c4b4d","#848484"], [0, 1], 0, 5, 0, 30).beginLinearGradientFill(["#434244","#696a6d"], [0, 1], 0, 0, 0, 62).drawCircle(0,2,50);
		initstance.gradient_background_1 = gradient_background_1;
		initstance.gradient_background_1.y = 30;//12+ 5
		initstance.gradient_background_1.x = -82; //- (28+30)
		initstance.gradient_background_1.table = true;
		// gradient_background_1.cache(-64,-62,130, 130);

		let gradient_background_2 = new createjs.Shape();
		gradient_background_2.graphics.ss(1.5).beginLinearGradientStroke(["#4c4b4d","#848484"], [0, 1], 0, 5, 0, 30).beginLinearGradientFill(["#434244","#696a6d"], [0, 1], 0, 0, 0, 62).drawCircle(0,2,50);
		gradient_background_2.x = -177; //-135- (20+16);
		gradient_background_2.y = 30; //12+ 5;
		gradient_background_2.table = true;
		// gradient_background_2.cache(-52,-52,105,105)
		initstance.gradient_background_2 = gradient_background_2;

		let gradient_background_3 = new createjs.Shape();
		gradient_background_3.graphics.ss(1.5).beginLinearGradientStroke(["#4c4b4d","#848484"], [0, 1], 0, 5, 0, 30).beginLinearGradientFill(["#434244","#696a6d"], [0, 1], 0, 0, 0, 62).drawCircle(0,2,50);
		gradient_background_3.x = 16; //135 - (34+44);
		gradient_background_3.y = 29; //12+ 5;
		gradient_background_3.table = true;
		// gradient_background_3.cache(-52,-52,105,105)
		initstance.gradient_background_3 = gradient_background_3;
		
		initstance.buttton_sold_bg_1.set({scaleY : 0.8, scaleX : 0.8});
		initstance.buttton_sold_bg_2.set({scaleY : 0.8, scaleX : 0.8});
		initstance.buttton_sold_bg_3.set({scaleY : 0.8, scaleX : 0.8});

		initstance.gradient_background_1.set({scaleY : 0.8, scaleX : 0.8});
		initstance.gradient_background_2.set({scaleY : 0.8, scaleX : 0.8});
		initstance.gradient_background_3.set({scaleY : 0.8, scaleX : 0.8});
		return initstance;
}


export default {
  confirmButton,
  clearButton,
  repeatButton,
  initButton
}

