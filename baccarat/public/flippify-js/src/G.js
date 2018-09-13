
/**
 * @namespace FPF
 * @version 1.0.5 - alpha
 */
;(function(main) {

    "use strict";

    window.FPF = window.FPF || {}; //namespace
    window.FPF.version = "1.0.5";

    main(window.FPF);

})(function(FPF) {

    "use strict";

    /**
     * Flippify Global object, used for setup, etc.
     * @memberof FPF
     * @class G
     */
    FPF.G = {
        /** @lends FPF.G.prototype */

        /**
         * Flippify debug mode flag.
         * @type {Boolean}
         */
        isDebug: false,

        /**
         * Flippify touch debug mode flag.
         * @type {Boolean}
         */
        isDebugTouch: false,

        /**
         * Flippify click toggle orientation flag.
         * @type {Boolean}
         */
        enableClickToggleOrientation: false,

        /**
         * onUpFlag flag.
         * @type {Boolean}
         */
        onUpFlag: false,

        /**
         * Stage base window width.
         * @type {Number}
         */
        baseWindowWidth: 1366,

        /**
         * Stage base window height.
         * @type {Number}
         */
        baseWindowHeight: 667,

        /**
         * Card base width.
         * @type {Number}
         */
        cardBaseWidth: 200,

        /**
         * Cardd base height.
         * @type {Number}
         */
        cardBaseHeight: 270,

        /**
         * Card width percentage.
         * @type {Number}
         */
        cardWidthPercent: 0,

        /**
         * Card height percentage
         * @type {Number}
         */
        cardHeightPercent: 0,

        /**
         * Card orientation value
         * @type {String}
         */
        orientation: "",

        /**
         * Card transition speed. Smaller value makes card slower.
         * @type {Number}
         */
        cardSpeed: 0.98,

        /**
         * Recalculate card dimension width and height percentage.
         */
        reCalculateDimensions: function() {
            this.cardWidthPercent = this.cardBaseWidth / this.baseWindowWidth;
            this.cardHeightPercent = this.cardBaseHeight / this.cardBaseWidth;

        }, //END OF recalculateDimensions

        /**
         * Draw touch points for debugging.
         * @param  {CanvasRenderingContext2D} ctx           canvas 2d context.
         * @param  {Array} points        array of Point object.
         * @param  {Point} touchCenter   touch center point.
         * @param  {Number} touchRotation touch rotation value.
         * @param  {DOMRect} rect          DOM rectangle object.
         */
        drawTouchPoints: function(ctx, points, touchCenter, touchRotation, rect) {

            if(points === null || touchCenter === null) return;

            for(var i = 0, len = points.length; i < len; i++) {

                var p = points[i];
                ctx.beginPath();
                ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
                ctx.arc(p.clientX - rect.left, p.clientY - rect.top, 100, 0, Math.PI * 2);
                ctx.fill();

            }//END OF FOR LOOP

            ctx.beginPath();
            ctx.fillStyle = "rgba(255, 0, 255, 1)";
            ctx.arc(touchCenter.x - rect.left, touchCenter.y - rect.top, 10, 0, Math.PI * 2);
            ctx.fill();

            ctx.font= "30px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(touchRotation, 10, 40);

        },//END OF drawTouchPoints

        /**
         * Used for rotating clip points of the card.
         * @param  {Point} result modified point.
         * @param  {Point} p1     Point 1
         * @param  {Point} p2     Point 2
         * @param  {Number} a      Angle
         *
         * @example
         * var resultPoint = new FPF.Point(0, 0);
         * var p1 = new FPF.Point(100, 100);
         * var p2 = newe FPF.Point(200, 200);
         * var a = 0.1;
         *
         * FPF.G.rotateClipPoint(resultPoint, p1, p2, a);
         */
        rotateClipPoint: function (result, p1, p2, a) {

            p1.x -= p2.x;
            p1.y -= p2.y;

            result.x = (p1.x * Math.cos(a)) - (p1.y * Math.sin(a));
            result.y = Math.sin(a) * p1.x + Math.cos(a) * p1.y;

            result.x += p2.x;
            result.y += p2.y;

        },//END OF rotateClipPoint

        /**
         * Used for getting the distance between to points (x & y).
         * @param  {Point} d  point distance x and y.
         * @param  {Point} p1 Point 1
         * @param  {Point} p2 Point 2
         *
         * @example
         * var resultPoint = new FPF.Point(0, 0);
         * var p1 = new FPF.Point(0, 10);
         * var p2 = newe FPF.Point(0, 20);
         *
         * FPF.G.getDistance2(resultPoint, p1, p2);
         */
        getDistance2: function (d, p1, p2) {

            d.x = p1.x - p2.x;
            d.y = p1.y - p2.y;

        },//END OF getDistance2

        /**
         * Used for getting distance between to points.
         * @param  {Point} p1 Point 1
         * @param  {Point} p2 Point 2
         *
         * @example
         * FPF.G.getDistance(
         *    new FPF.Point(0, 0),
         *    new FPF.Point(0, 100)
         * );
         */
        getDistance: function (p1, p2) {

            var dx = p1.x - p2.x,
                dy = p1.y - p2.y;

            return Math.sqrt(dx * dx + dy * dy);

        }, //END OF GET DISTANCE METHOD

        /**
         * Used for drawing card clip points.
         * @param  {CanvasRenderingContext2D}  ctx        canvas 2d context.
         * @param  {Array}  clipPoints array of points.
         * @param  {Boolean} isDebug    debug flag.
         *
         * @example
         * var ctx = document.getElementById("canvasID").getContext("2d");
         * var clipPoints = {
         *   p0: new FPF.Point(0, 0),
         *   p1: new FPF.Point(0, 0),
         *   p2: new FPF.Point(0, 0),
         *   p3: new FPF.Point(0,0)
         * };
         *
         * FPF.G.drawClipPoints(ctx, clipPoints, false);
         */
        drawClipPoints: function (ctx, clipPoints, isDebug) {

            ctx.beginPath();

            ctx.moveTo(clipPoints.p0.x, clipPoints.p0.y);
            ctx.lineTo(clipPoints.p1.x, clipPoints.p1.y);
            ctx.lineTo(clipPoints.p2.x, clipPoints.p2.y);
            ctx.lineTo(clipPoints.p3.x, clipPoints.p3.y);
            ctx.closePath();

            if (isDebug) {
                ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
                ctx.fill();
            } else {
                ctx.clip();
            }

        },//END OF drawClipPoints

        /**
         * Used for drawing text in the canvas.
         * @param  {CanvasRenderingContext2D} ctx   canvas 2d context.
         * @param  {String} color text color.
         * @param  {String} txt   text you want to show
         * @param  {Number} x     x position.
         * @param  {Number} y     y position.
         *
         * @example
         * var ctx = document.getElementById("sampleCanvasID").getContext("2d");
         * var color = "red";
         * var txt = "The quick brown fox jumps over the lazy dog.";
         * var x = 100;
         * var y = 200;
         *
         * G.FPF.drawText(ctx, color, txt, x, y);
         */
        drawText: function(ctx, color, txt, x, y) {

            ctx.fillStyle = color;
            ctx.fillText(txt, x, y);

        },//END OF drawText

        /**
         * Used for drawing line in the canvas.
         * @param  {CanvasRenderingContext2D} ctx   canvas 2d context.
         * @param  {String} color line color
         * @param  {Point} p1    Point 1
         * @param  {Point} p2    Point 2
         *
         * @example
         * var ctx = document.getElementById("sampleCanvasID").getContext("2d");
         * var color = "rgba(255, 0, 0, 0.5)";
         * var p1 = new FPF.Point(0, 0);
         * var p2 = new FPF.Point(10, 10);
         *
         * FPF.G.drawLine(ctx, color, p1, p2);
         */
        drawLine: function (ctx, color, p1, p2) {

            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

        }, //END OF DRAW METHOD

        /**
         * Used for drawing circle in the canvas.
         * @param  {CanvasRenderingContext2D} ctx   canvas 2d context.
         * @param  {String} color circle stroke color
         * @param  {Number} r     circle radius
         * @param  {Point} p     circle position.
         *
         * @example
         * var canvasContext = document.getElementById("sampleCanvasID").getContext("2d");
         * FPF.G.drawCircle(
         *     canvasContext,
         *     "black",
         *     100,
         *     new FPF.Point(window.innerWidth / 2, window.innerHeight / 2)
         * );
         */
        drawCircle: function (ctx, color, r, p) {

            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
            ctx.stroke();

        } //END OOF DRAWCIRCLE METHOD
    };

});
