import {fontFormat} from '../../factories/factories';
let instance = null;

export default (config) => {
  instance = instance || new blu.Component({
    main() {
      this.dragon_txt_color = '#1981f7';
      this.tiger_txt_color = 'rgba(209,47,47,1)';
      this.tie_txt_color = 'rgba(104, 159, 56,1)';
      this.textpreset = {
        classic : [{
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_even : 'EVEN',
            payout : null,
            skewX : 25,
            scaleY: 0.7,
            x : 237,
            y: window.language.locale ==='zh'? 3 : 13,
            outline: 'no',
            textalign : 'right',
            width : 30,
            extraX : 0,
            extraY :0,
            textFont1 : window.language.locale ==='zh' ? [fontFormat(45, 'black', 'noto-zh', false), '#fff'] : [fontFormat(22, 'bold', 'lato', false), '#fff'],
          }, {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_odd : 'ODD',
            payout : null,
            skewX : 25,
            scaleY: 0.7,
            x : 221,
            y: window.language.locale ==='zh'? 41 : 51,
            textalign : 'right',
            outline: 'no',
            width : 30,
            extraX : 0,
            extraY : 0,
            textFont1 : window.language.locale ==='zh' ? [fontFormat(45, 'black', 'noto-zh', false), '#fff'] : [fontFormat(22, 'bold', 'lato', false), '#fff'],
          },  {
            text: window.language.locale === 'zh' ? window.language.multibet_sicbo.bigcaps : 'BIG',
            payout : null,
            skewX : 25,
            scaleY: 0.7,
            x : 208,
            y: window.language.locale ==='zh'? 80 : 90,
            textalign : 'right',
            outline: 'no',
            width : 30,
            extraX : 0,
            extraY : 0,
            textFont1 : window.language.locale ==='zh' ? [fontFormat(45, 'black', 'noto-zh', false), '#fff'] : [fontFormat(22, 'bold', 'lato', false), '#fff'],
          }, {
            text: window.language.locale === 'zh' ? window.language.multibet_sicbo.smallcaps : 'SMALL',
            payout : null,
            skewX : 25,
            scaleY: 0.7,
            x : 191,
            y: window.language.locale ==='zh'? 123 : 133,
            textalign : 'right',
            outline: 'no',
            width : 30,
            extraX : 0,
            extraY : 0,
            textFont1 : window.language.locale ==='zh' ? [fontFormat(45, 'black', 'noto-zh', false), '#fff'] : [fontFormat(22, 'bold', 'lato', false), '#fff'],
          }, {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_dragon : 'DRAGON',
            tablename : 'dragon',
            payout :'1:1',
            skewX : 17,
            scaleY: 0.7,
            x : 417,
            y: window.language.locale ==='zh'? 25 : 13,
            textalign : 'center',
            width : 30,
            extraX : window.language.locale ==='zh'? -12 : -8,
            extraY : window.language.locale ==='zh'? 2 : 8,
            textFont1 : window.language.locale ==='zh'?[fontFormat(70, 'black', 'noto-zh', false), '#0c3397'] : [fontFormat(28, 'bold', 'lato', false), this.dragon_txt_color],
            textFont2 :window.language.locale ==='zh'? [ fontFormat(40, 'black', 'noto-zh', false), '#0c3397']: [fontFormat(22, 'bold', 'lato', false), this.dragon_txt_color]
          }, {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_winningdisplay_tie : 'TIE',
            tablename: 'tie',
            payout : '10:1',
            skewX : 0,
            scaleY: 0.65,
            x : 676,
            y: window.language.locale ==='zh'? 10 : 13,
            textalign : 'center',
            width : 30,
            extraX : 0,
            extraY : window.language.locale ==='zh'? -2 : 8,
            color : '#568c3f' ,
            textFont1 : window.language.locale === 'zh'?[fontFormat(45, 'black', 'noto-zh', false), '#568c3f'] : [fontFormat(28, 'bold', 'lato', false), this.tie_txt_color],
            textFont2 : window.language.locale === 'zh'?[fontFormat(30, 'black', 'noto-zh', false), '#568c3f'] : [fontFormat(22, 'bold', 'lato', false), this.tie_txt_color]
          },  {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_suitedtie : 'SUITED TIE',
            payout : '50:1',
            skewX : 0,
            scaleY: 0.65,
            x : 676,
            y: window.language.locale ==='zh'? 118 : 118,
            textalign : 'center',
            outline: 'no',
            width : 200,
            extraX : window.language.locale ==='zh'? -4 : -4,
            extraY : window.language.locale ==='zh'? 128 : 128,
            color : '#ffc23b' ,
            textFont1 : window.language.locale === 'zh'?[fontFormat(38, 'black', 'noto-zh', false), '#ffc23b'] : [fontFormat(35, 'bold', 'lato', false), '#ffc23b'],
            textFont2 : [fontFormat(30, 'bold', 'lato', false), '#ffc23b']
          }, {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_tiger : 'TIGER',
            tablename : 'tiger',
            payout : '1:1',
            skewX : -16,
            scaleY: 0.7,
            x : 930,
            y: window.language.locale ==='zh'? 25 : 15,
            textalign : 'center',
            width : 30,
            extraX : window.language.locale ==='zh'? 13 : 13,
            extraY : window.language.locale ==='zh'? 4 : 8,
            textFont1 : window.language.locale === 'zh'? [fontFormat(70, 'black', 'noto-zh', false), '#b71b1c'] : [fontFormat(28, 'bold', 'lato', false), this.tiger_txt_color],
            textFont2 :window.language.locale ==='zh'? [fontFormat(40, 'black', 'noto-zh', false), '#b71b1c']: [fontFormat(22, 'bold', 'lato', false), this.tiger_txt_color]
          }, {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_even : 'EVEN',
            payout : null,
            skewX : -25,
            scaleY: 0.7,
            x : 1112,
            y: window.language.locale ==='zh'? 3 : 13,
            textalign : 'left',
            outline: 'no',
            width : 30,
            extraX : 0,
            extraY : 0,
            textFont1 : window.language.locale === 'zh'? [fontFormat(45, 'black', 'noto-zh', false), '#fff'] : [fontFormat(22, 'bold', 'lato', false), '#fff'],
          }, {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_odd : 'ODD',
            payout : null,
            skewX : -20,
            scaleY: 0.7,
            x : 1130,
            y: window.language.locale ==='zh'? 41 : 51,
            textalign : 'left',
            outline: 'no',
            width : 30,
            extraX : 0,
            extraY : 0,
            textFont1 : window.language.locale === 'zh'? [fontFormat(45, 'black', 'noto-zh', false), '#fff'] : [fontFormat(22, 'bold', 'lato', false), '#fff'],
          }, {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_big : 'BIG',
            payout : null,
            skewX : -27,
            scaleY: 0.7,
            x : 1144,
            y: window.language.locale ==='zh'? 80 : 90,
            textalign : 'left',
            outline: 'no',
            width : 30,
            extraX : 0,
            extraY : 0,
            textFont1 : window.language.locale === 'zh'? [fontFormat(45, 'black', 'noto-zh', false), '#fff'] : [fontFormat(22, 'bold', 'lato', false), '#fff'],
          }, {
          text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_small : 'SMALL',
            payout : null,
            skewX : -25,
            scaleY: 0.7,
            x : 1162,
            y: window.language.locale ==='zh'? 123 : 133,
            textalign : 'left',
            outline: 'no',
            width : 30,
            extraX : 0,
            extraY : 0,
            textFont1 : window.language.locale === 'zh'? [fontFormat(45, 'black', 'noto-zh', false), '#fff'] : [fontFormat(22, 'bold', 'lato', false), '#fff'],
        }],
        multiclassic : [{
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_even : 'EVEN',
            payout : null,
            skewX : 30,
            scaleY: 0.7,
            x : 60,
            y: window.language.locale ==='zh'? 3 : 10,
            width : 30,
            extraX : 0,
            extraY : 0,
            textFont1 : window.language.locale ==='zh' ? [fontFormat(37, 'black', 'noto-zh', false), '#0c3397'] : [fontFormat(19, 'bold', 'lato', false), '#fff'],
          }, {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_odd : 'ODD',
            payout : null,
            skewX : 25,
            scaleY: 0.7,
            x : 195,
            y: window.language.locale ==='zh'? 3 : 10,
            width : 30,
            extraX : 0,
            extraY : 0,
            textFont1 : window.language.locale ==='zh' ? [fontFormat(37, 'black', 'noto-zh', false), '#0c3397'] : [fontFormat(19, 'bold', 'lato', false), '#fff'],
          },  {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_big : 'BIG',
            payout : null,
            skewX : 15,
            scaleY: 0.7,
            x : 335,
            y: window.language.locale ==='zh'? 3 : 10,
            width : 30,
            extraX : 0,
            extraY : 0,
            textFont1 : window.language.locale ==='zh' ? [fontFormat(37, 'black', 'noto-zh', false), '#0c3397'] : [fontFormat(19, 'bold', 'lato', false), '#fff'],
          }, {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_small : 'SMALL',
            payout : null,
            skewX : 10,
            scaleY: 0.7,
            x : 472,
            y: window.language.locale ==='zh'? 3 : 10,
            width : 30,
            extraX : 0,
            extraY : 0,
            textFont1 : window.language.locale ==='zh' ? [fontFormat(37, 'black', 'noto-zh', false), '#0c3397'] : [fontFormat(19, 'bold', 'lato', false), '#fff'],
          }, {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_winningdisplay_tie + '  10:1' : 'TIE 10:1' ,
            tablename : 'tie',
            payout : null,
            skewX : 0,
            scaleY: 0.65,
            x : 670,
            y: window.language.locale ==='zh'? 45 : 50,
            width : 150,
            extraX : 0,
            extraY : 0,
            color : '#568c3f' ,
            textFont1 : window.language.locale === 'zh'?[fontFormat(30, 'black', 'noto-zh', false), '#568c3f'] : [fontFormat(20, 'black', 'lato', false), this.tie_txt_color]
          },  {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_suitedtie : 'SUITED TIE',
            payout : null,
            skewX : 0,
            scaleY: 0.65,
            x : 670,
            y: window.language.locale ==='zh'? 76 : 80,
            outline: 'no',
            width : 150,
            extraX : 0,
            extraY : 0,
            color : '#ffc23b' ,
            textFont1 : window.language.locale === 'zh'?[ fontFormat(23, 'black', 'noto-zh', false), '#ffc23b'] : [fontFormat(22, 'bold', 'lato', false), '#ffc23b']
          },  {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_dragon + ' 1:1' : 'DRAGON 1:1',
            tablename : 'dragon',
            payout :null,
            skewX : 0,
            scaleY: 0.7,
            x : 670,
            y: window.language.locale ==='zh'? 108 : 114,
            width : 150,
            extraX : 0,
            extraY : 0,
            textFont1 : window.language.locale ==='zh'?[fontFormat(41, 'black', 'noto-zh', false), '#0c3397'] : [fontFormat(23, 'bold', 'lato', false), this.dragon_txt_color]
          }, {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_tiger + ' 1:1' : 'TIGER 1:1',
            tablename : 'tiger',
            payout : null,
            skewX : 0,
            scaleY: 0.7,
            x : 670,
            y: window.language.locale ==='zh'? 147 : 152,
            width : 150,
            extraX : 0,
            extraY : 0,
            textFont1 : window.language.locale === 'zh'? [fontFormat(44, 'black', 'noto-zh', false), '#b71b1c'] : [fontFormat(25, 'bold', 'lato', false), this.tiger_txt_color]
          },  {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_small : 'SMALL',
            payout : null,
            skewX : -10,
            scaleY: 0.7,
            x : 867,
            y: window.language.locale ==='zh'? 3 : 10,
            textalign : 'left',
            width : 30,
            extraX : 0,
            extraY : 0,
            textFont1 : window.language.locale === 'zh'? [fontFormat(37, 'black', 'noto-zh', false), '#b71b1c'] : [fontFormat(19, 'bold', 'lato', false), '#fff'],
          },  {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_big : 'BIG',
            payout : null,
            skewX : -27,
            scaleY: 0.7,
            x : 1002,
            y: window.language.locale ==='zh'? 3 : 10,
            textalign : 'left',
            width : 30,
            extraX : 0,
            extraY : window.language.locale ==='zh'? 30 : 4,
            textFont1 : window.language.locale === 'zh'? [fontFormat(37, 'black', 'noto-zh', false), '#b71b1c'] : [fontFormat(19, 'bold', 'lato', false), '#fff'],
          },  {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_odd : 'ODD',
            payout : null,
            skewX : -25,
            scaleY: 0.7,
            x : 1144,
            y: window.language.locale ==='zh'? 3 : 10,
            width : 30,
            extraX : 0,
            extraY : 0,
            textFont1 : window.language.locale === 'zh'? [fontFormat(37, 'black', 'noto-zh', false), '#b71b1c'] : [fontFormat(19, 'bold', 'lato', false), '#fff'],
          }, {
            text: window.language.locale === 'zh' ? window.language2.dragontiger_betlayout_even : 'EVEN',
            payout : null,
            skewX : -30,
            scaleY: 0.7,
            x : 1270,
            y: window.language.locale ==='zh'? 3 : 10,
            width : 30,
            extraX : 0,
            extraY : 0,
            textFont1 : window.language.locale === 'zh'? [fontFormat(37, 'black', 'noto-zh', false), '#b71b1c'] : [fontFormat(19, 'bold', 'lato', false), '#fff'],
          } ]
      }

    },
    singleClassic() {
      let width = 1350;
      let height = 209;
      let outline_container = new createjs.Container();

      outline_container.x = (this.context.stage.baseWidth/2)  - (width/2);
      outline_container.y = this.context.stage.baseHeight /2 + 91;

      // draw lines
      let line = new createjs.Shape();
      line.graphics.ss(1.5).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.2,0.8,1], 0,0,width,0)
      line.graphics.moveTo(0,0).lineTo(width,0)
      width = 1460;

      let startX = -130;
      line.graphics.ss(1.5).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0)
      line.graphics.moveTo(startX, height).lineTo(width, height);

      // dragon even line
      startX = -14;
      let areaWidth = 277;
      height = 37;
      line.graphics.ss(1.5).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)'], [0,1], startX,0,areaWidth/2,0)
      line.graphics.moveTo(startX,height).lineTo(startX + areaWidth, height);

      // tiger even line
      startX = 1083;
      line.graphics.ss(1.5).beginLinearGradientStroke(['rgba(255,255,255,1)','rgba(255,255,255,0.7)','rgba(255,255,255,0)'], [0,0.7,1], startX,0, startX + areaWidth,0)
      line.graphics.moveTo(startX,height).lineTo(startX + areaWidth, height);

      // dragon odd line
      startX = -37;
      height = 74;
      areaWidth = 289;
      line.graphics.ss(1.5).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)'], [0,1], startX,0,areaWidth/2,0)
      line.graphics.moveTo(startX,height).lineTo(startX + areaWidth - 2, height + 1);

      // tiger odd line
      startX = 1100;
      line.graphics.ss(1.5).beginLinearGradientStroke(['rgba(255,255,255,1)','rgba(255,255,255,0.7)','rgba(255,255,255,0)'], [0,0.7,1], startX,0, startX + areaWidth - 7,0)
      line.graphics.moveTo(startX,height).lineTo(startX + areaWidth - 7, height);

      // tie line
      areaWidth = 269;
      startX = areaWidth;
      line.graphics.ss(1.5).s("#fff");
      line.graphics.moveTo(startX + areaWidth, height + 3).lineTo(startX + (areaWidth*2), height + 3);

      // dragon big line
      startX = -63;
      height = 116;
      areaWidth = 298;
      line.graphics.ss(1.5).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)'], [0,1], startX,0,(areaWidth/2) - 90,0)
      line.graphics.moveTo(startX,height).lineTo(startX + areaWidth, height);

      // even big line
      startX = 1115;
      height = 116;
      areaWidth = 293;
      line.graphics.ss(1.5).beginLinearGradientStroke(['rgba(255,255,255,1)','rgba(255,255,255,0.7)','rgba(255,255,255,0)'], [0,0.7,1], startX,0, startX + areaWidth,0)
      line.graphics.moveTo(startX,height).lineTo(startX + areaWidth, height);

      // suit line
      startX = -92;
      height = 161;
      areaWidth = 621;
      line.graphics.ss(1.5).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)'], [0,1], startX,0,areaWidth - 600,0)
      line.graphics.moveTo(startX,height).lineTo(startX + areaWidth, height);

      startX = 820;
      height = 161;
      areaWidth = 617;
      line.graphics.ss(1.5).beginLinearGradientStroke(['rgba(255,255,255,1)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,0)'], [0, 0.8,1], startX,0, startX + areaWidth,0)
      line.graphics.moveTo(startX,height).lineTo(startX + areaWidth, height);


      startX = 0;
      areaWidth = 58;
      height = 210;
      line.graphics.ss(1.5).s("#fff");
      line.graphics.moveTo(areaWidth,161).lineTo(areaWidth - 24, height);

      areaWidth = 376;
      line.graphics.ss(1.5).s("#fff");
      line.graphics.moveTo(areaWidth,161).lineTo(areaWidth - 10, height);

      startX = 600;
      areaWidth = 377;
      line.graphics.ss(1.5).s("#fff");
      line.graphics.moveTo(startX + areaWidth,161).lineTo(startX + areaWidth + 12, height);

      startX = startX + 316;
      areaWidth = 377;
      line.graphics.ss(1.5).s("#fff");
      line.graphics.moveTo(startX + areaWidth,161).lineTo(startX + areaWidth + 22, height);


      // DO NOT TOUCH

      startX = 0;
      areaWidth = 277;
      height = 209;
      line.graphics.ss(1.5).s("#fff");
      line.graphics.moveTo(areaWidth,0).lineTo(startX + areaWidth - 78, height);

      // areaWidth = 240;
      // line.graphics.ss(1.5).s("pink");
      // line.graphics.moveTo(areaWidth,0).lineTo(startX + areaWidth - 78, height);

      areaWidth = 277;
      startX = areaWidth;
      areaWidth = 271;
      line.graphics.ss(1.5).s("#fff");
      line.graphics.moveTo(startX + areaWidth,0).lineTo(startX + areaWidth - 24, height);

      startX = startX+areaWidth;
      areaWidth = 251;
      line.graphics.ss(1.5).s("#fff");
      line.graphics.moveTo(startX + areaWidth,0).lineTo(startX + areaWidth + 26, height);


      startX = startX+areaWidth;
      areaWidth = 270;
      line.graphics.ss(1.5).s("#fff");
      line.graphics.moveTo(startX + areaWidth,0).lineTo(startX + areaWidth + 85, height);

      // areaWidth = 310;
      // line.graphics.ss(1.5).s("pink");
      // line.graphics.moveTo(startX + areaWidth,0).lineTo(startX + areaWidth + 85, height);

      outline_container.addChild(line);


      let suitedtie_img = new createjs.Bitmap(this.context.getResources('suitedtie'));
			suitedtie_img.x = 625;
			suitedtie_img.y = 103;
      outline_container.addChild(suitedtie_img);
      //
      // let clubs_container = new createjs.Container();
      // clubs_container.set({x:-61, y:166})
      // outline_container.addChild(clubs_container);
      //
      // let clubs = new createjs.Shape();
      // let clubs_x = 7;
      // let clubs_y = 38;
      // clubs.graphics.ss(.5).s("yellow").f("yellow");
      // clubs.graphics.moveTo(clubs_x, clubs_y).bezierCurveTo(clubs_x+10,clubs_y, clubs_x+21, clubs_y-12, clubs_x+21, clubs_y-12);
      //
      //temporary
      let posy = 168;

      let dragon_clubs = new createjs.Bitmap(this.context.getResources('dragon_clubs'));
			dragon_clubs.x = -50;
			dragon_clubs.y = posy;

      let dragon_heart = new createjs.Bitmap(this.context.getResources('dragon_heart'));
			dragon_heart.x = dragon_clubs.x + 150;
			dragon_heart.y = dragon_clubs.y;

      let dragon_spade = new createjs.Bitmap(this.context.getResources('dragon_spade'));
			dragon_spade.x = dragon_heart.x + 165;
			dragon_spade.y = dragon_clubs.y;

      let dragon_diamond = new createjs.Bitmap(this.context.getResources('dragon_diamond'));
			dragon_diamond.x = dragon_spade.x + 160;
			dragon_diamond.y = dragon_clubs.y;

      outline_container.addChild(dragon_clubs, dragon_heart, dragon_spade, dragon_diamond);

      let tiger_diamond = new createjs.Bitmap(this.context.getResources('tiger_diamond'));
      tiger_diamond.x = dragon_diamond.x + 460;
      tiger_diamond.y = dragon_clubs.y;

      let tiger_spade = new createjs.Bitmap(this.context.getResources('tiger_spade'));
      tiger_spade.x = tiger_diamond.x + 155;
      tiger_spade.y = dragon_clubs.y;

      let tiger_heart = new createjs.Bitmap(this.context.getResources('tiger_heart'));
      tiger_heart.x = tiger_spade.x + 150;
      tiger_heart.y = dragon_clubs.y;

      let tiger_clubs = new createjs.Bitmap(this.context.getResources('tiger_clubs'));
			tiger_clubs.x = tiger_heart.x + 155;
			tiger_clubs.y = dragon_clubs.y;

      outline_container.addChild(tiger_clubs, tiger_heart, tiger_spade, tiger_diamond);
      // end draw line

      var text, text2;
      let useKey = 'classic';
      for(var x = 0; x < this.textpreset[useKey].length; x++) {
        text = new createjs.Text(this.textpreset[useKey][x].text, ...this.textpreset[useKey][x].textFont1);

        text.set({x : this.textpreset[useKey][x].x,
          y : this.textpreset[useKey][x].y,
          textAlign:this.textpreset[useKey][x].textalign, textBaseline:'hanging',
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
    multiClassic() {

      let width = 1340;
      let height = 180;
      let startX = 0;

      let outline_container = new createjs.Container();
      outline_container.x = (this.context.stage.baseWidth/2)  - (width/2);
      outline_container.y = this.context.stage.baseHeight /2 + 91;

      var line = new createjs.Shape();

      //DRAGON ODD EVEN
      width = 542;
      line.graphics.ss(1).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,0.8)','rgba(255,255,255,1)', 'rgba(255,255,255,1)'], [0,0.8,1,1], 0,0,(width/2) - 100,0)
			line.graphics.moveTo(startX,0).lineTo(width,0)

      height = 30;
      startX = -10;
      line.graphics.ss(1).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,0.8)','rgba(255,255,255,1)', 'rgba(255,255,255,1)'], [0,0.8,1,1], startX,0,(width/2) - 100,0)
			line.graphics.moveTo(startX,height).lineTo(width - 5 ,height)

      startX = 127;
      line.graphics.ss(1).s("#fff");
			line.graphics.moveTo(startX,0).lineTo(startX-14 ,height)

      startX = startX + 140;
      line.graphics.ss(1).s("#fff");
			line.graphics.moveTo(startX,0).lineTo(startX-12 ,height)

      startX = startX + 138;
      line.graphics.ss(1).s("#fff");
			line.graphics.moveTo(startX,0).lineTo(startX-10 ,height)

      startX = startX + 137;
      line.graphics.ss(1).s("#fff");
			line.graphics.moveTo(startX,0).lineTo(startX-5 ,height)

      //Tiger ODD EVEN
      startX = 795;
      width = 536;
      line.graphics.ss(1).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,0.8)','rgba(255,255,255,1)', 'rgba(255,255,255,1)'], [1,1,0.8,0], startX, 0 ,startX + width,0)
			line.graphics.moveTo(startX,0).lineTo(startX + width,0)

      line.graphics.ss(1).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,0.8)','rgba(255,255,255,1)', 'rgba(255,255,255,1)'], [1,1,0.8,0], startX, 0 ,startX + width + 10,0)
			line.graphics.moveTo(startX + 3,height).lineTo(startX + width +3,height)

      line.graphics.ss(1).s("#fff");
      line.graphics.moveTo(startX,0).lineTo(startX + 4.5 ,height)

      startX = startX + 140;
      line.graphics.ss(1).s("#fff");
			line.graphics.moveTo(startX,0).lineTo(startX + 7 ,height)

      startX = startX + 138;
      line.graphics.ss(1).s("#fff");
			line.graphics.moveTo(startX,0).lineTo(startX + 11 ,height)

      startX = startX + 136;
      line.graphics.ss(1).s("#fff");
			line.graphics.moveTo(startX,0).lineTo(startX + 15 ,height)

      width = 1350
      height = 40;
      startX = -15;
      line.graphics.ss(1).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);

			startX = startX - 22;
			width = width + 22;
			height = height + 31;
			line.graphics.ss(1).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);

			startX = startX - 22;
			width = width + 22;
			height = height + 33;
			line.graphics.ss(1).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);

			startX = startX - 26;
			width = width + 26;
			height = height + 37;
			line.graphics.ss(1).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);

			startX = startX - 30;
			width = width + 30;
			height = height + 40;
			line.graphics.ss(1).beginLinearGradientStroke(['rgba(255,255,255,0)','rgba(255,255,255,1)', 'rgba(255,255,255,1)', 'rgba(255,255,255,0)'], [0,0.1,0.9,1], startX,0,width,0);
			line.graphics.moveTo(startX, height).lineTo(width, height);

      //DRAGON
      height = 40;
      startX = 163;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX-3, height + 7);

      startX = startX + 188;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX-3, height + 7);

      startX = startX + 186;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX-1, height + 7);


      height = height + 25;
      startX = 151;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX-7, height + 13);

      startX = startX + 192;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX-4, height + 13);

      startX = startX + 191;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX-2, height + 13);


      height = height + 33;
      startX = 136;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX-6, height + 13);

      startX = startX + 197;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX-5, height + 13);

      startX = startX + 196;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX-2, height + 13);


      height = height + 36;
      startX = 118;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX-6, height + 13);

      startX = startX + 204;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX-5, height + 13);

      startX = startX + 203;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX-2, height + 13);

      height = height + 39;
      startX = 98;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX-3, height + 7);

      startX = startX + 210;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX-2, height + 7);

      startX = startX + 212;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX-1, height + 7);


      //Tiger
      height = 40;
      startX = 800;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX + 1, height + 7);

      startX = startX + 188;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX + 2, height + 7);

      startX = startX + 188;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX + 2.5, height + 7);

      height = height + 25;
      startX = 804;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX+2, height + 13);

      startX = startX + 191;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX+4, height + 13);

      startX = startX + 192;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX+5, height + 13);

      height = height + 33;
      startX = 808;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX+2, height + 13);

      startX = startX + 198;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX+4, height + 13);

      startX = startX + 197;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX+6, height + 13);

      height = height + 36;
      startX = 813;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX+2, height + 13);

      startX = startX + 203;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX+4, height + 13);

      startX = startX + 203;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX+6, height + 13);

      height = height + 39;
      startX = 818;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX+1, height + 7);

      startX = startX + 210;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX+2, height + 7);

      startX = startX + 211;
      line.graphics.ss(0.5).s('#fff').moveTo(startX, height).lineTo(startX+3.5, height + 7);

			outline_container.addChild(line);

      let text_1 =  new createjs.Text("1", fontFormat(10, 'regular', 'lato', false), '#fff');
      text_1.textAlign = 'center';
      text_1.width = 20;
      text_1.skewX = 27;
      text_1.x = 60;
      text_1.y = 59;

      let text_2 =  new createjs.Text("2", fontFormat(10, 'regular', 'lato', false), '#fff');
      text_2.textAlign = 'center';
      text_2.width = 20;
      text_2.skewX = 20;
      text_2.x = 250;
      text_2.y = 59;

      let text_3 =  new createjs.Text("3", fontFormat(10, 'regular', 'lato', false), '#fff');
      text_3.textAlign = 'center';
      text_3.width = 20;
      text_3.skewX = 8;
      text_3.x = 440;
      text_3.y = 59;

      let text_6 =  new createjs.Text("6", fontFormat(10, 'regular', 'lato', false), '#fff');
      text_6.textAlign = 'center';
      text_6.width = 20;
      text_6.skewX = -10;
      text_6.x = 900;
      text_6.y = 59;

      let text_7 =  new createjs.Text("7", fontFormat(10, 'regular', 'lato', false), '#fff');
      text_7.textAlign = 'center';
      text_7.width = 20;
      text_7.skewX = -20;
      text_7.x = 1088;
      text_7.y = 59;

      let text_8 =  new createjs.Text("8", fontFormat(10, 'regular', 'lato', false), '#fff');
      text_8.textAlign = 'center';
      text_8.width = 20;
      text_8.skewX = -25;
      text_8.x = 1275;
      text_8.y = 59;

      outline_container.addChild(text_1, text_2, text_3, text_6, text_7, text_8);

      let suitedtie_img = new createjs.Bitmap(this.context.getResources('multi_suitedtie'));
      suitedtie_img.x = 645;
			suitedtie_img.y = 73;
      outline_container.addChild(suitedtie_img);

      // texts
      outline_container.texts = [];
      var text, text2;
      let useKey = 'multiclassic';
      for(var x = 0; x < this.textpreset[useKey].length; x++) {
        text = new createjs.Text(this.textpreset[useKey][x].text, ...this.textpreset[useKey][x].textFont1);

        text.set({x : this.textpreset[useKey][x].x,
          y : this.textpreset[useKey][x].y,
          textAlign:'center', textBaseline:'hanging',
          scaleY: this.textpreset[useKey][x].scaleY,
          skewX : this.textpreset[useKey][x].skewX,
          tablename : this.textpreset[useKey][x].tablename,
          lineWidth : this.textpreset[useKey][x].width});

        outline_container.texts.push(text);

        if(window.language.locale ==='zh') {
          if(this.textpreset[useKey][x].outline === undefined) {
            let text_clone = text.clone();
            outline_container.addChild(text_clone);
            text_clone.font = this.textpreset[useKey][x].textFont1[0];
            text_clone.color = this.textpreset[useKey][x].textFont1[1];

            text.outline = 1;
            text.color = "#fff";

            outline_container.texts.push(text_clone);
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
          outline_container.texts.push(text2);

          if(window.language.locale ==='zh') {
            if(this.textpreset[useKey][x].outline === undefined) {
              let text_clone = text2.clone();
              outline_container.addChild(text_clone);
              text_clone.font = this.textpreset[useKey][x].textFont2[0];
              text_clone.color = this.textpreset[useKey][x].textFont2[1];
              text2.outline = 1;
              text2.color = "#fff";

              outline_container.texts.push(text_clone);
            }
          }
          outline_container.addChild(text2);
        }

        outline_container.addChild(text);
      }

			width = 1350;
			height = 200;
			outline_container.cache(-200,-50, width+400, height+100);

      return outline_container;
    },
  })

  return instance
}
