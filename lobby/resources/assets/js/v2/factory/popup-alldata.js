import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../../factories/factories';
import cardValue from '../../factories/cards';
import tilesModule from '../../factories/tiles';

let lobby_all_data = {
	betResult: new createjs.Container(),
	betDetails: new createjs.Container(),
	main() {
	},

	colorTiles(data) {
		if(data == "banker") {
			this.bgColor = "#B62026";
		} else if(data == "heaven") {
			this.bgColor = "#2765AF";
		} else if (data == "up") {
			this.bgColor = "#EF8F21";
		} else {
			this.bgColor = "#009559";
		}
		return this.bgColor;
	},
	setBetLogs(data) {
		this._betLogs = data;
		let betDataMarkCircle = [];
		let betDataMarkNum = [];
		let betDataPairCircle = [];

		for (var i = 0; i < this._betLogs.length; i++) {
			if (this._betLogs[i].game_type === 'Ka Gaming') continue;

			if (this._betLogs[i].status.toLowerCase() === 'w') {
				let voidIco = new createjs.Bitmap("/img/v2_1/icons/void/void_icon.png");
				voidIco.y = (65 * i) - 13;
				this.betResult.addChild(voidIco);

				continue;
			}

			let record = this._betLogs[i];
			let results = JSON.parse(record.game_result);
			let gameInfo = JSON.parse(record.game_info);
			let markText = '';
			let markColorCode = '';
      let space = 0;

			if (record.game_result === null) continue;

			switch(results.winner) {
				case ("suited tie"):
					markText = window.language.locale == "zh" ? '和' : 'T'
					markColorCode = '#06770d';
					break;

				case ("tie"):
					markText = window.language.locale == "zh" ? '和' : 'T'
					markColorCode = '#689f39';

					if (record.game_type === 'Dragon Tiger') {
						markColorCode = '#06770d';
					}
					else if (record.game_type === "Texas Hold'Em") {
						markColorCode = '#689f39';
					}
					break;

				case ("dragon"):
					markText = window.language.locale == "zh" ? '龙' : 'D';
					markColorCode = '#1877d3 ';
					break;

				case ("tiger"):
					markText = window.language.locale == "zh" ? '虎' : 'T';
					markColorCode = '#b71d1d';
					break;

				case ("banker"):
					markText = window.language.locale == "zh" ? '庄' : 'B';
					markColorCode = '#b61c1a';
					break;

				case ("player"):
					markText = window.language.locale == "zh" ? '闲' : 'P';
					markColorCode = '#1b76d1';

					if (record.game_type === "Texas Hold'Em") markColorCode = '#1776d0';
					break;

				case ("dealer"):
					markText = window.language.locale == "zh" ? '荷' : 'D';
					markColorCode = '#b61c1c';
					break;

				case ("tie"):
					markText = window.language.locale == "zh" ? '和' : 'T';
					markColorCode = '#689f39';
					break;
			}

			betDataMarkCircle[i] = new createjs.Shape();
			betDataMarkCircle[i].graphics.beginFill(markColorCode).drawCircle(0, 0, 20);
			betDataMarkCircle[i].y = 65 * i;
			this.betResult.addChild(betDataMarkCircle[i]);

			if (results.winner === 'suited tie') {
				betDataMarkCircle[i].graphics.clear().ss(2).s('#c97d1b').beginFill(markColorCode).drawCircle(0, 0, 20);
			}

			if (results.pairs && results.pairs.length) {
				for (var j = 0; j < results.pairs.length; j++) {
					if (results.pairs[j] == 'player') {
						betDataPairCircle[j] = new createjs.Shape();
						betDataPairCircle[j].graphics.s('#fff').ss(0.3).beginFill('#1977d1').drawCircle(0, 0, 6);
						betDataPairCircle[j].x = betDataMarkCircle[i].x + 14;
						betDataPairCircle[j].y = betDataMarkCircle[i].y + 14;
						this.betResult.addChild(betDataPairCircle[j]);
					}
					else if (results.pairs[j] == 'banker') {
						betDataPairCircle[j] = new createjs.Shape();
						betDataPairCircle[j].graphics.s('#fff').ss(0.3).beginFill('#d32f2e').drawCircle(0, 0, 6);
						betDataPairCircle[j].x = betDataMarkCircle[i].x - 14;
						betDataPairCircle[j].y = betDataMarkCircle[i].y - 14;
						this.betResult.addChild(betDataPairCircle[j]);
					}
				}
			}

			betDataMarkNum[i] = new createjs.Text(markText, 'bold 23px Lato', '#fff');
			betDataMarkNum[i].x = betDataMarkCircle[i].x;
			betDataMarkNum[i].y = betDataMarkCircle[i].y;
			betDataMarkNum[i].textAlign = 'center';
			betDataMarkNum[i].textBaseline = 'middle';
			this.betResult.addChild(betDataMarkNum[i]);

			if(record.game_type === 'Pai-Gow') {
				for(let j=0;j<results.winner.length;j++) {
	        let isPair = _.find(results.pairs, (o) => { return results.winner[j] == o }) != undefined;
	        let totalText = isPair ? tilesModule(gameInfo.tiles[results.winner[j]][0]).text : _.sum(_.flatMap(gameInfo.tiles[results.winner[j]], (v) => { return tilesModule(v).value; })) % 10 || 0;

					this.bgColor = this.colorTiles(results.winner[j]);

	        betDataMarkCircle[j] = new createjs.Shape();
	  			betDataMarkCircle[j].graphics.beginFill(this.bgColor).drawCircle(0, 0, 20);
					if(results.winner.length > 2) {
						betDataMarkCircle[j].x =  space  - 40;
					} else if(results.winner.length == 2) {
						betDataMarkCircle[j].x = space - 20;
					} else {
						betDataMarkCircle[j].x =  0;
					}
	  			betDataMarkCircle[j].y = 65 * i;
					//if pair add small circle
					if(isPair) {
						betDataMarkCircle[j].graphics.moveTo(0,15).setStrokeStyle(0.8).beginStroke('#fff').drawCircle(12,12,6);
					}
	  			this.betResult.addChild(betDataMarkCircle[j]);

	  			betDataMarkNum[j] = new createjs.Text(totalText, '19px LatoBold', '#fff');
	  			betDataMarkNum[j].x = betDataMarkCircle[j].x;
	  			betDataMarkNum[j].y = betDataMarkCircle[j].y;
	  			betDataMarkNum[j].textAlign = 'center';
	  			betDataMarkNum[j].textBaseline = 'middle';
	  			this.betResult.addChild(betDataMarkNum[j]);
					space += 45;
				} // end for loop
			}

			if (record.game_type === 'Sicbo') {
				let markNum = 0;

				for (var j in gameInfo) {
					markNum += parseInt(gameInfo[j]);
				} // end for in

				betDataMarkCircle[i].graphics.clear().beginFill('#000').drawCircle(0, 0, 20);
				betDataMarkNum[i].text = markNum;
			}
			else if (record.game_type === 'Super 6') {
				if (results.supersix === true) {
					betDataMarkCircle[i].graphics.clear().beginFill('#febd48').drawCircle(0, 0, 20);
					betDataMarkNum[i].color = '#000';
					betDataMarkNum[i].text = 6;
				}
			}
		} //end for loop

		return this.betResult;
	},

	paginateResult(data) {
		this.betResult.removeAllChildren();
		this.setBetLogs(data);
	},

	formatNumber(number) {
	  number = parseInt(number) || 0;
	  return number.toLocaleString('en');
	},
}

export default {
	lobby_all_data
}
