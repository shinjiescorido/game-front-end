
;var POKER = POKER || {};

(function() {

	"use strict";

    POKER.appLoaded = new BLU.Observer();

	window.addEventListener("load", function() {
        POKER.app = new BLU.App({
            resources: "/res.json",
			canvas: "c",
			tickEnabled: true,
			poker: null,
            txtFPS: null,
            FPSEnabled: true,
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
            spotLightCanvasCtx: null,
            init: function() {
                createjs.Ticker.framerate = 30;
                this.txtFPS = new createjs.Text("", "20px lato-regular", "#fff");
                this.txtFPS.textAlign = "center";
            },
            loop: function() {
                if(this.FPSEnabled) {
                    this.txtFPS.text = "FPS: " + Math.round(createjs.Ticker.getMeasuredFPS());
                }
            },
			main: function() {
                var self = this;
                $("#c").show();

                var logo = new createjs.Bitmap(this.getResources("img-logo"));

                logo.alpha = 0;
                logo.regX = logo.getBounds().width / 2;
                logo.regY = logo.getBounds().height / 2

                logo.scaleX = logo.scaleY = 0.5;
                logo.x = this.stage.baseWidth / 2;
                logo.y = this.stage.baseHeight / 2;

                this.stage.addChild(logo);

                //createjs.Tween.get(logo)
                //    .to({alpha: 1}, 3000, createjs.Ease.quintInOut)
                //    .to({alpha: 0}, 3000, createjs.Ease.quintInOut)
                //    .call(
                //
                //        function() {

                            this.txtFPS.x  = this.stage.baseWidth / 2;
                            this.txtFPS.y = 10;
                            if(this.FPSEnabled) {
                                //this.stage.addChild(this.txtFPS);
                            }

                            var scaleValue = 1;

                            this.stage.enableMouseOver(10);

                            this.register("game", POKER.screens.game);
                            this.load("game");

                            //UI OVERLAY RESIZER
                            $(window).on("resize", function() {

                                $(".dom-ui-container").css({
                                    width: this.stage.canvas.width,
                                    height: this.stage.canvas.height
                                });

                                scaleValue = this.stage.canvas.width / this.stage.baseWidth;

                                $(".dom-resizable").css({
                                    //transform: "scale(" + (scaleValue + 0.4) + ")"
                                    transform: "scale(" + (scaleValue) + ")"
                                });

                            }.bind(this));

                            $(window).trigger("resize");

                            this.setTutorial();

                    //    }.bind(this)//END OF CALLBACK
                    //);//END OF CALL

                this.poker = new CORE.Poker();
                this.poker.connectSocket();

                this.poker.socket.on('swiped_card', function(data){
                    data = this.poker.decrypt(data, true);

                    this.poker.cardsToBeAdded[data.for].push(data.card);
                }.bind(this))


                POKER.appLoaded.emit("loaded", this);
			},//END OF MAIN FUNCTION
            setTutorial: function () {
                 var spotLightCanvas = document.getElementById("spot-light");
                var spotLightCanvasCtx = spotLightCanvas.getContext("2d");
                //TUTORIAL
                var spotLight = this.spotLight;
                var rafID = null;

                spotLight.x = spotLight.tx = spotLightCanvas.width / 2;
                spotLight.y = spotLight.ty = spotLightCanvas.height / 2;

                rafID = requestAnimationFrame(function frame() {

                    rafID = requestAnimationFrame(frame);

                    spotLight.x += (spotLight.tx - spotLight.x) * 0.1;
                    spotLight.y += (spotLight.ty - spotLight.y) * 0.1;
                    spotLight.r += (spotLight.tr - spotLight.r) * 0.1;
                    if(isNaN(spotLight.r)) {
                        spotLight.r = 0;
                    }

                    spotLightCanvasCtx.globalCompositeOperation = "source-over";
                    spotLightCanvasCtx.clearRect(0, 0, spotLightCanvas.width, spotLightCanvas.height);
                    spotLightCanvasCtx.fillStyle = "rgba(0, 0, 0, 0.9)";
                    spotLightCanvasCtx.fillRect(0, 0,  spotLightCanvas.width, spotLightCanvas.height);

                    spotLightCanvasCtx.globalCompositeOperation = "xor";
                    spotLightCanvasCtx.fillStyle = "rgba(200, 200, 200, 1)";
                    spotLightCanvasCtx.beginPath();
                    spotLightCanvasCtx.arc(spotLight.x, spotLight.y, spotLight.r, 0, Math.PI * 2);
                    spotLightCanvasCtx.fill();

                });

                var self = this;
                var isTutorialStarted = false;

                this.spotLightCanvasCtx = spotLightCanvasCtx;

                function click_ev() {

                    var $this = $(this);
                    var cmd = $this.data("cmd");
                    var x = $this.data("x-coordinate");
                    var y = $this.data("y-coordinate");
                    var scaleX = $this.data("scale-x") || 1;
                    var scaleY = $this.data("scale-y") || 1;
                    var radius = $this.data("radius");

                    spotLightCanvasCtx.scale( scaleX, scaleY );

                    spotLight.tx = x;
                    spotLight.ty = y;
                    spotLight.tr = radius;

                    if($this.closest(".poker-step-wrapper").hasClass("poker-tutorial-welcome")) {
                        if($this.data("cmd") !== "skip") {
                            $this.closest(".poker-step-wrapper").hide();
                            isTutorialStarted = true;
                        }
                    } else {
                        $this.closest(".poker-step-wrapper").hide();
                    }

                    if(cmd && cmd !== "skip") {
                        $(cmd).fadeIn(1000);
                    } else {
                        POKER.components.settings.shownTut = false;
                        POKER.components.settings.setTutorial(POKER.components.settings.shownTut)
                        cancelAnimationFrame(rafID);
                        if(!isTutorialStarted) {

                            $this.closest(".poker-tutorial").delay(500).fadeOut();

                            setTimeout(function() {
                                //POKER.components.betChip.startChipsIntroAnimation();
                            }, 600);

                            TweenMax.to(
                                $(".poker-tutorial-welcome"),
                                0.3,
                                {
                                    rotationX: 45,
                                    opacity: 0,
                                    top: "5%",
                                    z: -600,
                                    ease: Back.easeIn
                                }
                            );

                        } else {
                            $this.closest(".poker-tutorial").fadeOut();
                            //POKER.components.betChip.startChipsIntroAnimation();
                        }
                    }

                }

                $(".poker-tutorial").unbind("click");

                $(".poker-tutorial").on("click", ".poker-tutorial-btn", click_ev);

                window.version = function detectIE() { /**start of check if ie**/
                    var ua = window.navigator.userAgent;

                    // Test values; Uncomment to check result …

                    // IE 10
                    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

                    // IE 11
                    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

                    // Edge 12 (Spartan)
                    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

                    // Edge 13
                    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

                    var msie = ua.indexOf('MSIE ');
                    if (msie > 0) {
                    // IE 10 or older => return version number
                    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
                    }

                    var trident = ua.indexOf('Trident/');
                    if (trident > 0) {
                    // IE 11 => return version number
                    var rv = ua.indexOf('rv:');
                    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
                    }

                    var edge = ua.indexOf('Edge/');
                    if (edge > 0) {
                    // Edge (IE 12+) => return version number
                    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
                    }

                    // other browser
                    return false;
                } /**end of check if ie**/

            }
		}).run();
	});

})();
