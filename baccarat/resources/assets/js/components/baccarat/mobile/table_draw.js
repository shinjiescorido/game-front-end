import {getSlaveParam} from '../../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		bet_areas: [],
		main() {
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

							case ('Big - Small'):
		        		let sizeMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
		        		let sizeMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
	       				break;

							case ('Bonus'):
		        		let bonusMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
		        		let bonusMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
	       				break;
	       		}
			}

			let adjustX = 70;
			let adjustY = 45;

			var table_outline = this.drawTableOutline();

			this.default_color = "rgba(255,255,255,0.01)";

			this.bet_areas[0] = new createjs.Shape();
			let adjustY_zh = isDragonBonus() && window.language.locale == 'zh' ? 16 : 0;
			if(isDragonBonus()){
				this.bet_areas[0].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(128,0).lineTo(95,72).bezierCurveTo(35,72,15,100, 10, 124).lineTo(-93,124).lineTo(0,0);
				this.bet_areas[0].x = 365 - adjustX;
				this.bet_areas[0].y = 365 + adjustY + adjustY_zh;
        this.bet_areas[0].setBounds(0,0,0,120);
      } else {
        this.bet_areas[0].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(210,0).lineTo(130,124).lineTo(-140,124).lineTo(0,0);
        this.bet_areas[0].x = 245 - adjustX;
  			this.bet_areas[0].y = 381 + adjustY;
        this.bet_areas[0].setBounds(0,0,200,150);
      }
			this.bet_areas[0].table_name = "playerpair";
			this.bet_areas[0].min_bet = pairMin;
			this.bet_areas[0].max_bet = pairMax;
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
        this.bet_areas[1].setBounds(0,0,140,140);
      } else {
        this.bet_areas[1].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(184,0).lineTo(162,124).lineTo(-80,124).lineTo(0,0);
        this.bet_areas[1].x = 455 - adjustX;
        this.bet_areas[1].y = 381 + adjustY;
        this.bet_areas[1].setBounds(0,0,160,150)
      }
			this.bet_areas[1].table_name = "player";
			this.bet_areas[1].payout_multiplier = 1;
			this.bet_areas[1].min_betAmt = mainAreaMin;
			this.bet_areas[1].max_betAmt = mainAreaMax;

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
			this.bet_areas[2].min_bet = tieMin;
			this.bet_areas[2].max_bet = tieMax;
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
			this.bet_areas[3].min_bet = mainAreaMin;
			this.bet_areas[3].max_bet = mainAreaMax;
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
        this.bet_areas[4].setBounds(0,0,220,120);
      } else {
        this.bet_areas[4].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(200,0).lineTo(350,124).lineTo(82,124).lineTo(0,0);
  			this.bet_areas[4].x = 959 - adjustX;
  			this.bet_areas[4].y = 381 + adjustY;
        this.bet_areas[4].setBounds(0,0,300,150);
      }

			this.bet_areas[4].table_name = "bankerpair";
			this.bet_areas[4].min_bet = pairMin;
			this.bet_areas[4].max_bet = pairMax;
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
			this.bet_areas[5].min_bet = superMin;
			this.bet_areas[5].max_bet = superMax;
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
			/* -------------------------------------------- supersix drawing -------------------------------- */

			/* -------------------------------------------- dragonbonus drawing -------------------------------- */

			this.bet_areas[6] = new createjs.Shape();
      this.bet_areas[6].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(120,0).lineTo(26,124).lineTo(-100,124).lineTo(0,0);
      this.bet_areas[6].x = 247 - adjustX;
      this.bet_areas[6].y = 365 + adjustY + adjustY_zh;
      this.bet_areas[6].setBounds(0,0,0,150);
      this.bet_areas[6].table_name = "big";
      this.bet_areas[6].payout_multiplier = .54;
			this.bet_areas[6].min_bet = sizeMin;
			this.bet_areas[6].max_bet = sizeMax;

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
			this.bet_areas[7].min_bet = sizeMin;
			this.bet_areas[7].max_bet = sizeMax;

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

			this.bet_areas[8].min_bet = bonusMin;
			this.bet_areas[8].max_bet = bonusMax;

			this.bet_areas[9] = new createjs.Shape();
      this.bet_areas[9].graphics.beginFill(this.default_color).drawEllipse(0, 0, 100, 100);

      this.bet_areas[9].skewX = -45;
      this.bet_areas[9].skewY = -15;

      this.bet_areas[9].table_name = "bonus_banker";
			this.bet_areas[9].setBounds(0,0,100,0);
      this.bet_areas[9].dropped_state = (e,x) => {
        if(window.language.locale == "zh") {
          e.graphics.clear().beginFill("#d12f2f").moveTo(-30,45).curveTo(-15, -30, 40, -5).curveTo(85, 20, 60, 78).lineTo(-30,45);
        } else {
          e.graphics.clear().beginFill("#d12f2f").drawEllipse(-5, 5, 100, 100);
        }
        e.alpha = 1
      }

      this.bet_areas[9].x = 885 - adjustX;
      this.bet_areas[9].y = 445 + adjustY + adjustY_zh;
      this.bet_areas[9].normal_state = (e,x) => {
        if(window.language.locale == "zh") {
          this.bet_areas[9].setBounds(0,0,100,0);
          this.bet_areas[9].x = 920 - adjustX;
          this.bet_areas[9].y = 449 + adjustY + adjustY_zh;
          e.graphics.clear().beginFill(this.default_color).moveTo(-30,45).curveTo(-15, -30, 40, -5).curveTo(85, 20, 60, 78).lineTo(-30,45);
        } else {
          this.bet_areas[9].setBounds(0,0,180,0);
          e.graphics.clear().beginFill(this.default_color).drawEllipse(-5, 5, 100, 100);
        }

        e.alpha = 1
			}

      this.bet_areas[9].win_state = (e,x) => {
        e.dropped_state(e,x);
        e.alpha = 1
      }

			this.bet_areas[9].min_bet = bonusMin;
			this.bet_areas[9].max_bet = bonusMax;
			this.bet_areas[9].visible = isDragonBonus();

			/* -------------------------------------------- dragonbonus drawing -------------------------------- */

			for(var x = 0; x < this.bet_areas.length; x++) {
	    		this.bet_areas[x].min_betAmt = this.bet_areas[x].min_bet ? parseInt(this.bet_areas[x].min_bet) : this.bet_areas[x].min_betAmt;
	    		this.bet_areas[x].max_betAmt = this.bet_areas[x].max_bet ? parseInt(this.bet_areas[x].max_bet) : this.bet_areas[x].max_betAmt;
				this.bet_areas[x].chip_anim_toPlay = 2;
				this.bet_areas[x].chip_drop_scale = 0.8;
				this.bet_areas[x].singleplayer = true;
				this.bet_areas[x].multiplayer = false;
				this.bet_areas[x].win_state = this.bet_areas[x].dropped_state;
				table_outline.singleplayer = true;
				if(table_outline) {
					table_outline.hitArea = this.bet_areas[x];
				}
			} //end for

			if(table_outline) {
				this.context.component_betBoard.addChild(table_outline);

				let setchild = setInterval(()=> {
					if (this.context.component_betBoard.bet_areas.length) {
						this.context.component_betBoard.setChildIndex(table_outline,this.context.component_betBoard.children.length-1 );
						clearInterval(setchild);
					}
				},1000)
			} //end if
		},

		drawTableOutline() {
			let table_outline = null;

    	let adjustX = 70;
    	let adjustY = 45; //25;

			if (isSuperSix()) {
				table_outline = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "the_betboard_supersix_zh" : "the_betboard_supersix"));
      } else if(isDragonBonus()) {
        table_outline = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "the_betboard_dragonbonus_zh" : "the_betboard_dragonbonus"));
      } else {
				table_outline = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "bac_betboard_chinese" : "the_betboard"));
	  	}

			// table_outline.scaleX = table_outline.scaleY = 0.47;
			// table_outline.regX =  table_outline.getBounds().width/2;
			// table_outline.regY =  table_outline.getBounds().height/2;
			// table_outline.x = this.context.stage.baseWidth/2 - 52 - adjustX;
			// table_outline.y = this.context.stage.baseHeight/2 - 75 + adjustY;
			// table_outline.alpha = 1;
			
			table_outline.scaleX = table_outline.scaleY = 0.76;
    	table_outline.regX = table_outline.getBounds().width/2;
    	table_outline.regY = table_outline.getBounds().height/2;
    	table_outline.x = this.context.context.width/2 - 72 + adjustX;
    	table_outline.y = this.context.context.height/2 + 83 + adjustY;

			return table_outline;
		},
		redrawChips() {
	    if (parseInt(window.multiplayer)) {
	      this.context.component_firstViewMultiplayer.removeAllChips();
		    this.context.component_betBoard.bet_areas.forEach((e) => {
		        if(e.chips.length) {
	           	_.find(this.context.component_firstViewMultiplayer.bet_areas, (area)=>{
              	if(area.table_name == e.table_name) {
               		area.total_bet_amt = e.total_bet_amt;
                  this.context.component_firstViewMultiplayer.changeCurrentChips(e.total_bet_amt, area, false, true);
              	}
	          	})
						}
		    });
			}
		},
	});

	let isSuperSix = () =>{
		return getSlaveParam('supersix');
  }

  let isDragonBonus = () =>{
		return getSlaveParam('bonus');
  }

	return instance;
}
