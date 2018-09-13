import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';

var self  =  null;
let route = "/settings";

settings = {
  main () {
    self = this.context;
    this.setBgm(config.bgm);
  },

  setMinMaxVol(type, vol) {
    let postRoute = {};

    if (type == 'dealer') {
      this.voiceVol = vol;
      window.config.voice = vol;
      postRoute = {voice: vol};
      this.setVolume();
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
        $(`#${type}MuteIco`).removeClass('volume-ico-active');
        $(`#${type}MaxIco`).addClass('volume-ico-active');
        $(`#${type}SndSlider`).css({'width': '100%'});
        $(`#${type}SndCircle`).css({'left': '302px'});
      } else {
        $(`#${type}MaxIco`).removeClass('volume-ico-active');
        $(`#${type}MuteIco`).addClass('volume-ico-active');
        $(`#${type}SndSlider`).css({'width': '0%'});
        $(`#${type}SndCircle`).css({'left': '201px'});
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
      // console.log(this.musicInstance.playState)
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
      $(target).children(':first').animate({'margin-left': '2px'}, 'fast');
    }
    else {
      isActive = true;
      $(target).addClass('switch-active');
      $(target).children(':first').css('background', '#307f3e');
      $(target).children(':first').animate({'margin-left': '35px'}, 'fast');
    }

    if ($(target).attr('id') == 'setTheme') {
      window.theme = isActive ? 'black' : 'white';
      // this.context.component_roadmap.changeTheme(window.theme);
      // this.context.component_betDetails.changeTheme(window.theme);
      // this.context.component_roadmap.drawBigRoad(this.context.roadMarks, window.theme);
      // this.context.component_roadmap.fnUpdateCaching();
      // this.context.component_last_result.changeTheme(window.theme);
      $.post(route, {screen: isActive ? 0 : 1}, (response) => { });
    }
    else {
      $.post(route, {tutorial: isActive}, (response) => { });
    }
  },

  setChangeLang(target) {
    $('.flag-active').removeClass('flag-active');
    $(target).addClass('flag-active');

    $.post(route, {language : $(target).attr('value')}, (response) => {
      window.location.reload();
    });
  },

  makeDraggable(element) {
    //Make the DIV element draggagle:
    let context = this;
    let divEl = document.getElementById(element);
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    divEl.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;

      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;

      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      // set the element's new position:
      let newCoorX = divEl.offsetLeft - pos1;
      // divEl.style.top = (divEl.offsetTop - pos2) + "px";
      if (newCoorX < 199 || newCoorX > 302) return;
      divEl.style.left = `${newCoorX}px`;

      context.setVolumeSlider(divEl, newCoorX);
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;

      if ($(divEl).attr('id') == 'dealerSndCircle') {
        context.setVolume();
        window.config.voice = context.voiceVol;
        $.post(route, {voice: context.voiceVol}, (response) => { });
      } else if ($(divEl).attr('id') == 'gameSndCircle') {
        $.post(route, {effect: context.effectVol}, (response) => { config.effect = context.effectVol; });
      } else {
        context.setBgm('', context.musicVol)
        console.log({music: context.musicVol}, "dsfsdsfd")
        $.post(route, {music: context.musicVol}, (response) => { config.music = context.musicVol; });
      }
    }
  },

  setVolume() {
    try {
      window.videoStream.setMuted(false);
      window.videoStream.setVolume(this.voiceVol)
    } catch(err) {

    }
  },

  setVolumeSlider(src, newCoorX) {
    let settingType;
    let newVol = Math.round( ((newCoorX - 199) / 105) * 10 ) / 10;
    console.log($(src).attr('id'), "slider", newVol)
    if ($(src).attr('id') == 'dealerSndCircle') {
      settingType = 'dealer';
      this.voiceVol = newVol;
    } else if($(src).attr('id') == 'musicSndCircle') {
      settingType = 'music';
      this.musicVol = newVol;
    } else {
      settingType = 'game';
      this.effectVol = newVol;
    }

    $(`#${settingType}SndSlider`).css('width', `${newVol*100}%`);

    if (newVol) {
      $(`#${settingType}MaxIco`).addClass('volume-ico-active');
      $(`#${settingType}MuteIco`).removeClass('volume-ico-active');
    } else {
      $(`#${settingType}MuteIco`).addClass('volume-ico-active');
      $(`#${settingType}MaxIco`).removeClass('volume-ico-active');
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
