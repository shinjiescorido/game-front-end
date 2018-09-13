import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';
import rmformat from '../../factories/formatter';

let formatData = rmformat();
let instance = null;

instance = {
	thumb_tables :[],
	list_tables : [],
  makeThumbnailTables (data, _target, _timer_c,  x, self) {
		this.thumb_tables[x] = _target.thumb_tables;
	
		this.drawBigRoad(data, _target, _timer_c,  x, self, "thumbnail");
		this.setStatus(data, _target, _timer_c,  x, self, "thumbnail");
  },
  makeListTables (data, _target, _timer_c,  x, self) {
		this.list_tables[x] = _target.list_tables;

		let label_spacing = 15;

		let deal_label = new createjs.Text(window.language.lobby.deal ,"18px latoregular","#fff");
		deal_label.x = 180;
		deal_label.y = 74 + this.list_tables[x].y ;
		_target.addChild(deal_label);

		if(window.language.locale == "zh") {
			deal_label.font = "13px latoregular";
		}

		let game_label_height = deal_label.getMeasuredHeight();

		this.list_tables[x].deal_count = new createjs.Text(data.marks.length, "18px latoregular","#fff");
		this.list_tables[x].deal_count.textAlign = "right";
		this.list_tables[x].deal_count.x = 310;
		this.list_tables[x].deal_count.y = deal_label.y + game_label_height + label_spacing;
		_target.addChild(this.list_tables[x].deal_count);

		// === game rounds
		let deal_count_height = this.list_tables[x].deal_count.getMeasuredHeight();
		let game_rounds_label = new createjs.Text(window.language.lobby.game ,"18px latoregular","#fff");
		game_rounds_label.x = 180;
		game_rounds_label.y = this.list_tables[x].deal_count.y + deal_count_height + label_spacing ;
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

		if(window.language.locale == "zh") {
			deal_label.font = "23px latoregular";
			this.list_tables[x].deal_count.font = "23px latoregular";
			game_rounds_label.font = "23px latoregular";
			this.list_tables[x].round_num.font = "23px latoregular";
		}

		//=== table status
		let round_num_height = this.list_tables[x].round_num.getMeasuredHeight();
		this.list_tables[x].status.text = window.language.lobby.nowbetting;
		this.list_tables[x].status.x = game_rounds_label.x;
		this.list_tables[x].status.y = this.list_tables[x].round_num.y + round_num_height + label_spacing + label_spacing;

		let roadmap_ct = new createjs.Container();
		let roadmap_bg = new createjs.Shape();
		roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,986,219);
		roadmap_bg.cache(0,0,986,219);
		roadmap_ct.addChild(roadmap_bg);
		roadmap_ct.set({x:366,y:this.list_tables[x].y + 10});
		_target.addChild(roadmap_ct);

		let lines = new createjs.Shape();
		lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0,0);
		roadmap_ct.addChild(lines);

		let posY = 0;// roadmap_bg.y;
		let posX = 0;// roadmap_bg.x;
		lines.graphics.moveTo(posX,posY);
		for(var i = 0; i <= 6 ; i++) {
			lines.graphics.moveTo(posX,posY+ (36.7*i)).lineTo(posX + 440, posY+ (36.7*i));
		}

		for(var i = 0; i <= 12 ; i++) {
			lines.graphics.moveTo(posX+(36.6*i),posY).lineTo(posX+(36.6*i),posY+220);
		}

		for(var i = 0; i <= 12 ; i++) {
			lines.graphics.moveTo(posX+440,posY+ (18.3*i)).lineTo(posX + 986, posY+ (18.3*i));
		}
		for(var i = 0; i <= 30 ; i++) {
			lines.graphics.moveTo(posX+440+(18.2*i),posY).lineTo(posX+440+(18.2*i), posY+220);
		}
		lines.graphics.ss(1.5);
		lines.graphics.moveTo(posX+440,posY+ (18.3*6)).lineTo(posX + 986, posY+ (18.3*6));
		lines.graphics.moveTo(posX+440,posY+ (18.3*9)).lineTo(posX + 986, posY+ (18.3*9));
		lines.graphics.moveTo(posX+440+(18.2*15),posY+ (18.3*9)).lineTo(posX +440+(18.2*15), posY+ 220);

		// lines.shadow = new createjs.Shadow("#000",2,2,6);
		lines.alpha =.5;

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

		// === let status
		let p_bg = null;
		let b_bg = null;
		let tie_bg = null;

		this.list_tables[x].resultStatCon = new createjs.Container();
		this.list_tables[x].resultStatCon.visible = true;
		_target.addChild(this.list_tables[x].resultStatCon);

		if (window.room_info) this.list_tables[x].resultStatCon.visible = false;

		for(var i = 0; i < 3; i++) {
			p_bg = new createjs.Shape();
			p_bg.graphics.beginFill("#0d3e67").drawRoundRect(0,0,62,28,8);
			p_bg.x = (i*66) + 628;
			p_bg.y = 243 + this.list_tables[x].y
			this.list_tables[x].resultStatCon.addChild(p_bg);

			b_bg = new createjs.Shape();
			b_bg.graphics.beginFill("#7f1d1e").drawRoundRect(0,0,62,28,8);
			b_bg.x = (i*66) + 893;
			b_bg.y = 243 + this.list_tables[x].y
			b_bg.y = 243 + this.list_tables[x].y
			this.list_tables[x].resultStatCon.addChild(b_bg);
		}

		tie_bg = new createjs.Shape();
		tie_bg.graphics.beginFill("#57802f").drawRoundRect(0,0,62,28,8);
		tie_bg.x = 826;
		tie_bg.y = 243 + this.list_tables[x].y;
		this.list_tables[x].resultStatCon.addChild(tie_bg);

		// === player count cosmetics
		let player_indi = new createjs.Shape();
		player_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
		player_indi.x = 628 + 4 + 10;
		player_indi.y = this.list_tables[x].y + 246 + 11;
		this.list_tables[x].resultStatCon.addChild(player_indi);

		let p_text = new createjs.Text(window.language.locale == "zh" ? "闲" : "P","12px lato", "#fff");
		p_text.x = player_indi.x;
		p_text.y = player_indi.y;
		p_text.textBaseline = "middle";
		p_text.textAlign = "center";
		this.list_tables[x].resultStatCon.addChild(p_text);

		//playerpair
		let playerpair_indi =  new createjs.Shape();
		playerpair_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
		playerpair_indi.x = 628 + 66 + 4 + 10;0.
		playerpair_indi.y = this.list_tables[x].y + 246 + 11;
		this.list_tables[x].resultStatCon.addChild(playerpair_indi);

		let p_text2 = new createjs.Text(window.language.locale == "zh" ? "闲" : "P","12px lato", "#fff");
		p_text2.x = playerpair_indi.x;
		p_text2.y = playerpair_indi.y;
		p_text2.textBaseline = "middle";
		p_text2.textAlign = "center";
		this.list_tables[x].resultStatCon.addChild(p_text2);

		let playerpair_indi2 =  new createjs.Shape();
		playerpair_indi2.graphics.ss(0.5).s("#fff").beginFill("#1465bf").drawCircle(0,0,3.5);
		playerpair_indi2.x = 628 + 66 + 4 + 16;
		playerpair_indi2.y = this.list_tables[x].y + 246 + 16;
		this.list_tables[x].resultStatCon.addChild(playerpair_indi2);

		//playernatural
		let playernat_indi =  new createjs.Shape();
		playernat_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
		playernat_indi.x =  628 + (66*2) + 4 + 10;
		playernat_indi.y = this.list_tables[x].y + 246 + 11;
		this.list_tables[x].resultStatCon.addChild(playernat_indi);

		let n_text = new createjs.Text(window.language.locale == "zh" ? "例" : "N","12px lato", "#fff");
		n_text.x = playernat_indi.x;
		n_text.y = playernat_indi.y;
		n_text.textBaseline = "middle";
		n_text.textAlign = "center";
		this.list_tables[x].resultStatCon.addChild(n_text);

		//tie
		let tie_indi =  new createjs.Shape();
		tie_indi.graphics.ss(1).s("#fff").beginFill("#689f39").drawCircle(0,0,9);
		tie_indi.x =  628 + (66*3) + 4 + 10;
		tie_indi.y = this.list_tables[x].y + 246 + 11;
		this.list_tables[x].resultStatCon.addChild(tie_indi);

		let t_text = new createjs.Text(window.language.locale == "zh" ? "和" : "T","12px lato", "#fff");
		t_text.x = tie_indi.x;
		t_text.y = tie_indi.y;
		t_text.textBaseline = "middle";
		t_text.textAlign = "center";
		this.list_tables[x].resultStatCon.addChild(t_text);

		let bankernat_indi = new createjs.Shape();
		bankernat_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
		bankernat_indi.x = 628 + (66*4) +4 + 10;
		bankernat_indi.y = this.list_tables[x].y + 246 + 11;
		this.list_tables[x].resultStatCon.addChild(bankernat_indi);

		let n_text2 = new createjs.Text(window.language.locale == "zh" ? "例" : "N","12px lato", "#fff");
		n_text2.x = bankernat_indi.x;
		n_text2.y = bankernat_indi.y;
		n_text2.textBaseline = "middle";
		n_text2.textAlign = "center";
		this.list_tables[x].resultStatCon.addChild(n_text2);

		//bankerpair
		let bankerpair_indi = new createjs.Shape();
		bankerpair_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
		bankerpair_indi.x = 628 + (66*5) +4 + 10;
		bankerpair_indi.y = this.list_tables[x].y + 246 + 11;
		this.list_tables[x].resultStatCon.addChild(bankerpair_indi);

		let bankerpair_indi2 =  new createjs.Shape();
		bankerpair_indi2.graphics.ss(0.5).s("#fff").beginFill("#d42e2e").drawCircle(0,0,3.5);
		bankerpair_indi2.x = 628 + (66*5) + 4 + 16;
		bankerpair_indi2.y = this.list_tables[x].y + 246 + 16;
		this.list_tables[x].resultStatCon.addChild(bankerpair_indi2);

		let b_text2 = new createjs.Text(window.language.locale == "zh" ? "庄" : "B","12px lato", "#fff");
		b_text2.x = bankerpair_indi.x;
		b_text2.y = bankerpair_indi.y;
		b_text2.textBaseline = "middle";
		b_text2.textAlign = "center";
		this.list_tables[x].resultStatCon.addChild(b_text2);

		//banker
		let banker_indi = new createjs.Shape();
		banker_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
		banker_indi.x = 628 + (66*6) +4 + 10;
		banker_indi.y = this.list_tables[x].y + 246 + 11;
		this.list_tables[x].resultStatCon.addChild(banker_indi);

		let b_text = new createjs.Text(window.language.locale == "zh" ? "庄" : "B" ,"12px lato", "#fff");
		b_text.x = banker_indi.x;
		b_text.y = banker_indi.y;
		b_text.textBaseline = "middle";
		b_text.textAlign = "center";
		this.list_tables[x].resultStatCon.addChild(b_text);

		// ===  player total texts
		this.list_tables[x].player_total_text = new createjs.Text("0","20px bebasNeue","#fff");
		this.list_tables[x].player_total_text.y = this.list_tables[x].y + 246;
		this.list_tables[x].player_total_text.x = 674 + 11;
		this.list_tables[x].player_total_text.textAlign = "right";
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].player_total_text);

		this.list_tables[x].playerpair_total_text = new createjs.Text("0","20px bebasNeue","#fff");
		this.list_tables[x].playerpair_total_text.y = this.list_tables[x].y + 246;
		this.list_tables[x].playerpair_total_text.x = 740 + 10;
		this.list_tables[x].playerpair_total_text.textAlign = "right";
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].playerpair_total_text);

		this.list_tables[x].playernatural_total_text = new createjs.Text("0","20px bebasNeue","#fff");
		this.list_tables[x].playernatural_total_text.y = this.list_tables[x].y + 246;
		this.list_tables[x].playernatural_total_text.x = 808 + 9;
		this.list_tables[x].playernatural_total_text.textAlign = "right";
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].playernatural_total_text);

		// ===  banker total texts
		this.list_tables[x].bankernautral_total_text = new createjs.Text("0","20px bebasNeue","#fff");
		this.list_tables[x].bankernautral_total_text.y = this.list_tables[x].y + 246;
		this.list_tables[x].bankernautral_total_text.x = 936 + 15;
		this.list_tables[x].bankernautral_total_text.textAlign = "right";
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].bankernautral_total_text);

		this.list_tables[x].bankerpair_total_text = new createjs.Text("0","20px bebasNeue","#fff");
		this.list_tables[x].bankerpair_total_text.y = this.list_tables[x].y + 246;
		this.list_tables[x].bankerpair_total_text.x = 1002 + 14;
		this.list_tables[x].bankerpair_total_text.textAlign = "right";
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].bankerpair_total_text);

		this.list_tables[x].banker_total_text = new createjs.Text("0","20px bebasNeue","#fff");
		this.list_tables[x].banker_total_text.y = this.list_tables[x].y + 246;
		this.list_tables[x].banker_total_text.x = 1072 + 10;
		this.list_tables[x].banker_total_text.textAlign = "right";
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].banker_total_text);

		this.list_tables[x].tie_total_text = new createjs.Text("0","20px bebasNeue","#fff");
		this.list_tables[x].tie_total_text.y = this.list_tables[x].y + 246;
		this.list_tables[x].tie_total_text.x = 870 + 12;
		this.list_tables[x].tie_total_text.textAlign = "right";
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].tie_total_text);

		// === banker stats
		let banker_bar_bg = new createjs.Shape();
		banker_bar_bg.graphics.ss(2).s("#7f1d1e").drawRoundRect(0,0,156,26,8);
		banker_bar_bg.x = 1093;
		banker_bar_bg.y = 244 + this.list_tables[x].y;
		this.list_tables[x].resultStatCon.addChild(banker_bar_bg);

		this.list_tables[x].banker_bar = new createjs.Shape();
		this.list_tables[x].banker_bar.graphics.beginFill("#7f1d1e").drawRect(0,0,156,28);
		this.list_tables[x].banker_bar.x = banker_bar_bg.x;
		this.list_tables[x].banker_bar.y = banker_bar_bg.y;
		this.list_tables[x].banker_bar.mask = banker_bar_bg;
		this.list_tables[x].banker_bar.scaleX = .5;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].banker_bar);

		this.list_tables[x].banker_percent = new createjs.Text("100%","28px bebasNeue","#7f1d1e");
		this.list_tables[x].banker_percent.y = 242 + this.list_tables[x].y;
		this.list_tables[x].banker_percent.x = 1280;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].banker_percent);

		// === player stats
		let player_bar_bg = new createjs.Shape();
		player_bar_bg.graphics.ss(2).s("#0d3e67").drawRoundRect(0,0,155,26,8);
		player_bar_bg.x = 465;
		player_bar_bg.y = 244 + this.list_tables[x].y;
		this.list_tables[x].resultStatCon.addChild(player_bar_bg);

		this.list_tables[x].player_bar = new createjs.Shape();
		this.list_tables[x].player_bar.graphics.beginFill("#0d3e67").drawRect(0,0,155,26);
		this.list_tables[x].player_bar.x = player_bar_bg.x + 155;
		this.list_tables[x].player_bar.y = player_bar_bg.y;
		this.list_tables[x].player_bar.mask = player_bar_bg;
		this.list_tables[x].player_bar.regX = 155;
		this.list_tables[x].player_bar.scaleX = .5;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].player_bar);

		this.list_tables[x].player_percent = new createjs.Text("100%","28px bebasNeue","#0d3e67");
		this.list_tables[x].player_percent.y = 242 + this.list_tables[x].y;
		this.list_tables[x].player_percent.x = 385;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].player_percent);

		// === Room info
		this.list_tables[x].roomInfoCon = new createjs.Container();
		this.list_tables[x].roomInfoCon.x = 350;
		this.list_tables[x].roomInfoCon.y = this.list_tables[x].y + 243;
		this.list_tables[x].roomInfoCon.visible = false;
		_target.addChild(this.list_tables[x].roomInfoCon);

		if (window.room_info) this.list_tables[x].roomInfoCon.visible = true;

		let roomInfoBg = new createjs.Shape();
		roomInfoBg.graphics.beginFill("#333333").drawRect(0, 0, 1018, 40);
		this.list_tables[x].roomInfoCon.addChild(roomInfoBg);

		let usersIco = new createjs.Bitmap('/img/v2_1/icons/room_info/lobby_users.png');
		usersIco.x = 15;
		usersIco.y = 8;
		usersIco.scaleX = 1;
		usersIco.scaleY = 1;
		this.list_tables[x].roomInfoCon.addChild(usersIco);

		this.list_tables[x].userCount = new createjs.Text("0","20px bebasNeue","#b3b3b3");
		this.list_tables[x].userCount.x = usersIco.x + 35;
		this.list_tables[x].userCount.y = 9;
		this.list_tables[x].userCount.textAlign = 'left';
		this.list_tables[x].roomInfoCon.addChild(this.list_tables[x].userCount);

		let infoPlayerMark = new createjs.Shape();
		infoPlayerMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 11);
		infoPlayerMark.x = 125;
		infoPlayerMark.y = 20;
		this.list_tables[x].roomInfoCon.addChild(infoPlayerMark);

		let playerMarkText = new createjs.Text(window.language.locale == "zh" ? "闲" : "P", '15px Lato', '#fff');
		playerMarkText.x = infoPlayerMark.x;
		playerMarkText.y = infoPlayerMark.y - 9;
		playerMarkText.textAlign = 'center';
		this.list_tables[x].roomInfoCon.addChild(playerMarkText);

		this.list_tables[x].playerBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
		this.list_tables[x].playerBetAmt.x = infoPlayerMark.x + 20;
		this.list_tables[x].playerBetAmt.y = 9;
		this.list_tables[x].playerBetAmt.textAlign = 'left';
		this.list_tables[x].roomInfoCon.addChild(this.list_tables[x].playerBetAmt);

		let infoPlayerPairMark = new createjs.Shape();
		infoPlayerPairMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 11);
		infoPlayerPairMark.x = infoPlayerMark.x + 180;
		infoPlayerPairMark.y = 20;
		this.list_tables[x].roomInfoCon.addChild(infoPlayerPairMark);

		let playerPairCircle = new createjs.Shape();
		playerPairCircle.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 3);
		playerPairCircle.x = infoPlayerPairMark.x + 7;
		playerPairCircle.y = infoPlayerPairMark.y + 7;
		this.list_tables[x].roomInfoCon.addChild(playerPairCircle);

		let playerPairMarkText = new createjs.Text(window.language.locale == "zh" ? "闲" : "P", '15px Lato', '#fff');
		playerPairMarkText.x = infoPlayerPairMark.x;
		playerPairMarkText.y = infoPlayerPairMark.y - 9;
		playerPairMarkText.textAlign = 'center';
		this.list_tables[x].roomInfoCon.addChild(playerPairMarkText);

		this.list_tables[x].playerPairBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
		this.list_tables[x].playerPairBetAmt.x = infoPlayerPairMark.x + 20;
		this.list_tables[x].playerPairBetAmt.y = 9;
		this.list_tables[x].playerPairBetAmt.textAlign = 'left';
		this.list_tables[x].roomInfoCon.addChild(this.list_tables[x].playerPairBetAmt);

		let infoBankerMark = new createjs.Shape();
		infoBankerMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 11);
		infoBankerMark.x = infoPlayerPairMark.x + 180;
		infoBankerMark.y = 20;
		this.list_tables[x].roomInfoCon.addChild(infoBankerMark);

		let bankerMarkText = new createjs.Text(window.language.locale == "zh" ? "庄" : "B", '15px Lato', '#fff');
		bankerMarkText.x = infoBankerMark.x;
		bankerMarkText.y = infoBankerMark.y - 9;
		bankerMarkText.textAlign = 'center';
		this.list_tables[x].roomInfoCon.addChild(bankerMarkText);

		this.list_tables[x].bankerBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
		this.list_tables[x].bankerBetAmt.x = infoBankerMark.x + 20;
		this.list_tables[x].bankerBetAmt.y = 9;
		this.list_tables[x].bankerBetAmt.textAlign = 'left';
		this.list_tables[x].roomInfoCon.addChild(this.list_tables[x].bankerBetAmt);

		let infoBankerPairMark = new createjs.Shape();
		infoBankerPairMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 11);
		infoBankerPairMark.x = infoBankerMark.x + 180;
		infoBankerPairMark.y = 20;
		this.list_tables[x].roomInfoCon.addChild(infoBankerPairMark);

		let bankerPairCircle = new createjs.Shape();
		bankerPairCircle.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 3);
		bankerPairCircle.x = infoBankerPairMark.x - 7;
		bankerPairCircle.y = infoBankerPairMark.y - 7;
		this.list_tables[x].roomInfoCon.addChild(bankerPairCircle);

		let bankerPairMarkText = new createjs.Text(window.language.locale == "zh" ? "庄" : "B", '15px Lato', '#fff');
		bankerPairMarkText.x = infoBankerPairMark.x;
		bankerPairMarkText.y = infoBankerPairMark.y - 9;
		bankerPairMarkText.textAlign = 'center';
		this.list_tables[x].roomInfoCon.addChild(bankerPairMarkText);

		this.list_tables[x].bankerPairBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
		this.list_tables[x].bankerPairBetAmt.x = infoBankerPairMark.x + 20;
		this.list_tables[x].bankerPairBetAmt.y = 9;
		this.list_tables[x].bankerPairBetAmt.textAlign = 'left';
		this.list_tables[x].roomInfoCon.addChild(this.list_tables[x].bankerPairBetAmt);

		let infoTieMark = new createjs.Shape();
		infoTieMark.graphics.ss(1).beginStroke('#fff').beginFill('#689f38').drawCircle(0, 0, 11);
		infoTieMark.x = infoBankerPairMark.x + 180;
		infoTieMark.y = 20;
		this.list_tables[x].roomInfoCon.addChild(infoTieMark);

		let tieMarkText = new createjs.Text(window.language.locale == "zh" ? '和' : 'T', '15px Lato', '#fff');
		tieMarkText.x = infoTieMark.x;
		tieMarkText.y = infoTieMark.y - 9;
		tieMarkText.textAlign = 'center';
		this.list_tables[x].roomInfoCon.addChild(tieMarkText);

		this.list_tables[x].tieBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
		this.list_tables[x].tieBetAmt.x = infoTieMark.x + 20;
		this.list_tables[x].tieBetAmt.y = 9;
		this.list_tables[x].tieBetAmt.textAlign = 'left';
		this.list_tables[x].roomInfoCon.addChild(this.list_tables[x].tieBetAmt);

		if (window.language.locale === "zh") {
			// bankerMarkText.y += 1;
			bankerPairMarkText.y += 1;
			tieMarkText.y += 1;
			playerMarkText.y += 1;
			playerPairMarkText.y -= 1;

			bankerMarkText.font = '14px Lato';
			bankerPairMarkText.font = '14px Lato';
			tieMarkText.font = '14px Lato';
			playerMarkText.font = '14px Lato';
			playerPairMarkText.font = '14px Lato';
		}
		
		this.setRoomInfo(data.betInfo, x);

		// === result bg
		let player_bg = new createjs.Shape();
		player_bg.graphics.beginFill("#1665c1").drawRoundRect(0,0,86,104,8);
		player_bg.x = 1412;
		player_bg.y = this.list_tables[x].y + 158;
		_target.addChild(player_bg);

		let player_label = new createjs.Text(window.language.lobby.playercaps,"17px lato","#fff");
		player_label.x = player_bg.x + (86/2);
		player_label.textAlign = "center";
		player_label.y = this.list_tables[x].y + 230;
		_target.addChild(player_label);

		if(window.language.locale == "zh") {
			player_label.font = "22px lato","#fff";
		}

		let banker_bg = new createjs.Shape();
		banker_bg.graphics.beginFill("#d32f2e").drawRoundRect(0,0,86,104,8);
		banker_bg.x = 1412 + 86 + 8;
		banker_bg.y = this.list_tables[x].y + 158;
		_target.addChild(banker_bg);

		let banker_label = new createjs.Text(window.language.lobby.bankercaps,"17px lato","#fff");
		banker_label.x = banker_bg.x+ (86/2);
		banker_label.textAlign = "center";
		banker_label.y = this.list_tables[x].y + 230 ;
		_target.addChild(banker_label);

		if(window.language.locale == "zh") {
				banker_label.font = "22px lato";
		}

		this.list_tables[x].card_result_container = new createjs.Container();
		this.list_tables[x].card_result_container.y = this.list_tables[x].y + 140;
		this.list_tables[x].card_result_container.x = 1380;
		_target.addChild(this.list_tables[x].card_result_container);

		// === road map
		let pearlroad_mask = new createjs.Shape();
		pearlroad_mask.graphics.beginFill("red").drawRect(0,10,445,220);
		pearlroad_mask.x = 366
		pearlroad_mask.y = this.list_tables[x].y

		this.list_tables[x].pearlroad_container = new createjs.Container();
		this.list_tables[x].pearlroad_container.y = this.list_tables[x].y + 8.5;
		this.list_tables[x].pearlroad_container.x = 364;
		_target.addChild(this.list_tables[x].pearlroad_container);

		let bigroad_mask = new createjs.Shape();
		bigroad_mask.graphics.beginFill("red").drawRect(0,10,548,108);
		bigroad_mask.x = 364 + 442
		bigroad_mask.alpha = .5;
		bigroad_mask.y = this.list_tables[x].y;


		this.list_tables[x].bigroad_container = new createjs.Container();
		this.list_tables[x].bigroad_container.y = this.list_tables[x].y + 9.5;
		this.list_tables[x].bigroad_container.x = 787 + 20;
		this.list_tables[x].bigroad_container.mask = bigroad_mask;
		_target.addChild(this.list_tables[x].bigroad_container);

		this.list_tables[x].bigeyeboy_container = new createjs.Container();
		this.list_tables[x].bigeyeboy_container.y = this.list_tables[x].y + 119;
		this.list_tables[x].bigeyeboy_container.x = 805;
		_target.addChild(this.list_tables[x].bigeyeboy_container);

		this.list_tables[x].small_container = new createjs.Container();
		this.list_tables[x].small_container.y = this.list_tables[x].y + 174;
		this.list_tables[x].small_container.x = 805;
		_target.addChild(this.list_tables[x].small_container);


		this.list_tables[x].cockroach_container = new createjs.Container();
		this.list_tables[x].cockroach_container.y = this.list_tables[x].y + 175;
		this.list_tables[x].cockroach_container.x = 1079;
		_target.addChild(this.list_tables[x].cockroach_container);

		_target.addChild(this.list_tables[x].maintenance_container);
		_target.addChild(this.list_tables[x].bet_range_container)

		if(!data.marks.length) {
			if(this.list_tables[x].status) {
				this.list_tables[x].status.text = window.language.prompts.promptshuffling;
			}

			if(this.list_tables[x].card_result_container) {
				this.list_tables[x].card_result_container.removeAllChildren();
			}
		}

		this.list_tables[x].maintenanceCon = new createjs.Container();
		this.list_tables[x].maintenanceCon.visible = false;
		_target.addChild(this.list_tables[x].maintenanceCon);

		this.list_tables[x].maintenanceCon.on("click", (e) => {
			return;
		});

		let header_bg = ["#980000","#2b0000"];
		let text_color = "#efb052";

		if(data.roomType == "p") {
			header_bg = ["#bd0000","#7c0000"];
			text_color = "#efb052";
		} else if(data.roomType == "v") {
			header_bg = ["#fedd78","#d5a515"];
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

		this.list_tables[x].table_name = new createjs.Text(window.language.lobby.baccarat,"22px ArvoItalic","#fdba44");
		this.list_tables[x].table_name.x = 80; //175;
		this.list_tables[x].table_name.y = 13 + this.list_tables[x].y;
		this.list_tables[x].maintenanceCon.addChild(this.list_tables[x].table_name);

		if(window.language.locale == "zh") {
			this.list_tables[x].table_name = "25px ArvoItalic";
		}

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

		this.checkMaintenance(data, false, x, _timer_c);

		this.setPercentages(data, _target, _timer_c,  x, self);
		this.drawPearlRoad(data, _target, _timer_c,  x, self);
		this.drawBigRoad(data, _target, _timer_c,  x, self, "list");
		this.drawBigEyeBoy(data, _target, _timer_c,  x, self);
		this.drawSmallRoad(data, _target, _timer_c,  x, self);
		this.drawCockradRoad(data, _target, _timer_c,  x, self);
		this.inputRes(data, _target, _timer_c,  x, self);
		this.setStatus(data, _target, _timer_c,  x, self);

		self.stage_list[x].update();
  },
  setRoomInfo(data, x) {
  	if (!this.list_tables[x]) return;

  	this.resetRoomInfo(x);

		if (!data) return;

		let totalUsers = 0;

		if (data.player) {
			this.list_tables[x].playerBetAmt.text = `${numberWithCommas(data.player.totalBets)}/${numberWithCommas(data.player.totalUsers)}`;
			totalUsers += data.player.totalUsers;
		}

		if (data.playerpair) {
			this.list_tables[x].playerPairBetAmt.text = `${numberWithCommas(data.playerpair.totalBets)}/${numberWithCommas(data.playerpair.totalUsers)}`;
		}

		if (data.banker) {
			this.list_tables[x].bankerBetAmt.text = `${numberWithCommas(data.banker.totalBets)}/${numberWithCommas(data.banker.totalUsers)}`;
			totalUsers += data.banker.totalUsers;
		}

		if (data.bankerpair) {
			this.list_tables[x].bankerPairBetAmt.text = `${numberWithCommas(data.bankerpair.totalBets)}/${numberWithCommas(data.bankerpair.totalUsers)}`;
		}

		if (data.tie) {
			this.list_tables[x].tieBetAmt.text = `${numberWithCommas(data.tie.totalBets)}/${numberWithCommas(data.tie.totalUsers)}`;
		}

		this.list_tables[x].userCount.text = numberWithCommas(totalUsers);
  },
  resetRoomInfo(x) {
  	this.list_tables[x].playerBetAmt.text = '0/0';
  	this.list_tables[x].playerPairBetAmt.text = '0/0';
  	this.list_tables[x].bankerBetAmt.text = '0/0';
  	this.list_tables[x].bankerPairBetAmt.text = '0/0';
  	this.list_tables[x].tieBetAmt.text = '0/0';
  	this.list_tables[x].userCount.text = '0';
  },
  checkMaintenance(maintenanceData, socket, x, _timer) {
		if(!this.list_tables || !this.list_tables[x] || !this.list_tables[x].maintenanceCon) return;

		if (window.userAuthority === "admin") return;

		let maintenance = false;
		let activeMaintenance = [];
		let mainText = '';
		let subText = '';
		let maintenanceSetting = [];
		if (!socket) {
			maintenanceSetting = maintenanceData.maintenanceSetting.maintenance;

			for (var i = 0; i < maintenanceSetting.length; i++) {
				if (this.list_tables[x].slave === maintenanceSetting[i].type) {
					for (var j = 0; j < maintenanceSetting[i].info.length; j++) {
						if (maintenanceSetting[i].info[j].status === 1) {
							maintenance = true;
							activeMaintenance = maintenanceSetting[i].info[j];
						}
					} // end for loop
				}
				else if (this.list_tables[x].slave === '' && maintenanceSetting[i].type === 'normal') {
					for (var j = 0; j < maintenanceSetting[i].info.length; j++) {
						if (maintenanceSetting[i].info[j].status === 1) {
							maintenance = true;
							activeMaintenance = maintenanceSetting[i].info[j];
						}
					} // end for loop
				}
			} // end for loop
		}
		else {
			activeMaintenance = maintenanceData.data;

			if (this.list_tables[x].slave === activeMaintenance.slave) {
				if (parseInt(activeMaintenance.status) === 1) {
					maintenance = true;
				}
				else {
					maintenance = false;
				}
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
			$(_timer.canvas).hide();
			this.list_tables[x].maintenanceCon.visible = true;
			this.list_tables[x].maintenanceTxt.text = mainText;
			this.list_tables[x].maintenanceSubTxt.text = subText;
			this.list_tables[x].maintenanceTime.text = newStartTime +' ~ '+ newEndTime;

			if (this.list_tables[x].flippyImg) {
				this.list_tables[x].flippyImg.visible = false;
			}
		}
		else {
			$(_timer.canvas).show();
			this.list_tables[x].maintenanceCon.visible = false;

			if (this.list_tables[x].flippyImg) {
				this.list_tables[x].flippyImg.visible = true;
			}
		}
	},
	inputRes (data, _target, _timer_c,  x, self) {
		if(this.thumb_tables[x]) {
			if(data.roundStatus != "S") {
				this.thumb_tables[x].status.text = window.language.lobby.dealing;
			}
		}

		if(!this.list_tables[x] || !this.list_tables[x].card_result_container) return;
		
		self.stage_list[x].isUpdate = true;

		this.list_tables[x].card_result_container.removeAllChildren();

		if(data.roundStatus != "S") {
			this.list_tables[x].status.text = window.language.lobby.dealing;
		}

		if(data.gameInfo.player1) {
			let player1 = createCardSprite(self,40,60,self.context.load.getResources("cards-60"));//"/img/cards/small_sprite_cards_60.png");
			player1.gotoAndStop("C"+data.gameInfo.player1);
			player1.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, 2, 5);
			this.list_tables[x].card_result_container.addChild(player1);
			player1.set({x:71,y:25});
		}

		if(data.gameInfo.player2) {
			let player2 = createCardSprite(self,40,60,self.context.load.getResources("cards-60"));//"/img/cards/small_sprite_cards_60.png");
			player2.gotoAndStop("C"+data.gameInfo.player2);
			player2.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, 2, 5);
			this.list_tables[x].card_result_container.addChild(player2);
			player2.set({x:39,y:25});

			try {
				this.list_tables[x].card_result_container.setChildIndex(player2, 0);
			} catch(err) {
			}
		}

		if(data.gameInfo.player3) {
			let player3 = createCardSprite(self,40,60,self.context.load.getResources("cards-60"));//"/img/cards/small_sprite_cards_60.png");
			player3.gotoAndStop("C"+data.gameInfo.player3);
			player3.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, -2, 5);
			this.list_tables[x].card_result_container.addChild(player3);
			player3.set({x:105,y:75});
			player3.rotation = 90;
		}

		if(data.gameInfo.banker1) {
			let banker1 = createCardSprite(self,40,60,self.context.load.getResources("cards-60"));//"/img/cards/small_sprite_cards_60.png");
			banker1.gotoAndStop("C"+data.gameInfo.banker1);
			banker1.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, 2, 5);
			this.list_tables[x].card_result_container.addChild(banker1);
			banker1.set({x:132,y:25});
		}

		if(data.gameInfo.banker2) {
			let banker2 = createCardSprite(self,40,60,self.context.load.getResources("cards-60"));//"/img/cards/small_sprite_cards_60.png");
			banker2.gotoAndStop("C"+data.gameInfo.banker2);
			banker2.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, 2, 5);
			this.list_tables[x].card_result_container.addChild(banker2);
			banker2.set({x:164,y:25});
		}

		if(data.gameInfo.banker3) {
			let banker3 = createCardSprite(self,40,60,self.context.load.getResources("cards-60"));//"/img/cards/small_sprite_cards_60.png");
			banker3.gotoAndStop("C"+data.gameInfo.banker3);
			banker3.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, -2, 5);
			this.list_tables[x].card_result_container.addChild(banker3);
			banker3.x = 198;
			banker3.y = 75;
			banker3.rotation = 90;
		}

		setTimeout(() => {
			self.stage_list[x].isUpdate = false;
		}, 1000)
	},
	setResult(data, _target, _timer_c,  x, self, disp) {

		self.stage_list[x].isUpdate = true;
		if(disp == "list") {
			if(!this.list_tables[x] || !this.list_tables[x].status) return;
			this.list_tables[x].status.text  = window.language.lobby.result;
			this.list_tables[x].deal_count.text = data.marks.length
		} else {
			if(!this.thumb_tables[x] || !this.thumb_tables[x].status) return;
			this.thumb_tables[x].status.text  = window.language.lobby.result;
		}

		setTimeout(() => {
			self.stage_list[x].isUpdate = false;
		}, 100)
	},
	setPercentages (data, _target, _timer_c,  x, self) {

		self.stage_list[x].isUpdate = true;

	let data_marks = data.marks;

		data_marks =  _.filter(data_marks, function (e) {
			return e;
		});

		let count = _.groupBy(data_marks, function (e) {
			return e.mark;
		});

		let player_count = 0;
		let banker_count = 0;
		let tie_count = 0;

		let player_pair_cnt = 0;
		let banker_pair_cnt = 0;

		let banker_natural_cnt = 0;
		let player_natural_cnt = 0;

		let natural = {
			player: 0,
			banker: 0
		};

		data_marks.forEach(function (e) {
			if(e.mark == "b" || e.mark == "q" || e.mark == "w"|| e.mark == "e") {
				banker_count ++
			} else if(e.mark  == "p" || e.mark  == "f" || e.mark  == "g" || e.mark  == "h" ) {
				player_count ++
			}
			 else if(e.mark  == "t" || e.mark  == "i" || e.mark  == "j" || e.mark  == "k" ) {
				tie_count ++
			}

			if(e.mark == "q" || e.mark == "w" || e.mark == "f" || e.mark == "g" || e.mark == "i" || e.mark == "j") {
				banker_pair_cnt ++;
			}

			if(e.mark == "w" || e.mark == "e" || e.mark == "g" || e.mark == "h"  || e.mark == "j" || e.mark == "k") {
				player_pair_cnt ++;
			}

			_.forEach(e.natural, (element) => {
				natural[element]++;
			})
		});

		createjs.Tween.get(this.list_tables[x].player_bar)
		.to({
			scaleX : (player_count)/data_marks.length
		},150)

		createjs.Tween.get(this.list_tables[x].banker_bar)
		.to({
			scaleX : (banker_count)/data_marks.length
		},150)

		if(!this.list_tables[x].player_percent) return;
		this.list_tables[x].player_percent.text = Math.round(player_count/(data_marks.length ? data_marks.length : 1)*100) + "%";
		if(!this.list_tables[x].banker_percent) return;
		this.list_tables[x].banker_percent.text = Math.round(banker_count/(data_marks.length ? data_marks.length : 1)*100) + "%";

		this.list_tables[x].player_total_text.text = player_count;
		this.list_tables[x].playerpair_total_text.text = player_pair_cnt;
		this.list_tables[x].playernatural_total_text.text = natural.player;
		// ===  banker total texts
		this.list_tables[x].bankernautral_total_text.text = natural.banker;
		this.list_tables[x].bankerpair_total_text.text = banker_pair_cnt;
		this.list_tables[x].banker_total_text.text = banker_count;
		this.list_tables[x].tie_total_text.text = tie_count;

		setTimeout(() => {
			self.stage_list[x].isUpdate = false;
		}, 100)
	},
	drawBigRoad (data, _target, _timer_c,  x, self, disp) {

		let width = 19;
		let addy = 0;
		let addX = 0;

		if(disp == "thumbnail") {
			if(!this.thumb_tables[x] || !this.thumb_tables[x].bigroad_container) return;

			if(this.thumb_tables[x].bigroad_container) {
				this.thumb_tables[x].bigroad_container.removeAllChildren();
			}
			width = 16;
			addy = 0.6;
			addX = -0.5;
		} else {
			addy = 2.2;
			self.stage_list[x].isUpdate = true;
			
			if(this.list_tables[x].bigroad_container) {
				this.list_tables[x].bigroad_container.removeAllChildren();
			}               
		}

		let font_size = "16px";

		let miscData = (data.slave && data.slave == 'supersix')?data:{};
		let marks = formatData.fnFormatBCBigRoad(data.marks,6,27,miscData);

		for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
				if(marks.matrix[i][e] === undefined) continue;

				let sp;
				// let sp = createSpriteRoadMap(self.context.load.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, sp);
				if(disp == "thumbnail") {
					sp = createSpriteRoadMap(self.context.load.getResources("roadmap-16") , 16,16, sp);
					font_size = "12px";
					sp.x = (e * 16) + 0.7;
					sp.y = i * 15.6;
				} else {
					sp = createSpriteRoadMap(self.context.load.getResources("roadmap-20") , 20,20, sp);
					sp.x = (e*18.20) - 1.2;
					sp.y = (i*18.26) - 1.2;
				}

				if(marks.matrix[i][e].ties) {
					sp.gotoAndStop("big-"+marks.matrix[i][e].mark+"-t");
				} else {
					sp.gotoAndStop("big-"+marks.matrix[i][e].mark);
				}

				if(disp == "thumbnail") {
					this.thumb_tables[x].bigroad_container.addChild(sp);
				} else {
					this.list_tables[x].bigroad_container.addChild(sp);
				}

				if(marks.matrix[i][e].ties) {
					if(marks.matrix[i][e].ties > 1) {
						let tie_text = new createjs.Text(marks.matrix[i][e].ties, "bold "+font_size+" BebasNeue","#000");
						tie_text.y = sp.y + (width/2) + addy;
						tie_text.x = sp.x  + (width/2) + addX;
						tie_text.textAlign = "center";
						tie_text.textBaseline = "middle";
						
						if(disp == "thumbnail") { // adding to thumbnail
							this.thumb_tables[x].bigroad_container.addChild(tie_text);
						} else {
							this.list_tables[x].bigroad_container.addChild(tie_text);
						}

					}
					sp.gotoAndStop("big-"+marks.matrix[i][e].mark+"-t");
				} else {
					sp.gotoAndStop("big-"+marks.matrix[i][e].mark);
				}
			}// end marks matrix for
		} // end marks for

		if(disp == 'list') {
			setTimeout(() => {
				self.stage_list[x].isUpdate = false;
			}, 100)
		}
	},
	drawBigEyeBoy (data, _target, _timer_c,  x, self) {

		if(!this.list_tables[x] || !this.list_tables[x].bigeyeboy_container) return;

	this.list_tables[x].bigeyeboy_container.removeAllChildren();
	self.stage_list[x].isUpdate = true

		let marks = formatData.fnFormatBigEyeBoy(data.marks,6,24);

		for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
				if(marks.matrix[i][e] === undefined) continue;
				let sp = createSpriteRoadMap(self.context.load.getResources("roadmap-16") , 16,16, sp);
				sp.y = i * 9.1;
				sp.x = e * 9.15;
				sp.scaleX = sp.scaleY = .6

				sp.gotoAndStop("bigeye-"+marks.matrix[i][e].mark);

				this.list_tables[x].bigeyeboy_container.addChild(sp);
			}
		} // end fpr
		setTimeout(() => {
			self.stage_list[x].isUpdate = false;
		}, 100)
	},
	drawSmallRoad (data, _target, _timer_c,  x, self) {
		if(!this.list_tables[x] || !this.list_tables[x].small_container) return;
	this.list_tables[x].small_container.removeAllChildren();

	self.stage_list[x].isUpdate = true;

		let marks = formatData.fnFormatSmallRoad(data.marks,6,24);

	for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
				if(marks.matrix[i][e] === undefined) continue;
				let sp = createSpriteRoadMap(self.context.load.getResources("roadmap-16") , 16,16, sp);
				sp.y = i * 9.1;
				sp.x = e * 9.15;
				sp.scaleX = sp.scaleY = .6

				sp.gotoAndStop("bigsmall-"+marks.matrix[i][e].mark);

				this.list_tables[x].small_container.addChild(sp);
			}
		} // end for
		setTimeout(() => {
			self.stage_list[x].isUpdate = false;
		}, 100)
	},
	drawCockradRoad (data, _target, _timer_c,  x, self) {

		if(!this.list_tables[x] || !this.list_tables[x].cockroach_container) return;

		this.list_tables[x].cockroach_container.removeAllChildren();

		self.stage_list[x].isUpdate = true

		let marks = formatData.fnFormatCockroachPig(data.marks,6,24);

		for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
				if(marks.matrix[i][e] === undefined) continue;
				let sp = createSpriteRoadMap(self.context.load.getResources("roadmap-16") , 16,16, sp);
				sp.y = i * 9.1;
				sp.x = e * 9.15;
				sp.scaleX = sp.scaleY = .55

				sp.gotoAndStop("roach-"+marks.matrix[i][e].mark);

				this.list_tables[x].cockroach_container.addChild(sp);
			}
		} //end for 
		setTimeout(() => {
			self.stage_list[x].isUpdate = false;
		}, 100)
	},
	drawPearlRoad (data, _target, _timer_c,  x, self) {
		if(!this.list_tables[x] || !this.list_tables[x].pearlroad_container) return;
		this.list_tables[x].pearlroad_container.removeAllChildren();

		self.stage_list[x].isUpdate = true

		if(!this.list_tables[x] || !this.list_tables[x].pearlroad_container) return;

		this.list_tables[x].pearlroad_container.removeAllChildren();

		let miscData = (data.slave && data.slave == 'supersix')?data:{};
		let marks = formatData.fnFormatBCPearlRoad(data.marks,6,14,miscData);

		for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
				if(marks.matrix[i][e] === undefined) continue;
				let sp = createSpriteRoadMap(window.language.locale == "zh" ? "/img/all_scoreboard_zh.png" : "/img/all_scoreboard.png" , 40,40, sp);
				sp.x = (e*36.6) + 2;
				sp.y = i*36.6;
				sp.gotoAndStop("pearl-"+marks.matrix[i][e].mark);
				this.list_tables[x].pearlroad_container.addChild(sp);
			} //end for
		} //end for

		setTimeout(() => {
			self.stage_list[x].isUpdate = false;
		}, 100)
	},
	setStatus (data, _target, _timer_c,  x, self, disp = 'list') {
		//=== table status
		let status = "";
		if(data.roundStatus == "P") {
			if(data.gameName != "Sicbo") {
				status = window.language.lobby.dealing
			} else {
				status = window.language.lobby.result
			}
		}
		if(data.roundStatus == "S") {
			status = window.language.lobby.nowbetting;
		}

		if(data.roundStatus == "E") {
			status = window.language.lobby.bettingend;
			if(!data.marks.length) {
				status = window.language.prompts.promptshuffling;
			}
		}
		
		if(data.roundStatus == "R") {
			status = window.language.lobby.result;
		}

		if(data.is_shoeChange) {
			if(!data.marks.length) {
				status = window.language.prompts.promptshuffling;   
			}
		}
		if(disp == 'thumbnail') {
			this.thumb_tables[x].status.text = status;
		} else {
			this.list_tables[x].status.text = status;
		}
	}
}
export default {
	instance
}