/**
 * timer.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** set timer **/

import timer_anim from '../timer-animation';

let instance = null;

export default () => {
	instance = instance || new blu.Component({
		betting_start : false,
		timer_played: false,
		timer_instance : timer_anim(),
		timer_interval : [],
		main() {
			this.visible = false;

			this.timer_instance.scaleX = 0.9;
			this.timer_instance.scaleY = 0.9;
			this.timer_instance.x = -76;
			this.timer_instance.y = -63;
		},
		clearTimer(){
			this.timer_interval.forEach(timer=>clearInterval(timer));
			this.timer_interval = [];
			this.timer = 0;
		},
		startTime(time, pause, is_hold, totalTime) {
			this.timer = parseInt(time);
			this.timer_played = false;

			let set = false;

			if(pause) {
				this.clearTimer();
				// clearInterval(this.timer_interval);
			}

			this.timer_interval.push( setInterval( () => {
				if(!is_hold) {
	 				this.setTime(this.timer, pause, totalTime);
				}

				if(!pause){
					this.timer--;
				}

				if (this.timer < 0)  {
					this.clearTimer();
					this.context.component_gameButtons.disableAllButtons(true);
					// clearInterval(this.timer_interval);

					if(!set) {
						this.removeUnconfirmedChips();
						set = true;
					}

					this.timer_instance.visible = false;

			        if(this.context.component_betBoard.visible) {
			            this.context.component_tableDraw.redrawChips();
			            this.context.toggleView();
			        }

			        return;
				} // end if
			}, 1000)); //end of interval
		},
		setTime(time, pause, totalTime) {
			if (!this.timer_played) {
				this.timer_instance.timer(time, totalTime);
				this.timer_played = true;
			} //end if

			this.betting_start = true;
			this.visible = true;
			this.timer_instance.visible = true;

			if (parseInt(time) <= 0) {
				this.betting_start = false;
			} //end if
		},
		removeUnconfirmedChips(is_response) {
			// if(_.find(this.context.component_betBoard.bet_areas, (row) => {
			//  return _.find(row.chips, 'confirmed_bet')
			// })) {
			// 	this.context.component_gameButtons.is_confirmed_bet = true;
			// }
			if(_.find(this.context.component_gameButtons.previousBet,'is_confirmed') ) {
				this.context.component_gameButtons.is_confirmed_bet = true;
			}
			
			for(var x = 0; x < this.context.component_betBoard.bet_areas.length; x++) {
				for(var i = 0; i < this.context.component_betBoard.bet_areas[x].chips.length; i++) {

					if (this.context.component_betBoard.bet_areas[x].bet_amt_text) {
		                this.context.component_betBoard.bet_areas[x].bet_amt_text.text = 0;
		            }

					this.context.component_betBoard.removeChild(this.context.component_betBoard.bet_areas[x].chips[i]);
					this.context.component_betBoard.bet_areas[x].chips.splice(this.context.component_betBoard.bet_areas[x].chips[i],1);
					i--;
					this.context.component_betBoard.checkTableHighlight();
				} //end for

			} //end for

			if(this.context.component_gameButtons.is_confirmed_bet) {
				this.context.component_gameButtons.repeatBet(true,true,is_response);
			}//end if

			// First view
			this.context.component_tableDraw.redrawChips();

			this.context.endRound();
		},
		cloneTimer(){
			
			let cloneTimerCon = new createjs.Container();
			cloneTimerCon.x = this.context.stage.baseWidth - 230;
			cloneTimerCon.y = this.context.stage.baseHeight  - 88;

			let timer = new createjs.Container();
			let timer_circle = null;
			cloneTimerCon.startTimer = (time) => {
				if(timer_circle) {
					timer.removeChild(timer_circle)
				}
				timer_circle = new createjs.Shape().set({x:80,y:80});
				// timer_circle.graphics.ss(10).beginLinearGradientStroke(["#f9eb21","#cd232a"], [0, 1],0 , -45, 0, 30);
				var strokeCommand = timer_circle.graphics.ss(8).s("rgb(97,168,85)").command;
		
				timer_circle.filters = [
					 new createjs.ColorFilter(0,1,0,1, 0,0,255,0)
				];
				
				timer_circle.rotation = -90
				timer_circle.x = 85;
				timer_circle.y = 85;
				timer.addChild(timer_circle);
				var arcCommand = timer_circle.graphics.arc(0,0,55,0,0).command;
		
				timer.tween_time = createjs.Tween.get(arcCommand)
				.to({
					endAngle:(360*Math.PI/180)
				}, (time)*1000); 
				
				//default
				var def_red, def_green, def_blue;
				var red = def_red = 97;
				var green = def_green = 168;
				var blue =  def_blue = 85;
				var red_clear, blue_clear, green_clear = false; 
				var counter =0;
		
				function color_anim(to_red, to_green,to_blue, interval) {
					counter ++;
					var lala = setInterval(function() {
		
						if(red == to_red) { //red value
							red_clear = true;
						} else {
							def_red<to_red ? red++ : red--;
						}
		
						if(green == to_green) {
							green_clear =true;
						} else {
							def_green<to_green ? green++ : green--;
						} 
		
						if(blue == to_blue) {
							blue_clear =true;
						} else {
							def_blue<to_blue ? blue++ : blue--;
						}
		
						createjs.Tween.get(strokeCommand)
						.to({
							style : "rgb("+red+","+green+","+blue+")"
						},interval,createjs.Ease.linear)
		
		
						if(blue_clear && green_clear && red_clear) {
							blue_clear= false;
							green_clear= false;
							red_clear = false;
							def_red = to_red;
							def_green = to_green;
							def_blue = to_blue;
							if(counter == 1) {
								color_anim(231,171,75,interval);
							} else if(counter==2) {
								color_anim(212,108,48,interval);
							}else if(counter==3) {
								color_anim(140,23,26,interval);
							}
							clearInterval(lala);
						}
					},interval);
				}
				
				color_anim(175,186,75,(time/0.33));
			}

			cloneTimerCon.addChild(timer);

			timer.x = -76;
			timer.y = -63;
			timer.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);
			timer.scaleX = 0.9;
			timer.scaleY = 0.9;
			return cloneTimerCon;
		},

	});

	return instance;
}
