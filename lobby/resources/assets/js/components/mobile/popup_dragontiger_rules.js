let instance = null;

export default() => {
	instance = instance || new blu.Component({
		ads : [],
		circle_indicator : [],
		main() {
      this.context.removeChild(this);

      //content
      this.x = 40;
      this.y = 150;
		},

    init() {
      this.content = this.writeContent();
      this.scrollprop = this.context.lobby_scrollbar.scrollable(this, this.content.con, 750, 560, true);
      this.addChild(this.scrollprop.toTop_btn);
      this.scrollprop.toTop_btn.scaleX = this.scrollprop.toTop_btn.scaleY = 2.5;
      this.scrollprop.toTop_btn.x -= 40;
      this.scrollprop.toTop_btn.y -= 20;


      // toc... table of contents
      let toc_con = new createjs.Container();
      toc_con.y = 60;
      this.addChild(toc_con);
      let toc_bg = new createjs.Shape();
      toc_bg.graphics.setStrokeStyle(2).beginStroke("#fff").beginFill("#000").drawRoundRect(0, 0, 320, 240, 8);
      toc_bg.alpha = 0.4;
      toc_bg.setBounds(0, 0, 320, 240);
      toc_bg.y = -60;
      let toc_b = toc_bg.getBounds();
      toc_con.addChild(toc_bg);
      let toc_borders = new createjs.Shape();
      toc_borders.graphics.setStrokeStyle(0.4).beginStroke("#fff").moveTo(toc_bg.x + 20, toc_bg.y + 20.5).lineTo(toc_b.width - 20, toc_bg.y + 20.5);
      toc_borders.graphics.moveTo(toc_bg.x + 20, toc_b.height - 80.5).lineTo(toc_b.width - 20, toc_b.height - 80.5);
      toc_con.addChild(toc_borders);

      let scrollto = [
        [new createjs.Shape(), new createjs.Text("Game Objective"), this.content.titles.a.y],
        [new createjs.Shape(), new createjs.Text("Gameplay"), this.content.titles.b.y],
        [new createjs.Shape(), new createjs.Text("Types of Bets"), this.content.titles.c.y], ]
      scrollto.forEach((o, i)=>{
        let h = 50;

        o[0].graphics.beginFill("#ff9a28").drawRect(0, 0, toc_b.width, h);
        o[0].alpha = 0;
        o[0].cursor = "pointer";
        o[0].hitArea = new createjs.Shape();
	      o[0].hitArea.graphics.beginFill("#ddd").drawRect(0, 0, toc_b.width, h);
        o[0].y = (h * i);
        this.context.lobby_scrollbar.makeScrollToButton(this.content.con, o[0], o[2], this.scrollprop);

        o[1].font = "30px LatoBlack";
        o[1].color = "#ffa000";
        o[1].mouseEnabled = false;
        o[1].textAlign = "center";
        o[1].textBaseline = "middle";
        o[1].x = (toc_b.width / 2);
        o[1].y = (h * i) + (h / 2) - 20;

        o[0].addEventListener("rollover", (e) => {
	        o[0].alpha = 0.4;
	        o[1].color = "#fff";
	      });
	      o[0].addEventListener("rollout", (e) => {
	        o[0].alpha = 0;
	        o[1].color = "#ffa000";
	      });

        toc_con.addChild(o[0], o[1]);
      });
    },

    writeContent() {
      let font_t = "30px LatoBlack";
      let font_b = "28px LatoRegular";
      let font_h = "bold 21px LatoRegular";
      let font_s = "21px LatoRegular";
      let lineheight_b = 33;
      let linewidth_b = 600;
      let color_t = "#ffa000";
      let color_b = "#eee";
      let color_s = "#eee";
      let color_h = "#000";

      let images = this.context.lobby_howtoplay.images;


      let con = new createjs.Container();
      con.x = 450;

      this.addChild(con);

      let title = {
        a : new createjs.Text("GAME OBJECTIVE"),
        b : new createjs.Text("GAMEPLAY"),
        c : new createjs.Text("TYPES OF BETS"),
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
        c : new createjs.Text("    •  Players put their wagers on the dedicated areas on the table."),
        d : new createjs.Text("    •  After all wagers have been placed, the dealer will deal three (3) cards: the Burn, Dragon, and Tiger card onto its corresponding spot."),
        e : new createjs.Text("    •  The highest ranking card will be declared as a winner."),
        f : new createjs.Text("    •  There are no ranking of suits in the game of Dragon Tiger."),
        g : new createjs.Text("    •  If the “Dragon” and “Tiger” hands have same rank regardless if it’s the same suit, the game is declared as a “Tie”. All “Dragon” and “Tiger” wagers shall lose 50% of the wagered amount and all “Tie” wagers win."),
        h : new createjs.Text("    •  “Suited Tie” wager wins if both “Dragon” and “Tiger” has the same rank and suit, except when  “7” is dealt  for both “Dragon” and “Tiger” having same suit, “Suited Tie” wager loses."),
        i : new createjs.Text("    •  All wagers on Suit, Suited Tie, Odd or Even, Big and Small loses if the “7” card will be dealt."),
        j : new createjs.Text("For example, if you placed a bet on the Diamond Suit on the Dragon side and it is the winning hand, you win a payout of 3:1."),
        k : new createjs.Text("If you placed a bet on the Tie Bet and both Dragon and Tiger have the exact same card, you win a payout of 50:1."),

      }
      for (let i of Object.values(body)) {
        i.font = font_b;
        i.color = color_b;
        i.lineHeight = lineheight_b;
        i.lineWidth = linewidth_b;
        i.height = i.getMetrics().height;
        con.addChild(i);
      }


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
      tablehead.bg.graphics.beginFill("#b4b4b4").drawRect(-1, 0, 594, 50);
      tablehead.bg.x = 5;
      tablehead.a.x = tablehead.bg.x + 70;
      tablehead.b.x = tablehead.bg.x + 200;
      tablehead.c.x = tablehead.bg.x + 430;

      let table = this.context.lobby_howtoplay.drawTable([134, 134, 324], 7, 850);
      table.x = tablehead.bg.x;
      con.addChild(table);
      let tablecontent_aa = {
        a : new createjs.Text("Dragon"),
        b : new createjs.Text("Tiger"),
        c : new createjs.Text("Tie"),
        d : new createjs.Text("Big & Small"),
        e : new createjs.Text("Odd or Even"),
        f : new createjs.Text("Suited Tie"),
        g : new createjs.Text("Suit"),
      }
      let tablecontent_ab = {
        a : new createjs.Text("1:1"),
        b : new createjs.Text("1:1"),
        c : new createjs.Text("10:1"),
        d : new createjs.Text("1:1"),
        e : new createjs.Text("1:1"),
        f : new createjs.Text("50:1"),
        g : new createjs.Text("3:1"),
      }
      let tablecontent_ac = {
        a : new createjs.Text("When Dragon card has a higher value than Tiger card."),
        b : new createjs.Text("When Tiger card has a higher value then Dragon card."),
        c : new createjs.Text("After cards are dealt, Dragon and Tiger have the same hand."),
        d : new createjs.Text("If card dealt is either A,2,3,4,5,6 for Small and Big if card dealt is either 8,9,10,J,Q,K cards. Wagers lose if the “7” card is dealt."),
        e : new createjs.Text("If card dealt is either A,3,5,9,J,K for Odd and Even if card dealt is either 2,4,6,8,10,Q cards. Wagers lose if the “7” card is dealt."),
        f : new createjs.Text("Dragon and Tiger have the same hand and suit. Wagers lose if the “7” card is dealt."),
        g : new createjs.Text("The suit of the winning hand, either Dragon or Tiger, wins. Wagers lose if the “7” card is dealt."),
      }

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
        i.textAlign = "center";
        i.lineWidth = table.columnwidths[2] - 10;
        i.x = table.columnwidths[0] + table.columnwidths[1] + table.columnwidths[2] / 2;
        i.y = rh * count_text + 10;
        count_text++;
        table.addChild(i);

      } // end for
      count_text = 0;

      let image = {
        a : new createjs.Bitmap(images.card_results),
        b : new createjs.Bitmap(images.card_results)
      }
      for (let i of Object.values(image)) {
        i.x = linewidth_b * 0.50;
        con.addChild(i);
      }



      title.a.y = 20;
      body.a.y = title.a.y + title.a.height + 20;
      body.b.y = body.a.y + body.a.height + 20;
      title.b.y = body.b.y + body.b.height + 40;
      body.c.y = title.b.y + title.b.height + 20;
      body.d.y = body.c.y + body.c.height + 20;
      body.e.y = body.d.y + body.d.height + 20;
      body.f.y = body.e.y + body.e.height + 20;
      body.g.y = body.f.y + body.f.height + 20;
      body.h.y = body.g.y + body.g.height + 20;
      body.i.y = body.h.y + body.h.height + 20;
      title.c.y = body.i.y + body.i.height + 40;
      tablehead.bg.y = title.c.y + title.c.height + 20;
      tablehead.a.y = tablehead.b.y = tablehead.c.y = tablehead.bg.y + 25;
      table.y = tablehead.bg.y + 50;
      title.d.y = table.y + table.height + 40;
      body.j.y = title.d.y + title.d.height + 20;
      image.a.y = body.j.y + body.j.height + 20;
      title.e.y = image.a.y + image.a.image.height + 30;
      body.k.y = title.e.y + title.e.height + 20
      image.b.y = body.k.y + body.k.height + 20;

      con.cache(0, 0, con.getBounds().width + 20, con.getBounds().height + 150);
      con.setBounds(0, 0, 360, con.getBounds().height - 50);
      return {"con": con, "titles": title};


    } // end of writeContent

	});

	return instance;
}
