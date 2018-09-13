import { randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap,
confirmButton, clearButton, repeatButton, fontFormat} from '../../../../factories/factories';
import colorConf from '../../../../assets/theme_colors_config';
import fnFormat from '../../../../factories/formatter';
import {dice} from '../../../../factories/dice';
import timer_anim from './timer';

let theme = colorConf();

//super class
import {Game} from './Game';
class Sicbo extends Game {
	constructor(data, self) {
		super(data, self);

		//classic areas
		this.allAreasConfig =  {
			classic : [{
				tablename : 'small',
				areacolor : '#1665c1',
				x: 10,
				y: 50,
				range :null
				,
				w: 162,
				h: 75,
				bordercolor : '#fff',
				text : window.language.multibet_betareas.small,
				textColor : "#fff"
			},{
				tablename : 'big',
				areacolor : '#d32f2e',
				x: 162+16,
				y: 50,
				range :null,
				w: 162,
				h: 75,
				bordercolor : '#fff',
				text : window.language.multibet_betareas.big,
				textColor : "#fff"
			},{
				tablename : 'even',
				areacolor : '#1665c1',
				x: 10,
				y: 50+75 +8,
				range :null,
				w: 120,
				h: 58,
				bordercolor : '#fff',
				text : window.language.multibet_betareas.even,
				textColor : "#fff"
			},{
				tablename : 'odd',
				areacolor : '#d32f2e',
				x: 120+80 + 22,
				y: 50+75 +8,
				range :null,
				w: 120,
				h: 58,
				bordercolor : '#fff',
				text : window.language.multibet_betareas.odd,
				textColor : "#fff"
			}, {
				tablename : 'anytriple',
				areacolor : '#e0c870',
				x: 120 + 16,
				y: 50+75 + 8,
				range : null,
				w: 80,
				h: 58,
				bordercolor : '#b58e39',
				text : window.language.multibet_betareas.triple,
				textColor : "#000"
			}]
		}
		
		var ctx = this;

		this.setBetrange(this.betrange);

		/** result data **/
		this.resultContainer = new createjs.Container();
		this.resultContainer.y = this.buttonsContainer.y;
		this.resultContainer.visible = false;
		this.game.addChild(this.resultContainer);

		this.dice1 = new dice(1, 40, 40);
		this.dice1.diceCon.y = 0;
		this.dice1.diceCon.oy = 0;
		this.dice1.diceCon.ox = this.dice1.diceCon.x = 115;
		this.dice1.diceCon.regX = 20
		this.dice1.diceCon.regY = 20

		this.dice2 = new dice(2, 40, 40);
		this.dice2.diceCon.y = 0;
		this.dice2.diceCon.oy = 0;
		this.dice2.diceCon.ox = this.dice2.diceCon.x = this.dice1.diceCon.x + 60;
		this.dice2.diceCon.regX = 20
		this.dice2.diceCon.regY = 20

		this.dice3 = new dice(3, 40, 40);
		this.dice3.diceCon.y = 0;
		this.dice3.diceCon.oy = 0;
		this.dice3.diceCon.ox = this.dice3.diceCon.x = this.dice2.diceCon.x + 60;
		this.dice3.diceCon.regX = 20
		this.dice3.diceCon.regY = 20

		this.resultContainer.addChild(this.dice1.diceCon, this.dice2.diceCon, this.dice3.diceCon);

		this.total = new createjs.Text("0", "50px bebas-regular", "#fff");
		this.total.visible = false;
		this.total.textBaseline  = "middle";
		this.total.textAlign  = "center";
		this.total.x = this.dice3.diceCon.x + 25; 
		this.total.y = this.dice3.diceCon.y; 
		this.total.scaleX = this.total.scaleY = 0 
		this.resultContainer.addChild(this.total);

		this.size = new createjs.Text("B", "50px bebas-regular", "#fff");
		this.size.visible = false;
		this.size.textBaseline  = "middle";
		this.size.textAlign  = "center";
		this.size.x = this.total.x + 25; 
		this.size.y = this.total.y; 
		this.size.scaleX = this.size.scaleY = 0 
		this.resultContainer.addChild(this.size);

		this.isAnimate = false;
	}
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

				if (window.language.locale != 'zh' && this.betarea[x].table == 'anytriple') {
					this.betarea[x].text.y = this.betarea[x].y + 16.5;
				}
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

