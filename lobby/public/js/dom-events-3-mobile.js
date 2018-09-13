$(document).ready(function(){

  $('#baccarat-mb').click(function() {
    if(!all_tables.length) {return;}
    toggle.hideAll();
    toggle.toggleBaccarat('normal');
    $(this).addClass("active");
    $('#reelgames-mb, #others-mb').removeClass("active")
    $(".header-subnav.language").hide();

    if (parseInt(window.all_tables[0].mainNotice.status)) {
      $('.announcement').addClass("active");
    }
  });

  $('#others-mb').click(function() {
    if(!all_tables.length) {return;}
    toggle.hideAll();
    toggle.toggleOtherGames();
    $(this).addClass("active");
    $('#reelgames-mb, #baccarat-mb').removeClass("active")
    $('.reelgames-container').hide();
    $(".header-subnav.language").hide();

    if (parseInt(window.all_tables[0].mainNotice.status)) {
      $('.announcement').addClass("active");
    }
  });

  $('#reelgames-mb').click(function() {
    if($('#reelgames').hasClass('not-allowed')) return;
    if(!parseInt(window.reel_yn)) return;
    if(!all_tables.length) return;
    toggle.hideAll();
    toggle.toggleReelGames();
    $(this).addClass("active");
    $('#baccarat-mb, #others-mb').removeClass("active")
    reelgames.populateKAGamesList();
  });

  $('.header-logo-mb').click(function() {
    toggle.init();
  });

  toggle.init = function () {
    try {
      toggle.hideAll();
    } catch(err) {

    }
    $(".hot-container").hide();

    if (window.isJunket > 0) {
      $('#baccarat, #othergames, #reelgames').hide()
      toggle.toggleJunket()
      $('#junket').addClass('active');
      $('#junket-baccarat-list').show();
    } else {
      $(".all-container").show();
      toggle.toggleBaccarat();
      $('.header-nav-mb__items, .popup-bg').removeClass('active');
      $("#baccarat-mb").addClass('active');
      $('#junket').hide();
    }
  }
});
