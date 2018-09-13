import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../../factories/factories';
import rmformat from '../../../factories/formatter';

let formatData = rmformat();

let instance = null

export default(self,data,x) => {
	instance = {
		createTable () {
			// === game rounds
		  let game_rounds_label = new createjs.Text(window.language.lobby.game ,"18px lato","#fff");
		  game_rounds_label.x = 200;
		  game_rounds_label.y = 84 + self.all_list_table[x].y ;
		  poker_c[x].addChild(game_rounds_label);

			if(window.language.locale == "zh") {
				game_rounds_label.font = "23px latoregular";
			}

		  let game_label_height = game_rounds_label.getMeasuredHeight();
		  self.all_list_table[x].round_num.text = data.currentRound;
		  self.all_list_table[x].round_num.textAlign = "right";
		  self.all_list_table[x].round_num.x = 295;
		  self.all_list_table[x].round_num.y = game_rounds_label.y + game_label_height + 20;
			//=== table status
			let round_num_height = self.all_list_table[x].round_num.getMeasuredHeight();
		  self.all_list_table[x].status.text = window.language.lobby.nowbetting;
		  self.all_list_table[x].status.x = game_rounds_label.x;
		  self.all_list_table[x].status.y = self.all_list_table[x].round_num.y + round_num_height + 20;

			// === timer
			self.all_list_table[x].timer.x =  -5;
			self.all_list_table[x].timer.y =  self.all_list_table[x].y + 24.8;

			// === dealer image
			self.all_list_table[x].dealer_img_bg.x = 92;
			self.all_list_table[x].dealer_img_bg.y = self.all_list_table[x].y + 122;

			self.all_list_table[x].dealer_img.x = self.all_list_table[x].dealer_img_bg.x + 180;
			self.all_list_table[x].dealer_img.y = self.all_list_table[x].dealer_img_bg.y  + 180;

			// === dealer name
			self.all_list_table[x].dealer_name.text = data.currentDealer;
			self.all_list_table[x].dealer_name.x = 92;
			self.all_list_table[x].dealer_name.y = 190 + self.all_list_table[x].y;
			poker_c[x].addChild(self.all_list_table[x].dealer_name);

			//dealer cards
			let dealer_cards_bg = new createjs.Shape();
			dealer_cards_bg.graphics.beginFill("#d32f30").drawRoundRect(0,0,106,128,10);
			dealer_cards_bg.x = 356;
			dealer_cards_bg.y = self.all_list_table[x].y + 12;
			poker_c[x].addChild(dealer_cards_bg);

			let dealer_cards_bg_2 = new createjs.Shape();
			dealer_cards_bg_2.graphics.beginFill("#bb1b1b").drawRoundRect(0,0,96,72,8);
			dealer_cards_bg_2.x = dealer_cards_bg.x + 5 ;
			dealer_cards_bg_2.y = self.all_list_table[x].y + 20;
			poker_c[x].addChild(dealer_cards_bg_2);

			let dealer_label = new createjs.Text(window.language.lobby.dealerspaced,"bold 18px latobold","#fff");
			dealer_label.x = dealer_cards_bg.x + (106/2);
			dealer_label.y = dealer_cards_bg.y + 95;
			dealer_label.textAlign = "center"
			poker_c[x].addChild(dealer_label);

			if(window.language.locale == "zh") {
							dealer_label.font = "bold 23px latobold";
							dealer_label.y = dealer_cards_bg.y + 90;
			}

			// === community cards bg
			let community_cards_bg = new createjs.Shape();
			community_cards_bg.graphics.beginFill("#afafaf").drawRoundRect(0,0,279,128,10);
			community_cards_bg.x = 475;
			community_cards_bg.y = self.all_list_table[x].y + 12;
			poker_c[x].addChild(community_cards_bg);

			let community_cards_bg_2 = new createjs.Shape();
			community_cards_bg_2.graphics.beginFill("#7a7a7a").drawRoundRect(0,0,128,72,8);
			community_cards_bg_2.y = self.all_list_table[x].y + 20;
			community_cards_bg_2.x = community_cards_bg.x + 6;
			poker_c[x].addChild(community_cards_bg_2);

			let community_cards_bg_3 = new createjs.Shape();
			community_cards_bg_3.graphics.beginFill("#7a7a7a").drawRoundRect(0,0,60,72,8);
			community_cards_bg_3.y = self.all_list_table[x].y + 20;
			community_cards_bg_3.x = community_cards_bg_2.x + 5 + 130;
			poker_c[x].addChild(community_cards_bg_3);

			let community_cards_bg_4 = new createjs.Shape();
			community_cards_bg_4.graphics.beginFill("#7a7a7a").drawRoundRect(0,0,60,72,8);
			community_cards_bg_4.y = self.all_list_table[x].y + 20;
			community_cards_bg_4.x = community_cards_bg_3.x + 5 + 65;
			poker_c[x].addChild(community_cards_bg_4);

			// === player cards bg
			let player_cards_bg = new createjs.Shape();
			player_cards_bg.graphics.beginFill("#1665c1").drawRoundRect(0,0, 106, 128,10);
			player_cards_bg.y = self.all_list_table[x].y + 12;
			player_cards_bg.x = 765;
			poker_c[x].addChild(player_cards_bg);

			let player_cards_bg_2 = new createjs.Shape();
			player_cards_bg_2.graphics.beginFill("#114ead").drawRoundRect(0,0,96,72,8);
			player_cards_bg_2.x = player_cards_bg.x + 5;
			player_cards_bg_2.y = self.all_list_table[x].y + 20;
			poker_c[x].addChild(player_cards_bg_2);

			let player_label = new createjs.Text(window.language.lobby.playerspaced,"bold 18px latobold","#fff");
			player_label.x = player_cards_bg.x + (106/2);
			player_label.y = player_cards_bg.y + 95;
			player_label.textAlign = "center";
			poker_c[x].addChild(player_label);

			if(window.language.locale == "zh") {
							player_label.font = "bold 23px latobold";
							player_label.y = player_cards_bg.y + 90;
			}

			let roadmap_bg = new createjs.Shape();
			roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,520,132);
			roadmap_bg.y = self.all_list_table[x].y + 150;
			roadmap_bg.x = 355
			poker_c[x].addChild(roadmap_bg);

			let lines = new createjs.Shape();
			lines.graphics.ss(.8).s("rgba(0,0,0,0.8)").moveTo(0,38)
			poker_c[x].addChild(lines);

			//pearl
			for(var i = 0; i <= 6; i++) {
				lines.graphics.moveTo(roadmap_bg.x,roadmap_bg.y+(21.88*i)).lineTo(roadmap_bg.x+520.6,roadmap_bg.y+(21.88*i))
			} // end for

			lines.graphics.moveTo(38,0);
			for(var i = 0; i <= 24; i++) {
				lines.graphics.moveTo((21.74*i) + roadmap_bg.x,roadmap_bg.y).lineTo((21.74*i)+ roadmap_bg.x,roadmap_bg.y+131)
			}
			lines.shadow = new createjs.Shadow("#000",2,2,6);
			lines.alpha = .5;

			// === table
			let table_header = new createjs.Shape();
			table_header.graphics.ss(1).s("#afafaf").beginFill("#c8c8c8").drawRect(0,0,365,45);
			table_header.x = 878;
			table_header.y = self.all_list_table[x].y + 16;
			poker_c[x].addChild(table_header);

			for(var i = 0; i < 3; i++) {
				let table_tr_1 = new createjs.Shape();
				table_tr_1.graphics.ss(1).s("#afafaf").beginFill("#dadada").drawRect(0,0,365,70);
				table_tr_1.x = 878;
				table_tr_1.y = self.all_list_table[x].y + (i*70) + (45) + 16;
				poker_c[x].addChild(table_tr_1);
			}
			// , window.language.lobby.result
	  let header_width = [60,80,140,80];
			let table_header_texts = [window.language.poker.gameno, window.language.poker.dealer, window.language.poker.communitycard, window.language.poker.player];
	  let col_x = 0;
			for(var i = 0; i < table_header_texts.length; i++) {
		col_x += header_width[i];
				let h_text = new createjs.Text(table_header_texts[i], "bold 14px latoBold", "#000");
		h_text.textAlign = "center";
		h_text.textBaseline = "middle"
		h_text.x = 878 + col_x - (header_width[i] / 2);
				h_text.y = table_header.y + 22.5;
				poker_c[x].addChild(h_text);

				if(window.language.locale == "zh") {
								h_text.font = "bold 20px latoBold";
				}
			} // end for

			self.all_list_table[x].card_result_container = new createjs.Container();
			self.all_list_table[x].card_result_container.y = self.all_list_table[x].y;
			self.all_list_table[x].card_result_container.x = self.all_list_table[x].x;
			poker_c[x].addChild(self.all_list_table[x].card_result_container);

			this.drawGameInfo(self.all_list_table[x].card_result_container);

			self.all_list_table[x].roadmap_container = new createjs.Container();
			self.all_list_table[x].roadmap_container.x = 355;
			self.all_list_table[x].roadmap_container.y = self.all_list_table[x].y + 151.5;
			poker_c[x].addChild(self.all_list_table[x].roadmap_container);


			self.all_list_table[x].pokerMeta_table_container = new createjs.Container();
			poker_c[x].addChild(self.all_list_table[x].pokerMeta_table_container);

			poker_c[x].addChild(self.all_list_table[x].bet_range_container);
			//Maintenance
			let header_bg = [];
			let text_color = "";

			self.all_list_table[x].maintenanceCon = new createjs.Container();
			self.all_list_table[x].maintenanceCon.visible = false;
			poker_c[x].addChild(self.all_list_table[x].maintenanceCon);

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

			self.all_list_table[x].table_name = new createjs.Text(window.language.lobby.texas,"bold 20px ArvoItalic","#fdba44");
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

		drawTableData(data) {

			if(!self.all_list_table[x] || !self.all_list_table[x].pokerMeta_table_container) return;

			let data_2 = _.clone(data);

			data_2 = _.filter(data_2, (data) =>{
				if(data.gameInfo) return data;
			});

			self.all_list_table[x].pokerMeta_table_container.removeAllChildren();

			self.all_list_table[x].table_round_num = [];
			self.all_list_table[x].dealer_card = [];
			self.all_list_table[x].community_card = [];
			self.all_list_table[x].player_card = [];
			self.all_list_table[x].result = [];

	  		let header_width = [60,80,140,80];

			for(var i = 0; i < data_2.length; i++) {
				self.all_list_table[x].table_round_num[i] = new createjs.Text(data_2[i].roundNum,"bold 16px lato", "#000");
				self.all_list_table[x].table_round_num[i].textAlign = "center";
				self.all_list_table[x].table_round_num[i].textBaseline = "middle";
				self.all_list_table[x].table_round_num[i].x = 30;
				self.all_list_table[x].table_round_num[i].y = 28 + (i*70);
				self.all_list_table[x].pokerMeta_table_container.addChild(self.all_list_table[x].table_round_num[i])

				self.all_list_table[x].dealer_card[i] = [];

				for(var e = 0;  e < data_2[i].gameInfo.dealer.length; e++ ) {
					self.all_list_table[x].dealer_card[i][e] = createCardSprite(self,74,99,"/img/cards/lobby_sprite_cards.png");
					self.all_list_table[x].dealer_card[i][e].gotoAndPlay("C"+data_2[i].gameInfo.dealer[e]);
					self.all_list_table[x].dealer_card[i][e].scaleX = self.all_list_table[x].dealer_card[i][e].scaleY = 0.45
					self.all_list_table[x].dealer_card[i][e].x = 70 + (e*28);
		  			self.all_list_table[x].dealer_card[i][e].y = 5 + (i*70);
					self.all_list_table[x].pokerMeta_table_container.addChild(self.all_list_table[x].dealer_card[i][e]);
				} //end for

				//== community
				let community_card = _.union(data_2[i].gameInfo.flop,[data_2[i].gameInfo.turn],[data_2[i].gameInfo.river]);

				self.all_list_table[x].community_card[i] = [];
				for(var e = 0;  e < community_card.length; e++ ) {
					self.all_list_table[x].community_card[i][e]= createCardSprite(self,74,99,"/img/cards/lobby_sprite_cards.png");
					self.all_list_table[x].community_card[i][e].gotoAndPlay("C"+community_card[e]);
					self.all_list_table[x].community_card[i][e].x = 140 + (e*28);
					self.all_list_table[x].community_card[i][e].y = 5 + (i*70);
					self.all_list_table[x].community_card[i][e].scaleY = self.all_list_table[x].community_card[i][e].scaleX = 0.45
					self.all_list_table[x].pokerMeta_table_container.addChild(self.all_list_table[x].community_card[i][e]);
				} // end for

				//== player
				self.all_list_table[x].player_card[i] = [];
				for(var e = 0;  e < data_2[i].gameInfo.player.length; e++ ) {
					self.all_list_table[x].player_card[i][e]= createCardSprite(self,74,99,"/img/cards/lobby_sprite_cards.png");
					self.all_list_table[x].player_card[i][e].gotoAndPlay("C"+data_2[i].gameInfo.player[e]);
					self.all_list_table[x].player_card[i][e].x = 290 + (e*28);
					self.all_list_table[x].player_card[i][e].y = 5 + (i*70);
					self.all_list_table[x].player_card[i][e].scaleY = self.all_list_table[x].player_card[i][e].scaleX = 0.45
					self.all_list_table[x].pokerMeta_table_container.addChild(self.all_list_table[x].player_card[i][e]);
				} // end for

				let color = "#0d47a1"
				if(data_2[i].result == "dealer") {
					color = "#b71c1c"
				}
			}

			self.all_list_table[x].pokerMeta_table_container.x = 878;
			self.all_list_table[x].pokerMeta_table_container.y =  self.all_list_table[x].y +  70;
		},
		capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},

		thumbnailCreate () {

			self.all_thumbnial_table[x].roadmap_container = new createjs.Container();
			self.thumbnail_view.addChild(self.all_thumbnial_table[x].roadmap_container);
			self.all_thumbnial_table[x].roadmap_container.x  = self.all_thumbnial_table[x].x + 8;
			self.all_thumbnial_table[x].roadmap_container.y  = self.all_thumbnial_table[x].y + 130;

			self.all_thumbnial_table[x].card_res_bg_container = new createjs.Container();
			self.all_thumbnial_table[x].card_res_bg_container.visible = false;
			self.all_thumbnial_table[x].card_res_bg_container.x = self.all_thumbnial_table[x].x
			self.all_thumbnial_table[x].card_res_bg_container.y = self.all_thumbnial_table[x].y + 122
			self.thumbnail_view.addChild(self.all_thumbnial_table[x].card_res_bg_container);

			self.all_thumbnial_table[x].card_result_container = new createjs.Container();
			self.all_thumbnial_table[x].card_result_container.visible = false;
			self.all_thumbnial_table[x].card_result_container.x = self.all_thumbnial_table[x].x
			self.all_thumbnial_table[x].card_result_container.y = self.all_thumbnial_table[x].y + 122
			self.thumbnail_view.addChild(self.all_thumbnial_table[x].card_result_container);

			let poker_result_bg = new createjs.Shape();
			poker_result_bg.graphics.beginFill("#fff").drawRect(0,0,400,94);
			self.all_thumbnial_table[x].card_res_bg_container.addChild(poker_result_bg);

			let banker_bg = new createjs.Shape();
			banker_bg.graphics.beginFill("#d22d2e").drawRoundRect(0,0,90,75,6);
			banker_bg.x = 10 ;
			banker_bg.y = 10;
			self.all_thumbnial_table[x].card_res_bg_container.addChild(banker_bg);

			let community_bg = new createjs.Shape();
			community_bg.graphics.beginFill("#afafaf").drawRoundRect(0,0,180,75,6);
			community_bg.x = 110;
			community_bg.y = 10;
			self.all_thumbnial_table[x].card_res_bg_container.addChild(community_bg);

			let player_bg = new createjs.Shape();
			player_bg.graphics.beginFill("#1665c1").drawRoundRect(0,0,90,75,6);
			player_bg.x = 300;
			player_bg.y = 10;
			self.all_thumbnial_table[x].card_res_bg_container.addChild(player_bg);


		},
		drawGameInfo () {
			if(!self.all_list_table[x] || !self.all_list_table[x].card_result_container) return;

			let cards = createCardSprite(self,74,99, self.context.getResources("cards"));
			cards.scaleX = cards.scaleY = 0.62;
			cards.y = 24

			if(data.gameInfo.player === undefined) return;

			if(data.gameInfo.player.length) {
				for(var e = 0; e < data.gameInfo.player.length; e++) {
					cards.x = (e* 36) + 777;
					cards.gotoAndStop("C"+data.gameInfo.player[e]);
					self.all_list_table[x].card_result_container.addChild(_.clone(cards));
				}
			}

			if(data.gameInfo.flop.length) {
				for(var e = 0; e < data.gameInfo.flop.length; e++) {
					cards.x = (e* 36) + 485;
					cards.gotoAndStop("C"+data.gameInfo.flop[e]);
					self.all_list_table[x].card_result_container.addChild(_.clone(cards));
				}
			}
			if(data.gameInfo.turn) {
				cards.x = 622;
				cards.gotoAndStop("C"+data.gameInfo.turn);
				self.all_list_table[x].card_result_container.addChild(_.clone(cards));
			}

			if(data.gameInfo.river) {
				cards.x = 692;
				cards.gotoAndStop("C"+data.gameInfo.river);
				self.all_list_table[x].card_result_container.addChild(_.clone(cards));
			}

			if(data.gameInfo.dealer.length) {
				for(var e = 0; e < data.gameInfo.dealer.length; e++) {
					cards.x = (e * 36) + 368;
					cards.gotoAndStop("C"+data.gameInfo.dealer[e]);
					self.all_list_table[x].card_result_container.addChild(_.clone(cards));
				}
			}

		},
		inputRes (data, type) {

			if(!self.all_list_table[x] || !self.all_list_table[x].card_result_container) return;

			if(!data.gameInfo.burn.length && !data.gameInfo.flop.length && !data.gameInfo.turn && !data.gameInfo.river && !data.gameInfo.player.length && !data.gameInfo.dealer.length) return;

			let cards = createCardSprite(self,74,99,self.context.getResources("cards"));
			let posX = 0;
			let posY = 0;
			let isThumbnail = false;

			cards.scaleX = cards.scaleY = 0.62;
			cards.y = 24

			if(data.gameInfo.player.length && data.gameInfo.player.length <= 2) {
				cards.gotoAndStop("C"+data.gameInfo.player[data.gameInfo.player.length-1]);
				cards.x = ((data.gameInfo.player.length - 1)* 36) + 777
			}

			if(data.gameInfo.flop.length && data.gameInfo.flop.length <= 3) {
				cards.x = ((data.gameInfo.flop.length-1)* 38) + 485;
				cards.gotoAndStop("C"+data.gameInfo.flop[data.gameInfo.flop.length-1]);

			}

			if(data.gameInfo.turn) {
				cards.x = 622;
				cards.gotoAndStop("C"+data.gameInfo.turn);
			}

			if(data.gameInfo.river) {
				cards.x = 692;
				cards.gotoAndStop("C"+data.gameInfo.river);
			}

			if(data.gameInfo.dealer.length && data.gameInfo.dealer.length <= 2) {
				cards.x = ((data.gameInfo.dealer.length - 1)* 36) + 368;
				cards.gotoAndStop("C"+data.gameInfo.dealer[data.gameInfo.dealer.length-1]);
			}

			self.all_list_table[x].card_result_container.addChild(cards);

			if(self.all_list_table[x] && self.all_list_table[x].status) {
				self.all_list_table[x].status.text = window.language.lobby.dealing;
			}
			
			if(isThumbnail) {
				self.all_thumbnial_table[x].card_result_container.visible = true;
				self.all_thumbnial_table[x].card_res_bg_container.visible = true;
				cards.y = 17
				cards.scaleX = cards.scaleY = 0.6
				self.all_thumbnial_table[x].card_result_container.addChild(cards);
			}

		},
		drawRoadMap(data, type) {

			if(!self.all_list_table[x] || !self.all_list_table[x].roadmap_container) return;

			let circle = "#1268cb";

			let radius = 10;
			let posX = 0;
			let posY = 0;

			if(type == "list") {
				radius = 10;
				posX = 21.6;
				posY = 21.6;
			} else {
				posX = 16.2;
				posY = 15.8;
				radius = 7;
			}

	  self.all_list_table[x].roadmap_container.cache(0, 0, 521, 132);
			self.all_list_table[x].roadmap_container.removeAllChildren()

			if(self.all_thumbnial_table) {
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
					sp.x = (e*21.8) + 10;
					sp.y = (i*21.8) + 10;

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

						self.all_list_table[x].roadmap_container.addChild(sp, text)
					}
				}
			} // end for

	  self.all_list_table[x].roadmap_container.updateCache();

		}
	}
	return instance;
}
