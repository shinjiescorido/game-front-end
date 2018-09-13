/**
 * menuEvents.js
 * @author Kevin Villanueva
 * @since 2018.05.29
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 * Handles all new menu functionalities (DOM)
 **/

export default () => {
  return new blu.Component({
    main() {
      // Hover
      $('.menu-list-bg').hover(function(e) {
        if ($(e.target).hasClass('-list_sub')) return;
        $(this).addClass('menu-list-bg-hover');
        $(`.tooltip-${$(this).attr('value')}`).addClass('center-content');
      }, function(e) {
        $(this).removeClass('menu-list-bg-hover');
        $(`.tooltip-${$(this).attr('value')}`).removeClass('center-content');
      });

      // Click
      $('.menu-list-bg').click((e) => {
        if ($(e.target).hasClass('-list_sub')) return;

        let elementAttr = $(e.currentTarget).attr('value');

        if (elementAttr == 'fullscreen') {
          screenfull.toggle();
          if ($(e.currentTarget).children(':first').attr('fullscreen') == 'true') {
            $(e.currentTarget).children(':first').removeClass('minimize-active');
            $(e.currentTarget).children(':first').attr('fullscreen', 'false');
          } else {
            $(e.currentTarget).children(':first').addClass('minimize-active');
            $(e.currentTarget).children(':first').attr('fullscreen', 'true');
          }

          return;
        } else if (elementAttr == 'betlogs') {
          if (window.junket == 2) return;

          if (!$(e.currentTarget).hasClass('menu-toggled')) {
            $('#modalResult').hide();
            $('.modal-body-betlogs').show();
            this.context.component_betRecords.initRecords('betlogs');
          }
        } else if(elementAttr == 'multibet') {
          if($('#menu-multibet').hasClass('multibet-active')) {
            $('#menu-multibet').removeClass('multibet-active')
          } else {
            $('#menu-multibet').addClass('multibet-active')
          }

          this.context.component_toggle.toggleMultibet();
        } else if (elementAttr == 'howtoplay') {
          // Scroll to top of body
          $('.howto-wrap').animate({
            scrollTop: 0
          }, 100);
        }

        if ($(e.currentTarget).hasClass('menu-toggled')) {
          this.toggleModal(elementAttr, false);
          if(elementAttr !== 'video') {
            if(!this.context.component_multibetv2.isActive) {
              this.toggleTableList(true);
            }
          }
        } else {
          let currentOpen = $('.menu-toggled').attr('value');

          if (elementAttr == 'multibet' && !$('#menu-multibet').hasClass('multibet-active') ) {
            this.toggleModal(currentOpen, true);
          } else {
            this.toggleModal(currentOpen, false);
            this.toggleModal(elementAttr, true);
          }
          if(elementAttr !== 'video') {
            this.toggleTableList(false);
          }
        }
      });

      $('.menu-close-ico').click((e) => {
        if (window.junket == 2) {
          if ($(e.currentTarget).attr('value') == 'betlogs') {
            $('.modal-con--betlogs').hide();
            return;
          }
        }
        let elementAttr = $(e.currentTarget).attr('value');
        this.toggleModal(elementAttr, false);
        if(!this.context.component_multibetv2.isActive) {
          this.toggleTableList(true);
        }
      });

      // Video
      $('#vidQualityText').html(window.config.video == window.language2.com_sub_settings_hd ? window.language2.com_sub_settings_sd : window.language2.com_sub_settings_hd);
      this.toggleQuality(window.config.video);

      $('#menuVidRefresh').click(() => {
        if (this.context.isIpad) {
          this.context.setVideo($('#vidQualityText').html() == 'HD' ? 'SD' : 'HD');
        } else {
          try {
            window.videoStream && window.videoStream.load();
          } catch (e) {}
        }

        this.toggleModal('video')
      });

      $('#menuChangeQuality').click(() => {
        let newQuality = window.config.video == window.language2.com_sub_settings_sd ? window.language2.com_sub_settings_hd : window.language2.com_sub_settings_sd;
        $('#vidQualityText').html(newQuality == window.language2.com_sub_settings_sd ? window.language2.com_sub_settings_hd : window.language2.com_sub_settings_sd);
        this.toggleQuality(newQuality);
      });
    },
    toggleModal(el, state) {
      $('#modalResult').hide();

      if (el == 'result') return;

      if (el == 'video') {
        if ($(`#menu-${el}`).hasClass('menu-toggled')) {
          $('.menu-list-sub').animate({'margin-top': '-63px'}, 'fast', function() {
            $('.menu-list-sub').hide();
          });
          $(`#menu-${el}`).removeClass('menu-toggled');
        } else {
          $('.menu-list-sub').show();
          $('.menu-list-sub').animate({'margin-top': '10px'}, 'fast');
          $(`#menu-${el}`).addClass('menu-toggled');
        }

        return;
      } else if (el == 'chat') {
        this.context.component_junketEvents.removeNotif();

        $('.list-chat-ico').removeClass('-active');
        $('.list-chat-ico').addClass('-inactive');

        $('.chat-notif-count').attr('value', 0);
        $('.chat-notif-count').empty();

        if ($(`#menu-${el}`).hasClass('menu-toggled')) {
          $(`.modal-con--${el}`).hide();
          $(`#menu-${el}`).removeClass('menu-toggled');
        } else {
          $(`.modal-con--${el}`).show();
          $(`#menu-${el}`).addClass('menu-toggled');
        }

        return;
      }

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
      } else {
        $(`#menu-${el}`).removeClass('menu-toggled');
        $(`.modal-con--${el}`).animate({ 'right': '-100%'}, {
          duration: 200,
          complete: function() {
            $(`.modal-con--${el}`).hide();
          }
        });
      }

      $('#menu-multibet').removeClass('menu-toggled');
    },

    toggleQuality(newQuality) {
      window.config.video = newQuality;

      if (this.context.isIpad) {
        this.context.setVideo(newQuality);
      } else {
        if (newQuality == window.language2.com_sub_settings_hd) {
          window.flashvars.src = window.videostream_url;
          swfobject.embedSWF("/osmf/GrindPlayer.swf", "player", "1920", "1080", "10.2", null, window.flashvars, window.params, window.attrs);
        } else {
          window.flashvars.src = window.videostream_url + "_800x450";
          swfobject.embedSWF("/osmf/GrindPlayer.swf", "player", "1920", "1080", "10.2", null, window.flashvars, window.params, window.attrs);
        }

        this.context.component_menuSettingsEvents.setVolume();
      }

      $('.menu-list-sub').animate({'margin-top': '-63px'}, 'fast', function() {
        $('.menu-list-sub').hide();
      });
      $('#menu-video').removeClass('menu-toggled');

      $.post('/settings/videoSetting', {type: newQuality}, (response) => { });
    },
    toggleTableList (visible) {
      if(!visible) {
        $("#table-redirect-list").removeClass('show');
        $("#table-redirect-list").css({
          'right' : '-13%'
        });
        $("#table-redirect-list > .button-list").removeClass('hide');

        $("#roadmap-container").hide();
        $("#roadmap-list-container").hide();

        if(this.context.component_multibetv2.eyeRoadmap) {
          this.context.component_multibetv2.eyeRoadmap.eye.removeAllChildren();
          this.context.component_multibetv2.eyeRoadmap = null;
        }
      } else {
        $("#table-redirect-list").css({
          'right' : '-10.45%'
        });
      }
    }
  }) // end of blu component
}
