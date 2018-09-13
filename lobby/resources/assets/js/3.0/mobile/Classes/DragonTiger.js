import {Game} from './Game';
import {fontFormat, createCardSprite, numberWithCommas} from '../../../factories/factories';
import fnFormat from '../../../factories/formatter';
import {dragontigerRoadmap as dtRoadMap} from '../../../3.0/mobile/dt_scoreboard_draw';
import cardsModule from '../../../factories/cards';

class DragonTiger extends Game {
	constructor(data, x, y, w, h, parent, self, isJunket, roomdata) {
		super(data, x, y, w, h, parent, self, isJunket, roomdata);

		/**** roadmap ***/
		this.roadmapLines = new createjs.Container();
		this.roadmapLines.set({x:135,y:55});
		this.roadmap_container.addChild(this.roadmapLines);

		let lines = new createjs.Shape();
		lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0,0);
		this.roadmapLines.addChild(lines);

		let posY = -5;
		let posX = 0;
		lines.graphics.moveTo(posX,posY);
		for(var i = 0; i <= 6 ; i++) {
			lines.graphics.moveTo(posX,posY+ (29.2*i)).lineTo(posX + 428.6, posY+ (29.2*i));
		}

		for(var i = 0; i <= 15 ; i++) {
			lines.graphics.moveTo(posX+(28.6*i),posY).lineTo(posX+(28.6*i),posY+175);
		}

		lines.graphics.ss(1.5);

		lines.alpha =.5;

		this.bigroad_container = new createjs.Container();
		this.bigroad_container.x = 136;
		this.bigroad_container.y = 51;
		this.roadmap_container.addChild(this.bigroad_container);

		//Statistics
		let statContainer = new createjs.Container();
		statContainer.set({x:535,y:52});
		this.roadmap_container.addChild(statContainer);

		let temp = '', space = 5;
		this.shoe_counter = this.getText(65,space,"0",fontFormat(25, 'regular', 'bebas', false),"#000","left","top");
		temp = this.shoe_counter;
		space = 26;
		this.dragon_total_text = this.getText(68, temp.y + temp.getMeasuredHeight() + space,"0",fontFormat(25, 'regular', 'bebas', false), "#000","left","top");
		temp = this.dragon_total_text;
		this.tiger_total_text = this.getText(68,temp.y + temp.getMeasuredHeight() + space,"0",fontFormat(25, 'regular', 'bebas', false), "#000","left","top");
		temp = this.tiger_total_text;
		this.tie_total_text = this.getText(68,temp.y + temp.getMeasuredHeight() + space,"0",fontFormat(25, 'regular', 'bebas', false), "#000","left","top");

		statContainer.addChild(this.shoe_counter, this.dragon_total_text, this.tiger_total_text, this.tie_total_text);

		this.shoeIndi = new createjs.Text("#", "bold 28px BebasNeue, helvetica", "#000");
		this.shoeIndi.set({x: 45, y:this.shoe_counter.y});
		statContainer.addChild(this.shoeIndi);

		this.dragonIndicator = new dtRoadMap(12, 2.5);
		this.dragonIndicator.play('pearl-b', fontFormat(17, 'black', 'lato', false));
		this.dragonIndicator.instance.set({x: 40, y:this.dragon_total_text.y + 2});
		statContainer.addChild(this.dragonIndicator.instance);

		this.tigerIndicator = new dtRoadMap(12, 2.5);
		this.tigerIndicator.play('pearl-e', fontFormat(17, 'black', 'lato', false));
		this.tigerIndicator.instance.set({x: 40, y:this.tiger_total_text.y + 2});
		statContainer.addChild(this.tigerIndicator.instance);

		this.tieIndicator = new dtRoadMap(12, 2.5);
		this.tieIndicator.play('pearl-a', fontFormat(17, 'black', 'lato', false));
		this.tieIndicator.instance.set({x: 40, y:this.tie_total_text.y + 2});
		statContainer.addChild(this.tieIndicator.instance);
		/*** emd roadmap ***/

