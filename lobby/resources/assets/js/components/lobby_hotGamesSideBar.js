let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {

			this.y = 72;
			this.x =  this.context.context.width - this.context.body_bg_width;

			let bg = new createjs.Shape();
			bg.graphics.beginFill("#262626").drawRect(0,0,this.context.body_bg_width,1050);
			bg.cache(0,0,this.context.body_bg_width,1050);
			this.addChild(bg);

			this.visible = false;

			let hot_games_label = new createjs.Text(window.language.lobby.hotgamescaps, "bold 24px arvoitalic","#daa042");
			hot_games_label.y = 30;
			hot_games_label.x = 115;
			hot_games_label.textAlign = 'center';
			this.addChild(hot_games_label);

			if(window.language.locale == "zh") {
					hot_games_label.font = "bold 30px arvoitalic";
			}

			let kaGames = [
				{
					"game_name" : "Betsoft Reel",
					"src" : "/img/hot_banner/betsoft-hotgame.png",
				},
				{
					"game_name" : "KA Gaming Reel",
					"src" : "/img/hot_banner/ka-hotgame.png",
				}
			]

			let kaGames_zh = [
				{
					"game_name" : "KA Gaming reel",
					"src" : "/img/hot_banner/ka-hotgame_zh.png",
				},
				{
					"game_name" : "KA Gaming Reel",
					"src" : "/img/hot_banner/ka-hotgame.png",
				}
			]

			let timeout = setInterval(() => {
				if(this.context.data_flag) {
					this.drawReelGames(window.language.locale == "zh" ? kaGames_zh : kaGames);
					clearInterval(timeout)
				}
			}, 1000)

/*
			let pagcor_bar = new createjs.Shape();
			pagcor_bar.graphics.beginFill("#fff").drawRect(0,0,280,110);
			this.addChild(pagcor_bar);
			pagcor_bar.y = 1050-110;

			let pagcor_bar2 = new createjs.Shape();
			pagcor_bar2.graphics.beginFill("#ffb94a").drawRect(0,0,480,200);
			pagcor_bar2.mask = pagcor_bar;
			pagcor_bar2.rotation = 30;
			pagcor_bar2.y = 880;
			pagcor_bar2.x = 160;
			this.addChild(pagcor_bar2);
*/
			let time_bar = new createjs.Shape();
			time_bar.graphics.beginFill("#1f2022").drawRect(0,0,500,40);
			time_bar.y = 900;
			this.addChild(time_bar);

			let newDate = null;

			let textDate = new createjs.Text(moment().format('MMMM Do YYYY, h:mm:ss a'), "18px bebasNeue","#acacac");

			let callDate = function () {
				setTimeout(() => {
					newDate = moment().format('MMMM Do YYYY, h:mm:ss a');
					textDate.text = newDate;
					callDate()
				},1000)
			}

			callDate();

			textDate.textBaseline = "middle"
			textDate.y = time_bar.y  + 20;
			textDate.x = time_bar.x + 16 + 12;
			this.addChild(textDate);

			this.logo_image = new createjs.Bitmap("/img/hot_banner/logo.png");
			this.logo_image.x = 0;
			this.logo_image.y = 935;
			this.addChild(this.logo_image)

		},
		createHotGames(data) {
			for(var x = 0; x < data.length; x++) {
				// let img = new Image();
				// img.src = data.tableImage;
				//
				let hotgames_img = null;
				if(data[x].gameName.indexOf("icbo") > -1) {
					hotgames_img = new createjs.Bitmap("/img/hot_banner/sicbo-hotgame.png");
					hotgames_img.name = "sub_sicbo";
				} else if(data[x].gameName.indexOf("accarat") >-1) {
					hotgames_img = new createjs.Bitmap("/img/hot_banner/baccarat-hotgame.png");
					hotgames_img.name = "sub_baccarat";
				} else if(data[x].gameName.indexOf("oker") >-1) {
					hotgames_img = new createjs.Bitmap("/img/hot_banner/poker-hotgame.png");
					hotgames_img.name = "sub_poker";
				} else if(data[x].gameName.indexOf("iger") >-1) {
					hotgames_img = new createjs.Bitmap(window.language.locale == "zh" ? "/img/zh/dragontiger-hotgame.png" : "/img/hot_banner/dragontiger-hotgame.png");
					hotgames_img.name = "sub_dragonTiger";
				}


				// image.crossOrigin = "Anonymous";
				// image.src = data[x].tableImage;
				// let hotgames_img = new createjs.Bitmap(image);
		//		hotgames_img.scaleX = 0.38
		//		hotgames_img.scaleY = 0.38
				hotgames_img.y = (x*135) + 80;
				hotgames_img.x = 15;
				this.addChild(hotgames_img);

				let gameStr = '';
				switch(data[x].gameName) {
					case "Baccarat":
						gameStr = window.language.lobby.baccarat;
						break;

					case "Dragon-Tiger":
						gameStr = window.language.lobby.dragontiger;
						break;

					case "Sicbo":
						gameStr = window.language.lobby.sicbo;
						break;

					case "Poker":
						gameStr = window.language.lobby.texas;
						break;
				}

				let gameName = new createjs.Text(gameStr,"18px lato","#fff")
				gameName.y = hotgames_img.y + 105;
				gameName.x = 15;

				if(window.language.locale == "zh") {
						gameName.font = "23px lato"
				}

				hotgames_img.addEventListener("click", (e) => {
					this.context.toggleView(e.target.name);
				});

				this.addChild(gameName);

			}
		},
		drawReelGames (data) {

			let reelgames = [];
			for(var x = 0 ; x < data.length; x++) {
				/*
				let img = new Image();
				img.src = "/img/hot_banner/"+data[x]+".png";
				*/
				reelgames[x] = new createjs.Bitmap(data[x].src);
				reelgames[x].y = (x+this.context.hot_live_games.length)*135 + 80;
				reelgames[x].x = 15;
				reelgames[x].name = "reel_games";
				this.addChild(reelgames[x]);

				reelgames[x].on("click", ()=>{
						this.context.toggleView("reel_games");
						this.context.lobby_reelGames.toggleView("kagaming");
						this.context.lobby_reelGames.subheader_con.children[4].graphics.clear().beginFill("#d06900").drawRect(0, 0, 220, 50);
						this.context.lobby_reelGames.subheader_con.children[0].graphics.clear().beginFill("#f57c00").drawRect(0, 0, 220, 50);
				});

				this.on("click", (e) => {

					//this.context.toggleView(e.target.name);
					// alert()
				//   if(e.target.name.indexOf("thumbnail") > -1) {
				//     this.normalSubHead();
				//   } else {
				//     this.context.lobby_header.normalMainHead();
				//   }
				//   this.context.toggleView(e.target.name);
				//   e.target.active(e.target);
				//   e.target.clicked = true;

				//   if(e.target.name == "live_games") {
				//     this.context.lobby_banner.visible = true;
				//   } else if(e.target.name == "themed_games" || e.target.name == "reel_games"){
				//     this.context.lobby_banner.visible = false;
				//   }
				  // this.updateCache()
				});

				// reelgames[x].addEventListener("click", () => {
				// 		this.context.toggleView("reel_games");
				// 		this.reel_games_header.active(this.reel_games_header);
				// 		this.reel_games_header.clicked = true;
				// });

				let gameStr = '';
				switch(data[x].game_name) {
					case "KA Gaming reel":
						gameStr = window.language.lobby.kagamingreel;
						break;
					case "Betsoft Reel":
						gameStr = window.language.lobby.betsoftreelcaps;
						break;
				}

				let gameName = new createjs.Text(gameStr,"18px lato","#fff");
				gameName.y = reelgames[x].y + 105;
				gameName.x = 15;
				this.addChild(gameName);

			}
		}
	});

	return instance;
}
