import {createSprite, randomNum, playSound} from '../../factories/factories';

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
        });
        this.bet_areas[x].on("mouseout", (e)=> {
          // if(e.currentTarget.chips.length) return;
					if(e.currentTarget.isWin_anim) return;
					e.currentTarget.normal_state(e.currentTarget, e.currentTarget.index);
				});
			} // end for

      // Click mask on load
      // this.chipWrap = new createjs.Shape();
      // this.chipWrap.graphics.beginFill('#fff').drawRect(0, 0, 1600, 250);
      // this.chipWrap.x = 150;
      // this.chipWrap.y = 590;
      // this.chipWrap.alpha = 0.01;
      // this.addChild(this.chipWrap);
      // // if(!parseInt(window.multiplayer)) {
      // //   this.addChild(this.chipWrap);
      // // }

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

          if(this.bet_areas[x].text) {
            this.bet_areas[x].text = 0
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

			// let single = this.context.component_tableDraw.classic_outline;

			// for (var k = 0; k < single.children.length; k++) {
			// 	for (var j = 0; j < winning.length; j++) {
			// 		if(single.children[k].tablename == winning[j]) {
			// 			if(winning[j] == 'dragon') {
			// 				single.children[k].color='#334778';
			// 			} else if (winning[j] == 'tiger') {
			// 				single.children[k].color='#952f32';
			// 			} else if (winning[j] == 'tie') {
			// 				single.children[k].color='#756a2e';
			// 			}
			// 		}
			// 	}
			// }

			// this.context.component_tableDraw.classic_outline.updateCache();

			// let multi = this.context.component_multiplayer.classic_outline;

			// for (var k = 0; k < multi.children.length; k++) {
			// 	for (var j = 0; j < winning.length; j++) {
			// 		if(multi.children[k].tablename == winning[j]) {
			// 			if(winning[j] == 'dragon') {
			// 				multi.children[k].color='#334778';
			// 			} else if (winning[j] == 'tiger') {
			// 				multi.children[k].color='#952f32';
			// 			} else if (winning[j] == 'tie') {
			// 				multi.children[k].color='#756a2e';
			// 			}
			// 		}
			// 	}
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
    createTieChip(betArea, type) {
      let chips = [];
      let winnings = betArea.total_bet_amt / 2;
      let chipsfrombanker = winnings;

      //Chip container init and stacking
      let posX = betArea.x + (betArea.getTransformedBounds().width/2);
      let posY = betArea.y + (betArea.getTransformedBounds().height/2);

      let avail_chips = [];
      let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

      for (var i = 0; i < chipArr.length; i++) {
        let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
        avail_chips.push({'chip': chipArr[i], 'value': chipVal});
      }

      for (var x = avail_chips.length - 1; x > -1; x--) {
        if (chipsfrombanker == avail_chips[x].value) {
          chips.push(avail_chips[x]);
          break;
        } // end if
        else if (chipsfrombanker - avail_chips[x].value >= 0) {
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
        instance.gotoAndStop(betArea.chip_anim_toPlay);

        chipDataCon = new createjs.Container();
        chipDataCon.x = posX;
        chipDataCon.y = posY - (betArea.chips.length * 4);
        chipDataCon.alpha = 1;
        chipDataCon.animate = type;
        chipDataCon.tiePayout = true;
        chipDataCon.scaleX = chipDataCon.scaleY = betArea.chip_drop_scale;
        chipDataCon.chip_amt = chips[x].value;
        chipDataCon.addChild(instance);

        instanceMask = new createjs.Shape();
        instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 19);
        instanceMask.x = instance.x;
        instanceMask.y = instance.y;
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

        instanceTxt = new createjs.Text(instanceAmt, 'normal 25px bebas-regular', '#000');
        instanceTxt.textBaseline = 'middle';
        instanceTxt.textAlign = 'center';
        instanceTxt.x = instance.x;
        instanceTxt.y = instance.y;
        chipDataCon.addChild(instanceTxt);

        if (!betArea.is_advanced_bet) {
          instanceTxt.scaleY = 0.7;
          instanceMask.scaleY = 0.7;
        }

        // Chip adjustment
        if (parseInt(multiplayer)) {
          instanceTxt.scaleY = 0.7;
          instanceMask.scaleY = 0.7;

          let table = betArea.table_name;
          if (table == 'tiger_even' || table =='tiger_odd' || table == 'tiger_big' || table == 'tiger_small') {
              instanceTxt.skewX = -10;

          }
          else if (table == 'dragon_even' || table =='dragon_odd' || table == 'dragon_big' || table == 'dragon_small') {
              instanceTxt.skewX = 10;

          }
        }
        else{
          let table = betArea.table_name;

          if(table == 'tiger' || table == 'tiger_diamonds' || table == 'tiger_spades'){
              instanceTxt.skewX = -10;

          }
          else if(table == 'dragon' || table == 'dragon_diamonds' || table == 'dragon_spades'){
              instanceTxt.skewX = 10;

          }
          else if (table == 'tiger_even' || table =='tiger_odd' || table == 'tiger_big' || table == 'tiger_small' || table == 'tiger_hearts' || table == 'tiger_clubs') {
              instanceTxt.skewX = -15;

          }
          else if (table == 'dragon_even' || table =='dragon_odd' || table == 'dragon_big' || table == 'dragon_small' || table == 'dragon_hearts' || table == 'dragon_clubs') {
              instanceTxt.skewX = 15;
          }
        }

        betArea.chips.push(chipDataCon);
        this.context.component_betBoard.addChild(chipDataCon);
      } //end for

      return chipDataCon;
    },
    loseTableChipsAnimation(chips) {
      let posX = (this.context.stage.baseWidth / 2) + 50;
      let posY = (this.context.stage.baseHeight / 2) - 100;

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
            x: this.context.component_betDetails.x + 50,
            y: this.context.component_betDetails.y
          }, 1200, createjs.Ease.quadOut)
      }
    }, // end of winTableChipsAnimation
    setWinChips(winning, multiplayerFlag) {
      let win_chips_to_animate = [];
      let winningChips = [];

       for (var i = 0; i < this.bet_areas.length; i++) {
        for (var x = 0; x < winning.length; x++) {
          if (this.bet_areas[i].multiplayer == multiplayerFlag) {
            if (this.bet_areas[i].table_name == winning[x]) {
              if (this.bet_areas[i].chips.length) {
                let winningAmt = this.setWinAmt(this.bet_areas[i]);
                winningChips = this.createWinningChips(winningAmt, this.bet_areas[i]);
              }

              this.bet_areas[i].chips.forEach((e) => {
                win_chips_to_animate.push(e);
              });
            }

            if (this.isTie || this.suitedTie) {
              this.bet_areas[i].chips.forEach((e) => {
                if (this.bet_areas[i].table_name == 'dragon' || this.bet_areas[i].table_name == 'tiger') {
                  if (e.tiePayout && e.animate == 'win') {
                    win_chips_to_animate.push(e);
                  }
                }
              });
            } //end of check if tie

          } //end of multiplayer check
        } //end of  bet area loop
      } //end of forloop winning length

      if (win_chips_to_animate) {
        setTimeout(() => {
          this.winTableChipsAnimation(win_chips_to_animate);
        }, 1500);
      }
    },
    setWinAmt(betArea) {
      let total = 0;

      total = betArea.total_bet_amt * betArea.payout_multiplier;

      return total;
    },
    createWinningChips(winAmount, betArea) {
      if (this.isTie || this.suitedTie) {
        if (betArea.table_name == 'dragon' || betArea.table_name == 'tiger') {
          return;
        }
      }

      let chips = [];
      let chipsfrombanker = winAmount;

      //Chip container init and stacking
      let posX = betArea.x + (betArea.getTransformedBounds().width/2);
      let posY = betArea.y + (betArea.getTransformedBounds().height/2);

      let avail_chips = [];
      let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

      for (var i = 0; i < chipArr.length; i++) {
        let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
        avail_chips.push({'chip': chipArr[i], 'value': chipVal});
      }

      for (var x = avail_chips.length - 1; x > -1; x--) {
        if (chipsfrombanker == avail_chips[x].value) {
          chips.push(avail_chips[x]);
          break;
        } // end if
        else if (chipsfrombanker - avail_chips[x].value >= 0) {
          chipsfrombanker -= avail_chips[x].value;
          chips.push(avail_chips[x]);
          x++;
        } // end elseif
      } // end for

      if (chips.length > 2) {
        playSound("chip3")
      } else if (chips.length == 2) {
        playSound("chip2")
      } else {
        playSound("chip1")
      }

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
        instance.gotoAndStop(betArea.chip_anim_toPlay);

        chipDataCon = new createjs.Container();
        chipDataCon.x = posX - 60;
        chipDataCon.y = posY - 120;
        chipDataCon.alpha = 0;
        chipDataCon.scaleX = chipDataCon.scaleY = betArea.chip_drop_scale;
        chipDataCon.chip_amt = chips[x].value;
        chipDataCon.addChild(instance);

        instanceMask = new createjs.Shape();
        instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 22);
        instanceMask.x = instance.x;
        instanceMask.y = instance.y;
        chipDataCon.addChild(instanceMask);

        //Bet amount text
        let totalBet = winAmount;
        let instanceAmt = totalBet;

        if (parseInt(totalBet) > 999) {
          totalBet = winAmount / 1000;
          instanceAmt = totalBet+"k";
        }

        if (parseInt(totalBet) > 999) {
          instanceAmt = totalBet/1000+'M';
        }

        instanceTxt = new createjs.Text(instanceAmt, 'normal 25px bebas-regular', '#000');
        instanceTxt.textBaseline = 'middle';
        instanceTxt.textAlign = 'center';
        instanceTxt.x = instance.x;
        instanceTxt.y = instance.y;
        chipDataCon.addChild(instanceTxt);

        if (!this.context.mobile) {
          instanceTxt.scaleY = 0.7;
          instanceMask.scaleY = 0.7;
        }

        // Chip adjustment
        if (parseInt(multiplayer)) {
          instanceTxt.scaleY = 0.7;
          instanceMask.scaleY = 0.7;

          let table = betArea.table_name;
          if (table == 'tiger_even' || table =='tiger_odd' || table == 'tiger_big' || table == 'tiger_small') {
              instanceTxt.skewX = -10;

          }
          else if (table == 'dragon_even' || table =='dragon_odd' || table == 'dragon_big' || table == 'dragon_small') {
              instanceTxt.skewX = 10;

          }
        }
        else{
            let table = betArea.table_name;

            if(table == 'tiger' || table == 'tiger_diamonds' || table == 'tiger_spades'){
                instanceTxt.skewX = -10;

            }
            else if(table == 'dragon' || table == 'dragon_diamonds' || table == 'dragon_spades'){
                instanceTxt.skewX = 10;

            }
            else if (table == 'tiger_even' || table =='tiger_odd' || table == 'tiger_big' || table == 'tiger_small' || table == 'tiger_hearts' || table == 'tiger_clubs') {
                instanceTxt.skewX = -15;

            }
            else if (table == 'dragon_even' || table =='dragon_odd' || table == 'dragon_big' || table == 'dragon_small' || table == 'dragon_hearts' || table == 'dragon_clubs') {
                instanceTxt.skewX = 15;
            }
        }

        createjs.Tween.get(chipDataCon)
          .wait(x*200)
          .to({
            alpha: 1,
            y: (posY + 4) - (betArea.chips.length * 4)
          }, 120, createjs.Ease.quadOut)

        betArea.chips.push(chipDataCon);
        this.context.component_betBoard.addChild(chipDataCon);
      } //end for
    }
	});
	return instance;
}
