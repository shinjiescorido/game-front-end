import { randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap,
confirmButton, clearButton, repeatButton } from '../../../../factories/factories';
import colorConf from '../../../../assets/theme_colors_config';
import fnFormat from '../../../../factories/formatter';
import {baccaratRoadmap as bcRoadmap} from '../../../../factories/scoreboard_draw';
import baccaratTotal from '../../../../factories/baccaratTotal';
import timer_anim from './timer';

let theme = colorConf();

class Game {
	constructor(data, self) {
		this.nonNewRound = !data.isNewRound;
		this.game = new createjs.Container();
		this.game.ctx = this;
		this.yourBets = [];
		this.prevBets = [];
		this.is_confirmResponse = false;
		this.data = _.cloneDeep(data);
		this.betrange = null;
		this.totAllBet = 0;
		this.logs = [];
		this.allRanges = [];

		this.isRemoved = false;

		this.confirmClick = false;
		this.socketConnected = false;

		if(window.user_type == "C" || window.user_type == "TC") {
			this.betrange = this.data.casinoBetRanges[0]
			this.allRanges = this.data.casinoBetRanges;
		} else {
			this.betrange = this.data.sportBetRanges[0]
			this.allRanges = this.data.sportBetRanges;
		}
		// agent range checking starts here
		let roomType = this.data.roomType === 'n'? 'normal' : this.data.roomType === 'v'? 'vip' : 'premium';
		let isFlippy = this.data.gameName === 'Baccarat' && this.data.type === 'flippy';
		let a_range = _.find(window.agent_range, (a)=> {
			if(a.gameType.toLowerCase() === 'flippy') {
				return a.game === this.data.gameName && a.type === roomType && isFlippy;
			} else {
				return a.game === this.data.gameName && a.type === roomType && !isFlippy;
			} 
		});

		if(window.agent_range.length && !_.isEmpty(a_range)) {
			this.betrange = a_range.ranges[0];
			this.allRanges = a_range.ranges;
		}

		this.self = self;

		this.namespace = `${this.data.gameName}/${this.data.tableNumber}`;
		this.currentRange = '';

		//gameround
		this.gameIndicator = new createjs.Text("Game", "18px lato-black", "#fff");
		this.gameIndicator.textBaseline = "middle";
		this.gameIndicator.y = 30;
		this.gameIndicator.x = 10;
		this.game.addChild(this.gameIndicator);

		this.gameround = new createjs.Text(this.data.currentRound, "22px bebas-regular", "#fff");
		this.gameround.textBaseline = "middle";
		this.gameround.y = 32;
		this.gameround.x = 65;
		this.game.addChild(this.gameround);

		//win bet amt
		this.winBetIndicator = new createjs.Text("Bet", "18px lato-black", "#fff");
		this.winBetIndicator.textBaseline = "middle";
		this.winBetIndicator.textAlign = "right"
		this.winBetIndicator.x = 338
		this.winBetIndicator.y = 30;
		this.game.addChild(this.winBetIndicator);

		this.betWinAmt = new createjs.Text(0,"22px bebas-regular","#fff");
		this.betWinAmt.textAlign = "right"
		this.betWinAmt.textBaseline = "middle"
		this.betWinAmt.y = 32;
		this.betWinAmt.x = 338 - 40
		this.game.addChild(this.betWinAmt);

		this.betarea = [];

		this.tableContainer = new createjs.Container();
		this.game.addChild(this.tableContainer);

		/** [game buttons start here] */
		this.buttonsContainer = new createjs.Container();
		this.game.addChild(this.buttonsContainer);
		
		/**chips container **/
		this.chipsContainer = new createjs.Container();
		this.game.addChild(this.chipsContainer);

		//confirmbutton
		let conf = new confirmButton(0.6);

		this.confirmButton = conf.container;
		this.confirmButton.gotoAndStop('disabled');
		this.confirmButton.removeChild(this.confirmButton.children[0])
		this.confirmButton.updateCache();
		this.confirmButton.set({x : 80, scaleX : 0.6, scaleY: 0.6}) 
		this.buttonsContainer.addChild(this.confirmButton);

		//clearbutton
		let clear = new clearButton(0.6);
		this.clearButton = clear.container;
		this.clearButton.gotoAndStop('disabled');
		this.clearButton.removeChild(this.clearButton.children[0])
		this.clearButton.updateCache();
		this.clearButton.set({x : 80+80, scaleX : 0.6, scaleY: 0.6}) 
		this.buttonsContainer.addChild(this.clearButton);

		//repeat button
		let rep = new repeatButton(0.6);
		this.repeatButton = rep.container;
		this.repeatButton.gotoAndStop('disabled');
		this.repeatButton.removeChild(this.repeatButton.children[0])
		this.repeatButton.updateCache();
		this.repeatButton.set({scaleX : 0.6, scaleY: 0.6}) 

		this.buttonsContainer.addChild(this.repeatButton);
		this.buttonsContainer.x = 95;
		this.buttonsContainer.y = 235;

		//timer
		this.timer = _.clone(timer_anim());
		this.timer.visible = false;
		this.timer.y = 1.2;
		this.buttonsContainer.addChild(this.timer);

		/** roadmap starts here init */
		this.roadmapBg = new createjs.Shape();
		this.roadmapBg.graphics.beginFill('#f0f0f0').drawRect(0,0,336,118);
		this.roadmapBg.cache(0,0,336,118);
		this.game.addChild(this.roadmapBg);
		this.roadmapBg.x = 10;
		this.roadmapBg.y = 278;

		//bigroad
		let moveToX = this.roadmapBg.x;
		let moveToY = this.roadmapBg.y;
		let row = 6;
		let col = 17;
		let w = 19.8, h = 19.7;

		this.lines = new createjs.Shape();
		this.lines.graphics.ss(.8).s('#2b2b2b').moveTo(0,29)
				
		this.lines.graphics.moveTo(moveToX, moveToY+16)
		for(var i = 0; i <= row ; i++) {
			this.lines.graphics.moveTo(moveToX,(h*i)+moveToY).lineTo((col*w)+ moveToX,(h*i)+moveToY)
		}
		this.lines.graphics.moveTo(moveToX,moveToY)
		for(var x = 0; x <= col ; x++) {
			this.lines.graphics.moveTo(moveToX + (x*w),moveToY).lineTo(moveToX + (x*w), (row*h)+moveToY)
		}
		this.game.addChild(this.lines);
		//roadmap container
		this.roadmap_container = new createjs.Container();
		this.roadmap_container.x = this.roadmapBg.x;
		this.roadmap_container.y = this.roadmapBg.y;
		this.game.addChild(this.roadmap_container);

		this.timer.x = 80;
		this.local_time = 0;

		//methods here
		this.timerStart = false;
		this.timerAnim = false;

		this.timerInterval= [];
	}

