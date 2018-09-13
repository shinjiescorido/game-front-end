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
      let lblSettingsArr = ["Sound Effects", "Voice", "Dark Theme", "Show Tutorial"];

      //Modal Header
      this._modalHeader = new createjs.Shape();
      this._modalHeader.graphics.beginLinearGradientFill([this.context.theme_color[window.theme].base_color, this.context.theme_color[window.theme].gradColor2], [.1, .9], 10, 10, 10, 35)
        .drawRoundRect(0, 0, this._modalWidth, 35, 3);
      this.addChild(this._modalHeader);

      //Header Text
      this._headerTxt = new createjs.Text('HOW TO PLAY',"bold 15px arial", this.context.theme_color[window.theme].labelcolor);
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
            switch (event.which) {
            case 1:
              this.context.component_menu.setActiveModal();
              this.visible = false;
                break;
          }
          });

      this._modalBg = new createjs.Shape();
      this._modalBg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);
      this._modalBg.y = this._modalHeader.y + 35;
      this.addChild(this._modalBg);

      let tabIcon = ["transfer-"+window.theme, "bet-logs-"+window.theme];
      let tabLbl = ['GAME RULES', 'GAMEPLAY TUTORIAL'];
      let howToTab = [];
      let howToTabIcon = [];
      let howToTabLbl = [];
      let howToTabPage = [];

      for (var i = 0; i < tabLbl.length; i++) {
        howToTab[i] = new createjs.Shape();
        howToTab[i].graphics.beginFill(this.context.theme_color[window.theme].bet_record_tab).drawRect(0, 0, this._modalWidth / 2, 60);
        howToTab[i].x = (this._modalWidth / 2) * i;
        howToTab[i].y = this._modalHeader.y + 35;
        howToTab[i].cursor = "pointer";
        howToTab[i].name = tabIcon[i];

        let icon_spritesheet_data = {
          images: [this.context.getResources(tabIcon[i])],
          frames: {width:20,height:20},
          animations: {
            "active": [0],
            "normal" : [1]
          }
        }
        let icon_spriteSheet = new createjs.SpriteSheet(icon_spritesheet_data);
        howToTabIcon[i] = new createjs.Sprite(icon_spriteSheet,"normal");
        howToTabIcon[i].x = ((this._modalWidth / 2) * i) + 110;
        howToTabIcon[i].y = howToTab[i].y + 8;

        howToTabLbl[i] = new createjs.Text(tabLbl[i],"bold 13px arial", "#2b2b2b");
        howToTabLbl[i].x = ((this._modalWidth / 2) * i) + 120;
        howToTabLbl[i].y = howToTab[i].y + 35;
        howToTabLbl[i].textAlign = "center";

        switch (i) {
          case 0:
            howToTabPage[i] = this.pageGameRules();
            howToTabPage[i].visible = false;
            break;
          case 1:
            howToTabPage[i] = this.pageGameplayTutorial();
            howToTabPage[i].visible = false;
            break;

        }

        if (i == 0) {
          howToTab[i].graphics.clear().beginFill(this.context.theme_color[window.theme].bet_record_tab_act);
          howToTabIcon[i].gotoAndPlay("active");
          howToTabLbl[i].color = "#ff9b28";
          howToTabPage[i].visible = true;
        } // end if

        this.addChild(howToTab[i], howToTabIcon[i], howToTabLbl[i], howToTabPage[i]);

        //Click tab event
        ((i) => {
              howToTab[i].addEventListener("mousedown", (e) => {
                switch (event.which) {
                case 1:
                  for (var x = 0; x < tabLbl.length; x++) {

                      howToTab[x].graphics.clear().beginFill(this.context.theme_color[window.theme].bet_record_tab).drawRect(0, 0, this._modalWidth / tabLbl.length, 60);
                      howToTabIcon[x].gotoAndPlay("normal");
                      howToTabLbl[x].color = "#2b2b2b";
                      howToTabPage[x].visible = false;
                  }

                  howToTab[i].graphics.clear().beginFill(this.context.theme_color[window.theme].bet_record_tab_act);
                  howToTabIcon[i].gotoAndPlay("active");
                  howToTabLbl[i].color = "#ff9b28";
                  howToTabPage[i].visible = true;
                  break;
              }
              });
          }(i));
      } //for loop



    },

    pageGameRules() {
      let font_t = "13px lato-black";
      let font_b = "13px lato-regular";
      let font_h = "bold 13px lato-regular";
      let font_s = "13px lato-regular";
      let lineheight_b = 18;
      let color_t = "#ffa000";
      let color_b = "#fff";
      let color_s = "#fff";
      let color_h = "#000";

      let page = new createjs.Container();

      let con = new createjs.Container();
      con.x = 10;
      con.y = 120;

      con.setBounds(0, 0, this._modalWidth - 40, 2100);
      let con_b = con.getBounds();

      page.addChild(con);

      let title = {
        a : new createjs.Text("Game Objective"),
        b : new createjs.Text("Gameplay"),
        c : new createjs.Text("Types of Bets"),
        d : new createjs.Text("Suit"),
        e : new createjs.Text("Suited Tie"),
      };
      for (let i of Object.values(title)) {
        i.font = font_t;
        i.color = color_t;
        i.height = i.getMetrics().height;
        con.addChild(i)
      }

      let body = {
        a : new createjs.Text("The game of Dragon Tiger is an Asian casino game that was first introduced in Cambodia. It is played with a Standard English deck of 52 cards, most often dealt from a blackjack shoe holding eight decks. "),
        b : new createjs.Text("The objective of the game is to correctly choose which hand, either the Dragon or the Tiger, will receive the highest card. Unlike Baccarat, only one card is dealt to the Dragon spot and then one to the Tiger spot. No additional cards are drawn."),
        c : new createjs.Text("Players put their wagers on the dedicated areas on the table."),
        d : new createjs.Text("After all wagers have been placed, the dealer will deal three (3) cards: the Burn, Dragon, and Tiger card onto its corresponding spot."),
        e : new createjs.Text("The highest ranking card will be declared as a winner."),
        f : new createjs.Text("There are no ranking of suits in the game of Dragon Tiger."),
        g : new createjs.Text("If the “Dragon” and “Tiger” hands have same rank regardless if it’s the same suit, the game is declared as a “Tie”. All “Dragon” and “Tiger” wagers shall lose 50% of the wagered amount and all “Tie” wagers win."),
        h : new createjs.Text("“Suited Tie” wager wins if both “Dragon” and “Tiger” has the same rank and suit, except when  “7” is dealt  for both “Dragon” and “Tiger” having same suit, “Suited Tie” wager loses."),
        i : new createjs.Text("All wagers on Suit, Suited Tie, Odd or Even, Big and Small loses if the “7” card will be dealt."),
        j : new createjs.Text("For example, if you placed a bet on the Diamond Suit on the Dragon side and it is the winning hand, you win a payout of 3:1."),
        k : new createjs.Text("If you placed a bet on the Tie Bet and both Dragon and Tiger have the exact same card, you win a payout of 50:1."),

      }
      Object.values(body).forEach((o, i) => {
        o.font = font_b;
        o.color = color_b;
        o.lineHeight = lineheight_b;
        o.lineWidth = con_b.width;
        if(i >= 2 && i <= 8) {
          o.x += 20;
          o.lineWidth -= 20;
          o.bullet = new createjs.Shape();
          o.bullet.graphics.beginFill(color_b).drawCircle(-2, (o.lineHeight/2), 2);
          o.bullet.x = o.x - 10;
          con.addChild(o.bullet);
        }
        o.height = o.getMetrics().height;
        con.addChild(o);

      });



      let tablehead = {
        bg : new createjs.Shape(),
        a : new createjs.Text("BET"),
        b : new createjs.Text("PAYOUT"),
        c : new createjs.Text("CONDITION OF WINNING")
      }
      for (let i of Object.values(tablehead)) {
        if(i.text) {
          i.textAlign = "center";
          i.textBaseline = "middle";
          i.font = font_h;
          i.color = color_h;
        }
        con.addChild(i);
      }
      tablehead.bg.graphics.beginFill("#b4b4b4").drawRect(-1, 0, 422, 30);
      tablehead.bg.x = 5;
      tablehead.a.x = tablehead.bg.x + 45;
      tablehead.b.x = tablehead.bg.x + 130;
      tablehead.c.x = tablehead.bg.x + 295;

      let table = this.drawTable([90, 80, 250], 7, 500);
      table.x = tablehead.bg.x;
      con.addChild(table);
      let tablecontent_aa = {
        a : new createjs.Text("Dragon"),
        b : new createjs.Text("Tiger"),
        c : new createjs.Text("Tie"),
        d : new createjs.Text("Big & Small"),
        e : new createjs.Text("Odd or Even"),
        f : new createjs.Text("Suited Tie"),
        g : new createjs.Text("Suit")
      };
      let tablecontent_ab = {
        a : new createjs.Text("1:1"),
        b : new createjs.Text("1:1"),
        c : new createjs.Text("10:1"),
        d : new createjs.Text("1:1"),
        e : new createjs.Text("1:1"),
        f : new createjs.Text("50:1"),
        g : new createjs.Text("3:1")
      };
      let tablecontent_ac = {
        a : new createjs.Text("When Dragon card has a higher value than Tiger card."),
        b : new createjs.Text("When Tiger card has a higher value then Dragon card."),
        c : new createjs.Text("After cards are dealt, Dragon and Tiger have the same hand."),
        d : new createjs.Text("If card dealt is either A,2,3,4,5,6 for Small and Big if card dealt is either 8,9,10,J,Q,K cards. Wagers lose if the “7” card is dealt."),
        e : new createjs.Text("If card dealt is either A,3,5,9,J,K for Odd and Even if card dealt is either 2,4,6,8,10,Q cards. Wagers lose if the “7” card is dealt."),
        f : new createjs.Text("Dragon and Tiger have the same hand and suit. Wagers lose if the “7” card is dealt."),
        g : new createjs.Text("The suit of the winning hand, either Dragon or Tiger, wins. Wagers lose if the “7” card is dealt.")
      };

      let rh = (table.height / table.rows);
      let count_text = count_text || 0;

      for (let i of Object.values(tablecontent_aa)) {
        i.font = font_s;
        i.color = color_s;
        i.x = 10;
        i.y = rh * count_text + 10;
        count_text++;

        table.addChild(i);
      } // end for
      count_text = 0;

      for (let i of Object.values(tablecontent_ab)) {
        i.font = font_s;
        i.color = color_s;
        i.x = table.columnwidths[0] + 10;
        i.y = rh * count_text + 10;
        count_text++;
        table.addChild(i);

      } // end for
      count_text = 0;

      for (let i of Object.values(tablecontent_ac)) {
        i.font = font_s;
        i.color = color_s;
        i.lineWidth = table.columnwidths[2] - 20;
        i.x = table.columnwidths[0] + table.columnwidths[1] + 10;
        i.y = rh * count_text + 10;
        count_text++;
        table.addChild(i);

      } // end for
      count_text = 0;

      let image = {
        a : new createjs.Bitmap(this.context.getResources("card_results")),
        b : new createjs.Bitmap(this.context.getResources("card_results"))
      };
      for (let i of Object.values(image)) {
        i.regX = i.image.width / 2
        i.x = con_b.width * 0.50;
        con.addChild(i);
      }



      title.a.y = 120;
      body.a.y = title.a.y + title.a.height + 20;
      body.b.y = body.a.y + body.a.height + 20;
      title.b.y = body.b.y + body.b.height + 40;
      body.c.y = title.b.y + title.b.height + 20;
        body.c.bullet.y = body.c.y;
      body.d.y = body.c.y + body.c.height + 20;
        body.d.bullet.y = body.d.y;
      body.e.y = body.d.y + body.d.height + 20;
        body.e.bullet.y = body.e.y;
      body.f.y = body.e.y + body.e.height + 20;
        body.f.bullet.y = body.f.y;
      body.g.y = body.f.y + body.f.height + 20;
        body.g.bullet.y = body.g.y;
      body.h.y = body.g.y + body.g.height + 20;
        body.h.bullet.y = body.h.y;
      body.i.y = body.h.y + body.h.height + 20;
        body.i.bullet.y = body.i.y;
      title.c.y = body.i.y + body.i.height + 40;
      tablehead.bg.y = title.c.y + title.c.height + 20;
      tablehead.a.y = tablehead.b.y = tablehead.c.y = tablehead.bg.y + 15;
      table.y = tablehead.bg.y + 30;
      title.d.y = table.y + table.height + 40;
      body.j.y = title.d.y + title.d.height + 20;
      image.a.y = body.j.y + body.j.height + 20;
      title.e.y = image.a.y + image.a.image.height + 40;
      body.k.y = title.e.y + title.e.height + 20;
      image.b.y = body.k.y + body.k.height + 20;



      let scrollprop = this.scrollable(page, con);

      // table of contents ---- at top of page
      this.makeScrollToButton(con, "Game Objective", 0, title.a.y, scrollprop); // content container, text, scroll from Y, scroll to Y, scroll properties
      this.makeScrollToButton(con, "Gameplay", 40, title.b.y, scrollprop);
      this.makeScrollToButton(con, "Types of Bets", 80, title.c.y, scrollprop);

      this.addChild(page);
      page.addChild(scrollprop.toTop_btn, scrollprop.top_glow);

      return page;
    },

    pageGameplayTutorial() {
      let font_t = "13px lato-black";
      let font_b = "13px lato-regular";
      let font_h = "bold 13px lato-regular";
      let font_s = "13px lato-regular";
      let lineheight_b = 18;
      let color_t = "#ffa000";
      let color_b = "#fff";
      let color_s = "#fff";
      let color_h = "#000";

      let page = new createjs.Container();
      let con = new createjs.Container();
      con.x = 20;
      con.y = 120;

      con.setBounds(0, 0, this._modalWidth - 40, 2050);
      let con_b = con.getBounds();

      page.addChild(con);

      let title = {
        a : new createjs.Text("MULTIBET"),
        b : new createjs.Text("DEALER INFO"),
        c : new createjs.Text("GAME STATISTICS"),
        d : new createjs.Text("PLAYER INFO"),
        e : new createjs.Text("BET INFO"),
        f : new createjs.Text("CHANNELS & BET INFO"),
        g : new createjs.Text("CARD DISPLAY"),
        h : new createjs.Text("BETTING BUTTONS & TIMER"),
        i : new createjs.Text("CHIP RACK"),
        j : new createjs.Text("MODIFY CHIPS"),
      };
      for (let i of Object.values(title)) {
        i.font = font_t;
        i.color = color_t;
        i.height = i.getMetrics().height;
        con.addChild(i);
      }

      let body = {
        a : new createjs.Text("The Multibet panel allows you to play three (3) table games on top of your current game. It also shows the Bead Plate and winning percentage of the Player/Dealer for that current game."),
        b : new createjs.Text("Shows the dealer's name, the game number, as well as the last winning dice combination."),
        c : new createjs.Text("Displays the last 150 winning results, game history on the Bead Plate, hot and cold numbers and the winning percentage of Odd/Even, Big/Small, Double and Triple. This updates after every game and resets after every dealer change."),
        d : new createjs.Text("Click         for Dragon predictions and         for Tiger Predictions. Click              to view Odd/Even game results displayed in the roadmap summary."),
        e : new createjs.Text("Shows your avatar, user ID and your game winning percentage. You can change your avatar at the lobby settings."),
        f : new createjs.Text("Displays your available credit balance for the current game, the total bet amount placed and the total amount won during the current round."),
        g : new createjs.Text("The channel number displays the current channel you are in and the game’s bet limits."),
        h : new createjs.Text("The center area of the screen displays the Undo, Confirm and Clear Buttons when placing your bets. The total time allotted for placing bets is 20 seconds. The timer turns orange when it’s the last 10 seconds of countdown. "),
        i : new createjs.Text("The Undo Button  changes to a Repeat Button  when there was a previous bet that you want to repeat for the next round."),
        j : new createjs.Text("To customize your chip rack based on your preference, click on the              button at the game menu. To modify chips, click on the chip you want to replace and click the replacement chip after. Click             once you’re okay with your new set of chips or click                     to clear all chips and start over."),
      }
      for (let i of Object.values(body)) {
        i.font = font_b;
        i.color = color_b;
        i.lineHeight = lineheight_b;
        i.lineWidth = con_b.width - 20;
        i.height = i.getMetrics().height;
        con.addChild(i);
      }

      let image = {
        a : new createjs.Bitmap(this.context.getResources("multibet")),
        b : new createjs.Bitmap(this.context.getResources("dealer_info")),
        c : new createjs.Bitmap(this.context.getResources("game_stats")),
        d : new createjs.Bitmap(this.context.getResources("player_info")),
        e : new createjs.Bitmap(this.context.getResources("bet_info")),
        f : new createjs.Bitmap(this.context.getResources("channels")),
        g : new createjs.Bitmap(this.context.getResources("card_backs")),
        h : new createjs.Bitmap(this.context.getResources("card_results")),
        i : new createjs.Bitmap(this.context.getResources("betting_buttons")),
        j : new createjs.Bitmap(this.context.getResources("chip_rack")),
        k : new createjs.Bitmap(this.context.getResources("modify_chips")),
      }
      for (let i of Object.values(image)) {
        if(i.image.width > this._modalWidth - 10) {
          i.scaleX = i.scaleY = (this._modalWidth - 10) / i.image.width;
        }

        con.addChild(i);
      }




      title.a.y = 0;
      body.a.y = title.a.y + title.a.height + 20;
      title.b.y = body.a.y + body.a.height + 80;
      body.b.y = title.b.y + title.b.height + 20;
      image.c.y = body.b.y + body.b.height + 120;
      title.c.y = image.c.y + image.c.image.height + 40;
      body.c.y = title.c.y + title.c.height + 20;
      body.d.y = body.c.y + body.c.height + 60;
      title.d.y = body.d.y + body.d.height + 40;
      body.e.y = title.d.y + title.d.height + 20;
      title.e.y = body.e.y + body.e.height + 100;
      body.f.y = title.e.y + title.e.height + 20;
      title.f.y = body.f.y + body.f.height + 100;
      body.g.y = title.f.y + title.f.height + 20;
        title.a.x = title.b.x = title.d.x = title.e.x = title.f.x = con_b.width * 0.5;
        body.a.lineWidth = body.b.lineWidth = body.e.lineWidth = body.f.lineWidth = body.g.lineWidth = con_b.width * 0.4;
        body.a.x = body.b.x = body.e.x = body.f.x = body.g.x = con_b.width * 0.5;
        image.a.y = title.a.y;
        image.b.y = title.b.y;
        image.d.y = title.d.y;
        image.e.y = title.e.y;
        image.f.y = title.f.y;
      title.g.y = image.f.y + image.f.image.height + 40;
        image.g.y = title.g.y + title.g.height + 40;
        image.h.y = title.g.y + title.g.height + 20;
        image.g.x = 10
        image.h.x = image.g.x + image.g.image.width + 10;
      title.h.y = image.h.y + image.h.image.height + 40;
      body.h.y = title.h.y + title.h.height + 20;
      image.i.y = body.h.y + body.h.height + 20;
      body.i.y = image.i.y + image.i.image.height + 20;
      title.i.y = body.i.y + body.i.height + 40;
      image.j.y = title.i.y + title.i.height + 20;
      title.j.y = image.j.y + image.j.image.height + 40;
      body.j.y = title.j.y + title.j.height + 20;
      image.k.y = body.j.y + body.j.height + 20;


      let scrollprop = this.scrollable(page, con);
      this.addChild(page);
      page.addChild(scrollprop.toTop_btn, scrollprop.top_glow);

      return page;

    },



    scrollable(page, content) {
      let content_bounds = content.getBounds();

      let view = new createjs.Shape();
      view.graphics.beginFill("#fff").drawRect(0, 0, this._modalWidth - 22.5, this._modalHeight - 120);
      view.setBounds(0, 0, this._modalWidth - 22.5, this._modalHeight - 120);
      view.alpha = 0;
      view.x = content.x;
      view.y = content.y;
      view.hitArea = new createjs.Shape();
      view.hitArea.graphics.beginFill("#fff").drawRect(0, 0, this._modalWidth - 22.5, this._modalHeight - 120);
      page.addChildAt(view, 0);
      content.mask = view;

      let view_bounds = view.getBounds();
      let curYPos = 0;
      let curDown = false;
      let top = view.y;
      let bottom = view.y - (content_bounds.height - view_bounds.height);
      let scrollbg;
      let scrollbar;
      let scroll_bottom = view.y + view_bounds.height - ((view_bounds.height / content_bounds.height) * view_bounds.height);
      let toTop_btn;
      let top_glow;

      if(content_bounds.height > view_bounds.height) {
        scrollbg = new createjs.Shape();
        scrollbg.graphics.beginStroke("#231f20").setStrokeStyle(5, "square")
          .moveTo(view.x + view_bounds.width - 2.5, view.y + 2.5)
          .lineTo(view.x + view_bounds.width - 2.5, view.y + view_bounds.height - 2.5);
        page.addChild(scrollbg);

        scrollbar = new createjs.Shape();
        scrollbar.graphics.beginStroke("#a7a7a7").setStrokeStyle(5, "round")
          .moveTo(view.x + view_bounds.width - 2.5, view.y + 2.5)
          .lineTo(view.x + view_bounds.width - 2.5, view.y + ((view_bounds.height / content_bounds.height) * view_bounds.height) - 2.5);
        scrollbar.regY = view.y;
        page.addChild(scrollbar);

        toTop_btn = new createjs.Shape();
        toTop_btn.graphics.beginFill("#ff9a28").drawCircle(0, 0, 15)
          .beginFill().beginStroke("#fff").setStrokeStyle(3, "round", "round")
          .moveTo(-5, 2.5).lineTo(0, -2.5).lineTo(5, 2.5);
        toTop_btn.alpha = 0.5;
        toTop_btn.visible = false;
        toTop_btn.x = view_bounds.width - 20;
        toTop_btn.y = view_bounds.height + 90;

        top_glow = new createjs.Shape();
        top_glow.graphics.beginLinearGradientFill(["#ff9a28", "transparent"], [0, 1], 0, -10, 0, 40).drawRect(0, 0, view_bounds.width - 5, 50);
        top_glow.x = 10; top_glow.y = top;
        top_glow.alpha = 0.7;
        top_glow.visible = false;


        content.y = top;
        scrollbar.y = top;
        // view.cursor = "all-scroll";


        scrollbar.addEventListener("mousedown", (e) => {
          curDown = true; curYPos = e.stageY;
        });
        scrollbar.addEventListener("pressup", (e) => {
          curDown = false;
        });
        scrollbar.addEventListener("pressmove", (e) => {
          if(curDown && content.y <= top && content.y >= bottom){
            if(e.stageY < curYPos) {
              content.y += Math.abs(e.stageY - curYPos) * (content_bounds.height / view_bounds.height);
              scrollbar.y -= Math.abs(e.stageY - curYPos);
            }
            else
            {
              content.y -= Math.abs(e.stageY - curYPos) * (content_bounds.height / view_bounds.height);
              scrollbar.y += Math.abs(e.stageY - curYPos);
            }
          } // end if
          if (content.y > top)      { content.y = top;      }
          if (content.y < bottom)   { content.y = bottom;   }
          if (scrollbar.y < top) { scrollbar.y = top;    }
          if (scrollbar.y > scroll_bottom)    { scrollbar.y = scroll_bottom; }

          if (content.y >= top - 100) {
            toTop_btn.visible = false;
            top_glow.visible = false;
          }
          else {
            toTop_btn.visible = true;
            top_glow.visible = true;
          }
          curYPos = e.stageY;
        });
        view.addEventListener("rollover", (e) => {
          window.addEventListener("wheel", scroller);
        });
        view.addEventListener("rollout", (e) => {
          window.removeEventListener("wheel", scroller);
        });
        toTop_btn.addEventListener("rollover", (e) => {
          e.target.alpha = 1;
        });
        toTop_btn.addEventListener("rollout", (e) => {
          e.target.alpha = 0.5;
        });
        toTop_btn.addEventListener("click", (e) => {
          createjs.Tween.get(content).to({
            y: top
          }, 300);
          createjs.Tween.get(scrollbar).to({
            y: top
          }, 300);
          toTop_btn.visible = false;
          top_glow.visible = false;
        });

      } // end if(content_bounds.height > view_bounds.height)

      function scroller(e) {
        if(content.y <= top && content.y >= bottom){
          content.y -= Math.floor(e.deltaY / 4) * (content_bounds.height / view_bounds.height);
          scrollbar.y += Math.floor(e.deltaY / 4);

        }
        if (content.y > top)      { content.y = top;      }
        if (content.y < bottom)   { content.y = bottom;   }
        if (scrollbar.y < top) { scrollbar.y = top;    }
        if (scrollbar.y > scroll_bottom)    { scrollbar.y = scroll_bottom; }

        if (content.y >= top - 100) {
          toTop_btn.visible = false;
          top_glow.visible = false;
        }
        else {
          toTop_btn.visible = true;
          top_glow.visible = true;
        }
      } // end function scroller

      return {"top": top, "bottom": bottom, "scrollbar": scrollbar, "scroll_bottom": scroll_bottom, "view_bounds": view_bounds, "toTop_btn": toTop_btn, "top_glow": top_glow}

    },

    makeScrollToButton(content, text, from_Y, to_Y, scrollprop) {
      let link_bg = new createjs.Shape();
      link_bg.graphics.beginFill("#ff9a28").drawRect(0, 0, this._modalWidth - 27.5, 40);
      link_bg.alpha = 0;
      link_bg.cursor = "pointer";
      link_bg.hitArea = new createjs.Shape();
      link_bg.hitArea.graphics.beginFill("#ddd").drawRect(0, 0, this._modalWidth - 27.5, 40);
      link_bg.x = 0;
      link_bg.y = from_Y;
      let link_lbl = new createjs.Text(text, "bold 13px lato-regular", "#ff9a28");
      link_lbl.textAlign = "center";
      link_lbl.textBaseline = "middle";

      link_lbl.x = link_bg.x + this._modalWidth / 2;
      link_lbl.y = link_bg.y + 20;

      content.addChild(link_bg, link_lbl);

      let content_shiftY = scrollprop.top - (to_Y - 10);
      let scrollbar_shiftY = (scrollprop.top + to_Y) * (scrollprop.view_bounds.height / content.getBounds().height);

      if (content_shiftY > scrollprop.top) {
        content_shiftY = content.top;
        scrollbar_shiftY = content.top;
      }
      if (content_shiftY < scrollprop.bottom) {
        content_shiftY = scrollprop.bottom;
        scrollbar_shiftY = scrollprop.scroll_bottom;
      }



      link_bg.addEventListener("rollover", (e) => {
        link_bg.alpha = 0.4;
        link_lbl.color = "#fff";
      });
      link_bg.addEventListener("rollout", (e) => {
        link_bg.alpha = 0;
        link_lbl.color = "#ff9a28";
      });
      link_bg.addEventListener("click", (e) => {
        createjs.Tween.get(content).to({
          y: content_shiftY
        }, 300);
        createjs.Tween.get(scrollprop.scrollbar).to({
          y: scrollbar_shiftY
        }, 300);

        scrollprop.toTop_btn.visible = true;
        scrollprop.top_glow.visible = true;


      });

      return [link_bg, link_lbl];
    },

    drawTable(columnwidths, rowcount, height) { //array of widths
      let con = new createjs.Container();
      let width = 0;

      let b = new createjs.Shape();
      b.graphics.setStrokeStyle(1).beginStroke("#fff");

      for(let i = 0; i < columnwidths.length; i++) {
        width += columnwidths[i];
        if(i < columnwidths.length - 1)
            b.graphics.moveTo(width, 0).lineTo(width, height);
      } // end for


      for(let i = 0; i < rowcount; i++) {
        b.graphics.moveTo(0, (height / rowcount) * (i + 1)).lineTo(width, (height / rowcount) * (i + 1));
      } // end for

      b.graphics.drawRect(0, 0, width, height);

      con.height = height;
      con.columns = columnwidths.length;
      con.columnwidths = columnwidths;
      con.rows = rowcount;

      con.addChild(b);

      return con;


    }




  });
  return instance;
}
