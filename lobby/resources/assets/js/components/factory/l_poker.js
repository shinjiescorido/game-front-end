import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';
import rmformat from '../../factories/formatter';

let formatData = rmformat();

let instance = null

export default(self,data,x) => {
	instance = {
		createTable () {
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
			// self.all_list_table[x].status.text = window.language.lobby.nowbetting;
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

			//dealer cards
			let dealer_cards_bg = new createjs.Shape();
			dealer_cards_bg.graphics.beginFill("#d32f30").drawRoundRect(0,0,264,128,10);
			dealer_cards_bg.x = 356;
			dealer_cards_bg.y = self.all_list_table[x].y + 12;
			self.list_view.addChild(dealer_cards_bg);

			let dealer_cards_bg_2 = new createjs.Shape();
			dealer_cards_bg_2.graphics.beginFill("#bb1b1b").drawRoundRect(0,0,150,112,10);
			dealer_cards_bg_2.x = 460;
			dealer_cards_bg_2.y = self.all_list_table[x].y + 20;
			self.list_view.addChild(dealer_cards_bg_2);

			let dealer_label = new createjs.Text(window.language.lobby.dealerspaced,"bold 18px latobold","#fff");
			dealer_label.x = dealer_cards_bg.x + 10;
			dealer_label.y = dealer_cards_bg.y + 52;
			self.list_view.addChild(dealer_label);

			if(window.language.locale == "zh") {
							dealer_label.font = "bold 30px latobold";
							dealer_label.x = dealer_cards_bg.x + 20;
							dealer_label.y = dealer_cards_bg.y + 48;
			}

			// === community cards bg
			let community_cards_bg = new createjs.Shape();
			community_cards_bg.graphics.beginFill("#afafaf").drawRoundRect(0,0,460,128,10);
			community_cards_bg.x = 628;
			community_cards_bg.y = self.all_list_table[x].y + 12;
			self.list_view.addChild(community_cards_bg);

			let community_cards_bg_2 = new createjs.Shape();
			community_cards_bg_2.graphics.beginFill("#7a7a7a").drawRoundRect(0,0,220,112,10);
			community_cards_bg_2.y = self.all_list_table[x].y + 20;
			community_cards_bg_2.x = 647;
			self.list_view.addChild(community_cards_bg_2);

			let community_cards_bg_3 = new createjs.Shape();
			community_cards_bg_3.graphics.beginFill("#7a7a7a").drawRoundRect(0,0,85,112,10);
			community_cards_bg_3.y = self.all_list_table[x].y + 20;
			community_cards_bg_3.x = 882;
			self.list_view.addChild(community_cards_bg_3);

			let community_cards_bg_4 = new createjs.Shape();
			community_cards_bg_4.graphics.beginFill("#7a7a7a").drawRoundRect(0,0,85,112,10);
			community_cards_bg_4.y = self.all_list_table[x].y + 20;
			community_cards_bg_4.x = 979;
			self.list_view.addChild(community_cards_bg_4);

			// === player cards bg
			let player_cards_bg = new createjs.Shape();
			player_cards_bg.graphics.beginFill("#1665c1").drawRoundRect(0,0, 264, 128,10);
			player_cards_bg.y = self.all_list_table[x].y + 12;
			player_cards_bg.x = 1096;
			self.list_view.addChild(player_cards_bg);

			let player_cards_bg_2 = new createjs.Shape();
			player_cards_bg_2.graphics.beginFill("#114ead").drawRoundRect(0,0,150,112,10);
			player_cards_bg_2.x = player_cards_bg.x + 13;
			player_cards_bg_2.y = self.all_list_table[x].y + 20;
			self.list_view.addChild(player_cards_bg_2);

			let player_label = new createjs.Text(window.language.lobby.playerspaced,"bold 18px latobold","#fff");
			player_label.x = player_cards_bg.x + 168;
			player_label.y = player_cards_bg.y + 52;
			self.list_view.addChild(player_label);

			if(window.language.locale == "zh") {
							player_label.font = "bold 30px latobold";
							player_label.x = player_cards_bg.x + 175;
							player_label.y = player_cards_bg.y + 48;
			}

			// === poker roadmap

			let roadmap_bg = new createjs.Shape();
			roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,521.76,129);
			roadmap_bg.y = (self.all_list_table[x].y) + 153;
			roadmap_bg.x = self.all_list_table[x].x + 355;
			self.list_view.addChild(roadmap_bg);

			let lines = new createjs.Shape();
			lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0,0)
			self.list_view.addChild(lines);
			let posY =  roadmap_bg.y;
			let posX =  roadmap_bg.x

			for(var i = 0; i <= 6 ; i++) {
				lines.graphics.moveTo(posX,posY+ (21.5*i)).lineTo(posX + 521.76, posY+ (21.5*i))
			}
			lines.graphics.moveTo(posX,posY)
			for(var i = 0; i <= 24 ; i++) {
				lines.graphics.moveTo(posX+(21.74*i),posY).lineTo(posX+(21.74*i),posY + 129)
			}
			lines.shadow = new createjs.Shadow("#000",2,2,6);
			lines.alpha =.5;
			// === table
			let table_header = new createjs.Shape();
			table_header.graphics.ss(1).s("#afafaf").beginFill("#c8c8c8").drawRect(0,0,482,22);
			table_header.x = 878;
			table_header.y = self.all_list_table[x].y + 152.5;
			self.list_view.addChild(table_header);

			for(var i = 0; i < 3; i++) {
				let table_tr_1 = new createjs.Shape();
				table_tr_1.graphics.ss(1).s("#afafaf").beginFill("#dadada").drawRect(0,0,482,36);
				table_tr_1.x = 878;
				table_tr_1.y = self.all_list_table[x].y + (i*36) + (174);
				self.list_view.addChild(table_tr_1);
			}
			let header_width = [50,80,120,80,120];
			let table_header_texts = [window.language.poker.gameno, window.language.poker.dealer, window.language.poker.communitycard, window.language.poker.player, window.language.lobby.result];
			let col_x = 0;
			for(var i = 0; i < table_header_texts.length; i++) {
				col_x += header_width[i];
				let h_text = new createjs.Text(table_header_texts[i], "bold 14px latoBold", "#000");
				h_text.textAlign = "center";
				h_text.textBaseline = "middle";
				h_text.x = 898 + col_x - (header_width[i] / 2);
						h_text.y = self.all_list_table[x].y + 164;
				if(i == 0) { h_text.x -= 10; }

						if(window.language.locale == "zh") {
										h_text.font = "bold 15px latoBold";
										h_text.y = self.all_list_table[x].y + 162;
						}

				self.list_view.addChild(h_text);
			} // end for

			self.all_list_table[x].card_result_container = new createjs.Container();
			self.all_list_table[x].card_result_container.y = self.all_list_table[x].y;
			self.all_list_table[x].card_result_container.x = self.all_list_table[x].x;
			self.list_view.addChild(self.all_list_table[x].card_result_container);

			this.drawGameInfo("list");

			self.all_list_table[x].roadmap_container = new createjs.Container();
			self.all_list_table[x].roadmap_container.x = 366;
			self.all_list_table[x].roadmap_container.y = self.all_list_table[x].y + 164;
			self.list_view.addChild(self.all_list_table[x].roadmap_container);

			self.list_view.addChild(self.all_list_table[x].maintenance_container);

			self.all_list_table[x].pokerMeta_table_container = new createjs.Container();
			self.list_view.addChild(self.all_list_table[x].pokerMeta_table_container);


			// === maintenance

//          let header_bg = [];
//          let text_color = "";

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

			self.all_list_table[x].table_name = new createjs.Text(data.slave && data.slave == "bonusplus" ? window.language.level.bonusplus : window.language.lobby.texas,"22px ArvoItalic","#fdba44");
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
			if(!self.all_list_table[x] || !self.all_list_table[x].maintenanceCon) return;

			if(window.userAuthority == 'admin') return;
			
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
		thumbnailCreate () {

			// self.all_thumbnial_table[x].card_res_bg_container = new createjs.Container();
			// self.all_thumbnial_table[x].card_res_bg_container.visible = false;
			// self.all_thumbnial_table[x].card_res_bg_container.x = self.all_thumbnial_table[x].x
			// self.all_thumbnial_table[x].card_res_bg_container.y = self.all_thumbnial_table[x].y + 122
			// self.thumbnail_view.addChild(self.all_thumbnial_table[x].card_res_bg_container);

			// self.all_thumbnial_table[x].card_result_container = new createjs.Container();
			// self.all_thumbnial_table[x].card_result_container.visible = false;
			// self.all_thumbnial_table[x].card_result_container.x = self.all_thumbnial_table[x].x
			// self.all_thumbnial_table[x].card_result_container.y = self.all_thumbnial_table[x].y + 122
			// self.thumbnail_view.addChild(self.all_thumbnial_table[x].card_result_container);

			// let poker_result_bg = new createjs.Shape();
			// poker_result_bg.graphics.beginFill("#fff").drawRect(0,0,400,94);
			// self.all_thumbnial_table[x].card_res_bg_container.addChild(poker_result_bg);

			// let banker_bg = new createjs.Shape();
			// banker_bg.graphics.beginFill("#d22d2e").drawRoundRect(0,0,90,75,6);
			// banker_bg.x = 10 ;
			// banker_bg.y = 10;
			// self.all_thumbnial_table[x].card_res_bg_container.addChild(banker_bg);

			// let community_bg = new createjs.Shape();
			// community_bg.graphics.beginFill("#afafaf").drawRoundRect(0,0,180,75,6);
			// community_bg.x = 110;
			// community_bg.y = 10;
			// self.all_thumbnial_table[x].card_res_bg_container.addChild(community_bg);

			// let player_bg = new createjs.Shape();
			// player_bg.graphics.beginFill("#1665c1").drawRoundRect(0,0,90,75,6);
			// player_bg.x = 300;
			// player_bg.y = 10;
			// self.all_thumbnial_table[x].card_res_bg_container.addChild(player_bg);

			this.drawGameInfo("thumbnail");

		},
		drawTableData(data) {

			if(!self.all_list_table[x] || !self.all_list_table[x].pokerMeta_table_container) return;

			let data_2 = _.clone(data);

			self.all_list_table[x].pokerMeta_table_container.removeAllChildren();

			self.all_list_table[x].table_round_num = [];
			self.all_list_table[x].dealer_card = [];
			self.all_list_table[x].community_card = [];
			self.all_list_table[x].player_card = [];
			self.all_list_table[x].result = [];


			data_2 = _.filter(data_2, (data) =>{
				if(data.gameInfo) return data;
			});


			for(var i = 0; i < data_2.length; i++) {
				self.all_list_table[x].table_round_num[i] = new createjs.Text(data_2[i].roundNum,"bold 16px lato", "#000");
		self.all_list_table[x].table_round_num[i].textAlign = "center";
		self.all_list_table[x].table_round_num[i].textBaseline = "middle";
		self.all_list_table[x].table_round_num[i].x = 15;
				self.all_list_table[x].table_round_num[i].y = (i*35) + 12;
				self.all_list_table[x].pokerMeta_table_container.addChild(self.all_list_table[x].table_round_num[i])

				self.all_list_table[x].dealer_card[i] = [];

				for(var e = 0;  e < data_2[i].gameInfo.dealer.length; e++ ) {
					self.all_list_table[x].dealer_card[i][e] = createCardSprite(self,22,29,"/img/cards/cards_mobile_sprite_v2_small.png");
					self.all_list_table[x].dealer_card[i][e].gotoAndPlay("C"+data_2[i].gameInfo.dealer[e]);
					// self.all_list_table[x].dealer_card[i][e].scaleX = self.all_list_table[x].dealer_card[i][e].scaleY = 1.1
		  self.all_list_table[x].dealer_card[i][e].x = (e*20) + 69;
					self.all_list_table[x].dealer_card[i][e].y = (i*35);
					self.all_list_table[x].pokerMeta_table_container.addChild(self.all_list_table[x].dealer_card[i][e]);
				} //end for

				//== community
				let community_card = _.union(data_2[i].gameInfo.flop,[data_2[i].gameInfo.turn],[data_2[i].gameInfo.river]);

				self.all_list_table[x].community_card[i] = [];
				for(var e = 0;  e < community_card.length; e++ ) {
					self.all_list_table[x].community_card[i][e]= createCardSprite(self,22,29,"/img/cards/cards_mobile_sprite_v2_small.png");
					self.all_list_table[x].community_card[i][e].gotoAndPlay("C"+community_card[e]);
					self.all_list_table[x].community_card[i][e].x = 138 + (e*20);
					self.all_list_table[x].community_card[i][e].y = (i*35);
					// self.all_list_table[x].community_card[i][e].scaleY = self.all_list_table[x].community_card[i][e].scaleX = 1.1
					self.all_list_table[x].pokerMeta_table_container.addChild(self.all_list_table[x].community_card[i][e]);
				} // end for

				//== player
				self.all_list_table[x].player_card[i] = [];

				for(var e = 0;  e < data_2[i].gameInfo.player.length; e++ ) {
					self.all_list_table[x].player_card[i][e]= createCardSprite(self,22,29,"/img/cards/cards_mobile_sprite_v2_small.png");
					self.all_list_table[x].player_card[i][e].gotoAndPlay("C"+data_2[i].gameInfo.player[e]);
					self.all_list_table[x].player_card[i][e].x = 267 + (e*20);
					self.all_list_table[x].player_card[i][e].y = (i*35);
					// self.all_list_table[x].player_card[i][e].scaleY = self.all_list_table[x].player_card[i][e].scaleX = 1.1
					self.all_list_table[x].pokerMeta_table_container.addChild(self.all_list_table[x].player_card[i][e]);
					// self.player_card[i][e].shadow = new createjs.Shadow("#000000", 1, 0, 6);
				} // end for

				let color = "#0d47a1";
				let text =  "";

				if(data_2[i].gameResult.winner.toLowerCase() == "player") {
					text  = window.language.poker.playerwins
				}
				else if(data_2[i].gameResult.winner.toLowerCase() == "dealer") {
					color = "#b71c1c"
					text = window.language.poker.dealerwins;
				} else {
					text = window.language.poker.tiewins;
					color = '#e5b241';
				}
				self.all_list_table[x].result[i] = new createjs.Text(text, "bold 14px arial", color);
				self.all_list_table[x].result[i].textAlign = "center";
				self.all_list_table[x].result[i].textBaseline = "middle";
				self.all_list_table[x].result[i].x = 390;
				self.all_list_table[x].result[i].y = (i*36) + 12.6;
				self.all_list_table[x].pokerMeta_table_container.addChild(self.all_list_table[x].result[i])

			}

			self.all_list_table[x].pokerMeta_table_container.x = 900;
			self.all_list_table[x].pokerMeta_table_container.y =  self.all_list_table[x].y +  180;
		},
		capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
		drawGameInfo (type) {

			if(type == "list") {
				if(self.all_list_table[x] && self.all_list_table[x].card_result_container) self.all_list_table[x].card_result_container.removeAllChildren();

				let cards = createCardSprite(self,80,120,"/img/cards/mobile_sprite_cards.png");
				cards.scaleX = cards.scaleY = 0.8;
				cards.y = 28;

				if(data.gameInfo.player === undefined) return;

				if(data.gameInfo.player.length) {
					for(var e = 0; e < data.gameInfo.player.length; e++) {
						cards.x = e* 65 + 1118;
						cards.gotoAndStop("C"+data.gameInfo.player[e]);
						self.all_list_table[x].card_result_container.addChild(_.clone(cards));
					}
				}

				if(data.gameInfo.flop.length) {
					for(var e = 0; e < data.gameInfo.flop.length; e++) {
						cards.x = e* 65 + 660;
						cards.gotoAndStop("C"+data.gameInfo.flop[e]);
						self.all_list_table[x].card_result_container.addChild(_.clone(cards));
					}
				}
				if(data.gameInfo.turn) {
					cards.x = 892;
					cards.gotoAndStop("C"+data.gameInfo.turn);
					self.all_list_table[x].card_result_container.addChild(_.clone(cards));
				}

				if(data.gameInfo.river) {
					cards.x = 989;
					cards.gotoAndStop("C"+data.gameInfo.river);
					self.all_list_table[x].card_result_container.addChild(_.clone(cards));
				}

				if(data.gameInfo.dealer.length) {
					for(var e = 0; e < data.gameInfo.dealer.length; e++) {
						cards.x = (e * 65) + 470;
						cards.gotoAndStop("C"+data.gameInfo.dealer[e]);
						self.all_list_table[x].card_result_container.addChild(_.clone(cards));
					}
				}
			} else {

				let cards = createCardSprite(self,74,99,"/img/cards/lobby_sprite_cards.png");
				cards.y = 17
				cards.scaleX = cards.scaleY = 0.6

				if(data.gameInfo.player === undefined) return;

				if(data.gameInfo.player.length) {
					self.all_thumbnial_table[x].card_result_container.visible = true;
					self.all_thumbnial_table[x].card_res_bg_container.visible = true;
					for(var e = 0; e < data.gameInfo.player.length; e++) {
						cards.x = (e * 38) + 304;

						cards.gotoAndStop("C"+data.gameInfo.player[e]);

						self.all_thumbnial_table[x].card_result_container.addChild(_.clone(cards));
					}
				}

				if(data.gameInfo.flop.length) {
					for(var e = 0; e < data.gameInfo.flop.length; e++) {
						// cards.x = e* 65 + 655;
						//mark work
						cards.x = (e* 31) + 116;
						cards.gotoAndStop("C"+data.gameInfo.flop[e]);
						self.all_thumbnial_table[x].card_result_container.addChild(_.clone(cards));
					}
				}
				if(data.gameInfo.turn) {
					cards.x = 210;
					cards.gotoAndStop("C"+data.gameInfo.turn);
					self.all_thumbnial_table[x].card_result_container.addChild(_.clone(cards));
				}

				if(data.gameInfo.river) {
					cards.x = 240;
					cards.gotoAndStop("C"+data.gameInfo.river);
					self.all_thumbnial_table[x].card_result_container.addChild(_.clone(cards));
				}

				if(data.gameInfo.dealer.length) {
					for(var e = 0; e < data.gameInfo.dealer.length; e++) {
						cards.x = (e* 38) + 14

						cards.gotoAndStop("C"+data.gameInfo.dealer[e]);
						self.all_thumbnial_table[x].card_result_container.addChild(_.clone(cards));
					}
				}
			}

		},
		inputRes (data, type) {

			if(type == "list") {
				if(!self.all_list_table[x] || !self.all_list_table[x].card_result_container) {
					return;
				}
			}

			if(type == "thumbnail") {
				if(!self.all_thumbnial_table && !self.all_thumbnial_table[x] && !self.all_thumbnial_table[x].card_result_container) return;
			}

			if(!data.gameInfo.burn.length && !data.gameInfo.flop.length && !data.gameInfo.turn && !data.gameInfo.river && !data.gameInfo.player.length && !data.gameInfo.dealer.length) return;


			let cards = createCardSprite(self,80,120,"/img/cards/mobile_sprite_cards.png");
			let posX = 0;
			let posY = 0;
			let isThumbnail = false;
			if(type == "thumbnail") {
				cards = createCardSprite(self,74,99,"/img/cards/lobby_sprite_cards.png");
				isThumbnail = true;
			}

			cards.scaleX = cards.scaleY = 0.8;
			cards.y = 28

			if(data.gameInfo.player.length && data.gameInfo.player.length <= 2 && data.gameInfo.player.length > 0) {
				cards.gotoAndStop("C"+data.gameInfo.player[data.gameInfo.player.length-1]);

				if(type != "thumbnail") {
					cards.x = ((data.gameInfo.player.length - 1)* 65) + 1118
				} else {
					// cards.x = ((data.gameInfo.player.length - 1)* 38) + 14
					cards.x = ((data.gameInfo.player.length - 1)* 38) + 304;
				}
			}

			if(data.gameInfo.flop.length && data.gameInfo.flop.length <= 3 && data.gameInfo.flop.length > 0) {

				if(type != "thumbnail") {
					cards.x = ((data.gameInfo.flop.length-1)* 65) + 660;
				} else {
					cards.x = ((data.gameInfo.flop.length-1)* 35) + 114;
				}

				cards.gotoAndStop("C"+data.gameInfo.flop[data.gameInfo.flop.length-1]);

			}

			if(data.gameInfo.turn) {
				if(type != "thumbnail") {
					cards.x = 892;
				} else {
					cards.x = 210;
				}
				cards.gotoAndStop("C"+data.gameInfo.turn);
			}

			if(data.gameInfo.river) {
				if(type != "thumbnail") {
					cards.x = 989;
				} else {
					cards.x = 240;
				}
				cards.gotoAndStop("C"+data.gameInfo.river);
			}

			if(data.gameInfo.dealer.length && data.gameInfo.dealer.length <= 2 && data.gameInfo.dealer.length > 0) {
				if(type != "thumbnail") {
					cards.x = ((data.gameInfo.dealer.length - 1)* 65) + 470;
				} else {
					// cards.x = ((data.gameInfo.dealer.length - 1)* 38) + 304;
					cards.x = ((data.gameInfo.dealer.length - 1)* 38) + 14
				}

				cards.gotoAndStop("C"+data.gameInfo.dealer[data.gameInfo.dealer.length-1]);
			}

			if(self.all_list_table[x] && self.all_list_table[x].status) {
				self.all_list_table[x].status.text = window.language.lobby.dealing;
			}

			if(type == "thumbnail") {
				try {
					// self.all_thumbnial_table[x].status.text = window.language.lobby.dealing;
					self.all_thumbnial_table[x].card_result_container.visible = true;
					self.all_thumbnial_table[x].card_res_bg_container.visible = true;
					cards.y = 17
					cards.scaleX = cards.scaleY = 0.6
					self.all_thumbnial_table[x].card_result_container.addChild(cards);
				}
				catch(e) {

				}
			} else {

				self.all_list_table[x].card_result_container.addChild(cards);
			}


		},
		drawRoadMap(data, type) {

			if(type == "list") {
				if(!self.all_list_table[x] || !self.all_list_table[x].roadmap_container) return
			}
			else {
				if(!self.all_thumbnial_table[x] || !self.all_thumbnial_table[x].roadmap_container) return
			}

			let circle = "#1268cb";

			let radius = 10;
			let posX = 0;
			let posY = 0;

			if(type == "list") {
				radius = 10;
				posX = 21.7;
				posY = 21.6;
			} else {
				posX = 16;
				posY = 15.5;
				radius = 7;
			}

			if(type == "list") {
				self.all_list_table[x].roadmap_container.removeAllChildren()
			}
			else {
				self.all_thumbnial_table[x].roadmap_container.removeAllChildren()
			}

			for(var e = 0; e < data.length; e++) {
				for(var i = 0; i < data[e].length; i++) {
					var sp = new createjs.Shape();
					if(!data[e][i]) continue;

					if(data[e][i] == "D") {
						circle = "#cd342f"
					} else if(data[e][i] == "T") {
						circle = "#41a257"
					}else if(data[e][i] == "P") {
						circle = "#1268cb"
					}

					sp.graphics.beginFill(circle).drawCircle(0,0,radius);
					sp.x = e*posX;
					sp.y = i*posY;

					let text;

					if(window.language.locale == "zh") {
									if(data[e][i] == "P") { text = new createjs.Text("闲", "12.5px lato", "#fff"); }
									if(data[e][i] == "T") { text = new createjs.Text("和", "12.5px lato", "#fff"); }
									if(data[e][i] == "D") { text = new createjs.Text("荷", "12.5px lato", "#fff"); }
					} else {
									if(data[e][i] == "P") { text = new createjs.Text("P", "10px lato", "#fff"); }
									if(data[e][i] == "T") { text = new createjs.Text("T", "10px lato", "#fff"); }
									if(data[e][i] == "D") { text = new createjs.Text("D", "10px lato", "#fff"); }
					}

					text.x = sp.x;
					text.y = sp.y;
					text.textAlign = "center";
					text.textBaseline = "middle";

					if(type == "thumbnail") {
						self.all_thumbnial_table[x].roadmap_container.addChild(sp, text);
					} else {
						self.all_list_table[x].roadmap_container.addChild(sp, text);
					}
				}
			} // end for
		}
	}
	return instance;
}
