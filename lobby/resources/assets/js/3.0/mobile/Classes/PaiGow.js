import {Game} from './Game';
import { createTileSprite, fontFormat } from '../../../factories/factories';
import tilesModule from '../../../factories/tiles';
import {dice} from '../../../factories/dice';
import fnFormat from  '../../../factories/formatter';
import {
  createSprite,
  randomNum,
  numberCounter,
  playSound,
  numberWithCommas,
  createSpriteRoadMap,
  getSlaveParam,
} from '../../../factories/factories';

class PaiGow extends Game {
  constructor(data, x, y, w, h, parent, self, isJunket, roomdata) {
    super(data, x, y, w, h, parent, self, isJunket, roomdata);

    this.TileName = ["banker", "up", "heaven", "down"];
    this.tiles = {};
    this.playArea = [];

    this.dealingCardAnimationBg.graphics.clear().beginFill("rgba(22, 22, 22, 0.9)").drawRect(0,0,226,175);

    this.cardContainer = new createjs.Container();
    this.cardContainer.x = 135;
    this.cardContainer.y = 50;
    this.cardContainer.visible = false;
    this.stage.addChild(this.cardContainer);

    // set roadmap container
    this.roadmapLines = new createjs.Container();
    this.roadmapLines.set({x:135,y:50});
    this.roadmap_container.addChild(this.roadmapLines);

    /*** room info ***/
    this.roomInfo = new createjs.Container();
    this.roomInfo.y = h - 38;
    this.stage.addChild(this.roomInfo);

    if(window.room_info == 1) {
      this.usersIco = new createjs.Bitmap(this.ctx.load.getResources("mobile_user_ico"));
      this.usersIco.x = this.roadmapLines.x;
      this.usersIco.y = 10;
      this.usersIco.scaleX = this.usersIco.scaleY = 1;
      this.roomInfo.addChild(this.usersIco);

      this.usersCount = this.getText(this.usersIco.x + 34,this.usersIco.y + 14, 0,"26px bebas-regular","#fff","center","middle");
      this.roomInfo.addChild(this.usersCount);
    }
    /*** end room info ***/

    // dice animation
    this.dice1 = new dice(1, 40, 40);
    this.dice1.diceCon.x = 57;
    this.dice1.diceCon.y = 126;
    this.dice1.diceCon.oy = 126;
    this.dice1.diceCon.regX = this.dice1.diceCon.regY = 20;

    this.dice2 = new dice(2, 40, 40);
    this.dice2.diceCon.x = this.dice1.diceCon.x + 65;
    this.dice2.diceCon.y = this.dice1.diceCon.y;
    this.dice2.diceCon.oy = this.dice1.diceCon.y;
    this.dice2.diceCon.regX = this.dice2.diceCon.regY = 20;

    this.textContainer = new createjs.Container();
    this.dealingCardAnimation.addChild(this.dice1.diceCon, this.dice2.diceCon);

    this.total = new createjs.Text("5", "45px bebas-regular", "#fff");
    this.total.visible = false;
    this.total.textBaseline  = "middle";
    this.total.textAlign  = "center";
    // this.total.x = this.dice2.diceCon.x - 75;
    this.total.y = this.dice2.diceCon.y + 10;
    this.total.scaleX = this.total.scaleY = 0;

    this.textContainer.addChild(this.total);
    this.dealingCardAnimation.addChild(this.textContainer);

    this.value = new createjs.Text("BANKER", "45px bebas-regular", "#fff");
    this.value.visible = false;
    this.value.textBaseline  = "middle";
    this.value.textAlign  = "center";
    this.value.x = this.total.x + 25;
    this.value.y = this.total.y;
    this.value.scaleX = this.value.scaleY = 0;

    this.textContainer.addChild(this.value);

    this.animation = [];

    // draw roadmap grid
    let lines = new createjs.Shape();
    lines.graphics.ss(.8).s("rgba(0,0,0,0.6)").moveTo(0,0);
    this.roadmapLines.addChild(lines);

    let posY = 0;
    let posX = 0;
    lines.graphics.moveTo(posX,posY);
    for(var i = 0; i <= 4 ; i++) {
      lines.graphics.moveTo(posX,posY+ (43.9*i)).lineTo(posX + 225.6, posY+ (43.9*i));
    }

    for(var i = 0; i <= 5 ; i++) {
      lines.graphics.moveTo(posX+(45*i),posY).lineTo(posX+(45*i),posY+175);
    }


    let playerLabelTexts = ['庄', '上', '天', '下'];
    let TileBgColor = ["#d32f2f", "#e07a14", "#1565c0", "#689f38"];
    let playerLangText = [];
    if(window.language2.locale == "jp" || window.language2.locale == "zh") {
      playerLangText = ["BANKER", "UP", "HEAVEN", "DOWN"];
    } else {
      playerLangText = [
        window.language.menu.bankercaps,
        window.language.menu.upcaps,
        window.language.menu.heavencaps,
        window.language.menu.downcaps
      ];
    }

    this.roadmapTilesCon = new createjs.Container();
    this.cardContainer.addChild(this.roadmapTilesCon);

    for(var i = 0; i < this.TileName.length; i++) {
      let roadmapTiles = new createjs.Container();
      roadmapTiles.x = 10.5 + (i * 121);
      roadmapTiles.y = 28;
      this.roadmapTilesCon.addChild(roadmapTiles);

      let TilesBg = new createjs.Shape();
      TilesBg.graphics.f(TileBgColor[i]).drawRoundRect( 0, 0, 113, 135, 7 );
      roadmapTiles.addChild(TilesBg);
      roadmapTiles.TilesBg = TilesBg;

      let playerText = this.getText( roadmapTiles.x + (120 / 2), 15, playerLangText[i], "800 20px lato-black",TileBgColor[i],"left","middle" );
      playerText.x -= (playerText.getTransformedBounds().width /2) - 15;

      let playerSymbol = this.getText( playerText.x - 31, 15, playerLabelTexts[i], "800 20px lato-black" ,TileBgColor[i],"left","middle" )
      this.roadmapTilesCon.addChild(playerText, playerSymbol);

      let pointsText = this.getText( 118 / 2, 105, 0, fontFormat(40, 'normal', 'bebas', false),"#fff","center","middle");
      roadmapTiles.addChild(pointsText);
      roadmapTiles.points = pointsText;

      roadmapTiles.tileContainer = new createjs.Container();
      roadmapTiles.addChild(roadmapTiles.tileContainer);

      this.playArea[this.TileName[i]] = roadmapTiles;
    }

    // set roadmap data container
    this.roadmapDataCon = new createjs.Container();
    this.roadmapDataCon.x = 134;
    this.roadmapDataCon.y = 49;
    this.roadmap_container.addChild(this.roadmapDataCon);

    this.routeTileCon = new createjs.Container();
    this.routeTileCon.x = 367;
    this.routeTileCon.y = 60;
    this.routeTileCon.routes = {};
    this.roadmap_container.addChild(this.routeTileCon);

    self.roadMarks = fnFormat().fnPaigowLastRounds(data.marks);
    _.forEach(self.roadMarks, (m) => {
      if(typeof m.game_info == 'string') m.game_info = JSON.parse(m.game_info); // format game_info
      if(typeof m.game_result == 'string') m.game_result = JSON.parse(m.game_result); //format game_result
    });

    this.drawRoadMap(fnFormat().fnPaigowRoadMap(self.roadMarks));
    this.reinitTiles();
    this.setUsedTiles(self.roadMarks);
    this.drawTiles(data.gameInfo.tiles);
    this.drawTileInfo(data.gameInfo.tiles);

    if(window.room_info == 1) {
      this.setRoomInfo(this.data.betInfo);
    }
    if(this.roadmap_container.cacheCanvas) {
      this.roadmap_container.updateCache();
    }
    this.stage.update();
  }

