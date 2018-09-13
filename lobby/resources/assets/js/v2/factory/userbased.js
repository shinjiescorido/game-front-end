import { createSprite, randomNum, createCardSprite, createTileSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';
import rmformat from '../../factories/formatter';
import tilesModule from '../../factories/tiles';
import timer from '../../timer-animation';
import sboard from '../../factories/scoreboard_draw';

let formatData = rmformat();
let drawSboard  = sboard();
let instance = null;

instance = {
	tables :[],
	getText(x,y,text,font,color,align,valign){
		let ctrl = new createjs.Text(text,font,color);
		ctrl.x = x;
		ctrl.y = y;
		ctrl.textAlign = align;
		ctrl.textBaseline = valign;//"middle"
		return ctrl;
    },
	makeRoomListTables(data, gamedata, _target, _timer_c,  x, self, isPublic) {
		this.tables[x] = _target.tables;
		//players icon
		let capital_text = new createjs.Text(window.language.lobby.banker_capital, '18px LatoRegular', '#b3b3b3');
		capital_text.textAlign = "left";
		capital_text.x = 120;
		capital_text.y = 50;
		_target.addChild(capital_text);

		let bankerMoney = 0;
    if (data.banker.money) {
      bankerMoney = data.banker.money;
    }

		this.capital = new createjs.Text(numberWithCommas(bankerMoney), '28px BebasNeue', '#fff');
    this.capital.textAlign = "left";
    this.capital.x = capital_text.x ;
    this.capital.y = capital_text.y + 22;
    _target.addChild(this.capital);

		let betrange_text = new createjs.Text(window.language.lobby.bet_range, '19px LatoRegular', '#b3b3b3');
    betrange_text.textAlign = "left";
    betrange_text.x = capital_text.x + 180 + 25;
    betrange_text.y = capital_text.y;
    _target.addChild(betrange_text);

		let splitbetrange =  data.data[6].split(/[-]/);
		let betRangeMax = 0;
		let betRangeMin = 0;
		let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;

		betRangeMax = (parseInt(splitbetrange[1]) * parseInt(window.currencyMultiplier)) * window.userMultiplier * mainMultiplier;
		betRangeMin = (parseInt(splitbetrange[0]) * parseInt(window.currencyMultiplier)) * window.userMultiplier * mainMultiplier;

		let betrange = new createjs.Text(numberWithCommas(betRangeMin)+'-'+ numberWithCommas(betRangeMax), '28px BebasNeue', '#fff');
    betrange.textAlign = "left";
    betrange.x = betrange_text.x ;
    betrange.y = betrange_text.y + 22;
    _target.addChild(betrange);


		let usersIco = new createjs.Bitmap('/img/icons/ico_lobby_users.png');
		usersIco.x = betrange_text.x + 220;
		usersIco.y = betrange_text.y + 18;
		usersIco.scaleX = usersIco.scaleY = 0.8;
		_target.addChild(usersIco);

		let usertotal = 0;

		if(parseInt(data.banker.users) == 0) {
			usertotal = 0;
		} else {
			usertotal = parseInt(data.banker.users) - 1;
		}

		this.userCount = new createjs.Text( usertotal+"/"+data.data[7],"24px BebasNeue","#b3b3b3");
		this.userCount.x = usersIco.x + 35;
		this.userCount.y = usersIco.y - 4;
		this.userCount.textAlign = 'left';
		_target.addChild(this.userCount);
	},

	sicboGameTable(data, _target) {
		_target.game_container.removeAllChildren();
		// _target.tables = this.tables;
		this.tables = _target.tables;

		this.tables.timer = _.clone(timer());
		this.tables.timer.scaleX = this.tables.timer.scaleY = 0.9;
		this.tables.timer.is_timerStart = false;
		this.tables.timer.visible = true;
		this.tables.timer.x = -6.5;
		this.tables.timer.y = 28.5;
		_target.game_container.addChild(this.tables.timer);
		// _target.timer = this.timer

		let round_stat ="";
		switch(data.roundStatus){
			case "S":
				round_stat = window.language.lobby.nowbetting;
				break;
			case "E":
				round_stat = window.language.lobby.bettingend;
				break;
			case "P":
				if(data.gameName == "Baccarat" || data.gameName == "Dragon-Tiger" || data.gameName == "Poker"){
					round_stat = window.language.lobby.dealing;
				}else{
					round_stat = window.language.lobby.result;
				}
				break;
			case "R" :
				round_stat = window.language.lobby.result;
				break;
		}

		if(!data.marks.length) {
			round_stat = window.language.prompts.promptshuffling;
		}

		this.tables.status = this.getText(70, 320, window.language.lobby.nowbetting, "21px LatoBold","#fff","center","middle");
    this.tables.status.lineWidth = 120;
		_target.game_container.addChild(this.tables.status);

		this.dealer_img_bg  = new createjs.Shape();
		this.dealer_img_bg.graphics.beginFill("#f5ac4e").drawCircle(0,0,45);
		this.dealer_img_bg.x = 70;
		this.dealer_img_bg.y = 105;
		_target.game_container.addChild(this.dealer_img_bg);

		this.dealer_img  = new createjs.Bitmap(data.dealerImage);
		this.dealer_img.x = 20;
		this.dealer_img.y = 60;
		this.dealer_img.scaleX = this.dealer_img.scaleY = 0.75;
		this.dealer_img.mask = this.dealer_img_bg;
		_target.game_container.addChild(this.dealer_img);

		this.dealerName = this.getText(70,160, data.currentDealer, "21px LatoBold","#fff","center","top");
    _target.game_container.addChild(this.dealerName);

		let result_mask = new createjs.Shape();
    result_mask.graphics.f('red').drawRoundRect(0,0,245,210,10);
    result_mask.x = 145;
    result_mask.y = 60;


		let lastresult_text = this.getText(145 + (245/2) ,60 + 10, "LAST RESULT", "15px LatoBold","#fff","center","top");
		_target.game_container.addChild(lastresult_text);

		this.lastdice_res_container = new createjs.Container();
		this.lastdice_res_container.mask = result_mask;
		_target.game_container.addChild(this.lastdice_res_container);


		//makeRoadmap
		let roadmap_bg = new createjs.Shape();
		roadmap_bg.graphics.ss(1).s("#9c9c9c").beginFill("#fff").drawRect(0, 0, 380, 165);
		roadmap_bg.x = 18;
		roadmap_bg.y = 365;
		_target.game_container.addChild(roadmap_bg);

		let lines = new createjs.Shape();
		lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0, 0)
		_target.game_container.addChild(lines);
		let posY = roadmap_bg.y;
		let posX = roadmap_bg.x;

		for (var i = 0; i <= 6; i++) {
			lines.graphics.moveTo(posX, posY + (27.5 * i)).lineTo(posX + 380, posY + (27.5 * i))
		}

		for (var i = 0; i <= 13; i++) {
			lines.graphics.moveTo(posX + (27.14 * i), posY).lineTo(posX + (27.14 * i), posY + 165)
		}
		let mask = new createjs.Shape();
		mask.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(0,0,732.78,165);
		mask.x = roadmap_bg.x;
		mask.y = roadmap_bg.y;

		this.size_container = new createjs.Container();
		this.size_container.visible = true;
		this.size_container.x = roadmap_bg.x;
		this.size_container.mask = mask;
		_target.game_container.addChild(this.size_container);

		this.size_container = new createjs.Container();
		this.size_container.visible = true;
		this.size_container.x = roadmap_bg.x;
		this.size_container.mask = mask;
		_target.game_container.addChild(this.size_container);

		this.parity_container = new createjs.Container();
		this.parity_container.visible = false;
		this.parity_container.x = roadmap_bg.x;
		this.parity_container.mask = mask;
		_target.game_container.addChild(this.parity_container);

		this.sum_container = new createjs.Container();
		this.sum_container.visible = false;
		this.sum_container.x = roadmap_bg.x;
		this.sum_container.mask = mask;
		_target.game_container.addChild(this.sum_container);

		this.dice_container = new createjs.Container();
		this.dice_container.visible = false;
		this.dice_container.x = roadmap_bg.x;
		this.dice_container.mask = mask;
		_target.game_container.addChild(this.dice_container);

		this.size_container.visible = true;
		this.sum_container.visible = false;
		this.dice_container.visible = false;
		this.parity_container.visible = false;

		//Maintenance
		let header_bg =  ["#8e24aa","#4d158d"];
		let text_color = "";

		this.tables.maintenanceCon = new createjs.Container();
		this.tables.maintenanceCon.visible = false;
		_target.addChild(this.tables.maintenanceCon);

		this.sicboDrawRoadmap(data);
		this.sicboSetResult(data);
	}, //sicboBannerTable

	sicboSetResult (data) {
		if (!data.marks.length) return;

		data.marks = _.filter(data.marks, (row) => {
			if ('game_info' in row) {
				return row;
			}
		});
		// _target.addChild(result_bg);

		this.dice = [];
		this.size = [];
		this.total = [];
		this.lastdice_res_container.removeAllChildren();

		let last150 = null;
		if (data.marks.length > 5) {
			last150 = data.marks.slice(Math.max(data.marks.length - 6, 1)).reverse();
		} else if (data.marks.length <= 5) {
			last150 = data.marks.reverse();
		}

		last150 = _.filter(last150,  (row) => {
			if(typeof row.game_info === 'string') {
				row.game_info = JSON.parse(row.game_info)
			}
			return row.game_info;
		});

		for (var i = 0; i < last150.length; i++) {
			let dice = last150[i].game_info.one + "" + last150[i].game_info.two + "" + last150[i].game_info.three;

			if (dice == "") dice = "123";

			this.dice.push({
				dice1: new createjs.Bitmap("/img/dice/dice" + dice[0] + ".png"),
				dice2: new createjs.Bitmap("/img/dice/dice" + dice[1] + ".png"),
				dice3: new createjs.Bitmap("/img/dice/dice" + dice[2] + ".png"),
				isVoid : last150[i].isVoid ? true : false
			});


			if(this.dice[i].isVoid) {
				let voidContainer = new createjs.Container();
				voidContainer.isVoid = true;

				var voidShape = new createjs.Shape();
				voidShape.graphics.beginFill("#212120").drawRect(0,0,160,34);
				voidShape.y =  (i * 37) + 45+2
				voidShape.x =  370;
				voidShape.isVoid = true;
				voidContainer.addChild(voidShape);

				var voidText = new createjs.Text("GAME VOID", " bold 12px lato", "#fff");
				voidText.set({x: 394, y: ((i*30) + 45) + (38/2), textBaseline: 'middle'})
				voidContainer.addChild(voidText);

				var voidImg = new createjs.Bitmap(self.context.load.getResources("void"));
				voidImg.set({x: voidText.x + voidText.getMeasuredWidth() + 12, y: ((i*30) + 45) + (38/2), regY : voidImg.getBounds().height/2});
				voidContainer.addChild(voidImg);

				this.lastdice_res_container.addChild(voidContainer);
			}

			this.lastdice_res_container.addChild(this.dice[i].dice1);
			this.lastdice_res_container.addChild(this.dice[i].dice2);
			this.lastdice_res_container.addChild(this.dice[i].dice3);


			this.dice[i].dice2.y = 95 + (i * 43) + 6;
			this.dice[i].dice1.y = 95 + (i * 43) + 6;
			this.dice[i].dice3.y = 95 + (i * 43) + 6;

			this.dice[i].dice1.x = 145 + 42 - 2;
			this.dice[i].dice2.x = this.dice[i].dice1.x + 42;
			this.dice[i].dice3.x = this.dice[i].dice2.x + 42;

			this.dice[i].dice1.scaleX = this.dice[i].dice1.scaleY = 0.44;
			this.dice[i].dice2.scaleX = this.dice[i].dice2.scaleY = 0.44;
			this.dice[i].dice3.scaleX = this.dice[i].dice3.scaleY = 0.44;

			let total = _.reduce(dice.split(""), function(sum, n) {
				return parseInt(sum) + parseInt(n);
			});

			let uniqDice = _.uniq(dice.split(""));

			let text;

			if(window.language.locale == "zh") {
				text = uniqDice.length == 1 ? "和" : (total >= 11 ? "大" : "小");
				this.size[i] = new createjs.Text(text, "30px BebasNeue", text == "和" ? "#3aa955" : (text == "大" ? "#d22f2f" : "#1665c1"));
				this.total[i] = new createjs.Text(total, "30px BebasNeue", text == "和" ? "#3aa955" : (text == "大" ? "#d22f2f" : "#1665c1"));
			} else {
				text = uniqDice.length == 1 ? "T" : (total >= 11 ? "B" : "S");
				this.size[i] = new createjs.Text(text, "40px BebasNeue", text == "T" ? "#3aa955" : (text == "B" ? "#d22f2f" : "#1665c1"));
				this.total[i] = new createjs.Text(total, "40px BebasNeue", text == "T" ? "#3aa955" : (text == "B" ? "#d22f2f" : "#1665c1"));
			}

			this.size[i].x = this.dice[i].dice3.x + 50;
			this.size[i].y = this.dice[i].dice3.y + 19;
			this.size[i].textBaseline = "middle";
			this.lastdice_res_container.addChild(this.size[i]);

			if(window.language.locale == "zh") {
				this.total[i].x = this.size[i].x + 20;
			} else {
				this.total[i].x = this.size[i].x + 15;
			}

			this.total[i].y = this.size[i].y;
			this.total[i].textBaseline = "middle";
			this.lastdice_res_container.addChild(this.total[i]);


		}

		if (!this.lastdice_res_container.children.length) return;

		this.lastdice_res_container.children = this.lastdice_res_container.children.reverse()
		let shouldAnimate = true;
		for(var i = this.lastdice_res_container.children.length-1; i >= this.lastdice_res_container.children.length-5; i--) {

			if(this.lastdice_res_container.children[i].isVoid) {
				shouldAnimate = false;
			}

			if(shouldAnimate) {
				createjs.Tween.get(this.lastdice_res_container.children[i])
				.to({  alpha: 180 }, 180)
				.to({ alpha: 0 }, 180)
				.to({ alpha: 1 }, 180)
				.to({ alpha: 0 }, 180)
				.to({ alpha: 1 }, 180)
			}
		}

		let stattext = "";
		if(data.roundStatus.toLowerCase() == "p"){
			stattext = window.window.language.lobby.result;
		} else if( data.roundStatus.toLowerCase() == "s"){
			stattext = window.window.language.lobby.nowbetting;
		} else if(data.roundStatus.toLowerCase() == "E") {
			stattext = window.window.language.lobby.bettingend;
		}
		this.tables.status.text = stattext;
	}, //sicboSetResult
	sicboDrawRoadmap(data) {
		let container = null;
		let xPos = 0;
		let yPos = 0;
		let r = 0;
		let mask = null;

		let marks = formatData.fnFormatSicbo(data.marks, 13,6);
		for (var key in marks) {
			if (this[key + "_container"]) {
				if (!this[key + "_container"]) return;

				this[key + "_container"].removeAllChildren();
				this[key + "_container"].x = 32;
				this[key + "_container"].y = 379;

				container = this[key + "_container"];
				xPos = 27.14;
        yPos = 27.5;
        r = 12;

				let color = "";
				let text_val = "";
				let font_size = "bold 14px lato";

				let arr = marks[key];

				for (var e = 0; e < arr.length; e++) {
					if (arr[e] !== undefined) {
						for (var i = 0; i < arr[e].length; i++) {
							if (!arr[e][i]) continue;

							if (arr[e][i] !== undefined) {

								color = "#e5b241";
								text_val = arr[e][i];

								if (text_val.length > 2) {
									font_size = "bold 12px lato"
								}

								if (arr[e][i] == "odd") {
									color = "#d32f2f";
									text_val = window.language.locale == "zh" ? "单" : "O";
									font_size = window.language.locale == "zh" ? "14px lato" : "14px lato";
								}
								if (arr[e][i] == "even") {
									color = "#1565c0";
									text_val = window.language.locale == "zh" ? "双" : "E";
									font_size = "14px lato";
								}
								if (arr[e][i] == "big") {
									color = "#d32f2f";
									text_val = window.language.locale == "zh" ? "大" : "B";
									font_size = window.language.locale == "zh" ? "14px lato" : "14px lato";
								}
								if (arr[e][i] == "small") {
									color = "#1565c0";
									text_val = window.language.locale == "zh" ? "小" : "S";
									font_size = window.language.locale == "zh" ? "14px lato" : "14px lato";
								}
								if (arr[e][i] == "triple") {
									color = "#41a257";
									text_val = window.language.locale == "zh" ? "和" : "T";
									font_size = window.language.locale == "zh" ? "14px lato" : "14px lato";
								}

								arr[e][i] = new createjs.Shape();
								arr[e][i].graphics.beginFill(color).drawCircle(0, 0, r);
								arr[e][i].x = e * xPos;
								arr[e][i].y = i * yPos;

								arr[e][i].text = new createjs.Text(text_val, font_size, "#fff");
								if (key == "dice" || key == "sum") {
									arr[e][i].text = new createjs.Text(text_val, font_size, "#000");
								}
								arr[e][i].text.x = arr[e][i].x;
								arr[e][i].text.y = arr[e][i].y;

								arr[e][i].text.textAlign = "center";
								arr[e][i].text.textBaseline = "middle";
								container.addChild(arr[e][i], arr[e][i].text);
							}
						} //end for
					} //end if

				} //end for

				createjs.Tween.get(container.children[container.children.length - 1])
				.to({
					alpha: 1
				}, 180)
				.to({
					alpha: 0
				}, 180)
				.to({
					alpha: 1
				}, 180)
				.to({
					alpha: 0
				}, 180)
				.to({
					alpha: 1
				}, 180)

				createjs.Tween.get(container.children[container.children.length - 2])
				.to({
					alpha: 1
				}, 180)
				.to({
					alpha: 0
				}, 180)
				.to({
					alpha: 1
				}, 180)
				.to({
					alpha: 0
				}, 180)
				.to({
					alpha: 1
				}, 180)
			}

		}
	},

	/*** paigow ***/
	paigowGameTable (data, _target, self) {

		//adjust existing
    self.gameName_bg.graphics.clear().beginLinearGradientFill(["#c1185b","#750c44"], [0,1],0,0,230,0).drawRoundRectComplex( 0, 0, 420, 40, 10, 0, 0, 0 );
    self.createButton.graphics.clear().beginLinearGradientFill( self.button_grad, [0, 1],0 ,0, 0, 32 ).drawRoundRect(0, 0, 380, 45, 10 );
    self.createButton.set({y: self.table_bg.getBounds().height - 55, x: 20})
    self.createButtonText.y = self.createButton.y + (45/2);
    self.createButtonText.x = self.createButton.x + (380/2);

    self.result_bg.y = 250;

    // hereee start
    _target.game_container.removeAllChildren();
		_target.tables = this.tables;
		this.tables = _target.tables;

		this.tables.timer = _.clone(timer());
		this.tables.timer.scaleX = this.tables.timer.scaleY = 0.9;
		this.tables.timer.is_timerStart = false;
		this.tables.timer.visible = true;
		this.tables.timer.x = -6.5;
		this.tables.timer.y = 28.5;
		_target.game_container.addChild(this.tables.timer);
		// _target.timer = this.timer

		let round_stat ="";
		switch(data.roundStatus){
			case "S":
				round_stat = window.language.lobby.nowbetting;
				break;
			case "E":
				round_stat = window.language.lobby.bettingend;
				break;
			case "P":
				round_stat = window.language.lobby.dealing;
				break;
			case "R" :
				round_stat = window.language.lobby.result;
				break;
			case "H" :
				round_stat = window.language.lobby.roundhold;
				break;
		}

		if(!data.marks.length) {
			round_stat = window.language.prompts.promptshuffling;
		}

		this.tables.status = this.getText(70, 300, round_stat, "21px LatoBold","#fff","center","middle");
    this.tables.status.lineWidth = 120;
		_target.game_container.addChild(this.tables.status);

		this.dealer_img_bg  = new createjs.Shape();
		this.dealer_img_bg.graphics.beginFill("#f5ac4e").drawCircle(0,0,45);
		this.dealer_img_bg.x = 70;
		this.dealer_img_bg.y = 105;
		_target.game_container.addChild(this.dealer_img_bg);

		this.dealer_img  = new createjs.Bitmap(data.dealerImage);
		this.dealer_img.x = 20;
		this.dealer_img.y = 60;
		this.dealer_img.scaleX = this.dealer_img.scaleY = 0.75;
		this.dealer_img.mask = this.dealer_img_bg;
		_target.game_container.addChild(this.dealer_img);

		this.dealerName = this.getText(70,160, data.currentDealer, "21px LatoBold","#fff","center","top");
    _target.game_container.addChild(this.dealerName);

    // last result
		let result_mask = new createjs.Shape();
    result_mask.graphics.f('red').drawRoundRect(0,0,245,210,10);
    result_mask.x = 145;
    result_mask.y = 250;

		// === Road Map
    let ch1 = this.getText(145,60, window.language.lobby.paigow_banker, "25px latobold","#b5b5b5","left","top");
    _target.addChild(ch1);

    let ch2 = this.getText(ch1.x,60 + 43, window.language.lobby.paigow_up, "25px latobold","#b5b5b5","left","top");
    _target.addChild(ch2);

    let ch3 = this.getText(ch1.x,60 + 43 * 2, window.language.lobby.paigow_heaven, "25px latobold","#b5b5b5","left","top");
    _target.addChild(ch3);

    let ch4 = this.getText(ch1.x,60 + 43 * 3, window.language.lobby.paigow_down, "25px latobold","#b5b5b5","left","top");
    _target.addChild(ch4);

		let lastresult_text = this.getText(145 + (245/2) ,result_mask.y + 10, "LAST RESULT", "15px LatoBold","#fff","center","top");
		_target.game_container.addChild(lastresult_text);

		this.lastres_container = new createjs.Container();
		this.lastres_container.mask = result_mask;
		_target.game_container.addChild(this.lastres_container);

    let playArea = ['up', 'heaven', 'down', 'banker']; // the playArea to be looped
    let playerColor = ['#F18F00', '#134CA3', '#00965A', '#B61C1C']; // the highlight color of the winner

    // setcon contains 2 tiles per playarea
    let setcon = new createjs.Container();
    setcon.x = self.result_bg.x + (235 / 2) - 5;
    setcon.y = self.result_bg.y + (220 / 2)  - 14;
    this.lastres_container.addChild(setcon);

    // marks
    let roadMarks = data.marks;
    roadMarks = formatData.fnPaigowLastRounds(roadMarks);

    _.forEach(roadMarks, (m) => {
      if(typeof m.game_info == 'string') m.game_info = JSON.parse(m.game_info); // format game_info
      if(typeof m.game_result == 'string') m.game_result = JSON.parse(m.game_result); //format game_result
    });

    let rounds = _.first(formatData.fnPaigowLastRounds(data.marks));
    let d = 60; // adjustable dimension of the tiles

    // looping the playArea
    for (let j=0; j<playArea.length;j++) {
      let tileData = !rounds ? ['0000', '0000'] : _.find(rounds.game_info.tiles, (value, key)=> { return key == playArea[j] }); //tiles(2) to be displayed
      // tile 0 if no data
      if(!tileData) tileData = [0,0];

      // container of the tiles
      let tilecon = new createjs.Container();
      tilecon.setBounds( 0, 0, 75, 52 );
      tilecon.x = (j != 3 ? d - 8 : d) * (j == 3 ? 0 : j-1);
      tilecon.y = d * (j == 2 ? 0 : j == 3 ? -1 : j);
      tilecon.regX = 30;
      tilecon.regy = 21.5;
      setcon.addChild(tilecon);

      _target[playArea[j]] = {};
      _target[playArea[j]].tileBg  = new createjs.Shape();
      _target[playArea[j]].tileBg.graphics.clear().f(playerColor[j]).drawRoundRect( -2,-2, 83, 56, 4 );
      _target[playArea[j]].tileBg.alpha = 0;
      tilecon.addChild(_target[playArea[j]].tileBg);

      // first tile display
      if(tileData[0] != undefined) {
        _target[playArea[j]+"_0"] = createTileSprite(this, 46, 60, self.context.load.getResources("small_tiles"));
        _target[playArea[j]+"_0"].gotoAndStop('tile-'+tilesModule(tileData[0]).value);
        _target[playArea[j]+"_0"].scaleX =  _target[playArea[j]+"_0"].scaleY = 0.85;
        _target[playArea[j]+"_0"].alpha = 0;
        tilecon.addChild(  _target[playArea[j]+"_0"]);
      }
      //second tile display
      if(tileData[1] != undefined) {
        _target[playArea[j]+"_1"] = createTileSprite(this, 46, 60, self.context.load.getResources("small_tiles"));
        _target[playArea[j]+"_1"].gotoAndStop('tile-'+tilesModule(tileData[1]).value);
        _target[playArea[j]+"_1"].scaleX = _target[playArea[j]+"_1"].scaleY = 0.85;
        _target[playArea[j]+"_1"].x = 39;
        _target[playArea[j]+"_1"].alpha = 0;
        tilecon.addChild( _target[playArea[j]+"_1"]);
      }
    }

    //SETTING CURRENT TILES/
    var flag = false;
    for(var key in data.gameInfo.tiles) {
     var res =  _.filter(data.gameInfo.tiles[key], function(e) {return e !== null});
     if(res.length) {
       flag = true;
       for(var a = 0; a < data.gameInfo.tiles[key].length; a++) {
         if(data.gameInfo.tiles[key][a] === null) continue;
         _target[key+"_"+a].alpha = 1;

         _target[key+"_"+a].gotoAndStop("tile-"+data.gameInfo.tiles[key][a][3]);
       }
     }
    }

    // checking if gameinfo tiles incomplete
    for (let j=0; j<playArea.length;j++) {
      if(!_.isEmpty(data.gameInfo) &&  _.filter(data.gameInfo.tiles[playArea[j]], function (e) {return !e }).length) {
        flag = false
      }
    }

    if(data.roundStatus.toLowerCase() != 'p' && data.marks.length) {
      // checking init winning
      if(data.marks[0].game_result && data.marks[0].game_result.winner &&  data.marks[0].game_result.winner.length) {
        for(let i = 0; i < data.marks[0].game_result.winner.length; i++) {
          _target[data.marks[0].game_result.winner[i]].tileBg.alpha = flag ? 1 : 0;
        }
      }
    }


    let roadmapcon = new createjs.Container();
		_target.roadmapDataCon = new createjs.Container();
    // roadmap
    let gw = 40;
    for(let i = 0; i < 4; i ++) {

      for(let j=0; j < 5; j++) {
        let grid = new createjs.Shape();
        grid.graphics.f('#3F3F3F').setStrokeStyle(1).beginStroke('#676767').moveTo(0,0).lineTo(0,gw).lineTo(gw,gw).lineTo(gw, 0).lineTo(0,0);
        grid.x = j * gw;
        grid.y = i * gw;
        roadmapcon.addChild(grid);
      }
    }

    roadmapcon.set({x: 185, y:60});
    _target.roadmapDataCon.set({x: roadmapcon.x, y:roadmapcon.y})
    _target.addChild(roadmapcon, _target.roadmapDataCon);

		//Maintenance
		let header_bg =  ["#8e24aa","#4d158d"];
		let text_color = "";

		this.tables.maintenanceCon = new createjs.Container();
		this.tables.maintenanceCon.visible = false;
		_target.addChild(this.tables.maintenanceCon);

		///
		this.drawRoadMapPaigow(rmformat().fnPaigowRoadMap(roadMarks), _target);
	},
	drawTilesInputPaiGow(data, _target) {
    if(!_target) return;

    let type = data.type;
    let value = data.value;

    if(parseInt(value) === 10)  value = 0;

    _target[type].gotoAndStop("tile-"+value);
    _target[type].alpha = 0;
    createjs.Tween.get(_target[type])
    .wait(500)
    .to({
      alpha: 1
    },200);
	},
	paigowDisplayRounds(data, _target) {
    if(!data) return;
    let playArea = ['up', 'heaven', 'down', 'banker']; // the playArea to be looped
    for(let j = 0; j < playArea.length; j++) {
      _target[playArea[j]+"_0"].alpha = 1;
      _target[playArea[j]+"_1"].alpha = 1;
    }

    _target.up.tileBg.alpha = 0;
    _target.down.tileBg.alpha = 0;
    _target.heaven.tileBg.alpha = 0;
    _target.banker.tileBg.alpha = 0;

    if(data.winner &&  data.winner.length) {
      for(let i = 0; i < data.winner.length; i++) {
        _target[data.winner[i]].tileBg.alpha = 1;
      }
    }
    this.tables.status.text = window.language.lobby.result;
	},
	drawRoadMapPaigow (data, _target) {
		// clear roadmap data container
		_target.roadmapDataCon.removeAllChildren();
		//loop data to display
		for (let i=0; i<data.length; i++) {
			let areas = data[i].areas;
			for(let j=0; j<areas.length; j++) {
				//draw winning background if winner

				if(areas[j].isWinner) {
					let winBG = new createjs.Shape();
					winBG.graphics.f('#DEC343').drawRect(0,0,39,39);
					winBG.x = i * 40;
					winBG.y = j * 40;
					_target.roadmapDataCon.addChild(winBG);
				}
				// draw player circle
				let circle = new createjs.Shape();
				circle.graphics.f(areas[j].color).drawCircle(0,0,18);
				circle.x = 20 + (i * 40);
				circle.y = 20 + (j * 40);
				_target.roadmapDataCon.addChild(circle);
				//if pair add small circle
				if(areas[j].isPair) {
					circle.graphics.moveTo(0,15).setStrokeStyle(0.8).beginStroke('#fff').drawCircle(14,14,5);
				}
				// player circle total
				let total = this.getText(circle.x,circle.y, areas[j].total, "20px latobold","#fff","center","middle");
				_target.roadmapDataCon.addChild(total);
			}
		}
	}
} //instance
export default {
	instance
}
