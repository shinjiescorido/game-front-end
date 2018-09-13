

reelgames = {
  main () {
    self = this.context;
  },


  populateKAGamesList() {
    let container = $('.reelgames-list.kagaming').show();
    container.empty();

    let next_row = 0;
    let col = 0;
    let con_height = 0;

    var url = `${window.ka_url}?p=${window.ka_partner_name}&`;
    
    if(!ka_games) return;

    for(let i = 0; i < ka_games.length; i++) {
      let kaGames = ka_games[i];
      let imgSrc = 'https://rmpiconcdn.kaga88.com/kaga/gameIcon?game='+kaGames.gameId+'&lang=en&type=square';

      if (col == 7) {
        next_row++;
        col = 0;
      }

      var dom = document.createElement("div");
      $(dom).css({
        'width'           : '180px',
        'height'          : '180px',
        'display'         : 'inline-block',
        'margin'          : '12px' ,
        'border-radius'   : '8px',
        'background'      : 'url('+imgSrc+')',
        'background-size' : ' 100%',
        'cursor'          : 'pointer'
      });

      container.append(dom);

      $(dom).on("click", () => {
        $.post('/kaga/token', {}, (response) => {
          var username = window.username;
          let tempUrl = `${url}g=${kaGames.gameId}`;
          tempUrl += '&t=' + response.payload + '&u=' + username;
          tempUrl += '&ak=' + response.access + `&cr=${window.currencyAbbrev}`;
          tempUrl += '&m=' + this.isDemo();
          tempUrl += '&loc=' + this.getLoc();
          console.log(tempUrl);

          if (window.reel_yn === 0) {
            $('.ka-wrap, .ka-prompt-reel').addClass('active');
          } else {
            var checkPopup = window.open("about:blank","","directories=no,height=100,width=100,menubar=no,resizable=no,scrollbars=no,status=no,titlebar=no,top=0,location=no");

            if (!checkPopup) {
              $('.ka-wrap, .ka-prompt').addClass('active');
              $('.ka-prompt-reel').removeClass('active');
            } else {
              checkPopup.close();
              $('.ka-wrap, .ka-prompt').removeClass('active');

              var new_window = window.open(
                tempUrl,
                'newwindow',
                'height=670,width=1400,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no, status=no'
              );

              var timer = setInterval(checkChild, 500);

              function checkChild() {
                if (new_window.closed) {
                  $.post('/getUserMoney', (response) => {
                    window.money = response;
                  });
                  clearInterval(timer);
                }
              }
            }
          }
        });
      });
      col++;
    } // end for
  }, // populateKAGamesList

  isDemo () {
    if(window.vendor_type == 'live') return '0';
    if(window.vendor_type == 'demo') return '1';
  },

  getLoc () {
    let loc = "en";
    switch (window.language.locale) {
      case "zh":
      loc = "zh";
      break;
      case "jp":
      loc = "ja";
      break;
      case "kr":
      loc = "ko";
      break;
    }
    return loc;
  }

}

export default {
  reelgames
}
