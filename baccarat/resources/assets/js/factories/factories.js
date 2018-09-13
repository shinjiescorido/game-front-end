import card_config from '../assets/cards_animation_config';

const createSpriteRoadMap =  function (imageRes,width,height,targetToSprite) {
  let spriteData= {
    images: [imageRes],
    frames  :{width:width, height:height},
    animations:{
      "pearl-p":0,
      "pearl-h":1,
      "pearl-f":2,
      "pearl-g":3,
      "pearl-b":4,
      "pearl-e":5,
      "pearl-q":6,
      "pearl-w":7,
      "pearl-t":8,
      "pearl-k":9,
      "pearl-i":10,
      "pearl-j":11,
      "pearl-l":75,
      "pearl-m":77,
      "pearl-n":78,
      "pearl-o":76,
      "big-triple":17,

      "big-p":18,
      "big-h":19,
      "big-f":20,
      "big-g":21,

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
      "big-p-t":22,
      "big-h-t":23,
      "big-f-t":24,
      "big-g-t":25,

      "big-j":17,
      "big-j-t":17,
      "big-k":17,
      "big-k-t":17,
      "big-i":17,
      "big-i-t":17,
      "big-t":17,
      "big-t-t":17,

      "big-b":26,
      "big-e":27,
      "big-q":28,
      "big-w":29,

      "big-b-t":30,
      "big-e-t":31,
      "big-q-t":31,
      "big-w-t":32,

      "bigeye-R" : 26,//18,
      "bigeye-B" : 18,

      "bigsmall-R" : 13,//12,
      "bigsmall-B" : 12, //13,

      "roach-R" : 16, //15,
      "roach-B" : 15, //16,

      /// dragontiger 68 len
      "pearl-dt-d" : 43, //dragon
      "pearl-dt-z" : 44, //tiger
      "pearl-dt-a" : 8, //tie
      "pearl-dt-b" : 46, //dragon
      "pearl-dt-c" : 48, //dragon
      "pearl-dt-e" : 45, //tiger
      "pearl-dt-f" : 47, //tiger
      "pearl-dt-g" : 46, //dragon
      "pearl-dt-h" : 46, //dragon
      "pearl-dt-i" : 48, //dragon
      "pearl-dt-j" : 48, //dragon
      "pearl-dt-k" : 45, //tiger
      "pearl-dt-l" : 47, //tiger
      "pearl-dt-m" : 45, //tiger
      "pearl-dt-n" : 47, //tiger
      "pearl-dt-s" : 73, //suited tie big
      "pearl-dt-t" : 74, //suited tie small

      //not sure here
      "pearl-dt-o" : 8, //tie
      "pearl-dt-p" : 8,  //tie
      "pearl-dt-q" : 8, //tie
      "pearl-dt-r" : 8 //tie
    }
  }

  let sprite=new createjs.SpriteSheet(spriteData);
  targetToSprite = new createjs.Sprite(sprite,"pearl-p");

  return targetToSprite;
}

const createSprite = function (imageRes,width,height,targetToSprite) {
  let spriteData= {
    images: [imageRes],
    frames  :{width:width, height:height},
    animations:{
      steady:0,
      select:1,
      hover:2,
      steadyAngled:4,
      win:3,
      drop_animation : [0,1]
      // drop_animation : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,"drop_animation", 0.2]
    }
  }

  let sprite=new createjs.SpriteSheet(spriteData);
  targetToSprite = new createjs.Sprite(sprite,"steady");

  return targetToSprite;
}

const createCardSprite = function (self,width,height, card_res) {
  let cards_sprite_data = {
    images: [self.context.getResources(card_res)],
    frames: {width:width,height:height},
    animations: card_config()
  }

  let cards_spriteSheet = new createjs.SpriteSheet(cards_sprite_data);

  return new createjs.Sprite(cards_spriteSheet,"back_red");
}

