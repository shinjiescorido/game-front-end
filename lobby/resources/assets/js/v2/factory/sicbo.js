import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';
import rmformat from '../../factories/formatter';
import sboard from '../../factories/scoreboard_draw';

let formatData = rmformat();
let drawSboard  = sboard();
let instance = null;

instance = {
	tables :[],
	makeListTables (data, _target, _timer_c,  x, self) {
   	this.tables[x] = _target.tables

		// === dealers
		this.tables[x].dealer_img_bg.x = 92
		this.tables[x].dealer_img_bg.y = 122 + this.tables[x].y

		this.tables[x].dealer_img.x = this.tables[x].dealer_img_bg.x + 180;
		this.tables[x].dealer_img.y = this.tables[x].dealer_img_bg.y  + 180;

		this.tables[x].dealer_name.text = data.currentDealer;
		this.tables[x].dealer_name.x = 92;
		this.tables[x].dealer_name.y = 190 + this.tables[x].y;
		this.tables[x].dealer_name.textAlign = "center";

		// === timer
		this.tables[x].timer.x =  -5;
		this.tables[x].timer.y =  this.tables[x].y + 24.8;

		// === game rounds
		let game_rounds_label = new createjs.Text(window.language.lobby.game ,"18px lato","#fff");
		game_rounds_label.x = 200;
		game_rounds_label.y = 84 + this.tables[x].y ;
		_target.addChild(game_rounds_label);

		if(window.language.locale == "zh") {
			game_rounds_label.font = "23px lato";
		}

		let game_label_height = game_rounds_label.getMeasuredHeight();
		this.tables[x].round_num.text = data.currentRound;
		this.tables[x].round_num.textAlign = "right";
		this.tables[x].round_num.x = 295;
		this.tables[x].round_num.y = game_rounds_label.y + game_label_height + 20;

		//=== table status
		let round_num_height = this.tables[x].round_num.getMeasuredHeight();
		this.tables[x].status.text = window.language.lobby.nowbetting;
		this.tables[x].status.x = game_rounds_label.x;
		this.tables[x].status.y = this.tables[x].round_num.y + round_num_height + 20;

		// === latest result
		let result_bg = new createjs.Shape();
		result_bg.graphics.beginFill("#3f3f3f").drawRect(0,0,170,284);
		result_bg.x = 350;
		result_bg.y =this.tables[x].y;
		_target.addChild(result_bg);

		let result_label = new createjs.Text(window.language.lobby.latestresult.toUpperCase(), window.language.locale == "zh" ? "25px latoregular" : "14px latoregular", "#fff");
		result_label.x = 438;

		if(window.language.locale == "zh") {
						result_label.y = 16 + this.tables[x].y - 10;
		} else {
						result_label.y = 16 + this.tables[x].y;
		}

		result_label.textAlign = "center";
		_target.addChild(result_label);

		let latest_res_bg = new createjs.Shape();
		latest_res_bg.graphics.ss(1).s("#d4d4d4").beginFill("#1c1c1c").drawRect(0,0,170,38);
		latest_res_bg.x = result_bg.x;
		latest_res_bg.y = 45 + this.tables[x].y;
		_target.addChild(latest_res_bg);

		// === set 5 dice result
		this.tables[x].lastdice_res_container = new createjs.Container();
		this.tables[x].lastdice_res_container.x = -15
		_target.addChild(this.tables[x].lastdice_res_container);
		// this.setResult(data);

		// === hot & cold results
		let hot_res = new createjs.Shape();
		hot_res.graphics.beginFill("#d32f2e").drawRect(0,0,75,284);
		hot_res.x = 520;
		hot_res.y =this.tables[x].y;

		let hot_text = new createjs.Text(window.language.sicbo.hotcaps, window.language.locale == "zh" ? "21px LatoRegular" : "16px LatoRegular","#fff");
		hot_text.textAlign = "center"
		hot_text.x = hot_res.x + 37.5;
		hot_text.y = hot_res.y + 5;
		_target.addChild(hot_res, hot_text);

		let cold_res = new createjs.Shape();
		cold_res.graphics.beginFill("#1665c1").drawRect(0,0,75,284);
		cold_res.x = 595;
		cold_res.y =this.tables[x].y;

		let cold_text = new createjs.Text(window.language.sicbo.coldcaps, window.language.locale == "zh" ? "21px LatoRegular" : "16px LatoRegular","#fff");
		cold_text.textAlign = "center";
		cold_text.x = cold_res.x + 37.5;
		cold_text.y = cold_res.y + 5;
		_target.addChild(cold_res, cold_text);

		this.tables[x].hot_cold_res_container = new createjs.Container();
		this.tables[x].hot_cold_res_container.y = this.tables[x].y + 28;
		this.tables[x].hot_cold_res_container.x = 557.5;
		_target.addChild(this.tables[x].hot_cold_res_container);

		let roadmap_bg = new createjs.Shape();
		roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,440,217);
		roadmap_bg.y = this.tables[x].y + 5;
		roadmap_bg.x = 805;
		_target.addChild(roadmap_bg);

		let lines = new createjs.Shape();
		lines.graphics.ss(.8).s("rgba(0,0,0,0.8)").moveTo(0,38)
		_target.addChild(lines);

		//pearl
		for(var i = 0; i <= 6; i++) {
			lines.graphics.moveTo(roadmap_bg.x,roadmap_bg.y+(36*i)).lineTo(roadmap_bg.x+440,roadmap_bg.y+(36*i))
		} // end for

		lines.graphics.moveTo(38,0);
		for(var i = 0; i <= 11; i++) {
			lines.graphics.moveTo((37*i) + roadmap_bg.x,roadmap_bg.y).lineTo((37*i)+ roadmap_bg.x,roadmap_bg.y+217)
		}

		// lines.shadow = new createjs.Shadow("#000",2,2,6);
		lines.alpha = .5;

		let scoreboard_text = [ window.language.sicbo.bigsmallcaps,window.language.sicbo.oddevencaps,window.language.sicbo.sumcaps, window.language.sicbo.dicecaps];
		let scoreboard_type = ["BIG/SMALL","ODD/EVEN","SUM", "DICE"];
		this.tables[x].button = [];

		for(var i = 0; i < scoreboard_text.length; i++) {
			this.tables[x].button[i] = new createjs.Shape();
			this.tables[x].button[i].graphics.beginLinearGradientFill(["#d9bf6b","#efde80","#d9bf6b"], [0,0.5,1], 0,0,120,0,100).drawRoundRect(0,0,120,50,6);
			this.tables[x].button[i].x = 675; // (i * 135) + 690
			this.tables[x].button[i].y = (5 + this.tables[x].y) + (i * 56);
			this.tables[x].button[i].type = scoreboard_type[i];
			this.tables[x].button[i].state = "normal";
			_target.addChild(this.tables[x].button[i]);

			this.tables[x].button[i].text = new createjs.Text(scoreboard_text[i], window.language.locale == "zh" ? "bold 25px LatoRegular" : "bold 18px LatoRegular" , "#000");
			this.tables[x].button[i].text.x = this.tables[x].button[i].x + (120/2);
			this.tables[x].button[i].text.y = this.tables[x].button[i].y + (50/2);
			this.tables[x].button[i].text.textAlign = "center";
			this.tables[x].button[i].text.textBaseline = "middle";
			this.tables[x].button[i].text.hitArea = this.tables[x].button[i];
			_target.addChild(this.tables[x].button[i].text);

			this.tables[x].button[i].changeState = function(e,type) {
				if (e.state == "active") return;

				if(type == "active") {
					e.graphics.clear().beginLinearGradientFill(["#8e7c45","#b59e58","#8e7c45"], [0,0.5,1], 0,0,120,0,100).drawRoundRect(0,0,120,50,6);
					e.text.color = "#fff";
				} else {
					e.graphics.clear().beginLinearGradientFill(["#d9bf6b","#efde80","#d9bf6b"], [0,0.5,1], 0,0,120,0,100).drawRoundRect(0,0,120,50,6);
					e.text.color = "#000";
				}
			} // end hover

			this.tables[x].button[i].on("mouseover",(e)=> {
				e.target.changeState(e.target,"active");
			});

			this.tables[x].button[i].on("mouseout",(e)=> {
				e.target.changeState(e.target);
			});

			this.tables[x].button[i].on("click", (e) => {
				this.tables[x].button.forEach((o) => {
				o.state = "normal";
				o.changeState(o);
				});
				e.target.changeState(e.target, "active");
				e.target.state = "active";

				this.tables[x].size_container.visible = false;
				this.tables[x].sum_container.visible = false;
				this.tables[x].dice_container.visible = false;
				this.tables[x].parity_container.visible = false;

				switch (e.target.type.toLowerCase()) {
					case "odd/even" :
						this.tables[x].parity_container.visible = true;
						break;
					case "big/small" :
						this.tables[x].size_container.visible = true;
						break;
					case "sum" :
						this.tables[x].sum_container.visible = true;
						break;
					case "dice" :
						this.tables[x].dice_container.visible = true;
						break;
				}
			});
		} // end for

		// default visible is size scoreboard
    this.tables[x].button[0].graphics.clear().beginLinearGradientFill(["#8e7c45","#b59e58","#8e7c45"], [0,0.5,1], 0,0,120,0,100).drawRoundRect(0,0,120,50,6);
    this.tables[x].button[0].state = "active";
    this.tables[x].button[0].text.color = "#fff";

    // === Room info
		this.tables[x].roomInfoCon = new createjs.Container();
		this.tables[x].roomInfoCon.x = 519;
		this.tables[x].roomInfoCon.y = this.tables[x].y + 229;
		this.tables[x].roomInfoCon.visible = false;
		_target.addChild(this.tables[x].roomInfoCon);

		if (parseInt(window.room_info) === 1) this.tables[x].roomInfoCon.visible = true;

		let roomInfoBg = new createjs.Shape();
		roomInfoBg.graphics.beginFill("#333333").drawRect(0, 0, 727, 55);
		this.tables[x].roomInfoCon.addChild(roomInfoBg);

		let usersIco = new createjs.Bitmap('/img/v2_1/icons/room_info/lobby_users.png');
		usersIco.x = 10;
		usersIco.y = 15;
		usersIco.scaleX = 1;
		usersIco.scaleY = 1;
		this.tables[x].roomInfoCon.addChild(usersIco);

		this.tables[x].userCount = new createjs.Text("0","20px bebasNeue","#b3b3b3");
		this.tables[x].userCount.x = usersIco.x + 35;
		this.tables[x].userCount.y = 16;
		this.tables[x].userCount.textAlign = 'left';
		this.tables[x].roomInfoCon.addChild(this.tables[x].userCount);

		let infoBigMark = new createjs.Shape();
		infoBigMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 11);
		infoBigMark.x = this.tables[x].userCount.x + 75;
		infoBigMark.y = 27;
		this.tables[x].roomInfoCon.addChild(infoBigMark);

		let bigMarkText = new createjs.Text(window.language.locale == "zh" ? "大" : "B", '15px Lato', '#fff');
		bigMarkText.x = infoBigMark.x;
		bigMarkText.y = infoBigMark.y - 9;
		bigMarkText.textAlign = 'center';
		this.tables[x].roomInfoCon.addChild(bigMarkText);

		this.tables[x].bigBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
		this.tables[x].bigBetAmt.x = infoBigMark.x + 20;
		this.tables[x].bigBetAmt.y = 16;
		this.tables[x].bigBetAmt.textAlign = 'left';
		this.tables[x].roomInfoCon.addChild(this.tables[x].bigBetAmt);

		this.tables[x].infoSmallMark = new createjs.Shape();
		this.tables[x].infoSmallMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 11);
		this.tables[x].infoSmallMark.x = this.tables[x].bigBetAmt.x + 130;
		this.tables[x].infoSmallMark.y = 27;
		this.tables[x].roomInfoCon.addChild(this.tables[x].infoSmallMark);

		this.tables[x].smallMarkText = new createjs.Text(window.language.locale == "zh" ? "小" : "S", '15px Lato', '#fff');
		this.tables[x].smallMarkText.x = this.tables[x].infoSmallMark.x;
		this.tables[x].smallMarkText.y = this.tables[x].infoSmallMark.y - 9;
		this.tables[x].smallMarkText.textAlign = 'center';
		this.tables[x].roomInfoCon.addChild(this.tables[x].smallMarkText);

		this.tables[x].smallBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
		this.tables[x].smallBetAmt.x = this.tables[x].infoSmallMark.x + 20;
		this.tables[x].smallBetAmt.y = 16;
		this.tables[x].smallBetAmt.textAlign = 'left';
		this.tables[x].roomInfoCon.addChild(this.tables[x].smallBetAmt);

		this.tables[x].infoOddMark = new createjs.Shape();
		this.tables[x].infoOddMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 11);
		this.tables[x].infoOddMark.x = this.tables[x].smallBetAmt.x + 130;
		this.tables[x].infoOddMark.y = 27;
		this.tables[x].roomInfoCon.addChild(this.tables[x].infoOddMark);

		this.tables[x].oddMarkText = new createjs.Text(window.language.locale == "zh" ? "单" : "O", '15px Lato', '#fff');
		this.tables[x].oddMarkText.x = this.tables[x].infoOddMark.x;
		this.tables[x].oddMarkText.y = this.tables[x].infoOddMark.y - 9;
		this.tables[x].oddMarkText.textAlign = 'center';
		this.tables[x].roomInfoCon.addChild(this.tables[x].oddMarkText);

		this.tables[x].oddBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
		this.tables[x].oddBetAmt.x = this.tables[x].infoOddMark.x + 20;
		this.tables[x].oddBetAmt.y = 16;
		this.tables[x].oddBetAmt.textAlign = 'left';
		this.tables[x].roomInfoCon.addChild(this.tables[x].oddBetAmt);

		this.tables[x].infoEvenMark = new createjs.Shape();
		this.tables[x].infoEvenMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 11);
		this.tables[x].infoEvenMark.x = this.tables[x].oddBetAmt.x + 130;
		this.tables[x].infoEvenMark.y = 27;
		this.tables[x].roomInfoCon.addChild(this.tables[x].infoEvenMark);

		this.tables[x].evenMarkText = new createjs.Text(window.language.locale == "zh" ? "双" : "E", '15px Lato', '#fff');
		this.tables[x].evenMarkText.x = this.tables[x].infoEvenMark.x;
		this.tables[x].evenMarkText.y = this.tables[x].infoEvenMark.y - 9;
		this.tables[x].evenMarkText.textAlign = 'center';
		this.tables[x].roomInfoCon.addChild(this.tables[x].evenMarkText);

		this.tables[x].evenBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
		this.tables[x].evenBetAmt.x = this.tables[x].infoEvenMark.x + 20;
		this.tables[x].evenBetAmt.y = 16;
		this.tables[x].evenBetAmt.textAlign = 'left';
		this.tables[x].roomInfoCon.addChild(this.tables[x].evenBetAmt);

		if (window.language.locale === "zh") {
			bigMarkText.y += 1;
			this.tables[x].smallMarkText.y += 1;
			this.tables[x].oddMarkText.y += 1;
			this.tables[x].evenMarkText.y += 1;
		}

		this.setRoomInfo(data.betInfo, x, data.totalBettingUsers);

		// === scoreboard/roadmap containers
		let mask = new createjs.Shape();
		mask.graphics.beginFill("red").drawRect(0,this.tables[x].y,580,225);
		mask.x = 670;

		this.tables[x].parity_container = new createjs.Container();
		this.tables[x].parity_container.visible =false;
		this.tables[x].parity_container.mask = mask;
		this.tables[x].parity_container.x =685
		_target.addChild(this.tables[x].parity_container);

		this.tables[x].size_container = new createjs.Container();
		this.tables[x].size_container.visible = true;
		this.tables[x].size_container.mask = mask;
		this.tables[x].size_container.x = 685
		_target.addChild(this.tables[x].size_container);

		this.tables[x].dice_container = new createjs.Container();
		this.tables[x].dice_container.visible = false;
		this.tables[x].dice_container.mask = mask;
		this.tables[x].size_container.x =685
		_target.addChild(this.tables[x].dice_container);

		this.tables[x].sum_container = new createjs.Container();
		this.tables[x].sum_container.visible = false;
		this.tables[x].sum_container.mask = mask;
		this.tables[x].sum_container.x =685
		_target.addChild(this.tables[x].sum_container);

		_target.addChild(this.tables[x].bet_range_container);

		//Maintenance
		let header_bg = [];
		let text_color = "";

		this.tables[x].maintenanceCon = new createjs.Container();
		this.tables[x].maintenanceCon.visible = false;
		_target.addChild(this.tables[x].maintenanceCon);

		if(data.roomType == "p") {
			header_bg = ["#8e24aa","#4d158d"];
			text_color = "#efb052";
		} else if(data.roomType == "v") {
			header_bg = ["#fedd78","#d5a515"];
			text_color = "#000";
		} else {
			header_bg = ["#00838f","#005044"];
			text_color = "#efb052";
		}

		this.tables[x].maintenanceBg = new createjs.Shape();
		this.tables[x].maintenanceBg.graphics.beginFill("#333333").drawRoundRect(0, 0, 1250, 283, 6);
		this.tables[x].maintenanceBg.x = this.tables[x].x;
		this.tables[x].maintenanceBg.y = this.tables[x].y + 1;
		this.tables[x].maintenanceBg.table_id = data.tableNumber;
		this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceBg);

		this.tables[x].maintenanceHeader = new createjs.Shape();
		this.tables[x].maintenanceHeader.x = this.tables[x].x;
		this.tables[x].maintenanceHeader.y = this.tables[x].y - 1;
		this.tables[x].maintenanceHeader.graphics.beginLinearGradientFill(["#960000", "#2a0001"],[0,1],0,0,1250,10).drawRoundRectComplex(0,0,1250,285,10,10,0,0);
		this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceHeader);

		this.tables[x].table_name = new createjs.Text(window.language.lobby.sicbo,"bold 20px ArvoItalic","#fdba44");
		this.tables[x].table_name.x = 80;
		this.tables[x].table_name.y = 13 + this.tables[x].y;
		this.tables[x].maintenanceCon.addChild(this.tables[x].table_name);

		this.tables[x].table_num = new createjs.Text(data.tableNumber.length < 2 ? "0"+data.tableNumber : data.tableNumber,"21px ArvoBold","#fdba44");
		this.tables[x].table_num.x = 40; //this.tables[x].table_name.x - (this.tables[x].table_name.getBounds().width / 2) - 10;
		this.tables[x].table_num.y = 11 + this.tables[x].y;
		this.tables[x].maintenanceCon.addChild(this.tables[x].table_num);

		this.tables[x].maintenanceLogo = new createjs.Bitmap(self.context.load.getResources("maintenance_ico"));
		this.tables[x].maintenanceLogo.x = 30;
		this.tables[x].maintenanceLogo.y = 90 + this.tables[x].y;
		this.tables[x].maintenanceLogo.scaleX = this.tables[x].maintenanceLogo.scaleY = 0.85;
		this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceLogo);

		this.tables[x].maintenanceTxt = new createjs.Text('', '30px bebasneue', '#ffb547');
		this.tables[x].maintenanceTxt.x = 205;
		this.tables[x].maintenanceTxt.y = 110 + this.tables[x].y;
		this.tables[x].maintenanceTxt.textAlign = 'left';
		this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceTxt);

		this.tables[x].maintenanceSubTxt = new createjs.Text('', '28px bebasneue', '#fff');
		this.tables[x].maintenanceSubTxt.x = 205;
		this.tables[x].maintenanceSubTxt.y = 150 + this.tables[x].y;
		this.tables[x].maintenanceSubTxt.textAlign = 'left';
		this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceSubTxt);

		this.tables[x].maintenanceTime = new createjs.Text('', '26px bebasneue', '#fff');
		this.tables[x].maintenanceTime.x = 205;
		this.tables[x].maintenanceTime.y = 185 + this.tables[x].y;
		this.tables[x].maintenanceTime.textAlign = 'left';
		this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceTime);

		this.checkMaintenance(data, false, x);

		this.setResult(data, _target, _timer_c, x, self);
		this.setHotColdResult(data, _target, _timer_c, x, self);
		this.drawRoadMap(data, _target, _timer_c, x, self);
	},
	setRoomInfo(data, x, totalBettingUsers) {
	  	this.resetRoomInfo(x);

			if (!data) return;

			if (data.big) {
				this.tables[x].bigBetAmt.text = `${numberWithCommas(data.big.totalBets)}/${numberWithCommas(data.big.totalUsers)}`;
			}

			if (data.small) {
				this.tables[x].smallBetAmt.text = `${numberWithCommas(data.small.totalBets)}/${numberWithCommas(data.small.totalUsers)}`;
			}

			if (data.odd) {
				this.tables[x].oddBetAmt.text = `${numberWithCommas(data.odd.totalBets)}/${numberWithCommas(data.odd.totalUsers)}`;
			}

			if (data.even) {
				this.tables[x].evenBetAmt.text = `${numberWithCommas(data.even.totalBets)}/${numberWithCommas(data.even.totalUsers)}`;
			}

			this.tables[x].userCount.text = numberWithCommas(totalBettingUsers);
	  },
	  resetRoomInfo(x) {
	  	this.tables[x].bigBetAmt.text = '0/0';
	  	this.tables[x].smallBetAmt.text = '0/0';
	  	this.tables[x].oddBetAmt.text = '0/0';
	  	this.tables[x].evenBetAmt.text = '0/0';
	  	this.tables[x].userCount.text = '0';
	  },
  checkMaintenance (maintenanceData, socket, x) {
		if(!this.tables || !this.tables[x] || !this.tables[x].maintenanceCon) return;

		if (window.userAuthority === "admin") return;

		let maintenance = false;
   	let activeMaintenance = [];
		let mainText = '';
		let subText = '';

  	let mainMaintenance = maintenanceData.mainMaintenance.status;
  	let maintenanceSetting = maintenanceData.maintenanceSetting;
  	for (var i = 0; i < maintenanceSetting.length; i++) {
   		if (maintenanceSetting[i].status == 1) {
    		maintenance = true;
    		activeMaintenance = maintenanceSetting[i];
   		}
  	}

    if (activeMaintenance.status === undefined) return;

		let newStartTime = setCurrentTimezone(activeMaintenance.start_time);
		let newEndTime = setCurrentTimezone(activeMaintenance.end_time);

    if (parseInt(activeMaintenance.main_text) == 1) {
			mainText = window.language.lobby.maintextCap1;
		}
		else if (parseInt(activeMaintenance.main_text) == 2) {
			mainText = window.language.lobby.maintextCap2;
		}
		else if (parseInt(activeMaintenance.main_text) == 3) {
			mainText = window.language.lobby.maintextCap3;
		}

		if (parseInt(activeMaintenance.sub_text) == 1) {
			subText = window.language.lobby.subtextCap1;
		}
		else if (parseInt(activeMaintenance.sub_text) == 2) {
			subText = window.language.lobby.subtextCap2;
		}
		else if (parseInt(activeMaintenance.sub_text) == 3) {
			subText = window.language.lobby.subtextCap3;
		}

  	if (maintenance) {
    	this.tables[x].maintenanceCon.visible = true;
    	this.tables[x].maintenanceTxt.text = mainText;
    	this.tables[x].maintenanceSubTxt.text = subText;
   		this.tables[x].maintenanceTime.text = newStartTime +' ~ '+ newEndTime;
	  }
	  else {
	  	this.tables[x].maintenanceCon.visible = false;
	  }
  },
  setResult (data, _target, _timer_c,  x, self, socket) {
		if(!this.tables[x] || !this.tables[x].lastdice_res_container) return;

		data.marks = _.filter(data.marks,(row)=>{
			if('game_info' in row) {
				return row;
			}
		});

		this.tables[x].dice = [];
		this.tables[x].size = [];
		this.tables[x].total = [];

		this.tables[x].lastdice_res_container.removeAllChildren();

		let last150 = null;
		if(data.marks.length > 5) {
			last150 = data.marks.slice(Math.max(data.marks.length - 6, 1)).reverse();
		} else if (data.marks.length <= 5){
			last150 = data.marks.reverse();
		}

		last150 = _.filter(last150, (data) => {
			if(data.game_info) return data;
		});

		last150 = _.filter(last150,  (row) => {
			if(typeof row.game_info === 'string') {
				row.game_info = JSON.parse(row.game_info)
			}
			return row.game_info;
		});

		for(var i = 0; i < last150.length; i++) {
			let dice = last150[i].game_info.one +""+ last150[i].game_info.two +""+ last150[i].game_info.three;

			if(dice == "") dice = "123";

			this.tables[x].dice.push({
				dice1 : new createjs.Bitmap(self.context.load.getResources("dice-" + dice[0])),
				dice2 : new createjs.Bitmap(self.context.load.getResources("dice-" + dice[1])),
				dice3 : new createjs.Bitmap(self.context.load.getResources("dice-" + dice[2])),
        isVoid : last150[i].isVoid ? true : false
			});

			if(this.tables[x].dice[i].isVoid) {
        let voidContainer = new createjs.Container();
        voidContainer.isVoid = true;

        var voidShape = new createjs.Shape();
        voidShape.graphics.beginFill("#212120").drawRect(0,0,168,38);
        voidShape.y =  (i * 37) + 45
        voidShape.x =  366;
        voidShape.isVoid = true;
        voidContainer.addChild(voidShape);

        var voidText = new createjs.Text("GAME VOID", " bold 16px lato", "#fff");
        voidText.set({x: 384, y: ((i*37) + 45) + (38/2), textBaseline: 'middle'})
        voidContainer.addChild(voidText);

        var voidImg = new createjs.Bitmap(self.context.load.getResources("void"));
        voidImg.set({x: voidText.x + voidText.getMeasuredWidth() + 12, y: ((i*37) + 45) + (38/2), regY : voidImg.getBounds().height/2});
        voidContainer.addChild(voidImg);

        this.tables[x].lastdice_res_container.addChild(voidContainer);
      }

			this.tables[x].lastdice_res_container.addChild(this.tables[x].dice[i].dice1);
			this.tables[x].lastdice_res_container.addChild(this.tables[x].dice[i].dice2);
			this.tables[x].lastdice_res_container.addChild(this.tables[x].dice[i].dice3);

			this.tables[x].dice[i].dice1.y = this.tables[x].y + (i*37) + 51.5;
			this.tables[x].dice[i].dice2.y = this.tables[x].y + (i*37) + 51.5;
			this.tables[x].dice[i].dice3.y = this.tables[x].y + (i*37) + 51.5;

			this.tables[x].dice[i].dice1.x = 150 + 235;
			this.tables[x].dice[i].dice2.x = 180 + 235;
			this.tables[x].dice[i].dice3.x = 210 + 235;

			this.tables[x].dice[i].dice1.scaleX = this.tables[x].dice[i].dice1.scaleY = 0.3;
			this.tables[x].dice[i].dice2.scaleX = this.tables[x].dice[i].dice2.scaleY = 0.3;
			this.tables[x].dice[i].dice3.scaleX = this.tables[x].dice[i].dice3.scaleY = 0.3;


			let total = _.reduce(dice.split("") , function (sum, n) {
				return parseInt(sum) + parseInt(n);
			});

			let uniqDice = _.uniq(dice.split(""));

			let text;

      if(window.language.locale == "zh") {
        text = uniqDice.length == 1 ? "和" : (total >= 11 ? "大" : "小");
        this.tables[x].size[i] = new createjs.Text(text, "25px BebasNeue", text == "和" ? "#3aa955" : (text == "大" ? "#d22f2f" : "#1665c1"));
        this.tables[x].total[i] = new createjs.Text(total, "25px BebasNeue", text == "和" ? "#3aa955" : (text == "大" ? "#d22f2f" : "#1665c1"));
      } else {
        text = uniqDice.length == 1 ? "T" : (total >= 11 ? "B" : "S");
        this.tables[x].size[i] = new createjs.Text(text, "26px BebasNeue", text == "T" ? "#3aa955" : (text == "B" ? "#d22f2f" : "#1665c1"));
        this.tables[x].total[i] = new createjs.Text(total, "26px BebasNeue", text == "T" ? "#3aa955" : (text == "B" ? "#d22f2f" : "#1665c1"));
      }

			this.tables[x].size[i].x = this.tables[x].dice[i].dice3.x + 34;
			this.tables[x].size[i].y = this.tables[x].dice[i].dice3.y + 14.5;
			this.tables[x].size[i].textBaseline = "middle";
			this.tables[x].lastdice_res_container.addChild(this.tables[x].size[i]);

			if(window.language.locale == "zh") {
				this.tables[x].total[i].x = this.tables[x].size[i].x + 25;
      } else {
				this.tables[x].total[i].x = this.tables[x].size[i].x + 14;
      }

			this.tables[x].total[i].y = this.tables[x].size[i].y;
			this.tables[x].total[i].textBaseline = "middle";
			this.tables[x].lastdice_res_container.addChild(this.tables[x].total[i]);

		}

		this.tables[x].lastdice_res_container.children = this.tables[x].lastdice_res_container.children.reverse()
		let shouldAnimate = true;
		for(var i = this.tables[x].lastdice_res_container.children.length-1; i >= this.tables[x].lastdice_res_container.children.length-5; i--) {

      if(this.tables[x].lastdice_res_container.children[i].isVoid) {
      	shouldAnimate = false;
      }

      if(shouldAnimate) {
	      createjs.Tween.get(this.tables[x].lastdice_res_container.children[i])
	        .to({  alpha: 180 }, 180)
	        .to({ alpha: 0 }, 180)
	        .to({ alpha: 1 }, 180)
	        .to({ alpha: 0 }, 180)
	        .to({ alpha: 1 }, 180)
      }
    }

		let text = "";
		if(data.roundStatus.toLowerCase() == "p"){
			text = window.window.language.lobby.result;
		} else if( data.roundStatus.toLowerCase() == "s"){
			text = window.window.language.lobby.nowbetting;
		} else if(data.roundStatus.toLowerCase() == "E") {
			text = window.window.language.lobby.bettingend;
		}
		this.tables[x].status.text = text;

  },
  setHotColdResult (data, _target, _timer_c,  x, self, socket) {
		if(this.tables[x].hot_cold_res_container) {
			this.tables[x].hot_cold_res_container.removeAllChildren();
		}

		let marks = data.marks;

		marks = _.filter(marks, (row)=>{
			return row.game_info
		});

		marks = _.filter(marks, (row)=>{
			 if(row.game_info) return row.game_info
		});

		marks = _.filter(marks,  (row) => {
			if(typeof row.game_info === 'string') {
				row.game_info = JSON.parse(row.game_info)
			}
      return row.game_info && !row.isVoid
		});

		marks.forEach(function (row) {
			row.total = _.reduce( [row.game_info.one, row.game_info.two, row.game_info.three] , function (sum, n) {
				return parseInt(sum) + parseInt(n);
			});
		});

		let res =_.sortBy( _.groupBy(marks, function(row) {
		 	return row.total
		 }), 'length');

		let cold_res = res.slice(0,5);

		let hot_res = res.slice(Math.max(res.length - 5, 1));

    hot_res = hot_res.reverse();

		hot_res = _.map(hot_res, function (e) {
			return isNaN(e[0].total) ? 1 : e[0].total;
		});

		cold_res = _.map(cold_res, function (e) {
			return isNaN(e[0].total) ? 1 : e[0].total;
		});

		hot_res.forEach( (e, i) => {
			let text = new createjs.Text(e, "26px BebasNeue" ,"#fff");
			text.y = i*42;
			text.textAlign = "center";
			this.tables[x].hot_cold_res_container.addChild(text)
		});

		cold_res.forEach((e, i) =>{
			let text = new createjs.Text(e, "26px BebasNeue" ,"#fff");
			text.y = i*42;
			text.x = 75;
			text.textAlign = "center";
			this.tables[x].hot_cold_res_container.addChild(text)
		});
  },
  drawRoadMap (data, _target, _timer_c,  x, self) {
			let container = null;

			let xPos = 0;
			let yPos = 0;
			let r = 0;
			let mask = null;

			let marks = formatData.fnFormatSicbo(data.marks, 11, 6);

			for(var key in marks) {
				if(!this.tables[x] || !this.tables[x][key+"_container"]) return;
				this.tables[x][key+"_container"].removeAllChildren();
				this.tables[x][key+"_container"].x = 823;
				this.tables[x][key+"_container"].y = this.tables[x].y + 23;

				container = this.tables[x][key+"_container"];
				xPos = 37;
				yPos = 36;
				r = 17;

				let color = "";
				let text_val = "";
				let font_size = "10px";

				let arr = marks[key];

				for(var e = 0; e< arr.length;e++) {
					if(arr[e] !== undefined) {
						for(var i = 0; i < arr[e].length; i++) {
							if(!arr[e][i]) continue ;

							if(arr[e][i] !== undefined) {

								color = "#e5b241";
								text_val = arr[e][i];

								font_size = "20px"

								if (arr[e][i] == "odd") {
									color = "#d32f2f";
									text_val = window.language.locale == "zh" ? "单" : "O";
								}
								if (arr[e][i] == "even") {
									color = "#1565c0";
									text_val = window.language.locale == "zh" ? "双" : "E";
								}
								if (arr[e][i] == "big") {
									color = "#d32f2f";
									text_val = window.language.locale == "zh" ? "大" : "B";
								}
								if (arr[e][i] == "small") {
									color = "#1565c0";
									text_val = window.language.locale == "zh" ? "小" : "S";
								}
								if (arr[e][i] == "triple") {
									color = "#41a257";
									text_val = window.language.locale == "zh" ? "和" : "T";
								}

								arr[e][i] = new createjs.Shape();
								arr[e][i].graphics.beginFill(color).drawCircle(0,0,r);
								arr[e][i].x = e *xPos;
								arr[e][i].y = i *yPos;

								arr[e][i].text = new createjs.Text(text_val, "bold "+font_size+" lato", "#fff");
								if(key=="dice" || key=="sum") {
									arr[e][i].text = new createjs.Text(text_val, "bold 16px lato", "#000");
								}
								arr[e][i].text.x = arr[e][i].x;
								arr[e][i].text.y = arr[e][i].y;

								arr[e][i].text.textAlign = "center";
								arr[e][i].text.textBaseline = "middle";
								container.addChild(arr[e][i], arr[e][i].text);
							}
						} //end for
					} //end if

				} //end for

				createjs.Tween.get(container.children[container.children.length-1])
				.to({ alpha : 1 },180)
				.to({ alpha : 0 },180)
				.to({ alpha : 1 },180)
				.to({ alpha : 0 },180)
				.to({ alpha : 1 },180)

				createjs.Tween.get(container.children[container.children.length-2])
				.to({ alpha : 1 },180)
				.to({ alpha : 0 },180)
				.to({ alpha : 1 },180)
				.to({ alpha : 0 },180)
				.to({ alpha : 1 },180)

			}
		},
}
export default {
	instance
}
