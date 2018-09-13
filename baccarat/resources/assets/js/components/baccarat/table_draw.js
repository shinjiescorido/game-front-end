import {createSprite, randomNum, getSlaveParam} from '../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		bet_areas: [],
		main () {
			this.rangeDetails = window.rangeDetails;

			//Main area range
			let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
			if (window.mainMultiplier % 10) mainMultiplier = 1;
			let mainAreaMin = (this.rangeDetails.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
    		let mainAreaMax = ((this.rangeDetails.max * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

			//Side bet ranges
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

			this.default_color = "rgba(255,255,255,0.01)";

			let player_default_color = "rgba(21, 101, 192, 1)"; //"#1565c0"
			let pdef2 = "rgba(21, 101, 192, 0.01)"; //"#1565c0"
			let banker_default_color = "rgba(209, 47, 47, 1)"; //#d12f2f
			let bdef2 = "rgba(209, 47, 47, 0.01)"; //#d12f2f
			let supersix_color = "rgba(209, 47, 47, 0.01)"; //#d12f2f
			let dragonbonus_color = "rgba(153, 101, 21, 1)"; //#996515
			let dragonbonus_color_p = "rgba(21, 101, 192, 1)";
			let dragonbonus_color_b = "rgba(209, 47, 47, 1)";
			let dgbdef2 = "rgba(153, 101, 21, 0.01)"; //#996515

			this.bet_areas[0] = new createjs.Shape();
			if(isDragonBonus()){
				this.bet_areas[0].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(155,0).lineTo(115,83).curveTo(40, 90, 10, 153).lineTo(-115,153).lineTo(0,0);
				this.bet_areas[0].x = 595;
				this.bet_areas[0].y = 568;
				this.bet_areas[0].setBounds(0,0,50,150);
			} else {
				this.bet_areas[0].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(230,0).lineTo(140,140).lineTo(-140,140).lineTo(0,0);
				this.bet_areas[0].x = 500;
				this.bet_areas[0].y = 585;
				this.bet_areas[0].setBounds(0,0,160,150);
			}
			this.bet_areas[0].table_name = "playerpair";
			this.bet_areas[0].min_bet = pairMin;
			this.bet_areas[0].max_bet = pairMax;
			this.bet_areas[0].payout_multiplier = 11;

			this.bet_areas[0].dropped_state = (e,x) => {
				if(isDragonBonus()){
					e.graphics.clear().beginFill(player_default_color).moveTo(0,0).lineTo(155,0).lineTo(115,83).curveTo(40, 90, 10, 153).lineTo(-115,153).lineTo(0,0);
				} else {
					e.graphics.clear().beginLinearGradientFill([pdef2,player_default_color],[0,1],0,0,38,35).moveTo(0,0).lineTo(230,0).lineTo(140,140).lineTo(-140,140).lineTo(0,0);
				}
				e.alpha = 1
			}

			this.bet_areas[0].hover_state = (e,x) => {
				if(isDragonBonus()){
					e.graphics.clear().beginFill(player_default_color).moveTo(0,0).lineTo(155,0).lineTo(115,83).curveTo(40, 90, 10, 153).lineTo(-115,153).lineTo(0,0);
				} else {
					e.graphics.clear().beginLinearGradientFill([pdef2,player_default_color],[0,1],0,0,38,35).moveTo(0,0).lineTo(230,0).lineTo(140,140).lineTo(-140,140).lineTo(0,0);
				}
				e.alpha = 0.5
			}

			this.bet_areas[0].normal_state = (e,x) => {
				if(isDragonBonus()){
					e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(155,0).lineTo(115,83).curveTo(40, 90, 10, 153).lineTo(-115,153).lineTo(0,0);
				} else {
					e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(230,0).lineTo(140,140).lineTo(-140,140).lineTo(0,0);
				}
				e.alpha = 1
			}

			this.bet_areas[0].win_state = (e,x) => {
				e.dropped_state(e,x);
				e.alpha = 1
			}

			this.bet_areas[1] = new createjs.Shape();
			if(isDragonBonus()){
				this.bet_areas[1].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(170,0).lineTo(145,152).lineTo(3,152).curveTo(35, 100, -40, 81).lineTo(0,0);
				this.bet_areas[1].x = 750;
				this.bet_areas[1].y = 569;
				this.bet_areas[1].setBounds(0,0,120,150);
			} else {
				this.bet_areas[1].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(202,0).lineTo(180,140).lineTo(-92,140).lineTo(0,0);
				this.bet_areas[1].x = 732;
				this.bet_areas[1].y = 585;
				this.bet_areas[1].setBounds(0,0,160,150);
			}
			this.bet_areas[1].table_name = "player";
			this.bet_areas[1].min_bet = mainAreaMin;
			this.bet_areas[1].max_bet = mainAreaMax;
			this.bet_areas[1].payout_multiplier = 1;

			this.bet_areas[1].dropped_state = (e,x) => {
				if(isDragonBonus()){
					e.graphics.clear().beginFill(player_default_color).moveTo(0,0).lineTo(170,0).lineTo(145,152).lineTo(3,152).curveTo(35, 100, -40, 81).lineTo(0,0);
				} else {
					e.graphics.clear().beginFill(player_default_color).moveTo(0,0).lineTo(202,0).lineTo(180,140).lineTo(-92,140).lineTo(0,0);
				}
				e.alpha = 1
			}

			this.bet_areas[1].hover_state = (e,x) => {
				if(isDragonBonus()){
					e.graphics.clear().beginFill(player_default_color).moveTo(0,0).lineTo(170,0).lineTo(145,152).lineTo(3,152).curveTo(35, 100, -40, 81).lineTo(0,0);
				} else {
					e.graphics.clear().beginFill(player_default_color).moveTo(0,0).lineTo(202,0).lineTo(180,140).lineTo(-92,140).lineTo(0,0);
				}
				e.alpha = 0.5
			}

			this.bet_areas[1].normal_state = (e,x) => {
				if(isDragonBonus()){
					e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(170,0).lineTo(145,152).lineTo(3,152).curveTo(35, 100, -40, 81).lineTo(0,0);
				} else {
					e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(202,0).lineTo(180,140).lineTo(-92,140).lineTo(0,0);
				}
				e.alpha = 1
			}

			this.bet_areas[1].win_state = (e,x) => {
				e.dropped_state(e,x);
				e.alpha = 1
			}

			this.bet_areas[2] = new createjs.Shape();
			this.bet_areas[2].x = 936;
			this.bet_areas[2].y = 585;
			this.bet_areas[2].table_name = "tie";
			this.bet_areas[2].setBounds(0,0,160,150);
			this.bet_areas[2].min_bet = tieMin;
			this.bet_areas[2].max_bet = tieMax;
			this.bet_areas[2].payout_multiplier = 8;

			if(isDragonBonus()){
				this.bet_areas[2].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(175,0).lineTo(200,152).lineTo(-23,152).lineTo(0,0);
				this.bet_areas[2].x = 920;
				this.bet_areas[2].y = 568;
				this.bet_areas[2].setBounds(0,0,175,150);

				this.bet_areas[2].dropped_state = (e,x) => {
					e.graphics.clear().beginFill("#689f38").moveTo(0,0).lineTo(175,0).lineTo(200,152).lineTo(-23,152).lineTo(0,0);
					e.alpha = 1
				}
				this.bet_areas[2].hover_state = (e,x) => {
					e.graphics.clear().beginFill("#689f38").moveTo(0,0).lineTo(175,0).lineTo(200,152).lineTo(-23,152).lineTo(0,0);
					e.alpha = 0.5
				}
				this.bet_areas[2].normal_state = (e,x) => {
					e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(175,0).lineTo(200,152).lineTo(-23,152).lineTo(0,0);
					e.alpha = 1
				}
			}

			else if(isSuperSix()){
				this.bet_areas[2].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(152,0).lineTo(164,56).lineTo(-12,56).lineTo(0,0);
				this.bet_areas[2].setBounds(0,0,160,50);
				this.bet_areas[2].dropped_state = (e,x) => {
					e.graphics.clear().beginFill("#689f38").moveTo(0,0).lineTo(152,0).lineTo(164,56).lineTo(-12,56).lineTo(0,0);
					e.alpha = 1
				}
				this.bet_areas[2].hover_state = (e,x) => {
					e.graphics.clear().beginFill("#689f38").moveTo(0,0).lineTo(152,0).lineTo(164,56).lineTo(-12,56).lineTo(0,0);
					e.alpha = 0.5
				}
				this.bet_areas[2].normal_state = (e,x) => {
					e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(152,0).lineTo(164,56).lineTo(-12,56).lineTo(0,0);
					e.alpha = 1
				}
			} else {
				this.bet_areas[2].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(152,0).lineTo(178,140).lineTo(-26,140).lineTo(0,0);
				this.bet_areas[2].dropped_state = (e,x) => {
					e.graphics.clear().beginFill("#689f38").moveTo(0,0).lineTo(152,0).lineTo(178,140).lineTo(-26,140).lineTo(0,0);
					e.alpha = 1
				}
				this.bet_areas[2].hover_state = (e,x) => {
					e.graphics.clear().beginFill("#689f38").moveTo(0,0).lineTo(152,0).lineTo(178,140).lineTo(-26,140).lineTo(0,0);
					e.alpha = 0.5
				}
				this.bet_areas[2].normal_state = (e,x) => {
					e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(152,0).lineTo(178,140).lineTo(-26,140).lineTo(0,0);
					e.alpha = 1
				}
			}
			this.bet_areas[2].win_state = (e,x) => {
				e.dropped_state(e,x);
				e.alpha = 1
			}

			this.bet_areas[3] = new createjs.Shape();
			if(isDragonBonus()){
				this.bet_areas[3].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(172,0).lineTo(212,83).curveTo(158, 85, 167, 152).lineTo(22,152).lineTo(0,0);
				this.bet_areas[3].x = 1095;
				this.bet_areas[3].y = 568;
				this.bet_areas[3].setBounds(0,0,215,150);
			} else {
				this.bet_areas[3].x = 1090;
				this.bet_areas[3].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(206,0).lineTo(296,140).lineTo(22,140).lineTo(0,0);
				this.bet_areas[3].y = 585;
				this.bet_areas[3].setBounds(0,0,270,150);
			}
			this.bet_areas[3].table_name = "banker";
			this.bet_areas[3].min_bet = mainAreaMin;
			this.bet_areas[3].max_bet = mainAreaMax;
			this.bet_areas[3].payout_multiplier = isSuperSix() ? 1 : 0.95;

			this.bet_areas[3].dropped_state = (e,x) => {
				if(isDragonBonus()){
					e.graphics.clear().beginFill(banker_default_color).moveTo(0,0).lineTo(172,0).lineTo(212,83).curveTo(158, 85, 167, 152).lineTo(22,152).lineTo(0,0);
				} else {
					e.graphics.clear().beginFill(banker_default_color).moveTo(0,0).lineTo(206,0).lineTo(296,140).lineTo(22,140).lineTo(0,0);
				}
				e.alpha = 1
			}

			this.bet_areas[3].hover_state = (e,x) => {
				if(isDragonBonus()){
					e.graphics.clear().beginFill(banker_default_color).moveTo(0,0).lineTo(172,0).lineTo(212,83).curveTo(158, 85, 167, 152).lineTo(22,152).lineTo(0,0);
				} else {
					e.graphics.clear().beginFill(banker_default_color).moveTo(0,0).lineTo(206,0).lineTo(296,140).lineTo(22,140).lineTo(0,0);
				}
				e.alpha = 0.5
			}

			this.bet_areas[3].normal_state = (e,x) => {
				if(isDragonBonus()){
					e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(172,0).lineTo(212,83).curveTo(158, 85, 167, 152).lineTo(22,152).lineTo(0,0);
				} else {
					e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(206,0).lineTo(296,140).lineTo(22,140).lineTo(0,0);
				}
				e.alpha = 1
			}

			this.bet_areas[3].win_state = (e,x) => {
				e.dropped_state(e,x);
				e.alpha = 1
			}

			this.bet_areas[4] = new createjs.Shape();
			if(isDragonBonus()){
				this.bet_areas[4].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(155,0).lineTo(270,152).lineTo(135,152).curveTo(115,85,40,83).lineTo(0,0);
				this.bet_areas[4].x = 1266;
				this.bet_areas[4].y = 568;
				this.bet_areas[4].setBounds(0,0,260,150);
			} else {
				this.bet_areas[4].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(230,0).lineTo(380,140).lineTo(90,140).lineTo(0,0);
				this.bet_areas[4].x = 1294;
				this.bet_areas[4].y = 585;
				this.bet_areas[4].setBounds(0,0,320,150);
			}
			this.bet_areas[4].table_name = "bankerpair";
			this.bet_areas[4].min_bet = pairMin;
			this.bet_areas[4].max_bet = pairMax;
			this.bet_areas[4].payout_multiplier = 11;

			this.bet_areas[4].dropped_state = (e,x) => {
				if(isDragonBonus()){
					e.graphics.clear().beginLinearGradientFill([banker_default_color,bdef2],[0,1],190,32,220,0).moveTo(0,0).lineTo(155,0).lineTo(270,152).lineTo(135,152).curveTo(115,85,40,83).lineTo(0,0);
				} else {
					e.graphics.clear().beginLinearGradientFill([banker_default_color,bdef2],[0,1],190,32,220,0).moveTo(0,0).lineTo(230,0).lineTo(380,140).lineTo(90,140).lineTo(0,0);
				}
				e.alpha = 1
			}
			this.bet_areas[4].hover_state = (e,x) => {
				if(isDragonBonus()){
					e.graphics.clear().beginLinearGradientFill([banker_default_color,bdef2],[0,1],190,32,220,0).moveTo(0,0).lineTo(155,0).lineTo(270,152).lineTo(135,152).curveTo(115,85,40,83).lineTo(0,0);
				} else {
					e.graphics.clear().beginLinearGradientFill([banker_default_color,bdef2],[0,1],190,32,220,0).moveTo(0,0).lineTo(230,0).lineTo(380,140).lineTo(90,140).lineTo(0,0);
				}
				e.alpha = 0.5
			}

			this.bet_areas[4].normal_state = (e,x) => {
				if(isDragonBonus()){
					e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(155,0).lineTo(270,152).lineTo(135,152).curveTo(115,85,40,83).lineTo(0,0);
				} else {
					e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(230,0).lineTo(380,140).lineTo(90,140).lineTo(0,0);
				}
				e.alpha = 1
			}

			this.bet_areas[4].win_state = (e,x) => {
				e.dropped_state(e,x);
				e.alpha = 1
			}
			/* -------------------------------------------- supersix drawing -------------------------------- */

			this.bet_areas[5] = new createjs.Shape();
			this.bet_areas[5].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(174,0).lineTo(188,82).lineTo(-14,82).lineTo(0,0);
			this.bet_areas[5].x = 925;
			this.bet_areas[5].y = 642;
			this.bet_areas[5].table_name = "supersix";
			this.bet_areas[5].setBounds(0,0,174,75);
			this.bet_areas[5].min_bet = superMin;
			this.bet_areas[5].max_bet = superMax;
			this.bet_areas[5].payout_multiplier = 12;

			this.bet_areas[5].dropped_state = (e,x) => {
				e.graphics.clear().beginFill("#996515").moveTo(0,0).lineTo(174,0).lineTo(188,82).lineTo(-14,82).lineTo(0,0);
				e.alpha = 1
			}
			this.bet_areas[5].hover_state = (e,x) => {
				e.graphics.clear().beginFill("#996515").moveTo(0,0).lineTo(174,0).lineTo(188,82).lineTo(-14,82).lineTo(0,0);
				e.alpha = 1
			}

			this.bet_areas[5].normal_state = (e,x) => {
				e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(174,0).lineTo(188,82).lineTo(-14,82).lineTo(0,0);
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
			this.bet_areas[6].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(147,0).lineTo(30,152).lineTo(-140,152).lineTo(0,0);
			this.bet_areas[6].x = 450;
			this.bet_areas[6].y = 568;
			this.bet_areas[6].setBounds(0,0,50,150);
			this.bet_areas[6].table_name = "big";
			this.bet_areas[6].min_bet = sizeMin;
			this.bet_areas[6].max_bet = sizeMax;
			this.bet_areas[6].payout_multiplier = .54;

			this.bet_areas[6].dropped_state = (e,x) => {
				e.graphics.clear().beginLinearGradientFill([dgbdef2,dragonbonus_color],[0,1],0,0,38,35).moveTo(0,0).lineTo(147,0).lineTo(30,152).lineTo(-140,152).lineTo(0,0);
			}
			this.bet_areas[6].hover_state = (e,x) => {
				e.graphics.clear().beginLinearGradientFill([dgbdef2,dragonbonus_color],[0,1],0,0,38,35).moveTo(0,0).lineTo(147,0).lineTo(30,152).lineTo(-140,152).lineTo(0,0);
			}
			this.bet_areas[6].normal_state = (e,x) => {
				e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(147,0).lineTo(30,152).lineTo(-140,152).lineTo(0,0);
			}
			this.bet_areas[6].win_state = (e,x) => {
				e.dropped_state(e,x);
				e.alpha = 1
			}

			this.bet_areas[7] = new createjs.Shape();
			this.bet_areas[7].graphics.beginFill(this.default_color).moveTo(0,0).lineTo(150,0).lineTo(320,152).lineTo(115,152).lineTo(0,0);
			this.bet_areas[7].x = 1420;
			this.bet_areas[7].y = 568;
			this.bet_areas[7].setBounds(0,0,250,150);
			this.bet_areas[7].table_name = "small";
			this.bet_areas[7].min_bet = sizeMin;
			this.bet_areas[7].max_bet = sizeMax;
			this.bet_areas[7].payout_multiplier = 1.5;

			this.bet_areas[7].dropped_state = (e,x) => {
				e.graphics.clear().beginLinearGradientFill([dragonbonus_color,dgbdef2],[0,1],140,32,170,0).moveTo(0,0).lineTo(150,0).lineTo(320,152).lineTo(115,152).lineTo(0,0);
			}
			this.bet_areas[7].hover_state = (e,x) => {
				e.graphics.clear().beginLinearGradientFill([dragonbonus_color,dgbdef2],[0,1],140,32,170,0).moveTo(0,0).lineTo(150,0).lineTo(320,152).lineTo(115,152).lineTo(0,0);
			}
			this.bet_areas[7].normal_state = (e,x) => {
				e.graphics.clear().beginFill(this.default_color).moveTo(0,0).lineTo(150,0).lineTo(320,152).lineTo(115,152).lineTo(0,0);
			}
			this.bet_areas[7].win_state = (e,x) => {
				e.dropped_state(e,x);
				e.alpha = 1
			}

			this.bet_areas[8] = new createjs.Shape();
			if(window.language.locale == 'zh') {
				this.bet_areas[8].graphics.beginFill(this.default_color).moveTo(0,65).curveTo(25, -15, 110, 0).curveTo(165, 30, 120, 65).lineTo(0,65);
				this.bet_areas[8].x = 605;
				this.bet_areas[8].setBounds(0,0,160,60);
			} else {
				this.bet_areas[8].graphics.beginFill(this.default_color).drawEllipse(0, 0, 140, 95);
				this.bet_areas[8].x = 610;
				this.bet_areas[8].setBounds(0,0,140,80);
			}
			
			this.bet_areas[8].y = 656;
			this.bet_areas[8].table_name = "bonus_player";
			this.bet_areas[8].min_bet = bonusMin;
			this.bet_areas[8].max_bet = bonusMax;
			this.bet_areas[8].payout_multiplier = 12;

			this.bet_areas[8].dropped_state = (e,x) => {
				e.graphics.clear().beginFill(dragonbonus_color_p).drawEllipse(0, 0, 140, 95);
				if(window.language.locale == 'zh') {
					e.graphics.clear().beginFill(dragonbonus_color_p).moveTo(0,65).curveTo(25, -15, 110, 0).curveTo(165, 30, 120, 65).lineTo(0,65);
				}
			}
			this.bet_areas[8].hover_state = (e,x) => {
				e.graphics.clear().beginFill(dragonbonus_color_p).drawEllipse(0, 0, 140, 95);
				if(window.language.locale == 'zh') {
					e.graphics.clear().beginFill(dragonbonus_color_p).moveTo(0,65).curveTo(25, -15, 110, 0).curveTo(165, 30, 120, 65).lineTo(0,65);
				}
				e.alpha = 0.5
			}
			this.bet_areas[8].normal_state = (e,x) => {
				e.graphics.clear().beginFill(this.default_color).drawEllipse(0, 0, 140, 95);
				if(window.language.locale == 'zh') {
					e.graphics.clear().beginFill(this.default_color).moveTo(0,65).curveTo(25, -15, 110, 0).curveTo(165, 30, 120, 65).lineTo(0,65);
				}
			}
			this.bet_areas[8].win_state = (e,x) => {
				e.dropped_state(e,x);
				e.alpha = 1
			}

			this.bet_areas[9] = new createjs.Shape();
			if(window.language.locale == 'zh') {
				this.bet_areas[9].graphics.beginFill(this.default_color).moveTo(-5,65).curveTo(-5, -10, 40, 0).curveTo(100, -10, 150, 65).lineTo(0,65);
				this.bet_areas[9].setBounds(0,0,140,60);
			} else {
				this.bet_areas[9].graphics.beginFill(this.default_color).drawEllipse(0, 0, 140, 95);
				this.bet_areas[9].setBounds(0,0,150,80);
			}
			this.bet_areas[9].x = 1263;
			this.bet_areas[9].y = 656;
			this.bet_areas[9].table_name = "bonus_banker";
			this.bet_areas[9].min_bet = bonusMin;
			this.bet_areas[9].max_bet = bonusMax;
			this.bet_areas[9].payout_multiplier = 12;

			this.bet_areas[9].dropped_state = (e,x) => {
				e.graphics.clear().beginFill(dragonbonus_color_b).drawEllipse(0, 0, 140, 95);
				if(window.language.locale == 'zh') {
					e.graphics.clear().beginFill(dragonbonus_color_b).moveTo(-5,65).curveTo(-5, -10, 40, 0).curveTo(100, -10, 150, 65).lineTo(0,65);
				}
			}
			this.bet_areas[9].hover_state = (e,x) => {
				e.graphics.clear().beginFill(dragonbonus_color_b).drawEllipse(0, 0, 140, 95);
				if(window.language.locale == 'zh') {
					e.graphics.clear().beginFill(dragonbonus_color_b).moveTo(-5,65).curveTo(-5, -10, 40, 0).curveTo(100, -10, 150, 65).lineTo(0,65);
				}
				e.alpha = 0.5
			}
			this.bet_areas[9].normal_state = (e,x) => {
				e.graphics.clear().beginFill(this.default_color).drawEllipse(0, 0, 140, 95);
				if(window.language.locale == 'zh') {
					e.graphics.clear().beginFill(this.default_color).moveTo(-5,65).curveTo(-5, -10, 40, 0).curveTo(100, -10, 150, 65).lineTo(0,65);
				}
			}
			this.bet_areas[9].win_state = (e,x) => {
				e.dropped_state(e,x);
				e.alpha = 1
			}

			this.bet_areas[6].visible = isDragonBonus();
			this.bet_areas[7].visible = isDragonBonus();
			this.bet_areas[8].visible = isDragonBonus();
			this.bet_areas[9].visible = isDragonBonus();

			/* -------------------------------------------- dragonbonus drawing -------------------------------- */
			//////////////////////////////
			let adjustX = 0;

			// if(window.tableNum == 1) {
			// 	adjustX = -5;
			// }

			let table_outline = this.makeTableDraw();

			for(var x = 0; x < this.bet_areas.length; x++) {
	    		this.bet_areas[x].min_betAmt = parseInt(this.bet_areas[x].min_bet);
	    		this.bet_areas[x].max_betAmt = parseInt(this.bet_areas[x].max_bet);
				this.bet_areas[x].chip_anim_toPlay = 2;
				this.bet_areas[x].chip_drop_scale = 0.8;
				this.bet_areas[x].x += adjustX;
				this.bet_areas[x].singleplayer = true;
				this.bet_areas[x].multiplayer = false;

				table_outline.singleplayer = true;
				if(table_outline) {
					table_outline.hitArea = this.bet_areas[x];
				}

				if(isDragonBonus()) {
					this.bet_areas[x].x += 4;
					this.bet_areas[x].y += 5;
				}
			}

			if(table_outline) {
				this.context.component_betBoard.addChild(table_outline);
				let setchild = setInterval(()=> {
					if (this.context.component_betBoard.bet_areas.length) {
						this.context.component_betBoard.setChildIndex(table_outline,this.context.component_betBoard.children.length-1 );
						var areas = _.filter(this.context.component_betBoard.bet_areas, (e)=>{return e.chips.length})
						if (areas.length) {
							areas.forEach((area) => {
								area.chips.forEach((e) =>  {
									this.context.component_betBoard.setChildIndex(e,this.context.component_betBoard.children.length-1 );
								});	
							});
						}
						clearInterval(setchild);
					}
				},1000)

			}

		},

		makeTableDraw(){
			//////////////////////////////
			let table_outline = null;
			let adjustX = 0;

			// if(window.tableNum == 1) {
			// 	adjustX = -5;
			// }

			if(window.language.locale == "zh") {
				if(this.context.getResources("bac_betboard_chinese") && this.context.getResources("the_betboard_supersix_zh")) {
					table_outline = new createjs.Bitmap(this.context.getResources(isSuperSix()?"the_betboard_supersix_zh":isDragonBonus()?"the_betboard_dragonbonus_zh":"bac_betboard_chinese"));
				}
			} else {
				if(this.context.getResources("the_betboard") && this.context.getResources("the_betboard_supersix")) {
					table_outline = new createjs.Bitmap(this.context.getResources(isSuperSix()?"the_betboard_supersix":isDragonBonus()?"the_betboard_dragonbonus":"the_betboard"));
				}
			}

			table_outline.regX =  table_outline.getBounds().width/2;
			table_outline.regY =  table_outline.getBounds().height/2;
			table_outline.x = 1012;
			table_outline.y = 655;
			table_outline.x += adjustX;
			table_outline.scaleY = 0.85
			table_outline.scaleX = 0.85

			if(isDragonBonus()) {
				table_outline.x = 1016;
				table_outline.y = 670;
				table_outline.scaleY = 0.93
				table_outline.scaleX = 0.93

				if(window.language.locale == 'zh') {
					table_outline.scaleY = 0.93
					table_outline.scaleX = 0.93
					table_outline.y = 650;
				}
			}

			return table_outline;
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
