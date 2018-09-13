import { randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap,
confirmButton, clearButton, repeatButton, fontFormat} from '../../../../factories/factories';
import colorConf from '../../../../assets/theme_colors_config';
import fnFormat from '../../../../factories/formatter';
import {dragontigerRoadmap as dtRoadmap, baccaratRoadmap as bcRoadmap} from '../../../../factories/scoreboard_draw';
import timer_anim from './timer';
import cardsModule from '../../../../factories/cards';

let theme = colorConf();

//super class
import {Game} from './Game';
class Dragontiger extends Game {
	constructor(data, self) {
		super(data, self);

		//classic areas
		this.allAreasConfig =  {
			classic : [{
				tablename : 'dragon',
				areacolor : '#1665c1',
				x: 10,
				y: 50,
				range : null,
				w: 120,
				h: 120,
				bordercolor : '#fff',
				text : window.language.multibet_betareas.dragon,
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
				tablename : 'suited_tie',
				areacolor : '#e0c870',
				x: 120 + 16,
				y: 50 + 62 ,
				range : null,
				w: 80,
				h: 58,
				bordercolor : '#b58e39',
				img : window.language.locale === 'zh' ? "multi-suited-zh" : "multi-suited"
			},{
				tablename : 'tiger',
				areacolor : '#d32f2e',
				x: 120+80 + 22,
				y: 50,
				range : null,
				w: 120,
				h: 120,
				bordercolor : '#fff',
				text : window.language.multibet_betareas.tiger,
				textColor : "#fff"
			}]
		}

		var ctx = this;

		this.setBetrange(this.betrange);

		/** card data **/
		this.resultContainer = new createjs.Container();
		this.resultContainer.y = this.buttonsContainer.y;
		this.resultContainer.visible = false;
		this.game.addChild(this.resultContainer);

		this.win_bg_dragon = new createjs.Shape();
		this.win_bg_dragon.graphics.beginFill("#1665c1").drawRect(0,-60,355/2,100);
		this.win_bg_dragon.alpha = 0;
		this.resultContainer.addChild(this.win_bg_dragon);

		this.win_bg_tiger = new createjs.Shape();
		this.win_bg_tiger.graphics.beginFill("#d32f2e").drawRect(355/2,-60,355/2,100);
		this.win_bg_tiger.alpha = 0;
		this.resultContainer.addChild(this.win_bg_tiger);

		this.win_bg_tie = new createjs.Shape();
		this.win_bg_tie.graphics.beginFill("#689f39").drawRect(0,-60,355,100);
		this.win_bg_tie.alpha = 0;
		this.resultContainer.addChild(this.win_bg_tie);

		this.win_bg_suitedTie = new createjs.Shape();
		this.win_bg_suitedTie.graphics.beginFill("#e0c870").drawRect(0,-60,355,100);
		this.win_bg_suitedTie.alpha = 0;
		this.resultContainer.addChild(this.win_bg_suitedTie);

		let totalTigerBg = new createjs.Shape();
		totalTigerBg.graphics.beginFill("#d32f2e").drawCircle(0,0,26);
		totalTigerBg.x = 310-20
		totalTigerBg.y = -5
		
		let totalDragonBg = new createjs.Shape();
		totalDragonBg.graphics.beginFill("#1566bf").drawCircle(0,0,26);
		totalDragonBg.x = 34+20
		totalDragonBg.y = -5
		this.resultContainer.addChild(totalTigerBg, totalDragonBg);

		this.tiger_total = new createjs.Text("0", fontFormat(34, 'regular', 'bebas', false), "#fff");
		this.tiger_total.x = totalTigerBg.x
		this.tiger_total.y = totalTigerBg.y
		this.tiger_total.textAlign = 'center'
		this.tiger_total.textBaseline = 'middle'

		this.dragon_total = new createjs.Text("0", fontFormat(34, 'regular', 'bebas', false), "#fff");
		this.dragon_total.x = totalDragonBg.x
		this.dragon_total.y = totalDragonBg.y
		this.dragon_total.textAlign = 'center'
		this.dragon_total.textBaseline = 'middle'

		this.resultContainer.addChild(this.tiger_total,this.dragon_total);

		this.dragon_card = createCardSprite(self,51,68,"multi-bet-cards"); 
		this.dragon_card.y = -40
		this.dragon_card.x = 120
		this.tiger_card = createCardSprite(self,51,68,"multi-bet-cards"); 
		this.tiger_card.y = -40
		this.tiger_card.x = 180

		if(window.tutorial_enabled) {
			this.data = this.staticGameInfo(this.data);
		}

		if(!this.data.marks.length && !window.tutorial_enabled) this.data.gameInfo = {};
		
		if(!_.isEmpty(this.data.gameInfo) && (this.data.gameInfo.tiger || this.data.gameInfo.dragon)) {

			if(this.data.gameInfo.tiger !== undefined || data.gameInfo.dragon !== undefined) {
				this.resultContainer.visible = true;
				this.buttonsContainer.visible = false;

				this.tiger_total.text = this.data.gameInfo.tiger ? cardsModule(this.data.gameInfo.tiger).value : 0
				this.dragon_total.text = this.data.gameInfo.dragon ? cardsModule(this.data.gameInfo.dragon).value : 0
			}

			for(var key in this.data.gameInfo) {
				if(key !== 'burn') {
					if(this.data.gameInfo[key] === undefined) continue;
					this[`${key}_card`].gotoAndStop(`C${this.data.gameInfo[key]}`);
					this[`${key}_card`].visible = true;
				}
			}
		}

		this.resultContainer.addChild(this.dragon_card, this.tiger_card);
		
		this.setRoadmapData(this.data.marks);
	}//end constructor

