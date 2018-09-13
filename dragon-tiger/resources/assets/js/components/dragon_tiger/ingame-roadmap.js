let instance = null;

import {fontFormat} from '../../factories/factories';
import fnFormat from '../../factories/formatter';
import {dragontigerRoadmap as dtRoadMap} from '../../factories/scoreboard_draw';
// let drawSboard  = sboard();


export default() => {
	instance = instance || new blu.Component({
		clone_marks : [],
		main() {

			let row = 6;
			let col = 14;
			let w = 30;
			let h = 30;

			this.x = 0;
			this.y = this.context.context.height - 180;

			// game stastics bg
			this.footerBg1 = new createjs.Shape();
			this.footerBg1.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0,0,512,180);
			this.addChild(this.footerBg1);

			this.footerBg2 = new createjs.Shape();
			this.footerBg2.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0,0,730,180);
			this.addChild(this.footerBg2);
			this.footerBg2.x = 1200;

			this.lines = new createjs.Shape();
			this.lines.graphics.ss(.8).s(this.context.theme_color[window.theme].bar_color).moveTo(0,30)
			this.addChild(this.lines);

			//pearl
			for(var i = 1; i < row; i++) {
				let adjust = i === 0 ? 1 : i === row ? -1 : 0
				this.lines.graphics.moveTo(0,h*i + adjust).lineTo(w*col,h*i + adjust)
				// this.lines.graphics.moveTo(0,h*i).lineTo(w*col,h*i)
			} // end for

			this.lines.graphics.moveTo(w,0);

			for(var x = 1; x <= col; x++) {
				this.lines.graphics.moveTo(w*x,0).lineTo(w*x,h*row)
			}

			//bigroad
			let moveTo = this.footerBg2.x + 90;
				row = 12;
				col = 42;
				w = 15, h = 15;

			this.lines.graphics.moveTo(moveTo,16)
			for(var i = 1; i < row ; i++) {
				let adjust = i === 0 ? 1 : i === row ? -1 : 0
				this.lines.graphics.moveTo(moveTo,h*i + adjust).lineTo((col*w)+ moveTo,h*i + adjust)
				// this.lines.graphics.moveTo(moveTo,h*i).lineTo((col*w)+ moveTo,h*i)
			}
			this.lines.graphics.moveTo(moveTo,0)
			for(var x = 1; x < col ; x++) {
				this.lines.graphics.moveTo(moveTo + (x*w),0).lineTo(moveTo + (x*w), (row*h))
			}

			// *** predition ***//
			let prediction_container = new createjs.Container();
			prediction_container.x = 1200;
			this.addChild(prediction_container);

			this.prediction_bg = new createjs.Shape();
			this.prediction_bg.fillCmd = this.prediction_bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).command;
			// this.prediction_bg.graphics.beginFill('transparent');
			this.prediction_bg.graphics.drawRect(0,0,45,180);
			prediction_container.addChild(this.prediction_bg);

			this.player_prediction_clicked = false;

			this.prediction_bg.addEventListener("click", () => {
				if(this.player_prediction_clicked) return
				this.player_prediction_clicked = true
				this.predictMarks("d")
			});

			this.prediction_bg2 = new createjs.Shape();
			this.prediction_bg2.fillCmd = this.prediction_bg2.graphics.beginFill(this.context.theme_color[window.theme].base_color).command;
			// this.prediction_bg2.graphics.beginFill('transparent');
			this.prediction_bg2.graphics.drawRect(0,0,45,180);
			this.prediction_bg2.x = 45
			prediction_container.addChild(this.prediction_bg2);

			this.banker_prediction_clicked = false;

			this.prediction_bg2.addEventListener("click", () => {
				if(this.banker_prediction_clicked) return
				this.banker_prediction_clicked = true
				this.predictMarks("z")
			});

			let player_prediction = new createjs.Shape();
			player_prediction.graphics.beginFill("#1565c0").drawRect(0,0,45,30);
			player_prediction.x = this.prediction_bg.x;
			player_prediction.y = this.prediction_bg.y;
			player_prediction.hitArea = this.prediction_bg
			prediction_container.addChild(player_prediction);
			// ==
			let p_text = new createjs.Text(window.language.locale == 'zh' ? "龙" : 'D', fontFormat(20, 'black', 'lato', window.language.locale == 'zh' ? true : false), "#fff");
			p_text.set({textAlign: 'center', textBaseline: 'middle', x : player_prediction.x + 21, y:15});
			prediction_container.addChild(p_text)

			this.player_prediction1 = new createjs.Shape();
			this.player_prediction1.x = this.prediction_bg.x + 15.2 + 6;
			this.player_prediction1.y = this.prediction_bg.y + 50 + 10;
			this.player_prediction1.fillCmd = this.player_prediction1.graphics.ss(4).s(this.context.theme_color[window.theme].text_color).command
			this.player_prediction1.graphics.drawCircle(0,0,12);
			this.player_prediction1.hitArea = this.prediction_bg
			prediction_container.addChild(this.player_prediction1);

			this.player_prediction2 = new createjs.Shape();
			this.player_prediction2.scaleX = this.player_prediction2.scaleY = 1.1;
			this.player_prediction2.x = this.prediction_bg.x + 15.2 + 6;
			this.player_prediction2.y = this.prediction_bg.y + 87 + 20;
			this.player_prediction2.fillCmd = this.player_prediction2.graphics.beginFill(this.context.theme_color[window.theme].text_color).command
			this.player_prediction2.graphics.drawCircle(0,0,12);
			this.player_prediction2.hitArea = this.prediction_bg
			prediction_container.addChild(this.player_prediction2);

			this.player_prediction3 = new createjs.Shape();
			this.player_prediction3.x = this.prediction_bg.x + 23.5 + 6;
			this.player_prediction3.y = this.prediction_bg.y + 108 + 26;
			this.player_prediction3.rotation = 45
			this.player_prediction3.fillCmd = this.player_prediction3.graphics.beginFill(this.context.theme_color[window.theme].text_color).command
			this.player_prediction3.graphics.drawRoundRect(0,0,7,32,4);
			this.player_prediction3.hitArea = this.prediction_bg
			prediction_container.addChild(this.player_prediction3);

			let banker_prediction = new createjs.Shape();
			banker_prediction.x = this.prediction_bg2.x;
			banker_prediction.y = this.prediction_bg2.y;
			banker_prediction.hitArea = this.prediction_bg2;
			banker_prediction.graphics.beginFill("#d33030").drawRect(0,0,45,30);
			prediction_container.addChild(banker_prediction);
			// ==
			let b_text = new createjs.Text(window.language.locale == 'zh' ? "虎" :'T', fontFormat(20, 'black', 'lato', window.language.locale == 'zh' ? true : false), "#fff");
			b_text.set({textAlign: 'center', textBaseline: 'middle', x : banker_prediction.x + 21, y:15});
			prediction_container.addChild(b_text)

			// let line = new createjs.Shape();
			// line.graphics.ss(0.5).s(this.context.theme_color[window.theme].bar_color).moveTo(0,0).lineTo(83, 0);
			// line.x= banker_prediction.x - 41;
			// line.y= banker_prediction.y + 30;
			// prediction_container.addChild(line);

			this.banker_prediction1 = new createjs.Shape();
			this.banker_prediction1.x = this.prediction_bg2.x + 15.2 + 6;
			this.banker_prediction1.y = this.player_prediction1.y;
			this.banker_prediction1.hitArea = this.prediction_bg2;
			this.banker_prediction1.fillCmd = this.banker_prediction1.graphics.ss(4).s(this.context.theme_color[window.theme].text_color).command
			this.banker_prediction1.graphics.drawCircle(0,0,12);
			prediction_container.addChild(this.banker_prediction1);

			this.banker_prediction2 = new createjs.Shape();
			this.banker_prediction2.scaleX = this.banker_prediction2.scaleY = 1.1;
			this.banker_prediction2.x = this.prediction_bg2.x + 15.2 + 6;
			this.banker_prediction2.y = this.player_prediction2.y;
			this.banker_prediction2.hitArea = this.prediction_bg2;
			this.banker_prediction2.fillCmd = this.banker_prediction2.graphics.beginFill(this.context.theme_color[window.theme].text_color).command
			this.banker_prediction2.graphics.drawCircle(0,0,12);
			prediction_container.addChild(this.banker_prediction2);

			this.banker_prediction3 = new createjs.Shape();
			this.banker_prediction3.x = this.prediction_bg2.x + 23.5 + 6;
			this.banker_prediction3.y = this.player_prediction3.y;
			this.banker_prediction3.hitArea = this.prediction_bg2;
			this.banker_prediction3.rotation = 45
			this.banker_prediction3.fillCmd = this.banker_prediction3.graphics.beginFill(this.context.theme_color[window.theme].text_color).command
			this.banker_prediction3.graphics.drawRoundRect(0,0,7,32,4);
			prediction_container.addChild(this.banker_prediction3);

			/** enf prediticyion */

			this.pearlroad_container = new createjs.Container();
			this.pearlroad_container.x = -2;
			this.pearlroad_container.y = -2;
			this.addChild(this.pearlroad_container);

			this.bigroad_container = new createjs.Container();
			this.bigroad_container.x = moveTo;
			this.addChild(this.bigroad_container);

			this.bigeyeboy_container = new createjs.Container();
			this.bigeyeboy_container.x = this.bigroad_container.x;
			this.bigeyeboy_container.y = 90.5;
			this.addChild(this.bigeyeboy_container);

			this.smallroad_container = new createjs.Container();
			this.smallroad_container.x = this.bigroad_container.x;
			this.smallroad_container.y = 135.5;
			this.addChild(this.smallroad_container);

			this.cockroachroad_container = new createjs.Container();
			this.cockroachroad_container.x = this.bigroad_container.x + 315.5;
			this.cockroachroad_container.y = this.smallroad_container.y
			this.addChild(this.cockroachroad_container);

			//Statistics
			let statContainer = new createjs.Container();
			statContainer.set({x:420,y:0});

			this.statBg = new createjs.Shape();
			// this.statBg.graphics.ss(0.6).s(this.context.theme_color[window.theme].bar_color).drawRect(0,0,90,180);
			this.statBg.graphics.drawRect(0,0,90,180);
			statContainer.addChild(this.statBg);

			let temp = '', space = 16;
			this.shoe_counter = this.getText(75,space,"0","24px bebas-regular, helvetica",this.context.theme_color[window.theme].text_color,"right","top");

			temp = this.shoe_counter;
			this.dragon_total_text = this.getText(75,temp.y + temp.getMeasuredHeight() + space + 9,"0",fontFormat(24, 'regular', 'bebas', false), this.context.theme_color[window.theme].text_color,"right","top");

			temp = this.dragon_total_text;
			this.tiger_total_text = this.getText(75,temp.y + temp.getMeasuredHeight() + space + 9,"0",fontFormat(24, 'regular', 'bebas', false), this.context.theme_color[window.theme].text_color,"right","top");

			temp = this.tiger_total_text;
			this.tie_total_text = this.getText(75,temp.y + temp.getMeasuredHeight() + space + 9,"0",fontFormat(24, 'regular', 'bebas', false), this.context.theme_color[window.theme].text_color,"right","top");

			this.addChild(statContainer);
			statContainer.addChild(this.shoe_counter, this.dragon_total_text, this.tiger_total_text, this.tie_total_text);
			//cosmetics
			this.shoeIndi = new createjs.Text("#", "20px lato-regular", this.context.theme_color[window.theme].text_color);
			this.shoeIndi.set({x: 18, y:this.shoe_counter.y});
			statContainer.addChild(this.shoeIndi);

			this.dragonIndicator = new dtRoadMap(10, 2.5);
			this.dragonIndicator.play('pearl-b', fontFormat(13, 'black', 'lato', window.language.locale == 'zh' ? true : false));
			this.dragonIndicator.instance.set({x: 15, y:this.dragon_total_text.y + 3});
			statContainer.addChild(this.dragonIndicator.instance);


			this.tigerIndicator = new dtRoadMap(10, 2.5);
			this.tigerIndicator.play('pearl-e', fontFormat(13, 'black', 'lato', window.language.locale == 'zh' ? true : false));
			this.tigerIndicator.instance.set({x: 15, y:this.tiger_total_text.y + 3});
			statContainer.addChild(this.tigerIndicator.instance);

			this.tieIndicator = new dtRoadMap(10, 2.5);
			this.tieIndicator.play('pearl-a', fontFormat(13, 'black', 'lato', window.language.locale == 'zh' ? true : false));
			this.tieIndicator.instance.set({x: 15, y:this.tie_total_text.y + 3});
			statContainer.addChild(this.tieIndicator.instance);

			this.cache(0,0, this.context.context.width, 180);
			this.updateCache();
		},
		getText(x,y,text,font,color,align,baseLine){
			let textCt =  new createjs.Text(text,font,color);
			textCt.set({x:x,y:y});
			textCt.textAlign = align;
			textCt.textBaseline = baseLine;
			return textCt;
		},
		setScoreCount (data) {
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

			this.dragon_total_text.text= dragon_count;
			this.tiger_total_text.text= tiger_count;
			this.tie_total_text.text= tie_count;

			let game_stat = {
				total_games: parseInt(tiger_count)+parseInt(dragon_count) + parseInt(tie_count),
				dragon_win: parseInt(dragon_count),
				banker_win: parseInt(tiger_count),
				tie_win	: parseInt(tie_count)
			}

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
				this.player_prediction1.fillCmd.style = '#1565c0';
			} else if(marks_p.bigroad.mark.toLowerCase() == "r") {
				this.player_prediction1.fillCmd.style = '#d33030';
			} else {
				this.player_prediction1.fillCmd.style = this.context.theme_color[window.theme].base_color;
			}

			//player mark
			if(marks_p.smallroad.mark.toLowerCase() == "b") {
				this.player_prediction2.fillCmd.style = '#1565c0';
			} else if(marks_p.smallroad.mark.toLowerCase() == "r") {
				this.player_prediction2.fillCmd.style = '#d33030';
			} else {
				this.player_prediction2.fillCmd.style = this.context.theme_color[window.theme].base_color;
			}

			//player mark
			if(marks_p.roach.mark.toLowerCase() == "b") {
				this.player_prediction3.fillCmd.style = '#1565c0';
			} else if(marks_p.roach.mark.toLowerCase() == "r") {
				this.player_prediction3.fillCmd.style = '#d33030';
			} else {
				this.player_prediction3.fillCmd.style = this.context.theme_color[window.theme].base_color;
			}

			// banker mark
			if(marks_b.bigroad.mark.toLowerCase() == "b") {
				this.banker_prediction1.fillCmd.style = '#1565c0'
			} else if(marks_b.bigroad.mark.toLowerCase() == "r"){
				this.banker_prediction1.fillCmd.style = '#d33030'
			} else {
				this.banker_prediction1.fillCmd.style = this.context.theme_color[window.theme].base_color
			}

			// banker mark
			if(marks_b.smallroad.mark.toLowerCase() == "b") {
				this.banker_prediction2.fillCmd.style = '#1565c0'
			} else if(marks_b.smallroad.mark.toLowerCase() == "r"){
				this.banker_prediction2.fillCmd.style = '#d33030'
			} else {
				this.banker_prediction2.fillCmd.style = this.context.theme_color[window.theme].base_color
			}

			// banker mark
			if(marks_b.roach.mark.toLowerCase() == "b") {
				this.banker_prediction3.fillCmd.style = '#1565c0'
			} else if(marks_b.roach.mark.toLowerCase() == "r"){
				this.banker_prediction3.fillCmd.style = '#d33030'
			} else {
				this.banker_prediction3.fillCmd.style = this.context.theme_color[window.theme].base_color
			}

		},
		predictMarks (type) {
			this.fnUpdateCaching(true);
			this.clone_marks = _.clone(this.context.roadMarks);
			this.clone_marks.push({num: 0, mark: type})

			this.drawPearlRoad(this.clone_marks);
			this.drawBigRoad(this.clone_marks);
			this.drawBigeyeBoy(this.clone_marks);
			this.drawSmallRoad(this.clone_marks);
			this.drawCockroachRoad(this.clone_marks);

			setTimeout(()=>{
				this.clone_marks.splice(this.clone_marks.length-1, 1)

				this.drawPearlRoad(this.clone_marks);
				this.drawBigRoad(this.clone_marks);
				this.drawBigeyeBoy(this.clone_marks);
				this.drawSmallRoad(this.clone_marks);
				this.drawCockroachRoad(this.clone_marks);
				if(type == "d") {
					this.player_prediction_clicked = false
				} else {
					this.banker_prediction_clicked = false
				}
				this.fnUpdateCaching(true);
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
			.wait(100)
			.to({ alpha : 1 },150)
			.to({ alpha : 0 },150)
			.to({ alpha : 1 },150)
			.to({ alpha : 0 },150)
			.to({ alpha : 1 },150)


			createjs.Tween.get(toChange2)
			.wait(100)
			.to({ alpha : 1 },150)
			.to({ alpha : 0 },150)
			.to({ alpha : 1 },150)
			.to({ alpha : 0 },150)
			.to({ alpha : 1 },150)

			createjs.Tween.get(toChange3)
			.wait(100)
			.to({ alpha : 1 },150)
			.to({ alpha : 0 },150)
			.to({ alpha : 1 },150)
			.to({ alpha : 0 },150)
			.to({ alpha : 1 },150)
		},
		drawPearlRoad(data) {
			let mark_data = null;
			this.pearlroad_container.removeAllChildren();

			// let sp = null;
			mark_data = fnFormat().fnFormatDTPearlRoad(data,6,16);

			for(var i = 0; i < mark_data.matrix.length; i++) {
				for(var e = 0; e < mark_data.matrix[i].length; e++) {
					if(mark_data.matrix[i][e] === undefined) continue;

					// sp = drawSboard("pearlroad", data.matrix[i][e].mark)[data.matrix[i][e].mark];
					// sp.x = (e*30) + 8;
					// sp.y = (i*30) + 8;
					// sp.scaleX = sp.scaleY = 0.53;

					var roadmap = new dtRoadMap(13, 4);
					roadmap.play('pearl-'+mark_data.matrix[i][e].mark.toLowerCase());
					let sp = roadmap.instance;
					sp.x = (e * 30) + 4;
					sp.y = (i * 30) + 4;

					if((i+1) == mark_data.row) {
						if(mark_data.matrix[i+1][e] == undefined) {
							sp.last_child = true;
						}
					}

					this.pearlroad_container.addChild(sp);

				} //end for
			} //end for

			this.pearlroad_container.children.forEach((e) => {
				if(e.last_child) {
					createjs.Tween.get(e).wait(100)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
				}
			})
		},
		drawBigRoad(data) {
			this.bigroad_container.removeAllChildren();
			data = fnFormat().fnFormatDTBigRoad(data, 6, 44);

			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;

					let sp = null;
					var roadmap = new dtRoadMap(6, 2);
					roadmap.play('big-'+data.matrix[i][e].mark.toLowerCase());
					roadmap.ties(data.matrix[i][e].ties, {color:this.context.theme_color[window.theme].text_color, width : 3, height : 16});

					sp = roadmap.instance;
					sp.x = (e * 15)+1;
					sp.y = (i * 15)+1;

					this.bigroad_container.addChild(sp);

					if((i) == data.row) {
						if(data.matrix[0][e+1] == undefined) {
							sp.last_child = true;
						}
					}

				} //end for
			} //end for


			this.bigroad_container.children.forEach((e) => {
				if(e.last_child) {
					createjs.Tween.get(e).wait(100)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.call(() => {
					});
				}
			})
		},
		drawBigeyeBoy (data) {
			let mark_data = null;
			this.bigeyeboy_container.removeAllChildren();

			mark_data = fnFormat().fnFormatDTBigEyeBoy(data,6,86);

			let sp = null;
			for(var i = 0; i < mark_data.matrix.length; i++) {
				for(var e = 0; e < mark_data.matrix[i].length; e++) {
					if(mark_data.matrix[i][e] === undefined) continue;

					var roadmap = new dtRoadMap(3);
					roadmap.play('bigeye-'+mark_data.matrix[i][e].mark.toLowerCase());
					let sp = roadmap.instance;
					sp.x = (e * 7.5) + 1;
					sp.y = (i * 7.5);

					if((i) == mark_data.row) {
						if(mark_data.matrix[0][e+1] == undefined) {
							sp.last_child = true;
							sp.mark = mark_data.matrix[i][e].mark
						}
					}

					this.bigeyeboy_container.addChild(sp);
				} //end for
			} //end for


			this.bigeyeboy_container.children.forEach((e) => {
				if(e.last_child) {
					createjs.Tween.get(e).wait(100)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
				}
			})

		},
		drawSmallRoad (data) {
			let mark_data = null;
			mark_data = fnFormat().fnFormatDTSmallRoad(data,6,44);
			this.smallroad_container.removeAllChildren();

			// let sp = null;

			for(var i = 0; i < mark_data.matrix.length; i++) {
				for(var e = 0; e < mark_data.matrix[i].length; e++) {
					if(mark_data.matrix[i][e] === undefined) continue;

					var roadmap = new dtRoadMap(3.5);
					roadmap.play('small-'+mark_data.matrix[i][e].mark.toLowerCase());
					let sp = roadmap.instance;
					sp.y = (i * 7.5);
					sp.x = (e * 7.5);

					if((i) == mark_data.row) {
						if(mark_data.matrix[0][e+1] == undefined) {
							sp.last_child = true;
							sp.mark = mark_data.matrix[i][e].mark;
						}
					}

					this.smallroad_container.addChild(sp);
				} //end for
			} //end for

			this.smallroad_container.children.forEach((e) => {
				if(e.last_child) {
					createjs.Tween.get(e).wait(100)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
				}
			})

			// this.drawCockroachRoad(data)
		},
		drawCockroachRoad (data) {
			let mark_data = null;
			mark_data = fnFormat().fnFormatDTCockroachPig(data,6,44);

			this.cockroachroad_container.removeAllChildren();
			let sp = null;
			for(var i = 0; i < mark_data.matrix.length; i++) {
				for(var e = 0; e < mark_data.matrix[i].length; e++) {
					if(mark_data.matrix[i][e] === undefined) continue;

					var roadmap = new dtRoadMap(3.5);
					roadmap.play('roach-'+mark_data.matrix[i][e].mark.toLowerCase());
					let sp = roadmap.instance;
					sp.y = (i * 7.5);
					sp.x = (e * 7.5);

					if((i) == mark_data.row) {
						if(mark_data.matrix[0][e+1] == undefined) {
							sp.last_child = true;
							sp.mark = mark_data.matrix[i][e].mark;
						}
					}

					this.cockroachroad_container.addChild(sp);
				} //end for
			} //end for


			this.cockroachroad_container.children.forEach((e) => {
				if(e.last_child) {
					createjs.Tween.get(e).wait(100)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
				}
			})

		},
		shoeChange () {
    	this.pearlroad_container.removeAllChildren();
    	this.bigeyeboy_container.removeAllChildren();
    	this.smallroad_container.removeAllChildren();
    	this.bigroad_container.removeAllChildren();
    	this.cockroachroad_container.removeAllChildren();
    	this.shoe_counter.text = 0;

      this.tie_total_text.text = 0;
      this.dragon_total_text.text = 0;
      this.tiger_total_text.text = 0;

			this.player_prediction1.fillCmd.style = this.context.theme_color[window.theme].base_color;
			this.player_prediction2.fillCmd.style = this.context.theme_color[window.theme].base_color;
			this.player_prediction3.fillCmd.style = this.context.theme_color[window.theme].base_color;

			this.banker_prediction1.fillCmd.style = this.context.theme_color[window.theme].base_color;
			this.banker_prediction2.fillCmd.style = this.context.theme_color[window.theme].base_color;
			this.banker_prediction3.fillCmd.style = this.context.theme_color[window.theme].base_color;

			this.fnUpdateCaching(true);
		},
		changeTheme (new_theme) {
			this.footerBg1.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0,0,512,180);
			this.footerBg2.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0,0,730,180);

			let index = this.getChildIndex(this.lines)
			this.removeChild(this.lines);

			let row = 6;
			let col = 14;
			let w = 30;
			let h = 30;

			this.lines.graphics.clear().ss(.8).s((this.context.theme_color[new_theme].bar_color)).moveTo(0,30)
			//pearl
			for(var i = 1; i < row; i++) {
				let adjust = i === 0 ? 1 : i === row ? -1 : 0
				this.lines.graphics.moveTo(0,h*i + adjust).lineTo(w*col,h*i + adjust)
				// this.lines.graphics.moveTo(0,h*i).lineTo(w*col,h*i)
			} // end for

			this.lines.graphics.moveTo(w,0);

			for(var x = 1; x <= col; x++) {
				this.lines.graphics.moveTo(w*x,0).lineTo(w*x,h*row)
			}

			//bigroad
			let moveTo = this.footerBg2.x + 90;
			row = 12;
			col = 42;
			w = 15, h = 15;

			this.lines.graphics.moveTo(moveTo,16)
			for(var i = 1; i < row ; i++) {
				let adjust = i === 0 ? 1 : i === row ? -1 : 0
				this.lines.graphics.moveTo(moveTo,h*i + adjust).lineTo((col*w)+ moveTo,h*i + adjust)
				// this.lines.graphics.moveTo(moveTo,h*i).lineTo((col*w)+ moveTo,h*i )
			}
			this.lines.graphics.moveTo(moveTo,0)
			for(var x = 1; x < col ; x++) {
				this.lines.graphics.moveTo(moveTo + (x*w),0).lineTo(moveTo + (x*w), (row*h))
			}

			this.addChildAt(this.lines, index);

			this.prediction_bg.fillCmd.style = this.context.theme_color[new_theme].base_color;
			this.prediction_bg2.fillCmd.style = this.context.theme_color[new_theme].base_color;

			this.shoe_counter.color = this.context.theme_color[new_theme].text_color;
			this.dragon_total_text.color = this.context.theme_color[new_theme].text_color;
			this.tiger_total_text.color = this.context.theme_color[new_theme].text_color;
			this.tie_total_text.color = this.context.theme_color[new_theme].text_color;
			this.shoeIndi.color = this.context.theme_color[new_theme].text_color;

			let old_theme = new_theme ==='white' ? this.context.theme_color['black'].base_color : this.context.theme_color['white'].base_color;

			if(this.player_prediction1.fillCmd.style === old_theme) {
				this.player_prediction1.fillCmd.style = this.context.theme_color[new_theme].base_color;
			}
			if(this.player_prediction2.fillCmd.style === old_theme) {
				this.player_prediction2.fillCmd.style = this.context.theme_color[new_theme].base_color;
			}
			if(this.player_prediction3.fillCmd.style === old_theme) {
				this.player_prediction3.fillCmd.style = this.context.theme_color[new_theme].base_color;
			}

			if(this.banker_prediction1.fillCmd.style === old_theme) {
				this.banker_prediction1.fillCmd.style = this.context.theme_color[new_theme].base_color
			}
			if(this.banker_prediction2.fillCmd.style === old_theme) {
				this.banker_prediction2.fillCmd.style = this.context.theme_color[new_theme].base_color
			}
			if(this.banker_prediction3.fillCmd.style === old_theme) {
				this.banker_prediction3.fillCmd.style = this.context.theme_color[new_theme].base_color
			}


			if(this.cacheCanvas) {
				this.updateCache();
			}
		},
		fnUpdateCaching(anim) {
			this.uncache();
			setTimeout(() => {
				this.cache(0,0, this.context.context.width, 180);
			},850);
		}

	});

	return instance;
}
