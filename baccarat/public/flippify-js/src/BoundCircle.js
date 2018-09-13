
;(function(main) {

    "use strict";

    window.FPF = window.FPF || {}; //namespace

    main(window.FPF);

})(function(FPF) {

    "use strict";

    /**
     * @memberof FPF
     * @class BoundCircle
     * @classdesc Card bounding circle.
     *
     * @param {Number} r bound radius.
     * @param {Number} x x coordinate of the bound.
     * @param {Number} y y coordinate of the bound.
     *
     * @property {Number} r Bound radius.
     * @property {Number} x x position.
     * @property {Number} x y position.
     *
     * @example
     * var radius = 100;
     * var x = 100;
     * var y = 100;
     * var boundCircle = new FPF.BoundCircle(radius, x, y);
     */
    function BoundCircle(r, x, y) {
        this.r = r;
        this.x = x;
        this.y = y;
    } //END OF CORNER BOUND CONSTRUCTOR

    BoundCircle.prototype = {
        constructor: BoundCircle,
        /**
         * Identify if a point is inside the radius.
         * @memberof FPF.BoundCircle.prototype
         * @param  {Point}  point Point to identify.
         * @return {Boolean}       true(if inside the radius) or false(if not).
         *
         * @example
         * boundCircleInstance.isInsideRadius(new FPF.Point(10, 10));
         */
        isInsideRadius: function (point) {

                var dx = this.x - point.x,
                    dy = this.y - point.y;

                return Math.sqrt(dx * dx + dy * dy) < this.r;

            } //END OF IS INSIDE CIRCLE METHOD
    }; //END OF BOUND CIRCLE PROTOTYPE

    FPF.BoundCircle = BoundCircle;

});
