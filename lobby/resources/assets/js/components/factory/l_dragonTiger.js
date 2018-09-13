import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';
import rmformat from '../../factories/formatter';
import sboard from '../../factories/scoreboard_draw';

let formatData = rmformat();

let instance = null;
let drawSboard  = sboard();

export default(self,data,x) => {
	instance = {
		getText(x,y,text,font,color,align,valign){
			let ctrl = new createjs.Text(text,font,color);
			ctrl.x = x;
			ctrl.y = y;
			ctrl.textAlign = align;
      		ctrl.textBaseline = valign;//"middle"
      		return ctrl;
		},
		createTable () {

			self.context.lobby_banner.banner_container.visible = true;
			self.context.lobby_banner.table_banner_container.removeAllChildren()

			let label_spacing = 15;

      // === shoe count
			let deal_label = new createjs.Text(window.language.lobby.deal ,"18px latoregular","#fff");
			deal_label.x = 180;
			deal_label.y = 74 + self.all_list_table[x].y ;
			self.list_view.addChild(deal_label);

			if(window.language.locale == "zh") {
					deal_label.font = "23px latoregular";
			}

			let game_label_height = deal_label.getMeasuredHeight();

			self.all_list_table[x].deal_count = new createjs.Text(data.marks.length, "18px latoregular","#fff");
			self.all_list_table[x].deal_count.textAlign = "right";
			self.all_list_table[x].deal_count.x = 310;
			self.all_list_table[x].deal_count.y = deal_label.y + game_label_height + label_spacing;
			self.list_view.addChild(self.all_list_table[x].deal_count);

			// === game rounds
			let deal_count_height = self.all_list_table[x].deal_count.getMeasuredHeight();

			let game_rounds_label = new createjs.Text(window.language.lobby.game ,"18px latoregular","#fff");
			game_rounds_label.x = 180;
			game_rounds_label.y = self.all_list_table[x].deal_count.y + deal_count_height + label_spacing ;
			self.list_view.addChild(game_rounds_label);

			if(window.language.locale == "zh") {
						game_rounds_label.font = "23px latoregular";
			}

			let height_result = game_rounds_label.getMeasuredHeight();

			self.all_list_table[x].round_num.text = data.currentRound;
			self.all_list_table[x].round_num.textAlign = "right";
			self.all_list_table[x].round_num.x = 310;
			self.all_list_table[x].round_num.font = "18px latoregular";
			self.all_list_table[x].round_num.y = game_rounds_label.y + height_result + label_spacing;

			//=== table status
			let round_num_height = self.all_list_table[x].round_num.getMeasuredHeight();
			self.all_list_table[x].status.text = window.language.lobby.nowbetting;
			self.all_list_table[x].status.x = game_rounds_label.x;
			self.all_list_table[x].status.y = self.all_list_table[x].round_num.y + round_num_height + label_spacing + label_spacing;

			// === timer
			self.all_list_table[x].timer.x = -10;
			self.all_list_table[x].timer.y = self.all_list_table[x].y  + 54;

			// === dealer image
			self.all_list_table[x].dealer_img_bg.x = 92
			self.all_list_table[x].dealer_img_bg.y = 156 + self.all_list_table[x].y;

			self.all_list_table[x].dealer_img.x = self.all_list_table[x].dealer_img_bg.x + 190;
			self.all_list_table[x].dealer_img.y = self.all_list_table[x].dealer_img_bg.y + 190;
			self.all_list_table[x].dealer_img.mask = self.all_list_table[x].dealer_img_bg

			// === dealer name
			self.all_list_table[x].dealer_name.text = data.currentDealer;
			self.all_list_table[x].dealer_name.x = 92;
			self.all_list_table[x].dealer_name.y = 232 + self.all_list_table[x].y;
			self.list_view.addChild(self.all_list_table[x].dealer_name);
			//************************************************************************************

			// === result bg

			let card_result_container = new createjs.Container();
			let player_bg = new createjs.Shape();
			player_bg.graphics.beginFill("#1665c1").drawRoundRect(0,0,86,104,8);
			card_result_container.addChild(player_bg);
/*
			let dragon_card_bg_2 = new createjs.Shape();
			dragon_card_bg_2.graphics.beginFill("#0d3e67").drawRoundRect(10,10,66,64,8);
			card_result_container.addChild(dragon_card_bg_2);
*/
			let player_label = this.getText(43,80,window.language.lobby.dragoncaps,"17px lato","#fff","center","top");
			card_result_container.addChild(player_label);

			let gap_left = 96;

			let banker_bg = new createjs.Shape();
			banker_bg.graphics.beginFill("#d32f2e").drawRoundRect(gap_left,0,86,104,8);
			card_result_container.addChild(banker_bg);
/*
			let tiger_card_bg_2 = new createjs.Shape();
			tiger_card_bg_2.graphics.beginFill("#7f1d1e").drawRoundRect(gap_left+10,10,66,64,8);
			card_result_container.addChild(tiger_card_bg_2);
*/
			let banker_label = this.getText(gap_left+43,80,window.language.lobby.tigercaps,"17px lato","#fff","center","top");
			card_result_container.addChild(banker_label);
			card_result_container.y = self.all_list_table[x].y + 158;
			card_result_container.x = 1410;

			self.all_list_table[x].card_result_container = new createjs.Container();
			self.all_list_table[x].card_result_container.y = self.all_list_table[x].y + 158;
			self.all_list_table[x].card_result_container.x = 1410;
			self.list_view.addChild(card_result_container,self.all_list_table[x].card_result_container);

			//************************************************************************************
				let roadmap_ct = new createjs.Container();
				let roadmap_bg = new createjs.Shape();
				roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,986,219);
				roadmap_bg.cache(0,0,986,219);
				roadmap_ct.addChild(roadmap_bg);
				roadmap_ct.set({x:366,y:self.all_list_table[x].y + 10});
				self.list_view.addChild(roadmap_ct);

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

				lines.shadow = new createjs.Shadow("#000",2,2,6);
				lines.alpha =.5;

			//************************************************************************************
			self.all_list_table[x].pearlroad_container = new createjs.Container();
			self.all_list_table[x].pearlroad_container.y = self.all_list_table[x].y + 8.5;
			self.all_list_table[x].pearlroad_container.x = 364;
			self.list_view.addChild(self.all_list_table[x].pearlroad_container);

			self.all_list_table[x].bigroad_container = new createjs.Container();
			self.all_list_table[x].bigroad_container.y = self.all_list_table[x].y + 8.5;
			self.all_list_table[x].bigroad_container.x = 804;
			self.list_view.addChild(self.all_list_table[x].bigroad_container);

			self.all_list_table[x].bigeyeboy_container = new createjs.Container();
			self.all_list_table[x].bigeyeboy_container.y = self.all_list_table[x].y + 119;
			self.all_list_table[x].bigeyeboy_container.x = 805;
			self.list_view.addChild(self.all_list_table[x].bigeyeboy_container);

			self.all_list_table[x].smallroad_container = new createjs.Container();
			self.all_list_table[x].smallroad_container.y = self.all_list_table[x].y +173;
			self.all_list_table[x].smallroad_container.x = 804;
			self.list_view.addChild(self.all_list_table[x].smallroad_container);

			self.all_list_table[x].cockroachroad_container = new createjs.Container();
			self.all_list_table[x].cockroachroad_container.y = self.all_list_table[x].y + 174;
			self.all_list_table[x].cockroachroad_container.x = 1077;
			self.list_view.addChild(self.all_list_table[x].cockroachroad_container);

			// === dragon stats
			let dragon_bar_bg = new createjs.Shape();
			dragon_bar_bg.graphics.ss(2).s("#0d3e67").drawRoundRect(0,0,130,28,8);
			dragon_bar_bg.x = 432;
			dragon_bar_bg.y = 248 + self.all_list_table[x].y;
			self.list_view.addChild(dragon_bar_bg);

			self.all_list_table[x].dragon_bar = new createjs.Shape();
			self.all_list_table[x].dragon_bar.graphics.beginFill("#0d3e67").drawRect(0,0,130,28);
			self.all_list_table[x].dragon_bar.x = 432 + 130;
			self.all_list_table[x].dragon_bar.y = 248 + self.all_list_table[x].y;
			self.all_list_table[x].dragon_bar.mask = dragon_bar_bg;
			self.all_list_table[x].dragon_bar.regX = 130
			self.list_view.addChild(self.all_list_table[x].dragon_bar);

			self.all_list_table[x].dragon_percent = new createjs.Text("100%","28px bebasNeue","#0d3e67");
			self.all_list_table[x].dragon_percent.x = 364;
			self.all_list_table[x].dragon_percent.y = 245 + self.all_list_table[x].y;
			self.list_view.addChild(self.all_list_table[x].dragon_percent);

			let d_bg = null;
			let t_bg = null;
			let tie_bg = null;

			for(var i = 0; i < 5; i++) {
				d_bg = new createjs.Shape();
				d_bg.graphics.beginFill("#0d3e67").drawRoundRect(0,0,47,28,6);
				d_bg.x = (i*53) + 568;
				d_bg.y = 247 + self.all_list_table[x].y
				self.list_view.addChild(d_bg);

				t_bg = new createjs.Shape();
				t_bg.graphics.beginFill("#7f1d1e").drawRoundRect(0,0,47,28,6);
				t_bg.x = (i*53) + 888;
				t_bg.y = 247 + self.all_list_table[x].y
				self.list_view.addChild(t_bg);
			}

			tie_bg = new createjs.Shape();
			tie_bg.graphics.beginFill("#57802f").drawRoundRect(0,0,47,28,6);
			tie_bg.x = 834 ;
			tie_bg.y = 247 + self.all_list_table[x].y
			self.list_view.addChild(tie_bg);

			// === cosmetics
			let dragon_indi = new createjs.Shape();
			dragon_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,8);
			dragon_indi.x = 568 + 12;
			dragon_indi.y = 247 + self.all_list_table[x].y + 14;
			self.list_view.addChild(dragon_indi);

			let d_text = new createjs.Text(window.language.locale == "zh" ? "龙" : "D","12px lato", "#fff");
			d_text.x = dragon_indi.x;
			d_text.y = dragon_indi.y;
			d_text.textAlign = "center";
			d_text.textBaseline = "middle";
			self.list_view.addChild(d_text);

			let d_big_indi = new createjs.Shape();
			d_big_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,8);
			d_big_indi.x = 53 + 568 +14;
			d_big_indi.y = 247 + self.all_list_table[x].y  + 14;
			self.list_view.addChild(d_big_indi);

			let d_big_text = new createjs.Text(window.language.locale == "zh" ? "大" : "B","12px lato", "#fff");
			d_big_text.x = d_big_indi.x;
			d_big_text.y = d_big_indi.y;
			d_big_text.textAlign = "center";
			d_big_text.textBaseline = "middle";
			self.list_view.addChild(d_big_text);

			let d_big_indi2 = new createjs.Shape();
			d_big_indi2.graphics.ss(0.5).s("#fff").beginFill("#1465bf").drawCircle(0,0,3.5);
			d_big_indi2.x = 53 + 568 + 7;
			d_big_indi2.y = 247 + self.all_list_table[x].y + 8;
			self.list_view.addChild(d_big_indi2);

			let s_big_indi = new createjs.Shape();
			s_big_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,8);
			s_big_indi.x = (53*2) + 568 +14;
			s_big_indi.y = 247 + self.all_list_table[x].y  + 14;
			self.list_view.addChild(s_big_indi);

			let s_big_text = new createjs.Text(window.language.locale == "zh" ? "小" : "S","12px lato", "#fff");
			s_big_text.x = s_big_indi.x;
			s_big_text.y = s_big_indi.y;
			s_big_text.textAlign = "center";
			s_big_text.textBaseline = "middle";
			self.list_view.addChild(s_big_text);

			let s_big_indi2 = new createjs.Shape();
			s_big_indi2.graphics.ss(0.5).s("#fff").beginFill("#1465bf").drawCircle(0,0,3.5);
			s_big_indi2.x = (53*2) + 568 + 7;
			s_big_indi2.y = 247 + self.all_list_table[x].y + 19;
			self.list_view.addChild(s_big_indi2);

			let d_odd_indi = new createjs.Shape();
			d_odd_indi.graphics.ss(1).s("#1465bf").beginFill("#fff").drawCircle(0,0,8);
			d_odd_indi.x = (53*3) + 568 +14;
			d_odd_indi.y = 247 + self.all_list_table[x].y  + 14;
			self.list_view.addChild(d_odd_indi);

			let d_odd_text = new createjs.Text(window.language.locale == "zh" ? "单" : "O","12px lato", "#1465bf");
			d_odd_text.x = d_odd_indi.x;
			d_odd_text.y = d_odd_indi.y;
			d_odd_text.textAlign = "center";
			d_odd_text.textBaseline = "middle";
			self.list_view.addChild(d_odd_text);

			let d_even_indi = new createjs.Shape();
			d_even_indi.graphics.ss(1).s("#1465bf").beginFill("#fff").drawCircle(0,0,8);
			d_even_indi.x = (53*4) + 568 +14;
			d_even_indi.y = 247 + self.all_list_table[x].y  + 14;
			self.list_view.addChild(d_even_indi);

			let d_even_text = new createjs.Text(window.language.locale == "zh" ? "双" : "E","12px lato", "#1465bf");
			d_even_text.x = d_even_indi.x;
			d_even_text.y = d_even_indi.y;
			d_even_text.textAlign = "center";
			d_even_text.textBaseline = "middle";
			self.list_view.addChild(d_even_text);

			let tie_indi = new createjs.Shape();
			tie_indi.graphics.ss(1).s("#fff").beginFill("#689f39").drawCircle(0,0,8);
			tie_indi.x = (53*5) + 568 +14;
			tie_indi.y = 247 + self.all_list_table[x].y  + 14;
			self.list_view.addChild(tie_indi);

			let tie_text = new createjs.Text(window.language.locale == "zh" ? '和' : 'T',"12px lato", "#fff");
			tie_text.x = tie_indi.x;
			tie_text.y = tie_indi.y;
			tie_text.textAlign = "center";
			tie_text.textBaseline = "middle";
			self.list_view.addChild(tie_text);

			let t_even_indi = new createjs.Shape();
			t_even_indi.graphics.ss(1).s("#d32f2e").beginFill("#fff").drawCircle(0,0,8);
			t_even_indi.x = (53*6) + 568 +14;
			t_even_indi.y = 247 + self.all_list_table[x].y  + 14;
			self.list_view.addChild(t_even_indi);

			let t_even_text = new createjs.Text(window.language.locale == "zh" ? "双" : "E","12px lato", "#d32f2e");
			t_even_text.x = t_even_indi.x;
			t_even_text.y = t_even_indi.y;
			t_even_text.textAlign = "center";
			t_even_text.textBaseline = "middle";
			self.list_view.addChild(t_even_text);

			let t_odd_indi = new createjs.Shape();
			t_odd_indi.graphics.ss(1).s("#d32f2e").beginFill("#fff").drawCircle(0,0,8);
			t_odd_indi.x = (53*7) + 568 +14;
			t_odd_indi.y = 247 + self.all_list_table[x].y  + 14;
			self.list_view.addChild(t_odd_indi);

			let t_odd_text = new createjs.Text(window.language.locale == "zh" ? "单" : "O","12px lato", "#d32f2e");
			t_odd_text.x = t_odd_indi.x;
			t_odd_text.y = t_odd_indi.y;
			t_odd_text.textAlign = "center";
			t_odd_text.textBaseline = "middle";
			self.list_view.addChild(t_odd_text);

			let t_small_indi = new createjs.Shape();
			t_small_indi.graphics.ss(1).s("#fff").beginFill("#d32f2e").drawCircle(0,0,8);
			t_small_indi.x = (53*8) + 568 + 15;
			t_small_indi.y = 247 + self.all_list_table[x].y  + 14;
			self.list_view.addChild(t_small_indi);

			let t_small_text = new createjs.Text(window.language.locale == "zh" ? "小" : "S","12px lato", "#fff");
			t_small_text.x = t_small_indi.x;
			t_small_text.y = t_small_indi.y;
			t_small_text.textAlign = "center";
			t_small_text.textBaseline = "middle";
			self.list_view.addChild(t_small_text);

			let t_small_indi2 = new createjs.Shape();
			t_small_indi2.graphics.ss(0.5).s("#fff").beginFill("#d32f2e").drawCircle(0,0,3.5);
			t_small_indi2.x = (53*8) + 568 + 8;
			t_small_indi2.y = 247 + self.all_list_table[x].y  + 19;
			self.list_view.addChild(t_small_indi2);

			let t_big_indi = new createjs.Shape();
			t_big_indi.graphics.ss(1).s("#fff").beginFill("#d32f2e").drawCircle(0,0,8);
			t_big_indi.x = (53*9) + 568 + 15;
			t_big_indi.y = 247 + self.all_list_table[x].y  + 14;
			self.list_view.addChild(t_big_indi);

			let t_big_indi2 = new createjs.Shape();
			t_big_indi2.graphics.ss(0.5).s("#fff").beginFill("#d32f2e").drawCircle(0,0,3.5);
			t_big_indi2.x = (53*9) + 568 + 8;
			t_big_indi2.y = 247 + self.all_list_table[x].y  + 8;
			self.list_view.addChild(t_big_indi2);

			let tiger_indi = new createjs.Shape();
			tiger_indi.graphics.ss(1).s("#fff").beginFill("#d32f2e").drawCircle(0,0,8);
			tiger_indi.x = (53*10) + 568 + 14;
			tiger_indi.y = 247 + self.all_list_table[x].y + 14;
			self.list_view.addChild(tiger_indi);

			let t_big_text = new createjs.Text(window.language.locale == "zh" ? "大" : "B","12px lato", "#fff");
			t_big_text.x = t_big_indi.x;
			t_big_text.y = t_big_indi.y;
			t_big_text.textAlign = "center";
			t_big_text.textBaseline = "middle";
			self.list_view.addChild(t_big_text);

			let t_text = new createjs.Text(window.language.locale == "zh" ? "虎" : "T","12px lato", "#fff");
			t_text.x = tiger_indi.x;
			t_text.y = tiger_indi.y;
			t_text.textAlign = "center";
			t_text.textBaseline = "middle";
			self.list_view.addChild(t_text);

			// === end cosmetics

			// === tiger stats
			let tiger_bar_bg = new createjs.Shape();
			tiger_bar_bg.graphics.ss(2).s("#7f1d1e").drawRoundRect(0,0,130,28,8);
			tiger_bar_bg.x = 1154;
			tiger_bar_bg.y = 248  + self.all_list_table[x].y;
			self.list_view.addChild(tiger_bar_bg);

			self.all_list_table[x].tiger_bar = new createjs.Shape();
			self.all_list_table[x].tiger_bar.graphics.beginFill("#7f1d1e").drawRect(0,0,130,28);
			self.all_list_table[x].tiger_bar.x = tiger_bar_bg.x;
			self.all_list_table[x].tiger_bar.y = 248 + self.all_list_table[x].y;
			self.all_list_table[x].tiger_bar.mask = tiger_bar_bg;
			self.list_view.addChild(self.all_list_table[x].tiger_bar);

			self.all_list_table[x].tiger_percent = new createjs.Text("100%","28px bebasNeue","#7f1d1e");
			self.all_list_table[x].tiger_percent.y = 245 + self.all_list_table[x].y;
			self.all_list_table[x].tiger_percent.x = 1348;
			self.all_list_table[x].tiger_percent.textAlign = "right";
			self.list_view.addChild(self.all_list_table[x].tiger_percent);

			let adjustCosmetics = 0;
			self.all_list_table[x].tie_count = new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].tie_count.textAlign = "right";
			self.all_list_table[x].tie_count.x = tie_bg.x + 43 + adjustCosmetics;
			self.all_list_table[x].tie_count.y = tie_bg.y;
			self.list_view.addChild(self.all_list_table[x].tie_count);


			self.all_list_table[x].dragon_count = new createjs.Text("123","24px bebasNeue","#fff");
			self.all_list_table[x].dragon_count.textAlign = "right";
			self.all_list_table[x].dragon_count.x = 38 + 572 + .7 + adjustCosmetics;
			self.all_list_table[x].dragon_count.y = tie_bg.y;
			self.list_view.addChild(self.all_list_table[x].dragon_count);

			self.all_list_table[x].dragon_big_count= new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].dragon_big_count.textAlign = "right";
			self.all_list_table[x].dragon_big_count.x = self.all_list_table[x].dragon_count.x + 53 +.7;
			self.all_list_table[x].dragon_big_count.y = tie_bg.y;
			self.list_view.addChild(self.all_list_table[x].dragon_big_count);

			self.all_list_table[x].dragon_small_count= new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].dragon_small_count.textAlign = "right";
			self.all_list_table[x].dragon_small_count.x = self.all_list_table[x].dragon_count.x + 105 +.7;
			self.all_list_table[x].dragon_small_count.y = tie_bg.y;
			self.list_view.addChild(self.all_list_table[x].dragon_small_count);

			self.all_list_table[x].dragon_odd_count= new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].dragon_odd_count.textAlign = "right";
			self.all_list_table[x].dragon_odd_count.x = self.all_list_table[x].dragon_count.x + 158 + .7;
			self.all_list_table[x].dragon_odd_count.y = tie_bg.y;
			self.list_view.addChild(self.all_list_table[x].dragon_odd_count);

			self.all_list_table[x].dragon_even_count= new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].dragon_even_count.textAlign = "right";
			self.all_list_table[x].dragon_even_count.x = self.all_list_table[x].dragon_count.x + 211 + .7;
			self.all_list_table[x].dragon_even_count.y = tie_bg.y;
			self.list_view.addChild(self.all_list_table[x].dragon_even_count);

			self.all_list_table[x].tiger_count = new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].tiger_count.textAlign = "right";
			self.all_list_table[x].tiger_count.x = 255 + 887 + adjustCosmetics;
			self.all_list_table[x].tiger_count.y = tie_bg.y;
			self.list_view.addChild(self.all_list_table[x].tiger_count);

			self.all_list_table[x].tiger_big_count = new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].tiger_big_count.textAlign = "right";
			self.all_list_table[x].tiger_big_count.x = self.all_list_table[x].tiger_count.x - 49 - 3;
			self.all_list_table[x].tiger_big_count.y = tie_bg.y;
			self.list_view.addChild(self.all_list_table[x].tiger_big_count);

			self.all_list_table[x].tiger_small_count = new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].tiger_small_count.textAlign = "right";
			self.all_list_table[x].tiger_small_count.x = self.all_list_table[x].tiger_count.x - 107 + 2;
			self.all_list_table[x].tiger_small_count.y = tie_bg.y;
			self.list_view.addChild(self.all_list_table[x].tiger_small_count);

			self.all_list_table[x].tiger_odd_count = new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].tiger_odd_count.textAlign = "right";
			self.all_list_table[x].tiger_odd_count.x = self.all_list_table[x].tiger_count.x - 158 + 2 -3;
			self.all_list_table[x].tiger_odd_count.y = tie_bg.y;
			self.list_view.addChild(self.all_list_table[x].tiger_odd_count);

			self.all_list_table[x].tiger_even_count = new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].tiger_even_count.textAlign = "right";
			self.all_list_table[x].tiger_even_count.x = self.all_list_table[x].tiger_count.x - 208 - 3;
			self.all_list_table[x].tiger_even_count.y = tie_bg.y;
			self.list_view.addChild(self.all_list_table[x].tiger_even_count);

			this.setPercentages(data.marks)

			self.list_view.addChild(self.all_list_table[x].bet_range_container)


			// ===	card result
