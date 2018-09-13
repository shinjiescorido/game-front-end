import { createCardSprite} from '../../../factories/factories';
import cardValue from '../../../factories/cards';

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
			this.gameHistoryEl = [
				{"table_name" : window.language.menu.dealernamecaps, "table_width" : 150},
				{"table_name" : window.language.menu.cardvaluescaps, "table_width" : 300},
				{"table_name" : window.language.menu.resultcaps, "table_width" : 150}
			];
		},

		setBetLogs(data) {
			this._betLogs = data;

			for (var i = 0; i < this._betLogs.data.length; i++) {
				let record = this._betLogs.data[i];
				let results = JSON.parse(record.game_result);

				let markColorCode = '';
				let markText = '';
				if(!results.winner) continue;
				switch(results.winner) {
					case ("suited tie"):
					markText = window.language.locale == "zh" ? '和' : 'T';
					markColorCode = '#06770d';
					break;

					case ("tie"):
					markText = window.language.locale == "zh" ? '和' : 'T';
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

				this._betShape[i] = new createjs.Shape();
				this._betShape[i].graphics.beginFill(markColorCode).drawCircle(0, 0, 11);
				this._betShape[i].y = (35 * i) + 167;
				this.betResult.addChild(this._betShape[i]);

				if (results.winner == 'suited tie') {
					this._betShape[i].graphics.clear().ss(2).s('#c97d1b').beginFill(markColorCode).drawCircle(0, 0, 11);
				}

				this._betText[i] = new createjs.Text(markText, 'normal 16px bebas-regular', '#fff');
				this._betText[i].y = (35 * i) + 158;
				this._betText[i].textAlign = 'center';
				this.betResult.addChild(this._betText[i]);
			} //end for loop

			return this.betResult;
		},

		setHistoryData(data) {
			this._gameHistory = data;

			for (var i = 0; i < this._gameHistory.data.length; i++) {
				let record = this._gameHistory.data[i];
				let results = JSON.parse(record.game_result);

				let markColorCode = '';
				let markText = '';
				if(!results) continue;
				switch(results.winner) {
					case ("suited tie"):
					markText = window.language.locale == "zh" ? '和' : 'T';
					markColorCode = '#06770d';
					break;

					case ("tie"):
					markText = window.language.locale == "zh" ? '和' : 'T';
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

				let cardwidth = 24;
				this._histCards[i] = {
					"dragon": createCardSprite(this, 22, 29, "cards_sprite_small"),
					"tiger": createCardSprite(this, 22, 29, "cards_sprite_small")
				};
				// this._histCards[i].dragon.scaleX = this._histCards[i].dragon.scaleY = this._histCards[i].tiger.scaleX = this._histCards[i].tiger.scaleY = cardwidth/74 ;
				this._histCards[i].dragon.y = this._histCards[i].tiger.y = (35 * i) + 154;

				this._histCards[i].dragon.gotoAndPlay("C" + JSON.parse(record.game_info).dragon)
				this._histCards[i].dragon.x = 300 - (cardwidth + 15);

				this._histCards[i].tiger.gotoAndPlay("C" + JSON.parse(record.game_info).tiger)
				this._histCards[i].tiger.x = 315;

				this.histData.addChild(this._histCards[i].dragon, this._histCards[i].tiger);

				this._histShape[i] = new createjs.Shape();
				this._histShape[i].graphics.beginFill(markColorCode).drawCircle(0, 0, 11);
				this._histShape[i].x = 525;
				this._histShape[i].y = (35 * i) + 167;
				this.histData.addChild(this._histShape[i]);

				if (results.winner == 'suited tie') {
					this._histShape[i].graphics.clear().ss(2).s('#c97d1b').beginFill(markColorCode).drawCircle(0, 0, 11);
				}

				this._histText[i] = new createjs.Text(markText, 'normal 16px bebas-regular', '#fff');
				this._histText[i].x = this._histShape[i].x;
				this._histText[i].y = (35 * i) + 158;
				this._histText[i].textAlign = 'center';
				this.histData.addChild(this._histText[i]);

				// if void
				if(this._gameHistory.data[i].status && this._gameHistory.data[i].status.toLowerCase() === 'w') {

					let voidContainer = new createjs.Container();
					voidContainer.y = (35 * i) + 160;
					voidContainer.x = -390;

					let voidShape = new createjs.Shape();
					voidShape.graphics.beginFill("#262525").drawRect(0, -10, 980, 36);
					voidShape.setBounds(0, -10, 980, 36);
					voidContainer.addChild(voidShape);

					let voidImg = new createjs.Bitmap(this.context.getResources("void"));
					voidImg.x = voidShape.getBounds().width - 65;
					voidImg.y = voidShape.getBounds().height/2 + voidShape.getBounds().y;
					voidImg.regX = voidImg.getBounds().width/2
					voidImg.regY = voidImg.getBounds().height/2
					voidContainer.addChild(voidImg);

					let voidText = new createjs.Text("GAME VOID", "12px lato-regular", "#fff");
					voidText.x = voidShape.getBounds().width - 295;
					voidText.y = voidShape.getBounds().height/2 + voidShape.getBounds().y;
					voidText.textBaseline = "middle";
					voidText.textAlign = "center";
					voidContainer.addChild(voidText);

					this.histData.addChild(voidContainer);
				}

				this._histDealer[i] = new createjs.Text(record.name, 'bold 13px lato-regular', this.context.theme_color[window.theme].labelcolor);
				this._histDealer[i].x = 75;
				this._histDealer[i].y = (35 * i) + 160;
				this._histDealer[i].textAlign = 'center';
				this.histData.addChild(this._histDealer[i]);

			} //end for loop

			return this.histData;
		},

		showDetails(roundNum, roundDate, mWidth, table) {
			let con = $('.betlog-result').show()
			$('.betlog-info__items.betlog-info--gameno span').text(`${window.language.menu.gamenocaps}: ${roundNum}`)
			$('.betlog-info__items.betlog-info--date span').text(`${roundDate}`)

			let details = {
				date : roundDate,
				width : mWidth,
				round : roundNum,
				round_num : table
			}
			let mdlDetailWidth = 820;
			let tblBorderHor = [];


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

			let table_con = con.find('.table--betlog.tbl--body').empty()
			let result_con = $('.betlog-result--dragontiger').empty();
			let cardResult_con = $('.betlog-result-cardholder').empty();
			let border_color = '';
			let suite = '';

			$.post(links.getDetails, {round: details.round, tableId: window.tableNum}, (response) => {
				for (var i = 0; i < response.length; i++) {
					this.betHistory = JSON.parse(response[i].bet_history);
					this.gameInfo = JSON.parse(response[i].game_info);
					let gameResult = JSON.parse(response[i].game_result);

					let count = 0;
					betCount = this.betHistory.length;

					if( betCount > 7 ) {
						$('.betlog-result .betlog-table-con').css({ 'overflow-y': 'scroll'})
					} else {
						$('.betlog-result .betlog-table-con').css({ 'overflow-y': ''})
					}

					switch(gameResult.winner) {
						case ("suited tie"):
						winnerText = window.language.locale == "zh" ? '和' : 'T';
						markColorCode = '#06770d';
						winnerSide = gameResult.side_bets.dragon;
						isSuitedTie = true;
						border_color = '#c97d1b';
						break;

						case ("tie"):
						winnerText = window.language.locale == "zh" ? '和' : 'T';
						markColorCode = '#06770d';
						winnerSide = gameResult.side_bets.dragon;
						border_color = '#06770d';
						break;

						case ("dragon"):
						winnerText = window.language.locale == "zh" ? '龙' : 'D';
						markColorCode = '#1877d3 ';
						winnerSide = gameResult.side_bets.dragon;
						border_color = '#1877d3';
						break;

						case ("tiger"):
						winnerText = window.language.locale == "zh" ? '虎' : 'T';
						markColorCode = '#b71d1d';
						border_color = '#b71d1d';
						winnerSide = gameResult.side_bets.tiger;
						break;
					}

					if (gameResult.side_bets == 'seven') {
						winnerSide = [];
					}

				} //end for loop

				let nosidebets = '';

				if(winnerSide == 'seven') {
					result_con.append(`
					 <span class="dt-normal ${nosidebets}" style="background: ${markColorCode}; border: 1px solid ${border_color}; display : block">${winnerText}</span>
				 `)
				}



				console.log("winnerSide", winnerSide);

				if (winnerSide) {
					switch(winnerSide.parity) {
						case ("odd"):
						parityText = window.language.locale == "zh" ? "单" : "O";
						break;

						case ("even"):
						parityText = window.language.locale == "zh" ? "双" : "E";
						break;
					}

					switch(winnerSide.size) {
						case ("big"):
						sizeText = window.language.locale == "zh" ? "大" : "B";
						break;

						case ("small"):
						sizeText = window.language.locale == "zh" ? "小" : "S";
						break;
					}

					cardSuite = winnerSide.suite;
				}
				else {
					parityText = '7';
					sizeText = '7';
				}

				console.log("winnerText", winnerText, parityText, sizeText, cardSuite);

				if(parityText) {
					result_con.append(`
						<span class="dt-normal" style="background: ${markColorCode}; border: 1px solid ${border_color}">${winnerText}</span>
						<span class="dt-normal" style="background: ${markColorCode}; border: 1px solid ${border_color}">${parityText}</span>
						<span class="dt-normal" style="background: ${markColorCode}; border: 1px solid ${border_color}">${sizeText}</span>
						<span class="dt-suite-${cardSuite}" style="background: ${markColorCode}; border: 1px solid ${border_color}"></span>
					`)
				}



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
						betText = window.language.locale == "zh" ? '和' : 'T';
						suite = '';
					}
					else if (this.betHistory[j].bet == 'suited_tie') {
						betColorCode = '#057811';
						isText = true;
						betText = window.language.locale == "zh" ? '和' : 'T';
						suite = '';
					} else {
						let partsOfStr = this.betHistory[j].bet.split('_');

						switch(partsOfStr[0]) {
							case ("dragon"):
							betColorCode = '#1976d3';

							if (partsOfStr[1] === undefined) {
								isText = true;
								betText = window.language.locale == "zh" ? '龙' : 'D';
								suite = '';
							}
							break;

							case ("tiger"):
							betColorCode = '#b61c1e';

							if (partsOfStr[1] === undefined) {
								isText = true;
								betText = window.language.locale == "zh" ? '虎' : 'T';
								suite = '';
							}
							break;
						}

						if (!isText) {
							if (partsOfStr[1] == 'even') {
								isText = true;
								suite = '';
								betText = 'E';
							}
							else if (partsOfStr[1] == 'odd') {
								isText = true;
								suite = '';
								betText = 'O';
							}
							else if (partsOfStr[1] == 'big') {
								isText = true;
								suite = '';
								betText = 'B';
							}
							else if (partsOfStr[1] == 'small') {
								isText = true;
								suite = '';
								betText = 'S';
							}
							else if (partsOfStr[1] == 'diamonds') {
								isText = false;
								suite = 'diamond';
								betText = '';
							}
							else if (partsOfStr[1] == 'clubs') {
								isText = false;
								suite = 'club';
								betText = '';
							}
							else if (partsOfStr[1] == 'hearts') {
								isText = false;
								suite = 'heart';
								betText = '';
							}
							else if (partsOfStr[1] == 'spades') {
								isText = false;
								suite = 'spade';
								betText = '';
							}
						}

						if (this.betHistory[j].win_money == 0) {
							winLoseColor = '#c63837';
						}
						else {
							winLoseColor = '#067610';
						}

						let result_bets = this.formatNumber(this.betHistory[j].bet_money);
						let result_amount = this.formatNumber(this.betHistory[j].win_money);

						table_con.append(
							`<div class="betlog-tr">
							<div class="betlog-td -bettype">
							<span class="result-${suite}" style="background: ${betColorCode}">${betText}</span>
							</div>
							<div class="betlog-td -bets">
							<span>${result_bets}</span>
							</div>
							<div class="betlog-td -winlose" >
							<span style="color:${winLoseColor}">${result_amount}</span>
							</div>
							</div>`
						)

						totalBetAmt += this.betHistory[j].bet_money;
						totalWinLoseAmt += this.betHistory[j].win_money;

					}

					if (totalWinLoseAmt > 0) {
						winLoseColor = '#2067cf';
					}
					else {
						winLoseColor = '#c83838';
					}




				}

				table_con.append(
					`<div class="betlog-tr -total">
					<div class="betlog-td -bettype -total">
					<span>${window.language.menu.total}</span>
					</div>
					<div class="betlog-td -bets">
					<span>${this.formatNumber(totalBetAmt)}</span>
					</div>
					<div class="betlog-td -winlose" >
					<span style="color:${winLoseColor}">${this.formatNumber(totalWinLoseAmt)}</span>
					</div>
					</div>`
				)

				let valTiger = cardValue(this.gameInfo.tiger)
				let valDragon = cardValue(this.gameInfo.dragon)
				cardResult_con.append(`
					<div class="betlog-result-card__items -dragon">
						<div class="cardholder-con -dragon">
							<span class="card-${this.gameInfo.dragon}"></span>
						</div>
						<span class="cardresult--value -dragon">${valDragon.value}</span>
					</div>
					<div class="betlog-result-card__items -tiger">
						<div class="cardholder-con -tiger">
							<span class="card-${this.gameInfo.tiger}"></span>
						</div>
						<span class="cardresult--value -tiger">${valTiger.value}</span>
					</div>
				`)

			});



			$('.betlog-result .ico-close').on('click', function() {
				$('.betlog-result').hide();
				con.find('.table--betlog.tbl--body').empty()
				result_con.empty();
				cardResult_con.empty();
			});













			// let details = {
			// 	date : roundDate,
			// 	width : mWidth,
			// 	round : roundNum,
			// 	round_num : table
			// }
			// let mdlDetailWidth = 820;
			// let tblBorderHor = [];
			//
			// this.betDetails.removeAllChildren();
			//
			// let detailBg = new createjs.Shape();
			// detailBg.graphics.setStrokeStyle(2).beginStroke('#000').beginFill('#d5d5d5').drawRoundRect(0, 0, mdlDetailWidth, 554, 7);
			// detailBg.x = (details.width / 2) - (mdlDetailWidth / 2);
			// detailBg.y = 40;
			// this.betDetails.addChild(detailBg);
			//
			// //Click event to prevent click behind the modal
			// detailBg.addEventListener("mousedown", (e) => {
			// 	return;
			// });
			//
			// this.cardsContainer = new createjs.Container();
			// this.cardsContainer.scaleX = this.cardsContainer.scaleY = 1.2;
			// this.betDetails.addChild(this.cardsContainer);
			// this.cardsContainer.x = - 98;
			// this.cardsContainer.y = - 40;
			//
			// this.tableContainer = new createjs.Container();
			// this.tableContainer.scaleX = this.tableContainer.scaleY = 1.20;
			// this.betDetails.addChild(this.tableContainer);
			// this.tableContainer.x = - 89.5;
			// this.tableContainer.y = - 45;
			//
			// let detailHeaderBg = new createjs.Shape();
			// detailHeaderBg.graphics.beginFill('#ff9b28').drawRoundRect(0, 0, mdlDetailWidth-3, 45, 7);
			// detailHeaderBg.x = detailBg.x + 2;
			// detailHeaderBg.y = detailBg.y + 2;
			// this.betDetails.addChild(detailHeaderBg);
			//
			// let detailHeaderTxt = new createjs.Text(window.language.menu.winningresultcaps, 'bold 24px lato-regular', '#2b2b2b');
			// detailHeaderTxt.x = detailBg.x + (mdlDetailWidth / 2);
			// detailHeaderTxt.y = detailBg.y + 10;
			// detailHeaderTxt.textAlign = 'center';
			// this.betDetails.addChild(detailHeaderTxt);
			//
			// //Header Close button
			// let headerClose = new createjs.Text("X","bold 20px arial", '#2b2b2b');
			// headerClose.x = detailBg.x + (mdlDetailWidth - 30);
			// headerClose.y = detailBg.y + 15;
			// this.betDetails.addChild(headerClose);
			//
			// //Close button hitarea
			// let headerCloseHit = new createjs.Shape();
			// headerCloseHit.graphics.beginFill("#000").drawRect(0, 0, 50, 40);
			// headerCloseHit.x = headerClose.x - 20;
			// headerCloseHit.y = headerClose.y - 10;
			// headerCloseHit.cursor = "pointer";
			// headerCloseHit.alpha = 0.01;
			// this.betDetails.addChild(headerCloseHit);
			//
			// let detailSubHeaderBg = new createjs.Shape();
			// detailSubHeaderBg.graphics.beginFill('#bcbcbc').drawRect(0, 0, mdlDetailWidth-3, 45);
			// detailSubHeaderBg.x = detailBg.x + 2;
			// detailSubHeaderBg.y = detailHeaderBg.y + 45;
			// this.betDetails.addChild(detailSubHeaderBg);
			//
			// let detailGameId = new createjs.Text(window.language.menu.gamenocaps + ': '+details.round_num, 'bold 22px lato-regular', '#2b2b2b');
			// detailGameId.x = detailSubHeaderBg.x + 10;
			// detailGameId.y = detailSubHeaderBg.y + 12;
			// detailGameId.textAlign = 'left';
			// this.betDetails.addChild(detailGameId);
			//
			// let detailDate = new createjs.Text(details.date, 'bold 22px lato-regular', '#2b2b2b');
			// detailDate.x = detailSubHeaderBg.x + (mdlDetailWidth - 10);
			// detailDate.y = detailSubHeaderBg.y + 12;
			// detailDate.textAlign = 'right';
			// this.betDetails.addChild(detailDate);
			//
			// let detailResultCon = new createjs.Shape();
			// detailResultCon.graphics.setStrokeStyle(1).beginStroke('#999999').beginFill('#e5e5e5').drawRoundRect(-165, 0, 330, 70, 3);
			// detailResultCon.x = detailSubHeaderBg.x + (mdlDetailWidth/2);
			// detailResultCon.y = detailSubHeaderBg.y + 12;
			// this.betDetails.addChild(detailResultCon);
			//
			// //Close modal
			// headerCloseHit.addEventListener("mousedown", (e) => {
			//     	this.betDetails.visible = false;
			//   });
			//
			// let tblWidth = 598;
			//
			// let tblHeaderBg = new createjs.Shape();
			// tblHeaderBg.graphics.beginFill('#c9c9c9').drawRect(0, 0, tblWidth, 40);
			// tblHeaderBg.x = detailSubHeaderBg.x + 100;
			// tblHeaderBg.y = detailResultCon.y + 250;
			// this.tableContainer.addChild(tblHeaderBg);
			//
			// let tblHeaderBetType = new createjs.Text(window.language.menu.betcaps +' '+ window.language.menu.typecaps, 'bold 20px lato-regular', '#242021');
			// tblHeaderBetType.x = tblHeaderBg.x + 90;
			// tblHeaderBetType.y = tblHeaderBg.y + 10;
			// tblHeaderBetType.textAlign = 'center';
			// this.tableContainer.addChild(tblHeaderBetType);
			//
			// let tblHeaderBets = new createjs.Text(window.language.menu.betscaps, 'bold 20px lato-regular', '#242021');
			// tblHeaderBets.x = tblHeaderBg.x + 290;
			// tblHeaderBets.y = tblHeaderBg.y + 10;
			// tblHeaderBets.textAlign = 'center';
			// this.tableContainer.addChild(tblHeaderBets);
			//
			// let tblHeaderWin = new createjs.Text(window.language.menu.payoutcaps, 'bold 20px lato-regular', '#242021');
			// tblHeaderWin.x = tblHeaderBg.x + 490;
			// tblHeaderWin.y = tblHeaderBg.y + 10;
			// tblHeaderWin.textAlign = 'center';
			// this.tableContainer.addChild(tblHeaderWin);
			//
			// let markColorCode = '';
			// let winnerText = '';
			//   let winnerCircle = [];
			// let winnerSide = [];
			// let betCircle = [];
			// let betColorCode = [];
			//
			// let betCount = 0;
			// let parityText = '';
			// let sizeText = '';
			// let cardSuite = '';
			//
			// let isSuitedTie = false;
			//
			// this.resultContainer = new createjs.Container();
			// this.resultContainer.y = tblHeaderBg.y + 70;
			// this.resultContainer.x = 12;
			// this.betDetails.addChild(this.resultContainer);
			//
			// this.tblDataContainer = new createjs.Container();
			// this.tblDataContainer.y = -468;
			// this.tblDataContainer.x = -100;
			// this.resultContainer.addChild(this.tblDataContainer);
			// this.tblDataContainer.scaleX = this.tblDataContainer.scaleY = 1.2;
			//
			// this.circleContainer = new createjs.Container();
			// this.circleContainer.scaleX = this.circleContainer.scaleY = 1.1;
			// this.circleContainer.x = - 48;
			// this.circleContainer.y = -12;
			// this.betDetails.addChild(this.circleContainer);
			//
			// $.post(links.getDetails, {round: details.round, tableId: window.tableNum}, (response) => {
			// 	for (var i = 0; i < response.length; i++) {
			// 		this.betHistory = JSON.parse(response[i].bet_history);
			// 		this.gameInfo = JSON.parse(response[i].game_info);
			// 		let gameResult = JSON.parse(response[i].game_result);
			//
			// 		let count = 0;
			// 		betCount = this.betHistory.length;
			//
			// 		switch(gameResult.winner) {
			// 			case ("suited tie"):
			// 				winnerText = window.language.locale == "zh" ? '和' : 'T';
			// 				markColorCode = '#06770d';
			// 				winnerSide = gameResult.side_bets.dragon;
			// 				isSuitedTie = true;
			// 				break;
			//
			// 			case ("tie"):
			// 				winnerText = window.language.locale == "zh" ? '和' : 'T';
			// 				markColorCode = '#06770d';
			// 				winnerSide = gameResult.side_bets.dragon;
			// 				break;
			//
			// 			case ("dragon"):
			// 				winnerText = window.language.locale == "zh" ? '龙' : 'D';
			// 				markColorCode = '#1877d3 ';
			// 				winnerSide = gameResult.side_bets.dragon;
			// 				break;
			//
			// 			case ("tiger"):
			// 				winnerText = window.language.locale == "zh" ? '虎' : 'T';
			// 				markColorCode = '#b71d1d';
			// 				winnerSide = gameResult.side_bets.tiger;
			// 				break;
			// 		}
			//
			// 		if (gameResult.side_bets == 'seven') {
			// 			winnerSide = [];
			// 		}
			// 	} //end for loop
			//
			// 	for (var i = 0; i < 4; i++) {
			// 		winnerCircle[i] = new createjs.Shape();
			// 		winnerCircle[i].graphics.beginFill(markColorCode).drawCircle(0, 0, 18);
			// 		winnerCircle[i].x = (detailResultCon.x - 85) + (55 * i);
			// 		winnerCircle[i].y = detailResultCon.y + 35;
			// 		this.circleContainer.addChild(winnerCircle[i]);
			//
			// 		if (isSuitedTie) {
			// 			winnerCircle[i].graphics.clear().ss(2).s('#c97d1b').beginFill(markColorCode).drawCircle(0, 0, 18);
			// 		}
			// 	}
			//
			// 	let winnerTextObj = new createjs.Text(winnerText, 'bold 22px lato-regular', '#fff');
			// 	winnerTextObj.x = winnerCircle[0].x;
			// 	winnerTextObj.y = winnerCircle[0].y - 14;
			// 	winnerTextObj.textAlign = 'center';
			// 	this.circleContainer.addChild(winnerTextObj);
			//
			// 	if (winnerSide) {
			// 		switch(winnerSide.parity) {
			// 			case ("odd"):
			// 				parityText = window.language.locale == "zh" ? "单" : "O";
			// 				break;
			//
			// 			case ("even"):
			// 				parityText = window.language.locale == "zh" ? "双" : "E";
			// 				break;
			// 		}
			//
			// 		switch(winnerSide.size) {
			// 			case ("big"):
			// 				sizeText = window.language.locale == "zh" ? "大" : "B";
			// 				break;
			//
			// 			case ("small"):
			// 				sizeText = window.language.locale == "zh" ? "小" : "S";
			// 				break;
			// 		}
			//
			// 		cardSuite = winnerSide.suite;
			// 	}
			// 	else {
			// 		parityText = '7';
			// 		sizeText = '7';
			// 	}
			//
			// 	if (parityText) {
			// 		let parityTextObj = new createjs.Text(parityText, 'bold 22px lato-regular', '#fff');
			// 		parityTextObj.x = winnerCircle[1].x;
			// 		parityTextObj.y = winnerCircle[1].y - 14;
			// 		parityTextObj.textAlign = 'center';
			// 		this.circleContainer.addChild(parityTextObj);
			//
			// 		let sizeTextObj = new createjs.Text(sizeText, 'bold 22px lato-regular', '#fff');
			// 		sizeTextObj.x = winnerCircle[2].x;
			// 		sizeTextObj.y = winnerCircle[2].y - 14;
			// 		sizeTextObj.textAlign = 'center';
			// 		this.circleContainer.addChild(sizeTextObj);
			//
			// 		let suiteObj = new createjs.Bitmap("/img/card-suite/"+cardSuite+".png");
			// 		suiteObj.scaleX = suiteObj.scaleY = 0.43;
			// 		suiteObj.x = winnerCircle[3].x - 13;
			// 		suiteObj.y = winnerCircle[3].y - 12;
			// 		this.circleContainer.addChild(suiteObj);
			// 	}
			// 	else {
			// 		winnerCircle[0].x += 80;
			// 		winnerTextObj.x += 80;
			//
			// 		winnerCircle[1].visible = false;
			// 		winnerCircle[2].visible = false;
			// 		winnerCircle[3].visible = false;
			// 	}
			//
			//
			// 	let tableHeight = (betCount + 1) * 40;
			//
			// 	let mdHeight = (betCount + 1) >= 7 ? 750 : (betCount + 1) * (40 * 1.2) + 410;
			// 	detailBg.graphics.clear().setStrokeStyle(2).beginStroke('#000').beginFill('#d5d5d5').drawRoundRect(0, 0, mdlDetailWidth, mdHeight, 7);
			//
			// 	//Table
			//     let tblBodyBorder = new createjs.Shape();
			// 	tblBodyBorder.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').drawRect(0, 0, tblWidth, tableHeight);
			// 	tblBodyBorder.x = tblHeaderBg.x;
			// 	tblBodyBorder.y = tblHeaderBg.y + 40;
			// 	this.tblDataContainer.addChild(tblBodyBorder);
			//
			// 	let tblTotalText = new createjs.Text(window.language.menu.total, 'bold 24px lato-regular', '#231f20');
			// 	tblTotalText.x = tblHeaderBg.x + 90;
			// 	tblTotalText.y = (tblHeaderBg.y + tableHeight) + 5;
			// 	tblTotalText.textAlign = 'center';
			// 	this.tblDataContainer.addChild(tblTotalText);
			//
			// 	//Table horizontal borders
			// 	for (var i = 0; i < betCount + 1; i++) {
			// 		tblBorderHor[i] = new createjs.Shape();
			// 	    tblBorderHor[i].graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x, (tblHeaderBg.y+40) + (i * 40)).lineTo(tblBodyBorder.x + tblWidth, (tblHeaderBg.y+40) + (i * 40));
			// 	    this.tblDataContainer.addChild(tblBorderHor[i]);
			// 	}
			//
			// 	//Table vertical borders
			// 	let tblBorderVer1 = new createjs.Shape();
			//     tblBorderVer1.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x + 200, tblHeaderBg.y+40).lineTo(tblBodyBorder.x + 200, tblHeaderBg.y+tableHeight+40);
			//     this.tblDataContainer.addChild(tblBorderVer1);
			//
			//     let tblBorderVer2 = new createjs.Shape();
			//     tblBorderVer2.graphics.setStrokeStyle(1).beginStroke('#b7b7b7').moveTo(tblBodyBorder.x + 400, tblHeaderBg.y+40).lineTo(tblBodyBorder.x + 400, tblHeaderBg.y+tableHeight+40);
			//     this.tblDataContainer.addChild(tblBorderVer2);
			//
			//     let betText = '';
			//     let betTextObj = [];
			//     let betAmtObj = [];
			//     let winLoseObj = [];
			//     let totalBetAmt = 0;
			//     let totalWinLoseAmt = 0;
			//     let winLoseColor = '';
			//     let winLoseAmt = 0;
			//
			//     for (var j = 0; j < betCount; j++) {
			//     	let isText = false;
			//
			//     	if (this.betHistory[j].bet == 'tie') {
			//     		betColorCode = '#057811';
			//     		isText = true;
			//     		betText = window.language.locale == "zh" ? '和' : 'T';
			//     	}
			//     	else if (this.betHistory[j].bet == 'suited_tie') {
			//     		betColorCode = '#057811';
			//     		isText = true;
			//     		betText = window.language.locale == "zh" ? '和' : 'T';
			//     	}
			//     	else {
			//     		let partsOfStr = this.betHistory[j].bet.split('_');
			//
			//     		switch(partsOfStr[0]) {
			// 				case ("dragon"):
			// 					betColorCode = '#1976d3';
			//
			// 					if (partsOfStr[1] === undefined) {
			// 						isText = true;
			// 						betText = window.language.locale == "zh" ? '龙' : 'D';
			// 					}
			// 					break;
			//
			// 				case ("tiger"):
			// 					betColorCode = '#b61c1e';
			//
			// 					if (partsOfStr[1] === undefined) {
			// 						isText = true;
			// 						betText = window.language.locale == "zh" ? '虎' : 'T';
			// 					}
			// 					break;
			// 			}
			//
			// 			if (!isText) {
			// 				if (partsOfStr[1] == 'even') {
			// 					isText = true;
			// 					betText = 'E';
			// 				}
			// 				else if (partsOfStr[1] == 'odd') {
			// 					isText = true;
			// 					betText = 'O';
			// 				}
			// 				else if (partsOfStr[1] == 'big') {
			// 					isText = true;
			// 					betText = 'B';
			// 				}
			// 				else if (partsOfStr[1] == 'small') {
			// 					isText = true;
			// 					betText = 'S';
			// 				}
			// 				else if (partsOfStr[1] == 'diamonds') {
			// 					isText = false;
			// 					betText = 'diamond';
			// 				}
			// 				else if (partsOfStr[1] == 'clubs') {
			// 					isText = false;
			// 					betText = 'club';
			// 				}
			// 				else if (partsOfStr[1] == 'hearts') {
			// 					isText = false;
			// 					betText = 'heart';
			// 				}
			// 				else if (partsOfStr[1] == 'spades') {
			// 					isText = false;
			// 					betText = 'spade';
			// 				}
			// 			}
			//     	}
			//
			// 		betCircle[j] = new createjs.Shape();
			// 		betCircle[j].graphics.beginFill(betColorCode).drawCircle(0, 0, 15);
			// 		betCircle[j].x = tblHeaderBg.x + 90;
			// 		betCircle[j].y = (tblHeaderBg.y + 60) + (j * 40);
			// 		this.tblDataContainer.addChild(betCircle[j]);
			//
			// 		if (isText) {
			// 			betTextObj[j] = new createjs.Text(betText, 'bold 19px lato-regular', '#fff');
			// 			betTextObj[j].x = betCircle[j].x;
			// 			betTextObj[j].y = betCircle[j].y - 13;
			// 			betTextObj[j].textAlign = 'center';
			// 			this.tblDataContainer.addChild(betTextObj[j]);
			//
			// 			if (this.betHistory[j].bet == 'suited_tie') {
			// 				betCircle[j].graphics.clear().ss(3).s('#c97d1b').beginFill(betColorCode).drawCircle(0, 0, 15);
			// 			}
			// 		}
			// 		else {
			// 			betTextObj[j] = new createjs.Bitmap("/img/card-suite/"+betText+".png");
			// 			betTextObj[j].scaleX = betTextObj[j].scaleY = 0.37;
			// 			betTextObj[j].x = betCircle[j].x - 12;
			// 			betTextObj[j].y = betCircle[j].y - 10;
			// 			this.tblDataContainer.addChild(betTextObj[j]);
			// 		}
			//
			// 		betAmtObj[j] = new createjs.Text(this.formatNumber(this.betHistory[j].bet_money), 'bold 24px lato-regular', '#231f20');
			// 		betAmtObj[j].x = tblHeaderBg.x + 370;
			// 		betAmtObj[j].y = (tblHeaderBg.y + 45) + (j * 40);
			// 		betAmtObj[j].textAlign = 'right';
			// 		this.tblDataContainer.addChild(betAmtObj[j]);
			//
			// 		if (this.betHistory[j].win_money == 0) {
			// 			winLoseColor = '#c63837';
			// 			// winLoseAmt = this.betHistory[j].win_money - this.betHistory[j].bet_money;
			// 		}
			// 		else {
			// 			winLoseColor = '#067610';
			// 			// winLoseAmt = this.betHistory[j].win_money + this.betHistory[j].bet_money;
			// 		}
			//
			// 		winLoseObj[j] = new createjs.Text(this.formatNumber(this.betHistory[j].win_money), 'bold 24px lato-regular', winLoseColor);
			// 		winLoseObj[j].x = tblHeaderBg.x + 570;
			// 		winLoseObj[j].y = (tblHeaderBg.y + 45) + (j * 40);
			// 		winLoseObj[j].textAlign = 'right';
			// 		this.tblDataContainer.addChild(winLoseObj[j]);
			//
			// 		totalBetAmt += this.betHistory[j].bet_money;
			// 		totalWinLoseAmt += this.betHistory[j].win_money;
			// 	} //end for loop
			//
			// 	let totalBetObj = new createjs.Text(this.formatNumber(totalBetAmt), 'bold 24px lato-regular', '#242021');
			// 	totalBetObj.x = tblHeaderBg.x + 370;
			// 	totalBetObj.y = (tblHeaderBg.y + tableHeight) + 5;
			// 	totalBetObj.textAlign = 'right';
			// 	this.tblDataContainer.addChild(totalBetObj);
			//
			// 	if (totalWinLoseAmt > 0) {
			// 		winLoseColor = '#2067cf';
			// 	}
			// 	else {
			// 		winLoseColor = '#c83838';
			// 	}
			//
			// 	let totalWinLoseObj = new createjs.Text(this.formatNumber(totalWinLoseAmt), 'bold 24px lato-regular', winLoseColor);
			// 	totalWinLoseObj.x = tblHeaderBg.x + 570;
			// 	totalWinLoseObj.y = (tblHeaderBg.y + tableHeight) + 5;
			// 	totalWinLoseObj.textAlign = 'right';
			// 	this.tblDataContainer.addChild(totalWinLoseObj);
			//
			// 	//Card result bg
			// 	let resultCardConLeft = new createjs.Shape();
			// 	resultCardConLeft.graphics.beginFill("#c9c9c9").drawRoundRect(0, 0, 135, 135, 3);
			// 	resultCardConLeft.x = detailResultCon.x - 160;
			// 	resultCardConLeft.y = detailResultCon.y + 90;
			// 	this.cardsContainer.addChild(resultCardConLeft);
			//
			// 	let resultCardConRight = new createjs.Shape();
			// 	resultCardConRight.graphics.beginFill("#c9c9c9").drawRoundRect(0, 0, 135, 135, 3);
			// 	resultCardConRight.x = detailResultCon.x + 20;
			// 	resultCardConRight.y = detailResultCon.y + 90;
			// 	this.cardsContainer.addChild(resultCardConRight);
			//
			// 	//Card result circle
			// 	let leftResultCircle = new createjs.Shape();
			// 	leftResultCircle.graphics.beginFill('#1976d3').drawCircle(0, 0, 25);
			// 	leftResultCircle.x = resultCardConLeft.x;
			// 	leftResultCircle.y = resultCardConLeft.y + 65;
			// 	this.cardsContainer.addChild(leftResultCircle);
			//
			// 	let rightResultCircle = new createjs.Shape();
			// 	rightResultCircle.graphics.beginFill('#b71b1c').drawCircle(0, 0, 25);
			// 	rightResultCircle.x = resultCardConRight.x + 135;
			// 	rightResultCircle.y = resultCardConRight.y + 65;
			// 	this.cardsContainer.addChild(rightResultCircle);
			//
			// 	//Cards
			// 	let resultCardLeft = createCardSprite(this, 74, 99, 'cards_sprite');
			// 	resultCardLeft.x = resultCardConLeft.x + 50;
			// 	resultCardLeft.y = resultCardConLeft.y + 15;
			// 	resultCardLeft.gotoAndStop('C'+this.gameInfo.dragon);
			// 	this.cardsContainer.addChild(resultCardLeft);
			//
			// 	let resultCardRight = createCardSprite(this, 74, 99, 'cards_sprite');
			// 	resultCardRight.x = resultCardConRight.x + 10;
			// 	resultCardRight.y = resultCardConRight.y + 15;
			// 	resultCardRight.gotoAndStop('C'+this.gameInfo.tiger);
			// 	this.cardsContainer.addChild(resultCardRight);
			//
			// 	//Card Values
			// 	let valDragon = cardValue(this.gameInfo.dragon)
			// 	let resultValueLeft = new createjs.Text(valDragon.value, 'bold 30px lato-regular', '#fff');
			// 	resultValueLeft.x = leftResultCircle.x;
			// 	resultValueLeft.y = leftResultCircle.y - 21;
			// 	resultValueLeft.textAlign = 'center';
			// 	this.cardsContainer.addChild(resultValueLeft);
			//
			// 	let valTiger = cardValue(this.gameInfo.tiger)
			// 	let resultValueRight = new createjs.Text(valTiger.value, 'bold 30px lato-regular', '#fff');
			// 	resultValueRight.x = rightResultCircle.x;
			// 	resultValueRight.y = rightResultCircle.y - 21;
			// 	resultValueRight.textAlign = 'center';
			// 	this.cardsContainer.addChild(resultValueRight);
			//
			// 	let containerHeight = (betCount + 1)  * (40 * 1.2);
			// 	this.resultContainer.setBounds(0, 0, tblWidth, containerHeight);
			// 	let scrollprop = this.scrollable(this.betDetails, this.resultContainer, 873, 458, true);
			// 	this.betDetails.addChild(scrollprop.toTop_btn);
			//
			// });
			//
			// this.betDetails.scaleX = this.betDetails.scaleY = 0.7;
			// this.betDetails.x = (mWidth / 2) - ( mdlDetailWidth * 0.7) / 2 - 50;
			// this.betDetails.y = -20;

			return this.betDetails;
		},

		scrollable(page, content, width, height, is_mobile) {
			let content_bounds = content.getBounds();

			if(width) {
				this._modalWidth = width;
			}
			if(height) {
				this._modalHeight = height;
			}

			let view = new createjs.Shape();
			view.graphics.beginFill("#fff").setStrokeStyle(0.1).drawRect(0, 0, this._modalWidth - 22.5, this._modalHeight - 120);
			view.setBounds(0, 0, this._modalWidth - 22.5, this._modalHeight - 120);
			view.alpha = 0;
			view.x = content.x;
			view.y = content.y;
			view.hitArea = new createjs.Shape();
			view.hitArea.graphics.beginFill("#fff").drawRect(0, 0, this._modalWidth, this._modalHeight);

			content.mask = view;
			// content.hitArea = new createjs.Shape();
			// content.hitArea.graphics.beginFill("#fff").drawRect(0, 0, this._modalWidth, this._modalHeight);
			// page.hitArea = new createjs.Shape();
			// page.hitArea.graphics.beginFill("#fff").drawRect(0, 0, this._modalWidth, this._modalHeight);


			page.addChildAt(view, 0);

			let view_bounds = view.getBounds();
			let curYPos = 0;
			let curDown = false;
			let top = view.y;
			let bottom = view.y - (content_bounds.height - view_bounds.height);
			let scrollbg;
			let scrollbar;
			let scroll_bottom = view.y + view_bounds.height - ((view_bounds.height / content_bounds.height) * view_bounds.height);
			let toTop_btn;
			let trigg;
			let direction;

			// page.addChild(view);



			if(content_bounds.height > view_bounds.height) {
				scrollbg = new createjs.Shape();
				scrollbg.graphics.beginStroke("#a7a7a7").setStrokeStyle(2, "square")
				.moveTo(view.x + view_bounds.width - 2.5, view.y + 2.5)
				.lineTo(view.x + view_bounds.width - 2.5, view.y + view_bounds.height - 2.5);
				page.addChild(scrollbg);

				scrollbar = new createjs.Shape();
				scrollbar.graphics.beginStroke("#a7a7a7").setStrokeStyle(10, "round")
				.moveTo(view.x + view_bounds.width - 2.5, view.y + 2.5)
				.lineTo(view.x + view_bounds.width - 2.5, view.y + ((view_bounds.height / content_bounds.height) * view_bounds.height) - 2.5);
				scrollbar.regY = view.y;
				page.addChild(scrollbar);

				toTop_btn = new createjs.Shape();
				toTop_btn.graphics.beginFill("#ff9a28").drawCircle(0, 0, 15)
				.beginFill().beginStroke("#fff").setStrokeStyle(3, "round", "round")
				.moveTo(-5, 2.5).lineTo(0, -2.5).lineTo(5, 2.5);
				toTop_btn.alpha = 0.5;
				toTop_btn.visible = false;
				toTop_btn.x = view.x + view_bounds.width - 40;
				toTop_btn.y = view.y + view_bounds.height - 40;


				content.y = top;
				scrollbar.y = top;

				trigg = scrollbar;
				direction = 1;
				if(is_mobile) {
					trigg = page;
					direction = -1;
				}

				trigg.addEventListener("mousedown", (e) => {
					curDown = true; curYPos = e.stageY;
					if(is_mobile) scrollbar.alpha = 0.6;
				});
				trigg.addEventListener("pressup", (e) => {
					curDown = false;
					if(is_mobile) scrollbar.alpha = 1;
				});
				trigg.addEventListener("pressmove", (e) => {
					if(curDown && content.y <= top && content.y >= bottom){
						if(e.stageY < curYPos) {
							content.y += Math.abs(e.stageY - curYPos) * (content_bounds.height / view_bounds.height) * direction;
							scrollbar.y -= Math.abs(e.stageY - curYPos) * direction;
						}
						else
						{
							content.y -= Math.abs(e.stageY - curYPos) * (content_bounds.height / view_bounds.height) * direction;
							scrollbar.y += Math.abs(e.stageY - curYPos) * direction;
						}
					} // end if
					if (content.y > top)      { content.y = top;      }
					if (content.y < bottom)   { content.y = bottom;   }
					if (scrollbar.y < top) { scrollbar.y = top;    }
					if (scrollbar.y > scroll_bottom)    { scrollbar.y = scroll_bottom; }

					if (content.y >= top - 100) {
						toTop_btn.visible = false;
					}
					else {
						toTop_btn.visible = true;
					}
					curYPos = e.stageY;
				});
				if(!is_mobile) {
					trigg.addEventListener("mouseover", changeOpacity);
					trigg.addEventListener("mouseout", changeOpacity);
					page.addEventListener("mouseover", toggleWheelListener);
					page.addEventListener("mouseout", toggleWheelListener);
					toTop_btn.addEventListener("rollover", changeOpacity);
					toTop_btn.addEventListener("rollout", changeOpacity);
				}

				toTop_btn.addEventListener("click", (e) => {
					createjs.Tween.get(content).to({
						y: top
					}, 300);
					createjs.Tween.get(scrollbar).to({
						y: top
					}, 300);
					toTop_btn.visible = false;
				});

			} // end if(content_bounds.height > view_bounds.height)

			function changeOpacity(e) {
				if(e.type == "mouseover")     { e.target.alpha = 0.6;   }
				else if(e.type == "mouseout") { e.target.alpha = 1; }
			}
			function toggleWheelListener(e) {
				if(e.type == "mouseover")     { window.addEventListener("wheel", scroller);     }
				else if(e.type == "mouseout") {  window.removeEventListener("wheel", scroller); }
			}

			function scroller(e) {
				if(content.y <= top && content.y >= bottom){
					content.y -= Math.floor(e.deltaY / 4) * (content_bounds.height / view_bounds.height);
					scrollbar.y += Math.floor(e.deltaY / 4);

				}
				if (content.y > top)      { content.y = top;      }
				if (content.y < bottom)   { content.y = bottom;   }
				if (scrollbar.y < top) { scrollbar.y = top;    }
				if (scrollbar.y > scroll_bottom)    { scrollbar.y = scroll_bottom; }

				if (content.y >= top - 100) {
					toTop_btn.visible = false;
				}
				else {
					toTop_btn.visible = true;
				}
			} // end function scroller

			return {
				"page": page,
				"trigg": trigg,
				"top": top,
				"bottom": bottom,
				"scrollbar": scrollbar,
				"scrollbg": scrollbg,
				"scroll_bottom": scroll_bottom,
				"view": view,
				"toTop_btn": toTop_btn,
				"changeOpacity": changeOpacity,
				"toggleWheelListener": toggleWheelListener,
				"scroller": scroller,
			}

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
