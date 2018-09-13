let instance = null;

export default() => {
	instance = instance || new blu.Component({
		gold_instance : null,
		main() {

			this.x  = this.context.stage.baseWidth/2;
			this.y  = this.context.stage.baseHeight/2 - 160;

			this.gold_instance =  new createjs.Shape();
			this.gold_instance.graphics.beginLinearGradientFill(["transparent","#d8bd69","transparent"], [0, 0.5, 1], -65, 65,this.context.stage.baseWidth- 100, 0).drawRect(0, 0, this.context.stage.baseWidth, 80);
			this.gold_instance.setBounds(0, 0, this.context.stage.baseWidth, 80)
			this.gold_instance.regX = this.gold_instance.getBounds().width / 2;
			this.gold_instance.scaleX = 0;
			this.addChild(this.gold_instance);

			this.message_text = new createjs.Text("","50px lato-black","#2d2d2d");
			this.message_text.textAlign = "center";
			// this.message_text.textBaseline = "middle";
			this.message_text.scaleX = 0;
			this.addChild(this.message_text);

		},
		/**
		----------------------------------------
		call function to set message on gold bar
		----------------------------------------
		**/
		setMessage(text,hide) {
			this.message_text.text = text.toUpperCase();
	      	this.gold_instance.scaleY = this.message_text.getMetrics().lines.length;
	      	this.message_text.alpha = 1;
	      	this.message_text.regY = this.message_text.getMetrics().height / 2;
	      	this.message_text.y = this.gold_instance.getTransformedBounds().height / 2;

	      	if(this.message_text.getMetrics().width >= 950) {
	        	this.message_text.font = "42px lato-black"
	      	}

			createjs.Tween.get(this.gold_instance, {override: true})
		        // .wait(1000)
		        .to({
		          	scaleX: 1
	       	 	}, 100, createjs.Ease.linear);


		    createjs.Tween.get(this.message_text, {override: true})
		        // .wait(1000)
		        .to({
		          	scaleX: 1
		        }, 100, createjs.Ease.linear);


				if(parseInt(hide)) {
					setTimeout(() => {
						createjs.Tween.get(this.gold_instance, {override: true})
							.call(()=>{
								this.message_text.alpha = 0;
					            this.message_text.scaleX = 0;
					            this.gold_instance.scaleY = 1;
			            		this.message_text.font = "50px lato-black";
							})
					.to({
						scaleX: 0
					},250,createjs.Ease.linear);
				},2000)
			}
		}
	});

	return instance;
}
