import { randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap,
confirmButton, clearButton, repeatButton, fontFormat} from '../../../../factories/factories';
import colorConf from '../../../../assets/theme_colors_config';
import fnFormat from '../../../../factories/formatter';
import {baccaratRoadmap as bcRoadmap} from '../../../../factories/scoreboard_draw';
import baccaratTotal from '../../../../factories/baccaratTotal';
import timer_anim from './timer';
let theme = colorConf();

//super class
import {Game} from './Game';

class Baccarat extends Game {
	constructor(data, self) {
		super(data, self);
		this.slave = 'classic';

		if(data.type && data.type === 'flippy') {
			this.flippy = true;
			this.flippyTimerStart = false;
		}
		//slave areas settings
		this.allAreasConfig =  {
			classic : [{
				tablename : 'player',
				areacolor : '#1665c1',
				x: 10,
				y: 50,
				range : null,
				w: 120,
				h: 120,
				bordercolor : '#fff',
				text : window.language.multibet_betareas.player,
				textColor : "#fff"
			}, {
				tablename : 'tie',
				areacolor : '#689f39',
				x: 120 + 16,
				y: 50,
				range : null,
				w: 80,
				h: 120,
				bordercolor : '#fff',
				text : window.language.multibet_betareas.tie,
				textColor : "#fff"
			},{
				tablename : 'banker',
				areacolor : '#d32f2e',
				x: 120+80 + 22,
				y: 50,
				range:null,
				w: 120,
				h: 120,
				bordercolor : '#fff',
				text : window.language.multibet_betareas.banker,
				textColor : "#fff"
			}],
			supersix : [{
				tablename : 'player',
				areacolor : '#1665c1',
				x: 10,
				y: 50,
				range : null,
				w: 120,
				h: 120,
				bordercolor : '#fff',
				text : window.language.multibet_betareas.player,
				textColor : "#fff"
			}, {
				tablename : 'tie',
				areacolor : '#689f39',
				x: 120 + 16,
				y: 50,
				range : null,
				w: 80,
				h: 58,
				bordercolor : '#fff',
				text : window.language.multibet_betareas.tie,
				textColor : "#fff"
			}, {
				tablename : 'supersix',
				areacolor : '#e0c870',
				x: 120 + 16,
				y: 50 + 62 ,
				range : null,
				w: 80,
				h: 58,
				bordercolor : '#b58e39',
				img: "multi-supersix"
			},{
				tablename : 'banker',
				areacolor : '#d32f2e',
				x: 120+80 + 22,
				y: 50,
				range:null,
				w: 120,
				h: 120,
				bordercolor : '#fff',
				text : window.language.multibet_betareas.banker,
				textColor : "#fff"
			}],
			bonus : [{
				tablename : 'player',
				areacolor : '#1665c1',
				x: 10,
				y: 50,
				range : null,
				w: 120,
				h: 58,
				bordercolor : '#fff'
			}, {
				tablename : 'bonus_player',
				areacolor : '#e0c870',
				x: 10,
				y: 50 + 62 ,
				range : null,
				w: 120,
				h: 58,
				bordercolor : '#e0c870',
				text : "BONUS",
				textColor : "#000"
			}, {
				tablename : 'tie',
				areacolor : '#689f39',
				x: 120 + 16,
				y: 50,
				range : null,
				w: 80,
				h: 120,
				bordercolor : '#fff',
				text : "TIE",
				textColor : "#fff"
			}, {
				tablename : 'bonus_banker',
				areacolor : '#e0c870',
				x: 120+80 + 22,
				y: 50 + 62 ,
				range : null,
				w: 120,
				h: 58,
				bordercolor : '#e0c870',
				text : "BONUS",
				textColor : "#fff"
			},{
				tablename : 'banker',
				areacolor : '#d32f2e',
				x: 120+80 + 22,
				y: 50,
				range:null,
				w: 120,
				h: 58,
				bordercolor : '#fff',
				text : "BANKER",
				textColor : "#fff"
			}]
		};

		// areas to use
		let areas  = this.allAreasConfig[this.slave];
		var ctx = this;

		this.setBetrange(this.betrange);

		//slaves buttons
		this.slaveButtons = [];
		let slaves = [{text:window.language.gamename.bc_classic, type:'classic'}, {text:window.language.gamename.supersix, type:'supersix'}]
		//,{text:window.language.multibet_betareas.bonusbaccarat, type:'bonus'}];

		for(var x = 0; x < slaves.length; x++) {
			this.slaveButtons[x] = new createjs.Shape();
			this.slaveButtons[x].text = new createjs.Text(slaves[x].text.toUpperCase(), "12px lato-black", '#dac16d');
			this.slaveButtons[x].text.textAlign = 'center';
			this.slaveButtons[x].text.textBaseline = 'middle';
			this.slaveButtons[x].text.y = (18/2)

			this.slaveButtons[x].graphics.beginFill('rgba(255,255,255,0.01').ss(1.4).s('#dac16d').drawRect(0,0,162,18);
			this.slaveButtons[x].set({x : (x * (162+6)) - 84, y : -  60});
			this.slaveButtons[x].text.y = this.slaveButtons[x].y + (18/2);
			this.slaveButtons[x].text.x = this.slaveButtons[x].x + (162/2);
			this.slaveButtons[x].dataSlave = slaves[x].type;
			this.buttonsContainer.addChild(this.slaveButtons[x], this.slaveButtons[x].text);

			this.slaveButtons[x].ctx = this;

			this.slaveButtons[x].active = function () {
				this.graphics.clear().beginFill('#dac16d').drawRect(0,0,162,18);
				this.text.color = "#000";
			}

			this.slaveButtons[x].default = function () {
				this.graphics.clear().beginFill('rgba(255,255,255,0.01').ss(1.4).s('#dac16d').drawRect(0,0,162,18);
				this.text.color = "#dac16d";
			}

			if(slaves[x].type === ctx.slave) {
				this.slaveButtons[x].active();
			}

			this.slaveButtons[x].on('mouseover', function() {
				$('body').css({'cursor':'pointer'})
				this.active();
			})

			this.slaveButtons[x].on('mouseout', function() {
				$('body').css({'cursor':'default'})
				if(this.ctx.slave !== this.dataSlave) {
					this.default();
				};
			});
			//click
			this.slaveButtons[x].on("click", function () {
				if(!this.ctx.toggleSlaveCheck()) return;
				this.ctx.slaveButtons.forEach(function (b) { //default all buttons
					b.default();
				});
				this.active(); //active speicific button
				this.ctx.slave = this.dataSlave;
				
				if(this.dataSlave === 'classic') {
					this.ctx.prevBets = _.filter(this.ctx.prevBets, function(e){
						return e.table_id != 'supersix';
					});
				}

				this.ctx.renderAreas(this.ctx.allAreasConfig[this.dataSlave], true);
				this.ctx.setRoadmapData(this.ctx.data.marks);
			});
		}

		/** card data **/
		this.resultContainer = new createjs.Container();
		this.resultContainer.y = this.buttonsContainer.y;
		this.resultContainer.visible = false;
		this.game.addChild(this.resultContainer);

		this.win_bg_player = new createjs.Shape();
		this.win_bg_player.graphics.beginFill("#1665c1").drawRect(0,-60,355/2,100);
		this.win_bg_player.alpha = 0;
		this.resultContainer.addChild(this.win_bg_player);

		this.win_bg_banker = new createjs.Shape();
		this.win_bg_banker.graphics.beginFill("#d32f2e").drawRect(355/2,-60,355/2,100);
		this.win_bg_banker.alpha = 0;
		this.resultContainer.addChild(this.win_bg_banker);

		this.win_bg_tie = new createjs.Shape();
		this.win_bg_tie.graphics.beginFill("#689f39").drawRect(0,-60,355,100);
		this.win_bg_tie.alpha = 0;
		this.resultContainer.addChild(this.win_bg_tie);

		let totalBankerBg = new createjs.Shape();
		totalBankerBg.graphics.beginFill("#d32f2e").drawCircle(0,0,18);
		totalBankerBg.x = 310
		totalBankerBg.y = -40
		
		let totalPlayerBg = new createjs.Shape();
		totalPlayerBg.graphics.beginFill("#1566bf").drawCircle(0,0,18);
		totalPlayerBg.x = 34
		totalPlayerBg.y = -40
		this.resultContainer.addChild(totalBankerBg, totalPlayerBg);

		this.banker_total = new createjs.Text("0", "24px bebas-regular", "#fff");
		this.banker_total.x = totalBankerBg.x
		this.banker_total.y = totalBankerBg.y + 1;
		this.banker_total.textAlign = 'center'
		this.banker_total.textBaseline = 'middle'
		this.player_total = new createjs.Text("0", "24px bebas-regular", "#fff");
		this.player_total.x = totalPlayerBg.x
		this.player_total.y = totalPlayerBg.y + 1;
		this.player_total.textAlign = 'center'
		this.player_total.textBaseline = 'middle'

		this.resultContainer.addChild(this.player_total,this.banker_total);

		this.player_cards = []; 
		this.banker_cards = []; 

		let tempX = 3;
		for(var x = 0; x < 3; x++) {
			this.player_cards[x] = createCardSprite(self,51,68,"multi-bet-cards");
			this.player_cards[x].x = (tempX * 46) +6;
			this.player_cards[x].regX = this.player_cards[x].getTransformedBounds().width/2
			this.player_cards[x].regY = this.player_cards[x].getTransformedBounds().height/2
			this.player_cards[x].gotoAndStop('back_blue');
			if(x == 2) {
				this.player_cards[x].gotoAndStop('flipped_back_blue');
			}
			this.player_cards[x].visible = false;
			
			this.banker_cards[x] = createCardSprite(self,51,68,"multi-bet-cards");
			this.banker_cards[x].x = ((x+1) * 46) + 164;
			this.banker_cards[x].regX = this.banker_cards[x].getTransformedBounds().width/2
			this.banker_cards[x].regY = this.banker_cards[x].getTransformedBounds().height/2
			this.banker_cards[x].gotoAndStop('back_red');
			this.banker_cards[x].visible = false;

			
			tempX--;
			if(x == 2) {
				this.player_cards[x].rotation = -90;
				this.banker_cards[x].rotation = 90;
				this.banker_cards[x].y += 8;
				this.banker_cards[x].x += 8;
				this.player_cards[x].y += 8;
				this.player_cards[x].x -= 8;
			}
			this.resultContainer.addChild(this.banker_cards[x]);
			this.resultContainer.addChild(this.player_cards[x]);
		}

		if(window.tutorial_enabled) {
			this.data = this.staticGameInfo(this.data);
		}

		if(!this.data.marks.length && !window.tutorial_enabled) this.data.gameInfo = {};

		//setting cards to disp
		if(!_.isEmpty(this.data.gameInfo)) {
			var total = baccaratTotal(this.data.gameInfo);

			this.resultContainer.visible = true;
			this.buttonsContainer.visible = false;
			
			this.player_total.text = this.flippy ? 0 : total.player;
			this.banker_total.text = this.flippy ? 0 : total.banker;

			for(var key in this.data.gameInfo) {
				let index = parseInt(key.split('r')[1])-1;
				if(key.indexOf('player') > -1) {
					this.player_cards[index].visible = true;
					if(this.flippy) {
						this.player_cards[index].gotoAndStop(`back_blue`);
						if(key === 'player3') {
							this.player_cards[index].gotoAndStop(`flipped_back_blue`);
						}
					} else {
						this.player_cards[index].gotoAndStop(`C${this.data.gameInfo[key]}`);
					}
				}

				if(key.indexOf('banker') > -1) {
					this.banker_cards[index].visible = true;
					if(this.flippy) {
						this.banker_cards[index].gotoAndStop(`back_red`);
					} else {
						this.banker_cards[index].gotoAndStop(`C${this.data.gameInfo[key]}`);
					}
				}
			}
		}

		this.setRoadmapData(this.data.marks);
	} // end construct
	
