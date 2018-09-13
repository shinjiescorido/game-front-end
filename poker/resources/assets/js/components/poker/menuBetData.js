import { createCardSprite} from '../../factories/factories';
import cardValue from '../../factories/cards';

let instance = null;

export default (links, type) => {
	instance = instance || new blu.Component({
		betResult: new createjs.Container(),
		betDetails: new createjs.Container(),
		histData: new createjs.Container(),
		gameHistoryEl: [],

		main() {
			//Init bet logs variables
			this._betShape = [];
			this._betText = [];

			//Init game history variables
			this._histDealer = [];
			this._histShape = [];
			this._histText = [];
      this._histCards = [];

			//Game history table elements
			this.gameHistoryEl = [
					{"table_name" : window.language.menu.dealernamecaps, "table_width" : 120},
					{"table_name" : window.language.menu.cardvaluescaps, "table_width" : 280},
          {"table_name" : window.language.menu.resultcaps, "table_width" : 100}
				];
		},

		setBetLogs(data) {
			this._betLogs = data;

			for (var i = 0; i < this._betLogs.data.length; i++) {
				let record = this._betLogs.data[i];
				let results = JSON.parse(record.mark);

				this._betShape[i] = new createjs.Shape();
				this._betShape[i].y = (35 * i) + 167;
				this.betResult.addChild(this._betShape[i]);

				this._betText[i] = new createjs.Text("", 'normal 20px bebas-regular', '#fff');
				this._betText[i].y = (35 * i) + 156;
				this._betText[i].textAlign = 'center';
				this.betResult.addChild(this._betText[i]);

				if(window.language.locale == "zh") {
						if(results.mark == "D") { this._betText[i].text = "荷"; this._betText[i].font = 'normal 15px bebas-regular'; this._betText[i].y = (35 * i) + 158; }
						if(results.mark == "P") { this._betText[i].text = "闲"; this._betText[i].font = 'normal 15px bebas-regular'; this._betText[i].y = (35 * i) + 158; }
						if(results.mark == "T") { this._betText[i].text = "和"; this._betText[i].font = 'normal 15px bebas-regular'; this._betText[i].y = (35 * i) + 158; }
				} else {
						if(results.mark == "D") { this._betText[i].text = "D" }
						if(results.mark == "P") { this._betText[i].text = "P" }
						if(results.mark == "T") { this._betText[i].text = "T" }
				}

				if (results.mark == 'D') {
					this._betShape[i].graphics.beginFill('#b61c1c').drawCircle(0, 0, 11);
				} else if (results.mark == 'T') {
					this._betShape[i].graphics.beginFill('#689f39').drawCircle(0, 0, 11);
				} else {
					this._betShape[i].graphics.beginFill('#1875d2').drawCircle(0, 0, 11);
				} // end if
			} //end for loop

			return this.betResult;
		},

		setHistoryData(data) {
			this._gameHistory = data;


			for (var i = 0; i < this._gameHistory.data.length; i++) {
				let record = this._gameHistory.data[i];
				let results = JSON.parse(record.mark);

        let cardwidth = 24;
        let allcards = [];
        let carddata = [
          "C" + JSON.parse(record.game_info).dealer[0],
          "C" + JSON.parse(record.game_info).dealer[1],

          "C" + JSON.parse(record.game_info).flop[0],
          "C" + JSON.parse(record.game_info).flop[1],
          "C" + JSON.parse(record.game_info).flop[2],

          "C" + JSON.parse(record.game_info).turn,

          "C" + JSON.parse(record.game_info).river,

          "C" + JSON.parse(record.game_info).player[0],
          "C" + JSON.parse(record.game_info).player[1],
        ];
        this._histCards[i] = {
          "dealer": [
            createCardSprite(this, 22, 29, "cards_sprite_small"),
            createCardSprite(this, 22, 29, "cards_sprite_small")
          ],
          "community": [
            createCardSprite(this, 22, 29, "cards_sprite_small"),
            createCardSprite(this, 22, 29, "cards_sprite_small"),
            createCardSprite(this, 22, 29, "cards_sprite_small"),
            createCardSprite(this, 22, 29, "cards_sprite_small"),
            createCardSprite(this, 22, 29, "cards_sprite_small")
          ],
          "player": [
            createCardSprite(this, 22, 29, "cards_sprite_small"),
            createCardSprite(this, 22, 29, "cards_sprite_small")
          ]
        };


        allcards = allcards.concat(this._histCards[i].dealer);
        allcards = allcards.concat(this._histCards[i].community);
        allcards = allcards.concat(this._histCards[i].player);


        allcards.forEach((o, k)=> {
          let comm_x = 250 - (cardwidth*4.5);
          o.gotoAndPlay(carddata[k]);
          // o.scaleX = o.scaleY = cardwidth/74;
          o.x = comm_x + (cardwidth * k);
          o.y = (35 * i) + 154;
          if(k > 1) o.x += 10;
          if(k > 6) o.x += 10;
          this.histData.addChild(o);
        });

				this._histShape[i] = new createjs.Shape();
				this._histShape[i].x = 450;
				this._histShape[i].y = (35 * i) + 167;
				this.histData.addChild(this._histShape[i]);

				this._histText[i] = new createjs.Text("" , 'normal 20px bebas-regular', '#fff');
				this._histText[i].x = this._histShape[i].x;
				this._histText[i].y = (35 * i) + 156;
				this._histText[i].textAlign = 'center';
				this.histData.addChild(this._histText[i]);

				if(window.language.locale == "zh") {
						if(results.mark == "D") { this._histText[i].text = "荷"; this._histText[i].font = 'normal 15px bebas-regular'; this._histText[i].y = (35 * i) + 158; }
						if(results.mark == "P") { this._histText[i].text = "闲"; this._histText[i].font = 'normal 15px bebas-regular'; this._histText[i].y = (35 * i) + 158; }
						if(results.mark == "T") { this._histText[i].text = "和"; this._histText[i].font = 'normal 15px bebas-regular'; this._histText[i].y = (35 * i) + 158; }
				} else {
						if(results.mark == "D") { this._histText[i].text = "D" }
						if(results.mark == "P") { this._histText[i].text = "P" }
						if(results.mark == "T") { this._histText[i].text = "T" }
				}

				if (results.mark == 'D') {
					this._histShape[i].graphics.beginFill('#b61c1c').drawCircle(0, 0, 11);
				} else if (results.mark == 'T') {
					this._histShape[i].graphics.beginFill('#689f39').drawCircle(0, 0, 11);
				} else {
					this._histShape[i].graphics.beginFill('#1875d2').drawCircle(0, 0, 11);
				} // end if

        // if void
        if(this._gameHistory.data[i].status && this._gameHistory.data[i].status.toLowerCase() === 'w') {
          console.log(this._gameHistory.data[i], "lalaalalalalalalala");
          
          let voidContainer = new createjs.Container();
          voidContainer.y = (35 * i) + 160;
          voidContainer.x = -390;

          let voidShape = new createjs.Shape();
          voidShape.graphics.beginFill("#262525").drawRect(0, -10, 880, 36);
          voidShape.setBounds(0, -10, 880, 36);
          voidContainer.addChild(voidShape);

          let voidImg = new createjs.Bitmap(this.context.getResources("void"));
          voidImg.x = voidShape.getBounds().width - 40;
          voidImg.y = voidShape.getBounds().height/2 + voidShape.getBounds().y;
          voidImg.regX = voidImg.getBounds().width/2
          voidImg.regY = voidImg.getBounds().height/2
          voidContainer.addChild(voidImg);

          let voidText = new createjs.Text("GAME VOID", "12px lato-regular", "#fff");
          voidText.x = voidShape.getBounds().width - 232;
          voidText.y = voidShape.getBounds().height/2 + voidShape.getBounds().y;
          voidText.textBaseline = "middle";
          voidText.textAlign = "center";
          voidContainer.addChild(voidText);

          console.log(voidContainer, "void container")
          this.histData.addChild(voidContainer);
        }

				this._histDealer[i] = new createjs.Text(record.name, 'normal 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				this._histDealer[i].x = 60;
				this._histDealer[i].y = (35 * i) + 160;
				this._histDealer[i].textAlign = 'center';
				this.histData.addChild(this._histDealer[i]);
			} //end for loop

			return this.histData;
		},

		showDetails(roundNum, roundDate, mWidth, table) {
			let bonusplusOffset = type == 'b' ? 40 : 0;
			let mdlDetailWidth = 820;
			let tblBorderHor = [];

			this.betDetails.removeAllChildren();

			let detailBg = new createjs.Shape();
			detailBg.graphics.setStrokeStyle(2).beginStroke('#000').beginFill('#d5d5d5')
					.drawRoundRect(0, 0, mdlDetailWidth, 745 + bonusplusOffset, 7);
			detailBg.x = (mWidth / 2) - (mdlDetailWidth / 2);
			detailBg.y = 55;
			this.betDetails.addChild(detailBg);

			//Click event to prevent click behind the modal
			detailBg.addEventListener("mousedown", (e) => {
				return;
			});

			this.cardsContainer = new createjs.Container();
			this.cardsContainer.scaleX = this.cardsContainer.scaleY = 1.1;
			this.betDetails.addChild(this.cardsContainer);
			this.cardsContainer.x = - 40;
			this.cardsContainer.y = - 40;

			this.tableContainer = new createjs.Container();
			this.tableContainer.scaleX = this.tableContainer.scaleY = 1.2;
			this.betDetails.addChild(this.tableContainer);
			this.tableContainer.x = - 80;
			this.tableContainer.y = - 70;

			let detailHeaderBg = new createjs.Shape();
			detailHeaderBg.graphics.beginFill('#ff9b28').drawRoundRect(0, 0, mdlDetailWidth-3, 45, 7);
			detailHeaderBg.x = detailBg.x + 2;
			detailHeaderBg.y = detailBg.y + 2;
			this.betDetails.addChild(detailHeaderBg);

			let detailHeaderTxt = new createjs.Text(window.language.menu.winningresultcaps, 'bold 24px lato-regular', '#2b2b2b');
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

			let detailGameId = new createjs.Text(window.language.menu.gamenocaps + ': '+table+'', 'bold 22px lato-regular', '#2b2b2b');
			detailGameId.x = detailSubHeaderBg.x + 10;
			detailGameId.y = detailSubHeaderBg.y + 12;
			detailGameId.textAlign = 'left';
			this.betDetails.addChild(detailGameId);

			let detailDate = new createjs.Text(roundDate, 'bold 22px lato-regular', '#2b2b2b');
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
			tblHeaderBg.y = detailResultCon.y + 300;
			this.tableContainer.addChild(tblHeaderBg);

			let tblHeaderBetType = new createjs.Text(window.language.menu.betcaps +' '+ window.language.menu.typecaps, 'bold 20px lato-regular', '#242021');
			tblHeaderBetType.x = tblHeaderBg.x + 90;
			tblHeaderBetType.y = tblHeaderBg.y + 10;
			tblHeaderBetType.textAlign = 'center';
			this.tableContainer.addChild(tblHeaderBetType);

			let tblHeaderBets = new createjs.Text(window.language.menu.betscaps, 'bold 20px lato-regular', '#242021');
			tblHeaderBets.x = tblHeaderBg.x + 290;
			tblHeaderBets.y = tblHeaderBg.y + 10;
			tblHeaderBets.textAlign = 'center';
			this.tableContainer.addChild(tblHeaderBets);

			let tblHeaderWin = new createjs.Text(window.language.menu.payoutcaps, 'bold 20px lato-regular', '#242021');
			tblHeaderWin.x = tblHeaderBg.x + 490;
			tblHeaderWin.y = tblHeaderBg.y + 10;
			tblHeaderWin.textAlign = 'center';
			this.tableContainer.addChild(tblHeaderWin);

			let markColorCode = '';
			let winnerText = '';
			let handType = '';

			let betTypes = [window.language.game_specific.pokerbonuscaps, window.language.game_specific.ante, window.language.game_specific.flop, window.language.game_specific.turn, window.language.game_specific.river, window.language.menu.total];
			let betTypeTxt = [];

			$.post(links.getDetails, {round: roundNum, tableId: window.tableNum, type: type}, (response) => {

				for (var i = 0; i < response.length; i++) {
					this.betHistory = JSON.parse(response[i].bet_history);
					this.gameInfo = JSON.parse(response[i].game_info);
					let gameResult = JSON.parse(response[i].game_result);

					handType = gameResult.handtype;

					switch(gameResult.winner) {
						case ("dealer"):
							winnerText = window.language.locale == "zh" ? '荷' : 'D';
							markColorCode = '#b61c1a';
							break;

						case ("player"):
							winnerText = window.language.locale == "zh" ? '闲' : 'P';
							markColorCode = '#1b75d5 ';
							break;

						case ("tie"):
							winnerText = window.language.locale == "zh" ? '和' : 'T';
							markColorCode = '#689f39';
							break;
					}
				} //end for loop

				let winnerCircle = new createjs.Shape();
				winnerCircle.graphics.beginFill(markColorCode).drawCircle(0, 0, 18);
				winnerCircle.x = detailResultCon.x - 105;
				winnerCircle.y = detailResultCon.y + 35;
				this.betDetails.addChild(winnerCircle);

				let winnerTextObj = new createjs.Text(winnerText, 'bold 22px lato-regular', '#fff');
				winnerTextObj.x = winnerCircle.x;
				winnerTextObj.y = winnerCircle.y - 14;
				winnerTextObj.textAlign = 'center';
				this.betDetails.addChild(winnerTextObj);

				let handTypeText = new createjs.Text(handType.toUpperCase(), 'bold 27px lato-regular', '#3a3a3a');
				handTypeText.x = detailResultCon.x + 30;
				handTypeText.y = detailResultCon.y + 17;
				handTypeText.textAlign = 'center';
				this.betDetails.addChild(handTypeText);

				let dealerCardsTxt = new createjs.Text(window.language.game_specific.dealer, 'bold 22px lato-regular', '#3a3a3a');
				dealerCardsTxt.x = detailBg.x + 130;
				dealerCardsTxt.y = detailResultCon.y + 120;
				dealerCardsTxt.textAlign = 'center';
				this.cardsContainer.addChild(dealerCardsTxt);

				let communityTxt = new createjs.Text(window.language.game_specific.communitycard, 'bold 22px lato-regular', '#3a3a3a');
				communityTxt.x = detailBg.x + 400;
				communityTxt.y = detailResultCon.y + 120;
				communityTxt.textAlign = 'center';
				this.cardsContainer.addChild(communityTxt);

				let playerCardsTxt = new createjs.Text(window.language.game_specific.player, 'bold 22px lato-regular', '#3a3a3a');
				playerCardsTxt.x = detailBg.x + 680;
				playerCardsTxt.y = detailResultCon.y + 120;
				playerCardsTxt.textAlign = 'center';
				this.cardsContainer.addChild(playerCardsTxt);

				let cardResultCon = new createjs.Shape();
				cardResultCon.graphics.beginFill("#c9c9c9").drawRoundRect(0, 0, 710, 130, 3);
				cardResultCon.x = detailBg.x + 50;
				cardResultCon.y = detailResultCon.y + 150;
				this.cardsContainer.addChild(cardResultCon);

				let dealerCardsCon = new createjs.Shape();
				dealerCardsCon.graphics.setStrokeStyle(1).beginStroke('#d32f2e').drawRoundRect(0, 0, 155, 120, 4);
				dealerCardsCon.x = cardResultCon.x + 5;
				dealerCardsCon.y = cardResultCon.y + 5;
				this.cardsContainer.addChild(dealerCardsCon);

				let playerCardsCon = new createjs.Shape();
				playerCardsCon.graphics.setStrokeStyle(1).beginStroke('#1976d3').drawRoundRect(0, 0, 155, 120, 4);
				playerCardsCon.x = cardResultCon.x + 550;
				playerCardsCon.y = cardResultCon.y + 5;
				this.cardsContainer.addChild(playerCardsCon);

				//Cards
				let dealerCards = [];
				let playerCards = [];
				let communityCards = [];

				let communityArr = this.gameInfo.flop;
				communityArr.push(this.gameInfo.turn);
				communityArr.push(this.gameInfo.river);

				//Dealer Cards
				for (var i = 0; i < this.gameInfo.dealer.length; i++) {
					dealerCards[i] = createCardSprite(this, 74, 99, 'cards_sprite');
					dealerCards[i].x = (cardResultCon.x + 7) + (75 * i);
					dealerCards[i].y = cardResultCon.y + 15;
					dealerCards[i].gotoAndStop('C'+this.gameInfo.dealer[i]);
					this.cardsContainer.addChild(dealerCards[i]);
				}

				//Community Cards
				for (var i = 0; i < communityArr.length; i++) {
					communityCards[i] = createCardSprite(this, 74, 99, 'cards_sprite');
					communityCards[i].x = (dealerCardsCon.x + 160) + (76 * i);
					communityCards[i].y = cardResultCon.y + 15;
					communityCards[i].gotoAndStop('C'+communityArr[i]);
					this.cardsContainer.addChild(communityCards[i]);
				}

				//Player Cards
				for (var i = 0; i < this.gameInfo.player.length; i++) {
					playerCards[i] = createCardSprite(this, 74, 99, 'cards_sprite');
					playerCards[i].x = (playerCardsCon.x + 3) + (75 * i);
					playerCards[i].y = cardResultCon.y + 15;
					playerCards[i].gotoAndStop('C'+this.gameInfo.player[i]);
					this.cardsContainer.addChild(playerCards[i]);
				}

				//Table
				let tableHeight = 240 + bonusplusOffset;

			    let tblBodyBorder = new createjs.Shape();
				tblBodyBorder.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').drawRect(0, 0, tblWidth, tableHeight);
				tblBodyBorder.x = tblHeaderBg.x;
				tblBodyBorder.y = tblHeaderBg.y + 40;
				this.tableContainer.addChild(tblBodyBorder);

				//Table horizontal borders
				for (var i = 0; i < 6 + 1 + (bonusplusOffset/40); i++) {
					tblBorderHor[i] = new createjs.Shape();
				    tblBorderHor[i].graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x, (tblHeaderBg.y+40) + (i * 40)).lineTo(tblBodyBorder.x + tblWidth, (tblHeaderBg.y+40) + (i * 40));
				    this.tableContainer.addChild(tblBorderHor[i]);
				}

				//Table vertical borders
				let tblBorderVer1 = new createjs.Shape();
			    tblBorderVer1.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x + 200, tblHeaderBg.y+40).lineTo(tblBodyBorder.x + 200, tblHeaderBg.y+tableHeight+40);
			    this.tableContainer.addChild(tblBorderVer1);

			    let tblBorderVer2 = new createjs.Shape();
			    tblBorderVer2.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x + 400, tblHeaderBg.y+40).lineTo(tblBodyBorder.x + 400, tblHeaderBg.y+tableHeight+40);
			    this.tableContainer.addChild(tblBorderVer2);

				let count = 0;
				let betAmountTxt = [];
				let winLoseAmtTxt = [];
				let totalBetAmtNum = 0;
				let totalWinLoseAmt = 0;
				let moneyColorCode = '';

				for (var i in this.betHistory) {
					betTypeTxt[count] = new createjs.Text(i.toUpperCase(), 'bold 24px lato-regular', '#231f20');
					betTypeTxt[count].x = tblHeaderBg.x + 30;
					betTypeTxt[count].y = (tblHeaderBg.y + 45) + (count * 40);
					betTypeTxt[count].textAlign = 'left';
					this.tableContainer.addChild(betTypeTxt[count]);

					betAmountTxt[count] = new createjs.Text(this.formatNumber(this.betHistory[i].bet), 'normal 24px lato-regular', '#231f20');
					betAmountTxt[count].x = tblHeaderBg.x + 380;
					betAmountTxt[count].y = (tblHeaderBg.y + 45) + (count * 40);
					betAmountTxt[count].textAlign = 'right';
					this.tableContainer.addChild(betAmountTxt[count]);

					// let winLoseAmount = 0;
					// if (this.betHistory[i].win == 0 && this.betHistory[i].bet != 0) {
					// 	moneyColorCode = '#c7383a';
					// 	winLoseAmount -= this.betHistory[i].bet;
					// }
					// else {
					// 	winLoseAmount = this.betHistory[i].win + this.betHistory[i].bet;

					// 	if (winLoseAmount > 0) {
					// 		moneyColorCode = '#04770f';
					// 	}
					// 	else {
					// 		moneyColorCode = '#231f20';
					// 	}
					// }

					if (this.betHistory[i].win > 0) {
						moneyColorCode = '#04770f';
					}
					else {
						moneyColorCode = '#231f20';
					}

					winLoseAmtTxt[count] = new createjs.Text(this.formatNumber(this.betHistory[i].win), 'normal 24px lato-regular', moneyColorCode);
					winLoseAmtTxt[count].x = tblHeaderBg.x + 580;
					winLoseAmtTxt[count].y = (tblHeaderBg.y + 45) + (count * 40);
					winLoseAmtTxt[count].textAlign = 'right';
					this.tableContainer.addChild(winLoseAmtTxt[count]);

					totalWinLoseAmt += this.betHistory[i].win;
					totalBetAmtNum += parseInt(this.betHistory[i].bet);
					count++;
				} // end for in

				let tblTotalTxt = new createjs.Text(window.language.menu.total, 'bold 24px lato-regular', '#231f20');
				tblTotalTxt.x = tblHeaderBg.x + 55;
				tblTotalTxt.y = (tblHeaderBg.y + tableHeight) + 5;
				tblTotalTxt.textAlign = 'center';
				this.tableContainer.addChild(tblTotalTxt);

				let totalBetTxt = new createjs.Text(this.formatNumber(totalBetAmtNum), 'bold 24px lato-regular', '#231f20');
				totalBetTxt.x = tblHeaderBg.x + 380;
				totalBetTxt.y = (tblHeaderBg.y + tableHeight) + 5;
				totalBetTxt.textAlign = 'right';
				this.tableContainer.addChild(totalBetTxt);

				if (totalWinLoseAmt > 0) {
					moneyColorCode = '#2164cd';
				}
				else {
					moneyColorCode = '#c63837';
				}

				let totalWinLoseTxt = new createjs.Text(this.formatNumber(totalWinLoseAmt), 'bold 24px lato-regular', moneyColorCode);
				totalWinLoseTxt.x = tblHeaderBg.x + 580;
				totalWinLoseTxt.y = (tblHeaderBg.y + tableHeight) + 5;
				totalWinLoseTxt.textAlign = 'right';
				this.tableContainer.addChild(totalWinLoseTxt);
			});

			this.betDetails.scaleX = this.betDetails.scaleY = 0.8;
			this.betDetails.x = (mWidth / 2) - ( mdlDetailWidth * 0.8) / 2 - 30;
			this.betDetails.y = -95;

			return this.betDetails;
		},

		paginateResult(type, data) {
			if (type == 'betlogs') {
				this.betResult.removeAllChildren();
				this.setBetLogs(data);
			}
			else if (type == 'gamehistory') {
				this.histData.removeAllChildren();
				this.setHistoryData(data);
			}
		},

		formatNumber(number) {
			if((window.casino == 'SS')) {
				return number.toLocaleString(undefined, {minimumFractionDigits: 2});
			} else {
				number = parseInt(number) || 0;
				return number.toLocaleString('en');
			}
		}
	});
	return instance;
}
