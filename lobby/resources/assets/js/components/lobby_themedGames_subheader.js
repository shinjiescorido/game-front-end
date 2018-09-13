import { numberCounter, playSound, numberWithCommas } from '../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
			this.y = 72;
			this.visible = false;

			let header_bg = new createjs.Shape()
			header_bg.graphics.beginFill("#890e4f").drawRect(0,0, this.context.context.width - this.context.body_bg_width, 50);
			this.addChild(header_bg)

			// === all games
			this.sub_header_allGames = new createjs.Shape();
			this.sub_header_allGames.graphics.beginFill("#881050").drawRect(0,0,220,50);
			this.sub_header_allGames.x = 30;
			this.sub_header_allGames.name = "sub_allThemedGames";
			this.addChild(this.sub_header_allGames);
			this.sub_header_allGames.active = function (e) {
				e.graphics.clear().beginFill("#740b43").drawRect(0,0,220,50);
			}

			this.sub_header_allGames.normal = function (e) {
				e.graphics.clear().beginFill("#881050").drawRect(0,0,220,50);
			}

			this.sub_header_allGames.active(this.sub_header_allGames);

			let font = "bold 19px LatoBold";
			if(window.language.locale =="kr") {
				font = "bold 18px LatoBold";
			}

			let all_games = new createjs.Text(window.language.lobby.allgamescaps,font,"#fff");
			all_games.x = this.sub_header_allGames.x + 95;
			all_games.y = this.sub_header_allGames.y + 16;
			all_games.textAlign = "center";
			all_games.name = "sub_allGames";
      all_games.mouseEnabled = false;
			all_games.is_text = true;
			all_games.m_target = this.sub_header_allGames;
			this.addChild(all_games);
			// === red white
			this.sub_header_redwhite = new createjs.Shape();
			this.sub_header_redwhite.name = "sub_pulaputi";
			this.sub_header_redwhite.graphics.beginFill("#881050").drawRect(0,0,240,50);
			this.sub_header_redwhite.x = 220;
			this.sub_header_redwhite.cursor = 'pointer';
			this.addChild(this.sub_header_redwhite);

			this.sub_header_redwhite.active = function (e) {
				e.graphics.clear().beginFill("#740b43").drawRect(0,0,240,50);
			}

			this.sub_header_redwhite.normal = function (e) {
				e.graphics.clear().beginFill("#881050").drawRect(0,0,240,50);
			}

			this.sub_header_redwhite.icon = new createjs.Bitmap("/img/themed_games/redwhite_ico.png");
      this.sub_header_redwhite.icon.mouseEnabled = false;
			this.sub_header_redwhite.icon.scaleX = this.sub_header_redwhite.icon.scaleY = 0.2;
			this.sub_header_redwhite.icon.hitArea = this.sub_header_redwhite;

			let redwhite_games = new createjs.Text(window.language.lobby.redwhitecaps,font,"#fff");
			if(window.language.locale == "en") {
				this.sub_header_redwhite.icon.x = this.sub_header_redwhite.x + 33;
				this.sub_header_redwhite.icon.y = this.sub_header_redwhite.y + 7;

				redwhite_games.x = this.sub_header_redwhite.x + 88;
				redwhite_games.y = this.sub_header_redwhite.y + 14;
			}

			if(window.language.locale == "jp") {
				this.sub_header_redwhite.icon.x = this.sub_header_redwhite.x + 33;
				this.sub_header_redwhite.icon.y = this.sub_header_redwhite.y + 7;

				redwhite_games.x = this.sub_header_redwhite.x + 88;
				redwhite_games.y = this.sub_header_redwhite.y + 14;
			}

			if(window.language.locale == "kr") {
				this.sub_header_redwhite.icon.x = this.sub_header_redwhite.x + 33 + 1;
				this.sub_header_redwhite.icon.y = this.sub_header_redwhite.y + 7 + 1;

				redwhite_games.x = this.sub_header_redwhite.x + 88;
				redwhite_games.y = this.sub_header_redwhite.y + 14;
			}

			redwhite_games.is_text = true;
      redwhite_games.mouseEnabled = false;
			redwhite_games.m_target = this.sub_header_redwhite;
			this.addChild(this.sub_header_redwhite.icon);
			this.addChild(redwhite_games);


			// === sub header money wheel
			this.sub_header_spinwin = new createjs.Shape();
			this.sub_header_spinwin.name = "sub_spinwin";
			this.sub_header_spinwin.graphics.beginFill("#881050").drawRect(0,0,270,50);
			this.sub_header_spinwin.x = 440;
			this.sub_header_spinwin.cursor = 'pointer';
			this.addChild(this.sub_header_spinwin);

			this.sub_header_spinwin.active = function (e) {
				e.graphics.clear().beginFill("#740b43").drawRect(0,0,270,50);
			}

			this.sub_header_spinwin.normal = function (e) {
				e.graphics.clear().beginFill("#881050").drawRect(0,0,270,50);
			}

			this.sub_header_spinwin.icon = new createjs.Bitmap("/img/themed_games/moneywheel_ico.png");
      this.sub_header_spinwin.icon.mouseEnabled = false;
			this.sub_header_spinwin.icon.scaleX = this.sub_header_spinwin.icon.scaleY = 0.2;
			this.sub_header_spinwin.icon.hitArea = this.sub_header_spinwin;

			let spinwin_games = new createjs.Text(window.language.lobby.spinwincaps,font,"#fff");

			if(window.language.locale == "en") {
				this.sub_header_spinwin.icon.x = this.sub_header_spinwin.x + 55;
				this.sub_header_spinwin.icon.y = this.sub_header_spinwin.y + 7;

				spinwin_games.x = this.sub_header_spinwin.x + 92 + 12;
				spinwin_games.y = this.sub_header_spinwin.y + 14;
			}

			if(window.language.locale == "jp") {
				this.sub_header_spinwin.icon.x = this.sub_header_spinwin.x + 55;
				this.sub_header_spinwin.icon.y = this.sub_header_spinwin.y + 7;

				spinwin_games.x = this.sub_header_spinwin.x + 92 + 12;
				spinwin_games.y = this.sub_header_spinwin.y + 14;
			}

			if(window.language.locale == "kr") {
				this.sub_header_spinwin.icon.x = this.sub_header_spinwin.x + 71;
				this.sub_header_spinwin.icon.y = this.sub_header_spinwin.y + 7;

				spinwin_games.x = this.sub_header_spinwin.x + 124;
				spinwin_games.y = this.sub_header_spinwin.y + 14;
			}

			spinwin_games.is_text = true;
      spinwin_games.mouseEnabled = false;
			spinwin_games.m_target = this.sub_header_spinwin;
			this.addChild(this.sub_header_spinwin.icon);
			this.addChild(spinwin_games);

			this.on("mouseover", (e) => {
				try {
					e.target.active(e.target);
				} catch (e) {

				}
			});
			this.on("mouseout", (e) => {
				if(e.target.clicked) return;
				try {
					e.target.normal(e.target);
				} catch (e) {

				}
			});

			this.on("click", (e) => {
				this.children.forEach((child)=>{
					child.clicked = false;
					try {
						child.normal(child)
					}
					catch(err) {

					}
				});

				if(e.target.is_text) { //if target is text. fix for hitarea bug
					e.target = e.target.m_target;
				}

				if(e.target.is_child) { // list and thumbnail view redirect to parent target
					e.target = e.target.parent;
				}

				try {
					e.target.active(e.target);
				} catch (err) {

				}

				e.target.clicked = true;

				playSound('click');
				
				this.context.toggleView(e.target.name);
				return;

				// switch(e.target.name) {
				// 	case "sub_allGames":
				// 		this.context.lobby_pulaputiTables.visible = false;
				// 		this.context.lobby_themedGames.visible = true;
				// 		this.context.lobby_bigWheelTables.visible = false;

				// 		break;
				// 	case "sub_pulaputi":
				// 		this.context.lobby_pulaputiTables.visible = true;
				// 		this.context.lobby_themedGames.visible = false;
				// 		this.context.lobby_bigWheelTables.visible = false;

				// 		break;
				// 	case "sub_spinwin":
				// 		this.context.lobby_pulaputiTables.visible = false;
				// 		this.context.lobby_themedGames.visible = false;
				// 		this.context.lobby_bigWheelTables.visible = true;

				// 		break;
				// }
			});
		},
		hideActive()
		{
			this.sub_header_allGames.normal(this.sub_header_allGames);
			this.sub_header_redwhite.normal(this.sub_header_redwhite);
			this.sub_header_spinwin.normal(this.sub_header_spinwin);

			this.sub_header_allGames.clicked = false;
			this.sub_header_redwhite.clicked = false;
			this.sub_header_spinwin.clicked = false;
		}
	});

	return instance;
}
