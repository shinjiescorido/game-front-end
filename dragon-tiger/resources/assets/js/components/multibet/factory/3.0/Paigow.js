import { randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap,
confirmButton, clearButton, repeatButton, createTileSprite } from '../../../../factories/factories';
import colorConf from '../../../../assets/theme_colors_config';
import fnFormat from '../../../../factories/formatter';
import {dice} from '../../../../factories/dice';
import timer_anim from './timer';
import tilesModule from '../../../../factories/tiles';

let theme = colorConf();

//super class
import {Game} from './Game';
class Paigow extends Game {
	constructor(data, self) {
		super(data, self);

		//classic areas
		this.allAreasConfig =  {
			classic : [{
				tablename : 'up',
				areacolor : '#e07a15',
				x: 32,
				y: 100,
				range :null,
				w: 74,
				h: 74,
				bordercolor : '#fff',
				radius : 37,
				text : "上",
				textColor :"#fff",
				text2 : 'UP'
			},{
				tablename : 'heaven',
				areacolor : '#1665c1',
				x: 74+32+32 ,
				y: 100,
				range :null,
				w: 74,
				h: 74,
				bordercolor : '#fff',
				radius : 37,
				text : "天",
				textColor :"#fff",
				text2 : 'HEAVEN'
			},{
				tablename : 'down',
				areacolor : '#689f39',
				x: 74+74+32+32+32,
				y: 100,
				range :null,
				w: 74,
				h: 74,
				bordercolor : '#fff',
				radius : 37,
				text : "下",
				textColor :"#fff",
				text2 : 'DOWN'
			}]
		}
		
		var ctx = this;

		this.setBetrange(this.betrange);

		/** result data **/
		this.resultContainer = new createjs.Container();
		this.resultContainer.y = this.buttonsContainer.y;
		this.resultContainer.visible = false;
		this.game.addChild(this.resultContainer);

		this.game.removeChild(this.lines);

		this.dice1 = new dice(1, 50, 50);
		this.dice1.diceCon.y = 0;
		this.dice1.diceCon.oy = 0;
		this.dice1.diceCon.ox = this.dice1.diceCon.x = 85 + 65;
		this.dice1.diceCon.regX = 25
		this.dice1.diceCon.regY = 25

		this.dice2 = new dice(2, 50, 50);
		this.dice2.diceCon.y = 0;
		this.dice2.diceCon.oy = 0;
		this.dice2.diceCon.ox = this.dice2.diceCon.x = this.dice1.diceCon.x + 65;
		this.dice2.diceCon.regX = 25
		this.dice2.diceCon.regY = 25
		this.resultContainer.addChild(this.dice1.diceCon, this.dice2.diceCon);

		this.total = new createjs.Text("0", "45px bebas-regular", "#fff");
		this.total.visible = false;
		this.total.textBaseline  = "middle";
		this.total.textAlign  = "center";
		this.total.x = 200; 
		this.total.y = this.dice2.diceCon.y; 
		this.resultContainer.addChild(this.total);

		this.value = new createjs.Text("B", "45px bebas-regular", "#fff");
		this.value.visible = false;
		this.value.textBaseline  = "middle";
		this.value.textAlign  = "center";
		this.value.ox = this.value.x = this.total.x + 25; 
		this.value.y = this.total.y; 
		this.resultContainer.addChild(this.value);

		this.isAnimate = false;

		this.gameInfoContainer = new createjs.Container();
		this.gameInfoContainer.y  = this.resultContainer.y;
		this.game.addChild(this.gameInfoContainer);

		let tiles = [{text:'BANKER', color:'#d32f2e', type:'banker'}, {text:'UP', color:'#e07a15', type:'up'}, {text:'HEAVEN', color:'#1665c1', type:'heaven'}, {text:'DOWN', color:'#689f39', type:'down'}];

		for(var x = 0;x < tiles.length; x++) {
			
			this[`${tiles[x].type}_bg`]  = new createjs.Shape();
			this[`${tiles[x].type}_bg`].graphics.beginFill(tiles[x].color).drawRoundRect(0,0,76,70,6);
			this[`${tiles[x].type}_bg`].x = (x*80) + 18;
			this[`${tiles[x].type}_bg`].y = 80;
			this.gameInfoContainer.addChild(this[`${tiles[x].type}_bg`]);		
			
			this[`${tiles[x].type}_total`] = new createjs.Text(0, "18px bebas-regular", "#fff");
			this[`${tiles[x].type}_total`].textAlign = 'center';
			this[`${tiles[x].type}_total`].textBaseline = 'middle';
			this[`${tiles[x].type}_total`].x = this[`${tiles[x].type}_bg`].x + (76/2)
			this[`${tiles[x].type}_total`].y = this[`${tiles[x].type}_bg`].y + 60
			this.gameInfoContainer.addChild(this[`${tiles[x].type}_total`]);		

			var label = new createjs.Text(tiles[x].text, "16px lato-black", tiles[x].color);
			label.textAlign = 'center';
			label.textBaseline = 'middle';
			label.x = this[`${tiles[x].type}_bg`].x + (76/2);
			label.y =  this[`${tiles[x].type}_bg`].y - 16;
			this.gameInfoContainer.addChild(label);		
		} 

		let tiles_type = ['banker', 'up', 'heaven', 'down'];

		let posX = 0;
		for(var x= 0; x < tiles_type.length; x++){
			posX = x*80;

			this[`${tiles_type[x]}_1`] = createTileSprite(this.self, 46.2, 60.5, "paigow-small_tiles");
			this[`${tiles_type[x]}_2`] = createTileSprite(this.self, 46.2, 60.5, "paigow-small_tiles");

			this[`${tiles_type[x]}_1`].y = this[`${tiles_type[x]}_2`].y = 100;
			this[`${tiles_type[x]}_1`].oy = this[`${tiles_type[x]}_2`].oy = 84;
			this[`${tiles_type[x]}_1`].scaleX = this[`${tiles_type[x]}_1`].scaleY = this[`${tiles_type[x]}_2`].scaleX = this[`${tiles_type[x]}_2`].scaleY = 0.7; 

			this[`${tiles_type[x]}_1`].x = posX + 22;
			this[`${tiles_type[x]}_2`].x = posX + 22 + 35;

			this[`${tiles_type[x]}_2`].visible = false;
			this[`${tiles_type[x]}_1`].visible = false;

			this[`${tiles_type[x]}_2`].alpha = 0;
			this[`${tiles_type[x]}_1`].alpha = 0;

			this.gameInfoContainer.addChild(this[`${tiles_type[x]}_1`], this[`${tiles_type[x]}_2`]);		
		}

		if(window.tutorial_enabled) {
			this.data = this.staticGameInfo(this.data);
		}

		let tilesData = this.data.gameInfo.tiles;

		if(!_.isEmpty(tilesData)) {

			this.resultContainer.visible = true;
			this.buttonsContainer.visible = false;

			this.value.text = this.data.gameInfo.seat ?  this.data.gameInfo.seat.toUpperCase() : 0;
			this.value.x += this.value.getMeasuredWidth()/2
			this.total.text = _.reduce(this.data.gameInfo.dices, function(sum, n) { return parseInt(sum) + parseInt(n)}); 

			this.value.visible = true; 
			this.total.visible = true; 

			let dices = this.data.gameInfo.dices;
			for(var x = 0; x < dices.length; x++) {
				if(!dices[x]) continue;
				let bg = this[`dice${x+1}`].diceCon.children[0];
				this[`dice${x+1}`].diceCon.removeAllChildren();
				this[`dice${x+1}`].diceCon.addChild(bg);
				let d = ""
				if(dices[x] == 1) d = 'One'; 
				if(dices[x] == 2) d = 'Two'; 
				if(dices[x] == 3) d = 'Three'; 
				if(dices[x] == 4) d = 'Four'; 
				if(dices[x] == 5) d = 'Five'; 
				if(dices[x] == 6) d = 'Six';
				this[`dice${x+1}`][`setDice${d}`]();

				this[`dice${x+1}`].diceCon.x -= 70;
			}

			for(var key in tilesData) {
				if(tilesData[key][0] && tilesData[key][1]) {
					let val = [tilesModule(tilesData[key][0]).value, tilesModule(tilesData[key][1]).value];
					this[`${key}_total`].text = _.reduce(val, function(sum, n) { return parseInt(sum) + parseInt(n)}) % 10;

					if(tilesData[key][0] === tilesData[key][1] && tilesData[key][1] !== null) {
						this[`${key}_total`].text = tilesModule(tilesData[key][0]).value + ' PAIR';
					}
				}

				for(var x = 1; x <= tilesData[key].length; x++ ) {
					if(!tilesData[key][(x-1)]) continue;
					this[`${key}_${x}`].visible = true;
					this[`${key}_${x}`].alpha = 1;
					this[`${key}_${x}`].y = this[`${key}_${x}`].oy;
					this[`${key}_${x}`].gotoAndStop(`tile-${tilesData[key][(x-1)][3]}`);
				}
			}
		}

	}
	renderAreas (areas, flag) {
		this.tableContainer.removeAllChildren();

		this.betarea = [];

		let w = 0, h = 0;
		for(var x = 0; x < areas.length; x++) {
			this.betarea[x] = new createjs.Shape();
			this.betarea[x].graphics.ss(1).s(areas[x].bordercolor).beginFill(areas[x].areacolor).drawRoundRect(0,0,areas[x].w,areas[x].h,areas[x].radius);
			this.betarea[x].set({x : areas[x].x, y : areas[x].y});
			this.betarea[x].setBounds(0,0,areas[x].w,areas[x].h);
			this.betarea[x].table = areas[x].tablename;
			this.betarea[x].min_betAmt = areas[x].range.min;
			this.betarea[x].max_betAmt = areas[x].range.max;
			this.betarea[x].total_bet_amt = 0;
			this.betarea[x].chips = [];
			this.betarea[x].isMax = false;
			this.betarea[x].extraAsset = [];

			for(var i = 0; i < 4; i++) {
				this.betarea[x].extraAsset[i] = new createjs.Bitmap(this.self.context.getResources('multi-paigow'));
				this.betarea[x].extraAsset[i].x = this.betarea[x].x;
				this.betarea[x].extraAsset[i].y = this.betarea[x].y;
				this.betarea[x].extraAsset[i].regX = this.betarea[x].extraAsset[i].getBounds().width/2;
				this.betarea[x].extraAsset[i].regY = this.betarea[x].extraAsset[i].getBounds().height/2;
				
				if(i == 0) {
					this.betarea[x].extraAsset[i].x -= this.betarea[x].extraAsset[i].regX; 
					this.betarea[x].extraAsset[i].y += areas[x].h/2; 
				}

				if(i == 1) {
					this.betarea[x].extraAsset[i].rotation = 90; 
					this.betarea[x].extraAsset[i].y -= this.betarea[x].extraAsset[i].regX; 
					this.betarea[x].extraAsset[i].x += areas[x].w/2; 
				}

				if(i == 2) {
					this.betarea[x].extraAsset[i].y += ((areas[x].h)+this.betarea[x].extraAsset[i].regX); 
					this.betarea[x].extraAsset[i].rotation = -90; 
					this.betarea[x].extraAsset[i].x += areas[x].w/2; 
				}

				if(i == 3) {
					this.betarea[x].extraAsset[i].x += ((areas[x].w) + this.betarea[x].extraAsset[i].regX); 
					this.betarea[x].extraAsset[i].rotation = 180; 
					this.betarea[x].extraAsset[i].y += areas[x].h/2; 
				}

				this.tableContainer.addChild(this.betarea[x].extraAsset[i]);
			}
			this.tableContainer.addChild(this.betarea[x]);


			if(areas[x].text) {
				this.betarea[x].text = new createjs.Text(areas[x].text, "30px UnBatangBold, Batang", areas[x].textColor);
				this.betarea[x].text.x = this.betarea[x].x + (areas[x].w/2);
				this.betarea[x].text.y = this.betarea[x].y + 24//(areas[x].h/2);
				this.betarea[x].text.textAlign ="center";
				this.betarea[x].text.textBaseline ="middle";
				this.betarea[x].text.hitArea = this.betarea[x];
				this.tableContainer.addChild(this.betarea[x].text);
			}
			if(areas[x].text2) {
				this.betarea[x].text2 = new createjs.Text(areas[x].text2, "14px lato-black", areas[x].textColor);
				this.betarea[x].text2.x = this.betarea[x].x + (areas[x].w/2);
				this.betarea[x].text2.y = this.betarea[x].y + (areas[x].h) - 20;
				this.betarea[x].text2.textAlign ="center";
				this.betarea[x].text2.textBaseline ="middle";
				this.betarea[x].text2.hitArea = this.betarea[x];
				this.tableContainer.addChild(this.betarea[x].text2);
			}

			w += (areas[x].w+areas[x].x); 
			h += areas[x].h; 
		}
		
		//cache
		// this.tableContainer.cache(-50,-50,w + 100,h + 100);
		// this.tableContainer.updateCache();

		if(flag) {
			this.self.context.component_multibetBetting2.register(this, true);
		}

		this.animation = [];
	}
	