const createTileSprite = function (self, width, height, card_res) {
  let tile_sprite_data = {
    images: [self.context.getResources(card_res)],
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
  if(card_res == "small_tiles") {
    tile_sprite_data.frames.regY = 1.2;
  }

  let tiles_spriteSheet = new createjs.SpriteSheet(tile_sprite_data);
  return new createjs.Sprite(tiles_spriteSheet,"tile-0");
}

const randomNum = function (min, max) {
      return Math.random() * (max - min) + min;
}

const formatNumber = function(num) {
      num+= '';
      var x = _.split(num,'.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      return x1 + x2;
    }

// let target = null;
// let count = 0; let diff = 0;
// let target_count= 0;
// let timer = null;
// let text = "";
// let sel = null;

const numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const moneyFormat = function(x) {
  return parseInt(x).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const numberCounter = function(target_obj, target_number,sel) {

    var target = null;
    var count = 0; let diff = 0;
    var target_count= 0;
    var timer = null;
    var text = "";
    // var sel = sel;

    count = 0;
    diff = 0;

    // sel = sel;
    target_count = _.toNumber(target_number);
    // target = target_obj;
    timer = null;

    text = target_number;

    if(_.isUndefined(sel)){
      sel = 0;
    }

    counter(target_obj, count, diff, target_count, timer, text, sel);
}

const counter = function(target, count, diff, target_count, timer, text, sel) {
    diff = target_count - count;
    if(diff > 0) {
      count += Math.ceil(diff / 2);
    }
    target.text = formatNumber(count);
    if(count < target_count) {
      timer = setTimeout(function() { counter(target, count, diff, target_count, timer, text, sel); }, 10);
    } else {
      clearTimeout(timer);

      if (sel == 1){
        target.text = '+ '+numberWithCommas(text);
      }else if (sel == 2){
        target.text = numberWithCommas(text)+' %';
      }else{
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

const playSound = function (sound, vol){
  var instance  = createjs.Sound.play(sound, {interrupt: createjs.Sound.INTERUPT_LATE});
  // instance.volume = vol ? vol : 1;
  instance.volume = config.effect;

  return instance;
}
const getSlaveParam = function (slave = 'supersix') {
  let paramSlave = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent('slave').replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  return  paramSlave == window.slave && paramSlave == slave;
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

    if (date) {
        if (date.indexOf(' ') < 0) return date;

        if (isSafari) {
          date = date.replace(/-/g , "/");
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

const confirmButton = function (scale) {
  this.scale = scale;
  this.container = new createjs.Container();

  this.bg = new createjs.Shape();
  this.bg.graphics.beginFill("#2b2b2b").drawCircle(0,0,66);
  this.bg.alpha = 0.5;
  this.container.addChild(this.bg);

  this.bg2 = new createjs.Shape();
  this.bg2.graphics.beginLinearGradientFill(["#404042","#585659","#696a6e"],[0,0.5,1], 0,0,0,100).drawCircle(0,2,56);
  this.container.addChild(this.bg2);

  this.base = new createjs.Shape();
  this.base.set({x: -44, y : -43 });
  this.container.addChild(this.base);

  let posX = -16;
  let posY = 16;
  this.obj1 = new createjs.Shape();
  this.fillCmd = this.obj1.graphics.beginFill("#fff").command;
  this.obj1.graphics.drawRoundRectComplex(0,0,55,10,2,5,5,2);
  this.obj1.rotation = -45;
  this.obj1.set({x:posX,y:posY})

  this.obj2 = new createjs.Shape();
  this.fillCmd2 = this.obj2.graphics.beginFill("#fff").command;
  this.obj2.graphics.drawRoundRectComplex(0,0,30,10,2,5,5,2);
  this.obj2.set({x:6 + posX,y:8 + posY});
  this.obj2.rotation = -135;

  this.obj_container = new createjs.Container();
  this.obj_container.addChild(this.obj1, this.obj2);
  this.container.addChild(this.obj_container);


  this.timer_text = new createjs.Text("0", "30px lato-black", "#fff");
  this.timer_text.textAlign = "center";
  this.timer_text.textBaseline = "middle";
  this.timer_text.scaleX = 0;
  this.timer_text.scaleY = 0;
  this.timer_text.y = 20;
  this.container.addChild(this.timer_text);

  this.timerIntervals = [];

  this.container.cache(-65,-65,130,130, this.scale);

  this.container.startTimerAnim = (time) => {

    this.container.uncache();

    let t = time;
    createjs.Tween.get(this.obj_container)
    .wait(1000)
    .to({
      scaleX : 0.65,
      scaleY: 0.65,
      y : -16
    }, 200)

    this.timer_text.visible = true;
    this.timer_text.text = time;

    this.timerIntervals.push(setInterval(() => {
      t--;
      createjs.Tween.get(this.timer_text)
      .to({
        scaleY : 1,
        scaleX : 1
      },200)
      .wait(600)
      .call((timer, time) => {
        timer.text = t;
        timer.scaleX = timer.scaleY = 0;
      }, [this.timer_text, t]);

      if(t < 0) {
        this.clearAllIntervals();
        this.container.stopAnim();
      }
    }, 1000));
  }

  this.clearAllIntervals = () => {
    this.timerIntervals.forEach((i) => {
      clearInterval(i);
    });
  }

  this.container.stopAnim = () => {
    createjs.Tween.get(this.obj_container)
    .wait(200)
    .to({
      scaleX : 1,
      scaleY: 1,
      y : 0
    }, 200)
    .call((obj, container) => {
      createjs.Tween.removeTweens(obj);

      container.cache(-65,-65,130,130, this.scale);
      container.updateCache();
    }, [this.obj_container, this.container]);

    createjs.Tween.removeTweens(this.timer_text);
    this.timer_text.scaleY = 0;
    this.timer_text.scaleY = 0;
    this.timer_text.visible = false;
  }

  this.container.gotoAndStop = (type) => {
      this.container.currentAnimation = type;
      switch(type) {
        case 'up':
          this.base.graphics.clear().beginLinearGradientFill(["#266443","#389368","#266443"],[0,0.5,1], 0,0,90,0).drawCircle(45,45,45);
          this.fillCmd.style = "#fffde7";
          this.fillCmd2.style = "#fffde7";
          this.timer_text.color = "#fffde7";
          break;
        case 'click':
          this.base.graphics.clear().beginFill('#266443').drawCircle(45,45,45);
          this.fillCmd.style = "#91af94";
          this.fillCmd2.style = "#91af94";
          this.timer_text.color = "#91af94";
          break;
        case 'hover':
          this.base.graphics.clear().beginLinearGradientFill(["#268f44","#37b14a","#268f44"],[0,0.5,1], 0,0,90,0).drawCircle(45,45,45);
          this.fillCmd.style = "#fffde7";
          this.fillCmd2.style = "#fffde7";
          this.timer_text.color = "#fffde7";
          break;
        case 'disabled':
          this.base.graphics.clear().ss(1).s('#808080').drawCircle(45,45,45);
          this.fillCmd.style = "#7b7b79";
          this.fillCmd2.style = "#7b7b79";
          this.timer_text.color = "#7b7b79";
          break;
      }

      if(this.container.cacheCanvas) {
        this.container.updateCache();
      }
  }
}

const clearButton =  function(scale) {
  this.scale = scale;

  this.container = new createjs.Container();

  this.bg = new createjs.Shape();
  this.bg.graphics.beginFill("#2b2b2b").arc(0,0,68,10,0);
  this.bg.alpha = 0.5;
  this.bg.rotation = -16
  this.container.addChild(this.bg);

  this.bg2 = new createjs.Shape();
  this.bg2.graphics.beginLinearGradientFill(["#404042","#585659","#696a6e"],[0,0.5,1], 0,0,0,100).drawCircle(0,0,53);
  this.container.addChild(this.bg2);

  this.base = new createjs.Shape();
  this.base.set({x: -44, y : -44 });
  this.container.addChild(this.base);

  let posX = -16;
  let posY = 16;
  this.obj1 = new createjs.Shape();
  this.fillCmd = this.obj1.graphics.beginFill("#fff").command;
  this.obj1.graphics.drawRoundRect(0,0,48,10,4);

  this.container.addChild(this.obj1);
  this.obj1.rotation = -45;
  this.obj1.set({x:0,y:0, regX : (48/2), regY: 5})

  this.obj2 = new createjs.Shape();
  this.fillCmd2 = this.obj2.graphics.beginFill("#fff").command;
  this.obj2.graphics.drawRoundRect(0,0,48,10,4);
  this.container.addChild(this.obj2);

  this.obj2.set({x:0,y:0, regX : (48/2), regY: 5});
  this.obj2.rotation = -135;

  this.container.cache(-68,-68,68*2,68*2, this.scale);

  this.container.gotoAndStop = (type) => {
    this.container.currentAnimation = type;
    switch(type) {
      case 'up':
        this.base.graphics.clear().beginLinearGradientFill(["#632323","#802d2d","#632323"],[0,0.5,1], 0,0,88,0).drawCircle(44,44,44);
        this.fillCmd.style = "#c68080";
        this.fillCmd2.style = "#c68080";
        break;
      case 'click':
        this.base.graphics.clear().beginFill('#812727').drawCircle(44,44,44);
        this.fillCmd.style = "#a35353";
        this.fillCmd2.style = "#a35353";
        break;
      case 'hover':
        this.base.graphics.clear().beginLinearGradientFill(["#992827","#ce282a","#992827"],[0,0.5,1], 0,0,88,0).drawCircle(44,44,44);
        this.fillCmd.style = "#c68080";
        this.fillCmd2.style = "#c68080";
        break;
      case 'disabled':
        this.base.graphics.clear().ss(1).s('#808080').drawCircle(44,44,44);
        this.fillCmd.style = "#6b5d5f";
        this.fillCmd2.style = "#6b5d5f";
        break;
    }

    if(this.container.cacheCanvas) {
      this.container.updateCache();
    }
  }
}

const undoButton =  function(scale) {
  this.scale = scale;

  this.container = new createjs.Container();

  this.bg = new createjs.Shape();
  this.bg.graphics.beginFill("#2b2b2b").arc(0,0,68,10,0);
  this.bg.alpha = 0.5;
  this.bg.rotation = -16
  this.container.addChild(this.bg);

  this.bg2 = new createjs.Shape();
  this.bg2.graphics.beginLinearGradientFill(["#404042","#585659","#696a6e"],[0,0.5,1], 0,0,0,100).drawCircle(0,0,53);
  this.container.addChild(this.bg2);

  this.base = new createjs.Shape();
  this.base.set({x: -44, y : -44 });
  this.container.addChild(this.base);

  let posX = -16;
  let posY = 16;
  this.obj1 = new createjs.Shape();
  this.fillCmd = this.obj1.graphics.beginFill("#fff").command;

  var startX = -10,startY = 10;

  this.obj1.graphics
  .moveTo(startX, startY)
  .lineTo(startX + 22, startY)
  .bezierCurveTo(startX + 28, startY, startX + 34, startY-4,startX + 34, startY-10)
  .lineTo(startX + 34, startY-18)
  .bezierCurveTo(startX + 34, startY-20, startX + 32, startY-30,startX + 22, startY-28)
  .lineTo(startX, startY-28)
  .lineTo(startX, startY-22)
  .lineTo(startX + 22, startY-22)
  .bezierCurveTo(startX + 28, startY-22,startX + 28, startY-18,startX + 28, startY-14)
  .lineTo(startX + 28, startY - 14)
  .bezierCurveTo(startX + 28, startY - 6,startX + 24, startY - 6,startX + 22, startY - 6)
  .lineTo(startX, startY - 6)
  .lineTo(startX, startY)

  startX = startX; startY = startY-25;
  this.obj1.graphics.moveTo(startX, startY)
  .lineTo(startX, startY - 4)
  .bezierCurveTo(startX, startY - 4,startX, startY - 7,startX - 2, startY - 6)
  .lineTo(startX-9, startY-1)
  .bezierCurveTo(startX-10, startY,startX-10, startY,startX-10, startY+2)
  .lineTo(startX-2, startY + 7)
  .bezierCurveTo(startX-2, startY + 7,startX-1, startY + 8,startX, startY + 6)
  .lineTo(startX, startY)
  this.container.addChild(this.obj1);

  this.obj1.scaleX = 1.1;
  this.obj1.scaleY = 1.1;
  this.obj1.x = -2;
  this.obj1.y = 5;

  this.container.cache(-68,-68,68*2,68*2, this.scale);

  this.container.gotoAndStop = (type) => {
    this.container.currentAnimation = type;
    switch(type) {
      case 'up':
        this.base.graphics.clear().beginLinearGradientFill(["#1480a2","#0094db","#1480a2"],[0,0.5,1], 0,0,88,0).drawCircle(44,44,44);
        this.fillCmd.style = "#8dc6d7";
        break;
      case 'click':
        this.base.graphics.clear().beginFill('#2b79af').drawCircle(44,44,44);
        this.fillCmd.style = "#5b9fc2";
        break;
      case 'hover':
        this.base.graphics.clear().beginLinearGradientFill(["#1895bd","#2ab7fa","#1895bd"],[0,0.5,1], 0,0,88,0).drawCircle(44,44,44);
        this.fillCmd.style = "#8dc6d7";
        break;
      case 'disabled':
        this.base.graphics.clear().ss(1).s('#808080').drawCircle(44,44,44);
        this.fillCmd.style = "#657176";
        break;
    }

    if(this.container.cacheCanvas) {
      this.container.updateCache();
    }
  }
}

const repeatButton =  function(scale) {
  this.scale = scale;

  this.container = new createjs.Container();

  this.bg = new createjs.Shape();
  this.bg.graphics.beginFill("#2b2b2b").arc(0,0,68,10,0);
  this.bg.alpha = 0.5;
  this.bg.rotation = -16
  this.container.addChild(this.bg);

  this.bg2 = new createjs.Shape();
  this.bg2.graphics.beginLinearGradientFill(["#404042","#585659","#696a6e"],[0,0.5,1], 0,0,0,100).drawCircle(0,0,53);
  this.container.addChild(this.bg2);

  this.base = new createjs.Shape();
  this.base.set({x: -44, y : -44 });
  this.container.addChild(this.base);

  this.obj = new createjs.Container();
  this.container.addChild(this.obj);

  let posX = -16;
  let posY = 16;
  let startX = 10, startY = 10;

  this.arrow1 = new createjs.Shape();
  this.fillCmd = this.arrow1.graphics.beginFill("#fff").command
  this.arrow1.graphics.moveTo(startX, startY)
  .lineTo(startX, startY - 10).bezierCurveTo(startX, startY - 14, startX + 4, startY - 16, startX + 6, startY - 16)
  .lineTo(startX + 30, startY - 16)
  .lineTo(startX + 30, startY - 10)
  .lineTo(startX + 10, startY - 10)
  .bezierCurveTo(startX + 8, startY - 10, startX + 6, startY - 10, startX + 6, startY - 8)
  .lineTo(startX + 6, startY -6)
  .lineTo(startX, startY)
  .moveTo(startX + 30, startY  - 14)
  startX = startX + 30; startY = startY  - 14;
  this.arrow1.graphics.lineTo(startX, startY - 6)
  .lineTo(startX, startY - 6)
  .bezierCurveTo(startX, startY - 6,startX, startY - 9,startX + 3, startY - 8)
  .lineTo(startX+10, startY-1.5)
  .bezierCurveTo(startX+10, startY-2,startX+12, startY,startX+10, startY+2)
  .lineTo(startX+4, startY + 8)
  .bezierCurveTo(startX, startY + 10, startX, startY + 6,startX, startY + 8)
  .lineTo(startX, startY);

  this.arrow2 = new createjs.Shape();
  this.fillCmd2 = this.arrow2.graphics.beginFill("#fff").command;
  this.arrow2.graphics.moveTo(startX, startY)
  .lineTo(startX, startY - 10).bezierCurveTo(startX, startY - 14, startX + 4, startY - 16, startX + 6, startY - 16)
  .lineTo(startX + 30, startY - 16)
  .lineTo(startX + 30, startY - 10)
  .lineTo(startX + 10, startY - 10)
  .bezierCurveTo(startX + 8, startY - 10, startX + 6, startY - 10, startX + 6, startY - 8)
  .lineTo(startX + 6, startY -6)
  .lineTo(startX, startY)
  .moveTo(startX + 30, startY  - 14)
  startX = startX + 30; startY = startY  - 14;
  this.arrow2.graphics.lineTo(startX, startY - 6)
  .lineTo(startX, startY - 6)
  .bezierCurveTo(startX, startY - 6,startX, startY - 9,startX + 3, startY - 8)
  .lineTo(startX+10, startY-1.5)
  .bezierCurveTo(startX+10, startY-2,startX+12, startY,startX+10, startY+2)
  .lineTo(startX+4, startY + 8)
  .bezierCurveTo(startX, startY + 10, startX, startY + 6,startX, startY + 8)
  .lineTo(startX, startY);
  this.arrow2.rotation = 180;
  this.arrow2.x = 90
  this.arrow2.y = 0;

  this.obj.addChild(this.arrow1, this.arrow2);
  this.obj.set({x:-30, y: -8});

  this.container.cache(-68,-68,68*2,68*2, this.scale);

  this.container.gotoAndStop = (type) => {
    this.container.currentAnimation = type;
    switch(type) {
      case 'up':
        this.base.graphics.clear().beginLinearGradientFill(["#9e6510","#c77f14","#9e6510"],[0,0.5,1], 0,0,88,0).drawCircle(44,44,44);
        this.fillCmd.style = "#edc38c";
        this.fillCmd2.style = "#edc38c";
        break;
      case 'click':
        this.base.graphics.clear().beginFill('#b16b29').drawCircle(44,44,44);
        this.fillCmd.style = "#ce965a";
        this.fillCmd2.style = "#ce965a";
        break;
      case 'hover':
        this.base.graphics.clear().beginLinearGradientFill(["#d18228","#ee9f22","#d18228"],[0,0.5,1], 0,0,88,0).drawCircle(44,44,44);
        this.fillCmd.style = "#edc38c";
        this.fillCmd2.style = "#edc38c";
        break;
      case 'disabled':
        this.base.graphics.clear().ss(1).s('#808080').drawCircle(44,44,44);
        this.fillCmd.style = "#797168";
        this.fillCmd2.style = "#797168";
        break;
    }

    if(this.container.cacheCanvas) {
      this.container.updateCache();
    }
  }
}

export default {
  createSprite,
  randomNum,
  createCardSprite,
  createTileSprite,
  numberCounter,
  playSound,
  numberWithCommas,
  createSpriteRoadMap,
  moneyFormat,
  setCurrentTimezone,
  getSlaveParam,
  confirmButton,
  clearButton,
  undoButton,
  repeatButton,
  fontFormat
}
