
import {  createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap } from '../../../factories/factories';

import format from '../../../factories/formatter';

let redwhite = {
	createGame(_target,self) {
  	if(window.user_type == "C") {
			_target.bet_range = _target.data.casinoBetRanges[0]
		} else {
			_target.bet_range = _target.data.sportBetRanges[0]
		}
		let redWhiteMin;
		let redWhiteMax;
		let bonusMin;
		let bonusMax;
		let jackpotMin;
		let jackpotMax;

		let adjustY = 30;

		let sideBet = [];
		for (var i = 0; i < _target.bet_range.side_bet.length; i++) {
			sideBet = _target.bet_range.side_bet[i];

			switch (sideBet.division) {
      	case ('3Red - 3White'):
      		redWhiteMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
      		redWhiteMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
   				break;

   			case ('Bonus'):
      		bonusMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
      		bonusMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
   				break;

   			case ('Jackpot'):
      		jackpotMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
      		jackpotMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
   				break;
     	}
		}

	  let bet_area_bg = new createjs.Shape();
	  bet_area_bg.graphics.beginFill("rgba(60, 60, 60, 0.78)").drawRect(0,0,418 + 20,self.g_height);
	  bet_area_bg.setBounds(0,0,418 + 20,self.g_height);

	  _target.betareas_container.addChild(bet_area_bg);

	  _target.betarea[0] = new createjs.Shape();
	  _target.betarea[0].x = 20;
	  _target.betarea[0].y = 35 + adjustY;
	  _target.betarea[0].table = "bet1G";
	  _target.betarea[0].min_betAmt = bonusMin; 
	  _target.betarea[0].max_betAmt = bonusMax; 
	  _target.betarea[0].payout_multiplier = 11; 
	  _target.betarea[0].graphics.ss(1.5).s("#9c7935").beginLinearGradientFill(["#dcc36d", "#efe083", "#dcc36d"], [0,0.5,1], 20,0,80,0,100,0).drawRoundRect(0,0,75,114,2);
	  _target.betarea[0].setBounds(0,0,75,114);

	  _target.betarea[1] = new createjs.Shape();
	  _target.betarea[1].x = _target.betarea[0].x + _target.betarea[0].getBounds().width + 4;
	  _target.betarea[1].y = 35 + adjustY;
	  _target.betarea[1].table = "bet2R";
	  _target.betarea[1].min_betAmt = bonusMin; 
	  _target.betarea[1].max_betAmt = bonusMax; 
	  _target.betarea[1].payout_multiplier = 11; 
	  _target.betarea[1].graphics.beginFill("#d32f2f").drawRoundRect(0, 0, 75, 114, 2);
	  _target.betarea[1].setBounds(0, 0, 75, 114);

	  _target.betarea[2] = new createjs.Shape();
	  _target.betarea[2].x = _target.betarea[1].x + _target.betarea[1].getBounds().width + 4;
	  _target.betarea[2].y = 35 + adjustY;
	  _target.betarea[2].table = "bet3R";
	  _target.betarea[2].min_betAmt = bonusMin; 
	  _target.betarea[2].max_betAmt = bonusMax; 
	  _target.betarea[2].payout_multiplier = 11; 
	  _target.betarea[2].graphics.beginFill("#d32f2f").drawRoundRect(0, 0, 75, (114/2) - 2, 2);
	  _target.betarea[2].setBounds(0, 0, 75,  (114/2) - 2);

	  _target.betarea[3] = new createjs.Shape();
	  _target.betarea[3].x = _target.betarea[1].x + _target.betarea[1].getBounds().width + 4;
	  _target.betarea[3].y = 35 + adjustY + _target.betarea[2].getBounds().height + 3;
	  _target.betarea[3].table = "bet3W";
	  _target.betarea[3].min_betAmt = bonusMin; 
	  _target.betarea[3].max_betAmt = bonusMax; 
	  _target.betarea[3].payout_multiplier = 11; 
	  _target.betarea[3].graphics.beginFill("#fff").drawRoundRect(0, 0, 75, (114/2) - 2, 2);
	  _target.betarea[3].setBounds(0, 0, 75,  (114/2) - 2);

	  _target.betarea[4] = new createjs.Shape();
	  _target.betarea[4].x = _target.betarea[3].x + _target.betarea[3].getBounds().width + 4;
	  _target.betarea[4].y = 35 + adjustY;
	  _target.betarea[4].table = "bet2W";
	  _target.betarea[4].min_betAmt = bonusMin; 
	  _target.betarea[4].max_betAmt = bonusMax; 
	  _target.betarea[4].payout_multiplier = 11; 
	  _target.betarea[4].graphics.beginFill("#fff").drawRoundRect(0, 0, 75, 114 - 2, 2);
	  _target.betarea[4].setBounds(0, 0, 75,  (114/2) - 2);

	  _target.betarea[5] = new createjs.Shape();
	  _target.betarea[5].x = _target.betarea[4].x + _target.betarea[4].getBounds().width + 4;
	  _target.betarea[5].y = 35 + adjustY;
	  _target.betarea[5].table = "bet2G";
	  _target.betarea[5].min_betAmt = bonusMin; 
	  _target.betarea[5].max_betAmt = bonusMax; 
	  _target.betarea[5].payout_multiplier = 11; 
	  _target.betarea[5].graphics.ss(1.5).s("#9c7935").beginLinearGradientFill(["#dcc36d", "#efe083", "#dcc36d"], [0,0.5,1], 20,0,80,0,100,0).drawRoundRect(0,0,75,114,2);
	  _target.betarea[5].setBounds(0,0,75,114);

	  for(var i = 0; i < _target.betarea.length; i++) {
	  	_target.betareas_container.addChild(_target.betarea[i]);
	  }		

  	// table assets
  	let bonus1Asset = new createjs.Bitmap(self.context.getResources("bonus_multibet"));
	  _target.cosmetics_container.addChild(bonus1Asset)
	  bonus1Asset.set({targ: _target.betarea[0], x: _target.betarea[0].x + (_target.betarea[0].getBounds().width/2), hitArea: _target.betarea[0], y: _target.betarea[0].y + 2, regX: bonus1Asset.getBounds().width/2})

  	let bonus2Asset = new createjs.Bitmap(self.context.getResources("bonus_multibet"));
	  _target.cosmetics_container.addChild(bonus2Asset)
	  bonus2Asset.set({targ: _target.betarea[5], hitArea: _target.betarea[5], regX: bonus2Asset.getBounds().width/2, y: _target.betarea[5].y + 2, x: _target.betarea[5].x + (_target.betarea[5].getBounds().width/2) - bonus1Asset.getBounds().width/2})

  	let bonus2Asset_2 = new createjs.Bitmap(self.context.getResources("bonus_multibet"));
	  _target.cosmetics_container.addChild(bonus2Asset_2)
	  bonus2Asset_2.set({hitArea : _target.betarea[5], targ : _target.betarea[5], regX: bonus2Asset_2.getBounds().width/2, y: _target.betarea[5].y + 2, x: _target.betarea[5].x + (_target.betarea[5].getBounds().width/2) + bonus1Asset.getBounds().width/2})

	  let red2asset = new createjs.Text("2 RED", "bold 16px lato", "#fff");
	  _target.cosmetics_container.addChild(red2asset)
	  red2asset.set({ y : _target.betarea[1].y + 2, textAlign: 'center', x : _target.betarea[1].x + (_target.betarea[1].getBounds().width/2) });

	  let red3asset = new createjs.Text("3 RED", "bold 16px lato", "#fff");
	  _target.cosmetics_container.addChild(red3asset)
	  red3asset.set({ y : _target.betarea[2].y + 2, textAlign: 'center', x : _target.betarea[2].x + (_target.betarea[2].getBounds().width/2) });

	  let white2asset = new createjs.Text("2 WHITE", "bold 16px lato", "#000");
	  _target.cosmetics_container.addChild(white2asset)
	  white2asset.set({ y : _target.betarea[3].y + 2, textAlign: 'center', x : _target.betarea[3].x + (_target.betarea[3].getBounds().width/2) });

	  let white3asset = new createjs.Text("3 WHITE", "bold 16px lato", "#000");
	  _target.cosmetics_container.addChild(white3asset)
	  white3asset.set({ y : _target.betarea[4].y + 2, textAlign: 'center', x : _target.betarea[4].x + (_target.betarea[4].getBounds().width/2) });

	  _target.total_game_bet = new createjs.Text("0","30px BebasNeue","#fff");
	  _target.total_game_bet.textAlign = "center";
	  _target.total_game_bet.x = bet_area_bg.x + bet_area_bg.getBounds().width/2;
	  _target.betareas_container.addChild(_target.total_game_bet);

	  // === eye
	  let eye_bg = new createjs.Shape();
	  eye_bg.graphics.beginFill("rgba(0, 0, 0, 0.4)").drawRect(0,0,960,self.g_height);
	  eye_bg.setBounds(0,0,960,self.g_height);

	  _target.eye_view_container.addChild(eye_bg)

	  let row = 6;
	  let col = 16;

	  let lines = new createjs.Shape();
	  lines.graphics.ss(1).s("rgba(255,255,255,0.5)").moveTo(0,0);
	  _target.eye_view_container.addChild(lines);

	  for(var i = 0; i < row; i++) { //row
		  lines.graphics.lineTo(0, (i*32)).lineTo(col*28, (i*32)).moveTo(0,(i*32))
	  } // end for
	  for(var e = 0; e < col; e++) {
		  lines.graphics.lineTo((e*30), 0).lineTo((e*30), (30*row) + 9).moveTo((e*30),0)
	  } // end for
	  lines.graphics.lineTo(420 + 32, 0).lineTo(420 + 32, 192);

	  //stats
	  var statW = 200;
	  var stat_bg = ['2R','2W','3R', '3W', '1G', '2G'];

  	let game_stats_label = new createjs.Text("GAME STATS", "bold 16px lato", "#fff");
  	game_stats_label.set({y : 20, x : 960 - (statW/2), textBaseline:'middle', textAlign:'center'})
  	_target.eye_view_container.addChild(game_stats_label);

  	var cnt = 0, e = 0;
  	var stat_pos = {
  		x: [], y:[]
  	}
  	for(var x = 0; x < stat_bg.length; x++) {
	  	let stat_cosmetic =  new createjs.Shape();
	  	let bg = "#7f1d1d", accent = "#c62828"
	  	if(stat_bg[x].indexOf('W') > -1) {
	  		bg = "rgba('255,255,255,0.5)";
	  		accent = "#fff"
	  	}
	  	if(stat_bg[x].indexOf('G') > -1) {
	  		bg = "#af7604";
	  		accent = "#e5b241";
	  	}

	  	stat_cosmetic.graphics.beginFill(bg).ss(2).s(accent).drawRoundRect(0,0,58,32,8);
	  	stat_cosmetic.x = (eye_bg.getBounds().width - statW) + (cnt*75) + 30 ;
			stat_cosmetic.y = ((e) *42) + 45;			  		
			stat_pos.x.push(stat_cosmetic.x)
			stat_pos.y.push(stat_cosmetic.y)

	  	_target.eye_view_container.addChild(stat_cosmetic);
	  	
	  	cnt++;
	  	
	  	if((x+1)%2 == 0) {
	  		cnt = 0;
	  		e++;
	  	}
  	}// end for
  	//roadmap
			_target.roadMap_container = new createjs.Container();
			_target.roadMap_container.set({x:14, y: 14})
			_target.eye_view_container.addChild(_target.roadMap_container);

			//text stat
			
		_target.red2Txt = new createjs.Text(0,'21px bebasneue','#fff');
		_target.red2Txt.x = stat_pos.x[0] + 54;
		_target.red2Txt.y = stat_pos.y[0] + 4;
		_target.red2Txt.textAlign = 'right';
  	_target.eye_view_container.addChild(_target.red2Txt);

		_target.red3Txt = new createjs.Text(22,'21px bebasneue','#fff');
		_target.red3Txt.x = stat_pos.x[2] + 54;
		_target.red3Txt.y =  stat_pos.y[2] + 2;
		_target.red3Txt.textAlign = 'right';
		_target.eye_view_container.addChild(_target.red3Txt);

		_target.white2Txt = new createjs.Text(0, '21px bebasneue', '#ffffff');
		_target.white2Txt.x = stat_pos.x[1] + 54;
		_target.white2Txt.y = stat_pos.y[1] + 4;
		_target.white2Txt.textAlign = 'right';
		_target.eye_view_container.addChild(_target.white2Txt);

		_target.white3Txt = new createjs.Text(0, '21px bebasneue', '#ffffff');
		_target.white3Txt.x = stat_pos.x[3] + 54;
		_target.white3Txt.y = stat_pos.y[3] + 4;
		_target.white3Txt.textAlign = 'right';
		_target.eye_view_container.addChild(_target.white3Txt);

		_target.gold1Txt = new createjs.Text(0, '21px bebasneue', '#fff');
		_target.gold1Txt.x = stat_pos.x[4] + 54;
		_target.gold1Txt.y = stat_pos.y[4] + 4;
		_target.gold1Txt.textAlign = 'right';
		_target.eye_view_container.addChild(_target.gold1Txt);

		_target.gold2Txt = new createjs.Text(0, '21px bebasneue', '#fff');
		_target.gold2Txt.x = stat_pos.x[5] + 54;
		_target.gold2Txt.y = stat_pos.y[5] + 4;
		_target.gold2Txt.textAlign = 'right';
		_target.eye_view_container.addChild(_target.gold2Txt);
  	
  	//circle stat
			_target.whiteStatCircle = new createjs.Shape();
    _target.whiteStatCircle.graphics.setStrokeStyle(10).beginStroke('#fff');
    _target.whiteStatCircle.graphics.arc(0, 0, 68, this.setDegreeToRadians(270), this.setDegreeToRadians(90));
    _target.whiteStatCircle.x = 580;
    _target.whiteStatCircle.y = 100;
  	_target.eye_view_container.addChild(_target.whiteStatCircle);

  	_target.whiteStatLbl = new createjs.Text(window.language.statistics.whitecaps,window.language.locale == "zh" ? 'bold 20px Lato' : 'bold 15px Lato', "#fff");

		_target.whiteStatLbl.x = window.language.locale == "zh" ? _target.whiteStatCircle.x + 80 : _target.whiteStatCircle.x + 85;
		_target.whiteStatLbl.y = window.language.locale == "zh" ? _target.whiteStatCircle.y - 25 + 5 : _target.whiteStatCircle.y - 25;
  	_target.eye_view_container.addChild(_target.whiteStatLbl);

		_target.whiteStatPerc = new createjs.Text(0,'normal 17px bebasneue',"#fff");
		_target.whiteStatPerc.x = _target.whiteStatLbl.x;
		_target.whiteStatPerc.y = window.language.locale == "zh" ? _target.whiteStatLbl.y + 25 : _target.whiteStatLbl.y + 20;

  	_target.eye_view_container.addChild(_target.whiteStatPerc);

  	//red stat
			_target.redStatCircle = new createjs.Shape();
    _target.redStatCircle.graphics.setStrokeStyle(10).beginStroke('#b71c1c');
    _target.redStatCircle.graphics.arc(0, 0, 68,this.setDegreeToRadians(90), this.setDegreeToRadians(270));
    _target.redStatCircle.x = _target.whiteStatCircle.x;
		_target.redStatCircle.y = _target.whiteStatCircle.y;
			_target.eye_view_container.addChild(_target.redStatCircle);

			_target.redStatLbl = new createjs.Text('RED', window.language.locale == "zh" ? 'bold 20px Lato' : 'bold 15px Lato','#b71c1c');
		_target.redStatLbl.x = window.language.locale == "zh" ? _target.whiteStatCircle.x - 115 + 10: _target.whiteStatCircle.x - 115;
		_target.redStatLbl.y =  window.language.locale == "zh" ? _target.whiteStatLbl.y : _target.whiteStatLbl.y;
			_target.eye_view_container.addChild(_target.redStatLbl);

		_target.redStatPerc = new createjs.Text(0,'normal 17px bebasneue','#b71c1c');
		_target.redStatPerc.x = _target.redStatLbl.x;
		_target.redStatPerc.y = _target.whiteStatPerc.y;
			_target.eye_view_container.addChild(_target.redStatPerc);

			//gold 2 stat
			_target.gold2StatCircle = new createjs.Shape();
    _target.gold2StatCircle.graphics.setStrokeStyle(10).beginStroke('#b28834');
    _target.gold2StatCircle.graphics.arc(0, 0, 58, this.setDegreeToRadians(270), this.setDegreeToRadians(90));
    _target.gold2StatCircle.x = _target.whiteStatCircle.x;
		_target.gold2StatCircle.y = _target.whiteStatCircle.y;
			_target.eye_view_container.addChild(_target.gold2StatCircle);

			_target.gold2StatLbl = new createjs.Text('2N','bold 15px Lato',"yellow");
		_target.gold2StatLbl.x = _target.whiteStatLbl.x - 65;
		_target.gold2StatLbl.y = _target.whiteStatLbl.y;
			_target.eye_view_container.addChild(_target.gold2StatLbl);

		_target.gold2StatPerc = new createjs.Text(0,'normal 17px bebasneue',"yellow");
		_target.gold2StatPerc.x = _target.gold2StatLbl.x + 20;
		_target.gold2StatPerc.y = _target.gold2StatLbl.y + 20;
		_target.gold2StatPerc.textAlign = 'right';
			_target.eye_view_container.addChild(_target.gold2StatPerc);

			// gold 1 stat
			_target.gold1StatCircle = new createjs.Shape();
    _target.gold1StatCircle.graphics.setStrokeStyle(10).beginStroke('#e5b241');
    _target.gold1StatCircle.graphics.arc(0, 0, 58, this.setDegreeToRadians(90), this.setDegreeToRadians(270));
    _target.gold1StatCircle.x = _target.whiteStatCircle.x;
		_target.gold1StatCircle.y = _target.whiteStatCircle.y;
			_target.eye_view_container.addChild(_target.gold1StatCircle);

			_target.gold1StatLbl = new createjs.Text('1N','bold 15px Lato',"yellow");
		_target.gold1StatLbl.x = window.language.locale == "zh" ? _target.gold2StatLbl.x - 60 + 8 : _target.gold2StatLbl.x - 60;
		_target.gold1StatLbl.y = _target.gold2StatLbl.y;
			_target.eye_view_container.addChild(_target.gold1StatLbl);

		_target.gold1StatPerc = new createjs.Text(0,'normal 17px bebasneue', "yellow");
		_target.gold1StatPerc.x = window.language.locale == "zh" ? _target.gold2StatPerc.x - 80 + 8 : _target.gold2StatPerc.x - 80;
		_target.gold1StatPerc.y = _target.gold2StatPerc.y;
		_target.gold1StatPerc.textAlign = 'left';
			_target.eye_view_container.addChild(_target.gold1StatPerc);
	},
	udpateLast5(_target, self) {
	},
	updateScoreboard (_target,self) {
		let data = _target.data.marks;

		let perGameResult = [];
		let redCount = 0;
		let red2Count = 0;
		let red3Count = 0;
		let whiteCount = 0;
		let white2Count = 0;
		let white3Count = 0;
		let goldCount = 0;
		let gold1Count = 0;
		let gold2Count = 0;
		let redPercentage = 0;
		let whitePercentage = 0;
		let gold1Percentage = 0;
		let gold2Percentage = 0;
		let whiteRadianStart = 0;
		let whiteRadian = 0;
		let goldRadianStart = 0;
		let goldRadian = 0;
		
		let g_totalRedWhite = 0;
		let g_totalGold = 0;

		for (var i in data) {
			let results = data[i].mark;

	    if (results.mark.mark == 'r') {
	    	if (results.mark.num == 2) {
	    		red2Count++;
	    	}
	    	else {
	    		red3Count++
	    	}
	    }
	    else if (results.mark.mark == 'w') {
	    	if (results.mark.num == 2) {
	    		white2Count++;
	    	}
	    	else {
	    		white3Count++;
	    	}
	    }
	    else if (results.mark.mark == 'g') {
	    	if (results.mark.num == 1) {
	    		gold1Count++;
	    	}
	    	else {
	    		gold2Count++;
	    	}
	    } //end if
		} // end for in

	 	//Set stat individual count
	 	_target.red2Txt.text = red2Count;
	 	_target.red3Txt.text = red3Count;
	 	_target.white2Txt.text = white2Count;
	 	_target.white3Txt.text = white3Count;
	 	_target.gold1Txt.text = gold1Count;
	 	_target.gold2Txt.text = gold2Count;

	 	//Set stat percentage
	 	g_totalRedWhite = red2Count + red3Count + white2Count + white3Count;
	 	redPercentage = ((red2Count + red3Count) / g_totalRedWhite) * 100;
	 	whitePercentage = ((white2Count + white3Count) / g_totalRedWhite) * 100;

	 	if (g_totalRedWhite == 0) {
	 		redPercentage = 0;
	 		whitePercentage = 0;
	 	}

	 	_target.redStatPerc.text = Math.round(redPercentage)+'%';
	 	_target.whiteStatPerc.text = Math.round(whitePercentage)+'%';

	 	g_totalGold = gold1Count + gold2Count;
	 	gold1Percentage = (gold1Count / g_totalGold) * 100;
	 	gold2Percentage = (gold2Count / g_totalGold) * 100;

	 	if (g_totalGold == 0) {
	 		gold1Percentage = 0;
	 		gold2Percentage = 0;
	 	}

	  _target.gold1StatPerc.text = Math.round(gold1Percentage)+'%';
	 	_target.gold2StatPerc.text = Math.round(gold2Percentage)+'%';

	 	//Set stat circle
	 	whiteRadian = ((whitePercentage / 100) * 360) / 2;
	 	whiteRadianStart = Math.abs(whiteRadian) * -1;
	 	_target.whiteStatCircle.graphics.clear().setStrokeStyle(13).beginStroke('#fff');
	 	_target.redStatCircle.graphics.clear().setStrokeStyle(13).beginStroke('#b71c1c');

	 	if (data.length && g_totalRedWhite > 0) {
	 		_target.whiteStatCircle.graphics.arc(0, 0, 70, this.setDegreeToRadians(whiteRadianStart), this.setDegreeToRadians(whiteRadian));

	 		if (red2Count + red3Count != 0) {
	 			if (white2Count + white3Count == 0) {
	 				_target.redStatCircle.graphics.arc(0, 0, 70, this.setDegreeToRadians(0), this.setDegreeToRadians(360));
	 			}
	 			else {
	 				_target.redStatCircle.graphics.arc(0, 0, 70, this.setDegreeToRadians(whiteRadian), this.setDegreeToRadians(whiteRadianStart));
	 			} //end if
	 		} //end if
	 	}
	 	else {
	 		_target.whiteStatCircle.graphics.arc(0, 0, 70, this.setDegreeToRadians(270), this.setDegreeToRadians(90));
    	_target.redStatCircle.graphics.arc(0, 0, 70, this.setDegreeToRadians(90), this.setDegreeToRadians(270));
	 	} //end if

	 	//Gold stats
	 	goldRadian = ((gold2Percentage / 100) * 360) / 2;
    goldRadianStart = Math.abs(goldRadian) * -1;
    _target.gold2StatCircle.graphics.clear().setStrokeStyle(13).beginStroke('#b28834');
    _target.gold1StatCircle.graphics.clear().setStrokeStyle(13).beginStroke('#e5b241');

    if (data.length && g_totalGold > 0) {
    	_target.gold2StatCircle.graphics.arc(0, 0, 58, this.setDegreeToRadians(goldRadianStart), this.setDegreeToRadians(goldRadian));

    	if (gold1Count != 0) {
    		if (gold2Count == 0) {
    			_target.gold1StatCircle.graphics.arc(0, 0, 58, this.setDegreeToRadians(0), this.setDegreeToRadians(360));
    		}
    		else {
    			_target.gold1StatCircle.graphics.arc(0, 0, 58, this.setDegreeToRadians(goldRadian), this.setDegreeToRadians(goldRadianStart));
    		}
    	} //end if
	 	}
	 	else {
      _target.gold2StatCircle.graphics.arc(0, 0, 58, this.setDegreeToRadians(270), this.setDegreeToRadians(90));
      _target.gold1StatCircle.graphics.arc(0, 0, 58, this.setDegreeToRadians(90), this.setDegreeToRadians(270));
	 	} //end if
	},
	drawRoadMap (data, _target, self) {
  	for(var x = 0; x < data.length; x++) {
	  	for(var i = 0; i < data[x].length; i++) {
	  		let bg = "", stroke = "", col = "";
	  		if(data[x][i] ===  undefined) continue;
  			if(typeof data[x][i].mark === 'string') data[x][i].mark = JSON.parse(data[x][i].mark);

	  		if(data[x][i].mark.mark == 'r') {
	  			bg = "#6d0a0a"
	  			stroke = "#d32f2f"
	  			col = '#fff'
	  		}
	  		if(data[x][i].mark.mark == 'w') {
	  			bg = "#f0f0f0"
	  			stroke = "#fff"
	  			col = '#2b2b2b'
	  		}
	  		if(data[x][i].mark.mark == 'g') {
	  			bg = "#966e25"
	  			stroke = "#e5b241"
	  			col = '#2b2b2b'
	  		}

	  		let sp = new createjs.Shape();
	  		let spText = new createjs.Text(data[x][i].mark.num, '20px bebasneue',col);
	  		spText.set({textAlign:'center', textBaseline: 'middle'})
  			sp.graphics.beginFill(bg).ss(1).s(stroke).drawCircle(0,0,13);
  			sp.set({x:x* 30, y : i * 32});
	  		spText.set({x: x* 30, y: i * 32})
	  		_target.roadMap_container.addChild(sp, spText);


	  	}
  	}
	},
  setDegreeToRadians (degrees) {
	 return degrees * Math.PI / 180;
	},
}

export default {
	redwhite
}