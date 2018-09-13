import { createSprite, randomNum, createCardSprite, numberCounter, playSound } from '../../factories/factories';
let instance = null;

export default() => {
	instance = instance || new blu.Component({
		multibetBets : [],
		sicbo_link : {
			confirm : "http://sicbo.nihtanv2.com/bet/store",
			session: "http://10.1.10.231:8001/test"
		},
		baccarat_link : {
			confirm : "http://baccarat.nihtanv2.com/bet/store",
			session: "http://10.1.10.231:8002/test"
		},
		dragontiger_link : {
			confirm : "http://dragontiger.nihtanv2.com/bet/store",
			session: "http://10.1.10.231:8000/test"
		},
		poker_link : {
			confirm : "http://poker.nihtanv2.com/bet/store",
			session: "http://10.1.10.231:8004/test"
		},
		main() {
				
		},
		extraButtonsEvent (e) {

			if(this.context.component_multibet.active_game.game.betarea[0].total_bet_amt <= 0) return;

			if(e.currentTarget.parent.parent.timer_type == "startround") return;

			e.currentTarget.alpha = .6;
			playSound("click");

			if(e.currentTarget.parent.parent.timer_type == "flop") {
				this.multibetBets.push({
					amount : parseInt(this.context.component_multibet.active_game.game.betarea[0].total_bet_amt) * 2,
					table_id : "flop",
					dividend : 2
				});
				this.context.component_multibetBetting.addChip({target: this.context.component_multibet.active_game.game.flop_area}, this.context.component_chips.selected_chip)
				
				$.ajaxSetup({
				  xhrFields: {
				    withCredentials: true
				  }
				});
                $.post(this.context.component_multibet.active_game.game.links.confirm, {data: this.multibetBets}, (response) => {
                    if (parseInt(response) ) {
                        this.component_gameButtons.bet_saved = true;
                    }
                });
			}

			if(e.currentTarget.parent.parent.timer_type == "turn" || e.currentTarget.parent.parent.timer_type == "river") {
				this.multibetBets.push({
					amount : parseInt(this.context.component_multibet.active_game.game.betarea[0].total_bet_amt),
					table_id : e.currentTarget.parent.parent.timer_type,
					dividend : 2
				});
				let active = e.currentTarget.parent.parent.timer_type == "turn" ?  this.context.component_multibet.active_game.game.turn_area : this.context.component_multibet.active_game.game.river_area

				this.context.component_multibetBetting.addChip({target: active}, this.context.component_chips.selected_chip);

				$.ajaxSetup({
				  xhrFields: {
				    withCredentials: true
				  }
				});
                $.post(this.context.component_multibet.active_game.game.links.confirm, {data: this.multibetBets}, (response) => {
                    if (parseInt(response) ) {
                        this.component_gameButtons.bet_saved = true;
                    }
                });
			}		
		},
		multibetConfirmAction () {

			if(this.context.component_multibet.active_game.game.timer_type == "flop" || this.context.component_multibet.active_game.game.timer_type == "turn" || this.context.component_multibet.active_game.game.timer_type == "river") {
				return;
			}

			if(!this.context.component_multibet.active_game.game.timer_start) {
				return;
			}	
			this.multibetBets = [];

			for(var x = 0 ; x < this.context.component_multibet.active_game.game.betarea.length; x++) {
				if(this.context.component_multibet.active_game.game.betarea[x].total_bet_amt > 0) {
					this.context.component_multibet.active_game.game.betarea[x].chips.forEach((e)=>{
						e.is_confirmed = true;
					});

					this.multibetBets.push({
						amount : this.context.component_multibet.active_game.game.betarea[x].total_bet_amt,
						table_id : this.context.component_multibet.active_game.game.betarea[x].table,
						dividend : 2
					})
				}
			}

			if(this.multibetBets.length) {
			 	this.link = "";

			 	if(this.context.component_multibet.active_game.game.game.indexOf("accarat") > -1) {
			 		this.link = this.baccarat_link;
			 	}

			 	if(this.context.component_multibet.active_game.game.game.indexOf("icbo") > -1) {
			 		this.link = this.sicbo_link;
			 	}

			 	if(this.context.component_multibet.active_game.game.game.indexOf("oker") > -1) {
			 		this.link = this.poker_link;
			 	}

			 	if(this.context.component_multibet.active_game.game.game.indexOf("ragon-tiger") > -1) {
			 		this.link = this.dragontiger_link;
			 	}

			 	$.ajaxSetup({
				  xhrFields: {
				    withCredentials: true
				  }
				});

                $.post(this.context.component_multibet.active_game.game.links.confirm, {data: this.multibetBets}, (response) => {
                    if (parseInt(response) ) {
                        this.component_gameButtons.bet_saved = true;
                    }
                });
            }


			this.context.component_gameButtons.confirmButton.gotoAndStop("click")
			playSound("click");

			// this.multibetBets
			
		},
		multibetRepeatAction () {
			if(!this.context.component_multibet.active_game.game.timer_start) {
				return;
			}

		},
		multibetActionClear () {
			this.context.component_multibet.active_game.game.chips_container.removeAllChildren();

			this.context.component_multibet.active_game.game.totalGameBetAmt = 0;
			this.context.component_multibet.active_game.game.total_game_bet.text = 0;

			this.context.component_multibet.active_game.game.betarea.forEach((area)=>{
				area.total_bet_amt = 0;
				area.chips = [];
			});
		}
		
	});

	return instance;
}