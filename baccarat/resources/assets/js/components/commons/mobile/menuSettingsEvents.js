/**
* settingsEvents.js
* @author Kevin Villanueva
* @since 2018.05.28
* @version 1.0
* Copyright (C) 2018 Blue Frog INC. All rights reserved.
* Handles all new menu settings functionalities (DOM)
**/

export default () => {
  let route = "/settings";

  return new blu.Component({
    main() {
      // Volume
      let this_ = this;
      let voice = parseFloat(window.config.voice);
      // voice = voice> 0? voice+0.1: voice;
      let dealerVol = voice* 250;
      $('#dealerSndCircle').css('left', (dealerVol + 60));
      $('#dealerSndSlider').css('width', `${(voice* 100)}%`);
      this.makeDraggable('dealerSndCircle');

      let effect = parseFloat(window.config.effect);
      // effect = effect> 0? effect+0.1: effect;
      let gameVol = effect * 250;
      $('#gameSndCircle').css('left', (gameVol + 60));
      $('#gameSndSlider').css('width', `${(effect * 100)}%`);
      this.makeDraggable('gameSndCircle');

      let music = parseFloat(window.config.music);
      // music = music> 0? music+0.1: music;
      let musicVol = music * 250;
      $('#musicSndCircle').css('left', (musicVol + 60));
      $('#musicSndSlider').css('width', `${( music* 100)}%`);
      this.makeDraggable('musicSndCircle');

      if (parseFloat(window.config.voice) > 0) {
        $('#dealerMaxIco').addClass('active');
        $('#dealerSndCircle').addClass('active');
      } else {
        $('#dealerSndCircle').removeClass('active');
        $('#dealerMuteIco').addClass('active');
      }

      if (parseFloat(window.config.effect) > 0) {
        $('#gameMaxIco').addClass('active');
        $('#gameSndCircle').addClass('active');
      } else {
        $('#gameSndCircle').removeClass('active');
        $('#gameMuteIco').addClass('active');
      }

      if (parseFloat(window.config.music) > 0) {
        $('#musicMaxIco').addClass('active');
        $('#musicSndCircle').addClass('active');
      } else {
        $('#musicSndCircle').removeClass('active');
        $('#musicMuteIco').addClass('active');
      }

      // Display
      if (window.config.screen == 'black') {
        $('#setTheme').addClass('switch-active');
        $('#setThemeCircle').css({'margin-left': '63px', 'background': '#327e3e'});
      }
      if (window.config.tutorial == 'true') {
        $('#setTut').addClass('switch-active');
        $('#setTutCircle').css({'margin-left': '63px', 'background': '#327e3e'});
      }
      $('.settings-switch-bg').click((e) => {
        this.setSwitchToggle(e.currentTarget);
      });

      // Flag
      $(`.flag-${window.config.language}`).addClass('active');
      $('.flag-con').click((e) => {
        this.setChangeLang(e.currentTarget);
      });

      // Avatar
      $(`.modal-avatar-con.-${window.config.default}`).addClass('active');
      $('.modal-avatar-con').click((e) => {
        window.config.default = $(e.currentTarget).attr('avatar');
        this.context.component_betDetails.setUserAvatar();

        $('.modal-avatar-con.active').removeClass('active');
        $(e.currentTarget).addClass('active');
        $.post(route, {default: $(e.currentTarget).attr('value')}, (response) => { });
      });

      //clicking the icon
      $('#dealerMuteIco').on('click', () => {
        this.setMinMaxVol('dealer', 0);
      })
      $('#dealerMaxIco').on('click', () => {
        this.setMinMaxVol('dealer', 1);
      });

      $('#gameMuteIco').on('click', () => {
        this.setMinMaxVol('game', 0);
      });
      $('#gameMaxIco').on('click', () => {
        this.setMinMaxVol('game', 1);
      });

      $('#musicMuteIco').on('click', () => {
        this.setMinMaxVol('music', 0);
      });
      $('#musicMaxIco').on('click', () => {
        this.setMinMaxVol('music', 1);
      });


      $(document).off().on('click','.btn-music--apply', function() {
        let music = $(`.music:checked`).data('value');
        this_.setBgm(music);
        $.post(route, {bgm: music}, (response) => { config.bgm = music; });
        $('.modal--music').hide();
      });

      $('.btn-music--cancel').click((e) => {
        let elementAttr = $(e.currentTarget).attr('value');
        $('.modal--music').hide();
      });


      $(document).on('click','.modal-radio-btn', function() {
        var _this = $(this),
        block = _this.parent().parent();
        block.find('input:radio').attr('checked', false);
        block.find(".modal-radio-btn").removeClass('checkedRadio');
        if(_this.hasClass('disabled')) {
          _this.removeClass('checkedRadio');
          _this.find('input:radio').attr('checked', false);
        } else {
          _this.addClass('checkedRadio');
          _this.find('input:radio').attr('checked', true);
        }
      });

      this.setBgm(window.config.bgm);
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
        this.effectVol = vol;
        window.config.bgm = vol;
        postRoute = {music: vol};
      }

      $.post(route, postRoute, (response) => {
        if (vol) {
          $(`#${type}MuteIco`).removeClass('active');
          $(`#${type}MaxIco`).addClass('active');
          $(`#${type}SndSlider`).css({'width': '100%'});
          $(`#${type}SndCircle`).css({'left': '305px'}).addClass('active');
        } else {
          $(`#${type}MaxIco`).removeClass('active');
          $(`#${type}MuteIco`).addClass('active');
          $(`#${type}SndSlider`).css({'width': '0%'});
          $(`#${type}SndCircle`).css({'left': '62px'}).removeClass('active');
        }
      });
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
        // this.context.component_roadmap.changeTheme(window.theme);
        // this.context.component_gameroute.changeTheme(window.theme);
        // this.context.component_betDetails.changeTheme(window.theme);
        // this.context.component_playerTileResult.changeTheme(window.theme);
        // this.context.component_lines.changeTheme(window.theme);
        this.context.component_betDetails.changeTheme(window.theme);
        this.context.component_roadmap.changeTheme(window.theme);

        this.context.component_roadmap.fnUpdateCaching(true)
        $.post(route, {screen: isActive ? 0 : 1}, (response) => { });
      }
      else {
        $.post(route, {tutorial: isActive}, (response) => { });
      }
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
    },

    setChangeLang(target) {
      $('.flag-con.active').removeClass('active');
      $(target).addClass('active');

      $.post(route, {language : $(target).attr('value')}, (response) => {
        window.location.reload();
      });
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

        context.setVolumeSlider(divEl, newCoorX);
      });
    },

    setVolume(value) {
      this.context.playerVid.volume = value;
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
    }
  })
}
