import {Game} from './Game';
import fnFormat from  '../../../factories/formatter';
import {dice} from '../../../factories/dice';
import { fontFormat, numberWithCommas } from '../../../factories/factories';

class Sicbo extends Game {
	constructor(data, x, y, w, h, parent, self, isJunket, roomdata) {
		super(data, x, y, w, h, parent, self, isJunket, roomdata);


		/*** room info ***/
		this.roomInfo = new createjs.Container();
		this.roomInfo.visible = true;
		this.roomInfo.y = h - 38;
		this.roadmap_container.addChild(this.roomInfo);

		if(window.room_info == 1) {
			this.usersIco = new createjs.Bitmap(this.ctx.load.getResources("mobile_user_ico"));
			this.usersIco.x = 135;
			this.usersIco.y = 10;
			this.usersIco.scaleX = this.usersIco.scaleY = 1;
			this.roomInfo.addChild(this.usersIco);

			this.usersCount = this.getText(this.usersIco.x + 34,this.usersIco.y + 14, 0,"26px bebas-regular","#fff","center","middle");
			this.roomInfo.addChild(this.usersCount);

			this.infoBigMark = new createjs.Shape();
			this.infoBigMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 12);
			this.infoBigMark.x = this.usersIco.x + 143;
			this.infoBigMark.y = this.usersIco.y + 11;
			this.roomInfo.addChild(this.infoBigMark);

			this.bigMarkText = this.getText(this.infoBigMark.x,this.infoBigMark.y, window.language.locale == "zh" ? "庄" : "B","18px lato-bold","#fff","center","middle");
			this.roomInfo.addChild(this.bigMarkText);

			this.bigBetAmt = this.getText(this.infoBigMark.x + 18,this.infoBigMark.y + 2, "0/0","26px Bebasneue","#fff","left","middle");
			this.roomInfo.addChild(this.bigBetAmt);

			this.infoSmallMark = new createjs.Shape();
			this.infoSmallMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 12);
			this.infoSmallMark.x = this.infoBigMark.x + 204;
			this.infoSmallMark.y = this.infoBigMark.y + 1;
			this.roomInfo.addChild(this.infoSmallMark);

			this.smallMarkText = this.getText(this.infoSmallMark.x,this.infoSmallMark.y, window.language.locale == "zh" ? "庄" : "S","18px lato-bold","#fff","center","middle");
			this.roomInfo.addChild(this.smallMarkText);

