$(document).ready(function(){

  //for sub menu
  var total = 0;
  var count = 0;
  var padding = 0;
  var lastchild = 0;

  $('.header-game__items').click(function() {
    $( ".popup-bg").removeClass('active');
    $( ".popup-container" ).removeClass('isShow').css({'top' : '-100%'});
    $(".game-hover").removeClass("active inactive clicked no-clicked");
    $(".modal-con").hide();
    $('.menu-list-bg').removeClass('active menu-toggled');
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
    $(".header-subnav.reelgames, .header-subnav.language").hide();
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
    $('.junket-menu__items').removeClass('active');
    $('#junket-baccarat').addClass('active')
    $('.junket-con').hide()
    $('#junket-baccarat-list').show()

    if (parseInt(window.all_tables[0].mainNotice.status)) {
      $('.announcement').addClass("active");
    }
  });

  $('.junket-menu__items').click(function(e) {
    var elemAttr = e.target.id;
    $('.junket-tables').hide();
    $('.junket-menu__items').removeClass('active');
    $(this).addClass('active');
    $('.junket-con').hide()

    $("#"+elemAttr+"-list").show();
    // $(`#${elemAttr}-list`).show();

    if(window.isJunket == 1) {
      var baccaratCount = 0;
      var otherGamesCount = 0;

      if(_.isEmpty(window.all_Rooms)) {
        // $('#junket-no-rooms').show();
        // $(`#${elemAttr}-list`).hide();
      } else {
        for (var key in window.all_Rooms) {
          if(window.all_Rooms[key].gameName == "Pai-Gow" || window.all_Rooms[key].gameName == "Dragon-Tiger" || window.all_Rooms[key].gameName == "Poker" || window.all_Rooms[key].gameName == "Sicbo" ) {
            otherGamesCount++;
          } else {
            baccaratCount++;
          }
        }
      }

      if((baccaratCount == 0 && elemAttr == 'junket-baccarat') || (otherGamesCount == 0 && elemAttr == 'junket-other')) {
        // $('#junket-no-rooms').show();
        // $(`#${elemAttr}-list`).hide();
      } else {
        // $('#junket-no-rooms').hide();
        // $(`#${elemAttr}-list`).show();
      }
    }
  });

  $('#back-junket').click(function(e) {
    console.log("back junket");
    $('.junket-tables').hide();
    $('.junket-baccarat').hide();
    $('.junket-menu').show();
    $('#junket-baccarat').addClass('active');
    $('.junket-con').hide()
    $('#junket-baccarat-list').show()
    toggle.toggleJunketBanner();
  });

  if(window.reel_yn == 0) {
    $('#reelgames, .game--reelgames').addClass('not-allowed');
  } else if(window.reel_yn == 2) {
    $('#reelgames').css('display', 'none');
  } else {
    $('#reelgames, .game--reelgames').removeClass('not-allowed');
  }

  $('#reelgames').click(function() {
    if($('#reelgames').hasClass('not-allowed')) return;
    if(!parseInt(window.reel_yn)) return;
    if(!all_tables.length) return;
    toggle.hideAll();
    toggle.toggleReelGames();
    $(this).addClass("active");
    $('#baccarat, #othergames, #junket').removeClass("active")
    reelgames.populateKAGamesList();
  });

  $('#lobby').click(function() {
    toggle.hideAll();
    toggle.init();
    $(".modal-con").hide();
    $('.menu-list-bg').removeClass('active menu-toggled');
  });

  /****  menu  *****/
  // $('.menu-list-bg').click(function(e) {
  //   $('.range-list').attr('style', '');
  //   $('.modal-con, .howto-wrap').css('z-index', '');
  //   $('.howto-submenu').css('opacity', '');
  //   $(".modal-select").removeClass('range-drop').addClass('range-hide');
  //
  //   $(e.target).addClass('active').siblings().removeClass('active');
  //
  //   var elementAttr = $(e.currentTarget).attr('value');
  //   var arrayElement = ["#sicbo-toggle","#poker-toggle","#baccarat-toggle","#dragontiger-toggle","#paigow-toggle","#red-white-toggle","#bigwheel-toggle","#roulette-toggle"];
  //   arrayElement.forEach( function(e) {
  //     $(e).hide();
  //   });
  //
  //   if(elementAttr == 'betlogs') {
  //     $('.modal-con.-result').css('display', '');
  //     var datenow = new Date();
  //     var year = datenow.getFullYear();
  //     var month = datenow.getMonth()+1
  //     var date =  datenow.getDate()
  //
  //     var monthCurr = month < 10? '0'+month : month;
  //     var dateCurr = date < 10? '0'+date : date;
  //     $('#date_timepicker_start').val(year+'-'+monthCurr+'-'+dateCurr)
  //     $('#date_timepicker_end').val(year+'-'+monthCurr+'-'+dateCurr)
  //
  //     var gameName = $('.range-disp.betlogs').attr('game');
  //     var startDate = year+'-'+month+'-'+date;
  //     var endDate = year+'-'+month+'-'+date;
  //     var searchId = '';
  //     var timeZone = -(-(new Date().getTimezoneOffset() / 60));
  //
  //     console.log("gameName",gameName, startDate, endDate);
  //
  //     if (!$(e.currentTarget).hasClass('menu-toggled')) {
  //       $('#modalResult').hide();
  //       $('.modal-body-betlogs').show();
  //
  //       // bet_records.initRecords('betlogs', $('.range-disp.betlogs').attr('game'));
  //         bet_records.initRecords('betlogs', gameName, startDate, endDate, searchId, timeZone);
  //       // self.eventListener.links.baccaratlogs
  //     }
  //
  //   }
  //
  //   if(elementAttr == 'howtoplay') {
  //     $('.range-disp.howtoplay').html(window.language2.lobby_gamename_baccarat);
  //     for(var e = 0; e < arrayElement.length; e++) {
  //       $(".howto-contents").scrollTop(0);
  //       $('a[href*="#"]').on("mouseover", function() {
  //         $('html,body').css('cursor','pointer');
  //       });
  //       $('a[href*="#"]').click(function() {
  //         if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
  //           var target = $(this.hash);
  //           target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
  //           var scale = $(""+arrayElement[e]+" #top")[0].getBoundingClientRect().width / $(""+arrayElement[e]+" #top").width();
  //           // var scale = $(`${arrayElement[e]} #top`)[0].getBoundingClientRect().width / $(`${arrayElement[e]} #top`).width();
  //           var topPosition = $(this).attr('href') == '#game-objective' ? topPosition = 0 : ((target.position().top / scale) + $(""+arrayElement[e]+" .howto-contents").scrollTop()) + 5;
  //           // var topPosition = $(this).attr('href') == '#game-objective' ? topPosition = 0 : ((target.position().top / scale) + $(`${arrayElement[e]} .howto-contents`).scrollTop()) + 5;
  //           if (target.length) {
  //             // $(`${arrayElement[e]} .howto-contents`).animate({
  //             $(""+arrayElement[e]+" .howto-contents").animate({
  //               scrollTop: topPosition
  //             }, 500);
  //             return false;
  //           }
  //         }
  //       });
  //     }
  //   }
  //
  //   if ($(e.currentTarget).hasClass('menu-toggled')) {
  //     toggle.toggleModalMenu(elementAttr, false);
  //     $(e.target).removeClass('active');
  //   } else {
  //     var currentOpen = $('.menu-toggled').attr('value');
  //     toggle.toggleModalMenu(currentOpen, false);
  //     toggle.toggleModalMenu(elementAttr, true);
  //   }
  // });

  // modal select
  $(".modal-select").on('click', function () {
    if($('.range-list').is(':visible')) {
      $('.range-list').animate({'height':'0'},{
        duration : 0,
        complete : function () {
          $('.range-list').hide()
        }
      });
      $(this).addClass('range-hide');
      $(this).removeClass('range-drop');
      $('.modal-con, .howto-wrap').css("z-index", "");
      $('.howto-submenu').css("opacity", "");
    } else {
      $('.range-list').show();
      var selectedRangeList =  $(this).parent().siblings().attr('data');
      $('.range-list').animate({'height': $(".range-list."+selectedRangeList+"").children().length *40 + 'px'},200);
      // $('.range-list').animate({'height': $(`.range-list.${selectedRangeList}`).children().length *40 + 'px'},200);
      $('.modal-con, .howto-wrap').css("z-index", "1000");
      $('.howto-submenu').css("opacity", "0.4");
      $(this).addClass('range-drop');
      $(this).removeClass('range-hide');
    }
  });

  // range select
  $(".range-select").on('click', function () {
    $('.range-select').removeClass('selected');
    $(this).addClass('selected');

    var selectedRangeDisp =  $(this).parent().attr('data');
    if(selectedRangeDisp == "howtoplay") {
      $('.range-disp.howtoplay').html($(this).text());
    } else {
      var url = $(this).attr('data');
      var gameName = $(this).attr('game');
      bet_records.initRecords('betlogs', gameName); // self.eventListener.links[url]
      $('.range-disp.betlogs').html($(this).text());
      $('.range-disp.betlogs').attr('game', gameName);
    }


    // var selected = `#${$(this).attr('data')}`;
    var selected = "#"+$(this).attr('data')+"";
    var elementAttr = $(this).attr('value');
    var arrayElement = ["#sicbo-toggle","#poker-toggle","#baccarat-toggle","#dragontiger-toggle","#paigow-toggle","#red-white-toggle","#bigwheel-toggle","#roulette-toggle"];
    arrayElement.forEach(function(e) {
      $(e).hide();
    });

    arrayElement.forEach(function(e) {
      if(selected == e) {
        $(e).show();
      } else {
        $(e).hide();
      }
    });
    $('.range-list').animate({'height':'0'},{
      duration : 0,
      complete : function () {
        $('.range-list').hide()
      }
    });
    $(".modal-select").addClass('range-hide');
    $(".modal-select").removeClass('range-drop');
    $('.modal-con, .howto-wrap').css("z-index", "");
    $('.howto-submenu').css("opacity", "");
  });


  $('.menu-close-ico').click(function(e) {
    $('.range-list.betlogs').css('z-index', '');
    $('.menu-list-bg').removeClass('active');
    var elementAttr = $(e.currentTarget).attr('value');
    $('.range-disp.howtoplay').html(window.language2.lobby_gamename_baccarat);
    toggle.toggleModalMenu(elementAttr, false);

    if(elementAttr == 'betlogs') {

    }
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

  $(".header__logout").on("click", function () {
    $(".popup-container").animate({
      top: '0'
    }, {
      duration: 200,
      start: function () {
        $("#popup-logoutlobby").show();
        $(".popup-bg").addClass('active');
      }
    })
  })

  $("#lobby-cancelremove").on("click", function () {
    $(".popup-container").animate({
      top: '-100%'
    }, {
      duration: 200,
      complete: function () {
        $(".popup-bg").removeClass('active');
      }
    })
  });

  $("#looby-removeroom").on("click", function (e) {
    $.post("/logout", { }, function(redirect) {
      window.location.href = redirect;
    }).fail(function(){
    });
  });

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

  $(document).on('click','.radio-btn', function() {
    var _this = $(this),
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

    if($("input[name='haslimit']").is(':checked')) {
      $('.duration-limit').show();
    } else {
      $('.duration-limit').hide();
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

  $(document).on("mouseleave", ".game-hover", function() {
    $('room-con').remove();
  });

  $(document).on('click','.radio-btn', function() {

    console.log("radio", this);
    var _this = $(this),
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
  });

  // settings
  var dealerVol = window.config.voice * 105;
  $('#dealerSndCircle').css('left', (dealerVol + 205) - 7);
  $('#dealerSndSlider').css('width', ""+parseFloat(window.config.voice) * 100+"%");
  // $('#dealerSndSlider').css('width', `${(parseFloat(window.config.voice) * 100)}%`);

  var gameVol = window.config.effect * 105;
  $('#gameSndCircle').css('left', (gameVol + 205) - 7);
  $('#gameSndSlider').css('width', ""+parseFloat(window.config.effect) * 100+"%");
  // $('#gameSndSlider').css('width', `${(parseFloat(window.config.effect) * 100)}%`);

  var musicVol = window.config.music * 105;
  $('#musicSndCircle').css('left', (musicVol + 205) - 7);
  $('#musicSndSlider').css('width', ""+parseFloat(window.config.music) * 100+"%");
  // $('#musicSndSlider').css('width', `${(parseFloat(window.config.music) * 100)}%`);
  settings.makeDraggable('musicSndCircle');

  if (parseFloat(window.config.voice) > 0) {
    $('#dealerMaxIco').addClass('volume-ico-active');
  } else {
    $('#dealerMuteIco').addClass('volume-ico-active');
  }

  if (parseFloat(window.config.effect) > 0) {
    $('#gameMaxIco').addClass('volume-ico-active');
  } else {
    $('#gameMuteIco').addClass('volume-ico-active');
  }

  if (parseFloat(window.config.music) > 0) {
    $('#musicMaxIco').addClass('volume-ico-active');
  } else {
    $('#musicMuteIco').addClass('volume-ico-active');
  }

  // Music
  $(".items_music-"+window.config.bgm+"").addClass('-selected');
  // $(`.items_music-${window.config.bgm}`).addClass('-selected');
  $('.music-active').text(""+window.language2.lobby_settings_music + " " +window.config.bgm+"");
  // $('.music-active').text(`${window.language2.lobby_settings_music} ${window.config.bgm}`);

  $('.music-list__items').off().on('click', function(e) {
    var chosenMusic = $(e.currentTarget).attr('value');
    $('.music-active').text(""+window.language2.lobby_settings_music+ " " + chosenMusic+"");
    // $('.music-active').text(`${window.language2.lobby_settings_music} ${chosenMusic}`);
    $('.-selected').removeClass('-selected');
    $(e.currentTarget).addClass('-selected');

    settings.setBgm(chosenMusic);
    $.post('/settings', {bgm: chosenMusic}, function(response) { config.bgm = chosenMusic; });

    $('.music-active').removeClass('-active');
    $('.music-list-con').animate({'height':'0'},{
      duration : 200,
      complete : function () {
        $('.music-list-con').hide()
      }
    });
  });

  $('.music-dropdown-con').off().on('click', function(e) {
    if($('.music-list-con').is(':visible')) {
      $('.music-active.-active').removeClass('-active');
      $('.music-list-con').animate({'height':'0'},{
        duration : 200,
        complete : function () {
          $('.music-list-con').hide()
        }
      });
    } else {
      $('.music-list-con').show();
      $('.music-list-con').animate({'height': '180px'}, 200);
      $('.music-active').addClass('-active');
    }
  });

  //clicking the icon
  $('#dealerMuteIco').on('click', function() {
    settings.setMinMaxVol('dealer', 0);
  })
  $('#dealerMaxIco').on('click', function() {
    settings.setMinMaxVol('dealer', 1);
  });

  $('#gameMuteIco').on('click', function() {
    settings.setMinMaxVol('game', 0);
  });
  $('#gameMaxIco').on('click', function() {
    settings.setMinMaxVol('game', 1);
  });

  $('#musicMuteIco').on('click', function() {
    settings.setMinMaxVol('music', 0);
  });
  $('#musicMaxIco').on('click', function() {
    settings.setMinMaxVol('music', 1);
  });

  if (!parseInt(window.vendorSound)) {
    $('#dealerSndCircle, #dealerSndSlider, #gameSndCircle, #gameSndSlider').addClass('disable-sound');
    $('#dealerMaxIco, #dealerMuteIco, #gameMaxIco, #gameMuteIco').removeClass('volume-ico-active');
    $('#dealerMaxIco, #dealerMuteIco, #gameMaxIco, #gameMuteIco').css({cursor: 'default'});

    $('#dealerMaxIco, #dealerMuteIco, #gameMaxIco, #gameMuteIco').unbind('click');
  } else {
    settings.makeDraggable('dealerSndCircle');
    settings.makeDraggable('gameSndCircle');
  }

  // Display
  if (window.config.screen == 'black') {
    $('#setTheme').addClass('switch-active');
    $('#setThemeCircle').css({'margin-left': '35px', 'background': '#327e3e'});
  }
  if (window.config.tutorial == 'true') {
    $('#setTut').addClass('switch-active');
    $('#setTutCircle').css({'margin-left': '35px', 'background': '#327e3e'});
  }
  $('.settings-switch-bg').click(function(e) {
    settings.setSwitchToggle(e.currentTarget);
  });

  // Flag
  $(".flag-"+window.config.language+"").addClass('flag-active');
  // $(`.flag-${window.config.language}`).addClass('flag-active');
  $('.flag-con').click(function(e) {
    settings.setChangeLang(e.currentTarget);
  });

  // Avatar
  var avatar = window.config.default.split("_")[0];
  // console.log(""+window.config.default.split("_")[0]+"_"+window.config.default.split("_")[1]+"");
  avatar = avatar == 'blue' ? "blue_"+window.config.default.split("_")[1]+"" : ""+window.config.default.split("_")[0]+"_"+window.config.default.split("_")[1]+"";
  // avatar = avatar == 'blue' ? `blue_${window.config.default.split("_")[1]}` : `${window.config.default.split("_")[0]}_${window.config.default.split("_")[1]}`;

  $(".-"+avatar+"").addClass('avatar-active');
  // $(`.-${avatar}`).addClass('avatar-active');
  $('.avatar-cont').click(function(e) {
    window.config.default = $(e.currentTarget).attr('avatar');
    settings.setUserAvatar();
    $('.avatar-active').removeClass('avatar-active');
    $(e.currentTarget).addClass('avatar-active');
    $.post("/settings", {default: $(e.currentTarget).attr('value')}, function(response) { });
  });

  settings.setVolume();

  $(document).on("click","#popup-success .popup-btn--close" ,function(e){
    $(".popup-container").animate({
      top: '-100%',
    }, {
      duration: 200,
      complete: function () {
        $('.popup-box, .popup-alert-box').hide();
        $('.popup-bg').hide().css({'top': ''}).removeClass('active');
      }
    })
  });

  $(document).on("click","#popup-fail .popup-btn--close.-alert" ,function(e){
    $(".popup-container").animate({
      top: '-100%',
    }, {
      duration: 200,
      complete: function () {
        $('.popup-box, .popup-alert-box').hide();
        $('.enter.gameButtons').css({ display : '' })
        $('.popup-bg').hide().css({'top': '', display : '' }).removeClass('active');
        $('#popup-fail .popup-alert-btn').empty();
      }
    })
  });

  $('#searchlogs').click(function() {
    var startDate = $('#date_timepicker_start').val();
    var endDate =  $('#date_timepicker_end').val();
    var searchId = $('#search-userid').val();
    var gameName = $('.range-disp.betlogs').attr('game');
    var timeZone = -(-(new Date().getTimezoneOffset() / 60));

    var gameText = '';
    if(gameName == 'sicbo') {
      gameText = window.language2.lobby_gamename_sicbo;
    } else if(gameName == 'paigow') {
      gameText = window.language2.lobby_gamename_crazypaigow;
    } else if(gameName == '' || gameName == "allgames") {
      gameText = window.language2.com_sub_menuarea_allgames;
    } else if(gameName == 'dragontiger') {
      gameText = window.language2.lobby_gamename_dragontiger;
    } else if(gameName == 'poker') {
      gameText = window.language2.lobby_gamename_texasholdem;
    } else {
      gameText =  window.language2.lobby_gamename_baccarat;
    }

    bet_records.initRecords('betlogs', gameName, startDate, endDate, searchId, timeZone); // self.eventListener.links[url]

    $('.range-disp.betlogs').html(gameText)
  });

  $('#reloadlogs').click(function() {
    $('#date_timepicker_start').val('');
    $('#date_timepicker_end').val('');
    $('#search-userid').val('')

    var startDate = '';
    var endDate =  '';
    var searchId = '';
    var gameName = $('.range-disp.betlogs').attr('game');
    var timeZone = 0;
    console.log("searchId", searchId, timeZone);

    var gameText = '';

    if(gameName == 'sicbo') {
      gameText = window.language2.lobby_gamename_sicbo;
    } else if(gameName == 'paigow') {
      gameText = window.language2.lobby_gamename_crazypaigow;
    } else if(gameName == '' || gameName == "allgames") {
      gameText = window.language2.com_sub_menuarea_allgames;
    } else if(gameName == 'dragontiger') {
      gameText = window.language2.lobby_gamename_dragontiger;
    } else if(gameName == 'poker') {
      gameText = window.language2.lobby_gamename_texasholdem;
    } else {
      gameText =  window.language2.lobby_gamename_baccarat;
    }

    bet_records.initRecords('betlogs', gameName, startDate, endDate, searchId, timeZone); // self.eventListener.links[url]

    $('.range-disp.betlogs').html(gameText)
  });

  var vendorname = window.vendorName;
  console.log("vendorname", vendorname.length);
  if(vendorname.length > 5) {
    $('.junket-headername span').addClass('marqueename')
  } else {
    $('.junket-headername span').removeClass('marqueename')
  }
});
