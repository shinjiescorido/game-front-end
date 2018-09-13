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
			// this._betLogs = window.bigwheelLogs;
			// this._betShape = [];
			// this._betText = [];

			// //log data
			// this.logs = window.bigwheelLogs;
			// this.countTotal = this.logs.last_page;

			// //Draw bet logs result column
			// this.setBetLogs(this._betLogs);
		},

		setBetLogs(data) {
      		this.makeGameMarks(30);
			this._betLogs = data;
			let betDataMark = [];

			for (let i = 0; i < this._betLogs.data.length; i++) {
				let record = this._betLogs.data[i];
				let results = JSON.parse(record.mark).num;

        		betDataMark[i] = {};

				betDataMark[i].bg = this.mark.bg[results].clone();
				betDataMark[i].bg.x = 0;
				betDataMark[i].bg.y = 65 * i;
				this.betResult.addChild(betDataMark[i].bg);

				betDataMark[i].lbl = this.mark.lbl[results].clone();
				betDataMark[i].lbl.x = betDataMark[i].bg.x;
				betDataMark[i].lbl.y = betDataMark[i].bg.y;
				this.betResult.addChild(betDataMark[i].lbl);
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
			detailBg.y = 200;
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

			let detailGameId = new createjs.Text(window.language.menu.gamenocaps + ': '+details.round, 'bold 18px Lato', '#2b2b2b');
			detailGameId.x = detailSubHeaderBg.x + 10;
			detailGameId.y = detailSubHeaderBg.y + 12;
			detailGameId.textAlign = 'left';
			this.betDetails.addChild(detailGameId);

			let detailDate = new createjs.Text(details.date, 'bold 18px Lato', '#2b2b2b');
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

			let tblWidth = 735;

			let tblHeaderBg = new createjs.Shape();
			tblHeaderBg.graphics.beginFill('#c9c9c9').drawRect(0, 0, tblWidth, 40);
			tblHeaderBg.x = detailSubHeaderBg.x + 40;
			tblHeaderBg.y = detailResultCon.y + 90;
			this.betDetails.addChild(tblHeaderBg);

			let tblHeaderBetType = new createjs.Text(window.language.menu.betcaps +' '+ window.language.menu.typecaps, 'bold 16px Lato', '#242021');
			tblHeaderBetType.x = tblHeaderBg.x + 170;
			tblHeaderBetType.y = tblHeaderBg.y + 10;
			tblHeaderBetType.textAlign = 'center';
			this.betDetails.addChild(tblHeaderBetType);

			let tblHeaderBets = new createjs.Text(window.language.menu.betscaps, 'bold 16px Lato', '#242021');
			tblHeaderBets.x = tblHeaderBg.x + 430;
			tblHeaderBets.y = tblHeaderBg.y + 10;
			tblHeaderBets.textAlign = 'center';
			this.betDetails.addChild(tblHeaderBets);

			let tblHeaderWin = new createjs.Text(window.language.menu.payoutcaps, 'bold 16px Lato', '#242021');
			tblHeaderWin.x = tblHeaderBg.x + 640;
			tblHeaderWin.y = tblHeaderBg.y + 10;
			tblHeaderWin.textAlign = 'center';
			this.betDetails.addChild(tblHeaderWin);

			let totalBetMoney = 0;
			let totalWinMoney = 0;
			let bets = [];
			let win = [];
			let winMark;
      		let winMarkTxt;
			let betMark;
			let betMarkTxt;
			let winMoney = 0;
			let winMoneyColor = '';
			let markColorCode = '';
			let betCount = 0;

			$.post("/details/getBigWheelDetails", {round: details.round, table: details.table, betId: details.betId}, (response) => {
				for (var i = 0; i < response.length; i++) {
					let betHistory = JSON.parse(response[i].bet_history);
					let gameMark = JSON.parse(response[i].game_info);
					let gameResult = JSON.parse(response[i].game_result).win;

					betCount = betHistory.length;

		      		winMark = this.mark.bg[gameResult].clone();
	          		winMark.x = (detailResultCon.x - 10) + 10;
	          		winMark.y = detailResultCon.y + 35;
					this.betDetails.addChild(winMark);

          			winMarkTxt = this.mark.lbl[gameResult].clone();
		          	winMarkTxt.x = (detailResultCon.x - 10) + 10;
		          	winMarkTxt.y = detailResultCon.y + 35;
					this.betDetails.addChild(winMarkTxt);

					for (var j = 0; j < betHistory.length; j++) {
			            betMark = this.mark.bg[betHistory[j].bet];
			            betMarkTxt = this.mark.lbl[betHistory[j].bet];
						betMark.x = betMarkTxt.x = (tblHeaderBg.x + 20) + 30;
						betMark.y = betMarkTxt.y = (40 * j) + tblHeaderBg.y + 60;

						this.betDetails.addChild(betMark, betMarkTxt);

						bets[j] = new createjs.Text(this.formatNumber(betHistory[j].bet_money), 'bold 16px Lato', '#231f20');
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
							winMoneyColor = '#231f20';
						}

						win[j] = new createjs.Text(this.formatNumber(betHistory[j].win_money), 'bold 16px Lato', winMoneyColor);
						win[j].x = tblHeaderBg.x + 710;
						win[j].y = (40 * j) + tblHeaderBg.y + 50;
						win[j].textAlign = 'right';
						this.betDetails.addChild(win[j]);

						totalBetMoney += betHistory[j].bet_money;
						totalWinMoney += betHistory[j].win_money;
					}
				} //end for loop

				let tableHeight = (betCount + 1) * 40;

				detailBg.graphics.clear().setStrokeStyle(2).beginStroke('#000').beginFill('#d5d5d5').drawRoundRect(0, 0, mdlDetailWidth, tableHeight+370, 7);

				let betTotalMoney = new createjs.Text(this.formatNumber(totalBetMoney), 'bold 16px Lato', '#231f20');
				betTotalMoney.x = tblHeaderBg.x + 520;
				betTotalMoney.y = (tblHeaderBg.y + tableHeight) + 10;
				betTotalMoney.textAlign = 'right';
				this.betDetails.addChild(betTotalMoney);

				if (totalWinMoney > 0) {
					markColorCode = '#2067cf';
				}
				else {
					markColorCode = '#c83838';
				}

				let winTotalMoney = new createjs.Text(this.formatNumber(totalWinMoney), 'bold 16px Lato', markColorCode);
				winTotalMoney.x = tblHeaderBg.x + 710;
				winTotalMoney.y = (tblHeaderBg.y + tableHeight) + 10;
				winTotalMoney.textAlign = 'right';
				this.betDetails.addChild(winTotalMoney);

				let tblBodyBorder = new createjs.Shape();
				tblBodyBorder.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').drawRect(0, 0, tblWidth, tableHeight);
				tblBodyBorder.x = tblHeaderBg.x;
				tblBodyBorder.y = tblHeaderBg.y + 40;
				this.betDetails.addChild(tblBodyBorder);

				let tblTotalText = new createjs.Text(window.language.lobby.total, 'bold 16px Lato', '#231f20');
				tblTotalText.x = tblHeaderBg.x + 20;
				tblTotalText.y = (tblHeaderBg.y + tableHeight) + 10;
				tblTotalText.textAlign = 'left';
				this.betDetails.addChild(tblTotalText);

				//Table horizontal borders
				for (var i = 0; i < betCount + 1; i++) {
					tblBorderHor[i] = new createjs.Shape();
				    tblBorderHor[i].graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x, (tblHeaderBg.y+40) + (i * 40)).lineTo(tblBodyBorder.x + tblWidth, (tblHeaderBg.y+40) + (i * 40));
				    this.betDetails.addChild(tblBorderHor[i]);
				}

				//Table vertical borders
				let tblBorderVer1 = new createjs.Shape();
			    tblBorderVer1.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x + 340, tblHeaderBg.y+40).lineTo(tblBodyBorder.x + 340, tblHeaderBg.y+tableHeight+40);
			    this.betDetails.addChild(tblBorderVer1);

			    let tblBorderVer2 = new createjs.Shape();
			    tblBorderVer2.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x + 540, tblHeaderBg.y+40).lineTo(tblBodyBorder.x + 540, tblHeaderBg.y+tableHeight+40);
			    this.betDetails.addChild(tblBorderVer2);

			});

			return this.betDetails;
		},

		formatNumber(number) {
	      number = parseInt(number) || 0;
	      return number.toLocaleString('en');
	    },

    makeGameMarks(size) {
      let bg = {};
      let label = {};
      let bg_latest = {};
      let label_latest = {};

      let r = (size / 2);
      let colors_l = ["#ffd54f", "#00acc1", "#689f38", "#7e57c2", "#ff8f00", "#e24242"];
      let colors_d = ["#937a0f", "#0b4768", "#2c4f10", "#5b0d75", "#b75700", "#821010"];
      let text = ["1", "2", "5", "10", "20", "45"];

      for (let i = 0; i < text.length; i++) {
        bg[text[i]] = new createjs.Shape();
        bg[text[i]].graphics.beginFill(colors_d[i]).beginStroke(colors_l[i]).setStrokeStyle(1.8).drawCircle(0, 0, r);
        bg[text[i]].setBounds(-r, -r, size, size);
        bg[text[i]].name = "bg " + [text[i]];
        label[text[i]] = new createjs.Text(text[i], "20px BebasNeue", colors_l[i]);
        label[text[i]].textAlign = "center";
        label[text[i]].textBaseline = "middle";
        label[text[i]].name = "label " + [text[i]];


        bg_latest[text[i]] = new createjs.Shape();
        bg_latest[text[i]].graphics.beginFill(colors_l[i]).beginStroke("#000").setStrokeStyle(0.3).drawCircle(0, 0, r - 2)
          .beginFill("").beginStroke(colors_l[i]).setStrokeStyle(1.5).drawCircle(0, 0, r);
        bg_latest[text[i]].setBounds(-r, -r, size, size);
        bg_latest[text[i]].name = "bg_latest " + [text[i]];
        label_latest[text[i]] = new createjs.Text(text[i], "20px BebasNeue", "#000");
        label_latest[text[i]].textAlign = "center";
        label_latest[text[i]].textBaseline = "middle";
        label_latest[text[i]].name = "label_latest " + [text[i]];
      } // end for

      this.mark = {"bg": bg, "lbl": label, "size": size};
      this.latest_mark = {"bg": bg_latest, "lbl": label_latest};

    }

	});

	return instance;
}
