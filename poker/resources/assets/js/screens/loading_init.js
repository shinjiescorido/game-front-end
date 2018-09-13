export default(self) => {

	self.loading_container = new createjs.Container();

	let bg = new createjs.Shape();
	bg.graphics.beginFill("#000").drawRect( (self.context.stage.baseWidth/2* -1), (self.context.stage.baseHeight/2 + 200) * -1,self.context.width,self.context.height);
	self.loading_container.addChild(bg);

	var img = new Image();
	img.src  = "/img/loading/sprites.png";
	var spade_sprite = {
		images : [img],
		frames : {width:30, height:30},
		animations: {
			"spade-grey" : [0],
			"spade-gold" : [1],	
			"clover-grey" : [2],
			"clover-gold" : [3],
			"diamond-grey" : [4],
			"diamond-gold" : [5],
			"heart-grey" : [6],
			"heart-gold" : [7]
		}
	}
	var spriteSheet = new createjs.SpriteSheet(spade_sprite);

	/**masking for loading bar**/
	let shapeMask = new createjs.Shape();
	shapeMask.graphics.ss(1).beginStroke("red");
	shapeMask.x = -224;
	shapeMask.graphics.moveTo(0,0);
	shapeMask.graphics.lineTo(50,0);
	shapeMask.graphics.lineTo(56,18);
	shapeMask.graphics.lineTo(56,30);

	shapeMask.graphics.lineTo(138,30);
	shapeMask.graphics.lineTo(130,20);
	shapeMask.graphics.lineTo(132,15);

	shapeMask.graphics.lineTo(145,0);
	shapeMask.graphics.lineTo(156,18);
	shapeMask.graphics.lineTo(148,30);
	shapeMask.graphics.lineTo(236,30);
	shapeMask.graphics.lineTo(224,15);
	shapeMask.graphics.lineTo(224,0);
	shapeMask.graphics.lineTo(260,0);

	shapeMask.graphics.lineTo(260,15);
	shapeMask.graphics.lineTo(250,28);
	shapeMask.graphics.lineTo(325,28);
	shapeMask.graphics.lineTo(325,-10);
	shapeMask.graphics.lineTo(0,-10);
	shapeMask.graphics.endStroke(0,0);

	//grey loading bar
	self.grey_loading = new createjs.Shape();
	self.grey_loading.graphics.beginFill("#2d2d2d").drawRect(0,0,320,3);
	self.grey_loading.setBounds(0,0,320,5);
	self.grey_loading.x = -190;
	self.grey_loading.y = 16;
	self.grey_loading.mask = shapeMask;
	self.loading_container.addChild(self.grey_loading);
	//gold loadiung
	self.gold_loading = new createjs.Shape();
	self.gold_loading.graphics.beginFill("#e0b226").drawRect(0,0,320,3);
	self.gold_loading.x = self.grey_loading.x
	self.gold_loading.y = self.grey_loading.y;
	self.gold_loading.scaleX = 0
	self.gold_loading.mask = shapeMask;
	self.loading_container.addChild(self.gold_loading);

	self.stage.addChild(self.loading_container)
	
	/** spades **/	
	self.spade_image = new createjs.Sprite(spriteSheet,"spade-grey");
	self.spade_image.x = -200;
	self.spade_image.scaleX = self.spade_image.scaleY = 1.2
	/** clover **/	
	self.clover_image = new createjs.Sprite(spriteSheet,"clover-grey");
	self.clover_image.x = 100;
	self.clover_image.shadow =  new createjs.Shadow("#e0b226",0,0,0)
	self.clover_image.scaleX = self.clover_image.scaleY = 1.2
	/** diamond **/	
	self.dimanond_image = new createjs.Sprite(spriteSheet,"diamond-grey");
	self.dimanond_image.scaleX = self.dimanond_image.scaleY = 1.2
	self.dimanond_image.x = -100
	/** heart **/	
	self.heart_image = new createjs.Sprite(spriteSheet,"heart-grey");
	self.heart_image.scaleX = self.heart_image.scaleY = 1.2

	self.loading_container.addChild(self.spade_image, self.clover_image, self.dimanond_image, self.heart_image);
	self.loading_container.x = self.context.stage.baseWidth/2;
	self.loading_container.y = self.context.stage.baseHeight/2 + 200;

	self.stage.addChild(self.loading_container);

	self.loading_chip_container = new createjs.Container();
	self.stage.addChild(self.loading_chip_container);


	let grey_bg = new createjs.Shape();
	grey_bg.graphics.beginFill("#2f2f2f").drawCircle(0,0,100);
	grey_bg.x = (self.stage.baseWidth/2) - 32;
	grey_bg.y = (self.stage.baseHeight/2) + 4;

	self.loading_chip_container.addChild(grey_bg);

	self.loadingText = new createjs.Text("0%", "60px arial", "#fccd40");
	self.loadingText.textBaseline = "bottom";
	self.loadingText.textAlign = "center";
	self.loadingText.x = (self.stage.baseWidth/2) - 28;
	self.loadingText.y = (self.stage.baseHeight/2) + 36;
	self.loading_chip_container.addChild(self.loadingText)

	let gold_load = new Image();
	gold_load.src  = "/img/loading/yellow_loading.png";
	self.gold_circle = new createjs.Bitmap();
	self.gold_circle.image = gold_load;

	self.gold_circle.regX = 280/2;
	self.gold_circle.regY = 280/2;
	self.gold_circle.scaleX = self.gold_circle.scaleY = 1.2;
	self.gold_circle.x = self.context.stage.baseWidth/2 - 30;
	self.gold_circle.y = self.context.stage.baseHeight/2;

	self.loading_chip_container.addChild(self.gold_circle);

	let red_load = new Image();
	red_load.src = "/img/loading/red_loading.png";
	self.dashed_red_circle = new createjs.Bitmap();
	self.dashed_red_circle.image = red_load;
	self.dashed_red_circle.x = (self.stage.baseWidth/2) - 30;
	self.dashed_red_circle.y = (self.stage.baseHeight/2);
	self.dashed_red_circle.regX = 253/2;
	self.dashed_red_circle.regY = 246/2;
	self.dashed_red_circle.scaleX = self.dashed_red_circle.scaleY = 1.2;
	self.loading_chip_container.addChild(self.dashed_red_circle);

	self.circle_grey = new createjs.Shape();
	self.circle_red = new createjs.Shape();

	self.circle_grey.graphics.ss(1).beginStroke("#2e2e2e").drawCircle(125/2,125/2,125);
	self.circle_grey.regX = 125/2;
	self.circle_grey.regY = 125/2;
	self.circle_grey.x = (self.stage.baseWidth/2) - 32;
	self.circle_grey.y = (self.stage.baseHeight/2) + 4;

	self.circle_red.graphics.ss(1).beginStroke("#b62320").drawCircle(120/2,120/2,120);
	self.circle_red.regX = 120/2;
	self.circle_red.regY = 120/2;
	self.circle_red.x = (self.stage.baseWidth/2) - 30;
	self.circle_red.y = (self.stage.baseHeight/2) + 4;

	self.loading_chip_container.addChild(self.circle_grey,self.circle_red);

}