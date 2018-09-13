module.exports =  (types) => {
    return {
        marks: [],

        types,
		slaveJson : {
			'supersix' : {
				'b': 'l',
				'q': 'm',
				'w': 'n',
				'e': 'o',
			}
		},
        /**
         * @method generateMatrix
         *
         * @desc Generate template for roadmap tables
         *
         * @param rows
         * @param columns
         * @returns {Array}
         */
        generateMatrix (rows = 6, columns = 24) {
            let temp = [];
            for (let i = 0; i < rows; i++) {
                temp.push(new Array(columns));
            }

            return temp;
        },

        /**
         * @method addColumn
         *
         * @desc add additional column to given matrix
         *
         * @param {Array} matrix Matrix to modify
         * @param {Number} cols number of columns to add
         */
        addColumn (matrix, cols = 2) {
            for (let i = 0; i < matrix.length; i++) {
                matrix[i] = matrix[i].concat(new Array(cols));
            }

            return matrix;
        },
		slaveCatcher(m,s){
			// if current ingame is not a slave game and current tableid is not for supersix 
			//and mark is banker and num is 6
			if (!this.slaveJson[s] || m.num !== 6){ 
				return m.mark;
			}
			return (this.slaveJson[s][m.mark])?this.slaveJson[s][m.mark]:m.mark;
		},

        /**
         * @method generatePearlRoad
         *
         * @desc generate matrix equivalent of the road map data 'pearl road'
         *
         * @param {Array} marks raw mark data
         * @param {Number} rows number of rows in the road map
         * @param {Number} columns number of columns in the road map
         * @return {Object}
         */
        generatePearlRoad (marks = [], rows = 6, columns = 24, misc={}) {
            let data = this.generateMatrix(rows, columns);
            let row = 0;
            let col = 0;

            for (let i = 0; i < marks.length; i++) {
				let slaveBringer = (misc.slave)?misc.slave:null;
                //data[row][col].mark = this.slaveCatcher(marks[i],slaveBringer);
                data[row][col] = {mark: this.slaveCatcher(marks[i],slaveBringer)};
                _.findIndex(data[0], (row) => { return !row }) == data[0].length - 2
                    ? this.addColumn(data, 1) : null;

                if ((row + 1) == rows) {
                    row = 0;
                    col++;
                    continue;
                }
                row++;
            }

            data = this.truncate(data, columns);
            return {matrix: data, row, col};
        },

        /**
         * @method generateBigRoad
         *
         * @desc generate matrix equivalent of the road map data 'big road'
         *
         * @param {Array} marks raw mark data
         * @param {Number} rows number of rows in the road map
         * @param {Number} columns number of columns in the road map
         */
        generateBigRoad (marks = [], rows = 6, columns = 24, misc={}) {
            let data = this.generateMatrix(rows, columns);
            let derivativeData = this.generateMatrix(rows, columns);
            let row = 0;
            let col = 0;
            let dRow = 0;
            let dCol = 0;
            let lastRow = null;

            for (let i = 0; i < marks.length; i++) {
                if (this.types[marks[i].mark].indexOf('tie') !== -1) {
                    data[row][col] = !data[row][col] ? {mark: marks[i].mark, ties: 0} : data[row][col];
                    derivativeData[row][col] = !row && !col ? {mark: marks[i].mark} : data[row][col];
                    data[row][col].ties++;
                    data[row][col].suited_tie = this.types[marks[i].mark] === 'suited_tie' 
                        ? true : (data[row][col].suited_tie || false);
                    continue;
                }

                if (data[row][col] && data[row][col].mark === null) {
                    data[row][col].mark = marks[i].mark;
                    continue;
                }

                let sameColumn = ( data[row][col]
                    && ( this.types[data[row][col].mark] == this.types[marks[i].mark]
                    || this.types[data[row][col].mark].indexOf('tie') !== -1)
                );

                if (sameColumn) {
                    let max = lastRow === null ? 5 : lastRow;
                    row == max || data[row + 1][col] ? col++ : null;
                    col == data[0].length - 1 ? this.addColumn(data, 1) : null;
                    row < max  && !data[row + 1][col] ? row++ : null;
                    dRow++;
                    derivativeData[dRow] =  !derivativeData[dRow] ? new Array(columns) : derivativeData[dRow];
                }
                else {
                    row = 0;
                    dRow = 0;
                    dCol = col = _.findIndex(data[0], (row) => { return !row });
                    lastRow = this.getLastCellDepth(data, col) - 1;
                }


                if (!data[row][col]) {
                    data[row][col] = {mark: null, ties: 0};
                    _.findLastIndex(data[row], (row) => { return row }) == data[row].length - 3
                        ? this.addColumn(data, 1) : null;
                }
				let slaveBringer = (misc.slave)?misc.slave:null;
                data[row][col].mark = this.slaveCatcher(marks[i],slaveBringer);
                derivativeData[dRow][dCol] = {mark: this.slaveCatcher(marks[i],slaveBringer)};
            }

            data = this.truncate(data, columns);
            return {matrix: data, derivativeData, row, col};
        },

        /**
         * @method generateBigEyeBoy
         *
         * @desc Generate big eye boy derived road map
         *
         * @param {Array} matrix Road map data to derive data from
         * @param {Number} rows number of rows to generate for this current road map
         * @param {Number} columns number of columns to generate for this current road map
         * @returns {*|Array}
         */
        generateBigEyeBoy (matrix, rows = 6, columns = 24) {
            let data =  this.generateMatrix(rows, columns);
            let max = _.findIndex(matrix[0], (col) => { return !col });
            let dataRow = 0;
            let dataCol = -1;

            max = max === -1 ? matrix[0].length : max;

            for (let i = 0; i < max; i++) {
                _.forEach(matrix, (row, index) => {
                    // return prematurely if the first condition is not met
                    if (!row[i] || (i < 1) || (i == 1 &&  index == 0)) {
                        return ;
                    }

                    let result = '';

                    if (index === 0) {
                        result = this.getMaxDepth(matrix, i - 1) === this.getMaxDepth(matrix, i - 2) ? 'R' : 'B';
                    }
                    else {
                        let first = matrix[index][i - 1] ? this.types[matrix[index][i - 1].mark] : false;
                        let second = matrix[index - 1][i - 1] ? this.types[matrix[index -1][i - 1].mark] : false;

                        result = first === second ? 'R' : 'B';
                    }

                    if (data[dataRow][dataCol] && data[dataRow][dataCol].mark == result) {
                        dataRow == rows - 1 || data[dataRow + 1][dataCol] ? dataCol++ : null;
                        dataRow < rows - 1 && !data[dataRow + 1][dataCol] ? dataRow++ : null;
                    }
                    else {
                        dataCol = _.findIndex(data[0], (col) => { return !col });
                        dataRow = 0;
                    }

                    data[dataRow][dataCol] = {mark: result};
                    _.findLastIndex(data[dataRow], (row) => { return row }) == data[dataRow].length - 3
                        ? this.addColumn(data, 1) : null;
                });
            }

            data = this.truncate(data, columns);
            return {matrix: data, row: dataRow, col: dataCol};
        },

        /**
         * @method generateSmallRoad
         *
         * @desc Generate small road derived road map
         *
         * @param {Array} matrix Road map data to derive data from
         * @param {Number} rows number of rows to generate for this current road map
         * @param {Number} columns number of columns to generate for this current road map
         * @returns {*|Array}
         */
        generateSmallRoad (matrix, rows = 6, columns = 24) {
            let data = this.generateMatrix(rows, columns);
            let max = _.findIndex(matrix[0], (col) => { return !col });
            let dataRow = 0;
            let dataCol = -1;
            max = max === -1 ? matrix[0].length : max;

            for (let i = 0; i < max; i++) {
                _.forEach(matrix, (row, index) => {
                    // return prematurely if the first condition is not met
                    if (!row[i] || (i < 2) || (i == 2 &&  index == 0)) {
                        return ;
                    }

                    let skips = i == 2 ? 1 : 2 ;
                    let result = '';

                    if (index == 0) {
                        result = this.getMaxDepth(matrix, i - 1) === this.getMaxDepth(matrix, i - 3) ? 'R' : 'B';
                    }
                    else {
                        let first = matrix[index][i - skips] ? this.types[matrix[index][i - skips].mark] : false;
                        let second = matrix[index - 1][i - skips]
                            ? this.types[matrix[index -1][i - skips].mark] : false;
                        result = first === second ? 'R' : 'B';
                    }

                    if (data[dataRow][dataCol] && data[dataRow][dataCol].mark == result) {
                        dataRow == rows - 1 || data[dataRow + 1][dataCol] ? dataCol++ : null;
                        dataRow < rows - 1 && !data[dataRow + 1][dataCol] ? dataRow++ : null;
                    }
                    else {
                        dataCol = _.findIndex(data[0], (col) => { return !col });
                        dataRow = 0;
                    }

                    data[dataRow][dataCol] = {mark: result};
                    _.findLastIndex(data[dataRow], (row) => { return row }) == data[dataRow].length - 3
                        ? this.addColumn(data, 1) : null;
                });

            }

            data = this.truncate(data, columns);
            return {matrix: data, row: dataRow, col: dataCol};
        },

        /**
         * @method generateSmallRoad
         *
         * @desc Generate cockroach pig derived road map
         *
         * @param {Array} matrix Road map data to derive data from
         * @param {Number} rows number of rows to generate for this current road map
         * @param {Number} columns number of columns to generate for this current road map
         * @returns {*|Array}
         */
        generateCockroachPig (matrix, rows = 6, columns = 24) {
            let data = this.generateMatrix(rows, columns);
            let max = _.findIndex(matrix[0], (col) => { return !col });
            let dataRow = 0;
            let dataCol = -1;

            max = max === -1 ? matrix[0].length : max;

            for (let i = 0; i < max; i++) {
                _.forEach(matrix, (row, index) => {
                    // return prematurely if the first condition is not met
                    if (!row[i] || (i < 4)) {
                        return ;
                    }

                    let result = '';

                    if (index == 0) {
                        result = this.getMaxDepth(matrix, i - 1) === this.getMaxDepth(matrix, i - 4) ? 'R' : 'B';
                    }
                    else {
                        let first = matrix[index][i - 3] ? this.types[matrix[index][i - 3].mark] : false;
                        let second = matrix[index - 1][i - 3] ? this.types[matrix[index - 1][i - 3].mark] : false;
                        result = first === second ? 'R' : 'B';
                    }

                    if (data[dataRow][dataCol] && data[dataRow][dataCol].mark == result) {
                        dataRow == rows - 1 || data[dataRow + 1][dataCol] ? dataCol++ : null;
                        dataRow < rows - 1 && !data[dataRow + 1][dataCol] ? dataRow++ : null;
                    }
                    else {
                        dataCol = _.findIndex(data[0], (col) => { return !col });
                        dataRow = 0;
                    }

                    data[dataRow][dataCol] = {mark: result};
                    _.findLastIndex(data[dataRow], (row) => { return row }) == data[dataRow].length - 3
                        ? this.addColumn(data, 1) : null;
                });

            }

            data = this.truncate(data, columns);
            return {matrix: data, row: dataRow, col: dataCol};
        },

        /**
         * @method getLastCellDepth
         *
         * @desc Return index of first non false cell encountered
         *
         * @param {Array} matrix Road map
         * @param {Number} column Column to iterate through
         * @param {Number} max Maximum depth
         */
        getLastCellDepth (matrix, column, max = 6) {
            let depth = 0;
            for (; depth < max; depth++) {
                if (matrix[depth][column] && matrix[depth][column].mark) {
                    return depth;
                }
            }

            return depth;
        },

        /**
         * @method getMaxDepth
         *
         * @desc Return maximum depth of a given column, row starts from 0
         *
         * @param {Array} matrix Road map
         * @param {Number} column Column to iterate through
         * @param {Number} max Maximum depth
         */
        getMaxDepth (matrix, column, max = 6) {
            let depth = 0;

            for (; depth < max; depth++) {
                if (!matrix[depth][column]) {
                    return depth;
                }
            }

            return depth;
        },

        /**
         * @method truncate
         *
         * @desc Truncate array for displaying
         *
         * @param matrix
         * @param max
         * @returns {Array}
         */
        truncate (matrix, max = 24) {
            let temp = [];

            for (let i = 0; i < matrix.length; i++) {
                temp.push(matrix[i].slice(matrix[0].length - max, matrix[0].length - 1));
            }

            return temp;
        }
    }
};
