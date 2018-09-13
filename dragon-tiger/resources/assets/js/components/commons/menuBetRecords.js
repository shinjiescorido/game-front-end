/**
 * betRecords.js
 * @author Kevin Villanueva
 * @since 2017.06.15
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 * Handles all bet records menu functionalities
**/

import {createSprite, randomNum, createCardSprite, numberCounter, playSound, setCurrentTimezone, numberWithCommas } from '../../factories/factories';
import cardValue from '../../factories/cards';

let instance = null;
let pageDisplay = 0;

export default(links) => {
	instance = instance || new blu.Component({
		main() {
			this.timezoneOffset = -(new Date().getTimezoneOffset() / 60);
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
			switch(type) {
				case ('betlogs'):
					this.getLogsLink = window.junket == '2' ? '/getJunketLogs' : links.getBetLogs;
					let playType = 'p';
					let userId = window.junket == '2' ? $('.modal-con--betlogs').attr('user') : window.userId;
					let roomId = window.junket == '2' ? window.vendorData.roomId : '';

					$.post(this.getLogsLink, {tableId: window.tableNum, betPage: 1, gameType: 'L', roundNum: 0, playType: playType, userId: userId, roomId: roomId}, (response) => {
						this._betLogs = response;
						this._betLogs.currentPage = 1;
						this.displayBetLogs();
					});
					break;
			} //end switch
		},

		displayBetLogs() {
			let self = this;
			let body_con = $('#tblBodyBetlogs').empty();
			let page_num_con = $('#tblFooterBetlogs').empty();
			let data = this._betLogs;
			let max = data.length ? data[0].cnt : 1;
			let totalPage = Math.ceil(parseInt(max) / 11);
			let pageData = data;
			let link = `${this.getLogsLink}?page=`;

			if(pageData.length == 0) {
				$('.modal-body-nodata').show();
				$('.modal-body-betlogs').hide();
			} else {
				$('.modal-body-nodata').hide();
				$('.modal-body-betlogs').show();
			}

			for (let i = 0; i < pageData.length; i++) {
				let tiles = JSON.parse(pageData[i].game_info) || {};
				let result = JSON.parse(pageData[i].game_result) || {};
				let isVoid = _.isEmpty(result) || _.isEmpty(tiles);
				let newDate = setCurrentTimezone(pageData[i].updated_at) || '';
				let winClass = parseInt(pageData[i].total_win) > 0 ? 'tbl-win-text' : 'tbl-lose-text';
				if (pageData[i].total_win == 0) winClass = '';

				pageData[i].total_bet = window.casino == 'SS' ? pageData[i].total_bet.toFixed(2) : pageData[i].total_bet;
				pageData[i].total_win = window.casino == 'SS' ? pageData[i].total_win.toFixed(2) : pageData[i].total_win;

				let listVoid = '';
				let listTotalBet = `<span>${numberWithCommas(pageData[i].total_bet)}</span>`;
				let listWinLose = `<span>${numberWithCommas(pageData[i].total_win)}</span>`;
				if (pageData[i].status.toLowerCase() == 'w') {
					listVoid = 'void';
					listTotalBet = `<span class="void-text">${window.language2.com_sub_menuarea_gamevoid}</span>`;
					listWinLose = `<span class="gamevoid-ico"></span>`;
				}

				if (window.junket == 2) {
					body_con.append(
						$(`<div class="tbl-body-tr -data-list-${i} ${listVoid}">`)
							.append($(`<div class="tbl-td-list -list_gameno"><span>${pageData[i].round_num}</span></div>`))
							.append($(`<div class="tbl-td-list -list_date"><span>${newDate.length ? newDate.replace(" ", "<br/>") : newDate}</span></div>`))
							.append($(`<div class="tbl-td-list -list_channel"><span>${pageData[i].table_id}</span></div>`))
							.append($(`<div class="tbl-td-list -list_dealer"><span>${pageData[i].dealer_name}</span></div>`))
							.append($(`<div class="tbl-td-list -list_dealer"><span>${pageData[i].currency}</span></div>`))
							.append($(`<div class="tbl-td-list -list_totalbet tbl-align-right">${listTotalBet}</div>`))
							.append($(`<div class="tbl-td-list -list_winlose tbl-align-right ${winClass}">${listWinLose}</div>`))
						.append($('</div>'))
						)

					$('.-list_date').css({width: '120px'});
					$('.-list_channel').css({width: '105px'});
					$('.-list_dealer').css({width: '95px'});
					$('.-list_totalbet').css({width: '115px'});
				} else {
					body_con.append(
						$(`<div class="tbl-body-tr -data-list-${i} ${listVoid}">`)
							.append($(`<div class="tbl-td-list -list_gameno"><span>${pageData[i].round_num}</span></div>`))
							.append($(`<div class="tbl-td-list -list_date"><span>${newDate.length ? newDate.replace(" ", "<br/>") : newDate}</span></div>`))
							.append($(`<div class="tbl-td-list -list_channel"><span>${pageData[i].table_id}</span></div>`))
							.append($(`<div class="tbl-td-list -list_dealer"><span>${pageData[i].dealer_name}</span></div>`))
							.append($(`<div class="tbl-td-list -list_totalbet tbl-align-right">${listTotalBet}</div>`))
							.append($(`<div class="tbl-td-list -list_winlose tbl-align-right ${winClass}">${listWinLose}</div>`))
						.append($('</div>'))
						)
				}

				$(`.-data-list-${i}`).data('log', pageData[i]);
				$(`.-data-list-${i}`).click(function(e) {
					let _this = $(e.currentTarget);
					if(!_this.hasClass('void')) {
						self.showBetlogData(_this.data('log'));
					}
				});
			}

			for (let j = 0; j < totalPage; j++) {
				let page = j+1;
				let pageDom = $(`.paginate-page_${page}`);
				if (!pageDom.length) {
					let page_btn = $(`<div class="modal-page-list paginate-page_${page}">${page}</div>`);
					page_btn.attr('data-page', page);
					page_num_con.append(page_btn);
					$('.page-ico').show();

					// if (page > 99) {
					// 	page_btn.css({ 'font-size': '13px' });
					// } else if (page > 999) {
					// 	page_btn.css({ 'font-size': '10px' });
					// }

	        //to append dotdot
	        if(page==1 && totalPage > 10) {
	          page_num_con.prepend(`<div class="modal-page-list -dot-before page-dot" data-page=''>. . .</div>`)
	        }
	        if(page == totalPage && totalPage > 10) {
	          page_num_con.append(`<div class="modal-page-list -dot-after page-dot" data-page=''>. . .</div>`)
	        }
	        //end append dotdot
	        if(self._betLogs.currentPage > 10) {
	          $('.modal-page-list.-dot-before').show()
	        } else {
	          pageDisplay = 0;
	        }

	        if(self._betLogs.currentPage <= (pageDisplay-10) && self._betLogs.currentPage > 10) {
	          pageDisplay = ((Math.floor(self._betLogs.currentPage/10))*10)
	        }

	        if(totalPage > 11) {
	          if(pageDisplay < totalPage) {
	            $('.modal-page-list.-dot-after').show()
	          } else {
	            $('.modal-page-list.-dot-after').hide()
	          }
	        }

	        if(page < 11 && self._betLogs.currentPage < 11) {
	          $(page_btn).show()
	        } else {
	          $(page_btn).hide()
	          if(page > 10 && self._betLogs.currentPage > 10) {
	            let total = (self._betLogs.currentPage/10)%1;

	            if(parseFloat((self._betLogs.currentPage/10)%1).toFixed(1) == 0.1 && self._betLogs.currentPage < totalPage) {
	              pageDisplay = self._betLogs.currentPage+9;
	            }

	            if(page >= (pageDisplay-9) && page <= pageDisplay) {
	              $(page_btn).show()
	            }
	          }
	        }

	        let dot_after = 0;
	        let dot_before = 0;

	        if(pageDisplay > 19) {
	          dot_after = pageDisplay + 1;
	          dot_before = pageDisplay - 10;
	        } else {
	          dot_after = 11;
	          dot_before = 0;
	        }

	        $('.modal-page-list.-dot-after').attr('data-page', dot_after)
	        $('.modal-page-list.-dot-before').attr('data-page', dot_before)

	        $(document).off("click",'.modal-page-list.page-dot');
	        $(document).on("click",'.modal-page-list.page-dot' ,function(e){
	          self._betLogs.currentPage = parseInt($(e.currentTarget).attr('data-page'));
	          self.displayPage(`${link}?page=${parseInt($(e.currentTarget).attr('data-page'))}`, 'betlog');
	        });

					page_btn.on('click', function (e){
						$('.page-active').removeClass('page-active');
						$(e.currentTarget).addClass('page-active');
						self._betLogs.currentPage = parseInt($(e.currentTarget).attr('data-page'));
						self.displayPage(`${link}${parseInt($(e.currentTarget).attr('data-page'))}`, 'betlog');
					});
				}
			}

			$('.page-active').removeClass('page-active');
			$(`.paginate-page_${this._betLogs.currentPage}`).addClass('page-active');

			$("#prevPageBetlogs").unbind('click');
			$('#prevPageBetlogs').click(function(e) {
				if(self._betLogs.currentPage-1 > 0) {
					self._betLogs.currentPage -= 1;
					self.displayPage(link + self._betLogs.currentPage, 'betlog');
				}
			});

			$("#nextPageBetlogs").unbind('click');
			$('#nextPageBetlogs').click(function(e) {
				if(self._betLogs.currentPage+1 <= totalPage) {
					self._betLogs.currentPage += 1;
					self.displayPage(link + self._betLogs.currentPage, 'betlog');
				}
			});
		},

		displayPage (link, type) {
			let self = this;
			let data = {tableId: window.tableNum};

			if(type == 'betlog') {
				let playType = 'p';
				data = {
					tableId: window.tableNum,
					betPage: this._betLogs.currentPage,
					gameType: 'L',
					roundNum: 0,
					playType: playType,
					userId: window.junket == '2' ? $('.modal-con--betlogs').attr('user') : window.userId
				}
			}

			$.post(link, data, (response) => {
				let responseData = typeof response === 'string' ? JSON.parse(response) :response;
				self.displayCallback(type, responseData);
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

		displayCallback (type, newdata) {
			switch(type) {
				case 'betlog' :
					newdata.currentPage = this._betLogs.currentPage;
					this._betLogs = newdata;
					this.displayBetLogs();
					break;
			}
		},

		showBetlogData(betData) {
			let playType = 'p';
			let userId = window.junket =='2' ? $('.modal-con--betlogs').attr('user') : window.userId;
			let roomId = window.junket == '2' ? window.vendorData.roomId : '';

			$.post(this.getLogsLink, {roundNum: betData.round_num, tableId: window.tableNum, page: 0, gameType: 'D', playType: playType, userId: userId, roomId: roomId}, (response) => {
				let betlog = response.length ? response[0] : {};
				if (!_.isEmpty(betlog)) {
					let con = $('#modalResult').show();
					let gameInfo = JSON.parse(betData.game_info) || {};
					let result = JSON.parse(betData.game_result) || {};
					let isVoid = _.isEmpty(result) || _.isEmpty(gameInfo);
					let betHistory = JSON.parse(betlog.bet_history);
					let newDate = setCurrentTimezone(betlog.updated_at);

					$('.header-list-left').text(`${window.language2.com_sub_menuarea_game} ${betlog.round_num}`).append(`<br/>${betlog.dealer_name}`);
					$('.header-list-right').text(`${newDate.split(" ")[0]}`).append(`<br/>${newDate.split(" ")[1]}`);
					$('.header-result-con').empty();

					let winColor = '#fff';
					let winResultColor = '#1565c0'
					let bordercolor = '#d6bb69';
					let winText = result.winner;
					let resultType = '';
					let resultTypeInitials = winText == 'dragon' ? 'D' : 'T';

					switch (winText) {
						case 'dragon':
							resultType = window.language2.dragontiger_betlayout_dragon;
							winResultColor = '#1565c0';
							bordercolor = '#1565c0';
							break;
						case 'tiger':
							resultType = window.language2.dragontiger_betlayout_tiger;
							winResultColor = '#d32f2f';
							bordercolor = '#d32f2f';
							break;
						case 'tie':
							resultType = window.language2.dragontiger_betlayout_tie;
							winResultColor = '#689f38';
							bordercolor = '#689f38';
							break;
						case 'suited tie':
							resultType = window.language2.dragontiger_betlayout_suitedtie;
							winResultColor = '#689f38';
							bordercolor = '#d6bb69';
							break;
						default:

					}


					$('.header-result-con').css({'background': winResultColor })
					.append( $('<div class="result-list"></div>')
					.append(
						$(`<div class="center-content">
								<div class="result-mark" style="background: ${winColor}; color: ${winResultColor}; border: 2px solid ${bordercolor};">
									<span style="color: ${winResultColor};">${resultTypeInitials}</span>
								</div>
							</div>`)
					)
					.append( $(`<div class="result-text" style="color: ${winColor}">${resultType}</div>`) )
					)

					$('.result-main-con').empty();
					$('.result-banker-con').empty();
					//
					// let cardsData = [
					// 	{value: 0,},
					// 	{value: 1,},
					// 	{value: 2, },
					// 	{value: 3, },
					// 	{value: 4, },
					// 	{value: 5, },
					// 	{value: 6, },
					// 	{value: 7, },
					// 	{value: 8, },
					// 	{value: 5, },
					// ]


					let dragonValue = cardValue(gameInfo.dragon).value;
					let tigerValue = cardValue(gameInfo.tiger).value;
					let dragonCard = gameInfo.dragon;
					let tigerCard = gameInfo.tiger;
					// let dragon_posx = -(dragonCard * 51);
					// let tiger_posx = -(tigerCard * 51);
					// let dragon_posy = 0;
					// let tiger_posy = 0;
					let dragon_margin = 0;
					let tiger_margin = 0;

					let count = 0;
					var posResult = {}

					if (dragonValue == 1 || dragonValue > 9 && dragonValue < 20) {
						dragon_margin = -4;
					} else {
						dragon_margin = 0;
					}

					if (tigerValue == 1 || tigerValue > 9 && tigerValue < 20) {
						tiger_margin = -4;
					} else {
						tiger_margin = 0;
					}

					$('.result-main-con').append(
						`<div class="result-info">
								<div class="result-info-items -dragon">
									<div class="result-card-num"><span style="margin-left:${dragon_margin}px;">${dragonValue}</span></div>
									<span class="card-holder card-${dragonCard}"></span>
								</div>
								<div class="result-info-items -tiger">
									<div class="result-card-num"><span style="margin-left:${tiger_margin}px">${tigerValue}</span></div>
									<span class="card-holder card-${tigerCard}"></span>
								</div>
						</div>`
					);

					let table_con = con.find('.result-table-body').empty();
					let betTblHeight = (betHistory.length + 1) * 30;
					let totalWin = 0;
					$('.result-table-body').css('height', `${betTblHeight+20}px`);

					for (let i = 0;i < betHistory.length; i++) {
						let rowData = betHistory[i];
						let winLoseAmt = rowData.win_money - rowData.bet_money;

						if (window.junket == 2) {
							winLoseAmt = winLoseAmt * (-1);
						}
						
						totalWin += winLoseAmt;

						rowData.bet_money = window.casino == 'SS' ? parseFloat(rowData.bet_money).toFixed(2) : rowData.bet_money;
						winLoseAmt = window.casino == 'SS' ? parseFloat(winLoseAmt).toFixed(2) : winLoseAmt;

						table_con.append(
							$('<div class="result-tr"></div>')
								.append($('<div class="result-td"></div>').text( `${rowData.bet}` ))
								.append($('<div class="result-td"></div>').text( numberWithCommas(rowData.bet_money) ))
								.append($('<div class="result-td"></div>').addClass(winLoseAmt > 0 ? 'tbl-win-text' : 'tbl-lose-text').text(numberWithCommas(winLoseAmt)))
						);
					}

					let totalWinClass = totalWin > 0 ? 'tbl-win-text' : 'tbl-lose-text';
					if (totalWin == 0) totalWinClass = '';

					totalWin = window.casino == 'SS' ? totalWin.toFixed(2) : totalWin;

					table_con.append(
						$('<div class="result-tr"></div>')
							.append($('<div class="result-td"></div>').text(window.language2.com_sub_menuarea_total))
							.append($('<div class="result-td"></div>').addClass('total--bet').text( numberWithCommas(betData.total_bet) ))
							.append($('<div class="result-td"></div>').addClass('total--payout').addClass(totalWinClass).text( numberWithCommas(totalWin) ))
					);
				}
			})
		}
	});

	return instance;
}