	renderAreas (areas, flag) {
		this.tableContainer.removeAllChildren();
		this.betarea = [];

		let w = 0, h = 0;
		for(var x = 0; x < areas.length; x++) {
			this.betarea[x] = new createjs.Shape();
			this.betarea[x].graphics.ss(1).s(areas[x].bordercolor).beginFill(areas[x].areacolor).drawRoundRect(0,0,areas[x].w,areas[x].h,5);
			this.betarea[x].set({x : areas[x].x, y : areas[x].y});
			this.betarea[x].setBounds(0,0,areas[x].w,areas[x].h);
			this.betarea[x].table = areas[x].tablename;
			this.betarea[x].min_betAmt = areas[x].range.min;
			this.betarea[x].max_betAmt = areas[x].range.max;
			this.betarea[x].total_bet_amt = 0;
			this.betarea[x].chips = [];
			this.betarea[x].isMax = false;
			this.tableContainer.addChild(this.betarea[x]);
			if(areas[x].text) {
				this.betarea[x].text = new createjs.Text(areas[x].text, window.language.locale === 'zh' ? fontFormat(26,'black', 'noto') : fontFormat(20,'black', 'lato', false), areas[x].textColor);
				this.betarea[x].text.x = this.betarea[x].x + (areas[x].w/2);
				this.betarea[x].text.y = this.betarea[x].y + 20;
				this.betarea[x].text.textAlign ="center";
				this.betarea[x].text.textBaseline ="middle";
				this.betarea[x].text.hitArea = this.betarea[x];
				this.tableContainer.addChild(this.betarea[x].text);
			}
			if(areas[x].img) {
				this.betarea[x].img = new createjs.Bitmap(this.self.context.getResources(areas[x].img));
				this.betarea[x].img.regX = this.betarea[x].img.getBounds().width/2
				this.betarea[x].img.regY = this.betarea[x].img.getBounds().height/2
				this.betarea[x].img.x = this.betarea[x].x + areas[x].w/2;
				this.betarea[x].img.y = this.betarea[x].y + areas[x].h/2;
				this.betarea[x].img.hitArea = this.betarea[x];
				this.tableContainer.addChild(this.betarea[x].img);
			}

			w += (areas[x].w+10); 
			h += areas[x].h; 
		}

		//cache
		this.tableContainer.cache(0,0,w,h);
		this.tableContainer.updateCache();

		if(flag) {
			this.self.context.component_multibetBetting2.register(this, true);
		}
	}

