import bcRoadMap from './Roadmap';
import multiRoadmap from './multiRoadmap';
import tilesModule from './tiles';


let instance = null;

let bc_format = {
	'b': 'banker',  // banker
	'p': 'player',  // player
	't': 'tie',     // tie
	'q': 'banker',  // banker banker-pair
	'w': 'banker',  // banker banker-pair player-pair
	'e': 'banker',  // banker player-pair
	'f': 'player',  // player banker-pair
	'g': 'player',  // player banker-pair player-pair
	'h': 'player',  // player player-pair
	'i': 'tie',     // tie banker-pair
	'j': 'tie',     // tie banker-pair player-pair
	'k': 'tie',      // tie player-pair
	'l': 'banker',  // banker
	'm': 'banker',  // banker banker-pair
	'n': 'banker',  // banker banker-pair player-pair
	'o': 'banker'  // banker player-pair
}
let dt_format = {
	'd': 'dragon', // dragon
	'z': 'tiger', // tiger
	'a': 'tie', // tie
	'b': 'dragon', // dragon big
	'c': 'dragon', // dragon small
	'e': 'tiger', // tiger big
	'f': 'tiger', // tiger small
	'g': 'dragon', // dragon big tiger big
	'h': 'dragon', // dragon big tiger small
	'i': 'dragon', // dragon small tiger big
	'j': 'dragon', // dragon small tiger small
	'k': 'tiger', // dragon big tiger big
	'l': 'tiger', // dragon big tiger small
	'm': 'tiger', // dragon small tiger big
	'n': 'tiger', // dragon small tiger small
	'o': 'tie', // dragon big tiger big
	'p': 'tie', // dragon big tiger small
	'q': 'tie', // dragon small tiger big
	'r': 'tie', // dragon small tiger small
	's': 'suited_tie', // suited tie
	't': 'suited_tie' // suited tie
}

