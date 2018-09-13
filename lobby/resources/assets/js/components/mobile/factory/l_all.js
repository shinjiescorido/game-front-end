import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../../../factories/factories';

let instance = null;

export default (self,data) =>{
    instance =  {
        /**
         *	@method create common table assets
         *
         * @return
         */
        makeListTables (target_canvas) {

            if (!data) { return; } //null

            for(var x = 0; x < data.length; x++) {

                if(data[x].gameName =="Sicbo") {
                    data[x].marks = _.filter(data[x].marks, (function (e) {
                        return e.game_info != '{"dice":null}';
                    }));
                }

                // === table background
                let slaveName = '';
                if (data[x].slave) {
                    if (data[x].slave === null || data[x].slave.length === 0) {
                        slaveName = 'normal';
                    }
                    else {
                        slaveName = data[x].slave;
                    }
                }

                self.all_list_table[x] = new createjs.Shape();
                self.all_list_table[x].graphics.beginFill("#d8d4d2").drawRoundRect(350,0,896,283,0);
                self.all_list_table[x].cache(350,0,896,283);
                self.all_list_table[x].game_name = data[x].gameName;
                self.all_list_table[x].table_number = data[x].tableNumber;
                self.all_list_table[x].slave = slaveName;
                target_canvas[x].addChild(self.all_list_table[x])

                // === dealer
                self.all_list_table[x].dealer_bg  = new createjs.Shape();
                self.all_list_table[x].dealer_bg.graphics.beginFill("#333").drawRoundRectComplex(0,0,350,283,10,0,0,10);
                self.all_list_table[x].dealer_bg.y = self.all_list_table[x].y;
                self.all_list_table[x].dealer_bg.cache(0,0,350,283)
                target_canvas[x].addChild(self.all_list_table[x].dealer_bg);


                self.all_list_table[x].dealer_header  = new createjs.Shape();
                self.all_list_table[x].dealer_header.y = self.all_list_table[x].y;

                // === table name
                let gameNameStr = '';

                switch(data[x].gameName) {
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
                }

                let header_bg = ["#980000","#2b0000"];
                let text_color = "#efb052";
                let gameRoomName = gameNameStr;
                let level = '';
                let slave_level;
                let icoLocation = 'super6_table_list';

                if (data[x].slave && data[x].slave == 'supersix') {
                    icoLocation = 'supersix/super6_table_list';
                }
                else if (data[x].slave && data[x].slave == 'bonus') {
                    icoLocation = 'bonus/bonus_table_list';
                }

                if(data[x].roomType == "p") {
                    header_bg = ["#bd0000","#7c0000"];
                    text_color = "#efb052";
                    gameRoomName = gameNameStr + " " + window.language.level.premium;
                    level = window.language.level.premium;
                } else if(data[x].roomType == "v") {
                    header_bg = ["#fedd78","#d5a515"];
                    text_color = "#000";
                    gameRoomName = gameNameStr + " " + window.language.level.vip;
                    level = window.language.level.vip;

                    if (data[x].slave && data[x].slave == 'supersix') {
                        icoLocation = 'supersix/super6_tablevip_list';
                    }
                    else if (data[x].slave && data[x].slave == 'bonus') {
                        icoLocation = 'bonus/bonus_tablevip_list';
                    }
                } else {
                    header_bg = ["#980000","#2b0000"];
                    text_color = "#efb052";
                    gameRoomName = gameNameStr;
                    //level =window.language.level.normal;
                }
                slave_level = level;

                self.all_list_table[x].dealer_header.graphics.beginLinearGradientFill(header_bg, [0,1], 0,0,300,20).drawRoundRectComplex(0,0,350,50,10,0,0,0);
                self.all_list_table[x].dealer_header.cache(0,0,350,50)
                // self.list_view.addChild(self.all_list_table[x].dealer_header);
                target_canvas[x].addChild(self.all_list_table[x].dealer_header);

                self.all_list_table[x].dealer_img_bg  = new createjs.Shape();
                self.all_list_table[x].dealer_img_bg.graphics.beginFill("#f5ac4e").drawCircle(0,0,58);
                self.all_list_table[x].dealer_img_bg.x = 84
                self.all_list_table[x].dealer_img_bg.y = 100 + self.all_list_table[x].y;
                target_canvas[x].addChild(self.all_list_table[x].dealer_img_bg);
                // self.list_view.addChild(self.all_list_table[x].dealer_img_bg);

                if (data[x].gameName == 'Baccarat') {
                    if (data[x].slave == 'supersix' || data[x].slave == 'bonus') {
                        self.all_list_table[x].slaveIcon = new createjs.Bitmap("/img/icons/baccarat/"+icoLocation+'.png');
                        self.all_list_table[x].slaveIcon.x = self.all_list_table[x].x + 45;
                        self.all_list_table[x].slaveIcon.y = self.all_list_table[x].y + 4;
                        target_canvas[x].addChild(self.all_list_table[x].slaveIcon);
                    }

                    for (var i = 0; i < window.bcSetting.length; i++) {
                        if (parseInt(data[x].tableNumber) == window.bcSetting[i].id) {
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

                                self.all_list_table[x].flippy_spriteSheet = new createjs.SpriteSheet(menu_spritesheet_data);
                                self.all_list_table[x].flippyImg = new createjs.Sprite(self.all_list_table[x].flippy_spriteSheet,"first");
                                self.all_list_table[x].flippyImg.scaleX = self.all_list_table[x].flippyImg.scaleY = 0.8;
                                self.all_list_table[x].flippyImg.x = 290;
                                self.all_list_table[x].flippyImg.y = self.all_list_table[x].y + 8;
                                // self.list_view.addChild(self.all_list_table[x].flippyImg);
                                target_canvas[x].addChild(self.all_list_table[x].flippyImg);

                                if (!level) {
                                    level = 'Main';
                                    slave_level = window.language.level.flippy +' '+ window.language.level.normal;
                                }

                                gameRoomName = window.language.level.flippy +' '+ level;
                            }

                            if (data[x].slave && (data[x].slave == 'supersix' || data[x].slave == 'bonus')){
                                gameRoomName = slave_level == '' ? window.language.level.normal : slave_level;
                            }
                        }
                    }
                }
                else if (data[x].gameName == 'Poker') {
                    if (data[x].slave == 'bonusplus') {
                        self.all_list_table[x].pokerBonusIcon = new createjs.Bitmap("/img/icons/poker/pokerbonusplus.png");
                        self.all_list_table[x].pokerBonusIcon.x = self.all_list_table[x].x + 15;
                        self.all_list_table[x].pokerBonusIcon.y = self.all_list_table[x].y + 6;
                        target_canvas[x].addChild(self.all_list_table[x].pokerBonusIcon);
                        // self.list_view.addChild(self.all_list_table[x].pokerBonusIcon);
                        //
                        gameRoomName = window.language.level.bonusplus;
                    }
                }

                self.all_list_table[x].table_name = new createjs.Text(gameRoomName,"bold 20px ArvoItalic",text_color);
                self.all_list_table[x].table_name.x = data[x].gameName == 'Dragon-Tiger' ? 195 : 195;
                self.all_list_table[x].table_name.y = 13 + self.all_list_table[x].y;
                self.all_list_table[x].table_name.textAlign = "center";
                // self.list_view.addChild(self.all_list_table[x].table_name);
                target_canvas[x].addChild(self.all_list_table[x].table_name);

                self.all_list_table[x].table_num = new createjs.Text(data[x].tableNumber.length < 2 ? "0"+data[x].tableNumber : data[x].tableNumber,"21px ArvoBold",text_color);
                self.all_list_table[x].table_num.textAlign = "right";
                self.all_list_table[x].table_num.x = self.all_list_table[x].table_name.x - (self.all_list_table[x].table_name.getBounds().width / 2) - 15;
                self.all_list_table[x].table_num.y = 11 + self.all_list_table[x].y;
                // self.list_view.addChild(self.all_list_table[x].table_num);
                target_canvas[x].addChild(self.all_list_table[x].table_num);

                // Poker bonus plus special condition
                if (data[x].gameName == 'Poker') {
                    self.all_list_table[x].table_name.x += 20;
                    self.all_list_table[x].table_num.x += 20;
                }

                // === round num
                self.all_list_table[x].round_num = new createjs.Text(data[x].currentRound, "18px latobold","#fff");
                // self.list_view.addChild(self.all_list_table[x].round_num);
                target_canvas[x].addChild(self.all_list_table[x].round_num);

                //=== table status
                self.all_list_table[x].status = new createjs.Text("", "18px latoregular","#fff");
                // self.list_view.addChild(self.all_list_table[x].status);
                target_canvas[x].addChild(self.all_list_table[x].status);

                if(window.language.locale == "zh") {
                        self.all_list_table[x].status.font = "23px latoregular";
                }

                //== timer
                self.all_list_table[x].timer = _.clone(self.context.use_timer());
                self.all_list_table[x].timer.scaleX = self.all_list_table[x].timer.scaleY = 1.14;
                self.all_list_table[x].is_timerStart = false;

                // self.list_view.addChild(self.all_list_table[x].timer);
                target_canvas[x].addChild(self.all_list_table[x].timer);

                //dealer image
                // let image = new Image();
                // image.src = data[x].dealerImage;
                self.all_list_table[x].dealer_img = new createjs.Bitmap();
                // self.all_list_table[x].dealer_img.image = image;
                self.all_list_table[x].dealer_img.setBounds(0,0,250,250)
                self.all_list_table[x].dealer_img.regX = self.all_list_table[x].dealer_img.getBounds().width;
                self.all_list_table[x].dealer_img.regY = self.all_list_table[x].dealer_img.getBounds().height;
                self.all_list_table[x].dealer_img.scaleX = self.all_list_table[x].dealer_img.scaleY = 0.95;
                self.all_list_table[x].dealer_img.x = self.all_list_table[x].dealer_img_bg.x;
                self.all_list_table[x].dealer_img.y = self.all_list_table[x].dealer_img_bg.y;
                self.all_list_table[x].dealer_img.mask = self.all_list_table[x].dealer_img_bg;

                self.all_list_table[x].dealer_id = data[x].dealerId;

                for (var i = 0; i < window.dealerImg.length; i++) {
                    if (window.dealerImg[i].id == data[x].dealerId) {
                        let dbImage = new Image();
                        dbImage.src = window.dealerImg[i].dealer_image;
                        self.all_list_table[x].dealer_img.image = dbImage;
                    }
                }

                // For blob dealer image
                // $.post(`/getDealerImg`, {dealerId : data[x].dealerId},  (response) => {
                //     let dbImage = new Image();
                //     dbImage.src = response[0].dealer_image;

                //     dbImage.onload = (e) => {
                //         for (var j = 0; j < self.all_list_table.length; j++) {
                //             if (self.all_list_table[j].dealer_id == response[0].id) {
                //                 self.all_list_table[j].dealer_img.image = dbImage;

                //             }
                //         }
                //     }
                // });

                // self.list_view.addChild(self.all_list_table[x].dealer_img);
                target_canvas[x].addChild(self.all_list_table[x].dealer_img);

                // === dealer name
                self.all_list_table[x].dealer_name = new createjs.Text(data[x].currentDealer, "18px latoregular" , "#fff");
                self.all_list_table[x].dealer_name.textAlign = "center";
                // self.list_view.addChild(self.all_list_table[x].dealer_name);
                target_canvas[x].addChild(self.all_list_table[x].dealer_name);
                // === enter button

                // === bet range
                let posX = 0;
                let bet_range_bg = new createjs.Shape();

                if(data[x].sportBetRanges.length > 3) {
                    posX = -820;
                    bet_range_bg.graphics.beginFill("rgba(0,0,0,0.68)").drawRect(0,0,750,282.6);
                } else {
                    posX = -400;
                    bet_range_bg.graphics.beginFill("rgba(0,0,0,0.68)").drawRect(0,0,(750/2) + 12 ,282.6);
                }

                bet_range_bg.x = 349;
                bet_range_bg.y = self.all_list_table[x].y;

                let bet_range_mask = new createjs.Shape();
                bet_range_mask.graphics.beginFill("red").drawRect(0,0,900,284);
                bet_range_mask.y =  self.all_list_table[x].y
                bet_range_mask.x = 350;

                self.all_list_table[x].bet_range_container = new createjs.Container();
                self.all_list_table[x].bet_range = [];
                self.all_list_table[x].bet_range_text_hyphen = [];
                self.all_list_table[x].bet_range_text_min = [];
                self.all_list_table[x].bet_range_text_max = [];
                self.all_list_table[x].bet_range_container.addChild(bet_range_bg);
                self.all_list_table[x].bet_range_container.mask = bet_range_mask;

                self.all_list_table[x].bet_range_container.x = posX;
                self.all_list_table[x].bet_range_container.posX = posX;

                if(data[x].gameName == "Baccarat" || data[x].gameName == "Dragon-Tiger") {
                    self.all_list_table[x].enter_button_bg = new createjs.Shape();
                    self.all_list_table[x].enter_button_bg.graphics.beginLinearGradientFill(["#b88a19", "#ffd476"],[0,1], 0,38,0,0).drawRoundRect(0,0,150,50,10);
                    self.all_list_table[x].enter_button_bg.y = self.all_list_table[x].y + 220;
                    self.all_list_table[x].enter_button_bg.x = 20;
                    self.all_list_table[x].enter_button_bg.target_betrange = self.all_list_table[x].bet_range_container;
                    self.all_list_table[x].enter_button_bg.trans = self.all_list_table[x];
                    // self.list_view.addChild(self.all_list_table[x].enter_button_bg);
                    target_canvas[x].addChild(self.all_list_table[x].enter_button_bg);

                    self.all_list_table[x].enter_text = new createjs.Text(window.language.menu.singleplayer.toUpperCase() , "bold 18px latobold", "#493105");
                    self.all_list_table[x].enter_text.x = self.all_list_table[x].enter_button_bg.x + (150/2);
                    self.all_list_table[x].enter_text.y = self.all_list_table[x].enter_button_bg.y + (50/2);
                    self.all_list_table[x].enter_text.textAlign = "center";
                    self.all_list_table[x].enter_text.textBaseline = "middle";
                    self.all_list_table[x].enter_text.hitArea = self.all_list_table[x].enter_button_bg;
                    self.all_list_table[x].enter_text.shadow = new createjs.Shadow("#faf65c" , 0,2,4)
                    // self.list_view.addChild(self.all_list_table[x].enter_text);
                    target_canvas[x].addChild(self.all_list_table[x].enter_text);

                    if(window.language.locale == "zh") {
                            self.all_list_table[x].enter_text.font = "bold 25px latobold";
                    }
                } else {

                    self.all_list_table[x].enter_button_bg = new createjs.Shape();
                    self.all_list_table[x].enter_button_bg.graphics.beginLinearGradientFill(["#b88a19", "#ffd476"],[0,1], 0,38,0,0).drawRoundRect(0,0,240,50,10);
                    self.all_list_table[x].enter_button_bg.y = self.all_list_table[x].y + 220;
                    self.all_list_table[x].enter_button_bg.x = 55;
                    self.all_list_table[x].enter_button_bg.target_betrange = self.all_list_table[x].bet_range_container;
                    self.all_list_table[x].enter_button_bg.trans = self.all_list_table[x];
                    // self.list_view.addChild(self.all_list_table[x].enter_button_bg);
                    target_canvas[x].addChild(self.all_list_table[x].enter_button_bg);

                    self.all_list_table[x].enter_text = new createjs.Text(window.language.lobby.entercaps , "bold 26px latobold", "#493105");
                    self.all_list_table[x].enter_text.x = self.all_list_table[x].enter_button_bg.x + (240/2);
                    self.all_list_table[x].enter_text.y = self.all_list_table[x].enter_button_bg.y + (50/2);
                    self.all_list_table[x].enter_text.textAlign = "center";
                    self.all_list_table[x].enter_text.textBaseline = "middle";
                    self.all_list_table[x].enter_text.hitArea = self.all_list_table[x].enter_button_bg;
                    self.all_list_table[x].enter_text.shadow = new createjs.Shadow("#faf65c" , 0,2,4)
                    // self.list_view.addChild(self.all_list_table[x].enter_text);
                    target_canvas[x].addChild(self.all_list_table[x].enter_text);
                }

                // === mutiplayer btn

                if(data[x].gameName == "Baccarat" || data[x].gameName == "Dragon-Tiger") {

                    self.all_list_table[x].multi_button_bg = new createjs.Shape();
                    self.all_list_table[x].multi_button_bg.graphics.beginLinearGradientFill(["#b88a19", "#ffd476"],[0,1], 0,38,0,0).drawRoundRect(0,0,150,50,10);
                    self.all_list_table[x].multi_button_bg.y = self.all_list_table[x].y + 220;
                    self.all_list_table[x].multi_button_bg.x = 20 +150 + 10;
                    self.all_list_table[x].multi_button_bg.target_betrange = self.all_list_table[x].bet_range_container;
                    self.all_list_table[x].multi_button_bg.trans = self.all_list_table[x];
                    // self.list_view.addChild(self.all_list_table[x].multi_button_bg);
                    target_canvas[x].addChild(self.all_list_table[x].multi_button_bg);

                    self.all_list_table[x].multi_text = new createjs.Text(window.language.menu.multiplayer.toUpperCase() , "bold 18px latobold", "#493105");
                    self.all_list_table[x].multi_text.x = self.all_list_table[x].enter_button_bg.x + (150/2) + 150 + 10;
                    self.all_list_table[x].multi_text.y = self.all_list_table[x].enter_button_bg.y + (50/2);
                    self.all_list_table[x].multi_text.textAlign = "center";
                    self.all_list_table[x].multi_text.textBaseline = "middle";
                    self.all_list_table[x].multi_text.hitArea = self.all_list_table[x].enter_button_bg;
                    self.all_list_table[x].multi_text.shadow = new createjs.Shadow("#faf65c" , 0,2,4)
                    // self.list_view.addChild(self.all_list_table[x].multi_text);
                    target_canvas[x].addChild(self.all_list_table[x].multi_text);

                    if(window.language.locale == "zh") {
                            self.all_list_table[x].multi_text.font = "bold 25px latobold";
                    }
                }

                self.is_multiplayer =0;
                self.all_list_table[x].enter_button_bg.is_clicked = false;
                self.all_list_table[x].enter_button_bg.addEventListener("mousedown", (e)=> {
                    e.nativeEvent.preventDefault();
                    if(!e.currentTarget.is_clicked) {
                        self.is_multiplayer =0;


                        self.all_list_table.forEach(function (row) {
                            row.enter_button_bg.target_betrange.x = row.enter_button_bg.target_betrange.posX
                        });

                        createjs.Tween.get(e.currentTarget.target_betrange)
                            .to({
                                x : 0
                            },150)

                        self.all_list_table.forEach(function (row) {
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

                        return;

                    }
                    self.all_list_table.forEach(function (row) {
                        row.enter_button_bg.is_clicked = false;
                        row.enter_button_bg.target_betrange.x = row.enter_button_bg.target_betrange.posX
                        if(row.multiplayer_button_bg) {
                            row.multiplayer_button_bg.is_clicked = false;
                        }
                    });
                    // else {
                    // createjs.Tween.get(e.currentTarget.target_betrange)
                    // .to({
                    // 	x : e.currentTarget.target_betrange.posX
                    // },150)

                    // e.currentTarget.is_clicked = false;
                    // }


                }, false);

                if(data[x].gameName == "Baccarat" || data[x].gameName == "Dragon-Tiger") {

                    self.all_list_table[x].multi_button_bg.is_clicked = false;
                    self.all_list_table[x].multi_button_bg.addEventListener("mousedown", (e)=> {
                        e.nativeEvent.preventDefault();
                        if(!e.currentTarget.is_clicked) {
                            self.is_multiplayer =1;


                            self.all_list_table.forEach(function (row) {
                                row.enter_button_bg.target_betrange.x = row.enter_button_bg.target_betrange.posX
                            });


                            createjs.Tween.get(e.currentTarget.target_betrange)
                                .to({
                                    x : 0
                                },150)

                            self.all_list_table.forEach(function (row) {
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
                            return;
                        }
                        self.all_list_table.forEach(function (row) {
                            row.enter_button_bg.is_clicked = false;
                            row.enter_button_bg.target_betrange.x = row.enter_button_bg.target_betrange.posX
                            if(row.multiplayer_button_bg) {
                                row.multiplayer_button_bg.is_clicked = false;
                            }
                        });
                        // else {
                        // 	createjs.Tween.get(e.currentTarget.target_betrange)
                        // 	.to({
                        // 		x : e.currentTarget.target_betrange.posX
                        // 	},150)

                        // 	e.currentTarget.is_clicked = false;

                        // 	self.all_list_table.forEach(function (row) {
                        // 		row.enter_button_bg.clicked = false;
                        // 		row.target_betrange.x = row.target_betrange.posX
                        // 		if(row.multiplayer_button_bg) {
                        // 			row.multiplayer_button_bg.clicked = false;
                        // 		}
                        // 	});

                        // }
                    }, false);
                }

                let rangeToUse = [];
                let initValueMin = 0;
                let initValueMax = 0;
                let betRangeMin = 0;
                let betRangeMax = 0;
                if (window.userType == 'TS' || window.userType == 'S') {
                    rangeToUse = data[x].sportBetRanges;
                }
                else if (window.userType == 'TC' || window.userType == 'C') {
                    rangeToUse = data[x].casinoBetRanges;
                }

                for(var i = 0; i < rangeToUse.length; i++) {
                    self.all_list_table[x].bet_range[i] = new createjs.Shape();
                    self.all_list_table[x].bet_range[i].graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,35).drawRoundRect(0,0,330,50,26);
                    self.all_list_table[x].bet_range[i].range_index = data[x].tableNumber;
                    self.all_list_table[x].bet_range[i].x = bet_range_bg.x + 30;
                    self.all_list_table[x].bet_range[i].y = (i * 65) + (55 + self.all_list_table[x].y);

                    if(i > 2) {
                        self.all_list_table[x].bet_range[i].x = bet_range_bg.x + 400;
                        self.all_list_table[x].bet_range[i].y = ((i-3) * 65) + (55 + self.all_list_table[x].y);;
                    }

                    self.all_list_table[x].bet_range[i].game = data[x].gameName;
                    self.all_list_table[x].bet_range_container.addChild(self.all_list_table[x].bet_range[i]);

                    let dividend
                    if (window.casino == 'SS') {
                        dividend = 1000;
                    }
                    else {
                        dividend = 1;
                    }

                    let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
                    if (window.mainMultiplier % 10 || data[x].gameName == 'Sicbo') mainMultiplier = 1;
                    betRangeMin = (rangeToUse[i].min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
                    betRangeMax = ((rangeToUse[i].max * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

                    self.all_list_table[x].bet_range_text_hyphen[i] = new createjs.Text(" - ", "22px latobold" ,"#000");
                    self.all_list_table[x].bet_range_text_hyphen[i].x = self.all_list_table[x].bet_range[i].x + (330/2);
                    self.all_list_table[x].bet_range_text_hyphen[i].textAlign = "center";
                    self.all_list_table[x].bet_range_text_min[i] = new createjs.Text(numberWithCommas(betRangeMin), "22px latobold" ,"#000");
                    self.all_list_table[x].bet_range_text_min[i].x = self.all_list_table[x].bet_range_text_hyphen[i].x - 8;
                    self.all_list_table[x].bet_range_text_min[i].textAlign = "right";
                    self.all_list_table[x].bet_range_text_max[i] = new createjs.Text(numberWithCommas(betRangeMax), "22px latobold" ,"#000");
                    self.all_list_table[x].bet_range_text_max[i].x = self.all_list_table[x].bet_range_text_hyphen[i].x + 8;
                    self.all_list_table[x].bet_range_text_max[i].textAlign = "left";
                    self.all_list_table[x].bet_range_text_hyphen[i].textBaseline = self.all_list_table[x].bet_range_text_min[i].textBaseline = self.all_list_table[x].bet_range_text_max[i].textBaseline = "middle";
                    self.all_list_table[x].bet_range_text_hyphen[i].y = self.all_list_table[x].bet_range_text_min[i].y = self.all_list_table[x].bet_range_text_max[i].y = self.all_list_table[x].bet_range[i].y + (50/2);
                    self.all_list_table[x].bet_range_container.addChild(self.all_list_table[x].bet_range_text_hyphen[i], self.all_list_table[x].bet_range_text_min[i], self.all_list_table[x].bet_range_text_max[i]);

                    self.all_list_table[x].bet_range[i].hover = function (e, type) {
                        if(type == "hover") {
                            e.graphics.clear().beginLinearGradientFill(["#c69522", "#ffd476"],[0,1],0,0,0,35).drawRoundRect(0,0,330,50,26);
                        } else {
                            e.graphics.clear().beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,35).drawRoundRect(0,0,330,50,26);
                        }
                    } //end of active

                    if(data[x].gameName == "Sicbo") {
                        if (window.nonInstall) {
                          self.all_list_table[x].bet_range[i].redirect_link = window.sb_domain+"non/Sicbo/"+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
                        } else {
                          self.all_list_table[x].bet_range[i].redirect_link = window.sb_domain+"m/Sicbo/"+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
                        }
                    }
                    if(data[x].gameName == "Baccarat") {
                        if(data[x].slave && (data[x].slave=='supersix' || data[x].slave=='bonus')){
                            self.all_list_table[x].bet_range[i].slave = data[x].slave;
                        }

                        if (window.nonInstall) {
                          self.all_list_table[x].bet_range[i].redirect_link = window.bc_domain+"non/Baccarat/"+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
                        } else {
                          self.all_list_table[x].bet_range[i].redirect_link = window.bc_domain+"m/Baccarat/"+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
                        }
                    }
                    if(data[x].gameName == "Dragon-Tiger") {
                      if (window.nonInstall) {
                        self.all_list_table[x].bet_range[i].redirect_link = window.dt_domain+"non/Dragon-Tiger/"+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
                      } else {
                        self.all_list_table[x].bet_range[i].redirect_link = window.dt_domain+"m/Dragon-Tiger/"+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
                      }
                    }
                    if(data[x].gameName == "Poker") {
                        self.all_list_table[x].bet_range[i].redirect_link = window.poker_domain+"m/Poker/"+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
                        if(data[x].slave && data[x].slave=='bonusplus'){
                            self.all_list_table[x].bet_range[i].slave = data[x].slave;
                            if (window.nonInstall) {
                              self.all_list_table[x].bet_range[i].redirect_link = window.poker_domain+"non/Poker/"+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max
                              + "?slave=bonusplus";
                            } else {
                              self.all_list_table[x].bet_range[i].redirect_link = window.poker_domain+"m/Poker/"+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max
                              + "?slave=bonusplus";
                            }

                        }
                    }

                    self.all_list_table[x].bet_range[i].targ = {data:data[x]};

                    self.all_list_table[x].bet_range[i].on("click", (e) => {
                        e.nativeEvent.preventDefault();
                        e.currentTarget.hover(e.currentTarget,"hover");
                        if(e.currentTarget.game == "Baccarat" || e.currentTarget.game == "Dragon-Tiger") {
                            // setTimeout(() => {
                                if(e.target.slave && (e.target.slave=='supersix' || e.target.slave=='bonus')){
                                    location.assign(e.currentTarget.redirect_link + "/" + self.is_multiplayer + '?slave='+e.target.slave);
                                }
                                else
                                {
                                    location.assign(e.currentTarget.redirect_link + "/" + self.is_multiplayer);
                                }
                            // },500)
                            return;
                        }
                        // setTimeout(() => {
                            location.assign(e.currentTarget.redirect_link);
                        // },500)
                    });
                } //end for
            }
        }
    }

    return instance;
}
