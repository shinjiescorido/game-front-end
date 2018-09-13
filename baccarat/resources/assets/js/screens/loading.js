export default(e,self) => {

	self.loadingText.text = "" + Math.round((e * 100)) + "%";
	$(".card--percent").html("" + Math.round((e * 100)) + "%")
	$(".black").hide()

	if(e)  {
		self.spade_image.gotoAndPlay("spade-gold");
	}
	if(e > 1/3.5) {
		self.dimanond_image.gotoAndPlay("diamond-gold");
	}

	if(e > 1/1.5) {
		self.heart_image.gotoAndPlay("heart-gold");
	}

	if(e == 1) {
		self.clover_image.gotoAndPlay("clover-gold");
	}

	self.gold_loading.scaleX = e;

	createjs.Tween.get(self.gold_circle,{loop:true})
	.to({
		rotation: 360
	},800, createjs.Ease.linear);


	createjs.Tween.get(self.dashed_red_circle,{loop:true})
	.to({
		rotation: -360
	},2000, createjs.Ease.linear);


	createjs.Tween.get(self.circle_red,{loop:true})
	.to({
		scaleX: 0.95,
		scaleY: 0.95
	},400, createjs.Ease.backOut)
	.to({
		scaleX: 1,
		scaleY: 1
	},400, createjs.Ease.backIn)

	createjs.Tween.get(self.circle_grey,{loop:true})
	.to({
		scaleX: 1,
		scaleY: 1
	},400, createjs.Ease.backOut)
	.to({
		scaleX: 0.95,
		scaleY: 0.95
	},400, createjs.Ease.backIn)
}