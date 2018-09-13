import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';
import rmformat from '../../factories/formatter';
import sboard from '../../factories/scoreboard_draw';

let formatData = rmformat();
let drawSboard  = sboard();
let instance = null;

instance = {
	list_tables :[],
	makeListTables (data, _target, _timer_c,  x, self) {
		this.list_tables[x] = _target.list_tables
    // self.context.lobby_banner.banner_container.visible = true;
    // self.context.lobby_banner.table_banner_container.removeAllChildren()
    // === game rounds
		let label_spacing = 15;
		let game_rounds_label = new createjs.Text(window.language.lobby.game ,"18px latoregular","#fff");
		game_rounds_label.x = 180;
		game_rounds_label.y = this.list_tables[x].y + label_spacing + 94;
		_target.addChild(game_rounds_label);

    if(window.language.locale == "zh") {
        game_rounds_label.font = "23px latoregular";
    }

		let height_result = game_rounds_label.getMeasuredHeight();

		this.list_tables[x].round_num.text = data.currentRound;
		this.list_tables[x].round_num.textAlign = "right";
		this.list_tables[x].round_num.x = 310;
		this.list_tables[x].round_num.font = "18px latoregular";
		this.list_tables[x].round_num.y = game_rounds_label.y + height_result + label_spacing;

		//=== table status
		let round_num_height = this.list_tables[x].round_num.getMeasuredHeight();
		this.list_tables[x].status.text = window.language.lobby.nowbetting;
		this.list_tables[x].status.x = game_rounds_label.x;
		this.list_tables[x].status.y = this.list_tables[x].round_num.y + round_num_height + label_spacing + label_spacing;

		// === timer
		this.list_tables[x].timer.x = -10;
		this.list_tables[x].timer.y = this.list_tables[x].y  + 54;

		// === dealer image
		this.list_tables[x].dealer_img_bg.x = 92
		this.list_tables[x].dealer_img_bg.y = 156 + this.list_tables[x].y;

		this.list_tables[x].dealer_img.x = this.list_tables[x].dealer_img_bg.x + 190;
		this.list_tables[x].dealer_img.y = this.list_tables[x].dealer_img_bg.y + 190;
		this.list_tables[x].dealer_img.mask = this.list_tables[x].dealer_img_bg

		// === dealer name
		this.list_tables[x].dealer_name.text = data.currentDealer;
		this.list_tables[x].dealer_name.x = 92;
		this.list_tables[x].dealer_name.y = 232 + this.list_tables[x].y;
		_target.addChild(this.list_tables[x].dealer_name);

		// === latest result
    let result_bg = new createjs.Shape();
    result_bg.graphics.beginFill("#3f3f3f").drawRoundRect(0, 0, 160, 264, 10);
    result_bg.x = 370;
    result_bg.y = 10 + this.list_tables[x].y;
    _target.addChild(result_bg);

    let result_label = new createjs.Text(window.language.lobby.latestresult.toUpperCase(), window.language.locale == "zh" ? "23px latoregular" : "14px latoregular", "#fff");
    result_label.x = 449.5;

    if(window.language.locale == "zh") {
			result_label.y = 16 + this.list_tables[x].y + -2;
    } else {
			result_label.y = 16 + this.list_tables[x].y + 3;
    }

    result_label.textAlign = "center";
    _target.addChild(result_label);

    let latest_res_bg = new createjs.Shape();
    latest_res_bg.graphics.ss(1).s("#d4d4d4").beginFill("#1c1c1c").drawRect(0, 0, 160, 38);
    latest_res_bg.x = result_bg.x;
    latest_res_bg.y = 45 + this.list_tables[x].y;
    _target.addChild(latest_res_bg);

    // === set 5 dice result
    this.list_tables[x].lastdice_res_container = new createjs.Container();
    _target.addChild(this.list_tables[x].lastdice_res_container);

    this.bigResultCon = new createjs.Container();
    _target.addChild(this.bigResultCon);
    this.bigResultCon.x = this.list_tables[x].x + 705;
    this.bigResultCon.y = this.list_tables[x].y + 187;

    // === hot & cold results

    this.bigResultCon = new createjs.Container();
    _target.addChild(this.bigResultCon);
    this.bigResultCon.x = this.list_tables[x].x + 705;
    this.bigResultCon.y = this.list_tables[x].y + 187;

  	let hot_res = new createjs.Shape();
    hot_res.graphics.beginFill("#d32f2e").drawRect(0, 0, 60, 196);
    hot_res.x = 544;
    hot_res.y = 10 + this.list_tables[x].y;

    let hot_text = new createjs.Text(window.language.sicbo.hotcaps, "16px LatoRegular", "#fff");
    hot_text.textAlign = "center"
    hot_text.x = hot_res.x + 29.5;
    hot_text.y = hot_res.y + 5;
    _target.addChild(hot_res, hot_text);

    let cold_res = new createjs.Shape();
    cold_res.graphics.beginFill("#1665c1").drawRect(0, 0, 60, 196);
    cold_res.x = 622;
    cold_res.y = 10 + this.list_tables[x].y;

    let cold_text = new createjs.Text(window.language.sicbo.coldcaps, "16px LatoRegular", "#fff");
    cold_text.textAlign = "center";
    cold_text.x = cold_res.x + 30.5;
    cold_text.y = cold_res.y + 5;
    _target.addChild(cold_res, cold_text);

    this.list_tables[x].hot_cold_res_container = new createjs.Container();
    this.list_tables[x].hot_cold_res_container.y = this.list_tables[x].y + 44;
    this.list_tables[x].hot_cold_res_container.x = 572;
    _target.addChild(this.list_tables[x].hot_cold_res_container);

    // === score board / road map
    let scoreboard_button_bg = new createjs.Shape();
    scoreboard_button_bg.graphics.ss(1).s("#9c9c9c").beginFill("#fff").drawRect(0, 0, 86, 196);
    scoreboard_button_bg.x = 695;
    scoreboard_button_bg.y = 10 + this.list_tables[x].y;
    _target.addChild(scoreboard_button_bg);
    // === roadmap bg

    let roadmap_bg = new createjs.Shape();
    roadmap_bg.graphics.beginFill("#fff").drawRect(0, 0, 336, 196);
    roadmap_bg.y = scoreboard_button_bg.y;
    roadmap_bg.x = scoreboard_button_bg.x + 86;
    _target.addChild(roadmap_bg);

    let lines = new createjs.Shape();
    lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0, 0)
    _target.addChild(lines);
    let posY = roadmap_bg.y;
    let posX = roadmap_bg.x;

    for (var i = 0; i <= 5; i++) {
      lines.graphics.moveTo(posX, posY + (32.5 * i)).lineTo(posX + 336, posY + (32.5 * i))
    }

    for (var i = 0; i <= 10; i++) {
      lines.graphics.moveTo(posX + (33.5 * i), posY).lineTo(posX + (33.5 * i), posY + 196)
    }

    // lines.shadow = new createjs.Shadow("#000", 2, 2, 6);
    lines.alpha = .5;

    let scoreboard_text = [window.language.sicbo.bigsmallcaps, window.language.sicbo.oddevencaps, window.language.sicbo.sumcaps, window.language.sicbo.dicecaps];
    let scoreboard_type = ["BIG/SMALL", "ODD/EVEN", "SUM", "DICE"];
    this.list_tables[x].button = [];

		for (var i = 0; i < scoreboard_text.length; i++) {
		  this.list_tables[x].button[i] = new createjs.Shape();
		  this.list_tables[x].button[i].graphics.beginLinearGradientFill(["#d9bf6b", "#efde80", "#d9bf6b"], [0, 0.5, 1], 0, 0, 75, 0, 100).drawRoundRect(0, 0, 75, 42, 10);
		  this.list_tables[x].button[i].y = (i * 47) + 16 + this.list_tables[x].y;
		  this.list_tables[x].button[i].x = 700.5;
		  this.list_tables[x].button[i].type = scoreboard_type[i];
		  this.list_tables[x].button[i].state = "normal";
		 _target.addChild(this.list_tables[x].button[i]);

		  this.list_tables[x].button[i].text = new createjs.Text(scoreboard_text[i], window.language.locale == "zh" ? "bold 15px LatoRegular" : "bold 12px LatoRegular", "#000");
		  this.list_tables[x].button[i].text.x = this.list_tables[x].button[i].x + (75 / 2);
		  this.list_tables[x].button[i].text.y = this.list_tables[x].button[i].y + (42 / 2);
		  this.list_tables[x].button[i].text.textAlign = "center";
		  this.list_tables[x].button[i].text.textBaseline = "middle";
		  this.list_tables[x].button[i].text.hitArea = this.list_tables[x].button[i];
		 _target.addChild(this.list_tables[x].button[i].text);

		  this.list_tables[x].button[i].changeState = function(e, type) {
		    if (e.state == "active") return;
		    if (type == "hover") {
		      e.graphics.clear().beginLinearGradientFill(["#8e7c45", "#b59e58", "#8e7c45"], [0, 0.5, 1], 0, 0, 75, 0, 100).drawRoundRect(0, 0, 75, 42, 8);
		      e.text.color = "#fff";
		    } else {
		      e.graphics.clear().beginLinearGradientFill(["#d9bf6b", "#efde80", "#d9bf6b"], [0, 0.5, 1], 0, 0, 75, 0, 100).drawRoundRect(0, 0, 75, 42, 8);
		      e.text.color = "#000";
		    }
		  } // end hover

		  this.list_tables[x].button[i].on("mouseover", (e) => {
		    e.target.changeState(e.target, "hover");
		  });

		  this.list_tables[x].button[i].on("mouseout", (e) => {
		    e.target.changeState(e.target);
		  });

		  this.list_tables[x].button[i].on("click", (e) => {
		    this.list_tables[x].button.forEach((o) => {
		      o.state = "normal";
		      o.changeState(o);
		    });
		    e.target.changeState(e.target, "hover");
		    e.target.state = "active";
		    this.list_tables[x].size_container.visible = false;
		    this.list_tables[x].sum_container.visible = false;
		    this.list_tables[x].dice_container.visible = false;
		    this.list_tables[x].parity_container.visible = false;
		    switch (e.target.type.toLowerCase()) {
		      case "odd/even":
		        this.list_tables[x].parity_container.visible = true;
		        break;
		      case "big/small":
		        this.list_tables[x].size_container.visible = true;
		        break;
		      case "sum":
		        this.list_tables[x].sum_container.visible = true;
		        break;
		      case "dice":
		        this.list_tables[x].dice_container.visible = true;
		        break;
		    }
		  });
		}

    // default visible is size scoreboard
    this.list_tables[x].button[0].graphics.clear().beginLinearGradientFill(["#8e7c45", "#b59e58", "#8e7c45"], [0, 0.5, 1], 0, 0, 75, 0, 100).drawRoundRect(0, 0, 75, 42, 8);
    this.list_tables[x].button[0].state = "active";
    this.list_tables[x].button[0].text.color = "#fff";

    // let double_bg = new createjs.Shape();
    // double_bg.graphics.beginFill("#e5b141").drawRoundRect(0, 0, 64, 60, 6);
    // double_bg.x = 542;
    // double_bg.y = 215 + this.list_tables[x].y;
    // _target.addChild(double_bg);

    let double_label_bg = new createjs.Shape();
    double_label_bg.graphics.beginFill("#e5b241").drawRoundRect(0, 0, 62, 32, 6);
    double_label_bg.x = 1150;
    double_label_bg.y = 165 + this.list_tables[x].y;
    _target.addChild(double_label_bg);

    let double_label = new createjs.Text(window.language.sicbo.doublecaps, "bold 16px LatoRegular", "#000");
    double_label.x = 1180;
    double_label.y = 140 + this.list_tables[x].y;
    double_label.textAlign = "center";
    _target.addChild(double_label);

		// let triple_bg = new createjs.Shape();
		// triple_bg.graphics.beginFill("#e5b141").drawRoundRect(0, 0, 64, 60, 6);
		// triple_bg.x = 620;
		// triple_bg.y = 215 + this.list_tables[x].y;
		// _target.addChild(triple_bg);

		let triple_label_bg = new createjs.Shape();
		triple_label_bg.graphics.beginFill("#e5b241").drawRoundRect(0, 0, 62, 32, 6);
		triple_label_bg.x = 1280;
		triple_label_bg.y = 165 + this.list_tables[x].y;
		_target.addChild(triple_label_bg);

		let triple_label = new createjs.Text(window.language.sicbo.triplecaps, "bold 16px LatoRegular", "#000");
		triple_label.x = 1310;
		triple_label.y = 140 + this.list_tables[x].y;
		triple_label.textAlign = "center";
		_target.addChild(triple_label);

		this.list_tables[x].double_val = new createjs.Text("0", "bold 21px BebasNeue", "#231f20");
		this.list_tables[x].double_val.x = 1180;
		this.list_tables[x].double_val.y = double_label_bg.y + 17;
		this.list_tables[x].double_val.textAlign = "center";
		this.list_tables[x].double_val.textBaseline = "middle";
		_target.addChild(this.list_tables[x].double_val);

		this.list_tables[x].triple_val = new createjs.Text("0", "bold 21px BebasNeue", "#231f20");
		this.list_tables[x].triple_val.x = 1312;
		this.list_tables[x].triple_val.y = triple_label_bg.y + 17;
		this.list_tables[x].triple_val.textAlign = "center";
		this.list_tables[x].triple_val.textBaseline = "middle";
		_target.addChild(this.list_tables[x].triple_val);

		// === odd/even big/small percentage
    let big_label = new createjs.Text(window.language.sicbo.bigcaps, "bold 16px latoregular", "#000");
    big_label.x = 1128;
    big_label.y = 13 + this.list_tables[x].y;
    _target.addChild(big_label);

    let small_label = new createjs.Text(window.language.sicbo.smallcaps, "bold 16px latoregular", "#000");
    small_label.x = 1355;
    small_label.y = 13 + this.list_tables[x].y;
    small_label.textAlign = "right";
    _target.addChild(small_label);

    let odd_label = new createjs.Text(window.language.sicbo.oddcaps, "bold 16px latoregular", "#000");
    odd_label.x = 1128;
    odd_label.y = 78 + this.list_tables[x].y;
    _target.addChild(odd_label);

    let even_label = new createjs.Text(window.language.sicbo.evencaps, "bold 16px latoregular", "#000");
    even_label.x = 1355;
    even_label.y = 78 + this.list_tables[x].y;
    even_label.textAlign = "right";
    _target.addChild(even_label);

    this.list_tables[x].big_bar = new createjs.Shape();
    this.list_tables[x].big_bar.graphics.beginFill("#b71b1c").drawRect(0, 0, 235, 20);
    this.list_tables[x].big_bar.setBounds(0, 0, 235, 20);
    this.list_tables[x].big_bar.x = 1125;
    this.list_tables[x].big_bar.y = 35 + this.list_tables[x].y;
    this.list_tables[x].big_bar.scaleX = .5;
    _target.addChild(this.list_tables[x].big_bar);

    this.list_tables[x].small_bar = new createjs.Shape();
    this.list_tables[x].small_bar.graphics.beginFill("#0e47a1").drawRect(0, 0, 235, 20);
    this.list_tables[x].small_bar.setBounds(0, 0, 235, 20);
    this.list_tables[x].small_bar.x = 1125 + 235;
    this.list_tables[x].small_bar.y = 35 + this.list_tables[x].y;
    this.list_tables[x].small_bar.regX = 235;
    this.list_tables[x].small_bar.scaleX = .5;
    _target.addChild(this.list_tables[x].small_bar);

    this.list_tables[x].odd_bar = new createjs.Shape();
    this.list_tables[x].odd_bar.graphics.beginFill("#b71b1c").drawRect(0, 0, 235, 20);
    this.list_tables[x].odd_bar.setBounds(0, 0, 235, 20);
    this.list_tables[x].odd_bar.x = 1125;
    this.list_tables[x].odd_bar.y = 100 + this.list_tables[x].y;
    this.list_tables[x].odd_bar.scaleX = .5;
    _target.addChild(this.list_tables[x].odd_bar);

    this.list_tables[x].even_bar = new createjs.Shape();
    this.list_tables[x].even_bar.graphics.beginFill("#0e47a1").drawRect(0, 0, 235, 20);
    this.list_tables[x].even_bar.setBounds(0, 0, 235, 20);
    this.list_tables[x].even_bar.x = 1125 + 235;
    this.list_tables[x].even_bar.y = 100 + this.list_tables[x].y;
    this.list_tables[x].even_bar.regX = 235;
    this.list_tables[x].even_bar.scaleX = .5;
    _target.addChild(this.list_tables[x].even_bar);

     // === odd/even small/big values % init
    this.list_tables[x].big_val = new createjs.Text("0%", "18px BebasNeue", "#fff");
    this.list_tables[x].big_val.x = this.list_tables[x].big_bar.x + 4;
    this.list_tables[x].big_val.y = this.list_tables[x].big_bar.y + 1;
    _target.addChild(this.list_tables[x].big_val);

    this.list_tables[x].small_val = new createjs.Text("0%", "18px BebasNeue", "#fff");
    this.list_tables[x].small_val.x = this.list_tables[x].small_bar.x - 4;
    this.list_tables[x].small_val.y = this.list_tables[x].small_bar.y + 1;
    this.list_tables[x].small_val.textAlign = "right";
    _target.addChild(this.list_tables[x].small_val);

    this.list_tables[x].odd_val = new createjs.Text("0%", "18px BebasNeue", "#fff");
    this.list_tables[x].odd_val.x = this.list_tables[x].odd_bar.x + 4;
    this.list_tables[x].odd_val.y = this.list_tables[x].odd_bar.y + 1;
    _target.addChild(this.list_tables[x].odd_val);

    this.list_tables[x].even_val = new createjs.Text("0%", "18px BebasNeue", "#fff");
    this.list_tables[x].even_val.x = this.list_tables[x].even_bar.x - 4;
    this.list_tables[x].even_val.y = this.list_tables[x].even_bar.y + 1;
    this.list_tables[x].even_val.textAlign = "right";
    _target.addChild(this.list_tables[x].even_val);

    let mask = new createjs.Shape();
    mask.graphics.beginFill("red").drawRect(780, this.list_tables[x].y + 10, 570, 198);

    this.list_tables[x].parity_container = new createjs.Container();
    this.list_tables[x].parity_container.visible = false;
    this.list_tables[x].parity_container.x = 780;
    _target.addChild(this.list_tables[x].parity_container);

    this.list_tables[x].size_container = new createjs.Container();
    this.list_tables[x].size_container.visible = true;
    this.list_tables[x].size_container.x = 780;
    _target.addChild(this.list_tables[x].size_container);

    this.list_tables[x].dice_container = new createjs.Container();
    this.list_tables[x].dice_container.visible = false;
    this.list_tables[x].dice_container.x = 780;
    _target.addChild(this.list_tables[x].dice_container);

    this.list_tables[x].sum_container = new createjs.Container();
    this.list_tables[x].sum_container.visible = false;
    this.list_tables[x].sum_container.x = 780;
    _target.addChild(this.list_tables[x].sum_container);

    // === Room info
    this.list_tables[x].roomInfoCon = new createjs.Container();
    this.list_tables[x].roomInfoCon.x = 543;
    this.list_tables[x].roomInfoCon.y = this.list_tables[x].y + 230;
    this.list_tables[x].roomInfoCon.visible = false;
    _target.addChild(this.list_tables[x].roomInfoCon);
    
    if (window.room_info) this.list_tables[x].roomInfoCon.visible = true;

    let roomInfoBg = new createjs.Shape();
    roomInfoBg.graphics.beginFill("#333333").drawRect(0, 0, 1018, 60);
    this.list_tables[x].roomInfoCon.addChild(roomInfoBg);

    let usersIco = new createjs.Bitmap('/img/v2_1/icons/room_info/lobby_users.png');
    usersIco.x = 15;
    usersIco.y = 15;
    usersIco.scaleX = 1;
    usersIco.scaleY = 1;
    this.list_tables[x].roomInfoCon.addChild(usersIco);

    this.list_tables[x].userCount = new createjs.Text("0","20px bebasNeue","#b3b3b3");
    this.list_tables[x].userCount.x = usersIco.x + 35;
    this.list_tables[x].userCount.y = 16;
    this.list_tables[x].userCount.textAlign = 'left';
    this.list_tables[x].roomInfoCon.addChild(this.list_tables[x].userCount);

    let infoBigMark = new createjs.Shape();
    infoBigMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 11);
    infoBigMark.x = 125;
    infoBigMark.y = 27;
    this.list_tables[x].roomInfoCon.addChild(infoBigMark);

    let bigMarkText = new createjs.Text(window.language.locale == "zh" ? "大" : "B", '15px Lato', '#fff');
    bigMarkText.x = infoBigMark.x;
    bigMarkText.y = infoBigMark.y - 9;
    bigMarkText.textAlign = 'center';
    this.list_tables[x].roomInfoCon.addChild(bigMarkText);

    this.list_tables[x].bigBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
    this.list_tables[x].bigBetAmt.x = infoBigMark.x + 20;
    this.list_tables[x].bigBetAmt.y = 16;
    this.list_tables[x].bigBetAmt.textAlign = 'left';
    this.list_tables[x].roomInfoCon.addChild(this.list_tables[x].bigBetAmt);

    let infoSmallMark = new createjs.Shape();
    infoSmallMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 11);
    infoSmallMark.x = infoBigMark.x + 180;
    infoSmallMark.y = 27;
    this.list_tables[x].roomInfoCon.addChild(infoSmallMark);

    let smallMarkText = new createjs.Text(window.language.locale == "zh" ? "小" : "S", '15px Lato', '#fff');
    smallMarkText.x = infoSmallMark.x;
    smallMarkText.y = infoSmallMark.y - 9;
    smallMarkText.textAlign = 'center';
    this.list_tables[x].roomInfoCon.addChild(smallMarkText);

    this.list_tables[x].smallBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
    this.list_tables[x].smallBetAmt.x = infoSmallMark.x + 20;
    this.list_tables[x].smallBetAmt.y = 16;
    this.list_tables[x].smallBetAmt.textAlign = 'left';
    this.list_tables[x].roomInfoCon.addChild(this.list_tables[x].smallBetAmt);

    let infoOddMark = new createjs.Shape();
    infoOddMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 11);
    infoOddMark.x = infoSmallMark.x + 180;
    infoOddMark.y = 27;
    this.list_tables[x].roomInfoCon.addChild(infoOddMark);

    let oddMarkText = new createjs.Text(window.language.locale == "zh" ? "单" : "O", '15px Lato', '#fff');
    oddMarkText.x = infoOddMark.x;
    oddMarkText.y = infoOddMark.y - 9;
    oddMarkText.textAlign = 'center';
    this.list_tables[x].roomInfoCon.addChild(oddMarkText);

    this.list_tables[x].oddBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
    this.list_tables[x].oddBetAmt.x = infoOddMark.x + 20;
    this.list_tables[x].oddBetAmt.y = 16;
    this.list_tables[x].oddBetAmt.textAlign = 'left';
    this.list_tables[x].roomInfoCon.addChild(this.list_tables[x].oddBetAmt);

    let infoEvenMark = new createjs.Shape();
    infoEvenMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 11);
    infoEvenMark.x = infoOddMark.x + 180;
    infoEvenMark.y = 27;
    this.list_tables[x].roomInfoCon.addChild(infoEvenMark);

    let evenMarkText = new createjs.Text(window.language.locale == "zh" ? "双" : "E", '15px Lato', '#fff');
    evenMarkText.x = infoEvenMark.x;
    evenMarkText.y = infoEvenMark.y - 9;
    evenMarkText.textAlign = 'center';
    this.list_tables[x].roomInfoCon.addChild(evenMarkText);

    this.list_tables[x].evenBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
    this.list_tables[x].evenBetAmt.x = infoEvenMark.x + 20;
    this.list_tables[x].evenBetAmt.y = 16;
    this.list_tables[x].evenBetAmt.textAlign = 'left';
    this.list_tables[x].roomInfoCon.addChild(this.list_tables[x].evenBetAmt);

    this.setRoomInfo(data.betInfo, x, data.totalBettingUsers);

    // === Maintenance
    _target.addChild(this.list_tables[x].maintenance_container);

    this.list_tables[x].maintenanceCon = new createjs.Container();
    this.list_tables[x].maintenanceCon.visible = false;
    _target.addChild(this.list_tables[x].maintenanceCon);

    this.list_tables[x].maintenanceCon.on("click", (e) => {
			return;
		});

    let header_bg = ["#980000", "#2b0000"];
    let text_color = "#efb052";

    if (data.roomType == "p") {
      header_bg = ["#bd0000", "#7c0000"];
      text_color = "#efb052";
    } else if (data.roomType == "v") {
      header_bg = ["#fedd78", "#d5a515"];
      text_color = "#000";
    }

    this.list_tables[x].maintenanceBg = new createjs.Shape();
    this.list_tables[x].maintenanceBg.graphics.beginFill("#333333").drawRoundRect(0, 0, 1640, 283, 6);
    this.list_tables[x].maintenanceBg.x = this.list_tables[x].x;
    this.list_tables[x].maintenanceBg.y = this.list_tables[x].y + 1;
    this.list_tables[x].maintenanceBg.table_id = data.tableNumber;
    this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].maintenanceBg);

    this.list_tables[x].maintenanceHeader = new createjs.Shape();
    this.list_tables[x].maintenanceHeader.x = this.list_tables[x].x;
    this.list_tables[x].maintenanceHeader.y = this.list_tables[x].y - 1;
    this.list_tables[x].maintenanceHeader.graphics.beginLinearGradientFill(["#960000", "#2a0001"],[0,1],0,0,1640,10).drawRoundRectComplex(0,0,1640,333,10,10,0,0);
    this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].maintenanceHeader);

    this.list_tables[x].table_name = new createjs.Text(window.language.lobby.sicbo,"22px ArvoItalic","#fdba44");
    this.list_tables[x].table_name.x = 80; //175;
    this.list_tables[x].table_name.y = 13 + this.list_tables[x].y;
    this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].table_name);

    this.list_tables[x].table_num = new createjs.Text(data.tableNumber.length < 2 ? "0"+data.tableNumber : data.tableNumber,"24px ArvoBold","#fdba44");
    this.list_tables[x].table_num.x = 40; //this.list_tables[x].table_name.x - (this.list_tables[x].table_name.getBounds().width / 2) - 10;
    this.list_tables[x].table_num.y = 11 + this.list_tables[x].y;
    this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].table_num);

    this.list_tables[x].maintenanceLogo = new createjs.Bitmap(self.context.load.getResources("maintenance_ico"));
    this.list_tables[x].maintenanceLogo.x = 30;
    this.list_tables[x].maintenanceLogo.y = 90 + this.list_tables[x].y;
    this.list_tables[x].maintenanceLogo.scaleX = this.list_tables[x].maintenanceLogo.scaleY = 0.85;
    this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].maintenanceLogo);

    this.list_tables[x].maintenanceTxt = new createjs.Text('', '30px bebasneue', '#ffb547');
    this.list_tables[x].maintenanceTxt.x = 185;
    this.list_tables[x].maintenanceTxt.y = 110 + this.list_tables[x].y;
    this.list_tables[x].maintenanceTxt.textAlign = 'left';
    this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].maintenanceTxt);

    this.list_tables[x].maintenanceSubTxt = new createjs.Text('', '28px bebasneue', '#fff');
    this.list_tables[x].maintenanceSubTxt.x = 185;
    this.list_tables[x].maintenanceSubTxt.y = 150 + this.list_tables[x].y;
    this.list_tables[x].maintenanceSubTxt.textAlign = 'left';
    this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].maintenanceSubTxt);

    this.list_tables[x].maintenanceTime = new createjs.Text('', '26px bebasneue', '#fff');
    this.list_tables[x].maintenanceTime.x = 185;
    this.list_tables[x].maintenanceTime.y = 185 + this.list_tables[x].y;
    this.list_tables[x].maintenanceTime.textAlign = 'left';
    this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].maintenanceTime);

		this.setResult(data, _target, _timer_c, x, self);
		this.setHotColdResult(data, _target, _timer_c, x, self);
    this.doubleTripleCount(data, _target, _timer_c, x, self)
    this.setPercentages(data, _target, _timer_c, x, self);
    this.drawRoadMap(data, _target, _timer_c, x, self);
    // this.drawRoadMap(formatData.fnFormatSicbo(data.marks, 17, 6), "list");
    //
		this.checkMaintenance(data, false, x);
	},
  setRoomInfo(data, x, totalBettingUsers) {
    if (!this.list_tables[x]) return;
    
    this.resetRoomInfo(x);

    if (!data) return;

    if (data.big) {
      this.list_tables[x].bigBetAmt.text = `${numberWithCommas(data.big.totalBets)}/${numberWithCommas(data.big.totalUsers)}`;
    }

    if (data.small) {
      this.list_tables[x].smallBetAmt.text = `${numberWithCommas(data.small.totalBets)}/${numberWithCommas(data.small.totalUsers)}`;
    }

    if (data.odd) {
      this.list_tables[x].oddBetAmt.text = `${numberWithCommas(data.odd.totalBets)}/${numberWithCommas(data.odd.totalUsers)}`;
    }

    if (data.even) {
      this.list_tables[x].evenBetAmt.text = `${numberWithCommas(data.even.totalBets)}/${numberWithCommas(data.even.totalUsers)}`;
    }

    this.list_tables[x].userCount.text = numberWithCommas(totalBettingUsers);
  },
  resetRoomInfo(x) {
    this.list_tables[x].bigBetAmt.text = '0/0';
    this.list_tables[x].smallBetAmt.text = '0/0';
    this.list_tables[x].oddBetAmt.text = '0/0';
    this.list_tables[x].evenBetAmt.text = '0/0';
    this.list_tables[x].userCount.text = '0';
  },
  checkMaintenance (maintenanceData, socket, x) {
  	if (!this.list_tables || !this.list_tables[x] || !this.list_tables[x].maintenanceCon) return;

    if (window.userAuthority === "admin") return;

    let maintenance = false;
    let activeMaintenance = [];
    let mainText = '';
    let subText = '';

    if (!socket) {
      let mainMaintenance = maintenanceData.mainMaintenance.status;
      let maintenanceSetting = maintenanceData.maintenanceSetting;

      // if (mainMaintenance == 1) {
      //  maintenance = true;
      // }

      for (var i = 0; i < maintenanceSetting.length; i++) {
        if (maintenanceSetting[i].status == 1) {
          maintenance = true;
          activeMaintenance = maintenanceSetting[i];
        }
      }
    } else {
      activeMaintenance = maintenanceData.data;

      if (maintenanceData == 1) {
        maintenance = true;
      } else {
        maintenance = false;
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
      this.list_tables[x].maintenanceCon.visible = true;
      this.list_tables[x].maintenanceTxt.text = mainText;
      this.list_tables[x].maintenanceSubTxt.text = subText;
      this.list_tables[x].maintenanceTime.text = newStartTime +' ~ '+ newEndTime;
    } else {
      this.list_tables[x].maintenanceCon.visible = false;
    }
  },
  setHotColdResult (data, _target, _timer_c,  x, self) {
  	 if (!this.list_tables[x] || !this.list_tables[x].hot_cold_res_container) return;

      if (this.list_tables[x].hot_cold_res_container) {
        this.list_tables[x].hot_cold_res_container.removeAllChildren();
      }

			let marks = data.marks;

      marks = _.filter(marks, (row) => {
        return row.game_info
      });

      marks = _.filter(marks,  (row) => {
        if(typeof row.game_info === 'string') {
            row.game_info = JSON.parse(row.game_info)
        }
        return row.game_info && !row.isVoid
      });

      marks.forEach(function(row) {
        row.total = _.reduce([row.game_info.one, row.game_info.two, row.game_info.three], function(sum, n) {
          return parseInt(sum) + parseInt(n);
        });
      });

      let res = _.sortBy(_.groupBy(marks, function(row) {
        return row.total
      }), 'length');

      let cold_res = res.slice(0, 5);

      let hot_res = res.slice(Math.max(res.length - 5, 1));
      hot_res = _.map(hot_res, function(e) {
        return isNaN(e[0].total) ? 1 : e[0].total;
      });

      cold_res = _.map(cold_res, function(e) {
        return isNaN(e[0].total) ? 1 : e[0].total;
      });

      hot_res = hot_res.reverse();

      hot_res.forEach( (e, i) => {
        let text = new createjs.Text(e, "20px BebasNeue", "#fff");
        text.y = (i * 32) + 3.5;
        text.textAlign = "center";
        this.list_tables[x].hot_cold_res_container.addChild(text)
      });

      cold_res.forEach( (e, i) => {
        let text = new createjs.Text(e, "20px BebasNeue", "#fff");
        text.y = (i * 32) + 3.5;
        text.x = 81;
        text.textAlign = "center";
        this.list_tables[x].hot_cold_res_container.addChild(text)
      });
      this.list_tables[x].hot_cold_res_container.y / 196;
  },
  doubleTripleCount (data, _target, _timer_c,  x, self) {
    if (!this.list_tables[x] || !this.list_tables[x].double_val) return;
    if (!this.list_tables[x] || !this.list_tables[x].triple_val) return;

    let marks = data.marks;

		marks = _.filter(marks, (row) => {
      if(typeof row.game_info === 'string') {
        row.game_info = JSON.parse(row.game_info);
      }
			return row.game_info && !row.isVoid
		});

		let data2 = _.map(marks, function(row) {
      return row.game_info;
    });

		data2.forEach((e) => {
			e.dice = [e.one, e.two, e.three]
		});

		let double_count = 0;
		let triple_count = 0;

		data2.forEach(function(e) {
			if (_.uniq(e.dice).length == 2) {
			  double_count++;
			} else if (_.uniq(e.dice).length == 1) {
			  triple_count++;
			}
		});

		this.list_tables[x].double_val.text = double_count;
		this.list_tables[x].triple_val.text = triple_count;
  },
  drawRoadMap (data, _target, _timer_c,  x, self) {
		if (!this.list_tables[x]) return;
		let container = null;

		let xPos = 0;
		let yPos = 0;
		let r = 0;
		let mask = null;

		let marks = formatData.fnFormatSicbo(data.marks, 9, 6);
        let textY = 0,textX = 0;

    for (var key in marks) {
      if (this.list_tables[x][key + "_container"]) {

      if (!this.list_tables[x][key + "_container"]) return;

      this.list_tables[x][key + "_container"].removeAllChildren();
      this.list_tables[x][key + "_container"].x = 797.6;
      this.list_tables[x][key + "_container"].y = this.list_tables[x].y + 26;

      container = this.list_tables[x][key + "_container"];
      xPos = 33.55;
      yPos = 32.7;
      r = 16.2;

      let color = "";
      let text_val = "";
      let font_size = "bold 16px lato";

      let arr = marks[key];

      for (var e = 0; e < arr.length; e++) {
        if (arr[e] !== undefined) {
          for (var i = 0; i < arr[e].length; i++) {
            if (!arr[e][i]) continue;

            if (arr[e][i] !== undefined) {

              color = "#e5b241";
              text_val = arr[e][i];

              if (text_val.length > 2) {
                font_size = "bold 16px lato"
              }

              if (arr[e][i] == "odd") {
                color = "#d32f2f";
                text_val = window.language.locale == "zh" ? "单" : "O";
                font_size = window.language.locale == "zh" ? "15px lato" : "15px lato";
              }
              if (arr[e][i] == "even") {
                color = "#1565c0";
                text_val = window.language.locale == "zh" ? "双" : "E";
                font_size = "15px lato";
              }
              if (arr[e][i] == "big") {
                textY = 0.5;
                color = "#d32f2f";
                text_val = window.language.locale == "zh" ? "大" : "B";
                font_size = window.language.locale == "zh" ? "15px lato" : "15px lato";
              }
              if (arr[e][i] == "small") {
                textY = 0.5;
                color = "#1565c0";
                text_val = window.language.locale == "zh" ? "小" : "S";
                font_size = window.language.locale == "zh" ? "15px lato" : "15px lato";
              }
              if (arr[e][i] == "triple") {
                textY = 0.5;
                color = "#41a257";
                text_val = window.language.locale == "zh" ? "和" : "T";
                font_size = window.language.locale == "zh" ? "15px lato" : "15px lato";
              }

              arr[e][i] = new createjs.Shape();
              arr[e][i].graphics.beginFill(color).drawCircle(0, 0, r);
              arr[e][i].x = (e * xPos) + 0.2;
              arr[e][i].y = (i * yPos);

              arr[e][i].text = new createjs.Text(text_val, font_size, "#fff");
              if (key == "dice" || key == "sum") {
                arr[e][i].text = new createjs.Text(text_val, font_size, "#000");
              }
              arr[e][i].text.x = arr[e][i].x;
              arr[e][i].text.y = arr[e][i].y - textY;

              arr[e][i].text.textAlign = "center";
              arr[e][i].text.textBaseline = "middle";
              container.addChild(arr[e][i], arr[e][i].text);
            }
          } //end for
        } //end if

      } //end for

      createjs.Tween.get(container.children[container.children.length - 1])
        .to({
          alpha: 1
        }, 180)
        .to({
          alpha: 0
        }, 180)
        .to({
          alpha: 1
        }, 180)
        .to({
          alpha: 0
        }, 180)
        .to({
          alpha: 1
        }, 180)

      createjs.Tween.get(container.children[container.children.length - 2])
        .to({
          alpha: 1
        }, 180)
        .to({
          alpha: 0
        }, 180)
        .to({
          alpha: 1
        }, 180)
        .to({
          alpha: 0
        }, 180)
        .to({
          alpha: 1
        }, 180)

    	}
  	}

  },
  setPercentages (data, _target, _timer_c,  x, self, socket) {

  	let marks = data.marks;

  	if (!this.list_tables[x]) return

    marks = _.filter(marks, (row) => {
      return row.game_info
    });

    marks = _.filter(marks,  (row) => {
      if(typeof row.game_info === 'string') {
          row.game_info = JSON.parse(row.game_info)
      }
      return row.game_info && !row.isVoid
    });

    let data2 = _.map(marks, function(e) {
      return [e.game_info.one, e.game_info.two, e.game_info.three];
    });

    let sum_data = [];

    data2.forEach(function(e) {
      sum_data.push(_.reduce(e, function(sum, n) {
        return parseInt(sum) + parseInt(n)
      }));
    });

    let odd_count = 0;
    let even_count = 0;
    let big_count = 0;
    let small_count = 0;

		sum_data.forEach(function(e) {
		  if (e % 2 == 0) {
		    even_count++;
		  } else {
		    odd_count++;
		  }

		  if (e >= 11) {
		    big_count++;
		  } else {
		    small_count++;
		  }
		});

		if (!this.list_tables[x].odd_bar) return;

		this.list_tables[x].odd_bar.scaleX = .5;

		createjs.Tween.get(this.list_tables[x].odd_bar)
		.to({
		  scaleX: odd_count / marks.length
		}, 250);

		if (!this.list_tables[x].even_bar) return;

		this.list_tables[x].even_bar.scaleX = .5;

		createjs.Tween.get(this.list_tables[x].even_bar)
		.to({
		  scaleX: even_count / marks.length
		}, 250);

    if (!this.list_tables[x].big_bar) return;

    this.list_tables[x].big_bar.scaleX = .5;

		createjs.Tween.get(this.list_tables[x].big_bar)
		.to({
		  scaleX: big_count / marks.length
		}, 250);

    if (!this.list_tables[x].small_bar) return;

    this.list_tables[x].small_bar.scaleX = .5;
		createjs.Tween.get(this.list_tables[x].small_bar)
		.to({
		  scaleX: small_count / marks.length
		}, 250);

    this.list_tables[x].odd_val.text = Math.round((odd_count / marks.length) * 100) + "%";
    this.list_tables[x].even_val.text = Math.round((even_count / marks.length) * 100) + "%";
    this.list_tables[x].big_val.text = Math.round((big_count / marks.length) * 100) + "%";
    this.list_tables[x].small_val.text = Math.round((small_count / marks.length) * 100) + "%";
  },
  setResult (data, _target, _timer_c,  x, self, socket) {

  	if (!data.marks.length) return;

    data.marks = _.filter(data.marks, (row) => {
      if ('game_info' in row) {
        return row;
      }
    });

    if (!this.list_tables[x]) return;

    this.list_tables[x].dice = [];
    this.list_tables[x].size = [];
    this.list_tables[x].total = [];
    this.list_tables[x].lastdice_res_container.removeAllChildren();

    // big result
    this.bigResult_data = [];
    this.bigResult_data[x] = {};
    this.bigResult_data[x].dice = [];
    this.bigResult_data[x].size = [];
    this.bigResult_data[x].total = [];

    this.bigResultCon.removeAllChildren();

    this.bigResult_data[x].size = new createjs.Text("", "40px BebasNeue");
    this.bigResult_data[x].size.textBaseline = "middle";
    this.bigResult_data[x].size.textAlign = "left";
    this.bigResultCon.addChild(this.bigResult_data[x].size);

    this.bigResult_data[x].total = new createjs.Text("", "40px BebasNeue");
    this.bigResult_data[x].total.textBaseline = "middle";
    this.bigResult_data[x].total.textAlign = "left";
    this.bigResultCon.addChild(this.bigResult_data[x].total);

    let last150 = null;
    if (data.marks.length > 5) {
      last150 = data.marks.slice(Math.max(data.marks.length - 6, 1)).reverse();
    } else if (data.marks.length <= 5) {
      last150 = data.marks.reverse();
    }

    last150 = _.filter(last150,  (row) => {
      if(typeof row.game_info === 'string') {
        row.game_info = JSON.parse(row.game_info)
      }
      return row.game_info;
    });

    for (var i = 0; i < last150.length; i++) {
      let dice = last150[i].game_info.one + "" + last150[i].game_info.two + "" + last150[i].game_info.three;

      if (dice == "") dice = "123";

      this.list_tables[x].dice.push({
        dice1: new createjs.Bitmap("/img/dice/dice" + dice[0] + ".png"),
        dice2: new createjs.Bitmap("/img/dice/dice" + dice[1] + ".png"),
        dice3: new createjs.Bitmap("/img/dice/dice" + dice[2] + ".png"),
        isVoid : last150[i].isVoid ? true : false
      });

      this.bigResult_data[x].dice.push({
        dice1: new createjs.Bitmap("/img/dice/dice" + dice[0] + ".png"),
        dice2: new createjs.Bitmap("/img/dice/dice" + dice[1] + ".png"),
        dice3: new createjs.Bitmap("/img/dice/dice" + dice[2] + ".png"),
        isVoid : last150[i].isVoid ? true : false

      });

      if (this.bigResult_data[x].dice[i - 5]) {
        this.bigResultCon.addChild(this.bigResult_data[x].dice[i - 5].dice1);
        this.bigResultCon.addChild(this.bigResult_data[x].dice[i - 5].dice2);
        this.bigResultCon.addChild(this.bigResult_data[x].dice[i - 5].dice3);

        this.bigResult_data[x].dice[i - 5].dice1.x = this.bigResultCon.x;
        this.bigResult_data[x].dice[i - 5].dice2.x = this.bigResultCon.x + 50;
        this.bigResult_data[x].dice[i - 5].dice3.x = this.bigResultCon.x + 100;

        this.bigResult_data[x].dice[i - 5].dice1.scaleX = this.bigResult_data[x].dice[i - 5].dice1.scaleY = 0.5;
        this.bigResult_data[x].dice[i - 5].dice2.scaleX = this.bigResult_data[x].dice[i - 5].dice2.scaleY = 0.5;
        this.bigResult_data[x].dice[i - 5].dice3.scaleX = this.bigResult_data[x].dice[i - 5].dice3.scaleY = 0.5;
      }

      if(this.list_tables[x].dice[i].isVoid) {
        let voidContainer = new createjs.Container();
        voidContainer.isVoid = true;

        var voidShape = new createjs.Shape();
        voidShape.graphics.beginFill("#212120").drawRect(0,0,160,34);
        voidShape.y =  (i * 37.5) + 45+2
        voidShape.x =  370;
        voidShape.isVoid = true;
        voidContainer.addChild(voidShape);

        var voidText = new createjs.Text("GAME VOID", " bold 12px lato", "#fff");
        voidText.set({x: 394, y: ((i*37.5) + 45) + (37.5/2), textBaseline: 'middle'})
        voidContainer.addChild(voidText);

        var voidImg = new createjs.Bitmap(self.context.load.getResources("void"));
        voidImg.set({x: voidText.x + voidText.getMeasuredWidth() + 12, y: ((i*37.5) + 45) + (38/2), regY : voidImg.getBounds().height/2});
        voidContainer.addChild(voidImg);

        this.list_tables[x].lastdice_res_container.addChild(voidContainer);
      }

      this.list_tables[x].lastdice_res_container.addChild(this.list_tables[x].dice[i].dice1);
      this.list_tables[x].lastdice_res_container.addChild(this.list_tables[x].dice[i].dice2);
      this.list_tables[x].lastdice_res_container.addChild(this.list_tables[x].dice[i].dice3);


      this.list_tables[x].dice[i].dice1.y = this.list_tables[x].y + (i * 37.5) + 52;
      this.list_tables[x].dice[i].dice2.y = this.list_tables[x].y + (i * 37.5) + 52;
      this.list_tables[x].dice[i].dice3.y = this.list_tables[x].y + (i * 37.5) + 52;

      this.list_tables[x].dice[i].dice1.x = 150 + 235 + 3 - 2;
      this.list_tables[x].dice[i].dice2.x = 180 + 235 + 3 - 2;
      this.list_tables[x].dice[i].dice3.x = 210 + 235 + 3 - 2;

      this.list_tables[x].dice[i].dice1.scaleX = this.list_tables[x].dice[i].dice1.scaleY = 0.3;
      this.list_tables[x].dice[i].dice2.scaleX = this.list_tables[x].dice[i].dice2.scaleY = 0.3;
      this.list_tables[x].dice[i].dice3.scaleX = this.list_tables[x].dice[i].dice3.scaleY = 0.3;


      let total = _.reduce(dice.split(""), function(sum, n) {
        return parseInt(sum) + parseInt(n);
      });

      let uniqDice = _.uniq(dice.split(""));

      let text;

      if(window.language.locale == "zh") {
              text = uniqDice.length == 1 ? "和" : (total >= 11 ? "大" : "小");
              this.list_tables[x].size[i] = new createjs.Text(text, "20px BebasNeue", text == "和" ? "#3aa955" : (text == "大" ? "#d22f2f" : "#1665c1"));
              this.list_tables[x].total[i] = new createjs.Text(total, "20px BebasNeue", text == "和" ? "#3aa955" : (text == "大" ? "#d22f2f" : "#1665c1"));
      } else {
              text = uniqDice.length == 1 ? "T" : (total >= 11 ? "B" : "S");
              this.list_tables[x].size[i] = new createjs.Text(text, "26px BebasNeue", text == "T" ? "#3aa955" : (text == "B" ? "#d22f2f" : "#1665c1"));
              this.list_tables[x].total[i] = new createjs.Text(total, "26px BebasNeue", text == "T" ? "#3aa955" : (text == "B" ? "#d22f2f" : "#1665c1"));
      }

      this.list_tables[x].size[i].x = this.list_tables[x].dice[i].dice3.x + 34;
      this.list_tables[x].size[i].y = this.list_tables[x].dice[i].dice3.y + 14;
      this.list_tables[x].size[i].textBaseline = "middle";
      this.list_tables[x].lastdice_res_container.addChild(this.list_tables[x].size[i]);

      if(window.language.locale == "zh") {
              this.list_tables[x].total[i].x = this.list_tables[x].size[i].x + 20;
      } else {
              this.list_tables[x].total[i].x = this.list_tables[x].size[i].x + 14;
      }

      this.list_tables[x].total[i].y = this.list_tables[x].size[i].y;
      this.list_tables[x].total[i].textBaseline = "middle";
      this.list_tables[x].lastdice_res_container.addChild(this.list_tables[x].total[i]);

      if (this.bigResult_data[x].dice[i - 5]) {
        this.bigResult_data[x].size.text = this.list_tables[x].size[i - 5].text;
        this.bigResult_data[x].size.color = this.list_tables[x].size[i - 5].color;

        this.bigResult_data[x].size.x = this.bigResult_data[x].dice[i - 5].dice3.x + 50;
        this.bigResult_data[x].size.y = this.bigResult_data[x].dice[i - 5].dice3.y + 22;

        this.bigResult_data[x].total.text = this.list_tables[x].total[i - 5].text;
        this.bigResult_data[x].total.color = this.list_tables[x].total[i - 5].color;

        if(window.language.locale == "zh") {
                this.bigResult_data[x].total.x = this.bigResult_data[x].size.x + 40;
        } else {
                this.bigResult_data[x].total.x = this.bigResult_data[x].size.x + 18;
        }

        this.bigResult_data[x].total.y = this.bigResult_data[x].size.y;
      }

    }

    if (!this.list_tables[x].lastdice_res_container.children.length) return;

    this.list_tables[x].lastdice_res_container.children = this.list_tables[x].lastdice_res_container.children.reverse()
    let shouldAnimate = true;
    for(var i = this.list_tables[x].lastdice_res_container.children.length-1; i >= this.list_tables[x].lastdice_res_container.children.length-5; i--) {

      if(this.list_tables[x].lastdice_res_container.children[i].isVoid) {
        shouldAnimate = false;
      }

      if(shouldAnimate) {
        createjs.Tween.get(this.list_tables[x].lastdice_res_container.children[i])
          .to({  alpha: 180 }, 180)
          .to({ alpha: 0 }, 180)
          .to({ alpha: 1 }, 180)
          .to({ alpha: 0 }, 180)
          .to({ alpha: 1 }, 180)
      }
    }

		this.list_tables[x].status.text = window.language.lobby.result;

  }
}
export default {
	instance
}
