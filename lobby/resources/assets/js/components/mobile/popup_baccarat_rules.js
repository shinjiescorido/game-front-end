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
      // content.con.y = -160;
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
      toc_bg.graphics.setStrokeStyle(2).beginStroke("#fff").beginFill("#000").drawRoundRect(0, 0, 320, 440, 8);
      toc_bg.alpha = 0.4;
      toc_bg.setBounds(0, 0, 320, 400);
      toc_bg.y = -60;
      let toc_b = toc_bg.getBounds();
      toc_con.addChild(toc_bg);
      let toc_borders = new createjs.Shape();
      toc_borders.graphics.setStrokeStyle(0.4).beginStroke("#fff").moveTo(toc_bg.x + 20, toc_bg.y + 20.5).lineTo(toc_b.width - 20, toc_bg.y + 20.5);
      toc_borders.graphics.moveTo(toc_bg.x + 20, toc_b.height - 45.5).lineTo(toc_b.width - 20, toc_b.height - 45.5);
      toc_con.addChild(toc_borders);

      let scrollto = [
        [new createjs.Shape(), new createjs.Text("Game Objective"), this.content.titles.objective.y],
        [new createjs.Shape(), new createjs.Text("Card Values"), this.content.titles.cardvalues.y],
        [new createjs.Shape(), new createjs.Text("Gameplay"), this.content.titles.gameplay.y],
        [new createjs.Shape(), new createjs.Text("3rd Card Draw"), this.content.titles.thirdcard.y],
        [new createjs.Shape(), new createjs.Text("Nihtan Payouts"), this.content.titles.payouts.y],
        [new createjs.Shape(), new createjs.Text("Card Positioning"), this.content.titles.positioning.y],
        [new createjs.Shape(), new createjs.Text("Flippy Table Baccarat"), this.content.titles.flippy.y]
      ];



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
      let font_bold = "bold 18px LatoRegular";
      let font_h = "bold 21px LatoRegular";
      let font_s = "21px LatoRegular";
      let lineheight_b = 33;
      let linewidth_b = 600;
      let bg_th = "#b4b4b4";
      let color_t = "#ffa000";
      let color_b = "#eee";
      let color_h = "#000";

      let images = this.context.lobby_howtoplay.images;

      let con = new createjs.Container();
      con.x = 450;

      this.addChild(con);

      let title = {
        "objective" : new createjs.Text("Game Objective"),
        "cardvalues" : new createjs.Text("Card Values"),
        "gameplay" : new createjs.Text("Gameplay"),
        "thirdcard" : new createjs.Text("3rd Card Draw"),
        "playerhand" : new createjs.Text("Player's Hand"),
        "bankerhand" : new createjs.Text("Banker's Hand"),
        "payouts" : new createjs.Text("Nihtan Payouts"),
        "positioning" : new createjs.Text("Card Positioning"),
        "flippy" : new createjs.Text("Flippy Table Baccarat")
      };
      Object.values(title).forEach((o, i)=>{
        o.font = font_t;
        o.color = color_t;

        if([4, 5].includes(i)) {
          o.color = color_b;
        }

        o.height = o.getMetrics().height + 20;
        con.addChild(o);
      });

      let body = {
        a : new createjs.Text("Baccarat is played on a large gaming table with 8 decks of 52 cards. The objective of the game is to guess who between the dealer and the player will get the closest score to 9."),
        b : new createjs.Text("CLASSIC - A one player game with the game console."),
        c : new createjs.Text("FLIPPY TABLE - A variation of the classic one-player Baccarat game wherein the user can take a peek at the cards for a limited time."),
        d : new createjs.Text("MULITPLAYER - Seven (7) seats available for players."),
        e : new createjs.Text("•   To begin, a player is given 20 seconds to bet either on the \"player\", \"banker\", \"tie\", \"player pair\" or \"banker pair\"."),
        f : new createjs.Text("•   After all bets are down, the dealer gives two cards each to the player and the banker (his/herself)."),
        g : new createjs.Text("•   A total of 8 or 9 is called a \"natural\". The hands are revealed and the one with the highest score wins the round."),
        h : new createjs.Text("•   You can't have more than 9 points when playing Baccarat. If total card value is over 10, the second digit is the total score (for example 15 becomes 5)."),
        i : new createjs.Text("If either the player or the banker has a total of an 8 or a 9 they both stand. This rule overrides all other rules."),
        j : new createjs.Text("Use the chart below to determine if the banker hits or stands: "),
      }
      for (let o of Object.values(body)) {
        o.font = font_b;
        o.color = color_b;
        o.lineHeight = lineheight_b;
        o.lineWidth = linewidth_b;
        o.height = o.getMetrics().height + 20;
        con.addChild(o)
      }
      let image = {
        a : new createjs.Bitmap(images.card_value_1),
        b : new createjs.Bitmap(images.card_value_2),
        c : new createjs.Bitmap(images.card_value_3),
        d : new createjs.Bitmap(images.card_position_1),
        e : new createjs.Bitmap(images.card_position_2),
        f : new createjs.Bitmap(images.card_position_3),
        g : new createjs.Bitmap(images.card_position_4),
        h : new createjs.Bitmap(images.card_position_5),
        i : new createjs.Bitmap(images.card_position_6),
      }
      Object.values(image).forEach((o, i)=> {
        if(i >= 3) {
          o.regX = o.image.width / 2;
          o.regY = o.image.height / 2;
        }
        con.addChild(o);
      });

      let table = {
        "player" : this.context.lobby_howtoplay.drawTable([295, 295], 3, 130),
        "banker_a" : this.context.lobby_howtoplay.drawTable([137, 227, 227], 4, 190),
        "banker_b" : this.context.lobby_howtoplay.drawTable([137, 454], 3, 142),
        "payout" : this.context.lobby_howtoplay.drawTable([295, 295], 5, 215),
        "flippy" : this.context.lobby_howtoplay.drawTable([295, 295], 2, 110)
      }
      Object.values(table).forEach((o, i)=>{
        if(i != 2) {
          o.th = new createjs.Shape();
          o.th.graphics.beginFill(bg_th).drawRect(-1, -(o.height / o.rows), o.width + 2, o.height / o.rows);
          o.addChild(o.th);
          o.regY -= o.height / o.rows;
          o.height += o.height / o.rows;
          o.rows++;

        }
        con.addChild(o);

      });

      // player's hand table
      let playertablecontent = {
        a : new createjs.Text("TOTAL CARD VALUE"),
        b : new createjs.Text("ACTION"),
        c : new createjs.Text("0-5"),
        d : new createjs.Text("Hit 3rd card"),
        e : new createjs.Text("6-7"),
        f : new createjs.Text("Stand"),
        g : new createjs.Text("8-9"),
        h : new createjs.Text("Natural, cannot hit"),
      }
      let rowcount = 0;
      Object.values(playertablecontent).forEach((o, i) => {
        o.font = font_s;
        o.color = color_b;
        o.textAlign = "center";
        o.textBaseline = "middle";
        o.y = (rowcount - 1) * (table.player.height / table.player.rows) + (table.player.height / table.player.rows) / 2;
        if(i <= 1) {
          o.font = font_h;
          o.color = color_h;
        }
        if(i % 2 == 0) {  o.x = table.player.columnwidths[0] / 2;   }
        else {
          o.x = table.player.columnwidths[0] + table.player.columnwidths[1] / 2;
          rowcount++;
        }
        table.player.addChild(o);
      });

      // banker's hand table
      let bankertablecontent_a = {
        a : new createjs.Text("TOTAL CARD\nVALUE"),
        b : new createjs.Text("PLAYER'S 3RD CARD"),
        c : new createjs.Text("3"),
        d : new createjs.Text("0-7 and 9; Hit"),
        e : new createjs.Text("8; Stand"),
        f : new createjs.Text("4"),
        g : new createjs.Text("2-7; Hit"),
        h : new createjs.Text("0-1 and 8-9; Stand"),
        i : new createjs.Text("5"),
        j : new createjs.Text("4-7; Hit"),
        k : new createjs.Text("0-3 and 8-9; Stand"),
        l : new createjs.Text("6"),
        m : new createjs.Text("6-7; Hit"),
        n : new createjs.Text("0-5 and 8-9; Stand"),
      }
      rowcount = 0;
      Object.values(bankertablecontent_a).forEach((o, i) => {
        o.font = font_s;
        o.color = color_b;
        o.textAlign = "center";
        o.textBaseline = "middle";
        o.y = (rowcount - 1) * (table.banker_a.height / table.banker_a.rows) + (table.banker_a.height / table.banker_a.rows) / 2;
        if(i == 0) {
          o.font = "bold 15px LatoRegular";
          o.color = color_h;
          o.x = table.banker_a.columnwidths[0] / 2;
          o.y -= 10;
        }
        if(i == 1) {
          o.font = font_h;
          o.color = color_h;
          o.x = o.x = table.banker_a.columnwidths[0] + table.banker_a.columnwidths[1]
          rowcount++;
        }
        if(i > 1) {
          if((i % 3) == 2)  { o.x = table.banker_a.columnwidths[0] / 2;   }
          else if((i % 3) == 0)       { o.x = table.banker_a.columnwidths[0] + table.banker_a.columnwidths[1] / 2;  }
          else {
            o.x = table.banker_a.columnwidths[0] + table.banker_a.columnwidths[1] + table.banker_a.columnwidths[2] / 2;
            rowcount++;
          }
        }
        table.banker_a.addChild(o);
      });

      // banker's hand table
      let bankertablecontent_b = {
        a : new createjs.Text("7"),
        b : new createjs.Text("Stand"),
        c : new createjs.Text("8-9"),
        d : new createjs.Text("Natural, cannot hit"),
        e : new createjs.Text("0-2"),
        f : new createjs.Text("Hit")
      }
      rowcount = 0;
      Object.values(bankertablecontent_b).forEach((o, i) => {
        o.font = font_s;
        o.color = color_b;
        o.textAlign = "center";
        o.textBaseline = "middle";
        o.y = rowcount * (table.banker_b.height / table.banker_b.rows) + (table.banker_b.height / table.banker_b.rows) / 2;
        if(i % 2 == 0) {  o.x = table.banker_b.columnwidths[0] / 2;   }
        else {
          o.x = table.banker_b.columnwidths[0] + table.banker_b.columnwidths[1] / 2;
          rowcount++;
        }
        table.banker_b.addChild(o);
      });

      // payout table
      let payouttablecontent = {
        a : new createjs.Text("BET ON"),
        b : new createjs.Text("RESULT"),
        c : new createjs.Text("Player"),
        d : new createjs.Text("1:1"),
        e : new createjs.Text("Banker"),
        f : new createjs.Text("095:1"),
        g : new createjs.Text("Tie"),
        h : new createjs.Text("8:1"),
        i : new createjs.Text("PLAYER pair"),
        j : new createjs.Text("11:1"),
        k : new createjs.Text("BANKER pair"),
        l : new createjs.Text("11:1"),
      }
      rowcount = 0;
      Object.values(payouttablecontent).forEach((o, i) => {
        o.font = font_s;
        o.color = color_b;
        o.textAlign = "center";
        o.textBaseline = "middle";
        o.y = (rowcount - 1) * (table.payout.height / table.payout.rows) + (table.payout.height / table.payout.rows) / 2;
        if(i <= 1) {
          o.font = font_h;
          o.color = color_h;
        }
        if(i % 2 == 0) {  o.x = table.payout.columnwidths[0] / 2;   }
        else {
          o.x = table.payout.columnwidths[0] + table.payout.columnwidths[1] / 2;
          rowcount++;
        }
        table.payout.addChild(o);
      });

      // flippy table
      let flippytablecontent = {
        a : new createjs.Text("ACTION"),
        b : new createjs.Text("TIME GIVEN TO PEEK"),
        c : new createjs.Text("When player and dealer hands are dealt"),
        d : new createjs.Text("10 seconds"),
        e : new createjs.Text("When Hit cards are dealt"),
        f : new createjs.Text("13 seconds")
      }
      rowcount = 0;
      Object.values(flippytablecontent).forEach((o, i) => {
        o.font = font_s;
        o.color = color_b;
        o.textAlign = "center";
        o.textBaseline = "middle";

        o.y = (rowcount - 1) * (table.flippy.height / table.flippy.rows) + (table.flippy.height / table.flippy.rows) / 2;
        if(i <= 1) {
          o.font = font_h;
          o.color = color_h;
        }
        if(i % 2 == 0) {
          o.lineWidth = table.flippy.columnwidths[0] - 10;
          o.x = table.flippy.columnwidths[0] / 2;
          if(i > 1) o.y -= 10;
        }
        else {
          o.lineWidth = table.flippy.columnwidths[1] - 10;
          o.x = table.flippy.columnwidths[0] + table.flippy.columnwidths[1] / 2;
          rowcount++;
        }
        table.flippy.addChild(o);
      });

      let captiontext = {
        a : new createjs.Text("1 for Aces"),
        b : new createjs.Text("0 for Kings, Queens,\nJacks and 10s"),
        c : new createjs.Text("Pip value for 9s, 8s, 7s,\n 6s, 5s, 4s, 3s, and 2s"),
        d : new createjs.Text("6th"),
        e : new createjs.Text("4th"),
        f : new createjs.Text("2nd"),
        g : new createjs.Text("1st"),
        h : new createjs.Text("3rd"),
        i : new createjs.Text("5th"),
        j : new createjs.Text("BANKER"),
        k : new createjs.Text("PLAYER"),
      }
      Object.values(captiontext).forEach((o, i) => {
        o.font = font_s;
        o.color = color_b;
        if(i <= 2)  o.x = (linewidth_b / 2) + 60;
        if(i >= 3)  o.textAlign = "center";
        o.regY = (o.getMetrics().height / 2) - 10;
        con.addChild(o);
      });









      //positioning everything
      title.objective.y = 0;
      body.a.y = title.objective.y + title.objective.height;
      title.cardvalues.y = body.a.y + body.a.height + 40;
      image.a.y = title.cardvalues.y + title.cardvalues.height;
        captiontext.a.y = image.a.y + (image.a.image.height / 2) - 15;
      image.b.y = image.a.y + image.a.image.height + 20;
        captiontext.b.y = image.b.y + (image.b.image.height / 2) - 15;
      image.c.y = image.b.y + image.b.image.height + 20;
        captiontext.c.y = image.c.y + (image.c.image.height / 2) - 15;
      title.gameplay.y = image.c.y + image.c.image.height + 40;
      body.b.y = title.gameplay.y + title.gameplay.height;
      body.c.y = body.b.y + body.b.height + 10;
      body.d.y = body.c.y + body.c.height + 10;

      body.e.y = body.d.y + body.d.height + 20;
      body.f.y = body.e.y + body.e.height + 10;
      body.g.y = body.f.y + body.f.height + 10;
      body.h.y = body.g.y + body.g.height + 10;

      title.thirdcard.y = body.h.y + body.h.height + 40;
      body.i.y = title.thirdcard.y + title.thirdcard.height;
      body.j.y = body.i.y + body.i.height + 20;
      title.playerhand.y = body.j.y + body.j.height + 20;
      table.player.y = title.playerhand.y + title.playerhand.height;
      title.bankerhand.y = table.player.y + table.player.height + 40;
      table.banker_a.y = title.bankerhand.y + title.bankerhand.height;
      table.banker_b.y = table.banker_a.y + table.banker_a.height - 0.5;
      title.payouts.y = table.banker_b.y + table.banker_b.height + 40;
      table.payout.y = title.payouts.y + title.payouts.height;
      title.positioning.y = table.payout.y + table.payout.height + 30;
      image.d.y = image.e.y = image.f.y = image.g.y = image.h.y = image.i.y = title.positioning.y + 120;
        image.d.x = 40;
        image.e.x = image.d.x + image.d.image.width / 2 + image.e.image.width / 2 + 10;
        image.f.x = image.e.x + image.e.image.width / 2 + image.f.image.width / 2 + 10;
        image.g.x = image.f.x + image.f.image.width / 2 + image.g.image.width / 2 + 30;
        image.h.x = image.g.x + image.g.image.width / 2 + image.h.image.width / 2 + 10;
        image.i.x = image.h.x + image.h.image.width / 2 + image.i.image.width / 2 + 10;
        captiontext.d.x = image.d.x;
        captiontext.d.y = image.d.y - 70;
        captiontext.e.x = image.e.x;
        captiontext.e.y = image.e.y - 70;
        captiontext.f.x = image.f.x;
        captiontext.f.y = image.f.y - 70;
        captiontext.g.x = image.g.x;
        captiontext.g.y = image.g.y - 70;
        captiontext.h.x = image.h.x;
        captiontext.h.y = image.h.y - 70;
        captiontext.i.x = image.i.x;
        captiontext.i.y = image.i.y - 70;
        captiontext.j.x = image.e.x;
        captiontext.j.y = image.e.y + 50;
        captiontext.k.x = image.h.x;
        captiontext.k.y = image.h.y + 50;
      title.flippy.y = image.d.y + 100;
      table.flippy.y = title.flippy.y + title.flippy.height;



      con.cache(-10, -10, con.getBounds().width + 100, con.getBounds().height + 50);
      con.setBounds(0, 0, 360, con.getBounds().height + 50);
      return {"con":con, "titles":title};


    }, // end of writeContent

    container(valx, valy) {
      let container = new createjs.Container();
      container.x = valx;
      container.y = valy;
      return container;
    },

	});

	return instance;
}
