import {Game} from './Game';
import fnFormat from '../../factories/formatter';
import {baccaratRoadmap as bcRoadmap} from '../../3.0/bc_scoreboard_draw';
import { createCardSprite, fontFormat, numberWithCommas } from '../../factories/factories';
import baccaratTotal from '../../factories/baccaratTotal';

class Baccarat extends Game {
	constructor(data, x, y, w, h, parent, self, isJunket, roomdata) {

		super(data, x, y, w, h, parent, self, isJunket, roomdata);

		/**** roadmap ***/
		this.roadmapLines = new createjs.Container();
		this.roadmapLines.set({x:160,y:40});
		this.roadmap_container.addChild(this.roadmapLines);

    let lines = new createjs.Shape();
		lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0,0);
		this.roadmapLines.addChild(lines);

		let posY = -5;// roadmap_bg.y;
    let posX = 0;// roadmap_bg.x;
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

		// stats
		let statContainer = new createjs.Container();
		statContainer.set({x:825,y:38});

		let temp = '', space = 5;
		this.shoe_counter = this.getText(74,space,"0",fontFormat(20, 'regular', 'bebas', false),"#000","right","top");
		temp = this.shoe_counter;
		space = 16;
		this.player_total_text = this.getText(74,temp.y + temp.getMeasuredHeight() + space,"0",fontFormat(20, 'regular', 'bebas', false),"#000","right","top");
		temp = this.player_total_text;
		this.banker_total_text = this.getText(74,temp.y + temp.getMeasuredHeight() + space,"0",fontFormat(20, 'regular', 'bebas', false),"#000","right","top");;
		temp = this.banker_total_text;
		this.tie_total_text = this.getText(74,temp.y + temp.getMeasuredHeight() + space,"0",fontFormat(20, 'regular', 'bebas', false),"#000","right","top");//
		temp = this.tie_total_text;
		this.playerpair_total_text = this.getText(74,temp.y + temp.getMeasuredHeight() + space,"0",fontFormat(20, 'regular', 'bebas', false),"#000","right","top");;
		temp = this.playerpair_total_text;
		this.bankerpair_total_text = this.getText(74,temp.y + temp.getMeasuredHeight() + space,"0",fontFormat(20, 'regular', 'bebas', false),"#000","right","top");;
		this.roadmap_container.addChild(statContainer);
		statContainer.addChild(this.shoe_counter, this.tie_total_text, this.player_total_text, this.playerpair_total_text, this.banker_total_text, this.bankerpair_total_text);

		this.shoeIndi = new createjs.Text("#", "24px BebasNeue, helvetica", "#000");
		this.shoeIndi.set({x: 40, y:this.shoe_counter.y});
		statContainer.addChild(this.shoeIndi);

		this.tieIndicator = new bcRoadmap(10, 2.5);
		this.tieIndicator.play('pearl-t', fontFormat(12, 'black', 'lato', false));
		this.tieIndicator.instance.set({x: 35, y:this.tie_total_text.y});
		statContainer.addChild(this.tieIndicator.instance);

		this.playerIndicator = new bcRoadmap(10, 2.5);
		this.playerIndicator.play('pearl-p', fontFormat(12, 'black', 'lato', false));
		this.playerIndicator.instance.set({x: 35, y:this.player_total_text.y});
		statContainer.addChild(this.playerIndicator.instance);

		this.bankerIndicator = new bcRoadmap(10, 2.5);
		this.bankerIndicator.play('pearl-b', fontFormat(12, 'black', 'lato', false));
		this.bankerIndicator.instance.set({x: 35, y:this.banker_total_text.y});
		statContainer.addChild(this.bankerIndicator.instance);

		this.playerPairIndi = new bcRoadmap(10, 2.5);
		this.playerPairIndi.play('pearl-h', fontFormat(12, 'black', 'lato', false));
		this.playerPairIndi.instance.set({x: 35, y:this.playerpair_total_text.y});
		statContainer.addChild(this.playerPairIndi.instance);

		this.bankerPairIndi = new bcRoadmap(10, 2.5);
		this.bankerPairIndi.play('pearl-q', fontFormat(12, 'black', 'lato', false));
		this.bankerPairIndi.instance.set({x: 35, y:this.bankerpair_total_text.y});
		statContainer.addChild(this.bankerPairIndi.instance);
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

			this.usersCount = this.getText(this.usersIco.x + 25,this.usersIco.y + 9, 0,"18px Bebasneue","#fff","center","middle");
			this.roomInfo.addChild(this.usersCount);

