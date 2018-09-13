import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../../factories/factories';
import rmformat from '../../../factories/formatter';
import sboard from '../../../factories/scoreboard_draw';

let formatData = rmformat();

let instance = null;
let drawSboard  = sboard();

export default(self,data,x) => {
	instance = {
		createTable () {

			let label_spacing = 8;

			if(window.language.locale == "jp") {
				let deal_label = new createjs.Text(window.language.lobby.deal,"18px lato","#fff");
				deal_label.x = 200;
				deal_label.y = 68 + self.all_list_table[x].y;
				dragontiger_c[x].addChild(deal_label);

				let game_label_height = deal_label.getMeasuredHeight();
				self.all_list_table[x].deal_count = new createjs.Text(data.marks.length, "18px latobold","#fff");
				self.all_list_table[x].deal_count.textAlign = "right";
				self.all_list_table[x].deal_count.x = 330;
				self.all_list_table[x].deal_count.y = deal_label.y + game_label_height + label_spacing;
				dragontiger_c[x].addChild(self.all_list_table[x].deal_count);
			}

			if(window.language.locale == "kr") {
				let deal_label = new createjs.Text(window.language.lobby.deal,"18px lato","#fff");
				deal_label.x = 200;
				deal_label.y = 68 + self.all_list_table[x].y;
				dragontiger_c[x].addChild(deal_label);

				let game_label_height = deal_label.getMeasuredHeight();
				self.all_list_table[x].deal_count = new createjs.Text(data.marks.length, "18px latobold","#fff");
				self.all_list_table[x].deal_count.textAlign = "right";
				self.all_list_table[x].deal_count.x = 330;
				self.all_list_table[x].deal_count.y = deal_label.y + game_label_height + label_spacing;
				dragontiger_c[x].addChild(self.all_list_table[x].deal_count);
			}

			if(window.language.locale == "zh") {
				let deal_label = new createjs.Text(window.language.lobby.deal,"18px lato","#fff");
				deal_label.x = 200;
				deal_label.y = 68 + self.all_list_table[x].y;
				dragontiger_c[x].addChild(deal_label);

				let game_label_height = deal_label.getMeasuredHeight();
				self.all_list_table[x].deal_count = new createjs.Text(data.marks.length, "18px latobold","#fff");
				self.all_list_table[x].deal_count.textAlign = "right";
				self.all_list_table[x].deal_count.x = 330;
				self.all_list_table[x].deal_count.y = deal_label.y + game_label_height + label_spacing;
				dragontiger_c[x].addChild(self.all_list_table[x].deal_count);
			}

			if(window.language.locale == "en") {
				let deal_label = new createjs.Text(window.language.lobby.deal,"18px lato","#fff");
				deal_label.x = 200;
				deal_label.y = 68 + self.all_list_table[x].y;
				dragontiger_c[x].addChild(deal_label);

				let game_label_height = deal_label.getMeasuredHeight();
				self.all_list_table[x].deal_count = new createjs.Text(data.marks.length, "18px latobold","#fff");
				self.all_list_table[x].deal_count.textAlign = "right";
				self.all_list_table[x].deal_count.x = 330;
				self.all_list_table[x].deal_count.y = deal_label.y + game_label_height + label_spacing;
				dragontiger_c[x].addChild(self.all_list_table[x].deal_count);
			}
			// === deal coun

			// === timer
			self.all_list_table[x].timer.x =  -5;
			self.all_list_table[x].timer.y = self.all_list_table[x].y  + 24.8;

			// === dealer image
			self.all_list_table[x].dealer_img_bg.x = 92
			self.all_list_table[x].dealer_img_bg.y = 122 + self.all_list_table[x].y;

			// === set dealer_image

			self.all_list_table[x].dealer_img.x = self.all_list_table[x].dealer_img_bg.x + 180;
			self.all_list_table[x].dealer_img.y = self.all_list_table[x].dealer_img_bg.y + 180;

			// === dealer name
			self.all_list_table[x].dealer_name.x = 92;
			self.all_list_table[x].dealer_name.y = 190 + self.all_list_table[x].y;
			self.all_list_table[x].dealer_name.textAlign = "center";

			if(window.language.locale == "jp") {
				// === game rounds
				let deal_count_height = self.all_list_table[x].deal_count.getMeasuredHeight();
				let game_rounds_label = new createjs.Text(window.language.lobby.game,"18px lato","#fff");
				game_rounds_label.x = 200;
				game_rounds_label.y = self.all_list_table[x].deal_count.y + deal_count_height + label_spacing ;
				dragontiger_c[x].addChild(game_rounds_label);

				let height_result = game_rounds_label.getMeasuredHeight();
				self.all_list_table[x].round_num.text = data.currentRound;
				self.all_list_table[x].round_num.textAlign = "right";
				self.all_list_table[x].round_num.x = 330;
				self.all_list_table[x].round_num.y = game_rounds_label.y + height_result + label_spacing;

				//=== table status
				let round_num_height = self.all_list_table[x].round_num.getMeasuredHeight();
				self.all_list_table[x].status.text = window.language.lobby.newround;
				self.all_list_table[x].status.x = game_rounds_label.x;
				self.all_list_table[x].status.y = self.all_list_table[x].round_num.y + round_num_height + label_spacing;
			}

			if(window.language.locale == "kr") {
				// === game rounds
				let deal_count_height = self.all_list_table[x].deal_count.getMeasuredHeight();
				let game_rounds_label = new createjs.Text(window.language.lobby.game,"18px lato","#fff");
				game_rounds_label.x = 200;
				game_rounds_label.y = self.all_list_table[x].deal_count.y + deal_count_height + label_spacing ;
				dragontiger_c[x].addChild(game_rounds_label);

				let height_result = game_rounds_label.getMeasuredHeight();
				self.all_list_table[x].round_num.text = data.currentRound;
				self.all_list_table[x].round_num.textAlign = "right";
				self.all_list_table[x].round_num.x = 330;
				self.all_list_table[x].round_num.y = game_rounds_label.y + height_result + label_spacing;

				//=== table status
				let round_num_height = self.all_list_table[x].round_num.getMeasuredHeight();
				self.all_list_table[x].status.text = window.language.lobby.newround;
				self.all_list_table[x].status.x = game_rounds_label.x;
				self.all_list_table[x].status.y = self.all_list_table[x].round_num.y + round_num_height + label_spacing;
			}

			if(window.language.locale == "zh") {
				// === game rounds
				let deal_count_height = self.all_list_table[x].deal_count.getMeasuredHeight();
				let game_rounds_label = new createjs.Text(window.language.lobby.game,"23px lato","#fff");
				game_rounds_label.x = 200;
				game_rounds_label.y = self.all_list_table[x].deal_count.y + deal_count_height + label_spacing ;
				dragontiger_c[x].addChild(game_rounds_label);

				let height_result = game_rounds_label.getMeasuredHeight();
				self.all_list_table[x].round_num.text = data.currentRound;
				self.all_list_table[x].round_num.textAlign = "right";
				self.all_list_table[x].round_num.x = 330;
				self.all_list_table[x].round_num.y = game_rounds_label.y + height_result + label_spacing;

				//=== table status
				let round_num_height = self.all_list_table[x].round_num.getMeasuredHeight();
				self.all_list_table[x].status.text = window.language.lobby.newround;
				self.all_list_table[x].status.x = game_rounds_label.x;
				self.all_list_table[x].status.y = self.all_list_table[x].round_num.y + round_num_height + label_spacing;
			}

			if(window.language.locale == "en") {
				// === game rounds
				let deal_count_height = self.all_list_table[x].deal_count.getMeasuredHeight();
				let game_rounds_label = new createjs.Text(window.language.lobby.game,"18px lato","#fff");
				game_rounds_label.x = 200;
				game_rounds_label.y = self.all_list_table[x].deal_count.y + deal_count_height + label_spacing ;
				dragontiger_c[x].addChild(game_rounds_label);

				let height_result = game_rounds_label.getMeasuredHeight();
				self.all_list_table[x].round_num.text = data.currentRound;
				self.all_list_table[x].round_num.textAlign = "right";
				self.all_list_table[x].round_num.x = 330;
				self.all_list_table[x].round_num.y = game_rounds_label.y + height_result + label_spacing;

				//=== table status
				let round_num_height = self.all_list_table[x].round_num.getMeasuredHeight();
				self.all_list_table[x].status.text = window.language.lobby.newround;
				self.all_list_table[x].status.x = game_rounds_label.x;
				self.all_list_table[x].status.y = self.all_list_table[x].round_num.y + round_num_height + label_spacing;
			}
			//card result

			let roadmap_bg = new createjs.Shape();
			roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,895,228);
			roadmap_bg.y = self.all_list_table[x].y;
			roadmap_bg.x = 350
			dragontiger_c[x].addChild(roadmap_bg);

			let lines = new createjs.Shape();
			lines.graphics.ss(.8).s("rgba(0,0,0,0.8)").moveTo(0,38)
			dragontiger_c[x].addChild(lines);

            let borders = new createjs.Shape();
            borders.graphics.ss(1).s("#000").moveTo(roadmap_bg.x+456, roadmap_bg.y+114).lineTo(roadmap_bg.x+456+440, roadmap_bg.y+114);
            borders.graphics.moveTo(roadmap_bg.x+456, roadmap_bg.y+114+(114/2)).lineTo(roadmap_bg.x+456+440, roadmap_bg.y+114+(114/2));
            borders.graphics.moveTo(805.5+(440/2)-8, roadmap_bg.y+114+(114/2)).lineTo(805.5+(440/2)-8, roadmap_bg.y+114+(114/2)+(114/2));

            dragontiger_c[x].addChild(borders)

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

            lines.shadow = new createjs.Shadow("#000",2,2,6);
            lines.alpha = .5;
            borders.shadow = new createjs.Shadow("#000",2,2,5);

			self.all_list_table[x].pearlroad_container = new createjs.Container();
			self.all_list_table[x].pearlroad_container.y = self.all_list_table[x].y;
			self.all_list_table[x].pearlroad_container.x = 349.1
			dragontiger_c[x].addChild(self.all_list_table[x].pearlroad_container);

			self.all_list_table[x].bigroad_container = new createjs.Container();
			self.all_list_table[x].bigroad_container.y = self.all_list_table[x].y ;
			self.all_list_table[x].bigroad_container.x = 358 + 448
			dragontiger_c[x].addChild(self.all_list_table[x].bigroad_container);

			self.all_list_table[x].bigeyeboy_container = new createjs.Container();
			self.all_list_table[x].bigeyeboy_container.y = self.all_list_table[x].y + 5 + 110;
			self.all_list_table[x].bigeyeboy_container.x = 363 + 441;
			dragontiger_c[x].addChild(self.all_list_table[x].bigeyeboy_container);

			self.all_list_table[x].smallroad_container = new createjs.Container();
			self.all_list_table[x].smallroad_container.y = self.all_list_table[x].y + 5 + 164;
			self.all_list_table[x].smallroad_container.x = 363 + 441;
			dragontiger_c[x].addChild(self.all_list_table[x].smallroad_container);

			self.all_list_table[x].cockroachroad_container = new createjs.Container();
			self.all_list_table[x].cockroachroad_container.y = self.all_list_table[x].y + 5 + 164;
			self.all_list_table[x].cockroachroad_container.x = self.all_list_table[x].smallroad_container.x + 212;
			dragontiger_c[x].addChild(self.all_list_table[x].cockroachroad_container);

			// === dragon stats
			let dragon_bar_bg = new createjs.Shape();
			dragon_bar_bg.graphics.ss(1).s("#0d3e67").drawRoundRect(0,0,90,28,8);
			dragon_bar_bg.x = 418;
			dragon_bar_bg.y = 248 + self.all_list_table[x].y;
			dragontiger_c[x].addChild(dragon_bar_bg);

			self.all_list_table[x].dragon_bar = new createjs.Shape();
			self.all_list_table[x].dragon_bar.graphics.beginFill("#0d3e67").drawRect(0,0,90,28);
			self.all_list_table[x].dragon_bar.x = 422 + 90;
			self.all_list_table[x].dragon_bar.y = 248 + self.all_list_table[x].y;
			self.all_list_table[x].dragon_bar.mask = dragon_bar_bg;
			self.all_list_table[x].dragon_bar.regX = 90
			dragontiger_c[x].addChild(self.all_list_table[x].dragon_bar);

			self.all_list_table[x].dragon_percent = new createjs.Text("100%","28px bebasNeue","#0d3e67");
			self.all_list_table[x].dragon_percent.x = 364;
			self.all_list_table[x].dragon_percent.y = 245 + self.all_list_table[x].y;
			dragontiger_c[x].addChild(self.all_list_table[x].dragon_percent);

			let d_bg = null;
			let t_bg = null;
			let tie_bg = null;

			for(var i = 0; i < 5; i++) {
				d_bg = new createjs.Shape();
				d_bg.graphics.beginFill("#0d3e67").drawRoundRect(0,0,47,28,6);
				d_bg.x = (i*53) + 514;
				d_bg.y = 247 + self.all_list_table[x].y
				dragontiger_c[x].addChild(d_bg);

				t_bg = new createjs.Shape();
				t_bg.graphics.beginFill("#7f1d1e").drawRoundRect(0,0,47,28,6);
				t_bg.x = (i*53) + 832;
				t_bg.y = 247 + self.all_list_table[x].y
				dragontiger_c[x].addChild(t_bg);
			}

			tie_bg = new createjs.Shape();
			tie_bg.graphics.beginFill("#57802f").drawRoundRect(0,0,47,28,6);
			tie_bg.x = 780 ;
			tie_bg.y = 247 + self.all_list_table[x].y
			dragontiger_c[x].addChild(tie_bg);

			// === cosmetics
			let dragon_indi = new createjs.Shape();
			dragon_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,8);
			dragon_indi.x = 514 + 12;
			dragon_indi.y = 247 + self.all_list_table[x].y + 14;
			dragontiger_c[x].addChild(dragon_indi);

			let d_text = new createjs.Text(window.language.locale == "zh" ? "龙" : "D","12px lato", "#fff");
			d_text.x = dragon_indi.x;
			d_text.y = dragon_indi.y;
			d_text.textAlign = "center";
			d_text.textBaseline = "middle";
			dragontiger_c[x].addChild(d_text);

			let d_big_indi = new createjs.Shape();
			d_big_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,8);
			d_big_indi.x = 53 + 514 +14;
			d_big_indi.y = 247 + self.all_list_table[x].y  + 14;
			dragontiger_c[x].addChild(d_big_indi);

			let d_big_text = new createjs.Text(window.language.locale == "zh" ? "大" : "B","12px lato", "#fff");
			d_big_text.x = d_big_indi.x;
			d_big_text.y = d_big_indi.y;
			d_big_text.textAlign = "center";
			d_big_text.textBaseline = "middle";
			dragontiger_c[x].addChild(d_big_text);

			let d_big_indi2 = new createjs.Shape();
			d_big_indi2.graphics.ss(0.5).s("#fff").beginFill("#1465bf").drawCircle(0,0,3.5);
			d_big_indi2.x = 53 + 514 + 7;
			d_big_indi2.y = 247 + self.all_list_table[x].y + 8;
			dragontiger_c[x].addChild(d_big_indi2);

			let s_big_indi = new createjs.Shape();
			s_big_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,8);
			s_big_indi.x = (53*2) + 514 +14;
			s_big_indi.y = 247 + self.all_list_table[x].y  + 14;
			dragontiger_c[x].addChild(s_big_indi);

			let s_big_text = new createjs.Text(window.language.locale == "zh" ? "小" : "S","12px lato", "#fff");
			s_big_text.x = s_big_indi.x;
			s_big_text.y = s_big_indi.y;
			s_big_text.textAlign = "center";
			s_big_text.textBaseline = "middle";
			dragontiger_c[x].addChild(s_big_text);

			let s_big_indi2 = new createjs.Shape();
			s_big_indi2.graphics.ss(0.5).s("#fff").beginFill("#1465bf").drawCircle(0,0,3.5);
			s_big_indi2.x = (53*2) + 514 + 7;
			s_big_indi2.y = 247 + self.all_list_table[x].y + 19;
			dragontiger_c[x].addChild(s_big_indi2);

			let d_odd_indi = new createjs.Shape();
			d_odd_indi.graphics.ss(1).s("#1465bf").beginFill("#fff").drawCircle(0,0,8);
			d_odd_indi.x = (53*3) + 514 +14;
			d_odd_indi.y = 247 + self.all_list_table[x].y  + 14;
			dragontiger_c[x].addChild(d_odd_indi);

			let d_odd_text = new createjs.Text(window.language.locale == "zh" ? "单" : "O","12px lato", "#1465bf");
			d_odd_text.x = d_odd_indi.x;
			d_odd_text.y = d_odd_indi.y;
			d_odd_text.textAlign = "center";
			d_odd_text.textBaseline = "middle";
			dragontiger_c[x].addChild(d_odd_text);

			let d_even_indi = new createjs.Shape();
			d_even_indi.graphics.ss(1).s("#1465bf").beginFill("#fff").drawCircle(0,0,8);
			d_even_indi.x = (53*4) + 514 +14;
			d_even_indi.y = 247 + self.all_list_table[x].y  + 14;
			dragontiger_c[x].addChild(d_even_indi);

			let d_even_text = new createjs.Text(window.language.locale == "zh" ? "双" : "E","12px lato", "#1465bf");
			d_even_text.x = d_even_indi.x;
			d_even_text.y = d_even_indi.y;
			d_even_text.textAlign = "center";
			d_even_text.textBaseline = "middle";
			dragontiger_c[x].addChild(d_even_text);

			let tie_indi = new createjs.Shape();
			tie_indi.graphics.ss(1).s("#fff").beginFill("#689f39").drawCircle(0,0,8);
			tie_indi.x = (53*5) + 514 +14;
			tie_indi.y = 247 + self.all_list_table[x].y  + 14;
			dragontiger_c[x].addChild(tie_indi);

			let tie_text = new createjs.Text(window.language.locale == "zh" ? '和' : 'T',"12px lato", "#fff");
			tie_text.x = tie_indi.x;
			tie_text.y = tie_indi.y;
			tie_text.textAlign = "center";
			tie_text.textBaseline = "middle";
			dragontiger_c[x].addChild(tie_text);

			let t_even_indi = new createjs.Shape();
			t_even_indi.graphics.ss(1).s("#d32f2e").beginFill("#fff").drawCircle(0,0,8);
			t_even_indi.x = (53*6) + 514 +14;
			t_even_indi.y = 247 + self.all_list_table[x].y  + 14;
			dragontiger_c[x].addChild(t_even_indi);

			let t_even_text = new createjs.Text(window.language.locale == "zh" ? "双" : "E","12px lato", "#d32f2e");
			t_even_text.x = t_even_indi.x;
			t_even_text.y = t_even_indi.y;
			t_even_text.textAlign = "center";
			t_even_text.textBaseline = "middle";
			dragontiger_c[x].addChild(t_even_text);

			let t_odd_indi = new createjs.Shape();
			t_odd_indi.graphics.ss(1).s("#d32f2e").beginFill("#fff").drawCircle(0,0,8);
			t_odd_indi.x = (53*7) + 514 +14;
			t_odd_indi.y = 247 + self.all_list_table[x].y  + 14;
			dragontiger_c[x].addChild(t_odd_indi);

			let t_odd_text = new createjs.Text(window.language.locale == "zh" ? "单" : "O","12px lato", "#d32f2e");
			t_odd_text.x = t_odd_indi.x;
			t_odd_text.y = t_odd_indi.y;
			t_odd_text.textAlign = "center";
			t_odd_text.textBaseline = "middle";
			dragontiger_c[x].addChild(t_odd_text);

			let t_small_indi = new createjs.Shape();
			t_small_indi.graphics.ss(1).s("#fff").beginFill("#d32f2e").drawCircle(0,0,8);
			t_small_indi.x = (53*8) + 514 + 15;
			t_small_indi.y = 247 + self.all_list_table[x].y  + 14;
			dragontiger_c[x].addChild(t_small_indi);

			let t_small_text = new createjs.Text(window.language.locale == "zh" ? "小" : "S","12px lato", "#fff");
			t_small_text.x = t_small_indi.x;
			t_small_text.y = t_small_indi.y;
			t_small_text.textAlign = "center";
			t_small_text.textBaseline = "middle";
			dragontiger_c[x].addChild(t_small_text);

			let t_small_indi2 = new createjs.Shape();
			t_small_indi2.graphics.ss(0.5).s("#fff").beginFill("#d32f2e").drawCircle(0,0,3.5);
			t_small_indi2.x = (53*8) + 514 + 8;
			t_small_indi2.y = 247 + self.all_list_table[x].y  + 19;
			dragontiger_c[x].addChild(t_small_indi2);


			let t_big_indi = new createjs.Shape();
			t_big_indi.graphics.ss(1).s("#fff").beginFill("#d32f2e").drawCircle(0,0,8);
			t_big_indi.x = (53*9) + 514 + 15;
			t_big_indi.y = 247 + self.all_list_table[x].y  + 14;
			dragontiger_c[x].addChild(t_big_indi);

			let t_big_text = new createjs.Text(window.language.locale == "zh" ? "大" : "B","12px lato", "#fff");
			t_big_text.x = t_big_indi.x;
			t_big_text.y = t_big_indi.y;
			t_big_text.textAlign = "center";
			t_big_text.textBaseline = "middle";
			dragontiger_c[x].addChild(t_big_text);

			let t_big_indi2 = new createjs.Shape();
			t_big_indi2.graphics.ss(0.5).s("#fff").beginFill("#d32f2e").drawCircle(0,0,3.5);
			t_big_indi2.x = (53*9) + 514 + 8;
			t_big_indi2.y = 247 + self.all_list_table[x].y  + 8;
			dragontiger_c[x].addChild(t_big_indi2);

			let t_big_indi_text = new createjs.Text(window.language.locale == "zh" ? "大" : "B","12px lato", "#fff");
			t_big_indi_text.x = t_big_indi.x;
			t_big_indi_text.y = t_big_indi.y;
			t_big_indi_text.textAlign = "center";
			t_big_indi_text.textBaseline = "middle";
			dragontiger_c[x].addChild(t_big_indi_text);


			let tiger_indi = new createjs.Shape();
			tiger_indi.graphics.ss(1).s("#fff").beginFill("#d32f2e").drawCircle(0,0,8);
			tiger_indi.x = (53*10) + 514 + 14;
			tiger_indi.y = 247 + self.all_list_table[x].y + 14;
			dragontiger_c[x].addChild(tiger_indi);

			let t_text = new createjs.Text(window.language.locale == "zh" ? "虎" : "T","12px lato", "#fff");
			t_text.x = tiger_indi.x;
			t_text.y = tiger_indi.y;
			t_text.textAlign = "center";
			t_text.textBaseline = "middle";
			dragontiger_c[x].addChild(t_text);

			// === end cosmetics

			// === tiger stats
			let tiger_bar_bg = new createjs.Shape();
			tiger_bar_bg.graphics.ss(1).s("#7f1d1e").drawRoundRect(0,0,90,28,8);
			tiger_bar_bg.x = 1098;
			tiger_bar_bg.y = 248  + self.all_list_table[x].y;
			dragontiger_c[x].addChild(tiger_bar_bg);

			self.all_list_table[x].tiger_bar = new createjs.Shape();
			self.all_list_table[x].tiger_bar.graphics.beginFill("#7f1d1e").drawRect(0,0,90,28);
			self.all_list_table[x].tiger_bar.x = tiger_bar_bg.x;
			self.all_list_table[x].tiger_bar.y = 248 + self.all_list_table[x].y;
			self.all_list_table[x].tiger_bar.mask = tiger_bar_bg;
			dragontiger_c[x].addChild(self.all_list_table[x].tiger_bar);

			self.all_list_table[x].tiger_percent = new createjs.Text("100%","28px bebasNeue","#7f1d1e");
			self.all_list_table[x].tiger_percent.y = 245 + self.all_list_table[x].y;
			self.all_list_table[x].tiger_percent.x = 1238 -1;
			self.all_list_table[x].tiger_percent.textAlign = "right";
			dragontiger_c[x].addChild(self.all_list_table[x].tiger_percent);

			self.all_list_table[x].tie_count = new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].tie_count.textAlign = "right";
			self.all_list_table[x].tie_count.x = tie_bg.x + 43 - 2;
			self.all_list_table[x].tie_count.y = tie_bg.y;
			dragontiger_c[x].addChild(self.all_list_table[x].tie_count);

			self.all_list_table[x].dragon_count = new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].dragon_count.textAlign = "right";
			self.all_list_table[x].dragon_count.x = 40 + 516 ;
			self.all_list_table[x].dragon_count.y = tie_bg.y;
			dragontiger_c[x].addChild(self.all_list_table[x].dragon_count);

			self.all_list_table[x].dragon_big_count= new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].dragon_big_count.textAlign = "right";
			self.all_list_table[x].dragon_big_count.x = self.all_list_table[x].dragon_count.x + 54 - 1;
			self.all_list_table[x].dragon_big_count.y = tie_bg.y;
			dragontiger_c[x].addChild(self.all_list_table[x].dragon_big_count);

			self.all_list_table[x].dragon_small_count= new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].dragon_small_count.textAlign = "right";
			self.all_list_table[x].dragon_small_count.x = self.all_list_table[x].dragon_count.x + 110 - 3;
			self.all_list_table[x].dragon_small_count.y = tie_bg.y;
			dragontiger_c[x].addChild(self.all_list_table[x].dragon_small_count);

			self.all_list_table[x].dragon_odd_count= new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].dragon_odd_count.textAlign = "right";
			self.all_list_table[x].dragon_odd_count.x = self.all_list_table[x].dragon_count.x + 160 -1;
			self.all_list_table[x].dragon_odd_count.y = tie_bg.y;
			dragontiger_c[x].addChild(self.all_list_table[x].dragon_odd_count);

			self.all_list_table[x].dragon_even_count= new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].dragon_even_count.textAlign = "right";
			self.all_list_table[x].dragon_even_count.x = self.all_list_table[x].dragon_count.x + 214 + 1 -2;
			self.all_list_table[x].dragon_even_count.y = tie_bg.y;
			dragontiger_c[x].addChild(self.all_list_table[x].dragon_even_count);

			self.all_list_table[x].tiger_count = new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].tiger_count.textAlign = "right";
			self.all_list_table[x].tiger_count.x = 248 + 838;
			self.all_list_table[x].tiger_count.y = tie_bg.y;
			dragontiger_c[x].addChild(self.all_list_table[x].tiger_count);

			self.all_list_table[x].tiger_big_count = new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].tiger_big_count.textAlign = "right";
			self.all_list_table[x].tiger_big_count.x = self.all_list_table[x].tiger_count.x - 50 - 2;
			self.all_list_table[x].tiger_big_count.y = tie_bg.y;
			dragontiger_c[x].addChild(self.all_list_table[x].tiger_big_count);

			self.all_list_table[x].tiger_small_count = new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].tiger_small_count.textAlign = "right";
			self.all_list_table[x].tiger_small_count.x = self.all_list_table[x].tiger_count.x - 105;
			self.all_list_table[x].tiger_small_count.y = tie_bg.y;
			dragontiger_c[x].addChild(self.all_list_table[x].tiger_small_count);

			self.all_list_table[x].tiger_odd_count = new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].tiger_odd_count.textAlign = "right";
			self.all_list_table[x].tiger_odd_count.x = self.all_list_table[x].tiger_count.x - 158 - 1;
			self.all_list_table[x].tiger_odd_count.y = tie_bg.y;
			dragontiger_c[x].addChild(self.all_list_table[x].tiger_odd_count);

			self.all_list_table[x].tiger_even_count = new createjs.Text("0","24px bebasNeue","#fff");
			self.all_list_table[x].tiger_even_count.textAlign = "right";
			self.all_list_table[x].tiger_even_count.x = self.all_list_table[x].tiger_count.x - 210 -1;
			self.all_list_table[x].tiger_even_count.y = tie_bg.y;
			dragontiger_c[x].addChild(self.all_list_table[x].tiger_even_count);

			this.setPercentages(data.marks)

			// ===	card result

			self.all_list_table[x].card_result_container = new createjs.Container();
			self.all_list_table[x].card_result_container.y = self.all_list_table[x].y + 160;
			self.all_list_table[x].card_result_container.x = 100;

			dragontiger_c[x].addChild(self.all_list_table[x].card_result_container);

			dragontiger_c[x].addChild(self.all_list_table[x].bet_range_container);

			//Maintenance
			let header_bg = [];
			let text_color = "";

			self.all_list_table[x].maintenanceCon = new createjs.Container();
			self.all_list_table[x].maintenanceCon.visible = false;
			dragontiger_c[x].addChild(self.all_list_table[x].maintenanceCon);

			self.all_list_table[x].maintenanceCon.on("click", (e) => {
				return;
			});

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

			self.all_list_table[x].maintenanceBg = new createjs.Shape();
			self.all_list_table[x].maintenanceBg.graphics.beginFill("#333333").drawRoundRect(0, 0, 1250, 283, 6);
			self.all_list_table[x].maintenanceBg.x = self.all_list_table[x].x;
			self.all_list_table[x].maintenanceBg.y = self.all_list_table[x].y + 1;
			self.all_list_table[x].maintenanceBg.table_id = data.tableNumber;
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceBg);

			self.all_list_table[x].maintenanceHeader = new createjs.Shape();
			self.all_list_table[x].maintenanceHeader.x = self.all_list_table[x].x;
			self.all_list_table[x].maintenanceHeader.y = self.all_list_table[x].y - 1;
			self.all_list_table[x].maintenanceHeader.graphics.beginLinearGradientFill(["#8e24aa", "#4d168e"],[0,1],0,0,1250,10).drawRoundRectComplex(0,0,1250,50,10,10,0,0);
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceHeader);

			self.all_list_table[x].table_name = new createjs.Text(window.language.lobby.dragontiger,"bold 20px ArvoItalic","#fdba44");
			self.all_list_table[x].table_name.x = 110;
			self.all_list_table[x].table_name.y = 13 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].table_name);

			self.all_list_table[x].table_num = new createjs.Text(data.tableNumber.length < 2 ? "0"+data.tableNumber : data.tableNumber,"21px ArvoBold","#fdba44");
			self.all_list_table[x].table_num.x = 75; //self.all_list_table[x].table_name.x - (self.all_list_table[x].table_name.getBounds().width / 2) - 10;
			self.all_list_table[x].table_num.y = 11 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].table_num);

			self.all_list_table[x].maintenanceLogo = new createjs.Bitmap(self.context.getResources("maintenance_ico"));
			self.all_list_table[x].maintenanceLogo.x = 30;
			self.all_list_table[x].maintenanceLogo.y = 90 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceLogo.scaleX = self.all_list_table[x].maintenanceLogo.scaleY = 0.85;
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceLogo);

			self.all_list_table[x].maintenanceTxt = new createjs.Text('', '30px bebasneue', '#ffb547');
			self.all_list_table[x].maintenanceTxt.x = 205;
			self.all_list_table[x].maintenanceTxt.y = 110 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceTxt.textAlign = 'left';
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceTxt);

			self.all_list_table[x].maintenanceSubTxt = new createjs.Text('', '28px bebasneue', '#fff');
			self.all_list_table[x].maintenanceSubTxt.x = 205;
			self.all_list_table[x].maintenanceSubTxt.y = 150 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceSubTxt.textAlign = 'left';
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceSubTxt);

			self.all_list_table[x].maintenanceTime = new createjs.Text('', '26px bebasneue', '#fff');
			self.all_list_table[x].maintenanceTime.x = 205;
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

            let card = createCardSprite(self,80,120,self.context.getResources("cards2"));

                card.y = 45;
            if(card_data.gameInfo.tiger && !card_data.gameInfo.dragon) {
                card.gotoAndStop("back_red");
                card.x = 180;
                card.type = "tiger"
            } else if(card_data.gameInfo.tiger && card_data.gameInfo.dragon) {
                card.x = 20;
                card.gotoAndStop("back_blue");
                card.type = "dragon"
            }

            card.scaleX = card.scaleY = 0.45;

            self.all_list_table[x].status.text = window.language.lobby.dealing;
            self.all_list_table[x].card_result_container.addChild(card);
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

        	if(!self.all_list_table[x] || !self.all_list_table[x].dragon_bar) return;

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

			self.all_list_table[x].dragon_bar.scaleX = rmcount.dragon / rmcount.total;
			self.all_list_table[x].dragon_percent.text = Math.round((rmcount.dragon / rmcount.total) * 100) + "%";
			if(!rmcount.total) self.all_list_table[x].dragon_percent.text = '0%';

			self.all_list_table[x].tiger_bar.scaleX = rmcount.tiger / rmcount.total;
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

					let sp = createSpriteRoadMap(self.context.getResources(window.language.locale == "zh" ? "all_scoreboard_zh" : "all_scoreboard") , 40,40, sp);
					sp.x = e * 37.9;
					sp.y = i * 37.7;
					sp.gotoAndStop("pearl-dt-"+data.matrix[i][e].mark);
					self.all_list_table[x].pearlroad_container.addChild(sp);
				} //end for
			} //end for

        },
        drawBigRoad (data, type) {

        	if(!self.all_list_table[x] || !self.all_list_table[x].bigroad_container) return;

			self.all_list_table[x].bigroad_container.cache(0,0,454,228)
			self.all_list_table[x].bigroad_container.updateCache()
        	self.all_list_table[x].bigroad_container.removeAllChildren();

			let sp = null;
        	for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					sp = drawSboard("bigroad")[data.matrix[i][e].mark];
					sp.x = (e * 19.15) + -1;
					sp.y = (i*19) + -1.5;
					sp.scaleX = sp.scaleY = 0.7;

					if(data.matrix[i][e].ties) {
						sp.children[sp.children.length-1].visible = true;

						if(data.matrix[i][e].ties > 1) {
							let text = new createjs.Text(data.matrix[i][e].ties, "bold 18px bebasNeue","#000");
							text.x = sp.x + (10);
							text.y = sp.y;
							text.textAlign = "center";

							self.all_list_table[x].bigroad_container.addChild(text);
						}
						
						if(data.matrix[i][e].suited_tie) {
							sp.children[sp.children.length-1].graphics.clear().beginFill("#ff9800").drawRect(0,0,3,30);
						}
					}

					self.all_list_table[x].bigroad_container.addChild(sp);
				} //end for
			} //end for

			self.all_list_table[x].bigroad_container.updateCache()
        },
		drawBigEyeBoy (data) {

        	if(!self.all_list_table[x] || !self.all_list_table[x].bigeyeboy_container) return;

			self.all_list_table[x].bigeyeboy_container.cache(0,0,454,228)
			self.all_list_table[x].bigeyeboy_container.updateCache()

			self.all_list_table[x].bigeyeboy_container.removeAllChildren();

	        let sp = null;
        	for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					sp = drawSboard("bigeyeboy")[data.matrix[i][e].mark];
					sp.x = (e * 9.6) + 1;
					sp.y = (i * 9.4) - 2;
					sp.scaleX = sp.scaleY = 0.36;
					self.all_list_table[x].bigeyeboy_container.addChild(sp);
				} //end for
			} //end for

			// this.drawSmallRoad(data);
			// this.drawCockroachRoad(data);

			self.all_list_table[x].bigeyeboy_container.updateCache()
		},
		drawCockroachRoad(data) {

        	if(!self.all_list_table[x] || !self.all_list_table[x].cockroachroad_container) return;

			self.all_list_table[x].cockroachroad_container.cache(0,0,454,228)
			self.all_list_table[x].cockroachroad_container.updateCache()

			self.all_list_table[x].cockroachroad_container.removeAllChildren();


			let sp = null;
			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					sp = drawSboard("cockroach")[data.matrix[i][e].mark];
					sp.x = (e * 9.55) - 0.5;
					sp.y = (i * 9.3) - 0.5;
					sp.scaleX = sp.scaleY = 0.44;
					self.all_list_table[x].cockroachroad_container.addChild(sp);
				} //end c
			} //end for

			self.all_list_table[x].cockroachroad_container.updateCache()
		},
		drawSmallRoad (data) {

        	if(!self.all_list_table[x] || !self.all_list_table[x].smallroad_container) return;

			self.all_list_table[x].smallroad_container.cache(0,0,454,228)
			self.all_list_table[x].smallroad_container.updateCache()
			self.all_list_table[x].smallroad_container.removeAllChildren();

	        let sp = null;
			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					sp = drawSboard("smallroad")[data.matrix[i][e].mark];
					sp.x = e * 9.58;
					sp.y = (i * 9.45) - 0.5;
					sp.scaleX = sp.scaleY = 0.44;
					self.all_list_table[x].smallroad_container.addChild(sp);
				} //end for
			} //end for

			self.all_list_table[x].smallroad_container.updateCache()
		}
	}
	return instance;
}
