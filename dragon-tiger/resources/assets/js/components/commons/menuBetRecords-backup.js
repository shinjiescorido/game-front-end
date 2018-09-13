/**
 * betRecords.js
 * @author Kevin Villanueva
 * @since 2017.06.15
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 * Handles all bet records menu functionalities
**/

import {createSprite, randomNum, createCardSprite, numberCounter, playSound, setCurrentTimezone } from '../../factories/factories';

let instance = null;

export default(links) => {
	instance = instance || new blu.Component({
		main() {
			this.visible = false;
			this.timezoneOffset = -(new Date().getTimezoneOffset() / 60)

			//Modal dimensions
			this._modalWidth = 900;
			this._modalHeight = 460;

			this.y = 300;
			this.x = this.context.context.width - (this._modalWidth + 110);

			let betRecordsIcon = ["transfer-"+window.theme, "bet-logs-"+window.theme, "game-history-"+window.theme];
			this.betRecordsLbl = [window.language.menu.transferlogscaps, window.language.menu.betlogscaps, window.language.menu.gamehistorycaps];
			this.betRecordsTab = [];
			this.betRecordstabIcon = [];
			this.betRecordstabLbl = [];

			// init Transfer Logs Pagination
			this._transferBtnPagination = [];
			this._transferPaginationNum = [];

			//init Bet logs Pagination
			this._betBtnPagination = [];
			this._betPaginationNum = [];

			//init Game History Pagination
			this._histBtnPagination = [];
			this._histPaginationNum = [];

			//Modal Header
			this._modalHeader = new createjs.Shape();
			this._modalHeader.graphics.beginLinearGradientFill([this.context.theme_color[window.theme].base_color, this.context.theme_color[window.theme].gradColor2], [.1, .9], 10, 10, 10, 35)
				.drawRoundRect(0, .8, this._modalWidth, 35, 3);
			this.addChild(this._modalHeader);

			//Header Text
			this._headerTxt = new createjs.Text(window.language.menu.recordscaps, window.language.locale == "zh" ? "bold 20px arial" : "bold 15px arial", this.context.theme_color[window.theme].labelcolor);
			this._headerTxt.x = this._modalHeader.x + 10;

			if(window.language.locale == "zh") {
				this._headerTxt.y = this._modalHeader.y + 7;
			} else {
				this._headerTxt.y = this._modalHeader.y + 9;
			}

			this.addChild(this._headerTxt);

			//Header Close button
			this._headerClose = new createjs.Text("X","bold 15px arial", this.context.theme_color[window.theme].labelcolor);
			this._headerClose.x = this._modalWidth - 30;
			this._headerClose.y = this._modalHeader.y + 9;
			this.addChild(this._headerClose);

			//Close button hitarea
			this._headerCloseHit = new createjs.Shape();
			this._headerCloseHit.graphics.beginFill("#000").drawRect(0, 0, 20, 20);
			this._headerCloseHit.x = this._headerClose.x;
			this._headerCloseHit.y = this._headerClose.y;
			this._headerCloseHit.cursor = "pointer";
			this._headerCloseHit.alpha = 0.01;
			this.addChild(this._headerCloseHit);

			//Close modal
			this._headerCloseHit.addEventListener("mousedown", (e) => {
				this.context.component_menu.setActiveModal();
				this.visible = false;
			});

			this._modalBg = new createjs.Shape();
			this._modalBg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);
			this._modalBg.y = this._modalHeader.y + 35;
			this.addChild(this._modalBg);

			this._tblHeader = new createjs.Shape();
			this._tblHeader.graphics.beginFill(this.context.theme_color[window.theme].tbl_header).drawRoundRect(0, 0, this._modalWidth - 15, 30, 4);
			this._tblHeader.x = 10;
			this._tblHeader.y = this._modalBg.y + 10;
			this.addChild(this._tblHeader);

			//===== TRANSFER LOGS INIT START
			this._transferLogsCon = new createjs.Container();
			this.addChild(this._transferLogsCon);
			this._transferLogsCon.visible = true;

			this._transferLogsAssets = new createjs.Container();
			this._transferLogsCon.addChild(this._transferLogsAssets);

			this._transferLogsData = new createjs.Container();
			this._transferLogsData.y = -65;
			this._transferLogsCon.addChild(this._transferLogsData);

			this._transferPaginationCon = new createjs.Container();
			this._transferPaginationCon.y = -62;
			this._transferLogsCon.addChild(this._transferPaginationCon);
			//===== TRANSFER LOGS END

			//====BET LOGS START
			this._betLogsCon = new createjs.Container();
			this.addChild(this._betLogsCon);
			this._betLogsCon.visible = false;

			this._betLogsData = new createjs.Container();
			this._betLogsData.y = -65;
			this._betLogsCon.addChild(this._betLogsData);

			this._betLogsAssets = new createjs.Container();
			this._betLogsCon.addChild(this._betLogsAssets);

			this._voidContainer = new createjs.Container();
			this._voidContainer.x = this._betLogsData.x;
			this._voidContainer.y = this._betLogsData.y;
			this._betLogsCon.addChild(this._voidContainer);

			this._betPaginationCon = new createjs.Container();
			this._betPaginationCon.y = -62;
			this._betLogsCon.addChild(this._betPaginationCon);
			//====BET LOGS END

			//===== GAME HISTORY INIT START
			this._gameHistCon = new createjs.Container();
			this.addChild(this._gameHistCon);
			this._gameHistCon.visible = false;

			this._gameHistData = new createjs.Container();
			this._gameHistData.y = -65;
			this._gameHistCon.addChild(this._gameHistData);

			this._gameHistAssets = new createjs.Container();
			this._gameHistCon.addChild(this._gameHistAssets);

			this._histPaginationCon = new createjs.Container();
			this._histPaginationCon.y = -62;
			this._gameHistCon.addChild(this._histPaginationCon);
			//===== GAME HISTORY END
		},

		changeTheme(new_theme) {
			this._modalHeader.graphics.clear().beginLinearGradientFill([this.context.theme_color[new_theme].base_color, this.context.theme_color[new_theme].gradColor2], [.1, .9], 10, 10, 10, 35)
				.drawRoundRect(0, .8, this._modalWidth, 35, 3);
			this._headerTxt.color = this.context.theme_color[new_theme].labelcolor;
			this._headerClose.color = this.context.theme_color[new_theme].labelcolor;
			this._modalBg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);
			this._tblHeader.graphics.clear().beginFill(this.context.theme_color[new_theme].tbl_header).drawRoundRect(0, 0, this._modalWidth - 15, 30, 4);
		},

		initRecords(type) {
			//Remove all
			this._transferLogsAssets.removeAllChildren();
			this._transferPaginationCon.removeAllChildren();
			this._transferLogsData.removeAllChildren();

			this._betLogsAssets.removeAllChildren();
			this._voidContainer.removeAllChildren();
			this._betPaginationCon.removeAllChildren();
			this._betLogsData.removeAllChildren();
			this.context.component_menuBetData.betDetails.removeAllChildren();

			this._gameHistAssets.removeAllChildren();
			this._histPaginationCon.removeAllChildren();
			this._gameHistData.removeAllChildren();
			this.context.component_menuBetData.histData.removeAllChildren();

			switch(type) {
				case ('transferlogs'):
					this._headerTxt.text = window.language.menu.transferlogscaps;

					this._transferLogsCon.visible = true;
					this._betLogsCon.visible = false;
					this._gameHistCon.visible = false;

					$.post(links.getTransferLogs, {tableId: window.tableNum}, (response) => {
					  this._transferLogs = JSON.parse(response);
						this.transferPageCountTotal = this._transferLogs.last_page;

						//Draw pagination
						this.reDrawPagination('transferlogs', this._transferPaginationCon, 0, 0, this.transferPageCountTotal, this._transferLogs);
						this.displayTransferLogs();
					});
					break;

				case ('betlogs'):
					this._headerTxt.text = window.language.menu.betlogscaps;

					this._transferLogsCon.visible = false;
					this._betLogsCon.visible = true;
					this._gameHistCon.visible = false;

					$.post(links.getBetLogs, {tableId: window.tableNum}, (response) => {
					  this._betLogs = JSON.parse(response);
						this._betResult = this.context.component_menuBetData.setBetLogs(this._betLogs);
						this.betPageCountTotal = this._betLogs.last_page;

						//Draw pagination
						this.reDrawPagination('betlogs', this._betPaginationCon, 0, 0, this.betPageCountTotal, this._betLogs);
						this.displayBetLogs();
					});
					break;

				case ('gamehistory'):
					this._headerTxt.text = window.language.menu.gamehistorycaps;

					this._transferLogsCon.visible = false;
					this._betLogsCon.visible = false;
					this._gameHistCon.visible = true;

					$.post(links.getGameHistory, {tableId: window.tableNum}, (response) => {
					  this._gameHistory = JSON.parse(response);
						this._histTblElem = this.context.component_menuBetData.gameHistoryEl;
						this._histData = this.context.component_menuBetData.setHistoryData(this._gameHistory);
						this.histPageCountTotal = this._gameHistory.last_page;

						//Draw pagination
						this.reDrawPagination('gamehistory', this._histPaginationCon, 0, 0, this.histPageCountTotal, this._gameHistory);
						this.displayGameHistory();
					});
					break;
			} //end switch
		},

		displayTransferLogs() {
			let transferDate = [];
			let transferType = [];
			let transferOldCred = [];
			let transferAmount = [];
			let transferNewCred = [];
			let transferIp = [];
			let transferCountry = [];

			let transferHeader = [];
			let tableBorder = [];
			let transferTblHeader = [
				window.language.menu.datecaps,
				window.language.menu.typecaps,
				window.language.menu.oldcreditcaps,
				window.language.menu.transferamountcaps,
				window.language.menu.newcreditcaps,
				window.language.menu.ipcaps,
				window.language.menu.countrycaps
			];

			this._transferLogsAssets.removeAllChildren();

			if (this._transferLogs.data.length == 0) {
				let noDataText = new createjs.Text(window.language.menu.nodata, 'bold 30px lato-regular', this.context.theme_color[window.theme].labelcolor);
				noDataText.x = this._modalWidth / 2;
				noDataText.y = 250;
				noDataText.textAlign = 'center';
				this._transferLogsAssets.addChild(noDataText);

				return;
			}

			for (var i = 0; i < transferTblHeader.length; i++) {
				transferHeader[i] = new createjs.Text(transferTblHeader[i], window.language.locale == "zh" ? 'bold 17px lato-regular' : 'bold 12px lato-regular', '#2b2b2b');
				transferHeader[i].x = (128 * i) + 70;

				if(window.language.locale == "zh") {
					transferHeader[i].y = this._tblHeader.y + 4;
				} else {
					transferHeader[i].y = this._tblHeader.y + 6;

					if (window.language.locale == "th") {
						transferHeader[i].font = 'bold 11px lato-regular';
					}
				}

				transferHeader[i].textAlign = 'center';
				this._transferLogsAssets.addChild(transferHeader[i]);

				if (i == 6) {
					transferHeader[i].x = ((this._modalWidth - 775) / 2) + 775;
				}

				if (i != transferTblHeader.length - 1) {
					tableBorder[i] = new createjs.Shape();
					tableBorder[i].graphics.setStrokeStyle(1).beginStroke(this.context.theme_color[window.theme].tbl_border)
						.moveTo((130 * i) + 130, this._tblHeader.y).lineTo((130 * i) + 130, 430);
					this._transferLogsAssets.addChild(tableBorder[i]);
				} // end if
			} // end for

			for (var i = 0; i < this._transferLogs.data.length; i++) {
				let newDate = '';
				if (this._transferLogs.data[i].created_at) {
				  newDate = setCurrentTimezone(this._transferLogs.data[i].created_at, parseInt(this.timezoneOffset));
				}

				transferDate[i] = new createjs.Text(newDate, 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				transferDate[i].x = 70;
				transferDate[i].y = (35 * i) + 160;
				transferDate[i].textAlign = 'center';
				this._transferLogsData.addChild(transferDate[i]);

				if(this._transferLogs.data[i].type.toUpperCase() == "CASH-IN") {
					transferType[i] = new createjs.Text(window.language.menu.cashin, window.language.locale == "zh" ? 'bold 16px lato-regular' : 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				} else {
					transferType[i] = new createjs.Text(window.language.menu.cashout, window.language.locale == "zh" ? 'bold 16px lato-regular' : 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				}

				transferType[i].x = 198;

				if(window.language.locale == "zh") {
					transferType[i].y = (35 * i) + 155;
				} else {
					transferType[i].y = (35 * i) + 160;
				}

				transferType[i].textAlign = 'center';
				this._transferLogsData.addChild(transferType[i]);

				transferOldCred[i] = new createjs.Text(this.formatNumber(this._transferLogs.data[i].old_money), 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				transferOldCred[i].x = transferDate[i].x + 310;
				transferOldCred[i].y = (35 * i) + 160;
				transferOldCred[i].textAlign = 'right';
				this._transferLogsData.addChild(transferOldCred[i]);

				transferAmount[i] = new createjs.Text(this.formatNumber(this._transferLogs.data[i].money), 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				transferAmount[i].x = transferOldCred[i].x + 130;
				transferAmount[i].y = (35 * i) + 160;
				transferAmount[i].textAlign = 'right';
				this._transferLogsData.addChild(transferAmount[i]);

				transferNewCred[i] = new createjs.Text(this.formatNumber(this._transferLogs.data[i].new_money), 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				transferNewCred[i].x = transferAmount[i].x + 130;
				transferNewCred[i].y = (35 * i) + 160;
				transferNewCred[i].textAlign = 'right';
				this._transferLogsData.addChild(transferNewCred[i]);

				transferIp[i] = new createjs.Text(this._transferLogs.data[i].ip, 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				transferIp[i].x = transferNewCred[i].x + 40;
				transferIp[i].y = (35 * i) + 160;
				transferIp[i].textAlign = 'left';
				this._transferLogsData.addChild(transferIp[i]);

				transferCountry[i] = new createjs.Text(this._transferLogs.data[i].country, 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				transferCountry[i].x = ((this._modalWidth - 775) / 2) + 745;
				transferCountry[i].y = (35 * i) + 160;
				transferCountry[i].textAlign = 'left';
				this._transferLogsData.addChild(transferCountry[i]);
			} // end for
		},

		displayBetLogs() {
			let rowDataBg = [];
			let betGameNo = [];
			let betDate = [];
			let betTable = [];
			let betRoom = [];
			let betStartingCred = [];
			let betTotalMoney = [];
			let betTotalWinning = [];
			let betNewCredit = [];
			let betResult = [];
			let betResultNum = [];

			let tblHeader = [];
			let tblBorder = [];
			let totalWidth = 0;

			this._betLogsAssets.removeAllChildren();
			this._voidContainer.removeAllChildren();

			let betlogsHeader = [
				{"header_width" : 129, "header_name" : window.language.menu.gamenocaps},
				{"header_width" : 149, "header_name" : window.language.menu.datecaps},
				{"header_width" : 119, "header_name" : window.language.menu.tablecaps},
				{"header_width" : 119, "header_name" : window.language.menu.roomcaps},
				// {"header_width" : 129, "header_name" : window.language.menu.startingcreditcaps},
				{"header_width" : 129, "header_name" : window.language.menu.totalbetcaps},
				{"header_width" : 129, "header_name" : window.language.menu.totalwinningscaps},
				// {"header_width" : 129, "header_name" : window.language.menu.newcreditcaps},
				{"header_width" : 129, "header_name" : window.language.menu.resultcaps},
			];

			if (this._betLogs.data.length == 0) {
				let noDataText = new createjs.Text(window.language.menu.nodata, 'bold 30px lato-regular', this.context.theme_color[window.theme].labelcolor);
				noDataText.x = this._modalWidth / 2;
				noDataText.y = 250;
				noDataText.textAlign = 'center';
				this._betLogsAssets.addChild(noDataText);

				return;
			}

			// Bet logs header & border
			for (var i = 0; i < betlogsHeader.length; i++) {
				totalWidth += betlogsHeader[i].header_width;

				tblHeader[i] = new createjs.Text(betlogsHeader[i].header_name, window.language.locale  == "zh" ? 'bold 17px lato-regular' : 'bold 12px lato-regular', '#2b2b2b');
				tblHeader[i].x = totalWidth - (betlogsHeader[i].header_width / 2);
				tblHeader[i].y = this._tblHeader.y + 6;
				tblHeader[i].textAlign = 'center';
				this._betLogsAssets.addChild(tblHeader[i]);

				if(window.language.locale == "zh") {
					tblHeader[i].y -= 2;
				}

				if (i+1 !== betlogsHeader.length) {
					tblBorder[i] = new createjs.Shape();
			    tblBorder[i].graphics.setStrokeStyle(1).beginStroke(this.context.theme_color[window.theme].tbl_border).moveTo(totalWidth, this._tblHeader.y).lineTo(totalWidth, 430);
			    this._betLogsAssets.addChild(tblBorder[i]);
			  }
			}

			for (var i = 0; i < this._betLogs.data.length; i++) {
				let record = this._betLogs.data[i];
				let data = JSON.parse(record.bet_history);
				let newCredit = 0;
				let startingCred = data[0].user_money;

				let winMoney = 0;
				let totalMoney = 0;
				let totalWinMoney = 0;

				let newDate = '';
				if (record.created_at) {
				  newDate = setCurrentTimezone(record.created_at, parseInt(this.timezoneOffset))
				}

				for (var j = 0; j < data.length; j++) {
					let winMoneyCon = 0;

					if (data[j].win_money != 0) {
						winMoney = data[j].win_money + data[j].bet_money;
						winMoneyCon = data[j].win_money + data[j].bet_money;
					}
					else {
						winMoney = data[j].win_money - data[j].bet_money;
					}

					totalMoney += winMoney;
					totalWinMoney += winMoneyCon;
				} //end for loop

				rowDataBg[i] = new createjs.Shape();
				rowDataBg[i].graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0, 0, this._modalWidth - 15, 35);
				rowDataBg[i].x = 10;
				rowDataBg[i].y = (35 * i) + 150;
				rowDataBg[i].cursor = 'pointer';
				rowDataBg[i].roundId = record.round_id;
				rowDataBg[i].roundNum = record.round_num;
				rowDataBg[i].date = newDate;
				this._betLogsData.addChild(rowDataBg[i]);

				betGameNo[i] = new createjs.Text(record.round_num, 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				betGameNo[i].x = tblHeader[0].x;
				betGameNo[i].y = (35 * i) + 160;
				betGameNo[i].textAlign = 'center';
				this._betLogsData.addChild(betGameNo[i]);

				betDate[i] = new createjs.Text(newDate, 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				betDate[i].x = tblHeader[1].x;
				betDate[i].y = (35 * i) + 160;
				betDate[i].textAlign = 'center';
				this._betLogsData.addChild(betDate[i]);

				betTable[i] = new createjs.Text(record.table_id, 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				betTable[i].x = tblHeader[2].x;
				betTable[i].y = (35 * i) + 160;
				betTable[i].textAlign = 'center';
				this._betLogsData.addChild(betTable[i]);

				betRoom[i] = new createjs.Text(record.table_id, 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				betRoom[i].x = tblHeader[3].x;
				betRoom[i].y = (35 * i) + 160;
				betRoom[i].textAlign = 'center';
				this._betLogsData.addChild(betRoom[i]);

				// betStartingCred[i] = new createjs.Text(this.formatNumber(data[0].user_money), 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				// betStartingCred[i].x = betRoom[i].x + 145;
				// betStartingCred[i].y = (35 * i) + 160;
				// betStartingCred[i].textAlign = 'right';
				// this._betLogsData.addChild(betStartingCred[i]);

				betTotalMoney[i] = new createjs.Text(this.formatNumber(record.total_bet), 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				betTotalMoney[i].x = tblHeader[4].x + 50;
				betTotalMoney[i].y = (35 * i) + 160;
				betTotalMoney[i].textAlign = 'right';
				this._betLogsData.addChild(betTotalMoney[i]);

				betTotalWinning[i] = new createjs.Text(this.formatNumber(record.total_win), 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				betTotalWinning[i].x = tblHeader[5].x + 50;
				betTotalWinning[i].y = (35 * i) + 160;
				betTotalWinning[i].textAlign = 'right';
				this._betLogsData.addChild(betTotalWinning[i]);

				newCredit = (parseInt(startingCred) - parseInt(record.total_bet)) + parseInt(record.total_win);

				// betNewCredit[i] = new createjs.Text(this.formatNumber(newCredit), 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				// betNewCredit[i].x = betTotalWinning[i].x + 135;
				// betNewCredit[i].y = (35 * i) + 160;
				// betNewCredit[i].textAlign = 'right';
				// this._betLogsData.addChild(betNewCredit[i]);

				rowDataBg[i].addEventListener("mouseover", (e) => {
					e.target.graphics.clear().beginFill(this.context.theme_color[window.theme].tbl_hover).drawRect(0, 0, this._modalWidth - 15, 35);
				});

				rowDataBg[i].addEventListener("mouseout", (e) => {
					e.target.graphics.clear().beginFill(this.context.theme_color[window.theme].base_color).drawRect(0, 0, this._modalWidth - 15, 35);
				});

				rowDataBg[i].addEventListener("click", (e) => {
					this.detailModal = this.context.component_menuBetData.showDetails(e.target.roundId, e.target.date, this._modalWidth, e.target.roundNum);
					this.detailModal.visible = true;
					this._betLogsCon.addChild(this.detailModal);
				});

				// if void
        if(record.status && record.status.toLowerCase() === 'w') {

          let voidContainer = new createjs.Container();
          voidContainer.y = betTotalWinning[i].y;
          voidContainer.x = 10;

          let voidShape = new createjs.Shape();
          voidShape.graphics.beginFill("#262525").drawRect(0, -10, 880, 36);
          voidShape.setBounds(0, -10, 880, 36);
          voidContainer.addChild(voidShape);

          let voidImg = new createjs.Bitmap(this.context.getResources("void"));
          voidImg.x = voidShape.getBounds().width - 52;
          voidImg.y = voidShape.getBounds().height/2 + voidShape.getBounds().y;
          voidImg.regX = voidImg.getBounds().width/2
          voidImg.regY = voidImg.getBounds().height/2
          voidContainer.addChild(voidImg);

          let voidText = new createjs.Text("GAME VOID", "12px lato-regular", "#fff");
          voidText.x = voidShape.getBounds().width - 240;
          voidText.y = voidShape.getBounds().height/2 + voidShape.getBounds().y;
          voidText.textBaseline = "middle";
          voidText.textAlign = "center";
          voidContainer.addChild(voidText);

          this._voidContainer.addChild(voidContainer);

					this._voidContainer.addChild(betGameNo[i]);
					this._voidContainer.addChild(betDate[i]);
					this._voidContainer.addChild(betTable[i]);
					this._voidContainer.addChild(betRoom[i]);
        }
			} // end for

			if (this.detailModal) {
				this.detailModal.visible = false;
			}

			//Add menuBetData container to Bet logs modal
			this._betResult.x = tblHeader[6].x;
			this._betLogsData.addChild(this._betResult);
		},

		displayGameHistory() {
			let histGameNo = [];
			let histDate = [];
			let columnName = [];
			let columnBorder = [];

			this._gameHistAssets.removeAllChildren();

			//Add menuBetData container to Bet logs modal
			this._gameHistData.addChild(this._histData);

			if (this._gameHistory.data.length == 0) {
				let noDataText = new createjs.Text(window.language.menu.nodata, 'bold 30px lato-regular', this.context.theme_color[window.theme].labelcolor);
				noDataText.x = this._modalWidth / 2;
				noDataText.y = 250;
				noDataText.textAlign = 'center';
				this._gameHistAssets.addChild(noDataText);

				return;
			}

			this._histGameNo = new createjs.Text(window.language.menu.gamenocaps, window.language.locale == "zh" ? 'bold 17px lato-regular' : 'bold 12px lato-regular', '#2b2b2b');
			this._histGameNo.x = 100;

			if(window.language.locale == "zh") {
				this._histGameNo.y = this._tblHeader.y + 4;
			} else {
				this._histGameNo.y = this._tblHeader.y + 6;
			}

			this._histGameNo.textAlign = 'center';
			this._gameHistAssets.addChild(this._histGameNo);

			this._histTableBorder1 = new createjs.Shape();
			this._histTableBorder1.graphics.setStrokeStyle(1).beginStroke(this.context.theme_color[window.theme].tbl_border)
						  .moveTo(this._histGameNo.x + 100, this._tblHeader.y).lineTo(this._histGameNo.x + 100, 430);
			this._gameHistAssets.addChild(this._histTableBorder1);

			this._histDate = new createjs.Text(window.language.menu.datecaps, window.language.locale == "zh" ? 'bold 17px lato-regular' : 'bold 12px lato-regular', '#2b2b2b');
			this._histDate.x = this._histGameNo.x + 200;

			if(window.language.locale == "zh") {
				this._histDate.y = this._tblHeader.y + 4;
			} else {
				this._histDate.y = this._tblHeader.y + 6;
			}

			this._histDate.textAlign = 'center';
			this._gameHistAssets.addChild(this._histDate);

			this._histTableBorder2 = new createjs.Shape();
			this._histTableBorder2.graphics.setStrokeStyle(1).beginStroke(this.context.theme_color[window.theme].tbl_border)
						  .moveTo(this._histDate.x + 100, this._tblHeader.y).lineTo(this._histDate.x + 100, 430);
			this._gameHistAssets.addChild(this._histTableBorder2);

			let prevXCoor = this._histDate.x + 100;

			if (this._histTblElem.length) {
				for (var i = 0; i < this._histTblElem.length; i++) {
					columnName[i] = new createjs.Text(this._histTblElem[i].table_name, window.language.locale == "zh" ? 'bold 17px lato-regular' : 'bold 12px lato-regular', '#2b2b2b');
					columnName[i].x = (this._histTblElem[i].table_width / 2) + prevXCoor;

					if(window.language.locale == "zh") {
						columnName[i].y = this._tblHeader.y + 4;
					} else {
						columnName[i].y = this._tblHeader.y + 6;
					}

					columnName[i].textAlign = 'center';
					this._gameHistAssets.addChild(columnName[i]);

					if (i != this._histTblElem.length - 1) {
						columnBorder[i] = new createjs.Shape();
						columnBorder[i].graphics.setStrokeStyle(1).beginStroke(this.context.theme_color[window.theme].tbl_border)
								.moveTo(prevXCoor + this._histTblElem[i].table_width, this._tblHeader.y).lineTo(prevXCoor + this._histTblElem[i].table_width, 430);
						this._gameHistAssets.addChild(columnBorder[i]);
					}

				prevXCoor = prevXCoor + this._histTblElem[i].table_width;
				}
			}

			for (var i = 0; i < this._gameHistory.data.length; i++) {
				let newDate = '';

				if(this._gameHistory.data[i].created_at) {
				    newDate = setCurrentTimezone(this._gameHistory.data[i].created_at, parseInt(this.timezoneOffset));
				}

				histGameNo[i] = new createjs.Text(this._gameHistory.data[i].round_num, 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				histGameNo[i].x = 100;
				histGameNo[i].y = (35 * i) + 160;
				histGameNo[i].textAlign = 'center';
				this._gameHistData.addChild(histGameNo[i]);

				histDate[i] = new createjs.Text(newDate, 'bold 11px lato-regular', this.context.theme_color[window.theme].labelcolor);
				histDate[i].x = histGameNo[i].x + 150;
				histDate[i].y = (35 * i) + 160;
				histDate[i].textAlign = 'left';
				this._gameHistData.addChild(histDate[i]);
			}

			this._histData.x = this._histDate.x + 100;
		},

		changeActivePage(type, container, countTotal, record, dataCon) {
			let numPage = 0;
			let lowTenthNum = 0;
			let currentPage = 0;
			let currentArr = 0;

			switch(record) {
				case ("gamehistory"):
					currentPage = this._gameHistory.current_page;
					countTotal = this.histPageCountTotal;
					break;

				case ("betlogs"):
					currentPage = this._betLogs.current_page;
					countTotal = this.betPageCountTotal;
					break;

				case ("transferlogs"):
					currentPage = this._transferLogs.current_page;
					countTotal = this.transferPageCountTotal;
					break;
			}

			lowTenthNum = Math.round(currentPage / 10) * 10;
			currentArr =  (currentPage - 1) % 10;

			if (lowTenthNum >= currentPage) {
				lowTenthNum -= 10;
			}

			switch(type) {
				case ("next"):
					if (currentArr == 0) {
						if (countTotal > 10) {
							countTotal -= 10;
						}
					}
					break;

				case ("prev"):
					if (currentArr == 9) {
						countTotal += 10;
					}
					break;

				case ("first"):
					countTotal = dataCon.last_page;
					break;

				case ("last"):
					countTotal = dataCon.last_page % 10;
					break;
			}

			container.removeAllChildren();
			this.reDrawPagination(record, container, currentArr, lowTenthNum, countTotal, dataCon);
		},

		reDrawPagination(record, container, currentArr, lowTenthNum, countTotal, dataCon) {
			let prevCoor = 0;
			let nextCoor = 0;
			let paginateCount = 0;
			let prevUrl = '';
			let nextUrl = '';
			let lastPage = '';

			switch(record) {
				case ("gamehistory"):
					this.histPageCountTotal = countTotal;
					prevUrl = this._gameHistory.prev_page_url;
					nextUrl = this._gameHistory.next_page_url;
					lastPage = this._gameHistory.last_page;
					break;

				case ("betlogs"):
					this.betPageCountTotal = countTotal;
					prevUrl = this._betLogs.prev_page_url;
					nextUrl = this._betLogs.next_page_url;
					lastPage = this._betLogs.last_page;
					break;

				case ("transferlogs"):
					this.transferPageCountTotal = countTotal;
					prevUrl = this._transferLogs.prev_page_url;
					nextUrl = this._transferLogs.next_page_url;
					lastPage = this._transferLogs.last_page;
					break;
			}

			if (countTotal > 10) {
				paginateCount = 10;
			}
			else if (countTotal == 0 && dataCon.total != 0) {
				paginateCount = 10;
			}
			else {
				paginateCount = countTotal;
			}

			this._histBtnPaginationHit = [];

			for (var x = 0; x < paginateCount; x++) {
				this._histBtnPagination[x] = new createjs.Shape();
				this._histBtnPagination[x].graphics.beginStroke(this.context.theme_color[window.theme].btn_pagination_border).setStrokeStyle(1).beginFill(this.context.theme_color[window.theme].btn_pagination).drawRect(0, 0, 30, 30);
				this._histBtnPagination[x].x = (this._modalWidth / 2) + ((x - (paginateCount / 2)) * 33);
				this._histBtnPagination[x].y = this._modalBg.y + 477;
				this._histBtnPagination[x].cursor = 'pointer';
				this._histBtnPagination[x].pageNum = lowTenthNum + (x + 1);
				container.addChild(this._histBtnPagination[x]);

				this._histPaginationNum[x] = new createjs.Text(lowTenthNum + (x + 1), 'normal 20px bebas-regular', this.context.theme_color[window.theme].pagination_num);
				this._histPaginationNum[x].x = this._histBtnPagination[x].x + 14;
				this._histPaginationNum[x].y = this._histBtnPagination[x].y + 3;
				this._histPaginationNum[x].textAlign = 'center';
				container.addChild(this._histPaginationNum[x]);

				this._histBtnPaginationHit[x] = new createjs.Shape();
				this._histBtnPaginationHit[x].graphics.beginFill(this.context.theme_color[window.theme].btn_pagination).drawRect(0, 0, 30, 30);
				this._histBtnPaginationHit[x].x = (this._modalWidth / 2) + ((x - (paginateCount / 2)) * 33);
				this._histBtnPaginationHit[x].y = this._modalBg.y + 477;
				this._histBtnPaginationHit[x].cursor = 'pointer';
				this._histBtnPaginationHit[x].pageNum = lowTenthNum + (x + 1);
				this._histBtnPaginationHit[x].alpha = 0.01;
				container.addChild(this._histBtnPaginationHit[x]);

				//Determine active page
				if (currentArr == x) {
					this._histBtnPagination[x].graphics.clear().beginStroke(this.context.theme_color[window.theme].btn_pagination_border).setStrokeStyle(1).beginFill(this.context.theme_color[window.theme].btn_pagination_active).drawRect(0, 0, 30, 30);
					this._histPaginationNum[x].color = this.context.theme_color[window.theme].btn_pagination_active_num;
				}

				if (x == 0) {
					prevCoor = this._histBtnPagination[x].x - 33;
					prevCoor = this._histBtnPaginationHit[x].x - 33;
				}

				if (x == paginateCount - 1) {
					nextCoor = this._histBtnPagination[x].x + 33;
					nextCoor = this._histBtnPaginationHit[x].x + 33;
				}

				//Pagination number click event
				((x) => {
					this._histBtnPaginationHit[x].addEventListener("mousedown", (e) => {
						this.paginate(record, e.currentTarget.pageNum, dataCon, false, (data) => {
							dataCon = JSON.parse(data);
							prevPageBtn.pageNum = dataCon.prev_page_url;
							nextPageBtn.pageNum = dataCon.next_page_url;
							this.changeActivePage('page', container, countTotal, record, dataCon);
						})
					});
				}(x));
			} // end for

			//Previous page icon
			let prevPageBtn = new createjs.Shape();
			prevPageBtn.graphics.beginStroke(this.context.theme_color[window.theme].btn_pagination_border).setStrokeStyle(1).beginFill(this.context.theme_color[window.theme].btn_pagination).drawRect(0, 0, 30, 30);
			prevPageBtn.x = prevCoor;
			prevPageBtn.y = this._modalBg.y + 477;
			prevPageBtn.cursor = 'pointer';
			prevPageBtn.pageNum = prevUrl;
			container.addChild(prevPageBtn);

			this._histPrevIcon = new createjs.Shape();
			this._histPrevIcon.graphics.beginStroke(this.context.theme_color[window.theme].pagination_num).setStrokeStyle(3, 'round').moveTo(17, 7).lineTo(12, 15).lineTo(17, 23);
			this._histPrevIcon.x = prevPageBtn.x;
			this._histPrevIcon.y = prevPageBtn.y;
			this._histPrevIcon.hitArea = prevPageBtn;
			container.addChild(this._histPrevIcon);

			//Previous page click event
			prevPageBtn.addEventListener("mousedown", (e) => {
				this.paginate(record, e.currentTarget.pageNum, dataCon, true, (data) => {
					dataCon = JSON.parse(data);
					prevPageBtn.pageNum = dataCon.prev_page_url;
					nextPageBtn.pageNum = dataCon.next_page_url;
					this.changeActivePage('prev', container, countTotal, record, dataCon);
				})
		  });

			//First page button
		  let firstPageBtn = new createjs.Shape();
			firstPageBtn.graphics.beginStroke(this.context.theme_color[window.theme].btn_pagination_border).setStrokeStyle(1).beginFill(this.context.theme_color[window.theme].btn_pagination).drawRect(0, 0, 30, 30);
			firstPageBtn.x = prevCoor - 33;
			firstPageBtn.y = this._modalBg.y + 477;
			firstPageBtn.cursor = 'pointer';
			firstPageBtn.pageNum = 1;
			container.addChild(firstPageBtn);

			this._histFirstIcon1 = new createjs.Shape();
			this._histFirstIcon1.graphics.beginStroke(this.context.theme_color[window.theme].pagination_num).setStrokeStyle(3, 'round').moveTo(20, 7).lineTo(15, 15).lineTo(20, 23);
			this._histFirstIcon1.x = firstPageBtn.x;
			this._histFirstIcon1.y = firstPageBtn.y;
			this._histFirstIcon1.hitArea = firstPageBtn;
			container.addChild(this._histFirstIcon1);

			this._histFirstIcon2 = new createjs.Shape();
			this._histFirstIcon2.graphics.beginStroke(this.context.theme_color[window.theme].pagination_num).setStrokeStyle(3, 'round').moveTo(14, 7).lineTo(9, 15).lineTo(14, 23);
			this._histFirstIcon2.x = firstPageBtn.x;
			this._histFirstIcon2.hitArea = firstPageBtn;
			container.addChild(this._histFirstIcon2);

			//First page click event
			firstPageBtn.addEventListener("mousedown", (e) => {
				this.paginate(record, e.currentTarget.pageNum, dataCon, false, (data) => {
					dataCon = JSON.parse(data);
					prevPageBtn.pageNum = dataCon.prev_page_url;
					nextPageBtn.pageNum = dataCon.next_page_url;
					this.changeActivePage('first', container, countTotal, record, dataCon);
				})
		  });

			//Next page button
			let nextPageBtn = new createjs.Shape();
			nextPageBtn.graphics.beginStroke(this.context.theme_color[window.theme].btn_pagination_border).setStrokeStyle(1).beginFill(this.context.theme_color[window.theme].btn_pagination).drawRect(0, 0, 30, 30);
			nextPageBtn.x = nextCoor;
			nextPageBtn.y = this._modalBg.y + 477;
			nextPageBtn.cursor = 'pointer';
			nextPageBtn.pageNum = nextUrl;
			container.addChild(nextPageBtn);

			this._nextIcon = new createjs.Shape();
			this._nextIcon.graphics.beginStroke(this.context.theme_color[window.theme].pagination_num).setStrokeStyle(3, 'round').moveTo(12, 7).lineTo(17, 15).lineTo(12, 23);
			this._nextIcon.x = nextPageBtn.x;
			this._nextIcon.y = nextPageBtn.y;
			this._nextIcon.hitArea = nextPageBtn;
			container.addChild(this._nextIcon);

			//Next page click event
			nextPageBtn.addEventListener("mousedown", (e) => {
				this.paginate(record, e.currentTarget.pageNum, dataCon, true, (data) => {
					dataCon = JSON.parse(data);
					prevPageBtn.pageNum = dataCon.prev_page_url;
					nextPageBtn.pageNum = dataCon.next_page_url;
					this.changeActivePage('next', container, countTotal, record, dataCon);
				})
		  });

			//Last page button
		  let lastPageBtn = new createjs.Shape();
			lastPageBtn.graphics.beginStroke(this.context.theme_color[window.theme].btn_pagination_border).setStrokeStyle(1).beginFill(this.context.theme_color[window.theme].btn_pagination).drawRect(0, 0, 30, 30);
			lastPageBtn.x = nextCoor + 33;
			lastPageBtn.y = this._modalBg.y + 477;
			lastPageBtn.cursor = 'pointer';
			lastPageBtn.pageNum = lastPage;
			container.addChild(lastPageBtn);

			this._histLastIcon1 = new createjs.Shape();
			this._histLastIcon1.graphics.beginStroke(this.context.theme_color[window.theme].pagination_num).setStrokeStyle(3, 'round').moveTo(10, 7).lineTo(15, 15).lineTo(10, 23);
			this._histLastIcon1.x = lastPageBtn.x;
			this._histLastIcon1.y = lastPageBtn.y;
			this._histLastIcon1.hitArea = lastPageBtn;
			container.addChild(this._histLastIcon1);

			this._histLastIcon2 = new createjs.Shape();
			this._histLastIcon2.graphics.beginStroke(this.context.theme_color[window.theme].pagination_num).setStrokeStyle(3, 'round').moveTo(16, 7).lineTo(21, 15).lineTo(16, 23);
			this._histLastIcon2.x = lastPageBtn.x;
			this._histLastIcon2.y = lastPageBtn.y;
			this._histLastIcon2.hitArea = lastPageBtn;
			container.addChild(this._histLastIcon2);

			//Last page click event
			lastPageBtn.addEventListener("mousedown", (e) => {
				this.paginate(record, e.currentTarget.pageNum, dataCon, false, (data) => {
					dataCon = JSON.parse(data);
					prevPageBtn.pageNum = dataCon.prev_page_url;
					nextPageBtn.pageNum = dataCon.next_page_url;
					this.changeActivePage('last', container, countTotal, record, dataCon);
				})
		  });

		  if (lastPage < 11) {
				firstPageBtn.visible = false;
				this._histFirstIcon1.visible = false;
				this._histFirstIcon2.visible = false;

				lastPageBtn.visible = false;
				this._histLastIcon1.visible = false;
				this._histLastIcon2.visible = false;
			}

			//Return if no data
			if (lastPage == 0) {
				firstPageBtn.visible = false;
				this._histFirstIcon1.visible = false;
				this._histFirstIcon2.visible = false;

				lastPageBtn.visible = false;
				this._histLastIcon1.visible = false;
				this._histLastIcon2.visible = false;

				nextPageBtn.visible = false;
				this._nextIcon.visible = false;

				prevPageBtn.visible = false;
				this._histPrevIcon.visible = false;
			}
		},

		paginate(type, pageNum, container, navigation, callback) {
			let pageUrl = '';
			//Live
			let baseUrl = window.dt_domain + window.tableNum + '/' + range + '/' + multiplayer;

			//Local
			// let baseUrl = 'http://10.1.10.149:8003/'+window.tableNum+'/'+range+'/'+multiplayer;

			if (pageNum == container.current_page) {
				return false;
			}

			if (navigation) {
				if (pageNum === null) {
					return;
				}

				pageUrl = baseUrl + pageNum;
			}
			else {
				pageUrl = baseUrl + '/' + type + '?page=' + pageNum;
			}

		  $.get(pageUrl, {tableId: window.tableNum}, (response) => { //$.post(links.getTransferLogs, {tableId: window.tableNum},
				if (type == 'transferlogs') {
					this._transferLogs = JSON.parse(response);
					this._transferLogsData.removeAllChildren();
					this.displayTransferLogs();
				}
				else if (type == 'betlogs') {
					this._betLogs = JSON.parse(response);
					this._betLogsData.removeAllChildren();
					this.context.component_menuBetData.paginateResult(type, this._betLogs);
					this.displayBetLogs();
				}
				else if (type == 'gamehistory') {
					this._gameHistory = JSON.parse(response);
					this._gameHistData.removeAllChildren();
					this.context.component_menuBetData.paginateResult(type, this._gameHistory);
					this.displayGameHistory();
				}

				callback(response);
			});
		},

		formatNumber(number) {
			if((window.casino == 'SS')) {
				return number.toLocaleString(undefined, {minimumFractionDigits: 2});
			} else {
				number = parseInt(number) || 0;
				return number.toLocaleString('en');
			}
		},
	});

	return instance;
}
