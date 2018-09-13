import cardsModule from './cards';

export default (gameInfo) => {
  let total = {
    player: 0,
    banker: 0
  };

  _.forEach(gameInfo, (row, key) => {
    if (!row) {
      return;
    }

    let card = cardsModule(row).value;
    card = card >= 10 ? 0 : card;


    total[key.indexOf('banker') !== -1 ? 'banker' : 'player'] += card;
    total[key.indexOf('banker') !== -1 ? 'banker' : 'player'] %= 10;


  });

  return total;

}