/*
			self.all_list_table[x].card_result_container = new createjs.Container();
			self.all_list_table[x].card_result_container.y = self.all_list_table[x].y + 160;
			self.all_list_table[x].card_result_container.x = 100;

			self.list_view.addChild(self.all_list_table[x].card_result_container);
*/
			self.list_view.addChild(self.all_list_table[x].maintenance_container);

			this.drawGameInfo(data)

			// === maintenance
			self.all_list_table[x].maintenanceCon = new createjs.Container();
			self.all_list_table[x].maintenanceCon.visible = false;
			self.list_view.addChild(self.all_list_table[x].maintenanceCon);

			self.all_list_table[x].maintenanceCon.on("click", (e) => {
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

			self.all_list_table[x].maintenanceBg = new createjs.Shape();
			self.all_list_table[x].maintenanceBg.graphics.beginFill("#333333").drawRoundRect(0, 0, 1640, 283, 6);
			self.all_list_table[x].maintenanceBg.x = self.all_list_table[x].x;
			self.all_list_table[x].maintenanceBg.y = self.all_list_table[x].y + 1;
			self.all_list_table[x].maintenanceBg.table_id = data.tableNumber;
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceBg);

			self.all_list_table[x].maintenanceHeader = new createjs.Shape();
			self.all_list_table[x].maintenanceHeader.x = self.all_list_table[x].x;
			self.all_list_table[x].maintenanceHeader.y = self.all_list_table[x].y - 1;
			self.all_list_table[x].maintenanceHeader.graphics.beginLinearGradientFill(["#8e24aa", "#4d168e"],[0,1],0,0,1640,10).drawRoundRectComplex(0,0,1640,50,10,10,0,0);
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceHeader);

			self.all_list_table[x].table_name = new createjs.Text(window.language.lobby.dragontiger,"22px ArvoItalic","#fdba44");
			self.all_list_table[x].table_name.x = 105; //175;
			self.all_list_table[x].table_name.y = 13 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].table_name);

			self.all_list_table[x].table_num = new createjs.Text(data.tableNumber.length < 2 ? "0"+data.tableNumber : data.tableNumber,"24px ArvoBold","#fdba44");
			self.all_list_table[x].table_num.x = 70; //self.all_list_table[x].table_name.x - (self.all_list_table[x].table_name.getBounds().width / 2) - 10;
			self.all_list_table[x].table_num.y = 11 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].table_num);

			self.all_list_table[x].maintenanceLogo = new createjs.Bitmap(self.context.getResources("maintenance_ico"));
			self.all_list_table[x].maintenanceLogo.x = 30;
			self.all_list_table[x].maintenanceLogo.y = 90 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceLogo.scaleX = self.all_list_table[x].maintenanceLogo.scaleY = 0.9;
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceLogo);

			self.all_list_table[x].maintenanceTxt = new createjs.Text('', '30px bebasneue', '#ffb547');
			self.all_list_table[x].maintenanceTxt.x = 185;
			self.all_list_table[x].maintenanceTxt.y = 110 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceTxt.textAlign = 'left';
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceTxt);

			self.all_list_table[x].maintenanceSubTxt = new createjs.Text('', '28px bebasneue', '#fff');
			self.all_list_table[x].maintenanceSubTxt.x = 185;
			self.all_list_table[x].maintenanceSubTxt.y = 150 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceSubTxt.textAlign = 'left';
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceSubTxt);

			self.all_list_table[x].maintenanceTime = new createjs.Text('', '26px bebasneue', '#fff');
			self.all_list_table[x].maintenanceTime.x = 185;
			self.all_list_table[x].maintenanceTime.y = 185 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceTime.textAlign = 'left';
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceTime);

			this.checkMaintenance(data, false, x);
		}, //end createtable function
		checkMaintenance(maintenanceData, socket, x) {
		   if(!self.all_list_table[x] || !self.all_list_table[x].maintenanceCon) return;
		   
		   	if(window.userAuthority == 'admin') return;

		   	let maintenance = '';
		   	let activeMaintenance = [];
	      	let mainText = '';
	      	let subText = '';

		   	if (!socket) {
		        let maintenanceSetting = maintenanceData.maintenanceSetting;

		        for (var i = 0; i < maintenanceSetting.length; i++) {
			        if (maintenanceSetting[i].status == 1) {
			            maintenance = true;
			            activeMaintenance = maintenanceSetting[i];
			        }
		        }
		    }
		    else {
		        activeMaintenance = data.data;

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

		   	if (maintenance === true) {
				self.all_list_table[x].maintenanceCon.visible = true;
				self.all_list_table[x].maintenanceTxt.text = mainText;
				self.all_list_table[x].maintenanceSubTxt.text = subText;
				self.all_list_table[x].maintenanceTime.text = newStartTime +' ~ '+ newEndTime;
			}
			else if (maintenance === false) {
				self.all_list_table[x].maintenanceCon.visible = false;
			}
		  },
		inputRes (card_data) {

			if(!self.all_list_table[x] || !self.all_list_table[x].card_result_container) return;

            if(card_data.gameInfo.burn && !card_data.gameInfo.tiger && !card_data.gameInfo.dragon) return;

            let card = null;

            if(card_data.gameInfo.tiger) {
            	card = createCardSprite(self,40,60,"/img/cards/small_sprite_cards_60.png");
                card.gotoAndStop("back_red");
                card.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, 2, 5);
                card.x = 119;
                card.type = "tiger"
                card.y = 12;
            	self.all_list_table[x].card_result_container.addChild(card);
            }
            if(card_data.gameInfo.dragon) {
            	card = createCardSprite(self,40,60,"/img/cards/small_sprite_cards_60.png");
                card.y = 12;
                card.x = 23;
                card.gotoAndStop("back_blue");
                card.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, 2, 5);
                card.type = "dragon"
            	self.all_list_table[x].card_result_container.addChild(card);
            }

            self.all_list_table[x].status.text = window.language.lobby.dealing;

            if(self.all_thumbnial_table[x])  {
				self.all_thumbnial_table[x].status.text = window.language.lobby.dealing;
			}
        },
        drawGameInfo (data) {
        	if(!data.gameInfo.burn && (!data.gameInfo.tiger || !data.gameInfo.dragon))  {
        		return;
        	}

        	let card_data = data

			if(!self.all_list_table[x] || !self.all_list_table[x].card_result_container) return;

            let card;

            if(card_data.gameInfo.tiger) {
            	card = createCardSprite(self,40,60,"/img/cards/small_sprite_cards_60.png");
                card.x = 119;
                card.y = 12;
                card.type = "tiger"
            	if(data.roundStatus == "E") {
                	card.gotoAndStop("C"+card_data.gameInfo.tiger);
            	} else {
                	card.gotoAndStop("back_red");
            	}
            	card.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, 2, 5);
            	self.all_list_table[x].card_result_container.addChild(card);
            }
            if(card_data.gameInfo.dragon) {
            	card = createCardSprite(self,40,60,"/img/cards/small_sprite_cards_60.png");
                card.x = 23;
                card.type = "dragon"
                card.y = 12;
            	if(data.roundStatus == "E") {
                	card.gotoAndStop("C"+card_data.gameInfo.dragon);
            	} else {
                	card.gotoAndStop("back_blue");
            	}
            	card.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, 2, 5);
            	self.all_list_table[x].card_result_container.addChild(card);
            }


            self.all_list_table[x].status.text = window.language.lobby.dealing;
        },
        setResult (card_data) {

			if(!self.all_list_table[x] || !self.all_list_table[x].card_result_container) return;


			self.all_list_table[x].status.text  = window.language.lobby.result;
			self.all_list_table[x].deal_count.text = card_data.marks.length

            self.all_list_table[x].card_result_container.children.forEach( (card) => {
                if(card.type == "tiger") {
                    card.gotoAndStop("C"+card_data.gameInfo.tiger);
                }
                else if(card.type == "dragon")  {
                    card.gotoAndStop("C"+card_data.gameInfo.dragon);
                }
            })
        },
        setPercentages (data) {
        	if(!self.all_list_table[x]) return;

        	data =  _.filter(data, function (e) {
				if(e.mark) return e;
			});

            let count = data.length;

            let grouped = _.groupBy(data, function (e) {
				return e.mark;
			});


			let rmcount = {
				total  : data.length,
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

			if(!self.all_list_table[x].dragon_bar) return;
			self.all_list_table[x].dragon_bar.scaleX = rmcount.dragon / rmcount.total;

			if(!self.all_list_table[x].dragon_percent) return;
			self.all_list_table[x].dragon_percent.text = Math.round((rmcount.dragon / rmcount.total) * 100) + "%";
			if(!rmcount.total) self.all_list_table[x].dragon_percent.text = '0%';

			if(!self.all_list_table[x].tiger_bar) return;
			self.all_list_table[x].tiger_bar.scaleX = rmcount.tiger / rmcount.total;

			if(!self.all_list_table[x].tiger_percent) return;
			self.all_list_table[x].tiger_percent.text = Math.round((rmcount.tiger / rmcount.total) * 100) + "%";
			if(!rmcount.total) self.all_list_table[x].tiger_percent.text = '0%';

			self.all_list_table[x].tie_count.text = rmcount.tie;
			self.all_list_table[x].dragon_count.text = rmcount.dragon;
			self.all_list_table[x].dragon_small_count.text = rmcount.dragon_small;
			self.all_list_table[x].dragon_big_count.text = rmcount.dragon_big;
			self.all_list_table[x].dragon_odd_count.text = rmcount.dragon_odd;
			self.all_list_table[x].dragon_even_count.text = rmcount.dragon_even;
			self.all_list_table[x].tiger_count.text = rmcount.tiger;
			self.all_list_table[x].tiger_small_count.text = rmcount.tiger_small;
			self.all_list_table[x].tiger_big_count.text = rmcount.tiger_big;
			self.all_list_table[x].tiger_odd_count.text = rmcount.tiger_odd;
			self.all_list_table[x].tiger_even_count.text = rmcount.tiger_even;
        },
        drawPearlRoad (data, type) {
        	if(!self.all_list_table[x] || !self.all_list_table[x].pearlroad_container) return;

			self.all_list_table[x].pearlroad_container.removeAllChildren();

        	for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					let sp = createSpriteRoadMap(window.language.locale == "zh" ? "/img/all_scoreboard_zh.png" : "/img/all_scoreboard.png" , 40,40, sp);
					sp.x = (e * 36.6) + 2;
					sp.y = i * 36.6;
					sp.gotoAndStop("pearl-dt-"+data.matrix[i][e].mark);
					self.all_list_table[x].pearlroad_container.addChild(sp);
				} //end for
			} //end for

			this.moveRoadMap(type, data.matrix, "pearlroad", 6, 12);

        },
        drawBigRoad (data, type) {
			let width = 20;
        	if(type == "thumbnail") {
        		if(!self.all_thumbnial_table[x] || !self.all_thumbnial_table[x].bigroad_container) return;
        		width = 17;
        	} else {
        		if(!self.all_list_table[x] || !self.all_list_table[x].bigroad_container) return;
        	}

        	if(type == "thumbnail" && !self.all_thumbnial_table[x].bigroad_container) {
        		self.all_thumbnial_table[x].bigroad_container = new createjs.Container();
        		self.all_thumbnial_table[x].bigroad_container.x = self.all_thumbnial_table[x].x - 1;
        		self.all_thumbnial_table[x].bigroad_container.y = self.all_thumbnial_table[x].y + 120;
        		self.thumbnail_view.addChild(self.all_thumbnial_table[x].bigroad_container);

        	} else if(type == "thumbnail" && self.all_thumbnial_table[x].bigroad_container) {
        		self.all_thumbnial_table[x].bigroad_container.removeAllChildren();
        	}
        	else {
        		self.all_list_table[x].bigroad_container.removeAllChildren();
        	}

			let sp = null;
			let font_size = "16px";
        	for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					sp = drawSboard("bigroad")[data.matrix[i][e].mark];
					if(type == "thumbnail") {
						sp.x = e * 15.9;
						sp.y = i * 15.2;
						sp.scaleX = sp.scaleY = 0.57;
						font_size = "12px";
					} else {
						sp.x = e * 18.15;
						sp.y = i * 18;
						sp.scaleX = sp.scaleY = 0.7;
					}

					if(type == "thumbnail") {
						self.all_thumbnial_table[x].bigroad_container.addChild(sp);
					} else {
						self.all_list_table[x].bigroad_container.addChild(sp);
					}

					if(data.matrix[i][e].ties) {
						sp.children[sp.children.length-1].visible = true;

						if(data.matrix[i][e].ties > 1) {
							let tie_text = new createjs.Text(data.matrix[i][e].ties, "bold "+font_size+" bebasNeue","#000");
							tie_text.y = sp.y + (width/2) +2;
							tie_text.x = sp.x  + width/2;
							tie_text.textAlign = "center";
							tie_text.textBaseline = "middle";
							if(type == "thumbnail") {
								self.all_thumbnial_table[x].bigroad_container.addChild(tie_text);
							} else {
								self.all_list_table[x].bigroad_container.addChild(tie_text);
							}
						}
						if(data.matrix[i][e].suited_tie) {
							sp.children[sp.children.length-1].graphics.clear().beginFill("#ff9800").drawRect(0,0,3,30);
						}
					}

				} //end for
			} //end for

			this.moveRoadMap(type, data.matrix, "bigroad", 6, 12);
        },
		drawBigEyeBoy (data) {

			if(!self.all_list_table[x] || !self.all_list_table[x].bigeyeboy_container) return;

			self.all_list_table[x].bigeyeboy_container.removeAllChildren();

	        let sp = null;
        	for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					sp = drawSboard("bigeyeboy")[data.matrix[i][e].mark];
					sp.x = e * 9.15;
					sp.y = i * 9.0;
					sp.scaleX = sp.scaleY = 0.34;
					self.all_list_table[x].bigeyeboy_container.addChild(sp);
				} //end for
			} //end for

			// this.drawSmallRoad(data);
			// this.drawCockroachRoad(data);
		},
		drawCockroachRoad(data) {
			if(!self.all_list_table[x] || !self.all_list_table[x].cockroachroad_container) return;

			self.all_list_table[x].cockroachroad_container.removeAllChildren();

			let sp = null;
			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					sp = drawSboard("cockroach")[data.matrix[i][e].mark];
					sp.x = e * 9.1;
					sp.y = i * 9.0;
					sp.scaleX = sp.scaleY = 0.42;
					self.all_list_table[x].cockroachroad_container.addChild(sp);
				} //end for
			} //end for
		},
		drawSmallRoad (data) {

			if(!self.all_list_table[x] || !self.all_list_table[x].smallroad_container ) return;

			self.all_list_table[x].smallroad_container.removeAllChildren();

	        let sp = null;
			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					sp = drawSboard("smallroad")[data.matrix[i][e].mark];
					sp.x = e * 9.1;
					sp.y = i * 9.0;
					sp.scaleX = sp.scaleY = 0.42;
					self.all_list_table[x].smallroad_container.addChild(sp);
				} //end for
			} //end for
		},
		moveRoadMap(type, arr,sel, row, col ) {
			return;
			let p_count = 0;

			let lala = false;

			let defined_count = 0;
			for(var i = 0; i < arr[0].length; i++) {
				if(arr[0][i] !== undefined) defined_count++;
			}

			if(defined_count > col-1) {
				p_count = defined_count-(col);
			}

			if(type == "list") {
				if(sel == "pearlroad") {
					self.all_list_table[x][sel+"_container"].x = 363 + ((p_count*36.4)* (-1)) ;
				} else if(sel == "bigroad") {
					self.all_list_table[x][sel+"_container"].x =  363 + 439 + ((p_count*17.9)* (-1)) ;
				}
			} else {
				if(sel == "bigroad") {
					self.all_thumbnial_table[x][sel+"_container"].x = (self.all_thumbnial_table[x].x) + ((p_count*16)* (-1)) ;
				}
			}
		}
	}
	return instance;
}