	renderAreas(areas, flag) {
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
				this.betarea[x].img.regX = this.betarea[x].img.getTransformedBounds().width/2
				this.betarea[x].img.regY = this.betarea[x].img.getTransformedBounds().height/2
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

	setBetrange (data, set) {

		this.betrange = data;
		
		this.links = {
			confirm : `${window.dt_domain}bet/store/${this.data.tableNumber}/${this.betrange.min}-${this.betrange.max}`,
			cancel : `${window.dt_domain}bet/cancelMulti/${this.data.tableNumber}/${this.betrange.min}-${this.betrange.max}`,
			logs : `${window.dt_domain}actionlogs/store/${this.data.tableNumber}/${this.betrange.min}-${this.betrange.max}`
		}

		this.mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
		if (window.mainMultiplier % 10) this.mainMultiplier = 1;

		//Main area range
		let main = {};
		main.min = (this.betrange.min * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
		main.max = (this.betrange.max * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier) * this.mainMultiplier;
		
		this.currentRange = `${main.min}-${main.max}`;

		let tierange =  _.find(this.betrange.side_bet, function (e) {return e.division === 'Tie';});
		let suitedtierange =_.find(this.betrange.side_bet, function (e) {return e.division === 'Suited Tie';});

		let tie = {
			min : (parseInt(tierange.min) * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier), 
			max : (parseInt(tierange.max)  * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier)
		}

		let suitedtie = {
			min : (parseInt(suitedtierange.min) * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier), 
			max : (parseInt(suitedtierange.max)  * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier)
		}

		for (var key in this.allAreasConfig) {
			this.allAreasConfig[key].forEach((area)=>{
				if(area.tablename.indexOf('suited') > -1) {
					area.range = suitedtie;
				}
				if(area.tablename === 'tie') {
					area.range = tie;
				}

				if(area.tablename === 'dragon' || area.tablename === 'tiger') {
					area.range = main;
				}
				
			});
		}

		if(!set) {
			this.renderAreas(this.allAreasConfig.classic);
		} else {
			this.renderAreas(this.allAreasConfig.classic, true);
		}

		if(set) {
			this.disconnectSocket();
			this.connectToSocket();
		}
	}

	setRoadmapData (data) {
		this.roadmap_container.removeAllChildren();
		
		data = fnFormat().fnFormatDTBigRoad(data, 6, 19);

		for(var i = 0; i < data.matrix.length; i++) {
			for(var e = 0; e < data.matrix[i].length; e++) {
				if(data.matrix[i][e] === undefined)  { continue; }
				if(data.matrix[i][e].mark === undefined)  { continue; }

				let sp = null;
				var roadmap = new dtRoadmap(7, 3);
				roadmap.play('big-'+data.matrix[i][e].mark.toLowerCase());
				roadmap.ties(data.matrix[i][e].ties, {color:'#000', font: 'italic 16px lato-bold', width:3, height:23});

				sp = roadmap.instance;
				sp.x = (e * 19.8) + 3;
				sp.y = (i * 19.7) + 3;
				
				this.roadmap_container.addChild(sp);
			}
		}
	}		

	inputItem (data) {
		if(window.tutorial_enabled) return;
		if(data.type === 'burn') return;
		
		this.tableContainer.alpha = 0.5;

		// this.winBetIndicator.text = 'Win';
		// this.betWinAmt.text = '0';

		this.resultContainer.visible = true;
		this.buttonsContainer.visible = false;

		this[`${data.type}_card`].gotoAndStop(`C${data.value}`);
		this[`${data.type}_card`].visible = true;
		this[`${data.type}_total`].text = cardsModule(data.gameInfo[data.type]).value
	}

	gameNewRound (data) {
		if(window.tutorial_enabled) return;

		this.dragon_total.text = 0;
		this.tiger_total.text = 0;

		this.tiger_card.visible = false;
		this.dragon_card.visible = false;
		
		this.winBetIndicator.text = "Bet";
		this.betWinAmt.text = 0;
		//** dragontiger specific**//
	}

	shoechange(data) {
		this.roadmap_container.removeAllChildren();

		this.winBetIndicator.text = 'Bet';
		this.betWinAmt.text = '0';
		
		this.resultContainer.visible = false;
		this.buttonsContainer.visible = true;
	}

	displayResult (data) {
		if(window.tutorial_enabled) return;
		let winner = data.gameResult.winner.toLowerCase();

		if(winner == 'suited tie') {
			winner = 'suitedTie';
		}

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

	connectToSocket () {
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

					this.renderAreas(this.allAreasConfig.classic, true);
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
		data.gameInfo = {"burn":"0030","tiger":"0010","dragon":"0040"};
		data.marks  = [{"num":12,"mark":"h"},{"num":12,"mark":"h"},{"num":13,"mark":"g"},{"num":9,"mark":"m"},{"num":3,"mark":"n"},{"num":4,"mark":"n"},{"num":13,"mark":"m"},{"num":12,"mark":"h"},{"num":9,"mark":"m"},{"num":13,"mark":"m"},{"num":8,"mark":"m"},{"num":5,"mark":"n"},{"num":13,"mark":"h"},{"num":13,"mark":"h"},{"num":6,"mark":"j"},{"num":10,"mark":"m"},{"num":3,"mark":"j"},{"num":12,"mark":"m"},{"num":5,"mark":"j"},{"num":10,"mark":"h"},{"num":12,"mark":"m"},{"num":9,"mark":"o"},{"num":8,"mark":"m"},{"num":9,"mark":"g"},{"num":10,"mark":"m"},{"num":13,"mark":"h"},{"num":4,"mark":"j"},{"num":13,"mark":"k"},{"num":12,"mark":"k"},{"num":13,"mark":"m"},{"num":6,"mark":"n"},{"num":13,"mark":"m"},{"num":5,"mark":"n"},{"num":12,"mark":"m"},{"num":7,"mark":"n"},{"num":9,"mark":"h"},{"num":10,"mark":"h"},{"num":8,"mark":"h"},{"num":9,"mark":"h"},{"num":2,"mark":"j"},{"num":12,"mark":"g"},{"num":8,"mark":"m"},{"num":7,"mark":"n"},{"num":12,"mark":"h"},{"num":11,"mark":"h"},{"num":7,"mark":"j"},{"num":10,"mark":"m"},{"num":7,"mark":"j"},{"num":6,"mark":"n"},{"num":7,"mark":"n"},{"num":8,"mark":"h"},{"num":9,"mark":"o"},{"num":8,"mark":"m"},{"num":8,"mark":"m"},{"num":13,"mark":"k"},{"num":12,"mark":"g"},{"num":11,"mark":"k"},{"num":7,"mark":"n"}];
		
		return data;
	}
	staticBets(data){
		data.bets = [{"bet": "tiger", "bet_amount": 80000, "win_money": 0, "user_money": 14415951.5},{"bet": "tie", "bet_amount": 30000, "win_money": 0, "user_money": 14415951.5}, {"bet": "suited_tie", "bet_amount": 30000, "win_money": 0, "user_money": 14415951.5}];
		data.userId = window.userId
		return data;
	}
}

export default {
	Dragontiger
}