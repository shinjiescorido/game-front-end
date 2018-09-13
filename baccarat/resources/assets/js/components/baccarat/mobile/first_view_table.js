import {getSlaveParam} from '../../../factories/factories';

let instance = null;

export default () => {

  instance = instance || new blu.Component({
    bet_areas: [],
    main() {
      this.rangeDetails = window.rangeDetails;

      //Main area range
      let mainAreaMin = (this.rangeDetails.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
        let mainAreaMax = (this.rangeDetails.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;

      //Side ranges
      let sideBet = [];
      for (var i = 0; i < this.rangeDetails.side_bet.length; i++) {
        sideBet = this.rangeDetails.side_bet[i];

        switch (sideBet.division) {
              case ('Player Pair - Banker Pair'):
                let pairMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
                let pairMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
                break;

              case ('Tie'):
                let tieMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
                let tieMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
                break;

              case ('Super 6'):
                let superMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
                let superMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
                break;
            }
      }

      this.default_color = "rgba(255,255,255,0.01)";

      let player_default_color = "rgba(21, 101, 192, 1)"; //"#1565c0"
      let pdef2 = "rgba(21, 101, 192, 0.01)"; //"#1565c0"
      let banker_default_color = "rgba(209, 47, 47, 1)"; //#d12f2f
      let bdef2 = "rgba(209, 47, 47, 0.01)"; //#d12f2f
      let supersix_color = "rgba(209, 47, 47, 0.01)"; //#d12f2f
      let dragonbonus_color = "rgba(153, 101, 21, 1)"; //#996515
      let dgbdef2 = "rgba(153, 101, 21, 0.01)"; //#996515

      let adjustX = 50;
      let adjustY = 25;
      let table_outline = null;

      this.bet_areas[0] = new createjs.Shape();
      this.bet_areas[0].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(128,0).lineTo(95,68).curveTo(55, 60, 5, 124).lineTo(-93,124).lineTo(0,0);
      this.bet_areas[0].x = 350 - adjustX;
      this.bet_areas[0].y = 382 + adjustY;
      this.bet_areas[0].setBounds(0,0,0,150);
      this.bet_areas[0].table_name = "playerpair";
      this.bet_areas[0].min_bet = pairMin;
      this.bet_areas[0].max_bet = pairMax;
      this.bet_areas[0].payout_multiplier = 11;

      this.bet_areas[0].dropped_state = (e,x) => {
        this.bet_areas[0].graphics.beginFill("#1565c0").moveTo(0,0).lineTo(128,0).lineTo(95,68).curveTo(55, 60, 5, 124).lineTo(-93,124).lineTo(0,0);
      }

      this.bet_areas[0].normal_state = (e,x) => {
        e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(128,0).lineTo(95,68).curveTo(55, 60, 5, 124).lineTo(-93,124).lineTo(0,0);
      }

      this.bet_areas[1] = new createjs.Shape();
      this.bet_areas[1].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(140,0).lineTo(120,124).lineTo(3,124).curveTo(40, 75, -32, 68).lineTo(0,0);
      this.bet_areas[1].x = 477 - adjustX;
      this.bet_areas[1].y = 382 + adjustY;
      this.bet_areas[1].table_name = "player";
      this.bet_areas[1].setBounds(0,0,120,150);
      this.bet_areas[1].min_bet = mainAreaMin;
      this.bet_areas[1].max_bet = mainAreaMax;
      this.bet_areas[1].payout_multiplier = 1;

      this.bet_areas[1].dropped_state = (e,x) => {
        e.graphics.clear().beginFill("#1565c0").moveTo(0,0).lineTo(140,0).lineTo(120,124).lineTo(3,124).curveTo(40, 75, -32, 68).lineTo(0,0);
      }

      this.bet_areas[1].normal_state = (e,x) => {
        e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(140,0).lineTo(120,124).lineTo(3,124).curveTo(40, 75, -32, 68).lineTo(0,0);
      }

      this.bet_areas[2] = new createjs.Shape();
      this.bet_areas[2].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(144,0).lineTo(163,124).lineTo(-21,124).lineTo(0,0);
      this.bet_areas[2].x = 617 - adjustX;
      this.bet_areas[2].y = 382 + adjustY;
      this.bet_areas[2].setBounds(0,0,140,150);
      this.bet_areas[2].table_name = "tie";
      this.bet_areas[2].min_bet = tieMin;
      this.bet_areas[2].max_bet = tieMax;
      this.bet_areas[2].payout_multiplier = 8;


      this.bet_areas[2].dropped_state = (e,x) => {
        e.graphics.clear().beginFill("#689f38").moveTo(0,0).lineTo(144,0).lineTo(163,124).lineTo(-21,124).lineTo(0,0);
      }

      this.bet_areas[2].normal_state = (e,x) => {
        e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(144,0).lineTo(163,124).lineTo(-21,124).lineTo(0,0);
      }

      this.bet_areas[3] = new createjs.Shape();

      this.bet_areas[3].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(141,0).lineTo(175,75).curveTo(146, 50, 132, 124).lineTo(20,124).lineTo(0,0);
      this.bet_areas[3].x = 760 - adjustX;
      this.bet_areas[3].y = 382 + adjustY;
      this.bet_areas[3].setBounds(0,0,100,150);
      this.bet_areas[3].table_name = "banker";
      this.bet_areas[3].min_bet = mainAreaMin;
      this.bet_areas[3].max_bet = mainAreaMax;
      //this.bet_areas[3].max_bet = mainAreaMax;
      this.bet_areas[3].payout_multiplier = 0.95;

      this.bet_areas[3].dropped_state = (e,x) => {
          e.graphics.clear().beginFill("#d12f2f").moveTo(0,0).lineTo(141,0).lineTo(175,75).curveTo(146, 50, 132, 124).lineTo(20,124).lineTo(0,0);
      }

      this.bet_areas[3].normal_state = (e,x) => {
          e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(141,0).lineTo(175,75).curveTo(146, 50, 132, 124).lineTo(20,124).lineTo(0,0);
      }

      this.bet_areas[4] = new createjs.Shape();
      this.bet_areas[4].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(128,0).lineTo(220,124).lineTo(123,124).curveTo(110,80,33,70).lineTo(0,0);
      this.bet_areas[4].x = 900 - adjustX;
      this.bet_areas[4].y = 382 + adjustY;
      this.bet_areas[4].setBounds(0,0,270,150);
      this.bet_areas[4].table_name = "bankerpair";
      this.bet_areas[4].min_bet = pairMin;
      this.bet_areas[4].max_bet = pairMax;
      this.bet_areas[4].payout_multiplier = 11;

      this.bet_areas[4].dropped_state = (e,x) => {
          e.graphics.clear().beginFill("#d12f2f").moveTo(0,0).lineTo(128,0).lineTo(220,124).lineTo(123,124).curveTo(110,80,33,70).lineTo(0,0);
      }

      this.bet_areas[4].normal_state = (e,x) => {
          e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(128,0).lineTo(220,124).lineTo(123,124).curveTo(110,80,33,70).lineTo(0,0);
      }

      /* -------------------------------------------- dragonbonus drawing -------------------------------- */

      this.bet_areas[6] = new createjs.Shape();
      this.bet_areas[6].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(120,0).lineTo(26,124).lineTo(-100,124).lineTo(0,0);
      this.bet_areas[6].x = 230 - adjustX;
      this.bet_areas[6].y = 382 + adjustY;
      this.bet_areas[6].setBounds(0,0,50,150);
      this.bet_areas[6].table_name = "big";
      this.bet_areas[6].min_bet = superMin;
      this.bet_areas[6].max_bet = superMax;
      this.bet_areas[6].payout_multiplier = .54;

      this.bet_areas[7] = new createjs.Shape();
      this.bet_areas[7].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(117,0).lineTo(215,124).lineTo(93,124).lineTo(0,0);
      this.bet_areas[7].x = 1028 - adjustX;
      this.bet_areas[7].y = 382 + adjustY;
      this.bet_areas[7].setBounds(0,0,130,270);
      this.bet_areas[7].table_name = "small";
      this.bet_areas[7].min_bet = superMin;
      this.bet_areas[7].max_bet = superMax;
      this.bet_areas[7].payout_multiplier = 1.5;

      this.bet_areas[8] = new createjs.Shape();
      this.bet_areas[8].graphics.beginFill(this.default_color).drawEllipse(0, 0, 87, 87);
      this.bet_areas[8].x = 410 - adjustX;
      this.bet_areas[8].y = 447 + adjustY;
      this.bet_areas[8].skewX = 45;
      this.bet_areas[8].skewY = 15;
      this.bet_areas[8].setBounds(0,0,170,160);
      this.bet_areas[8].table_name = "bonus_player";
      this.bet_areas[8].min_bet = superMin;
      this.bet_areas[8].max_bet = superMax;
      this.bet_areas[8].payout_multiplier = 1.5;

      this.bet_areas[9] = new createjs.Shape();
      this.bet_areas[9].graphics.beginFill(this.default_color).drawEllipse(0, 0, 87, 87);
      this.bet_areas[9].x = 883 - adjustX;
      this.bet_areas[9].y = 470 + adjustY;
      this.bet_areas[9].skewX = -45;
      this.bet_areas[9].skewY = -15;
      this.bet_areas[9].setBounds(0,0,170,160);
      this.bet_areas[9].table_name = "bonus_banker";
      this.bet_areas[9].min_bet = superMin;
      this.bet_areas[9].max_bet = superMax;
      this.bet_areas[9].payout_multiplier = 1.5;

      this.bet_areas[6].visible = isDragonBonus();
      this.bet_areas[7].visible = isDragonBonus();
      this.bet_areas[8].visible = isDragonBonus();
      this.bet_areas[9].visible = isDragonBonus();
    
      /* -------------------------------------------- dragonbonus drawing -------------------------------- */


      if(window.tableNum == 1) {
        adjustX = 58;
      }
      else if(window.tableNum == 3) {
        adjustX = 53;
      }
      else if(window.tableNum == 2 || window.tableNum == 5 || window.tableNum == 6 || window.tableNum == 8) {
        adjustX = 55;
      }
      else if(window.tableNum == 9) {
        adjustY = 8;
      }
      else if(window.tableNum == 10) {
        adjustX = 51.5;
      }

      if(this.context.getResources(window.language.locale == "zh" ? "the_betboard_dragonbonus_zh" : "the_betboard_dragonbonus")) {
        table_outline = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "the_betboard_dragonbonus_zh" : "the_betboard_dragonbonus"));
        table_outline.regX =  table_outline.getBounds().width/2;
        table_outline.regY =  table_outline.getBounds().height/2;
        table_outline.x = this.context.stage.baseWidth/2 + 52 - adjustX;
        table_outline.y = this.context.stage.baseHeight/2 + 100 + adjustY;
        table_outline.alpha = 1
        table_outline.scaleY = 0.76
        table_outline.scaleX = 0.76
        this.addChild(table_outline)
      }

      for(var x = 0; x < this.bet_areas.length; x++) {
        this.addChild(this.bet_areas[x]);
        this.setChildIndex(table_outline, x+1)
      }
    }
  });

  let isDragonBonus = () =>{
    return getSlaveParam('bonus');
  }

  return instance;
}
