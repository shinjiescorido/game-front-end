let instance = null;

export default() => {
  instance = instance || new blu.Component({
    gold_instance : null,
    main() {

      this.x  = this.context.stage.canvas.width/2;
      this.y  = this.context.stage.canvas.height/2 - 160;

      this.gold_instance =  new createjs.Shape();
      this.gold_instance.graphics.beginLinearGradientFill(["rgba(216, 189, 105, 0)","#d8bd69","rgba(216, 189, 105, 0)"], [0, 0.5, 1], 0, 0,this.context.stage.canvas.width, 0)
      .drawRect(0, 0, this.context.stage.canvas.width, 80);
      this.gold_instance.setBounds(0, 0, this.context.stage.canvas.width, 80)
      this.gold_instance.regX = this.gold_instance.getBounds().width / 2;
      this.gold_instance.scaleX = 0;
      this.addChild(this.gold_instance);

      this.message_text = new createjs.Text("","50px lato-black","#2d2d2d");
      this.message_text.textAlign = "center";
      // this.message_text.textBaseline = "middle";
      this.message_text.scaleX = 0;
      this.addChild(this.message_text);

    },
    /**
    ----------------------------------------
    call function to set message on gold bar
    ----------------------------------------
    **/
    setMessage(text,hide) {
      let font = '';

      if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
        font = '40px lato-black';
      } else {
        font = '50px lato-black';
      }

      this.message_text.text = text.toUpperCase();
      this.gold_instance.scaleY = this.message_text.getMetrics().lines.length;
      this.message_text.alpha = 1;
      this.message_text.font = font;
      this.message_text.regY = this.message_text.getMetrics().height / 2;
      this.message_text.y = this.gold_instance.getTransformedBounds().height / 2;



      if(this.message_text.getMetrics().width >= 950) {
        if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
          font = '32px lato-black';
        } else {
          font = '42px lato-black';
        }
        this.message_text.font = font
      }

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


      if(parseInt(hide)) {
       setTimeout(() => {
        createjs.Tween.get(this.gold_instance, {override: true})
        .call(()=>{
          this.message_text.alpha = 0;
          this.message_text.scaleX = 0;
          this.gold_instance.scaleY = 1;
          this.message_text.font = font;
        })
        .to({
          scaleX: 0
        },250,createjs.Ease.linear);
      },2000)
     }
   },

   screenOrientation() {
    let width = 0;
    let height = 0;
    let font = '';

    if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
      this.x  = this.context.stage.baseHeight/2;
      this.y  = this.context.stage.baseWidth/2 - 160;
      width = this.context.stage.baseHeight;
      height = 80;
      font = '50px lato-black';
    } else {
     this.x  = this.context.stage.baseWidth/2;
     this.y  = this.context.stage.baseHeight/2 - 160;
     width = this.context.stage.baseWidth;
     height = 80;
     font = '32px lato-black';
   }

   this.gold_instance.graphics.clear().beginLinearGradientFill(["transparent","#d8bd69","#d8bd69","#d8bd69","transparent"], [0, 0.5, 0.5, 0.5, 1], -30, 30,width- 30, 0).drawRect(0, 0, width, height);
   this.gold_instance.setBounds(0, 0, width, height)
   this.gold_instance.regX = this.gold_instance.getBounds().width / 2;

   this.message_text.font = font;
 }
});

  return instance;
}
