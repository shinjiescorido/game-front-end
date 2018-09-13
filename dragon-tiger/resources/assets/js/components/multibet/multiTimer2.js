// let instance = null;
// let timer_shape = null;

export default() => {
  let instance = new createjs.Container();
  instance.tween_time = null;

  let timer_shape = new createjs.Shape();
  var arcCommand = timer_shape.graphics.ss(5).s("#f0f0f0").arc(0, 0, 28, 0, 0)
  // timer_shape.graphics.ss(5).s("#f0f0f0").drawCircle(0,0,28);
  instance.addChild(timer_shape);

  instance.timer = (time, totalTime) => {
    //init color
    // timer_shape.graphics.clear().ss(5).s("#f0f0f0").arc(0, 0, 28, 0, 0);
    // To be changed
    let timeConsumed = ((totalTime - time) / totalTime) * 360;
    let startAngle = timeConsumed * Math.PI/180;
    
    arcCommand = timer_shape.graphics.clear().ss(5).s("#f0f0f0").arc(0, 0, 28, 0, startAngle).command

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
    timer_shape.cache(-60,-60,180,180);

    createjs.Tween.get(arcCommand)
    .to({
      endAngle: (360*Math.PI/180)
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