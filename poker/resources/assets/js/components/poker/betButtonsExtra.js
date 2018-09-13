import {createSprite, randomNum, createCardSprite, numberCounter, playSound } from '../../factories/factories';

let instance = null;

export default (self) => {

	instance = instance || new blu.Component({
		bet_areas : [],
		yourBets : [],
		setFlop: false,
		setTurn : false,
		setRiver : false,
		anteAmt() {
			return _.find(this.context.component_betBoard.bet_areas, function (e) {return e.table_id === 'ante'}).total_bet_amt;
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
			
			return;

			/// ***** new////
			this.flop_bet_button = this.context.component_gameButtons.makeConfirmButton();
			this.addChild(this.flop_bet_button);

			// === turn bet button
			this.turn_bet_button = this.context.component_gameButtons.makeConfirmButton();
			this.addChild(this.turn_bet_button);

			// === river bet button
			this.river_bet_button = this.context.component_gameButtons.makeConfirmButton();
			this.addChild(this.river_bet_button);

			// === click buttons event listeners
			this.flop_bet_button.on("mousedown", () => {
				if(this.setFlop) return; // returnb if fold
				if(!parseInt(this.context.component_betBoard.bet_areas[0].total_bet_amt)) return;
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
				// this.flop_bet_button.button_bg.graphics.clear().beginLinearGradientFill(["#276746","#33805c","#276746"],[0,0.5,1], 0,0,130,0,170,0).drawCircle(0,0,58);

				this.context.actionCallback("confirm", this.yourBets);

				this.fold_check_btn.has_fold = true;
				this.flop_bet_button.visible = false;
				this.fold_check_btn.visible = false;
			});

			this.flop_bet_button.on("pressup", ()=> {
				this.flop_bet_button.button_bg.graphics.clear().beginLinearGradientFill(["#279144","#37b14a","#279144"],[0,0.5,1], 0,0,130,0,170,0).drawCircle(0,0,58);
			})

			// === turn button
			this.turn_bet_button.on("mousedown", () => {

				if(this.setTurn) return; // returnb if check

				if(this.context.component_timer.timer <= 0) return;
				if(!parseInt(this.context.component_tableDraw.flop_area.total_bet_amt)) return;

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
				// this.turn_bet_button.children[0].graphics.clear().beginLinearGradientFill(["#276746","#33805c","#276746"],[0,0.5,1], 0,0,130,0,170,0).drawCircle(0,0,58);
				this.context.actionCallback("confirm", this.yourBets);

				this.fold_check_btn.has_check_turn = true;
				this.turn_bet_button.visible = false;
				this.fold_check_btn.visible = false;
			});

			this.turn_bet_button.on("pressup", ()=> {
				this.turn_bet_button.children[0].graphics.clear().beginLinearGradientFill(["#279144","#37b14a","#279144"],[0,0.5,1], 0,0,130,0,170,0).drawCircle(0,0,58);
			})


			// === river button
			this.river_bet_button.on("mousedown", () => {

				if(this.setRiver) return; // returnb if check

				if(this.context.component_timer.timer <= 0) return;
				if(!parseInt(this.context.component_tableDraw.flop_area.total_bet_amt)) return;

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

				// this.river_bet_button.children[0].graphics.clear().beginLinearGradientFill(["#276746","#33805c","#276746"],[0,0.5,1], 0,0,130,0,170,0).drawCircle(0,0,58);
				this.context.actionCallback("confirm", this.yourBets);
				this.fold_check_btn.has_check_river = true;
				this.river_bet_button.visible = false;
				this.fold_check_btn.visible = false;
			});

			this.river_bet_button.on("pressup", ()=> {
				this.river_bet_button.children[0].graphics.clear().beginLinearGradientFill(["#279144","#37b14a","#279144"],[0,0.5,1], 0,0,130,0,170,0).drawCircle(0,0,58);
			})


			this.fold_check_btn = new createjs.Container();
			this.fold_check_btn.addChild(this.context.component_gameButtons.makeClearButton());
			this.fold_check_btn.visible = false;
			this.addChild(this.fold_check_btn)

			this.fold_check_btn.has_fold = false;
			this.fold_check_btn.has_check_turn = false;
			this.fold_check_btn.has_check_river = false;

			this.fold_check_btn.on("mousedown",(e)=>{
				if(!parseInt(this.context.component_betBoard.bet_areas[0].total_bet_amt)) return;

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

				// this.fold_check_btn.children[0].graphics.clear().beginLinearGradientFill(["#842828","#912a2a","#822727"],[0,0.5,1], 30,0,80,0,140,0).drawCircle(57,55,43);
				playSound("click");
			});

			this.fold_check_btn.on("pressup",(e)=>{

				// this.fold_check_btn.children[0].graphics.clear().beginLinearGradientFill(["#a22828","#cc282a","#a22828"],[0,0.5,1], 30,0,80,0,140,0).drawCircle(57,55,43);
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

			this.flop_indicator.children[1].text = currency + amount.toLocaleString()
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

			this.addChips(this.context.component_tableDraw.river_area, amount);
			this.context.component_betDetails.bet_amount += amount

			if(!onload) {
				if(window.casino == "SS") {
					this.context.context.user_money = parseFloat(this.context.context.user_money).toFixed(2) - parseInt(amount)
				} else {
					this.context.context.user_money = parseInt(this.context.context.user_money) - parseInt(amount)
				}
			}

			this.context.component_betDetails.reinit(true)

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
		addChips (betArea, amount) {


		},
		setFoldCheck(area,type, frmSocket) {

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
