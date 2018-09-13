import fnFormat from '../../../../factories/formatter';
import tilesModule from '../../../../factories/tiles';
import {baccaratRoadmap as bcRoadmap} from '../../../../factories/scoreboard_draw';
import {dragontigerRoadmap as dtRoadmap} from '../../../../factories/scoreboard_draw';
import {fontFormat, createTileSprite} from '../../../../factories/factories';

class Roadmap {
	constructor(data, el, evt, ctx) {
		if(this.eye) this.eye.removeAllChildren();
		this.eye = new createjs.Stage('rm-list');
		this.eye.x = 0;
		this.self = ctx;

		var game = $(el).attr('data').split('/')[0];
		var table = $(el).attr('data').split('/')[1];

		this.namespace = `${data.namespace}`;
		this.data = data;

		table = table.length > 1 ? `${table}` : `0${table}`;

		var gameText = '';

		switch(game){
			case "Baccarat" :
				gameText = window.language.gamename.baccarat_game;
				break;
			case "Dragon-Tiger" :
				gameText = window.language.gamename.dragontiger_game;
				break;
			case "Sicbo":
				gameText = window.language.gamename.sicbo_game;
				break;
			case "Poker":
				gameText = window.language.gamename.poker_game;
				break;
			case "Pai-Gow":
				gameText ='Pai-Gow';
				break;
		}

		this.game = new createjs.Text(`${gameText}`, fontFormat(16, 'black', 'lato'), "#fff");
		this.game.textBaseline = 'middle';
		this.game.y = 18;
		this.game.x = this.game.ox = 10;
		this.eye.addChild(this.game);

		this.gameNo = new createjs.Text(`${table}`, fontFormat(16, 'black', 'lato', false), "#fff");
		this.gameNo.textBaseline = 'middle';
		this.gameNo.y = 18;
		this.gameNo.x = this.gameNo.ox = 15 + this.game.getMeasuredWidth();
		this.eye.addChild(this.gameNo);

		this.deal = new createjs.Text('', fontFormat(16, 'black', 'lato', false), "#fff");
		this.deal.textBaseline = 'middle';
		this.deal.textAlign = 'right';
		this.deal.y = 18;
		this.deal.x = this.deal.ox = 500;
		this.eye.addChild(this.deal);

		// this.redirect_icon = new createjs.Bitmap(this.self.context.getResources("multi-go"));
		// this.redirect_icon.regY = this.redirect_icon.getTransformedBounds().height/2
		// this.redirect_icon.x = 630;
		// this.redirect_icon.y = 18;
		// this.eye.addChild(this.redirect_icon);

		let redirect_link = '';

		switch(data.gameName) {
			case "Baccarat":
				redirect_link = window.bc_domain+data.tableNumber
				break;
			case "Dragon-Tiger":
				redirect_link = window.dt_domain+data.tableNumber
				break;
			case "Poker":
				redirect_link = window.p_domain+data.tableNumber
				break;
			case "Sicbo":
				redirect_link = window.sb_domain+data.tableNumber
				break;
			case "Pai-Gow":
				redirect_link = window.pg_domain+data.tableNumber
				break;
		}
		// this.redirect_icon.href = redirect_link;
		// this.redirect_icon.game = data.namespace;

		$("#link").on('click', (e) => {
			let range = '';

			range = this.data.casinoBetRanges[0];
			range = `${range.min}-${range.max}`;

      $.post("/setGameSettings", {range : range, game: `${this.namespace}`}, function () {
      	console.log(redirect_link, "hrefff location")
      	window.location.href = redirect_link;
      });
		});

		var val1 = window.innerHeight - $("#myCanvas").height();
		var val2 = (/*evt.clientY*/el.offset().top - $("#myCanvas").offset().top) / $("#myCanvas").height();
		var calc = (Math.abs(val2))*100;

		$("#roadmap-list-container").css({
				top: calc+'%',
		});

		this.roadmapBg = new createjs.Shape();
		this.roadmapBg.graphics.beginFill('#fff').drawRect(0,40,648,205-40);
		this.eye.addChild(this.roadmapBg);


		this.lines = new createjs.Shape();
		this.lines.graphics.ss(1).s('rgba(0,0,0,0.2)');

		let col = 28;
		let row = 6;

		let w = 18, h = 17.5;

		for(var x = 1; x <=col; x++) {
			this.lines.graphics.moveTo((x*w), 40).lineTo((x*w), (h*row)+40);
		}

		for(var x = 1; x <=row; x++) {
			this.lines.graphics.moveTo(0, (x*h)+40).lineTo((w*col), (x*h)+40);
		}
		this.eye.addChild(this.lines);

		this.roadmap_container = new createjs.Container();
		this.roadmap_container.set({x:0, y:40})
		this.eye.addChild(this.roadmap_container);

		this.setRoadmap(data, true);

		this.eye.update();
	}
	inputitem() {

	}
	newRound() {

	}
	setGameRoute() {

	}
}

