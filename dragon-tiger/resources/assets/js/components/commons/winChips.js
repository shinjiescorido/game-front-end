import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, fontFormat } from '../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		main() {
      // $("#test").on("click", () => {
      //   // {"gameName":"Dragon-Tiger","tableId":2,"eventName":"updatecredits","payload":{"credits":{"id":3037,"money":14595951.5,"user_type":"C","total_winning":800000,"total_lost":260000,"bets":[{"bet":"tie","bet_money":50000,"win_money":550000,"user_money":14355951.5},{"bet":"suited_tie","bet_money":10000,"win_money":0,"user_money":14305951.5},{"bet":"tiger","bet_money":500000,"win_money":250000,"user_money":14295951.5}]}}}
      //   let area = _.find(this.context.component_betBoard.bet_areas, function (e) {return e.chips.length});
      //   this.animateWinLose(area, 'win', {text : '1K'});
      //   area.loseChips = [];
      //   this.createWinningChips(area,1000, {}, false);
      // })
    },
    animateWinLose(target, type, options) {
      let posX = (this.context.stage.baseWidth / 2) + 30;
      let posY = (this.context.stage.baseHeight / 2) - 100;
      let waitval = 0;

      let scaleVal = 0.9;

      if(!_.isEmpty(options)) {
        scaleVal = options.toScale;
        //overrides text on chip
        if(options.text) {
          target.chips.forEach((chip) => {
            chip.children[1].text = options.text;
          });
        }
      }

      if(type === 'win') {
        waitval = 450;
        if(!this.context.mobile) {
          posX = this.context.component_gameButtons.x + 20;
          posY = this.context.component_gameButtons.y;
        } else {
          posY = (this.context.stage.baseHeight);
        }
      }

      ((target, posX, posY) => {
        setTimeout(() => {
          if(target.winChips !== undefined && target.winChips.length) waitval = 450;
          
          target.chips.forEach((chip) => {
            createjs.Tween.get(chip, {override: true})
            .wait(waitval)
            .to({
              scaleX: scaleVal,
              scaleY: scaleVal,
              alpha: 0,
              x: posX,
              y: posY
            }, 1200, createjs.Ease.quadOut);
          });

          //if has lose chips
          if(target.winChips !== undefined && target.winChips.length) {
            target.winChips.forEach((chip) => {
              createjs.Tween.get(chip, {override: true})
              .wait(waitval)
              .to({
                scaleX: scaleVal,
                scaleY: scaleVal,
                alpha: 0,
                x: posX,
                y: this.context.component_gameButtons.y
              }, 1200, createjs.Ease.quadOut)
              .call((target, chip) => {
                target.parent.removeChild(chip);
                target.winChips = [];
              },[target, chip])
            });
          } //end lose chips

        },1000)
      })(target, posX, posY);
    },
    createWinningChips(target, amount, options = {}, extraChip = false) {
      let _parent = target.parent;
      let avail_chips = [];
      let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];
      let targetAmt = parseInt(target.total_bet_amt);

      //default options
      let settings = {
        font1 : fontFormat(24, 'normal', 'bebas', false),
        font2 : fontFormat(20, 'normal', 'bebas', false),
        chipScale : target.chip_drop_scale,
        textScale : target.chip_drop_scale,
        maskScale : target.chip_drop_scale,
        radius : 18
      }

      //options
      if(!_.isEmpty(options)) {
        settings = options;
      }

      for (var i = 0; i < chipArr.length; i++) {
        let chipVal = chipArr[i] * parseInt(window.currencyMultiplier);
        avail_chips.push({'chip': chipArr[i], 'value': chipVal});
      }

      targetAmt = amount;

      let count = avail_chips.length-1;
      let chips = [];

      for (var x = avail_chips.length-1; x > -1; x--) {
        if (targetAmt == avail_chips[x].value) {
          chips.push(avail_chips[x]);
          break;
        } else if (targetAmt-avail_chips[x].value >= 0){
          targetAmt -= avail_chips[x].value;
          chips.push(avail_chips[x]);
          x++;
        } // end elseif
      } // end for

      let instance = null;
      let instanceTxt = null;
      let instanceMask = null;
      let chipDataCon = null;

      if (chips.length > 2) {
        playSound("chip3");
      } else if (chips.length == 2) {
        playSound("chip2");
      } else {
        playSound("chip1");
      }

      for (var x = 0; x < chips.length; x++) {
        let chip_name = "chip_"+(chips[x].chip);

        this.context.chipsConf.forEach((c) => {
          if(chips[x].chip == c.chipval) {
            chip_name = "chip_"+c.chipName.split("_")[2]
          }
        })

        instance = createSprite(this.context.getResources(chip_name), 80, 80, instance);
        instance.scaleX = instance.scaleY = settings.chipScale;
        instance.regX = instance.getBounds().width / 2;
        instance.regY = instance.getBounds().height / 2;
        instance.gotoAndStop(1);

        //Chip container init and stacking
        chipDataCon = new createjs.Container();
        chipDataCon.x = (target.x + target.getTransformedBounds().width / 2) - instance.getTransformedBounds().width;
        chipDataCon.y = (target.y + target.getTransformedBounds().height / 2) - (x * (6));
        chipDataCon.hitArea = target;
        chipDataCon.addChild(instance);

        //Bet amount text
        let totalBet = window.casino == 'SS' ? parseFloat(amount).toFixed(2) : amount;
        let instanceAmt = window.casino == 'SS' ? parseFloat(totalBet).toFixed(2) : totalBet;

        if (window.casino == 'SS') {
          totalBet = parseFloat(totalBet);
          instanceAmt = parseFloat(instanceAmt);
        }

        if (totalBet > 999) {
          totalBet = totalBet / 1000;
          instanceAmt = totalBet+"k";
        }

        if (totalBet > 999) {
          instanceAmt = totalBet/1000+'M';
        }

        instanceTxt = new createjs.Text(instanceAmt, settings.font1, '#000');
        instanceTxt.textBaseline = 'middle';
        instanceTxt.textAlign = 'center';
        instanceTxt.x = 0;
        instanceTxt.y = -2;
        chipDataCon.addChild(instanceTxt);

        if (instanceTxt.text.toString().length > 3) {
          instanceTxt.font = settings.font2;
        }

        if (instanceTxt.text.toString().length > 5) {
					instanceTxt.scaleX = 0.8;
				}

        instanceTxt.scaleY = settings.textScale;
        instanceTxt.skewX = 0;
        instanceTxt.skewY = 0;

        if (!parseInt(window.multiplayer)) {
          if(target.table_name.indexOf('tiger') >-1) {
            instanceTxt.skewX = -14;
          }
          if(target.table_name.indexOf('dragon') >-1) {
            instanceTxt.skewX = 14;
          }
        }

        _parent.addChild(chipDataCon);

        chipDataCon.toY = chipDataCon.y;
        chipDataCon.alpha = 0;
        chipDataCon.y = chipDataCon.y - 150;

        createjs.Tween.get(chipDataCon)
        .wait(x*150)
        .to({
          y : chipDataCon.toY,
          alpha : 1
        },150)

        if (extraChip) {
          target.winChips.push(chipDataCon);
        } else {
          target.chips.push(chipDataCon);
        }
      } //end for
    }
	});
	return instance;
}
