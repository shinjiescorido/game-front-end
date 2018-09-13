let instance = null;

export default(links) => {
	instance = instance || new blu.Component({
		betResult: new createjs.Container(),
		betDetails: new createjs.Container(),
		main() {
		},

		setBetLogs(data) {
			this._betLogs = data;
			this._betLogs.data = _.values(this._betLogs.data);
			let betDataMarkCircle = [];
			let betDataMarkNum = [];

			for (var i = 0; i < this._betLogs.data.length; i++) {
				if (this._betLogs.data[i].game_type === 'Ka Gaming') continue;
				
				let record = this._betLogs.data[i];
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
				betDataMarkCircle[i].graphics.beginFill(markColorCode).drawCircle(0, 0, 20);
				betDataMarkCircle[i].y = 65 * i;
				this.betResult.addChild(betDataMarkCircle[i]);

				if (results.winner === 'suited tie') {
					betDataMarkCircle[i].graphics.clear().ss(2).s('#c97d1b').beginFill(markColorCode).drawCircle(0, 0, 20);
				}

				betDataMarkNum[i] = new createjs.Text(markText, 'bold 23px Lato', '#fff');
				betDataMarkNum[i].x = betDataMarkCircle[i].x;
				betDataMarkNum[i].y = betDataMarkCircle[i].y - 15;
				betDataMarkNum[i].textAlign = 'center';
				this.betResult.addChild(betDataMarkNum[i]);

				if (record.game_type === 'Sicbo') {
					let gameInfo = JSON.parse(record.game_info);
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
			this.setBetLogs(JSON.parse(data));
		},

		formatNumber(number) {
	      number = parseInt(number) || 0;
	      return number.toLocaleString('en');
	    },
	});

	return instance;
}
