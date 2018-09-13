import timer from '../../timer-animation';
import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../../factories/factories';

let instance = null;

instance = {
  tables : [],
  getText(x,y,text,font,color,align,valign){
		let ctrl = new createjs.Text(text,font,color);
		ctrl.x = x;
		ctrl.y = y;
		ctrl.textAlign = align;
		ctrl.textBaseline = valign;//"middle"
		return ctrl;
	},
  makeListTables (data, _target, _timer_c,  x, self) {
    if(_target) {
      _target.removeAllChildren()
    }

    if(_timer_c) {
      _timer_c.removeAllChildren()
    }

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
    this.tables[x] = new createjs.Shape();
    this.tables[x].graphics.beginFill("#d8d4d2").drawRoundRect(350,0,896,283,0);
    this.tables[x].cache(350,0,896,283);
    this.tables[x].game_name = data.gameName;
    this.tables[x].slave = slaveName;
    this.tables[x].table_number = data.tableNumber;
    _target.addChild(this.tables[x])

    this.tables[x].dealer_bg  = new createjs.Shape();
    this.tables[x].dealer_bg.graphics.beginFill("#333").drawRoundRectComplex(0,0,350,283,10,0,0,10);
    this.tables[x].dealer_bg.cache(0,0,350,283)
    _target.addChild(this.tables[x].dealer_bg)

    this.tables[x].dealer_header  = new createjs.Shape();

    // === table name
    let header_bg = ["#980000","#2b0000"];
    let text_color = "#efb052";
    let level = window.language.level.normal;
    let slave_level;
    let gameRoomName = '';
    let gameNameStr = '';
    let icoLocation = 'super6_table_list';

    switch(data.gameName) {
      case "Baccarat" :
        gameNameStr = window.language.lobby.baccarat;
        break;
      case "Dragon-Tiger" :
        gameNameStr = window.language.lobby.dragontiger;
        break;
      case "Poker" :
        gameNameStr = window.language.lobby.texas;
        break;
      case "Sicbo" :
        gameNameStr = window.language.lobby.sicbo;
        break;
        case "Pai-Gow" :
        gameNameStr = window.language.lobby.paigow;
        break;
    }

    if (data.slave && data.slave == 'supersix') {
      icoLocation = 'supersix_norm';
    }
    else if (data.slave && data.slave == 'bonus') {
      icoLocation = 'dragonbonus_norm';
    }

    if(data.roomType == "p") {
      header_bg = ["#bd0000","#7c0000"];
      text_color = "#efb052";
      gameRoomName = gameNameStr + " " + window.language.level.premium;
      level = window.language.level.premium;
    } else if(data.roomType == "v") {
      header_bg = ["#fedd78","#d5a515"];
      text_color = "#000";
      gameRoomName = gameNameStr + " " + window.language.level.vip;
      level = window.language.level.vip;

      if (data.slave && data.slave == 'supersix') {
        icoLocation = 'supersix_vip';
      }
      else if (data.slave && data.slave == 'bonus') {
        icoLocation = 'dragonbonus_vip';
      }
    } else if (isThemedGames) {
        header_bg = ["#C1185B", "#750C44"];
        gameRoomName = gameNameStr;
    } else {
      header_bg = ["#980000","#2b0000"];
      text_color = "#efb052";
      gameRoomName = gameNameStr;
    }

    slave_level = level;

    this.tables[x].dealer_header.graphics.beginLinearGradientFill(header_bg, [0,1], 0,0,300,20).drawRoundRectComplex(0,0,350,50,10,0,0,0);
    this.tables[x].dealer_header.cache(0,0,350,50)
    _target.addChild(this.tables[x].dealer_header);

    this.tables[x].dealer_img_bg  = new createjs.Shape();
    this.tables[x].dealer_img_bg.graphics.beginFill("#f5ac4e").drawCircle(0,0,58);
    this.tables[x].dealer_img_bg.x = 84
    this.tables[x].dealer_img_bg.y = 130;
    _target.addChild(this.tables[x].dealer_img_bg);

    if (data.gameName == 'Baccarat') {
      if (data.slave == 'supersix' || data.slave == 'bonus') {
        this.tables[x].slaveIcon = new createjs.Bitmap(self.context.load.getResources(icoLocation));
        this.tables[x].slaveIcon.x = this.tables[x].x + 45;
        this.tables[x].slaveIcon.y = this.tables[x].y + 4;
        _target.addChild(this.tables[x].slaveIcon);
      } // end of if slave

      gameRoomName = level;

      for (var i = 0; i < window.bcSetting.length; i++) {
        if (parseInt(data.tableNumber) == window.bcSetting[i].id) {
          let betSetting = JSON.parse(window.bcSetting[i].bet_setting);

          if (betSetting.type[0] == 'flippy') {
            let menu_spritesheet_data = {
                images: ["/img/v3/icons/flippy/flippy_sprite.png"],
                frames: {width:51,height:37},
                animations: {
                    "first": {
                        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 23, 24, 25, 26, 27],
                        speed: 0.4
                    },
                }
            }

            this.tables[x].flippy_spriteSheet = new createjs.SpriteSheet(menu_spritesheet_data);
            this.tables[x].flippyImg = new createjs.Sprite(this.tables[x].flippy_spriteSheet,"first");
            // this.tables[x].flippyImg.scaleX = this.tables[x].flippyImg.scaleY = 1;
            this.tables[x].flippyImg.x = 290;
            this.tables[x].flippyImg.y = this.tables[x].y + 5;
            if(_timer_c) {
              _timer_c.addChild(this.tables[x].flippyImg);
            } else {
              _target.addChild(this.tables[x].flippyImg);
            }

            if (!level) {
                slave_level = window.language.level.normal;
            }

            gameRoomName = slave_level == '' ? window.language.level.normal : slave_level;
          }

          // if (data.slave && (data.slave == 'supersix' || data.slave == 'bonus')){
          //     gameRoomName = slave_level == '' ? window.language.level.normal : slave_level;
          // }
        }
      }
    } // end if baccarat
    else if (data.gameName == 'Poker') {
      if (data.slave == 'bonusplus') {
        this.tables[x].pokerBonusIcon = new createjs.Bitmap("/img/icons/poker/pokerbonusplus.png");
        this.tables[x].pokerBonusIcon.x = this.tables[x].x + 15;
        this.tables[x].pokerBonusIcon.y = this.tables[x].y + 6;
        _target.addChild(this.tables[x].pokerBonusIcon);
      }
    } // end of if poker

    this.tables[x].table_name = new createjs.Text(gameRoomName,"bold 20px ArvoItalic",text_color);
    // this.tables[x].table_name.x = data.gameName == 'Dragon-Tiger' ? 195 : 195;
    this.tables[x].table_name.x = 80;
    this.tables[x].table_name.y = 13 + this.tables[x].y;
    this.tables[x].table_name.textAlign = "left";
    _target.addChild(this.tables[x].table_name);

    this.tables[x].table_num = new createjs.Text(data.tableNumber.length < 2 ? "0"+data.tableNumber : data.tableNumber,"21px ArvoBold",text_color);
    this.tables[x].table_num.textAlign = "left";
    // this.tables[x].table_num.x = this.tables[x].table_name.x - (this.tables[x].table_name.getBounds().width / 2) - 15;
    this.tables[x].table_num.x = 40;
    this.tables[x].table_num.y = 11 + this.tables[x].y;
    _target.addChild(this.tables[x].table_num);

    if (data.slave == 'supersix') {
      this.tables[x].table_name.x += 60;
      this.tables[x].table_num.x += 60;
    }
    else if (data.slave == 'bonus') {
      this.tables[x].table_name.x += 65;
      this.tables[x].table_num.x += 65;
    }

    // Poker bonus plus special condition
    if (data.gameName == 'Poker') {
      this.tables[x].table_name.x += 20;
      this.tables[x].table_num.x += 20;

      if (data.slave == 'bonusplus') {
        this.tables[x].table_name.x += 35;
        this.tables[x].table_num.x += 35;
      }
    }

    // === round num
    this.tables[x].round_num = new createjs.Text(data.currentRound, "18px LatoBlack","#fff");
    _target.addChild(this.tables[x].round_num);
    //=== table status
    this.tables[x].status = new createjs.Text("", "18px LatoRegular","#fff");
    _target.addChild(this.tables[x].status);
    if(window.language.locale == "zh") {
      this.tables[x].status.font = "23px LatoRegular";
    } //
    //== timer

    this.tables[x].timer = _.clone(timer());
    this.tables[x].timer.scaleX = this.tables[x].timer.scaleY = 1.14;
    this.tables[x].timer.is_timerStart = false;
    this.tables[x].timer.visible = true;
    this.tables[x].timer.y = 28;
    this.tables[x].timer.x = -14;
    if(_timer_c) {
      _timer_c.addChild(this.tables[x].timer);
    } // if has timer canvas
    else {
      _target.addChild(this.tables[x].timer);
    } // if no tiumer canvas

    //== dealer image
    this.tables[x].dealer_img = new createjs.Bitmap();
    this.tables[x].dealer_img.setBounds(0,0,250,250)
    this.tables[x].dealer_img.regX = this.tables[x].dealer_img.getBounds().width;
    this.tables[x].dealer_img.regY = this.tables[x].dealer_img.getBounds().height;
    this.tables[x].dealer_img.scaleX = this.tables[x].dealer_img.scaleY = 0.95;
    // this.tables[x].dealer_img.x = this.tables[x].dealer_img_bg.x;
    // this.tables[x].dealer_img.y = this.tables[x].dealer_img_bg.y;
    this.tables[x].dealer_img.mask = this.tables[x].dealer_img_bg;

    this.tables[x].dealer_id = data.dealerId;

    for (var i = 0; i < window.dealerImg.length; i++) {
      if (window.dealerImg[i].id == data.dealerId) {
        let dbImage = new Image();
        dbImage.src = window.dealerImg[i].dealer_image;
        this.tables[x].dealer_img.image = dbImage;
      }
    }

    _target.addChild(this.tables[x].dealer_img);

    // === dealer name
    this.tables[x].dealer_name = new createjs.Text(data.currentDealer, "18px LatoRegular" , "#fff");
    this.tables[x].dealer_name.textAlign = "center";
    _target.addChild(this.tables[x].dealer_name);

     // === bet range
    let posX = 0;
    let bet_range_bg = new createjs.Shape();

    if(data.sportBetRanges.length > 3) {
      posX = -820;
      bet_range_bg.graphics.beginFill("rgba(0,0,0,0.68)").drawRect(0,0,750,282.6);
    } else {
      posX = -400;
      bet_range_bg.graphics.beginFill("rgba(0,0,0,0.68)").drawRect(0,0,(750/2) + 12 ,282.6);
    }

    bet_range_bg.x = 349;

    let bet_range_mask = new createjs.Shape();
    bet_range_mask.graphics.beginFill("red").drawRect(0,0,900,284);
    bet_range_mask.y =  this.tables[x].y
    if(data.gameName == 'Baccarat') {
      bet_range_mask.y =  this.tables[x].y - 5;
    }
    bet_range_bg.y = bet_range_mask.y;
    bet_range_mask.x = 350;

    this.tables[x].bet_range_container = new createjs.Container();
    this.tables[x].bet_range = [];
    this.tables[x].bet_range_text_hyphen = [];
    this.tables[x].bet_range_text_min = [];
    this.tables[x].bet_range_text_max = [];
    this.tables[x].bet_range_container.addChild(bet_range_bg);
    this.tables[x].bet_range_container.mask = bet_range_mask;

    this.tables[x].bet_range_container.x = posX;
    this.tables[x].bet_range_container.posX = posX;

    // if(data.gameName == "Baccarat" || data.gameName == "Dragon-Tiger") {
    //   this.tables[x].enter_button_bg = new createjs.Shape();
    //   this.tables[x].enter_button_bg.graphics.beginLinearGradientFill(["#b88a19", "#ffd476"],[0,1], 0,38,0,0).drawRoundRect(0,0,150,50,10);
    //   this.tables[x].enter_button_bg.setBounds(0,0,150,50,10);
    //   this.tables[x].enter_button_bg.y = this.tables[x].y + 220;
    //   this.tables[x].enter_button_bg.x = 20;
    //   this.tables[x].enter_button_bg.target_betrange = this.tables[x].bet_range_container;
    //   this.tables[x].enter_button_bg.trans = this.tables[x];

    //   if(data.gameName=='Baccarat') {
    //     _timer_c.addChild(this.tables[x].enter_button_bg);
    //   } else {
    //     _target.addChild(this.tables[x].enter_button_bg);
    //   }

    //   this.tables[x].enter_text = new createjs.Text(window.language.menu.singleplayer.toUpperCase() , "bold 18px LatoBlack", "#493105");
    //   this.tables[x].enter_text.x = this.tables[x].enter_button_bg.x + (150/2);
    //   this.tables[x].enter_text.y = this.tables[x].enter_button_bg.y + (50/2);
    //   this.tables[x].enter_text.textAlign = "center";
    //   this.tables[x].enter_text.textBaseline = "middle";
    //   this.tables[x].enter_text.hitArea = this.tables[x].enter_button_bg;
    //   this.tables[x].enter_text.shadow = new createjs.Shadow("#faf65c" , 0,2,4)

    //   if(data.gameName=='Baccarat') {
    //     _timer_c.addChild(this.tables[x].enter_text);
    //   } else {
    //     _target.addChild(this.tables[x].enter_text);
    //   }

    //   if(window.language.locale == "zh") {
    //     this.tables[x].enter_text.font = "bold 25px LatoBlack";
    //   }
    // } else {

      this.tables[x].enter_button_bg = new createjs.Shape();
      this.tables[x].enter_button_bg.graphics.beginLinearGradientFill(["#b88a19", "#ffd476"],[0,1], 0,38,0,0).drawRoundRect(0,0,240,50,10);
      this.tables[x].enter_button_bg.setBounds(0,0,240,50,10);
      this.tables[x].enter_button_bg.y = this.tables[x].y + 220;
      this.tables[x].enter_button_bg.x = 55;
      this.tables[x].enter_button_bg.target_betrange = this.tables[x].bet_range_container;
      this.tables[x].enter_button_bg.trans = this.tables[x];

      if(data.gameName=='Baccarat') {
        _timer_c.addChild(this.tables[x].enter_button_bg);
      } else {
        _target.addChild(this.tables[x].enter_button_bg);
      }

      this.tables[x].enter_text = new createjs.Text(window.language.lobby.entercaps , "bold 26px LatoBlack", "#493105");
      this.tables[x].enter_text.x = this.tables[x].enter_button_bg.x + (240/2);
      this.tables[x].enter_text.y = this.tables[x].enter_button_bg.y + (50/2);
      this.tables[x].enter_text.textAlign = "center";
      this.tables[x].enter_text.textBaseline = "middle";
      this.tables[x].enter_text.hitArea = this.tables[x].enter_button_bg;
      this.tables[x].enter_text.shadow = new createjs.Shadow("#faf65c" , 0,2,4)

      if(data.gameName=='Baccarat') {
        _timer_c.addChild(this.tables[x].enter_text);
      } else {
        _target.addChild(this.tables[x].enter_text);
      }
    // }

    if(data.gameName == "Baccarat" || data.gameName == "Dragon-Tiger") {
      this.tables[x].multi_button_bg = new createjs.Shape();
      this.tables[x].multi_button_bg.graphics.beginLinearGradientFill(["#b88a19", "#ffd476"],[0,1], 0,38,0,0).drawRoundRect(0,0,150,50,10);
      this.tables[x].multi_button_bg.setBounds(0,0,150,50,10);
      this.tables[x].multi_button_bg.y = this.tables[x].y + 220;
      this.tables[x].multi_button_bg.x = 20 +150 + 10;
      this.tables[x].multi_button_bg.target_betrange = this.tables[x].bet_range_container;
      this.tables[x].multi_button_bg.trans = this.tables[x];
      this.tables[x].multi_button_bg.index = x;
      // if(data.gameName=='Baccarat') {
      //   _timer_c.addChild(this.tables[x].multi_button_bg);
      // } else {
      //   _target.addChild(this.tables[x].multi_button_bg);
      // }
      // _target.addChild(this.tables[x].multi_button_bg);

      this.tables[x].multi_text = new createjs.Text(window.language.menu.multiplayer.toUpperCase() , "bold 18px LatoBlack", "#493105");
      this.tables[x].multi_text.x = this.tables[x].enter_button_bg.x + (150/2) + 150 + 10;
      this.tables[x].multi_text.y = this.tables[x].enter_button_bg.y + (50/2);
      this.tables[x].multi_text.textAlign = "center";
      this.tables[x].multi_text.textBaseline = "middle";
      this.tables[x].multi_text.hitArea = this.tables[x].enter_button_bg;
      this.tables[x].multi_text.shadow = new createjs.Shadow("#faf65c" , 0,2,4)
      // _target.addChild(this.tables[x].multi_text);
      // if(data.gameName=='Baccarat') {
      //   _timer_c.addChild(this.tables[x].multi_text);
      // } else {
      //   _target.addChild(this.tables[x].multi_text);
      // }

      if(window.language.locale == "zh") {
        this.tables[x].multi_text.font = "bold 25px LatoBlack";
      }
    }

    this.is_multiplayer =0;
    this.tables[x].enter_button_bg.index = x
    this.tables[x].enter_button_bg.is_clicked = false;
    this.tables[x].enter_button_bg.addEventListener("mousedown", (e)=> {
      if(!e.currentTarget.is_clicked) {
          this.is_multiplayer = 0;

          this.tables.forEach(function (row) {
            if(!row.enter_button_bg) return;
            row.enter_button_bg.target_betrange.x = row.enter_button_bg.target_betrange.posX;
            row.enter_button_bg.graphics.clear().beginLinearGradientFill(['#b88a19',"#ffd476"],[0,1], 0,38,0,0).drawRoundRect(0,0,row.enter_button_bg.getBounds().width,row.enter_button_bg.getBounds().height,10);
            if(row.multi_button_bg) {
              row.multi_button_bg.graphics.clear().beginLinearGradientFill(['#b88a19',"#ffd476"],[0,1], 0,38,0,0).drawRoundRect(0,0,row.multi_button_bg.getBounds().width,row.multi_button_bg.getBounds().height,10);
            }
          });

          createjs.Tween.get(e.currentTarget.target_betrange)
          .to({
              x : 0
          },150);

          this.tables.forEach(function (row) {
            if(!row.enter_button_bg) return;
            row.enter_button_bg.is_clicked = false;
            if(row.multi_button_bg) {
                row.multi_button_bg.is_clicked = false;
            }
            if(row.multiplayer_button_bg) {
                row.multiplayer_button_bg.is_clicked = false;
            }
          });

          e.currentTarget.is_clicked = true;
          if(e.currentTarget.trans.game_name == "Baccarat") {
            e.currentTarget.trans.multi_button_bg.is_clicked = false;
          }

          e.currentTarget.graphics.clear().beginLinearGradientFill(["#ffd476", '#a67b12'],[0,1], 0,38,0,0).drawRoundRect(0,0,e.currentTarget.getBounds().width,e.currentTarget.getBounds().height,10);
          return;
      }

      this.tables.forEach(function (row) {
          row.enter_button_bg.is_clicked = false;
          row.enter_button_bg.target_betrange.x = row.enter_button_bg.target_betrange.posX
          if(row.multiplayer_button_bg) {
              row.multiplayer_button_bg.is_clicked = false;
          }
      });
    }, false);

    // if(data.gameName == "Baccarat" || data.gameName == "Dragon-Tiger") {
    //   this.tables[x].multi_button_bg.is_clicked = false;
    //   this.tables[x].multi_button_bg.addEventListener("mousedown", (e)=> {
    //     if(!e.currentTarget.is_clicked) {
    //       this.is_multiplayer =1;
    //       this.tables.forEach(function (row) {
    //         row.enter_button_bg.target_betrange.x = row.enter_button_bg.target_betrange.posX
    //         row.multi_button_bg.graphics.clear().beginLinearGradientFill(['#b88a19',"#ffd476"],[0,1], 0,38,0,0).drawRoundRect(0,0,row.multi_button_bg.getBounds().width,row.multi_button_bg.getBounds().height,10);
    //         row.enter_button_bg.graphics.clear().beginLinearGradientFill(['#b88a19',"#ffd476"],[0,1], 0,38,0,0).drawRoundRect(0,0,row.enter_button_bg.getBounds().width,row.enter_button_bg.getBounds().height,10);
    //       });

    //       createjs.Tween.get(e.currentTarget.target_betrange)
    //       .to({
    //           x : 0
    //       },150);

    //       this.tables.forEach(function (row) {
    //         row.enter_button_bg.is_clicked = false;
    //         if(row.multi_button_bg) {
    //             row.multi_button_bg.is_clicked = false;
    //         }
    //         if(row.multiplayer_button_bg) {
    //             row.multiplayer_button_bg.is_clicked = false;
    //         }
    //       });

    //       e.currentTarget.is_clicked = true;
    //       if(e.currentTarget.trans.game_name == "Baccarat") {
    //         e.currentTarget.trans.multi_button_bg.is_clicked = false;
    //       }
    //       e.currentTarget.graphics.clear().beginLinearGradientFill(["#ffd476", '#a67b12'],[0,1], 0,38,0,0).drawRoundRect(0,0,e.currentTarget.getBounds().width,e.currentTarget.getBounds().height,10);
    //       return;
    //     }
    //     this.tables.forEach(function (row) {
    //       row.enter_button_bg.is_clicked = false;
    //       row.enter_button_bg.target_betrange.x = row.enter_button_bg.target_betrange.posX
    //       if(row.multiplayer_button_bg) {
    //         row.multiplayer_button_bg.is_clicked = false;
    //       }
    //     });
    //   }, false);
    // }

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

    for (var i = 0; i < rangeToUse.length; i++) {
      this.tables[x].bet_range[i] = new createjs.Shape();
      this.tables[x].bet_range[i].graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,35).drawRoundRect(0,0,330,50,26);
      this.tables[x].bet_range[i].range_index = data.tableNumber;
      this.tables[x].bet_range[i].x = bet_range_bg.x + 30;
      this.tables[x].bet_range[i].y = (i * 65) + (55 + this.tables[x].y);

      if (i > 2) {
        this.tables[x].bet_range[i].x = bet_range_bg.x + 400;
        this.tables[x].bet_range[i].y = ((i-3) * 65) + (55 + this.tables[x].y);;
      } //end if

      this.tables[x].bet_range[i].game = data.gameName;
      this.tables[x].bet_range_container.addChild(this.tables[x].bet_range[i]);

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
      betRangeMax = ((rangeToUse[i].max * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

      this.tables[x].bet_range_text_hyphen[i] = new createjs.Text(" - ", "22px LatoBlack" ,"#000");
      // this.tables[x].bet_range_text_hyphen[i].x = this.tables[x].bet_range[i].x + (330/2);
      this.tables[x].bet_range_text_hyphen[i].textAlign = "left";
      this.tables[x].bet_range_container.addChild(this.tables[x].bet_range_text_hyphen[i]);

      this.tables[x].bet_range_text_min[i] = new createjs.Text(numberWithCommas(betRangeMin), "22px LatoBlack" ,"#000");
      // this.tables[x].bet_range_text_min[i].x = this.tables[x].bet_range_text_hyphen[i].x - 8;
      this.tables[x].bet_range_text_min[i].textAlign = "left";
      this.tables[x].bet_range_container.addChild(this.tables[x].bet_range_text_min[i]);

      this.tables[x].bet_range_text_max[i] = new createjs.Text(numberWithCommas(betRangeMax), "22px LatoBlack" ,"#000");
      // this.tables[x].bet_range_text_max[i].x = this.tables[x].bet_range_text_hyphen[i].x + 8;
      this.tables[x].bet_range_text_max[i].textAlign = "left";
      this.tables[x].bet_range_container.addChild(this.tables[x].bet_range_text_max[i]);

      this.tables[x].bet_range_text_hyphen[i].textBaseline = this.tables[x].bet_range_text_min[i].textBaseline = this.tables[x].bet_range_text_max[i].textBaseline = "middle";
      this.tables[x].bet_range_text_hyphen[i].y = this.tables[x].bet_range_text_min[i].y = this.tables[x].bet_range_text_max[i].y = this.tables[x].bet_range[i].y + (50/2);

      // x coordinates
      let totalWidth = this.tables[x].bet_range_text_min[i].getBounds().width + this.tables[x].bet_range_text_hyphen[i].getBounds().width + this.tables[x].bet_range_text_max[i].getBounds().width;
      this.tables[x].bet_range_text_min[i].x = (this.tables[x].bet_range[i].x) + ((330 - totalWidth) / 2);
      this.tables[x].bet_range_text_hyphen[i].x = this.tables[x].bet_range_text_min[i].x + this.tables[x].bet_range_text_min[i].getBounds().width;
      this.tables[x].bet_range_text_max[i].x = this.tables[x].bet_range_text_hyphen[i].x + this.tables[x].bet_range_text_hyphen[i].getBounds().width;

      this.tables[x].bet_range[i].clickActive =  function (e, type) {
        if(type == "click") {
          e.graphics.clear().beginLinearGradientFill(["#c69522", "#ffd476"],[0,1],0,0,0,35).drawRoundRect(0,0,330,50,26);
        } else {
          e.graphics.clear().beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,35).drawRoundRect(0,0,330,50,26);
        }
      } //end of hover

      if(data.gameName == "Sicbo") {
        if (window.nonInstall) {
          this.tables[x].bet_range[i].redirect_link = window.sb_domain+"non/Sicbo/"+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
        } else {
          this.tables[x].bet_range[i].redirect_link = window.sb_domain+"m/Sicbo/"+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
        }
      } //end if sicbo
      if(data.gameName == "Baccarat") {
        if(data.slave && data.slave=='supersix' || data.slave=='bonus'){
          this.tables[x].bet_range[i].slave = data.slave;
        }
        if (window.nonInstall) {
          this.tables[x].bet_range[i].redirect_link = window.bc_domain+"non/Baccarat/"+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
        } else {
          this.tables[x].bet_range[i].redirect_link = window.bc_domain+"m/Baccarat/"+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
        }


      }//end if baccarat
      if(data.gameName == "Dragon-Tiger") {
        if (window.nonInstall) {
          this.tables[x].bet_range[i].redirect_link = window.dt_domain+"non/Dragon-Tiger/"+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
        } else {
          this.tables[x].bet_range[i].redirect_link = window.dt_domain+"m/Dragon-Tiger/"+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
        }
      }//end if dragontiger

      if(data.gameName == "Poker") {
        if (window.nonInstall) {
          this.tables[x].bet_range[i].redirect_link = window.poker_domain+"non/Poker/"+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
        } else {
          this.tables[x].bet_range[i].redirect_link = window.poker_domain+"m/Poker/"+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
        }


        if(data.slave && data.slave=='bonusplus'){
          this.tables[x].bet_range[i].slave = data.slave;
          if (window.nonInstall) {
            this.tables[x].bet_range[i].redirect_link = window.poker_domain+"non/Poker/"+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max
            + "?slave=bonusplus";
          } else {
            this.tables[x].bet_range[i].redirect_link = window.poker_domain+"m/Poker/"+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max
            + "?slave=bonusplus";
          }

        } //emd of bonusplus
      } //end if poker

      if(data.gameName == "Pai-Gow") {
        if (window.nonInstall) {
          this.tables[x].bet_range[i].redirect_link = window.paigow_domain+"non/Paigow/"+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max + "/"+0;
        } else {
          this.tables[x].bet_range[i].redirect_link = window.paigow_domain+"m/Paigow/"+data.tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max + "/"+0;
        }
      } //end if sicbo

      this.tables[x].bet_range[i].targ = {data:data};

      this.tables[x].bet_range[i].on("click", (e) => {

        let maintenance = false;

        if(maintenance) return;

        e.currentTarget.clickActive(e.currentTarget, 'click');

        if(e.currentTarget.game == "Baccarat" || e.currentTarget.game == "Dragon-Tiger") {
          if(e.target.slave && (e.target.slave=='supersix' || e.target.slave=='bonus')){
            if(window.isBanker == false) {
              location.assign(e.currentTarget.redirect_link + "/0" + '?slave='+e.target.slave);
            }
          }
          else {
            if(window.isBanker == false) {
              location.assign(e.currentTarget.redirect_link + "/0");
            }
          }
          return;
        }

        location.assign(e.currentTarget.redirect_link);
      });
    }//end for

    _target.tables = this.tables[x];
  }, // end of make

  makeRoomListTables(data, gamedata,  _target, _timer_c,  x, self){
    if(_target) {
      _target.removeAllChildren()
    }

    if(_timer_c) {
      _timer_c.removeAllChildren()
    }
    // === table background
    this.tables[x] = new createjs.Shape();
    this.tables[x].graphics.beginFill("#333").drawRoundRectComplex(-15, -5, 840, 115, 10, 0, 0, 0);
    this.tables[x].y = 5;
    _target.addChild(this.tables[x]);

    let header_bg = ["#980000","#2b0000"];
    let text_color = "#ffb84a";
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

    if(gamedata.gameName == "Pai-Gow") {
      header_bg = ["#c2185b","#740c43"];
    }

    if(data.data[6] == premium) {
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
    this.tables[x].user_header  = new createjs.Shape();
    this.tables[x].user_header.y = this.tables[x].y;
    this.tables[x].user_header.graphics.beginLinearGradientFill(header_bg, [0,1], 0, 0, 500, 15 ).drawRoundRectComplex( -15, -5, 650, 40, 10, 0, 0, 0 );
    _target.addChild(this.tables[x].user_header);

    this.lock_icon = new createjs.Bitmap('img/icons/ico_lock.png');
    this.lock_icon.scaleX = this.lock_icon.scaleY = 0.6;
    this.lock_icon.x = 600;
    this.lock_icon.y = this.tables[x].y + 4;
    this.lock_icon.visible = false;
    _target.addChild(this.lock_icon);

    if(data.banker.password){
		  this.lock_icon.visible = true;
		}

    this.tables[x].useravatar_bg  = new createjs.Shape();
    this.tables[x].useravatar_bg.graphics.beginFill("#f5ac4e").drawCircle( 0, 0, 45 );
    this.tables[x].useravatar_bg.x = 48;
    this.tables[x].useravatar_bg.y = 53 + this.tables[x].y;
    _target.addChild(this.tables[x].useravatar_bg);

    let roomAvatar = data.banker.avatar;

    if(roomAvatar == '' || !roomAvatar) {
      roomAvatar = 'red_queen';
    }

    this.tables[x].userAvatar = new createjs.Bitmap("/img/room-avatar/"+roomAvatar+".png");
		this.tables[x].userAvatar.setBounds(0,0,100,100)
		this.tables[x].userAvatar.regX = this.tables[x].userAvatar.getBounds().width;
		this.tables[x].userAvatar.regY = this.tables[x].userAvatar.getBounds().height;
		this.tables[x].userAvatar.scaleX = this.tables[x].userAvatar.scaleY = 0.93;
		this.tables[x].userAvatar.x = this.tables[x].useravatar_bg.x + 46.5;
		this.tables[x].userAvatar.y = this.tables[x].useravatar_bg.y + 46.5;
		_target.addChild(this.tables[x].userAvatar);

    this.tables[x].tablename_head = this.getText(150, this.tables[x].y + 3, `${slave_level} ${data.data[3]}`, "20px ArvoItalic", text_color, "left", "top" );
    _target.addChild(this.tables[x].tablename_head);

    this.tables[x].table_num = new createjs.Text( `${data.data[7].length > 2 ? data.data[7] : "0" + data.data[7]}`, "20px ArvoBold", text_color );
    this.tables[x].table_num.textAlign = "right";
    this.tables[x].table_num.x = this.tables[x].tablename_head.x - 10;
    this.tables[x].table_num.y = this.tables[x].y + 3;
    _target.addChild(this.tables[x].table_num);

    let button_grad = ["#ffd476","#c69522"];

		if(window.isBanker == true) {
			button_grad = ["#b38f40","#a07f38"]
		}

    if(parseInt(data.banker.users) == parseInt(data.data[6])) {
      button_grad = ["#b38f40","#a07f38"]
    }

    this.join_button = new createjs.Shape();
    this.join_button.graphics.beginLinearGradientFill( button_grad, [0, 1],0 ,0, 0, 40 ).drawRoundRect(0, 0, 110, 50, 8 );
    this.join_button.x = 680;
    this.join_button.y = 32;
    this.join_button.tableId = data.data[1];
    this.join_button.token = data.data[5];
    this.join_button.betRange = data.data[6];
    this.join_button.gameName = data.data[4];
    _target.addChild(this.join_button);

    this.join_text = new createjs.Text(window.language.lobby.join, "18px LatoBlack","#473004");
    this.join_text.textAlign = "center";
    this.join_text.textBaseline = "middle";
    this.join_text.x = this.join_button.x + (110/2);
    this.join_text.y = this.join_button.y + (50/2);
    this.join_text.hitArea = this.join_button;
    this.join_text.shadow = new createjs.Shadow("#feff5f",1,2,2);
    _target.addChild(this.join_text);

    if(window.isBanker == false) {
      this.join_button.addEventListener('click', (e) => {
        if(e.currentTarget.gameName.toLowerCase() === "paigow" || e.currentTarget.gameName.toLowerCase() === "pai-gow") {
          if (window.nonInstall) {
            location.assign(window.paigow_domain+"non/Paigow/"+e.currentTarget.tableId+"/"+e.currentTarget.betRange+"/0?token="+e.currentTarget.token)
          } else {
            location.assign(window.paigow_domain+"m/Paigow/"+e.currentTarget.tableId+"/"+e.currentTarget.betRange+"/0?token="+e.currentTarget.token)
          }
        } else {
          if (window.nonInstall) {
            location.assign(window.sb_domain+"non/Sicbo/"+e.currentTarget.tableId+"/"+e.currentTarget.betRange+"?token="+e.currentTarget.token)
          } else {
            location.assign(window.sb_domain+"m/Sicbo/"+e.currentTarget.tableId+"/"+e.currentTarget.betRange+"?token="+e.currentTarget.token)
          }

        }
      });

    }

    this.request_button = new createjs.Shape();
    this.request_button.graphics.beginLinearGradientFill( button_grad, [0, 1],0 ,0, 0, 40 ).drawRoundRect(0, 0, 110, 50, 8 );
    this.request_button.x = 680;
    this.request_button.y = 32;
    this.request_button.tableId = data.data[1];
		this.request_button.token = data.data[5];
		this.request_button.betRange = data.data[6];
    this.request_button.pass = data.banker.password;
    this.request_button.gameName = data.data[4];
    this.request_button.roomId = data.data[8];
    _target.addChild(this.request_button);

    this.request_text = new createjs.Text(window.language.lobby.request, "18px LatoBlack","#473004");
    this.request_text.textAlign = "center";
    this.request_text.textBaseline = "middle";
    this.request_text.x = this.request_button.x + (110/2);
    this.request_text.y = this.request_button.y + (50/2);
    this.request_text.hitArea = this.request_button;
    this.request_text.shadow = new createjs.Shadow("#feff5f",1,2,2);
    _target.addChild(this.request_text);

    if(!data.banker.password || data.banker.password == "") {
			this.request_text.visible = false;
			this.request_button.visible = false;
		} else {
      this.lock_icon.visible = true;
			this.join_text.visible = false;
			this.join_button.visible = false;
		}

    if(data.banker.users == data.data[6]) {
      button_grad = ["#b38f40","#a07f38"]
      this.request_text.visible = false;
			this.request_button.visible = false;
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
			});
		}

    _target.tables = this.tables[x];
    _target.update()
  }, //makerRoomListTables

}
export default {
    instance
}
