import {
  createSprite,
  randomNum,
  createCardSprite,
  numberCounter,
  playSound,
  numberWithCommas,
  createSpriteRoadMap,
  fontFormat
} from '../../factories/factories';

let instance = null;

export default (opposite_bet) => {
  instance = instance || new blu.Component({
    bet_areas: [],
    opposites: null,
    user_1 : [],
    user_2 : [],
    user_3 : [],
    user_5 : [],
    user_6 : [],
    user_7 : [],
    user_8 : [],
    user_1_name : null,
    user_2_name : null,
    user_3_name : null,
    user_5_name : null,
    user_7_name : null,
    user_8_name : null,
    main() {
      this.visible = false;
      this.rangeDetails = window.rangeDetails;

      //Main area range
      let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
      if (window.mainMultiplier % 10) mainMultiplier = 1;
      let mainAreaMin = (this.rangeDetails.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
      let mainAreaMax = ((this.rangeDetails.max * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

      //Side ranges
      let sideBet = [];
      for (var i = 0; i < this.rangeDetails.side_bet.length; i++) {
        sideBet = this.rangeDetails.side_bet[i];

        switch (sideBet.division) {
          case ('Tie'):
          let tieMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          let tieMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          break;

          case ('Big&Small'):
          let bigSmallMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          let bigSmallMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          break;

          case ('Odd or Even'):
          let oddEvenMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          let oddEvenMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          break;

          case ('Suited Tie'):
          let suitedTieMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          let suitedTieMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          break;

          case ('Suit'):
          let suitMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          let suitMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          break;
        }
      }

      let default_color = "rgba(255,255,255,0.01)";
      this.toSet = ["user_1", "user_2","user_3","user_6","user_7","user_8"]
      if(this.context.junketAgent) {
        this.toSet = ["user_1", "user_2","user_3","user_5","user_6","user_7","user_8"]
        this.sideBetArr = ["dragon_even","dragon_odd","dragon_big","dragon_small","tiger_even","tiger_odd","tiger_big","tiger_small"];
      }

      this.dragon_color = this.context.component_tableDraw.dragon_color;
      this.tiger_color = this.context.component_tableDraw.tiger_color;
      this.tie_color = this.context.component_tableDraw.tie_color;
      this.suitedtie_color = this.context.component_tableDraw.suitedtie_color;
      this.dragon_element_color = this.context.component_tableDraw.dragon_element_color;
      this.tiger_element_color = this.context.component_tableDraw.tiger_element_color;

      this.classic_outline = this.context.component_tableOutline.multiClassic();
      this.classic_outline.singleplayer = false;
      this.classic_outline.multiplayer = true;

      let y_pos = 631;

      // dragon_even
			this.bet_areas[0] = new createjs.Shape();
			this.bet_areas[0].width = 110;
      this.bet_areas[0].height = 30;
			this.bet_areas[0].x = 306;
			this.bet_areas[0].y = y_pos;
			this.bet_areas[0].color = this.dragon_element_color;
			this.bet_areas[0].gradientOptions = [[0.2,1], 10,-60,this.bet_areas[0].width,0];
			this.bet_areas[0].fillCmd = this.bet_areas[0].graphics.beginLinearGradientFill(this.dragon_element_color.default, ...this.bet_areas[0].gradientOptions).command;

			this.bet_areas[0].graphics.moveTo(0, 0).lineTo(this.bet_areas[0].width, 0)
			.lineTo(this.bet_areas[0].width-13, this.bet_areas[0].height)
			.lineTo(-20, this.bet_areas[0].height)
			.lineTo(0, 0);
			this.bet_areas[0].setBounds(0,0,this.bet_areas[0].width, this.bet_areas[0].height);
			this.bet_areas[0].table_name = "dragon_even";
			this.bet_areas[0].min_bet = oddEvenMin;
			this.bet_areas[0].max_bet = oddEvenMax;
			this.bet_areas[0].chips = [];

      // dragon_odd
			this.bet_areas[1] = new createjs.Shape();
			this.bet_areas[1].width = 140;
      this.bet_areas[1].height = 30;
			this.bet_areas[1].x = this.bet_areas[0].x + this.bet_areas[0].width; //272
			this.bet_areas[1].y = y_pos;
			this.bet_areas[1].color = this.dragon_color;
			this.bet_areas[1].gradientOptions = [[0.2,1], 0, 0,this.bet_areas[1].width,0];
			this.bet_areas[1].fillCmd = this.bet_areas[1].graphics.beginLinearGradientFill(this.dragon_color.default, ...this.bet_areas[1].gradientOptions).command;

			this.bet_areas[1].graphics.moveTo(0, 0).lineTo(this.bet_areas[1].width, 0)
			.lineTo(this.bet_areas[1].width-10, this.bet_areas[1].height)
			.lineTo(-15, this.bet_areas[1].height)
			.lineTo(0, 0);
			this.bet_areas[1].setBounds(this.bet_areas[1].x,this.bet_areas[1].y,this.bet_areas[1].width, this.bet_areas[1].height);
			this.bet_areas[1].table_name = "dragon_odd";
			this.bet_areas[1].min_bet = oddEvenMin;
			this.bet_areas[1].max_bet = oddEvenMax;
			this.bet_areas[1].chips = [];

      // dragon_big
      this.bet_areas[2] = new createjs.Shape();
      this.bet_areas[2].width = 140;
      this.bet_areas[2].height = 30;
      this.bet_areas[2].x = this.bet_areas[1].x + this.bet_areas[1].width; //248;
      this.bet_areas[2].y = y_pos;
      this.bet_areas[2].color = this.dragon_color;
      this.bet_areas[2].gradientOptions = [[0.2,1], 0,0,this.bet_areas[2].width,0];
      this.bet_areas[2].fillCmd = this.bet_areas[2].graphics.beginLinearGradientFill(this.dragon_color.default, ...this.bet_areas[2].gradientOptions).command;

      this.bet_areas[2].graphics.moveTo(0, 0).lineTo(this.bet_areas[2].width, 0)
      .lineTo(this.bet_areas[2].width-10, this.bet_areas[2].height)
      .lineTo(-10, this.bet_areas[2].height)
      .lineTo(0, 0);
      this.bet_areas[2].setBounds(this.bet_areas[2].x, this.bet_areas[2].y, this.bet_areas[2].width, this.bet_areas[2].height);
      this.bet_areas[2].table_name = "dragon_big";
      this.bet_areas[2].min_bet = bigSmallMin;
      this.bet_areas[2].max_bet = bigSmallMax;
      this.bet_areas[2].chips = [];

      // dragon_small
      this.bet_areas[3] = new createjs.Shape();
      this.bet_areas[3].width = 135;
      this.bet_areas[3].height = 30;
      this.bet_areas[3].x = this.bet_areas[2].x + this.bet_areas[2].width; //223
      this.bet_areas[3].y = y_pos;
      this.bet_areas[3].color = this.dragon_color;
      this.bet_areas[3].gradientOptions = [[0.2,1], 0,0,this.bet_areas[3].width,0];
      this.bet_areas[3].fillCmd = this.bet_areas[3].graphics.beginLinearGradientFill(this.dragon_color.default, ...this.bet_areas[3].gradientOptions).command;

      this.bet_areas[3].graphics.moveTo(0, 0).lineTo(this.bet_areas[3].width, 0)
      .lineTo(this.bet_areas[3].width-3, this.bet_areas[3].height)
      .lineTo(-10, this.bet_areas[3].height)
      .lineTo(0, 0);
      this.bet_areas[3].setBounds(this.bet_areas[3].x, this.bet_areas[3].y, this.bet_areas[3].width, this.bet_areas[3].height);
      this.bet_areas[3].table_name = "dragon_small";
      this.bet_areas[3].min_bet = bigSmallMin;
      this.bet_areas[3].max_bet = bigSmallMax;
      this.bet_areas[3].chips = [];
      this.bet_areas[3].visible = false;

      // tie
      this.bet_areas[4] = new createjs.Shape();
      this.bet_areas[4].width = 264;
      this.bet_areas[4].height = 30;
      this.bet_areas[4].x = this.bet_areas[3].x +  this.bet_areas[3].width - 5;
      this.bet_areas[4].y = y_pos + 40;
      this.bet_areas[4].color = this.tie_color;
      this.bet_areas[4].gradientOptions = [[0,1], 0, 0,this.bet_areas[4].width,0];
      this.bet_areas[4].fillCmd = this.bet_areas[4].graphics.beginLinearGradientFill(this.tie_color.default, ...this.bet_areas[4].gradientOptions).command;

      this.bet_areas[4].graphics.moveTo(0, 0).lineTo(this.bet_areas[4].width, 0)
      .lineTo(this.bet_areas[4].width + 4, this.bet_areas[4].height)
      .lineTo(-3, this.bet_areas[4].height)
      .lineTo(0, 0);
      this.bet_areas[4].setBounds(0, 0, this.bet_areas[4].width+8, this.bet_areas[4].height);
      this.bet_areas[4].table_name = "tie";
      this.bet_areas[4].min_bet = tieMin;
      this.bet_areas[4].max_bet = tieMax;
      this.bet_areas[4].chips = [];
      this.bet_areas[4].visible = false;

      // suited_tie
      this.bet_areas[5] = new createjs.Shape();
      this.bet_areas[5].width = 274;
      this.bet_areas[5].height = 34;
      this.bet_areas[5].x = this.bet_areas[4].x - 5;
      this.bet_areas[5].y = this.bet_areas[4].y + 30;
      this.bet_areas[5].color = this.suitedtie_color;
      this.bet_areas[5].gradientOptions = [[0,1], 0, 0,this.bet_areas[5].width,0];
      this.bet_areas[5].fillCmd = this.bet_areas[5].graphics.beginLinearGradientFill(this.suitedtie_color.default, ...this.bet_areas[5].gradientOptions).command;

      this.bet_areas[5].graphics.moveTo(0, 0).lineTo(this.bet_areas[5].width, 0)
      .lineTo(this.bet_areas[5].width + 4, this.bet_areas[5].height)
      .lineTo(-3, this.bet_areas[5].height)
      .lineTo(0, 0);
      this.bet_areas[5].setBounds(0, 0, this.bet_areas[5].width+8, this.bet_areas[5].height);
      this.bet_areas[5].table_name = "suited_tie";
      this.bet_areas[5].min_bet = suitedTieMin;
      this.bet_areas[5].max_bet = suitedTieMax;
      this.bet_areas[5].chips = [];

      // dragon
      this.bet_areas[6] = new createjs.Shape();
      this.bet_areas[6].width = 282;
      this.bet_areas[6].height = 36;
      this.bet_areas[6].x = this.bet_areas[5].x - 4; //270
      this.bet_areas[6].y = this.bet_areas[5].y + 35;
      this.bet_areas[6].color = this.dragon_color;
      this.bet_areas[6].gradientOptions = [[0,1], 0, 0,this.bet_areas[6].width,0];
      this.bet_areas[6].fillCmd = this.bet_areas[6].graphics.beginLinearGradientFill(this.dragon_color.default, ...this.bet_areas[6].gradientOptions).command;

      this.bet_areas[6].graphics.moveTo(0, 0).lineTo(this.bet_areas[6].width, 0)
      .lineTo(this.bet_areas[6].width+5, this.bet_areas[6].height)
      .lineTo(-3, this.bet_areas[6].height)
      .lineTo(0, 0);
      this.bet_areas[6].setBounds(0, 0, this.bet_areas[6].width+8, this.bet_areas[6].height);
      this.bet_areas[6].table_name = "dragon";
      this.bet_areas[6].min_bet = mainAreaMin;
      this.bet_areas[6].max_bet = mainAreaMax;
      this.bet_areas[6].chips = [];

      // tiger
      this.bet_areas[7] = new createjs.Shape();
      this.bet_areas[7].width = 291;
      this.bet_areas[7].height = 39;
      this.bet_areas[7].x = this.bet_areas[6].x - 4; //270
      this.bet_areas[7].y = this.bet_areas[6].y + 36;
      this.bet_areas[7].color = this.tiger_color;
      this.bet_areas[7].gradientOptions = [[0,1], 0, 0,this.bet_areas[7].width,0];
      this.bet_areas[7].fillCmd = this.bet_areas[7].graphics.beginLinearGradientFill(this.tiger_color.default, ...this.bet_areas[7].gradientOptions).command;

      this.bet_areas[7].graphics.moveTo(0, 0).lineTo(this.bet_areas[7].width, 0)
      .lineTo(this.bet_areas[7].width + 4 , this.bet_areas[7].height)
      .lineTo(-3, this.bet_areas[7].height)
      .lineTo(0, 0);
      this.bet_areas[7].setBounds(0, 0, this.bet_areas[7].width+8, this.bet_areas[7].height);
      this.bet_areas[7].table_name = "tiger";
      this.bet_areas[7].min_bet = mainAreaMin;
      this.bet_areas[7].max_bet = mainAreaMax;
      this.bet_areas[7].chips = [];


      // tiger_small
      this.bet_areas[8] = new createjs.Shape();
      this.bet_areas[8].width = 140;
      this.bet_areas[8].height = 30;
      this.bet_areas[8].x = this.bet_areas[4].x + this.bet_areas[4].width - 4;
      this.bet_areas[8].y = y_pos;
      this.bet_areas[8].color = this.tiger_color;
      this.bet_areas[8].gradientOptions = [[0,1], 0, 0,this.bet_areas[8].width,0];
      this.bet_areas[8].fillCmd = this.bet_areas[8].graphics.beginLinearGradientFill(this.tiger_color.default, ...this.bet_areas[8].gradientOptions).command;

      this.bet_areas[8].graphics.moveTo(0, 0).lineTo(this.bet_areas[8].width, 0)
      .lineTo(this.bet_areas[8].width + 7 , this.bet_areas[8].height)
      .lineTo(4, this.bet_areas[8].height)
      .lineTo(0, 0);
      this.bet_areas[8].setBounds(0, 0, this.bet_areas[8].width, this.bet_areas[8].height);
      this.bet_areas[8].table_name = "tiger_small";
      this.bet_areas[8].min_bet = bigSmallMin;
      this.bet_areas[8].max_bet = bigSmallMax;
      this.bet_areas[8].chips = [];

      // tiger_big
      this.bet_areas[9] = new createjs.Shape();
      this.bet_areas[9].width = 139;
      this.bet_areas[9].height = 30;
      this.bet_areas[9].x = this.bet_areas[8].x + this.bet_areas[8].width ;
      this.bet_areas[9].y = y_pos;
      this.bet_areas[9].color = this.tiger_color;
      this.bet_areas[9].gradientOptions = [[0,1], 0, 0,this.bet_areas[9].width,0];
      this.bet_areas[9].fillCmd = this.bet_areas[9].graphics.beginLinearGradientFill(this.tiger_color.default, ...this.bet_areas[9].gradientOptions).command;

      this.bet_areas[9].graphics.moveTo(0, 0).lineTo(this.bet_areas[9].width, 0)
      .lineTo(this.bet_areas[9].width + 8 , this.bet_areas[9].height)
      .lineTo(7, this.bet_areas[9].height)
      .lineTo(0, 0);
      this.bet_areas[9].setBounds(0, 0, this.bet_areas[9].width, this.bet_areas[9].height);
      this.bet_areas[9].table_name = "tiger_big";
      this.bet_areas[9].min_bet = bigSmallMin;
      this.bet_areas[9].max_bet = bigSmallMax;
      this.bet_areas[9].chips = [];

      // tiger_odd
      this.bet_areas[10] = new createjs.Shape();
      this.bet_areas[10].width = 133;
      this.bet_areas[10].height = 30;
      this.bet_areas[10].x = this.bet_areas[9].x + this.bet_areas[9].width;
      this.bet_areas[10].y = y_pos;
      this.bet_areas[10].color = this.tiger_color;
      this.bet_areas[10].gradientOptions = [[0,1], 0, 0,this.bet_areas[10].width,0];
      this.bet_areas[10].fillCmd = this.bet_areas[10].graphics.beginLinearGradientFill(this.tiger_color.default, ...this.bet_areas[10].gradientOptions).command;

      this.bet_areas[10].graphics.moveTo(0, 0).lineTo(this.bet_areas[10].width, 0)
      .lineTo(this.bet_areas[10].width + 15 , this.bet_areas[10].height)
      .lineTo(8, this.bet_areas[10].height)
      .lineTo(0, 0);
      this.bet_areas[10].setBounds(0, 0, this.bet_areas[10].width, this.bet_areas[10].height);
      this.bet_areas[10].table_name = "tiger_odd";
      this.bet_areas[10].min_bet = oddEvenMin;
      this.bet_areas[10].max_bet = oddEvenMax;
      this.bet_areas[10].chips = [];

      // tiger_even
      this.bet_areas[11] = new createjs.Shape();
      this.bet_areas[11].width = 110;
      this.bet_areas[11].height = 30;
      this.bet_areas[11].x = this.bet_areas[10].x + this.bet_areas[10].width;
      this.bet_areas[11].y = y_pos;
      this.bet_areas[11].color = this.tiger_element_color;
      this.bet_areas[11].gradientOptions = [[0,1], 10, 0,this.bet_areas[11].width - 10, -30];
      this.bet_areas[11].fillCmd = this.bet_areas[11].graphics.beginLinearGradientFill(this.tiger_element_color.default, ...this.bet_areas[11].gradientOptions).command;

      this.bet_areas[11].graphics.moveTo(0, 0).lineTo(this.bet_areas[11].width, 0)
      .lineTo(this.bet_areas[11].width + 20 , this.bet_areas[11].height)
      .lineTo(16, this.bet_areas[11].height)
      .lineTo(0, 0);
      this.bet_areas[11].setBounds(0, 0, this.bet_areas[11].width , this.bet_areas[11].height);
      this.bet_areas[11].table_name = "tiger_even";
      this.bet_areas[11].min_bet = oddEvenMin;
      this.bet_areas[11].max_bet = oddEvenMax;
      this.bet_areas[11].chips = [];

      for(var x =0; x < this.bet_areas.length; x++) {
        this.bet_areas[x].chip_anim_toPlay = 0
        this.bet_areas[x].chip_drop_scale = 0.8;
        this.bet_areas[x].multiplayer = true;
        this.bet_areas[x].singleplayer = false;
        this.bet_areas[x].total_bet_amt = 0;

        this.bet_areas[x].min_betAmt = this.bet_areas[x].min_bet;
        this.bet_areas[x].max_betAmt = this.bet_areas[x].max_bet;

        this.classic_outline.hitArea = this.bet_areas[x];
        this.bet_areas[x].normal_state = (e,x) => {
          e.fillCmd.linearGradient(e.color.default, ...e.gradientOptions)
        }

        this.bet_areas[x].dropped_state = (e,x) => {
          e.fillCmd.linearGradient(e.color.dropped, ...e.gradientOptions)
        }

        this.bet_areas[x].hover_state = (e,x) => {
          e.fillCmd.linearGradient(e.color.hover, ...e.gradientOptions)
        }

        this.bet_areas[x].win_state = (e,x) => {
          e.fillCmd.linearGradient(e.color.win, ...e.gradientOptions)
        }

        if(this.context.junketAgent) {
          this.bet_areas[x].visible = false;
        }
        // this.context.component_betBoard.addChild(this.bet_areas[x]);
      }

      let users = [1,2,3,6,7,8];
      if(this.context.junketAgent) {
        users = [1,2,3,5,6,7,8]
      }

      var user_icons = [];
      for(var x = 0; x < users.length; x++) {
        user_icons[`user_${users[x]}_icon`] = new createjs.Bitmap(this.context.getResources("user_icon"));
        user_icons[`user_${users[x]}_icon`].scaleX = user_icons[`user_${users[x]}_icon`].scaleY  = 0.5;
        user_icons[`user_${users[x]}_icon`].x = ((users[x]-1) * 185) + 205;
        user_icons[`user_${users[x]}_icon`].y = 828;
        this.addChild(user_icons[`user_${users[x]}_icon`]);

        if(users[x] == 2) {
          user_icons[`user_${users[x]}_icon`].x += 5;
        }
        if(users[x] == 3) {
          user_icons[`user_${users[x]}_icon`].x += 35;
        }
        if(users[x] == 5) {
          user_icons[`user_${users[x]}_icon`].x -= 120;
        }
        if(users[x] == 7) {
          user_icons[`user_${users[x]}_icon`].x += 30;
        }
        if(users[x] == 8) {
          user_icons[`user_${users[x]}_icon`].x += 60;
        }

        this[`user_${users[x]}_name`] = new createjs.Text("","16px lato-regular","#fff");
        this[`user_${users[x]}_name`].y = 828;
        this[`user_${users[x]}_name`].x = user_icons[`user_${users[x]}_icon`].x + 26;
        this.addChild(this[`user_${users[x]}_name`]);

        this[`user_${users[x]}_bet`] = new createjs.Text("","18px bebas-regular","#d8bd69");
        this[`user_${users[x]}_bet`].y = 828;
        this[`user_${users[x]}_bet`].x = this[`user_${users[x]}_name`].x + 155;
        this[`user_${users[x]}_bet`].textAlign = 'right';
        this.addChild(this[`user_${users[x]}_bet`]);

        if(users[x] == 5) {
          this[`user_${users[x]}_bet`].x = this[`user_${users[x]}_name`].x + 220;
        }

        if(users[x] == 1 || users[x] == 8) {
          this[`user_${users[x]}_bet`].x -= 25;
        }
      }

      // === user bets
      let color_def2 = "rgba(255,255,255,0.4)";

      // === Multiplayer side bets for junket agent
      this.multiBets = [];

      this.dragon_even = new createjs.Shape();
      this.dragon_even.width = 110;
      this.dragon_even.height = 30;
      this.dragon_even.x = 306;
      this.dragon_even.y = y_pos;
      this.dragon_even.graphics.beginFill(color_def2).moveTo(0, 0).lineTo(this.dragon_even.width, 0)
        .lineTo(this.dragon_even.width-13, this.dragon_even.height)
        .lineTo(-20, this.dragon_even.height)
        .lineTo(0, 0);
      this.dragon_even.setBounds(0,0,this.dragon_even.width+10, this.dragon_even.height);
      this.dragon_even.betarea = "dragon_even";
      this.dragon_even.alpha = 0.05;
      this.dragon_even.chips = [];
      this.dragon_even.total_bet_amt = 0;
      this.dragon_even.visible = this.context.junketAgent;
      this.dragon_even.payout_multiplier = 1;
      this.addChild(this.dragon_even);

      // dragon_odd
      this.dragon_odd = new createjs.Shape();
      this.dragon_odd.width = 140;
      this.dragon_odd.height = 30;
      this.dragon_odd.x = this.dragon_even.x + this.dragon_even.width;
      this.dragon_odd.y = y_pos;
      this.dragon_odd.graphics.beginFill(color_def2).moveTo(0, 0).lineTo(this.dragon_odd.width, 0)
      .lineTo(this.dragon_odd.width-10, this.dragon_odd.height)
      .lineTo(-15, this.dragon_odd.height)
      .lineTo(0, 0);
      this.dragon_odd.setBounds(0,0,this.dragon_odd.width, this.dragon_odd.height);
      this.dragon_odd.betarea = "dragon_odd";
      this.dragon_odd.alpha = 0.05;
      this.dragon_odd.chips = [];
      this.dragon_odd.total_bet_amt = 0;
      this.dragon_odd.visible = this.context.junketAgent;
      this.dragon_odd.payout_multiplier = 1;
      this.addChild(this.dragon_odd);

      // dragon_big
      this.dragon_big = new createjs.Shape();
      this.dragon_big.width = 140;
      this.dragon_big.height = 30;
      this.dragon_big.x = this.dragon_odd.x + this.dragon_odd.width;
      this.dragon_big.y = y_pos;
      this.dragon_big.graphics.beginFill(color_def2).moveTo(0, 0).lineTo(this.dragon_big.width, 0)
      .lineTo(this.dragon_big.width-10, this.dragon_big.height)
      .lineTo(-10, this.dragon_big.height)
      .lineTo(0, 0);
      this.dragon_big.setBounds(0, 0, this.dragon_big.width, this.dragon_big.height);
      this.dragon_big.betarea = "dragon_big";
      this.dragon_big.alpha = 0.05;
      this.dragon_big.chips = [];
      this.dragon_big.total_bet_amt = 0;
      this.dragon_big.visible = this.context.junketAgent;
      this.dragon_big.payout_multiplier = 1;
      this.addChild(this.dragon_big);

      // dragon_small
      this.dragon_small = new createjs.Shape();
      this.dragon_small.width = 135;
      this.dragon_small.height = 30;
      this.dragon_small.x = this.dragon_big.x + this.dragon_big.width;
      this.dragon_small.y = y_pos;
      this.dragon_small.graphics.beginFill(color_def2).moveTo(0, 0).lineTo(this.dragon_small.width, 0)
      .lineTo(this.dragon_small.width-3, this.dragon_small.height)
      .lineTo(-10, this.dragon_small.height)
      .lineTo(0, 0);
      this.dragon_small.setBounds(0, 0, this.dragon_small.width, this.dragon_small.height);
      this.dragon_small.betarea = "dragon_small";
      this.dragon_small.alpha = 0.05;
      this.dragon_small.chips = [];
      this.dragon_small.total_bet_amt = 0;
      this.dragon_small.visible = this.context.junketAgent;
      this.dragon_small.payout_multiplier = 1;
      this.addChild(this.dragon_small);

      this.tiger_small = new createjs.Shape();
      this.tiger_small.width = 140;
      this.tiger_small.height = 30;
      this.tiger_small.x = this.bet_areas[4].x + this.bet_areas[4].width - 4;
      this.tiger_small.y = y_pos;
      this.tiger_small.graphics.beginFill(color_def2).moveTo(0, 0).lineTo(this.tiger_small.width, 0)
      .lineTo(this.tiger_small.width + 7 , this.tiger_small.height)
      .lineTo(4, this.tiger_small.height)
      .lineTo(0, 0);
      this.tiger_small.setBounds(0, 0, this.tiger_small.width, this.tiger_small.height);
      this.tiger_small.betarea = "tiger_small";
      this.tiger_small.alpha = 0.05;
      this.tiger_small.chips = [];
      this.tiger_small.total_bet_amt = 0;
      this.tiger_small.visible = this.context.junketAgent;
      this.tiger_small.payout_multiplier = 1;
      this.addChild(this.tiger_small);

      this.tiger_big = new createjs.Shape();
      this.tiger_big.width = 139;
      this.tiger_big.height = 30;
      this.tiger_big.x = this.tiger_small.x + this.tiger_small.width ;
      this.tiger_big.y = y_pos;
      this.tiger_big.graphics.beginFill(color_def2).moveTo(0, 0).lineTo(this.tiger_big.width, 0)
      .lineTo(this.tiger_big.width + 8 , this.tiger_big.height)
      .lineTo(7, this.tiger_big.height)
      .lineTo(0, 0);
      this.tiger_big.setBounds(0, 0, this.tiger_big.width, this.tiger_big.height);
      this.tiger_big.betarea = "tiger_big";
      this.tiger_big.alpha = 0.05;
      this.tiger_big.chips = [];
      this.tiger_big.total_bet_amt = 0;
      this.tiger_big.visible = this.context.junketAgent;
      this.tiger_big.payout_multiplier = 1;
      this.addChild(this.tiger_big);

      this.tiger_odd = new createjs.Shape();
      this.tiger_odd.width = 133;
      this.tiger_odd.height = 30;
      this.tiger_odd.x = this.bet_areas[9].x + this.bet_areas[9].width;
      this.tiger_odd.y = y_pos;
      this.tiger_odd.graphics.beginFill(color_def2).moveTo(0, 0).lineTo(this.tiger_odd.width, 0)
      .lineTo(this.tiger_odd.width + 15 , this.tiger_odd.height)
      .lineTo(8, this.tiger_odd.height)
      .lineTo(0, 0);
      this.tiger_odd.setBounds(0, 0, this.tiger_odd.width, this.tiger_odd.height);
      this.tiger_odd.betarea = "tiger_odd";
      this.tiger_odd.alpha = 0.05;
      this.tiger_odd.chips = [];
      this.tiger_odd.total_bet_amt = 0;
      this.tiger_odd.visible = this.context.junketAgent;
      this.tiger_odd.payout_multiplier = 1;
      this.addChild(this.tiger_odd);

      this.tiger_even = new createjs.Shape();
      this.tiger_even.width = 110;
      this.tiger_even.height = 30;
      this.tiger_even.x = this.bet_areas[10].x + this.bet_areas[10].width;
      this.tiger_even.y = y_pos;
      this.tiger_even.graphics.beginFill(color_def2).moveTo(0, 0).lineTo(this.tiger_even.width, 0)
      .lineTo(this.tiger_even.width + 20 , this.tiger_even.height)
      .lineTo(16, this.tiger_even.height)
      .lineTo(0, 0);
      this.tiger_even.setBounds(0, 0, this.tiger_even.width+10, this.tiger_even.height);
      this.tiger_even.betarea = "tiger_even";
      this.tiger_even.alpha = 0.05;
      this.tiger_even.chips = [];
      this.tiger_even.total_bet_amt = 0;
      this.tiger_even.visible = this.context.junketAgent;
      this.tiger_even.payout_multiplier = 1;
      this.addChild(this.tiger_even);
      // === Multiplayer side bets for junket agent

      // ==== player 1
			this.user_1[0] = new createjs.Shape();
			this.user_1[0].x = 285;
			this.user_1[0].graphics.beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,55,25).moveTo(0,0).lineTo(169,0).lineTo(153,32).lineTo(-22,32).lineTo(0,0);
			this.user_1[0].setBounds(0,0,169,32);
			this.user_1[0].y = 671;
			this.user_1[0].betarea = "tie";
			this.user_1[0].alpha = 0;
			this.user_1[0].chips = [];
			this.user_1[0].payout_multiplier = 10;
			this.addChild(this.user_1[0]);

      this.user_1[1] = new createjs.Shape();
			this.user_1[1].x = this.user_1[0].x - 23;
			this.user_1[1].graphics.beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,57,27).moveTo(0,0).lineTo(175,0).lineTo(161,32).lineTo(-22,32).lineTo(0,0);
			this.user_1[1].setBounds(0,0,175,32);
			this.user_1[1].y = this.user_1[0].y + 32;
			this.user_1[1].betarea = "suited_tie";
			this.user_1[1].alpha = 0;
			this.user_1[1].chips = [];
			this.user_1[1].payout_multiplier = 50;
			this.addChild(this.user_1[1]);

      this.user_1[2] = new createjs.Shape();
			this.user_1[2].x = this.user_1[1].x - 22;
			this.user_1[2].graphics.beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,55,30).moveTo(0,0).lineTo(184,0).lineTo(168,36).lineTo(-22,36).lineTo(0,0);
			this.user_1[2].setBounds(0,0,184,35);
			this.user_1[2].y = this.user_1[1].y + 32;
			this.user_1[2].betarea = "dragon";
			this.user_1[2].alpha = 0;
			this.user_1[2].chips = [];
			this.user_1[2].payout_multiplier = 1;
			this.addChild(this.user_1[2]);

      this.user_1[3] = new createjs.Shape();
			this.user_1[3].x = this.user_1[2].x - 22;
			this.user_1[3].graphics.beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,57,37).moveTo(0,0).lineTo(186,0).lineTo(167,40).lineTo(-26,40).lineTo(0,0);
			this.user_1[3].setBounds(0,0,189,40);
			this.user_1[3].y = this.user_1[2].y + 36;
			this.user_1[3].betarea = "tiger";
			this.user_1[3].alpha = 0;
			this.user_1[3].chips = [];
			this.user_1[3].payout_multiplier = 1;
			this.addChild(this.user_1[3]);

      // ==== player 2
			this.user_2[0] = new createjs.Shape();
			this.user_2[0].x = this.user_1[0].x + 169;
			this.user_2[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(186.5,0).lineTo(176.5,32).lineTo(-16,32).lineTo(0,0);
      this.user_2[0].setBounds(0,0,186.5,32);
			this.user_2[0].y = this.user_1[0].y;
			this.user_2[0].betarea = "tie";
			this.user_2[0].alpha = 0;
			this.user_2[0].chips = [];
			this.user_2[0].payout_multiplier = 10;
			this.addChild(this.user_2[0]);

      this.user_2[1] = new createjs.Shape();
			this.user_2[1].x = this.user_2[0].x - 17; //262
			this.user_2[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(193,0).lineTo(184,32).lineTo(-14,32).lineTo(0,0);
      this.user_2[1].setBounds(0,0,193,32);
			this.user_2[1].y = this.user_2[0].y + 32;
			this.user_2[1].betarea = "suited_tie";
			this.user_2[1].alpha = 0;
			this.user_2[1].chips = [];
			this.user_2[1].payout_multiplier = 50;
			this.addChild(this.user_2[1]);

      this.user_2[2] = new createjs.Shape();
			this.user_2[2].x = this.user_2[1].x - 13; //262
			this.user_2[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(197,0).lineTo(186,36).lineTo(-16,36).lineTo(0,0);
      this.user_2[2].setBounds(0,0,197,36);
			this.user_2[2].y = this.user_2[1].y + 32;
			this.user_2[2].betarea = "dragon";
			this.user_2[2].alpha = 0;
			this.user_2[2].chips = [];
			this.user_2[2].payout_multiplier = 1;
			this.addChild(this.user_2[2]);

      this.user_2[3] = new createjs.Shape();
			this.user_2[3].x = this.user_2[2].x - 20; //262
			this.user_2[3].graphics.beginFill(color_def2).moveTo(0,0).lineTo(206,0).lineTo(193,40).lineTo(-19,40).lineTo(0,0);
      this.user_2[3].setBounds(0,0,206,40);
			this.user_2[3].y = this.user_2[2].y + 36;
			this.user_2[3].betarea = "tiger";
			this.user_2[3].alpha = 0;
			this.user_2[3].chips = [];
			this.user_2[3].payout_multiplier = 1;
			this.addChild(this.user_2[3]);

      // ==== player 3
      this.user_3[0] = new createjs.Shape();
      this.user_3[0].x = this.user_2[0].x + 187;
      this.user_3[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(186,0).lineTo(183,32).lineTo(-11,32).lineTo(0,0);
      this.user_3[0].setBounds(0,0,186,32);
      this.user_3[0].y = this.user_2[0].y;
      this.user_3[0].betarea = "tie";
      this.user_3[0].alpha = 0;
      this.user_3[0].chips = [];
      this.user_3[0].payout_multiplier = 10;
      this.addChild(this.user_3[0]);

      this.user_3[1] = new createjs.Shape();
      this.user_3[1].x = this.user_3[0].x - 11;
      this.user_3[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(193,0).lineTo(189,32).lineTo(-9,32).lineTo(0,0);
      this.user_3[1].setBounds(0,0,193,32);
      this.user_3[1].y = this.user_3[0].y + 32;
      this.user_3[1].betarea = "suited_tie";
      this.user_3[1].alpha = 0;
      this.user_3[1].chips = [];
      this.user_3[1].payout_multiplier = 50;
      this.addChild(this.user_3[1]);

      this.user_3[2] = new createjs.Shape();
      this.user_3[2].x = this.user_3[1].x - 9;
      this.user_3[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(198,0).lineTo(193,36).lineTo(-11,36).lineTo(0,0);
      this.user_3[2].setBounds(0,0,198,36);
      this.user_3[2].y = this.user_3[1].y + 32;
      this.user_3[2].betarea = "dragon";
      this.user_3[2].alpha = 0;
      this.user_3[2].chips = [];
      this.user_3[2].payout_multiplier = 1;
      this.addChild(this.user_3[2]);

      this.user_3[3] = new createjs.Shape();
      this.user_3[3].x = this.user_3[2].x - 11;
      this.user_3[3].graphics.beginFill(color_def2).moveTo(0,0).lineTo(205,0).lineTo(200,40).lineTo(-13,40).lineTo(0,0);
      this.user_3[3].setBounds(0,0,205,40);
      this.user_3[3].y = this.user_3[2].y + 36;
      this.user_3[3].betarea = "tiger";
      this.user_3[3].alpha = 0;
      this.user_3[3].chips = [];
      this.user_3[3].payout_multiplier = 1;
      this.addChild(this.user_3[3]);

      // ==== player 5
      this.user_5[0] = new createjs.Shape();
      this.user_5[0].width = 264;
      this.user_5[0].height = 30;
      this.user_5[0].x = 826.5;
      this.user_5[0].y = y_pos + 40;
      this.user_5[0].graphics.beginFill(color_def2).moveTo(0, 0).lineTo(this.user_5[0].width, 0)
        .lineTo(this.user_5[0].width + 4, this.user_5[0].height)
        .lineTo(-3, this.user_5[0].height)
        .lineTo(0, 0);
      this.user_5[0].betarea = "tie";
      this.user_5[0].visible = this.context.junketAgent;
      this.user_5[0].alpha = 0;
      this.user_5[0].chips = [];
      this.user_5[0].payout_multiplier = 10;
      this.user_5[0].setBounds(0, 0, this.user_5[0].width+8, this.user_5[0].height);
      this.addChild(this.user_5[0]);

      this.user_5[1] = new createjs.Shape();
      this.user_5[1].width = 274;
      this.user_5[1].height = 34;
      this.user_5[1].x = this.user_5[0].x - 5;
      this.user_5[1].y = this.user_5[0].y + 30;
      this.user_5[1].graphics.beginFill(color_def2).moveTo(0, 0).lineTo(this.user_5[1].width, 0)
        .lineTo(this.user_5[1].width + 4, this.user_5[1].height)
        .lineTo(-3, this.user_5[1].height)
        .lineTo(0, 0);
      this.user_5[1].betarea = "suited_tie";
      this.user_5[1].visible = this.context.junketAgent;
      this.user_5[1].setBounds(0, 0, this.user_5[1].width+8, this.user_5[1].height);
      this.user_5[1].alpha = 0;
      this.user_5[1].chips = [];
      this.user_5[1].payout_multiplier = 50;
      this.addChild(this.user_5[1]);

      this.user_5[2] = new createjs.Shape();
      this.user_5[2].width = 282;
      this.user_5[2].height = 36;
      this.user_5[2].x = this.user_5[1].x - 4;
      this.user_5[2].y = this.user_5[1].y + 35;
      this.user_5[2].graphics.beginFill(color_def2).moveTo(0, 0).lineTo(this.user_5[2].width, 0)
        .lineTo(this.user_5[2].width+5, this.user_5[2].height)
        .lineTo(-3, this.user_5[2].height)
        .lineTo(0, 0);
      this.user_5[2].supersix = [0,0, 136,0, 136,46, -6,46, 0,0];
      this.user_5[2].classic = [0,0, 275,0, 282,46, -6,46, 0,0];
      this.user_5[2].betarea = "dragon";
      this.user_5[2].visible = this.context.junketAgent;
      this.user_5[2].setBounds(0, 0, this.user_5[2].width+8, this.user_5[2].height);
      this.user_5[2].alpha = 0;
      this.user_5[2].chips = [];
      this.user_5[2].payout_multiplier = 1;
      this.addChild(this.user_5[2]);

      this.user_5[3] = new createjs.Shape();
      this.user_5[3].width = 291;
      this.user_5[3].height = 39;
      this.user_5[3].x = this.user_5[2].x - 4;
      this.user_5[3].y = this.user_5[2].y + 36;
      this.user_5[3].graphics.beginFill(color_def2).moveTo(0, 0).lineTo(this.user_5[3].width, 0)
        .lineTo(this.user_5[3].width + 4 , this.user_5[3].height)
        .lineTo(-3, this.user_5[3].height)
        .lineTo(0, 0);
      this.user_5[3].classic = [0,-1 ,286,-1 ,294,54 ,-8,54 ,0,0];
      this.user_5[3].betarea = "tiger";
      this.user_5[3].visible = this.context.junketAgent;
      this.user_5[3].setBounds(0, 0, this.user_5[3].width+8, this.user_5[3].height);
      this.user_5[3].alpha = 0;
      this.user_5[3].chips = [];
      this.user_5[3].payout_multiplier = 1;
      this.addChild(this.user_5[3]);

      // ==== player 6
      this.user_6[0] = new createjs.Shape();
      this.user_6[0].x = this.user_3[0].x + 193 + 256;
      this.user_6[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(188,0).lineTo(198,32).lineTo(4,32).lineTo(0,0);
      this.user_6[0].setBounds(0,0,198,32);
      this.user_6[0].y = this.user_3[0].y;
      this.user_6[0].betarea = "tie";
      this.user_6[0].alpha = 0;
      this.user_6[0].chips = [];
      this.user_6[0].payout_multiplier = 10;
      this.addChild(this.user_6[0]);

      this.user_6[1] = new createjs.Shape();
      this.user_6[1].x = this.user_6[0].x + 5;
      this.user_6[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(192,0).lineTo(202,32).lineTo(3,32).lineTo(0,0);
      this.user_6[1].setBounds(0,0,202,32);
      this.user_6[1].y = this.user_6[0].y + 32;
      this.user_6[1].betarea = "suited_tie";
      this.user_6[1].alpha = 0;
      this.user_6[1].chips = [];
      this.user_6[1].payout_multiplier = 50;
      this.addChild(this.user_6[1]);

      this.user_6[2] = new createjs.Shape();
      this.user_6[2].x = this.user_6[1].x + 3;
      this.user_6[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(200,0).lineTo(210,36).lineTo(5,36).lineTo(0,0);
      this.user_6[2].setBounds(0,0,210,36);
      this.user_6[2].y = this.user_6[1].y + 32;
      this.user_6[2].betarea = "dragon";
      this.user_6[2].alpha = 0;
      this.user_6[2].chips = [];
      this.user_6[2].payout_multiplier = 1;
      this.addChild(this.user_6[2]);

      this.user_6[3] = new createjs.Shape();
      this.user_6[3].x = this.user_6[2].x + 5;
      this.user_6[3].graphics.beginFill(color_def2).moveTo(0,0).lineTo(205,0).lineTo(216 ,40).lineTo(5,40).lineTo(0,0);
      this.user_6[3].setBounds(0,0,216,40);
      this.user_6[3].y = this.user_6[2].y + 36;
      this.user_6[3].betarea = "tiger";
      this.user_6[3].alpha = 0;
      this.user_6[3].chips = [];
      this.user_6[3].payout_multiplier = 1;
      this.addChild(this.user_6[3]);

      // ==== player 7
      this.user_7[0] = new createjs.Shape();
      this.user_7[0].x = this.user_6[0].x + 188;
      this.user_7[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(187,0).lineTo(200,32).lineTo(10,32).lineTo(0,0);
      this.user_7[0].setBounds(0,0,200,32);
      this.user_7[0].y = this.user_6[0].y;
      this.user_7[0].betarea = "tie";
      this.user_7[0].alpha = 0;
      this.user_7[0].chips = [];
      this.user_7[0].payout_multiplier = 10;
      this.addChild(this.user_7[0]);

      this.user_7[1] = new createjs.Shape();
      this.user_7[1].x = this.user_7[0].x + 9;
      this.user_7[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(192,0).lineTo(207,32).lineTo(10,32).lineTo(0,0);
      this.user_7[1].setBounds(0,0,207,32);
      this.user_7[1].y = this.user_7[0].y + 32;
      this.user_7[1].betarea = "suited_tie";
      this.user_7[1].alpha = 0;
      this.user_7[1].chips = [];
      this.user_7[1].payout_multiplier = 50;
      this.addChild(this.user_7[1]);

      this.user_7[2] = new createjs.Shape();
      this.user_7[2].x = this.user_7[1].x + 11;
      this.user_7[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(199,0).lineTo(214,36).lineTo(10,36).lineTo(0,0);
      this.user_7[2].setBounds(0,0,214,36);
      this.user_7[2].y = this.user_7[1].y + 32;
      this.user_7[2].betarea = "dragon";
      this.user_7[2].alpha = 0;
      this.user_7[2].chips = [];
      this.user_7[2].payout_multiplier = 1;
      this.addChild(this.user_7[2]);

      this.user_7[3] = new createjs.Shape();
      this.user_7[3].x = this.user_7[2].x + 10;
      this.user_7[3].graphics.beginFill(color_def2).moveTo(0,0).lineTo(204,0).lineTo(223,40).lineTo(11,40).lineTo(0,0);
      this.user_7[3].setBounds(0,0,223,40);
      this.user_7[3].y = this.user_7[2].y + 36;
      this.user_7[3].betarea = "tiger";
      this.user_7[3].alpha = 0;
      this.user_7[3].chips = [];
      this.user_7[3].payout_multiplier = 1;
      this.addChild(this.user_7[3]);

      // ==== player 8
      this.user_8[0] = new createjs.Shape();
      this.user_8[0].x = this.user_7[0].x + 187;
      this.user_8[0].graphics.beginLinearGradientFill([color_def2,"transparent"],[0,1],90,0,140,-40).moveTo(0,0).lineTo(165,0).lineTo(188,32).lineTo(13,32).lineTo(0,0);
      this.user_8[0].setBounds(0,0,188,32);
      this.user_8[0].y = this.user_7[0].y;
      this.user_8[0].betarea = "tie";
      this.user_8[0].alpha = 0;
      this.user_8[0].chips = [];
      this.user_8[0].payout_multiplier = 10;
      this.addChild(this.user_8[0]);

      this.user_8[1] = new createjs.Shape();
      this.user_8[1].x = this.user_8[0].x + 14;
      this.user_8[1].graphics.beginLinearGradientFill([color_def2,"transparent"],[0,1],97,0,150,-30).moveTo(0,0).lineTo(175,0).lineTo(198,32).lineTo(15,32).lineTo(0,0);
      this.user_8[1].setBounds(0,0,198,32);
      this.user_8[1].y = this.user_8[0].y + 32;
      this.user_8[1].betarea = "suited_tie";
      this.user_8[1].alpha = 0;
      this.user_8[1].chips = [];
      this.user_8[1].payout_multiplier = 50;
      this.addChild(this.user_8[1]);

      this.user_8[2] = new createjs.Shape();
      this.user_8[2].x = this.user_8[1].x + 18;
      this.user_8[2].graphics.beginLinearGradientFill([color_def2,"transparent"],[0,1],100,0,150,-30).moveTo(0,0).lineTo(180,0).lineTo(205,36).lineTo(15,36).lineTo(0,0);
      this.user_8[2].setBounds(0,0,205,36);
      this.user_8[2].y = this.user_8[1].y + 32;
      this.user_8[2].betarea = "dragon";
      this.user_8[2].alpha = 0;
      this.user_8[2].chips = [];
      this.user_8[2].payout_multiplier = 1;
      this.addChild(this.user_8[2]);

      this.user_8[3] = new createjs.Shape();
      this.user_8[3].x = this.user_8[2].x + 15;
      this.user_8[3].graphics.beginLinearGradientFill([color_def2,"transparent"],[0,1],110,0,160,-30).moveTo(0,0).lineTo(190,0).lineTo(218,40).lineTo(19,40).lineTo(0,0);
      this.user_8[3].setBounds(0,0,218,40);
      this.user_8[3].y = this.user_8[2].y + 36;
      this.user_8[3].betarea = "tiger";
      this.user_8[3].alpha = 0;
      this.user_8[3].chips = [];
      this.user_8[3].payout_multiplier = 1;
      this.addChild(this.user_8[3]);

      this.chips_container = new createjs.Container();
			this.chips_container.x = this.x;
			this.chips_container.y = this.y;
			this.chips_container.visible = false;

      this.side_chips_container = new createjs.Container();
      this.side_chips_container.x = this.x;
      this.side_chips_container.y = this.y;
      this.side_chips_container.visible = false;

      let areaMaxBet = 0;
      let moneyCheck = 0;
      let table_chip = {};
      let users_area = ["user_1", "user_2","user_3","user_5","user_6","user_7","user_8"];

      for(var x = 0; x < users_area.length; x++) {
        // if(x!=4 && x!=5) {
          for(var i = 0; i < this[users_area[x]].length; i++) {
            let user = this[users_area[x]];
            user[i].alpha = 0.05;
            user[i].set = false;

            if(user[i].betarea == "dragon" || user[i].betarea == "tiger" ) {
              user[i].min_betAmt = mainAreaMin;
              user[i].max_betAmt = mainAreaMax;
              user[i].payout_multiplier = 1;
            }

            if(user[i].betarea == "tie") {
              user[i].min_betAmt = tieMin;
              user[i].max_betAmt = tieMax;
              user[i].payout_multiplier = 10;
            }

            if(user[i].betarea == "suited_tie") {
              user[i].min_betAmt = suitedTieMin;
              user[i].max_betAmt = suitedTieMax;
              user[i].payout_multiplier = 50;
            }

            // table_img.hitArea = user[i]
            this.classic_outline.hitArea = user[i];

            user[i].addEventListener("click", (area) => {
              if(this.context.junketAgent) return;

              if(this.context.firstRound) {
                this.context.component_messages.setMessage(window.language.prompts.promptfirstround, 1);
                return;
              }
              if (!this.context.component_timer.betting_start) {
                return;
              } // end if

              if(!this.context.component_chips.selected_chip) return;

              if (!this.context.component_chips.selected_chip || this.context.component_chips.selected_chip === undefined ) {
                return;
              } // end if

              let dropArea = null;

              for (var i = 0; i < this.context.component_betBoard.bet_areas.length; i++) {
                if (area.currentTarget.betarea == this.context.component_betBoard.bet_areas[i].table_name && this.context.component_betBoard.bet_areas[i].multiplayer) {
                  dropArea = this.context.component_betBoard.bet_areas[i];
                  break;
                }
              }

              // if(area.currentTarget.betarea == "tiger") {
              //   dropArea = this.context.component_betBoard.bet_areas[11];
              // } else if(area.currentTarget.betarea == "tie") {
              //   dropArea = this.context.component_betBoard.bet_areas[9];
              // } else if(area.currentTarget.betarea == "suited_tie") {
              //   dropArea = this.context.component_betBoard.bet_areas[10];
              // } else if(area.currentTarget.betarea == "dragon") {
              //   dropArea = this.context.component_betBoard.bet_areas[6];
              // }

              try  {
                let condition = opposite_bet(dropArea.table_name,this.context.component_betBoard.bet_areas);

                if (condition) {
                  dropArea.chips = [];
                  this.context.component_betBoard.checkTableHighlight();
                  return;
                } // end if
              } // end try
              catch(e) { } // end catch

              if ((dropArea.total_bet_amt+this.context.component_chips.selected_chip.chip_amt) > dropArea.max_betAmt) {
                this.context.component_messages.setMessage(window.language.prompts.promptmaxbet,1);
                return;
              } // end if

              if (dropArea.total_bet_amt == dropArea.max_betAmt) {
                this.context.component_messages.setMessage(window.language.prompts.promptmaxbet,1);
                return;
              } // end if

              if (this.context.component_chips.selected_chip.chip_amt == "max") {
                areaMaxBet = parseInt(dropArea.max_betAmt);

                moneyCheck = parseInt(this.context.context.user_money) - this.context.component_chips.total_ingame_bet;
                this.context.component_chips.total_ingame_bet -=  parseInt(dropArea.total_bet_amt);

                if (areaMaxBet > moneyCheck && parseInt(this.context.context.user_money) != 0) {
                  if (moneyCheck == 0) {
                    this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
                    return;
                  }

                  this.context.component_chips.total_ingame_bet += moneyCheck;
                }
                else {
                  this.context.component_chips.total_ingame_bet += parseInt(dropArea.max_betAmt);
                }
              }
              else {
                this.context.component_chips.total_ingame_bet += parseInt(this.context.component_chips.selected_chip.chip_amt);
              } // end if

              if (parseInt(this.context.component_chips.total_ingame_bet) > parseInt(this.context.context.user_money)) {
                if (this.context.component_chips.selected_chip.chip_amt == "max") {
                  this.context.component_chips.total_ingame_bet -= parseInt(dropArea.max_betAmt);
                } // end if
                else {
                  this.context.component_chips.total_ingame_bet -= parseInt(this.context.component_chips.selected_chip.chip_amt);
                } // end else

                this.context.component_messages.setMessage(window.language.prompts.promptfunds,1);
                return;
              } // end

              this.context.component_gameButtons.repeatButton.visible = false;
              this.context.component_gameButtons.undoButton.visible = true;
              this.context.component_chips.selected_chip.is_dropped = true;

              table_chip = _.clone(this.context.component_chips.selected_chip);
              table_chip.scaleX = table_chip.scaleY = dropArea.chip_drop_scale;
              table_chip.dropped_at = dropArea;
              table_chip.confirmed_bet = false;
              dropArea.chips.push(table_chip);

              if(!dropArea.is_advanced_bet) {
                this.context.component_chips.actions.push({
                  chip_amount_used:table_chip.chip_amt,
                  drop_area: dropArea
                }); // end of push
              }

              setTimeout(() => {
                this.context.component_gameButtons.is_confirmed_bet = false;

                if(!this.context.component_timer.betting_start) return;
                this.context.component_chips.changeCurrentChips(table_chip, dropArea, false, false, true);
              },200)

              if (this.context.component_chips.selected_chip.chip_amt != "max") {
                dropArea.total_bet_amt += parseInt(table_chip.chip_amt);
              }
              else {
                dropArea.total_bet_amt = dropArea.max_betAmt;

                if (areaMaxBet > moneyCheck) {
                  dropArea.total_bet_amt = moneyCheck;
                }
              } // end if

              // this.context.component_chips.selected_chip.alpha = 0;
              // this.context.component_chips.selectNewChip(); /** select chip new **/

              this.context.component_gameButtons.checkButtonState();
            });
          }
        // }
      }

      // this.context.component_betBoard.addChild(table_img);

      // if(parseInt(window.multiplayer)) {
      //   this.addChild(this.context.component_betBoard.chipWrap);
      // }
    },

    cloneTableDraw() {
      let table_img = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "multiplayer_table_chinese" : "multiplayer_table"));
      let adjustX = 5;
      let adjustY = 0;
      table_img.scaleX = table_img.scaleY = 0.5;
      table_img.regX = table_img.getBounds().width/2;
      table_img.regY = table_img.getBounds().height/2;
      table_img.x = this.context.context.width/2 + 70 - adjustX
      table_img.y = this.context.context.height/2 + 85 + adjustY
      table_img.multiplayer = true;

      return table_img;

    },
    setPlayerBets(data) {
      var loop = 0;
      let users_area = this.toSet;

      for(var x = 0; x < data.length; x++) {
        if(!users_area[x]) continue;
        if(!data[x].name) {
          data[x].name = "..."
        }

        if(data[x].name.split("").length > 3) {
          this[`${users_area[x]}_name`].text = data[x].name.substr(0,3) + "***";
        } else {
          this[`${users_area[x]}_name`].text = data[x].name;
        }

        this[`${users_area[x]}_name`].user_id = data[x].id;
        this[`${users_area[x]}_bet`].text = 0;

        if (!data[x].bets.length) {
          continue;
        }

        for (var i = 0; i < this[`${users_area[x]}`].length; i++) {
          data[x].bets.forEach((row) => {
            if (this[`${users_area[x]}`][i].betarea == row.bet) {
              this[`${users_area[x]}`][i].alpha = 1;
              this[`${users_area[x]}`][i].set = true;
              let calc = (parseInt(row.bet_amount) / parseInt(row.currencyMultiplier ? row.currencyMultiplier : 1 ));
              row.bet_amount = (calc/parseInt(row.userMultiplier ? row.userMultiplier : 1) * window.currencyMultiplier) * window.userMultiplier
              this.changeCurrentChips(row.bet_amount, this[`${users_area[x]}`][i]);
            }
          })
        }

        let total = _.sumBy(data[x].bets, function (e) {
          return e.bet_amount
        });

        this[`${users_area[x]}_bet`].text = numberWithCommas(total);

        // if (window.userId != data[x - 1].id && data[x - 1].id != undefined) {
        //   loop++;

        //   for (var i = 0; i < this["user_" + (loop > 3 ? (loop + 2) : loop)].length; i++) {
        //     if (loop > 3) {
        //       if(!data[x - 1].name) {
        //         data[x - 1].name = "..."
        //       }

        //       if(data[x - 1].name.split("").length > 3) {
        //         this["user_" + (loop + 2) + "_name"].text = data[x - 1].name.substr(0,3) + "***";
        //       } else {
        //         this["user_" + (loop + 2) + "_name"].text = data[x - 1].name;
        //       }

        //       this["user_" + (loop + 2) + "_name"].user_name = data[x - 1].name;
        //       this["user_" + (loop + 2) + "_name"].user_id = data[x - 1].id;
        //       this["user_" + (loop + 2)+"_bet"].text  = "0";

        //       if (!data[x - 1].bets.length) {
        //         continue;
        //       }

        //       data[x - 1].bets.forEach((row) => {
        //         if (this["user_" + (loop + 2)][i].betarea == row.bet) {
        //           this["user_" + (loop + 2)][i].alpha = 1;
        //           this["user_" + (loop + 2)][i].set = true;

        //           let calc = (parseInt(row.bet_amount) / parseInt(row.currencyMultiplier ? row.currencyMultiplier : 1))
        //           row.bet_amount = (calc/parseInt(row.userMultiplier ? row.userMultiplier : 1) * window.currencyMultiplier) * window.userMultiplier

        //           // this["user_" + (loop + 2)+"_bet"].text = numberWithCommas(row.bet_amount);
        //           this.changeCurrentChips(row.bet_amount, this["user_" + (loop + 2)][i]);
        //         }
        //       });

        //       let total = _.sumBy(data[x - 1].bets, function (e) {
        //         return e.bet_amount
        //       });
        //       this["user_" + (loop + 2)+"_bet"].text = numberWithCommas(total);
        //     }
        //     else {
        //       if(!data[x - 1].name) {
        //         data[x - 1].name = "..."
        //       }

        //       if(data[x - 1].name.split("").length > 3) {
        //         this["user_" + loop + "_name"].text = data[x - 1].name.substr(0,3) + "***";
        //       } else {
        //         this["user_" + loop + "_name"].text = data[x - 1].name;
        //       }

        //       this["user_" + loop + "_name"].user_name = data[x - 1].name;
        //       this["user_" + loop + "_name"].user_id = data[x - 1].id;
        //       this["user_" + loop+"_bet"].text  = "0";

        //       if (!data[x - 1].bets.length) {
        //         continue;
        //       }

        //       data[x - 1].bets.forEach((row) => {
        //         if (this["user_" + loop][i].betarea == row.bet) {
        //           this["user_" + loop][i].alpha = 1;
        //           this["user_" + loop][i].set = true;

        //           let calc = (parseInt(row.bet_amount) / parseInt(row.currencyMultiplier ? row.currencyMultiplier : 1))
        //           row.bet_amount = (calc/parseInt(row.userMultiplier ? row.userMultiplier : 1) * window.currencyMultiplier) * window.userMultiplier

        //           // this["user_" + loop+"_bet"].text = numberWithCommas(row.bet_amount);
        //           this.changeCurrentChips(row.bet_amount, this["user_" + loop][i]);
        //         }
        //       });

        //       let total = _.sumBy(data[x - 1].bets, function (e) {
        //         return e.bet_amount
        //       });

        //       this["user_" + loop+"_bet"].text = numberWithCommas(total);
        //     }
        //   }
        // }
      } // end for
    },
    changeCurrentChips(amount, betArea, sideBet = false) {
      betArea.chips = [];

      //Chip container init and stacking
      let posX = betArea.x + betArea.getBounds().x + betArea.getBounds().width/2;
      let posY = betArea.y + betArea.getBounds().y  + betArea.getBounds().height/2 - 5;

      let avail_chips = [];
      let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

      for (var i = 0; i < chipArr.length; i++) {
        let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
        avail_chips.push({'chip': chipArr[i], 'value': chipVal});
      }

      let count = avail_chips.length-1;
      let chips = [];
      let chipsfrombanker = amount;

      if (sideBet) {
        betArea.total_bet_amt = amount;
      }

      for (var x = avail_chips.length-1; x > -1; x--) {
        if (chipsfrombanker == avail_chips[x].value) {
          chips.push(avail_chips[x]);
          break;
        } // end if
        else if (chipsfrombanker-avail_chips[x].value >= 0){
          chipsfrombanker -= avail_chips[x].value;
          chips.push(avail_chips[x]);
          x++;
        } // end elseif
      } // end for

      let instance = [];
      let instanceTxt = [];
      let chipDataCon = [];
      let chipsToAnimate = [];

      for (var x = 0; x < chips.length; x++) {
        let chip_name = "chip_"+(chips[x].chip);

        this.context.chipsConf.forEach((c) => {
          if(chips[x].chip == c.chipval) {
            chip_name = "chip_"+c.chipName.split("_")[2]
          }
        });

        instance = createSprite(this.context.getResources(chip_name), 80, 80, instance);
        instance.regX = instance.getBounds().width / 2;
        instance.regY = instance.getBounds().height / 2;
        instance.x = 0;
        instance.y = 0;
        instance.gotoAndStop(1);

        chipDataCon = new createjs.Container();
        chipDataCon.x = posX;
        chipDataCon.y = (posY + 4) - (betArea.chips.length * 4);
        chipDataCon.scaleX = chipDataCon.scaleY = 0.7;
        chipDataCon.chip_amt = chips[x].value;
        chipDataCon.addChild(instance);

        //Bet amount text
        let totalBet = amount;
        let instanceAmt = totalBet;

        if (parseInt(totalBet) > 999) {
          totalBet = amount / 1000;
          instanceAmt = totalBet+"k";
        }

        if (parseInt(totalBet) > 999) {
          instanceAmt = totalBet/1000+'M';
        }

        instanceTxt = new createjs.Text(instanceAmt, fontFormat(25, 'normal', 'bebas', false), '#000');
        instanceTxt.textBaseline = 'middle';
        instanceTxt.textAlign = 'center';
        instanceTxt.x = instance.x;
        instanceTxt.y = instance.y - 3;
        instanceTxt.scaleY = 0.7;
        chipDataCon.addChild(instanceTxt);


        if (instanceTxt.text.toString().length > 4) {
          instanceTxt.font = fontFormat(23, 'normal', 'bebas', false);
        }

        if(chipDataCon.x > 900) {
          instanceTxt.skewX = -16
          instanceTxt.rotate = -4
        } else if(chipDataCon.x < 780){
          instanceTxt.skewX = 16
          instanceTxt.rotate = 4
        }

        if(chipDataCon.x > 780 && chipDataCon.x < 1000) {
          instanceTxt.skewX = 0
          instanceTxt.rotate = 0
        }

        betArea.chips.push(chipDataCon);

        if (sideBet) {
          this.side_chips_container.addChild(chipDataCon);
        } else {
          this.chips_container.addChild(chipDataCon);
        }
      } //end for
    },
    toRemovePlayer : [],
    roomEvent (data) {
      if(data.id == window.userId) return;
      if(window.junket != 0) {
        if(data.id ==window.vendorData.bankerId ) return;
      }

      let seat_num = 0;

      if(data.type == 'join') {
        seat_num = this.checkUser(data.data);
        this["user_"+seat_num+"_name"].user_name = data.data.name;
        this["user_"+seat_num+"_name"].user_id = data.data.userId;

        this["user_"+seat_num+"_bet"].text = "0";

        if(data.data.name.split("").length > 3) {
          this["user_" + seat_num + "_name"].text = data.data.name.substr(0,3) + "***";
        } else {
          this["user_" + seat_num + "_name"].text = data.data.name;
        }
      } else if(data.type == "leave") {
        seat_num = this.checkUser(data.data);

        if(_.filter(this["user_"+seat_num], (e) =>{ return e.chips.length}).length) {
          this.toRemovePlayer.push(seat_num)
          return;
        }

        this["user_"+seat_num+"_bet"].text = "";
        this["user_"+seat_num+"_name"].text = "";
        this["user_"+seat_num+"_name"].user_name = "";
        this["user_"+seat_num+"_name"].user_id = null;
      }
    },
    removePlayersOnNewRound() {
      this.toRemovePlayer.forEach((seat_num) => {
        this["user_" + seat_num + "_name"].text = "";

        this["user_"+seat_num+"_name"].user_name = "";
        this["user_"+seat_num+"_name"].user_id = null;

        // === remove money
        this["user_" + seat_num+"_bet"].text = "";
        this["user_"+seat_num+"_name"].total_bet = 0;
      });

      this.toRemovePlayer = []
    },
    checkUser(user) {
      let u_count = 0;
      let u_count2 = 0;

      let id = null;
      let users_area = this.toSet;

      if('id' in user) {
        id = user.id
      } else {
        id = user.userId
      }

      for(var x = 0; x < users_area.length; x++) {
        if(this[`${users_area[x]}_name`].user_id == id) {
          return users_area[x].split('_')[1];
        }
      }


      for(var x = 0; x < users_area.length; x++) {
        if(!this[`${users_area[x]}_name`].user_id || !('user_id' in this[`${users_area[x]}_name`]) ){
          this[`${users_area[x]}_name`].user_name = user.name;
          this[`${users_area[x]}_name`].user_id = id;
          return users_area[x].split('_')[1];
        }
      }

      // for(var e = 0; e < 8; e++) {
      //   u_count ++;

      //   if(u_count!=4 && u_count!=5) {
      //     if(this["user_"+u_count+"_name"].user_id == id) {
      //       return u_count;
      //     }
      //   }
      // }

      // for(var e = 0; e < 8; e++) {
      //   u_count2 ++;

      //   if(u_count2!=4 && u_count2!=5) {

      //     if(!this["user_"+u_count2+"_name"].user_id || !('user_id' in this["user_"+u_count2+"_name"]) ){
      //       this["user_"+u_count2+"_name"].user_name = user.name;
      //       this["user_"+u_count2+"_name"].user_id = id;
      //       return u_count2;
      //     }
      //   }
      // }
    },
    makeTableDraw () {
			return this.context.component_tableOutline.multiClassic();
	 	},
    cancelBet (data) {
      if(window.junket == '' || !window.junket) {
        if(data.data[0].range != window.range) return;
      }

      if (this.context.junketAgent) {
        for (var i = 0; i < this.multiBets.length; i++) {
          _.remove(this.multiBets, function(n) {
            return n.id == data.id;
          });
        }

        this.setSideBet('', true);
      }

      let seat_num = this.checkUser(data.data[0]);

      this["user_" + seat_num+"_bet"].text = 0;
      this["user_"+seat_num+"_name"].total_bet = 0;

      this["user_"+seat_num].forEach((e) => {
        e.alpha = 0.1;
        e.chips.forEach((chip)=> {
          this.chips_container.removeChild(chip);
        });
        setTimeout(() => {
          e.chips = [];
        }, 500)
      })

    },
    setMultiplayer (data) {
      let u_count = 0;

      if(data.id == window.userId) return;
      let seat_num = 0;
      let bet_amt = 0;

      data = _.cloneDeep(data)
      seat_num = this.checkUser(data.data[0]);
      this["user_"+seat_num+"_name"].total_bet = 0;

      for(var i = 0; i < data.data.length; i++ ) {
        if (this.context.junketAgent) {
          if (!(data.data[i].bet == 'dragon' || data.data[i].bet == 'tiger' || data.data[i].bet == 'tie' || data.data[i].bet == 'suited_tie')) {
            this.setSideBet(_.cloneDeep(data));
          }
        }

        // seat_num = this.checkUser(data.data[i].name);
        // if(data.data[i].currency == "N" && window.casino == "SS") {
        // 	data.data[i].bet_amount = parseInt(data.data[i].bet_amount)/1000

        // } else if(data.data[i].currency == "SS" && window.casino == "N") {
        // 	data.data[i].bet_amount = parseInt(data.data[i].bet_amount)*1000
        // }

        let calc = (parseInt(data.data[i].bet_amount) / parseInt(data.data[i].currencyMultiplier ? data.data[i].currencyMultiplier : 1))
        data.data[i].bet_amount = (calc/parseInt(data.data[i].userMultiplier ? data.data[i].userMultiplier : 1) * window.currencyMultiplier) * window.userMultiplier

        for(var x = 0; x < this["user_"+seat_num].length;x++) {
          if(this["user_"+seat_num][x].betarea == data.data[i].bet) {
            this["user_"+seat_num][x].alpha = 1
            this["user_"+seat_num+"_name"].total_bet += parseInt(data.data[i].bet_amount)

            this["user_"+seat_num][x].chips.forEach((chip) =>{
              this.chips_container.removeChild(chip)
            });

            this["user_"+seat_num][x].chips = [];

            this.changeCurrentChips(data.data[i].bet_amount, this["user_"+seat_num][x])
            // this["user_"+seat_num+"_name"].text = "user_id_"+data.id;
            if(data.data[i].name.split("").length > 3) {
              this["user_" + seat_num + "_name"].text = data.data[i].name.substr(0,3) + "***";
            } else {
              this["user_" + seat_num + "_name"].text = data.data[i].name;
            }

            this["user_"+seat_num+"_bet"].text = numberWithCommas(this["user_"+seat_num+"_name"].total_bet);
          }
        }
        bet_amt = 0;
      }
    },
    setSideBet(data, isCancel = false) {
      let checkUser = false;
      let currBet = [];

      for (var i = 0; i < this.sideBetArr.length; i++) {
        if (!data.data) break;

        for (var x = 0; x < data.data.length; x++) {
          if (this.sideBetArr[i] == data.data[x].bet) {
            currBet.push(data.data[x]);
          }
        }
      }

      data = {id: data.id, data: currBet};

      for (var i = 0; i < this.multiBets.length; i++) {
        if (data.id == this.multiBets[i].id && !isCancel) {
          checkUser = true;
          this.multiBets[i] = data;
        }

        for (var x = 0; x < this.multiBets[i].data.length; x++) {
          this[this.multiBets[i].data[x].bet].total_bet_amt = 0;
        }
      }

      if (!checkUser && !isCancel) {
        this.multiBets.push(data);
      }

      if (!this.multiBets.length && isCancel) {
        this.resetSideBets();
        return;
      }

      this.multiBets = _.uniqBy(this.multiBets, function (e) { return e.id; });
      
      for (var i = 0; i < this.multiBets.length; i++) {
        for (var x = 0; x < this.multiBets[i].data.length; x++) {
          let calc = (parseInt(this.multiBets[i].data[x].bet_amount) / parseInt(this.multiBets[i].data[x].currencyMultiplier ? this.multiBets[i].data[x].currencyMultiplier : 1))
          this.multiBets[i].data[x].bet_amount = (calc/parseInt(this.multiBets[i].data[x].userMultiplier ? this.multiBets[i].data[x].userMultiplier : 1) * window.currencyMultiplier) * window.userMultiplier;
          let totalBet = this.multiBets[i].data[x].bet_amount;

          if (this[this.multiBets[i].data[x].bet].total_bet_amt) {
            totalBet += this[this.multiBets[i].data[x].bet].total_bet_amt;
          }
          
          this[this.multiBets[i].data[x].bet].chips.forEach((chip) => {
            this.side_chips_container.removeChild(chip)
          });

          this.changeCurrentChips(totalBet, this[this.multiBets[i].data[x].bet], true);
        }
      }
    },
    setSideWin(data) {
      let winArea = [];
      let loseArea = [];

      for (var i = 0; i < data.length; i++) {
        for (var x = 0; x < this.sideBetArr.length; x++) {
          if (data[i] == this.sideBetArr[x]) {
            createjs.Tween.get(this[data[i]], {loop: true})
              .to({
                alpha: 1
              }, 500)
              .to({
                alpha: .4
              }, 500)

            if (this[data[i]].chips.length) {
              winArea.push(this[data[i]]);
              this[data[i]].chips.forEach((e) => {
                e.is_win = true;
              });
            }
          }
        } // end of for loop
      }

      setTimeout(() => {
        for (var i = 0; i < winArea.length; i++) {
          let winAmt = parseInt(winArea[i].total_bet_amt) * parseInt(winArea[i].payout_multiplier);
          this.createWinningChips(winAmt, winArea[i], '', true);
        }
      }, 2500);

      for (var i = 0; i < this.sideBetArr.length; i++) {
        for (var x = 0; x < this[this.sideBetArr[i]].chips.length; x++) {
          if (!this[this.sideBetArr[i]].chips[x].is_win) {
            loseArea.push(this[this.sideBetArr[i]].chips[x]);
          }
        }
      }

      setTimeout(() => {
        this.loseTableChipsAnimation(loseArea);
      }, 1500);
    },
    reset () {
      this.chips_container.removeAllChildren();
      let users_area = this.toSet;

      if (this.context.junketAgent) {
        this.resetSideBets();
      }

      for(var x = 0; x < users_area.length; x++) {
        for(var i = 0; i < this[`${users_area[x]}`].length; i++) {
          this[`${users_area[x]}`][i].chips = [];
          this[`${users_area[x]}`][i].alpha = 0.05;
          this[`${users_area[x]}`][i].set = false;
          // this["user_"+x][i].alpha = 0.01;
          createjs.Tween.removeTweens(this[`${users_area[x]}`][i]);
        }

        if (!this[`${users_area[x]}_bet`]) continue;

        this[`${users_area[x]}_bet`].text = "";

        if(!this[`${users_area[x]}_name`].user_id) {
          this[`${users_area[x]}_bet`].text = "";
        } else {
          this[`${users_area[x]}_bet`].text = "0";
        }

        this[`${users_area[x]}_name`].total_bet = 0;
      }

      // if(flag) {
      //   for(var x = 0; x < users_area.length; x++) {
      //     this[`${users_area[x]}_bet`].text = "";
      //     this[`${users_area[x]}_name`].user_id = 0;
      //     this[`${users_area[x]}_name`].text = "";
      //     this[`${users_area[x]}_name`].total_bet = 0;

      //     for(var  i =0; i < this[`${users_area[x]}`].length; i++) {
      //       this[`${users_area[x]}`][i].chips = [];
      //       this[`${users_area[x]}`][i].alpha = 0.05;
      //       this[`${users_area[x]}`][i].set = false;
      //       // this["user_"+x][i].alpha = 0.01;
      //       createjs.Tween.removeTweens(this[`${users_area[x]}`][i]);
      //     }
      //   }
      // }

      // for(var x = 1; x <=8; x++) {
      //   if(x!=4 && x!=5) {
      //     for(var  i =0; i < this["user_"+x].length; i++) {
      //       this["user_"+x][i].chips = [];
      //       this["user_"+x][i].alpha = 0.1;

      //       createjs.Tween.removeTweens(this["user_"+x][i]);

      //       if(!this["user_" +x+ "_name"].user_id) {
      //         this["user_"+x+"_bet"].text = "";
      //       } else {
      //         this["user_"+x+"_bet"].text = "0";
      //       }
      //       this["user_"+x+"_name"].total_bet = 0;
      //     }
      //   }
      // }
    },
    hardReset() {
      let users = ["user_1","user_2","user_3", "user_6","user_7","user_8"];
      this.chips_container.removeAllChildren();
      if (this.context.junketAgent) {
        this.resetSideBets();
      }

      for(var x = 0; x < users.length; x++) {
        for(var i = 0; i < this[users[x]].length; i++) {
          this[`${users[x]}`][i].chips = [];
          this[`${users[x]}`][i].alpha = 0.05;
          createjs.Tween.removeTweens(this[`${users[x]}`][i]);
        }
        this[`${users[x]}_bet`].text = "";
        this[`${users[x]}_name`].total_bet = 0;
        this[`${users[x]}_name`].user_id = 0;
        this[`${users[x]}_name`].text = "";
      }
    },
    resetSideBets() {
      this.multiBets = [];
      this.side_chips_container.removeAllChildren();
      for (var i = 0; i < this.sideBetArr.length; i++) {
        this[this.sideBetArr[i]].total_bet_amt = 0;
        this[this.sideBetArr[i]].alpha = 0.05;
        this[this.sideBetArr[i]].chips = [];
        createjs.Tween.removeTweens(this[this.sideBetArr[i]]);
      }
    },
    tableWin (winning) {
      let loop = 0;
      let lose_chips_to_animate = [];
      let users_area = this.toSet;

      if (this.context.junketAgent) {
        this.setSideWin(winning);
      }

      this.isTie = winning.some((e) => {
        return e.toLowerCase() == 'tie';
      });

      this.suitedTie = winning.some((e) => {
        return e == 'suited_tie';
      });

      for (var x = 0; x < users_area.length; x++) {
        for (var i = 0; i < this[users_area[x]].length; i++) {
          let betArea = [];
          betArea = this[users_area[x]][i];

          for (var j = 0; j < winning.length; j++) {
            if(this.isTie || this.suitedTie) {
              if (betArea.betarea == 'dragon' || betArea.betarea == 'tiger') {
                betArea.chips.forEach((e) => {
                  e.is_win = true;
                });
              }
            }

            if (betArea.betarea == winning[j]) {
              createjs.Tween.get(betArea, {loop: true})
              .to({
                alpha: 1
              }, 500)
              .to({
                alpha: .4
              }, 500)

              betArea.chips.forEach((e) => {
                e.is_win = true;
              });
            } //end of checking if table win
          } //end of  bet area loop

          if (betArea.chips.length) {
            betArea.chips.forEach((e) => {
              if (!e.is_win) {
                // if (this.isTie || this.suitedTie) {
                //   if (betArea.betarea == 'dragon' || betArea.betarea == 'tiger') {
                //     this.setWinChips([betArea.betarea]);
                //     return;
                //   }
                // }
                lose_chips_to_animate.push(e);
              }
            });
          } // end if

          if (this.isTie || this.suitedTie) {
            if (betArea.betarea == 'dragon' || betArea.betarea == 'tiger') {
              // this.createTieChip(betArea, 'win');
              // this.createTieChip(betArea, 'lose');
              betArea.chips.forEach((e) => {
                e.lose = true;
              });

              // betArea.chips.forEach((e) => {
              //   if (e.tiePayout && e.animate == 'lose') {
              //     lose_chips_to_animate.push(e);
              //   }
              //   else {
              //     if (e.animate == 'win') {
              //       createjs.Tween.get(e)
              //         .wait(3700)
              //         .to({
              //         alpha: 0,
              //         x: userName.x + 60,
              //         y: userName.y
              //         }, 1200, createjs.Ease.quadOut)

              //       return;
              //     }
              //     e.visible = false;
              //   }
              // });
            }
          } //end of tie condition
        }
      }

      setTimeout(() => {
        this.loseTableChipsAnimation(lose_chips_to_animate);
      }, 1500);

      setTimeout(() => {
        this.setWinChips(winning);
      }, 3700);
    },
    createTieChip(betArea, type) {
      let chips = [];
      let totalBet = 0;

      betArea.chips.forEach((e) => {
        if (!e.tiePayout) totalBet += e.chip_amt;
      });

      //Chip container init and stacking
      let posX = betArea.x + 90;
      let posY = betArea.y + 16;

      let winnings = totalBet / 2;
      let chipsfrombanker = winnings;
      let avail_chips = [];
      let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

      for (var i = 0; i < chipArr.length; i++) {
        let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
        avail_chips.push({'chip': chipArr[i], 'value': chipVal});
      }

      for (var x = avail_chips.length-1; x > -1; x--) {
        if (chipsfrombanker == avail_chips[x].value) {
          chips.push(avail_chips[x]);
          break;
        } // end if
        else if (chipsfrombanker-avail_chips[x].value >= 0){
          chipsfrombanker -= avail_chips[x].value;
          chips.push(avail_chips[x]);
          x++;
        } // end elseif
      } // end for

      let instance = null;
      let instanceTxt = null;
      // let instanceMask = null;
      let chipDataCon = null;
      let chipsToAnimate = [];

      for (var x = 0; x < chips.length; x++) {
        let chip_name = "chip_"+(chips[x].chip);

        this.context.chipsConf.forEach((c) => {
          if(chips[x].chip == c.chipval) {
            chip_name = "chip_"+c.chipName.split("_")[2]
          }
        });

        instance = createSprite(this.context.getResources(chip_name), 80, 80, instance);
        instance.regX = instance.getBounds().width / 2;
        instance.regY = instance.getBounds().height / 2;
        instance.x = 0;
        instance.y = 0;
        instance.gotoAndStop(1);

        chipDataCon = new createjs.Container();
        chipDataCon.x = posX;
        chipDataCon.y = (posY + 4) - (betArea.chips.length * 4);
        chipDataCon.animate = type;
        chipDataCon.tiePayout = true;
        chipDataCon.scaleX = chipDataCon.scaleY = 0.7;
        chipDataCon.chip_amt = chips[x].value;
        chipDataCon.addChild(instance);

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

        instanceTxt = new createjs.Text(instanceAmt, fontFormat(25, 'normal', 'bebas', false), '#000');
        instanceTxt.textBaseline = 'middle';
        instanceTxt.textAlign = 'center';
        instanceTxt.x = instance.x;
        instanceTxt.y = instance.y;
        instanceTxt.scaleY = 0.7;
        chipDataCon.addChild(instanceTxt);

        // Chip adjustment
        let table = betArea.table_name;
        if (table == 'tiger') {
          instanceTxt.skewX = -10;
        }
        else if (table == 'dragon') {
          instanceTxt.skewX = 10;
        }

        betArea.tiePayout = true;
        betArea.animate = type;
        betArea.chips.push(chipDataCon);
        this.chips_container.addChild(chipDataCon);
      } //end for
    },
    setWinChips(winning) {
      let loop = 0;
      let users_area = this.toSet;

      if(this.isTie || this.suitedTie) {
        winning.push('tiger');
        winning.push('dragon');
      }

      for (var x = 0; x < users_area.length; x++) {
        for (var i = 0; i < this[users_area[x]].length; i++) {
          let betArea = this[users_area[x]][i];
          let userName = this[users_area[x]+"_name"];

          for (var j = 0; j < winning.length; j++) {
            if (betArea.betarea == winning[j]) {
              if (betArea.chips.length) {
                let totalBet = 0;
                betArea.chips.forEach((e) => {
                  totalBet += e.chip_amt;
                });

                let winningAmt = totalBet * betArea.payout_multiplier;
                if(this.isTie || this.suitedTie) {
                  if(betArea.betarea === 'dragon' || betArea.betarea === 'tiger') {
                    this.createWinningChips(winningAmt/2, betArea, userName);
                  } else {
                    this.createWinningChips(winningAmt, betArea, userName);
                  }
                } else {
                  this.createWinningChips(winningAmt, betArea, userName);
                }
              }

              break;
            } //end of checking bet area win
          } //end of  bet area loop
        }
      }
    },
    loseTableChipsAnimation(chips) {
      let posX = (this.context.stage.baseWidth / 2);
      let posY = (this.context.stage.baseHeight / 2) - 100;

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
    createWinningChips(winAmount, betArea, userName, sideBet = false) {
      // if (this.isTie || this.suitedTie) {
      //   if (betArea.betarea == 'dragon' || betArea.betarea == 'tiger') {
      //     return;
      //   }
      // }
      //Chip container init and stacking
      let posX = betArea.x + 40;
      let posY = betArea.y + 10;

      let chips = [];
      let chipsfrombanker = winAmount;

      let avail_chips = [];
      let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

      for (var i = 0; i < chipArr.length; i++) {
        let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
        avail_chips.push({'chip': chipArr[i], 'value': chipVal});
      }

      for (var x = avail_chips.length-1; x > -1; x--) {
        if (chipsfrombanker == avail_chips[x].value) {
          chips.push(avail_chips[x]);
          break;
        } // end if
        else if (chipsfrombanker-avail_chips[x].value >= 0){
          chipsfrombanker -= avail_chips[x].value;
          chips.push(avail_chips[x]);
          x++;
        } // end elseif
      } // end for

      let instance = null;
      let instanceTxt = null;
      let chipDataCon = null;
      let chipsToAnimate = [];

      for (var x = 0; x < chips.length; x++) {
        let chip_name = "chip_"+(chips[x].chip);

        this.context.chipsConf.forEach((c) => {
          if(chips[x].chip == c.chipval) {
            chip_name = "chip_"+c.chipName.split("_")[2]
          }
        });

        instance = createSprite(this.context.getResources(chip_name), 80, 80, instance);
        instance.regX = instance.getBounds().width / 2;
        instance.regY = instance.getBounds().height / 2;
        instance.x = 0;
        instance.y = 0;
        instance.gotoAndStop(1);

        chipDataCon = new createjs.Container();
        chipDataCon.x = posX;
        chipDataCon.y = posY - 120;
        chipDataCon.alpha = 0;
        chipDataCon.scaleX = chipDataCon.scaleY = 0.7;
        chipDataCon.chip_amt = chips[x].value;
        chipDataCon.addChild(instance);

        if (sideBet) {
          chipDataCon.x = posX - 25;

          if (betArea.betarea == 'dragon_even' || betArea.betarea == 'tiger_even') {
            chipDataCon.x = posX - 35;
          }
        }

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

        instanceTxt = new createjs.Text(instanceAmt, fontFormat(25, 'normal', 'bebas', false), '#000');
        instanceTxt.textBaseline = 'middle';
        instanceTxt.textAlign = 'center';
        instanceTxt.x = instance.x;
        instanceTxt.y = instance.y - 3;
        instanceTxt.scaleY = 0.7;
        chipDataCon.addChild(instanceTxt);

        // Chip adjustment
        let table = betArea.table_name;
        if (table == 'tiger') {
          instanceTxt.skewX = -10;
        }
        else if (table == 'dragon') {
          instanceTxt.skewX = 10;
        }

        if(chipDataCon.x > 900) {
          instanceTxt.skewX = -16
          instanceTxt.rotate = -4
        } else if(chipDataCon.x < 780){
          instanceTxt.skewX = 16
          instanceTxt.rotate = 4
        }

        if(chipDataCon.x > 780 && chipDataCon.x < 1000) {
          instanceTxt.skewX = 0
          instanceTxt.rotate = 0
        }

        // if(betArea.x > (this.context.stage.baseWidth/2)) {
        //   instanceTxt.skewX = -16
        //   instanceTxt.rotate = -4
        // } else {
        //   instanceTxt.skewX = 16
        //   instanceTxt.rotate = 4
        // }

        createjs.Tween.get(chipDataCon)
        .wait(x*200)
        .to({
          alpha: 1,
          y: (posY + 4) - (betArea.chips.length * 4)
        }, 120, createjs.Ease.quadOut)

        betArea.chips.push(chipDataCon);
        this.chips_container.addChild(chipDataCon);
      } //end for

      if (!sideBet) {
        setTimeout(() => {
          let animX = userName.x + 60; //(this.context.stage.baseWidth / 2);
          let animY = userName.y; //(this.context.stage.baseHeight / 2) - 100;

          for (var x = 0; x < betArea.chips.length; x++) {
            betArea.chips[x].alpha = 1;
            if(betArea.chips[x].lose !== undefined) {
              createjs.Tween.get(betArea.chips[x])
              // .wait(600)
              .to({
                alpha: 0,
                x: (this.context.stage.baseWidth / 2),
                y: (this.context.stage.baseHeight / 2) - 100
              }, 1200, createjs.Ease.quadOut)
            } else {
              createjs.Tween.get(betArea.chips[x])
              // .wait(600)
              .to({
                alpha: 0,
                x: userName.x + 60,
                y: userName.y
              }, 1200, createjs.Ease.quadOut)
            }
          }//end for
        }, 1400);
      } // end of sidebet if
    }
  });
  return instance;
}
