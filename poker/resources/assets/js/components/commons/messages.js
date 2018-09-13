import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, fontFormat } from '../../factories/factories';

let instance = null;

export default () => {
  instance = instance || new blu.Component({
    gold_instance: null,
    main() {
      this.x = this.context.stage.baseWidth / 2;
      this.y = this.context.stage.baseHeight / 2 - 155;

      this.gold_instance = new createjs.Shape();
      this.gold_instance.graphics.beginLinearGradientFill(["transparent", "#d8bd69", "transparent"], [0, 0.5, 1], -65, 65, this.context.stage.baseWidth - 180, 0).drawRect(0, 0, this.context.stage.baseWidth - 180, 50);
      this.gold_instance.setBounds(0, 0, this.context.stage.baseWidth - 180, 50);
      this.gold_instance.regX = this.gold_instance.getBounds().width / 2;
      this.gold_instance.scaleX = 0;
      this.addChild(this.gold_instance);

      this.message_text = new createjs.Text("", fontFormat(36, 'bold', 'lato', true), "#2d2d2d");
      this.message_text.textAlign = "center";
      // this.message_text.textBaseline = "middle";
      this.message_text.scaleX = 0;
      this.addChild(this.message_text);


      // autobet message prompt
      let prompt_w = this.context.stage.baseWidth - 100;
      let prompt_h = 50;
      this.autobet_prompt_bg = new createjs.Shape();
      this.autobet_prompt_bg.graphics.beginLinearGradientFill(["transparent", "#26a69a", "transparent"], [0, 0.5, 1], 0, 0, prompt_w, 0).drawRect(0, 0, prompt_w, prompt_h);
      this.autobet_prompt_bg.name = "autobet_prompt_bg";
      this.autobet_prompt_bg.regX = prompt_w / 2;
      this.autobet_prompt_bg.visible = false;
      this.addChild(this.autobet_prompt_bg);


      this.autobet_prompt_txt = new createjs.Text("", "24px lato-regular", "#fff");
      this.autobet_prompt_txt.textAlign = "center";
      this.autobet_prompt_txt.y = 10;
      this.autobet_prompt_txt.visible = false;
      this.addChild(this.autobet_prompt_txt);

    },
    /**
    ----------------------------------------
    call function to set message on gold bar
    ----------------------------------------
    **/
    setMessage(text, hide) {
      this.message_text.text = text.toUpperCase();
      this.gold_instance.scaleY = this.message_text.getMetrics().lines.length;
      this.message_text.alpha = 1;
      this.message_text.regY = this.message_text.getMetrics().height / 2;
      this.message_text.y = this.gold_instance.getTransformedBounds().height / 2;
      
      if (window.language.locale != 'en') this.message_text.y = (this.gold_instance.getTransformedBounds().height / 2) - 4; 

      createjs.Tween.get(this.gold_instance, {override: true})
        // .wait(1000)
        .to({
          scaleX: 1
        }, 100, createjs.Ease.linear);


      createjs.Tween.get(this.message_text, {override: true})
        // .wait(1000)
        .to({
          scaleX: 1
        }, 100, createjs.Ease.linear);

      if (parseInt(hide)) {
        setTimeout(() => {
          createjs.Tween.get(this.gold_instance, {override: true})
            .call(() => {
              this.message_text.alpha = 0
              this.message_text.scaleX = 0
              this.gold_instance.scaleY = 1

            })
            .to({
              scaleX: 0
            }, 250, createjs.Ease.linear);
        }, 2000)
      }
    },

    showAutoBetMessage(text) {
      let prompt_bg = this.autobet_prompt_bg;
      let prompt_txt = this.autobet_prompt_txt;
      prompt_bg.visible = true;
      prompt_bg.scaleX = 0;
      prompt_txt.visible = true;
      prompt_txt.alpha = 0;
      prompt_txt.text = text;

      createjs.Tween.get(prompt_bg, {
        override: true
      }).to({
        scaleX: 1
      }, 250).wait(3500).to({
        scaleX: 0
      }, 300);
      createjs.Tween.get(prompt_txt, {
        override: true
      }).to({
        alpha: 1
      }, 750).wait(3000).to({
        alpha: 0
      }, 250);

      setTimeout(function() {
        prompt_bg.visible = false;
        prompt_txt.visible = false;
      }, 4500);
    }

  });

  return instance;
}
