! function(t) {
    "use strict";
    window.FPF = window.FPF || {}, window.FPF.version = "1.0.5", t(window.FPF)
}(function(t) {
    "use strict";
    t.G = {
        isDebug: !1,
        isDebugTouch: !1,
        enableClickToggleOrientation: !1,
        onUpFlag: !1,
        baseWindowWidth: 1366,
        baseWindowHeight: 667,
        cardBaseWidth: 200,
        cardBaseHeight: 270,
        cardWidthPercent: 0,
        cardHeightPercent: 0,
        orientation: "",
        cardSpeed: .98,
        reCalculateDimensions: function() {
            this.cardWidthPercent = this.cardBaseWidth / this.baseWindowWidth, this.cardHeightPercent = this.cardBaseHeight / this.cardBaseWidth
        },
        drawTouchPoints: function(t, i, e, s, n) {
            if(i === null || e === null) return;

            for (var o = 0, h = i.length; o < h; o++) {
                var r = i[o];
                t.beginPath(), t.fillStyle = "rgba(255, 0, 0, 0.2)";
                t.arc(r.clientX - n.left, r.clientY - n.top, 100, 0, 2 * Math.PI);
                t.fill()
            }
            t.beginPath();
            t.fillStyle = "rgba(255, 0, 255, 1)";
            t.arc(e.x - n.left, e.y - n.top, 10, 0, 2 * Math.PI);
            t.fill();

            t.font = "30px Arial";
            t.fillStyle = "black";
            t.fillText(s, 10, 40)
        },
        rotateClipPoint: function(t, i, e, s) {
            i.x -= e.x;
            i.y -= e.y;
            
            t.x = i.x * Math.cos(s) - i.y * Math.sin(s);
            t.y = Math.sin(s) * i.x + Math.cos(s) * i.y;

            t.x += e.x;
            t.y += e.y
        },
        getDistance2: function(t, i, e) {
            t.x = i.x - e.x, t.y = i.y - e.y
        },
        getDistance: function(t, i) {
            var e = t.x - i.x,
                s = t.y - i.y;
            return Math.sqrt(e * e + s * s)
        },
        drawClipPoints: function(t, i, e) {
            t.beginPath(), t.moveTo(i.p0.x, i.p0.y), t.lineTo(i.p1.x, i.p1.y), t.lineTo(i.p2.x, i.p2.y), t.lineTo(i.p3.x, i.p3.y), t.closePath(), e ? (t.fillStyle = "rgba(0, 0, 0, 0.5)", t.fill()) : t.clip()
        },
        drawText: function(t, i, e, s, n) {
            t.fillStyle = i, t.fillText(e, s, n)
        },
        drawLine: function(t, i, e, s) {
            t.strokeStyle = i, t.beginPath(), t.moveTo(e.x, e.y), t.lineTo(s.x, s.y), t.stroke()
        },
        drawCircle: function(t, i, e, s) {
            t.strokeStyle = i, t.beginPath(), t.arc(s.x, s.y, e, 0, 2 * Math.PI), t.stroke()
        }
    }
}),
function(t) {
    "use strict";
    window.FPF = window.FPF || {}, t(window.FPF)
}(function(t) {
    "use strict";

    function i(t, i, e) {
        this.r = t, this.x = i, this.y = e
    }
    i.prototype = {
        constructor: i,
        isInsideRadius: function(t) {
            var i = this.x - t.x,
                e = this.y - t.y;
            return Math.sqrt(i * i + e * e) < this.r
        }
    }, t.BoundCircle = i
}),
function(t) {
    "use strict";
    window.FPF = window.FPF || {}, t(window.FPF)
}(function(t) {
    "use strict";
    t.Side = function(t, i, e) {
        this.x = t, this.y = i, this.label = e
    }
}),
function(t) {
    "use strict";
    window.FPF = window.FPF || {}, t(window.FPF)
}(function(t) {
    "use strict";

    function i(t, i) {
        this.min = t, this.max = i
    }
    i.prototype = {
        constructor: i
    }, t.Bound = i
}),
function(t) {
    "use strict";
    window.FPF = window.FPF || {}, t(window.FPF)
}(function(t) {
    "use strict";

    function i(t, i) {
        this.x = t, this.y = i
    }
    i.prototype = {
        constructor: i,
        reset: function() {
            this.x = 0, this.y = 0
        }
    }, t.Point = i
}),
function(t) {
    "use strict";
    window.FPF = window.FPF || {}, t(window.FPF, window.FPF.Point)
}(function(t, i) {
    "use strict";

    function e() {
        this.position = new i(0, 0), this.down = new i(0, 0), this.up = new i(0, 0), this.isDown = !1
    }
    e.prototype = {
        constructor: e
    }, t.Mouse = e
}),
function(t) {
    "use strict";
    window.FPF = window.FPF || {}, t(window.FPF, window.FPF.G, window.FPF.Point, window.FPF.Bound, window.FPF.BoundCircle, window.FPF.Side)
}(function(t, i, e, s, n, o) {
    "use strict";

    function h(t, h, r, a, c, d) {
        i.cardBaseWidth = c, i.cardBaseHeight = d, i.reCalculateDimensions();
        var l = t.c.width(),
            p = t.c.height();
        this.positionPercent = {
            x: a.x / l,
            y: a.y / p
        };
        var P = this;
        a = new e(P.positionPercent.x * l, P.positionPercent.y * p), d = (c = l * i.cardWidthPercent) * i.cardHeightPercent, this.label = null, this.isFront = !1, this.context = t, this.img = {
            front: document.createElement("img"),
            back: document.createElement("img")
        }, this.img.front.src = h, this.img.back.src = r, this.initialPos = new e(a.x, a.y), this.position = a, this.position.x -= c / 2, this.position.y -= d / 2, this.oldPosition = new e(a.x, a.y), this.w = c, this.h = d, this.baseWidth = this.w, this.baseHeight = this.h, this.bound = new s(new e(a.x, a.y), new e(a.x + c, a.y + d)), this.corners = {
            tl: new n(30, a.x, a.y),
            bl: new n(30, a.x, a.y + d),
            tr: new n(30, a.x + c, a.y),
            br: new n(30, a.x + c, a.y + d)
        }, this.clipPoints = {
            p0: new e(0, 0),
            p1: new e(0, 0),
            p2: new e(0, 0),
            p3: new e(0, 0)
        };
        var u = document.createElement("canvas"),
            x = u.getContext("2d");
        u.width = c, u.height = d, this.shadow = {
            canvas: u,
            ctx: x,
            w: u.width,
            h: u.height
        }, this.center = new e(a.x + c / 2, a.y + d / 2), this.originPoint = new e(0, 0), this.referencePoint = new e(0, 0), this.targetPoint = new e(0, 0), this.centerPoint = new e(0, 0), this.centerPointBottom = new e(0, 0), this.detectedSide = new o(0, 0, null), this.autoFlipTarget = new e(0, 0), this.tempDetectedSideLR = new e(0, 0), this.tempDetectedSideTB = new e(0, 0), this.isMouseDown = !1, this.isDirty = !1, this.constraint1 = new n(0, 0, 0), this.constraint2 = new n(0, 0, 0), this.tempPoint = new e(0, 0), this.cardAngle = 0, this.maskAngle = 0, this.isOpen = !1, this.isInteractable = !0, this.isForceFlip = !1, this.isPositionMoving = !1, this.eventDetail = {
            pointer: {
                x: null,
                y: null
            },
            flags: {
                isPointerDown: !1
            }
        }, this.cardSpeed = i.cardSpeed, this.cardForceFlipSpeed = .5, this.tempFlag = !1, this.tempX = 0, this.tempY = 0, this.tempTargetX = 0, this.tempTargetY = 0, this.isPortrait = !1, this.rotation = Math.PI / 2, this.targetRotation = Math.PI / 2, this.pointerCount = 0, this.startTime = 0, this.endTime = 0, this.timeDiff = 0, this.touch1Enabled = !1, this.touch2Enabled = !1, this.isMaxTouchCount = !1, this.isHalfShow = !1, this.onUpFlag = !1, this.reculateResizing()
    }
    h.prototype = {
        constructor: h,
        onPointerDown: null,
        onPointerUp: null,
        onPointerMove: null,
        onFlipEnd: null,
        onHalfShown: null,
        reculateResizing: function() {
            var t = this.context.c.width(),
                o = this.context.c.height();
            this.context.el.width = t, this.context.el.height = o, this.context.tempEl.width = t, this.context.tempEl.height = o, this.context.w = t, this.context.h = o;
            var h = null,
                r = null;
            if (h = t * i.cardWidthPercent, isMobile.phone || isMobile.tablet)
                if (isMobile.apple.device) device.landscape() && (i.orientation = "landscape", h = t * i.cardWidthPercent), device.portrait() && (i.orientation = "portrait", h = o * i.cardWidthPercent);
                else switch (window.orientation) {
                    case -90:
                    case 90:
                        i.orientation = "landscape", h = t * i.cardWidthPercent;
                        break;
                    default:
                        i.orientation = "portrait", h = o * i.cardWidthPercent
                }
                r = h * i.cardHeightPercent;
            var a = this,
                c = new e(a.positionPercent.x * t, a.positionPercent.y * o),
                d = h;
            this.baseWidth = h, this.baseHeight = r, this.isPortrait || (h = r, r = d), this.w = h, this.h = r, this.initialPos = new e(c.x, c.y), this.position = c, this.position.x -= this.w / 2, this.position.y -= this.h / 2, this.bound = new s(new e(c.x, c.y), new e(c.x + h, c.y + r)), this.corners = {
                tl: new n(30, c.x, c.y),
                bl: new n(30, c.x, c.y + r),
                tr: new n(30, c.x + h, c.y),
                br: new n(30, c.x + h, c.y + r)
            }, this.center = new e(this.position.x + h / 2, this.position.y + r / 2), this.oldPosition = new e(c.x, c.y), this.shadow.canvas.width = h, this.shadow.canvas.height = r, this.shadow.w = h, this.shadow.h = r
        },
        clean: function() {
            if (this.isFront) {
                var t = this.img.front;
                this.img.front = this.img.back, this.img.back = t, this.isFront = !1, this.isInteractable = !0
            }
        },
        setUpdateHook: function(t) {
            "function" == typeof t && (this.updateHook = t)
        },
        updateHook: null,
        setFrontImage: function(t) {
            this.img.front.src = t
        },
        setBackImage: function(t) {
            this.img.back.src = t
        },
        isInsideBound: function(t) {
            return t.x >= this.bound.min.x && t.x <= this.bound.max.x && t.y >= this.bound.min.y && t.y <= this.bound.max.y
        },
        assignSide: function(t, i, e) {
            switch (i) {
                case "h":
                    e.x - this.center.x < 0 ? (t.x = this.position.x, t.y = e.y) : (t.x = this.position.x + this.w, t.y = e.y);
                    break;
                case "v":
                    e.y - this.center.y < 0 ? (t.x = e.x, t.y = this.position.y) : (t.x = e.x, t.y = this.position.y + this.h)
            }
        },
        detectSide: function() {
            var t = null;
            for (var e in this.corners)
                if (this.corners[e].isInsideRadius(this.context.mouse.down)) {
                    t = this.corners[e], this.detectedSide.x = t.x, this.detectedSide.y = t.y, this.detectedSide.label = e;
                    break
                }
            null === t && (this.assignSide(this.tempDetectedSideLR, "h", this.context.mouse.down), this.assignSide(this.tempDetectedSideTB, "v", this.context.mouse.down), i.getDistance(this.context.mouse.down, this.tempDetectedSideLR) < i.getDistance(this.context.mouse.down, this.tempDetectedSideTB) ? (this.detectedSide.x = this.tempDetectedSideLR.x, this.detectedSide.y = this.tempDetectedSideLR.y, this.detectedSide.label = this.tempDetectedSideLR.x - this.center.x < 0 ? "l" : "r") : (this.detectedSide.x = this.tempDetectedSideTB.x, this.detectedSide.y = this.tempDetectedSideTB.y, this.detectedSide.label = this.tempDetectedSideTB.y - this.center.y < 0 ? "t" : "b")), this.referencePoint.x = this.originPoint.x = this.detectedSide.x, this.referencePoint.y = this.originPoint.y = this.detectedSide.y
        },
        calculateConstraints: function() {
            switch (this.detectedSide.label) {
                case "r":
                    this.constraint1.x = this.corners.bl.x, this.constraint1.y = this.corners.bl.y, this.constraint1.r = i.getDistance(this.corners.bl, this.detectedSide), this.constraint2.x = this.corners.tl.x, this.constraint2.y = this.corners.tl.y, this.constraint2.r = i.getDistance(this.corners.tl, this.detectedSide);
                    break;
                case "l":
                    this.constraint1.x = this.corners.br.x, this.constraint1.y = this.corners.br.y, this.constraint1.r = i.getDistance(this.corners.br, this.detectedSide), this.constraint2.x = this.corners.tr.x, this.constraint2.y = this.corners.tr.y, this.constraint2.r = i.getDistance(this.corners.tr, this.detectedSide);
                    break;
                case "t":
                case "tl":
                case "tr":
                    this.constraint1.x = this.corners.br.x, this.constraint1.y = this.corners.br.y, this.constraint1.r = i.getDistance(this.corners.br, this.detectedSide), this.constraint2.x = this.corners.bl.x, this.constraint2.y = this.corners.bl.y, this.constraint2.r = i.getDistance(this.corners.bl, this.detectedSide);
                    break;
                case "b":
                case "bl":
                case "br":
                    this.constraint1.x = this.corners.tr.x, this.constraint1.y = this.corners.tr.y, this.constraint1.r = i.getDistance(this.corners.tr, this.detectedSide), this.constraint2.x = this.corners.tl.x, this.constraint2.y = this.corners.tl.y, this.constraint2.r = i.getDistance(this.corners.tl, this.detectedSide)
            }
        },
        applyConstraints: function() {
            i.getDistance2(this.tempPoint, this.referencePoint, this.constraint1);
            var t = i.getDistance(this.referencePoint, this.constraint1),
                e = Math.atan2(this.tempPoint.y, this.tempPoint.x);
            t > this.constraint1.r && (this.referencePoint.x = this.constraint1.x + Math.cos(e) * this.constraint1.r, this.referencePoint.y = this.constraint1.y + Math.sin(e) * this.constraint1.r), i.getDistance2(this.tempPoint, this.referencePoint, this.constraint2), t = i.getDistance(this.referencePoint, this.constraint2), e = Math.atan2(this.tempPoint.y, this.tempPoint.x), t > this.constraint2.r && (this.referencePoint.x = this.constraint2.x + Math.cos(e) * this.constraint2.r, this.referencePoint.y = this.constraint2.y + Math.sin(e) * this.constraint2.r)
        },
        calculateCenterPoint: function() {
            i.getDistance2(this.tempPoint, this.referencePoint, this.originPoint), this.centerPoint.x = this.originPoint.x + .5 * this.tempPoint.x, this.centerPoint.y = this.originPoint.y + .5 * this.tempPoint.y
        },
        calculateCardMaskAngle: function() {
            var t = null,
                e = null;
            switch (this.detectedSide.label) {
                case "r":
                    i.getDistance2(this.tempPoint, this.originPoint, this.referencePoint), t = i.getDistance(this.originPoint, this.referencePoint), e = Math.asin(this.tempPoint.y / t);
                    break;
                case "l":
                    i.getDistance2(this.tempPoint, this.referencePoint, this.originPoint), t = i.getDistance(this.referencePoint, this.originPoint), e = Math.asin(this.tempPoint.y / t);
                    break;
                case "b":
                case "br":
                case "bl":
                    i.getDistance2(this.tempPoint, this.referencePoint, this.originPoint), t = i.getDistance(this.referencePoint, this.originPoint), e = Math.asin(this.tempPoint.x / t);
                    break;
                case "t":
                case "tr":
                case "tl":
                    i.getDistance2(this.tempPoint, this.originPoint, this.referencePoint), t = i.getDistance(this.originPoint, this.referencePoint), e = Math.asin(this.tempPoint.x / t)
            }
            this.cardAngle = 2 * e, this.maskAngle = e
        },
        calculateCenterPointBottom: function() {
            var t = null,
                e = null;
            switch (this.detectedSide.label) {
                case "r":
                    t = this.corners.br;
                    break;
                case "l":
                    t = this.corners.bl;
                    break;
                case "b":
                case "t":
                case "br":
                case "tr":
                case "bl":
                case "tl":
                    this.centerPointBottom.x = this.centerPoint.x, this.centerPointBottom.y = this.centerPoint.y
            }
            null !== t && (i.getDistance2(this.tempPoint, this.centerPoint, this.originPoint), e = Math.atan2(this.tempPoint.y, this.tempPoint.x), this.centerPointBottom.x = this.centerPoint.x - Math.tan(e) * (t.y - this.centerPoint.y), this.centerPointBottom.y = t.y, "b" !== this.detectedSide.label && "t" !== this.detectedSide.label && "tl" !== this.detectedSide.label && "tr" !== this.detectedSide.label && "br" !== this.detectedSide.label && "bl" !== this.detectedSide.label && (this.centerPointBottom.x > this.position.x + this.w && (this.centerPointBottom.x = this.position.x + this.w, this.centerPointBottom.y = this.centerPoint.y + Math.tan(Math.PI / 2 + this.maskAngle) * (this.position.x + this.w - this.centerPoint.x)), this.centerPointBottom.x < this.position.x && (this.centerPointBottom.x = this.position.x, this.centerPointBottom.y = this.centerPoint.y + Math.tan(Math.PI / 2 + this.maskAngle) * (this.position.x - this.centerPoint.x))))
        },
        setupClippingPoints: function() {
            switch (this.detectedSide.label) {
                case "r":
                    this.tempPoint.x = this.centerPointBottom.x, this.tempPoint.y = this.centerPointBottom.y + 2 * this.h, i.rotateClipPoint(this.clipPoints.p0, this.tempPoint, this.centerPointBottom, this.maskAngle), this.tempPoint.x = this.centerPointBottom.x - 2 * this.w, this.tempPoint.y = this.centerPointBottom.y + 2 * this.h, i.rotateClipPoint(this.clipPoints.p1, this.tempPoint, this.centerPointBottom, this.maskAngle), this.tempPoint.x = this.centerPointBottom.x - 2 * this.w, this.tempPoint.y = this.centerPointBottom.y - 2 * this.h, i.rotateClipPoint(this.clipPoints.p2, this.tempPoint, this.centerPointBottom, this.maskAngle), this.tempPoint.x = this.centerPointBottom.x, this.tempPoint.y = this.centerPointBottom.y - 2 * this.h, i.rotateClipPoint(this.clipPoints.p3, this.tempPoint, this.centerPointBottom, this.maskAngle);
                    break;
                case "l":
                    this.tempPoint.x = this.centerPointBottom.x, this.tempPoint.y = this.centerPointBottom.y + 2 * this.h, i.rotateClipPoint(this.clipPoints.p0, this.tempPoint, this.centerPointBottom, this.maskAngle), this.tempPoint.x = this.centerPointBottom.x + 2 * this.w, this.tempPoint.y = this.centerPointBottom.y + 2 * this.h, i.rotateClipPoint(this.clipPoints.p1, this.tempPoint, this.centerPointBottom, this.maskAngle), this.tempPoint.x = this.centerPointBottom.x + 2 * this.w, this.tempPoint.y = this.centerPointBottom.y - 2 * this.h, i.rotateClipPoint(this.clipPoints.p2, this.tempPoint, this.centerPointBottom, this.maskAngle), this.tempPoint.x = this.centerPointBottom.x, this.tempPoint.y = this.centerPointBottom.y - 2 * this.h, i.rotateClipPoint(this.clipPoints.p3, this.tempPoint, this.centerPointBottom, this.maskAngle);
                    break;
                case "b":
                case "bl":
                case "br":
                    this.tempPoint.x = this.centerPointBottom.x + 2 * this.w, this.tempPoint.y = this.centerPointBottom.y, i.rotateClipPoint(this.clipPoints.p0, this.tempPoint, this.centerPointBottom, this.maskAngle), this.tempPoint.x = this.centerPointBottom.x - 2 * this.w, this.tempPoint.y = this.centerPointBottom.y, i.rotateClipPoint(this.clipPoints.p1, this.tempPoint, this.centerPointBottom, this.maskAngle), this.tempPoint.x = this.centerPointBottom.x - 2 * this.w, this.tempPoint.y = this.centerPointBottom.y - 2 * this.h, i.rotateClipPoint(this.clipPoints.p2, this.tempPoint, this.centerPointBottom, this.maskAngle), this.tempPoint.x = this.centerPointBottom.x + 2 * this.w, this.tempPoint.y = this.centerPointBottom.y - 2 * this.h, i.rotateClipPoint(this.clipPoints.p3, this.tempPoint, this.centerPointBottom, this.maskAngle);
                    break;
                case "t":
                case "tl":
                case "tr":
                    this.tempPoint.x = this.centerPointBottom.x + 2 * this.w, this.tempPoint.y = this.centerPointBottom.y, i.rotateClipPoint(this.clipPoints.p0, this.tempPoint, this.centerPointBottom, this.maskAngle), this.tempPoint.x = this.centerPointBottom.x - 2 * this.w, this.tempPoint.y = this.centerPointBottom.y, i.rotateClipPoint(this.clipPoints.p1, this.tempPoint, this.centerPointBottom, this.maskAngle), this.tempPoint.x = this.centerPointBottom.x - 2 * this.w, this.tempPoint.y = this.centerPointBottom.y + 2 * this.h, i.rotateClipPoint(this.clipPoints.p2, this.tempPoint, this.centerPointBottom, this.maskAngle), this.tempPoint.x = this.centerPointBottom.x + 2 * this.w, this.tempPoint.y = this.centerPointBottom.y + 2 * this.h, i.rotateClipPoint(this.clipPoints.p3, this.tempPoint, this.centerPointBottom, this.maskAngle)
            }
        },
        setupAutoFlipTarget: function() {
            switch (this.detectedSide.label) {
                case "r":
                    this.autoFlipTarget.x = this.corners.tl.x - (this.detectedSide.x - this.corners.tl.x), this.autoFlipTarget.y = this.detectedSide.y;
                    break;
                case "l":
                    this.autoFlipTarget.x = this.corners.tr.x + (this.corners.tr.x - this.detectedSide.x), this.autoFlipTarget.y = this.detectedSide.y;
                    break;
                case "b":
                case "br":
                case "bl":
                    this.autoFlipTarget.x = this.detectedSide.x, this.autoFlipTarget.y = this.corners.tl.y - (this.detectedSide.y - this.corners.tl.y);
                    break;
                case "t":
                case "tr":
                case "tl":
                    this.autoFlipTarget.x = this.detectedSide.x, this.autoFlipTarget.y = this.corners.bl.y + (this.corners.bl.y - this.detectedSide.y)
            }
        },
        getAutoFlipComputation: function() {
            var t = 0,
                i = 0;
            switch (this.detectedSide.label) {
                case "l":
                case "r":
                    t = this.autoFlipTarget.x - this.originPoint.x, 0 !== Math.abs(t) && (i = (this.referencePoint.x - this.autoFlipTarget.x) / t);
                    break;
                case "t":
                case "b":
                case "tr":
                case "br":
                case "tl":
                case "bl":
                    t = this.autoFlipTarget.y - this.originPoint.y, 0 !== Math.abs(t) && (i = (this.referencePoint.y - this.autoFlipTarget.y) / t)
            }
            return i
        },
        forceFlip: function(t) {
            if (!this.isForceFlip) {
                switch (this.isForceFlip = !0, this.isDirty = !0, this.isOpen = !0, this.isInteractable = !1, t) {
                    case "l":
                        this.detectedSide.label = "r", this.referencePoint.x = this.detectedSide.x = this.originPoint.x = this.position.x + this.w, this.referencePoint.y = this.detectedSide.y = this.originPoint.y = this.position.y + this.h / 2, this.targetPoint.x = this.position.x - this.w, this.targetPoint.y = this.position.y + this.h / 2;
                        break;
                    case "r":
                        this.detectedSide.label = "l", this.referencePoint.x = this.detectedSide.x = this.originPoint.x = this.position.x, this.referencePoint.y = this.detectedSide.y = this.originPoint.y = this.position.y + this.h / 2, this.targetPoint.x = this.position.x + 2 * this.w, this.targetPoint.y = this.position.y + this.h / 2;
                        break;
                    case "t":
                        this.detectedSide.label = "b", this.referencePoint.x = this.detectedSide.x = this.originPoint.x = this.position.x + this.w / 2, this.referencePoint.y = this.detectedSide.y = this.originPoint.y = this.position.y + this.h, this.targetPoint.x = this.position.x + this.w / 2, this.targetPoint.y = this.position.y - this.h;
                        break;
                    case "b":
                        this.detectedSide.label = "t", this.referencePoint.x = this.detectedSide.x = this.originPoint.x = this.position.x + this.w / 2, this.referencePoint.y = this.detectedSide.y = this.originPoint.y = this.position.y, this.targetPoint.x = this.position.x + this.w / 2, this.targetPoint.y = this.position.y + 2 * this.h
                }
                this.calculateConstraints(), this.setupTempTarget()
            }
        },
        setupTempTarget: function() {
            switch (this.tempFlag = !0, this.detectedSide.label) {
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
                    this.tempTargetY = -(this.corners.bl.y - this.detectedSide.y)
            }
        },
        autoFlip: function() {
            var t = this.getAutoFlipComputation();
            this.targetPoint.x = this.originPoint.x, this.targetPoint.y = this.originPoint.y, Math.abs(t) <= .5 && this.isDirty && (this.tempFlag || this.setupTempTarget(), this.isOpen = !0, this.isInteractable = !1, this.targetPoint.x = this.autoFlipTarget.x, this.targetPoint.y = this.autoFlipTarget.y)
        },
        updatePosition: function() {
            if (this.isOpen) {
                var t = this.img.front;
                this.isPositionMoving = !0, this.img.front = this.img.back, this.img.back = t, this.isFront = !this.isFront, this.oldPosition.x = this.position.x, this.oldPosition.y = this.position.y
            }
        },
        updateRelatives: function() {
            this.corners.tl.x = this.position.x, this.corners.tl.y = this.position.y, this.corners.bl.x = this.position.x, this.corners.bl.y = this.position.y + this.h, this.corners.tr.x = this.position.x + this.w, this.corners.tr.y = this.position.y, this.corners.br.x = this.position.x + this.w, this.corners.br.y = this.position.y + this.h, this.center.x = this.position.x + this.w / 2, this.center.y = this.position.y + this.h / 2, this.bound.min.x = this.corners.tl.x, this.bound.min.y = this.corners.tl.y, this.bound.max.x = this.corners.br.x, this.bound.max.y = this.corners.br.y
        },
        changeOrientation: function(t) {
            switch (t) {
                case "portrait":
                    this.isPortrait = !0, this.recalculateCard();
                    break;
                case "landscape":
                    this.isPortrait = !1, this.recalculateCard()
            }
        },
        toggleOrientation: function() {
            this.isPortrait = !this.isPortrait, this.recalculateCard()
        },
        resetTouchInteraction: function() {
            this.pointerCount = 0, this.startTime = 0, this.endTime = 0, this.timeDiff = 0, this.isMaxTouchCount = !1, this.touch1Enabled = !1, this.touch2Enabled = !1
        },
        checkInteraction: function() {
            var t = !1,
                i = this,
                e = i.context.pointers,
                s = i.context.pointersDown,
                n = i.context.boundingRect;
            if (!i.context.mouse.isDown) return i.resetTouchInteraction(), !1;
            if (1 === e.length && i.isMaxTouchCount) return !1;
            if (1 !== e.length || i.touch1Enabled ? 2 !== e.length || i.touch2Enabled || (i.touch2Enabled = !0, i.pointerCount = 2, i.endTime = (new Date).getTime(), i.timeDiff = i.touch1Enabled ? i.endTime - i.startTime : 0) : (i.touch1Enabled = !0, i.pointerCount = 1, i.startTime = (new Date).getTime()), 1 === e.length && !i.isMaxTouchCount && i.touch1Enabled) t = i.context.mouse.isDown && i.isInsideBound(i.context.mouse.down) && i.isInteractable && !i.isFront;
            else if (2 === e.length && i.touch2Enabled) {
                if (i.isMaxTouchCount = !0, s.length < 2) return !1;
                t = i.context.mouse.isDown && i.isInsideBound(i.context.mouse.down) && i.isInsideBound({
                    x: s[0].clientX - n.left,
                    y: s[0].clientY - n.top
                }) && i.isInsideBound({
                    x: s[1].clientX - n.left,
                    y: s[1].clientY - n.top
                }) && i.isInteractable && i.timeDiff < 100
            }
            return t
        },
        update: function() {
            var t = this.getAutoFlipComputation();
            if (this.updateHook && "function" == typeof this.updateHook && this.updateHook(), this.checkInteraction() ? (this.isMouseDown || (this.onUpFlag = !1, t = 0, this.cardSpeed = i.cardSpeed, this.isMouseDown = !0, this.isDirty = !0, this.isOpen = !1, this.detectSide(), this.setupAutoFlipTarget(), this.calculateConstraints(), this.onPointerDown && "function" == typeof this.onPointerDown && (this.eventDetail.flags.isPointerDown = !0, this.eventDetail.pointer.x = this.context.mouse.down.x, this.eventDetail.pointer.y = this.context.mouse.down.y, this.onPointerDown(this))), this.targetPoint.x = this.context.mouse.position.x, this.targetPoint.y = this.context.mouse.position.y, Math.abs(t) <= .5 && 0 !== Math.abs(t) && (this.context.mouse.isDown = !1, this.isHalfShow = !0, this.onHalfShown && "function" == typeof this.onHalfShown && this.onHalfShown(this)), this.eventDetail.flags.isPointerDown && (this.eventDetail.pointer.x === this.context.mouse.position.x && this.eventDetail.pointer.y === this.context.mouse.position.y || (this.eventDetail.pointer.x = this.context.mouse.position.x, this.eventDetail.pointer.y = this.context.mouse.position.y, this.onPointerMove && "function" == typeof this.onPointerMove && this.onPointerMove(this)))) : (this.isMouseDown = !1, this.onUpFlag || (this.onUpFlag = !0), this.isForceFlip || this.autoFlip(), this.eventDetail.flags.isPointerDown && (this.eventDetail.flags.isPointerDown = !1, this.onPointerUp && "function" == typeof this.onPointerUp && this.onPointerUp(this))), this.tempX += .2 * (this.tempTargetX - this.tempX), this.tempY += .2 * (this.tempTargetY - this.tempY), this.isDirty) {
                if (this.isForceFlip) this.referencePoint.x += (this.targetPoint.x - this.referencePoint.x) * this.cardForceFlipSpeed, this.referencePoint.y += (this.targetPoint.y - this.referencePoint.y) * this.cardForceFlipSpeed;
                else if (this.onUpFlag && !this.isHalfShow) switch (this.detectedSide.label) {
                    case "r":
                    case "l":
                        this.referencePoint.x += .1 * (this.targetPoint.x - this.referencePoint.x), this.referencePoint.y += .2 * (this.originPoint.y - this.referencePoint.y);
                        break;
                    case "b":
                    case "br":
                    case "bl":
                    case "t":
                    case "tr":
                    case "tl":
                        this.referencePoint.x += .2 * (this.originPoint.x - this.referencePoint.x), this.referencePoint.y += .1 * (this.targetPoint.y - this.referencePoint.y)
                } else this.isHalfShow ? (this.referencePoint.x += .5 * (this.targetPoint.x - this.referencePoint.x), this.referencePoint.y += .5 * (this.targetPoint.y - this.referencePoint.y)) : (this.referencePoint.x += (this.targetPoint.x - this.referencePoint.x) * this.cardSpeed, this.referencePoint.y += (this.targetPoint.y - this.referencePoint.y) * this.cardSpeed);
                this.applyConstraints(), this.calculateCardMaskAngle(), this.calculateCenterPoint(), this.calculateCenterPointBottom(), this.setupClippingPoints(), i.getDistance(this.targetPoint, this.referencePoint) < 2 && !this.isMouseDown && (this.isHalfShow = !1, this.isDirty = !1, this.tempFlag = !1, this.isForceFlip = !1, this.isInteractable = !0, this.tempX = 0, this.tempY = 0, this.tempTargetX = 0, this.tempTargetY = 0, this.updatePosition(), this.onFlipEnd && "function" == typeof this.onFlipEnd && this.onFlipEnd(this))
            }
        },
        renderShadow: function(t) {
            var e = this.maskAngle,
                s = null,
                n = null,
                o = null,
                h = null,
                r = null,
                a = null,
                c = null;
            switch (this.isPortrait ? (h = 2 * this.h, r = 2 * this.h) : (h = 2 * this.baseHeight, r = 2 * this.baseHeight), this.detectedSide.label) {
                case "t":
                case "tl":
                case "tr":
                case "b":
                case "bl":
                case "br":
                    -1 !== ["t", "tl", "tr"].indexOf(this.detectedSide.label) && (t.scale(1, -1), e *= -1), s = (this.detectedSide.x - this.position.x) / this.w, o = this.shadow.w * s, a = i.getDistance(this.referencePoint, this.centerPoint), (c = this.shadow.ctx.createLinearGradient(0, 0, 0, a + .6 * a)).addColorStop(0, "rgba(255, 255, 255, 0.001)"), c.addColorStop(.5, "rgba(0, 0, 0, 0.15)"), c.addColorStop(1, "rgba(255, 255, 255, 0.001)"), t.save(), this.isPortrait || (-1 !== ["t", "tl", "tr"].indexOf(this.detectedSide.label) ? t.rotate(Math.PI / 2) : t.rotate(-Math.PI / 2)), this.shadow.ctx.clearRect(0, 0, this.shadow.w, this.shadow.h), this.shadow.ctx.save(), this.shadow.ctx.translate(o, 0), this.shadow.ctx.rotate(.98 * -e), this.shadow.ctx.fillStyle = c, this.shadow.ctx.fillRect(-o - r / 2, 0, this.shadow.w + r, a), this.shadow.ctx.restore(), t.drawImage(this.shadow.canvas, -this.w * ((this.detectedSide.x - this.position.x) / this.w), 0, this.w, this.h), t.restore();
                    break;
                case "l":
                case "r":
                    "l" === this.detectedSide.label && (e *= -1, t.scale(-1, 1)), this.isPortrait, s = (this.detectedSide.y - this.position.y) / this.h, n = this.h * s, a = i.getDistance(this.referencePoint, this.centerPoint), (c = (this.isPortrait, this.shadow.ctx.createLinearGradient(0, 0, a + .6 * a, 0))).addColorStop(0, "rgba(255, 255, 255, 0.001)"), c.addColorStop(.5, "rgba(0, 0, 0, 0.15)"), c.addColorStop(1, "rgba(255, 255, 255, 0.001)"), this.shadow.ctx.clearRect(0, 0, this.shadow.w, this.shadow.h), this.shadow.ctx.save(), this.shadow.ctx.fillStyle = c, this.isPortrait ? (this.shadow.ctx.translate(0, n), this.shadow.ctx.rotate(.98 * -e), this.shadow.ctx.fillRect(0, -n - h / 2, a, this.h + h), this.shadow.ctx.restore(), t.drawImage(this.shadow.canvas, 0, -this.h * ((this.detectedSide.y - this.position.y) / this.h))) : (t.save(), "l" === this.detectedSide.label ? t.rotate(Math.PI / 2) : t.rotate(-Math.PI / 2), this.shadow.ctx.translate(0, n), this.shadow.ctx.rotate(.98 * -e), this.shadow.ctx.fillRect(0, -n - h / 2, a, this.h + h), this.shadow.ctx.restore(), t.drawImage(this.shadow.canvas, 0, -this.h * ((this.detectedSide.y - this.position.y) / this.h)), t.restore())
            }
        },
        recalculateCard: function() {
            var t = this.w;
            this.w = this.h, this.h = t, this.shadow.canvas.width = this.w, this.shadow.canvas.height = this.h, this.shadow.w = this.w, this.shadow.h = this.h, this.position = new e(this.initialPos.x, this.initialPos.y), this.position.x -= this.w / 2, this.position.y -= this.h / 2, this.bound = new s(new e(this.position.x, this.position.y), new e(this.position.x + this.w, this.position.y + this.h)), this.corners = {
                tl: new n(30, this.position.x, this.position.y),
                bl: new n(30, this.position.x, this.position.y + this.h),
                tr: new n(30, this.position.x + this.w, this.position.y),
                br: new n(30, this.position.x + this.w, this.position.y + this.h)
            }, this.isPortrait ? this.targetRotation = 0 : this.targetRotation = Math.PI / 2
        },
        drawBackImage: function(t) {
            t.save(), t.translate(this.position.x + this.w / 2, this.position.y + this.h / 2), t.rotate(this.rotation), this.rotation += .2 * (this.targetRotation - this.rotation), t.drawImage(this.img.back, -this.baseWidth / 2, -this.baseHeight / 2, this.baseWidth, this.baseHeight), t.restore()
        },
        renderCard: function(t) {
            if (this.isDirty || this.drawBackImage(t), this.isDirty) {
                switch (t.save(), i.drawClipPoints(t, this.clipPoints, i.isDebug), this.drawBackImage(t), t.restore(), t.save(), i.drawClipPoints(t, this.clipPoints, i.isDebug), t.save(), t.translate(this.referencePoint.x, this.referencePoint.y), this.isPortrait ? t.rotate(this.cardAngle) : t.rotate(this.cardAngle + Math.PI / 2), this.detectedSide.label) {
                    case "r":
                        this.isPortrait ? t.drawImage(this.img.front, 0, -this.h * ((this.detectedSide.y - this.position.y) / this.h), this.w, this.h) : t.drawImage(this.img.front, -this.baseHeight * ((this.detectedSide.y - this.position.y) / this.baseHeight), -this.baseHeight, this.baseWidth, this.baseHeight);
                        break;
                    case "l":
                        this.isPortrait ? t.drawImage(this.img.front, -this.w, -this.h * ((this.detectedSide.y - this.position.y) / this.h), this.w, this.h) : t.drawImage(this.img.front, -this.baseHeight * ((this.detectedSide.y - this.position.y) / this.baseHeight), 0, this.baseWidth, this.baseHeight);
                        break;
                    case "b":
                    case "br":
                    case "bl":
                        this.isPortrait ? t.drawImage(this.img.front, -this.w * ((this.detectedSide.x - this.position.x) / this.w), 0, this.w, this.h) : t.drawImage(this.img.front, 0, -this.baseHeight + this.baseHeight * ((this.detectedSide.x - this.position.x) / this.baseHeight), this.baseWidth, this.baseHeight);
                        break;
                    case "t":
                    case "tl":
                    case "tr":
                        this.isPortrait ? t.drawImage(this.img.front, -this.w * ((this.detectedSide.x - this.position.x) / this.w), -this.h, this.w, this.h) : t.drawImage(this.img.front, -this.baseWidth, -this.baseHeight + this.baseHeight * ((this.detectedSide.x - this.position.x) / this.baseHeight), this.baseWidth, this.baseHeight)
                }
                this.renderShadow(t), t.restore(), t.restore()
            }
        },
        render: function(t) {
            this.renderCard(t), i.isDebug && (i.drawLine(t, "black", this.bound.min, this.bound.max), i.drawCircle(t, "black", this.corners.tl.r, this.corners.tl), i.drawCircle(t, "black", this.corners.bl.r, this.corners.bl), i.drawCircle(t, "black", this.corners.tr.r, this.corners.tr), i.drawCircle(t, "black", this.corners.br.r, this.corners.br), i.drawCircle(t, "black", 10, this.center), i.drawCircle(t, "pink", 20, this.position), i.drawCircle(t, "purple", 50, this.initialPos), this.isDirty && (i.drawLine(t, "black", this.originPoint, this.referencePoint), i.drawLine(t, "black", this.centerPoint, this.centerPointBottom), i.drawLine(t, "green", this.autoFlipTarget, this.detectedSide), i.drawCircle(t, "black", this.constraint1.r, this.constraint1), i.drawCircle(t, "black", this.constraint2.r, this.constraint2), i.drawCircle(t, "orange", 10, this.originPoint), i.drawCircle(t, "blue", 5, this.referencePoint), i.drawCircle(t, "blue", 5, this.centerPoint), i.drawCircle(t, "blue", 5, this.centerPointBottom), i.drawCircle(t, "blue", 5, this.autoFlipTarget), i.drawCircle(t, "red", 5, this.targetPoint)), i.drawText(t, "orange", "width: " + this.context.c.width(), 5, 10), i.drawText(t, "orange", "height: " + this.context.c.height(), 5, 25), i.drawText(t, "orange", "orientation: " + i.orientation, 5, 40), i.drawText(t, "orange", "timeDiff: " + this.timeDiff, 5, 55), i.drawText(t, "orange", "pointerCount: " + this.pointerCount, 5, 65), i.drawText(t, "orange", "mouse.isDown: " + this.context.mouse.isDown, 5, 75)), this.context.ctx.save(), this.context.ctx.translate(this.context.w / 2, this.context.h / 2), this.context.ctx.drawImage(this.context.tempEl, this.tempX - this.context.w / 2, this.tempY - this.context.h / 2), this.context.ctx.restore(), i.isDebugTouch && i.drawTouchPoints(this.context.ctx, this.context.pointers, this.context.touchCenter, this.context.touchRotation, this.context.boundingRect)
        }
    }, t.Card = h
}),
function(t) {
    "use strict";
    window.FPF = window.FPF || {}, t(window.FPF, window.FPF.Mouse, window.FPF.G)
}(function(t, i, e) {
    "use strict";

    function s(t, e, s) {
        this.el = document.createElement("canvas"), this.ctx = this.el.getContext("2d"), this.c = t, this.w = e, this.h = s, this.cards = null, this.mouse = new i, this.boundingRect = null, this.el.width = e, this.el.height = s, this.animId = null, this.tempEl = document.createElement("canvas"), this.tempCtx = this.tempEl.getContext("2d"), this.tempEl.width = e, this.tempEl.height = 2 * s, this.pointers = [], this.pointersDown = [], this.touchCenter = null, this.touchRotation = 0, this.tapTest = !1
    }
    s.prototype = {
        constructor: s,
        update: null,
        onPanStart: null,
        onPanEnd: null,
        onPanMove: null,
        clear: function() {
            this.tempCtx.clearRect(0, 0, this.w, 2 * this.h), this.ctx.clearRect(0, 0, this.w, this.h)
        },
        stopAnimation: function() {
            null !== this.animId && cancelAnimationFrame(this.animId)
        },
        startAnimation: function() {
            var t, i, e = Date.now(),
                s = this;
            s.stopAnimation(), s.animId = requestAnimationFrame(function n() {
                if (s.animId = requestAnimationFrame(n), t = Date.now(), (i = t - e) > 1e3 / 30) {
                    s.clear(), s.update && "function" == typeof s.update && s.update();
                    for (var o = 0, h = s.cards.length; o < h; o++) s.cards[o].update(), s.cards[o].render(s.tempCtx);
                    e = t - i % (1e3 / 30)
                }
            })
        },
        show: function() {
            this.el.style.visibility = "visible", this.startAnimation()
        },
        hide: function() {
            this.el.style.visibility = "hidden", this.stopAnimation()
        },
        cardCanvasClickHandler: function(t) {
            if (e.enableClickToggleOrientation)
                if (t.tapTest) t.tapTest = !1;
                else
                    for (var i = 0, s = t.cards.length; i < s; i++) t.cards[i].toggleOrientation()
        },
        resizeUpdate: function() {
            var t = this;
            t.boundingRect = t.el.getBoundingClientRect(), t.boundingRect = t.el.getBoundingClientRect();
            for (var i = 0, e = t.cards.length; i < e; i++) t.cards[i].reculateResizing()
        },
        getTouchPos: function(t, i) {
            var e = t.getBoundingClientRect();
            return {
                x: i.touches[0].clientX - e.left,
                y: i.touches[0].clientY - e.top
            }
        },
        init: function(t, i) {
            this.cards = t, "function" == typeof i && (this.update = i), this.c.append(this.el);
            var e = this;
            if (e.boundingRect = e.el.getBoundingClientRect(), e.tapTest = !1, e.el.addEventListener("click", function(t) {
                    e.cardCanvasClickHandler(e)
                }), isMobile.tablet || isMobile.phone) e.el.addEventListener("touchstart", function(t) {
                var i = t.changedTouches[0];
                e.boundingRect = e.el.getBoundingClientRect(), e.pointers = [0], e.touchCenter = {
                    x: i.clientX,
                    y: i.clientY
                }, e.touchRotation = 0, e.pointersDown = [0], e.mouse.position.x = e.mouse.down.x = i.clientX - e.boundingRect.left, e.mouse.position.y = e.mouse.down.y = i.clientY - e.boundingRect.top, e.mouse.isDown = !0, e.onPanStart && "function" == typeof e.onPanStart && e.onPanStart(e, t);
                var s = t.touches[0],
                    n = new MouseEvent("mousedown", {
                        clientX: s.clientX,
                        clientY: s.clientY
                    });
                e.el.dispatchEvent(n)
            }, !1), e.el.addEventListener("touchend", function(t) {
                var i = t.changedTouches[0];
                e.boundingRect = e.el.getBoundingClientRect(), e.pointers = [0], e.touchCenter = {
                    x: i.clientX,
                    y: i.clientY
                }, e.touchRotation = 0, e.pointersDown = [0], e.mouse.position.x = e.mouse.down.x = i.clientX - e.boundingRect.left, e.mouse.position.y = e.mouse.down.y = i.clientY - e.boundingRect.top, e.mouse.isDown = !1, e.onPanEnd && "function" == typeof e.onPanEnd && e.onPanEnd(e, t), isMobile.tablet || isMobile.phone || (e.tapTest = !0);
                var s = new MouseEvent("mouseup", {});
                e.el.dispatchEvent(s)
            }, !1), e.el.addEventListener("touchmove", function(t) {
                var i = t.touches[0];
                e.mouse.position.x = i.clientX - e.boundingRect.left, e.mouse.position.y = i.clientY - e.boundingRect.top, e.onPanMove && "function" == typeof e.onPanMove && e.onPanMove(e, t);
                var s = new MouseEvent("mousemove", {
                    clientX: i.clientX,
                    clientY: i.clientY
                });
                e.el.dispatchEvent(s)
            }, !1);
            else {
                var s = new Hammer.Manager(e.el);
                s.add(new Hammer.Pan({
                    threshold: 0,
                    pointers: 0
                })), s.on("panmove panstart panend", function(t) {
                    switch (e.boundingRect = e.el.getBoundingClientRect(), e.pointers = t.pointers, e.touchCenter = t.center, e.touchRotation = t.rotation, t.type) {
                        case "panstart":
                            e.pointersDown = t.pointers, e.mouse.position.x = e.mouse.down.x = t.center.x - e.boundingRect.left, e.mouse.position.y = e.mouse.down.y = t.center.y - e.boundingRect.top, e.mouse.isDown = !0, e.onPanStart && "function" == typeof e.onPanStart && e.onPanStart(e, t);
                            break;
                        case "panend":
                            e.pointersDown = t.pointers, e.mouse.position.x = e.mouse.up.x = t.center.x - e.boundingRect.left, e.mouse.position.y = e.mouse.up.y = t.center.y - e.boundingRect.top, e.mouse.isDown = !1, e.onPanEnd && "function" == typeof e.onPanEnd && e.onPanEnd(e, t), isMobile.tablet || isMobile.phone || (e.tapTest = !0);
                            break;
                        case "panmove":
                            e.mouse.position.x = t.center.x - e.boundingRect.left, e.mouse.position.y = t.center.y - e.boundingRect.top, e.onPanMove && "function" == typeof e.onPanMove && e.onPanMove(e, t)
                    }
                })
            }
            e.startAnimation()
        }
    }, t.Stage = s
});