class Baccarat extends Roadmap {
	constructor(data, el, evt, ctx) {
		super(data, el, evt, ctx);
	}

	setRoadmap(data) {

		this.roadmap_container.removeAllChildren();
		
		let slaveJson = {
			'supersix' : {
				'b': 'l',
				'q': 'm',
				'w': 'n',
				'e': 'o',
			},
			'bonus' : {
				'b': 'l',
				'q': 'm',
				'w': 'n',
				'e': 'o',
			},
			slave: ""
		}

		let marks = fnFormat(slaveJson).fnFormatBCBigRoad(data.marks,6, 30);

		this.deal.text = `#${data.marks.length}`;

		for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
				if(marks.matrix[i][e] === undefined) continue;

				let sp = null;
				var roadmap = new bcRoadmap(6, 2);
				roadmap.play('big-'+marks.matrix[i][e].mark.toLowerCase(), null, 2);
				roadmap.ties(marks.matrix[i][e].ties, {color:'#000', font: 'italic 16px lato-black', width:2, height:24});
				sp = roadmap.instance;
				sp.x = (e * 18) + 3;
				sp.y = (i * 17.5) + 3;

				this.roadmap_container.addChild(sp);
			}
		} //end for

		this.eye.update();
	}
}

class DragonTiger extends Roadmap {
	constructor(data, el, evt, ctx) {
		super(data, el, evt, ctx);
	}
	setRoadmap(data) {
		this.roadmap_container.removeAllChildren();
		let marks = fnFormat().fnFormatDTBigRoad(data.marks,6, 30);

		this.deal.text = `#${data.marks.length}`;

		for(var i = 0; i < marks.matrix.length; i++) {
			for(var e = 0; e < marks.matrix[i].length; e++) {
				if(marks.matrix[i][e] === undefined) continue;

				let sp = null;
				var roadmap = new dtRoadmap(6, 2);
				roadmap.play('big-'+marks.matrix[i][e].mark.toLowerCase(), null, 2);
				roadmap.ties(marks.matrix[i][e].ties, {color:'#000', font: 'italic 16px lato-black', width:2, height:24});
				sp = roadmap.instance;
				sp.x = (e * 18) + 3;
				sp.y = (i * 17.5) + 3;

				this.roadmap_container.addChild(sp);
			}
		} //end for
		this.eye.update();
	}
}

class Poker extends Roadmap {
	constructor(data,el, evt, ctx) {
		super(data,el, evt, ctx);
	}
	setRoadmap(data) {
		this.roadmap_container.removeAllChildren();
		data = fnFormat().fnFormatPokerRoadMap(data.marks, 6, 28);

		for(let c = 0; c < data.length; c++ ) {
			let poker_matrix = data[c];
			for(let n = 0; n < poker_matrix.length; n++ ) {
				if(poker_matrix[n] == undefined) continue;
				let sp = new createjs.Shape();
				sp.graphics.beginRadialGradientFill(["#1565c0","#175296"], [0, 1], 2, 2, 0, 2, 2, 30).drawCircle(0, 0, 8);
				sp.x = (c *18) + 8;
				sp.y = (n * 17.5) + 8;
				let text = new createjs.Text(window.language.locale == "zh" ? "闲" : "P", window.language.locale == "zh" ? "14px lato-black" : "bold 12px lato-black", "#ffffff");
				text.set({ textAlign: 'center', textBaseline: 'middle' });
				text.y = sp.y;
				text.x = sp.x;

				if(poker_matrix[n] == "D") {
					text.text = window.language.locale == "zh" ? "荷" : "D";
				}
				if(poker_matrix[n] == "T") {
					text.text = window.language.locale == "zh" ? "和" : "T";
				}
				if(poker_matrix[n] == "D"){
						sp.graphics.beginRadialGradientFill(["#d32f2f","#9d2424"], [0, 1], 2, 2, 0, 2, 2, 30).drawCircle(0, 0, 8);
				}
				if(poker_matrix[n] == "T"){
						sp.graphics.beginRadialGradientFill(["#41a257","#41a257"], [0, 1], 2, 2, 0, 2, 2, 30).drawCircle(0, 0, 8);
				}
				this.roadmap_container.addChild(sp, text);
			}
		}
		this.eye.update();
	}
}

