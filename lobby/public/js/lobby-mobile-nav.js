$.ajax({
    url: '/api/casino/amount',
    type: 'post',
    success: function(res){
        if( res.result == 'success' ){
            $('#casino-balance').html( res.amount.toLocaleString() );
        }
    }
});

function getMobileOperatingSystem() { // "Windows Phone", "Android", "iOS"
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

var mobile_device = getMobileOperatingSystem();

setTimeout(function () {
    $(".user-details").css({
        "display" : "inline-block"
    });
},2);

var audio = new Audio('/sound/snd/click.mp3');
var iFrame = $("#lobby-i")[0];

if(window.location.search == '') {
    var current_open = 'baccarat'; //setting default open
    if(mobile_device == 'iOS') {
        $("#lobby-i").on("load", function() {
          // $("#lobby-i").css({"top": "-38%"})
        });
    }
    iFrame.src = "http://bc.nihtan.com/BA-MO/www/PC_Studio.php";
} else {
    $(".modal-container").hide();
    var current_open = window.location.search.split("=")[1];
    if(current_open == 'settings') {
        // iFrame.src = "/usersettings/m";
    }  else if(current_open == 'baccarat'){
    if(mobile_device == 'iOS') {
        $("#lobby-i").on("load", function() {
        // $("#lobby-i").css({"top": "-38%"})
      });
    }
        iFrame.src = "http://bc.nihtan.com/BA-MO/www/PC_Studio.php";
  } else {
        iFrame.src = "http://"+window.location.host+"/"+current_open+"/m/lobby";
  }

  // $(".live-game."+current_open).removeClass("hidden-toggle");
  // $(".live-game."+current_open).addClass("open-toggle");
}

$("#"+current_open).addClass("active");

$(".setting").on("click", function() {
// $(".user-details").on("click", function() {
    audio.play();
    // iFrame.src = "/usersettings/m";
  
    $("#lobby-i").on("load", function() {
        $("#lobby-i").css({"top": "10px"})
    });

    // $(".header").css({
    //     'background' : '#2b2b2b',
    //     'border-bottom' : 'rgba(255,255,255,0.2) 1px solid'
    // });
    // $("ul.game-list").hide();
});

$("a").on("click", function(e){
    $("#lobby-i").on("load", function() {
        $("#lobby-i").css({"top": "10px"})
    });

    audio.play();
    e.preventDefault();

    if($(this).children().hasClass("bottom-menu")) { //check if bottom menu
        $(".header").css({ 'border-bottom' : '0'})
        $(".live-game").removeClass("active");
        
        // $(".game-list> li").removeClass("open-toggle");
        // $(".game-list> li").addClass("hidden-toggle");
        // $(".game-list> li").removeClass("active");
        // $(".game-list> li").addClass("not-active");

        $(".bottom-menu").addClass('not-active');
        $(".bottom-menu").removeClass('active');
        $(this).children().removeClass("not-active");
        $(this).children().addClass("active");

        var bot_men = $(this).children().attr("class").split(" ")[0];
        var color = "";
        var classToadd = "";
        if(bot_men == "dashboard") {
            $(".game-list").hide();
            $(".header").css({
                // "background" : "#000"
            });
            color = "#e65100" 
        } else if(bot_men == "livegames") {
            $(".game-list").show();
            $(".header").css({
                "background" : "#7b7b7b"
            });
            
            color = "#880e4f";
            classToadd = "live-games";
            $(".live-game").removeClass("active");
            $(".baccarat.live-game").addClass("active");
            // $(".baccarat.live-game").removeClass("not-active");
            // $(".baccarat.live-game").removeClass("hidden-toggle");
            // $(".baccarat.live-game").addClass("open-toggle");
        } else if(bot_men == "reelgames") {
            $(".game-list").hide();
            $(".header").css({
                // "background" : "#000"
            });
            color = "#1976d2"
            classToadd = "reel-games";
        } else if(bot_men == "themedgames") {
            $(".game-list").hide();
            $(".header").css({
                // "background" : "#000"
            });
            color = "#4a148c"
            classToadd = "themed-games";
        }   else if(bot_men == "studio") {
            $(".game-list").hide();
            color = "#00514f"
        }

        $(".footer").removeClass('themed-games');
        $(".footer").removeClass('reel-games');
        $(".footer").removeClass('live-games');
        $(".footer").addClass(classToadd);

        $(".footer").css({
            "background" : color
        });

    }

    $(".loading-div").show(); //show loading div
    $("#lobby-i").on("load", function() {
        $(".loading-div").hide();   //hide loading
    });

    if(window.isTestUser) {
      // $(".game-list li").removeClass('open-toggle');
      // $(".game-list li").addClass('hidden-toggle');
      $(".game-sub-menu").remove()
    }
    
    if($(e.currentTarget).children().hasClass("livegames")) { 

      iFrame.src = "http://bc.nihtan.com/BA-MO/www/PC_Studio.php";
      if(mobile_device == 'iOS') {
            $("#lobby-i").on("load", function() {
                // $("#lobby-i").css({"top":"-38%"});
            });
      }
      return;
    }
    iFrame.src = e.currentTarget.href;

    if(window.isTestUser) {
      // $(".game-list li").removeClass('open-toggle');
      // $(".game-list li").addClass('hidden-toggle');
      $(".game-sub-menu").remove()
    }
});

var game_click = false;

$(".game-list> li").on("click", function (e) {

    $(".loading-div").show(); //show loading div
    $("#lobby-i").on("load", function() {
        $("#lobby-i").css({"top": "10px"})
        $(".loading-div").hide();   //hide loading

    });
    audio.play();
    var clicked = $(this).attr("id");

    if(current_open == clicked) { //if same clicked or double clicked
        $(".loading-div").hide();
        if( $(e.target).parent().hasClass("sub-menu") || $(e.target).hasClass("sub-menu")) {

            $(".sub-menu").removeClass("active");
            $(e.target).parent().addClass("active");
            $(e.target).addClass("active");

            // $(this).addClass("open-toggle");
            // $(this).removeClass("hidden-toggle");
            game_click = false;
        } else if($(e.target).parent().hasClass("live-game")) {

            if(game_click) {
              $(".loading-div").hide();
            }

            if($(this).hasClass("open-toggle")) {
                if(!game_click) {
                    $(".sub-menu").removeClass("active");
                    if(current_open =='baccarat') {
                        iFrame.src = "http://bc.nihtan.com/BA-MO/www/PC_Studio.php";
                            if(mobile_device == 'iOS') {
                                alert(mobile_device);
                                $("#lobby-i").on("load", function() {
                                  // $("#lobby-i").css({"top": "-38%"})
                                });
                            }
                    } else {
                        iFrame.src = "http://"+window.location.host+"/"+current_open+"/m/lobby";
                    }
                    game_click = true;
                    return;
                }
            
                // $(this).removeClass("open-toggle");
                // $(this).addClass("hidden-toggle");
            } else if($(this).hasClass("hidden-toggle")) {
                // $(this).addClass("open-toggle");
                // $(this).removeClass("hidden-toggle");
            }

        }

        if(window.isTestUser) {
          // $(".game-list li").removeClass('open-toggle');
          // $(".game-list li").addClass('hidden-toggle');
          $(".game-sub-menu").remove()
        }

    } else { //else if not same click
        
        current_open = clicked;
        $(".loading-div").show(); //show loading div
        $("#lobby-i").on("load", function() {
            $(".loading-div").hide();   //hide loading
        });
        // $(".game-list> li").removeClass("open-toggle");
        // $(".game-list> li").addClass("hidden-toggle");
        $(".game-list> li").removeClass("active");   

        // $(this).addClass("open-toggle");
        // $(this).removeClass("hidden-toggle");
        $(this).addClass("active");
        if(current_open=='baccarat') {
            iFrame.src = "http://bc.nihtan.com/BA-MO/www/PC_Studio.php";
            if(mobile_device == 'iOS') {
              $("#lobby-i").on("load", function() {
                // $("#lobby-i").css({"top": "-38%"})
              });
            }
        } else {
            iFrame.src = "/"+current_open+"/m/lobby"
        }


        if(window.isTestUser) {
          // $(".game-list li").removeClass('open-toggle');
          // $(".game-list li").addClass('hidden-toggle');
          $(".game-sub-menu").remove()
        }
    }
});


$(".setting").on("click", function (argument) {
    if($(".header-popup").is(':visible')) $(".header-popup").hide();
    else $(".header-popup").show();

})