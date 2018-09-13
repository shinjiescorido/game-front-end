/**
 * menuChips.js
 * @author Kevin Villanueva
 * @since 2017.06.15
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 * Handles all modify chips functionalities
**/

let instance = null;

export default() => {

	let countSelectedChips = 5;
	let bgmodchips = [];
	let modchips = [];
	let chipCon = [];

	instance = instance || new blu.Component({
		main() {
			let route = "/settings";
			let self = this;

			this.x = 760;
			this.y = 90;
			this.visible = false;
			this.scaleX = this.scaleY = 1.5;

			this._modalWidth = 260;
			this._modalHeight = 270;

			this.settingsName = [];
			this.settingsToggle = [];
			this.settingsCircle = [];
			this.settingsToggleHit = [];
			let newVolume = "";
			let lblsettingsY = 0;
			let color = [];
			let lblSettingsArr = ["Sound Effects", "Voice", "Dark Theme", "Show Tutorial"];
			let textToDisplay = [window.language.menu.soundeffects,window.language.menu.voice, window.language.menu.darktheme, window.language.menu.showtutorial]

			let disabledX = 0;
			let enabledX = 0;

			//Modal Header
			this._modalHeader = new createjs.Shape();
			this._modalHeader.graphics.beginLinearGradientFill([this.context.theme_color[window.theme].base_color, this.context.theme_color[window.theme].gradColor2], [.1, .9], 10, 10, 10, 35)
				.drawRoundRect(0, 0, this._modalWidth, 35, 3);
			this.addChild(this._modalHeader);

			//Header Text
			this._headerTxt = new createjs.Text(window.language.menu.settingscaps, window.language.locale == "zh" ? "bold 20px arial" : "bold 15px arial" , this.context.theme_color[window.theme].labelcolor);
			this._headerTxt.x = this._modalHeader.x + 10;

			if(window.language.locale == "zh") {
				this._headerTxt.y = this._modalHeader.y + 7;
			} else {
				this._headerTxt.y = this._modalHeader.y + 9;
			}

			this.addChild(this._headerTxt);

			//Header Close button
			this._headerClose = new createjs.Text("X","bold 15px arial", this.context.theme_color[window.theme].labelcolor);
			this._headerClose.x = this._modalWidth - 30;
			this._headerClose.y = this._modalHeader.y + 9;
			this.addChild(this._headerClose);

			//Close button hitarea
			this._headerCloseHit = new createjs.Shape();
			this._headerCloseHit.graphics.beginFill("#000").drawRect(0, 0, 45, 35);
			this._headerCloseHit.x = this._headerClose.x - 15;
			this._headerCloseHit.y = this._headerClose.y - 8;
			this._headerCloseHit.cursor = "pointer";
			this._headerCloseHit.alpha = 0.01;
			this.addChild(this._headerCloseHit);

			//Close modal
			this._headerCloseHit.addEventListener("mousedown", (e) => {
      	this.context.component_menu.setActiveModal();
      	this.visible = false;
      });

			this._modalBg = new createjs.Shape();
			this._modalBg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);
			this._modalBg.y = this._modalHeader.y + 35;
			this.addChild(this._modalBg);

			this.txtMasterVol = new createjs.Text(window.language.menu.mastervolume, window.language.locale == "zh" ? "bold 18px arial" : "bold 13px arial", this.context.theme_color[window.theme].labelcolor);
			this.txtMasterVol.x = (this._modalWidth / 2) - 90;

			if(window.language.locale == "zh") {
				this.txtMasterVol.y = this._modalHeader.y + 45;
			} else {
				this.txtMasterVol.y = this._modalHeader.y + 55;
			}

			//Init volume mute spritesheet
			let volumemute_spritesheet_data = {
				images: [this.context.getResources("volume-mute-"+window.theme)],
				frames: {width:21,height:20},
				animations: {
					"mute": [0],
					"normal" : [1]
				}
			}

			let volume_mute_spritesheet = new createjs.SpriteSheet(volumemute_spritesheet_data);
			this.volumeMute = new createjs.Sprite(volume_mute_spritesheet,"normal");
			this.volumeMute.x = this.txtMasterVol.x;
			this.volumeMute.y = this.txtMasterVol.y + 30;
			this.volumeMute.cursor =  "pointer";
			this.volumeMute.status =  "normal";

			//Init volume max spritesheet
			let volumemax_spritesheet_data = {
				images: [this.context.getResources("volume-max-"+window.theme)],
				frames: {width:24,height:20},
				animations: {
					"normal": [0],
					"mute" : [1]
				}
			}

			let volume_max_spritesheet = new createjs.SpriteSheet(volumemax_spritesheet_data);
			this.volumeMax = new createjs.Sprite(volume_max_spritesheet,"normal");
			this.volumeMax.x = this.volumeMute.x + 160;
			this.volumeMax.y = this.volumeMute.y;
			this.volumeMax.cursor = "pointer";
			this.volumeMax.status = "normal";

			//Volume line bg
			this.volumeBg = new createjs.Shape();
			this.volumeBg.graphics.beginFill("#1d1d1d").drawRoundRect(0, 0, 115, 4, 2);
			this.volumeBg.x = this.volumeMute.x + 30;
			this.volumeBg.y = this.volumeMute.y + 8;
			this.volumeBg.setBounds(0, 0, 115, 4);

			this.default_vol = 115;
			let saved_vol = this.default_vol * parseFloat(window.config.volume);

			//Volume line bg
			this.volumeCurrent = new createjs.Shape();
			this.volumeCurrent.graphics.beginFill("#7cb342").drawRoundRect(0, 0, saved_vol, 5, 2);
			this.volumeCurrent.x = this.volumeMute.x + 30;
			this.volumeCurrent.y = this.volumeMute.y + 8;
			this.volumeCurrent.setBounds(0, 0, saved_vol, 5);

			this.volumeCircle = new createjs.Shape();
			this.volumeCircle.graphics.beginFill("#2e7d32").drawCircle(0, 0, 16);
			this.volumeCircle.x = this.volumeCurrent.x + saved_vol;
			this.volumeCircle.y = this.volumeMute.y + 10;
			this.volumeCircle.cursor = "pointer";

			//Add child to settingsCon container
			this.addChild(this.txtMasterVol, this.volumeMute, this.volumeMax, this.volumeBg, this.volumeCurrent, this.volumeCircle);
			this.volume = 1;

			//Drag volume event
			this.pos = saved_vol == 0 ? 70 : 0;
			this.lastPos = 0;

			this.volumeCircle.on("pressmove", (evt) => {
				this.lastPos = this.pos;

				if(evt.currentTarget.x <= 0) return;

				let mouseCoor = this.globalToLocal(evt.stageX, evt.stageY)
				let volumeStart = this.volumeBg.x;
				let volumeEnd = this.volumeBg.x + this.volumeBg.getBounds().width;

				this.pos = mouseCoor.x <= 70 ? 70 : mouseCoor.x;
				evt.currentTarget.x = mouseCoor.x;

				if(this.pos > 185.8939179632249) {
					this.pos = 185;
				}

				if(this.pos <= 0) {
					this.pos = 0;
				}

				if(this.pos == 70 ) {
					disableSetting(0, this);
					disableSetting(1, this);
					this.lastPos = this.pos;
				}
				else if (this.lastPos == 70) {
					enableSetting(0, this);
					enableSetting(1, this);
				}

				this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, this.pos > 0 ? this.pos-80 : 0 , 5, 2);
				this.volumeCurrent.setBounds(0, 0, this.pos, 5);

				if (evt.currentTarget.x >= volumeStart && evt.currentTarget.x <= volumeEnd) {
					newVolume = evt.currentTarget.x - 65;
				}

				//Start and end points of volume
				if (evt.currentTarget.x <= volumeStart) {
					evt.currentTarget.x = volumeStart;
					this.volumeMute.gotoAndPlay("mute");
					this.volumeMax.gotoAndPlay("mute");
				} else if (evt.currentTarget.x >= volumeEnd){
					evt.currentTarget.x = volumeEnd;
				}

				if (evt.currentTarget.x > volumeStart) {
					this.volumeMute.gotoAndPlay("normal");
					this.volumeMax.gotoAndPlay("normal");
				}
			});

			this.volumeCircle.on("pressup",()=> {
				if(this.pos > 185.8939179632249) {
					this.pos = 185;
				}

				this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, this.pos > 0 ? this.pos-80 : this.pos , 5, 2);
				this.volumeCurrent.setBounds(0, 0, this.pos, 5);

				let number = (this.volumeCurrent.getBounds().width - 70) / this.default_vol;
				let vol = Math.round( number * 10 ) / 10;
				vol = vol < 0 ? 0 : vol > 1 ? 1 : vol;

				if (window.nonInstall) {
					if (parseInt(window.config.voice)) this.context.playerVid.volume = vol;
				}
				else {
					this.volumecontroller((newVolume/10)); //min
				}

				$.post(route, {volume : vol}, (response) => {

				});
			});

			//Mute volume button click event
			this.volumeMute.addEventListener("mousedown", (e) => {
      	newVolume = 0;
      	this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, newVolume, 5, 2);
      	this.volumeCircle.x = this.volumeCurrent.x;
				this.volumeMute.gotoAndPlay("mute");
				this.volumeMax.gotoAndPlay("mute");
	    });

			//Max volume button click event
      this.volumeMax.addEventListener("mousedown", (e) => {
      	newVolume = 115;
      	this.volumeCurrent.graphics.clear().beginFill("#7cb342").drawRoundRect(0, 0, newVolume, 5, 2);
      	this.volumeCircle.x = this.volumeCurrent.x + newVolume;
				this.volumeMute.gotoAndPlay("normal");
				this.volumeMax.gotoAndPlay("normal");
      });

			lblsettingsY = this.volumeMax.y + 50;
			for (var i = 0; i < lblSettingsArr.length; i++) {
				this.settingsName[i] = new createjs.Text(textToDisplay[i],window.language.locale == "zh" ? "bold 18px arial" : "bold 13px arial", this.context.theme_color[window.theme].labelcolor);
				this.settingsName[i].x = this.volumeMute.x;
				this.settingsName[i].y = lblsettingsY;

				this.settingsToggle[i] = new createjs.Shape();
				this.settingsToggle[i].graphics.beginFill("#fff").drawRoundRect(0, 0, 65, 25, 14);
				this.settingsToggle[i].x = this.volumeMax.x - 40;
				this.settingsToggle[i].y = lblsettingsY - 3;

				this.settingsCircle[i] = new createjs.Shape();
				this.settingsCircle[i].graphics.beginFill("#2e7d32").drawCircle(0, 0, 10);

				this.settingsCircle[i].x = this.settingsToggle[i].x + 50;
				this.settingsCircle[i].y = this.settingsToggle[i].y + 12.5;

				disabledX = this.settingsCircle[i].x - 35;
				enabledX = this.settingsCircle[i].x;

				this.settingsToggleHit[i] = new createjs.Shape();
				this.settingsToggleHit[i].graphics.beginFill("#000").drawRoundRect(0, 0, 65, 25, 14);
				this.settingsToggleHit[i].x = this.volumeMax.x - 40;
				this.settingsToggleHit[i].y = lblsettingsY - 3;
				this.settingsToggleHit[i].cursor = "pointer";
				this.settingsToggleHit[i].status = "enabled";
				this.settingsToggleHit[i].alpha = "0.01";
				this.settingsToggleHit[i].name = lblSettingsArr[i];

				lblsettingsY = lblsettingsY + 40;
				this.addChild(this.settingsName[i], this.settingsToggle[i], this.settingsCircle[i], this.settingsToggleHit[i]);

				if(!parseInt(window.config.voice) && this.settingsToggleHit[i].name.toLowerCase() == "voice") {
				this.settingsToggle[i].graphics.clear().beginFill("#424242").drawRoundRect(0, 0, 65, 25, 14);
				this.settingsCircle[i].graphics.clear().beginFill("#c62828").drawCircle(0, 0, 10);
				this.settingsToggleHit[i].status = "disabled";

			    createjs.Tween.get(this.settingsCircle[i], { loop: false })
						.to({ x: this.settingsCircle[i].x - 35 }, 100)
				}

				if (!parseInt(window.config.effect) && this.settingsToggleHit[i].name.toLowerCase() == "sound effects") {
					this.settingsToggle[i].graphics.clear().beginFill("#424242").drawRoundRect(0, 0, 65, 25, 14);
					this.settingsCircle[i].graphics.clear().beginFill("#c62828").drawCircle(0, 0, 10);
					this.settingsToggleHit[i].status = "disabled";

			    createjs.Tween.get(this.settingsCircle[i], { loop: false })
						.to({ x: this.settingsCircle[i].x - 35 }, 100)
				}

				if(window.config.screen == "white" && this.settingsToggleHit[i].name.toLowerCase() == "dark theme") {
					this.settingsToggle[i].graphics.clear().beginFill("#424242").drawRoundRect(0, 0, 65, 25, 14);
					this.settingsCircle[i].graphics.clear().beginFill("#c62828").drawCircle(0, 0, 10);
					this.settingsToggleHit[i].status = "disabled";

			    createjs.Tween.get(this.settingsCircle[i], { loop: false })
						.to({ x: this.settingsCircle[i].x - 35 }, 100)
				}

				if(!window.tutorial_enabled && this.settingsToggleHit[i].name.toLowerCase() == "show tutorial") {
					this.settingsToggle[i].graphics.clear().beginFill("#424242").drawRoundRect(0, 0, 65, 25, 14);
					this.settingsCircle[i].graphics.clear().beginFill("#c62828").drawCircle(0, 0, 10);
					this.settingsToggleHit[i].status = "disabled";

			    createjs.Tween.get(this.settingsCircle[i], { loop: false })
						.to({ x: this.settingsCircle[i].x - 35 }, 100)
				}

				((i) => {
		      this.settingsToggleHit[i].addEventListener("mousedown", (e) => {
	        	if(this.settingsToggleHit[i].status == "enabled"){
							disableSetting(i, this);
						}else{
							enableSetting(i, this);
						}
		      });
			  }(i));
			}

			function disableSetting(i, t) {
				if(self.settingsToggleHit[i].status == "disabled") return;

				createjs.Tween.get(self.settingsCircle[i], { loop: false })
					  .to({ x: disabledX }, 0)

				self.settingsToggle[i].graphics.clear().beginFill("#424242").drawRoundRect(0, 0, 65, 25, 14);
				self.settingsCircle[i].graphics.clear().beginFill("#c62828").drawCircle(0, 0, 10);
				self.settingsToggleHit[i].status = "disabled";


				if (self.settingsToggleHit[i].name.toLowerCase() == "voice") {
					$.post(route, {voice : 0}, (response) => {

					});
					t.controllermute(1);
				}

				if (self.settingsToggleHit[i].name.toLowerCase() == "sound effects") {
					$.post(route, {effect : 0}, (response) => {
						config.effect = '0';
					});
				}

				if (self.settingsToggleHit[i].name == "Dark Theme") {
					window.theme = "white";
					self.context.component_ingameTutorial.changeTheme(window.theme);
					$.post(route, {screen : 1}, (response) => {

					});
				}

				if (self.settingsToggleHit[i].name ==  "Show Tutorial") {
					$.post(route, {tutorial : false}, (response) => {

					});
				}
			}

			function enableSetting(i, t) {
				if(self.settingsToggleHit[i].status == "enabled") return;

				createjs.Tween.get(self.settingsCircle[i], { loop: false })
					  .to({ x: enabledX }, 0)

				self.settingsToggle[i].graphics.clear().beginFill("#fff").drawRoundRect(0, 0, 65, 25, 14);
				self.settingsCircle[i].graphics.clear().beginFill("#2e7d32").drawCircle(0, 0, 10);
				self.settingsToggleHit[i].status = "enabled";

				if(self.settingsToggleHit[i].name.toLowerCase() == "voice") {
					$.post(route, {voice : 1}, (response) => {

					});
					t.controllermute(0);
				}

				if(self.settingsToggleHit[i].name.toLowerCase() == "sound effects") {
					$.post(route, {effect : 1}, (response) => {
						config.effect = '0';
					});
				}

				if(self.settingsToggleHit[i].name == "Dark Theme") {
					window.theme = "black";
					self.context.component_ingameTutorial.changeTheme(window.theme);
					$.post(route, {screen : 0}, (response) => {

					});
				}

				if (self.settingsToggleHit[i].name == "Show Tutorial") {
					$.post(route, {tutorial : true}, (response) => {

					});
				}
			}
		},
		disableTutorial (){
			createjs.Tween.get(this.settingsCircle[3], { loop: false })
				.to({ x: 175 }, 0)

			this.settingsToggle[3].graphics.clear().beginFill("#424242").drawRoundRect(0, 0, 65, 25, 14);
			this.settingsCircle[3].graphics.clear().beginFill("#c62828").drawCircle(0, 0, 10);
			this.settingsToggleHit[3].status = "disabled";
		},
		changeTheme(new_theme) {
			this._modalHeader.graphics.clear().beginLinearGradientFill([this.context.theme_color[new_theme].base_color, this.context.theme_color[new_theme].gradColor2], [.1, .9], 10, 10, 10, 35)
				.drawRoundRect(0, 0, this._modalWidth, 35, 3);
			this._headerTxt.color = this.context.theme_color[new_theme].labelcolor;
			this._headerClose.color = this.context.theme_color[new_theme].labelcolor;
			this._modalBg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);
			this.txtMasterVol.color = this.context.theme_color[new_theme].labelcolor;
			//Init volume mute spritesheet
			let volumemute_spritesheet_data = {
				images: [this.context.getResources("volume-mute-"+new_theme)],
				frames: {width:21,height:20},
				animations: {
					"mute": [0],
					"normal" : [1]
				}
			}

			let volume_mute_spritesheet = new createjs.SpriteSheet(volumemute_spritesheet_data);
			this.volumeMute.spriteSheet = volume_mute_spritesheet;
			this.volumeMute.gotoAndPlay("normal");

			//Init volume max spritesheet
			let volumemax_spritesheet_data = {
				images: [this.context.getResources("volume-max-"+new_theme)],
				frames: {width:24,height:20},
				animations: {
					"normal": [0],
					"mute" : [1]
				}
			}

			let volume_max_spritesheet = new createjs.SpriteSheet(volumemax_spritesheet_data);
			this.volumeMax.spriteSheet = volume_max_spritesheet;
			this.volumeMax.gotoAndPlay("normal");

			for (let i = 0; i < this.settingsName.length; i++) {
				this.settingsName[i].color = this.context.theme_color[new_theme].labelcolor;
			}
		},
		volumecontroller(volumeString) {
			var mobileString = this.detectmob();

			if (mobileString == 'Android') {
				if(typeof Android !== "undefined" && Android !== null) {
					Android.volumeController(volumeString);
				}
			} else if (mobileString == 'iPhone') {
				try{
					window.webkit.messageHandlers.observe.postMessage(`nihvolbutton,${volumeString},`);
				} catch(e) {
					// not using ios device
				}

      	document.location = 'nihvolbutton://bluefrog?volume=' + volumeString;
			} else{

			}
		},
		controllermute(muteString) {
			window.config.voice = muteString == 1 ? 0 : 1;

			if (window.nonInstall) {
				this.context.playerVid.volume = 0;

				if (parseInt(muteString) === 0) {
					this.context.playerVid.volume = parseFloat(window.config.volume);
				}
			}
			else {
				var mobileString = this.detectmob();

			  if(mobileString == 'Android') {
			    if(typeof Android !== "undefined" && Android !== null) {
			      Android.volumeMuteController(muteString);
			    }
			  } else if (mobileString == 'iPhone') {
					try {
						window.webkit.messageHandlers.observe.postMessage(`nihmutebutton,${muteString},`);
					} catch(e) {
						// not using ios device
					}

			    document.location = 'nihmutebutton://bluefrog?mute=' + muteString;
			  } else{

			  }
			}
		},
		detectmob() {
			if( navigator.userAgent.match(/Android/i)) {
			  return 'Android';
			} else if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
			  return 'iPhone';
			} else {
			  return 'none';
			}
		},
	});
	return instance;
}