		/*** room info ***/
		this.roomInfo = new createjs.Container();
		this.roomInfo.visible = true;
		this.roomInfo.y = h - 38;
		this.roadmap_container.addChild(this.roomInfo);

		if(window.room_info == 1) {
			this.usersIco = new createjs.Bitmap(this.ctx.load.getResources("mobile_user_ico"));
			this.usersIco.x = this.roadmapLines.x;
			this.usersIco.y = 10;
			this.usersIco.scaleX = this.usersIco.scaleY = 1;
			this.roomInfo.addChild(this.usersIco);

			this.usersCount = this.getText(this.usersIco.x + 34,this.usersIco.y + 14, 0,"26px Bebasneue","#fff","center","middle");
			this.roomInfo.addChild(this.usersCount);

			this.infoDragonrMark = new createjs.Shape();
			this.infoDragonrMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 12);
			this.infoDragonrMark.x = this.usersIco.x + 103;
			this.infoDragonrMark.y = this.usersIco.y + 11;
			this.roomInfo.addChild(this.infoDragonrMark);

			this.dragonMarkText = this.getText(this.infoDragonrMark.x,this.infoDragonrMark.y, "D","18px lato-bold","#fff","center","middle");
			this.roomInfo.addChild(this.dragonMarkText);

			this.dragonBetAmt = this.getText(this.infoDragonrMark.x + 18,this.infoDragonrMark.y + 2, "0/0","26px Bebasneue","#fff","left","middle");
			this.roomInfo.addChild(this.dragonBetAmt);

