import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';

var self  =  null;
let current_open = 'main';
let current_state = 'thumbnail';

toggle = {

  main () {
    self = this.context;
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
    $(".menu-con").css('display', '');
    $('#junket-other').removeClass('active')

    let arrayElement = ["#sicbo-toggle","#poker-toggle","#baccarat-toggle","#dragontiger-toggle","#paigow-toggle","#red-white-toggle","#bigwheel-toggle","#roulette-toggle"];
    arrayElement.forEach((e) => {
      $(e).hide();
    });
  },

  toggleModalMenu(el, state) {
    $('#modalResult').hide();

    if (el == 'result') return;

    if (state) {
      let adjust = '0px';
      $('.menu-toggled').removeClass('menu-toggled');
      $(`#menu-${el}`).addClass('menu-toggled');
      $(`.modal-con--${el}`).show();
      if(el == 'howtoplay') {
        $('.howto-wrap, #baccarat-toggle').show();
      }
    } else {
      $(`#menu-${el}`).removeClass('menu-toggled');
      $(`.modal-con--${el}`).hide();
      if(el == 'howtoplay') {
        $('.howto-wrap, #baccarat-toggle').hide();
      }
    }
  },

  toggleBaccarat() {
    if(!window.all_tables.length) return;
    self = this.context;
    $(".super-container").removeClass("othergames reelgames").addClass("baccarat");
    $("#othergames-container, #reelgames-container").hide();
    $("#baccarat-container").show();
    $('.notification-container').addClass('toggle');
    this.currentOpen = 'baccarat';
    return;
  },

  toggleOtherGames() {
    if(!window.all_tables.length) return;
    self = this.context;
    $(".super-container").removeClass("baccarat reelgames").addClass("othergames");
    $("#baccarat-container, #reelgames-container").hide();
    $("#othergames-container").show();
    this.currentOpen = 'othergames';
    // self.forceStopTick();
    return;
  },

  toggleReelGames() {
    if(!window.all_tables.length) return;
    self = this.context;
    $(".super-container").removeClass("baccarat othergames").addClass("reelgames");
    $("#baccarat-container, #othergames-container").hide();
    $("#reelgames-container").show();
    this.currentOpen = 'reelgames';
    return;
  },


}


export default {
  toggle
}
