import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';
import rmformat from '../../factories/formatter';
import sboard from '../../factories/scoreboard_draw';

let formatData = rmformat();
let drawSboard  = sboard();
let instance = null;

instance = {
	list_tables : [],
	getText(x,y,text,font,color,align,valign){
		let ctrl = new createjs.Text(text,font,color);
		ctrl.x = x;
		ctrl.y = y;
		ctrl.textAlign = align;
		ctrl.textBaseline = valign;//"middle"
		return ctrl;
	},
	makeListTables (data, _target, _timer_c,  x, self) {
    this.list_tables[x] = _target.list_tables;
		// self.context.lobby_banner.banner_container.visible = true;
		// self.context.lobby_banner.table_banner_container.removeAllChildren()
		let label_spacing = 15;

    // === shoe count
		let deal_label = new createjs.Text(window.language.lobby.deal ,"18px latoregular","#fff");
		deal_label.x = 180;
		deal_label.y = 74 + this.list_tables[x].y ;
		_target.addChild(deal_label);

		if(window.language.locale == "zh") {
			deal_label.font = "23px latoregular";
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

		// === result bg
		let card_result_container = new createjs.Container();
		let player_bg = new createjs.Shape();
		player_bg.graphics.beginFill("#1665c1").drawRoundRect(0,0,86,104,8);
		card_result_container.addChild(player_bg);

		let player_label = this.getText(43,80,window.language.lobby.dragoncaps,"17px lato","#fff","center","top");
		card_result_container.addChild(player_label);

		let gap_left = 96;

		let banker_bg = new createjs.Shape();
		banker_bg.graphics.beginFill("#d32f2e").drawRoundRect(gap_left,0,86,104,8);
		card_result_container.addChild(banker_bg);

		let banker_label = this.getText(gap_left+43,80,window.language.lobby.tigercaps,"17px lato","#fff","center","top");
		card_result_container.addChild(banker_label);
		card_result_container.y = this.list_tables[x].y + 158;
		card_result_container.x = 1410;

		this.list_tables[x].card_result_container = new createjs.Container();
		this.list_tables[x].card_result_container.y = this.list_tables[x].y + 158;
		this.list_tables[x].card_result_container.x = 1410;
		_target.addChild(card_result_container,this.list_tables[x].card_result_container);

		//************************************************************************************
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
		//************************************************************************************

		this.list_tables[x].pearlroad_container = new createjs.Container();
		this.list_tables[x].pearlroad_container.y = this.list_tables[x].y + 8.5;
		this.list_tables[x].pearlroad_container.x = 364;
		_target.addChild(this.list_tables[x].pearlroad_container);

		this.list_tables[x].bigroad_container = new createjs.Container();
		this.list_tables[x].bigroad_container.y = this.list_tables[x].y + 8.5;
		this.list_tables[x].bigroad_container.x = 804;
		_target.addChild(this.list_tables[x].bigroad_container);

		this.list_tables[x].bigeyeboy_container = new createjs.Container();
		this.list_tables[x].bigeyeboy_container.y = this.list_tables[x].y + 119;
		this.list_tables[x].bigeyeboy_container.x = 805;
		_target.addChild(this.list_tables[x].bigeyeboy_container);

		this.list_tables[x].smallroad_container = new createjs.Container();
		this.list_tables[x].smallroad_container.y = this.list_tables[x].y +173;
		this.list_tables[x].smallroad_container.x = 804;
		_target.addChild(this.list_tables[x].smallroad_container);

		this.list_tables[x].cockroachroad_container = new createjs.Container();
		this.list_tables[x].cockroachroad_container.y = this.list_tables[x].y + 174;
		this.list_tables[x].cockroachroad_container.x = 1077;
		_target.addChild(this.list_tables[x].cockroachroad_container);

		// === dragon stats
		this.list_tables[x].resultStatCon = new createjs.Container();
		this.list_tables[x].resultStatCon.visible = true;
		_target.addChild(this.list_tables[x].resultStatCon);

    if (window.room_info) this.list_tables[x].resultStatCon.visible = false;

		let dragon_bar_bg = new createjs.Shape();
		dragon_bar_bg.graphics.ss(2).s("#0d3e67").drawRoundRect(0,0,130,28,8);
		dragon_bar_bg.x = 432;
		dragon_bar_bg.y = 248 + this.list_tables[x].y;
		this.list_tables[x].resultStatCon.addChild(dragon_bar_bg);

		this.list_tables[x].dragon_bar = new createjs.Shape();
		this.list_tables[x].dragon_bar.graphics.beginFill("#0d3e67").drawRect(0,0,130,28);
		this.list_tables[x].dragon_bar.x = 432 + 130;
		this.list_tables[x].dragon_bar.y = 248 + this.list_tables[x].y;
		this.list_tables[x].dragon_bar.mask = dragon_bar_bg;
		this.list_tables[x].dragon_bar.regX = 130
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].dragon_bar);

		this.list_tables[x].dragon_percent = new createjs.Text("100%","28px bebasNeue","#0d3e67");
		this.list_tables[x].dragon_percent.x = 364;
		this.list_tables[x].dragon_percent.y = 245 + this.list_tables[x].y;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].dragon_percent);

		let d_bg = null;
		let t_bg = null;
		let tie_bg = null;

		for(var i = 0; i < 5; i++) {
			d_bg = new createjs.Shape();
			d_bg.graphics.beginFill("#0d3e67").drawRoundRect(0,0,47,28,6);
			d_bg.x = (i*53) + 568;
			d_bg.y = 247 + this.list_tables[x].y
			this.list_tables[x].resultStatCon.addChild(d_bg);

			t_bg = new createjs.Shape();
			t_bg.graphics.beginFill("#7f1d1e").drawRoundRect(0,0,47,28,6);
			t_bg.x = (i*53) + 888;
			t_bg.y = 247 + this.list_tables[x].y
			this.list_tables[x].resultStatCon.addChild(t_bg);
		} // end for

		tie_bg = new createjs.Shape();
		tie_bg.graphics.beginFill("#57802f").drawRoundRect(0,0,47,28,6);
		tie_bg.x = 834 ;
		tie_bg.y = 247 + this.list_tables[x].y
		this.list_tables[x].resultStatCon.addChild(tie_bg);

		// === cosmetics
		let dragon_indi = new createjs.Shape();
		dragon_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,8);
		dragon_indi.x = 568 + 12;
		dragon_indi.y = 247 + this.list_tables[x].y + 14;
		this.list_tables[x].resultStatCon.addChild(dragon_indi);

		let d_text = new createjs.Text(window.language.locale == "zh" ? "龙" : "D","12px lato", "#fff");
		d_text.x = dragon_indi.x;
		d_text.y = dragon_indi.y;
		d_text.textAlign = "center";
		d_text.textBaseline = "middle";
		this.list_tables[x].resultStatCon.addChild(d_text);

		let d_big_indi = new createjs.Shape();
		d_big_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,8);
		d_big_indi.x = 53 + 568 +14;
		d_big_indi.y = 247 + this.list_tables[x].y  + 14;
		this.list_tables[x].resultStatCon.addChild(d_big_indi);

		let d_big_text = new createjs.Text(window.language.locale == "zh" ? "大" : "B","12px lato", "#fff");
		d_big_text.x = d_big_indi.x;
		d_big_text.y = d_big_indi.y;
		d_big_text.textAlign = "center";
		d_big_text.textBaseline = "middle";
		this.list_tables[x].resultStatCon.addChild(d_big_text);

		let d_big_indi2 = new createjs.Shape();
		d_big_indi2.graphics.ss(0.5).s("#fff").beginFill("#1465bf").drawCircle(0,0,3.5);
		d_big_indi2.x = 53 + 568 + 7;
		d_big_indi2.y = 247 + this.list_tables[x].y + 8;
		this.list_tables[x].resultStatCon.addChild(d_big_indi2);

		let s_big_indi = new createjs.Shape();
		s_big_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,8);
		s_big_indi.x = (53*2) + 568 +14;
		s_big_indi.y = 247 + this.list_tables[x].y  + 14;
		this.list_tables[x].resultStatCon.addChild(s_big_indi);

		let s_big_text = new createjs.Text(window.language.locale == "zh" ? "小" : "S","12px lato", "#fff");
		s_big_text.x = s_big_indi.x;
		s_big_text.y = s_big_indi.y;
		s_big_text.textAlign = "center";
		s_big_text.textBaseline = "middle";
		this.list_tables[x].resultStatCon.addChild(s_big_text);

		let s_big_indi2 = new createjs.Shape();
		s_big_indi2.graphics.ss(0.5).s("#fff").beginFill("#1465bf").drawCircle(0,0,3.5);
		s_big_indi2.x = (53*2) + 568 + 7;
		s_big_indi2.y = 247 + this.list_tables[x].y + 19;
		this.list_tables[x].resultStatCon.addChild(s_big_indi2);

		let d_odd_indi = new createjs.Shape();
		d_odd_indi.graphics.ss(1).s("#1465bf").beginFill("#fff").drawCircle(0,0,8);
		d_odd_indi.x = (53*3) + 568 +14;
		d_odd_indi.y = 247 + this.list_tables[x].y  + 14;
		this.list_tables[x].resultStatCon.addChild(d_odd_indi);

		let d_odd_text = new createjs.Text(window.language.locale == "zh" ? "单" : "O","12px lato", "#1465bf");
		d_odd_text.x = d_odd_indi.x;
		d_odd_text.y = d_odd_indi.y;
		d_odd_text.textAlign = "center";
		d_odd_text.textBaseline = "middle";
		this.list_tables[x].resultStatCon.addChild(d_odd_text);

		let d_even_indi = new createjs.Shape();
		d_even_indi.graphics.ss(1).s("#1465bf").beginFill("#fff").drawCircle(0,0,8);
		d_even_indi.x = (53*4) + 568 +14;
		d_even_indi.y = 247 + this.list_tables[x].y  + 14;
		this.list_tables[x].resultStatCon.addChild(d_even_indi);

		let d_even_text = new createjs.Text(window.language.locale == "zh" ? "双" : "E","12px lato", "#1465bf");
		d_even_text.x = d_even_indi.x;
		d_even_text.y = d_even_indi.y;
		d_even_text.textAlign = "center";
		d_even_text.textBaseline = "middle";
		this.list_tables[x].resultStatCon.addChild(d_even_text);

		let tie_indi = new createjs.Shape();
		tie_indi.graphics.ss(1).s("#fff").beginFill("#689f39").drawCircle(0,0,8);
		tie_indi.x = (53*5) + 568 +14;
		tie_indi.y = 247 + this.list_tables[x].y  + 14;
		this.list_tables[x].resultStatCon.addChild(tie_indi);

		let tie_text = new createjs.Text(window.language.locale == "zh" ? '和' : 'T',"12px lato", "#fff");
		tie_text.x = tie_indi.x;
		tie_text.y = tie_indi.y;
		tie_text.textAlign = "center";
		tie_text.textBaseline = "middle";
		this.list_tables[x].resultStatCon.addChild(tie_text);

		let t_even_indi = new createjs.Shape();
		t_even_indi.graphics.ss(1).s("#d32f2e").beginFill("#fff").drawCircle(0,0,8);
		t_even_indi.x = (53*6) + 568 +14;
		t_even_indi.y = 247 + this.list_tables[x].y  + 14;
		this.list_tables[x].resultStatCon.addChild(t_even_indi);

		let t_even_text = new createjs.Text(window.language.locale == "zh" ? "双" : "E","12px lato", "#d32f2e");
		t_even_text.x = t_even_indi.x;
		t_even_text.y = t_even_indi.y;
		t_even_text.textAlign = "center";
		t_even_text.textBaseline = "middle";
		this.list_tables[x].resultStatCon.addChild(t_even_text);

		let t_odd_indi = new createjs.Shape();
		t_odd_indi.graphics.ss(1).s("#d32f2e").beginFill("#fff").drawCircle(0,0,8);
		t_odd_indi.x = (53*7) + 568 +14;
		t_odd_indi.y = 247 + this.list_tables[x].y  + 14;
		this.list_tables[x].resultStatCon.addChild(t_odd_indi);

		let t_odd_text = new createjs.Text(window.language.locale == "zh" ? "单" : "O","12px lato", "#d32f2e");
		t_odd_text.x = t_odd_indi.x;
		t_odd_text.y = t_odd_indi.y;
		t_odd_text.textAlign = "center";
		t_odd_text.textBaseline = "middle";
		this.list_tables[x].resultStatCon.addChild(t_odd_text);

		let t_small_indi = new createjs.Shape();
		t_small_indi.graphics.ss(1).s("#fff").beginFill("#d32f2e").drawCircle(0,0,8);
		t_small_indi.x = (53*8) + 568 + 15;
		t_small_indi.y = 247 + this.list_tables[x].y  + 14;
		this.list_tables[x].resultStatCon.addChild(t_small_indi);

		let t_small_text = new createjs.Text(window.language.locale == "zh" ? "小" : "S","12px lato", "#fff");
		t_small_text.x = t_small_indi.x;
		t_small_text.y = t_small_indi.y;
		t_small_text.textAlign = "center";
		t_small_text.textBaseline = "middle";
		this.list_tables[x].resultStatCon.addChild(t_small_text);

		let t_small_indi2 = new createjs.Shape();
		t_small_indi2.graphics.ss(0.5).s("#fff").beginFill("#d32f2e").drawCircle(0,0,3.5);
		t_small_indi2.x = (53*8) + 568 + 8;
		t_small_indi2.y = 247 + this.list_tables[x].y  + 19;
		this.list_tables[x].resultStatCon.addChild(t_small_indi2);

		let t_big_indi = new createjs.Shape();
		t_big_indi.graphics.ss(1).s("#fff").beginFill("#d32f2e").drawCircle(0,0,8);
		t_big_indi.x = (53*9) + 568 + 15;
		t_big_indi.y = 247 + this.list_tables[x].y  + 14;
		this.list_tables[x].resultStatCon.addChild(t_big_indi);

		let t_big_indi2 = new createjs.Shape();
		t_big_indi2.graphics.ss(0.5).s("#fff").beginFill("#d32f2e").drawCircle(0,0,3.5);
		t_big_indi2.x = (53*9) + 568 + 8;
		t_big_indi2.y = 247 + this.list_tables[x].y  + 8;
		this.list_tables[x].resultStatCon.addChild(t_big_indi2);

		let tiger_indi = new createjs.Shape();
		tiger_indi.graphics.ss(1).s("#fff").beginFill("#d32f2e").drawCircle(0,0,8);
		tiger_indi.x = (53*10) + 568 + 14;
		tiger_indi.y = 247 + this.list_tables[x].y + 14;
		this.list_tables[x].resultStatCon.addChild(tiger_indi);

		let t_big_text = new createjs.Text(window.language.locale == "zh" ? "大" : "B","12px lato", "#fff");
		t_big_text.x = t_big_indi.x;
		t_big_text.y = t_big_indi.y;
		t_big_text.textAlign = "center";
		t_big_text.textBaseline = "middle";
		this.list_tables[x].resultStatCon.addChild(t_big_text);

		let t_text = new createjs.Text(window.language.locale == "zh" ? "虎" : "T","12px lato", "#fff");
		t_text.x = tiger_indi.x;
		t_text.y = tiger_indi.y;
		t_text.textAlign = "center";
		t_text.textBaseline = "middle";
		this.list_tables[x].resultStatCon.addChild(t_text);
		// === end cosmetics

		// === tiger stats
		let tiger_bar_bg = new createjs.Shape();
		tiger_bar_bg.graphics.ss(2).s("#7f1d1e").drawRoundRect(0,0,130,28,8);
		tiger_bar_bg.x = 1154;
		tiger_bar_bg.y = 248  + this.list_tables[x].y;
		this.list_tables[x].resultStatCon.addChild(tiger_bar_bg);

		this.list_tables[x].tiger_bar = new createjs.Shape();
		this.list_tables[x].tiger_bar.graphics.beginFill("#7f1d1e").drawRect(0,0,130,28);
		this.list_tables[x].tiger_bar.x = tiger_bar_bg.x;
		this.list_tables[x].tiger_bar.y = 248 + this.list_tables[x].y;
		this.list_tables[x].tiger_bar.mask = tiger_bar_bg;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].tiger_bar);

		this.list_tables[x].tiger_percent = new createjs.Text("100%","28px bebasNeue","#7f1d1e");
		this.list_tables[x].tiger_percent.y = 245 + this.list_tables[x].y;
		this.list_tables[x].tiger_percent.x = 1348;
		this.list_tables[x].tiger_percent.textAlign = "right";
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].tiger_percent);

		let adjustCosmetics = 0;
		this.list_tables[x].tie_count = new createjs.Text("0","24px bebasNeue","#fff");
		this.list_tables[x].tie_count.textAlign = "right";
		this.list_tables[x].tie_count.x = tie_bg.x + 43 + adjustCosmetics;
		this.list_tables[x].tie_count.y = tie_bg.y;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].tie_count);


		this.list_tables[x].dragon_count = new createjs.Text("123","24px bebasNeue","#fff");
		this.list_tables[x].dragon_count.textAlign = "right";
		this.list_tables[x].dragon_count.x = 38 + 572 + .7 + adjustCosmetics;
		this.list_tables[x].dragon_count.y = tie_bg.y;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].dragon_count);

		this.list_tables[x].dragon_big_count= new createjs.Text("0","24px bebasNeue","#fff");
		this.list_tables[x].dragon_big_count.textAlign = "right";
		this.list_tables[x].dragon_big_count.x = this.list_tables[x].dragon_count.x + 53 +.7;
		this.list_tables[x].dragon_big_count.y = tie_bg.y;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].dragon_big_count);

		this.list_tables[x].dragon_small_count= new createjs.Text("0","24px bebasNeue","#fff");
		this.list_tables[x].dragon_small_count.textAlign = "right";
		this.list_tables[x].dragon_small_count.x = this.list_tables[x].dragon_count.x + 105 +.7;
		this.list_tables[x].dragon_small_count.y = tie_bg.y;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].dragon_small_count);

		this.list_tables[x].dragon_odd_count= new createjs.Text("0","24px bebasNeue","#fff");
		this.list_tables[x].dragon_odd_count.textAlign = "right";
		this.list_tables[x].dragon_odd_count.x = this.list_tables[x].dragon_count.x + 158 + .7;
		this.list_tables[x].dragon_odd_count.y = tie_bg.y;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].dragon_odd_count);

		this.list_tables[x].dragon_even_count= new createjs.Text("0","24px bebasNeue","#fff");
		this.list_tables[x].dragon_even_count.textAlign = "right";
		this.list_tables[x].dragon_even_count.x = this.list_tables[x].dragon_count.x + 211 + .7;
		this.list_tables[x].dragon_even_count.y = tie_bg.y;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].dragon_even_count);

		this.list_tables[x].tiger_count = new createjs.Text("0","24px bebasNeue","#fff");
		this.list_tables[x].tiger_count.textAlign = "right";
		this.list_tables[x].tiger_count.x = 255 + 887 + adjustCosmetics;
		this.list_tables[x].tiger_count.y = tie_bg.y;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].tiger_count);

		this.list_tables[x].tiger_big_count = new createjs.Text("0","24px bebasNeue","#fff");
		this.list_tables[x].tiger_big_count.textAlign = "right";
		this.list_tables[x].tiger_big_count.x = this.list_tables[x].tiger_count.x - 49 - 3;
		this.list_tables[x].tiger_big_count.y = tie_bg.y;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].tiger_big_count);

		this.list_tables[x].tiger_small_count = new createjs.Text("0","24px bebasNeue","#fff");
		this.list_tables[x].tiger_small_count.textAlign = "right";
		this.list_tables[x].tiger_small_count.x = this.list_tables[x].tiger_count.x - 107 + 2;
		this.list_tables[x].tiger_small_count.y = tie_bg.y;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].tiger_small_count);

		this.list_tables[x].tiger_odd_count = new createjs.Text("0","24px bebasNeue","#fff");
		this.list_tables[x].tiger_odd_count.textAlign = "right";
		this.list_tables[x].tiger_odd_count.x = this.list_tables[x].tiger_count.x - 158 + 2 -3;
		this.list_tables[x].tiger_odd_count.y = tie_bg.y;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].tiger_odd_count);

		this.list_tables[x].tiger_even_count = new createjs.Text("0","24px bebasNeue","#fff");
		this.list_tables[x].tiger_even_count.textAlign = "right";
		this.list_tables[x].tiger_even_count.x = this.list_tables[x].tiger_count.x - 208 - 3;
		this.list_tables[x].tiger_even_count.y = tie_bg.y;
		this.list_tables[x].resultStatCon.addChild(this.list_tables[x].tiger_even_count);

		// Bet range container
		_target.addChild(this.list_tables[x].bet_range_container)

		// === Room info
		this.list_tables[x].roomInfoCon = new createjs.Container();
		this.list_tables[x].roomInfoCon.x = 350;
		this.list_tables[x].roomInfoCon.y = this.list_tables[x].y + 240;
		this.list_tables[x].roomInfoCon.visible = false;
		_target.addChild(this.list_tables[x].roomInfoCon);

    if (window.room_info) this.list_tables[x].roomInfoCon.visible = true;

		let roomInfoBg = new createjs.Shape();
		roomInfoBg.graphics.beginFill("#333333").drawRect(0, 0, 1018, 45);
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

		let infoDragonMark = new createjs.Shape();
		infoDragonMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 11);
		infoDragonMark.x = 125;
		infoDragonMark.y = 20;
		this.list_tables[x].roomInfoCon.addChild(infoDragonMark);

		let dragonMarkText = new createjs.Text(window.language.locale == "zh" ? '龙' : 'D', '15px Lato', '#fff');
		dragonMarkText.x = infoDragonMark.x;
		dragonMarkText.y = infoDragonMark.y - 9;
		dragonMarkText.textAlign = 'center';
		this.list_tables[x].roomInfoCon.addChild(dragonMarkText);

		this.list_tables[x].dragonBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
		this.list_tables[x].dragonBetAmt.x = infoDragonMark.x + 20;
		this.list_tables[x].dragonBetAmt.y = 9;
		this.list_tables[x].dragonBetAmt.textAlign = 'left';
		this.list_tables[x].roomInfoCon.addChild(this.list_tables[x].dragonBetAmt);

		let infoTieMark = new createjs.Shape();
		infoTieMark.graphics.ss(1).beginStroke('#fff').beginFill('#689f38').drawCircle(0, 0, 11);
		infoTieMark.x = infoDragonMark.x + 180;
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

		let infoTigerMark = new createjs.Shape();
		infoTigerMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 11);
		infoTigerMark.x = infoTieMark.x + 180;
		infoTigerMark.y = 20;
		this.list_tables[x].roomInfoCon.addChild(infoTigerMark);

		let tigerMarkText = new createjs.Text(window.language.locale == "zh" ? '虎' : 'T', '15px Lato', '#fff');
		tigerMarkText.x = infoTigerMark.x;
		tigerMarkText.y = infoTigerMark.y - 9;
		tigerMarkText.textAlign = 'center';
		this.list_tables[x].roomInfoCon.addChild(tigerMarkText);

		this.list_tables[x].tigerBetAmt = new createjs.Text('0/0', '20px Bebasneue', '#b3b3b3');
		this.list_tables[x].tigerBetAmt.x = infoTigerMark.x + 20;
		this.list_tables[x].tigerBetAmt.y = 9;
		this.list_tables[x].tigerBetAmt.textAlign = 'left';
		this.list_tables[x].roomInfoCon.addChild(this.list_tables[x].tigerBetAmt);

		if (window.language.locale === "zh") {
			dragonMarkText.y -= 1;
			tigerMarkText.y -= 1;

			dragonMarkText.x -= 1;
			tieMarkText.x -= 1;
			tigerMarkText.x -= 1;
		}
		
		this.setRoomInfo(data.betInfo, x, data.totalBettingUsers);

		// === maintenance
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

		this.list_tables[x].table_name = new createjs.Text(window.language.lobby.dragontiger,"22px ArvoItalic","#fdba44");
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
		this.list_tables[x].maintenanceLogo.scaleX = this.list_tables[x].maintenanceLogo.scaleY = 0.9;
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

		this.checkMaintenance(data, false, x);
		this.drawPearlRoad(data, _target, _timer_c,  x, self);
		this.drawBigRoad(data, _target, _timer_c,  x, self, "list");
		this.drawBigEyeBoy(data, _target, _timer_c,  x, self);
		this.drawSmallRoad(data, _target, _timer_c,  x, self);
		this.drawCockroachRoad(data, _target, _timer_c,  x, self);
		this.setPercentages(data, _target, _timer_c,  x, self)
		this.inputRes(data, _target, _timer_c,  x, self)
		this.setStatus(data, _target, _timer_c,  x, self)

		// this.drawGameInfo(data)
	},
  setRoomInfo(data, x, totalBettingUsers) {
  	if (!this.list_tables[x]) return;
  	
  	this.resetRoomInfo(x);

		if (!data) return;

		let totalUsers = 0;

		if (data.dragon) {
			this.list_tables[x].dragonBetAmt.text = `${numberWithCommas(data.dragon.totalBets)}/${numberWithCommas(data.dragon.totalUsers)}`;
		}

		if (data.tiger) {
			this.list_tables[x].tigerBetAmt.text = `${numberWithCommas(data.tiger.totalBets)}/${numberWithCommas(data.tiger.totalUsers)}`;
		}

		if (data.tie) {
			this.list_tables[x].tieBetAmt.text = `${numberWithCommas(data.tie.totalBets)}/${numberWithCommas(data.tie.totalUsers)}`;
		}

		this.list_tables[x].userCount.text = numberWithCommas(totalBettingUsers);
  },
  resetRoomInfo(x) {
  	this.list_tables[x].dragonBetAmt.text = '0/0';
  	this.list_tables[x].tigerBetAmt.text = '0/0';
  	this.list_tables[x].tieBetAmt.text = '0/0';
  	this.list_tables[x].userCount.text = '0';
  },
	checkMaintenance  (maintenanceData, socket, x) {
		if(!this.list_tables || !this.list_tables[x] || !this.list_tables[x].maintenanceCon) return;

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
		} //end if socket
		else {
			activeMaintenance = maintenanceData.data;

			if (maintenanceData == 1) {
				maintenance = true;
			}
			else {
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
		}
		else {
			this.list_tables[x].maintenanceCon.visible = false;
		}
	},
	setResult (card_data, _target, _timer_c,  x, self) {
		if(!this.list_tables[x] || !this.list_tables[x].card_result_container) return;

		this.list_tables[x].status.text  = window.language.lobby.result;
		this.list_tables[x].deal_count.text = card_data.marks.length

    this.list_tables[x].card_result_container.children.forEach( (card) => {
      if(card.type == "tiger") {
         card.gotoAndStop("C"+card_data.gameInfo.tiger);
      }
      else if(card.type == "dragon")  {
        card.gotoAndStop("C"+card_data.gameInfo.dragon);
      }
    })
	},
	inputRes (card_data, _target, _timer_c,  x, self) {
		if(!this.list_tables[x] || !this.list_tables[x].card_result_container) return;

    if(card_data.gameInfo.burn && !card_data.gameInfo.tiger && !card_data.gameInfo.dragon) return;

    let card = null;

    if(card_data.gameInfo.tiger) {
    	card = createCardSprite(self,40,60,self.context.load.getResources("cards-60"));
      card.gotoAndStop("back_red");
      card.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, 2, 5);
      card.x = 119;
      card.type = "tiger"
      card.y = 12;
    	this.list_tables[x].card_result_container.addChild(card);
    }
    if(card_data.gameInfo.dragon) {
    	card = createCardSprite(self,40,60,self.context.load.getResources("cards-60"));
        card.y = 12;
        card.x = 23;
        card.gotoAndStop("back_blue");
        card.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, 2, 5);
        card.type = "dragon"
    	this.list_tables[x].card_result_container.addChild(card);
    }

    this.list_tables[x].status.text = window.language.lobby.dealing;
  },
	setPercentages (data, _target, _timer_c,  x, self) {
    if(!this.list_tables[x]) return;

    let marks = data.marks;

		marks =  _.filter(marks, function (e) {
			if(e.mark) return e;
		});

    let count = marks.length;

		let grouped = _.groupBy(marks, function (e) {
			return e.mark;
		});

		let rmcount = {
			total  : marks.length,
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

		if(!this.list_tables[x].dragon_bar) return;
		this.list_tables[x].dragon_bar.scaleX = rmcount.dragon / rmcount.total;

		if(!this.list_tables[x].dragon_percent) return;
		this.list_tables[x].dragon_percent.text = Math.round((rmcount.dragon / rmcount.total) * 100) + "%";
		if(!rmcount.total) this.list_tables[x].dragon_percent.text = '0%';

		if(!this.list_tables[x].tiger_bar) return;
		this.list_tables[x].tiger_bar.scaleX = rmcount.tiger / rmcount.total;

		if(!this.list_tables[x].tiger_percent) return;
		this.list_tables[x].tiger_percent.text = Math.round((rmcount.tiger / rmcount.total) * 100) + "%";
		if(!rmcount.total) this.list_tables[x].tiger_percent.text = '0%';

		this.list_tables[x].tie_count.text = rmcount.tie;
		this.list_tables[x].dragon_count.text = rmcount.dragon;
		this.list_tables[x].dragon_small_count.text = rmcount.dragon_small;
		this.list_tables[x].dragon_big_count.text = rmcount.dragon_big;
		this.list_tables[x].dragon_odd_count.text = rmcount.dragon_odd;
		this.list_tables[x].dragon_even_count.text = rmcount.dragon_even;
		this.list_tables[x].tiger_count.text = rmcount.tiger;
		this.list_tables[x].tiger_small_count.text = rmcount.tiger_small;
		this.list_tables[x].tiger_big_count.text = rmcount.tiger_big;
		this.list_tables[x].tiger_odd_count.text = rmcount.tiger_odd;
		this.list_tables[x].tiger_even_count.text = rmcount.tiger_even;
  },
	drawPearlRoad (data, _target, _timer_c,  x, self) {

		this.list_tables[x].pearlroad_container.removeAllChildren();

		let marks = formatData.fnFormatDTPearlRoad(data.marks, 6,14)

		let sp = null;

		for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
				if(marks.matrix[i][e] === undefined) continue;
				let sp = createSpriteRoadMap(window.language.locale == "zh" ? "/img/all_scoreboard_zh.png" : "/img/all_scoreboard.png" , 40,40, sp);
				sp.x = (e * 36.6) + 2;
				sp.y = i * 36.6;
				sp.gotoAndStop("pearl-dt-"+marks.matrix[i][e].mark);
				this.list_tables[x].pearlroad_container.addChild(sp);
			} //end for
		} //end for
	},
	drawBigRoad (data, _target, _timer_c,  x, self) {

		this.list_tables[x].bigroad_container.removeAllChildren();

		let marks = formatData.fnFormatDTBigRoad(data.marks, 6,24)

		let width = 20;
		let font_size = "16px";
		let sp;
		for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
				if(marks.matrix[i][e] === undefined) continue;
				sp = drawSboard("bigroad")[marks.matrix[i][e].mark];
				sp.x = e * 18.15;
				sp.y = i * 18;
				sp.scaleX = sp.scaleY = 0.7;

				this.list_tables[x].bigroad_container.addChild(sp);

				if(marks.matrix[i][e].ties) {
					sp.children[sp.children.length-1].visible = true;

					if(marks.matrix[i][e].ties > 1) {
						let tie_text = new createjs.Text(marks.matrix[i][e].ties, "bold "+font_size+" bebasNeue","#000");
						tie_text.y = sp.y + (width/2) +2;
						tie_text.x = sp.x  + width/2 + 1;
						tie_text.textAlign = "center";
						tie_text.textBaseline = "middle";
						this.list_tables[x].bigroad_container.addChild(tie_text);
					}

					if(marks.matrix[i][e].suited_tie) {
						sp.children[sp.children.length-1].graphics.clear().beginFill("#ff9800").drawRect(0,0,3,30);
					}
				}

			} //end for
		} //end for
	},
	drawBigEyeBoy (data, _target, _timer_c,  x, self) {
		this.list_tables[x].bigeyeboy_container.removeAllChildren();

		let marks = formatData.fnFormatDTBigEyeBoy(data.marks, 6,24)
		let sp = null;

		for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
				if(marks.matrix[i][e] === undefined) continue;
				sp = drawSboard("bigeyeboy")[marks.matrix[i][e].mark];
				sp.x = e * 9.15;
				sp.y = i * 9.0;
				sp.scaleX = sp.scaleY = 0.34;
				this.list_tables[x].bigeyeboy_container.addChild(sp);
			} //end for
		} //end for

	},
	drawSmallRoad (data, _target, _timer_c,  x, self) {

		this.list_tables[x].smallroad_container.removeAllChildren();

		let marks = formatData.fnFormatDTSmallRoad(data.marks,6,24);

		let sp = null;

		for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
				if(marks.matrix[i][e] === undefined) continue;
				sp = drawSboard("smallroad")[marks.matrix[i][e].mark];
				sp.x = e * 9.1;
				sp.y = i * 9.0;
				sp.scaleX = sp.scaleY = 0.42;
				this.list_tables[x].smallroad_container.addChild(sp);
			} //end for
		} //end for
	},
	drawCockroachRoad(data, _target, _timer_c,  x, self) {

		this.list_tables[x].cockroachroad_container.removeAllChildren();

		let marks = formatData.fnFormatDTCockroachPig(data.marks,6,24);

		let sp = null;

		for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
				if(marks.matrix[i][e] === undefined) continue;
				sp = drawSboard("cockroach")[marks.matrix[i][e].mark];
				sp.x = e * 9.1;
				sp.y = i * 9.0;
				sp.scaleX = sp.scaleY = 0.42;
				this.list_tables[x].cockroachroad_container.addChild(sp);
			} //end for
		} //end for
	},
	setStatus (data, _target, _timer_c,  x, self) {
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

		this.list_tables[x].status.text = status;
	}

}

export default {
	instance
}
