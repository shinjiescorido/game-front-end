import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';
import rmformat from '../../factories/formatter';

let formatData = rmformat();
let instance = null;

instance = {
		tables :[],
    makeListTables (data, _target, _timer_c,  x, self) {
    	this.tables[x] = _target.tables

			// === game rounds
      let game_rounds_label = new createjs.Text(window.language.lobby.game ,"18px lato","#fff");
      game_rounds_label.x = 200;
      game_rounds_label.y = 84 + this.tables[x].y ;
      _target.addChild(game_rounds_label);

      if(window.language.locale == "zh") {
				game_rounds_label.font = "23px latoregular";
			}

      let game_label_height = game_rounds_label.getMeasuredHeight();
      this.tables[x].round_num.text = data.currentRound;
      this.tables[x].round_num.textAlign = "right";
      this.tables[x].round_num.x = 295;
      this.tables[x].round_num.y = game_rounds_label.y + game_label_height + 20;
	  	//=== table status
	  	let round_num_height = this.tables[x].round_num.getMeasuredHeight();
      this.tables[x].status.text = window.language.lobby.nowbetting;
      this.tables[x].status.x = game_rounds_label.x;
      this.tables[x].status.y = this.tables[x].round_num.y + round_num_height + 20;

			// === timer
			this.tables[x].timer.x =  -5;
			this.tables[x].timer.y =  this.tables[x].y + 24.8;

			// === dealer image
			this.tables[x].dealer_img_bg.x = 92;
			this.tables[x].dealer_img_bg.y = this.tables[x].y + 122;

			this.tables[x].dealer_img.x = this.tables[x].dealer_img_bg.x + 180;
			this.tables[x].dealer_img.y = this.tables[x].dealer_img_bg.y  + 180;

			// === dealer name
			this.tables[x].dealer_name.text = data.currentDealer;
			this.tables[x].dealer_name.x = 92;
			this.tables[x].dealer_name.y = 190 + this.tables[x].y;
			_target.addChild(this.tables[x].dealer_name);

			//dealer cards
			let dealer_cards_bg = new createjs.Shape();
			dealer_cards_bg.graphics.beginFill("#d32f30").drawRoundRect(0,0,106,128,10);
			dealer_cards_bg.x = 356;
			dealer_cards_bg.y = this.tables[x].y + 12;
			_target.addChild(dealer_cards_bg);

			let dealer_cards_bg_2 = new createjs.Shape();
			dealer_cards_bg_2.graphics.beginFill("#bb1b1b").drawRoundRect(0,0,96,72,8);
			dealer_cards_bg_2.x = dealer_cards_bg.x + 5 ;
			dealer_cards_bg_2.y = this.tables[x].y + 20;
			_target.addChild(dealer_cards_bg_2);

			let dealer_label = new createjs.Text(window.language.lobby.dealerspaced,"bold 18px latobold","#fff");
			dealer_label.x = dealer_cards_bg.x + (106/2);
			dealer_label.y = dealer_cards_bg.y + 95;
			dealer_label.textAlign = "center"
			_target.addChild(dealer_label);

				if(window.language.locale == "zh") {
							dealer_label.font = "bold 23px latobold";
							dealer_label.y = dealer_cards_bg.y + 90;
			}

			// === community cards bg
			let community_cards_bg = new createjs.Shape();
			community_cards_bg.graphics.beginFill("#afafaf").drawRoundRect(0,0,279,128,10);
			community_cards_bg.x = 475;
			community_cards_bg.y = this.tables[x].y + 12;
			_target.addChild(community_cards_bg);

			let community_cards_bg_2 = new createjs.Shape();
			community_cards_bg_2.graphics.beginFill("#7a7a7a").drawRoundRect(0,0,128,72,8);
			community_cards_bg_2.y = this.tables[x].y + 20;
			community_cards_bg_2.x = community_cards_bg.x + 6;
			_target.addChild(community_cards_bg_2);

			let community_cards_bg_3 = new createjs.Shape();
			community_cards_bg_3.graphics.beginFill("#7a7a7a").drawRoundRect(0,0,60,72,8);
			community_cards_bg_3.y = this.tables[x].y + 20;
			community_cards_bg_3.x = community_cards_bg_2.x + 5 + 130;
			_target.addChild(community_cards_bg_3);

			let community_cards_bg_4 = new createjs.Shape();
			community_cards_bg_4.graphics.beginFill("#7a7a7a").drawRoundRect(0,0,60,72,8);
			community_cards_bg_4.y = this.tables[x].y + 20;
			community_cards_bg_4.x = community_cards_bg_3.x + 5 + 65;
			_target.addChild(community_cards_bg_4);

			// === player cards bg
			let player_cards_bg = new createjs.Shape();
			player_cards_bg.graphics.beginFill("#1665c1").drawRoundRect(0,0, 106, 128,10);
			player_cards_bg.y = this.tables[x].y + 12;
			player_cards_bg.x = 765;
			_target.addChild(player_cards_bg);

			let player_cards_bg_2 = new createjs.Shape();
			player_cards_bg_2.graphics.beginFill("#114ead").drawRoundRect(0,0,96,72,8);
			player_cards_bg_2.x = player_cards_bg.x + 5;
			player_cards_bg_2.y = this.tables[x].y + 20;
			_target.addChild(player_cards_bg_2);

			let player_label = new createjs.Text(window.language.lobby.playerspaced,"bold 18px latobold","#fff");
			player_label.x = player_cards_bg.x + (106/2);
			player_label.y = player_cards_bg.y + 95;
			player_label.textAlign = "center";
			_target.addChild(player_label);

			if(window.language.locale == "zh") {
				player_label.font = "bold 23px latobold";
				player_label.y = player_cards_bg.y + 90;
			}

			let roadmap_bg = new createjs.Shape();
			roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,520,132);
			roadmap_bg.y = this.tables[x].y + 150;
			roadmap_bg.x = 355
			_target.addChild(roadmap_bg);

			let lines = new createjs.Shape();
			lines.graphics.ss(.8).s("rgba(0,0,0,0.8)").moveTo(0,38)
			_target.addChild(lines);

			//pearl
			for(var i = 0; i <= 6; i++) {
				lines.graphics.moveTo(roadmap_bg.x,roadmap_bg.y+(21.88*i)).lineTo(roadmap_bg.x+520.6,roadmap_bg.y+(21.88*i))
			} // end for

			lines.graphics.moveTo(38,0);
			for(var i = 0; i <= 24; i++) {
				lines.graphics.moveTo((21.74*i) + roadmap_bg.x,roadmap_bg.y).lineTo((21.74*i)+ roadmap_bg.x,roadmap_bg.y+131)
			}
      // lines.shadow = new createjs.Shadow("#000",2,2,6);
      lines.alpha = .5;

			// === table
			let table_header = new createjs.Shape();
			table_header.graphics.ss(1).s("#afafaf").beginFill("#c8c8c8").drawRect(0,0,365,45);
			table_header.x = 878;
			table_header.y = this.tables[x].y + 16;
			_target.addChild(table_header);

			for(var i = 0; i < 3; i++) {
				let table_tr_1 = new createjs.Shape();
				table_tr_1.graphics.ss(1).s("#afafaf").beginFill("#dadada").drawRect(0,0,365,70);
				table_tr_1.x = 878;
				table_tr_1.y = this.tables[x].y + (i*70) + (45) + 16;
				_target.addChild(table_tr_1);
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
				_target.addChild(h_text);

				if(window.language.locale == "zh") {
								h_text.font = "bold 20px latoBold";
				}
			} // end for

			this.tables[x].card_result_container = new createjs.Container();
			this.tables[x].card_result_container.y = this.tables[x].y;
			this.tables[x].card_result_container.x = this.tables[x].x;
			_target.addChild(this.tables[x].card_result_container);

			this.tables[x].roadmap_container = new createjs.Container();
			this.tables[x].roadmap_container.x = 355;
			this.tables[x].roadmap_container.y = this.tables[x].y + 151.5;
			_target.addChild(this.tables[x].roadmap_container);

			this.tables[x].pokerMeta_table_container = new createjs.Container();
			_target.addChild(this.tables[x].pokerMeta_table_container);

			_target.addChild(this.tables[x].bet_range_container);

			//Maintenance
			let header_bg = [];
			let text_color = "";

			this.tables[x].maintenanceCon = new createjs.Container();
			this.tables[x].maintenanceCon.visible = false;
			_target.addChild(this.tables[x].maintenanceCon);

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

			this.tables[x].maintenanceBg = new createjs.Shape();
			this.tables[x].maintenanceBg.graphics.beginFill("#333333").drawRoundRect(0, 0, 1250, 283, 6);
			this.tables[x].maintenanceBg.x = this.tables[x].x;
			this.tables[x].maintenanceBg.y = this.tables[x].y + 1;
			this.tables[x].maintenanceBg.table_id = data.tableNumber;
			this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceBg);

			this.tables[x].maintenanceHeader = new createjs.Shape();
			this.tables[x].maintenanceHeader.x = this.tables[x].x;
			this.tables[x].maintenanceHeader.y = this.tables[x].y - 1;
			this.tables[x].maintenanceHeader.graphics.beginLinearGradientFill(["#960000", "#2a0001"],[0,1],0,0,1250,10).drawRoundRectComplex(0,0,1250,285,10,10,0,0);
			this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceHeader);

			this.tables[x].table_name = new createjs.Text(window.language.lobby.texas,"bold 20px ArvoItalic","#fdba44");
			this.tables[x].table_name.x = 80;
			this.tables[x].table_name.y = 13 + this.tables[x].y;
			this.tables[x].maintenanceCon.addChild(this.tables[x].table_name);

			this.tables[x].table_num = new createjs.Text(data.tableNumber.length < 2 ? "0"+data.tableNumber : data.tableNumber,"21px ArvoBold","#fdba44");
			this.tables[x].table_num.x = 40; //this.tables[x].table_name.x - (this.tables[x].table_name.getBounds().width / 2) - 10;
			this.tables[x].table_num.y = 11 + this.tables[x].y;
			this.tables[x].maintenanceCon.addChild(this.tables[x].table_num);

			this.tables[x].maintenanceLogo = new createjs.Bitmap(self.context.load.getResources("maintenance_ico"));
			this.tables[x].maintenanceLogo.x = 30;
			this.tables[x].maintenanceLogo.y = 90 + this.tables[x].y;
			this.tables[x].maintenanceLogo.scaleX = this.tables[x].maintenanceLogo.scaleY = 0.85;
			this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceLogo);

			this.tables[x].maintenanceTxt = new createjs.Text('', '30px bebasneue', '#ffb547');
			this.tables[x].maintenanceTxt.x = 205;
			this.tables[x].maintenanceTxt.y = 110 + this.tables[x].y;
			this.tables[x].maintenanceTxt.textAlign = 'left';
			this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceTxt);

			this.tables[x].maintenanceSubTxt = new createjs.Text('', '28px bebasneue', '#fff');
			this.tables[x].maintenanceSubTxt.x = 205;
			this.tables[x].maintenanceSubTxt.y = 150 + this.tables[x].y;
			this.tables[x].maintenanceSubTxt.textAlign = 'left';
			this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceSubTxt);

			this.tables[x].maintenanceTime = new createjs.Text('', '26px bebasneue', '#fff');
			this.tables[x].maintenanceTime.x = 205;
			this.tables[x].maintenanceTime.y = 185 + this.tables[x].y;
			this.tables[x].maintenanceTime.textAlign = 'left';
			this.tables[x].maintenanceCon.addChild(this.tables[x].maintenanceTime);

			this.checkMaintenance(data, false, x);

			this.drawRoadMap(data, _target, _timer_c,  x, self);
			this.drawTableData(data, _target, _timer_c,  x, self);
			this.drawGameInfo(data, _target, _timer_c,  x, self);

    },
		setResult(data, _target, _timer_c,  x, self) {
			if(!this.tables[x] || !this.tables[x].status) return;
			this.tables[x].status.text  = window.language.lobby.result;
		},
    checkMaintenance (maintenanceData, socket, x) {
			if(!this.tables || !this.tables[x] || !this.tables[x].maintenanceCon) return;
			if (window.userAuthority === "admin") return;

			let maintenance = false;
	   	let activeMaintenance = [];
			let mainText = '';
			let subText = '';

			let maintenanceSetting = [];
			if (!socket) {
			maintenanceSetting = maintenanceData.maintenanceSetting.maintenance;
	
			for (var i = 0; i < maintenanceSetting.length; i++) {
				if (this.tables[x].slave === maintenanceSetting[i].type) {
					for (var j = 0; j < maintenanceSetting[i].info.length; j++) {
						if (maintenanceSetting[i].info[j].status === 1) {
							maintenance = true;
							activeMaintenance = maintenanceSetting[i].info[j];
						}
					} // end for loop
				}
				else if (this.tables[x].slave === '' && maintenanceSetting[i].type === 'normal') {
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

			if (this.tables[x].slave === activeMaintenance.slave) {
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
	    	this.tables[x].maintenanceCon.visible = true;
	    	this.tables[x].maintenanceTxt.text = mainText;
	    	this.tables[x].maintenanceSubTxt.text = subText;
	   		this.tables[x].maintenanceTime.text = newStartTime +' ~ '+ newEndTime;
		  }
		  else {
		  	this.tables[x].maintenanceCon.visible = false;
		  }
    },
    drawTableData(data, _target, _timer_c,  x, self) {

			if(!this.tables[x] || !this.tables[x].pokerMeta_table_container) return;

			let meta = data.meta;

			let data_2 = _.clone(meta);

			data_2 = _.filter(data_2, (d) =>{
				if(d.gameInfo) return d;
			});

			this.tables[x].pokerMeta_table_container.removeAllChildren();

			this.tables[x].table_round_num = [];
			this.tables[x].dealer_card = [];
			this.tables[x].community_card = [];
			this.tables[x].player_card = [];
			this.tables[x].result = [];
      let header_width = [60,80,140,80];
			for(var i = 0; i < data_2.length; i++) {
				this.tables[x].table_round_num[i] = new createjs.Text(data_2[i].roundNum,"bold 16px lato", "#000");
        this.tables[x].table_round_num[i].textAlign = "center";
        this.tables[x].table_round_num[i].textBaseline = "middle";
        this.tables[x].table_round_num[i].x = 30;
				this.tables[x].table_round_num[i].y = 28 + (i*70);
				this.tables[x].pokerMeta_table_container.addChild(this.tables[x].table_round_num[i])

				this.tables[x].dealer_card[i] = [];

				for(var e = 0;  e < data_2[i].gameInfo.dealer.length; e++ ) {
					this.tables[x].dealer_card[i][e] = createCardSprite(self,74,99,"/img/cards/lobby_sprite_cards.png");
					this.tables[x].dealer_card[i][e].gotoAndPlay("C"+data_2[i].gameInfo.dealer[e]);
					this.tables[x].dealer_card[i][e].scaleX = this.tables[x].dealer_card[i][e].scaleY = 0.45
					this.tables[x].dealer_card[i][e].x = 70 + (e*28);
          this.tables[x].dealer_card[i][e].y = 5 + (i*70);
					this.tables[x].pokerMeta_table_container.addChild(this.tables[x].dealer_card[i][e]);
				} //end for

				//== community
				let community_card = _.union(data_2[i].gameInfo.flop,[data_2[i].gameInfo.turn],[data_2[i].gameInfo.river]);

				this.tables[x].community_card[i] = [];
				for(var e = 0;  e < community_card.length; e++ ) {
					this.tables[x].community_card[i][e]= createCardSprite(self,74,99,"/img/cards/lobby_sprite_cards.png");
					this.tables[x].community_card[i][e].gotoAndPlay("C"+community_card[e]);
					this.tables[x].community_card[i][e].x = 140 + (e*28);
					this.tables[x].community_card[i][e].y = 5 + (i*70);
					this.tables[x].community_card[i][e].scaleY = this.tables[x].community_card[i][e].scaleX = 0.45
					this.tables[x].pokerMeta_table_container.addChild(this.tables[x].community_card[i][e]);
				} // end for

				//== player
				this.tables[x].player_card[i] = [];
				for(var e = 0;  e < data_2[i].gameInfo.player.length; e++ ) {
					this.tables[x].player_card[i][e]= createCardSprite(self,74,99,"/img/cards/lobby_sprite_cards.png");
					this.tables[x].player_card[i][e].gotoAndPlay("C"+data_2[i].gameInfo.player[e]);
					this.tables[x].player_card[i][e].x = 290 + (e*28);
					this.tables[x].player_card[i][e].y = 5 + (i*70);
					this.tables[x].player_card[i][e].scaleY = this.tables[x].player_card[i][e].scaleX = 0.45
					this.tables[x].pokerMeta_table_container.addChild(this.tables[x].player_card[i][e]);
					// self.player_card[i][e].shadow = new createjs.Shadow("#000000", 1, 0, 6);
				} // end for

				let color = "#0d47a1"
				if(data_2[i].result == "dealer") {
					color = "#b71c1c"
				} else if(data_2[i].result == 'tie') {
					color = "#689f38"
				}

				if(data_2[i].gameInfo.isVoid) {
        	let voidContainer = new createjs.Container();
        	voidContainer.isVoid = true;

					var voidShape = new createjs.Shape();
					voidShape.graphics.beginFill("#212120").drawRect(0, (i*68) - 8, 365,68);
					voidContainer.addChild(voidShape);

        	var voidText = new createjs.Text("GAME VOID", " bold 16px lato", "#fff");
        	voidText.set({x: 365/3, y: (i*68) - 8 + (68/2), textBaseline: 'middle'})
        	voidContainer.addChild(voidText);

	        var voidImg = new createjs.Bitmap(self.context.load.getResources("void"));
	        voidImg.set({x: voidText.x + voidText.getMeasuredWidth() + 20, y: (i*68) - 8 + (68/2), regY : voidImg.getBounds().height/2});
	        voidContainer.addChild(voidImg);
        
					this.tables[x].pokerMeta_table_container.addChild(voidContainer);
				}

			}

			this.tables[x].pokerMeta_table_container.x = 878;
			this.tables[x].pokerMeta_table_container.y =  this.tables[x].y +  70;
		},
    drawRoadMap(data, _target, _timer_c,  x, self) {

			if(!this.tables[x] || !this.tables[x].roadmap_container) return;

			let circle = "#1268cb";

			let marks = formatData.fnFormatPokerRoadMap(data.marks,6,23)

			let radius = 10;
			let posX = 0;
			let posY = 0;

			radius = 10;
			posX = 21.6;
			posY = 21.6;
			
      this.tables[x].roadmap_container.cache(0, 0, 521, 132);
			this.tables[x].roadmap_container.removeAllChildren()

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
					sp.x = (e*21.8) + 10;
					sp.y = (i*21.8) + 10;

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

					this.tables[x].roadmap_container.addChild(sp, text)
				}
			} // end for

      this.tables[x].roadmap_container.updateCache();
		},
		drawGameInfo (data, _target, _timer_c,  x, self) {
			if(!this.tables[x] || !this.tables[x].card_result_container) return;

			let cards = createCardSprite(self,74,99, self.context.load.getResources("cards"));
			cards.scaleX = cards.scaleY = 0.62;
			cards.y = 24
			if(data.gameInfo.player === undefined) return;

			if(data.gameInfo.player.length) {
				for(var e = 0; e < data.gameInfo.player.length; e++) {
					cards.x = (e* 36) + 777;
					cards.gotoAndStop("C"+data.gameInfo.player[e]);
					this.tables[x].card_result_container.addChild(_.clone(cards));
				}
			}

			if(data.gameInfo.flop.length) {
				for(var e = 0; e < data.gameInfo.flop.length; e++) {
					cards.x = (e* 36) + 485;
					cards.gotoAndStop("C"+data.gameInfo.flop[e]);
					this.tables[x].card_result_container.addChild(_.clone(cards));
				}
			}
			if(data.gameInfo.turn) {
				cards.x = 622;
				cards.gotoAndStop("C"+data.gameInfo.turn);
				this.tables[x].card_result_container.addChild(_.clone(cards));
			}

			if(data.gameInfo.river) {
				cards.x = 692;
				cards.gotoAndStop("C"+data.gameInfo.river);
				this.tables[x].card_result_container.addChild(_.clone(cards));
			}

			if(data.gameInfo.dealer.length) {
				for(var e = 0; e < data.gameInfo.dealer.length; e++) {
					cards.x = (e * 36) + 368;
					cards.gotoAndStop("C"+data.gameInfo.dealer[e]);
					this.tables[x].card_result_container.addChild(_.clone(cards));
				}
			}

		},
		inputRes (data, _target, _timer_c,  x, self, card_data) {

			if(!this.tables[x] || !this.tables[x].card_result_container) return;

   		if(!card_data.gameInfo.burn.length && !card_data.gameInfo.flop.length && !card_data.gameInfo.turn && !card_data.gameInfo.river && !card_data.gameInfo.player.length && !card_data.gameInfo.dealer.length) return;

			let cards = createCardSprite(self,74,99,self.context.load.getResources("cards"));
			let posX = 0;
			let posY = 0;
			let isThumbnail = false;

			cards.scaleX = cards.scaleY = 0.62;
			cards.y = 24

			if(card_data.gameInfo.player.length && card_data.gameInfo.player.length <= 2) {
				cards.gotoAndStop("C"+card_data.gameInfo.player[card_data.gameInfo.player.length-1]);
				cards.x = ((card_data.gameInfo.player.length - 1)* 36) + 777
			}

			if(card_data.gameInfo.flop.length && card_data.gameInfo.flop.length <= 3) {
				cards.x = ((card_data.gameInfo.flop.length-1)* 38) + 485;
				cards.gotoAndStop("C"+card_data.gameInfo.flop[card_data.gameInfo.flop.length-1]);

			}

			if(card_data.gameInfo.turn) {
				cards.x = 622;
				cards.gotoAndStop("C"+card_data.gameInfo.turn);
			}

			if(card_data.gameInfo.river) {
				cards.x = 692;
				cards.gotoAndStop("C"+card_data.gameInfo.river);
			}

			if(card_data.gameInfo.dealer.length && card_data.gameInfo.dealer.length <= 2) {
				cards.x = ((card_data.gameInfo.dealer.length - 1)* 36) + 368;
				cards.gotoAndStop("C"+card_data.gameInfo.dealer[card_data.gameInfo.dealer.length-1]);
			}

			this.tables[x].card_result_container.addChild(cards);
		},
}
export default {
	instance
}