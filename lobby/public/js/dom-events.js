$(document).ready(function(){

  $('#livegames').click(function() {
    if(!all_tables.length) return;
    toggle("live_games");
    $(".viewstyle-con").removeClass("active")
    $(".viewstyle-con.viewstyle--thumb").addClass("active")
    $(this).addClass("active");
    $('#reelgames').removeClass("active")
    $('.sidebar').css({'width' : '231px'});
    $('.sidebar--lobby').hide();
    $('.sidebar--game, .header-subnav').css({'display': 'block'});
    currentOpen = "allgames"
    $(".header-subnav").show();
    $(".header-subnav.reelgames").hide();
  });

  $('#reelgames').click(function() {
    if(!parseInt(window.reel_yn)) return;
    if(!all_tables.length) return;
    toggle("reel_games");
    $(".banner-wrapper").hide();
    if(currentOpen) currentOpen = "reel_games";
    $(this).addClass("active");
    $('#livegames').removeClass("active")
    $('.header-subnav__items#gameall').addClass("active")
    $('.sidebar').css({'width' : '231px'});
    $('.sidebar--lobby').hide();
    $('.sidebar--game, .header-subnav').css({'display': 'block'});
    $(".header-subnav").hide();
    $(".header-subnav.reelgames").show();
    currentOpen = "gameall"
  });

  $('#lobby').click(function() {
    toggle("main");
    $('.header-subnav__items').removeClass("active")
    $('.header-subnav__items#allgames').addClass("active")
    $(this).next().children().removeClass("active");
    $('.sidebar--lobby').show();
    $('.sidebar').css({'width': '560px'});
    $('.sidebar--game, .header-subnav').css({'display': 'none'});
  });

  $('.game__con').click(function() {
    if(!all_tables.length) return;
    if($(this).attr("data")=="kagaming") {
      if(!parseInt(window.reel_yn)) return;
    }
    $('.sidebar').css({'width': '231px'});
  });
  $('.game__con.game--soon').click(function() {
    if($(this).attr("data")=="kagaming") {
      if(!parseInt(window.reel_yn)) return;
    }
    $('.sidebar').css({'width': '560px'});
  });
  $('.game__con.game--new').click(function() {
    if($(this).attr("data")=="kagaming") {
      if(!parseInt(window.reel_yn)) return;
    }
    $('.sidebar').css({'width': '231px'});
  });

  $('.viewstyle-con').click(function(e) {
    if(currentOpen && currentOpen.length) {
      if(currentOpen == "poker" || currentOpen == "sicbo" || currentOpen == "dragontiger") return;
    }

    e.preventDefault();
    var $items = $(this);
    $items.addClass('active').siblings().removeClass('active');
    toggle($(this).attr("data"))

  });

  $('.ico-lang').click(function(e) {
    e.preventDefault();
    var $items = $(this);
    $items.addClass('active').siblings().removeClass('active');
    // toggle($(this).attr("data"))
  });

  /****  menu  *****/
  let currentOpen = "allgames";

  $('.menu__items').click(function(e) {
    e.preventDefault();
    var $items = $(this);

    //$items.toggleClass('active').siblings().removeClass('active');

    if($items.attr('id') == 'bethistory') {
      toggle("thumbnail_bethistory");
    }
    else if ($items.attr('id') == 'transactions') {
      toggle("thumbnail_transactions");
    }
    else if ($items.attr('id') == 'howtoplay') {
      toggle("thumbnail_howtoplay");
    }
    else if ($items.attr('id') == 'settings') {
      toggle("thumbnail_settings");
    }
  });

  $('.header-subnav__items').click(function(e) {
    reelClicked++;
    $( ".main-container" ).scrollTop(0);
    e.preventDefault();
    var $items = $(this);

    if ($items.attr('id') == 'betsoft') return;
    // $('menu__items').not(this).removeClass('active');
    // $(this).toggleClass('active').toggle($(this).is('.active'));

    $items.addClass('active').siblings().removeClass('active');

    if ($items.attr('id') == 'gameall') {
      toggle("reel_games");
    }
    else if($items.attr('id') == 'kagaming') {
      toggle("kagaming");
    }
    else if ($items.attr('id') == 'baccarat') {
      // toggle("sub_dragonTiger");
      toggle("sub_baccarat");
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--thumb").addClass("active")
    }
    else if ($items.attr('id') == 'poker') {
      toggle("sub_poker");
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--list").addClass("active")
    }
    else if ($items.attr('id') == 'sicbo') {
      toggle("sub_sicbo");
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--list").addClass("active")
    }
    else if ($items.attr('id') == 'dragontiger') {
      toggle("sub_dragonTiger");
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--list").addClass("active")
    }
    else if ($items.attr('id') == 'supersix') {
      toggle("sub_supersix");
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--thumb").addClass("active")
    }
    else if ($items.attr('id') == 'bonus') {
      toggle("sub_bonus");
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--thumb").addClass("active")
    }
    else if ($items.attr('id') == 'roulette') {
      $items.removeClass('active')
    }

    currentOpen = $items.attr('id');
  });

  $(".ico-lang").on('click', function (e) {
    var chosenLanguageIndex = 0;
    for (var i = 0; i < rawConfig.language.length; i++) {
      if (rawConfig.language[i] == $(this).attr("data")) {
        chosenLanguageIndex = i;
      }
    }

    $.post('/settings', {language : chosenLanguageIndex}, function (response) {
      location.reload();
    });
  });

  // //game_con click
  // $(".game__con").on("click", function () {
  //   if(!all_tables.length) return;
  //   if(!$(this).attr("data")) return;
  //   toggle($(this).attr("data"))
  //
  //   $('.sidebar--lobby').hide();
  //   $('.sidebar--game, .header-subnav').css({'display': 'block'});
  //   $('.header-subnav.reelgames').css({'display': 'none'});
  //   $('.header-game__items.-livegames').addClass('active');
  //
  // })

  $(".header__logout").on("click", function () {
    toggle('action_logout')
  })


  var slideWidth = 780;
  var slideTotal = 0;
  var sliderTotalWidth = 0;
  var sliderCount = 1;

  $("#ka-close").on('click', function (e) {
    $(".ka-wrap, .ka-con").removeClass('active');
    $('.ka-slider-con ul.active li.first-slide').prependTo('.ka-slider-con ul.active');
    $('.next-button').show();
    sliderCount = 1;
    checkSlider();
  });

  $(".ka-prompt-btn").on('click', function (e) {
    $(".ka-con").addClass('active');
    $(".ka-prompt").removeClass('active');
  });

  $(".ka-prompt-btn-reel").on('click', function (e) {
    $(".ka-wrap, .ka-con").removeClass('active');
    $(".ka-prompt-reel").removeClass('active');
  });

  $('.ka-slider-con ul.active li:last-child').prependTo('.ka-slider-con ul.active');

  //Check if browser is Chrome
  if (navigator.userAgent.search("Chrome") >= 0) {
    // insert conditional Chrome code here
    slideTotal = $('.ka-slider-con ul.slider-chrome li').length;
    sliderTotalWidth = slideTotal * slideWidth;

    $('.ka-slider-con ul.slider-chrome').css({ 'width' :sliderTotalWidth,  });
    $('.ka-slider-con ul').removeClass('active');
    $('.ka-slider-con ul.slider-chrome').addClass('active');
  }
  //Check if browser is Firefox
  else if (navigator.userAgent.search("Firefox") >= 0) {
    // insert conditional Firefox Code here
    slideTotal = $('.ka-slider-con ul.slider-firefox li').length;
    sliderTotalWidth = slideTotal * slideWidth;

    $('.ka-slider-con ul.slider-firefox').css({ 'width':sliderTotalWidth,  });

    $('.ka-slider-con ul').removeClass('active');
    $('.ka-slider-con ul.slider-firefox').addClass('active');
  }
  //Check if browser is Safari
  else if (navigator.userAgent.search("Safari") >= 0 &&  navigator.userAgent.search("Chrome") < 0) {
    // insert conditional Safari code here
    $('.ka-slider-con ul').removeClass('active');
  }
  //Check if browser is Opera
  else if (navigator.userAgent.search("Opera") >= 0) {
    // insert conditional Opera code here
    $('.ka-slider-con ul').removeClass('active');
  }
  else if (navigator.userAgent.indexOf("MSIE") || !!navigator.userAgent.match(/Trident\/7\./)) {
    // insert conditional IE code here
    slideTotal = $('.ka-slider-con ul.slider-ie li').length;
    sliderTotalWidth = slideTotal * slideWidth;
    $('.ka-slider-con ul.slider-ie').css({ width:sliderTotalWidth });

    $('.ka-slider-con ul').removeClass('active');
    $('.ka-slider-con ul.slider-ie').addClass('active');
  }
  else {
    $('.ka-slider-con ul').removeClass('active');
  }

  function previous(){
    $('.ka-slider-con ul.active').animate({
      left: + slideWidth
    }, 200, function(){
      $('.ka-slider-con ul.active li:last-child').prependTo('.ka-slider-con ul.active');
      $('.ka-slider-con ul.active').css({'left': ''});
    });
  };

  function next() {
    $('.ka-slider-con ul.active').animate({
      left: - slideWidth
    }, 200 , function(){
      $('.ka-slider-con ul.active li:first-child').appendTo('.ka-slider-con ul.active');
      $('.ka-slider-con ul.active').css({'left': ''});
    });

  };

  function checkSlider() {
    if (sliderCount==1) {
       $('.prev-button').hide();
       $('.next-button').show();
   } else if (sliderCount == slideTotal) {
       $('.next-button').hide();
       $('.prev-button').show();
   } else {
       $('.prev-button').show();
       $('.next-button').show();
   }
 } //checkSlider


  var mainSlider = function() {
    checkSlider();

    $('.prev-button').click(function(){
      sliderCount-=1;
      checkSlider();
      previous();

    });
    $('.next-button').click(function(){
      sliderCount+=1;
      checkSlider();
      next();

    });
  };

  $(document).ready(mainSlider);

  var loaderfw01 = "<span class='yellow-fw'></span>";
  var loadermax01 = 2;
  for (var x = 1; x <= loadermax01; x++) {
    var loader_delay01 = Math.random()*20;
    $(loaderfw01).css("animation-delay", loader_delay01 + "s").appendTo($(".loading-fireworks-con"));
  }
  // get window dimensions

  $(".yellow-fw").each(function(i) {
    var loader_fw1   = Math.floor(Math.random() * (290 - 80)) + 80;
    var loader_posx1 = Math.floor(Math.random() * (900 - 400)) + 400;
    var loader_posy1 = Math.floor(Math.random() * (80 - 10)) + 10;
    $(this)
    .css("width", loader_fw1 + "px")
    .css("height", (loader_fw1 - 1) + "px")
    .css("top", loader_posy1 + "%")
    .css("left", loader_posx1 + "px");
  });

  var loaderfw02 = "<span class='blue-fw'></span>";
  var loadermax02 = 2;
  for (var x = 1; x <= loadermax02; x++) {
    var loader_delay02 = Math.random()*20;
    $(loaderfw02).css("animation-delay", loader_delay02 + "s").appendTo($(".loading-fireworks-con"));
  }
  // get window dimensions

  $(".blue-fw").each(function(i) {
    var loader_fw2   = Math.floor(Math.random() * (250 - 80)) + 80;
    var loader_posx2 = Math.floor(Math.random() * (900 - 400)) + 400;
    var loader_posy2 = Math.floor(Math.random() * (80 - 10)) + 10;
    $(this)
    .css("width", loader_fw2 + "px")
    .css("height", (loader_fw2 - 1) + "px")
    .css("top", loader_posy2 + "%")
    .css("left", loader_posx2 + "px");
  });

  var loaderfw03 = "<span class='green-fw'></span>";
  var loadermax03 = 3;
  for (var x = 1; x <= loadermax03; x++) {
    var loader_delay03 = Math.random()*20;
    $(loaderfw03).css("animation-delay", loader_delay03 + "s").appendTo($(".loading-fireworks-con"));
  }
  // get window dimensions

  $(".green-fw").each(function(i) {
    var loader_fw3   = Math.floor(Math.random() * (260 - 80)) + 80;
    var loader_posx3 = Math.floor(Math.random() * (900 - 400)) + 400;
    var loader_posy3 = Math.floor(Math.random() * (80 - 10)) + 10;
    $(this)
    .css("width", loader_fw3 + "px")
    .css("height", (loader_fw3 - 1) + "px")
    .css("top", loader_posy3 + "%")
    .css("left", loader_posx3 + "px");
  });

  var fireworks01 = "<span class='grey-fw'></span>";
  var loadermax04 = 3;
  for (var x = 1; x <= loadermax04; x++) {
    var loader_delay04 = Math.random()*20;
    $(fireworks01).css("animation-delay", loader_delay04 + "s").appendTo($(".fireworks-con"));
  }
  // get window dimensions

  $(".grey-fw").each(function(i) {
    var loader_fw4   = Math.floor(Math.random() * (180 - 50)) + 50;
    var loader_posx4 = Math.floor(Math.random() * 100) - 3;
    var loader_posy4 = Math.floor(Math.random() * (550 - 10)) + 10;
    $(this)
    .css("width", loader_fw4 + "px")
    .css("height", (loader_fw4 - 1) + "px")
    .css("top", loader_posy4 + "px")
    .css("left", loader_posx4 + "%");
  });

});

