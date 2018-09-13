/**
 * announcement.js
 * @author Kevin Villanueva
 * @since 2017.10.26
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

let instance = null;
import { setCurrentTimezone } from '../../../factories/factories';

export default () => {
	instance = instance || new blu.Component({
		main () {
			// Data containers
			this.noticeCon = [];
			this.mainNoticeCon = [];

			// === Notice container
			this.announcementCon  = new createjs.Container();
			this.announcementCon.x = (this.context.context.width / 2) - 220;
			this.announcementCon.visible = false;
			this.addChild(this.announcementCon);
		},

		setAnnouncement (data, main) {
			if (main) {
				this.mainNoticeCon = data;
			}
			else {
				this.noticeCon = data;
			}

			if (parseInt(data.status)) {
				this.announcementCon.visible = true;

				if (!main && this.mainNoticeCon.status) return;
			}
			else {
				if (main) {
					if (parseInt(this.noticeCon.status)) {
						data = this.noticeCon;
					}
					else {
						this.announcementCon.visible = false;
						return;
					}
				}
				else {
					if (parseInt(this.mainNoticeCon.status)) {
						data = this.mainNoticeCon;
					}
					else {
						this.announcementCon.visible = false;
						return;
					}
				}
			}

			this.announcementCon.removeAllChildren();

			let announceText;
			let announceMessage = data.content;

			if (typeof data.content !== 'object') {
				announceMessage = JSON.parse(data.content);
			}
			
			let message = window.language.locale == 'zh' ? announceMessage['cn'] : announceMessage[window.language.locale];

			if (parseInt(data.time_yn)) {
				let newStartTime = setCurrentTimezone(data.start_time);
				let newEndTime = setCurrentTimezone(data.end_time);
				announceText = `${newStartTime} ~ ${newEndTime} ${message}`;
			}
			else {
				announceText = message;
			}

			let announcementIconBg = new createjs.Shape();
			announcementIconBg.graphics.beginFill('#f1e382').drawRoundRectComplex(0, 0, 60, 55, 0, 0, 0, 10);
			this.announcementCon.addChild(announcementIconBg);

			let announcementIcon = new createjs.Bitmap(this.context.getResources('notice_ico'));
            announcementIcon.x = announcementIconBg.x + 13;
            announcementIcon.y = announcementIconBg.y + 8;
            announcementIcon.scaleX = announcementIcon.scaleY = 0.6;
            this.announcementCon.addChild(announcementIcon);

			let announcementTextBg = new createjs.Shape();
			announcementTextBg.graphics.beginLinearGradientFill(['#59090a', 'rgba(89, 9, 10, 0.1)'], [0,1],0,0,570,0).drawRect(0,0,570,56); //.drawRoundRectComplex(0, 0, 550, 56, 0, 0, 10, 0); 
			announcementTextBg.x = 60;
			announcementTextBg.y = -1;
			this.announcementCon.addChild(announcementTextBg);

			let announcementText = new createjs.Text(announceText, '25px lato-regular', '#fff');
			announcementText.x = 70;
			announcementText.y = 12;
			this.announcementCon.addChild(announcementText);

			// let textbounds = announcementText.getBounds();

			let marquee_con = new createjs.Container();
	        marquee_con.mask = new createjs.Shape();
	        marquee_con.mask.graphics.beginFill("#fff").drawRect(0, 0, 550, 32);
	        marquee_con.mask.x = announcementText.x;
	        marquee_con.mask.y = announcementText.y;

	        let twin = announcementText.clone();
	        twin.x = announcementText.x + 1785; //textbounds.width + 400;
	        twin.y = announcementText.y;
	        marquee_con.addChild(announcementText, twin);

	        let marquee = function(obj) {
	          	let toX = obj.x - 1785;
	          	createjs.Tween.get(obj, {loop:true}).to({
	            	x : toX
	          	}, 16000)
	        }

	        marquee(announcementText);
	        marquee(twin);
	        this.announcementCon.addChild(marquee_con);

			this.announcementCon.visible = true;
		}
	});

	return instance;
}