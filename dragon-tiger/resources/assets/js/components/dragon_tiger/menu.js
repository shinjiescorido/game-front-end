export default () => {

	let modalWidth = 0;
	let countSelectedChips = 5;
	let bgmodchips = [];
	let modchips = [];
	let chipCon = [];

	return new blu.Component({
		menu: [],
		menu_label: [],
		main() {
			
			let width = 100;

			this.menu_background = new createjs.Shape();
			this.x = this.context.context.width - width;
			this.menu_background.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0,0,width,this.context.context.height);
			this.addChild(this.menu_background);

			let menu_names = ["exit-menu-"+window.theme,"fullscreen-menu-"+window.theme,"howto-menu-"+window.theme,"videoRefresh-menu-"+window.theme,"playerInfo-menu-"+window.theme,"betRecords-menu-"+window.theme,"transfer-menu-"+window.theme,"modifyChips-menu-"+window.theme,
			"settings-menu-"+window.theme];

			let menu_text = [window.language.menu.exit,window.language.menu.fullscreen,window.language.menu.howtoplay,window.language.menu.refreshvideo,window.language.menu.playerinfo,
			window.language.menu.records,window.language.menu.transfer,window.language.menu.modifychips,window.language.menu.settings]

			for(var x = 0;x<menu_names.length;x++) {
				let menu_spritesheet_data = {
					images: [this.context.getResources([menu_names[x]])],
					frames: {width:100,height:87},
					animations: {
						"up": [0],
						"hover" : [1],
						"clicked" : [2]
					}
				}

				let menu_spriteSheet = new createjs.SpriteSheet(menu_spritesheet_data);
				this.menu[x] = new createjs.Sprite(menu_spriteSheet,"up");
				this.menu[x].scaleX = this.menu[x].scaleY = 1
				this.menu[x].y = x*this.menu[x].getTransformedBounds().height;
				this.menu[x].name = menu_names[x];
				this.addChild(this.menu[x]);

				this.menu[x].addEventListener("mousedown", (e) => {
			      	switch (event.which) {
			        case 1:
			        	e.target.gotoAndStop("clicked")
						this.menuClick(e.target.name);
			            break;
			    	}
		        });
				this.menu[x].addEventListener("pressup", (e) => {
					e.target.gotoAndStop("up")
				});

				this.menu[x].addEventListener("mouseover", (e) => {
					e.target.gotoAndStop("hover")
				});

				this.menu[x].addEventListener("mouseout", (e) => {
					e.target.gotoAndStop("up")
				});

			}

			for(var x = 0;x<9;x++) {

				this.menu_label[x] = new createjs.Text(menu_text[x],"12px arial",this.context.theme_color[window.theme].menu_text_color);
				this.menu_label[x].y = (this.menu[x].y) + 68;
				this.menu_label[x].x = 45;
				this.menu_label[x].textAlign = "center";
				this.addChild(this.menu_label[x]);
			}

			//Init modal / modal contents
			this.modalCon();
			this.howToPlay();
			this.playerInfo();
			this.transferFunds();
			this.modifyChips();
			this.settings();
			this.betRecords();

			// this.showMenuModal("BET RECORDS", 900, 500);
		}, //main

		modalCon() {
			//Menu Modal Container
			this.menuModal = new createjs.Container();
			this.menuModal.x = -460;
			this.menuModal.y = 0;
			this.menuModal.visible = false;
			this.menuModal.name = "";
			this.addChild(this.menuModal);

			//Modal Header
			this.modalHeader = new createjs.Shape();
			this.modalHeader.y = 300;

			//Header Text
			this.headerTxt = new createjs.Text("","bold 15px arial", this.context.theme_color[window.theme].labelcolor);
			this.headerTxt.x = this.modalHeader.x + 10;
			this.headerTxt.y = this.modalHeader.y + 9;

			//Header Close button
			this.headerClose = new createjs.Text("X","bold 15px arial", this.context.theme_color[window.theme].labelcolor);
			this.headerClose.y = this.modalHeader.y + 9;

			//Close button hitarea
			this.headerCloseHit = new createjs.Shape();
			this.headerCloseHit.graphics.beginFill("#000").drawRect(0, 0, 20, 20);
			this.headerCloseHit.y = this.headerClose.y;
			this.headerCloseHit.cursor = "pointer";
			this.headerCloseHit.alpha = 0.01;

			//Modal Body Bg
			this.modalBody = new createjs.Shape();
			this.modalBody.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0, 0, 0, 0);
			this.modalBody.y = this.modalHeader.y + 34;

			//How to Play Container
			this.howToPlayCon = new createjs.Container();
			this.howToPlayCon.y = this.modalHeader.y + 34;

			//Player Info container
			this.playerInfoCon = new createjs.Container();
			this.playerInfoCon.y = this.modalHeader.y + 34;

			//Bet Records container
			this.betRecordsCon = new createjs.Container();
			this.betRecordsCon.y = this.modalHeader.y + 34;

			//Transfer Funds container
			this.transferFundsCon = new createjs.Container();
			this.transferFundsCon.y = this.modalHeader.y + 34;

			//Modify chips container
			this.modifyChipsCon = new createjs.Container();
			this.modifyChipsCon.y = this.modalHeader.y + 34;
			this.modifyChipsCon.visible = false;

			//Settings container
			this.settingsCon = new createjs.Container();
			this.settingsCon.y = this.modalHeader.y + 34;

			//Add child to modal container
			this.menuModal.addChild(this.modalHeader, this.headerTxt, this.headerClose, this.headerCloseHit, this.modalBodyCon, this.modalBody, this.modifyChipsCon, this.transferFundsCon, this.playerInfoCon, this.settingsCon, this.howToPlayCon, this.betRecordsCon);

			//Close modal
			this.headerCloseHit.addEventListener("mousedown", (e) => {
		      	switch (event.which) {
		        case 1:
		        	this.menuModal.visible = false;
					this.menuModal.name = "";
		            break;
		    	}
	        });
		},

		howToPlay() {
			modalWidth = 450;

			this.howToPlayContent = new createjs.DOMElement(document.getElementById("howtowrap"));
			this.howToPlayContent.x = 20;
			this.howToPlayContent.y = 20;

			if (window.theme == "black") {
				$(".howtoheader").css("color","#ffa000");
				$(".howtocontent").css("color","#8d8d8d");
				document.styleSheets[2].addRule("::-webkit-scrollbar-track", "background: #1d1d1d;");
			}else{
				$(".howtoheader").css("color","#ff6828");
				$(".howtocontent").css("color","#4d4d4d");
				document.styleSheets[2].addRule("::-webkit-scrollbar-track", "background: #b2b2b2;");
			}
			$('#howtowrap').show();

			this.howToPlayCon.addChild(this.howToPlayContent);
		}, //howToPlay

		playerInfo() {
			let lineY = 50;
			let textY = 18;
			let line = [];
			let textLabel = ["PLAYER NAME", "PLAYER BALANCE", "GAME ROUND ID", "DEALER NAME", "CHANNEL"];

			for(var x = 0; x <= 4; x++) {
				line[x] = new createjs.Shape();
				line[x].graphics.setStrokeStyle(1).beginStroke("#4a4a4a");
				line[x].graphics.moveTo(0, lineY);
				line[x].graphics.lineTo(450, lineY);
				line[x].graphics.endStroke();

				textLabel[x] = new createjs.Text(textLabel[x],"bold 13px arial", this.context.theme_color[window.theme].labelcolor);
				textLabel[x].x = 50;
				textLabel[x].y = textY;

				lineY = lineY + 50;
				textY = textY + 50;
				this.playerInfoCon.addChild(line[x], textLabel[x]);
			}

			this.player = new createjs.Text("Kevin Villanueva","13px arial", this.context.theme_color[window.theme].modal_txt_color);
			this.player.x = 250;
			this.player.y = 18;

			this.balance = new createjs.Text("99,999,999","13px arial", this.context.theme_color[window.theme].modal_txt_color);
			this.balance.x = 250;
			this.balance.y = this.player.y + 50;

			this.round = new createjs.Text("Round 15","13px arial", this.context.theme_color[window.theme].modal_txt_color);
			this.round.x = 250;
			this.round.y = this.balance.y + 50;

			this.dealer = new createjs.Text("Janice","13px arial", this.context.theme_color[window.theme].modal_txt_color);
			this.dealer.x = 250;
			this.dealer.y = this.round.y + 50;

			this.channel = new createjs.Text("Dragon Tiger 1","13px arial", this.context.theme_color[window.theme].modal_txt_color);
			this.channel.x = 250;
			this.channel.y = this.dealer.y + 50;

			this.playerInfoCon.addChild(this.player, this.balance, this.round, this.dealer, this.channel);
		}, //playerInfo

		updatePlayerInfo(balance, round, dealer) {
			this.balance.text = balance;
			this.round.text = round;
			this.dealer.text = dealer;
		}, //updatePlayerInfo

		betRecordsTab: [],
		tabIcon: [],
		tabLbl: [],
		betRecords() {

			modalWidth = 900;

			let betRecordsIcon = ["transfer-"+window.theme, "bet-logs-"+window.theme, "game-history-"+window.theme];
			let betRecordsLbl = ["TRANSFER LOGS", "BET LOGS", "GAME HISTORY"];

			for (var i = 0; i < 3; i++) {
				this.betRecordsTab[i] = new createjs.Shape();
				this.betRecordsTab[i].graphics.beginFill(this.context.theme_color[window.theme].bet_record_tab).drawRect(0, 0, modalWidth / 3, 60);
				this.betRecordsTab[i].x = (modalWidth / 3) * i;
				this.betRecordsTab[i].cursor = "pointer";
				this.betRecordsTab[i].name = betRecordsIcon[i];

				let icon_spritesheet_data = {
					images: [this.context.getResources(betRecordsIcon[i])],
					frames: {width:20,height:20},
					animations: {
						"active": [0],
						"normal" : [1]
					}
				}
				let icon_spriteSheet = new createjs.SpriteSheet(icon_spritesheet_data);
				this.tabIcon[i] = new createjs.Sprite(icon_spriteSheet,"normal");
				this.tabIcon[i].x = ((modalWidth / 3) * i) + 130;
				this.tabIcon[i].y = 8;

				this.tabLbl[i] = new createjs.Text(betRecordsLbl[i],"bold 13px arial", "#2b2b2b");
				this.tabLbl[i].x = ((modalWidth / 3) * i) + 140;
				this.tabLbl[i].y = 35;
				this.tabLbl[i].textAlign = "center";

				if (i == 0) {
					this.betRecordsTab[i].graphics.clear().beginFill(this.context.theme_color[window.theme].bet_record_tab_act);
					this.tabIcon[i].gotoAndPlay("active");
					this.tabLbl[i].color = "#ff9b28";
				}

				this.betRecordsCon.addChild(this.betRecordsTab[i], this.tabIcon[i], this.tabLbl[i]);

				//Click tab event
				((i) => {
			       	this.betRecordsTab[i].addEventListener("mousedown", (e) => {
				      	switch (event.which) {
				        case 1:
				        	this.removeActiveTab();
				        	this.betRecordsTab[i].graphics.clear().beginFill(this.context.theme_color[window.theme].bet_record_tab_act);
							this.tabIcon[i].gotoAndPlay("active");
							this.tabLbl[i].color = "#ff9b28";

							// Chande data on display
							if(this.betRecordsTab[i].name == "transfer-"+window.theme){
								$(".transferlogsdata").show();
								$(".betlogsdata").hide();
								$(".gamehistorydata").hide();
							}else if(this.betRecordsTab[i].name == "bet-logs-"+window.theme){
								$(".transferlogsdata").hide();
								$(".betlogsdata").show();
								$(".gamehistorydata").hide();
							}else{
								$(".transferlogsdata").hide();
								$(".betlogsdata").hide();
								$(".gamehistorydata").show();
							}

				            break;
				    	}
			        });
			    }(i));
			} //for loop

			// Bet Logs Table
			this.tblBetRecords = new createjs.DOMElement(document.getElementById("tblcontainer"));
			this.tblBetRecords.x = 15;
			this.tblBetRecords.y = 75;

			if (window.theme == "black") {
				$(".btnpagination").css({'border':'1px solid #cb7f29', 'color':'#cb7f29'});
				$(".currentpage").css({'background':'#cb7f29', 'color':'#2b2b2b'});
				$("tbody").css("color", "#a7a7a7");
			}else{
				$(".btnpagination").css({'border':'1px solid #2b2b2b', 'color':'#565656'});
				$(".currentpage").css({'background':'#4d4d4d', 'color':'#ff9a28'});
				$("tbody").css("color", "#4d4d4d");
			}
			$('#tblcontainer').show();
			$(".transferlogsdata").show();

			// Bet Logs Table
			this.mdlDetails = new createjs.DOMElement(document.getElementById("vwdetails"));
			this.mdlDetails.x = 70;
			this.mdlDetails.y = 120;

			// CLose view details modal
			$(".closebtn").click(function(){
				$("#vwdetails").hide();
			});

			// Add child to Bet Records Container
			this.betRecordsCon.addChild(this.tblBetRecords, this.mdlDetails);

		}, //betRecords

		removeActiveTab() {
			for (var i = 0; i < 3; i++) {
				this.betRecordsTab[i].graphics.clear().beginFill(this.context.theme_color[window.theme].bet_record_tab).drawRect(0, 0, modalWidth / 3, 60);
				this.tabIcon[i].gotoAndPlay("normal");
				this.tabLbl[i].color = "#2b2b2b";
			}
		}, //changeActiveTab

		transferFunds() {
			modalWidth = 450;
			this.txtTitleFunds = new createjs.Text("Please enter amount to transfer.","bold 13px arial", this.context.theme_color[window.theme].labelcolor);
			this.txtTitleFunds.x = modalWidth / 2;
			this.txtTitleFunds.y = 15;
			this.txtTitleFunds.textAlign = "center";

			this.txtBalance = new createjs.Text("Your available balance.","bold 13px arial", this.context.theme_color[window.theme].modal_txt_color);
			this.txtBalance.x = modalWidth / 2;
			this.txtBalance.y = this.txtTitleFunds.y + 50;
			this.txtBalance.textAlign = "center";

			this.fundsBg = new createjs.Shape();
			this.fundsBg.graphics.beginFill("#ff9c28").drawRect(0, 0, modalWidth, 50);
			this.fundsBg.y = this.txtBalance.y + 25;

			this.txtTotalFunds = new createjs.Text("99,000,000","bold 23px arial", "#000");
			this.txtTotalFunds.x = modalWidth / 2;
			this.txtTotalFunds.y = this.fundsBg.y + 12;
			this.txtTotalFunds.textAlign = "center";

			this.newFunds = new createjs.DOMElement(document.getElementById("transferFunds"));
			this.newFunds.x = (modalWidth / 2) - 110;
			this.newFunds.y = this.fundsBg.y + 65;
			$('#transferFunds').show();

			//Button border
			this.btnTransfer = new createjs.Shape();
			this.btnTransfer.graphics.beginStroke(this.context.theme_color[window.theme].btnBorder);
			this.btnTransfer.graphics.setStrokeStyle(2);
			this.btnTransfer.graphics.drawRect(0, 0, 130, 30);
			this.btnTransfer.x = (modalWidth / 2) - 65;
			this.btnTransfer.y = this.newFunds.y + 50;

			//Button hit area
			this.btnTransferHit = new createjs.Shape();
			this.btnTransferHit.graphics.beginFill("#000").drawRect(0, 0, 130, 30);
			this.btnTransferHit.x = (modalWidth / 2) - 65;
			this.btnTransferHit.y = this.newFunds.y + 50;
			this.btnTransferHit.alpha = 0.01;
			this.btnTransferHit.cursor = "pointer";

			this.lblTransfer = new createjs.Text("TRANSFER","bold 13px arial", this.context.theme_color[window.theme].btnBorder);
			this.lblTransfer.x = modalWidth / 2;
			this.lblTransfer.y = this.newFunds.y + 58;
			this.lblTransfer.textAlign = "center";

			this.transferFundsCon.addChild(this.txtTitleFunds, this.txtBalance, this.fundsBg, this.txtTotalFunds, this.newFunds, this.btnTransfer, this.btnTransferHit, this.lblTransfer);

			//Transfer funds
			this.btnTransferHit.addEventListener("mousedown", (e) => {
		      	switch (event.which) {
		        case 1:
		        	alert(document.getElementById("transferFunds").value);
		            break;
		    	}
	        });
		},

		modifyChips() {
			modalWidth = 550;
			let selectedChips = "";
			let chipConX = 70;
			let selectedX = 70;
			let chipsX = 30;
			let chipsRowX = 30;
			let userchips = window.user_chips;
			let chip_names = ["single_chip_1k", "single_chip_3k", "single_chip_5k", "single_chip_10k", "single_chip_30k", "single_chip_50k", "single_chip_100k", "single_chip_200k", "single_chip_300k", "single_chip_500k", "single_chip_1000k", "single_chip_max"];

			//Modify Chips Body
			this.txtTitleModify = new createjs.Text("You can change chips here.","bold 13px arial", this.context.theme_color[window.theme].labelcolor);
			this.txtTitleModify.x = modalWidth / 2;
			this.txtTitleModify.y = 15;
			this.txtTitleModify.textAlign = "center";

			this.chipsBg = new createjs.Shape();
			this.chipsBg.graphics.beginFill("#000").drawRect(0, 0, modalWidth, 50);
			this.chipsBg.y = 100;
			if (window.theme == "white") {
				this.chipsBg.alpha = 0.3;
			}

			this.btnApply = new createjs.Shape();
			this.btnApply.graphics.beginFill("#ff9b28").drawRect(0, 0, 140, 40);
			this.btnApply.x = 120;
			this.btnApply.y = 370;
			this.btnApply.cursor = "pointer";

			this.txtBtnApply = new createjs.Text("APPLY NOW","bold 13px arial", "#000");
			this.txtBtnApply.x = this.btnApply.x + 70;
			this.txtBtnApply.y = this.btnApply.y + 13;
			this.txtBtnApply.textAlign = "center";

			//Button clear chips border
			this.btnClearChips = new createjs.Shape();
			this.btnClearChips.graphics.beginStroke(this.context.theme_color[window.theme].btnBorder);
			this.btnClearChips.graphics.setStrokeStyle(2);
			this.btnClearChips.graphics.drawRect(0, 0, 138, 38);
			this.btnClearChips.x = this.btnApply.x + 170;
			this.btnClearChips.y = this.btnApply.y + 1;

			//Button clear chips hit area
			this.btnClearChipsHit = new createjs.Shape();
			this.btnClearChipsHit.graphics.beginFill("#000").drawRect(0, 0, 138, 38);
			this.btnClearChipsHit.x = this.btnClearChips.x;
			this.btnClearChipsHit.y = this.btnClearChips.y;
			this.btnClearChipsHit.alpha = 0.01;
			this.btnClearChipsHit.cursor = "pointer";

			this.txtClearChips = new createjs.Text("CLEAR CHIPS","bold 13px arial", this.context.theme_color[window.theme].btnBorder);
			this.txtClearChips.x = this.btnClearChips.x + 70;
			this.txtClearChips.y = this.btnClearChips.y + 12;
			this.txtClearChips.textAlign = "center";

			this.modifyChipsCon.addChild(this.txtTitleModify, this.chipsBg, this.btnApply, this.txtBtnApply, this.btnClearChips, this.btnClearChipsHit, this.txtClearChips);

			//Click Apply Now button
			this.btnApply.addEventListener("mousedown", (e) => {
		      	switch (event.which) {
		        case 1:
		        	if (countSelectedChips == 5) {
			        	let newChip = "";
			        	window.user_chips = [];
			        	for (var i = 0; i < chipCon.length; i++) {
			        		let newChipSplit = chipCon[i].name.split('_');
			        		let multiplier = newChipSplit[2].substr(-1).toLowerCase();

			        		if (multiplier == "k") {
			        			newChip = newChipSplit[2].slice(0, -1);
			        			newChip = newChip+"000"
			        		}else{
			        			newChip =  newChipSplit[2];
			        		}

			        		window.user_chips.push(newChip);
			        	}

			        	this.context.component_chips.init(true);
			        	this.menuModal.name = "";
			        	this.menuModal.visible = false;
		        	}else{
		        		return false;
		        	}

		            break;
		    	}
	        });

	        //Click Clear Chips button
	        this.btnClearChipsHit.addEventListener("mousedown", (e) => {
		      	switch (event.which) {
		        case 1:
		        	for (var i = 0; i < chipCon.length; i++) {
		        		for (var x = 0; x < bgmodchips.length; x++) {
		        			if (modchips[x].name == chipCon[i].name) {
		        				createjs.Tween.get(modchips[x], { loop: false })
							  		.to({ x: bgmodchips[x].x, y: bgmodchips[x].y })

							  	chipCon[i].status = "vacant";
								chipCon[i].name = "";
								modchips[x].status = "notselected";
								countSelectedChips = countSelectedChips - 1;
		        			}
		        		}
		        	}
		            break;
		    	}
	        });

	        //Init selected chips container
			for(var x = 0; x < 5; x++) {
				chipCon[x] = new createjs.Bitmap(this.context.getResources("chip_container"));
				chipCon[x].scaleX = 0.65;
				chipCon[x].scaleY = 0.65;
				chipCon[x].x = chipConX;
				chipCon[x].y = 55;
				chipCon[x].status = "occupied";
				if (window.theme == "white") {
					chipCon[x].alpha = 0.5;
				}

				chipConX = chipConX + 85;

				this.modifyChipsCon.addChild(chipCon[x]);
			}

			//Init chips displayed in modal
			for(var i = 0; i < chip_names.length; i++) {
				//Background chips
				bgmodchips[i] = new createjs.Bitmap(this.context.getResources(chip_names[i]));
				bgmodchips[i].scaleX = 0.95;
				bgmodchips[i].scaleY = 0.95;
				bgmodchips[i].cursor = "pointer";
				bgmodchips[i].name = chip_names[i];
				bgmodchips[i].alpha = 0.3;

				//Chips used for selecting
				modchips[i] = new createjs.Bitmap(this.context.getResources(chip_names[i]));
				modchips[i].scaleX = 0.95;
				modchips[i].scaleY = 0.95;
				modchips[i].cursor = "pointer";
				modchips[i].name = chip_names[i];
				modchips[i].status = "notselected";

				if(i <= 5){
					bgmodchips[i].x = chipsX;
					bgmodchips[i].y = 180;
					modchips[i].x = chipsX;
					modchips[i].y = 180;
					chipsX = chipsX + 85;
				}else{
					bgmodchips[i].x = chipsRowX;
					bgmodchips[i].y = 270;
					modchips[i].x = chipsRowX;
					modchips[i].y = 270;
					chipsRowX = chipsRowX + 85;
				}

				for (var j = 0; j < 5; j++) {
					let condition = (isNaN(parseInt(userchips[j])) && userchips[j].toLowerCase() =="max")
					selectedChips  =  condition ? "single_chip_max" : "single_chip_"+ parseInt(userchips[j])/1000 +"k";
					if ( chip_names[i] == selectedChips ){
						modchips[i].status = "selected";
						modchips[i].x = selectedX;
						modchips[i].y = 55;
						selectedX = selectedX + 85;
						chipCon[j].name = chip_names[i];
					}
				}

				((i) => {
			       modchips[i].addEventListener("mousedown", (e) => {
				      	switch (event.which) {
				        case 1:
				        	if(modchips[i].status == "selected"){
				        		this.transferChips("remove", modchips[i])
				        	}else{
				        		this.transferChips("add", modchips[i])
				        	}
				            break;
				    	}
			        });
			    }(i));

				this.modifyChipsCon.addChild(bgmodchips[i], modchips[i]);
			}
		}, //modifyChips

		transferChips(action, chip) {
			if (action == "remove") {
				for (var i = 0; i < bgmodchips.length; i++) {
					if (bgmodchips[i].name == chip.name) {
						createjs.Tween.get(chip, { loop: false })
						  .to({ x: bgmodchips[i].x, y: bgmodchips[i].y })

						chip.status = "notselected";
						countSelectedChips = countSelectedChips - 1;
					}

					if (i < 5 && chipCon[i].name == chip.name) {
						chipCon[i].status = "vacant";
						chipCon[i].name = "";
					}
				}
			}else{
				for (var i = 0; i < chipCon.length; i++) {
					if (chipCon[i].status == "vacant" && countSelectedChips != 5) {
						createjs.Tween.get(chip, { loop: false })
						  .to({ x: chipCon[i].x, y: chipCon[i].y })

						chip.status = "selected";
						chipCon[i].name = chip.name;
						chipCon[i].status = "occupied";
						countSelectedChips = countSelectedChips + 1;
						return false;
					}
				}
			}
		}, //transferChips

		settings() {
			modalWidth = 250;
			let newVolume = "";
			let lblsettingsY = 0;
			let settingsName = [];
			let settingsToggle = [];
			let settingsCircle = [];
			let settingsToggleHit = [];
			let color = [];
			let lblSettingsArr = ["Sound Effects", "Voice", "Dark Theme", "Show Tutorial"];

			this.txtMasterVol = new createjs.Text("Master Volume","bold 13px arial", this.context.theme_color[window.theme].labelcolor);
			this.txtMasterVol.x = (modalWidth / 2) - 90;
			this.txtMasterVol.y = 25;

			//Init volume mute spritesheet
			let volumemute_spritesheet_data = {
				images: [this.context.getResources("volume-mute-"+window.theme)],
				frames: {width:21,height:20},
				animations: {
					"mute": [0],
					"normal" : [1]
				}
			}

			let volume_mute_spritesheet = new createjs.SpriteSheet(volumemute_spritesheet_data);
			this.volumeMute = new createjs.Sprite(volume_mute_spritesheet,"normal");
			this.volumeMute.x = this.txtMasterVol.x;
			this.volumeMute.y = this.txtMasterVol.y + 30;
			this.volumeMute.cursor =  "pointer";
			this.volumeMute.status =  "normal";


			//Init volume max spritesheet
			let volumemax_spritesheet_data = {
				images: [this.context.getResources("volume-max-"+window.theme)],
				frames: {width:24,height:20},
				animations: {
					"normal": [0],
					"mute" : [1]
				}
			}

			let volume_max_spritesheet = new createjs.SpriteSheet(volumemax_spritesheet_data);
			this.volumeMax = new createjs.Sprite(volume_max_spritesheet,"normal");
			this.volumeMax.x = this.volumeMute.x + 160;
			this.volumeMax.y = this.volumeMute.y;
			this.volumeMax.cursor = "pointer";
			this.volumeMax.status = "normal";

			//Volume line bg
			this.volumeBg = new createjs.Shape();
			this.volumeBg.graphics.beginFill("#1d1d1d").drawRoundRect(0, 0, 115, 4, 2);
			this.volumeBg.x = this.volumeMute.x + 30;
			this.volumeBg.y = this.volumeMute.y + 8;
			this.volumeBg.setBounds(0, 0, 115, 4);

			//Volume line bg
			this.volumeCurrent = new createjs.Shape();
			this.volumeCurrent.graphics.beginFill("#7cb342").drawRoundRect(0, 0, 115, 5, 2);
			this.volumeCurrent.x = this.volumeMute.x + 30;
			this.volumeCurrent.y = this.volumeMute.y + 8;
			this.volumeCurrent.setBounds(0, 0, 115, 5);

			this.volumeCircle = new createjs.Shape();
			this.volumeCircle.graphics.beginFill("#2e7d32").drawCircle(0, 0, 10);
			this.volumeCircle.x = this.volumeCurrent.x + 115;
			this.volumeCircle.y = this.volumeMute.y + 10;
			this.volumeCircle.cursor = "pointer";

			//Add child to settingsCon container
			this.settingsCon.addChild(this.txtMasterVol, this.volumeMute, this.volumeMax, this.volumeBg, this.volumeCurrent, this.volumeCircle);

			//Drag volume event
			this.volumeCircle.on("pressmove", (evt) => {
				let mouseCoor = this.globalToLocal(evt.stageX, evt.stageY)
				let volumeStart = this.volumeBg.x;
				let volumeEnd = this.volumeBg.x + this.volumeBg.getBounds().width;

				//270 is the amount to compensate for the negative x coordinate of the modal container
				evt.currentTarget.x = mouseCoor.x + 270;

				if (evt.currentTarget.x >= volumeStart && evt.currentTarget.x <= volumeEnd) {
					newVolume = evt.currentTarget.x - 65;
					this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, newVolume, 5, 2);
				}

				//Start and end points of volume
				if(evt.currentTarget.x <= volumeStart) {
					evt.currentTarget.x = volumeStart;
					this.volumeMute.gotoAndPlay("mute");
					this.volumeMax.gotoAndPlay("mute");
				}else if(evt.currentTarget.x >= volumeEnd){
					evt.currentTarget.x = volumeEnd;
				}

				if (evt.currentTarget.x > volumeStart) {
					this.volumeMute.gotoAndPlay("normal");
					this.volumeMax.gotoAndPlay("normal");
				}

			});

			//Mute volume button click event
			this.volumeMute.addEventListener("mousedown", (e) => {
		      	switch (event.which) {
		        case 1:
		        	newVolume = 0;
		        	this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, newVolume, 5, 2);
		        	this.volumeCircle.x = this.volumeCurrent.x;
					this.volumeMute.gotoAndPlay("mute");
					this.volumeMax.gotoAndPlay("mute");
		            break;
		    	}
	        });

			//Max volume button click event
	        this.volumeMax.addEventListener("mousedown", (e) => {
		      	switch (event.which) {
		        case 1:
		        	newVolume = 115;
		        	this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, newVolume, 5, 2);
		        	this.volumeCircle.x = this.volumeCurrent.x + newVolume;
					this.volumeMute.gotoAndPlay("normal");
					this.volumeMax.gotoAndPlay("normal");
		            break;
		    	}
	        });

			lblsettingsY = this.volumeMax.y + 50;
			for (var i = 0; i < lblSettingsArr.length; i++) {

				settingsName[i] = new createjs.Text(lblSettingsArr[i],"bold 13px arial", this.context.theme_color[window.theme].labelcolor);
				settingsName[i].x = this.volumeMute.x;
				settingsName[i].y = lblsettingsY;

				settingsToggle[i] = new createjs.Shape();
				settingsToggle[i].graphics.beginFill("#fff").drawRoundRect(0, 0, 65, 25, 14);
				settingsToggle[i].x = this.volumeMax.x - 40;
				settingsToggle[i].y = lblsettingsY - 3;

				settingsCircle[i] = new createjs.Shape();
				settingsCircle[i].graphics.beginFill("#2e7d32").drawCircle(0, 0, 10);
				settingsCircle[i].x = settingsToggle[i].x + 50;
				settingsCircle[i].y = settingsToggle[i].y + 12.5;

				// settingsCircle[i] = new createjs.Graphics();
				// settingsCircle[i].setStrokeStyle(1);
				// settingsCircle[i].beginStroke("#000000");
				// settingsCircle[i].beginFill("red");
				// settingsCircle[i].drawCircle(0,0,30);

				settingsToggleHit[i] = new createjs.Shape();
				settingsToggleHit[i].graphics.beginFill("#000").drawRoundRect(0, 0, 65, 25, 14);
				settingsToggleHit[i].x = this.volumeMax.x - 40;
				settingsToggleHit[i].y = lblsettingsY - 3;
				settingsToggleHit[i].cursor = "pointer";
				settingsToggleHit[i].status = "enabled";
				settingsToggleHit[i].alpha = "0.01";
				settingsToggleHit[i].name = lblSettingsArr[i];

				lblsettingsY = lblsettingsY + 40;
				this.settingsCon.addChild(settingsName[i], settingsToggle[i], settingsCircle[i], settingsToggleHit[i]);

				((i) => {
			       settingsToggleHit[i].addEventListener("mousedown", (e) => {
				      	switch (event.which) {
				        case 1:
				        	if(settingsToggleHit[i].status == "enabled"){
					        	createjs.Tween.get(settingsCircle[i], { loop: false })
								  	.to({ x: settingsCircle[i].x - 35 }, 100)

								settingsToggle[i].graphics.clear().beginFill("#424242").drawRoundRect(0, 0, 65, 25, 14);
								settingsCircle[i].graphics.clear().beginFill("#c62828").drawCircle(0, 0, 10);
								settingsToggleHit[i].status = "disabled";

								if (settingsToggleHit[i].name == "Dark Theme") {
									window.theme = "black";
									//location.reload();
								}
							}else{
								createjs.Tween.get(settingsCircle[i], { loop: false })
								  	.to({ x: settingsCircle[i].x + 35 }, 100)

								settingsToggle[i].graphics.clear().beginFill("#fff").drawRoundRect(0, 0, 65, 25, 14);
								settingsCircle[i].graphics.clear().beginFill("#2e7d32").drawCircle(0, 0, 10);
								settingsToggleHit[i].status = "enabled";

								if (settingsToggleHit[i].name == "Dark Theme") {
									window.theme = "white";
									//location.reload();
								}
							}
				            break;
				    	}
			        });
			    }(i));
			}

		}, //settings

		menuClick(buttonName) {
			if(buttonName == "exit-menu-"+window.theme+""){
				alert("12313")
			}
			else if(buttonName == "fullscreen-menu-"+window.theme+""){
				alert("fullscreen")
			}
			else if(buttonName == "howto-menu-"+window.theme+""){
				let toggle = this.toggleModal("howtoplay");
				if (toggle) {
					this.menuModal.name = "howtoplay";
					this.showMenuModal("HOW TO PLAY", 450, 500);
				}
			}
			else if(buttonName == "videoRefresh-menu-"+window.theme+""){
				alert("refresh")
			}
			else if(buttonName == "playerInfo-menu-"+window.theme+""){
				let toggle = this.toggleModal("playerinfo");
				if (toggle) {
					this.menuModal.name = "playerinfo";
					this.showMenuModal("PLAYER INFO", 450, 250);
				}
			}
			else if(buttonName == "betRecords-menu-"+window.theme+""){
				let toggle = this.toggleModal("betrecords");
				if (toggle) {
					this.menuModal.name = "betrecords";
					this.showMenuModal("BET RECORDS", 900, 500);
				}
			}
			else if(buttonName == "transfer-menu-"+window.theme+""){
				let toggle = this.toggleModal("transferFunds");
				if (toggle) {
					document.getElementById("transferFunds").value = "";
					this.menuModal.name = "transferFunds";
					this.showMenuModal("TRANSFER FUNDS", 450, 270);
				}
			}
			else if(buttonName == "modifyChips-menu-"+window.theme+""){
				let toggle = this.toggleModal("modifychips");
				if (toggle) {
					this.menuModal.name = "modifychips";
					this.showMenuModal("MODIFY CHIPS", 550, 440);
				}
			}
			else if(buttonName == "settings-menu-"+window.theme+""){
				let toggle = this.toggleModal("settings");
				if (toggle) {
					this.menuModal.name = "settings";
					this.showMenuModal("SETTINGS", 260, 270);
				}
			}
		}, //menuClick

		toggleModal(modalName) {
			if(this.menuModal.name != ""){
				if (this.menuModal.name == modalName) {
					this.menuModal.name = "";
					this.menuModal.visible = false;
					return false;
				}else{
					this.menuModal.name = "";
					this.menuModal.visible = false;
					return true;
				}
			}else{
				return true;
			}
		}, //toggleModal

		showMenuModal(btnName, bodyWidth, bodyHeight) {
			modalWidth = bodyWidth;
			this.menuModal.visible = false;
			this.headerTxt.text = btnName;
			this.menuModal.x = -bodyWidth - 10;
			this.headerClose.x = bodyWidth - 30;
			this.headerCloseHit.x = bodyWidth - 30;
			this.modalHeader.graphics.clear().beginLinearGradientFill([this.context.theme_color[window.theme].base_color, this.context.theme_color[window.theme].gradColor2], [.1, .9], 10, 10, 10, 35).drawRoundRect(0, 0, bodyWidth, 35, 3);
			this.modalBody.graphics.clear().beginFill(this.context.theme_color[window.theme].base_color).drawRect(0,0,bodyWidth,bodyHeight);
			this.menuModal.visible = true;

			//Display body contents to modal
			if(btnName == "HOW TO PLAY") {
				this.transferFundsCon.visible = false;
				this.modifyChipsCon.visible = false;
				this.settingsCon.visible = false;
				this.playerInfoCon.visible = false;
				this.betRecordsCon.visible = false;
				this.howToPlayCon.visible = true;
			}else if(btnName == "PLAYER INFO") {
				this.transferFundsCon.visible = false;
				this.modifyChipsCon.visible = false;
				this.settingsCon.visible = false;
				this.howToPlayCon.visible = false;
				this.betRecordsCon.visible = false;
				this.playerInfoCon.visible = true;
			}else if(btnName == "BET RECORDS") {
				this.transferFundsCon.visible = false;
				this.modifyChipsCon.visible = false;
				this.settingsCon.visible = false;
				this.howToPlayCon.visible = false;
				this.playerInfoCon.visible = false;
				this.betRecordsCon.visible = true;
			}else if(btnName == "MODIFY CHIPS") {
				this.playerInfoCon.visible = false;
				this.transferFundsCon.visible = false;
				this.settingsCon.visible = false;
				this.howToPlayCon.visible = false;
				this.betRecordsCon.visible = false;
				this.modifyChipsCon.visible = true;
			}else if(btnName == "TRANSFER FUNDS") {
				this.playerInfoCon.visible = false;
				this.modifyChipsCon.visible = false;
				this.settingsCon.visible = false;
				this.howToPlayCon.visible = false;
				this.betRecordsCon.visible = false;
				this.transferFundsCon.visible = true;
			}else if(btnName == "SETTINGS") {
				this.playerInfoCon.visible = false;
				this.modifyChipsCon.visible = false;
				this.transferFundsCon.visible = false;
				this.howToPlayCon.visible = false;
				this.betRecordsCon.visible = false;
				this.settingsCon.visible = true;
			}

		}, //showMenuModal

	})
}