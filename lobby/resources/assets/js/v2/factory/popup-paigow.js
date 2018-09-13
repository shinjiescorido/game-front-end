import { createSprite, randomNum, createCardSprite, createTileSprite, numberCounter, playSound, numberWithCommasm, fnSetDateTimeZone } from '../../factories/factories';
import cardValue from '../../factories/cards';
import scrollbar from '../../factories/scrollbar';
import tilesModule from '../../factories/tiles';
let instance = null;

let links  = {
	getTransferLogs: "m/transferlogs",

	getBaccaratData : "/baccaratlogs",
	getSupersixData : "/supersixlogs",
	getPokerData : "/pokerlogs",
	getBonusPlusData : "/bonuspluslogs",
	getSicboData : "/sicbologs",
	getDragonTigerData : "/dragontigerlogs",
	getPulaputiData : "/pulaputilogs",
	getBigwheelData : "/bigwheellogs",

	getPulaputiDetails: "/details/getPulaputiDetails",
	getSupersixDetails: "/details/getSupersixDetails",
	getDragontigerDetails: "/details/getDragontigerDetails",
	getBaccaratDetails: "/details/getBaccaratDetails",
	getPokerDetails: "/details/getPokerDetails",
	getBonusPlusDetails: "/details/getBonusPlusDetails",
	getSicboDetails: "/details/getSicboDetails",
	getPaigowDetails: "/details/getPaigowDetails",
}

