import card_config from '../assets/cards_animation_config';

const createSpriteRoadMap = function (imageRes, width, height, targetToSprite) {
    let spriteData = {
        images: [imageRes],
        frames: {width: width, height: height},
        animations: {
            "pearl-p": 0,
            "pearl-h": 1,
            "pearl-f": 2,
            "pearl-g": 3,
            "pearl-b": 4,
            "pearl-e": 5,
            "pearl-q": 6,
            "pearl-w": 7,
            "pearl-t": 8,
            "pearl-k": 9,
            "pearl-i": 10,
            "pearl-j": 11,

			"pearl-l":75,
			"pearl-m":77,
			"pearl-n":78,
			"pearl-o":76,

            "big-triple": 17,

            "big-p": 18,
            "big-h": 19,
            "big-f": 20,
            "big-g": 21,

			"big-l":79,
			"big-o":80,
    	    "big-m":81,
        	"big-n":82,

	        //new suited tie marks for tie
	        "big-l-t":83,
	        "big-o-t":84,
	        "big-m-t":85,
	        "big-n-t":86,
	        //new suited tie marks for tie

            "big-p-t": 22,
            "big-h-t": 23,
            "big-f-t": 24,
            "big-g-t": 25,

            "big-j": 17,
            "big-j-t": 17,
            "big-k": 17,
            "big-k-t": 17,
            "big-i": 17,
            "big-i-t": 17,
            "big-t": 17,
            "big-t-t": 17,

            "big-b": 26,
            "big-e": 27,
            "big-q": 28,
            "big-w": 29,

            "big-b-t": 30,
            "big-e-t": 31,
            "big-q-t": 31,
            "big-w-t": 32,

            "bigeye-R": 26,//18,
            "bigeye-B": 18,

            "bigsmall-R": 13,//12,
            "bigsmall-B": 12, //13,

            "roach-R": 16, //15,
            "roach-B": 15, //16,

            /// dragontiger 68 len
            "pearl-dt-d": 43, //dragon
            "pearl-dt-a": 8, //tie
            "pearl-dt-b": 46, //dragon
            "pearl-dt-c": 48, //dragon
            "pearl-dt-e": 45, //tiger
            "pearl-dt-f": 47, //tiger
            "pearl-dt-g": 46, //dragon
            "pearl-dt-h": 46, //dragon
            "pearl-dt-i": 48, //dragon
            "pearl-dt-j": 48, //dragon
            "pearl-dt-k": 45, //tiger
            "pearl-dt-l": 47, //tiger
            "pearl-dt-m": 45, //tiger
            "pearl-dt-n": 47, //tiger
            "pearl-dt-s": 73, //suited tie big
            "pearl-dt-t": 74, //suited tie small

            //not sure here
            "pearl-dt-o": 8, //tie
            "pearl-dt-p": 8,  //tie
            "pearl-dt-q": 8, //tie
            "pearl-dt-r": 8 //tie
        }
    }

    let sprite = new createjs.SpriteSheet(spriteData);
    targetToSprite = new createjs.Sprite(sprite, "pearl-p");

    return targetToSprite;
}

const createSprite = function (imageRes, width, height, targetToSprite) {
		let spriteData = {
				images: [imageRes],
				frames: {width: width, height: height},
				animations: {
						steady: 0,
						select: 1,
						hover: 2,
						win: 3,
						drop_animation: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, "drop_animation", 0.2]
				}
		}

		let sprite = new createjs.SpriteSheet(spriteData);
		targetToSprite = new createjs.Sprite(sprite, "steady");

		return targetToSprite;
}

const createCardSprite = function (self, width, height, card_res) {
		let cards_sprite_data = {
				images: [card_res],
				frames: {width: width, height: height},
				animations: card_config()
		}

		let cards_spriteSheet = new createjs.SpriteSheet(cards_sprite_data);

		return new createjs.Sprite(cards_spriteSheet, "back_red");
}

const createTileSprite = function (self, width, height, card_res) {
  let tile_sprite_data = {
    images: [card_res],
    frames: { width: width, height: height },
    animations: {
      "tile-1":0,
      "tile-2":1,
      "tile-3":2,
      "tile-4":3,
      "tile-5":4,
      "tile-6":5,
      "tile-7":6,
      "tile-8":7,
      "tile-9":8,
      "tile-0":9,
    }
  }

  let tiles_spriteSheet = new createjs.SpriteSheet(tile_sprite_data);
  return new createjs.Sprite(tiles_spriteSheet,"tile-0");
}

const randomNum = function (min, max) {
		return Math.random() * (max - min) + min;
}

