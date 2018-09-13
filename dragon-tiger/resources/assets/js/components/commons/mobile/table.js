import {createSprite, randomNum, playSound} from '../../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		bet_areas: [],
		opposites: null,
    bet_cnt : 0,
		main() {

			this.bet_areas = this.context.component_tableDraw.bet_areas;

      // === Flat view components 
      let flatViewBg = new createjs.Shape();
      flatViewBg.graphics.beginFill('#711d1d').drawRect(0, 0, this.context.context.width, this.context.context.height);
      flatViewBg.propCommon = true;
      this.addChild(flatViewBg);

      this.toggleView = new createjs.Container();
      this.toggleView.propCommon = true;
      this.toggleView.x = -10;
      this.addChild(this.toggleView);

      let backBtnBg = new createjs.Shape();
      backBtnBg.graphics.beginFill('#711d1d').drawRect(0, 0, 80, 50);
      backBtnBg.x = this.context.context.width - 105;
      backBtnBg.y = 20;
      this.toggleView.addChild(backBtnBg);

      let advBackBtn = new createjs.Shape();
      advBackBtn.graphics.beginLinearGradientFill(['#dabf6b', '#f0e182', '#dabf6b'], [.2, .6, .9], 0, 0, 45, 0).drawRoundRect(0, 0, 65, 8, 4);
      advBackBtn.x = this.context.context.width - 95;
      advBackBtn.y = 41;
      this.toggleView.addChild(advBackBtn);

      let advBackBtn2 = new createjs.Shape();
      advBackBtn2.graphics.beginStroke('#e0c971').setStrokeStyle(8, 'round').moveTo(0, 0).lineTo(-20, 20).lineTo(0, 40);
      advBackBtn2.x = this.context.context.width - 80;
      advBackBtn2.y = 25;
      this.toggleView.addChild(advBackBtn2);

      this.toggleView.on("click",() => {
        this.context.component_tableDraw.redrawChips();
        this.context.toggleView();
      });
      // === Flat view components

			for (var x = 0; x < this.bet_areas.length; x++) {
				this.bet_areas[x].total_bet_amt = 0;
				this.bet_areas[x].chips = [];
				this.bet_areas[x].singleplayer = true;
				this.addChild(this.bet_areas[x]);

				if (this.bet_areas[x].text !== undefined) {
					if(this.bet_areas[x].text.length)  { //if text is array
						for (var i = 0; i <  this.bet_areas[x].text.length; i++) {
							this.addChild(this.bet_areas[x].text[i])
							this.bet_areas[x].text[i].singleplayer = true;
							// this.bet_areas[x].text[i].hitArea = this.bet_areas[x];
						}
					} else {
						this.addChild(this.bet_areas[x].text)
						this.bet_areas[x].text.singleplayer = true;
						// this.bet_areas[x].text.hitArea = this.bet_areas[x];
					}
				} // end if

				if (this.bet_areas[x].bet_amt_text !== undefined) {
					this.bet_areas[x].bet_amt_text.singleplayer = true;
					this.addChild(this.bet_areas[x].bet_amt_text)
					// this.bet_areas[x].bet_amt_text.hitArea = this.bet_areas[x];
				} // end if

				if (this.bet_areas[x].board_img !== undefined) {
					if(this.bet_areas[x].board_img.length) {
						for (var i = 0; i <  this.bet_areas[x].board_img.length; i++) {
							this.addChild(this.bet_areas[x].board_img[i]);
							// this.bet_areas[x].board_img[i].hitArea = this.bet_areas[x];
							this.bet_areas[x].board_img[i].singleplayer = true;
						}
					} else {
						this.addChild(this.bet_areas[x].board_img);
						// this.bet_areas[x].board_img.hitArea = this.bet_areas[x];
						this.bet_areas[x].board_img.singleplayer = true;
					}
				} // end if
			} // end for
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
						this.bet_areas[x].gotoAndStop(1);
					}
				}
			}
		},
		setIndicatorText(amt) {
			this.bet_indicator_text.text = amt.toLocaleString();
		},
		clearTableChipBets() {
			for (var x = 0;x<this.bet_areas.length;x++) {
				if (this.bet_areas[x].graphics!== undefined) {
					this.bet_areas[x].normal_state(this.context.component_betBoard.bet_areas[x],x);
				} else {
					this.bet_areas[x].gotoAndStop(0);
				}

				if(this.bet_areas[x].bet_amt_text) {
		            this.bet_areas[x].bet_amt_text.text = "0"
		        }

				this.bet_areas[x].total_bet_amt = 0;
				let table = this.bet_areas[x];
					
				for (var i = 0;i < table.chips.length;i++) {
					this.removeChild(table.chips[i]);
					table.chips.splice(i,1);
					i--;
				}
			}//end of for loop
		},
		tableWinning(winning, multiplayerFlag) {
      let lose_chips_to_animate = [];

      this.isTie = winning.some((e) => {
        return e == 'tie';
      });

      this.suitedTie = winning.some((e) => {
        return e == 'suited_tie';
      });
      
      for (var i = 0; i < this.bet_areas.length; i++) {
        for (var x = 0; x < winning.length; x++) {
          if (this.bet_areas[i].multiplayer == multiplayerFlag) {
            if (this.bet_areas[i].table_name == winning[x]) {
              if (this.bet_areas[i].graphics) {
                this.bet_areas[i].win_state(this.bet_areas[i], i);
              } else {
                this.bet_areas[i].gotoAndStop(1);
              }
              createjs.Tween.get(this.bet_areas[i], {loop: true})
                .to({
                  alpha: .4
                }, 500)
                .to({
                  alpha: 1
                }, 500)

              this.bet_areas[i].chips.forEach((e) => {
                if (this.isTie) {
                  if (this.bet_areas[i].table_name == 'dragon' || this.bet_areas[i].table_name == 'tiger') {
                    return;
                  }
                }

                e.is_win = true;
              });
            }
          } //end of checking if multiplier
        } //end of bet area loop

        if (this.bet_areas[i].chips.length) {
          if (this.bet_areas[i].multiplayer == multiplayerFlag) {
            if (this.isTie || this.suitedTie) {
              if (this.bet_areas[i].table_name == 'dragon' || this.bet_areas[i].table_name == 'tiger') {
                this.createTieChip(this.bet_areas[i], 'win');
                this.createTieChip(this.bet_areas[i], 'lose');

                this.bet_areas[i].chips.forEach((e) => {
                  if (e.tiePayout && e.animate == 'lose') {
                    lose_chips_to_animate.push(e);
                  }
                  else {
                    if (e.animate == 'win') {
                      return;
                    }

                    e.visible = false;
                  }
                });
              }
            } //end of checking tie

            this.bet_areas[i].chips.forEach((e) => {
              if (!e.is_win) {
                if (this.isTie || this.suitedTie) {
                  if (this.bet_areas[i].table_name == 'tie' || this.bet_areas[i].table_name == 'dragon' || this.bet_areas[i].table_name == 'tiger' || this.bet_areas[i].table_name == 'suited_tie') {
                    return;
                  }
                }

                lose_chips_to_animate.push(e);
              }
            });
          } // end of multiplayer check
        } // end of chips length check
      } //end of forloop winning length

      setTimeout(() => {
        this.loseTableChipsAnimation(lose_chips_to_animate);
      }, 2000);

      setTimeout(() => {
        this.setWinChips(winning, multiplayerFlag);
      }, 4000);
    }, // end of tableWinning
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

      for (var x = avail_chips.length-1;x > -1;x--) {
        if (chipsfrombanker == avail_chips[x].value) {
          chips.push(avail_chips[x]);
          break;
        } else if (chipsfrombanker-avail_chips[x].value >= 0){
          chipsfrombanker -= avail_chips[x].value;
          chips.push(avail_chips[x]);
          x++;
        }
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
        })

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
        instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 25);
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

        instanceTxt = new createjs.Text(instanceAmt, 'normal 19px bebas-regular', '#000');
        instanceTxt.textBaseline = 'middle';
        instanceTxt.textAlign = 'center';
        instanceTxt.x = instance.x;
        instanceTxt.y = instance.y;
        chipDataCon.addChild(instanceTxt);

        betArea.chips.push(chipDataCon);
        this.context.component_betBoard.addChild(chipDataCon);
      } //end for

      return chipDataCon;
    },
    loseTableChipsAnimation(chips) {
      let posX = this.context.stage.baseWidth / 2;
      let posY;

      if (parseInt(multiplayer)) {
        posY = (this.context.stage.baseHeight / 2) - 50;
      }
      else {
        posY = -200;
      }

      for (var x = 0; x < chips.length; x++) {
        createjs.Tween.get(chips[x], {override: true})
          .wait(1500)
          .to({
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

      if (this.suitedTie && betArea.table_name == 'tie') {
        total = betArea.total_bet_amt * 50;
      }
      else {
        total = betArea.total_bet_amt * betArea.payout_multiplier; 
      }

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
        instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 25);
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
