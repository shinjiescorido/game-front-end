import {
  createCardSprite,
  getSlaveParam
} from '../../factories/factories';
import cardValue from '../../factories/cards';

let instance = null;

export default (links) => {
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
      this.gameHistoryEl = [{
          "table_name": window.language.menu.dealernamecaps,
          "table_width": 150
        },
        {
          "table_name": window.language.menu.cardvaluescaps,
          "table_width": 200
        },
        {
          "table_name": window.language.menu.resultcaps,
          "table_width": 150
        }
      ];
    },

    setBetLogs(data) {
      this._betLogs = data;
      this.betResult.removeAllChildren();
      let betDataPairCircle = [];

      for (var i = 0; i < this._betLogs.data.length; i++) {
        let record = this._betLogs.data[i];
        let results = JSON.parse(record.game_result);
        let markColorCode = '';
        let markText = '';
        switch (results.winner) {
          case ("player"):
            markText = window.language.locale == "zh" ? "闲" : "P";
            markColorCode = '#1976d3';
            break;

          case ("banker"):
            markText = window.language.locale == "zh" ? "庄" : "B";
			// supersix : checks if its a supersix winner as well
            markColorCode = (results.supersix && isSuperSix())?'#de9940':'#b61c1a';
            break;

          case ("tie"):
            markText = window.language.locale == "zh" ? '和' : 'T';
            markColorCode = '#689f39 ';
            break;
        }

        this._betShape[i] = new createjs.Shape();
        this._betShape[i].graphics.beginFill(markColorCode).drawCircle(0, 0, 11);
        this._betShape[i].y = (35 * i) + 167;
        this.betResult.addChild(this._betShape[i]);

        this._betText[i] = new createjs.Text(markText, 'normal 16px BebasNeue', '#fff');
        this._betText[i].y = (35 * i) + 158;
        this._betText[i].textAlign = 'center';
        this.betResult.addChild(this._betText[i]);

        if (results.pairs.length) {
          for (var j = 0; j < results.pairs.length; j++) {
            if (results.pairs[j] == 'player') {
              betDataPairCircle[j] = new createjs.Shape();
              betDataPairCircle[j].graphics.s('#fff').ss(0.3).beginFill('#1977d1').drawCircle(0, 0, 3);
              betDataPairCircle[j].x = this._betShape[i].x + 8;
              betDataPairCircle[j].y = this._betShape[i].y + 8;
              this.betResult.addChild(betDataPairCircle[j]);
            } else if (results.pairs[j] == 'banker') {
              betDataPairCircle[j] = new createjs.Shape();
              betDataPairCircle[j].graphics.s('#fff').ss(0.3).beginFill('#d32f2e').drawCircle(0, 0, 3);
              betDataPairCircle[j].x = this._betShape[i].x - 8;
              betDataPairCircle[j].y = this._betShape[i].y - 8;
              this.betResult.addChild(betDataPairCircle[j]);
            }
          }
        }
      } //end for loop

      return this.betResult;
    },

    setHistoryData(data) {
      this._gameHistory = data;
      let histPairCircle = [];

      for (var i = 0; i < this._gameHistory.data.length; i++) {
        let record = this._gameHistory.data[i];
        let results = JSON.parse(record.game_result);

        if (results === null) {
          continue;
        }

        let markColorCode = '';
        let markText = '';
        switch (results.winner) {
          case ("player"):
            markText = window.language.locale == "zh" ? "闲" : "P";
            markColorCode = '#1976d3';
            break;

          case ("banker"):
            markText = window.language.locale == "zh" ? "庄" : "B";
            markColorCode = (results.supersix && isSuperSix())?'#de9940':'#b61c1a';
            break;

          case ("tie"):
            markText = window.language.locale == "zh" ? '和' : 'T';
            markColorCode = '#689f39 ';
            break;
        }

        let cardwidth = 24;
        let carddata = {
          "banker": [
            "C" + JSON.parse(record.game_info).banker1,
            "C" + JSON.parse(record.game_info).banker2,
            (JSON.parse(record.game_info).banker3) ? "C" + JSON.parse(record.game_info).banker3 : null,
          ],
          "player": [
            "C" + JSON.parse(record.game_info).player1,
            "C" + JSON.parse(record.game_info).player2,
            (JSON.parse(record.game_info).player3) ? "C" + JSON.parse(record.game_info).player3 : null
          ]
        }

        this._histCards[i] = {
          "banker": [
            createCardSprite(this, 22, 29, "cards_sprite_small"),
            createCardSprite(this, 22, 29, "cards_sprite_small")
          ],
          "player": [
            createCardSprite(this, 22, 29, "cards_sprite_small"),
            createCardSprite(this, 22, 29, "cards_sprite_small")
          ]
        };

        if (carddata.banker[2]) this._histCards[i].banker.push(createCardSprite(this, 22, 29, "cards_sprite_small"));
        if (carddata.player[2]) this._histCards[i].player.push(createCardSprite(this, 22, 29, "cards_sprite_small"));

        this._histCards[i].banker.forEach((o, k) => {
          let comm_x = 257;
          o.gotoAndStop(carddata.banker[k]);
          // o.scaleX = o.scaleY = cardwidth / 74;
          o.x = comm_x + (cardwidth * k);
          o.y = (35 * i) + 154;
          this.histData.addChild(o);

          if (k == 2 && this._histCards[i].banker.length == 3) {
            o.rotation = 90;
            o.x += 30;
            o.y = o.y += 3.5;
          }

        });
        this._histCards[i].player.forEach((o, k) => {
          let comm_x = 223;
          o.gotoAndStop(carddata.player[k]);
          // o.scaleX = o.scaleY = cardwidth / 74;
          o.x = comm_x - (cardwidth * k);
          o.y = (35 * i) + 154;
          this.histData.addChild(o);

          if (k == 2 && this._histCards[i].player.length == 3) {
            o.rotation = -90;
            o.x -= 7
            o.y += 27.3;
          }
        });




        this._histShape[i] = new createjs.Shape();
        this._histShape[i].graphics.beginFill(markColorCode).drawCircle(0, 0, 11);
        this._histShape[i].x = 425;
        this._histShape[i].y = (35 * i) + 167;
        this.histData.addChild(this._histShape[i]);

        this._histText[i] = new createjs.Text(markText, 'normal 16px BebasNeue', '#fff');
        this._histText[i].x = this._histShape[i].x;
        this._histText[i].y = (35 * i) + 158;
        this._histText[i].textAlign = 'center';
        this.histData.addChild(this._histText[i]);

        if (results.pairs.length) {
          for (var j = 0; j < results.pairs.length; j++) {
            if (results.pairs[j] == 'player') {
              histPairCircle[j] = new createjs.Shape();
              histPairCircle[j].graphics.s('#fff').ss(0.3).beginFill('#1977d1').drawCircle(0, 0, 4);
              histPairCircle[j].x = this._histShape[i].x + 8;
              histPairCircle[j].y = this._histShape[i].y + 8;
              this.histData.addChild(histPairCircle[j]);
            } else if (results.pairs[j] == 'banker') {
              histPairCircle[j] = new createjs.Shape();
              histPairCircle[j].graphics.s('#fff').ss(0.3).beginFill('#d32f2e').drawCircle(0, 0, 4);
              histPairCircle[j].x = this._histShape[i].x - 8;
              histPairCircle[j].y = this._histShape[i].y - 8;
              this.histData.addChild(histPairCircle[j]);
            }
          }
        }

        // if void
        if(this._gameHistory.data[i].status && this._gameHistory.data[i].status.toLowerCase() === 'w') {
          
          let voidContainer = new createjs.Container();
          voidContainer.y = (35 * i) + 160;
          voidContainer.x = -390;

          let voidShape = new createjs.Shape();
          voidShape.graphics.beginFill("#262525").drawRect(0, -10, 880, 36);
          voidShape.setBounds(0, -10, 880, 36);
          voidContainer.addChild(voidShape);

          let voidImg = new createjs.Bitmap(this.context.getResources("void"));
          voidImg.x = voidShape.getBounds().width - 65;
          voidImg.y = voidShape.getBounds().height/2 + voidShape.getBounds().y;
          voidImg.regX = voidImg.getBounds().width/2
          voidImg.regY = voidImg.getBounds().height/2
          voidContainer.addChild(voidImg);

          let voidText = new createjs.Text("GAME VOID", "12px lato", "#fff");
          voidText.x = voidShape.getBounds().width - 240;
          voidText.y = voidShape.getBounds().height/2 + voidShape.getBounds().y;
          voidText.textBaseline = "middle";
          voidText.textAlign = "center";
          voidContainer.addChild(voidText);

          this.histData.addChild(voidContainer);
        }

        this._histDealer[i] = new createjs.Text(record.name, 'normal 11px Lato', this.context.theme_color[window.theme].labelcolor);
        this._histDealer[i].x = 75;
        this._histDealer[i].y = (35 * i) + 160;
        this._histDealer[i].textAlign = 'center';
        this.histData.addChild(this._histDealer[i]);

      } //end for loop

      return this.histData;
    },

    showDetails(roundNum, roundDate, mWidth, table) {
      let details = {
        date: roundDate,
        width: mWidth,
        round: roundNum,
        round_num: table
      }
      let mdlDetailWidth = 820;
      let tblBorderHor = [];

      this.betDetails.removeAllChildren();

      let detailBg = new createjs.Shape();
      detailBg.graphics.setStrokeStyle(2).beginStroke('#000').beginFill('#d5d5d5').drawRoundRect(0, 0, mdlDetailWidth, 600, 7);
      detailBg.x = (details.width / 2) - (mdlDetailWidth / 2);
      detailBg.y = 80;
      this.betDetails.addChild(detailBg);

      //Click event to prevent click behind the modal
      detailBg.addEventListener("mousedown", (e) => {
        return;
      });

      this.cardContainer = new createjs.Container();
      this.cardContainer.scaleX = this.cardContainer.scaleY = 1.2;
      this.betDetails.addChild(this.cardContainer);
      this.cardContainer.x = (-600 * 0.2) + 30;

      this.tableContainer = new createjs.Container();
      this.tableContainer.scaleX = this.tableContainer.scaleY = 1.2;
      this.betDetails.addChild(this.tableContainer);
      this.tableContainer.x = (-600 * 0.2) + 40;
      this.tableContainer.y = -15;

      let detailHeaderBg = new createjs.Shape();
      detailHeaderBg.graphics.beginFill('#ff9b28').drawRoundRect(0, 0, mdlDetailWidth - 3, 45, 7);
      detailHeaderBg.x = detailBg.x + 2;
      detailHeaderBg.y = detailBg.y + 2;
      this.betDetails.addChild(detailHeaderBg);

      let detailHeaderTxt = new createjs.Text(window.language.menu.winningresultcaps, 'bold 20px Lato', '#2b2b2b');
      detailHeaderTxt.x = detailBg.x + (mdlDetailWidth / 2);
      detailHeaderTxt.y = detailBg.y + 10;
      detailHeaderTxt.textAlign = 'center';
      this.betDetails.addChild(detailHeaderTxt);

      let shapeClose = new createjs.Shape();
      shapeClose.graphics.beginFill("#ff9b28").drawRect(0, 0, 40, 40);
      shapeClose.x = detailBg.x + (mdlDetailWidth - 30) - 15;
      shapeClose.y = detailBg.y + 5;
      shapeClose.cursor = "pointer";
      this.betDetails.addChild(shapeClose);

      //Header Close button
      let headerClose = new createjs.Text("X", "bold 17px arial", '#2b2b2b');
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
      detailSubHeaderBg.graphics.beginFill('#bcbcbc').drawRect(0, 0, mdlDetailWidth - 3, 45);
      detailSubHeaderBg.x = detailBg.x + 2;
      detailSubHeaderBg.y = detailHeaderBg.y + 45;
      this.betDetails.addChild(detailSubHeaderBg);

      let detailGameId = new createjs.Text(window.language.menu.gamenocaps + ': ' + details.round_num, 'bold 22px Lato', '#2b2b2b');
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
      detailResultCon.x = detailSubHeaderBg.x + (mdlDetailWidth / 2);
      detailResultCon.y = detailSubHeaderBg.y + 12;
      this.betDetails.addChild(detailResultCon);

      shapeClose.addEventListener("mousedown", (e) => {
        this.betDetails.visible = false;
      });

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

      let tblHeaderBetType = new createjs.Text(window.language.menu.betcaps + ' ' + window.language.menu.typecaps, 'bold 16px Lato', '#242021');
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

      $.post(links.getDetails, {
        round: details.round,
        tableId: window.tableNum,
		slave : (getSlaveParam(window.slave != "" ? window.slave : 'normal'))?window.slave:false
      }, response=> {

        for (var i = 0; i < response.length; i++) {

          this.betHistory = JSON.parse(response[i].bet_history);
          this.gameInfo = JSON.parse(response[i].game_info);
          this.gameResult = JSON.parse(response[i].game_result);

          betCount = this.betHistory.length;

          switch (this.gameResult.winner) {
            case ("player"):
              winnerText = window.language.locale == "zh" ? "闲" : "P";
              markColorCode = '#1977d1';
              break;

            case ("banker"):
              winnerText = window.language.locale == "zh" ? "庄" : "B";
			  //check if this is supersix win
              markColorCode = (this.gameResult.supersix && isSuperSix())?'#de9940':'#d32f2e';
              break;

            case ("tie"):
              winnerText = window.language.locale == "zh" ? '和' : 'T';
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
        }; //end for loop

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
            } else if (this.gameResult.pairs[i] == 'banker') {
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
        this.cardContainer.addChild(cardResultCon);

        //Banker card results
        let totalPlayerAmt = 0;
        let totalBankerAmt = 0;

        if (this.gameInfo.player3 !== null) {
          let playerCard3 = createCardSprite(this, 74, 99, 'cards_sprite');
          playerCard3.x = cardResultCon.x + 20;
          playerCard3.y = cardResultCon.y + 115;
          playerCard3.rotation = -90;
          playerCard3.gotoAndStop('C' + this.gameInfo.player3);
          this.cardContainer.addChild(playerCard3);

          if (cardValue(this.gameInfo.player3).value < 10) {
            totalPlayerAmt += cardValue(this.gameInfo.player3).value;
          }
        }

        let playerCard2 = createCardSprite(this, 74, 99, 'cards_sprite');
        playerCard2.x = cardResultCon.x + 123;
        playerCard2.y = cardResultCon.y + 15;
        playerCard2.gotoAndStop('C' + this.gameInfo.player2);
        this.cardContainer.addChild(playerCard2);

        if (cardValue(this.gameInfo.player2).value < 10) {
          totalPlayerAmt += cardValue(this.gameInfo.player2).value;
        }

        let playerCard1 = createCardSprite(this, 74, 99, 'cards_sprite');
        playerCard1.x = playerCard2.x + 77;
        playerCard1.y = cardResultCon.y + 15;
        playerCard1.gotoAndStop('C' + this.gameInfo.player1);
        this.cardContainer.addChild(playerCard1);

        if (cardValue(this.gameInfo.player1).value < 10) {
          totalPlayerAmt += cardValue(this.gameInfo.player1).value;
        }

        //Player card results
        let bankerCard1 = createCardSprite(this, 74, 99, 'cards_sprite');
        bankerCard1.x = playerCard1.x + 100;
        bankerCard1.y = cardResultCon.y + 15;
        bankerCard1.gotoAndStop('C' + this.gameInfo.banker1);
        this.cardContainer.addChild(bankerCard1);

        if (cardValue(this.gameInfo.banker1).value < 10) {
          totalBankerAmt += cardValue(this.gameInfo.banker1).value;
        }

        let bankerCard2 = createCardSprite(this, 74, 99, 'cards_sprite');
        bankerCard2.x = bankerCard1.x + 77;
        bankerCard2.y = cardResultCon.y + 15;
        bankerCard2.gotoAndStop('C' + this.gameInfo.banker2);
        this.cardContainer.addChild(bankerCard2);

        if (cardValue(this.gameInfo.banker2).value < 10) {
          totalBankerAmt += cardValue(this.gameInfo.banker2).value;
        }

        if (this.gameInfo.banker3 !== null) {
          let bankerCard3 = createCardSprite(this, 74, 99, 'cards_sprite');
          bankerCard3.x = bankerCard2.x + 180;
          bankerCard3.y = cardResultCon.y + 40;
          bankerCard3.rotation = 90;
          bankerCard3.gotoAndStop('C' + this.gameInfo.banker3);
          this.cardContainer.addChild(bankerCard3);

          if (cardValue(this.gameInfo.banker3).value < 10) {
            totalBankerAmt += cardValue(this.gameInfo.banker3).value;
          }
        }

        //Result circle
        let resultPlayerCircle = new createjs.Shape();
        resultPlayerCircle.graphics.beginFill('#1977d1').drawCircle(0, 0, 23);
        resultPlayerCircle.x = cardResultCon.x + 50;
        resultPlayerCircle.y = cardResultCon.y;
        this.cardContainer.addChild(resultPlayerCircle);

        let bankerPlayerCircle = new createjs.Shape();
        bankerPlayerCircle.graphics.beginFill('#d32f2e').drawCircle(0, 0, 23);
        bankerPlayerCircle.x = cardResultCon.x + 525;
        bankerPlayerCircle.y = cardResultCon.y;
        this.cardContainer.addChild(bankerPlayerCircle);

        //Result value
         /*let holder = 0;

         if (totalPlayerAmt > 9) {
         holder = totalPlayerAmt.toString();
         totalPlayerAmt = holder.slice(-1);
         console.log("totalPlayerAmt : ", totalPlayerAmt);
         }*/

        let playerTotalVal = new createjs.Text(parseInt(totalPlayerAmt) % 10, 'bold 28px Lato', '#fff');
        playerTotalVal.x = resultPlayerCircle.x;
        playerTotalVal.y = resultPlayerCircle.y - 18;
        playerTotalVal.textAlign = 'center';
        this.cardContainer.addChild(playerTotalVal);

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
        this.cardContainer.addChild(bankerTotalVal);

        //Table data
        let tableHeight = (betCount + 1) * 40;

        detailBg.graphics.clear().setStrokeStyle(2).beginStroke('#000').beginFill('#d5d5d5').drawRoundRect(0, 0, mdlDetailWidth, tableHeight + 500, 7);

        //Table
        let tblBodyBorder = new createjs.Shape();
        tblBodyBorder.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').drawRect(0, 0, tblWidth, tableHeight);
        tblBodyBorder.x = tblHeaderBg.x;
        tblBodyBorder.y = tblHeaderBg.y + 40;
        this.tableContainer.addChild(tblBodyBorder);

        let tblTotalText = new createjs.Text(window.language.menu.total, 'bold 20px Lato', '#231f20');
        tblTotalText.x = tblHeaderBg.x + 100;
        tblTotalText.y = (tblHeaderBg.y + tableHeight) + 10;
        tblTotalText.textAlign = 'center';
        this.tableContainer.addChild(tblTotalText);

        //Table horizontal borders
        for (var i = 0; i < betCount + 1; i++) {
          tblBorderHor[i] = new createjs.Shape();
          tblBorderHor[i].graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x, (tblHeaderBg.y + 40) + (i * 40)).lineTo(tblBodyBorder.x + tblWidth, (tblHeaderBg.y + 40) + (i * 40));
          this.tableContainer.addChild(tblBorderHor[i]);
        } //end for loop

        //Table vertical borders
        let tblBorderVer1 = new createjs.Shape();
        tblBorderVer1.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x + 200, tblHeaderBg.y + 40).lineTo(tblBodyBorder.x + 200, tblHeaderBg.y + tableHeight + 40);
        this.tableContainer.addChild(tblBorderVer1);

        let tblBorderVer2 = new createjs.Shape();
        tblBorderVer2.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x + 400, tblHeaderBg.y + 40).lineTo(tblBodyBorder.x + 400, tblHeaderBg.y + tableHeight + 40);
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
        let isDragonType = false;
        let dragonTypeCount = 0;

        //Table data

        for (var i = 0; i < betCount; i++) {

          switch (this.betHistory[i].bet) {
            case ("player"):
              betTypeText = window.language.locale == "zh" ? "闲" : "P";
              markColorCode = '#1977d1';
              break;

            case ("playerpair"):
              betTypeText = window.language.locale == "zh" ? "闲" : "P";
              markColorCode = '#1977d1';
              break;

            case ("banker"):
              betTypeText = window.language.locale == "zh" ? "庄" : "B";
              markColorCode = '#d32f2e ';
              break;

            case ("bankerpair"):
              betTypeText = window.language.locale == "zh" ? "庄" : "B";
              markColorCode = '#d32f2e ';
              break;

			case ("supersix"): // for supersix bets
				betTypeText = window.language.locale == "zh" ? "庄" : "B";
				markColorCode = '#de9940 ';
              break;

            case ("tie"):
              betTypeText = window.language.locale == "zh" ? '和' : 'T';
              markColorCode = '#689f37';
              break;

            case ("big"):
              betTypeText = 'BIG';
              isDragonType = true;
              break;

            case ("small"):
              betTypeText = 'SMALL';
              isDragonType = true;
              break;

            case ("bonus_banker"):
              betTypeText = 'BANKER BONUS';
              isDragonType = true;
              break;

            case ("bonus_player"):
              betTypeText = 'PLAYER BONUS';
              isDragonType = true;
              break;
          }


          if(!isDragonType)
          {
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
            } else if (this.betHistory[i].bet == 'bankerpair') {
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
          }
          else
          {
            betTypeTextObj[i] = new createjs.Text(betTypeText, 'bold 20px Lato', '#231f20');
            betTypeTextObj[i].x = tblHeaderBg.x + 100;
            betTypeTextObj[i].y = (tblHeaderBg.y + 60) + (i * 40) - 12;
            betTypeTextObj[i].textAlign = 'center';
            this.tableContainer.addChild(betTypeTextObj[i]);

            dragonTypeCount++;
            if(dragonTypeCount > 0) this.betDetails.y = -95 - (dragonTypeCount * 18);
          }

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
          } else {
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
        } else {
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

      this.betDetails.scaleX = this.betDetails.scaleY = 0.8;
      this.betDetails.x = (mWidth / 2) - (mdlDetailWidth * 0.8) / 2 - 30;
      this.betDetails.y = -95;

      return this.betDetails;
    },

    paginateResult(type, data) {
      if (type == 'betlogs') {
        this.betResult.removeAllChildren();
        this.setBetLogs(data);
      } else if (type == 'gamehistory') {
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

    let isSuperSix = () =>{
      return getSlaveParam('supersix');
    }

    let isDragonBonus = () =>{
      return getSlaveParam('bonus');
    }

  return instance;
}
