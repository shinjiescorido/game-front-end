import {Game} from './Game';
import fnFormat from  '../../factories/formatter';
import {dice} from '../../factories/dice';
import { fontFormat, numberWithCommas } from '../../factories/factories';

class Sicbo extends Game {
	constructor(data, x, y, w, h, parent, self, isJunket, roomdata) {
		super(data, x, y, w, h, parent, self, isJunket, roomdata);


		/*** room info ***/
		this.roomInfo = new createjs.Container();
		this.roomInfo.visible = true;
		this.roadmap_container.addChild(this.roomInfo);

		if(window.room_info == 1) {
			this.usersIco = new createjs.Bitmap(this.ctx.load.getResources("user_ico"));
			this.usersIco.x = 415;
			this.usersIco.y = 10;
			this.usersIco.scaleX = this.usersIco.scaleY = 1;
			this.roomInfo.addChild(this.usersIco);

			this.data.usersCount = this.getText(this.usersIco.x + 25,this.usersIco.y + 9, 0,"18px bebas-regular","#fff","center","middle");
			this.roomInfo.addChild(this.data.usersCount);

			this.infoBigMark = new createjs.Shape();
			this.infoBigMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 10);
			this.infoBigMark.x = this.usersIco.x + 70;
			this.infoBigMark.y = this.usersIco.y + 7;
			this.roomInfo.addChild(this.infoBigMark);

			this.bigMarkText = this.getText(this.infoBigMark.x,this.infoBigMark.y, window.language.locale == "zh" ? "庄" : "B","13px lato-bold","#fff","center","middle");
			this.roomInfo.addChild(this.bigMarkText);

			this.data.bigBetAmt = this.getText(this.infoBigMark.x + 27,this.infoBigMark.y + 2, "0/0","17px Bebasneue","#fff","center","middle");
			this.roomInfo.addChild(this.data.bigBetAmt);

			this.infoSmallMark = new createjs.Shape();
			this.infoSmallMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 10);
			this.infoSmallMark.x = this.infoBigMark.x + 116;
			this.infoSmallMark.y = this.infoBigMark.y + 1;
			this.roomInfo.addChild(this.infoSmallMark);

			this.smallMarkText = this.getText(this.infoSmallMark.x,this.infoSmallMark.y, window.language.locale == "zh" ? "庄" : "S","13px lato-bold","#fff","center","middle");
			this.roomInfo.addChild(this.smallMarkText);

			this.data.smallBetAmt = this.getText(this.smallMarkText.x + 27,this.smallMarkText.y + 2, "0/0","17px Bebasneue","#fff","center","middle");
			this.roomInfo.addChild(this.data.smallBetAmt);

