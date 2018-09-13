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
		
		let label_spacing = 8;		

		let deal_label = new createjs.Text(window.language.lobby.deal,"18px lato","#fff");
		deal_label.x = 200;
		deal_label.y = 68 + this.tables[x].y;
		_target.addChild(deal_label);

		let game_label_height = deal_label.getMeasuredHeight();
		this.tables[x].deal_count = new createjs.Text(data.marks.length, "18px latobold","#fff");
		this.tables[x].deal_count.textAlign = "right";
		this.tables[x].deal_count.x = 330;
		this.tables[x].deal_count.y = deal_label.y + game_label_height + label_spacing;
		_target.addChild(this.tables[x].deal_count);

		// === timer
		this.tables[x].timer.x =  -5;
		this.tables[x].timer.y = this.tables[x].y  + 24.8;

		this.tables[x].dealer_img_bg.x = 92
		this.tables[x].dealer_img_bg.y = 122 + this.tables[x].y;

		this.tables[x].dealer_img.x = this.tables[x].dealer_img_bg.x + 180;
		this.tables[x].dealer_img.y = this.tables[x].dealer_img_bg.y + 180;

		// === dealer name
		this.tables[x].dealer_name.x = 92;
		this.tables[x].dealer_name.y = 190 + this.tables[x].y;
		this.tables[x].dealer_name.textAlign = "center";

		// === game rounds
		let deal_count_height = this.tables[x].deal_count.getMeasuredHeight();
		let game_rounds_label = new createjs.Text(window.language.lobby.game,"18px lato","#fff");
		game_rounds_label.x = 200;
		game_rounds_label.y = this.tables[x].deal_count.y + deal_count_height + label_spacing ;
		_target.addChild(game_rounds_label);

		let height_result = game_rounds_label.getMeasuredHeight();
		this.tables[x].round_num.text = data.currentRound;
		this.tables[x].round_num.textAlign = "right";
		this.tables[x].round_num.x = 330;
		this.tables[x].round_num.y = game_rounds_label.y + height_result + label_spacing;

		//=== table status
		let round_num_height = this.tables[x].round_num.getMeasuredHeight();
		let text = "";
		if(data.roundStatus.toLowerCase() == "p"){
			text = window.window.language.lobby.result;
		} else if( data.roundStatus.toLowerCase() == "s"){
			text = window.window.language.lobby.nowbetting;
		} else if(data.roundStatus.toLowerCase() == "E") {
			text = window.window.language.lobby.bettingend;
		}
		this.tables[x].status.text = text;
		this.tables[x].status.x = game_rounds_label.x;
		this.tables[x].status.y = this.tables[x].round_num.y + round_num_height + label_spacing;

		let roadmap_bg = new createjs.Shape();
		roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,895,228);
		roadmap_bg.y =this.tables[x].y;
		roadmap_bg.x = 350
		_target.addChild(roadmap_bg);

		let lines = new createjs.Shape();
		lines.graphics.ss(.8).s("rgba(0,0,0,0.8)").moveTo(0,38)
		_target.addChild(lines);

		let borders = new createjs.Shape();
		borders.graphics.ss(1).s("#000").moveTo(roadmap_bg.x+456, roadmap_bg.y+114).lineTo(roadmap_bg.x+456+440, roadmap_bg.y+114);
		borders.graphics.moveTo(roadmap_bg.x+456, roadmap_bg.y+114+(114/2)).lineTo(roadmap_bg.x+456+440, roadmap_bg.y+114+(114/2));
		borders.graphics.moveTo(805.5+(440/2)-8, roadmap_bg.y+114+(114/2)).lineTo(805.5+(440/2)-8, roadmap_bg.y+114+(114/2)+(114/2));

		_target.addChild(borders)

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

		// lines.shadow = new createjs.Shadow("#000",2,2,6);
		lines.alpha = .5;
		borders.shadow = new createjs.Shadow("#000",2,2,5);

		this.tables[x].pearlroad_container = new createjs.Container();
		this.tables[x].pearlroad_container.y = this.tables[x].y;
		this.tables[x].pearlroad_container.x = 349.1
		_target.addChild(this.tables[x].pearlroad_container);

		this.tables[x].bigroad_container = new createjs.Container();
		this.tables[x].bigroad_container.y = this.tables[x].y ;
		this.tables[x].bigroad_container.x = 358 + 448
		_target.addChild(this.tables[x].bigroad_container);

		this.tables[x].bigeyeboy_container = new createjs.Container();
		this.tables[x].bigeyeboy_container.y = this.tables[x].y + 5 + 110;
		this.tables[x].bigeyeboy_container.x = 363 + 441;
		_target.addChild(this.tables[x].bigeyeboy_container);

		this.tables[x].smallroad_container = new createjs.Container();
		this.tables[x].smallroad_container.y = this.tables[x].y + 5 + 164;
		this.tables[x].smallroad_container.x = 363 + 441;
		_target.addChild(this.tables[x].smallroad_container);

		this.tables[x].cockroachroad_container = new createjs.Container();
		this.tables[x].cockroachroad_container.y = this.tables[x].y + 5 + 164;
		this.tables[x].cockroachroad_container.x = this.tables[x].smallroad_container.x + 212;
		_target.addChild(this.tables[x].cockroachroad_container);
		
		// === dragon stats
		this.tables[x].resultStatCon = new createjs.Container();
		this.tables[x].resultStatCon.visible = true;
		_target.addChild(this.tables[x].resultStatCon);

		if (parseInt(window.room_info) === 1) this.tables[x].resultStatCon.visible = false;

		let dragon_bar_bg = new createjs.Shape();
		dragon_bar_bg.graphics.ss(1).s("#0d3e67").drawRoundRect(0,0,90,28,8);
		dragon_bar_bg.x = 418;
		dragon_bar_bg.y = 248 + this.tables[x].y;
		this.tables[x].resultStatCon.addChild(dragon_bar_bg);

		this.tables[x].dragon_bar = new createjs.Shape();
		this.tables[x].dragon_bar.graphics.beginFill("#0d3e67").drawRect(0,0,90,28);
		this.tables[x].dragon_bar.x = 422 + 90;
		this.tables[x].dragon_bar.y = 248 + this.tables[x].y;
		this.tables[x].dragon_bar.mask = dragon_bar_bg;
		this.tables[x].dragon_bar.regX = 90
		this.tables[x].resultStatCon.addChild(this.tables[x].dragon_bar);

		this.tables[x].dragon_percent = new createjs.Text("100%","28px bebasNeue","#0d3e67");
		this.tables[x].dragon_percent.x = 364;
		this.tables[x].dragon_percent.y = 245 + this.tables[x].y;
		this.tables[x].resultStatCon.addChild(this.tables[x].dragon_percent);

		let d_bg = null;
		let t_bg = null;
		let tie_bg = null;

		for(var i = 0; i < 5; i++) {
			d_bg = new createjs.Shape();
			d_bg.graphics.beginFill("#0d3e67").drawRoundRect(0,0,47,28,6);
			d_bg.x = (i*53) + 514;
			d_bg.y = 247 + this.tables[x].y
			this.tables[x].resultStatCon.addChild(d_bg);

			t_bg = new createjs.Shape();
			t_bg.graphics.beginFill("#7f1d1e").drawRoundRect(0,0,47,28,6);
			t_bg.x = (i*53) + 832;
			t_bg.y = 247 + this.tables[x].y
			this.tables[x].resultStatCon.addChild(t_bg);
		}

		tie_bg = new createjs.Shape();
		tie_bg.graphics.beginFill("#57802f").drawRoundRect(0,0,47,28,6);
		tie_bg.x = 780 ;
		tie_bg.y = 247 + this.tables[x].y
		this.tables[x].resultStatCon.addChild(tie_bg);

		// === cosmetics
		let dragon_indi = new createjs.Shape();
		dragon_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,8);
		dragon_indi.x = 514 + 12;
		dragon_indi.y = 247 + this.tables[x].y + 14;
		this.tables[x].resultStatCon.addChild(dragon_indi);

		let d_text = new createjs.Text(window.language.locale == "zh" ? "龙" : "D","12px lato", "#fff");
		d_text.x = dragon_indi.x;
		d_text.y = dragon_indi.y;
		d_text.textAlign = "center";
		d_text.textBaseline = "middle";
		this.tables[x].resultStatCon.addChild(d_text);

		let d_big_indi = new createjs.Shape();
		d_big_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,8);
		d_big_indi.x = 53 + 514 +14;
		d_big_indi.y = 247 + this.tables[x].y  + 14;
		this.tables[x].resultStatCon.addChild(d_big_indi);

		let d_big_text = new createjs.Text(window.language.locale == "zh" ? "大" : "B","12px lato", "#fff");
		d_big_text.x = d_big_indi.x;
		d_big_text.y = d_big_indi.y;
		d_big_text.textAlign = "center";
		d_big_text.textBaseline = "middle";
		this.tables[x].resultStatCon.addChild(d_big_text);

		let d_big_indi2 = new createjs.Shape();
		d_big_indi2.graphics.ss(0.5).s("#fff").beginFill("#1465bf").drawCircle(0,0,3.5);
		d_big_indi2.x = 53 + 514 + 7;
		d_big_indi2.y = 247 + this.tables[x].y + 8;
		this.tables[x].resultStatCon.addChild(d_big_indi2);

		let s_big_indi = new createjs.Shape();
		s_big_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,8);
		s_big_indi.x = (53*2) + 514 +14;
		s_big_indi.y = 247 + this.tables[x].y  + 14;
		this.tables[x].resultStatCon.addChild(s_big_indi);

		let s_big_text = new createjs.Text(window.language.locale == "zh" ? "小" : "S","12px lato", "#fff");
		s_big_text.x = s_big_indi.x;
		s_big_text.y = s_big_indi.y;
		s_big_text.textAlign = "center";
		s_big_text.textBaseline = "middle";
		this.tables[x].resultStatCon.addChild(s_big_text);

		let s_big_indi2 = new createjs.Shape();
		s_big_indi2.graphics.ss(0.5).s("#fff").beginFill("#1465bf").drawCircle(0,0,3.5);
		s_big_indi2.x = (53*2) + 514 + 7;
		s_big_indi2.y = 247 + this.tables[x].y + 19;
		this.tables[x].resultStatCon.addChild(s_big_indi2);

		let d_odd_indi = new createjs.Shape();
		d_odd_indi.graphics.ss(1).s("#1465bf").beginFill("#fff").drawCircle(0,0,8);
		d_odd_indi.x = (53*3) + 514 +14;
		d_odd_indi.y = 247 + this.tables[x].y  + 14;
		this.tables[x].resultStatCon.addChild(d_odd_indi);

		let d_odd_text = new createjs.Text(window.language.locale == "zh" ? "单" : "O","12px lato", "#1465bf");
		d_odd_text.x = d_odd_indi.x;
		d_odd_text.y = d_odd_indi.y;
		d_odd_text.textAlign = "center";
		d_odd_text.textBaseline = "middle";
		this.tables[x].resultStatCon.addChild(d_odd_text);

		let d_even_indi = new createjs.Shape();
		d_even_indi.graphics.ss(1).s("#1465bf").beginFill("#fff").drawCircle(0,0,8);
		d_even_indi.x = (53*4) + 514 +14;
		d_even_indi.y = 247 + this.tables[x].y  + 14;
		this.tables[x].resultStatCon.addChild(d_even_indi);

		let d_even_text = new createjs.Text(window.language.locale == "zh" ? "双" : "E","12px lato", "#1465bf");
		d_even_text.x = d_even_indi.x;
		d_even_text.y = d_even_indi.y;
		d_even_text.textAlign = "center";
		d_even_text.textBaseline = "middle";
		this.tables[x].resultStatCon.addChild(d_even_text);

		let tie_indi = new createjs.Shape();
		tie_indi.graphics.ss(1).s("#fff").beginFill("#689f39").drawCircle(0,0,8);
		tie_indi.x = (53*5) + 514 +14;
		tie_indi.y = 247 + this.tables[x].y  + 14;
		this.tables[x].resultStatCon.addChild(tie_indi);

		let tie_text = new createjs.Text(window.language.locale == "zh" ? '和' : 'T',"12px lato", "#fff");
		tie_text.x = tie_indi.x;
		tie_text.y = tie_indi.y;
		tie_text.textAlign = "center";
		tie_text.textBaseline = "middle";
		this.tables[x].resultStatCon.addChild(tie_text);

		let t_even_indi = new createjs.Shape();
		t_even_indi.graphics.ss(1).s("#d32f2e").beginFill("#fff").drawCircle(0,0,8);
		t_even_indi.x = (53*6) + 514 +14;
		t_even_indi.y = 247 + this.tables[x].y  + 14;
		this.tables[x].resultStatCon.addChild(t_even_indi);

		let t_even_text = new createjs.Text(window.language.locale == "zh" ? "双" : "E","12px lato", "#d32f2e");
		t_even_text.x = t_even_indi.x;
		t_even_text.y = t_even_indi.y;
		t_even_text.textAlign = "center";
		t_even_text.textBaseline = "middle";
		this.tables[x].resultStatCon.addChild(t_even_text);

		let t_odd_indi = new createjs.Shape();
		t_odd_indi.graphics.ss(1).s("#d32f2e").beginFill("#fff").drawCircle(0,0,8);
		t_odd_indi.x = (53*7) + 514 +14;
		t_odd_indi.y = 247 + this.tables[x].y  + 14;
		this.tables[x].resultStatCon.addChild(t_odd_indi);

		let t_odd_text = new createjs.Text(window.language.locale == "zh" ? "单" : "O","12px lato", "#d32f2e");
		t_odd_text.x = t_odd_indi.x;
		t_odd_text.y = t_odd_indi.y;
		t_odd_text.textAlign = "center";
		t_odd_text.textBaseline = "middle";
		this.tables[x].resultStatCon.addChild(t_odd_text);

		let t_small_indi = new createjs.Shape();
		t_small_indi.graphics.ss(1).s("#fff").beginFill("#d32f2e").drawCircle(0,0,8);
		t_small_indi.x = (53*8) + 514 + 15;
		t_small_indi.y = 247 + this.tables[x].y  + 14;
		this.tables[x].resultStatCon.addChild(t_small_indi);

		let t_small_text = new createjs.Text(window.language.locale == "zh" ? "小" : "S","12px lato", "#fff");
		t_small_text.x = t_small_indi.x;
		t_small_text.y = t_small_indi.y;
		t_small_text.textAlign = "center";
		t_small_text.textBaseline = "middle";
		this.tables[x].resultStatCon.addChild(t_small_text);

		let t_small_indi2 = new createjs.Shape();
		t_small_indi2.graphics.ss(0.5).s("#fff").beginFill("#d32f2e").drawCircle(0,0,3.5);
		t_small_indi2.x = (53*8) + 514 + 8;
		t_small_indi2.y = 247 + this.tables[x].y  + 19;
		this.tables[x].resultStatCon.addChild(t_small_indi2);

		let t_big_indi = new createjs.Shape();
		t_big_indi.graphics.ss(1).s("#fff").beginFill("#d32f2e").drawCircle(0,0,8);
		t_big_indi.x = (53*9) + 514 + 15;
		t_big_indi.y = 247 + this.tables[x].y  + 14;
		this.tables[x].resultStatCon.addChild(t_big_indi);

		let t_big_text = new createjs.Text(window.language.locale == "zh" ? "大" : "B","12px lato", "#fff");
		t_big_text.x = t_big_indi.x;
		t_big_text.y = t_big_indi.y;
		t_big_text.textAlign = "center";
		t_big_text.textBaseline = "middle";
		this.tables[x].resultStatCon.addChild(t_big_text);

		let t_big_indi2 = new createjs.Shape();
		t_big_indi2.graphics.ss(0.5).s("#fff").beginFill("#d32f2e").drawCircle(0,0,3.5);
		t_big_indi2.x = (53*9) + 514 + 8;
		t_big_indi2.y = 247 + this.tables[x].y  + 8;
		this.tables[x].resultStatCon.addChild(t_big_indi2);

		let t_big_indi_text = new createjs.Text(window.language.locale == "zh" ? "大" : "B","12px lato", "#fff");
		t_big_indi_text.x = t_big_indi.x;
		t_big_indi_text.y = t_big_indi.y;
		t_big_indi_text.textAlign = "center";
		t_big_indi_text.textBaseline = "middle";
		this.tables[x].resultStatCon.addChild(t_big_indi_text);

		let tiger_indi = new createjs.Shape();
		tiger_indi.graphics.ss(1).s("#fff").beginFill("#d32f2e").drawCircle(0,0,8);
		tiger_indi.x = (53*10) + 514 + 14;
		tiger_indi.y = 247 + this.tables[x].y + 14;
		this.tables[x].resultStatCon.addChild(tiger_indi);

		let t_text = new createjs.Text(window.language.locale == "zh" ? "虎" : "T","12px lato", "#fff");
		t_text.x = tiger_indi.x;
		t_text.y = tiger_indi.y;
		t_text.textAlign = "center";
		t_text.textBaseline = "middle";
		this.tables[x].resultStatCon.addChild(t_text);

		// === tiger stats
		let tiger_bar_bg = new createjs.Shape();
		tiger_bar_bg.graphics.ss(1).s("#7f1d1e").drawRoundRect(0,0,90,28,8);
		tiger_bar_bg.x = 1098;
		tiger_bar_bg.y = 248  + this.tables[x].y;
		this.tables[x].resultStatCon.addChild(tiger_bar_bg);

		this.tables[x].tiger_bar = new createjs.Shape();
		this.tables[x].tiger_bar.graphics.beginFill("#7f1d1e").drawRect(0,0,90,28);
		this.tables[x].tiger_bar.x = tiger_bar_bg.x;
		this.tables[x].tiger_bar.y = 248 + this.tables[x].y;
		this.tables[x].tiger_bar.mask = tiger_bar_bg;
		this.tables[x].resultStatCon.addChild(this.tables[x].tiger_bar);

		this.tables[x].tiger_percent = new createjs.Text("100%","28px bebasNeue","#7f1d1e");
		this.tables[x].tiger_percent.y = 245 + this.tables[x].y;
		this.tables[x].tiger_percent.x = 1238 -1;
		this.tables[x].tiger_percent.textAlign = "right";
		this.tables[x].resultStatCon.addChild(this.tables[x].tiger_percent);

		this.tables[x].tie_count = new createjs.Text("0","24px bebasNeue","#fff");
		this.tables[x].tie_count.textAlign = "right";
		this.tables[x].tie_count.x = tie_bg.x + 43 - 2;
		this.tables[x].tie_count.y = tie_bg.y;
		this.tables[x].resultStatCon.addChild(this.tables[x].tie_count);

		this.tables[x].dragon_count = new createjs.Text("0","24px bebasNeue","#fff");
		this.tables[x].dragon_count.textAlign = "right";
		this.tables[x].dragon_count.x = 40 + 516 ;
		this.tables[x].dragon_count.y = tie_bg.y;
		this.tables[x].resultStatCon.addChild(this.tables[x].dragon_count);

		this.tables[x].dragon_big_count= new createjs.Text("0","24px bebasNeue","#fff");
		this.tables[x].dragon_big_count.textAlign = "right";
		this.tables[x].dragon_big_count.x = this.tables[x].dragon_count.x + 54 - 1;
		this.tables[x].dragon_big_count.y = tie_bg.y;
		this.tables[x].resultStatCon.addChild(this.tables[x].dragon_big_count);

		this.tables[x].dragon_small_count= new createjs.Text("0","24px bebasNeue","#fff");
		this.tables[x].dragon_small_count.textAlign = "right";
		this.tables[x].dragon_small_count.x = this.tables[x].dragon_count.x + 110 - 3;
		this.tables[x].dragon_small_count.y = tie_bg.y;
		this.tables[x].resultStatCon.addChild(this.tables[x].dragon_small_count);

		this.tables[x].dragon_odd_count= new createjs.Text("0","24px bebasNeue","#fff");
		this.tables[x].dragon_odd_count.textAlign = "right";
		this.tables[x].dragon_odd_count.x = this.tables[x].dragon_count.x + 160 -1;
		this.tables[x].dragon_odd_count.y = tie_bg.y;
		this.tables[x].resultStatCon.addChild(this.tables[x].dragon_odd_count);

		this.tables[x].dragon_even_count= new createjs.Text("0","24px bebasNeue","#fff");
		this.tables[x].dragon_even_count.textAlign = "right";
		this.tables[x].dragon_even_count.x = this.tables[x].dragon_count.x + 214 + 1 -2;
		this.tables[x].dragon_even_count.y = tie_bg.y;
		this.tables[x].resultStatCon.addChild(this.tables[x].dragon_even_count);

		this.tables[x].tiger_count = new createjs.Text("0","24px bebasNeue","#fff");
		this.tables[x].tiger_count.textAlign = "right";
		this.tables[x].tiger_count.x = 248 + 838;
		this.tables[x].tiger_count.y = tie_bg.y;
		this.tables[x].resultStatCon.addChild(this.tables[x].tiger_count);

		this.tables[x].tiger_big_count = new createjs.Text("0","24px bebasNeue","#fff");
		this.tables[x].tiger_big_count.textAlign = "right";
		this.tables[x].tiger_big_count.x = this.tables[x].tiger_count.x - 50 - 2;
		this.tables[x].tiger_big_count.y = tie_bg.y;
		this.tables[x].resultStatCon.addChild(this.tables[x].tiger_big_count);

		this.tables[x].tiger_small_count = new createjs.Text("0","24px bebasNeue","#fff");
		this.tables[x].tiger_small_count.textAlign = "right";
		this.tables[x].tiger_small_count.x = this.tables[x].tiger_count.x - 105;
		this.tables[x].tiger_small_count.y = tie_bg.y;
		this.tables[x].resultStatCon.addChild(this.tables[x].tiger_small_count);

		this.tables[x].tiger_odd_count = new createjs.Text("0","24px bebasNeue","#fff");
		this.tables[x].tiger_odd_count.textAlign = "right";
		this.tables[x].tiger_odd_count.x = this.tables[x].tiger_count.x - 158 - 1;
		this.tables[x].tiger_odd_count.y = tie_bg.y;
		this.tables[x].resultStatCon.addChild(this.tables[x].tiger_odd_count);

		this.tables[x].tiger_even_count = new createjs.Text("0","24px bebasNeue","#fff");
		this.tables[x].tiger_even_count.textAlign = "right";
		this.tables[x].tiger_even_count.x = this.tables[x].tiger_count.x - 210 -1;
		this.tables[x].tiger_even_count.y = tie_bg.y;
		this.tables[x].resultStatCon.addChild(this.tables[x].tiger_even_count);

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

		let infoDragonMark = new createjs.Shape();
		infoDragonMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 11);
		infoDragonMark.x = this.tables[x].userCount.x + 100;
		infoDragonMark.y = 27;
		this.tables[x].roomInfoCon.addChild(infoDragonMark);

		let dragonMarkText = new createjs.Text(window.language.locale == "zh" ? '龙' : 'D', '15px Lato', '#fff');
		dragonMarkText.x = infoDragonMark.x;
		dragonMarkText.y = infoDragonMark.y - 9;
		dragonMarkText.textAlign = 'center';
		this.tables[x].roomInfoCon.addChild(dragonMarkText);

		this.tables[x].dragonBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
		this.tables[x].dragonBetAmt.x = infoDragonMark.x + 20;
		this.tables[x].dragonBetAmt.y = 16;
		this.tables[x].dragonBetAmt.textAlign = 'left';
		this.tables[x].roomInfoCon.addChild(this.tables[x].dragonBetAmt);

		this.tables[x].infoTieMark = new createjs.Shape();
		this.tables[x].infoTieMark.graphics.ss(1).beginStroke('#fff').beginFill('#689f38').drawCircle(0, 0, 11);
		this.tables[x].infoTieMark.x = this.tables[x].dragonBetAmt.x + 150;
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

		this.tables[x].infoTigerMark = new createjs.Shape();
		this.tables[x].infoTigerMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 11);
		this.tables[x].infoTigerMark.x = this.tables[x].tieBetAmt.x + 150;
		this.tables[x].infoTigerMark.y = 27;
		this.tables[x].roomInfoCon.addChild(this.tables[x].infoTigerMark);

		this.tables[x].tigerMarkText = new createjs.Text(window.language.locale == "zh" ? '虎' : 'T', '15px Lato', '#fff');
		this.tables[x].tigerMarkText.x = this.tables[x].infoTigerMark.x;
		this.tables[x].tigerMarkText.y = this.tables[x].infoTigerMark.y - 9;
		this.tables[x].tigerMarkText.textAlign = 'center';
		this.tables[x].roomInfoCon.addChild(this.tables[x].tigerMarkText);

		this.tables[x].tigerBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
		this.tables[x].tigerBetAmt.x = this.tables[x].infoTigerMark.x + 20;
		this.tables[x].tigerBetAmt.y = 16;
		this.tables[x].tigerBetAmt.textAlign = 'left';
		this.tables[x].roomInfoCon.addChild(this.tables[x].tigerBetAmt);

		if (window.language.locale === "zh") {
			dragonMarkText.y += 1;
			this.tables[x].tieMarkText.y += 1;
			this.tables[x].tigerMarkText.y += 1;
		}

		this.setRoomInfo(data.betInfo, x, data.totalBettingUsers);

		// === Bet range
		_target.addChild(this.tables[x].bet_range_container)

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

		this.tables[x].table_name = new createjs.Text(window.language.lobby.dragontiger,"bold 20px ArvoItalic","#fdba44");
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

		this.setPercentages(data, _target, _timer_c,  x, self)

		this.checkMaintenance(data, false, x);
		this.drawPearlRoad(data, _target, _timer_c,  x, self);
		this.drawBigRoad(data, _target, _timer_c,  x, self);
		this.drawBigEyeBoy(data, _target, _timer_c,  x, self);
		this.drawSmallRoad(data, _target, _timer_c,  x, self);
		this.drawCockroachRoad(data, _target, _timer_c,  x, self);
	},
	setRoomInfo(data, x, totalBettingUsers) {
  	this.resetRoomInfo(x);

		if (!data) return;

		if (data.dragon) {
			this.tables[x].dragonBetAmt.text = `${numberWithCommas(data.dragon.totalBets)}/${numberWithCommas(data.dragon.totalUsers)}`;
		}

		if (data.tiger) {
			this.tables[x].tigerBetAmt.text = `${numberWithCommas(data.tiger.totalBets)}/${numberWithCommas(data.tiger.totalUsers)}`;
		}

		if (data.tie) {
			this.tables[x].tieBetAmt.text = `${numberWithCommas(data.tie.totalBets)}/${numberWithCommas(data.tie.totalUsers)}`;
		}

		this.tables[x].userCount.text = numberWithCommas(totalBettingUsers);
  },
  resetRoomInfo(x) {
  	this.tables[x].dragonBetAmt.text = '0/0';
  	this.tables[x].tigerBetAmt.text = '0/0';
  	this.tables[x].tieBetAmt.text = '0/0';
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
	setPercentages (data, _target, _timer_c,  x, self) {
		let data_marks = data.marks;
		data_marks =  _.filter(data_marks, function (e) {
			if(e.mark) return e;
		});

    let count = data_marks.length;

    let grouped = _.groupBy(data_marks, function (e) {
			return e.mark;
		});


		let rmcount = {
			total  : data_marks.length,
			dragon : 0,
			tiger: 0,
			tie : 0,
			dragon_small : 0,
			dragon_big : 0,
			dragon_odd : 0,
			dragon_even : 0,
			tiger_small : 0,
			tiger_big : 0,
			tiger_odd : 0,
			tiger_even : 0
		}
		for(var key in grouped) {
			switch(key) {
				case "d" : //dragon
				case "b" : //dragon
				case "c" : //dragon
				case "g" : //dragon
				case "h" :
				case "i" :
				case "j" :
					rmcount.dragon += grouped[key].length;
					grouped[key].forEach((row) => {
						if(row.num > 7) {
							rmcount.dragon_big ++;
						} else if(row.num < 7) {
							rmcount.dragon_small ++;
						}

						if(row.num % 2 == 0 ){
							rmcount.dragon_even ++;
						} else {
							rmcount.dragon_odd ++;
						}
					})
					break;
				case "e" :
				case "f" :
				case "k" :
				case "l" :
				case "m" :
				case "n" :
					grouped[key].forEach((row) => {
						if(row.num > 7) {
							rmcount.tiger_big ++;
						} else if(row.num < 7) {
							rmcount.tiger_small ++;
						}

						if(row.num % 2 == 0 ){
							rmcount.tiger_even ++;
						} else {
							rmcount.tiger_odd ++;
						}
					})
					rmcount.tiger += grouped[key].length;
					break;
				case "a" :
				case "o" :
				case "p" :
				case "q" :
				case "r" :
				case "s" :
				case "t" :
					rmcount.tie += grouped[key].length;
					break;
			}
		}
		this.tables[x].dragon_bar.scaleX = rmcount.dragon / rmcount.total;
		this.tables[x].dragon_percent.text = Math.round((rmcount.dragon / rmcount.total) * 100) + "%";
		if(!rmcount.total) this.tables[x].dragon_percent.text = '0%';

		this.tables[x].tiger_bar.scaleX = rmcount.tiger / rmcount.total;
		this.tables[x].tiger_percent.text = Math.round((rmcount.tiger / rmcount.total) * 100) + "%";
		if(!rmcount.total) this.tables[x].tiger_percent.text = '0%';

		this.tables[x].tie_count.text = rmcount.tie;

		this.tables[x].dragon_count.text = rmcount.dragon;
		this.tables[x].dragon_small_count.text = rmcount.dragon_small;
		this.tables[x].dragon_big_count.text = rmcount.dragon_big;
		this.tables[x].dragon_odd_count.text = rmcount.dragon_odd;
		this.tables[x].dragon_even_count.text = rmcount.dragon_even;

		this.tables[x].tiger_count.text = rmcount.tiger;
		this.tables[x].tiger_small_count.text = rmcount.tiger_small;
		this.tables[x].tiger_big_count.text = rmcount.tiger_big;
		this.tables[x].tiger_odd_count.text = rmcount.tiger_odd;
		this.tables[x].tiger_even_count.text = rmcount.tiger_even;
  },
	drawPearlRoad (data, _target, _timer_c,  x, self) {
		this.tables[x].pearlroad_container.removeAllChildren();

		let marks = formatData.fnFormatDTPearlRoad(data.marks, 6,14)

		for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
				if(marks.matrix[i][e] === undefined) continue;

				let sp = createSpriteRoadMap(self.context.load.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, sp);
				sp.x = (e * 38) + 1.6;
				sp.y = (i * 37.8) - 0.4;
				sp.gotoAndStop("pearl-dt-"+marks.matrix[i][e].mark);
				this.tables[x].pearlroad_container.addChild(sp);
			} //end for
		} //end for
	},
	drawBigRoad (data, _target, _timer_c,  x, self) {

		this.tables[x].bigroad_container.cache(0,0,454,228)
		this.tables[x].bigroad_container.updateCache()
		this.tables[x].bigroad_container.removeAllChildren();

		let marks = formatData.fnFormatDTBigRoad(data.marks, 6,25)

		let sp = null;
		for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
				if(marks.matrix[i][e] === undefined) continue;
				sp = drawSboard("bigroad")[marks.matrix[i][e].mark];
				sp.x = (e * 19.15) + -1;
				sp.y = (i*19) + -1.5;
				sp.scaleX = sp.scaleY = 0.7;

				if(marks.matrix[i][e].ties) {
					sp.children[sp.children.length-1].visible = true;

					if(marks.matrix[i][e].ties > 1) {
						let text = new createjs.Text(marks.matrix[i][e].ties, "bold 18px bebasNeue","#000");
						text.x = sp.x + (10);
						text.y = sp.y;
						text.textAlign = "center";

						this.tables[x].bigroad_container.addChild(text);
					}

					if(marks.matrix[i][e].suited_tie) {
						sp.children[sp.children.length-1].graphics.clear().beginFill("#ff9800").drawRect(0,0,3,30);
					}
				}

				this.tables[x].bigroad_container.addChild(sp);
			} //end for
		} //end for
		this.tables[x].bigroad_container.updateCache()
	},
	drawBigEyeBoy (data, _target, _timer_c,  x, self) {

		this.tables[x].bigeyeboy_container.cache(0,0,454,228)
		this.tables[x].bigeyeboy_container.updateCache()

		this.tables[x].bigeyeboy_container.removeAllChildren();

		let marks = formatData.fnFormatDTBigEyeBoy(data.marks, 6,48)

		let sp = null;
		for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
				if(marks.matrix[i][e] === undefined) continue;
				sp = drawSboard("bigeyeboy")[marks.matrix[i][e].mark];
				sp.x = (e * 9.6) + 1;
				sp.y = (i * 9.4) - 2;
				sp.scaleX = sp.scaleY = 0.36;
				this.tables[x].bigeyeboy_container.addChild(sp);
			} //end for
		} //end for

		this.tables[x].bigeyeboy_container.updateCache()
	},
	drawSmallRoad (data, _target, _timer_c,  x, self) {

		this.tables[x].smallroad_container.cache(0,0,454,228)
		this.tables[x].smallroad_container.updateCache()
		this.tables[x].smallroad_container.removeAllChildren();

		let marks = formatData.fnFormatDTSmallRoad(data.marks,6,24);

		let sp = null;
		for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
			if(marks.matrix[i][e] === undefined) continue;
				sp = drawSboard("smallroad")[marks.matrix[i][e].mark];
				sp.x = e * 9.58;
				sp.y = (i * 9.45) - 0.5;
				sp.scaleX = sp.scaleY = 0.44;
				this.tables[x].smallroad_container.addChild(sp);
			} //end for
		} //end for

		this.tables[x].smallroad_container.updateCache()
	},
	drawCockroachRoad(data, _target, _timer_c,  x, self) {

		this.tables[x].cockroachroad_container.cache(0,0,454,228)
		this.tables[x].cockroachroad_container.updateCache()

		this.tables[x].cockroachroad_container.removeAllChildren();

		let marks = formatData.fnFormatDTCockroachPig(data.marks,6,24);

		let sp = null;
		for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
				if(marks.matrix[i][e] === undefined) continue;
				sp = drawSboard("cockroach")[marks.matrix[i][e].mark];
				sp.x = (e * 9.55) - 0.5;
				sp.y = (i * 9.3) - 0.5;
				sp.scaleX = sp.scaleY = 0.44;
				this.tables[x].cockroachroad_container.addChild(sp);
			} //end c
		} //end for

		this.tables[x].cockroachroad_container.updateCache()
	},
	setResult(data, _target, _timer_c,  x, self) {
		if(!this.tables[x] || !this.tables[x].status) return;
		this.tables[x].status.text  = window.language.lobby.result;
		this.tables[x].deal_count.text = data.marks.length
	},
}

export default {
	instance
}