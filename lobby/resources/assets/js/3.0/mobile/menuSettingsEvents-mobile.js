import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../../factories/factories';

var self  =  null;
let route = "/settings";


settings = {
  main () {
    self = this.context;
    this.setBgm(config.bgm);
  },

  makeDraggable(element) {
    //Make the DIV element draggagle:
    let context = this;
    let divEl = document.getElementById(element);
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // divEl.ontouchstart = dragMouseDown;

    divEl.addEventListener('touchstart', function(e) {
      // Cache the client X/Y coordinates
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
    }, false);

    divEl.addEventListener('touchend', (e) => {
      document.onmouseup = null;
      document.onmousemove = null;

      if ($(divEl).attr('id') == 'dealerSndCircle') {
        context.setVolume(context.voiceVol);
        window.config.voice = context.voiceVol;
        $.post(route, {voice: context.voiceVol}, (response) => { });
      } else if ($(divEl).attr('id') == 'gameSndCircle') {
        $.post(route, {effect: context.effectVol}, (response) => { config.effect = context.effectVol; });
      } else {
        context.setBgm('', context.musicVol)
        $.post(route, {music: context.musicVol}, (response) => { config.music = context.musicVol; });
      }
    });

    divEl.addEventListener('touchmove', (e) => {
      e = e || window.event;
      // calculate the new cursor position:
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;

      // set the element's new position:
      let newCoorX = divEl.offsetLeft - pos1;
      if (newCoorX < 60 || newCoorX > 310 ) return;
      divEl.style.left = `${newCoorX}px`;

      this.setVolumeSlider(divEl, newCoorX);
    });
  },

  setVolume() {
    try {
      window.videoStream.setMuted(false);
      window.videoStream.setVolume(this.voiceVol)
    } catch(err) {

    }
  },

  setChangeLang(target) {
    $('.flag-con.active').removeClass('active');
    $(target).addClass('active');

    $.post(route, {language : $(target).attr('value')}, (response) => {
      window.location.reload();
    });
  },

  setVolumeSlider(src, newCoorX) {
    let settingType;
    let newVol = Math.round( ((newCoorX - 60) / 250) * 10 ) / 10;

    if ($(src).attr('id') == 'dealerSndCircle') {
      settingType = 'dealer';
      this.voiceVol = newVol;
    } else if ($(src).attr('id') == 'gameSndCircle') {
      settingType = 'game';
      this.effectVol = newVol;
    } else {
      settingType = 'music';
      this.musicVol = newVol;
    }

    $(`#${settingType}SndSlider`).css('width', `${newVol*100}%`);

    if (newVol) {
      $(`#${settingType}MaxIco`).addClass('active');
      $(`#${settingType}MuteIco`).removeClass('active');
      $(`#${settingType}SndCircle`).addClass('active');
    } else {
      $(`#${settingType}MuteIco`).addClass('active');
      $(`#${settingType}MaxIco`).removeClass('active');
      $(`#${settingType}SndCircle`).removeClass('active');
    }
  },

  setMinMaxVol(type, vol) {
    let postRoute = {};

    if (type == 'dealer') {
      this.voiceVol = vol;
      window.config.voice = vol;
      postRoute = {voice: vol};
      this.setVolume(vol);
    } else if (type == 'game') {
      this.effectVol = vol;
      window.config.effect = vol;
      postRoute = {effect: vol};
    } else {
      this.setBgm('', vol);
      this.musicVol = vol;
      window.config.bgm = vol;
      postRoute = {music: vol};
    }

    $.post(route, postRoute, (response) => {
      if (vol) {
        $(`#${type}MuteIco`).removeClass('active');
        $(`#${type}MaxIco`).addClass('active');
        $(`#${type}SndSlider`).css({'width': '100%'});
        $(`#${type}SndCircle`).css({'left': '310px'}).addClass('active');
      } else {
        $(`#${type}MaxIco`).removeClass('active');
        $(`#${type}MuteIco`).addClass('active');
        $(`#${type}SndSlider`).css({'width': '0%'});
        $(`#${type}SndCircle`).css({'left': '62px'}).removeClass('active');
      }
    });
  },

  setBgm(music, volume = 'changeBgm') {
    if (volume != 'changeBgm') {
      this.musicInstance.volume = volume;
      return;
    }

    if (this.musicInstance) {
      this.musicInstance.stop();
    }

    this.musicInstance = createjs.Sound.play(`music_${music}`, {loop:-1});
    this.musicInstance.volume = config.music;

    var intervaler = setInterval(() => {
      if(this.musicInstance && this.musicInstance.playState == 'playSucceeded') {
        clearInterval(intervaler);
        return;
      }
      this.setBgm(window.config.bgm);
    }, 1000);
  },

  setSwitchToggle(target) {
    let isActive;
    if ($(target).hasClass('switch-active')) {
      isActive = false;
      $(target).removeClass('switch-active');
      $(target).children(':first').css('background', '#d42e30');
      $(target).children(':first').animate({'margin-left': '5px'}, 'fast');
    }
    else {
      isActive = true;
      $(target).addClass('switch-active');
      $(target).children(':first').css('background', '#307f3e');
      $(target).children(':first').animate({'margin-left': '63px'}, 'fast');
    }

    if ($(target).attr('id') == 'setTheme') {
      window.theme = isActive ? 'black' : 'white';
      $.post(route, {screen: isActive ? 0 : 1}, (response) => { });
    }
    else {
      $.post(route, {tutorial: isActive}, (response) => { });
    }
  },

  setUserAvatar() {
    let avatar = window.config.default.split("_")[0];
    avatar = avatar == 'blue' ? `blue_${window.config.default.split("_")[1]}` : `${window.config.default.split("_")[0]}_${window.config.default.split("_")[1]}`;
    let url = $('.userinfo__avatar img').attr('src');
    let new_image = `${avatar}.png`;
    var new_url = url.replace(url.substring(url.lastIndexOf('/')+1), new_image);
    $(".userinfo__avatar img").attr("src",new_url);
  }


}
export default {
	settings
}