	startTime (time, tot) {
		if(window.tutorial_enabled) return;

		if(!this.timerStart) {

			this.local_time = time;
			this.timer.timer(time, tot);
			this.timerStart = true;
			this.timer.visible = true;
			
			this.timerInterval.push(setInterval(() => {
				this.local_time--;
				
				if(this.local_time <= 10 && !this.timerAnim) {
					this.confirmButton.startTimerAnim(this.local_time);
					this.timerAnim = true;
				}

				if(this.local_time <= 0) {
					this.timer.timer(0, tot);
					this.timer.visible = false;
					this.timerStart = false;
					this.clearInterval(this.timerInterval);
					this.timerAnim = false;
					this.checkButtonState();
				}
			},1000))
		}
	}

	clearInterval(intervals) {
		intervals.forEach((i) => {
			clearInterval(i);
		})
	}

	setRoadmapData (data) {
	}		

	inputItem (data) {
	}

	newRound (data) {

		if(window.tutorial_enabled) return;
		
		this.nonNewRound = false;

		this.data.currentRound = data.roundNum;

		this.data.gameInfo = {};
		
		this.is_confirmResponse = false;
		
		this.gameround.text = this.data.currentRound;
		this.winBetIndicator.text = "Bet";
		this.betWinAmt.text = 0;

		this.winBetIndicator.color = "#fff";
		this.betWinAmt.color = "#fff"

		this.timerStart = false;

		this.resultContainer.visible = false;
		this.buttonsContainer.visible = true;

		this.yourBets = [];
		this.totAllBet = 0;
		this.totalConfirmed = 0;
		this.chipsContainer.removeAllChildren();

		for(var x = 0; x < this.betarea.length; x++) {
			this.betarea[x].total_bet_amt = 0;
			this.betarea[x].chips = [];
			this.betarea[x].isMax = false;
		}

		this.checkButtonState(true);

		this.tableContainer.alpha = 1;
	}

