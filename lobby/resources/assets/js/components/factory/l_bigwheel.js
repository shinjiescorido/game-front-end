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
export default(self,data,x) => {
	instance = {

		createTable : function () {


			// === dealers
			self.all_list_table[x].dealer_img_bg.x = 178
			self.all_list_table[x].dealer_img_bg.y = 134 + self.all_list_table[x].y

			self.all_list_table[x].dealer_img.x = self.all_list_table[x].dealer_img_bg.x + 190;
                  self.all_list_table[x].dealer_img.y = self.all_list_table[x].dealer_img_bg.y + 190;
                  self.all_list_table[x].dealer_img.mask = self.all_list_table[x].dealer_img_bg

			self.all_list_table[x].dealer_name.text = data.currentDealer;
			self.all_list_table[x].dealer_name.x = 178;
			self.all_list_table[x].dealer_name.y = 198 + self.all_list_table[x].y;
			self.all_list_table[x].dealer_name.textAlign = "center";

			// === timer
			self.all_list_table[x].timer.x =  75;
			self.all_list_table[x].timer.y =  self.all_list_table[x].y + 33;

			if(window.language.locale == "en") {
				// === game rounds
				let game_rounds_label = new createjs.Text(window.language.lobby.game + "  :" ,"20px latoregular","#fff");
				game_rounds_label.x = 52;
				game_rounds_label.y = 238 + self.all_list_table[x].y;
				self.list_view.addChild(game_rounds_label);

				let game_label_width = game_rounds_label.getMeasuredWidth();

				self.all_list_table[x].round_num.text = data.currentRound;
				self.all_list_table[x].round_num.x = (game_rounds_label.x + game_label_width + 8);
				self.all_list_table[x].round_num.y = game_rounds_label.y;

				//=== table status
				self.all_list_table[x].status.text = window.language.lobby.nowbetting;
				self.all_list_table[x].status.x = game_rounds_label.x + 150;
				self.all_list_table[x].status.y = game_rounds_label.y;
			}

			if(window.language.locale == "jp") {
				// === game rounds
				let game_rounds_label = new createjs.Text(window.language.lobby.game + "  :" ,"20px latoregular","#fff");
				game_rounds_label.x = 52;
				game_rounds_label.y = 238 + self.all_list_table[x].y;
				self.list_view.addChild(game_rounds_label);

				let game_label_width = game_rounds_label.getMeasuredWidth();

				self.all_list_table[x].round_num.text = data.currentRound;
				self.all_list_table[x].round_num.x = (game_rounds_label.x + game_label_width + 8);
				self.all_list_table[x].round_num.y = game_rounds_label.y;

				//=== table status
				self.all_list_table[x].status.text = window.language.lobby.nowbetting;
				self.all_list_table[x].status.x = game_rounds_label.x + 150;
				self.all_list_table[x].status.y = game_rounds_label.y;
			}

			if(window.language.locale == "kr") {
				// === game rounds
				let game_rounds_label = new createjs.Text(window.language.lobby.game + "  :" ,"20px latoregular","#fff");
				game_rounds_label.x = 52;
				game_rounds_label.y = 238 + self.all_list_table[x].y;
				self.list_view.addChild(game_rounds_label);

				let game_label_width = game_rounds_label.getMeasuredWidth();

				self.all_list_table[x].round_num.text = data.currentRound;
				self.all_list_table[x].round_num.x = (game_rounds_label.x + game_label_width + 8);
				self.all_list_table[x].round_num.y = game_rounds_label.y;

				//=== table status
				self.all_list_table[x].status.text = window.language.lobby.nowbetting;
				self.all_list_table[x].status.x = game_rounds_label.x + 150;
				self.all_list_table[x].status.y = game_rounds_label.y;
			}

      //=== wheel bet percentages
      let images = {
        "bet_x1" : "/img/moneywheel-bets/bet_x1.png",
        "bet_x2" : "/img/moneywheel-bets/bet_x2.png",
        "bet_x5" : "/img/moneywheel-bets/bet_x5.png",
        "bet_x10" : "/img/moneywheel-bets/bet_x10.png",
        "bet_x20" : "/img/moneywheel-bets/bet_x20.png",
        "bet_x45" : "/img/moneywheel-bets/bet_x45.png",
      }
      for(let id of Object.keys(images)) {
        let img = new Image();
        img.src = images[id];
        img.id = id;
        images[id] = img;
      }

      let wheelbet_x1 = {};
      wheelbet_x1.bg = new createjs.Shape();
      wheelbet_x1.bg.graphics.beginFill("#937a0f").drawRoundRect(0, 0, 140, 70, 7);
      wheelbet_x1.bg.x = 375;
      wheelbet_x1.bg.y = self.all_list_table[x].y + 20;
      wheelbet_x1.bg.mask = new createjs.Shape();
      wheelbet_x1.bg.mask.graphics.beginFill("#000").drawRect(0, 0, 140, 70);
      wheelbet_x1.bg.mask.x = wheelbet_x1.bg.x;
      wheelbet_x1.bg.mask.y = wheelbet_x1.bg.y;
      wheelbet_x1.bg.mask.scaleX = 0;
      wheelbet_x1.bg.hitArea = new createjs.Shape();
      wheelbet_x1.bg.hitArea.graphics.beginFill("#000").drawRect(0, 0, 140, 70);
      wheelbet_x1.bg.hitArea.x = wheelbet_x1.bg.x;
      wheelbet_x1.bg.hitArea.y = wheelbet_x1.bg.y;
      wheelbet_x1.bg.hitArea.alpha = 0.01;
      self.list_view.addChild(wheelbet_x1.bg, wheelbet_x1.bg.hitArea);

      wheelbet_x1.border = new createjs.Shape();
      wheelbet_x1.border.graphics.beginStroke("#ffd54f").setStrokeStyle(2).drawRoundRect(0, 0, 140, 70, 7);
      wheelbet_x1.border.x = wheelbet_x1.bg.x;
      wheelbet_x1.border.y = wheelbet_x1.bg.y;
      self.list_view.addChild(wheelbet_x1.border);


      wheelbet_x1.img = new createjs.Bitmap(images.bet_x1);
      wheelbet_x1.img.scaleX = wheelbet_x1.img.scaleY = (70 / 81);
      wheelbet_x1.img.mask = wheelbet_x1.border;
      wheelbet_x1.img.x = wheelbet_x1.bg.x + 6;
      wheelbet_x1.img.y = wheelbet_x1.bg.y;
      wheelbet_x1.img.mouseEnabled = false;
      self.list_view.addChild(wheelbet_x1.img);

      wheelbet_x1.label = new createjs.Text("1", "45px OldStandard", "#ffd54f");
      wheelbet_x1.label.x = wheelbet_x1.bg.x + 90;
      wheelbet_x1.label.y = wheelbet_x1.bg.y + 10;
      wheelbet_x1.label.mouseEnabled = false;
      self.list_view.addChild(wheelbet_x1.label);

      wheelbet_x1.text = new createjs.Text("", "bold 30px BebasNeue", "#fff");
      // wheelbet_x1.text.textAlign
      wheelbet_x1.text.x = wheelbet_x1.bg.x + 85;
      wheelbet_x1.text.y = wheelbet_x1.bg.y + 15;
      wheelbet_x1.text.mouseEnabled = false;
      wheelbet_x1.text.alpha = 0;
      self.list_view.addChild(wheelbet_x1.text);



      let wheelbet_x2 = {};
      wheelbet_x2.bg = new createjs.Shape();
      wheelbet_x2.bg.graphics.beginFill("#0b4768").drawRoundRect(0, 0, 140, 70, 7);
      wheelbet_x2.bg.x = 530;
      wheelbet_x2.bg.y = self.all_list_table[x].y + 20;
      wheelbet_x2.bg.mask = new createjs.Shape();
      wheelbet_x2.bg.mask.graphics.beginFill("#000").drawRect(0, 0, 140, 70);
      wheelbet_x2.bg.mask.x = wheelbet_x2.bg.x;
      wheelbet_x2.bg.mask.y = wheelbet_x2.bg.y;
      wheelbet_x2.bg.mask.scaleX = 0;
      wheelbet_x2.bg.hitArea = new createjs.Shape();
      wheelbet_x2.bg.hitArea.graphics.beginFill("#000").drawRect(0, 0, 140, 70);
      wheelbet_x2.bg.hitArea.x = wheelbet_x2.bg.x;
      wheelbet_x2.bg.hitArea.y = wheelbet_x2.bg.y;
      wheelbet_x2.bg.hitArea.alpha = 0.01;
      self.list_view.addChild(wheelbet_x2.bg, wheelbet_x2.bg.hitArea);

      wheelbet_x2.border = new createjs.Shape();
      wheelbet_x2.border.graphics.beginStroke("#2b75bf").setStrokeStyle(2).drawRoundRect(0, 0, 140, 70, 7);
      wheelbet_x2.border.x = wheelbet_x2.bg.x;
      wheelbet_x2.border.y = wheelbet_x2.bg.y;
      self.list_view.addChild(wheelbet_x2.border);

      wheelbet_x2.img = new createjs.Bitmap(images.bet_x2);
      wheelbet_x2.img.scaleX = wheelbet_x2.img.scaleY = (70 / 81);
      wheelbet_x2.img.mask = wheelbet_x2.border;
      wheelbet_x2.img.x = wheelbet_x2.bg.x + 6;
      wheelbet_x2.img.y = wheelbet_x2.bg.y;
      wheelbet_x2.img.mouseEnabled = false;
      self.list_view.addChild(wheelbet_x2.img);

      wheelbet_x2.label = new createjs.Text("2", "45px OldStandard", "#2b75bf");
      wheelbet_x2.label.x = wheelbet_x2.bg.x + 90;
      wheelbet_x2.label.y = wheelbet_x2.bg.y + 10;
      wheelbet_x2.label.mouseEnabled = false;
      self.list_view.addChild(wheelbet_x2.label);

      wheelbet_x2.text = new createjs.Text("", "bold 30px BebasNeue", "#fff");
      // wheelbet_x2.text.textAlign
      wheelbet_x2.text.x = wheelbet_x2.bg.x + 85;
      wheelbet_x2.text.y = wheelbet_x2.bg.y + 15;
      wheelbet_x2.text.mouseEnabled = false;
      wheelbet_x2.text.alpha = 0;
      self.list_view.addChild(wheelbet_x2.text);



      let wheelbet_x5 = {};
      wheelbet_x5.bg = new createjs.Shape();
      wheelbet_x5.bg.graphics.beginFill("#2c4f10").drawRoundRect(0, 0, 140, 70, 7);
      wheelbet_x5.bg.x = 375;
      wheelbet_x5.bg.y = self.all_list_table[x].y + 105;
      wheelbet_x5.bg.mask = new createjs.Shape();
      wheelbet_x5.bg.mask.graphics.beginFill("#000").drawRect(0, 0, 140, 70);
      wheelbet_x5.bg.mask.x = wheelbet_x5.bg.x;
      wheelbet_x5.bg.mask.y = wheelbet_x5.bg.y;
      wheelbet_x5.bg.mask.scaleX = 0;
      wheelbet_x5.bg.hitArea = new createjs.Shape();
      wheelbet_x5.bg.hitArea.graphics.beginFill("#000").drawRect(0, 0, 140, 70);
      wheelbet_x5.bg.hitArea.x = wheelbet_x5.bg.x;
      wheelbet_x5.bg.hitArea.y = wheelbet_x5.bg.y;
      wheelbet_x5.bg.hitArea.alpha = 0.01;
      self.list_view.addChild(wheelbet_x5.bg, wheelbet_x5.bg.hitArea);

      wheelbet_x5.border = new createjs.Shape();
      wheelbet_x5.border.graphics.beginStroke("#689f38").setStrokeStyle(2).drawRoundRect(0, 0, 140, 70, 7);
      wheelbet_x5.border.x = wheelbet_x5.bg.x;
      wheelbet_x5.border.y = wheelbet_x5.bg.y;
      self.list_view.addChild(wheelbet_x5.border);

      wheelbet_x5.img = new createjs.Bitmap(images.bet_x5);
      wheelbet_x5.img.scaleX = wheelbet_x5.img.scaleY = (70 / 81);
      wheelbet_x5.img.mask = wheelbet_x5.border;
      wheelbet_x5.img.x = wheelbet_x5.bg.x + 6;
      wheelbet_x5.img.y = wheelbet_x5.bg.y;
      wheelbet_x5.img.mouseEnabled = false;
      self.list_view.addChild(wheelbet_x5.img);

      wheelbet_x5.label = new createjs.Text("5", "45px OldStandard", "#689f38");
      wheelbet_x5.label.x = wheelbet_x5.bg.x + 90;
      wheelbet_x5.label.y = wheelbet_x5.bg.y + 10;
      wheelbet_x5.label.mouseEnabled = false;
      self.list_view.addChild(wheelbet_x5.label);

      wheelbet_x5.text = new createjs.Text("", "bold 30px BebasNeue", "#fff");
      // wheelbet_x5.text.textAlign
      wheelbet_x5.text.x = wheelbet_x5.bg.x + 85;
      wheelbet_x5.text.y = wheelbet_x5.bg.y + 15;
      wheelbet_x5.text.mouseEnabled = false;
      wheelbet_x5.text.alpha = 0;
      self.list_view.addChild(wheelbet_x5.text);



      let wheelbet_x10 = {};
      wheelbet_x10.bg = new createjs.Shape();
      wheelbet_x10.bg.graphics.beginFill("#5b0d75").drawRoundRect(0, 0, 140, 70, 7);
      wheelbet_x10.bg.x = 530;
      wheelbet_x10.bg.y = self.all_list_table[x].y + 105;
      wheelbet_x10.bg.mask = new createjs.Shape();
      wheelbet_x10.bg.mask.graphics.beginFill("#000").drawRect(0, 0, 140, 70);
      wheelbet_x10.bg.mask.x = wheelbet_x10.bg.x;
      wheelbet_x10.bg.mask.y = wheelbet_x10.bg.y;
      wheelbet_x10.bg.mask.scaleX = 0;
      wheelbet_x10.bg.hitArea = new createjs.Shape();
      wheelbet_x10.bg.hitArea.graphics.beginFill("#000").drawRect(0, 0, 140, 70);
      wheelbet_x10.bg.hitArea.x = wheelbet_x10.bg.x;
      wheelbet_x10.bg.hitArea.y = wheelbet_x10.bg.y;
      wheelbet_x10.bg.hitArea.alpha = 0.01;
      self.list_view.addChild(wheelbet_x10.bg, wheelbet_x10.bg.hitArea);

      wheelbet_x10.border = new createjs.Shape();
      wheelbet_x10.border.graphics.beginStroke("#7e57c2").setStrokeStyle(2).drawRoundRect(0, 0, 140, 70, 7);
      wheelbet_x10.border.x = wheelbet_x10.bg.x;
      wheelbet_x10.border.y = wheelbet_x10.bg.y;
      self.list_view.addChild(wheelbet_x10.border);

      wheelbet_x10.img = new createjs.Bitmap(images.bet_x10);
      wheelbet_x10.img.scaleX = wheelbet_x10.img.scaleY = (70 / 81);
      wheelbet_x10.img.mask = wheelbet_x10.border;
      wheelbet_x10.img.x = wheelbet_x10.bg.x + 6;
      wheelbet_x10.img.y = wheelbet_x10.bg.y;
      wheelbet_x10.img.mouseEnabled = false;
      self.list_view.addChild(wheelbet_x10.img);

      wheelbet_x10.label = new createjs.Text("10", "45px OldStandard", "#7e57c2");
      wheelbet_x10.label.x = wheelbet_x10.bg.x + 80;
      wheelbet_x10.label.y = wheelbet_x10.bg.y + 10;
      wheelbet_x10.label.mouseEnabled = false;
      self.list_view.addChild(wheelbet_x10.label);

      wheelbet_x10.text = new createjs.Text("", "bold 30px BebasNeue", "#fff");
      // wheelbet_x10.text.textAlign
      wheelbet_x10.text.x = wheelbet_x10.bg.x + 85;
      wheelbet_x10.text.y = wheelbet_x10.bg.y + 15;
      wheelbet_x10.text.mouseEnabled = false;
      wheelbet_x10.text.alpha = 0;
      self.list_view.addChild(wheelbet_x10.text);



      let wheelbet_x20 = {};
      wheelbet_x20.bg = new createjs.Shape();
      wheelbet_x20.bg.graphics.beginFill("#b75700").drawRoundRect(0, 0, 140, 70, 7);
      wheelbet_x20.bg.x = 375;
      wheelbet_x20.bg.y = self.all_list_table[x].y + 190;
      wheelbet_x20.bg.mask = new createjs.Shape();
      wheelbet_x20.bg.mask.graphics.beginFill("#000").drawRect(0, 0, 140, 70);
      wheelbet_x20.bg.mask.x = wheelbet_x20.bg.x;
      wheelbet_x20.bg.mask.y = wheelbet_x20.bg.y;
      wheelbet_x20.bg.mask.scaleX = 0;
      wheelbet_x20.bg.hitArea = new createjs.Shape();
      wheelbet_x20.bg.hitArea.graphics.beginFill("#000").drawRect(0, 0, 140, 70);
      wheelbet_x20.bg.hitArea.x = wheelbet_x20.bg.x;
      wheelbet_x20.bg.hitArea.y = wheelbet_x20.bg.y;
      wheelbet_x20.bg.hitArea.alpha = 0.01;
      self.list_view.addChild(wheelbet_x20.bg, wheelbet_x20.bg.hitArea);

      wheelbet_x20.border = new createjs.Shape();
      wheelbet_x20.border.graphics.beginStroke("#ff8f00").setStrokeStyle(2).drawRoundRect(0, 0, 140, 70, 7);
      wheelbet_x20.border.x = wheelbet_x20.bg.x;
      wheelbet_x20.border.y = wheelbet_x20.bg.y;
      self.list_view.addChild(wheelbet_x20.border);

      wheelbet_x20.img = new createjs.Bitmap(images.bet_x20);
      wheelbet_x20.img.scaleX = wheelbet_x20.img.scaleY = (70 / 80);
      wheelbet_x20.img.mask = wheelbet_x20.border;
      wheelbet_x20.img.x = wheelbet_x20.bg.x + 6;
      wheelbet_x20.img.y = wheelbet_x20.bg.y;
      wheelbet_x20.img.mouseEnabled = false;
      self.list_view.addChild(wheelbet_x20.img);

      wheelbet_x20.label = new createjs.Text("20", "45px OldStandard", "#ff8f00");
      wheelbet_x20.label.x = wheelbet_x20.bg.x + 80;
      wheelbet_x20.label.y = wheelbet_x20.bg.y + 10;
      wheelbet_x20.label.mouseEnabled = false;
      self.list_view.addChild(wheelbet_x20.label);

      wheelbet_x20.text = new createjs.Text("", "bold 30px BebasNeue", "#fff");
      // wheelbet_x20.text.textAlign
      wheelbet_x20.text.x = wheelbet_x20.bg.x + 85;
      wheelbet_x20.text.y = wheelbet_x20.bg.y + 15;
      wheelbet_x20.text.mouseEnabled = false;
      wheelbet_x20.text.alpha = 0;
      self.list_view.addChild(wheelbet_x20.text);



      let wheelbet_x45 = {};
      wheelbet_x45.bg = new createjs.Shape();
      wheelbet_x45.bg.graphics.beginFill("#821010").drawRoundRect(0, 0, 140, 70, 7);
      wheelbet_x45.bg.x = 530;
      wheelbet_x45.bg.y = self.all_list_table[x].y + 190;
      wheelbet_x45.bg.mask = new createjs.Shape();
      wheelbet_x45.bg.mask.graphics.beginFill("#000").drawRect(0, 0, 140, 70);
      wheelbet_x45.bg.mask.x = wheelbet_x45.bg.x;
      wheelbet_x45.bg.mask.y = wheelbet_x45.bg.y;
      wheelbet_x45.bg.mask.scaleX = 0;
      wheelbet_x45.bg.hitArea = new createjs.Shape();
      wheelbet_x45.bg.hitArea.graphics.beginFill("#000").drawRect(0, 0, 140, 70);
      wheelbet_x45.bg.hitArea.x = wheelbet_x45.bg.x;
      wheelbet_x45.bg.hitArea.y = wheelbet_x45.bg.y;
      wheelbet_x45.bg.hitArea.alpha = 0.01;
      self.list_view.addChild(wheelbet_x45.bg, wheelbet_x45.bg.hitArea);

      wheelbet_x45.border = new createjs.Shape();
      wheelbet_x45.border.graphics.beginStroke("#e24242").setStrokeStyle(2).drawRoundRect(0, 0, 140, 70, 7);
      wheelbet_x45.border.x = wheelbet_x45.bg.x;
      wheelbet_x45.border.y = wheelbet_x45.bg.y;
      self.list_view.addChild(wheelbet_x45.border);

      wheelbet_x45.img = new createjs.Bitmap(images.bet_x45);
      wheelbet_x45.img.scaleX = wheelbet_x45.img.scaleY = (50 / 52);
      wheelbet_x45.img.mask = wheelbet_x45.border;
      wheelbet_x45.img.x = wheelbet_x45.bg.x + 16;
      wheelbet_x45.img.y = wheelbet_x45.bg.y + 10;
      wheelbet_x45.img.mouseEnabled = false;
      self.list_view.addChild(wheelbet_x45.img);

      wheelbet_x45.label = new createjs.Text("45", "45px OldStandard", "#e24242");
      wheelbet_x45.label.x = wheelbet_x45.bg.x + 80;
      wheelbet_x45.label.y = wheelbet_x45.bg.y + 10;
      wheelbet_x45.label.mouseEnabled = false;
      self.list_view.addChild(wheelbet_x45.label);

      wheelbet_x45.text = new createjs.Text("", "bold 30px BebasNeue", "#fff");
      // wheelbet_x45.text.textAlign
      wheelbet_x45.text.x = wheelbet_x45.bg.x + 85;
      wheelbet_x45.text.y = wheelbet_x45.bg.y + 15;
      wheelbet_x45.text.mouseEnabled = false;
      wheelbet_x45.text.alpha = 0;
      self.list_view.addChild(wheelbet_x45.text);



      self.all_list_table[x].wheelbets = [
        wheelbet_x1, wheelbet_x2, wheelbet_x5, wheelbet_x10, wheelbet_x20, wheelbet_x45
      ];


      this.setWinPercentage(data.marks);
      for(let i = 0; i < self.all_list_table[x].wheelbets.length; i++) {
        self.all_list_table[x].wheelbets[i].bg.hitArea.on("rollover", (e) => {
          createjs.Tween.get(self.all_list_table[x].wheelbets[i].text, {override: true})
            .to({
              alpha: 1
            }, 400);

          createjs.Tween.get(self.all_list_table[x].wheelbets[i].label, {override: true})
            .to({
              alpha: 0
            }, 400);
        }, true);
        self.all_list_table[x].wheelbets[i].bg.hitArea.on("rollout", (e) => {
          createjs.Tween.get(self.all_list_table[x].wheelbets[i].text, {override: true})
            .to({
              alpha: 0
            }, 400);

          createjs.Tween.get(self.all_list_table[x].wheelbets[i].label, {override: true})
            .to({
              alpha: 1
            }, 400);
        }, true);

      }




      // === game marks
      this.makeGameMarks(41, 2);
      self.all_list_table[x].game_marks = this.drawGameMarks(15, 6);
      self.list_view.addChild(self.all_list_table[x].game_marks.con);

      //Maintenance
			let header_bg = [];
			let text_color = "";

			self.all_list_table[x].maintenanceCon = new createjs.Container();
			self.all_list_table[x].maintenanceCon.visible = false;
			self.list_view.addChild(self.all_list_table[x].maintenanceCon);

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
			self.all_list_table[x].maintenanceBg.graphics.beginFill("#333333").drawRoundRect(0, 0, 1640, 283, 6);
			self.all_list_table[x].maintenanceBg.x = self.all_list_table[x].x;
			self.all_list_table[x].maintenanceBg.y = self.all_list_table[x].y;
			self.all_list_table[x].maintenanceBg.table_id = data.tableNumber;
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceBg);

			self.all_list_table[x].maintenanceHeader = new createjs.Shape();
			self.all_list_table[x].maintenanceHeader.x = self.all_list_table[x].x;
			self.all_list_table[x].maintenanceHeader.y = self.all_list_table[x].y;
			self.all_list_table[x].maintenanceHeader.graphics.beginLinearGradientFill(["#8e24aa", "#4d168e"],[0,1],0,0,1640,10).drawRoundRectComplex(0,0,1640,50,10,10,0,0);
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceHeader);

			self.all_list_table[x].table_name = new createjs.Text(window.language.lobby.spinwin,"20px ArvoItalic","#fdba44");
			self.all_list_table[x].table_name.x = 170;
			self.all_list_table[x].table_name.y = 13 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].table_name);

			self.all_list_table[x].table_num = new createjs.Text(data.tableNumber.length < 2 ? "0"+data.tableNumber : data.tableNumber,"21px ArvoBold","#fdba44");
			self.all_list_table[x].table_num.x = 140;
			self.all_list_table[x].table_num.y = 11 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].table_num);

			self.all_list_table[x].maintenanceLogo = new createjs.Bitmap(self.context.getResources("maintenance_ico"));
			self.all_list_table[x].maintenanceLogo.x = 600;
			self.all_list_table[x].maintenanceLogo.y = 90 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceLogo);

			self.all_list_table[x].maintenanceTxt = new createjs.Text('', '30px bebasneue', '#ffb547');
			self.all_list_table[x].maintenanceTxt.x = 770;
			self.all_list_table[x].maintenanceTxt.y = 110 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceTxt.textAlign = 'left';
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceTxt);

			self.all_list_table[x].maintenanceSubTxt = new createjs.Text('', '28px bebasneue', '#fff');
			self.all_list_table[x].maintenanceSubTxt.x = 770;
			self.all_list_table[x].maintenanceSubTxt.y = 150 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceSubTxt.textAlign = 'left';
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceSubTxt);

			self.all_list_table[x].maintenanceTime = new createjs.Text('', '26px bebasneue', '#fff');
			self.all_list_table[x].maintenanceTime.x = 770;
			self.all_list_table[x].maintenanceTime.y = 185 + self.all_list_table[x].y;
			self.all_list_table[x].maintenanceTime.textAlign = 'left';
			self.all_list_table[x].maintenanceCon.addChild(self.all_list_table[x].maintenanceTime);


			this.checkMaintenance(data, false);

		}, //end createtable function


    checkMaintenance(data, socket) {

			if(!self.all_list_table[x] || !self.all_list_table[x].maintenanceCon) return;

			let maintenance = false;
			let activeMaintenance;

			if (!socket) {
				let mainMaintenance = data.mainMaintenance.status;
				let maintenanceSetting = data.maintenanceSetting;

				// if (mainMaintenance == 1) {
				// 	maintenance = true;
				// }

				for (var i = 0; i < maintenanceSetting.length; i++) {
					if (maintenanceSetting[i].status == 1) {
						maintenance = true;
						activeMaintenance = maintenanceSetting[i];
					}
				}
			}
			else {
				if (data.status) {
					maintenance = true;
          activeMaintenance = data;
				}
				else {
					maintenance = false;
				}
			}

			if (maintenance) {
				self.all_list_table[x].maintenanceCon.visible = true;
				self.all_list_table[x].maintenanceTxt.text = activeMaintenance.main_text;
				self.all_list_table[x].maintenanceSubTxt.text = activeMaintenance.sub_text;
				self.all_list_table[x].maintenanceTime.text = activeMaintenance.start_time +' ~ '+ activeMaintenance.end_time;
			}
			else {
				self.all_list_table[x].maintenanceCon.visible = false;
			}
		},


    /**
		 * @method update stage with new data
		 *
		 * @param data
		 */
    setResult (data) {
      if(!self.all_list_table[x]) return;
      self.all_list_table[x].status.text = data.marks[data.marks.length - 1].mark.num.toString() + " wins";
      this.updateGameMarks(data.marks[data.marks.length - 1].mark.num.toString());
      this.setWinPercentage(data.marks);
    },



		/**
		 * @method draws game marks
		 *
		 * @param Container, columns, rows, mark size, mark padding
		 */

    // drawGameMarks(cols, rows) {
    //   let con = new createjs.Container();
    //   con.x = 700;
    //   con.y = self.all_list_table[x].y + 20;
    //   con.name = "game_marks_container";
    //
    //   let size = self.mark.size;
    //
    //   let latest;
    //   let mark_num = [];
    //   let marks = [];
    //   let num = []
    //   let max = cols * rows;
    //
    //   mark_num = data.marks;
    //   if(data.marks.length > max) {
    //     mark_num = data.marks.slice(data.marks.length - max);
    //   }
    //
    //   mark_num = mark_num.filter((a)=>{
    //     if(a != null) {
    //       if(a.mark)
    //         return a.mark.num;
    //     }
    //   });
    //
    //
    //   for(let i = 0; i < mark_num.length; i++) {
    //     let m;
    //     let l;
    //     let j = (mark_num.length - 1) - i;
    //     num[i] = mark_num[i].mark.num;
    //     if(i == mark_num.length - 1) {
    //       m = self.latest_mark.bg[num[i]].clone();
    //       l = self.latest_mark.label[num[i]].clone();
    //       latest = {
    //         "bg": m,
    //         "label": l,
    //         "posX": size / 2,
    //         "posY": size / 2,
    //         "num": num[i]
    //       };
    //     }
    //     else {
    //       m = self.mark.bg[num[i]].clone();
    //       l = self.mark.label[num[i]].clone();
    //     }
    //
    //     m.x = (j % cols) * size + (size / 2);
    //     m.y = Math.floor(j / cols) * size + (size / 2);
    //     l.x = m.x;
    //     l.y = m.y;
    //
    //     marks[i] = {
    //       "bg": m,
    //       "label": l,
    //       "posX": m.x,
    //       "posY": m.y
    //     };
    //     con.addChild(m, l);
    //
    //   } // end for
    //
    //   con.setBounds(0, 0, size * cols, size * rows);
    //   con.cache(0, 0, size * cols, size * rows);
    //
    //   return {"marks": marks, "latest": latest, "con": con, "size": size, "cols": cols, "rows": rows, "bounds": con.getBounds()};
    //
    // },

    drawGameMarks(cols, rows) {
      let con = new createjs.Container();
      let size = self.mark.size;
      let initmax = (cols - 2) * rows;
      let max = cols * rows
      let marks = [];
      let table = drawTable();

      con.x = table.x =  710;
      con.y = table.y = self.all_list_table[x].y + 20;
      con.name = "game_marks_container";
      self.list_view.addChild(table);


      let mark_num = data.marks;
      mark_num = mark_num.filter((a)=>{
        if(a != null) {
          if(a.mark)
            return a.mark.num;
        }
      });
      if(mark_num.length >= initmax) {
        mark_num = mark_num.slice(mark_num.length - initmax);
      }


      mark_num.forEach((num, i)=>{
        let m;
        let l;
        num = num.mark.num;

        m = self.mark.bg[num].clone();
        l = self.mark.label[num].clone();

        m.x = l.x = Math.floor(i / rows) * size + (size / 2);
        m.y = l.y = (i % rows) * size + (size / 2);

        marks[i] = {"bg":m, "label":l, "posX":m.x, "posY":m.y};
        con.addChild(m, l);

      });


      function drawTable() {
        let width = cols * size;
        let height = rows * size;

        let b = new createjs.Shape();
        b.graphics.setStrokeStyle(0.5).beginStroke("#a0a0a0");
        b.graphics.beginFill("#3f3f3f").drawRect(0, 0, width, height);
        b.graphics.beginFill("transparent");
        for(let i = 1; i < cols; i++) {
          b.graphics.moveTo(i * size, 0).lineTo(i * size, height);
        } // end for


        for(let i = 0; i < rows; i++) {
          b.graphics.moveTo(0, i * size).lineTo(width, i * size);
        } // end for


        return b;
      }

      return {"marks": marks, "con": con, "size": size, "cols": cols, "rows": rows, "last": marks.length};
    },

    // updateGameMarks(mark_num) {
    //   let gm = self.all_list_table[x].game_marks;
    //   let last = self.all_list_table[x].game_marks.marks.length - 1;
    //   let new_mark = {
    //     "bg": self.latest_mark.bg[mark_num].clone(),
    //     "label": self.latest_mark.label[mark_num].clone(),
    //     "posX": gm.size / 2,
    //     "posY": gm.size / 2,
    //     "num": mark_num
    //   }
    //
    //   new_mark.bg.x = new_mark.label.x = new_mark.posX;
    //   new_mark.bg.y = new_mark.label.y = new_mark.posY;
    //
    //   if(gm.marks.length > 0) {
    //     gm.con.removeChild(gm.marks[last].bg, gm.marks[last].label);
    //     gm.marks[last].bg = self.mark.bg[gm.latest.num].clone();
    //     gm.marks[last].label = self.mark.label[gm.latest.num].clone();
    //     gm.marks[last].bg.x = gm.marks[last].label.x = gm.marks[last].posX;
    //     gm.marks[last].bg.y = gm.marks[last].label.y = gm.marks[last].posY;
    //
    //     gm.con.addChild(gm.marks[last].bg, gm.marks[last].label);
    //   }
    //
    //   gm.con.uncache();
    //
    //   createjs.Tween.get(new_mark.bg)
    //     .to({ alpha: 0.3 }, 250).to({ alpha: 1 }, 250)
    //     .to({ alpha: 0.3 }, 250).to({ alpha: 1 }, 250)
    //     .to({ alpha: 0.3 }, 250).to({ alpha: 1 }, 250);
    //
    //   gm.con.addChild(new_mark.bg, new_mark.label);
    //   gm.marks.push(new_mark);
    //   gm.latest = new_mark;
    //
    //   for(let i = 0;  i < gm.marks.length; i++) {
    //     if(i > 0){
    //       createjs.Tween.get(gm.marks[i].bg)
    //         .to({
    //           x: gm.marks[i - 1].posX,
    //           y: gm.marks[i - 1].posY,
    //           alpha: 0.5
    //         }, 300, createjs.Ease.quartOut)
    //         .to({
    //           alpha: 1
    //         }, 200).call(function(){
    //           gm.marks[i].posX = gm.marks[i - 1].posX;
    //           gm.marks[i].posY = gm.marks[i - 1].posY;
    //           setTimeout(() => {
    //             gm.con.cache(0, 0, gm.size * gm.cols, gm.size * gm.rows);
    //           }, 1500);
    //         });
    //       createjs.Tween.get(gm.marks[i].label)
    //         .to({
    //           x: gm.marks[i - 1].posX,
    //           y: gm.marks[i - 1].posY,
    //           alpha: 0.5
    //         }, 300, createjs.Ease.quartOut)
    //         .to({
    //           alpha: 1
    //         }, 200);
    //     } // end if (i >0)
    //     else {
    //       if(gm.marks.length >= gm.cols * gm.rows) {
    //         createjs.Tween.get(gm.marks[i].bg)
    //           .to({
    //             alpha: 0
    //           }, 550).call(function(){
    //             gm.con.removeChild(gm.marks[i].bg, gm.marks[i].label);
    //             gm.marks.splice(i, 1);
    //           });
    //         createjs.Tween.get(gm.marks[i].label)
    //           .to({
    //             alpha: 0
    //           }, 550);
    //       } // end if
    //       else {
    //         createjs.Tween.get(gm.marks[i].bg)
    //           .to({
    //             x: ((last + 1) % gm.cols) * gm.size + (gm.size / 2),
    //             y: Math.floor((last + 1) / gm.cols) * gm.size + (gm.size / 2)
    //           }, 550)
    //           .call(function(){
    //             gm.marks[i].posX = ((last + 1) % gm.cols) * gm.size + (gm.size / 2);
    //             gm.marks[i].posY = Math.floor((last + 1) / gm.cols) * gm.size + (gm.size / 2);
    //           });
    //         createjs.Tween.get(gm.marks[i].label)
    //           .to({
    //             x: ((last + 1) % gm.cols) * gm.size + (gm.size / 2),
    //             y: Math.floor((last + 1) / gm.cols) * gm.size + (gm.size / 2)
    //           }, 550);
    //       }
    //     }
    //   } // end for
    //
    // },

    updateGameMarks(num) {
      let gm = self.all_list_table[x].game_marks;
      let max = self.all_list_table[x].game_marks.cols * self.all_list_table[x].game_marks.rows;
      let new_mark = {
        "bg": self.mark.bg[num].clone(),
        "label": self.mark.label[num].clone(),
        "num": num,
        "posX": Math.floor((gm.last) / gm.rows) * gm.size + (gm.size / 2),
        "posY": ((gm.last) % gm.rows) * gm.size + (gm.size / 2)
      }
      new_mark.bg.x = new_mark.label.x = new_mark.posX;
      new_mark.bg.y = new_mark.label.y = new_mark.posY;

      gm.marks.push(new_mark);
      gm.last++;
      let toX = gm.con.x - (gm.size * 2)
      if(gm.marks.length >= max) {
        for(let i = 0; i < (gm.rows * 2); i++) {  gm.con.removeChild(gm.marks[i].bg, gm.marks[i].label);  }
        gm.marks.splice(0, (gm.rows * 2))
        createjs.Tween.get(gm.con, {override:true})
          .to({ alpha: 0.2, x: toX }, 250)
          .to({ alpha: 1 }, 200).call(function() {
            addNewMark();
          });
      }
      else { addNewMark(); }

      function addNewMark() {
        gm.con.addChild(new_mark.bg, new_mark.label);
        createjs.Tween.get(new_mark.bg)
          .to({ alpha: 0.3 }, 250).to({ alpha: 1 }, 250)
          .to({ alpha: 0.3 }, 250).to({ alpha: 1 }, 250)
          .to({ alpha: 0.3 }, 250).to({ alpha: 1 }, 250);
      }


    },

    setWinPercentage(data_marks) {
      let win_perc = this.getResultPercentage(data_marks);
      for(let i = 0; i < self.all_list_table[x].wheelbets.length; i++) {
        createjs.Tween.get(self.all_list_table[x].wheelbets[i].bg.mask)
          .to({
            scaleX: win_perc[i]
          }, 400);

        self.all_list_table[x].wheelbets[i].text.text = Math.ceil(win_perc[i] * 100) + "%";
      }

    },



    getResultPercentage(data_marks) {
      let win_perc = [];
      let wheelbets = [1, 2, 5, 10, 20, 45];
      let mark_num = [];

      for(let i = 0; i < data_marks.length; i++) {
        if(data_marks[i] == null) continue;
        if(data_marks[i].mark == null) continue;
        mark_num[i] = data_marks[i].mark.num;
      }

      for(let i = 0; i < wheelbets.length; i++) {
          win_perc[i] = mark_num.filter(function(x){
            return x == wheelbets[i];
          }).length;
          win_perc[i] = (win_perc[i] / mark_num.length);
      } // end for

      return win_perc;
    },


    makeGameMarks(size, padding) {
      let bg = {};
      let label = {};
      let bg_latest = {};
      let label_latest = {};

      let r = (size / 2) - padding;
      let colors_l = ["#ffd54f", "#00acc1", "#689f38", "#7e57c2", "#ff8f00", "#e24242"];
      let colors_d = ["#937a0f", "#0b4768", "#2c4f10", "#5b0d75", "#b75700", "#821010"];
      let text = ["1", "2", "5", "10", "20", "45"];

      for (let i = 0; i < text.length; i++) {
        // bg[text[i]] = new createjs.Shape();
        // bg[text[i]].graphics.beginFill(colors_d[i]).beginStroke(colors_l[i]).setStrokeStyle(1.5).drawCircle(0, 0, r);
        // bg[text[i]].setBounds(-r, -r, size, size);
        // bg[text[i]].name = "bg " + [text[i]];
        // label[text[i]] = new createjs.Text(text[i], "20px BebasNeue", colors_l[i]);
        // label[text[i]].textAlign = "center";
        // label[text[i]].textBaseline = "middle";
        // label[text[i]].name = "label " + [text[i]];

        bg[text[i]] = new createjs.Shape();
        bg[text[i]].graphics.beginFill(colors_l[i]).drawCircle(0, 0, r);
        bg[text[i]].setBounds(-r, -r, size, size);
        bg[text[i]].name = "bg " + [text[i]];
        label[text[i]] = new createjs.Text(text[i], "26px BebasNeue", "#333333");
        label[text[i]].textAlign = "center";
        label[text[i]].textBaseline = "middle";
        label[text[i]].name = "label " + [text[i]];

        // bg_latest[text[i]] = new createjs.Shape();
        // bg_latest[text[i]].graphics.beginFill(colors_l[i]).beginStroke("#000").setStrokeStyle(0.2).drawCircle(0, 0, r - 2)
        //   .beginFill("").beginStroke(colors_l[i]).setStrokeStyle(1.3).drawCircle(0, 0, r);
        // bg_latest[text[i]].setBounds(-r, -r, size, size);
        // bg_latest[text[i]].name = "bg_latest " + [text[i]];
        // label_latest[text[i]] = new createjs.Text(text[i], "20px BebasNeue", "#000");
        // label_latest[text[i]].textAlign = "center";
        // label_latest[text[i]].textBaseline = "middle";
        // label_latest[text[i]].name = "label_latest " + [text[i]];
      } // end for

      self.mark = {"bg": bg, "label": label, "size": size};
      // self.latest_mark = {"bg": bg_latest, "label": label_latest};

    }


	} // end instance

	return instance;
}
