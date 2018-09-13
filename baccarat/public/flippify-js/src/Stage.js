
;(function(main) {

    "use strict";

    window.FPF = window.FPF || {}; //namespace

    main(
        window.FPF,
        window.FPF.Mouse,
        window.FPF.G
    );

})(function(FPF, Mouse, G) {

    "use strict";

        /**
         * @memberof FPF
         * @class Stage
         * @classdesc Holder of all cards that is being updated and rendered
         * @param {Object} c canvas object JQuery.
         * @param {Number} w stage Width
         * @param {Number} h stage.height
         *
         * @property {Object} el canvas element.
         * @property {CanvasRenderingContext2D} ctx canvas 2d context.
         * @property {Object} c canvas object JQuery.
         * @property {Number} w Stage width.
         * @property {Number} h Stage height.
         * @property {Array} cards array of cards.
         * @property {Mouse} mouse stage mouse.
         * @property {DOMRect} boundingRect canvas bounding rect.
         * @property {Object} tempEl canvas DOM object.
         * @property {CanvasRenderingContext2D} tempElCtx temporary canvas 2d context.
         * @property {Array} pointers array of pointers(touches).
         * @property {Array} pointersDown array of pointer down(touches).
         * @property {Object} touchCenter touch center point.
         * @property {Number} touchRotation touch rotation value.
         * @property {Boolean} tapTest tap test flag.
         *
         * @example
         * var cards = [];
         * var stage = new FPF.Stage(
         *     $("#sampleCanvasID"),
         *     window.innerWidth,
         *     window.innerHeight
         * );
         *
         * cards.push(new FPF.Card(
         *     stage,
         *     "card-front.png",
         *     "card-back.png",
         *     new FPF.Point(window.innerWidth/2, window.innerHeight/2),
         *     204,
         *     274
         * ));
         *
         * stage.init(cards);
         */
        function Stage(c, w, h) {

            this.el = document.createElement("canvas");
            this.ctx = this.el.getContext("2d");
            this.c = c;
            this.w = w;
            this.h = h;
            this.cards = null;
            this.mouse = new Mouse();
            this.boundingRect = null;

            this.el.width = w;
            this.el.height = h;
            this.animId = null;

            this.tempEl = document.createElement("canvas");
            this.tempCtx = this.tempEl.getContext("2d");
            this.tempEl.width = w;
            this.tempEl.height = h * 2;
            this.pointers = [];
            this.pointersDown = [];
            this.touchCenter = null;
            this.touchRotation = 0;
            this.tapTest = false;

        } //END OF STAGE CONSTRUCTOR

        Stage.prototype = {
            constructor: Stage,

            /**
             * Empty function to fill for update method hooks.
             * @memberof FPF.Stage.prototype
             * @type {Function}
             * @default null
             */
            update: null,

            /**
             * Empty function to fill for onPanStart handler
             * @memberof FPF.Stage.prototype
             * @type {Function}
             * @default null
             */
            onPanStart: null,

            /**
             * Empty function to fill for onPanEnd handler
             * @memberof FPF.Stage.prototype
             * @type {Function}
             * @default null
             */
            onPanEnd: null,

            /**
             * Empty function to fill for onPanMove handler
             * @memberof FPF.Stage.prototype
             * @type {Function}
             * @default null
             */
            onPanMove: null,

            /**
             * Used for clearing the Stage canvas
             * @memberof FPF.Stage.prototype
             */
            clear: function () {
                this.tempCtx.clearRect(0, 0, this.w, this.h * 2);
                this.ctx.clearRect(0, 0, this.w, this.h);
            }, //END OF CLEAR METHOD

            /**
             * Stops stage animation.
             * @memberof FPF.Stage.prototype
             */
            stopAnimation: function () {
                if (this.animId !== null) {
                    cancelAnimationFrame(this.animId);
                }
            },

            /**
             * Starts stage animation.
             * @memberof FPF.Stage.prototype
             */
            startAnimation: function () {

                var self = this;

                self.stopAnimation();

                self.animId = requestAnimationFrame(function loop() {
                    self.animId = requestAnimationFrame(loop);
                    self.clear();

                    if (self.update && typeof (self.update) === "function") {
                        self.update();
                    }

                    for (var i = 0, len = self.cards.length; i < len; i++) {
                        self.cards[i].update();
                        self.cards[i].render(self.tempCtx);
                    } //END OF FOR LOOP
                });
            },

            /**
             * Show stage and start animation.
             * @memberof FPF.Stage.prototype
             */
            show: function () {
                this.el.style.visibility = "visible";
                this.startAnimation();
            },

            /**
             * Hide stage and stop animation.
             * @memberof FPF.Stage.prototype
             */
            hide: function () {
                this.el.style.visibility = "hidden";
                this.stopAnimation();
            },

            /**
             * Card click handler
             * @memberof FPF.Stage.prototype
             * @param  {Stage} self current stage instance.
             */
            cardCanvasClickHandler: function(self) {

                if(!G.enableClickToggleOrientation) return;

                if(self.tapTest) {
                    self.tapTest = false;
                    return;
                }

                for(var i = 0, len = self.cards.length; i < len; i++) {
                    self.cards[i].toggleOrientation();
                }
            },

            /**
             * Update resizing, call this inside window on resize to auto resize stage cards.
             * @memberof FPF.Stage.prototype
             */
            resizeUpdate: function() {

                var self = this;

                self.boundingRect = self.el.getBoundingClientRect();
                self.boundingRect = self.el.getBoundingClientRect();

                for(var i = 0, len = self.cards.length; i< len; i++) {
                    self.cards[i].reculateResizing();
                }//END OF FOR LOOP

            },

            /**
             * Stage initialization.
             * @memberof FPF.Stage.prototype
             * @param  {Array} cards  array of cards to be drawn on the stage.
             * @param  {Function} update update hook function.
             */
            init: function (cards, update) {

                this.cards = cards;

                if (typeof (update) === "function") {
                    this.update = update;
                }

                this.c.append(this.el);

                var self = this;
                self.boundingRect = self.el.getBoundingClientRect();

                var hm = new Hammer.Manager(self.el);

                hm.add(new Hammer.Pan({
                    threshold: 1,
                    pointers: 0
                }));

                self.tapTest = false;

                self.el.addEventListener("click", function(e) {
                    self.cardCanvasClickHandler(self);
                });

                hm.on("panmove panstart panend", function (e) {

                    self.boundingRect = self.el.getBoundingClientRect();
                    self.pointers = e.pointers;
                    self.touchCenter = e.center;
                    self.touchRotation = e.rotation;

                    switch (e.type) {
                    case "panstart":
                        self.pointersDown = e.pointers;
                        self.mouse.position.x = self.mouse.down.x = e.center.x - self.boundingRect.left;
                        self.mouse.position.y = self.mouse.down.y = e.center.y - self.boundingRect.top;
                        self.mouse.isDown = true;
                        if (self.onPanStart && typeof (self.onPanStart) === "function") {
                            self.onPanStart(self, e);
                        }
                        break;
                    case "panend":
                        self.pointersDown = e.pointers;
                        self.mouse.position.x = self.mouse.up.x = e.center.x - self.boundingRect.left;
                        self.mouse.position.y = self.mouse.up.y = e.center.y - self.boundingRect.top;
                        self.mouse.isDown = false;
                        if (self.onPanEnd && typeof (self.onPanEnd) === "function") {
                            self.onPanEnd(self, e);
                        }
                        if(!isMobile.tablet && !isMobile.phone) {
                            self.tapTest = true;
                        }
                        break;
                    case "panmove":
                        self.mouse.position.x = e.center.x - self.boundingRect.left;
                        self.mouse.position.y = e.center.y - self.boundingRect.top;

                        if (self.onPanMove && typeof (self.onPanMove) === "function") {
                            self.onPanMove(self, e);
                        }

                        break;
                    } //END OF SWITCH STATEMENT

                });

                self.startAnimation();

            } //END OF INIT METHOD

        }; //END OF STAGE PROTOTYPE

        FPF.Stage = Stage;

});