export default(slave) => {

	instance = {
		/**
		 * @method generate2Dmarks
		 * 
		 * @param  array_marks
		 * @param  col
		 * @param  row
		 * @return array_metrix
		 */
		fnFormatSicbo (res, col = 14, row = 11) {
			let road_map_result = [];

			res = _.filter(res,(row)=>{
				if('game_info' in row) {
					return row;
				}
			});

			res = _.filter(res,  (row) => {
				if(typeof row.game_info === 'string') {
					row.game_info = JSON.parse(row.game_info) 
				} 
				return row.game_info
			});

			res = _.filter(res,  (row) => {				
				return !row.isVoid
			});

			for(var x = 0; x < res.length; x++) {

				if( !res[x].game_info) {
					continue;
				}

				if(!res[x].game_info.one || !res[x].game_info.two || !res[x].game_info.three) continue;
				
				let total = _.reduce(  [res[x].game_info.one, res[x].game_info.two, res[x].game_info.three] , function (sum, n) {
								return parseInt(sum) + parseInt(n);
							});

				let uniqDice = _.uniq( [res[x].game_info.one, res[x].game_info.two, res[x].game_info.three] );
				let parity = "";
				let size = "";

				road_map_result[x] = {
					win_combination : res[x].game_info.one + "" +res[x].game_info.two + "" + res[x].game_info.three,
					size :  uniqDice.length == 1 ? "triple" : (total >= 11 ? "big" : "small"),
					parity : uniqDice.length == 1 ? "triple" : (total % 2 == 0 ? "even" : "odd")
				}

			} // end for
			road_map_result = _.filter(road_map_result, (row)=>{
				return row;
			});

			let last_res = null;

			let color = "";
			let dragon = 0;
			let set_dragon = false;

			let dragon_row = 0;

			let parity_row = 0;
			let parity_col = 0;

			let parity_arr = new Array(col);
			for(var x = 0; x < parity_arr.length; x++) {
				parity_arr[x] = new Array(row);
			}

			for(var x = 0; x < road_map_result.length; x++) {
				if(parity_arr[parity_col + 1] === undefined) {
					parity_arr[parity_col  + 1] = new Array(row);
				}

				if(road_map_result[x-1]) {
					last_res = road_map_result[x-1].parity
					if(last_res != road_map_result[x].parity) {
						parity_col ++;
						parity_row = 0;	
						if(set_dragon) {
							parity_col = dragon + 1;
							set_dragon = false;	
						}
					}
				}

				if(parity_row >= row) {
					if(!set_dragon) {
						dragon = parity_col;
						set_dragon = true;
					}
					parity_col ++;
					parity_row = row-1;
				}

				if (parity_arr[parity_col][parity_row]) {
					if(!set_dragon) {
						dragon = parity_col;
						set_dragon = true;
						parity_row --;
					}
					parity_col++;
					dragon_row = parity_row;
					parity_arr[parity_col][dragon_row] = road_map_result[x].parity
				} else {
					parity_arr[parity_col][parity_row] = road_map_result[x].parity
					parity_row++;
				}
			}	


			// === size
			last_res = null;

			let size_arr = new Array(col);
			for(var x = 0; x < size_arr.length; x++) {
				size_arr[x] = new Array(row);
			}

			let size_col = 0;
			let size_row = 0;

			dragon = 0;
			set_dragon = false;
			dragon_row = 0;
			
			for(var x = 0; x < road_map_result.length; x++) {

				if(size_arr[size_col + 1] === undefined) {
					size_arr[size_col + 1] = new Array(row);
				}

				if(road_map_result[x-1]) {
					last_res = road_map_result[x-1].size
					if(last_res != road_map_result[x].size) {
						size_col ++;	
						size_row = 0;	
						if(set_dragon) {
							size_col = dragon + 1;
							set_dragon = false;	
						}
					}// end if
				} //end if

				if(size_row >= row) {
					if(!set_dragon) {
						dragon = size_col;
						set_dragon = true;
					}
					size_col ++;
					size_row = row-1;
				}

				if (size_arr[size_col][size_row]) {
					if(!set_dragon) {
						dragon = size_col;
						set_dragon = true;
						size_row --;
					}
					size_col++;
					dragon_row = size_row;
					size_arr[size_col][size_row] = road_map_result[x].size
				} else {
					size_arr[size_col][size_row] = road_map_result[x].size
					size_row++;
				}

			} //end for

			// === dice
			let dice_row = 0;
			let dice_col = 0;

			let dice_arr = new Array(col);
			for(var x = 0; x < dice_arr.length; x++) {
				dice_arr[x] = new Array(row);
			}

			for(var x = 0; x < road_map_result.length; x++) {
				if(dice_arr[dice_col + 1] === undefined) {
					dice_arr[dice_col + 1] = new Array(row);
				}

				dice_arr[dice_col][dice_row] = road_map_result[x].win_combination;
				dice_row++;
				if(dice_row % row == 0) {
					dice_col++;
					dice_row = 0;
				}
			}

			// === sum 
			let sum_row = 0;
			let sum_col = 0;

			let sum_arr = new Array(col);
			for(var x = 0; x < sum_arr.length; x++) {
				sum_arr[x] = new Array(row);
			}

			for(var x = 0; x < road_map_result.length; x++) {

				if(sum_arr[sum_col + 1] === undefined) {
					sum_arr[sum_col + 1] = new Array(row);
				}

				let win = road_map_result[x].win_combination.split("");
				let total = parseInt(win[0]) + parseInt(win[1]) + parseInt(win[2]);

				sum_arr[sum_col][sum_row] = total;
				sum_row++;
				if(sum_row % row == 0) {
					sum_col++;
					sum_row = 0;
				}
			}

			if(!_.find(parity_arr[parity_arr.length-1], (e) => {return e})) {
				parity_arr = parity_arr.slice(0, parity_arr.length-1);
			}
			if(!_.find(size_arr[size_arr.length-1], (e) => {return e})) {
				size_arr = size_arr.slice(0, size_arr.length-1);
			}
			if(!_.find(dice_arr[dice_arr.length-1], (e) => {return e})) {
				dice_arr = dice_arr.slice(0, dice_arr.length-1);
			}
			if(!_.find(sum_arr[sum_arr.length-1], (e) => {return e})) {
				sum_arr = sum_arr.slice(0, sum_arr.length-1);
			}
			
			if(parity_arr.length >= col) {
				parity_arr = parity_arr.slice(parity_arr.length-col, parity_arr.length);
			}
			
			if(size_arr.length >= col) {
				size_arr = size_arr.slice(size_arr.length-col, size_arr.length);
			}

			if(dice_arr.length >= col) {
				dice_arr = dice_arr.slice(dice_arr.length-col, dice_arr.length);
			}

			if(sum_arr.length >= col) {
				sum_arr = sum_arr.slice(sum_arr.length-col, sum_arr.length);
			}

			return  ({
				"parity" : parity_arr,
				"size" : size_arr,
				"dice" : dice_arr,
				"sum" : sum_arr
			});
		},
		// bc
		fnFormatBCBigRoadSpecial (data, row, col, parentData = {}) {
			return multiRoadmap(bc_format).generateBigRoad(data, row, col, parentData);
		},
		fnFormatBCBigRoad (data, row, col) {
			return bcRoadMap(bc_format).generateBigRoad(data, row, col, slave ? slave : null);
		},
		fnFormatBCPearlRoad (data, row, col) {
			
			return bcRoadMap(bc_format).generatePearlRoad(data, row, col, slave ? slave : null);
		},
		
		fnFormatBigEyeBoy (data, row, col) {
			return bcRoadMap(bc_format).generateBigEyeBoy(bcRoadMap(bc_format).generateBigRoad(data).derivativeData, row, col);
		},
		fnFormatSmallRoad (data, row, col) {
			return bcRoadMap(bc_format).generateSmallRoad(bcRoadMap(bc_format).generateBigRoad(data).derivativeData, row, col);
		},
		fnFormatCockroachPig (data, row, col) {
			return bcRoadMap(bc_format).generateCockroachPig(bcRoadMap(bc_format).generateBigRoad(data).derivativeData, row, col);
		},
		// dt
		fnFormatDTPearlRoad (data, row, col) {
			return bcRoadMap(dt_format).generatePearlRoad(data, row, col);
		},
		fnFormatDTBigRoad (data, row, col) {
			return bcRoadMap(dt_format).generateBigRoad(data, row, col);
		},
		fnFormatDTBigEyeBoy (data, row, col) {
			return bcRoadMap(dt_format).generateBigEyeBoy(bcRoadMap(dt_format).generateBigRoad(data).derivativeData, row, col);
		},
		fnFormatDTSmallRoad (data, row, col) {
			return bcRoadMap(dt_format).generateSmallRoad(bcRoadMap(dt_format).generateBigRoad(data).derivativeData, row, col);
		},
		fnFormatDTCockroachPig (data, row, col) {
			return bcRoadMap(dt_format).generateCockroachPig(bcRoadMap(dt_format).generateBigRoad(data).derivativeData, row, col);
		},

		// poker
		fnFormatPokerRoadMap(data, row = 6, col = 24) {
			let arr = new Array(col);

			data = _.filter(data, (mark) => {
				return mark;
			});
			
			for(var x = 0; x < arr.length; x++) {
				arr[x] = new Array(row);
			} // end for
			
			let colcnt = 0;
			let rowcnt = 0;

			for(var x = 0; x < data.length; x++) {
				if(x > 1 && x% row==0) {
					colcnt++;
					rowcnt = 0;
				}
				if(!arr[colcnt]) {
					arr[colcnt] = new Array(6);
				}

				arr[colcnt][rowcnt] = data[x].mark;
				rowcnt++;
			} //end for

			
			arr = arr.slice(arr.length-col, arr.length);
			return arr;
		},
		fnRedWhiteRoadMap(data, row = 6, col = 24) {
			let arr = new Array(col);

			for(var x = 0; x < arr.length; x++) {
				arr[x] = new Array(row);
			} // end for
			
			let colcnt = 0;
			let rowcnt = 0;

			for(var x = 0; x < data.length; x++) {
				if(x > 1 && x% row==0) {
					colcnt++;
					rowcnt = 0;
				}
				if(!arr[colcnt]) {
					arr[colcnt] = new Array(6);
				}

				arr[colcnt][rowcnt] = data[x].mark;
				rowcnt++;
			} //end for

			
			arr = arr.slice(arr.length-col, arr.length);
			return arr;
		},
		//pg
		fnPaigowRoadMap(data, col = 5) {
			
			let rows = ['banker', 'up', 'heaven', 'down'];
			let arr = [];
			let color = ['#D32F2E', '#E07A15', '#1464BF', '#689F39']; // the highlight color of the winner
			for(let i=0;i<data.length;i++) {
				arr[i] = data[i];
				arr[i].areas = [];
				for(let j=0;j<rows.length;j++) {
					arr[i].areas[j] = [];
					arr[i].areas[j].color = color[j];
					arr[i].areas[j].isWinner = _.find(data[i].game_result.winner, (o) => { return o == rows[j] }); // variable to determine winner
					arr[i].areas[j].isPair = _.find(data[i].game_result.pairs, (o) => { return o == rows[j] }) != undefined; // variable to determine pair

					// checking for duplicate tiles and manually set isPair true
					if(_.uniq(arr[i].game_info.tiles[rows[j]]).length === 1) {
						arr[i].areas[j].isPair = true;	
					}

					if(arr[i].areas[j].isPair) {
						if(data[i].game_info.tiles[rows[j]][1] && tilesModule(data[i].game_info.tiles[rows[j]][1]).value == 10) {
							arr[i].areas[j].total = tilesModule(data[i].game_info.tiles[rows[j]][0]).text;
						} else {
							arr[i].areas[j].total = tilesModule(data[i].game_info.tiles[rows[j]][0]).value % 10;
						}
					} else {
						arr[i].areas[j].total = _.sum(_.flatMap(data[i].game_info.tiles[rows[j]], (v) => { return tilesModule(v).value; })) % 10 || 0; // total winning value
					}
				}
			}
			return arr;
		},

		fnPaigowLastRounds(data) {
			let arr = [];
			
			if(data.length > 5) {
				data = _.slice(data, data.length -5, data.length);
			}

			let lastRound = null;
			for(let i=0;i<data.length;i++) {
				if(!data[i]) continue;
				if(!data[i].game_info || !data[i].game_result) continue;
				if(typeof data[i].game_info == 'string') data[i].game_info = JSON.parse(data[i].game_info); // format game_info
				if(typeof data[i].game_result == 'string') data[i].game_result = JSON.parse(data[i].game_result); //format game_result
				if(lastRound && data[i].game_info.setCount > lastRound) arr = [];
				lastRound = data[i].game_info.setCount;
				arr.push(data[i]);
			}
			return arr;
		},
		
		fnsbDataHelper(data) {

			let data2 = _.map(data, function (e) {
				let temp = e;

				try {
					temp = JSON.parse(e.game_info)
				} catch (error) {
					temp = e.game_info;
				}

				return temp;
			});

			return data2;
		}
	}

	return instance;
}