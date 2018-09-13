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
			self.all_list_table[x].dealer_img_bg.x = 100;
			self.all_list_table[x].dealer_img_bg.y = 134 + self.all_list_table[x].y;

			self.all_list_table[x].dealer_img.x = self.all_list_table[x].dealer_img_bg.x + 190;
			self.all_list_table[x].dealer_img.y = self.all_list_table[x].dealer_img_bg.y + 190;
			self.all_list_table[x].dealer_img.mask = self.all_list_table[x].dealer_img_bg

			self.all_list_table[x].dealer_name.text = data.currentDealer;
			self.all_list_table[x].dealer_name.x = 100;
			self.all_list_table[x].dealer_name.y = 205 + self.all_list_table[x].y;
			self.all_list_table[x].dealer_name.textAlign = "center";

			// === timer
			self.all_list_table[x].timer.x = -2;
			self.all_list_table[x].timer.y = self.all_list_table[x].y + 33;

			if(window.language.locale == "en") {
				// === game rounds
				let game_rounds_label = new createjs.Text(window.language.lobby.game + "  :" ,"20px latoregular","#fff");
				game_rounds_label.x = 48;
				game_rounds_label.y = 240 + self.all_list_table[x].y;
				self.list_view.addChild(game_rounds_label);

				let game_label_width = game_rounds_label.getMeasuredWidth();

				self.all_list_table[x].round_num.text = data.currentRound;
				self.all_list_table[x].round_num.x = (game_rounds_label.x + game_label_width + 8);
				self.all_list_table[x].round_num.y = game_rounds_label.y;

				// === round result dice
				self.all_list_table[x].dice_result_con = new createjs.Container();
				self.list_view.addChild(self.all_list_table[x].dice_result_con);
				this.setDiceResult(data);
				self.all_list_table[x].status.text = roundStatusTxt;
				self.all_list_table[x].status.x = game_rounds_label.x + 205;
				self.all_list_table[x].status.y = game_rounds_label.y;
				self.all_list_table[x].status.textAlign = 'center';
			}

			if(window.language.locale == "jp") {
				// === game rounds
				let game_rounds_label = new createjs.Text(window.language.lobby.game + "  :" ,"20px latoregular","#fff");
				game_rounds_label.x = 48;
				game_rounds_label.y = 240 + self.all_list_table[x].y;
				self.list_view.addChild(game_rounds_label);

				let game_label_width = game_rounds_label.getMeasuredWidth();

				self.all_list_table[x].round_num.text = data.currentRound;
				self.all_list_table[x].round_num.x = (game_rounds_label.x + game_label_width + 8);
				self.all_list_table[x].round_num.y = game_rounds_label.y;

				// === round result dice
				self.all_list_table[x].dice_result_con = new createjs.Container();
				self.list_view.addChild(self.all_list_table[x].dice_result_con);
				this.setDiceResult(data);
				self.all_list_table[x].status.text = roundStatusTxt;
				self.all_list_table[x].status.x = game_rounds_label.x + 205;
				self.all_list_table[x].status.y = game_rounds_label.y;
				self.all_list_table[x].status.textAlign = 'center';
			}

			if(window.language.locale == "kr") {
				// === game rounds
				let game_rounds_label = new createjs.Text(window.language.lobby.game + "  :" ,"20px latoregular","#fff");
				game_rounds_label.x = 48;
				game_rounds_label.y = 240 + self.all_list_table[x].y;
				self.list_view.addChild(game_rounds_label);

				let game_label_width = game_rounds_label.getMeasuredWidth();

				self.all_list_table[x].round_num.text = data.currentRound;
				self.all_list_table[x].round_num.x = (game_rounds_label.x + game_label_width + 8);
				self.all_list_table[x].round_num.y = game_rounds_label.y;

				// === round result dice
				self.all_list_table[x].dice_result_con = new createjs.Container();
				self.list_view.addChild(self.all_list_table[x].dice_result_con);
				this.setDiceResult(data);
				self.all_list_table[x].status.text = roundStatusTxt;
				self.all_list_table[x].status.x = game_rounds_label.x + 205;
				self.all_list_table[x].status.y = game_rounds_label.y;
				self.all_list_table[x].status.textAlign = 'center';
			}

			//=== table status
			let roundStatusTxt = '';
			switch(data.roundStatus) {
								case "S" :
									roundStatusTxt = window.language.lobby.nowbetting;
										break;

								case "H" :
									roundStatusTxt = window.language.lobby.roundhold;
										break;

								case "E" :
									roundStatusTxt = window.language.lobby.bettingend;
										break;

								case "P" :
									roundStatusTxt = window.language.lobby.bettingend;
										break;
						} // end switch

			// === latest result
			let result_bg = new createjs.Shape();
			result_bg.graphics.beginFill("#333333").drawRoundRect(0,0,160,264,10);
			result_bg.x = 370;
			result_bg.y = 10 + self.all_list_table[x].y;
			self.list_view.addChild(result_bg);

			let result_label = new createjs.Text(window.language.lobby.latestresult.toUpperCase(), "bold 17px latoregular", "#fff");
			result_label.x = 445;
			result_label.y = 16 + self.all_list_table[x].y;
			result_label.textAlign = "center";
			self.list_view.addChild(result_label);

			let latest_res_bg = new createjs.Shape();
			latest_res_bg.graphics.beginFill("#333333").drawRect(0,0,160,225);
			latest_res_bg.x = result_bg.x;
			latest_res_bg.y = 45 + self.all_list_table[x].y;
			self.list_view.addChild(latest_res_bg);

			// === set 5 latest results
			self.all_list_table[x].latest_results_con = new createjs.Container();
			self.list_view.addChild(self.all_list_table[x].latest_results_con);
			this.setResult(data);

			// === roadmap
			let roadmap_bg = new createjs.Shape();
			roadmap_bg.graphics.ss(1).s("#5e5e5e").beginFill("#3f3f3f").drawRect(0,0,532,240);
			roadmap_bg.x = 540;
			roadmap_bg.y = 22 + self.all_list_table[x].y;
			self.list_view.addChild(roadmap_bg);

			let roadmapGridVer = [];
			let roadmapGridHor = [];

			for (var i = 0; i < 13; i++) {
				roadmapGridVer[i] = new createjs.Shape();
			    roadmapGridVer[i].graphics.setStrokeStyle(1).beginStroke("#616161").moveTo((38*i)+578, 22+self.all_list_table[x].y).lineTo((38*i)+578, 262+self.all_list_table[x].y);
			   	self.list_view.addChild(roadmapGridVer[i]);
			}

			for (var i = 0; i < 5; i++) {
				roadmapGridHor[i] = new createjs.Shape();
			    roadmapGridHor[i].graphics.setStrokeStyle(1).beginStroke("#616161").moveTo(540, (40*i)+62+self.all_list_table[x].y).lineTo(1070, (40*i)+62+self.all_list_table[x].y);
			    self.list_view.addChild(roadmapGridHor[i]);
			}

			// === set roadmap data
			self.all_list_table[x].roadmap_con = new createjs.Container();
			self.list_view.addChild(self.all_list_table[x].roadmap_con);
			self.all_list_table[x].roadmap_con.mask = roadmap_bg;

			if (data.marks.length > 72) {
				self.all_list_table[x].loopStart = data.marks.length - 72;
			}
			else {
				self.all_list_table[x].loopStart = 0;
			}

			self.all_list_table[x].dataCheck = 0;
			this.drawRoadMap(data.marks);

			// === scoreboard arcs
			self.all_list_table[x].whiteStatCircle = new createjs.Shape();
		    self.all_list_table[x].whiteStatCircle.graphics.setStrokeStyle(13).beginStroke('#fff');
		    self.all_list_table[x].whiteStatCircle.graphics.arc(0, 0, 70, this.setDegreeToRadians(270), this.setDegreeToRadians(90));
		    self.all_list_table[x].whiteStatCircle.x = 1210;
			self.all_list_table[x].whiteStatCircle.y = 100 + self.all_list_table[x].y;
			self.list_view.addChild(self.all_list_table[x].whiteStatCircle);

			self.all_list_table[x].redStatCircle = new createjs.Shape();
	      	self.all_list_table[x].redStatCircle.graphics.setStrokeStyle(13).beginStroke('#b71c1c');
	      	self.all_list_table[x].redStatCircle.graphics.arc(0, 0, 70, this.setDegreeToRadians(90), this.setDegreeToRadians(270));
		    self.all_list_table[x].redStatCircle.x = 1210;
			self.all_list_table[x].redStatCircle.y = 100 + self.all_list_table[x].y;
			self.list_view.addChild(self.all_list_table[x].redStatCircle);

			self.all_list_table[x].gold2StatCircle = new createjs.Shape();
      		self.all_list_table[x].gold2StatCircle.graphics.setStrokeStyle(13).beginStroke('#b28834');
      		self.all_list_table[x].gold2StatCircle.graphics.arc(0, 0, 58, this.setDegreeToRadians(270), this.setDegreeToRadians(90));
		    self.all_list_table[x].gold2StatCircle.x = 1210;
			self.all_list_table[x].gold2StatCircle.y = 100 + self.all_list_table[x].y;
			self.list_view.addChild(self.all_list_table[x].gold2StatCircle);

			self.all_list_table[x].gold1StatCircle = new createjs.Shape();
      		self.all_list_table[x].gold1StatCircle.graphics.setStrokeStyle(13).beginStroke('#e5b241');
      		self.all_list_table[x].gold1StatCircle.graphics.arc(0, 0, 58, this.setDegreeToRadians(90), this.setDegreeToRadians(270));
		    self.all_list_table[x].gold1StatCircle.x = 1210;
			self.all_list_table[x].gold1StatCircle.y = 100 + self.all_list_table[x].y;
			self.list_view.addChild(self.all_list_table[x].gold1StatCircle);

			// === scoreboard labels
			let whiteStatLbl = new createjs.Text(window.language.statistics.whitecaps,'bold 15px Lato','#c4c4c4');
			whiteStatLbl.x = self.all_list_table[x].whiteStatCircle.x + 85;
			whiteStatLbl.y = self.all_list_table[x].whiteStatCircle.y - 25;
			self.list_view.addChild(whiteStatLbl);

			let redStatLbl = new createjs.Text(window.language.statistics.redcaps,'bold 15px Lato','#d32f2f');
			redStatLbl.x = self.all_list_table[x].whiteStatCircle.x - 115;
			redStatLbl.y = whiteStatLbl.y;
			self.list_view.addChild(redStatLbl);

			let gold2StatLbl = new createjs.Text('2N','bold 15px Lato','#e5b241');
			gold2StatLbl.x = whiteStatLbl.x - 65;
			gold2StatLbl.y = whiteStatLbl.y;
			self.list_view.addChild(gold2StatLbl);

			let gold1StatLbl = new createjs.Text('1N','bold 15px Lato','#e5b241');
			gold1StatLbl.x = gold2StatLbl.x - 60;
			gold1StatLbl.y = gold2StatLbl.y;
			self.list_view.addChild(gold1StatLbl);

			// === scoreboard percentages
			self.all_list_table[x].whiteStatPerc = new createjs.Text(0,'normal 17px bebasneue','#fff');
			self.all_list_table[x].whiteStatPerc.x = whiteStatLbl.x;
			self.all_list_table[x].whiteStatPerc.y = whiteStatLbl.y + 20;
			self.list_view.addChild(self.all_list_table[x].whiteStatPerc);

			self.all_list_table[x].redStatPerc = new createjs.Text(0,'normal 17px bebasneue','#fff');
			self.all_list_table[x].redStatPerc.x = redStatLbl.x;
			self.all_list_table[x].redStatPerc.y = self.all_list_table[x].whiteStatPerc.y;
			self.list_view.addChild(self.all_list_table[x].redStatPerc);

			self.all_list_table[x].gold2StatPerc = new createjs.Text(0,'normal 17px bebasneue','#fff');
			self.all_list_table[x].gold2StatPerc.x = gold2StatLbl.x + 20;
			self.all_list_table[x].gold2StatPerc.y = gold2StatLbl.y + 20;
			self.all_list_table[x].gold2StatPerc.textAlign = 'right';
			self.list_view.addChild(self.all_list_table[x].gold2StatPerc);

			self.all_list_table[x].gold1StatPerc = new createjs.Text(0,'normal 17px bebasneue','#fff');
			self.all_list_table[x].gold1StatPerc.x = self.all_list_table[x].gold2StatPerc.x - 80;
			self.all_list_table[x].gold1StatPerc.y = self.all_list_table[x].gold2StatPerc.y;
			self.all_list_table[x].gold1StatPerc.textAlign = 'left';
			self.list_view.addChild(self.all_list_table[x].gold1StatPerc);

			// == scoreboard individual statistic
			let redBg2 = new createjs.Shape();
			redBg2.graphics.beginFill("#7f1d1e").drawRoundRect(0, 0, 75, 30, 6);
			redBg2.x = redStatLbl.x;
			redBg2.y = redStatLbl.y + 123;
			self.list_view.addChild(redBg2);

			let redBg3 = new createjs.Shape();
			redBg3.graphics.beginFill("#7f1d1e").drawRoundRect(0, 0, 75, 30, 6);
			redBg3.x = redBg2.x;
			redBg3.y = redBg2.y + 35;
			self.list_view.addChild(redBg3);

			let whiteBg2 = new createjs.Shape();
			whiteBg2.graphics.beginFill("#c4c4c4").drawRoundRect(0, 0, 75, 30, 6);
			whiteBg2.x = redBg2.x + 85;
			whiteBg2.y = redBg2.y;
			self.list_view.addChild(whiteBg2);

			let whiteBg3 = new createjs.Shape();
			whiteBg3.graphics.beginFill("#c4c4c4").drawRoundRect(0, 0, 75, 30, 6);
			whiteBg3.x = redBg3.x + 85;
			whiteBg3.y = redBg3.y;
			self.list_view.addChild(whiteBg3);

			let goldBg1 = new createjs.Shape();
			goldBg1.graphics.beginFill("#b28834").drawRoundRect(0, 0, 75, 30, 6);
			goldBg1.x = whiteBg2.x + 85;
			goldBg1.y = whiteBg2.y;
			self.list_view.addChild(goldBg1);

			let goldBg2 = new createjs.Shape();
			goldBg2.graphics.beginFill("#b28834").drawRoundRect(0, 0, 75, 30, 6);
			goldBg2.x = whiteBg3.x + 85;
			goldBg2.y = whiteBg3.y;
			self.list_view.addChild(goldBg2);

			// == individual stat circles
			let redBg2Mark = new createjs.Shape();
			redBg2Mark.graphics.beginFill('#c62828').drawCircle(0, 0, 12);
			redBg2Mark.x = redBg2.x + 15;
			redBg2Mark.y = redBg2.y + 15;
			self.list_view.addChild(redBg2Mark);

			let redBg2MarkTxt = new createjs.Text(2,'normal 23px bebasneue','#2e2a27');
			redBg2MarkTxt.x = redBg2Mark.x - 5;
			redBg2MarkTxt.y = redBg2Mark.y - 13;
			self.list_view.addChild(redBg2MarkTxt);

			let redBg3Mark = new createjs.Shape();
			redBg3Mark.graphics.beginFill('#c62828').drawCircle(0, 0, 12);
			redBg3Mark.x = redBg3.x + 15;
			redBg3Mark.y = redBg3.y + 15;
			self.list_view.addChild(redBg3Mark);

			let redBg3MarkTxt = new createjs.Text(3,'normal 23px bebasneue','#2e2a27');
			redBg3MarkTxt.x = redBg3Mark.x - 5;
			redBg3MarkTxt.y = redBg3Mark.y - 13;
			self.list_view.addChild(redBg3MarkTxt);

			let whiteBg2Mark = new createjs.Shape();
			whiteBg2Mark.graphics.beginFill('#fff').drawCircle(0, 0, 12);
			whiteBg2Mark.x = whiteBg2.x + 15;
			whiteBg2Mark.y = whiteBg2.y + 15;
			self.list_view.addChild(whiteBg2Mark);

			let whiteBg2MarkTxt = new createjs.Text(2,'normal 23px bebasneue','#2e2a27');
			whiteBg2MarkTxt.x = whiteBg2Mark.x - 5;
			whiteBg2MarkTxt.y = whiteBg2Mark.y - 13;
			self.list_view.addChild(whiteBg2MarkTxt);

			let whiteBg3Mark = new createjs.Shape();
			whiteBg3Mark.graphics.beginFill('#fff').drawCircle(0, 0, 12);
			whiteBg3Mark.x = whiteBg3.x + 15;
			whiteBg3Mark.y = whiteBg3.y + 15;
			self.list_view.addChild(whiteBg3Mark);

			let whiteBg3MarkTxt = new createjs.Text(3,'normal 23px bebasneue','#2e2a27');
			whiteBg3MarkTxt.x = whiteBg3Mark.x - 5;
			whiteBg3MarkTxt.y = whiteBg3Mark.y - 13;
			self.list_view.addChild(whiteBg3MarkTxt);

			let goldBg1Mark = new createjs.Shape();
			goldBg1Mark.graphics.beginFill('#e5b141').drawCircle(0, 0, 12);
			goldBg1Mark.x = goldBg1.x + 15;
			goldBg1Mark.y = goldBg1.y + 15;
			self.list_view.addChild(goldBg1Mark);

			let goldBg1MarkTxt = new createjs.Text(1,'normal 23px bebasneue','#2e2a27');
			goldBg1MarkTxt.x = goldBg1Mark.x - 5;
			goldBg1MarkTxt.y = goldBg1Mark.y - 13;
			self.list_view.addChild(goldBg1MarkTxt);

			let goldBg2Mark = new createjs.Shape();
			goldBg2Mark.graphics.beginFill('#e5b141').drawCircle(0, 0, 12);
			goldBg2Mark.x = goldBg2.x + 15;
			goldBg2Mark.y = goldBg2.y + 15;
			self.list_view.addChild(goldBg2Mark);

			let goldBg2MarkTxt = new createjs.Text(2,'normal 23px bebasneue','#2e2a27');
			goldBg2MarkTxt.x = goldBg2Mark.x - 5;
			goldBg2MarkTxt.y = goldBg2Mark.y - 13;
			self.list_view.addChild(goldBg2MarkTxt);

			// === individual stat data
			self.all_list_table[x].redBg2Stat = new createjs.Text(0, '23px bebasneue', '#fff');
			self.all_list_table[x].redBg2Stat.x = redBg2.x + 65;
			self.all_list_table[x].redBg2Stat.y = redBg2.y + 2;
			self.all_list_table[x].redBg2Stat.textAlign = 'right';
			self.list_view.addChild(self.all_list_table[x].redBg2Stat);

			self.all_list_table[x].redBg3Stat = new createjs.Text(0, '23px bebasneue', '#fff');
			self.all_list_table[x].redBg3Stat.x = redBg3.x + 65;
			self.all_list_table[x].redBg3Stat.y = redBg3.y + 2;
			self.all_list_table[x].redBg3Stat.textAlign = 'right';
			self.list_view.addChild(self.all_list_table[x].redBg3Stat);

			self.all_list_table[x].whiteBg2Stat = new createjs.Text(0, '23px bebasneue', '#000');
			self.all_list_table[x].whiteBg2Stat.x = whiteBg2.x + 65;
			self.all_list_table[x].whiteBg2Stat.y = whiteBg2.y + 2;
			self.all_list_table[x].whiteBg2Stat.textAlign = 'right';
			self.list_view.addChild(self.all_list_table[x].whiteBg2Stat);

			self.all_list_table[x].whiteBg3Stat = new createjs.Text(0, '23px bebasneue', '#000');
			self.all_list_table[x].whiteBg3Stat.x = whiteBg3.x + 65;
			self.all_list_table[x].whiteBg3Stat.y = whiteBg3.y + 2;
			self.all_list_table[x].whiteBg3Stat.textAlign = 'right';
			self.list_view.addChild(self.all_list_table[x].whiteBg3Stat);

			self.all_list_table[x].goldBg1Stat = new createjs.Text(0, '23px bebasneue', '#fff');
			self.all_list_table[x].goldBg1Stat.x = goldBg1.x + 65;
			self.all_list_table[x].goldBg1Stat.y = goldBg1.y + 2;
			self.all_list_table[x].goldBg1Stat.textAlign = 'right';
			self.list_view.addChild(self.all_list_table[x].goldBg1Stat);

			self.all_list_table[x].goldBg2Stat = new createjs.Text(0, '23px bebasneue', '#fff');
			self.all_list_table[x].goldBg2Stat.x = goldBg2.x + 65;
			self.all_list_table[x].goldBg2Stat.y = goldBg2.y + 2;
			self.all_list_table[x].goldBg2Stat.textAlign = 'right';
			self.list_view.addChild(self.all_list_table[x].goldBg2Stat);

			//== set statistics
			this.setStatsCount(data);

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

			self.all_list_table[x].table_name = new createjs.Text(window.language.lobby.redwhite,"20px ArvoItalic","#fdba44");
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
		checkMaintenance(maintenanceData, socket) {
			if(!self.all_list_table[x] || !self.all_list_table[x].maintenanceCon) return;

			let maintenance = false;
			let activeMaintenance = [];

			if (!socket) {
				let mainMaintenance = maintenanceData.mainMaintenance.status;
				let maintenanceSetting = maintenanceData.maintenanceSetting;

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
				activeMaintenance = data.data;

				if (maintenanceData == 1) {
					maintenance = true;
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
		setResultText (data, eventName) {
			if(!self.all_list_table[x] || !self.all_list_table[x].status) return;

			let status = '';

			if (eventName == 'displayresults') {
				let last = data.length - 1;

				switch(data[last].mark.mark.mark) {
	                case "w" :
	                	status = data[last].mark.mark.num + ' ' + window.language.red_white.whitewins;
	                    break;
	                case "r" :
	                    status = data[last].mark.mark.num + ' ' + window.language.red_white.redwins;
	                    break;
	                case "g" :
	                	if (data[last].mark.mark.num == '1') {
	                		status = window.language.red_white.bonuscaps;
	                	}
	                	else {
	                		status = window.language.red_white.jackpotcaps;
	                	}
	                	break
	            } // end switch

	            self.all_list_table[x].status.text = status;
			}
		},
		/**
		 * @method sets/draws result dice
		 *
		 * @param {[type]}
		 */
		setDiceResult (data) {
			if(!self.all_list_table[x]) return;

			this.winBoxColors = ['#dfc988', '#fff', '#b71c1c', '#fff', '#b71c1c', '#fff', '#b71c1c', '#fff', '#dfc988'];
			this.alphaState = [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4];

			self.all_list_table[x].resultDiceCon = [];
			self.all_list_table[x].resultDiceCon[x] = [];
			self.all_list_table[x].resultDiceCon[x].diceBox = [];
			self.all_list_table[x].resultDiceCon[x].diceCircle = [];
			self.all_list_table[x].dice_result_con.removeAllChildren();

			if (data.marks.length > 1) {
				let lastResult = data.marks.slice(Math.max(data.marks.length - 1, 1)).reverse();
				let resultMark = lastResult[0].mark.num + lastResult[0].mark.mark;
			}
			else {
				let resultMark = data.marks[0].mark.num + data.marks[0].mark.mark;
			}

			for (var i = 0; i < 9; i++) {
				self.all_list_table[x].resultDiceCon[x].diceBox[i] = new createjs.Shape();
				self.all_list_table[x].resultDiceCon[x].diceBox[i].graphics.beginFill(this.winBoxColors[i]).drawRect(0, 0, 40, 40);
				self.all_list_table[x].resultDiceCon[x].diceBox[i].x = (41 * (i % 3)) + 195;
				self.all_list_table[x].resultDiceCon[x].diceBox[i].y = (Math.floor(i / 3) * 41) + self.all_list_table[x].y + 70;
				self.all_list_table[x].resultDiceCon[x].diceBox[i].alpha = this.alphaState[i];
				self.all_list_table[x].resultDiceCon[x].diceBox[i].visible = true;
				self.all_list_table[x].dice_result_con.addChild(self.all_list_table[x].resultDiceCon[x].diceBox[i]);
			} //end for loop

			for (var j = 0; j < 9; j++) {
				self.all_list_table[x].resultDiceCon[x].diceCircle[j] = new createjs.Shape();
				self.all_list_table[x].resultDiceCon[x].diceCircle[j].graphics.beginFill('#fff').drawCircle(0, 0, 12);
				self.all_list_table[x].resultDiceCon[x].diceCircle[j].graphics.beginStroke('#5d5d5dz').setStrokeStyle(0.5).drawCircle(0, 0, 12);
				self.all_list_table[x].resultDiceCon[x].diceCircle[j].scaleX = 1.8;
				self.all_list_table[x].resultDiceCon[x].diceCircle[j].scaleY = 1.8;
				self.all_list_table[x].resultDiceCon[x].diceCircle[j].x = (41 * (j % 3)) + 215;
				self.all_list_table[x].resultDiceCon[x].diceCircle[j].y = (Math.floor(j / 3) * 41) + self.all_list_table[x].y + 90;
				self.all_list_table[x].resultDiceCon[x].diceCircle[j].visible = false;
				self.all_list_table[x].dice_result_con.addChild(self.all_list_table[x].resultDiceCon[x].diceCircle[j]);
			} //end for loop
		},
		/**
		 * @method animate dice for new result
		 *
		 * @param
		 */
		reInitAnim() {
			if(!self.all_list_table[x] || !self.all_list_table[x].resultDiceCon) return;

			for (var i = 0; i < 9; i++) {
				self.all_list_table[x].resultDiceCon[x].diceBox[i].alpha = 0.4;

				self.all_list_table[x].resultDiceCon[x].diceCircle[i].scaleX = 1.8;
				self.all_list_table[x].resultDiceCon[x].diceCircle[i].scaleY = 1.8;
				self.all_list_table[x].resultDiceCon[x].diceCircle[i].visible = false;
			}
		},
		animateDice (data) {
			if(!self.all_list_table[x] || !self.all_list_table[x].resultDiceCon) return;

			let last = data.length - 1;
			let result = data[last].mark.mark;
			let resultMark = result.num + result.mark;

			//Set color states
			if (resultMark == '2r' || resultMark == '3r') {
				this.winBoxColors = ['#dfc988', '#fff', '#b71c1c', '#fff', '#b71c1c', '#fff', '#b71c1c', '#fff', '#dfc988'];
			}
			else if (resultMark == '2w' || resultMark == '3w') {
				this.winBoxColors = ['#dfc988', '#b71c1c', '#fff', '#b71c1c', '#fff', '#b71c1c', '#fff', '#b71c1c', '#dfc988'];
			}
			else if (resultMark == '1g') {
				this.winBoxColors = ['#b71c1c', '#fff', '#b71c1c', '#fff', '#dfc988', '#fff', '#b71c1c', '#fff', '#dfc988'];
			}
			else if (resultMark == '2g') {
				this.winBoxColors = ['#dfc988', '#fff', '#b71c1c', '#fff', '#b71c1c', '#fff', '#b71c1c', '#fff', '#dfc988'];
			}

			//Set alpha states
			if (resultMark == '2r' || resultMark == '2w') {
				this.alphaState = [0.4, 0.4, 0.4, 0.4, 1, 0.4, 1, 0.4, 0.4];
			}
			else if (resultMark == '3r' || resultMark == '3w') {
				this.alphaState = [0.4, 0.4, 1, 0.4, 1, 0.4, 1, 0.4, 0.4];
			}
			else if (resultMark == '1g') {
				this.alphaState = [0.4, 0.4, 0.4, 0.4, 1, 0.4, 0.4, 0.4, 0.4];
			}
			else if (resultMark == '2g') {
				this.alphaState = [1, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 1];
			}

			//Color & alpha value change based on result
			for (var i = 0; i < 9; i++) {
				self.all_list_table[x].resultDiceCon[x].diceBox[i].graphics.clear().beginFill(this.winBoxColors[i]).drawRect(0, 0, 40, 40);
				self.all_list_table[x].resultDiceCon[x].diceBox[i].alpha = this.alphaState[i];
				self.all_list_table[x].resultDiceCon[x].diceCircle[i].alpha = this.alphaState[i];
			} //end for loop

			//Set result circles to animate
			if (resultMark == '2r' || resultMark == '2w') {
				this.animateResult = [4, 6, 5];
			}
			else if (resultMark == '3r' || resultMark == '3w' || resultMark == '1g') {
				this.animateResult = [4, 6, 2];
			}
			else if (resultMark == '2g') {
				this.animateResult = [4, 0, 8];
			}

			//Animate Dice
			createjs.Tween.get(self.all_list_table[x].resultDiceCon[x].diceCircle[this.animateResult[0]])
				.wait(200)
				.to({
					visible: true
		    });

			createjs.Tween.get(self.all_list_table[x].resultDiceCon[x].diceCircle[this.animateResult[0]])
			.wait(200)
			.to({
		        scaleX : 1,
		        scaleY : 1
		    }, 200)
	      	.call(() => {
	      		this.showCircle(self.all_list_table[x].resultDiceCon[x].diceCircle[this.animateResult[1]]);
	      	})
		    .wait(150).call(() => {
		      	this.showCircle(self.all_list_table[x].resultDiceCon[x].diceCircle[this.animateResult[2]]);

		      	//Call pulse animate result circles
		      	this.pulseAnimate();
		    });
		},
		showCircle(prop) {
			prop.visible = true;
	    	createjs.Tween.get(prop).to({
		        scaleX : 1,
		        scaleY : 1
	      	}, 200)
		},
		pulseAnimate() {
		    createjs.Tween.get(self.all_list_table[x].resultDiceCon[x].diceCircle[this.animateResult[0]])
	      	.to({
		      	scaleX : 1.1,
		        scaleY : 1.1
	      	}, 150)
	      	.to({
		      	scaleX : 1,
		        scaleY : 1
	      	}, 100)
	      	.call(() => {
		      	this.pulseCircle(self.all_list_table[x].resultDiceCon[x].diceCircle[this.animateResult[1]]);
		    })
	      	.wait(100).call(() => {
	      		this.pulseCircle(self.all_list_table[x].resultDiceCon[x].diceCircle[this.animateResult[2]]);
	      	})
		},
		pulseCircle(prop) {
		 	createjs.Tween.get(prop).to({
		      	scaleX : 1.1,
		        scaleY : 1.1
		    }, 150)
		    .to({
		      	scaleX : 1,
		        scaleY : 1
		    }, 100)
		},
		/**
		 * @method sets/draws 5 lates results
		 *
		 * @param {[type]}
		 */
		setResult (data) {
			if(!self.all_list_table[x] || !self.all_list_table[x].latest_results_con) return;

			let counter = 0;
			let last5 = [];
			self.all_list_table[x].resultCon = [];

			self.all_list_table[x].latest_results_con.removeAllChildren();

			if (data.marks.length > 5) {
				last5 = data.marks.slice(Math.max(data.marks.length - 5, 1)).reverse();
			}
			else {
				last5 = data.marks.reverse();
			}

			last5 = last5.filter((a)=>{
		        if(a != null) {
		          	if(a.mark)
		            return a;
		        }
		    });

		    last5 = last5.filter((a)=>{
		        if (a.mark.mark !== undefined) {
                if(a.mark.gameInfo)
		          	    if(!(a.mark.gameInfo.one == undefined || a.mark.gameInfo.one == null)) return a;
		        }
		    });

			for(var i = 0; i < last5.length; i++) {
				self.all_list_table[x].resultCon[i] = [];
				self.all_list_table[x].resultCon[i].markCircle = [];
				let result = last5[i].mark

				for (var j in result.gameInfo) {
					self.all_list_table[x].resultCon[i].markCircle[counter] = new createjs.Shape();

					if (result.gameInfo[j] == 'R') {
						self.all_list_table[x].resultCon[i].markCircle[counter].graphics.beginFill('#c62828').drawCircle(0, 0, 12);
					}
					else if (result.gameInfo[j] == 'W') {
						self.all_list_table[x].resultCon[i].markCircle[counter].graphics.beginFill('#fff').drawCircle(0, 0, 12);
					}
					else {
						self.all_list_table[x].resultCon[i].markCircle[counter].graphics.beginFill('#e5b241').drawCircle(0, 0, 12);
					} // end if

					self.all_list_table[x].resultCon[i].markCircle[counter].x = (33 * counter) + 400;
					self.all_list_table[x].resultCon[i].markCircle[counter].y = (45 * i) + self.all_list_table[x].y + 70;
					self.all_list_table[x].latest_results_con.addChild(self.all_list_table[x].resultCon[i].markCircle[counter]);

					counter++;
				}

				self.all_list_table[x].resultCon[i].text = new createjs.Text(result.mark.num, '32px bebasneue', '#c62828');
				self.all_list_table[x].resultCon[i].text.x = 490;
				self.all_list_table[x].resultCon[i].text.y = (45 * i) + self.all_list_table[x].y + 52;
				self.all_list_table[x].latest_results_con.addChild(self.all_list_table[x].resultCon[i].text);

				for (var j in result.mark) {
					if (result.mark[j] == 'r') {
						self.all_list_table[x].resultCon[i].text.color = '#c62828';
					}
					else if (result.mark[j] == 'w') {
						self.all_list_table[x].resultCon[i].text.color = '#fff';
					}
					else {
						self.all_list_table[x].resultCon[i].text.color = '#e5b241';
					}
				}

				counter = 0;
			}

	        for (var j = 0; j < 3; j++) {
		        createjs.Tween.get(self.all_list_table[x].resultCon[0].markCircle[j])
		          .to({alpha: 0}, 750)
		          .to({alpha: 1}, 750)
		          .to({alpha: 0}, 750)
		          .to({alpha: 1}, 750)
		          .to({alpha: 0}, 750)
		          .to({alpha: 1}, 750)
	        }

	        createjs.Tween.get(self.all_list_table[x].resultCon[0].text)
		          .to({alpha: 0}, 750)
		          .to({alpha: 1}, 750)
		          .to({alpha: 0}, 750)
		          .to({alpha: 1}, 750)
		          .to({alpha: 0}, 750)
		          .to({alpha: 1}, 750)
		}, //end game marks
		/**
		 * @method individual count for statistics
		 *
		 * @param
		 */
		setStatsCount (data) {
			if(!self.all_list_table[x] || !self.all_list_table[x].redBg2Stat) return;

			this.red2Count = 0;
			this.red3Count = 0;
			this.white2Count = 0;
			this.white3Count = 0;
			this.gold1Count = 0;
			this.gold2Count = 0;

			let dataMark = data.marks

		    dataMark = dataMark.filter((a)=>{
		        if (a.mark.mark !== undefined) {
              if(a.mark.gameInfo)
		          	if(!(a.mark.gameInfo.one == undefined || a.mark.gameInfo.one == null)) return a;
		        }
		    });

			for (var i in dataMark) {
				let results = dataMark[i].mark.mark;

			    if (results.mark == 'r') {
			    	if (results.num == 2) {
			    		this.red2Count++;
			    	}
			    	else {
			    		this.red3Count++
			    	}
			    }
			    else if (results.mark == 'w') {
			    	if (results.num == 2) {
			    		this.white2Count++;
			    	}
			    	else {
			    		this.white3Count++;
			    	}
			    }
			    else if (results.mark == 'g') {
			    	if (results.num == 1) {
			    		this.gold1Count++;
			    	}
			    	else {
			    		this.gold2Count++;
			    	}
			    } //end if
			} // end for in

		 	//Set stat individual count
		 	self.all_list_table[x].redBg2Stat.text = this.red2Count;
		 	self.all_list_table[x].redBg3Stat.text = this.red3Count;

		 	self.all_list_table[x].whiteBg2Stat.text = this.white2Count;
		 	self.all_list_table[x].whiteBg3Stat.text = this.white3Count;

		 	self.all_list_table[x].goldBg1Stat.text = this.gold1Count;
		 	self.all_list_table[x].goldBg2Stat.text = this.gold2Count;

		 	//Call function to set arc percentages
			this.setArcPercentage();
		},
		/**
		 * @method percentage for statistics
		 *
		 * @param
		 */
		setArcPercentage () {
			let totalRedWhite = 0;
			let totalGold = 0;
			let redPercentage = 0;
			let whitePercentage = 0;
			let gold1Percentage = 0;
			let gold2Percentage = 0;
			let whiteRadianStart = 0;
			let whiteRadian = 0;
			let goldRadianStart = 0;
			let goldRadian = 0;

			//Set stat percentage
		 	totalRedWhite = this.red2Count + this.red3Count + this.white2Count + this.white3Count;
		 	redPercentage = ((this.red2Count + this.red3Count) / totalRedWhite) * 100;
		 	whitePercentage = ((this.white2Count + this.white3Count) / totalRedWhite) * 100;

		 	if (totalRedWhite == 0) {
		 		redPercentage = 0;
		 		whitePercentage = 0;
		 	}

		 	self.all_list_table[x].redStatPerc.text = Math.round(redPercentage)+'%';
		 	self.all_list_table[x].whiteStatPerc.text = Math.round(whitePercentage)+'%';

		 	totalGold = this.gold1Count + this.gold2Count;
		 	gold1Percentage = (this.gold1Count / totalGold) * 100;
		 	gold2Percentage = (this.gold2Count / totalGold) * 100;

		 	if (totalGold == 0) {
		 		gold1Percentage = 0;
		 		gold2Percentage = 0;
		 	}

		 	self.all_list_table[x].gold1StatPerc.text = Math.round(gold1Percentage)+'%';
		 	self.all_list_table[x].gold2StatPerc.text = Math.round(gold2Percentage)+'%';

		 	//Set stat circle
		 	whiteRadian = ((whitePercentage / 100) * 360) / 2;
		 	whiteRadianStart = Math.abs(whiteRadian) * -1;
		 	self.all_list_table[x].whiteStatCircle.graphics.clear().setStrokeStyle(13).beginStroke('#fff');
		 	self.all_list_table[x].redStatCircle.graphics.clear().setStrokeStyle(13).beginStroke('#b71c1c');

		 	if (totalRedWhite > 0) {
		 		self.all_list_table[x].whiteStatCircle.graphics.arc(0, 0, 70, this.setDegreeToRadians(whiteRadianStart), this.setDegreeToRadians(whiteRadian));

		 		if (this.red2Count + this.red3Count != 0) {
		 			if (this.white2Count + this.white3Count == 0) {
		 				self.all_list_table[x].redStatCircle.graphics.arc(0, 0, 70, this.setDegreeToRadians(0), this.setDegreeToRadians(360));
		 			}
		 			else {
		 				self.all_list_table[x].redStatCircle.graphics.arc(0, 0, 70, this.setDegreeToRadians(whiteRadian), this.setDegreeToRadians(whiteRadianStart));
		 			} //end if
		 		} //end if
		 	}
		 	else {
		 		self.all_list_table[x].whiteStatCircle.graphics.arc(0, 0, 70, this.setDegreeToRadians(270), this.setDegreeToRadians(90));
      			self.all_list_table[x].redStatCircle.graphics.arc(0, 0, 70, this.setDegreeToRadians(90), this.setDegreeToRadians(270));
		 	} //end if

			//Gold stats
			goldRadian = ((gold2Percentage / 100) * 360) / 2;
			goldRadianStart = Math.abs(goldRadian) * -1;
			self.all_list_table[x].gold2StatCircle.graphics.clear().setStrokeStyle(13).beginStroke('#b28834');
			self.all_list_table[x].gold1StatCircle.graphics.clear().setStrokeStyle(13).beginStroke('#e5b241');

		    if (totalGold > 0) {
		    	self.all_list_table[x].gold2StatCircle.graphics.arc(0, 0, 58, this.setDegreeToRadians(goldRadianStart), this.setDegreeToRadians(goldRadian));

		    	if (this.gold1Count != 0) {
		    		if (this.gold2Count == 0) {
		    			self.all_list_table[x].gold1StatCircle.graphics.arc(0, 0, 58, this.setDegreeToRadians(0), this.setDegreeToRadians(360));
		    		}
		    		else {
		    			self.all_list_table[x].gold1StatCircle.graphics.arc(0, 0, 58, this.setDegreeToRadians(goldRadian), this.setDegreeToRadians(goldRadianStart));
		    		}
		    	} //end if
			}
		 	else {
		      	self.all_list_table[x].gold2StatCircle.graphics.arc(0, 0, 58, this.setDegreeToRadians(270), this.setDegreeToRadians(90));
		      	self.all_list_table[x].gold1StatCircle.graphics.arc(0, 0, 58, this.setDegreeToRadians(90), this.setDegreeToRadians(270));
			} //end if
		},
		/**
		 * @method draws roadmap
		 *
		 * @param
		 *
		 */
		drawRoadMap (data) {
			if(!self.all_list_table[x] || !self.all_list_table[x].roadmap_con) return;

			let roadmapResult = [];
			let roadmapResultTxt = [];
			let counter = 0;
			let tweenCount = 0;
			self.all_list_table[x].dataCheck = 0;

			self.all_list_table[x].roadmap_con.removeAllChildren();

			data = data.filter((a)=>{
		        if (a.mark.mark !== undefined) {
              if(a.mark.gameInfo)
		          	if(!(a.mark.gameInfo.one == undefined || a.mark.gameInfo.one == null)) return a;
		        }
		    });

		    // data = data.reverse();

			for (var i = self.all_list_table[x].loopStart; i < data.length; i++) {
				let result = data[i].mark.mark;

				roadmapResult[counter] = new createjs.Shape();

				if (result.mark == 'r') {
					roadmapResult[counter].graphics.clear().beginFill('#d32f2f').drawCircle(0, 0, 19);
				}
				else if (result.mark == 'w') {
					roadmapResult[counter].graphics.clear().beginFill('#fff').drawCircle(0, 0, 19);
				}
				else {
					roadmapResult[counter].graphics.clear().beginFill('#e5b241').drawCircle(0, 0, 19);
				} // end if

				roadmapResult[counter].x = (Math.floor(counter / 6) * 38) + 559;
				roadmapResult[counter].y = ((counter % 6) * 39.5) + 42 + self.all_list_table[x].y;
				self.all_list_table[x].roadmap_con.addChild(roadmapResult[counter]);

				roadmapResultTxt[counter] = new createjs.Text(result.num, '30px bebasneue', '#2b2b2b');
				roadmapResultTxt[counter].x = (Math.floor(counter / 6) * 38) + 553;
				roadmapResultTxt[counter].y = ((counter % 6) * 39.5) + 25 + self.all_list_table[x].y;
				self.all_list_table[x].roadmap_con.addChild(roadmapResultTxt[counter]);

				counter++;
				self.all_list_table[x].dataCheck++;
			} //end for loop

			if (data.length > 161) {
				let excessCount = data.length - 150;

				if (excessCount % 12 === 0) {
					self.all_list_table[x].roadmap_con.x -= 76;
				}
			}

			if (counter == 0) {
				tweenCount = 0;
			}
			else {
				tweenCount = counter - 1;
			}

			createjs.Tween.get(roadmapResult[tweenCount])
		          .to({alpha: 0}, 750)
		          .to({alpha: 1}, 750)
		          .to({alpha: 0}, 750)
		          .to({alpha: 1}, 750)
		          .to({alpha: 0}, 750)
		          .to({alpha: 1}, 750)
		},

		setDegreeToRadians(degrees) {
			 return degrees * Math.PI / 180;
		}

	} // end intance

	return instance;
}
