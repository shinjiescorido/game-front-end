
;(function(main) {

    "use strict";

    window.FPF = window.FPF || {}; //namespace

    main(
        window.FPF,
        window.FPF.G,
        window.FPF.Point,
        window.FPF.Bound,
        window.FPF.BoundCircle,
        window.FPF.Side
    );

})(function(FPF, G, Point, Bound, BoundCircle, Side) {

    "use strict";

    /**
     * @memberof FPF
     * @class Card
     * @classdesc Interactable object, trying to simulate and actual card object.
     *
     * @param {Stage}  context     Card context.
     * @param {string} frontImgURL Card front image URL.
     * @param {string} backImgURL  Card back image URL.
     * @param {Point}  position    x, y position of the Card object.
     * @param {Number} w           Card width.
     * @param {Number} h           Card height.
     *
     * @property {Object} positionPercent Card position in percent based on the Stage canvas width and height( {x: x-position in percent, y: y-position in percent} ).
     * @property {String} label Card side label (l - left, r - right, b - bottom, t - top).
     * @property {Boolean} isFront Card front flag.
     * @property {Stage} context Card context.
     * @property {Object} img Card images({ front: image DOMElement, back: image DOMElement }).
     * @property {Point} initialPos Card initial position.
     * @property {Point} position Card position.
     * @property {Point} oldPosition Card old position.
     * @property {Number} w Card width.
     * @property {Number} h Card height.
     * @property {Number} baseWidth Card base width.
     * @property {Number} baseHeight Card base height.
     * @property {Bound} bound Card bounding box.
     * @property {Object} corners Card corners({ tl: top left bounding circle, bl: bottom left bounding circle, tr: top right bounding circle, br: bottom right bounding circle }).
     * @property {Object} clipPoints Card clip points({p0: point 0, p1: point 1, p2: point 2, p3: point 3}).
     * @property {Object} shadow Card shadow object({canvas: shadow canvas, ctx: shadow context 2d, w: shaodow canvas width, h: shadow canvas height}).
     * @property {Point} center Card center point.
     * @property {Point} originPoint Card touch origin point.
     * @property {Point} referencePoint Card touch reference point.
     * @property {Point} targetPoint Card flip target point.
     * @property {Point} centerPoint Card touch center point(from origin point to reference point).
     * @property {Point} centerPointBottom Card touch center point in bottom(from origin point to reference point).
     * @property {Side} detectedSide Card touch detected side.
     * @property {Point} autoFlipTarget Card auto flip target point.
     * @property {Point} tempDetectedSideLR Card Temporary detected side LEFT RIGHT.
     * @property {Point} tempDetectedSideTB Card Temporary detected side TOP BOTTOM.
     * @property {Boolean} isMouseDown Card flag mouse down.
     * @property {Boolean} isDirty Card flag dirty.
     * @property {BoundCircle} constraint1 Card touch circle constraint 1.
     * @property {BoundCircle} constraint2 Card touch circle constraint 2.
     * @property {Point} tempPoint Card temporary point for computations.
     * @property {Number} cardAngle Card angle.
     * @property {Number} maskAngle Card mask angle.
     * @property {Boolean} isOpen Card flag open.
     * @property {Boolean} isInteractable Card flag interactable.
     * @property {Boolean} isForceFlip Card flag force flipping.
     * @property {Boolean} isPositionMoving Card flag moving.
     * @property {Object} eventDetail Card event detail({pointer: x, y, flags: pointer down}).
     * @property {Number} cardSpeed Card speed.
     * @property {Number} cardForceFlipSpeed Card speed when forced flip.
     * @property {Boolean} tempFlag Card Temporary flag.
     * @property {Number} tempX Card temporary x position.
     * @property {Number} tempY Card temporary y position.
     * @property {Number} tempTargetX Card temporary target x position.
     * @property {Number} tempTargetY Card temporary target y position.
     * @property {Boolean} isPortrait Card flag portrait.
     * @property {Number} rotation Card rotation value.
     * @property {Number} targetRotation Card target rotation value.
     * @property {Number} pointerCount Card pointer count.
     * @property {Number} startTime Card touch start time.
     * @property {Number} endTime Card touch end time.
     * @property {Number} timeDiff Card touch time difference.
     * @property {Boolean} touch1Enabled Card touch1Enabled flag.
     * @property {Boolean} touch2Enabled Card touch2Enabeld flag.
     * @property {Boolean} isMaxTouchCount Card max touch count flag.
     * @property {Boolean} isHalfShow Card half show flag.
     *
     * @example
     * var stage = new FPF.Stage($("#sampleStageID"), window.innerWidth, window.innerHeight);
     * var card = new FPF.Card(
     *     stage,
     *     "front-card.png",
     *     "back-card.png",
     *     new FPF.Point(window.innerWidth / 2, window.innerHeight / 2),
     *     204,
     *     274
     * );
     * var cards = [];
     *
     * cards.push(card);
     * stage.init(cards);
     */
    function Card(context, frontImgURL, backImgURL, position, w, h) {

        G.cardBaseWidth = w;
        G.cardBaseHeight = h;
        G.reCalculateDimensions();

        var CW = context.c.width(),
            CH = context.c.height();

        this.positionPercent = {
                x: position.x / CW,
                y: position.y / CH
            };

        var self = this;
        var p = new Point(
                self.positionPercent.x * CW,
                self.positionPercent.y * CH
            );

        position = p;

        w = CW * G.cardWidthPercent;
        h = w * G.cardHeightPercent;

        this.label = null;
        this.isFront = false;
        this.context = context;
        this.img = {
            front: document.createElement("img"),
            back: document.createElement("img")
        };

        this.img.front.src = frontImgURL;
        this.img.back.src = backImgURL;

        this.initialPos = new Point(position.x, position.y);
        this.position = position;
        this.position.x -= w / 2;
        this.position.y -= h / 2;

        this.oldPosition = new Point(position.x, position.y);
        this.w = w;
        this.h = h;
        this.baseWidth = this.w;
        this.baseHeight = this.h;

        this.bound = new Bound(
            new Point(position.x, position.y),
            new Point(position.x + w, position.y + h)
        );
        this.corners = {
            tl: new BoundCircle(30, position.x, position.y),
            bl: new BoundCircle(30, position.x, position.y + h),
            tr: new BoundCircle(30, position.x + w, position.y),
            br: new BoundCircle(30, position.x + w, position.y + h)
        };
        this.clipPoints = {
            p0: new Point(0, 0),
            p1: new Point(0, 0),
            p2: new Point(0, 0),
            p3: new Point(0, 0)
        };

        var shadowCanvas = document.createElement("canvas"),
            shadowCtx = shadowCanvas.getContext("2d");

        shadowCanvas.width = w;
        shadowCanvas.height = h;

        this.shadow = {
            canvas: shadowCanvas,
            ctx: shadowCtx,
            w: shadowCanvas.width,
            h: shadowCanvas.height
        };

        this.center = new Point(position.x + w / 2, position.y + h / 2);
        this.originPoint = new Point(0, 0);
        this.referencePoint = new Point(0, 0);
        this.targetPoint = new Point(0, 0);
        this.centerPoint = new Point(0, 0);
        this.centerPointBottom = new Point(0, 0);

        this.detectedSide = new Side(0, 0, null);
        this.autoFlipTarget = new Point(0, 0);
        this.tempDetectedSideLR = new Point(0, 0);
        this.tempDetectedSideTB = new Point(0, 0);
        this.isMouseDown = false;
        this.isDirty = false;
        this.constraint1 = new BoundCircle(0, 0, 0);
        this.constraint2 = new BoundCircle(0, 0, 0);
        this.tempPoint = new Point(0, 0);
        this.cardAngle = 0;
        this.maskAngle = 0;
        this.isOpen = false;
        this.isInteractable = true;
        this.isForceFlip = false;
        this.isPositionMoving = false;
        this.eventDetail = {
            pointer: {
                x: null,
                y: null
            },
            flags: {
                isPointerDown: false
            }
        };
        this.cardSpeed = G.cardSpeed; //NORMAL SPEED
        this.cardForceFlipSpeed = 0.5;
        this.tempFlag = false;

        this.tempX = 0;
        this.tempY = 0;
        this.tempTargetX = 0;
        this.tempTargetY = 0;
        this.isPortrait = false;

        this.rotation = Math.PI / 2;
        this.targetRotation = Math.PI / 2;

        this.pointerCount = 0;
        this.startTime = 0;
        this.endTime = 0;
        this.timeDiff = 0;
        this.touch1Enabled = false;
        this.touch2Enabled = false;
        this.isMaxTouchCount = false;
        this.isHalfShow = false;

        this.reculateResizing();

    } //END OF CARD CONSTRUCTOR

    Card.prototype = {
        constructor: Card,

        /**
         * Empty function to fill for each card instance if listening for on pointer down.
         * @memberof FPF.Card.prototype
         * @type {Function}
         * @default null
         */
        onPointerDown: null,

        /**
         * Empty function to fill for each card instance if listening for on pointer up.
         * @memberof FPF.Card.prototype
         * @type {Function}
         * @default null
         */
        onPointerUp: null,

        /**
         * Empty function to fill for each card instance if listening for on pointer move.
         * @memberof FPF.Card.prototype
         * @type {Function}
         * @default null
         */
        onPointerMove: null,

        /**
         * Empty function to fill for each card instance if listening for on card flip end.
         * @memberof FPF.Card.prototype
         * @type {Function}
         * @default null
         */
        onFlipEnd: null,

        /**
         * Empty function to fill for each card instance if listening for on card half shown.
         * @memberof FPF.Card.prototype
         * @type {Function}
         * @default null
         */
        onHalfShown: null,

        /**
         * Recalculate Card on resizing.
         * @memberof FPF.Card.prototype
         */
        reculateResizing: function() {

            var iw = this.context.c.width(),
                ih = this.context.c.height();

            this.context.el.width = iw;
            this.context.el.height = ih;
            this.context.tempEl.width = iw;
            this.context.tempEl.height = ih;
            this.context.w = iw;
            this.context.h = ih;

            var w = null, h = null;

            w = iw * G.cardWidthPercent;
            if(isMobile.phone || isMobile.tablet) {

                if(isMobile.apple.device) {
                    if(device.landscape()) {
                        G.orientation = "landscape";
                        w = iw * G.cardWidthPercent;
                    }

                    if(device.portrait()) {
                        G.orientation = "portrait";
                        w = ih * G.cardWidthPercent;
                    }
                }
                else {
                    switch(window.orientation) {
                        case -90:
                        case 90:
                            //LANDSCAPE
                            G.orientation = "landscape";
                            w = iw * G.cardWidthPercent;
                            break;
                        default:
                            //PORTRAIT
                            G.orientation = "portrait";
                            w = ih * G.cardWidthPercent;
                    }
                }

            }

            h = w * G.cardHeightPercent;

            var self = this;
            var position = new Point(
                    self.positionPercent.x * iw,
                    self.positionPercent.y * ih
                );
            var t = w;
            var uw = w;
            var uh = h;

            this.baseWidth = w;
            this.baseHeight = h;

            if(!this.isPortrait) {
                w = h;
                h = t;
            }

            this.w = w;
            this.h = h;


            this.initialPos = new Point(position.x, position.y);
            this.position = position;
            this.position.x -= this.w / 2;
            this.position.y -= this.h / 2;

            this.bound = new Bound(
                new Point(position.x, position.y),
                new Point(position.x + w, position.y + h)
            );
            this.corners = {
                tl: new BoundCircle(30, position.x, position.y),
                bl: new BoundCircle(30, position.x, position.y + h),
                tr: new BoundCircle(30, position.x + w, position.y),
                br: new BoundCircle(30, position.x + w, position.y + h)
            };

            this.center = new Point(this.position.x + w / 2, this.position.y + h / 2);
            this.oldPosition = new Point(position.x, position.y);

            this.shadow.canvas.width = w;
            this.shadow.canvas.height = h;
            this.shadow.w = w;
            this.shadow.h = h;

        },

        /**
         * Clean the Card. Reset Card states.
         * @memberof FPF.Card.prototype
         */
        clean: function () {
            if(this.isFront) {
                var t = this.img.front;
                this.img.front = this.img.back;
                this.img.back = t;
                this.isFront = false;
                this.isInteractable = true;
            }
        },

        /**
         * Set Card update hook.
         * @memberof FPF.Card.prototype
         * @param {Function} fn function for update hook.
         */
        setUpdateHook: function (fn) {
            if (typeof (fn) === "function") {
                this.updateHook = fn;
            }
        },

        /**
         * Card empty function for update hook.
         * @memberof FPF.Card.prototype
         * @type {Function}
         * @default null
         */
        updateHook: null,

        /**
         * Card front image setters.
         * @memberof FPF.Card.prototype
         * @param {String} src card front image source.
         */
        setFrontImage: function (src) {
            this.img.front.src = src;
        },

        /**
         * Card back image setters.
         * @memberof FPF.Card.prototype
         * @param {String} src card back image source
         */
        setBackImage: function (src) {
            this.img.back.src = src;
        },

        /**
         * Check point is inside Card bounds.
         * @memberof FPF.Card.prototype
         * @param  {Point}  point point to check.
         * @return {Boolean}       true(if inside bound) else false.
         */
        isInsideBound: function (point) {
            return point.x >= this.bound.min.x && point.x <= this.bound.max.x &&
                point.y >= this.bound.min.y && point.y <= this.bound.max.y;
        },

        /**
         * Assign Card side touch. Used in detect card side.
         * @memberof FPF.Card.prototype
         * @param  {Point} pointToModify point to modify.
         * @param  {String} orientation   card orientation(v - vertical, h - horizontal).
         * @param  {Point} point         based touch point.
         */
        assignSide: function (pointToModify, orientation, point) {

            switch (orientation) {
            case "h":
                var dx = point.x - this.center.x;
                if (dx < 0) {
                    pointToModify.x = this.position.x;
                    pointToModify.y = point.y;
                } else {
                    pointToModify.x = this.position.x + this.w;
                    pointToModify.y = point.y;
                }
                break;
            case "v":
                var dy = point.y - this.center.y;
                if (dy < 0) {
                    pointToModify.x = point.x;
                    pointToModify.y = this.position.y;
                } else {
                    pointToModify.x = point.x;
                    pointToModify.y = this.position.y + this.h;
                }
                break;
            } //END OF SWITCH STATEMENT

        },

        /**
         * Used for detecting Card touch side. This function used assignSide function.
         * @memberof FPF.Card.prototype
         */
        detectSide: function () {

            var corner = null;

            for (var prop in this.corners) {
                if (this.corners[prop].isInsideRadius(this.context.mouse.down)) {
                    corner = this.corners[prop];
                    this.detectedSide.x = corner.x;
                    this.detectedSide.y = corner.y;
                    this.detectedSide.label = prop;
                    break;
                } //END OF IF STATEMENT
            } //END OF FOR LOOP

            if (corner === null) {
                this.assignSide(this.tempDetectedSideLR, "h", this.context.mouse.down);
                this.assignSide(this.tempDetectedSideTB, "v", this.context.mouse.down);

                var LRDist = G.getDistance(this.context.mouse.down, this.tempDetectedSideLR);
                var TBDist = G.getDistance(this.context.mouse.down, this.tempDetectedSideTB);

                if (LRDist < TBDist) {
                    this.detectedSide.x = this.tempDetectedSideLR.x;
                    this.detectedSide.y = this.tempDetectedSideLR.y;
                    this.detectedSide.label = (this.tempDetectedSideLR.x - this.center.x < 0) ? "l" : "r";
                } else {
                    this.detectedSide.x = this.tempDetectedSideTB.x;
                    this.detectedSide.y = this.tempDetectedSideTB.y;
                    this.detectedSide.label = (this.tempDetectedSideTB.y - this.center.y < 0) ? "t" : "b";
                } //END OF IF ELSE STATEMENT
            } //END OF IF ELSE STATMENT

            this.referencePoint.x = this.originPoint.x = this.detectedSide.x;
            this.referencePoint.y = this.originPoint.y = this.detectedSide.y;
        },

        /**
         * Used for calculating Card touch constraints.
         * @memberof FPF.Card.prototype
         *
         */
        calculateConstraints: function () {
            switch (this.detectedSide.label) {
            case "r":
                this.constraint1.x = this.corners.bl.x;
                this.constraint1.y = this.corners.bl.y;
                this.constraint1.r = G.getDistance(this.corners.bl, this.detectedSide);

                this.constraint2.x = this.corners.tl.x;
                this.constraint2.y = this.corners.tl.y;
                this.constraint2.r = G.getDistance(this.corners.tl, this.detectedSide);
                break;
            case "l":
                this.constraint1.x = this.corners.br.x;
                this.constraint1.y = this.corners.br.y;
                this.constraint1.r = G.getDistance(this.corners.br, this.detectedSide);

                this.constraint2.x = this.corners.tr.x;
                this.constraint2.y = this.corners.tr.y;
                this.constraint2.r = G.getDistance(this.corners.tr, this.detectedSide);
                break;
            case "t":
            case "tl":
            case "tr":
                this.constraint1.x = this.corners.br.x;
                this.constraint1.y = this.corners.br.y;
                this.constraint1.r = G.getDistance(this.corners.br, this.detectedSide);

                this.constraint2.x = this.corners.bl.x;
                this.constraint2.y = this.corners.bl.y;
                this.constraint2.r = G.getDistance(this.corners.bl, this.detectedSide);
                break;
            case "b":
            case "bl":
            case "br":
                this.constraint1.x = this.corners.tr.x;
                this.constraint1.y = this.corners.tr.y;
                this.constraint1.r = G.getDistance(this.corners.tr, this.detectedSide);

                this.constraint2.x = this.corners.tl.x;
                this.constraint2.y = this.corners.tl.y;
                this.constraint2.r = G.getDistance(this.corners.tl, this.detectedSide);
            } //END OF SWITCH
        },

        /**
         * Applying Card touch constraints from the calculateConstraints function.
         * @memberof FPF.Card.prototype
         */
        applyConstraints: function () {
            G.getDistance2(this.tempPoint, this.referencePoint, this.constraint1);

            var dist = G.getDistance(this.referencePoint, this.constraint1),
                a = Math.atan2(this.tempPoint.y, this.tempPoint.x);

            if (dist > this.constraint1.r) {
                this.referencePoint.x = this.constraint1.x + Math.cos(a) * this.constraint1.r;
                this.referencePoint.y = this.constraint1.y + Math.sin(a) * this.constraint1.r;
            }

            G.getDistance2(this.tempPoint, this.referencePoint, this.constraint2);
            dist = G.getDistance(this.referencePoint, this.constraint2);
            a = Math.atan2(this.tempPoint.y, this.tempPoint.x);

            if (dist > this.constraint2.r) {
                this.referencePoint.x = this.constraint2.x + Math.cos(a) * this.constraint2.r;
                this.referencePoint.y = this.constraint2.y + Math.sin(a) * this.constraint2.r;
            }

        },

        /**
         * Used for calculating Card touch center point(from reference point to origin point).
         * @memberof FPF.Card.prototype
         */
        calculateCenterPoint: function () {
            G.getDistance2(this.tempPoint, this.referencePoint, this.originPoint);
            this.centerPoint.x = this.originPoint.x + this.tempPoint.x * 0.5;
            this.centerPoint.y = this.originPoint.y + this.tempPoint.y * 0.5;
        },

        /**
         * Used for calculating card mask angle based on the detected side(r - right, l - left, b - bottom, br - bottom right, bl - bottome left, t - top, tr - top right, tl - top left).
         * @memberof FPF.Card.prototype
         */
        calculateCardMaskAngle: function () {

            var dist = null,
                a = null;

            switch (this.detectedSide.label) {
            case "r":
                G.getDistance2(this.tempPoint, this.originPoint, this.referencePoint);
                dist = G.getDistance(this.originPoint, this.referencePoint);
                a = Math.asin(this.tempPoint.y / dist);
                break;
            case "l":
                G.getDistance2(this.tempPoint, this.referencePoint, this.originPoint);
                dist = G.getDistance(this.referencePoint, this.originPoint);
                a = Math.asin(this.tempPoint.y / dist);
                break;
            case "b":
            case "br":
            case "bl":
                G.getDistance2(this.tempPoint, this.referencePoint, this.originPoint);
                dist = G.getDistance(this.referencePoint, this.originPoint);
                a = Math.asin(this.tempPoint.x / dist);
                break;
            case "t":
            case "tr":
            case "tl":

                G.getDistance2(this.tempPoint, this.originPoint, this.referencePoint);
                dist = G.getDistance(this.originPoint, this.referencePoint);
                a = Math.asin(this.tempPoint.x / dist);
                break;
            } //END OF SWITCH STATEMENT

            this.cardAngle = a * 2;
            this.maskAngle = a;

        },

        /**
         * Used for calculating Card touch center point bottom based on the detected side label(r - right, l - left, b - bottom, t - top, br - bottom right, tr - top right, bl - bottom left, tl - top left).
         * @memberof FPF.Card.prototype
         */
        calculateCenterPointBottom: function () {

            var temp = null,
                a = null;

            switch (this.detectedSide.label) {
            case "r":
                temp = this.corners.br;
                break;
            case "l":
                temp = this.corners.bl;
                break;
            case "b":
            case "t":
            case "br":
            case "tr":
            case "bl":
            case "tl":
                this.centerPointBottom.x = this.centerPoint.x;
                this.centerPointBottom.y = this.centerPoint.y;
                break;
            } //END OF SWITCH STATEMENT

            if (temp !== null) {

                G.getDistance2(this.tempPoint, this.centerPoint, this.originPoint);
                a = Math.atan2(this.tempPoint.y, this.tempPoint.x);

                this.centerPointBottom.x = this.centerPoint.x - Math.tan(a) * (temp.y - this.centerPoint.y);
                this.centerPointBottom.y = temp.y;

                if (this.detectedSide.label !== "b" && this.detectedSide.label !== "t" &&
                    this.detectedSide.label !== "tl" && this.detectedSide.label !== "tr" &&
                    this.detectedSide.label !== "br" && this.detectedSide.label !== "bl") {
                    if (this.centerPointBottom.x > this.position.x + this.w) {
                        this.centerPointBottom.x = this.position.x + this.w;
                        this.centerPointBottom.y = this.centerPoint.y + Math.tan(Math.PI / 2 + this.maskAngle) * ((this.position.x + this.w) - this.centerPoint.x);
                    }
                    if (this.centerPointBottom.x < this.position.x) {
                        this.centerPointBottom.x = this.position.x;
                        this.centerPointBottom.y = this.centerPoint.y + Math.tan(Math.PI / 2 + this.maskAngle) * (this.position.x - this.centerPoint.x);
                    }
                } //END OF IF STATEMENT

            } //END OF IF STATEMENT

        },

        /**
         * Used to setup Card clipping points. based on detected side label(r - right, l - left, b - bottom, tr - top right, tl - top left, br - bottom right).
         * @memberof FPF.Card.prototype
         */
        setupClippingPoints: function () {
            switch (this.detectedSide.label) {
            case "r":
                this.tempPoint.x = this.centerPointBottom.x;
                this.tempPoint.y = this.centerPointBottom.y + this.h * 2;
                G.rotateClipPoint(this.clipPoints.p0, this.tempPoint, this.centerPointBottom, this.maskAngle);

                this.tempPoint.x = this.centerPointBottom.x - this.w * 2;
                this.tempPoint.y = this.centerPointBottom.y + this.h * 2;
                G.rotateClipPoint(this.clipPoints.p1, this.tempPoint, this.centerPointBottom, this.maskAngle);

                this.tempPoint.x = this.centerPointBottom.x - this.w * 2;
                this.tempPoint.y = this.centerPointBottom.y - this.h * 2;
                G.rotateClipPoint(this.clipPoints.p2, this.tempPoint, this.centerPointBottom, this.maskAngle);

                this.tempPoint.x = this.centerPointBottom.x;
                this.tempPoint.y = this.centerPointBottom.y - this.h * 2;
                G.rotateClipPoint(this.clipPoints.p3, this.tempPoint, this.centerPointBottom, this.maskAngle);
                break;
            case "l":
                this.tempPoint.x = this.centerPointBottom.x;
                this.tempPoint.y = this.centerPointBottom.y + this.h * 2;
                G.rotateClipPoint(this.clipPoints.p0, this.tempPoint, this.centerPointBottom, this.maskAngle);

                this.tempPoint.x = this.centerPointBottom.x + this.w * 2;
                this.tempPoint.y = this.centerPointBottom.y + this.h * 2;
                G.rotateClipPoint(this.clipPoints.p1, this.tempPoint, this.centerPointBottom, this.maskAngle);

                this.tempPoint.x = this.centerPointBottom.x + this.w * 2;
                this.tempPoint.y = this.centerPointBottom.y - this.h * 2;
                G.rotateClipPoint(this.clipPoints.p2, this.tempPoint, this.centerPointBottom, this.maskAngle);

                this.tempPoint.x = this.centerPointBottom.x;
                this.tempPoint.y = this.centerPointBottom.y - this.h * 2;
                G.rotateClipPoint(this.clipPoints.p3, this.tempPoint, this.centerPointBottom, this.maskAngle);
                break;
            case "b":
            case "bl":
            case "br":
                this.tempPoint.x = this.centerPointBottom.x + this.w * 2;
                this.tempPoint.y = this.centerPointBottom.y;
                G.rotateClipPoint(this.clipPoints.p0, this.tempPoint, this.centerPointBottom, this.maskAngle);

                this.tempPoint.x = this.centerPointBottom.x - this.w * 2;
                this.tempPoint.y = this.centerPointBottom.y;
                G.rotateClipPoint(this.clipPoints.p1, this.tempPoint, this.centerPointBottom, this.maskAngle);

                this.tempPoint.x = this.centerPointBottom.x - this.w * 2;
                this.tempPoint.y = this.centerPointBottom.y - this.h * 2;
                G.rotateClipPoint(this.clipPoints.p2, this.tempPoint, this.centerPointBottom, this.maskAngle);

                this.tempPoint.x = this.centerPointBottom.x + this.w * 2;
                this.tempPoint.y = this.centerPointBottom.y - this.h * 2;
                G.rotateClipPoint(this.clipPoints.p3, this.tempPoint, this.centerPointBottom, this.maskAngle);
                break;
            case "t":
            case "tl":
            case "tr":
                this.tempPoint.x = this.centerPointBottom.x + this.w * 2;
                this.tempPoint.y = this.centerPointBottom.y;
                G.rotateClipPoint(this.clipPoints.p0, this.tempPoint, this.centerPointBottom, this.maskAngle);

                this.tempPoint.x = this.centerPointBottom.x - this.w * 2;
                this.tempPoint.y = this.centerPointBottom.y;
                G.rotateClipPoint(this.clipPoints.p1, this.tempPoint, this.centerPointBottom, this.maskAngle);

                this.tempPoint.x = this.centerPointBottom.x - this.w * 2;
                this.tempPoint.y = this.centerPointBottom.y + this.h * 2;
                G.rotateClipPoint(this.clipPoints.p2, this.tempPoint, this.centerPointBottom, this.maskAngle);

                this.tempPoint.x = this.centerPointBottom.x + this.w * 2;
                this.tempPoint.y = this.centerPointBottom.y + this.h * 2;
                G.rotateClipPoint(this.clipPoints.p3, this.tempPoint, this.centerPointBottom, this.maskAngle);
                break;
            } //END OF SWITCH STATEMENT
        },

        /**
         * Used to setup Card auto flip target bosed on the detected side label(r - right, l - left, b - bottom, br - bottom rigt, bl - bottom left, t - top, tr - top right, tl - top left)
         * @memberof FPF.Card.prototype
         */
        setupAutoFlipTarget: function () {

            switch (this.detectedSide.label) {
            case "r":
                this.autoFlipTarget.x = this.corners.tl.x - (this.detectedSide.x - this.corners.tl.x);
                this.autoFlipTarget.y = this.detectedSide.y;
                break;
            case "l":
                this.autoFlipTarget.x = this.corners.tr.x + (this.corners.tr.x - this.detectedSide.x);
                this.autoFlipTarget.y = this.detectedSide.y;
                break;
            case "b":
            case "br":
            case "bl":
                this.autoFlipTarget.x = this.detectedSide.x;
                this.autoFlipTarget.y = this.corners.tl.y - (this.detectedSide.y - this.corners.tl.y);
                break;
            case "t":
            case "tr":
            case "tl":
                this.autoFlipTarget.x = this.detectedSide.x;
                this.autoFlipTarget.y = this.corners.bl.y + (this.corners.bl.y - this.detectedSide.y);
                break;
            } //END OF SWITCH STATEMENT
        },

        /**
         * Card Auto flip computation getters.
         * @memberof FPF.Card.prototype
         * @return {Number} auto flip computation in percentage.
         */
        getAutoFlipComputation: function () {

            var d = 0,
                p = 0;

            switch (this.detectedSide.label) {
            case "l":
            case "r":
                d = this.autoFlipTarget.x - this.originPoint.x;
                if (Math.abs(d) !== 0) {
                    p = (this.referencePoint.x - this.autoFlipTarget.x) / d;
                }
                break;
            case "t":
            case "b":
            case "tr":
            case "br":
            case "tl":
            case "bl":
                d = this.autoFlipTarget.y - this.originPoint.y;
                if (Math.abs(d) !== 0) {
                    p = (this.referencePoint.y - this.autoFlipTarget.y) / d;
                }
                break;
            } //END OF SWITCH STATEMENT


            return p;
        },

        /**
         * Force the Card to flip.
         * @param  {String} dir flip direction l - left, r - right, t - top, b - bottom
         * @memberof FPF.Card.prototype
         */
        forceFlip: function (dir) {

            if (this.isForceFlip) return;

            this.isForceFlip = true;
            this.isDirty = true;
            this.isOpen = true;
            this.isInteractable = false;

            switch (dir) {
            case "l":
                this.detectedSide.label = "r";
                this.referencePoint.x = this.detectedSide.x = this.originPoint.x = this.position.x + this.w;
                this.referencePoint.y = this.detectedSide.y = this.originPoint.y = this.position.y + this.h / 2;
                this.targetPoint.x = this.position.x - this.w;
                this.targetPoint.y = this.position.y + this.h / 2;
                break;
            case "r":
                this.detectedSide.label = "l";
                this.referencePoint.x = this.detectedSide.x = this.originPoint.x = this.position.x;
                this.referencePoint.y = this.detectedSide.y = this.originPoint.y = this.position.y + this.h / 2;
                this.targetPoint.x = this.position.x + this.w * 2;
                this.targetPoint.y = this.position.y + this.h / 2;
                break;
            case "t":
                this.detectedSide.label = "b";
                this.referencePoint.x = this.detectedSide.x = this.originPoint.x = this.position.x + this.w / 2;
                this.referencePoint.y = this.detectedSide.y = this.originPoint.y = this.position.y + this.h;
                this.targetPoint.x = this.position.x + this.w / 2;
                this.targetPoint.y = this.position.y - this.h;
                break;

            case "b":
                this.detectedSide.label = "t";
                this.referencePoint.x = this.detectedSide.x = this.originPoint.x = this.position.x + this.w / 2;
                this.referencePoint.y = this.detectedSide.y = this.originPoint.y = this.position.y;
                this.targetPoint.x = this.position.x + this.w / 2;
                this.targetPoint.y = this.position.y + this.h * 2;
                break;
            } //END OF SWITCH STATEMENT

            this.calculateConstraints();
            this.setupTempTarget();

        },

        /**
         * Used to setup temporary target. used in card force flip function and card auto flip function.
         * @memberof FPF.Card.prototype
         */
        setupTempTarget: function () {

            this.tempFlag = true;

            switch (this.detectedSide.label) {
            case "r":
                this.tempTargetX = this.detectedSide.x - this.corners.tl.x;
                break;
            case "l":
                this.tempTargetX = -(this.corners.tr.x - this.detectedSide.x);
                break;
            case "b":
            case "br":
            case "bl":
                this.tempTargetY = this.detectedSide.y - this.corners.tl.y;
                break;
            case "t":
            case "tr":
            case "tl":
                this.tempTargetY = -(this.corners.bl.y - this.detectedSide.y);
                break;
            } //END OF SWITCH STATEMENT

        },

        /**
         * Auto flip the Card.
         * @memberof FPF.Card.prototype
         */
        autoFlip: function () {

            var p = this.getAutoFlipComputation();

            this.targetPoint.x = this.originPoint.x;
            this.targetPoint.y = this.originPoint.y;

            if (Math.abs(p) <= 0.5 && this.isDirty) {

                if (!this.tempFlag) {
                    this.setupTempTarget();
                }

                this.isOpen = true;
                this.isInteractable = false;
                this.targetPoint.x = this.autoFlipTarget.x;
                this.targetPoint.y = this.autoFlipTarget.y;

            }

        },

        /**
         * Used for updating card position.
         * @memberof FPF.Card.prototype
         */
        updatePosition: function () {

            if (!this.isOpen) {
                return;
            }

            var t = this.img.front;

            this.isPositionMoving = true;

            this.img.front = this.img.back;
            this.img.back = t;
            this.isFront = !this.isFront;

            this.oldPosition.x = this.position.x;
            this.oldPosition.y = this.position.y;

        },

        /**
         * Used for updating Card relatives.
         * @memberof FPF.Card.prototype
         */
        updateRelatives: function () {

            this.corners.tl.x = this.position.x;
            this.corners.tl.y = this.position.y;

            this.corners.bl.x = this.position.x;
            this.corners.bl.y = this.position.y + this.h;

            this.corners.tr.x = this.position.x + this.w;
            this.corners.tr.y = this.position.y;

            this.corners.br.x = this.position.x + this.w;
            this.corners.br.y = this.position.y + this.h;

            this.center.x = this.position.x + this.w / 2;
            this.center.y = this.position.y + this.h / 2;

            this.bound.min.x = this.corners.tl.x;
            this.bound.min.y = this.corners.tl.y;

            this.bound.max.x = this.corners.br.x;
            this.bound.max.y = this.corners.br.y;

        },

        /**
         * Used for changing card orientation.
         * @param  {String} orientation card orientation(portrait or landscape).
         * @memberof FPF.Card.prototype
         */
        changeOrientation: function(orientation) {
            switch(orientation) {
                case "portrait":
                    this.isPortrait = true;
                    this.recalculateCard();
                    break;
                case "landscape":
                    this.isPortrait = false;
                    this.recalculateCard();
                    break;
            }

        },

        /**
         * Used for toggling card orientation.
         * @memberof FPF.Card.prototype
         */
        toggleOrientation: function() {
            this.isPortrait = !this.isPortrait;
            this.recalculateCard();
        },

        /**
         * Used for resetting card touch interaction.
         * @memberof FPF.Card.prototype
         */
        resetTouchInteraction: function() {
            this.pointerCount = 0;
            this.startTime = 0;
            this.endTime = 0;
            this.timeDiff = 0;
            this.isMaxTouchCount = false;
            this.touch1Enabled = false;
            this.touch2Enabled = false;
        },

        /**
         * Used to check Card interaction(validation).
         * @memberof FPF.Card.prototype
         */
        checkInteraction: function() {

            var isValid = false,
                self = this,
                pointers = self.context.pointers,
                pointersDown = self.context.pointersDown,
                boundingRect = self.context.boundingRect,
                minDiff = 100;

            if(!self.context.mouse.isDown) {
                self.resetTouchInteraction();
                return false;
            }

            if(pointers.length === 1 && self.isMaxTouchCount) {
                return false;
            }

            if(pointers.length === 1 && !self.touch1Enabled) {
                self.touch1Enabled = true;
                self.pointerCount = 1;
                self.startTime = new Date().getTime();
            }
            else if(pointers.length === 2 && !self.touch2Enabled) {
                self.touch2Enabled = true;
                self.pointerCount = 2;
                self.endTime = new Date().getTime();
                self.timeDiff = (self.touch1Enabled) ? self.endTime - self.startTime : 0;
            }

            if(pointers.length === 1 && !self.isMaxTouchCount && self.touch1Enabled) {
                isValid = self.context.mouse.isDown && self.isInsideBound(self.context.mouse.down) && self.isInteractable && !self.isFront;
            }
            else if(pointers.length === 2 && self.touch2Enabled) {

                self.isMaxTouchCount = true;

                if(pointersDown.length < 2) return false;

                isValid = self.context.mouse.isDown && self.isInsideBound(self.context.mouse.down) && self.isInsideBound({x: pointersDown[0].clientX - boundingRect.left, y: pointersDown[0].clientY - boundingRect.top }) && self.isInsideBound({x: pointersDown[1].clientX - boundingRect.left, y: pointersDown[1].clientY - boundingRect.top }) && self.isInteractable && /*!self.isFront &&*/ self.timeDiff < 100;


            }

            return isValid;
        },

        /**
         * Used for updating card.
         * @memberof FPF.Card.prototype
         */
        update: function() {

            var p = this.getAutoFlipComputation();

            if (this.updateHook && typeof (this.updateHook) === "function") {
                this.updateHook();
            }

            if(this.checkInteraction()) {

                if (!this.isMouseDown) {

                    G.onUpFlag = false;

                    p = 0;

                    this.cardSpeed = G.cardSpeed;
                    this.isMouseDown = true;
                    this.isDirty = true;
                    this.isOpen = false;
                    this.detectSide();
                    this.setupAutoFlipTarget();
                    this.calculateConstraints();

                    if (this.onPointerDown && typeof (this.onPointerDown) === "function") {
                        this.eventDetail.flags.isPointerDown = true;
                        this.eventDetail.pointer.x = this.context.mouse.down.x;
                        this.eventDetail.pointer.y = this.context.mouse.down.y;
                        this.onPointerDown(this);
                    }
                } //END IF

                this.targetPoint.x = this.context.mouse.position.x;
                this.targetPoint.y = this.context.mouse.position.y;

                if (Math.abs(p) <= 0.5 && Math.abs(p) !== 0) {
                    this.context.mouse.isDown = false;
                    this.isHalfShow = true;
                    if (this.onHalfShown && typeof (this.onHalfShown) === "function") {
                        this.onHalfShown(this);
                    }
                } //END OF IF STATEMENT

                if (this.eventDetail.flags.isPointerDown) {

                    if (this.eventDetail.pointer.x !== this.context.mouse.position.x ||
                        this.eventDetail.pointer.y !== this.context.mouse.position.y) {

                        this.eventDetail.pointer.x = this.context.mouse.position.x;
                        this.eventDetail.pointer.y = this.context.mouse.position.y;

                        if (this.onPointerMove && typeof (this.onPointerMove) === "function") {
                            this.onPointerMove(this);
                        }
                    } //END OF IF STATEMENT
                } //END OF IF STATEMENT

            } else {

                //this.cardSpeed = 0.1;
                this.isMouseDown = false;

                if(!G.onUpFlag) {
                    G.onUpFlag = true;
                }

                if (!this.isForceFlip) {
                    this.autoFlip();
                }

                if (this.eventDetail.flags.isPointerDown) {
                    this.eventDetail.flags.isPointerDown = false;
                    if (this.onPointerUp && typeof (this.onPointerUp) === "function") {
                        this.onPointerUp(this);
                    }
                }
            } //END OF IF ELSE STATEMENT

            this.tempX += (this.tempTargetX - this.tempX) * 0.2;
            this.tempY += (this.tempTargetY - this.tempY) * 0.2;

            if (this.isDirty) {

                if (this.isForceFlip) {
                    this.referencePoint.x += (this.targetPoint.x - this.referencePoint.x) * this.cardForceFlipSpeed;
                    this.referencePoint.y += (this.targetPoint.y - this.referencePoint.y) * this.cardForceFlipSpeed;
                } else {

                    if(G.onUpFlag && !this.isHalfShow) {

                        switch(this.detectedSide.label) {
                            case "r":
                            case "l":
                                this.referencePoint.x += (this.targetPoint.x - this.referencePoint.x) * 0.1;
                                this.referencePoint.y += (this.originPoint.y - this.referencePoint.y) * 0.2;
                                break;
                            case "b":
                            case "br":
                            case "bl":
                            case "t":
                            case "tr":
                            case "tl":
                                this.referencePoint.x += (this.originPoint.x - this.referencePoint.x) * 0.2;
                                this.referencePoint.y += (this.targetPoint.y - this.referencePoint.y) * 0.1;
                                break;
                        }

                    } else if(this.isHalfShow) {
                        this.referencePoint.x += (this.targetPoint.x - this.referencePoint.x) * 0.5;
                        this.referencePoint.y += (this.targetPoint.y - this.referencePoint.y) * 0.5;
                    } else {
                        this.referencePoint.x += (this.targetPoint.x - this.referencePoint.x) * this.cardSpeed;
                        this.referencePoint.y += (this.targetPoint.y - this.referencePoint.y) * this.cardSpeed;
                    }

                }

                this.applyConstraints();
                this.calculateCardMaskAngle();
                this.calculateCenterPoint();
                this.calculateCenterPointBottom();
                this.setupClippingPoints();

                if (G.getDistance(this.targetPoint, this.referencePoint) < 2 && !this.isMouseDown) {

                    this.isHalfShow = false;
                    this.isDirty = false;
                    this.tempFlag = false;
                    this.isForceFlip = false;
                    this.isInteractable = true;

                    this.tempX = 0;
                    this.tempY = 0;
                    this.tempTargetX = 0;
                    this.tempTargetY = 0;

                    this.updatePosition();

                    if (this.onFlipEnd && typeof (this.onFlipEnd) === "function") {
                        this.onFlipEnd(this);
                    }
                } //END OF IF STATEMENT
            } //END OF IF STATEMENT


        },

        /**
         * Used for rendering Card shadow
         * @param  {CanvasRenderingContext2D} ctx canvas context 2d.
         * @memberof FPF.Card.prototype
         */
        renderShadow: function (ctx) {

            var shadowAngle = this.maskAngle,
                p = null,
                hp = null,
                wp = null,
                offsetH = null,
                offsetW = null,
                dist = null,
                gradient = null;

            if(this.isPortrait) {
                offsetH = this.h * 2;
                offsetW = this.h * 2;
            }
            else {
                offsetH = this.baseHeight * 2;
                offsetW = this.baseHeight * 2;
            }

            switch (this.detectedSide.label) {
            case "t":
            case "tl":
            case "tr":
            case "b":
            case "bl":
            case "br":
                if (["t", "tl", "tr"].indexOf(this.detectedSide.label) !== -1) {
                    ctx.scale(1, -1);
                    shadowAngle *= -1;
                }

                p = ((this.detectedSide.x - this.position.x) / this.w);
                wp = this.shadow.w * p;
                dist = G.getDistance(this.referencePoint, this.centerPoint);

                gradient = this.shadow.ctx.createLinearGradient(0, 0, 0, dist + (dist * 0.6));
                gradient.addColorStop(0, "rgba(255, 255, 255, 0.001)");
                gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.15)");
                gradient.addColorStop(1, "rgba(255, 255, 255, 0.001)");


                ctx.save();

                if(!this.isPortrait) {
                    if (["t", "tl", "tr"].indexOf(this.detectedSide.label) !== -1) {
                        ctx.rotate(Math.PI / 2);
                    }else {
                        ctx.rotate(-Math.PI / 2);
                    }
                }


                this.shadow.ctx.clearRect(0, 0, this.shadow.w, this.shadow.h);

                this.shadow.ctx.save();
                this.shadow.ctx.translate(wp, 0);
                this.shadow.ctx.rotate(-shadowAngle * 0.98);
                this.shadow.ctx.fillStyle = gradient;
                this.shadow.ctx.fillRect(-wp - offsetW / 2, 0, this.shadow.w + offsetW, dist);
                this.shadow.ctx.restore();

                ctx.drawImage(this.shadow.canvas, -this.w * ((this.detectedSide.x - this.position.x) / this.w), 0, this.w, this.h);

                ctx.restore();

                break;
            case "l":
            case "r":

                if (this.detectedSide.label === "l") {
                    shadowAngle *= -1;
                    ctx.scale(-1, 1);
                }

                if(this.isPortrait) {

                    p = ((this.detectedSide.y - this.position.y) / this.h);//PORTRAIT
                    hp = this.h * p;//PORTRAIT
                }
                else {

                    p = ((this.detectedSide.y - this.position.y) / this.h);//LANDSCAPE
                    hp = this.h * p;//LANDSCAPE
                }

                dist = G.getDistance(this.referencePoint, this.centerPoint);

                if(this.isPortrait) {
                    gradient = this.shadow.ctx.createLinearGradient(0, 0, dist + (dist * 0.6), 0);//PORTRAIT
                }
                else {
                    gradient = this.shadow.ctx.createLinearGradient(0, 0, dist + (dist * 0.6), 0);//LANDSCAPE
                }

                gradient.addColorStop(0, "rgba(255, 255, 255, 0.001)");
                gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.15)");

                gradient.addColorStop(1, "rgba(255, 255, 255, 0.001)");

                this.shadow.ctx.clearRect(0, 0, this.shadow.w, this.shadow.h);
                this.shadow.ctx.save();
                this.shadow.ctx.fillStyle = gradient;

                if(this.isPortrait) {
                    this.shadow.ctx.translate(0, hp);
                    this.shadow.ctx.rotate(-shadowAngle * 0.98);
                    this.shadow.ctx.fillRect(0, -hp - offsetH / 2, dist, this.h + offsetH);//PORTRAIT
                    this.shadow.ctx.restore();

                    ctx.drawImage(this.shadow.canvas, 0, -this.h * ((this.detectedSide.y - this.position.y) / this.h));//PORTRAIT
                }
                else {

                    ctx.save();

                    if(this.detectedSide.label === "l") {
                        ctx.rotate(Math.PI / 2);
                    }
                    else {
                        ctx.rotate(-Math.PI / 2);
                    }

                    this.shadow.ctx.translate(0, hp);
                    this.shadow.ctx.rotate(-shadowAngle * 0.98);
                    this.shadow.ctx.fillRect(0, -hp - offsetH / 2, dist, this.h + offsetH);//PORTRAIT
                    this.shadow.ctx.restore();

                    ctx.drawImage(this.shadow.canvas, 0, -this.h * ((this.detectedSide.y - this.position.y) / this.h));//PORTRAIT

                    ctx.restore();
                }

                break;
            } //END OF SWITCH STATEMENT
        },

        /**
         * Used for recalculating Card.
         * @memberof FPF.Card.prototype
         */
        recalculateCard: function() {

            var t = this.w;

            this.w = this.h;
            this.h = t;

            this.shadow.canvas.width = this.w;
            this.shadow.canvas.height = this.h;
            this.shadow.w = this.w;
            this.shadow.h = this.h;

            this.position = new Point(this.initialPos.x, this.initialPos.y);
            this.position.x -= this.w / 2;
            this.position.y -= this.h / 2;

            this.bound = new Bound(
                new Point(this.position.x, this.position.y),
                new Point(this.position.x + this.w, this.position.y + this.h)
            );
            this.corners = {
                tl: new BoundCircle(30, this.position.x, this.position.y),
                bl: new BoundCircle(30, this.position.x, this.position.y + this.h),
                tr: new BoundCircle(30, this.position.x + this.w, this.position.y),
                br: new BoundCircle(30, this.position.x + this.w, this.position.y + this.h)
            };

            if(this.isPortrait) {
                this.targetRotation = 0;
            }
            else {
                this.targetRotation = Math.PI / 2;
            }

        },

        /**
         * Used for rendering Card back image.
         * @param  {CanvasRenderingContext2D} ctx canvas context 2d
         * @memberof FPF.Card.prototype
         */
        drawBackImage: function(ctx) {

            ctx.save();
            ctx.translate(this.position.x + this.w/2, this.position.y + this.h/2);

            ctx.rotate(this.rotation);
            this.rotation += (this.targetRotation - this.rotation) * 0.2;

            ctx.drawImage(this.img.back, -this.baseWidth/2, -this.baseHeight/2, this.baseWidth, this.baseHeight);
            ctx.restore();

        },

        /**
         * Used for rendering the card.
         * @param  {CanvasRenderingContext2D} ctx canvas context 2d
         * @memberof FPF.Card.prototype
         */
        renderCard: function (ctx) {

            if (!this.isDirty) {
                this.drawBackImage(ctx);
            }

            if (this.isDirty) {

                //CARD BACK CLIPPING
                ctx.save();
                G.drawClipPoints(ctx, this.clipPoints, G.isDebug);
                this.drawBackImage(ctx);
                ctx.restore();

                //CARD FRONT CLIPPING
                ctx.save();
                G.drawClipPoints(ctx, this.clipPoints, G.isDebug);

                ctx.save();
                ctx.translate(this.referencePoint.x, this.referencePoint.y);

                if(this.isPortrait) {
                    ctx.rotate(this.cardAngle); //PORTRAIT
                }
                else {
                    ctx.rotate(this.cardAngle + (Math.PI / 2));//LANDSCAPE
                }

                switch (this.detectedSide.label) {
                case "r":
                    if(this.isPortrait) {
                        ctx.drawImage(this.img.front, 0, -this.h * ((this.detectedSide.y - this.position.y) / this.h), this.w, this.h);//PORTRAIT
                    }
                    else {
                        ctx.drawImage(this.img.front, -this.baseHeight * ((this.detectedSide.y - this.position.y) / this.baseHeight) , -this.baseHeight, this.baseWidth, this.baseHeight);//LANDSCAPE
                    }

                    break;
                case "l":

                    if(this.isPortrait) {
                        ctx.drawImage(this.img.front, -this.w, -this.h * ((this.detectedSide.y - this.position.y) / this.h), this.w, this.h);//PORTRAIT
                    }
                    else {
                        ctx.drawImage(this.img.front, -this.baseHeight * ((this.detectedSide.y - this.position.y) / this.baseHeight), 0, this.baseWidth, this.baseHeight);//LANDSCAPE
                    }

                    break;
                case "b":
                case "br":
                case "bl":

                    if(this.isPortrait) {
                        ctx.drawImage(this.img.front, -this.w * ((this.detectedSide.x - this.position.x) / this.w), 0, this.w, this.h);//PORTRAIT
                    }
                    else {
                        ctx.drawImage(this.img.front, 0, -this.baseHeight + (this.baseHeight * ((this.detectedSide.x - this.position.x) / this.baseHeight)), this.baseWidth, this.baseHeight);//LANDSCAPE
                    }

                    break;
                case "t":
                case "tl":
                case "tr":
                    if(this.isPortrait) {
                        ctx.drawImage(this.img.front, -this.w * ((this.detectedSide.x - this.position.x) / this.w), -this.h, this.w, this.h); //PORTRAIT
                    }
                    else {
                        ctx.drawImage(this.img.front, -this.baseWidth, -this.baseHeight + (this.baseHeight * ((this.detectedSide.x - this.position.x) / this.baseHeight)), this.baseWidth, this.baseHeight);//LANDSCAPE
                    }

                    break;
                } //END OF SWITCH STATEMENT

                this.renderShadow(ctx);

                ctx.restore(); //RESTORE TRANSORM
                ctx.restore(); //RESTORE CLIPPING

            } //END IF STATEMENT
        },

        /**
         * Card main rendering function.
         * @param  {CanvasRenderingContext2D} ctx canvas 2d context.
         * @memberof FPF.Card.prototype
         */
        render: function (ctx) {

                var _this = this;

                this.renderCard(ctx);

                if (G.isDebug) {

                    G.drawLine(ctx, "black", this.bound.min, this.bound.max);
                    G.drawCircle(ctx, "black", this.corners.tl.r, this.corners.tl);
                    G.drawCircle(ctx, "black", this.corners.bl.r, this.corners.bl);
                    G.drawCircle(ctx, "black", this.corners.tr.r, this.corners.tr);
                    G.drawCircle(ctx, "black", this.corners.br.r, this.corners.br);
                    G.drawCircle(ctx, "black", 10, this.center);

                    G.drawCircle(ctx, "pink", 20, this.position);
                    G.drawCircle(ctx, "purple", 50, this.initialPos);

                    if (this.isDirty) {

                        G.drawLine(ctx, "black", this.originPoint, this.referencePoint);
                        G.drawLine(ctx, "black", this.centerPoint, this.centerPointBottom);
                        G.drawLine(ctx, "green", this.autoFlipTarget, this.detectedSide);

                        G.drawCircle(ctx, "black", this.constraint1.r, this.constraint1);
                        G.drawCircle(ctx, "black", this.constraint2.r, this.constraint2);
                        G.drawCircle(ctx, "orange", 10, this.originPoint);
                        G.drawCircle(ctx, "blue", 5, this.referencePoint);
                        G.drawCircle(ctx, "blue", 5, this.centerPoint);
                        G.drawCircle(ctx, "blue", 5, this.centerPointBottom);
                        G.drawCircle(ctx, "blue", 5, this.autoFlipTarget);

                        G.drawCircle(ctx, "red", 5, this.targetPoint);

                    } //END OF IF STATEMENT

                    G.drawText(ctx, "orange", "width: " + this.context.c.width(), 5, 10);
                    G.drawText(ctx, "orange", "height: " + this.context.c.height(), 5, 25);
                    G.drawText(ctx, "orange", "orientation: " + G.orientation, 5, 40);
                    G.drawText(ctx, "orange", "timeDiff: " + this.timeDiff, 5, 55);
                    G.drawText(ctx, "orange", "pointerCount: " + this.pointerCount, 5, 65);
                    G.drawText(ctx, "orange", "mouse.isDown: " + this.context.mouse.isDown, 5, 75);


                } //END OF IF STATEMENT

                this.context.ctx.save();
                this.context.ctx.translate(this.context.w / 2, this.context.h / 2);

                this.context.ctx.drawImage(this.context.tempEl, this.tempX - this.context.w / 2, this.tempY - this.context.h / 2);
                this.context.ctx.restore();

                if(G.isDebugTouch) {
                    G.drawTouchPoints(this.context.ctx, this.context.pointers, this.context.touchCenter, this.context.touchRotation, this.context.boundingRect);
                }

            } //END OF RENDER METHOD
    }; //END OF CARD PROTOTYPE


    FPF.Card = Card;

}); //END OF MAIN
