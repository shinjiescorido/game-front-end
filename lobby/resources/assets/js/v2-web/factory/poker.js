import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';
import rmformat from '../../factories/formatter';

let formatData = rmformat();
let instance = null;


instance = {
	list_tables :[],
	makeListTables (data, _target, _timer_c,  x, self) {
		this.list_tables[x] = _target.list_tables
		
		// self.context.lobby_banner.banner_container.visible = true;
		// self.context.lobby_banner.table_banner_container.removeAllChildren()
		let label_spacing = 15;


		// === game rounds
		let game_rounds_label = new createjs.Text(window.language.lobby.game ,"18px latoregular","#fff");
		game_rounds_label.x = 180;
		game_rounds_label.y = this.list_tables[x].y + label_spacing + 94;
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
		// this.list_tables[x].status.text = window.language.lobby.nowbetting;
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

		//dealer cards
		let dealer_cards_bg = new createjs.Shape();
		dealer_cards_bg.graphics.beginFill("#d32f30").drawRoundRect(0,0,264,128,10);
		dealer_cards_bg.x = 356;
		dealer_cards_bg.y = this.list_tables[x].y + 12;
		_target.addChild(dealer_cards_bg);

		let dealer_cards_bg_2 = new createjs.Shape();
		dealer_cards_bg_2.graphics.beginFill("#bb1b1b").drawRoundRect(0,0,150,112,10);
		dealer_cards_bg_2.x = 460;
		dealer_cards_bg_2.y = this.list_tables[x].y + 20;
		_target.addChild(dealer_cards_bg_2);

		let dealer_label = new createjs.Text(window.language.lobby.dealerspaced,"bold 18px latobold","#fff");
		dealer_label.x = dealer_cards_bg.x + 10;
		dealer_label.y = dealer_cards_bg.y + 52;
		_target.addChild(dealer_label);

		if(window.language.locale == "zh") {
			dealer_label.font = "bold 30px latobold";
			dealer_label.x = dealer_cards_bg.x + 20;
			dealer_label.y = dealer_cards_bg.y + 48;
		} //end if

		// === community cards bg
		let community_cards_bg = new createjs.Shape();
		community_cards_bg.graphics.beginFill("#afafaf").drawRoundRect(0,0,460,128,10);
		community_cards_bg.x = 628;
		community_cards_bg.y = this.list_tables[x].y + 12;
		_target.addChild(community_cards_bg);

		let community_cards_bg_2 = new createjs.Shape();
		community_cards_bg_2.graphics.beginFill("#7a7a7a").drawRoundRect(0,0,220,112,10);
		community_cards_bg_2.y = this.list_tables[x].y + 20;
		community_cards_bg_2.x = 647;
		_target.addChild(community_cards_bg_2);

		let community_cards_bg_3 = new createjs.Shape();
		community_cards_bg_3.graphics.beginFill("#7a7a7a").drawRoundRect(0,0,85,112,10);
		community_cards_bg_3.y = this.list_tables[x].y + 20;
		community_cards_bg_3.x = 882;
		_target.addChild(community_cards_bg_3);

		let community_cards_bg_4 = new createjs.Shape();
		community_cards_bg_4.graphics.beginFill("#7a7a7a").drawRoundRect(0,0,85,112,10);
		community_cards_bg_4.y = this.list_tables[x].y + 20;
		community_cards_bg_4.x = 979;
		_target.addChild(community_cards_bg_4);

		// === player cards bg
		let player_cards_bg = new createjs.Shape();
		player_cards_bg.graphics.beginFill("#1665c1").drawRoundRect(0,0, 264, 128,10);
		player_cards_bg.y = this.list_tables[x].y + 12;
		player_cards_bg.x = 1096;
		_target.addChild(player_cards_bg);

		let player_cards_bg_2 = new createjs.Shape();
		player_cards_bg_2.graphics.beginFill("#114ead").drawRoundRect(0,0,150,112,10);
		player_cards_bg_2.x = player_cards_bg.x + 13;
		player_cards_bg_2.y = this.list_tables[x].y + 20;
		_target.addChild(player_cards_bg_2);

		let player_label = new createjs.Text(window.language.lobby.playerspaced,"bold 18px latobold","#fff");
		player_label.x = player_cards_bg.x + 168;
		player_label.y = player_cards_bg.y + 52;
		_target.addChild(player_label);

		if(window.language.locale == "zh") {
			player_label.font = "bold 30px latobold";
			player_label.x = player_cards_bg.x + 175;
			player_label.y = player_cards_bg.y + 48;
		} //end if

		let roadmap_bg = new createjs.Shape();
		roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,521.76,129);
		roadmap_bg.y = (this.list_tables[x].y) + 153;
		roadmap_bg.x = this.list_tables[x].x + 355;
		_target.addChild(roadmap_bg);

		let lines = new createjs.Shape();
		lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0,0)
		_target.addChild(lines);
		let posY =  roadmap_bg.y;
		let posX =  roadmap_bg.x

		for(var i = 0; i <= 6 ; i++) {
			lines.graphics.moveTo(posX,posY+ (21.5*i)).lineTo(posX + 521.76, posY+ (21.5*i))
		}
		lines.graphics.moveTo(posX,posY)
		for(var i = 0; i <= 24 ; i++) {
			lines.graphics.moveTo(posX+(21.74*i),posY).lineTo(posX+(21.74*i),posY + 129)
		}
		// lines.shadow = new createjs.Shadow("#000",2,2,6);
		lines.alpha =.5;
		// === table
		let table_header = new createjs.Shape();
		table_header.graphics.ss(1).s("#afafaf").beginFill("#c8c8c8").drawRect(0,0,482,22);
		table_header.x = 878;
		table_header.y = this.list_tables[x].y + 152.5;
		_target.addChild(table_header);

		for(var i = 0; i < 3; i++) {
			let table_tr_1 = new createjs.Shape();
			table_tr_1.graphics.ss(1).s("#afafaf").beginFill("#dadada").drawRect(0,0,482,36);
			table_tr_1.x = 878;
			table_tr_1.y = this.list_tables[x].y + (i*36) + (174);
			_target.addChild(table_tr_1);
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
			h_text.y = this.list_tables[x].y + 164;

	    if(i == 0) { h_text.x -= 10; }

			if(window.language.locale == "zh") {
				h_text.font = "bold 15px latoBold";
				h_text.y = this.list_tables[x].y + 162;
			}

				_target.addChild(h_text);
			} // end for

		this.list_tables[x].card_result_container = new createjs.Container();
		this.list_tables[x].card_result_container.y = this.list_tables[x].y;
		this.list_tables[x].card_result_container.x = this.list_tables[x].x;
		_target.addChild(this.list_tables[x].card_result_container);

		this.list_tables[x].roadmap_container = new createjs.Container();
		this.list_tables[x].roadmap_container.x = 366;
		this.list_tables[x].roadmap_container.y = this.list_tables[x].y + 164;
		_target.addChild(this.list_tables[x].roadmap_container);

		_target.addChild(this.list_tables[x].maintenance_container);

		this.list_tables[x].pokerMeta_table_container = new createjs.Container();
		_target.addChild(this.list_tables[x].pokerMeta_table_container);


		// === maintenance
		this.list_tables[x].maintenanceCon = new createjs.Container();
		this.list_tables[x].maintenanceCon.visible = false;
		_target.addChild(this.list_tables[x].maintenanceCon)

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

		this.list_tables[x].table_name = new createjs.Text(data.slave && data.slave == "bonusplus" ? window.language.level.bonusplus : window.language.lobby.texas,"22px ArvoItalic","#fdba44");
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
		this.list_tables[x].maintenanceLogo.scaleX = this.list_tables[x].maintenanceLogo.scaleY = 0.85;
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
		this.drawGameInfo(data, _target, _timer_c,  x, self);
		this.drawTableData(data, _target, _timer_c,  x, self);
		this.drawRoadMap(data, _target, _timer_c,  x, self);
	
	},
	checkMaintenance (maintenanceData, socket, x) {
			if(!this.list_tables || !this.list_tables[x] || !this.list_tables[x].maintenanceCon) return;

			if (window.userAuthority === "admin") return;

		   	let maintenance = false;
		   	let activeMaintenance = [];
			let mainText = '';
			let subText = '';
			let maintenanceSetting = [];
			if (!socket) {
			maintenanceSetting = maintenanceData.maintenanceSetting.maintenance;
	
			for (var i = 0; i < maintenanceSetting.length; i++) {
					if (this.list_tables[x].slave === maintenanceSetting[i].type) {
						for (var j = 0; j < maintenanceSetting[i].info.length; j++) {
							if (maintenanceSetting[i].info[j].status === 1) {
								maintenance = true;
								activeMaintenance = maintenanceSetting[i].info[j];
							}
						} // end for loop
					}
					else if (this.list_tables[x].slave === '' && maintenanceSetting[i].type === 'normal') {
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
				activeMaintenance = maintenanceData.data;
	
				if (this.list_tables[x].slave === activeMaintenance.slave) {
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
	inputRes (data, _target, _timer_c,  x, self) {
		if(!this.list_tables[x] || !this.list_tables[x].card_result_container) return;

 		if(!data.gameInfo.burn.length && !data.gameInfo.flop.length && !data.gameInfo.turn && !data.gameInfo.river && !data.gameInfo.player.length && !data.gameInfo.dealer.length) return;

		let cards = createCardSprite(self,80,120,"/img/cards/mobile_sprite_cards.png");
		let posX = 0;
		let posY = 0;
		let isThumbnail = false;

		cards.scaleX = cards.scaleY = 0.8;
		cards.y = 28

		if(data.gameInfo.player.length && data.gameInfo.player.length <= 2 && data.gameInfo.player.length > 0) {
			cards.gotoAndStop("C"+data.gameInfo.player[data.gameInfo.player.length-1]);
			cards.x = ((data.gameInfo.player.length - 1)* 65) + 1118
		}

		if(data.gameInfo.flop.length && data.gameInfo.flop.length <= 3 && data.gameInfo.flop.length > 0) {
			cards.x = ((data.gameInfo.flop.length-1)* 65) + 660;
			cards.gotoAndStop("C"+data.gameInfo.flop[data.gameInfo.flop.length-1]);
		}

		if(data.gameInfo.turn) {
			cards.x = 892;
			cards.gotoAndStop("C"+data.gameInfo.turn);
		}

		if(data.gameInfo.river) {
			cards.x = 989;
			cards.gotoAndStop("C"+data.gameInfo.river);
		}

		if(data.gameInfo.dealer.length && data.gameInfo.dealer.length <= 2 && data.gameInfo.dealer.length > 0) {
			cards.x = ((data.gameInfo.dealer.length - 1)* 65) + 470;
			cards.gotoAndStop("C"+data.gameInfo.dealer[data.gameInfo.dealer.length-1]);
		}

		if(this.list_tables[x] && this.list_tables[x].status) {
			this.list_tables[x].status.text = window.language.lobby.dealing;
		}

		this.list_tables[x].card_result_container.addChild(cards);
	},
	drawGameInfo (data, _target, _timer_c,  x, self) {
		let cards = createCardSprite(self,80,120,"/img/cards/mobile_sprite_cards.png");
		cards.scaleX = cards.scaleY = 0.8;
		cards.y = 28;

		if(data.gameInfo.player === undefined) return;

		if(data.gameInfo.player.length) {
			for(var e = 0; e < data.gameInfo.player.length; e++) {
				cards.x = e* 65 + 1118;
				cards.gotoAndStop("C"+data.gameInfo.player[e]);
				this.list_tables[x].card_result_container.addChild(_.clone(cards));
			}
		}

		if(data.gameInfo.flop.length) {
			for(var e = 0; e < data.gameInfo.flop.length; e++) {
				cards.x = (e* 65) + 660;
				cards.gotoAndStop("C"+data.gameInfo.flop[e]);
				this.list_tables[x].card_result_container.addChild(_.clone(cards));
			}
		}
		if(data.gameInfo.turn) {
			cards.x = 892;
			cards.gotoAndStop("C"+data.gameInfo.turn);
			this.list_tables[x].card_result_container.addChild(_.clone(cards));
		}

		if(data.gameInfo.river) {
			cards.x = 989;
			cards.gotoAndStop("C"+data.gameInfo.river);
			this.list_tables[x].card_result_container.addChild(_.clone(cards));
		}

		if(data.gameInfo.dealer.length) {
			for(var e = 0; e < data.gameInfo.dealer.length; e++) {
				cards.x = (e * 65) + 470;
				cards.gotoAndStop("C"+data.gameInfo.dealer[e]);
				this.list_tables[x].card_result_container.addChild(_.clone(cards));
			}
		}
	},
	drawTableData (data, _target, _timer_c,  x, self) {
		if(!this.list_tables[x] || !this.list_tables[x].pokerMeta_table_container) return;

		let meta = data.meta;

		let data_2 = _.clone(meta);

		this.list_tables[x].pokerMeta_table_container.removeAllChildren();

		this.list_tables[x].table_round_num = [];
		this.list_tables[x].dealer_card = [];
		this.list_tables[x].community_card = [];
		this.list_tables[x].player_card = [];
		this.list_tables[x].result = [];


	  data_2 = _.filter(data_2, (data) =>{
			if(data.gameInfo) return data;
		});

		for(var i = 0; i < data_2.length; i++) {
			this.list_tables[x].table_round_num[i] = new createjs.Text(data_2[i].roundNum,"bold 16px lato", "#000");
      this.list_tables[x].table_round_num[i].textAlign = "center";
      this.list_tables[x].table_round_num[i].textBaseline = "middle";
      this.list_tables[x].table_round_num[i].x = 15;
			this.list_tables[x].table_round_num[i].y = (i*35) + 12;
			this.list_tables[x].pokerMeta_table_container.addChild(this.list_tables[x].table_round_num[i])

			this.list_tables[x].dealer_card[i] = [];

			for(var e = 0;  e < data_2[i].gameInfo.dealer.length; e++ ) {
				this.list_tables[x].dealer_card[i][e] = createCardSprite(self,22,29,"/img/cards/cards_mobile_sprite_v2_small.png");
				this.list_tables[x].dealer_card[i][e].gotoAndPlay("C"+data_2[i].gameInfo.dealer[e]);
				// this.list_tables[x].dealer_card[i][e].scaleX = this.list_tables[x].dealer_card[i][e].scaleY = 1.1
        this.list_tables[x].dealer_card[i][e].x = (e*20) + 69;
				this.list_tables[x].dealer_card[i][e].y = (i*35);
				this.list_tables[x].pokerMeta_table_container.addChild(this.list_tables[x].dealer_card[i][e]);
			} //end for

			//== community
			let community_card = _.union(data_2[i].gameInfo.flop,[data_2[i].gameInfo.turn],[data_2[i].gameInfo.river]);

			this.list_tables[x].community_card[i] = [];
			for(var e = 0;  e < community_card.length; e++ ) {
				this.list_tables[x].community_card[i][e]= createCardSprite(self,22,29,"/img/cards/cards_mobile_sprite_v2_small.png");
				this.list_tables[x].community_card[i][e].gotoAndPlay("C"+community_card[e]);
				this.list_tables[x].community_card[i][e].x = 138 + (e*20);
				this.list_tables[x].community_card[i][e].y = (i*35);
				// this.list_tables[x].community_card[i][e].scaleY = this.list_tables[x].community_card[i][e].scaleX = 1.1
				this.list_tables[x].pokerMeta_table_container.addChild(this.list_tables[x].community_card[i][e]);
			} // end for

			//== player
			this.list_tables[x].player_card[i] = [];

			for(var e = 0;  e < data_2[i].gameInfo.player.length; e++ ) {
				this.list_tables[x].player_card[i][e]= createCardSprite(self,22,29,"/img/cards/cards_mobile_sprite_v2_small.png");
				this.list_tables[x].player_card[i][e].gotoAndPlay("C"+data_2[i].gameInfo.player[e]);
				this.list_tables[x].player_card[i][e].x = 267 + (e*20);
				this.list_tables[x].player_card[i][e].y = (i*35);
				// this.list_tables[x].player_card[i][e].scaleY = this.list_tables[x].player_card[i][e].scaleX = 1.1
				this.list_tables[x].pokerMeta_table_container.addChild(this.list_tables[x].player_card[i][e]);
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
				color = '#689f38';
			}
			this.list_tables[x].result[i] = new createjs.Text(text, "bold 14px arial", color);
  		this.list_tables[x].result[i].textAlign = "center";
  		this.list_tables[x].result[i].textBaseline = "middle";
			this.list_tables[x].result[i].x = 390;
			this.list_tables[x].result[i].y = (i*36) + 12.6;
			this.list_tables[x].pokerMeta_table_container.addChild(this.list_tables[x].result[i])

			//void
			if(data_2[i].gameInfo.isVoid) {
				console.log("void");

        let voidContainer = new createjs.Container();
        voidContainer.isVoid = true;

				var voidShape = new createjs.Shape();
				voidShape.graphics.beginFill("#212120").drawRect(-22,(i*35) - 5,480,36);
				voidContainer.addChild(voidShape);

        var voidText = new createjs.Text("GAME VOID", " bold 12px lato", "#fff");
        voidText.set({x: 480/3, y: (i*35) - 5 + (36/2), textBaseline: 'middle'})
        voidContainer.addChild(voidText);
        
        var voidImg = new createjs.Bitmap(self.context.load.getResources("void"));
        voidImg.set({x: voidText.x + voidText.getMeasuredWidth() + 20, y: (i*35) - 5 + (36/2), regY : voidImg.getBounds().height/2});
        voidContainer.addChild(voidImg);

				this.list_tables[x].pokerMeta_table_container.addChild(voidContainer);

			}

		}

		this.list_tables[x].pokerMeta_table_container.x = 900;
		this.list_tables[x].pokerMeta_table_container.y =  this.list_tables[x].y +  180;
	},
	drawRoadMap (data, _target, _timer_c,  x, self) {
		if(!this.list_tables[x] || !this.list_tables[x].roadmap_container) return

		let circle = "#1268cb";

		let radius = 10;
		let posX = 21.7;
		let posY = 21.6;
	
		let marks = formatData.fnFormatPokerRoadMap(data.marks,6,23)

		this.list_tables[x].roadmap_container.removeAllChildren()

		for(var e = 0; e < marks.length; e++) {
			for(var i = 0; i < marks[e].length; i++) {
				var sp = new createjs.Shape();
				if(!marks[e][i]) continue;

				if(marks[e][i] == "D") {
					circle = "#cd342f"
				} else if(marks[e][i] == "T") {
					circle = "#41a257"
				}else if(marks[e][i] == "P") {
					circle = "#1268cb"
				}

				sp.graphics.beginFill(circle).drawCircle(0,0,radius);
				sp.x = e*posX;
				sp.y = i*posY;

				let text;

				if(window.language.locale == "zh") {
					if(marks[e][i] == "P") { text = new createjs.Text("闲", "12.5px lato", "#fff"); }
					if(marks[e][i] == "T") { text = new createjs.Text("和", "12.5px lato", "#fff"); }
					if(marks[e][i] == "D") { text = new createjs.Text("荷", "12.5px lato", "#fff"); }
				} else {
					if(marks[e][i] == "P") { text = new createjs.Text("P", "10px lato", "#fff"); }
					if(marks[e][i] == "T") { text = new createjs.Text("T", "10px lato", "#fff"); }
					if(marks[e][i] == "D") { text = new createjs.Text("D", "10px lato", "#fff"); }
				}

				text.x = sp.x;
				text.y = sp.y;
				text.textAlign = "center";
				text.textBaseline = "middle";

				this.list_tables[x].roadmap_container.addChild(sp, text);
			}
		} // end for
	}
}

export default {
	instance
}