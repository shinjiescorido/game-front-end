import { moneyFormat, numberWithCommas } from '../../factories/factories';

/**
 * menuVideoSettings.js
 * @author Kevin Villanueva
 * @since 2018.01.09
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 * Handles all video setting functionalities
**/

let instance = null;

export default(links) => {

	let countSelectedChips = 5;
	let bgmodchips = [];
	let modchips = [];
	let chipCon = [];

	instance = instance || new blu.Component({
		main() {
			this.x = 1610;
			this.y = 178;
			this.visible = false;

			this._modalWidth = 200;
			this._modalHeight = 110;

			//Modal Header
			this._modalHeader = new createjs.Shape();
			this._modalHeader.graphics.beginLinearGradientFill([this.context.theme_color[window.theme].base_color, this.context.theme_color[window.theme].gradColor2], [.1, .9], 10, 10, 10, 35)
				.drawRoundRect(0, .8, this._modalWidth, 35, 3);
			this.addChild(this._modalHeader);

			//Header Text
			this._headerTxt = new createjs.Text(window.language.menu.videosettings, window.language.locale == "zh" ? "bold 20px arial" : "bold 15px arial", this.context.theme_color[window.theme].labelcolor);
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
			this._headerCloseHit.graphics.beginFill("#000").drawRect(0, 0, 20, 20);
			this._headerCloseHit.x = this._headerClose.x;
			this._headerCloseHit.y = this._headerClose.y;
			this._headerCloseHit.cursor = "pointer";
			this._headerCloseHit.alpha = 0.01;
			this.addChild(this._headerCloseHit);

			//Close modal
			this._headerCloseHit.addEventListener("mousedown", (e) => {
				this.context.component_menu.setActiveModal();
				this.visible = false;
				$(".hack").css('height','420px')
			});

			this._modalBg = new createjs.Shape();
			this._modalBg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);
			this._modalBg.y = this._modalHeader.y + 35;
			this.addChild(this._modalBg);

			this.refVideoTxt = new createjs.Text(window.language.menu.refreshvideo, window.language.locale == "zh" ? "bold 18px arial" : "bold 13px arial", this.context.theme_color[window.theme].labelcolor);
			this.refVideoTxt.x = (this._modalWidth / 2) - 25;
			this.refVideoTxt.y = 60;
			this.refVideoTxt.textAlign = 'center';
			this.addChild(this.refVideoTxt);

			let videoIcoBg = new createjs.Shape();
			videoIcoBg.graphics.beginFill('#fff').drawCircle(0, 0, 17);
			videoIcoBg.x = this.refVideoTxt.x + 75;
			videoIcoBg.y = this.refVideoTxt.y + 5;
			videoIcoBg.cursor = 'pointer';
			this.addChild(videoIcoBg);

      let spriteData = {
        images: [("/img/icons/menu/refreshvid_icon.png")],
        frames: {
          width: 23,
          height: 26
        },
        animations: {
          "up": [0],
          "hover": [1],
        }
      }

      let ico_spriteSheet = new createjs.SpriteSheet(spriteData);
      let videoIco = new createjs.Sprite(ico_spriteSheet, "up");
      videoIco.gotoAndStop("up");
			videoIco.x = videoIcoBg.x - 13;
			videoIco.y = videoIcoBg.y - 14;
			videoIco.scaleX = videoIco.scaleY = 1.2;
			videoIco.cursor = 'pointer';
			videoIco.hitArea = videoIcoBg;
      this.addChild(videoIco);

      videoIcoBg.addEventListener("mouseover", (e) => {
        videoIco.gotoAndStop("hover")
      });

      videoIcoBg.addEventListener("mouseout", (e) => {
        videoIco.gotoAndStop("up")
      });

      videoIcoBg.addEventListener("click", (e) => {
        try {
	        window.videoStream && window.videoStream.load();
	      } catch (e) {}
	      
				this.context.component_menu.hideAllModal(true);
      });

      this.qualityHD = new createjs.Text('HD', "bold 13px arial", this.context.theme_color[window.theme].labelcolor);
			this.qualityHD.x = 32;
			this.qualityHD.y = 105;
			this.qualityHD.textAlign = 'left';
			this.addChild(this.qualityHD);

			let radioHD = new createjs.Shape();
			radioHD.graphics.beginFill('#fff').drawCircle(0, 0, 12);
			radioHD.x = this.qualityHD.x + 45;
			radioHD.y = this.qualityHD.y + 7;
			radioHD.cursor = 'pointer';
			radioHD.isHD = true;
			this.addChild(radioHD);

			this.qualitySD = new createjs.Text('SD', "bold 13px arial", this.context.theme_color[window.theme].labelcolor);
			this.qualitySD.x = 107;
			this.qualitySD.y = 105;
			this.qualitySD.textAlign = 'left';
			this.addChild(this.qualitySD);

			let radioSD = new createjs.Shape();
			radioSD.graphics.beginFill('#424242').drawCircle(0, 0, 12);
			radioSD.x = this.qualitySD.x + 45;
			radioSD.y = this.qualitySD.y + 7;
			radioSD.cursor = 'pointer';
			radioSD.isHD = false;
			this.addChild(radioSD);

			let activeCircle = new createjs.Shape();
			activeCircle.graphics.beginFill('#2e7d32').drawCircle(0, 0, 8);
			activeCircle.x = radioHD.x;
			activeCircle.y = radioHD.y;
			activeCircle.cursor = 'pointer';
			this.addChild(activeCircle);

			radioHD.addEventListener("click", (e) => {
				$.post(links.videoSetting, {type: 'HD'}, (response) => { });
        this.setActiveQuality(e.target, radioSD, activeCircle);
      });

			radioSD.addEventListener("click", (e) => {
				$.post(links.videoSetting, {type: 'SD'}, (response) => { });
        this.setActiveQuality(e.target, radioHD, activeCircle);
      });

			// On load video quality
			if (window.config.video === 'HD') {
        this.setActiveQuality(radioHD, radioSD, activeCircle);
			}
			else {
				this.setActiveQuality(radioSD, radioHD, activeCircle);
			}
		},

		setActiveQuality(active, inactive, activeCircle) {
			inactive.graphics.clear().beginFill('#424242').drawCircle(0, 0, 12);
			active.graphics.clear().beginFill('#fff').drawCircle(0, 0, 12);

			activeCircle.x = active.x;
			activeCircle.y = active.y;

			if (active.isHD) {
        window.flashvars.src = window.videostream_url;
        swfobject.embedSWF("/osmf/GrindPlayer.swf", "player", "1920", "1080", "10.2", null, window.flashvars, window.params, window.attrs);
			} else {
        window.flashvars.src = window.videostream_url + "_800x450";
        swfobject.embedSWF("/osmf/GrindPlayer.swf", "player", "1920", "1080", "10.2", null, window.flashvars, window.params, window.attrs);
			}

			this.context.component_menu.hideAllModal(true);
		},

		changeTheme(new_theme) {
			this._modalHeader.graphics.clear().beginLinearGradientFill([this.context.theme_color[new_theme].base_color, this.context.theme_color[new_theme].gradColor2], [.1, .9], 10, 10, 10, 35)
			.drawRoundRect(0, .8, this._modalWidth, 35, 3);
			this._headerTxt.color = this.context.theme_color[new_theme].labelcolor;
			this._headerClose.color = this.context.theme_color[new_theme].labelcolor;
			this._modalBg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);

			this.refVideoTxt.color = this.context.theme_color[new_theme].labelcolor;
			this.qualityHD.color = this.context.theme_color[new_theme].labelcolor;
			this.qualitySD.color = this.context.theme_color[new_theme].labelcolor;
		}
	});
	return instance;
}
