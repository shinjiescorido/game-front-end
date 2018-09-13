/**
 * winAmount.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** view calculates win and displays win amount and animate **/

import {createSprite, randomNum,createCardSprite, numberCounter} from '../../../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		win_text : [],
		win_suit_obj: [],
		lines_obj: [],
		winning_chips: [],
		main() {

			this.total_win_text = new createjs.Text("", "30px bebas-regular", "#f1be29");
			this.total_win_text.textAlign = "center";
			this.total_win_text.textBaseline = "middle";
			
			this.total_win_text.alpha = 0;

			this.total_win_text.x = 130;
			this.total_win_text.y = 180;

			this.addChild(this.total_win_text);

			this.winsArray = [];
			this.winpopupContainer = new createjs.Container();
			this.winpopupContainer.x = this.context.stage.baseWidth - 405;
			this.winpopupContainer.y = this.context.context.height - 341.5;
			this.addChild(this.winpopupContainer);

			this.clearStacksTimeout = null;
			this.background = '#E5C160';
			this.removedArrs = [];
			this.init = 0;
		},

		animatePopup (tableName, amount, prefix = '+') {
			let self = this;

			if(this.winsArray.length >= 3)
			{
				this.removedArrs = _.dropRight(this.winsArray, this.winsArray.length - 1);
				this.winsArray = _.drop(this.winsArray, this.winsArray.length - 2)
			}

			if (this.init >= 3) {
				this.moveStacks();
			}

			this.init++;

			let winBox = this.makeWinBox(tableName, amount, prefix, this.firstPos());
			this.addStack(winBox);
		},

		firstPos () {
			return this.init == 1 ? 128 : this.init == 2 ? 64 : 0;
		},

		clearStacks () {
			clearTimeout(this.clearStacksTimeout);
			let self = this;

			this.clearStacksTimeout = setTimeout(function() {
				for (let i = 0; i < self.winsArray.length; i++) {
					createjs.Tween.get(self.winsArray[i])
						.wait(i * 100)
						.to({
							alpha : 0,
							x : 260
						}, 500)
						.call(function(){
							self.winsArray = [];
							self.winpopupContainer.removeAllChildren();
							self.init = 0;
						});
				}
			}, 3000);
		},

		moveStacks () {
			let self = this;
			
			_.each(self.removedArrs, (arr)=>{
				createjs.Tween.get(arr)
				.wait(100)
				.to({
					alpha : 0
				}, 250)
			});

			let pos = 3 - this.winsArray.length;
			for (let i = this.winsArray.length - 1; i >= 0; i--) {
				createjs.Tween.get(this.winsArray[i])
					.to({
						y : pos * 64
					}, 250)
					.call(function(){
						if(self.winsArray.length > 3)
						{
							self.removedArrs = _.dropRight(self.winsArray, self.winsArray.length - 1);
							self.winsArray = _.drop(self.winsArray, self.winsArray.length - 2)
						}
						self.clearStacks();
					});
				pos++;
			}
		},

		addStack (winBox) {
			let self = this;
			this.winsArray.push(winBox);

			createjs.Tween.get(winBox)
				.to({
					alpha : 0.7,
					y : self.firstPos(),
					x : 0,
				},250)
				.call(function(param){
					param.target.close.addEventListener("click", function(e) {
						self.winsArray.splice(self.winsArray.indexOf(e.currentTarget.parent), 1);
						self.rearrangeStack();

						createjs.Tween.get(e.currentTarget.parent)
							.to({
								alpha : 0,
								x : 260
							}, 250)
					});
				})
			self.clearStacks();
		},
		
		rearrangeStack () {
			let self = this;
			
			if(self.winsArray.length < 3) self.init = self.winsArray.length;

			let pos = 3 - this.winsArray.length;
			for (let i = this.winsArray.length - 1; i >= 0; i--) {
				createjs.Tween.get(this.winsArray[i])
					.to({
						y : pos * 64
					}, 250)
					.call(function(){
						self.clearStacks();
					});

				pos++;
			}
		},

		makeWinBox (tableName, amount, prefix, point = 0) {

			let winArrCon = new createjs.Container();
			winArrCon.setBounds(0,0,260,64);
			winArrCon.y = point;
			winArrCon.x += 260;
			winArrCon.alpha = 0;
			this.winpopupContainer.addChild(winArrCon);

			let winpopupRec = new createjs.Shape();

			if (this.winsArray[this.winsArray.length - 1]) {
				this.background = this.winsArray[this.winsArray.length - 1].background == "#E5C160" ? '#F1E382' : "#E5C160";
			}

			winpopupRec.graphics.f(this.background).drawRect(0,0,260, 64).f('#568E23').drawRect(0,0, 10, 64);
			winArrCon.addChild(winpopupRec);
			winArrCon.background = this.background;

			let closeBtnHitArea = new createjs.Shape();
			closeBtnHitArea.graphics.f(this.background).drawRect(0,0,20,20);
			closeBtnHitArea.x = 260 - 25;
			closeBtnHitArea.y = 5;
			closeBtnHitArea.cursor = "pointer";
			closeBtnHitArea.alpha = 0.3;
			winArrCon.addChild(closeBtnHitArea);
			winArrCon.close = closeBtnHitArea;

			let closeBtn = new createjs.Text("X","bold 15px arial", '#424345');
			closeBtn.x = 260 - 20;
			closeBtn.y = 9;
			winArrCon.addChild(closeBtn);

			let winpopupTxt = new createjs.Text(`${tableName}`, "bold 20px arial", "#211F20");
			winpopupTxt.textAlign = "left";
			winpopupTxt.x = 30;
			winpopupTxt.y = 18;
			winpopupTxt.textBaseline = "middle";
			winArrCon.addChild(winpopupTxt);

			let winpopupAmt = new createjs.Text(`${prefix} ${this.numberWithCommas(amount)}`, "28px bebas-regular", "#568E23");
			winpopupAmt.textAlign = "left";
			winpopupAmt.x = 30;
			winpopupAmt.y = 45;
			winpopupAmt.textBaseline = "middle";
			winArrCon.addChild(winpopupAmt);

			return winArrCon;
		},

		calculateWin(wins, card_result) {
			
			let suited_tie = false;
			let win_tables = this.context.component_betBoard.bet_areas;
			let total_win = 0;
			let win = {};

			win_tables = _.filter( win_tables, (t)=>{
				for(var x = 0; x < wins.length; x++) {
					if(wins[x] == t.table_name && t.chips.length) {
						return t;
					} //end if
					if(wins[x] == "tie") {
						if((t.table_name == "dragon" && t.chips.length)|| (t.table_name == "tiger" && t.chips.length)) {
							return t;
						}//end if
					}//end if
				}//end for
			}); //end _.filter

			if(card_result.dragon[0] == card_result.tiger[0]) {
				suited_tie = true;
			} //end if

			for(var x = 0;x<win_tables.length;x++) {
				win[win_tables[x].table_name] =  {
												"tot_bet" : win_tables[x].total_bet_amt,
												"payout" : win_tables[x].payout_multiplier
											}
			} //end for

			if(win.tie !== undefined) {
				
				if(!suited_tie) {
					total_win += win.tie.tot_bet * win.tie.payout;
				} // end if
				else {
					total_win += win.tie.tot_bet * 50;
				} // end else

				if(win.tiger) {
					total_win += win.tiger.tot_bet / 2;				
				} // end if 
				else if(win.dragon) {
					total_win += win.tiger.tot_bet / 2;				
				} // end else if			 
			} // end if
			else { 
				for(var key in win) {
					total_win += win[key].tot_bet * win[key].payout;
				} // end fpr
			} // end else

			this.total_win_text.text = this.numberWithCommas(total_win);

			this.animateAmtWin()
		},
		animateAmtWin () {
			
			createjs.Tween.get(this.total_win_text)
			.to({
				alpha : 1
			},250)
			.wait(1000)
			.to({
				y: 100,
				scaleX: 1.3,
				scaleY: 1.3
			},500, createjs.Ease.linear)
			.to({
				scaleX: 1,
				scaleY: 1,
				y: 180
			},300, createjs.Ease.linear)
			.to({
				alpha: 0
			},200)

		},
		numberWithCommas (x) {
		    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		giveWinChips(amt) {
			
			this.winning_chips = [];

			let avail_chips = [1000,3000,5000,10000,30000,50000,100000,200000,300000,500000,1000000];

			let sample = parseInt(amt);

			let count = avail_chips.length-1;
			let chips = [];

			for (var x = avail_chips.length-1; x > -1; x--) {
				if (sample == avail_chips[x]) {
					chips.push(avail_chips[x]);
					break;
				} // end if 
				else if (sample-avail_chips[x] >= 0){
					sample -= avail_chips[x];
					chips.push(avail_chips[x]);
					x++;
				} // end elseif
			} // end for

			let last_instance = null;

			for (var x = 0; x < chips.length; x++) {

				let chip_name = "chip_"+(chips[x]/1000)+"k";

				this.winning_chips[x] = createSprite(this.context.getResources(chip_name), 72, 72, instance);
				this.winning_chips[x].gotoAndStop(0); 
				this.winning_chips[x].chip_name = chip_name; 
				this.winning_chips[x].x = (this.context.context.width/2 - 100); 
				this.winning_chips[x].y = this.context.context.height/2 - 250; 
				// this.winning_chips[x].y = 200 + (x*20);
				this.winning_chips[x].alpha = 0;

				if(this.winning_chips[x-1] ) {
					if(this.winning_chips[x].chip_name != this.winning_chips[x-1].chip_name){
						this.winning_chips[x].x += 50
					}					
				}
				
				createjs.Tween.get(this.winning_chips[x])
				.wait(1500)
				.to({
					y: 	this.winning_chips[x].y + 300,
					alpha : 1
				},600)
				.wait(500)
				.to({
					x : this.winning_chips[x].x + 500,
					y: 	this.winning_chips[x].y + 700,
				},1000) 


				this.addChild(this.winning_chips[x])
			}

		}

	});

	return instance;
}