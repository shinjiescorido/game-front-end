/**
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** initalial application. loads game screen**/

import './boot-mobile';
import lobby from './screens/lobby-screen-mobile';

let app = new blu.App({
    canvas: "lobby",
    // tickEnabled:true,
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

        createjs.Touch.enable(this.stage ,false, true);
        this.stage.preventSelection = false;
        this.register("game", lobby);
        this.load("game");

        stage2 = this.stage;
        
        $('.card').show();
    },
    resize() {
    }
});

app.run();
