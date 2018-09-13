import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../factories/factories';
import cardValue from '../factories/cards';

let instance = null;

export default(links) => {
	instance = instance || new blu.Component({
		betResult : new createjs.Container(),
		betDetails: new createjs.Container(),
		themedTabs : [],
		themedTblHeader : [],
		logs : [],
		countTotal : 0,
		main() {
			//Init bet logs variables
			// this._betLogs = window.dragontigerLogs;
			// this._betShape = [];
			// this._betText = [];

			// //Dragon Tiger log data
			// this.logs = window.dragontigerLogs;
			// this.countTotal = this.logs.last_page;

			// //Draw bet logs result column
			// this.setBetLogs(this._betLogs);
		},

		setBetLogs(data) {
			this._betLogs = data;
			let betDataMarkCircle = [];
			let betDataMarkNum = [];

			for (var i = 0; i < this._betLogs.data.length; i++) {
				let record = this._betLogs.data[i];
				let results = JSON.parse(record.game_result);

				let markColorCode = '';
				let markText = '';
				switch(results.winner) {
					case ("suited tie"):
						markText = window.language.locale == "zh" ? '和' : 'T'
						markColorCode = '#06770d';
						break;

					case ("tie"):
						markText = window.language.locale == "zh" ? '和' : 'T'
						markColorCode = '#06770d';
						break;

					case ("dragon"):
						markText = window.language.locale == "zh" ? '龙' : 'D';
						markColorCode = '#1877d3 ';
						break;

					case ("tiger"):
						markText = window.language.locale == "zh" ? '虎' : 'T';
						markColorCode = '#b71d1d';
						break;
				}

				betDataMarkCircle[i] = new createjs.Shape();
				betDataMarkCircle[i].graphics.beginFill(markColorCode).drawCircle(0, 0, 15);
				betDataMarkCircle[i].y = 65 * i;
				this.betResult.addChild(betDataMarkCircle[i]);

				if (results.winner == 'suited tie') {
					betDataMarkCircle[i].graphics.clear().ss(2).s('#c97d1b').beginFill(markColorCode).drawCircle(0, 0, 15);
				}

				betDataMarkNum[i] = new createjs.Text(markText, 'bold 19px Lato', '#fff');
				betDataMarkNum[i].x = betDataMarkCircle[i].x;
				betDataMarkNum[i].y = betDataMarkCircle[i].y - 12;
				betDataMarkNum[i].textAlign = 'center';
				this.betResult.addChild(betDataMarkNum[i]);
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
			detailBg.graphics.setStrokeStyle(2).beginStroke('#000').beginFill('#d5d5d5').drawRoundRect(0, 0, mdlDetailWidth, 800, 7);
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
			this.cardsContainer.x = - 155;
			this.cardsContainer.y = - 50;

			this.tableContainer = new createjs.Container();
			this.tableContainer.scaleX = this.tableContainer.scaleY = 1.2;
			this.betDetails.addChild(this.tableContainer);
			this.tableContainer.x = - 150;
			this.tableContainer.y = - 70;

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
		    let winnerCircle = [];
			let winnerSide = [];
			let betCircle = [];
			let betColorCode = [];

			let betCount = 0;
			let parityText = '';
			let sizeText = '';
			let cardSuite = '';

			let isSuitedTie = false;

			this.resultContainer = new createjs.Container();
			this.resultContainer.y = tblHeaderBg.y + 60;
			this.resultContainer.x = - 0.5;
			this.betDetails.addChild(this.resultContainer);

			this.tblDataContainer = new createjs.Container();
			this.tblDataContainer.y = -540;
			this.tblDataContainer.x = -149;
			this.resultContainer.addChild(this.tblDataContainer);
			this.tblDataContainer.scaleX = this.tblDataContainer.scaleY = 1.2;

			$.post(links.getDragontigerDetails, {round: details.round, table: details.table, betId: details.betId}, (response) => {
				for (var i = 0; i < response.length; i++) {
					this.betHistory = JSON.parse(response[i].bet_history);
					this.gameInfo = JSON.parse(response[i].game_info);
					let gameResult = JSON.parse(response[i].game_result);

					let count = 0;
					betCount = this.betHistory.length;

					switch(gameResult.winner) {
						case ("suited tie"):
							winnerText = 'T'
							markColorCode = '#06770d';
							winnerSide = gameResult.side_bets.dragon;
							isSuitedTie = true;
							break;

						case ("tie"):
							winnerText = 'T'
							markColorCode = '#06770d';
							winnerSide = gameResult.side_bets.dragon;
							break;

						case ("dragon"):
							winnerText = 'D';
							markColorCode = '#1877d3 ';
							winnerSide = gameResult.side_bets.dragon;
							break;

						case ("tiger"):
							winnerText = 'T';
							markColorCode = '#b71d1d';
							winnerSide = gameResult.side_bets.tiger;
							break;
					}

					if (gameResult.side_bets == 'seven') {
						winnerSide = [];
					}
				} //end for loop

				for (var i = 0; i < 4; i++) {
					winnerCircle[i] = new createjs.Shape();
					winnerCircle[i].graphics.beginFill(markColorCode).drawCircle(0, 0, 22);
					winnerCircle[i].x = (detailResultCon.x - 85) + (55 * i);
					winnerCircle[i].y = detailResultCon.y + 35;
					this.betDetails.addChild(winnerCircle[i]);

					if (isSuitedTie) {
						winnerCircle[i].graphics.clear().ss(2).s('#c97d1b').beginFill(markColorCode).drawCircle(0, 0, 22);
					}
				}

				let winnerTextObj = new createjs.Text(winnerText, 'bold 30px Lato', '#fff');
				winnerTextObj.x = winnerCircle[0].x;
				winnerTextObj.y = winnerCircle[0].y - 18;
				winnerTextObj.textAlign = 'center';
				this.betDetails.addChild(winnerTextObj);

				if (winnerSide) {
					switch(winnerSide.parity) {
						case ("odd"):
							parityText = 'O';
							break;

						case ("even"):
							parityText = 'E';
							break;
					}

					switch(winnerSide.size) {
						case ("big"):
							sizeText = 'B';
							break;

						case ("small"):
							sizeText = 'S';
							break;
					}

					cardSuite = winnerSide.suite;
				}
				else {
					parityText = '7';
					sizeText = '7';
				}

				if (parityText) {
					let parityTextObj = new createjs.Text(parityText, 'bold 30px Lato', '#fff');
					parityTextObj.x = winnerCircle[1].x;
					parityTextObj.y = winnerCircle[1].y - 18;
					parityTextObj.textAlign = 'center';
					this.betDetails.addChild(parityTextObj);

					let sizeTextObj = new createjs.Text(sizeText, 'bold 30px Lato', '#fff');
					sizeTextObj.x = winnerCircle[2].x;
					sizeTextObj.y = winnerCircle[2].y - 18;
					sizeTextObj.textAlign = 'center';
					this.betDetails.addChild(sizeTextObj);

					let suiteObj = new createjs.Bitmap("/img/card-suite/"+cardSuite+".png");
					suiteObj.scaleX = suiteObj.scaleY = 0.45;
					suiteObj.x = winnerCircle[3].x - 14;
					suiteObj.y = winnerCircle[3].y - 13;
					this.betDetails.addChild(suiteObj);
				}
				else {
					winnerCircle[0].x += 80;
					winnerTextObj.x += 80;

					winnerCircle[1].visible = false;
					winnerCircle[2].visible = false;
					winnerCircle[3].visible = false;
				}

				let tableHeight = (betCount + 1) * 40;

				detailBg.graphics.clear().setStrokeStyle(2).beginStroke('#000').beginFill('#d5d5d5').drawRoundRect(0, 0, mdlDetailWidth, 800 , 7);

				//Table
			    let tblBodyBorder = new createjs.Shape();
				tblBodyBorder.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').drawRect(0, 0, tblWidth, tableHeight);
				tblBodyBorder.x = tblHeaderBg.x;
				tblBodyBorder.y = tblHeaderBg.y + 40;
				this.tblDataContainer.addChild(tblBodyBorder);

				let tblTotalText = new createjs.Text(window.language.lobby.total, 'bold 20px Lato', '#231f20');
				tblTotalText.x = tblHeaderBg.x + 90;
				tblTotalText.y = (tblHeaderBg.x + tableHeight) - 62;
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
			    tblBorderVer1.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x + 200, tblHeaderBg.y+40).lineTo(tblBodyBorder.x + 200, tblHeaderBg.y+tableHeight+40);
			    this.tblDataContainer.addChild(tblBorderVer1);

			    let tblBorderVer2 = new createjs.Shape();
			    tblBorderVer2.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x + 400, tblHeaderBg.y+40).lineTo(tblBodyBorder.x + 400, tblHeaderBg.y+tableHeight+40);
			    this.tblDataContainer.addChild(tblBorderVer2);

			    let betText = '';
			    let betTextObj = [];
			    let betAmtObj = [];
			    let winLoseObj = [];
			    let totalBetAmt = 0;
			    let totalWinLoseAmt = 0;
			    let winLoseColor = '';
			    let winLoseAmt = 0;

			    for (var j = 0; j < betCount; j++) {
			    	let isText = false;

			    	if (this.betHistory[j].bet == 'tie') {
			    		betColorCode = '#057811';
			    		isText = true;
			    		betText = 'T';
			    	}
			    	else if (this.betHistory[j].bet == 'suited_tie') {
			    		betColorCode = '#057811';
			    		isText = true;
			    		betText = 'T';
			    	}
			    	else {
			    		let partsOfStr = this.betHistory[j].bet.split('_');

			    		switch(partsOfStr[0]) {
							case ("dragon"):
								betColorCode = '#1976d3';

								if (partsOfStr[1] === undefined) {
									isText = true;
									betText = 'D';
								}
								break;

							case ("tiger"):
								betColorCode = '#b61c1e';

								if (partsOfStr[1] === undefined) {
									isText = true;
									betText = 'T';
								}
								break;
						}

						if (!isText) {
							if (partsOfStr[1] == 'even') {
								isText = true;
								betText = 'E';
							}
							else if (partsOfStr[1] == 'odd') {
								isText = true;
								betText = 'O';
							}
							else if (partsOfStr[1] == 'big') {
								isText = true;
								betText = 'B';
							}
							else if (partsOfStr[1] == 'small') {
								isText = true;
								betText = 'S';
							}
							else if (partsOfStr[1] == 'diamonds') {
								isText = false;
								betText = 'diamond';
							}
							else if (partsOfStr[1] == 'clubs') {
								isText = false;
								betText = 'club';
							}
							else if (partsOfStr[1] == 'hearts') {
								isText = false;
								betText = 'heart';
							}
							else if (partsOfStr[1] == 'spades') {
								isText = false;
								betText = 'spade';
							}
						}
			    	}

					betCircle[j] = new createjs.Shape();
					betCircle[j].graphics.beginFill(betColorCode).drawCircle(0, 0, 15);
					betCircle[j].x = tblHeaderBg.x + 90;
					betCircle[j].y = (tblHeaderBg.y + 60) + (j * 40);
					this.tblDataContainer.addChild(betCircle[j]);

					if (isText) {
						betTextObj[j] = new createjs.Text(betText, 'bold 19px Lato', '#fff');
						betTextObj[j].x = betCircle[j].x;
						betTextObj[j].y = betCircle[j].y - 13;
						betTextObj[j].textAlign = 'center';
						this.tblDataContainer.addChild(betTextObj[j]);

						if (this.betHistory[j].bet == 'suited_tie') {
							betCircle[j].graphics.ss(3).s('#c97d1b').beginFill(betColorCode).drawCircle(0, 0, 15);
						}
					}
					else {
						betTextObj[j] = new createjs.Bitmap("/img/card-suite/"+betText+".png");
						betTextObj[j].scaleX = betTextObj[j].scaleY = 0.37;
						betTextObj[j].x = betCircle[j].x - 12;
						betTextObj[j].y = betCircle[j].y - 10;
						this.tblDataContainer.addChild(betTextObj[j]);
					}

					betAmtObj[j] = new createjs.Text(this.formatNumber(this.betHistory[j].bet_money), 'bold 19px Lato', '#231f20');
					betAmtObj[j].x = tblHeaderBg.x + 370;
					betAmtObj[j].y = (tblHeaderBg.y + 50) + (j * 40);
					betAmtObj[j].textAlign = 'right';
					this.tblDataContainer.addChild(betAmtObj[j]);

					if (this.betHistory[j].win_money == 0) {
						winLoseColor = '#c63837';
						// winLoseAmt = this.betHistory[j].win_money - this.betHistory[j].bet_money;
					}
					else {
						winLoseColor = '#067610';
						// winLoseAmt = this.betHistory[j].win_money + this.betHistory[j].bet_money;
					}

					winLoseObj[j] = new createjs.Text(this.formatNumber(this.betHistory[j].win_money), 'bold 19px Lato', winLoseColor);
					winLoseObj[j].x = tblHeaderBg.x + 570;
					winLoseObj[j].y = (tblHeaderBg.y + 50) + (j * 40);
					winLoseObj[j].textAlign = 'right';
					this.tblDataContainer.addChild(winLoseObj[j]);

					totalBetAmt += this.betHistory[j].bet_money;
					totalWinLoseAmt += this.betHistory[j].win_money;
				} //end for loop

				let totalBetObj = new createjs.Text(this.formatNumber(totalBetAmt), 'bold 20px Lato', '#242021');
				totalBetObj.x = tblHeaderBg.x + 370;
				totalBetObj.y = (tblHeaderBg.x + tableHeight) - 62;
				totalBetObj.textAlign = 'right';
				this.tblDataContainer.addChild(totalBetObj);

				if (totalWinLoseAmt > 0) {
					winLoseColor = '#2067cf';
				}
				else {
					winLoseColor = '#c83838';
				}

				let totalWinLoseObj = new createjs.Text(this.formatNumber(totalWinLoseAmt), 'bold 20px Lato', winLoseColor);
				totalWinLoseObj.x = tblHeaderBg.x + 570;
				totalWinLoseObj.y = (tblHeaderBg.x + tableHeight) - 62;
				totalWinLoseObj.textAlign = 'right';
				this.tblDataContainer.addChild(totalWinLoseObj);

				//Card result bg
				let resultCardConLeft = new createjs.Shape();
				resultCardConLeft.graphics.beginFill("#c9c9c9").drawRoundRect(0, 0, 135, 135, 3);
				resultCardConLeft.x = detailResultCon.x - 160;
				resultCardConLeft.y = detailResultCon.y + 90;
				this.cardsContainer.addChild(resultCardConLeft);

				let resultCardConRight = new createjs.Shape();
				resultCardConRight.graphics.beginFill("#c9c9c9").drawRoundRect(0, 0, 135, 135, 3);
				resultCardConRight.x = detailResultCon.x + 20;
				resultCardConRight.y = detailResultCon.y + 90;
				this.cardsContainer.addChild(resultCardConRight);

				//Card result circle
				let leftResultCircle = new createjs.Shape();
				leftResultCircle.graphics.beginFill('#1976d3').drawCircle(0, 0, 27);
				leftResultCircle.x = resultCardConLeft.x;
				leftResultCircle.y = resultCardConLeft.y + 65;
				this.cardsContainer.addChild(leftResultCircle);

				let rightResultCircle = new createjs.Shape();
				rightResultCircle.graphics.beginFill('#b71b1c').drawCircle(0, 0, 27);
				rightResultCircle.x = resultCardConRight.x + 135;
				rightResultCircle.y = resultCardConRight.y + 65;
				this.cardsContainer.addChild(rightResultCircle);

				//Cards
				let resultCardLeft = createCardSprite(this, 74, 99, 'img/cards/lobby_sprite_cards.png');
				resultCardLeft.x = resultCardConLeft.x + 50;
				resultCardLeft.y = resultCardConLeft.y + 15;
				resultCardLeft.gotoAndStop('C'+this.gameInfo.dragon);
				this.cardsContainer.addChild(resultCardLeft);

				let resultCardRight = createCardSprite(this, 74, 99, 'img/cards/lobby_sprite_cards.png');
				resultCardRight.x = resultCardConRight.x + 10;
				resultCardRight.y = resultCardConRight.y + 15;
				resultCardRight.gotoAndStop('C'+this.gameInfo.tiger);
				this.cardsContainer.addChild(resultCardRight);

				//Card Values
				let valDragon = cardValue(this.gameInfo.dragon)
				let resultValueLeft = new createjs.Text(valDragon.value, 'bold 33px Lato', '#fff');
				resultValueLeft.x = leftResultCircle.x;
				resultValueLeft.y = leftResultCircle.y - 21;
				resultValueLeft.textAlign = 'center';
				this.cardsContainer.addChild(resultValueLeft);

				let valTiger = cardValue(this.gameInfo.tiger)
				let resultValueRight = new createjs.Text(valTiger.value, 'bold 33px Lato', '#fff');
				resultValueRight.x = rightResultCircle.x;
				resultValueRight.y = rightResultCircle.y - 21;
				resultValueRight.textAlign = 'center';
				this.cardsContainer.addChild(resultValueRight);

				let containerHeight = (betCount + 1) * (40 * 1.2);
				this.resultContainer.setBounds(0, 0, tblWidth, containerHeight);
				let scrollprop = this.context.lobby_scrollbar.scrollable(this.betDetails, this.resultContainer, 1169, 505);
				this.betDetails.addChild(scrollprop.toTop_btn);

			});

			return this.betDetails;
		},

		formatNumber(number) {
	      number = parseInt(number) || 0;
	      return number.toLocaleString('en');
	    },
	});

	return instance;
}
