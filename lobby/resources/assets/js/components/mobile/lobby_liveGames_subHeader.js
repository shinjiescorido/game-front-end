import { numberCounter, playSound, numberWithCommas, setCurrentTimezone } from '../../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		all_table : [],
		baccarat_tables: [],
		poker_tables : [],
		sicbo_tables: [],
		dragonTigerTables: [],
		main() {
			this.visible = false;

			var container = new createjs.Container();
			container.y = 96.5;
			container.visible = false;
			header_c.addChild(container);
			let header_height = 68;

			this.sub_header_bg = new createjs.Shape();
			this.sub_header_bg.graphics.beginFill("#8c1414").drawRect(-50,0, 1500, header_height);
			this.sub_header_bg.setBounds(-50,0, 1500, 68);
			container.addChild(this.sub_header_bg);

			// // === all games
			// this.sub_header_allGames = new createjs.Shape();
			// this.sub_header_allGames.graphics.beginFill("#8c1414").drawRect(0,0,190,header_height);
			// this.sub_header_allGames.x = 30;
			// this.sub_header_allGames.name = "sub_allGames";
			// container.addChild(this.sub_header_allGames);
			// this.sub_header_allGames.active = function (e) {
			// 	e.graphics.clear().beginFill("#771111").drawRect(0,0,190,header_height);
			// }

			// this.sub_header_allGames.normal = function (e) {
			// 	e.graphics.clear().beginFill("#8c1414").drawRect(0,0,190,header_height);
			// }

			// this.sub_header_allGames.active(this.sub_header_allGames);

			// let all_games = new createjs.Text(window.language.lobby.allgamescaps,"bold 20px LatoBold","#fff");
			// all_games.x = this.sub_header_allGames.x + 95;
			// all_games.y = this.sub_header_allGames.y + 20;
			// all_games.textAlign = "center";
			// all_games.name = "sub_allGames";
			// all_games.is_text = true;
			// all_games.m_target = this.sub_header_allGames;
			// container.addChild(all_games);

			// === baccarat
			this.sub_header_baccarat = new createjs.Shape();
			this.sub_header_baccarat.name = "sub_baccarat";
			this.sub_header_baccarat.graphics.beginFill("#8c1414").drawRect(0,0,220,header_height);
			this.sub_header_baccarat.x = 30;
			container.addChild(this.sub_header_baccarat);

			this.sub_header_baccarat.active = function (e) {
				e.graphics.clear().beginFill("#771111").drawRect(0,0,220,header_height);
			}

			this.sub_header_baccarat.normal = function (e) {
				e.graphics.clear().beginFill("#8c1414").drawRect(0,0,220,header_height);
			}

			let baccarat_games = new createjs.Text(window.language.lobby.baccaratcaps,"bold 20px LatoBold","#fff");
			baccarat_games.x = this.sub_header_baccarat.x + 66 + 30;
			baccarat_games.y = this.sub_header_baccarat.y + 20;
			baccarat_games.textAlign = "center";
			baccarat_games.is_text = true;
			baccarat_games.m_target = this.sub_header_baccarat;
			container.addChild(baccarat_games);

			if(window.language.locale == "zh") {
				baccarat_games.y -= 7;
				baccarat_games.font = "bold 25px LatoBold";
			}

			// === sub header super6
			this.sub_header_supersix = new createjs.Shape();
			this.sub_header_supersix.name = "sub_supersix";
			this.sub_header_supersix.graphics.beginFill("#8c1414").drawRect(0,0,140,header_height);
			this.sub_header_supersix.x = 220;
			container.addChild(this.sub_header_supersix);

			this.sub_header_supersix.active = function (e) {
				e.graphics.clear().beginFill("#771111").drawRect(0,0,140,header_height);
			}

			this.sub_header_supersix.normal = function (e) {
				e.graphics.clear().beginFill("#8c1414").drawRect(0,0,140,header_height);
			}

			let supersix_games = new createjs.Text(window.language.lobby.supersixcaps,"bold 20px LatoBold","#fff");
			supersix_games.x = this.sub_header_supersix.x + 70;
			supersix_games.y = this.sub_header_supersix.y + 20;
			supersix_games.textAlign = "center";
			supersix_games.is_text = true;
			supersix_games.m_target = this.sub_header_supersix;
			container.addChild(supersix_games);

			let newSuperBg = new createjs.Shape();
			newSuperBg.name = "sub_supersix";
			newSuperBg.graphics.beginFill("#d22f22").drawRect(0,0,50,20);
			newSuperBg.x = 290;
			newSuperBg.y = 43
			container.addChild(newSuperBg);

			let newSuperText = new createjs.Text(window.language.lobby.newcaps, "italic 17px TimesNewRoman","#fff");
			newSuperText.x = newSuperBg.x + 25;
			newSuperText.y = newSuperBg.y;
			newSuperText.textAlign = "center";
			newSuperText.m_target = this.sub_header_supersix;
			container.addChild(newSuperText);

			if(window.language.locale == "zh") {
				supersix_games.y -= 7;
				supersix_games.font = "bold 25px LatoBold";
			}

			// === sub header bonus baccarat
			this.sub_header_bonus = new createjs.Shape();
			this.sub_header_bonus.name = "sub_bonus";
			this.sub_header_bonus.graphics.beginFill("#8c1414").drawRect(0,0,260,header_height);
			this.sub_header_bonus.x = 360;
			container.addChild(this.sub_header_bonus);

			this.sub_header_bonus.active = function (e) {
				e.graphics.clear().beginFill("#771111").drawRect(0,0,260,header_height);
			}

			this.sub_header_bonus.normal = function (e) {
				e.graphics.clear().beginFill("#8c1414").drawRect(0,0,260,header_height);
			}

			let bonus_baccarat = new createjs.Text(window.language.lobby.bonusbaccaratcaps,"bold 20px LatoBold","#fff");
			bonus_baccarat.x = this.sub_header_bonus.x + 60 + 69;
			bonus_baccarat.y = this.sub_header_bonus.y + 20;
			bonus_baccarat.textAlign = "center";
			bonus_baccarat.is_text = true;
			bonus_baccarat.name = "sub_bonus";
			bonus_baccarat.m_target = this.sub_header_bonus;
			container.addChild(bonus_baccarat);

			let newBonusBg = new createjs.Shape();
			newBonusBg.name = "sub_supersix";
			newBonusBg.graphics.beginFill("#d22f22").drawRect(0,0,55,20);
			newBonusBg.x = 520;
			newBonusBg.y = 43
			newBonusBg.name = "sub_bonus"
			container.addChild(newBonusBg);

			let newBonusText = new createjs.Text(window.language.lobby.newcaps, "italic 17px TimesNewRoman","#fff");
			newBonusText.x = newBonusBg.x + 28;
			newBonusText.y = newBonusBg.y;
			newBonusText.textAlign = "center";
			newBonusText.name = "sub_bonus"
			newBonusText.m_target = this.sub_header_bonus;
			container.addChild(newBonusText);

			if(window.language.locale == "zh") {
				bonus_baccarat.y -= 7;
				bonus_baccarat.font = "bold 25px LatoBold";
			}

			// === sub header poker
			this.sub_header_poker = new createjs.Shape();
			this.sub_header_poker.name = "sub_poker";
			this.sub_header_poker.graphics.beginFill("#8c1414").drawRect(0,0,250,header_height);
			this.sub_header_poker.x = 620;
			container.addChild(this.sub_header_poker);

			this.sub_header_poker.active = function (e) {
				e.graphics.clear().beginFill("#771111").drawRect(0,0,250,header_height);
			}

			this.sub_header_poker.normal = function (e) {
				e.graphics.clear().beginFill("#8c1414").drawRect(0,0,250,header_height);
			}


			let poker_games = new createjs.Text(window.language.lobby.texascaps,"bold 20px LatoBold","#fff");
			poker_games.x = this.sub_header_poker.x + 15 + 95;
			poker_games.y = this.sub_header_poker.y + 20;
			poker_games.textAlign = "center";
			poker_games.is_text = true;
			poker_games.m_target = this.sub_header_poker;
			container.addChild(poker_games);

			let newPokerBg = new createjs.Shape();
			newPokerBg.name = "sub_supersix";
			newPokerBg.graphics.beginFill("#d22f22").drawRect(0,0,50,20);
			newPokerBg.x = 758;
			newPokerBg.y = 43
			container.addChild(newPokerBg);

			let newPokerText = new createjs.Text(window.language.lobby.newcaps, "italic 17px TimesNewRoman","#fff");
			newPokerText.x = newPokerBg.x + 25;
			newPokerText.y = newPokerBg.y;
			newPokerText.textAlign = "center";
			newPokerText.m_target = this.sub_header_poker;
			container.addChild(newPokerText);

			if(window.language.locale == "zh") {
				poker_games.y -= 7;
				poker_games.font = "bold 25px LatoBold";
			}

			// === sub header sicbo
			this.sub_header_sicbo = new createjs.Shape();
			this.sub_header_sicbo.name = "sub_sicbo";

			this.sub_header_sicbo.graphics.beginFill("#8c1414").drawRect(0,0,140,header_height);
			this.sub_header_sicbo.x = 840;
			container.addChild(this.sub_header_sicbo);

			this.sub_header_sicbo.active = function (e) {
				e.graphics.clear().beginFill("#771111").drawRect(0,0,140,header_height);
			}

			this.sub_header_sicbo.normal = function (e) {
				e.graphics.clear().beginFill("#8c1414").drawRect(0,0,140,header_height);
			}

			let sicbo_games = new createjs.Text(window.language.lobby.sicbocaps,"bold 20px LatoBold","#fff");
			sicbo_games.x = this.sub_header_sicbo.x + 70;
			sicbo_games.y = this.sub_header_sicbo.y + 20;
			sicbo_games.textAlign = "center";
			sicbo_games.is_text = true;
			sicbo_games.m_target = this.sub_header_sicbo;
			container.addChild(sicbo_games);

			if(window.language.locale == "zh") {
				sicbo_games.y -= 7;
				sicbo_games.font = "bold 25px LatoBold";
			}

			// === sub header dragon tiger
			this.sub_header_dragonTiger = new createjs.Shape();
			this.sub_header_dragonTiger.name = "sub_dragonTiger";
			this.sub_header_dragonTiger.graphics.beginFill("#8c1414").drawRect(0,0,260,header_height);

			this.sub_header_dragonTiger.x = 980;
			container.addChild(this.sub_header_dragonTiger);

			this.sub_header_dragonTiger.active = function (e) {
				e.graphics.clear().beginFill("#771111").drawRect(0,0,260,header_height);
			}

			this.sub_header_dragonTiger.normal = function (e) {
				e.graphics.clear().beginFill("#8c1414").drawRect(0,0,260,header_height);
			}

			let dragon_tiger = new createjs.Text(window.language.lobby.dragontigercaps,"bold 20px LatoBold","#fff");
			dragon_tiger.x = this.sub_header_dragonTiger.x + 60 + 69;
			dragon_tiger.y = this.sub_header_dragonTiger.y + 20;
			dragon_tiger.textAlign = "center";
			dragon_tiger.is_text = true;
			dragon_tiger.m_target = this.sub_header_dragonTiger;
			container.addChild(dragon_tiger);

			if(window.language.locale == "zh") {
				dragon_tiger.y -= 7;
				dragon_tiger.font = "bold 25px LatoBold";
			}

			// === roullete
			// this.sub_header_roullete = new createjs.Shape();
			// this.sub_header_roullete.name = "sub_roullete";
			// this.sub_header_roullete.graphics.beginFill("#4527a0").drawRect(0,0,230,header_height);
			// this.sub_header_roullete.x = 1080;
			// container.addChild(this.sub_header_roullete);

			// this.sub_header_roullete.active = function (e) {
			// 	e.graphics.clear().beginFill("#3b2188").drawRect(0,0,230,header_height);
			// }

			// this.sub_header_roullete.normal = function (e) {
			// 	e.graphics.clear().beginFill("#4527a0").drawRect(0,0,230,header_height);
			// }

			// let roullete = new createjs.Text("ROULLETE","20px LatoBold","#fff");
			// roullete.x = this.sub_header_roullete.x + 45;
			// roullete.y = this.sub_header_roullete.y + 20;
			// roullete.is_text = true;
			// roullete.m_target = this.sub_header_roullete;
			// container.addChild(roullete);

			// === thumbnails
			this.sub_thumbnailView = new createjs.Container();
			let thumbnail_bg = new createjs.Shape();
			thumbnail_bg.is_child = true;
			thumbnail_bg.graphics.beginFill("#8c1414").drawRect(-10,-10,45,50);

			let thumbnail1 = new createjs.Shape();
			thumbnail1.is_child = true;
			thumbnail1.graphics.beginFill("#fff").drawRoundRect(0,0,14,14,5);

			let thumbnail2 = new createjs.Shape();
			thumbnail2.is_child = true;
			thumbnail2.graphics.beginFill("#fff").drawRoundRect(16,0,14,14,5);

			let thumbnail3 = new createjs.Shape();
			thumbnail3.is_child = true;
			thumbnail3.graphics.beginFill("#fff").drawRoundRect(0,16,14,14,5);

			let thumbnail4 = new createjs.Shape();
			thumbnail4.is_child = true;
			thumbnail4.graphics.beginFill("#fff").drawRoundRect(16,16,14,14,5);

			this.sub_thumbnailView.x = 1594;
			this.sub_thumbnailView.y = 10;
			this.sub_thumbnailView.alpha = .6;
			this.sub_thumbnailView.view = "thumbnail";
			this.sub_thumbnailView.active =  function(e) {
				e.alpha = 1;
			}
			this.sub_thumbnailView.normal =  function(e) {
				e.alpha = .6;
			}

			this.sub_thumbnailView.active(this.sub_thumbnailView);

			this.sub_thumbnailView.addChild(thumbnail_bg, thumbnail1, thumbnail2, thumbnail3, thumbnail4);
			container.addChild(this.sub_thumbnailView);

			this.sub_listView = new createjs.Container();

			let thumbnail_bg2 = new createjs.Shape();
			thumbnail_bg2.is_child = true;
			thumbnail_bg2.graphics.beginFill("#8c1414").drawRect(-10,-10,45,50);

			let list1 = new createjs.Shape();
			list1.is_child = true;
			list1.graphics.beginFill("#fff").drawRoundRect(0,0,30,7,2);

			let list2 = new createjs.Shape();
			list2.is_child = true;
			list2.graphics.beginFill("#fff").drawRoundRect(0,11,30,7,2);

			let list3 = new createjs.Shape();
			list3.is_child = true;
			list3.graphics.beginFill("#fff").drawRoundRect(0,22,30,7,2);

			this.sub_listView.addChild(thumbnail_bg2, list1, list2, list3);
			this.sub_listView.x = 1636;
			this.sub_listView.y = 10;
			this.sub_listView.alpha = .6;
			this.sub_listView.view = "list";

			this.sub_listView.active = function(e) {
				e.alpha = 1
			}
			this.sub_listView.normal = function(e) {
				e.alpha = .6
			}
			container.addChild(this.sub_listView);

			// this.on("mouseover", (e) => {
			// 	$(".container").css('cursor','pointer');
			// 	try {
			// 		e.target.active(e.target);
			// 	} catch (e) {

			// 	}
			// });
			// this.on("mouseout", (e) => {
			// 	$(".container").css('cursor','default');
			// 	if(e.target.clicked) return;
			// 	try {
			// 		e.target.normal(e.target);
			// 	} catch (e) {

			// 	}
			// });

			container.on("click", (e) => {
				e.nativeEvent.preventDefault();

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

				if (e.target.name == "themed_games") return;

				e.target.clicked = true;
				playSound('click');
				toggleView(e.target.name);
				return;

				// if(e.target.view) {
				// 	if(e.target.view == "list") {
				// 		this.context.lobby_baccaratTables.list_view.visible = true;
				// 		this.context.lobby_baccaratTables.thumbnail_view.visible = false;
				// 		this.context.lobby_liveGames.list_view.visible = true;
				// 		this.context.lobby_liveGames.thumbnail_view.visible = false;
        //
				// 	} else if(e.target.view == "thumbnail") {
				// 		this.context.lobby_baccaratTables.list_view.visible = false;
				// 		this.context.lobby_baccaratTables.thumbnail_view.visible = true;
				// 		this.context.lobby_liveGames.list_view.visible = false;
				// 		this.context.lobby_liveGames.thumbnail_view.visible = true;
				// 	}
				// }
        //
				// switch(e.target.name) {
				// 	case "sub_baccarat":
				// 		// === make thumbnail as default
				// 		this.sub_thumbnailView.active(this.sub_thumbnailView);
				// 		this.context.lobby_baccaratTables.list_view.visible = false;
				// 		this.context.lobby_baccaratTables.thumbnail_view.visible = true;
				// 		this.context.lobby_liveGames.list_view.visible = false;
				// 		this.context.lobby_liveGames.thumbnail_view.visible = true;
        //
				// 		this.context.lobby_baccaratTables.visible = true;
				// 		this.context.lobby_liveGames.visible = false;
				// 		this.context.lobby_pokerTables.visible = false;
				// 		this.context.lobby_sicboTables.visible = false;
				// 		this.context.lobby_dragonTigerTables.visible = false;
        //         		this.context.lobby_roulleteTables.visible = false;
        //
				// 		break;
				// 	case "sub_allGames":
				// 		// === make thumbnail as default
				// 		this.sub_thumbnailView.active(this.sub_thumbnailView);
				// 		this.context.lobby_baccaratTables.list_view.visible = false;
				// 		this.context.lobby_baccaratTables.thumbnail_view.visible = true;
				// 		this.context.lobby_liveGames.list_view.visible = false;
				// 		this.context.lobby_liveGames.thumbnail_view.visible = true;
        //
				// 		this.context.lobby_baccaratTables.visible = false;
				// 		this.context.lobby_liveGames.visible = true;
				// 		this.context.lobby_pokerTables.visible = false;
				// 		this.context.lobby_sicboTables.visible = false;
				// 		this.context.lobby_dragonTigerTables.visible = false;
        //         		this.context.lobby_roulleteTables.visible = false;
        //
				// 		break;
				// 	case "sub_poker":
				// 		this.context.lobby_baccaratTables.visible = false;
				// 		this.context.lobby_liveGames.visible = false;
				// 		this.context.lobby_pokerTables.visible = true;
				// 		this.context.lobby_sicboTables.visible = false;
				// 		this.context.lobby_dragonTigerTables.visible = false;
        //         		this.context.lobby_roulleteTables.visible = false;
        //
				// 		break;
				// 	case "sub_sicbo":
				// 		this.context.lobby_baccaratTables.visible = false;
				// 		this.context.lobby_liveGames.visible = false;
				// 		this.context.lobby_pokerTables.visible = false;
				// 		this.context.lobby_sicboTables.visible = true;
				// 		this.context.lobby_dragonTigerTables.visible = false;
        //         		this.context.lobby_roulleteTables.visible = false;
        //
				// 		break;
				// 	case "sub_dragonTiger":
				// 		this.context.lobby_baccaratTables.visible = false;
				// 		this.context.lobby_liveGames.visible = false;
				// 		this.context.lobby_pokerTables.visible = false;
				// 		this.context.lobby_sicboTables.visible = false;
				// 		this.context.lobby_dragonTigerTables.visible = true;
        //         		this.context.lobby_roulleteTables.visible = false;
				// 		break;
				// 	case "sub_roullete":
				// 		this.context.lobby_baccaratTables.visible = false;
				// 		this.context.lobby_liveGames.visible = false;
				// 		this.context.lobby_pokerTables.visible = false;			// 		this.context.lobby_sicboTables.visible = false;
				// 		this.context.lobby_dragonTigerTables.visible = false;
        //         		this.context.lobby_roulleteTables.visible = true;
        //			// 		break;
				// }
			});

		}

});

	return instance;
}
