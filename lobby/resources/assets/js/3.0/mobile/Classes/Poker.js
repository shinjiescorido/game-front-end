import {Game} from './Game';
import { fontFormat, createCardSprite } from '../../../factories/factories';
import fnFormat from  '../../../factories/formatter';

class Poker extends Game {
	constructor(data, x, y, w, h, parent, self, isJunket, roomdata) {
		super(data, x, y, w, h, parent, self, isJunket, roomdata);

		/*** room info ***/
		this.roomInfo = new createjs.Container();
		this.roomInfo.y = h - 38;
		this.stage.addChild(this.roomInfo);

		if(window.room_info == 1) {
			this.usersIco = new createjs.Bitmap(this.ctx.load.getResources("mobile_user_ico"));
			this.usersIco.x = 135;
			this.usersIco.y = 10;
			this.usersIco.scaleX = this.usersIco.scaleY = 1;
			this.roomInfo.addChild(this.usersIco);

			this.usersCount = this.getText(this.usersIco.x + 34,this.usersIco.y + 14, 0,"26px bebas-regular","#fff","center","middle");
			this.roomInfo.addChild(this.usersCount);
		} else {
			this.roundNumber = this.getText(840,19, "Round","21px lato-bold","#fff","center","middle");
			// this.roomInfo.addChild(this.roundNumber);
			this.data.roundno = this.getText(this.roundNumber.x + 50,this.roundNumber.y, "0","21px lato-bold","#fff","center","middle");
			// this.roomInfo.addChild(this.data.roundno);
		}
		/*** end room info ***/

		// set roadmap container
		this.roadmapLines = new createjs.Container();
		this.roadmap_container.addChild(this.roadmapLines);

		this.lines = new createjs.Shape();
		this.lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0,0)
		this.lines.x = 135;
		this.lines.y = 50;
		this.roadmapLines.addChild(this.lines);

		//pearl
		for(var i = 0; i <= 6; i++) {
			this.lines.graphics.moveTo(0,29.2*i).lineTo(495,29.2*i)
		} // end for

		this.lines.graphics.moveTo(29,0);
		for(var x = 0; x <= 17; x++) {
			this.lines.graphics.moveTo(29.2*x,0).lineTo(29.2*x,175)
		}

		this.roadmapData = new createjs.Container();
		this.roadmapData.x = 145;
		this.roadmapData.y = 61;
		this.roadmapData.visible = true;
		this.roadmap_container.addChild(this.roadmapData);

		/** card data **/
		this.cardCon = new createjs.Container();
		this.cardCon.x = 120;
		this.cardCon.y = 68;
		this.cardCon.visible = false;
		this.stage.addChild(this.cardCon);

