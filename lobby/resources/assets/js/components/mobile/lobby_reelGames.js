import reelgames from '../../factories/processed.json';
import ka_gaming from '../../factories/kagaming.json';
import MobileDetect from 'mobile-detect';

const demo = true;


let md = (new MobileDetect(window.navigator.userAgent));
let instance = null;
let disabled = false;
let map = {
  androidos: 'android',
  android: 'android',
  ios: 'ios',
  windows: 'windows',
  windowsos: 'windows'
};

export default () => {
  instance = instance || new blu.Component({
    main() {
      this.visible = false;

      this.bg = new createjs.Shape();
        this.bg.img = new Image();
        this.bg.img.src = "/img/reelgames/bg_orange_pattern.jpg";
        this.bg.img.onload = function() {
          this.bg.graphics.beginBitmapFill(this.bg.img, "repeat").drawRect(0, 0, 1400, 900);
          this.addChildAt(this.bg, 0);
        }.bind(this)

      this.addChild(this.bg);


      this.reelgames_con = new createjs.Container();
      this.reelgames_con.y = 80;
      this.reelgames_con.scaleX = this.reelgames_con.scaleY = 0.76;
      this.addChild(this.reelgames_con);

      let kagaming_img_src = new Image();
      kagaming_img_src.src = "/img/reelgames/ka-gaming_icon.png";
      this.kagaming_img = new createjs.Bitmap(kagaming_img_src);
      this.kagaming_img.x = 360;
      this.kagaming_img.scaleX = this.kagaming_img.scaleY = 0.8;
      this.kagaming_img.on("click", (e)=> {
        e.nativeEvent.preventDefault();
        reelClicked++;
        this.toggleView("kagaming");
      })


      let betsoft_img_src = new Image();
      betsoft_img_src.src = window.language.locale == "zh" ? "/img/reelgames/betsoft-soon_icon-zh.png" : "/img/reelgames/betsoft-soon_icon.png";
      this.betsoft_img = new createjs.Bitmap(betsoft_img_src);
      this.betsoft_img.x = 880;
      this.betsoft_img.y = -56;
      this.betsoft_img.scaleX = this.betsoft_img.scaleY = 0.8;
      this.betsoft_img.mouseEnabled = false;
      // this.betsoft_img.on("click", (e)=> {
      //   this.toggleView("betsoft");
      // })

      this.toggleView("allgames");
    },

    toggleView(view) {
      this.reelgames_con.removeAllChildren();

      if(__global.reel_subheader) {
        __global.reel_subheader.allgames.normal(__global.reel_subheader.allgames);
        __global.reel_subheader.betsoft.normal(__global.reel_subheader.betsoft);
        __global.reel_subheader.kagaming.normal(__global.reel_subheader.kagaming);

        __global.reel_subheader[view].active(__global.reel_subheader[view]);
      }

      switch (view) {
        case "allgames": default:
          this.allGames();
          break;
        case "betsoft":
          this.populateBetSoftReel(reelgames);
          break;
        case "kagaming":
          this.populateKAGamesList(ka_gaming);
          break;
      }

    },

    allGames() {
      $("#lobby-content").show();
      this.reelgames_con.addChild(this.kagaming_img);
      this.reelgames_con.addChild(this.betsoft_img);
      let height = (!this.getBounds()) ? 800 : this.getBounds().height + 100;
      this.context.context.stage.canvas.height = height
      this.bg.graphics.beginBitmapFill(this.bg.img, "repeat").drawRect(0, 0, 1400, height);
    },

    populateKAGamesList(ka_gaming) {

      $('.kaga-container').show();
      $("#lobby-content").hide();

      let ka_Con = new createjs.Container();
      ka_Con.y = -150;
      this.reelgames_con.addChild(ka_Con);

      let con_row1 = this.makeContainer(50, 90, 1);
      let next_row = 0;
      let col = 0;
      let imageload_count = 0;
      let maxloadcount = 0;

      var url = `${window.ka_url}?p=${window.ka_partner_name}&`;
      // $.get('/kaga/list', {}, (response)=> {
        // var url = `${response.gameLaunchURL}?p=BLUEFROG&`;
        // console.log(response)
        if(!ka_games) {
          $("#lobby-content").show();
          return;
        }


        function getRandomColor() {
          var letters = '0123456789ABCDEF';
          var color = '#';
          for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        }

        for(let i = 0; i < ka_games.length; i++) {

          if (col == 6) {
            next_row++;
            col = 0;
          }

          let kaGames = ka_games[i];
          let imgSrc = 'https://rmpiconcdn.kaga88.com/kaga/gameIcon?game='+kaGames.gameId+'&lang=en&type=square';

          if(reelClicked <= 1) {
            var dom = document.createElement("div");
            $(dom).css({
              width: '170px',
              height: '170px',
              display: 'inline-block',
              margin: '5px' ,
              'border-radius' : '8px',
              'background' : 'url('+imgSrc+')',
              'background-size' : ' 100%'
            });

            $('.kaga-container').append(dom);

            $(dom).on("click", ()=>{
              $.post('/kaga/token', {},  (response) => {
                var username = window.username;
                let tempUrl = `${url}g=${kaGames.gameId}`;
                tempUrl += '&t=' + response.payload + '&u=' + username;
                tempUrl += '&ak=' + response.access + `&cr=${window.currencyAbbrev}`;
                tempUrl += '&m=' + this.isDemo();
                tempUrl += '&loc=' + this.getLoc();
                tempUrl += '&l=' + window.lobby_domain+'m';

                if(window.reel_yn === 0) {
                  $('.ka-wrap, .ka-prompt-reel').addClass('active');
                  $(".ka-prompt-btn-reel").on('click', function (e) {
                    $(".ka-wrap, .ka-con").removeClass('active');
                    $(".ka-prompt-reel").removeClass('active');
                  });
                } else {
                  location.assign(tempUrl)
                  // window.location = tempUrl;
                  // window.open(tempUrl,'newwindow', 'height=670,width=1400,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no, status=no');
                }
              });
            });
          } else {
            return false;
          }
          col++;
        }


        return false;

        for(let i = 0; i < ka_games.length; i++) {

            let kaGames = ka_games[i];

            if (col == 7) {
              next_row++;
              col = 0;
            }

            let image = new Image();
            image.src = "https://rmpiconcdn.kaga88.com/kaga/gameIcon?game=" + kaGames.gameId + "&lang=en&type=square";
            image.crossOrigin = "Anonymous";

            let ka_icons = new createjs.Bitmap(image);
            ka_icons.x = (col % 7) * 230;
            ka_icons.y = next_row * 230;
            ka_icons.scaleX = ka_icons.scaleY = 0.47;
            ka_icons.cursor = "pointer";
            ka_Con.addChild(ka_icons)

            var iconShape = new createjs.Shape(new createjs.Graphics().f("#000").drawRoundRect(0,0,200, 200, 10));
            iconShape.x = (col % 7) * 230;
            iconShape.y = next_row * 230;
            ka_icons.mask = iconShape;

            ka_icons.shadow = new createjs.Shadow("#000000", 0, 5, 20);
            con_row1.addChild(ka_icons);

            col++;

            ka_icons.addEventListener("click", ()=>{
                $.post('/kaga/token', {},  (response) => {
                    var username = window.username;
                    let tempUrl = `${url}g=${kaGames.gameId}`;
                    tempUrl += '&t=' + response.payload + '&u=' + username;
                    tempUrl += '&ak=' + response.access + `&cr=${window.currencyAbbrev}`;
                    tempUrl += '&m=' + this.isDemo();

                    if(window.reel_yn === 0) {
                      $('.ka-wrap, .ka-prompt-reel').addClass('active');
                      $(".ka-prompt-btn-reel").on('click', function (e) {
                        $(".ka-wrap, .ka-con").removeClass('active');
                        $(".ka-prompt-reel").removeClass('active');
                      });
                    } else {
                      location.assign(tempUrl)
                      // window.location = tempUrl;
                      // window.open(tempUrl,'newwindow', 'height=670,width=1400,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no, status=no');
                    }

                });
            });
        }

        this.context.context.stage.canvas.height = !this.getBounds() ? next_row * 230 : this.getBounds().height + 100;

      // });

      ka_Con.addChild(con_row1);
      this.bg.graphics.beginBitmapFill(this.bg.img, "repeat").drawRect(0, 0, 1300, 5000);
      // reelCon.cache(0, 0, 1650, reelCon.getBounds().height);
    },
    populateBetSoftReel() {

      let betsoft_Con = new createjs.Container();
      betsoft_Con.y = -150;
      this.reelgames_con.addChild(betsoft_Con);

      let con_row1 = this.makeContainer(50, 90, 1);
      let next_row = 0;
      let col = 0;
      let imageload_count = 0;
      let maxloadcount = 0;

      for (let x = 0; x < reelgames.length; x++) {
        let reelGame_name = reelgames[x];
        maxloadcount += reelGame_name.games.length

        for (let i = 0; i < reelGame_name.games.length; i++) {
          let result = reelGame_name.games[i];

          result.click_flag = 0;
          if (!result.image || !this.isGameSupported(result)) {
            // console.log('games not displayed', result);
            imageload_count++;
            continue;
          }

          if (col == 7) {
            next_row++;
            col = 0;
          }

          let bitmap1 = new createjs.Bitmap("/img/bet-soft-icons/" + result.image);
          bitmap1.x = (col % 7) * 230;
          bitmap1.y = next_row * 230;
          con_row1.addChild(bitmap1);
          col++;

          bitmap1.image.onload = function() {
            imageload_count++;
            if(imageload_count >= maxloadcount) {
              betsoft_Con.cache(50, 90, betsoft_Con.getBounds().width, betsoft_Con.getBounds().height);
              this.context.context.stage.canvas.height = (!this.getBounds()) ? 3000 : this.getBounds().height + 120;
            }
          }.bind(this)


          bitmap1.addEventListener("click", () => {
            if (disabled) {
              return;
            }

            if (result.click_flag < 1) {
              result.click_flag++;
              // clear flag after half a second
              setTimeout(() => {
                result.click_flag = 0;
              }, 2000);
              return;
            }

            disabled = true;
            $.post('/betsoft/token', (response) => {
              disabled = false;

              let id = result.games.pc.id;
              if (md.mobile() && result.games[map[md.os().toLowerCase()]]) {
                id = result.games[map[md.os().toLowerCase()]].id
              }

              let url = `https://bluefrog-gp3.discreetgaming.com/cwguestlogin.do`;
              url += `?bankId=2218&gameId=${id}&lang=en`;

              if (!demo) {
                url = `https://bluefrog-gp3.discreetgaming.com/cwstartgamev2.do`;
                url += `?bankId=${response.bank}&gameId=${id}`
                url += `&mode=real&token=${response.payload}&lang=en`;
              }

              url += '&homeUrl=http://nihtanv2.com/m';

              window.location.href = url;
            });
          });
        }
      }
      betsoft_Con.addChild(con_row1);
      this.bg.graphics.beginBitmapFill(this.bg.img, "repeat").drawRect(0, 0, 1300, (next_row * 230));
      // reelCon.cache(0, 0, 1650, reelCon.getBounds().height);
    },

    isGameSupported(data) {
      return !md.mobile() || data.games[map[md.os().toLowerCase()]] || data.games['mobile'] ? true : false;
    },

    //create Container
    makeContainer(contx, conty, scale) {
      let container = new createjs.Container();
      container.x = contx;
      container.y = conty;
      container.scaleX = container.scaleY = scale;
      return container;
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
    },
    isDemo () {
      if(window.vendor_type == 'live') return '0';
      if(window.vendor_type == 'demo') return '1';
    }
    /**
     *
     * @param content
     * @param txtx
     * @param txty
     * @returns {*}
     */

  });

  return instance;
}