	setWin (data) {
		//remove bc no need
		// this.winBetIndicator.text = 'Win';
		// this.betWinAmt.text = 0;
		
		// if(data.payload.credits.total_winning > 0) {
		// 	this.betWinAmt.text = numberCounter(this.betWinAmt, data.payload.credits.total_winning, this);
		// 	this.betWinAmt.color = "#f1e382";
		// 	this.winBetIndicator.color = "#f1e382";
		// }
	}

	setWinLoseChips (data) {
		let bets = data.payload.credits.bets;

		if(!_.isArray(bets)) {
			let temp = [];
			for(var key in bets) {
				temp.push({
					bet : key,
					bet_money: bets[key].bet,
					win_money : bets[key].win
				});
			}

			bets = temp;
		}
		
		for(var x = 0; x < bets.length; x++) {
			if(bets[x].win_money > 0) {
				var area = _.find(this.betarea, function(e) {return e.table === bets[x].bet});
				//flop turn river checking				
				let extra_areas = _.find(this.extra_areas, function(e) {return e.table === bets[x].bet});
				if(this.extra_areas && extra_areas) {
					area = extra_areas;
				}
				if(_.isEmpty(area)) continue;
				//animate chips
				let amt = bets[x].win_money;
				let indicator = '';
				
				if(parseInt(amt) > 999 && parseInt(amt) <= 999999){
					amt = amt/1000;
					indicator = 'K'
				} else if(amt >= 1000000) {
					amt = amt/1000000
					indicator = 'M'
				}
				
				area.chips[area.chips.length-1].children[1].text = `${amt}${indicator}`;
				area.chips.forEach((c) => {
					createjs.Tween.get(c)
					.wait(4000)
					.to({
						y : c.y + 80,
						alpha : 0
					},600)
				});
			} else {
				var area = _.find(this.betarea, function(e) {return e.table === bets[x].bet});
				//flop turn river checking				
				let extra_areas = _.find(this.extra_areas, function(e) {return e.table === bets[x].bet});
				if(this.extra_areas && extra_areas) {
					area = extra_areas;
				}
				if(_.isEmpty(area)) continue;
				//animate chips
				area.chips.forEach((c) => {
					createjs.Tween.get(c)
					.wait(3000)
					.to({
						y : c.y - 80,
						alpha : 0
					},600)
				});
			}
		}
	}

	checkButtonState (override = false) {
		this.clearButton.gotoAndStop('disabled');
		this.confirmButton.gotoAndStop('disabled');
		this.repeatButton.gotoAndStop('disabled');
		if(override && this.prevBets.length) {
			this.repeatButton.gotoAndStop('up');
		}
		if(window.tutorial_enabled) return;
		if(!this.timerStart) return;

		let unconfirmedChips = [];
		this.betarea.forEach((area) => {
			if(!_.isEmpty(_.find(area.chips, function(e) { return !e.confirmed }))) {
				unconfirmedChips.push(_.find(area.chips, function(e) { return !e.confirmed }));
			}
		});

		if(!_.isEmpty(unconfirmedChips)) {
			this.confirmButton.gotoAndStop('up');
			this.clearButton.gotoAndStop('up');
		}

		if(this.yourBets.length) {
			this.clearButton.gotoAndStop('up');
		}

		if(this.chipsCheck('repeat')) {
			this.repeatButton.gotoAndStop('disabled');
		} else {
			this.repeatButton.gotoAndStop('up');
		}

		if(this.confirmClick) {
			this.clearButton.gotoAndStop('disabled');
			this.confirmButton.gotoAndStop('disabled');
			this.repeatButton.gotoAndStop('disabled');
		}
	}

