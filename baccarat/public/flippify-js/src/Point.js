
;(function(main) {

    "use strict";

    window.FPF = window.FPF || {}; //namespace

    main(window.FPF);

})(function(FPF) {

    "use strict";

    /**
     * @memberof FPF
     * @class Point
     * @classdesc Object point.
     * @param {Number} x the x coordinate.
     * @param {Number} y the y coordinate.
     *
     * @property {Number} x x position.
     * @property {Number} y y position.
     *
     * @example
     * var p = new FPF.Point(window.innerWidth/2, window.innerHeight/2);
     */
    function Point(x, y) {
        this.x = x;
        this.y = y;
    } //END OF POINT CONSTRUCTOR

    Point.prototype = {
        constructor: Point,
        /**
         * Used to reset Point position.
         * @memberof FPF.Point.prototype
         */
        reset: function () {
            this.x = 0;
            this.y = 0;
        }
    }; //END OF POINT PROTOTYPE

    FPF.Point = Point;

});
