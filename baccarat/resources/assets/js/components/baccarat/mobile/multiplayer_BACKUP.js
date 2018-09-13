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
		opposites: null,
		user_1 : [],
		user_2 : [],
		user_3 : [],
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

			this.visible = false;
			let default_color = "rgba(0,0,0,0.01)";
			let adjustX = 0;
			let adjustY = isDragonBonus() ? -5 : 0;
			let table_img = this.drawTableOutline();

			this.context.component_betBoard.bet_areas[9+1] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[9+1].graphics.beginFill(default_color).drawRect(0,0,216,474)
			this.context.component_betBoard.bet_areas[9+1].x = 260 - adjustX;
			this.context.component_betBoard.bet_areas[9+1].y = 50 + adjustY;
			this.context.component_betBoard.bet_areas[9+1].table_name = "player";
			this.context.component_betBoard.bet_areas[9+1].setBounds(0,0,216,474);
			this.context.component_betBoard.bet_areas[9+1].min_betAmt = mainAreaMin;
			this.context.component_betBoard.bet_areas[9+1].max_betAmt = mainAreaMax;
			this.context.component_betBoard.bet_areas[9+1].payout_multiplier = 1;

			this.context.component_betBoard.bet_areas[9+1].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0,0,216,474)
			}

			this.context.component_betBoard.bet_areas[9+1].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[9+1].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).drawRect(0,0,216,474)
			}	

			this.context.component_betBoard.bet_areas[10+1] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[10+1].graphics.beginFill(default_color).drawRect(0,0,220,474);
			this.context.component_betBoard.bet_areas[10+1].x = this.context.component_betBoard.bet_areas[9+1].x + this.context.component_betBoard.bet_areas[9+1].getBounds().width;
			this.context.component_betBoard.bet_areas[10+1].y = this.context.component_betBoard.bet_areas[9+1].y;
			this.context.component_betBoard.bet_areas[10+1].table_name = "tie";
			this.context.component_betBoard.bet_areas[10+1].setBounds(0,0,220,474);
			this.context.component_betBoard.bet_areas[10+1].min_betAmt = tieMin;
			this.context.component_betBoard.bet_areas[10+1].max_betAmt = tieMax;
			this.context.component_betBoard.bet_areas[10+1].payout_multiplier = 8;

			this.context.component_betBoard.bet_areas[10+1].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0,0,220,474);
			}

			this.context.component_betBoard.bet_areas[10+1].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[10+1].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).drawRect(0,0,220,474);
			}

			this.context.component_betBoard.bet_areas[11+1] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[11+1].graphics.beginFill(default_color).drawRect(0,0,216,474);
			this.context.component_betBoard.bet_areas[11+1].x = this.context.component_betBoard.bet_areas[10+1].x + this.context.component_betBoard.bet_areas[10+1].getBounds().width;
			this.context.component_betBoard.bet_areas[11+1].y = this.context.component_betBoard.bet_areas[10+1].y;
			this.context.component_betBoard.bet_areas[11+1].table_name = "banker";
			this.context.component_betBoard.bet_areas[11+1].setBounds(0,0,216,474)
			this.context.component_betBoard.bet_areas[11+1].min_betAmt = mainAreaMin;
			this.context.component_betBoard.bet_areas[11+1].max_betAmt = mainAreaMax;
			this.context.component_betBoard.bet_areas[11+1].payout_multiplier = isSuperSix() ? 1 : 0.95;

			this.context.component_betBoard.bet_areas[11+1].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0,0,216,474);
			}

			this.context.component_betBoard.bet_areas[11+1].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[11+1].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).drawRect(0,0,216,474);
			}

			this.context.component_betBoard.bet_areas[12+1] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[12+1].graphics.beginFill(default_color).drawRect(0,0,225,474);
			this.context.component_betBoard.bet_areas[12+1].x = 35;
			this.context.component_betBoard.bet_areas[12+1].y = this.context.component_betBoard.bet_areas[11+1].y;
			this.context.component_betBoard.bet_areas[12+1].table_name = "playerpair";
			this.context.component_betBoard.bet_areas[12+1].setBounds(0,0,225,474);
			this.context.component_betBoard.bet_areas[12+1].min_betAmt = pairMin;
			this.context.component_betBoard.bet_areas[12+1].max_betAmt = pairMax;
			this.context.component_betBoard.bet_areas[12+1].payout_multiplier = 11

			this.context.component_betBoard.bet_areas[12+1].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0,0,225,474);
			}

			this.context.component_betBoard.bet_areas[12+1].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[12+1].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).drawRect(0,0,225,474);
			}

			this.context.component_betBoard.bet_areas[13+1] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[13+1].graphics.beginFill(default_color).drawRect(0,0,225,474);
			this.context.component_betBoard.bet_areas[13+1].x = this.context.component_betBoard.bet_areas[11+1].x + this.context.component_betBoard.bet_areas[11+1].getBounds().width;
			this.context.component_betBoard.bet_areas[13+1].y = this.context.component_betBoard.bet_areas[11+1].y;
			this.context.component_betBoard.bet_areas[13+1].table_name = "bankerpair";
			this.context.component_betBoard.bet_areas[13+1].setBounds(0,0,225,474);
			this.context.component_betBoard.bet_areas[13+1].min_betAmt = pairMin;
			this.context.component_betBoard.bet_areas[13+1].max_betAmt = pairMax;
			this.context.component_betBoard.bet_areas[13+1].payout_multiplier = 11

			this.context.component_betBoard.bet_areas[13+1].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0,0,225,474);
			}

			this.context.component_betBoard.bet_areas[13+1].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[13+1].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).drawRect(0,0,225,474);
			}

			if(isSuperSix()) {

				this.context.component_betBoard.bet_areas[10+1].graphics.clear().beginFill(default_color).drawRect(0,0,220,(474/2));
				this.context.component_betBoard.bet_areas[10+1].setBounds(0,0,220,(474/2));

				this.context.component_betBoard.bet_areas[10+1].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill(default_color).drawRect(0,0,220,(474/2));
				}

				this.context.component_betBoard.bet_areas[10+1].win_state =  function (e) {
					e.dropped_state(e);
				}

				this.context.component_betBoard.bet_areas[10+1].normal_state =  function (e) {
					e.graphics.clear().beginFill(default_color).drawRect(0,0,220,(474/2));
				}
			}

			if(isDragonBonus()) {

				this.context.component_betBoard.bet_areas[9+1].graphics.clear().beginFill(default_color).drawRect(0,0,184,370);
				this.context.component_betBoard.bet_areas[9+1].x = 312;
				this.context.component_betBoard.bet_areas[9+1].setBounds(0,0,184,370);

				this.context.component_betBoard.bet_areas[9+1].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill(default_color).drawRect(0,0,184,370);
				}

				this.context.component_betBoard.bet_areas[9+1].win_state =  function (e) {
					e.dropped_state(e);
				}

				this.context.component_betBoard.bet_areas[9+1].normal_state =  function (e) {
					e.graphics.clear().beginFill(default_color).drawRect(0,0,184,370);
				}

				this.context.component_betBoard.bet_areas[10+1].graphics.clear().drawRect(0,0,180,370);
				this.context.component_betBoard.bet_areas[10+1].x = 498;
				this.context.component_betBoard.bet_areas[10+1].y = this.context.component_betBoard.bet_areas[9+1].y;
				this.context.component_betBoard.bet_areas[10+1].setBounds(0,0,180,370);

				this.context.component_betBoard.bet_areas[10+1].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill(default_color).drawRect(0,0,180,370);
				}

				this.context.component_betBoard.bet_areas[10+1].win_state =  function (e) {
					e.dropped_state(e);
				}

				this.context.component_betBoard.bet_areas[10+1].normal_state =  function (e) {
					e.graphics.clear().beginFill(default_color).drawRect(0,0,180,370);
				}

				this.context.component_betBoard.bet_areas[11+1].graphics.clear().beginFill(default_color).drawRect(0,0,186,370);
				this.context.component_betBoard.bet_areas[11+1].x = 678;
				this.context.component_betBoard.bet_areas[11+1].y = this.context.component_betBoard.bet_areas[9+1].y;
				this.context.component_betBoard.bet_areas[11+1].setBounds(0,0,186,370);

				this.context.component_betBoard.bet_areas[11+1].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill(default_color).drawRect(0,0,186,370);
				}

				this.context.component_betBoard.bet_areas[11+1].win_state =  function (e) {
					e.dropped_state(e);
				}

				this.context.component_betBoard.bet_areas[11+1].normal_state =  function (e) {
					e.graphics.clear().beginFill(default_color).drawRect(0,0,186,370);
				}

				this.context.component_betBoard.bet_areas[12+1].graphics.clear().beginFill(default_color).drawRect(0,0,192,370);
				this.context.component_betBoard.bet_areas[12+1].x = 120;
				this.context.component_betBoard.bet_areas[12+1].y = this.context.component_betBoard.bet_areas[9+1].y;
				this.context.component_betBoard.bet_areas[12+1].setBounds(0,0,192,370);

				this.context.component_betBoard.bet_areas[12+1].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill(default_color).drawRect(0,0,192,370);
				}

				this.context.component_betBoard.bet_areas[12+1].win_state =  function (e) {
					e.dropped_state(e);
				}

				this.context.component_betBoard.bet_areas[12+1].normal_state =  function (e) {
					e.graphics.clear().beginFill(default_color).drawRect(0,0,192,370);
				}

				this.context.component_betBoard.bet_areas[13+1].graphics.beginFill(default_color).drawRect(0,0,148,370);
				this.context.component_betBoard.bet_areas[13+1].x = 864;
				this.context.component_betBoard.bet_areas[13+1].y = this.context.component_betBoard.bet_areas[9+1].y;
				this.context.component_betBoard.bet_areas[13+1].setBounds(0,0,148,370);

				this.context.component_betBoard.bet_areas[13+1].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill(default_color).drawRect(0,0,148,370);
				}

				this.context.component_betBoard.bet_areas[13+1].win_state =  function (e) {
					e.dropped_state(e);
				}

				this.context.component_betBoard.bet_areas[13+1].normal_state =  function (e) {
					e.graphics.clear().beginFill(default_color).drawRect(0,0,148,370);
				}
			}

			/* -------------------------------------------- supersix drawing -------------------------------- */
			this.context.component_betBoard.bet_areas[14+1] =  new createjs.Shape();
			this.context.component_betBoard.bet_areas[14+1].graphics.beginFill(default_color).drawRect(0,0,220,(474/2));
			this.context.component_betBoard.bet_areas[14+1].x = this.context.component_betBoard.bet_areas[10+1].x;
			this.context.component_betBoard.bet_areas[14+1].y = this.context.component_betBoard.bet_areas[10+1].y + this.context.component_betBoard.bet_areas[10+1].getBounds().height;
			this.context.component_betBoard.bet_areas[14+1].table_name = "supersix";
			this.context.component_betBoard.bet_areas[14+1].setBounds(0,0,220,(474/2));
			this.context.component_betBoard.bet_areas[14+1].min_betAmt = superMin;
			this.context.component_betBoard.bet_areas[14+1].max_betAmt = superMax;
			this.context.component_betBoard.bet_areas[14+1].payout_multiplier = 12;

			this.context.component_betBoard.bet_areas[14+1].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0,0,220,(474/2));
			}

			this.context.component_betBoard.bet_areas[14+1].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.context.component_betBoard.bet_areas[14+1].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).drawRect(0,0,220,(474/2));
			}

			this.context.component_betBoard.bet_areas[14+1].visible = isSuperSix();

			this.context.component_betBoard.bet_areas[15+1] = new createjs.Shape();
			this.context.component_betBoard.bet_areas[15+1].graphics.beginFill(default_color).drawRect(0, 0, 135, 370);
			this.context.component_betBoard.bet_areas[15+1].x = 28;
			this.context.component_betBoard.bet_areas[15+1].y = this.context.component_betBoard.bet_areas[9+1].y;
			this.context.component_betBoard.bet_areas[15+1].setBounds(0, 0, 135, 370);
			this.context.component_betBoard.bet_areas[15+1].table_name = "big";
			this.context.component_betBoard.bet_areas[15+1].min_betAmt = sizeMin;
			this.context.component_betBoard.bet_areas[15+1].max_betAmt = sizeMax;
			this.context.component_betBoard.bet_areas[15+1].payout_multiplier = .54;
			this.context.component_betBoard.bet_areas[15+1].visible = isDragonBonus();

			this.context.component_betBoard.bet_areas[15+1].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).beginFill(default_color).drawRect(0, 0, 135, 370);
				e.alpha = 1
			}


			this.context.component_betBoard.bet_areas[15+1].hover_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).beginFill(default_color).drawRect(0, 0, 135, 370);
				e.alpha = 0.5
			}

			this.context.component_betBoard.bet_areas[15+1].win_state =  function (e) {
				e.dropped_state(e);
				e.alpha = 1
			}

			this.context.component_betBoard.bet_areas[15+1].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).beginFill(default_color).drawRect(0, 0, 135, 370);
				e.alpha = 1
			}

			this.context.component_betBoard.bet_areas[16+1] = new createjs.Shape();
			this.context.component_betBoard.bet_areas[16+1].graphics.beginFill(default_color).drawRect(0, 0, 135, 370);
			this.context.component_betBoard.bet_areas[16+1].x = 1012;
			this.context.component_betBoard.bet_areas[16+1].y = this.context.component_betBoard.bet_areas[9+1].y;
			this.context.component_betBoard.bet_areas[16+1].setBounds(0, 0, 135, 370);
			this.context.component_betBoard.bet_areas[16+1].table_name = "small";
			this.context.component_betBoard.bet_areas[16+1].min_betAmt = sizeMin;
			this.context.component_betBoard.bet_areas[16+1].max_betAmt = sizeMax;
			this.context.component_betBoard.bet_areas[16+1].payout_multiplier = 1.5;
			this.context.component_betBoard.bet_areas[16+1].visible = isDragonBonus();

			this.context.component_betBoard.bet_areas[16+1].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0, 0, 135, 370);
				e.alpha = 1
			}


			this.context.component_betBoard.bet_areas[16+1].hover_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawRect(0, 0, 135, 370);
				e.alpha = 0.5
			}

			this.context.component_betBoard.bet_areas[16+1].win_state =  function (e) {
				e.dropped_state(e);
				e.alpha = 1
			}

			this.context.component_betBoard.bet_areas[16+1].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).drawRect(0, 0, 135, 370);
				e.alpha = 1
			}

			this.context.component_betBoard.bet_areas[17+1] = new createjs.Shape();
			this.context.component_betBoard.bet_areas[17+1].graphics.beginFill(default_color).drawCircle(0, 0, 116);
			this.context.component_betBoard.bet_areas[17+1].x = 318;
			this.context.component_betBoard.bet_areas[17+1].y = 408;
			this.context.component_betBoard.bet_areas[17+1].setBounds(0,0,(116/2) - 120,(116/2) - 120);
			this.context.component_betBoard.bet_areas[17+1].table_name = "bonus_player";
			this.context.component_betBoard.bet_areas[17+1].min_betAmt = bonusMin;
			this.context.component_betBoard.bet_areas[17+1].max_betAmt = bonusMax;
			this.context.component_betBoard.bet_areas[17+1].payout_multiplier = 12;
			this.context.component_betBoard.bet_areas[17+1].visible = isDragonBonus();

			this.context.component_betBoard.bet_areas[17+1].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawCircle(0, 0, 118);
				e.alpha = 1
			}

			this.context.component_betBoard.bet_areas[17+1].hover_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawCircle(0, 0, 118);
				e.alpha = 0.5
			}

			this.context.component_betBoard.bet_areas[17+1].win_state =  function (e) {
				e.dropped_state(e);
				e.alpha = 1
			}

			this.context.component_betBoard.bet_areas[17+1].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).drawCircle(0,0,118)
			}

			this.context.component_betBoard.bet_areas[18+1] = new createjs.Shape();
			this.context.component_betBoard.bet_areas[18+1].graphics.beginFill("red").drawCircle(0, 0, 116);
			this.context.component_betBoard.bet_areas[18+1].x = 854;
			this.context.component_betBoard.bet_areas[18+1].y = 410;
			this.context.component_betBoard.bet_areas[18+1].setBounds(0,0,(116/2) - 100,(116/2) - 100);
			this.context.component_betBoard.bet_areas[18+1].table_name = "bonus_banker";
			this.context.component_betBoard.bet_areas[18+1].min_betAmt = bonusMin;
			this.context.component_betBoard.bet_areas[18+1].max_betAmt = bonusMax;
			this.context.component_betBoard.bet_areas[18+1].payout_multiplier = 12;
			this.context.component_betBoard.bet_areas[18+1].visible = isDragonBonus();

			this.context.component_betBoard.bet_areas[18+1].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawCircle(0, 0, 116);
				e.alpha = 1
			}

			this.context.component_betBoard.bet_areas[18+1].hover_state =  function (e,x) {
				e.graphics.clear().beginFill(default_color).drawCircle(0, 0, 116);
				e.alpha = 0.5
			}

			this.context.component_betBoard.bet_areas[18+1].win_state =  function (e) {
				e.dropped_state(e);
				e.alpha = 1
			}

			this.context.component_betBoard.bet_areas[18+1].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).drawCircle(0, 0, 116);
			}

			/* -------------------------------------------- supersix drawing -------------------------------- */

			for(var x = 9+1; x < this.context.component_betBoard.bet_areas.length; x++ ) {
				this.context.component_betBoard.bet_areas[x].multiplayer = true;
				if(!_.includes(["supersix", "big","small","bonus_player","bonus_banker"], this.context.component_betBoard.bet_areas[x].table_name))
				{
					this.context.component_betBoard.bet_areas[x].visible = false;
				}
				this.context.component_betBoard.bet_areas[x].chip_anim_toPlay = 0;
				this.context.component_betBoard.bet_areas[x].chip_drop_scale = 1;
				this.context.component_betBoard.bet_areas[x].chips = []

				// if(!isDragonBonus() && (this.context.component_betBoard.bet_areas[x].table_name == "playerpair" || this.context.component_betBoard.bet_areas[x].table_name == "bankerpair"))
				// {
				// 	this.context.component_betBoard.bet_areas[x].chip_drop_scale = 0.6;
				// }

				this.context.component_betBoard.bet_areas[x].x += adjustX;
				this.context.component_betBoard.bet_areas[x].y += (adjustY -2);

				table_img.hitArea = this.context.component_betBoard.bet_areas[x];
				if(parseInt(window.multiplayer) > 0) {
					this.context.component_betBoard.addChild(this.context.component_betBoard.bet_areas[x]);
					this.context.component_betBoard.addChild(table_img);
				}
			}

			// === user bets
			let color_def2 = "rgba(255,255,255,0.4)";

			// ==== player 1
			this.user_1[0] = new createjs.Shape();
			this.user_1[0].x = 21;
			this.user_1[0].graphics.beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,80,0).moveTo(0,0).lineTo(153,0).lineTo(153,120).lineTo(0,120).lineTo(0,0);
			this.user_1[0].setBounds(0,0,153,120);
			this.user_1[0].y = 138;
			this.user_1[0].betarea = "tie";
			this.user_1[0].alpha = 1;
			this.user_1[0].chips = [];
			this.user_1[0].payout_multiplier = 8;
			// this.addChild(this.user_1[0]);

			this.user_1[1] = new createjs.Shape();
			this.user_1[1].x = 21;
			this.user_1[1].graphics.beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,80,0).moveTo(0,0).lineTo(153,0).lineTo(153,88).lineTo(0,88).lineTo(0,0);
			this.user_1[1].setBounds(0,0,153,88);
			this.user_1[1].y = 228;
			this.user_1[1].betarea = "supersix";
			this.user_1[1].alpha = 1;
			this.user_1[1].chips = [];
			this.user_1[1].payout_multiplier = 12;
			this.user_1[1].visible = isSuperSix();
			// this.addChild(this.user_1[1]);

			this.user_1[2] = new createjs.Shape();
			this.user_1[2].graphics.beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,80,0).moveTo(0,0).lineTo(153,0).lineTo(153,120).lineTo(0,120).lineTo(0,0);
			this.user_1[2].setBounds(0,0,153,120);
			this.user_1[2].x = 21;
			this.user_1[2].y = 256;
			this.user_1[2].betarea = "banker";
			this.user_1[2].alpha = 1;
			this.user_1[2].chips = [];
			this.user_1[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			// this.addChild(this.user_1[2]);

			this.user_1[3] = new createjs.Shape();
			this.user_1[3].graphics.beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,80,0).moveTo(0,0).lineTo(153,0).lineTo(153,120).lineTo(0,120).lineTo(0,0);
			this.user_1[3].setBounds(0,0,153,120);
			this.user_1[3].x = 21;
			this.user_1[3].y = 378;
			this.user_1[3].betarea = "player";
			this.user_1[3].alpha = 1;
			this.user_1[3].chips = [];
			this.user_1[3].payout_multiplier = 1;
			// this.addChild(this.user_1[3]);

			this.user_1[4] = new createjs.Shape();
			this.user_1[4].graphics.beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,50,0).moveTo(0,0).lineTo(113,0).lineTo(113,47).lineTo(0,47).lineTo(0,0);
			this.user_1[4].setBounds(0,0,113,47);
			this.user_1[4].x = 21;
			this.user_1[4].y = 23;
			this.user_1[4].betarea = "playerpair";
			this.user_1[4].alpha = 1;
			this.user_1[4].chips = [];
			this.user_1[4].payout_multiplier = 11;
			this.user_1[4].visible = isDragonBonus() ? false : true;
			// this.addChild(this.user_1[4]);

			this.user_1[5] = new createjs.Shape();
			this.user_1[5].graphics.beginFill(color_def2).moveTo(0,0).lineTo(114,0).lineTo(114,46).lineTo(0,46).lineTo(0,0);
			this.user_1[5].setBounds(0,0,114,46);
			this.user_1[5].x = 653;
			this.user_1[5].y = 23;
			this.user_1[5].betarea = "bankerpair";
			this.user_1[5].alpha = 1;
			this.user_1[5].chips = [];
			this.user_1[5].payout_multiplier = 11;
			this.user_1[5].visible = isDragonBonus() ? false : true;
			// this.addChild(this.user_1[5]);

			// ==== player 2
			this.user_2[0] = new createjs.Shape();
			this.user_2[0].x = 173;
			this.user_2[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,120).lineTo(0,120).lineTo(0,0);
			this.user_2[0].setBounds(0,0,158,120);
			this.user_2[0].y = 138;
			this.user_2[0].betarea = "tie";
			this.user_2[0].alpha = 1;
			this.user_2[0].chips = [];
			this.user_2[0].payout_multiplier = 8;
			// this.addChild(this.user_2[0]);

			this.user_2[1] = new createjs.Shape();
			this.user_2[1].x = 173;
			this.user_2[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,88).lineTo(0,88).lineTo(0,0);
			this.user_2[1].y = 228;
			this.user_2[1].setBounds(0,0,158,88);
			this.user_2[1].betarea = "supersix";
			this.user_2[1].alpha = 1;
			this.user_2[1].chips = [];
			this.user_2[1].payout_multiplier = 12;
			this.user_2[1].visible = isSuperSix();
			// this.addChild(this.user_2[1]);

			this.user_2[2] = new createjs.Shape();
			this.user_2[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,120).lineTo(0,120).lineTo(0,0);
			this.user_2[2].setBounds(0,0,158,120);
			this.user_2[2].x = 173;
			this.user_2[2].y = 256;
			this.user_2[2].betarea = "banker";
			this.user_2[2].alpha = 1;
			this.user_2[2].chips = [];
			this.user_2[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			// this.addChild(this.user_2[2]);

			this.user_2[3] = new createjs.Shape();
			this.user_2[3].graphics.beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,120).lineTo(0,120).lineTo(0,0);
			this.user_2[3].setBounds(0,0,158,120);
			this.user_2[3].x = 173;
			this.user_2[3].y = 378;
			this.user_2[3].betarea = "player";
			this.user_2[3].alpha = 1;
			this.user_2[3].chips = [];
			this.user_2[3].payout_multiplier = 1;
			// this.addChild(this.user_2[3]);

			this.user_2[4] = new createjs.Shape();
			this.user_2[4].graphics.beginFill(color_def2).moveTo(0,0).lineTo(118,0).lineTo(118,47).lineTo(0,47).lineTo(0,0);
			this.user_2[4].setBounds(0,0,118,47);
			this.user_2[4].x = 134;
			this.user_2[4].y = 23;
			this.user_2[4].betarea = "playerpair";
			this.user_2[4].alpha = 1;
			this.user_2[4].chips = [];
			this.user_2[4].payout_multiplier = 11;
			this.user_2[4].visible = isDragonBonus() ? false : true;
			// this.addChild(this.user_2[4]);

			this.user_2[5] = new createjs.Shape();
			this.user_2[5].graphics.beginFill(color_def2).moveTo(0,0).lineTo(118,0).lineTo(118,46).lineTo(0,46).lineTo(0,0);
			this.user_2[5].setBounds(0,0,118,46);
			this.user_2[5].x = 767;
			this.user_2[5].y = 23;
			this.user_2[5].betarea = "bankerpair";
			this.user_2[5].alpha = 1;
			this.user_2[5].chips = [];
			this.user_2[5].payout_multiplier = 11;
			this.user_2[5].visible = isDragonBonus() ? false : true;
			// this.addChild(this.user_2[5]);

			// ==== player 3
			this.user_3[0] = new createjs.Shape();
			this.user_3[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,120).lineTo(0,120).lineTo(0,0);
			this.user_3[0].setBounds(0,0,158,120);
			this.user_3[0].x = 331;
			this.user_3[0].y = 138;
			this.user_3[0].betarea = "tie";
			this.user_3[0].alpha = 1;
			this.user_3[0].chips = [];
			this.user_3[0].payout_multiplier = 8;
			// this.addChild(this.user_3[0]);

			this.user_3[1] = new createjs.Shape();
			this.user_3[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,88).lineTo(0,88).lineTo(0,0);
			this.user_3[1].x = 331;
			this.user_3[1].y = 228;
			this.user_3[1].setBounds(0,0,158,88);
			this.user_3[1].betarea = "supersix";
			this.user_3[1].alpha = 1;
			this.user_3[1].chips = [];
			this.user_3[1].payout_multiplier = 12;
			this.user_3[1].visible = isSuperSix();
			// this.addChild(this.user_3[1]);

			this.user_3[2] = new createjs.Shape();
			this.user_3[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,120).lineTo(0,120).lineTo(0,0);
			this.user_3[2].setBounds(0,0,158,120);
			this.user_3[2].x = 331;
			this.user_3[2].y = 256;
			this.user_3[2].betarea = "banker";
			this.user_3[2].alpha = 1;
			this.user_3[2].chips = [];
			this.user_3[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			// this.addChild(this.user_3[2]);

			this.user_3[3] = new createjs.Shape();
			this.user_3[3].graphics.beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,120).lineTo(0,120).lineTo(0,0);
			this.user_3[3].setBounds(0,0,158,120);
			this.user_3[3].x = 331;
			this.user_3[3].y = 378;
			this.user_3[3].betarea = "player";
			this.user_3[3].alpha = 1;
			this.user_3[3].chips = [];
			this.user_3[3].payout_multiplier = 1;
			// this.addChild(this.user_3[3]);

			this.user_3[4] = new createjs.Shape();
			this.user_3[4].graphics.beginFill(color_def2).moveTo(0,0).lineTo(118,0).lineTo(118,47).lineTo(0,47).lineTo(0,0);
			this.user_3[4].setBounds(0,0,118,47);
			this.user_3[4].x = 252;
			this.user_3[4].y = 23;
			this.user_3[4].betarea = "playerpair";
			this.user_3[4].alpha = 1;
			this.user_3[4].chips = [];
			this.user_3[4].payout_multiplier = 11;
			this.user_3[4].visible = isDragonBonus() ? false : true;
			// this.addChild(this.user_3[4]);

			this.user_3[5] = new createjs.Shape();
			this.user_3[5].graphics.beginFill(color_def2).moveTo(0,0).lineTo(119,0).lineTo(119,46).lineTo(0,46).lineTo(0,0);
			this.user_3[5].setBounds(0,0,119,46);
			this.user_3[5].x = 885;
			this.user_3[5].y = 23;
			this.user_3[5].betarea = "bankerpair";
			this.user_3[5].alpha = 1;
			this.user_3[5].chips = [];
			this.user_3[5].payout_multiplier = 11;
			this.user_3[5].visible = isDragonBonus() ? false : true;
			// this.addChild(this.user_3[5]);

			// ==== player 6
			this.user_6[0] = new createjs.Shape();
			this.user_6[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(157,0).lineTo(157,120).lineTo(0,120).lineTo(0,0);
			this.user_6[0].setBounds(0,0,157,120);
			this.user_6[0].x = 649;
			this.user_6[0].y = 138;
			this.user_6[0].betarea = "tie";
			this.user_6[0].alpha = 0.5;
			this.user_6[0].chips = [];
			this.user_6[0].payout_multiplier = 8;
			// this.addChild(this.user_6[0]);

			this.user_6[1] = new createjs.Shape();
			this.user_6[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(157,0).lineTo(157,88).lineTo(0,88).lineTo(0,0);
			this.user_6[1].setBounds(0,0,157,88);
			this.user_6[1].x = 649;
			this.user_6[1].y = 228;
			this.user_6[1].betarea = "supersix";
			this.user_6[1].alpha = 0.5;
			this.user_6[1].chips = [];
			this.user_6[1].payout_multiplier = 12;
			this.user_6[1].visible = isSuperSix();
			// this.addChild(this.user_6[1]);

			this.user_6[2] = new createjs.Shape();
			this.user_6[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(157,0).lineTo(157,120).lineTo(0,120).lineTo(0,0);
			this.user_6[2].setBounds(0,0,157,120);
			this.user_6[2].x = 649;
			this.user_6[2].y = 256;
			this.user_6[2].betarea = "banker";
			this.user_6[2].alpha = 0.5;
			this.user_6[2].chips = [];
			this.user_6[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			// this.addChild(this.user_6[2]);

			this.user_6[3] = new createjs.Shape();
			this.user_6[3].graphics.beginFill(color_def2).moveTo(0,0).lineTo(157,0).lineTo(157,120).lineTo(0,120).lineTo(0,0);
			this.user_6[3].setBounds(0,0,157,120);
			this.user_6[3].x = 649;
			this.user_6[3].y = 378;
			this.user_6[3].betarea = "player";
			this.user_6[3].alpha = .5;
			this.user_6[3].chips = [];
			this.user_6[3].payout_multiplier = 1;
			// this.addChild(this.user_6[3]);

			this.user_6[4] = new createjs.Shape();
			this.user_6[4].graphics.beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,50,0).moveTo(0,0).lineTo(113,0).lineTo(113,47).lineTo(0,47).lineTo(0,0);
			this.user_6[4].setBounds(0,0,113,47);
			this.user_6[4].x = 21;
			this.user_6[4].y = 70;
			this.user_6[4].betarea = "playerpair";
			this.user_6[4].alpha = .5;
			this.user_6[4].chips = [];
			this.user_6[4].payout_multiplier = 11;
			this.user_6[4].visible = isDragonBonus() ? false : true;
			// this.addChild(this.user_6[4]);

			this.user_6[5] = new createjs.Shape();
			this.user_6[5].graphics.beginFill(color_def2).moveTo(0,0).lineTo(114,0).lineTo(114,48).lineTo(0,48).lineTo(0,0);
			this.user_6[5].setBounds(0,0,114,48);
			this.user_6[5].x = 653;
			this.user_6[5].y = 69;
			this.user_6[5].betarea = "bankerpair";
			this.user_6[5].alpha = .5;
			this.user_6[5].chips = [];
			this.user_6[5].payout_multiplier = 11;
			this.user_6[5].visible = isDragonBonus() ? false : true;
			// this.addChild(this.user_6[5]);

			// ==== player 7
			this.user_7[0] = new createjs.Shape();
			this.user_7[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,120).lineTo(0,120).lineTo(0,0);
			this.user_7[0].setBounds(0,0,158,120);
			this.user_7[0].x = 806;
			this.user_7[0].y = 138;
			this.user_7[0].betarea = "tie";
			this.user_7[0].alpha = 0.6;
			this.user_7[0].chips = [];
			this.user_7[0].payout_multiplier = 8;
			// this.addChild(this.user_7[0]);

			this.user_7[1] = new createjs.Shape();
			this.user_7[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,88).lineTo(0,88).lineTo(0,0);
			this.user_7[1].x = 806;
			this.user_7[1].y = 228;
			this.user_7[1].setBounds(0,0,158,88);
			this.user_7[1].betarea = "supersix";
			this.user_7[1].alpha = 0.6;
			this.user_7[1].chips = [];
			this.user_7[1].payout_multiplier = 12;
			this.user_7[1].visible = isSuperSix();
			// this.addChild(this.user_7[1]);

			this.user_7[2] = new createjs.Shape();
			this.user_7[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,120).lineTo(0,120).lineTo(0,0);
			this.user_7[2].setBounds(0,0,158,120);
			this.user_7[2].x = 806;
			this.user_7[2].y = 256;
			this.user_7[2].betarea = "banker";
			this.user_7[2].alpha = 0.6;
			this.user_7[2].chips = [];
			this.user_7[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			// this.addChild(this.user_7[2]);

			this.user_7[3] = new createjs.Shape();
			this.user_7[3].graphics.beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,120).lineTo(0,120).lineTo(0,0);
			this.user_7[3].setBounds(0,0,158,120);
			this.user_7[3].x = 806;
			this.user_7[3].y = 378;
			this.user_7[3].betarea = "player";
			this.user_7[3].alpha = .6;
			this.user_7[3].chips = [];
			this.user_7[3].payout_multiplier = 1;
			// this.addChild(this.user_7[3]);

			this.user_7[4] = new createjs.Shape();
			this.user_7[4].graphics.beginFill(color_def2).moveTo(0,0).lineTo(118,0).lineTo(118,47).lineTo(0,47).lineTo(0,0);
			this.user_7[4].setBounds(0,0,118,47);
			this.user_7[4].x = 134;
			this.user_7[4].y = 70;
			this.user_7[4].betarea = "playerpair";
			this.user_7[4].alpha = 0.6;
			this.user_7[4].chips = [];
			this.user_7[4].payout_multiplier = 11;
			this.user_7[4].visible = isDragonBonus() ? false : true;
			// this.addChild(this.user_7[4]);

			this.user_7[5] = new createjs.Shape();
			this.user_7[5].graphics.beginFill(color_def2).moveTo(0,0).lineTo(118,0).lineTo(118,48).lineTo(0,48).lineTo(0,0);
			this.user_7[5].setBounds(0,0,118,48);
			this.user_7[5].x = 767;
			this.user_7[5].y = 69;
			this.user_7[5].betarea = "bankerpair";
			this.user_7[5].alpha = 0.6;
			this.user_7[5].chips = [];
			this.user_7[5].payout_multiplier = 11;
			this.user_7[5].visible = isDragonBonus() ? false : true;
			// this.addChild(this.user_7[5]);

			// ==== player 8
			this.user_8[0] = new createjs.Shape();
			this.user_8[0].graphics.beginLinearGradientFill([color_def2,"transparent"],[0,1],50,0,153,0).moveTo(0,0).lineTo(153,0).lineTo(153,120).lineTo(0,120).lineTo(0,0);
			this.user_8[0].setBounds(0,0,153,120);
			this.user_8[0].x = 964;
			this.user_8[0].y = 138;
			this.user_8[0].betarea = "tie";
			this.user_8[0].alpha = .6;
			this.user_8[0].chips = [];
			this.user_8[0].payout_multiplier = 8;
			// this.addChild(this.user_8[0]);

			this.user_8[1] = new createjs.Shape();
			this.user_8[1].graphics.beginLinearGradientFill([color_def2,"transparent"],[0,1],50,0,153,0).moveTo(0,0).lineTo(153,0).lineTo(153,88).lineTo(0,88).lineTo(0,0);
			this.user_8[1].setBounds(0,0,153,88);
			this.user_8[1].x = 964;
			this.user_8[1].y = 228;
			this.user_8[1].betarea = "supersix";
			this.user_8[1].alpha = 1;
			this.user_8[1].chips = [];
			this.user_8[1].payout_multiplier = 12;
			this.user_8[1].visible = isSuperSix();
			// this.addChild(this.user_8[1]);

			this.user_8[2] = new createjs.Shape();
			this.user_8[2].graphics.beginLinearGradientFill([color_def2,"transparent"],[0,1],50,0,153,0).moveTo(0,0).lineTo(153,0).lineTo(153,120).lineTo(0,120).lineTo(0,0);
			this.user_8[2].setBounds(0,0,153,120);
			this.user_8[2].x = 964;
			this.user_8[2].y = 256;
			this.user_8[2].betarea = "banker";
			this.user_8[2].alpha = .6;
			this.user_8[2].chips = [];
			this.user_8[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			// this.addChild(this.user_8[2]);

			this.user_8[3] = new createjs.Shape();
			this.user_8[3].graphics.beginLinearGradientFill([color_def2,"transparent"],[0,1],50,0,153,0).moveTo(0,0).lineTo(153,0).lineTo(153,120).lineTo(0,120).lineTo(0,0);
			this.user_8[3].setBounds(0,0,153,120);
			this.user_8[3].x = 964;
			this.user_8[3].y = 378;
			this.user_8[3].betarea = "player";
			this.user_8[3].alpha = .6;
			this.user_8[3].chips = [];
			this.user_8[3].payout_multiplier = 1;
			// this.addChild(this.user_8[3]);

			this.user_8[4] = new createjs.Shape();
			this.user_8[4].graphics.beginFill(color_def2).moveTo(0,0).lineTo(118,0).lineTo(118,47).lineTo(0,47).lineTo(0,0);
			this.user_8[4].setBounds(0,0,118,47);
			this.user_8[4].x = 252;
			this.user_8[4].y = 70;
			this.user_8[4].betarea = "playerpair";
			this.user_8[4].alpha = .6;
			this.user_8[4].chips = [];
			this.user_8[4].payout_multiplier = 11;
			this.user_8[4].visible = isDragonBonus() ? false : true;
			// this.addChild(this.user_8[4]);

			this.user_8[5] = new createjs.Shape();
			this.user_8[5].graphics.beginFill(color_def2).moveTo(0,0).lineTo(119,0).lineTo(119,48).lineTo(0,48).lineTo(0,0);
			this.user_8[5].setBounds(0,0,119,48);
			this.user_8[5].x = 885;
			this.user_8[5].y = 69;
			this.user_8[5].betarea = "bankerpair";
			this.user_8[5].alpha = .6;
			this.user_8[5].chips = [];
			this.user_8[5].payout_multiplier = 11;
			this.user_8[5].visible = isDragonBonus() ? false : true;
			// this.addChild(this.user_8[5]);

			if(isSuperSix()) {

				this.user_1[0].x = 21;
				this.user_1[0].graphics.clear().beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,80,0).moveTo(0,0).lineTo(153,0).lineTo(153,88).lineTo(0,88).lineTo(0,0);
				this.user_1[0].y = 138;
				this.user_1[0].setBounds(0,0,153,88);

				this.user_1[2].graphics.clear().beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,80,0).moveTo(0,0).lineTo(153,0).lineTo(153,88).lineTo(0,88).lineTo(0,0);
				this.user_1[2].x = 21;
				this.user_1[2].y = 318;
				this.user_1[2].setBounds(0,0,153,88);

				this.user_1[3].graphics.clear().beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,80,0).moveTo(0,0).lineTo(153,0).lineTo(153,88).lineTo(0,88).lineTo(0,0);
				this.user_1[3].x = 21;
				this.user_1[3].y = 408;
				this.user_1[3].setBounds(0,0,153,88);

				this.user_2[0].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,88).lineTo(0,88).lineTo(0,0);
				this.user_2[0].y = 138;
				this.user_2[0].x = 173;
				this.user_2[0].setBounds(0,0,158,88);

				this.user_2[2].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,88).lineTo(0,88).lineTo(0,0);
				this.user_2[2].x = 173;
				this.user_2[2].y = 318;
				this.user_2[2].setBounds(0,0,158,88);

				this.user_2[3].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,88).lineTo(0,88).lineTo(0,0);
				this.user_2[3].x = 173;
				this.user_2[3].y = 408;
				this.user_2[3].setBounds(0,0,158,88);

				this.user_3[0].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,88).lineTo(0,88).lineTo(0,0);
				this.user_3[0].x = 331;
				this.user_3[0].y = 138;
				this.user_3[0].setBounds(0,0,158,88);

				this.user_3[2].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,88).lineTo(0,88).lineTo(0,0);
				this.user_3[2].x = 331;
				this.user_3[2].y = 318;
				this.user_3[2].setBounds(0,0,158,88);

				this.user_3[3].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,88).lineTo(0,88).lineTo(0,0);
				this.user_3[3].x = 331;
				this.user_3[3].y = 408;
				this.user_3[3].setBounds(0,0,158,88);

				this.user_6[0].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(157,0).lineTo(157,88).lineTo(0,88).lineTo(0,0);
				this.user_6[0].x = 649;
				this.user_6[0].y = 138;
				this.user_6[0].setBounds(0,0,157,88);

				this.user_6[2].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(157,0).lineTo(157,88).lineTo(0,88).lineTo(0,0);
				this.user_6[2].x = 649;
				this.user_6[2].y = 318;
				this.user_6[2].setBounds(0,0,157,88);

				this.user_6[3].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(157,0).lineTo(157,88).lineTo(0,88).lineTo(0,0);
				this.user_6[3].x = 649;
				this.user_6[3].y = 408;
				this.user_6[3].setBounds(0,0,157,88);

				this.user_7[0].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,88).lineTo(0,88).lineTo(0,0);
				this.user_7[0].x = 806;
				this.user_7[0].y = 138;
				this.user_7[0].setBounds(0,0,158,88);

				this.user_7[2].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,88).lineTo(0,88).lineTo(0,0);
				this.user_7[2].x = 806;
				this.user_7[2].y = 318;
				this.user_7[2].setBounds(0,0,158,88);

				this.user_7[3].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,88).lineTo(0,88).lineTo(0,0);
				this.user_7[3].x = 806;
				this.user_7[3].y = 408;
				this.user_7[3].setBounds(0,0,158,88);

				this.user_8[0].graphics.clear().beginLinearGradientFill([color_def2,"transparent"],[0,1],50,0,153,0).moveTo(0,0).lineTo(153,0).lineTo(153,88).lineTo(0,88).lineTo(0,0);
				this.user_8[0].x = 964;
				this.user_8[0].y = 138;
				this.user_8[0].setBounds(0,0,153,88);

				this.user_8[2].graphics.clear().beginLinearGradientFill([color_def2,"transparent"],[0,1],50,0,153,0).moveTo(0,0).lineTo(153,0).lineTo(153,88).lineTo(0,88).lineTo(0,0);
				this.user_8[2].x = 964;
				this.user_8[2].y = 318;
				this.user_8[2].setBounds(0,0,153,88);

				this.user_8[3].graphics.clear().beginLinearGradientFill([color_def2,"transparent"],[0,1],50,0,153,0).moveTo(0,0).lineTo(153,0).lineTo(153,88).lineTo(0,88).lineTo(0,0);
				this.user_8[3].x = 964;
				this.user_8[3].y = 408;
				this.user_8[3].setBounds(0,0,153,88);

			}

			if(isDragonBonus()) {

				this.user_1[0].x = 21;
				this.user_1[0].graphics.clear().beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,80,0).moveTo(0,0).lineTo(153,0).lineTo(153,114).lineTo(0,114).lineTo(0,0);
				this.user_1[0].y = 160;
				this.user_1[0].setBounds(0,0,153,114);

				this.user_1[2].graphics.clear().beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,80,0).moveTo(0,0).lineTo(153,0).lineTo(153,112).lineTo(0,112).lineTo(0,0);
				this.user_1[2].x = 21;
				this.user_1[2].y = 276;
				this.user_1[2].setBounds(0,0,153,112);

				this.user_1[3].graphics.clear().beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,80,0).moveTo(0,0).lineTo(153,0).lineTo(153,112).lineTo(0,112).lineTo(0,0);
				this.user_1[3].x = 21;
				this.user_1[3].y = 390;
				this.user_1[3].setBounds(0,0,153,112);

				this.user_2[0].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,114).lineTo(0,114).lineTo(0,0);
				this.user_2[0].y = 160;
				this.user_2[0].x = 173;
				this.user_2[0].setBounds(0,0,158,114);

				this.user_2[2].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,112).lineTo(0,112).lineTo(0,0);
				this.user_2[2].x = 173;
				this.user_2[2].y = 276;
				this.user_2[2].setBounds(0,0,158,112);

				this.user_2[3].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,112).lineTo(0,112).lineTo(0,0);
				this.user_2[3].x = 173;
				this.user_2[3].y = 390;
				this.user_2[3].setBounds(0,0,158,112);

				this.user_3[0].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,114).lineTo(0,114).lineTo(0,0);
				this.user_3[0].x = 331;
				this.user_3[0].y = 160;
				this.user_3[0].setBounds(0,0,158,114);

				this.user_3[2].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,112).lineTo(0,112).lineTo(0,0);
				this.user_3[2].x = 331;
				this.user_3[2].y = 276;
				this.user_3[2].setBounds(0,0,158,112);

				this.user_3[3].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,112).lineTo(0,112).lineTo(0,0);
				this.user_3[3].x = 331;
				this.user_3[3].y = 390;
				this.user_3[3].setBounds(0,0,158,112);

				this.user_6[0].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(157,0).lineTo(157,114).lineTo(0,114).lineTo(0,0);
				this.user_6[0].x = 649;
				this.user_6[0].y = 160;
				this.user_6[0].setBounds(0,0,157,114);

				this.user_6[2].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(157,0).lineTo(157,112).lineTo(0,112).lineTo(0,0);
				this.user_6[2].x = 649;
				this.user_6[2].y = 276;
				this.user_6[2].setBounds(0,0,157,112);

				this.user_6[3].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(157,0).lineTo(157,112).lineTo(0,112).lineTo(0,0);
				this.user_6[3].x = 649;
				this.user_6[3].y = 390;
				this.user_6[3].setBounds(0,0,157,112);

				this.user_7[0].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,114).lineTo(0,114).lineTo(0,0);
				this.user_7[0].x = 806;
				this.user_7[0].y = 160;
				this.user_7[0].setBounds(0,0,158,114);

				this.user_7[2].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,112).lineTo(0,112).lineTo(0,0);
				this.user_7[2].x = 806;
				this.user_7[2].y = 276;
				this.user_7[2].setBounds(0,0,158,112);

				this.user_7[3].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(158,112).lineTo(0,112).lineTo(0,0);
				this.user_7[3].x = 806;
				this.user_7[3].y = 390;
				this.user_7[3].setBounds(0,0,158,112);

				this.user_8[0].graphics.clear().beginLinearGradientFill([color_def2,"transparent"],[0,1],50,0,153,0).moveTo(0,0).lineTo(153,0).lineTo(153,114).lineTo(0,114).lineTo(0,0);
				this.user_8[0].x = 964;
				this.user_8[0].y = 160;
				this.user_8[0].setBounds(0,0,153,114);

				this.user_8[2].graphics.clear().beginLinearGradientFill([color_def2,"transparent"],[0,1],50,0,153,0).moveTo(0,0).lineTo(153,0).lineTo(153,112).lineTo(0,112).lineTo(0,0);
				this.user_8[2].x = 964;
				this.user_8[2].y = 276;
				this.user_8[2].setBounds(0,0,153,112);

				this.user_8[3].graphics.clear().beginLinearGradientFill([color_def2,"transparent"],[0,1],50,0,153,0).moveTo(0,0).lineTo(153,0).lineTo(153,112).lineTo(0,112).lineTo(0,0);
				this.user_8[3].x = 964;
				this.user_8[3].y = 390;
				this.user_8[3].setBounds(0,0,153,112);

			}

			let user_1_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_1_icon.x = 35;
			user_1_icon.y = 510;
			user_1_icon.scaleX = user_1_icon.scaleY = 0.5;
			// this.addChild(user_1_icon);

			let user_2_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_2_icon.x = 185;
			user_2_icon.y = 510;
			user_2_icon.scaleX = user_2_icon.scaleY = 0.5;
			// this.addChild(user_2_icon);

			let user_3_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_3_icon.x = 345;
			user_3_icon.y = 510;
			user_3_icon.scaleX = user_3_icon.scaleY = 0.5;
			// this.addChild(user_3_icon);

			let user_6_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_6_icon.x = 665;
			user_6_icon.y = 510;
			user_6_icon.scaleX = user_6_icon.scaleY = 0.5;
			// this.addChild(user_6_icon);

			let user_7_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_7_icon.x = 820;
			user_7_icon.y = 510;
			user_7_icon.scaleX = user_7_icon.scaleY = 0.5;
			// this.addChild(user_7_icon);

			let user_8_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_8_icon.x = 980;
			user_8_icon.y = 510;
			user_8_icon.scaleX = user_8_icon.scaleY = 0.5;
			// this.addChild(user_8_icon);

			this.user_1_name = new createjs.Text("","18px lato","#fff");
			this.user_1_name.x = user_1_icon.x + 20;
			this.user_1_name.y = user_1_icon.y;
			// this.addChild(this.user_1_name);

			this.user_2_name = new createjs.Text("","18px lato","#fff");
			this.user_2_name.x = user_2_icon.x + 20;
			this.user_2_name.y = user_2_icon.y;
			// this.addChild(this.user_2_name);

			this.user_3_name = new createjs.Text("","18px lato","#fff");
			this.user_3_name.x = user_3_icon.x + 20;
			this.user_3_name.y = user_3_icon.y;
			// this.addChild(this.user_3_name);

			this.user_6_name = new createjs.Text("","18px lato","#fff");
			this.user_6_name.x = user_6_icon.x + 20;
			this.user_6_name.y = user_6_icon.y;
			// this.addChild(this.user_6_name);

			this.user_7_name = new createjs.Text("","18px lato","#fff");
			this.user_7_name.x = user_7_icon.x + 20;
			this.user_7_name.y = user_7_icon.y;
			// this.addChild(this.user_7_name);

			this.user_8_name = new createjs.Text("","18px lato","#fff");
			this.user_8_name.x = user_8_icon.x + 20;
			this.user_8_name.y = user_8_icon.y;
			// this.addChild(this.user_8_name);

			this.user_1_bet = new createjs.Text("","18px bebasNeue","#d8bd69");
			this.user_1_bet.x = this.user_1_name.x;
			this.user_1_bet.y = this.user_1_name.y + 20;
			// this.addChild(this.user_1_bet);

			this.user_2_bet = new createjs.Text("","18px bebasNeue","#d8bd69");
			this.user_2_bet.x = this.user_2_name.x;
			this.user_2_bet.y = this.user_2_name.y + 20;
			// this.addChild(this.user_2_bet);

			this.user_3_bet = new createjs.Text("","18px bebasNeue","#d8bd69");
			this.user_3_bet.x = this.user_3_name.x;
			this.user_3_bet.y = this.user_3_name.y + 20;
			// this.addChild(this.user_3_bet);

			this.user_6_bet = new createjs.Text("","18px bebasNeue","#d8bd69");
			this.user_6_bet.x = this.user_6_name.x;
			this.user_6_bet.y = this.user_6_name.y + 20;
			// this.addChild(this.user_6_bet);

			this.user_7_bet = new createjs.Text("","18px bebasNeue","#d8bd69");
			this.user_7_bet.x = this.user_7_name.x ;
			this.user_7_bet.y = this.user_7_name.y + 20;
			// this.addChild(this.user_7_bet);

			this.user_8_bet = new createjs.Text("","18px bebasNeue","#d8bd69");
			this.user_8_bet.x = this.user_8_name.x ;
			this.user_8_bet.y = this.user_8_name.y + 20;
			// this.addChild(this.user_8_bet);

			this.chips_container = new createjs.Container();
			// this.addChild(this.chips_container);

			let areaMaxBet = 0;
			let moneyCheck = 0;

			let table_chip = {};

			for(var x = 1; x <=8; x++) {
				if(x!=4 && x!=5) {
					for(var  i =0; i < this["user_"+x].length; i++) {
						this["user_"+x][i].x += adjustX;
						this["user_"+x][i].y += adjustY;

						this["user_"+x][i].alpha = 0.05;
						this["user_"+x][i].set = false;

						table_img.hitArea = this["user_"+x][i]

						if(this["user_"+x][i].betarea == "banker" || this["user_"+x][i].betarea == "player" ) {
							this["user_"+x][i].min_betAmt = mainAreaMin;
							this["user_"+x][i].max_betAmt = mainAreaMax;
						}

						if(this["user_"+x][i].betarea =="playerpair" || this["user_"+x][i].betarea =="bankerpair") {
							this["user_"+x][i].min_betAmt = pairMin;
							this["user_"+x][i].max_betAmt = pairMax;
						}

						if(this["user_"+x][i].betarea =="tie") {
							this["user_"+x][i].min_betAmt = tieMin;
							this["user_"+x][i].max_betAmt = tieMax;
						}

						switch(this["user_"+x][i].betarea)
						{
							case 'player':
							this["user_"+x][i].chip_anim_toPlay = this.context.component_betBoard.bet_areas[9+1].chip_anim_toPlay;
							this["user_"+x][i].chip_drop_scale = this.context.component_betBoard.bet_areas[9+1].chip_drop_scale;
							break;

							case 'banker':
							this["user_"+x][i].chip_anim_toPlay = this.context.component_betBoard.bet_areas[11+1].chip_anim_toPlay;
							this["user_"+x][i].chip_drop_scale = this.context.component_betBoard.bet_areas[11+1].chip_drop_scale;
							break;

							case 'tie':
							this["user_"+x][i].chip_anim_toPlay = this.context.component_betBoard.bet_areas[10+1].chip_anim_toPlay;
							this["user_"+x][i].chip_drop_scale = this.context.component_betBoard.bet_areas[10+1].chip_drop_scale;
							break;

							case 'playerpair':
							this["user_"+x][i].chip_anim_toPlay = this.context.component_betBoard.bet_areas[12+1].chip_anim_toPlay;
							this["user_"+x][i].chip_drop_scale = this.context.component_betBoard.bet_areas[12+1].chip_drop_scale;
							break;

							case 'bankerpair':
							this["user_"+x][i].chip_anim_toPlay = this.context.component_betBoard.bet_areas[13+1].chip_anim_toPlay;
							this["user_"+x][i].chip_drop_scale = this.context.component_betBoard.bet_areas[13+1].chip_drop_scale;
							break;

							case 'supersix':
							this["user_"+x][i].chip_anim_toPlay = this.context.component_betBoard.bet_areas[14+1].chip_anim_toPlay;
							this["user_"+x][i].chip_drop_scale = this.context.component_betBoard.bet_areas[14+1].chip_drop_scale;
							break;
						}

						// *** start for hit***//
						this["user_"+x][i].addEventListener("click", (area) => {
							if (!this.context.component_timer.betting_start) {
								return;
							} // end if

							if(!this.context.component_chips.selected_chip) return;

							if (!this.context.component_chips.selected_chip || this.context.component_chips.selected_chip === undefined ) {
								return;
							} // end if

							let dropArea = null;

							if(area.currentTarget.betarea == "player") {
								dropArea = this.context.component_betBoard.bet_areas[9+1];
							} else if(area.currentTarget.betarea == "banker") {
								dropArea = this.context.component_betBoard.bet_areas[11+1];
							} else if(area.currentTarget.betarea == "tie") {
								dropArea = this.context.component_betBoard.bet_areas[10+1];

							} else if(area.currentTarget.betarea == "playerpair") {
								dropArea = this.context.component_betBoard.bet_areas[12+1];

							} else if(area.currentTarget.betarea == "bankerpair") {
								dropArea = this.context.component_betBoard.bet_areas[13+1];
							}

							try  {
								let condition = opposite_bet(dropArea.table_name,this.context.component_betBoard.bet_areas);

								if (condition) {
									dropArea.chips = [];
									this.context.component_betBoard.checkTableHighlight();
									return;
								} // end if
							} // end try
							catch(e) {
							} // end catch

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

					            	this.context.component_chips.total_ingame_bet +=  moneyCheck;
					          	}
					          	else {
					            	this.context.component_chips.total_ingame_bet +=  parseInt(dropArea.max_betAmt);
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

							table_chip =_.clone(this.context.component_chips.selected_chip);
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
								this.context.component_chips.changeCurrentChips(table_chip,dropArea);
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

							this.context.component_chips.selected_chip.alpha = 0;
							this.context.component_chips.selectNewChip(); /** select chip new **/
							this.context.component_gameButtons.checkButtonState();
						});
						//** end for hit **//
					}
				}
			}
		},

		drawTableOutline() {
		  let table_outline = null;

			let adjustX = 0;
			let adjustY = 0;

			if(isSuperSix()) {
				table_outline = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "supersix_flat_zh" : "supersix_flat"));
			}
			else if (isDragonBonus()) {
				table_outline = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "the_betboard_dragonbonus_mobile_zh" : "the_betboard_dragonbonus_mobile"));
			}
			else {
				table_outline = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "single_player_flat_zh" : "single_player_flat"));
			}

			table_outline.scaleX = table_outline.scaleY = 0.47;
			table_outline.regX =  table_outline.getBounds().width/2;
			table_outline.regY =  table_outline.getBounds().height/2;
			table_outline.x = this.context.stage.baseWidth/2 - 52 - adjustX;
			table_outline.y = this.context.stage.baseHeight/2 - 75 + adjustY;
			table_outline.multiplayer = true;
			table_outline.alpha = 1;

			return table_outline;
		},

		setPlayerBets(data) {
			var loop = 0;
			for(var x = 1; x < data.length + 1; x++) {
			    if (window.userId != data[x - 1].id && data[x - 1].id != undefined) {
			     loop++;

			     for (var i = 0; i < this["user_" + (loop > 3 ? (loop + 2) : loop)].length; i++) {
			      	if (loop > 3) {
			      		if(!data[x - 1].name) {
				      		data[x - 1].name = "..."
				      	}

			       		// this["user_" + (loop + 2) + "_name"].text = "user_id_" + data[x - 1].id;
			       		// this["user_" + (loop + 2) + "_name"].text = data[x - 1].name;
			       		if(data[x - 1].name.split("").length > 3) {
				       		this["user_" + (loop + 2) + "_name"].text = data[x - 1].name.substr(0,3) + "***";
			       		} else {
			       			this["user_" + (loop + 2) + "_name"].text = data[x - 1].name;
			       		}

			       		this["user_" + (loop + 2) + "_name"].user_name = data[x - 1].name;
			       		this["user_" + (loop + 2) + "_name"].user_id = data[x - 1].id;
			       		this["user_" + (loop + 2)+"_bet"].text  = "0"

			       		if (!data[x - 1].bets.length) {
			        		continue;
			       		}

			       		data[x - 1].bets.forEach((row) => {
			        		if (this["user_" + (loop + 2)][i].betarea == row.bet) {
			        			this["user_" + (loop + 2)][i].alpha = 1;
			        			this["user_" + (loop + 2)][i].set = true;

								let calc = (parseInt(row.bet_amount) / parseInt(row.currencyMultiplier ? row.currencyMultiplier : 1 ))
								row.bet_amount = (calc/parseInt(row.userMultiplier ? row.userMultiplier : 1) * window.currencyMultiplier) * window.userMultiplier

			         			this["user_" + (loop + 2)+"_bet"].text = numberWithCommas(row.bet_amount);
			        			this.changeCurrentChips(row.bet_amount, this["user_" + (loop + 2)][i]);
			        		}
			       		});
			      }
			      else {
			      		if(!data[x - 1].name) {
				      		data[x - 1].name = "..."
				      	}

				       		if(data[x - 1].name.split("").length > 3) {
				       			this["user_" + loop + "_name"].text = data[x - 1].name.substr(0,3) + "***";
				       		} else {
				       			this["user_" + loop + "_name"].text = data[x - 1].name;
				       		}

				       		this["user_" + loop + "_name"].user_name = data[x - 1].name;
				       		this["user_" + loop + "_name"].user_id = data[x - 1].id;

			       			this["user_" + loop+"_bet"].text  = "0"

			       			if (!data[x - 1].bets.length) {
			        			continue;
			       			}

			       			data[x - 1].bets.forEach((row) => {
			        			if (this["user_" + loop][i].betarea == row.bet) {
			         				this["user_" + loop][i].alpha = 1;
			         				this["user_" + loop][i].set = true;

									let calc = (parseInt(row.bet_amount) / parseInt(row.currencyMultiplier ? row.currencyMultiplier : 1 ))
									row.bet_amount = (calc/parseInt(row.userMultiplier ? row.userMultiplier : 1) * window.currencyMultiplier) * window.userMultiplier

			         				this["user_" + loop+"_bet"].text = numberWithCommas(row.bet_amount);
			        				this.changeCurrentChips(row.bet_amount, this["user_" + loop][i]);
			    				}
			    			});
			    		}
			    	}
			    }
			} // end for
		},
		cancelBet (data) {
			if(isSuperSix()) {
				if(data.data[0].range != window.range + "_supersix") return;
			} else if(isDragonBonus()) {
				if(data.data[0].range != window.range + "_bonus") return;
			} else {
				if(data.data[0].range != window.range) return;
			}
			let seat_num = this.checkUser(data.data[0]);

			this["user_" + seat_num+"_bet"].text = 0;

			this["user_"+seat_num+"_name"].total_bet = 0;

			this["user_"+seat_num].forEach((e) => {
				e.alpha =  0.05;
				e.chips.forEach((chip)=> {
					this.chips_container.removeChild(chip);
				});
				setTimeout(() => {
					e.chips = [];
				}, 500)
			})

		},
		toRemovePlayer : [],
		roomEvent (data) {
			if(data.id == window.userId) return;

			let seat_num = 0;

			if(data.type == 'join') {
				seat_num = this.checkUser(data.data);
				this["user_"+seat_num+"_name"].user_name = data.data.name;
				this["user_"+seat_num+"_name"].user_id = data.data.userId;
				// this["user_"+seat_num+"_name"].user_id = data.data.id;

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

	       		this["user_" + seat_num + "_name"].text = "";

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

			if('id' in user) {
				id = user.id
			} else {
				id = user.userId
			}

			for(var e = 0; e < 8; e++) {
				u_count ++;

				if(u_count!=4 && u_count!=5) {
					if(this["user_"+u_count+"_name"].user_id == id) {
						return u_count;
					}
				}
			}

			for(var e = 0; e < 8; e++) {
				u_count2 ++;

				if(u_count2!=4 && u_count2!=5) {

					if(!this["user_"+u_count2+"_name"].user_id || !('user_id' in this["user_"+u_count2+"_name"]) ){
						this["user_"+u_count2+"_name"].user_name = user.name;
						this["user_"+u_count2+"_name"].user_id = id;
						return u_count2;
					}
				}
			}
		},
		setMultiplayer (data) {
			if(data.id == window.userId) return;

			let u_count = 0;
			let seat_num = data.seat+1;
			let bet_amt = 0;

			if(seat_num == 4) {
				seat_num += 2;
			}
			if(seat_num == 5) {
				seat_num += 2;
			}

			seat_num = this.checkUser(data.data[0]);
			this["user_"+seat_num+"_name"].total_bet = 0;

			for(var i = 0; i < data.data.length; i++ ) {

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
		changeCurrentChips(amount,betArea) {
      let avail_chips = [];
      let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
				// if(!isSuperSix() && betArea.betarea != "supersix")
				// {
				// 	avail_chips.push({'chip': chipArr[i], 'value': chipVal});
				// }
			}

	      	//Chip container init and stacking
	      	let posX = betArea.x + betArea.getTransformedBounds().width / 2;
			let posY = (betArea.y + betArea.getTransformedBounds().height / 2);

			if(isSuperSix())
			{
				posY += 5;
			}
			if(isDragonBonus())
			{
				posY -= 5;
        if (betArea.betarea == 'bankerpair' || betArea.betarea == 'playerpair') {
          return;
        }
			}


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
		        instance.gotoAndStop(betArea.chip_anim_toPlay);

		        chipDataCon = new createjs.Container();
		        chipDataCon.x = posX;
		        chipDataCon.y = posY - chips.length * 2;
		        //chipDataCon.scaleX = chipDataCon.scaleY = 0.6;
				chipDataCon.chip_amt = chips[x].value;
				chipDataCon.scaleX = chipDataCon.scaleY = betArea.chip_drop_scale;

		        chipDataCon.addChild(instance);

		        instanceMask = new createjs.Shape();
		        instanceMask.graphics.beginFill('#e1e9ff').drawCircle(0, 0, 25);
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
				this.chips_container.addChild(chipDataCon);
			} //end for
		},
		reset () {
			this.chips_container.removeAllChildren();
			for(var x = 1; x <=8; x++) {
				if(x!=4 && x!=5) {
					for(var  i =0; i < this["user_"+x].length; i++) {
						this["user_"+x][i].chips = [];
						this["user_"+x][i].alpha =  0.05;

						createjs.Tween.removeTweens(this["user_"+x][i]);

						if(!this["user_" +x+ "_name"].user_id) {
							this["user_"+x+"_bet"].text = "";
						} else {
							this["user_"+x+"_bet"].text = "0";
						}
						this["user_"+x+"_name"].total_bet = 0;
					}
				}
			}
		},
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
			let loop = 0;

			for (var x = 0; x < 6; x++) {
				loop++;

			    for (var i = 0; i < this["user_" + (loop > 3 ? (loop + 2) : loop)].length; i++) {
					let betArea = [];
					let totalBet = 0;

			    	if (loop > 3) {
			    		betArea = this["user_" + (loop + 2)][i];
				    }
				    else {
			    		betArea = this["user_" + (loop)][i];
				    }

				    for (var j = 0; j < winning.length; j++) {
			          	if (betArea.betarea == winning[j]) {
			    			if (betArea.chips.length) {
					          	betArea.chips.forEach((e) => {
			            			totalBet += e.chip_amt;
					          	});

					          	this.createWinningChips(totalBet, betArea);
					        }
			          	} //end of checking bet area win
			      	} //end of  bet area loop
			    }
		  	}
		},
		loseTableChipsAnimation(chips) {
	      	let posX = (this.context.stage.baseWidth / 2) - 100;
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
	    createWinningChips(amount, betArea) {
	      	if (this.isTie) {
	        	if (betArea.betarea == 'player' || betArea.betarea == 'banker') {
	          		return;
	        	}
	      	}

	      	let avail_chips = [];
      let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
			}

	      	let chips = [];
	      	let winnings = parseInt(amount * betArea.payout_multiplier);
	      	let chipsfrombanker = winnings;

	     	//Chip container init and stacking
			 let posX = betArea.x + betArea.getTransformedBounds().width / 2;
			 let posY = (betArea.y + betArea.getTransformedBounds().height / 2);

			 if(betArea.betarea == "playerpair" || betArea.betarea == "bankerpair")
			 {
				posX -= 35;
			 }
			 else
			 {
				 posX -= 65;
			 }

			 if(isSuperSix())
			 {
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
		        chipDataCon.y = posY;
		        chipDataCon.alpha = 0;
		        chipDataCon.scaleX = chipDataCon.scaleY = betArea.chip_drop_scale;
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

		        // switch(betArea.table_name) {
		        //     case "bankerpair":
		        //         instanceTxt.skewX = -15;
		        //         instanceTxt.skewY = 1;
		        //         break;

		        //     case "playerpair":
		        //         instanceTxt.skewX = 15;
		        //         instanceTxt.skewY = -1;
		        //         break;
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
