let instance = null;
import {
  createSprite,
  randomNum,
  createCardSprite,
  numberCounter,
  playSound,
  numberWithCommas,
  createSpriteRoadMap,
  fontFormat
} from '../../../factories/factories';
import fnFormat from '../../../factories/formatter';
import {baccaratRoadmap as bcRoadmap} from '../../../factories/scoreboard_draw';

export default () => {
  instance = instance || new blu.Component({
    main() {
      let row = 6;
      let col = 15;
      let otherRow = 12;
      let otherCol = 34;
      let pearlSize = 35;
      let brSize = 15;
      let width = 580;
      let height = 180;
      let predWidth = 52;
      let predHeight = 52;
      let predPos = 0;
      let hide = false;
      let statsFont = 22;
      let portrait = true;
      let moveTo = 0;

      if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
        width = 625;
        height = 210;
        pearlSize = 35;
        brSize = 17.35;
        predWidth = 50;
        predHeight = 50;
        predPos = width;
        row = 6;
        col = 15;
        otherRow = 12;
        otherCol = 36;
        hide = false;
        statsFont = 30;
        portrait = true;
        moveTo = 0;
        this.y = this.context.stage.baseWidth - height;
      } else {
        width = 655;
        height = 144;
        predPos = width;
        pearlSize = 24;
        row = 6;
        col = 8;
        brSize = 12;
        otherRow = 12;
        otherCol = 32;
        predWidth = 40;
        predHeight = 35;
        hide = true;
        statsFont = 22;
        portrait = false;
        moveTo = col*pearlSize;
        this.y = this.context.stage.baseHeight - height;
      }
      this.scaleX = this.scaleY = 1;
      this.originalY = this.y;

      this.roadmapbg= new createjs.Shape();
      this.roadmapbg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0,0,width,height);
      this.addChild(this.roadmapbg);

      this.pearlines = new createjs.Shape();
      this.pearlines.graphics.ss(.8).s(this.context.theme_color[window.theme].bar_color).moveTo(0,pearlSize)
      this.addChild(this.pearlines);

      //pearl
      for(var i = 1; i <= row; i++) {
        this.pearlines.graphics.moveTo(0,pearlSize*i).lineTo(pearlSize*col,pearlSize*i)
      } // end for

      this.pearlines.graphics.moveTo(pearlSize,0);
      for(var x = 0; x <= col; x++) {
        this.pearlines.graphics.moveTo(pearlSize*x,0).lineTo(pearlSize*x,pearlSize*row)
      }

      //bigroad
      this.lines = new createjs.Shape();
      this.lines.graphics.ss(.8).s(this.context.theme_color[window.theme].bar_color).moveTo(0,brSize)
      this.lines.visible = hide;
      this.addChild(this.lines);

      this.lines.graphics.moveTo(moveTo,16)
      for(var i = 1; i <= otherRow ; i++) {
        this.lines.graphics.moveTo(moveTo,brSize*i).lineTo((otherCol*brSize) + moveTo, brSize*i)
      }

      this.lines.graphics.moveTo(moveTo,0)
      for(var x = 0; x <= otherCol ; x++) {
        this.lines.graphics.moveTo(moveTo + (x*brSize),0).lineTo(moveTo+ (x*brSize),(otherRow*brSize))
      }

      // *** predition ***//
      let pred1 =  portrait==true? 13 : 10;
      let pred2 =  portrait==true? 15 : 12;
      let pred3 =  portrait==true? 35 : 25;
      let predMargin = portrait==true? 27 : 22
      let predMargin2 = portrait==true? 10 : 15
     
      this.prediction_bg = new createjs.Shape();
      this.prediction_bg.fillCmd = this.prediction_bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).command;
      this.prediction_bg.graphics.drawRect(0,0,predWidth,height);
      this.prediction_bg.x = predPos;
      this.prediction_bg.prediction = true
      this.prediction_bg.clicked = false;
      this.addChild(this.prediction_bg);

      this.prediction_bg.addEventListener("click", () => {
        if(this.prediction_bg.clicked) return
        this.prediction_bg.clicked = true
        this.predictMarks("p")
      });

     
      this.prediction_bg2 = new createjs.Shape();
      this.prediction_bg2.fillCmd = this.prediction_bg2.graphics.beginFill(this.context.theme_color[window.theme].base_color).command;
      this.prediction_bg2.graphics.drawRect(0,0,predWidth,height);
      this.prediction_bg2.x = this.prediction_bg.x + predWidth;
      this.prediction_bg2.prediction = true
      this.prediction_bg2.clicked = false
      this.addChild(this.prediction_bg2);

      this.prediction_bg2.addEventListener("click", () => {
        if(this.prediction_bg2.clicked) return
        this.prediction_bg2.clicked = true
        this.predictMarks("b")
      });

      let player_prediction = new createjs.Shape();
      player_prediction.graphics.beginFill("#1565c0").drawRect(0,0,predWidth,predHeight);
      player_prediction.x = this.prediction_bg.x;
      player_prediction.y = this.prediction_bg.y;
      player_prediction.hitArea = this.prediction_bg
      this.addChild(player_prediction);
      // ==
      let p_text = new createjs.Text(window.language.locale === 'zh' ? '闲' : 'P', fontFormat(18, 'black', 'lato', false),"#fff");
      p_text.set({textAlign: 'center', textBaseline: 'middle', x : player_prediction.x + (predWidth/2), y:player_prediction.y + (predHeight/2)});
      this.addChild(p_text)

      this.player_prediction1 = new createjs.Shape();
      this.player_prediction1.x = this.prediction_bg.x + (predWidth/2);
      this.player_prediction1.y = predHeight + predMargin;
      this.player_prediction1.fillCmd = this.player_prediction1.graphics.ss(5).s(this.context.theme_color[window.theme].text_color).command
      this.player_prediction1.graphics.drawCircle(0,0,pred1);
      this.player_prediction1.hitArea = this.prediction_bg
      this.addChild(this.player_prediction1);

      this.player_prediction2 = new createjs.Shape();
      this.player_prediction2.x = this.prediction_bg.x + (predWidth/2);
      this.player_prediction2.y = this.player_prediction1.y + predHeight;
      this.player_prediction2.fillCmd = this.player_prediction2.graphics.beginFill(this.context.theme_color[window.theme].text_color).command
      this.player_prediction2.graphics.drawCircle(0,0,pred2);
      this.player_prediction2.hitArea = this.prediction_bg
      this.addChild(this.player_prediction2);

      this.player_prediction3 = new createjs.Shape();
      this.player_prediction3.x = this.prediction_bg.x + (predWidth/2) + 10;
      this.player_prediction3.y = this.player_prediction2.y + predHeight - predMargin2;
      this.player_prediction3.rotation = 45;
      this.player_prediction3.fillCmd = this.player_prediction3.graphics.beginFill(this.context.theme_color[window.theme].text_color).command
      this.player_prediction3.graphics.drawRoundRect(0,0,5,pred3,2);
      this.player_prediction3.hitArea = this.prediction_bg
      this.addChild(this.player_prediction3);

      let banker_prediction = new createjs.Shape();
      banker_prediction.x = this.prediction_bg2.x;
      banker_prediction.y = this.prediction_bg2.y;
      banker_prediction.hitArea = this.prediction_bg2;
      banker_prediction.graphics.beginFill("#d33030").drawRect(0,0,predWidth,predHeight);
      this.addChild(banker_prediction);

      // ==
      let b_text = new createjs.Text(window.language.locale === 'zh' ? '庄' : 'B', fontFormat(18, 'black', 'lato', false),"#fff");
      b_text.set({textAlign: 'center', textBaseline: 'middle', x : banker_prediction.x + (predWidth/2), y:banker_prediction.y + (predHeight/2)});
      this.addChild(b_text)

     this.banker_prediction1 = new createjs.Shape();
      this.banker_prediction1.x = this.prediction_bg2.x + (predWidth/2);
      this.banker_prediction1.y = predHeight + predMargin;
      this.banker_prediction1.hitArea = this.prediction_bg2;
      this.banker_prediction1.fillCmd = this.banker_prediction1.graphics.ss(5).s(this.context.theme_color[window.theme].text_color).command
      this.banker_prediction1.graphics.drawCircle(0,0,pred1);
      this.addChild(this.banker_prediction1);

      this.banker_prediction2 = new createjs.Shape();
      this.banker_prediction2.x = this.prediction_bg2.x + (predWidth/2);
      this.banker_prediction2.y = this.banker_prediction1.y + predHeight;
      this.banker_prediction2.hitArea = this.prediction_bg2;
      this.banker_prediction2.fillCmd = this.banker_prediction2.graphics.beginFill(this.context.theme_color[window.theme].text_color).command
      this.banker_prediction2.graphics.drawCircle(0,0,pred2);
      this.addChild(this.banker_prediction2);

      this.banker_prediction3 = new createjs.Shape();
      this.banker_prediction3.x = this.prediction_bg2.x + (predWidth/2)+ 10;
      this.banker_prediction3.y = this.banker_prediction2.y + predHeight - predMargin2;
      this.banker_prediction3.hitArea = this.prediction_bg2;
      this.banker_prediction3.rotation = 45;
      this.banker_prediction3.fillCmd = this.banker_prediction3.graphics.beginFill(this.context.theme_color[window.theme].text_color).command
      this.banker_prediction3.graphics.drawRoundRect(0,0,5,pred3,2);
      this.addChild(this.banker_prediction3);

      // *** end predition ***//

      //Statistics
      this.statContainer = new createjs.Container();
      this.statContainer.set({x:width - 95,y:0});

      this.statBg = new createjs.Shape();
      this.statBg.graphics.drawRect(0,0,90,height);
      this.statContainer.addChild(this.statBg);

      let temp = '',
      space = portrait==true? 18:10,
      font = portrait==true? 30:22,
      rad = portrait==true? 14:11,
      font1 = portrait==true? 19:14,
      margin = portrait==true? 2: 0,
      indiX = portrait==true? 15 : 24;

      this.shoe_counter =  this.getText(75,space,"0",fontFormat(font, 'regular', 'bebas', false),this.context.theme_color[window.theme].text_color,"right","top");
      temp = this.shoe_counter;
      this.player_total_text = this.getText(75,temp.y + temp.getMeasuredHeight() + space + 9,"0",fontFormat(font, 'regular', 'bebas', false), this.context.theme_color[window.theme].text_color,"right","top");
      temp = this.player_total_text;
      this.banker_total_text = this.getText(75,temp.y + temp.getMeasuredHeight() + space + 9,"0",fontFormat(font, 'regular', 'bebas', false), this.context.theme_color[window.theme].text_color,"right","top");
      temp = this.banker_total_text;
      this.tie_total_text = this.getText(75,temp.y + temp.getMeasuredHeight() + space + 9,"0",fontFormat(font, 'regular', 'bebas', false), this.context.theme_color[window.theme].text_color,"right","top");
      this.addChild(this.statContainer);
      this.statContainer.addChild(this.shoe_counter, this.tie_total_text, this.player_total_text, this.banker_total_text);
      //end of stats

      //cosmetics
      this.shoeIndi = new createjs.Text("#", fontFormat(font, 'regular', 'lato', false), this.context.theme_color[window.theme].text_color);
      this.shoeIndi.set({x: indiX+5, y:this.shoe_counter.y});
      this.statContainer.addChild(this.shoeIndi);

      this.tieIndicator = new bcRoadmap(rad, 2.5);
      this.tieIndicator.play('pearl-t', fontFormat(font1, 'black', 'lato', false));
      this.tieIndicator.instance.set({x: indiX, y:this.tie_total_text.y + 5});
      this.statContainer.addChild(this.tieIndicator.instance);

      this.playerIndicator = new bcRoadmap(rad, 2.5);
      this.playerIndicator.play('pearl-p', fontFormat(font1, 'black', 'lato', false));
      this.playerIndicator.instance.set({x: indiX, y:this.player_total_text.y + 5});
      this.statContainer.addChild(this.playerIndicator.instance);

      this.bankerIndicator = new bcRoadmap(rad, 2.5);
      this.bankerIndicator.play('pearl-b', fontFormat(font1, 'black', 'lato', false));
      this.bankerIndicator.instance.set({x: indiX, y:this.banker_total_text.y + 5});
      this.statContainer.addChild(this.bankerIndicator.instance);

      console.log("::ingame-raoadmap::", this.shoeIndi, this.tieIndicator, this.tieIndicator, this.playerIndicator, this.bankerIndicator)

      this.pearlroad_container = new createjs.Container();
      this.addChild(this.pearlroad_container)

      this.bigroad_container = new createjs.Container();
      this.bigroad_container.x = portrait == true? 0 : pearlSize* col;
      this.bigroad_container.y = 0
      this.bigroad_container.visible = portrait === true ? false : true;
      this.addChild(this.bigroad_container);

      this.bigeyeboy_container = new createjs.Container();
      this.bigeyeboy_container.x = this.bigroad_container.x;
      this.bigeyeboy_container.y = ((brSize*otherRow)/2) + 1;
      this.bigeyeboy_container.visible = portrait === true ? false : true;
      this.addChild(this.bigeyeboy_container);

      this.smallroad_container = new createjs.Container();
      this.smallroad_container.x = this.bigroad_container.x;
      this.smallroad_container.y = this.bigeyeboy_container.y + (((brSize*otherRow)/2)/2);
      this.smallroad_container.visible = portrait === true ? false : true;
      this.addChild(this.smallroad_container);

      this.cockroachroad_container = new createjs.Container();
      this.cockroachroad_container.x = this.bigroad_container.x + (brSize*(otherCol/2));
      this.cockroachroad_container.y = this.smallroad_container.y;
      this.cockroachroad_container.visible = portrait === true ? false : true;
      this.addChild(this.cockroachroad_container);


      this.roadHitarea = new createjs.Shape();
      this.roadHitarea.graphics.clear().f('rgba(255,255,255,0.01)').drawRect(0,0,(width - (predWidth*2)), height);
      this.addChild(this.roadHitarea);

      this.roadHitarea.on("click", () => {
        console.log(this.context.portrait, "HIT HIT HIT")
        if(!this.context.portrait) { //scale
          if(this.scaleX === 1) {
            let h = Math.abs(this.y - this.context.stage.canvas.height);

            this.context.component_lines.visible = false;
            createjs.Tween.get(this)
            .to({
              scaleY : 1.75,
              scaleX : 1.75,
              y : this.originalY - (h * 0.75)
            },120)
            .call(() => {
              this.context.component_lines.scaleX = 1.75              
              this.context.component_lines.scaleY = 1.75              
              this.context.component_lines.y = -540;
              this.context.component_lines.visible = true;              
            });        

          } else {
            this.context.component_lines.visible = false;
            this.context.component_lines.scaleX = 1              
            this.context.component_lines.scaleY = 1              
            this.context.component_lines.y = 0;              
            createjs.Tween.get(this)
            .to({
              scaleY : 1,
              scaleX : 1,
              y : this.originalY
            },120)
            .call(() => {
              this.context.component_lines.visible = true;              
            })
          }
          return;
        }

        if(this.pearlines.visible) {
          this.pearlines.visible = false;
          this.lines.visible = true;
          this.pearlroad_container.visible = false;
          this.bigroad_container.visible = true;
          this.smallroad_container.visible = true;
          this.bigeyeboy_container.visible = true;
          this.cockroachroad_container.visible = true;
          this.statContainer.visible = false;
        } else {
          this.pearlines.visible = true;
          this.lines.visible = false;
          this.pearlroad_container.visible = true;
          this.bigroad_container.visible = false;
          this.smallroad_container.visible = false;
          this.bigeyeboy_container.visible = false;
          this.cockroachroad_container.visible = false;
          this.statContainer.visible = true;
        }
      });
    },
    drawLines () {
      let row = 6;
      let col = 15;
      let otherRow = 12;
      let otherCol = 34;
      let pearlSize = 35;
      let brSize = 15;
      let width = 580;
      let height = 180;
      let hide = false;
      let moveTo = 0;

      if (this.context.portrait) {
        width = 625;
        height = 205;
        pearlSize = 35;
        brSize = 16.9;
        row = 6;
        col = 15;
        otherRow = 12;
        otherCol = 31;
        hide = false;
      } else {
        width = 655;
        height = 140;
        row = 6;
        col = 8;
        otherRow = 12;
        otherCol = 32;
        pearlSize = 23.33;
        brSize = 11.67;
        hide = true;
        moveTo = col*pearlSize
      }

      this.pearlines.graphics.clear().ss(.8).s(this.context.theme_color[window.theme].bar_color).moveTo(0,pearlSize)

      //pearl
      for(var i = 1; i <= row; i++) {
        this.pearlines.graphics.moveTo(0,pearlSize*i).lineTo(pearlSize*col,pearlSize*i)
      } // end for

      this.pearlines.graphics.moveTo(pearlSize,0);
      for(var x = 0; x <= col; x++) {
        this.pearlines.graphics.moveTo(pearlSize*x,0).lineTo(pearlSize*x,pearlSize*row)
      }

      //bigroad
      this.lines.graphics.ss(.8).s(this.context.theme_color[window.theme].bar_color).moveTo(0,brSize)
      this.lines.visible = hide;

      this.lines.graphics.moveTo(moveTo,16)
      for(var i = 0; i <= otherRow ; i++) {
        this.lines.graphics.moveTo(moveTo,brSize*i).lineTo(moveTo+(otherCol*brSize), brSize*i)
      }

      this.lines.graphics.moveTo(moveTo,0)
      for(var x = 0; x <= otherCol ; x++) {
        this.lines.graphics.moveTo(moveTo + (x*brSize),0).lineTo(moveTo+ (x*brSize),(otherRow*brSize))
      }
    },

    getText(x,y,text,font,color,align,baseLine){
      let textCt =  new createjs.Text(text,font,color);
      textCt.set({x:x,y:y});
      textCt.textAlign = align;
      textCt.textBaseline = baseLine;
      return textCt;
    },

    getLastPred(data, type) {

      let data2 = _.clone(data);

      data2.push({
        'mark': type
      });

      let biglast = fnFormat().fnFormatBigEyeBoy(data2, 6, 52);

      for (var i = 0; i < biglast.matrix.length; i++) {
        for (var e = 0; e < biglast.matrix[i].length; e++) {
          if (biglast.matrix[i][e] === undefined) continue;

          if ((i) == biglast.row) {
            if (biglast.matrix[0][e + 1] == undefined) {
              biglast.last_mark = biglast.matrix[i][e];
            }
          }
        }
      }

      let smallLast = fnFormat().fnFormatSmallRoad(data2, 6, 28);

      for (var i = 0; i < smallLast.matrix.length; i++) {
        for (var e = 0; e < smallLast.matrix[i].length; e++) {
          if (smallLast.matrix[i][e] === undefined) continue;


          if ((i) == smallLast.row) {
            if (smallLast.matrix[0][e + 1] == undefined) {
              smallLast.last_mark = smallLast.matrix[i][e]
            }
          }

        }
      }

      let roachlast = fnFormat().fnFormatCockroachPig(data2, 6, 28);

      for (var i = 0; i < roachlast.matrix.length; i++) {
        for (var e = 0; e < roachlast.matrix[i].length; e++) {
          if (roachlast.matrix[i][e] === undefined) continue;

          if ((i) == roachlast.row) {
            if (roachlast.matrix[roachlast.row][e + 1] == undefined) {
              // sp.last_child = true;
              roachlast.last_mark = roachlast.matrix[i][e]
            }
          }
        }
      }

      // return  {bigroad : biglast.last_mark ? biglast.last_mark : {mark :type =="p" ? "b" : "r" } , smallroad: smallLast.last_mark ? smallLast.last_mark : {mark :type =="p" ? "b" : "r" }, roach : roachlast.last_mark ? roachlast.last_mark : {mark :type =="p" ? "b" : "r" }};

      return {
        bigroad: biglast.last_mark ? biglast.last_mark : {
          mark: 'w'
        },
        smallroad: smallLast.last_mark ? smallLast.last_mark : {
          mark: 'w'
        },
        roach: roachlast.last_mark ? roachlast.last_mark : {
          mark: 'w'
        }
      };

    },
    shoeChange () {

      this.pearlroad_container.removeAllChildren();
      this.bigeyeboy_container.removeAllChildren();
      this.smallroad_container.removeAllChildren();
      this.bigroad_container.removeAllChildren();
      this.cockroachroad_container.removeAllChildren();
      this.shoe_counter.text = 0;

      this.tie_total_text.text = 0;
      this.player_total_text.text = 0;
      this.playerpair_total_text.text = 0;
      this.banker_total_text.text = 0;
      this.bankerpair_total_text.text = 0;

      this.player_prediction1.fillCmd.style = this.context.theme_color[window.theme].base_color;
      this.player_prediction2.fillCmd.style = this.context.theme_color[window.theme].base_color;
      this.player_prediction3.fillCmd.style = this.context.theme_color[window.theme].base_color;

      this.banker_prediction1.fillCmd.style = this.context.theme_color[window.theme].base_color
      this.banker_prediction2.fillCmd.style = this.context.theme_color[window.theme].base_color
      this.banker_prediction3.fillCmd.style = this.context.theme_color[window.theme].base_color

      if(this.cacheCanvas) {
        this.updateCache();
      }

    },
    checkPrediction(data) {

      let marks_p = this.getLastPred(data, "p");
      // console.log(marks_p, "asd,sajdhakdjhas")
      let marks_b = this.getLastPred(data, "b");
      //player mark
      if (marks_p.bigroad.mark.toLowerCase() == "b") {
        this.player_prediction1.fillCmd.style = '#1565c0';
      } else if (marks_p.bigroad.mark.toLowerCase() == "r") {
        this.player_prediction1.fillCmd.style = '#d33030';
      } else {
        this.player_prediction1.fillCmd.style = this.context.theme_color[window.theme].base_color;
      }

      //player mark
      if (marks_p.smallroad.mark.toLowerCase() == "b") {
        this.player_prediction2.fillCmd.style = '#1565c0';
      } else if (marks_p.smallroad.mark.toLowerCase() == "r") {
        this.player_prediction2.fillCmd.style = '#d33030';
      } else {
        this.player_prediction2.fillCmd.style = this.context.theme_color[window.theme].base_color;
      }

      //player mark
      if (marks_p.roach.mark.toLowerCase() == "b") {
        this.player_prediction3.fillCmd.style = '#1565c0';
      } else if (marks_p.roach.mark.toLowerCase() == "r") {
        this.player_prediction3.fillCmd.style = '#d33030';
      } else {
        this.player_prediction3.fillCmd.style = this.context.theme_color[window.theme].base_color;
      }



      // banker mark
      if (marks_b.bigroad.mark.toLowerCase() == "b") {
        this.banker_prediction1.fillCmd.style = '#1565c0'
      } else if (marks_b.bigroad.mark.toLowerCase() == "r") {
        this.banker_prediction1.fillCmd.style = '#d33030'
      } else {
        this.banker_prediction1.fillCmd.style = this.context.theme_color[window.theme].base_color
      }

      // banker mark
      if (marks_b.smallroad.mark.toLowerCase() == "b") {
        this.banker_prediction2.fillCmd.style = '#1565c0'
      } else if (marks_b.smallroad.mark.toLowerCase() == "r") {
        this.banker_prediction2.fillCmd.style = '#d33030'
      } else {
        this.banker_prediction2.fillCmd.style = this.context.theme_color[window.theme].base_color
      }
      // banker mark
      if (marks_b.roach.mark.toLowerCase() == "b") {
        this.banker_prediction3.fillCmd.style = '#1565c0'
      } else if (marks_b.roach.mark.toLowerCase() == "r") {
        this.banker_prediction3.fillCmd.style = '#d33030'
      } else {
        this.banker_prediction3.fillCmd.style = this.context.theme_color[window.theme].base_color
      }

    },
    setPercentages(data) {
      data = _.filter(data, function(e) {
        return e;
      });

      let count = _.groupBy(data, function(e) {
        return e.mark;
      });

      let player_count = 0;
      let banker_count = 0;
      let tie_count = 0;

      let player_pair_cnt = 0;
      let banker_pair_cnt = 0;

      let banker_natural_cnt = 0;
      let player_natural_cnt = 0;

      let natural = {
        banker: 0,
        player: 0
      };

      data.forEach(function(e) {
        if (e.mark == "b" || e.mark == "q" || e.mark == "w" || e.mark == "e") {
          banker_count++
        } else if (e.mark == "p" || e.mark == "f" || e.mark == "g" || e.mark == "h") {
          player_count++
        } else if (e.mark == "t" || e.mark == "i" || e.mark == "j" || e.mark == "k") {
          tie_count++
        }

        if (e.mark == "q" || e.mark == "w" || e.mark == "f" || e.mark == "g" || e.mark == "i" || e.mark == "j") {
          banker_pair_cnt++;
        }

        if (e.mark == "w" || e.mark == "e" || e.mark == "g" || e.mark == "h" || e.mark == "j" || e.mark == "k") {
          player_pair_cnt++;
        }

        _.forEach(e.natural, (element) => {
          natural[element]++;
        })
      });

      banker_natural_cnt = natural['banker'];
      player_natural_cnt = natural['player'];

      this.shoe_counter.text = data.length;

      this.tie_total_text.text= tie_count;
      this.player_total_text.text = player_count;
      // this.playerpair_total_text.text= player_pair_cnt;
      // this.playernatural_total_text.text= player_natural_cnt;
      // ===  banker total texts
      this.banker_total_text.text = banker_count;
      // this.bankerpair_total_text.text= banker_pair_cnt;
      // this.bankernautral_total_text.text= banker_natural_cnt;

      let game_stat = {
        total_games: parseInt(banker_count) + parseInt(player_count) + parseInt(tie_count),
        banker_win: parseInt(banker_count),
        player_win: parseInt(player_count),
        tie_win: parseInt(tie_count)
      }

      this.context.component_dealer_data.setStats(game_stat);
      // this.updateCache();
    },
    predictMarks(type) {

      this.clone_marks = _.clone(this.context.roadMarks);
      this.clone_marks.push({
        num: 0,
        mark: type
      })

      this.drawPearlRoad(this.clone_marks);
      this.drawBigRoad(this.clone_marks);
      this.drawBigeyeboy(this.clone_marks);
      this.drawSmallRoad(this.clone_marks);
      this.drawCockroachroad(this.clone_marks);

      if (type == "p") {
        setTimeout(() => {
          this.clone_marks.splice(this.clone_marks.length - 1, 1)

          this.drawPearlRoad(this.context.roadMarks);
          this.drawBigRoad(this.context.roadMarks);
          this.drawBigeyeboy(this.context.roadMarks);
          this.drawSmallRoad(this.context.roadMarks);
          this.drawCockroachroad(this.context.roadMarks);

          this.player_prediction_clicked = false
        }, 4000)
      } else {
        setTimeout(() => {
          this.clone_marks.splice(this.clone_marks.length - 1, 1)

          this.drawPearlRoad(this.context.roadMarks);
          this.drawBigRoad(this.context.roadMarks);
          this.drawBigeyeboy(this.context.roadMarks);
          this.drawSmallRoad(this.context.roadMarks);
          this.drawCockroachroad(this.context.roadMarks);
          this.banker_prediction_clicked = false
        }, 4000)
      }


      //reset on click

      // this.player_prediction1.graphics.clear().ss(3).s("#1565c0").drawCircle(0,0,8);
      // this.player_prediction2.graphics.clear().beginFill("#1565c0").drawCircle(0,0,9);
      // this.player_prediction3.graphics.clear().beginFill("#1565c0").drawRoundRect(0,0,5,20,2);

      // this.banker_prediction1.graphics.clear().ss(3).s("#d33030").drawCircle(0,0,8);
      // this.banker_prediction2.graphics.clear().beginFill("#d33030").drawCircle(0,0,9);
      // this.banker_prediction3.graphics.clear().beginFill("#d33030").drawRoundRect(0,0,5,20,2);

      let biglast = _.clone(this.bigeyeboy_container.children);

      biglast = _.find(biglast, (e) => {
        if (e.last_child) {
          return e.clone()
        }
      });

      let smalllast = _.clone(this.smallroad_container.children);

      smalllast = _.find(smalllast, (e) => {
        if (e.last_child) {
          return e.clone()
        }
      });


      let roachlast = _.clone(this.cockroachroad_container.children);

      roachlast = _.find(roachlast, (e) => {
        if (e.last_child) {
          return e.clone()
        }
      });

      let toChange1 = "";
      let toChange2 = "";
      let toChange3 = "";

      if (type == "p") {
        toChange1 = this.player_prediction1;
        toChange2 = this.player_prediction2;
        toChange3 = this.player_prediction3;
      } else {

        toChange1 = this.banker_prediction1
        toChange2 = this.banker_prediction2
        toChange3 = this.banker_prediction3
        // this.banker_prediction3.graphics.clear().beginFill("#d33030").drawRoundRect(0,0,5,20,2);
      }

      // if(biglast.mark == "B") {
      //  toChange1.graphics.clear().ss(3).s("#1565c0").drawCircle(0,0,8);
      // } else {
      //  toChange1.graphics.clear().ss(3).s("#d33030").drawCircle(0,0,8);
      // }

      // if(smalllast.mark == "B") {
      //  toChange2.graphics.clear().beginFill("#1565c0").drawCircle(0,0,9);
      // }
      // else {
      //  toChange2.graphics.clear().beginFill("#d33030").drawCircle(0,0,9);
      // }

      // if(roachlast.mark == "B") {
      //  toChange3.graphics.clear().beginFill("#1565c0").drawRoundRect(0,0,5,20,2);
      // }
      // else {
      //  toChange3.graphics.clear().beginFill("#d33030").drawRoundRect(0,0,5,20,2);
      // }

      createjs.Tween.get(toChange1)
        .to({
          alpha: 1
        }, 200)
        .to({
          alpha: 0
        }, 200)
        .to({
          alpha: 1
        }, 200)
        .to({
          alpha: 0
        }, 200)
        .to({
          alpha: 1
        }, 200)


      createjs.Tween.get(toChange2)
        .to({
          alpha: 1
        }, 200)
        .to({
          alpha: 0
        }, 200)
        .to({
          alpha: 1
        }, 200)
        .to({
          alpha: 0
        }, 200)
        .to({
          alpha: 1
        }, 200)

      createjs.Tween.get(toChange3)
        .to({
          alpha: 1
        }, 200)
        .to({
          alpha: 0
        }, 200)
        .to({
          alpha: 1
        }, 200)
        .to({
          alpha: 0
        }, 200)
        .to({
          alpha: 1
        }, 200)

      // setTimeout(() => {
      //  if(type  == "p") {

      //    toChange1.graphics.clear().ss(3).s("#1565c0").drawCircle(0,0,8);
      //    toChange2.graphics.clear().beginFill("#1565c0").drawCircle(0,0,9);
      //    toChange3.graphics.clear().beginFill("#1565c0").drawRoundRect(0,0,5,20,2);


      //  } else {
      //    toChange1.graphics.clear().ss(3).s("#d33030").drawCircle(0,0,8);
      //    toChange2.graphics.clear().beginFill("#d33030").drawCircle(0,0,9);
      //    toChange3.graphics.clear().beginFill("#d33030").drawRoundRect(0,0,5,20,2);
      //  }

      // },4000);

      // this.banker_prediction1.graphics.clear().ss(3).s("#d33030").drawCircle(0,0,8);
      // this.banker_prediction2.graphics.clear().beginFill("#d33030").drawCircle(0,0,9);
      // this.banker_prediction3.graphics.clear().beginFill("#d33030").drawRoundRect(0,0,5,20,2);

    },
    drawBigeyeboy(data) {
      let mark_data = null;
      let mark_data2 = null;
      this.bigeyeboy_container.removeAllChildren();

      let r = 2.5;
      let col = 34*2;
      let offSetX = 1, offSetY = 1;
      if(this.context.portrait) {
        r = 3.5;
        col = 38*2;
        offSetX = 2.25;
        offSetY = 1.75;
      }

      mark_data = fnFormat().fnFormatBigEyeBoy(data, 6, 52);
      mark_data2 = fnFormat().fnFormatBigEyeBoy(data, 6, 26);

      for (var i = 0; i < mark_data.matrix.length; i++) {
        for (var e = 0; e < mark_data.matrix[i].length; e++) {
          if (mark_data.matrix[i][e] === undefined) continue;

          var roadmap = new bcRoadmap(r);
          roadmap.play('bigeye-'+mark_data.matrix[i][e].mark.toLowerCase());
          let sp = roadmap.instance;
          sp.x = e * ((r*2)+offSetX) + 1;
          sp.y = i * ((r*2)+offSetY);

          if ((i) == mark_data.row) {
            if (mark_data.matrix[0][e + 1] == undefined) {
              sp.last_child = true;
              sp.mark = mark_data.matrix[i][e].mark
            }
          }

          this.bigeyeboy_container.addChild(sp);
        }
      }

      this.bigeyeboy_container.children.forEach((e) => {
        if (e.last_child) {
          createjs.Tween.get(e).wait(100)
            .to({
              alpha: 1
            }, 150)
            .to({
              alpha: 0
            }, 150)
            .to({
              alpha: 1
            }, 150)
            .to({
              alpha: 0
            }, 150)
            .to({
              alpha: 1
            }, 150)
        }
      })

      return mark_data;
      // this.drawSmallRoad(mark_data2);
    },
    drawSmallRoad(data) {

      let mark_data = null;

      let r = 2.5;
      let col = 34;
      let offSetX = 1, offSetY = 1;
      if(this.context.portrait) {
        r = 3.5;
        col = 38;
        offSetY = 1.7;
        offSetX = 1.7;
      }

      mark_data = fnFormat().fnFormatSmallRoad(data, 6, col);
      this.smallroad_container.removeAllChildren();

      for (var i = 0; i < mark_data.matrix.length; i++) {
        for (var e = 0; e < mark_data.matrix[i].length; e++) {
          if (mark_data.matrix[i][e] === undefined) continue;

          var roadmap = new bcRoadmap(r);
          roadmap.play('small-'+mark_data.matrix[i][e].mark.toLowerCase());
          let sp = roadmap.instance;
          sp.x = e * ((r*2)+offSetX) + 1;
          sp.y = i * ((r*2)+offSetY);

          if ((i) == mark_data.row) {
            if (mark_data.matrix[0][e + 1] == undefined) {
              sp.last_child = true;
              sp.mark = mark_data.matrix[i][e].mark;
            }
          }

          this.smallroad_container.addChild(sp);
        }
      }

      this.smallroad_container.children.forEach((e) => {
        if (e.last_child) {
          createjs.Tween.get(e).wait(100)
            .to({
              alpha: 1
            }, 150)
            .to({
              alpha: 0
            }, 150)
            .to({
              alpha: 1
            }, 150)
            .to({
              alpha: 0
            }, 150)
            .to({
              alpha: 1
            }, 150)
        }
      })

      return mark_data;

      // this.drawCockroachroad(mark_data);
    },
    drawCockroachroad(data) {
      this.cockroachroad_container.removeAllChildren();

      let r1 = 2.8
      let scale = 0.75;
      let offSetX = 0.3, offSetY = 0
      let col = 34;
      let moveX = 1;
      if(this.context.portrait) {
        r1 = 4;
        scale = 1;
        offSetX = 0.7;
        col = 38;
        moveX = 0
      }

      let mark_data = null;
      mark_data = fnFormat().fnFormatCockroachPig(data, 6, col);

      for (var i = 0; i < mark_data.matrix.length; i++) {
        for (var e = 0; e < mark_data.matrix[i].length; e++) {
          if (mark_data.matrix[i][e] === undefined) continue;

          var roadmap = new bcRoadmap(r1);
          roadmap.play('roach-'+mark_data.matrix[i][e].mark.toLowerCase());
          let sp = roadmap.instance;
          sp.x = e * ((r1*2)+offSetX) + moveX;
          sp.y = i * ((r1*2)+offSetY);

          sp.scaleX = sp.scaleY = scale;

          if ((i) == mark_data.row) {
            if (mark_data.matrix[mark_data.row][e + 1] == undefined) {
              sp.last_child = true;
              sp.mark = mark_data.matrix[i][e].mark;
            }
          }

          this.cockroachroad_container.addChild(sp);
        }
      }

      this.cockroachroad_container.children.forEach((e) => {
        if (e.last_child) {
          createjs.Tween.get(e).wait(100)
            .to({
              alpha: 1
            }, 150)
            .to({
              alpha: 0
            }, 150)
            .to({
              alpha: 1
            }, 150)
            .to({
              alpha: 0
            }, 150)
            .to({
              alpha: 1
            }, 150)
        }
      })

      return mark_data;
    },
    drawPearlRoad(data) {
      let mark_data = null;
      this.pearlroad_container.removeAllChildren();

      let slaveJson = {
        'supersix' : {
          'b': 'l',
          'q': 'm',
          'w': 'n',
          'e': 'o',
        },
        'bonus' : {
          'b': 'l',
          'q': 'm',
          'w': 'n',
          'e': 'o',
        }
      }
      let offSetX = 2.4;
      let col = 10;
      if(this.context.portrait) col = 17, offSetX = 3

      mark_data = fnFormat(slaveJson).fnFormatBCPearlRoad(data, 6, col);

      let r1 = 10.8, r2 = 4;
      if(this.context.portrait) {
        r1 = 16, r2 = 5;
      }

      for (var i = 0; i < mark_data.matrix.length; i++) {
        for (var e = 0; e < mark_data.matrix[i].length; e++) {
          if (mark_data.matrix[i][e] === undefined) continue;

          var roadmap = new bcRoadmap(r1, r2);
          roadmap.play('pearl-'+mark_data.matrix[i][e].mark.toLowerCase(), '14px lato-black');

          let sp = roadmap.instance;
          sp.x = (e * ((r1*2) + offSetX)) + 1.5;
          sp.y = (i * ((r1*2) + 3));

          if ((i + 1) == mark_data.row) {
            if (mark_data.matrix[i + 1][e] == undefined) {
              sp.last_child = true;
            }
          }

          this.pearlroad_container.addChild(sp);
        }
      }

      this.pearlroad_container.children.forEach((e) => {
        if (e.last_child) {
          createjs.Tween.get(e).wait(100)
            .to({
              alpha: 1
            }, 150)
            .to({
              alpha: 0
            }, 150)
            .to({
              alpha: 1
            }, 150)
            .to({
              alpha: 0
            }, 150)
            .to({
              alpha: 1
            }, 150)
        }
      })

      console.log(this.pearlroad_container, "PEAAARRRRRL")
      return mark_data;
    },
    drawBigRoad(data) {
      this.bigroad_container.removeAllChildren();

      let slaveJson = {
        'supersix' : {
          'b': 'l',
          'q': 'm',
          'w': 'n',
          'e': 'o',
        },
        'bonus' : {
          'b': 'l',
          'q': 'm',
          'w': 'n',
          'e': 'o',
        }
      }

      let r1 = 4.8, r2 = 2;
      let w = 2, h = 10; 
      let offSetX = 2.4, offSetY = 2.6;
      let col = 34;
      if(this.context.portrait) {
        r1 = 7, r2 = 3;
        w = 3, h = 18; 
        offSetX = 3.4;
        offSetY = 3.4;
        col = 38;
      }

      data = fnFormat(slaveJson).fnFormatBCBigRoad(data, 6, col);

      for (var i = 0; i < data.matrix.length; i++) {
        for (var e = 0; e < data.matrix[i].length; e++) {
          if (data.matrix[i][e] === undefined) continue;

          var roadmap = new bcRoadmap(r1, r2);
          roadmap.play('big-'+data.matrix[i][e].mark.toLowerCase());
          roadmap.ties(data.matrix[i][e].ties, {color:this.context.theme_color[window.theme].text_color, width : w, height : h});
          let sp = roadmap.instance;

          sp.x = (e * ((r1*2)+offSetX))+1.5;
          sp.y = (i * ((r1*2)+offSetY))+1;

          this.bigroad_container.addChild(sp);

          if ((i) == data.row) {
            if (data.matrix[0][e + 1] == undefined) {
              sp.last_child = true;
            }
          }
        }
      }

      this.bigroad_container.children.forEach((e) => {
        if (e.last_child) {
          createjs.Tween.get(e).wait(100)
            .to({
              alpha: 1
            }, 150)
            .to({
              alpha: 0
            }, 150)
            .to({
              alpha: 1
            }, 150)
            .to({
              alpha: 0
            }, 150)
            .to({
              alpha: 1
            }, 150)
        }
      });

      return data;
    },
    changeTheme (new_theme) {
      let row = 6;
      let col = 15;
      let otherRow = 12;
      let otherCol = 34;
      let pearlSize = 35;
      let brSize = 15;
      let width = 580;
      let height = 180;
      let moveTo = 0;

      if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
        width = 625;
        height = 210;
        pearlSize = 35;
        brSize = 17.35;
        row = 6;
        col = 15;
        otherRow = 12;
        otherCol = 36;
        moveTo = 0;
      } else {
        width = 655;
        height = 144;
        pearlSize = 24;
        row = 6;
        col = 8;
        brSize = 12;
        otherRow = 12;
        otherCol = 32;
        moveTo = col*pearlSize;
      }

      this.roadmapbg.graphics.beginFill(this.context.theme_color[new_theme].base_color).drawRect(0,0,width,height);

      this.pearlines.graphics.clear().ss(.8).s(this.context.theme_color[new_theme].bar_color).moveTo(0,pearlSize)

      //pearl
      for(var i = 1; i <= row; i++) {
        this.pearlines.graphics.moveTo(0,pearlSize*i).lineTo(pearlSize*col,pearlSize*i)
      } // end for

      this.pearlines.graphics.moveTo(pearlSize,0);
      for(var x = 0; x <= col; x++) {
        this.pearlines.graphics.moveTo(pearlSize*x,0).lineTo(pearlSize*x,pearlSize*row)
      }

      this.lines.graphics.clear().ss(.8).s(this.context.theme_color[window.theme].bar_color).moveTo(0,brSize)

      this.lines.graphics.moveTo(moveTo,16)
      for(var i = 1; i <= otherRow ; i++) {
        this.lines.graphics.moveTo(moveTo,brSize*i).lineTo((otherCol*brSize) + moveTo, brSize*i)
      }

      this.lines.graphics.moveTo(moveTo,0)
      for(var x = 0; x <= otherCol ; x++) {
        this.lines.graphics.moveTo(moveTo + (x*brSize),0).lineTo(moveTo+ (x*brSize),(otherRow*brSize))
      }

      this.prediction_bg.fillCmd.style = this.context.theme_color[new_theme].base_color;
      this.prediction_bg2.fillCmd.style = this.context.theme_color[new_theme].base_color;

      this.shoe_counter.color = this.context.theme_color[new_theme].text_color;
      this.dragon_total_text.color = this.context.theme_color[new_theme].text_color;
      this.tiger_total_text.color = this.context.theme_color[new_theme].text_color;
      this.tie_total_text.color = this.context.theme_color[new_theme].text_color;
      this.shoeIndi.color = this.context.theme_color[new_theme].text_color;

      let old_theme = new_theme ==='white' ? this.context.theme_color['black'].base_color : this.context.theme_color['white'].base_color;

      if(this.player_prediction1.fillCmd.style === old_theme) {
        this.player_prediction1.fillCmd.style = this.context.theme_color[new_theme].base_color;
      }
      if(this.player_prediction2.fillCmd.style === old_theme) {
        this.player_prediction2.fillCmd.style = this.context.theme_color[new_theme].base_color;
      }
      if(this.player_prediction3.fillCmd.style === old_theme) {
        this.player_prediction3.fillCmd.style = this.context.theme_color[new_theme].base_color;
      }

      if(this.banker_prediction1.fillCmd.style === old_theme) {
        this.banker_prediction1.fillCmd.style = this.context.theme_color[new_theme].base_color
      }
      if(this.banker_prediction2.fillCmd.style === old_theme) {
        this.banker_prediction2.fillCmd.style = this.context.theme_color[new_theme].base_color
      }
      if(this.banker_prediction3.fillCmd.style === old_theme) {
        this.banker_prediction3.fillCmd.style = this.context.theme_color[new_theme].base_color
      }

      if(this.cacheCanvas) {
        this.updateCache();
      }
    },
    fnUpdateCaching (anim) {

      // let width = 580;
      // let height = 0;

      // if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
      //   height = 210;
      // } else {
      //   height = 144;
      // }
      // this.uncache();
      // setTimeout(() => {
      //   this.cache(0,0, this.context.context.width, height);
      // },850);

    },
    screenOrientation () {
      this.removeAllChildren();
      this.main();

      if(this.context.roadMarks) {
        this.setPercentages(this.context.roadMarks);
        this.drawPearlRoad(this.context.roadMarks);
        this.drawBigRoad(this.context.roadMarks);
        this.drawBigeyeboy(this.context.roadMarks);
        this.drawCockroachroad(this.context.roadMarks);
        this.drawSmallRoad(this.context.roadMarks);
        this.checkPrediction(this.context.roadMarks);
      }
      // this.fnUpdateCaching(true); 
    }
  });

  return instance;
}
