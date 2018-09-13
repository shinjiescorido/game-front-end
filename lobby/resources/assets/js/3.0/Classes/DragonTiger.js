import {Game} from './Game';
import {fontFormat, createCardSprite, numberWithCommas} from '../../factories/factories';
import fnFormat from '../../factories/formatter';
import {dragontigerRoadmap as dtRoadMap} from '../../3.0/dt_scoreboard_draw';
import cardsModule from '../../factories/cards';

class DragonTiger extends Game {
	constructor(data, x, y, w, h, parent, self, isJunket, roomdata) {
		super(data, x, y, w, h, parent, self, isJunket, roomdata);

		/**** roadmap ***/
		this.roadmapLines = new createjs.Container();
		this.roadmapLines.set({x:160,y:40});
		this.roadmap_container.addChild(this.roadmapLines);

		let lines = new createjs.Shape();
		lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0,0);
		this.roadmapLines.addChild(lines);

		let posY = -5;
		let posX = 0;
		lines.graphics.moveTo(posX,posY);
		for(var i = 0; i <= 6 ; i++) {
			lines.graphics.moveTo(posX,posY+ (29.9*i)).lineTo(posX + 238.6, posY+ (29.9*i));
		}

		for(var i = 0; i <= 8 ; i++) {
			lines.graphics.moveTo(posX+(30*i),posY).lineTo(posX+(30*i),posY+192);
		}

		for(var i = 0; i <= 12 ; i++) {
			lines.graphics.moveTo(posX+238.6,posY+ (14.95*i)).lineTo(685, posY+ (14.95*i));
		}

		for(var i = 0; i <= 30 ; i++) {
			var road_x = posX+238.6+(14.93*i);
			lines.graphics.moveTo(road_x,posY).lineTo(road_x, posY+ 192);
		}

		lines.graphics.ss(1.5);
		lines.graphics.moveTo(posX+238.6,-5).lineTo(posX+238.6, 175);
		lines.graphics.moveTo(posX+238.6,posY+ (14.73*6)).lineTo(685, posY+ (14.73*6));
		lines.graphics.moveTo(posX+238.6,posY+ (22.13*6)).lineTo(685, posY+ (22.13*6));
		lines.graphics.moveTo(posX+238.6+(15.93*14),130.3).lineTo(posX+238.6+(15.93*14), 180);

		lines.alpha =.5;

		this.pearlroad_container = new createjs.Container();
		this.pearlroad_container.x = 160;
		this.pearlroad_container.y = 33;
		this.roadmap_container.addChild(this.pearlroad_container);

		this.bigroad_container = new createjs.Container();
		this.bigroad_container.x = 400;
		this.bigroad_container.y = this.pearlroad_container.y + 2;
		this.roadmap_container.addChild(this.bigroad_container);

		this.bigeyeboy_container = new createjs.Container();
		this.bigeyeboy_container.x = this.bigroad_container.x;
		this.bigeyeboy_container.y = 125;
		this.roadmap_container.addChild(this.bigeyeboy_container);

		this.smallroad_container = new createjs.Container();
		this.smallroad_container.x = this.bigroad_container.x-1;
		this.smallroad_container.y = 170;
		this.roadmap_container.addChild(this.smallroad_container);

		this.cockroachroad_container = new createjs.Container();
		this.cockroachroad_container.x = this.bigroad_container.x + 222;
		this.cockroachroad_container.y = this.smallroad_container.y;
		this.roadmap_container.addChild(this.cockroachroad_container);

		//Statistics
		let statContainer = new createjs.Container();
		statContainer.set({x:848,y:28});
		this.statBg = new createjs.Shape();
		this.statBg.graphics.drawRect(0,0,65,180);
		statContainer.addChild(this.statBg);

		this.shoe_counter = this.getText(55,25,"0","22px bebas-regular, helvetica","#000","right","top");

		this.dragon_total_text = this.getText(55, this.shoe_counter.y + 38,"0",fontFormat(22, 'regular', 'bebas', false), "#000","right","top");

