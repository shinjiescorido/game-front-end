import reelgames from '../factories/processed.json';
import ka_gaming from '../factories/kagaming.json';
import MobileDetect from 'mobile-detect';
import { numberCounter, playSound, numberWithCommas } from '../factories/factories';
const demo = true;

let instance = null;
let disabled = false;
let md = (new MobileDetect(window.navigator.userAgent));
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

      // var search = document.createElement("INPUT");
      // search.setAttribute("type", "text");
      // search.setAttribute("style", "position: relative;float: right;display: block;margin: -442px auto 100px;");
      // document.body.appendChild(search);
      // this.createReelGames();

    },
    createReelGames() {
      // init repeated values
      let font = (window.language.locale =="kr") ? "bold 18px LatoBold" : "bold 19px LatoBold";
      let subheader_color = "#f57c00";
      let subheader_active_color = "#d06900";
      let subheader_text = [window.language.lobby.allgamescaps, window.language.lobby.betsoftreelcaps, window.language.lobby.kagamingreelcaps]
      let subheader_names = ["allgames", "betsoft", "kagaming"];

      // this.y = 72;
      this.visible = false;

      // let bg = new createjs.Shape();
      //   let bg_image = new Image();
      //   bg_image.src = "/img/reelgames/bg_orange_pattern.jpg";
      //   bg_image.onload = function() {
      //     bg.graphics.beginBitmapFill(bg_image, "repeat").drawRect(0, 0, this.context.context.width - this.context.body_bg_width, 1050);
      //     this.addChildAt(bg, 0);
      //   }.bind(this)


   //    let header_bg = new createjs.Shape();
   //    header_bg.graphics.beginFill(subheader_color).drawRect(0, 0, this.context.context.width - this.context.body_bg_width, 50);
   //    this.addChild(header_bg);

   //    this.subheader_con = new createjs.Container();
   //    this.addChild(this.subheader_con);

   //    let subheader_widths = [190, 220, 220];
   //    subheader_names.forEach((o, i) => {
   //      this[o] = new createjs.Shape();
   //      this[o].graphics.beginFill(subheader_color).drawRect(0, 0, subheader_widths[i], 50);
   //      this[o].name = o;
   //      this[o].text = new createjs.Text(subheader_text[i], font, "#fff");
   //      this[o].text.textAlign = "center";
   //      this[o].text.textBaseline = "middle";
   //      this[o].text.mouseEnabled = false;
   //      this[o].text.y = 25;
   //      this.subheader_con.addChild(this[o], this[o].text)

   //      this[o].active = (e) => { e.graphics.clear().beginFill(subheader_active_color).drawRect(0, 0, subheader_widths[i], 50); e.cursor = "pointer"}
   //      this[o].normal = (e) => { e.graphics.clear().beginFill(subheader_color).drawRect(0, 0, subheader_widths[i], 50); }
   //    })

   //    this.allgames.x = 30;
   //    this.allgames.text.x = this.allgames.x + 95;
   //    this.betsoft.x = 220;
   //    this.betsoft.text.x = this.betsoft.x + 110;
   //    this.kagaming.x = 440;
   //    this.kagaming.text.x = this.kagaming.x + 110;
   //    this.kagaming.soon = {
   //      "bg": new createjs.Shape(),
   //      "text": new createjs.Text("SOON!", "italic 16px TimesNewRoman", "#fff")
   //    }
   //    this.kagaming.soon.bg.graphics.beginFill("#cf2f1f").drawRect(this.kagaming.soon.text.getBounds().width, this.kagaming.soon.text.lineHeight, 55, 20);
   //    this.kagaming.soon.bg.x = this.kagaming.text.x - 45 - 230;
   //    this.kagaming.soon.bg.y = this.kagaming.text.y + 10;
   //    this.kagaming.soon.text.textAlign = "center";
   //    this.kagaming.soon.text.textBaseline = "middle";
   //    this.kagaming.soon.text.x = this.kagaming.soon.bg.x + 75;
   //    this.kagaming.soon.text.y = this.kagaming.soon.bg.y + 10;
   //    this.addChild(this.kagaming.soon.bg, this.kagaming.soon.text)

   //    this.kagaming.mouseEnabled = true;

   //    this.subheader_con.on("mouseover", (e) => {
			// 	try { e.target.active(e.target); } catch (e) { }
			// });
			// this.subheader_con.on("mouseout", (e) => {
			// 	if(e.target.clicked) return;
			// 	try { e.target.normal(e.target); } catch (e) { }
			// });

   //    this.subheader_con.on("click", (e) => {
			// 	this.subheader_con.children.forEach((child)=>{
			// 		child.clicked = false;
			// 		try { child.normal(child) }
			// 		catch(err) {}
			// 	});

			// 	if(e.target.is_text) { //if target is text. fix for hitarea bug
			// 		e.target = e.target.m_target;
			// 	}

			// 	if(e.target.is_child) { // list and thumbnail view redirect to parent target
			// 		e.target = e.target.parent;
			// 	}

			// 	try {
			// 		e.target.active(e.target);
			// 	} catch (err) { }

			// 	e.target.clicked = true;
   //      playSound('click');
			// 	this.toggleView(e.target.name);
			// 	return;
			// });

   //    //for disabled click for betsoft reel
   //    this.subheader_con.children[2].on("click", (e)=> {
   //        if(e.name == "betsoft") { return; }
   //    });
   //    this.subheader_con.children[2].mouseEnabled = false;

      // let bg = new createjs.Shape();
      //   let bg_image = new Image();
      //   bg_image.src = "/img/reelgames/bg_orange_pattern.jpg";
      //   bg_image.onload = function() {
      //     bg.graphics.beginBitmapFill(bg_image, "repeat").drawRect(0, 0, this.context.context.width - this.context.body_bg_width, 1300);
      //     this.addChildAt(bg, 0);
      //   }.bind(this)


      // let header_bg = new createjs.Shape();
      // header_bg.graphics.beginFill(subheader_color).drawRect(0, 0, this.context.context.width - this.context.body_bg_width, 50);
      // this.addChild(header_bg);

      // this.subheader_con = new createjs.Container();
      // this.addChild(this.subheader_con);

      // let subheader_widths = [190, 220, 220];
      // subheader_names.forEach((o, i) => {
      //   this[o] = new createjs.Shape();
      //   this[o].graphics.beginFill(subheader_color).drawRect(0, 0, subheader_widths[i], 50);
      //   this[o].name = o;
      //   this[o].text = new createjs.Text(subheader_text[i], font, "#fff");
      //   this[o].text.textAlign = "center";
      //   this[o].text.textBaseline = "middle";
      //   this[o].text.mouseEnabled = false;
      //   this[o].text.y = 25;
      //   this.subheader_con.addChild(this[o], this[o].text)
      //
      //   this[o].active = (e) => { e.graphics.clear().beginFill(subheader_active_color).drawRect(0, 0, subheader_widths[i], 50); }
      //   this[o].normal = (e) => { e.graphics.clear().beginFill(subheader_color).drawRect(0, 0, subheader_widths[i], 50); }
      // })

      // this.allgames.x = 30;
      // this.allgames.text.x = this.allgames.x + 95;
      // this.betsoft.x = 220;
      // this.betsoft.text.x = this.betsoft.x + 110;
      // this.kagaming.x = 440;
      // this.kagaming.text.x = this.kagaming.x + 110;
      // this.kagaming.soon = {
      //   "bg": new createjs.Shape(),
      //   "text": new createjs.Text("SOON!", "italic 16px TimesNewRoman", "#fff")
      // }
      // this.kagaming.soon.bg.graphics.beginFill("#cf2f1f").drawRect(this.kagaming.soon.text.getBounds().width, this.kagaming.soon.text.lineHeight, 55, 20);
      // this.kagaming.soon.bg.x = this.kagaming.text.x - 45;
      // this.kagaming.soon.bg.y = this.kagaming.text.y + 10;
      // this.kagaming.soon.text.textAlign = "center";
      // this.kagaming.soon.text.textBaseline = "middle";
      // this.kagaming.soon.text.x = this.kagaming.soon.bg.x + 75;
      // this.kagaming.soon.text.y = this.kagaming.soon.bg.y + 10;
      // this.addChild(this.kagaming.soon.bg, this.kagaming.soon.text)

      // this.kagaming.mouseEnabled = false;

      // this.subheader_con.on("mouseover", (e) => {
			// 	try { e.target.active(e.target); } catch (e) { }
			// });
			// this.subheader_con.on("mouseout", (e) => {
			// 	if(e.target.clicked) return;
			// 	try { e.target.normal(e.target); } catch (e) { }
			// });
      // this.subheader_con.on("click", (e) => {
			// 	this.subheader_con.children.forEach((child)=>{
			// 		child.clicked = false;
			// 		try { child.normal(child) }
			// 		catch(err) {}
			// 	});
      //
			// 	if(e.target.is_text) { //if target is text. fix for hitarea bug
			// 		e.target = e.target.m_target;
			// 	}
      //
			// 	if(e.target.is_child) { // list and thumbnail view redirect to parent target
			// 		e.target = e.target.parent;
			// 	}
      //
			// 	try {
			// 		e.target.active(e.target);
			// 	} catch (err) { }
      //
			// 	e.target.clicked = true;
      //   playSound('click');
			// 	this.toggleView(e.target.name);
			// 	return;
			// });

      this.reelgames_con = new createjs.Container();
      this.reelgames_con.y = 60;
      this.addChild(this.reelgames_con);

      let kagaming_img_src = new Image();
      kagaming_img_src.src = "/img/reelgames/ka-gaming_icon.png";
      this.kagaming_img = new createjs.Bitmap(kagaming_img_src);
      this.kagaming_img.cursor = "pointer";
      this.kagaming_img.x = 290;
      this.kagaming_img.y = 120;

      this.kagaming_img.on("click", (e)=> {
        reelClicked++;
        this.toggleView("kagaming");
        $(".header-subnav__items.-kagaming").addClass("active").siblings().removeClass('active');
      })

      this.reelgames_con = new createjs.Container();
      this.reelgames_con.y = 60;
      this.addChild(this.reelgames_con);

      let betsoft_img_src = new Image();
      betsoft_img_src.src = window.language.locale == "zh" ? "/img/reelgames/betsoft-soon_icon-zh.png" : "/img/reelgames/betsoft-soon_icon.png";
      this.betsoft_img = new createjs.Bitmap(betsoft_img_src);
      this.betsoft_img.x = 810;
      this.betsoft_img.y = 50;
      // this.betsoft_img.on("click", (e)=> {
      //   this.toggleView("betsoft");
      // })

      this.allGames();
    },

    toggleView(view) {
      if(this.reelgames_con) {
        this.reelgames_con.removeAllChildren();
      }

      switch (view) {
        case "allgames": default:
          this.allGames();
          break;
        case "betsoft":
          // this.populateReelGamesList(reelgames);
          break;
        case "kagaming":
          this.populateKAGamesList(ka_gaming);
          break;
      }
    },

    allGames() {
      this.reelgames_con.addChild(this.kagaming_img);
      this.reelgames_con.addChild(this.betsoft_img);
    },

    //Bet Soft Reel
    populateBetSoftReel(games, filterby) {
      let filter = [];
      let reelCon = new createjs.Container();

      this.reelgames_con.addChild(reelCon);

      let con_row1 = this.makeContainer(50, 90, 1);
      let next_row = 0;
      let col = 0;

      for (let x = 0; x < games.length; x++) {
        let reelGame_name = games[x];

        for (let i = 0; i < reelGame_name.games.length; i++) {

          let result = reelGame_name.games[i];

          if (!result.image || !this.isGameSupported(result)) {
            continue;
          }

          if (col == 7) {
            next_row++;
            col = 0;
          }

          let bitmap1 = new createjs.Bitmap("/img/bet-soft-icons/" + result.image);
          bitmap1.x = (col % 7) * 230;
          bitmap1.y = next_row * 230;
          bitmap1.shadow = new createjs.Shadow("#000000", 0, 5, 20);
          con_row1.addChild(bitmap1);
          col++;

          bitmap1.addEventListener("click", () => {
            if (disabled) {
              return;
            }

            disabled = true;
            $.post('/betsoft/token', (response) => {
              disabled = false;
              let os = map[(md.os() || '').toLowerCase()];
              let id = result.games.pc.id;


              if (md.mobile()) {
                id = result.games[os] ? result.games[os].id : result.games['mobile'].id
              }

              let url = `https://bluefrog-gp3.discreetgaming.com/cwguestlogin.do`;
              url += `?bankId=${response.bank}&gameId=${id}&lang=en`;

              if (!demo) {
                url = `https://bluefrog-gp3.discreetgaming.com/cwstartgamev2.do`;
                url += `?bankId=${response.bank}&gameId=${id}&mode=real&token=${response.payload}&lang=en`;
              }

              window.location.href = url;
            });
          });
        }
      }

      reelCon.addChild(con_row1);

      reelCon.setBounds(0, 0, 1600, (next_row * 230) + 400);
      this.context.lobby_scrollbar.scrollable(this.reelgames_con, reelCon, 1690, 1050, false);

    },

    //KA Gaming
    populateKAGamesList(games, filterby) {
      $('.kaga-container').show();
      $(".main-container").hide();
      let filter = [];

      this.reelgames_con = new createjs.Container();
      this.reelgames_con.y = 60;
      this.addChild(this.reelgames_con);

      let ka_Con = new createjs.Container();
      if(this.reelgames_con) {
        this.reelgames_con.addChild(ka_Con);
      }

      let con_row1 = this.makeContainer(50, 30, 1);
      let next_row = 0;
      let col = 0;
      let con_height = 0;

      var _this = this;

      // $.get('/kaga/list', {}, (response)=> {
        var url = `${window.ka_url}?p=${window.ka_partner_name}&`;
        // var url = 'https://gmcdn.kga8.com?p=BLUEFROG&'; //`${response.gameLaunchURL}?p=BLUEFROG&`;
        // console.log(response)
        if(!ka_games) return;

        for(let i = 0; i < ka_games.length; i++) {

          let kaGames = ka_games[i];
          let imgSrc = 'https://rmpiconcdn.kaga88.com/kaga/gameIcon?game='+kaGames.gameId+'&lang=en&type=square';

          if (col == 7) {
            next_row++;
            col = 0;
          }
          if(reelClicked <= 1) {
            var dom = document.createElement("div");
            $(dom).css({
              'width'           : '200px',
              'height'          : '200px',
              'display'         : 'inline-block',
              'margin'          : '12px' ,
              'border-radius'   : '8px',
              'background'      : 'url('+imgSrc+')',
              'background-size' : ' 100%',
              'cursor'          : 'pointer'
            });

            $('.kaga-container').append(dom);

            $(dom).on("click", ()=>{
              $.post('/kaga/token', {}, (response) => {
                var username = window.username;
                let tempUrl = `${url}g=${kaGames.gameId}`;
                tempUrl += '&t=' + response.payload + '&u=' + username;
                tempUrl += '&ak=' + response.access + `&cr=${window.currencyAbbrev}`;
                tempUrl += '&m=' + this.isDemo();
                tempUrl += '&loc=' + this.getLoc();

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

                          this.context.component_landing.setUser();
                          
                          // let currency = "";
                          // if(window.currencyAbbrev == "USD" || window.currencyAbbrev == "JPY") {
                          //   currency = "$"
                          // } else if(window.currencyAbbrev == "KRW"){
                          //   currency = "₩"
                          // } else if(window.currencyAbbrev == "CNY"){
                          //   currency = "¥"
                          // } else if(window.currencyAbbrev == "IDR") {
                          //   currency = "Rp"
                          // } else if(window.currencyAbbrev == "MYR") {
                          //   currency = "RM"
                          // } else if(window.currencyAbbrev == "THB") {
                          //   currency = "฿"
                          // } else {
                          //   currency = "RM "
                          // }

                          // let money = (window.casino == 'SS') ? parseFloat(response).toFixed(2) : parseInt(response);
                          // $(".userinfo-dtl__holdings").html(numberWithCommas(currency + money))
                          // _this.context.lobby_header.user_money = money;
                        });
                        clearInterval(timer);
                      }
                    }

                    // new_window.onbeforeunload = function(){ console.log("DO") }
                  }
                }
              });
            });
          } else {
            return false;
          }
          col++;
        }

        con_height  = (next_row+1) * 250;
        ka_Con.setBounds(0, 0, 1600, con_height);
        this.context.lobby_scrollbar.scrollable(this.reelgames_con, ka_Con, 1690, 1050, false);
      // });

      ka_Con.addChild(con_row1);

      // setTimeout(()=>{
      //     this.context.lobby_scrollbar.scrollable(this.reelgames_con, ka_Con, 1690, 1050, false);
      // },10000);
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
    /**
     *
     * @param content
     * @param txtx
     * @param txty
     * @returns {*}
     */
    makeText(content, txtx, txty) {
      let reelText = new createjs.Text(content, "bold 20px Arial", "#ffffff");
      reelText.x = txtx;
      reelText.y = txty;
      return reelText;
    },
    isDemo () {
      if(window.vendor_type == 'live') return '0';
      if(window.vendor_type == 'demo') return '1';
    }

  });

  // $.get(/kaga/list)
  // document.addEventListener('DOMContentLoaded',function() {
  //     // gameSelector.onchange = function () {
  //
  //     // };
  // },false);

  return instance;
}
