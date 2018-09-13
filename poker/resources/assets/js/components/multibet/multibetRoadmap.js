import multibetListen from '../../listeners/multibet-events';
import format from '../../factories/formatter';
import sboard from '../../factories/scoreboard';
import {scoreboard as dboard, baccaratRoadmap as bcRoadmap} from '../../factories/scoreboard_draw';
import drawTables  from './multibetTableDraw';
import cardsModule from '../../factories/cards';

let drawSboard = dboard;

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		games: [],
		data: [],
		selected_games : [],
		main() {

		},
		update (obj, data) {
			for(let i = 0; i < data.length; i++) {
				if(obj.gameName == data[i].data.gameName && (obj.tableId == data[i].data.tableNumber || obj.tableNumber == data[i].data.tableNumber) ) {
						// data[i].marks.push(obj.mark);
						if(obj.gameName == "Sicbo") { this.sicbo_roadmap(i,data) }

						if(obj.gameName == "Baccarat") { this.baccarat_roadmap(i,data) }

						if(obj.gameName == "Dragon-Tiger") { this.dragontiger_roadmap(i,data) }

						if(obj.gameName == "Poker") { this.poker_roadmap(i,data) }

						if(obj.gameName == "Pula-Puti") { this.redWhiteRoadmap(i,data) }
				}
			}
		},
		redWhiteRoadmap (x, obj) {
			let marks = obj[x].data.marks;
			let data = format().fnRedWhiteRoadMap(marks ,6 , 8);

			let container = null;

			if(_.find(this.context.component_multibet.selected_games, (e) => { return e.game == obj[x].data.tableNumber+"_"+obj[x].data.gameName })) {
				let index = _.findIndex(this.context.component_multibet.selected_games, (e) => { return e.game == obj[x].data.tableNumber+"_"+obj[x].data.gameName })
				container = this.context.component_multibet.selected_games[index].road_map_container;
				container.x = 19.5;
				container.y = 54 + 182+ 4;
			} else {
				try {
					container = this.context.component_multibet.games[x].road_map_container;
				} catch(err) {
					return;
				}

				container.x = 19.5;
				container.y = 54+ 4;
			}

			container.removeAllChildren();

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
		  		let spText = new createjs.Text(data[x][i].mark.num, '16px bebasneue',col);
		  		spText.set({textAlign:'center', textBaseline: 'middle'})
		  		sp.graphics.beginFill(bg).ss(1).s(stroke).drawCircle(0,0,8);
		  		sp.set({x:x* (8*2), y : i * (19.5) + 3});
		  		spText.set({x:x* (8*2) , y: i * (19.5) + 3})
		  		container.addChild(sp, spText);
		  	}
	  	}

		},
		
		sicbo_roadmap(x, obj) {

			let marks = obj[x].data.marks;
			let sicbo_data = format().fnFormatSicbo(marks ,7 , 6);
			let sicbo_count = sicbo_data.size;

			let container = null;

			if(_.find(this.context.component_multibet.selected_games, (e) => { return e.game == obj[x].data.tableNumber+"_"+obj[x].data.gameName })) {
				let index = _.findIndex(this.context.component_multibet.selected_games, (e) => { return e.game == obj[x].data.tableNumber+"_"+obj[x].data.gameName })
				container = this.context.component_multibet.selected_games[index].road_map_container;
				container.x = 19.5;
				container.y = 51 + 182 + 4;
			} else {
				try {
					container = this.context.component_multibet.games[x].road_map_container;
				} catch(err) {
					return;
				}

				container.x = 19.5;
				container.y = 51+ 4;
			}

			container.removeAllChildren();

			for(let c = 0; c < sicbo_count.length; c++) {
			   let size = sicbo_count[c];

				 for(let n = 0; n < size.length; n++) {
						let data = new createjs.Shape();
						let data_text;
						data.x = c * 19;
						data.y = n * 19.2;
						if(size[n] !=  undefined) {
							 data.graphics.beginRadialGradientFill(["#ffffff","#ffffff"], [0, 1], 2, 2, 0, 2, 2, 30).drawCircle(0, 7, 8.5);

					 	}

					 	if(size[n] == "small") {
							 data_text = new createjs.Text(window.language.locale == "zh" ? "小" : "S", window.language.locale == "zh" ? "12px Arial" : "bold 12px Arial", "#ffffff");
							 data_text.set({ textAlign: 'center' });
							 data.graphics.beginRadialGradientFill(["#1565c0","#175296"], [0, 1], 2, 2, 0, 2, 2, 30).drawCircle(0, 7, 8.5);
							 data_text.x = c * 19;
	 						 data_text.y = n * 19.2;
					 	}

					 	if(size[n] == "triple") {
							 data_text = new createjs.Text(window.language.locale == "zh" ? "和" : "T", window.language.locale == "zh" ? "12px Arial" : "bold 12px Arial", "#ffffff");
							 data_text.set({ textAlign: 'center' });
							 data.graphics.beginRadialGradientFill(["#41a257","#2d703c"], [0, 1], 2, 2, 0, 2, 2, 30).drawCircle(0, 7, 8.5);
							 data_text.x = c * 19;
	 						 data_text.y = n * 19.2;
					 	}

					 	if(size[n] == "big") {
							 data_text = new createjs.Text(window.language.locale == "zh" ? "大" : "B", window.language.locale == "zh" ? "12px Arial" : "bold 12px Arial", "#ffffff");
							 data_text.set({ textAlign: 'center' });
							 data.graphics.beginRadialGradientFill(["#d32f2f","#9d2424"], [0, 1], 2, 2, 0, 2, 2, 30).drawCircle(0, 7, 9);
							 data_text.x = c * 19;
	 						 data_text.y = n * 19.2;
					 	}

						container.addChild(data, data_text);

				 }
			}

		},

		poker_roadmap (x, obj) {
			let marks = obj[x].data.marks;
			let poker_data = format().fnFormatPokerRoadMap(marks, 6, 7);

			let container = null;

			if(_.find(this.context.component_multibet.selected_games, (e) => { return e.game == obj[x].data.tableNumber+"_"+obj[x].data.gameName })) {
				let index = _.findIndex(this.context.component_multibet.selected_games, (e) => { return e.game == obj[x].data.tableNumber+"_"+obj[x].data.gameName })
				container = this.context.component_multibet.selected_games[index].road_map_container;

			} else {
				container = this.context.component_multibet.games[x].road_map_container;
			}

			container.x = 19.5;
			container.y = 49+ 4;

			container.removeAllChildren();

			for(let c = 0; c < poker_data.length; c++ ) {
				let poker_matrix = poker_data[c];

				for(let n = 0; n < poker_matrix.length; n++ ) {
					
					if(poker_matrix[n] == undefined) continue;

					let shape_poker = new createjs.Shape();
					shape_poker.y = (n * 19) + 2.3;
					shape_poker.x = (c * 19);

					let text_poker;

					if(poker_matrix[n] == "P") {
						text_poker = new createjs.Text(window.language.locale == "zh" ? "闲" : "P", window.language.locale == "zh" ? "12px Arial" : "bold 12px Arial", "#ffffff");
					}

					if(poker_matrix[n] == "D") {
						text_poker = new createjs.Text(window.language.locale == "zh" ? "荷" : "D", window.language.locale == "zh" ? "12px Arial" : "bold 12px Arial", "#ffffff");
					}

					if(poker_matrix[n] == "T") {
						text_poker = new createjs.Text(window.language.locale == "zh" ? '和' : 'T', window.language.locale == "zh" ? "12px Arial" : "bold 12px Arial", "#ffffff");
					}

					text_poker.set({ textAlign: 'center' });
					text_poker.y = (n * 19) + 2.3;
					text_poker.x = c * 19;

					if(poker_matrix[n] == "P"){
						shape_poker.graphics.beginRadialGradientFill(["#1565c0","#175296"], [0, 1], 2, 2, 0, 2, 2, 30).drawCircle(0, 7, 9);
					}

					if(poker_matrix[n] == "D"){
							shape_poker.graphics.beginRadialGradientFill(["#d32f2f","#9d2424"], [0, 1], 2, 2, 0, 2, 2, 30).drawCircle(0, 7, 9);
					}

					if(poker_matrix[n] == "T"){
							shape_poker.graphics.beginRadialGradientFill(["#41a257","#41a257"], [0, 1], 2, 2, 0, 2, 2, 30).drawCircle(0, 7, 9);
					}

					container.addChild(shape_poker, text_poker);
				}
			}
		},
		predictMarks (game, type) {
			let clone_marks = _.clone(game.data.marks);
			clone_marks.push({mark : type});
			// if(game.data.gameName == "Baccarat") {
				if(type == "b" || type == "z") {
					for(var a = 4; a < game.pred_bg_banker.children.length; a++ ) {
						createjs.Tween.get(game.pred_bg_banker.children[a])
							.to({ alpha : 1 },200)
							.to({ alpha : 0 },200)
							.to({ alpha : 1 },200)
							.to({ alpha : 0 },200)
							.to({ alpha : 1 },200)
						}
				} else {
					for(var a = 4; a < game.pred_bg_player.children.length; a++ ) {
						createjs.Tween.get(game.pred_bg_player.children[a])
						.to({ alpha : 1 },200)
						.to({ alpha : 0 },200)
						.to({ alpha : 1 },200)
						.to({ alpha : 0 },200)
						.to({ alpha : 1 },200)
					}
				}
				this.generatePredictedMarks(game, clone_marks)	
				setTimeout(() => {
					this.generatePredictedMarks(game, game.data.marks)	
				},2500)	
			// }
		},
		generatePredictedMarks (game, marks) {
			let baccarat_data = null;
      let baccarat_matrix = null;

			let dragontiger_matrix = null;

     	if(game.data.gameName == "Dragon-Tiger") {
				baccarat_data = format().fnFormatDTBigRoad(marks, 6, 8);
      	dragontiger_matrix = baccarat_data.matrix;

      } else {
				baccarat_data = format().fnFormatBCBigRoad(marks, 6, 8);
      	baccarat_matrix = baccarat_data.matrix;      			
      }

			let container = game.road_map_container;

			container.removeAllChildren();

			if(game.data.gameName == "Baccarat") {
				for(var i = 0; i < baccarat_matrix.length; i++) {
      		for(var e = 0; e < baccarat_matrix[i].length; e++) {
      			if(baccarat_matrix[i][e] === undefined) continue;
		      		let  image_sprite = new Image();
      				image_sprite.src = "/img/image-roadmap/all_scoreboard.png";

      				let sp = sboard().createSpriteRoadMap(this.context.getResources("all_scoreboard") , 40,40, sp) //sboard().createSpriteRoadMap(image_sprite , 40,40, sp);
      				sp.x = e * 19;
      				sp.y = i * 19.2;
      				sp.scaleX = sp.scaleY = .5;

      				let tie_text;

        		if(baccarat_matrix[i][e].ties) {
							if(baccarat_matrix[i][e].ties > 1) {
	              tie_text = new createjs.Text(baccarat_matrix[i][e].ties, "bold 16px BebasNeue","#000");
            		tie_text.y = sp.y + (24/2);
            		tie_text.x = sp.x  + (24/2) - 2.5;
            		tie_text.textAlign = "center";
	              tie_text.textBaseline = "middle";
								container.addChild(tie_text);
           		}
           		sp.gotoAndStop("big-"+baccarat_matrix[i][e].mark+"-t");
       			} else {
							sp.gotoAndStop("big-"+baccarat_matrix[i][e].mark);
						}

						container.addChild(sp, tie_text);

						if((i) == baccarat_data.row) {
							if(baccarat_matrix[0][e+1] === undefined) {
								sp.last_child = true
							}
						} //end if
		    	} //end for
		 		}// end for
			} else {

				for(var i = 0; i < dragontiger_matrix.length; i++) {
					for(var e = 0; e < dragontiger_matrix[i].length; e++) {
						if(dragontiger_matrix[i][e] === undefined)  { continue; }
						if(dragontiger_matrix[i][e].mark === undefined)  { continue; }

						 	let sp = drawSboard("bigroad")[dragontiger_matrix[i][e].mark];
						 	sp.x = e * 19;
						 	sp.y = i * 19.2;
						 	sp.scaleX = sp.scaleY = .7;

						 	// container.x = 8;
						 	// container.y = 34+ 4;

						 	let tie_text;

						 	if(dragontiger_matrix[i][e].ties) {
								if(dragontiger_matrix[i][e].ties > 1) {
									tie_text = new createjs.Text(dragontiger_matrix[i][e].ties, "bold 16px BebasNeue","#000");
									tie_text.y = sp.y + (24/2) + 2;
									tie_text.x = sp.x  + (24/2) + 2;
									tie_text.textAlign = "center";
									tie_text.textBaseline = "middle";
								}
								sp.children[sp.children.length-1].visible = true;

								if(dragontiger_matrix[i][e].suited_tie) {
									sp.children[sp.children.length-1].graphics.clear().beginFill("#ff9800").drawRect(0,0,3,30);
								}
							}
						container.addChild(sp, tie_text);

						if((i) == baccarat_data.row) {
							if(dragontiger_matrix[0][e+1] == undefined ) {
								sp.last_child = true
							}
						}
					}
				}
			}

	    container.children.forEach((e) => {
	    	if(e.last_child) {
					createjs.Tween.get(e).wait(100)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
				}
	    });

		},
		baccarat_roadmap (x, obj, miscData) {

			let marks = obj[x].data.marks;
			let baccarat_data;

			if(miscData) {
				baccarat_data = format().fnFormatBCBigRoadSpecial(marks, 6, 10, miscData);
			} else {
				baccarat_data = format().fnFormatBCBigRoad(marks, 6, 10);
			}

			let baccarat_matrix = baccarat_data.matrix;

      let container = null;

			if(_.find(this.context.component_multibet.selected_games, (e) => { return e.game == obj[x].data.tableNumber+"_"+obj[x].data.gameName })) {
				let index = _.findIndex(this.context.component_multibet.selected_games, (e) => { return e.game == obj[x].data.tableNumber+"_"+obj[x].data.gameName })
				container = this.context.component_multibet.selected_games[index].road_map_container;

			} else {
				container = this.context.component_multibet.games[x].road_map_container;
			}

			container.x = 9.5;
			container.y = 48+ 4;

			container.removeAllChildren();

			for(var i = 0; i < baccarat_matrix.length; i++) {
	      for(var e = 0; e < baccarat_matrix[i].length; e++) {
	      	if(baccarat_matrix[i][e] === undefined)  { continue; }
			    let sp = null;
					var roadmap = new bcRoadmap(7, 3);
					roadmap.play('big-'+baccarat_matrix[i][e].mark.toLowerCase(), null, 2.5);
					roadmap.ties(baccarat_matrix[i][e].ties);
					sp = roadmap.instance;
					sp.x = (e * 19)+2.4;
					sp.y = (i * 19)+3;

					container.addChild(sp);
					
					if((i) == baccarat_data.row) {
						if(baccarat_matrix[0][e+1] === undefined) {
							sp.last_child = true
						}
					}
	      }

	    }

	    container.children.forEach((e) => {
	    	if(e.last_child) {
					createjs.Tween.get(e).wait(100)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
				}
	    });
		},

		dragontiger_roadmap (x, obj) {
			let marks = obj[x].data.marks;
		 	let dragontiger_data = format().fnFormatDTBigRoad(marks, 6, 10);
			let dragontiger_matrix = dragontiger_data.matrix;

			let container = null;

			if(_.find(this.context.component_multibet.selected_games, (e) => { return e.game == obj[x].data.tableNumber+"_"+obj[x].data.gameName })) {
				let index = _.findIndex(this.context.component_multibet.selected_games, (e) => { return e.game == obj[x].data.tableNumber+"_"+obj[x].data.gameName })
				container = this.context.component_multibet.selected_games[index].road_map_container;

			} else {
				container = this.context.component_multibet.games[x].road_map_container;
			}

			container.removeAllChildren();

		 	for(var i = 0; i < dragontiger_matrix.length; i++) {
				for(var e = 0; e < dragontiger_matrix[i].length; e++) {
					if(dragontiger_matrix[i][e] === undefined)  { continue; }
					if(dragontiger_matrix[i][e].mark === undefined)  { continue; }

					 	let sp = drawSboard("bigroad")[dragontiger_matrix[i][e].mark];
					 	sp.x = e * 19;
					 	sp.y = i * 19.2;
					 	sp.scaleX = sp.scaleY = .7;

					 	container.x = 8;
					 	container.y = 47+ 4;

					 	let tie_text;

					 	if(dragontiger_matrix[i][e].ties) {
							if(dragontiger_matrix[i][e].ties > 1) {
									tie_text = new createjs.Text(dragontiger_matrix[i][e].ties, "bold 16px BebasNeue","#000");
									tie_text.y = sp.y + (24/2) + 2;
									tie_text.x = sp.x  + (24/2) + 2;
									tie_text.textAlign = "center";
									tie_text.textBaseline = "middle";
							}
							sp.children[sp.children.length-1].visible = true;

							if(dragontiger_matrix[i][e].suited_tie) {
								sp.children[sp.children.length-1].graphics.clear().beginFill("#ff9800").drawRect(0,0,3,30);
							}
						}
					container.addChild(sp, tie_text);

					if((i) == dragontiger_data.row) {
						if(dragontiger_matrix[0][e+1] === undefined) {
							sp.last_child = true
						}
					} // end if

				}
			}

	    container.children.forEach((e) => {
	    	if(e.last_child) {
					createjs.Tween.get(e).wait(100)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
				}
	    });

		}

	});

	return instance;
}