  getText(x,y,text,font,color,align,valign){
    let ctrl = new createjs.Text(text,font,color);
    ctrl.x = x;
    ctrl.y = y;
    ctrl.textAlign = align;
    ctrl.textBaseline = valign;//"middle"
    return ctrl;
  }

	drawRoadMap(data, isNew) {
		this.roadmapDataCon.removeAllChildren();
		// this.data = data;
		//loop data to display
		for (let i=0; i<data.length; i++) {
			let areas = data[i].areas;
			for(let j=0; j<areas.length; j++) {
				//draw winning background if winner
        let area_color = '#808080';
        if(areas[j].isWinner || j == 0) {
          area_color = areas[j].color;
        }
        let circlCon = new createjs.Container();
				// draw player circle
				let circle = new createjs.Shape();
				circle.graphics.f(area_color).drawCircle(0,0,19);
				circle.x = 22.5 + (i * 45);
				circle.y = 23 + (j * 44);
        circlCon.addChild(circle);

				//if pair add small circle
				if(areas[j].isPair) {
					circle.graphics.moveTo(0,15).setStrokeStyle(0.8).beginStroke("#fff").drawCircle(15,15,6);
				}

        //add gold highlight for winner
        if(areas[j].isWinner) {
          circle.graphics.clear().ss(2).s('gold').f(area_color).drawCircle(0,0,18);
          circle.shadow = new createjs.Shadow("gold", 0, 0, 5);

          if(areas[j].isPair) {
            circle.graphics.moveTo(0,15).setStrokeStyle(2).beginStroke('gold').drawCircle(15,15,5);
          }
        }

				// player circle total
				let total = this.getText(circle.x,circle.y+1, areas[j].total, fontFormat(28, "normal", "bebas", false),"#fff","center","middle");
        circlCon.addChild(total);
        this.roadmapDataCon.addChild(circlCon);
        if(isNew && i == data.length-1) {
          createjs.Tween.get(circlCon, {loop: true})
          .to({ alpha: 0.3 }, 375)
          .to({ alpha: 1 }, 375);
          setTimeout(function(d){
            createjs.Tween.removeTweens(d[0]);
            d[0].alpha = 1;
          }, 3000, [circlCon]);
        }
			}
		}
	}

