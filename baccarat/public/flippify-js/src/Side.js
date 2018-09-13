
;(function(main) {

    "use strict";

    window.FPF = window.FPF || {}; //namespace

    main(window.FPF);

})(function(FPF) {

    "use strict";

    /**
     * @memberof FPF
     * @class Side
     * @classdesc Used for holding card detected side.
     * @param {Number} x     x coordinate of the side
     * @param {Number} y     y coordinate of the side
     * @param {String} label the label of the card which is - l - left, r - right, b - bottom, t - top, tl - top left, tr - top right, br - bottom right, bl - bottom left.
     *
     * @property {Number} x x position.
     * @property {Number} y y position.
     * @property {String} label l - left, r - right, b - bottom, t - top, tl - top left, tr - top right, br - bottom right, bl - bottom left.
     *
     * @example
     * var side = new FPF.Side(10, 10, "l"); //l - left
     */
    function Side(x, y, label) {
        this.x = x;
        this.y = y;
        this.label = label;
    } //END OF CONSTRUCTOR SIDE


    FPF.Side = Side;

});
