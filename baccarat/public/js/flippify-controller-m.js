/**
 * Flippify controller v0.1
 * A simple flippify controller.
 */

var FPF_CONTROLLER = (function(window, document, $, FPF, undefined) {

    "use strict";

    var maskImg = new Image();
    maskImg.src = "images/number_mask.png";
    maskImg.addEventListener("load", function() {
        FPF.G.cardNumberMaskImg = this;
    });


    var istyle = 0;
    var back = "./images/cards/000.png";
    var controllerStage = $("<div></div>").addClass("fpf-controller-stage"),
        cardCanvasContainer = null,
        width = 0,
        height = 0,
        cardWidth = 200,
        cardHeight = 270,
        stage = null,
        cardYOffset = -10,
        card = null;

    if(!isMobile.phone && !isMobile.tablet) {
        cardWidth *=  1;
        cardHeight *= 1;
    }
    else {
        cardWidth *= 1;
        cardHeight *= 1;
    }

    function doFlip(img) {
        card.setFrontImage(img);
        stage.show();
        cardCanvasContainer.show();
        TweenMax.fromTo($(stage.el).closest(".fpf-overlay"), 1, {opacity: 0}, {opacity: 1});
        return card;
    }

    function doFlipClose() {
        card.clean();
        stage.hide();
        cardCanvasContainer.hide();
    }

    function reset() {
        card.clean();
      //  $('#game-overlay').hide();
    }//END OF RESET FUNCTION

    function orientationHandler() {
        if(!isMobile.phone && !isMobile.tablet) return;

        if(isMobile.apple.device) {
            if(device.portrait()) {
                card.changeOrientation("portrait");
            }
            else if(device.landscape()) {
                card.changeOrientation("landscape");
            }
        }
        else {
            switch(window.orientation) {
                case -90:
                case 90:
                    //LANDSCAPE
                    card.changeOrientation("landscape");
                    break;
                default:
                    //PORTRAIT
                    card.changeOrientation("portrait");
            }
        }
    }

    function init(canvasContainerSelector, isStyle,options) {

        istyle = isStyle;
        var settings = $.extend({}, options),
            canvasContainer = $(canvasContainerSelector);

        var xWidth = width = canvasContainer.width();
        var yHeight = height = canvasContainer.height();

        var xPos = canvasContainer.width() / 2;
        var yPos = canvasContainer.height() / 2 + cardYOffset;


        if(istyle){
            xPos = xPos + 50;
            cardWidth = cardWidth * 2;
            cardHeight = cardHeight * 2;
            //canvasContainer.css({'background-color':'red','opacity':'0.5'});
        }


        stage = new FPF.Stage(
            canvasContainer,
            canvasContainer.width(),
            canvasContainer.height()
            );

        card = new FPF.Card(
            stage,
            back,
            back,
            new FPF.Point(xPos, yPos),
            cardWidth,
            cardHeight
            );

        cardCanvasContainer = canvasContainer;
        stage.init([card]);
        doFlipClose();

        orientationHandler();
        card.reculateResizing();
        window.addEventListener("orientationchange", orientationHandler);


        //DEBUGGING
        //stage.show();
        //cardCanvasContainer.show();

    }//END OF INIT FUNCTION


    return {
        init: init,
        reset: reset,
        doFlip: doFlip,
        doFlipClose: doFlipClose,
    };

})(window, window.document, $, FPF);



var FPF_CONTROLLER2 = (function(window, document, $, FPF, undefined) {

    return {
        create: function() {

            var istyle = 0;
            var back = "./images/cards/000.png";
            var controllerStage = $("<div></div>").addClass("fpf-controller-stage"),
                cardCanvasContainer = null,
                width = 0,
                height = 0,
                cardWidth = 300,//340,
                cardHeight = 405,//459,
                stage = null,
                cardYOffset = 0,
                // cardYOffset = -30,
                card = null;

            if(!isMobile.phone && !isMobile.tablet) {
                cardWidth *=  1;
                cardHeight *= 1;
            }
            else {
                cardWidth *= 2;
                cardHeight *= 2;
            }

            function doFlip(img) {
                card.setFrontImage(img);
                stage.show();
                cardCanvasContainer.show();
                TweenMax.fromTo($(stage.el).closest(".fpf-overlay"), 1, {opacity: 0}, {opacity: 1});
                return card;
            }

            function doFlipClose() {
                card.clean();
                stage.hide();
                cardCanvasContainer.hide();
            }

            function reset() {
                card.clean();
            }//END OF RESET FUNCTION

            function orientationHandler() {
                if(!isMobile.phone && !isMobile.tablet) return;

                if(isMobile.apple.device) {
                    if(device.portrait()) {
                        card.changeOrientation("portrait");
                    }
                    else if(device.landscape()) {
                        card.changeOrientation("landscape");
                    }
                }
                else {
                    switch(window.orientation) {
                        case -90:
                        case 90:
                            //LANDSCAPE
                            card.changeOrientation("landscape");
                            break;
                        default:
                            //PORTRAIT
                            card.changeOrientation("portrait");
                    }
                }
            }

            function init(canvasContainerSelector, isStyle,options) {

                istyle = isStyle;
                var settings = $.extend({}, options),
                    canvasContainer = $(canvasContainerSelector);

                var scaleVal = parseFloat(document.getElementById("SUPER-CONTAINER").getAttribute('style').split(":")[1].split("(")[1].split(")")[0]);
                
                var xWidth = width = canvasContainer.width();
                var yHeight = height = canvasContainer.height();


                var xPos = canvasContainer.width() / 2;
                var yPos = canvasContainer.height() / 2 + cardYOffset;

                var adjustPosX = xPos * parseFloat(document.getElementById("SUPER-CONTAINER").getAttribute('style').split(":")[1].split("(")[1].split(")")[0]);
                var adjustPosY = yPos * parseFloat(document.getElementById("SUPER-CONTAINER").getAttribute('style').split(":")[1].split("(")[1].split(")")[0]);


                if(istyle){
                    xPos = xPos + 50;
                    cardWidth = cardWidth * 1;
                    cardHeight = cardHeight * 1;
                }


                stage = new FPF.Stage(
                    canvasContainer,
                    canvasContainer.width(),
                    canvasContainer.height()
                    );

                card = new FPF.Card(
                    stage,
                    back,
                    back,
                    new FPF.Point(xPos, yPos),
                    cardWidth,
                    cardHeight
                    );

                cardCanvasContainer = canvasContainer;
                stage.init([card]);
                doFlipClose();

                // orientationHandler();
                // card.reculateResizing();
                // window.addEventListener("orientationchange", orientationHandler);

            }//END OF INIT FUNCTION

            function getCard() {
                return card;
            }

            function getCanvas() {
                return cardCanvasContainer;
            }

            function getStage() {
                return stage;
            }

            return {
                init: init,
                reset: reset,
                doFlip: doFlip,
                doFlipClose: doFlipClose,
                getCard: getCard,
                getCanvas: getCanvas,
                getStage: getStage
            };

        }//END CREATE FUNCTION
    }//END OF RETURN

})(window, window.document, $, FPF);
