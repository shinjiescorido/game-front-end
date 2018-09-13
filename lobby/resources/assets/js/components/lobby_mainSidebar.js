let instance = null;

export default() => {
	instance = instance || new blu.Component({
		table_games : [],
		theme_games : [],
		reel_games : [],
		main() {

			let route = "/settings";

			let all_Games = [
				{
					"game_name" : "dragon tiger",
					// "icon" : "dragontiger_icon",
					"icon" : "/img/dragontiger_ico.png",
					"src" : "/img/table-games_dt.jpg"
				},
				{
					"game_name" : "baccarat",
					// "icon" : "baccarat_icon",
					"icon" : "/img/baccarat_ico.png",
					"src" : "/img/table-games_baccarat.jpg"
				},
				{
					"game_name" : "texas hold 'em",
					// "icon" : "poker_icon",
					"icon" : "/img/poker_ico.png",
					"src" : "/img/table-games_poker.jpg"
				},
				{
					"game_name" : "sic bo",
					// "icon" : "sicbo_icon",
					"icon" : "/img/sicbo_ico.png",
					"src" : "/img/table-games_sicbo.jpg"
				}
			]

			let all_Games_zh = [
				{
					"game_name" : "dragon tiger",
					"icon" : "/img/dragontiger_ico.png",
					"src" : "/img/zh/table-games_dt.jpg"
				},
				{
					"game_name" : "baccarat",
					"icon" : "/img/baccarat_ico.png",
					"src" : "/img/table-games_baccarat.jpg"
				},
				{
					"game_name" : "texas hold 'em",
					"icon" : "/img/poker_ico.png",
					"src" : "/img/table-games_poker.jpg"
				},
				{
					"game_name" : "sic bo",
					"icon" : "/img/sicbo_ico.png",
					"src" : "/img/table-games_sicbo.jpg"
				}
			]

			this.y = 72;

			let bg = new createjs.Shape();
			bg.graphics.beginFill("#262626").drawRect(0,0,560,1050);
			this.x = this.context.context.width - 560;
			this.addChild(bg);

			let lang  = ["language_chinese", "language_korean","language_japanese","language_english"];
			let langType  = ["chinese", "korea","japan","english"];
			let langspriteSettings = [];
			let lang_sprites = [];
			this.language = [];

			for(var x = 0; x < lang.length; x++) {
				langspriteSettings[x] ={
					images: ["/img/v2_1/language/"+lang[x]+".png"],
					frames: {width:60,height:60},
					animations: {
						"normal": [0],
						"active" : [2]
					}
				}

				lang_sprites[x] = new createjs.SpriteSheet(langspriteSettings[x]);
				this.language[x] = new createjs.Sprite(lang_sprites[x],"normal");
				this.language[x].y = 20;
				this.language[x].x = (x * 50) + 387 - 30;
				this.language[x].scaleY = 0.6;
				this.language[x].scaleX = 0.6;
				this.language[x].lang = langType[x];

				if (langType[x] == config.language) {
					this.language[x].gotoAndStop(2);
				}

				this.language[x].addEventListener("mousedown",(e)=>{
					let chosenLanguageIndex = '';
					e.nativeEvent.preventDefault();
					e.currentTarget.gotoAndStop("active");

					for (var i = 0; i < rawConfig.language.length; i++) {
						if (rawConfig.language[i] == e.currentTarget.lang) {
							chosenLanguageIndex = i;
						}
					}

					//Post to change language
					$.post(route, {language : chosenLanguageIndex}, (response) => {
						location.reload();
					});
				});

				this.language[x].addEventListener("pressup",(e)=>{
					e.nativeEvent.preventDefault();
					e.currentTarget.gotoAndStop(0)
				});

				this.addChild(this.language[x])
			}

			let hot_games_label = new createjs.Text(window.language.lobby.livegamescaps, "bold 24px ArvoBold", "#fbb649");
			hot_games_label.x = 30;
			hot_games_label.y = 30;
			this.addChild(hot_games_label);

			if(window.language.locale == "zh") {
					hot_games_label.y = 27;
					hot_games_label.font = "bold 30px ArvoBold";
			}

			this.drawTableGames(window.language.locale == "zh" ? all_Games_zh : all_Games);

			// === themed games
			let theme_games_label = new createjs.Text(window.language.lobby.themedgamescaps, "bold 24px ArvoBold", "#fbb649");
			theme_games_label.x = 30;
			theme_games_label.y = 475;
			this.addChild(theme_games_label);

			if(window.language.locale == "zh") {
					theme_games_label.y = 471;
					theme_games_label.font = "bold 30px ArvoBold";
			}

			let theme_games = [
				{
					"game_name" : "Pula Puti",
					"icon" : "poker_icon",
					"src" : "/img/themed-games_red.jpg"
				},
				{
					"game_name" : "Big Wheel",
					"icon" : "sicbo_icon",
					"src" : "/img/themed-games_spin.jpg"
				}
			]

			let theme_games_zh = [
				{
					"game_name" : "Pula Puti",
					"icon" : "poker_icon",
					"src" : "/img/zh/themed-games_red.jpg"
				},
				{
					"game_name" : "Big Wheel",
					"icon" : "sicbo_icon",
					"src" : "/img/zh/themed-games_spin.jpg"
				}
			]

			this.drawThemedGames(window.language.locale == "zh" ? theme_games_zh : theme_games);

			// === reel games
			let reel_games_label = new createjs.Text(window.language.lobby.reelgamescaps, "bold 24px ArvoBold", "#fbb649");
			reel_games_label.x = 30;
			reel_games_label.y = 720;
			this.addChild(reel_games_label);

			if(window.language.locale == "zh") {
					reel_games_label.y = 716;
					reel_games_label.font = "bold 30px ArvoBold";
			}

			// if(window.language.locale == "zh") {
			// 		hot_games_label.font = "bold 30px ArvoBold";
			// 		theme_games_label.font = "bold 30px ArvoBold";
			// 		reel_games_label.font = "bold 30px ArvoBold";
			// }

			let reelgames_data = [
				{
					"game_name" : "KA Gaming Reel",
					"icon" : "KA Gaming icon",
					"src" : "/img/reel-games_ka.jpg"
				},
				{
					"game_name" : "Betsoft Reel",
					"icon" : "sicbo_icon",
					"src" : "/img/reel-games_bet.jpg"
				}
			]

			let reelgames_data_zh = [
				{
					"game_name" : "KA Gaming Reel",
					"icon" : "KA Gaming icon",
					"src" : "/img/zh/reel-games_ka.jpg"
				},
				{
					"game_name" : "Betsoft Reel",
					"icon" : "sicbo_icon",
					"src" : "/img/zh/reel-games_bet.jpg"
				}
			]

			this.drawReelGames(window.language.locale == "zh" ? reelgames_data_zh : reelgames_data);

			//라이센스
			let img_license ='/img/pagcor_license.jpg';
			let pagcor_license = new createjs.Bitmap(img_license);
			pagcor_license.x = 0;
			pagcor_license.y = 973;
			this.addChild(pagcor_license);

			let newDate = null;
			let textDate = new createjs.Text(moment().format('MMMM Do YYYY, h:mm:ss a'), "19px bebasNeue","#acacac");

			let callDate = function () {
				setTimeout(() => {
					newDate = moment().format('MMMM Do YYYY, h:mm:ss a');
					textDate.text = newDate;
					callDate()
				},1000)
			}

			callDate();

			textDate.textBaseline = "middle"
			textDate.y = pagcor_license.y  + 19;
			textDate.x = pagcor_license.x + 292 + 34;
			this.addChild(textDate);

		},
		drawTableGames (data) {
			for(var x = 0; x < data.length; x++) {
				this.table_games[x] = new createjs.Bitmap(data[x].src);
				this.table_games[x].setBounds(0,0,245,186);
				this.table_games[x].x = (x * (this.table_games[x].getBounds().width+10)) + 30;
				this.table_games[x].y = 68;

				if(x > 1){
					this.table_games[x].x = ((x-2) * (this.table_games[x].getBounds().width+10)) + 30;
					this.table_games[x].y = this.table_games[x].getBounds().height + 80;
				}

				this.addChild(this.table_games[x]);

				let gameStr = '';
				let toggleView = '';

				switch(data[x].game_name) {
					case "baccarat":
						gameStr = window.language.lobby.baccaratcaps;
						toggleView = 'sub_baccarat';
					//	taget = this.context.lobby_hotGamesSideBar.sub_header_baccarat;
						break;

					case "dragon tiger":
						gameStr = window.language.lobby.dragontigercaps;
						toggleView = 'sub_dragonTiger';
					//	taget = this.context.lobby_hotGamesSideBar.sub_header_dragonTiger;
						break;

					case "sic bo":
						gameStr = window.language.lobby.sicbocaps;
						toggleView = 'sub_sicbo';
					//	taget = this.context.lobby_hotGamesSideBar.sub_header_sicbo;
						break;

					case "texas hold 'em":
						gameStr = window.language.lobby.texascaps;
						toggleView = 'sub_poker';
					//	taget = this.context.lobby_hotGamesSideBar.sub_header_poker;
						break;

				}
				this.table_games[x].name = toggleView;
				this.table_games[x].table_name = new createjs.Text(gameStr,"24px ArvoRegular","#000");
				this.table_games[x].table_name.x = this.table_games[x].x + (this.table_games[x].getBounds().width/2);
				this.table_games[x].table_name.y = this.table_games[x].y + 154;
				this.table_games[x].table_name.textBaseline = "middle";
				this.table_games[x].table_name.textAlign = "center";
				this.addChild(this.table_games[x].table_name);
				this.table_games[x].cursor = "pointer";

				if(window.language.locale == "zh") {
						this.table_games[x].table_name.font = "30px ArvoRegular";
				}

				this.table_games[x].on("click", (e) => {

				if(!e.target.name) return;

				this.context.lobby_liveGames_subHeader.children.forEach((child)=>{
					child.clicked = false;
					try {
						child.normal(child)
					}
					catch(err) {

					}
				});

				this.visible = false;
				this.context.lobby_liveGames_subHeader.visible = true;
				this.context.lobby_hotGamesSideBar.visible = true;
				this.context.lobby_banner.visible = true;

				this.context.toggleView("thumbnail");
				this.context.toggleView(e.target.name);
			//	this.context.lobby_liveGames_subHeader.thumbnail_view.alpha = 1;

				switch(e.target.name) {
					case "sub_baccarat":
						// === make thumbnail as default

						this.context.lobby_baccaratTables.list_view.visible = false;
						this.context.lobby_baccaratTables.thumbnail_view.visible = true;
        				this.context.lobby_scrollbar.togglescrollable(this.context.lobby_baccaratTables.thumbnail_view, true);

						this.context.lobby_liveGames.list_view.visible = false;
						this.context.lobby_liveGames.thumbnail_view.visible = true;
        				this.context.lobby_scrollbar.togglescrollable(this.context.lobby_liveGames.thumbnail_view, true);

						this.context.lobby_baccaratTables.visible = true;
						this.context.lobby_liveGames.visible = false;
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

			}
		},
		drawThemedGames(data) {
			for(var x = 0; x < data.length; x++) {

				this.theme_games[x] = new createjs.Bitmap(data[x].src);
				this.theme_games[x].setBounds(0,0,245,186);
				this.theme_games[x].x = (x*(this.theme_games[x].getBounds().width+10)) + 30;
				this.theme_games[x].y = 510;
				this.addChild(this.theme_games[x]);

				let gameStr = '';
				let toggleView = '';

				switch(data[x].game_name) {
					case "Pula Puti":
						gameStr = window.language.lobby.redwhitecaps;
						toggleView = 'sub_baccarat';
						break;

					case "Big Wheel":
						gameStr = window.language.lobby.spinwincaps;
						toggleView = 'sub_dragonTiger';
						break;
				}


				this.theme_games[x].table_name = new createjs.Text(gameStr,"24px ArvoRegular","#ffca7d");
				this.theme_games[x].table_name.x = this.theme_games[x].x + (this.theme_games[x].getBounds().width/2);
				this.theme_games[x].table_name.y = this.theme_games[x].y + 156;
				this.theme_games[x].table_name.textBaseline = "middle";
				this.theme_games[x].table_name.textAlign = "center";
				this.addChild(this.theme_games[x].table_name);
				this.theme_games[x].cursor = "pointer";

				if(window.language.locale == "zh") {
						this.theme_games[x].table_name.font = "30px ArvoRegular";
				}

				this.theme_games[x].on("click", (e) => {
					//- link
				});

			}//end for
		},
		drawReelGames (data) {
			for(var x = 0; x < data.length; x++) {

				this.reel_games[x] = new createjs.Bitmap(data[x].src);
				this.reel_games[x].setBounds(0,0,245,186);
				this.reel_games[x].x = (x*(this.reel_games[x].getBounds().width+10)) + 30;
				this.reel_games[x].y = 755;
				this.reel_games[x].name = "reel_games";
				this.addChild(this.reel_games[x]);

				this.reel_games[x].on("click", (e)=> {
						if(e.target.id == 159) {
							this.context.toggleView("reel_games");
							this.context.lobby_reelGames.toggleView("kagaming");
							this.context.lobby_reelGames.subheader_con.children[4].graphics.clear().beginFill("#d06900").drawRect(0, 0, 220, 50);
							this.context.lobby_reelGames.subheader_con.children[0].graphics.clear().beginFill("#f57c00").drawRect(0, 0, 220, 50);
						}
				});

				let gameStr = '';
				let toggleView = '';

				switch(data[x].game_name) {
					case "KA Gaming Reel":
						gameStr = window.language.lobby.kagamingreelcaps;
						toggleView = 'sub_baccarat';
						break;

					case "Betsoft Reel":
						gameStr = window.language.lobby.betsoftreelcaps;
						toggleView = 'sub_dragonTiger';
						break;
				}


				this.reel_games[x].table_name = new createjs.Text(gameStr,"24px ArvoRegular","#ffca7d");
				this.reel_games[x].table_name.x = this.reel_games[x].x + (this.reel_games[x].getBounds().width/2);
				this.reel_games[x].table_name.y = this.reel_games[x].y + 154;
				this.reel_games[x].table_name.textBaseline = "middle";
				this.reel_games[x].table_name.textAlign = "center";
				this.addChild(this.reel_games[x].table_name);

				this.reel_games[x].cursor = "pointer";
				this.reel_games[x].on("click", (e) => {
					//- link
					//this.context.toggleView(e.target.name);
				});

			}//end for

		}
	});

	return instance;
}
