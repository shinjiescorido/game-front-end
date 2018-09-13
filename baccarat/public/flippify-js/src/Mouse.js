
;(function(main) {

    "use strict";

    window.FPF = window.FPF || {}; //namespace

    main(
        window.FPF,
        window.FPF.Point
    );

})(function(FPF, Point) {

    "use strict";

    /**
     * @memberof FPF
     * @class Mouse
     * @classdesc  Mouse object for tracking mouse.
     *
     * @property {Point} position mouse x & y position.
     * @property {Point} down mouse down x & y position.
     * @property {Point} up mouse up x & y position.
     * @property {Boolean} isDown mouse down flag.
     */
    function Mouse() {
        this.position = new Point(0, 0);
        this.down = new Point(0, 0);
        this.up = new Point(0, 0);
        this.isDown = false;
    } //END OF MOUSE CONSTRUCTOR

    Mouse.prototype = {
        constructor: Mouse
    }; //END OF MOUSE PROTOTYPE

    FPF.Mouse = Mouse;

});