  reinitTiles() {
    // static route tiles
    this.routeTiles = {
      'tile-1' : [],
      'tile-2' : [],
      'tile-3' : [],
      'tile-4' : [],
      'tile-5' : [],
      'tile-6' : [],
      'tile-7' : [],
      'tile-8' : [],
      'tile-9' : [],
      'tile-0' : [],
    };

    this.tiles = {};

    let index = 0;
    for (let area in this.routeTiles) {
      let tile = createTileSprite(this, 46, 60.5,this.ctx.load.getResources("small_tiles"));
      tile.gotoAndStop(area);
      tile.scaleX = tile.scaleY = 0.87;
      tile.x = (index > 4 ? index - 5 : index) * 55;
      tile.y = index < 5 ? 0 : 83;
      this.routeTileCon.addChild(tile);
      this.routeTileCon.routes[area] = this.routeTileCon.routes[area] || [];
      for (let j = 0; j < 4; j++ ) {
        if(this.routeTileCon.routes[area][j]) {
          this.routeTileCon.routes[area][j].graphics.clear().s('#5b5b5b').drawCircle(0,0,4);
        } else {
          this.routeTileCon.routes[area][j] = new createjs.Shape();
          this.routeTileCon.routes[area][j].graphics.s('#5b5b5b').drawCircle(0,0,4);
          this.routeTileCon.routes[area][j].x = tile.x + 5 + (j * 10);
          this.routeTileCon.routes[area][j].y = tile.y + 65;
          this.routeTileCon.addChild(this.routeTileCon.routes[area][j]);
        }
      }
      index++;
    }
  }