let lobby_paigow_data = {

	betResult : new createjs.Container(),
	betDetails: new createjs.Container(),
	bgColor : "",

	main () {

	},

	colorTiles(data) {
		if(data == "banker") {
			this.bgColor = "#B62026";
		} else if(data == "heaven") {
			this.bgColor = "#2765AF";
		} else if (data == "up") {
			this.bgColor = "#EF8F21";
		} else {
			this.bgColor = "#009559";
		}
		return this.bgColor;
	},

	setBetLogs(data, self) {
		this._betLogs = data;
		let betDataMarkCircle = [];
		let betDataMarkNum = [];
    let betDataMoreInfo = [];
    let betDataMoreInfoText = [];

		for (var i = 0; i < this._betLogs.data.length; i++) {
			let record = this._betLogs.data[i];
			let results = JSON.parse(record.game_result);
			let gameInfo = JSON.parse(record.game_info);
      let circles = '';
      let space = 0;
			let newDate = '';
			if (data.data[i].created_at) {
				newDate = fnSetDateTimeZone(data.data[i].created_at, parseInt(this.timezoneOffset));
			}

			if (record.status.toLowerCase() === 'w') {
				let voidIco = new createjs.Bitmap("/img/v2_1/icons/void/void_icon.png");
				voidIco.y = (65 * i) - 13;
				this.betResult.addChild(voidIco);
				continue;
			}

      for(let j=0;j<results.winner.length;j++) {
        let isPair = _.find(results.pairs, (o) => { return results.winner[j] == o }) != undefined;
        let totalText = isPair ? tilesModule(gameInfo.tiles[results.winner[j]][0]).text : _.sum(_.flatMap(gameInfo.tiles[results.winner[j]], (v) => { return tilesModule(v).value; })) % 10 || 0;

				this.bgColor = this.colorTiles(results.winner[j]);

        betDataMarkCircle[j] = new createjs.Shape();
  			betDataMarkCircle[j].graphics.beginFill(this.bgColor).drawCircle(0, 0, 20);
				if(results.winner.length > 2) {
					betDataMarkCircle[j].x =  space  - 30;
				} else if(results.winner.length == 2) {
					betDataMarkCircle[j].x = space - 10;
				} else {
					betDataMarkCircle[j].x =  15;
				}
  			betDataMarkCircle[j].y = 65 * i;
				//if pair add small circle
				if(isPair) {
					betDataMarkCircle[j].graphics.moveTo(0,15).setStrokeStyle(0.8).beginStroke('#fff').drawCircle(12,12,6);
				}
  			this.betResult.addChild(betDataMarkCircle[j]);

  			betDataMarkNum[j] = new createjs.Text(totalText, '19px LatoBold', '#fff');
  			betDataMarkNum[j].x = betDataMarkCircle[j].x;
  			betDataMarkNum[j].y = betDataMarkCircle[j].y;
  			betDataMarkNum[j].textAlign = 'center';
  			betDataMarkNum[j].textBaseline = 'middle';
  			this.betResult.addChild(betDataMarkNum[j]);
				space += 45;
			} // end for loop

			self.betDataCon.children.forEach((e) => {
				if(e.identifier === 'moreInfo') {
					if(e.hitArea && e.hitArea.betId === record.id) {
						if(JSON.parse(record.game_result).winner.length == 1) {
							e.x = (self.betTblHeader[6].x -30) + (JSON.parse(record.game_result).winner.length * 70)
						} else if(JSON.parse(record.game_result).winner.length == 2) {
							e.x = (self.betTblHeader[6].x -33) + (JSON.parse(record.game_result).winner.length * 46)
						} else {
							e.x = (self.betTblHeader[6].x -30) + (JSON.parse(record.game_result).winner.length * 38)
						}
					}

					if(e.betId && e.betId === record.id) {
						if(JSON.parse(record.game_result).winner.length == 1) {
							e.x = (self.betTblHeader[6].x -30) + (JSON.parse(record.game_result).winner.length * 70)
						} else if(JSON.parse(record.game_result).winner.length == 2) {
							e.x = (self.betTblHeader[6].x -33) + (JSON.parse(record.game_result).winner.length * 46)
						} else {
							e.x = (self.betTblHeader[6].x -30) + (JSON.parse(record.game_result).winner.length * 38)
						}
					}
				}
			});
    } //end for loop

		return this.betResult;
	},

	paginateResult(data) {
		this.betResult.removeAllChildren();
		this.setBetLogs(JSON.parse(data));
	},

  showDetails(details, self) {
		let mdlDetailWidth = 820;
		let tblBorderHor = [];

		this.betDetails.removeAllChildren();

		let detailBg = new createjs.Shape();
		detailBg.graphics.setStrokeStyle(2).beginStroke('#000').beginFill('#d5d5d5').drawRoundRect(0, 0, mdlDetailWidth, 560, 7);
		detailBg.x = (details.width / 2) - (mdlDetailWidth / 2);
		detailBg.y = 100;
		this.betDetails.addChild(detailBg);

		//Click event to prevent click behind the modal
		detailBg.addEventListener("mousedown", (e) => {
			return;
		});

		let detailHeaderBg = new createjs.Shape();
		detailHeaderBg.graphics.beginFill('#ff9b28').drawRoundRect(0, 0, mdlDetailWidth-3, 45, 7);
		detailHeaderBg.x = detailBg.x + 2;
		detailHeaderBg.y = detailBg.y + 2;
		this.betDetails.addChild(detailHeaderBg);

		let detailHeaderTxt = new createjs.Text(window.language.menu.winningresultcaps, 'bold 20px Lato', '#2b2b2b');
		detailHeaderTxt.x = detailBg.x + (mdlDetailWidth / 2);
		detailHeaderTxt.y = detailBg.y + 10;
		detailHeaderTxt.textAlign = 'center';
		this.betDetails.addChild(detailHeaderTxt);

		//Header Close button
		let headerClose = new createjs.Text("X","bold 17px arial", '#2b2b2b');
		headerClose.x = detailBg.x + (mdlDetailWidth - 30);
		headerClose.y = detailBg.y + 15;
		this.betDetails.addChild(headerClose);

		//Close button hitarea
		let headerCloseHit = new createjs.Shape();
		headerCloseHit.graphics.beginFill("#000").drawRect(0, 0, 20, 20);
		headerCloseHit.x = headerClose.x - 5;
		headerCloseHit.y = headerClose.y - 2;
		headerCloseHit.cursor = "pointer";
		headerCloseHit.alpha = 0.01;
		this.betDetails.addChild(headerCloseHit);

		let detailSubHeaderBg = new createjs.Shape();
		detailSubHeaderBg.graphics.beginFill('#bcbcbc').drawRect(0, 0, mdlDetailWidth-3, 45);
		detailSubHeaderBg.x = detailBg.x + 2;
		detailSubHeaderBg.y = detailHeaderBg.y + 45;
		this.betDetails.addChild(detailSubHeaderBg);

		let detailGameId = new createjs.Text(window.language.menu.gamenocaps + ': '+details.round, 'bold 22px Lato', '#2b2b2b');
		detailGameId.x = detailSubHeaderBg.x + 10;
		detailGameId.y = detailSubHeaderBg.y + 12;
		detailGameId.textAlign = 'left';
		this.betDetails.addChild(detailGameId);

		let detailDate = new createjs.Text(details.date, 'bold 22px Lato', '#2b2b2b');
		detailDate.x = detailSubHeaderBg.x + (mdlDetailWidth - 10);
		detailDate.y = detailSubHeaderBg.y + 12;
		detailDate.textAlign = 'right';
		this.betDetails.addChild(detailDate);

		let detailResultCon = new createjs.Shape();
		detailResultCon.graphics.setStrokeStyle(1).beginStroke('#999999').beginFill('#e5e5e5').drawRoundRect(-165, 0, 740, 70, 3);
		detailResultCon.x = detailSubHeaderBg.x + 200;
		detailResultCon.y = detailSubHeaderBg.y + 83;
		this.betDetails.addChild(detailResultCon);

		//Close modal
		headerCloseHit.addEventListener("mousedown", (e) => {
        	this.betDetails.visible = false;
	    });

		let tblWidth = 750;

		let tblHeaderBg = new createjs.Shape();
		tblHeaderBg.graphics.beginFill('#c9c9c9').drawRect(0, 0, tblWidth, 40);
		tblHeaderBg.x = detailSubHeaderBg.x + 30;
		tblHeaderBg.y = detailResultCon.y + 100;
		this.betDetails.addChild(tblHeaderBg);

		let tblHeaderBetType = new createjs.Text(window.language.menu.betcaps +' '+ window.language.menu.typecaps, 'bold 22px Lato', '#242021');
		tblHeaderBetType.x = tblHeaderBg.x + 175;
		tblHeaderBetType.y = tblHeaderBg.y + 7;
		tblHeaderBetType.textAlign = 'center';
		this.betDetails.addChild(tblHeaderBetType);

		let tblHeaderBets = new createjs.Text(window.language.menu.betscaps, 'bold 22px Lato', '#242021');
		tblHeaderBets.x = tblHeaderBg.x + 470;
		tblHeaderBets.y = tblHeaderBg.y + 7;
		tblHeaderBets.textAlign = 'center';
		this.betDetails.addChild(tblHeaderBets);

		let tblHeaderWin = new createjs.Text(window.language.menu.payoutcaps, 'bold 22px Lato', '#242021');
		tblHeaderWin.x = tblHeaderBg.x + 650;
		tblHeaderWin.y = tblHeaderBg.y + 7;
		tblHeaderWin.textAlign = 'center';
		this.betDetails.addChild(tblHeaderWin);

		let betCount = 0;
		let winnerNum = '';
		let resultCircle = 0;
		let resultTile = 0;
		let winnerCircle = [];
		let winnerTextObj = [];
		let tile = [];

		let betTypeTxt = [];
		let betTypeAmt = [];
		let betWinLoseAmt = [];
		let moneyColorCode = '';
		let totalWinLoseAmt = 0;
		let totalBetAmtNum = 0;
		let winLoseColor = '';

		this.resultContainer = new createjs.Container();
		this.resultContainer.y = tblHeaderBg.y - 27;
		this.betDetails.addChild(this.resultContainer);

		this.tblDataContainer = new createjs.Container();
		this.tblDataContainer.y = -302;
		this.resultContainer.addChild(this.tblDataContainer);

		$.post(links.getPaigowDetails, {round: details.round, table: details.table, betId: details.betId}, (response) => {
			for (var i = 0; i < response.length; i++) {
				this.betHistory = JSON.parse(response[i].bet_history);
				this.gameInfo = JSON.parse(response[i].game_info);
				let gameResult = JSON.parse(response[i].game_result);

				betCount = this.betHistory.length;

				let areaArr = ['banker','up','heaven','down'];
				_.forEach(areaArr, (area) => {
					let tileArea = this.gameInfo.tiles[area] || {};
					let isPair = _.find(gameResult.pairs, (o) => { return o == area }) != undefined;
					let isWinner = _.find(this.gameInfo, (o) => { return area == o }) != undefined;
					let tiles = this.gameInfo.tiles[area] || [];

					if(!_.isEmpty(tileArea)) {
						let totalText = isPair ? tilesModule(tileArea[0]).text : _.sum(_.flatMap(tileArea, (v) => { return tilesModule(v).value; })) % 10 || 0;

						this.bgColor = this.colorTiles(area);

					 	winnerCircle[area] = new createjs.Shape();
						winnerCircle[area].graphics.beginFill(this.bgColor).drawCircle(0, 0, 20);
						winnerCircle[area].x = detailResultCon.x - 120 + resultCircle;
						winnerCircle[area].y = detailResultCon.y + 35;
						if(isPair) {
							winnerCircle[area].graphics.moveTo(0,15).setStrokeStyle(0.8).beginStroke('#fff').drawCircle(13,13,6);
						}
						this.betDetails.addChild(winnerCircle[area]);

					  winnerTextObj[area] = new createjs.Text(totalText, '28px LatoBold', '#fff');
						winnerTextObj[area].x = winnerCircle[area].x;
						winnerTextObj[area].y = winnerCircle[area].y - 16;
						winnerTextObj[area].textAlign = 'center';
						this.betDetails.addChild(winnerTextObj[area]);
					}
					for(let i=0;i<tiles.length;i++) {
						let tile = createTileSprite(this, 46, 60.5, this.context.load.getResources("small_tiles"));
						tile.gotoAndStop('tile-'+tilesModule(tiles[i]).number);
						tile.x = 690 + resultTile + ( i * 50);
						tile.y = 235;
						tile.scaleX = tile.scaleY = 1;
						this.betDetails.addChild(tile);
						var outline = new createjs.Shape();
						outline.graphics.beginStroke("#000").drawRoundRect(tile.x, tile.y, 46, 60.5, 5);
						this.betDetails.addChild(outline);
					}

					resultCircle += 170;
					resultTile += 170;
				});
			} //end for loop

			//Table
			let tableHeight = (betCount + 1) * 40;

		    let tblBodyBorder = new createjs.Shape();
			tblBodyBorder.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').drawRect(0, 0, tblWidth, tableHeight);
			tblBodyBorder.x = tblHeaderBg.x;
			tblBodyBorder.y = tblHeaderBg.y + 40;
			this.tblDataContainer.addChild(tblBodyBorder);

			let tblTotalText = new createjs.Text(window.language.lobby.total, 'bold 20px Lato', '#231f20');
			tblTotalText.x = tblHeaderBg.x + 35;
			tblTotalText.y = (tblHeaderBg.y + tableHeight) + 5;
			tblTotalText.textAlign = 'center';
			this.tblDataContainer.addChild(tblTotalText);

			//Table horizontal borders
			for (var i = 0; i < betCount + 1; i++) {
				tblBorderHor[i] = new createjs.Shape();
			    tblBorderHor[i].graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x, (tblHeaderBg.y+40) + (i * 40)).lineTo(tblBodyBorder.x + tblWidth, (tblHeaderBg.y+40) + (i * 40));
			    this.tblDataContainer.addChild(tblBorderHor[i]);
			}

			//Table vertical borders
			let tblBorderVer1 = new createjs.Shape();
		    tblBorderVer1.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x + 375, tblHeaderBg.y+40).lineTo(tblBodyBorder.x + 375, tblHeaderBg.y+tableHeight+40);
		    this.tblDataContainer.addChild(tblBorderVer1);

		    let tblBorderVer2 = new createjs.Shape();
		    tblBorderVer2.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x + 560, tblHeaderBg.y+40).lineTo(tblBodyBorder.x + 560, tblHeaderBg.y+tableHeight+40);
		    this.tblDataContainer.addChild(tblBorderVer2);

		    for (var i = 0; i < betCount; i++) {
		    	betTypeTxt[i] = new createjs.Text(this.betHistory[i].bet.toUpperCase(), 'bold 20px Lato', '#231f20');
				betTypeTxt[i].x = tblHeaderBg.x + 15;
				betTypeTxt[i].y = (tblHeaderBg.y + 48) + (i * 40);
				betTypeTxt[i].textAlign = 'left';
				this.tblDataContainer.addChild(betTypeTxt[i]);

				betTypeAmt[i] = new createjs.Text(this.formatNumber(this.betHistory[i].bet_money), 'normal 20px Lato', '#231f20');
				betTypeAmt[i].x = tblHeaderBg.x + 545;
				betTypeAmt[i].y = (tblHeaderBg.y + 48) + (i * 40);
				betTypeAmt[i].textAlign = 'right';
				this.tblDataContainer.addChild(betTypeAmt[i]);

				// let winLoseAmount = 0;
				// if (this.betHistory[i].win_money == 0 && this.betHistory[i].bet_money != 0) {
				// 	moneyColorCode = '#c7383a';
				// 	winLoseAmount -= this.betHistory[i].bet_money;
				// }
				// else {
				// 	winLoseAmount = this.betHistory[i].win_money + this.betHistory[i].bet_money;

				// 	if (winLoseAmount > 0) {
				// 		moneyColorCode = '#04770f';
				// 	}
				// 	else {
				// 		moneyColorCode = '#231f20';
				// 	}
				// }

				if (this.betHistory[i].win_money > 0) {
					moneyColorCode = '#04770f';
				}
				else {
					moneyColorCode = '#231f20';
				}

				betWinLoseAmt[i] = new createjs.Text(this.formatNumber(this.betHistory[i].win_money), 'normal 20px Lato', moneyColorCode);
				betWinLoseAmt[i].x = tblHeaderBg.x + 735;
				betWinLoseAmt[i].y = (tblHeaderBg.y + 48) + (i * 40);
				betWinLoseAmt[i].textAlign = 'right';
				this.tblDataContainer.addChild(betWinLoseAmt[i]);

				totalWinLoseAmt += parseInt(this.betHistory[i].win_money);
				totalBetAmtNum += parseInt(this.betHistory[i].bet_money);
		    }

		    if (totalWinLoseAmt > 0) {
				winLoseColor = '#2067cf';
			}
			else {
				winLoseColor = '#c83838';
			}

		    let totalBets = new createjs.Text(this.formatNumber(totalBetAmtNum), 'bold 20px Lato', '#231f20');
			totalBets.x = tblHeaderBg.x + 545;
			totalBets.y = (tblHeaderBg.y + tableHeight) + 5;
			totalBets.textAlign = 'right';
			this.tblDataContainer.addChild(totalBets);

			let totalWinLose = new createjs.Text(this.formatNumber(totalWinLoseAmt), 'bold 20px Lato', winLoseColor);
			totalWinLose.x = tblHeaderBg.x + 735;
			totalWinLose.y = (tblHeaderBg.y + tableHeight) + 5;
			totalWinLose.textAlign = 'right';
			this.tblDataContainer.addChild(totalWinLose);

			let containerHeight = (betCount + 1) * 40;

			this.resultContainer.setBounds(0, 0, tblWidth, containerHeight);
			let scrollprop = scrollbar().scrollable(this.betDetails, this.resultContainer, 1382, 480, true);
      		this.betDetails.addChild(scrollprop.toTop_btn);
		});

		return this.betDetails;
	},
	formatNumber(number) {
		if((window.casino == 'SS')) {
			return number.toLocaleString(undefined, {minimumFractionDigits: 2});
		} else {
			number = parseInt(number) || 0;
			return number.toLocaleString('en');
		}
  },
}

export default {
	lobby_paigow_data
}
