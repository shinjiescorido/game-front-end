/**
 * betRecords.js
 * @author Kevin Villanueva
 * @since 2017.06.15
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 * Handles all bet records menu functionalities
**/

import {createSprite, randomNum, createCardSprite, numberCounter, playSound, setCurrentTimezone, numberWithCommas } from '../../../factories/factories';
import cardValue from '../../../factories/cards';
import baccaratTotal from '../../../factories/baccaratTotal';

let instance = null;
let pageDisplay = 0;
export default(links) => {
  instance = instance || new blu.Component({
    count : window.innerHeight > window.innerWidth ? 12 : 6,
    main() {
      this.timezoneOffset = -(new Date().getTimezoneOffset() / 60);
		},
		changeTheme(new_theme) {
	
		},
		initRecords(type) {
      switch(type) {
        case ('betlogs'):
        	this.getLogsLink = window.junket == '2' ? '/getJunketLogs' : links.getBetLogs;
					let playType = 'p';
					let userId = 3035;//window.junket == '2' ? $('.modal-con--betlogs').attr('user') : window.userId;
					let roomId = window.junket == '2' ? window.vendorData.roomId : '';

          let count = this.count;
					$.post(this.getLogsLink, {tableId: window.tableNum, betPage: 1, gameType: 'L', roundNum: 0, playType: playType, userId: userId, roomId: roomId, count : count}, (response) => {
						this._betLogs = response;
						this._betLogs.currentPage = 1;
						this.displayBetLogs();
					});
        break;
        } //end switch
		},

		displayBetLogs() {
      let portrait = true;
      if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
        portrait = true;
      } else {
        portrait = false;
      }

      let self = this;
      let body_con = $('.betloglist-table__body .betloglist-table.-tablebody').empty();
      let page_num_con = $('#paginationBetlogs').empty();
      let data = this._betLogs;
      let max = data.length ? data[0].cnt : 1;
      let totalPage = Math.ceil(parseInt(max) / this.count);
      let pageData = data;
      let link = `${this.getLogsLink}?page=`;

      if(pageData.length == 0) {
        $('.betlog-nodata').show();
        $('.betloglist-table-con').hide();
      } else {
        $('.betlog-nodata').hide();
        $('.betloglist-table-con').show();
      }

      for (let i = 0; i < pageData.length; i++) {
        let tiles = JSON.parse(pageData[i].game_info) || {};
        let result = JSON.parse(pageData[i].game_result) || {};
        let isVoid = _.isEmpty(result) || _.isEmpty(tiles);
        let newDate = setCurrentTimezone(pageData[i].updated_at) || '';
        let winClass = parseInt(pageData[i].total_win) > 0 ? '-wintext' : '-losetext';
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
        if(portrait) {
          $('.betloglist-table.-tablehead.-portrait').css({'display' : 'table'})
          $('.betloglist-table.-tablehead.-landscape').css({'display' : 'none'})
          body_con.append(
            $(`<div class="betloglist-tr -data-list-${i} ${listVoid}">`)
            .append($(`<div class="betloglist-td -gamenum"><span>${pageData[i].round_num}</span></div>`))
            .append($(`<div class="betloglist-td -date"><span>${newDate.length ? newDate.replace(" ", "<br/>") : newDate}</span></div>`))
            .append($(`<div class="betloglist-td -totalbet">${listTotalBet}</div>`))
            .append($(`<div class="betloglist-td -winlose ${winClass}">${listWinLose}</div>`))
            .append($('</div>'))
            )
        } else {
          $('.betloglist-table.-tablehead.-portrait').css({'display' : 'none'})
          $('.betloglist-table.-tablehead.-landscape').css({'display' : 'table'})
          body_con.append(
            $(`<div class="betloglist-tr -data-list-${i} ${listVoid}">`)
            .append($(`<div class="betloglist-td -gamenum"><span>${pageData[i].round_num}</span></div>`))
            .append($(`<div class="betloglist-td -date"><span>${newDate.length ? newDate.replace(" ", "<br/>") : newDate}</span></div>`))
            .append($(`<div class="betloglist-td -channel"><span>${pageData[i].table_id}</span></div>`))
            .append($(`<div class="betloglist-td -dealer"><span>${pageData[i].dealer_name}</span></div>`))
            .append($(`<div class="betloglist-td -totalbet">${listTotalBet}</div>`))
            .append($(`<div class="betloglist-td -winlose ${winClass}">${listWinLose}</div>`))
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
          let page_btn = $(`<span class="modal-page-list paginate-page_${page}">${page}</span>`);
          page_btn.attr('data-page', page);
          page_num_con.append(page_btn);

          // if (page > 99) {
          //   page_btn.css({ 'font-size': '13px' });
          // } else if (page > 999) {
          //   page_btn.css({ 'font-size': '10px' });
          // }

          //to append dotdot

          if(page==1 && totalPage > 10) {
            page_num_con.prepend(`<span class="modal-page-list -dot-before page-dot" data-page=''>. . .</span>`)
          }
          if(page == totalPage && totalPage > 10) {
            page_num_con.append(`<span class="modal-page-list -dot-after page-dot" data-page=''>. . .</span>`)
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
          // if((self._betLogs.currentPage/10)%1 == 0.1 && totalPage > 10) {
          //   $('.modal-page-list.-dot-before').show()
          // }
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

          $('.page-ico').css({'display' : 'inline-block'});

          page_btn.on('click', function (e){
            $('.page-active').removeClass('page-active');
            $(e.currentTarget).addClass('page-active');
            self._betLogs.currentPage = parseInt($(e.currentTarget).attr('data-page'));
            self.displayPage(`${link}${parseInt($(e.currentTarget).attr('data-page'))}`, 'betlog');
          });

          $(document).off("click",'.modal-page-list.page-dot');
          $(document).on("click",'.modal-page-list.page-dot' ,function(e){
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
          userId: window.junket == '2' ? $('.modal-con--betlogs').attr('user') : window.userId,
          count : this.count
        }
      }

      $.post(link, data, (response) => {
        let responseData = typeof response === 'string' ? JSON.parse(response) :response;
        self.displayCallback(type, responseData);
      });
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
        this._histBtnPagination[x].graphics.beginStroke(this.context.theme_color[window.theme].btn_pagination_border).setStrokeStyle(1).beginFill(this.context.theme_color[window.theme].btn_pagination).drawRect(0, 0, 40, 40);
        this._histBtnPagination[x].x = (this._modalWidth / 2) + 15 + ((x - (paginateCount / 2)) * 70);
        this._histBtnPagination[x].y = this._modalBg.y + 470;
        this._histBtnPagination[x].cursor = 'pointer';
        this._histBtnPagination[x].pageNum = lowTenthNum + (x + 1);
        container.addChild(this._histBtnPagination[x]);

        this._histPaginationNum[x] = new createjs.Text(lowTenthNum + (x + 1), 'normal 24px bebas-regular', this.context.theme_color[window.theme].pagination_num);
        this._histPaginationNum[x].x = this._histBtnPagination[x].x + 19;
        this._histPaginationNum[x].y = this._histBtnPagination[x].y + 7;
        this._histPaginationNum[x].textAlign = 'center';
        container.addChild(this._histPaginationNum[x]);

        this._histBtnPaginationHit[x] = new createjs.Shape();
        this._histBtnPaginationHit[x].graphics.beginFill(this.context.theme_color[window.theme].btn_pagination).drawRect(0, 0, 40, 40);
        this._histBtnPaginationHit[x].x = (this._modalWidth / 2) + 15 + ((x - (paginateCount / 2)) * 70);
        this._histBtnPaginationHit[x].y = this._modalBg.y + 470;
        this._histBtnPaginationHit[x].cursor = 'pointer';
        this._histBtnPaginationHit[x].pageNum = lowTenthNum + (x + 1);
        this._histBtnPaginationHit[x].alpha = 0.01;
        container.addChild(this._histBtnPaginationHit[x]);


				//Determine active page
				if (currentArr == x) {
					this._histBtnPagination[x].graphics.clear().beginStroke(this.context.theme_color[window.theme].btn_pagination_border).setStrokeStyle(1).beginFill(this.context.theme_color[window.theme].btn_pagination_active).drawRect(0, 0, 40, 40);
					this._histPaginationNum[x].color = this.context.theme_color[window.theme].btn_pagination_active_num;
				}

				if (x == 0) {
					prevCoor = this._histBtnPagination[x].x - 70;
					prevCoor = this._histBtnPaginationHit[x].x - 70;
				}

				if (x == paginateCount - 1) {
					nextCoor = this._histBtnPagination[x].x + 70;
					nextCoor = this._histBtnPaginationHit[x].x + 70;
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
			prevPageBtn.graphics.beginStroke(this.context.theme_color[window.theme].btn_pagination_border).setStrokeStyle(1).beginFill(this.context.theme_color[window.theme].btn_pagination).drawRect(0, 0, 40, 40);
			prevPageBtn.x = prevCoor;
			prevPageBtn.y = this._modalBg.y + 470;
			prevPageBtn.cursor = 'pointer';
			prevPageBtn.pageNum = prevUrl;
			container.addChild(prevPageBtn);

			this._histPrevIcon = new createjs.Shape();
			this._histPrevIcon.graphics.beginStroke(this.context.theme_color[window.theme].pagination_num).setStrokeStyle(3, 'round').moveTo(17, 7).lineTo(12, 15).lineTo(17, 23);
			this._histPrevIcon.x = prevPageBtn.x + 5;
			this._histPrevIcon.y = prevPageBtn.y + 5;
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
      firstPageBtn.graphics.beginStroke(this.context.theme_color[window.theme].btn_pagination_border).setStrokeStyle(1).beginFill(this.context.theme_color[window.theme].btn_pagination).drawRect(0, 0, 40, 40);
      firstPageBtn.x = prevCoor - 50;
      firstPageBtn.y = this._modalBg.y + 470;
      firstPageBtn.cursor = 'pointer';
      firstPageBtn.pageNum = 1;
      container.addChild(firstPageBtn);

      this._histFirstIcon1 = new createjs.Shape();
      this._histFirstIcon1.graphics.beginStroke(this.context.theme_color[window.theme].pagination_num).setStrokeStyle(3, 'round').moveTo(20, 7).lineTo(15, 15).lineTo(20, 23);
      this._histFirstIcon1.x = firstPageBtn.x + 5;
      this._histFirstIcon1.y = firstPageBtn.y + 5;
      this._histFirstIcon1.hitArea = firstPageBtn;
      container.addChild(this._histFirstIcon1);

      this._histFirstIcon2 = new createjs.Shape();
      this._histFirstIcon2.graphics.beginStroke(this.context.theme_color[window.theme].pagination_num).setStrokeStyle(3, 'round').moveTo(14, 7).lineTo(9, 15).lineTo(14, 23);
      this._histFirstIcon2.x = firstPageBtn.x + 5;
      this._histFirstIcon2.y = firstPageBtn.y + 5;
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
			nextPageBtn.graphics.beginStroke(this.context.theme_color[window.theme].btn_pagination_border).setStrokeStyle(1).beginFill(this.context.theme_color[window.theme].btn_pagination).drawRect(0, 0, 40, 40);
			nextPageBtn.x = nextCoor;
			nextPageBtn.y = this._modalBg.y + 470;
			nextPageBtn.cursor = 'pointer';
			nextPageBtn.pageNum = nextUrl;
			container.addChild(nextPageBtn);

			this._nextIcon = new createjs.Shape();
			this._nextIcon.graphics.beginStroke(this.context.theme_color[window.theme].pagination_num).setStrokeStyle(3, 'round').moveTo(12, 7).lineTo(17, 15).lineTo(12, 23);
			this._nextIcon.x = nextPageBtn.x + 5;
			this._nextIcon.y = nextPageBtn.y + 5;
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
      lastPageBtn.graphics.beginStroke(this.context.theme_color[window.theme].btn_pagination_border).setStrokeStyle(1).beginFill(this.context.theme_color[window.theme].btn_pagination).drawRect(0, 0, 40, 40);
      lastPageBtn.x = nextCoor + 50;
      lastPageBtn.y = this._modalBg.y + 470;
      lastPageBtn.cursor = 'pointer';
      lastPageBtn.pageNum = lastPage;
      container.addChild(lastPageBtn);

      this._histLastIcon1 = new createjs.Shape();
      this._histLastIcon1.graphics.beginStroke(this.context.theme_color[window.theme].pagination_num).setStrokeStyle(3, 'round').moveTo(10, 7).lineTo(15, 15).lineTo(10, 23);
      this._histLastIcon1.x = lastPageBtn.x + 5;
      this._histLastIcon1.y = lastPageBtn.y + 5;
      this._histLastIcon1.hitArea = lastPageBtn;
      container.addChild(this._histLastIcon1);

      this._histLastIcon2 = new createjs.Shape();
      this._histLastIcon2.graphics.beginStroke(this.context.theme_color[window.theme].pagination_num).setStrokeStyle(3, 'round').moveTo(16, 7).lineTo(21, 15).lineTo(16, 23);
      this._histLastIcon2.x = lastPageBtn.x + 5;
      this._histLastIcon2.y = lastPageBtn.y + 5;
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
			let baseUrl = window.dt_domain+window.tableNum+'/'+range+'/'+multiplayer; // window.location.href

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
				pageUrl = baseUrl + '/' + type + '?page=' +pageNum;
			}

      $.get(pageUrl, {tableId: window.tableNum, mobile: true}, (response) => {
        if (type == 'transferlogs') {
         this._transferLogs = JSON.parse(response);
         this._transferLogsData.removeAllChildren();
					// this.displayTransferLogs();
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
					// this.displayGameHistory();

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

    displayCallback (type, newdata) {
      switch(type) {
        case 'betlog' :
          newdata.currentPage = this._betLogs.currentPage;
          this._betLogs = newdata;
          this.displayBetLogs();
          break;
      }
    },

    showBetlogData(betData) {let playType = 'p';
      let userId = 3035; //window.junket =='2' ? $('.modal-con--betlogs').attr('user') : window.userId;
      let roomId = window.junket == '2' ? window.vendorData.roomId : '';

      $.post(this.getLogsLink, {roundNum: betData.round_num, tableId: window.tableNum, page: 0, gameType: 'D', playType: playType, userId: userId, roomId: roomId}, (response) => {

        let betlog = response.length ? response[0] : {};

        if (!_.isEmpty(betlog)) {
          let con = $('.modal--betdetails').show();
          let gameInfo = JSON.parse(betData.game_info) || {};
          let result = JSON.parse(betData.game_result) || {};
          let isVoid = _.isEmpty(result) || _.isEmpty(gameInfo);
          let betHistory = JSON.parse(betlog.bet_history);
          let newDate = setCurrentTimezone(betlog.updated_at) || '';

          $('.betlog-result--roundnum').text(`${window.language2.com_sub_menuarea_game} ${betlog.round_num}`);
          $('.betlog-result--dealername').text(`${betlog.dealer_name}`);

          $('.betlog-result--date').text(`${newDate.split(" ")[0]}`);
          $('.betlog-result--time').text(`${newDate.split(" ")[1]}`);

          let winColor = '#fff';
          let winResultColor = '#1565c0'
          let bordercolor = '#d6bb69';
          let winText = result.winner;
          let resultType = '';
          let resultTypeInitials = winText == 'banker' ? 'B' : winText == 'player' ? 'P' : 'T';

          switch (winText) {
            case 'player':
              resultType = window.language2.baccarat_betlayout_player;
              winResultColor = '#1565c0';
              bordercolor = '#1565c0';
              break;
            case 'banker':
              resultType = window.language2.baccarat_betlayout_banker;
              winResultColor = '#d32f2f';
              bordercolor = '#d32f2f';
              break;
            case 'tie':
              resultType = window.language2.baccarat_betlayout_tie;
              winResultColor = '#689f38';
              bordercolor = '#689f38';
              break;
            default:
          }

          $('.betlog-result__items.-result').css({'background': winResultColor })
          $('.betlog-result__items.-result .betlog-result--inner').empty().append(`
            <span class="betlog-result--winres" style="background: ${winColor}; color: ${winResultColor}; border: 2px solid ${bordercolor}; color: ${winResultColor};">${resultTypeInitials}</span>
            <span class="betlog-result--winname">${resultType}</span>
          `);

          $('.betlog-result-con.betlog-card').empty();

          let banker1Card = gameInfo.banker1;
          let banker2Card = gameInfo.banker2;
          let banker3Card = gameInfo.banker3;

          let player1Card = gameInfo.player1;
          let player2Card = gameInfo.player2;
          let player3Card = gameInfo.player3;

          let totalVal = baccaratTotal(gameInfo);
          
          $('.betlog-result-con.betlog-card').append(
            `<div class="result-info">
                <div class="result-info-items -player">
                  <div class="result-card-num"><span style="margin-left:0px;">${totalVal.player}</span></div>
                  <span class="card-holder card-${player1Card}"></span>
                  <span class="card-holder card-${player2Card}"></span>
                  <span class="card-holder card-${player3Card}"></span>
                </div>
                <div class="result-info-items -banker">
                  <div class="result-card-num"><span style="margin-left:0px">${totalVal.banker}</span></div>
                  <span class="card-holder card-${banker1Card}"></span>
                  <span class="card-holder card-${banker2Card}"></span>
                  <span class="card-holder card-${banker3Card}"></span>
                </div>
            </div>`
          );

          // let dragonValue = cardValue(gameInfo.dragon).value;
          // let tigerValue = cardValue(gameInfo.tiger).value;
          // let dragonCard = gameInfo.dragon;
          // let tigerCard = gameInfo.tiger;
          // let paddingDragon = 0;
          // let paddingTiger = 0;

          // if(dragonValue == 1 || dragonValue > 9) {
          //   paddingDragon = 10;
          // }

          // if(tigerValue == 1 || tigerValue > 9) {
          //   paddingTiger = 10;
          // }

          // $('.betlog-result-con.betlog-card').append(`
          //   <div class="betlog-card__items -dragon">
          //     <span class="card-value" style="padding-right: ${paddingDragon}px">${dragonValue}</span>
          //     <span class="card-holder card-${dragonCard}"></span>
          //   </div>
          //   <div class="betlog-card__items -tiger">
          //     <span class="card-value" style="padding-right: ${paddingTiger}px">${tigerValue}</span>
          //     <span class="card-holder card-${tigerCard}"></span>
          //   </div>
          // `);

          let table_con = con.find('.betlog-table.tbl--body').empty();
          let betTblHeight = (betHistory.length + 1) * 44;
          let totalWin = 0;

          for (let i = 0;i < betHistory.length; i++) {
            let rowData = betHistory[i];
            let winLoseAmt = rowData.win_money - rowData.bet_money;
            totalWin += winLoseAmt;

            rowData.bet_money = window.casino == 'SS' ? parseFloat(rowData.bet_money).toFixed(2) : rowData.bet_money;
            winLoseAmt = window.casino == 'SS' ? parseFloat(winLoseAmt).toFixed(2) : winLoseAmt;

            table_con.append(`
              <div class="betlog-tr">
              <div class="betlog-td -bettype">
              <span>${rowData.bet}</span>
              </div>
              <div class="betlog-td -bets">
              <span>${numberWithCommas(rowData.bet_money)}</span>
              </div>
              <div class="betlog-td -winlose">
              <span class="${winLoseAmt > 0 ? 'wintext' : 'losetext'}">${numberWithCommas(winLoseAmt)}</span>
              </div>
              </div>
            `);
          }

          let totalWinClass = totalWin > 0 ? 'wintext' : 'losetext';
          if (totalWin == 0) totalWinClass = '';

          totalWin = window.casino == 'SS' ? totalWin.toFixed(2) : totalWin;

          table_con.append(`
            <div class="betlog-tr -total">
            <div class="betlog-td -bettype">
            <span>${window.language2.com_sub_menuarea_total}</span>
            </div>
            <div class="betlog-td -bets">
            <span>${numberWithCommas(betData.total_bet)}</span>
            </div>
            <div class="betlog-td -winlose">
            <span class="${totalWinClass}">${numberWithCommas(totalWin)}</span>
            </div>
            </div>
          `);

        }
      })
    },

    screenOrientation() {
      this.count = this.context.portrait ? 12 : 6;
      this.initRecords('betlogs');
    }
  });

  return instance;
}
