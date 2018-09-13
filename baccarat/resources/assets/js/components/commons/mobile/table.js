import {createSprite, randomNum, playSound, getSlaveParam} from '../../../factories/factories';

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
    tableWinning(winning, multiplayerFlag) {
      // let lose_chips_to_animate = [];

      // this.isTie = winning.some((e) => {
      //   return e == 'tie';
      // });

      // for (var i = 0; i < this.bet_areas.length; i++) {
      //   for (var x = 0; x < winning.length; x++) {

      //     if (this.bet_areas[i].multiplayer == multiplayerFlag) {
      //       if (this.bet_areas[i].table_name == winning[x]) {
      //         if (this.bet_areas[i].graphics) {
      //           this.bet_areas[i].win_state(this.bet_areas[i], i);
      //         } else {
      //           this.bet_areas[i].gotoAndStop(1);
      //         }
      //         createjs.Tween.get(this.bet_areas[i], {loop: true})
      //           .to({
      //             alpha: .4
      //           }, 500)
      //           .to({
      //             alpha: 1
      //           }, 500)

      //         this.bet_areas[i].chips.forEach((e) => {
      //           e.is_win = true;
      //         });
      //       }
      //     } //end of checking if multiplier
      //   } //end of bet area loop

      //   if (this.bet_areas[i].chips.length) {
      //     this.bet_areas[i].chips.forEach((e) => {
      //       if (!e.is_win) {
      //         if (this.isTie) {
      //           if (this.bet_areas[i].table_name == 'player' || this.bet_areas[i].table_name == 'banker') {
      //             return
      //           }
      //         }

      //         lose_chips_to_animate.push(e);
      //       }
      //     });
      //   }
      // } //end of forloop winning length

      // setTimeout(() => {
      //   this.loseTableChipsAnimation(lose_chips_to_animate);
      // }, 2000);

      // setTimeout(() => {
      //   this.setWinChips(winning, multiplayerFlag);
      // }, 4000);
      

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
      
    }, // end of tableWinning
   
  });

  let isSuperSix = () =>{
    return getSlaveParam('supersix');
  }

  let isDragonBonus = () =>{
    return getSlaveParam('bonus');
  }

return instance;
}
