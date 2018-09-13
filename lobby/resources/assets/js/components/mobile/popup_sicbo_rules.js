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
      let font_bold = "bold 18px LatoRegular";
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
        c : new createjs.Text("TYPES OF BETS/PAYOUTS")
      };
      for (let i of Object.values(title)) {
        i.font = font_t;
        i.color = color_t;
        i.height = i.getMetrics().height;
        con.addChild(i)
      }

      let body = {
        a : new createjs.Text("Sic Bo is a table game played with 3 dices. The objective of the game is to guess and bet on the winning combination. There are about 50 different ways to bet in the game with different payouts."),
        b : new createjs.Text("•  Players put their wagers on the dedicated areas on the table. "),
        c : new createjs.Text("•  Bet on as many wager combinations as you want."),
        d : new createjs.Text("•  The dealer shakes a closed chest containing 3 dices, then opens it to reveal the winning combinations."),
        e : new createjs.Text("NOTE:\nDuring “Fault”, if any of the dice do not land flat on the bottom of the Sic Bo shaker after being tossed, the dice will be rolled again.")
      }
      for (let i of Object.values(body)) {
        i.font = font_b;
        i.color = color_b;
        i.lineHeight = lineheight_b;
        i.lineWidth = linewidth_b;
        i.height = i.getMetrics().height;
        con.addChild(i);
      }

      let image = new createjs.Bitmap(images.howto_bettypes);
			// image.scaleX = image.scaleY = 1.2;
      con.addChild(image);
      let tablehead = {
        bg : new createjs.Shape(),
        a : new createjs.Text("TYPE OF BETS"),
        b : new createjs.Text("DESCRIPTION"),
        c : new createjs.Text("*NIHTAN\nPAYOUTS")
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
      tablehead.bg.graphics.beginFill("#b4b4b4").drawRect(-1, 0, 592, 50);
      tablehead.bg.x = 0;
      tablehead.a.x = tablehead.bg.x + 100;
      tablehead.b.x = tablehead.bg.x + 350;
      tablehead.c.x = tablehead.bg.x + 542;
      tablehead.a.textAlign = tablehead.b.textAlign = tablehead.c.textAlign = "center";
      tablehead.a.textBaseline = tablehead.b.textBaseline = tablehead.c.textBaseline = "middle";

      let table = this.context.lobby_howtoplay.drawTable([270, 95], 19, 1380);
			table.x = 225;
			let tableLeft = this.context.lobby_howtoplay.drawTable([225], 4, 290);
			let tableLeft2 = this.context.lobby_howtoplay.drawTable([225], 1, 508);
			let tableLeft3 = this.context.lobby_howtoplay.drawTable([225], 5, 363);
			let tableLeft4 = this.context.lobby_howtoplay.drawTable([225], 1, 217.5);
      con.addChild(table, tableLeft, tableLeft2,tableLeft3, tableLeft4);
      let tablecontent_a = {
        aa : new createjs.Bitmap(images.howto_a),
        ab : new createjs.Bitmap(images.howto_a),
        ac : new createjs.Bitmap(images.howto_b),
        ad : new createjs.Bitmap(images.howto_b),
        ba : new createjs.Text("BIG"),
        bb : new createjs.Text("SMALL"),
        bc : new createjs.Text("ODD"),
        bd : new createjs.Text("EVEN"),
      }
			let tablecontent_a2 = {
				ae : new createjs.Bitmap(images.howto_f),
				be : new createjs.Text("TOTAL\nNUMBER"),
			}
			let tablecontent_a3 = {
				af : new createjs.Bitmap(images.howto_e),
        ag : new createjs.Bitmap(images.howto_d),
        ah : new createjs.Bitmap(images.howto_c),
        ai : new createjs.Bitmap(images.howto_g),
        aj : new createjs.Bitmap(images.howto_h),
				bf : new createjs.Text("SPECIFIC\nTRIPLE"),
        bg : new createjs.Text("ANY\nTRIPLES"),
        bh : new createjs.Text("SPECIFIC\nDOUBLE"),
        bi : new createjs.Text("DICE\nCOMBINATION"),
        bj : new createjs.Text("3-SINGLE NUMBER\nCOMBINATION")
			}
			let tablecontent_a4 = {
				ak : new createjs.Bitmap(images.howto_i),
				bk : new createjs.Text("SINGLE\nDICE BET"),
			}
      let tablecontent_b = {
        ca : new createjs.Text("Total sum is 11~17"),
        cb : new createjs.Text("Total sum is 4~10"),
        cc : new createjs.Text("Total sum is an odd number"),
        cd : new createjs.Text("Total sum is an even number"),
        ce : new createjs.Text("Total sum is 4 or 17"),
        cf : new createjs.Text("Total sum is 5 or 16"),
        cg : new createjs.Text("Total sum is 6 or 15"),
        ch : new createjs.Text("Total sum is 7 or 14"),
        ci : new createjs.Text("Total sum is 8 or 13"),
        cj : new createjs.Text("Total sum is 9 or 12"),
        ck : new createjs.Text("Total sum is 10 or 11"),
        cl : new createjs.Text("A specific number will appear on all three dices"),
        cm : new createjs.Text("Any triple number rather than a specific triple"),
        cn : new createjs.Text("A specific number will appear on at least two of the three dices"),
        co : new createjs.Text("Two specific number combination"),
        cp : new createjs.Text("A specific combination of three different numbers"),
        cq : new createjs.Text("The specific number 1, 2, 3, 4, 5, or 6 appears on one die"),
        cr : new createjs.Text("The specific number 1, 2, 3, 4, 5, or 6 appears on two dices"),
        cs : new createjs.Text("The specific number 1, 2, 3, 4, 5, or 6 appears on three dices"),
      }
      let tablecontent_c = {
        da : new createjs.Text("1:1"),
        db : new createjs.Text("1:1"),
        dc : new createjs.Text("1:1"),
        dd : new createjs.Text("1:1"),
        de : new createjs.Text("50:1"),
        df : new createjs.Text("30:1"),
        dg : new createjs.Text("18:1"),
        dh : new createjs.Text("12:1"),
        di : new createjs.Text("8:1"),
        dj : new createjs.Text("6:1"),
        dk : new createjs.Text("6:1"),
        dl : new createjs.Text("150:1"),
        dm : new createjs.Text("24:1"),
        dn : new createjs.Text("8:1"),
        do : new createjs.Text("30:1"),
        dp : new createjs.Text("1:1"),
        dq : new createjs.Text("1:1"),
        dr : new createjs.Text("1:1"),
        ds : new createjs.Text("1:1"),
      }

      let rh = (table.height / table.rows);
      let count_image = count_image || 0;
      let count_text = count_text || 0;
      for (let i of Object.values(tablecontent_a)) {
        if(i.image) {
          count_image++;
          i.regX = i.image.width / 2;
          i.regY = i.image.height / 2;
          i.x = -208;
          i.y = rh * count_image - (rh / 2);
        }
        if(i.text) {
          count_text++;
          i.textBaseline = "middle";
          i.font = font_s;
          i.color = color_s;
          i.x = -190;
          i.y = rh * count_text - (rh / 2);
          i.m = i.getMetrics();
          if(i.m.lines.length > 1) {
            i.y -= i.m.height / 3;
          }
        }

        table.addChild(i);
      } // end for

			for (let i of Object.values(tablecontent_a2)) {
				if(i.image) {
					count_image++;
					i.regX = i.image.width / 2;
					i.regY = i.image.height / 2;
					i.x = -208;
					i.y = rh * count_image - (rh / 2) + 196;
				}
				if(i.text) {
					count_text++;
					i.textBaseline = "middle";
					i.font = font_s;
					i.color = color_s;
					i.x = -190;
					i.y = rh * count_text - (rh / 2) + 196;
					i.m = i.getMetrics();
					if(i.m.lines.length > 1) {
						i.y -= i.m.height / 3;
					}
				}

				table.addChild(i);
			} // end for

			for (let i of Object.values(tablecontent_a3)) {
        if(i.image) {
          count_image++;
          i.regX = i.image.width / 2;
          i.regY = i.image.height / 2;
          i.x = -208;
          i.y = rh * count_image - (rh / 2) + 440;
        }
        if(i.text) {
          count_text++;
          i.textBaseline = "middle";
          i.font = font_s;
          i.color = color_s;
          i.x = -190;
          i.y = rh * count_text - (rh / 2) + 440;
          i.m = i.getMetrics();
          if(i.m.lines.length > 1) {
            i.y -= i.m.height / 3;
          }
        }

        table.addChild(i);
      } // end for

			for (let i of Object.values(tablecontent_a4)) {
        if(i.image) {
          count_image++;
          i.regX = i.image.width / 2;
          i.regY = i.image.height / 2;
          i.x = -208;
          i.y = rh * count_image - (rh / 2) + 513;
        }
        if(i.text) {
          count_text++;
          i.textBaseline = "middle";
          i.font = font_s;
          i.color = color_s;
          i.x = -190;
          i.y = rh * count_text - (rh / 2) + 513;
          i.m = i.getMetrics();
          if(i.m.lines.length > 1) {
            i.y -= i.m.height / 3;
          }
        }

        table.addChild(i);
      } // end for

      count_text = 0;

      for (let i of Object.values(tablecontent_b)) {
        if(i.text) {
          count_text++;
          i.textAlign = "center";
          i.textBaseline = "middle";
          i.lineWidth = table.columnwidths[0] - 10;
          i.font = font_s;
          i.color = color_s;
          i.x = 135;
          i.y = rh * count_text - (rh / 2);
          i.m = i.getMetrics();
          if(i.m.lines.length > 1) {
            i.y -= i.m.height / 3;
          }
        }

        table.addChild(i);

      } // end for
      count_text = 0;

      for (let i of Object.values(tablecontent_c)) {
        if(i.text) {
          count_text++;
          i.textAlign = "center";
          i.textBaseline = "middle";
          i.font = font_s;
          i.color = color_s;
          i.x = 313;
          i.y = rh * count_text - (rh / 2);
        }

        table.addChild(i);

      } // end for
      count_text = 0;
      // title.a
      // body.a.y = 40;
      // title.b.y = 170;
      // body.b.y = 210;
      // body.c.y = 260;
      // body.d.y = 310;
      // body.e.y = 370;
      // title.c.y = 490;
      // image.y = 480;
      // tablehead.y = 800;

      // title.a.y
      body.a.y = title.a.y + title.a.height + 20;
      title.b.y = body.a.y + body.a.height + 40;
      body.b.y = title.b.y + title.b.height + 20;
      body.c.y = body.b.y + body.b.height + 20;
      body.d.y = body.c.y + body.c.height + 20;
      body.e.y = body.d.y + body.d.height + 30;
      title.c.y = body.e.y + body.e.height + 40;
      image.y = title.c.y + title.c.height + 20;
      tablehead.bg.y = image.y + image.image.height + 30;
      tablehead.a.y = tablehead.b.y = tablehead.c.y = tablehead.bg.y + 25;
      tablehead.c.y-= 11;
      table.y = tableLeft.y = tablehead.bg.y + 50;
			tableLeft2.y = tablehead.bg.y + 341.5;
			tableLeft3.y = tableLeft2.y + 507.5;
			tableLeft4.y = tableLeft3.y + 363;
      con.cache(0, 0, con.getBounds().width + 20, con.getBounds().height + 50);
      con.setBounds(0, 0, 360, con.getBounds().height);
      return {"con":con, "titles":title};


    } // end of writeContent

	});

	return instance;
}
