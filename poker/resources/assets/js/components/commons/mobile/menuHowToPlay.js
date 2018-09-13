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
	let isFlag = false;

	instance = instance || new blu.Component({
		theme : window.theme,
		main() {
      this._modalWidth = 900;
			this._modalHeight = 540;

      this.x = this.context.stage.baseWidth - this._modalWidth - 130;
			this.y = 90;
			this.visible = false;

			let newVolume = "";
			let lblsettingsY = 0;
			let settingsName = [];
			let settingsToggle = [];
			let settingsCircle = [];
			let settingsToggleHit = [];
			let color = [];

			//Modal Header
			this._modalHeader = new createjs.Shape();
			this._modalHeader.graphics.beginLinearGradientFill([this.context.theme_color[this.theme].base_color, this.context.theme_color[this.theme].gradColor2], [.1, .9], 10, 10, 10, 52)
				// .drawRoundRectComplex(0, 0, this._modalWidth, 52, 3, 3, 0, 0);
        .drawRoundRect(0, 0, this._modalWidth, 52, 3);
			this.addChild(this._modalHeader);

			//Header Text
			this._headerTxt = new createjs.Text(window.language.menu.howtoplaycaps,"bold 15px arial", this.context.theme_color[this.theme].labelcolor);
			this._headerTxt.x = this._modalHeader.x + 15;
			this._headerTxt.y = this._modalHeader.y + 14;
			this._headerTxt.scaleX = this._headerTxt.scaleY = 1.5;
			this.addChild(this._headerTxt);

			//Header Close button
			this._headerClose = new createjs.Text("X","bold 15px arial", this.context.theme_color[this.theme].labelcolor);
			this._headerClose.x = this._modalWidth - 43.7;
			this._headerClose.y = this._modalHeader.y + 14;
			this._headerClose.scaleX = this._headerClose.scaleY = 1.5;
			this.addChild(this._headerClose);

			//Close button hitarea
			this._headerCloseHit = new createjs.Shape();
			this._headerCloseHit.graphics.beginFill("#000").drawRect(-6, -6, 40, 40);
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
			this._modalBg.graphics.beginFill(this.context.theme_color[this.theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);
			this._modalBg.y = this._modalHeader.y + 52;
			this.addChild(this._modalBg);

      let tabIcon = ["game-rules-"+this.theme, "gameplay-"+this.theme];
      this.tabLbl = [window.language.menu.gamerules, window.language.menu.gameplaytutorial];
			this.howToTab = [];
			this.howToTabIcon = [];
			this.howToTabLbl = [];

			for (var i = 0; i < this.tabLbl.length; i++) {
				this.howToTab[i] = new createjs.Shape();
				this.howToTab[i].graphics.beginFill(this.context.theme_color[this.theme].bet_record_tab).drawRect(0, 0, this._modalWidth / 2, 80);
				this.howToTab[i].x = (this._modalWidth / 2) * i;
				this.howToTab[i].y = this._modalHeader.y + 52;
				this.howToTab[i].cursor = "pointer";
				this.howToTab[i].name = tabIcon[i];

				let tabWidth = 18;
        let tabHeight = 22;

        if (tabIcon[i] == "game-rules-"+this.theme) {
          tabWidth = 13;
          // tabHeight = 22;
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
        let tab_width = this._modalWidth / 2;
				this.howToTabIcon[i] = new createjs.Sprite(icon_spriteSheet,"normal");
				this.howToTabIcon[i].x = ((tab_width * i) + tab_width/2) - 10;
				this.howToTabIcon[i].y = this.howToTab[i].y + 13;

				this.howToTabLbl[i] = new createjs.Text(this.tabLbl[i],"bold 22px lato-regular", "#2b2b2b");
				this.howToTabLbl[i].x = (tab_width * i) + tab_width/2;
				this.howToTabLbl[i].y = this.howToTab[i].y + 42;
				this.howToTabLbl[i].textAlign = "center";


				if (i == 0) {
					this.howToTab[i].graphics.clear().beginFill(this.context.theme_color[this.theme].bet_record_tab_act);
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

		        	for (var x = 0; x < this.tabLbl.length; x++) {
  								this.howToTab[x].graphics.clear().beginFill(this.context.theme_color[this.theme].bet_record_tab).drawRect(0, 0, this._modalWidth / this.tabLbl.length, 80);
  								this.howToTabIcon[x].gotoAndPlay("normal");
  								this.howToTabLbl[x].color = "#2b2b2b";
							}

		        	this.howToTab[i].graphics.clear().beginFill(this.context.theme_color[this.theme].bet_record_tab_act);
							this.howToTabIcon[i].gotoAndPlay("active");
							this.howToTabLbl[i].color = "#ff9b28";
  					})
			    }(i));
			} //for loop
		},

		reInitTab() {
      // Scroll to top of body
      $('.howto-wrap').animate({
        scrollTop : 0
      }, 500);

      for (var i = 0; i < 2; i++) {
        this.howToTab[i].graphics.clear().beginFill(this.context.theme_color[this.theme].bet_record_tab).drawRect(0, 0, this._modalWidth / 2, 80);
        this.howToTabIcon[i].gotoAndPlay("normal");
        this.howToTabLbl[i].color = "#2b2b2b";

        if (i == 0) {
          this.howToTab[i].graphics.clear().beginFill(this.context.theme_color[this.theme].bet_record_tab_act);
          this.howToTabIcon[i].gotoAndPlay("active");
          this.howToTabLbl[i].color = "#ff9b28";
        } // end if
      }
		},

		changeTheme(new_theme) {
			let newTheme, currentTheme;
      this.theme = new_theme;
      this._modalHeader.graphics.clear().beginLinearGradientFill([this.context.theme_color[new_theme].base_color, this.context.theme_color[new_theme].gradColor2], [.1, .9], 10, 10, 10, 52)
      .drawRoundRect(0, 0, this._modalWidth, 52, 3);
      this._headerTxt.color = this.context.theme_color[new_theme].labelcolor;
      this._headerClose.color = this.context.theme_color[new_theme].labelcolor;
      this._modalBg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);

			if(new_theme == 'black') {
        $(".howto-wrap").addClass("black-theme");
        $(".howto-wrap").removeClass("white-theme");
        // howtoplay change theme image
        let img = $(".changeImg").each(function() {
          let theme, src, path, newSrc;
          src = $(this).attr("src");
          path  = src.split("/");
          theme = path.indexOf("light");
					if(theme != -1) {
            path.splice(theme, 1, "dark");
          }
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
					if(theme != -1) {
            path.splice(theme, 1, "light");
          }
          newSrc = path.join("/");
          $(this).attr("src",newSrc);
        });
      }

      let tabIcon = ["game-rules-" + new_theme, "gameplay-" + new_theme];
      for (var i = 0; i < this.tabLbl.length; i++) {
        this.howToTab[i].graphics.clear().beginFill(this.context.theme_color[new_theme].bet_record_tab).drawRect(0, 0, this._modalWidth / 2, 80);
        this.howToTab[i].name = tabIcon[i];

        let tabWidth = 18;
        let tabHeight = 22;


        if (tabIcon[i] == "game-rules-" + new_theme) {
          tabWidth = 13;
          // tabHeight = 22;
        }

        let icon_spritesheet_data = {
          images: [this.context.getResources(tabIcon[i])],
          frames: {
            width: tabWidth,
            height: tabHeight
          },
          animations: {
            "normal": [0],
            "disabled": [1],
            "active": [2]
          }
        }

        let icon_spriteSheet = new createjs.SpriteSheet(icon_spritesheet_data);
        this.howToTabIcon[i].spriteSheet = icon_spriteSheet;
        this.howToTabIcon[i].gotoAndPlay("normal");

        if (i == 0) {
            this.howToTab[i].graphics.clear().beginFill(this.context.theme_color[new_theme].bet_record_tab_act);
            this.howToTabIcon[i].gotoAndPlay("active");
        }
      }
    }

	});
	return instance;
}
