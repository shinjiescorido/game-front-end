import { numberCounter, playSound, numberWithCommas } from '../../factories/factories';
let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
			this.y = 96.5;
			this.visible = false;

			let header_height = 68;

			this.sub_header_bg = new createjs.Shape();
			this.sub_header_bg.graphics.beginFill("#890e4f").drawRect(-50,0, 1500, header_height);
			this.sub_header_bg.setBounds(-50,0, 1500, 68);
			this.addChild(this.sub_header_bg);

			// === all games
			// this.sub_header_allGames = new createjs.Shape();
			// this.sub_header_allGames.graphics.beginFill("#890e4f").drawRect(0,0,190,header_height);
			// this.sub_header_allGames.x = 30;
			// this.sub_header_allGames.name = "themed_games";
			// this.addChild(this.sub_header_allGames);
			// this.sub_header_allGames.active = function (e) {
			// 	e.graphics.clear().beginFill("#740b43").drawRect(0,0,190,header_height);
			// }

			// this.sub_header_allGames.normal = function (e) {
			// 	e.graphics.clear().beginFill("#890e4f").drawRect(0,0,190,header_height);
			// }

			// this.sub_header_allGames.active(this.sub_header_allGames);

			// let all_games = new createjs.Text(window.language.lobby.allgamescaps,"bold 20px LatoBold","#fff");
			// all_games.x = this.sub_header_allGames.x + 38 + 55;
			// all_games.y = this.sub_header_allGames.y + 20;
			// all_games.textAlign = "center";
			// all_games.name = "themed_games";
			// all_games.is_text = true;
			// all_games.m_target = this.sub_header_allGames;
			// this.addChild(all_games);

			// === red white
			this.sub_header_redwhite = new createjs.Shape();
			this.sub_header_redwhite.name = "sub_pulaputi";
			this.sub_header_redwhite.graphics.beginFill("#881050").drawRect(0,0,220,header_height);
			this.sub_header_redwhite.x = 30;
			this.addChild(this.sub_header_redwhite);

			this.sub_header_redwhite.icon = new createjs.Bitmap(this.context.getResources("/img/themed_games/redwhite_ico.png"));
			this.sub_header_redwhite.icon.scaleX = this.sub_header_redwhite.icon.scaleY = 0.55;
			this.sub_header_redwhite.icon.x = this.sub_header_redwhite.x + 22;
			this.sub_header_redwhite.icon.y = this.sub_header_redwhite.y + 8;
			// this.sub_header_redwhite.icon.hitArea = this.sub_header_redwhite;
			this.addChild(this.sub_header_redwhite.icon);

			this.sub_header_redwhite.active = function (e) {
				e.graphics.clear().beginFill("#740b43").drawRect(0,0,240,header_height);
			}

			this.sub_header_redwhite.normal = function (e) {
				e.graphics.clear().beginFill("#881050").drawRect(0,0,240,header_height);
			}

			this.sub_header_redwhite.active(this.sub_header_redwhite);

			let redwhite_games = new createjs.Text(window.language.lobby.redwhitecaps,"bold 20px LatoBold","#fff");
			redwhite_games.x = this.sub_header_redwhite.x + 55 + 40;
			redwhite_games.y = this.sub_header_redwhite.y + 20;
			redwhite_games.textAlign = "center"
			redwhite_games.is_text = true;
			redwhite_games.m_target = this.sub_header_redwhite;
			this.addChild(redwhite_games);

			// === sub header money wheel
			this.sub_header_spinwin = new createjs.Shape();
			this.sub_header_spinwin.name = "sub_spinwin";
			this.sub_header_spinwin.graphics.beginFill("#881050").drawRect(0,0,220,header_height);
			this.sub_header_spinwin.x = 220;
			this.addChild(this.sub_header_spinwin);
			this.sub_header_spinwin.icon = new createjs.Bitmap(this.context.getResources("/img/themed_games/moneywheel_ico.png"));
			this.sub_header_spinwin.icon.scaleX = this.sub_header_spinwin.icon.scaleY = 0.2;
			this.sub_header_spinwin.icon.x = this.sub_header_spinwin.x + 24;
			this.sub_header_spinwin.icon.y = this.sub_header_spinwin.y + 13;
			// this.sub_header_spinwin.icon.hitArea = this.sub_header_spinwin;
			this.addChild(this.sub_header_spinwin.icon);

			this.sub_header_spinwin.active = function (e) {
				e.graphics.clear().beginFill("#740b43").drawRect(0,0,220,header_height);
			}

			this.sub_header_spinwin.normal = function (e) {
				e.graphics.clear().beginFill("#881050").drawRect(0,0,220,header_height);
			}


			let spinwin_games = new createjs.Text(window.language.lobby.spinwincaps,"bold 20px LatoBold","#fff");
			spinwin_games.x = this.sub_header_spinwin.x + 65 + 45;
			spinwin_games.y = this.sub_header_spinwin.y + 20;
			spinwin_games.textAlign = "center"
			spinwin_games.is_text = true;
			spinwin_games.m_target = this.sub_header_spinwin;
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
        //
				// 		break;
				// 	case "sub_pulaputi":
				// 		this.context.lobby_pulaputiTables.visible = true;
				// 		this.context.lobby_themedGames.visible = false;
				// 		this.context.lobby_bigWheelTables.visible = false;
        //
				// 		break;
				// 	case "sub_spinwin":
				// 		this.context.lobby_pulaputiTables.visible = false;
				// 		this.context.lobby_themedGames.visible = false;
				// 		this.context.lobby_bigWheelTables.visible = true;
        //
				// 		break;
				// }
			});
		}
	});

	return instance;
}
