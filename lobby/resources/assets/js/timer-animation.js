// let instance = null;

// let timer_circle = null;

export default() => {
    let instance = new createjs.Container();
    instance.tween_time = null;
    instance.timer_circle = null;
    instance.timer = (time, totalTime) => {
        if(instance.timer_circle) {
            instance.removeChild(instance.timer_circle)
        }

        instance.timer_circle = new createjs.Shape().set({x: 80, y: 80});
        // timer_circle.graphics.ss(10).beginLinearGradientStroke(["#f9eb21","#cd232a"], [0, 1],0 , -45, 0, 30);
        var strokeCommand = instance.timer_circle.graphics.ss(8).s("rgb(97,168,85)").command;

        instance.timer_circle.filters = [
            new createjs.ColorFilter(0, 1, 0, 1, 0, 0, 255, 0)
        ];

        let timeConsumed = ((totalTime - time) / totalTime) * 360;
        let startAngle = timeConsumed * Math.PI/180;

        instance.timer_circle.rotation = -90
        instance.timer_circle.x = 85;
        instance.timer_circle.y = 85;
        instance.addChild(instance.timer_circle);
        var arcCommand = instance.timer_circle.graphics.arc(0, 0, 55, 0, startAngle).command;

        instance.tween_time = createjs.Tween.get(arcCommand)
        .to({
            endAngle: (360*Math.PI/180)
        }, (time)*1000); 
        
        //default
        var def_red, def_green, def_blue;
        var red = def_red = 97;
        var green = def_green = 168;
        var blue = def_blue = 85;
        var red_clear, blue_clear, green_clear = false; 
        var counter = 0;

        function color_anim(to_red, to_green, to_blue, interval) {
            counter ++;
            var fnColor = setInterval(function() {
                if (red == to_red) { //red value
                    red_clear = true;
                } else {
                    def_red<to_red ? red++ : red--;
                }

                if (green == to_green) {
                    green_clear =true;
                } else {
                    def_green<to_green ? green++ : green--;
                } 

                if (blue == to_blue) {
                    blue_clear =true;
                } else {
                    def_blue < to_blue ? blue++ : blue--;
                }

                createjs.Tween.get(strokeCommand)
                    .to({
                        style: "rgb("+red+","+green+","+blue+")"
                    }, interval,createjs.Ease.linear)

                if (blue_clear && green_clear && red_clear) {
                    blue_clear = false;
                    green_clear = false;
                    red_clear = false;
                    def_red = to_red;
                    def_green = to_green;
                    def_blue = to_blue;

                    if (counter == 1) {
                        color_anim(231, 171, 75, interval);
                    } else if(counter == 2) {
                        color_anim(212, 108, 48, interval);
                    } else if(counter == 3) {
                        color_anim(140, 23, 26, interval);
                    }

                    clearInterval(fnColor);
                }
            },interval);
        }
        
        color_anim(175, 186, 75, (time/0.33));
    }

    return instance;
}
