import { moneyFormat, numberWithCommas } from '../../../factories/factories';

/**
 * menuChips.js
 * @author Kevin Villanueva
 * @since 2018.02.25
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 * Handles all room info functionalities
**/

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
			this.y = 250;
			this.x = 0;
			this.visible = false;

			let roomInfoBg = new createjs.Shape();
			roomInfoBg.graphics.beginFill('#000').drawRoundRectComplex(0, 0, 405, 150, 0, 10, 10, 0);
			roomInfoBg.alpha = 0.8;
			this.addChild(roomInfoBg);

			// Marks
			let dragonMark = new createjs.Shape();
			dragonMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 11);
			dragonMark.x = 25;
			dragonMark.y = 30;
			this.addChild(dragonMark);

			let dragonMarkText = new createjs.Text(window.language.locale == "zh" ? '龙' : 'D', '16px Arial', '#fff');
			dragonMarkText.x = dragonMark.x;
			dragonMarkText.y = dragonMark.y - 9.5;
			dragonMarkText.textAlign = 'center';
			this.addChild(dragonMarkText);

			let tigerMark = new createjs.Shape();
			tigerMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 11);
			tigerMark.x = dragonMark.x;
			tigerMark.y = dragonMark.y + 45;
			this.addChild(tigerMark);

			let tigerMarkText = new createjs.Text(window.language.locale == "zh" ? '虎' : 'T', '16px Arial', '#fff');
			tigerMarkText.x = tigerMark.x;
			tigerMarkText.y = tigerMark.y - 8;
			tigerMarkText.textAlign = 'center';
			this.addChild(tigerMarkText);

			let tieMark = new createjs.Shape();
			tieMark.graphics.ss(1).beginStroke('#fff').beginFill('#689f38').drawCircle(0, 0, 11);
			tieMark.x = tigerMark.x;
			tieMark.y = tigerMark.y + 45;
			this.addChild(tieMark);

			let tieMarkText = new createjs.Text(window.language.locale == "zh" ? '和' : 'T', '16px Arial', '#fff');
			tieMarkText.x = tieMark.x;
			tieMarkText.y = tieMark.y - 8;
			tieMarkText.textAlign = 'center';
			this.addChild(tieMarkText);

			if (window.language.locale == 'zh') {
				dragonMarkText.font = '14px Arial';
				tigerMarkText.font = '14px Arial';
				tieMarkText.font = '14px Arial';
			}

			// Percentage bar
			this.dragonPercBar = new createjs.Shape();
			this.dragonPercBar.graphics.beginFill('#1565c0').drawRect(0, 0, 130, 15);
			this.dragonPercBar.setBounds(0, 0, 130, 15);
			this.dragonPercBar.x = 45;
			this.dragonPercBar.y = 23;
			this.dragonPercBar.scaleX = 0;
			this.addChild(this.dragonPercBar);

			this.tigerPercBar = new createjs.Shape();
			this.tigerPercBar.graphics.beginFill('#d32f2f').drawRect(0, 0, 130, 15);
			this.tigerPercBar.setBounds(0, 0, 130, 15);
			this.tigerPercBar.x = 45;
			this.tigerPercBar.y = this.dragonPercBar.y + 45;
			this.tigerPercBar.scaleX = 0;
			this.addChild(this.tigerPercBar);

			this.tiePercBar = new createjs.Shape();
			this.tiePercBar.graphics.beginFill('#689f38').drawRect(0, 0, 130, 15);
			this.tiePercBar.setBounds(0, 0, 130, 15);
			this.tiePercBar.x = 45;
			this.tiePercBar.y = this.tigerPercBar.y + 45;
			this.tiePercBar.scaleX = 0;
			this.addChild(this.tiePercBar);

			// Percentage
			this.dragonPerc = new createjs.Text('0%', '25px bebas-regular', '#1565c0');
			this.dragonPerc.x = 50;
			this.dragonPerc.y = 16;
			this.dragonPerc.textAlign = 'left';
			this.addChild(this.dragonPerc);

			this.tigerPerc = new createjs.Text('0%', '25px bebas-regular', '#d32f2f');
			this.tigerPerc.x = 50;
			this.tigerPerc.y = this.dragonPerc.y + 45;
			this.tigerPerc.textAlign = 'left';
			this.addChild(this.tigerPerc);

			this.tiePerc = new createjs.Text('0%', '25px bebas-regular', '#689f38');
			this.tiePerc.x = 50;
			this.tiePerc.y = this.tigerPerc.y + 45;
			this.tiePerc.textAlign = 'left';
			this.addChild(this.tiePerc);

			// Total bets
			this.dragonBets = new createjs.Text('0', '25px bebas-regular', '#fff');
			this.dragonBets.x = 335;
			this.dragonBets.y = 16;
			this.dragonBets.textAlign = 'right';
			this.addChild(this.dragonBets);

			this.tigerBets = new createjs.Text('0', '25px bebas-regular', '#fff');
			this.tigerBets.x = 335;
			this.tigerBets.y = this.dragonBets.y + 45;
			this.tigerBets.textAlign = 'right';
			this.addChild(this.tigerBets);

			this.tieBets = new createjs.Text('0', '25px bebas-regular', '#fff');
			this.tieBets.x = 335;
			this.tieBets.y = this.tigerBets.y + 45;
			this.tieBets.textAlign = 'right';
			this.addChild(this.tieBets);

			// Users
			let userIcon = [];
			for (var i = 0; i < 3; i++) {
				userIcon[i] = new createjs.Bitmap(this.context.getResources('user_ico'));
				userIcon[i].x = 350;
				userIcon[i].y = 21 + (i * 45);
				userIcon[i].scaleX = userIcon[i].scaleY = 1.3;
				this.addChild(userIcon[i]);
			}

			this.dragonUsers = new createjs.Text('0', '18px bebas-regular', '#a1a1a1')
			this.dragonUsers.x = 392;
			this.dragonUsers.y = 22;
			this.dragonUsers.textAlign = 'right';
			this.addChild(this.dragonUsers);

			this.tigerUsers = new createjs.Text('0', '18px bebas-regular', '#a1a1a1')
			this.tigerUsers.x = 392;
			this.tigerUsers.y = this.dragonUsers.y + 45;
			this.tigerUsers.textAlign = 'right';
			this.addChild(this.tigerUsers);

			this.tieUsers = new createjs.Text('0', '18px bebas-regular', '#a1a1a1');
			this.tieUsers.x = 392;
			this.tieUsers.y = this.tigerUsers.y + 45;
			this.tieUsers.textAlign = 'right';
			this.addChild(this.tieUsers);
		},

		updateInfo(data) {
			this.resetData();
			
			if (!data) return;

			let dragonBetAmt = 0;
			let tigerBetAmt = 0;
			let tieBetAmt = 0;
			let totalBetCount = 0;

			if (data.dragon) {
				dragonBetAmt = data.dragon.totalBets;
				totalBetCount += data.dragon.totalBets;

				this.dragonBets.text = numberWithCommas(data.dragon.totalBets);
				this.dragonUsers.text = numberWithCommas(data.dragon.totalUsers);

				if (data.dragon.totalUsers > 1000) {
					this.dragonUsers.text = (data.dragon.totalUsers / 1000) + 'K';
				}
			}

			if (data.tiger) {
				tigerBetAmt = data.tiger.totalBets;
				totalBetCount += data.tiger.totalBets;

				this.tigerBets.text = numberWithCommas(data.tiger.totalBets);
				this.tigerUsers.text = numberWithCommas(data.tiger.totalUsers);

				if (data.tiger.totalUsers > 1000) {
					this.tigerUsers.text = (data.tiger.totalUsers / 1000) + 'K';
				}
			}

			if (data.tie) {
				tieBetAmt = data.tie.totalBets;
				totalBetCount += data.tie.totalBets;

				this.tieBets.text = numberWithCommas(data.tie.totalBets);
				this.tieUsers.text = numberWithCommas(data.tie.totalUsers);
				
				if (data.tie.totalUsers > 1000) {
					this.tieUsers.text = (data.tie.totalUsers / 1000) + 'K';
				}
			}

			if (parseInt(totalBetCount) !== 0) {
				let dragonPerc = Math.round((dragonBetAmt / totalBetCount) * 100);
				let tigerPerc =  Math.round((tigerBetAmt / totalBetCount) * 100);
				let tiePerc = Math.round((tieBetAmt / totalBetCount) * 100);
				let totalPerc = dragonPerc + tigerPerc + tiePerc;

				this.dragonPercBar.scaleX = dragonBetAmt / totalBetCount;
				this.tigerPercBar.scaleX = tigerBetAmt / totalBetCount;
				this.tiePercBar.scaleX = tieBetAmt / totalBetCount;

				this.dragonPerc.text = `${dragonPerc}%`;
				this.tigerPerc.text = `${tigerPerc}%`;
				this.tiePerc.text = `${tiePerc}%`;

				this.dragonPerc.x = this.dragonPercBar.x + this.dragonPercBar.getTransformedBounds().width + 5;
				this.tigerPerc.x = this.tigerPercBar.x + this.tigerPercBar.getTransformedBounds().width + 5;
				this.tiePerc.x = this.tiePercBar.x + this.tiePercBar.getTransformedBounds().width + 5;
			}
			else {
				this.dragonPercBar.scaleX = 0;
				this.tigerPercBar.scaleX = 0;
				this.tiePercBar.scaleX = 0;

				this.dragonPerc.text = '0%';
				this.tigerPerc.text = '0%';
				this.tiePerc.text = '0%';
			}
		},

		resetData() {
			this.dragonBets.text = 0;
			this.tigerBets.text = 0;
			this.tieBets.text = 0;
			
			this.dragonUsers.text = 0;
			this.tigerUsers.text = 0;
			this.tieUsers.text = 0;

			this.dragonPercBar.scaleX = 0;
			this.tigerPercBar.scaleX = 0;
			this.tiePercBar.scaleX = 0;

			this.dragonPerc.x = 50;
			this.tigerPerc.x = 50;
			this.tiePerc.x = 50;

			this.dragonPerc.text = '0%';
			this.tigerPerc.text = '0%';
			this.tiePerc.text = '0%';
		}
	});

	return instance;
}
