/**
 * gameButtons.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 **/

/** handles all button events **/

import timer_anim from '../timer-animation';
import {
  createSprite,
  randomNum,
  createCardSprite,
  numberCounter,
  playSound
} from '../../../factories/factories';

let instance = null;
let timerAnim = timer_anim();

export default (link) => {
  instance = instance || new blu.Component({
    chips: [],
    is_confirmed_bet: false,
    previousBet: [],
    repeat: false,
    confirm: false,
    yourBets: [],
    main_bet: true,

    process_confirm : false,
    process_clear : false,

    main() {

      // game button background
      this.bg = new createjs.Shape();
			this.bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(-230,-62,470, 150);
      this.addChild(this.bg);

      /**
      -------------------------------------
      gradient button backrounds
      -------------------------------------
      **/

      let gradient_background_1 = new createjs.Shape();
      gradient_background_1.graphics.ss(1.5).beginLinearGradientStroke(["#4c4b4d", "#adacad"], [0, 1], 0, 5, 0, 30).beginLinearGradientFill(["#434244", "#696a6d"], [0, 1], 0, 0, 0, 62).drawCircle(0, 2, 67);
      gradient_background_1.y = 12;
      this.addChild(gradient_background_1);

      let gradient_background_2 = new createjs.Shape();
      gradient_background_2.graphics.ss(1.5).beginLinearGradientStroke(["#4c4b4d", "#adacad"], [0, 1], 0, 5, 0, 30).beginLinearGradientFill(["#434244", "#696a6d"], [0, 1], 0, 0, 0, 62).drawCircle(0, 2, 67);
      gradient_background_2.x = -140;
      gradient_background_2.y = 12;
      this.addChild(gradient_background_2);

      let gradient_background_3 = new createjs.Shape();
      gradient_background_3.graphics.ss(1.5).beginLinearGradientStroke(["#4c4b4d", "#adacad"], [0, 1], 0, 5, 0, 30).beginLinearGradientFill(["#434244", "#696a6d"], [0, 1], 0, 0, 0, 62).drawCircle(0, 2, 67);
      gradient_background_3.x = 140;
      gradient_background_3.y = 12;
      this.addChild(gradient_background_3);

      //adding timer between gradient and button
      this.addChild(timerAnim)

      /**
      ----------------------
      confirm button instance and confirm event test/sample
      ----------------------
      **/

      // this.confirmButton = this.makeButtonSprite("confirm_button",136,134);
      this.confirmButton = this.makeConfirmButton();

      this.addChild(this.confirmButton);

      this.x = this.context.stage.baseWidth - 230;
      this.y = this.context.stage.baseHeight - 88;

      // let yourBets = [];

      this.confirmButton.on("click", () => {

        if(this.process_clear) return;
        if(this.process_confirm) return;

        if(this.is_confirmed_bet) return;

        this.context.component_betBoard.bet_areas.forEach((e) => {
          this.context.component_betBoard.bet_cnt += e.chips.length;
        });

        if(!this.context.component_betBoard.bet_cnt) {
          return;
        }


        if (!this.context.component_timer.betting_start) {
          return;
        }

        if (this.context.component_betDetails.bet_amount > 0) {
          // this.context.context.user_money += this.context.component_betDetails.bet_amount;
        }

        playSound("click");

        let all_bet_amt = 0;
        this.yourBets = [];
        for (var x = 0; x < this.context.component_betBoard.bet_areas.length; x++) {
          if (this.context.component_betBoard.bet_areas[x].chips.length && !this.context.component_betBoard.bet_areas[x].is_advanced_bet) {
            this.yourBets.push({
              "amount": this.context.component_betBoard.bet_areas[x].total_bet_amt,
              "table_id": this.context.component_betBoard.bet_areas[x].table_name,
              "dividend": this.context.component_betBoard.bet_areas[x].payout_multiplier
            });

            if (parseInt(this.context.component_betBoard.bet_areas[x].total_bet_amt) < this.context.component_betBoard.bet_areas[x].min_betAmt) {
              this.context.log({action : "fail" , comment : "Minimum bet required" , user_money : parseInt(this.context.context.user_money) });
              this.context.component_messages.setMessage(window.language.prompts.promptminbet, 1);

              this.context.component_chips.removeBetAreaChips(this.context.component_betBoard.bet_areas[x], x);

              if(this.context.component_betBoard.bet_areas[x].table_name == "ante") {
                this.context.component_chips.removeBetAreaChips(this.context.component_betBoard.bet_areas[1],1);
                if(window.bet_type == "b") {
                  this.context.component_chips.removeBetAreaChips(this.context.component_betBoard.bet_areas[2],2);
                }
                this.yourBets = [];
              }

              this.yourBets = _.filter(this.yourBets, (e) => { //do not insert less than min betss
                if (e.table_id != this.context.component_betBoard.bet_areas[x].table_name) {
                  return e;
                }
              });
            }

          }

          for (var i = 0; i < this.context.component_betBoard.bet_areas[x].chips.length; i++) {
            this.context.component_betBoard.bet_areas[x].chips[i].confirmed_bet = true;
          }
        }
        this.is_confirmed_bet = true;

        for (var x = 0; x < this.yourBets.length; x++) {
          all_bet_amt += parseInt(this.yourBets[x].amount);
        }
        /** for bet-details **/
        // this.context.component_betDetails.bet_amount = all_bet_amt;
        // this.context.context.user_money -= this.context.component_betDetails.bet_amount;
        // this.context.component_betDetails.reinit(true);
        this.context.component_chips.total_ingame_bet = 0;
        this.context.component_chips.ante_check_amt = 0;
        /**end of for bet-details **/
        this.previousBet = this.yourBets;

        // this.showHideButton();
        // this.checkClearButton();
        // this.checkRepeatButton();
        // this.checkConfirmButton();

        this.context.actionCallback("confirm", this.yourBets);

        if(!this.yourBets.length) {
          this.process_confirm = false;
        }

        this.confirmButton.gotoAndStop("click");

        this.checkButtonState();
      });

      /**
      ----------------------
      clear button instance and clear event sample
      ----------------------
      **/

      // this.clearButton = this.makeButtonSprite("clear_button",114,114);
      this.clearButton = this.makeClearButton();

      this.addChild(this.clearButton);

      this.clearButton.on("click", () => {

        if(this.process_confirm) return;

        if (!this.main_bet) return;

        if (!this.context.component_timer.betting_start) {
          return;
        }

        playSound("click");

        this.context.actionCallback("clear", this.context.component_betDetails.bet_amount);

        /** for bet-details **/
        // if (this.is_confirmed_bet) {
          // this.context.context.user_money += this.context.component_betDetails.bet_amount;
        // }

        this.context.component_betDetails.bet_amount = 0;
        // this.context.component_betDetails.reinit(true);
        /**end of for bet-details **/
        
        this.previousBet.forEach((e)=>{
          e.is_confirmed = false;
        })

        this.is_confirmed_bet = false;
        this.repeat = false;

        this.yourBets = [];
        // this.context.component_chips.actions = [];

        //clears chips from table
        this.context.component_betBoard.clearTableChipBets();

        // this.checkClearButton();
        // this.checkRepeatButton();

        this.context.component_chips.total_ingame_bet = 0;

        // $.post(link.cancel, {
        //   round_id: this.context.component_dealer.round_id
        // }, (response) => {
        //   console.log(":::::: delete ", response);
        // });

        this.clearButton.gotoAndStop("click");

        this.context.component_betBoard.bet_cnt = 0;

        this.checkButtonState();

      });

      /**
      ----------------------
      undo button instance and clear event sample
      ----------------------
      **/
      // this.undoButton = this.makeButtonSprite("undo_button",114,114);
      this.undoButton = new createjs.Container();

      let u_button = new createjs.Shape();
      u_button.graphics.beginStroke("rgba(255,255,255,0.5)").drawCircle(57, 53, 48);

      let undo_img = new createjs.Shape();
      undo_img.graphics.ss(6).beginStroke("#8a898b").setStrokeDash([50, 23], 0).drawRoundRectComplex(45, 32, 30, 23, 0, 6, 6, 0);

      let undo_img1 = new createjs.Shape();
      undo_img1.graphics.beginFill("#8a898b").moveTo(0, 0).lineTo(12, -10).arcTo(14, -10, 16, -6, 2).lineTo(16, 8).arcTo(16, 10, 12, 8, 2).lineTo(0, 0);
      undo_img1.x = 35;
      undo_img1.y = 33;


      let undo_button_text = new createjs.Text(window.language.game_buttons.undocaps, window.language.locale == "zh" ? "bold 25px lato, helvetica" : "bold 16px lato, helvetica", "#8a898b");
			undo_button_text.textAlign = "center";
			undo_button_text.x = 57;
			undo_button_text.y = 59;

      this.undoButton.addChild(u_button, undo_img, undo_img1, undo_button_text);

      this.undoButton.button_bg = u_button;
      this.undoButton.undo_img = undo_img;
      this.undoButton.undo_img1 = undo_img1;
      this.undoButton.undo_button_text = undo_button_text;

      this.undoButton.gotoAndStop = function(state) {
        switch (state) {
          case "disabled":
            this.button_bg.graphics.clear().beginStroke("rgba(255,255,255,0.5)").drawCircle(57, 53, 48);
            this.undo_img.graphics.clear().ss(6).beginStroke("#8a898b").setStrokeDash([50, 23], 0).drawRoundRectComplex(45, 32, 30, 23, 0, 6, 6, 0);
            this.undo_img1.graphics.clear().beginFill("#8a898b").moveTo(0, 0).lineTo(12, -10).arcTo(14, -10, 16, -6, 2).lineTo(16, 8).arcTo(16, 10, 12, 8, 2).lineTo(0, 0);
            this.undo_button_text.color = "#8a898b"
            break;

          case "up":
            this.button_bg.graphics.clear().beginLinearGradientFill(["#1998c2", "#2ab7f9", "#1998c2"], [0, 0.5, 1], 30, 0, 80, 0, 140, 0).drawCircle(57, 53, 48);
            this.button_bg.shadow = new createjs.Shadow("rgba(0,0,0,0.5)", 0, 2, 5)
            this.undo_img.graphics.clear().ss(6).beginStroke("#9ee0ef").setStrokeDash([50, 23], 0).drawRoundRectComplex(45, 32, 30, 23, 0, 6, 6, 0);
            this.undo_img1.graphics.clear().beginFill("#9ee0ef").moveTo(0, 0).lineTo(12, -10).arcTo(14, -10, 16, -6, 2).lineTo(16, 8).arcTo(16, 10, 12, 8, 2).lineTo(0, 0);
            this.undo_button_text.color = "#9ee0ef"
            break;

          case "click":
            this.button_bg.graphics.clear().beginFill("#2b79af").drawCircle(57, 53, 48);
            this.undo_img.graphics.clear().ss(6).beginStroke("#1b3244").setStrokeDash([50, 23], 0).drawRoundRectComplex(45, 32, 30, 23, 0, 6, 6, 0);
            this.undo_img1.graphics.clear().beginFill("#1b3244").moveTo(0, 0).lineTo(12, -10).arcTo(14, -10, 16, -6, 2).lineTo(16, 8).arcTo(16, 10, 12, 8, 2).lineTo(0, 0);
            this.undo_button_text.color = "#1b3244"
            break;

          case "after_click":
            this.button_bg.graphics.clear().beginLinearGradientFill(["#1381a5", "#0094da", "#1381a5"], [0, 0.5, 1], 30, 0, 80, 0, 140, 0).drawCircle(57, 53, 48);
            this.undo_img.graphics.clear().ss(6).beginStroke("#8dc6d7").setStrokeDash([50, 23], 0).drawRoundRectComplex(45, 32, 30, 23, 0, 6, 6, 0);
            this.undo_img1.graphics.clear().beginFill("#8dc6d7").moveTo(0, 0).lineTo(12, -10).arcTo(14, -10, 16, -6, 2).lineTo(16, 8).arcTo(16, 10, 12, 8, 2).lineTo(0, 0);
            this.undo_button_text.color = "#1b3244"
            break;
        }
      }

      this.undoButton.scaleX = this.undoButton.scaleY = 0.92;
      this.undoButton.x = -193;
      this.undoButton.y = -36;
      this.undoButton.visible = false;
      this.addChild(this.undoButton);

      this.undoButton.on("click", () => {

        // if (!this.checkConfirmButton()) return;

        if (this.context.component_chips.actions.length == 1) {
          // this.showHideButton();
        }

        if (this.context.component_chips.actions.length - 1 < 0) {
          return;
        }
        if (this.context.component_chips.actions[this.context.component_chips.actions.length-1].is_response)  {
          return;
        }

        if(this.context.roundphase !== 'startround')  return;
        this.repeat = false;
        
        playSound("click");
        
        let amt = this.context.component_chips.actions[this.context.component_chips.actions.length - 1].drop_area.total_bet_amt - this.context.component_chips.actions[this.context.component_chips.actions.length - 1].chip_amount_used;
        this.context.actionCallback("undo", this.context.component_chips.actions[this.context.component_chips.actions.length - 1]);

        if (this.context.component_chips.actions[this.context.component_chips.actions.length-1].chip_amount_used == 'max') {
          this.context.component_chips.total_ingame_bet -= this.context.component_chips.actions[this.context.component_chips.actions.length-1].drop_area.total_bet_amt;
          let temp = _.filter(this.context.component_chips.actions, (e) => {
            if(e.drop_area.table_name == this.context.component_chips.actions[this.context.component_chips.actions.length-1].drop_area.table_name && e.chip_amount_used != "max") 
              return e
          });

          let amt1 = this.context.component_chips.actions[this.context.component_chips.actions.length-1].drop_area.max_betAmt;

          let amt2 = temp.length ? _.sumBy(temp, 'chip_amount_used') : 0

          amt = amt1 + amt2 - amt1;
        }
        else {
          this.context.component_chips.total_ingame_bet -= this.context.component_chips.actions[this.context.component_chips.actions.length-1].chip_amount_used;  
        }


        this.context.component_chips.changeCurrentChips(amt, this.context.component_chips.actions[this.context.component_chips.actions.length - 1].drop_area);
        this.context.component_chips.actions.splice(this.context.component_chips.actions.length - 1, 1);

        this.undoButton.gotoAndStop("click");
        this.checkButtonState();
      });

      /**
      ----------------------
      repeat button instance and repeat event sample
      ----------------------
      **/

      // this.repeatButton = this.makeButtonSprite("repeat_button",114,114);
      this.repeatButton =  this.makeRepeatButton();
      this.addChild(this.repeatButton);

      this.repeatButton.addEventListener("click", () => {

        if (this.repeat) return;
        var totalAmt = _.sumBy(['amount'], (prop) => {
            return _.sumBy(this.yourBets, parseInt(prop));
        });

        if(totalAmt > parseInt(this.context.context.user_money)) {
          this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
          return;
        }

        let totalRepeatAmt = 0;
        for (var i = 0; i < this.previousBet.length; i++) {
          if(this.previousBet[i].table_id == "ante") {
            totalRepeatAmt = (this.previousBet[i].amount * 3);
          } else {
            totalRepeatAmt += this.previousBet[i].amount;
          }
        }

        if(totalRepeatAmt > parseInt(this.context.context.user_money)) {
          this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
          return;
        }

        if (!this.context.component_timer.betting_start) {
          return;
        } // end if

        if (this.is_confirmed_bet) {
          return;
        } // end if

        if (!this.main_bet) return;

        // this.checkClearButton();

        playSound("click");

        // this.process_confirm = false;
        // this.process_clear = false;

        this.context.actionCallback("repeat", this.previousBet);

        this.repeatBet();
        this.repeatButton.gotoAndStop('disabled');
        this.repeat = true;

        this.repeatButton.gotoAndStop("click");
        this.checkButtonState();
      });
    },

    changeTheme(new_theme) {
			this.bg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(-230,-62,470, 150);
		},

    makeConfirmButton () {
			let confirmButton = new createjs.Container();

			let c_button = new createjs.Shape();
			c_button.graphics.ss(1).beginStroke("rgba(255,255,255,0.5)").drawCircle(69,64,58);

			let check_1 = new createjs.Shape();
			check_1.graphics.beginFill("#a1a1a2").drawRoundRect(-10,90,70,13,4);
			check_1.rotation = -40;

			let check_2 = new createjs.Shape();
			check_2.graphics.beginFill("#a1a1a2").drawRoundRect(-12,60,13,40,4);
			check_2.rotation = -40;
			check_2.scaleX = check_1.scaleX = 0.88;
			check_2.scaleY = check_1.scaleY = 0.88;
			check_1.x = check_2.x = 6;
			check_1.y = check_2.y = 0;

			let c_button_text = new createjs.Text(window.language.game_buttons.confirmcaps, window.language.locale == "zh" ? "bold 25px lato , helvetica" : "bold 16px lato , helvetica", "#8a898b");
			c_button_text.textAlign = "center";
			c_button_text.x = 70;
			c_button_text.y = 77;

			if(window.language.locale == "jp") {
				c_button_text.y = 79;
				c_button_text.x = 67;
				c_button_text.font = "bold 22px lato , helvetica"
			}
			else if(window.language.locale == "kr")
			{
				c_button_text.y = 79;
				c_button_text.font = "bold 20px lato , helvetica"
			}

			confirmButton.button_bg = c_button;
			confirmButton.check_1 = check_1;
			confirmButton.check_2 = check_2;
			confirmButton.c_text = c_button_text;
			confirmButton.addChild(c_button, check_1,check_2, c_button_text);

			confirmButton.gotoAndStop = function (state)  {
				switch(state) {
					case "disabled" :
						this.button_bg.graphics.clear().beginStroke("rgba(255,255,255,0.5)").drawCircle(69,64,58);
						this.check_1.graphics.clear().f("#a1a1a2").drawRoundRect(-10,90,70,13,4);
						this.check_2.graphics.clear().f("#a1a1a2").drawRoundRect(-12,60,13,40,4);
						this.c_text.color = "#a1a1a2";
						break;

					case "up" :
						this.button_bg.graphics.clear().beginLinearGradientFill(["#279144","#37b14a","#279144"],[0,0.5,1], 0,0,130,0,170,0).drawCircle(69,64,58);
						this.button_bg.shadow = new createjs.Shadow("rgba(0,0,0,0.5)",0,2,5)
						this.check_1.graphics.clear().f("#fff").drawRoundRect(-10,90,70,13,4);
						this.check_2.graphics.clear().f("#fff").drawRoundRect(-12,60,13,40,4);
						this.c_text.color = "#fdfce6";
						break;

					case "click" :
						// console.log(this, "click");
						this.button_bg.graphics.clear().beginFill("#246342").drawCircle(69,64,58);
						this.check_1.graphics.clear().f("#1b3c29").drawRoundRect(-10,90,70,13,4);
						this.check_2.graphics.clear().f("#1b3c29").drawRoundRect(-12,60,13,40,4);
						this.c_text.color = "#1b3c29";
						break;

					case "after_click" :
						this.button_bg.graphics.clear().beginLinearGradientFill(["#266443","#33805c","#266443"],[0,0.5,1], 0,0,130,0,170,0).drawCircle(69,64,58);
						this.check_1.graphics.clear().f("#fff").drawRoundRect(-10,90,70,13,4);
						this.check_2.c_text.clear().f("#fff").drawRoundRect(-12,60,13,40,4);
						break;
				}
			}

			confirmButton.scaleX = confirmButton.scaleY = 0.75;
			confirmButton.x = -52 ;
			confirmButton.y = -35 ;

			return confirmButton;
		},

		makeClearButton () {
			let clearButton = new createjs.Container();

			let clear_button = new createjs.Shape();
			clear_button.graphics.beginStroke("rgba(255,255,255,0.5)").drawCircle(57,55,47);

			let cross_1 = new createjs.Shape();
			cross_1.graphics.beginFill("#8a898b").drawRoundRect(48,-8,52,12,4);
			cross_1.rotation = 42;

			let cross_2 = new createjs.Shape();
			cross_2.graphics.beginFill("#8a898b").drawRoundRect(-16,68,52,12,4);
			cross_2.rotation = -42;

			let clear_button_text = new createjs.Text(window.language.game_buttons.clearcaps, window.language.locale == "zh" ? "bold 25px lato , helvetica" : "bold 16px lato , helvetica", "#8a898b");
			// let c_button_text = new createjs.Text(window.language.game_buttons.confirmcaps,"16px lato-bold", "#fff");
			clear_button_text.textAlign = "center";
			clear_button_text.x = 57;
			clear_button_text.y = 59;

			cross_1.scaleX = cross_1.scaleY = 0.7;
			cross_2.scaleX = cross_2.scaleY = 0.7;
			cross_1.x = cross_2.x = 17;
			cross_1.y = cross_2.y = 7;

			clearButton.button_bg = clear_button;
			clearButton.cross_1 = cross_1;
			clearButton.cross_2 = cross_2;
			clearButton.clear_button_text = clear_button_text;
			clearButton.addChild(clear_button, cross_1, cross_2, clear_button_text);

			clearButton.gotoAndStop = function (state) {
				switch(state) {
					case "disabled" :
						this.button_bg.graphics.clear().beginStroke("rgba(255,255,255,0.5)").drawCircle(57,55,47);
						this.cross_1.graphics.clear().beginFill("#8a898b").drawRoundRect(48,-8,52,12,4);
						this.cross_2.graphics.clear().beginFill("#8a898b").drawRoundRect(-16,68,52,12,4);
						this.clear_button_text.color = "#8a898b";
						break;

					case "up" :
						this.button_bg.graphics.clear().beginLinearGradientFill(["#a22828","#cc282a","#a22828"],[0,0.5,1], 30,0,80,0,140,0).drawCircle(57,55,47);
						this.button_bg.shadow = new createjs.Shadow("rgba(0,0,0,0.5)",0,2,5)
						this.cross_1.graphics.clear().beginFill("#f7a5a8").drawRoundRect(48,-8,52,12,4);
						this.cross_2.graphics.clear().beginFill("#f7a5a8").drawRoundRect(-16,68,52,12,4);
						this.clear_button_text.color = "#f7a5a8";
						break;

					case "click" :
						this.button_bg.graphics.clear().beginFill("#812727").drawCircle(57,55,47);
						this.cross_1.graphics.clear().beginFill("#461b1b").drawRoundRect(48,-8,52,12,4);
						this.cross_2.graphics.clear().beginFill("#461b1b").drawRoundRect(-16,68,52,12,4);
						this.clear_button_text.color = "#8a898b";
						break;

					case "after_click" :
						this.button_bg.graphics.clear().beginLinearGradientFill(["#822727","#922a2a","#822727"],[0,0.5,1], 30,0,80,0,140,0).drawCircle(57,55,47);
						this.cross_1.graphics.clear().beginFill("#c68080").drawRoundRect(48,-8,52,12,4);
						this.cross_2.graphics.clear().beginFill("#c68080").drawRoundRect(-16,68,52,12,4);
						this.clear_button_text.color = "#8a898b";
						break;
				}
			}

			clearButton.scaleX = clearButton.scaleY = 0.92;
			clearButton.x = 88;
			clearButton.y = -36;

			return clearButton;
		},

		makeRepeatButton() {
			let repeatButton = new createjs.Container();

			let repeat_button = new createjs.Shape();
			repeat_button.graphics.beginStroke("rgba(255,255,255,0.5)").drawCircle(57,53,48);

			let repeat_icon = new createjs.Shape();
			repeat_icon.graphics.ss(6).beginStroke("#8a898b").drawRoundRect(38,28,40,26,8);

			let arrow = new createjs.Shape();
			arrow.graphics.beginFill("#8a898b").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
			arrow.x = 30
			arrow.y = 53
			arrow.scaleX = arrow.scaleY = .9

			let arrow_1 = new createjs.Shape();
			arrow_1.graphics.beginFill("#444345").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
			arrow_1.x = 26
			arrow_1.y = 51
			arrow_1.scaleX = arrow_1.scaleY = 1.1

			let arrow2 = new createjs.Shape();
			arrow2.graphics.beginFill("#8a898b").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
			arrow2.x = 86
			arrow2.y = 30
			arrow2.rotation = 180;
			arrow2.scaleX = arrow2.scaleY = .9

			let arrow2_1 = new createjs.Shape();
			arrow2_1.graphics.beginFill("#444345").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
			arrow2_1.x = 89
			arrow2_1.y = 33
			arrow2_1.rotation = 180;
			arrow2_1.scaleX = arrow2_1.scaleY = 1.1

			let repeat_button_text = new createjs.Text(window.language.game_buttons.repeatcaps, window.language.locale == "zh" ? "bold 25px lato , helvetica" : "bold 16px lato , helvetica", "#8a898b");
			repeat_button_text.textAlign = "center";
			repeat_button_text.x = 58;
			repeat_button_text.y = 60;

			let arrow_container = new createjs.Container();
			arrow_container.addChild(repeat_icon, arrow_1, arrow, arrow2_1, arrow2);
			arrow_container.scaleX = arrow_container.scaleY = 0.8;
			arrow_container.x = 11;
			arrow_container.y = 7;

			repeatButton.addChild(repeat_button, arrow_container, repeat_button_text);
			repeatButton.button_bg = repeat_button;
			repeatButton.repeat_icon = repeat_icon;
			repeatButton.arrow = arrow;
			repeatButton.arrow_1 = arrow_1;
			repeatButton.arrow2 = arrow2;
			repeatButton.arrow2_1 = arrow2_1;
			repeatButton.repeat_button_text = repeat_button_text;

			repeatButton.gotoAndStop =  function (state) {
				switch(state) {
					case "disabled" :

						this.button_bg.graphics.clear().beginStroke("rgba(255,255,255,0.5)").drawCircle(57,53,48);
						this.arrow_1.graphics.clear().beginFill("#444345").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
						this.arrow2_1.graphics.clear().beginFill("#444345").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
						this.arrow.graphics.clear().beginFill("#8a898b").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
						this.arrow2.graphics.clear().beginFill("#8a898b").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
						this.repeat_icon.graphics.clear().ss(6).beginStroke("#8a898b").drawRoundRect(38,28,40,26,8);
						this.repeat_button_text.color = "#8a898b"
						break;

					case "up" :
						this.button_bg.graphics.clear().beginLinearGradientFill(["#d28328","#ed9e22","#d28328"],[0,0.5,1], 30,0,80,0,140,0).drawCircle(57,53,48);
						this.button_bg.shadow = new createjs.Shadow("rgba(0,0,0,0.5)",0,2,5)
						this.arrow_1.graphics.clear().beginFill("#d28328").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
						this.arrow2_1.graphics.clear().beginFill("#d28328").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
						this.arrow.graphics.clear().beginFill("#ffd086").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
						this.arrow2.graphics.clear().beginFill("#ffd086").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
						this.repeat_icon.graphics.clear().ss(6).beginStroke("#ffd086").drawRoundRect(38,28,40,26,8);
						this.repeat_button_text.color = "#ffd086"
						break;

					case "click" :
						this.button_bg.graphics.clear().beginFill("#b16b29").drawCircle(57,53,48);
						this.arrow_1.graphics.clear().beginFill("#b16b29").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
						this.arrow2_1.graphics.clear().beginFill("#b16b29").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
						this.arrow.graphics.clear().beginFill("#5d3b15").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
						this.arrow2.graphics.clear().beginFill("#5d3b15").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
						this.repeat_icon.graphics.clear().ss(6).beginStroke("#5d3b15").drawRoundRect(38,28,40,26,8);
						this.repeat_button_text.color = "#8a898b"
						break;

					case "after_click" :
						this.button_bg.graphics.clear().beginLinearGradientFill(["#a26b13","#c08000","#a26b13"],[0,0.5,1], 30,0,80,0,140,0).drawCircle(57,53,48);
						this.arrow_1.graphics.clear().beginFill("#a26b13").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
						this.arrow2_1.graphics.clear().beginFill("#a26b13").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
						this.arrow.graphics.clear().beginFill("#bfa680").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
						this.arrow2.graphics.clear().beginFill("#bfa680").moveTo(0,0).lineTo(12,-10).arcTo(14, -10, 16,-6,2).lineTo(16,8).arcTo(16,10, 12,8, 2).lineTo(0,0);
						this.repeat_icon.graphics.clear().ss(6).beginStroke("#bfa680").drawRoundRect(38,28,40,26,8);
						this.repeat_button_text.color = "#8a898b"
						break;
				}
			}

			repeatButton.scaleX = repeatButton.scaleY = 0.92;
			repeatButton.x = this.undoButton.x;
			repeatButton.y = this.undoButton.y;

			return repeatButton;
		},
		cloneButtons(no_glow) {
			let cloneButtonsCon = new createjs.Container();
			cloneButtonsCon.x = this.context.stage.baseWidth - 230;
			cloneButtonsCon.y = this.context.stage.baseHeight  - 88;

			let gradient_background_1 = new createjs.Shape();
			gradient_background_1.graphics.ss(1.5).beginLinearGradientStroke(["#4c4b4d","#adacad"], [0, 1], 0, 5, 0, 30).beginLinearGradientFill(["#434244","#696a6d"], [0, 1], 0, 0, 0, 62).drawCircle(0,2,67);
			gradient_background_1.y = 12;
			gradient_background_1.cache(-70,-70,140,140)
			cloneButtonsCon.addChild(gradient_background_1);

			let gradient_background_2 = new createjs.Shape();
			gradient_background_2.graphics.ss(1.5).beginLinearGradientStroke(["#4c4b4d","#adacad"], [0, 1], 0, 5, 0, 30).beginLinearGradientFill(["#434244","#696a6d"], [0, 1], 0, 0, 0, 62).drawCircle(0,2,67);
			gradient_background_2.x = -140;
			gradient_background_2.y = 12;
			gradient_background_2.cache(-70,-70,140,140)
			cloneButtonsCon.addChild(gradient_background_2);

			let gradient_background_3 = new createjs.Shape();
			gradient_background_3.graphics.ss(1.5).beginLinearGradientStroke(["#4c4b4d","#adacad"], [0, 1], 0, 5, 0, 30).beginLinearGradientFill(["#434244","#696a6d"], [0, 1], 0, 0, 0, 62).drawCircle(0,2,67);
			gradient_background_3.x = 140;
			gradient_background_3.y = 12;
			gradient_background_3.cache(-70,-70,140,140)
      cloneButtonsCon.addChild(gradient_background_3);

      if(!no_glow)
			{
				gradient_background_1.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);
				gradient_background_2.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);
				gradient_background_3.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);
			}

			let confirmButton = this.makeConfirmButton();
			confirmButton.gotoAndStop("up");
			cloneButtonsCon.addChild(confirmButton);

			let clearButton = this.makeClearButton();
			clearButton.gotoAndStop("up");
			cloneButtonsCon.addChild(clearButton);

			let repeatButton = this.makeRepeatButton();
			repeatButton.gotoAndStop("up");
			cloneButtonsCon.addChild(repeatButton);

			return cloneButtonsCon;
		},
    repeatBet(is_set, anim, is_response) {
      if (this.previousBet && this.previousBet.length) {
        for (var x = 0; x < this.previousBet.length; x++) {
          for (var i = 0; i < this.context.component_betBoard.bet_areas.length; i++) {
            if (this.context.component_betBoard.bet_areas[i].table_name == this.previousBet[x].table_id && !this.context.component_betBoard.bet_areas[i].is_advanced_bet) {
              this.context.component_chips.actions.push({
                drop_area : this.context.component_betBoard.bet_areas[i], 
                chip_amount_used : this.previousBet[x].amount,
                is_response : is_response
              });

              this.context.component_betBoard.bet_areas[i].total_bet_amt = this.previousBet[x].amount;
              this.context.component_chips.changeCurrentChips(this.previousBet[x].amount, this.context.component_betBoard.bet_areas[i], is_set, anim)
              if (!is_response) {
                this.context.component_chips.total_ingame_bet += this.previousBet[x].amount;
              }
            }
          }
        } //end of for loop
      } //end of if

      if(is_response) {
        this.context.component_chips.total_ingame_bet = 0;
      }
    },
    makeButtonSprite(resource, width, height) {

      let data = {
        images: [this.context.getResources(resource)],
        frames: {
          width: width,
          height: height
        },
        animations: {
          "up": [2],
          "click": [3],
          "disabled": [0],
          "after_click": [1]
        }
      }

      let data_spriteSheet = new createjs.SpriteSheet(data);
      return new createjs.Sprite(data_spriteSheet, "disabled");
    },
    checkButtonState() {
      //confirm check
      let unconfirmed_cnt = 0;

      this.context.component_betBoard.bet_areas.forEach(function(betarea) {
        if(_.filter(betarea.chips, function(e) { return !e.confirmed_bet }).length) unconfirmed_cnt ++
      });

      if(unconfirmed_cnt) {
        // setTimeout(()=> {
          this.confirmButton.gotoAndStop("up");
          this.undoButton.gotoAndStop("up");
        // }, 100)
        // this.confirmButton.updateCache();
        // this.undoButton.updateCache();

      } else if(!unconfirmed_cnt) {
        this.confirmButton.gotoAndStop("disabled");
        this.repeatButton.gotoAndStop("disabled");
        this.undoButton.gotoAndStop("disabled");
      }

      //clear check
      let chips_cnt = 0;

      this.context.component_betBoard.bet_areas.forEach(function(betarea) {
        chips_cnt += betarea.chips.length;
      });

      if(chips_cnt) {
        // setTimeout(()=> {
          this.clearButton.gotoAndStop("up");
        // }, 100)

        // this.clearButton.updateCache();

      } else if(!chips_cnt){
        this.clearButton.gotoAndStop("disabled");
        // this.clearButton.updateCache();

        this.undoButton.gotoAndStop("disabled");
        this.confirmButton.gotoAndStop("disabled");
        // this.confirmButton.updateCache();
      }

      // == undo button check
      if(unconfirmed_cnt && !this.repeat) {
        this.undoButton.visible = true;
        // setTimeout(()=> {
          this.undoButton.gotoAndStop("up");
        // }, 100)

        // this.undoButton.updateCache();
      } else if(!unconfirmed_cnt && this.repeat) {
        this.undoButton.gotoAndStop("disabled");
        // this.undoButton.updateCache();
      }

      if(!chips_cnt && this.previousBet.length) {
        this.undoButton.visible = false;
        this.repeatButton.visible = true
        // setTimeout(()=> {
          this.repeatButton.gotoAndStop("up")
        // }, 100)
        // this.repeatButton.updateCache();
      } else if(this.repeat && !unconfirmed_cnt){
        this.repeatButton.gotoAndStop("disabled")
        // this.repeatButton.updateCache();
      } else if(this.repeat && unconfirmed_cnt){
        this.repeatButton.gotoAndStop("disabled")
        // this.repeatButton.updateCache();
      }

      let temp = [];

      this.context.component_betBoard.bet_areas.forEach((cur) =>{

        if(parseInt(cur.total_bet_amt) > 0) {
          temp.push({
            table_id : cur.table_name,
            amount : cur.total_bet_amt,
            dividend : cur.payout_multiplier
          })
        }
      });

      if(this.previousBet.length && _.isEqual(this.previousBet, temp)) {
        this.undoButton.visible = false;
        this.repeatButton.visible = true;
        this.repeatButton.gotoAndStop("disabled")
        // this.repeatButton.updateCache()
      }

      //response lalalala
      if(this.process_clear || this.process_confirm) {
        this.confirmButton.gotoAndStop("disabled");
      }

      if(this.process_confirm) {
        this.clearButton.gotoAndStop("disabled");
      }

      if (this.context.component_chips.actions.length && this.context.component_chips.actions[this.context.component_chips.actions.length-1].is_response) {
        this.undoButton.gotoAndStop("disabled");
        this.confirmButton.gotoAndStop("disabled");
      }

      if(this.context.roundphase !== 'startround') {
        this.disableAllButtons();
      }
    },
    disableAllButtons (no_time) {

      this.clearButton.gotoAndStop("disabled");
      // this.clearButton.updateCache();

      this.confirmButton.gotoAndStop("disabled");
      // this.confirmButton.updateCache();

      this.undoButton.gotoAndStop("disabled");
      // this.undoButton.updateCache();
      //
      this.repeatButton.gotoAndStop("disabled");

      if(!no_time) {
        if(this.previousBet.length) {
          this.undoButton.visible = false;
          this.repeatButton.visible = true;
          this.repeatButton.gotoAndStop("up");
        } else {
          this.undoButton.visible = true;
          this.repeatButton.visible = false;
          this.repeatButton.gotoAndStop("disabled");
        }
      }
    }
    // showHideButton() {
    //   if (!this.is_confirmed_bet) {
    //     if (this.previousBet.length) {
    //       this.repeatButton.visible = true;
    //       this.undoButton.visible = false;
    //     } else {
    //       this.repeatButton.visible = false;
    //       this.undoButton.visible = true;
    //     }
    //   } else {
    //     if (this.previousBet.length) {
    //       this.repeatButton.visible = true;
    //       this.undoButton.visible = false;
    //     }
    //   }
    // },
    // checkConfirmButton() {
    //   for (var x = 0; x < this.context.component_betBoard.bet_areas.length; x++) {
    //     if (this.context.component_betBoard.bet_areas[x].chips.length) {
    //       for (var i = 0; i < this.context.component_betBoard.bet_areas[x].chips.length; i++) {
    //         if (!this.context.component_betBoard.bet_areas[x].chips[i].confirmed_bet && !this.context.component_betBoard.bet_areas[x].is_advanced_bet && this.context.component_timer.betting_start) {
    //           this.confirmButton.gotoAndStop("up");
    //           return true;
    //         }

    //         this.confirmButton.gotoAndStop("disabled");
    //       }
    //     }
    //   }
    // },
    // checkClearButton() {
    //   for (var x = 0; x < this.context.component_betBoard.bet_areas.length; x++) {
    //     if (this.context.component_betBoard.bet_areas[x].chips.length && !this.context.component_betBoard.bet_areas[x].is_advanced_bet && this.context.component_timer.betting_start) {
    //       this.clearButton.gotoAndStop("up");
    //       return;
    //     }
    //     this.clearButton.gotoAndStop("disabled")
    //   }
    // },
    // checkUndoButton() {
    //   if (this.context.component_chips.actions.length) {
    //     this.undoButton.gotoAndStop("up")
    //   }
    // },
    // checkRepeatButton() {
    //   if (this.previousBet.length && this.context.component_timer.betting_start) {
    //     this.repeatButton.gotoAndStop("up");
    //   } else {
    //     this.repeatButton.gotoAndStop("disabled");
    //   }

    //   if (this.repeat || this.is_confirmed_bet) {
    //     this.repeatButton.gotoAndStop("disabled");
    //   }
    // }
  });

  return instance;
}
