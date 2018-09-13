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
      this.x = 1360;
      this.visible = false;

      this._modalWidth = 450;
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
            // howToTabPage[i] = this.pageGameRules();
            howToTabPage[i].visible = false;
            break;
          case 1:
            // howToTabPage[i] = this.pageGameplayTutorial();
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
      let font_b = "13px LatoRegular";
      let font_h = "bold 13px LatoRegular";
      let font_s = "13px LatoRegular";
      let lineheight_b = 22;
      let color_t = "#ffa000";
      let color_b = "#4d4d4d";
      let color_s = "#fff";
      let color_h = "#000";

      let con = new createjs.Container();
      con.x = 10;
      con.y = 120;

      con.setBounds(0, 0, 360, 3340);
      let con_b = con.getBounds();

      // this.addChild(con);

      let title = {
        a : new createjs.Text("GAME OBJECTIVE"),
        b : new createjs.Text("CARD RANKINGS"),
        c : new createjs.Text("POKER HAND RANKINGS"),
        d : new createjs.Text("BETTING SYSTEM"),
        e : new createjs.Text("Bonus Bet Payouts"),
        f : new createjs.Text("Ante Bet Payouts"),
        g : new createjs.Text("SAME HAND RANKING (TIE)"),
      };
      for (let i of Object.values(title)) {
        i.font = font_t;
        i.color = color_t;
        i.height = i.getMetrics().height;
        con.addChild(i)
      }


      let body = {
        a : new createjs.Text("Nihtan Poker is a heads up form of Texas Hold’em Poker that is played online between a Dealer and Player/s. "),
        b : new createjs.Text("The goal is simple: win as many chips as you can, one pot at a time. You win a pot by having the best hand against the dealer."),
        c : new createjs.Text("Ace as the highest down to 2 \n (A-K-Q-J-10-9-8-7-6-5-4-3-2)"),
        d : new createjs.Text("•  Dealer pays even money on Ante Bet if poker hand is Straight or better, if not, bet is pushed."),
        e : new createjs.Text("•  If you fold during the first round, you lose your Ante Bet and Bonus Bet."),
        f : new createjs.Text("In case of tie, all bets are pushed except for BONUS bets."),
        g : new createjs.Text("There are two (2) possible situations:"),
        h : new createjs.Text("1.  “Play the board”"),
        i : new createjs.Text("	1.1. Both players and dealers opt to play the board."),
        j : new createjs.Text("2.  One or two hole cards used makes the winning hand"),

      }
      for (let i of Object.values(body)) {
        i.font = font_b;
        i.color = color_b;
        i.lineHeight = lineheight_b;
        i.lineWidth = con_b.width;
        i.height = i.getMetrics().height;
        con.addChild(i);
      }

      let strong = {
        a : new createjs.Text("1.	Royal Flush"),
        b : new createjs.Text("2.	Straight Flush"),
        c : new createjs.Text("3. Four of a Kind"),
        d : new createjs.Text("4. Full House"),
        e : new createjs.Text("5. Flush "),
        f : new createjs.Text("6. Straight "),
        g : new createjs.Text("7. Three of a Kind "),
        h : new createjs.Text("8. Two Pairs "),
        i : new createjs.Text("9. Pair "),
        j : new createjs.Text("10. High Card "),
      }
      let smallstrong = {
        ba : new createjs.Text("a.)	Highest Straight Flush "),
        bb : new createjs.Text("b.)	Lowest Straight Flush "),
        fa : new createjs.Text("a.)	Highest Straight "),
        fb : new createjs.Text("b.)	Lowest Straight "),
      }
      let small = {
        a : new createjs.Text("10, J, Q, K, A all of the same suit"),
        b : new createjs.Text("Any 5 suited cards in sequence"),
        ba : new createjs.Text("(K, Q, J, 10, 9) All of the same suit"),
        bb : new createjs.Text("(5, 4, 3, 2, A) All of the same suit"),
        c : new createjs.Text("All 4 cards of the same rank"),
        d : new createjs.Text("Three cards of the same rank combined with a pair"),
        e : new createjs.Text("Any 5 suited cards but not in sequence"),
        f : new createjs.Text("Any 5 off suit cards in sequence"),
        fa : new createjs.Text("(A, K, Q, J, 10) Off suit"),
        fb : new createjs.Text("(5, 4, 3, 2, A) Off suit"),
        g : new createjs.Text("Three cards of the same rank"),
        h : new createjs.Text("Two separate pairs"),
        i : new createjs.Text("Two cards of the same rank"),
        j : new createjs.Text("Unrelated cards ranked by the highest single card"),
      }

      for (let i of Object.values(strong)) {
        i.font = "bold "+font_b;
        i.color = color_s;
        i.textAlign = "right";
        i.height = i.getMetrics().height;
        i.x = con_b.width * 0.45;
        i.lineWidth = con_b.width * 0.45;
        con.addChild(i);
      }
      for (let i of Object.values(small)) {
        i.font = font_s;
        i.color = color_b;
        i.textAlign = "right";
        i.height = i.getMetrics().height;
        i.x = con_b.width * 0.45;
        i.lineWidth = con_b.width * 0.45;
        con.addChild(i);
      }
      for (let i of Object.values(smallstrong)) {
        i.font = font_h;
        i.color = color_b;
        i.textAlign = "right";
        i.height = i.getMetrics().height;
        i.x = con_b.width * 0.45;
        i.lineWidth = con_b.width * 0.45;
        con.addChild(i);
      }

      let image = {
        a : new createjs.Bitmap(this.context.getResources("royalflush")),
        ba : new createjs.Bitmap(this.context.getResources("straightflush_1")),
        bb : new createjs.Bitmap(this.context.getResources("straightflush_2")),
        c : new createjs.Bitmap(this.context.getResources("fourofakind")),
        d : new createjs.Bitmap(this.context.getResources("fullhouse")),
        e : new createjs.Bitmap(this.context.getResources("flush")),
        fa : new createjs.Bitmap(this.context.getResources("straight_1")),
        fb : new createjs.Bitmap(this.context.getResources("straight_2")),
        g : new createjs.Bitmap(this.context.getResources("threeofakind")),
        h : new createjs.Bitmap(this.context.getResources("twopairs")),
        i : new createjs.Bitmap(this.context.getResources("pair")),
        j : new createjs.Bitmap(this.context.getResources("highcard")),
        sa : new createjs.Bitmap(this.context.getResources("same_handranking_3.1")),
        sb : new createjs.Bitmap(this.context.getResources("same_handranking_3.2")),
      }
      for (let i of Object.values(image)) {
        i.x = con_b.width * 0.50;
        con.addChild(i);
      }
      image.sa.x = image.sb.x = con_b.width * 0.75;
      image.sa.regX = image.sa.image.width / 2;
      image.sb.regX = image.sa.image.width / 2;

      let tablehead_a = {
        bg : new createjs.Shape(),
        a : new createjs.Text("ROUND"),
        b : new createjs.Text("BET"),
        c : new createjs.Text("ACTION")
      }
      for (let i of Object.values(tablehead_a)) {
        if(i.text) {
          i.textAlign = "center";
          i.textBaseline = "middle";
          i.font = font_h;
          i.color = color_h;
        }
        con.addChild(i);
      }
      tablehead_a.bg.graphics.beginFill("#b4b4b4").drawRect(-1, 0, 322, 30);
      tablehead_a.bg.x = 5;
      tablehead_a.a.x = tablehead_a.bg.x + 45;
      tablehead_a.b.x = tablehead_a.bg.x + 135;
      tablehead_a.c.x = tablehead_a.bg.x + 250;

      let table_a = this.drawTable([90, 90, 140], 5, 450);
      table_a.x = tablehead_a.bg.x;
      con.addChild(table_a);
      let tablecontent_aa = {
        a : new createjs.Text("1st"),
        b : new createjs.Text("2nd"),
        c : new createjs.Text("3rd"),
        d : new createjs.Text("4th")
      }
      let tablecontent_ab = {
        a : new createjs.Text("Ante Bet"),
        b : new createjs.Text("Bonus Bet"),
        c : new createjs.Text("Flop Bet"),
        d : new createjs.Text("Turn Bet"),
        e : new createjs.Text("River Bet")
      }

      let tablecontent_ac = {
        a : new createjs.Text("A player should bet in the ante wager to be given hole cards."),
        b : new createjs.Text("A player can only place a wager if he/she has placed an ante bet and can win a corresponding bonus."),
        c : new createjs.Text("Player’s option to DOUBLE the ante or FOLD"),
        d : new createjs.Text("Player’s option to CALL the ante or CHECK"),
        e : new createjs.Text("Player’s option to CALL or CHECK")
      }

      let rh = (table_a.height / table_a.rows);
      let count_text = count_text || 0;

      for (let i of Object.values(tablecontent_aa)) {
        i.font = font_s;
        i.color = color_s;
        i.x = 10;
        i.y = rh * count_text + 10;
        count_text++;

        table_a.addChild(i);
      } // end for
      count_text = 0;

      for (let i of Object.values(tablecontent_ab)) {
        i.font = font_s;
        i.color = color_s;
        i.x = table_a.columnwidths[0] + 10;
        i.y = rh * count_text + 10;
        count_text++;
        table_a.addChild(i);

      } // end for
      count_text = 0;

      for (let i of Object.values(tablecontent_ac)) {
        i.font = font_s;
        i.color = color_s;
        i.lineWidth = table_a.columnwidths[2] - 10;
        i.x = table_a.columnwidths[0] + table_a.columnwidths[1] + 5;
        i.y = rh * count_text + 10;
        count_text++;
        table_a.addChild(i);

      } // end for
      count_text = 0;



      let tablehead_b = {
        bg : new createjs.Shape(),
        a : new createjs.Text("PLAYER’S 2 HOLE CARDS"),
        b : new createjs.Text("PAYOUT")
      }
      for (let i of Object.values(tablehead_b)) {
        if(i.text) {
          i.textAlign = "center";
          i.textBaseline = "middle";
          i.font = font_h;
          i.color = color_h;
        }
        con.addChild(i);
      }
      tablehead_b.bg.graphics.beginFill("#b4b4b4").drawRect(-1, 0, 322, 30);
      tablehead_b.bg.x = 5;
      tablehead_b.a.x = tablehead_b.bg.x + 80;
      tablehead_b.b.x = tablehead_b.bg.x + 240;
      let table_b = this.drawTable([160, 160], 7, 210);
      table_b.x = tablehead_b.bg.x;
      con.addChild(table_b);
      rh = (table_b.height / table_b.rows);
      let tablecontent_ba = {
        a : new createjs.Text("A-A"),
        b : new createjs.Text("A-K (Suited)"),
        c : new createjs.Text("A-Q or A-J (Suited)"),
        d : new createjs.Text("A-K (Off Suit)"),
        e : new createjs.Text("K-K, Q-Q, J-J"),
        f : new createjs.Text("A-Q or A-J (Off Suit)"),
        g : new createjs.Text("Any Pair 2-10"),
      }
      let tablecontent_bb = {
        a : new createjs.Text("30:1"),
        b : new createjs.Text("25:1"),
        c : new createjs.Text("20:1"),
        d : new createjs.Text("15:1"),
        e : new createjs.Text("10:1"),
        f : new createjs.Text("5:1"),
        g : new createjs.Text("3:1")
      }
      for (let i of Object.values(tablecontent_ba)) {
        i.font = font_s;
        i.color = color_s;
        i.textAlign = "center";
        i.textBaseline = "middle";
        i.x = table_b.columnwidths[0] / 2;
        i.y = rh * count_text + (rh / 2);
        count_text++;
        table_b.addChild(i);
      } // end for
      count_text = 0;

      for (let i of Object.values(tablecontent_bb)) {
        i.font = font_s;
        i.color = color_s;
        i.textAlign = "center";
        i.textBaseline = "middle";
        i.x = table_b.columnwidths[0] + table_b.columnwidths[1] / 2;
        i.y = rh * count_text + (rh / 2);
        count_text++;
        table_b.addChild(i);

      } // end for
      count_text = 0;

      let caption = {
        aa : new createjs.Text("DEALER"),
        ab : new createjs.Text("COMMUNITY CARDS"),
        ac : new createjs.Text("PLAYER"),
        ba : new createjs.Text("DEALER"),
        bb : new createjs.Text("COMMUNITY CARDS"),
        bc : new createjs.Text("PLAYER"),
      }
      for (let i of Object.values(caption)) {
        if(i.text) {
          i.textAlign = "right";
          i.font = font_s;
          i.color = color_s;
          i.x = image.sa.x - (image.sa.image.width / 2) - 10;
        }
        con.addChild(i);
      }


      title.a.y = 180;
      body.a.y = title.a.y + title.a.height + 20;
      body.b.y = body.a.y + body.a.height + 20;
      title.b.y = body.b.y + body.b.height + 40;
      body.c.y = title.b.y + title.b.height + 20;
      title.c.y = body.c.y + body.c.height + 40;
        strong.a.y = title.c.y + title.c.height + 30;
        image.a.y = strong.a.y;
        small.a.y = strong.a.y + strong.a.height + 10;
        strong.b.y = small.a.y + small.a.height + 30;
        small.b.y = strong.b.y + strong.b.height + 10;
          smallstrong.ba.y = small.b.y + small.b.height + 30;
          image.ba.y = smallstrong.ba.y;
          small.ba.y = smallstrong.ba.y + smallstrong.ba.height + 10;
          smallstrong.bb.y = small.ba.y + small.ba.height + 30;
          image.bb.y = smallstrong.bb.y;
          small.bb.y = smallstrong.bb.y + smallstrong.bb.height + 10;
        strong.c.y = small.bb.y + small.bb.height + 30;
        image.c.y = strong.c.y;
        small.c.y = strong.c.y + strong.c.height + 10;
        strong.d.y = small.c.y + small.c.height + 30;
        image.d.y = strong.d.y;
        small.d.y = strong.d.y + strong.d.height + 10;
        strong.e.y = small.d.y + small.d.height + 30;
        image.e.y = strong.e.y;
        small.e.y = strong.e.y + strong.e.height + 10;
        strong.f.y = small.e.y + small.e.height + 30;
        small.f.y = strong.f.y + strong.f.height + 10;
          smallstrong.fa.y = small.f.y + small.f.height + 30;
          image.fa.y = smallstrong.fa.y;
          small.fa.y = smallstrong.fa.y + smallstrong.fa.height + 10;
          smallstrong.fb.y = small.fa.y + small.fa.height + 30;
          image.fb.y = smallstrong.fb.y;
          small.fb.y = smallstrong.fb.y + smallstrong.fb.height + 10;
        strong.g.y = small.fb.y + small.fb.height + 30;
        image.g.y = strong.g.y;
        small.g.y = strong.g.y + strong.g.height + 10;
        strong.h.y = small.g.y + small.g.height + 30;
        image.h.y = strong.h.y;
        small.h.y = strong.h.y + strong.h.height + 10;
        strong.i.y = small.h.y + small.h.height + 30;
        image.i.y = strong.i.y;
        small.i.y = strong.i.y + strong.i.height + 10;
        strong.j.y = small.i.y + small.i.height + 30;
        image.j.y = strong.j.y;
        small.j.y = strong.j.y + strong.j.height + 10;
      title.d.y = small.j.y + small.j.height + 40;
      tablehead_a.bg.y = title.d.y + title.d.height + 20;
      tablehead_a.a.y = tablehead_a.b.y = tablehead_a.c.y = tablehead_a.bg.y + 15;
      table_a.y = tablehead_a.bg.y + 30;
      title.e.y = table_a.y + table_a.height + 40;
      tablehead_b.bg.y = title.e.y + title.e.height + 20;
      tablehead_b.a.y = tablehead_b.b.y = tablehead_b.bg.y + 15;
      table_b.y = tablehead_b.bg.y + 30;
      title.f.y = table_b.y + table_b.height + 40;
      body.d.y = title.f.y + title.f.height + 20;
      body.e.y = body.d.y + body.d.height + 20;
      title.g.y = body.e.y + body.e.height + 40;
      body.e.y = title.g.y + title.g.height + 20;
      body.f.y = body.e.y + body.e.height + 20;
      body.g.y = body.f.y + body.f.height + 20;
      body.h.y = body.g.y + body.g.height + 20;
      body.i.y = body.h.y + body.h.height + 10;
      image.sa.y = body.i.y + body.i.height + 20;
        caption.aa.y = image.sa.y + 20;
        caption.ab.y = caption.aa.y + 40;
        caption.ac.y = caption.ab.y + 40;
      body.j.y = image.sa.y + image.sa.image.height + 10;
      image.sb.y = body.j.y + body.j.height + 20;
        caption.ba.y = image.sb.y + 20;
        caption.bb.y = caption.ba.y + 40;
        caption.bc.y = caption.bb.y + 40;


      let scrollprop = this.scrollable(this, con);

      // table of contents ---- at top of page
      this.makeScrollToButton(con, "GAME OBJECTIVE", 0, title.a.y, scrollprop); // content container, text, scroll from Y, scroll to Y, scroll properties
      this.makeScrollToButton(con, "POKER HAND RANKINGS", 40, title.c.y, scrollprop);
      this.makeScrollToButton(con, "BETTING SYSTEM", 80, title.d.y, scrollprop);
      this.makeScrollToButton(con, "SAME HAND RANKING", 120, title.g.y, scrollprop);

      this.addChild(scrollprop.toTop_btn, scrollprop.top_glow);

      return con;
    },

    pageGameplayTutorial() {
      let font_t = "13px lato-black";
      let font_b = "13px lato-regular";
      let font_h = "bold 13px LatoRegular";
      let font_s = "13px LatoRegular";
      let lineheight_b = 18;
      let color_t = "#ffa000";
      let color_b = "#fff";
      let color_s = "#fff";
      let color_h = "#000";

      let page = new createjs.Container();
      let con = new createjs.Container();
      con.x = 10;
      con.y = 120;

      con.setBounds(0, 0, this._modalWidth - 40, 2740);
      let con_b = con.getBounds();

      // page.addChild(con);

      let title = {
        a : new createjs.Text("MULTIBET"),
        b : new createjs.Text("DEALER INFO"),
        c : new createjs.Text("GAME STATISTICS"),
        d : new createjs.Text("BONUS PAYOUTS"),
        e : new createjs.Text("PLAYER INFO"),
        f : new createjs.Text("BET INFO"),
        g : new createjs.Text("CHANNELS & BET LIMIT"),
        h : new createjs.Text("CARD DISPLAY"),
        i : new createjs.Text("BETTING BUTTONS & TIMER"),
        j : new createjs.Text("CHIP RACK"),
        k : new createjs.Text("MODIFY CHIPS"),
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
        c : new createjs.Text("Displays the game history on the Bead Plate and the winning results of the last three games. This updates after every game and resets after every dealer change."),
        d : new createjs.Text("Displays the bonus payout information for your hole cards."),
        e : new createjs.Text("Shows your avatar, user ID and your game winning percentage. You can change your avatar at the lobby settings."),
        f : new createjs.Text("Displays your available credit balance for the current game, the total bet amount placed and the total amount won during the current round."),
        g : new createjs.Text("The channel number displays the current channel you are in and the game’s bet limits."),
        h : new createjs.Text("•	Dealer\n•	Community Cards\n•	Player"),
        i : new createjs.Text("During gameplay, the Roadmap panel will switch to the Card Display panel and show the dealer, community and player’s digital cards. The dealer’s cards will be dealt face down until the River round has been finished."),
        j : new createjs.Text("The center area of the screen displays the Undo, Confirm and Clear Buttons when placing your bets. The total time allotted for placing bets is 20 seconds. The timer turns orange when it’s the last 10 seconds of countdown. "),
        k : new createjs.Text("The Undo Button       changes to a Repeat Button       when there was a previous bet that you want to repeat for the next round."),
        l : new createjs.Text("This is the chip tray area where the default or your preferred set of chips are displayed."),
        m : new createjs.Text("To customize your chip rack based on your preference, click on the              button at the game menu. To modify chips, click on the chip you want to replace and click the replacement chip after. Click                     once you’re okay with your new set of chips or click    to clear all chips and start over.")
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
        c : new createjs.Bitmap(this.context.getResources("stats")),
        d : new createjs.Bitmap(this.context.getResources("card_results")),
        e : new createjs.Bitmap(this.context.getResources("payouts")),
        f : new createjs.Bitmap(this.context.getResources("player_info")),
        g : new createjs.Bitmap(this.context.getResources("bet_info")),
        h : new createjs.Bitmap(this.context.getResources("channels")),
        i : new createjs.Bitmap(this.context.getResources("betting_buttons")),
        j : new createjs.Bitmap(this.context.getResources("chip_rack")),
        k : new createjs.Bitmap(this.context.getResources("modify_chips")),
      }
      for (let i of Object.values(image)) {
        if(i.image.width > con_b.width - 10) {
          i.scaleX = i.scaleY = (con_b.width - 10) / i.image.width;
        }
        con.addChild(i);
      }


      // image.d.y = body.d.y;
      // image.d.visible = false;

      title.a.y = 0;
      image.a.y = title.a.y;
      body.a.y = title.a.y + title.a.height + 20;

      title.b.y = body.a.y + body.a.height + 100;
      image.b.y = title.b.y;
      body.b.y = title.b.y + title.b.height + 20;

      image.c.y = body.b.y + body.b.height + 120;
      title.c.y = image.c.y + image.c.image.height - 20;
      body.c.y = title.c.y + title.c.height + 20;

      title.d.y = body.c.y + body.c.height + 40;
      image.e.y = title.d.y;
      body.d.y = title.d.y + title.d.height + 20;

      title.e.y = body.d.y + body.d.height + 100;
      image.f.y = title.e.y;
      body.e.y = title.e.y + title.e.height + 20;

      title.f.y = body.e.y + body.e.height + 100;
      image.g.y = title.f.y;
      body.f.y = title.f.y + title.f.height + 20;

      title.g.y = body.f.y + body.f.height + 100;
      image.h.y = title.g.y;
      body.g.y = title.g.y + title.g.height + 20;

        title.a.x = title.b.x = title.d.x = title.e.x = title.f.x = title.g.x = con_b.width * 0.5 + 10;
        body.a.x = body.b.x = body.d.x = body.e.x = body.f.x = body.g.x = con_b.width * 0.5 + 10;
        body.a.lineWidth = body.b.lineWidth = body.d.lineWidth = body.e.lineWidth = body.f.lineWidth = body.g.lineWidth = con_b.width * 0.4;

      title.h.y = body.g.y + body.g.height + 100;
      image.d.y = title.h.y + title.h.height + 20;
      body.h.y = image.d.y + image.d.image.height - 20;
      body.i.y = body.h.y + body.h.height + 20;

      title.i.y = body.i.y + body.i.height + 40;
      body.j.y = title.i.y + title.i.height + 20;
      image.i.y = body.j.y + body.j.height + 20;
      body.k.y = image.i.y + image.i.image.height + 20;

      title.j.y = body.k.y + body.k.height + 40;
      body.l.y = title.j.y + title.j.height + 20;
      image.j.y = body.l.y + body.l.height + 20;

      title.k.y = image.j.y + image.j.image.height + 40;
      body.m.y = title.k.y + title.k.height + 20;
      image.k.y = body.m.y + body.m.height + 20;


      let scrollprop = this.scrollable(page, con);
      this.addChild(page);
      page.addChild(scrollprop.toTop_btn, scrollprop.top_glow);

      return page;

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
      page.addChild(view);
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
    }




  });
  return instance;
}
