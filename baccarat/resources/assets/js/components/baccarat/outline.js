import {createSprite, randomNum, getSlaveParam, fontFormat} from '../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		main() {
			let player_txt_color =  '#1981f7';
      let banker_txt_color = 'rgba(209,47,47,1)';
      let tie_txt_color = 'rgba(104, 159, 56,1)';
			this.textpreset = {
				classic : [{
						text: window.language.locale === 'zh' ? window.language.game_specific.playerpair : 'PLAYER PAIR',
						tablename : '',
						payout :'11:1',
						skewX : 30,
						scaleY: 0.7,
						x : 130,
						y: window.language.locale ==='zh'? 50 : 16,
						width : 30,
						extraX : window.language.locale ==='zh'? -26 : -22,
						extraY : window.language.locale ==='zh'? 30 : 0,
						textFont1 : window.language.locale ==='zh'?[fontFormat(65, 'black', 'noto-zh'), '#0c3397'] : ['28px lato-black', player_txt_color],
						textFont2 :window.language.locale ==='zh'? [fontFormat(45, 'black', 'noto-zh'), '#0c3397']: ['28px lato-regular', player_txt_color]
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.player : 'PLAYER',
							tablename: 'player',
							payout : null,
							skewX : 20,
							scaleY: 0.7,
							x : 392,
							y: window.language.locale ==='zh'? 50 : 16,
							width : 30,
							extraX : 0,
							extraY : window.language.locale ==='zh'? 30 : 4,
							textFont1 : window.language.locale ==='zh' ? [fontFormat(110, 'black', 'noto-zh'), '#0c3397'] : ['28px lato-black', player_txt_color],
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.tie : 'TIE',
							tablename: 'tie',
							payout : '8:1',
							skewX : 0,
							scaleY: 0.65,
							x : 650,
							y: window.language.locale ==='zh'? 50 : 16,
							width : 30,
							extraX : 0,
							extraY : window.language.locale ==='zh'? 30 : 4,
							color : '#568c3f' ,
							textFont1 : window.language.locale === 'zh'?[fontFormat(65, 'black', 'noto-zh'), '#568c3f'] : ['28px lato-black', tie_txt_color],
							textFont2 : window.language.locale === 'zh'?[fontFormat(45, 'black', 'noto-zh'), '#568c3f'] : ['28px lato-regular', tie_txt_color]
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.banker : 'BANKER',
							tablename: 'banker',
							payout : null,
							skewX : -20,
							scaleY: 0.7,
							x : 900,
							y: window.language.locale ==='zh'? 50 : 16,
							width : 30,
							extraX : 0,
							extraY : window.language.locale ==='zh'? 30 : 4,
							textFont1 : window.language.locale === 'zh'? [fontFormat(110, 'black', 'noto-zh'), '#b71b1c'] : ['28px lato-black', banker_txt_color],
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.bankerpair : 'BANKER PAIR',
							tablename: '',
							payout : '11:1',
							scaleY: 0.7,
							skewX : -30,
							x : 1174,
							y: window.language.locale ==='zh'? 50 : 16,
							width : 30,
							extraX : window.language.locale ==='zh'? 26 : 20,
							extraY : window.language.locale ==='zh'? 30 : 0,
							textFont1 : window.language.locale === 'zh'? [fontFormat(65, 'black', 'noto-zh'), '#b71b1c']: ['28px lato-black', banker_txt_color],
							textFont2 :window.language.locale === 'zh'?  [fontFormat(45, 'black', 'noto-zh'), '#b71b1c']: ['28px lato-regular', banker_txt_color]
					}],
				supersix : [{
						text: window.language.locale === 'zh' ? window.language.game_specific.playerpair : 'PLAYER PAIR',
						tablename : '',
						payout :'11:1',
						skewX : 30,
						scaleY: 0.7,
						x : 130,
						y: window.language.locale ==='zh'? 50 : 16,
						width : 30,
						extraX : window.language.locale ==='zh'? -26 : -22,
						extraY : window.language.locale ==='zh'? 30 : 0,
						textFont1 : window.language.locale ==='zh'?[fontFormat(65, 'black', 'noto-zh'), '#0c3397'] : ['28px lato-black', player_txt_color],
						textFont2 :window.language.locale ==='zh'? [fontFormat(45, 'black', 'noto-zh'), '#0c3397']: ['28px lato-regular', player_txt_color]
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.player : 'PLAYER',
							tablename: 'player',
							payout : null,
							skewX : 20,
							scaleY: 0.7,
							x : 392,
							y: window.language.locale ==='zh'? 50 : 16,
							width : 30,
							extraX : 0,
							extraY : window.language.locale ==='zh'? 30 : 4,
							textFont1 : window.language.locale ==='zh' ? [fontFormat(110, 'black', 'noto-zh'), '#0c3397'] : ['28px lato-black', player_txt_color],
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.tie : 'TIE',
							tablename: 'tie',
							payout : '8:1',
							skewX : 0,
							scaleY: 0.65,
							x : 650,
							y: window.language.locale ==='zh'? 14 : 16,
							width : 30,
							extraX : 0,
							extraY : window.language.locale ==='zh'? 2 : 4,
							color : '#568c3f' ,
							textFont1 : window.language.locale === 'zh'?[fontFormat(65, 'black', 'noto-zh'), '#568c3f'] : ['28px lato-black', tie_txt_color],
							textFont2 : window.language.locale === 'zh'?[fontFormat(45, 'black', 'noto-zh'), '#568c3f'] : ['28px lato-regular', tie_txt_color]
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.banker : 'BANKER',
							tablename: 'banker',
							payout : null,
							skewX : -20,
							scaleY: 0.7,
							x : 900,
							y: window.language.locale ==='zh'? 50 : 16,
							width : 30,
							extraX : 0,
							extraY : window.language.locale ==='zh'? 30 : 4,
							textFont1 : window.language.locale === 'zh'? [fontFormat(110, 'black', 'noto-zh'), '#b71b1c'] : ['28px lato-black', banker_txt_color],
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.bankerpair : 'BANKER PAIR',
							tablename: '',
							payout : '11:1',
							scaleY: 0.7,
							skewX : -30,
							x : 1174,
							y: window.language.locale ==='zh'? 50 : 16,
							width : 30,
							extraX : window.language.locale ==='zh'? 26 : 20,
							extraY : window.language.locale ==='zh'? 30 : 0,
							textFont1 : window.language.locale === 'zh'? [fontFormat(65, 'black', 'noto-zh'), '#b71b1c']: ['28px lato-black', banker_txt_color],
							textFont2 :window.language.locale === 'zh'?  [fontFormat(45, 'black', 'noto-zh'), '#b71b1c']: ['28px lato-regular', banker_txt_color]
					}],
				bonus : [{
						text: window.language.locale === 'zh' ? window.language.game_specific.big : 'BIG',
						payout : '.54:1',
						skewX : 30,
						scaleY: 0.7,
						x : 60,
						y: window.language.locale === 'zh'?35 : 16,
						width : 30,
						extraX :window.language.locale === 'zh'? -24 : -14,
						extraY : 8,
						outline : 'no',
						color : '#fef4ad' ,
						textFont1 : window.language.locale === 'zh'?[fontFormat(65, 'black', 'noto-zh'), '#fef4ad'] : ['26px lato-black', '#fef4ad'],
						textFont2 : window.language.locale === 'zh'?[fontFormat(25, 'black', 'noto-zh'), '#fef4ad'] : ['26px lato-regular', '#fef4ad']
					},{
						text: window.language.locale === 'zh' ? window.language.game_specific.playerpair : 'PLAYER PAIR',
						tablename: '',
						payout : '11:1',
						skewX : 24,
						scaleY: 0.7,
						x : 230,
						y: 16,
						width : 30,
						extraX : -12,
						extraY : 2,
						textFont1 : window.language.locale === 'zh'?[fontFormat(45, 'black', 'noto-zh'), '#0c3397']:['26px lato-black', player_txt_color],
						textFont2 : window.language.locale === 'zh'?[fontFormat(30, 'black', 'noto-zh'), '#0c3397']:['26px lato-black', player_txt_color]
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.player : 'PLAYER',
							tablename: 'player',
							payout : null,
							skewX : 16,
							scaleY: 0.7,
							x : 428,
							y: window.language.locale === 'zh'?30:16,
							width : 30,
							extraX : 0,
							extraY : 0,
							textFont1 :  window.language.locale === 'zh'?[fontFormat(80, 'black', 'noto-zh'), '#0c3397']:['26px lato-black', player_txt_color]
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.tie : 'TIE',
							tablename: 'tie',
							payout : '8:1',
							skewX : 0,
							scaleY: 0.65,
							x : 650,
							y: window.language.locale === 'zh'?25:16,
							width : 30,
							extraX : 0,
							extraY : 6,
							color : '#fff' ,
							textFont1 :  window.language.locale === 'zh'?[fontFormat(65, 'black', 'noto-zh'), '#568c3f']:['26px lato-black', tie_txt_color],
							textFont2 : window.language.locale === 'zh'?[fontFormat(45, 'black', 'noto-zh'), '#568c3f']:['26px lato-black', tie_txt_color]
					},{
							text: window.language.locale === 'zh' ? window.language.game_specific.banker : 'BANKER',
							tablename: 'banker',
							payout : null,
							skewX : -16,
							scaleY: 0.7,
							x : 870,
							y: window.language.locale === 'zh'?30:16,
							width : 30,
							extraX : 0,
							extraY : 0,
							color : '#fff' ,
							textFont1 : window.language.locale === 'zh'?[fontFormat(80, 'black', 'noto-zh'), '#b71b1c']:['26px lato-black', banker_txt_color]
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.bankerpair : 'BANKER PAIR',
							tablename: '',
							payout : '11:1',
							scaleY: 0.7,
							skewX : -24,
							x : 1074,
							y: 16,
							width : 30,
							extraX : 12,
							extraY : 0,
							color : '#fff',
							textFont1 : window.language.locale === 'zh'?[fontFormat(45, 'black', 'noto-zh'), '#b71b1c']:['26px lato-black', banker_txt_color],
							textFont2 : window.language.locale === 'zh'?[fontFormat(30, 'black', 'noto-zh'), '#b71b1c']:['26px lato-black', banker_txt_color]
					},{
						text: window.language.locale === 'zh' ? window.language.game_specific.small : 'SMALL',
						payout : '.54:1',
						skewX : -30,
						scaleY: 0.7,
						x : 1254,
						y: window.language.locale === 'zh'?35 : 16,
						width : 30,
						extraX : window.language.locale === 'zh'?24 : 14,
						extraY : 8,
						outline : 'no',
						textFont1 : window.language.locale === 'zh'?[fontFormat(65, 'black', 'noto-zh'), '#fef4ad'] : ['26px lato-black', '#fef4ad'],
						textFont2 : window.language.locale === 'zh'?[fontFormat(25, 'black', 'noto-zh'), '#fef4ad'] : ['26px lato-regular', '#fef4ad']
					}],
			}
			this.multitextpreset = {
				classic : [{
						text: window.language.locale === 'zh' ? window.language.game_specific.playerpair : 'PLAYER PAIR',
						tablename : '',
						payout :'11:1',
						skewX : 20,
						scaleY: 0.7,
						x : window.language.locale ==='zh'? 310 : 320,
						y: window.language.locale ==='zh'? 5 : 10,
						width : 150,
						extraX : window.language.locale ==='zh'? 60 : 75,
						extraY : window.language.locale ==='zh'? 5 : 10,
						textFont1 : window.language.locale ==='zh'?[fontFormat(25, 'black', 'noto-zh', false), '#0c3397'] : ['16px lato-black', player_txt_color],
						textFont2 :window.language.locale ==='zh'? [fontFormat(25, 'black', 'noto-zh'), '#0c3397']: ['16px lato-regular', player_txt_color]
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.tie : 'TIE',
							tablename: 'tie',
							payout : '8:1',
							skewX : 0,
							scaleY: 0.65,
							x : window.language.locale ==='zh'? 648 : 656,
							y: window.language.locale ==='zh'? 53 : 60,
							width : 30,
							extraX : window.language.locale ==='zh'? 55 : 40,
							extraY : window.language.locale ==='zh'? 57 : 60,
							color : '#568c3f' ,
							textFont1 : window.language.locale === 'zh'?[fontFormat(45, 'black', 'noto-zh'), '#568c3f'] : ['24px lato-black', tie_txt_color],
							textFont2 : window.language.locale === 'zh'?[fontFormat(35, 'black', 'noto-zh'), '#568c3f'] : ['24px lato-regular', tie_txt_color]
					},  {
							text: window.language.locale === 'zh' ? window.language.game_specific.banker : 'BANKER',
							tablename: 'banker',
							payout : null,
							skewX : 0,
							scaleY: 0.7,
							x : 674,
							y: window.language.locale ==='zh'? 97 : 105,
							width : 30,
							extraX : 0,
							extraY : window.language.locale ==='zh'? 95 : 105,
							textFont1 : window.language.locale === 'zh'? [fontFormat(45, 'black', 'noto-zh'), '#b71b1c'] : ['24px lato-black', banker_txt_color],
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.player : 'PLAYER',
							tablename: 'player',
							payout : null,
							skewX : 0,
							scaleY: 0.7,
							x : 674,
							y: window.language.locale ==='zh'? 142 : 157,
							width : 100,
							extraX : 40,
							extraY : window.language.locale ==='zh'? 140 : 157,
							textFont1 : window.language.locale ==='zh' ? [fontFormat(56, 'black', 'noto-zh'), '#0c3397'] : ['26px lato-black', player_txt_color],
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.bankerpair : 'BANKER PAIR',
							tablename : '',
							payout : '11:1',
							scaleY: 0.7,
							skewX : -20,
							x : window.language.locale ==='zh'? 980 : 990,
							y: window.language.locale ==='zh'? 5 : 10,
							width : 150,
							extraX : window.language.locale ==='zh'? 60 : 75,
							extraY : window.language.locale ==='zh'? 5 : 10,
							textFont1 : window.language.locale === 'zh'? [fontFormat(25, 'black', 'noto-zh'), '#b71b1c']: ['16px lato-black', banker_txt_color],
							textFont2 :window.language.locale === 'zh'?  [fontFormat(25, 'black', 'noto-zh'), '#b71b1c']: ['16px lato-regular', banker_txt_color]
					}],
				supersix : [{
						text: window.language.locale === 'zh' ? window.language.game_specific.playerpair : 'PLAYER PAIR',
						tablename: '',
						payout :'11:1',
						skewX : 20,
						scaleY: 0.7,
						x : window.language.locale ==='zh'? 310 : 320,
						y: window.language.locale ==='zh'? 5 : 10,
						width : 150,
						extraX : window.language.locale ==='zh'? 60 : 75,
						extraY : window.language.locale ==='zh'? 5 : 10,
						textFont1 : window.language.locale ==='zh'?[fontFormat(25, 'black', 'noto-zh', false), '#0c3397'] : ['16px lato-black', player_txt_color],
						textFont2 :window.language.locale ==='zh'? [fontFormat(25, 'black', 'noto-zh'), '#0c3397']: ['16px lato-regular', player_txt_color]
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.player : 'PLAYER',
							tablename: 'player',
							payout : null,
							skewX : 0,
							scaleY: 0.7,
							x : 674,
							y: window.language.locale ==='zh'? 142 : 157,
							width : 100,
							extraX : 40,
							extraY : window.language.locale ==='zh'? 140 : 157,
							textFont1 : window.language.locale ==='zh' ? [fontFormat(56, 'black', 'noto-zh'), '#0c3397'] : ['26px lato-black', player_txt_color],
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.tie : 'TIE',
							tablename: 'tie',
							payout : '8:1',
							skewX : 0,
							scaleY: 0.65,
							x : window.language.locale ==='zh'? 648 : 656,
							y: window.language.locale ==='zh'? 53 : 60,
							width : 30,
							extraX : window.language.locale ==='zh'? 55 : 40,
							extraY : window.language.locale ==='zh'? 57 : 60,
							color : '#568c3f' ,
							textFont1 : window.language.locale === 'zh'?[fontFormat(45, 'black', 'noto-zh'), '#568c3f'] : ['24px lato-black', tie_txt_color],
							textFont2 : window.language.locale === 'zh'?[fontFormat(35, 'black', 'noto-zh'), '#568c3f'] : ['24px lato-regular', tie_txt_color]
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.banker : 'BANKER',
							tablename: 'banker',
							payout : null,
							skewX : 6,
							scaleY: 0.7,
							x : 608,
							y: window.language.locale ==='zh'? 97 : 108,
							width : 30,
							extraX : 0,
							extraY : window.language.locale ==='zh'? 95 : 105,
							textFont1 : window.language.locale === 'zh'? [fontFormat(45, 'black', 'noto-zh'), '#b71b1c'] : ['24px lato-black', banker_txt_color],
					}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.bankerpair : 'BANKER PAIR',
							tablename: '',
							payout : '11:1',
							scaleY: 0.7,
							skewX : -20,
							x : window.language.locale ==='zh'? 980 : 990,
							y: window.language.locale ==='zh'? 5 : 10,
							width : 150,
							extraX : window.language.locale ==='zh'? 60 : 75,
							extraY : window.language.locale ==='zh'? 5 : 10,
							textFont1 : window.language.locale === 'zh'? [fontFormat(25, 'black', 'noto-zh'), '#b71b1c']: ['16px lato-black', banker_txt_color],
							textFont2 :window.language.locale === 'zh'?  [fontFormat(25, 'black', 'noto-zh'), '#b71b1c']: ['16px lato-regular', banker_txt_color]
					}],
				bonus : [{
							text: window.language.locale === 'zh' ? window.language.game_specific.big : 'BIG',
							payout : '.54:1',
							skewX : 25,
							scaleY: 0.7,
							x : 100,
							y: window.language.locale === 'zh'? 15 : 15,
							width : 80,
							extraX :window.language.locale === 'zh'? -8 : -8,
							extraY : 28,
							outline : 'no',
							color : '#fef4ad' ,
							textFont1 : window.language.locale === 'zh'?[fontFormat(20, 'black', 'noto-zh'), '#fef4ad'] : ['19px lato-bold', '#fef4ad'],
							textFont2 : ['19px lato-regular', '#fef4ad']
						}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.bonus : 'BONUS',
							payout : null,
							skewX : 23,
							scaleY: 0.7,
							x : 345,
							y: window.language.locale === 'zh'? 19 : 19,
							width : 100,
							extraX : 0,
							extraY : 0,
							outline : 'no',
							color : '#fef4ad' ,
							textFont1 : window.language.locale === 'zh'?[fontFormat(25, 'black', 'noto-zh'), '#fef4ad'] : ['25px lato-bold', '#fef4ad'],
							textFont2 : ['22px lato-regular', '#fef4ad']
						}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.playerpair : 'PLAYER',
							tablename: 'player',
							payout : '11:1',
							skewX : 10,
							scaleY: 0.7,
							outline : 'no',
							x : 555,
							y: 14,
							width : 30,
							extraX : window.language.locale === 'zh'? 0 : 21,
							extraY : 29,
							textFont1 : window.language.locale === 'zh'?[fontFormat(19, 'black', 'noto-zh'), '#fff']:['19px lato-bold', player_txt_color],
							textFont2 : ['19px lato-regular', '#fff']
						}, {
							text: window.language.locale === 'zh' ? '' : 'PAIR',
							payout : null,
							skewX : 10,
							scaleY: 0.7,
							x : 534,
							y: 29,
							width : 30,
							extraX : 0,
							extraY : 0,
							textFont1 : window.language.locale === 'zh'?[fontFormat(19, 'black', 'noto-zh'), '#fff']:['19px lato-bold', '#fff'],
							textFont2 : ['20px lato-regular', '#fff']
						}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.bankerpair : 'BANKER',
							tablename: 'banker',
							payout : '11:1',
							scaleY: 0.7,
							skewX : -5,
							outline : 'no',
							x : 793,
							y: 15,
							width : 30,
							extraX : window.language.locale === 'zh'? 0 : 26,
							extraY : 29,
							color : '#fff',
							textFont1 : window.language.locale === 'zh'? [fontFormat(19, 'black', 'noto-zh'), '#fff']:['19px lato-bold', banker_txt_color],
							textFont2 : ['19px lato-regular', '#fff']
						}, {
							text: window.language.locale === 'zh' ? '' : 'PAIR',
							payout : null,
							skewX : -3,
							scaleY: 0.7,
							x : 778,
							y: 29,
							width : 30,
							extraX : 0,
							extraY : 0,
							textFont1 : window.language.locale === 'zh'?[fontFormat(19, 'black', 'noto-zh'), '#fff']:['19px lato-bold', '#fff'],
							textFont2 : ['19px lato-regular', '#fff']
						}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.bonus : 'BONUS',
							payout : null,
							skewX : -22,
							scaleY: 0.7,
							x : 1005,
							y: window.language.locale === 'zh'? 19 : 19,
							width : 100,
							extraX : 0,
							extraY : 0,
							outline : 'no',
							color : '#fef4ad' ,
							textFont1 : window.language.locale === 'zh'?[fontFormat(25, 'black', 'noto-zh'), '#fef4ad'] : ['25px lato-bold', '#fef4ad'],
							textFont2 : ['22px lato-regular', '#fef4ad']
						}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.small : 'SMALL',
							payout : '1.5:1',
							skewX : -25,
							scaleY: 0.7,
							x : 1245,
							y: window.language.locale === 'zh'? 15 : 15,
							width : 80,
							extraX :window.language.locale === 'zh'? 10 : 7,
							extraY : 29,
							outline : 'no',
							color : '#fef4ad' ,
							textFont1 : window.language.locale === 'zh'?[fontFormat(20, 'black', 'noto-zh'), '#fef4ad'] : ['19px lato-bold', '#fef4ad'],
							textFont2 : ['20px lato-regular', '#fef4ad']
						}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.tie : 'TIE',
							tablename: 'tie',
							payout : '8:1',
							skewX : 0,
							scaleY: 0.65,
							x : window.language.locale ==='zh'? 650 : 660,
							y: window.language.locale ==='zh'? 72 : 80,
							width : 30,
							extraX : window.language.locale ==='zh'? 55 : 40,
							extraY : window.language.locale ==='zh'? 72 : 80,
							color : '#568c3f' ,
							textFont1 : window.language.locale === 'zh'?[fontFormat(40, 'black', 'noto-zh'), '#568c3f'] : ['24px lato-black', tie_txt_color],
							textFont2 : window.language.locale === 'zh'?[fontFormat(38, 'black', 'noto-zh'), '#568c3f'] : ['24px lato-regular', tie_txt_color]
						}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.banker : 'BANKER',
							tablename: 'banker',
							payout : null,
							skewX : 0,
							scaleY: 0.7,
							x : 674,
							y: window.language.locale ==='zh'? 110 : 120,
							width : 30,
							extraX : 0,
							extraY : 0,
							textFont1 : window.language.locale === 'zh'? [fontFormat(45, 'black', 'noto-zh'), '#b71b1c'] : ['24px lato-black', banker_txt_color],
						}, {
							text: window.language.locale === 'zh' ? window.language.game_specific.player : 'PLAYER',
							tablename: 'player',
							payout : null,
							skewX : 0,
							scaleY: 0.7,
							x : 674,
							y: window.language.locale ==='zh'? 153 : 160,
							width : 100,
							extraX : 0,
							extraY : 0,
							textFont1 : window.language.locale ==='zh' ? [fontFormat(45, 'black', 'noto-zh'), '#0c3397'] : ['24px lato-black', player_txt_color],
						} ],
			}
		},
		singleClassic() {
			let width = 1300;
			let height = 210;

			let outline_container = new createjs.Container();

			outline_container.x = (this.context.stage.baseWidth/2)  - (width/2);
			outline_container.y = this.context.stage.baseHeight /2 + 84;

			var line = new createjs.Shape();
			line.graphics.ss(2).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.2,0.8,1], 0,0,width,0)
			line.graphics.moveTo(0,0).lineTo(width,0)
			width = 1400;

			let startX = -100;
			line.graphics.ss(2).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0)

			line.graphics.moveTo(startX, height).lineTo(width, height);

			startX = 0;
			let areaWidth = 264;
			line.graphics.ss(2).s("#fff");
			line.graphics.moveTo(areaWidth,0).lineTo(startX + areaWidth - 78, height);

			startX = areaWidth;
			areaWidth = 258;
			line.graphics.ss(2).s("#fff");
			line.graphics.moveTo(startX + areaWidth,0).lineTo(startX + areaWidth - 28, height);

			startX = startX+areaWidth;
			areaWidth = 258;
			line.graphics.ss(2).s("#fff");
			line.graphics.moveTo(startX + areaWidth,0).lineTo(startX + areaWidth + 26, height);

			startX = startX+areaWidth;
			areaWidth = 258;
			line.graphics.ss(2).s("#fff");
			line.graphics.moveTo(startX + areaWidth,0).lineTo(startX + areaWidth + 78, height);
			outline_container.addChild(line);

			///texts
			var text, text2;
			let useKey = 'classic';
			for(var x = 0; x < this.textpreset[useKey].length; x++) {
				text = new createjs.Text(this.textpreset[useKey][x].text, ...this.textpreset[useKey][x].textFont1);

				text.set({x : this.textpreset[useKey][x].x,
					y : this.textpreset[useKey][x].y,
					textAlign:'center', textBaseline:'hanging',
					scaleY: this.textpreset[useKey][x].scaleY,
					skewX : this.textpreset[useKey][x].skewX,
					tablename : this.textpreset[useKey][x].tablename,
					lineWidth : this.textpreset[useKey][x].width});

				if(window.language.locale ==='zh') {
					if(this.textpreset[useKey][x].outline === undefined) {
						let text_clone = text.clone();
						outline_container.addChild(text_clone);
						text_clone.font = this.textpreset[useKey][x].textFont1[0];
						text_clone.color = this.textpreset[useKey][x].textFont1[1];

						text.outline = 1;
						text.color = "#fff";
					}
				}

				if(this.textpreset[useKey][x].payout) {
					text2 = new createjs.Text(this.textpreset[useKey][x].payout, ...this.textpreset[useKey][x].textFont2);
					text2.set({x : this.textpreset[useKey][x].x + this.textpreset[useKey][x].extraX ,
						y : text.getMeasuredHeight() + this.textpreset[useKey][x].extraY,
						textAlign:'center',
						textBaseline:'hanging',
						scaleY: this.textpreset[useKey][x].scaleY,
						skewX : this.textpreset[useKey][x].skewX,
						tablename : this.textpreset[useKey][x].tablename,
						lineWidth : this.textpreset[useKey][x].width});

					if(window.language.locale ==='zh') {
						if(this.textpreset[useKey][x].outline === undefined) {
							let text_clone = text2.clone();
							outline_container.addChild(text_clone);
							text_clone.font = this.textpreset[useKey][x].textFont2[0];
							text_clone.color = this.textpreset[useKey][x].textFont2[1];
							text2.outline = 1;
							text2.color = "#fff";
						}
					}
					outline_container.addChild(text2);
				}
				outline_container.addChild(text);
			}

			width = 1300;
			height = 210;
			outline_container.cache(-200,-50, width+400, height+100);
			return outline_container;
		},
		singleBonus() {
			let width = 1300;
			let height = 162;

			let outline_container = new createjs.Container();

			outline_container.x = (this.context.stage.baseWidth/2)  - (width/2);
			outline_container.y = this.context.stage.baseHeight /2 + 84;

			var line = new createjs.Shape();
			line.graphics.ss(2).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.2,0.8,1], 0,0,width,0)
			line.graphics.moveTo(0,0).lineTo(width,0)
			width = 1400;

			let startX = -100;
			line.graphics.ss(2).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0)

			line.graphics.moveTo(startX, height).lineTo(180, height);

			startX = startX + 180 + 276;
			line.graphics.moveTo(startX, height).lineTo(startX + 586, height);

			startX = startX + 586 + 176;
			line.graphics.moveTo(startX, height).lineTo(width, height);

			startX = 0;
			let areaWidth = 144;
			line.graphics.ss(2).s("#fff");
			line.graphics.moveTo(startX + areaWidth,0).lineTo(startX + areaWidth - 80, height);

			startX = startX + areaWidth;
			areaWidth = 178;
			line.graphics.ss(2).s("#fff");
			line.graphics.moveTo(startX + areaWidth,0).lineTo(startX + areaWidth - 28, height - 80);

			startX = startX + areaWidth;
			areaWidth = 222;
			line.graphics.ss(2).s("#fff");
			line.graphics.moveTo(startX + areaWidth,0).lineTo(startX + areaWidth - 20, height);

			startX = startX + areaWidth;
			areaWidth = 214;
			line.graphics.ss(2).s("#fff");
			line.graphics.moveTo(startX + areaWidth,0).lineTo(startX + areaWidth + 18, height);

			startX = startX + areaWidth;
			areaWidth = 222;
			line.graphics.ss(2).s("#fff");
			line.graphics.moveTo(startX + areaWidth,0).lineTo(startX + areaWidth + 24, height - 80);

			startX = startX + areaWidth;
			areaWidth = 176;
			line.graphics.ss(2).s("#fff");
			line.graphics.moveTo(startX + areaWidth,0).lineTo(startX + areaWidth + 82, height);

			let img1 = new createjs.Bitmap(this.context.getResources('banker_bonus'));
			img1.x = 930;
			img1.y = 80;
			let img2 = new createjs.Bitmap(this.context.getResources('player_bonus'));
			img2.x =175;
			img2.y =80;
			outline_container.addChild(img2, img1)

			outline_container.addChild(line);
			///texts
			var text, text2;
			let useKey = 'bonus';
			for(var x = 0; x < this.textpreset[useKey].length; x++) {
				text = new createjs.Text(this.textpreset[useKey][x].text, ...this.textpreset[useKey][x].textFont1);

				text.set({x : this.textpreset[useKey][x].x,
					y : this.textpreset[useKey][x].y,
					textAlign:'center', textBaseline:'hanging',
					scaleY: this.textpreset[useKey][x].scaleY,
					skewX : this.textpreset[useKey][x].skewX,
					tablename : this.textpreset[useKey][x].tablename,
					lineWidth : this.textpreset[useKey][x].width});

				if(window.language.locale ==='zh') {
					if(this.textpreset[useKey][x].outline === undefined) {
						let text_clone = text.clone();
						outline_container.addChild(text_clone);
						text_clone.font = this.textpreset[useKey][x].textFont1[0];
						text_clone.color = this.textpreset[useKey][x].textFont1[1];

						text.outline = 1;
						text.color = "#fff";
					}
				}

				if(this.textpreset[useKey][x].payout) {
					text2 = new createjs.Text(this.textpreset[useKey][x].payout, ...this.textpreset[useKey][x].textFont2);
					text2.set({x : this.textpreset[useKey][x].x + this.textpreset[useKey][x].extraX ,
						y : text.getMeasuredHeight() + this.textpreset[useKey][x].extraY,
						textAlign:'center',
						textBaseline:'hanging',
						scaleY: this.textpreset[useKey][x].scaleY,
						skewX : this.textpreset[useKey][x].skewX,
						lineWidth : this.textpreset[useKey][x].width});

					if(window.language.locale ==='zh') {
						if(this.textpreset[useKey][x].outline === undefined) {
							let text_clone = text2.clone();
							outline_container.addChild(text_clone);
							text_clone.font = this.textpreset[useKey][x].textFont2[0];
							text_clone.color = this.textpreset[useKey][x].textFont2[1];
							text2.outline = 1;
							text2.color = "#fff";
						}
					}
					outline_container.addChild(text2);
				}
				outline_container.addChild(text);
			}

			width = 1300;
			height = 162;
			return outline_container;
		},
		singleSuper() {
			let width = 1300;
			let height = 210;

			let outline_container = new createjs.Container();

			outline_container.x = (this.context.stage.baseWidth/2)  - (width/2);
			outline_container.y = this.context.stage.baseHeight /2 + 84;

			var line = new createjs.Shape();
			line.graphics.ss(2).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.2,0.8,1], 0,0,width,0)
			line.graphics.moveTo(0,0).lineTo(width,0)
			width = 1400;

			let startX = -100;
			line.graphics.ss(2).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0)

			line.graphics.moveTo(startX, height).lineTo(width, height);

			startX = 0;
			let areaWidth = 264;
			line.graphics.ss(2).s("#fff");
			line.graphics.moveTo(areaWidth,0).lineTo(startX + areaWidth - 78, height);

			startX = areaWidth;
			areaWidth = 258;
			line.graphics.ss(2).s("#fff");
			line.graphics.moveTo(startX + areaWidth,0).lineTo(startX + areaWidth - 28, height);

			startX = startX+areaWidth;
			areaWidth = 258;
			line.graphics.ss(2).s("#fff");
			line.graphics.moveTo(startX + areaWidth,0).lineTo(startX + areaWidth + 26, height);

			areaWidth = 258;
			line.graphics.ss(2).s("#fff");
			line.graphics.moveTo(startX-12,100).lineTo(startX + areaWidth + 12, 100);

			startX = startX+areaWidth;
			areaWidth = 258;
			line.graphics.ss(2).s("#fff");
			line.graphics.moveTo(startX + areaWidth,0).lineTo(startX + areaWidth + 78, height);

			outline_container.addChild(line);

			///texts
			var text, text2;
			let useKey = 'supersix';
			for(var x = 0; x < this.textpreset[useKey].length; x++) {
				text = new createjs.Text(this.textpreset[useKey][x].text, ...this.textpreset[useKey][x].textFont1);

				text.set({x : this.textpreset[useKey][x].x,
					y : this.textpreset[useKey][x].y,
					textAlign:'center', textBaseline:'hanging',
					scaleY: this.textpreset[useKey][x].scaleY,
					skewX : this.textpreset[useKey][x].skewX,
					tablename : this.textpreset[useKey][x].tablename,
					lineWidth : this.textpreset[useKey][x].width});

				if(window.language.locale ==='zh') {
					if(this.textpreset[useKey][x].outline === undefined) {
						let text_clone = text.clone();
						outline_container.addChild(text_clone);
						text_clone.font = this.textpreset[useKey][x].textFont1[0];
						text_clone.color = this.textpreset[useKey][x].textFont1[1];

						text.outline = 1;
						text.color = "#fff";
					}
				}

				if(this.textpreset[useKey][x].payout) {
					text2 = new createjs.Text(this.textpreset[useKey][x].payout, ...this.textpreset[useKey][x].textFont2);
					text2.set({x : this.textpreset[useKey][x].x + this.textpreset[useKey][x].extraX ,
						y : text.getMeasuredHeight() + this.textpreset[useKey][x].extraY,
						textAlign:'center',
						textBaseline:'hanging',
						scaleY: this.textpreset[useKey][x].scaleY,
						skewX : this.textpreset[useKey][x].skewX,
						tablename : this.textpreset[useKey][x].tablename,
						lineWidth : this.textpreset[useKey][x].width});

					if(window.language.locale ==='zh') {
						if(this.textpreset[useKey][x].outline === undefined) {
							let text_clone = text2.clone();
							outline_container.addChild(text_clone);
							text_clone.font = this.textpreset[useKey][x].textFont2[0];
							text_clone.color = this.textpreset[useKey][x].textFont2[1];
							text2.outline = 1;
							text2.color = "#fff";
						}
					}
					outline_container.addChild(text2);
				}
				outline_container.addChild(text);
			}

			var img = new createjs.Bitmap(this.context.getResources("super6_icon"));
			img.set({x:618,y:120});
			outline_container.addChild(img);

			width = 1300;
			height = 210;
			outline_container.cache(-200,-50, width+400, height+100);
			return outline_container;
		},
		multiClassic() {
			let width = 1350;
			let height = 200;
			let startX = 0;

			let outline_container = new createjs.Container();
			outline_container.x = (this.context.stage.baseWidth/2)  - (width/2);
			outline_container.y = this.context.stage.baseHeight /2 + 84;

			var line = new createjs.Shape();

			line.graphics.ss(2).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.2,0.8,1], 0,0,width,0)
			line.graphics.moveTo(0,0).lineTo(width,0)

			startX = startX - 22;
			width = width + 22;
			height = 46;
			line.graphics.ss(2).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);

			startX = startX - 22;
			width = width + 22;
			height = height + 46;
			line.graphics.ss(2).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);

			startX = startX - 26;
			width = width + 26;
			height = height + 46;
			line.graphics.ss(2).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);

			startX = startX - 30;
			width = width + 30;
			height = height + 54;
			line.graphics.ss(2).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);

			//player pair banker pair part
			height = 30;
			startX = 0;
			width = 74;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 10, height + 16);

			width = width + 88;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 8, height + 16);

			width = width + 87;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 6.5, height + 16);

			width = width + 164;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 4.5, height + 16);

			width = width + 87;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 3, height + 16);

			width = width + 87;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 1.8, height + 16);

			width = width + 174;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 1.8, height + 16);

			width = width + 87;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 3, height + 16);

			width = width + 87;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 4.5, height + 16);

			width = width + 164;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 6.5, height + 16);

			width = width + 87;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 8, height + 16);

			width = width + 88;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 10, height + 16);

			// middle line
			height = 0;
			width = 1350/2;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width, height + 46);
			///
			height = 46;
			startX = 0;
			width = 164;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 3, height +6);

			width = width + 190;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 1.5, height +6);

			width = width + 188;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 1, height +6);

			width = width + 266;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 0.8, height +6);

			width = width + 188;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 1.5, height +6);

			width = width + 190;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 3, height +6);

			//
			height = height + 37;
			width = 148;
			startX = 0;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 8, height +16);

			startX = 0;
			width = width+194;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 5, height +16);

			startX = 0;
			width = width+196;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 2, height +16);

			startX = 0;
			width = width+275;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 2, height +16);

			startX = 0;
			width = width+196;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 5, height +16);

			startX = 0;
			width = width+196;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 8, height +16);

			///
			height = height + 48;
			width = 124;
			startX = 0;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 8, height +16);

			width = width + 202;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 5, height +16);

			width = width + 206;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 2.5, height +16);

			width = width + 286;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 2, height +16);

			width = width + 205;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 5, height +16);

			width = width + 203;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 8, height +16);

			///
			height = height + 52;
			startX = 0;
			width = 98;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 4, height +8);

			width = width + 212;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 3, height +8);

			width = width + 215;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 1.2, height +8);

			width = width + 300;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 1.2, height +8);

			width = width + 215;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 2.8, height +8);

			width = width + 212;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 4, height +8);

			outline_container.addChild(line);

			outline_container.texts = [];
			///texts
			var text, text2;
			let useKey = 'classic';
			for(var x = 0; x < this.multitextpreset[useKey].length; x++) {
				text = new createjs.Text(this.multitextpreset[useKey][x].text, ...this.multitextpreset[useKey][x].textFont1);

				text.set({x : this.multitextpreset[useKey][x].x,
					y : this.multitextpreset[useKey][x].y,
					textAlign:'center', textBaseline:'hanging',
					scaleY: this.multitextpreset[useKey][x].scaleY,
					skewX : this.multitextpreset[useKey][x].skewX,
					lineWidth : this.multitextpreset[useKey][x].width});
					outline_container.texts.push(text);

				if(window.language.locale ==='zh') {
					if(this.multitextpreset[useKey][x].outline === undefined) {
						let text_clone = text.clone();
						outline_container.addChild(text_clone);
						text_clone.font = this.multitextpreset[useKey][x].textFont1[0];
						text_clone.color = this.multitextpreset[useKey][x].textFont1[1];

						text.outline = 1;
						text.color = "#fff";
					}
				}

				if(this.multitextpreset[useKey][x].payout) {
					text2 = new createjs.Text(this.multitextpreset[useKey][x].payout, ...this.multitextpreset[useKey][x].textFont2);
					text2.set({
						x : this.multitextpreset[useKey][x].x + this.multitextpreset[useKey][x].extraX ,
						y : this.multitextpreset[useKey][x].extraY,
						textAlign:'center',
						textBaseline:'hanging',
						scaleY: this.multitextpreset[useKey][x].scaleY,
						skewX : this.multitextpreset[useKey][x].skewX});

					if(window.language.locale ==='zh') {
						if(this.multitextpreset[useKey][x].outline === undefined) {
							let text_clone = text2.clone();
							outline_container.addChild(text_clone);
							text_clone.font = this.multitextpreset[useKey][x].textFont2[0];
							text_clone.color = this.multitextpreset[useKey][x].textFont2[1];
							text2.outline = 1;
							text2.color = "#fff";
						}
					}
					outline_container.addChild(text2);
				}
				outline_container.addChild(text);
			}

				//number texts
			//playerpair banker pair
			let users = ['1','2','3','5','6','7','8'];
			let aWidth = 85;
			let skewX = 32;
			var text = [];
			for(var x = 0; x < users.length; x++) {
				text[x] = new createjs.Text(users[x], '14px lato-black', '#fff');

				if(users[x] === '5') {
					aWidth = 118;
				} else if (users[x] === '6') {
					aWidth = 125;
				} else {
					aWidth = 90;
				}

				text[x].x = x > 0 ? text[x-1].x + aWidth : 30;

				text[x].y = 38;
				text[x].scaleY = 0.8;
				text[x].skewX = skewX;
				skewX-=4;

				text[x].textAlign = "center";
				text[x].textBaseline = "middle";

				outline_container.addChild(text[x]);
			}

			skewX = 0;
			for(var x = 0; x < users.length; x++) {
				text[x] = new createjs.Text(users[x], '14px lato-black', '#fff');

				if(users[x] === '5') {
					aWidth = 115;
				} else if (users[x] === '6') {
					aWidth = 125;
				} else {
					aWidth = 90;
				}

				text[x].x = x > 0 ? text[x-1].x + aWidth : 720;

				text[x].y = 38;
				text[x].scaleY = 0.8;
				text[x].skewX = skewX;
				skewX-=4;

				text[x].textAlign = "center";
				text[x].textBaseline = "middle";

				outline_container.addChild(text[x]);
			}

			////tie
			users = ['1','2','3','6','7','8'];
			aWidth = 190;
			skewX = 30;
			for(var x = 0; x < users.length; x++) {
				text[x] = new createjs.Text(users[x], '14px lato-black', '#fff');

				if(users[x] === '6') aWidth = 470;
				else aWidth = 190;

				text[x].x = x > 0 ? text[x-1].x + aWidth : 58;

				text[x].y = 26+58;
				text[x].scaleY = 0.8;
				text[x].skewX = skewX;
				skewX -= 10;

				if(users[x] === '3') {
					skewX = -10;
				}

				text[x].textAlign = "center";
				text[x].textBaseline = "middle";

				outline_container.addChild(text[x]);
			}


			// users = ['1','2','3','6','7','8'];
			// aWidth = 200;
			// skewX = 30;
			// for(var x = 0; x < users.length; x++) {
			// 	text[x] = new createjs.Text("BANKER", '18px lato-black', '#fff');
			//
			// 	if(users[x] === '6') aWidth = 490;
			// 	else aWidth = 200;
			//
			// 	text[x].x = x > 0 ? text[x-1].x + aWidth : 0;
			//
			// 	text[x].y = 116;
			// 	text[x].scaleY = 0.8;
			// 	text[x].skewX = skewX;
			// 	skewX -= 10;
			//
			// 	if(users[x] === '3') {
			// 		skewX = -10;
			// 	}
			//
			// 	text[x].textAlign = "center";
			// 	text[x].textBaseline = "middle";
			//
			// 	outline_container.addChild(text[x]);
			// }


			width = 1350;
			height = 200;
			outline_container.cache(-200,-50, width+400, height+100);

			return outline_container;
		},
		multiBonus() {
			return new createjs.Shape();

			let width = 1350;
			let height = 200;
			let startX = 0;

			let outline_container = new createjs.Container();
			outline_container.x = (this.context.stage.baseWidth/2)  - (width/2);
			outline_container.y = this.context.stage.baseHeight /2 + 84;

			var line = new createjs.Shape();

			width = 430;
			height = 6;
			startX = 0;
			line.graphics.ss(1).beginLinearGradientStroke(['rgba(255,255,255,0)','#ecdc7d', '#dac06c'], [0,0.5,1], startX,0,width,0);
			line.graphics.moveTo(startX + 16, height).lineTo(width, height).lineTo(width - 11, height + 42).lineTo(startX, height + 42);

			startX = 920;
			line.graphics.ss(1).beginLinearGradientStroke(['#dac06c', '#ecdc7d','rgba(255,255,255,0)'], [0,0.5,1], startX,0,startX+width,0);
			line.graphics.moveTo(startX, height).lineTo(startX+width - 16, height)
			.moveTo(startX+width, height + 42)
			.lineTo(startX + 10, height + 42).lineTo(startX, height);
			////
			startX = 450;
			width = 216;
			line.graphics.ss(1).s("#fff").moveTo(startX,height).lineTo(startX+width, height)
			.lineTo(startX+width, height+42).lineTo(startX-10, height+42).lineTo(startX, height);

			startX = startX+width+ 20;
			width = 216;
			line.graphics.ss(1).s("#fff").moveTo(startX,height).lineTo(startX+width, height)
			.lineTo(startX+width+8, height+42).lineTo(startX, height+42).lineTo(startX, height);
			///

			width = 1350
			startX = -22;
			width = width + 22;
			height = 66;
			line.graphics.ss(1).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);

			startX = startX - 22;
			width = width + 22;
			height = height + 42;
			line.graphics.ss(1).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);

			startX = startX - 26;
			width = width + 26;
			height = height + 40;
			line.graphics.ss(1).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);

			startX = startX - 26;
			width = width + 26;
			height = height + 46;
			line.graphics.ss(1).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);
			///
			height = 68;
			startX = 0;
			width = 164;
			width -= 10
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 3, height +6);

			width = width + 190;
			width += 2
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 1.5, height +6);

			width = width + 188;
			width += 4
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 1, height +6);

			width = width + 266;
			width += 6
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 0.8, height +6);

			width = width + 188;
			width += 6
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 1.5, height +6);

			width = width + 190;
			width += 4
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 3, height +6);

			//
			height = height + 37;
			width = 148;
			height -= 6
			width -= 8;
			startX = 0;
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 8, height +16);

			startX = 0;
			width = width+194;
			width += 2
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 5, height +16);

			startX = 0;
			width = width+196;
			width += 3
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 2, height +16);

			startX = 0;
			width = width+275;
			width += 6
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 2, height +16);

			startX = 0;
			width = width+196;
			width += 2
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 5, height +16);

			startX = 0;
			width = width+196;
			width += 2
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 8, height +16);

			///
			height = height + 48;
			width = 124;
			height -= 8
			width -= 4;
			startX = 0;
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 8, height +16);

			width = width + 202;
			width += 2
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 5, height +16);

			width = width + 206;
			width += 2
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 2.5, height +16);

			width = width + 286;
			width += 2
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 2, height +16);

			width = width + 205;
			width += 2
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 5, height +16);

			width = width + 203;
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 8, height +16);

			///
			height = height + 52;
			height -= 6
			startX = 0;
			width = 98;
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 4, height +8);

			width = width + 212;
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 3, height +8);

			width = width + 215;
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 1.2, height +8);

			width = width + 300;
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 1.2, height +8);

			width = width + 215;
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 2.8, height +8);

			width = width + 212;
			line.graphics.ss(0.5).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 4, height +8);

			outline_container.addChild(line);

			var img = new createjs.Bitmap(this.context.getResources('bonus_left'));
			img.set({x : 162, y : -4})
			outline_container.addChild(img);

			var img2 = new createjs.Bitmap(this.context.getResources('bonus_right'));
			img2.set({x : 1080, y : -4})
			outline_container.addChild(img2);

			///texts
			var text1, text2;
			let useKey = 'bonus';
			for(var x = 0; x < this.multitextpreset[useKey].length; x++) {
				text1 = new createjs.Text(this.multitextpreset[useKey][x].text, ...this.multitextpreset[useKey][x].textFont1);

				text1.set({x : this.multitextpreset[useKey][x].x,
					y : this.multitextpreset[useKey][x].y,
					textAlign:'center', textBaseline:'hanging',
					scaleY: this.multitextpreset[useKey][x].scaleY,
					skewX : this.multitextpreset[useKey][x].skewX,
					lineWidth : this.multitextpreset[useKey][x].width});

				if(window.language.locale ==='zh') {
					if(this.multitextpreset[useKey][x].outline === undefined) {
						let text_clone = text1.clone();
						outline_container.addChild(text_clone);
						text_clone.font = this.multitextpreset[useKey][x].textFont1[0];
						text_clone.color = this.multitextpreset[useKey][x].textFont1[1];

						text1.outline = 1;
						text1.color = "#fff";
					}
				}

				if(this.multitextpreset[useKey][x].payout) {
					text2 = new createjs.Text(this.multitextpreset[useKey][x].payout, ...this.multitextpreset[useKey][x].textFont2);
					text2.set({
						x : this.multitextpreset[useKey][x].x + this.multitextpreset[useKey][x].extraX ,
						y : this.multitextpreset[useKey][x].extraY,
						textAlign:'center',
						textBaseline:'hanging',
						scaleY: this.multitextpreset[useKey][x].scaleY,
						skewX : this.multitextpreset[useKey][x].skewX});

					if(window.language.locale ==='zh') {
						if(this.multitextpreset[useKey][x].outline === undefined) {
							let text_clone = text2.clone();
							outline_container.addChild(text_clone);
							text_clone.font = this.multitextpreset[useKey][x].textFont2[0];
							text_clone.color = this.multitextpreset[useKey][x].textFont2[1];
							text2.outline = 1;
							text2.color = "#fff";
						}
					}
					outline_container.addChild(text2);
				}
				outline_container.addChild(text1);
			}

				////tie
			let users = ['1','2','3','6','7','8'];
			let aWidth = 200;
			let skewX = 30;
			let text = [];
			for(var x = 0; x < users.length; x++) {
				text[x] = new createjs.Text(users[x], '14px lato-black', '#fff');

				if(users[x] === '6') aWidth = 476;
				else aWidth = 200;

				text[x].x = x > 0 ? text[x-1].x + aWidth : 40;

				text[x].y = 26+73;
				text[x].scaleY = 0.8;
				text[x].skewX = skewX;
				skewX -= 10;

				if(users[x] === '3') {
					skewX = -10;
				}

				text[x].textAlign = "center";
				text[x].textBaseline = "middle";

				outline_container.addChild(text[x]);
			}

			width = 1350;
			height = 200;
			outline_container.cache(-200,-50, width+400, height+100);

			return outline_container;
		},
		multiSuper() {
			let width = 1350;
			let height = 200;
			let startX = 0;

			let outline_container = new createjs.Container();
			outline_container.x = (this.context.stage.baseWidth/2)  - (width/2);
			outline_container.y = this.context.stage.baseHeight /2 + 84;

			var line = new createjs.Shape();

			line.graphics.ss(2).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.2,0.8,1], 0,0,width,0)
			line.graphics.moveTo(0,0).lineTo(width,0)

			startX = startX - 22;
			width = width + 22;
			height = 46;
			line.graphics.ss(2).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);

			startX = startX - 22;
			width = width + 22;
			height = height + 46;
			line.graphics.ss(2).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);

			startX = startX - 26;
			width = width + 26;
			height = height + 46;
			line.graphics.ss(2).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);

			startX = startX - 30;
			width = width + 30;
			height = height + 54;
			line.graphics.ss(2).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);

			//player pair banker pair part
			height = 30;
			startX = 0;
			width = 74;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 10, height + 16);

			width = width + 88;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 8, height + 16);

			width = width + 87;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 6.5, height + 16);

			width = width + 164;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 4.5, height + 16);

			width = width + 87;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 3, height + 16);

			width = width + 87;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 1.8, height + 16);

			width = width + 174;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 1.8, height + 16);

			width = width + 87;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 3, height + 16);

			width = width + 87;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 4.5, height + 16);

			width = width + 164;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 6.5, height + 16);

			width = width + 87;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 8, height + 16);

			width = width + 88;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 10, height + 16);

			// middle line
			height = 0;
			width = 1350/2;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width, height + 46);
			///
			height = 46;
			startX = 0;
			width = 164;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 3, height +6);

			width = width + 190;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 1.5, height +6);

			width = width + 188;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 1, height +6);

			width = width + 266;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 0.8, height +6);

			width = width + 188;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 1.5, height +6);

			width = width + 190;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 3, height +6);

			//
			height = height + 37;
			width = 148;
			startX = 0;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 8, height +16);

			startX = 0;
			width = width+194;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 5, height +16);

			startX = 0;
			width = width+196;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 2, height +16);

			startX = 0;
			width = width+275;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 2, height +16);

			startX = 0;
			width = width+196;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 5, height +16);

			startX = 0;
			width = width+196;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 8, height +16);

			///
			height = height + 48;
			width = 124;
			startX = 0;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 8, height +16);

			width = width + 202;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 5, height +16);

			width = width + 206;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 2.5, height +16);

			width = width + 286;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 2, height +16);

			width = width + 205;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 5, height +16);

			width = width + 203;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 8, height +16);

			///
			height = height + 52;
			startX = 0;
			width = 98;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 4, height +8);

			width = width + 212;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 3, height +8);

			width = width + 215;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width - 1.2, height +8);

			width = width + 300;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 1.2, height +8);

			width = width + 215;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 2.8, height +8);

			width = width + 212;
			line.graphics.ss(1).s('#fff').moveTo(startX+width, height).lineTo(startX+width + 4, height +8);

			outline_container.addChild(line);

			var supersix = [
			{x:80, skewX : 28},
			{x:265, skewX : 20},
			{x:465, skewX : 11},
			{x:705 + 6, skewX : -4},
			{x:940, skewX: -18},
			{x:1140, skewX: -24},
			{x:1330, skewX: -30}];

			for(var x = 0;x < 7; x++) {
				var d = new createjs.Container();

				var w = 45;
				if(x === 3) w = 70;
				var border = new createjs.Shape();
				border.graphics.ss(0.6).s('#fdc13b').drawRoundRect(0,0,w,30,3);

				var textsix = new createjs.Text('6', '24px lato-black', '#fdc13b');
				textsix.textAlign = 'center';
				textsix.textBaseline = 'middle';
				textsix.x = border.x + (w/2)
				textsix.y = border.y + 15

				d.set({x:  supersix[x].x, y : 100, skewX : supersix[x].skewX ? supersix[x].skewX : 0});
				d.addChild(border, textsix);
				outline_container.addChild(d);
			}

			outline_container.texts = [];

			///texts
			var text, text2;
			let useKey = 'supersix';
			for(var x = 0; x < this.multitextpreset[useKey].length; x++) {
				text = new createjs.Text(this.multitextpreset[useKey][x].text, ...this.multitextpreset[useKey][x].textFont1);

				text.set({x : this.multitextpreset[useKey][x].x,
					y : this.multitextpreset[useKey][x].y,
					textAlign:'center', textBaseline:'hanging',
					scaleY: this.multitextpreset[useKey][x].scaleY,
					skewX : this.multitextpreset[useKey][x].skewX,
					lineWidth : this.multitextpreset[useKey][x].width});

				if(window.language.locale ==='zh') {
					if(this.multitextpreset[useKey][x].outline === undefined) {
						let text_clone = text.clone();
						outline_container.addChild(text_clone);
						text_clone.font = this.multitextpreset[useKey][x].textFont1[0];
						text_clone.color = this.multitextpreset[useKey][x].textFont1[1];

						text.outline = 1;
						text.color = "#fff";
						outline_container.texts.push(text_clone);
					}
				}

				outline_container.texts.push(text);

				if(this.multitextpreset[useKey][x].payout) {
					text2 = new createjs.Text(this.multitextpreset[useKey][x].payout, ...this.multitextpreset[useKey][x].textFont2);
					text2.set({
						x : this.multitextpreset[useKey][x].x + this.multitextpreset[useKey][x].extraX ,
						y : this.multitextpreset[useKey][x].extraY,
						textAlign:'center',
						textBaseline:'hanging',
						scaleY: this.multitextpreset[useKey][x].scaleY,
						skewX : this.multitextpreset[useKey][x].skewX});

					if(window.language.locale ==='zh') {
						if(this.multitextpreset[useKey][x].outline === undefined) {
							let text_clone = text2.clone();
							outline_container.addChild(text_clone);
							text_clone.font = this.multitextpreset[useKey][x].textFont2[0];
							text_clone.color = this.multitextpreset[useKey][x].textFont2[1];
							text2.outline = 1;
							text2.color = "#fff";
						}
					}
					outline_container.addChild(text2);
				}
				outline_container.addChild(text);
			}

			//number texts
			//playerpair banker pair
			let users = ['1','2','3','5','6','7','8'];
			let aWidth = 85;
			let skewX = 32;
			var text = [];
			for(var x = 0; x < users.length; x++) {
				text[x] = new createjs.Text(users[x], '14px lato-black', '#fff');

				if(users[x] === '5') {
					aWidth = 118;
				} else if (users[x] === '6') {
					aWidth = 125;
				} else {
					aWidth = 90;
				}

				text[x].x = x > 0 ? text[x-1].x + aWidth : 30;

				text[x].y = 38;
				text[x].scaleY = 0.8;
				text[x].skewX = skewX;
				skewX-=4;

				text[x].textAlign = "center";
				text[x].textBaseline = "middle";

				outline_container.addChild(text[x]);
			}

			skewX = 0;
			for(var x = 0; x < users.length; x++) {
				text[x] = new createjs.Text(users[x], '14px lato-black', '#fff');

				if(users[x] === '5') {
					aWidth = 115;
				} else if (users[x] === '6') {
					aWidth = 125;
				} else {
					aWidth = 90;
				}

				text[x].x = x > 0 ? text[x-1].x + aWidth : 720;

				text[x].y = 38;
				text[x].scaleY = 0.8;
				text[x].skewX = skewX;
				skewX-=4;

				text[x].textAlign = "center";
				text[x].textBaseline = "middle";

				outline_container.addChild(text[x]);
			}

			////tie
			users = ['1','2','3','6','7','8'];
			aWidth = 190;
			skewX = 30;
			for(var x = 0; x < users.length; x++) {
				text[x] = new createjs.Text(users[x], '14px lato-black', '#fff');

				if(users[x] === '6') aWidth = 470;
				else aWidth = 190;

				text[x].x = x > 0 ? text[x-1].x + aWidth : 58;

				text[x].y = 26+58;
				text[x].scaleY = 0.8;
				text[x].skewX = skewX;
				skewX -= 10;

				if(users[x] === '3') {
					skewX = -10;
				}

				text[x].textAlign = "center";
				text[x].textBaseline = "middle";

				outline_container.addChild(text[x]);
			}


			users = ['1','2','3','6','7','8'];
			aWidth = 200;
			skewX = 30;
			for(var x = 0; x < users.length; x++) {

				if(window.language.locale === 'zh') {
					text[x] = new createjs.Text(window.language.game_specific.banker, fontFormat(35, 'black', 'noto-zh'), '#b71b1c');
				} else {
					text[x] = new createjs.Text("BANKER", '18px lato-black', 'rgba(209,47,47,1)');
				}

				if(users[x] === '6') aWidth = 480;
				else if(users[x] === '2') aWidth = 185;
				else aWidth = 200;

				text[x].x = x > 0 ? text[x-1].x + aWidth : 0;

				text[x].y = 116;
				text[x].scaleY = 0.8;
				text[x].skewX = skewX;
				skewX -= 10;

				if(users[x] === '3') {
					skewX = -10;
				}

				text[x].textAlign = "center";
				text[x].textBaseline = "middle";

				outline_container.addChild(text[x]);
				if(window.language.locale === 'zh') {
					let clonetext = text[x].clone();
					clonetext.outline = 1;
					clonetext.color = "#fff";
					outline_container.addChild(clonetext);
				}
			}


			width = 1350;
			height = 200;
			outline_container.cache(-200,-50, width+400, height+100);
			return outline_container;
		}
	})

	return instance
}
