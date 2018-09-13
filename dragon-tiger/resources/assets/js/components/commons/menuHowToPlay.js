/**
 * menuChips.js
 * @author Kevin Villanueva
 * @since 2017.06.15
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 * Handles all modify chips functionalities
**/

let instance = null;

export default() => {

  let countSelectedChips = 5;
  let bgmodchips = [];
  let modchips = [];
  let chipCon = [];

  instance = instance || new blu.Component({
    main() {

      this.y = 100;
      this.x = 1250;
      this.visible = false;

      this._modalWidth = 560;
      this._modalHeight = 750;

      let newVolume = "";
      let lblsettingsY = 0;
      let settingsName = [];
      let settingsToggle = [];
      let settingsCircle = [];
      let settingsToggleHit = [];
      let color = [];

      //Modal Header
      this._modalHeader = new createjs.Shape();
      this._modalHeader.graphics.beginLinearGradientFill([this.context.theme_color[window.theme].base_color, this.context.theme_color[window.theme].gradColor2], [.1, .9], 10, 10, 10, 35)
        .drawRoundRect(0, .8, this._modalWidth, 35, 3);
      this.addChild(this._modalHeader);

      //Header Text
      this._headerTxt = new createjs.Text(window.language.menu.howtoplaycaps,"bold 15px arial", this.context.theme_color[window.theme].labelcolor);
      this._headerTxt.x = this._modalHeader.x + 10;
      this._headerTxt.y = this._modalHeader.y + 9;
      this.addChild(this._headerTxt);

      //Header Close button
      this._headerClose = new createjs.Text("X","bold 15px arial", this.context.theme_color[window.theme].labelcolor);
      this._headerClose.x = this._modalWidth - 30;
      this._headerClose.y = this._modalHeader.y + 9;
      this.addChild(this._headerClose);

      //Close button hitarea
      this._headerCloseHit = new createjs.Shape();
      this._headerCloseHit.graphics.beginFill("#000").drawRect(0, 0, 20, 20);
      this._headerCloseHit.x = this._headerClose.x;
      this._headerCloseHit.y = this._headerClose.y;
      this._headerCloseHit.cursor = "pointer";
      this._headerCloseHit.alpha = 0.01;
      this.addChild(this._headerCloseHit);

      //Close modal
      this._headerCloseHit.addEventListener("mousedown", (e) => {
        this.context.component_menu.setActiveModal();
        this.visible = false;
        $(".howto-wrap").hide();
        $(".howto-wrap--accent").hide();
        $(".arrow-up").hide();
        $(".-gameplay").hide();
        $(".-gamerules").hide();
      });

      this._modalBg = new createjs.Shape();
      this._modalBg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);
      this._modalBg.y = this._modalHeader.y + 35;
      this.addChild(this._modalBg);

      let tabIcon = ["game-rules-"+window.theme, "gameplay-"+window.theme];
      let tabLbl = [window.language.menu.gamerules, window.language.menu.gameplaytutorial];
      this.howToTab = [];
      this.howToTabIcon = [];
      this.howToTabLbl = [];

      for (var i = 0; i < tabLbl.length; i++) {
        this.howToTab[i] = new createjs.Shape();
        this.howToTab[i].graphics.beginFill(this.context.theme_color[window.theme].bet_record_tab).drawRect(0, 0, this._modalWidth / 2, 60);
        this.howToTab[i].x = (this._modalWidth / 2) * i;
        this.howToTab[i].y = this._modalHeader.y + 35;
        this.howToTab[i].cursor = "pointer";
        this.howToTab[i].name = tabIcon[i];

        let tabWidth = 18;
        let tabHeight = 22;

        if (tabIcon[i] == "game-rules-"+window.theme) {
          tabWidth = 13;
        }

        let icon_spritesheet_data = {
          images: [this.context.getResources(tabIcon[i])],
          frames: {width:tabWidth, height:tabHeight},
          animations: {
            "normal"  : [0],
            "disabled": [1],
            "active"  : [2]
          }
        }
        let icon_spriteSheet = new createjs.SpriteSheet(icon_spritesheet_data);
        this.howToTabIcon[i] = new createjs.Sprite(icon_spriteSheet,"normal");
        this.howToTabIcon[i].x = ((this._modalWidth / 2) * i) + (this._modalWidth / 4) - 10;
        this.howToTabIcon[i].y = this.howToTab[i].y + 8;

        this.howToTabLbl[i] = new createjs.Text(tabLbl[i],"bold 13px arial", "#2b2b2b");
        this.howToTabLbl[i].x = ((this._modalWidth / 2) * i) + (this._modalWidth / 4);
        this.howToTabLbl[i].y = this.howToTab[i].y + 35;
        this.howToTabLbl[i].textAlign = "center";

        if (i == 0) {
          this.howToTab[i].graphics.clear().beginFill(this.context.theme_color[window.theme].bet_record_tab_act);
          this.howToTabIcon[i].gotoAndPlay("active");
          this.howToTabLbl[i].color = "#ff9b28";
          this.howToTab[i].targ = "gamerules"
        } // end if
          if(i == 1) {
            this.howToTab[i].targ = "gameplay"
        }

        this.addChild(this.howToTab[i], this.howToTabIcon[i], this.howToTabLbl[i]);

        //Click tab event
        ((i) => {
          this.howToTab[i].addEventListener("mousedown", (e) => {
            $('.howto-wrap').animate({
                scrollTop : 0
              }, 0);
             if(e.currentTarget.targ == "gameplay") {
                  $(".-gameplay").show();
                  $(".-gamerules").hide();
              } else  if(e.currentTarget.targ == "gamerules") {
                  $(".-gameplay").hide();
                  $(".-gamerules").show();
              }

              for (var x = 0; x < tabLbl.length; x++) {
                  this.howToTab[x].graphics.clear().beginFill(this.context.theme_color[window.theme].bet_record_tab).drawRect(0, 0, this._modalWidth / tabLbl.length, 60);
                  this.howToTabIcon[x].gotoAndPlay("normal");
                  this.howToTabLbl[x].color = "#2b2b2b";
              }

              this.howToTab[i].graphics.clear().beginFill(this.context.theme_color[window.theme].bet_record_tab_act);
              this.howToTabIcon[i].gotoAndPlay("active");
              this.howToTabLbl[i].color = "#ff9b28";
          });
          }(i));
      } //for loop
    },

    reInitTab() {
      // Scroll to top of body
      $('.howto-wrap').animate({
        scrollTop : 0
      }, 500);

      for (var i = 0; i < 2; i++) {
        this.howToTab[i].graphics.clear().beginFill(this.context.theme_color[window.theme].bet_record_tab).drawRect(0, 0, this._modalWidth / 2, 60);
        this.howToTabIcon[i].gotoAndPlay("normal");
        this.howToTabLbl[i].color = "#2b2b2b";

        if (i == 0) {
          this.howToTab[i].graphics.clear().beginFill(this.context.theme_color[window.theme].bet_record_tab_act);
          this.howToTabIcon[i].gotoAndPlay("active");
          this.howToTabLbl[i].color = "#ff9b28";
        } // end if
      }
    },

    changeTheme(new_theme) {
      let theme, src, path, newSrc;
      this._modalHeader.graphics.beginLinearGradientFill([this.context.theme_color[new_theme].base_color, this.context.theme_color[new_theme].gradColor2], [.1, .9], 10, 10, 10, 35)
      .drawRoundRect(0, .8, this._modalWidth, 35, 3);
      this._headerTxt.color = this.context.theme_color[new_theme].labelcolor;
      this._headerClose.color = this.context.theme_color[new_theme].labelcolor;
      this._modalBg.graphics.beginFill(this.context.theme_color[new_theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);
      if(new_theme == 'black') {
        $(".howto-wrap").addClass("black-theme");
        $(".howto-wrap").removeClass("white-theme");
        // howtoplay change theme image
        let img = $(".changeImg").each(function() {
          src = $(this).attr("src");
          path  = src.split("/");
          theme = path.indexOf("light");
          path.splice(theme, 1, "dark");
          newSrc = path.join("/");
          $(this).attr("src",newSrc);
        });
      }

      if(new_theme == 'white') {
        $(".howto-wrap").addClass("white-theme");
        $(".howto-wrap").removeClass("black-theme");
        // howtoplay change theme image
        let img = $(".changeImg").each(function() {
          let theme, src, path, newSrc;
          src = $(this).attr("src");
          path  = src.split("/");
          theme = path.indexOf("dark");
          path.splice(theme, 1, "light");
          newSrc = path.join("/");
          $(this).attr("src",newSrc);
        });
      }
    }

  });
  return instance;
}
