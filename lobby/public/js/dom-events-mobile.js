$(document).ready(function(){

  $.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').appendTo(document.body);
    var htmlText = text || this.val() || this.text();
    htmlText = $.fn.textWidth.fakeEl.text(htmlText).html(); //encode to Html
    htmlText = htmlText.replace(/\s/g, "&nbsp;"); //replace trailing and leading spaces
    $.fn.textWidth.fakeEl.html(htmlText).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
  };
  let total = 0;
  let count = 0
  $('.header-sub-mb__items').click(function() {
    total = 0;
    count = 0;
    if($(this).find('.header-subnav-mb__items').length) {
      $(this).find('.header-subnav-mb__items').each (function() {
           width = $(this).width();
           count++;
          total += width;
          console.log("width:", width);
      })

      if($(this).hasClass('-baccarat-mb')) {
        if(window.language.locale == "jp") {
          $(this).find('.header-subnav-mb').css({ width: 281 })
        } else if(window.language.locale == "zh") {
          $(this).find('.header-subnav-mb').css({ width: 215 })
        } else if(window.language.locale == "kr") {
            $(this).find('.header-subnav-mb').css({ width: 238})
        } else if(window.language.locale == "th") {
          $(this).find('.header-subnav-mb').css({ width: 280 })
        } else {
          $(this).find('.header-subnav-mb').css({ width: 280})
        }
      } else {
        if(window.language.locale == "jp") {
          $(this).find('.header-subnav-mb').css({ width: 265 })
        } else if(window.language.locale == "zh") {
          $(this).find('.header-subnav-mb').css({ width: 182})
        } else if(window.language.locale == "kr") {
          $(this).find('.header-subnav-mb').css({ width: 225 })
        } else if(window.language.locale == "th") {
          $(this).find('.header-subnav-mb').css({ width: 260})
        } else {
          $(this).find('.header-subnav-mb').css({ width: 260})
        }
      }
    }  else {
      total = 0;
      count = 0;
    }

  });

  toggle.init = function () {
    toggle.toggleBaccarat("normal");
    $(".header-sub-mb").css({'display':'none'});
    $(".header-sub-mb.-livegames-sub").css({'display':'block'});
    $(".header-sub-mb__items.-baccarat-mb").addClass('active');
    $("#baccarat-classic-mb").addClass('active');
    $("#livegames-mb").addClass('active');
    $("#reelgames-mb").removeClass('active');
  }

  function removeactiveSub() {
    $(".header-subnav-mb__items").removeClass("active");
    $(".header-subnav-mb__items.-baccarat-classic-mb").addClass("active");
    $(".header-subnav-mb__items.-sicbo-classic-mb").addClass("active");
    $(".header-subnav-mb__items.-paigow-classic-mb").addClass("active");
  }

  $('#avatar').attr("src", "/img/avatar/"+window.config.default+'.png');

  if(window.language.lobby.transactioncaps == "TRANSACTION") {
    $("#transaction-mb span").text("TRANS");
  }

  if(window.language.lobby.bethistorycaps == "BET HISTORY") {
    $("#history-mb span").text("HISTORY");
  }

  if(window.language.lobby.howtoplaycaps == "HOW TO PLAY") {
    $("#howtoplay-mb span").text("HOW TO");
  }

  $('.header-logo-mb').click(function() {
    // toggle.toggleMain();
    // $('.header-sub-mb').css({'display' : 'none'});
    $(".header-sub-mb__items").removeClass('active');
    $('.header-subnav-mb').hide();
    toggle.init();
  });

  if(window.reel_yn == 0) {
    $('#reelgames-mb').addClass('not-allowed');
    $('#themedgames-mb').addClass('not-allowed');
    $('#themedgames-mb .comingsoon-mb').show();
    $('#reelgames-mb').css('display', '');
  } else if(window.reel_yn == 2) {
    $('#reelgames-mb').css('display', 'none');
  } else  {
    $('#reelgames-mb').removeClass('not-allowed');
    $('#themedgames-mb').removeClass('not-allowed');
    $('#themedgames-mb .comingsoon-mb').hide();
    $('#reelgames-mb').css('display', '');
  }

  // if( window.game_settings.sicbo == 1 || window.game_settings.paigow == 1) {
  //   $('#reelgames-mb').addClass('not-allowed');
  // } else  {
  //   $('#reelgames-mb').removeClass('not-allowed');
  // }

  $('.header-nav-mb__items').click(function() {
    var $items = $(this);
    if($items.hasClass('not-allowed')) return;
    removeactiveSub()
    $('.header-sub-mb__items').removeClass('active');
    $('.header-subnav-mb').hide();
    if($items.attr('id') == 'livegames-mb') {
      $items.addClass('active').siblings().removeClass('active');
      toggle.toggleBaccarat("normal");
      $(".header-sub-mb").css({'display':'none'});
      $(".header-sub-mb.-livegames-sub").css({'display':'block'});
      $(".header-sub-mb__items.-baccarat-mb").addClass('active');
      $("#baccarat-classic-mb").addClass('active');
    }
    if($items.attr('id') == 'themedgames-mb') {
      if($items.hasClass('not-allowed')) return;
      $items.addClass('active').siblings().removeClass('active');
      toggle.togglePaigowClassic();
      $(".header-sub-mb").css({'display':'none'});
      $(".header-sub-mb.-themedgames-sub").css({'display':'block'});
      $(".header-sub-mb__items.-paigow-mb").addClass('active');
    }
    else if($items.attr('id') == 'reelgames-mb') {
      if($items.hasClass('not-allowed')) return;
      $items.addClass('active').siblings().removeClass('active');
      toggle.toggleReelGames();
      $(".header-sub-mb").css({'display':'none'});
      $(".header-sub-mb.-reelgames-sub").css({'display':'block'});
      $(".header-sub-mb__items.-kaga-mb").addClass('active');
    }
    else if($items.attr('id') == 'history-mb') {
      $items.addClass('active').siblings().removeClass('active');
      $(".header-sub-mb").css({'display':'none'});
      toggle.togglePopups('bethistory');
    }
    else if($items.attr('id') == 'transaction-mb') {
      $items.addClass('active').siblings().removeClass('active');
      $(".header-sub-mb").css({'display':'none'});
      toggle.togglePopups('transhistory');
    }
    else if($items.attr('id') == 'howtoplay-mb') {
      $items.addClass('active').siblings().removeClass('active');
      $(".header-sub-mb").css({'display':'none'});
      $(".howto-wrap-m").css({'display':'block'});
      toggle.togglePopups('howto');
    }
  });

  $('.header-setting-con').click(function() {
      toggle.togglePopups('settings');
      $('.header-nav-mb__items').removeClass('active');
      $('.header-sub-mb').css({'display':'none'})
      $("#popup-settings").show();
  });

  $('.ico-logout.-mb').click(function() {
    $('.popup-mb-container').css({'top': '13.4%'}).show()
    $("#popup-logout").show();
  });

  $('.header-sub--target').click(function(e) {
    var $items = $(this);
    $items.parent().addClass('active').siblings().removeClass('active');
    $('.header-subnav__sortlist').hide();
    $('.header-subnav__sort').removeClass('open').hide();
    if($items.attr('id') == 'baccarat-mb') {

      toggle.toggleBaccarat('normal');
      $(".-supersix-mb").removeClass('active');
      $(".-bonusbaccarat-mb").removeClass('active');
      $(".-baccarat-classic-mb").addClass('active');

      $('#sicbo-sub, #paigow-sub').hide();
      $('#baccarat-sub').toggle();
    }
    else if($items.attr('id') == 'poker-mb') {
      $(".header-subnav-mb").css({'display':'none'});
      toggle.togglePoker();
    }
    else if($items.attr('id') == 'sicbo-mb') {
      $('#baccarat-sub, #paigow-sub').hide();
      toggle.toggleSicbo();
      $('.-userbased-mb').removeClass('active');
      $('.-sicbo-classic-mb').addClass('active');

      if(!parseInt(window.is_room)) {
        toggle.toggleSicbo();
        $('#sicbo-sub').hide();
      } else {
          $('#sicbo-sub').toggle();
      }
      // toggle.toggleSicbo();
    }
    else if($items.attr('id') == 'paigow-mb') {
      $('#sicbo-sub, #baccarat-sub').hide();
      // $(".header-subnav-mb").css({'display':'none'});
      toggle.togglePaigowClassic();
      // if(!parseInt(window.is_room)) {
      //   toggle.togglePaigowClassic();
      //   $('#paigow-sub').hide();
      // } else {
      //   $('#paigow-sub').toggle();
      // }
    }
    else if($items.attr('id') == 'dragontiger-mb') {
      $(".header-subnav-mb").css({'display':'none'});
      toggle.toggledragonTiger();
    }
    else if($items.attr('id') == 'all-mb') {
      $(".header-subnav-mb").css({'display':'none'});
      toggle.toggleReelGames();
    }
    else if($items.attr('id') == 'kaga-mb') {
      $(".header-subnav-mb").css({'display':'none'});
      toggle.toggleReelGames('ka_gaming');
    }
    else if($items.attr('id') == 'betsoft-mb') {
      $(".header-subnav-mb").css({'display':'none'});
      $items.parent().removeClass('active');
    }
  });

  $('.header-nav-mb__items').click(function() {
    $('.header-subnav__sort').hide();
  });

  $('.header-subnav-mb__items').click(function() {
    var $items = $(this);
    $items.addClass('active').siblings().removeClass('active');
    $(".header-subnav-mb").css({'display':'none'});
    $('.header-subnav__sort').hide();

    if($items.attr('id') == 'baccarat-classic-mb') {
      $("#baccarat-sub").removeClass('active');
      toggle.toggleBaccarat("normal");
    }
    else if($items.attr('id') == 'baccarat-supersix-mb') {
      toggle.toggleBaccarat("supersix");
    }
    else if($items.attr('id') == 'baccarat-bonus-mb') {
      toggle.toggleBaccarat("dragonbonus");
    }
    else if($items.attr('id') == 'sicbo-classic-mb') {
      toggle.toggleSicbo();
    }
    else if($items.attr('id') == 'paigow-classic-mb') {
      toggle.togglePaigowClassic();
    }
    else if($items.attr('id') == 'sicbo-userbased-mb') {
      toggle.toggleUserBased("Sicbo");
      $(".header-subnav__sort.-sicbo").show();
    }
    else if($items.attr('id') == 'paigow-userbased-mb') {
      toggle.toggleUserBased("Paigow");
      $(".header-subnav__sort").show();
    }
  });

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

  $('#roomname').val($('.dropdown-con > span').text());

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

    console.log("capital", $('.radio-capital:checked').val());

    if($("input[name='is_private']").is(':checked')) {
      $('.createroom__boxcon.-password, .createroom-input-con.-password').show();
    } else {
      $('.createroom__boxcon.-password, .createroom-input-con.-password').hide();
    }

  });

  $('.btn-failed').on('click', function() {
    $("#popup-failed").animate({
      top: '-100%',
      opacity : 0
    }, 200)
    setTimeout( function() {
      $("#popup-failed").hide();
      $(".popup-mb-container").removeClass("isShow").hide();
    }, 200)
  });

});
