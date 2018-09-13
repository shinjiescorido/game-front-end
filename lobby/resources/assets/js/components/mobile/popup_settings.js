let instance = null;

export default() => {
	instance = instance || new blu.Component({
		ads : [],
		circle_indicator : [],
		main() {

			let popup_bg = new createjs.Shape();
			popup_bg.graphics.beginLinearGradientFill(["#4c4c4c", "#343434"],[0,1],0,0,0,300).drawRect(0,0,1280,950);

			let route = "/settings";

			this.visible = false;
			this.addChild(popup_bg);

			let label = new createjs.Text(window.language.menu.settingscaps,"30px lato","#fff");
			this.addChild(label);
			label.x = 50
			label.y = 50

			if(window.language.locale == "zh") {
							label.font = "35px lato";
			}

			let disabledX = 0;
			let enabledX = 0;

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

			let volume_mute_spritesheet = new createjs.SpriteSheet(volumemute_spritesheet_data);
			this.volumeMute = new createjs.Sprite(volume_mute_spritesheet,"normal");
			this.volumeMute.x = 60;
			this.volumeMute.y = 120;
			this.volumeMute.scaleX =  this.volumeMute.scaleY = 1.6
			this.volumeMute.cursor =  "pointer";
			this.volumeMute.status =  "normal";

			this.addChild(this.volumeMute)

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
			this.volumeMax.x = this.volumeMute.x + 330;
			this.volumeMax.y = this.volumeMute.y;
			this.volumeMax.scaleY = this.volumeMax.scaleX = 1.6
			this.volumeMax.cursor = "pointer";
			this.volumeMax.status = "normal";

			this.addChild(this.volumeMax);

			//Volume line bg
			this.volumeBg = new createjs.Shape();
			this.volumeBg.graphics.beginFill("#1d1d1d").drawRoundRect(0, 0, 255, 20, 10);
			this.volumeBg.x = this.volumeMute.x + 50;
			this.volumeBg.y = this.volumeMute.y + 8;
			this.volumeBg.setBounds(0, 0, 250, 20);

			//Volume line bg
			this.default_vol = 250;
			let saved_vol = this.default_vol * parseFloat(window.config.volume);
			// console.log('saved vol '+parseFloat(window.config.volume));

			this.volumeCurrent = new createjs.Shape();
			this.volumeCurrent.graphics.beginFill("#7cb342").drawRoundRect(0, 0,saved_vol , 20, 10);
			this.volumeCurrent.x = this.volumeMute.x + 50;
			this.volumeCurrent.y = this.volumeMute.y + 8;
			this.volumeCurrent.setBounds(0, 0, saved_vol, 5);

			this.volumeCircle = new createjs.Shape();
			this.volumeCircle.graphics.beginFill("#2e7d32").drawCircle(0, 0, 16);
			this.volumeCircle.x = this.volumeCurrent.x + saved_vol;
			this.volumeCircle.y = this.volumeMute.y + 18;
			this.volumeCircle.cursor = "pointer";

			this.addChild(this.volumeBg, this.volumeCurrent,this.volumeCircle)

			let newVolume = "";
			let lblsettingsY = 0;
			let settingsName = [];
			let settingsToggle = [];
			let settingsCircle = [];
			let settingsToggleHit = [];
			let color = [];
			/*let lblSettingsArr = [window.language.menu.soundeffects, window.language.menu.voice, window.language.menu.darktheme];
			let lblSettingsName = ["Sound Effects", "Voice", "Dark Theme"];*/
            let lblSettingsArr = [window.language.menu.soundeffects, window.language.menu.voice, window.language.menu.darktheme, window.language.menu.showtutorial];
            let lblSettingsName = ["Sound Effects", "Voice", "Dark Theme", "Show Tutorial"];

			//Drag volume event
			this.pos = saved_vol == 0 ? 110 : 0;
			this.lastPos = 0;

			this.volumeCircle.on("pressmove", (evt) => {
				evt.nativeEvent.preventDefault();
				this.lastPos = this.pos;
				if(evt.currentTarget.x <= 0) return;

				let mouseCoor = this.globalToLocal(evt.stageX, evt.stageY)
				let volumeStart = this.volumeBg.x;
				let volumeEnd = this.volumeBg.x + this.volumeBg.getBounds().width;

				this.pos = mouseCoor.x <= 110 ? 110 : mouseCoor.x;
				evt.currentTarget.x = mouseCoor.x;

				// if (evt.currentTarget.x >= volumeStart && evt.currentTarget.x <= volumeEnd) {
				// 	newVolume = evt.currentTarget.x - 80;
				// 	// this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, newVolume, 20, 10);
				// 	// this.volumeCurrent.setBounds(0, 0, newVolume, 20);
				// }

				if(this.pos > 359.7063430249511) {
					this.pos = 360;
				}

				if(this.pos <= 0) {
					this.pos = 0;
				}

				if(this.pos == 110 )
				{
					disableSetting(settingsToggleHit[0]);
					disableSetting(settingsToggleHit[1]);
					this.lastPos = this.pos;
				}
				else if(this.lastPos == 110)
				{
					enableSetting(settingsToggleHit[0]);
					enableSetting(settingsToggleHit[1]);
				}



				this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, this.pos > 0 ? this.pos - 100 : 0 , 20, 10);
				this.volumeCurrent.setBounds(0, 0, this.pos > 0 ? this.pos-100 : 0, 20);

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

				if(this.pos > 359.7063430249511) {
					this.pos = 360;
				}
				this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, this.pos > 0 ? this.pos-100 : this.pos , 20, 10);
				this.volumeCurrent.setBounds(0, 0, this.pos > 0 ? this.pos-100 : this.pos, 20);

				let number = this.volumeCurrent.getBounds().width/this.default_vol;
				let vol = Math.round( number * 10 ) / 10;
				// console.log('new vol '+vol);
				$.post(route, {volume : vol}, (response) => {

				});
			});

				//Mute volume button click event
			this.volumeMute.addEventListener("mousedown", (e) => {
				e.nativeEvent.preventDefault();
	        	newVolume = 0;
	        	this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, newVolume, 20, 10);
	        	this.volumeCircle.x = this.volumeCurrent.x;
				this.volumeMute.gotoAndStop("mute");
				this.volumeMax.gotoAndStop("mute");

				$.post(route, {volume : newVolume}, (response) => {

				});
	        });

			//Max volume button click event
	        this.volumeMax.addEventListener("mousedown", (e) => {
				e.nativeEvent.preventDefault();
	        	newVolume = 250;
	        	this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, newVolume, 20, 10);
	        	this.volumeCircle.x = this.volumeCurrent.x + newVolume;
				this.volumeMute.gotoAndStop("normal");
				this.volumeMax.gotoAndStop("normal");

				$.post(route, {volume : 1}, (response) => {

				});
	        });

	        // ========
	        //
	        lblsettingsY = this.volumeMax.y + 100;
			for (var i = 0; i < lblSettingsArr.length; i++) {

				settingsToggleHit[i] = new createjs.Shape();

				settingsToggleHit[i].settingsName = new createjs.Text(lblSettingsArr[i],"bold 24px arial", "#fff");
				// if(i > 1) {
				// 	settingsToggleHit[i].settingsName.color = "#545454"
				// }
				settingsToggleHit[i].settingsName.x = this.volumeMute.x;
				settingsToggleHit[i].settingsName.y = lblsettingsY;

				settingsToggleHit[i].settingsToggle = new createjs.Shape();
				settingsToggleHit[i].settingsToggle.graphics.beginFill("#fff").drawRoundRect(0, 0, 100, 40, 20);
				// if(i>1) {
				// 	settingsToggleHit[i].settingsToggle.graphics.clear().beginFill("#4c4c4c").drawRoundRect(0, 0, 100, 40, 20);
				// }
				settingsToggleHit[i].settingsToggle.x = this.volumeMax.x - 40;
				settingsToggleHit[i].settingsToggle.y = lblsettingsY - 3;


				settingsToggleHit[i].settingsCircle = new createjs.Shape();
				settingsToggleHit[i].settingsCircle.graphics.beginFill("#2e7d32").drawCircle(0, 0, 18);
				// if(i>1) {
				// 	settingsToggleHit[i].settingsCircle.graphics.clear().beginFill("#0f3a11").drawCircle(0, 0, 18);
				// }
				settingsToggleHit[i].settingsCircle.x = settingsToggleHit[i].settingsToggle.x + 78;
				settingsToggleHit[i].settingsCircle.y = settingsToggleHit[i].settingsToggle.y + 20;

				enabledX = settingsToggleHit[i].settingsCircle.x;
				disabledX = settingsToggleHit[i].settingsCircle.x - 54;

				settingsToggleHit[i].graphics.beginFill("#000").drawRoundRect(0, 0, 100, 40, 20);
				settingsToggleHit[i].x = this.volumeMax.x - 40;
				settingsToggleHit[i].y = lblsettingsY - 3;
				settingsToggleHit[i].cursor = "pointer";
				settingsToggleHit[i].status = "enabled";
				settingsToggleHit[i].alpha = "0.01";
				settingsToggleHit[i].name = lblSettingsName[i];

				//setting default
				// console.log('settingname '+settingsToggleHit[i].name);
				if(!parseInt(window.config.voice) && settingsToggleHit[i].name.toLowerCase() == "voice") {
					settingsToggleHit[i].settingsToggle.graphics.clear().beginFill("#424242").drawRoundRect(0, 0, 100, 40, 20);
					settingsToggleHit[i].settingsCircle.graphics.clear().beginFill("#c62828").drawCircle(0, 0, 18);
					settingsToggleHit[i].status = "disabled";

			        createjs.Tween.get(settingsToggleHit[i].settingsCircle, { loop: false })
					.to({ x: settingsToggleHit[i].settingsCircle.x - 54 }, 100)
				}

				if(!parseInt(window.config.effect) && settingsToggleHit[i].name.toLowerCase() == "sound effects") {
					settingsToggleHit[i].settingsToggle.graphics.clear().beginFill("#424242").drawRoundRect(0, 0, 100, 40, 20);
					settingsToggleHit[i].settingsCircle.graphics.clear().beginFill("#c62828").drawCircle(0, 0, 18);
					settingsToggleHit[i].status = "disabled";


			        createjs.Tween.get(settingsToggleHit[i].settingsCircle, { loop: false })
					.to({ x: settingsToggleHit[i].settingsCircle.x - 54 }, 100)
				}

				if(window.config.screen == "white" && settingsToggleHit[i].name.toLowerCase() == "dark theme") {
					settingsToggleHit[i].settingsToggle.graphics.clear().beginFill("#424242").drawRoundRect(0, 0, 100, 40, 20);
					settingsToggleHit[i].settingsCircle.graphics.clear().beginFill("#c62828").drawCircle(0, 0, 18);
					settingsToggleHit[i].status = "disabled";


			        createjs.Tween.get(settingsToggleHit[i].settingsCircle, { loop: false })
					.to({ x: settingsToggleHit[i].settingsCircle.x - 54 }, 100)
				}

				if(!window.tutorial_enabled && settingsToggleHit[i].name.toLowerCase() == "show tutorial") {
					settingsToggleHit[i].settingsToggle.graphics.clear().beginFill("#424242").drawRoundRect(0, 0, 100, 40, 20);
					settingsToggleHit[i].settingsCircle.graphics.clear().beginFill("#c62828").drawCircle(0, 0, 18);
					settingsToggleHit[i].status = "disabled";


			        createjs.Tween.get(settingsToggleHit[i].settingsCircle, { loop: false })
					.to({ x: settingsToggleHit[i].settingsCircle.x - 54 }, 100)
				}


				lblsettingsY = lblsettingsY + 90;
				this.addChild(settingsToggleHit[i].settingsName, settingsToggleHit[i].settingsToggle, settingsToggleHit[i].settingsCircle, settingsToggleHit[i]);

		       settingsToggleHit[i].addEventListener("click", (e) => {
					e.nativeEvent.preventDefault();
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

				setting.settingsToggle.graphics.clear().beginFill("#424242").drawRoundRect(0, 0, 100, 40, 20);
				setting.settingsCircle.graphics.clear().beginFill("#c62828").drawCircle(0, 0, 18);
				setting.status = "disabled";


				if(setting.name.toLowerCase() == "voice") {
					// this.controllermute(1);
					//
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
				createjs.Tween.get(setting.settingsCircle, { loop: false })
					  .to({ x: enabledX }, 100)

				setting.settingsToggle.graphics.clear().beginFill("#fff").drawRoundRect(0, 0, 100, 40, 20);
				setting.settingsCircle.graphics.clear().beginFill("#2e7d32").drawCircle(0, 0, 18);
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
					$.post(route, {screen : 0}, (response) => {

					});
				}

				if (setting.name ==  "Show Tutorial") {
					$.post(route, {tutorial : true}, (response) => {
						
					});
				}
			}


			let acc_label = new createjs.Text(window.language.lobby.avatar,"30px lato","#fff");
			acc_label.x = label.x + 540;
			acc_label.y = label.y;
			this.addChild(acc_label);

			if(window.language.locale == "zh") {
						acc_label.font = "35px lato";
			}

			let avatars  = ["avatar_blackjack","avatar_blackjoker","avatar_blackking","avatar_blackqueen","avatar_redjack","avatar_redjoker","avatar_redking","avatar_redqueen"];
			let avatarname  = ["blue_jack","blue_joker","blue_king","blue_queen","red_jack","red_joker","red_king","red_queen"];
			let spriteSettings = [];
			let avatar_sprites = [];
			this.user_avatars = [];

			let ycount = 0;
			let xcount = 0;
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
				this.user_avatars[x].x = (xcount* 120) + acc_label.x -120;
				this.user_avatars[x].y = (ycount* 120 )  + 120;
				this.user_avatars[x].avatar = avatars[x];
				this.user_avatars[x].name = avatarname[x];

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

					window.user_avatar.image.src = "/img/avatar/"+avatar+'.png';
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
				});

				this.addChild(this.user_avatars[x])
			}
			//lang
			let lang_label = new createjs.Text(window.language.lobby.language,"30px lato","#fff");
			lang_label.x = acc_label.x + 450;
			lang_label.y = acc_label.y;
			this.addChild(lang_label);

			if(window.language.locale == "zh") {
							lang_label.font = "35px lato";
							lang_label.x = acc_label.x + 490;
			}

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
				this.language[x].x = lang_label.x + 40;
				this.language[x].y = (x* 85 )  + 120;
				this.language[x].scaleY = 1.2;
				this.language[x].scaleX = 1.2;
				this.language[x].lang = langType[x];

				if(window.language.locale == "zh") {
								this.language[x].x = lang_label.x;
				}

				if (langType[x] == config.language) {
					this.language[x].gotoAndStop(2);
				}

				this.language[x].addEventListener("mousedown",(e)=>{
					let chosenLanguageIndex = '';
					e.nativeEvent.preventDefault();
					e.currentTarget.gotoAndStop("active")

					for (var i = 0; i < rawConfig.language.length; i++) {
						if (rawConfig.language[i] == e.currentTarget.lang) {
							chosenLanguageIndex = i;
						}
					}

					//Post to change language
					$.post(route, {language : chosenLanguageIndex}, (response) => {
						window.location.reload();
					});
				});

				this.language[x].addEventListener("pressup",(e)=>{
					e.nativeEvent.preventDefault();
					e.currentTarget.gotoAndStop(0);
				});

				this.addChild(this.language[x])
			}

		} // end of main

	});

	return instance;
}
