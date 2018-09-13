import {Game} from './Game';
import fnFormat from '../../../factories/formatter';
import {baccaratRoadmap as bcRoadmap} from '../../../3.0/mobile/bc_scoreboard_draw';
import { createCardSprite, fontFormat, numberWithCommas } from '../../../factories/factories';
import baccaratTotal from '../../../factories/baccaratTotal';

class Baccarat extends Game {
	constructor(data, x, y, w, h, parent, self, isJunket, roomdata) {

		super(data, x, y, w, h, parent, self, isJunket, roomdata);

		/**** roadmap ***/
		this.roadmapLines = new createjs.Container();
		this.roadmapLines.set({x:135,y:55});
		this.roadmap_container.addChild(this.roadmapLines);

    let lines = new createjs.Shape();
		lines.graphics.ss(.8).s("rgba(0,0,0,1)").moveTo(0,0);
		this.roadmapLines.addChild(lines);

		let posY = -5;// roadmap_bg.y;
    let posX = 0;// roadmap_bg.x;
    lines.graphics.moveTo(posX,posY);

    for(var i = 0; i <= 6 ; i++) {
			lines.graphics.moveTo(posX,posY+ (29.2*i)).lineTo(posX + 428.6, posY+ (29.2*i));
    }

		for(var i = 0; i <= 15 ; i++) {
			lines.graphics.moveTo(posX+(28.6*i),posY).lineTo(posX+(28.6*i),posY+175);
		}

		lines.alpha =.5;

		this.bigroad_container = new createjs.Container();
		this.bigroad_container.x = 136;
		this.bigroad_container.y = 51;
		this.roadmap_container.addChild(this.bigroad_container);

		// stats
		let statContainer = new createjs.Container();
		statContainer.set({x:535,y:52});
		this.roadmap_container.addChild(statContainer);

		let temp = '', space = 5;
		this.shoe_counter = this.getText(65,space,"0",fontFormat(25, 'regular', 'bebas', false),"#000","left","top");
		temp = this.shoe_counter;
		space = 26;
		this.player_total_text = this.getText(68,temp.y + temp.getMeasuredHeight() + space,"0",fontFormat(25, 'regular', 'bebas', false),"#000","left","top");
		temp = this.player_total_text;
		this.banker_total_text = this.getText(68,temp.y + temp.getMeasuredHeight() + space,"0",fontFormat(25, 'regular', 'bebas', false),"#000","left","top");
		temp = this.banker_total_text;
		this.tie_total_text = this.getText(68,temp.y + temp.getMeasuredHeight() + space,"0",fontFormat(25, 'regular', 'bebas', false),"#000","left","top");//

		statContainer.addChild(this.shoe_counter, this.player_total_text, this.banker_total_text, this.tie_total_text);

		this.shoeIndi = new createjs.Text("#", "bold 28px BebasNeue, helvetica", "#000");
		this.shoeIndi.set({x: 45, y:this.shoe_counter.y});
		statContainer.addChild(this.shoeIndi);

		this.tieIndicator = new bcRoadmap(12, 2.5);
		this.tieIndicator.play('pearl-t', fontFormat(17, 'black', 'lato', false));
		this.tieIndicator.instance.set({x: 40, y:this.tie_total_text.y + 2});
		statContainer.addChild(this.tieIndicator.instance);

		this.playerIndicator = new bcRoadmap(12, 2.5);
		this.playerIndicator.play('pearl-p', fontFormat(17, 'black', 'lato', false));
		this.playerIndicator.instance.set({x: 40, y:this.player_total_text.y + 2});
		statContainer.addChild(this.playerIndicator.instance);

		this.bankerIndicator = new bcRoadmap(12, 2.5);
		this.bankerIndicator.play('pearl-b', fontFormat(17, 'black', 'lato', false));
		this.bankerIndicator.instance.set({x: 40, y:this.banker_total_text.y + 2});
		statContainer.addChild(this.bankerIndicator.instance);
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

			this.infoPlayerMark = new createjs.Shape();
			this.infoPlayerMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 12);
			this.infoPlayerMark.x = this.usersIco.x + 103;
			this.infoPlayerMark.y = this.usersIco.y + 11;
			this.roomInfo.addChild(this.infoPlayerMark);

