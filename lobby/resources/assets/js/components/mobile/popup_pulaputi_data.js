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
			// this._betLogs = window.pulaputiLogs;
			// this._betShape = [];
			// this._betText = [];

			// //Pula-Puti log data
			// this.logs = window.pulaputiLogs;
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
				let results = JSON.parse(record.mark);

				let markColorCode = '';
				switch(results.mark) {
					case ("r"):
						markColorCode = '#c62828';
						break;

					case ("w"):
						markColorCode = '#fff';
						break;

					case ("g"):
						markColorCode = '#ff9b28';
						break;
				}

				betDataMarkCircle[i] = new createjs.Shape();
				betDataMarkCircle[i].graphics.beginFill(markColorCode).drawCircle(0, 0, 20);
				betDataMarkCircle[i].y = 65 * i;
				this.betResult.addChild(betDataMarkCircle[i]);

				betDataMarkNum[i] = new createjs.Text(results.num, 'bold 24px Lato', '#000');
				betDataMarkNum[i].x = betDataMarkCircle[i].x + 7;
				betDataMarkNum[i].y = betDataMarkCircle[i].y - 15;
				betDataMarkNum[i].textAlign = 'right';
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
			detailBg.graphics.setStrokeStyle(2).beginStroke('#000').beginFill('#d5d5d5').drawRoundRect(0, 0, mdlDetailWidth, 520, 7);
			detailBg.x = (details.width / 2) - (mdlDetailWidth / 2);
			detailBg.y = 150;
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

			let detailHeaderTxt = new createjs.Text(window.language.menu.winningresultcaps, 'bold 24px Lato', '#2b2b2b');
			detailHeaderTxt.x = detailBg.x + (mdlDetailWidth / 2);
			detailHeaderTxt.y = detailBg.y + 10;
			detailHeaderTxt.textAlign = 'center';
			this.betDetails.addChild(detailHeaderTxt);

			//Header Close button
			let headerClose = new createjs.Text("X","bold 20px arial", '#2b2b2b');
			headerClose.x = detailBg.x + (mdlDetailWidth - 30);
			headerClose.y = detailBg.y + 15;
			this.betDetails.addChild(headerClose);

			//Close button hitarea
			let headerCloseHit = new createjs.Shape();
			headerCloseHit.graphics.beginFill("#000").drawRect(0, 0, 50, 40);
			headerCloseHit.x = headerClose.x - 20;
			headerCloseHit.y = headerClose.y - 10;
			headerCloseHit.cursor = "pointer";
			headerCloseHit.alpha = 0.01;
			this.betDetails.addChild(headerCloseHit);

			let detailSubHeaderBg = new createjs.Shape();
			detailSubHeaderBg.graphics.beginFill('#bcbcbc').drawRect(0, 0, mdlDetailWidth-3, 45);
			detailSubHeaderBg.x = detailBg.x + 2;
			detailSubHeaderBg.y = detailHeaderBg.y + 45;
			this.betDetails.addChild(detailSubHeaderBg);

			let detailGameId = new createjs.Text(window.language.menu.gamenocaps + ': '+details.round, 'bold 20px Lato', '#2b2b2b');
			detailGameId.x = detailSubHeaderBg.x + 10;
			detailGameId.y = detailSubHeaderBg.y + 12;
			detailGameId.textAlign = 'left';
			this.betDetails.addChild(detailGameId);

			let detailDate = new createjs.Text(details.date, 'bold 20px Lato', '#2b2b2b');
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

			let tblHeaderBg = new createjs.Shape();
			tblHeaderBg.graphics.beginFill('#c9c9c9').drawRect(0, 0, 735, 40);
			tblHeaderBg.x = detailSubHeaderBg.x + 40;
			tblHeaderBg.y = detailResultCon.y + 90;
			this.betDetails.addChild(tblHeaderBg);

			let tblHeaderBetType = new createjs.Text(window.language.menu.betcaps +' '+ window.language.menu.typecaps, 'bold 20px Lato', '#242021');
			tblHeaderBetType.x = tblHeaderBg.x + 170;
			tblHeaderBetType.y = tblHeaderBg.y + 10;
			tblHeaderBetType.textAlign = 'center';
			this.betDetails.addChild(tblHeaderBetType);

			let tblHeaderBets = new createjs.Text(window.language.menu.betscaps, 'bold 20px Lato', '#242021');
			tblHeaderBets.x = tblHeaderBg.x + 430;
			tblHeaderBets.y = tblHeaderBg.y + 10;
			tblHeaderBets.textAlign = 'center';
			this.betDetails.addChild(tblHeaderBets);

			let tblHeaderWin = new createjs.Text(window.language.menu.payoutcaps, 'bold 20px Lato', '#242021');
			tblHeaderWin.x = tblHeaderBg.x + 640;
			tblHeaderWin.y = tblHeaderBg.y + 10;
			tblHeaderWin.textAlign = 'center';
			this.betDetails.addChild(tblHeaderWin);

			let tblBodyBorder = new createjs.Shape();
			tblBodyBorder.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').drawRect(0, 0, 735, 165);
			tblBodyBorder.x = tblHeaderBg.x;
			tblBodyBorder.y = tblHeaderBg.y + 40;
			this.betDetails.addChild(tblBodyBorder);

			let tblTotalText = new createjs.Text(window.language.lobby.total, 'bold 24px Lato', '#231f20');
			tblTotalText.x = tblHeaderBg.x + 20;
			tblTotalText.y = tblHeaderBg.y + 170;
			tblTotalText.textAlign = 'left';
			this.betDetails.addChild(tblTotalText);

			//Table horizontal borders
			for (var i = 0; i < 4; i++) {
				tblBorderHor[i] = new createjs.Shape();
			    tblBorderHor[i].graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x, (tblHeaderBg.y+40) + (i * 40)).lineTo(tblBodyBorder.x + 735, (tblHeaderBg.y+40) + (i * 40));
			    this.betDetails.addChild(tblBorderHor[i]);
			}

			//Table vertical borders
			let tblBorderVer1 = new createjs.Shape();
		    tblBorderVer1.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x + 340, tblHeaderBg.y+40).lineTo(tblBodyBorder.x + 340, tblHeaderBg.y+205);
		    this.betDetails.addChild(tblBorderVer1);

		    let tblBorderVer2 = new createjs.Shape();
		    tblBorderVer2.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x + 540, tblHeaderBg.y+40).lineTo(tblBodyBorder.x + 540, tblHeaderBg.y+205);
		    this.betDetails.addChild(tblBorderVer2);

			let totalBetMoney = 0;
			let totalWinMoney = 0;
			let bets = [];
			let win = [];
			let gameMarkCircle = [];
			let nihtanLogo = [];
			let betTypeTxt = '';
			let betType = [];
			let winMoney = 0;
			let winMoneyColor = '';
			let markColorCode = '';

			$.post(links.getPulaputiDetails, {round: details.round, table: details.table, betId: details.betId}, (response) => {
				for (var i = 0; i < response.length; i++) {
					let betHistory = JSON.parse(response[i].bet_history);
					let gameMark = JSON.parse(response[i].game_info);
					let gameResult = JSON.parse(response[i].game_result);

					let count = 0;

					for (var k in gameMark) {
						switch(gameMark[k]) {
							case ("R"):
								markColorCode = '#c62828';
								break;

							case ("W"):
								markColorCode = '#fff';
								break;

							case ("G"):
								markColorCode = '#ff9b28';
								break;
						}

						gameMarkCircle[count] = new createjs.Shape();
						gameMarkCircle[count].x = (detailResultCon.x - 10) + (40 * count);
						gameMarkCircle[count].y = detailResultCon.y + 35;
						this.betDetails.addChild(gameMarkCircle[count]);

						if (markColorCode == '#fff') {
							gameMarkCircle[count].graphics.s(0.5).ss('#000').beginFill(markColorCode).drawCircle(0, 0, 15);
						}
						else {
							gameMarkCircle[count].graphics.beginFill(markColorCode).drawCircle(0, 0, 15);
						}

						count++;
					} //end for in

					let winMarkNum = gameResult.win.substr(0, 1);
					let winMarkColor = gameResult.win.substr(1, 1);

					switch(winMarkColor) {
						case ("R"):
							markColorCode = '#c62828';
							break;

						case ("W"):
							markColorCode = '#999999';
							break;

						case ("G"):
							markColorCode = '#ff9b28';
							break;
					}

					let winResultNum = new createjs.Text(winMarkNum, 'bold 31px Lato', markColorCode);
					winResultNum.x = detailResultCon.x - 85;
					winResultNum.y = detailResultCon.y + 15;
					this.betDetails.addChild(winResultNum);

					for (var j = 0; j < betHistory.length; j++) {
						let bonusBet = 0;
						switch(betHistory[j].bet) {
							case ("2R"):
								betTypeTxt = '2 ' + window.language.statistics.redcaps;
								break;

							case ("2W"):
								betTypeTxt = '2 ' + window.language.statistics.whitecaps;
								break;

							case ("3R"):
								betTypeTxt = '3 ' + window.language.statistics.redcaps;
								break;

							case ("3W"):
								betTypeTxt = '3 ' + window.language.statistics.whitecaps;
								break;

							case ("1G"):
								betTypeTxt = '';
								bonusBet = 1;
								break;

							case ("2G"):
								betTypeTxt = '';
								bonusBet = 2;
								break;
						}

						if (bonusBet == 0) {
							betType[j] = new createjs.Text(betTypeTxt, 'bold 24px Lato', '#231f20');
							betType[j].x = tblHeaderBg.x + 20;
							betType[j].y = (40 * j) + tblHeaderBg.y + 50;
							betType[j].textAlign = 'left';
							this.betDetails.addChild(betType[j]);
						}
						else {
							for (var k = 0; k < bonusBet; k++) {
								nihtanLogo[k] = new createjs.Bitmap("/img/nihtan_logo_mobile.png");
								nihtanLogo[k].x = (tblHeaderBg.x + 20) + (k * 30);
								nihtanLogo[k].y = (40 * j) + tblHeaderBg.y + 50;
								nihtanLogo[k].scaleX = nihtanLogo[k].scaleY = 0.15;
								this.betDetails.addChild(nihtanLogo[k]);
							}
						}

						bets[j] = new createjs.Text(this.formatNumber(betHistory[j].bet_money), 'bold 24px Lato', '#231f20');
						bets[j].x = tblHeaderBg.x + 520;
						bets[j].y = (40 * j) + tblHeaderBg.y + 50;
						bets[j].textAlign = 'right';
						this.betDetails.addChild(bets[j]);

						// if (betHistory[j].win_money != 0) {
						// 	winMoney = betHistory[j].win_money + betHistory[j].bet_money;
						// 	winMoneyColor = '#047710';
						// }
						// else {
						// 	winMoney = betHistory[j].win_money - betHistory[j].bet_money;

						// 	if (winMoney < 0) {
						// 		winMoneyColor = '#c83838';
						// 	}
						// 	else {
						// 		winMoneyColor = '#231f20';
						// 	}
						// }

						if (betHistory[j].win_money > 0) {
							winMoneyColor = '#04770f';
						}
						else {
							winMoneyColor = '#c83838';
						}

						win[j] = new createjs.Text(this.formatNumber(betHistory[j].win_money), 'bold 24px Lato', winMoneyColor);
						win[j].x = tblHeaderBg.x + 710;
						win[j].y = (40 * j) + tblHeaderBg.y + 50;
						win[j].textAlign = 'right';
						this.betDetails.addChild(win[j]);

						totalBetMoney += betHistory[j].bet_money;
						totalWinMoney += betHistory[j].win_money;
					}

					let betTotalMoney = new createjs.Text(this.formatNumber(totalBetMoney), 'bold 24px Lato', '#231f20');
					betTotalMoney.x = tblHeaderBg.x + 520;
					betTotalMoney.y = tblHeaderBg.y + 170;
					betTotalMoney.textAlign = 'right';
					this.betDetails.addChild(betTotalMoney);

					if (totalWinMoney > 0) {
						markColorCode = '#2067cf';
					}
					else {
						markColorCode = '#c83838';
					}

					let winTotalMoney = new createjs.Text(this.formatNumber(totalWinMoney), 'bold 24px Lato', markColorCode);
					winTotalMoney.x = tblHeaderBg.x + 710;
					winTotalMoney.y = tblHeaderBg.y + 170;
					winTotalMoney.textAlign = 'right';
					this.betDetails.addChild(winTotalMoney);
				} //end for loop
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