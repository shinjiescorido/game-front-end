import {createSprite, randomNum, createCardSprite, numberCounter, playSound } from '../../../factories/factories';

let instance = null;

export default (self) => {

	instance = instance || new blu.Component({
		bet_areas : [],
		yourBets : [],
		setFlop: false,
		setTurn : false,
		setRiver : false,
		flop_indicator : null,
		turn_indicator : null,
		river_indicator : null,
		main() {
			this.x = 1050.5;
			this.y = 646;

			// === flop bet button
			this.flop_bet_button = new createjs.Container();

			let c_button = new createjs.Shape();
			c_button.graphics.beginLinearGradientFill(["#279144","#37b14a","#279144"],[0,0.5,1], 0,0,130,0,170,0).drawCircle(0,0,58);

			let check_1 = new createjs.Shape();
			check_1.graphics.beginFill("#fff").drawRoundRect(-26,-8,70,13,4);
			check_1.rotation = -40;

			let check_2 = new createjs.Shape();
			check_2.graphics.beginFill("#fff").drawRoundRect(-26,-35,13,40,4);
			check_2.rotation = -40;

			check_2.scaleX = check_1.scaleX = 0.88;
			check_2.scaleY = check_1.scaleY = 0.88;
			check_1.x = check_2.x = 2;
			check_1.y = check_2.y = -8;

			let text = new createjs.Text("RAISE" , "16px helvetica", "#fff");
			text.textAlign = "center";
			text.y = 15;

			if(window.language.locale == "jp") {
				text.y = 15;
				text.font = "bold 20px lato , helvetica"
			}
			else if(window.language.locale == "kr")
			{
				text.y = 15;
				text.font = "bold 20px lato , helvetica"
			}


			this.flop_bet_button.button_bg = c_button;
			this.flop_bet_button.check_1 = check_1;
			this.flop_bet_button.check_2 = check_2;
			this.flop_bet_button.addChild(c_button, check_1,check_2, text);
			this.flop_bet_button.visible = false;
			this.flop_bet_button.scaleX = 0.75;
			this.flop_bet_button.scaleY = 0.75;
			this.flop_bet_button.x = -0.5;
			this.flop_bet_button.y = -0.8;
			this.addChild(this.flop_bet_button);

			// === turn bet button

			let text2 = new createjs.Text("CALL" , "16px helvetica", "#fff");
			text2.textAlign = "center";
			text2.y = 15;

			if(window.language.locale == "jp") {
				text2.y = 15;
				text2.font = "bold 20px lato , helvetica"
			}
			else if(window.language.locale == "kr")
			{
				text2.y = 15;
				text2.font = "bold 20px lato , helvetica"
			}

			this.turn_bet_button = new createjs.Container();
			this.turn_bet_button.addChild(_.clone(c_button), _.clone(check_1),_.clone(check_2), text2);
			this.turn_bet_button.visible = false;
			this.turn_bet_button.scaleX = 0.75;
			this.turn_bet_button.scaleY = 0.75;
			this.turn_bet_button.y = -0.8;
			this.addChild(this.turn_bet_button);

			// === river bet button

			let text3 = new createjs.Text("CALL" , "16px helvetica", "#fff");
			text3.textAlign = "center";
			text3.y = 15;

			if(window.language.locale == "jp") {
				text3.y = 15;
				text3.font = "bold 20px lato , helvetica"
			}
			else if(window.language.locale == "kr")
			{
				text3.y = 15;
				text3.font = "bold 20px lato , helvetica"
			}

			this.river_bet_button = new createjs.Container();
			this.river_bet_button.addChild(_.clone(c_button), _.clone(check_1), _.clone(check_2), text3);
			this.river_bet_button.visible = false;
			this.river_bet_button.scaleX = 0.75;
			this.river_bet_button.scaleY = 0.75;
			this.river_bet_button.y = -0.8;
			this.addChild(this.river_bet_button);

			// === click buttons event listeners
			this.flop_bet_button.on("click", () => {

				if(this.setFlop) return;

				if(this.context.component_timer.timer <= 0) return;
				if(!this.context.component_betBoard.bet_areas[0].total_bet_amt) return;

				// === no money double checking
				// *** hide fold and raise button , drop fold chip
				if((parseInt(this.context.component_betBoard.bet_areas[0].total_bet_amt) *2) > parseInt(this.context.context.user_money)) {
					this.setFoldCheck(this.context.component_tableDraw.flop_area,"fold");
					this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);

					this.fold_check_btn.has_fold = true;
					this.flop_bet_button.visible = false;
					this.fold_check_btn.visible = false;
					return;
				}

				this.setFlopBet(parseInt(this.context.component_betBoard.bet_areas[0].total_bet_amt) *2);

				this.context.component_gameButtons.yourBets.push({
					"amount" : (this.context.component_betBoard.bet_areas[0].total_bet_amt*2),
					"table_id": "flop"
				});

				playSound("click");
				this.context.actionCallback("confirm", this.yourBets);

				this.fold_check_btn.has_fold = false;
				this.flop_bet_button.visible = false;
				this.fold_check_btn.visible = false;
			});

			this.turn_bet_button.on("click", () => {

				if(this.setTurn) return;

				if(this.context.component_timer.timer <= 0) return;
				if(!this.context.component_tableDraw.flop_area.total_bet_amt) return;

				// === no money checking
				// *** hide check and raise button , drop check chip
				if(parseInt(this.context.component_betBoard.bet_areas[0].total_bet_amt) > parseInt(this.context.context.user_money)) {
					this.setFoldCheck(this.context.component_tableDraw.turn_area,"check");
					this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);

					this.fold_check_btn.has_check_turn = true;
					this.turn_bet_button.visible = false;
					this.fold_check_btn.visible = false;
					return;
				}

				this.setTurnBet(parseInt(this.context.component_betBoard.bet_areas[0].total_bet_amt));

				this.context.component_gameButtons.yourBets.push({
					"amount" : this.context.component_betBoard.bet_areas[0].total_bet_amt,
					"table_id": "turn"
				});
				playSound("click");

				this.context.actionCallback("confirm", this.yourBets);

				this.fold_check_btn.has_check_turn = true;
				this.turn_bet_button.visible = false;
				this.fold_check_btn.visible = false;
			});

			this.river_bet_button.on("click", () => {
				if(this.setRiver) return;
				if(!this.context.component_tableDraw.flop_area.total_bet_amt) return;

				if(this.context.component_timer.timer <= 0) return;

				// === no money checking
				// *** hide check and raise button , drop check chip
				if(parseInt(this.context.component_betBoard.bet_areas[0].total_bet_amt) > parseInt(this.context.context.user_money)) {
					this.setFoldCheck(this.context.component_tableDraw.river_area,"check");
					this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);

					this.fold_check_btn.has_check_river = true;
					this.river_bet_button.visible = false;
					this.fold_check_btn.visible = false;
					return;
				}

				this.setRiverBet(parseInt(this.context.component_betBoard.bet_areas[0].total_bet_amt));

				this.context.component_gameButtons.yourBets.push({
					"amount" : (this.context.component_betBoard.bet_areas[0].total_bet_amt),
					"table_id": "river"
				});
				playSound("click");

				this.context.actionCallback("confirm", this.yourBets);
				this.fold_check_btn.has_check_river = true;
				this.river_bet_button.visible = false;
				this.fold_check_btn.visible = false;
			});


			// === fold /check button

			this.fold_check_btn = new createjs.Container();

			let fold_check_btn = new createjs.Shape();
			fold_check_btn.graphics.beginLinearGradientFill(["#a22828","#cc282a","#a22828"],[0,0.5,1], 30,0,80,0,140,0).drawCircle(57,55,47);

			let fold_check_btn_1 = new createjs.Shape();
			fold_check_btn_1.graphics.beginFill("#fff").drawRoundRect(48,-8,52,12,4);
			fold_check_btn_1.rotation = 42;

			let fold_check_btn_2 = new createjs.Shape();
			fold_check_btn_2.graphics.beginFill("#fff").drawRoundRect(-16,68,52,12,4);
			fold_check_btn_2.rotation = -42;

			this.fold_check_btn.addChild(fold_check_btn, fold_check_btn_1, fold_check_btn_2);

			this.fold_check_btn.scaleX = this.fold_check_btn.scaleY = 0.92;
			this.fold_check_btn.x = 88;
			this.fold_check_btn.y = -50;
			this.fold_check_btn.visible = false;
			this.addChild(this.fold_check_btn);

			let fold_check_text = new createjs.Text("FOLD" , "15px arial", "#fff");
			fold_check_text.textAlign = "center";
			this.fold_check_btn.addChild(fold_check_text);
			this.fold_check_btn.textAlign = "center"
			fold_check_text.x = 57;
			fold_check_text.y = 60;

			fold_check_btn_1.scaleX = fold_check_btn_1.scaleY = 0.7;
			fold_check_btn_2.scaleX = fold_check_btn_2.scaleY = 0.7;
			fold_check_btn_1.x = fold_check_btn_2.x = 17;
			fold_check_btn_1.y = fold_check_btn_2.y = 7;

			this.fold_check_btn.has_fold = false;
			this.fold_check_btn.has_check_turn = false;
			this.fold_check_btn.has_check_river = false;

			this.fold_check_btn.on("mousedown",(e)=>{
				// if(e.currentTarget.has_fold) return
				if(!parseInt(this.context.component_betBoard.bet_areas[0].total_bet_amt)) return;

				e.currentTarget.alpha = 0.8;

				if(e.currentTarget.type =="flop") {
					this.setFlop = true
					if(e.currentTarget.has_fold) return;
					this.setFoldCheck(this.context.component_tableDraw.flop_area,"fold");
					e.currentTarget.has_fold = true;

					e.currentTarget.visible = false
					this.hideButtons();

					this.flop_bet_button.visible = false;
					this.fold_check_btn.visible = false;

					$.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'flop'},  (response) => {
			    });
				}
				if(e.currentTarget.type == "turn") {
					this.setTurn = true
					if(e.currentTarget.has_check_turn) return;
					this.setFoldCheck(this.context.component_tableDraw.turn_area,"check");
					e.currentTarget.has_check_turn = true;

					this.turn_bet_button.visible = false;
					this.fold_check_btn.visible = false;

					$.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'turn'},  (response) => {
			    });
				}
				if(e.currentTarget.type == "river") {
					this.setRiver = true
					if(e.currentTarget.has_check_river) return;
					this.setFoldCheck(this.context.component_tableDraw.river_area,"check");
					e.currentTarget.has_check_river = true;

					this.river_bet_button.visible = false;
					this.fold_check_btn.visible = false;

					$.post(`/bet/setFoldCheck/${window.tableNum}`, {type : 'river'},  (response) => {
					});
				}
			});

			this.fold_check_btn.on("pressup",(e)=>{
				e.currentTarget.alpha = 1;
			});

		},
		hideButtons () {
			this.flop_bet_button.visible = false;
			this.turn_bet_button.visible = false;
			this.river_bet_button.visible = false;
			this.fold_check_btn.visible = false;
		},
		setFlopBet(amount, onload) {

			if(!amount) return;

			this.context.component_betDetails.bet_amount += amount
			if(!onload) {
				if(window.casino == "SS") {
					this.context.context.user_money = parseFloat(this.context.context.user_money).toFixed(2) - parseInt(amount)
				} else {
					this.context.context.user_money = parseInt(this.context.context.user_money) - parseInt(amount)
				}
			}

			this.context.component_betDetails.reinit(true)
			this.addChips(this.context.component_tableDraw.flop_area, amount);
			this.setFlop = true;

			if(!this.flop_indicator) {
				this.flop_indicator = new createjs.Container();
				this.flop_indicator.addChild(_.clone(this.context.component_betindicator.betindicator_container.children[0]),
													_.clone(this.context.component_betindicator.betindicator_container.children[1]));
				this.addChild(this.flop_indicator);
				this.flop_indicator.x = this.context.component_tableDraw.flop_area.x - this.x - 50;
				this.flop_indicator.y = (this.context.component_tableDraw.flop_area.y - 80) - this.y;
			}

			this.flop_indicator.visible = true

			this.context.callback(amount, 'insert-flop')

			let currency = "";

			if(window.currencyAbbrev == "USD" || window.currencyAbbrev == "JPY") {
				currency = "$"
			} else if(window.currencyAbbrev == "KRW"){
				currency = "₩"
			} else if(window.currencyAbbrev == "CNY"){
				currency = "¥"
			} else if(window.currencyAbbrev == "IDR") {
				currency = "Rp"
			} else if(window.currencyAbbrev == "MYR") {
				currency = "RM"
			} else if(window.currencyAbbrev == "THB") {
				currency = "฿"
			} else {
				currency = ""
			}
			this.flop_indicator.children[1].text = currency + amount.toLocaleString()
			this.context.component_tableDraw.stopBetAreaAnimation(this.context.component_tableDraw.flop_area);
		},
		setTurnBet(amount, onload) {

			if(!amount) return;
			this.addChips(this.context.component_tableDraw.turn_area, amount);
			this.context.component_betDetails.bet_amount += amount;
			if(!onload) {
				if(window.casino == "SS") {
					this.context.context.user_money = parseFloat(this.context.context.user_money).toFixed(2) - parseInt(amount)
				} else {
					this.context.context.user_money = parseInt(this.context.context.user_money) - parseInt(amount)
				}
			}
			this.context.component_betDetails.reinit(true)

			this.setTurn = true;

			if(!this.turn_indicator) {
				this.turn_indicator = new createjs.Container();
				this.turn_indicator.addChild(_.clone(this.context.component_betindicator.betindicator_container.children[0]),
													_.clone(this.context.component_betindicator.betindicator_container.children[1]));
				this.addChild(this.turn_indicator);
				this.turn_indicator.x = this.context.component_tableDraw.turn_area.x - this.x - 20;
				this.turn_indicator.y = (this.context.component_tableDraw.turn_area.y - 80) - this.y;
			}

			this.turn_indicator.visible = true

			this.context.callback(amount, 'insert-turn')

			let currency = "";

			if(window.currencyAbbrev == "USD" || window.currencyAbbrev == "JPY") {
				currency = "$"
			} else if(window.currencyAbbrev == "KRW"){
				currency = "₩"
			} else if(window.currencyAbbrev == "CNY"){
				currency = "¥"
			} else if(window.currencyAbbrev == "IDR") {
				currency = "Rp"
			} else if(window.currencyAbbrev == "MYR") {
				currency = "RM"
			} else if(window.currencyAbbrev == "THB") {
				currency = "฿"
			} else {
				currency = ""
			}

			this.turn_indicator.children[1].text = currency + amount.toLocaleString()

			this.context.component_tableDraw.stopBetAreaAnimation(this.context.component_tableDraw.turn_area);
		},
		setRiverBet(amount, onload) {

			if(!amount) return;
			this.context.component_betDetails.bet_amount += amount
			if(!onload) {
				if(window.casino == "SS") {
					this.context.context.user_money = parseFloat(this.context.context.user_money).toFixed(2) - parseInt(amount)
				} else {
					this.context.context.user_money = parseInt(this.context.context.user_money) - parseInt(amount)
				}
			}
			this.context.component_betDetails.reinit(true)
			this.addChips(this.context.component_tableDraw.river_area, amount);

			this.setRiver = true;

			if(!this.river_indicator) {
				this.river_indicator = new createjs.Container();
				this.river_indicator.addChild(_.clone(this.context.component_betindicator.betindicator_container.children[0]),
													_.clone(this.context.component_betindicator.betindicator_container.children[1]));

				this.addChild(this.river_indicator);
				this.river_indicator.x = this.context.component_tableDraw.river_area.x - this.x ;
				this.river_indicator.y = (this.context.component_tableDraw.river_area.y - 80) - this.y;
			}
			this.river_indicator.visible = true

			this.context.callback(amount, 'insert-river')

			let currency = "";

			if(window.currencyAbbrev == "USD" || window.currencyAbbrev == "JPY") {
				currency = "$"
			} else if(window.currencyAbbrev == "KRW"){
				currency = "₩"
			} else if(window.currencyAbbrev == "CNY"){
				currency = "¥"
			} else if(window.currencyAbbrev == "IDR") {
				currency = "Rp"
			} else if(window.currencyAbbrev == "MYR") {
				currency = "RM"
			} else if(window.currencyAbbrev == "THB") {
				currency = "฿"
			} else {
				currency = ""
			}

			this.river_indicator.children[1].text = currency + amount.toLocaleString()
			this.context.component_tableDraw.stopBetAreaAnimation(this.context.component_tableDraw.river_area);
		},
		setFoldCheck(area,type,frmSocket) {

			if(area.chips.length) return;

			playSound("click");

			area.alpha = 0.56;

			for(var x  = 0 ; x < area.children.length;x++) {
				area.children[x].shadow = null
			}

			let chip = new createjs.Bitmap(this.context.getResources(type+"_chip"));
			chip.scaleY = 0.7;
			chip.scaleX = 0.7;
			chip.fold_check_chip = true;

			// this.context.component_betBoard.addChild(chip)
			// this.context.component_betBoard.setChildIndex(chip,this.context.component_betBoard.children.length-1 )
			this.context.component_tableDraw.chips_container.addChild(chip);

			this.context.callback(area, 'insert-'+type);

			chip.x = area.x + area.getTransformedBounds().width/2 - 15;

			if(area.table_name == "river") {
				chip.x = area.x + area.getTransformedBounds().width/2 - 15;
			}
			chip.y = 0;

			createjs.Tween.get(chip)
			.to({
				y:area.y + 15
			},100)
			.call(() =>{
				playSound("chip1")
				this.context.component_tableDraw.stopBetAreaAnimation(area);
			})

			if(this.context.success_bet && this.context.success_bet.length) {
				let emitData = [];
				this.context.success_bet.forEach((e) => {

					if(area.table_name == e.table_id) {
						e.cancel = 1;
					}

					emitData.push({
            roundNum: parseInt(this.context.component_dealer.round_id),
            bet_amount: e.amount,
            name: window.user_name,
            id: window.userId,
            bet: e.table_id,
            slave: window.bet_type == 'r' ? 'normal' : 'bonusplus',
            is_mobile: 0,
            currency: window.casino,
            cancel: e.cancel
          });
				});

				if(!frmSocket) {
					this.context.socket.emit('data', {eventName : 'bet', data : emitData} , (e) => {
					});
				}
			}
		},
		addChips (betArea, amount) {

			betArea.chips = [];

		    let chips = [];
		    let winnings = amount;
		    let chipsfrombanker = winnings;

		    //Chip container init and stacking
		    let posX = betArea.x + (betArea.getTransformedBounds().width/2) + 30;
		    let posY = betArea.y + (betArea.getTransformedBounds().height/2);

		    // Set total bet amt
		    betArea.total_bet_amt = amount;

		    let avail_chips = [];
			let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
			}

		    for (var x = avail_chips.length-1; x > -1; x--) {
				if (chipsfrombanker == avail_chips[x].value) {
					chips.push(avail_chips[x]);
					break;
				} // end if
				else if (chipsfrombanker-avail_chips[x].value >= 0){
					chipsfrombanker -= avail_chips[x].value;
					chips.push(avail_chips[x]);
					x++;
				} // end elseif
			} // end for

	       	setTimeout(()=>{
			    if(avail_chips.length> 1) {
					playSound("chip2")
			    } else if(avail_chips.length ==1) {
					playSound("chip1")
			    }
		    }, 200)

		    let instance = null;
		    let instanceTxt = null;
		    let instanceMask = null;
		    let chipDataCon = null;

		    for (var x = 0; x < chips.length; x++) {
				let chip_name = "chip_"+(chips[x].chip);

				this.context.chipsConf.forEach((c) => {
					if(chips[x].chip == c.chipval) {
						chip_name = "chip_"+c.chipName.split("_")[2]
					}
				});

		        instance = createSprite(this.context.getResources(chip_name), 72, 72, instance);
		        instance.regX = instance.getBounds().width / 2;
		        instance.regY = instance.getBounds().height / 2;
		        instance.x = 0;
		        instance.y = 0;
		        instance.gotoAndStop(2);

		        chipDataCon = new createjs.Container();
		        chipDataCon.x = posX;
		        chipDataCon.y = (posY + 4) - (betArea.chips.length * 4);
		        chipDataCon.scaleX = chipDataCon.scaleY = 0.8;
		        chipDataCon.chip_amt = chips[x].value;
	        	chipDataCon.droppedAt = betArea.table_name;

		        chipDataCon.addChild(instance);

		        instanceMask = new createjs.Shape();
		        instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 22);
		        instanceMask.x = instance.x;
		        instanceMask.y = instance.y;
				instanceMask.scaleY = 0.7;
		        chipDataCon.addChild(instanceMask);

		        //Bet amount text
				let totalBet = winnings;
	          	let instanceAmt = totalBet;

				if (parseInt(totalBet) > 999) {
					totalBet = winnings / 1000;
	          		instanceAmt = totalBet+"k";
				}

	          	if (parseInt(totalBet) > 999) {
	            	instanceAmt = totalBet/1000+'M';
	          	}

		        instanceTxt = new createjs.Text(instanceAmt, 'normal 23px bebas-regular', '#000');
		        instanceTxt.textBaseline = 'middle';
		        instanceTxt.textAlign = 'center';
		        instanceTxt.x = instance.x;
		        instanceTxt.y = instance.y;
				instanceTxt.scaleY = 0.7;
		        chipDataCon.addChild(instanceTxt);

		        betArea.chips.push(chipDataCon);
				this.context.component_tableDraw.chips_container.addChild(chipDataCon);
			} //end for loop
		},
		animateChips(isWin) {
			let lose_chips_to_animate = [];

			if (isWin == 'dealer' || isWin == 'fold') {
				if (this.context.component_tableDraw.flop_area.chips.length) {
					this.context.component_tableDraw.flop_area.chips.forEach((e) => {
			          	lose_chips_to_animate.push(e);
			        });
				}

				if (this.context.component_tableDraw.turn_area.chips.length) {
					this.context.component_tableDraw.turn_area.chips.forEach((e) => {
			          	lose_chips_to_animate.push(e);
			        });
				}

				if (this.context.component_tableDraw.river_area.chips.length) {
					this.context.component_tableDraw.river_area.chips.forEach((e) => {
			          	lose_chips_to_animate.push(e);
			        });
				}
			}

			if (isWin != 'dealer') {
				setTimeout(() => {
		        	this.setWinChips(isWin);
		      	}, 2000);
			}

			setTimeout(() => {
	        	this.loseTableChipsAnimation(lose_chips_to_animate);
	      	}, 2000);
		},
		setWinChips(isWin) {
			let win_chips_to_animate = [];

			if (this.context.component_tableDraw.flop_area.chips.length) {
				if (isWin == 'player') {
		          	this.createWinningChips(this.context.component_tableDraw.flop_area);
		        }

				this.context.component_tableDraw.flop_area.chips.forEach((e) => {
		          	win_chips_to_animate.push(e);
		        });
			}

			if (this.context.component_tableDraw.turn_area.chips.length) {
		      	if (isWin == 'player') {
		        	this.createWinningChips(this.context.component_tableDraw.turn_area);
		      	}

				this.context.component_tableDraw.turn_area.chips.forEach((e) => {
		          	win_chips_to_animate.push(e);
		        });
			}

			if (this.context.component_tableDraw.river_area.chips.length) {
		        if (isWin == 'player') {
		          	this.createWinningChips(this.context.component_tableDraw.river_area);
		        }

				this.context.component_tableDraw.river_area.chips.forEach((e) => {
		          	win_chips_to_animate.push(e);
		        });
			}

			if (win_chips_to_animate) {
		        setTimeout(() => {
		          	this.winTableChipsAnimation(win_chips_to_animate);
		        }, 4300);
		    }
		},
		loseTableChipsAnimation(chips) {
	      	let posX = this.context.stage.baseWidth / 2;
	      	let posY = (this.context.stage.baseHeight / 2) - 50;

	      	for (var x = 0; x < chips.length; x++) {
		        createjs.Tween.get(chips[x], {override: true})
		          .wait(1500)
		          .to({
		            scaleX: 0.9,
		            scaleY: 0.9,
		            alpha: 0,
		            x: posX,
		            y: posY
		          }, 1200, createjs.Ease.quadOut)
	      	}
	    }, // end of loseTableChipsAnimation
	    winTableChipsAnimation(chips) {
	      	for (var x = 0; x < chips.length; x++) {
		        createjs.Tween.get(chips[x])
		          .to({
		            alpha: 0,
		            x: this.context.component_playerInfo.x + 50,
		            y: this.context.component_playerInfo.y + 50
		          }, 1200, createjs.Ease.quadOut)
	      	}
	    }, // end of winTableChipsAnimation
	    createWinningChips(betArea) {
	      	let chips = [];
	      	let winnings = parseInt(betArea.total_bet_amt);
	      	let chipsfrombanker = winnings;

	      	//Chip container init and stacking
	      	let posX = betArea.x + (betArea.getTransformedBounds().width/2) + 30;
	      	let posY = betArea.y + (betArea.getTransformedBounds().height/2);

	      	let avail_chips = [];
			let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
			}

	      	for (var x = avail_chips.length-1; x > -1; x--) {
				if (chipsfrombanker == avail_chips[x].value) {
					chips.push(avail_chips[x]);
					break;
				} // end if
				else if (chipsfrombanker-avail_chips[x].value >= 0){
					chipsfrombanker -= avail_chips[x].value;
					chips.push(avail_chips[x]);
					x++;
				} // end elseif
			} // end for

	      	let instance = null;
	      	let instanceTxt = null;
	      	let instanceMask = null;
	      	let chipDataCon = null;
	      	let chipsToAnimate = [];

	      	for (var x = 0; x < chips.length; x++) {
						let chip_name = "chip_"+(chips[x].chip);

						this.context.chipsConf.forEach((c) => {
							if(chips[x].chip == c.chipval) {
								chip_name = "chip_"+c.chipName.split("_")[2]
							}
						});

		        instance = createSprite(this.context.getResources(chip_name), 72, 72, instance);
		        instance.regX = instance.getBounds().width / 2;
		        instance.regY = instance.getBounds().height / 2;
		        instance.x = 0;
		        instance.y = 0;
		        instance.gotoAndStop(2);

		        chipDataCon = new createjs.Container();
		        chipDataCon.x = posX - 70;
		        chipDataCon.y = posY - 120;
		        chipDataCon.alpha = 0;
		        chipDataCon.scaleX = chipDataCon.scaleY = 0.8;
		        chipDataCon.chip_amt = chips[x].value;

		        chipDataCon.addChild(instance);

		        instanceMask = new createjs.Shape();
		        instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 22);
		        instanceMask.x = instance.x;
		        instanceMask.y = instance.y;
		        instanceMask.scaleY = 0.8;
		        chipDataCon.addChild(instanceMask);

		        //Bet amount text
				let totalBet = winnings;
	          	let instanceAmt = totalBet;

				if (parseInt(totalBet) > 999) {
					totalBet = winnings / 1000;
	          		instanceAmt = totalBet+"k";
				}

	          	if (parseInt(totalBet) > 999) {
	            	instanceAmt = totalBet/1000+'M';
	          	}

		        instanceTxt = new createjs.Text(instanceAmt, 'normal 23px bebas-regular', '#000');
		        instanceTxt.textBaseline = 'middle';
		        instanceTxt.textAlign = 'center';
		        instanceTxt.x = instance.x;
		        instanceTxt.y = instance.y;
		        instanceTxt.scaleY = 0.8;
		        chipDataCon.addChild(instanceTxt);

		        createjs.Tween.get(chipDataCon)
		          .wait(x*200)
		          .to({
		            alpha: 1,
		            y: (posY + 4) - (betArea.chips.length * 4)
		          }, 120, createjs.Ease.quadOut)

		        betArea.chips.push(chipDataCon);
				this.context.component_tableDraw.chips_container.addChild(chipDataCon);
	      } //end for
	    }
	});

	return instance;
}
