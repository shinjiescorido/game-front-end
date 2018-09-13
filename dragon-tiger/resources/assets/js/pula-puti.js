import './boot';
import pula_puti from './screens/pula-puti/pula-puti';

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
        createjs.Ticker.framerate = 60;
    },
    main() {

        this.user_money = window.user_money;
        
        this.stage.enableMouseOver(10);
        this.register("game", pula_puti);
        this.load("game");

        this.resize()

        window.addEventListener("resize",()=> {
            this.resize()
        })

    },
    resize() {
        
        $(".container").css({
            width:this.stage.canvas.width , height: this.stage.canvas.height
        });

        $(".dom-resizable").css({
            transform: "scale(" + (this.stage.canvas.width / this.stage.baseWidth) + ")"
        });
    }
});

app.run();