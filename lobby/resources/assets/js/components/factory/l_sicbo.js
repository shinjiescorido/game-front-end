import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';
import rmformat from '../../factories/formatter';

let formatData = rmformat();

let instance = null;

/**
 * @method passes data and context to factory functions
 *
 * @param  context
 * @param  data
 * @param  index
 * @return null
 */
export default (self, data, x) => {
  instance = {

    createTable: function() {
      self.context.lobby_banner.banner_container.visible = true;
      self.context.lobby_banner.table_banner_container.removeAllChildren()

      let label_spacing = 15;

			// === game rounds
			let game_rounds_label = new createjs.Text(window.language.lobby.game ,"18px latoregular","#fff");
			game_rounds_label.x = 180;
			game_rounds_label.y = self.all_list_table[x].y + label_spacing + 94;
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

      // === latest result
      let result_bg = new createjs.Shape();
      result_bg.graphics.beginFill("#3f3f3f").drawRoundRect(0, 0, 160, 264, 10);
      result_bg.x = 370;
      result_bg.y = 10 + self.all_list_table[x].y;
      self.list_view.addChild(result_bg);

      let result_label = new createjs.Text(window.language.lobby.latestresult.toUpperCase(), window.language.locale == "zh" ? "23px latoregular" : "14px latoregular", "#fff");
      result_label.x = 449.5;

      if(window.language.locale == "zh") {
              result_label.y = 16 + self.all_list_table[x].y + -2;
      } else {
              result_label.y = 16 + self.all_list_table[x].y + 3;
      }

      result_label.textAlign = "center";
      self.list_view.addChild(result_label);

      let latest_res_bg = new createjs.Shape();
      latest_res_bg.graphics.ss(1).s("#d4d4d4").beginFill("#1c1c1c").drawRect(0, 0, 160, 38);
      latest_res_bg.x = result_bg.x;
      latest_res_bg.y = 45 + self.all_list_table[x].y;
      self.list_view.addChild(latest_res_bg);

      // === set 5 dice result
      self.all_list_table[x].lastdice_res_container = new createjs.Container();
      self.list_view.addChild(self.all_list_table[x].lastdice_res_container);

      self.bigResultCon = new createjs.Container();
      self.list_view.addChild(self.bigResultCon);
      self.bigResultCon.x = self.all_list_table[x].x + 705;
      self.bigResultCon.y = self.all_list_table[x].y + 187;

      this.setResult(data);


      // === hot & cold results
      let hot_res = new createjs.Shape();
      hot_res.graphics.beginFill("#d32f2e").drawRect(0, 0, 60, 196);
      hot_res.x = 544;
      hot_res.y = 10 + self.all_list_table[x].y;

      let hot_text = new createjs.Text(window.language.sicbo.hotcaps, "16px LatoRegular", "#fff");
      hot_text.textAlign = "center"
      hot_text.x = hot_res.x + 29.5;
      hot_text.y = hot_res.y + 5;
      self.list_view.addChild(hot_res, hot_text);

      let cold_res = new createjs.Shape();
      cold_res.graphics.beginFill("#1665c1").drawRect(0, 0, 60, 196);
      cold_res.x = 622;
      cold_res.y = 10 + self.all_list_table[x].y;

      let cold_text = new createjs.Text(window.language.sicbo.coldcaps, "16px LatoRegular", "#fff");
      cold_text.textAlign = "center";
      cold_text.x = cold_res.x + 30.5;
      cold_text.y = cold_res.y + 5;
      self.list_view.addChild(cold_res, cold_text);

      self.all_list_table[x].hot_cold_res_container = new createjs.Container();
      self.all_list_table[x].hot_cold_res_container.y = self.all_list_table[x].y + 44;
      self.all_list_table[x].hot_cold_res_container.x = 572;
      self.list_view.addChild(self.all_list_table[x].hot_cold_res_container);
      this.setHotColdResult(data.marks);

      // === score board / road map
      let scoreboard_button_bg = new createjs.Shape();
      scoreboard_button_bg.graphics.ss(1).s("#9c9c9c").beginFill("#fff").drawRect(0, 0, 86, 196);
      scoreboard_button_bg.x = 695;
      scoreboard_button_bg.y = 10 + self.all_list_table[x].y;
      self.list_view.addChild(scoreboard_button_bg);
      // === roadmap bg

      let roadmap_bg = new createjs.Shape();
      roadmap_bg.graphics.beginFill("#fff").drawRect(0, 0, 570.86, 196);
      roadmap_bg.y = scoreboard_button_bg.y;
      roadmap_bg.x = scoreboard_button_bg.x + 86;
      self.list_view.addChild(roadmap_bg);

      /*
      for(var e = 0; e < 19; e++) {
      	for(var i = 0; i < 6; i++) {
      		let rmbg = new createjs.Shape();
      		rmbg.graphics.beginFill("#fff").ss(.8).s("rgba(0,0,0,0.6)").drawRect(0,0,30,32.7);
      		rmbg.x = (e*30) + 690 + 90;;
      		rmbg.y = (i*32.7) + self.all_list_table[x].y + 10;
      		self.list_view.addChild(rmbg);
      	}
      }
      */

      let lines = new createjs.Shape();
      lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0, 0)
      self.list_view.addChild(lines);
      let posY = roadmap_bg.y;
      let posX = roadmap_bg.x;

      for (var i = 0; i <= 6; i++) {
        lines.graphics.moveTo(posX, posY + (32.7 * i)).lineTo(posX + 570, posY + (32.7 * i))
      }

      for (var i = 0; i <= 18; i++) {
        lines.graphics.moveTo(posX + (31.7 * i), posY).lineTo(posX + (31.7 * i), posY + 196)
      }

      lines.shadow = new createjs.Shadow("#000", 2, 2, 6);
      lines.alpha = .5;

      let scoreboard_text = [window.language.sicbo.bigsmallcaps, window.language.sicbo.oddevencaps, window.language.sicbo.sumcaps, window.language.sicbo.dicecaps];
      let scoreboard_type = ["BIG/SMALL", "ODD/EVEN", "SUM", "DICE"];
      self.all_list_table[x].button = [];

      for (var i = 0; i < scoreboard_text.length; i++) {

        self.all_list_table[x].button[i] = new createjs.Shape();


        // if(e.target.type.toLowerCase() == scoreboard_type[i]) {
        // self.all_list_table[x].button_bg[i].graphics.beginLinearGradientFill(["red","black","yellow"], [0,0.5,1], 0,0,75,0,100).drawRoundRect(0,0,75,42,10);
        // } else {
        self.all_list_table[x].button[i].graphics.beginLinearGradientFill(["#d9bf6b", "#efde80", "#d9bf6b"], [0, 0.5, 1], 0, 0, 75, 0, 100).drawRoundRect(0, 0, 75, 42, 10);
        // }

        self.all_list_table[x].button[i].y = (i * 47) + 16 + self.all_list_table[x].y;
        self.all_list_table[x].button[i].x = 700.5;
        self.all_list_table[x].button[i].type = scoreboard_type[i];
        self.all_list_table[x].button[i].state = "normal";
        self.list_view.addChild(self.all_list_table[x].button[i]);

        self.all_list_table[x].button[i].text = new createjs.Text(scoreboard_text[i], window.language.locale == "zh" ? "bold 15px LatoRegular" : "bold 12px LatoRegular", "#000");
        self.all_list_table[x].button[i].text.x = self.all_list_table[x].button[i].x + (75 / 2);
        self.all_list_table[x].button[i].text.y = self.all_list_table[x].button[i].y + (42 / 2);
        self.all_list_table[x].button[i].text.textAlign = "center";
        self.all_list_table[x].button[i].text.textBaseline = "middle";
        self.all_list_table[x].button[i].text.hitArea = self.all_list_table[x].button[i];
        self.list_view.addChild(self.all_list_table[x].button[i].text);

        self.all_list_table[x].button[i].changeState = function(e, type) {
          if (e.state == "active") return;
          if (type == "hover") {
            e.graphics.clear().beginLinearGradientFill(["#8e7c45", "#b59e58", "#8e7c45"], [0, 0.5, 1], 0, 0, 75, 0, 100).drawRoundRect(0, 0, 75, 42, 8);
            e.text.color = "#fff";
          } else {
            e.graphics.clear().beginLinearGradientFill(["#d9bf6b", "#efde80", "#d9bf6b"], [0, 0.5, 1], 0, 0, 75, 0, 100).drawRoundRect(0, 0, 75, 42, 8);
            e.text.color = "#000";
          }
        } // end hover

        self.all_list_table[x].button[i].on("mouseover", (e) => {
          e.target.changeState(e.target, "hover");
        });

        self.all_list_table[x].button[i].on("mouseout", (e) => {
          e.target.changeState(e.target);
        });

        self.all_list_table[x].button[i].on("click", (e) => {
          self.all_list_table[x].button.forEach((o) => {
            o.state = "normal";
            o.changeState(o);
          });
          e.target.changeState(e.target, "hover");
          e.target.state = "active";
          self.all_list_table[x].size_container.visible = false;
          self.all_list_table[x].sum_container.visible = false;
          self.all_list_table[x].dice_container.visible = false;
          self.all_list_table[x].parity_container.visible = false;
          switch (e.target.type.toLowerCase()) {
            case "odd/even":
              self.all_list_table[x].parity_container.visible = true;
              break;
            case "big/small":
              self.all_list_table[x].size_container.visible = true;
              break;
            case "sum":
              self.all_list_table[x].sum_container.visible = true;
              break;
            case "dice":
              self.all_list_table[x].dice_container.visible = true;
              break;
          }
        });
      }

      // default visible is size scoreboard
      self.all_list_table[x].button[0].graphics.clear().beginLinearGradientFill(["#8e7c45", "#b59e58", "#8e7c45"], [0, 0.5, 1], 0, 0, 75, 0, 100).drawRoundRect(0, 0, 75, 42, 8);
      self.all_list_table[x].button[0].state = "active";
      self.all_list_table[x].button[0].text.color = "#fff";

      // === triple & double counter
      let triple_bg = new createjs.Shape();
      triple_bg.graphics.beginFill("#e5b141").drawRoundRect(0, 0, 64, 60, 6);
      triple_bg.x = 620;
      triple_bg.y = 215 + self.all_list_table[x].y;
      self.list_view.addChild(triple_bg);

      let triple_label_bg = new createjs.Shape();
      triple_label_bg.graphics.beginFill("#333333").drawRoundRect(0, 0, 52, 28, 6);
      triple_label_bg.x = triple_bg.x + 6;
      triple_label_bg.y = triple_bg.y + 26;
      self.list_view.addChild(triple_label_bg);

      let triple_label = new createjs.Text(window.language.sicbo.triplecaps, "bold 13px LatoRegular", "#000");
      triple_label.x = triple_bg.x + 32;
      triple_label.y = triple_bg.y + 3;
      triple_label.textAlign = "center";
      self.list_view.addChild(triple_label);

      let double_bg = new createjs.Shape();
      double_bg.graphics.beginFill("#e5b141").drawRoundRect(0, 0, 64, 60, 6);
      double_bg.x = 542;
      double_bg.y = 215 + self.all_list_table[x].y;
      self.list_view.addChild(double_bg);

      let double_label_bg = new createjs.Shape();
      double_label_bg.graphics.beginFill("#333333").drawRoundRect(0, 0, 52, 28, 6);
      double_label_bg.x = double_bg.x + 6;
      double_label_bg.y = double_bg.y + 26;
      self.list_view.addChild(double_label_bg);

      let double_label = new createjs.Text(window.language.sicbo.doublecaps, "bold 13px LatoRegular", "#000");
      double_label.x = double_bg.x + 32;
      double_label.y = double_bg.y + 3;
      double_label.textAlign = "center";
      self.list_view.addChild(double_label);


      self.all_list_table[x].double_val = new createjs.Text("0", "bold 21px BebasNeue", "#fff");
      self.all_list_table[x].double_val.x = double_bg.x + 32;
      self.all_list_table[x].double_val.y = double_label_bg.y + 14;
      self.all_list_table[x].double_val.textAlign = "center";
      self.all_list_table[x].double_val.textBaseline = "middle";
      self.list_view.addChild(self.all_list_table[x].double_val);

      self.all_list_table[x].triple_val = new createjs.Text("0", "bold 21px BebasNeue", "#fff");
      self.all_list_table[x].triple_val.x = triple_bg.x + 32;
      self.all_list_table[x].triple_val.y = triple_label_bg.y + 14;
      self.all_list_table[x].triple_val.textAlign = "center";
      self.all_list_table[x].triple_val.textBaseline = "middle";
      self.list_view.addChild(self.all_list_table[x].triple_val);

      this.doubleTripleCount(data.marks)

      // === odd/even big/small percentage
      let odd_label = new createjs.Text(window.language.sicbo.oddcaps, "16px latoregular", "#000");
      odd_label.x = 696;
      odd_label.y = 220 + self.all_list_table[x].y;
      self.list_view.addChild(odd_label);

      let even_label = new createjs.Text(window.language.sicbo.evencaps, "16px latoregular", "#000");
      even_label.x = 696 + 308;
      even_label.y = 220 + self.all_list_table[x].y;
      even_label.textAlign = "right";
      self.list_view.addChild(even_label);

      let big_label = new createjs.Text(window.language.sicbo.bigcaps, "16px latoregular", "#000");
      big_label.x = 1041;
      big_label.y = 220 + self.all_list_table[x].y;
      self.list_view.addChild(big_label);

      let small_label = new createjs.Text(window.language.sicbo.smallcaps, "16px latoregular", "#000");
      small_label.x = 1041 + 308;
      small_label.y = 220 + self.all_list_table[x].y;
      small_label.textAlign = "right";
      self.list_view.addChild(small_label);

      self.all_list_table[x].odd_bar = new createjs.Shape();
      self.all_list_table[x].odd_bar.graphics.beginFill("#b71b1c").drawRect(0, 0, 308, 33);
      self.all_list_table[x].odd_bar.setBounds(0, 0, 200, 30);
      self.all_list_table[x].odd_bar.x = 696;
      self.all_list_table[x].odd_bar.y = 242 + self.all_list_table[x].y;
      self.all_list_table[x].odd_bar.scaleX = .5;
      self.list_view.addChild(self.all_list_table[x].odd_bar);

      self.all_list_table[x].even_bar = new createjs.Shape();
      self.all_list_table[x].even_bar.graphics.beginFill("#0e47a1").drawRect(0, 0, 308, 33);
      self.all_list_table[x].even_bar.setBounds(0, 0, 200, 30);
      self.all_list_table[x].even_bar.x = 696 + 308;
      self.all_list_table[x].even_bar.y = 242 + self.all_list_table[x].y;
      self.all_list_table[x].even_bar.regX = 308;
      self.all_list_table[x].even_bar.scaleX = .5;
      self.list_view.addChild(self.all_list_table[x].even_bar);

      self.all_list_table[x].big_bar = new createjs.Shape();
      self.all_list_table[x].big_bar.graphics.beginFill("#b71b1c").drawRect(0, 0, 308, 33);
      self.all_list_table[x].big_bar.setBounds(0, 0, 200, 30);
      self.all_list_table[x].big_bar.x = 1040;
      self.all_list_table[x].big_bar.y = 242 + self.all_list_table[x].y;
      self.all_list_table[x].big_bar.scaleX = .5;
      self.list_view.addChild(self.all_list_table[x].big_bar);

      self.all_list_table[x].small_bar = new createjs.Shape();
      self.all_list_table[x].small_bar.graphics.beginFill("#0e47a1").drawRect(0, 0, 308, 33);
      self.all_list_table[x].small_bar.setBounds(0, 0, 200, 30);
      self.all_list_table[x].small_bar.x = 1348;
      self.all_list_table[x].small_bar.y = 242 + self.all_list_table[x].y;
      self.all_list_table[x].small_bar.regX = 308;
      self.all_list_table[x].small_bar.scaleX = .5;
      self.list_view.addChild(self.all_list_table[x].small_bar);

      // === odd/even small/big values % init
      self.all_list_table[x].odd_val = new createjs.Text("0%", "24px BebasNeue", "#fff");
      self.all_list_table[x].odd_val.x = self.all_list_table[x].odd_bar.x + 4;
      self.all_list_table[x].odd_val.y = self.all_list_table[x].odd_bar.y + 2.5;
      self.list_view.addChild(self.all_list_table[x].odd_val);

      self.all_list_table[x].even_val = new createjs.Text("0%", "24px BebasNeue", "#fff");
      self.all_list_table[x].even_val.x = self.all_list_table[x].even_bar.x - 4;
      self.all_list_table[x].even_val.y = self.all_list_table[x].even_bar.y + 2.5;
      self.all_list_table[x].even_val.textAlign = "right";
      self.list_view.addChild(self.all_list_table[x].even_val);

      self.all_list_table[x].big_val = new createjs.Text("0%", "24px BebasNeue", "#fff");
      self.all_list_table[x].big_val.x = self.all_list_table[x].big_bar.x + 4;
      self.all_list_table[x].big_val.y = self.all_list_table[x].big_bar.y + 2.5;
      self.list_view.addChild(self.all_list_table[x].big_val);

      self.all_list_table[x].small_val = new createjs.Text("0%", "24px BebasNeue", "#fff");
      self.all_list_table[x].small_val.x = self.all_list_table[x].small_bar.x - 4;
      self.all_list_table[x].small_val.y = self.all_list_table[x].small_bar.y + 2.5;
      self.all_list_table[x].small_val.textAlign = "right";
      self.list_view.addChild(self.all_list_table[x].small_val);

      this.setPercentages(data.marks);

      // === scoreboard/roadmap containers

      let mask = new createjs.Shape();
      mask.graphics.beginFill("red").drawRect(780, self.all_list_table[x].y + 10, 570, 198);

      self.all_list_table[x].parity_container = new createjs.Container();
      self.all_list_table[x].parity_container.visible = false;
      self.all_list_table[x].parity_container.x = 780;
      // self.all_list_table[x].parity_container.mask = mask;
      self.list_view.addChild(self.all_list_table[x].parity_container);

      self.all_list_table[x].size_container = new createjs.Container();
      self.all_list_table[x].size_container.visible = true;
      self.all_list_table[x].size_container.x = 780;
      // self.all_list_table[x].size_container.mask = mask;
      self.list_view.addChild(self.all_list_table[x].size_container);

      self.all_list_table[x].dice_container = new createjs.Container();
      self.all_list_table[x].dice_container.visible = false;
      self.all_list_table[x].dice_container.x = 780;
      // self.all_list_table[x].dice_container.mask = mask;
      self.list_view.addChild(self.all_list_table[x].dice_container);

      self.all_list_table[x].sum_container = new createjs.Container();
      self.all_list_table[x].sum_container.visible = false;
      self.all_list_table[x].sum_container.x = 780;
      // self.all_list_table[x].sum_container.mask = mask;
      self.list_view.addChild(self.all_list_table[x].sum_container);

      this.drawRoadMap(formatData.fnFormatSicbo(data.marks, 17, 6), "list");

      self.list_view.addChild(self.all_list_table[x].maintenance_container);


      // === maintenance

      //			let header_bg = [];
      //			let text_color = "";

      self.all_list_table[x].maintenanceCon = new createjs.Container();
      self.all_list_table[x].maintenanceCon.visible = false;
      self.list_view.addChild(self.all_list_table[x].maintenanceCon);

      self.all_list_table[x].maintenanceCon.on("click", (e) => {
        return;
      });

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
      let header_bg = ["#980000", "#2b0000"];
      let text_color = "#efb052";

      if (data.roomType == "p") {
        header_bg = ["#bd0000", "#7c0000"];
        text_color = "#efb052";
      } else if (data.roomType == "v") {
        header_bg = ["#fedd78", "#d5a515"];
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

      self.all_list_table[x].table_name = new createjs.Text(window.language.lobby.sicbo,"22px ArvoItalic","#fdba44");
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
      if (!self.all_list_table[x] || !self.all_list_table[x].maintenanceCon) return;

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

    bigResult(lastDiceContainer) {
      //self.bigResultCon.removeAllChildren();
      self.bigResultCon.addChild(lastDiceContainer);
      lastDiceContainer.x = self.bigResultCon.x;
      lastDiceContainer.y = self.bigResultCon.y;
      // console.log(lastDiceContainer);
    },
    /**
     * @method calculates and set 5 common result total and 5 less common result total
     *
     * @param array game marks
     */
    setHotColdResult(data) {
      if (!self.all_list_table[x] || !self.all_list_table[x].hot_cold_res_container) return;

      if (self.all_list_table[x].hot_cold_res_container) {
        self.all_list_table[x].hot_cold_res_container.removeAllChildren();
      }

      data = _.filter(data, (row) => {
        return row.game_info
      });

      data.forEach(function(row) {
        row.total = _.reduce([JSON.parse(row.game_info).one, JSON.parse(row.game_info).two, JSON.parse(row.game_info).three], function(sum, n) {
          return parseInt(sum) + parseInt(n);
        });
      });

      let res = _.sortBy(_.groupBy(data, function(row) {
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

      hot_res.forEach(function(e, i) {
        let text = new createjs.Text(e, "20px BebasNeue", "#fff");
        text.y = (i * 32) + 3.5;
        text.textAlign = "center";
        self.all_list_table[x].hot_cold_res_container.addChild(text)
      });

      cold_res.forEach(function(e, i) {
        let text = new createjs.Text(e, "20px BebasNeue", "#fff");
        text.y = (i * 32) + 3.5;
        text.x = 81;
        text.textAlign = "center";
        self.all_list_table[x].hot_cold_res_container.addChild(text)
      });
      self.all_list_table[x].hot_cold_res_container.y / 196;
    },
    /**
     * @method sets/draws 5 lates results
     *
     * @param {[type]}
     */
    setResult(data) {

      // console.log("push this nigga");
      // console.log(data);

      if (!data.marks.length) return;

      data.marks = _.filter(data.marks, (row) => {
        if ('game_info' in row) {
          return row;
        }
      });

      if (!self.all_list_table[x]) return;

      self.all_list_table[x].dice = [];
      self.all_list_table[x].size = [];
      self.all_list_table[x].total = [];
      self.all_list_table[x].lastdice_res_container.removeAllChildren();

      // big result
      self.bigResult_data = [];
      self.bigResult_data[x] = {};
      self.bigResult_data[x].dice = [];
      self.bigResult_data[x].size = [];
      self.bigResult_data[x].total = [];

      self.bigResultCon.removeAllChildren();

      self.bigResult_data[x].size = new createjs.Text("", "40px BebasNeue");
      self.bigResult_data[x].size.textBaseline = "middle";
      self.bigResult_data[x].size.textAlign = "left";
      self.bigResultCon.addChild(self.bigResult_data[x].size);

      self.bigResult_data[x].total = new createjs.Text("", "40px BebasNeue");
      self.bigResult_data[x].total.textBaseline = "middle";
      self.bigResult_data[x].total.textAlign = "left";
      self.bigResultCon.addChild(self.bigResult_data[x].total);



      let last150 = null;
      if (data.marks.length > 5) {
        last150 = data.marks.slice(Math.max(data.marks.length - 6, 1)).reverse();
      } else if (data.marks.length <= 5) {
        last150 = data.marks.reverse();
      }



      for (var i = 0; i < last150.length; i++) {
        let dice = JSON.parse(last150[i].game_info).one + "" + JSON.parse(last150[i].game_info).two + "" + JSON.parse(last150[i].game_info).three;

        if (dice == "") dice = "123";

        self.all_list_table[x].dice.push({
          dice1: new createjs.Bitmap("/img/dice/dice" + dice[0] + ".png"),
          dice2: new createjs.Bitmap("/img/dice/dice" + dice[1] + ".png"),
          dice3: new createjs.Bitmap("/img/dice/dice" + dice[2] + ".png")
        });

        self.bigResult_data[x].dice.push({
          dice1: new createjs.Bitmap("/img/dice/dice" + dice[0] + ".png"),
          dice2: new createjs.Bitmap("/img/dice/dice" + dice[1] + ".png"),
          dice3: new createjs.Bitmap("/img/dice/dice" + dice[2] + ".png")
        });

        if (self.bigResult_data[x].dice[i - 5]) {
          self.bigResultCon.addChild(self.bigResult_data[x].dice[i - 5].dice1);
          self.bigResultCon.addChild(self.bigResult_data[x].dice[i - 5].dice2);
          self.bigResultCon.addChild(self.bigResult_data[x].dice[i - 5].dice3);

          self.bigResult_data[x].dice[i - 5].dice1.x = self.bigResultCon.x;
          self.bigResult_data[x].dice[i - 5].dice2.x = self.bigResultCon.x + 50;
          self.bigResult_data[x].dice[i - 5].dice3.x = self.bigResultCon.x + 100;

          self.bigResult_data[x].dice[i - 5].dice1.scaleX = self.bigResult_data[x].dice[i - 5].dice1.scaleY = 0.5;
          self.bigResult_data[x].dice[i - 5].dice2.scaleX = self.bigResult_data[x].dice[i - 5].dice2.scaleY = 0.5;
          self.bigResult_data[x].dice[i - 5].dice3.scaleX = self.bigResult_data[x].dice[i - 5].dice3.scaleY = 0.5;
        }

        self.all_list_table[x].lastdice_res_container.addChild(self.all_list_table[x].dice[i].dice1);
        self.all_list_table[x].lastdice_res_container.addChild(self.all_list_table[x].dice[i].dice2);
        self.all_list_table[x].lastdice_res_container.addChild(self.all_list_table[x].dice[i].dice3);


        self.all_list_table[x].dice[i].dice1.y = self.all_list_table[x].y + (i * 37) + 52.5;
        self.all_list_table[x].dice[i].dice2.y = self.all_list_table[x].y + (i * 37) + 52.5;
        self.all_list_table[x].dice[i].dice3.y = self.all_list_table[x].y + (i * 37) + 52.5;

        self.all_list_table[x].dice[i].dice1.x = 150 + 235 + 3 - 2;
        self.all_list_table[x].dice[i].dice2.x = 180 + 235 + 3 - 2;
        self.all_list_table[x].dice[i].dice3.x = 210 + 235 + 3 - 2;

        self.all_list_table[x].dice[i].dice1.scaleX = self.all_list_table[x].dice[i].dice1.scaleY = 0.3;
        self.all_list_table[x].dice[i].dice2.scaleX = self.all_list_table[x].dice[i].dice2.scaleY = 0.3;
        self.all_list_table[x].dice[i].dice3.scaleX = self.all_list_table[x].dice[i].dice3.scaleY = 0.3;


        let total = _.reduce(dice.split(""), function(sum, n) {
          return parseInt(sum) + parseInt(n);
        });

        let uniqDice = _.uniq(dice.split(""));

        let text;

        if(window.language.locale == "zh") {
                text = uniqDice.length == 1 ? "和" : (total >= 11 ? "大" : "小");
                self.all_list_table[x].size[i] = new createjs.Text(text, "20px BebasNeue", text == "和" ? "#3aa955" : (text == "大" ? "#d22f2f" : "#1665c1"));
                self.all_list_table[x].total[i] = new createjs.Text(total, "20px BebasNeue", text == "和" ? "#3aa955" : (text == "大" ? "#d22f2f" : "#1665c1"));
        } else {
                text = uniqDice.length == 1 ? "T" : (total >= 11 ? "B" : "S");
                self.all_list_table[x].size[i] = new createjs.Text(text, "26px BebasNeue", text == "T" ? "#3aa955" : (text == "B" ? "#d22f2f" : "#1665c1"));
                self.all_list_table[x].total[i] = new createjs.Text(total, "26px BebasNeue", text == "T" ? "#3aa955" : (text == "B" ? "#d22f2f" : "#1665c1"));
        }

        self.all_list_table[x].size[i].x = self.all_list_table[x].dice[i].dice3.x + 34;
        self.all_list_table[x].size[i].y = self.all_list_table[x].dice[i].dice3.y + 14.5;
        self.all_list_table[x].size[i].textBaseline = "middle";
        self.all_list_table[x].lastdice_res_container.addChild(self.all_list_table[x].size[i]);

        if(window.language.locale == "zh") {
                self.all_list_table[x].total[i].x = self.all_list_table[x].size[i].x + 20;
        } else {
                self.all_list_table[x].total[i].x = self.all_list_table[x].size[i].x + 14;
        }

        self.all_list_table[x].total[i].y = self.all_list_table[x].size[i].y;
        self.all_list_table[x].total[i].textBaseline = "middle";
        self.all_list_table[x].lastdice_res_container.addChild(self.all_list_table[x].total[i]);

        if (self.bigResult_data[x].dice[i - 5]) {
          self.bigResult_data[x].size.text = self.all_list_table[x].size[i - 5].text;
          self.bigResult_data[x].size.color = self.all_list_table[x].size[i - 5].color;

          self.bigResult_data[x].size.x = self.bigResult_data[x].dice[i - 5].dice3.x + 50;
          self.bigResult_data[x].size.y = self.bigResult_data[x].dice[i - 5].dice3.y + 22;

          self.bigResult_data[x].total.text = self.all_list_table[x].total[i - 5].text;
          self.bigResult_data[x].total.color = self.all_list_table[x].total[i - 5].color;

          if(window.language.locale == "zh") {
                  self.bigResult_data[x].total.x = self.bigResult_data[x].size.x + 40;
          } else {
                  self.bigResult_data[x].total.x = self.bigResult_data[x].size.x + 18;
          }

          self.bigResult_data[x].total.y = self.bigResult_data[x].size.y;
        }

      }

      if (!self.all_list_table[x].lastdice_res_container.children.length) return;

      self.all_list_table[x].lastdice_res_container.children = self.all_list_table[x].lastdice_res_container.children.reverse()

      createjs.Tween.get(self.all_list_table[x].lastdice_res_container.children[self.all_list_table[x].lastdice_res_container.children.length - 5])
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

      createjs.Tween.get(self.all_list_table[x].lastdice_res_container.children[self.all_list_table[x].lastdice_res_container.children.length - 4])
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

      createjs.Tween.get(self.all_list_table[x].lastdice_res_container.children[self.all_list_table[x].lastdice_res_container.children.length - 3])
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

      createjs.Tween.get(self.all_list_table[x].lastdice_res_container.children[self.all_list_table[x].lastdice_res_container.children.length - 2])
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

      createjs.Tween.get(self.all_list_table[x].lastdice_res_container.children[self.all_list_table[x].lastdice_res_container.children.length - 1])
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

      self.all_list_table[x].status.text = window.language.lobby.result;

      if (self.all_thumbnial_table) {
        self.all_thumbnial_table[x].status.text = window.language.lobby.result;
      }
    }, //end game marks

    /**
     * @method counts recurring double/triple
     *
     * @param  array data marks
     */


    doubleTripleCount(data) {
      if (!self.all_list_table[x] || !self.all_list_table[x].double_val) return;
      if (!self.all_list_table[x] || !self.all_list_table[x].triple_val) return;

      data = _.filter(data, (row) => {
        return row.game_info
      });

      let data2 = _.map(data, function(e) {
        return JSON.parse(e.game_info);
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

      self.all_list_table[x].double_val.text = double_count;
      self.all_list_table[x].triple_val.text = triple_count;
    },
    /**
     * @method counts number percent occurence of specific data
     *
     * @param array data marks
     */
    setPercentages(data) {
      if (!self.all_list_table[x]) return
      data = _.filter(data, (row) => {
        return row.game_info
      });

      let data2 = _.map(data, function(e) {
        return [JSON.parse(e.game_info).one, JSON.parse(e.game_info).two, JSON.parse(e.game_info).three];
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

        if (e >= 10) {
          big_count++;
        } else {
          small_count++;
        }
      });
      if (!self.all_list_table[x].odd_bar) return;
      self.all_list_table[x].odd_bar.scaleX = .5;
      createjs.Tween.get(self.all_list_table[x].odd_bar)
        .to({
          scaleX: odd_count / data.length
        }, 250);

      if (!self.all_list_table[x].even_bar) return;
      self.all_list_table[x].even_bar.scaleX = .5;
      createjs.Tween.get(self.all_list_table[x].even_bar)
        .to({
          scaleX: even_count / data.length
        }, 250);

      if (!self.all_list_table[x].big_bar) return;
      self.all_list_table[x].big_bar.scaleX = .5;
      createjs.Tween.get(self.all_list_table[x].big_bar)
        .to({
          scaleX: big_count / data.length
        }, 250);

      if (!self.all_list_table[x].small_bar) return;
      self.all_list_table[x].small_bar.scaleX = .5;
      createjs.Tween.get(self.all_list_table[x].small_bar)
        .to({
          scaleX: small_count / data.length
        }, 250);

      self.all_list_table[x].odd_val.text = Math.round((odd_count / data.length) * 100) + "%";
      self.all_list_table[x].even_val.text = Math.round((even_count / data.length) * 100) + "%";
      self.all_list_table[x].big_val.text = Math.round((big_count / data.length) * 100) + "%";
      self.all_list_table[x].small_val.text = Math.round((small_count / data.length) * 100) + "%";
    },
    /**
     * @method draws roadmap/scoreaboard
     *
     * @param  array metrix data marks
     * @param  string "list" / "thumbnail"
     */
    drawRoadMap(rm_data, type) {

      if (type == "thumbnail") {
        if (!self.all_thumbnial_table[x]) return;
      } else {
        if (!self.all_list_table[x]) return;
      }
      let container = null;

      let xPos = 0;
      let yPos = 0;
      let r = 0;
      let mask = null;


      for (var key in rm_data) {
        if (type == "list" && self.all_list_table[x][key + "_container"]) {
          if (!self.all_list_table[x][key + "_container"]) return;

          self.all_list_table[x][key + "_container"].removeAllChildren();
          self.all_list_table[x][key + "_container"].x = 797;
          self.all_list_table[x][key + "_container"].y = self.all_list_table[x].y + 26;

          //	self.all_list_table[x][key+"_container"].visible = 0;

          container = self.all_list_table[x][key + "_container"];
          xPos = 31.75;
          yPos = 32.8;
          r = 14;

        } else if (type == "thumbnail" && self.all_thumbnial_table[x][key + "_container"]) {
          if (!self.all_thumbnial_table[x][key + "_container"]) return;
          self.all_thumbnial_table[x][key + "_container"].removeAllChildren();

          container = self.all_thumbnial_table[x][key + "_container"];
          xPos = 16
          yPos = 15.46//15.3;
          r = 7.5;
          // self.thumbnail_view.setChildIndex(self.all_thumbnial_table[x].maintenance_container, self.all_thumbnial_table[x].maintenance_container.parent.children.length-1)
        } else if (type == "thumbnail" && !self.all_thumbnial_table[x][key + "_container"]) {
          self.all_thumbnial_table[x][key + "_container"] = new createjs.Container();
          self.thumbnail_view.addChild(self.all_thumbnial_table[x][key + "_container"]);
          self.all_thumbnial_table[x][key + "_container"].x = self.all_thumbnial_table[x].x + 8;

          self.all_thumbnial_table[x][key + "_container"].y = self.all_thumbnial_table[x].y + 130;
          self.all_thumbnial_table[x][key + "_container"].visible = false;

          if (key + "_contianer" == "size_contianer") {
            self.all_thumbnial_table[x][key + "_container"].visible = true;
          }

          if (!mask) {
            mask = new createjs.Shape();
            mask.graphics.beginFill("red").drawRect(0, 0, 400, 110);
            mask.y = self.all_thumbnial_table[x].parity_container.y - 10
            mask.x = self.all_thumbnial_table[x].x
            mask.alpha = .3
          }

          self.all_thumbnial_table[x][key + "_container"].mask = mask;

          self.thumbnail_view.setChildIndex(self.all_thumbnial_table[x].bet_range_bg, self.thumbnail_view.children.length - 1)
          self.thumbnail_view.setChildIndex(self.all_thumbnial_table[x].bet_range_container, self.thumbnail_view.children.length - 1)
          self.thumbnail_view.setChildIndex(self.all_thumbnial_table[x].enter_button, self.thumbnail_view.children.length - 1)
          self.thumbnail_view.setChildIndex(self.all_thumbnial_table[x].enter_text, self.thumbnail_view.children.length - 1)
          container = self.all_thumbnial_table[x][key + "_container"];
          xPos = 16;
          yPos = 15.46//15.3;
          r = 7.5;

          // self.thumbnail_view.setChildIndex(self.all_thumbnial_table[x].maintenance_container, self.all_thumbnial_table[x].maintenance_container.parent.children.length-1)
        }

        let color = "";
        let text_val = "";
        let font_size = "bold 15px lato";

        let arr = rm_data[key];

        for (var e = 0; e < arr.length; e++) {
          if (arr[e] !== undefined) {
            for (var i = 0; i < arr[e].length; i++) {
              if (!arr[e][i]) continue;

              if (arr[e][i] !== undefined) {

                color = "#e5b241";
                text_val = arr[e][i];

                if (text_val.length > 2) {
                  font_size = "bold 12px lato"
                }

                if(type == "thumbnail") {
                    if (arr[e][i] == "odd") {
                      color = "#d32f2f";
                      text_val = window.language.locale == "zh" ? "单" : "O";
                      font_size = window.language.locale == "zh" ? "11px lato" : "15px lato";
                    }
                    if (arr[e][i] == "even") {
                      color = "#1565c0";
                      text_val = window.language.locale == "zh" ? "双" : "E";
                      font_size = "11px lato";
                    }
                    if (arr[e][i] == "big") {
                      color = "#d32f2f";
                      text_val = window.language.locale == "zh" ? "大" : "B";
                      font_size = window.language.locale == "zh" ? "11px lato" : "15px lato";
                    }
                    if (arr[e][i] == "small") {
                      color = "#1565c0";
                      text_val = window.language.locale == "zh" ? "小" : "S";
                      font_size = window.language.locale == "zh" ? "11px lato" : "15px lato";
                    }
                    if (arr[e][i] == "triple") {
                      color = "#41a257";
                      text_val = window.language.locale == "zh" ? "和" : "T";
                      font_size = window.language.locale == "zh" ? "11px lato" : "15px lato";
                    }
                } else {
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
                      color = "#d32f2f";
                      text_val = window.language.locale == "zh" ? "大" : "B";
                      font_size = window.language.locale == "zh" ? "15px lato" : "15px lato";
                    }
                    if (arr[e][i] == "small") {
                      color = "#1565c0";
                      text_val = window.language.locale == "zh" ? "小" : "S";
                      font_size = window.language.locale == "zh" ? "15px lato" : "15px lato";
                    }
                    if (arr[e][i] == "triple") {
                      color = "#41a257";
                      text_val = window.language.locale == "zh" ? "和" : "T";
                      font_size = window.language.locale == "zh" ? "15px lato" : "15px lato";
                    }
                }

                arr[e][i] = new createjs.Shape();
                arr[e][i].graphics.beginFill(color).drawCircle(0, 0, r);
                arr[e][i].x = e * xPos;
                arr[e][i].y = i * yPos;

                arr[e][i].text = new createjs.Text(text_val, font_size, "#fff");
                if (key == "dice" || key == "sum") {
                  arr[e][i].text = new createjs.Text(text_val, font_size, "#000");
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

        this.moveRoadMap(type, rm_data[key], key, type == "list" ? 6 : 6, type == "list" ? 17 : 24);

      }

      if (self.all_thumbnial_table && self.all_thumbnial_table.length && self.all_thumbnial_table[x].maintenanceCon) {
        self.thumbnail_view.setChildIndex(self.all_thumbnial_table[x].maintenanceCon, self.thumbnail_view.children.length - 1)
      }

    },
    /**
     * @method moves roadmap evertime appended data reaches bounds
     *
     * @param string type "list"/"thumbnail"
     * @param  array metrix
     * @param  selected container
     * @param  row
     * @param  col
     */
    moveRoadMap(type, arr, sel, row, col) {
      return;
      let p_count = 0;

      let lala = false;

      for (var i = 0; i < arr.length; i++) {
        if (i > (col - 1)) {
          lala = false;
          for (var e = 0; e < row; e++) {
            if (arr[i][e] !== undefined) {
              lala = true;
            }
          }

          if (lala) {
            p_count++;
          }
        }
      }
      if (type == "list") {
        self.all_list_table[x][sel + "_container"].x = 765 + ((p_count * 31.75) * (-1));
      } else {
        self.all_thumbnial_table[x][sel + "_container"].x = (self.all_thumbnial_table[x].x + 8) + ((p_count * 16) * (-1));
      }


    }

  } // end intance

  return instance;
}