		this.tiger_total_text = this.getText(55,this.dragon_total_text.y + 38,"0",fontFormat(22, 'regular', 'bebas', false), "#000","right","top");

		this.tie_total_text = this.getText(55,this.tiger_total_text.y + 38,"0",fontFormat(22, 'regular', 'bebas', false), "#000","right","top");

		this.roadmap_container.addChild(statContainer);
		statContainer.addChild(this.shoe_counter, this.dragon_total_text, this.tiger_total_text, this.tie_total_text);

		this.shoeIndi = new createjs.Text("#", "20px lato-regular", "#000");
		this.shoeIndi.set({x: 12, y:this.shoe_counter.y});
		statContainer.addChild(this.shoeIndi);

		this.dragonIndicator = new dtRoadMap(10, 2.5);
		this.dragonIndicator.play('pearl-b', fontFormat(12, 'black', 'lato', false));
		this.dragonIndicator.instance.set({x: 8, y:this.dragon_total_text.y + 3});
		statContainer.addChild(this.dragonIndicator.instance);

		this.tigerIndicator = new dtRoadMap(10, 2.5);
		this.tigerIndicator.play('pearl-e', fontFormat(12, 'black', 'lato', false));
		this.tigerIndicator.instance.set({x: 8, y:this.tiger_total_text.y + 3});
		statContainer.addChild(this.tigerIndicator.instance);

		this.tieIndicator = new dtRoadMap(10, 2.5);
		this.tieIndicator.play('pearl-a', fontFormat(12, 'black', 'lato', false));
		this.tieIndicator.instance.set({x: 8, y:this.tie_total_text.y + 3});
		statContainer.addChild(this.tieIndicator.instance);
		/*** emd roadmap ***/

		/*** room info ***/
		this.roomInfo = new createjs.Container();
		this.roomInfo.visible = true;
		this.roadmap_container.addChild(this.roomInfo);

		if(window.room_info == 1) {
			this.usersIco = new createjs.Bitmap(this.ctx.load.getResources("user_ico"));
			this.usersIco.x = this.roadmapLines.x + 255;
			this.usersIco.y = 10;
			this.usersIco.scaleX = this.usersIco.scaleY = 1;
			this.roomInfo.addChild(this.usersIco);

			this.data.usersCount = this.getText(this.usersIco.x + 25,this.usersIco.y + 9, 0,"18px Bebasneue","#fff","center","middle");
			this.roomInfo.addChild(this.data.usersCount);

			this.infoDragonrMark = new createjs.Shape();
			this.infoDragonrMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 10);
			this.infoDragonrMark.x = this.usersIco.x + 93;
			this.infoDragonrMark.y = this.usersIco.y + 7;
			this.roomInfo.addChild(this.infoDragonrMark);

			this.dragonMarkText = this.getText(this.infoDragonrMark.x,this.infoDragonrMark.y, "D","13px lato-bold","#fff","center","middle");
			this.roomInfo.addChild(this.dragonMarkText);

			this.data.dragonBetAmt = this.getText(this.infoDragonrMark.x + 18,this.infoDragonrMark.y + 1, "0/0","17px Bebasneue","#fff","left","middle");
			this.roomInfo.addChild(this.data.dragonBetAmt);

