
;(function(main) {

    "use strict";

    window.FPF = window.FPF || {}; //namespace

    main(window.FPF);

})(function(FPF) {

    "use strict";

    /**
     * @memberof FPF
     * @class Bound
     * @classdesc Card bounding box.
     *
     * @param {Point} min Minimum x, y coordinate.
     * @param {Point} max Maximum x, y coordinate.
     *
     * @property {Point} min Minimum bounding point.
     * @property {Point} max Maximum bounding point.
     *
     * @example
     * var min = new FPF.Point(0, 0);
     * var max = new FPF.Point(20, 20);
     * var bound = new FPF.Bound(min, max);
     */
    function Bound(min, max) {
        this.min = min;
        this.max = max;
    } //END OF BOUND CONSTRUCTOR

    Bound.prototype = {
        constructor: Bound
    }; //END OF BOUND PROTOTYPE

    FPF.Bound = Bound;

});//END OF MAIN