			this.smallBetAmt = this.getText(this.smallMarkText.x + 18,this.smallMarkText.y + 2, "0/0","26px Bebasneue","#fff","left","middle");
			this.roomInfo.addChild(this.smallBetAmt);
		} else {
			let textFont = 21;
			let percentFont = 21;
			if(window.language2.locale == "jp") {
				textFont = 18;
			}

			let smallText = this.getText(135,20, window.language2.sicbo_betlayout_small,fontFormat(textFont, 'black', 'lato', true),"#fff","left","middle");
			this.roomInfo.addChild(smallText);

			this.smallPercent = this.getText(smallText.getMeasuredWidth() + smallText.x + 60,smallText.y, "0%",fontFormat(percentFont, 'black', 'lato', true),"#fff","right","middle");
			this.roomInfo.addChild(this.smallPercent);

			this.small_progressbar_bg = new createjs.Shape();
			this.small_progressbar_bg.graphics.setStrokeStyle(2).beginStroke("#1665c1").drawRoundRectComplex(0, 0, 120, 25, 5, 5, 5, 5);
			this.small_progressbar_bg.x = this.smallPercent.x + 5;
			this.small_progressbar_bg.y = 8;
			this.roomInfo.addChild(this.small_progressbar_bg);

			//mask shape
			this.small_progressbar_mask = new createjs.Shape();
			this.small_progressbar_mask.graphics.drawRoundRect(0, 0, 120, 25, 5);
			this.small_progressbar_mask.x = this.small_progressbar_bg.x;
			this.small_progressbar_mask.y = 8;

			this.small_progressbar = new createjs.Shape();
			this.small_progressbar.graphics.f("#1665c1").drawRect(0, 0, 120, 25);
			this.small_progressbar.setBounds(0, 0, 120, 25);
			this.small_progressbar.x = this.small_progressbar_bg.x;
			this.small_progressbar.y = 8;
			this.small_progressbar.scaleX = 0;
			this.roomInfo.addChild(this.small_progressbar);
			//masking
			this.small_progressbar.mask = this.small_progressbar_mask;

			this.big_progressbar_bg = new createjs.Shape();
			this.big_progressbar_bg.graphics.setStrokeStyle(2).beginStroke("#d32f2e").drawRoundRectComplex(0, 0, 120, 25, 5, 5, 5, 5);
			this.big_progressbar_bg.x = this.small_progressbar.x + this.small_progressbar.getBounds().width + 10;
			this.big_progressbar_bg.y = 7;
			this.roomInfo.addChild(this.big_progressbar_bg);

			//mask shape
			this.big_progressbar_mask = new createjs.Shape();
			this.big_progressbar_mask.graphics.drawRoundRect(0, 0, 120, 25, 5);
			this.big_progressbar_mask.x = this.big_progressbar_bg.x;
			this.big_progressbar_mask.y = 8;

			this.big_progressbar = new createjs.Shape();
			this.big_progressbar.graphics.f("#d32f2e").drawRect(0, 0, 120, 25);
			this.big_progressbar.setBounds(0, 0, 120, 25);
			this.big_progressbar.x = this.big_progressbar_bg.x;
			this.big_progressbar.y = 8;
			this.big_progressbar.scaleX = 0;
			this.roomInfo.addChild(this.big_progressbar);
			//masking
			this.big_progressbar.mask = this.big_progressbar_mask;

			this.bigPercent = this.getText(this.big_progressbar.x + this.big_progressbar.getBounds().width + 10,smallText.y, "0%",fontFormat(percentFont, 'black', 'lato', true),"#fff","left","middle");
			this.roomInfo.addChild(this.bigPercent);

			let bigText = this.getText(this.bigPercent.x + 60,smallText.y, window.language2.sicbo_betlayout_big,fontFormat(textFont, 'black', 'lato', true),"#fff","left","middle");
			this.roomInfo.addChild(bigText);
		}
		/*** end room info ***/

		this.roadmapcon = new createjs.Container();
		this.roadmapcon.x = 135;
		this.roadmapcon.y = 50;
		this.roadmap_container.addChild(this.roadmapcon);

		// === hotcold
		this.hot_bg = new createjs.Shape();
		this.hot_bg.graphics.ss(.8).s("#4b4744").beginFill("transparent").drawRect(0,0,44,175);
		this.roadmapcon.addChild(this.hot_bg);

		let hotLblBg = new createjs.Shape();
		hotLblBg.graphics.ss(.8).s("#4b4744").beginFill('#d62e2e').drawRect(0,0,44,30);
		this.roadmapcon.addChild(hotLblBg);

		this.cold_bg = new createjs.Shape();
		this.cold_bg.graphics.beginFill("transparent").drawRect(0,0,44,175);
		this.cold_bg.x = 44;
		this.roadmapcon.addChild(this.cold_bg);

		let coldLblBg = new createjs.Shape();
		coldLblBg.graphics.ss(.8).s("#4b4744").beginFill('#1767c0').drawRect(0,0,44,30);
		coldLblBg.x = 44;
		this.roadmapcon.addChild(coldLblBg);

		this.hotCold_container = new createjs.Container();
		this.hotCold_container.x = 0;
		this.hotCold_container.y = 38;
		this.roadmapcon.addChild(this.hotCold_container);

		let textLabel = "";
		if(window.language2.locale == "jp") {
			textLabel = "bold 11px lato-regular";
		} else {
			textLabel = "bold 15px lato-regular";
		}
		let hotLabel = new createjs.Text(window.language.sicbo.hotcaps, textLabel, "#fff");
		hotLabel.x = 22;
		hotLabel.y = 5;
		hotLabel.textAlign = "center"
		this.roadmapcon.addChild(hotLabel);

		let coldLabel = new createjs.Text(window.language.sicbo.coldcaps, textLabel, "#fff");
		coldLabel.x = 66;
		coldLabel.y = 5;
		coldLabel.textAlign = "center"
		this.roadmapcon.addChild(coldLabel);

		// === container for roadmap datas
		this.sizeRoadmapCon = new createjs.Container();
		this.sizeRoadmapCon.x = -85;
		this.roadmapcon.addChild(this.sizeRoadmapCon);

		this.parityRoadmapCon = new createjs.Container();
		this.parityRoadmapCon.x = 185;
		this.roadmapcon.addChild(this.parityRoadmapCon);

		this.parity_container = new createjs.Container();
		this.roadmapcon.addChild(this.parity_container);

		this.size_container = new createjs.Container();
		this.sizeRoadmapCon.addChild(this.size_container);

		// === Lines for roadmap
		let row = 6;
		let sizeCol = 12;
		let wh = 29;
		let height = 29.2;

		// === drawing size lines
		let sizeLines = new createjs.Shape();
		sizeLines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(174,wh)
		this.sizeRoadmapCon.addChild(sizeLines);

		for (var i = 0; i <= row; i++) {
			sizeLines.graphics.moveTo(174,height*i).lineTo((wh*sizeCol) + 174,height*i)
		} // end for

		sizeLines.graphics.moveTo(29,0);
		for (var x = 0; x <= sizeCol; x++) {
			sizeLines.graphics.moveTo((wh*x) + 174,0).lineTo((wh*x)+174,height*row)
		}

		this.resultCountBg = new createjs.Shape();
		this.resultCountBg.graphics.beginFill("transparent").drawRect(0,0,65,175);
		this.resultCountBg.x = 435;
		this.roadmapcon.addChild(this.resultCountBg);

		let bigMark = new createjs.Shape();
		bigMark.graphics.ss(1).s('#fff').beginFill('#d22f32').drawCircle(0,0,12);
		bigMark.x = this.resultCountBg.x + 20;
		bigMark.y = this.resultCountBg.y + 23;
		this.roadmapcon.addChild(bigMark);

		let bigMarkText = this.getText(bigMark.x,bigMark.y, window.language.locale == "zh" ? "大" : "B","17px lato-black","#fff","center","middle");
		this.roadmapcon.addChild(bigMarkText);

		let smallMark = new createjs.Shape();
		smallMark.graphics.ss(1).s('#fff').beginFill('#1665c1').drawCircle(0,0,12);
		smallMark.x = bigMark.x;
		smallMark.y = bigMark.y + 40;
		this.roadmapcon.addChild(smallMark);

		let smallMarkText = this.getText(smallMark.x,smallMark.y, window.language.locale == "zh" ? "小" : "S","17px lato-black","#fff","center","middle");
		this.roadmapcon.addChild(smallMarkText);

		let oddMark = new createjs.Shape();
		oddMark.graphics.ss(1).s('#fff').beginFill('#d22f32').drawCircle(0,0,12);
		oddMark.x = smallMark.x;
		oddMark.y = smallMark.y + 40;
		this.roadmapcon.addChild(oddMark);

		let oddMarkText = this.getText(oddMark.x,oddMark.y, window.language.locale == "zh" ? "单" : "O","17px lato-black","#fff","center","middle");
		this.roadmapcon.addChild(oddMarkText);

		let evenMark = new createjs.Shape();
		evenMark.graphics.ss(1).s('#fff').beginFill('#1665c1').drawCircle(0,0,12);
		evenMark.x = oddMark.x;
		evenMark.y = oddMark.y + 40;
		this.roadmapcon.addChild(evenMark);

		let evenMarkText = this.getText(evenMark.x,evenMark.y, window.language.locale == "zh" ? "双" : "E","17px lato-black","#fff","center","middle");
		this.roadmapcon.addChild(evenMarkText);

		// data
		this.bigCount = this.getText(bigMarkText.x + 18,bigMarkText.y + 2, 0,"25px bebas-regular","#000","left","middle");
		this.roadmapcon.addChild(this.bigCount);

		this.smallCount = this.getText(smallMarkText.x + 18,smallMarkText.y + 2, 0,"25px bebas-regular","#000","left","middle");
		this.roadmapcon.addChild(this.smallCount);

		this.oddCount = this.getText(oddMarkText.x + 18,oddMarkText.y + 2, 0,"25px bebas-regular","#000","left","middle");
		this.roadmapcon.addChild(this.oddCount);

		this.evenCount = this.getText(evenMarkText.x + 18,evenMarkText.y + 2, 0,"25px bebas-regular","#000","left","middle");
		this.roadmapcon.addChild(this.evenCount);

		// draw shaking animation dice
		let diceResult = null;
		data.marks = _.filter(data.marks,(m)=>{
			if('game_info' in m) {
				if(m.game_info && typeof m.game_info === 'string') {
					m.game_info = JSON.parse(m.game_info)
				}
				return m;
			}
		});

		if(data.marks.length > 3) {
			diceResult  = data.marks.slice(Math.max(data.marks.length - 1, 1)).reverse();
		} else if (data.marks.length <= 3) {
			diceResult = data.marks.reverse();
		}

		this.dice1 = new dice(1, 40, 40);
		this.dice1.diceCon.x = 137;
		this.dice1.diceCon.y = 126;
		this.dice1.diceCon.oy = 126;
		this.dice1.diceCon.regX = this.dice1.diceCon.regY = 20;

		this.dice2 = new dice(2, 40, 40);
	  this.dice2.diceCon.x = this.dice1.diceCon.x + 65;
	  this.dice2.diceCon.y = this.dice1.diceCon.y;
		this.dice2.diceCon.oy = this.dice1.diceCon.y;
	  this.dice2.diceCon.regX = this.dice2.diceCon.regY = 20;

		this.dice3 = new dice(3, 40, 40);
	  this.dice3.diceCon.x = this.dice2.diceCon.x + 65;
	  this.dice3.diceCon.y = this.dice2.diceCon.y;
		this.dice3.diceCon.oy = this.dice2.diceCon.y;
	  this.dice3.diceCon.regX = this.dice3.diceCon.regY = 20;

	  this.dealingCardAnimation.addChild(this.dice1.diceCon, this.dice2.diceCon, this.dice3.diceCon);

		this.totalText = new createjs.Text("0", "45px bebas-regular", "#fff");
		this.totalText.visible = false;
		this.totalText.textBaseline  = "middle";
		this.totalText.textAlign  = "center";
		this.totalText.x = this.dice2.diceCon.x - 15;
		this.totalText.y = this.dice2.diceCon.y + 5;
		this.totalText.scaleX = this.totalText.scaleY = 0;
		this.dealingCardAnimation.addChild(this.totalText);

		this.sizeText = new createjs.Text("B", "50px bebas-regular", "#fff");
		this.sizeText.visible = false;
		this.sizeText.textBaseline  = "middle";
		this.sizeText.textAlign  = "center";
		this.sizeText.x = this.totalText.x + 25;
		this.sizeText.y = this.totalText.y;
		this.sizeText.scaleX = this.sizeText.scaleY = 0;
		this.dealingCardAnimation.addChild(this.sizeText);

		this.animation = [];

		this.setHotCold(data.marks);
		this.drawRoadMap(fnFormat().fnFormatSicbo(data.marks,11,6).size, "size");
		if(window.room_info == 1) {
			this.setRoomInfo(this.data.betInfo);
		}

		if(this.roadmap_container.cacheCanvas) {
			this.roadmap_container.updateCache();
		}
		this.stage.update();
	}

	getText(x,y,text,font,color,align,baseLine) {
		let textCt =  new createjs.Text(text,font,color);
		textCt.set({x:x,y:y});
		textCt.textAlign = align;
		textCt.textBaseline = baseLine;
		return textCt;
	}

	setHotCold(data) {
		if(this.hotCold_container) {
			this.hotCold_container.removeAllChildren();
		}

		data = _.filter(data,(m)=>{
			if('game_info' in m) {
				if(m.game_info && typeof m.game_info === 'string') {
					m.game_info = JSON.parse(m.game_info)
				}
				return !m.isVoid;
			}
		});

		data.forEach(function (row) {
			row.total = _.reduce( [row.game_info.one, row.game_info.two, row.game_info.three] , function (sum, n) {
				return parseInt(sum) + parseInt(n);
			});
		});

		let res =_.sortBy( _.groupBy(data, function(row) {
			return row.total
		}), 'length');

		let cold_res = res.slice(0,4);

		let hot_res = res.slice(Math.max(res.length - 4, 1));
		hot_res = _.map(hot_res, function (e) {
			return isNaN(e[0].total) ? 1 : e[0].total;
		});

		hot_res = hot_res.reverse();

		hot_res.forEach( (e, i) => {
			let text = new createjs.Text(e, "25px BebasNeue" ,"#d32f31");
			text.y = i*35;
			text.x = 22;
			text.textAlign = "center";
			this.hotCold_container.addChild(text)
		});

		cold_res = _.map(cold_res, function (e) {
			return isNaN(e[0].total) ? 1 : e[0].total;
		});

		cold_res.forEach( (e, i) => {
			let text = new createjs.Text(e, "25px BebasNeue" ,"#1465c0");
			text.y = i*35;
			text.x = 66;
			text.textAlign = "center";
			this.hotCold_container.addChild(text)
		});

		// Set roadmap count
		this.setRoadmapCount(data);
	}

	drawRoadMap(arr, sel) {
		this[sel+"_container"].removeAllChildren();
		let color = "";
		let text_val = "";
		let font_size = "15px lato-bold";
		let fontColor = '#fff';

		if (sel == 'sum' || sel == 'dice') {
			fontColor = '#000';
		}

		for(var x = 0; x < arr.length; x++) {
			if(arr[x] !== undefined) {
				for(var i = 0; i < arr[x].length; i++) {
					if(!arr[x][i]) continue;

					if(arr[x][i] !== undefined) {
						color = "#e5b241";
						text_val = arr[x][i];

						if(text_val.length > 2) {
							font_size = "13px lato-bold"
						}

						if (arr[x][i] == "odd") {
							font_size = window.language.locale == "zh" ? fontFormat(21, 'regular', 'noto') : "18px lato-bold";
							color = "#d32f2f";
							text_val = window.language.locale == "zh" ? "单" : "O";
						}
						if (arr[x][i] == "even") {
							font_size = window.language.locale == "zh" ? fontFormat(21, 'regular', 'noto') : "18px lato-bold";
							color = "#1565c0";
							text_val = window.language.locale == "zh" ? "双" : "E";
						}
						if (arr[x][i] == "big") {
							font_size = window.language.locale == "zh" ? fontFormat(21, 'regular', 'noto') : "18px lato-bold";
							color = "#d32f2f";
							text_val = window.language.locale == "zh" ? "大" : "B";
						}
						if (arr[x][i] == "small") {
							font_size = window.language.locale == "zh" ? fontFormat(21, 'regular', 'noto') : "18px lato-bold";
							color = "#1565c0";
							text_val = window.language.locale == "zh" ? "小" : "S";
						}
						if (arr[x][i] == "triple") {
							font_size = window.language.locale == "zh" ? fontFormat(21, 'regular', 'noto') : "18px lato-bold";
							color = "#41a257";
							text_val = window.language.locale == "zh" ? "和" : "T";
						}

						arr[x][i] = new createjs.Shape();
						arr[x][i].graphics.beginFill(color).drawCircle(0,0,13);
						arr[x][i].x = (x * 29) + 3;
						arr[x][i].y = (i * 29) + 3;

						arr[x][i].text = new createjs.Text(text_val, font_size, fontColor);
						arr[x][i].text.x = arr[x][i].x;
						arr[x][i].text.y = arr[x][i].y;
						arr[x][i].text.textAlign = "center";
						arr[x][i].text.textBaseline = "middle";

						this[sel+"_container"].addChild(arr[x][i], arr[x][i].text);
					}
				} //end for
			} //end if
		} //end for

		this[sel+"_container"].x = 185;
		this[sel+"_container"].y = 12;
	}

	setRoadmapCount(data) {
		let marks = data;

		let big_count = 0;
		let small_count = 0;
		let odd_count = 0;
		let even_count = 0;
		let double_count = 0;
		let triple_count = 0;

		marks = _.filter(marks, (row) => {
			if(typeof row.game_info === 'string') {
				row.game_info = JSON.parse(row.game_info);
			}
			return row.game_info && !row.isVoid
		});

		let data2 = _.map(marks, function(row) {
			return row.game_info;
		});

		data2.forEach((e) => {
			e.dice = [e.one, e.two, e.three]
		});

		// Big / Small & Odd / Even
		for (var i = marks.length - 1; i >= 0; i--) {
			if (marks[i].total > 10) {
				big_count++;
			} else {
				small_count++;
			}

			if ((parseInt(marks[i].total) % 2) == 1) {
				odd_count++;
			}
			else {
				even_count++;
			}
		}

		// Double / Triple
		data2.forEach(function(e) {
			if (_.uniq(e.dice).length == 2) {
				double_count++;
			} else if (_.uniq(e.dice).length == 1) {
				triple_count++;
			}
		});

		this.bigCount.text = big_count;
		this.smallCount.text = small_count;
		this.oddCount.text = odd_count;
		this.evenCount.text = even_count;

		// room info
		if(window.room_info == 0) {
			let smallTotalPercent = parseFloat(Math.round(small_count/(data.length ? data.length : 1).toFixed(2) * 100));
			let bigTotalPercent = parseFloat(Math.round(big_count/(data.length ? data.length : 1).toFixed(2) * 100));
			let totalPercentage = smallTotalPercent + bigTotalPercent;

			if(totalPercentage > 100) {
				if(smallTotalPercent > bigTotalPercent) {
					smallTotalPercent -= 1;
				}
				if(bigTotalPercent > smallTotalPercent) {
					bigTotalPercent -= 1;
				}
			} else if(totalPercentage < 100) {
				if(smallTotalPercent < bigTotalPercent) {
					smallTotalPercent += 1;
				}
				if(bigTotalPercent < smallTotalPercent) {
					bigTotalPercent += 1;
				}
			} else { }

			// percentage background
			this.small_progressbar.scaleX = small_count/this.data.marks.length;
			this.big_progressbar.scaleX = big_count/this.data.marks.length;

			this.smallPercent.text = smallTotalPercent + "%";
			this.bigPercent.text = bigTotalPercent + "%";
		}
	}

	animateDealing () {
		createjs.Tween.get(this.dealingCardAnimationBg).wait(100)
		.to({ scaleX: 1 },300)

		createjs.Tween.get(this.dealingCardAnimation).wait(200)
		.to({ visible: true },150).wait(100)
		.to({ alpha: 1 },300)

		for (var dices of [this.dice1.diceCon, this.dice2.diceCon, this.dice3.diceCon]) {
			dices.y = 126;
			dices.rotation = 0;
			createjs.Tween.get(dices).wait(4500)
			.to({ rotation : 180, y: 40 },500)
			.to({ rotation : 220, y: 40 },100)
			.to({ rotation : 360, y: 126 },500)
			.to({ y: 120 },100)
			.to({ y: 126 },100)
			.to({ rotation : 540, y: 40 },500)
			.to({ rotation : 580, y: 40 },100)
			.to({ rotation : 720, y: 126 },500)
			.to({ y: 120 },100)
			.to({ y: 126 },100)
			.to({ rotation : 900, y: 40 },500)
			.to({ rotation : 940, y: 40 },100)
			.to({ rotation : 1080, y: 126 },500)
			.to({ y: 120 },100)
			.to({ y: 126 },100).wait(10000)
			.to({ alpha : 0 },400)
		}

		setTimeout( ()=> {
			this.animation.push(setInterval(() => {
				let anim = ['One','Two','Three','Four','Five','Six'];
				var rand = Math.floor(Math.random() * anim.length);

				let bg1 = this.dice1.diceCon.children[0];
				this.dice1.diceCon.removeAllChildren();
				this.dice1.diceCon.addChild(bg1)
				this.dice1[`setDice${anim[rand]}`]();

				rand = Math.floor(Math.random() * anim.length);

				let bg2 = this.dice2.diceCon.children[0];
				this.dice2.diceCon.removeAllChildren();
				this.dice2.diceCon.addChild(bg2)
				this.dice2[`setDice${anim[rand]}`]();

				rand = Math.floor(Math.random() * anim.length);

				let bg3 = this.dice3.diceCon.children[0];
				this.dice3.diceCon.removeAllChildren();
				this.dice3.diceCon.addChild(bg3)
				this.dice3[`setDice${anim[rand]}`]();
			},200))
		}, 4500);
	}

	endBettingTime (data) {
		super.endBettingTime(data);
		this.status.text = window.language2.lobby_gamestatus_shaking;
		this.animateDealing();
	}

	resetAnimation () {

		this.isDealAnimation = false;

		this.dealingCardAnimationBg.scaleX = 0;
		this.dealingCardAnimation.visible = false
		this.dealingCardAnimation.alpha = 0

		this.clearAll();
	}

	inputItem(data) {
		super.inputItem(data);

		//animates on inputitem
		if(!this.isDealAnimation) {
			this.animateDealing();
			this.isDealAnimation = true;
		}
	}

	displayResult(data) {
		super.displayResult(data);

		this.dealingCardAnimationBg.scaleX = 1;
		this.dealingCardAnimation.visible = true;
		this.dealingCardAnimation.alpha = 1;

		this.totalText.visible = true;
		this.sizeText.visible = true;

		let winner = data.gameResult.winner.split('');
		let winSum = _.reduce(winner, function(sum, n) { return parseInt(sum) + parseInt(n); });

		let color = winSum < 11 ? '#1665c1' : '#d32f2e';

		this.totalText.text = winSum;
		this.totalText.color = color;
		this.sizeText.text = winSum < 11 ? 'S' : 'B';
		this.sizeText.color = color;

		if(winSum < 10) {
			this.sizeText.x = this.totalText.x + this.totalText.getMeasuredWidth() + 6;
		} else {
			this.sizeText.x = this.totalText.x + this.totalText.getMeasuredWidth() - 4;
		}

		this.clearAll();

		createjs.Tween.removeTweens(this.dice1.diceCon)
		createjs.Tween.removeTweens(this.dice2.diceCon)
		createjs.Tween.removeTweens(this.dice3.diceCon)

		if(!_.isEmpty(data.gameResult.winner)) {
			let dice_res = data.gameResult.winner.split("");

			let resultTotal = _.reduce(dice_res, function(sum, n) {
				return parseInt(sum) + parseInt(n);
			});
			let is_triple = _.uniq(dice_res).length == 1 ? true : false;

			if(is_triple) {
				this.status.text = `${window.language2.sicbo_betlayout_triple} ${window.language.player_info.win}`;
			} else if(resultTotal <= 10) {
				this.status.text = `${window.language2.sicbo_betlayout_small} ${window.language.player_info.win}`;
			} else {
				this.status.text = `${window.language2.sicbo_betlayout_big} ${window.language.player_info.win}`;
			}
		}

		// allTables.marks.shift();
		// allTables.marks.push(data.mark);

		// setTimeout( ()=> {
		this.setHotCold(this.data.marks);
		this.drawRoadMap(fnFormat().fnFormatSicbo(this.data.marks,11,6).size, "size");
		// }, 12000)


		let last150 = null;
		if(this.data.marks.length > 3) {
			last150 = this.data.marks.slice(Math.max(this.data.marks.length - 1, 1)).reverse();
		} else if (this.data.marks.length <= 3){
			last150 = this.data.marks.reverse();
		}

		this.dealingCardAnimation.removeChild(this.dice1.diceCon);
		this.dealingCardAnimation.removeChild(this.dice2.diceCon);
		this.dealingCardAnimation.removeChild(this.dice3.diceCon);

		this.resdice1 = new dice(last150[0].game_info.one, 40, 40);
		this.dice1 = this.resdice1;
		this.dice1.diceCon.x = 137;
		this.dice1.diceCon.y = 126;
		this.dice1.diceCon.scaleX = this.dice1.diceCon.scaleY = 0;
		this.dice1.diceCon.regX = this.dice1.diceCon.regY = 20;
		this.dealingCardAnimation.addChild(this.dice1.diceCon);

		this.resdice2 = new dice(last150[0].game_info.two, 40, 40);
		this.dice2 = this.resdice2;
		this.dice2.diceCon.x = this.dice1.diceCon.x + 65;
		this.dice2.diceCon.y = this.dice1.diceCon.y;
		this.dice2.diceCon.scaleX = this.dice2.diceCon.scaleY = 0;
		this.dice2.diceCon.regX = this.dice2.diceCon.regY = 20;
		this.dealingCardAnimation.addChild(this.dice2.diceCon);

		this.resdice3 = new dice(last150[0].game_info.three, 40, 40);
		this.dice3 = this.resdice3;
		this.dice3.diceCon.x = this.dice2.diceCon.x + 65;
		this.dice3.diceCon.y = this.dice2.diceCon.y;
		this.dice3.diceCon.scaleX = this.dice3.diceCon.scaleY = 0;
		this.dice3.diceCon.regX = this.dice3.diceCon.regY = 20;
		this.dealingCardAnimation.addChild(this.dice3.diceCon);

		for (var dices of [this.dice1.diceCon, this.dice2.diceCon, this.dice3.diceCon]) {
			createjs.Tween.get(dices)
			.to({ scaleX : 1, scaleY : 1 }, 300)
			.to({ y : 70 }, 500)
		}

		for (var winnerText of [this.totalText, this.sizeText]) {
			createjs.Tween.get(winnerText).wait(1000)
			.to({ scaleY:1, scaleX:1 },250)
		}
	}

	displaymodify() {
		super.displaymodify();

		this.setHotCold(this.data.marks);
		this.drawRoadMap(fnFormat().fnFormatSicbo(this.data.marks,11,6).size, "size");
	}

	newRound(data) {
		createjs.Tween.get(this.dealingCardAnimationBg).wait(200)
		.to({ scaleX: 0 },300)
		.call(() => {
			this.stage.update();
		});

		this.dealingCardAnimation.alpha = 0;
		this.dealingCardAnimation.visible = false;

		this.totalText.scaleX = this.totalText.scaleY = 0;
		this.sizeText.scaleX = this.sizeText.scaleY = 0;
	}

	shoechange(data) {
		super.shoechange(data);

		this.hotCold_container.removeAllChildren();
		this["size_container"].removeAllChildren();

		this.bigCount.text = 0;
		this.smallCount.text = 0;
		this.oddCount.text = 0;
		this.evenCount.text = 0;
	}

	setRoomInfo(data) {
		this.bigBetAmt.text = '0/0';
		this.smallBetAmt.text = '0/0';
		this.usersCount.text = '0';

		this.usersCount.text = this.data.totalBettingUsers;
		if(this.data.betInfo.big) {
			this.bigBetAmt.text = `${numberWithCommas(this.data.betInfo.big.totalBets)}/${numberWithCommas(this.data.betInfo.big.totalUsers)}`;
		}
		if(this.data.betInfo.small) {
			this.smallBetAmt.text = `${numberWithCommas(this.data.betInfo.small.totalBets)}/${numberWithCommas(this.data.betInfo.small.totalUsers)}`;
		}
	}

	clearAll () {
		this.animation.forEach((a) => {
			clearInterval(a);
		});
	}
}

export default {Sicbo};
