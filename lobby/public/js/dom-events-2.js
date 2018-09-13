$(document).ready(function(){

  // $.fn.textWidth = function(text, font) {
  //   if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').appendTo(document.body);
  //   var htmlText = text || this.val() || this.text();
  //   htmlText = $.fn.textWidth.fakeEl.text(htmlText).html(); //encode to Html
  //   htmlText = htmlText.replace(/\s/g, "&nbsp;"); //replace trailing and leading spaces
  //   $.fn.textWidth.fakeEl.html(htmlText).css('font', font || this.css('font'));
  //   return $.fn.textWidth.fakeEl.width();
  // };



  //for sub menu
  let total = 0;
  let count = 0;
  let padding = 0;
  let lastchild = 0;

  // FOR SUB menu

  $('.header-game__items').hover(
    function() {
      $(this).find('.header-subnav__items').each (function() {
          width = $(this).width();
          // width = $(this).textWidth();
          count++;
          total += width;

          console.log("width:", width);
      })

      if($(this).hasClass('-baccarat')) {
        if(window.language.locale == "jp") {
            $(this).find('.header-subnav-nav').css({ width: 262})

        } else if(window.language.locale == "zh") {
          $(this).find('.header-subnav-nav').css({ width: 240 })
        } else if(window.language.locale == "kr") {
            $(this).find('.header-subnav-nav').css({ width: 225 })
        } else if(window.language.locale == "th") {
          $(this).find('.header-subnav-nav').css({ width: 260 })
        } else {
          $(this).find('.header-subnav-nav').css({ width: 270})
        }

      } else {
        if(window.language.locale == "jp") {
          $(this).find('.header-subnav-nav').css({ width: 260 })
        } else if(window.language.locale == "zh") {
          $(this).find('.header-subnav-nav').css({ width: 180 })
        } else if(window.language.locale == "kr") {
          $(this).find('.header-subnav-nav').css({ width: 225 })
        } else if(window.language.locale == "th") {
          $(this).find('.header-subnav-nav').css({ width: 260})
        } else {
          $(this).find('.header-subnav').css({ width: 656 })
        }

      }
    },
    function() {
      total = 0;
      count = 0;
    }
  );

  $('.header-game__items').click(function() {
    $( ".popup-bg, .menu__items" ).removeClass('active');
    $( ".popup-container" ).removeClass('isShow').css({'top' : '-100%'});
    $(".ingame-howtoplay, .header-subnav__sort").hide();
    $(".game-hover").removeClass("active inactive clicked no-clicked");
  });

  function removeactiveSub() {
    $(".header-subnav__items").removeClass("active");
    $(".header-subnav__items.-classic").addClass("active");
  }

  toggle.switchToGame = function () {
    toggle.hideAll();
    $(".hot-container").hide();
    $(".main-container").show();

    $(".viewstyle-con").removeClass("active")
    $(".viewstyle-con.viewstyle--thumb").addClass("active")
    $(this).addClass("active");
    $('#reelgames').removeClass("active")
    currentOpen = "allgames"
    $(".header-subnav.reelgames, .header-subnav.language").hide();
  }

  toggle.init = function () {
    try {
      toggle.hideAll();
    } catch(err) {

    }
    $(".hot-container, .lobby-popup-con").hide();
    $(".all-container").show();
    toggle.toggleBaccarat('normal');
    $(".header-subnav.reelgames, .header-subnav.language").hide();
    $("#baccarat").addClass('active');
    $("#reelgames, #othergames, .popup-bg").removeClass('active');
  }

  $('#baccarat').click(function() {
    if(!all_tables.length) {return;}
    toggle.hideAll();
    toggle.toggleBaccarat('normal');
    $(this).addClass("active");
    $('#reelgames, #othergames, #junket').removeClass("active")
    $(".header-subnav.language").hide();

    if (parseInt(window.all_tables[0].mainNotice.status)) {
      $('.announcement').addClass("active");
    }
  });

  $('#othergames').click(function() {
    if(!all_tables.length) {return;}
    toggle.hideAll();
    toggle.toggleOtherGames();
    $(this).addClass("active");
    $('#reelgames, #baccarat, #junket').removeClass("active")
    $('.reelgames-container').hide();
    $(".header-subnav.language").hide();

    if (parseInt(window.all_tables[0].mainNotice.status)) {
      $('.announcement').addClass("active");
    }
  });

  $('#junket').click(function() {
    if(!all_tables.length) {return;}
    toggle.hideAll();
    toggle.toggleJunket();
    $(this).addClass("active");
    $('#reelgames, #baccarat, #othergames').removeClass("active")
    if (parseInt(window.all_tables[0].mainNotice.status)) {
      $('.announcement').addClass("active");
    }
  });

  // themedgames
  $('#themedgames').click(function() {
    if($('#themedgames').hasClass('not-allowed')) return;
    if(!parseInt(window.reel_yn)) return;
    if(!all_tables.length) return;
    toggle.hideAll();
    toggle.togglePaigowClassic();
    removeactiveSub();
    $(this).addClass("active");
    $(".main-container").show();
    $('#livegames, #reelgames').removeClass("active");
  });

  if(window.reel_yn == 0) {
    $('#reelgames, .game--reelgames, .game__con').addClass('not-allowed');
    $('#reelgames').css('display', '');
  } else if(window.reel_yn == 2) {
    $('#reelgames').css('display', 'none');
  }
  else {
    $('#reelgames, .game--reelgames, .game__con').removeClass('not-allowed');
    $('#reelgames').css('display', '');
  }

  $('#reelgames').click(function() {
    if($('#reelgames').hasClass('not-allowed')) return;

    if(!parseInt(window.reel_yn)) return;
    if(!all_tables.length) return;
    toggle.toggleReelGames();
    if(currentOpen) currentOpen = "reel_games";
    removeactiveSub();
    $(this).addClass("active");
    $(".hot-container").hide();
    $(".main-container").hide();
    $(".banner-container").hide();
    $('#baccarat, #othergames').removeClass("active")
    $('.header-subnav').css({'display': 'block'});
    $(".header-subnav").hide();
    $(".header-subnav.reelgames").show();
  });

  $('#lobby').click(function() {
    toggle.hideAll();
    toggle.init();
    $('.popup-bg').removeClass('active');
  });

  $('.viewstyle-con').click(function(e) {
    if(currentOpen && currentOpen.length) {
      if(currentOpen == "poker" || currentOpen == "sicbo" || currentOpen == "dragontiger" || currentOpen == "paigow") return;
    }

    e.preventDefault();
    toggle.hideAll();
    toggle.hideBanner();
    var $items = $(this);
    $items.addClass('active').siblings().removeClass('active');

    if(currentOpen == "baccarat" || currentOpen == "allgames") {
      toggle.toggleBaccarat('normal', $(this).attr("data"))
    }

    if(currentOpen == 'supersix') {
      toggle.toggleBaccarat('supersix', $(this).attr("data"))
    }

    if(currentOpen == 'bonus') {
      toggle.toggleBaccarat('dragonbonus', $(this).attr("data"))
    }

  });

  /****  menu  *****/
  let currentOpen = "allgames";

  $('.menu__items').click(function(e) {
    e.preventDefault();
    var $items = $(this);
    if ($items.attr('id') != 'language') {
      $('.popup-bg').css({'top':'6.6%'});
      if($items.hasClass('active')) {
        $( ".popup-bg").toggleClass('active').siblings().removeClass('active');
      } else {
        $( ".popup-bg").addClass('active').siblings().removeClass('active');
      }
    }
    if ($items.attr('id') == 'transactions') {
      $(".lobby-popup-con").css("width", "825px");
    } else if($items.attr('id') == 'settings') {
      $(".lobby-popup-con").css({width : "525px", height: "580px"});
    } else {
      $(".lobby-popup-con").css({width : "", height: ""});
    }

    $('.howto-wrap').show();
    if ($items.attr('id') != 'language') {
      $items.toggleClass('active').siblings().removeClass('active');
    }

    toggle.togglePopups($items.attr('id'));

    // if($items.attr('id') == 'bethistory') {
    //   // toggle("thumbnail_bethistory");
    //   toggle.togglePopups("bethistory");
    // }
    // else if ($items.attr('id') == 'transactions') {
    //   // toggle("thumbnail_transactions");
    //   toggle.togglePopups("transactions");
    // }
    // else if ($items.attr('id') == 'howtoplay') {
    //   // toggle("thumbnail_howtoplay");
    //   toggle.togglePopups("howtoplay");
    // }
    // else if ($items.attr('id') == 'settings') {
    //   toggle.togglePopups("settings");
    // }
    // else if ($items.attr('id') == 'language') {
    //   toggle.togglePopups("language");
    // }
  });

  $(".lobby-popup-con .ico-not").on("click", (e) => {
    let closePopup = $(e.currentTarget).attr('class').split(" ")[2];
    setTimeout(function(){
      $("#sicbo-toggle, #poker-toggle, #baccarat-toggle, #dragontiger-toggle, #paigow-toggle, #red-white-toggle, #bigwheel-toggle")
      .css("display","none")
      $(".popup-bg, .menu__items").removeClass("active")
      $(".lobby-popup-con").removeClass("isShow");
    }, 100);
    toggle.togglePopups(closePopup);
  });


  $('.header-sub--target').click(function(e) {
    $( ".main-container" ).scrollTop(0);
    e.preventDefault();
    var $items = $(this);

    if ($items.attr('id') == 'betsoft' || $items.attr('id') == 'roulette') return;
    // $('menu__items').not(this).removeClass('active');
    // $(this).toggleClass('active').toggle($(this).is('.active'));

    $items.parents().addClass('active'); //.siblings().removeClass('active');

    if (parseInt(window.all_tables[0].mainNotice.status)) {
      $('.announcement').addClass("active");
    }

    $('.header-subnav__sortlist').hide();
    $('.header-subnav__sort').removeClass('open').hide();

    if($items.attr('id') == 'allgames') {
      if(currentOpen == "kagalist" || currentOpen == "reel_games") {
        toggle("reel_games");
      } else {
        toggle("live_games");
      }
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--thumb").addClass("active")
    }
    else if ($items.attr('id') == 'baccarat') {
      toggle.hideAll();
      toggle.toggleBaccarat('normal');
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--thumb").addClass("active")
      $('.header-subnav-nav__items').removeClass('active');
      $('#baccarat-classic').addClass("active")
    }
    else if ($items.attr('id') == 'poker') {
      toggle.hideAll();
      toggle.togglePoker();
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--list").addClass("active")
    }
    else if ($items.attr('id') == 'sicbo') {
      toggle.hideAll();
      toggle.toggleSicbo();
      $(".viewstyle-con").removeClass("active");
      $(".viewstyle-con.viewstyle--list").addClass("active");
      $('.header-subnav__items.-sicbo').addClass("active");
    }
    else if ($items.attr('id') == 'dragontiger') {
      toggle.hideAll();
      toggle.toggledragonTiger();
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--list").addClass("active")
    }
    else if ($items.attr('id') == 'paigow') {
      toggle.hideAll();
      toggle.togglePaigowClassic();
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--list").addClass("active")
    }
    else if ($items.attr('id') == 'kagaming') {
      toggle.toggleReelGames('ka_gaming');
    }
    else if ($items.attr('id') == 'gameall') {
      toggle.toggleReelGames();
    }

    currentOpen = $items.attr('id');
    removeactiveSub();
  });

  $('.header-subnav__items').click(function(e) {
    $( ".main-container" ).scrollTop(0);
    e.preventDefault();
    removeactiveSub();
    var $items = $(this);
    $('.header-subnav__sort').hide()

    $items.addClass('active').siblings().removeClass('active');
    if ($items.attr('id') == 'baccarat-classic') {
      toggle.hideAll();
      toggle.toggleBaccarat('normal');
      // $(".header-subnav__items.-baccarat").addClass("active")
     }
   else if ($items.attr('id') == 'baccarat-rooms') {
      toggle.hideAll();
      toggle.toggleBaccarat('rooms');
      // $(".header-subnav__items.-baccarat").addClass("active")
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--thumb").addClass("active")
    }
    else if ($items.attr('id') == 'baccarat-bonus') {
      toggle.hideAll();
      toggle.toggleBaccarat('dragonbonus');
      $(".header-subnav__items.-baccarat").addClass("active")
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--thumb").addClass("active")
    }
    else if ($items.attr('id') == 'sicbo-classic') {
      toggle.hideAll();
      toggle.toggleSicbo();
      $(".header-subnav__items.-sicbo").addClass("active")
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--list").addClass("active")
    }

    else if ($items.attr('id') == 'paigow-classic') {
      toggle.hideAll();
      toggle.togglePaigowClassic();
      $(".header-subnav__items.-paigow").addClass("active")
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--list").addClass("active")
    }

    else if ($items.attr('id') == 'sicbo-userbased') {
      toggle.hideAll();
      toggle.toggleUserBased('Sicbo');
      $('.header-subnav__sort.-sicbo').show()
      $(".header-subnav__items.-sicbo").addClass("active")
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--list").addClass("active")
    }

    else if ($items.attr('id') == 'paigow-userbased') {
      toggle.hideAll();
      toggle.toggleUserBased('Paigow');
      $('.header-subnav__sort').show()
      $(".header-subnav__items.-paigow").addClass("active")
      $(".viewstyle-con").removeClass("active")
      $(".viewstyle-con.viewstyle--list").addClass("active")
    }

    currentOpen = $items.attr('id');

    if(currentOpen.split("-").length > 1 && currentOpen.split("-")[0] === "baccarat") {
      currentOpen = currentOpen.split("-")[1];
      if(currentOpen === "classic") currentOpen = "baccarat";
    }
  });

  // $(".ico-lang").on('click', function (e) {
  //   var chosenLanguageIndex = 0;
  //   for (var i = 0; i < rawConfig.language.length; i++) {
  //     if (rawConfig.language[i] == $(this).attr("data")) {
  //       chosenLanguageIndex = i;
  //     }
  //   }

  //   $.post('/settings', {language : chosenLanguageIndex}, function (response) {
  //     location.reload();
  //   });
  // });

  $(".header__logout").on("click", function () {
    // toggle('action_logout')
     toggle.togglePopups("logout");
  })

  if(!parseInt(window.is_room)) {
    $('.header-subnav-nav.-sicbo').hide();
    // $('.header-subnav-nav.-paigow').hide();
  }

  // ka wrap popups
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

    if(window.language.locale == "en") {
      padding = 55;
    } else {
      padding = 50;
    }
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

  $(".dropdown-con").click(function(e){
    e.preventDefault();

    if($(this).hasClass("open")) {
      $(this).removeClass("open");
      $(this).children("ul").slideUp("fast");
    } else {
      $(this).addClass("open");
      $(this).children("ul").slideDown("fast");
    }
  });

  $('.dropdown-list li').click(function(){
    $('.dropdown-con span').text($(this).text());
    $('#roomname').val($(this).text());
    if($(this).text() == "Customize") {
      $('#roomname').val("");
      $('.createroom-input-con').show();
    }
  });

  $('.header-subnav__sort').click(function(e){
    e.preventDefault();
    // $(this).toggleClass('active');
    if($(this).hasClass("open")) {
      $(this).removeClass("open");
      $(this).children("ul").slideUp("fast");
    } else {
      $(this).addClass("open");
      $(this).children("ul").slideDown("fast");
    }
  });

  $('#verification-cancel').click(function() {
    toggle.togglePopups("roomverification");
    $('#joinpass').val('');
    $('.error-text').hide();
  });

  $('#createroom_cancel').on('click', function() {
    toggle.togglePopups("createroom");
    $('.radio-con.-capital').remove()
    $('checkname').hide()
  });

  $(document).on('click','.radio-btn', function() {
    let _this = $(this),
    block = _this.parent().parent();
    block.find('input:radio').attr('checked', false);
    block.find(".radio-btn").removeClass('checkedRadio');
    if(_this.hasClass('disabled')) {
        _this.removeClass('checkedRadio');
        _this.find('input:radio').attr('checked', false);
    } else {
      _this.addClass('checkedRadio');
      _this.find('input:radio').attr('checked', true);
    }

    if($("input[name='is_private']").is(':checked')) {
      $('.createroom__boxcon.-password, .createroom-input-con.-password').show();
    } else {
      $('.createroom__boxcon.-password, .createroom-input-con.-password').hide();
    }
  });

  $('.btn-failed').on('click', function() {
    $(".popup-container").animate({
      top: '-100%',
      opacity : 0
    }, 200)
    setTimeout( function() {
      $("#popup-failed").hide();
      $(".popup-container").removeClass("isShow").hide();
      $('.popup-bg').removeClass('active');;
    }, 200)
  });


});
