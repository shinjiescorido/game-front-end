let instance = null;

export default() => {

  instance = instance || new blu.Component({
    pinned : false,
    info_toggled : false,
    main() {
      let width = 220;
      let dividend;
      if (window.casino == 'SS') {
        dividend = 1000;
      }
      else {
        dividend = 1;
      }

      $("#exit").on("click", ()=>{
        window.location = window.lobby_domain;
      });

      $('.maintenance-close').on("click", ()=>{
        $('.maintenance-con').animate({'left': '-100%'}, 'fast')
      });

      // if(window.junket && !_.isEmpty(window.vendorData)) {
      //   $('#channel-dropdown').css({right: '0'})
      //   $('#interactive_pin').remove();
      //   $('.channel-con.-gamenumber > span').on('mouseover', (e) =>{
      //     if(!$('#junket_interactive_pin').hasClass('active')) {
      //       $('#channel-dropdown').stop(true).animate({'right' : '100%' }, {
      //         duration: 200,
      //         start: function() {
      //           $(this).removeClass('active');
      //         },
      //         complete: function() {
      //           $(this).css({display : 'none'})
      //         }
      //       });

      //       $('#junket-info').stop(true).animate({'right' : 0 }, {
      //         duration: 200,
      //         start: function() {
      //           $(this).css({display: 'block'}).addClass('active');
      //         }
      //       });
      //     }
      //   });

      //   $('#channel-dropdown, .channel-container').on('mouseleave', (e) =>{
      //     if(!$('#junket_interactive_pin').hasClass('active')) {
      //       $('#channel-dropdown').stop(true).animate({'right' : '0' }, {
      //         duration: 200,
      //         start: function() {
      //           $(this).css({display: 'block'}).addClass('active');
      //         }
      //       });

      //       $('#junket-info').stop(true).animate({'right' : '100%' }, {
      //         duration: 200,
      //         start: function() {
      //           $(this).removeClass('active');
      //         },
      //         complete: function() {
      //           $(this).css({display : 'none'})
      //         }
      //       });
      //     }
      //   });

      //   $('#junket-info').on('mouseleave', (e) =>{
      //     if(!$('#junket_interactive_pin').hasClass('active')) {
      //       $('#channel-dropdown').stop(true).animate({'right' : '0' }, {
      //         duration: 200,
      //         start: function() {
      //           $(this).css({display: 'block'}).addClass('active');
      //         }
      //       });

      //       $('#junket-info').stop(true).animate({'right' : '100%' }, {
      //         duration: 200,
      //         start: function() {
      //           $(this).removeClass('active');
      //         },
      //         complete: function() {
      //           $(this).css({display : 'none'})
      //         }
      //       });
      //     }

      //   });
      // } else {
        $('.channel-con.-gamenumber > span').on('mouseover', (e) =>{
          this.infoToggle(true);
        });

        $('#channel-dropdown, .channel-container').on('mouseleave', (e) =>{
          this.infoToggle(false);
        });
      // }

      $('#interactive_pin, #junket_interactive_pin').on('click', (e) =>{
        this.pinToggle($(e.currentTarget).attr('id'));
      });

      if (!window.room_yn) {
        $('#liveBetsCon').remove();
      }
    },
    infoToggle(toggle) {
      if(!this.pinned) {
        if(toggle) {
          let val = '0';
          $('#channel-dropdown').animate({'right' : 0}, {
            duration: 200,
            start: function() {
              $(this).addClass('active');
            }
          });

          $(".junket-con").animate({'right' : '100%'}, 200);
        } else {
          $('#channel-dropdown').animate( {'right' : '100%'}, {
            duration: 200,
            complete: function() {
              $(this).removeClass('active');
            }
          })

          $(".junket-con").animate({'right' : '0'}, 200);
        }
      }
    },
    pinToggle(id) {
      this.pinned = !this.pinned;
        $(`#${id}`).toggleClass('active', this.pinned);
    },
    numberWithCommas (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  });

  return instance;
}
