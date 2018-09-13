import {createSprite, randomNum, createCardSprite, numberCounter, playSound, fontFormat } from '../../factories/factories';

let instance = null;

export default (self) => {

	instance = instance || new blu.Component({
		bet_areas : [],
		yourBets : [],
		setFlop: false,
		setTurn : false,
		setRiver : false,
		foldCheckStatus : {flop:0, turn:0,river:0},
		getAmt(type) {
			if(type === 'ante' || type === 'bonus' || type === 'pocket') {
				var area =	_.find(this.context.component_betBoard.bet_areas, function (e) {return e.table_name === type}).total_bet_amt;
				return area;
			}
			else {
				return this.context.component_tableDraw[`${type}_area`].total_bet_amt;
			}
		},
		main() {
			let h = 180;
			this.x = this.context.stage.baseWidth /2;
			this.y = this.context.stage.baseHeight  - (h);

			this.raiseCall = this.context.component_gameButtons.makeConfirmButton();
			this.raiseCall.gotoAndStop('up');
			this.addChild(this.raiseCall);

			this.foldCheck = this.context.component_gameButtons.makeClearButton();
			this.foldCheck.gotoAndStop('up');
			this.addChild(this.foldCheck);

			this.visible = false;

			this.raiseCall.on('click',() => {
				let anteAmt = this.getAmt('ante');

				if(this.context.roundphase === 'flop') {
					this.setFlopBet(anteAmt*2);
					this.context.component_gameButtons.yourBets.push({
						"amount" : anteAmt*2,
						"table_id": "flop"
					});
				}
				if(this.context.roundphase === 'turn') {
					this.setTurnBet(anteAmt);
					this.context.component_gameButtons.yourBets.push({
						"amount" : anteAmt,
						"table_id": "turn"
					});
				}
				if(this.context.roundphase === 'river') {
					this.setRiverBet(anteAmt);
					this.context.component_gameButtons.yourBets.push({
						"amount" : anteAmt,
						"table_id": "river"
					});
				}

				this.context.component_gameButtons.yourBets = _.filter(this.context.component_gameButtons.yourBets, function (e) {
					return (e.amount && !e.cancel) || (!e.amount && e.cancel);
				});

				this.context.component_gameButtons.yourBets = _.uniqBy(this.context.component_gameButtons.yourBets, function (e) {
					return e.table_id
				});

				playSound("click");

				this.context.actionCallback("confirm", this.context.component_gameButtons.yourBets, false);
				this.visible = false;
			});


			this.foldCheck.on('click',() => {
				// this.foldCheck.gotoAndStop("click");
				this.hideButtons();
				this.foldCheckCallback();
				playSound("click");
			});

		},
		showButtons() {
			this.visible = true;
		},
		hideButtons () {
			this.visible = false;
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

			// this.context.component_betDetails.reinit(false)

			this.addChips(this.context.component_tableDraw.flop_area, amount);
			this.setFlop = true;

			let currency = "";

			this.context.callback(amount, 'insert-flop')

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

			this.context.component_tableDraw.stopBetAreaAnimation(this.context.component_tableDraw.flop_area);

		},
		setTurnBet(amount, onload) {
			if(!amount) return;

			this.addChips(this.context.component_tableDraw.turn_area, amount);
			this.context.component_betDetails.bet_amount += amount
			if(!onload) {
				if(window.casino == "SS") {
					this.context.context.user_money = parseFloat(this.context.context.user_money).toFixed(2) - parseInt(amount)
				} else {
					this.context.context.user_money = parseInt(this.context.context.user_money) - parseInt(amount)
				}
			}

			// this.context.component_betDetails.reinit(false)

			this.setTurn = true;

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

			this.context.component_tableDraw.stopBetAreaAnimation(this.context.component_tableDraw.turn_area);
		},
		setRiverBet(amount, onload) {
			if(!amount) return;

			this.addChips(this.context.component_tableDraw.river_area, amount);
			this.context.component_betDetails.bet_amount += amount

			if(!onload) {
				if(window.casino == "SS") {
					this.context.context.user_money = parseFloat(this.context.context.user_money).toFixed(2) - parseInt(amount)
				} else {
					this.context.context.user_money = parseInt(this.context.context.user_money) - parseInt(amount)
				}
			}

			// this.context.component_betDetails.reinit(false)

			this.setRiver = true;

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

			this.context.component_tableDraw.stopBetAreaAnimation(this.context.component_tableDraw.river_area);
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

				let instance = createSprite(this.context.getResources(chip_name), 80, 80, chips[i]);
				instance.scaleX = instance.scaleY = 0.8;
				instance.regX = instance.getBounds().width / 2;
				instance.regY = instance.getBounds().height / 2;
				// instance.x = 0;
				// instance.y = 0;
				instance.gotoAndStop(1);

				chipDataCon = new createjs.Container();
				chipDataCon.x = posX;
				chipDataCon.y = (posY + 4) - (betArea.chips.length * 4);
				// chipDataCon.scaleX = chipDataCon.scaleY = 0.8;
				chipDataCon.chip_amt = chips[x].value;
				chipDataCon.droppedAt = betArea.table_name;
				chipDataCon.addChild(instance);

				// instanceMask = new createjs.Shape();
				// instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 21);
				// instanceMask.x = instance.x;
				// instanceMask.y = instance.y;
				// instanceMask.scaleY = 0.7;
				// chipDataCon.addChild(instanceMask);

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

				instanceTxt = new createjs.Text(instanceAmt, fontFormat(24, 'normal', 'bebas', false), '#000');
				instanceTxt.textBaseline = 'middle';
				instanceTxt.textAlign = 'center';
				instanceTxt.x = instance.x;
				instanceTxt.y = instance.y - 2;
				instanceTxt.scaleY = 0.6;
				chipDataCon.addChild(instanceTxt);

				if (instanceTxt.text.toString().length > 3) {
					instanceTxt.font = fontFormat(20, 'normal', 'bebas', false);
				}

				betArea.chips.push(chipDataCon);
				this.context.component_tableDraw.chips_container.addChild(chipDataCon);
			} //end for loop
		},
		foldCheckCallback(phase) {
			var curPhase = this.context.roundphase;
			if (phase) curPhase = phase;

			$.post(`/bet/setFoldCheck/${window.tableNum}`, {type : curPhase},  (response) => {
				if (!response) return;

				this.foldCheckStatus[curPhase] = 1;
				this.visible = false;

				if (curPhase != this.context.roundphase) {
					if (this.context.component_timer.betting_start) {
						this.visible = true;
					}
				}

				if(typeof response === 'string') JSON.parse(response);

				let betData = [];
				let emit_data = [];
				this.context.success_bet = []

        for(var key in response) {
          betData.push({
            bet_money: response[key].bet,
            bet: key,
            cancel : response[key].cancel === undefined ? 0 : response[key].cancel
          })
        }

				let hasFoldCheck = _.find(this.context.component_gameButtons.yourBets, (e) => {return e.table_id === curPhase});

				if(_.isEmpty(hasFoldCheck)) {
					this.context.component_gameButtons.yourBets.push({
						table_id : curPhase,
						amount :0,
						cancel : 1
					});
				}

				let area = this.context.component_tableDraw[`${curPhase}_area`];
				let checkFlop = _.find(this.context.component_gameButtons.yourBets, (e) => {return e.table_id === 'flop'});

				if (this.context.roundphase == 'flop' && !parseInt(checkFlop.amount)) {
					this.setFoldCheck(area, 'fold');
				} else {
					if (parseInt(checkFlop.cancel) && !parseInt(checkFlop.amount)) {
						this.setFoldCheck(area, 'fold');
					} else {
						this.setFoldCheck(area, 'check');
					}
				}

				betData.forEach((bet) =>{
          if((bet.bet_money > 0 && !bet.cancel) || (!bet.bet_money && bet.cancel)) {
            this.context.success_bet.push({
              'amount' : bet.bet_money,
              'table_id' : bet.bet,
              'is_confirmed': true
            });

            emit_data.push({
              "roundNum" : parseInt(this.context.component_dealer.round_id),
              "bet_amount" : bet.bet_money,
              "name" : window.user_name,
              "id" : window.userId,
              "bet" : bet.bet,
              "is_mobile" : this.context.mobile,
              'currency' : window.casino,
              "slave" : window.bet_type === 'b' ? 'bonusplus' : 'normal',
              "cancel" : bet.cancel,
              'currencyMultiplier' : window.currencyMultiplier,
              'userMultiplier' : window.userMultiplier
            });
          }
        });

        this.context.socket.emit('data', {
            eventName: 'bet',
            data: emit_data,
            gameName: 'Poker',
            tableId: window.tableNum,
            roundNum: parseInt(this.context.component_dealer.round_id)
        });
			}).fail(()=>{
				//if network failure, socket emit so on refresh insert into database
				let betData = [];
				let emit_data = [];
				this.foldCheckStatus[curPhase] = 1;

				let area = this.context.component_tableDraw[`${curPhase}_area`];

				this.setFoldCheck(area, this.context.roundphase == 'flop' ? 'fold' : "check");

				this.hideButtons();

				this.context.success_bet.forEach((bet) => {
				  emit_data.push({
            "roundNum" : parseInt(this.context.component_dealer.round_id),
            "bet_amount" : bet.amount,
            "name" : window.user_name,
            "id" : window.userId,
            "bet" : bet.table_id,
            "is_mobile" : this.context.mobile,
            'currency' : window.casino,
            "slave" : window.bet_type === 'b' ? 'bonusplus' : 'normal',
            "cancel" : bet.cancel === undefined? 0 : 1 ,
            'currencyMultiplier' : window.currencyMultiplier,
            'userMultiplier' : window.userMultiplier
          });
				});

				emit_data.push({
					"roundNum" : parseInt(this.context.component_dealer.round_id),
          "bet_amount" : 0,
          "name" : window.user_name,
          "id" : window.userId,
          "bet" : curPhase,
          "is_mobile" : this.context.mobile,
          'currency' : window.casino,
          "slave" : window.bet_type === 'b' ? 'bonusplus' : 'normal',
          "cancel" : 1 ,
          'currencyMultiplier' : window.currencyMultiplier,
          'userMultiplier' : window.userMultiplier
				});

				this.context.socket.emit('data', {
          eventName: 'bet',
          data: emit_data,
          gameName: 'Poker',
          tableId: window.tableNum,
          roundNum: parseInt(this.context.component_dealer.round_id)
        });
			});
		},
		setFoldCheck(area, type, frmSocket) {
			let chip = new createjs.Bitmap(this.context.getResources(type+"_chip"));
			chip.scaleY = 0.7;
			chip.scaleX = 0.7;
			chip.fold_check_chip = true;

			this.context.component_tableDraw.chips_container.addChild(chip);
			this.context.callback(area, 'insert-'+type);

			chip.x = area.x + area.getTransformedBounds().width/2 - 15;

			if(area.table_name == "river") {
				chip.x = area.x + area.getTransformedBounds().width/2 - 15;
			}

			chip.y = 400;
			chip.alpha = 0;
			createjs.Tween.get(chip)
			.to({
				alpha: 1,
				y:area.y + 15
			},100)
			.call(() =>{
				playSound("chip1")
				this.context.component_tableDraw.stopBetAreaAnimation(area);
			});
		},
		newround() {
			this.context.component_tableDraw.flop_area.total_bet_amt = 0;
			this.context.component_tableDraw.turn_area.total_bet_amt = 0;
			this.context.component_tableDraw.river_area.total_bet_amt = 0;
      this.context.component_tableDraw.chips_container.removeAllChildren()// remove flop turn river chips from container
      this.foldCheckStatus = {flop:0, turn:0,river:0}
		},
		extraTimeHandle(type = 'end') {
			if(type === 'end') {
				let flag = false;
				switch(this.context.roundphase) {
	        case "flop":
			      if(!this.foldCheckStatus[this.context.roundphase] && !this.getAmt(this.context.roundphase)) {
			      	flag = true;
			      }
	          this.hideButtons();
	          this.context.component_tableDraw.stopBetAreaAnimation(this.context.component_tableDraw.flop_area);
	          break;

	        case "turn":
	        	if(!this.foldCheckStatus.flop && !this.foldCheckStatus[this.context.roundphase] && !this.getAmt(this.context.roundphase)) {
			      	flag = true;
			      }
	          this.hideButtons();
	          this.context.component_tableDraw.stopBetAreaAnimation(this.context.component_tableDraw.turn_area);
	          break;

	        case "river":
	        	if(!this.foldCheckStatus.flop && !this.foldCheckStatus[this.context.roundphase] && !this.getAmt(this.context.roundphase)) {
			      	flag = true;
			      }
	          this.hideButtons();
	          this.context.component_tableDraw.stopBetAreaAnimation(this.context.component_tableDraw.river_area);
	          break;
	      }

	      if(flag) {
					this.foldCheckStatus[this.context.roundphase] = 1;
					this.foldCheckCallback();
	      }
			} else if(type === 'start' && this.context.roundphase != 'startround'){
				//specific handling if player ddnt fold/check on new round
				//checking on timer what if !flop and has ante but no flop amt
				if(this.context.roundphase != 'flop' && this.getAmt('ante') && !this.getAmt('flop') && !this.foldCheckStatus.flop) {
					this.foldCheckStatus.flop = 1;
					this.foldCheckCallback('flop');
				}

				if((this.context.roundphase === 'river' || this.context.roundphase === 'endround') && this.getAmt('ante') && this.getAmt('flop') && !this.getAmt('turn') && !this.foldCheckStatus.turn) {
					this.foldCheckStatus.turn = 1;
					this.foldCheckCallback('turn');
				}

				if(this.context.roundphase === 'endround' && this.getAmt('ante') && this.getAmt('flop') && (!this.getAmt('turn') || !this.getAmt('river')) && !this.foldCheckStatus.river) {
					this.foldCheckStatus.river = 1;
					this.foldCheckCallback('river');
				}
			}
		},
		animateChips(isWin) {

		},
		setWinChips(isWin) {

		},
		loseTableChipsAnimation(chips) {

		}, // end of loseTableChipsAnimation
		winTableChipsAnimation(chips) {

		}, // end of winTableChipsAnimation
		createWinningChips(betArea) {

		}
	});

	return instance;
}
