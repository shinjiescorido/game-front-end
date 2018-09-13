import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../../factories/factories';

let instance = null;

export default (self,data) =>{
	instance =  {
		/**
		 *	@method create common table assets
		 *
		 * @return
		 */
		makeListTables () {
			for(var x = 0; x < data.length; x++) {

				// if(data[x].gameName =="Sicbo") {
				// 	data[x].marks = _.filter(data[x].marks, (function (e) {
				// 		return e.game_info != '{"dice":null}';
				// 	}));
				// }

				// === table background
				self.all_list_table[x] = new createjs.Shape();
				self.all_list_table[x].graphics.beginFill("#333333").drawRoundRect(350,0,1640 - 350 - 272,283,0);
				self.all_list_table[x].y = x * 302.5;
				self.all_list_table[x].game_name = data[x].gameName;
				self.all_list_table[x].table_number = data[x].tableNumber;
				self.list_view.addChild(self.all_list_table[x]);

				// === dealer
				self.all_list_table[x].dealer_bg  = new createjs.Shape();
				self.all_list_table[x].dealer_bg.graphics.beginFill("#333").drawRoundRectComplex(0,0,350,283,10,0,0,10);
				self.all_list_table[x].dealer_bg.y = self.all_list_table[x].y;
				self.list_view.addChild(self.all_list_table[x].dealer_bg);

				self.all_list_table[x].dealer_header  = new createjs.Shape();
				self.all_list_table[x].dealer_header.y = self.all_list_table[x].y;
				self.all_list_table[x].dealer_header.graphics.beginLinearGradientFill(["#8e24aa", "#4d168e"], [0,1], 0,0,300,20).drawRoundRectComplex(0,0,350,50,10,0,0,0);
				self.list_view.addChild(self.all_list_table[x].dealer_header);

				self.all_list_table[x].dealer_img_bg  = new createjs.Shape();
				self.all_list_table[x].dealer_img_bg.graphics.beginFill("#f5ac4e").drawCircle(0,0,62);
				self.all_list_table[x].dealer_img_bg.x = 84
				self.all_list_table[x].dealer_img_bg.y = 100 + self.all_list_table[x].y;
				self.list_view.addChild(self.all_list_table[x].dealer_img_bg);

				// === table name
				let gameNameStr = '';

				switch(data[x].gameName) {
      		case "Pula-Puti" :
      			gameNameStr = window.language.lobby.redwhite;
      			break;

      		case "Big-Wheel" :
      			gameNameStr = window.language.lobby.spinwin;
      			break;
      	}
				self.all_list_table[x].table_name = new createjs.Text(gameNameStr,"bold 20px ArvoItalic","#fdba44");
				self.all_list_table[x].table_name.x = 195;
				self.all_list_table[x].table_name.y = 13 + self.all_list_table[x].y;
        self.all_list_table[x].table_name.textAlign = "center";
				self.list_view.addChild(self.all_list_table[x].table_name);

				self.all_list_table[x].table_num = new createjs.Text(data[x].tableNumber.length < 2 ? "0"+data[x].tableNumber : data[x].tableNumber,"21px ArvoBold","#fdba44");
				self.all_list_table[x].table_num.textAlign = "right";
				self.all_list_table[x].table_num.x = self.all_list_table[x].table_name.x - (self.all_list_table[x].table_name.getBounds().width / 2) - 10;
				self.all_list_table[x].table_num.y = 11 + self.all_list_table[x].y;
				self.list_view.addChild(self.all_list_table[x].table_num);

				// === round num
				self.all_list_table[x].round_num = new createjs.Text(data[x].currentRound, "20px latoregular","#fff");
				self.list_view.addChild(self.all_list_table[x].round_num);

				//=== table status
				self.all_list_table[x].status = new createjs.Text("", "20px latoregular","#fff");
				self.list_view.addChild(self.all_list_table[x].status);

				//== timer
				self.all_list_table[x].timer = _.clone(self.context.use_timer());
				self.all_list_table[x].timer.scaleX = self.all_list_table[x].timer.scaleY = 1.2;
				self.all_list_table[x].is_timerStart = false;

				self.list_view.addChild(self.all_list_table[x].timer);

				//dealer image
				// let image = new Image();
				// image.src = data[x].dealerImage;



				var image = document.createElement("img");
				image.crossOrigin = "Anonymous";
				image.src = data[x].dealerImage;

				self.all_list_table[x].dealer_img = new createjs.Bitmap();
				self.all_list_table[x].dealer_img.image = image;
				self.all_list_table[x].dealer_img.setBounds(0,0,250,250)
				self.all_list_table[x].dealer_img.regX = self.all_list_table[x].dealer_img.getBounds().width;
				self.all_list_table[x].dealer_img.regY = self.all_list_table[x].dealer_img.getBounds().height;
				self.all_list_table[x].dealer_img.scaleX = self.all_list_table[x].dealer_img.scaleY = 1;
				self.all_list_table[x].dealer_img.x = self.all_list_table[x].dealer_img_bg.x;
				self.all_list_table[x].dealer_img.y = self.all_list_table[x].dealer_img_bg.y;
				self.list_view.addChild(self.all_list_table[x].dealer_img);

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

				for(var i = 0; i < data[x].sportBetRanges.length; i++) {
					let rangeToUse = [];
					if (window.userType == 'TS' || window.userType == 'S') {
						rangeToUse = data[x].sportBetRanges[i];
					}
					else if (window.userType == 'TC' || window.userType == 'C') {
						rangeToUse = data[x].casinoBetRanges[i];
					}
					else {
						rangeToUse = data[x].casinoBetRanges[i];
					}

					let dividend
          if (window.casino == 'SS') {
              dividend = 1000;
          }
          else {
              dividend = 1;
          }

					if (rangeToUse.status != 0) {
						self.all_list_table[x].bet_range[i] = new createjs.Shape();
						self.all_list_table[x].bet_range[i].graphics.beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
						self.all_list_table[x].bet_range[i].x = 1404;
						self.all_list_table[x].bet_range[i].y = (i *40) + (26 + self.all_list_table[x].y);
						self.all_list_table[x].bet_range[i].table = data[x].gameName;
						self.all_list_table[x].bet_range[i].tableNumber = data[x].tableNumber;
						self.all_list_table[x].bet_range[i].range = rangeToUse.min + "-" + rangeToUse.max;
						self.list_view.addChild(self.all_list_table[x].bet_range[i]);

						self.all_list_table[x].bet_range_text_hyphen[i] = new createjs.Text(" - ", "17px latobold" ,"#000");
  					self.all_list_table[x].bet_range_text_hyphen[i].x = self.all_list_table[x].bet_range[i].x + (202/2);
            self.all_list_table[x].bet_range_text_hyphen[i].textAlign = "center";
            self.all_list_table[x].bet_range_text_min[i] = new createjs.Text(numberWithCommas(rangeToUse.min / dividend), "17px latobold" ,"#000");
            self.all_list_table[x].bet_range_text_min[i].x = self.all_list_table[x].bet_range_text_hyphen[i].x - 8;
            self.all_list_table[x].bet_range_text_min[i].textAlign = "right";
            self.all_list_table[x].bet_range_text_max[i] = new createjs.Text(numberWithCommas(rangeToUse.max / dividend), "17px latobold" ,"#000");
            self.all_list_table[x].bet_range_text_max[i].x = self.all_list_table[x].bet_range_text_hyphen[i].x + 8;
            self.all_list_table[x].bet_range_text_max[i].textAlign = "left";
  					self.all_list_table[x].bet_range_text_hyphen[i].y = self.all_list_table[x].bet_range_text_min[i].y = self.all_list_table[x].bet_range_text_max[i].y = self.all_list_table[x].bet_range[i].y + 4;

            self.list_view.addChild(self.all_list_table[x].bet_range_text_hyphen[i], self.all_list_table[x].bet_range_text_min[i], self.all_list_table[x].bet_range_text_max[i]);

						self.all_list_table[x].bet_range[i].hover =  function (e, type) {
							if(type == "hover") {
								e.graphics.clear().beginLinearGradientFill(["#c69522", "#ffd476"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
							} else {
								e.graphics.clear().beginLinearGradientFill(["#ffd476", "#c69522"],[0,1],0,0,0,20).drawRoundRect(0,0,202,30,15);
							}
						} //end of active
						self.all_list_table[x].bet_range[i].on("mouseover", (e) => {
							e.target.hover(e.target,"hover");
						});

						self.all_list_table[x].bet_range[i].on("mouseout", (e) => {
							e.target.hover(e.target,"");
						});

						self.all_list_table[x].bet_range[i].on("click", (e) => {
							if (e.currentTarget.table == 'Pula-Puti') {
								location.href = 'http://pula-puti.nihtanv2.com/'+e.currentTarget.tableNumber+'/'+e.currentTarget.range;
							}
							else if (e.currentTarget.table == 'Big-Wheel') {
								location.href = 'http://big-wheel.nihtanv2.com/'+e.currentTarget.tableNumber+'/'+e.currentTarget.range;
								// location.href = 'http://10.1.10.88:8000/m/Big-Wheel/1/3000-100000';
								// location.href = 'http://10.1.10.88:8000/test';
							}
						});
					} //end if
				} //end for
			}
		},
		makeThumbnailTables() {
			let index_count = 0;

			let header_bg = [];
			let text_color = "";

			for(var x = 0; x < data.length; x++) {
				self.all_thumbnial_table[x] = new createjs.Shape();
				self.all_thumbnial_table[x].graphics.beginFill("#fff").drawRoundRectComplex(0,36,400,96+84,0,0,0,0);
				self.all_thumbnial_table[x].setBounds(0,0,400,216);
				self.all_thumbnial_table[x].x = x*(self.all_thumbnial_table[x].getBounds().width + 13)
				self.thumbnail_view.addChild(self.all_thumbnial_table[x]);

				self.all_thumbnial_table[x].game_name = data[x].gameName;
				self.all_thumbnial_table[x].table_number = data[x].tableNumber;

				if(x %4 == 0 && x!=0) {
					index_count++;
				} // end if

				self.all_thumbnial_table[x].y = index_count *232;
				self.all_thumbnial_table[x].x -= (index_count *1652);

				let roadMapBg = new createjs.Bitmap("/img/sicbo_road_map.png");
				roadMapBg.x = self.all_thumbnial_table[x].x - .5
				roadMapBg.y = self.all_thumbnial_table[x].y + 67
				roadMapBg.scaleX = 0.776
				roadMapBg.scaleY = 0.76
				roadMapBg.mask = self.all_thumbnial_table[x]
				self.thumbnail_view.addChild(roadMapBg);

				self.all_thumbnial_table[x].header = new createjs.Shape();
				self.all_thumbnial_table[x].header.x = self.all_thumbnial_table[x].x;
				self.all_thumbnial_table[x].header.y = self.all_thumbnial_table[x].y;

				if(data[x].roomType == "p") {
					header_bg = ["#8e24aa","#4d158d"];
					text_color = "#efb052";
				} else if(data[x].roomType == "v") {
					header_bg = ["#fedd78","#d5a515"];
					text_color = "#000";
				} else {
					header_bg = ["#00838f","#005044"];
					text_color = "#efb052";
				}

				self.all_thumbnial_table[x].header.graphics.beginLinearGradientFill(header_bg,[0,1],0,0,400,10)
				.drawRoundRectComplex(0,0,400,(self.all_thumbnial_table[x].getBounds().height-176),10,10,0,0);
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].header);

				self.all_thumbnial_table[x].header_2 = new createjs.Shape();
				self.all_thumbnial_table[x].header_2.x = self.all_thumbnial_table[x].x;
				self.all_thumbnial_table[x].header_2.y = self.all_thumbnial_table[x].y + 38;
				self.all_thumbnial_table[x].header_2.graphics.beginFill("#333333").drawRect(0,0,self.all_thumbnial_table[x].getBounds().width, 84);
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].header_2);

				// === game name
				self.all_thumbnial_table[x].table_num = new createjs.Text(parseInt(data[x].tableNumber) > 9 ? data[x].tableNumber : "0" + data[x].tableNumber , "bold 21px ArvoBold",text_color);
				self.all_thumbnial_table[x].table_num.x = self.all_thumbnial_table[x].x + 130;
				self.all_thumbnial_table[x].table_num.y = self.all_thumbnial_table[x].y + 5;
				self.all_thumbnial_table[x].table_num.textAlign = "left";
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].table_num);

				self.all_thumbnial_table[x].table_text = new createjs.Text(data[x].gameName, "bold 20px ArvoItalic",text_color);
				self.all_thumbnial_table[x].table_text.x = self.all_thumbnial_table[x].x + 162;
				self.all_thumbnial_table[x].table_text.y = self.all_thumbnial_table[x].y + 6;
				self.all_thumbnial_table[x].table_text.textAlign = "left";
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].table_text);

				// === dealer circle background
				self.all_thumbnial_table[x].dealer_bg = new createjs.Shape();
				self.all_thumbnial_table[x].dealer_bg.graphics.beginFill("#f4ac4d").drawCircle(0,0,45);
				self.all_thumbnial_table[x].dealer_bg.x = self.all_thumbnial_table[x].x + 62.5;
				self.all_thumbnial_table[x].dealer_bg.y = self.all_thumbnial_table[x].y + 63;
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].dealer_bg);

				//== timer
				self.all_thumbnial_table[x].timer = _.clone(self.context.use_timer());
				self.all_thumbnial_table[x].timer.scaleX = self.all_thumbnial_table[x].timer.scaleY = 0.88;
				self.all_thumbnial_table[x].timer.x = self.all_thumbnial_table[x].x - 12;
				self.all_thumbnial_table[x].timer.y = self.all_thumbnial_table[x].y - 12.5;
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].timer);

				let image = new Image();
				image.crossOrigin = "Anonymous";
				image.src = data[x].dealerImage
				// === dealer image
				// self.all_thumbnial_table[x].dealer_image = new createjs.Bitmap(self.context.getResources("dealer_temp"));
				self.all_thumbnial_table[x].dealer_image = new createjs.Bitmap(image);
				self.all_thumbnial_table[x].dealer_image.x = self.all_thumbnial_table[x].x + 18;
				self.all_thumbnial_table[x].dealer_image.y = self.all_thumbnial_table[x].y + 17;
				self.all_thumbnial_table[x].dealer_image.scaleY = self.all_thumbnial_table[x].dealer_image.scaleX = .7
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].dealer_image);

				// === dealer name
				self.all_thumbnial_table[x].dealer_name = new createjs.Text(data[x].currentDealer,"20px LatoRegular","#fff");
				self.all_thumbnial_table[x].dealer_name.x = self.all_thumbnial_table[x].x + 130;
				self.all_thumbnial_table[x].dealer_name.y = self.all_thumbnial_table[x].y + 50;
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].dealer_name);

				// === table status
				self.all_thumbnial_table[x].status = new createjs.Text("Now Betting","20px LatoRegular","#fff");
				self.all_thumbnial_table[x].status.x = self.all_thumbnial_table[x].x + 130;
				self.all_thumbnial_table[x].status.y = self.all_thumbnial_table[x].y + 75;
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].status);

				//=== view
				self.all_thumbnial_table[x].view = new createjs.Container();
				let icon = createSprite(self.context.getResources("show_icon"),87, 52,self.all_thumbnial_table[x].view)
				icon.gotoAndStop(1)
				let icon_bg = new createjs.Shape();
				icon_bg.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(-4,-4,100,60);
				self.all_thumbnial_table[x].view.addChild(icon_bg, icon)

				self.all_thumbnial_table[x].view.x = self.all_thumbnial_table[x].x + 350;
				self.all_thumbnial_table[x].view.y =self.all_thumbnial_table[x].y + 8;
				self.all_thumbnial_table[x].view.scaleX = self.all_thumbnial_table[x].view.scaleY = 0.42;
				self.all_thumbnial_table[x].view.data = data[x];
				self.thumbnail_view.addChild( self.all_thumbnial_table[x].view);

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
				.beginLinearGradientFill(["#ffd474","#c49523"],[0,1],0,0,0,30)
				.drawRoundRect(0,0,110,30,6);
				self.all_thumbnial_table[x].cache(0,0,100,30);
				self.all_thumbnial_table[x].enter_button.x = self.all_thumbnial_table[x].x + 280;
				self.all_thumbnial_table[x].enter_button.trans = self.all_thumbnial_table[x];
				self.all_thumbnial_table[x].enter_button.y = self.all_thumbnial_table[x].y + 54;
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].enter_button);

				self.all_thumbnial_table[x].enter_text = new createjs.Text(window.language.lobby.entercaps,"20px LatoRegular","#000");
				self.all_thumbnial_table[x].enter_text.x = self.all_thumbnial_table[x].enter_button.x + (110/2);
				self.all_thumbnial_table[x].enter_text.y = self.all_thumbnial_table[x].enter_button.y + 2;
				self.all_thumbnial_table[x].enter_text.textAlign = "center";
				self.all_thumbnial_table[x].enter_text.shadow = new createjs.Shadow("#dfd648",0,2,1);
				self.all_thumbnial_table[x].enter_text.hitArea = self.all_thumbnial_table[x].enter_button;
				self.thumbnail_view.addChild(self.all_thumbnial_table[x].enter_text);

				// === bet ranges
				// self.all_thumbnial_table[x].bet_range = [];
				// self.all_thumbnial_table[x].bet_range_text = [];

				// for(var i = 0; i < data[x].sportBetRanges.length; i++) {

				// 	self.all_thumbnial_table[x].bet_range[i] = new createjs.Shape();
				// 	self.all_thumbnial_table[x].bet_range[i].graphics
				// 	.beginLinearGradientFill(["#ffd474","#c49523"],[0,1],0,0,0,26)
				// 	.drawRoundRect(0,0,188,28,14);
				// 	self.all_thumbnial_table[x].bet_range[i].y = i*40
				// 	self.all_thumbnial_table[x].bet_range[i].x = 10

				// 	if(i > 2) {
				// 		self.all_thumbnial_table[x].bet_range[i].y = (i-3)*40
				// 		self.all_thumbnial_table[x].bet_range[i].x = 202
				// 	}

				// 	self.all_thumbnial_table[x].bet_range_text[i] = new createjs.Text(data[x].sportBetRanges[i].min+ " - " + data[x].sportBetRanges[i].max,"bold 18px arial","#000");
				// 	self.all_thumbnial_table[x].bet_range_text[i].y = self.all_thumbnial_table[x].bet_range[i].y + 4;
				// 	self.all_thumbnial_table[x].bet_range_text[i].x =  self.all_thumbnial_table[x].bet_range[i].x + 198 / 2;
				// 	self.all_thumbnial_table[x].bet_range_text[i].textAlign = "center"

				// 	self.all_thumbnial_table[x].bet_range_container.addChild(self.all_thumbnial_table[x].bet_range[i],
				// 													self.all_thumbnial_table[x].bet_range_text[i])
				// }
				// === bet

				self.all_thumbnial_table[x].enter_button.clicked = false;

				self.all_thumbnial_table[x].enter_button.on("click", (e) => {
					if(!e.target.clicked) {
						self.all_thumbnial_table.forEach((targ) => {
							targ.bet_range_bg.x = targ.x + 400;
							targ.bet_range_container.x = targ.x + 400;
						});
						createjs.Tween.get(e.target.trans.bet_range_bg)
						.to({
							x: e.target.trans.x + (e.target.trans.bet_range.length > 3 ? 0 : 192)
						},120)

						createjs.Tween.get(e.target.trans.bet_range_container)
						.to({
							x: e.target.trans.x  + (e.target.trans.bet_range.length > 3 ? 0 : 192)
						},120)
						self.all_thumbnial_table.forEach(function (row) {
							row.enter_button.clicked = false
						});
						e.target.clicked = true;

						return;
					}
				});

				self.all_thumbnial_table[x].view.clicked = false;

				self.all_thumbnial_table[x].view.on("click", (e) => {

					if(e.currentTarget.clicked) {
						e.currentTarget.children[1].gotoAndStop(1);
						self.context.lobby_banner.banner_container.visible = true;
						self.context.lobby_banner.table_banner_container.removeAllChildren()
						e.currentTarget.clicked = false
						return;
					}

					self.all_thumbnial_table.forEach(function(row){
						row.view.children[1].gotoAndStop(1)
					});
					e.currentTarget.children[1].gotoAndStop(0);
					self.context.lobby_banner.bannerTableShow(e.currentTarget);

					self.all_thumbnial_table.forEach(function (row) {
						row.view.clicked = false
					});

					e.currentTarget.clicked = true;
				});
			} // end for
		} //end
	}

	return instance;
}