			this.infoTigerMark = new createjs.Shape();
			this.infoTigerMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 12);
			this.infoTigerMark.x = this.infoDragonrMark.x + 131;
			this.infoTigerMark.y = this.infoDragonrMark.y + 1;
			this.roomInfo.addChild(this.infoTigerMark);

			this.tigerMarkText = this.getText(this.infoTigerMark.x,this.infoTigerMark.y, "T","18px lato-bold","#fff","center","middle");
			this.roomInfo.addChild(this.tigerMarkText);

			this.tigerBetAmt = this.getText(this.infoTigerMark.x + 18,this.infoTigerMark.y + 2, "0/0","26px Bebasneue","#fff","left","middle");
			this.roomInfo.addChild(this.tigerBetAmt);

			this.infoTieMark = new createjs.Shape();
			this.infoTieMark.graphics.ss(1).beginStroke('#fff').beginFill('#689f38').drawCircle(0, 0, 12);
			this.infoTieMark.x = this.infoTigerMark.x + 140;
			this.infoTieMark.y = this.infoTigerMark.y;
			this.roomInfo.addChild(this.infoTieMark);

			this.tieMarkText = this.getText(this.infoTieMark.x,this.infoTieMark.y, window.language.locale == "zh" ? '和' : 'T',"18px lato-bold","#fff","center","middle");
			this.roomInfo.addChild(this.tieMarkText);

			this.tieBetAmt = this.getText(this.infoTieMark.x + 18,this.infoTieMark.y + 2, "0/0","26px Bebasneue","#fff","left","middle");
			this.roomInfo.addChild(this.tieBetAmt);
		} else {
			let textFont = 21;
			let percentFont = 21;
			if(window.language2.locale == "jp") {
				textFont = 18;
			}

			let dragonText = this.getText(this.roadmapLines.x,20, window.language2.dragontiger_betlayout_dragon,fontFormat(textFont, 'black', 'lato', true),"#fff","left","middle");
			this.roomInfo.addChild(dragonText);

			this.dragonPercent = this.getText(dragonText.getMeasuredWidth() + dragonText.x + 60,dragonText.y, "0%",fontFormat(percentFont, 'black', 'lato', true),"#fff","right","middle");
			this.roomInfo.addChild(this.dragonPercent);

			this.dragon_progressbar_bg = new createjs.Shape();
			this.dragon_progressbar_bg.graphics.setStrokeStyle(2).beginStroke("#1665c1").drawRoundRectComplex(0, 0, 60, 25, 5, 5, 5, 5);
			this.dragon_progressbar_bg.x = this.dragonPercent.x + 5;
			this.dragon_progressbar_bg.y = 8;
			this.roomInfo.addChild(this.dragon_progressbar_bg);

			//mask shape
			this.dragon_progressbar_mask = new createjs.Shape();
			this.dragon_progressbar_mask.graphics.drawRoundRect(0, 0, 60, 25, 5);
			this.dragon_progressbar_mask.x = this.dragon_progressbar_bg.x;
			this.dragon_progressbar_mask.y = 8;

			this.dragon_progressbar = new createjs.Shape();
			this.dragon_progressbar.graphics.f("#1665c1").drawRect(0, 0, 60, 25);
			this.dragon_progressbar.setBounds(0, 0, 60, 25);
			this.dragon_progressbar.x = this.dragon_progressbar_bg.x;
			this.dragon_progressbar.y = 8;
			this.dragon_progressbar.scaleX = 0;
			this.roomInfo.addChild(this.dragon_progressbar);
			//masking
			this.dragon_progressbar.mask = this.dragon_progressbar_mask;

			this.tie_progressbar_bg = new createjs.Shape();
			this.tie_progressbar_bg.graphics.setStrokeStyle(2).beginStroke("#67a039").drawRoundRectComplex(0, 0, 60, 25, 5, 5, 5, 5);
			this.tie_progressbar_bg.x = this.dragon_progressbar.x + this.dragon_progressbar.getBounds().width + 10;
			this.tie_progressbar_bg.y = 8;
			this.tie_progressbar_bg.setBounds(0, 0, 60, 25);
			this.roomInfo.addChild(this.tie_progressbar_bg);
			//mask shape
			this.tie_progressbar_mask = new createjs.Shape();
			this.tie_progressbar_mask.graphics.drawRoundRect(0, 0, 60, 25, 5);
			this.tie_progressbar_mask.x = this.tie_progressbar_bg.x;
			this.tie_progressbar_mask.y = 8;

			this.tie_progressbar = new createjs.Shape();
			this.tie_progressbar.graphics.f("#67a039").drawRect(0, 0, 60, 25);
			this.tie_progressbar.x = this.tie_progressbar_bg.x;
			this.tie_progressbar.y = 8;
			this.tie_progressbar.scaleX = 0;
			this.roomInfo.addChild(this.tie_progressbar);
			//masking
			this.tie_progressbar.mask = this.tie_progressbar_mask;

			this.tiePercent = this.getText(this.tie_progressbar_bg.getBounds().width + this.tie_progressbar_bg.x - 30,dragonText.y, "0%",fontFormat(percentFont, 'black', 'lato', true),"#fff","center","middle");
			this.roomInfo.addChild(this.tiePercent);

			this.tiger_progressbar_bg = new createjs.Shape();
			this.tiger_progressbar_bg.graphics.setStrokeStyle(2).beginStroke("#d32f2e").drawRoundRectComplex(0, 0, 60, 25, 5, 5, 5, 5);
			this.tiger_progressbar_bg.setBounds(0, 0, 60, 25);
			this.tiger_progressbar_bg.x = this.tie_progressbar_bg.x + this.tie_progressbar_bg.getBounds().width + 10;
			this.tiger_progressbar_bg.y = 8;
			this.roomInfo.addChild(this.tiger_progressbar_bg);

			//mask shape
			this.tiger_progressbar_mask = new createjs.Shape();
			this.tiger_progressbar_mask.graphics.drawRoundRect(0, 0, 60, 25, 5);
			this.tiger_progressbar_mask.x = this.tiger_progressbar_bg.x;
			this.tiger_progressbar_mask.y = 8;

			this.tiger_progressbar = new createjs.Shape();
			this.tiger_progressbar.graphics.f("#d32f2e").drawRect(0, 0, 60, 25);
			this.tiger_progressbar.x = this.tiger_progressbar_bg.x;
			this.tiger_progressbar.y = 8;
			this.tiger_progressbar.scaleX = 0;
			this.roomInfo.addChild(this.tiger_progressbar);
			//masking
			this.tiger_progressbar.mask = this.tiger_progressbar_mask;

			this.tigerPercent = this.getText(this.tiger_progressbar_bg.x + this.tiger_progressbar_bg.getBounds().width + 10,dragonText.y, "0%",fontFormat(percentFont, 'black', 'lato', true),"#fff","left","middle");
			this.roomInfo.addChild(this.tigerPercent);

			let tigerText = this.getText(this.tigerPercent.x + 60,dragonText.y, window.language2.dragontiger_betlayout_tiger,fontFormat(textFont, 'black', 'lato', true),"#fff","left","middle");
			this.roomInfo.addChild(tigerText);
		}
		/*** emd room info ***/

		/*** cards dealing events ***/
		let totalDragonBg = new createjs.Shape();
		totalDragonBg.graphics.beginFill("#1566bf").drawCircle(0,0,30);
		totalDragonBg.x = 50;
		totalDragonBg.y = 70;

		let totalTigerBg = new createjs.Shape();
		totalTigerBg.graphics.beginFill("#d32f2e").drawCircle(0,0,30);
		totalTigerBg.x = totalDragonBg.x + 345;
		totalTigerBg.y = totalDragonBg.y;
		this.dealingCardAnimation.addChild(totalDragonBg, totalTigerBg);

		this.dragon_total = new createjs.Text("0", fontFormat(40, 'regular', 'bebas', false), "#fff");
		this.dragon_total.x = totalDragonBg.x;
		this.dragon_total.y = totalDragonBg.y+1;
		this.dragon_total.textAlign = 'center'
		this.dragon_total.textBaseline = 'middle'

		this.tiger_total = new createjs.Text("0", fontFormat(40, 'regular', 'bebas', false), "#fff");
		this.tiger_total.x = totalTigerBg.x;
		this.tiger_total.y = totalTigerBg.y+1;
		this.tiger_total.textAlign = 'center'
		this.tiger_total.textBaseline = 'middle'
		this.dealingCardAnimation.addChild(this.dragon_total, this.tiger_total);

		let dragon_text = new createjs.Text(window.language.lobby.dragoncaps, fontFormat(30, 'bold', 'lato', false), "#1976d2");
		dragon_text.x = totalDragonBg.x;
		dragon_text.y = totalDragonBg.y + 55;
		dragon_text.textAlign = 'center'
		dragon_text.textBaseline = 'middle'

		let tiger_text = new createjs.Text(window.language.lobby.tigercaps, fontFormat(30, 'bold', 'lato', false), "#d32f2f");
		tiger_text.x = totalTigerBg.x;
		tiger_text.y = totalTigerBg.y + 55;
		tiger_text.textAlign = 'center'
		tiger_text.textBaseline = 'middle'
		this.dealingCardAnimation.addChild(dragon_text, tiger_text);

		this.dragon_card = createCardSprite(this,90,120,this.ctx.load.getResources("bet-cards-extra-large"));
		this.dragon_card.gotoAndStop("back_blue");
		this.dragon_card.x = 125;
		this.dragon_card.y = 27;
		// this.dragon_card.scaleX = this.dragon_card.scaleY = 0.9;

		this.tiger_card = createCardSprite(this,90,120,this.ctx.load.getResources("bet-cards-extra-large"));
		this.tiger_card.gotoAndStop("back_red");
		// this.tiger_card.scaleX = this.tiger_card.scaleY = 0.9;
		this.tiger_card.x = 245;
		this.tiger_card.y = 27;
		this.dealingCardAnimation.addChild(this.dragon_card, this.tiger_card);

		// winning animation
		this.win_bg_dragon = new createjs.Shape();
		this.win_bg_dragon.graphics.beginFill("rgba(25, 118, 210, 0.5)").drawRect(0, 0, 250, 175);
		this.win_bg_dragon.alpha = 0;

		this.win_bg_tiger = new createjs.Shape();
		this.win_bg_tiger.graphics.beginFill("rgba(211, 47, 47, 0.5)").drawRect(0, 0, 250, 175);
		this.win_bg_tiger.x = 250;
		this.win_bg_tiger.alpha = 0;

		this.win_bg_tie = new createjs.Shape();
		this.win_bg_tie.graphics.moveTo(0,0).f('rgba(25, 118, 210, 0.5)').lineTo(250,0).lineTo(250,175).lineTo(0,175).lineTo(0,0)
		.moveTo(500,0).f('rgba(211, 47, 47, 0.5)').lineTo(500,0).lineTo(500,175).lineTo(250,175).lineTo(250,0)
		this.win_bg_tie.x = 0;
		this.win_bg_tie.alpha = 0;

		this.win_bg_suitedTie = new createjs.Shape();
		this.win_bg_suitedTie.graphics.moveTo(0,0).f('rgba(25, 118, 210, 0.5)').lineTo(250,0).lineTo(250,175).lineTo(0,175).lineTo(0,0)
		.moveTo(500,0).f('rgba(211, 47, 47, 0.5)').lineTo(500,0).lineTo(500,175).lineTo(250,175).lineTo(250,0)
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
		this.drawBigRoad(data.marks);
		this.setScoreCount(data.marks);

		if(window.room_info == 1) {
			this.setRoomInfo(this.data.betInfo);
		}

		if(this.data.roundStatus == "E") {
			if(!this.data.marks.length) {
				this.resetAnimation();
			}
		}
		if(this.roadmap_container.cacheCanvas) {
			this.roadmap_container.updateCache();
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

	drawBigRoad(data) {
		this.bigroad_container.removeAllChildren();
		data = fnFormat().fnFormatDTBigRoad(data, 6, 17);
		for(var i = 0; i < data.matrix.length; i++) {
			for(var e = 0; e < data.matrix[i].length; e++) {
				if(data.matrix[i][e] === undefined) continue;

				let sp = null;
				var roadmap = new dtRoadMap(12, 4);
				roadmap.play('big-'+data.matrix[i][e].mark.toLowerCase());
				roadmap.ties(data.matrix[i][e].ties, {color:"#000", width : 2, height : 35});
				sp = roadmap.instance;
				sp.x = (e * 28.6)+1;
				sp.y = (i * 29.5)+1;

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

			this.drawBigRoad(this.data.marks);
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
		this.drawBigRoad(this.data.marks);
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
		this.bigroad_container.removeAllChildren();
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
		this.dragonBetAmt.text = '0/0';
  	this.tigerBetAmt.text = '0/0';
  	this.tieBetAmt.text = '0/0';
  	this.usersCount.text = '0';

		this.usersCount.text = this.data.totalBettingUsers;
		if(this.data.betInfo.dragon) {
			this.dragonBetAmt.text = `${numberWithCommas(this.data.betInfo.dragon.totalBets)}/${numberWithCommas(this.data.betInfo.dragon.totalUsers)}`;
		}
		if(this.data.betInfo.tiger) {
			this.tigerBetAmt.text = `${numberWithCommas(this.data.betInfo.tiger.totalBets)}/${numberWithCommas(this.data.betInfo.tiger.totalUsers)}`;
		}
		if(this.data.betInfo.tie) {
			this.tieBetAmt.text = `${numberWithCommas(this.data.betInfo.tie.totalBets)}/${numberWithCommas(this.data.betInfo.tie.totalUsers)}`;
		}
	}
}

export default {DragonTiger};
