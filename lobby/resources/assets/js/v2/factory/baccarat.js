import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';
import rmformat from '../../factories/formatter';

let formatData = rmformat();
let instance = null;

instance = {
		tables :[],
    makeListTables (data, _target, _timer_c,  x, self) {
    	this.tables[x] = _target.tables
    	// === deal count
			let deal_label = new createjs.Text(window.language.lobby.deal,"18px lato","#fff");
			deal_label.x = 200;
			deal_label.y = 68;
			_target.addChild(deal_label);

			if(window.language.locale == "zh") {
				deal_label.font = "23px lato";
			}

			let label_spacing = 8;

			let game_label_height = deal_label.getMeasuredHeight();
			this.tables[x].deal_count = new createjs.Text(data.marks.length, "18px latobold","#fff");
			this.tables[x].deal_count.textAlign = "right";
			this.tables[x].deal_count.x = 330;
			this.tables[x].deal_count.y = deal_label.y + game_label_height + label_spacing;
			_target.addChild(this.tables[x].deal_count);

			// === game rounds
			let deal_count_height = this.tables[x].deal_count.getMeasuredHeight();
			let game_rounds_label = new createjs.Text(window.language.lobby.game,"18px lato","#fff");
			game_rounds_label.x = 200;
			game_rounds_label.y = this.tables[x].deal_count.y + deal_count_height + label_spacing ;
			_target.addChild(game_rounds_label);

			if(window.language.locale == "zh") {
				game_rounds_label.font = "23px lato";
			}

			let height_result = game_rounds_label.getMeasuredHeight();
			this.tables[x].round_num.text = data.currentRound;
			this.tables[x].round_num.textAlign = "right";
			this.tables[x].round_num.x = 330;
			this.tables[x].round_num.y = game_rounds_label.y + height_result + label_spacing;

			//=== table status
			let round_num_height = this.tables[x].round_num.getMeasuredHeight();

			let text = "";
			if(data.roundStatus.toLowerCase() === "p"){
				text = window.window.language.lobby.result;
			} else if( data.roundStatus.toLowerCase() === "s"){
				text = window.window.language.lobby.nowbetting;
			} else if(data.roundStatus.toLowerCase() === "e" && data.marks.length) {
				text = window.window.language.lobby.bettingend;
			} else if(data.roundStatus.toLowerCase() === "e" && !data.marks.length) {
				text = window.language.prompts.promptshuffling;
			}

			this.tables[x].status.text = text;
			this.tables[x].status.x = game_rounds_label.x;
			this.tables[x].status.y = this.tables[x].round_num.y + round_num_height + label_spacing;

			if(window.language.locale == "zh") {
				this.tables[x].status.y = this.tables[x].round_num.y + round_num_height + label_spacing - 10;
			}

			let roadmap_bg = new createjs.Shape();
			roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,895,228);
			roadmap_bg.x = 350

			_target.addChild(roadmap_bg);

			let lines = new createjs.Shape();
			lines.graphics.ss(.8).s("rgba(0,0,0,0.8)").moveTo(0,38)
			_target.addChild(lines);

			let borders = new createjs.Shape();
			borders.graphics.ss(1).s("#000").moveTo(roadmap_bg.x+456, roadmap_bg.y+114).lineTo(roadmap_bg.x+456+440, roadmap_bg.y+114);
			borders.graphics.moveTo(roadmap_bg.x+456, roadmap_bg.y+115+(114/2)).lineTo(roadmap_bg.x+456+440, roadmap_bg.y+114+(115/2));
			borders.graphics.moveTo(806+(440/2)-8, roadmap_bg.y+115+(114/2)).lineTo(806+(440/2)-8, roadmap_bg.y+112+(114/2)+(115/2));

			_target.addChild(borders)
      // lines.shadow = new createjs.Shadow("#000",2,2,5);
      lines.alpha = .5;
      // borders.shadow = new createjs.Shadow("#000",2,2,4);
			//pearl
			for(var i = 0; i <= 6; i++) {
				lines.graphics.moveTo(roadmap_bg.x,roadmap_bg.y+(38*i)).lineTo(roadmap_bg.x+456,roadmap_bg.y+(38*i))
			} // end for

			lines.graphics.moveTo(38,0);
			for(var i = 0; i <= 12; i++) {
				lines.graphics.moveTo((38*i) + roadmap_bg.x,roadmap_bg.y).lineTo((38*i)+ roadmap_bg.x,roadmap_bg.y+228)
			}

			//bigroad
			lines.graphics.moveTo(roadmap_bg.x+456,0)
			for(var i = 0; i <= 12 ; i++) {
				lines.graphics.moveTo(roadmap_bg.x+456,roadmap_bg.y+(19*i)).lineTo(roadmap_bg.x+456+440,roadmap_bg.y+(19*i))
			}
			lines.graphics.moveTo(290,0)
			for(var i = 0; i <= 23 ; i++) {
				lines.graphics.moveTo(roadmap_bg.x+456 + (i*19.2),roadmap_bg.y).lineTo(roadmap_bg.x+456 + (i*19.2),228 + roadmap_bg.y)
			}

			// === timer
			this.tables[x].timer.x = -5;
			this.tables[x].timer.y = this.tables[x].y  + 20.8;

			// === dealer image
			this.tables[x].dealer_img_bg.x = 92
			this.tables[x].dealer_img_bg.y = 122 + this.tables[x].y;

			this.tables[x].dealer_img.x = this.tables[x].dealer_img_bg.x + 180;
			this.tables[x].dealer_img.y = this.tables[x].dealer_img_bg.y  + 180;

			// === dealer name
			this.tables[x].dealer_name.text = data.currentDealer;
			this.tables[x].dealer_name.x = 92;
			this.tables[x].dealer_name.y = 190 + this.tables[x].y;

			// === let status
			let p_bg = null;
			let b_bg = null;
			let tie_bg = null;

			this.tables[x].resultStatCon = new createjs.Container();
			this.tables[x].resultStatCon.visible = true;
			_target.addChild(this.tables[x].resultStatCon);

			if (parseInt(window.room_info) === 1) this.tables[x].resultStatCon.visible = false;

			for(var i = 0; i < 3; i++) {
				p_bg = new createjs.Shape();
				p_bg.graphics.beginFill("#0d3e67").drawRoundRect(0,0,62,28,8);
				p_bg.x = (i*66) + 580;
				p_bg.y = 243 + this.tables[x].y
				this.tables[x].resultStatCon.addChild(p_bg);

				b_bg = new createjs.Shape();
				b_bg.graphics.beginFill("#7f1d1e").drawRoundRect(0,0,62,28,8);
				b_bg.x = (i*66) + 845;
				b_bg.y = 243 + this.tables[x].y
				b_bg.y = 243 + this.tables[x].y
				this.tables[x].resultStatCon.addChild(b_bg);
			}

			tie_bg = new createjs.Shape();
			tie_bg.graphics.beginFill("#57802f").drawRoundRect(0,0,62,28,8);
			tie_bg.x = 778;
			tie_bg.y = 243 + this.tables[x].y;
			this.tables[x].resultStatCon.addChild(tie_bg);

			let player_indi = new createjs.Shape();
			player_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
			player_indi.x = 582 + 4 + 10;
			player_indi.y = this.tables[x].y + 246 + 11;
			this.tables[x].resultStatCon.addChild(player_indi);

			let p_text = new createjs.Text(window.language.locale == "zh" ? "闲" : "P","12px lato", "#fff");
			p_text.x = player_indi.x;
			p_text.y = player_indi.y;
			p_text.textBaseline = "middle";
			p_text.textAlign = "center";
			this.tables[x].resultStatCon.addChild(p_text);

			let playerpair_indi =  new createjs.Shape();
			playerpair_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
			playerpair_indi.x = 582 + 66 + 4 + 10;
			playerpair_indi.y = this.tables[x].y + 246 + 11;
			this.tables[x].resultStatCon.addChild(playerpair_indi);

			let p_text2 = new createjs.Text(window.language.locale == "zh" ? "闲" : "P","12px lato", "#fff");
			p_text2.x = playerpair_indi.x;
			p_text2.y = playerpair_indi.y;
			p_text2.textBaseline = "middle";
			p_text2.textAlign = "center";
			this.tables[x].resultStatCon.addChild(p_text2);

			let playerpair_indi2 =  new createjs.Shape();
			playerpair_indi2.graphics.ss(0.5).s("#fff").beginFill("#1465bf").drawCircle(0,0,3.5);
			playerpair_indi2.x = 582+ 66 + 4 + 16;
			playerpair_indi2.y = this.tables[x].y + 246 + 16;
			this.tables[x].resultStatCon.addChild(playerpair_indi2);

			let playernat_indi =  new createjs.Shape();
			playernat_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
			playernat_indi.x =  582 + (66*2) + 4 + 10;
			playernat_indi.y = this.tables[x].y + 246 + 11;
			this.tables[x].resultStatCon.addChild(playernat_indi);

			let n_text = new createjs.Text(window.language.locale == "zh" ? "例" : "N","12px lato", "#fff");
			n_text.x = playernat_indi.x;
			n_text.y = playernat_indi.y;
			n_text.textBaseline = "middle";
			n_text.textAlign = "center";
			this.tables[x].resultStatCon.addChild(n_text);

			let tie_indi =  new createjs.Shape();
			tie_indi.graphics.ss(1).s("#fff").beginFill("#689f39").drawCircle(0,0,9);
			tie_indi.x =  582 + (66*3) + 4 + 10;
			tie_indi.y = this.tables[x].y + 246 + 11;
			this.tables[x].resultStatCon.addChild(tie_indi);
    	
			let t_text = new createjs.Text(window.language.locale == "zh" ? "和" : "T","12px lato", "#fff");
			t_text.x = tie_indi.x;
			t_text.y = tie_indi.y;
			t_text.textBaseline = "middle";
			t_text.textAlign = "center";
			this.tables[x].resultStatCon.addChild(t_text);
    	
			let banker_indi = new createjs.Shape();
			banker_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
			banker_indi.x = 582 + (66*6) +4 + 10;
			banker_indi.y = this.tables[x].y + 246 + 11;
			this.tables[x].resultStatCon.addChild(banker_indi);

			let b_text = new createjs.Text(window.language.locale == "zh" ? "庄" : "B","12px lato", "#fff");
			b_text.x = banker_indi.x;
			b_text.y = banker_indi.y;
			b_text.textBaseline = "middle";
			b_text.textAlign = "center";
			this.tables[x].resultStatCon.addChild(b_text);
    	
			let bankerpair_indi = new createjs.Shape();
			bankerpair_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
			bankerpair_indi.x = 582 + (66*5) +4 + 10;
			bankerpair_indi.y = this.tables[x].y + 246 + 11;
			this.tables[x].resultStatCon.addChild(bankerpair_indi);

			let b_text2 = new createjs.Text(window.language.locale == "zh" ? "庄" : "B","12px lato", "#fff");
			b_text2.x = bankerpair_indi.x;
			b_text2.y = bankerpair_indi.y;
			b_text2.textBaseline = "middle";
			b_text2.textAlign = "center";
			this.tables[x].resultStatCon.addChild(b_text2);

			let bankerpair_indi2 =  new createjs.Shape();
			bankerpair_indi2.graphics.ss(0.5).s("#fff").beginFill("#d42e2e").drawCircle(0,0,3.5);
			bankerpair_indi2.x = 582 + (66*5) + 4 + 16;
			bankerpair_indi2.y = this.tables[x].y + 246 + 16;
			this.tables[x].resultStatCon.addChild(bankerpair_indi2);

			let bankernat_indi = new createjs.Shape();
			bankernat_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
			bankernat_indi.x = 582 + (66*4) +4 + 10;
			bankernat_indi.y = this.tables[x].y + 246 + 11;
    	this.tables[x].resultStatCon.addChild(bankernat_indi);

    	let n_text2 = new createjs.Text(window.language.locale == "zh" ? "例" : "N","12px lato", "#fff");
			n_text2.x = bankernat_indi.x;
			n_text2.y = bankernat_indi.y;
			n_text2.textBaseline = "middle";
			n_text2.textAlign = "center";
			this.tables[x].resultStatCon.addChild(n_text2);

			// ===  player total texts
			this.tables[x].player_total_text = new createjs.Text("0","20px bebasNeue","#fff");
			this.tables[x].player_total_text.y = this.tables[x].y + 246;
			this.tables[x].player_total_text.x = 674 - 50 + 13;
			this.tables[x].player_total_text.textAlign = "right";
			this.tables[x].resultStatCon.addChild(this.tables[x].player_total_text);

			this.tables[x].playerpair_total_text = new createjs.Text("0","20px bebasNeue","#fff");
			this.tables[x].playerpair_total_text.y = this.tables[x].y + 246;
			this.tables[x].playerpair_total_text.x = 740 - 50 + 13;
			this.tables[x].playerpair_total_text.textAlign = "right";
			this.tables[x].resultStatCon.addChild(this.tables[x].playerpair_total_text);

			this.tables[x].playernatural_total_text = new createjs.Text("0","20px bebasNeue","#fff");
			this.tables[x].playernatural_total_text.y = this.tables[x].y + 246;
			this.tables[x].playernatural_total_text.x = 808 - 50 + 11;
			this.tables[x].playernatural_total_text.textAlign = "right";
			this.tables[x].resultStatCon.addChild(this.tables[x].playernatural_total_text);

			this.tables[x].bankernautral_total_text = new createjs.Text("0","20px bebasNeue","#fff");
			this.tables[x].bankernautral_total_text.y = this.tables[x].y + 246;
			this.tables[x].bankernautral_total_text.x = 936 - 50 + 16;
			this.tables[x].bankernautral_total_text.textAlign = "right";
			this.tables[x].resultStatCon.addChild(this.tables[x].bankernautral_total_text);

			this.tables[x].bankerpair_total_text = new createjs.Text("0","20px bebasNeue","#fff");
			this.tables[x].bankerpair_total_text.y = this.tables[x].y + 246;
			this.tables[x].bankerpair_total_text.x = 1002 - 50 + 16;
			this.tables[x].bankerpair_total_text.textAlign = "right";
			this.tables[x].resultStatCon.addChild(this.tables[x].bankerpair_total_text);

			this.tables[x].banker_total_text = new createjs.Text("0","20px bebasNeue","#fff");
			this.tables[x].banker_total_text.y = this.tables[x].y + 246;
			this.tables[x].banker_total_text.x = 1072 - 50 + 12;
			this.tables[x].banker_total_text.textAlign = "right";
			this.tables[x].resultStatCon.addChild(this.tables[x].banker_total_text);

			this.tables[x].tie_total_text = new createjs.Text("0","20px bebasNeue","#fff");
			this.tables[x].tie_total_text.y = this.tables[x].y + 246;
			this.tables[x].tie_total_text.x = 870 - 50 + 15;
			this.tables[x].tie_total_text.textAlign = "right";
			this.tables[x].resultStatCon.addChild(this.tables[x].tie_total_text);

			// === banker stats
			let banker_bar_bg = new createjs.Shape();
			banker_bar_bg.graphics.ss(1).s("#7f1d1e").drawRoundRect(0,0,140,26,8);
			banker_bar_bg.x = 1044;
			banker_bar_bg.y = 244 + this.tables[x].y;
			this.tables[x].resultStatCon.addChild(banker_bar_bg);

			this.tables[x].banker_bar = new createjs.Shape();
			this.tables[x].banker_bar.graphics.beginFill("#7f1d1e").drawRect(0,0,140,28);
			this.tables[x].banker_bar.x = banker_bar_bg.x;
			this.tables[x].banker_bar.y = banker_bar_bg.y;
			this.tables[x].banker_bar.mask = banker_bar_bg;
			this.tables[x].banker_bar.scaleX = .5;
			this.tables[x].resultStatCon.addChild(this.tables[x].banker_bar);

			this.tables[x].banker_percent = new createjs.Text("100%","28px bebasNeue","#7f1d1e");
			this.tables[x].banker_percent.y = 240 + this.tables[x].y;
			this.tables[x].banker_percent.x = 1195;
			this.tables[x].resultStatCon.addChild(this.tables[x].banker_percent);

			// === player stats
			let player_bar_bg = new createjs.Shape();
			player_bar_bg.graphics.ss(1).s("#0d3e67").drawRoundRect(0,0,140,26,8);
			player_bar_bg.x = 435;
			player_bar_bg.y = 244 + this.tables[x].y;
			this.tables[x].resultStatCon.addChild(player_bar_bg);

			this.tables[x].player_bar = new createjs.Shape();
			this.tables[x].player_bar.graphics.beginFill("#0d3e67").drawRect(0,0,140,26);
			this.tables[x].player_bar.x = player_bar_bg.x + 140;
			this.tables[x].player_bar.y = player_bar_bg.y;
			this.tables[x].player_bar.mask = player_bar_bg;
			this.tables[x].player_bar.regX = 140;
			this.tables[x].player_bar.scaleX = .5;
			this.tables[x].resultStatCon.addChild(this.tables[x].player_bar);

			this.tables[x].player_percent = new createjs.Text("100%","28px bebasNeue","#0d3e67");
			this.tables[x].player_percent.y = 242 + this.tables[x].y;
			this.tables[x].player_percent.x = 380;
			this.tables[x].resultStatCon.addChild(this.tables[x].player_percent);

			// === result bg
			let player_bg = new createjs.Shape();
			player_bg.graphics.beginFill("#1665c1").drawRoundRect(0,0,86,104,8);
			player_bg.x = 1412;
			player_bg.y = this.tables[x].y + 158;
			this.tables[x].resultStatCon.addChild(player_bg);

			let player_label = new createjs.Text(window.language.lobby.playercaps,"18px lato","#fff");
			player_label.x = 1422;
			player_label.y = this.tables[x].y + 230;
			this.tables[x].resultStatCon.addChild(player_label);

			let banker_bg = new createjs.Shape();
			banker_bg.graphics.beginFill("#d32f2e").drawRoundRect(0,0,86,104,8);
			banker_bg.x = 1412 + 86 + 8;
			banker_bg.y = this.tables[x].y + 158;
			this.tables[x].resultStatCon.addChild(banker_bg);

			let banker_label = new createjs.Text(window.language.lobby.bankercaps,"18px lato","#fff");
			banker_label.x = 1512;
			banker_label.y = this.tables[x].y + 230;
			this.tables[x].resultStatCon.addChild(banker_label);

			this.tables[x].card_result_container = new createjs.Container();
			this.tables[x].card_result_container.y = this.tables[x].y + 140;
			this.tables[x].card_result_container.x = 1380;
			this.tables[x].resultStatCon.addChild(this.tables[x].card_result_container);

			// === Room info
			this.tables[x].roomInfoCon = new createjs.Container();
			this.tables[x].roomInfoCon.x = 350;
			this.tables[x].roomInfoCon.y = this.tables[x].y + 228;
			this.tables[x].roomInfoCon.visible = false;
			_target.addChild(this.tables[x].roomInfoCon);

			if (parseInt(window.room_info) === 1) this.tables[x].roomInfoCon.visible = true;

			let roomInfoBg = new createjs.Shape();
			roomInfoBg.graphics.beginFill("#333333").drawRect(0, 0, 896, 55);
			this.tables[x].roomInfoCon.addChild(roomInfoBg);

			let usersIco = new createjs.Bitmap('/img/v2_1/icons/room_info/lobby_users.png');
			usersIco.x = 5;
			usersIco.y = 15;
			usersIco.scaleX = 1;
			usersIco.scaleY = 1;
			this.tables[x].roomInfoCon.addChild(usersIco);

			this.tables[x].userCount = new createjs.Text("0","20px bebasNeue","#b3b3b3");
			this.tables[x].userCount.x = usersIco.x + 35;
			this.tables[x].userCount.y = 16;
			this.tables[x].userCount.textAlign = 'left';
			this.tables[x].roomInfoCon.addChild(this.tables[x].userCount);

			let infoPlayerMark = new createjs.Shape();
			infoPlayerMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 11);
			infoPlayerMark.x = this.tables[x].userCount.x + 100;
			infoPlayerMark.y = 27;
			this.tables[x].roomInfoCon.addChild(infoPlayerMark);

			let playerMarkText = new createjs.Text(window.language.locale == "zh" ? "闲" : "P", '15px Lato', '#fff');
			playerMarkText.x = infoPlayerMark.x;
			playerMarkText.y = infoPlayerMark.y - 9;
			playerMarkText.textAlign = 'center';
			this.tables[x].roomInfoCon.addChild(playerMarkText);

			this.tables[x].playerBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
			this.tables[x].playerBetAmt.x = infoPlayerMark.x + 20;
			this.tables[x].playerBetAmt.y = 16;
			this.tables[x].playerBetAmt.textAlign = 'left';
			this.tables[x].roomInfoCon.addChild(this.tables[x].playerBetAmt);

			this.tables[x].infoPlayerPairMark = new createjs.Shape();
			this.tables[x].infoPlayerPairMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 11);
			this.tables[x].infoPlayerPairMark.x = this.tables[x].playerBetAmt.x + 130;
			this.tables[x].infoPlayerPairMark.y = 27;
			this.tables[x].roomInfoCon.addChild(this.tables[x].infoPlayerPairMark);

			this.tables[x].playerPairCircle = new createjs.Shape();
			this.tables[x].playerPairCircle.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 3);
			this.tables[x].playerPairCircle.x = this.tables[x].infoPlayerPairMark.x + 7;
			this.tables[x].playerPairCircle.y = this.tables[x].infoPlayerPairMark.y + 7;
			this.tables[x].roomInfoCon.addChild(this.tables[x].playerPairCircle);

			this.tables[x].playerPairMarkText = new createjs.Text(window.language.locale == "zh" ? "闲" : "P", '15px Lato', '#fff');
			this.tables[x].playerPairMarkText.x = this.tables[x].infoPlayerPairMark.x;
			this.tables[x].playerPairMarkText.y = this.tables[x].infoPlayerPairMark.y - 9;
			this.tables[x].playerPairMarkText.textAlign = 'center';
			this.tables[x].roomInfoCon.addChild(this.tables[x].playerPairMarkText);

			this.tables[x].playerPairBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
			this.tables[x].playerPairBetAmt.x = this.tables[x].infoPlayerPairMark.x + 20;
			this.tables[x].playerPairBetAmt.y = 16;
			this.tables[x].playerPairBetAmt.textAlign = 'left';
			this.tables[x].roomInfoCon.addChild(this.tables[x].playerPairBetAmt);

			this.tables[x].infoTieMark = new createjs.Shape();
			this.tables[x].infoTieMark.graphics.ss(1).beginStroke('#fff').beginFill('#689f38').drawCircle(0, 0, 11);
			this.tables[x].infoTieMark.x = this.tables[x].playerPairBetAmt.x + 130;
			this.tables[x].infoTieMark.y = 27;
			this.tables[x].roomInfoCon.addChild(this.tables[x].infoTieMark);

			this.tables[x].tieMarkText = new createjs.Text(window.language.locale == "zh" ? '和' : 'T', '15px Lato', '#fff');
			this.tables[x].tieMarkText.x = this.tables[x].infoTieMark.x;
			this.tables[x].tieMarkText.y = this.tables[x].infoTieMark.y - 9;
			this.tables[x].tieMarkText.textAlign = 'center';
			this.tables[x].roomInfoCon.addChild(this.tables[x].tieMarkText);

			this.tables[x].tieBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
			this.tables[x].tieBetAmt.x = this.tables[x].infoTieMark.x + 20;
			this.tables[x].tieBetAmt.y = 16;
			this.tables[x].tieBetAmt.textAlign = 'left';
			this.tables[x].roomInfoCon.addChild(this.tables[x].tieBetAmt);

			this.tables[x].infoBankerMark = new createjs.Shape();
			this.tables[x].infoBankerMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 11);
			this.tables[x].infoBankerMark.x = this.tables[x].tieBetAmt.x + 130;
			this.tables[x].infoBankerMark.y = 27;
			this.tables[x].roomInfoCon.addChild(this.tables[x].infoBankerMark);

			this.tables[x].bankerMarkText = new createjs.Text(window.language.locale == "zh" ? "庄" : "B", '15px Lato', '#fff');
			this.tables[x].bankerMarkText.x = this.tables[x].infoBankerMark.x;
			this.tables[x].bankerMarkText.y = this.tables[x].infoBankerMark.y - 9;
			this.tables[x].bankerMarkText.textAlign = 'center';
			this.tables[x].roomInfoCon.addChild(this.tables[x].bankerMarkText);

			this.tables[x].bankerBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
			this.tables[x].bankerBetAmt.x = this.tables[x].infoBankerMark.x + 20;
			this.tables[x].bankerBetAmt.y = 16;
			this.tables[x].bankerBetAmt.textAlign = 'left';
			this.tables[x].roomInfoCon.addChild(this.tables[x].bankerBetAmt);

			this.tables[x].infoBankerPairMark = new createjs.Shape();
			this.tables[x].infoBankerPairMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 11);
			this.tables[x].infoBankerPairMark.x = this.tables[x].bankerBetAmt.x + 130;
			this.tables[x].infoBankerPairMark.y = 27;
			this.tables[x].roomInfoCon.addChild(this.tables[x].infoBankerPairMark);

			this.tables[x].bankerPairCircle = new createjs.Shape();
			this.tables[x].bankerPairCircle.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 3);
			this.tables[x].bankerPairCircle.x = this.tables[x].infoBankerPairMark.x - 7;
			this.tables[x].bankerPairCircle.y = this.tables[x].infoBankerPairMark.y - 7;
			this.tables[x].roomInfoCon.addChild(this.tables[x].bankerPairCircle);

			this.tables[x].bankerPairMarkText = new createjs.Text(window.language.locale == "zh" ? "庄" : "B", '15px Lato', '#fff');
			this.tables[x].bankerPairMarkText.x = this.tables[x].infoBankerPairMark.x;
			this.tables[x].bankerPairMarkText.y = this.tables[x].infoBankerPairMark.y - 9;
			this.tables[x].bankerPairMarkText.textAlign = 'center';
			this.tables[x].roomInfoCon.addChild(this.tables[x].bankerPairMarkText);

			this.tables[x].bankerPairBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
			this.tables[x].bankerPairBetAmt.x = this.tables[x].infoBankerPairMark.x + 20;
			this.tables[x].bankerPairBetAmt.y = 16;
			this.tables[x].bankerPairBetAmt.textAlign = 'left';
			this.tables[x].roomInfoCon.addChild(this.tables[x].bankerPairBetAmt);

			if (window.language.locale === "zh") {
				playerMarkText.y += 1;
				this.tables[x].playerPairMarkText.y += 1;
				this.tables[x].bankerMarkText.y += 1;
				this.tables[x].bankerPairMarkText.y += 1;
				this.tables[x].tieMarkText.y += 1;
			}

			this.setRoomInfo(data.betInfo, x);

			// === road map
			let pearlroad_mask = new createjs.Shape();
			pearlroad_mask.graphics.beginFill("red").drawRect(0,10,454,228);
			pearlroad_mask.x = 352
			pearlroad_mask.y = this.tables[x].y - 10

			this.tables[x].pearlroad_container = new createjs.Container();
			this.tables[x].pearlroad_container.y = this.tables[x].y - 0.5;
			this.tables[x].pearlroad_container.x = 349.5 + 1.8;
			_target.addChild(this.tables[x].pearlroad_container);

			let bigroad_mask = new createjs.Shape();
			bigroad_mask.graphics.beginFill("red").drawRect(0,10,444,228);
			bigroad_mask.x = 358 + 448
			bigroad_mask.alpha = .5;
			bigroad_mask.y = this.tables[x].y - 10;

			this.tables[x].bigroad_container = new createjs.Container();
			this.tables[x].bigroad_container.y = this.tables[x].y;
			this.tables[x].bigroad_container.x = bigroad_mask.x;
			this.tables[x].bigroad_container.mask = bigroad_mask;
			this.tables[x].bigroad_container.cache(0,10,454,228)
			_target.addChild(this.tables[x].bigroad_container);

			this.tables[x].bigeyeboy_container = new createjs.Container();
			this.tables[x].bigeyeboy_container.y = this.tables[x].y + 115;
			this.tables[x].bigeyeboy_container.x = bigroad_mask.x;
			this.tables[x].bigroad_container.mask = bigroad_mask;
			this.tables[x].bigroad_container.cache(0,10,454,228)
			_target.addChild(this.tables[x].bigeyeboy_container);


			this.tables[x].small_container = new createjs.Container();
			this.tables[x].small_container.y = this.tables[x].y + 172;
			this.tables[x].small_container.x = bigroad_mask.x;
			this.tables[x].small_container.mask = bigroad_mask;
			this.tables[x].small_container.cache(0,10,454,228)
			_target.addChild(this.tables[x].small_container);


			this.tables[x].cockroach_container = new createjs.Container();
			this.tables[x].cockroach_container.y = this.tables[x].y + 172;
			this.tables[x].cockroach_container.x = bigroad_mask.x + 212;
			this.tables[x].cockroach_container.mask = bigroad_mask;
			this.tables[x].cockroach_container.cache(0,10,454,228)
			_target.addChild(this.tables[x].cockroach_container);

			// _target.addChild(this.tables[x].bet_range_container);
			if(_timer_c) {
				_timer_c.addChild(this.tables[x].bet_range_container);
			}

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

			this.tables[x].table_name = new createjs.Text(window.language.lobby.baccarat,"bold 20px ArvoItalic","#fdba44");
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

			this.setPercentages(data, _target, _timer_c,  x, self);


			this.drawPearlRoad(data, _target, _timer_c,  x, self);
			this.drawBigRoad(data, _target, _timer_c,  x, self);
			this.drawBigEyeBoy(data, _target, _timer_c,  x, self);
			this.drawSmallRoad(data, _target, _timer_c,  x, self);
			this.drawCockradRoad(data, _target, _timer_c,  x, self);
    	
			this.checkMaintenance(data, false, x, _timer_c);
    	self.baccarat_stage[x].update();
    },
		setResult(data, _target, _timer_c,  x, self) {
			if(!this.tables[x] || !this.tables[x].status) return;

			self.baccarat_stage[x].isUpdate = true;
			this.tables[x].status.text  = window.language.lobby.result;
			this.tables[x].deal_count.text = data.marks.length
			setTimeout(() => {
				self.baccarat_stage[x].isUpdate = false;
			}, 100)
		},
		setRoomInfo(data, x) {
	  	this.resetRoomInfo(x);

			if (!data) return;

			let totalUsers = 0;

			if (data.player) {
				this.tables[x].playerBetAmt.text = `${numberWithCommas(data.player.totalBets)}/${numberWithCommas(data.player.totalUsers)}`;
				totalUsers += data.player.totalUsers;
			}

			if (data.playerpair) {
				this.tables[x].playerPairBetAmt.text = `${numberWithCommas(data.playerpair.totalBets)}/${numberWithCommas(data.playerpair.totalUsers)}`;
				// totalUsers += data.playerpair.totalUsers;
			}

			if (data.banker) {
				this.tables[x].bankerBetAmt.text = `${numberWithCommas(data.banker.totalBets)}/${numberWithCommas(data.banker.totalUsers)}`;
				totalUsers += data.banker.totalUsers;
			}

			if (data.bankerpair) {
				this.tables[x].bankerPairBetAmt.text = `${numberWithCommas(data.bankerpair.totalBets)}/${numberWithCommas(data.bankerpair.totalUsers)}`;
				// totalUsers += data.bankerpair.totalUsers;
			}

			if (data.tie) {
				this.tables[x].tieBetAmt.text = `${numberWithCommas(data.tie.totalBets)}/${numberWithCommas(data.tie.totalUsers)}`;
				// totalUsers += data.tie.totalUsers;
			}

			this.tables[x].userCount.text = numberWithCommas(totalUsers);
	  },
	  resetRoomInfo(x) {
	  	this.tables[x].playerBetAmt.text = '0/0';
	  	this.tables[x].playerPairBetAmt.text = '0/0';
	  	this.tables[x].bankerBetAmt.text = '0/0';
	  	this.tables[x].bankerPairBetAmt.text = '0/0';
	  	this.tables[x].tieBetAmt.text = '0/0';
	  	this.tables[x].userCount.text = '0';
	  },
    checkMaintenance (maintenanceData, socket, x, _timer) {
			if(!this.tables || !this.tables[x] || !this.tables[x].maintenanceCon) return;

			if (window.userAuthority === "admin") return;

			let maintenance = false;
	   		let activeMaintenance = [];
			let mainText = '';
			let subText = '';

			let maintenanceSetting = [];
			if (!socket) {
			maintenanceSetting = maintenanceData.maintenanceSetting.maintenance;
	
			for (var i = 0; i < maintenanceSetting.length; i++) {
					if (this.tables[x].slave === maintenanceSetting[i].type) {
						for (var j = 0; j < maintenanceSetting[i].info.length; j++) {
							if (maintenanceSetting[i].info[j].status === 1) {
								maintenance = true;
								activeMaintenance = maintenanceSetting[i].info[j];
							}
						} // end for loop
					}
					else if (this.tables[x].slave === '' && maintenanceSetting[i].type === 'normal') {
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
	
				if (this.tables[x].slave === activeMaintenance.slave) {
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

	  	console.log(_timer, "timerrrr")

	  	if (maintenance) {
	  		$(_timer.canvas).hide();

	    	this.tables[x].maintenanceCon.visible = true;
	    	this.tables[x].maintenanceTxt.text = mainText;
	    	this.tables[x].maintenanceSubTxt.text = subText;
	   		this.tables[x].maintenanceTime.text = newStartTime +' ~ '+ newEndTime;
		  	

		  	//**hide betrange **//
		  	try {
			  	this.tables[x].enter_button_bg.visible = false;
			  	this.tables[x].enter_text.visible = false;
			  	this.tables[x].multi_button_bg.visible = false;
			  	this.tables[x].multi_text.visible = false;
			  	this.tables[x].bet_range_container.visible = false;
		  		this.tables[x].flippyImg.visible = false;
		  	}
		  	catch(err) {

		  	}
		  }
		  else {
				$(_timer.canvas).show();
	  		// $(_timer.canvas.id).css({'display':'inline-block'});
		  	this.tables[x].maintenanceCon.visible = false;
		  	
		  	//**show betrange **//
		  	try {
			  	this.tables[x].enter_button_bg.visible = true;
			  	this.tables[x].enter_text.visible = true;
			  	this.tables[x].multi_button_bg.visible = true;
			  	this.tables[x].multi_text.visible = true;
			  	this.tables[x].bet_range_container.visible = true;
		  		this.tables[x].flippyImg.visible = true;
		  	}
		  	catch(err) {
		  		
		  	}
		  }
    },
    setPercentages(data, _target, _timer_c,  x, self)  {

			self.baccarat_stage[x].isUpdate = true;

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

			if(!this.tables[x] || !this.tables[x].player_bar) return;

			createjs.Tween.get(this.tables[x].player_bar)
			.to({
				scaleX : (player_count)/data_marks.length
			},150)

			createjs.Tween.get(this.tables[x].banker_bar)
			.to({
				scaleX : (banker_count)/data_marks.length
			},150)

			// this.tables[x].banker_bar.scaleX = (banker_count)/data.length;

			this.tables[x].player_percent.text = Math.round(player_count/(data_marks.length ? data_marks.length : 1)*100) + "%";
			this.tables[x].banker_percent.text = Math.round(banker_count/(data_marks.length ? data_marks.length : 1)*100) + "%";
			this.tables[x].player_total_text.text = player_count;
			this.tables[x].playerpair_total_text.text = player_pair_cnt;
			this.tables[x].playernatural_total_text.text = natural.player;
			// ===  banker total texts
			this.tables[x].bankernautral_total_text.text = natural.banker;
			this.tables[x].bankerpair_total_text.text = banker_pair_cnt;
			this.tables[x].banker_total_text.text = banker_count;

			this.tables[x].tie_total_text.text = tie_count;

			setTimeout(() => {
				self.baccarat_stage[x].isUpdate = false;
			}, 100)
    },
    drawPearlRoad (data, _target, _timer_c,  x, self) {
			if(!this.tables[x] || !this.tables[x].pearlroad_container) return;

			self.baccarat_stage[x].isUpdate = true;

			this.tables[x].pearlroad_container.cache(0, 0, 454, 230);
			this.tables[x].pearlroad_container.removeAllChildren();

			let slaveJson = {
				'supersix' : {
					'b': 'l',
					'q': 'm',
					'w': 'n',
					'e': 'o',
				},
				'bonus' : {
					'b': 'l',
					'q': 'm',
					'w': 'n',
					'e': 'o',
				},
				slave : data.slave == 'supersix' ? data.slave : ''
			}

			let marks = rmformat(slaveJson).fnFormatBCPearlRoad(data.marks,6,14);

			for(var i = 0; i < marks.matrix.length; i++) {
				for(var e = 0; e < marks.matrix[i].length; e++) {
					if(marks.matrix[i][e] === undefined) continue;
					let sp = createSpriteRoadMap(self.context.load.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, sp);
					sp.x = e * 38;
					sp.y = i * 37.8;
					sp.gotoAndStop("pearl-"+marks.matrix[i][e].mark);
					this.tables[x].pearlroad_container.addChild(sp);
				} //end for
			} //end for

			this.tables[x].pearlroad_container.updateCache();
			
			setTimeout(() => {
				self.baccarat_stage[x].isUpdate =false;
			}, 100)
		},
		drawBigRoad (data, _target, _timer_c,  x, self) {

			if(!this.tables[x] || !this.tables[x].bigroad_container) return;

			self.baccarat_stage[x].isUpdate = true;

			this.tables[x].bigroad_container.cache(0, 0, 454, 228);
			this.tables[x].bigroad_container.removeAllChildren();

			let font_size = "18px";

			let slaveJson = {
				'supersix' : {
					'b': 'l',
					'q': 'm',
					'w': 'n',
					'e': 'o',
				},
				'bonus' : {
					'b': 'l',
					'q': 'm',
					'w': 'n',
					'e': 'o',
				},
				slave : data.slave == 'supersix' ? data.slave : ''
			}

			let marks = rmformat(slaveJson).fnFormatBCBigRoad(data.marks,6,25);

			for(var i = 0; i < marks.matrix.length; i++) {
				for(var e = 0; e < marks.matrix[i].length; e++) {
					if(marks.matrix[i][e] === undefined) continue;
					let sp = createSpriteRoadMap(self.context.load.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, sp);

					sp.x = (e * 19.2) + 0.8;
					sp.y = i * 18.9;
					sp.scaleX = sp.scaleY = 0.5;
					this.tables[x].bigroad_container.addChild(sp);
					
					if(marks.matrix[i][e].ties) {
						if(marks.matrix[i][e].ties > 1) {
							let tie_text = new createjs.Text(marks.matrix[i][e].ties, "bold "+font_size+" BebasNeue","#000");
							tie_text.y = sp.y + (20/2) +1;
							tie_text.x = sp.x  + (20/2) -1;
							tie_text.textAlign = "center";
							tie_text.textBaseline = "middle";

							this.tables[x].bigroad_container.addChild(tie_text);
						}
						sp.gotoAndStop("big-"+marks.matrix[i][e].mark+"-t");
					} else {
						sp.gotoAndStop("big-"+marks.matrix[i][e].mark);
					}
				}
			}
			this.tables[x].bigroad_container.updateCache()
			setTimeout(() => {
				self.baccarat_stage[x].isUpdate =false;
			}, 100)
		},
		drawBigEyeBoy(data, _target, _timer_c,  x, self) {

			if(!this.tables[x] || !this.tables[x].bigeyeboy_container) return;

			self.baccarat_stage[x].isUpdate = true;

      this.tables[x].bigeyeboy_container.removeAllChildren();
			this.tables[x].bigeyeboy_container.cache(0,0,454,228)

			let marks = formatData.fnFormatBigEyeBoy(data.marks,6,48);

			for(var i = 0; i < marks.matrix.length; i++) {
				for(var e = 0; e < marks.matrix[i].length; e++) {
					if(marks.matrix[i][e] === undefined) continue;
					let sp = createSpriteRoadMap(self.context.load.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, sp);
					sp.y = (i * 9.45) - 1;
					sp.x = (e * 9.53) + 1;
					sp.scaleX = sp.scaleY = .26

					sp.gotoAndStop("bigeye-"+marks.matrix[i][e].mark);
					this.tables[x].bigeyeboy_container.addChild(sp);
				}
			}
			this.tables[x].bigeyeboy_container.updateCache()

			setTimeout(() => {
				self.baccarat_stage[x].isUpdate =false;
			}, 100)
		},
		drawSmallRoad(data, _target, _timer_c,  x, self) {

			if(!this.tables[x] || !this.tables[x].small_container) return;

			self.baccarat_stage[x].isUpdate = true;

      this.tables[x].small_container.removeAllChildren();
			this.tables[x].small_container.cache(0,0,454,228)

			let marks = formatData.fnFormatSmallRoad(data.marks,6,24);

			for(var i = 0; i < marks.matrix.length; i++) {
				for(var e = 0; e < marks.matrix[i].length; e++) {
					if(marks.matrix[i][e] === undefined) continue;
					let sp = createSpriteRoadMap(self.context.load.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, sp);
					sp.y = (i * 9.3) - 0.5;
					sp.x = (e * 9.52) + 1;
					sp.scaleX = sp.scaleY = .25

					sp.gotoAndStop("bigsmall-"+marks.matrix[i][e].mark);
					this.tables[x].small_container.addChild(sp);
				}
			}

			this.tables[x].small_container.updateCache()
			setTimeout(() => {
				self.baccarat_stage[x].isUpdate = false;
			}, 100)
		},
		drawCockradRoad(data, _target, _timer_c,  x, self) {

			if(!this.tables[x] || !this.tables[x].cockroach_container) return;
			
			self.baccarat_stage[x].isUpdate = true;

      this.tables[x].cockroach_container.removeAllChildren();
			this.tables[x].cockroach_container.cache(0,0,454,228)
			
			let marks = formatData.fnFormatCockroachPig(data.marks,6,24);

			for(var i = 0; i < marks.matrix.length; i++) {
				for(var e = 0; e < marks.matrix[i].length; e++) {
					if(marks.matrix[i][e] === undefined) continue;
					let sp = createSpriteRoadMap(self.context.load.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, sp);
					sp.y = i * 9;
					sp.x = e * 9.6;
					sp.scaleX = sp.scaleY = .26

					sp.gotoAndStop("roach-"+marks.matrix[i][e].mark);
					this.tables[x].cockroach_container.addChild(sp);
				}
			}

			this.tables[x].cockroach_container.updateCache()
			setTimeout(() => {
				self.baccarat_stage[x].isUpdate = false;
			}, 100)
		}
}
export default {
	instance
}