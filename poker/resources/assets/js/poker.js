/**
 * dragon-tiger.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** initalial application. loads game screen.**/

import './boot';
import dragon_tiger from './screens/poker/poker';

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
        this.user_money = window.user_money;
        this.lala = true;
        
        this.stage.enableMouseOver(10);
        this.register("game", dragon_tiger);
        this.load("game");

        this.resize()

        window.addEventListener("resize",()=> {
            this.resize()
        });

    },
    resize() {
        
        $(".container").css({
            width:this.stage.canvas.width , height: this.stage.canvas.height
        });

        $(".dom-resizable").css({
            transform: "scale(" + (this.stage.canvas.width / this.stage.baseWidth) + ")"
        });

        $(".wrapper").css({
            width:this.stage.canvas.width , height: this.stage.canvas.height
        });

        $(".wrapper--outer").css({
            transform: "scale(" + (this.stage.canvas.width / this.stage.baseWidth) + ") "
        })
    }
});

app.run();