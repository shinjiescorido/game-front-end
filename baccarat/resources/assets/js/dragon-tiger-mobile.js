/**
 * dragon-tiger-mobile.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** initalial application. loads game screen**/

import './boot-mobile';
import dragon_tiger from './screens/baccarat/baccarat-mobile';

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
        if (!window.nonInstall) {
            createjs.Touch.enable(this.stage);
        }
        
        this.user_money = window.user_money;

        this.register("game", dragon_tiger);
        this.load("game");
        $('.card').show();

        window.addEventListener("resize",()=> {
            this.resize()
        });


    },
    resize() {
        // console.log("resizeeee")
        // $(".hack").css('left', (($("#SUPER-CONTAINER").offset().left / $("#SUPER-CONTAINER").parent().width() * 100) ) + '%')

        // let offsetY = $("#SUPER-CONTAINER")[0].getBoundingClientRect().height * .04;

        // $("#flipclick").css('top', (($("#SUPER-CONTAINER").offset().top / $("#SUPER-CONTAINER").parent().height() * 100) + offsetY) + '%')
    }
});

app.run();
