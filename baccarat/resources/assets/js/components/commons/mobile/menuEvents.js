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
      // Click
      let _this = this;

      // $('.menu-videoquality').attr('data', newQuality)
      // $('#video-quality-text').html(newQuality);

      $('.menu-target').click((e) => {

        let elementAttr = $(e.target).parent().attr('value');
        $('.ico-menu.ico--reload').removeClass('rotate');
        if ($(e.target).parent().hasClass('active')) {
          $(e.target).parent().removeClass('active');
            $(`.modal--${elementAttr}`).hide()
        } else {
          let currentOpen = $('.menu-ico.active').attr('value');
          $('.menu-ico').removeClass('active');
          $(e.target).parent().addClass('active');
          $(`.modal--${currentOpen}`).show()
          $(`.modal--${elementAttr}`).show()
        }

        switch (elementAttr) {
          case 'toggle':
            $(e.target).parent().removeClass('active');
            let count = $('#menu-toggle').children().length;
            let toggle_width = 0;//(count * 75) + (count * 22);
            let toggle_height = 0;

            if (window.innerWidth > window.innerHeight && window.matchMedia("(orientation: landscape)").matches) {
              toggle_width = (count * 75) + (count * 22);
              toggle_height = 0
            } else {
              toggle_width = 0
              toggle_height = (count * 75) + (count * 22);
            }

            if ($('.menu-ico.menu-toggle').hasClass('menu-active')) {
              if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {

                $('#menu-toggle').animate({'height': 0}, {
                  duration: 400,
                  complete: function () {
                    $('#menu-toggle').hide();
                  }
                })
              } else {
                $('.menu-toggle').animate({'margin-left' : 0 }, {
                  duration: 200,
                  complete: function () {
                    $('#menu-toggle').hide();
                  }
                })
              }

              $('.menu-ico.menu-toggle').removeClass('menu-active');

            } else {
              $('.menu-ico.menu-toggle').addClass('menu-active');

              if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
                let height = 380;
                if(window.junket && !_.isEmpty(window.vendorData)) height = 480;
                $('#menu-toggle').animate({'height': height}, {
                  duration: 400,
                  start: function () {
                    $('#menu-toggle').show();
                  }
                })
              } else {
                $('.menu-ico.menu-toggle').addClass('menu-active');
                $('.menu-toggle').animate({'margin-left' : toggle_width}, {
                  duration: 200,
                  start: function () {
                    $('#menu-toggle').show();
                  }
                })
              }
            }
            break;

          case 'video' :
            $(e.target).parent().removeClass('active');
            if ($('.menu-ico.menu-video').hasClass('menu-active')) {
              $('#menu-video').animate({'height' : 0 }, {
                duration: 200,
                complete: function () {
                  $(this).hide();
                }
              })

              $('.menu-ico.menu-video').removeClass('menu-active');

            } else {
              $('.menu-ico.menu-video').addClass('menu-active');
              $('#menu-video').animate({'height' : 154}, {
                duration: 200,
                start: function () {
                  $(this).show();
                }
              })
            }
            break;

          case 'reload' :
            $(e.target).parent().removeClass('active');
            $('.ico-menu.ico--reload').addClass('rotate');
            setTimeout(() => {
              $('.ico-menu.ico--reload').removeClass('rotate');
            },1000)
            try {
              window.videoStream && window.videoStream.load();
            } catch (e) {}
            break;

          case 'video-quality' :
            $(e.target).parent().removeClass('active');
            let newQuality = window.config.video == 'SD' ? 'HD' : 'SD';
            console.log('newQuality',window.config.video, newQuality);
            $(e.target).parent().attr('data', newQuality == 'SD' ? 'HD' : 'SD');
            $('#video-quality-text').html(newQuality == 'SD' ? 'HD' : 'SD');

            this.toggleQuality(newQuality);

            break;
          case 'modifychips' :
            $('.menu-con, #channel').css({'opacity' : 0.05})
            $('.menu-sub__items').css({'pointer-events' : 'none'})
            this.toggleModal('modifychips', true)
            break;
          case 'betlogs':
            this.context.component_betRecords.initRecords('betlogs');
            break;
        } //end switch

      }); //end click

      $('.ico-close').click((e) => {
        let elementAttr = $(e.currentTarget).attr('value');
        this.toggleModal(elementAttr, false);
      });

      $('.btn-changemusic').click(function(event) {
        $('.modal--music').show();
      });



      //  $(document).on('click','.modal-radio-btn', function() {
      //   console.log('click');
      //   var _this = $(this),
      //   block = _this.parent().parent();
      //   block.find('input:radio').attr('checked', false);
      //   block.find(".modal-radio-btn").removeClass('checkedRadio');
      //   if(_this.hasClass('disabled')) {
      //     _this.removeClass('checkedRadio');
      //     _this.find('input:radio').attr('checked', false);
      //   } else {
      //     _this.addClass('checkedRadio');
      //     _this.find('input:radio').attr('checked', true);
      //   }
      // });

      // Video
      $('#vidQualityText').html(window.config.video == 'HD' ? 'SD' : 'HD');
      this.toggleQuality(window.config.video);
    },

    toggleModal(el, state) {
      if(el == 'modifychips') {
        this.context.component_menuChips.visible = !this.context.component_menuChips.visible;
        this.context.component_menuChips.reInitChips();
      } else if(el === 'agent-info') {
        if($("#junket-info").hasClass('active')) {
          $("#junket-info").hide();
          $("#junket-info").removeClass('active');
        }
      } else if(el === 'chat') {
        this.context.component_junketEvents.removeNotif();

        $('.chat-notif-count').attr('value', 0);
        $('.chat-notif-count').empty();

        if($("#junket-info").hasClass('active')) {
          $("#junket-info").hide();
          $("#junket-info").removeClass('active');
        }
      }

      if (!state) {
        $(`.menu-${el}`).removeClass('active')
        $(`.modal--${el}`).hide()
        $('.menu-con, #channel').css({'opacity' : ''})
        $('.menu-sub__items').css({'pointer-events' : ''})
      }
    },

    toggleQuality(newQuality) {
      window.config.video = newQuality;

      // if (newQuality == 'HD') {
      //   window.flashvars.src = window.videostream_url;
      //   swfobject.embedSWF("/osmf/GrindPlayer.swf", "player", "1920", "1080", "10.2", null, window.flashvars, window.params, window.attrs);
      // } else {
      //   window.flashvars.src = window.videostream_url + "_800x450";
      //   swfobject.embedSWF("/osmf/GrindPlayer.swf", "player", "1920", "1080", "10.2", null, window.flashvars, window.params, window.attrs);
      // }

      // this.context.component_menuSettingsEvents.setVolume();

      // $.post('/settings/videoSetting', {type: newQuality}, (response) => { });
    }
  }) // end of blu component
}