			this.playerMarkText = this.getText(this.infoPlayerMark.x,this.infoPlayerMark.y, window.language.locale == "zh" ? "闲" : "P","18px lato-bold","#fff","center","middle");
			this.roomInfo.addChild(this.playerMarkText);

			this.playerBetAmt = this.getText(this.infoPlayerMark.x + 18,this.infoPlayerMark.y + 2, "0/0","26px Bebasneue","#fff","left","middle");
			this.roomInfo.addChild(this.playerBetAmt);

			this.infoBankerMark = new createjs.Shape();
			this.infoBankerMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 12);
			this.infoBankerMark.x = this.infoPlayerMark.x + 131;
			this.infoBankerMark.y = this.infoPlayerMark.y + 1;
			this.roomInfo.addChild(this.infoBankerMark);

			this.bankerMarkText = this.getText(this.infoBankerMark.x,this.infoBankerMark.y, window.language.locale == "zh" ? "庄" : "B","18px lato-bold","#fff","center","middle");
			this.roomInfo.addChild(this.bankerMarkText);

			this.bankerBetAmt = this.getText(this.infoBankerMark.x + 18,this.infoBankerMark.y + 2, "0/0","26px Bebasneue","#fff","left","middle");
			this.roomInfo.addChild(this.bankerBetAmt);

			this.infoTieMark = new createjs.Shape();
			this.infoTieMark.graphics.ss(1).beginStroke('#fff').beginFill('#689f38').drawCircle(0, 0, 12);
			this.infoTieMark.x = this.infoBankerMark.x + 140;
			this.infoTieMark.y = this.infoBankerMark.y;
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

			let playerText = this.getText(this.roadmapLines.x,20, window.language2.baccarat_betlayout_player,fontFormat(textFont, 'black', 'lato', true),"#fff","left","middle");
			this.roomInfo.addChild(playerText);

			this.playerPercent = this.getText(playerText.getMeasuredWidth() + playerText.x + 60,playerText.y, "0%",fontFormat(percentFont, 'black', 'lato', true),"#fff","right","middle");
			this.roomInfo.addChild(this.playerPercent);

			this.player_progressbar_bg = new createjs.Shape();
			this.player_progressbar_bg.graphics.setStrokeStyle(2).beginStroke("#1665c1").drawRoundRectComplex(0, 0, 60, 25, 5, 5, 5, 5);
			this.player_progressbar_bg.x = this.playerPercent.x + 5;
			this.player_progressbar_bg.y = 8;
			this.roomInfo.addChild(this.player_progressbar_bg);
			//mask shape
			this.player_progressbar_mask = new createjs.Shape();
			this.player_progressbar_mask.graphics.drawRoundRect(0, 0, 60, 25, 5);
			this.player_progressbar_mask.x = this.player_progressbar_bg.x;
			this.player_progressbar_mask.y = 8;

			this.player_progressbar = new createjs.Shape();
			this.player_progressbar.graphics.f("#1665c1").drawRect(0, 0, 60, 25);
			this.player_progressbar.setBounds(0, 0, 60, 25);
			this.player_progressbar.x = this.player_progressbar_bg.x;
			this.player_progressbar.y = 8;
			this.player_progressbar.scaleX = 0;
			this.roomInfo.addChild(this.player_progressbar);
			//masking
			this.player_progressbar.mask = this.player_progressbar_mask;

			// tie
			this.tie_progressbar_bg = new createjs.Shape();
			this.tie_progressbar_bg.graphics.setStrokeStyle(2).beginStroke("#67a039").drawRoundRectComplex(0, 0, 60, 25, 5, 5, 5, 5);
			this.tie_progressbar_bg.x = this.player_progressbar.x + this.player_progressbar.getBounds().width + 10;
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

			this.tiePercent = this.getText(this.tie_progressbar_bg.getBounds().width + this.tie_progressbar_bg.x - 30,playerText.y, "0%",fontFormat(percentFont, 'black', 'lato', true),"#fff","center","middle");
			this.roomInfo.addChild(this.tiePercent);

			// banker
			this.banker_progressbar_bg = new createjs.Shape();
			this.banker_progressbar_bg.graphics.setStrokeStyle(2).beginStroke("#d32f2e").drawRoundRectComplex(0, 0, 60, 25, 5, 5, 5, 5);
			this.banker_progressbar_bg.setBounds(0, 0, 60, 25);
			this.banker_progressbar_bg.x = this.tie_progressbar_bg.x + this.tie_progressbar_bg.getBounds().width + 10;
			this.banker_progressbar_bg.y = 8;
			this.roomInfo.addChild(this.banker_progressbar_bg);

			//mask shape
			this.banker_progressbar_mask = new createjs.Shape();
			this.banker_progressbar_mask.graphics.drawRoundRect(0, 0, 60, 25, 5);
			this.banker_progressbar_mask.x = this.banker_progressbar_bg.x;
			this.banker_progressbar_mask.y = 8;

			this.banker_progressbar = new createjs.Shape();
			this.banker_progressbar.graphics.f("#d32f2e").drawRect(0, 0, 60, 25);
			this.banker_progressbar.x = this.banker_progressbar_bg.x;
			this.banker_progressbar.y = 8;
			this.banker_progressbar.scaleX = 0;
			this.roomInfo.addChild(this.banker_progressbar);
			//masking
			this.banker_progressbar.mask = this.banker_progressbar_mask;

			this.bankerPercent = this.getText(this.banker_progressbar_bg.x + this.banker_progressbar_bg.getBounds().width + 10,playerText.y, "0%",fontFormat(percentFont, 'black', 'lato', true),"#fff","left","middle");
			this.roomInfo.addChild(this.bankerPercent);

			let bankerText = this.getText(this.bankerPercent.x + 60,playerText.y, window.language2.baccarat_betlayout_banker,fontFormat(textFont, 'black', 'lato', true),"#fff","left","middle");
			this.roomInfo.addChild(bankerText);
		}
		/*** emd room info ***/
		this.drawBigRoad(this.data.marks);
		this.setStatistics(this.data.marks);
		if(window.room_info == 1) {
			this.setRoomInfo(this.data.betInfo);
		}

		/*** cards dealing events ***/
		this.player_circle = new createjs.Shape()
		this.player_circle.graphics.ss(2).beginFill("#1976d2").drawCircle(0,0,25);
		this.player_circle.x = 150;
		this.player_circle.y = 125;
		this.dealingCardAnimation.addChild(this.player_circle)

		this.banker_circle = new createjs.Shape()
		this.banker_circle.graphics.beginFill("#d32f2f").drawCircle(0,0,25);
		this.banker_circle.x = this.player_circle.x + 150;
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
		this.win_bg_player.graphics.beginFill("rgba(25, 118, 210, 0.5)").drawRect(0, 0, 250, 175);
		this.win_bg_player.alpha = 0;

		this.win_bg_banker = new createjs.Shape();
		this.win_bg_banker.graphics.beginFill("rgba(211, 47, 47, 0.5)").drawRect(0, 0, 250, 175);
		this.win_bg_banker.x = 250;
		this.win_bg_banker.alpha = 0;
		this.resultContainer.addChild(this.win_bg_player, this.win_bg_banker);

		this.win_bg_tie = new createjs.Shape();
		this.win_bg_tie.graphics.moveTo(0,0).f('rgba(25, 118, 210, 0.5)').lineTo(250,0).lineTo(250,175).lineTo(0,175).lineTo(0,0)
		.moveTo(500,0).f('rgba(211, 47, 47, 0.5)').lineTo(500,0).lineTo(500,175).lineTo(250,175).lineTo(250,0)
		this.win_bg_tie.x = 0;
		this.win_bg_tie.alpha = 0;
		this.resultContainer.addChild(this.win_bg_player, this.win_bg_banker, this.win_bg_tie);

		let player_text = this.getText( this.player_total.x-80,this.player_total.y+20, window.language.lobby.playercaps,"25px lato-black","#1976d2","center","middle");
		this.dealingCardAnimation.addChild(player_text);

		let banker_text = this.getText( this.banker_total.x+85,this.banker_total.y+20, window.language.lobby.bankercaps,"25px lato-black","#d32f2f","center","middle");
		this.dealingCardAnimation.addChild(banker_text);

		this.player_cards = [];
		this.banker_cards = [];

		let tempX = 3;
		for(var x = 0; x < 3; x++) {
			this.player_cards[x] = createCardSprite(this,51,68,this.ctx.load.getResources("bet-cards-large"));
			this.player_cards[x].x = (tempX * 60) - 20;
			this.player_cards[x].y = 50;
			this.player_cards[x].regX = this.player_cards[x].getTransformedBounds().width/2
			this.player_cards[x].regY = this.player_cards[x].getTransformedBounds().height/2
			// this.player_cards[x].scaleX = this.player_cards[x].scaleY = 0.7;
			this.player_cards[x].gotoAndStop('back_blue');
			this.player_cards[x].visible = false;

			this.banker_cards[x] = createCardSprite(this,51,68,this.ctx.load.getResources("bet-cards-large"));
			this.banker_cards[x].x = ((x+1) * 60) + 240;
			this.banker_cards[x].y = 50;
			this.banker_cards[x].regX = this.banker_cards[x].getTransformedBounds().width/2
			this.banker_cards[x].regY = this.banker_cards[x].getTransformedBounds().height/2
			// this.banker_cards[x].scaleX = this.banker_cards[x].scaleY = 0.7;
			this.banker_cards[x].gotoAndStop('back_red');
			this.banker_cards[x].visible = false;

			tempX--;
			if(x == 2) {
				this.player_cards[x].rotation = -90;
				this.banker_cards[x].rotation = 90;
				this.banker_cards[x].y += 0;
				this.banker_cards[x].x += 10;
				this.player_cards[x].y += 0;
				this.player_cards[x].x -= 10;
			}
			this.dealingCardAnimation.addChild(this.banker_cards[x]);
			this.dealingCardAnimation.addChild(this.player_cards[x]);
		}

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

		data = fnFormat(slaveJson).fnFormatBCBigRoad(data,6,17);
		for(var i = 0; i < data.matrix.length; i++) {
			for(var e = 0; e < data.matrix[i].length; e++) {
				if(data.matrix[i][e] === undefined) continue;

				let sp = null;
				var roadmap = new bcRoadmap(12, 4);
				roadmap.play('big-'+data.matrix[i][e].mark.toLowerCase());
				roadmap.ties(data.matrix[i][e].ties, {color:'#000', width : 2, height : 35});
				sp = roadmap.instance;
				sp.x = (e * 28.6)+1;
				sp.y = (i * 29.5)+1;

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

	endBettingTime(data) {
		super.endBettingTime(data);

		this.animateDealing();
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

			this.drawBigRoad(this.data.marks);
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

		this.drawBigRoad(this.data.marks);
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
	}

	shoechange(data) {
    super.shoechange(data);
		this.bigroad_container.removeAllChildren();
		this.shoe_counter.text = 0;
		this.player_total_text.text = 0;
		this.banker_total_text.text = 0;
		this.tie_total_text.text = 0;

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
