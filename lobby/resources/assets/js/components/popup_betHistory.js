let instance = null;

export default(links) => {
	instance = instance || new blu.Component({
		ads : [],
		circle_indicator : [],
		main() {

			betHistory = new createjs.Stage("betHistory");
			this.betHistory_container = new createjs.Container();
			betHistory.addChild(this.betHistory_container)
			betHistory.enableMouseOver(10);

			this.modalWidth = 1575;
			this.modalHeight = 930;
			this.timezoneOffset = -(new Date().getTimezoneOffset() / 60)

			// Prevent click behind pop-up
			this.addEventListener('click', (e) => {
        return;
      });

			let popup_bg = new createjs.Shape();
			popup_bg.graphics.ss(2).s("#53985b").beginFill('#262626').drawRect(-1,0,this.modalWidth + 2,this.modalHeight); //bet_hist_bg
			popup_bg.setBounds(0,0,this.modalWidth,this.modalHeight);
			this.betHistory_container.x = (popup_bg.getBounds().width / 2) + 175;
			this.betHistory_container.y = -80;

			this.betHistory_container.regX = popup_bg.getBounds().width/2;
			this.betHistory_container.regY = popup_bg.getBounds().height/2;
			this.betHistory_container.visible = false;
			this.betHistory_container.addChild(popup_bg);

			//Bet history assets container
			this.betRecordCon = new createjs.Container();
			this.betHistory_container.addChild(this.betRecordCon);

			//Pagination container
			this.paginationCon = new createjs.Container();
			this.betHistory_container.addChild(this.paginationCon);

			//Bet history data container
			this.betDataCon = new createjs.Container();
			this.betHistory_container.addChild(this.betDataCon);

			let betRecordTitle = new createjs.Text(window.language.lobby.bettinghistory, 'bold 25px Lato', '#fff'); //bet_hist_title
			betRecordTitle.x = 130;
			betRecordTitle.y = 30;
			betRecordTitle.textAlign = 'center';
			this.betHistory_container.addChild(betRecordTitle);

			if(window.language.locale == "zh") {
				betRecordTitle.font = 'bold 28px Lato';
				betRecordTitle.y = 25;
			}

			// === Live Games
			this.liveTblHeader = [
					{"header_width" : 150, "header_name" : window.language.menu.gamenocaps},
					{"header_width" : 200, "header_name" : window.language.menu.datecaps},
					{"header_width" : 150, "header_name" : window.language.menu.channelcaps},
					{"header_width" : 150, "header_name" : window.language.menu.dealercaps},
					{"header_width" : 200, "header_name" : window.language.menu.startingcreditcaps},
					{"header_width" : 175, "header_name" : window.language.menu.totalbetcaps},
					{"header_width" : 150, "header_name" : window.language.bet_details.winningscaps},
					{"header_width" : 200, "header_name" : window.language.menu.newcreditcaps},
					{"header_width" : 200, "header_name" : window.language.menu.resultcaps}
				];

			// === All Games
			this.allGamesTblHeader = [
					{"header_width" : 175, "header_name" : window.language.menu.gamenocaps},
					{"header_width" : 200, "header_name" : window.language.menu.datecaps},
					{"header_width" : 150, "header_name" : window.language.menu.gametypecaps},
					{"header_width" : 200, "header_name" : window.language.menu.channelcaps},
					{"header_width" : 175, "header_name" : window.language.menu.startingcreditcaps},
					{"header_width" : 175, "header_name" : window.language.menu.totalbetcaps},
					{"header_width" : 150, "header_name" : window.language.bet_details.winningscaps},
					{"header_width" : 175, "header_name" : window.language.menu.newcreditcaps},
					{"header_width" : 175, "header_name" : window.language.menu.resultcaps}
				];

			// === Themed Games
			this.themedTblHeader = [
					{"header_width" : 150, "header_name" : window.language.menu.gamenocaps},
					{"header_width" : 200, "header_name" : window.language.menu.datecaps},
					{"header_width" : 150, "header_name" : window.language.menu.channepcaps},
					{"header_width" : 150, "header_name" : window.language.menu.dealercaps},
					{"header_width" : 200, "header_name" : window.language.menu.startingcreditcaps},
					{"header_width" : 175, "header_name" : window.language.menu.totalbetcaps},
					{"header_width" : 150, "header_name" : window.language.bet_details.winningscaps},
					{"header_width" : 200, "header_name" : window.language.menu.newcreditcaps},
					{"header_width" : 200, "header_name" : window.language.menu.resultcaps}
				];

			// === Kaga Gaming
			this.kagaTblHeader = [
					{"header_width" : 225, "header_name" : window.language.menu.datecaps},
					{"header_width" : 150, "header_name" : window.language.lobby.reelgamescaps},
					{"header_width" : 225, "header_name" : window.language.menu.startingcreditcaps},
					{"header_width" : 150, "header_name" : window.language.menu.bettypecaps},
					{"header_width" : 225, "header_name" : window.language.menu.totalbetcaps},
					{"header_width" : 225, "header_name" : window.language.bet_details.winningscaps},
					{"header_width" : 225, "header_name" : window.language.menu.newcreditcaps},
					{"header_width" : 150, "header_name" : window.language.menu.resultcaps}
				];

			this.dropdownEl = [];
			this.dropdownElName = [];

			if (parseInt(window.reel_yn) === 1) {
				this.dropdownElName = ["ALL", "BACCARAT", "SUPERSIX", "DRAGONBONUS", "POKER", "BONUSPLUS", "SIC BO", "DRAGON TIGER", "KAGA"];
				this.dropdownEl = [
					window.language.lobby.allgamescaps,
					window.language.lobby.baccaratcaps,
					window.language.lobby.supersixcaps,
					window.language.lobby.dragonbonuscaps,
					window.language.lobby.texascaps,
					window.language.lobby.bonuspluscaps,
					window.language.lobby.sicbocaps,
					window.language.lobby.dragontigercaps,
					window.language.lobby.kagamingreelcaps
				];
			} else {
				this.dropdownElName = ["ALL", "BACCARAT", "SUPERSIX", "DRAGONBONUS", "POKER", "BONUSPLUS", "SIC BO", "DRAGON TIGER"];
				this.dropdownEl = [
					window.language.lobby.allgamescaps,
					window.language.lobby.baccaratcaps,
					window.language.lobby.supersixcaps,
					window.language.lobby.dragonbonuscaps,
					window.language.lobby.texascaps,
					window.language.lobby.bonuspluscaps,
					window.language.lobby.sicbocaps,
					window.language.lobby.dragontigercaps
				];
			}

			//Drop down menu
			this.dropdownMenu = new createjs.Shape();
			this.dropdownMenu.graphics.setStrokeStyle(1).beginStroke('#262626').beginFill("#e0e0e0").drawRoundRect(0, 0, 290, 45, 4);
			this.dropdownMenu.x = 250;
			this.dropdownMenu.y = 20;
			this.dropdownMenu.cursor = "pointer";
			this.betHistory_container.addChild(this.dropdownMenu);

			//Drop down click
			this.dropdownMenu.addEventListener('click', (e) => {
      	this.toggleDropdown();
    	});

			this.dropdownText = new createjs.Text(window.language.lobby.baccaratcaps, 'bold 22px Lato', '#262626');
			this.dropdownText.x = this.dropdownMenu.x + 10;
			this.dropdownText.y = this.dropdownMenu.y + 8;
			this.dropdownText.textAlign = 'left';
			this.dropdownText.name = 'BACCARAT';
			this.betHistory_container.addChild(this.dropdownText);

			if(window.language.locale == "zh") {
				this.dropdownText.font  = 'bold 26px Lato';
				this.dropdownText.y = this.dropdownMenu.y + 6;
			}

			let dropdownIcon = new createjs.Shape();
	    dropdownIcon.graphics.beginFill('#262626').moveTo(0, 0).lineTo(30, 0).lineTo(15, 15).lineTo(0, 0);
	    dropdownIcon.x = this.dropdownMenu.x + 240;
	    dropdownIcon.y = this.dropdownMenu.y + 15;
	    this.betHistory_container.addChild(dropdownIcon);

	    this.dropdownCon = new createjs.Container();
	    this.dropdownCon.visible = false;
			this.betHistory_container.addChild(this.dropdownCon);

			this.dropdownBg = new createjs.Shape();
			this.dropdownBg.graphics.beginFill("#fff").drawRect(0, 0, 290, 203); //355 // 305
			this.dropdownBg.x = this.dropdownMenu.x;
			this.dropdownBg.y = this.dropdownMenu.y + 45;
			this.dropdownBg.cursor = "pointer";
			this.dropdownCon.addChild(this.dropdownBg);

			this.dropdownChoiceBg = [];
			this.dropdownChoice = [];

			for (var i = 0; i < this.dropdownEl.length; i++) {
				this.dropdownChoiceBg[i] = new createjs.Shape();
				this.dropdownChoiceBg[i].graphics.beginFill("#fff").drawRoundRect(0, 0, 290, 55, 2);
				this.dropdownChoiceBg[i].x = this.dropdownMenu.x;
				this.dropdownChoiceBg[i].y = this.dropdownBg.y + (50 * i);
				this.dropdownChoiceBg[i].cursor = "pointer";
				this.dropdownCon.addChild(this.dropdownChoiceBg[i]);

				this.dropdownChoice[i] = new createjs.Text(this.dropdownEl[i], 'bold 22px Lato', '#5b5b5b');
				this.dropdownChoice[i].x = this.dropdownChoiceBg[i].x + 15;
				this.dropdownChoice[i].y = this.dropdownChoiceBg[i].y + 12;
				this.dropdownChoice[i].textAlign = 'left';
				this.dropdownChoice[i].name = this.dropdownElName[i];
				this.dropdownCon.addChild(this.dropdownChoice[i]);

				if(window.language.locale == "zh") {
					this.dropdownChoice[i].font = 'bold 26px Lato';
				}

				((i) => {
					this.dropdownChoiceBg[i].addEventListener('mouseover', (e) => {
	        	this.dropdownChoiceBg[i].graphics.clear().beginFill('#ffb94a').drawRoundRect(0, 0, 290, 55, 4);
	        	this.dropdownChoice[i].color = '#262626';
	        });

	        this.dropdownChoiceBg[i].addEventListener('mouseout', (e) => {
	          this.dropdownChoiceBg[i].graphics.clear().beginFill('#fff').drawRoundRect(0, 0, 290, 55, 4);
	        	this.dropdownChoice[i].color = '#5b5b5b';
	        });

	        this.dropdownChoiceBg[i].addEventListener('click', (e) => {
	        	this.activeTblHeader = this.themedTblHeader;
          	this.dropdownText.text = this.dropdownChoice[i].text;
          	this.dropdownText.name = this.dropdownChoice[i].name;
          	this.toggleDropdown();

          	this.initRecords(this.dropdownChoice[i].name);
	        });
	    	}(i));
			} //end for loop

      this.resize()

      window.addEventListener("resize", function() {
    		this.resize()
    		betHistory.update()
			}.bind(this));
		},
		initRecords(type) {
			//Empty tables
			this.betRecordCon.removeAllChildren();
			this.betDataCon.removeAllChildren();
			this.paginationCon.removeAllChildren();

			switch(type) {
				case ("ALL"):
					this.dropdownText.text = window.language.lobby.allgamescaps;

					$.post(links.getAllData, {}, (response) => {
						//Init header
						this.activeTblHeader = this.allGamesTblHeader;
						this.logs = JSON.parse(response);
						this.countTotal = this.logs.last_page;

						//Set active modal result
						this.activeModal = this.context.lobby_all_data;
						this.context.lobby_all_data.setBetLogs(this.logs);

						//Draw Modal layout and data
						this.drawRecord(this.logs.data);

						//Draw pagination
						this.drawPagination('alllogs', 0, 0, this.countTotal, this.logs);
	       	});
					break;

				case ("BACCARAT"):
					this.dropdownText.text = window.language.lobby.baccaratcaps;
					this.dropdownText.name = 'BACCARAT';

					$.post(links.getBaccaratData, {}, (response) => {
						//Init header
						this.activeTblHeader = this.liveTblHeader;
						this.logs = JSON.parse(response);
						this.countTotal = this.logs.last_page;

						//Set active modal result
						this.activeModal = this.context.lobby_baccarat_data;
						this.context.lobby_baccarat_data.setBetLogs(this.logs);

						//Draw Modal layout and data
						this.drawRecord(this.logs.data);

						//Draw pagination
						this.drawPagination('baccaratlogs', 0, 0, this.countTotal, this.logs);
	        });
					break;

				case ("SUPERSIX"):
					this.dropdownText.text = window.language.lobby.supersixcaps;

					$.post(links.getSupersixData, {}, (response) => {
						//Init header
						this.activeTblHeader = this.liveTblHeader;
						this.logs = JSON.parse(response);
						this.countTotal = this.logs.last_page;

						//Set active modal result
						this.activeModal = this.context.lobby_supersix_data;
						this.context.lobby_supersix_data.setBetLogs(this.logs);

						//Draw Modal layout and data
						this.drawRecord(this.logs.data);

						//Draw pagination
						this.drawPagination('supersixlogs', 0, 0, this.countTotal, this.logs);
	        });
					break;

				case ("DRAGONBONUS"):
					this.dropdownText.text = window.language.lobby.dragonbonuscaps;

					$.post(links.getDragonBonusData, {}, (response) => {
						//Init header
						this.activeTblHeader = this.liveTblHeader;
						this.logs = JSON.parse(response);
						this.countTotal = this.logs.last_page;

						//Set active modal result
						this.activeModal = this.context.lobby_dragonbonus_data;
						this.context.lobby_dragonbonus_data.setBetLogs(this.logs);

						//Draw Modal layout and data
						this.drawRecord(this.logs.data);

						//Draw pagination
						this.drawPagination('dragonbonuslogs', 0, 0, this.countTotal, this.logs);
	        });
					break;

				case ("POKER"):
					$.post(links.getPokerData, {}, (response) => {
						//Init header
						this.activeTblHeader = this.liveTblHeader;
						this.logs = JSON.parse(response);
						this.countTotal = this.logs.last_page;

						//Set active modal result
						this.activeModal = this.context.lobby_poker_data;
						this.context.lobby_poker_data.setBetLogs(this.logs);

						//Draw Modal layout and data
						this.drawRecord(this.logs.data);

						//Draw pagination
						this.drawPagination('pokerlogs', 0, 0, this.countTotal, this.logs);
	        });
					break;

				case ("BONUSPLUS"):
					$.post(links.getBonusPlusData, {}, (response) => {
						//Init header
						this.activeTblHeader = this.liveTblHeader;
						this.logs = JSON.parse(response);
						this.countTotal = this.logs.last_page;

						//Set active modal result
						this.activeModal = this.context.lobby_bonusplus_data;
						this.context.lobby_bonusplus_data.setBetLogs(this.logs);

						//Draw Modal layout and data
						this.drawRecord(this.logs.data);

						//Draw pagination
						this.drawPagination('bonuspluslogs', 0, 0, this.countTotal, this.logs);
	        });
					break;

				case ("SIC BO"):
					$.post(links.getSicboData, {}, (response) => {
						//Init header
						this.activeTblHeader = this.liveTblHeader;
						this.logs = JSON.parse(response);
						this.countTotal = this.logs.last_page;

						//Set active modal result
						this.activeModal = this.context.lobby_sicbo_data;
						this.context.lobby_sicbo_data.setBetLogs(this.logs);

						//Draw Modal layout and data
						this.drawRecord(this.logs.data);

						//Draw pagination
						this.drawPagination('sicbologs', 0, 0, this.countTotal, this.logs);
	        });
					break;

				case ("DRAGON TIGER"):
					$.post(links.getDragonTigerData, {}, (response) => {
						//Init header
						this.activeTblHeader = this.liveTblHeader;
						this.logs = JSON.parse(response);
						this.countTotal = this.logs.last_page;

						//Set active modal result
						this.activeModal = this.context.lobby_dragontiger_data;
						this.context.lobby_dragontiger_data.setBetLogs(this.logs);

						//Draw Modal layout and data
						this.drawRecord(this.logs.data);

						//Draw pagination
						this.drawPagination('dragontigerlogs', 0, 0, this.countTotal, this.logs);
	        });
					break;

				case ("RED WHITE"):
					$.post(links.getPulaputiData, {}, (response) => {
						//Init header
						this.activeTblHeader = this.liveTblHeader;
						this.logs = JSON.parse(response);
						this.countTotal = this.logs.last_page;

						//Set active modal result
						this.activeModal = this.context.lobby_pulaputi_data;
						this.context.lobby_pulaputi_data.setBetLogs(this.logs);

						//Draw Modal layout and data
						this.drawRecord(this.logs.data);

						//Draw pagination
						this.drawPagination('pulaputilogs', 0, 0, this.countTotal, this.logs);
	        });
					break;

				case ("SPIN N' WIN"):
					$.post(links.getBigwheelData, {}, (response) => {
						//Init header
						this.activeTblHeader = this.liveTblHeader;
						this.logs = JSON.parse(response);
						this.countTotal = this.logs.last_page;

						//Set active modal result
						this.activeModal = this.context.lobby_bigwheel_data;
						this.context.lobby_bigwheel_data.setBetLogs(this.logs);

						//Draw Modal layout and data
						this.drawRecord(this.logs.data);

						//Draw pagination
						this.drawPagination('bigwheellogs', 0, 0, this.countTotal, this.logs);
	        });
					break;

				case ("KAGA"):
					$.post(links.getKagaData, {}, (response) => {
						//Init header
						this.activeTblHeader = this.kagaTblHeader;
						this.logs = JSON.parse(response);
						this.countTotal = this.logs.last_page;

						//Draw Modal layout and data
						this.drawRecord(this.logs.data);

						//Draw pagination
						this.drawPagination('kagalogs', 0, 0, this.countTotal, this.logs);
	        });
					break;
			} //end switch
		},
		toggleDropdown() {
			if(!this.dropdownCon.visible) {
        this.dropdownCon.visible = true;
        createjs.Tween.get(this.dropdownCon)
	        .to({
	          y:0
	        }, 100, createjs.Ease.quadIn)
      } else {
        createjs.Tween.get(this.dropdownCon)
	        .to({
	          y:-5
	        }, 100, createjs.Ease.quadOut)
	        .call((e)=>{
	          e.visible = false;
	        }, [this.dropdownCon])
      }
		},
		drawRecord(data) {
			this.betTblHeader = [];
			let roundId = 0;
			let tabs = [];
			let tblHeader = this.activeTblHeader;
			let betHistTab = [];
			let betHistTabTxt = [];
			let totalWidth = 0;
			let betTblBorder = [];

			//Init array for table data
			let betDataGameNo = [];
			let betDataDate = [];
			let betDataTable = [];
			let betDataDealer = [];
			let betDataStartCred = [];
			let betDataTotalBet = [];
			let betDataTotalWin = [];
			let betDataNewCred = [];
			let betDataMarkCircle = [];
			let betDataMarkNum = [];
			let betDataMoreInfo = [];
			let betDataMoreInfoText = [];

			// Empty table data
			this.betRecordCon.removeAllChildren();
			this.betDataCon.removeAllChildren();

			// Close button
			let betRecordClose = new createjs.Text('X', 'bold 25px Arial', '#9e9e9e');
			betRecordClose.x = this.modalWidth - 30;
			betRecordClose.y = 10;
			betRecordClose.textAlign = 'center';
			this.betRecordCon.addChild(betRecordClose);

			// Close button hitarea
			let betRecordCloseHit = new createjs.Shape();
			betRecordCloseHit.graphics.beginFill("#fff").drawRect(0, 0, 25, 25);
			betRecordCloseHit.x = betRecordClose.x - 13;
			betRecordCloseHit.y = betRecordClose.y + 3;
			betRecordCloseHit.cursor = "pointer";
			betRecordCloseHit.alpha = 0.01;
			this.betRecordCon.addChild(betRecordCloseHit);

			betRecordCloseHit.addEventListener("mousedown", (e) => {
     		this.context.toggleView('thumbnail_bethistory');
      });

			let headerBg = new createjs.Shape();
			headerBg.graphics.beginFill('#333333').drawRect(0,0,this.modalWidth,850);
			headerBg.y = 80;
			this.betRecordCon.addChild(headerBg);

			let bodyBg = new createjs.Shape();
			bodyBg.graphics.beginFill('#d5d5d5').drawRect(0,0,this.modalWidth,670);
			bodyBg.y = headerBg.y + 80;
			this.betRecordCon.addChild(bodyBg);

			// Draw table header and border
			for (var i = 0; i < tblHeader.length; i++) {
				totalWidth += tblHeader[i].header_width;

				this.betTblHeader[i] = new createjs.Text(tblHeader[i].header_name, 'bold 19px Lato', '#9a9a9a');
				this.betTblHeader[i].x = totalWidth - (tblHeader[i].header_width / 2);
				this.betTblHeader[i].y = headerBg.y + 30;
				this.betTblHeader[i].textAlign = 'center';
				this.betRecordCon.addChild(this.betTblHeader[i]);

				if(window.language.locale == "zh") {
					this.betTblHeader[i].font = 'bold 24px Lato';
					this.betTblHeader[i].y = headerBg.y + 25;
				}

				betTblBorder[i] = new createjs.Shape();
		    betTblBorder[i].graphics.setStrokeStyle(1).beginStroke('#a9a9a9').moveTo(totalWidth, bodyBg.y).lineTo(totalWidth, 830);
		    this.betRecordCon.addChild(betTblBorder[i]);
			} //end for loop

			// Special condition
			if (this.dropdownText.name === 'KAGA') {
				this.drawKagaRecord(data);
				return;
			} else if (this.dropdownText.name === 'ALL') {
				this.drawAllRecord(data);
				return;
			}

			//Draw Bet history data
			for (var i = 0; i < data.length; i++) {
				let betHistory = JSON.parse(data[i].bet_history);
				let newCredit = 0;
				let startingMoney = 0;

				let newDate = '';
				if (data[i].created_at) {
					let timeDateSplit = data[i].created_at.split(' ');
					let timeSplit = timeDateSplit[1].split(':');
					let newHour = parseInt(timeSplit[0]) + parseInt(this.timezoneOffset);
					if (newHour > 24) {
						newHour -= 24;
					}
					newDate = timeDateSplit[0] +' '+ newHour + ':' + timeSplit[1] + ':' + timeSplit[2];
				}

				if (!betHistory) {
					continue;
				}

				//Starting Credit
				if (this.dropdownText.name == 'POKER' || this.dropdownText.name == 'BONUSPLUS') {
					startingMoney = 0;

					if (betHistory.ante) {
						startingMoney = betHistory.ante.user_money;
					}
				}
				else {
					startingMoney = betHistory[0].user_money;
				}

				let winMoney = 0;
				let totalMoney = 0;
				let totalWinMoney = 0;
				let betHistCon = JSON.parse(data[i].bet_history);

				//Calculate total win/lose money and total win
				if (this.dropdownText.name == 'POKER' || this.dropdownText.name == 'BONUSPLUS') {
					for (var j in betHistCon) {
						let winMoneyCon = 0;

						if (betHistCon[j].win != 0) {
							winMoney = betHistCon[j].win + betHistCon[j].bet;
							winMoneyCon = betHistCon[j].win + betHistCon[j].bet;
						}
						else {
							winMoney = betHistCon[j].win - betHistCon[j].bet;
						}

						totalMoney += winMoney;
						totalWinMoney += winMoneyCon;
					} // end for in
				}
				else {
					totalWinMoney = 0;

					for (var j = 0; j < betHistCon.length; j++) {
						let winMoneyCon = 0;

						if (betHistCon[j].win_money != 0) {
							winMoney = betHistCon[j].win_money + betHistCon[j].bet_money;
							winMoneyCon = betHistCon[j].win_money + betHistCon[j].bet_money;
						}
						else {
							winMoney = betHistCon[j].win_money - betHistCon[j].bet_money;
						}

						totalMoney += winMoney;
						totalWinMoney += winMoneyCon;
					} //end for loop
				}

				if (!data[i].total_rolling) {
					data[i].total_rolling = data[i].total_bet;
				}

				//New Credit Amount
				newCredit = (parseInt(startingMoney) - parseInt(data[i].total_bet) + parseInt(data[i].total_win));

				betDataGameNo[i] = new createjs.Text(data[i].round_num, 'bold 18px Lato', '#3b3b3b');
				betDataGameNo[i].x = this.betTblHeader[0].x;
				betDataGameNo[i].y = headerBg.y + 105 + (65 * i);
				betDataGameNo[i].textAlign = 'center';
				this.betDataCon.addChild(betDataGameNo[i]);

				betDataDate[i] = new createjs.Text(newDate, 'bold 18px Lato', '#3b3b3b');
				betDataDate[i].x = this.betTblHeader[1].x;
				betDataDate[i].y = headerBg.y + 105 + (65 * i);
				betDataDate[i].textAlign = 'center';
				this.betDataCon.addChild(betDataDate[i]);

				betDataTable[i] = new createjs.Text(data[i].table_id, 'bold 18px Lato', '#3b3b3b');
				betDataTable[i].x = this.betTblHeader[2].x;
				betDataTable[i].y = headerBg.y + 105 + (65 * i);
				betDataTable[i].textAlign = 'center';
				this.betDataCon.addChild(betDataTable[i]);

				betDataDealer[i] = new createjs.Text(data[i].name, 'bold 18px Lato', '#3b3b3b');
				betDataDealer[i].x = this.betTblHeader[3].x;
				betDataDealer[i].y = headerBg.y + 105 + (65 * i);
				betDataDealer[i].textAlign = 'center';
				this.betDataCon.addChild(betDataDealer[i]);

				betDataStartCred[i] = new createjs.Text(this.formatNumber(startingMoney), 'bold 18px Lato', '#3b3b3b');
				betDataStartCred[i].x = this.betTblHeader[4].x + 85;
				betDataStartCred[i].y = headerBg.y + 105 + (65 * i);
				betDataStartCred[i].textAlign = 'right';
				this.betDataCon.addChild(betDataStartCred[i]);

				betDataTotalBet[i] = new createjs.Text(this.formatNumber(data[i].total_bet), 'bold 18px Lato', '#3b3b3b');
				betDataTotalBet[i].x = this.betTblHeader[5].x + 60;
				betDataTotalBet[i].y = headerBg.y + 105 + (65 * i);
				betDataTotalBet[i].textAlign = 'right';
				this.betDataCon.addChild(betDataTotalBet[i]);

				//Total win money
				betDataTotalWin[i] = new createjs.Text(this.formatNumber(data[i].total_win), 'bold 18px Lato', '#3b3b3b');
				betDataTotalWin[i].x = this.betTblHeader[6].x + 60;
				betDataTotalWin[i].y = headerBg.y + 105 + (65 * i);
				betDataTotalWin[i].textAlign = 'right';
				this.betDataCon.addChild(betDataTotalWin[i]);

				betDataNewCred[i] = new createjs.Text(this.formatNumber(newCredit), 'bold 18px Lato', '#3b3b3b');
				betDataNewCred[i].x = this.betTblHeader[7].x + 80;
				betDataNewCred[i].y = headerBg.y + 105 + (65 * i);
				betDataNewCred[i].textAlign = 'right';
				this.betDataCon.addChild(betDataNewCred[i]);

				//Add child results from popup data
				this.activeModal.betResult.x = this.betTblHeader[8].x - 15;
				this.activeModal.betResult.y = headerBg.y + 115;
				this.betDataCon.addChild(this.activeModal.betResult);

				betDataMoreInfo[i] = new createjs.Shape();
				betDataMoreInfo[i].graphics.beginFill('#808080').drawCircle(0, 0, 15);
				betDataMoreInfo[i].x = this.betTblHeader[8].x + 18;
				betDataMoreInfo[i].y = headerBg.y + 115 + (65 * i);
				betDataMoreInfo[i].cursor = 'pointer';
				betDataMoreInfo[i].tableId = data[i].table_id;
				betDataMoreInfo[i].roundNum = data[i].round_num;
				betDataMoreInfo[i].betId = data[i].id;
				this.betDataCon.addChild(betDataMoreInfo[i]);

				betDataMoreInfoText[i] = new createjs.Text('i', 'italic 23px Lato', '#d5d5d5');
				betDataMoreInfoText[i].x = betDataMoreInfo[i].x - 2;
				betDataMoreInfoText[i].y = betDataMoreInfo[i].y - 15;
				betDataMoreInfoText[i].textAlign = 'center';
				this.betDataCon.addChild(betDataMoreInfoText[i]);

				((i) => {
					betDataMoreInfo[i].addEventListener("mousedown", (e) => {
						let roundDetails = {
							"round" : e.currentTarget.roundNum,
							"date"	: newDate,
							"width"	: this.modalWidth,
							"table"	: e.currentTarget.tableId,
							"betId"	: e.currentTarget.betId
						}

	     			this.detailModal = this.activeModal.showDetails(roundDetails);
	     			this.detailModal.visible = true;
						this.betDataCon.addChild(this.detailModal);
	        });
				}(i));
			}
		},

		drawAllRecord(data) {
			data = _.values(data);

			let betDataGameNo = [];
			let betDataDate = [];
			let betDataGameType = [];
			let betDataChannel = [];
			let betDataStartCred = [];
			let betDataTotalBet = [];
			let betDataTotalWin = [];
			let betDataNewCred = [];
			let betDataResult = [];
			let betDataMoreInfo = [];
			let betDataMoreInfoText = [];
			let kaIcon = [];

			for (var i = 0; i < data.length; i++) {
				let newDate = '';
				if (data[i].created_at) {
					let timeDateSplit = data[i].created_at.split(' ');
					let timeSplit = timeDateSplit[1].split(':');
					let newHour = parseInt(timeSplit[0]) + parseInt(this.timezoneOffset);
					if (newHour > 24) {
						newHour -= 24;
					}
					newDate = timeDateSplit[0] +' '+ newHour + ':' + timeSplit[1] + ':' + timeSplit[2];
				}

				let gameNo = data[i].round_num;
				if (data[i].game_type === 'Ka Gaming') {
					gameNo = data[i].round_id !== null ? data[i].round_id : '';
				}

				betDataGameNo[i] = new createjs.Text(gameNo, 'bold 18px Lato', '#3b3b3b');
				betDataGameNo[i].x = this.betTblHeader[0].x;
				betDataGameNo[i].y = 185 + (65 * i);
				betDataGameNo[i].textAlign = 'center';
				this.betDataCon.addChild(betDataGameNo[i]);

				betDataDate[i] = new createjs.Text(newDate, 'bold 18px Lato', '#3b3b3b');
				betDataDate[i].x = this.betTblHeader[1].x;
				betDataDate[i].y = 185 + (65 * i);
				betDataDate[i].textAlign = 'center';
				this.betDataCon.addChild(betDataDate[i]);

				let gameType = data[i].game_type;
				if (data[i].game_type === 'Flippy') {
					gameType = 'Baccarat';
				}

				betDataGameType[i] = new createjs.Text(gameType, 'bold 18px Lato', '#3b3b3b');
				betDataGameType[i].x = this.betTblHeader[2].x;
				betDataGameType[i].y = 185 + (65 * i);
				betDataGameType[i].textAlign = 'center';
				this.betDataCon.addChild(betDataGameType[i]);

				betDataChannel[i] = new createjs.Text(data[i].table_id, 'bold 18px Lato', '#3b3b3b');
				betDataChannel[i].x = this.betTblHeader[3].x;
				betDataChannel[i].y = 185 + (65 * i);
				betDataChannel[i].textAlign = 'center';
				this.betDataCon.addChild(betDataChannel[i]);

				betDataStartCred[i] = new createjs.Text(this.formatNumber(data[i].starting_credit), 'bold 18px Lato', '#3b3b3b');
				betDataStartCred[i].x = this.betTblHeader[4].x + 70;
				betDataStartCred[i].y = 185 + (65 * i);
				betDataStartCred[i].textAlign = 'right';
				this.betDataCon.addChild(betDataStartCred[i]);

				betDataTotalBet[i] = new createjs.Text(this.formatNumber(data[i].total_bet), 'bold 18px Lato', '#3b3b3b');
				betDataTotalBet[i].x = this.betTblHeader[5].x + 75;
				betDataTotalBet[i].y = 185 + (65 * i);
				betDataTotalBet[i].textAlign = 'right';
				this.betDataCon.addChild(betDataTotalBet[i]);

				betDataTotalWin[i] = new createjs.Text(this.formatNumber(data[i].total_win), 'bold 18px Lato', '#3b3b3b');
				betDataTotalWin[i].x = this.betTblHeader[6].x + 65;
				betDataTotalWin[i].y = 185 + (65 * i);
				betDataTotalWin[i].textAlign = 'right';
				this.betDataCon.addChild(betDataTotalWin[i]);

				let newAmt = parseInt(data[i].starting_credit) - parseInt(data[i].total_rolling) + parseInt(data[i].total_win);

				betDataNewCred[i] = new createjs.Text(this.formatNumber(newAmt), 'bold 18px Lato', '#3b3b3b');
				betDataNewCred[i].x = this.betTblHeader[7].x + 70;
				betDataNewCred[i].y = 185 + (65 * i);
				betDataNewCred[i].textAlign = 'right';
				this.betDataCon.addChild(betDataNewCred[i]);

				if (data[i].game_type === 'Ka Gaming') {
					let resultColor = data[i].game_result === 'WIN' ? '#008c07' : '#b54141';

					betDataResult[i] = new createjs.Text(data[i].game_result, 'bold 23px Lato', resultColor);
					betDataResult[i].x = this.betTblHeader[8].x - 15;
					betDataResult[i].y = 185 + (65 * i);
					betDataResult[i].textAlign = 'center';
					this.betDataCon.addChild(betDataResult[i]);

					let imgUrl = '';
					if (data[i].game_info === 'Bonus' || data[i].game_info === 'Free') {
						if (data[i].game_info === 'Bonus') {
							imgUrl = '/img/icons/kagaming/bonus_ico.png';
						}
						else {
							imgUrl = '/img/icons/kagaming/free_ico.png';
						}

						kaIcon[i] = new createjs.Bitmap(imgUrl);
						kaIcon[i].x = this.betTblHeader[8].x + 15;
						kaIcon[i].y = 173 + (65 * i);
						kaIcon[i].scaleX = kaIcon[i].scaleY = 0.75;
						kaIcon[i].textAlign = 'center';
						this.betDataCon.addChild(kaIcon[i]);
					}
				}
				else {
					betDataMoreInfo[i] = new createjs.Shape();
					betDataMoreInfo[i].graphics.beginFill('#808080').drawCircle(0, 0, 15);
					betDataMoreInfo[i].x = this.betTblHeader[8].x + 18;
					betDataMoreInfo[i].y = 80 + 115 + (65 * i);
					betDataMoreInfo[i].cursor = 'pointer';
					betDataMoreInfo[i].tableId = data[i].table_id;
					betDataMoreInfo[i].roundNum = data[i].round_num;
					betDataMoreInfo[i].gameType = data[i].game_type;
					betDataMoreInfo[i].betId = data[i].bet_id;
					this.betDataCon.addChild(betDataMoreInfo[i]);

					betDataMoreInfoText[i] = new createjs.Text('i', 'italic 23px Lato', '#d5d5d5');
					betDataMoreInfoText[i].x = betDataMoreInfo[i].x - 2;
					betDataMoreInfoText[i].y = betDataMoreInfo[i].y - 15;
					betDataMoreInfoText[i].textAlign = 'center';
					this.betDataCon.addChild(betDataMoreInfoText[i]);

					//Add child results from popup data
					this.activeModal.betResult.x = this.betTblHeader[8].x - 15;
					this.activeModal.betResult.y = 80 + 115;
					this.betDataCon.addChild(this.activeModal.betResult);

					((i) => {
						betDataMoreInfo[i].addEventListener("mousedown", (e) => {
							let roundDetails = {
								"round" : e.currentTarget.roundNum,
								"date"	: newDate,
								"width"	: this.modalWidth,
								"table"	: e.currentTarget.tableId,
								"betId"	: e.currentTarget.betId
							}

							if (this.detailModal !== undefined) {
								this.betDataCon.removeChild(this.detailModal);
							}

							if (e.currentTarget.gameType === 'Baccarat' || e.currentTarget.gameType === 'Flippy') {
	       				this.detailModal = this.context.lobby_baccarat_data.showDetails(roundDetails);
							}
							else if (e.currentTarget.gameType === 'Dragon Tiger') {
	       				this.detailModal = this.context.lobby_dragontiger_data.showDetails(roundDetails);
							}
							else if (e.currentTarget.gameType === "Texas Hold'Em") {
								this.detailModal = this.context.lobby_poker_data.showDetails(roundDetails);
							}
							else if (e.currentTarget.gameType === 'Sicbo') {
								this.detailModal = this.context.lobby_sicbo_data.showDetails(roundDetails);
							}
							else if (e.currentTarget.gameType === 'Super 6') {
								this.detailModal = this.context.lobby_supersix_data.showDetails(roundDetails);
							}
							else if (e.currentTarget.gameType === 'Dragon Bonus') {
								this.detailModal = this.context.lobby_dragonbonus_data.showDetails(roundDetails);
							}
							else if (e.currentTarget.gameType === 'Bonus Plus') {
								this.detailModal = this.context.lobby_bonusplus_data.showDetails(roundDetails);
							}

	       			this.detailModal.visible = true;
	  					this.betDataCon.addChild(this.detailModal);
		        });
					}(i));
				}
			} // end for loop
		},

		drawKagaRecord(data) {
			let betDataDate = [];
			let reelGame = [];
			let betDataStartCred = [];
			let betDataType = [];
			let betDataTotalBet = [];
			let betDataTotalWin = [];
			let betDataNewCred = [];
			let betDataResult = [];

			if (data.length) {
				if (!data[0].game_id) return;
			}

			for (var i = 0; i < data.length; i++) {
				let newDate = '';
				if (data[i].created_at) {
					let timeDateSplit = data[i].created_at.split(' ');
					let timeSplit = timeDateSplit[1].split(':');
					let newHour = parseInt(timeSplit[0]) + parseInt(this.timezoneOffset);
					if (newHour > 24) {
						newHour -= 24;
					}
					newDate = timeDateSplit[0] +' '+ newHour + ':' + timeSplit[1] + ':' + timeSplit[2];
				}

				betDataDate[i] = new createjs.Text(newDate, 'bold 18px Lato', '#3b3b3b');
				betDataDate[i].x = this.betTblHeader[0].x;
				betDataDate[i].y = 185 + (65 * i);
				betDataDate[i].textAlign = 'center';
				this.betDataCon.addChild(betDataDate[i]);

				reelGame[i] = new createjs.Text(data[i].game_id, 'bold 18px Lato', '#3b3b3b');
				reelGame[i].x = this.betTblHeader[1].x;
				reelGame[i].y = 185 + (65 * i);
				reelGame[i].textAlign = 'center';
				this.betDataCon.addChild(reelGame[i]);

				betDataStartCred[i] = new createjs.Text(this.formatNumber(data[i].old_amount), 'bold 18px Lato', '#3b3b3b');
				betDataStartCred[i].x = this.betTblHeader[2].x + 85;
				betDataStartCred[i].y = 185 + (65 * i);
				betDataStartCred[i].textAlign = 'right';
				this.betDataCon.addChild(betDataStartCred[i]);

				let betType = window.language.menu.normalsmall;
				if (data[i].type === 'play' && parseInt(data[i].is_free) === 1) {
					betType = window.language.menu.freeplay;
				} else if (data[i].type === 'credit') {
					betType = window.language.menu.bonussmall;
				}

				betDataType[i] = new createjs.Text(betType, 'bold 18px Lato', '#3b3b3b');
				betDataType[i].x = this.betTblHeader[3].x;
				betDataType[i].y = 185 + (65 * i);
				betDataType[i].textAlign = 'center';
				this.betDataCon.addChild(betDataType[i]);

				let betAmt = data[i].bet_amount;
				if (betType === window.language.menu.freeplay) betAmt = 0;

				betDataTotalBet[i] = new createjs.Text(this.formatNumber(betAmt), 'bold 18px Lato', '#3b3b3b');
				betDataTotalBet[i].x = this.betTblHeader[4].x + 85;
				betDataTotalBet[i].y = 185 + (65 * i);
				betDataTotalBet[i].textAlign = 'right';
				this.betDataCon.addChild(betDataTotalBet[i]);

				betDataTotalWin[i] = new createjs.Text(this.formatNumber(data[i].credit_amount), 'bold 18px Lato', '#3b3b3b');
				betDataTotalWin[i].x = this.betTblHeader[5].x + 85;
				betDataTotalWin[i].y = 185 + (65 * i);
				betDataTotalWin[i].textAlign = 'right';
				this.betDataCon.addChild(betDataTotalWin[i]);

				betDataNewCred[i] = new createjs.Text(this.formatNumber(data[i].new_amount), 'bold 18px Lato', '#3b3b3b');
				betDataNewCred[i].x = this.betTblHeader[6].x + 85;
				betDataNewCred[i].y = 185 + (65 * i);
				betDataNewCred[i].textAlign = 'right';
				this.betDataCon.addChild(betDataNewCred[i]);

				let resultData = parseInt(data[i].credit_amount) > 0 ? 'WIN' : 'LOSE';
				let resultColor = parseInt(data[i].credit_amount) > 0 ? '#008c07' : '#b54141';

				betDataResult[i] = new createjs.Text(resultData, 'bold 23px Lato', resultColor);
				betDataResult[i].x = this.betTblHeader[7].x;
				betDataResult[i].y = 185 + (65 * i);
				betDataResult[i].textAlign = 'center';
				this.betDataCon.addChild(betDataResult[i]);
			}
		},

		toggleTabs(tabs, count, betHistTab) {
			for (var i = 0; i < tabs.length; i++) {
				betHistTab[i].graphics.clear().beginFill('#262626').drawRect(0,0,220,80); //bet_hist_bg
			}

			betHistTab[count].graphics.clear().beginFill('#333333').drawRect(0,0,220,80); //bet_hist_tab_act
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
	       			this.paginate(record, e.currentTarget.pageNum, dataCon, false, (data) => {
		       			dataCon = JSON.parse(data);
						  	prevPageBtn.pageNum = dataCon.prev_page_url;
						  	nextPageBtn.pageNum = dataCon.next_page_url;
				        this.changeActivePage('page', countTotal, record, dataCon);
			        })
		        });
				}(x));
			} // end for loop

			//Previous page icon
			let prevPageBtn = new createjs.Shape();
			prevPageBtn.graphics.beginFill('#ff9b28').drawRect(0, 0, 20, 30);
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
        	this.paginate(record, e.currentTarget.pageNum, dataCon, true, (data) => {
	       		dataCon = JSON.parse(data);
				  	prevPageBtn.pageNum = dataCon.prev_page_url;
				  	nextPageBtn.pageNum = dataCon.next_page_url;
	        	this.changeActivePage('prev', countTotal, record, dataCon);
	        })
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
     			this.paginate(record, e.currentTarget.pageNum, dataCon, false, (data) => {
	       		dataCon = JSON.parse(data);
				  	prevPageBtn.pageNum = dataCon.prev_page_url;
				  	nextPageBtn.pageNum = dataCon.next_page_url;
	        	this.changeActivePage('first', countTotal, record, dataCon);
	        })
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
	        this.paginate(record, e.currentTarget.pageNum, dataCon, true, (data) => {
	       		dataCon = JSON.parse(data);
				  	prevPageBtn.pageNum = dataCon.prev_page_url;
				  	nextPageBtn.pageNum = dataCon.next_page_url;
	        	this.changeActivePage('next', countTotal, record, dataCon);
	        })
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
     			this.paginate(record, e.currentTarget.pageNum, dataCon, false, (data) => {
	       		dataCon = JSON.parse(data);
				  	prevPageBtn.pageNum = dataCon.prev_page_url;
				  	nextPageBtn.pageNum = dataCon.next_page_url;
	        	this.changeActivePage('last', countTotal, record, dataCon);
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
				let baseUrl = window.lobby_domain;
				pageUrl = baseUrl + type + '?page=' + pageNum;
			}

		    $.get(pageUrl, (response) => {
		    	container = JSON.parse(response);

		    	if (type !== 'kagalogs') {
			    	this.activeModal.paginateResult(response);
			    }

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

			this.drawPagination(record, currentArr, lowTenthNum, countTotal, dataCon);
			this.drawRecord(dataCon.data);
		},

		formatNumber(number) {
	      number = parseInt(number) || 0;
	      return number.toLocaleString('en');
	    },
	    resize () {
			var newWidth = window.innerWidth;
			var newHeight = window.innerHeight;
			var baseRatio = 1920 / 1080,

			newRatio = newWidth / newHeight;

			if(newRatio > baseRatio) {
				newWidth = newHeight * baseRatio;
			} else {
				newHeight = newWidth / baseRatio;
			}

			betHistory.canvas.width = newWidth;
			betHistory.canvas.height = newHeight;
			betHistory.scaleX = betHistory.scaleY = newWidth / 1920;
	    }
	});

	return instance;
}
