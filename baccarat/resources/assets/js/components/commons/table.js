import { createSprite, randomNum, createCardSprite, numberCounter, playSound, getSlaveParam } from '../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		bet_areas: [],
		opposites: null,
    bet_cnt : 0,
		main() {

			this.bet_areas = this.context.component_tableDraw.bet_areas;

			for (var x = 0; x < this.bet_areas.length; x++) {
				this.bet_areas[x].total_bet_amt = 0;
        // this.bet_areas[x].total_value_amt = 0;
				this.bet_areas[x].chips = [];
				this.addChild(this.bet_areas[x]);

				if (this.bet_areas[x].text !== undefined) {

					if(this.bet_areas[x].text.length)  { //if text is array
						for (var i = 0; i <  this.bet_areas[x].text.length; i++) {
							this.addChild(this.bet_areas[x].text[i])
							this.bet_areas[x].text[i].hitArea = this.bet_areas[x];
						}
					} else {
						this.addChild(this.bet_areas[x].text)
						this.bet_areas[x].text.hitArea = this.bet_areas[x];
					}
				} // end if

				if (this.bet_areas[x].bet_amt_text !== undefined) {
					this.addChild(this.bet_areas[x].bet_amt_text)
					this.bet_areas[x].bet_amt_text.hitArea = this.bet_areas[x];
				} // end if

				if (this.bet_areas[x].board_img !== undefined) {

					if(this.bet_areas[x].board_img.length) {
						for (var i = 0; i <  this.bet_areas[x].board_img.length; i++) {
							this.addChild(this.bet_areas[x].board_img[i]);
							this.bet_areas[x].board_img[i].hitArea = this.bet_areas[x];
						}
					} else {
						this.addChild(this.bet_areas[x].board_img);
						this.bet_areas[x].board_img.hitArea = this.bet_areas[x];
					}
				} // end if

				this.bet_areas[x].index = x;

				this.bet_areas[x].on("mouseover", (e)=> {
					// if(e.currentTarget.chips.length) return;
          // if(!e.currentTarget.hover_state) return;
					if(e.currentTarget.isWin_anim) return;
					e.currentTarget.hover_state(e.currentTarget, e.currentTarget.index);
          $('body').css('cursor', 'pointer')
          if(window.junket == 1 && !_.isEmpty(window.vendorData) && this.context.isBalance) {
          	console.log(e.currentTarget.x,":::::::", e.currentTarget.y, "::::::::")
          	this.context.component_balanceBet.generateToolTip(e.currentTarget);
          }
        });
        this.bet_areas[x].on("mouseout", (e)=> {
          // if(e.currentTarget.chips.length) return;
          if(e.currentTarget.isWin_anim) return;
          e.currentTarget.normal_state(e.currentTarget, e.currentTarget.index);
          $('body').css('cursor', 'default')
          this.context.component_balanceBet.visible = false;
				});

			} // end for

      // Click mask on load
      // this.chipWrap = new createjs.Shape();
      // this.chipWrap.graphics.beginFill('#fff').drawRect(0, 0, 1500, 250);
      // this.chipWrap.x = 210;
      // this.chipWrap.y = 590;
      // this.chipWrap.alpha = 0.01;
      // this.addChild(this.chipWrap);
      // 
      // if(!parseInt(window.multiplayer)) {
      //   this.addChild(this.chipWrap);
      // }

      // this.chipWrap.addEventListener("click", (e) => {
      //   this.context.component_messages.setMessage(window.language.prompts.promptfirstround, 1);
      //   return;
      // });

		},
		checkTableHighlight () {
			for ( var x = 0;x<this.bet_areas.length;x++) {
				if (!this.bet_areas[x].chips.length) {
					if (this.bet_areas[x].graphics !== undefined) {
						this.bet_areas[x].normal_state(this.bet_areas[x],x);
					} else {
						this.bet_areas[x].gotoAndStop(0);
					}
					this.bet_areas[x].total_bet_amt = 0;
				}
				if (this.bet_areas[x].chips.length) {
					if (this.bet_areas[x].graphics !== undefined) {
						this.bet_areas[x].dropped_state(this.bet_areas[x],x);
					} else {
						this.bet_areas[x].gotoAndStop(2);
					}
				}
			}
		},
		setIndicatorText(amt) {
			this.bet_indicator_text.text = amt.toLocaleString();
		},
		clearTableChipBets() {
			for (var x = 0;x<this.bet_areas.length;x++) {
				if(!this.bet_areas[x].is_advanced_bet) {
					if (this.bet_areas[x].graphics!== undefined) {
						this.bet_areas[x].normal_state(this.context.component_betBoard.bet_areas[x],x);
					} else {
						this.bet_areas[x].gotoAndStop(0);
					}
					this.bet_areas[x].total_bet_amt = 0;
					let table = this.bet_areas[x];

					for (var i = 0;i < table.chips.length;i++) {
						this.removeChild(table.chips[i]);
						table.chips.splice(i,1);
						i--;
					}
				}
			}//end of for loop
		},
		tableWinning(winning) {
			let lose_chips_to_animate = [];
			let single = this.context.component_tableDraw.classic_outline;
			// let single = this.context.component_tableDraw.classic_outline;
			//
			// console.log("single",single);
			//
			// for (var k = 0; k < single.children.length; k++) {
			//     for (var j = 0; j < winning.length; j++) {
			//         if(single.children[k].tablename == winning[j]) {
			//             if(winning[j] == 'dragon') {
			//                 single.children[k].color='#334778';
			//             } else if (winning[j] == 'tiger') {
			//                 single.children[k].color='#952f32';
			//             } else if (winning[j] == 'tie') {
			//                 // single.children[k].color='#756a2e';
			//             }
			//         }
			//     }
			// }
			// this.context.component_tableDraw.classic_outline.updateCache();
			//
			// let single_supersix = this.context.component_tableDraw.supersix_outline;
			//
			// for (var k = 0; k < single.children.length; k++) {
			//     for (var j = 0; j < winning.length; j++) {
			//         if(single_supersix.children[k].tablename == winning[j]) {
			//             if(winning[j] == 'dragon') {
			//                 single_supersix.children[k].color='#334778';
			//             } else if (winning[j] == 'tiger') {
			//                 single_supersix.children[k].color='#952f32';
			//             } else if (winning[j] == 'tie') {
			//                 // single.children[k].color='#756a2e';
			//             }
			//         }
			//     }
			// }
			// this.context.component_tableDraw.supersix_outline.updateCache();
			//
			// let multi = this.context.component_multiplayer.classic_outline;
			//
			// for (var k = 0; k < multi.children.length; k++) {
			//     for (var j = 0; j < winning.length; j++) {
			//         if(multi.children[k].tablename == winning[j]) {
			//             if(winning[j] == 'dragon') {
			//                 multi.children[k].color='#334778';
			//             } else if (winning[j] == 'tiger') {
			//                 multi.children[k].color='#952f32';
			//             } else if (winning[j] == 'tie') {
			//                 // multi.children[k].color='#756a2e';/**/
			//             }
			//         }
			//     }
			// }
			// this.context.component_multiplayer.classic_outline.updateCache();
			//
			// let multi_supersix = this.context.component_multiplayer.classic_outline;
			//
			// for (var k = 0; k < multi_supersix.children.length; k++) {
			//     for (var j = 0; j < winning.length; j++) {
			//         if(multi_supersix.children[k].tablename == winning[j]) {
			//             if(winning[j] == 'dragon') {
			//                 multi_supersix.children[k].color='#334778';
			//             } else if (winning[j] == 'tiger') {
			//                 multi_supersix.children[k].color='#952f32';
			//             } else if (winning[j] == 'tie') {
			//                 // multi.children[k].color='#756a2e';/**/
			//             }
			//         }
			//     }
			// }
			// this.context.component_multiplayer.classic_outline.updateCache();


			for (var i = 0; i < this.bet_areas.length; i++) {
				this.bet_areas[i].normal_state(this.bet_areas[i], i);
				for (var x = 0; x < winning.length; x++) {
          // if (!this.bet_areas[i].multiplayer) {
            if (this.bet_areas[i].table_name == winning[x]) {
              if (this.bet_areas[i].graphics) {
                this.bet_areas[i].win_state(this.bet_areas[i], i);
              } else {
                this.bet_areas[i].gotoAndStop(1);
              }
              this.bet_areas[i].isWin_anim = true
              createjs.Tween.get(this.bet_areas[i], {loop: true})
                .to({
                  alpha: .4
                }, 500)
                .to({
                  alpha: 1
                }, 500)

              this.bet_areas[i].chips.forEach((e) => {
                e.is_win = true;
              });
            }
          // } //end of checking if multiplier
        } //end of bet area loop
      } //end of forloop winning length
    },// end of tableWinning
	});
	return instance;
}
