import {createSprite, randomNum, getSlaveParam, fontFormat} from '../../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		main() {
			let player_txt_color =  '#1981f7';
      let banker_txt_color = 'rgba(209,47,47,1)';
      let tie_txt_color = 'rgba(104, 159, 56,1)';
			this.textpreset = {
				portrait : {
					classic : [
						{
							tablename: '',
							text: window.language.locale === 'zh' ? window.language.game_specific.player : 'PLAYER',
							textFont1 : window.language.locale ==='zh'?[fontFormat(55, 'black', 'noto-zh'), '#0f46a1'] : ['28px lato-black', player_txt_color],
							textFont2 :window.language.locale ==='zh'? [fontFormat(25, 'black', 'noto-zh'), '#0f46a1']: ['28px lato-regular', player_txt_color],
							x : 140,
							y : 16,
							width : 30
						},
						{
							tablename: '',
							text: window.language.locale === 'zh' ? window.language.game_specific.playerpair : 'PLAYER PAIR',
							textFont1 : window.language.locale ==='zh'?[fontFormat(55, 'black', 'noto-zh'), '#0f46a1'] : ['28px lato-black', player_txt_color],
							textFont2 :window.language.locale ==='zh'? [fontFormat(25, 'black', 'noto-zh'), '#0f46a1']: ['28px lato-regular', player_txt_color],
							x : 140,
							y : 230,
							width : 30,
							payout : '11:1',
							extraX : 140,
							extraY : window.language.locale === 'zh'? 230+40 : 230+30
						},
						{
							tablename: '',
							text: window.language.locale === 'zh' ? window.language.game_specific.tie : 'TIE',
							textFont1 : window.language.locale ==='zh'?[fontFormat(55, 'black', 'noto-zh'), '#578b3e'] : ['28px lato-black', tie_txt_color],
							textFont2 :window.language.locale ==='zh'? [fontFormat(25, 'black', 'noto-zh'), '#578b3e']: ['28px lato-regular', tie_txt_color],
							x : 350,
							y : 16,
							width : 30,
							payout : '8:1',
							extraX : 350,
							extraY : window.language.locale === 'zh'? 16 + 30 : 16
						},
						{
							tablename: '',
							text: window.language.locale === 'zh' ? window.language.game_specific.banker : 'BANKER',
							textFont1 : window.language.locale ==='zh'?[fontFormat(55, 'black', 'noto-zh'), '#b7211f'] : ['28px lato-black', banker_txt_color],
							textFont2 :window.language.locale ==='zh'? [fontFormat(25, 'black', 'noto-zh'), '#b7211f']: ['28px lato-regular', banker_txt_color],
							x : 550,
							y : 16,
							width : 30
						},
						{
							tablename: '',
							text: window.language.locale === 'zh' ? window.language.game_specific.bankerpair : 'BANKER PAIR',
							textFont1 : window.language.locale ==='zh'?[fontFormat(55, 'black', 'noto-zh'), '#b7211f'] : ['28px lato-black', banker_txt_color],
							textFont2 :window.language.locale ==='zh'? [fontFormat(25, 'black', 'noto-zh'), '#b7211f']: ['28px lato-regular', banker_txt_color],
							x : 550,
							y : 230,
							width : 30,
							payout : '11:1',
							extraX : 550,
							extraY : window.language.locale === 'zh'? 230+40 : 230 + 30
						}
					],
					supersix : [
						{
							tablename: '',
							text: window.language.locale === 'zh' ? window.language.game_specific.player : 'PLAYER',
							textFont1 : window.language.locale ==='zh'?[fontFormat(55, 'black', 'noto-zh'), '#0f46a1'] : ['28px lato-black', player_txt_color],
							textFont2 :window.language.locale ==='zh'? [fontFormat(25, 'black', 'noto-zh'), '#0f46a1']: ['28px lato-regular', player_txt_color],
							x : 140,
							y : 16,
							width : 30
						},
						{
							tablename: '',
							text: window.language.locale === 'zh' ? window.language.game_specific.playerpair : 'PLAYER PAIR',
							textFont1 : window.language.locale ==='zh'?[fontFormat(55, 'black', 'noto-zh'), '#0f46a1'] : ['28px lato-black', player_txt_color],
							textFont2 :window.language.locale ==='zh'? [fontFormat(25, 'black', 'noto-zh'), '#0f46a1']: ['28px lato-regular', player_txt_color],
							x : 140,
							y : 230,
							width : 30,
							width : 30,
							payout : '11:1',
							extraX : 140,
							extraY : 230 + 30
						},
						{
							tablename: '',
							text: window.language.locale === 'zh' ? window.language.game_specific.tie : 'TIE',
							textFont1 : window.language.locale ==='zh'?[fontFormat(55, 'black', 'noto-zh'), '#578b3e'] : ['28px lato-black', tie_txt_color],
							textFont2 :window.language.locale ==='zh'? [fontFormat(25, 'black', 'noto-zh'), '#578b3e']: ['28px lato-regular', tie_txt_color],
							x : 350,
							y : 16,
							width : 30,
							payout : '8:1',
							extraX : 350,
							extraY : 230 + 30
						},
						{
							text: '6',
							tablename: 'supersix',
							textFont1 : window.language.locale ==='zh'?[fontFormat(55, 'black', 'noto-zh'), '#fcc139'] : ['28px lato-black', "#fcc139"],
							textFont2 :window.language.locale ==='zh'? [fontFormat(25, 'black', 'noto-zh'), '#fcc139']: ['28px lato-regular', "#fcc139"],
							x : 350,
							y : 230,
							width : 30,
							payout: '12:1',
							extraX : 350,
							extraY : 230 + 30
						},
						{
							tablename: '',
							text: window.language.locale === 'zh' ? window.language.game_specific.banker : 'BANKER',
							textFont1 : window.language.locale ==='zh'?[fontFormat(55, 'black', 'noto-zh'), '#b7211f'] : ['28px lato-black', banker_txt_color],
							textFont2 :window.language.locale ==='zh'? [fontFormat(25, 'black', 'noto-zh'), '#b7211f']: ['28px lato-regular', banker_txt_color],
							x : 550,
							y : 16,
							width : 30
						},
						{
							tablename: '',
							text: window.language.locale === 'zh' ? window.language.game_specific.bankerpair : 'BANKER PAIR',
							textFont1 : window.language.locale ==='zh'?[fontFormat(55, 'black', 'noto-zh'), '#b7211f'] : ['28px lato-black', banker_txt_color],
							textFont2 :window.language.locale ==='zh'? [fontFormat(25, 'black', 'noto-zh'), '#b7211f']: ['28px lato-regular', banker_txt_color],
							x : 550,
							y : 230,
							width : 30,
							payout : '11:1',
							extraX : 550,
							extraY : 230 + 30
						}
					]
				},
				landscape : {
					classic: [
						{
							text: window.language.locale === 'zh' ? window.language.game_specific.playerpair : 'PLAYER PAIR',
							tablename : '',
							payout :'11:1',
							skewX : 40,
							scaleY: 0.6,
							x : 245,
							y: window.language.locale ==='zh'? 30 : 10,
							width : 30,
							extraX : window.language.locale ==='zh'? -40 : -32,
							extraY : window.language.locale ==='zh'? 0 : -10,
							textFont1 : window.language.locale ==='zh'?[fontFormat(65, 'black', 'noto-zh'), '#0c3397'] : ['26px lato-black', player_txt_color],
							textFont2 :window.language.locale ==='zh'? [fontFormat(30, 'black', 'noto-zh'), '#0c3397']: ['28px lato-regular', player_txt_color]
						},
						{
							text: window.language.locale === 'zh' ? window.language.game_specific.player : 'PLAYER',
							tablename: 'player',
							payout : null,
							skewX : 30,
							scaleY: 0.6,
							x : 440,
							y: window.language.locale ==='zh'? 30 : 10,
							width : 30,
							extraX : 0,
							extraY : window.language.locale ==='zh'? 30 : 4,
							textFont1 : window.language.locale ==='zh' ? [fontFormat(80, 'black', 'noto-zh'), '#0c3397'] : ['26px lato-black', player_txt_color],
						},
						{
								text: window.language.locale === 'zh' ? window.language.game_specific.tie : 'TIE',
								tablename: 'tie',
								payout : '8:1',
								skewX : 0,
								scaleY: 0.6,
								x : 630,
								y: window.language.locale ==='zh'? 30 : 10,
								width : 30,
								extraX : 0,
								extraY : window.language.locale ==='zh'? 0 : 4,
								color : '#568c3f' ,
								textFont1 : window.language.locale === 'zh'?[fontFormat(65, 'black', 'noto-zh'), '#568c3f'] : ['26px lato-black', tie_txt_color],
								textFont2 : window.language.locale === 'zh'?[fontFormat(30, 'black', 'noto-zh'), '#568c3f'] : ['28px lato-regular', tie_txt_color]
						},
						{
								text: window.language.locale === 'zh' ? window.language.game_specific.banker : 'BANKER',
								tablename: 'banker',
								payout : null,
								skewX : -30,
								scaleY: 0.6,
								x : 810,
								y: window.language.locale ==='zh'? 30 : 10,
								width : 30,
								extraX : 0,
								extraY : window.language.locale ==='zh'? 30 : 4,
								textFont1 : window.language.locale === 'zh'? [fontFormat(80, 'black', 'noto-zh'), '#b71b1c'] : ['26px lato-black', banker_txt_color],
						},
						{
								text: window.language.locale === 'zh' ? window.language.game_specific.bankerpair : 'BANKER PAIR',
								tablename: '',
								payout : '11:1',
								scaleY: 0.6,
								skewX : -40,
								x : 1014,
								y: window.language.locale ==='zh'? 30 : 10,
								width : 30,
								extraX : window.language.locale ==='zh'? 35 : 24,
								extraY : window.language.locale ==='zh'? 0 : -10,
								textFont1 : window.language.locale === 'zh'? [fontFormat(65, 'black', 'noto-zh'), '#b71b1c']: ['26px lato-black', banker_txt_color],
								textFont2 :window.language.locale === 'zh'?  [fontFormat(30, 'black', 'noto-zh'), '#b71b1c']: ['28px lato-regular', banker_txt_color]
						}
					],
					supersix : [
						{
							text: window.language.locale === 'zh' ? window.language.game_specific.playerpair : 'PLAYER PAIR',
							tablename : '',
							payout :'11:1',
							skewX : 40,
							scaleY: 0.6,
							x : 245,
							y: window.language.locale ==='zh'? 30 : 10,
							width : 30,
							extraX : window.language.locale ==='zh'? -40 : -32,
							extraY : window.language.locale ==='zh'? 0 : -10,
							textFont1 : window.language.locale ==='zh'?[fontFormat(65, 'black', 'noto-zh'), '#0c3397'] : ['26px lato-black', player_txt_color],
							textFont2 :window.language.locale ==='zh'? [fontFormat(30, 'black', 'noto-zh'), '#0c3397']: ['28px lato-regular', player_txt_color]
						},
						{
							text: window.language.locale === 'zh' ? window.language.game_specific.player : 'PLAYER',
							tablename: 'player',
							payout : null,
							skewX : 30,
							scaleY: 0.6,
							x : 440,
							y: window.language.locale ==='zh'? 30 : 10,
							width : 30,
							extraX : 0,
							extraY : window.language.locale ==='zh'? 30 : 4,
							textFont1 : window.language.locale ==='zh' ? [fontFormat(80, 'black', 'noto-zh'), '#0c3397'] : ['26px lato-black', player_txt_color],
						},
						{
								text: window.language.locale === 'zh' ? window.language.game_specific.tie : 'TIE',
								tablename: 'tie',
								payout : '8:1',
								skewX : 0,
								scaleY: 0.6,
								x : 630,
								y: window.language.locale ==='zh'? 8 : 10,
								width : 30,
								extraX : 0,
								extraY : window.language.locale ==='zh'? -10 : 4,
								color : '#568c3f' ,
								textFont1 : window.language.locale === 'zh'?[fontFormat(50, 'black', 'noto-zh'), '#568c3f'] : ['26px lato-black', tie_txt_color],
								textFont2 : window.language.locale === 'zh'?[fontFormat(25, 'black', 'noto-zh'), '#568c3f'] : ['28px lato-regular', tie_txt_color]
						},
						{
								text: window.language.locale === 'zh' ? window.language.game_specific.banker : 'BANKER',
								tablename: 'banker',
								payout : null,
								skewX : -30,
								scaleY: 0.6,
								x : 810,
								y: window.language.locale ==='zh'? 30 : 10,
								width : 30,
								extraX : 0,
								extraY : window.language.locale ==='zh'? 30 : 4,
								textFont1 : window.language.locale === 'zh'? [fontFormat(80, 'black', 'noto-zh'), '#b71b1c'] : ['26px lato-black', banker_txt_color],
						},
						{
								text: window.language.locale === 'zh' ? window.language.game_specific.bankerpair : 'BANKER PAIR',
								tablename: '',
								payout : '11:1',
								scaleY: 0.6,
								skewX : -40,
								x : window.language.locale ==='zh' ? 1020 : 1004,
								y: window.language.locale ==='zh'? 30 : 10,
								width : 30,
								extraX : window.language.locale ==='zh'? 35 : 24,
								extraY : window.language.locale ==='zh'? 0 : -10,
								textFont1 : window.language.locale === 'zh'? [fontFormat(65, 'black', 'noto-zh'), '#b71b1c']: ['26px lato-black', banker_txt_color],
								textFont2 :window.language.locale === 'zh'?  [fontFormat(30, 'black', 'noto-zh'), '#b71b1c']: ['28px lato-regular', banker_txt_color]
						},
						{
								text: '',
								tablename: 'supersix',
								payout : '12:1',
								skewX : 0,
								scaleY: 0.6,
								x : 630,
								y: window.language.locale ==='zh'? 50 : 50,
								width : 30,
								extraX : 0,
								extraY : window.language.locale ==='zh'? 35 : 78,
								color : '#568c3f' ,
								textFont1 : window.language.locale === 'zh'?[fontFormat(65, 'black', 'noto-zh'), '#fcc13c'] : ['26px lato-black', '#fbc23a'],
								textFont2 : window.language.locale === 'zh'?[fontFormat(30, 'black', 'noto-zh'), '#fcc13c'] : ['28px lato-regular', '#fbc23a']
						}
					]
				}
			}
		},
		singleClassic() {
			let width = 700;
			let height = 402;
			let gradColor = 'rgba(255,255,255,0)';
			let defaultColor = 'rgba(255,255,255,1)';
			let portrait_outline = new createjs.Container();
			let landscape_outline = new createjs.Container();
			
			var line = new createjs.Shape();
			line.graphics.ss(2).beginLinearGradientStroke([gradColor,defaultColor, defaultColor, gradColor], [0,0.2,0.8,1], 0,0,width,0)
			line.graphics.moveTo(0,0).lineTo(width,0);

			let startX = 0;
			line.graphics.moveTo(startX, height).lineTo(width, height);

			height = height/2;
			line.graphics.moveTo(startX, height).lineTo((width/2) - 70, height);
			startX = (width/2) + 70
			line.graphics.moveTo(startX, height).lineTo(startX+(width/2) - 70, height);

			height = 0;
			startX = (width/2) + 70
			line.graphics.moveTo(startX, height).lineTo(startX, height + 402);
			startX = (width/2) - 70
			line.graphics.moveTo(startX, height).lineTo(startX, height + 402);

			portrait_outline.addChild(line);

			let useKey = 'classic';

			for(var x = 0; x < this.textpreset.portrait[useKey].length; x++) {
				var preset = this.textpreset.portrait[useKey][x];
				var text = new createjs.Text(preset.text, ...preset.textFont1)
				text.set({
					lineWidth : preset.width,
					textAlign: 'center',
					textBaseline: 'top',
					x: preset.x,
					y: preset.y
				});

				let text_clone = null;
				let anotherText_clone = null;

				if(window.language.locale ==='zh') {
						if(preset.tablename != 'supersix') {
							text_clone = text.clone();
							text_clone.outline = 1;
							text_clone.color = "#fff";
						}
				}

				if(preset.payout) {
					var anotherText = new createjs.Text(preset.payout, ...preset.textFont2);
					anotherText.set({
						lineWidth : preset.width,
						textAlign: 'center',
						textBaseline: 'top',
						x: preset.extraX,
						y: text.y + text.getMeasuredHeight() + (window.language.locale === 'zh' ? 10 : 0)
					});

					if(window.language.locale ==='zh') {
						if(preset.tablename != 'supersix') {
							anotherText_clone = anotherText.clone();
							anotherText_clone.outline = 1;
							anotherText_clone.color = "#fff";
						}
					}

					portrait_outline.addChild(anotherText);
				}
				portrait_outline.addChild(text);
	
				if(text_clone) {
					portrait_outline.addChild(text_clone);
				}
				if(anotherText_clone) {
					portrait_outline.addChild(anotherText_clone);
				}
			}


			/**landscape start**/
			width = 1100;
			height = 134;
			startX = 140;

			var landLine = new createjs.Shape();
			landscape_outline.addChild(landLine);

			//top line
			landLine.graphics.clear().ss(2).beginLinearGradientStroke([gradColor,defaultColor, defaultColor, gradColor], [0,0.2,0.8,1], startX,0,width,0)
			landLine.graphics.moveTo(startX,0).lineTo(startX + width,0);
			//bottom line
			startX = 40;
			width = 1200;
			landLine.graphics.ss(2).beginLinearGradientStroke([gradColor,defaultColor, defaultColor, gradColor], [0,0.2,0.8,1], startX,0,width,0)
			landLine.graphics.moveTo(startX, height).lineTo(startX+width, height);
			//left side lines
			startX = 354;
			landLine.graphics.moveTo(startX, 0).lineTo(startX-84, height);
			startX = 538;
			landLine.graphics.moveTo(startX, 0).lineTo(startX-28, height);
			//right side lines
			startX = 722;
			landLine.graphics.moveTo(startX, 0).lineTo(startX+28, height);
			startX = 906;
			landLine.graphics.moveTo(startX, 0).lineTo(startX+84, height);

			///texts
			var text, text2;
			for(var x = 0; x < this.textpreset.landscape[useKey].length; x++) {
				let preset = this.textpreset.landscape[useKey][x];
				text = new createjs.Text(preset.text, ...preset.textFont1);

				text.set({x : preset.x,
					y : preset.y,
					textAlign:'center', textBaseline:'hanging',
					scaleY: preset.scaleY,
					skewX : preset.skewX,
					tablename : preset.tablename,
					lineWidth : preset.width});

				if(window.language.locale ==='zh') {
					if(preset.tablename !== 'supersix') {
						let text_clone = text.clone();
						landscape_outline.addChild(text_clone);
						text_clone.font = preset.textFont1[0];
						text_clone.color = preset.textFont1[1];

						text.outline = 1;
						text.color = "#fff";
					}
				}

				if(preset.payout) {
					text2 = new createjs.Text(preset.payout, ...preset.textFont2);
					text2.set({x : preset.x + preset.extraX ,
						y : text.getMeasuredHeight() + preset.extraY,
						textAlign:'center',
						textBaseline:'hanging',
						scaleY: preset.scaleY,
						skewX : preset.skewX,
						tablename : preset.tablename,
						lineWidth : preset.width});

					if(window.language.locale ==='zh') {
						if(preset.tablename !== 'supersix') {
							let text_clone = text2.clone();
							landscape_outline.addChild(text_clone);
							text_clone.font = preset.textFont2[0];
							text_clone.color = preset.textFont2[1];
							text2.outline = 1;
							text2.color = "#fff";
						}
					}
					landscape_outline.addChild(text2);
				}
				landscape_outline.addChild(text);
			}

			setTimeout(() => {
				landscape_outline.cache(-400, 0, 1700, height);
				portrait_outline.cache(0, 0, 700, 500);
			},2000)

			return {portrait : portrait_outline, landscape : landscape_outline};
		},
		singleSuper() {
			let width = 700;
			let height = 402;
			let gradColor = 'rgba(255,255,255,0)';
			let defaultColor = 'rgba(255,255,255,1)';
			let portrait_outline = new createjs.Container();
			let landscape_outline = new createjs.Container();
			
			var line = new createjs.Shape();
			line.graphics.ss(2).beginLinearGradientStroke([gradColor,defaultColor, defaultColor, gradColor], [0,0.2,0.8,1], 0,0,width,0)
			line.graphics.moveTo(0,0).lineTo(width,0);

			let startX = 0;
			line.graphics.moveTo(startX, height).lineTo(width, height);

			height = height/2;
			line.graphics.moveTo(startX, height).lineTo((width/2) - 70, height);
			startX = (width/2) + 70
			line.graphics.moveTo(startX, height).lineTo(startX+(width/2) - 70, height);

			line.graphics.moveTo(startX, height).lineTo((width/2) - 70, height);

			height = 0;
			startX = (width/2) + 70
			line.graphics.moveTo(startX, height).lineTo(startX, height + 402);
			startX = (width/2) - 70
			line.graphics.moveTo(startX, height).lineTo(startX, height + 402);

			portrait_outline.addChild(line);

			let useKey = 'supersix';

			for(var x = 0; x < this.textpreset.portrait[useKey].length; x++) {
				var preset = this.textpreset.portrait[useKey][x];
				var text = new createjs.Text(preset.text, ...preset.textFont1)
				text.set({
					lineWidth : preset.width,
					textAlign: 'center',
					textBaseline: 'top',
					x: preset.x,
					y: preset.y
				});

				let text_clone = null;
				let anotherText_clone = null;

				if(window.language.locale ==='zh') {
						if(preset.tablename != 'supersix') {
							text_clone = text.clone();
							text_clone.outline = 1;
							text_clone.color = "#fff";
					}
				}

				if(preset.payout) {
					var anotherText = new createjs.Text(preset.payout, ...preset.textFont2);
					anotherText.set({
						lineWidth : preset.width,
						textAlign: 'center',
						textBaseline: 'top',
						x: preset.extraX,
						y: text.y + text.getMeasuredHeight() + (window.language.locale === 'zh' ? 10 : 0)
					});

					if(window.language.locale ==='zh') {
						if(preset.tablename != 'supersix') {
							anotherText_clone = anotherText.clone();
							anotherText_clone.outline = 1;
							anotherText_clone.color = "#fff";
						}
					}

					portrait_outline.addChild(anotherText);
				}
				portrait_outline.addChild(text);
	
				if(text_clone) {
					portrait_outline.addChild(text_clone);
				}
				if(anotherText_clone) {
					portrait_outline.addChild(anotherText_clone);
				}
			}


			/**landscape start**/
			width = 1100;
			height = 134;
			startX = 140;

			var landLine = new createjs.Shape();
			landscape_outline.addChild(landLine);

			//top line
			landLine.graphics.clear().ss(2).beginLinearGradientStroke([gradColor,defaultColor, defaultColor, gradColor], [0,0.2,0.8,1], startX,0,width,0)
			landLine.graphics.moveTo(startX,0).lineTo(startX + width,0);
			//bottom line
			startX = 40;
			width = 1200;
			landLine.graphics.ss(2).beginLinearGradientStroke([gradColor,defaultColor, defaultColor, gradColor], [0,0.2,0.8,1], startX,0,width,0)
			landLine.graphics.moveTo(startX, height).lineTo(startX+width, height);
			//left side lines
			startX = 354;
			landLine.graphics.moveTo(startX, 0).lineTo(startX-84, height);
			startX = 538;
			landLine.graphics.moveTo(startX, 0).lineTo(startX-28, height);
			//right side lines
			startX = 722;
			landLine.graphics.moveTo(startX, 0).lineTo(startX+28, height);
			startX = 906;
			landLine.graphics.moveTo(startX, 0).lineTo(startX+84, height);
			//middle
			startX = 525;
			landLine.graphics.moveTo(startX, height/2 - 8).lineTo(startX+208, height/2 - 8);

			///texts
			var text, text2;
			for(var x = 0; x < this.textpreset.landscape[useKey].length; x++) {
				let preset = this.textpreset.landscape[useKey][x];
				text = new createjs.Text(preset.text, ...preset.textFont1);

				text.set({x : preset.x,
					y : preset.y,
					textAlign:'center', textBaseline:'hanging',
					scaleY: preset.scaleY,
					skewX : preset.skewX,
					tablename : preset.tablename,
					lineWidth : preset.width});

				if(window.language.locale ==='zh') {
					if(preset.tablename !== 'supersix') {
						let text_clone = text.clone();
						landscape_outline.addChild(text_clone);
						text_clone.font = preset.textFont1[0];
						text_clone.color = preset.textFont1[1];

						text.outline = 1;
						text.color = "#fff";
					}
				}

				if(preset.payout) {
					text2 = new createjs.Text(preset.payout, ...preset.textFont2);
					text2.set({x : preset.x + preset.extraX ,
						y : text.getMeasuredHeight() + preset.extraY,
						textAlign:'center',
						textBaseline:'hanging',
						scaleY: preset.scaleY,
						skewX : preset.skewX,
						tablename : preset.tablename,
						lineWidth : preset.width});

					if(window.language.locale ==='zh') {
					if(preset.tablename !== 'supersix') {
							let text_clone = text2.clone();
							landscape_outline.addChild(text_clone);
							text_clone.font = preset.textFont2[0];
							text_clone.color = preset.textFont2[1];
							text2.outline = 1;
							text2.color = "#fff";
						}
					}
					landscape_outline.addChild(text2);
				}
				landscape_outline.addChild(text);
			}

			setTimeout(() => {
				landscape_outline.cache(-400, 0, 1700, height);
				portrait_outline.cache(0, 0, 700, 500);
			},2000)

			return {portrait : portrait_outline, landscape : landscape_outline};
		},
		multiClassic () {
			let width = 700;
			let gradColor = 'rgba(255,255,255,0)';
			let defaultColor = 'rgba(255,255,255,1)';
			let portrait_outline = new createjs.Container();
			let landscape_outline = new createjs.Container();
			
			var line = new createjs.Shape();
			line.graphics.ss(2).beginLinearGradientStroke([gradColor,defaultColor, defaultColor, gradColor], [0,0.2,0.8,1], 0,0,width,0)
			for(var x = 0; x < 5; x++) {
				let posY = x*95;
				line.graphics.moveTo(10,posY).lineTo(10+width,posY);
			}
			line.graphics.moveTo(10+(width/2),0).lineTo(10+(width/2), 95);

			let startY = 95; 
			let h = 10

			for(var i = 1; i <5; i++) {
				for(var x = 1; x < 4; x++) {
					let posX = x * 90
					line.graphics.moveTo(posX,startY).lineTo(posX,startY+h);
				}

				for(var x = 1; x < 4; x++) {
					let posX = (x * 90) + 336
					line.graphics.moveTo(posX,startY).lineTo(posX,startY+h);
				}

				startY += 95;
				h = 10;

				if(i == 1) h = 20, startY -= 10;
				if(i == 2) h = 20;
				if(i == 4) startY += 10;

			}

			portrait_outline.addChild(line);
			return {portrait : portrait_outline};
		},
		multiSuper () {
			let width = 700;
			let gradColor = 'rgba(255,255,255,0)';
			let defaultColor = 'rgba(255,255,255,1)';
			let portrait_outline = new createjs.Container();
			let landscape_outline = new createjs.Container();
			
			var line = new createjs.Shape();

			line.graphics.ss(2).beginLinearGradientStroke([gradColor,defaultColor, defaultColor, gradColor], [0,0.2,0.8,1], 0,0,width,0)
			for(var x = 0; x < 7; x++) {
				line.graphics.moveTo(10,posY).lineTo(10+width,posY);
				let posY = x*75;
			}
			line.graphics.moveTo(10+(width/2),0).lineTo(10+(width/2), 75);

			let startY = 75; 
			let h = 10

			for(var i = 1; i <6; i++) {
				for(var x = 1; x < 4; x++) {
					let posX = x * 90
					line.graphics.moveTo(posX,startY).lineTo(posX,startY+h);
				}

				for(var x = 1; x < 4; x++) {
					let posX = (x * 90) + 336
					line.graphics.moveTo(posX,startY).lineTo(posX,startY+h);
				}

				startY += 75;
				h = 10;

				if(i == 1) h = 20, startY -= 10;
				if(i == 3) h = 20;
				if(i == 5) startY += 10;

			}

			portrait_outline.addChild(line);
			return {portrait : portrait_outline};
		}
	})

	return instance
}