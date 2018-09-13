import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../../factories/factories';
import cardValue from '../../factories/cards';

let lobby_all_data = {
	betResult: new createjs.Container(),
	betDetails: new createjs.Container(),
	main() {
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
			let markText = '';
			let markColorCode = '';
			
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
			betDataMarkCircle[i].graphics.beginFill(markColorCode).drawCircle(0, 0, 15);
			betDataMarkCircle[i].y = 65 * i;
			this.betResult.addChild(betDataMarkCircle[i]);

			if (results.winner === 'suited tie') {
				betDataMarkCircle[i].graphics.clear().ss(2).s('#c97d1b').beginFill(markColorCode).drawCircle(0, 0, 15);
			}

			if (results.pairs && results.pairs.length) {
				for (var j = 0; j < results.pairs.length; j++) {
					if (results.pairs[j] == 'player') {
						betDataPairCircle[j] = new createjs.Shape();
						betDataPairCircle[j].graphics.s('#fff').ss(0.3).beginFill('#1977d1').drawCircle(0, 0, 5);
						betDataPairCircle[j].x = betDataMarkCircle[i].x + 10;
						betDataPairCircle[j].y = betDataMarkCircle[i].y + 10;
						this.betResult.addChild(betDataPairCircle[j]);
					}
					else if (results.pairs[j] == 'banker') {
						betDataPairCircle[j] = new createjs.Shape();
						betDataPairCircle[j].graphics.s('#fff').ss(0.3).beginFill('#d32f2e').drawCircle(0, 0, 5);
						betDataPairCircle[j].x = betDataMarkCircle[i].x - 10;
						betDataPairCircle[j].y = betDataMarkCircle[i].y - 10;
						this.betResult.addChild(betDataPairCircle[j]);
					}
				}
			}
			
			betDataMarkNum[i] = new createjs.Text(markText, 'bold 19px Lato', '#fff');
			betDataMarkNum[i].x = betDataMarkCircle[i].x;
			betDataMarkNum[i].y = betDataMarkCircle[i].y - 12;
			betDataMarkNum[i].textAlign = 'center';
			this.betResult.addChild(betDataMarkNum[i]);

			if (record.game_type === 'Sicbo') {
				let gameInfo = JSON.parse(record.game_info);
				let markNum = 0;

				for (var j in gameInfo) {
					markNum += parseInt(gameInfo[j]);
				} // end for in

				betDataMarkCircle[i].graphics.clear().beginFill('#000').drawCircle(0, 0, 15);
				betDataMarkNum[i].text = markNum;
			}
			else if (record.game_type === 'Super 6') {
				if (results.supersix === true) {
					betDataMarkCircle[i].graphics.clear().beginFill('#febd48').drawCircle(0, 0, 15);
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