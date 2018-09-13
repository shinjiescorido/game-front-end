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
      let dealerVol = window.config.voice * 105;
      $('#dealerSndCircle').css('left', (dealerVol + 205) - 7);
      $('#dealerSndSlider').css('width', `${(parseFloat(window.config.voice) * 100)}%`);

      let gameVol = window.config.effect * 105;
      $('#gameSndCircle').css('left', (gameVol + 205) - 7);
      $('#gameSndSlider').css('width', `${(parseFloat(window.config.effect) * 100)}%`);

      let musicVol = window.config.music * 105;
      $('#musicSndCircle').css('left', (musicVol + 205) - 7);
      $('#musicSndSlider').css('width', `${(parseFloat(window.config.music) * 100)}%`);
      this.makeDraggable('musicSndCircle');

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
      $(`.items_music-${window.config.bgm}`).addClass('-selected');
      $('.music-active').text(`${window.language2.com_sub_settings_music} ${window.config.bgm}`);

      $('.music-list__items').off().on('click', (e) => {
        let chosenMusic = $(e.currentTarget).attr('value');
        $('.music-active').text(`${window.language2.com_sub_settings_music} ${chosenMusic}`);
        $('.-selected').removeClass('-selected');
        $(e.currentTarget).addClass('-selected');

        this.setBgm(chosenMusic);
        $.post(route, {bgm: chosenMusic}, (response) => { config.bgm = chosenMusic; });

        $('.music-active').removeClass('-active');
        $('.music-list-con').animate({'height':'0'},{
          duration : 200,
          complete : function () {
            $('.music-list-con').hide()
          }
        });
      });

      $('.music-dropdown-con').off().on('click', (e) => {
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

      // Display
      if (window.config.screen == 'black') {
        $('#setTheme').addClass('switch-active');
        $('#setThemeCircle').css({'margin-left': '35px', 'background': '#327e3e'});
      }
      if (window.config.tutorial == 'true') {
        $('#setTut').addClass('switch-active');
        $('#setTutCircle').css({'margin-left': '35px', 'background': '#327e3e'});
      }
      $('.settings-switch-bg').click((e) => {
        this.setSwitchToggle(e.currentTarget);
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

      // Flag
      $(`.flag-${window.config.language}`).addClass('flag-active');
      $('.flag-con').click((e) => {
        this.setChangeLang(e.currentTarget);
      });

      // Avatar
      let avatar = window.config.default.split("_")[0];
      avatar = avatar == 'blue' ? `black_${window.config.default.split("_")[1]}` : `${window.config.default.split("_")[0]}_${window.config.default.split("_")[1]}`;

      $(`.-${avatar}`).addClass('avatar-active');
      $('.avatar-con').click((e) => {
        window.config.default = $(e.currentTarget).attr('avatar');
        this.context.component_betDetails.setUserAvatar();

        $('.avatar-active').removeClass('avatar-active');
        $(e.currentTarget).addClass('avatar-active');
        $.post(route, {default: $(e.currentTarget).attr('value')}, (response) => { });
      });

      if (!parseInt(window.vendorSound)) {
        $('#dealerSndCircle, #dealerSndSlider, #gameSndCircle, #gameSndSlider').addClass('disable-sound');
        $('#dealerMaxIco, #dealerMuteIco, #gameMaxIco, #gameMuteIco').removeClass('volume-ico-active');
        $('#dealerMaxIco, #dealerMuteIco, #gameMaxIco, #gameMuteIco').css({cursor: 'default'});

        $('#dealerMaxIco, #dealerMuteIco, #gameMaxIco, #gameMuteIco').unbind('click');
      } else {
        this.makeDraggable('dealerSndCircle');
        this.makeDraggable('gameSndCircle');
      }
      
      this.setVolume();
      this.setBgm(window.config.bgm);
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
        this.effectVol = vol;
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
        this.context.component_roadmap.changeTheme(window.theme);
        this.context.component_betDetails.changeTheme(window.theme);
        this.context.component_cardExtra.changeTheme(window.theme);
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
        $(`#${settingType}MaxIco`).addClass('volume-ico-active');
        $(`#${settingType}MuteIco`).removeClass('volume-ico-active');
      } else {
        $(`#${settingType}MuteIco`).addClass('volume-ico-active');
        $(`#${settingType}MaxIco`).removeClass('volume-ico-active');
      }
    }
  })
}
