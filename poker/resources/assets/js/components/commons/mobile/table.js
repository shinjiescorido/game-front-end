import {createSprite, randomNum, playSound} from '../../../factories/factories';

let instance = null;

export default (type) => {
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
							// this.bet_areas[x].text[i].hitArea = this.bet_areas[x];
						}
					} else {
						this.addChild(this.bet_areas[x].text)
						// this.bet_areas[x].text.hitArea = this.bet_areas[x];
					}
				} // end if

				if (this.bet_areas[x].bet_amt_text !== undefined) {
					this.addChild(this.bet_areas[x].bet_amt_text)
					// this.bet_areas[x].bet_amt_text.hitArea = this.bet_areas[x];
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
				this.bet_areas[x].total_bet_amt = 0;
				let table = this.bet_areas[x];

				for (var i = 0;i < table.chips.length;i++) {
					this.removeChild(table.chips[i]);
					table.chips.splice(i,1);
					i--;
				}
			}//end of for loop
		},
		tableWinning(winning) {
      let lose_chips_to_animate = [];
      let winningArea = [];

      this.anteWin = false;
      this.bonusWin = false;
      this.bonusplusWin = false;
      this.tieWin = false;

      this.anteHand = '';
      this.bonusMultiplier = 0;
      this.bonusplusMultiplier = 0;

      for (var i = 0; i < winning.length; i++) {
      	winningArea.push(winning[i].area);

      	if (winning[i].area == 'ante') {
      		this.anteWin = true;
      		this.anteHand = winning[i].hand;
      	}

      	if (winning[i].area == 'bonus') {
      		this.bonusWin = true;
      		this.bonusMultiplier = parseInt(winning[i].multiplier);
      	}

        if (winning[i].area == 'bonusplus' && type == 'b') {
            this.bonusplusWin = true;
            this.bonusplusMultiplier = +winning[i].multiplier;
        }

      	if (winning[i].area == 'tie') {
      		this.tieWin = true;
      	}
      }

      for (var i = 0; i < this.bet_areas.length; i++) {
        for (var x = 0; x < winningArea.length; x++) {
          if (this.bet_areas[i].table_name == winningArea[x]) {
            if (this.bet_areas[i].graphics) {
              this.bet_areas[i].win_state(this.bet_areas[i], i);
            } else {
              this.bet_areas[i].gotoAndStop(1);
            }
            createjs.Tween.get(type == 'b' ? this.bet_areas[i].board_img : this.bet_areas[i], {loop: true})
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
        } //end of bet area loop

        if (this.bet_areas[i].chips.length) {
        	this.bet_areas[i].chips.forEach((e) => {
        		if (!e.is_win) {
        			if (this.tieWin && this.bet_areas[i].table_name == 'ante') {
            		return;
            	}
            	
              lose_chips_to_animate.push(e);
            }
          });
        }
      } //end of forloop winning length

      setTimeout(() => {
        this.loseTableChipsAnimation(lose_chips_to_animate);
      }, 2000);

      setTimeout(() => {
        this.setWinChips(winning);
      }, 2000);
    }, // end of tableWinning
    loseTableChipsAnimation(chips) {
      let posX = this.context.stage.baseWidth / 2;
      let posY = (this.context.stage.baseHeight / 2) - 50;

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
            x: this.context.component_playerInfo.x + 50,
            y: this.context.component_playerInfo.y + 50
          }, 1200, createjs.Ease.quadOut)
      }
    }, // end of winTableChipsAnimation
    setWinChips(winning) {
      let win_chips_to_animate = [];
      let winningChips = [];
      let winningArea = [];

      for (var i = 0; i < winning.length; i++) {
      	winningArea.push(winning[i].area);
      }

      for (var i = 0; i < this.bet_areas.length; i++) {
        for (var x = 0; x < winningArea.length; x++) {
          if (this.bet_areas[i].table_name == winningArea[x]) {

            if (this.bet_areas[i].chips.length) {
              this.createWinningChips(this.bet_areas[i]);
            }

            this.bet_areas[i].chips.forEach((e) => {
              win_chips_to_animate.push(e);
            });
          }
        } //end of  bet area loop

        if (this.tieWin) {
          this.bet_areas[i].chips.forEach((e) => {
          	if (this.bet_areas[i].table_name == 'ante') {
          		win_chips_to_animate.push(e);
          	}
          });
        }
      } //end of forloop winning length

      if (win_chips_to_animate) {
        setTimeout(() => {
          this.winTableChipsAnimation(win_chips_to_animate);
        }, 4300);
      }
    },
    createWinningChips(betArea) {
    	let winnings = 0;

    	if (betArea.table_name == 'ante') {
    		if (this.anteHand == 'Three of a Kind' || this.anteHand == 'High Card' || this.anteHand == 'Pair' || this.anteHand == 'Two Pair') {
    			return;
    		}

    		winnings = parseInt(betArea.total_bet_amt);
    	}
    	else if (betArea.table_name == 'bonus') {
    		winnings = parseInt(betArea.total_bet_amt) * this.bonusMultiplier;
    	}
        else if (betArea.table_name == 'bonusplus' && type == 'b') {
            winnings = +betArea.total_bet_amt * this.bonusplusMultiplier;
            winnings = +(winnings.toFixed(winnings % 1 != 0 ? 1 : 0));//case for x1.5 payout
        }

      let chips = [];
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
        instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 28);//22
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

        instanceTxt = new createjs.Text(instanceAmt, 'normal 23px bebas-regular', '#000');
        instanceTxt.textBaseline = 'middle';
        instanceTxt.textAlign = 'center';
        instanceTxt.x = instance.x;
        instanceTxt.y = instance.y;
        chipDataCon.addChild(instanceTxt);

        instanceTxt.scaleY = 0.6;
        instanceMask.scaleY = 0.6;

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