class Sicbo extends Roadmap {
	constructor(data,el, evt, ctx) {
		super(data,el, evt, ctx);
	}
	setRoadmap(data) {
		this.roadmap_container.removeAllChildren();

		data = fnFormat().fnFormatSicbo(data.marks, 27, 6).size;

		for(let i = 0; i < data.length; i++) {
		  let size = data[i];
			for(let e = 0; e < size.length; e++) {
				if(size[e] ===  undefined) continue;

				let obj = new createjs.Shape();
				let data_text = new createjs.Text('S', "12px lato-black", '#fff');
				obj.x = (i * 18) + 8;
				obj.y = (e * 17.5) + 8;
				data_text.set({x: obj.x, y : obj.y, textBaseline:'middle',textAlign:'center'});

				obj.graphics.clear().beginFill('#1665c1').drawCircle(0, 0, 7);

				if(size[e] === 'big') {
					obj.graphics.clear().beginFill('#d32f2e').drawCircle(0, 0, 7);
					data_text.text = 'B'
				} else if(size[e] ==='triple') {
					obj.graphics.clear().beginFill('#689f39').drawCircle(0, 0, 7);
					data_text.text = 'T'
				}

				this.roadmap_container.addChild(obj, data_text);
			}
		}

		this.eye.update();
	}
}

class Paigow extends Roadmap {
	constructor(data,el, evt, ctx) {
		super(data,el, evt, ctx);

		this.lines.graphics.clear().ss(1).s('rgba(0,0,0,0.2)');

		let col = 5;
		let row = 4;

		let w = 26, h = 26;

		for(var x = 1; x <=col; x++) {
			this.lines.graphics.moveTo((x*w), 40).lineTo((x*w), (h*row)+40);
		}

		for(var x = 1; x <=row; x++) {
			this.lines.graphics.moveTo(0, (x*h)+40).lineTo((w*col), (x*h)+40);
		}
		this.eye.addChild(this.lines);

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

    var x = 0;
    for(var key in this.routeTiles) {
    	this[key] = new createTileSprite(this.self, 46.2, 60.5, "paigow-small_tiles");
    	this[key].scaleX = this[key].scaleY = 0.65;
    	this[key].gotoAndStop(key);
    	let calcW = this[key].getTransformedBounds().width;
    	let calcH = this[key].getTransformedBounds().height;
    	this[key].x = 210 + (x*(calcW+4)) - 60;
    	this[key].y = 60;

    	let outline = new createjs.Shape();
    	outline.graphics.ss(1).s("#808080").drawRoundRect(0,0,calcW, calcH, 2);
    	outline.x = this[key].x;
    	outline.y = this[key].y;

    	x++;
    	this.eye.addChild(this[key], outline)

    	this[key].areas = [];
    	var tempX = 0;
    	for(var i = 0; i < 4; i++) {
    		this[key].areas[i] = new createjs.Shape();
    		this[key].areas[i].fillCmd = this[key].areas[i].graphics.ss(1).s('#808080').beginFill('#fff').command;
    		this[key].areas[i].graphics.drawCircle(0,0,4);
    		this.eye.addChild(this[key].areas[i]);
    		this[key].areas[i].y = 145 - 30;
    		this[key].areas[i].x = (tempX*14) + this[key].x + 8;
    		tempX ++;
    		if(i >1) {
    			this[key].areas[i].y = 160 - 30;
    		}
    		if(i == 1) {
    			tempX = 0;
    		}
    	}
    }
		this.setGameRoute(data);
	}

