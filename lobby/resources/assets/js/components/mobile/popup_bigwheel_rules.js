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
        [new createjs.Shape(), new createjs.Text("Types of Bets/Payouts"), this.content.titles.c.y],
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
      let font_s = "21px LatoRegular";
      let lineheight_b = 33;
      let linewidth_b = 600;
      let color_t = "#ffa000";
      let color_b = "#eee";
      let color_s = "#eee";
      let font_h = "bold 21px LatoRegular";
      let color_h = "#000";

      let images = this.context.lobby_howtoplay.images;

      let con = new createjs.Container();
      con.x = 450;

      this.addChild(con);

      let title_1 = new createjs.Text("Game Objective", font_t, color_t);
      con.addChild(title_1);
      let body_1 = {
        a : new createjs.Text("SPIN n’ WIN is played on a vertical rotary large wheel with a fixed pointer on the center top-edge of the wheel. Its original game was launched at the Jackpot Casino in Red Deer, Alberta, in June 2011 as a variation of Big Six."),
        b : new createjs.Text("The objective of the game is to guess in which slot the pointer will stop following the spin. If the wheel finishes spinning and lands on the number slot you placed a bet on, you win.")
      }
      for (let i of Object.values(body_1)) {
        i.font = font_b;
        i.color = color_b;
        i.lineHeight = lineheight_b;
        i.lineWidth = linewidth_b;
        con.addChild(i)
      }
      body_1.a.y = 40;
      body_1.b.y = 210;


      let title_2 = new createjs.Text("Gameplay", font_t, color_t);
      title_2.y = 370;
      con.addChild(title_2);
      let list_2 = {
        a : new createjs.Text("•	The SPIN n’ WIN Wheel must complete at least three (3) revolutions to be considered a valid spin."),
        b : new createjs.Text("•	The winning slot is indicated by which number slot the pointer stopped. The winning results are announced after."),
        c : new createjs.Text("•	There is only one betting round and players can place their wagers on all available betting slots."),
        d : new createjs.Text("•	Draws of the game run every three (3) minutes daily.")
      };
      for (let i of Object.values(list_2)) {
        i.font = font_b;
        i.color = color_b;
        i.lineWidth = linewidth_b;
        con.addChild(i)
      }
      list_2.a.y = 340 + 80;
      list_2.b.y = 410 + 105;
      list_2.c.y = 490 + 118;
      list_2.d.y = 560 + 110;

      let title_3 = new createjs.Text("Types of Bets/Payouts", font_t, color_t);
      title_3.y = 770;
      con.addChild(title_3);
      let tablehead_3 = {
        bg : new createjs.Shape(),
        a : new createjs.Text("Type of Bets"),
        b : new createjs.Text("PAYOUT")
      }
      tablehead_3.bg.graphics.beginFill("#b4b4b4").drawRect(-1, 0, 572, 45);
      tablehead_3.bg.x = 0;
      tablehead_3.bg.y = 670 + 91;

      tablehead_3.a.font = tablehead_3.b.font = font_h;
      tablehead_3.a.color = tablehead_3.b.color = color_h;

      tablehead_3.a.x = tablehead_3.bg.x + 75 + 70;
      tablehead_3.b.x = tablehead_3.bg.x + 425;
      tablehead_3.a.y = tablehead_3.b.y = tablehead_3.bg.y + 21;
      tablehead_3.a.textAlign = tablehead_3.b.textAlign = "center";
      tablehead_3.a.textBaseline = tablehead_3.b.textBaseline = "middle";
      con.addChild(tablehead_3.bg, tablehead_3.a, tablehead_3.b);

      let table_3 = this.context.lobby_howtoplay.drawTable([285, 285], 6, 550);
      table_3.x = tablehead_3.bg.x;
      table_3.y = tablehead_3.bg.y + 45;
      con.addChild(table_3);
      let tablecontent_3 = {
        aa : new createjs.Bitmap(images.howto_bet_x1),
        ab : new createjs.Bitmap(images.howto_bet_x2),
        ac : new createjs.Bitmap(images.howto_bet_x5),
        ad : new createjs.Bitmap(images.howto_bet_x10),
        ae : new createjs.Bitmap(images.howto_bet_x20),
        af : new createjs.Bitmap(images.howto_bet_x45),
        ba : new createjs.Text("1:1", font_b, color_b),
        bb : new createjs.Text("2:1", font_b, color_b),
        bc : new createjs.Text("5:1", font_b, color_b),
        bd : new createjs.Text("10:1", font_b, color_b),
        be : new createjs.Text("20:1", font_b, color_b),
        bf : new createjs.Text("45:1", font_b, color_b)
      }
      for (let i of Object.values(tablecontent_3)) {
        let count_text = count_text || 0;
        let count_image = count_image || 0;
        let rh = (360 / 6) + 31.5;
        if(i.text) {
          count_text++;
          i.textAlign = "center";
          i.textBaseline = "middle";
          i.x = 430;
          i.y = rh * count_text - (rh / 2);
        }
        if(i.image) {
          count_image++;
          i.regX = i.image.width / 2;
          i.regY = i.image.height / 2;
          i.x = 145;
					i.scaleX = i.scaleY = 1.3;
          i.y = rh * count_image - (rh / 2);
        }
        table_3.addChild(i);
      } // end for

      con.cache(0, 0, con.getBounds().width + 20, con.getBounds().height + 50);
      con.setBounds(0, 0, 360, con.getBounds().height + 50);
      return {"con": con, "titles": {"a":title_1, "b":title_2, "c":title_3}};


    } // end of writeContent

	});

	return instance;
}