const formatNumber = function (num) {
		num += '';
		var x = _.split(num, '.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
}

let target = null;
let count = 0;
let diff = 0;
let target_count = 0;
let timer = null;
let text = "";
let sel = null;

const numberWithCommas = function (x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const numberCounter = function (target_obj, target_number, sel) {
		count = 0;
		diff = 0;

		sel = sel;
		target_count = _.toNumber(target_number);
		target = target_obj;
		timer = null;

		text = target_number;

		if (_.isUndefined(sel)) {
				sel = 0;
		}

		counter();
}

const counter = function () {
		diff = target_count - count;
		if (diff > 0) {
				count += Math.ceil(diff / 2);
		}

		target.text = formatNumber(count);
		if (count < target_count) {
				timer = setTimeout(function () {
						counter();
				}, 10);
		} else {
				clearTimeout(timer);

				if (sel == 1) {
						target.text = '+ ' + numberWithCommas(text);
				} else if (sel == 2) {
						target.text = numberWithCommas(text) + ' %';
				} else {
						target.text = numberWithCommas(text);
				}
		}

}

const fontFormat = function(size, style, family, locale_adjust = true) {
  style = style == "normal" ? "regular" : style;
  style = style == "bold" ? "black" : style;
  family = window.language.locale == 'en' || locale_adjust == false ? `${family}-${style}` : `noto-${window.language.locale}-${style}`;

  //adjust font sample ?
  if((window.language.locale === 'zh') && (family.indexOf('noto') > -1)) {
    return `bold ${size}px 'Arial Unicode Ms', 'Arial Unicode Ms Regular'`;
  } else if(window.language.locale === 'kr' && (family.indexOf('noto') > -1)) {
    return `bold ${size}px lato-black`;
  } else if(window.language.locale === 'jp' && (family.indexOf('noto') > -1)) {
    return `bold ${size}px 'Kozuka Gothic Pr6N ', 'Hiragino Sans', 'Arial Unicode Ms', 'Arial Unicode Ms Regular'`;
  } else if(window.language.locale === 'th' && (family.indexOf('noto') > -1)) {
    return `bold ${size}px  'Leelawadee UI', 'Thonburi', 'Arial Unicode Ms', 'Arial Unicode Ms Regular'`;
  }
  return `${size}px ${family}`;
}

const playSound = function (sound) {
		var instance = createjs.Sound.play(sound, {interrupt: createjs.Sound.INTERUPT_LATE});
		instance.volume = config.effect;

		return instance;
}

const fnSetDateTimeZone = function (date, value) {
  var returnData = "";

  if (date != undefined && value != null) {
      var timeZone = new Date(date);
      timeZone.setHours(timeZone.getHours() + value)
      returnData = timeZone.getFullYear()
                + "-" + (timeZone.getMonth() + 1 < 10 ? "0" + parseInt(timeZone.getMonth() + 1) : parseInt(timeZone.getMonth()) + 1)
                + "-" + (timeZone.getDate() < 10 ? "0" + timeZone.getDate() : timeZone.getDate())
                + " " + (timeZone.getHours() < 10 ? "0" + timeZone.getHours() : timeZone.getHours())
                + ":" + (timeZone.getMinutes() < 10 ? "0" + timeZone.getMinutes() : timeZone.getMinutes())
                + ":" + (timeZone.getSeconds() < 10 ? "0" + timeZone.getSeconds() : timeZone.getSeconds());
  }

  return returnData;
}

const setCurrentTimezone = function (date) {
		let timezoneOffset = -(new Date().getTimezoneOffset() / 60)
		let newDate = "";
		let returnData = "";
		let isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
							 navigator.userAgent && !navigator.userAgent.match('CriOS');


		let isIe = () => {

		    var ua = window.navigator.userAgent;
		    var msie = ua.indexOf("MSIE ");

		    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
		    {
		        // alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
		        return true;
		    }
		    else  // If another browser, return 0
		    {
		    	return false;
		        alert('otherbrowser');
		    }

		    return false;
		};


		if (date) {
				if (date.indexOf(' ') < 0) return date;

				if (isSafari) {
					date = date.replace(/-/g , "/");
				}

				if(isIe()) {
					date = date.replace(/ /g , "T");
				}

				newDate = new Date(date);
				newDate.setHours(newDate.getHours() + parseInt(timezoneOffset));

				let sec = (newDate.getSeconds() < 10 ? "0" + newDate.getSeconds() : newDate.getSeconds());

        returnData = newDate.getFullYear() + "-" + (newDate.getMonth() + 1 < 10 ? "0" + parseInt(newDate.getMonth() + 1) : parseInt(newDate.getMonth()) + 1) + "-"
                    + (newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate()) + " " + (newDate.getHours() < 10 ? "0"
                    + newDate.getHours() : newDate.getHours()) + ":" + (newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes())

        returnData += ":" + sec

				/*let timeDateSplit = date.split(' ');

				let timeSplit = timeDateSplit[1].split(':');
				console.log("timeDateSpl", timeDateSplit[0]);
				let newHour = parseInt(timeSplit[0]) + parseInt(timezoneOffset);
				if (newHour > 23) {
						let dateSplit = timeDateSplit[0].split('-');
						let newMonth = parseInt(dateSplit[1]);
						let newDay = parseInt(dateSplit[2]) + 1;

						if (newDay < 10) {
								newDay = '0' + newDay;
						}
						else if (newDay > 31) {
								newMonth += 1;
								newDay = '01';
						}

						if (newMonth < 10) {
								newMonth = '0' + newMonth;
						}

						newHour -= 24;
						if (newHour < 10) {
								newHour = '0' + newHour;
						}

						newDate = dateSplit[0] + '-' + newMonth + '-' + newDay + ' ' + newHour + ':' + timeSplit[1];
				}
				else {
						newDate = timeDateSplit[0] + ' ' + newHour + ':' + timeSplit[1]; // +':'+ timeSplit[2];
				}*/
		}

		return returnData;
}

export default {
		createSprite,
		randomNum,
		createCardSprite,
    createTileSprite,
		numberCounter,
    fontFormat,
		playSound,
		numberWithCommas,
		createSpriteRoadMap,
		setCurrentTimezone,
		fnSetDateTimeZone

}