	chipsCheck (type) {

		let unconfirmedChips = [];
		let chipsCnt = 0;

		if(!this.timerStart) return true;
		
		if(type === 'confirm') {
			
			this.betarea.forEach((area) => {
				if(area.chips.length) chipsCnt++;
			})
			this.betarea.forEach((area) => {
				if(!_.isEmpty(_.find(area.chips, function(e) { return !e.confirmed }))) {
					unconfirmedChips.push(_.find(area.chips, function(e) { return !e.confirmed }));
				}
			});
			
			// this.checkButtonState();
			if(!unconfirmedChips.length || !chipsCnt) {
				return true;
			}

			return false;
		} else if(type === 'cancel') {

			let chips = [];

			if(!this.yourBets.length) {
				this.betarea.forEach((area) => {
					if(area.chips.length) chips.push(area);
				});
				if(chips.length) return false;
			} else {
				if(this.is_confirmResponse) {
					return false;
				} else {
					return true;
				}
			}

			return true;
		} else if(type === 'repeat') {
			let temp = [];

			this.betarea.forEach((e) => {
				if(e.chips.length) {
					temp.push({
						table_id : e.table,
						amount : e.total_bet_amt
					});
				}
			});

			let comparison = _.differenceWith(this.prevBets, temp, _.isEqual);

			if(this.data.gameName === 'Poker') {
				let temp2 = _.filter(this.prevBets, function (e) {
					return e.table_id === 'ante'
				});

				for(var x = 0; x < temp2.length;x++) {
					delete temp2[x].cancel;
				}

				comparison = _.differenceWith(temp2, temp, _.isEqual);
			}
			
			//comparison
			if(!comparison.length) {
				return true;
			}
			return false;

		}
	}

	renderBets (bets) {
		this.chipsContainer.removeAllChildren();

		for(var x = 0; x < this.betarea.length; x++) {
			this.betarea[x].total_bet_amt = 0;
			this.betarea[x].chips = [];
			this.betarea[x].isMax = false;
		}

		if(this.extra_areas) {
			for(var x = 0; x < this.extra_areas.length; x++) {
				this.extra_areas[x].total_bet_amt = 0;
				this.extra_areas[x].chips = [];
			}
		}

		for(var x =0; x < bets.length; x++) {
			let area  = _.find(this.betarea, (e) => {	
				return e.table === bets[x].table_id
			});
			if(this.data.gameName === 'Poker' && (bets[x].table_id === 'flop' || bets[x].table_id === 'turn' || bets[x].table_id === 'river')) {
				area  = _.find(this.extra_areas, (e) => {	
					return e.table === bets[x].table_id
				});
			}
			if(_.isEmpty(area)) continue;
			area.isMax = false;
			area.total_bet_amt = bets[x].amount;

			if(bets[x].amount > 0) {
				this.self.context.component_multibetBetting2.addChip(area, false, true);
			}
			// poker fold check response db if 1
			if(bets[x].cancel !== undefined && bets[x].cancel) {
				if(area.table === 'flop') {
					this.foldCheck('fold', area.table)
				} else {
					this.foldCheck('check', area.table)
				}
			} // end if
		}


	}

	connectToSocket () {
		this.socketConnected = true;
		console.log("connectToSocket")
	}

	disconnectSocket () {
		this.socket.disconnect();
		console.log("disconnect")
		this.socketConnected = false;
	}

	displayResult (data) {
	}

	toggleSlaveCheck () {
		if(!_.isEmpty(_.find(this.betarea, function(e) {return e.chips.length}))) return false;
		return true;
	}

	removeBetareaChips (area) {

		area.chips.forEach((chip) => {
			this.chipsContainer.removeChild(chip);
		});

		this.totAllBet -= area.total_bet_amt;

		area.total_bet_amt = 0;
		area.chips = [];


		this.betWinAmt.text = numberCounter(this.betWinAmt, this.totAllBet, this);

		this.checkButtonState();
	}
}

export default {
	Game
}