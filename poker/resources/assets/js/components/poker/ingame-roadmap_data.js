let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
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
      this.data = [];

      this.data["derived"] = this.dataForDerivedRoads(result);
      this.data["bead_road"] = this.dataForRoadmap(result, "bead_road");
      this.data["big_road"] = this.dataForRoadmap(result, "big_road");
      this.data["big_eye_road"] = this.dataForRoadmap(this.data["derived"], "big_eye_road");
      this.data["small_road"] = this.dataForRoadmap(this.data["derived"], "small_road");
      this.data["cockroach_road"] = this.dataForRoadmap(this.data["derived"], "cockroach_road");

      //------ display test results

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


						if (i > 0) {
							p = c;
							if (result[i]["winner"] != "tie")	c = i;
							else continue;
							if (result[c]["winner"] == result[p]["winner"])	{
								if (col_d > 0) { col_d++; }
								else {
									if (row + 1 < 6)	{	row++;	}
									else	col_d++;

									if (data[col + col_d]) {
										if (data[col + col_d][row]) {	row--; col_d++; }
									}
								}
							}
							else {	col++; row = 0; col_d = 0;	}
						}


						data[col + col_d] =  data[col + col_d] || [];
            data[col + col_d][row % 6] = this.getIconSprite(road, result[i]);
						if (i < result.length - 1) {
							if (i == 0 && result[i]["winner"] == "tie")	{
								data[col + col_d][row % 6] = this.getIconSprite(road + "-tie", 0);
							}

							if (result[i + 1]){
								if (result[i + 1]["winner"] == "tie") {
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
					if (road == "big_eye_road") {	colsSkipped = 1;	}
					else if (road == "small_road") {	colsSkipped = 2;	}
					else if (road == "cockroach_road") {	colsSkipped = 3;	}

					for(let i = colsSkipped; i <= result.length - 1; i++) {
						for(let j = 0; j <= result[i].length - 1; j++) {
							let col = col || 0;
							let row = row || 0;
							let color = color || null;
							let col_d = col_d || 0;
							let newCol = false;
							let count = count || 0;

							if (result[i]["winner"] == "tie") continue;
							if (j == 0) {
								if (result[i - colsSkipped - 1] == undefined || result[i - colsSkipped - 1] == "tie") continue;

								if (result[i - colsSkipped - 1].length == result[i - 1].length) {
									if (color == "red")	{	row++;	}
									else if (color != null)	newCol = true;
									color = "red";
								} else {
									if (color == "blue")	{	row++;	}
									else if (color != null)	newCol = true;
									color = "blue";
								}

							} else {
								if (result[i - colsSkipped][0] == "tie") continue;
								if (result[i - colsSkipped][j] == result[i - colsSkipped][j - 1]) {
									if (color == "red")	{	row++;	}
									else if (color != null)	newCol = true;
									color = "red";
								} else {
									if (color == "blue")	{	row++;	}
									else if (color != null)	newCol = true;
									color = "blue";
								}
							}


								if (newCol) {	col++; row = 0; col_d = 0;	}
								else if (col_d > 0 || row >= 6) {	row--; col_d++;	}


							data[col + col_d] = data[col + col_d] || [];
							data[col + col_d][row] = this.getIconSprite(road, color);

              lastMark = data[col + col_d][row];

						}

					}

				break;
			}
			return [data, lastMark];
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
					if (spritedata == 0)
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

				if (i > 0) {
					p = c;
					if (result[i]["winner"] != "tie")	c = i;
					else continue;

					if (result[c]["winner"] == result[p]["winner"])	{	row++;	}
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