(function loading_blue_fw(){
    var divsize = ((Math.random()*200 - 50) + 50).toFixed();
    var randombg =

    $newdiv = $('<span/>').addClass("blue-fw").css({
        'width': divsize + 'px',
        'height': divsize - 1 +'px'
    });

    var posx = (Math.floor(Math.random() * (1100 - 200)) + 200).toFixed();
    var posy = (Math.floor(Math.random() * (80 - 10)) + 10).toFixed();
    $newdiv.css({
      'position':'absolute',
      'left':posx+'px',
      'top':posy+'%',
      'display':'none'
    }).appendTo( $(".loading-fireworks-con") ).fadeIn(400).delay(400).fadeOut(1500, function(){
      $(this).remove();
      loading_blue_fw();
    });

})();

(function loading_yellow_fw(){
    var divsize = ((Math.random()*200 - 50) + 50).toFixed();
    var randombg =

    $newdiv = $('<span/>').addClass("yellow-fw").css({
        'width': divsize + 'px',
        'height': divsize - 1 +'px'
    });

    var posx = (Math.floor(Math.random() * (1100 - 200)) + 200).toFixed();
    var posy = (Math.floor(Math.random() * (80 - 10)) + 10).toFixed();
    $newdiv.css({
      'position':'absolute',
      'left':posx+'px',
      'top':posy+'%',
      'display':'none'
    }).appendTo( $(".loading-fireworks-con") ).fadeIn(400).delay(300).fadeOut(1500, function(){
      $(this).remove();
      loading_yellow_fw();
    });

})();

