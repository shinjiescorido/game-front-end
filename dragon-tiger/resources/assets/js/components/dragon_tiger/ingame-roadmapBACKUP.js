let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
			let cellW = 29.45; //temp size
			let roadMapW = cellW*23;
			let roadMapH = 190;
			let cellH = roadMapH / 6;

			let beadRoadMapColumns = 9; let roadMapColumns = 28;
			//------ width/height, columns/rows


			this.y = this.context.stage.baseHeight - this.context.component_gameInfo.getBounds().height;
			this.x = 220;


			this.roadMap_bg = new createjs.Shape();
			this.roadMap_bg.graphics.beginFill("#fff").drawRect(0,0,roadMapW, roadMapH);
			this.roadMap_container = [];
			this.roadMap_container["bead_road"] = new createjs.Container();
			this.roadMap_container["bead_road"].x = 0; this.roadMap_container["bead_road"].y = 0;
			this.roadMap_container["big_road"] = new createjs.Container();
			this.roadMap_container["big_road"].x = cellW * beadRoadMapColumns; this.roadMap_container["big_road"].y = 0;
			this.roadMap_container["big_eye_road"] = new createjs.Container();
			this.roadMap_container["big_eye_road"].x = cellW * beadRoadMapColumns; this.roadMap_container["big_eye_road"].y = roadMapH * 0.5;
			this.roadMap_container["small_road"] = new createjs.Container();
			this.roadMap_container["small_road"].x = cellW * beadRoadMapColumns; this.roadMap_container["small_road"].y = roadMapH * 0.75;
			this.roadMap_container["cockroach_road"] = new createjs.Container();
			this.roadMap_container["cockroach_road"].x = cellW * (beadRoadMapColumns + 7); this.roadMap_container["cockroach_road"].y = roadMapH * 0.75;



			this.prediction_con = new createjs.Container();
			this.prediction_con.x = roadMapW; this.prediction_con.y = 0;

			this.pred_b_bg = new createjs.Shape;
			this.pred_b_bg.graphics.beginStroke("#999").beginFill("#e6e6e6").drawRect(0, 0, cellW, cellH * 4.5);
			this.pred_r_bg = new createjs.Shape;
			this.pred_r_bg.graphics.beginStroke("#999").beginFill("#e6e6e6").drawRect(cellW, 0, cellW, cellH * 4.5);
			this.pred_oddeven_bg = new createjs.Shape();
			this.pred_oddeven_bg.graphics.beginStroke("#999").beginFill("#e6e6e6").drawRect(0, cellH * 4.5, cellW*2, cellH * 1.5);
			//------ background shapes, --- containers



      this.beadRoad_grid = this.drawRoadMap(9, 6, cellW, cellH, 0, 0, this.roadMap_container["bead_road"]);
			this.bigRoad_grid = this.drawRoadMap(28, 6, cellW / 2, cellH / 2, cellW * beadRoadMapColumns, 0, this.roadMap_container["big_road"]);
      this.bigeyeRoad_grid = this.drawRoadMap(28, 3, cellW / 2, cellH / 2, cellW * beadRoadMapColumns, cellH * 3, this.roadMap_container["big_eye_road"]);
      this.smallRoad_grid = this.drawRoadMap(14, 3, cellW / 2, cellH / 2, cellW * beadRoadMapColumns, cellH * 4.5, this.roadMap_container["small_road"]);
      this.cockroachRoad_grid = this.drawRoadMap(14, 3, cellW / 2, cellH / 2, cellW * (beadRoadMapColumns + 7), cellH * 4.5, this.roadMap_container["cockroach_road"]);
				//------ drawRoadMap(columns, rows, width, height, x position, y position)


			this.roadMap_SpriteSheets = [];
			this.roadMap_SpriteSheets["bead_road_dragon"] = new createjs.SpriteSheet({
				images: [this.context.getResources("bead_road_dragon")],
				frames: {width:this.context.getResources("bead_road_dragon").width / 13, height:this.context.getResources("bead_road_dragon").height},
				animations: {
					"f1": 0, "f2": 1, "f3": 2, "f4": 3, "f5": 4, "f6": 5, "f7": 6, "f8": 7, "f9": 8, "f10": 9, "f11": 10, "f12": 11, "f13": 12
				}
			});
			this.roadMap_SpriteSheets["bead_road_tiger"] = new createjs.SpriteSheet({
				images: [this.context.getResources("bead_road_tiger")],
				frames: {width:this.context.getResources("bead_road_tiger").width / 13, height:this.context.getResources("bead_road_tiger").height},
				animations: {
					"f1": 0, "f2": 1, "f3": 2, "f4": 3, "f5": 4, "f6": 5, "f7": 6, "f8": 7, "f9": 8, "f10": 9, "f11": 10, "f12": 11, "f13": 12
				}
			});
			this.roadMap_SpriteSheets["bead_road_tie"] = new createjs.SpriteSheet({
				images: [this.context.getResources("bead_road_tie")],
				frames: {width:this.context.getResources("bead_road_tie").width / 13, height:this.context.getResources("bead_road_tie").height},
				animations: {
					"f1": 0, "f2": 1, "f3": 2, "f4": 3, "f5": 4, "f6": 5, "f7": 6, "f8": 7, "f9": 8, "f10": 9, "f11": 10, "f12": 11, "f13": 12
				}
			});
			this.roadMap_SpriteSheets["bead_road_oddeven"] = new createjs.SpriteSheet({
				images: [this.context.getResources("bead_road_oddeven")],
				frames: {width:this.context.getResources("bead_road_oddeven").width / 6, height:this.context.getResources("bead_road_oddeven").height},
				animations: {
					"dragon-even": 0,
					"dragon-odd": 1,
					"tiger-even": 2,
					"tiger-odd": 3,
					"tie-even": 4,
					"tie-odd": 5
				}
			});
			this.roadMap_SpriteSheets["big_road"] = new createjs.SpriteSheet({
				images: [this.context.getResources("big_road")],
				frames: { width: this.context.getResources("big_road").width / 13, height: this.context.getResources("big_road").height },
				animations: {
					"tiger-big-big": 0,
					"tiger-small-big": 1,
					"tiger-small-small": 2,
					"tiger-tie-big-big": 3,
					"tiger-tie-small-big": 4,
					"tiger-tie-small-small": 5,
					"dragon-big-big": 6,
					"dragon-big-small": 7,
					"dragon-small-small": 8,
					"dragon-tie-big-big": 9,
					"dragon-tie-big-small": 10,
					"dragon-tie-small-small": 11,
					"tie-first-round": 12
				}

			});
			this.roadMap_SpriteSheets["road_marks"] = new createjs.SpriteSheet({
				images: [this.context.getResources("road_marks")],
				frames: { width: this.context.getResources("road_marks").width / 6, height: this.context.getResources("road_marks").height },
				animations: {
					"big_eye_road-blue": 0,
					"big_eye_road-red": 1,
					"small_road-blue": 2,
					"small_road-red": 3,
					"cockroach_road-blue": 4,
					"cockroach_road-red": 5
				}

			});
			//------ roadmap spritesheets


			// let prediction_icons = new createjs.SpriteSheet({
			// 	images: [this.context.getResources("prediction")],
			// 	frames: { width: this.context.getResources("prediction").width / 8, height: this.context.getResources("prediction").height },
			// 	animations: {
			// 		"d": 0, "t": 1, "dhc": 2, "thc": 3, "dfc": 4, "tfc": 5, "dslash": 6, "tslash": 7
			// 	}
			// });
			// let pred_scaleXY = (cellSize - 8) / this.context.getResources("prediction").height;

			// let pred_b = new createjs.Sprite(prediction_icons, "d");
			// 	pred_b.scaleX = pred_b.scaleY = pred_scaleXY;
			// 	pred_b.x = roadMapW + 4; pred_b.y = 4;

			// let pred_r = new createjs.Sprite(prediction_icons, "t");
			// 	pred_r.scaleX = pred_r.scaleY = pred_scaleXY;
			// 	pred_r.x = roadMapW + cellSize + 4; pred_r.y = 4;

			// let pred_bhc = new createjs.Sprite(prediction_icons, "dhc");
			// 	pred_bhc.scaleX = pred_bhc.scaleY = pred_scaleXY;
			// 	pred_bhc.x = roadMapW + 4; pred_bhc.y = cellSize * (3.5/3) + 4;

			// let pred_rhc = new createjs.Sprite(prediction_icons, "thc");
			// 	pred_rhc.scaleX = pred_rhc.scaleY = pred_scaleXY;
			// 	pred_rhc.x = roadMapW + cellSize + 4; pred_rhc.y = cellSize * (3.5/3) + 4;

			// let pred_bfc = new createjs.Sprite(prediction_icons, "dfc");
			// 	pred_bfc.scaleX = pred_bfc.scaleY = pred_scaleXY;
			// 	pred_bfc.x = roadMapW + 4; pred_bfc.y = (cellSize * (3.5/3) * 2) + 4

			// let pred_rfc = new createjs.Sprite(prediction_icons, "tfc");
			// 	pred_rfc.scaleX = pred_rfc.scaleY = pred_scaleXY;
			// 	pred_rfc.x = roadMapW + cellSize + 4; pred_rfc.y = (cellSize * (3.5/3) * 2) + 4;

			// let pred_bslash = new createjs.Sprite(prediction_icons, "dslash");
			// 	pred_bslash.scaleX = pred_bslash.scaleY = pred_scaleXY;
			// 	pred_bslash.x = roadMapW + 4; pred_bslash.y = (cellSize * (3.5/3) * 3) + 4;

			// let pred_rslash = new createjs.Sprite(prediction_icons, "tslash");
			// 	pred_rslash.scaleX = pred_rslash.scaleY = pred_scaleXY;
			// 	pred_rslash.x = roadMapW + cellSize + 4; pred_rslash.y = (cellSize * (3.5/3) * 3) + 4;
			//------ prediction portion using sprites



			// dragon color: #1565c0; tiger color: #d32f2f; tie color: #689f38

			let pred_b = new createjs.Shape();
			pred_b.graphics.beginFill("#1565c0").drawCircle(cellW/2, cellH/2, cellW/2 - 4);
			pred_b.x = 0; pred_b.y = 0;
			let pred_b_text = new createjs.Text("D", "15px Calibri", "#fff");
			pred_b_text.textAlign = "center"; pred_b_text.textBaseline = "middle";
			pred_b_text.x = cellW * 0.48; pred_b_text.y = cellH/2;

			let pred_r = new createjs.Shape();
			pred_r.graphics.beginFill("#d32f2f").drawCircle(cellW/2, cellH/2, cellW/2 - 4);
			pred_r.x = cellW; pred_r.y = 0;
			let pred_r_text = new createjs.Text("T", "15px Calibri", "#fff");
			pred_r_text.textAlign = "center"; pred_r_text.textBaseline = "middle";
			pred_r_text.x = cellW * 1.48; pred_r_text.y = cellH/2;

			let pred_bhc = new createjs.Shape();
			pred_bhc.graphics.setStrokeStyle(3).beginStroke("#1565c0").drawCircle(cellW/2, cellH/2, cellW/2 - 6);
			pred_bhc.x = 0; pred_bhc.y = cellH * (3.5/3);

			let pred_rhc = new createjs.Shape();
			pred_rhc.graphics.setStrokeStyle(3).beginStroke("#d32f2f").drawCircle(cellW/2, cellH/2, cellW/2 - 6);
			pred_rhc.x = cellW; pred_rhc.y = cellH * (3.5/3);

			let pred_bfc = new createjs.Shape();
			pred_bfc.graphics.beginFill("#1565c0").drawCircle(cellW/2, cellH/2, cellW/2 - 4);
			pred_bfc.x = 0; pred_bfc.y = cellH * (3.5/3) * 2;

			let pred_rfc = new createjs.Shape();
			pred_rfc.graphics.beginFill("#d32f2f").drawCircle(cellW/2, cellH/2, cellW/2 - 4);
			pred_rfc.x = cellW; pred_rfc.y = cellH * (3.5/3) * 2;

			let pred_bslash = new createjs.Shape();
			pred_bslash.graphics.setStrokeStyle(3, "round").beginStroke("#1565c0").moveTo(8 , cellH - 8).lineTo(cellW - 8, 8);
			pred_bslash.x = 0; pred_bslash.y = cellH * (3.5/3) * 3;

			let pred_rslash = new createjs.Shape();
			pred_rslash.graphics.setStrokeStyle(3, "round").beginStroke("#d32f2f").moveTo(8 , cellH - 8).lineTo(cellW - 8, 8);
			pred_rslash.x = cellW; pred_rslash.y = cellH * (3.5/3) * 3;

			let pred_even = new createjs.Shape();
			pred_even.graphics.setStrokeStyle(1).beginStroke("#1565c0").beginFill("#fff").drawCircle(cellW/2, cellH/2, cellW/2 - 4);
			pred_even.x = 0; pred_even.y = cellH * 4.75;
			let pred_even_text = new createjs.Text("E", "15px Calibri", "#1565c0");
			pred_even_text.textAlign = "center"; pred_even_text.textBaseline = "middle";
			pred_even_text.x =  cellW * 0.48;  pred_even_text.y = cellH * 5.23;

			let pred_odd = new createjs.Shape();
			pred_odd.graphics.setStrokeStyle(1).beginStroke("#d32f2f").beginFill("#fff").drawCircle(cellW/2, cellH/2, cellW/2 - 4);
			pred_odd.x = cellW; pred_odd.y = cellH * 4.75;
			let pred_odd_text = new createjs.Text("O", "15px Calibri", "#d32f2f");
			pred_odd_text.textAlign = "center"; pred_odd_text.textBaseline = "middle";
			pred_odd_text.x =  cellW * 1.48;  pred_odd_text.y = cellH * 5.23;

			this.prediction_con.addChild(this.pred_b_bg, this.pred_r_bg, this.pred_oddeven_bg);
			this.prediction_con.addChild(pred_b, pred_b_text, pred_r, pred_r_text, pred_bhc, pred_rhc, pred_bfc, pred_rfc, pred_bslash, pred_rslash,
				pred_even, pred_even_text, pred_odd, pred_odd_text);
			//------ prediction buttons


			this.addChild(this.roadMap_bg);
			this.addChild(this.roadMap_container["bead_road"], this.roadMap_container["big_road"], this.roadMap_container["big_eye_road"], this.roadMap_container["small_road"], this.roadMap_container["cockroach_road"], this.prediction_con);
			this.addChild(this.beadRoad_grid, this.bigRoad_grid, this.bigeyeRoad_grid, this.smallRoad_grid, this.cockroachRoad_grid);
			//------ add children to stage



		 	let data = [];
			//------ test data, sprites/images only
			let result = [
        { // 4
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
        { // 5
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
        { // 4
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
        { // 5
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
        { // 4
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
        { // 5
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
        { // 5
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
       	{ // 6
	        winner: "tiger",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
       	{ // 7
	        winner: "tiger",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
       	{ // 8
	        winner: "tiger",	winnerTotal: "6",	winnerOddEven: "even",	dragonBigSmall: "small",	tigerBigSmall: "small"	},
       	{ // 9
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
       	{ // 10
	        winner: "tiger",	winnerTotal: "6",	winnerOddEven: "even",	dragonBigSmall: "small",	tigerBigSmall: "small"	},
       	{ // 11
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
       	{ // 12
	        winner: "dragon",	winnerTotal: "6",	winnerOddEven: "even",	dragonBigSmall: "small",	tigerBigSmall: "small"	},
       	{ // 13
	        winner: "dragon",	winnerTotal: "6",	winnerOddEven: "even",	dragonBigSmall: "small",	tigerBigSmall: "small"	},
       	{ // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
        { // 15
	        winner: "tie",	winnerTotal: "6",	winnerOddEven: "even",	dragonBigSmall: "small",	tigerBigSmall: "small"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tiger",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tie",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tie",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tie",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tiger",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tiger",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tiger",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tiger",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tiger",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 14
	        winner: "tie",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
	      { // 14
	        winner: "tie",	winnerTotal: "4",	winnerOddEven: "even",	dragonBigSmall: "small",	tigerBigSmall: "small"	},
	      { // 4
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
        { // 5
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
        { // 4
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
        { // 5
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
        { // 4
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
        { // 5
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
        { // 5
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
       	{ // 6
	        winner: "tiger",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
       	{ // 7
	        winner: "tiger",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
       	{ // 8
	        winner: "tiger",	winnerTotal: "6",	winnerOddEven: "even",	dragonBigSmall: "small",	tigerBigSmall: "small"	},
       	{ // 9
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
       	{ // 10
	        winner: "tiger",	winnerTotal: "6",	winnerOddEven: "even",	dragonBigSmall: "small",	tigerBigSmall: "small"	},
       	{ // 11
          winner: "dragon",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
       	{ // 12
	        winner: "dragon",	winnerTotal: "6",	winnerOddEven: "even",	dragonBigSmall: "small",	tigerBigSmall: "small"	},
       	{ // 13
	        winner: "dragon",	winnerTotal: "6",	winnerOddEven: "even",	dragonBigSmall: "small",	tigerBigSmall: "small"	},
       	{ // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
        { // 15
	        winner: "tie",	winnerTotal: "6",	winnerOddEven: "even",	dragonBigSmall: "small",	tigerBigSmall: "small"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tiger",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tie",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tie",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tie",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tiger",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tiger",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tiger",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tiger",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 6
	        winner: "tiger",	winnerTotal: "8",	winnerOddEven: "even",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 14
	        winner: "tie",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "big"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
	      { // 14
	        winner: "dragon",	winnerTotal: "11",	winnerOddEven: "odd",	dragonBigSmall: "big",	tigerBigSmall: "small"	},
	      { // 14
	        winner: "tie",	winnerTotal: "4",	winnerOddEven: "even",	dragonBigSmall: "small",	tigerBigSmall: "small"	},

      ];
      //------ test results
      data = this.dataForRoadmap(result, "bead_road");
      this.writeOnRoadMap(data, cellW, cellH, this.context.getResources("bead_road_dragon").height, "bead_road");

      data = this.dataForRoadmap(result, "big_road");
      this.writeOnRoadMap(data, cellW, cellH, this.context.getResources("big_road").height, "big_road");

      let big_road_data = this.dataForDerivedRoads(result);
      data = this.dataForRoadmap(big_road_data, "big_eye_road");
      this.writeOnRoadMap(data, cellW, cellH, this.context.getResources("road_marks").height, "big_eye_road");

      data = this.dataForRoadmap(big_road_data, "small_road");
      this.writeOnRoadMap(data, cellW, cellH, this.context.getResources("road_marks").height, "small_road");

      data = this.dataForRoadmap(big_road_data, "cockroach_road");
      this.writeOnRoadMap(data, cellW, cellH, this.context.getResources("road_marks").height, "cockroach_road");
      //------ display test results


			//------
  			this.pred_b_bg.addEventListener("mouseover", (e) => {
				e.target.graphics.clear().beginStroke("#999").beginFill("#fff").drawRect(0, 0, cellW, cellH * 4.5);
				pred_bhc.alpha = 0.5; pred_bfc.alpha = 0.5; pred_bslash.alpha = 0.5;
			});
			this.pred_b_bg.addEventListener("mouseout", (e) => {
				e.target.graphics.clear().beginStroke("#999").beginFill("#e6e6e6").drawRect(0, 0, cellW, cellH * 4.5);
				pred_bhc.alpha = 1; pred_bfc.alpha = 1; pred_bslash.alpha = 1;
			});

			this.pred_r_bg.addEventListener("mouseover", (e) => {
				e.target.graphics.clear().beginStroke("#999").beginFill("#fff").drawRect(cellW, 0, cellW, cellH * 4.5);
				pred_rhc.alpha = 0.5; pred_rfc.alpha = 0.5; pred_rslash.alpha = 0.5;
			});
			this.pred_r_bg.addEventListener("mouseout", (e) => {
				e.target.graphics.clear().beginStroke("#999").beginFill("#e6e6e6").drawRect(cellW, 0, cellW, cellH * 4.5);
				pred_rhc.alpha = 1; pred_rfc.alpha = 1; pred_rslash.alpha = 1;
			});

			this.pred_oddeven_bg.addEventListener("mouseover", (e) => {
				e.target.graphics.clear().beginStroke("#999").beginFill("#fff").drawRect(0, cellH * 4.5, cellW*2, cellH * 1.5);
			});
			this.pred_oddeven_bg.addEventListener("mouseout", (e) => {
				e.target.graphics.clear().beginStroke("#999").beginFill("#e6e6e6").drawRect(0, cellH * 4.5, cellW*2, cellH * 1.5);
			});


			let toggleOddEven = false;

			this.pred_oddeven_bg.addEventListener("click", (e) => {
				if(!toggleOddEven) {
					toggleOddEven = true;
					data = this.dataForRoadmap(result, "bead_road-OE");
					this.clearRoadMapIcons("bead_road");
					this.writeOnRoadMap(data, cellW, cellH, this.context.getResources("bead_road_oddeven").height, "bead_road");
					//----
				} else {
					toggleOddEven = false;
					data = this.dataForRoadmap(result, "bead_road");
					this.clearRoadMapIcons("bead_road");
					this.writeOnRoadMap(data, cellW, cellH, this.context.getResources("bead_road_dragon").height, "bead_road");
					//----
				}
			});
			//------ prediction mouse event listeners


		},

		drawRoadMap(col, row, w, h, x, y, roadCon) { // width, height, at X, at Y
      w = w * col;
      h = h * row;
      let gridlines = new createjs.Shape();
			gridlines.graphics.setStrokeStyle(1, "round").beginStroke("#ccc");
			for (let i = 0; i <= col-1; i++) {
				gridlines.graphics.moveTo((w / col) * i + x, y).lineTo((w / col) * i + x, y + h);
			}
			for (let i = 0; i <= row-1; i++) {
				gridlines.graphics.moveTo(x, (h / row) * i + y).lineTo(w + x, (h / row) * i + y);
			} // draw grid lines

      gridlines.graphics.beginStroke("#999").moveTo(x, y).lineTo(x, y + h).lineTo(x + w, y + h).lineTo(x + w, y).lineTo(x, y);

      let roadMap_mask = new createjs.Shape();
      roadMap_mask.graphics.drawRect(x, y, w, h);
      roadCon.mask = roadMap_mask;
      //------ mask to hide container overflow

      return gridlines;
		},


		writeOnRoadMap(data, cellW, cellH, iconWH, road) {
      let rows = 6;
      let cellPadding
      let iconScale;
      let cols;
      let colShift;
			let roadCon = this.roadMap_container[road];

			switch(road) {
				case "bead_road":
					cellPadding = 2;
          iconScale = 1;
          cols = 9;
          colShift = 4;
					break;
        case "big_road":
          cellPadding = 1;
          iconScale = 0.5;
          cols = 14;
          colShift = 4;
          break;
				case "big_eye_road":
					cellPadding = 1;
          iconScale = 0.25;
          cols = 28;
          colShift = 6;
          break;
				case "small_road": case "cockroach_road":
					cellPadding = 1;
          iconScale = 0.25;
          cols = 14;
          colShift = 6;
          break;
			}

      iconWH = (cellW - cellPadding * 2) / iconWH * iconScale;

      let r_cellW = iconScale * cellW;
      let r_cellH = iconScale * cellH;


			for(let i = 0; i <= data.length - 1; i++) {
				let x = r_cellW * i + cellPadding;
				for(let j = 0; j <= data[i].length - 1; j++) {
					//---
					let y = r_cellH * (j % rows) + (r_cellH - r_cellW) + cellPadding;

					if(data[i][j]) {
						data[i][j].scaleX = data[i][j].scaleY = iconWH;
						data[i][j].x = x;
						data[i][j].y = y;
						roadCon.addChild(data[i][j]);
					}
				}
			}
      this.roadFilled(cellW, road, cols, colShift);

		},

    roadFilled(cellW, road, cols, colShift) {

      let marksCols = Math.ceil(this.roadMap_container[road].getNumChildren() / 6);

      for(let i = marksCols; i >= cols; i -= colShift) {

        this.shiftRoadMapIcons(cellW * colShift, road);

			} // whenever the shoe is filled, moves a number (colShift) of columns

    },

    shiftRoadMapIcons(left, road) {
			this.roadMap_container[road].x -= left;
		},

    defaultPositionRoadMapIcons(road) {
      let roadCon = this.roadMap_container[road];
      switch(road) {
				case "bead_road":
					roadCon.x = 0;
					break;
				case "big_road": case "big_eye_road": case "small_road":
					roadCon.x = 265.05;
          break;
				case "cockroach_road":
					roadCon.x = 471.2;
          break;
			}
    },
		clearRoadMapIcons(road) {
			let roadCon = this.roadMap_container[road];

			roadCon.removeAllChildren();
      this.defaultPositionRoadMapIcons(road);
		},

		flashingMark(mark) {
			createjs.Tween.get(mark, {loop: false})
	        .to({alpha: 0}, 500)
	        .to({alpha: 1}, 500)
	        .to({alpha: 0}, 500)
	        .to({alpha: 1}, 500)
	        .to({alpha: 0}, 500)
	        .to({alpha: 1}, 500);
		},

		dataForRoadmap(result, road) {
			let data = [];
      let lastMark;

			switch(road) {
				case "bead_road": case "bead_road-OE":
					for(let i = 0; i <= result.length - 1; i++) {
						data[Math.floor(i/6)] = data[Math.floor(i/6)] || [];
						data[Math.floor(i/6)][i % 6] = this.getIconSprite(road, result[i]);
            lastMark = data[Math.floor(i/6)][i % 6];
					}
				break;
				case "big_road":
					for(let i = 0; i <= result.length - 1; i++) {
						let col = col || 0;
						let row = row || 0;
						let col_d = col_d || 0;
						let p = p || 0;	let c = c || 0;


						if(i > 0) {
							p = c;
							if(result[i]["winner"] != "tie")	c = i;
							else continue;
							if(result[c]["winner"] == result[p]["winner"])	{
								if(col_d > 0) { col_d++; }
								else {
									if(row + 1 < 6)	{	row++;	}
									else	col_d++;

									if(data[col + col_d]) {
										if(data[col + col_d][row]) {	row--; col_d++; }
									}
								}
							}
							else {	col++; row = 0; col_d = 0;	}
						}


						data[col + col_d] =  data[col + col_d] || [];
            data[col + col_d][row % 6] = this.getIconSprite(road, result[i]);
						if(i < result.length - 1) {
							if(i == 0 && result[i]["winner"] == "tie")	{
								data[col + col_d][row % 6] = this.getIconSprite(road + "-tie", 0);
							}

							if(result[i + 1]){
								if(result[i + 1]["winner"] == "tie") {
									data[col + col_d][row % 6] = this.getIconSprite(road + "-tie", result[c]);
									i++;
								}
							}
						}

            lastMark = data[col + col_d][row % 6];
					}
				break;
				case "big_eye_road": case "small_road": case "cockroach_road":
					let colsSkipped;
					if(road == "big_eye_road") {	colsSkipped = 1;	}
					else if(road == "small_road") {	colsSkipped = 2;	}
					else if(road == "cockroach_road") {	colsSkipped = 3;	}

					for(let i = colsSkipped; i <= result.length - 1; i++) {
						for(let j = 0; j <= result[i].length - 1; j++) {
							let col = col || 0;
							let row = row || 0;
							let color = color || null;
							let col_d = col_d || 0;
							let newCol = false;
							let count = count || 0;

							if(result[i]["winner"] == "tie") continue;
							if(j == 0) {
								if(result[i - colsSkipped - 1] == undefined || result[i - colsSkipped - 1] == "tie") continue;

								if(result[i - colsSkipped - 1].length == result[i - 1].length) {
									if(color == "red")	{	row++;	}
									else if(color != null)	newCol = true;
									color = "red";
								} else {
									if(color == "blue")	{	row++;	}
									else if(color != null)	newCol = true;
									color = "blue";
								}

							} else {
								if(result[i - colsSkipped][0] == "tie") continue;
								if(result[i - colsSkipped][j] == result[i - colsSkipped][j - 1]) {
									if(color == "red")	{	row++;	}
									else if(color != null)	newCol = true;
									color = "red";
								} else {
									if(color == "blue")	{	row++;	}
									else if(color != null)	newCol = true;
									color = "blue";
								}
							}


								if(newCol) {	col++; row = 0; col_d = 0;	}
								else if(col_d > 0 || row >= 6) {	row--; col_d++;	}


							data[col + col_d] = data[col + col_d] || [];
							data[col + col_d][row] = this.getIconSprite(road, color);

              lastMark = data[col + col_d][row];

						}

					}

				break;
			}

      this.flashingMark(lastMark);
			// call function for flashing effect on the last mark in shoe
			return data;
		},

		getIconSprite(road, spritedata) {
			let iconSprite;
			switch(road) {
				case "bead_road":
					iconSprite = new createjs.Sprite(this.roadMap_SpriteSheets["bead_road_" + spritedata["winner"]], "f"+ spritedata["winnerTotal"]);
				break
				case "bead_road-OE":
					iconSprite =  new createjs.Sprite(this.roadMap_SpriteSheets["bead_road_oddeven"], spritedata["winner"] + "-" + spritedata["winnerOddEven"]);
				break
				case "big_road":
					iconSprite = new createjs.Sprite(this.roadMap_SpriteSheets["big_road"], spritedata["winner"] + "-" + spritedata["dragonBigSmall"] + "-" + spritedata["tigerBigSmall"]);
					iconSprite.name = spritedata["winner"] + "-" + spritedata["dragonBigSmall"] + "-" + spritedata["tigerBigSmall"];
				break
				case "big_road-tie":
					if(spritedata == 0)
						iconSprite = new createjs.Sprite(this.roadMap_SpriteSheets["big_road"], "tie-first-round");
					else {
						iconSprite = new createjs.Sprite(this.roadMap_SpriteSheets["big_road"], spritedata["winner"] + "-tie-" + spritedata["dragonBigSmall"] + "-" + spritedata["tigerBigSmall"]);
						iconSprite.name = spritedata["winner"] + "-tie-" + spritedata["dragonBigSmall"] + "-" + spritedata["tigerBigSmall"];
					}
				break
				case "big_eye_road": case "small_road": case "cockroach_road":
					iconSprite = new createjs.Sprite(this.roadMap_SpriteSheets["road_marks"], road + "-" + spritedata);
				break;
			}
			return iconSprite;
		},

		dataForDerivedRoads(result) {
			let data = [];

			for(let i = 0; i <= result.length - 1; i++) {
				let col = col || 0;
				let row = row || 0;
				let p = p || 0;	let c = c || 0;

				if(i > 0) {
					p = c;
					if(result[i]["winner"] != "tie")	c = i;
					else continue;

					if(result[c]["winner"] == result[p]["winner"])	{	row++;	}
					else {	col++; row = 0;	}
				}

					data[col] = data[col] || [];
					data[col][row] = result[i]["winner"];



			}
			return data;

		},


	});

	return instance;
}
