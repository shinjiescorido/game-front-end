import { numberCounter, playSound, numberWithCommas } from '../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		all_table : [],
		baccarat_tables: [],
		poker_tables : [],
		sicbo_tables: [],
		dragonTigerTables: [],
		main() {

			this.y = 72;
			this.visible = false;

			this.sub_header_bg = new createjs.Shape();
			this.sub_header_bg.graphics.beginFill("#8c1414").drawRect(0,0, this.context.context.width  - this.context.body_bg_width, 50);
			this.addChild(this.sub_header_bg);

			// === all games
			this.sub_header_allGames = new createjs.Shape();
			this.sub_header_allGames.graphics.beginFill("#8c1414").drawRect(0,0,190,50);
			this.sub_header_allGames.x = 30;
			this.sub_header_allGames.name = "sub_allGames";
			this.addChild(this.sub_header_allGames);
			this.sub_header_allGames.active = function (e) {
				e.graphics.clear().beginFill("#771111").drawRect(0,0,190,50);
			}

			this.sub_header_allGames.normal = function (e) {
				e.graphics.clear().beginFill("#8c1414").drawRect(0,0,190,50);
			}

			this.sub_header_allGames.active(this.sub_header_allGames);

			let font = "bold 19px LatoBold";
			if(window.language.locale =="kr") {
				font = "bold 18px LatoBold";
			}

			let all_games = new createjs.Text(window.language.lobby.allgamescaps,font,"#fff");
			all_games.x = this.sub_header_allGames.x + 42 + 52;
			all_games.y = this.sub_header_allGames.y + 16;
			all_games.name = "sub_allGames";
			all_games.textAlign = "center";
      		all_games.mouseEnabled = false;
			all_games.is_text = true;
			all_games.m_target = this.sub_header_allGames;
			this.addChild(all_games);

			if(window.language.locale == "zh") {
					all_games.font = "bold 25px LatoBold";
					all_games.y = this.sub_header_allGames.y + 10.5;
			}

			// === baccarat
			this.sub_header_baccarat = new createjs.Shape();
			this.sub_header_baccarat.name = "sub_baccarat";
			this.sub_header_baccarat.graphics.beginFill("#8c1414").drawRect(0,0,220,50);
			this.sub_header_baccarat.x = 220;
			this.addChild(this.sub_header_baccarat);

			this.sub_header_baccarat.active = function (e) {
				e.graphics.clear().beginFill("#771111").drawRect(0,0,220,50);
			}

			this.sub_header_baccarat.normal = function (e) {
				e.graphics.clear().beginFill("#8c1414").drawRect(0,0,220,50);
			}

			this.sub_header_baccarat.icon = new createjs.Bitmap("/img/baccarat_ico.png");
      this.sub_header_baccarat.icon.mouseEnabled = false;
			this.sub_header_baccarat.icon.scaleX = this.sub_header_baccarat.icon.scaleY = 0.55;

			let baccarat_games = new createjs.Text(window.language.lobby.baccaratcaps,font,"#fff");

			if(window.language.locale == "zh") {
				baccarat_games.font  = "bold 25px LatoBold";
				this.sub_header_baccarat.icon.x = this.sub_header_baccarat.x + 48;
				this.sub_header_baccarat.icon.y = this.sub_header_baccarat.y + 2;

				baccarat_games.x = this.sub_header_baccarat.x + 115;
				baccarat_games.y = this.sub_header_baccarat.y + 10.5;
			}

			if(window.language.locale == "kr") {
				this.sub_header_baccarat.icon.x = this.sub_header_baccarat.x + 48;
				this.sub_header_baccarat.icon.y = this.sub_header_baccarat.y + 2;

				baccarat_games.x = this.sub_header_baccarat.x + 115;
				baccarat_games.y = this.sub_header_baccarat.y + 16;
			}

			if(window.language.locale == "en") {
				this.sub_header_baccarat.icon.x = this.sub_header_baccarat.x + 23;
				this.sub_header_baccarat.icon.y = this.sub_header_baccarat.y + 2;

				baccarat_games.x = this.sub_header_baccarat.x + 95;
				baccarat_games.y = this.sub_header_baccarat.y + 16;
			}

			if(window.language.locale == "jp") {
				this.sub_header_baccarat.icon.x = this.sub_header_baccarat.x + 23;
				this.sub_header_baccarat.icon.y = this.sub_header_baccarat.y + 2;

				baccarat_games.x = this.sub_header_baccarat.x + 95;
				baccarat_games.y = this.sub_header_baccarat.y + 16;
			}

			this.addChild(this.sub_header_baccarat.icon);

      baccarat_games.mouseEnabled = false;
			baccarat_games.is_text = true;
			baccarat_games.m_target = this.sub_header_baccarat;
			this.addChild(baccarat_games);

			// === sub header poker
			this.sub_header_poker = new createjs.Shape();
			this.sub_header_poker.name = "sub_poker";
			this.sub_header_poker.graphics.beginFill("#8c1414").drawRect(0,0,280,50);
			this.sub_header_poker.x = 440;
			this.addChild(this.sub_header_poker);

			this.sub_header_poker.active = function (e) {
				e.graphics.clear().beginFill("#771111").drawRect(0,0,270,50);
			}

			this.sub_header_poker.normal = function (e) {
				e.graphics.clear().beginFill("#8c1414").drawRect(0,0,270,50);
			}

			this.sub_header_poker.icon = new createjs.Bitmap("/img/poker_ico.png");
    	this.sub_header_poker.icon.mouseEnabled = false;
			this.sub_header_poker.icon.scaleX = this.sub_header_poker.icon.scaleY = 0.5;

			let poker_games = new createjs.Text(window.language.lobby.texascaps,font,"#fff");

			if(window.language.locale == "zh") {
				poker_games.font  = "bold 25px LatoBold";
				this.sub_header_poker.icon.x = this.sub_header_poker.x + 27;
				this.sub_header_poker.icon.y = this.sub_header_poker.y + 4;

				poker_games.x = this.sub_header_poker.x + 97;
				poker_games.y = this.sub_header_poker.y + 10.5;
			}

			if(window.language.locale == "en") {
				this.sub_header_poker.icon.x = this.sub_header_poker.x + 27;
				this.sub_header_poker.icon.y = this.sub_header_poker.y + 4;

				poker_games.x = this.sub_header_poker.x + 97;
				poker_games.y = this.sub_header_poker.y + 16;
			}
			if(window.language.locale == "jp") {
				this.sub_header_poker.icon.x = this.sub_header_poker.x + 27;
				this.sub_header_poker.icon.y = this.sub_header_poker.y + 4;

				poker_games.x = this.sub_header_poker.x + 97;
				poker_games.y = this.sub_header_poker.y + 16;
			}
			if(window.language.locale == "kr") {
				this.sub_header_poker.icon.x = this.sub_header_poker.x + 55;
				this.sub_header_poker.icon.y = this.sub_header_poker.y + 4;

				poker_games.x = this.sub_header_poker.x + 125                           ;
				poker_games.y = this.sub_header_poker.y + 16;
			}
			// this.sub_header_poker.icon.hitArea = this.sub_header_poker;
			this.addChild(this.sub_header_poker.icon);

      poker_games.mouseEnabled = false;
			poker_games.is_text = true;
			poker_games.m_target = this.sub_header_poker;
			this.addChild(poker_games);

			// === sub header sicbo
			this.sub_header_sicbo = new createjs.Shape();
			this.sub_header_sicbo.name = "sub_sicbo";
			this.sub_header_sicbo.graphics.beginFill("#8c1414").drawRect(0,0,190,50);
			this.sub_header_sicbo.x = 710;
			this.addChild(this.sub_header_sicbo);

			this.sub_header_sicbo.active = function (e) {
				e.graphics.clear().beginFill("#771111").drawRect(0,0,190,50);
			}

			this.sub_header_sicbo.normal = function (e) {
				e.graphics.clear().beginFill("#8c1414").drawRect(0,0,190,50);
			}

			let sicbo_games = new createjs.Text(window.language.lobby.sicbocaps,font,"#fff");
			this.sub_header_sicbo.icon = new createjs.Bitmap("/img/sicbo_ico.png");
      this.sub_header_sicbo.icon.mouseEnabled = false;
			this.sub_header_sicbo.icon.scaleX = this.sub_header_sicbo.icon.scaleY = 0.5;

			if(window.language.locale == "zh") {
				sicbo_games.font = "bold 25px LatoBold";
				this.sub_header_sicbo.icon.x = this.sub_header_sicbo.x + 27;
				this.sub_header_sicbo.icon.y = this.sub_header_sicbo.y + 5.5;

				sicbo_games.x = this.sub_header_sicbo.x + 87;
				sicbo_games.y = this.sub_header_sicbo.y + 10.5;
			}

			if(window.language.locale == "en") {
				this.sub_header_sicbo.icon.x = this.sub_header_sicbo.x + 27;
				this.sub_header_sicbo.icon.y = this.sub_header_sicbo.y + 5.5;

				sicbo_games.x = this.sub_header_sicbo.x + 87;
				sicbo_games.y = this.sub_header_sicbo.y + 16;
			}
			if(window.language.locale == "jp") {
				this.sub_header_sicbo.icon.x = this.sub_header_sicbo.x + 27;
				this.sub_header_sicbo.icon.y = this.sub_header_sicbo.y + 5.5;

				sicbo_games.x = this.sub_header_sicbo.x + 87;
				sicbo_games.y = this.sub_header_sicbo.y + 16;
			}
			if(window.language.locale == "kr") {
				this.sub_header_sicbo.icon.x = this.sub_header_sicbo.x + 26 + 14;
				this.sub_header_sicbo.icon.y = this.sub_header_sicbo.y + 5.5;

				sicbo_games.x = this.sub_header_sicbo.x + 86 + 8;
				sicbo_games.y = this.sub_header_sicbo.y + 16;
			}
			// this.sub_header_sicbo.icon.hitArea = this.sub_header_sicbo;
			this.addChild(this.sub_header_sicbo.icon);

     	sicbo_games.mouseEnabled = false;
			sicbo_games.is_text = true;
			sicbo_games.m_target = this.sub_header_sicbo;
			this.addChild(sicbo_games);

			// === sub header dragon tiger
			this.sub_header_dragonTiger = new createjs.Shape();
			this.sub_header_dragonTiger.name = "sub_dragonTiger";
			this.sub_header_dragonTiger.graphics.beginFill("#8c1414").drawRect(0,0,260,50);
			this.sub_header_dragonTiger.x = 880;
			this.addChild(this.sub_header_dragonTiger);
			this.sub_header_dragonTiger.icon = new createjs.Bitmap("/img/dragontiger_ico.png");
      this.sub_header_dragonTiger.icon.mouseEnabled = false;
			this.sub_header_dragonTiger.icon.scaleX = this.sub_header_dragonTiger.icon.scaleY = 0.5;
			if(window.language.locale == "jp") {
				this.sub_header_dragonTiger.icon.x = this.sub_header_dragonTiger.x + 30;
				this.sub_header_dragonTiger.icon.y = this.sub_header_dragonTiger.y + 5;
			}
			if(window.language.locale == "en") {
				this.sub_header_dragonTiger.icon.x = this.sub_header_dragonTiger.x + 30;
				this.sub_header_dragonTiger.icon.y = this.sub_header_dragonTiger.y + 5;
			}
			if(window.language.locale == "kr" || window.language.locale == "zh") {
				this.sub_header_dragonTiger.icon.x = this.sub_header_dragonTiger.x + 30 + 16;
				this.sub_header_dragonTiger.icon.y = this.sub_header_dragonTiger.y + 5;
			}
			// this.sub_header_dragonTiger.icon.hitArea = this.sub_header_dragonTiger;
			this.addChild(this.sub_header_dragonTiger.icon);

			this.sub_header_dragonTiger.active = function (e) {
				e.graphics.clear().beginFill("#771111").drawRect(0,0,260,50);
			}

			this.sub_header_dragonTiger.normal = function (e) {
				e.graphics.clear().beginFill("#8c1414").drawRect(0,0,260,50);
			}

			let dragon_tiger = new createjs.Text(window.language.lobby.dragontigercaps,font,"#fff");

			if(window.language.locale == "zh") {
					dragon_tiger.font = "bold 25px LatoBold";
					dragon_tiger.x = this.sub_header_dragonTiger.x + 88 + 16;
					dragon_tiger.y = this.sub_header_dragonTiger.y + 10.5;
			}

			if(window.language.locale == "kr") {
					dragon_tiger.x = this.sub_header_dragonTiger.x + 88 + 16;
					dragon_tiger.y = this.sub_header_dragonTiger.y + 16;
			}
			if(window.language.locale == "jp") {
					dragon_tiger.x = this.sub_header_dragonTiger.x + 88;
					dragon_tiger.y = this.sub_header_dragonTiger.y + 16;
			}
			if(window.language.locale == "en") {
					dragon_tiger.x = this.sub_header_dragonTiger.x + 88;
					dragon_tiger.y = this.sub_header_dragonTiger.y + 16;
			}
      dragon_tiger.mouseEnabled = false;
			// dragon_tiger.hitArea = this.sub_header_dragonTiger;
			dragon_tiger.is_text = true;
			dragon_tiger.m_target = this.sub_header_dragonTiger;
			this.addChild(dragon_tiger);

			// === roullete
			// this.sub_header_roullete = new createjs.Shape();
			// this.sub_header_roullete.name = "sub_roullete";
			// this.sub_header_roullete.graphics.beginFill("#8c1414").drawRect(0,0,230,50);
			// this.sub_header_roullete.x = 1080;
			// this.addChild(this.sub_header_roullete);
			// this.sub_header_roullete.icon = new createjs.Bitmap("/img/roulette_ico.png");
   //    this.sub_header_roullete.icon.mouseEnabled = false;
			// this.sub_header_roullete.icon.scaleX = this.sub_header_roullete.icon.scaleY = 0.52;
			// this.sub_header_roullete.icon.x = this.sub_header_roullete.x + 18;
			// this.sub_header_roullete.icon.y = this.sub_header_roullete.y + 4;
			// // this.sub_header_roullete.icon.hitArea = this.sub_header_roullete;
			// this.addChild(this.sub_header_roullete.icon);

			// this.sub_header_roullete.active = function (e) {
			// 	e.graphics.clear().beginFill("#771111").drawRect(0,0,230,50);
			// }

			// this.sub_header_roullete.normal = function (e) {
			// 	e.graphics.clear().beginFill("#8c1414").drawRect(0,0,230,50);
			// }

			// let roullete = new createjs.Text("ROULLETE","20px LatoBold","#fff");
			// roullete.x = this.sub_header_roullete.x + 74;
			// roullete.y = this.sub_header_roullete.y + 16;
   //    roullete.mouseEnabled = false;
			// // roullete.hitArea = this.sub_header_roullete;
			// roullete.is_text = true;
			// roullete.m_target = this.sub_header_roullete;
			// this.addChild(roullete);

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
			this.addChild(this.sub_thumbnailView);

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
			this.addChild(this.sub_listView);

			this.on("mouseover", (e) => {
				$(".container").css('cursor','pointer');
				try {
					e.target.active(e.target);
				} catch (e) {

				}
			});
			this.on("mouseout", (e) => {
				$(".container").css('cursor','default');
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

				this.context.toggleView(e.target.view);

				playSound('click');

				if(e.target.view) {
					this.context.toggleView(e.target.view);
					if(e.target.view == "list") {
						this.context.lobby_baccaratTables.list_view.visible = true;
            			this.context.lobby_scrollbar.togglescrollable(this.context.lobby_baccaratTables.list_view, true);

						this.context.lobby_baccaratTables.thumbnail_view.visible = false;
           				this.context.lobby_scrollbar.togglescrollable(this.context.lobby_baccaratTables.thumbnail_view, false);

						this.context.lobby_liveGames.list_view.visible = true;
            			this.context.lobby_scrollbar.togglescrollable(this.context.lobby_liveGames.list_view, true);

						this.context.lobby_liveGames.thumbnail_view.visible = false;
            			this.context.lobby_scrollbar.togglescrollable(this.context.lobby_liveGames.thumbnail_view, false);


					} else if(e.target.view == "thumbnail") {
						this.context.lobby_baccaratTables.list_view.visible = false;
            			this.context.lobby_scrollbar.togglescrollable(this.context.lobby_baccaratTables.list_view, false);

						this.context.lobby_baccaratTables.thumbnail_view.visible = true;
            			this.context.lobby_scrollbar.togglescrollable(this.context.lobby_baccaratTables.thumbnail_view, true);

						this.context.lobby_liveGames.list_view.visible = false;
            			this.context.lobby_scrollbar.togglescrollable(this.context.lobby_liveGames.list_view, false);

						this.context.lobby_liveGames.thumbnail_view.visible = true;
            			this.context.lobby_scrollbar.togglescrollable(this.context.lobby_liveGames.thumbnail_view, true);

					}
				}
				this.context.toggleView(e.target.name)

				switch(e.target.name) {
					case "sub_baccarat":
						// === make thumbnail as default
						this.sub_thumbnailView.active(this.sub_thumbnailView);
						this.context.lobby_baccaratTables.list_view.visible = false;
						this.context.lobby_baccaratTables.thumbnail_view.visible = true;

						this.context.lobby_liveGames.list_view.visible = false;
						this.context.lobby_liveGames.thumbnail_view.visible = true;

						this.context.lobby_baccaratTables.visible = true;
						this.context.lobby_liveGames.visible = false;
						this.context.lobby_pokerTables.visible = false;
						this.context.lobby_sicboTables.visible = false;
						this.context.lobby_dragonTigerTables.visible = false;
        				this.context.lobby_roulleteTables.visible = false;

						break;
					case "sub_allGames":
						// === make thumbnail as default
						this.sub_thumbnailView.active(this.sub_thumbnailView);
						this.context.lobby_baccaratTables.list_view.visible = false;
						this.context.lobby_baccaratTables.thumbnail_view.visible = true;

						this.context.lobby_liveGames.list_view.visible = false;
						this.context.lobby_liveGames.thumbnail_view.visible = true;
            this.context.lobby_scrollbar.togglescrollable(this.context.lobby_liveGames.thumbnail_view, true);

						this.context.lobby_baccaratTables.visible = false;
						this.context.lobby_liveGames.visible = true;
						this.context.lobby_pokerTables.visible = false;
						this.context.lobby_sicboTables.visible = false;
						this.context.lobby_dragonTigerTables.visible = false;
    				this.context.lobby_roulleteTables.visible = false;

						break;
					case "sub_poker":
						this.context.lobby_baccaratTables.visible = false;
						this.context.lobby_liveGames.visible = false;
						this.context.lobby_pokerTables.visible = true;
						this.context.lobby_sicboTables.visible = false;
						this.context.lobby_dragonTigerTables.visible = false;
        				this.context.lobby_roulleteTables.visible = false;

						break;
					case "sub_sicbo":
						this.context.lobby_baccaratTables.visible = false;
						this.context.lobby_liveGames.visible = false;
						this.context.lobby_pokerTables.visible = false;
						this.context.lobby_sicboTables.visible = true;
						this.context.lobby_dragonTigerTables.visible = false;
        				this.context.lobby_roulleteTables.visible = false;

						break;
					case "sub_dragonTiger":
						this.context.lobby_baccaratTables.visible = false;
						this.context.lobby_liveGames.visible = false;
						this.context.lobby_pokerTables.visible = false;
						this.context.lobby_sicboTables.visible = false;
						this.context.lobby_dragonTigerTables.visible = true;
        				this.context.lobby_roulleteTables.visible = false;
						break;
					case "sub_roullete":
						this.context.lobby_baccaratTables.visible = false;
						this.context.lobby_liveGames.visible = false;
						this.context.lobby_pokerTables.visible = false;
						this.context.lobby_sicboTables.visible = false;
						this.context.lobby_dragonTigerTables.visible = false;
        				this.context.lobby_roulleteTables.visible = true;

						break;
				}
			});
		},

		hideActive()
		{
			this.sub_header_allGames.normal(this.sub_header_allGames);
			this.sub_header_baccarat.normal(this.sub_header_baccarat);
			this.sub_header_sicbo.normal(this.sub_header_sicbo);
			this.sub_header_poker.normal(this.sub_header_poker);
			this.sub_header_dragonTiger.normal(this.sub_header_dragonTiger);

			this.sub_header_allGames.clicked = false;
			this.sub_header_baccarat.clicked = false;
			this.sub_header_sicbo.clicked = false;
			this.sub_header_poker.clicked = false;
			this.sub_header_dragonTiger.clicked = false;
		}
	});

	return instance;
}