			this.infoOddMark = new createjs.Shape();
			this.infoOddMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 10);
			this.infoOddMark.x = this.infoSmallMark.x + 115;
			this.infoOddMark.y = this.infoSmallMark.y;
			this.roomInfo.addChild(this.infoOddMark);

			this.oddMarkText = this.getText(this.infoOddMark.x,this.infoOddMark.y, window.language.locale == "zh" ? '和' : 'O',"13px lato-bold","#fff","center","middle");
			this.roomInfo.addChild(this.oddMarkText);

			this.data.oddBetAmt = this.getText(this.infoOddMark.x + 27,this.infoOddMark.y + 2, "0/0","17px Bebasneue","#fff","center","middle");
			this.roomInfo.addChild(this.data.oddBetAmt);

			this.infoEvenMark = new createjs.Shape();
			this.infoEvenMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 10);
			this.infoEvenMark.x = this.infoOddMark.x + 100;
			this.infoEvenMark.y = this.infoOddMark.y;
			this.roomInfo.addChild(this.infoEvenMark);

			this.evenMarkText = this.getText(this.infoEvenMark.x,this.infoEvenMark.y, window.language.locale == "zh" ? '和' : 'E',"13px lato-bold","#fff","center","middle");
			this.roomInfo.addChild(this.evenMarkText);

			this.data.evenBetAmt = this.getText(this.infoEvenMark.x + 27,this.infoEvenMark.y + 2, "0/0","17px Bebasneue","#fff","center","middle");
			this.roomInfo.addChild(this.data.evenBetAmt);
		} else {

			let smallAdjustX = 450;
			let smallPercentAdjustX = 500;
			let bigPercentAdjustX = 835;
			let bigAdjustX = 870;
			if(window.language2.locale == "jp") {
				smallAdjustX = 465;
				bigAdjustX = 865;
			} else if(window.language2.locale == "kr") {
				bigAdjustX = 865;
			} else if(window.language2.locale == "th") {
				smallAdjustX = 460;
				bigAdjustX = 880;
			} else if(window.language2.locale == "zh") {
				smallAdjustX = 465;
				bigAdjustX = 865;
			} else {
			}

			let smallText = this.getText(smallAdjustX,18, window.language2.sicbo_betlayout_small,fontFormat(18, 'black', 'lato', true),"#fff","left","middle");
			this.roomInfo.addChild(smallText);

			this.smallPercent = this.getText(smallPercentAdjustX,smallText.y, "0%",fontFormat(18, 'black', 'lato', true),"#fff","left","middle");
			this.roomInfo.addChild(this.smallPercent);

			this.bigPercent = this.getText(bigPercentAdjustX,smallText.y, "0%",fontFormat(18, 'black', 'lato', true),"#fff","right","middle");
			this.roomInfo.addChild(this.bigPercent);

			let bigText = this.getText(bigAdjustX,smallText.y, window.language2.sicbo_betlayout_big,fontFormat(18, 'black', 'lato', true),"#fff","right","middle");
			this.roomInfo.addChild(bigText);

			this.small_progressbar_bg = new createjs.Shape();
			this.small_progressbar_bg.graphics.setStrokeStyle(2).beginStroke("#1665c1").drawRoundRectComplex(0, 0, 100, 20, 5, 5, 5, 5);
			this.small_progressbar_bg.x = 560;
			this.small_progressbar_bg.y = 7;
			this.roomInfo.addChild(this.small_progressbar_bg);

			//mask shape
			this.small_progressbar_mask = new createjs.Shape();
			this.small_progressbar_mask.graphics.drawRoundRect(0, 0, 100, 20, 5);
			this.small_progressbar_mask.x = 560;
			this.small_progressbar_mask.y = 7;

			this.small_progressbar = new createjs.Shape();
			this.small_progressbar.graphics.f("#1665c1").drawRect(0, 0, 100, 20);
			this.small_progressbar.x = 560;
			this.small_progressbar.y = 7;
			this.small_progressbar.scaleX = 0;
			this.roomInfo.addChild(this.small_progressbar);
			//masking
			this.small_progressbar.mask = this.small_progressbar_mask;

			this.big_progressbar_bg = new createjs.Shape();
			this.big_progressbar_bg.graphics.setStrokeStyle(2).beginStroke("#d32f2e").drawRoundRectComplex(0, 0, 100, 20, 5, 5, 5, 5);
			this.big_progressbar_bg.x = 680;
			this.big_progressbar_bg.y = 7;
			this.roomInfo.addChild(this.big_progressbar_bg);

			//mask shape
			this.big_progressbar_mask = new createjs.Shape();
			this.big_progressbar_mask.graphics.drawRoundRect(0, 0, 100, 20, 5);
			this.big_progressbar_mask.x = 680;
			this.big_progressbar_mask.y = 7;

			this.big_progressbar = new createjs.Shape();
			this.big_progressbar.graphics.f("#d32f2e").drawRect(0, 0, 100, 20);
			this.big_progressbar.x = 680;
			this.big_progressbar.y = 7;
			this.big_progressbar.scaleX = 0;
			this.roomInfo.addChild(this.big_progressbar);
			//masking
			this.big_progressbar.mask = this.big_progressbar_mask;
		}
		/*** end room info ***/

		this.roadmapcon = new createjs.Container();
		this.roadmapcon.x = 160;
		this.roadmapcon.y = 35;
		this.roadmap_container.addChild(this.roadmapcon);

		this.rmbg = new createjs.Shape();
		this.rmbg.graphics.ss(1).beginFill("transparent").drawRect(0,0,500,180);
		this.roadmapcon.addChild(this.rmbg);

		// === hotcold
		this.hot_bg = new createjs.Shape();
		this.hot_bg.graphics.beginFill("transparent").drawRect(0,0,44,180);
		this.roadmapcon.addChild(this.hot_bg);

		let hotLblBg = new createjs.Shape();
		hotLblBg.graphics.ss(.8).s("#4b4744").beginFill('#d62e2e').drawRect(0,0,44,30);
		this.roadmapcon.addChild(hotLblBg);

		this.cold_bg = new createjs.Shape();
		this.cold_bg.graphics.ss(.8).s("#4b4744").beginFill("transparent").drawRect(0,0,44,180);
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

		let hotLabel = new createjs.Text(window.language.sicbo.hotcaps, "bold 15px lato-regular", "#fff");
		hotLabel.x = 22;
		hotLabel.y = 5;
		hotLabel.textAlign = "center"
		this.roadmapcon.addChild(hotLabel);

		let coldLabel = new createjs.Text(window.language.sicbo.coldcaps, "bold 15px lato-regular", "#fff");
		coldLabel.x = 66;
		coldLabel.y = 5;
		coldLabel.textAlign = "center"
		this.roadmapcon.addChild(coldLabel);

		// === last dice result
		this.lastdice_res_container = new createjs.Container();
		this.lastdice_res_container.x = 80;
		this.roadmapcon.addChild(this.lastdice_res_container);

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
		let sizeCol = 15;
		let wh = 30;
		let height = 30;

		// === drawing size lines
		let sizeLines = new createjs.Shape();
		sizeLines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(325,wh)
		this.sizeRoadmapCon.addChild(sizeLines);

		for (var i = 0; i <= row; i++) {
			sizeLines.graphics.moveTo(325,height*i).lineTo((wh*sizeCol) + 325,height*i)
		} // end for

		sizeLines.graphics.moveTo(29,0);
		for (var x = 0; x <= sizeCol; x++) {
			sizeLines.graphics.moveTo((wh*x) + 325,0).lineTo((wh*x)+325,height*row)
		}

		this.resultCountBg = new createjs.Shape();
		this.resultCountBg.graphics.ss(.8).s("rgba(0,0,0,0.6)").beginFill("transparent").drawRect(0,0,92,180);
		this.resultCountBg.x = 690;
		this.roadmapcon.addChild(this.resultCountBg);

		let bigMark = new createjs.Shape();
		bigMark.graphics.ss(1).s('#fff').beginFill('#d22f32').drawCircle(0,0,10);
		bigMark.x = this.resultCountBg.x + 24;
		bigMark.y = this.resultCountBg.y + 19 + 12;
		this.roadmapcon.addChild(bigMark);

		let bigMarkText = this.getText(bigMark.x,bigMark.y, window.language.locale == "zh" ? "大" : "B","14px lato-black","#fff","center","middle");
		this.roadmapcon.addChild(bigMarkText);

		let smallMark = new createjs.Shape();
		smallMark.graphics.ss(1).s('#fff').beginFill('#1665c1').drawCircle(0,0,10);
		smallMark.x = bigMark.x;
		smallMark.y = bigMark.y + 28 + 10;
		this.roadmapcon.addChild(smallMark);

		let smallMarkText = this.getText(smallMark.x,smallMark.y, window.language.locale == "zh" ? "小" : "S","14px lato-black","#fff","center","middle");
		this.roadmapcon.addChild(smallMarkText);

		let oddMark = new createjs.Shape();
		oddMark.graphics.ss(1).s('#fff').beginFill('#d22f32').drawCircle(0,0,10);
		oddMark.x = smallMark.x;
		oddMark.y = smallMark.y + 28 + 10;
		this.roadmapcon.addChild(oddMark);

		let oddMarkText = this.getText(oddMark.x,oddMark.y, window.language.locale == "zh" ? "单" : "O","14px lato-black","#fff","center","middle");
		this.roadmapcon.addChild(oddMarkText);

		let evenMark = new createjs.Shape();
		evenMark.graphics.ss(1).s('#fff').beginFill('#1665c1').drawCircle(0,0,10);
		evenMark.x = oddMark.x;
		evenMark.y = oddMark.y + 28 + 10;
		this.roadmapcon.addChild(evenMark);

		let evenMarkText = this.getText(evenMark.x,evenMark.y, window.language.locale == "zh" ? "双" : "E","14px lato-black","#fff","center","middle");
		this.roadmapcon.addChild(evenMarkText);

		// let doubleMark = new createjs.Shape();
		// doubleMark.graphics.ss(1).s('#fff').beginFill('#e4b243').drawCircle(0,0,10);
		// doubleMark.x = evenMark.x;
		// doubleMark.y = evenMark.y + 28;
		// this.roadmapcon.addChild(doubleMark);

		// let doubleMarkText = this.getText(doubleMark.x,doubleMark.y, "D","14px lato-bold","#fff","center","middle");
		// this.roadmapcon.addChild(doubleMarkText);

		// let tripleMark = new createjs.Shape();
		// tripleMark.graphics.ss(1).s('#fff').beginFill('#41a257').drawCircle(0,0,10);
		// tripleMark.x = doubleMark.x;
		// tripleMark.y = doubleMark.y + 28;
		// this.roadmapcon.addChild(tripleMark);

		// let tripleMarkText = this.getText(tripleMark.x,tripleMark.y, "T","14px lato-bold","#fff","center","middle");
		// this.roadmapcon.addChild(tripleMarkText);

		// data
		this.bigCount = this.getText(bigMarkText.x + 23,bigMarkText.y, 0,"21px bebas-regular","#000","center","middle");
		this.roadmapcon.addChild(this.bigCount);

		this.smallCount = this.getText(smallMarkText.x + 23,smallMarkText.y, 0,"21px bebas-regular","#000","center","middle");
		this.roadmapcon.addChild(this.smallCount);

		this.oddCount = this.getText(oddMarkText.x + 23,oddMarkText.y, 0,"21px bebas-regular","#000","center","middle");
		this.roadmapcon.addChild(this.oddCount);

		this.evenCount = this.getText(evenMarkText.x + 23,evenMarkText.y, 0,"21px bebas-regular","#000","center","middle");
		this.roadmapcon.addChild(this.evenCount);

		// this.doubleCount = this.getText(doubleMarkText.x + 23,doubleMarkText.y, 0,"21px bebas-regular","#000","center","middle");
		// this.roadmapcon.addChild(this.doubleCount);

		// this.tripleCount = this.getText(tripleMarkText.x + 23,tripleMarkText.y, 0,"21px bebas-regular","#000","center","middle");
		// this.roadmapcon.addChild(this.tripleCount);

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
		this.dice1.diceCon.x = 37;
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
		this.totalText.y = this.dice2.diceCon.y + 10;
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
		this.setDiceResult(data.marks);
		this.drawRoadMap(fnFormat().fnFormatSicbo(data.marks,14,6).size, "size");
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

	setDiceResult(data) {
		this.dice = [];
		this.size = [];
		this.total = [];
		this.lastdice_res_container.removeAllChildren();

		let last150 = null;

		data.marks = _.filter(data,(m)=>{
			if('game_info' in m) {
				if(m.game_info && typeof m.game_info === 'string') {
					m.game_info = JSON.parse(m.game_info)
				}
				return m;
			}
		});

		if(data.marks.length > 3) {
			last150 = data.marks.slice(Math.max(data.marks.length - 4, 1)).reverse();
		} else if (data.marks.length <= 3){
			last150 = data.marks.reverse();
		}
		for(var i = 0; i < last150.length; i++) {
			let diceVal = last150[i].game_info.one +""+ last150[i].game_info.two +""+ last150[i].game_info.three;

			if(diceVal == "") diceVal = "123";
			if(last150[i].isVoid) {
				let voidContainer = new createjs.Container();
				voidContainer.isVoid = true;

				let voidShape = new createjs.Shape();
				voidShape.graphics.beginFill("#212120").drawRect(-15,-4,134,30);
				voidContainer.addChild(voidShape);
				voidContainer.y = (i*37) + 51.5;
				voidContainer.x = 150 + 235 + 10;

				let voidText = new createjs.Text("GAME VOID", "14px lato-regular", "#fff");
				voidText.set({x: -2, y: (30/2) - 4, textBaseline:"middle"});
				voidContainer.addChild(voidText);

				let voidImg = new createjs.Bitmap(this.context.getResources("void"));
				voidImg.set({x: voidText.x + voidText.getMeasuredWidth() + 5 , regY: voidImg.getBounds().height/2, y: (30/2) - 4});
				voidContainer.addChild(voidImg);

				this.lastdice_res_container.addChild(voidContainer);
			}

			let dice1 = new dice(last150[i].game_info.one, 28, 28);
			dice1.diceCon.x = 16;
			dice1.diceCon.y = 13 + (i*(28+13));
			this.lastdice_res_container.addChild(dice1.diceCon);

			let dice2 = new dice(last150[i].game_info.two, 28, 28);
			dice2.diceCon.x = dice1.diceCon.x + 34;
			dice2.diceCon.y = 13 + (i*(28+13));
			this.lastdice_res_container.addChild(dice2.diceCon);

			let dice3 = new dice(last150[i].game_info.three, 28, 28);
			dice3.diceCon.x = dice2.diceCon.x + 34;
			dice3.diceCon.y = 13 + (i*(28+13));
			this.lastdice_res_container.addChild(dice3.diceCon);

			let total = _.reduce(diceVal.split("") , function (sum, n) {
				return parseInt(sum) + parseInt(n);
			});

			let uniqDice = _.uniq(diceVal.split(""));
			let text = uniqDice.length == 1 ? "T" : (total >= 11 ? "B" : "S");

			this.total[i] = new createjs.Text(total, "26px BebasNeue", text == "T" ? "#3aa955": (text == "B"? "#d22f2f"  : "#1665c1"));
			this.total[i].x = dice3.diceCon.x + 28 + 18;
			this.total[i].y = dice3.diceCon.y;
			this.total[i].textAlign = "center";
			this.lastdice_res_container.addChild(this.total[i]);

			this.size[i] = new createjs.Text(text, "bold 26px BebasNeue", text == "T" ? "#3aa955": (text == "B"? "#d22f2f"  : "#1665c1"));
			this.size[i].x = 155;
			this.size[i].y = dice3.diceCon.y;
			this.size[i].textAlign = "right";
			this.lastdice_res_container.addChild(this.size[i]);
		}
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
						arr[x][i].x = (x * 30) + 3;
						arr[x][i].y = (i * 30) + 3;

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

		this[sel+"_container"].x = 337;
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
				this.status.text = `${window.language.sicbo.triple} ${window.language.player_info.win}`;
			} else if(resultTotal <= 10) {
				this.status.text = `${window.language.sicbo.small} ${window.language.player_info.win}`;
			} else {
				this.status.text = `${window.language.sicbo.big} ${window.language.player_info.win}`;
			}
		}

		// allTables.marks.shift();
		// allTables.marks.push(data.mark);

		this.setDiceResult(this.data.marks);
		// setTimeout( ()=> {
		this.setHotCold(this.data.marks);
		this.drawRoadMap(fnFormat().fnFormatSicbo(this.data.marks,14,6).size, "size");
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
		this.dice1.diceCon.x = 37;
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
			.to({ y : 80 }, 500)
		}

		for (var winnerText of [this.totalText, this.sizeText]) {
			createjs.Tween.get(winnerText).wait(1000)
			.to({ scaleY:1, scaleX:1 },250)
		}
	}

	displaymodify() {
		super.displaymodify();

		this.setDiceResult(this.data.marks);
		this.setHotCold(this.data.marks);
		this.drawRoadMap(fnFormat().fnFormatSicbo(this.data.marks,14,6).size, "size");
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
		this.lastdice_res_container.removeAllChildren();
		this["size_container"].removeAllChildren();

		this.bigCount.text = 0;
		this.smallCount.text = 0;
		this.oddCount.text = 0;
		this.evenCount.text = 0;
	}

	setRoomInfo(data) {
		this.data.bigBetAmt.text = '0/0';
		this.data.smallBetAmt.text = '0/0';
		this.data.oddBetAmt.text = '0/0';
		this.data.evenBetAmt.text = '0/0';
		this.data.usersCount.text = '0';

		this.data.usersCount.text = this.data.totalBettingUsers;
		if(this.data.betInfo.big) {
			this.data.bigBetAmt.text = `${numberWithCommas(this.data.betInfo.big.totalBets)}/${numberWithCommas(this.data.betInfo.big.totalUsers)}`;
		}
		if(this.data.betInfo.small) {
			this.data.smallBetAmt.text = `${numberWithCommas(this.data.betInfo.small.totalBets)}/${numberWithCommas(this.data.betInfo.small.totalUsers)}`;
		}
		if(this.data.betInfo.odd) {
			this.data.oddBetAmt.text = `${numberWithCommas(this.data.betInfo.odd.totalBets)}/${numberWithCommas(this.data.betInfo.odd.totalUsers)}`;
		}
		if(this.data.betInfo.even) {
			this.data.evenBetAmt.text = `${numberWithCommas(this.data.betInfo.even.totalBets)}/${numberWithCommas(this.data.betInfo.even.totalUsers)}`;
		}
	}

	clearAll () {
		this.animation.forEach((a) => {
			clearInterval(a);
		});
	}
}

export default {Sicbo};
