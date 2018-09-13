
export default () => {
  return new blu.Component({
    bg: 'rgba(0,0,0,0.6)',

    main() {

      let _this = this;

      this.visible = window.tutorial_enabled;
      this.tut_bg = new createjs.Shape();
      this.tut_bg.graphics.beginFill('rgba(22, 22, 22, 0.9)').drawRect(0,this.context.stage.baseWidth - 531.8,this.context.stage.baseWidth, 155);
      this.tut_bg.visible = this.context.portrait;
      this.addChild(this.tut_bg)

      console.log('this.tut_bg', this.tut_bg);

      if(window.tutorial_enabled) {
        this.initTutorial();
      }

       $('#neverShow').click((e) => {
        _this.visible = false;
        $.post("/settings", {tutorial : false}, (response) => {});
        this.finishTutorial();
        this.context.component_menuSettingsEvents.setSwitchToggle($('#setTut'))
      });

      $('#startGame').click((e) => {
        _this.visible = false;
        this.finishTutorial();
      });
    },//main

    initTutorial() {


    },
    disableTutorial(){

    },
    finishTutorial()
    {
      this.visible = false;
      window.tutorial_enabled = false;
      $('.tutorials-wrap').hide();
    },
    screenOrientaion() {
      this.visible = window.tutorial_enabled;

      if(this.context.portrait) {
        this.tut_bg.visible = true;
      } else {
        this.tut_bg.visible = false;
      }
    },
  })


}
