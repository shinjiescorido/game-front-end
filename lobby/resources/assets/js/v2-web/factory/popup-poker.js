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

let lobby_poker_data = {
	betResult : new createjs.Container(),
	betDetails: new createjs.Container(),
	themedTabs : [],
	themedTblHeader : [],
	logs : [],
	countTotal : 0,
	main () {

	},
	setBetLogs(data) {
		this._betLogs = data;
		let betDataMarkCircle = [];
		let betDataMarkNum = [];

		for (var i = 0; i < this._betLogs.data.length; i++) {
			let record = this._betLogs.data[i];
			let results = JSON.parse(record.game_result);

			if (record.status.toLowerCase() === 'w') {
				let voidIco = new createjs.Bitmap("/img/v2_1/icons/void/void_icon.png");
				voidIco.y = (65 * i) - 13;
				this.betResult.addChild(voidIco);
				
				continue;
			}
			
			let markColorCode = '';
			let markText = '';
			switch(results.winner) {
				case ("dealer"):
					markText = window.language.locale == "zh" ? '荷' : 'D';
					markColorCode = '#b61c1c';
					break;

				case ("player"):
					markText = window.language.locale == "zh" ? '闲' : 'P';
					markColorCode = '#1776d0';
					break;

				case ("tie"):
					markText = window.language.locale == "zh" ? '和' : 'T';
					markColorCode = '#689f39';
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
		detailBg.graphics.setStrokeStyle(2).beginStroke('#000').beginFill('#d5d5d5').drawRoundRect(0, 0, mdlDetailWidth, 750, 7);
		detailBg.x = (details.width / 2) - (mdlDetailWidth / 2);
		detailBg.y = 100;
		this.betDetails.addChild(detailBg);

		//Click event to prevent click behind the modal
		detailBg.addEventListener("mousedown", (e) => {
			return;
		});

		this.cardsContainer = new createjs.Container();
		this.cardsContainer.scaleX = this.cardsContainer.scaleY = 1.1;
		this.betDetails.addChild(this.cardsContainer);
		this.cardsContainer.x = - 70;
		this.cardsContainer.y = - 30;

		this.tableContainer = new createjs.Container();
		this.tableContainer.scaleX = this.tableContainer.scaleY = 1.2;
		this.betDetails.addChild(this.tableContainer);
		this.tableContainer.x = - 148;
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

		let detailGameId = new createjs.Text(window.language.menu.gamenocaps + ': '+details.round+'', 'bold 22px Lato', '#2b2b2b');
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
		tblHeaderBg.y = detailResultCon.y + 300;
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

		let tblHeaderWin = new createjs.Text(window.language.menu.wincaps+'/'+window.language.menu.losecaps, 'bold 16px Lato', '#242021');
		tblHeaderWin.x = tblHeaderBg.x + 490;
		tblHeaderWin.y = tblHeaderBg.y + 10;
		tblHeaderWin.textAlign = 'center';
		this.tableContainer.addChild(tblHeaderWin);

		let markColorCode = '';
		let winnerText = '';
		let handType = '';

		let betTypes = [window.language.poker.pokerbonuscaps, window.language.poker.antecaps, window.language.poker.flopcaps, window.language.poker.turncaps, window.language.poker.rivercaps, window.language.lobby.total];
		let betTypeTxt = [];

		$.post(links.getPokerDetails, {round: details.round, table: details.table, betId: details.betId}, (response) => {
			for (var i = 0; i < response.length; i++) {
				this.betHistory = JSON.parse(response[i].bet_history);
				this.gameInfo = JSON.parse(response[i].game_info);
				let gameResult = JSON.parse(response[i].game_result);

				handType = gameResult.handtype;

				switch(gameResult.winner) {
					case ("dealer"):
						winnerText = 'D'
						markColorCode = '#b61c1a';
						break;

					case ("player"):
						winnerText = 'P';
						markColorCode = '#1b75d5 ';
						break;

					case ("tie"):
						winnerText = 'T';
						markColorCode = '#689f39';
						break;
				}
			} //end for loop

			let winnerCircle = new createjs.Shape();
			winnerCircle.graphics.beginFill(markColorCode).drawCircle(0, 0, 18);
			winnerCircle.x = detailResultCon.x - 105;
			winnerCircle.y = detailResultCon.y + 35;
			this.betDetails.addChild(winnerCircle);

			let winnerTextObj = new createjs.Text(winnerText, 'bold 22px Lato', '#fff');
			winnerTextObj.x = winnerCircle.x;
			winnerTextObj.y = winnerCircle.y - 14;
			winnerTextObj.textAlign = 'center';
			this.betDetails.addChild(winnerTextObj);

			let handTypeText = new createjs.Text(handType.toUpperCase(), 'bold 27px Lato', '#3a3a3a');
			handTypeText.x = detailResultCon.x + 30;
			handTypeText.y = detailResultCon.y + 17;
			handTypeText.textAlign = 'center';
			this.betDetails.addChild(handTypeText);

			let dealerCardsTxt = new createjs.Text(window.language.poker.dealer, 'bold 18px Lato', '#3a3a3a');
			dealerCardsTxt.x = detailBg.x + 130;
			dealerCardsTxt.y = detailResultCon.y + 120;
			dealerCardsTxt.textAlign = 'center';
			this.cardsContainer.addChild(dealerCardsTxt);

			let communityTxt = new createjs.Text(window.language.poker.communitycard, 'bold 18px Lato', '#3a3a3a');
			communityTxt.x = detailBg.x + 400;
			communityTxt.y = detailResultCon.y + 120;
			communityTxt.textAlign = 'center';
			this.cardsContainer.addChild(communityTxt);

			let playerCardsTxt = new createjs.Text(window.language.poker.player, 'bold 18px Lato', '#3a3a3a');
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
				dealerCards[i] = createCardSprite(this, 74, 99, 'img/cards/lobby_sprite_cards.png');
				dealerCards[i].x = (cardResultCon.x + 7) + (75 * i);
				dealerCards[i].y = cardResultCon.y + 15;
				dealerCards[i].gotoAndStop('C'+this.gameInfo.dealer[i]);
				this.cardsContainer.addChild(dealerCards[i]);
			}

			//Community Cards
			for (var i = 0; i < communityArr.length; i++) {
				communityCards[i] = createCardSprite(this, 74, 99, 'img/cards/lobby_sprite_cards.png');
				communityCards[i].x = (dealerCardsCon.x + 160) + (76 * i);
				communityCards[i].y = cardResultCon.y + 15;
				communityCards[i].gotoAndStop('C'+communityArr[i]);
				this.cardsContainer.addChild(communityCards[i]);
			}

			//Player Cards
			for (var i = 0; i < this.gameInfo.player.length; i++) {
				playerCards[i] = createCardSprite(this, 74, 99, 'img/cards/lobby_sprite_cards.png');
				playerCards[i].x = (playerCardsCon.x + 3) + (75 * i);
				playerCards[i].y = cardResultCon.y + 15;
				playerCards[i].gotoAndStop('C'+this.gameInfo.player[i]);
				this.cardsContainer.addChild(playerCards[i]);
			}

			//Table
			let tableHeight = 240;

		    let tblBodyBorder = new createjs.Shape();
			tblBodyBorder.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').drawRect(0, 0, tblWidth, tableHeight);
			tblBodyBorder.x = tblHeaderBg.x;
			tblBodyBorder.y = tblHeaderBg.y + 40;
			this.tableContainer.addChild(tblBodyBorder);

			//Table horizontal borders
			for (var i = 0; i < 6 + 1; i++) {
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
				betTypeTxt[count] = new createjs.Text(i.toUpperCase(), 'bold 20px Lato', '#231f20');
				betTypeTxt[count].x = tblHeaderBg.x + 30;
				betTypeTxt[count].y = (tblHeaderBg.x + 27) + (count * 40);
				betTypeTxt[count].textAlign = 'left';
				this.tableContainer.addChild(betTypeTxt[count]);

				betAmountTxt[count] = new createjs.Text(this.formatNumber(this.betHistory[i].bet), 'normal 20px Lato', '#231f20');
				betAmountTxt[count].x = tblHeaderBg.x + 380;
				betAmountTxt[count].y = (tblHeaderBg.x + 27) + (count * 40);
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

				winLoseAmtTxt[count] = new createjs.Text(this.formatNumber(this.betHistory[i].win), 'normal 20px Lato', moneyColorCode);
				winLoseAmtTxt[count].x = tblHeaderBg.x + 580;
				winLoseAmtTxt[count].y = (tblHeaderBg.x + 27) + (count * 40);
				winLoseAmtTxt[count].textAlign = 'right';
				this.tableContainer.addChild(winLoseAmtTxt[count]);

				totalWinLoseAmt += this.betHistory[i].win;
				totalBetAmtNum += parseInt(this.betHistory[i].bet);
				count++;
			} // end for in

			let tblTotalTxt = new createjs.Text(window.language.lobby.total, 'bold 21px Lato', '#231f20');
			tblTotalTxt.x = tblHeaderBg.x + 55;
			tblTotalTxt.y = (tblHeaderBg.y + tableHeight) + 6.5;
			tblTotalTxt.textAlign = 'center';
			this.tableContainer.addChild(tblTotalTxt);

			let totalBetTxt = new createjs.Text(this.formatNumber(totalBetAmtNum), 'bold 21px Lato', '#231f20');
			totalBetTxt.x = tblHeaderBg.x + 380;
			totalBetTxt.y = (tblHeaderBg.y + tableHeight) + 6.5;
			totalBetTxt.textAlign = 'right';
			this.tableContainer.addChild(totalBetTxt);

			if (totalWinLoseAmt > 0) {
				moneyColorCode = '#2164cd';
			}
			else {
				moneyColorCode = '#c63837';
			}

			let totalWinLoseTxt = new createjs.Text(this.formatNumber(totalWinLoseAmt), 'bold 21px Lato', moneyColorCode);
			totalWinLoseTxt.x = tblHeaderBg.x + 580;
			totalWinLoseTxt.y = (tblHeaderBg.y + tableHeight) + 6.5;
			totalWinLoseTxt.textAlign = 'right';
			this.tableContainer.addChild(totalWinLoseTxt);
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
	lobby_poker_data
}
