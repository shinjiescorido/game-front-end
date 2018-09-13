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
      this.scrollprop = this.context.lobby_scrollbar.scrollable(this, this.content.con, 750,560, true);
      this.addChild(this.scrollprop.toTop_btn);
      this.scrollprop.toTop_btn.scaleX = this.scrollprop.toTop_btn.scaleY = 2.5;
      this.scrollprop.toTop_btn.x -= 40;
      this.scrollprop.toTop_btn.y -= 20;


      // toc... table of contents
      let toc_con = new createjs.Container();
      toc_con.y = 60;
      this.addChild(toc_con);
      let toc_bg = new createjs.Shape();
      toc_bg.graphics.setStrokeStyle(2).beginStroke("#fff").beginFill("#000").drawRoundRect(0, 0, 370, 285, 8);
      toc_bg.alpha = 0.4;
      toc_bg.setBounds(0, 0, 320, 280);
      toc_bg.y = -60;
      let toc_b = toc_bg.getBounds();
      toc_con.addChild(toc_bg);
      let toc_borders = new createjs.Shape();
      toc_borders.graphics.setStrokeStyle(0.4).beginStroke("#fff").moveTo(toc_bg.x + 20, toc_bg.y + 20.5).lineTo(toc_b.width + 30, toc_bg.y + 20.5);
      toc_borders.graphics.moveTo(toc_bg.x + 20, toc_b.height - 80).lineTo(toc_b.width + 30, toc_b.height - 80);
      toc_con.addChild(toc_borders);

      let scrollto = [
        [new createjs.Shape(), new createjs.Text("Game Objective"), this.content.titles.a.y],
        [new createjs.Shape(), new createjs.Text("Poker Hand Rankings"), this.content.titles.c.y],
        [new createjs.Shape(), new createjs.Text("Betting System"), this.content.titles.d.y],
        [new createjs.Shape(), new createjs.Text("Same Hand Ranking (Tie)"), this.content.titles.g.y],
      ]
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
        o[1].x = (toc_b.width / 2) + 25;
        o[1].y = (h * i) + (h / 2) - 20;
        o[1].mouseEnabled = false;

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
      let color_s = "#fff";
      let color_h = "#000";
      let bg_h = "#b4b4b4";

      let images = this.context.lobby_howtoplay.images;

      let con = new createjs.Container();
      con.x = 450;

      this.addChild(con);

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
        i.lineWidth = linewidth_b;
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
        i.height = i.getMetrics().height - 5;
        i.x = linewidth_b * 0.45;
        i.lineWidth = linewidth_b * 0.45;
        con.addChild(i);
      }
      for (let i of Object.values(small)) {
        i.font = font_s;
        i.color = color_b;
        i.textAlign = "right";
        i.height = i.getMetrics().height + 20;
        i.x = linewidth_b * 0.45;
        i.lineWidth = linewidth_b * 0.45;
        con.addChild(i);
      }
      for (let i of Object.values(smallstrong)) {
        i.font = font_h;
        i.color = color_b;
        i.textAlign = "right";
        i.height = i.getMetrics().height + 10;
        i.x = linewidth_b * 0.45;
        i.lineWidth = linewidth_b * 0.45;
        con.addChild(i);
      }

      let image = {
        a : new createjs.Bitmap(images.royalflush),
        ba : new createjs.Bitmap(images.straightflush_1),
        bb : new createjs.Bitmap(images.straightflush_2),
        c : new createjs.Bitmap(images.fourofakind),
        d : new createjs.Bitmap(images.fullhouse),
        e : new createjs.Bitmap(images.flush),
        fa : new createjs.Bitmap(images.straight_1),
        fb : new createjs.Bitmap(images.straight_2),
        g : new createjs.Bitmap(images.threeofakind),
        h : new createjs.Bitmap(images.twopairs),
        i : new createjs.Bitmap(images.pair),
        j : new createjs.Bitmap(images.highcard),
        sa : new createjs.Bitmap(images.same_handranking_3a),
        sb : new createjs.Bitmap(images.same_handranking_3b),
      }
      for (let i of Object.values(image)) {
        i.x = linewidth_b * 0.50 + 10;
        con.addChild(i);
      }
      image.sa.x = image.sb.x = linewidth_b * 0.75 + 50;
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
      tablehead_a.bg.graphics.beginFill(bg_h).drawRect(-1, 0, 594, 40);
      tablehead_a.bg.x = 5;
      tablehead_a.a.x = tablehead_a.bg.x + 70;
      tablehead_a.b.x = tablehead_a.bg.x + 200;
      tablehead_a.c.x = tablehead_a.bg.x + 420;

      let table_a = this.context.lobby_howtoplay.drawTable([134, 134, 324], 5, 475);
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
      tablehead_b.bg.graphics.beginFill("#b4b4b4").drawRect(-1, 0, 594, 40);
      tablehead_b.bg.x = 5;
			tablehead_b.a.font = "bold 16px LatoRegular";
      tablehead_b.a.x = tablehead_b.bg.x + 150;
      tablehead_b.b.x = tablehead_b.bg.x + 440;
      let table_b = this.context.lobby_howtoplay.drawTable([296, 296], 7, 350);
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


      title.a.y = 20;
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
      title.d.y = small.j.y + small.j.height + 60;
      tablehead_a.bg.y = title.d.y + title.d.height + 20;
      tablehead_a.a.y = tablehead_a.b.y = tablehead_a.c.y = tablehead_a.bg.y + 20;
      table_a.y = tablehead_a.bg.y + 40;
      title.e.y = table_a.y + table_a.height + 40;
      tablehead_b.bg.y = title.e.y + title.e.height + 20;
      tablehead_b.a.y = tablehead_b.b.y = tablehead_b.bg.y + 20;
      table_b.y = tablehead_b.bg.y + 40;
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





      // image.

      con.cache(0, 0, con.getBounds().width + 20, con.getBounds().height + 50);
      con.setBounds(0, 0, 360, con.getBounds().height + 50);
      return {"con": con, "titles": title};


    } // end of writeContent

	});

	return instance;
}
