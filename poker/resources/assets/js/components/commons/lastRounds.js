import { fontFormat } from '../../factories/factories';
let instance = null;

export default () => {
  instance = instance || new blu.Component({
    main() {
      this.x = this.context.stage.baseWidth - 165;
      this.y = 100;
      this.visible = false;
      this.countdown = false;

      this._lastRoundsBg = new createjs.Shape();
      this._lastRoundsBg.graphics.beginFill("#2b2b2b").drawRoundRect(0, 0, 130, 125, 8);
      this._lastRoundsBg.alpha = 0.8;
      this.addChild(this._lastRoundsBg);

      this._lastRoundText = new createjs.Text("LAST \n ROUNDS", fontFormat(18, 'bold', 'lato', true), "#fff");
      this._lastRoundText.textAlign = "center";
      this._lastRoundText.lineHeight = 85;
      this._lastRoundText.x = 65;
      this._lastRoundText.y = 8;
      this.addChild(this._lastRoundText);

      this._lastRoundCount = new createjs.Text("01", fontFormat(60, 'normal', 'bebas', false), "#FF2E2E");
      this._lastRoundCount.textAlign = "center";
      this._lastRoundCount.x = 65;
      this._lastRoundCount.y = 30;
      this.addChild(this._lastRoundCount);
    },
    /**
    ----------------------------------------
    call function to set last rounds
    ----------------------------------------
    **/
    setRound(count, show) {
      if (parseInt(count) > 0) {
        this.countdown = true;
      }
      else {
        this.countdown = false;
      }

      if (count < 10) {
        count = '0'+count;
      }

      this.visible = show;
      this._lastRoundCount.text = count;
    }

  });

  return instance;
}