			this.infoPlayerMark = new createjs.Shape();
			this.infoPlayerMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 10);
			this.infoPlayerMark.x = this.usersIco.x + 93;
			this.infoPlayerMark.y = this.usersIco.y + 7;
			this.roomInfo.addChild(this.infoPlayerMark);

			this.playerMarkText = this.getText(this.infoPlayerMark.x,this.infoPlayerMark.y, window.language.locale == "zh" ? "闲" : "P","13px LatoBold","#fff","center","middle");
			this.roomInfo.addChild(this.playerMarkText);

			this.playerBetAmt = this.getText(this.infoPlayerMark.x + 18,this.infoPlayerMark.y + 1, "0/0","17px Bebasneue","#fff","left","middle");
			this.roomInfo.addChild(this.playerBetAmt);

			this.infoBankerMark = new createjs.Shape();
			this.infoBankerMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 10);
			this.infoBankerMark.x = this.infoPlayerMark.x + 155;
			this.infoBankerMark.y = this.infoPlayerMark.y + 1;
			this.roomInfo.addChild(this.infoBankerMark);

			this.bankerMarkText = this.getText(this.infoBankerMark.x,this.infoBankerMark.y, window.language.locale == "zh" ? "庄" : "B","13px LatoBold","#fff","center","middle");
			this.roomInfo.addChild(this.bankerMarkText);

			this.bankerBetAmt = this.getText(this.infoBankerMark.x + 18,this.infoBankerMark.y + 1, "0/0","17px Bebasneue","#fff","left","middle");
			this.roomInfo.addChild(this.bankerBetAmt);

			this.infoTieMark = new createjs.Shape();
			this.infoTieMark.graphics.ss(1).beginStroke('#fff').beginFill('#689f38').drawCircle(0, 0, 10);
			this.infoTieMark.x = this.infoBankerMark.x + 155;
			this.infoTieMark.y = this.infoBankerMark.y;
			this.roomInfo.addChild(this.infoTieMark);

			this.tieMarkText = this.getText(this.infoTieMark.x,this.infoTieMark.y, window.language.locale == "zh" ? '和' : 'T',"13px LatoBold","#fff","center","middle");
			this.roomInfo.addChild(this.tieMarkText);

			this.tieBetAmt = this.getText(this.infoTieMark.x + 18,this.infoTieMark.y + 1, "0/0","17px Bebasneue","#fff","left","middle");
			this.roomInfo.addChild(this.tieBetAmt);
		} else {
			this.player_progressbar_bg = new createjs.Shape();
			this.player_progressbar_bg.graphics.setStrokeStyle(2).beginStroke("#1665c1").drawRoundRectComplex(0, 0, 90, 22, 5, 5, 5, 5);
			this.player_progressbar_bg.x = this.roadmapLines.x + 370;
			this.player_progressbar_bg.y = 7;
			this.roomInfo.addChild(this.player_progressbar_bg);
			//mask shape
			this.player_progressbar_mask = new createjs.Shape();
			this.player_progressbar_mask.graphics.drawRoundRect(0, 0, 90, 22, 5);
			this.player_progressbar_mask.x = this.roadmapLines.x + 370;
			this.player_progressbar_mask.y = 7;

			this.player_progressbar = new createjs.Shape();
			this.player_progressbar.graphics.f("#1665c1").drawRect(0, 0, 90, 22);
			this.player_progressbar.x = this.roadmapLines.x + 370;
			this.player_progressbar.y = 7;
			this.player_progressbar.scaleX = 0;
			this.roomInfo.addChild(this.player_progressbar);
			//masking
			this.player_progressbar.mask = this.player_progressbar_mask;

			this.tie_progressbar_bg = new createjs.Shape();
			this.tie_progressbar_bg.graphics.setStrokeStyle(2).beginStroke("#67a039").drawRoundRectComplex(0, 0, 50, 22, 5, 5, 5, 5);
			this.tie_progressbar_bg.x = this.roadmapLines.x + 470;
			this.tie_progressbar_bg.y = 7;
			this.roomInfo.addChild(this.tie_progressbar_bg);
			//mask shape
			this.tie_progressbar_mask = new createjs.Shape();
			this.tie_progressbar_mask.graphics.drawRoundRect(0, 0, 50, 22, 5);
			this.tie_progressbar_mask.x = this.roadmapLines.x + 470;
			this.tie_progressbar_mask.y = 7;

			this.tie_progressbar = new createjs.Shape();
			this.tie_progressbar.graphics.f("#67a039").drawRect(0, 0, 50, 22);
			this.tie_progressbar.x = this.roadmapLines.x + 470;
			this.tie_progressbar.y = 7;
			this.tie_progressbar.scaleX = 0;
			this.roomInfo.addChild(this.tie_progressbar);
			//masking
			this.tie_progressbar.mask = this.tie_progressbar_mask;

			this.banker_progressbar_bg = new createjs.Shape();
			this.banker_progressbar_bg.graphics.setStrokeStyle(2).beginStroke("#d32f2e").drawRoundRectComplex(0, 0, 90, 22, 5, 5, 5, 5);
			this.banker_progressbar_bg.x = this.roadmapLines.x + 530;
			this.banker_progressbar_bg.y = 7;
			this.roomInfo.addChild(this.banker_progressbar_bg);

			//mask shape
			this.banker_progressbar_mask = new createjs.Shape();
			this.banker_progressbar_mask.graphics.drawRoundRect(0, 0, 90, 22, 5);
			this.banker_progressbar_mask.x = this.roadmapLines.x + 530;
			this.banker_progressbar_mask.y = 7;

			this.banker_progressbar = new createjs.Shape();
			this.banker_progressbar.graphics.f("#d32f2e").drawRect(0, 0, 90, 22);
			this.banker_progressbar.x = this.roadmapLines.x + 530;
			this.banker_progressbar.y = 7;
			this.banker_progressbar.scaleX = 0;
			this.roomInfo.addChild(this.banker_progressbar);
			//masking
			this.banker_progressbar.mask = this.banker_progressbar_mask;

			let textFont = 16;
			let playeradjustX = 405;
			let playerPercentAdjustX = 480;
			let tiePercentAdjustX = 655;
			let bankerPercentAdjustX = 835;
			let bankeradjustX = 905;
			if(window.language2.locale == "jp") {
				textFont = 13;
			} else if(window.language2.locale == "kr") {
				bankeradjustX = 885;
			} else if(window.language2.locale == "th") {
				playeradjustX = 430;
			} else if(window.language2.locale == "zh") {
				playeradjustX = 445;
				bankeradjustX = 865;
				playerPercentAdjustX = 470;
			} else {
				playeradjustX = 415;
				playerPercentAdjustX = 470;
				bankeradjustX = 895;
			}

			let playerText = this.getText(playeradjustX,18, window.language2.baccarat_betlayout_player,fontFormat(textFont, 'black', 'lato', true),"#fff","left","middle");
			this.roomInfo.addChild(playerText);

			this.playerPercent = this.getText(playerPercentAdjustX,playerText.y, "0%",fontFormat(18, 'black', 'lato', true),"#fff","left","middle");
			this.roomInfo.addChild(this.playerPercent);

			this.tiePercent = this.getText(tiePercentAdjustX,playerText.y, "100%",fontFormat(18, 'black', 'lato', true),"#fff","center","middle");
			this.roomInfo.addChild(this.tiePercent);

			this.bankerPercent = this.getText(bankerPercentAdjustX,playerText.y, "0%",fontFormat(18, 'black', 'lato', true),"#fff","right","middle");
			this.roomInfo.addChild(this.bankerPercent);

			let bankerText = this.getText(bankeradjustX,playerText.y, window.language2.baccarat_betlayout_banker,fontFormat(textFont, 'black', 'lato', true),"#fff","right","middle");
			this.roomInfo.addChild(bankerText);
		}
		/*** emd room info ***/
		// this.data.marks[0].mark = 't';
		// this.data.marks[4].mark = 't';
		this.drawPearlRoad(this.data.marks);
		this.drawBigRoad(this.data.marks);
		this.drawBigeyeboy(this.data.marks);
		this.drawSmallRoad(this.data.marks);
		this.drawCockroachroad(this.data.marks);
		this.setStatistics(this.data.marks);
		if(window.room_info == 1) {
			this.setRoomInfo(this.data.betInfo);
		}

		/*** cards dealing events ***/
		this.player_circle = new createjs.Shape()
		this.player_circle.graphics.ss(2).beginFill("#1976d2").drawCircle(0,0,20);
		this.player_circle.x = 40;
		this.player_circle.y = 125;
		this.dealingCardAnimation.addChild(this.player_circle)

		this.banker_circle = new createjs.Shape()
		this.banker_circle.graphics.beginFill("#d32f2f").drawCircle(0,0,20);
		this.banker_circle.x = this.player_circle.x + 120;
		this.banker_circle.y = this.player_circle.y
		this.dealingCardAnimation.addChild(this.banker_circle);

		this.player_total = new createjs.Text("0","35px bebasNeue","#fff");
		this.player_total.x = this.player_circle.x;
		this.player_total.y = this.player_circle.y - 20;
		this.player_total.textAlign = "center";
		this.player_total.baseline = "middle";
		this.dealingCardAnimation.addChild(this.player_total);

		this.banker_total = new createjs.Text("0","35px bebasNeue","#fff");
		this.banker_total.x = this.banker_circle.x;
		this.banker_total.y = this.banker_circle.y - 20;
		this.banker_total.textAlign = "center";
		this.banker_total.baseline = "middle";
		this.dealingCardAnimation.addChild(this.banker_total)

		// winning animation
		this.win_bg_player = new createjs.Shape();
		this.win_bg_player.graphics.beginFill("rgba(25, 118, 210, 0.5)").drawRect(0, 0, 120, 180);
		this.win_bg_player.alpha = 0;

		this.win_bg_banker = new createjs.Shape();
		this.win_bg_banker.graphics.beginFill("rgba(211, 47, 47, 0.5)").drawRect(0, 0, 120, 180);
		this.win_bg_banker.x = 120;
		this.win_bg_banker.alpha = 0;
		this.resultContainer.addChild(this.win_bg_player, this.win_bg_banker);

		this.win_bg_tie = new createjs.Shape();
		this.win_bg_tie.graphics.moveTo(0,0).f('rgba(25, 118, 210, 0.5)').lineTo(120,0).lineTo(120,180).lineTo(0,180).lineTo(0,0)
		.moveTo(120,0).f('rgba(211, 47, 47, 0.5)').lineTo(240,0).lineTo(240,180).lineTo(120,180).lineTo(120,0)
		this.win_bg_tie.x = 0;
		this.win_bg_tie.alpha = 0;
		this.resultContainer.addChild(this.win_bg_player, this.win_bg_banker, this.win_bg_tie);

		let player_text = this.getText( this.player_total.x,this.player_total.y+55, window.language.lobby.playercaps,"18px lato","#fff","center","middle");
		this.dealingCardAnimation.addChild(player_text);

		let banker_text = this.getText( this.banker_total.x,this.banker_total.y+55, window.language.lobby.bankercaps,"18px lato","#fff","center","middle");
		this.dealingCardAnimation.addChild(banker_text);

		this.player_cards = [];
		this.banker_cards = [];

		let tempX = 3;
		for(var x = 0; x < 3; x++) {
			this.player_cards[x] = createCardSprite(this,31,42,this.ctx.load.getResources("bet-cards"));
			this.player_cards[x].x = (tempX * 40) - 60;
			this.player_cards[x].y = 30;
			this.player_cards[x].regX = this.player_cards[x].getTransformedBounds().width/2
			this.player_cards[x].regY = this.player_cards[x].getTransformedBounds().height/2
			// this.player_cards[x].scaleX = this.player_cards[x].scaleY = 0.7;
			this.player_cards[x].gotoAndStop('back_blue');
			this.player_cards[x].visible = false;

			this.banker_cards[x] = createCardSprite(this,31,42,this.ctx.load.getResources("bet-cards"));
			this.banker_cards[x].x = ((x+1) * 40) + 100;
			this.banker_cards[x].y = 30;
			this.banker_cards[x].regX = this.banker_cards[x].getTransformedBounds().width/2
			this.banker_cards[x].regY = this.banker_cards[x].getTransformedBounds().height/2
			// this.banker_cards[x].scaleX = this.banker_cards[x].scaleY = 0.7;
			this.banker_cards[x].gotoAndStop('back_red');
			this.banker_cards[x].visible = false;

			tempX--;
			if(x == 2) {
				this.player_cards[x].rotation = -90;
				this.banker_cards[x].rotation = 90;
				this.banker_cards[x].y += 45;
				this.banker_cards[x].x -= 60;
				this.player_cards[x].y += 45;
				this.player_cards[x].x += 60;
			}
			this.dealingCardAnimation.addChild(this.banker_cards[x]);
			this.dealingCardAnimation.addChild(this.player_cards[x]);
		}
		/**additional for balance bet**/
		this.playerBarGhost = new createjs.Shape();
		this.playerBarGhost.graphics.beginFill('rgba(21, 101, 192, 0.2)').drawRect(0,0,175,25)
		this.playerBarGhost.x = 45;
		this.playerBarGhost.y = 80;
		this.playerBarGhost.alpha = 0;

		this.playerBar = new createjs.Shape();
		this.playerBar.graphics.beginFill('#1565c0').drawRect(0,0,180,25)
		this.playerBar.x = this.playerBarGhost.x;
		this.playerBar.y = this.playerBarGhost.y;
		this.playerBar.scaleX = 0.5;
		this.playerBar.alpha = 0;
		this.balanceContainer.addChild(this.playerBarGhost, this.playerBar);

		this.bankerBarGhost = new createjs.Shape();
		this.bankerBarGhost.graphics.beginFill('rgba(204, 47, 47, 0.2)').drawRect(0,0,175,25)
		this.bankerBarGhost.x = 45;
		this.bankerBarGhost.y = 125;
		this.bankerBarGhost.alpha = 0;

		this.bankerBar = new createjs.Shape();
		this.bankerBar.graphics.beginFill('#cc2f2f').drawRect(0,0,180,25)
		this.bankerBar.x = this.bankerBarGhost.x;
		this.bankerBar.y = this.bankerBarGhost.y;
		this.bankerBar.alpha = 0;
		this.bankerBar.scaleX = 0.5;
		this.balanceContainer.addChild(this.bankerBarGhost, this.bankerBar);

		this.playerLimit = new createjs.Text("1,000","20px bebas-regular", '#fff');
		this.playerLimit.set({textAlign:'right', textBaseline:'middle', y : this.playerBarGhost.y+ 12.5, x: this.playerBarGhost.x + 165, alpha : 0})
	
		this.playerTotal = new createjs.Text("1,000","20px bebas-regular", '#fff');
		this.playerTotal.set({textAlign:'left', textBaseline:'middle', y : this.playerBarGhost.y + 12.5, x: this.playerBarGhost.x +  6, alpha : 0})

		this.bankerLimit = new createjs.Text("1,000","20px bebas-regular", '#fff');
		this.bankerLimit.set({textAlign:'right', textBaseline:'middle', y : this.bankerBarGhost.y + 12.5, x : this.bankerBarGhost.x + 165, alpha : 0})

		this.bankerTotal = new createjs.Text("1,000","20px bebas-regular", '#fff');
		this.bankerTotal.set({textAlign:'left', textBaseline:'middle', y : this.bankerBarGhost.y +12.5, x : this.bankerBarGhost.x + 6, alpha : 0})

		this.balanceContainer.addChild(this.playerLimit, this.bankerLimit, this.bankerTotal, this.playerTotal);

		/**end of balance bet**/

		if(!_.isEmpty(data.gameInfo)) {
			var total = baccaratTotal(data.gameInfo);

			this.dealingCardAnimationBg.scaleX = 1;
			this.dealingCardAnimation.visible = true;
			this.dealingCardAnimation.alpha = 1;

			this.player_total.text = total.player;
			this.banker_total.text = total.banker;

			for(var key in data.gameInfo) {
				let index = parseInt(key.split('r')[1])-1;
				if(key.indexOf('player') > -1) {
					this.player_cards[index].gotoAndStop(`C${data.gameInfo[key]}`);
					this.player_cards[index].visible = true;
				}

				if(key.indexOf('banker') > -1) {
					this.banker_cards[index].gotoAndStop(`C${data.gameInfo[key]}`);
					this.banker_cards[index].visible = true;
				}
			}
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
	}

	drawPearlRoad(data) {
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
			slave : ''
		}

		data = fnFormat(slaveJson).fnFormatBCPearlRoad(data,6,10);

		for(var i = 0; i < data.matrix.length; i++) {
			for(var e = 0; e < data.matrix[i].length; e++) {
				if(data.matrix[i][e] === undefined) continue;

				var roadmap = new bcRoadmap(13, 4);
				roadmap.play('pearl-'+data.matrix[i][e].mark.toLowerCase());
				let sp = roadmap.instance;
				sp.x = (e * 30) + 2;
				sp.y = (i * 30) + 4;

				if((i+1) == data.row) {
					if(data.matrix[i+1][e] == undefined) {
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
	} // drawPearlRoad

	drawBigRoad(data) {
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
			slave : ''
		}

		data = fnFormat(slaveJson).fnFormatBCBigRoad(data,6,32);
		for(var i = 0; i < data.matrix.length; i++) {
			for(var e = 0; e < data.matrix[i].length; e++) {
				if(data.matrix[i][e] === undefined) continue;

				let sp = null;
				var roadmap = new bcRoadmap(6, 2);
				roadmap.play('big-'+data.matrix[i][e].mark.toLowerCase());
				roadmap.ties(data.matrix[i][e].ties, {color:'#000', width : 3, height : 16});
				sp = roadmap.instance;
				sp.x = (e * 14.9)+1;
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
			}
		})
	} // drawBigRoad

	drawBigeyeboy(data) {
		let mark_data = null;

		this.bigeyeboy_container.removeAllChildren();

		mark_data = fnFormat().fnFormatBigEyeBoy(data,6,62);

		for(var i = 0; i < mark_data.matrix.length; i++) {
			for(var e = 0; e < mark_data.matrix[i].length; e++) {
				if(mark_data.matrix[i][e] === undefined) continue;

				var roadmap = new bcRoadmap(2.7);
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
	} // drawBigeyeboy

	drawSmallRoad(data) {
		let mark_data = null;
		mark_data = fnFormat().fnFormatSmallRoad(data,6,32);
		this.smallroad_container.removeAllChildren();

		for(var i = 0; i < mark_data.matrix.length; i++) {
			for(var e = 0; e < mark_data.matrix[i].length; e++) {
				if(mark_data.matrix[i][e] === undefined) continue;

				var roadmap = new bcRoadmap(3);
				roadmap.play('small-'+mark_data.matrix[i][e].mark.toLowerCase());
				let sp = roadmap.instance;
				sp.y = (i * 7.7);
				sp.x = (e * 7.4) + 1;

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
	} // drawSmallRoad

	drawCockroachroad(data) {

		let mark_data = null;
		mark_data = fnFormat().fnFormatCockroachPig(data,6,32);

		this.cockroachroad_container.removeAllChildren();

		for(var i = 0; i < mark_data.matrix.length; i++) {
			for(var e = 0; e < mark_data.matrix[i].length; e++) {
				if(mark_data.matrix[i][e] === undefined) continue;

				var roadmap = new bcRoadmap(2.8);
				roadmap.play('roach-'+mark_data.matrix[i][e].mark.toLowerCase());
				let sp = roadmap.instance;
				sp.y = (i * 7.6);
				sp.x = (e * 7.5) + 1;

				if((i) == mark_data.row) {
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
	} // drawCockroachroad
	setStatistics (data) {
		this.shoe_counter.text = data.length;

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

		this.player_total_text.text = player_count;
		this.banker_total_text.text = banker_count;
		this.tie_total_text.text = tie_count;
		this.playerpair_total_text.text = player_pair_cnt;
		this.bankerpair_total_text.text = banker_pair_cnt;

		let gameStat =  {
			total : parseInt(player_count) + parseInt(banker_count) + parseInt(tie_count),
			player: player_count,
			banker: banker_count,
			tie: tie_count 
		}
		gameStat.total = gameStat.total == 0 ? 1 : gameStat.total;
		
		let percentArr = [
			Math.round((gameStat.tie/gameStat.total)*100), //tie
			Math.round((gameStat.player/gameStat.total)*100), //tiger
			Math.round((gameStat.banker/gameStat.total)*100) // dragon
		]

		var total = percentArr[0] + percentArr[1] + percentArr[2];

		if(total != 100 && total != 0) {
			var result = { max: null, count: 0 };
			result.max = Math.max.apply(Math, percentArr);

			for(let i = 0; i < percentArr.length; i++ ){
				if (percentArr[i] == result.max) {
					result.count++;
				}
			}
			if(result.count == 1) {
				let index = percentArr.indexOf(Math.max.apply(Math, percentArr));
				percentArr[index] = percentArr[index] - (total - 100);
			}
			if(result.count == 2) {
				let index = percentArr.indexOf(Math.min.apply(Math, percentArr));
				percentArr[index] = percentArr[index] - (total - 100);
			}
		}

		// room info
		if(window.room_info == 0) {
			let playerTotalPercent = parseFloat(Math.round(player_count/(data.length ? data.length : 1).toFixed(2) * 100));
			let tieTotalPercent = parseFloat(Math.round(tie_count/(data.length ? data.length : 1).toFixed(2) * 100));
			let bankerTotalPercent = parseFloat(Math.round(banker_count/(data.length ? data.length : 1).toFixed(2) * 100));

			let totalPercentage = playerTotalPercent + tieTotalPercent + bankerTotalPercent;
			if(totalPercentage > 100) {
				if(playerTotalPercent > bankerTotalPercent) {
					playerTotalPercent -= 1;
				}
				if(bankerTotalPercent > playerTotalPercent) {
					bankerTotalPercent -= 1;
				}
			} else if(totalPercentage < 100) {
				if(playerTotalPercent < bankerTotalPercent) {
					playerTotalPercent += 1;
				}
				if(bankerTotalPercent < playerTotalPercent) {
					bankerTotalPercent += 1;
				}
			} else { }

			// percentage background
			this.player_progressbar.scaleX = player_count/this.data.marks.length;
			this.tie_progressbar.scaleX = tie_count/this.data.marks.length;
			this.banker_progressbar.scaleX = banker_count/this.data.marks.length;

			this.tiePercent.text = `${percentArr[0]}%`;
			this.playerPercent.text = `${percentArr[1]}%`
			this.bankerPercent.text = `${percentArr[2]}%`;
		}
	}//setStatistics

	//specific baccarat functon
	animateDealing () {
		this.isDealAnimation = true;

		createjs.Tween.get(this.dealingCardAnimationBg).wait(100)
		.to({ scaleX: 1 },300)

		createjs.Tween.get(this.dealingCardAnimation).wait(200)
		.to({ visible: true },150).wait(100)
		.to({ alpha: 1 },300)

		for(var x = 0; x < 2; x++) {
			this.player_cards[x].visible = true;
			this.banker_cards[x].visible = true;
		}
	}

	animateBalance(state) {
		super.animateBalance();
		if(!this.isBalance) return;
		this.balanceAnimStart = true;
		if(this.balanceAnimStart) return

		let alpha = 0;
		let scaleX = 0;
		let firstWait = 0, secondWait = 300;

		if(state == 'show') {
			alpha = 1;
			scaleX = 1;
			firstWait = 300, secondWait = 0;
			this.balanceContainer.visible = true;
		}

		let toAnim = [this.balanceLabel, this.balanceVal, this.bankerBarGhost, this.playerBarGhost, this.playerBar,
									this.bankerBar, this.bankerTotal, this.bankerLimit, this.playerTotal, this.playerLimit];

		toAnim.forEach((a) => {
			createjs.Tween.get(a, {override:true})
			.wait(firstWait)
			.to({
				alpha: alpha
			}, 200)
			.addEventListener("change", () => {
				this.stage.update();
			});
		})

		createjs.Tween.get(this.balanceAnimationBg, {override:true})
		.wait(secondWait)
		.to({ scaleX: scaleX },200)
		.addEventListener("change", () => {
			this.stage.update();
		})
		.call((_this) => {
			_this.balanceContainer.visible = alpha === 1 ? true : false;
		}, [this]);

	}

	endBettingTime(data) {
		super.endBettingTime(data);

		this.animateDealing();
		this.balanceAnimStart = false;
		this.animateBalance('hide');
	}

	resetAnimation () {
		this.isDealAnimation = false;

		this.dealingCardAnimationBg.scaleX = 0;
		this.dealingCardAnimation.visible = false;
		this.dealingCardAnimation.alpha = 0;

		for(var x = 0; x < 2; x++) {
			this.player_cards[x].visible = true;
			this.banker_cards[x].visible = true;
		}
	}

	inputItem(data) {
		super.inputItem(data);
		if(data.type === 'burn') return;

		//animates on inputitem
		if(!this.isDealAnimation) {
			this.animateDealing();
			this.isDealAnimation = true;
		}

		this.dealingCardAnimation.visible = true;

		this.player_total.text = 0;
		this.banker_total.text = 0;

		var total = baccaratTotal(data.gameInfo);

		this.player_total.text = total.player;
		this.banker_total.text = total.banker;

		if(data.type.indexOf('player') > -1) {
			let cnt = parseInt(data.type.split('r')[1]);
			this.player_cards[cnt-1].visible = true;
			this.player_cards[cnt-1].scaleX = 0;
			createjs.Tween.get(this.player_cards[cnt-1])
			.to({
				scaleX : 1
			},200)
			.call((card, anim) => {
				card.gotoAndStop(anim);
			}, [this.player_cards[cnt-1],`C${data.value}`])
		}

		if(data.type.indexOf('banker') > -1) {
			let cnt = parseInt(data.type.split('r')[1]);
			this.banker_cards[cnt-1].visible = true;
			this.banker_cards[cnt-1].scaleX = 0;
			createjs.Tween.get(this.banker_cards[cnt-1])
			.to({
				scaleX : 1
			},200)
			.call((card, anim) => {
				card.gotoAndStop(anim);
			}, [this.banker_cards[cnt-1],`C${data.value}`])
		}
	}

	displayResult (data) {
		super.displayResult(data);

		if(!this.isDealAnimation) {
			this.animateDealing();
			this.isDealAnimation = true;
		}

		this.dealingCardAnimationBg.scaleX = 1;
		this.dealingCardAnimation.visible = true;
		this.dealingCardAnimation.alpha = 1;

		if(!_.isEmpty(data.gameResult.winner)) {
			let winner = data.gameResult.winner.toLowerCase();
			if(winner == "player") {
				this.status.text = window.language.baccarat.playerwins;
			} else if(winner == "banker") {
				this.status.text = window.language.baccarat.bankerwins;
			} else {
				this.status.text = window.language.baccarat.tiewins;
			}

			this.roadmap_container.uncache();
			setTimeout(() => {
				this.roadmap_container.cache(0,0,952, 274);
			}, 850);

			this.drawPearlRoad(this.data.marks);
			this.drawBigRoad(this.data.marks);
			this.drawBigeyeboy(this.data.marks);
			this.drawSmallRoad(this.data.marks);
			this.drawCockroachroad(this.data.marks);
			this.setStatistics(this.data.marks);

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
			.to({ alpha : 0 },350).to({ alpha : 0.5 },350).to({ alpha : 0 },350).wait(2000)
		}
	}

	displaymodify() {
		super.displaymodify();

		this.drawPearlRoad(this.data.marks);
		this.drawBigRoad(this.data.marks);
		this.drawBigeyeboy(this.data.marks);
		this.drawSmallRoad(this.data.marks);
		this.drawCockroachroad(this.data.marks);
		this.setStatistics(this.data.marks);
	}

	newRound(data) {
		super.newRound(data);
		for(var x = 0; x < 3; x++) {
			this.player_cards[x].visible = false;
			this.banker_cards[x].visible = false;
			this.player_cards[x].gotoAndStop('back_blue');
			this.banker_cards[x].gotoAndStop('back_red');
		}

		this.player_total.text = 0;
		this.banker_total.text = 0;

		createjs.Tween.get(this.dealingCardAnimationBg).wait(200)
		.to({ scaleX: 0 },300)
		.call(() => {
			this.stage.update();
		});

		this.dealingCardAnimation.visible = 0;
		this.dealingCardAnimation.alpha = 0;
		this.balanceAnimStart = false;
		this.animateBalance('show');
	}

	shoechange(data) {
    super.shoechange(data);
		this.pearlroad_container.removeAllChildren();
		this.bigroad_container.removeAllChildren();
		this.bigeyeboy_container.removeAllChildren();
		this.smallroad_container.removeAllChildren();
		this.cockroachroad_container.removeAllChildren();
		this.shoe_counter.text = 0;
		this.player_total_text.text = 0;
		this.banker_total_text.text = 0;
		this.tie_total_text.text = 0;
		this.playerpair_total_text.text = 0;
		this.bankerpair_total_text.text = 0;

		//when shoechanger eset
		for(var x = 0; x < 3; x++) {
			this.player_cards[x].visible = false;
			this.banker_cards[x].visible = false;
			this.player_cards[x].gotoAndStop('back_blue');
			this.banker_cards[x].gotoAndStop('back_red');
		}

		this.player_total.text = 0;
		this.banker_total.text = 0;

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
		this.playerBetAmt.text = '0/0';
  	this.bankerBetAmt.text = '0/0';
  	this.tieBetAmt.text = '0/0';
  	this.usersCount.text = '0';

		this.usersCount.text = this.data.totalBettingUsers;
		if(this.data.betInfo.player) {
			this.playerBetAmt.text = `${numberWithCommas(this.data.betInfo.player.totalBets)}/${numberWithCommas(this.data.betInfo.player.totalUsers)}`;
		}
		if(this.data.betInfo.banker) {
			this.bankerBetAmt.text = `${numberWithCommas(this.data.betInfo.banker.totalBets)}/${numberWithCommas(this.data.betInfo.banker.totalUsers)}`;
		}
		if(this.data.betInfo.tie) {
			this.tieBetAmt.text = `${numberWithCommas(this.data.betInfo.tie.totalBets)}/${numberWithCommas(this.data.betInfo.tie.totalUsers)}`;
		}
	}

	getText(x,y,text,font,color,align,valign) {
		let ctrl = new createjs.Text(text,font,color);
		ctrl.x = x;
		ctrl.y = y;
		ctrl.textAlign = align;
		ctrl.textBaseline = valign;//"middle"
		return ctrl;
	}
}

export default {Baccarat};
