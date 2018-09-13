let instance = null;
import {fontFormat} from '../../factories/factories';
import fnFormat from '../../factories/formatter';
import {baccaratRoadmap as bcRoadmap} from '../../factories/scoreboard_draw';

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
			this.footerBg2.x = 1210;

			this.lines = new createjs.Shape();
			this.lines.graphics.ss(.8).s((this.context.theme_color[window.theme].bar_color)).moveTo(0,29)
			this.addChild(this.lines);

			//pearl
			for(var i = 1; i < row; i++) {
				let adjust = i === 0 ? 1 : i === row ? -1 : 0
				this.lines.graphics.moveTo(0,h*i + adjust).lineTo(w*col,h*i + adjust)
			} // end for

			this.lines.graphics.moveTo(w,0);

			for(var x = 1; x <= col; x++) {
				this.lines.graphics.moveTo(w*x,0).lineTo(w*x,h*row)
			}

			//bigroad
			let moveTo = this.footerBg2.x + 45 + 45 - 10;
			row = 12;
			col = 42;
			w = 15, h = 15;

			this.lines.graphics.moveTo(moveTo,16)
			for(var i = 1; i < row ; i++) {
				let adjust = i === 0 ? 1 : i === row ? -1 : 0
				this.lines.graphics.moveTo(moveTo,h*i + adjust).lineTo((col*w)+ moveTo,h*i + adjust)
			}
			this.lines.graphics.moveTo(moveTo,0)
			for(var x = 1; x < col ; x++) {
				this.lines.graphics.moveTo(moveTo + (x*w),0).lineTo(moveTo + (x*w), (row*h))
			}

			// *** predition ***//
			let prediction_container = new createjs.Container();
			prediction_container.x = 407;
			this.addChild(prediction_container);

			this.player_pred_bg = new createjs.Shape();
			this.player_pred_bg.fillCmd = this.player_pred_bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).command;
			this.player_pred_bg.graphics.drawRect(0,0,45,180);
			this.player_pred_bg.x = 793
			prediction_container.addChild(this.player_pred_bg);

			this.player_prediction_clicked = false;

			this.player_pred_bg.addEventListener("click", () => {
				if(this.player_prediction_clicked) return
				this.player_prediction_clicked = true
				this.predictMarks("p")
			});

			this.banker_pred_bg = new createjs.Shape();
			this.banker_pred_bg.fillCmd = this.banker_pred_bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).command;
			this.banker_pred_bg.graphics.drawRect(0,0,45,180);
			this.banker_pred_bg.x = 792 + 45
			prediction_container.addChild(this.banker_pred_bg);

			this.banker_prediction_clicked = false

			this.banker_pred_bg.addEventListener("click", () => {
				if(this.banker_prediction_clicked) return
				this.banker_prediction_clicked = true
				this.predictMarks("b")
			});

			let player_prediction = new createjs.Shape();
			player_prediction.graphics.beginFill("#1565c0").drawRect(0,0,45,30);
			player_prediction.x = this.player_pred_bg.x;
			player_prediction.y = this.player_pred_bg.y;
			player_prediction.hitArea = this.player_pred_bg
			prediction_container.addChild(player_prediction);
			// ==
			let p_text = new createjs.Text(window.language.locale === 'zh' ? '闲' : 'P', fontFormat(18, 'black', 'lato', false),"#fff");
			p_text.set({textAlign: 'center', textBaseline: 'middle', x : player_prediction.x + 21, y:15});
			prediction_container.addChild(p_text)


			this.player_prediction1 = new createjs.Shape();
			this.player_prediction1.x = this.player_pred_bg.x + 15.2 + 7;
			this.player_prediction1.y = this.player_pred_bg.y + 30 + 20 + 6;
			this.player_prediction1.fillCmd = this.player_prediction1.graphics.ss(4).s(this.context.theme_color[window.theme].base_color).command
			this.player_prediction1.graphics.drawCircle(0,0,12);
			this.player_prediction1.hitArea = this.player_pred_bg
			prediction_container.addChild(this.player_prediction1);

			this.player_prediction2 = new createjs.Shape();
			this.player_prediction2.scaleX = this.player_prediction2.scaleY = 1.1;
			this.player_prediction2.x = this.player_pred_bg.x + 15.2 + 7;
			this.player_prediction2.y = this.player_prediction1.y + 20 + 12 + 16;
			this.player_prediction2.fillCmd = this.player_prediction2.graphics.beginFill(this.context.theme_color[window.theme].base_color).command
			this.player_prediction2.graphics.drawCircle(0,0,12);
			this.player_prediction2.hitArea = this.player_pred_bg
			prediction_container.addChild(this.player_prediction2);

			this.player_prediction3 = new createjs.Shape();
			this.player_prediction3.x = this.player_pred_bg.x + 23.5 + 7;
			this.player_prediction3.y = this.player_pred_bg.y + 108 + 26;
			this.player_prediction3.rotation = 45
			this.player_prediction3.fillCmd = this.player_prediction3.graphics.beginFill(this.context.theme_color[window.theme].base_color).command
			this.player_prediction3.graphics.drawRoundRect(0,0,7,32,4);
			this.player_prediction3.hitArea = this.player_pred_bg
			prediction_container.addChild(this.player_prediction3);

			let banker_prediction = new createjs.Shape();
			banker_prediction.x = this.banker_pred_bg.x;
			banker_prediction.y = this.banker_pred_bg.y;
			banker_prediction.hitArea = this.banker_pred_bg;
			banker_prediction.graphics.beginFill("#d33030").drawRect(0,0,45,30);
			prediction_container.addChild(banker_prediction);

			// ==
			let b_text = new createjs.Text(window.language.locale === 'zh' ? '庄' : 'B', fontFormat(18, 'black', 'lato', false),"#fff");
			b_text.set({textAlign: 'center', textBaseline: 'middle', x : banker_prediction.x + 21, y:15});
			prediction_container.addChild(b_text)

			this.banker_prediction1 = new createjs.Shape();
			this.banker_prediction1.x = this.banker_pred_bg.x + 15.2 + 9;
			this.banker_prediction1.y = this.player_prediction1.y;
			this.banker_prediction1.hitArea = this.banker_pred_bg;
			this.banker_prediction1.fillCmd = this.banker_prediction1.graphics.ss(4).s(this.context.theme_color[window.theme].base_color).command
			this.banker_prediction1.graphics.drawCircle(0,0,12);
			prediction_container.addChild(this.banker_prediction1);

			this.banker_prediction2 = new createjs.Shape();
			this.banker_prediction2.scaleX = this.banker_prediction2.scaleY = 1.1;
			this.banker_prediction2.x = this.banker_pred_bg.x + 15.2 + 9;
			this.banker_prediction2.y = this.player_prediction2.y;
			this.banker_prediction2.hitArea = this.banker_pred_bg;
			this.banker_prediction2.fillCmd = this.banker_prediction2.graphics.beginFill(this.context.theme_color[window.theme].base_color).command
			this.banker_prediction2.graphics.drawCircle(0,0,12);
			prediction_container.addChild(this.banker_prediction2);

			this.banker_prediction3 = new createjs.Shape();
			this.banker_prediction3.x = this.banker_pred_bg.x + 23.5 + 9;
			this.banker_prediction3.y = this.player_prediction3.y;
			this.banker_prediction3.hitArea = this.banker_pred_bg;
			this.banker_prediction3.rotation = 45
			this.banker_prediction3.fillCmd = this.banker_prediction3.graphics.beginFill(this.context.theme_color[window.theme].base_color).command
			this.banker_prediction3.graphics.drawRoundRect(0,0,7,32,4);
			prediction_container.addChild(this.banker_prediction3);


			// *** end predition ***//
			this.pearlroad_container = new createjs.Container();
			// this.pearlroad_container.x = -2;
			this.pearlroad_container.y = -2;
			this.addChild(this.pearlroad_container);

			this.bigroad_container = new createjs.Container();
			this.bigroad_container.x = moveTo;
			this.addChild(this.bigroad_container);

			this.bigeyeboy_container = new createjs.Container();
			this.bigeyeboy_container.x = this.bigroad_container.x;
			this.bigeyeboy_container.y = 92
			this.addChild(this.bigeyeboy_container);

			this.smallroad_container = new createjs.Container();
			this.smallroad_container.x = this.bigroad_container.x-1;
			this.smallroad_container.y = 136;
			this.addChild(this.smallroad_container);

			this.cockroachroad_container = new createjs.Container();
			this.cockroachroad_container.x = this.bigroad_container.x + 314;
			this.cockroachroad_container.y = this.smallroad_container.y
			this.addChild(this.cockroachroad_container);

			// === count
			let statContainer = new createjs.Container();
			statContainer.set({x:420,y:0});

			this.statBg = new createjs.Shape();
			this.statBg.graphics.drawRect(0,0,90,180);
			statContainer.addChild(this.statBg);

			let temp = '', space = 5;
			this.shoe_counter = this.getText(74,space,"0",fontFormat(20, 'regular', 'bebas', false),this.context.theme_color[window.theme].text_color,"right","top");
			temp = this.shoe_counter;
			space = 16;
			this.player_total_text = this.getText(74,temp.y + temp.getMeasuredHeight() + space,"0",fontFormat(20, 'regular', 'bebas', false),this.context.theme_color[window.theme].text_color,"right","top");
			temp = this.player_total_text;
			this.banker_total_text = this.getText(74,temp.y + temp.getMeasuredHeight() + space,"0",fontFormat(20, 'regular', 'bebas', false),this.context.theme_color[window.theme].text_color,"right","top");;
			temp = this.banker_total_text;
			this.tie_total_text = this.getText(74,temp.y + temp.getMeasuredHeight() + space,"0",fontFormat(20, 'regular', 'bebas', false),this.context.theme_color[window.theme].text_color,"right","top");//
			temp = this.tie_total_text;
			this.playerpair_total_text = this.getText(74,temp.y + temp.getMeasuredHeight() + space,"0",fontFormat(20, 'regular', 'bebas', false),this.context.theme_color[window.theme].text_color,"right","top");;
			temp = this.playerpair_total_text;
			this.bankerpair_total_text = this.getText(74,temp.y + temp.getMeasuredHeight() + space,"0",fontFormat(20, 'regular', 'bebas', false),this.context.theme_color[window.theme].text_color,"right","top");;
			this.addChild(statContainer);
			statContainer.addChild(this.shoe_counter, this.tie_total_text, this.player_total_text, this.playerpair_total_text, this.banker_total_text, this.bankerpair_total_text);

			//cosmetics
			this.shoeIndi = new createjs.Text("#", "24px BebasNeue, helvetica", this.context.theme_color[window.theme].text_color);
			this.shoeIndi.set({x: 20, y:this.shoe_counter.y});
			statContainer.addChild(this.shoeIndi);

			this.tieIndicator = new bcRoadmap(10, 2.5);
			this.tieIndicator.play('pearl-t', fontFormat(12, 'black', 'lato', false));
			this.tieIndicator.instance.set({x: 15, y:this.tie_total_text.y});
			statContainer.addChild(this.tieIndicator.instance);

			this.playerIndicator = new bcRoadmap(10, 2.5);
			this.playerIndicator.play('pearl-p', fontFormat(12, 'black', 'lato', false));
			this.playerIndicator.instance.set({x: 15, y:this.player_total_text.y});
			statContainer.addChild(this.playerIndicator.instance);

			this.bankerIndicator = new bcRoadmap(10, 2.5);
			this.bankerIndicator.play('pearl-b', fontFormat(12, 'black', 'lato', false));
			this.bankerIndicator.instance.set({x: 15, y:this.banker_total_text.y});
			statContainer.addChild(this.bankerIndicator.instance);

			this.playerPairIndi = new bcRoadmap(10, 2.5);
			this.playerPairIndi.play('pearl-h', fontFormat(12, 'black', 'lato', false));
			this.playerPairIndi.instance.set({x: 15, y:this.playerpair_total_text.y});
			statContainer.addChild(this.playerPairIndi.instance);

			this.bankerPairIndi = new bcRoadmap(10, 2.5);
			this.bankerPairIndi.play('pearl-q', fontFormat(12, 'black', 'lato', false));
			this.bankerPairIndi.instance.set({x: 15, y:this.bankerpair_total_text.y});
			statContainer.addChild(this.bankerPairIndi.instance);

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
		getLastPred (data, type) {

			let data2 = _.clone(data);

			data2.push({'mark' : type});

			let biglast  = fnFormat().fnFormatBigEyeBoy(data2,6,52);

			for(var i = 0; i < biglast.matrix.length; i++) {
				for(var e = 0; e < biglast.matrix[i].length; e++) {
					if(biglast.matrix[i][e] === undefined) continue;

					if((i) == biglast.row) {
						if(biglast.matrix[0][e+1] == undefined) {
							biglast.last_mark = biglast.matrix[i][e];
						}
					}
				}
			}

			let smallLast = fnFormat().fnFormatSmallRoad(data2,6,28);


			for(var i = 0; i < smallLast.matrix.length; i++) {
				for(var e = 0; e < smallLast.matrix[i].length; e++) {
					if(smallLast.matrix[i][e] === undefined) continue;


					if((i) == smallLast.row) {
						if(smallLast.matrix[0][e+1] == undefined) {
							smallLast.last_mark = smallLast.matrix[i][e]
						}
					}

				}
			}

			let roachlast = fnFormat().fnFormatCockroachPig(data2,6,28);

			for(var i = 0; i < roachlast.matrix.length; i++) {
				for(var e = 0; e < roachlast.matrix[i].length; e++) {
					if(roachlast.matrix[i][e] === undefined) continue;

					if((i) == roachlast.row) {
						if(roachlast.matrix[roachlast.row][e+1] == undefined) {
							// sp.last_child = true;
							roachlast.last_mark = roachlast.matrix[i][e]
						}
					}
				}
			}

			return  {bigroad : biglast.last_mark ? biglast.last_mark : {mark :'w' } , smallroad: smallLast.last_mark ? smallLast.last_mark : {mark :'w' }, roach : roachlast.last_mark ? roachlast.last_mark : {mark :'w' }};

		},
		checkPrediction(data) {

			let marks_p = this.getLastPred(data, "p");
			let marks_b = this.getLastPred(data, "b");
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
		setPercentages (data) {

			data =  _.filter(data, function (e) {
				return e;
			});

			let count = _.groupBy(data, function (e) {
				return e.mark;
			});

			let player_count = 0;
			let banker_count = 0;
			let tie_count = 0;

			let player_pair_cnt = 0;
			let banker_pair_cnt = 0;

			let banker_natural_cnt = 0;
			let player_natural_cnt = 0;
			let natural = {
				player: 0,
				banker: 0

			};

			data.forEach(function (e) {
				if(e.mark == "b" || e.mark == "q" || e.mark == "w"|| e.mark == "e") {
					banker_count ++
				} else if(e.mark  == "p" || e.mark  == "f" || e.mark  == "g" || e.mark  == "h" ) {
					player_count ++
				}
				 else if(e.mark  == "t" || e.mark  == "i" || e.mark  == "j" || e.mark  == "k" ) {
					tie_count ++
				}

				if(e.mark == "q" || e.mark == "w" || e.mark == "f" || e.mark == "g" || e.mark == "i" || e.mark == "j") {
					banker_pair_cnt ++;
				}

				if(e.mark == "w" || e.mark == "e" || e.mark == "g" || e.mark == "h"  || e.mark == "j" || e.mark == "k") {
					player_pair_cnt ++;
				}

				_.forEach(e.natural, (element) => {
				   	natural[element]++;
				})
			});

			banker_natural_cnt = natural['banker'];
			player_natural_cnt = natural['player'];

			this.tie_total_text.text= tie_count;
			this.player_total_text.text = player_count;
			this.playerpair_total_text.text= player_pair_cnt;
			// this.playernatural_total_text.text= player_natural_cnt;
			// ===  banker total texts
			this.banker_total_text.text = banker_count;
			this.bankerpair_total_text.text= banker_pair_cnt;
			// this.bankernautral_total_text.text= banker_natural_cnt;

			let game_stat = {
				total_games: parseInt(banker_count)+parseInt(player_count) + parseInt(tie_count),
				banker_win: parseInt(banker_count),
				player_win: parseInt(player_count),
				tie_win	: parseInt(tie_count)
			}

			// this.context.component_dealer_data.setStats(game_stat);
		},
		predictMarks (type) {
			this.clone_marks = _.clone(this.context.roadMarks);
			this.clone_marks.push({num: 0, mark: type})

			this.fnUpdateCaching();
			this.drawPearlRoad(this.clone_marks);
			this.drawBigRoad(this.clone_marks);
			this.drawBigeyeboy(this.clone_marks);
			this.drawSmallRoad(this.clone_marks);
			this.drawCockroachroad(this.clone_marks);

			if(type == "p") {
				setTimeout(()=>{
					this.clone_marks.splice(this.clone_marks.length-1, 1)

					this.fnUpdateCaching();
					this.drawPearlRoad(this.context.roadMarks);
					this.drawBigRoad(this.context.roadMarks);
					this.drawBigeyeboy(this.context.roadMarks);
					this.drawSmallRoad(this.context.roadMarks);
					this.drawCockroachroad(this.context.roadMarks);

					this.player_prediction_clicked = false
				},4000)
			} else {
				setTimeout(()=>{
					this.clone_marks.splice(this.clone_marks.length-1, 1)

					this.fnUpdateCaching();
					this.drawPearlRoad(this.context.roadMarks);
					this.drawBigRoad(this.context.roadMarks);
					this.drawBigeyeboy(this.context.roadMarks);
					this.drawSmallRoad(this.context.roadMarks);
					this.drawCockroachroad(this.context.roadMarks);
					this.banker_prediction_clicked = false
				},4000)
			}

			//reset on click

			let biglast  = _.clone(this.bigeyeboy_container.children);

			biglast = _.find(biglast, (e) => {
				if(e.last_child) {
					return e.clone()
				}
			});

			let smalllast = _.clone(this.smallroad_container.children);

			smalllast = _.find(smalllast, (e) => {
				if(e.last_child) {
					return e.clone()
				}
			});


			let roachlast = _.clone(this.cockroachroad_container.children);

			roachlast = _.find(roachlast, (e) => {
				if(e.last_child) {
					return e.clone()
				}
			});

			let toChange1 = "";
			let toChange2 = "";
			let toChange3 = "";

			if(type == "p") {
				toChange1 = this.player_prediction1;
				toChange2 = this.player_prediction2;
				toChange3 = this.player_prediction3;
			} else {

				toChange1 = this.banker_prediction1
				toChange2  = this.banker_prediction2
				toChange3 = this.banker_prediction3
				// this.banker_prediction3.graphics.clear().beginFill("#d33030").drawRoundRect(0,0,5,20,2);
			}

			createjs.Tween.get(toChange1)
			.wait(100)
			.to({ alpha : 1 },150)
			.to({ alpha : 0 },150)
			.to({ alpha : 1 },150)
			.to({ alpha : 0 },150)
			.to({ alpha : 1 },150)
			.call((_this) => {
			},[this])


			createjs.Tween.get(toChange2)
			.wait(100)
			.to({ alpha : 1 },150)
			.to({ alpha : 0 },150)
			.to({ alpha : 1 },150)
			.to({ alpha : 0 },150)
			.to({ alpha : 1 },150)
			.call((_this) => {
			},[this])

			createjs.Tween.get(toChange3)
			.wait(100)
			.to({ alpha : 1 },150)
			.to({ alpha : 0 },150)
			.to({ alpha : 1 },150)
			.to({ alpha : 0 },150)
			.to({ alpha : 1 },150)
			.call((_this) => {
			},[this])

		},
		drawBigeyeboy (data) {

			let mark_data = null;
			// let mark_data2 = null;
			this.bigeyeboy_container.removeAllChildren();

			mark_data = fnFormat().fnFormatBigEyeBoy(data,6,86);
			// mark_data2 = fnFormat().fnFormatBigEyeBoy(data,6,20);

			for(var i = 0; i < mark_data.matrix.length; i++) {
				for(var e = 0; e < mark_data.matrix[i].length; e++) {
					if(mark_data.matrix[i][e] === undefined) continue;

					var roadmap = new bcRoadmap(3);
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
				}
			}

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
		drawSmallRoad(data) {

			let mark_data = null;
			mark_data = fnFormat().fnFormatSmallRoad(data,6,44);
			this.smallroad_container.removeAllChildren();

			for(var i = 0; i < mark_data.matrix.length; i++) {
				for(var e = 0; e < mark_data.matrix[i].length; e++) {
					if(mark_data.matrix[i][e] === undefined) continue;

					var roadmap = new bcRoadmap(3.5);
					roadmap.play('small-'+mark_data.matrix[i][e].mark.toLowerCase());
					let sp = roadmap.instance;
					sp.y = (i * 7.5);
					sp.x = (e * 7.5) + 1;

					if((i) == mark_data.row) {
						if(mark_data.matrix[0][e+1] == undefined) {
							sp.last_child = true;
							sp.mark = mark_data.matrix[i][e].mark;
						}
					}

					this.smallroad_container.addChild(sp);

				}
			}

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
		},
		drawCockroachroad(data) {
			let mark_data = null;
			mark_data = fnFormat().fnFormatCockroachPig(data,6,44);

			this.cockroachroad_container.removeAllChildren();

			for(var i = 0; i < mark_data.matrix.length; i++) {
				for(var e = 0; e < mark_data.matrix[i].length; e++) {
					if(mark_data.matrix[i][e] === undefined) continue;

					var roadmap = new bcRoadmap(3.5);
					roadmap.play('roach-'+mark_data.matrix[i][e].mark.toLowerCase());
					let sp = roadmap.instance;
					sp.y = (i * 7.5);
					sp.x = (e * 7.5) + 1;

					// if((i) == mark_data.row) {
					// 	if(mark_data.matrix[mark_data.row][e+1] == undefined) {
					// 		sp.last_child = true;
					// 		sp.mark = mark_data.matrix[i][e].mark;
					// 	}
					// }

					if((i) == mark_data.row && (e) == mark_data.col) {
						if(mark_data.matrix[mark_data.row][e+1] == undefined) {
							sp.last_child = true;
							sp.mark = mark_data.matrix[i][e].mark;
						}
					}

					this.cockroachroad_container.addChild(sp);
				}
			}

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
		drawPearlRoad(data) {

			let mark_data = null;
			this.pearlroad_container.removeAllChildren();

			let slaveJson = {
				'supersix' : {
					'b': 'l',
					'q': 'm',
					'w': 'n',
					'e': 'o',
				},
				'bonus' : {
					'b': 'l',
					'q': 'm',
					'w': 'n',
					'e': 'o',
				},
				slave: window.slave
			}

			mark_data = fnFormat(slaveJson).fnFormatBCPearlRoad(data,6,16);
			for(var i = 0; i < mark_data.matrix.length; i++) {
				for(var e = 0; e < mark_data.matrix[i].length; e++) {

					if(mark_data.matrix[i][e] === undefined) continue;

					var roadmap = new bcRoadmap(13, 4);
					roadmap.play('pearl-'+mark_data.matrix[i][e].mark.toLowerCase());
					let sp = roadmap.instance;
					sp.x = (e * 30) + 2;
					sp.y = (i * 30) + 4;

					if((i+1) == mark_data.row) {
						if(mark_data.matrix[i+1][e] == undefined) {
							sp.last_child = true;
						}
					}

					this.pearlroad_container.addChild(sp);
				}
			}

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
		drawBigRoad (data) {

			this.bigroad_container.removeAllChildren();

			let slaveJson = {
				'supersix' : {
					'b': 'l',
					'q': 'm',
					'w': 'n',
					'e': 'o',
				},
				'bonus' : {
					'b': 'l',
					'q': 'm',
					'w': 'n',
					'e': 'o',
				},
				slave: window.slave
			}

			data = fnFormat(slaveJson).fnFormatBCBigRoad(data, 6, 44);
			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;

					let sp = null;
					var roadmap = new bcRoadmap(6, 2);
					roadmap.play('big-'+data.matrix[i][e].mark.toLowerCase());
					roadmap.ties(data.matrix[i][e].ties, {color:this.context.theme_color[window.theme].text_color, width : 2, height : 16});
					sp = roadmap.instance;
					sp.x = (e * 15)+1;
					sp.y = (i * 15)+1;

					this.bigroad_container.addChild(sp);

					if((i) == data.row) {
						if(data.matrix[0][e+1] == undefined) {
							sp.last_child = true;
						}
					}

				}
			}


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
		shoeChange () {

    	this.pearlroad_container.removeAllChildren();
    	this.bigeyeboy_container.removeAllChildren();
    	this.smallroad_container.removeAllChildren();
    	this.bigroad_container.removeAllChildren();
    	this.cockroachroad_container.removeAllChildren();
    	this.shoe_counter.text = 0;

      this.tie_total_text.text = 0;
      this.player_total_text.text = 0;
      this.playerpair_total_text.text = 0;
      this.banker_total_text.text = 0;
      this.bankerpair_total_text.text = 0;

			this.player_prediction1.fillCmd.style = this.context.theme_color[window.theme].base_color;
			this.player_prediction2.fillCmd.style = this.context.theme_color[window.theme].base_color;
			this.player_prediction3.fillCmd.style = this.context.theme_color[window.theme].base_color;

			this.banker_prediction1.fillCmd.style = this.context.theme_color[window.theme].base_color
			this.banker_prediction2.fillCmd.style = this.context.theme_color[window.theme].base_color
			this.banker_prediction3.fillCmd.style = this.context.theme_color[window.theme].base_color

			if(this.cacheCanvas) {
				this.updateCache();
			}

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

			this.lines.graphics.clear().ss(.8).s((this.context.theme_color[new_theme].bar_color)).moveTo(0,29)
			//pearl
			for(var i = 1; i < row; i++) {
				let adjust = i === 0 ? 1 : i === row ? -1 : 0
				this.lines.graphics.moveTo(0,h*i + adjust).lineTo(w*col,h*i + adjust)
			} // end for

			this.lines.graphics.moveTo(w,0);

			for(var x = 1; x <= col; x++) {
				this.lines.graphics.moveTo(w*x,0).lineTo(w*x,h*row)
			}

			//bigroad
			let moveTo = this.footerBg2.x + 45 + 45 - 10;
			row = 12;
			col = 42;
			w = 15, h = 15;

			this.lines.graphics.moveTo(moveTo,16)
			for(var i = 1; i < row ; i++) {
				let adjust = i === 0 ? 1 : i === row ? -1 : 0
				this.lines.graphics.moveTo(moveTo,h*i + adjust).lineTo((col*w)+ moveTo,h*i + adjust)
			}
			this.lines.graphics.moveTo(moveTo,0)
			for(var x = 1; x < col ; x++) {
				this.lines.graphics.moveTo(moveTo + (x*w),0).lineTo(moveTo + (x*w), (row*h))
			}

			this.addChildAt(this.lines, index);

			this.statBg.graphics.clear().ss(0.8).s(this.context.theme_color[new_theme].bar_color).drawRect(0.8,0.8,90-0.8,180-1.6);

			this.shoe_counter.color = this.context.theme_color[new_theme].text_color;
			this.player_total_text.color = this.context.theme_color[new_theme].text_color;
			this.banker_total_text.color = this.context.theme_color[new_theme].text_color;
			this.tie_total_text.color = this.context.theme_color[new_theme].text_color;
			this.playerpair_total_text.color = this.context.theme_color[new_theme].text_color;
			this.bankerpair_total_text.color = this.context.theme_color[new_theme].text_color;
			this.shoeIndi.color = this.context.theme_color[new_theme].text_color;

			this.player_pred_bg.fillCmd.style = this.context.theme_color[new_theme].base_color;

			this.banker_pred_bg.fillCmd.style = this.context.theme_color[new_theme].base_color;

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
