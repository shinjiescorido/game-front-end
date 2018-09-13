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


      $('.channel-con.-gamenumber > span').on('mouseover', (e) =>{
        this.infoToggle(true);
      });

      $('#channel-dropdown, .channel-container').on('mouseleave', (e) =>{
        this.infoToggle(false);

      });

      $('#interactive_pin').on('click', (e) =>{
        this.pinToggle();
      });
    },
    infoToggle(toggle) {
      if(!this.pinned) {
        if(toggle) {
          console.log("toggle true");
          // let val = '78.6%';s
          let val = '0';
          // if(this.context.component_multibetv2.isActive)  val = '59%';

          $('#channel-dropdown').animate({'right' : val, }, {
            duration: 200,
            start: function() {
              console.log("crash");
              $(this).addClass('active');
            }
          });

        } else {
          $('#channel-dropdown').animate( {'right' : '100%'},{
            duration: 200,
            complete: function() {
              $(this).removeClass('active');
            }
          })
        }
      }
    },
    pinToggle() {
      this.pinned = !this.pinned;
      $('#interactive_pin').toggleClass('active', this.pinned);
    },
    numberWithCommas (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  });

  return instance;
}