	setGameRoute(data) {

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

		let marks = fnFormat().fnPaigowLastRounds(data.marks);

		console.log(marks,"pggg tiles")
    for(let i = 0; i < marks.length; i++) {
      // loop tiles
      for(let area in marks[i].game_info.tiles) {
        let tileData = marks[i].game_info.tiles[area];
        if(tileData[0] != undefined && this.routeTiles['tile-'+tilesModule(tileData[0]).number]){
          this.routeTiles['tile-'+tilesModule(tileData[0]).number].push(tileData[0])
        }
        if(tileData[1] != undefined && this.routeTiles['tile-'+tilesModule(tileData[1]).number]){
          this.routeTiles['tile-'+tilesModule(tileData[1]).number].push(tileData[1])
        }
      } //end
    }

    for(var key in this.routeTiles) {
	  	//reset
	  	this[key].areas[0].fillCmd.style = '#fff';
	  	this[key].areas[1].fillCmd.style = '#fff';
	  	this[key].areas[2].fillCmd.style = '#fff';
	  	this[key].areas[3].fillCmd.style = '#fff';

  		for(var x = 0; x < this.routeTiles[key].length; x++) {
	  		if(this[key].areas[x] !== undefined) {
	  			this[key].areas[x].fillCmd.style = '#808080';
	  		}
  		}
    }
		console.log(this.routeTiles, "gammerouteeeee");

		this.eye.update();
	}

	setRoadmap(data, load) {
		let marks = fnFormat().fnPaigowLastRounds(data.marks);
		marks = fnFormat().fnPaigowRoadMap(marks);

    let playArea = ['banker', 'up', 'down', 'heaven']; // the playArea to be looped
    let playerColor = ['#B61F24', '#EF8F21', '#2764AD', '#009558']; // the highlight color of the winner

    // clear roadmap data container
    this.roadmap_container.removeAllChildren();
    if(load && marks.length >= 5) return;

    //loop data to display
    for (let i=0; i<marks.length; i++) {
      let areas = marks[i].areas;
      for(let j=0; j<areas.length; j++) {
        //draw winning background if winner
        if(areas[j].isWinner) {
          let winBG = new createjs.Shape();
          winBG.graphics.f('#DEC343').drawRect(0,0,26,26);
          winBG.x = i * 26;
          winBG.y = j * 26.25;
          this.roadmap_container.addChild(winBG);
        }
        // draw player circle
        let circle = new createjs.Shape();
        circle.graphics.f(areas[j].color).drawCircle(13,13,13);
        circle.x = (i * 26);
        circle.y = (j * 26.25);
        this.roadmap_container.addChild(circle);
        //if pair add small circle
        if(areas[j].isPair) {
          circle.graphics.setStrokeStyle(0.8).beginStroke('#fff').drawCircle(20+10+5,20+10+5,5);
        }
        // player circle total
        let total = new createjs.Text(areas[j].total, "20px lato-bold","#fff");
        total.set({textAlign:'center', textBaseline:'middle', x:circle.x + 13, y:circle.y + 13});

        // this.getText(circle.x,circle.y, areas[j].total, "20px latobold","#fff","center","middle");
        this.roadmap_container.addChild(total);
      }
    }


		this.eye.update();
	}
	inputitem(data) {
		if(data.type.indexOf('tile') <= -1) return;

		let val1 = data.value[0] === 10 ? 0 : data.value[0];
		let val2 = data.value[1] === 10 ? 0 : data.value[1];
		this.routeTiles[`tile-${val1}`].push(`000${val1}`)
		this.routeTiles[`tile-${val2}`].push(`000${val2}`)

		console.log("data paigow inputitem", data, this.routeTiles)
		for(var key in this.routeTiles) {
	  	//reset
	  	this[key].areas[0].fillCmd.style = '#fff';
	  	this[key].areas[1].fillCmd.style = '#fff';
	  	this[key].areas[2].fillCmd.style = '#fff';
	  	this[key].areas[3].fillCmd.style = '#fff';

  		for(var x = 0; x < this.routeTiles[key].length; x++) {
	  		if(this[key].areas[x] !== undefined) {
	  			this[key].areas[x].fillCmd.style = '#808080';
	  		}
  		}
    }

		this.eye.update();
	}

	newRound(data) {
		let marks = fnFormat().fnPaigowLastRounds(data.marks);
		marks = fnFormat().fnPaigowRoadMap(marks);
		if(!marks.length || marks.length == 5) {
			this.roadmap_container.removeAllChildren();
	    for(var key in this.routeTiles) {
		  	//reset
		  	this[key].areas[0].fillCmd.style = '#fff';
		  	this[key].areas[1].fillCmd.style = '#fff';
		  	this[key].areas[2].fillCmd.style = '#fff';
		  	this[key].areas[3].fillCmd.style = '#fff';
	    }

		}
		this.eye.update();
	}
}

export default {
	Baccarat,
	DragonTiger,
	Poker,
	Sicbo,
	Paigow
}
