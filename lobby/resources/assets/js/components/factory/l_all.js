import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, setCurrentTimezone } from '../../factories/factories';

let instance = null;

export default (self,data) =>{
	instance =  {
		/**
		 *	@method create common table assets
		 *
		 * @return
		 */
		getText(x,y,text,font,color,align,valign){
			let ctrl = new createjs.Text(text,font,color);
			ctrl.x = x;
			ctrl.y = y;
			ctrl.textAlign = align;
      		ctrl.textBaseline = valign;//"middle"
      		return ctrl;
		},
		makeListTables () {
      		if(!data) return;
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
				self.all_list_table[x].graphics.beginFill("#d8d4d2").drawRoundRect(350,0,1640 - 350 - 272,283,0);
				self.all_list_table[x].y = x * 302.5;
				self.all_list_table[x].game_name = data[x].gameName;
				self.all_list_table[x].table_number = data[x].tableNumber;
				self.all_list_table[x].slave = slaveName;
				self.list_view.addChild(self.all_list_table[x]);

				// === dealer
				self.all_list_table[x].dealer_bg  = new createjs.Shape();
				self.all_list_table[x].dealer_bg.graphics.beginFill("#333").drawRoundRectComplex(0,0,350,283,10,0,0,10);
				self.all_list_table[x].dealer_bg.y = self.all_list_table[x].y;
				self.list_view.addChild(self.all_list_table[x].dealer_bg);

				self.all_list_table[x].dealer_header  = new createjs.Shape();
				self.all_list_table[x].dealer_header.y = self.all_list_table[x].y;

				let header_bg = ["#980000","#2b0000"];
				let text_color = "#efb052";
				let level ='';
				let slave_level = '';
				let icoLocation = '';

				if (data[x].slave && data[x].slave == 'supersix') {
					icoLocation = 'supersix/super6_table_list';
				}
				else if (data[x].slave && data[x].slave == 'bonus') {
					icoLocation = 'bonus/bonus_table_list';
				}

				if(data[x].roomType == "p") {
					header_bg = ["#bd0000","#7c0000"];
					text_color = "#efb052";
					level = window.language.level.premium;
				} else if(data[x].roomType == "v") {
					header_bg = ["#fedd78","#d5a515"];
					text_color = "#000";
					level = window.language.level.vip;

					if (data[x].slave && data[x].slave == 'supersix') {
						icoLocation = 'supersix/super6_tablevip_list';
					}
					else if (data[x].slave && data[x].slave == 'bonus') {
						icoLocation = 'bonus/bonus_tablevip_list';
					}
				}
				slave_level = level;

				self.all_list_table[x].dealer_header.graphics.beginLinearGradientFill(header_bg, [0,1], 0,0,300,20).drawRoundRectComplex(0,0,350,50,10,0,0,0);
				self.list_view.addChild(self.all_list_table[x].dealer_header);

				self.all_list_table[x].dealer_img_bg  = new createjs.Shape();
				self.all_list_table[x].dealer_img_bg.graphics.beginFill("#f5ac4e").drawCircle(0,0,62);
				self.all_list_table[x].dealer_img_bg.x = 84;
				self.all_list_table[x].dealer_img_bg.y = 100 + self.all_list_table[x].y;
				self.list_view.addChild(self.all_list_table[x].dealer_img_bg);

				// === table name
				let gameNameStr = '';

				switch(data[x].gameName) {
				case "Baccarat" :
					if (data[x].slave == 'supersix' || data[x].slave == 'bonus') {
						self.all_list_table[x].slaveIcon = new createjs.Bitmap("/img/icons/baccarat/"+icoLocation+'.png');
						self.all_list_table[x].slaveIcon.x = self.all_list_table[x].x + 50;
						self.all_list_table[x].slaveIcon.y = self.all_list_table[x].y + 4;
						self.list_view.addChild(self.all_list_table[x].slaveIcon);
					}

					gameNameStr = window.language.lobby.baccarat+' '+level;

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
								self.all_list_table[x].flippyImg.x = (self.all_list_table[x].x + 400 / 2) + 90;
								self.all_list_table[x].flippyImg.y = self.all_list_table[x].y + 7;
								self.list_view.addChild(self.all_list_table[x].flippyImg);

								if (!level) {
									level = window.language.level.normal;
                                    slave_level = window.language.level.flippy +' '+ window.language.level.normal;
								}

								gameNameStr = window.language.level.flippy +' '+ level;
							}
							if (data[x].slave && (data[x].slave == 'supersix' || data[x].slave == 'bonus')){
                                gameNameStr = slave_level == '' ? window.language.level.normal : slave_level;
							}
						}
					}

					break;

				case "Dragon-Tiger" :
					gameNameStr = window.language.lobby.dragontiger+' '+level;
					break;

				case "Poker" :
					if (data[x].slave == 'bonusplus') {
						self.all_list_table[x].pokerBonusIcon = new createjs.Bitmap("/img/icons/poker/pokerbonusplus.png");
						self.all_list_table[x].pokerBonusIcon.x = self.all_list_table[x].x + 15;
						self.all_list_table[x].pokerBonusIcon.y = self.all_list_table[x].y + 6;
						self.list_view.addChild(self.all_list_table[x].pokerBonusIcon);
					}

					gameNameStr = window.language.lobby.texas+' '+level;
						if (data[x].slave && data[x].slave=='bonusplus') {
							gameNameStr = window.language.level.bonusplus;
						}
					break;

				case "Sicbo" :
					gameNameStr = window.language.lobby.sicbo+' '+level;
					break;
				}
				self.all_list_table[x].table_name =  this.getText(195 ,self.all_list_table[x].y+15,gameNameStr,"22px ArvoItalic",text_color,"center","top");
				self.list_view.addChild(self.all_list_table[x].table_name);

				self.all_list_table[x].table_num =  new createjs.Text(data[x].tableNumber.length < 2 ? "0"+data[x].tableNumber : data[x].tableNumber,"24px latoblack",text_color);
        		self.all_list_table[x].table_num.textAlign = "right";
				self.all_list_table[x].table_num.x = self.all_list_table[x].table_name.x - (self.all_list_table[x].table_name.getBounds().width / 2) - 10;
				self.all_list_table[x].table_num.y = 13 + self.all_list_table[x].y;
				self.list_view.addChild(self.all_list_table[x].table_num);

				// Poker bonus plus special condition
                if (data[x].gameName == 'Poker') {
                    self.all_list_table[x].table_name.x += 25;
                    self.all_list_table[x].table_num.x += 25;
                }

				// === round num
				self.all_list_table[x].round_num = new createjs.Text(data[x].currentRound, "20px latoregular","#fff");
				self.list_view.addChild(self.all_list_table[x].round_num);

				//=== table status
				let status = "";
				if(data[x].roundStatus == "P") {
					if(data[x].gameName != "Sicbo") {
						status = window.language.lobby.dealing
					} else {
						status = window.language.lobby.result
					}
				}
				if(data[x].roundStatus == "S") {
					status = window.language.lobby.nowbetting;
				}

				if(data[x].roundStatus == "E") {
					status = window.language.lobby.bettingend;
					if(!data[x].marks.length) {
						status = window.language.prompts.promptshuffling;
					}
				}
				
				if(data[x].roundStatus == "R") {
					status = window.language.lobby.result;
				}

				if(data[x].is_shoeChange) {
					if(!data[x].marks.length) {
						status = window.language.prompts.promptshuffling;	
					}
				}

				self.all_list_table[x].status = new createjs.Text(status, "20px latoregular","#fff");
				self.list_view.addChild(self.all_list_table[x].status);

				if(window.language.locale == "zh") {
						self.all_list_table[x].status.font = "25px latoregular";
				}

				//== timer
				self.all_list_table[x].timer = _.clone(self.context.use_timer());
				self.all_list_table[x].timer.scaleX = self.all_list_table[x].timer.scaleY = 1.2;
				self.all_list_table[x].is_timerStart = false;

				self.list_view.addChild(self.all_list_table[x].timer);

				//dealer image
				// let image = new Image();
				// image.src = data[x].dealerImage;
				// var image = document.createElement("img");
				// image.crossOrigin = "Anonymous";
				// image.src = data[x].dealerImage;

				self.all_list_table[x].dealer_img = new createjs.Bitmap();
				// self.all_list_table[x].dealer_img.image = image;
				self.all_list_table[x].dealer_img.setBounds(0,0,250,250)
				self.all_list_table[x].dealer_img.regX = self.all_list_table[x].dealer_img.getBounds().width;
				self.all_list_table[x].dealer_img.regY = self.all_list_table[x].dealer_img.getBounds().height;
				self.all_list_table[x].dealer_img.scaleX = self.all_list_table[x].dealer_img.scaleY = 1;
				self.all_list_table[x].dealer_img.x = self.all_list_table[x].dealer_img_bg.x;
				self.all_list_table[x].dealer_img.y = self.all_list_table[x].dealer_img_bg.y;
				self.list_view.addChild(self.all_list_table[x].dealer_img);

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
				// 	for (var j = 0; j < self.all_list_table.length; j++) {
				// 		if (self.all_list_table[j].dealer_id == response[0].id) {
				// 			let dbImage = new Image();
				// 			dbImage.src = response[0].dealer_image;

				// 			self.all_list_table[j].dealer_img.image = dbImage;
				// 		}
				// 	}
    //             });

				// === dealer name
				self.all_list_table[x].dealer_name = new createjs.Text(data[x].currentDealer, "20px latoregular" , "#fff");
				self.all_list_table[x].dealer_name.textAlign = "center";
				self.list_view.addChild(self.all_list_table[x].dealer_name);

				// === bet range
				let bet_range_bg = new createjs.Shape();
				bet_range_bg.graphics.beginFill("#333").drawRoundRectComplex(0,0,272,283,0,10,10,0);
				bet_range_bg.x = 1368;
				bet_range_bg.y = self.all_list_table[x].y;
				self.list_view.addChild(bet_range_bg);

				self.all_list_table[x].bet_range = [];
				self.all_list_table[x].bet_range_text_hyphen = [];
      			self.all_list_table[x].bet_range_text_min = [];
        		self.all_list_table[x].bet_range_text_max = [];

				let rangeToUse = [];
				if (window.userType == 'TS' || window.userType == 'S') {
					rangeToUse = data[x].sportBetRanges;
				}
				else if (window.userType == 'TC' || window.userType == 'C') {
					rangeToUse = data[x].casinoBetRanges;
				}

				if(data[x].gameName == "Baccarat" || data[x].gameName == "Dragon-Tiger") {
					self.all_list_table[x].bet_range_container = new createjs.Container();

					let range_bg = new createjs.Shape();
					range_bg.graphics.beginFill("rgba(0,0,0,0.6)").drawRect(self.all_list_table[x].x,self.all_list_table[x].y,283,283);

					self.all_list_table[x].bet_range_container.x = 1375
					self.all_list_table[x].bet_range_container.addChild(range_bg)

					let mask = new createjs.Shape();
					mask.graphics.beginFill("red").drawRect(1085,self.all_list_table[x].y, 283, 283);
					// self.list_view.addChild(mask);
					self.all_list_table[x].bet_range_container.mask = mask;
				}

				self.is_list_multiplayer = 0;

				for(var i = 0; i < rangeToUse.length; i++) {
					self.all_list_table[x].bet_range[i] = new createjs.Shape();
					self.all_list_table[x].bet_range[i].graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
					self.all_list_table[x].bet_range[i].x = 1404;
					self.all_list_table[x].bet_range[i].y = (i *40) + (26 + self.all_list_table[x].y);
					self.all_list_table[x].bet_range[i].game = data[x].gameName;
					self.all_list_table[x].bet_range[i].range_index = x;
					// self.list_view.addChild(self.all_list_table[x].bet_range[i]);

					if(data[x].gameName == "Baccarat" || data[x].gameName == "Dragon-Tiger") {
						self.all_list_table[x].bet_range[i].x = 38;
					}

					let dividend
					if (window.casino == 'SS') {
						dividend = 1000;
					}
					else {
						dividend = 1;
					}

					let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
					if (window.mainMultiplier % 10 || data[x].gameName == 'Sicbo') mainMultiplier = 1;
					let betRangeMin = (rangeToUse[i].min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					let betRangeMax = ((rangeToUse[i].max * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

					// self.all_list_table[x].bet_range_text[i] = new createjs.Text(numberWithCommas(rangeToUse[i].min) + " - " + numberWithCommas(rangeToUse[i].max), "17px latobold" ,"#000");
					self.all_list_table[x].bet_range_text_hyphen[i] = new createjs.Text(" - ", "17px latobold" ,"#000");
					self.all_list_table[x].bet_range_text_hyphen[i].x = self.all_list_table[x].bet_range[i].x + (202/2);
					self.all_list_table[x].bet_range_text_hyphen[i].textAlign = "center";
					self.all_list_table[x].bet_range_text_min[i] = new createjs.Text(numberWithCommas(betRangeMin), "17px latobold" ,"#000");
					self.all_list_table[x].bet_range_text_min[i].x = self.all_list_table[x].bet_range_text_hyphen[i].x - 8;
					self.all_list_table[x].bet_range_text_min[i].textAlign = "right";
					self.all_list_table[x].bet_range_text_max[i] = new createjs.Text(numberWithCommas(betRangeMax), "17px latobold" ,"#000");
					self.all_list_table[x].bet_range_text_max[i].x = self.all_list_table[x].bet_range_text_hyphen[i].x + 8;
					self.all_list_table[x].bet_range_text_max[i].textAlign = "left";
					self.all_list_table[x].bet_range_text_hyphen[i].y = self.all_list_table[x].bet_range_text_min[i].y = self.all_list_table[x].bet_range_text_max[i].y = self.all_list_table[x].bet_range[i].y + 4;
					if(data[x].gameName == "Baccarat" || data[x].gameName == "Dragon-Tiger") {
						self.all_list_table[x].bet_range_container.addChild(self.all_list_table[x].bet_range[i])
						self.all_list_table[x].bet_range_container.addChild(self.all_list_table[x].bet_range_text_hyphen[i], self.all_list_table[x].bet_range_text_min[i], self.all_list_table[x].bet_range_text_max[i]);

						self.all_list_table[x].multiplayer_button = new createjs.Shape();
						self.all_list_table[x].multiplayer_button.graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
						self.all_list_table[x].multiplayer_button.x = 1404;
						self.all_list_table[x].multiplayer_button.y = 26 + self.all_list_table[x].y + 40;
						self.all_list_table[x].multiplayer_button.range_container = self.all_list_table[x].bet_range_container;
						self.list_view.addChild(self.all_list_table[x].multiplayer_button);

						self.all_list_table[x].multiplayer_button.on("click", (e) => {
							self.is_list_multiplayer = 1;
							self.all_list_table.forEach((targ)=>{
								if(targ.game_name =="Baccarat" || targ.game_name =="Dragon-Tiger") {
									targ.bet_range_container.x = 1404
								}
							})

							setTimeout(() => {
								createjs.Tween.get(e.currentTarget.range_container)
								.to({
									x: 1085
								}, 100)
								// e.currentTarget.range_container.x = 1085
							}, 100)
						});

						self.all_list_table[x].multiplayer_button.on("mouseover", (e) => {
							if(parseInt(e.currentTarget.is_maintenance)) return;
							$(".container").css('cursor','pointer');
							e.currentTarget.graphics.clear().beginLinearGradientFill(["#c69522", "#ffd476"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
						});

						self.all_list_table[x].multiplayer_button.on("mouseout", (e) => {
							e.target.is_hover = true;
							$(".container").css('cursor','default');
							e.currentTarget.graphics.clear().beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
						});

						self.all_list_table[x].multiplayer_text = new createjs.Text(window.language.menu.multiplayer.toUpperCase(), "14px latobold","#000");
						self.all_list_table[x].multiplayer_text.textAlign = "center";
						self.all_list_table[x].multiplayer_text.textBaseline = "middle";
						self.all_list_table[x].multiplayer_text.x = self.all_list_table[x].multiplayer_button.x + (202/2)
						self.all_list_table[x].multiplayer_text.y = self.all_list_table[x].multiplayer_button.y + (30/2)
						self.all_list_table[x].multiplayer_text.hitArea = self.all_list_table[x].multiplayer_button
						self.list_view.addChild(self.all_list_table[x].multiplayer_text);

						if(window.language.locale == "zh") {
								self.all_list_table[x].multiplayer_text.font = "19px latobold";
						}

						self.all_list_table[x].singleplayer_button = new createjs.Shape();
						self.all_list_table[x].singleplayer_button.graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
						self.all_list_table[x].singleplayer_button.x = 1404;
						self.all_list_table[x].singleplayer_button.y = 26 + self.all_list_table[x].y + 0;
						self.all_list_table[x].singleplayer_button.range_container = self.all_list_table[x].bet_range_container;
						self.list_view.addChild(self.all_list_table[x].singleplayer_button);

						self.all_list_table[x].singleplayer_button.on("click", (e) => {
							self.is_list_multiplayer = 0;
							self.all_list_table.forEach((targ)=>{
								if(targ.game_name =="Baccarat" || targ.game_name =="Dragon-Tiger") {
									targ.bet_range_container.x = 1404
								}
							})

							setTimeout(() => {
								createjs.Tween.get(e.currentTarget.range_container)
								.to({
									x: 1085
								}, 100)
								// e.currentTarget.range_container.x = 1085
							}, 100)
						});

						self.all_list_table[x].singleplayer_button.data = data[x];
						self.all_list_table[x].singleplayer_button.on("mouseover", (e) => {
							if(parseInt(e.currentTarget.is_maintenance)) return;
							$(".container").css('cursor','pointer');
							e.currentTarget.graphics.clear().beginLinearGradientFill(["#c69522", "#ffd476"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
						});

						self.all_list_table[x].singleplayer_button.on("mouseout", (e) => {
							e.target.is_hover = true;
							$(".container").css('cursor','default');
							e.currentTarget.graphics.clear().beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
						});

						self.all_list_table[x].singleplayer_text = new createjs.Text(window.language.menu.singleplayer.toUpperCase(), "14px latobold","#000");
						self.all_list_table[x].singleplayer_text.textAlign = "center";
						self.all_list_table[x].singleplayer_text.textBaseline = "middle";
						self.all_list_table[x].singleplayer_text.x = self.all_list_table[x].singleplayer_button.x + (202/2)
						self.all_list_table[x].singleplayer_text.y = self.all_list_table[x].singleplayer_button.y + (30/2)
						self.all_list_table[x].singleplayer_text.hitArea = self.all_list_table[x].singleplayer_button
						self.list_view.addChild(self.all_list_table[x].singleplayer_text);

						if(window.language.locale == "zh") {
								self.all_list_table[x].singleplayer_text.font = "19px latobold";
						}

					} else {
						self.list_view.addChild(self.all_list_table[x].bet_range[i]);
						self.list_view.addChild(self.all_list_table[x].bet_range_text_hyphen[i], self.all_list_table[x].bet_range_text_min[i], self.all_list_table[x].bet_range_text_max[i]);
					}


					if(data[x].gameName == "Sicbo") {
						self.all_list_table[x].bet_range[i].redirect_link = window.sb_domain+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
					}
					if(data[x].gameName == "Baccarat") {
						if(data[x].slave && (data[x].slave=='supersix' || data[x].slave=='bonus')){
							self.all_list_table[x].bet_range[i].slave = data[x].slave;
						}
						self.all_list_table[x].bet_range[i].redirect_link = window.bc_domain+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max; //+ "/"+0;
					}
					if(data[x].gameName == "Dragon-Tiger") {
						self.all_list_table[x].bet_range[i].redirect_link = window.dt_domain+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;//+ "/"+0;
					}
					if(data[x].gameName == "Poker") {
							if(data[x].slave && data[x].slave=='bonusplus'){
								self.all_list_table[x].bet_range[i].redirect_link = window.poker_domain+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max + '?slave=bonusplus';
							}else{
								self.all_list_table[x].bet_range[i].redirect_link = window.poker_domain+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
							}
					}

					self.all_list_table[x].bet_range[i].hover =  function (e, type) {
						if(type == "hover") {
							e.graphics.clear().beginLinearGradientFill(["#c69522", "#ffd476"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
						} else {
							e.graphics.clear().beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
						}
					} //end of active
					self.all_list_table[x].bet_range[i].targ = {data:data[x]};
					self.all_list_table[x].bet_range[i].on("click", (e) => {
						// Temp
						// for (var j = 0; j < e.currentTarget.targ.data.maintenanceSetting.maintenance.length; j++) {
						// 	if (parseInt(e.currentTarget.targ.data.maintenanceSetting.maintenance[j]) === 1) {
						// 		return;
						// 	}
						// }

						if(e.target.text) {
							
							e.target = e.target.hitArea
						}
						if(e.target.button) {
							$(".container").css('cursor','pointer');
						}
						if(e.target.game == "Baccarat" || e.target.game == "Dragon-Tiger") {
							if(e.target.slave && (e.target.slave=='supersix' || e.target.slave=='bonus')){
								window.location.href = e.target.redirect_link + "/"+self.is_multiplayer + '?slave='+e.target.slave;
							} else {
								window.location.href = e.target.redirect_link + "/"+self.is_list_multiplayer;
							}
							return
						}

						window.location.href = e.target.redirect_link
					});

					self.all_list_table[x].bet_range[i].on("mouseover", (e) => {
						// Temp
						// for (var j = 0; j < e.currentTarget.targ.data.maintenanceSetting.maintenance.length; j++) {
						// 	if (parseInt(e.currentTarget.targ.data.maintenanceSetting.maintenance[j]) === 1) {
						// 		return;
						// 	}
						// }

						$(".container").css('cursor','pointer');
						e.target.hover(e.target,"hover");
					});

					self.all_list_table[x].bet_range[i].on("mouseout", (e) => {
						e.target.is_hover = true;
						$(".container").css('cursor','default');
						e.target.hover(e.target,"");
					});
				} //end for

				// // === maintenance
				// //
				// self.all_list_table[x].maintenance_container = new createjs.Container();
				// self.all_list_table[x].maintenance_container.x = self.all_list_table[x].x;
				// self.all_list_table[x].maintenance_container.y = self.all_list_table[x].y;
				// self.all_list_table[x].maintenance_container.visible = false

				// let maintenance_black = new createjs.Shape();
				// maintenance_black.graphics.beginFill("rgba(0,0,0,0.8)").drawRoundRect(0,0,1640,283,10);
				// self.all_list_table[x].maintenance_container.addChild(maintenance_black)

				// let maintenance_text = new createjs.Text("UNDER MAINTENANCE","70px latobold", "#fff");
				// maintenance_text.x = 1640/2;
				// maintenance_text.y = 283/2;
				// maintenance_text.textAlign = "center";
				// maintenance_text.textBaseline = "middle";
				// self.all_list_table[x].maintenance_container.addChild(maintenance_text)

				// self.list_view.addChild(self.all_list_table[x].maintenance_black);

				// self.all_list_table[x].maintenance = (e, maintenance) => {
				// 	if(maintenance) {
				// 		e.maintenance_container.visible = true;
				// 		// self.list_view.setChildIndex(e.maintenance_container, e.maintenance_container.parent.children.length-1)
				// 	} else {
				// 		e.maintenance_container.visible = false;
				// 		// self.list_view.setChildIndex(e.maintenance_container, e.maintenance_container.parent.children.length-1)
				// 	}
				// } // end maintenance


				// for(var e = 0; e < data[x].maintenanceSetting.length; e++ ) {
				// 	if(data[x].maintenanceSetting[e].status) {
				// 		self.all_list_table[x].maintenance(self.all_list_table[x],data[x].maintenanceSetting[e].status)
				// 	}

				// } // end for loop
				//

			}
		},
		makeThumbnailTables() {
			let index_count = 0;
			let header_bg = [];
			let text_color = "";

      		if(!data) return;

			for(var x = 0; x < data.length; x++) {
                let slaveName = '';
                if (data[x].slave) {
                    if (data[x].slave === null || data[x].slave.length === 0) {
                        slaveName = 'normal';
                    }
                    else {
                        slaveName = data[x].slave;
                    }
                }
				
				self.all_thumbnial_table[x] = new createjs.Shape();
				self.all_thumbnial_table[x].graphics.beginFill("#fff").drawRoundRectComplex(0,36,400,96+84,0,0,0,0);
				self.all_thumbnial_table[x].setBounds(0,0,400,216);
				self.all_thumbnial_table[x].x = x*(self.all_thumbnial_table[x].getBounds().width + 13)
				// self.thumbnail_view.addChild(self.all_thumbnial_table[x]);

				self.all_thumbnial_table[x].game_name = data[x].gameName;
				self.all_thumbnial_table[x].table_number = data[x].tableNumber;
				self.all_thumbnial_table[x].slave = slaveName;

				if(x %4 == 0 && x!=0) {
					index_count++;
				} // end if

				self.all_thumbnial_table[x].y = index_count *232;
				self.all_thumbnial_table[x].x -= (index_count *1652);

				// for(var i = 0; i < 25; i++) {
				// 	for(var e = 0; e < 7; e++) {
				// 		let rmbg = new createjs.Shape();
				// 		rmbg.graphics.beginFill("#fff").ss(1).s("rgba(0,0,0,0.5)").drawRect(0,0,16,15.5);
				// 		rmbg.x = self.all_thumbnial_table[x].x + (16*i)
				// 		rmbg.y = (self.all_thumbnial_table[x].y + 107) + (15.5*e)
				// 		self.thumbnail_view.addChild(rmbg);
				// 	}
				// }

				// **** end roadmap **** //
				let roadmap_bg = new createjs.Shape();
				roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,400,108.5);
				roadmap_bg.y = (self.all_thumbnial_table[x].y + 107);
				roadmap_bg.x = self.all_thumbnial_table[x].x;
				self.thumbnail_view.addChild(roadmap_bg);

				let lines = new createjs.Shape();
				lines.graphics.ss(.8).s("rgba(0,0,0,0.8)").moveTo(0,29)
				self.thumbnail_view.addChild(lines);
				let posY =  roadmap_bg.y;
				let posX =  roadmap_bg.x

				for(var i = 0; i <= 7 ; i++) {
					lines.graphics.moveTo(posX,posY+ (15.5*i)).lineTo(posX + 400, posY+ (15.5*i))
				}

				lines.graphics.moveTo(posX,posY)
				for(var i = 0; i <= 25 ; i++) {
					lines.graphics.moveTo(posX+(16*i),posY).lineTo(posX+(16*i),posY + 108.5)
				}

				lines.shadow = new createjs.Shadow("#000",2,2,4);
				lines.alpha =.5;

				// **** end roadmap **** //
				self.all_thumbnial_table[x].header = new createjs.Shape();
				self.all_thumbnial_table[x].header.x = self.all_thumbnial_table[x].x;
				self.all_thumbnial_table[x].header.y = self.all_thumbnial_table[x].y;

				let level = '';
				let slave_level = '';
				let icoLocation = '';

				if (data[x].slave && data[x].slave == 'supersix') {
					icoLocation = 'supersix/super6_table_grid';
				}
				else if (data[x].slave && data[x].slave == 'bonus') {
					icoLocation = 'bonus/bonus_table_grid';
				}

				if(data[x].roomType == "p") {
					header_bg = ["#bd0000","#7c0000"];
					text_color = "#efb052";
					level = window.language.level.premium;
				} else if(data[x].roomType == "v") {
					header_bg = ["#ffd67a","#ae8110"];
					text_color = "#000";
					level = window.language.level.vip;

					if (data[x].slave && data[x].slave == 'supersix') {
						icoLocation = 'supersix/super6_tablevip_grid';
					}
					else if (data[x].slave && data[x].slave == 'bonus') {
						icoLocation = 'bonus/bonus_tablevip_grid';
					}
				} else {
					header_bg = ["#980000","#2b0000"];
					text_color = "#efb052";
				}

				slave_level = level;

				self.all_thumbnial_table[x].header.graphics.beginLinearGradientFill(header_bg,[0,1],0,0,400,10)
				.drawRoundRectComplex(0,0,400,(self.all_thumbnial_table[x].getBounds().height-176),10,10,0,0);
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].header);

				self.all_thumbnial_table[x].header_2 = new createjs.Shape();
				self.all_thumbnial_table[x].header_2.x = self.all_thumbnial_table[x].x;
				self.all_thumbnial_table[x].header_2.y = self.all_thumbnial_table[x].y + 38;
				self.all_thumbnial_table[x].header_2.graphics.beginFill("#333").drawRect(0,0,self.all_thumbnial_table[x].getBounds().width, 84);
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].header_2);

				let thumbTblText = '';

				switch(data[x].gameName) {
					case "Baccarat" :
						if (data[x].slave == 'supersix' || data[x].slave == 'bonus') {
							self.all_thumbnial_table[x].slaveIcon = new createjs.Bitmap("/img/icons/baccarat/"+icoLocation+'.png');
							self.all_thumbnial_table[x].slaveIcon.x = self.all_thumbnial_table[x].x + 125;
							self.all_thumbnial_table[x].slaveIcon.y = self.all_thumbnial_table[x].y + 2;
							self.thumbnail_view.addChild(self.all_thumbnial_table[x].slaveIcon);
						}

						thumbTblText = window.language.lobby.baccarat+' '+level;

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

									self.all_thumbnial_table[x].flippy_spriteSheet = new createjs.SpriteSheet(menu_spritesheet_data);
									self.all_thumbnial_table[x].flippyImg = new createjs.Sprite(self.all_thumbnial_table[x].flippy_spriteSheet,"first");
									self.all_thumbnial_table[x].flippyImg.scaleX = self.all_thumbnial_table[x].flippyImg.scaleY = 0.8;
									self.all_thumbnial_table[x].flippyImg.x = (self.all_thumbnial_table[x].x + 400 / 2) + 98;
									self.all_thumbnial_table[x].flippyImg.y = self.all_thumbnial_table[x].y + 2;
									self.thumbnail_view.addChild(self.all_thumbnial_table[x].flippyImg);

									if (!level) {
										level = window.language.level.normal;
										slave_level = window.language.level.flippy +' '+ window.language.level.normal;
									}
									
									thumbTblText = window.language.level.flippy +' '+ level;
								}

								
								if (data[x].slave && (data[x].slave == 'supersix' || data[x].slave == 'bonus')){
									thumbTblText = slave_level == '' ? window.language.level.normal : slave_level;
								}
							}
						}

						break;
					case "Poker" :
						thumbTblText = window.language.lobby.texas+' '+level;
							if( data[x].slave && data[x].slave=='bonusplus' ){
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
				// === game name
				self.all_thumbnial_table[x].table_num = new createjs.Text(parseInt(data[x].tableNumber) > 9 ? data[x].tableNumber : "0" + data[x].tableNumber , "18px latobold",text_color);
				self.all_thumbnial_table[x].table_text = new createjs.Text(thumbTblText, "17px ArvoItalic",text_color);
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].table_text);
				self.all_thumbnial_table[x].table_text.textAlign = "center";
				// if(window.language.locale == "kr" &&( data[x].gameName =="Baccarat" || data[x].gameName == "Sicbo")) {
				// 	self.all_thumbnial_table[x].table_num.x = self.all_thumbnial_table[x].x + 80;
				// let height_result = self.all_thumbnial_table[x].table_num.getMeasuredWidth();
				// }
				self.all_thumbnial_table[x].table_num.y = self.all_thumbnial_table[x].y + 7;
				self.all_thumbnial_table[x].table_num.textAlign = "right";
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].table_num);

				self.all_thumbnial_table[x].table_text.x = (self.all_thumbnial_table[x].x + 400 / 2) + self.all_thumbnial_table[x].table_num.getMetrics().width;
				self.all_thumbnial_table[x].table_text.y = self.all_thumbnial_table[x].y + 9;

				self.all_thumbnial_table[x].table_num.x = (self.all_thumbnial_table[x].x + 400 / 2) - (self.all_thumbnial_table[x].table_text.getMetrics().width / 2) + 10;

				// if(window.language.locale == "kr") {
				// 	self.all_thumbnial_table[x].table_text.y = self.all_thumbnial_table[x].y + 10;
				// 	self.all_thumbnial_table[x].table_text.font = "bold 18px ArvoItalic"
				// 	if(data[x].gameName =="Baccarat" || data[x].gameName == "Sicbo") {
				// 		self.all_thumbnial_table[x].table_text.x = self.all_thumbnial_table[x].x + 162 + 30;
				// 	}
				// }

				// Special condition for super6 & bonus
				if (data[x].slave == 'supersix' || data[x].slave == 'bonus') {
					self.all_thumbnial_table[x].table_num.x += 20;
					self.all_thumbnial_table[x].table_text.x += 20;

					if (window.language.locale == 'zh') {
						self.all_thumbnial_table[x].table_num.x -= 18;
						self.all_thumbnial_table[x].table_text.x -= 0;
					}
				}

				if(window.language.locale == "zh") {
					self.all_thumbnial_table[x].table_text.font = "bold 20px ArvoItalic";
					self.all_thumbnial_table[x].table_text.y = self.all_thumbnial_table[x].y + 6;
					self.all_thumbnial_table[x].table_text.x = (self.all_thumbnial_table[x].x + 400 / 2) + self.all_thumbnial_table[x].table_num.getMetrics().width + 3;

					if(thumbTblText == "Flippy Main") {
							self.all_thumbnial_table[x].table_text.font = "bold 17px ArvoItalic";
							self.all_thumbnial_table[x].table_text.y = self.all_thumbnial_table[x].y + 9;
							self.all_thumbnial_table[x].table_text.x = (self.all_thumbnial_table[x].x + 400 / 2) + self.all_thumbnial_table[x].table_num.getMetrics().width;
					}

					// self.all_thumbnial_table[x].table_num.x = (self.all_thumbnial_table[x].x + 400 / 2) - (self.all_thumbnial_table[x].table_text.getMetrics().width / 2) + 20;
					// self.all_thumbnial_table[x].table_text.x += 	10;
				}
				// === dealer circle background
				self.all_thumbnial_table[x].dealer_bg = new createjs.Shape();
				self.all_thumbnial_table[x].dealer_bg.graphics.beginFill("#f4ac4d").drawCircle(0,0,45);
				self.all_thumbnial_table[x].dealer_bg.x = self.all_thumbnial_table[x].x + 62.5;
				self.all_thumbnial_table[x].dealer_bg.y = self.all_thumbnial_table[x].y + 63 - .7;
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].dealer_bg);

				//== timer
				self.all_thumbnial_table[x].timer = _.clone(self.context.use_timer());
				self.all_thumbnial_table[x].timer.scaleX = self.all_thumbnial_table[x].timer.scaleY = 0.88;
				self.all_thumbnial_table[x].timer.x = self.all_thumbnial_table[x].x - 12;
				self.all_thumbnial_table[x].timer.y = self.all_thumbnial_table[x].y - 12.5;
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].timer);

				// let image = new Image();
				// image.crossOrigin = "Anonymous";
				// image.src = data[x].dealerImage;

				// === dealer image
				// self.all_thumbnial_table[x].dealer_image = new createjs.Bitmap(self.context.getResources("dealer_temp"));
				self.all_thumbnial_table[x].dealer_image = new createjs.Bitmap();
				self.all_thumbnial_table[x].dealer_image.x = self.all_thumbnial_table[x].x + 18;
				self.all_thumbnial_table[x].dealer_image.y = self.all_thumbnial_table[x].y + 17;
				self.all_thumbnial_table[x].dealer_image.scaleY = self.all_thumbnial_table[x].dealer_image.scaleX = .7;
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].dealer_image);

				// === dealer name
				self.all_thumbnial_table[x].dealer_name = new createjs.Text(data[x].currentDealer,"18px LatoRegular","#fff");
				self.all_thumbnial_table[x].dealer_name.x = self.all_thumbnial_table[x].x + 130;
				self.all_thumbnial_table[x].dealer_name.y = self.all_thumbnial_table[x].y + 50;
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].dealer_name);

				self.all_thumbnial_table[x].dealer_id = data[x].dealerId;

				for (var i = 0; i < window.dealerImg.length; i++) {
                    if (window.dealerImg[i].id == data[x].dealerId) {
                        let dbImage = new Image();
                        dbImage.src = window.dealerImg[i].dealer_image;
                        self.all_thumbnial_table[x].dealer_image.image = dbImage;
                    }
                }

				// For blob dealer image
				// $.post(`/getDealerImg`, {dealerId : data[x].dealerId},  (response) => {
				// 	for (var j = 0; j < self.all_thumbnial_table.length; j++) {
				// 		if (self.all_thumbnial_table[j].dealer_id == response[0].id) {
				// 			let dbImage = new Image();
				// 			dbImage.src = response[0].dealer_image;
				// 			self.all_thumbnial_table[j].dealer_image.image = dbImage;
				// 		}
				// 	}
    //             });

				// === table status
				let status = "";
				if(data[x].roundStatus == "P") {
					if(data[x].gameName != "Sicbo") {
						status = window.language.lobby.dealing;
					} else {
						status = window.language.lobby.result;
					}
				}
				if(data[x].roundStatus == "S") {
					status = window.language.lobby.nowbetting;
				}

				if(data[x].roundStatus == "E") {
					status = window.language.lobby.bettingend;
					if(!data[x].marks.length) {
						status = window.language.prompts.promptshuffling;
					}
				}

				if(data[x].roundStatus == "R") {
					status = window.language.lobby.result;
				}

				if(data[x].is_shoeChange) {
					if(!data[x].marks.length) {
						status = window.language.prompts.promptshuffling;
					}
				}

				self.all_thumbnial_table[x].status = new createjs.Text(status,"18px LatoRegular","#fff");
				self.all_thumbnial_table[x].status.x = self.all_thumbnial_table[x].x + 130;
				self.all_thumbnial_table[x].status.y = self.all_thumbnial_table[x].y + 78;
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].status);

				if(window.language.locale == "zh") {
						self.all_thumbnial_table[x].status.font = "23px LatoRegular";
				}

				//=== view
				self.all_thumbnial_table[x].view = new createjs.Container();
				let icon = createSprite(self.context.getResources("show_icon"),37.5, 23,self.all_thumbnial_table[x].view)
				icon.gotoAndStop(0)
				let icon_bg = new createjs.Shape();
				icon_bg.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(-4,-4,100,60);
				self.all_thumbnial_table[x].view.addChild(icon_bg, icon)

				self.all_thumbnial_table[x].view.x = self.all_thumbnial_table[x].x + 350;
				self.all_thumbnial_table[x].view.y =self.all_thumbnial_table[x].y + 8;
				// self.all_thumbnial_table[x].view.scaleX = self.all_thumbnial_table[x].view.scaleY = 0.42;
				self.all_thumbnial_table[x].view.data = data[x];
				self.thumbnail_view.addChild( self.all_thumbnial_table[x].view);

				///roadmapcontianers
				if(data[x].gameName == "Baccarat") {
					self.all_thumbnial_table[x].bigroad_container = new createjs.Container();
					self.all_thumbnial_table[x].bigroad_container.x = self.all_thumbnial_table[x].x;
					self.all_thumbnial_table[x].bigroad_container.y = self.all_thumbnial_table[x].y + 122;
					self.thumbnail_view.addChild(self.all_thumbnial_table[x].bigroad_container);

					let mask = new createjs.Shape();
					mask.graphics.beginFill("red").drawRect(0,0,400,100);

					mask.x = self.all_thumbnial_table[x].x;
					mask.y = self.all_thumbnial_table[x].bigroad_container.y
					self.all_thumbnial_table[x].bigroad_container.mask = mask;

				}

				if(data[x].gameName == "Poker") {
					self.all_thumbnial_table[x].roadmap_container = new createjs.Container();
					self.thumbnail_view.addChild(self.all_thumbnial_table[x].roadmap_container);
					self.all_thumbnial_table[x].roadmap_container.x  = self.all_thumbnial_table[x].x + 8;
					self.all_thumbnial_table[x].roadmap_container.y  = self.all_thumbnial_table[x].y + 130;
				}

				if(data[x].gameName == "Dragon-Tiger") {
	        		self.all_thumbnial_table[x].bigroad_container = new createjs.Container();
	        		self.all_thumbnial_table[x].bigroad_container.x = self.all_thumbnial_table[x].x;
	        		self.all_thumbnial_table[x].bigroad_container.y = self.all_thumbnial_table[x].y + 122;
	        		self.thumbnail_view.addChild(self.all_thumbnial_table[x].bigroad_container);
				}

				if(data[x].gameName == "Poker") {
					self.all_thumbnial_table[x].card_res_bg_container = new createjs.Container();
					self.all_thumbnial_table[x].card_res_bg_container.visible = false;
					self.all_thumbnial_table[x].card_res_bg_container.x = self.all_thumbnial_table[x].x;
					self.all_thumbnial_table[x].card_res_bg_container.y = self.all_thumbnial_table[x].y + 122;
					self.thumbnail_view.addChild(self.all_thumbnial_table[x].card_res_bg_container);

					self.all_thumbnial_table[x].card_result_container = new createjs.Container();
					self.all_thumbnial_table[x].card_result_container.visible = false;
					self.all_thumbnial_table[x].card_result_container.x = self.all_thumbnial_table[x].x;
					self.all_thumbnial_table[x].card_result_container.y = self.all_thumbnial_table[x].y + 122;
					self.thumbnail_view.addChild(self.all_thumbnial_table[x].card_result_container);

					let poker_result_bg = new createjs.Shape();
					poker_result_bg.graphics.beginFill("#fff").drawRect(0,0,400,94);
					self.all_thumbnial_table[x].card_res_bg_container.addChild(poker_result_bg);

					let banker_bg = new createjs.Shape();
					banker_bg.graphics.beginFill("#d22d2e").drawRoundRect(0,0,90,75,6);
					banker_bg.x = 10;
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
				}

				// === bet range
				self.all_thumbnial_table[x].bet_range_bg = new createjs.Shape();
				self.all_thumbnial_table[x].bet_range_bg.x = self.all_thumbnial_table[x].x + 400;
				self.all_thumbnial_table[x].bet_range_bg.y = self.all_thumbnial_table[x].y;
				self.all_thumbnial_table[x].bet_range_bg.mask = self.all_thumbnial_table[x];
				self.all_thumbnial_table[x].bet_range_bg.graphics.beginFill("rgba(0,0,0,0.6)").drawRect(0,38,400 ,178);
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].bet_range_bg);

				// === bet range container
				self.all_thumbnial_table[x].bet_range_container = new createjs.Container();
				self.all_thumbnial_table[x].bet_range_container.x = self.all_thumbnial_table[x].x + 400;
				self.all_thumbnial_table[x].bet_range_container.y = self.all_thumbnial_table[x].y + 98;
				self.all_thumbnial_table[x].bet_range_container.mask = self.all_thumbnial_table[x];
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].bet_range_container);

				// === enter button

				self.all_thumbnial_table[x].enter_button = new createjs.Shape();
				self.all_thumbnial_table[x].enter_button.graphics
				.beginLinearGradientFill(["#ffd474","#af8315"],[0,1],0,0,0,30)
				.drawRoundRect(0,0,110,26,6);

				self.all_thumbnial_table[x].enter_button.x = self.all_thumbnial_table[x].x + 280;
				self.all_thumbnial_table[x].enter_button.trans = self.all_thumbnial_table[x];
				self.all_thumbnial_table[x].enter_button.y = self.all_thumbnial_table[x].y + 48;
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].enter_button);

				let text = window.language.lobby.entercaps;
				let enterFont = "18px latobold";
				let y = 2;
				if(data[x].gameName == "Baccarat" || data[x].gameName == "Dragon-Tiger") {
					text = window.language.lobby.singleplayercaps;
					enterFont = "14px latobold";
					y = 4;
				}
				self.all_thumbnial_table[x].enter_text = new createjs.Text(text,enterFont,"#000");

				self.all_thumbnial_table[x].enter_text.x = self.all_thumbnial_table[x].enter_button.x + (110/2);
				self.all_thumbnial_table[x].enter_text.y = self.all_thumbnial_table[x].enter_button.y + y;
				self.all_thumbnial_table[x].enter_text.textAlign = "center";
				self.all_thumbnial_table[x].enter_text.shadow = new createjs.Shadow("#dfd648",0,2,1);
				self.all_thumbnial_table[x].enter_text.hitArea = self.all_thumbnial_table[x].enter_button;
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].enter_text);

				if(window.language.locale == "zh") {
						self.all_thumbnial_table[x].enter_text.font = "19px latobold";
						self.all_thumbnial_table[x].enter_text.y = self.all_thumbnial_table[x].enter_button.y + y - 2.5;
				}

				if(data[x].gameName == "Baccarat" || data[x].gameName == "Dragon-Tiger") {
					self.all_thumbnial_table[x].multiplayer_button = new createjs.Shape();
					self.all_thumbnial_table[x].multiplayer_button.graphics
					.beginLinearGradientFill(["#ffd474","#af8315"],[0,1],0,0,0,30)
					.drawRoundRect(0,0,110,26,6);

					self.all_thumbnial_table[x].multiplayer_button.trans = self.all_thumbnial_table[x];
					self.all_thumbnial_table[x].multiplayer_button.x = self.all_thumbnial_table[x].enter_button.x;
					self.all_thumbnial_table[x].multiplayer_button.y = self.all_thumbnial_table[x].enter_button.y + 34;
					self.thumbnail_view.addChild(self.all_thumbnial_table[x].multiplayer_button);

					self.all_thumbnial_table[x].multi_text = new createjs.Text(window.language.menu.multiplayer.toUpperCase(),enterFont,"#000");
					self.all_thumbnial_table[x].multi_text.x = self.all_thumbnial_table[x].multiplayer_button.x + (110/2);
					self.all_thumbnial_table[x].multi_text.y = self.all_thumbnial_table[x].multiplayer_button.y + 4;
					self.all_thumbnial_table[x].multi_text.textAlign = "center";
					self.all_thumbnial_table[x].multi_text.shadow = new createjs.Shadow("#dfd648",0,2,1);
					self.all_thumbnial_table[x].multi_text.hitArea = self.all_thumbnial_table[x].multiplayer_button;
					self.thumbnail_view.addChild(self.all_thumbnial_table[x].multi_text);

					if(window.language.locale == "zh") {
							self.all_thumbnial_table[x].multi_text.font = "19px latobold";
							self.all_thumbnial_table[x].multi_text.y = self.all_thumbnial_table[x].multiplayer_button.y + 1.5;
					}

					self.all_thumbnial_table[x].multiplayer_button.on("mouseover",(e)=>{
						if(parseInt(e.currentTarget.is_maintenance)) return;
						$(".container").css('cursor','pointer')
					});

					self.all_thumbnial_table[x].multiplayer_button.on("mouseout",(e)=>{
						$(".container").css('cursor','default')
					});
				}

				self.all_thumbnial_table[x].enter_button.on("mouseover",(e)=>{
					if(parseInt(e.currentTarget.is_maintenance)) return;
					$(".container").css('cursor','pointer')
				});

				self.all_thumbnial_table[x].enter_button.on("mouseout",(e)=>{
					$(".container").css('cursor','default')
				});

				// === bet ranges
				self.all_thumbnial_table[x].bet_range = [];
				self.all_thumbnial_table[x].bet_range_text_hyphen = [];
        		self.all_thumbnial_table[x].bet_range_text_min = [];
        		self.all_thumbnial_table[x].bet_range_text_max = [];

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

					self.all_thumbnial_table[x].bet_range[i] = new createjs.Shape();
					self.all_thumbnial_table[x].bet_range[i].graphics
					.beginLinearGradientFill(["#ffd474","#c49523"],[0,1],0,0,0,26)
					.drawRoundRect(0,0,188,28,14);
					self.all_thumbnial_table[x].bet_range[i].y = i*40
					self.all_thumbnial_table[x].bet_range[i].x = 10
					self.all_thumbnial_table[x].bet_range[i].button = true;
					self.all_thumbnial_table[x].bet_range[i].game = data[x].gameName;

					if(i > 2) {
						self.all_thumbnial_table[x].bet_range[i].y = (i-3)*40
						self.all_thumbnial_table[x].bet_range[i].x = 202
					}

					let dividend
					if (window.casino == 'SS') {
						dividend = 1000;
					}
					else {
						dividend = 1;
					}

					let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
					if (window.mainMultiplier % 10) mainMultiplier = 1;
					betRangeMin = (rangeToUse[i].min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					betRangeMax = ((rangeToUse[i].max * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

					self.all_thumbnial_table[x].bet_range_text_hyphen[i] = new createjs.Text(" - ","bold 18px arial","#000");
					self.all_thumbnial_table[x].bet_range_text_hyphen[i].x = self.all_thumbnial_table[x].bet_range[i].x + (182/2);
					self.all_thumbnial_table[x].bet_range_text_hyphen[i].hitArea = self.all_thumbnial_table[x].bet_range[i];
          			self.all_thumbnial_table[x].bet_range_text_hyphen[i].textAlign = "center";
					self.all_thumbnial_table[x].bet_range_text_min[i] = new createjs.Text(numberWithCommas(betRangeMin),"bold 18px arial","#000");
					self.all_thumbnial_table[x].bet_range_text_min[i].x = self.all_thumbnial_table[x].bet_range_text_hyphen[i].x - 8;
					self.all_thumbnial_table[x].bet_range_text_min[i].textAlign = "right";
					self.all_thumbnial_table[x].bet_range_text_min[i].hitArea = self.all_thumbnial_table[x].bet_range[i];
					self.all_thumbnial_table[x].bet_range_text_max[i] = new createjs.Text(numberWithCommas(betRangeMax),"bold 18px arial","#000");
					self.all_thumbnial_table[x].bet_range_text_max[i].x = self.all_thumbnial_table[x].bet_range_text_hyphen[i].x + 8;
					self.all_thumbnial_table[x].bet_range_text_max[i].textAlign = "left";
					self.all_thumbnial_table[x].bet_range_text_max[i].hitArea = self.all_thumbnial_table[x].bet_range[i];
					self.all_thumbnial_table[x].bet_range_text_hyphen[i].y = self.all_thumbnial_table[x].bet_range_text_min[i].y = self.all_thumbnial_table[x].bet_range_text_max[i].y = self.all_thumbnial_table[x].bet_range[i].y + 4;

					self.all_thumbnial_table[x].bet_range_container.on("mouseover",  (e) => {
						if(e.target.text) {
							e.target = e.target.hitArea
						}
						if(e.target.button) {
							$(".container").css('cursor','pointer');
							e.target.graphics.clear().beginLinearGradientFill(["#c49523","#ffd474"],[0,1],0,0,0,26)
							.drawRoundRect(0,0,188,28,14);
						}
					});

					self.all_thumbnial_table[x].bet_range_container.on("mouseout",  (e) => {
						if(e.target.text) {
							e.target = e.target.hitArea
						}
						if(e.target.button) {
							$(".container").css('cursor','default');
							e.target.graphics.clear().beginLinearGradientFill(["#ffd474","#c49523"],[0,1],0,0,0,26)
							.drawRoundRect(0,0,188,28,14);
						}
					});

					self.all_thumbnial_table[x].bet_range[i].targ = {data:data[x]};
					
					if(data[x].gameName == "Sicbo") {
						self.all_thumbnial_table[x].bet_range[i].redirect_link = window.sb_domain+data[x].tableNumber + "/" +rangeToUse[i].min + "-" + rangeToUse[i].max;
					}
					if(data[x].gameName == "Baccarat") {
						if(data[x].slave && (data[x].slave=='supersix' || data[x].slave=='bonus')){
							self.all_thumbnial_table[x].bet_range[i].slave = data[x].slave;
						}
						self.all_thumbnial_table[x].bet_range[i].redirect_link = window.bc_domain+data[x].tableNumber + "/" +rangeToUse[i].min + "-" + rangeToUse[i].max;
					}
					if(data[x].gameName == "Dragon-Tiger") {
						self.all_thumbnial_table[x].bet_range[i].redirect_link = window.dt_domain+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
					}
					if(data[x].gameName == "Poker") {
						self.all_thumbnial_table[x].bet_range[i].redirect_link = window.poker_domain+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max;
						if(data[x].slave && data[x].slave=='bonusplus'){
							self.all_thumbnial_table[x].bet_range[i].slave = data[x].slave;
							self.all_thumbnial_table[x].bet_range[i].redirect_link = window.poker_domain+data[x].tableNumber + "/"+rangeToUse[i].min + "-" + rangeToUse[i].max + "?slave=bonusplus";
						}
					}

					self.all_thumbnial_table[x].bet_range_container.addChild(self.all_thumbnial_table[x].bet_range[i],
						self.all_thumbnial_table[x].bet_range_text_hyphen[i], self.all_thumbnial_table[x].bet_range_text_min[i], self.all_thumbnial_table[x].bet_range_text_max[i])
				}

				self.all_thumbnial_table[x].bet_range_container.on("click",  (e) => {
					// Temp
					// for (var j = 0; j < e.currentTarget.children[0].targ.data.maintenanceSetting.maintenance.length; j++) {
					// 	if (parseInt(e.currentTarget.children[0].targ.data.maintenanceSetting.maintenance[j]) === 1) {
					// 		return;
					// 	}
					// }

					if(e.target.text) {
						e.target = e.target.hitArea
					}
					if(e.target.button) {
						$(".container").css('cursor','pointer');
					}

					if(e.target.game == "Baccarat" || e.target.game == "Dragon-Tiger") {
						if(e.target.slave && (e.target.slave=='supersix' || e.target.slave=='bonus')){
							window.location.href = e.target.redirect_link + "/"+self.is_multiplayer + '?slave='+e.target.slave;
						} else {
							window.location.href = e.target.redirect_link + "/"+self.is_multiplayer;
						}
							// for super six
						
						return
					}

					window.location.href = e.target.redirect_link
				});
				// === bet

				self.is_multiplayer = 0;

				self.all_thumbnial_table[x].enter_button.clicked = false;

				self.all_thumbnial_table[x].enter_button.on("click", (e) => {
					if(!e.currentTarget.clicked) {

						self.is_multiplayer = 0;

						self.all_thumbnial_table.forEach((targ) => {
							targ.bet_range_bg.x = targ.x + 400;
							targ.bet_range_container.x = targ.x + 400;
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

						self.all_thumbnial_table.forEach(function (row) {
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

					self.all_thumbnial_table.forEach((targ) => {
						createjs.Tween.get(targ.bet_range_bg)
						.to({
							x : targ.x + 400
						},120)

						createjs.Tween.get(targ.bet_range_container)
						.to({
							x : targ.x + 400
						},120)
					});

					self.all_thumbnial_table.forEach(function (row) {
						row.enter_button.clicked = false;
						if(row.multiplayer_button) {
							row.multiplayer_button.clicked = false;
						}
					});

				});

				if (data[x].gameName == "Baccarat" || data[x].gameName == "Dragon-Tiger") {
					self.all_thumbnial_table[x].multiplayer_button.clicked = false;

					self.all_thumbnial_table[x].multiplayer_button.on("click", (e) => {
						if(!e.currentTarget.clicked) {

							self.is_multiplayer = 1;

							self.all_thumbnial_table.forEach((targ) => {
								targ.bet_range_bg.x = targ.x + 400;
								targ.bet_range_container.x = targ.x + 400;
							});
							createjs.Tween.get(e.currentTarget.trans.bet_range_bg)
							.to({
								x: e.currentTarget.trans.x + (0)
							},120)

							createjs.Tween.get(e.currentTarget.trans.bet_range_container)
							.to({
								x: e.currentTarget.trans.x  + (70)
							},120)

							self.all_thumbnial_table.forEach(function (row) {
								row.enter_button.clicked = false;
								if(row.multiplayer_button) {
									row.multiplayer_button.clicked = false;
								}
							});

							e.currentTarget.trans.enter_button.clicked = false;
							e.currentTarget.clicked = true;
							return;
						}

						self.all_thumbnial_table.forEach((targ) => {
							createjs.Tween.get(targ.bet_range_bg)
							.to({
								x : targ.x + 400
							},120)

							createjs.Tween.get(targ.bet_range_container)
							.to({
								x : targ.x + 400
							},120)
						});

						self.all_thumbnial_table.forEach(function (row) {
							row.enter_button.clicked = false;

							if(row.multiplayer_button) {
								row.multiplayer_button.clicked = false;
							}
						});

					});
				}

				let to_be_clicked  = [self.all_thumbnial_table[x].header_2, self.all_thumbnial_table[x].header, self.all_thumbnial_table[x].dealer_bg, self.all_thumbnial_table[x].dealer_image, self.all_thumbnial_table[x].table_text,
									self.all_thumbnial_table[x].table_num,self.all_thumbnial_table[x].dealer_name, self.all_thumbnial_table[x].status]

				self.all_thumbnial_table[x].view.clicked = false;
				// === mouseover
				self.all_thumbnial_table[x].view.on("mouseover", (e) => {
					// Temp
					// for (var j = 0; j < e.currentTarget.data.maintenanceSetting.maintenance.length; j++) {
					// 	if (parseInt(e.currentTarget.data.maintenanceSetting.maintenance[j]) === 1) {
					// 		return;
					// 	}
					// }

					$(".container").css('cursor','pointer');
				});

				to_be_clicked.forEach((view,i)=>{
					view.clicked = false;

					view.targ = self.all_thumbnial_table[x].view;
					view.on("mouseover", (e) => {
						// Temp
						// for (var j = 0; j < e.currentTarget.targ.data.maintenanceSetting.maintenance.length; j++) {
						// 	if (parseInt(e.currentTarget.targ.data.maintenanceSetting.maintenance[j]) === 1) {
						// 		return;
						// 	}
						// }

						$(".container").css('cursor','pointer');
					});
					view.on("mouseout", (e) => {
						$(".container").css('cursor','default');
					});

					view.on("click", (e) => {
						// Temp
						// for (var j = 0; j < e.currentTarget.targ.data.maintenanceSetting.maintenance.length; j++) {
						// 	if (parseInt(e.currentTarget.targ.data.maintenanceSetting.maintenance[j]) === 1) {
						// 		return;
						// 	}
						// }

						if(e.currentTarget.clicked) {
							e.currentTarget.targ.children[1].gotoAndStop(0);
							self.context.lobby_banner.banner_container.visible = true;
							self.context.lobby_banner.table_banner_container.removeAllChildren()
							e.currentTarget.clicked = false
							return;
						}

						self.context.lobby_banner.bannerTableShow(e.currentTarget.targ);

						self.all_thumbnial_table.forEach(function (row) {
							row.view.clicked = false
							row.header_2.clicked = false
							row.header.clicked = false
							row.dealer_bg.clicked = false
							row.dealer_image.clicked = false
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

				self.all_thumbnial_table[x].view.on("mouseout", (e) => {
					$(".container").css('cursor','default');
				});

				self.context.lobby_banner.banner_container.visible = true;
				self.context.lobby_banner.table_banner_container.removeAllChildren()

				self.all_thumbnial_table[x].view.on("click", (e) => {
					// Temp
					// for (var j = 0; j < e.currentTarget.data.maintenanceSetting.maintenance.length; j++) {
					// 	if (parseInt(e.currentTarget.data.maintenanceSetting.maintenance[j]) === 1) {
					// 		return;
					// 	}
					// }
						
					if(e.currentTarget.clicked) {
						e.currentTarget.children[1].gotoAndStop(0);
						self.context.lobby_banner.banner_container.visible = true;
						self.context.lobby_banner.table_banner_container.removeAllChildren()
						e.currentTarget.clicked = false
						return;
					}

					self.all_thumbnial_table.forEach(function(row){
						row.view.children[1].gotoAndStop(0)
					});
					e.currentTarget.children[1].gotoAndStop(1);
					self.context.lobby_banner.bannerTableShow(e.currentTarget);

					self.all_thumbnial_table.forEach(function (row) {
						row.view.clicked = false
					});

					e.currentTarget.clicked = true;
				});

				// === maintenance
				self.all_thumbnial_table[x].maintenanceCon = new createjs.Container();
				self.all_thumbnial_table[x].maintenanceCon.visible = false;
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].maintenanceCon);

				self.all_thumbnial_table[x].maintenanceCon.on("click", (e) => {
					return;
				});

				self.all_thumbnial_table[x].maintenanceBg = new createjs.Shape();
				self.all_thumbnial_table[x].maintenanceBg.graphics.beginFill("#333333").drawRoundRectComplex(0, 0, 405, 96+84+36, 10, 10, 0, 0);
				self.all_thumbnial_table[x].maintenanceBg.x = self.all_thumbnial_table[x].x - 3;
				self.all_thumbnial_table[x].maintenanceBg.y = self.all_thumbnial_table[x].y;
				self.all_thumbnial_table[x].maintenanceBg.table_id = data[x].tableNumber;
				self.all_thumbnial_table[x].maintenanceCon.addChild(self.all_thumbnial_table[x].maintenanceBg);

				self.all_thumbnial_table[x].maintenanceHeader = new createjs.Shape();
				self.all_thumbnial_table[x].maintenanceHeader.x = self.all_thumbnial_table[x].x - 3;
				self.all_thumbnial_table[x].maintenanceHeader.y = self.all_thumbnial_table[x].y;
				self.all_thumbnial_table[x].maintenanceHeader.graphics.beginLinearGradientFill(["#8e24aa", "#4d168e"],[0,1],0,0,350,10).drawRoundRectComplex(0,0,405,40,10,10,0,0);
				self.all_thumbnial_table[x].maintenanceCon.addChild(self.all_thumbnial_table[x].maintenanceHeader);

				let thumbTblName = '';

				switch(data[x].gameName) {
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

				self.all_thumbnial_table[x].table_name = new createjs.Text(thumbTblName,"19px ArvoItalic","#fdba44");
				self.all_thumbnial_table[x].table_name.x = self.all_thumbnial_table[x].x + 180;
				self.all_thumbnial_table[x].table_name.y = 7 + self.all_thumbnial_table[x].y;
				self.all_thumbnial_table[x].maintenanceCon.addChild(self.all_thumbnial_table[x].table_name);

				self.all_thumbnial_table[x].table_num = new createjs.Text(data[x].tableNumber.length < 2 ? "0"+data[x].tableNumber : data[x].tableNumber,"18px latobold","#fdba44");
				self.all_thumbnial_table[x].table_num.x = self.all_thumbnial_table[x].x +150;
				self.all_thumbnial_table[x].table_num.y = 7 + self.all_thumbnial_table[x].y;
				self.all_thumbnial_table[x].maintenanceCon.addChild(self.all_thumbnial_table[x].table_num);

				self.all_thumbnial_table[x].maintenanceLogo = new createjs.Bitmap(self.context.getResources("maintenance_ico"));
				self.all_thumbnial_table[x].maintenanceLogo.x = self.all_thumbnial_table[x].x + 16;
				self.all_thumbnial_table[x].maintenanceLogo.scaleX = 0.6;
				self.all_thumbnial_table[x].maintenanceLogo.scaleY = 0.6;
				self.all_thumbnial_table[x].maintenanceLogo.y = 16 + self.all_thumbnial_table[x].y;
				self.all_thumbnial_table[x].maintenanceCon.addChild(self.all_thumbnial_table[x].maintenanceLogo);

				self.all_thumbnial_table[x].maintenanceTxt = new createjs.Text('', '21px bebasneue', '#ffb547');
				self.all_thumbnial_table[x].maintenanceTxt.x = self.all_thumbnial_table[x].x + 385;
				self.all_thumbnial_table[x].maintenanceTxt.y = 85 + self.all_thumbnial_table[x].y;
				self.all_thumbnial_table[x].maintenanceTxt.textAlign = 'right';
				self.all_thumbnial_table[x].maintenanceTxt.lineHeight = '22';
				self.all_thumbnial_table[x].maintenanceCon.addChild(self.all_thumbnial_table[x].maintenanceTxt);

				if(window.language.locale == "zh") {
					self.all_thumbnial_table[x].maintenanceTxt.font = '24px bebasneue';
					self.all_thumbnial_table[x].maintenanceTxt.y = 85 + self.all_thumbnial_table[x].y - 3;
				}

				self.all_thumbnial_table[x].maintenanceSubTxt = new createjs.Text('', '16px bebasneue', '#fff');
				self.all_thumbnial_table[x].maintenanceSubTxt.x = self.all_thumbnial_table[x].x + 385;
				self.all_thumbnial_table[x].maintenanceSubTxt.y = 132 + self.all_thumbnial_table[x].y;
				self.all_thumbnial_table[x].maintenanceSubTxt.textAlign = 'right';
				self.all_thumbnial_table[x].maintenanceCon.addChild(self.all_thumbnial_table[x].maintenanceSubTxt);

				if(window.language.locale == "zh") {
					self.all_thumbnial_table[x].maintenanceSubTxt.font = '20px bebasneue';
				}

				self.all_thumbnial_table[x].maintenanceTime = new createjs.Text('', '16px bebasneue', '#fff');
				self.all_thumbnial_table[x].maintenanceTime.x = self.all_thumbnial_table[x].x + 385;
				self.all_thumbnial_table[x].maintenanceTime.y = 155 + self.all_thumbnial_table[x].y;
				self.all_thumbnial_table[x].maintenanceTime.textAlign = 'right';
				self.all_thumbnial_table[x].maintenanceTime.lineHeight = '20';
				self.all_thumbnial_table[x].maintenanceCon.addChild(self.all_thumbnial_table[x].maintenanceTime);

				this.checkMaintenance(data[x], false, x);
			} // end for
		}, // end createtable function
		checkMaintenance(maintenanceData, socket, x) {
			if(!self.all_thumbnial_table || !self.all_thumbnial_table[x] || !self.all_thumbnial_table[x].maintenanceCon) return;
		  	if(window.userAuthority == 'admin') return;

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
						if (self.all_thumbnial_table[x].slave === maintenanceSetting[i].type) {
							for (var j = 0; j < maintenanceSetting[i].info.length; j++) {
								if (maintenanceSetting[i].info[j].status === 1) {
									maintenance = true;
									activeMaintenance = maintenanceSetting[i].info[j];
								}
							} // end for loop
						}
						else if (self.all_thumbnial_table[x].slave === '' && maintenanceSetting[i].type === 'normal') {
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

					if (self.all_thumbnial_table[x].slave === activeMaintenance.slave) {
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

			    	activeMaintenance = data.data;

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
					self.all_thumbnial_table[x].maintenanceSubTxt.y = 133 + self.all_thumbnial_table[x].y;
					self.all_thumbnial_table[x].maintenanceTime.y = 158 + self.all_thumbnial_table[x].y;
				}
				
				if (window.language.locale == 'jp') {
					self.all_thumbnial_table[x].maintenanceTxt.y = 60 + self.all_thumbnial_table[x].y;
				}

				if (window.language.locale == 'zh') {
					self.all_thumbnial_table[x].maintenanceTxt.font = '17px bebasneue';
				}
			}
			else if (parseInt(activeMaintenance.main_text) == 3) { 
				mainText = window.language.lobby.maintextCap3;
				mainTextThumb = window.language.lobby.maintextCap3Thumb;

				self.all_thumbnial_table[x].maintenanceSubTxt.y = 133 + self.all_thumbnial_table[x].y;
				self.all_thumbnial_table[x].maintenanceTime.y = 158 + self.all_thumbnial_table[x].y;

				if (window.language.locale == 'zh') {
					self.all_thumbnial_table[x].maintenanceTxt.font = '17px bebasneue';
				}
			}

			// Extra line for jp texts
			if (window.language.locale == 'jp') {
				self.all_thumbnial_table[x].maintenanceSubTxt.y = 133 + self.all_thumbnial_table[x].y;
				self.all_thumbnial_table[x].maintenanceTime.y = 158 + self.all_thumbnial_table[x].y;
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
				self.all_thumbnial_table[x].maintenanceCon.visible = true;
				self.all_thumbnial_table[x].maintenanceTxt.text = mainTextThumb;
				self.all_thumbnial_table[x].maintenanceSubTxt.text = subText;
				self.all_thumbnial_table[x].maintenanceTime.text = newStartTime +' ~ '+ newEndTime;
			}
			else if (maintenance === false) {
				self.all_thumbnial_table[x].maintenanceCon.visible = false;
			}
		}
	}

	return instance;
}
