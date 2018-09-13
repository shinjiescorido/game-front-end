
;(function(main) {
    main(window, window.document, $, FPF);
})(function(window, document, $, FPF, undefined) {

    "use strict";

    var $FPFWrapper = $("#flippify__wrapper"),
        stage = new FPF.Stage(
            $FPFWrapper,
            window.innerWidth,
            window.innerHeight
        ),
        cards = [];

    var card = new FPF.Card(
        stage,
        "img/sample-cards/101.png",
        "img/sample-cards/000.png",
        new FPF.Point(window.innerWidth / 2, window.innerHeight / 2),
        204,
        274
    );

    cards.push(card);

    stage.init(cards);

    $(window).on("resize", function() {
        stage.resizeUpdate();
    });


});
