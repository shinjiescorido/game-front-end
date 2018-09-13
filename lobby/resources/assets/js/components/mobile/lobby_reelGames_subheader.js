import { numberCounter, playSound, numberWithCommas } from '../../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {

			var containeR = new createjs.Container();
			containeR.y = 96.5;
			containeR.visible = false;
			header_c.addChild(containeR);

      let font = "bold 20px LatoBold";
      let subheader_color = "#f57c00";
      let subheader_active_color = "#d06900";
      let subheader_text = [window.language.lobby.allgamescaps, window.language.lobby.kagamingreelcaps, window.language.lobby.betsoftreelcaps]
      let subheader_names = ["allgames", "kagaming", "betsoft"];
      let header_height = 68;
			this.y = 96.5;
			this.visible = false;

			this.sub_header_bg = new createjs.Shape();
			this.sub_header_bg.graphics.beginFill(subheader_color).drawRect(-50,0, 1500, header_height);
			this.sub_header_bg.setBounds(-50,0, 1500, 68);
			containeR.addChild(this.sub_header_bg);

      this.subheader_con = new createjs.Container();
      containeR.addChild(this.subheader_con);

      let subheader_widths = [190, 220, 220];
      subheader_names.forEach((o, i) => {
        this[o] = new createjs.Shape();
        this[o].graphics.beginFill(subheader_color).drawRect(0, 0, subheader_widths[i], header_height);
        this[o].setBounds(0, 0, subheader_widths[i], header_height);
        this[o].name = o;
        this[o].text = new createjs.Text(subheader_text[i], font, "#fff");
        this[o].text.textAlign = "center";
        this[o].text.textBaseline = "middle";
        this[o].text.mouseEnabled = false;
        this[o].text.y = header_height/2;
        this.subheader_con.addChild(this[o], this[o].text)
        this[o].active = (e) => {
					e.graphics.clear().beginFill(subheader_active_color).drawRect(0, 0, e.getBounds().width, e.getBounds().height); }
        this[o].normal = (e) => { e.graphics.clear().beginFill(subheader_color).drawRect(0, 0, e.getBounds().width, e.getBounds().height); }
      })

      this.allgames.x = 30;
      this.allgames.text.x = this.allgames.x + 95;
			this.kagaming.x = 220;
			this.kagaming.text.x = this.kagaming.x + 110;
      this.betsoft.x = 440;
      this.betsoft.text.x = this.betsoft.x + 110;


      this.betsoft.soon = {
        "bg": new createjs.Shape(),
        "text": new createjs.Text("SOON!", "italic 16px TimesNewRoman", "#fff")
      }
			this.betsoft.soon.bg.graphics.beginFill("#cf2f1f").drawRect(this.betsoft.soon.text.getBounds().width, this.betsoft.soon.text.lineHeight, 55, 20);
      this.betsoft.soon.bg.x = this.betsoft.text.x - 45 - 15;
      this.betsoft.soon.bg.y = this.betsoft.text.y + 10;
      this.betsoft.soon.text.textAlign = "center";
      this.betsoft.soon.text.textBaseline = "middle";
      this.betsoft.soon.text.x = this.betsoft.soon.bg.x + 75;
      this.betsoft.soon.text.y = this.betsoft.soon.bg.y + 10;
      containeR.addChild(this.betsoft.soon.bg, this.betsoft.soon.text)


			this.kagaming.new = {
				"bg": new createjs.Shape(),
				"text": new createjs.Text("NEW!", "italic 16px TimesNewRoman", "#fff")
			}
			this.kagaming.new.bg.graphics.beginFill("#cf2f1f").drawRect(this.kagaming.new.text.getBounds().width, this.kagaming.new.text.lineHeight, 55, 20);
			this.kagaming.new.bg.x = this.kagaming.text.x - 45 + 10;
			this.kagaming.new.bg.y = this.kagaming.text.y + 10;
			this.kagaming.new.text.textAlign = "center";
			this.kagaming.new.text.textBaseline = "middle";
			this.kagaming.new.text.x = this.kagaming.new.bg.x + 68;
			this.kagaming.new.text.y = this.kagaming.new.bg.y + 10;
			containeR.addChild(this.kagaming.new.bg, this.kagaming.new.text)

      // this.kagaming.mouseEnabled = false;

			// // === all games
			// this.sub_header_allGames = new createjs.Shape();
			// this.sub_header_allGames.graphics.beginFill("#890e4f").drawRect(0,0,190,header_height);
			// this.sub_header_allGames.x = 30;
			// this.sub_header_allGames.name = "themed_games";
			// containeR.addChild(this.sub_header_allGames);
			// this.sub_header_allGames.active = function (e) {
			// 	e.graphics.clear().beginFill("#740b43").drawRect(0,0,190,header_height);
			// }
      //
			// this.sub_header_allGames.normal = function (e) {
			// 	e.graphics.clear().beginFill("#890e4f").drawRect(0,0,190,header_height);
			// }
      //
			// this.sub_header_allGames.active(this.sub_header_allGames);
      //
			// let all_games = new createjs.Text(window.language.lobby.allgamescaps,font,"#fff");
			// all_games.x = this.sub_header_allGames.x + 38 + 55;
			// all_games.y = this.sub_header_allGames.y + 20;
			// all_games.textAlign = "center";
			// all_games.name = "themed_games";
			// all_games.is_text = true;
			// all_games.m_target = this.sub_header_allGames;
			// containeR.addChild(all_games);
      //
			// // === red white
			// this.sub_header_redwhite = new createjs.Shape();
			// this.sub_header_redwhite.name = "sub_pulaputi";
			// this.sub_header_redwhite.graphics.beginFill("#881050").drawRect(0,0,220,header_height);
			// this.sub_header_redwhite.x = 220;
			// containeR.addChild(this.sub_header_redwhite);
      //
			// this.sub_header_redwhite.icon = new createjs.Bitmap(this.context.getResources("/img/themed_games/redwhite_ico.png"));
			// this.sub_header_redwhite.icon.scaleX = this.sub_header_redwhite.icon.scaleY = 0.55;
			// this.sub_header_redwhite.icon.x = this.sub_header_redwhite.x + 22;
			// this.sub_header_redwhite.icon.y = this.sub_header_redwhite.y + 8;
			// // this.sub_header_redwhite.icon.hitArea = this.sub_header_redwhite;
			// containeR.addChild(this.sub_header_redwhite.icon);
      //
			// this.sub_header_redwhite.active = function (e) {
			// 	e.graphics.clear().beginFill("#740b43").drawRect(0,0,240,header_height);
			// }
      //
			// this.sub_header_redwhite.normal = function (e) {
			// 	e.graphics.clear().beginFill("#881050").drawRect(0,0,240,header_height);
			// }
      //
			// let redwhite_games = new createjs.Text(window.language.lobby.betsoftreelcap,font,"#fff");
			// redwhite_games.x = this.sub_header_redwhite.x + 55 + 55;
			// redwhite_games.y = this.sub_header_redwhite.y + 20;
			// redwhite_games.textAlign = "center"
			// redwhite_games.is_text = true;
			// redwhite_games.m_target = this.sub_header_redwhite;
			// containeR.addChild(redwhite_games);
      //
			// // === sub header money wheel
			// this.sub_header_spinwin = new createjs.Shape();
			// this.sub_header_spinwin.name = "sub_spinwin";
			// this.sub_header_spinwin.graphics.beginFill("#881050").drawRect(0,0,220,header_height);
			// this.sub_header_spinwin.x = 440;
			// containeR.addChild(this.sub_header_spinwin);
			// this.sub_header_spinwin.icon = new createjs.Bitmap(this.context.getResources("/img/themed_games/moneywheel_ico.png"));
			// this.sub_header_spinwin.icon.scaleX = this.sub_header_spinwin.icon.scaleY = 0.2;
			// this.sub_header_spinwin.icon.x = this.sub_header_spinwin.x + 24;
			// this.sub_header_spinwin.icon.y = this.sub_header_spinwin.y + 13;
			// // this.sub_header_spinwin.icon.hitArea = this.sub_header_spinwin;
			// containeR.addChild(this.sub_header_spinwin.icon);
      //
			// this.sub_header_spinwin.active = function (e) {
			// 	e.graphics.clear().beginFill("#740b43").drawRect(0,0,220,header_height);
			// }
      //
			// this.sub_header_spinwin.normal = function (e) {
			// 	e.graphics.clear().beginFill("#881050").drawRect(0,0,220,header_height);
			// }
      //
      //
			// let spinwin_games = new createjs.Text(window.language.lobby.kagamingreelcaps,font,"#fff");
			// spinwin_games.x = this.sub_header_spinwin.x + 65 + 43;
			// spinwin_games.y = this.sub_header_spinwin.y + 20;
			// spinwin_games.textAlign = "center"
			// spinwin_games.is_text = true;
			// spinwin_games.m_target = this.sub_header_spinwin;
			// containeR.addChild(spinwin_games);

			  // this.subheader_con.on("mousedown", (e) => {
  			// 	try { e.target.active(e.target); } catch (e) { }
  			// });

        this.subheader_con.on("click", (e) => {
					e.nativeEvent.preventDefault();

          if(e.target.soon) return;

  				this.kagaming.normal(this.kagaming)
  				this.allgames.normal(this.allgames)
  				this.betsoft.normal(this.betsoft)

  				if(e.target.is_text) { //if target is text. fix for hitarea bug
  					e.target = e.target.m_target;
  				}

  				if(e.target.is_child) { // list and thumbnail view redirect to parent target
  					e.target = e.target.parent;
  				}

  				try {
  					e.target.active(e.target);

  				} catch (err) { }

  				e.target.clicked = true;
					playSound('click');
					// this.context.toggleView(e.target.name);
  				return;
  			});

				//all games click
				this.subheader_con.children[0].on("click", (e)=> {
					this.context.toggleView(e.target.name);
				});

				//ka gaming click
				this.subheader_con.children[2].on("click", (e)=> {
					reelClicked++;
					this.context.toggleView(e.target.name);
				});

				//for disabled click for betsoft reel
	      this.subheader_con.children[4].on("click", (e)=> {
	          if(e.name == "betsoft") { return; }
	      });

	      this.subheader_con.children[4].mouseEnabled = false;
		}
	});

	return instance;
}
