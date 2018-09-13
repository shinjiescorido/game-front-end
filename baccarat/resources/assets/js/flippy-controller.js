import baccaratTotal from './factories/baccaratTotal';

let flippy = {
  cards : [],
  fpfWrap: $("#flippy-wrap"),
  gameInfo : {},
  baseWidth : 1920,
  baseHeight: 1080,
  ctx : null,
  init(ctx) {

    this.ctx = ctx;
    this.cards = [];
    console.log(FPF)
    this.stage = new FPF.Stage(
      this.fpfWrap,
      this.fpfWrap.width(),
      this.fpfWrap.height()
    );

    $(window).on("resize", () => {
      this.resize();
    });
  },
  newround() {
    this.tempGameInfo = {}
  },
  createCards(cardData, options = {ratio : 0, offset: [], orientation: 'portrait'}, gameinfo) {

    this.show();
    this.reset();
    this.clearStage();
    this.gameInfo = _.cloneDeep(gameinfo);

    var self = this;
    let w = this.getcardBaseRatio().width + (this.getcardBaseRatio().width * options.ratio),
        h = this.getcardBaseRatio().height  + (this.getcardBaseRatio().height * options.ratio);
    for(var x = 0; x < cardData.length; x++) {
      let adjustY = 0;
      let adjustX = options.offset.length && options.offset !== undefined ? options.offset[x] : 0;
      
      if(options.y) {
        adjustY = options.offset.length && options.offset !== undefined ? options.offset[x] : 0;
        adjustX = 0;
      }

      this.cards.push(new FPF.Card(
        this.stage,
        cardData[x].frontImg,
        cardData[x].backImg,
        new FPF.Point(this.fpfWrap.width()/2 + adjustX, this.fpfWrap.height() / 2 + adjustY),
        w, h
      ));

      if(options.orientation === 'portrait') {
        this.cards[this.cards.length-1].changeOrientation(options.orientation);
      }

      this.cards[this.cards.length-1].setUpdateHook(this.test);
      this.cards[this.cards.length-1].attached = cardData[x].attached;
      this.cards[this.cards.length-1].toImg = cardData[x].openImg;
      this.cards[this.cards.length-1].update();
      this.cards[this.cards.length-1].clean();

      this.cards[this.cards.length-1].onFlipEnd = function (e) {
        self.flipend(e)
      }

      if(cardData[x].attached) {
        let card = cardData[x].attached;

        card.shadow = new createjs.Shadow("#fff",0,0,10);
        createjs.Tween.get(card.shadow,{loop:true})
        .to({ blur: 25 },500)
        .to({ blur: 0 },500)
      }
    } // end for

    // adjust flipbg
    if(this.cards.length === 1) {
      if($('.flip-bg')) {
        $('.flip-bg').css({'width' : '65%', 'left' : '17%'});
      }
    }
    
    this.stage.init(this.cards);
  },
  tempGameInfo : {},
  flipend (e) {

    if(_.filter(this.cards, 'isFront').length === this.cards.length) {
      setTimeout(() => {
        this.hide();
      }, 2000);
    }
    if(e.attached && e.isFront) {
      e.attached.gotoAndStop(e.attached.code);
      e.attached.isAnim = true;
      e.attached.is_anim = true;
      e.attached.is_flip = true;
      e.attached.shadow = null;
      try {
        e.setBackImage(e.toImg);
      } catch (err) {

      }
    }

    if(this.cards.length>1) {
      this.cards.forEach((card, index) => {
        if(card.attached && card.isFront) {
          this.tempGameInfo[`${card.attached.card_type}${index+1}`] = card.attached.code.split("C")[1];
        }
      });
    } else {
      let card = this.cards[0];
      
      if(card.attached && card.isFront) {
        this.tempGameInfo[`${card.attached.card_type}${Object.keys(this.tempGameInfo).length + 1}`] = card.attached.code.split("C")[1];
      }
    }
    // set player total

    console.log("tempGameInfo :: =>",this.tempGameInfo);
    this.gameInfoTotal = baccaratTotal(this.tempGameInfo); //this.cards.length > 1 ? this.tempGameInfo :  this.gameInfo);
    let card = _.find(this.cards, (c) => { return c.attached});

    if(!_.isEmpty(card)) {
      if(card.attached.card_type == 'banker') {
        this.ctx.component_card_result_total.setBankerValue(this.gameInfoTotal.banker)
      } else {
        this.ctx.component_card_result_total.setPlayerValue(this.gameInfoTotal.player)
      }
    }

  },
  getTotal () {
    return this.gameInfoTotal;
  },
  forceFlip() {
    for(var x = 0; x < this.cards.length; x++) {
      if(!this.cards[x].isFront) {
        this.cards[x].setFrontImage(this.cards[x].img.front.currentSrc)
        this.cards[x].forceFlip('l');
      }
    }
  },
  getStage() {
    return this.stage
  },
  getCards() {
    return this.cards
  },
  changeOrientation(orientation) {
    for(var x = 0; x < this.cards.length; x++) {
      this.cards[x].changeOrientation(orientation);
    }
  },
  hide () {
    this.fpfWrap.hide();
    this.stage.hide();
    // reset flipbg
    if($('.flip-bg')) {
      $('.flip-bg').css({'width' : '100%', 'left' : '0%'});
    }
  },
  show () {
    this.fpfWrap.show();
    this.stage.show();
  },
  clearStage () {
    this.stage.clear();
  },
  getcardBaseRatio () {
    return {width : 204, height: 274};
  },
  reset () {
    for(var x = 0; x < this.cards.length; x++) {
      this.cards[x].clean();
    }
    this.cards = []
  },
  resize () {
    if(!this.stage.cards) return;
    this.stage.resizeUpdate()
  }
}

export default {
  flippy
}
