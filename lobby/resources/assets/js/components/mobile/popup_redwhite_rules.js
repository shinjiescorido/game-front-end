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
      toc_borders.graphics.moveTo(toc_bg.x + 20, toc_b.height - 80).lineTo(toc_b.width - 20, toc_b.height - 80);
      toc_con.addChild(toc_borders);

      let scrollto = [
        [new createjs.Shape(), new createjs.Text("Game Objective"), this.content.titles.a.y],
        [new createjs.Shape(), new createjs.Text("Gameplay"), this.content.titles.b.y],
        [new createjs.Shape(), new createjs.Text("Types of Bets"), this.content.titles.c.y]
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
      let font_bold = "bold 20px LatoRegular";
      let font_h = "bold 23px LatoRegular";
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
        a : new createjs.Text("Game Objective"),
        b : new createjs.Text("Gameplay"),
        c : new createjs.Text("Types of Bets")
      };
      for (let i of Object.values(title)) {
        i.font = font_t;
        i.color = color_t;
        i.height = i.getMetrics().height;
        con.addChild(i)
      }

      let body = {
        a : new createjs.Text("Red and White is derived from a game called “Pula Puti” (Red and White) which originated from the streets of the Philippines. The game consists of a 100-square checkerboard having 49 WHITE squares          , 49 RED squares          and two squares bearing the NIHTAN symbol          ."),
        b : new createjs.Text("The objective of the game is to win by placing a bet on a combination that the players think the three balls will land on."),
        c : new createjs.Text("•  Players put their wagers on the dedicated areas on the table."),
        d : new createjs.Text("•  Three (3) ping-pong balls are dropped inside a transparent funnel by the dealer."),
        e : new createjs.Text("•  The winning color combination will be based on at least two (2) ping-pong balls landing on the same color on the checkerboard."),
        f : new createjs.Text("•  If any of the (3) three ping-pong balls rest on a BONUS tile with the Nihtan symbol, all bets are forfeited except on the Bonus wagers.")
      }
      for (let i of Object.values(body)) {
        i.font = font_b;
        i.color = color_b;
        i.lineHeight = lineheight_b;
        i.lineWidth = linewidth_b;
        i.height = i.getMetrics().height;
        con.addChild(i);
      }

      let image = {
        a : new createjs.Bitmap(images.nihtan_symbol),
        b : new createjs.Bitmap(images.red_square),
        c : new createjs.Bitmap(images.white_square)
      }
      for (let i of Object.values(image)) {
        i.scaleX = i.scaleY = 0.55;
        i.regX = (i.image.width / 2) * 0.55
        i.regY = (i.image.height / 2) * 0.55
        con.addChild(i);
      }

      let tablehead = {
        bg : new createjs.Shape(),
        a : new createjs.Text("Bet"),
        b : new createjs.Text("Payout")
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
      tablehead.bg.graphics.beginFill("#b4b4b4").drawRect(-1, 0, 594, 40);
      tablehead.bg.x = 5;
      tablehead.bg.y = 630;
      tablehead.a.x = tablehead.bg.x + 150;
      tablehead.b.x = tablehead.bg.x + 440;
      tablehead.a.textAlign = tablehead.b.textAlign = "center";
      tablehead.a.textBaseline = tablehead.b.textBaseline = "middle";

      let table = this.context.lobby_howtoplay.drawTable([296, 296], 6, 330);
      table.x = tablehead.bg.x;
      con.addChild(table);
      let tablecontent_a = {
        a : new createjs.Text("Two Red"),
        b : new createjs.Text("Two Whites"),
        c : new createjs.Text("Three red"),
        d : new createjs.Text("Three Whites"),
        e : new createjs.Text("One Bonus"),
        f : new createjs.Text("Twos Bonuses"),
        g : image.a.clone(),
        h : image.a.clone(),
        i : image.a.clone()
      }
      let tablecontent_b = {
        a : new createjs.Text("1:1"),
        b : new createjs.Text("1:1"),
        c : new createjs.Text("7:1"),
        d : new createjs.Text("7:1"),
        e : new createjs.Text("15:1"),
        f : new createjs.Text("250:1")
      }

      let rh = (table.height / table.rows);
      let count_text = count_text || 0;

      for (let i of Object.values(tablecontent_a)) {
        if(i.text) {
          count_text++;
          i.textAlign = "center";
          i.textBaseline = "middle";
          i.font = font_s;
          i.color = color_s;
          i.x = 150;
          i.y = rh * count_text - (rh / 2);
        }
        table.addChild(i);
      } // end for
      count_text = 0;
      for (let i of Object.values(tablecontent_b)) {
        if(i.text) {
          count_text++;
          i.textAlign = "center";
          i.textBaseline = "middle";
          i.font = font_s;
          i.color = color_s;
          i.x = 450;
          i.y = rh * count_text - (rh / 2);
        }
        table.addChild(i);

      } // end for
      tablecontent_a.e.x -= 15;
      tablecontent_a.f.x -= 20;
      tablecontent_a.g.y = rh * 4 + 25;
      tablecontent_a.h.y = tablecontent_a.i.y = rh * 5 + 25;
      tablecontent_a.g.x = tablecontent_a.e.x + 70;
      tablecontent_a.h.x = tablecontent_a.f.x + 74;
      tablecontent_a.i.x = tablecontent_a.h.x + 24;


      // title.a
      body.a.y = title.a.y + title.a.height + 20;
      body.b.y = body.a.y + body.a.height + 20;

      image.c.x = 215;
      image.c.y = body.a.y + 144;
      image.b.x = 475;
      image.b.y = body.a.y + 144;
      image.a.x = 520;
      image.a.y = body.a.y + 180;

      title.b.y = body.b.y + body.b.height + 40;
      body.c.y = title.b.y + title.b.height + 20;
      body.d.y = body.c.y + body.c.height + 10;
      body.e.y = body.d.y + body.d.height + 20;
      body.f.y = body.e.y + body.e.height + 30;
      title.c.y = body.f.y + body.f.height + 40;
      tablehead.bg.y = title.c.y + title.c.height + 20;
      tablehead.a.y = tablehead.b.y = tablehead.bg.y + 20;
      table.y = tablehead.bg.y + 40;

      con.cache(0, 0, con.getBounds().width + 20, con.getBounds().height + 50);
      con.setBounds(0, 0, 360, con.getBounds().height + 50);
      return {"con":con, "titles":title};


    } // end of writeContent

	});

	return instance;
}
