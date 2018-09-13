import cardsModule from './cards';

export default (gameInfo) => {
  let total = {
    dragon: 0,
    tiger: 0
  };

  _.forEach(gameInfo, (row, key) => {
    if (!row) {
      return;
    }

    let card = cardsModule(row).value;

    total[key.indexOf('tiger') !== -1 ? 'tiger' : 'dragon'] += card;
    // total[key.indexOf('tiger') !== -1 ? 'tiger' : 'dragon'] %= 10;
  });

  return total;

}
