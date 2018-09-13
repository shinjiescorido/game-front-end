import fnFormat from '../../../factories/formatter';
import {  createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap} from '../../../factories/factories';
import {scoreboard as sboard} from '../../../factories/scoreboard_draw';
// let drawSboard  = sboard();

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {

			let row = 6;
			let col = 9;
			this.y = this.context.context.height - 150;

			let rm_bg = new createjs.Shape();
			rm_bg.graphics.beginFill("#fff").drawRect(0,0,580,180);
			this.addChild(rm_bg);

			let lines = new createjs.Shape();
			lines.graphics.ss(.8).s("rgba(0,0,0,0.8)").moveTo(0,25.1)
			this.addChild(lines);

			let border_line = new createjs.Shape();
			border_line.graphics.ss(1).s("#000");
			this.addChild(border_line);

			border_line.graphics.moveTo(25.1*col, 0).lineTo(25.1*col, 25.1*row);
			border_line.graphics.moveTo((25.1*col), (25.1*row)/2).lineTo((25.1*col)+325, (25.1*row)/2)
			border_line.graphics.moveTo((25.1*col), 75.3).lineTo((25.1*col)+325, 75.3)
			border_line.graphics.moveTo((25.1*col), 75.3+(75.3/2)).lineTo((25.1*col)+325, 75.3+(75.3/2))
			border_line.graphics.moveTo((25.1*col) +162.5 - 12.5, 75.3+(75.3/2)).lineTo((25.1*col)+162.5 - 12.5,  (75.3*2))

			//pearl
			for(var i = 0; i <= row; i++) {
				lines.graphics.moveTo(0,25.1*i).lineTo(225.9,25.1*i)
			} // end for

			lines.graphics.moveTo(25.1,0);
			for(var x = 0; x <= col; x++) {
				lines.graphics.moveTo(25.1*x,0).lineTo(25.1*x,150.6)
			}

			col = 26;
			row = 12

			lines.graphics.moveTo(348,16)
			for(var i = 0; i <= row ; i++) {
				lines.graphics.moveTo(225.9,12.5*i).lineTo(580,12.5*i)
			}

			lines.graphics.moveTo(225.9,0)
			for(var x = 0; x <= col ; x++) {
				lines.graphics.moveTo(225.9 + (x*12.5),0).lineTo(225.9 + (x*12.5),300)
			}

			// == pearl road cells
			// for(var x = 0; x < row; x++) {
			// 	for(var i = 0; i < col; i++) {
			// 		let cell = new createjs.Shape();
			// 		cell.graphics.ss(1).s("rgba(0,0,0,0.4)").beginFill("#fff").drawRect(0,0,25,25);
			// 		cell.x = i*25;
			// 		cell.y = x*25;
			// 		this.addChild(cell);
			// 	} // end for
			// } // end for

			// col = 24;
			// // == big road cells
			// for(var x = 0; x < row; x++) {
			// 	for(var i = 0; i < col; i++) {
			// 		let cell = new createjs.Shape();
			// 		cell.graphics.ss(1).s("rgba(0,0,0,0.4)").beginFill("#fff").drawRect(0,0,12.5,12.5);
			// 		cell.x = (i*12.5) + 226;
			// 		cell.y = x*12.5;
			// 		this.addChild(cell);
			// 	} // end for
			// } // end for

			// col = 24;
			// row = 3;
			// for(var x = 0; x < row; x++) {
			// 	for(var i = 0; i < col; i++) {
			// 		let cell = new createjs.Shape();
			// 		cell.graphics.ss(1).s("rgba(0,0,0,0.4)").beginFill("#fff").drawRect(0,0,12.5,12.5);
			// 		cell.x = (i*12.5) + 226;
			// 		cell.y = (x*12.5) + 75;
			// 		this.addChild(cell);
			// 	} // end for
			// } // end for

			// col = (24/2);
			// for(var x = 0; x < row; x++) {
			// 	for(var i = 0; i < col; i++) {
			// 		let cell = new createjs.Shape();
			// 		cell.graphics.ss(1).s("rgba(0,0,0,0.4)").beginFill("#fff").drawRect(0,0,12.5,12.5);
			// 		cell.x = (i*12.5) + 226;
			// 		cell.y = (x*12.5) + (75 + 36);
			// 		this.addChild(cell);
			// 	} // end for
			// } // end for

			// for(var x = 0; x < row; x++) {
			// 	for(var i = 0; i < col; i++) {
			// 		let cell = new createjs.Shape();
			// 		cell.graphics.ss(1).s("rgba(0,0,0,0.4)").beginFill("#fff").drawRect(0,0,12.5,12.5);
			// 		cell.x = (i*12.5) + 226 + 150;
			// 		cell.y = (x*12.5) + (75 + 36);
			// 		this.addChild(cell);
			// 	} // end for
			// } // end for

			// let row_line = new createjs.Shape();
			// row_line.graphics.ss(1).s("#000").moveTo(226,75).lineTo(524,75);
			// this.addChild(row_line);

			// let row_line2 = new createjs.Shape();
			// row_line2.graphics.ss(1).s("#000").moveTo(226,(75 + 36)).lineTo(524,(75 + 36));
			// this.addChild(row_line2);

			// let row_line3 = new createjs.Shape();
			// row_line3.graphics.ss(1).s("#000").moveTo(226 + 150,(75 + 36)).lineTo(226+150,(75 + 36) + 100);
			// this.addChild(row_line3);

			let prediction_bg = new createjs.Shape();
			prediction_bg.graphics.ss(1).s("rgba(0,0,0,0.5)").beginFill("#fff").drawRect(0,0,40,150);
			prediction_bg.x = 526;
			prediction_bg.prediction = true
			this.addChild(prediction_bg);


			this.player_prediction_clicked = false;

			prediction_bg.addEventListener("click", () => {
				if(this.player_prediction_clicked) return
				this.player_prediction_clicked = true
				this.predictMarks("d")
			});


			let prediction_bg2 = new createjs.Shape();
			prediction_bg2.graphics.ss(1).s("rgba(0,0,0,0.5)").beginFill("#fff").drawRect(0,0,40,150);
			prediction_bg2.x = 526 + 40;
			prediction_bg2.prediction = true
			this.addChild(prediction_bg2);

			let showcount_bg = new createjs.Shape();
			showcount_bg.graphics.ss(1).s("rgba(255,255,255,0.3)").beginFill("#2b2b2b").drawRect(.5,0,80,45);
			showcount_bg.x = 525;
			showcount_bg.y = 105;
			this.addChild(showcount_bg);

			this.shoe_counter = new createjs.Text("0","30px bebas-regular",'#fff');
			this.shoe_counter.x = showcount_bg.x + 40;
			this.shoe_counter.y = showcount_bg.y + 5;
			this.shoe_counter.textAlign = "center";
			this.addChild(this.shoe_counter);

			this.banker_prediction_clicked = false;

			prediction_bg2.addEventListener("click", () => {
				if(this.banker_prediction_clicked) return
				this.banker_prediction_clicked = true
				this.predictMarks("z")
			});

			let player_prediction = new createjs.Shape();
			player_prediction.x = prediction_bg.x + 20;
			player_prediction.y = prediction_bg.y + 12.7;
			player_prediction.graphics.beginFill("#1565c0").drawCircle(0,0,11);
			player_prediction.hitArea = prediction_bg
			this.addChild(player_prediction);
			// ==
			let p_text = createSpriteRoadMap(this.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, p_text);
			p_text.x = player_prediction.x - 12;
			p_text.y = player_prediction.y + 5 - 17;
			p_text.scaleX = p_text.scaleY= 0.6;
			p_text.gotoAndStop(43);
			this.addChild(p_text);

			this.player_prediction1 = new createjs.Shape();
			this.player_prediction1.x = prediction_bg.x + 20;
			this.player_prediction1.y = prediction_bg.y + 42;
			this.player_prediction1.graphics.ss(3).s("#fff").drawCircle(0,0,8);
			this.player_prediction1.hitArea = prediction_bg
			this.addChild(this.player_prediction1);

			this.player_prediction2 = new createjs.Shape();
			this.player_prediction2.x = prediction_bg.x + 20;
			this.player_prediction2.y = prediction_bg.y + 66;
			this.player_prediction2.graphics.beginFill("#fff").drawCircle(0,0,9);
			this.player_prediction2.hitArea = prediction_bg
			this.addChild(this.player_prediction2);

			this.player_prediction3 = new createjs.Shape();
			this.player_prediction3.x = prediction_bg.x + 25;
			this.player_prediction3.y = prediction_bg.y + 80;
			this.player_prediction3.rotation = 45
			this.player_prediction3.graphics.beginFill("#fff").drawRoundRect(0,0,5,20,2);
			this.player_prediction3.hitArea = prediction_bg
			this.addChild(this.player_prediction3);

			let banker_prediction = new createjs.Shape();
			banker_prediction.x = prediction_bg2.x + 20;
			banker_prediction.y = prediction_bg2.y + 12.7;
			banker_prediction.hitArea = prediction_bg2;
			banker_prediction.graphics.beginFill("#d33030").drawCircle(0,0,11);
			this.addChild(banker_prediction);
			// ==
			let b_text = createSpriteRoadMap(this.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, b_text);
			b_text.x = banker_prediction.x - 12;
			b_text.y = banker_prediction.y + 5 - 17;
			b_text.scaleX = b_text.scaleY= 0.6;
			b_text.gotoAndStop(44);
			this.addChild(b_text);
			///
			let line = new createjs.Shape();
			line.graphics.ss(1).s("#757575").moveTo(0,0).lineTo(80, 0);
			line.x= banker_prediction.x - 60
			line.y= banker_prediction.y + 12.3
			this.addChild(line);

			this.banker_prediction1 = new createjs.Shape();
			this.banker_prediction1.x = prediction_bg2.x + 20;
			this.banker_prediction1.y = prediction_bg2.y + 42;
			this.banker_prediction1.hitArea = prediction_bg2;
			this.banker_prediction1.graphics.ss(3).s("#fff").drawCircle(0,0,8);
			this.addChild(this.banker_prediction1);

			this.banker_prediction2 = new createjs.Shape();
			this.banker_prediction2.x = prediction_bg2.x + 20;
			this.banker_prediction2.y = prediction_bg2.y + 66;
			this.banker_prediction2.hitArea = prediction_bg2;
			this.banker_prediction2.graphics.beginFill("#fff").drawCircle(0,0,9);
			this.addChild(this.banker_prediction2);

			this.banker_prediction3 = new createjs.Shape();
			this.banker_prediction3.x = prediction_bg2.x + 25;
			this.banker_prediction3.y = prediction_bg2.y + 80;
			this.banker_prediction3.hitArea = prediction_bg2;
			this.banker_prediction3.rotation = 45
			this.banker_prediction3.graphics.beginFill("#fff").drawRoundRect(0,0,5,20,2);
			this.addChild(this.banker_prediction3);
			/** enf prediticyion */

			this.pearlroad_container = new createjs.Container();
			this.addChild(this.pearlroad_container)

			this.bigroad_container = new createjs.Container();
			this.bigroad_container.x = 224;
			this.addChild(this.bigroad_container);

			this.bigeyeboy_container = new createjs.Container();
			this.bigeyeboy_container.x = this.bigroad_container.x;
			this.bigeyeboy_container.y = 74;
			this.addChild(this.bigeyeboy_container);

			this.smallroad_container = new createjs.Container();
			this.smallroad_container.x = this.bigroad_container.x;
			this.smallroad_container.y = 110;
			this.addChild(this.smallroad_container);

			this.cockroachroad_container = new createjs.Container();
			this.cockroachroad_container.x = 374;
			this.cockroachroad_container.y = 110;
			this.addChild(this.cockroachroad_container);

			let click_shape = new createjs.Shape();
			click_shape.graphics.beginFill("rgba(255,255,255,0.02)").drawRect(0,0,525,300);
			this.addChild(click_shape);

			// this.cache(0,0,800, 200);

			// this.on("pressmove", (e) => {
			// 	this.uncache();
			//       if(this.scaleX > 2.102 && this.scaleY > 2.102) return;
			//           this.set({scaleX: this.scaleX += .05, scaleY: this.scaleY += .05});
			//           this.y -= 7.5
			//     });

			//     this.on("pressup", ()=> {
			//       createjs.Tween.get(this)
			//       .to({scaleY:1, scaleX:1, y: this.context.context.height - 150}, 100)
			//       .call(()=>{
			//       	this.cache(0,0,800, 200)
			//       })
			//     });
			this.pressmove = false;
			this.clicked = false;


			click_shape.on("click", (e) => {
				if(e.target.prediction) return;
				// this.uncache();
				if(!this.clicked) {
					createjs.Tween.get(this)
					.to({
						scaleX:2.115,
						scaleY:2.115,
						y: 401
					},180).call(() => {
						// this.cache(0,0,800, 200)
					})
					this.clicked = true;
				}
				else {
					createjs.Tween.get(this)
					.to({scaleY:1, scaleX:1, y: this.context.context.height - 150}, 150).call(() => {
						// this.cache(0,0,800, 200)
					})
					this.clicked = false;
				}
				// if(!this.pressmove) {
				//   this.pressmove = true;
				//   createjs.Tween.get(this)
				//   .to({
				//     scaleX: 2.05,
				//     scaleY: 2.05,
				//     y : 412
				//   }, 200, createjs.Ease.cubicOut)
				// }

				// if(this.scaleX > 2.1005 && this.scaleY > 2.1005) return;
				//          this.set({scaleX: this.scaleX += .05, scaleY: this.scaleY += .05});
				//          this.y -= 7.5
				// this.pressmove = true;

			});

			// this.on("pressup", ()=>{
			// 	this.pressmove = false

			// })

			// this.on("click", (e)=> {
			// 	if(e.target.prediction) return;
			// 	if(this.pressmove) return;
			// 	createjs.Tween.get(this)
			// 	.to({scaleY:1, scaleX:1, y: this.context.context.height - 150}, 150)
			// 	.call(()=>{
			//        	this.cache(0,0,800, 200)
			//        })
			// });


		},
		roadMapCache() {
			// this.cache(0,0,800, 200);
		},
		getLastPred (data, type) {

			let data2 = _.clone(data);

			data2.push({'mark' : type});

			let biglast  = fnFormat().fnFormatDTBigEyeBoy(data2,6,48);

			for(var i = 0; i < biglast.matrix.length; i++) {
				for(var e = 0; e < biglast.matrix[i].length; e++) {
					if(biglast.matrix[i][e] === undefined) continue;

					if((i) == biglast.row) {
						if(biglast.matrix[biglast.row][e+1] == undefined) {
							biglast.last_mark = biglast.matrix[i][e]
						}
					}
				} //end for
			} //end for

			let smallLast = fnFormat().fnFormatDTSmallRoad(data2,6,28);
			// let smallLast = fnFormat().fnFormatSmallRoad(data2,6,28);

			for(var i = 0; i < smallLast.matrix.length; i++) {
				for(var e = 0; e < smallLast.matrix[i].length; e++) {
					if(smallLast.matrix[i][e] === undefined) continue;

					if((i) == smallLast.row) {
						if(smallLast.matrix[i][e+1] == undefined) {
							smallLast.last_mark = smallLast.matrix[i][e]
						}
					}
				} //end for
			} //end for

			// let roachlast = fnFormat().fnFormatCockroachPig(data2,6,28);
			let roachlast = fnFormat().fnFormatDTCockroachPig(data2,6,28);

			for(var i = 0; i < roachlast.matrix.length; i++) {
				for(var e = 0; e < roachlast.matrix[i].length; e++) {
					if(roachlast.matrix[i][e] === undefined) continue;

					if((i) == roachlast.row) {
						if(roachlast.matrix[i][e+1] == undefined) {
							roachlast.last_mark = roachlast.matrix[i][e];
						}
					}
				} //end for
			} //end for

			// return  {bigroad : biglast.last_mark ? biglast.last_mark : {mark :type =="d" ? "b" : "r" } , smallroad: smallLast.last_mark ? smallLast.last_mark : {mark :type =="d" ? "b" : "r" }, roach : roachlast.last_mark ? roachlast.last_mark : {mark :type =="d" ? "b" : "r" }};
			return  {bigroad : biglast.last_mark ? biglast.last_mark : {mark :'w' } , smallroad: smallLast.last_mark ? smallLast.last_mark : {mark :'w' }, roach : roachlast.last_mark ? roachlast.last_mark : {mark :'w' }};

		},
		checkPrediction(data) {

			let marks_p = this.getLastPred(data, "d");
			let marks_b = this.getLastPred(data, "z");
			//player mark

			if(marks_p.bigroad.mark.toLowerCase() == "b") {
				this.player_prediction1.graphics.clear().ss(3).s("#1565c0").drawCircle(0,0,8);
			} else if(marks_p.bigroad.mark.toLowerCase() == "r") {
				this.player_prediction1.graphics.clear().ss(3).s("#d33030").drawCircle(0,0,8);
			} else {
				this.player_prediction1.graphics.clear().ss(3).s("#fff").drawCircle(0,0,8);
			}

			//player mark
			if(marks_p.smallroad.mark.toLowerCase() == "b") {
				this.player_prediction2.graphics.clear().beginFill("#1565c0").drawCircle(0,0,9);
			} else if(marks_p.smallroad.mark.toLowerCase() == "r"){
				this.player_prediction2.graphics.clear().beginFill("#d33030").drawCircle(0,0,9);
			} else {
				this.player_prediction2.graphics.clear().beginFill("#fff").drawCircle(0,0,9);
			}

			//player mark
			if(marks_p.roach.mark.toLowerCase() == "b") {
				this.player_prediction3.graphics.clear().beginFill("#1565c0").drawRoundRect(0,0,5,20,2);
			} else if(marks_p.roach.mark.toLowerCase() == "r"){
				this.player_prediction3.graphics.clear().beginFill("#d33030").drawRoundRect(0,0,5,20,2);
			} else {
				this.player_prediction3.graphics.clear().beginFill("#fff").drawRoundRect(0,0,5,20,2);
			}



			// banker mark
			if(marks_b.bigroad.mark.toLowerCase() == "b") {
				this.banker_prediction1.graphics.clear().ss(3).s("#1565c0").drawCircle(0,0,8);
			} else if(marks_b.bigroad.mark.toLowerCase() == "r"){
				this.banker_prediction1.graphics.clear().ss(3).s("#d33030").drawCircle(0,0,8);
			} else {
				this.banker_prediction1.graphics.clear().ss(3).s("#fff").drawCircle(0,0,8);
			}

			// banker mark
			if(marks_b.smallroad.mark.toLowerCase() == "b") {
				this.banker_prediction2.graphics.clear().beginFill("#1565c0").drawCircle(0,0,9);
			} else if(marks_b.smallroad.mark.toLowerCase() == "r"){
				this.banker_prediction2.graphics.clear().beginFill("#d33030").drawCircle(0,0,9);
			} else {
				this.banker_prediction2.graphics.clear().beginFill("#fff").drawCircle(0,0,9);
			}
			// banker mark
			if(marks_b.roach.mark.toLowerCase() == "b") {
				this.banker_prediction3.graphics.clear().beginFill("#1565c0").drawRoundRect(0,0,5,20,2);
			} else if(marks_b.roach.mark.toLowerCase() == "r"){
				this.banker_prediction3.graphics.clear().beginFill("#d33030").drawRoundRect(0,0,5,20,2);
			} else {
				this.banker_prediction3.graphics.clear().beginFill("#fff").drawRoundRect(0,0,5,20,2);
			}

		},
		predictMarks (type) {

			this.clone_marks = _.clone(this.context.roadMarks);
			this.clone_marks.push({num: 0, mark: type})

			this.drawPearlRoad(fnFormat().fnFormatDTPearlRoad(this.clone_marks,6,10));
			this.drawBigRoad(fnFormat().fnFormatDTBigRoad(this.clone_marks,6,24));
			this.drawBigeyeBoy(fnFormat().fnFormatDTBigEyeBoy(this.clone_marks,6,48));
			this.drawSmallRoad(fnFormat().fnFormatDTSmallRoad(this.clone_marks,6,24));
			this.drawCockroachRoad(fnFormat().fnFormatDTCockroachPig(this.clone_marks,6,24));

			setTimeout(()=>{
				this.clone_marks.splice(this.clone_marks.length-1, 1)
				this.drawPearlRoad(fnFormat().fnFormatDTPearlRoad(this.context.roadMarks,6,10));
				this.drawBigRoad(fnFormat().fnFormatDTBigRoad(this.context.roadMarks,6,24));
				this.drawBigeyeBoy(fnFormat().fnFormatDTBigEyeBoy(this.context.roadMarks,6,48));
				this.drawSmallRoad(fnFormat().fnFormatDTSmallRoad(this.context.roadMarks,6,24));
				this.drawCockroachRoad(fnFormat().fnFormatDTCockroachPig(this.context.roadMarks,6,24));
				if(type == "d") {
					this.player_prediction_clicked = false
				} else {
					this.banker_prediction_clicked = false
				}
			},4000)
			// setTimeout(()=>{
			// 	this.clone_marks.splice(this.clone_marks.length-1, 1)
			// 	this.drawPearlRoad(this.context.roadMarks);
			// 	this.drawBigRoad(this.context.roadMarks);
			// 	this.drawBigeyeBoy(this.context.roadMarks);
			// },4000)
			let toChange1 = "";
			let toChange2 = "";
			let toChange3 = "";

			if(type == "d") {
				toChange1 = this.player_prediction1;
				toChange2 = this.player_prediction2;
				toChange3 = this.player_prediction3;
			} else {

				toChange1 = this.banker_prediction1
				toChange2  = this.banker_prediction2
				toChange3 = this.banker_prediction3
				// this.banker_prediction3.graphics.clear().beginFill("#d33030").drawRoundRect(0,0,5,20,2);
			}

			// if(biglast.mark == "B") {
			// 	toChange1.graphics.clear().ss(3).s("#1565c0").drawCircle(0,0,10);
			// } else {
			// 	toChange1.graphics.clear().ss(3).s("#d33030").drawCircle(0,0,10);
			// }

			// if(smalllast.mark == "B") {
			// 	toChange2.graphics.clear().beginFill("#1565c0").drawCircle(0,0,10);
			// }
			// else {
			// 	toChange2.graphics.clear().beginFill("#d33030").drawCircle(0,0,10);
			// }

			// if(roachlast.mark == "B") {
			// 	toChange3.graphics.clear().beginFill("#1565c0").drawRoundRect(0,0,5,25,2);
			// }
			// else {
			// 	toChange3.graphics.clear().beginFill("#d33030").drawRoundRect(0,0,5,25,2);
			// }

			createjs.Tween.get(toChange1)
			.to({ alpha : 1 },200)
			.to({ alpha : 0 },200)
			.to({ alpha : 1 },200)
			.to({ alpha : 0 },200)
			.to({ alpha : 1 },200)


			createjs.Tween.get(toChange2)
			.to({ alpha : 1 },200)
			.to({ alpha : 0 },200)
			.to({ alpha : 1 },200)
			.to({ alpha : 0 },200)
			.to({ alpha : 1 },200)

			createjs.Tween.get(toChange3)
			.to({ alpha : 1 },200)
			.to({ alpha : 0 },200)
			.to({ alpha : 1 },200)
			.to({ alpha : 0 },200)
			.to({ alpha : 1 },200)
		},

		setScoreCount(data) {
			data =  _.filter(data, function (e) {
				if(e.mark) return e;
			});
			let count = _.groupBy(data, function (e) {
				return e.mark;
			});

			let dragon_count = 0;
			let tiger_count = 0;
			let tie_count = 0;

			data.forEach(function (e) {
				if(e.mark == "d" || e.mark == "b" || e.mark == "c" || e.mark == "g"|| e.mark == "h" || e.mark == "i" || e.mark == "j") {
					dragon_count++
				} else if(e.mark == "z"|| e.mark  == "e" || e.mark  == "f" || e.mark  == "k" || e.mark  == "l" || e.mark  == "m" || e.mark  == "n" ) {
					tiger_count++
				}
				else if( e.mark == "a"|| e.mark  == "o" || e.mark  == "p" || e.mark  == "q" || e.mark  == "r"  || e.mark  == "s" || e.mark  == "t"  ) {
					tie_count++
				}

			});

			// this.dragon_total_text.text= dragon_count;
			// this.tiger_total_text.text= tiger_count;
			// this.tie_total_text.text= tie_count;

			let game_stat = {
				total_games: parseInt(tiger_count)+parseInt(dragon_count) + parseInt(tie_count),
				dragon_win: parseInt(dragon_count),
				tiger_win: parseInt(tiger_count),
				tie_win	: parseInt(tie_count)
			}

			this.context.component_dealer_data.setStats(game_stat);
		},

		drawPearlRoad(data) {
			let mark_data = null;
			this.pearlroad_container.removeAllChildren();
			mark_data = fnFormat().fnFormatDTPearlRoad(data,6,11);

			for (var i = 0; i < mark_data.matrix.length; i++) {
				for (var e = 0; e < mark_data.matrix[i].length; e++) {
					if (mark_data.matrix[i][e] === undefined) continue;
					let sp = createSpriteRoadMap(this.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, sp);
					sp.x = (e * 25.1) - 1;
					sp.y = (i * 25.1) -1;
					sp.scaleX = sp.scaleY = 0.68;
					sp.gotoAndStop("pearl-dt-" + mark_data.matrix[i][e].mark);

					if ((i + 1) == mark_data.row) {
            if (mark_data.matrix[i + 1][e] == undefined) {
              sp.last_child = true;
            }
          }

					this.pearlroad_container.addChild(sp);
				} //end for
			} //end for
			// this.updateCache();
			//
			// this.uncache();

			this.pearlroad_container.children.forEach((e) => {
				if(e.last_child) {
					createjs.Tween.get(e).wait(100)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.call (() => {

					})
				}
			})
		},
		drawBigRoad(data) {
			this.bigroad_container.removeAllChildren();
			data = fnFormat().fnFormatDTBigRoad(data);

			let sp = null;
			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					sp = sboard("bigroad")[data.matrix[i][e].mark];
					sp.x = (e * 12.5) + 1;
					sp.y = (i * 12.4) - 1;
					sp.scaleX = sp.scaleY = 0.47;

					this.bigroad_container.addChild(sp);

					if(data.matrix[i][e].ties) {
						sp.children[sp.children.length-1].visible = true;

						if(data.matrix[i][e].ties > 1) {
							let text = new createjs.Text(data.matrix[i][e].ties, "bold 12px bebas-regular","#000");
							text.x = sp.x + (8);
							text.y = sp.y;
							text.textAlign = "center";

							this.bigroad_container.addChild(text);
						}

						if(data.matrix[i][e].suited_tie) {
							sp.children[sp.children.length-1].graphics.clear().beginFill("#ff9800").drawRect(0,0,3,30);
						}
					}

					if((i) == data.row) {
						if(data.matrix[0][e+1] == undefined) {
							sp.last_child = true;
						}
					}
				} //end for
			} //end for
			// this.updateCache();
			//
			// this.uncache()

			this.bigroad_container.children.forEach((e) => {
				if(e.last_child) {
					createjs.Tween.get(e).wait(100)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.call (() => {
					});
				}
			})

		},
		drawBigeyeBoy (data) {
			let mark_data = null;
      let mark_data2 = null;
			this.bigeyeboy_container.removeAllChildren();

			mark_data = fnFormat().fnFormatDTBigEyeBoy(data, 6, 52);
			mark_data2 = fnFormat().fnFormatDTBigEyeBoy(data, 6, 26);

			let sp = null;
			for (var i = 0; i < mark_data.matrix.length; i++) {
				for (var e = 0; e < mark_data.matrix[i].length; e++) {
					if (mark_data.matrix[i][e] === undefined) continue;
					sp = sboard("bigeyeboy")[mark_data.matrix[i][e].mark];
					sp.x = e * 6.28 + 1;
					sp.y = i * 6.2;
					sp.scaleX = sp.scaleY = 0.23;


					if ((i) == mark_data.row) {
            if (mark_data.matrix[0][e + 1] == undefined) {
              sp.last_child = true;
              sp.mark = mark_data.matrix[i][e].mark
            }
          }

					this.bigeyeboy_container.addChild(sp);
				} //end for
			} //end for
			// this.updateCache();
			// this.uncache()

			this.bigeyeboy_container.children.forEach((e) => {
				if(e.last_child) {
					createjs.Tween.get(e).wait(100)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.call (() => {
					});
				}
			})
		},
		drawSmallRoad (data) {
			let mark_data = null;
      mark_data = fnFormat().fnFormatDTSmallRoad(data,6,30);
			this.smallroad_container.removeAllChildren();
			let sp = null;
			for (var i = 0; i < mark_data.matrix.length; i++) {
				for (var e = 0; e < mark_data.matrix[i].length; e++) {
					if (mark_data.matrix[i][e] === undefined) continue;
					sp = sboard("smallroad")[mark_data.matrix[i][e].mark];
					sp.x = e *6.3 + 0.4;
					sp.y = i * 6.3 + 1;
					sp.scaleX = sp.scaleY = 0.27;

					if ((i) == mark_data.row) {
						if (mark_data.matrix[0][e + 1] == undefined) {
							sp.last_child = true;
							sp.mark = mark_data.matrix[i][e].mark;
						}
					}

					this.smallroad_container.addChild(sp);
				} //end for
			} //end for
			// this.drawCockroachRoad(data);
			// this.updateCache();
			// this.uncache()

			this.smallroad_container.children.forEach((e) => {
				if(e.last_child) {
					createjs.Tween.get(e).wait(100)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.call (() => {
					});
				}
			})
		},
		drawCockroachRoad (data) {
			let mark_data = null;
			mark_data = fnFormat().fnFormatDTCockroachPig(data,6,28);

			this.cockroachroad_container.removeAllChildren();
			let sp = null;
			for (var i = 0; i < mark_data.matrix.length; i++) {
				for (var e = 0; e < mark_data.matrix[i].length; e++) {
					if (mark_data.matrix[i][e] === undefined) continue;
					sp = sboard("cockroach")[mark_data.matrix[i][e].mark];
					sp.x = e * 6.2 + 1;
					sp.y = i * (6.36) + 1;
					sp.scaleX = sp.scaleY = 0.26;

					if ((i) == mark_data.row) {
						if (mark_data.matrix[mark_data.row][e + 1] == undefined) {
							sp.last_child = true;
							sp.mark = mark_data.matrix[i][e].mark;
						}
					}

					this.cockroachroad_container.addChild(sp);
				} //end for
			} //end for
			// this.updateCache();

			// this.uncache();

			this.cockroachroad_container.children.forEach((e) => {
				if(e.last_child) {
					createjs.Tween.get(e).wait(100)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.call (() => {
					});
				}
			});
		}

	});

	return instance;
}
