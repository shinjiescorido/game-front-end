export default (key) => {
  var tiles = {
    '0000': { value : 10, number : 0, text : 'N'},
    '0001': { value : 1, number : 1, text : 1},
    '0002': { value : 2, number : 2, text : 2},
    '0003': { value : 3, number : 3, text : 3},
    '0004': { value : 4, number : 4, text : 4},
    '0005': { value : 5, number : 5, text : 5},
    '0006': { value : 6, number : 6, text : 6},
    '0007': { value : 7, number : 7, text : 7},
    '0008': { value : 8, number : 8, text : 8},
    '0009': { value : 9, number : 9, text : 9},
    
    'tile-0': { value : 10},
    'tile-1': { value : 1},
    'tile-2': { value : 2},
    'tile-3': { value : 3},
    'tile-4': { value : 4},
    'tile-5': { value : 5},
    'tile-6': { value : 6},
    'tile-7': { value : 7},
    'tile-8': { value : 8},
    'tile-9': { value : 9},
  };
  return tiles[key];
}