  setUsedTiles(rounds) {
    // loop rounds
    for(let i=0;i<rounds.length;i++) {
      // loop tiles
      for(let area in rounds[i].game_info.tiles) {
        let tileData = rounds[i].game_info.tiles[area];

        if(tileData[0] != undefined && this.routeTiles['tile-'+tilesModule(tileData[0]).number]){
          this.routeTiles['tile-'+tilesModule(tileData[0]).number].push(tilesModule(tileData[0]).value)
        }
        if(tileData[1] != undefined && this.routeTiles['tile-'+tilesModule(tileData[1]).number]){
          this.routeTiles['tile-'+tilesModule(tileData[1]).number].push(tilesModule(tileData[1]).value)
        }
      }
    }

    this.drawUsedTiles();
  }

  drawUsedTiles() {
    // loop routetiles
    for (let area in this.routeTiles) {
      // 2nd loop routetilecon
      for(let i=0;i<this.routeTileCon.routes[area].length;i++) {
        // draw route if data exist in routetiles
        if(this.routeTiles[area][i] != null) {
          this.routeTileCon.routes[area][i].graphics.clear().f('#5c5c5c').drawCircle(0,0,4);
        } else {
          this.routeTileCon.routes[area][i].graphics.clear().s('#5b5b5b').drawCircle(0,0,4);
        }
      }
    }
  }

  drawTiles(tile, type) {
    for(var key in tile) {

      this.playArea[key].tileContainer.removeAllChildren();

      if(type && type == key) {
        createjs.Tween.get(this.playArea[key].TilesBg, {loop: true})
        .to({ alpha: 0.3 }, 375)
        .to({ alpha: 1 }, 375);
      } else {
        createjs.Tween.removeTweens(this.playArea[key].TilesBg);
        this.playArea[key].TilesBg.alpha = 1;
      }

      if(!this[key]) {
        this[key] = [];
      }
      // first tile
      if(tile[key][0]) {
        this[key][0] = createTileSprite(this, 46, 60, this.ctx.load.getResources("small_tiles"));
        this[key][0].scaleX = this[key][0].scaleY = 1;
        this[key][0].gotoAndStop('tile-'+tilesModule(tile[key][0]).number);
        this[key][0].x = 6;
        this[key][0].y = 6;
        this.playArea[key].tileContainer.addChild(this[key][0]);
        if(type == `tiles_${key}`){
          this[key][0].alpha = 0;
          this[key][0].y = 6 + 20;
          createjs.Tween.get(this[key][0])
          .wait(500)
          .to({
            alpha: 1,
            y: 6,
          },200);
        }
      }
      //second tile
      if(tile[key][1]) {
        this[key][1] = createTileSprite(this, 46, 60, this.ctx.load.getResources("small_tiles"));
        this[key][1].scaleX = this[key][1].scaleY = 1;
        this[key][1].gotoAndStop('tile-'+tilesModule(tile[key][1]).number);
        this[key][1].x = 13 + 50;
        this[key][1].y = 6;
        this.playArea[key].tileContainer.addChild(this[key][1]);
        if(type == `tiles_${key}`) {
          this[key][1].alpha = 0;
          this[key][1].y = 6 + 20;
          createjs.Tween.get(this[key][1])
          .wait(1000)
          .to({
            alpha: 1,
            y: 6,
          },200)
        }
      }
    }
  }

  drawTileInfo(tile) {
    for(var key in tile) {
      let tile_1 = tile[key][0] ? tilesModule(tile[key][0]).value : 0;
      let tile_2 = tile[key][1] ? tilesModule(tile[key][1]).value : 0;
      if((!tile[key][1] && tile_1 == 10) || (tile_1 == tile_2 && tile_2 == 10)) {
        this.playArea[key].points.text = tilesModule(tile[key][0]).text + (tile_1 == tile_2 ? ' - PAIR' : '');
      } else {
        this.playArea[key].points.text = tile_1 == tile_2 && tile_1 != 0 ? (tile_1   +' - PAIR' ) : _.reduce([tile_1, tile_2], (sum,n)=>{return sum + +n}, 0) % 10;
      }
    }
  }

