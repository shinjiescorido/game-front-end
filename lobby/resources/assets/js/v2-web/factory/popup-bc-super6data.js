import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../../factories/factories';
import cardValue from '../../factories/cards';
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
}

let lobby_supersix_data = {
	betResult : new createjs.Container(),
	betDetails: new createjs.Container(),
	themedTabs : [],
	themedTblHeader : [],
	logs : [],
	countTotal : 0,
	main() {
	},
	setBetLogs(data) {
		this._betLogs = data;
		let betDataMarkCircle = [];
		let betDataMarkNum = [];
		let betDataPairCircle = [];

		for (var i = 0; i < this._betLogs.data.length; i++) {
			let record = this._betLogs.data[i];
			let results = JSON.parse(record.game_result);

			if (!record.bet_history) { continue; }
      if (!results) { continue; }

      if (record.status.toLowerCase() === 'w') {
				let voidIco = new createjs.Bitmap("/img/v2_1/icons/void/void_icon.png");
				voidIco.y = (65 * i) - 13;
				this.betResult.addChild(voidIco);
				
				continue;
			}
			
			let markColorCode = '';
			let markText = '';
			switch(results.winner) {
				case ("tie"):
					markText = window.language.locale == "zh" ? '和' : 'T'
					markColorCode = '#689f39';
					break;

				case ("banker"):
					markText = window.language.locale == "zh" ? '庄' : 'B';
					// supersix : checks if its a supersix winner as well
					markColorCode = (results.supersix)?'#de9940':'#b61c1a';
					break;

				case ("player"):
					markText = window.language.locale == "zh" ? '闲' : 'P';
					markColorCode = '#1b76d1';
					break;
			}

			betDataMarkCircle[i] = new createjs.Shape();
			betDataMarkCircle[i].graphics.beginFill(markColorCode).drawCircle(0, 0, 15);
			betDataMarkCircle[i].y = 65 * i;
			this.betResult.addChild(betDataMarkCircle[i]);

			betDataMarkNum[i] = new createjs.Text(markText, 'bold 19px Lato', '#fff');
			betDataMarkNum[i].x = betDataMarkCircle[i].x;
			betDataMarkNum[i].y = betDataMarkCircle[i].y - 12;
			betDataMarkNum[i].textAlign = 'center';
			this.betResult.addChild(betDataMarkNum[i]);

			if (results.pairs.length) {
				for (var j = 0; j < results.pairs.length; j++) {
					if (results.pairs[j] == 'player') {
						betDataPairCircle[j] = new createjs.Shape();
						betDataPairCircle[j].graphics.s('#fff').ss(0.3).beginFill('#1977d1').drawCircle(0, 0, 5);
						betDataPairCircle[j].x = betDataMarkCircle[i].x + 10;
						betDataPairCircle[j].y = betDataMarkCircle[i].y + 10;
						this.betResult.addChild(betDataPairCircle[j]);
					}
					else if (results.pairs[j] == 'banker') {
						betDataPairCircle[j] = new createjs.Shape();
						betDataPairCircle[j].graphics.s('#fff').ss(0.3).beginFill('#d32f2e').drawCircle(0, 0, 5);
						betDataPairCircle[j].x = betDataMarkCircle[i].x - 10;
						betDataPairCircle[j].y = betDataMarkCircle[i].y - 10;
						this.betResult.addChild(betDataPairCircle[j]);
					}
				}
			}
		} //end for loop

		return this.betResult;
	},

	paginateResult(data) {
		this.betResult.removeAllChildren();
		this.setBetLogs(JSON.parse(data));
	},

	showDetails(details) {
		let mdlDetailWidth = 820;
		let tblBorderHor = [];

		this.betDetails.removeAllChildren();

		let detailBg = new createjs.Shape();
		detailBg.graphics.setStrokeStyle(2).beginStroke('#000').beginFill('#d5d5d5').drawRoundRect(0, 0, mdlDetailWidth, 600, 7);
		detailBg.x = (details.width / 2) - (mdlDetailWidth / 2);
		detailBg.y = 100;
		this.betDetails.addChild(detailBg);

		//Click event to prevent click behind the modal
		detailBg.addEventListener("mousedown", (e) => {
			return;
		});

		this.cardsContainer = new createjs.Container();
		this.cardsContainer.scaleX = this.cardsContainer.scaleY = 1.2;
		this.betDetails.addChild(this.cardsContainer);
		this.cardsContainer.x = (-600 * 0.2) - 40;

		this.tableContainer = new createjs.Container();
		this.tableContainer.scaleX = this.tableContainer.scaleY = 1.2;
		this.betDetails.addChild(this.tableContainer);
		this.tableContainer.x = (-600 * 0.2) - 31;

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
		detailResultCon.graphics.setStrokeStyle(1).beginStroke('#999999').beginFill('#e5e5e5').drawRoundRect(-165, 0, 330, 70, 3);
		detailResultCon.x = detailSubHeaderBg.x + (mdlDetailWidth/2);
		detailResultCon.y = detailSubHeaderBg.y + 12;
		this.betDetails.addChild(detailResultCon);

		//Close modal
		headerCloseHit.addEventListener("mousedown", (e) => {
        	this.betDetails.visible = false;
	    });

		let tblWidth = 600;

		let tblHeaderBg = new createjs.Shape();
		tblHeaderBg.graphics.beginFill('#c9c9c9').drawRect(0, 0, tblWidth, 40);
		tblHeaderBg.x = detailSubHeaderBg.x + 100;
		tblHeaderBg.y = detailResultCon.y + 250;
		this.tableContainer.addChild(tblHeaderBg);

		let tblHeaderBetType = new createjs.Text(window.language.menu.betcaps +' '+ window.language.menu.typecaps, 'bold 16px Lato', '#242021');
		tblHeaderBetType.x = tblHeaderBg.x + 90;
		tblHeaderBetType.y = tblHeaderBg.y + 10;
		tblHeaderBetType.textAlign = 'center';
		this.tableContainer.addChild(tblHeaderBetType);

		let tblHeaderBets = new createjs.Text(window.language.menu.betscaps, 'bold 16px Lato', '#242021');
		tblHeaderBets.x = tblHeaderBg.x + 290;
		tblHeaderBets.y = tblHeaderBg.y + 10;
		tblHeaderBets.textAlign = 'center';
		this.tableContainer.addChild(tblHeaderBets);

		let tblHeaderWin = new createjs.Text(window.language.menu.payoutcaps, 'bold 16px Lato', '#242021');
		tblHeaderWin.x = tblHeaderBg.x + 490;
		tblHeaderWin.y = tblHeaderBg.y + 10;
		tblHeaderWin.textAlign = 'center';
		this.tableContainer.addChild(tblHeaderWin);

		let markColorCode = '';
		let winnerText = '';
		let pairsColorCode = '';
		let pairsText = '';
		let pairsSmallCircle = [];

		let betCircle = [];
		let betColorCode = [];
		let betCount = 0;
		let parityText = '';
		let sizeText = '';

		$.post(links.getSupersixDetails, {round: details.round, table: details.table, betId: details.betId}, (response) => {
			for (var i = 0; i < response.length; i++) {
				this.betHistory = JSON.parse(response[i].bet_history);
				this.gameInfo = JSON.parse(response[i].game_info);
				this.gameResult = JSON.parse(response[i].game_result);

				betCount = this.betHistory.length;

				switch(this.gameResult.winner) {
					case ("player"):
						winnerText = 'P'
						markColorCode = '#1977d1';
						break;

					case ("banker"):
						winnerText = 'B';
						markColorCode = (this.gameResult.supersix)?'#de9940':'#d32f2e';
						break;

					case ("tie"):
						winnerText = 'T';
						markColorCode = '#689f37';
						break;
				}

				// if (gameResult.pairs.length == 1) {
				// 	switch(gameResult.pairs[0]) {
				// 		case ("player"):
				// 			pairsText = 'P'
				// 			pairsColorCode = '#1977d1';
				// 			break;

				// 		case ("banker"):
				// 			pairsText = 'B';
				// 			pairsColorCode = '#d32f2e ';
				// 			break;

				// 		case ("tie"):
				// 			pairsText = 'T';
				// 			pairsColorCode = '#689f37';
				// 			break;
				// 	}
				// }
			} //end for loop

			//Main result
			let winnerCircle = new createjs.Shape();
			winnerCircle.graphics.beginFill(markColorCode).drawCircle(0, 0, 30);
			winnerCircle.x = detailResultCon.x;
			winnerCircle.y = detailResultCon.y + 35;
			this.betDetails.addChild(winnerCircle);

			let winnerTextObj = new createjs.Text(winnerText, 'bold 35px Lato', '#fff');
			winnerTextObj.x = winnerCircle.x;
			winnerTextObj.y = winnerCircle.y - 23;
			winnerTextObj.textAlign = 'center';
			this.betDetails.addChild(winnerTextObj);

			if (this.gameResult.pairs.length) {
				for (var i = 0; i < this.gameResult.pairs.length; i++) {
					if (this.gameResult.pairs[i] == 'player') {
						pairsSmallCircle[i] = new createjs.Shape();
						pairsSmallCircle[i].graphics.s('#fff').ss(1).beginFill('#1977d1').drawCircle(0, 0, 9);
						pairsSmallCircle[i].x = winnerCircle.x + 21;
						pairsSmallCircle[i].y = winnerCircle.y + 20;
						this.betDetails.addChild(pairsSmallCircle[i]);
					}
					else if (this.gameResult.pairs[i] == 'banker') {
						pairsSmallCircle[i] = new createjs.Shape();
						pairsSmallCircle[i].graphics.s('#fff').ss(1).beginFill('#d32f2e').drawCircle(0, 0, 9);
						pairsSmallCircle[i].x = winnerCircle.x - 21;
						pairsSmallCircle[i].y = winnerCircle.y - 20;
						this.betDetails.addChild(pairsSmallCircle[i]);
					}
				}
			}

			//Cards con
			let cardResultCon = new createjs.Shape();
			cardResultCon.graphics.beginFill("#c9c9c9").drawRoundRect(0, 0, 575, 130, 3);
			cardResultCon.x = detailSubHeaderBg.x + 120;
			cardResultCon.y = detailResultCon.y + 80;
			this.cardsContainer.addChild(cardResultCon);

			//Banker card results
			let totalPlayerAmt = 0;
			let totalBankerAmt = 0;

			if (this.gameInfo.player3 !== null) {
				let playerCard3 = createCardSprite(this, 74, 99, '/img/cards/lobby_sprite_cards.png');
				playerCard3.x = cardResultCon.x + 20;
				playerCard3.y = cardResultCon.y + 115;
				playerCard3.rotation = -90;
				playerCard3.gotoAndStop('C'+this.gameInfo.player3);
				this.cardsContainer.addChild(playerCard3);

				if (cardValue(this.gameInfo.player3).value < 10) {
					totalPlayerAmt += cardValue(this.gameInfo.player3).value;
				}
			}

			let playerCard2 = createCardSprite(this, 74, 99, '/img/cards/lobby_sprite_cards.png');
			playerCard2.x = cardResultCon.x + 123;
			playerCard2.y = cardResultCon.y + 15;
			playerCard2.gotoAndStop('C'+this.gameInfo.player2);
			this.cardsContainer.addChild(playerCard2);

			if (cardValue(this.gameInfo.player2).value < 10) {
				totalPlayerAmt += cardValue(this.gameInfo.player2).value;
			}

			let playerCard1 = createCardSprite(this, 74, 99, '/img/cards/lobby_sprite_cards.png');
			playerCard1.x = playerCard2.x + 77;
			playerCard1.y = cardResultCon.y + 15;
			playerCard1.gotoAndStop('C'+this.gameInfo.player1);
			this.cardsContainer.addChild(playerCard1);

			if (cardValue(this.gameInfo.player1).value < 10) {
				totalPlayerAmt += cardValue(this.gameInfo.player1).value;
			}

			//Player card results
			let bankerCard1 = createCardSprite(this, 74, 99, '/img/cards/lobby_sprite_cards.png');
			bankerCard1.x = playerCard1.x + 100;
			bankerCard1.y = cardResultCon.y + 15;
			bankerCard1.gotoAndStop('C'+this.gameInfo.banker1);
			this.cardsContainer.addChild(bankerCard1);

			if (cardValue(this.gameInfo.banker1).value < 10) {
				totalBankerAmt += cardValue(this.gameInfo.banker1).value;
			}

			let bankerCard2 = createCardSprite(this, 74, 99, '/img/cards/lobby_sprite_cards.png');
			bankerCard2.x = bankerCard1.x + 77;
			bankerCard2.y = cardResultCon.y + 15;
			bankerCard2.gotoAndStop('C'+this.gameInfo.banker2);
			this.cardsContainer.addChild(bankerCard2);

			if (cardValue(this.gameInfo.banker2).value < 10) {
				totalBankerAmt += cardValue(this.gameInfo.banker2).value;
			}

			if (this.gameInfo.banker3 !== null) {
				let bankerCard3 = createCardSprite(this, 74, 99, '/img/cards/lobby_sprite_cards.png');
				bankerCard3.x = bankerCard2.x + 180;
				bankerCard3.y = cardResultCon.y + 40;
				bankerCard3.rotation = 90;
				bankerCard3.gotoAndStop('C'+this.gameInfo.banker3);
				this.cardsContainer.addChild(bankerCard3);

				if (cardValue(this.gameInfo.banker3).value < 10) {
					totalBankerAmt += cardValue(this.gameInfo.banker3).value;
				}
			}

			//Result circle
			let resultPlayerCircle = new createjs.Shape();
			resultPlayerCircle.graphics.beginFill('#1977d1').drawCircle(0, 0, 23);
			resultPlayerCircle.x = cardResultCon.x + 50;
			resultPlayerCircle.y = cardResultCon.y;
			this.cardsContainer.addChild(resultPlayerCircle);

			let bankerPlayerCircle = new createjs.Shape();
			bankerPlayerCircle.graphics.beginFill('#d32f2e').drawCircle(0, 0, 23);
			bankerPlayerCircle.x = cardResultCon.x + 525;
			bankerPlayerCircle.y = cardResultCon.y;
			this.cardsContainer.addChild(bankerPlayerCircle);

			//Result value
		    /*let holder = 0;

		    if (totalPlayerAmt > 9) {
		     holder = totalPlayerAmt.toString();
		                    console.log("holder : ", holder);
		     totalPlayerAmt = holder.slice(-1);
		                    console.log("totalPlayerAmt : ", totalPlayerAmt);
		    }*/

		    let playerTotalVal = new createjs.Text(parseInt(totalPlayerAmt) % 10, 'bold 28px Lato', '#fff');
		    playerTotalVal.x = resultPlayerCircle.x;
		    playerTotalVal.y = resultPlayerCircle.y - 18;
		    playerTotalVal.textAlign = 'center';
		    this.cardsContainer.addChild(playerTotalVal);

		    /*if (totalBankerAmt > 9) {
		     holder = totalBankerAmt.toString();
		     console.log("holder : ", holder);
		     totalBankerAmt = holder.slice(-1);
		                    console.log("totalBankerAmt : ", totalBankerAmt);
		    }*/

		    let bankerTotalVal = new createjs.Text(parseInt(totalBankerAmt) % 10, 'bold 28px Lato', '#fff');
		    bankerTotalVal.x = bankerPlayerCircle.x;
		    bankerTotalVal.y = bankerPlayerCircle.y - 18;
		    bankerTotalVal.textAlign = 'center';
		    this.cardsContainer.addChild(bankerTotalVal);

			//Table data
			let tableHeight = (betCount + 1) * 40;

			detailBg.graphics.clear().setStrokeStyle(2).beginStroke('#000').beginFill('#d5d5d5').drawRoundRect(0, 0, mdlDetailWidth, tableHeight+ 550, 7);

			//Table
		    let tblBodyBorder = new createjs.Shape();
			tblBodyBorder.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').drawRect(0, 0, tblWidth, tableHeight);
			tblBodyBorder.x = tblHeaderBg.x;
			tblBodyBorder.y = tblHeaderBg.y + 40;
			this.tableContainer.addChild(tblBodyBorder);

			let tblTotalText = new createjs.Text(window.language.lobby.total, 'bold 20px Lato', '#231f20');
			tblTotalText.x = tblHeaderBg.x + 100;
			tblTotalText.y = (tblHeaderBg.y + tableHeight) + 6.5;
			tblTotalText.textAlign = 'center';
			this.tableContainer.addChild(tblTotalText);

			//Table horizontal borders
			for (var i = 0; i < betCount + 1; i++) {
				tblBorderHor[i] = new createjs.Shape();
			    tblBorderHor[i].graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x, (tblHeaderBg.y+40) + (i * 40)).lineTo(tblBodyBorder.x + tblWidth, (tblHeaderBg.y+40) + (i * 40));
			    this.tableContainer.addChild(tblBorderHor[i]);
			} //end for loop

			//Table vertical borders
			let tblBorderVer1 = new createjs.Shape();
		    tblBorderVer1.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x + 200, tblHeaderBg.y+40).lineTo(tblBodyBorder.x + 200, tblHeaderBg.y+tableHeight+40);
		    this.tableContainer.addChild(tblBorderVer1);

		    let tblBorderVer2 = new createjs.Shape();
		    tblBorderVer2.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x + 400, tblHeaderBg.y+40).lineTo(tblBodyBorder.x + 400, tblHeaderBg.y+tableHeight+40);
		    this.tableContainer.addChild(tblBorderVer2);

			let betTypeCircle = [];
			let betPairCircle = [];
			let betTypeTextObj = [];
			let betTypeText = '';

			let betAmtObj = [];
			let betWinLoseObj = [];
			let moneyColorCode = '';
			let winLoseColor = '';
			let totalWinLoseAmt = 0;
			let totalBetAmtNum = 0;

			//Table data
			for (var i = 0; i < betCount; i++) {
				switch(this.betHistory[i].bet) {
					case ("player"):
						betTypeText = 'P'
						markColorCode = '#1977d1';
						break;

					case ("playerpair"):
						betTypeText = 'P'
						markColorCode = '#1977d1';
						break;

					case ("banker"):
						betTypeText = 'B';
						markColorCode = '#d32f2e ';
						break;

					case ("bankerpair"):
						betTypeText = 'B';
						markColorCode = '#d32f2e ';
						break;

					case ("supersix"): // for supersix bets
						betTypeText = "B";
						markColorCode = '#de9940';
					  break;

					case ("tie"):
						betTypeText = 'T';
						markColorCode = '#689f37';
						break;
				}

				betTypeCircle[i] = new createjs.Shape();
				betTypeCircle[i].graphics.beginFill(markColorCode).drawCircle(0, 0, 15);
				betTypeCircle[i].x = tblHeaderBg.x + 100;
				betTypeCircle[i].y = (tblHeaderBg.y + 60) + (i * 40);
				this.tableContainer.addChild(betTypeCircle[i]);

				if (this.betHistory[i].bet == 'playerpair') {
					betPairCircle[i] = new createjs.Shape();
					betPairCircle[i].graphics.s('#fff').ss(0.3).beginFill(markColorCode).drawCircle(0, 0, 5);
					betPairCircle[i].x = betTypeCircle[i].x + 10;
					betPairCircle[i].y = betTypeCircle[i].y + 10;
					this.tableContainer.addChild(betPairCircle[i]);
				}
				else if (this.betHistory[i].bet == 'bankerpair') {
					betPairCircle[i] = new createjs.Shape();
					betPairCircle[i].graphics.s('#fff').ss(0.3).beginFill(markColorCode).drawCircle(0, 0, 5);
					betPairCircle[i].x = betTypeCircle[i].x - 10;
					betPairCircle[i].y = betTypeCircle[i].y - 10;
					this.tableContainer.addChild(betPairCircle[i]);
				}

				betTypeTextObj[i] = new createjs.Text(betTypeText, 'bold 19px Lato', '#fff');
				betTypeTextObj[i].x = betTypeCircle[i].x;
				betTypeTextObj[i].y = betTypeCircle[i].y - 12;
				betTypeTextObj[i].textAlign = 'center';
				this.tableContainer.addChild(betTypeTextObj[i]);

				betAmtObj[i] = new createjs.Text(this.formatNumber(this.betHistory[i].bet_money), 'normal 20px Lato', '#231f20');
				betAmtObj[i].x = tblHeaderBg.x + 380;
				betAmtObj[i].y = (tblHeaderBg.y + 46.5) + (i * 40);
				betAmtObj[i].textAlign = 'right';
				this.tableContainer.addChild(betAmtObj[i]);

				// let winLoseAmount = 0;
				// if (this.betHistory[i].win_money == 0 && this.betHistory[i].bet_money != 0) {
				// 	moneyColorCode = '#c7383a';
				// 	winLoseAmount = this.betHistory[i].win_money;
				// }
				// else {
				// 	if (this.gameResult.winner == 'tie') {
				// 		if (this.betHistory[i].bet == 'banker' || this.betHistory[i].bet == 'player') {
				// 			winLoseAmount = this.betHistory[i].win_money;
				// 		}
				// 	}
				// 	else {
				// 		winLoseAmount = this.betHistory[i].win_money + this.betHistory[i].bet_money;
				// 	}

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
					moneyColorCode = '#c83838';
				}

				betWinLoseObj[i] = new createjs.Text(this.formatNumber(this.betHistory[i].win_money), 'normal 20px Lato', moneyColorCode);
				betWinLoseObj[i].x = tblHeaderBg.x + 580;
				betWinLoseObj[i].y = (tblHeaderBg.y + 46.5) + (i * 40);
				betWinLoseObj[i].textAlign = 'right';
				this.tableContainer.addChild(betWinLoseObj[i]);

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
			totalBets.x = tblHeaderBg.x + 380;
			totalBets.y = (tblHeaderBg.y + tableHeight) + 6.5;
			totalBets.textAlign = 'right';
			this.tableContainer.addChild(totalBets);

			let totalWinLose = new createjs.Text(this.formatNumber(totalWinLoseAmt), 'bold 20px Lato', winLoseColor);
			totalWinLose.x = tblHeaderBg.x + 580;
			totalWinLose.y = (tblHeaderBg.y + tableHeight) + 6.5;
			totalWinLose.textAlign = 'right';
			this.tableContainer.addChild(totalWinLose);
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
	lobby_supersix_data
}
