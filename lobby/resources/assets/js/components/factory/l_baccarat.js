import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';
import rmformat from '../../factories/formatter';

let formatData = rmformat();

let instance = null

export default(self,data,x) => {
	instance = {
		createTable () {
			// === deal coun
			self.context.lobby_banner.banner_container.visible = true;
			self.context.lobby_banner.table_banner_container.removeAllChildren()

			let label_spacing = 15;

			let deal_label = new createjs.Text(window.language.lobby.deal ,"18px latoregular","#fff");
			deal_label.x = 180;
			deal_label.y = 74 + self.all_list_table[x].y ;
			self.list_view.addChild(deal_label);

			if(window.language.locale == "zh") {
					deal_label.font = "13px latoregular";
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

			if(window.language.locale == "zh") {
					deal_label.font = "23px latoregular";
					self.all_list_table[x].deal_count.font = "23px latoregular";
					game_rounds_label.font = "23px latoregular";
					self.all_list_table[x].round_num.font = "23px latoregular";
			}

			//=== table status
			let round_num_height = self.all_list_table[x].round_num.getMeasuredHeight();
			self.all_list_table[x].status.text = window.language.lobby.nowbetting;
			self.all_list_table[x].status.x = game_rounds_label.x;
			self.all_list_table[x].status.y = self.all_list_table[x].round_num.y + round_num_height + label_spacing + label_spacing;

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

			// let roadmap_bg = new createjs.Shape();
			// roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,990,218);
			// roadmap_bg.y = self.all_list_table[x].y + 10;
			// roadmap_bg.x = self.all_list_table[x].x + 360
			// // roadmap_bg.cache(0,0,980,220);
			// self.list_view.addChild(roadmap_bg);

			// let lines = new createjs.Shape();
			// lines.graphics.ss(.8).s("rgba(0,0,0,0.8)").moveTo(roadmap_bg.x,roadmap_bg.y)
			// self.list_view.addChild(lines);

			// //pearl
			// for(var i = 0; i <= row; i++) {
			// 	lines.graphics.moveTo(roadmap_bg.x,31.5*i  +).lineTo(roadmap_bg.x348,31.5*i)
			// } // end for

			// lines.graphics.moveTo(29,0);
			// for(var x = 0; x <= col; x++) {
			// 	lines.graphics.moveTo(29*x,0).lineTo(29*x,189)
			// }


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

			// === let status
			let p_bg = null;
			let b_bg = null;
			let tie_bg = null;

			for(var i = 0; i < 3; i++) {
				p_bg = new createjs.Shape();
				p_bg.graphics.beginFill("#0d3e67").drawRoundRect(0,0,62,28,8);
				p_bg.x = (i*66) + 628;
				p_bg.y = 243 + self.all_list_table[x].y
				self.list_view.addChild(p_bg);

				b_bg = new createjs.Shape();
				b_bg.graphics.beginFill("#7f1d1e").drawRoundRect(0,0,62,28,8);
				b_bg.x = (i*66) + 893;
				b_bg.y = 243 + self.all_list_table[x].y
				b_bg.y = 243 + self.all_list_table[x].y
				self.list_view.addChild(b_bg);
			}

			tie_bg = new createjs.Shape();
			tie_bg.graphics.beginFill("#57802f").drawRoundRect(0,0,62,28,8);
			tie_bg.x = 826;
			tie_bg.y = 243 + self.all_list_table[x].y;
			self.list_view.addChild(tie_bg);

			// === player count cosmetics
			let player_indi = new createjs.Shape();
			player_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
			player_indi.x = 628 + 4 + 10;
			player_indi.y = self.all_list_table[x].y + 246 + 11;
			self.list_view.addChild(player_indi);

			let p_text = new createjs.Text(window.language.locale == "zh" ? "闲" : "P","12px lato", "#fff");
			p_text.x = player_indi.x;
			p_text.y = player_indi.y;
			p_text.textBaseline = "middle";
			p_text.textAlign = "center";
			self.list_view.addChild(p_text);

			//playerpair
			let playerpair_indi =  new createjs.Shape();
			playerpair_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
			playerpair_indi.x = 628 + 66 + 4 + 10;0.
			playerpair_indi.y = self.all_list_table[x].y + 246 + 11;
			self.list_view.addChild(playerpair_indi);

			let p_text2 = new createjs.Text(window.language.locale == "zh" ? "闲" : "P","12px lato", "#fff");
			p_text2.x = playerpair_indi.x;
			p_text2.y = playerpair_indi.y;
			p_text2.textBaseline = "middle";
			p_text2.textAlign = "center";
			self.list_view.addChild(p_text2);

			let playerpair_indi2 =  new createjs.Shape();
			playerpair_indi2.graphics.ss(0.5).s("#fff").beginFill("#1465bf").drawCircle(0,0,3.5);
			playerpair_indi2.x = 628 + 66 + 4 + 16;
			playerpair_indi2.y = self.all_list_table[x].y + 246 + 16;
			self.list_view.addChild(playerpair_indi2);

			//playernatural
			let playernat_indi =  new createjs.Shape();
			playernat_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
			playernat_indi.x =  628 + (66*2) + 4 + 10;
			playernat_indi.y = self.all_list_table[x].y + 246 + 11;
			self.list_view.addChild(playernat_indi);

			let n_text = new createjs.Text(window.language.locale == "zh" ? "例" : "N","12px lato", "#fff");
			n_text.x = playernat_indi.x;
			n_text.y = playernat_indi.y;
			n_text.textBaseline = "middle";
			n_text.textAlign = "center";
			self.list_view.addChild(n_text);

			// let playernat_indi2 =  new createjs.Shape();
			// playernat_indi2.graphics.ss(0.5).s("#fff").beginFill("#1465bf").drawCircle(0,0,3.5);
			// playernat_indi2.x = 628 + (66*2) + 4 + 16;
			// playernat_indi2.y = self.all_list_table[x].y + 246 + 16;
			// self.list_view.addChild(playernat_indi2);

			//tie
			let tie_indi =  new createjs.Shape();
			tie_indi.graphics.ss(1).s("#fff").beginFill("#689f39").drawCircle(0,0,9);
			tie_indi.x =  628 + (66*3) + 4 + 10;
			tie_indi.y = self.all_list_table[x].y + 246 + 11;
			self.list_view.addChild(tie_indi);

			let t_text = new createjs.Text(window.language.locale == "zh" ? "和" : "T","12px lato", "#fff");
			t_text.x = tie_indi.x;
			t_text.y = tie_indi.y;
			t_text.textBaseline = "middle";
			t_text.textAlign = "center";
			self.list_view.addChild(t_text);

			//bankernatural
      // let bankernat_indi2 =  new createjs.Shape();
			// bankernat_indi2.graphics.ss(0.5).s("#fff").beginFill("#d42e2e").drawCircle(0,0,3.5);
			// bankernat_indi2.x = 628 + (66*4) + 4 + 16;
			// bankernat_indi2.y = self.all_list_table[x].y + 246 + 16;
			// self.list_view.addChild(bankernat_indi2);

			let bankernat_indi = new createjs.Shape();
			bankernat_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
			bankernat_indi.x = 628 + (66*4) +4 + 10;
			bankernat_indi.y = self.all_list_table[x].y + 246 + 11;
			self.list_view.addChild(bankernat_indi);

			let n_text2 = new createjs.Text(window.language.locale == "zh" ? "例" : "N","12px lato", "#fff");
			n_text2.x = bankernat_indi.x;
			n_text2.y = bankernat_indi.y;
			n_text2.textBaseline = "middle";
			n_text2.textAlign = "center";
			self.list_view.addChild(n_text2);

			//bankerpair
			let bankerpair_indi = new createjs.Shape();
			bankerpair_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
			bankerpair_indi.x = 628 + (66*5) +4 + 10;
			bankerpair_indi.y = self.all_list_table[x].y + 246 + 11;
			self.list_view.addChild(bankerpair_indi);

      let bankerpair_indi2 =  new createjs.Shape();
			bankerpair_indi2.graphics.ss(0.5).s("#fff").beginFill("#d42e2e").drawCircle(0,0,3.5);
			bankerpair_indi2.x = 628 + (66*5) + 4 + 16;
			bankerpair_indi2.y = self.all_list_table[x].y + 246 + 16;
			self.list_view.addChild(bankerpair_indi2);

			let b_text2 = new createjs.Text(window.language.locale == "zh" ? "庄" : "B","12px lato", "#fff");
			b_text2.x = bankerpair_indi.x;
			b_text2.y = bankerpair_indi.y;
			b_text2.textBaseline = "middle";
			b_text2.textAlign = "center";
			self.list_view.addChild(b_text2);
			//banker
			let banker_indi = new createjs.Shape();
			banker_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
			banker_indi.x = 628 + (66*6) +4 + 10;
			banker_indi.y = self.all_list_table[x].y + 246 + 11;
			self.list_view.addChild(banker_indi);

			let b_text = new createjs.Text(window.language.locale == "zh" ? "庄" : "B" ,"12px lato", "#fff");
			b_text.x = banker_indi.x;
			b_text.y = banker_indi.y;
			b_text.textBaseline = "middle";
			b_text.textAlign = "center";
			self.list_view.addChild(b_text);


			// ===  player total texts
			self.all_list_table[x].player_total_text = new createjs.Text("0","20px bebasNeue","#fff");
			self.all_list_table[x].player_total_text.y = self.all_list_table[x].y + 246;
			self.all_list_table[x].player_total_text.x = 674 + 11;
			self.all_list_table[x].player_total_text.textAlign = "right";
			self.list_view.addChild(self.all_list_table[x].player_total_text);

			self.all_list_table[x].playerpair_total_text = new createjs.Text("0","20px bebasNeue","#fff");
			self.all_list_table[x].playerpair_total_text.y = self.all_list_table[x].y + 246;
			self.all_list_table[x].playerpair_total_text.x = 740 + 10;
			self.all_list_table[x].playerpair_total_text.textAlign = "right";
			self.list_view.addChild(self.all_list_table[x].playerpair_total_text);

			self.all_list_table[x].playernatural_total_text = new createjs.Text("0","20px bebasNeue","#fff");
			self.all_list_table[x].playernatural_total_text.y = self.all_list_table[x].y + 246;
			self.all_list_table[x].playernatural_total_text.x = 808 + 9;
			self.all_list_table[x].playernatural_total_text.textAlign = "right";
			self.list_view.addChild(self.all_list_table[x].playernatural_total_text);
			// ===  banker total texts
			self.all_list_table[x].bankernautral_total_text = new createjs.Text("0","20px bebasNeue","#fff");
			self.all_list_table[x].bankernautral_total_text.y = self.all_list_table[x].y + 246;
			self.all_list_table[x].bankernautral_total_text.x = 936 + 15;
			self.all_list_table[x].bankernautral_total_text.textAlign = "right";
			self.list_view.addChild(self.all_list_table[x].bankernautral_total_text);

			self.all_list_table[x].bankerpair_total_text = new createjs.Text("0","20px bebasNeue","#fff");
			self.all_list_table[x].bankerpair_total_text.y = self.all_list_table[x].y + 246;
			self.all_list_table[x].bankerpair_total_text.x = 1002 + 14;
			self.all_list_table[x].bankerpair_total_text.textAlign = "right";
			self.list_view.addChild(self.all_list_table[x].bankerpair_total_text);

			self.all_list_table[x].banker_total_text = new createjs.Text("0","20px bebasNeue","#fff");
			self.all_list_table[x].banker_total_text.y = self.all_list_table[x].y + 246;
			self.all_list_table[x].banker_total_text.x = 1072 + 10;
			self.all_list_table[x].banker_total_text.textAlign = "right";
			self.list_view.addChild(self.all_list_table[x].banker_total_text);

			self.all_list_table[x].tie_total_text = new createjs.Text("0","20px bebasNeue","#fff");
			self.all_list_table[x].tie_total_text.y = self.all_list_table[x].y + 246;
			self.all_list_table[x].tie_total_text.x = 870 + 12;
			self.all_list_table[x].tie_total_text.textAlign = "right";
			self.list_view.addChild(self.all_list_table[x].tie_total_text);

			// === banker stats
			let banker_bar_bg = new createjs.Shape();
			banker_bar_bg.graphics.ss(2).s("#7f1d1e").drawRoundRect(0,0,156,26,8);
			banker_bar_bg.x = 1093;
			banker_bar_bg.y = 244 + self.all_list_table[x].y;
			self.list_view.addChild(banker_bar_bg);

			self.all_list_table[x].banker_bar = new createjs.Shape();
			self.all_list_table[x].banker_bar.graphics.beginFill("#7f1d1e").drawRect(0,0,156,28);
			self.all_list_table[x].banker_bar.x = banker_bar_bg.x;
			self.all_list_table[x].banker_bar.y = banker_bar_bg.y;
			self.all_list_table[x].banker_bar.mask = banker_bar_bg;
			self.all_list_table[x].banker_bar.scaleX = .5;
			self.list_view.addChild(self.all_list_table[x].banker_bar);

			self.all_list_table[x].banker_percent = new createjs.Text("100%","28px bebasNeue","#7f1d1e");
			self.all_list_table[x].banker_percent.y = 242 + self.all_list_table[x].y;
			self.all_list_table[x].banker_percent.x = 1280;
			self.list_view.addChild(self.all_list_table[x].banker_percent);

			// === player stats
			let player_bar_bg = new createjs.Shape();
			player_bar_bg.graphics.ss(2).s("#0d3e67").drawRoundRect(0,0,155,26,8);
			player_bar_bg.x = 465;
			player_bar_bg.y = 244 + self.all_list_table[x].y;
			self.list_view.addChild(player_bar_bg);

			self.all_list_table[x].player_bar = new createjs.Shape();
			self.all_list_table[x].player_bar.graphics.beginFill("#0d3e67").drawRect(0,0,155,26);
			self.all_list_table[x].player_bar.x = player_bar_bg.x + 155;
			self.all_list_table[x].player_bar.y = player_bar_bg.y;
			self.all_list_table[x].player_bar.mask = player_bar_bg;
			self.all_list_table[x].player_bar.regX = 155;
			self.all_list_table[x].player_bar.scaleX = .5;
			self.list_view.addChild(self.all_list_table[x].player_bar);

			self.all_list_table[x].player_percent = new createjs.Text("100%","28px bebasNeue","#0d3e67");
			self.all_list_table[x].player_percent.y = 242 + self.all_list_table[x].y;
			self.all_list_table[x].player_percent.x = 385;
			self.list_view.addChild(self.all_list_table[x].player_percent);

			this.setPercentages(data.marks)

			// === result bg
			let player_bg = new createjs.Shape();
			player_bg.graphics.beginFill("#1665c1").drawRoundRect(0,0,86,104,8);
			player_bg.x = 1412;
			player_bg.y = self.all_list_table[x].y + 158;
			self.list_view.addChild(player_bg);

			let player_label = new createjs.Text(window.language.lobby.playercaps,"17px lato","#fff");
			player_label.x = player_bg.x + (86/2);
			player_label.textAlign = "center";
			player_label.y = self.all_list_table[x].y + 230;
			self.list_view.addChild(player_label);

			if(window.language.locale == "zh") {
					player_label.font = "22px lato","#fff";
			}

			let banker_bg = new createjs.Shape();
			banker_bg.graphics.beginFill("#d32f2e").drawRoundRect(0,0,86,104,8);
			banker_bg.x = 1412 + 86 + 8;
			banker_bg.y = self.all_list_table[x].y + 158;
			self.list_view.addChild(banker_bg);

			let banker_label = new createjs.Text(window.language.lobby.bankercaps,"17px lato","#fff");
			banker_label.x = banker_bg.x+ (86/2);
			banker_label.textAlign = "center";
			banker_label.y = self.all_list_table[x].y + 230 ;
			self.list_view.addChild(banker_label);

			if(window.language.locale == "zh") {
					banker_label.font = "22px lato";
			}

			self.all_list_table[x].card_result_container = new createjs.Container();
			self.all_list_table[x].card_result_container.y = self.all_list_table[x].y + 140;
			self.all_list_table[x].card_result_container.x = 1380;
			self.list_view.addChild(self.all_list_table[x].card_result_container);

			// === road map
			let pearlroad_mask = new createjs.Shape();
			pearlroad_mask.graphics.beginFill("red").drawRect(0,10,445,220);
			pearlroad_mask.x = 366
			pearlroad_mask.y = self.all_list_table[x].y

			self.all_list_table[x].pearlroad_container = new createjs.Container();
			self.all_list_table[x].pearlroad_container.y = self.all_list_table[x].y + 8.5;
			// self.all_list_table[x].pearlroad_container.mask = pearlroad_mask;
			self.all_list_table[x].pearlroad_container.x = 364;
			self.list_view.addChild(self.all_list_table[x].pearlroad_container);

			let bigroad_mask = new createjs.Shape();
			bigroad_mask.graphics.beginFill("red").drawRect(0,10,552,110);
			bigroad_mask.x = 364 + 442
			bigroad_mask.alpha = .5;
			bigroad_mask.y = self.all_list_table[x].y;

			self.all_list_table[x].bigroad_container = new createjs.Container();
			self.all_list_table[x].bigroad_container.y = self.all_list_table[x].y + 9.5;
			self.all_list_table[x].bigroad_container.x = 787+20;
			self.all_list_table[x].bigroad_container.mask = bigroad_mask;
			self.list_view.addChild(self.all_list_table[x].bigroad_container);

			self.all_list_table[x].bigeyeboy_container = new createjs.Container();
			self.all_list_table[x].bigeyeboy_container.y = self.all_list_table[x].y + 119;
			self.all_list_table[x].bigeyeboy_container.x = 805;
			// self.all_list_table[x].bigroad_container.mask = bigroad_mask;
			self.list_view.addChild(self.all_list_table[x].bigeyeboy_container);


			self.all_list_table[x].small_container = new createjs.Container();
			self.all_list_table[x].small_container.y = self.all_list_table[x].y + 174;
			self.all_list_table[x].small_container.x = 805;
			// self.all_list_table[x].bigroad_container.mask = bigroad_mask;
			self.list_view.addChild(self.all_list_table[x].small_container);


			self.all_list_table[x].cockroach_container = new createjs.Container();
			self.all_list_table[x].cockroach_container.y = self.all_list_table[x].y + 175;
			self.all_list_table[x].cockroach_container.x = 1079;
			// self.all_list_table[x].bigroad_container.mask = bigroad_mask;
			self.list_view.addChild(self.all_list_table[x].cockroach_container);

			self.list_view.addChild(self.all_list_table[x].maintenance_container);

			self.list_view.addChild(self.all_list_table[x].bet_range_container)

			this.inputRes(data);

			if(!data.marks.length) {
				if(self.all_list_table[x].status) {
					self.all_list_table[x].status.text = window.language.prompts.promptshuffling;
				}

				if(self.all_list_table[x].card_result_container) {
					self.all_list_table[x].card_result_container.removeAllChildren();
				}

				if(self.all_thumbnial_table[x].status) {
					self.all_thumbnial_table[x].status.text = window.language.prompts.promptshuffling;
				}
			}

			// === maintenance

		//	let header_bg = [];
		//	let text_color = "";

			self.all_list_table[x].maintenanceCon = new createjs.Container();
			self.all_list_table[x].maintenanceCon.visible = false;
			self.list_view.addChild(self.all_list_table[x].maintenanceCon);
/*
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
*/
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

			self.all_list_table[x].table_name = new createjs.Text(window.language.lobby.baccarat,"22px ArvoItalic","#fdba44");
			self.all_list_table[x].table_name.x = 105; //175;
			self.all_list_table[x].table_name.y = 13 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].table_name);

			if(window.language.locale == "zh") {
				self.all_list_table[x].table_name = "25px ArvoItalic";
			}

			self.all_list_table[x].table_num = new createjs.Text(data.tableNumber.length < 2 ? "0"+data.tableNumber : data.tableNumber,"24px ArvoBold","#fdba44");
			self.all_list_table[x].table_num.x = 70; //self.all_list_table[x].table_name.x - (self.all_list_table[x].table_name.getBounds().width / 2) - 10;
			self.all_list_table[x].table_num.y = 11 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].table_num);

			self.all_list_table[x].maintenanceLogo = new createjs.Bitmap(self.context.getResources("maintenance_ico"));
			self.all_list_table[x].maintenanceLogo.x = 30;
			self.all_list_table[x].maintenanceLogo.y = 90 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceLogo.scaleX = self.all_list_table[x].maintenanceLogo.scaleY = 0.85;
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
		   	// if (self.all_list_table[x].game_name === 'Baccarat' && parseInt(self.all_list_table[x].table_number) === 2) return;

		   	let maintenance = '';
		   	let activeMaintenance = [];
			let mainText = '';
			let subText = '';

		   	if (!socket) {
				let maintenanceSetting = maintenanceData.maintenanceSetting.maintenance;

				for (var i = 0; i < maintenanceSetting.length; i++) {
					if (self.all_list_table[x].slave === maintenanceSetting[i].type) {
						for (var j = 0; j < maintenanceSetting[i].info.length; j++) {
							if (maintenanceSetting[i].info[j].status === 1) {
								maintenance = true;
								activeMaintenance = maintenanceSetting[i].info[j];
							}
						} // end for loop
					} // end if
					else if (self.all_list_table[x].slave === '' && maintenanceSetting[i].type === 'normal') {
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
				activeMaintenance = data.data;

				if (self.all_list_table[x].slave === activeMaintenance.slave) {
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
		setResult(data) {
			if(self.all_list_table[x]) {
				self.all_list_table[x].status.text = window.language.lobby.result;
				self.all_list_table[x].deal_count.text = data.length
			}
			else if (self.all_thumbnial_table[x]) {
				if (!self.all_thumbnial_table[x].status) return;
				self.all_thumbnial_table[x].status.text  = window.language.lobby.result;
			}
		},
		inputRes (card_data) {
			if(self.all_thumbnial_table[x]) {
				self.all_thumbnial_table[x].status.text = window.language.lobby.dealing;
				// if (self.all_thumbnial_table[x].status.text == window.language.lobby.bettingend) {
				// }
			}

			if(!self.all_list_table[x] || !self.all_list_table[x].card_result_container) return;

			self.all_list_table[x].card_result_container.removeAllChildren();

			self.all_list_table[x].status.text = window.language.lobby.dealing;

			if(card_data.gameInfo.player1) {
				let player1 = createCardSprite(self,40,60,"/img/cards/small_sprite_cards_60.png");
				player1.gotoAndStop("C"+card_data.gameInfo.player1);
				player1.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, 2, 5);
				self.all_list_table[x].card_result_container.addChild(player1);
				player1.set({x:71,y:25});
			}

			if(card_data.gameInfo.player2) {
				let player2 = createCardSprite(self,40,60,"/img/cards/small_sprite_cards_60.png");
				player2.gotoAndStop("C"+card_data.gameInfo.player2);
				player2.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, 2, 5);
				self.all_list_table[x].card_result_container.addChild(player2);
				player2.set({x:39,y:25});

				try {
					self.all_list_table[x].card_result_container.setChildIndex(player2, 0);
				} catch(err) {
					console.log("error setchild index")
				}
			}

			if(card_data.gameInfo.player3) {
				let player3 = createCardSprite(self,40,60,"/img/cards/small_sprite_cards_60.png");
				player3.gotoAndStop("C"+card_data.gameInfo.player3);
				player3.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, -2, 5);
				self.all_list_table[x].card_result_container.addChild(player3);
				player3.set({x:105,y:75});
				player3.rotation = 90;
			}

			if(card_data.gameInfo.banker1) {
				let banker1 = createCardSprite(self,40,60,"/img/cards/small_sprite_cards_60.png");
				banker1.gotoAndStop("C"+card_data.gameInfo.banker1);
				banker1.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, 2, 5);
				self.all_list_table[x].card_result_container.addChild(banker1);
				banker1.set({x:132,y:25});
			}

			if(card_data.gameInfo.banker2) {
				let banker2 = createCardSprite(self,40,60,"/img/cards/small_sprite_cards_60.png");
				banker2.gotoAndStop("C"+card_data.gameInfo.banker2);
				banker2.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, 2, 5);
				self.all_list_table[x].card_result_container.addChild(banker2);
				banker2.set({x:164,y:25});
			}

			if(card_data.gameInfo.banker3) {
				let banker3 = createCardSprite(self,40,60,"/img/cards/small_sprite_cards_60.png");
				banker3.gotoAndStop("C"+card_data.gameInfo.banker3);
				banker3.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, -2, 5);
				self.all_list_table[x].card_result_container.addChild(banker3);
				banker3.x = 198;
				banker3.y = 75;
				banker3.rotation = 90;
			}
		},
		setPercentages (data) {

			if(!self.all_list_table[x]) return;

			data =  _.filter(data, function (e) {
				return e;
			});

			let count = _.groupBy(data, function (e) {
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

			data.forEach(function (e) {
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

				// if((e.mark == "b" || e.mark == "q" || e.mark == "w" || e.mark == "e") && (e.num == 9 || e.num == 8)) {
				// 	banker_natural_cnt ++;
				// }

				// if((e.mark == "p" || e.mark == "f" || e.mark == "g" || e.mark == "h") && (e.num == 9 || e.num == 8)) {
				// 	player_natural_cnt ++;
				// }
			});

			// self.all_list_table[x].player_bar.scaleX = (player_count)/data.length;
			createjs.Tween.get(self.all_list_table[x].player_bar)
			.to({
				scaleX : (player_count)/data.length
			},150)

			createjs.Tween.get(self.all_list_table[x].banker_bar)
			.to({
				scaleX : (banker_count)/data.length
			},150)

			// self.all_list_table[x].banker_bar.scaleX = (banker_count)/data.length;

			if(!self.all_list_table[x].player_percent) return;
			self.all_list_table[x].player_percent.text = Math.round(player_count/(data.length ? data.length : 1)*100) + "%";
			if(!self.all_list_table[x].banker_percent) return;
			self.all_list_table[x].banker_percent.text = Math.round(banker_count/(data.length ? data.length : 1)*100) + "%";

			self.all_list_table[x].player_total_text.text = player_count;
			self.all_list_table[x].playerpair_total_text.text = player_pair_cnt;
			self.all_list_table[x].playernatural_total_text.text = natural.player;
			// ===  banker total texts
			self.all_list_table[x].bankernautral_total_text.text = natural.banker;
			self.all_list_table[x].bankerpair_total_text.text = banker_pair_cnt;
			self.all_list_table[x].banker_total_text.text = banker_count;
			self.all_list_table[x].tie_total_text.text = tie_count;
		},
		drawPearlRoad (data, type) {

			if(!self.all_list_table[x] || !self.all_list_table[x].pearlroad_container) return;

			self.all_list_table[x].pearlroad_container.removeAllChildren();

			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					if(type == "list") {
						let sp = createSpriteRoadMap(window.language.locale == "zh" ? "/img/all_scoreboard_zh.png" : "/img/all_scoreboard.png" , 40,40, sp);
						sp.x = (e*36.6) + 2;
						sp.y = i*36.6;
						sp.gotoAndStop("pearl-"+data.matrix[i][e].mark);
						self.all_list_table[x].pearlroad_container.addChild(sp);

					}
				} //end for
			} //end for

			this.moveRoadMap(type, data.matrix, "pearlroad", 6, 12);
		},

		drawBigRoad (data, type) {

			let width = 19;
			if(type == "thumbnail" ) {
				if(!self.all_thumbnial_table[x] || !self.all_thumbnial_table[x].bigroad_container) return;
				width = 15.5;
			} else {
				if(!self.all_list_table[x] || !self.all_list_table[x].bigroad_container) return
			}	
			if(type == "thumbnail" && self.all_thumbnial_table[x].bigroad_container) {
				self.all_thumbnial_table[x].bigroad_container.removeAllChildren();
			}
			else if(type == "list") {
				self.all_list_table[x].bigroad_container.removeAllChildren();
			}

			let font_size = "16px";

			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;

					let sp;
					if(type == "list") {
						sp = createSpriteRoadMap("/img/all_scoreboard_20.png" , 20,20, sp);
						sp.x = (e*18.20) - 1.2;
						sp.y = (i*18.26) - 1.2;
				//		sp.scaleX = sp.scaleY = .5;
					} else {
						sp = createSpriteRoadMap("/img/all_scoreboard_16.png" , 16,16, sp);
					//	sp.scaleX = sp.scaleY = .4;
						font_size = "12px";
						sp.x = e * 16;
						sp.y = i * 15.6;
					}

					if(data.matrix[i][e].ties) {
						sp.gotoAndStop("big-"+data.matrix[i][e].mark+"-t");
					} else {
						//sp.gotoAndStop("big-"+data.matrix[i][e].mark);
						sp.gotoAndStop("big-"+data.matrix[i][e].mark);
					}

					if(type == "thumbnail") {

					}

					if(type == "list") {
						self.all_list_table[x].bigroad_container.addChild(sp);
					} else {
						self.all_thumbnial_table[x].bigroad_container.addChild(sp);
					}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					if(data.matrix[i][e].ties) {
						if(data.matrix[i][e].ties > 1) {
							let tie_text = new createjs.Text(data.matrix[i][e].ties, "bold "+font_size+" BebasNeue","#000");
							tie_text.y = sp.y + (width/2) + 1.8;
							tie_text.x = sp.x  + width/2;
							tie_text.textAlign = "center";
							tie_text.textBaseline = "middle";
							if(type == "list") {
								self.all_list_table[x].bigroad_container.addChild(tie_text);
							} else {
								self.all_thumbnial_table[x].bigroad_container.addChild(tie_text);
							}
						}
					}

				}
			}


	/*		if(type == "list") {
				this.moveRoadMap(type, data.matrix, "bigroad", 6, 30);
			}
			else {
				this.moveRoadMap(type, data.matrix, "bigroad", 6, 21);
			}*/
		},

		drawBigEyeBoy(data) {

			if(!self.all_list_table[x] || !self.all_list_table[x].bigeyeboy_container) return;


			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					let sp = createSpriteRoadMap("/img/all_scoreboard_16.png" , 16,16, sp);
					sp.y = i * 9.1;
					sp.x = e * 9.15;
					sp.scaleX = sp.scaleY = .6

					sp.gotoAndStop("bigeye-"+data.matrix[i][e].mark);

					self.all_list_table[x].bigeyeboy_container.addChild(sp);
				}
			}

			// this.drawSmallRoad(data);
			// this.drawCockradRoad(data);
		},


		drawSmallRoad(data) {

			if(!self.all_list_table[x] || !self.all_list_table[x].small_container) return;

			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					let sp = createSpriteRoadMap("/img/all_scoreboard_16.png" , 16,16, sp);
					sp.y = i * 9.1;
					sp.x = (e * 9.15) + 1.2;
					sp.scaleX = sp.scaleY = .6

					sp.gotoAndStop("bigsmall-"+data.matrix[i][e].mark);

					self.all_list_table[x].small_container.addChild(sp);
				}
			}
		},

		drawCockradRoad(data) {

			if(!self.all_list_table[x] || !self.all_list_table[x].cockroach_container) return;

			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					let sp = createSpriteRoadMap("/img/all_scoreboard_16.png" , 16,16, sp);
					sp.y = i * 9.1;
					sp.x = e * 9.15;
					sp.scaleX = sp.scaleY = .55

					sp.gotoAndStop("roach-"+data.matrix[i][e].mark);

					self.all_list_table[x].cockroach_container.addChild(sp);
				}
			}
		},

		moveRoadMap (type, arr,sel, row, col ) {
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
				if(sel == "bigroad") {
					self.all_list_table[x][sel+"_container"].x = 802 + ((p_count*18.2)* (-1)) ;
				}

				if(sel == "pearlroad"){
					self.all_list_table[x][sel+"_container"].x = 364 + ((p_count*36.4)* (-1)) ;
				}

			} else {
				// self.all_thumbnial_table[x][sel+"_container"].x = (self.all_thumbnial_table[x].x) + ((p_count*16)* (-1)) ;
				self.all_thumbnial_table[x][sel+"_container"].x = (self.all_thumbnial_table[x].x) + ((p_count*16)* (-1)) ;

			}
		}
	}
	return instance;
}