  animateDealing () {
    createjs.Tween.get(this.dealingCardAnimationBg).wait(100)
    .to({ scaleX: 1 },300)

    createjs.Tween.get(this.dealingCardAnimation).wait(200)
    .to({ visible: true },150).wait(100)
    .to({ alpha: 1 },300)

    for (var dices of [this.dice1.diceCon, this.dice2.diceCon]) {
      dices.y = 126;
      dices.rotation = 0;
      createjs.Tween.get(dices).wait(4500)
      .to({ rotation : 180, y: 40 },500)
      .to({ rotation : 220, y: 40 },100)
      .to({ rotation : 360, y: 126 },500)
      .to({ y: 120 },100)
      .to({ y: 126 },100)
      .to({ rotation : 540, y: 40 },500)
      .to({ rotation : 580, y: 40 },100)
      .to({ rotation : 720, y: 126 },500)
      .to({ y: 120 },100)
      .to({ y: 126 },100)
      .to({ rotation : 900, y: 40 },500)
      .to({ rotation : 940, y: 40 },100)
      .to({ rotation : 1080, y: 126 },500)
      .to({ y: 120 },100)
      .to({ y: 126 },100).wait(5000)
      .to({ alpha : 0 },400)
    }

    setTimeout( ()=> {
      this.animation.push(setInterval(() => {
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
    }, 4500);
  }

  endBettingTime (data) {
    super.endBettingTime(data);
    this.status.text = window.language2.lobby_gamestatus_shaking;
    this.animateDealing();
  }

  inputItem(data) {
    super.inputItem(data);
    if(data.type == "dices_0" || data.type == "dices_1") return;

    for(let area in data.gameInfo.tiles) {
      this.tiles[area] = data.gameInfo.tiles[area];
    }

    for(var key in this.tiles) {
      if(this.tiles[key][1] && !this.tiles[key][0]) return;
    }

    this.drawTiles(this.tiles, data.type == "seat" ? data.value : data.type);
    //set tile total
    this.drawTileInfo(this.tiles);

    this.clearAll();
    createjs.Tween.removeTweens(this.dice1.diceCon)
    createjs.Tween.removeTweens(this.dice2.diceCon)

    if(data.type.indexOf('dice') > -1) {
    }

    if(data.type=== 'seat') {
      this.dice1.diceCon.stop = true;
      this.dice2.diceCon.stop = true;

      this.value.visible = true;
      this.total.visible = true;

      let diceval = _.clone(data.gameInfo.dices);

      for(var x = 0; x < diceval.length; x++) {
        if(parseInt(diceval[x]) === 1) diceval[x] = 1;
        if(parseInt(diceval[x]) === 2) diceval[x] = 2;
        if(parseInt(diceval[x]) === 3) diceval[x] = 3;
        if(parseInt(diceval[x]) === 4) diceval[x] = 4;
        if(parseInt(diceval[x]) === 5) diceval[x] = 5;
        if(parseInt(diceval[x]) === 6) diceval[x] = 6;
      }

      this.dealingCardAnimation.removeChild(this.dice1.diceCon);
      this.dealingCardAnimation.removeChild(this.dice2.diceCon);

      this.resdice1 = new dice(diceval[0], 40, 40);
      this.dice1 = this.resdice1;
      this.dice1.diceCon.x = 57;
      this.dice1.diceCon.y = 126;
      this.dice1.diceCon.scaleX = this.dice1.diceCon.scaleY = 0;
      this.dice1.diceCon.regX = this.dice1.diceCon.regY = 20;
      this.dealingCardAnimation.addChild(this.dice1.diceCon);

      this.resdice2 = new dice(diceval[1], 40, 40);
      this.dice2 = this.resdice2;
      this.dice2.diceCon.x = this.dice1.diceCon.x + 65;
      this.dice2.diceCon.y = this.dice1.diceCon.y;
      this.dice2.diceCon.scaleX = this.dice2.diceCon.scaleY = 0;
      this.dice2.diceCon.regX = this.dice2.diceCon.regY = 20;
      this.dealingCardAnimation.addChild(this.dice2.diceCon);

      this.total.text = _.reduce(data.gameInfo.dices, function (sum, n) {return parseInt(sum) + parseInt(n)});
      this.value.text = data.value.toUpperCase();

      this.value.x = this.total.x + this.total.getMeasuredWidth() + (this.value.getMeasuredWidth()/2) ;
      this.textContainer.regX = (this.total.getMeasuredWidth() + this.value.getMeasuredWidth()) /2;
      this.textContainer.x = 100;

      this.total.alpha = this.value.alpha = 0;
      this.total.scaleX = this.value.scaleX = 0;
      this.total.scaleY = this.value.scaleY = 0;

      for (var dices of [this.dice1.diceCon, this.dice2.diceCon]) {
        createjs.Tween.get(dices)
        .to({ scaleX : 1, scaleY : 1 }, 300)
        .to({ y : 80 }, 500)
      }

      for (var winnerText of [this.value, this.total]) {
        createjs.Tween.get(winnerText).wait(800)
        .to({ scaleY:1, scaleX:1, alpha:1 },150)
      }
    }

    setTimeout(() => {
      this.cardContainer.visible = true;
      this.roadmap_container.visible = false;
      this.dealingCardAnimationBg.scaleX = 0;
      this.dealingCardAnimation.visible = false;
      this.status.text = window.language2.lobby_gamestatus_nowdealing;
      this.stage.update();
    }, 1500);
  }


  displayResult(data) {
    super.displayResult(data);
    let winners = [];

    winners = data.gameResult.winner;
    this.winning(winners);
    // reinit rounds
    this.data.marks = fnFormat().fnPaigowLastRounds(this.data.marks);
    // display last 5 rounds in ingame-roadmap
    this.drawRoadMap(fnFormat().fnPaigowRoadMap(this.data.marks), true);

    this.reinitTiles();
    this.setUsedTiles(fnFormat().fnPaigowRoadMap(this.data.marks));

  }

  newRound(data) {
    super.newRound(data);
    this.value.visible = false;
		this.total.visible = false;
    this.cardContainer.visible = false;
    this.roadmap_container.visible = true;

    createjs.Tween.get(this.dealingCardAnimationBg).wait(200)
    .to({ scaleX: 0 },300)
    .call(() => {
      this.stage.update();
    });

    this.dealingCardAnimation.alpha = 0;
    this.dealingCardAnimation.visible = false;

    for(let i=0;i<this.TileName.length;i++) {
      this.playArea[this.TileName[i]].tileContainer.removeAllChildren();
      this.playArea[this.TileName[i]].points.text = 0;
      this.playArea[this.TileName[i]].tiles = [];
      createjs.Tween.removeTweens(this.playArea[this.TileName[i]].TilesBg);
      this.playArea[this.TileName[i]].TilesBg.alpha = 1;
    }
    this.stage.update();
  }

  shoechange(data) {
    super.shoechange(data);
    this.roadmapDataCon.removeAllChildren();
    for(let i=0;i<this.TileName.length;i++) {
      this.playArea[this.TileName[i]].tileContainer.removeAllChildren();
      this.playArea[this.TileName[i]].points.text = 0;
    }
  }

  setRoomInfo(data) {
    this.usersCount.text = '0';
    this.usersCount.text = this.data.totalBettingUsers;
  }

  winning (winners) {
    for(let i=0;i<this.TileName.length;i++) {

      let win = _.find(winners, (w)=>{ return w == this.TileName[i] }) !== undefined;
      if(win) {
        createjs.Tween.get(this.playArea[this.TileName[i]].TilesBg, {loop: true})
        .to({ alpha: 0.3 }, 375)
        .to({ alpha: 1 }, 375);
        setTimeout(function(d){
          createjs.Tween.removeTweens(d[0]);
          d[0].alpha = 1;
        }, 3000, [this.playArea[this.TileName[i]].TilesBg]);
      }
    }
  }

  clearAll () {
    this.animation.forEach((a) => {
      clearInterval(a);
    });
  }

}

export default {PaiGow};
