import {createSprite, randomNum, getSlaveParam, fontFormat} from '../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		main() {
			this.textpreset = {
				classic : [{
					text: window.language.locale === 'zh' ? window.language2.poker_betlayout_ante : 'ANTE',
					scaleY: 0.7,
					skewX : 0,
					x : 479,
					y: 59,
					width : 120,
					textFont1 : window.language.locale === 'zh'? ['35px noto-zh-black', '#fff']: [fontFormat(33, 'black', 'lato', false), '#fff']
				}, {
					text: window.language.locale === 'zh' ? window.language2.poker_betlayout_flop : 'FLOP',
					scaleY: 0.7,
					skewX : -10,
					x : 883 - 65,
					y: 59,
					width : 120,
					textFont1 : window.language.locale === 'zh'? ['35px noto-zh-black', '#fff']: [fontFormat(33, 'black', 'lato', false), '#fff']
				}, {
					text: window.language.locale === 'zh' ? window.language2.poker_betlayout_turn : 'TURN',
					scaleY: 0.7,
					skewX : -14,
					x : 1097 - 65,
					y: 59,
					width : 120,
					textFont1 : window.language.locale === 'zh'? ['35px noto-zh-black', '#fff']: [fontFormat(33, 'black', 'lato', false), '#fff']
				}, {
					text: window.language.locale === 'zh' ? window.language2.poker_betlayout_river : 'RIVER',
					scaleY: 0.7,
					skewX : -20,
					x : 1314 - 65,
					y: 59,
					width : 120,
					textFont1 : window.language.locale === 'zh'? ['35px noto-zh-black', '#fff']: [fontFormat(33, 'black', 'lato', false), '#fff']
				}],
			}
		},
		singleClassic() {
			let width = 1300;
			let height = 170;

			let outline_container = new createjs.Container();

			outline_container.x = (this.context.stage.baseWidth/2)  - (width/2);
			outline_container.y = this.context.stage.baseHeight /2 + 180;

			///texts
			var text, text2;
			let useKey = 'classic';
			for(var x = 0; x < this.textpreset[useKey].length; x++) {
				console.log("font1", this.textpreset[useKey][x]);
				text = new createjs.Text(this.textpreset[useKey][x].text, ...this.textpreset[useKey][x].textFont1);

				text.set({x : this.textpreset[useKey][x].x,
					y : this.textpreset[useKey][x].y,
					textAlign:'center', textBaseline:'hanging',
					scaleY: this.textpreset[useKey][x].scaleY,
					skewX : this.textpreset[useKey][x].skewX,
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
					outline_container.addChild(text);
				}

				width = 1300;
				height = 170;
				outline_container.cache(-200,-50, width+400, height+100);
				return outline_container;
			}

		})

		return instance
	}
