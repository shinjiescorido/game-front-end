import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';

var self  =  null;
let current_open = 'main';
let current_state = 'thumbnail';

toggle = {

  main () {
    self = this.context;
  },

  init() {
    try {
      this.hideAll();
    } catch(err) {

    }
    $(".hot-container").hide();

    if (window.isJunket > 0) {
      $('#baccarat, #othergames, #reelgames').hide()
      this.toggleJunket()
      $('#junket').addClass('active');
      $('#junket-baccarat-list').show();
    } else {
      $(".all-container").show();
      this.toggleBaccarat('normal');
      $('.header-game__items').removeClass('active');
      $(".header-subnav.reelgames, .header-subnav.language").hide();
      $("#baccarat").addClass('active');
      $("#reelgames, #othergames, .popup-bg").removeClass('active');
      $('#junket').hide();
    }
  },

  hideAll () {
    $("#popup-howto").hide();
    $("#popup-history").hide();

    $("#bet-history").hide();
    $("#trans-history").hide();
    $("#popup-settings").hide();
    $("#popup-language").hide();
    $(".tables-container").hide();
    $(".header-subnav.language").hide();
    $(".howto-wrap").hide();
    $(".table-thumbnail").hide();
    $(".table-list").hide();
    $('#junket-other').removeClass('active')

    let arrayElement = ["#sicbo-toggle","#poker-toggle","#baccarat-toggle","#dragontiger-toggle","#paigow-toggle","#red-white-toggle","#bigwheel-toggle","#roulette-toggle"];

    arrayElement.forEach((e) => {
      $(e).hide();
    });

  },
  currentOpen : 'baccarat', // default current open
  getCurrentOpen: function () {
    return this.currentOpen;
  },
  open_popup : null,
  togglePopups (type) {
    let timeout = 0;

    setTimeout ( () => {
    }, timeout)

    this.open_popup = type;
  },

  toggleModalMenu(el, state) {
    $('#modalResult').hide();

    if (el == 'result') return;

    if (state) {
      let adjust = '0px';
      $('.menu-toggled').removeClass('menu-toggled');
      $(`#menu-${el}`).addClass('menu-toggled');
      $(`.modal-con--${el}`).animate({'right': adjust}, {
        duration: 200,
        start: function() {
          $(`.modal-con--${el}`).show();
        }
      });
      if(el == 'howtoplay') {
        // $('.howto-submenu').animate({'right': '25.2%'}, 200)
        $('.howto-wrap, #baccarat-toggle').show();
        // $('.howto-wrap').animate({'right': 0}, {
        //   duration: 200,
        //   start: function() {
        //     $('.howto-wrap, #baccarat-toggle').show();
        //   }
        // });
      }

    } else {
      $(`#menu-${el}`).removeClass('menu-toggled');
      $(`.modal-con--${el}`).animate({ 'right': '-100%'}, {
        duration: 200,
        complete: function() {
          $(`.modal-con--${el}`).hide();
        }
      });
      if(el == 'howtoplay') {
        // $('.howto-submenu').animate({'right': '-100%'}, 200)
        $('.howto-wrap, #baccarat-toggle').hide();
        // $('.howto-wrap').animate({'right': '-100%'}, {
        //   duration: 200,
        //   start: function() {
        //     $('.howto-wrap, #baccarat-toggle').hide();
        //   }
        // });
      }
    }
  },

  toggleBaccarat() {
    if(!window.all_tables.length) return;
    self = this.context;
    $(".canvas-container").removeClass("othergames junket reelgames").addClass("baccarat");
    $("#other-container, #junket-container, #reelgames-container").hide();
    $("#all-container").show();
    $('.notification-container').addClass('toggle');
    this.currentOpen = 'baccarat';
    // self.forceStopTick();
    return;
  },

  toggleOtherGames() {
    if(!window.all_tables.length) return;
    self = this.context;
    $(".canvas-container").removeClass("baccarat junket reelgames").addClass("othergames");
    $("#all-container, #junket-container, #reelgames-container").hide();
    $("#other-container").show();
    this.currentOpen = 'othergames';
    // self.forceStopTick();
    return;
  },

  toggleReelGames() {
    if(!window.all_tables.length) return;
    self = this.context;
    $(".canvas-container").removeClass("baccarat othergames").addClass("reelgames");
    $("#all-container, #other-container, #junket-container").hide();
    $("#reelgames-container").show();
    this.currentOpen = 'reelgames';
    return;
  },

  toggleJunket() {
    if(!window.all_tables.length) return;
    self = this.context;
    $(".canvas-container").removeClass("othergames reelgames").addClass("junket");
    $("#all-container, #other-container, #reelgames-container").hide();
    $("#junket-container").show();
    this.currentOpen = 'junket';
    return;
  },

}

// window.toggle = toggle;

export default {
  toggle
}
