let instance = null;

export default () => {
  instance = instance || new blu.Component({
    main() {
      this.x = 430;
      this.visible = false;
      this.countdown = false;

      this._lastRoundsBg = new createjs.Shape();
      this._lastRoundsBg.graphics.beginFill('#2b2b2b').drawRoundRectComplex(0,0,120,120,0,0,8,8);
      this._lastRoundsBg.alpha = 0.8;
      this.addChild(this._lastRoundsBg);

      this._lastRoundText = new createjs.Text("LAST \n ROUNDS", "bold 20px lato-regular", "#fff");
      this._lastRoundText.textAlign = "center";
      this._lastRoundText.lineHeight = 85;
      this._lastRoundText.x = 60;
      this._lastRoundText.y = 5;
      this.addChild(this._lastRoundText);

      this._lastRoundCount = new createjs.Text("01", "60px bebas-regular", "#FF2E2E");
      this._lastRoundCount.textAlign = "center";
      this._lastRoundCount.x = 60;
      this._lastRoundCount.y = 30;
      this.addChild(this._lastRoundCount);
    },
    /**
    ----------------------------------------
    call function to set last rounds
    ----------------------------------------
    **/
    setRound(count, show) {
      if (parseInt(count) < 0) {
        this.visible = false;
        return;
      }

      if (parseInt(count)) {
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