	setBetrange (data, set = false) {

		this.betrange = data;

		this.links = {
			confirm : `${window.bc_domain}bet/store/${this.data.tableNumber}/${this.betrange.min}-${this.betrange.max}`,
			cancel : `${window.bc_domain}bet/cancelMulti/${this.data.tableNumber}/${this.betrange.min}-${this.betrange.max}`,
			logs : `${window.bc_domain}actionlogs/store/${this.data.tableNumber}/${this.betrange.min}-${this.betrange.max}`
		}

		this.mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
		if (window.mainMultiplier % 10) this.mainMultiplier = 1;

		//Main area range
		let main = {};
		main.min = (this.betrange.min * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
		main.max = (this.betrange.max * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier) * this.mainMultiplier;

		this.currentRange = `${main.min}-${main.max}`;

		//Side ranges
		let sideBet = [];
		let pair = {}, tie = {}, supersix = {}, bonus = {};
		for (var i = 0; i < this.betrange.side_bet.length; i++) {
			sideBet = this.betrange.side_bet[i];
			switch (sideBet.division) {
	  		case ('Player Pair - Banker Pair'):
	  			pair.min = (sideBet.min * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
	  			pair.max = (sideBet.max * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
					break;

				case ('Tie'):
	  			tie.min = (sideBet.min * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
	  			tie.max = (sideBet.max * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
					break;

				case ('Super 6'):
	  			supersix.min = (sideBet.min * parseInt(window.currencyMultiplier))  * parseInt(window.userMultiplier);
	  			supersix.max = (sideBet.max * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
					break;
				case ('Bonus'):
					bonus.min = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					bonus.max = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					break;
	 		}
		}

		for (var key in this.allAreasConfig) {
			this.allAreasConfig[key].forEach((area)=>{
				if(area.tablename.indexOf('pair') > -1) {
					area.range = pair;
				}
				if(area.tablename.indexOf('tie') > -1) {
					area.range = tie;
				}
				if(area.tablename.indexOf('super') > -1) {
					area.range = supersix;
				}
				if(area.tablename.indexOf('bonus') > -1) {
					area.range = bonus;
				}
				if(area.tablename === 'player' || area.tablename === 'banker') {
					area.range = main;
				}
			});
		}

		if(!set) {
			this.renderAreas(this.allAreasConfig[this.slave]);
		} else {
			this.renderAreas(this.allAreasConfig[this.slave], true);
		}

		if(set) {
			this.disconnectSocket();
			this.connectToSocket();
		}
	}

	setRoadmapData (data) {
		this.roadmap_container.removeAllChildren();

		let slaveJson = {
			'supersix' : {
				'b': 'l',
				'q': 'm',
				'w': 'n',
				'e': 'o',
			},
			'bonus' : {
				'b': 'l',
				'q': 'm',
				'w': 'n',
				'e': 'o',
			},
			slave: this.slave === 'supersix' ? this.slave : ''
		}

		data = fnFormat(slaveJson).fnFormatBCBigRoad(data,6, 19);
		for(var i = 0; i < data.matrix.length; i++) {
			for(var e = 0; e < data.matrix[i].length; e++) {
				if(data.matrix[i][e] === undefined) continue;
				
				let sp = null;
				var roadmap = new bcRoadmap(7, 3);
				roadmap.play('big-'+data.matrix[i][e].mark.toLowerCase());
				roadmap.ties(data.matrix[i][e].ties, {color:'#000', font: 'italic 16px lato-bold', width:3, height:23});
				sp = roadmap.instance;
				sp.x = (e * 19.8) + 3;
				sp.y = (i * 19.7) + 3;
				
				this.roadmap_container.addChild(sp);
			}
		} //end for
	}

	inputItem(data) {
		if(window.tutorial_enabled) return;
		if(data.type === 'burn') return;
		
		this.tableContainer.alpha = 0.5;
		
		this.resultContainer.visible = true;
		this.buttonsContainer.visible = false;

		if(!this.flippy) {
			var total = baccaratTotal(data.gameInfo);

			this.player_total.text = total.player;
			this.banker_total.text = total.banker;
		}

		if(data.type.indexOf('player') > -1){
			let cnt = parseInt(data.type.split('r')[1]);
			this.player_cards[cnt-1].visible = true;
			if(!this.flippy) {
				this.player_cards[cnt-1].scaleX = 0;
				createjs.Tween.get(this.player_cards[cnt-1])
				.to({
					scaleX : 1
				},200)
				.call((card, anim) => {
					card.gotoAndStop(anim);
				}, [this.player_cards[cnt-1],`C${data.value}`])
			} // end if
		}

		if(data.type.indexOf('banker') > -1){
			let cnt = parseInt(data.type.split('r')[1]);
			// this.banker_cards[cnt-1].gotoAndStop(`C${data.value}`);
			this.banker_cards[cnt-1].visible = true;
			if(!this.flippy) {
				this.banker_cards[cnt-1].scaleX = 0;
				createjs.Tween.get(this.banker_cards[cnt-1])
				.to({
					scaleX : 1
				},200)
				.call((card, anim) => {
					card.gotoAndStop(anim);
				}, [this.banker_cards[cnt-1],`C${data.value}`])
			} // end if

		}
	}

	displayResult (data) {
		if(window.tutorial_enabled) return;
		let winner = data.gameResult.winner.toLowerCase();

		createjs.Tween.get(this[`win_bg_${winner}`])
		.to({ alpha : 0.5 },350)
		.to({ alpha : 0 },350)
		.to({ alpha : 0.5 },350)
		.to({ alpha : 0 },350)
		.to({ alpha : 0.5 },350)
		.to({ alpha : 0 },350)

		setTimeout(() => {
			this.gameNewRound();
		}, 9000)
	}

	flippytimer(time, tot) {
	
	}

	flip (data) {
		var total = baccaratTotal(this.data.gameInfo);

		this.player_total.text = total.player;
		this.banker_total.text = total.banker;

		let playerIndex = 0;
		let bankerIndex = 0;
		for(var key in this.data.gameInfo) {
			if(key.indexOf('player') > -1) {
				this.player_cards[playerIndex].scaleX = 0;
				createjs.Tween.get(this.player_cards[playerIndex])
				.to({
					scaleX : 1
				},200)
				.call((card, anim) => {
					card.gotoAndStop(anim);
				}, [this.player_cards[playerIndex],`C${this.data.gameInfo[key]}`])
				playerIndex++;
			}

			if(key.indexOf('banker') > -1) {
				this.banker_cards[bankerIndex].scaleX = 0;
				createjs.Tween.get(this.banker_cards[bankerIndex])
				.to({
					scaleX : 1
				},200)
				.call((card, anim) => {
					card.gotoAndStop(anim);
				}, [this.banker_cards[bankerIndex],`C${this.data.gameInfo[key]}`])
				bankerIndex++;
			}

		}

	}

	gameNewRound(data) {
		if(window.tutorial_enabled) return;

		this.resultContainer.visible = false;
		this.buttonsContainer.visible = true;

		// ** baccarat speicifc **//
		this.player_total.text = 0;
		this.banker_total.text = 0;

		this.player_cards.forEach((card) => {
			card.gotoAndStop('back_blue')
			card.visible = false
		});
		this.banker_cards.forEach((card) => {
			card.gotoAndStop('back_red')
			card.visible = false
		});
		
		this.winBetIndicator.text = "Bet";
		this.betWinAmt.text = 0;
	} 

	shoechange(data) {
		this.roadmap_container.removeAllChildren();
		this.player_total.text = 0;
		this.banker_total.text = 0;

		this.winBetIndicator.text = 'Bet';
		this.betWinAmt.text = '0';

		this.resultContainer.visible = false;
		this.buttonsContainer.visible = true;

	}

	connectToSocket() {
		super.connectToSocket();
		this.socket = io.connect(window.socket + this.data.namespace, {
	    transports: ['websocket']
	  });

	  let initData = {
			userId : window.userId,
	  	range : `${this.betrange.min}-${this.betrange.max}`,
    	userName : window.user_name
	  }

  	//** emit join room **//
		this.socket.on('connect', () => {
			this.socket.emit('data', {eventName : 'room', data: initData}, (d)=> {
				let user = _.filter(d.roomates, function(user) { return user.userId == window.userId})[0];

				if(window.tutorial_enabled) {
					user = this.staticBets(user);
				} else if(!window.tutorial_enabled && this.data.roundStatus === 'E'){
					user = {};
				}

				this.yourBets = [];
				if(!_.isEmpty(user) && user.bets.length) {
					user.bets.forEach((a) => {
						this.yourBets.push({
							amount : a.bet_amount,
							table_id : a.bet
						});
						this.prevBets = this.yourBets;
					});

					this.slave = _.find(user.bets, function(e) {return e.slave}).slave;
					this.slave = this.slave == 'normal' ? 'classic' : this.slave;

					this.slaveButtons.forEach((b)=>{
						b.default();
						if(b.dataSlave === this.slave || (b.dataSlave === 'normal' && this.slave === 'classic')) {
							b.active()
						}
					});  

					this.renderAreas(this.allAreasConfig[this.slave], true);
					this.self.context.component_multibetBetting2.repeatBet({currentTarget : this.repeatButton}, true, false);

					//set all chips to confirmed
					this.betarea.forEach((area) => {
						area.chips.forEach((chip) => {
							chip.confirmed = true;
						})
					});

					this.is_confirmResponse = true;
					this.checkButtonState();
				}
			});					
		});
	}

	staticGameInfo(data) {
		data.gameInfo = {
				player1:'0003',
				player2:'0047',
				player3:'0013',
				banker1:'0017',
				banker2:'0032',
				banker3:'0043'
			}
		data.marks  = [{"num":8,"mark":"h","natural":[]},{"num":4,"mark":"p","natural":[]},{"num":8,"mark":"b","natural":["banker"]},{"num":7,"mark":"b","natural":[]},{"num":9,"mark":"b","natural":[]},{"num":7,"mark":"q","natural":[]},{"num":4,"mark":"p","natural":[]},{"num":7,"mark":"b","natural":[]},{"num":6,"mark":"b","natural":[]},{"num":9,"mark":"p","natural":[]},{"num":9,"mark":"p","natural":["player"]},{"num":5,"mark":"t","natural":[]},{"num":9,"mark":"p","natural":["player"]},{"num":6,"mark":"t","natural":[]},{"num":4,"mark":"p","natural":[]},{"num":8,"mark":"b","natural":["banker"]},{"num":5,"mark":"p","natural":[]},{"num":6,"mark":"t","natural":[]},{"num":9,"mark":"b","natural":["banker"]},{"num":7,"mark":"p","natural":[]},{"num":0,"mark":"t","natural":[]},{"num":8,"mark":"f","natural":[]},{"num":4,"mark":"b","natural":[]},{"num":9,"mark":"t","natural":["player","banker"]},{"num":5,"mark":"p","natural":[]},{"num":9,"mark":"b","natural":[]},{"num":6,"mark":"p","natural":[]},{"num":9,"mark":"p","natural":["player"]},{"num":8,"mark":"p","natural":["player"]},{"num":8,"mark":"q","natural":["banker"]},{"num":7,"mark":"p","natural":[]},{"num":6,"mark":"p","natural":[]},{"num":7,"mark":"b","natural":[]},{"num":2,"mark":"p","natural":[]},{"num":7,"mark":"p","natural":[]},{"num":6,"mark":"b","natural":[]},{"num":8,"mark":"p","natural":["player"]}];

		return data;
	}

	staticBets(data){
		data.bets = [{"bet": "player", "bet_amount": 150000, "win_money": 117000, "user_money": 15001355, "slave":'normal'},{"bet": "tie", "bet_amount": 50000, "win_money": 117000, "user_money": 15001355, "slave":'normal'}];
		data.userId = window.userId
		return data;
	}
}

export default {
	Baccarat
}