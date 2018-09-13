import { createSprite, randomNum, createCardSprite, numberCounter,numberWithCommas, playSound } from '../../factories/factories';
import  {bc_opposite, dt_opposite, sb_opposite, poker_opposite} from './multiOppositebet';

import {baccarat} from './factory/baccarat';
import {dragonTiger} from './factory/dragonTiger';
import {poker} from './factory/poker';
import {sicbo} from './factory/sicbo';
import {redwhite} from './factory/redwhite';

let instance = null;

export default() => {

	instance = instance || new blu.Component({
		tempMoney : 0,
		main () {
			this.chipsConf = this.context.chipsConf;
		},
		register(game, flag) {
			for(var  i = 0; i < game.betarea.length; i++) {
				game.betarea[i].addEventListener('click', this.multibetDropevent.bind(this), false);
			}
			if(!flag) {
				game.confirmButton.on("click", this.confirmBet.bind(this));
				game.clearButton.on("click", this.clearBet.bind(this));
				game.repeatButton.on("click", this.repeatBet.bind(this));
			}
		},
		confirmBet(e) {
			let ctx = e.currentTarget.parent.parent.ctx;
			console.log(ctx.confirmClick, "wawawawwa")
			if(ctx.confirmClick) return;

			if(ctx.chipsCheck('confirm') || e.currentTarget.currentAnimation ==='click' || e.currentTarget.currentAnimation ==='disabled') {
				return;
			}

			e.currentTarget.gotoAndStop('disabled');
			ctx.clearButton.gotoAndStop('disabled');

			ctx.yourBets = [];

			this.context.user_no_bet_count = 0;

			ctx.betarea.forEach((betarea) =>{
				if(betarea.chips.length && betarea.total_bet_amt > 0) {
					if(betarea.total_bet_amt < betarea.min_betAmt) {
						// alert('min bet required');
						this.context.component_messages.setMessage(window.language.prompts.promptminbet,1);
						if(ctx.data.gameName === 'Baccarat') {
							if(betarea.table === 'player' || betarea.table === 'banker') {
								ctx.betarea.forEach((area) => {
									ctx.removeBetareaChips(area);
								});
							}
						} else {
							ctx.removeBetareaChips(betarea);
						}
						return;						
					}
					ctx.yourBets.push({
						"amount" : betarea.total_bet_amt,
						"table_id": betarea.table,
						"dividend": betarea.payout_multiplier ? betarea.payout_multiplier : 1,
						"slave" : ''
					});
				}
			});

			if(ctx.data.gameName == 'Baccarat') {
				let mainbet = _.find(ctx.yourBets, function (e) {return e.table_id == 'player' || e.table_id == 'banker'});
				if(_.isEmpty(mainbet)) {
					ctx.yourBets = [];	
				}
			}

			let slaveJson = {
				'supersix' : 's',
				'insurance' : 'i',
				'bonus' : 'b',
				'normal' : 'r',
				'classic' : 'r'
			}

			let type = 'm';
			
			if(ctx.data.gameName === 'Poker') {
				type = ctx.slave !== 'classic' ? 'b' : 'r'; 
			}

			this.context.component_multibetv2.setActionLogs('confirm', ctx);
			
			let betData = {
				data: ctx.yourBets,
				round_id : ctx.data.currentRound,
				logs : ctx.logs,
				type : type,
				slave : ctx.slave ? slaveJson[ctx.slave] : '',
				is_multibet : true,
				range: ctx.currentRange,
				device : 's'
			}

			if(!ctx.yourBets.length) {
				setTimeout(()=> {
					ctx.betWinAmt.text = 0;
				},500)
				return;
			}

			ctx.confirmClick = true;
			$.post(ctx.links.confirm, betData, (response) => {
				let isFail = parseInt(response.fail);

				ctx.confirmClick = false;

				let data = response.data;
				if(typeof data === 'string') {
					data = JSON.parse(data);
				}

				if(!Array.isArray(data)) { //not array then poker
					let arranged = [];
					let index = 0;
					for(var key in data) {
						arranged[index] = {
							bet : key,
							bet_money: data[key].bet,
							user_money: data[key].user_money,
							win: 0
						}
						index++;
					}
					data = arranged;
				}

				this.moneyChange(response.money);

				ctx.betarea.forEach((area) => {
					if(_.find(data, function(e) { return e.bet === area.table})) {
						area.chips.forEach((chip) =>{
							chip.confirmed = true;
						});
					}
				});

				//success response
				ctx.yourBets = [];
				if(!isFail && data.length) {

					data.forEach((d) => {
						ctx.yourBets.push({
							table_id : d.bet,
							amount : d.bet_money,
						});
					})

					ctx.prevBets = ctx.yourBets;

					ctx.is_confirmResponse = true;
					let emit_data = [];
					
					let slaveslave =  ctx.slave !='classic' ? ctx.slave : 'normal';
					
					if(ctx.data.gameName == 'Poker') {
						slaveslave = slaveslave.indexOf('bonus') > -1 ? 'bonusplus' : slaveslave;
					}

					ctx.yourBets.forEach((data) => {
						emit_data.push({
							"roundNum" : parseInt(ctx.data.currentRound),
							"bet_amount" : data.amount,
							"name" : window.user_name,
							"id" : window.userId,
							"bet" : data.table_id,
							"is_mobile" : false,
							'currency' : window.casino,
						  'slave' : slaveslave,
						  'currencyMultiplier' : window.currencyMultiplier,
						  'userMultiplier' : window.userMultiplier
						});
					});

          ctx.socket.emit('data', {
          	eventName : 'bet',
          	data: emit_data,
          	gameName: ctx.data.gameName,
          	tableId: ctx.data.tableNumber,
          	roundNum: parseInt(ctx.data.currentRound)
          }, (e) => {});

					ctx.checkButtonState();

				} else if(isFail && !data.length) { //fail
					ctx.yourBets = [];
					ctx.chipsContainer.removeAllChildren();

					ctx.totAllBet = 0;
					//set all chips to confirmed
					ctx.betarea.forEach((area) => {
						area.chips = [];
						area.total_bet_amt = 0;
						area.isMax = false;
					});

					ctx.checkButtonState();

					this.context.component_messages.setMessage(window.language.prompts.promptbetfail, 1);

					console.log('fail');
				} else if(isFail && data.length) { //additional fail
					ctx.yourBets = [];
					ctx.chipsContainer.removeAllChildren();

					ctx.totAllBet = 0;
					//set all chips to confirmed
					ctx.betarea.forEach((area) => {
						area.chips = [];
						area.total_bet_amt = 0;
						area.isMax = false;
					});

					data.forEach((d) => {
						ctx.yourBets.push({
							table_id : d.bet,
							amount : d.bet_money,
						});
					})

					ctx.prevBets = ctx.yourBets;

					this.repeatBet({currentTarget : ctx.repeatButton});

					//set all chips to confirmed
					ctx.betarea.forEach((area) => {
						area.chips.forEach((chip) => {
							chip.confirmed = true;
						})
					});

					ctx.checkButtonState();

					this.context.component_messages.setMessage(window.language.prompts.promptbetfail, 1);

					console.log('fail w/ success')
				}

				
				let amt = _.sumBy(ctx.yourBets, 'amount');
				console.log(amt, "amtttt")
				ctx.betWinAmt.text = numberWithCommas(amt);
				
				ctx.renderBets(ctx.yourBets); //redraws whatever returns from database
			})
		},
		clearBet(e) {
			let ctx = e.currentTarget.parent.parent.ctx;
			
			if(ctx.data.gameName === 'Poker' && ctx.timerType != 'startround') {
				ctx.checkButtonState();
				return;
			}

			if(ctx.chipsCheck('cancel') || e.currentTarget.currentAnimation === 'click') {
				// alert('no');
				return;
			}

			e.currentTarget.gotoAndStop('click');
			let slave = 'normal';
			if(ctx.data.gameName === 'Poker') {
				if(ctx.slave === 'bonus') {
					slave = 'bonusplus'
				}
			} else {
				slave = ctx.slave === 'classic' ? 'normal' : ctx.slave
			}
			
			console.log(ctx.slave, "slave cancel")
			let data = {
				type: 'm',
				slave : slave,
				range: ctx.currentRange,
				device : 's'
			};

			this.context.component_multibetv2.setActionLogs('clear', ctx);

			$.post(ctx.links.cancel, data, (response) => {
				let isSuccess = parseInt(response.status);
					
				this.moneyChange(response.money);
				ctx.confirmClick = false;
				if(isSuccess) {

					ctx.is_confirmResponse = false;
					
					ctx.chipsContainer.removeAllChildren();
					ctx.yourBets = [];
					for(var x = 0; x <ctx.betarea.length; x++) {
						ctx.betarea[x].chips = [];
						ctx.betarea[x].total_bet_amt = 0;
						ctx.betarea[x].isMax = false;
					}
					ctx.totAllBet = 0;

					ctx.checkButtonState();

					ctx.betWinAmt.text = ctx.totAllBet;

					ctx.socket.emit('data', {
	        	eventName : 'cancel',
	        	gameName: ctx.data.gameName,
	        	tableId: ctx.data.tableNumber,
	        	roundNum: parseInt(ctx.data.currentRound),
        		data : [{
              roundNum : parseInt(ctx.data.currentRound),
              range : `${ctx.betrange.min}-${ctx.betrange.max}`,
              name : window.user_name,
              id : window.userId,
              slave : slave === undefined  || slave ==='classic' ? 'normal' : slave
	          }]
	        }, (e) => {});
				} else {
					e.currentTarget.gotoAndStop('up');
				}
			});

		},
		repeatBet(e, flag, log = true) {
			
			let ctx = e.currentTarget.parent.parent.ctx;

			if(!flag) {
				if(ctx.chipsCheck('repeat')) return;
			}

			ctx.chipsContainer.removeAllChildren();

			if(!flag) {
				if(!ctx.timerStart) return;
			}

			if(log) {
				this.context.component_multibetv2.setActionLogs('repeat', ctx);
			}

			ctx.totAllBet = 0;
			
			for(var x = 0; x <ctx.betarea.length; x++) {
				ctx.betarea[x].chips = [];
				ctx.betarea[x].total_bet_amt = 0;
			}

			if(ctx.data.gameName === 'Poker') {
				ctx.prevBets = _.filter(ctx.prevBets, function (e) {
					return e.table_id === 'ante'
				});
			}

			let toUse = ctx.prevBets;
			if(flag) {
				toUse = ctx.yourBets;
			}

			ctx.betarea.forEach((area) => {
				toUse.forEach((bets) => {
					if(area.table === bets.table_id) {
						area.total_bet_amt = bets.amount;
						if(bets.amount > 0) {
							this.addChip(area, false); 
						}
					}
				});
			});

			if(!flag) { // if button repeat click, add anim
				ctx.betWinAmt.text = numberCounter(ctx.betWinAmt, ctx.totAllBet, this);
			} else {
				ctx.betWinAmt.text = numberWithCommas(ctx.totAllBet);
			}

			ctx.checkButtonState();
		},
		moneyChange(money) {
      if(window.casino == "SS") {
        this.context.context.user_money = parseFloat(money).toFixed(2);
      } else {
        this.context.context.user_money = parseInt(money);
      }
      this.context.component_betDetails.reinit(true)
		},
		multibetDropevent(e) {
			let ctx = e.currentTarget.parent.parent.ctx;

			if(!ctx.timerStart) {
				return;
			}

			if(!this.context.component_chips.selected_chip) return;

			if(ctx.nonNewRound) {
				this.context.component_messages.setMessage(window.language.prompts.promptfirstround, 1);
				return;
			}

			let target_area = e.currentTarget;

			let isMax = this.context.component_chips.selected_chip.chip_amt === 'max';

			let amt = !isMax ? this.context.component_chips.selected_chip.chip_amt : target_area.max_betAmt;
	
			// opposite checking 			
			let condition = false;
			let required = false;
			switch(ctx.data.gameName) {
				case 'Baccarat':
					condition = bc_opposite(ctx, target_area);
					break;
				case 'Dragon-Tiger':
					condition = dt_opposite(ctx, target_area);
					break;
				case 'Poker':
					condition = poker_opposite(ctx, target_area);
					if(target_area.table != 'ante' && !ctx.yourBets.length) required = true;
					break;
				case 'Sicbo':
					condition = sb_opposite(ctx, target_area);
					break;
			}

			if(required) {
				this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_antebetrequired,1);
				return;
			}
			if(condition) return;

			if(target_area.isMax) {
				this.context.component_messages.setMessage(window.language.prompts.promptmaxbet,1);
				return;
			}

			if(amt > this.context.context.user_money && isMax) {
				amt = parseInt(Math.abs(parseInt(this.context.context.user_money) -  this.fnGetAllGamesBetAmt()));
			}

			amt = (amt % currencyMultiplier) ? amt - (amt % currencyMultiplier) : amt;

			let temp = parseInt((this.fnGetAllGamesBetAmt() + amt));

			//calculating money when less than max and has drops
			if(temp > this.context.context.user_money && amt && isMax) amt = parseInt(this.context.context.user_money) - this.fnGetAllGamesBetAmt(); //somewhat useless
			temp = parseInt((this.fnGetAllGamesBetAmt() + amt));

			let remain = this.context.context.user_money % window.currencyMultiplier;

			if((temp-remain) > (this.context.context.user_money-remain) || !amt || amt === remain) {
				console.log("why here sulod", temp, this.context.context.user_money-remain, amt)
				this.context.component_messages.setMessage(window.language2.com_sub_rooms_notenoughbalance,1);
				return;
			}

			if(isMax) {
				//poker conditions mother father
				if(ctx.data.gameName.toLowerCase() === 'poker') {
					if(target_area.table === 'ante') {
						let temp = parseInt(this.context.context.user_money) - this.fnGetAllGamesBetAmt();
						if((temp/3) < target_area.max_betAmt) {
							amt = (temp/3)
						}
					}
				}
				//end of poke rchecking 
				
				// checks remainder
				amt = amt - (amt % window.currencyMultiplier);
				if(amt.toString().indexOf('.') > -1) {
					amt = parseInt(amt.toString().split('.')[0])
				}

				if((target_area.total_bet_amt) >= target_area.max_betAmt) {
					this.context.component_messages.setMessage(window.language.prompts.promptmaxbet,1);
					return;
				}

				if((target_area.total_bet_amt+amt) < target_area.max_betAmt) {
					target_area.total_bet_amt += amt;
				} else {
					target_area.total_bet_amt = amt;
				}
			
			} else {
				
				if((target_area.total_bet_amt + amt) > target_area.max_betAmt) {
					// alert('max');
					this.context.component_messages.setMessage(window.language.prompts.promptmaxbet,1);
					return;
				}

				target_area.total_bet_amt += amt;

				let remain = target_area.total_bet_amt %  window.currencyMultiplier;
				target_area.total_bet_amt = remain > 0 ? target_area.total_bet_amt - remain : target_area.total_bet_amt;				

			}

			target_area.isMax = isMax;
			//adding chip to area
			this.addChip(target_area);

			this.context.component_multibetv2.setActionLogs('insert', ctx, this.context.component_chips.selected_chip, target_area);
			
			playSound('chip1');

			// ctx.betWinAmt.text = numberCounter(ctx.betWinAmt, ctx.totAllBet, this);

			ctx.checkButtonState();
		},
		addChip (target, isAnim = true, confirmed = false) {
			let ctx = target.parent.parent.ctx;

			let avail_chips = [];
			let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];
			let targetAmt = parseInt(target.total_bet_amt);

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
			}

			let count = avail_chips.length-1;
			let chips = [];

			for (var x = avail_chips.length-1; x > -1; x--) {
				if (targetAmt == avail_chips[x].value) {
					chips.push(avail_chips[x]);
					break;
				} // end if
				else if (targetAmt-avail_chips[x].value >= 0){
					targetAmt -= avail_chips[x].value;
					chips.push(avail_chips[x]);
					x++;
				} // end elseif
			} // end for

			let instance = null, chipDataCon = null, instanceTxt = null;

			//removing chips
			if(target.chips.length) {
				target.chips.forEach((c) => {
					ctx.chipsContainer.removeChild(c);
				});
			}

			//so that only 1 chip image renders
			if(chips.length > 1) {
				chips = chips.splice(chips.length-1, chips.length)
			}

			for (var x = 0; x < chips.length; x++) {
				let chip_name = "chip_"+(chips[x].chip);

				this.chipsConf.forEach((c) => {
					if(chips[x].chip == c.chipval) {
						chip_name = "chip_"+c.chipName.split("_")[2]
					}
				})

				instance = createSprite(this.context.getResources(chip_name), 80, 80, instance);
				instance.regX = instance.getBounds().width / 2;
    		instance.regY = instance.getBounds().height / 2;
    		instance.x = instance.y = 0;
				instance.chip_amt = chips[x].value;
				instance.gotoAndStop(0);
				instance.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 0, 5, 5);

				chipDataCon = new createjs.Container();
				chipDataCon.scaleX = chipDataCon.scaleY = !target.chip_scale ? 1 : target.chip_scale;

        chipDataCon.x = target.x + target.getTransformedBounds().width / 2
        chipDataCon.toy = (target.y + target.getTransformedBounds().height / 2);
        chipDataCon.y = (target.y + target.getTransformedBounds().height / 2) + 60;
        chipDataCon.alpha = 0;

        chipDataCon.addChild(instance);	

        //Bet amount text
				let totalBet = target.total_bet_amt;
	      let instanceAmt = totalBet;

				if (parseInt(totalBet) > 999) {
					totalBet = target.total_bet_amt / 1000;
	        instanceAmt = totalBet+"k";
				}
				
      	if (parseInt(totalBet) > 999) {
        	instanceAmt = totalBet/1000+'M';
      	}

				instanceTxt = new createjs.Text(instanceAmt, '26px bebas-regular','#000');
				instanceTxt.textBaseline = 'middle';
				instanceTxt.textAlign = 'center';
				instanceTxt.x = 0;
				instanceTxt.y = 2;
				chipDataCon.addChild(instanceTxt);

				chipDataCon.confirmed = confirmed;

				target.chips.push(chipDataCon);
			}

			ctx.chipsContainer.addChild(chipDataCon);

			if(isAnim) {
				createjs.Tween.get(chipDataCon)
				.to({
					alpha : 1,
					y : chipDataCon.toy
				}, 200)
			} else {
				chipDataCon.alpha = 1;
				chipDataCon.y = chipDataCon.toy;
			}
			
			ctx.totAllBet = _.sumBy(ctx.betarea, function (o) {return o.total_bet_amt});

		},
		fnGetAllGamesBetAmt() {
			this.tempMoney = _.sumBy(this.context.component_multibetv2.games, function (o) {return o.totAllBet});

			this.context.component_multibetv2.games.forEach((game) => {
				if(game.is_confirmResponse) {
					game.totalConfirmed = _.sumBy(game.yourBets, function (o) {return o.amount});
				} else {
					game.totalConfirmed = 0;
				}
			});

			let temp = _.sumBy(this.context.component_multibetv2.games, function (o) {
				return o.totalConfirmed
			});

			// flop calculation additionak
			let pokergame = _.find(this.context.component_multibetv2.games, function (e) {return e.data.gameName.toLowerCase() === 'poker'});
			if(!_.isEmpty(pokergame)) {
				let ante = _.find(pokergame.betarea, function(e) {return e.table === 'ante'});
				let flop = _.find(pokergame.extra_areas, function(e) {return e.table === 'flop'});
				let pokerBets = _.find(pokergame.yourBets, function(e) {return e.table_id === 'flop'});
				let flopBet = _.find(pokergame.yourBets, function(e) {return e.table_id === 'flop'});
				let turnBet = _.find(pokergame.yourBets, function(e) {return e.table_id === 'turn'});
				let riverBet = _.find(pokergame.yourBets, function(e) {return e.table_id === 'river'});
				if(!_.isEmpty(ante) && !_.isEmpty(flop)) {
					//adding default if empty bets
					if(_.isEmpty(pokerBets)) {
						pokerBets = { flop: 0, cancel: 0 }
					}

					if(ante.total_bet_amt && !pokerBets.cancel) {
						temp -= (ante.total_bet_amt *2)
					}

					if(!_.isEmpty(turnBet)) temp -= (turnBet.amount)
					if(!_.isEmpty(riverBet)) temp -= (riverBet.amount)
				}
			}

			let areasWithChips = _.filter(this.context.component_betBoard.bet_areas, function (e) {
				if(window.game == 'Sicbo' || window.game == 'Poker') {
					return e.chips.length;
				} else {
					return e.multiplayer == parseInt(window.multiplayer) && e.chips.length;
				}
			});

			let tot = _.sumBy(this.context.component_gameButtons.yourBets, 'amount');
			let totalAll = _.sumBy(areasWithChips, 'total_bet_amt');
			let hasAntePoker = _.find(areasWithChips, function (e) {return e.table_name === 'ante'});
			let flopBet = _.find(this.context.component_gameButtons.yourBets, function (e) {return e.table_id === 'flop'});
			let turnBet = _.find(this.context.component_gameButtons.yourBets, function (e) {return e.table_id === 'turn'});
			let riverBet = _.find(this.context.component_gameButtons.yourBets, function (e) {return e.table_id === 'river'});
			
			if(!_.isEmpty(hasAntePoker)) {
				if(!_.find(this.context.component_gameButtons.yourBets, function (e) {return e.table_id === 'flop' && e.cancel})) {
					totalAll += hasAntePoker.total_bet_amt *2;
				}
			}
			
			if(!_.isEmpty(turnBet)) {
				totalAll += turnBet.amount;
			}
			if(!_.isEmpty(riverBet)) {
				totalAll += riverBet.amount;
			}


			totalAll -= tot;

			this.tempMoney -= temp;
			this.tempMoney += totalAll;
			return parseInt(this.tempMoney);
		},
		fngetRawTotal () {
			let money = _.sumBy(this.context.component_multibetv2.games, function (o) {return o.totAllBet});
			let totalConfirmed = 0;

			this.context.component_multibetv2.games.forEach((o) => {
				totalConfirmed += _.sumBy(o.yourBets, 'amount');
			});	

			// flop calculation additionak
			let pokergame = _.find(this.context.component_multibetv2.games, function (e) {return e.data.gameName.toLowerCase() === 'poker'});
			if(!_.isEmpty(pokergame)) {
				let ante = _.find(pokergame.betarea, function(e) {return e.table === 'ante'});
				let flop = _.find(pokergame.extra_areas, function(e) {return e.table === 'flop'});
				let turn = _.find(pokergame.extra_areas, function(e) {return e.table === 'turn'});
				let river = _.find(pokergame.extra_areas, function(e) {return e.table === 'river'});

				let pokerBets = _.find(pokergame.yourBets, function(e) {return e.table_id === 'flop'});
				if(_.isEmpty(pokerBets)) {
					pokerBets = { flop: 0, cancel: 0 }
				}

				if(ante.total_bet_amt && !pokerBets.cancel && !pokerBets.amount) {
					money += ante.total_bet_amt*2;
				}

				if(flop.total_bet_amt) {
					totalConfirmed -= flop.total_bet_amt;
				}
				if(turn.total_bet_amt) totalConfirmed -= turn.total_bet_amt;
				if(river.total_bet_amt) totalConfirmed -= river.total_bet_amt;
			}

			money -= totalConfirmed;
			return money;
		},
		setCallRaise(game) {

			let ante = _.find(game.betarea, function(e) {
				return e.table === "ante";
			});

			if(!ante.total_bet_amt) return; 
			let flop_amt = ante.total_bet_amt *2;
			let turn_river_amt = ante.total_bet_amt;

			let area = _.find(game.extra_areas, function(e) {
				return e.table === game.timerType
			});

			if(game.timerType === 'flop') {
				area.total_bet_amt = flop_amt;
				this.addChip(area);
			} else {
				area.total_bet_amt = turn_river_amt;
				this.addChip(area);
			}

			//passing to db
			game.yourBets.forEach((bet) => {
				if(bet.table_id === game.timerType) {
					bet.amount = area.total_bet_amt;
					bet.cancel = 0;
				}
			});

			let betData = {
				data: game.yourBets,
				type : game.slave == 'classic' ? 'r' : 'b',
				range: game.currentRange,
				logs : game.logs
			}

			this.context.component_multibetv2.setActionLogs('confirm', game);
			console.log(game.logs, "wat logs here")
			// hide buttons
			game.foldCheckButton.visible = false;
			game.raiseCallButton.visible = false;

			$.post(game.links.confirm, betData, (response) => {

				this.moneyChange(response.money);

				let data = response.data;
				let emit_data = [];

				if(typeof data === 'string') {
					data = JSON.parse(data);
				}

				if(!Array.isArray(data)) { //not array then poker
					let arranged = [];
					let index = 0;
					for(var key in data) {
						arranged[index] = {
							bet : key,
							bet_money: data[key].bet,
							user_money: data[key].user_money,
							win: 0,
							cancel : data[key].cancel === undefined ? 0 : data[key].cancel 
						}
						index++;
					}
					data = arranged;
				}

				game.yourBets = [];
				
				data.forEach((d) => {
					game.yourBets.push({
						table_id : d.bet,
						amount : d.bet_money,
						cancel : d.cancel
					});
				})

				game.prevBets = game.yourBets;

				game.renderBets(game.yourBets); //redraws whatever returns from database

				if(parseInt(response.fail)) { //if fail raise call
					// fail on confirm so send cancel instead
					let slaveslave =  game.slave !='classic' ? game.slave : 'normal';
					if(game.data.gameName == 'Poker') {
						slaveslave = slaveslave.indexOf('bonus') > -1 ? 'bonusplus' : slaveslave;
					}
					game.yourBets.forEach((data) => {
						emit_data.push({
							"roundNum" : parseInt(game.data.currentRound),
							"bet_amount" : data.amount,
							"name" : window.user_name,
							"id" : window.userId,
							"bet" : data.table_id,
							"cancel" : data.cancel === undefined ? 0 : data.cancel,
							"is_mobile" : false,
							'currency' : window.casino,
						  'slave' : slaveslave,
						  'currencyMultiplier' : window.currencyMultiplier,
						  'userMultiplier' : window.userMultiplier
						});
					});

					game.extraButtonsContainer.visible = true;
					game.foldCheckButton.visible = true;
					game.raiseCallButton.visible = true;

					// game.yourBets.forEach((e) => {
					// 	if(e.table_id === game.timerType) e.cancel = 1;
					// });
					// 
					// $.post(game.links.setFoldCheck, {type : game.timerType}); // store in db cancel

					// let target = _.find(game.extra_areas, function (e) {return e.table === game.timerType});

					// if(!_.isEmpty(target) && target.chips) {
					// 	target.chips.forEach((c) => {
					// 		game.chipsContainer.removeChild(c);
					// 	});

					// 	let type = game.timerType === 'flop' ? 'fold' :'check';
					// 	game.foldCheck(type, game.timerType)
					// }

				}else if(!parseInt(response.fail)) { // if success bet
					let slaveslave =  game.slave !='classic' ? game.slave : 'normal';
					if(game.data.gameName == 'Poker') {
						slaveslave = slaveslave.indexOf('bonus') > -1 ? 'bonusplus' : slaveslave;
					}
					game.yourBets.forEach((data) => {
						emit_data.push({
							"roundNum" : parseInt(game.data.currentRound),
							"bet_amount" : data.amount,
							"name" : window.user_name,
							"id" : window.userId,
							"bet" : data.table_id,
							"cancel" : data.cancel === undefined ? 0 : data.cancel,
							"is_mobile" : false,
							'currency' : window.casino,
						  'slave' : slaveslave,
						  'currencyMultiplier' : window.currencyMultiplier,
						  'userMultiplier' : window.userMultiplier
						});
					});
				}


				let total = _.sumBy(game.yourBets, function (e) {
					return e.amount
				})
				
				game.betWinAmt.text = numberCounter(game.betWinAmt, total, this);

        game.socket.emit('data', {
        	eventName : 'bet',
        	data: emit_data,
        	gameName: game.data.gameName,
        	tableId: game.data.tableNumber,
        	roundNum: parseInt(game.data.currentRound)
        }, (e) => {});
				
			});
		},
		setFoldCheck(game) {

			if(_.find(game.yourBets, function (e) { return e.table_id === game.timerType}).cancel) return; ///if already cancel;ed
			// hide buttons
			game.foldCheckButton.visible = false;
			game.raiseCallButton.visible = false;

			$.post(game.links.setFoldCheck, {type : game.timerType});

			game.yourBets.forEach((bet) => {
				if(bet.table_id === game.timerType) {
					bet.cancel = 1;
				}
			});

			let flop = _.find(game.yourBets, function(e) {return e.table_id === 'flop'});

			if((game.timerType == 'turn' || game.timerType == 'river' )&& flop.cancel) return; // if ante has cancel/fold/check no add fold check to stack

			if(game.timerType ==='flop') {
				game.foldCheck('fold');
			} else {
				game.foldCheck('check');
			}
			
			let emit_data = [];

			let slaveslave =  game.slave !='classic' ? game.slave : 'normal';
			if(game.data.gameName == 'Poker') {
				slaveslave = slaveslave.indexOf('bonus') > -1 ? 'bonusplus' : slaveslave;
			}

			this.context.component_multibetv2.setActionLogs('setFoldCheck', game);

			game.yourBets.forEach((data) => {
				emit_data.push({
					"roundNum" : parseInt(game.data.currentRound),
					"bet_amount" : data.amount,
					"name" : window.user_name,
					"id" : window.userId,
					"bet" : data.table_id,
					"cancel" : data.cancel === undefined ? 0 : data.cancel,
					"is_mobile" : false,
					'currency' : window.casino,
				  'slave' :slaveslave,
				  'currencyMultiplier' : window.currencyMultiplier,
				  'userMultiplier' : window.userMultiplier
				});
			});

      game.socket.emit('data', {
      	eventName : 'bet',
      	data: emit_data,
      	gameName: game.data.gameName,
      	tableId: game.data.tableNumber,
      	roundNum: parseInt(game.data.currentRound)
      }, (e) => {});

		}

	});

	return instance;

}