		var presets = ['dealer','community','player'];
		for(var x = 0 ; x < presets.length; x++) {
			this[presets[x]+'Bg'] = new createjs.Shape();
			this[presets[x]+'Bg'].graphics.beginFill(x === 0 ? '#ce3031' : x === 1 ? '#5c5a5c' : '#1b64ba').drawRoundRect(0,0,x === 1 ? 245: 115,105,4);
			this[presets[x]+'Bg'].setBounds(0,0,x === 1 ? 245: 115,105);
			this[presets[x]+'Bg'].x = x > 0 ? this[presets[x-1]+'Bg'].x + this[presets[x-1]+'Bg'].getBounds().width + 6 : 20
			this[presets[x]+'Bg'].y = 28

			this[presets[x]+'Text'] = new createjs.Text(presets[x].toUpperCase(), "20px lato-black", x === 0 ? '#ce3031' : x === 1 ? '#5c5a5c' : '#1b64ba');
			this[presets[x]+'Text'].textAlign = 'center';
			this[presets[x]+'Text'].textBaseline = 'middle';
			this[presets[x]+'Text'].x = this[presets[x]+'Bg'].x + this[presets[x]+'Bg'].getBounds().width/2;
			this[presets[x]+'Text'].y = this[presets[x]+'Bg'].y - 15;

			this.cardCon.addChild(this[presets[x]+'Bg'], this[presets[x]+'Text']);

			this[presets[x]+'Cards'] = [];

			let len = 2;

			if(x == 1) {
				len = 5
			}
			this[presets[x]+'Cards'] = [];
			for(var i = 0; i < len; i++) {
				this[presets[x]+'Cards'][i] = createCardSprite(this,51,68,this.ctx.load.getResources("bet-cards-large"));
				this[presets[x]+'Cards'][i].scaleX = 0
				this[presets[x]+'Cards'][i].scaleY = 1

				this[presets[x]+'Cards'][i].gotoAndStop('back_red');

				let w = this[presets[x]+'Cards'][i].getBounds().width/2, h = this[presets[x]+'Cards'][i].getBounds().height/2;

				// w += w * 0.18, h += w * 0.18;

				this[presets[x]+'Cards'][i].regX = (51/2);
				this[presets[x]+'Cards'][i].regY = (68/2);

				this[presets[x]+'Cards'][i].y = this[presets[x]+'Bg'].y + 52;
				let adjust = 0;
				if(x === 1 ) adjust = 16;//3.2;
				else adjust = 14;
				this[presets[x]+'Cards'][i].x = this[presets[x]+'Bg'].x + (i * (w+adjust)) + (x === 1 ? 40 : 38);

				this[presets[x]+'Cards'][i].visible = false
				this.cardCon.addChild(this[presets[x]+'Cards'][i]);
			} //end for
		}
		//drawing card data on load
		if(!_.isEmpty(this.data.gameInfo)) {
			this.inputItem({gameInfo: this.data.gameInfo, gameName : 'Poker'})
		}
		this.drawRoadMap(fnFormat().fnFormatPokerRoadMap(data.marks,6,16));
		if(window.room_info == 1) {
      this.setRoomInfo(this.data.betInfo);
    }
		if(this.roadmap_container.cacheCanvas) {
			this.roadmap_container.updateCache();
		}
		this.stage.update();
	}

	getText(x,y,text,font,color,align,valign) {
		let ctrl = new createjs.Text(text,font,color);
		ctrl.x = x;
		ctrl.y = y;
		ctrl.textAlign = align;
		ctrl.textBaseline = valign;//"middle"
		return ctrl;
	}

	drawRoadMap(data, isNew) {
		this.roadmapData.removeAllChildren();
		let color = "";
		let res_text = "";

		let info = {
			total_num_games : 0,
			total_win : 0,
			total_lose : 0
		}

		for(var x = 0; x < data.length; x++) {
			for(var i = 0;i < data[x].length; i++) {
				if(data[x][i] !== undefined ) {

					if(data[x][i] == "D") {
						color = "#d32f2f"
						res_text = window.language.locale == "zh" ? '荷' : 'D';
						info.total_num_games ++
						info.total_win ++
					} //end if
					else if(data[x][i] == "P") {
						color = "#1565c0"
						res_text = window.language.locale == "zh" ? '闲' : 'P';
						info.total_num_games ++
						info.total_lose ++
					} //else if
					else if(data[x][i] == "T") {
						res_text = window.language.locale == "zh" ? '和' : 'T';
						color = "#689f39"
					} //else if

					data[x][i] = new createjs.Shape();
					data[x][i].graphics.beginFill(color).drawCircle(0,0,13);
					data[x][i].x = (x*29.2)+4;
					data[x][i].y = (i*29.5)+3;

					data[x][i].text = new createjs.Text(res_text,window.language.locale == "zh" ? "15px arial" : "18px lato-black" ,"#fff");

					if(window.language.locale == "zh") {
						data[x][i].text.x = data[x][i].x - 8;
						data[x][i].text.y = data[x][i].y - 8;
					} else {
						data[x][i].text.x = data[x][i].x - 6;
						data[x][i].text.y = data[x][i].y - 11;
					}

					if(data[x+1] == undefined && data[x][i+1] == undefined) {
						data[x][i].last_child = true;
					}

					this.roadmapData.addChild(data[x][i], data[x][i].text);
				} //end of if
			}
		}
	}

	endBettingTime (data) {
		super.endBettingTime(data);
		this.roadmap_container.visible = false;
		this.cardCon.visible = true;
	}

	inputItem(data) {
		super.inputItem(data);
		this.roadmap_container.visible = false;
		this.cardCon.visible = true;

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
				if(!gameInfo[key][i]) continue;
				this[key+'Cards'][i].gotoAndStop(`C${gameInfo[key][i]}`);
				this[key+'Cards'][i].visible = true;
				createjs.Tween.get(this[key+'Cards'][i])
				.to({
					scaleX : 1
				}, 200)
			} //end for
		} //end for
	}

	displayResult(data) {
		super.displayResult(data);

		if(!_.isEmpty(data.gameResult.winner)) {
			let winner = data.gameResult.winner.toLowerCase();
			if(winner == "player") {
				this.status.text = window.language.baccarat.playerwins;
			} else {
				this.status.text = window.language.baccarat.bankerwins;
			}
		}

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

		for(var key in gameInfo) {
			for(var i = 0; i < gameInfo[key].length; i++) {
				if(!gameInfo[key][i]) continue;
				this[key+'Cards'][i].gotoAndStop(`${gameInfo[key][i]}`);
			} //end for
		} //end for

		this.drawRoadMap(fnFormat().fnFormatPokerRoadMap(this.data.marks,6,16));
	}

	displaymodify() {
		super.displaymodify();
		this.drawRoadMap(fnFormat().fnFormatPokerRoadMap(this.data.marks,6,16));
	}

	newRound(data) {
		super.newRound(data);
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
		this.roadmap_container.visible = true;
		this.cardCon.visible = false;

		this.stage.update();
	}

	shoechange(data) {
		super.shoechange(data);
		this.roadmapData.removeAllChildren();
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
	}

	setRoomInfo(data) {
		this.usersCount.text = '0';
    this.usersCount.text = this.data.totalBettingUsers;
	}
}

export default {Poker};
