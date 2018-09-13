import './boot-mobile';
import pula_puti from './screens/pula-puti/pula-puti-mobile';

let app = new blu.App({
    canvas: "myCanvas",
    tickEnabled:true,
    socket: null,
    spotLight: {
        tx: 0,
        ty: 0,
        tr: 0,
        x: 0,
        y: 0,
        r: 0,
        sx: 1,
        sy: 1,
        c: null,
        ctx: null,
        hasScaling: false
    },

    FPSEnabled: true,
    init() {
        createjs.Ticker.framerate = 30;
    },
    main() {

        createjs.Touch.enable(this.stage);
        this.user_money = window.user_money;
        
        this.register("game", pula_puti);
        this.load("game");
    },
    resize() {
        
      
    }
});

app.run();