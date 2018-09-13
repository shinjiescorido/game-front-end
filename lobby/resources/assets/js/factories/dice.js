class dice {
	constructor(value, width, height, bgColor = '#fff', circleColor = '#231f20') {
		this.circleRadius = Math.round((width/9) * 100) / 100;
		this.padding = this.circleRadius / 2;
		this.thirdVal = width / 3;

		this.diceCon = new createjs.Container();

		this.diceBg = new createjs.Shape();
		this.diceBg.graphics.ss(.8).s('#787878').beginFill(bgColor).drawRoundRect(0, 0, width, height, this.circleRadius);
		this.diceBg.setBounds(0, 0, width, height);
		this.diceCon.addChild(this.diceBg);

		// Circle coordinates
		this.firstColX = this.diceBg.x + (this.thirdVal / 2) + this.padding;
		this.thirdColX = this.diceBg.x + this.diceBg.getBounds().width - ((this.thirdVal / 2) + this.padding);

		this.secondRowY = this.diceBg.y + this.thirdVal + (this.thirdVal / 2);

		this.firstRowY = this.diceBg.y + (this.thirdVal / 2) + this.padding;
		this.thirdRowY = this.diceBg.y + this.diceBg.getBounds().height - ((this.thirdVal / 2) + this.padding);

		switch(parseInt(value)) {
			case (1):
				this.setDiceOne();
				break;

			case (2):
				this.setDiceTwo(circleColor);
				break;

			case (3):
				this.setDiceThree(circleColor);
				break;

			case (4):
				this.setDiceFour(circleColor);
				break;

			case (5):
				this.setDiceFive(circleColor);
				break;

			case (6):
				this.setDiceSix(circleColor);
				break;
		} //end switch
	}

	setDiceOne() {
		let circle1 = new createjs.Shape();
		circle1.graphics.beginFill('#a11e2c').drawCircle(0, 0, this.circleRadius);
		circle1.x = this.diceBg.x + this.diceBg.getBounds().width / 2;
		circle1.y = this.diceBg.y + this.diceBg.getBounds().height / 2;
		this.diceCon.addChild(circle1);
	}

	setDiceTwo(color = '#231f20') {
		let circle1 = new createjs.Shape();
		circle1.graphics.beginFill(color).drawCircle(0, 0, this.circleRadius);
		circle1.x = this.firstColX;
		circle1.y = this.firstRowY;
		this.diceCon.addChild(circle1);

		let circle2 = new createjs.Shape();
		circle2.graphics.beginFill(color).drawCircle(0, 0, this.circleRadius);
		circle2.x = this.thirdColX;
		circle2.y = this.thirdRowY;
		this.diceCon.addChild(circle2);
	}

	setDiceThree(color = '#231f20') {
		let circle1 = new createjs.Shape();
		circle1.graphics.beginFill(color).drawCircle(0, 0, this.circleRadius);
		circle1.x = this.firstColX;
		circle1.y = this.firstRowY;
		this.diceCon.addChild(circle1);

		let circle2 = new createjs.Shape();
		circle2.graphics.beginFill(color).drawCircle(0, 0, this.circleRadius);
		circle2.x = this.diceBg.x + this.diceBg.getBounds().width / 2;
		circle2.y = this.diceBg.y + this.diceBg.getBounds().height / 2;
		this.diceCon.addChild(circle2);

		let circle3 = new createjs.Shape();
		circle3.graphics.beginFill(color).drawCircle(0, 0, this.circleRadius);
		circle3.x = this.thirdColX;
		circle3.y = this.thirdRowY;
		this.diceCon.addChild(circle3);
	}

	setDiceFour(color = '#231f20') {
		let circle1 = new createjs.Shape();
		circle1.graphics.beginFill(color).drawCircle(0, 0, this.circleRadius);
		circle1.x = this.firstColX;
		circle1.y = this.firstRowY;
		this.diceCon.addChild(circle1);

		let circle2 = new createjs.Shape();
		circle2.graphics.beginFill(color).drawCircle(0, 0, this.circleRadius);
		circle2.x = this.thirdColX;
		circle2.y = this.firstRowY;
		this.diceCon.addChild(circle2);

		let circle3 = new createjs.Shape();
		circle3.graphics.beginFill(color).drawCircle(0, 0, this.circleRadius);
		circle3.x = this.firstColX;
		circle3.y = this.thirdRowY;
		this.diceCon.addChild(circle3);

		let circle4 = new createjs.Shape();
		circle4.graphics.beginFill(color).drawCircle(0, 0, this.circleRadius);
		circle4.x = this.thirdColX;
		circle4.y = this.thirdRowY;
		this.diceCon.addChild(circle4);
	}

	setDiceFive(color = '#231f20') {
		let circle1 = new createjs.Shape();
		circle1.graphics.beginFill(color).drawCircle(0, 0, this.circleRadius);
		circle1.x = this.firstColX;
		circle1.y = this.firstRowY;
		this.diceCon.addChild(circle1);

		let circle2 = new createjs.Shape();
		circle2.graphics.beginFill(color).drawCircle(0, 0, this.circleRadius);
		circle2.x = this.thirdColX;
		circle2.y = this.firstRowY;
		this.diceCon.addChild(circle2);

		let circle3 = new createjs.Shape();
		circle3.graphics.beginFill(color).drawCircle(0, 0, this.circleRadius);
		circle3.x = this.diceBg.x + this.diceBg.getBounds().width / 2;
		circle3.y = this.diceBg.y + this.diceBg.getBounds().height / 2;
		this.diceCon.addChild(circle3);

		let circle4 = new createjs.Shape();
		circle4.graphics.beginFill(color).drawCircle(0, 0, this.circleRadius);
		circle4.x = this.firstColX;
		circle4.y = this.thirdRowY;
		this.diceCon.addChild(circle4);

		let circle5 = new createjs.Shape();
		circle5.graphics.beginFill(color).drawCircle(0, 0, this.circleRadius);
		circle5.x = this.thirdColX;
		circle5.y = this.thirdRowY;
		this.diceCon.addChild(circle5);
	}

	setDiceSix(color = '#231f20') {
		let circle1 = new createjs.Shape();
		circle1.graphics.beginFill('#231f20').drawCircle(0, 0, this.circleRadius);
		circle1.x = this.firstColX;
		circle1.y = this.firstRowY;
		this.diceCon.addChild(circle1);

		let circle2 = new createjs.Shape();
		circle2.graphics.beginFill('#231f20').drawCircle(0, 0, this.circleRadius);
		circle2.x = this.thirdColX;
		circle2.y = this.firstRowY;
		this.diceCon.addChild(circle2);

		let circle3 = new createjs.Shape();
		circle3.graphics.beginFill('#231f20').drawCircle(0, 0, this.circleRadius);
		circle3.x = this.firstColX;
		circle3.y = this.secondRowY;
		this.diceCon.addChild(circle3);

		let circle4 = new createjs.Shape();
		circle4.graphics.beginFill('#231f20').drawCircle(0, 0, this.circleRadius);
		circle4.x = this.thirdColX;
		circle4.y = this.secondRowY;
		this.diceCon.addChild(circle4);

		let circle5 = new createjs.Shape();
		circle5.graphics.beginFill('#231f20').drawCircle(0, 0, this.circleRadius);
		circle5.x = this.firstColX;
		circle5.y = this.thirdRowY;
		this.diceCon.addChild(circle5);

		let circle6 = new createjs.Shape();
		circle6.graphics.beginFill('#231f20').drawCircle(0, 0, this.circleRadius);
		circle6.x = this.thirdColX;
		circle6.y = this.thirdRowY;
		this.diceCon.addChild(circle6);
	}
}

export default {
	dice
}
