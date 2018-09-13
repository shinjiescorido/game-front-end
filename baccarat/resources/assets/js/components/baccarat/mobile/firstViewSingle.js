import {
  createSprite,
  randomNum,
  createCardSprite,
  numberCounter,
  playSound,
  numberWithCommas,
  createSpriteRoadMap,
  getSlaveParam
} from '../../../factories/factories';

let instance = null;

export default (opposite_bet) => {
	instance = instance || new blu.Component({
		bet_areas: [],
		main() {
			this.visible = false;

			let adjustX = 70;
			let adjustY = 45;

			this.default_color = "rgba(255,255,255,0.01)";

			this.bet_areas[0] = new createjs.Shape();
			let adjustY_zh = isDragonBonus() && window.language.locale == 'zh' ? 16 : 0;
      if(isDragonBonus()){
				this.bet_areas[0].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(128,0).lineTo(95,72).bezierCurveTo(35,72,15,100, 10, 124).lineTo(-93,124).lineTo(0,0);
				this.bet_areas[0].x = 365 - adjustX;
				this.bet_areas[0].y = 365 + adjustY + adjustY_zh;
        this.bet_areas[0].setBounds(0,0,0,150);
      } else {
        this.bet_areas[0].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(210,0).lineTo(130,124).lineTo(-140,124).lineTo(0,0);
        this.bet_areas[0].x = 245 - adjustX;
  			this.bet_areas[0].y = 381 + adjustY;
        this.bet_areas[0].setBounds(0,0,120,150);
      }

			this.bet_areas[0].table_name = "playerpair";
			this.bet_areas[0].payout_multiplier = 11;

			this.bet_areas[0].dropped_state = (e,x) => {
        if(isDragonBonus()){
          e.graphics.clear().beginFill("#1565c0").moveTo(0,0).lineTo(128,0).lineTo(95,72).bezierCurveTo(35,72,15,100, 10, 124).lineTo(-93,124).lineTo(0,0);
        } else {
          e.graphics.clear().beginLinearGradientFill(["transparent","#1565c0"],[0,1],0,0,38,35).moveTo(0,0).lineTo(210,0).lineTo(130,124).lineTo(-140,124).lineTo(0,0);
        }
			}

			this.bet_areas[0].normal_state = (e,x) => {
        if(isDragonBonus()){
          e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(128,0).lineTo(95,72).bezierCurveTo(35,72,15,100, 10, 124).lineTo(-93,124).lineTo(0,0);
        } else {
          e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(210,0).lineTo(130,124).lineTo(-140,124).lineTo(0,0);
        }
			}

			this.bet_areas[1] = new createjs.Shape();
      if(isDragonBonus()) {
        this.bet_areas[1].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(140,0).lineTo(120,124).lineTo(-8,124).bezierCurveTo(18,100,0,72,-34, 72).lineTo(0,0);
        this.bet_areas[1].x = 493 - adjustX;
        this.bet_areas[1].y = 365 + adjustY + adjustY_zh;
      } else {
        this.bet_areas[1].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(184,0).lineTo(162,124).lineTo(-80,124).lineTo(0,0);
        this.bet_areas[1].x = 455 - adjustX;
        this.bet_areas[1].y = 381 + adjustY;
      }
			this.bet_areas[1].table_name = "player";
			this.bet_areas[1].setBounds(0,0,120,150);
			this.bet_areas[1].payout_multiplier = 1;

			this.bet_areas[1].dropped_state = (e,x) => {
        if(isDragonBonus()){
          e.graphics.clear().beginFill("#1565c0").moveTo(0,0).lineTo(140,0).lineTo(120,124).lineTo(-8,124).bezierCurveTo(18,100,0,72,-34, 72).lineTo(0,0);
        } else {
          e.graphics.clear().beginFill("#1565c0").moveTo(0,0).lineTo(184,0).lineTo(162,124).lineTo(-80,124).lineTo(0,0);
        }
			}

			this.bet_areas[1].normal_state = (e,x) => {
        if(isDragonBonus()) {
          e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(140,0).lineTo(120,124).lineTo(-8,124).bezierCurveTo(18,100,0,72,-34, 72).lineTo(0,0);
        } else {
          e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(184,0).lineTo(162,124).lineTo(-80,124).lineTo(0,0);
        }

			}

			this.bet_areas[2] = new createjs.Shape();
      if(isDragonBonus()) {
        this.bet_areas[2].x = 632 - adjustX;
        this.bet_areas[2].y = 365 + adjustY + adjustY_zh;
      } else {
        this.bet_areas[2].x = 640 - adjustX;
        this.bet_areas[2].y = 381 + adjustY;
      }
			this.bet_areas[2].table_name = "tie";
			this.bet_areas[2].payout_multiplier = 8;

			if(isSuperSix()){
				this.bet_areas[2].setBounds(0,0,138,40);
				this.bet_areas[2].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(138,0).lineTo(147,50).lineTo(-10,50).lineTo(0,0);
				this.bet_areas[2].dropped_state = (e,x) => {
					e.graphics.clear().beginFill("#689f38").moveTo(0,0).lineTo(138,0).lineTo(147,50).lineTo(-10,50).lineTo(0,0);
				}

				this.bet_areas[2].normal_state = (e,x) => {
					e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(138,0).lineTo(147,50).lineTo(-10,50).lineTo(0,0);
				}

			} else if(isDragonBonus()) {
        this.bet_areas[2].setBounds(0,0,138,150);
        this.bet_areas[2].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(144,0).lineTo(163,124).lineTo(-21,124).lineTo(0,0);
        this.bet_areas[2].dropped_state = (e,x) => {
          e.graphics.clear().beginFill("#689f38").moveTo(0,0).lineTo(144,0).lineTo(163,124).lineTo(-21,124).lineTo(0,0);
        }

        this.bet_areas[2].normal_state = (e,x) => {
          e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(144,0).lineTo(163,124).lineTo(-21,124).lineTo(0,0);
        }
      } else {
				this.bet_areas[2].setBounds(0,0,138,150);
				this.bet_areas[2].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(138,0).lineTo(158,124).lineTo(-23,124).lineTo(0,0);
				this.bet_areas[2].dropped_state = (e,x) => {
					e.graphics.clear().beginFill("#689f38").moveTo(0,0).lineTo(138,0).lineTo(158,124).lineTo(-23,124).lineTo(0,0);
				}

				this.bet_areas[2].normal_state = (e,x) => {
					e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(138,0).lineTo(158,124).lineTo(-23,124).lineTo(0,0);
				}
			}

			this.bet_areas[3] = new createjs.Shape();
      if(isDragonBonus()) {
        this.bet_areas[3].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(141,0).lineTo(175,72).bezierCurveTo(126,76,125,100,145, 124).lineTo(20,124).lineTo(0,0);
        this.bet_areas[3].x = 776 - adjustX;
        this.bet_areas[3].y = 365 + adjustY + adjustY_zh;
        this.bet_areas[3].setBounds(0,0,170,150);
      } else {
        this.bet_areas[3].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(184,0).lineTo(266,124).lineTo(22,124).lineTo(0,0);
        this.bet_areas[3].x = 777 - adjustX;
        this.bet_areas[3].y = 381 + adjustY;
        this.bet_areas[3].setBounds(0,0,250,150);
      }
			this.bet_areas[3].table_name = "banker";
			this.bet_areas[3].payout_multiplier = isSuperSix() ? 1 : 0.95;

			this.bet_areas[3].dropped_state = (e,x) => {
        if(isDragonBonus()) {
          e.graphics.clear().beginFill('#d12f2f').moveTo(0,0).lineTo(141,0).lineTo(175,72).bezierCurveTo(126,76,125,100,145, 124).lineTo(20,124).lineTo(0,0);
        } else {
          e.graphics.clear().beginFill('#d12f2f').moveTo(0,0).lineTo(184,0).lineTo(266,124).lineTo(22,124).lineTo(0,0);
        }
			}

			this.bet_areas[3].normal_state = (e,x) => {
        if(isDragonBonus()) {
          e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(141,0).lineTo(175,72).bezierCurveTo(126,76,125,100,145, 124).lineTo(20,124).lineTo(0,0);
        } else {
          e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(184,0).lineTo(266,124).lineTo(22,124).lineTo(0,0);
        }
			}

			this.bet_areas[4] = new createjs.Shape();
      if(isDragonBonus()) {
        this.bet_areas[4].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(128,0).lineTo(220,124).lineTo(112,124).bezierCurveTo(116,100,80,72,33,72).lineTo(0,0);
        this.bet_areas[4].x = 916 - adjustX;
        this.bet_areas[4].y = 365 + adjustY + adjustY_zh;
        this.bet_areas[4].setBounds(0,0,270,150);
      } else {
        this.bet_areas[4].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(200,0).lineTo(350,124).lineTo(82,124).lineTo(0,0);
  			this.bet_areas[4].x = 959 - adjustX;
  			this.bet_areas[4].y = 381 + adjustY;
        this.bet_areas[4].setBounds(0,0,300,150);
      }
			this.bet_areas[4].table_name = "bankerpair";
			this.bet_areas[4].payout_multiplier = 11;

			this.bet_areas[4].dropped_state = (e,x) => {
        if(isDragonBonus()) {
          e.graphics.clear().beginFill("#d12f2f").moveTo(0,0).lineTo(128,0).lineTo(220,124).lineTo(112,124).bezierCurveTo(116,100,80,72,33,72).lineTo(0,0);
        } else {
          e.graphics.clear().beginLinearGradientFill(["#d12f2f","transparent"],[0,1],190,32,220,0).moveTo(0,0).lineTo(200,0).lineTo(350,124).lineTo(82,124).lineTo(0,0);
        }
			}

			this.bet_areas[4].normal_state = (e,x) => {
        if(isDragonBonus()) {
          e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(128,0).lineTo(220,124).lineTo(112,124).bezierCurveTo(116,100,80,72,33,72).lineTo(0,0);
        } else {
          e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(200,0).lineTo(350,124).lineTo(82,124).lineTo(0,0);
        }
			}

			/* -------------------------------------------- supersix drawing -------------------------------- */
			this.bet_areas[5] = new createjs.Shape();
			this.bet_areas[5].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(156,0).lineTo(169,73).lineTo(-14,73).lineTo(0,0);
			this.bet_areas[5].x = 631 - adjustX;
			this.bet_areas[5].y = 431 + adjustY + adjustY_zh;

			this.bet_areas[5].table_name = "supersix";
			this.bet_areas[5].setBounds(0,0,157,75);
			this.bet_areas[5].payout_multiplier = 12;

			this.bet_areas[5].dropped_state = (e,x) => {
				e.graphics.clear().beginFill("#996515").moveTo(0,0).lineTo(156,0).lineTo(169,73).lineTo(-14,73).lineTo(0,0);
				e.alpha = 1
			}

			this.bet_areas[5].normal_state = (e,x) => {
				e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(156,0).lineTo(169,73).lineTo(-14,73).lineTo(0,0);
				e.alpha = 1
			}

			this.bet_areas[5].win_state = (e,x) => {
				e.dropped_state(e,x);
				e.alpha = 1
			}
			this.bet_areas[5].visible = isSuperSix();

      /* -------------------------------------------- dragonbonus drawing -------------------------------- */

      this.bet_areas[6] = new createjs.Shape();
      this.bet_areas[6].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(120,0).lineTo(26,124).lineTo(-100,124).lineTo(0,0);
      this.bet_areas[6].x = 247 - adjustX;
      this.bet_areas[6].y = 365 + adjustY + adjustY_zh;
      this.bet_areas[6].setBounds(0,0,0,150);
      this.bet_areas[6].table_name = "big";
      this.bet_areas[6].payout_multiplier = .54;

      this.bet_areas[6].dropped_state = (e,x) => {
        e.graphics.clear().beginLinearGradientFill(["transparent","#996515"],[0,1],0,0,38,35).moveTo(0,0).lineTo(120,0).lineTo(26,124).lineTo(-100,124).lineTo(0,0);
        e.alpha = 1
      }
      this.bet_areas[6].normal_state = (e,x) => {
        e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(120,0).lineTo(26,124).lineTo(-120,124).lineTo(0,0);
        e.alpha = 1
      }

      this.bet_areas[6].win_state = (e,x) => {
        e.dropped_state(e,x);
        e.alpha = 1
			}

      this.bet_areas[6].visible = isDragonBonus();

      this.bet_areas[7] = new createjs.Shape();
      this.bet_areas[7].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(117,0).lineTo(230,124).lineTo(93,124).lineTo(0,0);
      this.bet_areas[7].x = 1044 - adjustX;
      this.bet_areas[7].y = 365 + adjustY + adjustY_zh;
      this.bet_areas[7].setBounds(0,0,230,150);
      this.bet_areas[7].table_name = "small";
      this.bet_areas[7].payout_multiplier = 1.5;

      this.bet_areas[7].dropped_state = (e,x) => {
        e.graphics.clear().beginLinearGradientFill(["#996515","transparent"],[0,1],100,35,150,0).moveTo(0,0).lineTo(117,0).lineTo(230,124).lineTo(93,124).lineTo(0,0);
        e.alpha = 1
      }
      this.bet_areas[7].normal_state = (e,x) => {
        e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(117,0).lineTo(230,124).lineTo(93,124).lineTo(0,0);
        e.alpha = 1
			}

      this.bet_areas[7].win_state = (e,x) => {
        e.dropped_state(e,x);
        e.alpha = 1
      }
      this.bet_areas[7].visible = isDragonBonus();

      this.bet_areas[8] = new createjs.Shape();
      this.bet_areas[8].graphics.beginFill(this.default_color).drawEllipse(15, 0, 100, 100);
      this.bet_areas[8].skewX = 45;
      this.bet_areas[8].skewY = 15;

      this.bet_areas[8].table_name = "bonus_player";
      this.bet_areas[8].dropped_state = (e,x) => {
        if(window.language.locale == "zh") {
          e.graphics.clear().beginFill("#1565c0").moveTo(30,45).curveTo(5, -30, 60, -45).curveTo(110, -50, 125, 10).lineTo(30,45);
        } else {
          e.graphics.clear().beginFill("#1565c0").drawEllipse(15, 0, 100, 100);
        }
        e.alpha = 1
			}

			if(window.language.locale == "zh")
			{
        this.bet_areas[8].setBounds(0,0,130,0);
				this.bet_areas[8].x = 375 - adjustX;
				this.bet_areas[8].y = 449 + adjustY + adjustY_zh;

				this.bet_areas[8].normal_state = (e,x) => {
          // e.graphics.clear().beginFill("red").moveTo(50,50).curveTo(-33, -70, 30, -85).curveTo(100, -80, 88, -33).lineTo(50,50);
          e.graphics.clear().beginFill(this.default_color).moveTo(30,45).curveTo(5, -30, 60, -45).curveTo(110, -50, 125, 10).lineTo(30,45);
					e.alpha = 1
				}
			}
			else
			{
        this.bet_areas[8].setBounds(0,0,0,110);
				this.bet_areas[8].x = 404 - adjustX;
				this.bet_areas[8].y = 426 + adjustY + adjustY_zh;

				this.bet_areas[8].normal_state = (e,x) => {
					e.graphics.clear().beginFill(this.default_color).drawEllipse(15, 0, 100, 100);
					e.alpha = 1
				}
			}

      this.bet_areas[8].win_state = (e,x) => {
        e.dropped_state(e,x);
        e.alpha = 1
			}

      this.bet_areas[8].visible = isDragonBonus();

      this.bet_areas[9] = new createjs.Shape();
      this.bet_areas[9].graphics.beginFill(this.default_color).drawEllipse(0, 0, 100, 100);

      this.bet_areas[9].skewX = -45;
      this.bet_areas[9].skewY = -15;

      this.bet_areas[9].table_name = "bonus_banker";
      this.bet_areas[9].dropped_state = (e,x) => {
        if(window.language.locale == "zh") {
          e.graphics.clear().beginFill("#d12f2f").moveTo(-30,45).curveTo(-15, -30, 40, -5).curveTo(85, 20, 60, 78).lineTo(-30,45);
        } else {
          e.graphics.clear().beginFill("#d12f2f").drawEllipse(-5, 5, 100, 100);
        }
        e.alpha = 1
      }

      this.bet_areas[9].normal_state = (e,x) => {
        if(window.language.locale == "zh") {
          this.bet_areas[9].setBounds(0,0,100,0);
          this.bet_areas[9].x = 920 - adjustX;
          this.bet_areas[9].y = 449 + adjustY + adjustY_zh;

          // e.graphics.clear().beginFill("red").moveTo(0,0).curveTo(10, -70, 70, -50).curveTo(115, -40, 95, 35).lineTo(0,0);
          e.graphics.clear().beginFill(this.default_color).moveTo(-30,45).curveTo(-15, -30, 40, -5).curveTo(85, 20, 60, 78).lineTo(-30,45);
        } else {
          this.bet_areas[9].setBounds(0,0,180,0);
          this.bet_areas[9].x = 885 - adjustX;
          this.bet_areas[9].y = 445 + adjustY + adjustY_zh;

          e.graphics.clear().beginFill(this.default_color).drawEllipse(-5, 5, 100, 100);
        }
        e.alpha = 1
			}

      this.bet_areas[9].win_state = (e,x) => {
        e.dropped_state(e,x);
        e.alpha = 1
      }
			this.bet_areas[9].visible = isDragonBonus();


      /* -------------------------------------------- dragonbonus drawing -------------------------------- */

			/* -------------------------------------------- supersix drawing -------------------------------- */

			for(var x = 0; x < this.bet_areas.length; x++) {
				this.addChild(this.bet_areas[x]);

				this.bet_areas[x].chips = [];
				this.bet_areas[x].chip_anim_toPlay = 2;
				this.bet_areas[x].chip_drop_scale = 1;
				this.bet_areas[x].singleplayer = true;
				this.bet_areas[x].multiplayer = false;
				this.bet_areas[x].win_state = this.bet_areas[x].dropped_state;
			} //end for

			// Draw table img
			this.drawTableOutline();

			// Create chips container
			this.chips_container = new createjs.Container();
			this.addChild(this.chips_container);
		},
	    drawTableOutline() {
	      	let default_color = "rgba(0,0,0,0.01)";
	      	let adjustX = 70;
	      	let adjustY = 45; //25;

	  //     	if(window.tableNum == 2 || window.tableNum == 1) {
			// 	adjustY = 44;
			// }
	  //     	else if(window.tableNum == 3 || window.tableNum == 4) {
			// 	adjustY = 45;
			// }
	  //     	else if(window.tableNum == 8 || window.tableNum == 9) {
			// 	adjustY = 45;
			// }
	  //     	else if(window.tableNum == 10) {
			// 	adjustY = 45;
			// }

	      // if (window.tableNum == 3 || window.tableNum == 5 || window.tableNum == 8 || window.tableNum == 7) {
	      //   adjustX = 71;
	      // }
	      // else if (window.tableNum == 4) {
	      //   adjustX = 70;
	      // }
	      // else if(window.tableNum == 6 || window.tableNum == 10) {
	      //   adjustX = 70;
	      // }
	      // else if(window.tableNum == 9 || window.tableNum == 2 || window.tableNum == 1) {
	      //   adjustX = 70;
	      // }

		  	let table_img = null;

		  	if (isSuperSix()) {
				table_img = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "the_betboard_supersix_zh" : "the_betboard_supersix"));
      } else if(isDragonBonus()) {
        table_img = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "the_betboard_dragonbonus_zh" : "the_betboard_dragonbonus"));
      }
		  	else {
				table_img = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "bac_betboard_chinese" : "the_betboard"));
		  	}

	      	table_img.scaleX = table_img.scaleY = 0.76;
	      	table_img.regX = table_img.getBounds().width/2;
	      	table_img.regY = table_img.getBounds().height/2;
	      	table_img.x = this.context.context.width/2 - 72 + adjustX;
	      	table_img.y = this.context.context.height/2 + 83 + adjustY;
					table_img.multiplayer = true

	      	this.addChild(table_img);
	    },
		changeCurrentChips(amount,betArea) {
	      	let avail_chips = [];
      let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});

				if(!isSuperSix() && betArea.betarea != "supersix") {
					avail_chips.push({'chip': chipArr[i], 'value': chipVal});
				}
			}

	      	//Chip container init and stacking
	      	let posX = betArea.x + (betArea.getTransformedBounds().width / 2);
		    let posY = betArea.y + ((betArea.getTransformedBounds().height / 2) - 5);

			let count = avail_chips.length-1;
			let chips = [];
	      	let chipsfrombanker = amount;

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

			let instance = [];
	      	let instanceTxt = [];
	      	let instanceMask = [];
	      	let chipDataCon = [];
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
		        instance.gotoAndStop(2);

		        chipDataCon = new createjs.Container();
		        chipDataCon.x = posX;
		        chipDataCon.y = (posY + 4) - (betArea.chips.length * 4);
		        chipDataCon.scaleX = chipDataCon.scaleY = 0.6;
		        chipDataCon.chip_amt = chips[x].value;

		        chipDataCon.addChild(instance);

		        instanceMask = new createjs.Shape();
		        instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 18);
		        instanceMask.x = instance.x;
		        instanceMask.y = instance.y;
		        chipDataCon.addChild(instanceMask);

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

		        switch(betArea.table_name) {
			      	case "banker":
				       instanceTxt.skewX = -15;
				       instanceTxt.skewY = -2;
				       break;

			      	case "bankerpair":
				       instanceTxt.skewX = -20;
				       instanceTxt.skewY = -5;
				       break;

			      	case "player":
				       instanceTxt.skewX = 15;
				       instanceTxt.skewY = 2;
				       break;

			      	case "playerpair":
				       instanceTxt.skewX = 20;
				       instanceTxt.skewY = 5;
				       break;
			    }

		        instanceTxt = new createjs.Text(instanceAmt, 'normal 25px BebasNeue', '#000');
		        instanceTxt.textBaseline = 'middle';
		        instanceTxt.textAlign = 'center';
		        instanceTxt.x = instance.x;
		        instanceTxt.y = instance.y;
		        chipDataCon.addChild(instanceTxt);

		        instanceTxt.scaleY = 0.6;
		        instanceMask.scaleY = 0.6;

		        if (instanceTxt.text.toString().length > 4) {
		          instanceTxt.font = 'normal 21px BebasNeue';
		        }

				betArea.chips.push(chipDataCon);
				betArea.dropped_state(betArea);
				this.chips_container.addChild(chipDataCon);
			} //end for
		},
		newRound() {
			this.chips_container.removeAllChildren();

			for(var x = 0; x < this.bet_areas.length; x++) {
				this.bet_areas[x].normal_state(this.bet_areas[x]);
				this.bet_areas[x].win = false;
				this.bet_areas[x].total_bet_amt = 0;

				if(this.bet_areas[x].graphics) {
            		this.bet_areas[x].normal_state(this.bet_areas[x],x);
		        } else {
		            this.bet_areas[x].gotoAndStop(0);
		        }

	        	this.bet_areas[x].alpha = 1;
	        	createjs.Tween.removeTweens(this.bet_areas[x]);
			}
		},
		removeAllChips() {
			this.bet_areas.forEach((e) => {
				e.normal_state(e)
				e.total_bet_amt = 0;
				e.chips = [];
			})

			this.chips_container.removeAllChildren();
		},
		tableWinning(winning) {
			let lose_chips_to_animate = [];

			this.isTie = winning.some((e) => {
			  return e == 'tie';
			});

			for (var i = 0; i < this.bet_areas.length; i++) {
			  	for (var x = 0; x < winning.length; x++) {
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
						  	e.is_win = true;
						});
				  	}
			  	} //end of bet area loop

			  	if (this.bet_areas[i].chips.length) {
					this.bet_areas[i].chips.forEach((e) => {
					  	if (!e.is_win) {
							if (this.isTie) {
							  	if (this.bet_areas[i].table_name == 'player' || this.bet_areas[i].table_name == 'banker') {
									return
							  	}
							}

							lose_chips_to_animate.push(e);
					  	}
					});
			  	}
			} //end of for loop winning length

			setTimeout(() => {
			  this.loseTableChipsAnimation(lose_chips_to_animate);
			}, 2000);

			setTimeout(() => {
			  this.setWinChips(winning);
			}, 4000);
		}, // end of tableWinning
		tableWin (winning) {
			let loop = 0;
			let lose_chips_to_animate = [];

      		this.isTie = winning.some((e) => {
        		return e == 'tie';
      		});

			for (var x = 0; x < 6; x++) {
				loop++;

			    for (var i = 0; i < this["user_" + (loop > 3 ? (loop + 2) : loop)].length; i++) {
				    let betArea = [];

			    	if (loop > 3) {
			    		betArea = this["user_" + (loop + 2)][i];
				    }
				    else {
			    		betArea = this["user_" + (loop)][i];
				    }

					for (var j = 0; j < winning.length; j++) {
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
				              	if (this.isTie) {
				                	if (betArea.betarea == 'player' || betArea.betarea == 'banker' || betArea.betarea == 'tie') {
				                  	return;
				                	}
				              	}

			            		lose_chips_to_animate.push(e);
						    }
				        });
		      		} // end if
			    }
			}

			setTimeout(() => {
        		this.loseTableChipsAnimation(lose_chips_to_animate);
      		}, 2000);

     	 	setTimeout(() => {
        		this.setWinChips(winning);
      		}, 4000);
		},
	    setWinChips(winning) {
	      	let win_chips_to_animate = [];
					let winningChips = [];

	       	for (var i = 0; i < this.bet_areas.length; i++) {
		        for (var x = 0; x < winning.length; x++) {
		            if (this.bet_areas[i].table_name == winning[x]) {
		              	if (this.bet_areas[i].chips) {
											let winningAmt = this.setWinAmt(this.bet_areas[i]);
			                winningChips = this.createWinningChips(parseInt(winningAmt), this.bet_areas[i]);
		              	}

		              	this.bet_areas[i].chips.forEach((e) => {
		               	 	win_chips_to_animate.push(e);
		              	});
		            }

		            if (this.isTie) {
		              	this.bet_areas[i].chips.forEach((e) => {
			                if (this.bet_areas[i].table_name == 'player' || this.bet_areas[i].table_name == 'banker') {
			                  	win_chips_to_animate.push(e);
			                }
		              	});
		            } //end of check if tie
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
		loseTableChipsAnimation(chips) {
	      	// let posX = (this.context.stage.baseWidth / 2) - 100;
	      	// let posY = (this.context.stage.baseHeight / 2) - 100;

	      	// for (var x = 0; x < chips.length; x++) {
	       //  	createjs.Tween.get(chips[x], {override: true})
	       //    		.wait(1500)
	       //    		.to({
	       //      		alpha: 0,
	       //      		x: posX,
	       //      		y: posY
	       //    	}, 1200, createjs.Ease.quadOut)
	      	// }

	      	let posX = this.context.stage.baseWidth / 2;
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
	    createWinningChips(amount, betArea) {
	      	if (this.isTie) {
	        	if (betArea.table_name == 'player' || betArea.table_name == 'banker') {
	          		return;
	        	}
	      	}

	      	let avail_chips = [];
			let chipArr = [1,3,5,10,30,50,100,200,300,500,1000];

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
			}

	      	let chips = [];
	      	let winnings = parseInt(amount * betArea.payout_multiplier);
	      	let chipsfrombanker = winnings;

	     	//Chip container init and stacking
		    let posX = betArea.x + (betArea.getTransformedBounds().width/2);
		    let posY = betArea.y + (betArea.getTransformedBounds().height/2);

		    if (betArea.table_name == "playerpair" || betArea.table_name == "bankerpair") {
		        posX -= 35;
		    }
		    else {
		        posX -= 65;
		    }

		    if (isSuperSix()) {
		        posY += 5;
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

		        instance = createSprite(this.context.getResources(chip_name), 72, 72, instance);
		        instance.regX = instance.getBounds().width / 2;
		        instance.regY = instance.getBounds().height / 2;
		        instance.x = 0;
		        instance.y = 0;
		        instance.gotoAndStop(2);

		        chipDataCon = new createjs.Container();
		        chipDataCon.x = posX;
		        chipDataCon.y = posY - 120;
		        chipDataCon.alpha = 0;
		        chipDataCon.scaleX = chipDataCon.scaleY = 0.6;
		        chipDataCon.chip_amt = chips[x].value;

		        chipDataCon.addChild(instance);

		        instanceMask = new createjs.Shape();
		        instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 18);
		        instanceMask.x = instance.x;
		        instanceMask.y = instance.y;
		        chipDataCon.addChild(instanceMask);

		        //Bet amount text
	          	let totalBet = winnings;
		        let instanceAmt = totalBet;

            if (parseInt(totalBet) > 999) {
                totalBet = winnings / 1000;
                instanceAmt = totalBet+"K";
            }

            if (parseInt(totalBet) > 999) {
                instanceAmt = totalBet/1000+'M';
            }
            
		        instanceTxt = new createjs.Text(instanceAmt, 'normal 25px BebasNeue', '#000');
		        instanceTxt.textBaseline = 'middle';
		        instanceTxt.textAlign = 'center';
		        instanceTxt.x = instance.x;
		        instanceTxt.y = instance.y;
		        chipDataCon.addChild(instanceTxt);

		        instanceTxt.scaleY = 0.6;
		        instanceMask.scaleY = 0.6;

		        if (instanceTxt.text.toString().length > 4) {
		          	instanceTxt.font = 'normal 21px BebasNeue';
		        }

		        instanceTxt.scaleY = 0.7;
		        instanceMask.scaleY = 0.7;

		        switch(betArea.table_name) {
		            case "bankerpair":
		                instanceTxt.skewX = -15;
		                instanceTxt.skewY = 1;
		                break;

		            case "playerpair":
		                instanceTxt.skewX = 15;
		                instanceTxt.skewY = -1;
		                break;
		        }

		        createjs.Tween.get(chipDataCon)
		          	.wait(x*200)
		          	.to({
		            	alpha: 1,
		            	y: (posY + 4) - (betArea.chips.length * 4)
		          	}, 120, createjs.Ease.quadOut)

				betArea.chips.push(chipDataCon);
				this.chips_container.addChild(chipDataCon);
	      	} //end for
	    }
	});

  let isSuperSix = () =>{
	return getSlaveParam('supersix');
  }

  let isDragonBonus = () =>{
    return getSlaveParam('bonus');
  }
	return instance;
}