			this.infoTigerMark = new createjs.Shape();
			this.infoTigerMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 10);
			this.infoTigerMark.x = this.infoDragonrMark.x + 155;
			this.infoTigerMark.y = this.infoDragonrMark.y + 1;
			this.roomInfo.addChild(this.infoTigerMark);

			this.tigerMarkText = this.getText(this.infoTigerMark.x,this.infoTigerMark.y, "T","13px lato-bold","#fff","center","middle");
			this.roomInfo.addChild(this.tigerMarkText);

			this.data.tigerBetAmt = this.getText(this.infoTigerMark.x + 18,this.infoTigerMark.y + 1, "0/0","17px Bebasneue","#fff","left","middle");
			this.roomInfo.addChild(this.data.tigerBetAmt);

			this.infoTieMark = new createjs.Shape();
			this.infoTieMark.graphics.ss(1).beginStroke('#fff').beginFill('#689f38').drawCircle(0, 0, 10);
			this.infoTieMark.x = this.infoTigerMark.x + 155;
			this.infoTieMark.y = this.infoTigerMark.y;
			this.roomInfo.addChild(this.infoTieMark);

			this.tieMarkText = this.getText(this.infoTieMark.x,this.infoTieMark.y, window.language.locale == "zh" ? '和' : 'T',"13px lato-bold","#fff","center","middle");
			this.roomInfo.addChild(this.tieMarkText);

			this.data.tieBetAmt = this.getText(this.infoTieMark.x + 18,this.infoTieMark.y + 1, "0/0","17px Bebasneue","#fff","left","middle");
			this.roomInfo.addChild(this.data.tieBetAmt);
		} else {
			this.dragon_progressbar_bg = new createjs.Shape();
			this.dragon_progressbar_bg.graphics.setStrokeStyle(2).beginStroke("#1665c1").drawRoundRectComplex(0, 0, 100, 20, 5, 5, 5, 5);
			this.dragon_progressbar_bg.x = this.roadmapLines.x + 360;
			this.dragon_progressbar_bg.y = 7;
			this.roomInfo.addChild(this.dragon_progressbar_bg);

			//mask shape
			this.dragon_progressbar_mask = new createjs.Shape();
			this.dragon_progressbar_mask.graphics.drawRoundRect(0, 0, 100, 20, 5);
			this.dragon_progressbar_mask.x = this.roadmapLines.x + 360;
			this.dragon_progressbar_mask.y = 7;

			this.dragon_progressbar = new createjs.Shape();
			this.dragon_progressbar.graphics.f("#1665c1").drawRect(0, 0, 100, 20);
			this.dragon_progressbar.x = this.roadmapLines.x + 360;
			this.dragon_progressbar.y = 7;
			this.dragon_progressbar.scaleX = 0;
			this.roomInfo.addChild(this.dragon_progressbar);
			//masking
			this.dragon_progressbar.mask = this.dragon_progressbar_mask;

			this.tie_progressbar_bg = new createjs.Shape();
			this.tie_progressbar_bg.graphics.setStrokeStyle(2).beginStroke("#67a039").drawRoundRectComplex(0, 0, 50, 20, 5, 5, 5, 5);
			this.tie_progressbar_bg.x = this.roadmapLines.x + 470;
			this.tie_progressbar_bg.y = 7;
			this.roomInfo.addChild(this.tie_progressbar_bg);

			//mask shape
			this.tie_progressbar_mask = new createjs.Shape();
			this.tie_progressbar_mask.graphics.drawRoundRect(0, 0, 50, 20, 5);
			this.tie_progressbar_mask.x = this.roadmapLines.x + 470;
			this.tie_progressbar_mask.y = 7;

			this.tie_progressbar = new createjs.Shape();
			this.tie_progressbar.graphics.f("#67a039").drawRect(0, 0, 100, 20);
			this.tie_progressbar.x = this.roadmapLines.x + 470;
			this.tie_progressbar.y = 7;
			this.tie_progressbar.scaleX = 0;
			this.roomInfo.addChild(this.tie_progressbar);
			//masking
			this.tie_progressbar.mask = this.tie_progressbar_mask;

			this.tiger_progressbar_bg = new createjs.Shape();
			this.tiger_progressbar_bg.graphics.setStrokeStyle(2).beginStroke("#d32f2e").drawRoundRectComplex(0, 0, 100, 20, 5, 5, 5, 5);
			this.tiger_progressbar_bg.x = this.roadmapLines.x + 530;
			this.tiger_progressbar_bg.y = 7;
			this.roomInfo.addChild(this.tiger_progressbar_bg);

			//mask shape
			this.tiger_progressbar_mask = new createjs.Shape();
			this.tiger_progressbar_mask.graphics.drawRoundRect(0, 0, 100, 20, 5);
			this.tiger_progressbar_mask.x = this.roadmapLines.x + 530;
			this.tiger_progressbar_mask.y = 7;

			this.tiger_progressbar = new createjs.Shape();
			this.tiger_progressbar.graphics.f("#d32f2e").drawRect(0, 0, 100, 20);
			this.tiger_progressbar.x = this.roadmapLines.x + 530;
			this.tiger_progressbar.y = 7;
			this.tiger_progressbar.scaleX = 0;
			this.roomInfo.addChild(this.tiger_progressbar);
			//masking
			this.tiger_progressbar.mask = this.tiger_progressbar_mask;

			let textFont = 16;
			let dragonAdjustX = 405;
			let dragonPercentAdjustX = 470;
			let tiePercentAdjustX = 655;
			let tigerPercentAdjustX = 845;
			let tigerAdjustX = 900;
			if(window.language2.locale == "jp") {
				textFont = 13;
				tigerAdjustX = 905;
			} else if(window.language2.locale == "kr") {
				tigerAdjustX = 905;
			} else if(window.language2.locale == "th") {
				dragonAdjustX = 415;
				tigerAdjustX = 885;
			} else if(window.language2.locale == "zh") {
				dragonAdjustX = 435;
				tigerAdjustX = 875;
				dragonPercentAdjustX = 465;
			} else {
			}

			let dragonText = this.getText(dragonAdjustX,18, window.language2.dragontiger_betlayout_dragon,fontFormat(textFont, 'black', 'lato', true),"#fff","left","middle");
			this.roomInfo.addChild(dragonText);

			this.dragonPercent = this.getText(dragonPercentAdjustX,dragonText.y, "0%",fontFormat(18, 'black', 'lato', true),"#fff","left","middle");
			this.roomInfo.addChild(this.dragonPercent);

			this.tiePercent = this.getText(tiePercentAdjustX,dragonText.y, "0%",fontFormat(18, 'black', 'lato', true),"#fff","center","middle");
			this.roomInfo.addChild(this.tiePercent);

			this.tigerPercent = this.getText(tigerPercentAdjustX,dragonText.y, "0%",fontFormat(18, 'black', 'lato', true),"#fff","right","middle");
			this.roomInfo.addChild(this.tigerPercent);

			let tigerText = this.getText(tigerAdjustX,dragonText.y, window.language2.dragontiger_betlayout_tiger,fontFormat(textFont, 'black', 'lato', true),"#fff","right","middle");
			this.roomInfo.addChild(tigerText);
		}
		/*** emd room info ***/

		/*** cards dealing events ***/
		let totalDragonBg = new createjs.Shape();
		totalDragonBg.graphics.beginFill("#1566bf").drawCircle(0,0,25);
		totalDragonBg.x = 35;
		totalDragonBg.y = 110;

		let totalTigerBg = new createjs.Shape();
		totalTigerBg.graphics.beginFill("#d32f2e").drawCircle(0,0,25);
		totalTigerBg.x = totalDragonBg.x + 120;
		totalTigerBg.y = totalDragonBg.y;
		this.dealingCardAnimation.addChild(totalDragonBg, totalTigerBg);

		this.dragon_total = new createjs.Text("0", fontFormat(35, 'regular', 'bebas', false), "#fff");
		this.dragon_total.x = totalDragonBg.x;
		this.dragon_total.y = totalDragonBg.y+1;
		this.dragon_total.textAlign = 'center'
		this.dragon_total.textBaseline = 'middle'

		this.tiger_total = new createjs.Text("0", fontFormat(35, 'regular', 'bebas', false), "#fff");
		this.tiger_total.x = totalTigerBg.x;
		this.tiger_total.y = totalTigerBg.y+1;
		this.tiger_total.textAlign = 'center'
		this.tiger_total.textBaseline = 'middle'
		this.dealingCardAnimation.addChild(this.dragon_total, this.tiger_total);

		let dragon_text = new createjs.Text(window.language.lobby.dragoncaps, fontFormat(18, 'regular', 'lato', false), "#fff");
		dragon_text.x = totalDragonBg.x;
		dragon_text.y = totalDragonBg.y + 45;
		dragon_text.textAlign = 'center'
		dragon_text.textBaseline = 'middle'

		let tiger_text = new createjs.Text(window.language.lobby.tigercaps, fontFormat(18, 'regular', 'lato', false), "#fff");
		tiger_text.x = totalTigerBg.x;
		tiger_text.y = totalTigerBg.y + 45;
		tiger_text.textAlign = 'center'
		tiger_text.textBaseline = 'middle'
		this.dealingCardAnimation.addChild(dragon_text, tiger_text);

		this.dragon_card = createCardSprite(this,42,56,this.ctx.load.getResources("bet-cards-medium"));
		this.dragon_card.gotoAndStop("back_blue");
		this.dragon_card.x = 14;
		this.dragon_card.y = 15;
		// this.dragon_card.scaleX = this.dragon_card.scaleY = 0.9;

		this.tiger_card = createCardSprite(this,42,56,this.ctx.load.getResources("bet-cards-medium"));
		this.tiger_card.gotoAndStop("back_red");
		// this.tiger_card.scaleX = this.tiger_card.scaleY = 0.9;
		this.tiger_card.x = 134;
		this.tiger_card.y = 15;
		this.dealingCardAnimation.addChild(this.dragon_card, this.tiger_card);

		// winning animation
		this.win_bg_dragon = new createjs.Shape();
		this.win_bg_dragon.graphics.beginFill("rgba(25, 118, 210, 0.5)").drawRect(0, 0, 120, 180);
		this.win_bg_dragon.alpha = 0;

		this.win_bg_tiger = new createjs.Shape();
		this.win_bg_tiger.graphics.beginFill("rgba(211, 47, 47, 0.5)").drawRect(0, 0, 120, 180);
		this.win_bg_tiger.x = 120;
		this.win_bg_tiger.alpha = 0;

		this.win_bg_tie = new createjs.Shape();
		this.win_bg_tie.graphics.moveTo(0,0).f('rgba(25, 118, 210, 0.5)').lineTo(120,0).lineTo(120,180).lineTo(0,180).lineTo(0,0)
		.moveTo(120,0).f('rgba(211, 47, 47, 0.5)').lineTo(240,0).lineTo(240,180).lineTo(120,180).lineTo(120,0)
		this.win_bg_tie.x = 0;
		this.win_bg_tie.alpha = 0;

		this.win_bg_suitedTie = new createjs.Shape();
		this.win_bg_suitedTie.graphics.moveTo(0,0).f('rgba(25, 118, 210, 0.5)').lineTo(120,0).lineTo(120,180).lineTo(0,180).lineTo(0,0)
		.moveTo(120,0).f('rgba(211, 47, 47, 0.5)').lineTo(240,0).lineTo(240,180).lineTo(120,180).lineTo(120,0)
		this.win_bg_suitedTie.alpha = 0;
		this.resultContainer.addChild(this.win_bg_dragon, this.win_bg_tiger, this.win_bg_tie, this.win_bg_suitedTie);

		if(!_.isEmpty(data.gameInfo)) {

			this.dealingCardAnimationBg.scaleX = 1;
			this.dealingCardAnimation.visible = true;
			this.dealingCardAnimation.alpha = 1;

			if(data.gameInfo.tiger !== undefined || data.gameInfo.dragon !== undefined) {
				this.tiger_total.text = data.gameInfo.tiger ? cardsModule(data.gameInfo.tiger).value : 0
				this.dragon_total.text = data.gameInfo.dragon ? cardsModule(data.gameInfo.dragon).value : 0
			}

			for(var key in data.gameInfo) {
				if(key !== 'burn') {
					if(data.gameInfo[key] === undefined) continue;
					this[`${key}_card`].gotoAndStop(`C${data.gameInfo[key]}`);
					this[`${key}_card`].visible = true;
				}
			}
		}

		this.shoe_counter.text = data.marks.length;
		this.drawPearlRoad(data.marks);
		this.drawBigRoad(data.marks);
		this.drawBigeyeboy(data.marks);
		this.drawSmallRoad(data.marks);
		this.drawCockroachroad(data.marks);
		this.setScoreCount(data.marks);
		if(window.room_info == 1) {
			this.setRoomInfo(this.data.betInfo);
		}

		if(this.data.roundStatus == "E") {
			if(!this.data.marks.length) {
				this.resetAnimation();
			}
		}
		this.stage.update();
		/*** emd room info ***/
	}

	getText(x,y,text,font,color,align,baseLine) {
		let textCt =  new createjs.Text(text,font,color);
		textCt.set({x:x,y:y});
		textCt.textAlign = align;
		textCt.textBaseline = baseLine;
		return textCt;
	}

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

		this.dragon_total_text.text= dragon_count;
		this.tiger_total_text.text= tiger_count;
		this.tie_total_text.text= tie_count;

		// room info
		if(window.room_info == 0) {
			let dragonTotalPercent = parseFloat(Math.round(dragon_count/(data.length ? data.length : 1).toFixed(2) * 100));
			let tieTotalPercent = parseFloat(Math.round(tie_count/(data.length ? data.length : 1).toFixed(2) * 100));
			let tigerTotalPercent = parseFloat(Math.round(tiger_count/(data.length ? data.length : 1).toFixed(2) * 100));

			let totalPercentage = dragonTotalPercent + tieTotalPercent + tigerTotalPercent;
			if(totalPercentage > 100) {
				if(dragonTotalPercent > tigerTotalPercent) {
					dragonTotalPercent -= 1;
				}
				if(tigerTotalPercent > dragonTotalPercent) {
					tigerTotalPercent -= 1;
				}
			} else if(totalPercentage < 100) {
				if(dragonTotalPercent < tigerTotalPercent) {
					dragonTotalPercent += 1;
				}
				if(tigerTotalPercent < dragonTotalPercent) {
					tigerTotalPercent += 1;
				}
			} else { }

			// percentage background
			this.dragon_progressbar.scaleX = dragon_count/this.data.marks.length;
			this.tie_progressbar.scaleX = tie_count/this.data.marks.length;
			this.tiger_progressbar.scaleX = tiger_count/this.data.marks.length;

			this.dragonPercent.text = dragonTotalPercent + "%";
			this.tiePercent.text = tieTotalPercent + "%";
			this.tigerPercent.text = tigerTotalPercent + "%";
		}
	}

	drawPearlRoad(data) {

		let mark_data = null;
		this.pearlroad_container.removeAllChildren();

		// let sp = null;
		mark_data = fnFormat().fnFormatDTPearlRoad(data,6,10);

		for(var i = 0; i < mark_data.matrix.length; i++) {
			for(var e = 0; e < mark_data.matrix[i].length; e++) {
				if(mark_data.matrix[i][e] === undefined) continue;

				var roadmap = new dtRoadMap(13, 4);
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
				.call (() => {
				})
			}
		});
		if(this.roadmap_container.cacheCanvas) {
			this.roadmap_container.updateCache();
		}
	}

	drawBigRoad(data) {
		this.bigroad_container.removeAllChildren();
		data = fnFormat().fnFormatDTBigRoad(data, 6, 32);
		for(var i = 0; i < data.matrix.length; i++) {
			for(var e = 0; e < data.matrix[i].length; e++) {
				if(data.matrix[i][e] === undefined) continue;

				let sp = null;
				var roadmap = new dtRoadMap(6, 2);
				roadmap.play('big-'+data.matrix[i][e].mark.toLowerCase());
				roadmap.ties(data.matrix[i][e].ties, {color:"#000", width : 3, height : 16});
				sp = roadmap.instance;
				sp.x = (e * 14.92);
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
				.call (() => {
				});
			}
		})
	}

	drawBigeyeboy(data) {
		let mark_data = null;

		this.bigeyeboy_container.removeAllChildren();

		mark_data = fnFormat().fnFormatDTBigEyeBoy(data,6,62);

		let sp = null;
		for(var i = 0; i < mark_data.matrix.length; i++) {
			for(var e = 0; e < mark_data.matrix[i].length; e++) {
				if(mark_data.matrix[i][e] === undefined) continue;

				var roadmap = new dtRoadMap(2.7);
				roadmap.play('bigeye-'+mark_data.matrix[i][e].mark.toLowerCase());
				let sp = roadmap.instance;
				sp.y = (i * 7.5);
				sp.x = (e * 7.45);

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
				.call (() => {
				});
			}
		})
	}

	drawSmallRoad(data) {
		let mark_data = null;
		mark_data = fnFormat().fnFormatDTSmallRoad(data,6,32);
		this.smallroad_container.removeAllChildren();

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
				.call (() => {
				});
			}
		})
	}

	drawCockroachroad(data) {
		let mark_data = null;
		mark_data = fnFormat().fnFormatDTCockroachPig(data,6,32);

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
				.call (() => {
				});
			}
		})
	}

	animateDealing() {

		this.isDealAnimation = true;

		createjs.Tween.get(this.dealingCardAnimationBg).wait(100)
		.to({ scaleX: 1 },300)

		createjs.Tween.get(this.dealingCardAnimation).wait(100)
		.to({ visible: true },150).wait(100)
		.to({ alpha: 1 },150).wait(100)
		.call(() => {
			this.dragon_card.visible = true;
			this.tiger_card.visible = true;
		});
	}

	endBettingTime (data) {
		super.endBettingTime(data);
		this.dragon_total.text = 0;
		this.tiger_total.text = 0;
		this.animateDealing();
	}

	resetAnimation () {

		this.isDealAnimation = false;

		this.dealingCardAnimationBg.scaleX = 0;
		this.dealingCardAnimation.visible = false
		this.dealingCardAnimation.alpha = 0


		this.dragon_card.visible = false;
		this.tiger_card.visible = false;
	}

	inputItem(data) {
		super.inputItem(data);
		if(data.type === 'burn') return;

		//animates on inputitem
		if(!this.isDealAnimation) {
			this.animateDealing();
			this.isDealAnimation = true;
		}

		this[`${data.type}_card`].gotoAndStop(`C${data.value}`);
		this[`${data.type}_card`].visible = true;
		this[`${data.type}_total`].text = cardsModule(data.gameInfo[data.type]).value
	}

	displayResult(data) {
		super.displayResult(data);
		this.dealingCardAnimationBg.scaleX = 1;
		this.dealingCardAnimation.visible = true;
		this.dealingCardAnimation.alpha = 1;

		if(!_.isEmpty(data.gameResult.winner)) {
			let winner = data.gameResult.winner.toLowerCase();

			if(winner == "dragon") {
				this.status.text = window.language.dragontiger.dragonwins;
			} else if(winner == "tiger") {
				this.status.text = window.language.dragontiger.tigerwins;
			} else if(winner == "tie") {
				this.status.text = window.language.dragontiger.tiewins;
			} else {
				winner = 'suitedTie';
				this.status.text = window.language.dragontiger.suitedtiewins;
			}

			this.shoe_counter.text = this.data.marks.length;

			this.roadmap_container.uncache();
			setTimeout(() => {
				this.roadmap_container.cache(0,0,952, 274);
				this.stage.update();
			}, 850);

			this.drawPearlRoad(this.data.marks);
			this.drawBigRoad(this.data.marks);
			this.drawBigeyeboy(this.data.marks);
			this.drawSmallRoad(this.data.marks);
			this.drawCockroachroad(this.data.marks);
			this.setScoreCount(this.data.marks);

			createjs.Tween.get(this[`win_bg_${winner}`])
			.to({ alpha : 0.5 },350).to({ alpha : 0 },350).to({ alpha : 0.5 },350)
			.to({ alpha : 0 },350).to({ alpha : 0.5 },350).to({ alpha : 0 },350)
			.to({ alpha : 0.5 },350).to({ alpha : 0 },350).to({ alpha : 0.5 },350)
			.to({ alpha : 0 },350).to({ alpha : 0.5 },350).to({ alpha : 0 },350)
			.to({ alpha : 0.5 },350).to({ alpha : 0 },350).to({ alpha : 0.5 },350)
			.to({ alpha : 0 },350).to({ alpha : 0.5 },350).to({ alpha : 0 },350)
			.to({ alpha : 0.5 },350).to({ alpha : 0 },350).to({ alpha : 0.5 },350)
			.to({ alpha : 0 },350).to({ alpha : 0.5 },350).to({ alpha : 0 },350)
			.to({ alpha : 0.5 },350).to({ alpha : 0 },350).to({ alpha : 0.5 },350)
			.to({ alpha : 0 },350).to({ alpha : 0.5 },350).to({ alpha : 0 },350).wait(1000);
		}
	}

	displaymodify() {
		super.displaymodify();
		this.drawPearlRoad(this.data.marks);
		this.drawBigRoad(this.data.marks);
		this.drawBigeyeboy(this.data.marks);
		this.drawSmallRoad(this.data.marks);
		this.drawCockroachroad(this.data.marks);
		this.setScoreCount(this.data.marks);
	}

	newRound(data) {
		super.newRound(data);
		this.dragon_card.visible = false;
		this.tiger_card.visible = false;
		this.dragon_card.gotoAndStop('back_blue');
		this.tiger_card.gotoAndStop('back_red');
		this.dragon_total.text = 0;
		this.tiger_total.text = 0;

		createjs.Tween.get(this.dealingCardAnimationBg).wait(100)
		.to({ scaleX: 0 },300)

		createjs.Tween.get(this.dealingCardAnimation).wait(0)
		.to({ visible: false, },150).wait(0)
		.to({ alpha: 0, },150)
		.call(() => {
			this.stage.update();
		});
	}

	shoechange(data) {
		super.shoechange(data);
		this.pearlroad_container.removeAllChildren();
		this.bigeyeboy_container.removeAllChildren();
		this.smallroad_container.removeAllChildren();
		this.bigroad_container.removeAllChildren();
		this.cockroachroad_container.removeAllChildren();
		this.shoe_counter.text = 0;

		this.tie_total_text.text = 0;
		this.dragon_total_text.text = 0;
		this.tiger_total_text.text = 0;

		this.dragon_card.visible = false;
		this.tiger_card.visible = false;
		this.dragon_card.gotoAndStop('back_blue');
		this.tiger_card.gotoAndStop('back_red');
		this.dragon_total.text = 0;
		this.tiger_total.text = 0;

		this.dealingCardAnimationBg.scaleX = 0;
		this.dealingCardAnimation.visible = 0;
		this.dealingCardAnimation.alpha = 0;

		if(this.roadmap_container.cacheCanvas) {
			this.roadmap_container.updateCache();
		}
		
		this.stage.update();
	}

	setRoomInfo(data) {
		super.setRoomInfo(data);
		// reset roominfo
		this.data.dragonBetAmt.text = '0/0';
  	this.data.tigerBetAmt.text = '0/0';
  	this.data.tieBetAmt.text = '0/0';
  	this.data.usersCount.text = '0';

		this.data.usersCount.text = this.data.totalBettingUsers;
		if(this.data.betInfo.dragon) {
			this.data.dragonBetAmt.text = `${numberWithCommas(this.data.betInfo.dragon.totalBets)}/${numberWithCommas(this.data.betInfo.dragon.totalUsers)}`;
		}
		if(this.data.betInfo.tiger) {
			this.data.tigerBetAmt.text = `${numberWithCommas(this.data.betInfo.tiger.totalBets)}/${numberWithCommas(this.data.betInfo.tiger.totalUsers)}`;
		}
		if(this.data.betInfo.tie) {
			this.data.tieBetAmt.text = `${numberWithCommas(this.data.betInfo.tie.totalBets)}/${numberWithCommas(this.data.betInfo.tie.totalUsers)}`;
		}
	}
}

export default {DragonTiger};
