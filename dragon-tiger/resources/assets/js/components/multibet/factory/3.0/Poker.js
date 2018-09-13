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
class Poker extends Game {
	constructor(data, self) {
		super(data, self);
		this.slave = 'classic';
		$("#getPokerType").on("click",  () => {
			alert(this.timerType);
		});
		//slave areas settings
		this.allAreasConfig =  {
			classic : [{
				tablename : 'ante',
				areacolor : ['#006164', '#00828f'],
				x: 60,
				y: 125,
				range : null,
				w: 50,
				h: 50,
				bordercolor : '#fff',
				bradius : 4,
				rotation : 45,
				text : window.language.multibet_betareas.ante,
				textColor : "#fff"
			}, {
				tablename : 'bonus',
				areacolor : ['rgba(255,255,255,0.01)', 'rgba(255,255,255,0.01)'],
				x: 90,
				y: 50,
				range : null,
				w: 60,
				h: 60,
				bordercolor : 'transparent',
				bradius : 30,
				rotation : 0,
				img : "multi-poker-bonus"
			}],
			bonus : [{
				tablename : 'ante',
				areacolor : ['#006164', '#00828f'],
				x: 50 - 5,
				y: 125,
				range : null,
				w: 50,
				h: 50,
				bordercolor : '#fff',
				bradius : 4,
				rotation : 45,
				text : window.language.multibet_betareas.ante,
				textColor : "#fff"
			}, {
				tablename : 'bonusplus',
				areacolor : ['rgba(255,255,255,0.01)', 'rgba(255,255,255,0.01)'],
				x: 68,
				y: 50,
				range : null,
				w: 60,
				h: 60,
				bordercolor : 'transparent',
				bradius : 30,
				rotation : 0,
				img : "multi-poker-bonus-plus"
			},{
				tablename : 'pocket',
				areacolor : ['rgba(255,255,255,0.01)', 'rgba(255,255,255,0.01)'],
				x: 155,
				y: 125,
				range : null,
				w: 48,
				h: 48,
				bordercolor : 'transparent',
				bradius : 4,
				rotation : 45,
				img : "multi-poker-pocket"
			}]
		};

		this.staticAreas = {
			classic : [{
				tablename : 'flop',
				areacolor : ['#244526', '#558b2f'],
				x: 190,
				y: 125,
				range : null,
				w: 50,
				h: 50,
				bordercolor : '#fff',
				bradius : 4,
				rotation : 45,
				text : window.language.multibet_betareas.flop,
				textColor : "#fff"
			},{
				tablename : 'turn',
				areacolor : ['#244526', '#558b2f'],
				x: 240,
				y: 80,
				range : null,
				w: 50,
				h: 50,
				bordercolor : '#fff',
				bradius : 4,
				rotation : 45,
				text : window.language.multibet_betareas.turn,
				textColor : "#fff"
			},{
				tablename : 'river',
				areacolor : ['#244526', '#558b2f'],
				x: 290,
				y: 125,
				range : null,
				w: 50,
				h: 50,
				bordercolor : '#fff',
				bradius : 4,
				rotation : 45,
				text : window.language.multibet_betareas.river,
				textColor : "#fff"
			}] ,
			bonus : [{
				tablename : 'flop',
				areacolor : ['#244526', '#558b2f'],
				x: 220 + 15,
				y: 125,
				range : null,
				w: 50,
				h: 50,
				bordercolor : '#fff',
				bradius : 4,
				rotation : 45,
				text : window.language.multibet_betareas.flop,
				textColor : "#fff"
			},{
				tablename : 'turn',
				areacolor : ['#244526', '#558b2f'],
				x: 260 + 15,
				y: 80,
				range : null,
				w: 50,
				h: 50,
				bordercolor : '#fff',
				bradius : 4,
				rotation : 45,
				text : window.language.multibet_betareas.turn,
				textColor : "#fff"
			},{
				tablename : 'river',
				areacolor : ['#244526', '#558b2f'],
				x: 300 + 15,
				y: 125,
				range : null,
				w: 50,
				h: 50,
				bordercolor : '#fff',
				bradius : 4,
				rotation : 45,
				text : window.language.multibet_betareas.river,
				textColor : "#fff"
			}] 
		}	

		var ctx = this;
		// this.renderAreas(areas);
		this.setBetrange(this.betrange);

		//slaves buttons
		this.slaveButtons = [];
		let slaves = [{text: window.language.gamename.texas, type:'classic'}, {text:window.language.gamename.bonusplus, type:'bonus'}];

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
				this.ctx.renderAreas(this.ctx.allAreasConfig[this.dataSlave], true);
			});
		}

		/** card data **/
		this.resultContainer = new createjs.Container();
		this.resultContainer.y = this.roadmap_container.y;
		this.resultContainer.visible = false;
		this.game.addChild(this.resultContainer);

		var presets = ['dealer','community','player'];
		for(var x = 0 ; x < presets.length; x++) {
			this[presets[x]+'Bg'] = new createjs.Shape();
			this[presets[x]+'Bg'].graphics.beginFill(x === 0 ? '#ce3031' : x === 1 ? '#5c5a5c' : '#1b64ba').drawRoundRect(0,0,x === 1 ? 160: 70,50,4);
			this[presets[x]+'Bg'].setBounds(0,0,x === 1 ? 160: 70,50);
			this[presets[x]+'Bg'].x = x > 0 ? this[presets[x-1]+'Bg'].x + this[presets[x-1]+'Bg'].getBounds().width + 6 : 20
			this[presets[x]+'Bg'].y = 40
			
			this[presets[x]+'Text'] = new createjs.Text(presets[x].toUpperCase(), "14px lato-black", x === 0 ? '#ce3031' : x === 1 ? '#5c5a5c' : '#1b64ba');
			this[presets[x]+'Text'].textAlign = 'center';
			this[presets[x]+'Text'].textBaseline = 'middle';
			this[presets[x]+'Text'].x = this[presets[x]+'Bg'].x + this[presets[x]+'Bg'].getBounds().width/2;
			this[presets[x]+'Text'].y = this[presets[x]+'Bg'].y - 10;

			this.resultContainer.addChild(this[presets[x]+'Bg'], this[presets[x]+'Text']);

			this[presets[x]+'Cards'] = [];

			let len = 2;

			if(x == 1) {
				len = 5
			}
			this[presets[x]+'Cards'] = [];

			for(var i = 0; i < len; i++) {
				this[presets[x]+'Cards'][i] = createCardSprite(self,51,68,"multi-bet-cards");					
				
				this[presets[x]+'Cards'][i].gotoAndStop('back_blue');				

				let w = this[presets[x]+'Cards'][i].getBounds().width/2, h = this[presets[x]+'Cards'][i].getBounds().height/2; 

				this[presets[x]+'Cards'][i].regX = w;				
				this[presets[x]+'Cards'][i].regY = h;			

				this[presets[x]+'Cards'][i].y = this[presets[x]+'Bg'].y + 5 + 20;
				let adjust = 0;
				if(x === 1 ) adjust = 3.2;
				this[presets[x]+'Cards'][i].x = this[presets[x]+'Bg'].x + (i * (w+adjust)) + (x === 1 ? 22 : 22);

				this[presets[x]+'Cards'][i].scaleX = 0
				this[presets[x]+'Cards'][i].scaleY = 0.6
				this[presets[x]+'Cards'][i].visible = false
				this.resultContainer.addChild(this[presets[x]+'Cards'][i]);
			} //end for
		}

		if(window.tutorial_enabled) {
			this.data = this.staticGameInfo(this.data);
		}

		if(!_.isEmpty(this.data.gameInfo)) {
			this.inputItem(this.data, true);
		}

		//extra for flop turn river
		this.timerType = '';

		this.extraButtonsContainer = new createjs.Container();
		this.extraButtonsContainer.y = this.buttonsContainer.y
		this.extraButtonsContainer.visible = false;
		this.game.addChild(this.extraButtonsContainer);

		// for flop turn river
		let clear = new clearButton(0.6);
		this.foldCheckButton = clear.container;
		this.foldCheckButton.gotoAndStop('up');
		this.foldCheckButton.removeChild(this.foldCheckButton.children[0])
		this.foldCheckButton.removeChild(this.foldCheckButton.children[0])
		this.foldCheckButton.updateCache();
		this.foldCheckButton.visible = false;
		this.foldCheckButton.set({x : 255, scaleX : 0.6, scaleY: 0.6}) 
		this.extraButtonsContainer.addChild(this.foldCheckButton);
		
		this.foldCheckButton.on("click", () => {
			this.self.context.component_multibetBetting2.setFoldCheck(this);
		});
		
		let conf = new confirmButton(0.6);
		this.raiseCallButton = conf.container;
		this.raiseCallButton.gotoAndStop('up');
		this.raiseCallButton.removeChild(this.raiseCallButton.children[0])
		this.raiseCallButton.removeChild(this.raiseCallButton.children[0])
		this.raiseCallButton.updateCache();
		this.raiseCallButton.visible = false;
		this.raiseCallButton.set({x : 174.5, scaleX : 0.6, scaleY: 0.6}) 
		this.extraButtonsContainer.addChild(this.raiseCallButton);
		
		this.raiseCallButton.on("click", () => {
			this.self.context.component_multibetBetting2.setCallRaise(this);
		});

		$("#pokertimer").on("click", () => {
			this.timer.timer(20,20);
			this.timer.visible = true;

			this.extraButtonsContainer.visible = true;
			this.raiseCallButton.visible = true;
			this.foldCheckButton.visible = true;
		})

	}

	renderAreas(areas, flag) {
		this.tableContainer.removeAllChildren();
		this.betarea = [];
		// poker is sepcial(cannot copy paste betareas drawinng)
		for(var x = 0; x < areas.length; x++) {
			this.betarea[x] = new createjs.Shape();
			if(areas[x].tablename === 'ante' || areas[x].tablename === 'pocket') {
				this.betarea[x].graphics.ss(1).s(areas[x].bordercolor).beginFill(areas[x].areacolor[0]).drawRoundRect(0, 0, areas[x].w,areas[x].h,areas[x].bradius);
				this.betarea[x].regX = areas[x].w/2
				this.betarea[x].regY = areas[x].h/2
				this.betarea[x].setBounds(0, 0, 2, 2);
				if(areas[x].tablename === 'ante') {
					this.betarea[x].graphics.ss(1).s(areas[x].bordercolor).beginFill(areas[x].areacolor[1]).drawRoundRect(6, 6, areas[x].w - 12,areas[x].h - 12,areas[x].bradius);
					this.betarea[x].setBounds(0, 0, 0, 0);
				}
			} else {
				this.betarea[x].graphics.ss(1).s(areas[x].bordercolor).beginFill(areas[x].areacolor[0]).drawRoundRect(0,0,areas[x].w,areas[x].h,areas[x].bradius);
				this.betarea[x].setBounds(0, 0, areas[x].w, areas[x].h);
			}
			this.betarea[x].rotation = areas[x].rotation ? areas[x].rotation : 0;
			this.betarea[x].set({x : areas[x].x, y : areas[x].y});
			this.betarea[x].table = areas[x].tablename;
			this.betarea[x].min_betAmt = areas[x].range.min;
			this.betarea[x].max_betAmt = areas[x].range.max;
			this.betarea[x].total_bet_amt = 0;
			this.betarea[x].chips = [];
			this.betarea[x].chip_scale = 0.7;
			this.betarea[x].isMax = false;
			this.tableContainer.addChild(this.betarea[x]);

			if(areas[x].img) {
				this.betarea[x].img = new createjs.Bitmap(this.self.context.getResources(areas[x].img));
				this.tableContainer.addChild(this.betarea[x].img);
				this.betarea[x].img.x = this.betarea[x].x
				this.betarea[x].img.y = this.betarea[x].y
				if(areas[x].tablename === 'pocket') {
					this.betarea[x].img.regX = this.betarea[x].img.getBounds().width/2
					this.betarea[x].img.regY = this.betarea[x].img.getBounds().height/2
				}
				this.betarea[x].img.hitArea = this.betarea[x]
			}

			if(areas[x].text) {
				this.betarea[x].text = new createjs.Text(areas[x].text, window.language.locale === 'zh' ? fontFormat(20,'regular', 'noto') : fontFormat(14,'black', 'lato', false), areas[x].textColor);
				this.betarea[x].text.x = this.betarea[x].x // + (areas[x].w/2);
				this.betarea[x].text.y = this.betarea[x].y// + 15//(areas[x].h/2);
				this.betarea[x].text.textAlign ="center";
				this.betarea[x].text.textBaseline ="middle";
				this.betarea[x].text.hitArea = this.betarea[x];
				this.tableContainer.addChild(this.betarea[x].text);
			}

		}

		if(flag) {
			this.self.context.component_multibetBetting2.register(this, true);
		}

		let extraAreas = this.staticAreas[this.slave];
		this.extra_areas = [];
		for(var x = 0; x < extraAreas.length; x++) {
			this.extra_areas[x] = new createjs.Shape();
			this.extra_areas[x].graphics.ss(1).s(extraAreas[x].bordercolor).beginFill(extraAreas[x].areacolor[0]).drawRoundRect(0, 0, extraAreas[x].w,extraAreas[x].h,extraAreas[x].bradius);
			this.extra_areas[x].regX = extraAreas[x].w/2
			this.extra_areas[x].regY = extraAreas[x].h/2
			this.extra_areas[x].setBounds(0, 0, 2, 2);
			this.extra_areas[x].chips = [];

			this.extra_areas[x].graphics.ss(1).s(extraAreas[x].bordercolor).beginFill(extraAreas[x].areacolor[1]).drawRoundRect(6, 6, extraAreas[x].w - 12,extraAreas[x].h - 12,extraAreas[x].bradius);
			this.extra_areas[x].rotation = extraAreas[x].rotation ? extraAreas[x].rotation : 0;
			this.extra_areas[x].set({x : extraAreas[x].x, y : extraAreas[x].y});
			this.extra_areas[x].table = extraAreas[x].tablename;
			this.extra_areas[x].chip_scale = 0.7;
			this.extra_areas[x].total_bet_amt = 0;
			this.tableContainer.addChild(this.extra_areas[x]);		

			if(extraAreas[x].text) {
				this.extra_areas[x].text = new createjs.Text(extraAreas[x].text, window.language.locale === 'zh' ? fontFormat(20,'regular', 'noto') : fontFormat(14,'black', 'lato', false), extraAreas[x].textColor);
				this.extra_areas[x].text.x = this.extra_areas[x].x //+ (extraAreas[x].w/2);
				this.extra_areas[x].text.y = this.extra_areas[x].y// + 24//(areas[x].h/2);
				this.extra_areas[x].text.textAlign ="center";
				this.extra_areas[x].text.textBaseline ="middle";
				this.extra_areas[x].text.hitArea = this.extra_areas[x];
				this.tableContainer.addChild(this.extra_areas[x].text);
			}
		}

	}
	
	setBetrange (data, set) {

		this.betrange = data;
		
		this.links = {
			confirm : `${window.p_domain}bet/store/${this.data.tableNumber}/${this.betrange.min}-${this.betrange.max}`,
			cancel : `${window.p_domain}bet/cancelMulti/${this.data.tableNumber}/${this.betrange.min}-${this.betrange.max}`,
			logs : `${window.p_domain}actionlogs/store/${this.data.tableNumber}/${this.betrange.min}-${this.betrange.max}`,
			setFoldCheck : `${window.p_domain}bet/setFoldCheck/${this.data.tableNumber}`
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
		let bonus = {}, bonusplus = {};
		for (var i = 0; i < this.betrange.side_bet.length; i++) {
			sideBet = this.betrange.side_bet[i];
			switch (sideBet.division) {
	  		case ('BonusBet'):
	  			bonus.min = (sideBet.min * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
	  			bonus.max = (sideBet.max * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
					break;
				case ('BonusplusBet'):
					bonusplus.min = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					bonusplus.max = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					break;
	 		}
		}

		for (var key in this.allAreasConfig) {
			this.allAreasConfig[key].forEach((area)=>{
				if(area.tablename == "ante") {
					area.range = main;
				}
				if(area.tablename == "bonus" || area.tablename == "pocket"){
					area.range = bonus;
				}
				if(area.tablename == "bonusplus"){
					area.range = bonusplus;
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
		data = fnFormat().fnFormatPokerRoadMap(data, 6, 16);		

		for(let c = 0; c < data.length; c++ ) {
			let poker_matrix = data[c];
			for(let n = 0; n < poker_matrix.length; n++ ) {
				if(poker_matrix[n] == undefined) continue;
				let sp = new createjs.Shape();
				sp.graphics.beginFill("#1565c0").drawCircle(0, 0, 8);
				sp.y = (n *19.8) + 10;
				sp.x = (c *19.7) + 10;
				let text = new createjs.Text(window.language.locale == "zh" ? "闲" : "P", window.language.locale == "zh" ? "12px latoblack" : "bold 12px Arial", "#ffffff");
				text.set({ textAlign: 'center', textBaseline: 'middle' });
				text.y = sp.y;
				text.x = sp.x;

				if(poker_matrix[n] == "D") {
					text.text = window.language.locale == "zh" ? "荷" : "D";
				}
				if(poker_matrix[n] == "T") {
					text.text = window.language.locale == "zh" ? "和" : "T";
				}
				if(poker_matrix[n] == "D"){
						sp.graphics.beginFill("#d32f2f").drawCircle(0, 0, 8);
				}
				if(poker_matrix[n] == "T"){
						sp.graphics.beginFill("#41a257").drawCircle(0, 0, 8);
				}
				this.roadmap_container.addChild(sp, text);
			}
		} // end for
	}		

	inputItem (data, init = false) {
		if(window.tutorial_enabled && !init) return;		
		// this.winBetIndicator.text = 'Win';
		// this.betWinAmt.text = '0';
		this.roadmap_container.visible = false;
		this.lines.visible = false;
		this.resultContainer.visible = true;
		
		this.betarea.forEach((area) => {
			area.alpha = 0.5;
		});

		var gameInfo = {
			community: [],
			player: [],
			dealer: []
		} 

		for(var key in data.gameInfo) {
			if(key == 'flop') {
				gameInfo.community.push(...data.gameInfo[key])
			}

			if(key == 'turn') {
				gameInfo.community.push(data.gameInfo[key])
			}

			if(key == 'river') {
				gameInfo.community.push(data.gameInfo[key])
			}

			if(key === 'player') {
				gameInfo.player = data.gameInfo[key]
			}

			if(key === 'dealer') {
				gameInfo.dealer = data.gameInfo[key]
			}

		} //end for

		for(var key in gameInfo) {
			for(var i = 0; i < gameInfo[key].length; i++) {
				if(!this[key+'Cards'][i] || !gameInfo[key][i]) continue;
				this[key+'Cards'][i].gotoAndStop(`C${gameInfo[key][i]}`);				
				this[key+'Cards'][i].visible = true;
				createjs.Tween.get(this[key+'Cards'][i])
				.to({
					scaleX : 0.6 
				}, 200)
			} //end for
		} //end for

	}

	displayResult(data) {
		if(window.tutorial_enabled) return;
		console.log("POKER WINNER DATA", data);
		var tempGameInfo = _.clone(data.gameInfo);
		var result = data.gameResult.cardsCode;

		for(var key in tempGameInfo) {

			if(_.isArray(tempGameInfo[key])) {
				for(var x = 0; x < tempGameInfo[key].length; x++) {
					if(_.find(result, function (e) { return e === tempGameInfo[key][x]}) ) {
						tempGameInfo[key][x] = `C${tempGameInfo[key][x]}`;
					} else {
						tempGameInfo[key][x] = `D${tempGameInfo[key][x]}`;
					}
				}
			}		else {
				if(_.find(result, function (e) { return e === tempGameInfo[key]}) ) {
					tempGameInfo[key] = `C${tempGameInfo[key]}`
				} else {
					tempGameInfo[key] = `D${tempGameInfo[key]}`
				}
			}
			// data.gameResult.cardsCode
		} //end for

		var gameInfo = {
			community: [],
			player: [],
			dealer: []
		} 

		for(var key in tempGameInfo) {
			if(key == 'flop') {
				gameInfo.community.push(...tempGameInfo[key])
			}

			if(key == 'turn') {
				gameInfo.community.push(tempGameInfo[key])
			}

			if(key == 'river') {
				gameInfo.community.push(tempGameInfo[key])
			}

			if(key === 'player') {
				gameInfo.player = tempGameInfo[key]
			}

			if(key === 'dealer') {
				gameInfo.dealer = tempGameInfo[key]
			}

		} //end for

		console.log("test result :::: ", gameInfo)
		for(var key in gameInfo) {
			for(var i = 0; i < gameInfo[key].length; i++) {
				if(!gameInfo[key][i]) continue;
				// if(gameInfo[key][i].indexOf('C') > -1) {
					// continue;
					this[key+'Cards'][i].gotoAndStop(`${gameInfo[key][i]}`);				
				// } else {
					// this[key+'Cards'][i].gotoAndStop(`D${gameInfo[key][i]}`);				
				// }
			} //end for
		} //end for

		setTimeout(() => {
			this.gameNewRound();
		}, 9000)
	}

	gameNewRound (data) {
		if(window.tutorial_enabled) return;
		this.roadmap_container.visible = true;
		this.lines.visible = true;
		this.resultContainer.visible = false;

		var presets = ['dealer','community','player'];
		this[presets[x]+'Cards'] = [];

		for(var x = 0; x < presets.length; x++) {
			let len = 2;

			if(x == 1) {
				len = 5
			}
			for(var i = 0; i < len; i++) {
				this[presets[x]+'Cards'][i].scaleX = 0
				this[presets[x]+'Cards'][i].visible = false
			} //end for
		}

		this.betarea.forEach((area) => {
			area.alpha = 1;
		});

		this.timerType = 'startround';

		this.prevBets = _.filter(this.prevBets, function (e) {
			return e.table_id === 'ante'
		});
		
		this.winBetIndicator.text = "Bet";
		this.betWinAmt.text = 0;
	}

	extraTime (data) {
		if(window.tutorial_enabled) return;

		this.timerStart = false;

		if(this.timerType != data.type) {
			let time = parseInt(data.bettingTime);
			let tot = parseInt(data.totalTime);

			this.timerType = data.type;
			this.timer.timer(time, tot);
			this.timer.visible = true;

			if(!this.yourBets.length) return;

			this.extraButtonsContainer.visible = true;
			
			this.foldCheckButton.visible = true;
			this.raiseCallButton.visible = true;

			if(this.timerType != 'flop' && this.timerType != 'startround') {
				let flop = _.find(this.extra_areas, function(e) {
					return e.table === "flop";
				});
				if(!flop.total_bet_amt) {
					this.foldCheckButton.visible = false;
					this.raiseCallButton.visible = false;	
				}
			} else if(this.timerType != 'startround'){
				let ante = _.find(this.betarea, (e) => {
					return e.table === 'ante';
				});

				if(!ante.total_bet_amt) {
					this.foldCheckButton.visible = false;
					this.raiseCallButton.visible = false;	
				}
			}
			console.log(this.timerType, "timerstype")
		}

		if(!parseInt(data.bettingTime)) {
			let ante = _.find(this.betarea, (e) => {
				return e.table === 'ante';
			});

			let area = _.find(this.extra_areas, (e) => {
				return e.table === this.timerType;
			});

			if(ante.total_bet_amt > 0 && !area.total_bet_amt) {
				this.self.context.component_multibetBetting2.setFoldCheck(this);
			}				
			// this.timerType = null;
			this.timer.visible = false;
			this.extraButtonsContainer.visible = false;
		}
	}

	foldCheck (type, timertype) {
		// if(window.tutorial_enabled) return;
		let chip = `poker-${type}`;

		if(timertype) this.timerType = timertype;

		let area = _.find(this.extra_areas, (e) => {
			return e.table === this.timerType;
		});

		console.log("::::POKER FOLD CHECK", this.timerType, timertype)
		let ani_chip = new createjs.Bitmap(this.self.context.getResources(chip));
		ani_chip.x = area.x - area.regX;
		ani_chip.y = area.y - area.regY;
		ani_chip.scaleX = ani_chip.scaleY = 0.8;

		this.chipsContainer.addChild(ani_chip);
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
							table_id : a.bet,
							cancel : a.cancel ? a.cancel : 0
						});
						this.prevBets = this.yourBets;
					});

					// this.yourBets = _.filter(this.yourBets, function(e) {return e.amount > 0 || e.cancel});
					// this.prevBets = this.yourBets;
					this.slave = _.find(user.bets, function(e) {return e.slave}).slave;
					this.slave = this.slave == 'normal' ? 'classic' : this.slave;
					if(this.slave.indexOf('bonus') > -1) {
						this.slave = 'bonus';
					}
					
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
					
					this.checkButtonState();		

					//flop turn river
					this.yourBets.forEach((bet) => {
						if(bet.table_id === 'flop' || bet.table_id === 'turn' || bet.table_id === 'river') {
							if(bet.amount > 0) {
								let area = _.find(this.extra_areas, function(e) {
									return e.table === bet.table_id
								});

								area.total_bet_amt = bet.amount;
								this.self.context.component_multibetBetting2.addChip(area, false);
							} else if(bet.amount <= 0 && bet.cancel) {
								bet.table_id === 'flop' ? this.foldCheck('fold', bet.table_id) : this.foldCheck('check', bet.table_id);
							}
						}
					});

					this.betWinAmt.text = numberWithCommas(_.sumBy(this.yourBets,'amount'))
					this.is_confirmResponse = true;

					//checking if theres flop/turn river timer & has bets ante but no bet current 
					if(!_.find(this.yourBets, (e) => {return e.table_id === this.timerType}).amount 
						&& !_.find(this.yourBets, (e) => {return e.table_id === this.timerType}).cancel 
						&& this.timer.visible) {
						this.extraButtonsContainer.visible = true;
						this.foldCheckButton.visible = true;
						this.raiseCallButton.visible = true;
					}

				}
			});					
		});
	}

	staticGameInfo(data) {
		data.gameInfo = {"burn":["0006","0035","0034"],"player":["0045","0021"],"dealer":["0047","0014"],"flop":["0000","0002","0043"],"turn":"0023","river":"0029"};
		return data;
	}

	staticBets(data){
		data.bets = [
			{"bet": "ante", "bet_amount": 60000, "cancel" : 0, "win_money": 117000, "user_money": 15001355, 'slave' : 'normal' },
			{"bet": "flop", "bet_amount": 120000, "cancel" : 0, "win_money": 117000, "user_money": 15001355, 'slave' : 'normal' },
			{"bet": "turn", "bet_amount": 0, "cancel" : 1, "win_money": 117000, "user_money": 15001355, 'slave' : 'normal' },
			{"bet": "river", "bet_amount": 0, "cancel" : 1, "win_money": 117000, "user_money": 15001355, 'slave' : 'normal' },
			{"bet": "bonus", "bet_amount": 25000, "cancel" : 0, "win_money": 117000, "user_money": 15001355, 'slave' : 'normal' },
		];

		data.userId = window.userId
		return data;
	}
}

export default {
	Poker
}