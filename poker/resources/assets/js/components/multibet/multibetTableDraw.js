
import {  createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap } from '../../factories/factories';
import cardsModule from '../../factories/cards';

import {scoreboard as sboard} from '../../factories/scoreboard_draw';
import format from '../../factories/formatter';
import {baccarat} from './factory/baccarat';
import {dragonTiger} from './factory/dragonTiger';
import {poker} from './factory/poker';
import {sicbo} from './factory/sicbo';
import {redwhite} from './factory/redwhite';

let drawSboard  = sboard();

let instance = null;

const baccaratTotal = (gameInfo) => {
	let total = {
		player: 0,
		banker: 0
	};

	_.forEach(gameInfo, (row, key) => {
		if (!row) {
			return ;
		}

	 	let card = cardsModule(row).value;
	 	card = card >= 10 ? 0 : card;

	  	total[key.indexOf('banker') !== -1 ? 'banker': 'player'] += card;
		total[key.indexOf('banker') !== -1 ? 'banker': 'player'] %= 10;
	});

	return total;
};

export default(self, x, source) => {

  instance = {
	  getLastPred (data, type,game) {

		  let data2 = _.clone(data);

		  data2.push({'mark' : type});

		  let biglast  = null;

		  if(game.toLowerCase() == "baccarat") {
		  		biglast = format().fnFormatBigEyeBoy(data2,6,52);
		  } else {
		  		biglast = format().fnFormatDTBigEyeBoy(data2,6,52);
		  }

		  for(var i = 0; i < biglast.matrix.length; i++) {
			  for(var e = 0; e < biglast.matrix[i].length; e++) {
				  if(biglast.matrix[i][e] === undefined) continue;

				  if((i) == biglast.row) {
					  if(biglast.matrix[0][e+1] == undefined) {
						  biglast.last_mark = biglast.matrix[i][e];
					  }
				  }
			  }
		  }

		  let smallLast = null;

		  if(game.toLowerCase() == "baccarat") {
		  		smallLast = format().fnFormatSmallRoad(data2,6,28);
		  } else {
		  		smallLast = format().fnFormatDTSmallRoad(data2,6,28);
		  }

		  for(var i = 0; i < smallLast.matrix.length; i++) {
			  for(var e = 0; e < smallLast.matrix[i].length; e++) {
				  if(smallLast.matrix[i][e] === undefined) continue;


				  if((i) == smallLast.row) {
					  if(smallLast.matrix[0][e+1] == undefined) {
						  smallLast.last_mark = smallLast.matrix[i][e]
					  }
				  }

			  }
		  }

		  let roachlast = null;

		  if(game.toLowerCase() == "baccarat") {
		  		roachlast = format().fnFormatCockroachPig(data2,6,28);
		  } else {
		  		roachlast = format().fnFormatDTCockroachPig(data2,6,28);
		  }



		  for(var i = 0; i < roachlast.matrix.length; i++) {
			  for(var e = 0; e < roachlast.matrix[i].length; e++) {
				  if(roachlast.matrix[i][e] === undefined) continue;

				  if((i) == roachlast.row) {
					  if(roachlast.matrix[roachlast.row][e+1] == undefined) {
						  // sp.last_child = true;
						  roachlast.last_mark = roachlast.matrix[i][e]
					  }
				  }
			  }
		  }
		  	if(game.toLowerCase() == "baccarat") {
		  		return  {bigroad : biglast.last_mark ? biglast.last_mark : {mark :type =="p" ? "b" : "r" } , smallroad: smallLast.last_mark ? smallLast.last_mark : {mark :type =="p" ? "b" : "r" }, roach : roachlast.last_mark ? roachlast.last_mark : {mark :type =="p" ? "b" : "r" }};
		  	} else {
		  		return  {bigroad : biglast.last_mark ? biglast.last_mark : {mark :type =="d" ? "b" : "r" } , smallroad: smallLast.last_mark ? smallLast.last_mark : {mark :type =="d" ? "b" : "r" }, roach : roachlast.last_mark ? roachlast.last_mark : {mark :type =="d" ? "b" : "r" }};
		  	}
	  },
	  checkPrediction(data,game, _target) {
		  let marks_p = {};
		  let marks_b = {};
		  if(game == "baccarat") {
			  marks_p = this.getLastPred(data, "p",game);
			  marks_b = this.getLastPred(data, "b", game);
		  } else if(game == "dragon-tiger") {
			  marks_p = this.getLastPred(data, "d",game);
			  marks_b = this.getLastPred(data, "z",game);
		  }
		  //player mark

		  if(marks_p.bigroad.mark.toLowerCase() == "b") {
			  _target.player_prediction1.graphics.clear().ss(3).s("#1565c0").drawCircle(0,0,10);
		  } else {
			  _target.player_prediction1.graphics.clear().ss(3).s("#d33030").drawCircle(0,0,10);
		  }

		  //player mark
		  if(marks_p.smallroad.mark.toLowerCase() == "b") {
			  _target.player_prediction2.graphics.clear().beginFill("#1565c0").drawCircle(0,0,10);
		  } else {
			  _target.player_prediction2.graphics.clear().beginFill("#d33030").drawCircle(0,0,10);
		  }

		  //player mark
		  if(marks_p.roach.mark.toLowerCase() == "b") {
			  _target.player_prediction3.graphics.clear().beginFill("#1565c0").drawRoundRect(0,0,5,25,2);
		  } else {
			  _target.player_prediction3.graphics.clear().beginFill("#d33030").drawRoundRect(0,0,5,25,2);
		  }

		  // banker mark
		  if(marks_b.bigroad.mark.toLowerCase() == "b") {
			  _target.banker_prediction1.graphics.clear().ss(3).s("#1565c0").drawCircle(0,0,10);
		  } else {
			  _target.banker_prediction1.graphics.clear().ss(3).s("#d33030").drawCircle(0,0,10);
		  }

		  // banker mark
		  if(marks_b.smallroad.mark.toLowerCase() == "b") {
			  _target.banker_prediction2.graphics.clear().beginFill("#1565c0").drawCircle(0,0,10);
		  } else {
			  _target.banker_prediction2.graphics.clear().beginFill("#d33030").drawCircle(0,0,10);
		  }
		  // banker mark
		  if(marks_b.roach.mark.toLowerCase() == "b") {
			  _target.banker_prediction3.graphics.clear().beginFill("#1565c0").drawRoundRect(0,0,5,25,2);
		  } else {
			  _target.banker_prediction3.graphics.clear().beginFill("#d33030").drawRoundRect(0,0,5,25,2);
		  }

	  	},
		drawBaccarat:  (_target) => {
			baccarat.createGame(_target,self);
		},
		updateBaccaratScoreBoard (data, _target) {
			baccarat.updateScoreboard(data, _target, self);
	  },
	  drawBaccaratRoadMap (marks, _target, from) {
			let pearl = format().fnFormatBCPearlRoad(marks,6,14) // eye view roadmap
			let big = format().fnFormatBCBigRoad(marks, 25); // eye view roadmap
			let bigeye = format().fnFormatBigEyeBoy(marks,6,25); // eye view roadmap
			let smallroad = format().fnFormatSmallRoad(marks,6,25); // eye view roadmap
			let cockroach = format().fnFormatCockroachPig(marks,6,25); // eye view roadmap
			baccarat.drawRoadMap(pearl,big, bigeye, smallroad, cockroach, _target, self);
	  },
	  drawDragonTiger : (_target) => {
			dragonTiger.createGame(_target,self);
	  },
	  drawDtRoadMap (marks, _target) {

			let pearl = format().fnFormatDTPearlRoad(marks, 6, 14);
			let bigroad = format().fnFormatDTBigRoad(marks, 6, 24);
			let bigeye = format().fnFormatDTBigEyeBoy(marks, 6, 48)
			let smallroad = format().fnFormatDTSmallRoad(marks, 6, 20);
			let cockroach = format().fnFormatDTCockroachPig(marks, 6, 20);

			dragonTiger.drawRoadMap(pearl,bigroad, bigeye, smallroad, cockroach, _target, self);
	  },
	  updateDtScoreBoard (data, _target) {
			dragonTiger.updateScoreboard(data, _target, self);
	  },
	  // ==== ppker
	  drawPoker (_target) {
			poker.createGame(_target,self);
	  },
	  pokerEyeRoadmapUpdate(_target) {
	  	let mark = format().fnFormatPokerRoadMap(_target.data.marks, 6, 10);
			poker.drawRoadMap(mark, _target, self);
	  },
	  pokerSetResult (meta, _target) {
	  	poker.setResult(meta, _target, self);
	  },
	  drawSicbo (_target) {
	  	sicbo.createGame(_target,self);
	  },
	  doubleTripleCount(_target) {
	  	sicbo.updateScoreboard(_target);
		
	  },
	  setScoreBoardText(data, _target) {
	  	// sicbo.updateScoreboard(_target);
	  },
	  drawSicboRoadMap( _target) {
			sicbo.drawRoadMap(format().fnFormatSicbo(_target.data.marks,14,6).size, "size", _target, self); //eye view roadmap
			sicbo.drawRoadMap(format().fnFormatSicbo(_target.data.marks,14,6).parity, "parity", _target, self);//eye view roadmap
			sicbo.drawRoadMap(format().fnFormatSicbo(_target.data.marks,14,6).dice, "dice", _target, self);//eye view roadmap
			sicbo.drawRoadMap(format().fnFormatSicbo(_target.data.marks,14,6).sum, "sum", _target, self);//eye view roadmap
	  },
	  drawSicboInfo (_target) {
	  	sicbo.udpateLast5(_target,self);
	  },
	  drawRedWhite(_target) {

	  	redwhite.createGame(_target,self);
	  },
	  setRDscoreboard(_target) {
	  	redwhite.updateScoreboard(_target,self);
		},
	  drawRedWhiteRoadmap (_target) {	
			let rdMarks = format().fnRedWhiteRoadMap(_target.data.marks, 6 , 14);
	  	redwhite.drawRoadMap(rdMarks, _target, self);
	  },
	  swipeCards (target, data) {
			switch(data.gameName) {
				case "Dragon-Tiger" :
					if(data.gameInfo.dragon) {
						target.dragon_val.visible = true
						target.dragon_val.text = cardsModule(data.gameInfo.dragon).value
					}
					if(data.gameInfo.tiger) {
						target.tiger_val.visible = true
						target.tiger_val.text = cardsModule(data.gameInfo.tiger).value
					}

					dragonTiger.swipeCards(target, data)
					break;
				case "Poker" :

					poker.swipeCards(target, data)

					break;
				case "Baccarat" :

					let total = baccaratTotal(data.gameInfo);
					let player_val = total.player;
					let banker_val = total.banker;

					target.banker_val.visible = true;
					target.player_val.visible = true;

					baccarat.swipeCards(data, total, target)
					break;
			}
	  },
	  handleAreaState () {

	  }
  }

  return instance;
}
