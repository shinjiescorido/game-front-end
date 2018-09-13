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
		bet_areas:[],
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
		user_6_name : null,
		user_7_name : null,
		user_8_name : null,
		main() {

			this.rangeDetails = window.rangeDetails;

			this.toSet = ["user_1", "user_2","user_3","user_5","user_6","user_7"]

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
			/**stasrt draw multi**/
			this.playerpair_color = this.context.component_tableDraw.playerpair_color;
			this.player_color = this.context.component_tableDraw.player_color;
			this.banker_color = this.context.component_tableDraw.banker_color;
			this.tie_color = this.context.component_tableDraw.tie_color;
			this.bankerpair_color = this.context.component_tableDraw.bankerpair_color;
			this.supersix_color = this.context.component_tableDraw.supersix_color;

			// playerpair
			this.bet_areas[0] = new createjs.Shape();
			this.bet_areas[0].width = 360;
			this.bet_areas[0].height = 96;
			this.bet_areas[0].x = 10;
			this.bet_areas[0].y = 310+8;
			this.bet_areas[0].color = this.playerpair_color;
			this.bet_areas[0].gradientOptions = [[0.2,1], 10,-136,this.bet_areas[0].width,0];
			this.bet_areas[0].fillCmd = this.bet_areas[0].graphics.beginLinearGradientFill(this.playerpair_color.default, ...this.bet_areas[0].gradientOptions).command;
			this.bet_areas[0].graphics.drawRect(0,0,this.bet_areas[0].width,this.bet_areas[0].height)
			this.bet_areas[0].setBounds(0,0,this.bet_areas[0].width,this.bet_areas[0].height);
			this.bet_areas[0].table_name = "playerpair";
			this.bet_areas[0].min_bet = pairMin;
			this.bet_areas[0].max_bet = pairMax;
			this.bet_areas[0].chips = [];
			this.bet_areas[0].payout_multiplier = 11;
			this.bet_areas[0].slave = "classic"

			//bankerpair
			this.bet_areas[1] = new createjs.Shape();
			this.bet_areas[1].width = 340;
			this.bet_areas[1].height = 96;
			this.bet_areas[1].x = 360+10;
			this.bet_areas[1].y = 310+8;
			this.bet_areas[1].color = this.bankerpair_color;
			this.bet_areas[1].gradientOptions = [[0.2,1], 0,136,this.bet_areas[1].width,0];
			this.bet_areas[1].fillCmd = this.bet_areas[1].graphics.beginLinearGradientFill(this.bankerpair_color.default, ...this.bet_areas[1].gradientOptions).command;
			this.bet_areas[1].graphics.drawRect(0,0,this.bet_areas[1].width, this.bet_areas[1].height)
			this.bet_areas[1].setBounds(0,0,this.bet_areas[1].width,this.bet_areas[1].height);
			this.bet_areas[1].table_name = "bankerpair";
			this.bet_areas[1].min_bet = pairMin;
			this.bet_areas[1].max_bet = pairMax;
			this.bet_areas[1].chips = [];
			this.bet_areas[1].payout_multiplier =11
			this.bet_areas[1].slave = "classic"

			// tie
			this.bet_areas[2] = new createjs.Shape();
			this.bet_areas[2].width = 154;
			this.bet_areas[2].height = 96;
			this.bet_areas[2].x = 282;
			this.bet_areas[2].y = 405+8;
			this.bet_areas[2].color = this.tie_color;
			this.bet_areas[2].gradientOptions = [[0,1], 0,0,this.bet_areas[2].width,0];
			this.bet_areas[2].fillCmd = this.bet_areas[2].graphics.beginLinearGradientFill(this.tie_color.default, ...this.bet_areas[2].gradientOptions).command;
			this.bet_areas[2].graphics.drawRect(0,0,this.bet_areas[2].width, this.bet_areas[2].height)
			this.bet_areas[2].setBounds(0,0,this.bet_areas[2].width,this.bet_areas[2].height);
			this.bet_areas[2].table_name = "tie";
			this.bet_areas[2].min_bet = tieMin;
			this.bet_areas[2].max_bet = tieMax;
			this.bet_areas[2].chips = [];
			this.bet_areas[2].payout_multiplier = 8;
			this.bet_areas[2].slave = "classic"

			this.bet_areas[3] = new createjs.Shape();
			this.bet_areas[3].width = 154;
			this.bet_areas[3].height = 96;
			this.bet_areas[3].x = 282;
			this.bet_areas[3].y = 501+8;
			this.bet_areas[3].color = this.banker_color;
			this.bet_areas[3].gradientOptions = [[0,1], 0,0,this.bet_areas[3].width,0];
			this.bet_areas[3].fillCmd = this.bet_areas[3].graphics.beginLinearGradientFill(this.banker_color.default, ...this.bet_areas[3].gradientOptions).command;
			this.bet_areas[3].graphics.drawRect(0,0,this.bet_areas[3].width, this.bet_areas[3].height)
			this.bet_areas[3].setBounds(0,0,this.bet_areas[3].width,this.bet_areas[3].height);
			this.bet_areas[3].table_name = "banker";
			this.bet_areas[3].min_bet = mainAreaMin;
			this.bet_areas[3].max_bet = mainAreaMax;
			this.bet_areas[3].chips = [];
			this.bet_areas[3].payout_multiplier = 8;
			this.bet_areas[3].slave = "classic"

			this.bet_areas[4] = new createjs.Shape();
			this.bet_areas[4].width = 154;
			this.bet_areas[4].height = 96;
			this.bet_areas[4].x = 282;
			this.bet_areas[4].y = 597+8;
			this.bet_areas[4].color = this.player_color;
			this.bet_areas[4].gradientOptions = [[0,1], 0,0,this.bet_areas[4].width,0];
			this.bet_areas[4].fillCmd = this.bet_areas[4].graphics.beginLinearGradientFill(this.player_color.default, ...this.bet_areas[4].gradientOptions).command;
			this.bet_areas[4].graphics.drawRect(0,0,this.bet_areas[4].width, this.bet_areas[4].height)
			this.bet_areas[4].setBounds(0,0,this.bet_areas[4].width,this.bet_areas[4].height);
			this.bet_areas[4].table_name = "player";
			this.bet_areas[4].min_bet = mainAreaMin;
			this.bet_areas[4].max_bet = mainAreaMax;
			this.bet_areas[4].chips = [];
			this.bet_areas[4].payout_multiplier = 8;
			this.bet_areas[4].slave = "classic";

			/** supersix */
			let startX = 720// (this.context.stage.canvas.width);
			// playerpair
			this.bet_areas[5] = new createjs.Shape();
			this.bet_areas[5].width = 360;
			this.bet_areas[5].height = 75;
			this.bet_areas[5].x = 10;
			this.bet_areas[5].y = 310+8;
			this.bet_areas[5].color = this.playerpair_color;
			this.bet_areas[5].gradientOptions = [[0.2,1], 10,-136,this.bet_areas[5].width,0];
			this.bet_areas[5].fillCmd = this.bet_areas[5].graphics.beginLinearGradientFill(this.playerpair_color.default, ...this.bet_areas[5].gradientOptions).command;
			this.bet_areas[5].graphics.drawRect(0,0,this.bet_areas[5].width,this.bet_areas[5].height)
			this.bet_areas[5].setBounds(0,0,this.bet_areas[5].width,this.bet_areas[5].height);
			this.bet_areas[5].table_name = "playerpair";
			this.bet_areas[5].min_bet = pairMin;
			this.bet_areas[5].max_bet = pairMax;
			this.bet_areas[5].chips = [];
			this.bet_areas[5].payout_multiplier = 11;
			this.bet_areas[5].slave = "supersix"

			//bankerpair
			this.bet_areas[6] = new createjs.Shape();
			this.bet_areas[6].width = 340;
			this.bet_areas[6].height = 75;
			this.bet_areas[6].x = 360+10;
			this.bet_areas[6].y = 310+8;
			this.bet_areas[6].color = this.bankerpair_color;
			this.bet_areas[6].gradientOptions = [[0.2,1], 0,136,this.bet_areas[6].width,0];
			this.bet_areas[6].fillCmd = this.bet_areas[6].graphics.beginLinearGradientFill(this.bankerpair_color.default, ...this.bet_areas[6].gradientOptions).command;
			this.bet_areas[6].graphics.drawRect(0,0,this.bet_areas[6].width, this.bet_areas[6].height)
			this.bet_areas[6].setBounds(0,0,this.bet_areas[6].width,this.bet_areas[6].height);
			this.bet_areas[6].table_name = "bankerpair";
			this.bet_areas[6].min_bet = pairMin;
			this.bet_areas[6].max_bet = pairMax;
			this.bet_areas[6].chips = [];
			this.bet_areas[6].payout_multiplier =11
			this.bet_areas[6].slave = "supersix"

			// tie
			this.bet_areas[7] = new createjs.Shape();
			this.bet_areas[7].width = 154;
			this.bet_areas[7].height = 75;
			this.bet_areas[7].x = 282;
			this.bet_areas[7].y = 394;
			this.bet_areas[7].color = this.tie_color;
			this.bet_areas[7].gradientOptions = [[0,1], 0,0,this.bet_areas[7].width,0];
			this.bet_areas[7].fillCmd = this.bet_areas[7].graphics.beginLinearGradientFill(this.tie_color.default, ...this.bet_areas[7].gradientOptions).command;
			this.bet_areas[7].graphics.drawRect(0,0,this.bet_areas[7].width, this.bet_areas[7].height)
			this.bet_areas[7].setBounds(0,0,this.bet_areas[7].width,this.bet_areas[7].height);
			this.bet_areas[7].table_name = "tie";
			this.bet_areas[7].min_bet = tieMin;
			this.bet_areas[7].max_bet = tieMax;
			this.bet_areas[7].chips = [];
			this.bet_areas[7].payout_multiplier = 8;
			this.bet_areas[7].slave = "supersix"

			this.bet_areas[8] = new createjs.Shape();
			this.bet_areas[8].width = 154;
			this.bet_areas[8].height = 75;
			this.bet_areas[8].x = 282;
			this.bet_areas[8].y = 468;
			this.bet_areas[8].color = this.banker_color;
			this.bet_areas[8].gradientOptions = [[0,1], 0,0,this.bet_areas[8].width,0];
			this.bet_areas[8].fillCmd = this.bet_areas[8].graphics.beginLinearGradientFill(this.banker_color.default, ...this.bet_areas[8].gradientOptions).command;
			this.bet_areas[8].graphics.drawRect(0,0,this.bet_areas[8].width, this.bet_areas[8].height)
			this.bet_areas[8].setBounds(0,0,this.bet_areas[8].width,this.bet_areas[8].height);
			this.bet_areas[8].table_name = "banker";
			this.bet_areas[8].min_bet = mainAreaMin;
			this.bet_areas[8].max_bet = mainAreaMax;
			this.bet_areas[8].chips = [];
			this.bet_areas[8].payout_multiplier = 8;
			this.bet_areas[8].slave = "supersix"

			this.bet_areas[9] = new createjs.Shape();
			this.bet_areas[9].width = 154;
			this.bet_areas[9].height = 75;
			this.bet_areas[9].x = 282;
			this.bet_areas[9].y = 618;
			this.bet_areas[9].color = this.player_color;
			this.bet_areas[9].gradientOptions = [[0,1], 0,0,this.bet_areas[9].width,0];
			this.bet_areas[9].fillCmd = this.bet_areas[9].graphics.beginLinearGradientFill(this.player_color.default, ...this.bet_areas[9].gradientOptions).command;
			this.bet_areas[9].graphics.drawRect(0,0,this.bet_areas[9].width, this.bet_areas[9].height)
			this.bet_areas[9].setBounds(0,0,this.bet_areas[9].width,this.bet_areas[9].height);
			this.bet_areas[9].table_name = "player";
			this.bet_areas[9].min_bet = mainAreaMin;
			this.bet_areas[9].max_bet = mainAreaMax;
			this.bet_areas[9].chips = [];
			this.bet_areas[9].payout_multiplier = 8;
			this.bet_areas[9].slave = "supersix"

			this.bet_areas[10] = new createjs.Shape();
			this.bet_areas[10].width = 154;
			this.bet_areas[10].height = 75;
			this.bet_areas[10].x = 282;
			this.bet_areas[10].y = 544;
			this.bet_areas[10].color = this.player_color;
			this.bet_areas[10].gradientOptions = [[0,1], 0,0,this.bet_areas[10].width,0];
			this.bet_areas[10].fillCmd = this.bet_areas[10].graphics.beginLinearGradientFill(this.player_color.default, ...this.bet_areas[10].gradientOptions).command;
			this.bet_areas[10].graphics.drawRect(0,0,this.bet_areas[10].width, this.bet_areas[10].height)
			this.bet_areas[10].setBounds(0,0,this.bet_areas[10].width,this.bet_areas[10].height);
			this.bet_areas[10].table_name = "supersix";
			this.bet_areas[10].min_bet = mainAreaMin;
			this.bet_areas[10].max_bet = mainAreaMax;
			this.bet_areas[10].chips = [];
			this.bet_areas[10].payout_multiplier = 8;
			this.bet_areas[10].slave = "supersix"

			this.table_container = new createjs.Container();
			this.addChild(this.table_container);
			this.chips_container = new createjs.Container();
			this.chips_container.x = this.x;
			this.chips_container.y = this.y;
			this.chips_container.visible = true;
			this.addChild(this.chips_container);

			this.classicMulti_outline = this.context.component_tableOutline.multiClassic().portrait;
			this.superMulti_outline = this.context.component_tableOutline.multiSuper().portrait;

			this.bet_areas.forEach((area) => {
				area.balanceBet = true;

				area.min_betAmt = area.min_bet;
				area.max_betAmt = area.max_bet;
				area.total_bet_amt = 0;

				area.chip_anim_toPlay = 0;
				area.chip_drop_scale = 1;

				this.classicMulti_outline.hitArea = area;
				this.superMulti_outline.hitArea = area;

				if(area.slave === 'supersix') {
					area.x += startX;
					console.log("supersixxx", area, area.table_name)
				}
				area.normal_state = (e,x) => {
					e.fillCmd.linearGradient(e.color.default, ...e.gradientOptions)
				}

				area.dropped_state = (e,x) => {
					e.fillCmd.linearGradient(e.color.dropped, ...e.gradientOptions)
				}

				area.hover_state = (e,x) => {
					e.fillCmd.linearGradient(e.color.hover, ...e.gradientOptions)
				}
				
				area.win_state = (e,x) => {
					e.fillCmd.linearGradient(e.color.win, ...e.gradientOptions)
				}

			});

			let posX = 10;
			for(var x = 0; x < this.toSet.length; x++) {
				//username init and money init
				//
				if(x == 3) {
					posX += 154
				}
				let key = this.toSet[x];
				let icon = new createjs.Bitmap(this.context.getResources("user_icon"));
				this.addChild(icon);

				this[`${key}_name`] = new createjs.Text("", "20px lato-regular", "#fff");
				this[`${key}_name`].x = posX + 20;
				this[`${key}_name`].y = 400 + 250 + 55
				this.addChild(this[`${key}_name`]);

				this[`${key}_bet`] = new createjs.Text("", "20px bebas-regular", "#eddd7f");
				this[`${key}_bet`].x = this[`${key}_name`].x - 20;
				this[`${key}_bet`].y = this[`${key}_name`].y + this[`${key}_name`].getMeasuredHeight();
				this.addChild(this[`${key}_bet`]);
				
				icon.x = this[`${key}_name`].x - 20;
				icon.y = this[`${key}_name`].y;
				icon.scaleY = icon.scaleX = 0.5
				posX += 95;
			}


			this.visible = false;
			this.makeMulti('supersix');
			this.makeMulti('classic');
		},
		toggleMulti () {
			let slave = window.slave === 'supersix' ? window.slave : 'classic';

			for(var x = 0; x < this.toSet.length; x++) {
				let key = this.toSet[x];
				this[key].forEach((area) => {
					if(area.slave === slave) {
						area.visible = true;
					} else {
						area.visible = false;
					}
				});
			} 
			console.log("toggle multi", window.slave, this)
		},
		makeMulti (slave) {
			let color = ['red', 'orange', 'pink', '#fff', '#000', 'yellow', 'blue', 'peach', 'green', 'purple']

			let users = {
				user_1: {
					classic : ['tie', 'banker', 'player'],
					supersix : ['tie', 'banker', 'supersix','player'],
				},
				user_2: {
					classic : ['tie', 'banker', 'player'],
					supersix : ['tie', 'banker', 'supersix','player'],
				},
				user_3: {
					classic : ['tie', 'banker', 'player'],
					supersix : ['tie', 'banker', 'supersix','player'],
				},
				user_5: {
					classic : ['tie', 'banker', 'player'],
					supersix : ['tie', 'banker', 'supersix','player'],
				},
				user_6: {
					classic : ['tie', 'banker', 'player'],
					supersix : ['tie', 'banker', 'supersix','player'],
				},
				user_7: {
					classic : ['tie', 'banker', 'player'],
					supersix : ['tie', 'banker', 'supersix','player'],
				},
			};

			let x = 10;
			for(var key in users) {
				if(key == 'user_5') {
					x += 154
				}

				let w = 90, h = 95;
				let startX = 0;
				if(slave === 'supersix') h = 74, startX = 0;

				for(var i = 0; i < users[key][slave].length ; i++) {
					this[key].push(new createjs.Shape());
					let index = this[key].length-1;

					let col = 'rgba(255,255,255,0.5)';
					this[key][index].graphics.beginFill(col).drawRect(0,0,w,h);
					this[key][index].setBounds(0,0,w,h);
					this[key][index].y = (i * (h+1)) + (318 + h);
					this[key][index].chips = [];
					this[key][index].slave = slave;
					this[key][index].alpha = 0.05;
					this[key][index].betarea = users[key][slave][i];
					let s = window.slave == 'supersix' ? window.slave : 'classic';
					if(this[key][index].slave != s) {
						this[key][index].visible  = true;
					}
					this.table_container.addChild(this[key][index]);
					this[key][index].x = startX + x;

				}

				x += (w+1);

			}
			console.log("wat nake")
		},
		screenOrientation () {
			if(this.context.portrait && this.context.isBalance) {
				this.visible = true;
			} else {
				this.visible = false;
			}
		},

		reset (flag) {
			this.chips_container.removeAllChildren();

			let users_area = this.toSet;

			for(var x = 0; x < users_area.length; x++) {
				for(var  i =0; i < this[`${users_area[x]}`].length; i++) {
					this[`${users_area[x]}`][i].chips = [];
					this[`${users_area[x]}`][i].alpha = 0.05;
					this[`${users_area[x]}`][i].set = false;
					// this["user_"+x][i].alpha = 0.01;
          createjs.Tween.removeTweens(this[`${users_area[x]}`][i]);
				}
				this[`${users_area[x]}_bet`].text = "";
				
				if(!this[`${users_area[x]}_name`].user_id) {
					this[`${users_area[x]}_bet`].text = "";
				} else {
					this[`${users_area[x]}_bet`].text = "0";
				}

				this[`${users_area[x]}_name`].total_bet = 0;
			}

			if(flag) {

				for(var x = 0; x < users_area.length; x++) {
					
					this[`${users_area[x]}_bet`].text = "";
					this[`${users_area[x]}_name`].user_id = 0;
					this[`${users_area[x]}_name`].text = "";
					this[`${users_area[x]}_name`].total_bet = 0;

					for(var  i =0; i < this[`${users_area[x]}`].length; i++) {
						this[`${users_area[x]}`][i].chips = [];
						this[`${users_area[x]}`][i].alpha = 0.05;
						this[`${users_area[x]}`][i].set = false;
						// this["user_"+x][i].alpha = 0.01;
	          createjs.Tween.removeTweens(this[`${users_area[x]}`][i]);
					}
				}
			}
		},
		/** sets multplayer data upon conect */
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
				    	let s = row.slave === 'supersix' ? row.slave : 'classic';

		     			if (this[`${users_area[x]}`][i].betarea == row.bet && this[`${users_area[x]}`][i].slave === s) {
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
			} // end for
		},
		/* sets multiplayer bet data upon event*/
		setMultiplayer (data) {
			if(data.id == window.userId) return;
			let seat_num = 0;
			let bet_amt = 0;
			data = _.cloneDeep(data)

			seat_num = this.checkUser(data.data[0]);

			this["user_"+seat_num+"_name"].total_bet = 0;

			for(var i = 0; i < data.data.length; i++ ) {

				let calc = (parseInt(data.data[i].bet_amount) / parseInt(data.data[i].currencyMultiplier ? data.data[i].currencyMultiplier : 1))
				data.data[i].bet_amount = (calc/parseInt(data.data[i].userMultiplier ? data.data[i].userMultiplier : 1) * window.currencyMultiplier) * window.userMultiplier

				if(data.data[i].name.split("").length > 3) {
     			this["user_" + seat_num + "_name"].text = data.data[i].name.substr(0,3) + "***";
     		} else {
     			this["user_" + seat_num + "_name"].text = data.data[i].name;
     		}

				for(var x = 0; x < this["user_"+seat_num].length;x++) {
					
					let slave = data.data[i].slave === 'supersix' ? 'supersix' : 'classic';
					let condition = this["user_"+seat_num][x].slave === slave;

					if(this["user_"+seat_num][x].betarea == data.data[i].bet && condition) {
						this["user_"+seat_num][x].alpha = 1
						this["user_"+seat_num+"_name"].total_bet += parseInt(data.data[i].bet_amount)

						this["user_"+seat_num][x].chips.forEach((chip) =>{
							this.chips_container.removeChild(chip);
						});
						this["user_"+seat_num][x].chips = [];
						this.changeCurrentChips(data.data[i].bet_amount, this["user_"+seat_num][x])
						this["user_"+seat_num+"_bet"].text = numberWithCommas(this["user_"+seat_num+"_name"].total_bet);
					}
				}
				bet_amt = 0;
			}
		},
		cancelBet (data) {
			if(window.junket == '' || !window.junket) {
				if(data.data[0].range != window.range) return;
			}

			let seat_num = this.checkUser(data.data[0]);

			this["user_" + seat_num+"_bet"].text = 0;
			this["user_"+seat_num+"_name"].total_bet = 0;

			this["user_"+seat_num].forEach((e) => {
				e.alpha = 0.05;
				e.chips.forEach((chip)=> {
					this.chips_container.removeChild(chip);
				});
				setTimeout(() => {
					e.chips = [];
				}, 500)
			})
		},
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
	      this["user_" + seat_num + "_name"].text = "";
				this["user_"+seat_num+"_name"].user_name = "";
				this["user_"+seat_num+"_name"].user_id = null;
			}
		},
		toRemovePlayer : [],
		checkUser(user) {
				let u_count = 0;
				let u_count2 = 0;

				let id = null;

				if('id' in user) {
					id = user.id
				} else {
					id = user.userId
				}

				let users_area = this.toSet;

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
		},
		changeCurrentChips(amount,betArea) {
	    let avail_chips = [];
      let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];

			for (var i = 0; i < chipArr.length; i++) {
				let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
				avail_chips.push({'chip': chipArr[i], 'value': chipVal});
			}

	    //Chip container init and stacking
	    let posX = betArea.x + betArea.getBounds().x + betArea.getBounds().width/2;
			let posY = betArea.y + betArea.getBounds().y  + betArea.getBounds().height/2;

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

        instance = createSprite(this.context.getResources(chip_name), 80, 80, instance);
        instance.regX = 40;
        instance.regY = 40;
        instance.x = 0;
        instance.y = 0;
        instance.gotoAndStop(2);

        chipDataCon = new createjs.Container();
        chipDataCon.x = posX;
        chipDataCon.y = (posY + 4) - (betArea.chips.length * 4);
        chipDataCon.scaleX = chipDataCon.scaleY = 0.7;
        chipDataCon.chip_amt = chips[x].value;
        chipDataCon.addChild(instance);

        let totalBet = amount;
        let instanceAmt = totalBet;

        if (parseInt(totalBet) > 999) {
          	totalBet = amount / 1000;
          	instanceAmt = totalBet+"k";
        }

        if (parseInt(totalBet) > 999) {
          	instanceAmt = totalBet/1000+'M';
        }

        instanceTxt = new createjs.Text(instanceAmt, 'normal 30px bebas-regular', '#000');
        instanceTxt.textBaseline = 'middle';
        instanceTxt.textAlign = 'center';
        instanceTxt.x = instance.x;
        instanceTxt.y = instance.y;
        chipDataCon.addChild(instanceTxt);

        instanceTxt.scaleY = 0.6;

        if(instanceTxt.text[0] == '1') {
        	instanceTxt.x -= 2
        }

				if (instanceTxt.text.toString().length > 4) {
				  instanceTxt.font = 'normal 26px bebas-regular';
				}

      	betArea.chips.push(chipDataCon);
				this.chips_container.addChild(chipDataCon);
			} //end for
		},

	});	
	return instance;
}