		this.animation = [];
	}
	
	setBetrange (data, set) {
		this.betrange = data;

		this.links = {
			confirm : `${window.sb_domain}bet/store/${this.data.tableNumber}/${this.betrange.min}-${this.betrange.max}`,
			cancel : `${window.sb_domain}bet/cancelMulti/${this.data.tableNumber}/${this.betrange.min}-${this.betrange.max}`,
			logs : `${window.sb_domain}actionlogs/store/${this.data.tableNumber}/${this.betrange.min}-${this.betrange.max}`
		}

		this.mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
		if (window.mainMultiplier % 10) this.mainMultiplier = 1;
		
		//Main area range
		let main = {};
		main.min = (this.betrange.min * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
		main.max = (this.betrange.max * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier) * this.mainMultiplier;
		
		this.currentRange = `${main.min}-${main.max}`;

		let triplerange = _.find(this.betrange.side_bet, function (e) {return e.division === 'triple';})
		let triple = {
			min : (parseInt(triplerange.min) * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier), 
			max : (parseInt(triplerange.max)  * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier)
		};

		for (var key in this.allAreasConfig) {
			this.allAreasConfig[key].forEach((area)=>{
				if(area.tablename.indexOf('triple') > -1) {
					area.range = triple;
				} else {
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

		data = fnFormat().fnFormatSicbo(data ,16 , 6).size;

		for(let i = 0; i < data.length; i++) {
		  let size = data[i];
			for(let e = 0; e < size.length; e++) {
				if(size[e] ===  undefined) continue;

				let obj = new createjs.Shape();
				let data_text = new createjs.Text(window.language.locale == "zh" ? "小" : "S", "12px lato-black", '#fff');
				obj.x = (i * 19.8) + 10;
				obj.y = (e * 19.7) + 10;
				data_text.set({x: obj.x, y : obj.y, textBaseline:'middle',textAlign:'center'});

				obj.graphics.clear().beginFill('#1665c1').drawCircle(0, 0, 8);

				if(size[e] === 'big') {
					obj.graphics.clear().beginFill('#d32f2e').drawCircle(0, 0, 8);
					data_text.text = window.language.locale == "zh" ? "大" : "B";
				} else if(size[e] ==='triple') {
					obj.graphics.clear().beginFill('#689f39').drawCircle(0, 0, 8);
					data_text.text = window.language.locale == "zh" ? "和" : "T";
				}

				this.roadmap_container.addChild(obj, data_text);
			}
		}
	}		

	animateDice (data) {
		if(this.isAnimate) return;
		this.isAnimate = true;
		for(var x = 1; x <= 3; x++) {
		
			let toAnim = this[`dice${x}`].diceCon;
			toAnim.stop = false;
			toAnim.index = x;
			let d = this[`dice${x}`];

			createjs.Tween.get(toAnim, {loop:true})
			.to({
				// y: toAnim.oy,
				rotation : 360 
			},1000)
			.to({
				// y: toAnim.y -20,
				rotation : 0
			})
		}

		this.animation.push(setInterval(() => {
			if(this.dice1.diceCon.stop) {
				this.clearAll();
				return;
			}

			let anim = ['One','Two','Three','Four','Five','Six'];
			var rand = Math.floor(Math.random() * anim.length);	
			
			let bg1 = this.dice1.diceCon.children[0];
			this.dice1.diceCon.removeAllChildren();
			this.dice1.diceCon.addChild(bg1)
			this.dice1[`setDice${anim[rand]}`]();

			rand = Math.floor(Math.random() * anim.length);	

			let bg2 = this.dice2.diceCon.children[0];
			this.dice2.diceCon.removeAllChildren();
			this.dice2.diceCon.addChild(bg2)
			this.dice2[`setDice${anim[rand]}`]();

			rand = Math.floor(Math.random() * anim.length);	

			let bg3 = this.dice3.diceCon.children[0];
			this.dice3.diceCon.removeAllChildren();
			this.dice3.diceCon.addChild(bg3)
			this.dice3[`setDice${anim[rand]}`]();
		},200))
	}

	clearAll () {
		this.animation.forEach((a) => {
			clearInterval(a);
		});
	}

	inputItem (data) {
		if(window.tutorial_enabled) return;
		// this.winBetIndicator.text = 'Win';
		// this.betWinAmt.text = '0';

		this.tableContainer.alpha = 0.5;

		this.resultContainer.visible = true;
		this.buttonsContainer.visible = false;
		
		this.animateDice(data);
	}

	displayResult (data) {
		if(window.tutorial_enabled) return;
		this.total.visible = true;
		this.size.visible = true;

		let winner = data.gameResult.winner.split('');
		let winSum = _.reduce(winner, function(sum, n) { return parseInt(sum) + parseInt(n); });

		let color = winSum < 11 ? '#1665c1' : '#d32f2e';

		this.total.text = winSum;
		this.total.color = color;
		this.size.text = winSum < 11 ? 'S' : 'B';
		this.size.color = color;

		this.size.x = this.total.x + this.total.getMeasuredWidth() + 10;
		/// dice
		this.dice1.diceCon.stop = true;
		this.dice1.diceCon.y = this.dice1.diceCon.oy;
		this.dice1.diceCon.rotation = 0;

		this.dice2.diceCon.stop = true;
		this.dice2.diceCon.y = this.dice2.diceCon.oy;
		this.dice2.diceCon.rotation = 0;

		this.dice3.diceCon.stop = true;
		this.dice3.diceCon.y = this.dice3.diceCon.oy;
		this.dice3.diceCon.rotation = 0;

		createjs.Tween.removeTweens(this.dice1.diceCon)
		createjs.Tween.removeTweens(this.dice2.diceCon)
		createjs.Tween.removeTweens(this.dice3.diceCon)

		let gInfo = _.clone(data.gameInfo.gameInfo);
			
		if(typeof gInfo === 'string') gInfo = JSON.parse(gInfo);

		for(var key in gInfo) {
			if(parseInt(gInfo[key]) === 1) gInfo[key] = "One";
			if(parseInt(gInfo[key]) === 2) gInfo[key] = "Two";
			if(parseInt(gInfo[key]) === 3) gInfo[key] = "Three";
			if(parseInt(gInfo[key]) === 4) gInfo[key] = "Four";
			if(parseInt(gInfo[key]) === 5) gInfo[key] = "Five";
			if(parseInt(gInfo[key]) === 6) gInfo[key] = "Six";
		}


		let bg1 = this.dice1.diceCon.children[0];
		this.dice1.diceCon.removeAllChildren();
		this.dice1.diceCon.addChild(bg1)
		this.dice1[`setDice${gInfo.one}`]();

		let bg2 = this.dice2.diceCon.children[0];
		this.dice2.diceCon.removeAllChildren();
		this.dice2.diceCon.addChild(bg2)
		this.dice2[`setDice${gInfo.two}`]();


		let bg3 = this.dice3.diceCon.children[0];
		this.dice3.diceCon.removeAllChildren();
		this.dice3.diceCon.addChild(bg3)
		this.dice3[`setDice${gInfo.three}`]();

		createjs.Tween.get(this.dice1.diceCon)
		.to({
			scaleX : 0,
			scaleY : 0,
			alpha : 0
		},250)
		.to({
			scaleX : 1,
			scaleY : 1,
			alpha : 1
		},250, createjs.Ease.bounceOut)
		.wait(500)
		.to({
			x : this.dice1.diceCon.ox - 50
		},250);

		createjs.Tween.get(this.dice2.diceCon)
		.to({
			scaleX : 0,
			scaleY : 0,
			alpha : 0
		},250)
		.to({
			scaleX : 1,
			scaleY : 1,
			alpha : 1
		},250, createjs.Ease.bounceOut)
		.wait(500)
		.to({
			x : this.dice2.diceCon.ox - 50
		},250);

		createjs.Tween.get(this.dice3.diceCon)
		.to({
			scaleX : 0,
			scaleY : 0,
			alpha : 0
		},250)
		.to({
			scaleX : 1,
			scaleY : 1,
			alpha : 1
		},250, createjs.Ease.bounceOut)
		.wait(500)
		.to({
			x : this.dice3.diceCon.ox - 50
		},250);

		createjs.Tween.get(this.total)
		.wait(1000)
		.to({
			scaleY:1,
			scaleX:1
		},250);

		createjs.Tween.get(this.size)
		.wait(1000)
		.to({
			scaleY:1,
			scaleX:1
		},250)

		setTimeout(() => {
			this.gameNewRound();
		}, 9000)
	}

	gameNewRound(data) {
		if(window.tutorial_enabled) return;
		this.isAnimate = false;
		this.total.visible = false;
		this.size.visible = false;

		this.dice1.diceCon.x = this.dice1.diceCon.ox;
		this.dice2.diceCon.x = this.dice2.diceCon.ox;
		this.dice3.diceCon.x = this.dice3.diceCon.ox;

		this.size.scaleX = this.size.scaleY = 0;
		this.total.scaleX = this.total.scaleY = 0;
		
		this.winBetIndicator.text = "Bet";
		this.betWinAmt.text = 0;
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

	staticBets(data){
		data.bets = [{"bet": "small", "bet_amount": 50000, "win_money": 0, "user_money": 28426}, {"bet": "odd", "bet_amount": 60000, "win_money": 0, "user_money": 23426}, {"bet": "triple", "bet_amount": 20000, "win_money": 0, "user_money": 14426}];
		data.userId = window.userId
		return data;
	}
}

export default {
	Sicbo
}