	setBetrange (data, set) {

		this.betrange = data;

		this.links = {
			confirm : `${window.pg_domain}bet/store/${this.data.tableNumber}/${this.betrange.min}-${this.betrange.max}`,
			cancel : `${window.pg_domain}bet/cancelMulti/${this.data.tableNumber}/${this.betrange.min}-${this.betrange.max}`,
			logs : `${window.pg_domain}actionlogs/store/${this.data.tableNumber}/${this.betrange.min}-${this.betrange.max}`
		}

		this.mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
		if (window.mainMultiplier % 10) this.mainMultiplier = 1;
		
		//Main area range
		let main = {};
		main.min = (this.betrange.min * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
		main.max = (this.betrange.max * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier) * this.mainMultiplier;
		
		this.currentRange = `${main.min}-${main.max}`;

		this.allAreasConfig.classic.forEach((area)=>{
			area.range = main;
		});

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

	animateDice (data) {
		if(this.isAnimate) return;
		this.isAnimate = true;
		for(var x = 1; x <= 2; x++) {
		
			let toAnim = this[`dice${x}`].diceCon;
			toAnim.stop = false;
			toAnim.index = x;
			let d = this[`dice${x}`];

			createjs.Tween.get(toAnim, {loop:true})
			.to({
				rotation : 360 
			},1000)
			.to({
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

		},200))
	}

	clearAll () {
		this.animation.forEach((a) => {
			clearInterval(a);
		});
	}

	inputItem (data) {
		if(window.tutorial_enabled) return;

		if(data.type.indexOf('dice') > -1) this.animateDice(data);

		if(data.type=== 'seat') {

			this.dice1.diceCon.stop = true;
			this.dice2.diceCon.stop = true;

			createjs.Tween.removeTweens(this.dice1.diceCon);
			createjs.Tween.removeTweens(this.dice2.diceCon);
			
			this.dice1.diceCon.rotation = 0;
			this.dice2.diceCon.rotation = 0;

			let diceval = _.clone(data.gameInfo.dices);

			for(var x = 0; x < diceval.length; x++) {
				if(parseInt(diceval[x]) === 1) diceval[x] = "One";
				if(parseInt(diceval[x]) === 2) diceval[x] = "Two";
				if(parseInt(diceval[x]) === 3) diceval[x] = "Three";
				if(parseInt(diceval[x]) === 4) diceval[x] = "Four";
				if(parseInt(diceval[x]) === 5) diceval[x] = "Five";
				if(parseInt(diceval[x]) === 6) diceval[x] = "Six";
			}

			let bg1 = this.dice1.diceCon.children[0];
			this.dice1.diceCon.removeAllChildren();
			this.dice1.diceCon.addChild(bg1)
			this.dice1[`setDice${diceval[0]}`]();

			let bg2 = this.dice2.diceCon.children[0];
			this.dice2.diceCon.removeAllChildren();
			this.dice2.diceCon.addChild(bg2)
			this.dice2[`setDice${diceval[1]}`]();
			//end dice

			this.value.visible = true;
			this.total.visible = true;

			this.value.text = data.value.toUpperCase();
			this.value.x += this.value.getMeasuredWidth()/2
			this.total.text = _.reduce(data.gameInfo.dices, function (sum, n) {return parseInt(sum) + parseInt(n)});

			this.total.scaleX = this.total.scaleY = 0;
			this.value.scaleX = this.value.scaleY = 0;

			createjs.Tween.get(this.total)
			.wait(1000)
			.to({
				scaleY:1,
				scaleX:1
			},250);

			createjs.Tween.get(this.value)
			.wait(1000)
			.to({
				scaleY:1,
				scaleX:1
			},250)

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
				x : this.dice1.diceCon.ox - 70
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
				x : this.dice2.diceCon.ox - 70
			},250);

		}

		this.buttonsContainer.visible = false;
		this.resultContainer.visible = true;

		// this.winBetIndicator.text = 'Win';
		// this.betWinAmt.text = '0';

		this.tableContainer.alpha = 0.5;

		let tilesData = data.gameInfo.tiles;

		if(!_.isEmpty(tilesData)) {
			for(var key in tilesData) {

				if(tilesData[key][0] && tilesData[key][1]) {
					let val = [tilesModule(tilesData[key][0]).value, tilesModule(tilesData[key][1]).value];
					this[`${key}_total`].text = _.reduce(val, function(sum, n) { return parseInt(sum) + parseInt(n)}) % 10;

					if(tilesData[key][0] === tilesData[key][1] && tilesData[key][1] !== null) {
						this[`${key}_total`].text = tilesModule(tilesData[key][0]).value + ' PAIR';
					}
				}

				for(var x = 1; x <= tilesData[key].length; x++ ) {
					if(!tilesData[key][(x-1)]) continue;
					this[`${key}_${x}`].visible = true;
					this[`${key}_${x}`].gotoAndStop(`tile-${tilesData[key][(x-1)][3]}`);

					createjs.Tween.get(this[`${key}_${x}`])
					.to({
						y : this[`${key}_${x}`].oy,
						alpha : 1 
					},200)

				}
			}
		}

	}

