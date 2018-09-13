/**
 * timer.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** set timer **/

import timer_anim from './timer-animation';

let instance = null;

export default () => {
	instance = instance || new blu.Component({
		betting_start : false,
		timer_played: false,
		timer_instance : timer_anim(),
		timer_interval : [],
		main() {
			this.visible = false;

			this.x = this.context.component_gameButtons.x - 84;
			this.y = this.context.component_gameButtons.y - 84;

			this.timer_instance.x = 18;
			this.timer_instance.y = 18 + 16;

			this.addChild(this.timer_instance);

			timer_anim().scaleX = 0.78;
			timer_anim().scaleY = 0.78;
		},
		clearTimer(){
			this.timer_interval.forEach(timer=>clearInterval(timer));
			this.timer_interval = [];
			this.timer = 0;
		},
		startTime(time, pause, is_hold, totalTime) {
			this.timer = parseInt(time);
			this.timer_played = false;

			this.context.component_gameButtons.confirmButton.startTimerAnim(time);
			this.context.component_extraBetButtons.raiseCall.startTimerAnim(time);

			this.context.component_extraBetButtons.extraTimeHandle('start');
			
			let set = false;

			if(pause) {
				this.clearTimer();
				// clearInterval(this.timer_interval);
			}

			this.timer_interval.push (setInterval( () => {
				if(!is_hold) {
	 				this.setTime(this.timer, pause, totalTime);
				}

				if(!pause){
					this.timer--;
				}

				if (this.timer < 0)  {
					this.clearTimer();
					this.context.component_gameButtons.disableAllButtons(true);
					this.context.component_extraBetButtons.extraTimeHandle('end');
					// clearInterval(this.timer_interval);
          if(!set) {
						this.removeUnconfirmedChips();
						set = true;
					}

					this.visible = false;
					this.timer_instance.visible = false;

					return;
				} // end if
			}, 1000)); //end of interval
		},
		setTime(time, pause, totalTime) {
			if(pause) return;

			this.betting_start = true;
			this.visible = true;
			this.timer_instance.visible = true;
			
			if (!this.timer_played) {
				this.timer_instance.timer(time, totalTime);
				this.timer_played = true;

				if (time > 1) {
					this.context.component_gameButtons.checkButtonState();
				}
			} // end if

			if (parseInt(time) <= 0) {
				this.betting_start = false;
			}// end if
		},
		removeUnconfirmedChips(is_response) {
			if(_.find(this.context.component_gameButtons.previousBet,'is_confirmed') ) {
				this.context.component_gameButtons.is_confirmed_bet = true;
			}

			for (var x = 0; x < this.context.component_betBoard.bet_areas.length; x++) {
				for (var i = 0; i < this.context.component_betBoard.bet_areas[x].chips.length; i++) {
					if(!this.context.component_betBoard.bet_areas[x].is_advanced_bet) {
						this.context.component_betBoard.removeChild(this.context.component_betBoard.bet_areas[x].chips[i]);
						this.context.component_betBoard.bet_areas[x].chips.splice(this.context.component_betBoard.bet_areas[x].chips[i],1);
						i--;
						this.context.component_betBoard.checkTableHighlight();
					}
				} // end for
			} // end for

			//additional make zero
			this.context.component_chips.total_ingame_bet = 0;
			
			if (this.context.component_gameButtons.is_confirmed_bet) {
				this.context.component_gameButtons.repeatBet(true, true, is_response);
			} // end if

			// this.context.endRound();
		}
	});
	return instance;
}
