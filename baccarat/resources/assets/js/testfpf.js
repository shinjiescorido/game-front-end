import {flippy as fpf} from './flippy-controller';

let cardData = [{
  backImg : `/img/cards/back-banker.png`,
  frontImg: `/img/cards/0032.png`
},{
  backImg : `/img/cards/back-banker.png`,
  frontImg: `/img/cards/0032.png`
}];

fpf.init();

let ratio = 0.8;
let point = (fpf.fpfWrap.width() * 0.16);
let offset = 0;
offset = [point * (-1), point]

console.log({ratio: ratio, offset : offset, orientation:'landscape'})
fpf.createCards(cardData, {ratio: ratio, offset : offset, orientation:'landscape', y:true});
