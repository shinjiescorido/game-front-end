let instance = null;

let something = [100,200,200,200];

export default( ()=>{

	instance = instance || new blu.Component({
		arr: [],
		main() {
			// var button = [];
			// for(var x = 0; x < something.length; x++) {

			// 	button[x] = new createjs.Shape();
			// 	button[x].graphics.beginFill("#2b2b2b").drawRoundRect(0, 0, 300, 40, 18);
			// 	button[0].graphics.ss(3).beginLinearGradientStroke(["transparent","#ffefc8"], [0, 1], 0, 55, 0, 0).beginLinearGradientFill(["#ffbf2b","#ffd87c"], [0, 1], 0, 55, 0, 0).drawRoundRect(0, 0, 300, 40, 18);
			// 	button[x].setBounds(0,0,300,40);

			// 	button[x].blur_bg = new createjs.Shape();
			// 	button[x].blur_bg.graphics.beginFill("#000").drawRoundRect(0, 3, button[x].getBounds().width, button[x].getBounds().height, 18);
			// 	button[x].blur_bg.shadow = new createjs.Shadow("#000000", 0, 3, 5);
			// 	button[x].blur_bg.alpha = 0.5;

			// 	this.addChild(button[x].blur_bg);

			// 	button[x].y = button[x].blur_bg.y = x*(button[x].getBounds().height+ 15) ;

			// 	button[x].shape_to_animate = new createjs.Shape();
			// 	button[x].shape_to_animate.graphics.beginLinearGradientFill(["#ffc723","#fff2c2","#ffe8a4"], [0, 0.5, 1], 40, 0, 60, 0, 60, 0).drawRect(0,0,70,40);
			// 	button[x].shape_to_animate.setBounds(0,0,70,40);
			// 	button[x].shape_to_animate.shadow = new createjs.Shadow("#ffe88f",0,0,10);

			// 	button[x].shape_to_animate.y = -15 + button[x].y;
			// 	button[x].shape_to_animate.x = -15;
			// 	button[x].shape_to_animate.rotation = 180;
			// 	button[x].shape_to_animate.regX = button[x].shape_to_animate.getBounds().width/2;
			// 	button[x].shape_to_animate.regY = button[x].shape_to_animate.getBounds().height/2;
			// 	button[x].shape_to_animate.alpha = 0;
			// 	this.addChild(button[x].shape_to_animate);

			// 	button[x].button_mask = new createjs.Shape();
			// 	button[x].button_mask.graphics.beginFill("#fff").drawRoundRect(-3,-3,button[x].getBounds().width+6,button[x].getBounds().height+6,20);
			// 	button[x].button_mask.y = button[x].y;

			// 	button[x].shape_to_animate.mask = button[x].button_mask;

			// 	button[x].hover = function(obj) {
			// 		obj.shape_to_animate.alpha = 1
			// 		createjs.Tween.get(obj.shape_to_animate,{loop:true})
			// 		.to({
			// 			y: (obj.getBounds().height-55) + obj.y,
			// 			x:obj.getBounds().width + 15
			// 		},800)
			// 		.call((obj)=>{
			// 			obj.rotation = 270
			// 		},[obj.shape_to_animate])
			// 		.to({
			// 			y: (obj.getBounds().height+15) + obj.y,
			// 		},400)
			// 		.call((obj)=>{
			// 			obj.rotation = 360
			// 		},[obj.shape_to_animate])
			// 		.to({
			// 			y: (obj.getBounds().height+15) + obj.y,
			// 			x: -15,
			// 		},800)
			// 		.call((obj)=>{
			// 			obj.rotation = 90
			// 		},[obj.shape_to_animate])
			// 		.to({
			// 			y:(obj.getBounds().height-55) + obj.y
			// 		},400)
			// 		.call((obj)=>{
			// 			obj.rotation = 180
			// 		},[obj.shape_to_animate])
			// 	}

			// 	button[0].hover(button[0])

			// 	button[x].on('mouseover',(e) => {
			// 		e.target.hover(e.target);
			// 		e.target.graphics.clear().ss(3).beginLinearGradientStroke(["transparent","#ffefc8"], [0, 1], 0, 55, 0, 0).beginLinearGradientFill(["#ffbf2b","#ffd87c"], [0, 1], 0, 55, 0, 0).drawRoundRect(0, 0, 300, 40, 18);
			// 	})

			// 	button[x].on('mouseout',(e) => {
			// 		e.target.shape_to_animate.alpha = 0;
			// 		e.target.graphics.clear().beginFill("#2b2b2b").drawRoundRect(0, 0, 300, 40, 18);
			// 	});

			// 	button[x].on('click',(e) => {
			// 		e.target.graphics.clear().ss(3)	.beginLinearGradientStroke(["#ffefc8","transparent"], [0, 1], 0, 55, 0, 0).beginLinearGradientFill(["#ffd87c","#ffbf2b"], [0, 1], 0, 55, 0, 0).drawRoundRect(0, 0, 300, 40, 18);
			// 	})

				// this.addChild(button[x]);
			// }

			this.x = 100;
			this.y = 100;

			this.makeAnother();
		},
		makeAnother() {

			var shape = new createjs.Shape();
			shape.graphics.beginFill("yellow").drawRoundRect(0,0,200,30,10).ss(5).beginStroke("red")
			// .moveTo(0,0).lineTo(180,0).bezierCurveTo(0,10,40,30,50,0);

			shape.x = 100;
			shape.y = 100;

			var cmd1 = shape.graphics.moveTo(0,0).command;
			var cmd = shape.graphics.lineTo(40,0).command;
			var bez = shape.graphics.bezierCurveTo(200,0,0,0,0,0).command;


			createjs.Tween.get(cmd)
			.to({
				x: 180
			},1000)

			// createjs.Tween.get(cmd1)
			// .to({
			// 	x: 100
			// },3000)

			createjs.Tween.get(bez)
			.wait(3000)
			.to({
				cp1x: 220
			},1000)
			.to({
				cp1y:0,
				cp2x:200,
				x : 180,
				cp2y:35
			},1000)
			.to({
				x : 180,
				y: 30
			},1000)

			var cmda = shape.graphics.lineTo(0,0).command;

			createjs.Tween.get(cmda)
			.wait(6000)
			.to({
				x: 0
			},1000)

			this.addChild(shape);

		}

	});

	return instance;
});