	displayResult (data) {
		if(window.tutorial_enabled) return;
		let winner = data.gameResult.winner;

		for(var x = 0; x < winner.length; x++) {
			createjs.Tween.get(this[`${winner[x]}_bg`])
			.to({ alpha : 0.2 },300)
			.to({ alpha : 1 },300)
			.to({ alpha : 0.2 },300)
			.to({ alpha : 1 },300)
			.to({ alpha : 0.2 },300)
			.to({ alpha : 1 },300)
			.to({ alpha : 0.2 },300)
			.to({ alpha : 1 },300)
		}

		setTimeout(() => {
			this.gameNewRound();
		}, 9000)
	}

	gameNewRound(data) {
		if(window.tutorial_enabled) return;
		this.isAnimate = false;
		
		this.resultContainer.visible = false;
		this.buttonsContainer.visible = true;

		this.value.visible = false;
		this.total.visible = false;
		this.value.x = this.value.ox;

		this.dice1.diceCon.x = this.dice1.diceCon.ox;
		this.dice2.diceCon.x = this.dice2.diceCon.ox;

		let tiles_type = ['banker', 'up', 'heaven', 'down'];
		for(var x= 0; x < tiles_type.length; x++){
			this[`${tiles_type[x]}_2`].visible = false;
			this[`${tiles_type[x]}_1`].visible = false;

			this[`${tiles_type[x]}_2`].alpha = 0;
			this[`${tiles_type[x]}_1`].alpha = 0;

			this[`${tiles_type[x]}_2`].y = 100;
			this[`${tiles_type[x]}_1`].y = 100;

			this[`${tiles_type[x]}_total`].text = 0;
			this[`${tiles_type[x]}_total`].text = 0;
		}
		
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
					this.self.context.component_multibetBetting2.repeatBet({currentTarget : this.repeatButton},true, false);

					//set all chips to confirmed
					this.betarea.forEach((area) => {
						area.chips.forEach((chip) => {
							chip.confirmed = true;
						})
					});
					
					this.checkButtonState();					
				}

			});					
		});
	}

	staticGameInfo(data) {
		data.gameInfo = {"dices":[4,4],"setCount":2,"seat":"down","tiles":{"up":["0005","0009"],"down":["0001","0009"],"banker":["0007","0005"],"heaven":["0004","0001"]}};
		return data;
	}

	staticBets(data){
		data.bets = [{"bet": "up", "bet_amount": 100000, "win_money": 115500, "user_money": 8443700}, {"bet": "heaven", "bet_amount": 100000, "win_money": 115500, "user_money": 8413700}, {"bet": "down", "bet_amount": 100000, "win_money": 229500, "user_money": 8383700}];
		data.userId = window.userId
		return data;
	}
}

export default {
	Paigow
}