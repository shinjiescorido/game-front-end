let instance = null;

export default() => {
	instance = instance || new blu.Component({
		ads : [],
		circle_indicator : [],
		main() {

			popupSettings = new createjs.Stage("popupSettings");
			this.container = new createjs.Container();
			this.container.visible = false;
			popupSettings.addChild(this.container)
			popupSettings.enableMouseOver(10);
			this.addEventListener("mousedown", (e) => {
				return;
	        });

			let popup_bg = new createjs.Shape();
			popup_bg.graphics.ss(2).s("#5d5d5d").beginFill("#2b2b2b").drawRect(10,0,340,540); //.drawRect(10,0,340,540)

			let arrow = new createjs.Shape();
			arrow.graphics.ss(2).s("#5d5d5d").beginFill("#2b2b2b").drawRect(0,0,40,40);
			arrow.x = 290
			arrow.y = -20
			arrow.rotation = 45;

			let arrow_mask = new createjs.Shape();
			arrow_mask.graphics.beginFill("red").drawRect(0,0,100,50);
			arrow_mask.x = arrow.x - 50;
			arrow_mask.y = -48;
			arrow.mask = arrow_mask;

			let route = "/settings";

			this.visible = false;
			this.addChild(popup_bg);
			// this.addChild(popup_bg);
			this.container.addChild(popup_bg);
			this.container.addChild(arrow);
			// this.addChild(arrow);
			this.container.x = 1250
			// this.x = 1250

			this.container.y = -150;
			// this.y = -150;
			let label = new createjs.Text(window.language.menu.settingscaps,"24px latobold","#fff");
			// this.addChild(label);
			this.container.addChild(label);
			label.x = 35
			label.y = 30

			//Init volume mute spritesheet
			let img = new Image();
			img.src = "/img/v2_1/icons/menu/dark/mute_icon.png";

			let volumemute_spritesheet_data = {
				images: [img],
				frames: {width:21,height:20},
				animations: {
					"mute": [0],
					"normal" : [1]
				}
			}

			let disabledX = 0;
			let enabledX = 0;

			let volume_mute_spritesheet = new createjs.SpriteSheet(volumemute_spritesheet_data);
			this.volumeMute = new createjs.Sprite(volume_mute_spritesheet,"normal");
			this.volumeMute.x = 35;
			this.volumeMute.y = 100;
			this.volumeMute.scaleX =  this.volumeMute.scaleY = 1
			this.volumeMute.cursor =  "pointer";
			this.volumeMute.status =  "normal";

			this.container.addChild(this.volumeMute)
			// this.addChild(this.volumeMute)

			//Init volume max spritesheet
			let volumemax_spritesheet_data = {
				images: ["/img/v2_1/icons/menu/dark/loud_icon.png"],
				frames: {width:24,height:20},
				animations: {
					"normal": [0],
					"mute" : [1]
				}
			}

			let volume_max_spritesheet = new createjs.SpriteSheet(volumemax_spritesheet_data);
			this.volumeMax = new createjs.Sprite(volume_max_spritesheet,"normal");
			this.volumeMax.x = this.volumeMute.x + 250;
			this.volumeMax.y = this.volumeMute.y;
			this.volumeMax.scaleY = this.volumeMax.scaleX = 1
			this.volumeMax.cursor = "pointer";
			this.volumeMax.status = "normal";

			// this.addChild(this.volumeMax);
			this.container.addChild(this.volumeMax);

			//Volume line bg
			this.volumeBg = new createjs.Shape();
			this.volumeBg.graphics.beginFill("#1d1d1d").drawRoundRect(0, 0, 200, 8, 4);
			this.volumeBg.x = this.volumeMute.x + 30;
			this.volumeBg.y = this.volumeMute.y + 8;
			this.volumeBg.setBounds(0, 0, 200, 20);

			this.default_vol = 200;
			let saved_vol = this.default_vol * parseFloat(window.config.volume);

			//Volume line bg
			this.volumeCurrent = new createjs.Shape();
			this.volumeCurrent.graphics.beginFill("#7cb342").drawRoundRect(0, 0, saved_vol, 8, 4);
			this.volumeCurrent.x = this.volumeMute.x + 30;
			this.volumeCurrent.y = this.volumeMute.y + 8;
			this.volumeCurrent.setBounds(0, 0, saved_vol, 5);

			this.volumeCircle = new createjs.Shape();
			this.volumeCircle.graphics.beginFill("#2e7d32").drawCircle(0, 0, 10);
			this.volumeCircle.x = this.volumeCurrent.x + saved_vol - 5;
			this.volumeCircle.y = this.volumeMute.y + 11;
			this.volumeCircle.cursor = "pointer";

			this.container.addChild(this.volumeBg, this.volumeCurrent,this.volumeCircle)
			// this.addChild(this.volumeBg, this.volumeCurrent,this.volumeCircle)

			let newVolume = "";
			let lblsettingsY = 0;
			let settingsName = [];
			let settingsToggle = [];
			let settingsCircle = [];
			let settingsToggleHit = [];
			let color = [];
			// let lblSettingsArr = [window.language.menu.soundeffects, window.language.menu.voice, window.language.menu.darktheme];
			// let lblSettingsName = ["Sound Effects", "Voice", "Dark Theme"];
			let lblSettingsArr = [window.language.menu.soundeffects, window.language.menu.voice, window.language.menu.darktheme, window.language.menu.showtutorial];
			let lblSettingsName = ["Sound Effects", "Voice", "Dark Theme", "Show Tutorial"];
			//Drag volume event
			this.pos = saved_vol == 0 ? 65 : 0;
			this.lastPos = 0;

			this.volumeCircle.on("pressmove", (evt) => {
				// evt.nativeEvent.preventDefault();
				this.lastPos = this.pos;

				if(evt.currentTarget.x <= 0) return;

				let mouseCoor = this.container.globalToLocal(evt.stageX, evt.stageY)
				let volumeStart = this.volumeBg.x;
				let volumeEnd = this.volumeBg.x + this.volumeBg.getBounds().width;

				this.pos = mouseCoor.x <= 65 ? 65 : mouseCoor.x;
				evt.currentTarget.x = mouseCoor.x;
				if(this.pos > 265.8939179632249) {
					this.pos = 265;
				}

				if(this.pos <= 0) {
					this.pos = 0;
				}

				if(this.pos == 65 )
				{
					disableSetting(settingsToggleHit[0]);
					disableSetting(settingsToggleHit[1]);
					this.lastPos = this.pos;
				}
				else if(this.lastPos == 65)
				{
					enableSetting(settingsToggleHit[0]);
					enableSetting(settingsToggleHit[1]);
				}

				this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, this.pos > 0 ? this.pos-60 : 0 ,  8, 4);
				this.volumeCurrent.setBounds(0, 0, this.pos > 0 ? this.pos-60 : 0, 20);

				// if (evt.currentTarget.x >= volumeStart && evt.currentTarget.x <= volumeEnd) {
				// 	newVolume = evt.currentTarget.x - 65;
				// 	this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, newVolume, 8, 4);
				// 	this.volumeCurrent.setBounds(0, 0, newVolume, 8);
				// }

				//Start and end points of volume
				if(evt.currentTarget.x <= volumeStart) {
					evt.currentTarget.x = volumeStart;
					this.volumeMute.gotoAndStop("mute");
					this.volumeMax.gotoAndStop("mute");
				}else if(evt.currentTarget.x >= volumeEnd){
					evt.currentTarget.x = volumeEnd;
				}

				if (evt.currentTarget.x > volumeStart) {
					this.volumeMute.gotoAndStop("normal");
					this.volumeMax.gotoAndStop("normal");
				}

			});

			this.volumeCircle.on("pressup",()=> {

				if(this.pos > 265.8939179632249) {
					this.pos = 265;
				}
				this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, this.pos > 0 ? this.pos-60 : 0 ,  8, 4);
				this.volumeCurrent.setBounds(0, 0, this.pos > 0 ? this.pos-60 : 0, 20);

				let number = this.volumeCurrent.getBounds().width/this.default_vol;
				let vol = Math.round( number * 10 ) / 10;

				$.post(route, {volume : vol}, (response) => {

				});
			});

				//Mute volume button click event
			this.volumeMute.addEventListener("mousedown", (e) => {
				e.nativeEvent.preventDefault();
	        	newVolume = 0;
	        	this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, newVolume, 8, 4);
	        	this.volumeCircle.x = this.volumeCurrent.x;
				this.volumeMute.gotoAndStop("mute");
				this.volumeMax.gotoAndStop("mute");

				$.post(route, {volume : newVolume}, (response) => {

				});
	        });

			//Max volume button click event
	        this.volumeMax.addEventListener("mousedown", (e) => {
				e.nativeEvent.preventDefault();
	        	newVolume = 200;
	        	this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, newVolume, 8, 4);
	        	this.volumeCircle.x = this.volumeCurrent.x + newVolume;
				this.volumeMute.gotoAndStop("normal");
				this.volumeMax.gotoAndStop("normal");

				$.post(route, {volume : 1}, (response) => {

				});
	        });

	        // ========
	        //
	        lblsettingsY = this.volumeMax.y + 50;
			for (var i = 0; i < lblSettingsArr.length; i++) {

				settingsToggleHit[i] = new createjs.Shape();

				settingsToggleHit[i].settingsName = new createjs.Text(lblSettingsArr[i],"bold 18px lato", "#838383");

				// if(i > 1) {
				// 	settingsToggleHit[i].settingsName.color = "#545454"
				// }
				settingsToggleHit[i].settingsName.x = this.volumeMute.x + 20;
				settingsToggleHit[i].settingsName.y = lblsettingsY;

				if(window.language.locale == "zh") {
							settingsToggleHit[i].settingsName.font  = "bold 23px lato";
							settingsToggleHit[i].settingsName.y = lblsettingsY - 10;
				}

				settingsToggleHit[i].settingsToggle = new createjs.Shape();
				settingsToggleHit[i].settingsToggle.graphics.beginFill("#fff").drawRoundRect(0, 0, 65, 25, 13);
				// if(i>1) {
				// 	settingsToggleHit[i].settingsToggle.graphics.clear().beginFill("#4c4c4c").drawRoundRect(0, 0, 65, 25, 13);
				// }
				settingsToggleHit[i].settingsToggle.x = this.volumeMax.x - 40;
				settingsToggleHit[i].settingsToggle.y = lblsettingsY - 3;

				settingsToggleHit[i].settingsCircle = new createjs.Shape();
				settingsToggleHit[i].settingsCircle.graphics.beginFill("#2e7d32").drawCircle(0, 0, 10);
				// if(i>1) {
				// 	settingsToggleHit[i].settingsCircle.graphics.clear().beginFill("#0f3a11").drawCircle(0, 0, 10);
				// }
				settingsToggleHit[i].settingsCircle.x = settingsToggleHit[i].settingsToggle.x + 65 - 16;
				settingsToggleHit[i].settingsCircle.y = settingsToggleHit[i].settingsToggle.y + 12;

				enabledX = settingsToggleHit[i].settingsCircle.x;
				disabledX = settingsToggleHit[i].settingsCircle.x - 35;

				settingsToggleHit[i].graphics.beginFill("#000").drawRoundRect(0, 0, 65, 25, 16);
				settingsToggleHit[i].x = this.volumeMax.x - 40;
				settingsToggleHit[i].y = lblsettingsY - 3;
				settingsToggleHit[i].cursor = "pointer";
				settingsToggleHit[i].status = "enabled";
				settingsToggleHit[i].alpha = "0.01";
				settingsToggleHit[i].name = lblSettingsName[i];

				//setting default

				if(!parseInt(window.config.voice) && settingsToggleHit[i].name.toLowerCase() == "voice") {
					settingsToggleHit[i].settingsToggle.graphics.clear().beginFill("#424242").drawRoundRect(0, 0, 65, 25, 13);
					settingsToggleHit[i].settingsCircle.graphics.clear().beginFill("#c62828").drawCircle(0, 0, 10);
					settingsToggleHit[i].status = "disabled";

			        createjs.Tween.get(settingsToggleHit[i].settingsCircle, { loop: false })
					.to({ x: settingsToggleHit[i].settingsCircle.x - 35 }, 100)
				}

				if(!parseInt(window.config.effect) && settingsToggleHit[i].name.toLowerCase() == "sound effects") {
					settingsToggleHit[i].settingsToggle.graphics.clear().beginFill("#424242").drawRoundRect(0, 0, 65, 25, 13);
					settingsToggleHit[i].settingsCircle.graphics.clear().beginFill("#c62828").drawCircle(0, 0, 10);
					settingsToggleHit[i].status = "disabled";


			        createjs.Tween.get(settingsToggleHit[i].settingsCircle, { loop: false })
					.to({ x: settingsToggleHit[i].settingsCircle.x - 35 }, 100)
				}

				if(window.config.screen == "white" && settingsToggleHit[i].name.toLowerCase() == "dark theme") {
					settingsToggleHit[i].settingsToggle.graphics.clear().beginFill("#424242").drawRoundRect(0, 0, 65, 25, 14);
					settingsToggleHit[i].settingsCircle.graphics.clear().beginFill("#c62828").drawCircle(0, 0, 10);
					settingsToggleHit[i].status = "disabled";

			        createjs.Tween.get(settingsToggleHit[i].settingsCircle, { loop: false })
					.to({ x: settingsToggleHit[i].settingsCircle.x - 35 }, 100)
				}

				if(!window.tutorial_enabled && settingsToggleHit[i].name.toLowerCase() == "show tutorial") {
					settingsToggleHit[i].settingsToggle.graphics.clear().beginFill("#424242").drawRoundRect(0, 0, 65, 25, 14);
					settingsToggleHit[i].settingsCircle.graphics.clear().beginFill("#c62828").drawCircle(0, 0, 10);
					settingsToggleHit[i].status = "disabled";

			        createjs.Tween.get(settingsToggleHit[i].settingsCircle, { loop: false })
					.to({ x: settingsToggleHit[i].settingsCircle.x - 35 }, 100)
				}

				lblsettingsY = lblsettingsY + 50;
				this.container.addChild(settingsToggleHit[i].settingsName, settingsToggleHit[i].settingsToggle, settingsToggleHit[i].settingsCircle, settingsToggleHit[i]);
				// this.addChild(settingsToggleHit[i].settingsName, settingsToggleHit[i].settingsToggle, settingsToggleHit[i].settingsCircle, settingsToggleHit[i]);

		       settingsToggleHit[i].addEventListener("click", (e) => {
		        	if(e.currentTarget.status == "enabled"){
						disableSetting(e.currentTarget);

					} // end if

					else if(e.currentTarget.status == "disabled"){
						enableSetting(e.currentTarget);

					} // end of else if
		        }); // end of click event register

			}	// end of loop

			function disableSetting(setting)
			{
				if(setting.status == "disabled") return;
				createjs.Tween.get(setting.settingsCircle, { loop: false })
					  .to({ x: disabledX }, 100)

					  setting.settingsToggle.graphics.clear().beginFill("#3f3f3f").drawRoundRect(0, 0, 65, 25, 13);
					  setting.settingsCircle.graphics.clear().beginFill("#c62828").drawCircle(0, 0, 10);
					  setting.status = "disabled";

				if(setting.name.toLowerCase() == "voice") {
					// this.controllermute(1);
					$.post(route, {voice : 0}, (response) => {

					});
				}

				if(setting.name.toLowerCase() == "sound effects") {
					$.post(route, {effect : 0}, (response) => {
						config.effect = '0';
					});
				}

				if(setting.name == "Dark Theme") {
					window.theme = "white";
					$.post(route, {screen : 1}, (response) => {

					});
				}

				if (setting.name ==  "Show Tutorial") {
					$.post(route, {tutorial : false}, (response) => {
						
					});
				}
			}

			function enableSetting(setting)
			{
				if(setting.status == "enabled") return;
				createjs.Tween.get(setting.settingsCircle, { loop: false })
					  .to({ x: enabledX }, 100)

				setting.settingsToggle.graphics.clear().beginFill("#fff").drawRoundRect(0, 0, 65, 25, 13);
				setting.settingsCircle.graphics.clear().beginFill("#2e7d32").drawCircle(0, 0, 10);
				setting.status = "enabled";

				if(setting.name.toLowerCase() == "voice") {
					// this.controllermute(0);
					$.post(route, {voice : 1}, (response) => {

					});
				}

				if(setting.name.toLowerCase() == "sound effects") {
					$.post(route, {effect : 1}, (response) => {
						config.effect = '0';
					});
				}

				if(setting.name == "Dark Theme") {
					window.theme = "black";
					$.post(route, {screen : 1}, (response) => {

					});
				}

				if (setting.name ==  "Show Tutorial") {
					$.post(route, {tutorial : true}, (response) => {
						
					});
				}
			}


			let acc_label = new createjs.Text(window.language.lobby.account,"20px latobold","#fff");
			acc_label.x = label.x;
			acc_label.y = label.y +  305;
			this.container.addChild(acc_label);
			// this.addChild(acc_label);

			if(window.language.locale == "zh") {
						acc_label.font = "25px latobold";
						acc_label.y = label.y +  285;
			}

			let avatars  = ["avatar_blackjack","avatar_blackjoker","avatar_blackking","avatar_blackqueen","avatar_redjack","avatar_redjoker","avatar_redking","avatar_redqueen"];
			let avatarname  = ["blue_jack","blue_joker","blue_king","blue_queen","red_jack","red_joker","red_king","red_queen"];
			let spriteSettings = [];
			let avatar_sprites = [];
			this.user_avatars = [];

			let ycount = 0;
			let xcount = 0;

			//lang
			let avatar_label = new createjs.Text(window.language.lobby.avatar,"bold 18px lato","#7f7f7f");
			avatar_label.x = acc_label.x +20;
			avatar_label.y = acc_label.y  + 32;
			this.container.addChild(avatar_label);
			// this.addChild(avatar_label);

			if(window.language.locale == "zh") {
						avatar_label.font = "bold 23px lato";
						avatar_label.y = acc_label.y  + 37;
			}

			for(var x = 0; x < avatars.length; x++) {
				xcount++;

				spriteSettings[x] ={
					images: ["/img/v2_1/avatars/"+avatars[x]+".png"],
					frames: {width:100,height:100},
					animations: {
						"normal": [0],
						"active" : [2]
					}
				}

				avatar_sprites[x] = new createjs.SpriteSheet(spriteSettings[x]);
				this.user_avatars[x] = new createjs.Sprite(avatar_sprites[x],"normal");
				this.user_avatars[x].x = (ycount* 60)  + 60;
				this.user_avatars[x].y = (xcount* 60 )+ acc_label.y +15;
				this.user_avatars[x].scaleX = this.user_avatars[x].scaleY = .5;
				this.user_avatars[x].avatar = avatars[x];
				this.user_avatars[x].name = avatarname[x];
				this.user_avatars[x].cursor = 'pointer';

				if(xcount == 2) {
					ycount++;
					xcount = 0;
				}

				if (avatarname[x] == config.default) {
					this.user_avatars[x].gotoAndStop(2);
				}

				this.user_avatars[x].addEventListener("mousedown",(e)=>{
					let avatar =  "";
					e.nativeEvent.preventDefault();

					// Reset avatar
					for (var j = 0; j < avatars.length; j++) {
						this.user_avatars[j].gotoAndStop("normal");
					}

					e.currentTarget.gotoAndStop("active")

					if(e.currentTarget.avatar == "avatar_blackjack") {
						avatar = "blue_jack"
					}

					if(e.currentTarget.avatar == "avatar_blackjoker") {
						avatar = "blue_joker"
					}

					if(e.currentTarget.avatar == "avatar_blackking") {
						avatar = "blue_king"
					}

					if(e.currentTarget.avatar == "avatar_blackqueen") {
						avatar = "blue_queen"
					}

					if(e.currentTarget.avatar == "avatar_redjack") {
						avatar = "red_jack"
					}

					if(e.currentTarget.avatar == "avatar_redjoker") {
						avatar = "red_joker"
					}
					if(e.currentTarget.avatar == "avatar_redking") {
						avatar = "red_king"
					}
					if(e.currentTarget.avatar == "avatar_redqueen") {
						avatar = "red_queen"
					}

   		     //  this.context.toggleView('thumbnail_settings');
   		      		$(".userinfo__avatar img").attr("src","/img/avatar/"+avatar+'.png');
					// this.context.lobby_header.user_avatar.image.src = "/img/avatar/"+avatar+'.png';
					let avatarIndex = 0;

					window.rawConfig.default.forEach((a, x)=>{
						if(a == avatar) {
							avatarIndex = x;
						}
					});

					$.post(route, {default : avatarIndex}, (response) => {
					});
				});

				this.user_avatars[x].addEventListener("pressup",(e)=>{
					e.nativeEvent.preventDefault();
					// e.currentTarget.gotoAndStop(0)
				});

				this.container.addChild(this.user_avatars[x])
				// this.addChild(this.user_avatars[x])
			}


        	this.resize()
        	window.addEventListener("resize", function() {
        		this.resize()
        		transHistory.update()
			}.bind(this));
			// //lang
			// let lang_label = new createjs.Text(window.language.lobby.language,"bold 18px lato","#7f7f7f");
			// lang_label.x = acc_label.x +20;
			// lang_label.y = acc_label.y  + 218;
			// this.addChild(lang_label);
			//
			// let lang  = ["language_english","language_japanese","language_korean"];
			// let langType  = ["english","japan","korea"];
			// let langspriteSettings = [];
			// let lang_sprites = [];
			// this.language = [];
			//
			//
			// for(var x = 0; x < lang.length; x++) {
			// 	langspriteSettings[x] ={
			// 		images: ["/img/v2_1/language/"+lang[x]+".png"],
			// 		frames: {width:60,height:60},
			// 		animations: {
			// 			"normal": [0],
			// 			"active" : [2]
			// 		}
			// 	}
			//
			// 	lang_sprites[x] = new createjs.SpriteSheet(langspriteSettings[x]);
			// 	this.language[x] = new createjs.Sprite(lang_sprites[x],"normal");
			// 	this.language[x].y = lang_label.y - 10;
			// 	this.language[x].x = (x * 50)  + 150;
			// 	this.language[x].scaleY = 0.6;
			// 	this.language[x].scaleX = 0.6;
			// 	this.language[x].lang = langType[x];
			//
			// 	if (langType[x] == config.language) {
			// 		this.language[x].gotoAndStop(2);
			// 	}
			//
			// 	this.language[x].addEventListener("mousedown",(e)=>{
			// 		let chosenLanguageIndex = '';
			// 		e.nativeEvent.preventDefault();
			// 		e.currentTarget.gotoAndStop("active");
			//
			// 		for (var i = 0; i < rawConfig.language.length; i++) {
			// 			if (rawConfig.language[i] == e.currentTarget.lang) {
			// 				chosenLanguageIndex = i;
			// 			}
			// 		}
			//
			// 		//Post to change language
			// 		$.post(route, {language : chosenLanguageIndex}, (response) => {
			// 			location.reload();
			// 		});
			// 	});
			//
			// 	this.language[x].addEventListener("pressup",(e)=>{
			// 		e.nativeEvent.preventDefault();
			// 		e.currentTarget.gotoAndStop(0)
			// 	});
			//
			// 	this.addChild(this.language[x])
			// }

		}, // end of main
	    resize () {

			var newWidth = window.innerWidth;
			var newHeight = window.innerHeight;

			var baseRatio = 1920 / 1080,
				newRatio = newWidth / newHeight;

			if(newRatio > baseRatio) {
				newWidth = newHeight * baseRatio;
			} else {
				newHeight = newWidth / baseRatio;
			}


			popupSettings.canvas.width = newWidth;
			popupSettings.canvas.height = newHeight;


			popupSettings.scaleX = popupSettings.scaleY = newWidth / 1920;
	    }
	});

	return instance;
}
