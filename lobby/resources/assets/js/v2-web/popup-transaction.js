
let links  = {
	getTransferLogs: "/transferlogs",

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

let component_transaction = {
	ads : [],
	circle_indicator : [],
	stage : null,
	main () {
		var c = document.createElement("canvas");
		c.setAttribute("width", "1600px");
		c.setAttribute("height", "930px");
		c.setAttribute("id", "trans-history");

		$(c).css({
			position: 'absolute',
			top: '30px',
			transform: 'translate(0,0)',
			display : 'none'
		});

		$(".popup-container").append(c);


		this.stage = new createjs.Stage("trans-history");
		this.transhistory_container = new createjs.Container();
		this.stage.addChild(this.transhistory_container)
		this.stage.enableMouseOver(10);
		this.stage.x = 15;

		this.modalWidth = 1575;
		this.modalHeight = 930;
		this.timezoneOffset = -(new Date().getTimezoneOffset() / 60)

		this.stage.addEventListener('click', (e) => {
      return;
    });

		let popup_bg = new createjs.Shape();
		popup_bg.graphics.ss(2).s("#53985b").beginFill('#262626').drawRect(-1,0,this.modalWidth + 2,this.modalHeight); //bet_hist_bg
		popup_bg.setBounds(0,0,this.modalWidth,this.modalHeight);

		// this.transhistory_container.regX = popup_bg.getBounds().width/2;
		// this.transhistory_container.regY = popup_bg.getBounds().height/2;
		// this.transhistory_container.visible = false;
		this.transhistory_container.addChild(popup_bg);

		//Bet history assets container
		this.betRecordCon = new createjs.Container();
		this.transhistory_container.addChild(this.betRecordCon);

		//Bet history data container
		this.betDataCon = new createjs.Container();
		this.transhistory_container.addChild(this.betDataCon);

		let betRecordTitle = new createjs.Text(window.language.lobby.transactions, 'bold 25px Lato', '#fff'); //bet_hist_title
		betRecordTitle.x = 130;
		betRecordTitle.y = 30;
		betRecordTitle.textAlign = 'center';
		this.transhistory_container.addChild(betRecordTitle);

		if(window.language.locale == "zh") {
			betRecordTitle.font = 'bold 30px Lato';
			betRecordTitle.y = 23;
		}
		//Pagination container
		this.paginationCon = new createjs.Container();
		this.transhistory_container.addChild(this.paginationCon);

		//Header
		this.tblHeader = [
			{"header_width" : 230, "header_name" : window.language.menu.datecaps},
			{"header_width" : 170, "header_name" : window.language.menu.typecaps},
			{"header_width" : 230, "header_name" : window.language.menu.oldcreditcaps},
			{"header_width" : 230, "header_name" : window.language.menu.transferamountcaps},
			{"header_width" : 230, "header_name" : window.language.menu.newcreditcaps},
			{"header_width" : 190, "header_name" : window.language.menu.ipcaps},
			{"header_width" : 295, "header_name" : window.language.menu.countrycaps}
		];
	},
	initRecords(type) {
		//Empty tables
		this.betRecordCon.removeAllChildren();
		this.betDataCon.removeAllChildren();
		this.paginationCon.removeAllChildren();

		$.post(links.getTransferLogs, {}, (response) => {
			this.logs = JSON.parse(response);
			this.countTotal = this.logs.last_page;

			//Draw Modal layout and data
			this.drawRecord(this.logs.data);

			//Draw pagination
			this.drawPagination('transferlogs', 0, 0, this.countTotal, this.logs);
  		});
	},
	drawRecord(data) {
		let roundId = 0;
		let tabs = [];
		let tblHeader = [];
		let betHistTab = [];
		let betHistTabTxt = [];
		let totalWidth = 0;
		let betTblHeader = [];
		let betTblBorder = [];

		//Init array for table data
		let transactionDate = [];
		let transactionType = [];
		let transactionOldCred = [];
		let transactionTransferAmt = [];
		let transactionNewCred = [];
		let transactionIp = [];
		let transactionCountry = [];

		this.betRecordCon.removeAllChildren();
		this.betDataCon.removeAllChildren();

		tblHeader = this.tblHeader;

		//Close button
		let betRecordClose = new createjs.Text('X', 'bold 25px Arial', '#9e9e9e');
		betRecordClose.x = this.modalWidth - 30;
		betRecordClose.y = 10;
		betRecordClose.textAlign = 'center';
		this.betRecordCon.addChild(betRecordClose);

		//Close button hitarea
		let betRecordCloseHit = new createjs.Shape();
		betRecordCloseHit.graphics.beginFill("#fff").drawRect(0, 0, 50, 50);
		betRecordCloseHit.x = betRecordClose.x - 25;
		betRecordCloseHit.y = 0;
		betRecordCloseHit.cursor = "pointer";
		betRecordCloseHit.alpha = 0.01;
		this.betRecordCon.addChild(betRecordCloseHit);

		betRecordCloseHit.addEventListener("mousedown", (e) => {
       		// switch (event.which) {
	        // case 1:
       			// this.context.toggleView('thumbnail_transactions');
       			toggle.togglePopups('transactions')
						$(".popup-bg, .menu__items").removeClass("active")
       		// 	break;
       		// }
        });

		let headerBg = new createjs.Shape();
		headerBg.graphics.beginFill('#333333').drawRect(0,0,this.modalWidth,850); //bet_hist_tab_act
		headerBg.y = 80;
		this.betRecordCon.addChild(headerBg);

		let bodyBg = new createjs.Shape();
		bodyBg.graphics.beginFill('#d5d5d5').drawRect(0,0,this.modalWidth,670);
		bodyBg.y = headerBg.y + 80;
		this.betRecordCon.addChild(bodyBg);

		//Draw table header and border
		for (var i = 0; i < tblHeader.length; i++) {
			totalWidth += tblHeader[i].header_width;

			betTblHeader[i] = new createjs.Text(tblHeader[i].header_name, 'bold 19px Lato', '#9a9a9a');
			betTblHeader[i].x = totalWidth - (tblHeader[i].header_width / 2);
			betTblHeader[i].y = headerBg.y + 30;
			betTblHeader[i].textAlign = 'center';
			this.betRecordCon.addChild(betTblHeader[i]);

			if(window.language.locale == "zh") {
							betTblHeader[i].font  = "bold 24px Lato";
							betTblHeader[i].y = headerBg.y + 25;
			}

			betTblBorder[i] = new createjs.Shape();
		    betTblBorder[i].graphics.setStrokeStyle(1).beginStroke('#a9a9a9')
		    			   .moveTo(totalWidth, bodyBg.y).lineTo(totalWidth, 830);
		    this.betRecordCon.addChild(betTblBorder[i]);
		} //end for loop


		//Draw Transactions data
		for (var i = 0; i < data.length; i++) {
			let logs = data[i];

			let newDate = '';
			if (logs.created_at) {
				let timeDateSplit = data[i].created_at.split(' ');
				let timeSplit = timeDateSplit[1].split(':');
				let newHour = parseInt(timeSplit[0]) + parseInt(this.timezoneOffset);
				if (newHour > 24) {
					newHour -= 24;
				}
				newDate = timeDateSplit[0] +' '+ newHour +':' + timeSplit[1] +':'+ timeSplit[2];
			}

			transactionDate[i] = new createjs.Text(newDate, 'bold 18px Lato', '#3b3b3b');
			transactionDate[i].x = betTblHeader[0].x;
			transactionDate[i].y = headerBg.y + 105 + (65 * i);
			transactionDate[i].textAlign = 'center';
			this.betDataCon.addChild(transactionDate[i]);
			if(logs.type.toUpperCase() == "CASH-IN") {
				transactionType[i] = new createjs.Text(window.language.menu.cashin, 'bold 18px Lato', '#3b3b3b');
				if(window.language.locale == "zh") {
							transactionType[i].font = 'bold 23px Lato';
				}

			} else {
				transactionType[i] = new createjs.Text(window.language.menu.cashout, 'bold 18px Lato', '#3b3b3b');
				if(window.language.locale == "zh") {
								transactionType[i].font = 'bold 23px Lato';
				}
			}

			transactionType[i].x = betTblHeader[1].x;
			transactionType[i].y = headerBg.y + 105 + (65 * i);
			transactionType[i].textAlign = 'center';
			this.betDataCon.addChild(transactionType[i]);

			transactionOldCred[i] = new createjs.Text(this.formatNumber(logs.old_money), 'bold 18px Lato', '#3b3b3b');
			transactionOldCred[i].x = betTblHeader[2].x + 90;
			transactionOldCred[i].y = headerBg.y + 105 + (65 * i);
			transactionOldCred[i].textAlign = 'right';
			this.betDataCon.addChild(transactionOldCred[i]);

			transactionTransferAmt[i] = new createjs.Text(this.formatNumber(logs.money), 'bold 18px Lato', '#3b3b3b');
			transactionTransferAmt[i].x = betTblHeader[3].x + 90;
			transactionTransferAmt[i].y = headerBg.y + 105 + (65 * i);
			transactionTransferAmt[i].textAlign = 'right';
			this.betDataCon.addChild(transactionTransferAmt[i]);

			transactionNewCred[i] = new createjs.Text(this.formatNumber(logs.new_money), 'bold 18px Lato', '#3b3b3b');
			transactionNewCred[i].x = betTblHeader[4].x + 90;
			transactionNewCred[i].y = headerBg.y + 105 + (65 * i);
			transactionNewCred[i].textAlign = 'right';
			this.betDataCon.addChild(transactionNewCred[i]);

			transactionIp[i] = new createjs.Text(logs.ip, 'bold 18px Lato', '#3b3b3b');
			transactionIp[i].x = betTblHeader[5].x;
			transactionIp[i].y = headerBg.y + 105 + (65 * i);
			transactionIp[i].textAlign = 'center';
			this.betDataCon.addChild(transactionIp[i]);

			transactionCountry[i] = new createjs.Text(logs.country, 'bold 18px Lato', '#3b3b3b');
			transactionCountry[i].x = betTblHeader[6].x;
			transactionCountry[i].y = headerBg.y + 105 + (65 * i);
			transactionCountry[i].textAlign = 'center';
			this.betDataCon.addChild(transactionCountry[i]);
		}
	},

	drawPagination(record, currentArr, lowTenthNum, countTotal, dataCon) {
		let prevCoor = 0;
		let nextCoor = 0;
		let paginateCount = 0;
		let prevUrl = '';
		let nextUrl = '';
		let lastPage = '';

		this.paginationCon.removeAllChildren();

		//init Game History Pagination
		this._histBtnPagination = [];
		this._histPaginationNum = [];

		prevUrl = dataCon.prev_page_url;
		nextUrl = dataCon.next_page_url;
		lastPage = dataCon.last_page;

		// switch(record) {
		// 	case ("gamehistory"):
		// 		this.histPageCountTotal = countTotal;
		// 		prevUrl = this._gameHistory.prev_page_url;
		// 		nextUrl = this._gameHistory.next_page_url;
		// 		lastPage = this._gameHistory.last_page;
		// 		break;

		// 	case ("betlogs"):
		// 		this.betPageCountTotal = countTotal;
		// 		prevUrl = this._betLogs.prev_page_url;
		// 		nextUrl = this._betLogs.next_page_url;
		// 		lastPage = this._betLogs.last_page;
		// 		break;

		// 	case ("transferlogs"):
		// 		this.transferPageCountTotal = countTotal;
		// 		prevUrl = this._transferLogs.prev_page_url;
		// 		nextUrl = this._transferLogs.next_page_url;
		// 		lastPage = this._transferLogs.last_page;
		// 		break;
		// }

		if (countTotal > 10) {
			paginateCount = 10;
		}
		else if (countTotal == 0 && dataCon.total != 0) {
			paginateCount = 10;
		}
		else if (countTotal == 0 && dataCon.total == 0) {
			paginateCount = 1;
		}
		else {
			paginateCount = countTotal;
		}

		for (var x = 0; x < paginateCount; x++) {
			this._histBtnPagination[x] = new createjs.Shape();
			this._histBtnPagination[x].graphics.beginFill('#c5c5c5').drawCircle(0, 0, 15);
			this._histBtnPagination[x].x = (this.modalWidth / 2) + ((x - (paginateCount / 2)) * 37);
			this._histBtnPagination[x].y = this.modalHeight - 55;
			this._histBtnPagination[x].cursor = 'pointer';
			this._histBtnPagination[x].pageNum = lowTenthNum + (x + 1);
			this.paginationCon.addChild(this._histBtnPagination[x]);

			this._histPaginationNum[x] = new createjs.Text(lowTenthNum + (x + 1), 'normal 20px BebasNeue', '#727272');
			this._histPaginationNum[x].x = this._histBtnPagination[x].x - 1;
			this._histPaginationNum[x].y = this._histBtnPagination[x].y - 12;
			this._histPaginationNum[x].textAlign = 'center';
			this.paginationCon.addChild(this._histPaginationNum[x]);

			//Determine active page
			if (currentArr == x) {
				this._histBtnPagination[x].graphics.clear().beginFill('#fff').drawCircle(0, 0, 15);
				this._histPaginationNum[x].color = '#000';
			}

			if (x == 0) {
				prevCoor = this._histBtnPagination[x].x - 40;
			}

			if (x == paginateCount - 1) {
				nextCoor = this._histBtnPagination[x].x + 20;
			}

			//Pagination number click event
			((x) => {
		       	this._histBtnPagination[x].addEventListener("mousedown", (e) => {
		       		// switch (event.which) {
			        // case 1:
		       			this.paginate(record, e.currentTarget.pageNum, dataCon, false, (data) => {
		       				dataCon = JSON.parse(data);
						  	prevPageBtn.pageNum = dataCon.prev_page_url;
						  	nextPageBtn.pageNum = dataCon.next_page_url;
				        	this.changeActivePage('page', countTotal, record, dataCon);
				        })
		       		// 	break;
		       		// }
		        });
			}(x));
		} // end for loop

		//Previous page icon
		let prevPageBtn = new createjs.Shape();
		prevPageBtn.graphics.beginFill('#ff9b28').drawRect(0, 0, 20, 30); //btn_pagination
		prevPageBtn.x = prevCoor;
		prevPageBtn.y = this.modalHeight - 70;
		prevPageBtn.cursor = 'pointer';
		prevPageBtn.pageNum = prevUrl;
		prevPageBtn.alpha = 0.01;
		this.paginationCon.addChild(prevPageBtn);

		this._histPrevIcon = new createjs.Shape();
		this._histPrevIcon.graphics.beginStroke('#fff').setStrokeStyle(3, 'round').moveTo(17, 7).lineTo(12, 15).lineTo(17, 23);
		this._histPrevIcon.x = prevPageBtn.x - 5;
		this._histPrevIcon.y = prevPageBtn.y;
		this.paginationCon.addChild(this._histPrevIcon);

		//Previous page click event
	    prevPageBtn.addEventListener("mousedown", (e) => {
     		// switch (event.which) {
	      //   	case 1:
		        	this.paginate(record, e.currentTarget.pageNum, dataCon, true, (data) => {
			       		dataCon = JSON.parse(data);
					  	prevPageBtn.pageNum = dataCon.prev_page_url;
					  	nextPageBtn.pageNum = dataCon.next_page_url;
			        	this.changeActivePage('prev', countTotal, record, dataCon);
			        })
     		// 		break;
     		// }
      	});

	    //First page button
      	let firstPageBtn = new createjs.Shape();
		firstPageBtn.graphics.beginFill('#ff9b28').drawRect(0, 0, 20, 30);
		firstPageBtn.x = prevCoor - 23;
		firstPageBtn.y = this.modalHeight - 70;
		firstPageBtn.cursor = 'pointer';
		firstPageBtn.pageNum = 1;
		firstPageBtn.alpha = 0.01;
		this.paginationCon.addChild(firstPageBtn);

		this._histFirstIcon1 = new createjs.Shape();
		this._histFirstIcon1.graphics.beginStroke('#fff').setStrokeStyle(3, 'round').moveTo(20, 7).lineTo(15, 15).lineTo(20, 23);
		this._histFirstIcon1.x = firstPageBtn.x - 5;
		this._histFirstIcon1.y = firstPageBtn.y;
		this.paginationCon.addChild(this._histFirstIcon1);

		this._histFirstIcon2 = new createjs.Shape();
		this._histFirstIcon2.graphics.beginStroke('#fff').setStrokeStyle(3, 'round').moveTo(14, 7).lineTo(9, 15).lineTo(14, 23);
		this._histFirstIcon2.x = firstPageBtn.x - 5;
		this._histFirstIcon2.y = firstPageBtn.y;
		this.paginationCon.addChild(this._histFirstIcon2);

		//First page click event
	    firstPageBtn.addEventListener("mousedown", (e) => {
     		// switch (event.which) {
        // 		case 1:
	     			this.paginate(record, e.currentTarget.pageNum, dataCon, false, (data) => {
			       		dataCon = JSON.parse(data);
					  	prevPageBtn.pageNum = dataCon.prev_page_url;
					  	nextPageBtn.pageNum = dataCon.next_page_url;
			        	this.changeActivePage('first', countTotal, record, dataCon);
			        })
     		// 		break;
     		// }
      	});

		//Next page button
		let nextPageBtn = new createjs.Shape();
		nextPageBtn.graphics.beginFill('#ff9b28').drawRect(0, 0, 20, 30);
		nextPageBtn.x = nextCoor;
		nextPageBtn.y = this.modalHeight - 70;
		nextPageBtn.cursor = 'pointer';
		nextPageBtn.pageNum = nextUrl;
		nextPageBtn.alpha = 0.01;
		this.paginationCon.addChild(nextPageBtn);

		this._nextIcon = new createjs.Shape();
		this._nextIcon.graphics.beginStroke('#fff').setStrokeStyle(3, 'round').moveTo(12, 7).lineTo(17, 15).lineTo(12, 23);
		this._nextIcon.x = nextPageBtn.x - 5;
		this._nextIcon.y = nextPageBtn.y;
		this.paginationCon.addChild(this._nextIcon);

		//Next page click event
	    nextPageBtn.addEventListener("mousedown", (e) => {
     		// switch (event.which) {
		    //     case 1:
			        this.paginate(record, e.currentTarget.pageNum, dataCon, true, (data) => {
			       		dataCon = JSON.parse(data);
					  	prevPageBtn.pageNum = dataCon.prev_page_url;
					  	nextPageBtn.pageNum = dataCon.next_page_url;
			        	this.changeActivePage('next', countTotal, record, dataCon);
			        })
				// 	break;
     		// }
      	});

	    //Last page button
      	let lastPageBtn = new createjs.Shape();
		lastPageBtn.graphics.beginFill('#ff9b28').drawRect(0, 0, 20, 30);
		lastPageBtn.x = nextCoor + 23;
		lastPageBtn.y = this.modalHeight - 70;
		lastPageBtn.cursor = 'pointer';
		lastPageBtn.pageNum = lastPage;
		lastPageBtn.alpha = 0.01;
		this.paginationCon.addChild(lastPageBtn);

		this._histLastIcon1 = new createjs.Shape();
		this._histLastIcon1.graphics.beginStroke('#fff').setStrokeStyle(3, 'round').moveTo(10, 7).lineTo(15, 15).lineTo(10, 23);
		this._histLastIcon1.x = lastPageBtn.x - 5;
		this._histLastIcon1.y = lastPageBtn.y;
		this.paginationCon.addChild(this._histLastIcon1);

		this._histLastIcon2 = new createjs.Shape();
		this._histLastIcon2.graphics.beginStroke('#fff').setStrokeStyle(3, 'round').moveTo(16, 7).lineTo(21, 15).lineTo(16, 23);
		this._histLastIcon2.x = lastPageBtn.x - 5;
		this._histLastIcon2.y = lastPageBtn.y;
		this.paginationCon.addChild(this._histLastIcon2);

		//Last page click event
    	lastPageBtn.addEventListener("mousedown", (e) => {
   			// switch (event.which) {
	      //   	case 1:
	     			this.paginate(record, e.currentTarget.pageNum, dataCon, false, (data) => {
			       		dataCon = JSON.parse(data);
					  	prevPageBtn.pageNum = dataCon.prev_page_url;
					  	nextPageBtn.pageNum = dataCon.next_page_url;
			        	this.changeActivePage('last', countTotal, record, dataCon);
			       	})
	     	// 		break;
	     	// }
	    });

      	if (lastPage < 11) {
	    	firstPageBtn.visible = false;
	    	this._histFirstIcon1.visible = false;
	    	this._histFirstIcon2.visible = false;

	    	lastPageBtn.visible = false;
	    	this._histLastIcon1.visible = false;
	    	this._histLastIcon2.visible = false;
	    }
	},

	paginate(type, pageNum, container, navigation, callback) {
		let pageUrl = '';

		if (pageNum == container.current_page) {
			return false;
		}

		if (navigation) {
			if (pageNum === null) {
				return;
			}

			pageUrl = pageNum;
		}
		else {
			let baseUrl = window.lobby_domain;//window.location.href.split('#')[0];
			pageUrl = baseUrl + type + '?page=' +pageNum;
		}

	    $.get(pageUrl, (response) => {
	    	container = JSON.parse(response);
	      	callback(response);
		});
	},

	changeActivePage(type, countTotal, record, dataCon) {
		let numPage = 0;
		let lowTenthNum = 0;
		let currentPage = 0;
		let currentArr = 0;

		currentPage = dataCon.current_page;
		countTotal = countTotal;

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

		// container.removeAllChildren();
		this.drawPagination(record, currentArr, lowTenthNum, countTotal, dataCon);
		this.drawRecord(dataCon.data);
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
	component_transaction
}
