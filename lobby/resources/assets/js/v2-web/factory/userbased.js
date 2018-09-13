import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';
import rmformat from '../../factories/formatter';

let formatData = rmformat();
let instance = null;

instance = {
  roomlist_tables :[],
  makeRoomListTables(data, gamedata, _target, _timer_c,  x, self) {
    this.roomlist_tables[x] = _target.roomlist_tables;

    let text_color = "#efb052";
    let level ='';
    let slave_level = '';
    let gameRange = 0;
    let normal = 0;
    let premium = 0;
    let vip = 0;

    if(gamedata.tableNumber == data.data[1]) {
			gameRange = gamedata.casinoBetRanges;

			normal = gameRange[0].min +"-"+gameRange[0].max;
			premium = gameRange[1].min +"-"+gameRange[1].max;
			vip = gameRange[2].min +"-"+gameRange[2].max;
		}

    if(data.data[6] == premium) {
      text_color = "#efb052";
      level = window.language.level.premium;
    } else if(data.data[6] == vip) {
      text_color = "#000";
      level = window.language.level.vip;
    }
    slave_level = level;

    this.roomlist_tables[x].tableNum = new createjs.Text( `${data.data[7].length > 2 ? data.data[7] : "0" + data.data[7]}`, "20px ArvoBold", text_color );
    this.roomlist_tables[x].tableNum.textAlign = "left";
    this.roomlist_tables[x].tableNum.x = 100 + 30;
    // this.roomlist_tables[x].tableNum.y = roundIcon.y - 2;
    _target.addChild(this.roomlist_tables[x].tableNum);

    this.roomlist_tables[x].tablename_head = new createjs.Text( `${slave_level} ${data.data[3]}`, "20px ArvoItalic", text_color );
    this.roomlist_tables[x].tablename_head.textAlign = "left";
    this.roomlist_tables[x].tablename_head.x = this.roomlist_tables[x].tableNum.x + this.roomlist_tables[x].tableNum.getBounds().width + 10;
    _target.addChild(this.roomlist_tables[x].tablename_head);

    let capital_text = new createjs.Text(window.language.lobby.banker_capital, '19px LatoBlack', '#919191');
    capital_text.textAlign = "left";
    capital_text.x = 130;
    capital_text.y = 55 - 8;
    _target.addChild(capital_text);

    let bankerMoney = 0;
    if (data.banker.money) {
      bankerMoney = data.banker.money;
    }

    let capital = new createjs.Text(numberWithCommas(bankerMoney), '24px BebasNeue', '#fff');
    capital.textAlign = "left";
    capital.x = capital_text.x ;
    capital.y = capital_text.y + 22;
    _target.addChild(capital);

    let betrange_text = new createjs.Text(window.language.lobby.bet_range, '19px LatoBlack', '#919191');
    betrange_text.textAlign = "left";
    betrange_text.x = capital_text.x + 200;
    betrange_text.y = capital_text.y;
    _target.addChild(betrange_text);

    let splitbetrange =  data.data[6].split(/[-]/);
		let betRangeMax = 0;
		let betRangeMin = 0;
		let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;

		betRangeMax = (parseInt(splitbetrange[1]) * parseInt(window.currencyMultiplier)) * window.userMultiplier * mainMultiplier;
		betRangeMin = (parseInt(splitbetrange[0]) * parseInt(window.currencyMultiplier)) * window.userMultiplier * mainMultiplier;

    let betrange = new createjs.Text(numberWithCommas(betRangeMin)+'-'+ numberWithCommas(betRangeMax), '24px bebasNeue', '#fff');
    betrange.textAlign = "left";
    betrange.x = betrange_text.x ;
    betrange.y = betrange_text.y + 22;
    _target.addChild(betrange);

    let usersIco = new createjs.Bitmap('/img/icons/ico_lobby_users.png');
		usersIco.x = betrange_text.x + 200;
		usersIco.y = betrange_text.y + 15;
		usersIco.scaleX = usersIco.scaleY= 0.8;
		_target.addChild(usersIco);

    let usertotal = 0;

		if(parseInt(data.banker.users) == 0) {
			usertotal = parseInt(data.banker.users);
		} else {
			usertotal = parseInt(data.banker.users) - 1;
		}

    this.userCount = new createjs.Text(usertotal +"/"+data.data[7],"20px BebasNeue","#b3b3b3");
		this.userCount.x = usersIco.x + 35;
		this.userCount.y = usersIco.y;
		this.userCount.textAlign = 'left';
		_target.addChild(this.userCount);
  },

}
export default {
  instance
}
