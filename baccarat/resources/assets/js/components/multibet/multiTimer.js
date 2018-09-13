// let instance = null;
// let timer_shape = null;

export default() => {
  let instance = new createjs.Container();
  instance.tween_time = null;

  let timer_shape = new createjs.Shape();
  timer_shape.graphics.beginFill("#f0f0f0").drawRect(0,0,160,10);
  instance.addChild(timer_shape);

  let timer_mask = new createjs.Shape();
  timer_mask.graphics.drawRect(0,0,160,10);
  timer_shape.mask = timer_mask;

  instance.timer = (time, totalTime) => {
    //init color
    timer_shape.graphics.clear().beginFill("#f0f0f0").drawRect(0,0,160,10);
    timer_shape.setBounds(0,0,160,10);

    // To be changed
    let timerStart = (time / totalTime);
    timer_mask.scaleX = timerStart;

    if(timer_shape.is_tween) {
      return;
    }

    var value = 0;
    var value2 = 0;

    if(time <= 5) {
      value = 0.007;
      value2 = 0.005;
    }

    if(time > 5 && time <= 15) {
      value = 0.003;
      value2 = 0.0018;
    }

    if(time > 15 && time <= 25) {
      value = 0.002;
      value2 = 0.001;
    }

    if(time > 25) {
      value = 0.001;
      value2 = 0.0005;
    }

    var theTime = parseInt(time) * 1000;

    var filter = new createjs.ColorFilter(0.2, 0.8, 0.1, 0.8);
    timer_shape.filters = [filter];
    timer_shape.cache(0,0,160,10);

    createjs.Tween.get(timer_mask)
    .to({
      scaleX: 0
    }, theTime).addEventListener("change", () => {
      timer_shape.filters[0].redMultiplier += value;

      if (timer_shape.filters[0].redMultiplier > 0.7) {
        filter.greenMultiplier -= value2;
      }

      timer_shape.updateCache();
    })

    timer_shape.is_tween = true;
  }

  return instance;
}