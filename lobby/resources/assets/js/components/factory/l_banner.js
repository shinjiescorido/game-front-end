import rmformat from '../../factories/formatter';
import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap } from '../../factories/factories';
import sboard from '../../factories/scoreboard_draw';

let formatData = rmformat();
let drawSboard  = sboard();

let instance = null;

export default(self,data,x) => {
	instance = {
		// **** SICBO *** //
		sicboBannerTable (data) {

			let roadmap_bg = new createjs.Shape();
			roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,729,158);
			roadmap_bg.y = 61;
			roadmap_bg.x = 224;
			self.table_banner_container.addChild(roadmap_bg);

			let lines = new createjs.Shape();
			lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0,0)
			self.table_banner_container.addChild(lines);
			let posY =  roadmap_bg.y;
			let posX =  roadmap_bg.x+71;

			for(var i = 0; i < 7 ; i++) {
				lines.graphics.moveTo(posX,posY+ (26.3*i)).lineTo((posX + 729 - 71), posY+ (26.3*i))
			}
			lines.graphics.moveTo(posX,posY)
			for(var i = 0; i < 25 ; i++) {
				lines.graphics.moveTo(posX+(26.3*i),posY).lineTo(posX+(26.3*i),posY + 158)
			}

			lines.shadow = new createjs.Shadow("#000",2,2,6);
			lines.alpha =.5;

			let adjustX = 200;
			let startX =  roadmap_bg.x+729;

			let hot_bg = new createjs.Shape();
			hot_bg.graphics.beginFill("#d32f2e").drawRect(startX+10,roadmap_bg.y,60,158);
			self.table_banner_container.addChild(hot_bg);

			let hot_label = this.getText(startX+40,roadmap_bg.y+5,window.language.sicbo.hotcaps,"14px lato","#fff","center","top");
			self.table_banner_container.addChild(hot_label);

			let cold_bg = new createjs.Shape();
			cold_bg.graphics.beginFill("#1665c1").drawRect(startX+70,roadmap_bg.y,60,158);
			self.table_banner_container.addChild(cold_bg);

			let cold_label = this.getText(startX+100,roadmap_bg.y+5,window.language.sicbo.coldcaps,"14px lato","#fff","center","top");
			self.table_banner_container.addChild(cold_label);


			self.hot_cold_res_container = new createjs.Container();
			self.hot_cold_res_container.x = startX+38;
			self.hot_cold_res_container.y = 96;
			self.table_banner_container.addChild(self.hot_cold_res_container);


			let lastresbg = new createjs.Shape();
			lastresbg.graphics.beginFill("#3f3f3f").drawRect(startX+140,roadmap_bg.y,120,158);
			self.table_banner_container.addChild(lastresbg);

			let label =  this.getText(startX+140+(120/2),roadmap_bg.y+5,window.language.sicbo.latestresultcaps, window.language.locale == "zh" ? "20px lato" : "14px lato","#fff","center","top");
			self.table_banner_container.addChild(label);


			let last150res_hightlight = new createjs.Shape();
			last150res_hightlight.graphics.ss(1).s("#545454").beginFill("#1c1c1c").drawRect(4,0,112,27);
			last150res_hightlight.y = 92;
			last150res_hightlight.x = startX+140;
			self.table_banner_container.addChild(last150res_hightlight);

			self.last150res_container = new createjs.Container();
			self.last150res_container.x = adjustX;
			self.last150res_container.y = 10;
			self.table_banner_container.addChild(self.last150res_container);

			// === percentages init()
			let bar_width = 140;
			let bar_height = 20;

			let grap_odd_even = new createjs.Container();
			self.odd_bar = new createjs.Shape();
			self.odd_bar.graphics.beginFill("#b71b1c").drawRect(0,0,bar_width,bar_height);
			self.odd_bar.setBounds(0,0,bar_width,bar_height);

			self.even_bar = new createjs.Shape();
			self.even_bar.graphics.beginFill("#0e47a1").drawRect(0,0,bar_width,bar_height);
			self.even_bar.setBounds(0,0,bar_width,bar_height);
			self.even_bar.x =  bar_width;
			self.even_bar.regX = bar_width;

			let odd_label = this.getText(-29,10,window.language.sicbo.oddcaps, window.language.locale == "zh" ? "16px lato" : "11px lato","#fff","center","middle");
			let even_label =  this.getText(bar_width + 30,10,window.language.sicbo.evencaps, window.language.locale == "zh" ? "16px lato" : "11px lato","#fff","center","middle");

			self.odd_val =  this.getText(0,bar_height,"0%","14px BebasNeue","#fff","left","top");
			self.even_val =  this.getText(bar_width,bar_height,"0%","14px BebasNeue","#fff","right","top");

			grap_odd_even.addChild(self.odd_bar,odd_label,self.odd_val,self.even_bar,even_label,self.even_val);
			grap_odd_even.set({x:1270,y:68});
			self.table_banner_container.addChild(grap_odd_even);

			let grap_big_small = new createjs.Container();
			self.big_bar = new createjs.Shape();
			self.big_bar.graphics.beginFill("#b71b1c").drawRect(0,0,bar_width,bar_height);
			self.big_bar.setBounds(0,0,bar_width,bar_height);

			self.small_bar = new createjs.Shape();
			self.small_bar.graphics.beginFill("#0e47a1").drawRect(0,0,bar_width,bar_height);
			self.small_bar.setBounds(0,0,bar_width,12);
			self.small_bar.x = bar_width;
			self.small_bar.regX = bar_width;

			let big_label = this.getText(-29,10,window.language.sicbo.bigcaps, window.language.locale == "zh" ? "16px lato" : "11px lato","#fff","center","middle");
			let small_label = this.getText(170,10,window.language.sicbo.smallcaps, window.language.locale == "zh" ? "16px lato" : "11px lato","#fff","center","middle");

			self.big_val =  this.getText(0,bar_height,"0%","14px BebasNeue","#fff","left","top");
			self.small_val =  this.getText(bar_width,bar_height,"0%","14px BebasNeue","#fff","right","top");

			grap_big_small.addChild(self.big_bar,big_label,self.big_val,self.small_bar,small_label,self.small_val);
			grap_big_small.set({x:1270,y:113});
			self.table_banner_container.addChild(grap_big_small);

			// === double triple data
			bar_width = 65;
			bar_height = 50;

			let grap_double_triple = new createjs.Container();

			let double_bg = new createjs.Shape();
			double_bg.graphics.beginFill("#e4b242").drawRoundRect(0,0,bar_width,bar_height,5);
			let double_text_bg = new createjs.Shape();
			double_text_bg.graphics.beginFill("#333333").drawRoundRect(5,20,bar_width-10,bar_height-25,3);
			let double_label = this.getText(bar_width/2,10,window.language.sicbo.doublecaps, window.language.locale == "zh" ? "bold 15px lato" : "bold 11px lato","#000","center","middle");
			self.double_val = this.getText(bar_width/2,25,"0","16px BebasNeue","#fff","center","top");//new createjs.Text("0","18px BebasNeue" ,"#000");

			let triple_bg = new createjs.Shape();
			triple_bg.graphics.beginFill("#e4b242").drawRoundRect(bar_width+10,0,bar_width,bar_height,5);
			let triple_text_bg = new createjs.Shape();
			triple_text_bg.graphics.beginFill("#333333").drawRoundRect(bar_width+15,20,bar_width-10,bar_height-25,3);
			let triple_label = this.getText(bar_width*2-(bar_width/2)+10,10,window.language.sicbo.triplecaps, window.language.locale == "zh" ? "bold 15px lato" : "bold 11px lato","#000","center","middle");
			self.triple_val = this.getText(bar_width*2-(bar_width/2)+10,25,"0","16px BebasNeue","#fff","center","top");//new createjs.Text("0","18px BebasNeue" ,"#000");
			grap_double_triple.addChild(double_bg,double_text_bg,double_label,self.double_val ,triple_bg,triple_text_bg,triple_label,self.triple_val);

			grap_double_triple.set({x:1270,y:160});
			self.table_banner_container.addChild(grap_double_triple);


			let mask = new createjs.Shape();
			mask.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(0,0,660,159);
			mask.x = 296;
			mask.y = 60;

			self.parity_container = new createjs.Container();
			self.parity_container.visible = false;
			self.parity_container.mask = mask;
			self.table_banner_container.addChild(self.parity_container);

			self.size_container = new createjs.Container();
			self.size_container.mask = mask;
			self.table_banner_container.addChild(self.size_container);

			self.sum_container = new createjs.Container();
			self.sum_container.visible = false;
			self.sum_container.mask = mask;
			self.table_banner_container.addChild(self.sum_container);

			self.dice_container = new createjs.Container();
			self.dice_container.visible = false;
			self.dice_container.mask = mask;
			self.table_banner_container.addChild(self.dice_container);

			let scoreboard_text = [window.language.sicbo.bigsmallcaps,window.language.sicbo.oddevencaps,window.language.sicbo.sumcaps, window.language.sicbo.dicecaps];
			let scoreboard_type = ["BIG/SMALL", "ODD/EVEN","SUM", "DICE"];
			self.button = [];

			for(var i = 0; i < scoreboard_text.length; i++) {
				self.button[i] = new createjs.Shape();
				self.button[i].graphics.beginLinearGradientFill(["#d9bf6b","#efde80","#d9bf6b"], [0,0.5,1], 0,0,64,0,100).drawRoundRect(0,0,64,33,4);
				self.button[i].y = (i*38.5) + 64;
				self.button[i].x = 227;
				self.button[i].cursor = 'pointer';
				self.button[i].type = scoreboard_type[i];
        self.button[i].state = "normal";
				self.table_banner_container.addChild(self.button[i]);

				self.button[i].text = new createjs.Text(scoreboard_text[i], window.language.locale == "zh" ? "bold 13px LatoRegular" : "bold 10px LatoRegular" , "#000");
				self.button[i].text.x = self.button[i].x + (64/2);
				self.button[i].text.y = self.button[i].y + (32/2);
				self.button[i].text.textAlign = "center";
				self.button[i].text.textBaseline = "middle";
				self.button[i].text.hitArea = self.button[i];
				self.table_banner_container.addChild(self.button[i].text);

				self.button[i].changeState = function(e,type) {
          if (e.state == "active") return;
					if(type == "hover") {
						e.graphics.clear().beginLinearGradientFill(["#8e7c45","#b59e58","#8e7c45"], [0,0.5,1], 0,0,64,0,100).drawRoundRect(0,0,64,33,4);
            e.text.color = "#fff";
					} else {
						e.graphics.clear().beginLinearGradientFill(["#d9bf6b","#efde80","#d9bf6b"], [0,0.5,1], 0,0,64,0,100).drawRoundRect(0,0,64,33,4);
            e.text.color = "#000";
					}
				} // end hover

				self.button[i].on("mouseover",(e)=> {
					e.target.changeState(e.target,"hover");
				});

				self.button[i].on("mouseout",(e)=> {
					e.target.changeState(e.target);
				});

				self.button[i].on("click", (e) => {
          self.button.forEach((o) => {
            o.state = "normal";
            o.changeState(o);
          });
          e.target.changeState(e.target, "hover");
          e.target.state = "active";
					self.size_container.visible = false;
					self.sum_container.visible = false;
					self.dice_container.visible = false;
					self.parity_container.visible = false;
					switch (e.target.type.toLowerCase()) {
						case "odd/even" :
							self.parity_container.visible = true;
							break;
						case "big/small" :
							self.size_container.visible = true;
							break;
						case "sum" :
							self.sum_container.visible = true;
							break;
						case "dice" :
							self.dice_container.visible = true;
							break;
					}
				});
			}

      // default visible is size scoreboard
      self.button[0].graphics.clear().beginLinearGradientFill(["#8e7c45","#b59e58","#8e7c45"], [0,0.5,1], 0,0,64,0,100).drawRoundRect(0,0,64,33,4);
      self.button[0].state = "active";
      self.button[0].text.color = "#fff";

		},
		setHotCold (data) {

			if(self.hot_cold_res_container) {
				self.hot_cold_res_container.removeAllChildren();
			}

			data.forEach(function (row) {
				row.total = _.reduce( [JSON.parse(row.game_info).one,JSON.parse(row.game_info).two,JSON.parse(row.game_info).three] , function (sum, n) {
					return parseInt(sum) + parseInt(n);
				});
			});

			let res =_.sortBy( _.groupBy(data, function(row) {
			 	return row.total
			 }), 'length');

			let cold_res = res.slice(0,5);

			let hot_res = res.slice(Math.max(res.length - 5, 1));

			hot_res = _.map(hot_res, function (e) {
				return e[0].total
			});

			cold_res = _.map(cold_res, function (e) {
				return e[0].total
			});

			hot_res.forEach(function (e, i) {
				let text = new createjs.Text(e, "20px BebasNeue" ,"#fff");
				text.y = i*24;
				text.textAlign = "center";
				self.hot_cold_res_container.addChild(text)
			});

			cold_res.forEach(function (e, i) {
				let text = new createjs.Text(e, "20px BebasNeue" ,"#fff");
				text.y = i*24;
				text.x = 60;
				text.textAlign = "center";
				self.hot_cold_res_container.addChild(text)
			});
		},
		set150res (data) {

			if(self.last150res_container) {
				self.last150res_container.removeAllChildren();
			}
			let last150 = [];
			if(data.length > 5) {
				last150 = data.slice(Math.max(data.length - 5, 1)).reverse();
			} else {
				last150 = data
			}
			let dice_res = [];
			for(var i = 0; i < last150.length; i++) {
				let dice = [JSON.parse(last150[i].game_info).one, JSON.parse(last150[i].game_info).two, JSON.parse(last150[i].game_info).three];

				dice_res.push({
					dice1 : new createjs.Bitmap("/img/dice/dice_small/dice"+dice[0]+".png"),
					dice2 : new createjs.Bitmap("/img/dice/dice_small/dice"+dice[1]+".png"),
					dice3 : new createjs.Bitmap("/img/dice/dice_small/dice"+dice[2]+".png")
				});

				dice_res[dice_res.length-1].dice1.x = 900;
				dice_res[dice_res.length-1].dice1.y = 86 + (i *24);
				dice_res[dice_res.length-1].dice1.scaleX = dice_res[dice_res.length-1].dice1.scaleY = 0.9;

				dice_res[dice_res.length-1].dice2.x = 924;
				dice_res[dice_res.length-1].dice2.y = 86 +(i *24);
				dice_res[dice_res.length-1].dice2.scaleX = dice_res[dice_res.length-1].dice2.scaleY = 0.9;

				dice_res[dice_res.length-1].dice3.x = 948;
				dice_res[dice_res.length-1].dice3.y = 86 +(i *24);
				dice_res[dice_res.length-1].dice3.scaleX = dice_res[dice_res.length-1].dice3.scaleY = 0.9;

				self.last150res_container.addChild(dice_res[dice_res.length-1].dice1,dice_res[dice_res.length-1].dice2,dice_res[dice_res.length-1].dice3)

				let total = _.reduce(dice , function (sum, n) {
							return parseInt(sum) + parseInt(n);
						});

				let uniqDice = _.uniq(dice);

				let text;
				let text_res;

				if(window.language.locale == "zh") {
								text = uniqDice.length == 1 ? "和" : (total >= 11 ? "大" : "小");
								text_res = new createjs.Text(text +" "+total ,"bold 16px BebasNeue", text == "和" ? "#3aa955": (text == "大"? "#d22f2f"  : "#1665c1"))
				} else {
								text = uniqDice.length == 1 ? "T" : (total >= 11 ? "B" : "S");
								text_res = new createjs.Text(text +" "+total ,"bold 18px BebasNeue", text == "T" ? "#3aa955": (text == "B"? "#d22f2f"  : "#1665c1"))
				}

				if(window.language.locale == "zh") {
								text_res.x = 975;
				} else {
								text_res.x = 980;
				}
				text_res.y = 87 +(i *24);
				self.last150res_container.addChild(text_res);

			}

		},
		setPercentage (data) {
			let data2 = _.map(data, function (e) {
				return JSON.parse(e.game_info).one + ""+JSON.parse(e.game_info).two+ "" +JSON.parse(e.game_info).three;
			});

			let sum_data = [];

			data2.forEach(function (e) {
				sum_data.push(_.reduce (e, function (sum, n) {
					return parseInt(sum) + parseInt(n)
				}));
			});

			let odd_count = 0;
			let even_count = 0;
			let big_count = 0;
			let small_count = 0;

			sum_data.forEach(function (e) {
				if(e % 2 == 0) {
					even_count++;
				} else {
					odd_count++;
				}

				if(e >= 10) {
					big_count++;
				} else {
					small_count++;
				}
			});

			self.odd_bar.scaleX = odd_count/data2.length;
			self.even_bar.scaleX = even_count/data2.length;
			self.big_bar.scaleX = big_count/data2.length;
			self.small_bar.scaleX = small_count/data2.length;

			self.odd_val.text = Math.round((odd_count/data2.length) *100) + "%";
			self.even_val.text = Math.round((even_count/data2.length) *100) + "%";
			self.big_val.text = Math.round((big_count/data2.length) *100) + "%"
			self.small_val.text = Math.round((small_count/data2.length) *100) + "%"

		},
		doubleTripleCount (data) {
			let data2 = _.map(data, function (e) {
				return JSON.parse(e.game_info);
			});

			let double_count = 0;
			let triple_count = 0;

			data2.forEach(function (e) {
				if(_.uniq([e.one,e.two, e.three]).length == 2 ) {
					double_count++;
				} else if(_.uniq([e.one,e.two, e.three]).length == 1) {
					triple_count++;
				}
			})

			self.double_val.text = double_count;
			self.triple_val.text = triple_count;
		},
		drawSBRoadMap (rm_data) {

			for(var key in rm_data) {

				if(self[key+"_container"]) {
					self[key+"_container"].removeAllChildren();
					self[key+"_container"].x = 308;
					self[key+"_container"].y = 70.5 ;
				}

				let color = "";
				let text_val = "";
				let font_size = "bold 13px lato";
				let color_text = "";

				let arr = rm_data[key];

				for(var e = 0; e< arr.length;e++) {
					if(arr[e] !== undefined) {
						for(var i = 0; i < arr[e].length; i++) {
							if(arr[e][i] !== undefined) {

								color = "#e5b241";
								text_val = arr[e][i];

								if(text_val.length > 2) {
									font_size = "bold 10px lato"
								}

								if (arr[e][i] == "odd") {
									font_size = window.language.locale == "zh" ? "17px lato" : "bold 13px lato";
									color = "#d32f2f";
									text_val = window.language.locale == "zh" ? "单" : "O";
									color_text = "#fff";
								}
								if (arr[e][i] == "even") {
									font_size = window.language.locale == "zh" ? "17px lato" : "bold 13px lato";
									color = "#1565c0";
									text_val = window.language.locale == "zh" ? "双" : "E";
									color_text = "#fff"
								}
								if (arr[e][i] == "big") {
									font_size = window.language.locale == "zh" ? "17px lato" : "bold 13px lato";
									color = "#d32f2f";
									text_val = window.language.locale == "zh" ? "大" : "B";
									color_text = "#fff";
								}
								if (arr[e][i] == "small") {
									font_size = window.language.locale == "zh" ? "17px lato" : "bold 13px lato";
									color = "#1565c0";
									text_val = window.language.locale == "zh" ? "小" : "S";
									color_text = "#fff";
								}
								if (arr[e][i] == "triple") {
									font_size = window.language.locale == "zh" ? "17px lato" : "bold 13px lato";
									color = "#41a257";
									text_val = window.language.locale == "zh" ? "和" : "T";
									color_text = "#fff";
								}

								arr[e][i] = new createjs.Shape();
								arr[e][i].graphics.beginFill(color).drawCircle(0.2,3.5,12.5);
								arr[e][i].x = e*26.3;
								arr[e][i].y = i*26.5;

								arr[e][i].text = new createjs.Text(text_val, font_size, color_text);
								arr[e][i].text.x = arr[e][i].x;
								arr[e][i].text.y = arr[e][i].y + 2;

								arr[e][i].text.textAlign = "center";
								arr[e][i].text.textBaseline = "middle";

								self[key+"_container"].addChild(arr[e][i], arr[e][i].text);
							}
						} //end for
					} //end if

				} //end for

				// this.moveRoadMap(rm_data[key], key);

			}
		}, //end of roadmap
		moveRoadMap (arr,sel ) {

			let p_count = 0;

			for(var i = 0; i < arr.length; i++) {
				if(i > 23) {
					if(arr[i][0] !== undefined || arr[i][1] !== undefined || arr[i][2] !== undefined || arr[i][3] !== undefined || arr[i][4] !== undefined || arr[i][5] !== undefined
						|| arr[i][6] !== undefined || arr[i][7] !== undefined) {
						p_count++;
					}
				}
			}
			self[sel+"_container"].x = 308 + ((p_count*26.3)* (-1)) ;
		},
		// *** baccarat *** //
		bcBannerTable (data) {

			//슈카운트 표시
			let deal_ct = new createjs.Container();
			let deal_label = this.getText(0,0,window.language.lobby.deal + ":","18px lato","#b5b5b5","left","top");
			self.deal_count = this.getText(177,4,data.marks.length,"18px bebasNeue","#b5b5b5","right","top");
			deal_ct.addChild(deal_label,self.deal_count);
			deal_ct.set({x:23,y:117+25});
			self.table_banner_container.addChild(deal_ct);


			//percentageset
			let bar_x = 20;
			let bar_y = 200;
			let bar_width = 184;
			let bar_height = 18;

			self.player_bar = new createjs.Shape()
			self.player_bar.graphics.beginFill("#0e47a1").drawRect(0,0,bar_width,bar_height);
			self.player_bar.y = bar_y;
			self.player_bar.x = bar_x;
			self.player_bar.scaleX = 0.1;
			self.player_bar.setBounds(0,0,bar_width,bar_height);
			self.table_banner_container.addChild(self.player_bar);

			self.tie_bar = new createjs.Shape()
			self.tie_bar.graphics.beginFill("green").drawRect(0,0,bar_width,bar_height);
			self.tie_bar.y = bar_y
			self.tie_bar.setBounds(0,0,bar_width,bar_height);
			self.tie_bar.regX = bar_width/2;
			self.tie_bar.scaleX = .4;
			self.tie_bar.x = bar_x  + self.player_bar.getTransformedBounds().width + (self.tie_bar.getTransformedBounds().width/2)
			self.table_banner_container.addChild(self.tie_bar);

			self.banker_bar = new createjs.Shape()
			self.banker_bar.graphics.beginFill("#b71b1c").drawRect(0,0,bar_width,18);
			self.banker_bar.y = bar_y
			self.banker_bar.regX = bar_width;
			self.banker_bar.x = bar_x  + bar_width
			self.banker_bar.scaleX = .5;
			self.banker_bar.setBounds(0,0,bar_width,bar_height);
			self.table_banner_container.addChild(self.banker_bar);


			self.player_val = this.getText( self.player_bar.x+2,self.player_bar.y,"0%","18px BebasNeue","#fff","left","top");// new createjs.Text("0%", "18px BebasNeue","#fff");
			self.table_banner_container.addChild(self.player_val);

			self.tie_val =  this.getText( self.tie_bar.x+2,self.tie_bar.y,"","18px BebasNeue","#fff","center","top");// new createjs.Text("0%", "18px BebasNeue","#fff");
			self.table_banner_container.addChild(self.tie_val);

			self.banker_val =  this.getText( self.banker_bar.x-2,self.banker_bar.y,"0%","18px BebasNeue","#fff","right","top");//new createjs.Text("0%", "18px BebasNeue","#fff");
			self.table_banner_container.addChild(self.banker_val);

			/***************************************************************************/
			let roadmap_ct = new createjs.Container();
			let baccarat_rm = new createjs.Shape();
			baccarat_rm.graphics.beginFill("#fff").drawRect(0,0,1034,158);
			baccarat_rm.cache(0,0,1034,158);
			roadmap_ct.addChild(baccarat_rm);
			roadmap_ct.set({x:224,y:61});
			self.table_banner_container.addChild(roadmap_ct);

			let lines = new createjs.Shape();
			lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0,0);
			roadmap_ct.addChild(lines);

			let posY = 0;// roadmap_bg.y;
			let posX = 0;// roadmap_bg.x;
			lines.graphics.moveTo(posX,posY);
			for(var i = 0; i <= 6 ; i++) {
				lines.graphics.moveTo(posX,posY+ (26.3*i)).lineTo(posX + 315.6, posY+ (26.3*i));
			}

			for(var i = 0; i <= 12 ; i++) {
				lines.graphics.moveTo(posX+(26.3*i),posY).lineTo(posX+(26.3*i),posY+158);
			}


			for(var i = 0; i <= 9 ; i++) {
				lines.graphics.moveTo(posX+315.6,posY+ (17.53*i)).lineTo(1034, posY+ (17.53*i));
			}

			for(var i = 0; i <= 41 ; i++) {
				var x=posX+315.6+(17.53*i);
				lines.graphics.moveTo(x,posY).lineTo(x, posY+ 158);
			}


			lines.graphics.ss(1.5);
			lines.graphics.moveTo(posX+315.6,0).lineTo(posX+315.6, 158);
			lines.graphics.moveTo(posX+315.6,posY+ (17.53*6)).lineTo(1034, posY+ (17.53*6));

			lines.graphics.moveTo(posX+315.6+(17.53*14),105.3).lineTo(posX+315.6+(17.53*14), 158);
			lines.graphics.moveTo(posX+315.6+(17.53*28),105.3).lineTo(posX+315.6+(17.53*28), 158);

			lines.shadow = new createjs.Shadow("#000",2,2,6);
			lines.alpha =.5;
			/***************************************************************************/

			// === count bg
			let bg = [];
			for(var i = 0; i < 6; i++) {
				bg[i] = new createjs.Shape();
				bg[i].graphics.beginFill("#0c3e66").drawRoundRect(0,0,56,32,8);
				bg[i].x = (i*64) + 1276 + 1;
				bg[i].y = 80;
				if(i > 2) {
					bg[i].graphics.clear().beginFill("#7e1d1e").drawRoundRect(0,0,56,32,8);
					bg[i].x = ((i-3)*64) + 1276 + 1;
					bg[i].y = 124;
				}
				self.table_banner_container.addChild(bg[i]);
			}

			let tie_bg = new createjs.Shape();
			tie_bg.graphics.beginFill("#557f2d").drawRoundRect(0,0,56,32,8);
			tie_bg.y = 168;
			tie_bg.x = 1276 + 62 + 1;
			self.table_banner_container.addChild(tie_bg);

			/**
			 * cosmetics start here
			 */

			self.player_indi = new createjs.Container();
			self.playerpair_indi = new createjs.Container();
			self.playernat_indi = new createjs.Container();

			self.banker_indi = new createjs.Container();
			self.bankerpair_indi = new createjs.Container();
			self.bankernat_indi = new createjs.Container();

			self.tie_indi = new createjs.Container();

			let offsetX = 14;
			let offsetY = 16;

			self.player_indi.x = bg[0].x + offsetX;
			self.player_indi.y = bg[0].y+ offsetY;
			self.playerpair_indi.x = bg[1].x + offsetX
			self.playerpair_indi.y = bg[1].y+ offsetY
			self.playernat_indi.x = bg[2].x + offsetX
			self.playernat_indi.y = bg[2].y + offsetY

			self.tie_indi.x = tie_bg.x + offsetX;
			self.tie_indi.y = tie_bg.y + offsetY;

			self.banker_indi.x = bg[3].x + offsetX;
			self.banker_indi.y = bg[3].y + offsetY;
			self.bankerpair_indi.x = bg[4].x + offsetX;
			self.bankerpair_indi.y = bg[4].y + offsetY;
			self.bankernat_indi.x = bg[5].x + offsetX;
			self.bankernat_indi.y = bg[5].y + offsetY;


			self.table_banner_container.addChild(self.player_indi, self.playerpair_indi, self.playernat_indi, self.banker_indi, self.bankerpair_indi, self.bankernat_indi, self.tie_indi);

			// === player count cosmetics
			let player_indi = new createjs.Shape();
			player_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
			self.player_indi.addChild(player_indi);

			let p_text = this.getText( player_indi.x,player_indi.y, window.language.locale == "zh" ? "闲" : "P","12px lato","#fff","center","middle"); //new createjs.Text("P","12px lato", "#fff");
			self.player_indi.addChild(p_text);

			//playerpair
			let playerpair_indi =  new createjs.Shape();
			playerpair_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
			self.playerpair_indi.addChild(playerpair_indi);

			let p_text2 = this.getText( playerpair_indi.x,playerpair_indi.y, window.language.locale == "zh" ? "闲" : "P","12px lato","#fff","center","middle"); //new createjs.Text("P","12px lato", "#fff");
			self.playerpair_indi.addChild(p_text2);

			let playerpair_indi2 =  new createjs.Shape();
			playerpair_indi2.graphics.ss(0.5).s("#fff").beginFill("#1465bf").drawCircle(0,0,3.5);
			playerpair_indi2.x = 6;
			playerpair_indi2.y = 5;
			self.playerpair_indi.addChild(playerpair_indi2);

			//playernatural
			let playernat_indi =  new createjs.Shape();
			playernat_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
			self.playernat_indi.addChild(playernat_indi);

			let n_text = this.getText( playernat_indi.x,playernat_indi.y, window.language.locale == "zh" ? "例" : "N","12px lato","#fff","center","middle");//  new createjs.Text("N","12px lato", "#fff");
			self.playernat_indi.addChild(n_text);

			//tie
			let tie_indi =  new createjs.Shape();
			tie_indi.graphics.ss(1).s("#fff").beginFill("#689f39").drawCircle(0,0,9);
			self.tie_indi.addChild(tie_indi);

			let t_text = this.getText( tie_indi.x,tie_indi.y, window.language.locale == "zh" ? "和" : "T","12px lato","#fff","center","middle"); //new createjs.Text("T","12px lato", "#fff");
			self.tie_indi.addChild(t_text);

			//bankernatural
			let bankernat_indi = new createjs.Shape();
			bankernat_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
			self.bankernat_indi.addChild(bankernat_indi);

			let n_text2 = this.getText( bankernat_indi.x,bankernat_indi.y, window.language.locale == "zh" ? "例" : "N","12px lato","#fff","center","middle"); // new createjs.Text("N","12px lato", "#fff");
			self.bankernat_indi.addChild(n_text2);

			//bankerpair
			let bankerpair_indi = new createjs.Shape();
			bankerpair_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
			self.bankerpair_indi.addChild(bankerpair_indi);

			let bankerpair_indi2 =  new createjs.Shape();
			bankerpair_indi2.graphics.ss(0.5).s("#fff").beginFill("#d42e2e").drawCircle(0,0,3.5);
			bankerpair_indi2.x = -6;
			bankerpair_indi2.y = -6;
			self.bankerpair_indi.addChild(bankerpair_indi2);

			let b_text2 = this.getText( bankerpair_indi.x,bankerpair_indi.y, window.language.locale == "zh" ? "庄" : "B","12px lato","#fff","center","middle"); // new createjs.Text("B","12px lato", "#fff");
			self.bankerpair_indi.addChild(b_text2);

			//banker
			let banker_indi = new createjs.Shape();
			banker_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
			self.banker_indi.addChild(banker_indi);

			let b_text =  this.getText( banker_indi.x,banker_indi.y, window.language.locale == "zh" ? "庄" : "B","12px lato","#fff","center","middle"); // new createjs.Text("B","12px lato", "#fff");
			self.banker_indi.addChild(b_text);

			let xBox = 50;
			let yBox = 18;
			self.player_count =  this.getText( bg[0].x + xBox,bg[0].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //new createjs.Text("0","22px BebasNeue","#fff")
			self.table_banner_container.addChild(self.player_count);

			self.playerpair_count =  this.getText( bg[1].x + xBox,bg[1].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //new createjs.Text("0","22px BebasNeue","#fff")
			self.table_banner_container.addChild(self.playerpair_count);

			self.playernatural_count = this.getText( bg[2].x + xBox,bg[2].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //new createjs.Text("0","22px BebasNeue","#fff")
			self.table_banner_container.addChild(self.playernatural_count);

			self.banker_count = this.getText( bg[3].x + xBox,bg[3].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //new createjs.Text("0","22px BebasNeue","#fff");
			self.table_banner_container.addChild(self.banker_count);

			self.bankerpair_count  = this.getText( bg[4].x + xBox,bg[4].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //= new createjs.Text("0","22px BebasNeue","#fff");
			self.table_banner_container.addChild(self.bankerpair_count);

			self.bankernatural_count = this.getText( bg[5].x + xBox,bg[5].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //new createjs.Text("0","22px BebasNeue","#fff");
			self.table_banner_container.addChild(self.bankernatural_count);

			self.tie_count = this.getText(tie_bg.x + xBox,tie_bg.y + yBox,"0","22px BebasNeue","#fff","right","middle"); // new createjs.Text("0","22px BebasNeue","#fff");
			self.table_banner_container.addChild(self.tie_count);


			self.pearlRoad_container = new createjs.Container();
			self.pearlRoad_container.x = 221.5;
			self.pearlRoad_container.y = 59.5;
			self.pearlRoad_container.textAlign = "right"
      		self.pearlRoad_container.textBaseline = "middle"
			self.table_banner_container.addChild(self.pearlRoad_container);

			let pearl_mask = new createjs.Shape();
			pearl_mask.graphics.drawRect(0,0,310,160);
			pearl_mask.x =  self.pearlRoad_container.x;
			pearl_mask.y =  self.pearlRoad_container.y;
			self.pearlRoad_container.mask = pearl_mask;
			self.table_banner_container.addChild(pearl_mask);

			self.bigRoad_container = new createjs.Container();
			self.table_banner_container.addChild(self.bigRoad_container);

			self.bigRoad_container.x = self.pearlRoad_container.x + 315.5;
			self.bigRoad_container.y = self.pearlRoad_container.y;

			let bigroad_mask = new createjs.Shape();
			bigroad_mask.graphics.beginFill("red").drawRect(0,0,740,108);
			bigroad_mask.x = self.bigRoad_container.x;
			bigroad_mask.y = self.bigRoad_container.y;
			self.bigRoad_container.mask = bigroad_mask;

			let bigeye_mask = new createjs.Shape();
			bigeye_mask.graphics.beginFill("red").drawRect(0,0,240,90);
			bigeye_mask.x = 534;
			bigeye_mask.y = 160;

			self.bigeyeboy_container = new createjs.Container();
			self.bigeyeboy_container.x = self.bigRoad_container.x + 1
			self.bigeyeboy_container.y = self.bigRoad_container.y + 106;
			self.bigeyeboy_container.mask = bigeye_mask;
			self.table_banner_container.addChild(self.bigeyeboy_container);

			self.small_container = new createjs.Container();
			self.small_container.x = self.bigRoad_container.x + 247
			self.small_container.y = self.bigRoad_container.y + 106;
			self.table_banner_container.addChild(self.small_container);

			self.cockroach_container = new createjs.Container();
			self.cockroach_container.x = self.bigRoad_container.x + 493
			self.cockroach_container.y = self.bigRoad_container.y + 106;
			self.table_banner_container.addChild(self.cockroach_container);
		},
		getText(x,y,text,font,color,align,valign){
			let ctrl = new createjs.Text(text,font,color);
			ctrl.x = x;
			ctrl.y = y;
			ctrl.textAlign = align;
      		ctrl.textBaseline = valign;//"middle"
      		return ctrl;
		},

		bcmoveRoadMap (arr,sel, row, col ) {

			let p_count = 0;

			let lala = false;

			let defined_count = 0;

			for(var i = 0; i < arr[0].length; i++) {
				if(arr[0][i] !== undefined) defined_count++;
			}

			if(defined_count > col-1) {
				p_count = defined_count-(col);
			}

			if(sel == "pearlroad") {
				self.pearlRoad_container.x = 223 + ((p_count*26.2)* (-1)) ;
			} else if(sel == "bigroad") {
				self.bigRoad_container.x = (223 +315.5) + ((p_count*17.5)* (-1)) ;
			}
		},
		bcSetCount (data) {
			data =  _.filter(data, function (e) {
				return e;
			});

			let count = _.groupBy(data, function (e) {
				return e.mark;
			});
			let player_count = 0;
			let banker_count = 0;
			let tie_count = 0;

			let player_pair_cnt = 0;
			let banker_pair_cnt = 0;

			let banker_natural_cnt = 0;
			let player_natural_cnt = 0;

			let natural = {
				player: 0,
				banker: 0
			};

			data.forEach(function (e) {
				if(e.mark == "b" || e.mark == "q" || e.mark == "w"|| e.mark == "e") {
					banker_count ++
				} else if(e.mark  == "p" || e.mark  == "f" || e.mark  == "g" || e.mark  == "h" ) {
					player_count ++
				}
				 else if(e.mark  == "t" || e.mark  == "i" || e.mark  == "j" || e.mark  == "k" ) {
					tie_count ++
				}

				if(e.mark == "q" || e.mark == "w" || e.mark == "f" || e.mark == "g" || e.mark == "i" || e.mark == "j") {
					banker_pair_cnt ++;
				}

				if(e.mark == "w" || e.mark == "e" || e.mark == "g" || e.mark == "h"  || e.mark == "j" || e.mark == "k") {
					player_pair_cnt ++;
				}
				_.forEach(e.natural, (element) => {
				   	natural[element]++;
				})

				// if((e.mark == "b" || e.mark == "q" || e.mark == "w" || e.mark == "e") && (e.num == 9 || e.num == 8)) {
				// 	banker_natural_cnt ++;
				// }

				// if((e.mark == "p" || e.mark == "f" || e.mark == "g" || e.mark == "h") && (e.num == 9 || e.num == 8)) {
				// 	player_natural_cnt ++;
				// }
			});

			self.player_val.text = Math.round(player_count/(data.length ? data.length : 1)*100) + "%";
			self.tie_val.text = Math.round(tie_count/(data.length ? data.length : 1)*100) < 10 ? "" : Math.round(tie_count/(data.length ? data.length : 1)*100) + "%";
			self.banker_val.text = Math.round(banker_count/(data.length ? data.length : 1)*100) + "%";

			self.player_count.text = player_count;
			self.playerpair_count.text = player_pair_cnt;
			self.playernatural_count.text = natural.player; //player_natural_cnt;
			self.tie_count.text = tie_count;
			self.banker_count.text = banker_count;
			self.bankerpair_count.text = banker_pair_cnt;
			self.bankernatural_count.text = natural.banker;


			if(data.length>0){
				self.player_val.text = Math.round(player_count/(data.length ? data.length : 1)*100) + "%";
				self.tie_val.text = Math.round(tie_count/(data.length ? data.length : 1)*100) < 10 ? "" : Math.round(tie_count/(data.length ? data.length : 1)*100)+ "%";
				self.banker_val.text = Math.round(banker_count/(data.length ? data.length : 1)*100) + "%";


				createjs.Tween.get(self.player_bar)
				.to({
					scaleX : (player_count)/data.length
				},150).call(function(){
					//self.tie_bar.setBounds(0,0,176,18);
				//	self.tie_bar.scaleX = rmcount.tie/rmcount.total;
					self.tie_bar.x = 20  + self.player_bar.getTransformedBounds().width + (self.tie_bar.getTransformedBounds().width/2)
					self.tie_val.x = self.tie_bar.x;
				})

				createjs.Tween.get(self.tie_bar)
				.to({
					scaleX : (tie_count)/data.length
				},150)

				createjs.Tween.get(self.banker_bar)
				.to({
					scaleX : (banker_count)/data.length
				},150)

			}else{

				self.player_val.text = "0%";
				self.tie_val.text = "";
				self.banker_val.text = "0%";
				player_count=5;
				banker_count=5;
				tie_count=5;
				data.length=15;
				createjs.Tween.get(self.player_bar)
				.to({
					scaleX : (player_count)/data.length
				},150).call(function(){
					//self.tie_bar.setBounds(0,0,176,18);
				//	self.tie_bar.scaleX = rmcount.tie/rmcount.total;
					self.tie_bar.x = 20  + self.player_bar.getTransformedBounds().width + (self.tie_bar.getTransformedBounds().width/2)
					self.tie_val.x = self.tie_bar.x;
				})

				createjs.Tween.get(self.tie_bar)
				.to({
					scaleX : (tie_count)/data.length
				},150)

				createjs.Tween.get(self.banker_bar)
				.to({
					scaleX : (banker_count)/data.length
				},150)
			}

		},
		bcPearlRoad (data) {
			self.pearlRoad_container.removeAllChildren();

			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;

					let sp = createSpriteRoadMap(window.language.locale == "zh" ? "/img/all_scoreboard_zh.png" : "/img/all_scoreboard.png" , 40,40, sp);
					sp.x = e * 26.35;
					sp.y = i * 26.2;
					sp.scaleY = sp.scaleX = 0.74
					sp.gotoAndStop("pearl-"+data.matrix[i][e].mark);
					self.pearlRoad_container.addChild(sp);

				}
			} //end for

			this.bcmoveRoadMap(data.matrix, "pearlroad", 6, 11);
		},
		bcBigRoad (data) {
			self.bigRoad_container.removeAllChildren();

			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;

					let sp = createSpriteRoadMap("/img/all_scoreboard_20.png", 20, 20, sp);
					sp.x = (e * 17.5) + 0.7;
					sp.y = i * 17.5;
					// sp.scaleY = sp.scaleX = 0.8;
					if(data.matrix[i][e].ties) {
						if(data.matrix[i][e].ties > 1) {
							let tie_text = new createjs.Text(data.matrix[i][e].ties, "bold 18px BebasNeue","#000");
							tie_text.y = sp.y + (20/2) + 1;
							tie_text.x = sp.x  + (18.6)/2;
							tie_text.textAlign = "center";
							tie_text.textBaseline = "middle";
							self.bigRoad_container.addChild(tie_text);
						}
						sp.gotoAndStop("big-"+data.matrix[i][e].mark+"-t");
					} else {
						sp.gotoAndStop("big-"+data.matrix[i][e].mark);
					}
					self.bigRoad_container.addChild(sp);

				}
			} //end for

			this.bcmoveRoadMap(data.matrix, "bigroad", 6, 40);
		},
		bcBigEyeBoy (data) {
			self.bigeyeboy_container.removeAllChildren();
			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					let sp = createSpriteRoadMap("/img/all_scoreboard_16.png" , 16,16, sp);
					sp.y = i * 8.7;
					sp.x = e * 8.82;
					sp.scaleX = sp.scaleY = .6;
					sp.gotoAndStop("bigeye-"+data.matrix[i][e].mark);
					self.bigeyeboy_container.addChild(sp);
				}
			}
		},
		drawSmallRoad (data) {
			self.small_container.removeAllChildren();
			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					let sp = createSpriteRoadMap("/img/all_scoreboard_16.png" , 16,16, sp);
					sp.y = i * 8.7;
					sp.x = e * 8.82;
					sp.scaleX = sp.scaleY = .6;
					sp.gotoAndStop("bigsmall-"+data.matrix[i][e].mark);
					self.small_container.addChild(sp);
				}
			}
		},
		drawCockroachRoad (data) {
			self.cockroach_container.removeAllChildren();
			for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					let sp = createSpriteRoadMap("/img/all_scoreboard_16.png" , 16,16, sp);
					sp.y = i * 8.7;
					sp.x = e * 8.82;
					//sp.scaleX = sp.scaleY = .6;
					sp.scaleX = sp.scaleY = .55
					sp.gotoAndStop("roach-"+data.matrix[i][e].mark);
					self.cockroach_container.addChild(sp);
				}
			}
		},
		dtBannerTable(data) {


			//슈카운트 표시
			let deal_ct = new createjs.Container();
			let deal_label = this.getText(0,0,window.language.lobby.deal + ":","18px lato","#b5b5b5","left","top");
			self.deal_count = this.getText(177,4,data.marks.length,"18px bebasNeue","#b5b5b5","right","top");
			deal_ct.addChild(deal_label,self.deal_count);
			deal_ct.set({x:23,y:117+25});
			self.table_banner_container.addChild(deal_ct);



			// === roadmap
			/***************************************************************************/
			let roadmap_ct = new createjs.Container();
			let baccarat_rm = new createjs.Shape();
			baccarat_rm.graphics.beginFill("#fff").drawRect(0,0,1034,158);
			baccarat_rm.cache(0,0,1034,158);
			roadmap_ct.addChild(baccarat_rm);
			roadmap_ct.set({x:224,y:61});
			self.table_banner_container.addChild(roadmap_ct);

			let lines = new createjs.Shape();
			lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0,0);
			roadmap_ct.addChild(lines);

			let posY = 0;// roadmap_bg.y;
			let posX = 0;// roadmap_bg.x;
			lines.graphics.moveTo(posX,posY);
			for(var i = 0; i <= 6 ; i++) {
				lines.graphics.moveTo(posX,posY+ (26.3*i)).lineTo(posX + 315.6, posY+ (26.3*i));
			}

			for(var i = 0; i <= 12 ; i++) {
				lines.graphics.moveTo(posX+(26.3*i),posY).lineTo(posX+(26.3*i),posY+158);
			}


			for(var i = 0; i <= 9 ; i++) {
				lines.graphics.moveTo(posX+315.6,posY+ (17.53*i)).lineTo(1034, posY+ (17.53*i));
			}

			for(var i = 0; i <= 41 ; i++) {
				var x=posX+315.6+(17.53*i);
				lines.graphics.moveTo(x,posY).lineTo(x, posY+ 158);
			}


			lines.graphics.ss(1.5);
			lines.graphics.moveTo(posX+315.6,0).lineTo(posX+315.6, 158);
			lines.graphics.moveTo(posX+315.6,posY+ (17.53*6)).lineTo(1034, posY+ (17.53*6));

			lines.graphics.moveTo(posX+315.6+(17.53*14),105.3).lineTo(posX+315.6+(17.53*14), 158);
			lines.graphics.moveTo(posX+315.6+(17.53*28),105.3).lineTo(posX+315.6+(17.53*28), 158);

			lines.shadow = new createjs.Shadow("#000",2,2,6);
			lines.alpha =.5;
			/***************************************************************************/
			//percentageset
			let bar_x = 20;
			let bar_y = 200;
			let bar_width = 184;
			let bar_height = 18;

			self.dragon_bar = new createjs.Shape()
			self.dragon_bar.graphics.beginFill("#0e47a1").drawRect(0,0,bar_width,bar_height);
			self.dragon_bar.y = bar_y;
			self.dragon_bar.x = bar_x;
			self.dragon_bar.scaleX = 0.1;
			self.dragon_bar.setBounds(0,0,bar_width,bar_height);
			self.table_banner_container.addChild(self.dragon_bar);

			self.tie_bar = new createjs.Shape()
			self.tie_bar.graphics.beginFill("green").drawRect(0,0,bar_width,bar_height);
			self.tie_bar.y = bar_y
			self.tie_bar.setBounds(0,0,bar_width,bar_height);
			self.tie_bar.regX = bar_width/2;
			self.tie_bar.scaleX = .4;
			self.tie_bar.x = bar_x  + self.dragon_bar.getTransformedBounds().width + (self.tie_bar.getTransformedBounds().width/2)
			self.table_banner_container.addChild(self.tie_bar);

			self.tiger_bar = new createjs.Shape()
			self.tiger_bar.graphics.beginFill("#b71b1c").drawRect(0,0,bar_width,18);
			self.tiger_bar.y = bar_y
			self.tiger_bar.regX = bar_width;
			self.tiger_bar.x = bar_x  + bar_width
			self.tiger_bar.scaleX = .5;
			self.tiger_bar.setBounds(0,0,bar_width,bar_height);
			self.table_banner_container.addChild(self.tiger_bar);


			self.dragon_val = this.getText( self.dragon_bar.x+2,self.dragon_bar.y,"0%","18px BebasNeue","#fff","left","top");// new createjs.Text("0%", "18px BebasNeue","#fff");
			self.table_banner_container.addChild(self.dragon_val);

			self.tie_val =  this.getText( self.tie_bar.x+2,self.tie_bar.y,"","18px BebasNeue","#fff","center","top");// new createjs.Text("0%", "18px BebasNeue","#fff");
			self.table_banner_container.addChild(self.tie_val);

			self.tiger_val =  this.getText( self.tiger_bar.x-2,self.tiger_bar.y,"0%","18px BebasNeue","#fff","right","top");//new createjs.Text("0%", "18px BebasNeue","#fff");
			self.table_banner_container.addChild(self.tiger_val);

			// countboard
			let bg = [];
			for(var i = 0; i < 6; i++) {
				bg[i] = new createjs.Shape();
				bg[i].graphics.beginFill("#0c3e66").drawRoundRect(0,0,56,32,8);
				bg[i].x = (i*64) + 1276 + 1;
				bg[i].y = 80;
				if(i > 2) {
					bg[i].graphics.clear().beginFill("#7e1d1e").drawRoundRect(0,0,56,32,8);
					bg[i].x = ((i-3)*64) + 1276 + 1;
					bg[i].y = 124;
				}
				self.table_banner_container.addChild(bg[i]);
			}

			let tie_bg = new createjs.Shape();
			tie_bg.graphics.beginFill("#557f2d").drawRoundRect(0,0,56,32,8);
			tie_bg.y = 168;
			tie_bg.x = 1276 + 62;
			self.table_banner_container.addChild(tie_bg);

			/**
			 * cosmetics start here
			 */
			self.player_indi = new createjs.Container();
			self.playerpair_indi = new createjs.Container();
			self.playernat_indi = new createjs.Container();

			self.banker_indi = new createjs.Container();
			self.bankerpair_indi = new createjs.Container();
			self.bankernat_indi = new createjs.Container();

			self.tie_indi = new createjs.Container();

			let offsetX = 14;
			let offsetY = 16;

			self.player_indi.x = bg[0].x + offsetX;
			self.player_indi.y = bg[0].y+ offsetY;
			self.playerpair_indi.x = bg[1].x + offsetX
			self.playerpair_indi.y = bg[1].y+ offsetY
			self.playernat_indi.x = bg[2].x + offsetX
			self.playernat_indi.y = bg[2].y + offsetY

			self.tie_indi.x = tie_bg.x + offsetX;
			self.tie_indi.y = tie_bg.y + offsetY;

			self.banker_indi.x = bg[3].x + offsetX;
			self.banker_indi.y = bg[3].y + offsetY;
			self.bankerpair_indi.x = bg[4].x + offsetX;
			self.bankerpair_indi.y = bg[4].y + offsetY;
			self.bankernat_indi.x = bg[5].x + offsetX;
			self.bankernat_indi.y = bg[5].y + offsetY;

			self.table_banner_container.addChild(self.player_indi, self.playerpair_indi, self.playernat_indi, self.banker_indi, self.bankerpair_indi, self.bankernat_indi, self.tie_indi);

			// === player count cosmetics
			let player_indi = new createjs.Shape();
			player_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
			self.player_indi.addChild(player_indi);

			let p_text = this.getText( player_indi.x,player_indi.y, window.language.locale == "zh" ? "龙" : "D","12px lato","#fff","center","middle"); //new createjs.Text("P","12px lato", "#fff");
			self.player_indi.addChild(p_text);

			//playerpair
			let playerpair_indi =  new createjs.Shape();
			playerpair_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
			self.playerpair_indi.addChild(playerpair_indi);

			let p_text2 = this.getText( playerpair_indi.x,playerpair_indi.y, window.language.locale == "zh" ? "大" : "B","12px lato","#fff","center","middle"); //new createjs.Text("P","12px lato", "#fff");
			self.playerpair_indi.addChild(p_text2);

			//playernatural
			let playernat_indi =  new createjs.Shape();
			playernat_indi.graphics.ss(1).s("#fff").beginFill("#1465bf").drawCircle(0,0,9);
			self.playernat_indi.addChild(playernat_indi);

			let n_text = this.getText( playernat_indi.x,playernat_indi.y, window.language.locale == "zh" ? "小" : "S","12px lato","#fff","center","middle");//  new createjs.Text("N","12px lato", "#fff");
			self.playernat_indi.addChild(n_text);

			//tie
			let tie_indi =  new createjs.Shape();
			tie_indi.graphics.ss(1).s("#fff").beginFill("#689f39").drawCircle(0,0,9);
			self.tie_indi.addChild(tie_indi);

			let t_text = this.getText( tie_indi.x,tie_indi.y, window.language.locale == "zh" ? "和" : "T","12px lato","#fff","center","middle"); //new createjs.Text("T","12px lato", "#fff");
			self.tie_indi.addChild(t_text);

			//bankernatural
			let bankernat_indi = new createjs.Shape();
			bankernat_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
			self.bankernat_indi.addChild(bankernat_indi);

			let n_text2 = this.getText( bankernat_indi.x,bankernat_indi.y, window.language.locale == "zh" ? "小" : "S","12px lato","#fff","center","middle"); // new createjs.Text("N","12px lato", "#fff");
			self.bankernat_indi.addChild(n_text2);

			//bankerpair
			let bankerpair_indi = new createjs.Shape();
			bankerpair_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
			self.bankerpair_indi.addChild(bankerpair_indi);

			let b_text2 = this.getText( bankerpair_indi.x,bankerpair_indi.y, window.language.locale == "zh" ? "大" : "B","12px lato","#fff","center","middle"); // new createjs.Text("B","12px lato", "#fff");
			self.bankerpair_indi.addChild(b_text2);

			//banker
			let banker_indi = new createjs.Shape();
			banker_indi.graphics.ss(1).s("#fff").beginFill("#d42e2e").drawCircle(0,0,9);
			self.banker_indi.addChild(banker_indi);

			let b_text =  this.getText( banker_indi.x,banker_indi.y, window.language.locale == "zh" ? "虎" : "T","12px lato","#fff","center","middle"); // new createjs.Text("B","12px lato", "#fff");
			self.banker_indi.addChild(b_text);

			let xBox = 50;
			let yBox = 18;

			self.dragon_count =  this.getText( bg[0].x + xBox,bg[0].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //new createjs.Text("0","22px BebasNeue","#fff")
			self.table_banner_container.addChild(self.dragon_count);

			self.dragon_big_count =  this.getText( bg[1].x + xBox,bg[1].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //new createjs.Text("0","22px BebasNeue","#fff")
			self.table_banner_container.addChild(self.dragon_big_count);

			self.dragon_small_count = this.getText( bg[2].x + xBox,bg[2].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //new createjs.Text("0","22px BebasNeue","#fff")
			self.table_banner_container.addChild(self.dragon_small_count);

			self.tiger_count = this.getText( bg[3].x + xBox,bg[3].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //new createjs.Text("0","22px BebasNeue","#fff");
			self.table_banner_container.addChild(self.tiger_count);

			self.tiger_big_count  = this.getText( bg[4].x + xBox,bg[4].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //= new createjs.Text("0","22px BebasNeue","#fff");
			self.table_banner_container.addChild(self.tiger_big_count);

			self.tiger_small_count = this.getText( bg[5].x + xBox,bg[5].y + yBox,"0","22px BebasNeue","#fff","right","middle"); //new createjs.Text("0","22px BebasNeue","#fff");
			self.table_banner_container.addChild(self.tiger_small_count);

			self.tie_count = this.getText(tie_bg.x + xBox,tie_bg.y + yBox,"0","22px BebasNeue","#fff","right","middle"); // new createjs.Text("0","22px BebasNeue","#fff");
			self.table_banner_container.addChild(self.tie_count);

			self.dt_pearlRoad_container = new createjs.Container();
			self.dt_pearlRoad_container.x = 223
			self.dt_pearlRoad_container.y = 59
			self.table_banner_container.addChild(self.dt_pearlRoad_container);

			self.dt_bigroad_container = new createjs.Container();
			self.dt_bigroad_container.x = 223 + 315
			self.dt_bigroad_container.y = 59
			self.table_banner_container.addChild(self.dt_bigroad_container);

			self.dt_bigeyeboy_container = new createjs.Container();
			self.dt_bigeyeboy_container.x = 223 + 315
			self.dt_bigeyeboy_container.y = 58 + 106
			self.table_banner_container.addChild(self.dt_bigeyeboy_container);

			self.dt_smallroad_container = new createjs.Container();
			self.dt_smallroad_container.x = 223 + 559
			self.dt_smallroad_container.y = 58 + 106
			self.table_banner_container.addChild(self.dt_smallroad_container);

			self.dt_cockroachroad_container = new createjs.Container();
			self.dt_cockroachroad_container.x = 223 + 806
			self.dt_cockroachroad_container.y = 58 + 106
			self.table_banner_container.addChild(self.dt_cockroachroad_container);
		},
		dtSetPercentages (data) {

			self.deal_count.text = data.length;

			let grouped = _.groupBy(data, function (e) {
				return e.mark;
			});

			let rmcount = {
				total  : data.length,
				dragon : 0,
				tiger: 0,
				tie : 0,
				dragon_small : 0,
				dragon_big : 0,
				dragon_odd : 0,
				dragon_even : 0,
				tiger_small : 0,
				tiger_big : 0,
				tiger_odd : 0,
				tiger_even : 0
			}


			for(var key in grouped) {
				switch(key) {
					case "d" : //dragon
					case "b" : //dragon
					case "c" : //dragon
					case "g" : //dragon
					case "h" :
					case "i" :
					case "j" :
						rmcount.dragon += grouped[key].length;
						grouped[key].forEach((row) => {
							if(row.num > 7) {
								rmcount.dragon_big ++;
							} else if(row.num < 7) {
								rmcount.dragon_small ++;
							}

							if(row.num % 2 == 0 ){
								rmcount.dragon_even ++;
							} else {
								rmcount.dragon_odd ++;
							}
						})
						break;
					case "t" :
					case "e" :
					case "f" :
					case "k" :
					case "l" :
					case "m" :
					case "n" :
						grouped[key].forEach((row) => {
							if(row.num > 7) {
								rmcount.tiger_big ++;
							} else if(row.num < 7) {
								rmcount.tiger_small ++;
							}

							if(row.num % 2 == 0 ){
								rmcount.tiger_even ++;
							} else {
								rmcount.tiger_odd ++;
							}
						})
						rmcount.tiger += grouped[key].length;
						break;
					case "a" :
					case "o" :
					case "p" :
					case "q" :
					case "r" :
					case "t" :
					case "s" :
						rmcount.tie += grouped[key].length;
						break;
				}
			}

			if(rmcount.total>0){
				self.dragon_val.text = Math.round((rmcount.dragon/rmcount.total) *100) + "%";
				self.tiger_val.text = Math.round((rmcount.tiger/rmcount.total) *100) + "%";
				self.tie_val.text = Math.round((rmcount.tie/rmcount.total) *100) < 10 ? "" : Math.round((rmcount.tie/rmcount.total) *100) + "%";

				createjs.Tween.get(self.dragon_bar)
				.to({
					scaleX : rmcount.dragon/rmcount.total
				},150).call(function(){
					self.tie_bar.x = 20  + self.dragon_bar.getTransformedBounds().width + (self.tie_bar.getTransformedBounds().width/2);
					self.tie_val.x = self.tie_bar.x;
				})

				createjs.Tween.get(self.tie_bar)
				.to({
					scaleX : rmcount.tie/rmcount.total
				},150)

				createjs.Tween.get(self.tiger_bar)
				.to({
					scaleX : rmcount.tiger/rmcount.total
				},150)

			}else{

				self.dragon_val.text = "0%";
				self.tiger_val.text = "0%";
				self.tie_val.text = "";
				rmcount.tiger=5;
				rmcount.dragon=5;
				rmcount.tie=5;
				rmcount.total=15;
				createjs.Tween.get(self.dragon_bar)
				.to({
					scaleX : rmcount.dragon/rmcount.total
				},150).call(function(){
					self.tie_bar.x = 20  + self.dragon_bar.getTransformedBounds().width + (self.tie_bar.getTransformedBounds().width/2);
					self.tie_val.x = self.tie_bar.x;
				})

				createjs.Tween.get(self.tie_bar)
				.to({
					scaleX : rmcount.tie/rmcount.total
				},150)

				createjs.Tween.get(self.tiger_bar)
				.to({
					scaleX : rmcount.tiger/rmcount.total
				},150)
			}



		},
		dtSetCount (data) {
			data =  _.filter(data, function (e) {
				if(e.mark) return e;
			});

            let count = data.length;

            let grouped = _.groupBy(data, function (e) {
				return e.mark;
			});

            let rmcount = {
				total  : data.length,
				dragon : 0,
				tiger: 0,
				tie : 0,
				dragon_small : 0,
				dragon_big : 0,
				dragon_odd : 0,
				dragon_even : 0,
				tiger_small : 0,
				tiger_big : 0,
				tiger_odd : 0,
				tiger_even : 0
			}

			for(var key in grouped) {
				switch(key) {
					case "d" : //dragon
					case "b" : //dragon
					case "c" : //dragon
					case "g" : //dragon
					case "h" :
					case "i" :
					case "j" :
						rmcount.dragon += grouped[key].length;
						grouped[key].forEach((row) => {
							if(row.num > 7) {
								rmcount.dragon_big ++;
							} else if(row.num < 7) {
								rmcount.dragon_small ++;
							}

							if(row.num % 2 == 0 ){
								rmcount.dragon_even ++;
							} else {
								rmcount.dragon_odd ++;
							}
						})
						break;
					case "e" :
					case "f" :
					case "k" :
					case "l" :
					case "m" :
					case "n" :
						grouped[key].forEach((row) => {
							if(row.num > 7) {
								rmcount.tiger_big ++;
							} else if(row.num < 7) {
								rmcount.tiger_small ++;
							}

							if(row.num % 2 == 0 ){
								rmcount.tiger_even ++;
							} else {
								rmcount.tiger_odd ++;
							}
						})
						rmcount.tiger += grouped[key].length;
						break;
					case "a" :
					case "o" :
					case "p" :
					case "q" :
					case "r" :
					case "t" :
					case "s" :
						rmcount.tie += grouped[key].length;
						break;
				}
			} // end for

			self.tie_count.text = rmcount.tie;
			self.dragon_count.text = rmcount.dragon;
			self.dragon_big_count.text = rmcount.dragon_big;
			self.dragon_small_count.text = rmcount.dragon_small;
			self.tiger_count.text = rmcount.tiger;
			self.tiger_big_count.text = rmcount.tiger_big;
			self.tiger_small_count.text = rmcount.tiger_small;
		},

		dtDrawPearlRoad (data) {

			self.dt_pearlRoad_container.removeAllChildren();

        	for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					let sp = createSpriteRoadMap(window.language.locale == "zh" ? "/img/all_scoreboard_zh.png" : "/img/all_scoreboard.png" , 40,40, sp);
					sp.x = e * 26.35;
					sp.y = i * 26.2;
					sp.scaleY = sp.scaleX = 0.74;
					sp.gotoAndStop("pearl-dt-"+data.matrix[i][e].mark);
					self.dt_pearlRoad_container.addChild(sp);
				} //end for
			} //end for
		},
		dtDrawBigRoad (data) {

			self.dt_bigroad_container.removeAllChildren();
			
			let sp = null;

        	for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					sp = drawSboard("bigroad")[data.matrix[i][e].mark];
					sp.x = e * 17.5;
					sp.y = i * 17.3;
					sp.scaleX = sp.scaleY = 0.65;

					if(data.matrix[i][e].ties) {
						sp.children[sp.children.length-1].visible = true;

						if(data.matrix[i][e].ties > 1) {
							let text = new createjs.Text(data.matrix[i][e].ties, "bold 18px bebasNeue","#000");
							text.x = sp.x + (10);
							text.y = sp.y;
							text.textAlign = "center";

							self.dt_bigroad_container.addChild(text);
						}
						
						if(data.matrix[i][e].suited_tie) {
							sp.children[sp.children.length-1].graphics.clear().beginFill("#ff9800").drawRect(0,0,3,30);
						}
					}

					self.dt_bigroad_container.addChild(sp);

				} //end for
			} //end for
		},
		drawBigEyeBoy (data) {

			self.dt_bigeyeboy_container.removeAllChildren();

			let sp = null;
        	for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					sp = drawSboard("bigeyeboy")[data.matrix[i][e].mark];
					sp.x = e * 8.8;
					sp.y = i * 8.8;
					sp.scaleX = sp.scaleY = 0.34;
					self.dt_bigeyeboy_container.addChild(sp);
				} //end for
			} //end for

			// this.drawDTSmallRoad(data);
			// this.drawDTCockroachRoad(data);
		},
		drawDTSmallRoad (data) {

			self.dt_smallroad_container.removeAllChildren();

			let sp = null;
        	for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					sp = drawSboard("smallroad")[data.matrix[i][e].mark];
					sp.x = e * 8.8;
					sp.y = i * 8.8;
					sp.scaleX = sp.scaleY = 0.4;
					self.dt_smallroad_container.addChild(sp);
				} //end for
			} //end for
		},
		drawDTCockroachRoad (data) {
			self.dt_cockroachroad_container.removeAllChildren();

			let sp = null;
        	for(var i = 0; i < data.matrix.length; i++) {
				for(var e = 0; e < data.matrix[i].length; e++) {
					if(data.matrix[i][e] === undefined) continue;
					sp = drawSboard("cockroach")[data.matrix[i][e].mark];
					sp.x = e * 8.8;
					sp.y = i * 8.8;
					sp.scaleX = sp.scaleY = 0.37;
					self.dt_cockroachroad_container.addChild(sp);
				} //end for
			} //end for
		},
		pokerBannerTable (data) {
			// === roadmap bg

			let roadmap_bg = new createjs.Shape();
			roadmap_bg.graphics.beginFill("#fff").drawRect(0,0,525,158);
			roadmap_bg.y = 61;
			roadmap_bg.x = 224;
			self.table_banner_container.addChild(roadmap_bg);

			let lines = new createjs.Shape();
			lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0,0)
			self.table_banner_container.addChild(lines);
			let posY =  roadmap_bg.y;
			let posX =  roadmap_bg.x;

			for(var i = 0; i <= 7 ; i++) {
				lines.graphics.moveTo(posX,posY+ (26.3*i)).lineTo(posX + 525, posY+ (26.3*i))
			}
			lines.graphics.moveTo(posX,posY)
			for(var i = 0; i <= 20 ; i++) {
				lines.graphics.moveTo(posX+(26.3*i),posY).lineTo(posX+(26.3*i),posY + 158)
			}

			lines.shadow = new createjs.Shadow("#000",2,2,6);
			lines.alpha =.5;

			// === dealer cards bg

			let card_height = 70;
			let card_height_in = 58;
			let card_gap = 6;

			let card_width = 74;
			let card_width_in = 74;

			let card_ct = new createjs.Container();

			let dealer_bg = new createjs.Shape();
			dealer_bg.graphics.beginFill("#d32f2e").drawRoundRect(0,0,145,card_height,6);

			let dealer_bg_1 = new createjs.Shape();
			dealer_bg_1.graphics.beginFill("#b41a1a").drawRoundRect(72,card_gap,68,card_height_in,6);

			let community_card_bg = new createjs.Shape();
			community_card_bg.graphics.beginFill("#afafaf").drawRoundRect(150,0,190,card_height,6);

			let community_card_1 = new createjs.Shape();
			community_card_1.graphics.beginFill("#999").drawRoundRect(156,card_gap,80,card_height_in,6);

			let community_card_2 = new createjs.Shape();
			community_card_2.graphics.beginFill("#999").drawRoundRect(156+80+6,card_gap,43,card_height_in,6);

			let community_card_3 = new createjs.Shape();
			community_card_3.graphics.beginFill("#999").drawRoundRect(156+80+43+6+6,card_gap,43,card_height_in,6);

			let player_card_bg = new createjs.Shape();
			player_card_bg.graphics.beginFill("#1665c1").drawRoundRect(156+190,0,145,card_height,6);
			let player_card_bg1 = new createjs.Shape();
			player_card_bg1.graphics.beginFill("#1453b4").drawRoundRect(156+190+6,card_gap,68,card_height_in,6);

			card_ct.addChild(dealer_bg,dealer_bg_1,community_card_bg,community_card_1,community_card_2,community_card_3,player_card_bg,player_card_bg1);


			let dealer_label =  this.getText(145/4,card_height/2,window.language.lobby.dealerspaced,"12px lato","#fff","center","middle");
			let player_label =  this.getText(156+190+(145/4)*3,card_height/2,window.language.lobby.playerspaced,"12px lato","#fff","center","middle");


			// === card Result
			self.card_result_container = new createjs.Container();
			card_ct.addChild(dealer_label,player_label,self.card_result_container);
			card_ct.set({x:760,y:60});
			self.table_banner_container.addChild(card_ct);

			// === road map contaner
			self.poker_roadmap_container = new createjs.Container();
			self.poker_roadmap_container.x = 237;
			self.poker_roadmap_container.y = 74;
			self.table_banner_container.addChild(self.poker_roadmap_container);

			let table_ct = new createjs.Container();

			let header = new createjs.Shape();
			header.graphics.ss(1).s("#a2a2a2").beginFill("#c8c8c8").drawRect(0,0,491,22);

			let row = new createjs.Shape();
			row.graphics.ss(1).s("#a2a2a2").beginFill("#dadada").drawRect(0,22,491,28);

			let row2 = new createjs.Shape();
			row2.graphics.ss(1).s("#a2a2a2").beginFill("#dadada").drawRect(0,22+28,491,28);
			table_ct.addChild(header,row,row2);

			table_ct.set({x:760,y:140});
			self.table_banner_container.addChild(table_ct);


			self.pokerMeta_table_container = new createjs.Container();
			self.table_banner_container.addChild(self.pokerMeta_table_container);
			this.drawPokerCards(data)


			let header_width = [85,70,145,103,100];

			let table_header_texts = [window.language.poker.gameno, window.language.poker.dealer, window.language.poker.communitycard, window.language.poker.player, window.language.lobby.result];
			let h_text = [];
			let col_x = 0;
			for(var i = 0; i < table_header_texts.length; i++) {
				col_x += header_width[i];
				h_text[i] = new createjs.Text(table_header_texts[i], "bold 14px latoBold", "#000");
				h_text[i].textAlign = "center"
				h_text[i].textBaseline = "middle"
				h_text[i].x = row.x + col_x - (header_width[i] / 2);
				if(i == 3) {  h_text[i].x -= 15;  }
			if(i == 4) {  h_text[i].x -= 20;  }
				h_text[i].y = header.y + 11 ;
				table_ct.addChild(h_text[i]);
			} // end for

		},
		drawPokerRoadmap (data)  {
			self.poker_roadmap_container.removeAllChildren();

			let circle = "";
			for(var e = 0; e < data.length; e++) {
				for(var i = 0; i < data[e].length; i++) {
					if(!data[e][i]) continue;
					let sp = new createjs.Shape();

					if(data[e][i] == "D") {
						circle = "#cd342f"
					} else if(data[e][i] == "T") {
						circle = "#e4b549"
					}else if(data[e][i] == "P") {
						circle = "#1268cb"
					}

					sp.graphics.beginFill(circle).drawCircle(0,0,12.5);
					sp.x = e*26.3;
					sp.y = i*26.4;

					let text;

					if(window.language.locale == "zh") {
									if(data[e][i] == "P") { text = new createjs.Text("闲", "16px lato", "#fff"); }
									if(data[e][i] == "T") { text = new createjs.Text("和", "16px lato", "#fff"); }
									if(data[e][i] == "D") { text = new createjs.Text("荷", "16px lato", "#fff"); }
					} else {
									if(data[e][i] == "P") { text = new createjs.Text("P", "14px lato", "#fff"); }
									if(data[e][i] == "T") { text = new createjs.Text("T", "14px lato", "#fff"); }
									if(data[e][i] == "D") { text = new createjs.Text("D", "14px lato", "#fff"); }
					}

					text.x = sp.x;
					text.y = sp.y;
					text.textAlign = "center";
					text.textBaseline = "middle";

					self.poker_roadmap_container.addChild(sp, text)

				} // end for
			}// end for
		},
		drawPokerCards (data) {

			self.card_result_container.removeAllChildren()

			let cards = createCardSprite(self,40,60,"/img/cards/small_sprite_cards.png");
			cards.y = 9;
			cards.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, 2, 5);
			cards.scaleX = .85;
			cards.scaleY = .85;

			if(data.gameInfo.player === undefined) return;

			if(data.gameInfo.player.length) {
				for(var e = 0; e < data.gameInfo.player.length; e++) {
					cards.x = (e * 25) + 357;
					cards.gotoAndStop("C"+data.gameInfo.player[e]);
					self.card_result_container.addChild(_.clone(cards));
				}
			}

			if(data.gameInfo.flop.length) {
				for(var e = 0; e < data.gameInfo.flop.length; e++) {
					cards.x = (e* 19) + 160;
					cards.gotoAndStop("C"+data.gameInfo.flop[e]);
					self.card_result_container.addChild(_.clone(cards));
				}
			}
			if(data.gameInfo.turn) {
				cards.x = 247;
				cards.gotoAndStop("C"+data.gameInfo.turn);
				self.card_result_container.addChild(_.clone(cards));
			}

			if(data.gameInfo.river) {
				cards.x = 296;
				cards.gotoAndStop("C"+data.gameInfo.river);
				self.card_result_container.addChild(_.clone(cards));
			}

			if(data.gameInfo.dealer.length) {
				for(var e = 0; e < data.gameInfo.dealer.length; e++) {
					cards.x = (e * 25) + 77;
					cards.gotoAndStop("C"+data.gameInfo.dealer[e]);
					self.card_result_container.addChild(_.clone(cards));
				}
			}


		},

		pokerInputRes (data) {

			self.card_result_container.removeAllChildren();

			let cards = createCardSprite(self,40,60,"/img/cards/small_sprite_cards.png");
			cards.y = 9;
			cards.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", -2, 2, 5);
			cards.scaleX = .85;
			cards.scaleY = .85;

			if(data.gameInfo.player === undefined) return;

			if(data.gameInfo.player.length) {
				for(var e = 0; e < data.gameInfo.player.length; e++) {
					cards.x = (e * 25) + 357;
					cards.gotoAndStop("C"+data.gameInfo.player[e]);
					self.card_result_container.addChild(_.clone(cards));
				}
			}

			if(data.gameInfo.flop.length) {
				for(var e = 0; e < data.gameInfo.flop.length; e++) {
					cards.x = (e* 19) + 160;
					cards.gotoAndStop("C"+data.gameInfo.flop[e]);
					self.card_result_container.addChild(_.clone(cards));
				}
			}
			if(data.gameInfo.turn) {
				cards.x =247;
				cards.gotoAndStop("C"+data.gameInfo.turn);
				self.card_result_container.addChild(_.clone(cards));
			}

			if(data.gameInfo.river) {
				cards.x =296;
				cards.gotoAndStop("C"+data.gameInfo.river);
				self.card_result_container.addChild(_.clone(cards));
			}

			if(data.gameInfo.dealer.length) {
				for(var e = 0; e < data.gameInfo.dealer.length; e++) {
					cards.x = (e *  25) + 77;
					cards.gotoAndStop("C"+data.gameInfo.dealer[e]);
					self.card_result_container.addChild(_.clone(cards));
				}
			}

		},
		drawPokerResultTable (data) {

			self.pokerMeta_table_container.removeAllChildren();
			self.round_num = [];
			self.dealer_card = [];
			self.community_card = [];
			self.player_card = [];
			self.result = [];
			let data_2 = _.clone(data);
			data_2.splice(2,1);

			for(var i = 0; i < data_2.length; i++) {
				self.round_num[i] = new createjs.Text(data_2[i].roundNum,"14px lato", "#000");
       			self.round_num[i].textAlign = "center";
        		self.round_num[i].textBaseline = "middle";
				self.round_num[i].y = (i*26) + 14;
				self.round_num[i].x = 53;
				self.pokerMeta_table_container.addChild(self.round_num[i])
				self.dealer_card[i] = [];

				for(var e = 0;  e < data_2[i].gameInfo.dealer.length; e++ ) {
					self.dealer_card[i][e] = createCardSprite(self,20,26.75,"/img/cards/cards_mobile_sprite_v2_small_banner.png");
					self.dealer_card[i][e].gotoAndPlay("C"+data_2[i].gameInfo.dealer[e]);
					self.dealer_card[i][e].y = (i*28);
					self.dealer_card[i][e].x = (e*22) + 109;
					self.dealer_card[i][e].shadow = new createjs.Shadow("rgba(0,0,0,0.2)", -1, 0, 1);
					self.pokerMeta_table_container.addChild(self.dealer_card[i][e]);

				} //end for

				//== community
				let community_card = _.union(data_2[i].gameInfo.flop,[data_2[i].gameInfo.turn],[data_2[i].gameInfo.river]);

				self.community_card[i] = [];
				for(var e = 0;  e < community_card.length; e++ ) {
					self.community_card[i][e]= createCardSprite(self,20,26.75,"/img/cards/cards_mobile_sprite_v2_small_banner.png");
					self.community_card[i][e].gotoAndPlay("C"+community_card[e]);
					self.community_card[i][e].x = 185 + (e*22);
					self.community_card[i][e].y = (i*28);
					self.pokerMeta_table_container.addChild(self.community_card[i][e]);
					self.community_card[i][e].shadow = new createjs.Shadow("rgba(0,0,0,0.2)", -1, 0, 1);

				} // end for

				//== player
				self.player_card[i] = [];
				for(var e = 0;  e < data_2[i].gameInfo.player.length; e++ ) {
					self.player_card[i][e]= createCardSprite(self,20,26.75,"/img/cards/cards_mobile_sprite_v2_small_banner.png");
					self.player_card[i][e].gotoAndPlay("C"+data_2[i].gameInfo.player[e]);
					self.player_card[i][e].x = 327 + (e*22);
					self.player_card[i][e].y = (i*28);
					self.pokerMeta_table_container.addChild(self.player_card[i][e]);
					self.player_card[i][e].shadow = new createjs.Shadow("rgba(0,0,0,0.2)", -1, 0, 1);

				} // end for

				let color = "#0d47a1";
      			let text =  window.language.poker.playerwins;
				if(data_2[i].gameResult.winner == "dealer") {
					color = "#b71c1c";
          			text = window.language.poker.dealerwins;
				}
				self.result[i] = new createjs.Text(text, "bold 14px arial", color);
        		self.result[i].textAlign = "center";
        		self.result[i].textBaseline = "middle";
				self.result[i].x = 445;
				self.result[i].y = (i*26) + 14;
				self.pokerMeta_table_container.addChild(self.result[i])
			}
			self.pokerMeta_table_container.x = 750
			self.pokerMeta_table_container.y = 163
		},
		capitalizeFirstLetter(string) {
		    return string.charAt(0).toUpperCase() + string.slice(1);
		}
	}

	return instance;
}
