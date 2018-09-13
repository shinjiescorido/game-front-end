import timer from '../../timer-animation';
import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';

let instance = null;

instance = {
  thumb_tables : [],
  list_tables : [],
	roomlist_tables : [],
  getText(x,y,text,font,color,align,valign){
		let ctrl = new createjs.Text(text,font,color);
		ctrl.x = x;
		ctrl.y = y;
		ctrl.textAlign = align;
		ctrl.textBaseline = valign;//"middle"
		return ctrl;
	},
  makeThumbnailTables (data, _target, _timer_c,  x, self) {
  	if(_target) {
      _target.removeAllChildren()
    }

    if(_timer_c) {
      _timer_c.removeAllChildren()
    }

		let index_count = 0;
		let header_bg = null;
		let text_color = "";

		let slaveName = '';

		if (!data.slave || data.slave === null || data.slave.length === 0) {
			slaveName = 'normal';
		}
		else {
			slaveName = data.slave;
		}

		this.thumb_tables[x] = new createjs.Shape();
		this.thumb_tables[x].graphics.beginFill("#fff").drawRoundRectComplex(0,38,915,96+84,0,0,0,0);
		this.thumb_tables[x].setBounds(0,0,915,216);
		this.thumb_tables[x].slave = slaveName;
		this.thumb_tables[x].game_name = data.gameName;
		this.thumb_tables[x].table_number = data.tableNumber;

		_target.addChild(this.thumb_tables[x]);

    let roadmap_ct = new createjs.Container();
		let roadmap_bg = new createjs.Shape();
		roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,915,108.5);
		roadmap_bg.y = (this.thumb_tables[x].y + 40);
		roadmap_bg.x = this.thumb_tables[x].x;
    roadmap_bg.cache(0,0,915,108.5);
		roadmap_ct.addChild(roadmap_bg);
		roadmap_ct.set({x:160,y:40});
		_target.addChild(roadmap_ct);

    let lines = new createjs.Shape();
		lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0,0);
		roadmap_ct.addChild(lines);

    let posY = 0;// roadmap_bg.y;
    let posX = 0;// roadmap_bg.x;
    lines.graphics.moveTo(posX,posY);
    for(var i = 0; i <= 6 ; i++) {
      lines.graphics.moveTo(posX,posY+ (29.3*i)).lineTo(posX + 238.6, posY+ (29.3*i));
    }

    for(var i = 0; i <= 8 ; i++) {
			lines.graphics.moveTo(posX+(30*i),posY).lineTo(posX+(30*i),posY+192);
		}

    for(var i = 0; i <= 12 ; i++) {
      lines.graphics.moveTo(posX+238.6,posY+ (14.63*i)).lineTo(685, posY+ (14.63*i));
    }

    for(var i = 0; i <= 30 ; i++) {
			var road_x = posX+238.6+(14.93*i);
      lines.graphics.moveTo(road_x,posY).lineTo(road_x, posY+ 192);
		}

    lines.graphics.ss(1.5);
    lines.graphics.moveTo(posX+238.6,0).lineTo(posX+238.6, 195);
    lines.graphics.moveTo(posX+238.6,posY+ (14.53*6)).lineTo(685, posY+ (14.53*6));
    lines.graphics.moveTo(posX+238.6,posY+ (22.13*6)).lineTo(685, posY+ (22.13*6));
    lines.graphics.moveTo(posX+238.6+(15.93*14),132.3).lineTo(posX+238.6+(15.93*14), 180);

		lines.alpha =.5;


    this.thumb_tables[x].game_num = new createjs.Text("#", "21px LatoBold","#000");
    this.thumb_tables[x].game_num.textAlign = 'left';
    this.thumb_tables[x].game_num.x = 863;
    this.thumb_tables[x].game_num.y = 45;
    _target.addChild(this.thumb_tables[x].game_num);

    this.thumb_tables[x].game_numtext = new createjs.Text("89", "20px LatoBold","#000");
    this.thumb_tables[x].game_numtext.textAlign = 'left';
    this.thumb_tables[x].game_numtext.x = this.thumb_tables[x].game_num.x + 20;
    this.thumb_tables[x].game_numtext.y = 45;
    _target.addChild(this.thumb_tables[x].game_numtext);

    this.player_indi = new createjs.Container();
		this.playerpair_indi = new createjs.Container();
		this.playernat_indi = new createjs.Container();

		this.banker_indi = new createjs.Container();
		this.bankerpair_indi = new createjs.Container();
		this.bankernat_indi = new createjs.Container();

		this.tie_indi = new createjs.Container();
    _target.addChild(this.player_indi, this.playerpair_indi, this.playernat_indi, this.banker_indi, this.bankerpair_indi, this.bankernat_indi, this.tie_indi);

    // === player count cosmetics
		let player_indi = new createjs.Shape();
		player_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,10);
    player_indi.x = this.thumb_tables[x].game_num.x + 5;
    player_indi.y = this.thumb_tables[x].game_num.y + 40;
    this.player_indi.addChild(player_indi);

    let p_text = this.getText( player_indi.x,player_indi.y, window.language.locale == "zh" ? "闲" : "P","13px lato","#fff","center","middle"); //new createjs.Text("P","12px lato", "#fff");
    this.player_indi.addChild(p_text);

    //bankernatural
		let banker_indi = new createjs.Shape();
		banker_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,10);
    banker_indi.x = player_indi.x;
    banker_indi.y = player_indi.y + 28;
		this.banker_indi.addChild(banker_indi);

    let b_text = this.getText( banker_indi.x,banker_indi.y, window.language.locale == "zh" ? "庄" : "B","13px lato","#fff","center","middle"); // new createjs.Text("B","12px lato", "#fff");
    this.banker_indi.addChild(b_text);

    //tie
		let tie_indi =  new createjs.Shape();
		tie_indi.graphics.ss(1).s("#fff").beginFill("#689f39").drawCircle(0,0,10);
    tie_indi.x = banker_indi.x;
    tie_indi.y = banker_indi.y + 28;
		this.tie_indi.addChild(tie_indi);

		let t_text = this.getText( tie_indi.x,tie_indi.y, window.language.locale == "zh" ? "和" : "T","13px lato","#fff","center","middle"); //new createjs.Text("T","12px lato", "#fff");
		this.tie_indi.addChild(t_text);

    //playerpair
		let playerpair_indi =  new createjs.Shape();
		playerpair_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,10);
    playerpair_indi.x = tie_indi.x;
    playerpair_indi.y = tie_indi.y + 28;
		this.playerpair_indi.addChild(playerpair_indi);

		let p_text2 = this.getText( playerpair_indi.x,playerpair_indi.y, window.language.locale == "zh" ? "闲" : "P","13px lato","#fff","center","middle"); //new createjs.Text("P","12px lato", "#fff");
		this.playerpair_indi.addChild(p_text2);

    let playerpair_indi2 =  new createjs.Shape();
		playerpair_indi2.graphics.ss(0.5).s("#fff").beginFill("#1465bf").drawCircle(0,0,2.8);
		playerpair_indi2.x = playerpair_indi.x + 7;
		playerpair_indi2.y = playerpair_indi.y + 6;
		this.playerpair_indi.addChild(playerpair_indi2);

    //bankerpair
		let bankerpair_indi = new createjs.Shape();
		bankerpair_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,10);
    bankerpair_indi.x = playerpair_indi.x;
    bankerpair_indi.y = playerpair_indi.y + 28;
		this.bankerpair_indi.addChild(bankerpair_indi);

		let bankerpair_indi2 =  new createjs.Shape();
		bankerpair_indi2.graphics.ss(0.5).s("#fff").beginFill("#d42e2e").drawCircle(0,0,2.8);
		bankerpair_indi2.x = bankerpair_indi.x - 7;
		bankerpair_indi2.y = bankerpair_indi.y - 6;
		this.bankerpair_indi.addChild(bankerpair_indi2);

		let b_text2 = this.getText( bankerpair_indi.x,bankerpair_indi.y, window.language.locale == "zh" ? "庄" : "B","12px lato","#fff","center","middle"); // new createjs.Text("B","12px lato", "#fff");
		this.bankerpair_indi.addChild(b_text2);


		// **** end roadmap **** //

		this.thumb_tables[x].header = new createjs.Shape();
		this.thumb_tables[x].header.x = this.thumb_tables[x].x;
		this.thumb_tables[x].header.y = this.thumb_tables[x].y;

		let level = '';
		let slave_level = '';
		let icoLocation = '';

		if (data.slave && data.slave == 'supersix') {
			icoLocation = 'supersix/super6_table_grid';
		}
		else if (data.slave && data.slave == 'bonus') {
			icoLocation = 'bonus/bonus_table_grid';
		}

		if(data.roomType == "p") {
			header_bg = ["#bd0000","#7c0000"];
			text_color = "#efb052";
			level = window.language.level.premium;
		} else if(data.roomType == "v") {
			header_bg = ["#ffd67a","#ae8110"];
			text_color = "#000";
			level = window.language.level.vip;

			if (data.slave && data.slave == 'supersix') {
				icoLocation = 'supersix/super6_tablevip_grid';
			}
			else if (data.slave && data.slave == 'bonus') {
				icoLocation = 'bonus/bonus_tablevip_grid';
			}
		} else {
			header_bg = ["#980000","#2b0000"];
			text_color = "#efb052";
		}

		slave_level = level;

		this.thumb_tables[x].header.graphics.beginLinearGradientFill(header_bg,[0,1],0,0,350,10)
    .drawRoundRectComplex(0,0,400,(this.thumb_tables[x].getBounds().height-176),10,0,0,0);
		_target.addChild(this.thumb_tables[x].header);

		this.thumb_tables[x].header_2 = new createjs.Shape();
		this.thumb_tables[x].header_2.x = this.thumb_tables[x].x;
		this.thumb_tables[x].header_2.y = this.thumb_tables[x].y + 40;
		this.thumb_tables[x].header_2.graphics.beginFill("#333").drawRect(0,0,160, this.thumb_tables[x].getBounds().height);
		_target.addChild(this.thumb_tables[x].header_2);

		let thumbTblText = '';

		switch(data.gameName) {
			case "Baccarat" :
				if (data.slave == 'supersix' || data.slave == 'bonus') {
          this.thumb_tables[x].slaveIcon = new createjs.Bitmap("/img/icons/baccarat/"+icoLocation+'.png');
          if(data.roomType == "v") {
            this.thumb_tables[x].slaveIcon.x = this.thumb_tables[x].x + 130;
          } else if(data.roomType == "p") {
            this.thumb_tables[x].slaveIcon.x = this.thumb_tables[x].x + 130;
          } else {
            this.thumb_tables[x].slaveIcon.x = this.thumb_tables[x].x + 130;
          }

					this.thumb_tables[x].slaveIcon.y = this.thumb_tables[x].y + 2;
					_target.addChild(this.thumb_tables[x].slaveIcon);
				}

				if(!level) {
					level = window.language.level.normal;
				}

				thumbTblText = level;

				for (var i = 0; i < window.bcSetting.length; i++) {
					if (parseInt(data.tableNumber) == window.bcSetting[i].id) {
						let betSetting = JSON.parse(window.bcSetting[i].bet_setting);

						if (betSetting.type[0] == 'flippy') {
              this.thumb_tables[x].flippyImg = new createjs.Bitmap('/img//flippy.png');

              if(data.roomType == "v") {
                this.thumb_tables[x].flippyImg.x = (this.thumb_tables[x].x + 400 / 2) - 105;
              } else if(data.roomType == "p") {
                this.thumb_tables[x].flippyImg.x = (this.thumb_tables[x].x + 400 / 2) - 50;
              } else {
                this.thumb_tables[x].flippyImg.x = (this.thumb_tables[x].x + 400 / 2) - 85;
              }
              this.thumb_tables[x].flippyImg.y = this.thumb_tables[x].y + 2;
              _target.addChild(this.thumb_tables[x].flippyImg);

						}
					}
				} // end for
				break;
			case "Poker" :
				thumbTblText = window.language.lobby.texas+' '+level;
					if( data.slave && data.slave=='bonusplus' ){
						thumbTblText = window.language.level.bonusplus;
					}
				break;
			case "Dragon-Tiger" :
				thumbTblText = window.language.lobby.dragontiger+' '+level;
				break;
			case "Poker" :
				thumbTblText = window.language.lobby.texas+' '+level;
				break;
			case "Sicbo" :
				thumbTblText = window.language.lobby.sicbo+' '+level;
				break;
		}

		this.thumb_tables[x].table_num = new createjs.Text(parseInt(data.tableNumber) > 9 ? data.tableNumber : "0" + data.tableNumber , "20px LatoBold",text_color);
		// this.thumb_tables[x].table_num.x = (this.thumb_tables[x].x + (data.slave == 'supersix' || data.slave == 'bonus' ? 380 : 400) / 2) - (this.thumb_tables[x].table_text.getMetrics().width / 2) + 10;
		this.thumb_tables[x].table_num.textAlign = 'left';
    if(data.roomType == "v") {
      this.thumb_tables[x].table_num.x = 60;
    } else if(data.roomType == "p") {
      this.thumb_tables[x].table_num.x = 115;
    } else {
      this.thumb_tables[x].table_num.x = 80;
    }

		this.thumb_tables[x].table_num.y = this.thumb_tables[x].y + 7;
		_target.addChild(this.thumb_tables[x].table_num);

		this.thumb_tables[x].table_text = new createjs.Text(thumbTblText, "20px ArvoItalic",text_color);
		this.thumb_tables[x].table_text.textAlign = "left";
		// this.thumb_tables[x].table_text.x = (this.thumb_tables[x].x + 400 / 2) + this.thumb_tables[x].table_num.getMetrics().width;
		this.thumb_tables[x].table_text.x = 16;
		this.thumb_tables[x].table_text.y = this.thumb_tables[x].y + 8;
		_target.addChild(this.thumb_tables[x].table_text);

		if (data.slave == 'supersix') {
			this.thumb_tables[x].table_num.x += 35;
			this.thumb_tables[x].table_text.x += 35;

			console.log('table: ', this.thumb_tables[x].table_num)
		}

		if (data.slave == 'bonus') {
			this.thumb_tables[x].table_num.x += 45;
			this.thumb_tables[x].table_text.x += 45;
		}

		if(window.language.locale == "zh") {
			// this.thumb_tables[x].table_num.x -= 5;
			// this.thumb_tables[x].table_text.x -= 5;

			this.thumb_tables[x].table_text.font = "bold 20px ArvoItalic";
			this.thumb_tables[x].table_text.y -= 2;
			// this.thumb_tables[x].table_text.y = this.thumb_tables[x].y + 6;
			// this.thumb_tables[x].table_text.x = (this.thumb_tables[x].x + 400 / 2) + this.thumb_tables[x].table_num.getMetrics().width + 3;

			if(thumbTblText == "Flippy Main") {
				this.thumb_tables[x].table_text.font = "bold 17px ArvoItalic";
				// this.thumb_tables[x].table_text.y = this.thumb_tables[x].y + 9;
				// this.thumb_tables[x].table_text.x = (this.thumb_tables[x].x + 400 / 2) + this.thumb_tables[x].table_num.getMetrics().width;
      }
		}

		this.thumb_tables[x].dealer_bg = new createjs.Shape();
		this.thumb_tables[x].dealer_bg.graphics.beginLinearGradientFill(["#b59d58","#ffef87"], [0, 1], 0, 110, 70, 100).drawCircle(0,0,50);
		this.thumb_tables[x].dealer_bg.x = this.thumb_tables[x].x + 78.5;
		this.thumb_tables[x].dealer_bg.y = this.thumb_tables[x].y + 109 - .7;
		_target.addChild(this.thumb_tables[x].dealer_bg);


		//== timer
		this.thumb_tables[x].timer = _.clone(timer());
		this.thumb_tables[x].timer.scaleX = this.thumb_tables[x].timer.scaleY = 0.98;
		this.thumb_tables[x].timer.x = this.thumb_tables[x].x - 5;
		this.thumb_tables[x].timer.y = this.thumb_tables[x].y + 25.5;

		if(_timer_c) {
      _timer_c.addChild(this.thumb_tables[x].timer);
    } // if has timer canvas
    else {
      _target.addChild(this.thumb_tables[x].timer);
    } // if no tiumer canvas

		this.thumb_tables[x].dealer_img = new createjs.Bitmap();
		this.thumb_tables[x].dealer_img.x = this.thumb_tables[x].x + 29;
		this.thumb_tables[x].dealer_img.y = this.thumb_tables[x].y + 61;
		this.thumb_tables[x].dealer_img.scaleY = this.thumb_tables[x].dealer_img.scaleX = .75;
		_target.addChild(this.thumb_tables[x].dealer_img);

		// === dealer name
		this.thumb_tables[x].dealer_name = new createjs.Text(data.currentDealer,"20px LatoBold","#fff");
		this.thumb_tables[x].dealer_name.x = this.thumb_tables[x].x + 50;
		this.thumb_tables[x].dealer_name.y = this.thumb_tables[x].y + 180;
		_target.addChild(this.thumb_tables[x].dealer_name);

		this.thumb_tables[x].dealer_id = data.dealerId;

		for (var i = 0; i < window.dealerImg.length; i++) {
      if (window.dealerImg[i].id == data.dealerId) {
        let dbImage = new Image();
        dbImage.src = window.dealerImg[i].dealer_image;
        this.thumb_tables[x].dealer_img.image = dbImage;
      }
    }

    let status = "";
		if(data.roundStatus == "P") {
			if(data.gameName != "Sicbo") {
				status = window.language.lobby.dealing;
			} else {
				status = window.language.lobby.result;
			}
		}
		if(data.roundStatus == "S") {
			status = window.language.lobby.nowbetting;
		}

		if(data.roundStatus == "E") {
			status = window.language.lobby.bettingend;
			if(!data.marks.length) {
				status = window.language.prompts.promptshuffling;
			}
		}

		if(data.roundStatus == "R") {
			status = window.language.lobby.result;
		}

		if(data.is_shoeChange) {
			if(!data.marks.length) {
				status = window.language.prompts.promptshuffling;
			}
		}

		this.thumb_tables[x].status = new createjs.Text(status,"20px LatoRegular","#fff");
		this.thumb_tables[x].status.x = this.thumb_tables[x].x + 280;
		this.thumb_tables[x].status.y = this.thumb_tables[x].y + 7;
		_target.addChild(this.thumb_tables[x].status);

		if(window.language.locale == "zh") {
				this.thumb_tables[x].status.font = "23px LatoRegular";
		}

		//=== view
		this.thumb_tables[x].view = new createjs.Container();
		let icon = createSprite(self.context.load.getResources("show_icon"),37.5, 23,this.thumb_tables[x].view)
		icon.gotoAndStop(0)
		let icon_bg = new createjs.Shape();
		icon_bg.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(-4,-4,100,60);
		this.thumb_tables[x].view.addChild(icon_bg, icon)

		this.thumb_tables[x].view.x = this.thumb_tables[x].x + 350;
		this.thumb_tables[x].view.y =this.thumb_tables[x].y + 8;
		this.thumb_tables[x].view.data = data;
		// _target.addChild( this.thumb_tables[x].view);

		if(data.gameName == "Baccarat") {
			this.thumb_tables[x].bigroad_container = new createjs.Container();
			this.thumb_tables[x].bigroad_container.x = this.thumb_tables[x].x + 550;
			this.thumb_tables[x].bigroad_container.y = this.thumb_tables[x].y + 122;
			// _target.addChild(this.thumb_tables[x].bigroad_container);

			let mask = new createjs.Shape();
			mask.graphics.beginFill("red").drawRect(0,0,915,100);

			mask.x = this.thumb_tables[x].x;
			mask.y = this.thumb_tables[x].bigroad_container.y
			this.thumb_tables[x].bigroad_container.mask = mask;

		}

		if(data.gameName == "Poker") {
			this.thumb_tables[x].roadmap_container = new createjs.Container();
			_target.addChild(this.thumb_tables[x].roadmap_container);
			this.thumb_tables[x].roadmap_container.x  = this.thumb_tables[x].x + 8;
			this.thumb_tables[x].roadmap_container.y  = this.thumb_tables[x].y + 130;
		}

		if(data.gameName == "Dragon-Tiger") {
      		this.thumb_tables[x].bigroad_container = new createjs.Container();
      		this.thumb_tables[x].bigroad_container.x = this.thumb_tables[x].x;
      		this.thumb_tables[x].bigroad_container.y = this.thumb_tables[x].y + 122;
      		_target.addChild(this.thumb_tables[x].bigroad_container);
		}

		if(data.gameName == "Poker") {
			this.thumb_tables[x].card_res_bg_container = new createjs.Container();
			this.thumb_tables[x].card_res_bg_container.visible = false;
			this.thumb_tables[x].card_res_bg_container.x = this.thumb_tables[x].x;
			this.thumb_tables[x].card_res_bg_container.y = this.thumb_tables[x].y + 122;
			_target.addChild(this.thumb_tables[x].card_res_bg_container);

			this.thumb_tables[x].card_result_container = new createjs.Container();
			this.thumb_tables[x].card_result_container.visible = false;
			this.thumb_tables[x].card_result_container.x = this.thumb_tables[x].x;
			this.thumb_tables[x].card_result_container.y = this.thumb_tables[x].y + 122;
			_target.addChild(this.thumb_tables[x].card_result_container);

			let poker_result_bg = new createjs.Shape();
			poker_result_bg.graphics.beginFill("#fff").drawRect(0,0,400,94);
			this.thumb_tables[x].card_res_bg_container.addChild(poker_result_bg);

			let banker_bg = new createjs.Shape();
			banker_bg.graphics.beginFill("#d22d2e").drawRoundRect(0,0,90,75,6);
			banker_bg.x = 10;
			banker_bg.y = 10;
			this.thumb_tables[x].card_res_bg_container.addChild(banker_bg);

			let community_bg = new createjs.Shape();
			community_bg.graphics.beginFill("#afafaf").drawRoundRect(0,0,180,75,6);
			community_bg.x = 110;
			community_bg.y = 10;
			this.thumb_tables[x].card_res_bg_container.addChild(community_bg);

			let player_bg = new createjs.Shape();
			player_bg.graphics.beginFill("#1665c1").drawRoundRect(0,0,90,75,6);
			player_bg.x = 300;
			player_bg.y = 10;
			this.thumb_tables[x].card_res_bg_container.addChild(player_bg);
		}

		// === bet range
		this.thumb_tables[x].bet_range_bg = new createjs.Shape();
		this.thumb_tables[x].bet_range_bg.x = this.thumb_tables[x].x + 915;
		this.thumb_tables[x].bet_range_bg.y = this.thumb_tables[x].y;
		this.thumb_tables[x].bet_range_bg.mask = this.thumb_tables[x];
		this.thumb_tables[x].bet_range_bg.graphics.beginFill("rgba(0,0,0,0.6)").drawRect(0,38,915 ,178);
		_target.addChild(this.thumb_tables[x].bet_range_bg);

		// === bet range container
		this.thumb_tables[x].bet_range_container = new createjs.Container();
		this.thumb_tables[x].bet_range_container.x = this.thumb_tables[x].x + 915;
		this.thumb_tables[x].bet_range_container.y = this.thumb_tables[x].y + 98;
		this.thumb_tables[x].bet_range_container.mask = this.thumb_tables[x];
		_target.addChild(this.thumb_tables[x].bet_range_container);

		// === enter button
		this.thumb_tables[x].enter_button = new createjs.Shape();
		this.thumb_tables[x].enter_button.graphics
		.beginLinearGradientFill(["#ffd474","#af8315"],[0,1],0,0,0,30)
		.drawRoundRect(0,0,110,26,6);

		this.thumb_tables[x].enter_button.x = this.thumb_tables[x].x + 280;
		this.thumb_tables[x].enter_button.trans = this.thumb_tables[x];
		this.thumb_tables[x].enter_button.y = this.thumb_tables[x].y + 48;
		// _target.addChild(this.thumb_tables[x].enter_button);

		let text = window.language.lobby.entercaps;
		let enterFont = "18px latobold";
		let y = 2;
		if(data.gameName == "Baccarat" || data.gameName == "Dragon-Tiger") {
			text = window.language.lobby.singleplayercaps;
			enterFont = "14px latobold";
			y = 4;
		}
		this.thumb_tables[x].enter_text = new createjs.Text(text,enterFont,"#000");

		this.thumb_tables[x].enter_text.x = this.thumb_tables[x].enter_button.x + (110/2);
		this.thumb_tables[x].enter_text.y = this.thumb_tables[x].enter_button.y + y;
		this.thumb_tables[x].enter_text.textAlign = "center";
		this.thumb_tables[x].enter_text.shadow = new createjs.Shadow("#dfd648",0,2,1);
		this.thumb_tables[x].enter_text.hitArea = this.thumb_tables[x].enter_button;
		// _target.addChild(this.thumb_tables[x].enter_text);

		if(window.language.locale == "zh") {
			this.thumb_tables[x].enter_text.font = "19px latobold";
			this.thumb_tables[x].enter_text.y = this.thumb_tables[x].enter_button.y + y - 2.5;
		}

		if(data.gameName == "Baccarat" || data.gameName == "Dragon-Tiger") {
			this.thumb_tables[x].multiplayer_button = new createjs.Shape();
			this.thumb_tables[x].multiplayer_button.graphics
			.beginLinearGradientFill(["#ffd474","#af8315"],[0,1],0,0,0,30)
			.drawRoundRect(0,0,110,26,6);

			this.thumb_tables[x].multiplayer_button.trans = this.thumb_tables[x];
			this.thumb_tables[x].multiplayer_button.x = this.thumb_tables[x].enter_button.x;
			this.thumb_tables[x].multiplayer_button.y = this.thumb_tables[x].enter_button.y + 34;
			// _target.addChild(this.thumb_tables[x].multiplayer_button);

			this.thumb_tables[x].multi_text = new createjs.Text(window.language.menu.multiplayer.toUpperCase(),enterFont,"#000");
			this.thumb_tables[x].multi_text.x = this.thumb_tables[x].multiplayer_button.x + (110/2);
			this.thumb_tables[x].multi_text.y = this.thumb_tables[x].multiplayer_button.y + 4;
			this.thumb_tables[x].multi_text.textAlign = "center";
			this.thumb_tables[x].multi_text.shadow = new createjs.Shadow("#dfd648",0,2,1);
			this.thumb_tables[x].multi_text.hitArea = this.thumb_tables[x].multiplayer_button;
			// _target.addChild(this.thumb_tables[x].multi_text);

			if(window.language.locale == "zh") {
				this.thumb_tables[x].multi_text.font = "19px latobold";
				this.thumb_tables[x].multi_text.y = this.thumb_tables[x].multiplayer_button.y + 1.5;
			}

			this.thumb_tables[x].multiplayer_button.on("mouseover",(e)=>{
				if(parseInt(e.currentTarget.is_maintenance)) return;
				$(".container").css('cursor','pointer')
				this.thumb_tables[x].multiplayer_button.graphics.clear().beginLinearGradientFill(["#c69522", "#ffd476"],[0,1],0,0,0,30).drawRoundRect(0,0,110,26,6);
			});

			this.thumb_tables[x].multiplayer_button.on("mouseout",(e)=>{
				$(".container").css('cursor','default')
				this.thumb_tables[x].multiplayer_button.graphics.clear().beginLinearGradientFill(["#ffd474", "#af8315"],[0,1],0,0,0,30).drawRoundRect(0,0,110,26,6);
			});
		}

		this.thumb_tables[x].enter_button.on("mouseover", (e) => {
			if(parseInt(e.currentTarget.is_maintenance)) return;
			$(".container").css('cursor','pointer')
			e.currentTarget.graphics.clear().beginLinearGradientFill(["#c69522", "#ffd476"],[0,1],0,0,0,30).drawRoundRect(0,0,110,26,6);
		});

		this.thumb_tables[x].enter_button.on("mouseout",(e)=>{
			$(".container").css('cursor','default')
			e.currentTarget.graphics.clear().beginLinearGradientFill(["#ffd474", "#af8315"],[0,1],0,0,0,30).drawRoundRect(0,0,110,26,6);
		});

		// === bet ranges
		this.thumb_tables[x].bet_range = [];
		this.thumb_tables[x].bet_range_text_hyphen = [];
		this.thumb_tables[x].bet_range_text_min = [];
		this.thumb_tables[x].bet_range_text_max = [];

		let rangeToUse = [];
		let initValueMin = 0;
		let initValueMax = 0;
		let betRangeMin = 0;
		let betRangeMax = 0;
		if (window.userType == 'TS' || window.userType == 'S') {
			rangeToUse = data.sportBetRanges;
		}
		else if (window.userType == 'TC' || window.userType == 'C') {
			rangeToUse = data.casinoBetRanges;
		}

		// agent range checking starts here
		let roomType = data.roomType === 'n'? 'normal' : data.roomType === 'v'? 'vip' : 'premium';
		let isFlippy = data.gameName === 'Baccarat' && data.type === 'flippy';
		let a_range = _.find(agent_range, (a)=> {
			if(a.gameType.toLowerCase() === 'flippy') {
				return a.game === data.gameName && a.type === roomType && isFlippy;
			} else {
				return a.game === data.gameName && a.type === roomType && !isFlippy;
			} 
		});

		if(window.agent_range.length && !_.isEmpty(a_range)) {
			rangeToUse = a_range.ranges;
		}
		//ends here

		for(var i = 0; i < rangeToUse.length; i++) {
			this.thumb_tables[x].bet_range[i] = new createjs.Shape();
			this.thumb_tables[x].bet_range[i].graphics
			.beginLinearGradientFill(["#ffd474","#c49523"],[0,1],0,0,0,26)
			.drawRoundRect(0,0,188,28,14);
			this.thumb_tables[x].bet_range[i].y = i*40
			this.thumb_tables[x].bet_range[i].x = 10
			this.thumb_tables[x].bet_range[i].button = true;
			this.thumb_tables[x].bet_range[i].game = data.gameName;
			this.thumb_tables[x].bet_range_container.addChild(this.thumb_tables[x].bet_range[i]);

			if(i > 2) {
				this.thumb_tables[x].bet_range[i].y = (i-3)*40
				this.thumb_tables[x].bet_range[i].x = 202
			}

			let dividend
			if (window.casino == 'SS') {
				dividend = 1000;
			}
			else {
				dividend = 1;
			}

			let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
			if (window.mainMultiplier % 10 || data.gameName == 'Sicbo') mainMultiplier = 1;
			betRangeMin = (rangeToUse[i].min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
			betRangeMax = (rangeToUse[i].max * parseInt(window.currencyMultiplier)) * window.userMultiplier * mainMultiplier;

			this.thumb_tables[x].bet_range_text_hyphen[i] = new createjs.Text(" - ","bold 18px arial","#000");
			// this.thumb_tables[x].bet_range_text_hyphen[i].x = this.thumb_tables[x].bet_range[i].x + (182/2);
			this.thumb_tables[x].bet_range_text_hyphen[i].hitArea = this.thumb_tables[x].bet_range[i];
     	this.thumb_tables[x].bet_range_text_hyphen[i].textAlign = "left";
			this.thumb_tables[x].bet_range_container.addChild(this.thumb_tables[x].bet_range_text_hyphen[i]);

			this.thumb_tables[x].bet_range_text_min[i] = new createjs.Text(numberWithCommas(betRangeMin),"bold 18px arial","#000");
			// this.thumb_tables[x].bet_range_text_min[i].x = this.thumb_tables[x].bet_range_text_hyphen[i].x - 8;
			this.thumb_tables[x].bet_range_text_min[i].textAlign = "left";
			this.thumb_tables[x].bet_range_text_min[i].hitArea = this.thumb_tables[x].bet_range[i];
			this.thumb_tables[x].bet_range_container.addChild(this.thumb_tables[x].bet_range_text_min[i]);

			this.thumb_tables[x].bet_range_text_max[i] = new createjs.Text(numberWithCommas(betRangeMax),"bold 18px arial","#000");
			// this.thumb_tables[x].bet_range_text_max[i].x = this.thumb_tables[x].bet_range_text_hyphen[i].x + 8;
			this.thumb_tables[x].bet_range_text_max[i].textAlign = "left";
			this.thumb_tables[x].bet_range_text_max[i].hitArea = this.thumb_tables[x].bet_range[i];
			this.thumb_tables[x].bet_range_container.addChild(this.thumb_tables[x].bet_range_text_max[i]);

			this.thumb_tables[x].bet_range_text_hyphen[i].y = this.thumb_tables[x].bet_range_text_min[i].y = this.thumb_tables[x].bet_range_text_max[i].y = this.thumb_tables[x].bet_range[i].y + 4;

			// x coordinates
			let divideNum = 1.8;
			if (window.currencyMultiplier == 1000) {
				divideNum = 1.7;
			}

			let totalWidth = this.thumb_tables[x].bet_range_text_min[i].getBounds().width + this.thumb_tables[x].bet_range_text_hyphen[i].getBounds().width + this.thumb_tables[x].bet_range_text_max[i].getBounds().width;
			this.thumb_tables[x].bet_range_text_min[i].x = (this.thumb_tables[x].bet_range[i].x) + ((182 - totalWidth) / divideNum);
			this.thumb_tables[x].bet_range_text_hyphen[i].x = this.thumb_tables[x].bet_range_text_min[i].x + this.thumb_tables[x].bet_range_text_min[i].getBounds().width;
			this.thumb_tables[x].bet_range_text_max[i].x = this.thumb_tables[x].bet_range_text_hyphen[i].x + this.thumb_tables[x].bet_range_text_hyphen[i].getBounds().width;

			this.thumb_tables[x].bet_range_container.on("mouseover",  (e) => {
				if(e.target.text) {
					e.target = e.target.hitArea
				}
				if(e.target.button) {
					$(".container").css('cursor','pointer');
					e.target.graphics.clear().beginLinearGradientFill(["#c49523","#ffd474"],[0,1],0,0,0,26)
					.drawRoundRect(0,0,188,28,14);
				}
			});

			this.thumb_tables[x].bet_range_container.on("mouseout",  (e) => {
				if(e.target.text) {
					e.target = e.target.hitArea
				}
				if(e.target.button) {
					$(".container").css('cursor','default');
					e.target.graphics.clear().beginLinearGradientFill(["#ffd474","#c49523"],[0,1],0,0,0,26)
					.drawRoundRect(0,0,188,28,14);
				}
			});

			this.thumb_tables[x].bet_range[i].targ = {data:data};

			if(data.gameName == "Sicbo") {
				this.thumb_tables[x].bet_range[i].redirect_link = window.sb_domain+data.tableNumber + "/" +rangeToUse[i].min + "-" + rangeToUse[i].max;
			}
			if(data.gameName == "Baccarat") {
				if(data.slave && (data.slave=='supersix' || data.slave=='bonus')){
					this.thumb_tables[x].bet_range[i].slave = data.slave;
				}
				this.thumb_tables[x].bet_range[i].redirect_link = window.bc_domain+data.tableNumber + "/" +rangeToUse[i].min + "-" + rangeToUse[i].max;
			}
			if(data.gameName == "Dragon-Tiger") {
				this.thumb_tables[x].bet_range[i].redirect_link = window.dt_domain+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
			}
			if(data.gameName == "Poker") {
				this.thumb_tables[x].bet_range[i].redirect_link = window.poker_domain+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
				if(data.slave && data.slave=='bonusplus'){
					this.thumb_tables[x].bet_range[i].slave = data.slave;
					this.thumb_tables[x].bet_range[i].redirect_link = window.poker_domain+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max + "?slave=bonusplus";
				}
			}
			
			//manual redirect change
			if(data.gameName ==='Baccarat') {
				this.thumb_tables[x].bet_range[i].redirect_link =  window.bc_domain+data.tableNumber;
				this.thumb_tables[x].bet_range[i].range =  rangeToUse[i].min+"-"+rangeToUse[i].max;
			}
			if(data.gameName ==='Sicbo') {
				this.thumb_tables[x].bet_range[i].redirect_link =  window.bc_domain+data.tableNumber;
				this.thumb_tables[x].bet_range[i].range =  rangeToUse[i].min+"-"+rangeToUse[i].max;
			}
		}


		this.thumb_tables[x].bet_range_container.on("click",  (e) => {
			if(e.target.text) {
				e.target = e.target.hitArea
			}
			if(e.target.button) {
				$(".container").css('cursor','pointer');
			}

			if(e.target.game == "Dragon-Tiger") {
				if(e.target.slave && (e.target.slave=='supersix' || e.target.slave=='bonus')){
					window.location.href = e.target.redirect_link + "/"+self.is_multiplayer + '?slave='+e.target.slave;
				} else {
					window.location.href = e.target.redirect_link + "/"+self.is_multiplayer;
				}

				return
			}
			
			var game = e.target.targ.data.namespace;
			var range = e.target.range;
			var slave = 'classic';

			if(e.target.game === 'Baccarat') {
				if(toggle.getCurrentOpen().split('_')[1] === 'dragonbonus')
					slave = 'bonus';
				else if(toggle.getCurrentOpen().split('_')[1] === 'normal')
					slave = 'classic';
				else 
					slave = toggle.getCurrentOpen().split('_')[1];
			}

			((target)=>{
        $.post("/settingGame", {range:range, game:game, slave:slave, multiplayer: self.is_multiplayer}, function () {
					window.location.href = target.redirect_link
        });
      })(e.target); 

      //$.post("/settings", {range : e.target.range});
     //        $.post("/settingGame", {data: JSON.parse('{"game": "Baccarat/9", "slave": "supersix", "multi_yn": 0, "multibet": [{"game": "Baccarat/4", "range": "25-500"}, {"game": "Dragon-Tiger/1", "range": "5-150"}, {"game": "Pai-Gow/1", "range": "5-150"}, {"game": "Baccarat/1", "range": "50-1000"}], "bet_range": "5-150"}')});

    	// ((target) => {
     //  	setTimeout(() => {
					// window.location.href = target.redirect_link
     //  	},1000)
    	// })(e.target)

			// window.location.href = e.target.redirect_link
		});

		this.is_multiplayer = 0;
		this.thumb_tables[x].enter_button.clicked = false;

		this.thumb_tables[x].enter_button.on("click", (e) => {
			if(!e.currentTarget.clicked) {

				self.is_multiplayer = 0;

				this.thumb_tables.forEach((targ) => {
					targ.bet_range_bg.x = targ.x + 915;
					targ.bet_range_container.x = targ.x + 915;
				});
				createjs.Tween.get(e.currentTarget.trans.bet_range_bg)
				.to({
					x: e.currentTarget.trans.x + (0)
				},120)

				if(e.currentTarget.trans.bet_range.length <= 3) {
					createjs.Tween.get(e.currentTarget.trans.bet_range_container)
					.to({
						x: e.currentTarget.trans.x  + (70)
					},120)
				} else {
					createjs.Tween.get(e.currentTarget.trans.bet_range_container)
					.to({
						x: e.currentTarget.trans.x  - (0)
					},120)
				}

				this.thumb_tables.forEach(function (row) {
					row.enter_button.clicked = false;
					if(row.multiplayer_button) {
						row.multiplayer_button.clicked = false;
					}
				});

				if(e.currentTarget.trans.multiplayer_button) {
					e.currentTarget.trans.multiplayer_button.clicked = false;
				}

				e.currentTarget.clicked = true;
				return;
			}

			this.thumb_tables.forEach((targ) => {
				createjs.Tween.get(targ.bet_range_bg)
				.to({
					x : targ.x + 915
				},120)

				createjs.Tween.get(targ.bet_range_container)
				.to({
					x : targ.x + 915
				},120)
			});

			this.thumb_tables.forEach(function (row) {
				row.enter_button.clicked = false;
				if(row.multiplayer_button) {
					row.multiplayer_button.clicked = false;
				}
			});

		});

		if (data.gameName == "Baccarat" || data.gameName == "Dragon-Tiger") {
			this.thumb_tables[x].multiplayer_button.clicked = false;

			this.thumb_tables[x].multiplayer_button.on("click", (e) => {
				if(!e.currentTarget.clicked) {

					self.is_multiplayer = 1;

					this.thumb_tables.forEach((targ) => {
						targ.bet_range_bg.x = targ.x + 915;
						targ.bet_range_container.x = targ.x + 915;
					});
					createjs.Tween.get(e.currentTarget.trans.bet_range_bg)
					.to({
						x: e.currentTarget.trans.x + (0)
					},120)

					createjs.Tween.get(e.currentTarget.trans.bet_range_container)
					.to({
						x: e.currentTarget.trans.x  + (70)
					},120)

					this.thumb_tables.forEach(function (row) {
						row.enter_button.clicked = false;
						if(row.multiplayer_button) {
							row.multiplayer_button.clicked = false;
						}
					});

					e.currentTarget.trans.enter_button.clicked = false;
					e.currentTarget.clicked = true;
					return;
				}

				this.thumb_tables.forEach((targ) => {
					createjs.Tween.get(targ.bet_range_bg)
					.to({
						x : targ.x + 915
					},120)

					createjs.Tween.get(targ.bet_range_container)
					.to({
						x : targ.x + 915
					},120)
				});

				this.thumb_tables.forEach(function (row) {
					row.enter_button.clicked = false;

					if(row.multiplayer_button) {
						row.multiplayer_button.clicked = false;
					}
				});

			});
		}

		let to_be_clicked  = [this.thumb_tables[x].header_2, this.thumb_tables[x].header, this.thumb_tables[x].dealer_bg, this.thumb_tables[x].dealer_img, this.thumb_tables[x].table_text,
							this.thumb_tables[x].table_num,this.thumb_tables[x].dealer_name, this.thumb_tables[x].status, this.thumb_tables[x].view]
		this.thumb_tables[x].view.clicked = false;

		// === mouseover
		this.thumb_tables[x].view.on("mouseover", (e) => {
			$(".container").css('cursor','pointer');
		});

		to_be_clicked.forEach((view,i)=>{
			view.clicked = false;

			view.targ = this.thumb_tables[x].view;
			view.on("mouseover", (e) => {
				$(".container").css('cursor','pointer');
			});
			view.on("mouseout", (e) => {
				$(".container").css('cursor','default');
			});

			view.on("click", (e) => {
				if(e.currentTarget.clicked) {
					e.currentTarget.targ.children[1].gotoAndStop(0);
					self.context.component_banner.banner_container.visible = true;
					self.context.component_banner.currentSelected = null;
					self.context.component_banner.table_banner_container.removeAllChildren()
					self.context.component_banner.userBased_banner_container.removeAllChildren()
					e.currentTarget.clicked = false
					return;
				}

				self.context.component_banner.bannerTableShow(e.currentTarget.targ.data);

				this.thumb_tables.forEach(function (row) {
					row.view.clicked = false
					row.header_2.clicked = false
					row.header.clicked = false
					row.dealer_bg.clicked = false
					row.dealer_img.clicked = false
					row.table_text.clicked = false
					row.table_num.clicked = false
					row.dealer_name.clicked = false
					row.status.clicked = false
					row.view.children[1].gotoAndStop(0)
				});

				e.currentTarget.targ.children[1].gotoAndStop(1);
				e.currentTarget.clicked = true;

			});
		});

		this.thumb_tables[x].view.on("mouseout", (e) => {
			$(".container").css('cursor','default');
		});

		// === Room info
		this.thumb_tables[x].roomInfo = new createjs.Container();
		this.thumb_tables[x].roomInfo.x = this.thumb_tables[x].x + 400;
		this.thumb_tables[x].roomInfo.y = this.thumb_tables[x].y;
		this.thumb_tables[x].roomInfo.visible = true;
		_target.addChild(this.thumb_tables[x].roomInfo);

		// if (window.room_info) this.thumb_tables[x].roomInfo.visible = true;

		this.thumb_tables[x].roomInfoBg = new createjs.Shape();
		this.thumb_tables[x].roomInfoBg.graphics.beginFill('#333333').drawRoundRectComplex(0, 0, 515, this.thumb_tables[x].getBounds().height-176, 0, 0, 0, 0);
		this.thumb_tables[x].roomInfo.addChild(this.thumb_tables[x].roomInfoBg);

		this.thumb_tables[x].usersIco = new createjs.Bitmap('/img/v2_1/icons/room_info/lobby_users.png');
		this.thumb_tables[x].usersIco.x = 23;
		this.thumb_tables[x].usersIco.y = 12;
		this.thumb_tables[x].usersIco.scaleX = this.thumb_tables[x].usersIco.scaleY = 1;
		this.thumb_tables[x].roomInfo.addChild(this.thumb_tables[x].usersIco);

		this.thumb_tables[x].usersCount = new createjs.Text('0', '17px Bebasneue', '#b3b3b3');
		this.thumb_tables[x].usersCount.x = 45;
		this.thumb_tables[x].usersCount.y = 11;
		this.thumb_tables[x].usersCount.textAlign = 'left';
		this.thumb_tables[x].roomInfo.addChild(this.thumb_tables[x].usersCount);

		this.thumb_tables[x].infoPlayerMark = new createjs.Shape();
		this.thumb_tables[x].infoPlayerMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 9);
		this.thumb_tables[x].infoPlayerMark.x = 90;
		this.thumb_tables[x].infoPlayerMark.y = 20;
		this.thumb_tables[x].roomInfo.addChild(this.thumb_tables[x].infoPlayerMark);

		this.thumb_tables[x].playerMarkText = new createjs.Text(window.language.locale == "zh" ? "闲" : "P", '13px Lato', '#fff');
		this.thumb_tables[x].playerMarkText.x = this.thumb_tables[x].infoPlayerMark.x;
		this.thumb_tables[x].playerMarkText.y = this.thumb_tables[x].infoPlayerMark.y - 9;
		this.thumb_tables[x].playerMarkText.textAlign = 'center';
		this.thumb_tables[x].roomInfo.addChild(this.thumb_tables[x].playerMarkText);

		this.thumb_tables[x].playerBetAmt = new createjs.Text('0/0', '17px Bebasneue', '#b3b3b3');
		this.thumb_tables[x].playerBetAmt.x = this.thumb_tables[x].infoPlayerMark.x + 15;
		this.thumb_tables[x].playerBetAmt.y = 11;
		this.thumb_tables[x].playerBetAmt.textAlign = 'left';
		this.thumb_tables[x].roomInfo.addChild(this.thumb_tables[x].playerBetAmt);

		this.thumb_tables[x].infoBankerMark = new createjs.Shape();
		this.thumb_tables[x].infoBankerMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 9);
		this.thumb_tables[x].infoBankerMark.x = 180;
		this.thumb_tables[x].infoBankerMark.y = 20;
		this.thumb_tables[x].roomInfo.addChild(this.thumb_tables[x].infoBankerMark);

		this.thumb_tables[x].bankerMarkText = new createjs.Text(window.language.locale == "zh" ? "庄" : "B", '13px Lato', '#fff');
		this.thumb_tables[x].bankerMarkText.x = this.thumb_tables[x].infoBankerMark.x;
		this.thumb_tables[x].bankerMarkText.y = this.thumb_tables[x].infoBankerMark.y - 9;
		this.thumb_tables[x].bankerMarkText.textAlign = 'center';
		this.thumb_tables[x].roomInfo.addChild(this.thumb_tables[x].bankerMarkText);

		this.thumb_tables[x].bankerBetAmt = new createjs.Text('0/0', '17px Bebasneue', '#b3b3b3');
		this.thumb_tables[x].bankerBetAmt.x = this.thumb_tables[x].infoBankerMark.x + 15;
		this.thumb_tables[x].bankerBetAmt.y = 11;
		this.thumb_tables[x].bankerBetAmt.textAlign = 'left';
		this.thumb_tables[x].roomInfo.addChild(this.thumb_tables[x].bankerBetAmt);

		this.thumb_tables[x].infoTieMark = new createjs.Shape();
		this.thumb_tables[x].infoTieMark.graphics.ss(1).beginStroke('#fff').beginFill('#689f38').drawCircle(0, 0, 9);
		this.thumb_tables[x].infoTieMark.x = 255;
		this.thumb_tables[x].infoTieMark.y = 20;
		this.thumb_tables[x].roomInfo.addChild(this.thumb_tables[x].infoTieMark);

		this.thumb_tables[x].tieMarkText = new createjs.Text(window.language.locale == "zh" ? '和' : 'T', '13px Lato', '#fff');
		this.thumb_tables[x].tieMarkText.x = this.thumb_tables[x].infoTieMark.x;
		this.thumb_tables[x].tieMarkText.y = this.thumb_tables[x].infoTieMark.y - 9;
		this.thumb_tables[x].tieMarkText.textAlign = 'center';
		this.thumb_tables[x].roomInfo.addChild(this.thumb_tables[x].tieMarkText);

		this.thumb_tables[x].tieBetAmt = new createjs.Text('0/0', '17px Bebasneue', '#b3b3b3');
		this.thumb_tables[x].tieBetAmt.x = this.thumb_tables[x].infoTieMark.x + 15;
		this.thumb_tables[x].tieBetAmt.y = 11;
		this.thumb_tables[x].tieBetAmt.textAlign = 'left';
		this.thumb_tables[x].roomInfo.addChild(this.thumb_tables[x].tieBetAmt);

		if (window.language.locale === "zh") {
			this.thumb_tables[x].bankerMarkText.y += 1;
			this.thumb_tables[x].tieMarkText.y += 1;
			this.thumb_tables[x].playerMarkText.y += 1;

			this.thumb_tables[x].bankerMarkText.font = '12px Lato';
			this.thumb_tables[x].tieMarkText.font = '12px Lato';
			this.thumb_tables[x].playerMarkText.font = '12px Lato';
		}

		this.setRoomInfo(data.betInfo, x);

		// === maintenance
		this.thumb_tables[x].maintenanceCon = new createjs.Container();
		this.thumb_tables[x].maintenanceCon.visible = false;
		_target.addChild(this.thumb_tables[x].maintenanceCon);

		this.thumb_tables[x].maintenanceCon.on("click", (e) => {
			return;
		});

		// this.thumb_tables[x].maintenanceBg = new createjs.Shape();
		// this.thumb_tables[x].maintenanceBg.graphics.beginFill("#333333").drawRoundRectComplex(0, 0, 405, 250, 10, 10, 0, 0);
		// this.thumb_tables[x].maintenanceBg.x = this.thumb_tables[x].x - 3;
		// this.thumb_tables[x].maintenanceBg.y = this.thumb_tables[x].y;
		// this.thumb_tables[x].maintenanceBg.table_id = data.tableNumber;
		// this.thumb_tables[x].maintenanceCon.addChild(this.thumb_tables[x].maintenanceBg);

		this.thumb_tables[x].maintenanceHeader = new createjs.Shape();
		this.thumb_tables[x].maintenanceHeader.x = this.thumb_tables[x].x - 3;
		this.thumb_tables[x].maintenanceHeader.y = this.thumb_tables[x].y;
		this.thumb_tables[x].maintenanceHeader.graphics.beginLinearGradientFill(["#960000", "#2a0001"],[0,1],0,0,350,10).drawRoundRectComplex(0,0,405,290,10,10,0,0); //"#8e24aa", "#4d168e"
		this.thumb_tables[x].maintenanceCon.addChild(this.thumb_tables[x].maintenanceHeader);

		let thumbTblName = '';

		switch(data.gameName) {
			case "Baccarat" :
				thumbTblName = window.language.lobby.baccarat;
				break;

			case "Dragon-Tiger" :
				thumbTblName = window.language.lobby.dragontiger;
				break;

			case "Poker" :
				thumbTblName = window.language.lobby.texas;
				break;

			case "Sicbo" :
				thumbTblName = window.language.lobby.sicbo;
				break;
		}
		this.thumb_tables[x].table_name = new createjs.Text(thumbTblName,"19px ArvoItalic","#fdba44");
		this.thumb_tables[x].table_name.x = this.thumb_tables[x].x + 160;
		this.thumb_tables[x].table_name.y = 7 + this.thumb_tables[x].y;
		this.thumb_tables[x].maintenanceCon.addChild(this.thumb_tables[x].table_name);

		this.thumb_tables[x].table_num = new createjs.Text(data.tableNumber.length < 2 ? "0"+data.tableNumber : data.tableNumber,"18px latobold","#fdba44");
		this.thumb_tables[x].table_num.x = this.thumb_tables[x].x + 130;
		this.thumb_tables[x].table_num.y = 7 + this.thumb_tables[x].y;
		this.thumb_tables[x].maintenanceCon.addChild(this.thumb_tables[x].table_num);

		this.thumb_tables[x].maintenanceLogo = new createjs.Bitmap(self.context.load.getResources("maintenance_ico"));
		this.thumb_tables[x].maintenanceLogo.x = this.thumb_tables[x].x + 16;
		this.thumb_tables[x].maintenanceLogo.scaleX = 0.6;
		this.thumb_tables[x].maintenanceLogo.scaleY = 0.6;
		this.thumb_tables[x].maintenanceLogo.y = 16 + this.thumb_tables[x].y;
		this.thumb_tables[x].maintenanceCon.addChild(this.thumb_tables[x].maintenanceLogo);

		this.thumb_tables[x].maintenanceTxt = new createjs.Text('', '21px bebasneue', '#ffb547');
		this.thumb_tables[x].maintenanceTxt.x = this.thumb_tables[x].x + 385;
		this.thumb_tables[x].maintenanceTxt.y = 85 + this.thumb_tables[x].y;
		this.thumb_tables[x].maintenanceTxt.textAlign = 'right';
		this.thumb_tables[x].maintenanceTxt.lineHeight = '22';
		this.thumb_tables[x].maintenanceCon.addChild(this.thumb_tables[x].maintenanceTxt);

		if(window.language.locale == "zh") {
			this.thumb_tables[x].maintenanceTxt.font = '24px bebasneue';
			this.thumb_tables[x].maintenanceTxt.y = 85 + this.thumb_tables[x].y - 3;
		}

		this.thumb_tables[x].maintenanceSubTxt = new createjs.Text('', '16px bebasneue', '#fff');
		this.thumb_tables[x].maintenanceSubTxt.x = this.thumb_tables[x].x + 385;
		this.thumb_tables[x].maintenanceSubTxt.y = 132 + this.thumb_tables[x].y;
		this.thumb_tables[x].maintenanceSubTxt.textAlign = 'right';
		this.thumb_tables[x].maintenanceCon.addChild(this.thumb_tables[x].maintenanceSubTxt);

		if(window.language.locale == "zh") {
			this.thumb_tables[x].maintenanceSubTxt.font = '20px bebasneue';
		}

		this.thumb_tables[x].maintenanceTime = new createjs.Text('', '16px bebasneue', '#fff');
		this.thumb_tables[x].maintenanceTime.x = this.thumb_tables[x].x + 385;
		this.thumb_tables[x].maintenanceTime.y = 155 + this.thumb_tables[x].y;
		this.thumb_tables[x].maintenanceTime.textAlign = 'right';
		this.thumb_tables[x].maintenanceTime.lineHeight = '20';
		this.thumb_tables[x].maintenanceCon.addChild(this.thumb_tables[x].maintenanceTime);


		this.checkMaintenance(data, false, x);

    _target.thumb_tables = this.thumb_tables[x];
		_target.update()
  },
  setRoomInfo(data, x) {
  	this.resetRoomInfo(x);

		if (!data) return;

		let playerAmt = 0;
		let bankerAmt = 0;
		let tieAmt = 0;
		let totalAmt = 0;

		let playerUsers = 0;
		let bankerUsers = 0;
		let tieUsers = 0;
		let totalUsers = 0;

		if (data.player) {
			// Bets
			if (data.player.totalBets > 999 && data.player.totalBets < 1000000) {
				playerAmt = (data.player.totalBets/1000) + 'K';
			}
			else if (data.player.totalBets > 999999) {
				playerAmt = (data.player.totalBets/1000000) + 'M';
			}
			else {
				playerAmt = numberWithCommas(data.player.totalBets);
			}

			// Users
			if (data.player.totalUsers > 999 && data.player.totalUsers < 1000000) {
				playerUsers = (data.player.totalUsers/1000) + 'K';
			}
			else if (data.player.totalUsers > 999999) {
				playerUsers = (data.player.totalUsers/1000000) + 'M';
			}
			else {
				playerUsers = numberWithCommas(data.player.totalUsers);
			}

			this.thumb_tables[x].playerBetAmt.text = `${playerAmt}/${playerUsers}`;
			totalUsers += data.player.totalUsers;
		}

		if (data.banker) {
			// Bets
			if (data.banker.totalBets > 999 && data.banker.totalBets < 1000000) {
				bankerAmt = (data.banker.totalBets/1000) + 'K';
			}
			else if (data.banker.totalBets > 999999) {
				bankerAmt = (data.banker.totalBets/1000000) + 'M';
			}
			else {
				bankerAmt = numberWithCommas(data.banker.totalBets);
			}

			// Users
			if (data.banker.totalUsers > 999 && data.banker.totalUsers < 1000000) {
				bankerUsers = (data.banker.totalUsers/1000) + 'K';
			}
			else if (data.banker.totalUsers > 999999) {
				bankerUsers = (data.banker.totalUsers/1000000) + 'M';
			}
			else {
				bankerUsers = numberWithCommas(data.banker.totalUsers);
			}

			this.thumb_tables[x].bankerBetAmt.text = `${bankerAmt}/${bankerUsers}`;
			totalUsers += data.banker.totalUsers;
		}

		if (data.tie) {
			// Bets
			if (data.tie.totalBets > 999 && data.tie.totalBets < 1000000) {
				tieAmt = (data.tie.totalBets/1000) + 'K';
			}
			else if (data.tie.totalBets > 999999) {
				tieAmt = (data.tie.totalBets/1000000) + 'M';
			}
			else {
				tieAmt = numberWithCommas(data.tie.totalBets);
			}

			// Users
			if (data.tie.totalUsers > 999 && data.tie.totalUsers < 1000000) {
				tieUsers = (data.tie.totalUsers/1000) + 'K';
			}
			else if (data.tie.totalUsers > 999999) {
				tieUsers = (data.tie.totalUsers/1000000) + 'M';
			}
			else {
				tieUsers = numberWithCommas(data.tie.totalUsers);
			}

			this.thumb_tables[x].tieBetAmt.text = `${tieAmt}/${tieUsers}`;
		}

		// Users
		this.thumb_tables[x].usersCount.text = numberWithCommas(totalUsers);

		if (totalUsers > 999 && totalUsers < 1000000) {
			totalUsers = (totalUsers/1000) + 'K';
			this.thumb_tables[x].usersCount.text = totalUsers;
		}
		else if (totalUsers > 999999) {
			totalUsers = (totalUsers/1000000) + 'M';
			this.thumb_tables[x].usersCount.text = totalUsers;
		}
  },
  resetRoomInfo(x) {
  	this.thumb_tables[x].playerBetAmt.text = '0/0';
  	this.thumb_tables[x].bankerBetAmt.text = '0/0';
  	this.thumb_tables[x].tieBetAmt.text = '0/0';
  	this.thumb_tables[x].usersCount.text = '0';
  },
  makeListTables (data, _target, _timer_c,  x, self)  {
  	if(_target) {
      _target.removeAllChildren()
    }

    if(_timer_c) {
      _timer_c.removeAllChildren()
    }

		// === table background
		let slaveName = '';
		if (!data.slave || data.slave === null || data.slave.length === 0) {
			slaveName = 'normal';
		}
		else {
			slaveName = data.slave;
		}

    //checking themed games
		let isThemedGames = data.gameName == 'Pai-Gow';

		// === table background
		this.list_tables[x] = new createjs.Shape();
		this.list_tables[x].graphics.beginFill("#d8d4d2").drawRoundRect(350,0,1018,283,0);
		this.list_tables[x].game_name = data.gameName;
		this.list_tables[x].table_number = data.tableNumber;
		this.list_tables[x].slave = slaveName;
		_target.addChild(this.list_tables[x]);

		// === dealer
		this.list_tables[x].dealer_bg  = new createjs.Shape();
		this.list_tables[x].dealer_bg.graphics.beginFill("#333").drawRoundRectComplex(0,0,350,283,10,0,0,10);
		this.list_tables[x].dealer_bg.y = this.list_tables[x].y;
		_target.addChild(this.list_tables[x].dealer_bg);

		this.list_tables[x].dealer_header  = new createjs.Shape();
		this.list_tables[x].dealer_header.y = this.list_tables[x].y;

		let header_bg = ["#980000","#2b0000"];
		let text_color = "#efb052";
		let level = window.language.level.normal;
		let slave_level = '';
		let icoLocation = '';

		if (data.slave && data.slave == 'supersix') {
      icoLocation = 'supersix_norm';
		}
		else if (data.slave && data.slave == 'bonus') {
      icoLocation = 'dragonbonus_norm';
		}

    if(isThemedGames) {
      header_bg = ["#C1185B", "#750C44"];
    }

		if(data.roomType == "p") {
			header_bg = ["#bd0000","#7c0000"];
			text_color = "#efb052";
			level = window.language.level.premium;

		} else if(data.roomType == "v") {
			header_bg = ["#fedd78","#d5a515"];
			text_color = "#000";
			level = window.language.level.vip;

			if (data.slave && data.slave == 'supersix') {
        icoLocation = 'supersix_vip';
			}
			else if (data.slave && data.slave == 'bonus') {
        icoLocation = 'dragonbonus_vip';
			}
		}
		slave_level = level;

		this.list_tables[x].dealer_header.graphics.beginLinearGradientFill(header_bg, [0,1], 0,0,300,20).drawRoundRectComplex(0,0,350,50,10,0,0,0);
		_target.addChild(this.list_tables[x].dealer_header);

		this.list_tables[x].dealer_img_bg  = new createjs.Shape();
		this.list_tables[x].dealer_img_bg.graphics.beginFill("#f5ac4e").drawCircle(0,0,62);
		this.list_tables[x].dealer_img_bg.x = 92;
		this.list_tables[x].dealer_img_bg.y = 156 + this.list_tables[x].y;
		_target.addChild(this.list_tables[x].dealer_img_bg);

		// === table name
		let gameNameStr = '';

		switch(data.gameName) {
			case "Baccarat" :
				if (data.slave == 'supersix' || data.slave == 'bonus') {
        	this.list_tables[x].slaveIcon = new createjs.Bitmap(self.context.load.getResources(icoLocation));
					this.list_tables[x].slaveIcon.x = this.list_tables[x].x + 40;
					this.list_tables[x].slaveIcon.y = this.list_tables[x].y + 4;
					_target.addChild(this.list_tables[x].slaveIcon);
				}

				gameNameStr = level;

				for (var i = 0; i < window.bcSetting.length; i++) {
					if (parseInt(data.tableNumber) == window.bcSetting[i].id) {
						let betSetting = JSON.parse(window.bcSetting[i].bet_setting);

						if (betSetting.type[0] == 'flippy') {
							let menu_spritesheet_data = {
								images: ["/img/flippy.png"],
								frames: {width:59,height:42},
								animations: {
									"first": {
										frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 23, 24, 25, 26, 27],
										speed: 0.4
									},
								}
							}

							this.list_tables[x].flippy_spriteSheet = new createjs.SpriteSheet(menu_spritesheet_data);
							this.list_tables[x].flippyImg = new createjs.Sprite(this.list_tables[x].flippy_spriteSheet,"first");
							this.list_tables[x].flippyImg.scaleX = this.list_tables[x].flippyImg.scaleY = 0.8;
							this.list_tables[x].flippyImg.x = (this.list_tables[x].x + 400 / 2) + 90;
							this.list_tables[x].flippyImg.y = this.list_tables[x].y + 7;

							if(_timer_c) {
								_timer_c.addChild(this.list_tables[x].flippyImg);
							} else {
								_target.addChild(this.list_tables[x].flippyImg);
							}

							if (!level) {
	              slave_level = window.language.level.normal;
							}

							gameNameStr = slave_level == '' ? window.language.level.normal : slave_level;
						}
					}
				}
				break;

			case "Dragon-Tiger" :
				gameNameStr = window.language.lobby.dragontiger+' '+level;
				break;

			case "Poker" :
				if (data.slave == 'bonusplus') {
					this.list_tables[x].pokerBonusIcon = new createjs.Bitmap("/img/icons/poker/pokerbonusplus.png");
					this.list_tables[x].pokerBonusIcon.x = this.list_tables[x].x + 15;
					this.list_tables[x].pokerBonusIcon.y = this.list_tables[x].y + 6;
					_target.addChild(this.list_tables[x].pokerBonusIcon);
				}

				gameNameStr = window.language.lobby.texas+' '+level;
					if (data.slave && data.slave=='bonusplus') {
						gameNameStr = window.language.level.bonusplus;
					}
				break;

			case "Sicbo" :
				gameNameStr = window.language.lobby.sicbo+' '+level;
				break;

      case "Pai-Gow" :
        gameNameStr = window.language.lobby.paigow;
        break;
		}


		this.list_tables[x].table_name =  this.getText(80, this.list_tables[x].y+15, gameNameStr, "22px ArvoItalic", text_color, "left", "top");
		_target.addChild(this.list_tables[x].table_name);

		this.list_tables[x].table_num =  new createjs.Text(data.tableNumber.length < 2 ? "0"+data.tableNumber : data.tableNumber,"24px latoblack",text_color);
    this.list_tables[x].table_num.textAlign = "left";
		// this.list_tables[x].table_num.x = this.list_tables[x].table_name.x - (this.list_tables[x].table_name.getBounds().width / 2) - 10;
		this.list_tables[x].table_num.x = 40;
		this.list_tables[x].table_num.y = 13 + this.list_tables[x].y;
		_target.addChild(this.list_tables[x].table_num);

		if (data.slave == 'supersix') {
			this.list_tables[x].table_num.x += 50;
			this.list_tables[x].table_name.x += 50;
		}
		else if (data.slave == 'bonus') {
			this.list_tables[x].table_num.x += 55;
			this.list_tables[x].table_name.x += 55;
		}

    if (data.slave == 'bonusplus') {
			this.list_tables[x].table_num.x += 50;
			this.list_tables[x].table_name.x += 50;
		}

		// === round num
		this.list_tables[x].round_num = new createjs.Text(data.currentRound, "20px latoregular","#fff");
		this.list_tables[x].round_num.set({x: 310, y: 300})
		_target.addChild(this.list_tables[x].round_num);

		//=== table status
		let status = "";
		if(data.roundStatus == "P") {
			if(data.gameName != "Sicbo") {
				status = window.language.lobby.dealing
			} else {
				status = window.language.lobby.result
			}
		}
		if(data.roundStatus == "S") {
			status = window.language.lobby.nowbetting;
		}

		if(data.roundStatus == "E") {
			status = window.language.lobby.bettingend;
			if(!data.marks.length) {
				status = window.language.prompts.promptshuffling;
			}
		}

		if(data.roundStatus == "R") {
			status = window.language.lobby.result;
		}

		if(data.is_shoeChange) {
			if(!data.marks.length) {
				status = window.language.prompts.promptshuffling;
			}
		}

		this.list_tables[x].status = new createjs.Text(status, "20px latoregular","#fff");
		this.list_tables[x].status.set({x: 180, y: 300});
		_target.addChild(this.list_tables[x].status);

		if(window.language.locale == "zh") {
				this.list_tables[x].status.font = "25px latoregular";
		}

		//== timer
		this.list_tables[x].timer =  _.clone(timer());
		this.list_tables[x].timer.scaleX = this.list_tables[x].timer.scaleY = 1.2;
		this.list_tables[x].is_timerStart = false;

		if(_timer_c) {
      _timer_c.addChild(this.list_tables[x].timer);
    } // if has timer canvas
    else {
      _target.addChild(this.list_tables[x].timer);
    } //

    this.list_tables[x].dealer_img = new createjs.Bitmap();
		this.list_tables[x].dealer_img.setBounds(0,0,250,250)
		this.list_tables[x].dealer_img.regX = this.list_tables[x].dealer_img.getBounds().width;
		this.list_tables[x].dealer_img.regY = this.list_tables[x].dealer_img.getBounds().height;
		this.list_tables[x].dealer_img.scaleX = this.list_tables[x].dealer_img.scaleY = 1;
		this.list_tables[x].dealer_img.x = this.list_tables[x].dealer_img_bg.x + 190;
		this.list_tables[x].dealer_img.y = this.list_tables[x].dealer_img_bg.y + 190;
		_target.addChild(this.list_tables[x].dealer_img);

		this.list_tables[x].dealer_id = data.dealerId;

		for (var i = 0; i < window.dealerImg.length; i++) {
      if (window.dealerImg[i].id == data.dealerId) {
        let dbImage = new Image();
        dbImage.src = window.dealerImg[i].dealer_image;
        this.list_tables[x].dealer_img.image = dbImage;
      }
    }

		// === dealer name
		this.list_tables[x].dealer_name = new createjs.Text(data.currentDealer, "20px latoregular" , "#fff");
		this.list_tables[x].dealer_name.textAlign = "center";
		this.list_tables[x].dealer_name.set({x: 92, y: 232});
		_target.addChild(this.list_tables[x].dealer_name);

		// === bet range
		let bet_range_bg = new createjs.Shape();
		bet_range_bg.graphics.beginFill("#333").drawRoundRectComplex(0,0,272,283,0,10,10,0);
		bet_range_bg.x = 1368;
		bet_range_bg.y = this.list_tables[x].y;
		_target.addChild(bet_range_bg);

		this.list_tables[x].bet_range = [];
		this.list_tables[x].bet_range_text_hyphen = [];
		this.list_tables[x].bet_range_text_min = [];
		this.list_tables[x].bet_range_text_max = [];

		let rangeToUse = [];
		if (window.userType == 'TS' || window.userType == 'S') {
			rangeToUse = data.sportBetRanges;
		}
		else if (window.userType == 'TC' || window.userType == 'C') {
			rangeToUse = data.casinoBetRanges;
		}

		// agent range checking starts here
		let roomType = data.roomType === 'n'? 'normal' : data.roomType === 'v'? 'vip' : 'premium';
		let isFlippy = data.gameName === 'Baccarat' && data.type === 'flippy';
		let a_range = _.find(agent_range, (a)=> {
			if(a.gameType === 'Flippy') {
				return a.game === data.gameName && a.type === roomType && isFlippy;
			} else {
				return a.game === data.gameName && a.type === roomType && !isFlippy;
			} 
		});

		if(agent_range.length && !_.isEmpty(a_range)) {
			rangeToUse = a_range.ranges;
			console.log("range to use newwwww:::->", rangeToUse, "\n gamename:::->", data.namespace, "\n tpyeeee:::->", data.type, "\n roomtye(vip/premium/normal):::->",data.roomType)
		}
		//ends here

		if(data.gameName == "Baccarat" || data.gameName == "Dragon-Tiger") {
			this.list_tables[x].bet_range_container = new createjs.Container();
			let range_bg = new createjs.Shape();
			range_bg.graphics.beginFill("rgba(0,0,0,0.6)").drawRect(this.list_tables[x].x,this.list_tables[x].y,283,283);
			this.list_tables[x].bet_range_container.x = 1375
			this.list_tables[x].bet_range_container.addChild(range_bg)

			let mask = new createjs.Shape();
			mask.graphics.beginFill("red").drawRect(1085,this.list_tables[x].y, 283, 283);
			this.list_tables[x].bet_range_container.mask = mask;
		}

		this.is_list_multiplayer = 0;

		this.list_tables[x].multiplayer_button = new createjs.Shape();
		this.list_tables[x].multiplayer_button.graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
		this.list_tables[x].multiplayer_button.x = 1404;
		this.list_tables[x].multiplayer_button.index = x;
		this.list_tables[x].multiplayer_button.y = 26 + this.list_tables[x].y + 40;
		this.list_tables[x].multiplayer_button.range_container = this.list_tables[x].bet_range_container;
		_target.addChild(this.list_tables[x].multiplayer_button);

		this.list_tables[x].multiplayer_button.on("click", (e) => {
			this.is_list_multiplayer = 1;
			self.stage_list[e.currentTarget.index].isUpdate = true;
			this.list_tables.forEach((targ)=>{
				if(targ.game_name =="Baccarat" || targ.game_name =="Dragon-Tiger") {
					targ.bet_range_container.x = 1404;
					self.stage_list[targ.multiplayer_button.index].update();
				}
			})

			setTimeout(() => {
				createjs.Tween.get(e.currentTarget.range_container)
				.to({
					x: 1085
				}, 100)
				.wait(100)
				.call((obj)=>{
					self.stage_list[obj.index].isUpdate = false;
				}, [e.currentTarget])
				// e.currentTarget.range_container.x = 1085
			}, 100)
		});

		this.list_tables[x].multiplayer_button.on("mouseover", (e) => {
			if(parseInt(e.currentTarget.is_maintenance)) return;

			$(".container").css('cursor','pointer');
			e.currentTarget.graphics.clear().beginLinearGradientFill(["#c69522", "#ffd476"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
			self.stage_list[e.currentTarget.index].update();
		});

		this.list_tables[x].multiplayer_button.on("mouseout", (e) => {
			e.target.is_hover = true;
			$(".container").css('cursor','default');
			e.currentTarget.graphics.clear().beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
			self.stage_list[e.currentTarget.index].update();
		});

		this.list_tables[x].multiplayer_text = new createjs.Text(window.language.menu.multiplayer.toUpperCase(), "14px latobold","#000");
		this.list_tables[x].multiplayer_text.textAlign = "center";
		this.list_tables[x].multiplayer_text.textBaseline = "middle";
		this.list_tables[x].multiplayer_text.x = this.list_tables[x].multiplayer_button.x + (202/2)
		this.list_tables[x].multiplayer_text.y = this.list_tables[x].multiplayer_button.y + (30/2)
		this.list_tables[x].multiplayer_text.hitArea = this.list_tables[x].multiplayer_button
		_target.addChild(this.list_tables[x].multiplayer_text);

		if(window.language.locale == "zh") {
				this.list_tables[x].multiplayer_text.font = "19px latobold";
		}

		this.list_tables[x].singleplayer_button = new createjs.Shape();
		this.list_tables[x].singleplayer_button.graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
		this.list_tables[x].singleplayer_button.x = 1404;
		this.list_tables[x].singleplayer_button.index = x;
		this.list_tables[x].singleplayer_button.y = 26 + this.list_tables[x].y + 0;
		this.list_tables[x].singleplayer_button.range_container = this.list_tables[x].bet_range_container;
		_target.addChild(this.list_tables[x].singleplayer_button);

		this.list_tables[x].singleplayer_button.on("click", (e) => {
			this.is_list_multiplayer = 0;
			self.stage_list[e.currentTarget.index].isUpdate = true;
			this.list_tables.forEach((targ)=>{
				if(targ.game_name =="Baccarat" || targ.game_name =="Dragon-Tiger") {
					targ.bet_range_container.x = 1404;
					self.stage_list[targ.singleplayer_button.index].update();
				}
			})

			setTimeout(() => {
				createjs.Tween.get(e.currentTarget.range_container)
				.to({
					x: 1085
				}, 100)
				.call((obj) => {
					self.stage_list[obj.index].isUpdate = true;
				}, [e.currentTarget])
				// e.currentTarget.range_container.x = 1085
			}, 100)
		});

		this.list_tables[x].singleplayer_button.data = data;
		this.list_tables[x].singleplayer_button.on("mouseover", (e) => {
			if(parseInt(e.currentTarget.is_maintenance)) return;
			$(".container").css('cursor','pointer');
			e.currentTarget.graphics.clear().beginLinearGradientFill(["#c69522", "#ffd476"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
			self.stage_list[e.currentTarget.index].update();
		});

		this.list_tables[x].singleplayer_button.on("mouseout", (e) => {
			e.target.is_hover = true;
			$(".container").css('cursor','default');
			e.currentTarget.graphics.clear().beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
			self.stage_list[e.currentTarget.index].update();
		});

		this.list_tables[x].singleplayer_text = new createjs.Text(window.language.menu.singleplayer.toUpperCase(), "14px latobold","#000");
		this.list_tables[x].singleplayer_text.textAlign = "center";
		this.list_tables[x].singleplayer_text.textBaseline = "middle";
		this.list_tables[x].singleplayer_text.x = this.list_tables[x].singleplayer_button.x + (202/2)
		this.list_tables[x].singleplayer_text.y = this.list_tables[x].singleplayer_button.y + (30/2)
		this.list_tables[x].singleplayer_text.hitArea = this.list_tables[x].singleplayer_button
		_target.addChild(this.list_tables[x].singleplayer_text);

		if(window.language.locale == "zh") {
				this.list_tables[x].singleplayer_text.font = "19px latobold";
		}

		for(var i = 0; i < rangeToUse.length; i++) {
			let defWidth = 202;
			if (data.gameName == "Poker") {
				defWidth = 215;
			}

			this.list_tables[x].bet_range[i] = new createjs.Shape();
			this.list_tables[x].bet_range[i].graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,defWidth,30,15);
			this.list_tables[x].bet_range[i].x = 1404;
			this.list_tables[x].bet_range[i].y = (i *40) + (26 + this.list_tables[x].y);
			this.list_tables[x].bet_range[i].game = data.gameName;
			this.list_tables[x].bet_range[i].range_index = x;
			// _target.addChild(this.list_tables[x].bet_range[i]);

			if (data.gameName == "Baccarat" || data.gameName == "Dragon-Tiger") {
				this.list_tables[x].bet_range[i].x = 38;
			}
			else if (data.gameName == "Poker") {
				this.list_tables[x].bet_range[i].x -= 8;
			}

			let dividend
			if (window.casino == 'SS') {
				dividend = 1000;
			}
			else {
				dividend = 1;
			}

			let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
			if (window.mainMultiplier % 10 || data.gameName == 'Sicbo') mainMultiplier = 1;
			let betRangeMin = (rangeToUse[i].min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
			let betRangeMax = ((rangeToUse[i].max * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

			this.list_tables[x].bet_range_text_hyphen[i] = new createjs.Text(" - ", "17px latobold" ,"#000");
			// this.list_tables[x].bet_range_text_hyphen[i].x = this.list_tables[x].bet_range[i].x + (defWidth/2);
			this.list_tables[x].bet_range_text_hyphen[i].textAlign = "left";

			this.list_tables[x].bet_range_text_min[i] = new createjs.Text(numberWithCommas(betRangeMin), "17px latobold" ,"#000");
			// this.list_tables[x].bet_range_text_min[i].x = this.list_tables[x].bet_range_text_hyphen[i].x - 8;
			this.list_tables[x].bet_range_text_min[i].textAlign = "left";

			this.list_tables[x].bet_range_text_max[i] = new createjs.Text(numberWithCommas(betRangeMax), "17px latobold" ,"#000");
			// this.list_tables[x].bet_range_text_max[i].x = this.list_tables[x].bet_range_text_hyphen[i].x + 8;
			this.list_tables[x].bet_range_text_max[i].textAlign = "left";

			this.list_tables[x].bet_range_text_hyphen[i].y = this.list_tables[x].bet_range_text_min[i].y = this.list_tables[x].bet_range_text_max[i].y = this.list_tables[x].bet_range[i].y + 4;

			// x coordinates
			let totalWidth = this.list_tables[x].bet_range_text_min[i].getBounds().width + this.list_tables[x].bet_range_text_hyphen[i].getBounds().width + this.list_tables[x].bet_range_text_max[i].getBounds().width;
			this.list_tables[x].bet_range_text_min[i].x = (this.list_tables[x].bet_range[i].x) + ((defWidth - totalWidth) / 2);
			this.list_tables[x].bet_range_text_hyphen[i].x = this.list_tables[x].bet_range_text_min[i].x + this.list_tables[x].bet_range_text_min[i].getBounds().width;
			this.list_tables[x].bet_range_text_max[i].x = this.list_tables[x].bet_range_text_hyphen[i].x + this.list_tables[x].bet_range_text_hyphen[i].getBounds().width;

			if(data.gameName == "Baccarat" || data.gameName == "Dragon-Tiger") {
				this.list_tables[x].bet_range_container.addChild(this.list_tables[x].bet_range[i])
				this.list_tables[x].bet_range_container.addChild(this.list_tables[x].bet_range_text_hyphen[i], this.list_tables[x].bet_range_text_min[i], this.list_tables[x].bet_range_text_max[i]);
			} else {
				_target.addChild(this.list_tables[x].bet_range[i]);
				_target.addChild(this.list_tables[x].bet_range_text_hyphen[i], this.list_tables[x].bet_range_text_min[i], this.list_tables[x].bet_range_text_max[i]);
			}

			if(data.gameName == "Sicbo") {
				this.list_tables[x].bet_range[i].redirect_link = window.sb_domain+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
			}
      if(data.gameName == "Pai-Gow") {
        this.list_tables[x].bet_range[i].redirect_link = window.paigow_domain+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max + "/"+0;
      }
			if(data.gameName == "Baccarat") {
				if(data.slave && (data.slave=='supersix' || data.slave=='bonus')){
					this.list_tables[x].bet_range[i].slave = data.slave;
				}
				this.list_tables[x].bet_range[i].redirect_link = window.bc_domain+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max; //+ "/"+0;
			}
			if(data.gameName == "Dragon-Tiger") {
				this.list_tables[x].bet_range[i].redirect_link = window.dt_domain+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;//+ "/"+0;
			}
			if(data.gameName == "Poker") {
					if(data.slave && data.slave=='bonusplus'){
						this.list_tables[x].bet_range[i].redirect_link = window.poker_domain+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max + '?slave=bonusplus';
					}else{
						this.list_tables[x].bet_range[i].redirect_link = window.poker_domain+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
					}
			}

			this.list_tables[x].bet_range[i].hover = function (e, type) {
				if(type == "hover") {
					e.graphics.clear().beginLinearGradientFill(["#c69522", "#ffd476"],[0,1],0,0,0,20).drawRoundRect(0,0,defWidth,30,15);
				} else {
					e.graphics.clear().beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,defWidth,30,15);
				}
			} //end of active

			this.list_tables[x].bet_range[i].targ = {data:data};

			if(data.gameName ==='Baccarat') {
				this.list_tables[x].bet_range[i].redirect_link =  window.bc_domain+data.tableNumber;
				this.list_tables[x].bet_range[i].range =  rangeToUse[i].min + "-" + rangeToUse[i].max;
			}
			if(data.gameName ==='Sicbo') {
				this.list_tables[x].bet_range[i].redirect_link =  window.sb_domain+data.tableNumber;
				this.list_tables[x].bet_range[i].range =  rangeToUse[i].min + "-" + rangeToUse[i].max;
			}

			if(data.gameName ==='Dragon-Tiger') {
				this.list_tables[x].bet_range[i].redirect_link =  window.dt_domain+data.tableNumber;
				this.list_tables[x].bet_range[i].range =  rangeToUse[i].min + "-" + rangeToUse[i].max;
			}

			if(data.gameName ==='Poker') {
				this.list_tables[x].bet_range[i].redirect_link =  window.poker_domain+data.tableNumber;
				this.list_tables[x].bet_range[i].range =  rangeToUse[i].min + "-" + rangeToUse[i].max;
				this.list_tables[x].bet_range[i].slave = data.slave;
			}

			if(data.gameName ==='Pai-Gow') {
				this.list_tables[x].bet_range[i].redirect_link =  window.paigow_domain+data.tableNumber;
				this.list_tables[x].bet_range[i].range =  rangeToUse[i].min + "-" + rangeToUse[i].max;
				// this.list_tables[x].bet_range[i].slave = data.slave;
			}


			this.list_tables[x].bet_range[i].on("click", (e) => {
				if(e.target.text) {
					e.target = e.target.hitArea
				}

				if(e.target.button) {
					$(".container").css('cursor','pointer');
				}

				// if(e.target.game == "Dragon-Tiger") {
				// 	if(e.target.slave && (e.target.slave=='supersix' || e.target.slave=='bonus')){
				// 		window.location.href = e.target.redirect_link + "/"+this.is_multiplayer + '?slave='+e.target.slave;
				// 	} else {
				// 		window.location.href = e.target.redirect_link + "/"+this.is_list_multiplayer;
				// 	}
				// 	return
				// }

				var game = e.target.targ.data.namespace;
				var range = e.target.range;
				var slave = 'classic';

				if(e.target.game === 'Baccarat') {
					if(toggle.getCurrentOpen().split('_')[1] === 'dragonbonus')
						slave = 'bonus';
					else if(toggle.getCurrentOpen().split('_')[1] === 'normal')
						slave = 'classic';
					else 
						slave = toggle.getCurrentOpen().split('_')[1];
				} else if(e.target.game === 'Poker') {
					slave = e.target.slave === null ? 'classic' : e.target.slave;
				}

				((target)=>{
	        $.post("/settingGame", {range:range, game:game, slave:slave, multiplayer: this.is_list_multiplayer}, function (response) {
						window.location.href = target.redirect_link
	        });
	      })(e.target); 

			});

			this.list_tables[x].bet_range[i].on("mouseover", (e) => {
				$(".container").css('cursor','pointer');
				e.target.hover(e.target,"hover");
			});

			this.list_tables[x].bet_range[i].on("mouseout", (e) => {
				e.target.is_hover = true;
				$(".container").css('cursor','default');
				e.target.hover(e.target,"");
			});
		} //end for

    _target.list_tables = this.list_tables[x];
		_target.update()
  },
  makeRoomListTables(data, gamedata, _target, _timer_c,  x, self) {
    if(_target) {
      _target.removeAllChildren()
    }

    if(_timer_c) {
      _timer_c.removeAllChildren()
    }
    // === table background
    this.roomlist_tables[x] = new createjs.Shape();
    this.roomlist_tables[x].graphics.beginFill("#333").drawRoundRectComplex(-15, -5, 815, 200, 10, 10, 0, 0);
    _target.addChild(this.roomlist_tables[x]);

    this.roomlist_tables[x].timer =  _.clone(timer());
		this.roomlist_tables[x].timer.scaleX = this.roomlist_tables[x].timer.scaleY = 1.2;
		this.roomlist_tables[x].is_timerStart = false;
		_target.addChild(this.roomlist_tables[x].timer);


    let header_bg = ["#980000","#2b0000"];
    let text_color = "#efb052";
    let level ='';
    let slave_level = '';
    let icoLocation = '';

    let gameRange = 0;
    let normal = 0;
    let premium = 0;
    let vip = 0;

		if(gamedata.tableNumber == data.data[1]) {
			gameRange = gamedata.casinoBetRanges;

			normal = gameRange[0].min +"-"+gameRange[0].max;
			premium = gameRange[1].min +"-"+gameRange[1].max;
			vip = gameRange[2].min +"-"+gameRange[2].max;
		}
		console.log(data.data[6], "waaaaat etrage", data.data)
    if(data.data[6] == normal) {

    } else if(data.data[6] == premium) {
      header_bg = ["#bd0000","#7c0000"];
      text_color = "#efb052";
      level = window.language.level.premium;
    } else if(data.data[6] == vip) {
      header_bg = ["#fedd78","#d5a515"];
      text_color = "#000";
      level = window.language.level.vip;
    }

    slave_level = level;

    //header
    this.roomlist_tables[x].user_header  = new createjs.Shape();
    this.roomlist_tables[x].user_header.y = this.roomlist_tables[x].y;
    this.roomlist_tables[x].user_header.graphics.beginLinearGradientFill(header_bg, [0,1], 0, 0, 400, 15 ).drawRoundRectComplex( -15, -5, 815, 35, 10, 10, 0, 0 );
    _target.addChild(this.roomlist_tables[x].user_header);

    this.roomlist_tables[x].dealer_img_bg  = new createjs.Shape();
		this.roomlist_tables[x].dealer_img_bg.graphics.beginFill("#f5ac4e").drawCircle( 0, 0, 46 );
		this.roomlist_tables[x].dealer_img_bg.x = 58;
		this.roomlist_tables[x].dealer_img_bg.y = 60 + this.roomlist_tables[x].y;
		_target.addChild(this.roomlist_tables[x].dealer_img_bg);

		//	user avatar
		console.log(data, "error in avatar")
    let roomAvatar = data.banker.avatar;

    if(roomAvatar == '' || !roomAvatar) {
      roomAvatar = 'red_queen';
    }
		this.roomlist_tables[x].userAvatar = new createjs.Bitmap("/img/room-avatar/"+roomAvatar+".png");
		this.roomlist_tables[x].userAvatar.setBounds(0,0,100,100)
		this.roomlist_tables[x].userAvatar.regX = this.roomlist_tables[x].userAvatar.getBounds().width;
		this.roomlist_tables[x].userAvatar.regY = this.roomlist_tables[x].userAvatar.getBounds().height;
		this.roomlist_tables[x].userAvatar.scaleX = this.roomlist_tables[x].userAvatar.scaleY = 0.93;
		this.roomlist_tables[x].userAvatar.x = this.roomlist_tables[x].dealer_img_bg.x + 46.5;
		this.roomlist_tables[x].userAvatar.y = this.roomlist_tables[x].dealer_img_bg.y + 46.5;
		_target.addChild(this.roomlist_tables[x].userAvatar);



		this.lock_icon = new createjs.Bitmap('img/icons/ico_lock.png');
		this.lock_icon.scaleX = this.lock_icon.scaleY = 0.6;
		this.lock_icon.x = 765;
		this.lock_icon.y = 3;
		this.lock_icon.visible = false;
		_target.addChild(this.lock_icon);

    if(data.banker.password){
		  this.lock_icon.visible = true;
		}

    let button_grad = ["#ffd476","#c69522"];

		if(window.isBanker == true) {
			button_grad = ["#b38f40","#a07f38"]
		}

    this.join_button = new createjs.Shape();
		this.join_button.graphics.beginLinearGradientFill( button_grad, [0, 1],0 ,0, 0, 40 ).drawRoundRect(0, 0, 110, 50, 8 );
		this.join_button.x = 670;
		this.join_button.y = 50;
		this.join_button.cursor = "pointer";
    this.join_button.tableId = data.data[1];
		this.join_button.token = data.data[5];
		this.join_button.betRange = data.data[6];
    this.join_button.gameName = data.data[4];
		_target.addChild(this.join_button);

    if(window.isBanker == false) {
      this.join_button.addEventListener('click', (e) => {
      	if(e.currentTarget.gameName.toLowerCase() === "paigow" || e.currentTarget.gameName.toLowerCase() === "pai-gow") {
       		location.assign(window.paigow_domain+e.currentTarget.tableId+"/"+e.currentTarget.betRange+"/0?token="+e.currentTarget.token)
      	} else {
       		location.assign(window.sb_domain+e.currentTarget.tableId+"/"+e.currentTarget.betRange+"?token="+e.currentTarget.token)
      	}
  		});
    }

		this.join_text = new createjs.Text(window.language.lobby.join.toUpperCase(), "18px latobold","#473102");
		this.join_text.textAlign = "center";
		this.join_text.textBaseline = "middle";
		this.join_text.x = this.join_button.x + (110/2);
		this.join_text.y = this.join_button.y + (50/2);
		this.join_text.hitArea = this.join_button;
		this.join_text.shadow = new createjs.Shadow("#feff5f",1,2,2);
		_target.addChild(this.join_text);

		this.request_button = new createjs.Shape();
		this.request_button.graphics.beginLinearGradientFill( button_grad, [0, 1],0 ,0, 0, 40 ).drawRoundRect(0, 0, 110, 50, 8 );
		this.request_button.x = 670;
		this.request_button.y = 50;
		this.request_button.cursor = "pointer";
		this.request_button.tableId = data.data[1];
		this.request_button.token = data.data[5];
		this.request_button.gameName = data.data[4];
		this.request_button.betRange = data.data[6];
    this.request_button.pass = data.banker.password;
    this.request_button.roomId = data.data[8];
		_target.addChild(this.request_button);

		this.request_text = new createjs.Text(window.language.lobby.request.toUpperCase(), "18px latobold","#473102");
		this.request_text.textAlign = "center";
		this.request_text.textBaseline = "middle";
		this.request_text.shadow = new createjs.Shadow("#feff5f",1,2,2);
		this.request_text.x = this.request_button.x + (110/2);
		this.request_text.y = this.request_button.y + (50/2);
		this.request_text.hitArea = this.request_button;

		// this.request_text.visible = data.roomInfo.isPrivate;
		_target.addChild(this.request_text);

		console.log("****", data.banker);

		if(data.banker.password == "" || !data.banker.password) {
			this.request_text.visible = false;
			this.request_button.visible = false;
		} else {
			this.lock_icon.visible = true;
			this.join_text.visible = false;
			this.join_button.visible = false;
		}

    if(window.isBanker == false) {
      this.request_button.addEventListener('click', (e) => {
        toggle.togglePopups("roomverification");
        $('#privatejoin').attr('token', e.currentTarget.token);
        $('#privatejoin').attr('betrange', e.currentTarget.betRange);
        $('#privatejoin').attr('tableid', e.currentTarget.tableId);
				$('#privatejoin').attr('roomId', e.currentTarget.roomId);
				$('#privatejoin').attr('game', e.currentTarget.gameName);
        $('#targetuser').val(e.currentTarget.pass);
        $('.popup-bg').css({'top': 0});
      });
    }

		_target.roomlist_tables = this.roomlist_tables[x];
		_target.update()
	},
  checkMaintenance(maintenanceData, socket, x) {
		let self = this;
		if(!self.thumb_tables || !self.thumb_tables[x] || !self.thumb_tables[x].maintenanceCon) return;

		  if(window.userAuthority == 'admin') return;
		   // if (self.all_thumbnial_table[x].game_name === 'Baccarat' && parseInt(self.all_thumbnial_table[x].table_number) === 2) return;

		let maintenance = '';
		let mainTextThumb = '';
		let mainText = '';
		let subText = '';
		let activeMaintenance = [];
		let maintenanceSetting = [];

		if (maintenanceData.gameName === 'Baccarat' || maintenanceData.gameName === 'Poker') {
			if (!socket) {
				maintenanceSetting = maintenanceData.maintenanceSetting.maintenance;

				for (var i = 0; i < maintenanceSetting.length; i++) {
					if (self.thumb_tables[x].slave === maintenanceSetting[i].type) {
						for (var j = 0; j < maintenanceSetting[i].info.length; j++) {
							if (maintenanceSetting[i].info[j].status === 1) {
								maintenance = true;
								activeMaintenance = maintenanceSetting[i].info[j];
							}
						} // end for loop
					}
					else if (self.thumb_tables[x].slave === '' && maintenanceSetting[i].type === 'normal') {
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

				if (self.thumb_tables[x].slave === activeMaintenance.slave) {
					if (parseInt(activeMaintenance.status) === 1) {
						maintenance = true;
					}
					else {
						maintenance = false;
					}
				}
			}
		}
		else {
			if (!socket) {
				maintenanceSetting = maintenanceData.maintenanceSetting;

				for (var i = 0; i < maintenanceSetting.length; i++) {
					if (maintenanceSetting[i].status == 1) {
						maintenance = true;
						activeMaintenance = maintenanceSetting[i];
					}
				}
			}
			else {

				activeMaintenance = maintenanceData.data;

				if (maintenanceData == 1) {
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
			mainTextThumb = window.language.lobby.maintextCap1Thumb;
		}
		else if (parseInt(activeMaintenance.main_text) == 2) {
			mainText = window.language.lobby.maintextCap2;
			mainTextThumb = window.language.lobby.maintextCap2Thumb;

			if (window.language.locale != 'en') {
				self.thumb_tables[x].maintenanceSubTxt.y = 133 + self.thumb_tables[x].y;
				self.thumb_tables[x].maintenanceTime.y = 158 + self.thumb_tables[x].y;
			}

			if (window.language.locale == 'jp') {
				self.thumb_tables[x].maintenanceTxt.y = 60 + self.thumb_tables[x].y;
			}

			if (window.language.locale == 'zh') {
				self.thumb_tables[x].maintenanceTxt.font = '17px bebasneue';
			}
		}
		else if (parseInt(activeMaintenance.main_text) == 3) {
			mainText = window.language.lobby.maintextCap3;
			mainTextThumb = window.language.lobby.maintextCap3Thumb;

			self.thumb_tables[x].maintenanceSubTxt.y = 133 + self.thumb_tables[x].y;
			self.thumb_tables[x].maintenanceTime.y = 158 + self.thumb_tables[x].y;

			if (window.language.locale == 'zh') {
				self.thumb_tables[x].maintenanceTxt.font = '17px bebasneue';
			}
		}

		// Extra line for jp texts
		if (window.language.locale == 'jp') {
			self.thumb_tables[x].maintenanceSubTxt.y = 133 + self.thumb_tables[x].y;
			self.thumb_tables[x].maintenanceTime.y = 158 + self.thumb_tables[x].y;
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
			self.thumb_tables[x].maintenanceCon.visible = true;
			self.thumb_tables[x].maintenanceTxt.text = mainTextThumb;
			self.thumb_tables[x].maintenanceSubTxt.text = subText;
			self.thumb_tables[x].maintenanceTime.text = newStartTime +' ~ '+ newEndTime;
		}
		else if (maintenance === false) {
			self.thumb_tables[x].maintenanceCon.visible = false;
		}
	}
}

export default {
	instance
}
