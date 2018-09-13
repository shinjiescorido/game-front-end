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
		currentBet : [],
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

			let default_color = "rgba(0,0,0,0.01)";
			let dragonbonus_color = "rgba(153, 101, 21, 1)"; //#996515
			let dgbdef2 = "rgba(153, 101, 21, 0.01)"; //#996515
			let adjustX = 65;
			let adjustY = 18;
			let table_img = this.drawTableOutline();

			if (window.tableNum == 3 || window.tableNum == 5 || window.tableNum == 8 || window.tableNum == 7) {
				adjustX = 68;
			}
			else if (window.tableNum == 4) {
				adjustX = 70;
			}
			else if(window.tableNum == 6 || window.tableNum == 10) {
				adjustX = 67.5;
			}
			else if(window.tableNum == 9) {
				adjustX = 70;
			}

			if (window.tableNum == 3) {
				// adjustY += 10;
			}

			this.bet_areas[0] =  new createjs.Shape();
			this.bet_areas[0].graphics.beginFill(default_color).moveTo(0,0).lineTo(166,0).lineTo(172,39).lineTo(-4,39).lineTo(0,0);
			this.bet_areas[0].x = 485;
			this.bet_areas[0].y = 480;
			this.bet_areas[0].table_name = "player";
			this.bet_areas[0].setBounds(0,0,166,25);
			this.bet_areas[0].min_betAmt = mainAreaMin;
			this.bet_areas[0].max_betAmt = mainAreaMax;
			this.bet_areas[0].payout_multiplier = 1;

			this.bet_areas[0].dropped_state = function (e,x) {
				e.graphics.clear().beginFill('#1565c0').moveTo(0,0).lineTo(166,0).lineTo(172,39).lineTo(-4,39).lineTo(0,0);
			}

			this.bet_areas[0].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.bet_areas[0].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(166,0).lineTo(172,39).lineTo(-4,39).lineTo(0,0);
			}

			this.bet_areas[1] =  new createjs.Shape();
			this.bet_areas[1].graphics.beginFill(default_color).moveTo(0,0).lineTo(145,0).lineTo(150,30).lineTo(-5,30).lineTo(0,0);
			this.bet_areas[1].x = 496;
			this.bet_areas[1].y = 415;
			this.bet_areas[1].table_name = "tie";
			this.bet_areas[1].setBounds(0,0,145,15);
			this.bet_areas[1].min_betAmt = tieMin;
			this.bet_areas[1].max_betAmt = tieMax;
			this.bet_areas[1].payout_multiplier = 8;

			this.bet_areas[1].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill('#689f38').moveTo(0,0).lineTo(145,0).lineTo(150,30).lineTo(-5,30).lineTo(0,0);
			}

			this.bet_areas[1].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.bet_areas[1].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(145,0).lineTo(150,30).lineTo(-5,30).lineTo(0,0);
			}

			this.bet_areas[2] =  new createjs.Shape();
			this.bet_areas[2].graphics.beginFill(default_color).moveTo(0,0).lineTo(155,0).lineTo(160,36).lineTo(-5,36).lineTo(0,0);
			this.bet_areas[2].x = 491;
			this.bet_areas[2].y = 445 ;
			this.bet_areas[2].table_name = "banker";
			this.bet_areas[2].setBounds(0,0,155,22);
			this.bet_areas[2].min_betAmt = mainAreaMin;
			this.bet_areas[2].max_betAmt = mainAreaMax;
			this.bet_areas[2].payout_multiplier = isSuperSix() ? 1 : 0.95;

			this.bet_areas[2].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill('#d12f2f').moveTo(0,0).lineTo(155,0).lineTo(160,36).lineTo(-5,36).lineTo(0,0);
			}

			this.bet_areas[2].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.bet_areas[2].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(155,0).lineTo(160,36).lineTo(-5,36).lineTo(0,0);
			}

			this.bet_areas[3] =  new createjs.Shape();
			this.bet_areas[3].graphics.beginFill(default_color).moveTo(0,3).lineTo(78,3).lineTo(72,18).lineTo(-10,18).lineTo(0,3);
			this.bet_areas[3].x = 335;
			this.bet_areas[3].y = 368;
			this.bet_areas[3].table_name = "playerpair";
			this.bet_areas[3].setBounds(0,0,73,0);
			this.bet_areas[3].min_betAmt = pairMin;
			this.bet_areas[3].max_betAmt = pairMax;
			this.bet_areas[3].payout_multiplier = 11

			this.bet_areas[3].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill('#1565c0').moveTo(0,3).lineTo(78,3).lineTo(72,18).lineTo(-10,18).lineTo(0,3);
			}

			this.bet_areas[3].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.bet_areas[3].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,3).lineTo(78,3).lineTo(72,18).lineTo(-10,18).lineTo(0,3);
			}


			this.bet_areas[4] =  new createjs.Shape();
			this.bet_areas[4].graphics.beginFill(default_color).moveTo(0,3).lineTo(78,3).lineTo(100,18).lineTo(18,18).lineTo(0,3);
			this.bet_areas[4].x = 950;
			this.bet_areas[4].y = 368;
			this.bet_areas[4].table_name = "bankerpair";
			this.bet_areas[4].setBounds(0,0,100,0);
			this.bet_areas[4].min_betAmt = pairMin;
			this.bet_areas[4].max_betAmt = pairMax;
			this.bet_areas[4].payout_multiplier = 11

			this.bet_areas[4].dropped_state =  function (e,x) {
				e.graphics.clear().beginFill('#d12f2f').moveTo(0,3).lineTo(78,3).lineTo(100,18).lineTo(18,18).lineTo(0,3);
			}

			this.bet_areas[4].win_state =  function (e) {
				e.dropped_state(e);
			}

			this.bet_areas[4].normal_state =  function (e) {
				e.graphics.clear().beginFill(default_color).moveTo(0,3).lineTo(78,3).lineTo(100,18).lineTo(18,18).lineTo(0,3);
			}

			if (isSuperSix()) {
				this.bet_areas[0].graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(166,0).lineTo(172,34).lineTo(-4,34).lineTo(0,0);
				this.bet_areas[0].x = 485;
				this.bet_areas[0].y = 485;
				this.bet_areas[0].setBounds(0,0,166,25);

				this.bet_areas[0].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill('#1565c0').moveTo(0,0).lineTo(166,0).lineTo(172,34).lineTo(-4,34).lineTo(0,0);
				}

				this.bet_areas[0].win_state =  function (e) {
					e.dropped_state(e);
				}

				this.bet_areas[0].normal_state =  function (e) {
					e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(166,0).lineTo(172,34).lineTo(-4,34).lineTo(0,0);
				}

				this.bet_areas[1].graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(139,0).lineTo(143,25).lineTo(-5,25).lineTo(0,0);
				this.bet_areas[1].x = 499;
				this.bet_areas[1].y = 403;
				this.bet_areas[1].setBounds(0,0,139,15);

				this.bet_areas[1].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill('#689f38').moveTo(0,0).lineTo(139,0).lineTo(143,25).lineTo(-5,25).lineTo(0,0);
				}

				this.bet_areas[1].win_state =  function (e) {
					e.dropped_state(e);
				}

				this.bet_areas[1].normal_state =  function (e) {
					e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(139,0).lineTo(143,25).lineTo(-5,25).lineTo(0,0);
				}

				this.bet_areas[2].graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(155,0).lineTo(160,30).lineTo(-5,30).lineTo(0,0);
				this.bet_areas[2].x = 491;
				this.bet_areas[2].y = 455 ;
				this.bet_areas[2].setBounds(0,0,155,22);

				this.bet_areas[2].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill('#d12f2f').moveTo(0,0).lineTo(155,0).lineTo(160,30).lineTo(-5,30).lineTo(0,0);
				}

				this.bet_areas[2].win_state =  function (e) {
					e.dropped_state(e);
				}

				this.bet_areas[2].normal_state =  function (e) {
					e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(155,0).lineTo(160,30).lineTo(-5,30).lineTo(0,0);
				}

				this.bet_areas[3].graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(75,0).lineTo(69,13).lineTo(-8,13).lineTo(0,0);
				this.bet_areas[3].x = 343;
				this.bet_areas[3].y = 371;
				this.bet_areas[3].setBounds(0,0,71,0);

				this.bet_areas[3].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill('#1565c0').moveTo(0,0).lineTo(75,0).lineTo(69,13).lineTo(-8,13).lineTo(0,0);
				}

				this.bet_areas[3].win_state =  function (e) {
					e.dropped_state(e);
				}

				this.bet_areas[3].normal_state =  function (e) {
					e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(75,0).lineTo(69,13).lineTo(-8,13).lineTo(0,0);
				}

				this.bet_areas[4].graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(73,0).lineTo(85,12).lineTo(13,12).lineTo(0,0);
				this.bet_areas[4].x = 938;
				this.bet_areas[4].y = 371;
				this.bet_areas[4].setBounds(0,0,98,0);

				this.bet_areas[4].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill('#d12f2f').moveTo(0,0).lineTo(73,0).lineTo(85,12).lineTo(13,12).lineTo(0,0);
				}

				this.bet_areas[4].win_state =  function (e) {
					e.dropped_state(e);
				}

				this.bet_areas[4].normal_state =  function (e) {
					e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(73,0).lineTo(85,12).lineTo(13,12).lineTo(0,0);
				}

				/* -------------------------------------------- supersix drawing -------------------------------- */
				this.bet_areas[5] =  new createjs.Shape();
				this.bet_areas[5].graphics.beginFill(default_color).beginFill(default_color).moveTo(0,0).lineTo(147,0).lineTo(151,26).lineTo(-5,26).lineTo(0,0);
				this.bet_areas[5].x = 495;
				this.bet_areas[5].y = 428;
				this.bet_areas[5].table_name = "supersix";
				this.bet_areas[5].setBounds(0,0,145,20);
				this.bet_areas[5].min_betAmt = superMin;
				this.bet_areas[5].max_betAmt = superMax;
				this.bet_areas[5].payout_multiplier = 12;

				this.bet_areas[5].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill('#996515').moveTo(0,0).lineTo(147,0).lineTo(151,26).lineTo(-5,26).lineTo(0,0);
				}

				this.bet_areas[5].win_state =  function (e) {
					e.dropped_state(e);
				}

				this.bet_areas[5].normal_state =  function (e) {
					e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(147,0).lineTo(151,26).lineTo(-5,26).lineTo(0,0);
				}

				this.bet_areas[5].visible = isSuperSix();

				/* -------------------------------------------- supersix drawing -------------------------------- */
			}

			if(isDragonBonus()){
				this.bet_areas[3].graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(70,0).bezierCurveTo(120,6,83,33,60,33).lineTo(-27,33).bezierCurveTo(15,28,0,0,0,0);
				this.bet_areas[3].x = 335;
				this.bet_areas[3].y = 368;
				this.bet_areas[3].setBounds(0,0,80,10);

				this.bet_areas[3].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill('#1565c0').moveTo(0,0).lineTo(70,0).bezierCurveTo(120,6,83,33,60,33).lineTo(-27,33).bezierCurveTo(15,28,0,0,0,0);
				}

				this.bet_areas[3].win_state =  function (e) {
					e.dropped_state(e);
				}

				this.bet_areas[3].normal_state =  function (e) {
					e.graphics.clear().beginFill(default_color).moveTo(0,0).lineTo(70,0).bezierCurveTo(120,6,83,33,60,33).lineTo(-27,33).bezierCurveTo(15,28,0,0,0,0);
				}

				this.bet_areas[4].graphics.clear().beginFill(default_color).moveTo(12,33).bezierCurveTo(-30,28,-32,2,0,0).lineTo(75, 0).bezierCurveTo(60,16,85,35,98,33).lineTo(12,33);
				this.bet_areas[4].x = 738;
				this.bet_areas[4].y = 368;
				this.bet_areas[4].setBounds(0,0,60,10);

				this.bet_areas[4].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill('#d12f2f').moveTo(12,33).bezierCurveTo(-30,28,-32,2,0,0).lineTo(75, 0).bezierCurveTo(60,16,85,35,98,33).lineTo(12,33);
				}

				this.bet_areas[4].win_state =  function (e) {
					e.dropped_state(e);
				}

				this.bet_areas[4].normal_state =  function (e) {
					e.graphics.clear().beginFill(default_color).moveTo(12,33).bezierCurveTo(-30,28,-32,2,0,0).lineTo(75, 0).bezierCurveTo(60,16,85,35,98,33).lineTo(12,33);
				}

				this.bet_areas[5] = new createjs.Shape();
				this.bet_areas[5].graphics.beginFill(default_color).moveTo(-25,33).bezierCurveTo(-60,30,-46,8,0,0).lineTo(80, 0).bezierCurveTo(35,16,60,33,62,33).lineTo(12,33);
				this.bet_areas[5].x = 182;
				this.bet_areas[5].y = 370;
				this.bet_areas[5].setBounds(0,0,25,10);
				this.bet_areas[5].table_name = "big";
				this.bet_areas[5].min_bet = sizeMin;
				this.bet_areas[5].max_bet = sizeMax;
				this.bet_areas[5].payout_multiplier = .54;

				this.bet_areas[5].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill('#d12f2f').moveTo(-25,33).bezierCurveTo(-60,30,-46,8,0,0).lineTo(80, 0).bezierCurveTo(35,16,60,33,62,33).lineTo(12,33);
					e.alpha = 1
				}


				this.bet_areas[5].hover_state =  function (e,x) {
					e.graphics.clear().beginFill('#d12f2f').moveTo(-25,33).bezierCurveTo(-60,30,-46,8,0,0).lineTo(80, 0).bezierCurveTo(35,16,60,33,62,33).lineTo(12,33);
					e.alpha = 0.5
				}

				this.bet_areas[5].win_state =  function (e) {
					e.dropped_state(e);
					e.alpha = 1
				}

				this.bet_areas[5].normal_state =  function (e) {
					e.graphics.clear().beginFill(default_color).moveTo(-25,33).bezierCurveTo(-60,30,-46,8,0,0).lineTo(80, 0).bezierCurveTo(35,16,60,33,62,33).lineTo(12,33);
					e.alpha = 1
				}

				this.bet_areas[6] = new createjs.Shape();
				this.bet_areas[6].graphics.beginFill(dgbdef2).moveTo(0,0).lineTo(81,0).bezierCurveTo(145,12,124,33,110,33).lineTo(18,33).bezierCurveTo(46,20,8,4,0,0);
				this.bet_areas[6].x = 882;
				this.bet_areas[6].y = 370;
				this.bet_areas[6].setBounds(0,0,130,10);
				this.bet_areas[6].table_name = "small";
				this.bet_areas[6].min_bet = sizeMin;
				this.bet_areas[6].max_bet = sizeMax;
				this.bet_areas[6].payout_multiplier = 1.5;

				this.bet_areas[6].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill(dragonbonus_color).moveTo(0,0).lineTo(81,0).bezierCurveTo(145,12,124,33,110,33).lineTo(18,33).bezierCurveTo(46,20,8,4,0,0);
					e.alpha = 1
				}


				this.bet_areas[6].hover_state =  function (e,x) {
					e.graphics.clear().beginFill(dragonbonus_color).moveTo(0,0).lineTo(81,0).bezierCurveTo(145,12,124,33,110,33).lineTo(18,33).bezierCurveTo(46,20,8,4,0,0);
					e.alpha = 0.5
				}

				this.bet_areas[6].win_state =  function (e) {
					e.dropped_state(e);
					e.alpha = 1
				}

				this.bet_areas[6].normal_state =  function (e) {
					e.graphics.clear().beginFill(dgbdef2).moveTo(0,0).lineTo(81,0).bezierCurveTo(145,12,124,33,110,33).lineTo(18,33).bezierCurveTo(46,20,8,4,0,0);
					e.alpha = 1
				}

				this.bet_areas[7] = new createjs.Shape();
				// this.bet_areas[7].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(150,0).lineTo(280,152).lineTo(115,152).lineTo(0,0);
				this.bet_areas[7].graphics.beginFill(dgbdef2).moveTo(0,0).drawEllipse(0,0,92, 47);
				this.bet_areas[7].x = 247;
				this.bet_areas[7].y = 366;
				this.bet_areas[7].setBounds(0,0,65,20);
				this.bet_areas[7].table_name = "bonus_player";
				this.bet_areas[7].min_bet = bonusMin;
				this.bet_areas[7].max_bet = bonusMax;
				this.bet_areas[7].skewX = 29;
				this.bet_areas[7].payout_multiplier = 12;

				this.bet_areas[7].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill(dragonbonus_color).moveTo(0,0).drawEllipse(0,0,92, 47);
					e.alpha = 1
				}

				this.bet_areas[7].hover_state =  function (e,x) {
					e.graphics.clear().beginFill(dragonbonus_color).moveTo(0,0).drawEllipse(0,0,92, 47);
					e.alpha = 0.5
				}

				this.bet_areas[7].win_state =  function (e) {
					e.dropped_state(e);
					e.alpha = 1
				}

				this.bet_areas[7].normal_state =  function (e) {
					e.graphics.clear().beginFill(dgbdef2).moveTo(0,0).drawEllipse(0,0,92, 47);
				}

				this.bet_areas[8] = new createjs.Shape();
				// this.bet_areas[7].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(150,0).lineTo(280,152).lineTo(115,152).lineTo(0,0);
				this.bet_areas[8].graphics.beginFill(dgbdef2).moveTo(0,0).drawEllipse(0,0,92, 47);
				this.bet_areas[8].x = 805;
				this.bet_areas[8].y = 366;
				this.bet_areas[8].setBounds(0,0,110,20);
				this.bet_areas[8].table_name = "bonus_banker";
				this.bet_areas[8].min_bet = bonusMin;
				this.bet_areas[8].max_bet = bonusMax;
				this.bet_areas[8].skewX = -29;
				this.bet_areas[8].payout_multiplier = 12;

				this.bet_areas[8].dropped_state =  function (e,x) {
					e.graphics.clear().beginFill(dragonbonus_color).moveTo(0,0).drawEllipse(0,0,92, 47);
					e.alpha = 1
				}

				this.bet_areas[8].hover_state =  function (e,x) {
					e.graphics.clear().beginFill(dragonbonus_color).moveTo(0,0).drawEllipse(0,0,92, 47);
					e.alpha = 0.5
				}

				this.bet_areas[8].win_state =  function (e) {
					e.dropped_state(e);
					e.alpha = 1
				}

				this.bet_areas[8].normal_state =  function (e) {
					e.graphics.clear().beginFill(dgbdef2).moveTo(0,0).drawEllipse(0,0,92, 47);
				}
			}

			for(var x = 0; x < this.bet_areas.length; x++ ) {
				this.addChild(this.bet_areas[x]);
				this.addChild(table_img);

				this.bet_areas[x].multiplayer = true;
				this.bet_areas[x].visible = true;
				this.bet_areas[x].chip_anim_toPlay = 2;
				this.bet_areas[x].chip_drop_scale = 1;
				this.bet_areas[x].chips = []

				this.bet_areas[x].x += adjustX
				this.bet_areas[x].y += (adjustY - 2)

				table_img.hitArea = this.bet_areas[x];
			}

			// === user bets
			let color_def2 = "rgba(255,255,255,0.4)";

			// ==== player 1
			this.user_1[0] = new createjs.Shape();
			this.user_1[0].x = 160 - 80 -14;
			this.user_1[0].graphics.beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,60,30).moveTo(0,0).lineTo(140,0).lineTo(118,30).lineTo(-32,30).lineTo(0,0);
			this.user_1[0].setBounds(0,0,100,10);
			this.user_1[0].y = 414;
			this.user_1[0].betarea = "tie";
			this.user_1[0].alpha = 1;
			this.user_1[0].chips = [];
			this.user_1[0].payout_multiplier = 8;
			this.addChild(this.user_1[0]);

			this.user_1[1] = new createjs.Shape();
			this.user_1[1].x = 60;
			this.user_1[1].graphics.beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,60,30).moveTo(0,0).lineTo(142,0).lineTo(120,28).lineTo(-32,28).lineTo(0,0);
			this.user_1[1].setBounds(0,0,100,15);
			this.user_1[1].y = 425;
			this.user_1[1].betarea = "supersix";
			this.user_1[1].alpha = 1;
			this.user_1[1].chips = [];
			this.user_1[1].payout_multiplier = 12;
			this.user_1[1].visible = isSuperSix();
			this.addChild(this.user_1[1]);

			this.user_1[2] = new createjs.Shape();
			this.user_1[2].graphics.beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,50,40).moveTo(0,0).lineTo(149,0).lineTo(123,34).lineTo(-36,34).lineTo(0,0);
			this.user_1[2].setBounds(0,0,100,17);
			this.user_1[2].x = 35;
			this.user_1[2].y = 443;
			this.user_1[2].betarea = "banker";
			this.user_1[2].alpha = 1;
			this.user_1[2].chips = [];
			this.user_1[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			this.addChild(this.user_1[2]);

			this.user_1[3] = new createjs.Shape();
			this.user_1[3].graphics.beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,40,45).moveTo(0,-1).lineTo(162,0).lineTo(135,38).lineTo(-44,38).lineTo(0,0);
			this.user_1[3].setBounds(0,0,100,25);
			this.user_1[3].x = -5;
			this.user_1[3].y = 478;
			this.user_1[3].betarea = "player";
			this.user_1[3].alpha = 1;
			this.user_1[3].chips = [];
			this.user_1[3].payout_multiplier = 1;
			this.addChild(this.user_1[3]);

			this.user_1[4] = new createjs.Shape();
			this.user_1[4].graphics.beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,40,16).moveTo(0,-1).lineTo(70,0).lineTo(55,16).lineTo(-22,16).lineTo(0,0);
			this.user_1[4].setBounds(0,0,50,0);
			this.user_1[4].x = 112;
			this.user_1[4].y = 370;
			this.user_1[4].betarea = "playerpair";
			this.user_1[4].alpha = 1;
			this.user_1[4].chips = [];
			this.user_1[4].payout_multiplier = 11;
			this.user_1[4].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_1[4]);

			this.user_1[5] = new createjs.Shape();
			this.user_1[5].graphics.beginFill(color_def2).moveTo(1,-1).lineTo(80,0).lineTo(89,16).lineTo(8,16).lineTo(1,0);
			this.user_1[5].setBounds(0,0,85,0);
			this.user_1[5].x = 720;
			this.user_1[5].y = 370;
			this.user_1[5].betarea = "bankerpair";
			this.user_1[5].alpha = 1;
			this.user_1[5].chips = [];
			this.user_1[5].payout_multiplier = 11;
			this.user_1[5].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_1[5]);

			// ==== player 2
			this.user_2[0] = new createjs.Shape();
			this.user_2[0].x = 205;
			this.user_2[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(146,0).lineTo(132,30).lineTo(-24,30).lineTo(0,0);
			this.user_2[0].setBounds(0,0,130,10);
			this.user_2[0].y = 414;
			this.user_2[0].betarea = "tie";
			this.user_2[0].alpha = 1;
			this.user_2[0].chips = [];
			this.user_2[0].payout_multiplier = 8;
			this.addChild(this.user_2[0]);

			this.user_2[1] = new createjs.Shape();
			this.user_2[1].x = 202;
			this.user_2[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(147,0).lineTo(134,28).lineTo(-22,28).lineTo(0,0);
			this.user_2[1].y = 425;
			this.user_2[1].setBounds(0,0,130,15);
			this.user_2[1].betarea = "supersix";
			this.user_2[1].alpha = 1;
			this.user_2[1].chips = [];
			this.user_2[1].payout_multiplier = 12;
			this.user_2[1].visible = isSuperSix();
			this.addChild(this.user_2[1]);

			this.user_2[2] = new createjs.Shape();
			this.user_2[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(158,0).lineTo(140,34).lineTo(-24,34).lineTo(0,0);
			this.user_2[2].x = 181;
			this.user_2[2].y = 444;
			this.user_2[2].setBounds(0,0,130,17);
			this.user_2[2].betarea = "banker";
			this.user_2[2].alpha = 1;
			this.user_2[2].chips = [];
			this.user_2[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			this.addChild(this.user_2[2]);

			this.user_2[3] = new createjs.Shape();
			this.user_2[3].graphics.beginFill(color_def2).moveTo(0,-1).lineTo(165,0).lineTo(150,38).lineTo(-26,38).lineTo(0,0);
			this.user_2[3].x = 156;
			this.user_2[3].y = 478;
			this.user_2[3].setBounds(0,0,130,25);
			this.user_2[3].betarea = "player";
			this.user_2[3].alpha = 1;
			this.user_2[3].chips = [];
			this.user_2[3].payout_multiplier = 1;
			this.addChild(this.user_2[3]);

			this.user_2[4] = new createjs.Shape();
			this.user_2[4].graphics.beginFill(color_def2).moveTo(0,-1).lineTo(81,0).lineTo(69,16).lineTo(-15,16).lineTo(0,0);
			this.user_2[4].setBounds(0,0,70,0);
			this.user_2[4].x = 181;
			this.user_2[4].y = 370;
			this.user_2[4].betarea = "playerpair";
			this.user_2[4].alpha = 1;
			this.user_2[4].chips = [];
			this.user_2[4].payout_multiplier = 11;
			this.user_2[4].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_2[4]);

			this.user_2[5] = new createjs.Shape();
			this.user_2[5].graphics.beginFill(color_def2).moveTo(1,-1).lineTo(76,0).lineTo(88,16).lineTo(10,16).lineTo(1,0);
			this.user_2[5].setBounds(0,0,90,0);
			this.user_2[5].x = 804 - 6;
			this.user_2[5].y = 370;
			this.user_2[5].betarea = "bankerpair";
			this.user_2[5].alpha = 1;
			this.user_2[5].chips = [];
			this.user_2[5].payout_multiplier = 11;
			this.user_2[5].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_2[5]);

			// ==== player 3
			this.user_3[0] = new createjs.Shape();
			this.user_3[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(145,0).lineTo(140,30).lineTo(-15,30).lineTo(0,0);
			this.user_3[0].x = 352;
			this.user_3[0].y = 414;
			this.user_3[0].setBounds(0,0,135,10);
			this.user_3[0].betarea = "tie";
			this.user_3[0].alpha = 1;
			this.user_3[0].chips = [];
			this.user_3[0].payout_multiplier = 8;
			this.addChild(this.user_3[0]);

			this.user_3[1] = new createjs.Shape();
			this.user_3[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(146,0).lineTo(142,28).lineTo(-13,28).lineTo(0,0);
			this.user_3[1].x = 349;
			this.user_3[1].y = 425;
			this.user_3[1].setBounds(0,0,135,15);
			this.user_3[1].betarea = "supersix";
			this.user_3[1].alpha = 1;
			this.user_3[1].chips = [];
			this.user_3[1].payout_multiplier = 12;
			this.user_3[1].visible = isSuperSix();
			this.addChild(this.user_3[1]);

			this.user_3[2] = new createjs.Shape();
			this.user_3[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(154,0).lineTo(148,34).lineTo(-15,34).lineTo(0,0);
			this.user_3[2].x = 338;
			this.user_3[2].y = 444;
			this.user_3[2].setBounds(0,0,135,17);
			this.user_3[2].betarea = "banker";
			this.user_3[2].alpha = 1;
			this.user_3[2].chips = [];
			this.user_3[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			this.addChild(this.user_3[2]);

			this.user_3[3] = new createjs.Shape();
			this.user_3[3].graphics.beginFill(color_def2).moveTo(0,-1).lineTo(167,0).lineTo(161,38).lineTo(-16,38).lineTo(0,0);
			this.user_3[3].x = 320;
			this.user_3[3].y = 478;
			this.user_3[3].setBounds(0,0,135,25);
			this.user_3[3].betarea = "player";
			this.user_3[3].alpha = 1;
			this.user_3[3].chips = [];
			this.user_3[3].payout_multiplier = 1;
			this.addChild(this.user_3[3]);

			this.user_3[4] = new createjs.Shape();
			this.user_3[4].graphics.beginFill(color_def2).moveTo(0,-1).lineTo(78,0).lineTo(68,16).lineTo(-10,16).lineTo(0,0);
			this.user_3[4].setBounds(0,0,70,0);
			this.user_3[4].x = 260;
			this.user_3[4].y = 370;
			this.user_3[4].betarea = "playerpair";
			this.user_3[4].alpha = 1;
			this.user_3[4].chips = [];
			this.user_3[4].payout_multiplier = 11;
			this.user_3[4].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_3[4]);

			this.user_3[5] = new createjs.Shape();
			this.user_3[5].graphics.beginFill(color_def2).moveTo(1,-1).lineTo(78,0).lineTo(94,17).lineTo(15,16).lineTo(1,0);
			this.user_3[5].setBounds(0,0,95,0);
			this.user_3[5].x = 876 - 4;
			this.user_3[5].y = 370;
			this.user_3[5].betarea = "bankerpair";
			this.user_3[5].alpha = 1;
			this.user_3[5].chips = [];
			this.user_3[5].payout_multiplier = 11;
			this.user_3[5].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_3[5]);

			// ==== player 6
			this.user_6[0] = new createjs.Shape();
			this.user_6[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(148,0).lineTo(160,30).lineTo(6,30).lineTo(0,0);
			this.user_6[0].x = 640;
			this.user_6[0].y = 414;
			this.user_6[0].setBounds(0,0,150,10);
			this.user_6[0].betarea = "tie";
			this.user_6[0].alpha = 0.5;
			this.user_6[0].chips = [];
			this.user_6[0].payout_multiplier = 8;
			this.addChild(this.user_6[0]);

			this.user_6[1] = new createjs.Shape();
			this.user_6[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(147,0).lineTo(159,28).lineTo(5,28).lineTo(0,0);
			this.user_6[1].x = 641;
			this.user_6[1].y = 425;
			this.user_6[1].setBounds(0,0,160,15);
			this.user_6[1].betarea = "supersix";
			this.user_6[1].alpha = 0.5;
			this.user_6[1].chips = [];
			this.user_6[1].payout_multiplier = 12;
			this.user_6[1].visible = isSuperSix();
			this.addChild(this.user_6[1]);


			this.user_6[2] = new createjs.Shape();
			this.user_6[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(156,0).lineTo(172,34).lineTo(7,34).lineTo(0,0);
			this.user_6[2].x = 644;
			this.user_6[2].y = 444;
			this.user_6[2].setBounds(0,0,170,17);
			this.user_6[2].betarea = "banker";
			this.user_6[2].alpha = 0.5;
			this.user_6[2].chips = [];
			this.user_6[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			this.addChild(this.user_6[2]);

			this.user_6[3] = new createjs.Shape();
			this.user_6[3].graphics.beginFill(color_def2).moveTo(0,-1).lineTo(166,0).lineTo(182,38).lineTo(5,38).lineTo(0,0);
			this.user_6[3].x = 650;
			this.user_6[3].y = 478;
			this.user_6[3].setBounds(0,0,180,25);
			this.user_6[3].betarea = "player";
			this.user_6[3].alpha = .5;
			this.user_6[3].chips = [];
			this.user_6[3].payout_multiplier = 1;
			this.addChild(this.user_6[3]);

			this.user_6[4] = new createjs.Shape();
			this.user_6[4].graphics.beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,40,20).moveTo(0,-1).lineTo(80,0).lineTo(62,20).lineTo(-26,20).lineTo(0,0);
			this.user_6[4].setBounds(0,0,60,0);
			this.user_6[4].x = 90;
			this.user_6[4].y = 386;
			this.user_6[4].betarea = "playerpair";
			this.user_6[4].alpha = .5;
			this.user_6[4].chips = [];
			this.user_6[4].payout_multiplier = 11;
			this.user_6[4].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_6[4]);

			this.user_6[5] = new createjs.Shape();
			this.user_6[5].graphics.beginFill(color_def2).moveTo(1,-1).lineTo(82,0).lineTo(92,20).lineTo(9,20).lineTo(1,0);
			this.user_6[5].setBounds(0,0,90,0);
			this.user_6[5].x = 725;
			this.user_6[5].y = 386;
			this.user_6[5].betarea = "bankerpair";
			this.user_6[5].alpha = .5;
			this.user_6[5].chips = [];
			this.user_6[5].payout_multiplier = 11;
			this.user_6[5].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_6[5]);

			// ==== player 7
			this.user_7[0] = new createjs.Shape();
			this.user_7[0].graphics.beginFill(color_def2).moveTo(0,0).lineTo(146,0).lineTo(170,30).lineTo(14,30).lineTo(0,0);
			this.user_7[0].x = 786;
			this.user_7[0].y = 414;
			this.user_7[0].setBounds(0,0,160,10);
			this.user_7[0].betarea = "tie";
			this.user_7[0].alpha = 0.6;
			this.user_7[0].chips = [];
			this.user_7[0].payout_multiplier = 8;
			this.addChild(this.user_7[0]);

			this.user_7[1] = new createjs.Shape();
			this.user_7[1].graphics.beginFill(color_def2).moveTo(0,0).lineTo(146,0).lineTo(168,28).lineTo(12,28).lineTo(0,0);
			this.user_7[1].x = 788;
			this.user_7[1].y = 425;
			this.user_7[1].setBounds(0,0,170,15);
			this.user_7[1].betarea = "supersix";
			this.user_7[1].alpha = 0.6;
			this.user_7[1].chips = [];
			this.user_7[1].payout_multiplier = 12;
			this.user_7[1].visible = isSuperSix();
			this.addChild(this.user_7[1]);

			this.user_7[2] = new createjs.Shape();
			this.user_7[2].graphics.beginFill(color_def2).moveTo(0,0).lineTo(156,0).lineTo(180,34).lineTo(16,34).lineTo(0,0);
			this.user_7[2].x = 800;
			this.user_7[2].y = 444;
			this.user_7[2].setBounds(0,0,180,17);
			this.user_7[2].betarea = "banker";
			this.user_7[2].alpha = 0.6;
			this.user_7[2].chips = [];
			this.user_7[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			this.addChild(this.user_7[2]);

			this.user_7[3] = new createjs.Shape();
			this.user_7[3].graphics.beginFill(color_def2).moveTo(0,-1).lineTo(162,0).lineTo(192,38).lineTo(16,38).lineTo(0,0);
			this.user_7[3].x = 816;
			this.user_7[3].y = 478;
			this.user_7[3].setBounds(0,0,190,25);
			this.user_7[3].betarea = "player";
			this.user_7[3].alpha = .6;
			this.user_7[3].chips = [];
			this.user_7[3].payout_multiplier = 1;
			this.addChild(this.user_7[3]);

			this.user_7[4] = new createjs.Shape();
			this.user_7[4].graphics.beginFill(color_def2).moveTo(0,-1).lineTo(80,0).lineTo(64,20).lineTo(-20,20).lineTo(0,0);
			this.user_7[4].setBounds(0,0,60,0);
			this.user_7[4].x = 170;
			this.user_7[4].y = 386;
			this.user_7[4].betarea = "playerpair";
			this.user_7[4].alpha = 0.6;
			this.user_7[4].chips = [];
			this.user_7[4].payout_multiplier = 11;
			this.user_7[4].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_7[4]);

			this.user_7[5] = new createjs.Shape();
			this.user_7[5].graphics.beginFill(color_def2).moveTo(1,-1).lineTo(80,0).lineTo(96,20).lineTo(12,20).lineTo(1,0);
			this.user_7[5].setBounds(0,0,100,0);
			this.user_7[5].x = 810 - 5;
			this.user_7[5].y = 386;
			this.user_7[5].betarea = "bankerpair";
			this.user_7[5].alpha = 0.6;
			this.user_7[5].chips = [];
			this.user_7[5].payout_multiplier = 11;
			this.user_7[5].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_7[5]);

			// ==== player 8
			this.user_8[0] = new createjs.Shape();
			this.user_8[0].graphics.beginLinearGradientFill([color_def2,"transparent"],[0,1],100,0,130,-30).moveTo(0,0).lineTo(182,0).lineTo(230,30).lineTo(24,30).lineTo(0,0);
			this.user_8[0].x = 930;
			this.user_8[0].y = 414;
			this.user_8[0].setBounds(0,0,142,10);
			this.user_8[0].betarea = "tie";
			this.user_8[0].alpha = .6;
			this.user_8[0].chips = [];
			this.user_8[0].payout_multiplier = 8;
			this.addChild(this.user_8[0]);

			this.user_8[1] = new createjs.Shape();
			this.user_8[1].graphics.beginLinearGradientFill([color_def2,"transparent"],[0,1],100,0,130,-30).moveTo(0,0).lineTo(140,0).lineTo(171,28).lineTo(22,28).lineTo(0,0);
			this.user_8[1].x = 934;
			this.user_8[1].y = 425;
			this.user_8[1].setBounds(0,0,147,15);
			this.user_8[1].betarea = "supersix";
			this.user_8[1].alpha = 1;
			this.user_8[1].chips = [];
			this.user_8[1].payout_multiplier = 12;
			this.user_8[1].visible = isSuperSix();
			this.addChild(this.user_8[1]);

			this.user_8[2] = new createjs.Shape();
			this.user_8[2].graphics.beginLinearGradientFill([color_def2,"transparent"],[0,1],110,0,135,-28).moveTo(0,0).lineTo(200,0).lineTo(250,34).lineTo(25,34).lineTo(0,0);
			this.user_8[2].x = 954;
			this.user_8[2].y = 444;
			this.user_8[2].setBounds(0,0,152,17);
			this.user_8[2].betarea = "banker";
			this.user_8[2].alpha = .6;
			this.user_8[2].chips = [];
			this.user_8[2].payout_multiplier = isSuperSix() ? 1 : 0.95;
			this.addChild(this.user_8[2]);

			this.user_8[3] = new createjs.Shape();
			this.user_8[3].graphics.beginLinearGradientFill([color_def2,"transparent"],[0,1],120,0,150,-34).moveTo(0,-1).lineTo(214,-1).lineTo(264,38).lineTo(30,38).lineTo(0,-1);
			this.user_8[3].x = 976;
			this.user_8[3].y = 478;
			this.user_8[3].setBounds(0,0,160,25);
			this.user_8[3].betarea = "player";
			this.user_8[3].alpha = .6;
			this.user_8[3].chips = [];
			this.user_8[3].payout_multiplier = 1;
			this.addChild(this.user_8[3]);

			this.user_8[4] = new createjs.Shape();
			this.user_8[4].graphics.beginFill(color_def2).moveTo(0,-1).lineTo(78,0).lineTo(68,20).lineTo(-18,20).lineTo(0,0);
			this.user_8[4].setBounds(0,0,65,0);
			this.user_8[4].x = 250;
			this.user_8[4].y = 386;
			this.user_8[4].betarea = "playerpair";
			this.user_8[4].alpha = .6;
			this.user_8[4].chips = [];
			this.user_8[4].payout_multiplier = 11;
			this.user_8[4].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_8[4]);

			this.user_8[5] = new createjs.Shape();
			this.user_8[5].graphics.beginFill(color_def2).moveTo(1,-1).lineTo(80,0).lineTo(100,20).lineTo(16,20).lineTo(1,0);
			this.user_8[5].setBounds(0,0,100,0);
			this.user_8[5].x = 884;
			this.user_8[5].y = 386;
			this.user_8[5].betarea = "bankerpair";
			this.user_8[5].alpha = .6;
			this.user_8[5].chips = [];
			this.user_8[5].payout_multiplier = 11;
			this.user_8[5].visible = isDragonBonus() ? false : true;
			this.addChild(this.user_8[5]);

			if(isSuperSix())
			{

				this.user_1[0].x = 88;
				this.user_1[0].graphics.clear().beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,60,30).moveTo(0,0).lineTo(134,0).lineTo(114,24).lineTo(-29,24).lineTo(0,0);
				this.user_1[0].y = 401;

				this.user_1[2].graphics.clear().beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,50,40).moveTo(0,0).lineTo(152,0).lineTo(127,30).lineTo(-35,30).lineTo(0,0);
				this.user_1[2].x = 28;
				this.user_1[2].y = 453;
				this.user_1[3].graphics.clear().beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,40,45).moveTo(0,0).lineTo(162,0).lineTo(134,34).lineTo(-40,34).lineTo(0,0);
				this.user_1[3].x = -5;
				this.user_1[3].y = 483;
				this.user_1[3].setBounds(0,0,100,20);

				this.user_1[4].graphics.clear().beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,40,20).moveTo(0,0).lineTo(70,0).lineTo(60,11).lineTo(-14,11).lineTo(0,0);
				this.user_1[4].x = 124;
				this.user_1[4].y = 370;

				this.user_1[5].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(74,0).lineTo(81,11).lineTo(5,11).lineTo(0,0);
				this.user_1[5].x = 717;
				this.user_1[5].y = 370;

				this.user_2[0].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(139,0).lineTo(127,24).lineTo(-20,24).lineTo(0,0);
				this.user_2[0].y = 401;
				this.user_2[0].x = 222;


				this.user_2[2].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(156,0).lineTo(141,30).lineTo(-25,30).lineTo(0,0);
				this.user_2[2].x = 180;
				this.user_2[2].y = 453;

				this.user_2[3].graphics.clear().beginFill(color_def2).moveTo(0,-1).lineTo(164,0).lineTo(148,34).lineTo(-28,34).lineTo(0,0);
				this.user_2[3].x = 157;
				this.user_2[3].y = 483;
				this.user_2[3].setBounds(0,0,130,20);

				this.user_2[4].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(74,0).lineTo(66,11).lineTo(-10,11).lineTo(0,0);
				this.user_2[4].x = 194;
				this.user_2[4].y = 370;

				this.user_2[5].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(75,0).lineTo(86,11).lineTo(7,11).lineTo(0,0);
				this.user_2[5].x = 791;
				this.user_2[5].y = 370;

				this.user_3[0].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(138,0).lineTo(134,24).lineTo(-12,24).lineTo(0,0);
				this.user_3[0].x = 361;
				this.user_3[0].y = 401;

				this.user_3[2].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(155,0).lineTo(150,30).lineTo(-15,30).lineTo(0,0);
				this.user_3[2].x = 336;
				this.user_3[2].y = 453;

				this.user_3[3].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(165,0).lineTo(160,34).lineTo(-16,34).lineTo(0,0);
				this.user_3[3].x = 321;
				this.user_3[3].y = 483;
				this.user_3[3].setBounds(0,0,135,20);

				this.user_3[4].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(75,0).lineTo(68,11).lineTo(-10,11).lineTo(0,0);
				this.user_3[4].x = 269;
				this.user_3[4].y = 370;

				this.user_3[5].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(72,0).lineTo(84,11).lineTo(9,11).lineTo(0,0);
				this.user_3[5].x = 867;
				this.user_3[5].y = 370;

				this.user_6[0].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(139,0).lineTo(150,24).lineTo(4,24).lineTo(0,0);
				this.user_6[0].x = 637;
				this.user_6[0].y = 401;

				this.user_6[2].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(155,0).lineTo(170,30).lineTo(5,30).lineTo(0,0);
				this.user_6[2].x = 646;
				this.user_6[2].y = 453;

				this.user_6[3].graphics.clear().beginFill(color_def2).moveTo(0,-1).lineTo(165,0).lineTo(181,34).lineTo(5,34).lineTo(0,0);
				this.user_6[3].x = 651;
				this.user_6[3].y = 483;
				this.user_6[3].setBounds(0,0,180,20);

				this.user_6[4].graphics.clear().beginLinearGradientFill(["transparent",color_def2],[0,1],0,0,45,20).moveTo(0,0).lineTo(73,0).lineTo(58,14).lineTo(-17,14).lineTo(0,0);
				this.user_6[4].x = 112;
				this.user_6[4].y = 381;

				this.user_6[5].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(77,0).lineTo(86,14).lineTo(7,14).lineTo(0,0);
				this.user_6[5].x = 720;
				this.user_6[5].y = 381;

				this.user_7[0].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(138,0).lineTo(159,24).lineTo(11,24).lineTo(0,0);
				this.user_7[0].x = 776;
				this.user_7[0].y = 401;

				this.user_7[2].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(156,0).lineTo(180,30).lineTo(15,30).lineTo(0,0);
				this.user_7[2].x = 801;
				this.user_7[2].y = 453;

				this.user_7[3].graphics.clear().beginFill(color_def2).moveTo(0,-1).lineTo(164,0).lineTo(192,34).lineTo(16,34).lineTo(0,0);
				this.user_7[3].x = 816;
				this.user_7[3].y = 483;
				this.user_7[3].setBounds(0,0,190,20);

				this.user_7[4].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(77,0).lineTo(64,14).lineTo(-13,14).lineTo(0,0);
				this.user_7[4].x = 184;
				this.user_7[4].y = 381;

				this.user_7[5].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(78,0).lineTo(86,14).lineTo(9,14).lineTo(0,0);
				this.user_7[5].x = 797;
				this.user_7[5].y = 381;

				this.user_8[0].graphics.clear().beginLinearGradientFill([color_def2,"transparent"],[0,1],100,0,130,-30).moveTo(0,0).lineTo(134,0).lineTo(161,24).lineTo(21,24).lineTo(0,0);
				this.user_8[0].x = 914;
				this.user_8[0].y = 401;

				this.user_8[2].graphics.clear().beginLinearGradientFill([color_def2,"transparent"],[0,1],110,0,135,-28).moveTo(0,0).lineTo(148,0).lineTo(181,30).lineTo(24,30).lineTo(0,0);
				this.user_8[2].x = 957;
				this.user_8[2].y = 453;

				this.user_8[3].graphics.clear().beginLinearGradientFill([color_def2,"transparent"],[0,1],120,0,150,-34).moveTo(0,0).lineTo(158,0).lineTo(195,34).lineTo(28,34).lineTo(0,0);
				this.user_8[3].x = 980;
				this.user_8[3].y = 483;
				this.user_8[3].setBounds(0,0,160,20);

				this.user_8[4].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(76,0).lineTo(68,14).lineTo(-13,14).lineTo(0,0);
				this.user_8[4].x = 261;
				this.user_8[4].y = 381;

				this.user_8[5].graphics.clear().beginFill(color_def2).moveTo(0,0).lineTo(78,0).lineTo(93,14).lineTo(13,14).lineTo(0,0);
				this.user_8[5].x = 872;
				this.user_8[5].y = 381;
			}

			let user_1_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_1_icon.x = 70;
			user_1_icon.y = 525;
			user_1_icon.scaleX = user_1_icon.scaleY = 0.5;
			this.addChild(user_1_icon);

			let user_2_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_2_icon.x = 200;
			user_2_icon.y = 525;
			user_2_icon.scaleX = user_2_icon.scaleY = 0.5;
			this.addChild(user_2_icon);

			let user_3_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_3_icon.x = 400;
			user_3_icon.y = 525;
			user_3_icon.scaleX = user_3_icon.scaleY = 0.5;
			this.addChild(user_3_icon);

			let user_6_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_6_icon.x = 730;
			user_6_icon.y = 525;
			user_6_icon.scaleX = user_6_icon.scaleY = 0.5;
			this.addChild(user_6_icon);

			let user_7_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_7_icon.x = 920;
			user_7_icon.y = 525;
			user_7_icon.scaleX = user_7_icon.scaleY = 0.5;
			this.addChild(user_7_icon);

			let user_8_icon = new createjs.Bitmap(this.context.getResources("user_icon"));
			user_8_icon.x = 1100;
			user_8_icon.y = 525;
			user_8_icon.scaleX = user_8_icon.scaleY = 0.5;
			this.addChild(user_8_icon);

			this.user_1_name = new createjs.Text("","16px lato","#fff");
			this.user_1_name.x = user_1_icon.x - 15;
			this.user_1_name.y = user_1_icon.y + 18;
			this.user_1_name.total_bet = 0;
			this.addChild(this.user_1_name);

			this.user_2_name = new createjs.Text("","16px lato","#fff");
			this.user_2_name.x = user_2_icon.x + 0;
			this.user_2_name.y = user_2_icon.y  + 18;
			this.user_2_name.total_bet = 0;
			this.addChild(this.user_2_name);

			this.user_3_name = new createjs.Text("","16px lato","#fff");
			this.user_3_name.x = user_3_icon.x - 15;
			this.user_3_name.y = user_3_icon.y  + 18;
			this.user_3_name.total_bet = 0;
			this.addChild(this.user_3_name);

			this.user_6_name = new createjs.Text("","16px lato","#fff");
			this.user_6_name.x = user_6_icon.x + 0;
			this.user_6_name.y = user_6_icon.y + 18;
			this.user_6_name.total_bet = 0;
			this.addChild(this.user_6_name);

			this.user_7_name = new createjs.Text("","16px lato","#fff");
			this.user_7_name.x = user_7_icon.x + 0;
			this.user_7_name.y = user_7_icon.y + 18;
			this.user_7_name.total_bet = 0;
			this.addChild(this.user_7_name);

			this.user_8_name = new createjs.Text("","16px lato","#fff");
			this.user_8_name.x = user_8_icon.x + 0;
			this.user_8_name.y = user_8_icon.y  + 18;
			this.user_8_name.total_bet = 0;
			this.addChild(this.user_8_name);

			this.user_1_bet = new createjs.Text("","16px bebasNeue","#d8bd69");
			this.user_1_bet.x = this.user_1_name.x +60;
			this.user_1_bet.y = this.user_1_name.y ;
			this.addChild(this.user_1_bet);

			this.user_2_bet = new createjs.Text("","16px bebasNeue","#d8bd69");
			this.user_2_bet.x = this.user_2_name.x  +60;
			this.user_2_bet.y = this.user_2_name.y;
			this.addChild(this.user_2_bet);

			this.user_3_bet = new createjs.Text("","16px bebasNeue","#d8bd69");
			this.user_3_bet.x = this.user_3_name.x+60;
			this.user_3_bet.y = this.user_3_name.y;
			this.addChild(this.user_3_bet);

			this.user_6_bet = new createjs.Text("","16px bebasNeue","#d8bd69");
			this.user_6_bet.x = this.user_6_name.x+60;
			this.user_6_bet.y = this.user_6_name.y;
			this.addChild(this.user_6_bet);

			this.user_7_bet = new createjs.Text("","16px bebasNeue","#d8bd69");
			this.user_7_bet.x = this.user_7_name.x + 60 ;
			this.user_7_bet.y = this.user_7_name.y;
			this.addChild(this.user_7_bet);

			this.user_8_bet = new createjs.Text("","16px bebasNeue","#d8bd69");
			this.user_8_bet.x = this.user_8_name.x + 60 ;
			this.user_8_bet.y = this.user_8_name.y;
			this.addChild(this.user_8_bet);

			this.chips_container = new createjs.Container();
			this.addChild(this.chips_container);

			this.chips_container_main = new createjs.Container();
			this.addChild(this.chips_container_main);

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

						if(this["user_"+x][i].betArea == "banker" || this["user_"+x][i].betArea == "player" ) {
							this["user_"+x][i].min_betAmt = mainAreaMin;
							this["user_"+x][i].max_betAmt = mainAreaMax;
						}

						if(this["user_"+x][i].betArea =="playerpair" || this["user_"+x][i].betArea =="bankerpair") {
							this["user_"+x][i].min_betAmt = pairMin;
							this["user_"+x][i].max_betAmt = pairMax;
						}

						if(this["user_"+x][i].betArea =="tie") {
							this["user_"+x][i].min_betAmt = tieMin;
							this["user_"+x][i].max_betAmt = tieMax;
						}
					}
				}
			}
		},

    drawTableOutline()
    {

      let default_color = "rgba(0,0,0,0.01)";
      let adjustX = 65;
      let adjustY = 25;

      if (window.tableNum == 3 || window.tableNum == 5 || window.tableNum == 8 || window.tableNum == 7) {
        adjustX = 68;
      }
      else if (window.tableNum == 4) {
        adjustX = 70;
      }
      else if(window.tableNum == 6 || window.tableNum == 10) {
        adjustX = 67.5;
      }
      else if(window.tableNum == 9) {
        adjustX = 70;
      }

    	if (window.tableNum == 3) {
				adjustY += 10;
			}

      adjustY = 18;
	  let table_img = null;

	  if(isSuperSix())
	  {
		table_img = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "multiplayer_table_supersix_zh" : "multiplayer_table_supersix"));
	  }
	  else if(isDragonBonus())
	  {
		table_img = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "multiplayer_table_dragonbonus_chinese" : "multiplayer_table_dragonbonus"));
		adjustY -= 5;
	  }
	  else
	  {
		table_img = new createjs.Bitmap(this.context.getResources(window.language.locale == "zh" ? "multiplayer_table_chinese" : "multiplayer_table"));
	  }


      table_img.scaleX = table_img.scaleY = 0.4;
      table_img.regX = table_img.getBounds().width/2;
      table_img.regY = table_img.getBounds().height/2;
      table_img.x = this.context.context.width/2 - 72 + adjustX
      table_img.y = this.context.context.height/2 + 83 + adjustY
      table_img.multiplayer = true

      return table_img;
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

			        			this.changeCurrentChips(row.bet_amount, this["user_" + (loop + 2)][i]);
			        		}
			       		});
						let total = _.sumBy(data[x - 1].bets, function (e) {
							return e.bet_amount
						});
						this["user_" + (loop + 2)+"_bet"].text = numberWithCommas(total);
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
			        				this.changeCurrentChips(row.bet_amount, this["user_" + loop][i]);
			    				}
			    			});
							let total = _.sumBy(data[x - 1].bets, function (e) {
								return e.bet_amount
							});
							this["user_" + loop+"_bet"].text = numberWithCommas(total);
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
			if (!this.currentBet.length) {
				this.currentBet.push(_.cloneDeep(data));
			}
			else {
				for (var i = 0; i < this.currentBet.length; i++) {
					if (this.currentBet[i].id != data.id) {
						this.currentBet.push(_.cloneDeep(data));
					}
					else {
						this.currentBet[i] = _.cloneDeep(data);
					}
				}
			}

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

						this.changeCurrentChips(data.data[i].bet_amount, this["user_"+seat_num][x], true, false)

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
		changeCurrentChips(amount,betArea,isMulti,isMain) {
	      	let avail_chips = [];
      let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
				if(!isSuperSix() && betArea.betarea != "supersix")
				{
					avail_chips.push({'chip': chipArr[i], 'value': chipVal});
				}
			}

      if(isDragonBonus()) {
        if (betArea.betarea == 'bankerpair' || betArea.betarea == 'playerpair') {
          return;
        }
      }

	      	//Chip container init and stacking

	      	let posY = betArea.y + (betArea.getTransformedBounds().height / 2);
			let posX = betArea.x + (betArea.getTransformedBounds().width / 2);


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

				if (isMain) {
					betArea.dropped_state(betArea);
					this.chips_container_main.addChild(chipDataCon);
				}
				else {
					this.chips_container.addChild(chipDataCon);
				}
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
		newRound() {
			// this.cache(248,434, 1530, 280);

			this.chips_container_main.removeAllChildren();
			this.currentBet = [];

			for(var x = 0; x < this.bet_areas.length; x++) {
				this.bet_areas[x].normal_state(this.bet_areas[x]);
				this.bet_areas[x].win = false;
				this.bet_areas[x].total_bet_amt = 0;
				
				this.bet_areas[x].chips.forEach((chip)=>{
					this.removeChild(chip);
				});

				if(this.bet_areas[x].graphics) {
            		this.bet_areas[x].normal_state(this.bet_areas[x],x);
		        } else {
		            this.bet_areas[x].gotoAndStop(0);
		        }

	        	this.bet_areas[x].alpha = 1;

	        	createjs.Tween.removeTweens(this.bet_areas[x]);
				// this.updateCache();
			}
		},
		removeAllChips() {
			this.bet_areas.forEach((e) => {
				e.normal_state(e)
				e.total_bet_amt = 0;
				e.chips = [];
			})
			this.chips_container_main.removeAllChildren();
			// this.updateCache();
		},
		tableWinning(winning, multiplayerFlag) {
			let lose_chips_to_animate = [];

			this.isTie = winning.some((e) => {
			  	return e == 'tie';
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
					  e.is_win = true;
					});
				  }
				} //end of checking if multiplier
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
			} //end of forloop winning length

			setTimeout(() => {
			  this.loseTableChipsAnimation(lose_chips_to_animate);
			}, 2000);

			setTimeout(() => {
			  this.setWinChips(winning, multiplayerFlag);
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
        		this.setWinChipsMulti(winning);
      		}, 4000);
		},
		setWinChipsMulti(winning) {
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

					          	this.createWinningChips(totalBet, betArea, false);
					        }
			          	} //end of checking bet area win
			      	} //end of  bet area loop
			    }
		  	}
		},
		setWinChips(winning, multiplayerFlag) {
	      	let win_chips_to_animate = [];
	      	let winningChips = [];

	       	for (var i = 0; i < this.bet_areas.length; i++) {
		        for (var x = 0; x < winning.length; x++) {
		          	if (this.bet_areas[i].multiplayer == multiplayerFlag) {
			            if (this.bet_areas[i].table_name == winning[x]) {
			              	if (this.bet_areas[i].chips) {
				                let winningAmt = this.setWinAmt(this.bet_areas[i]);
				                winningChips = this.createWinningChips(winningAmt, this.bet_areas[i], true);
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
	    loseTableChipsAnimation(chips) {
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
	    createWinningChips(amount, betArea, isMain) {
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
	      	let winnings = parseInt(amount);
	      	let chipsfrombanker = winnings;

	     	//Chip container init and stacking
			let posY = betArea.y + (betArea.getTransformedBounds().height / 2);
			let posX = betArea.x + (betArea.getTransformedBounds().width / 2) - 40;


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

				if (isMain) {
					this.chips_container_main.addChild(chipDataCon);
				}
				else {
					this.chips_container.addChild(chipDataCon);
				}
	      	} //end for
	    }
	});

	function isSuperSix()
	{
		return getSlaveParam('supersix');
	}
	function isDragonBonus()
	{
		return getSlaveParam('bonus');
	}

	return instance;
}