(function loadinge_green_fw(){
    var divsize = ((Math.random()*200 - 50) + 50).toFixed();
    var randombg =

    $newdiv = $('<span/>').addClass("green-fw").css({
        'width': divsize + 'px',
        'height': divsize - 1 +'px'
    });

    var posx = (Math.floor(Math.random() * (1100 - 200)) + 200).toFixed();
    var posy = (Math.floor(Math.random() * (80 - 10)) + 10).toFixed();
    $newdiv.css({
      'position':'absolute',
      'left':posx+'px',
      'top':posy+'%',
      'display':'none'
    }).appendTo( $(".loading-fireworks-con") ).fadeIn(400).delay(500).fadeOut(1500, function(){
      $(this).remove();
      loadinge_green_fw();
    });

})();

(function fireworks01(){
    var divsize = ((Math.random()*160 - 50) + 50).toFixed();
    var randombg =

    $newdiv = $('<span/>').addClass("grey-fw").css({
        'width': divsize + 'px',
        'height': divsize - 1 +'px'
    });

    var posx = (Math.floor(Math.random() * 100) - 5).toFixed();
    var posy = (Math.floor(Math.random() * (500 - 10)) + 10).toFixed();
    $newdiv.css({
      'position':'absolute',
      'left':posx+'%',
      'top':posy+'px',
      'display':'none'
    }).appendTo( $(".fireworks-con") ).fadeIn(400).delay(500).fadeOut(1500, function(){
      $(this).remove();
      fireworks01();
    });

})();
