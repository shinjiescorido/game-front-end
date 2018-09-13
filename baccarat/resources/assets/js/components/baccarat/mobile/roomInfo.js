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
			this.y = 220;
			this.x = 0;
			this.visible = false;

			let roomInfoBg = new createjs.Shape();
			roomInfoBg.graphics.beginFill('#000').drawRoundRectComplex(0, 0, 405, 240, 0, 10, 10, 0);
			roomInfoBg.alpha = 0.8;
			this.addChild(roomInfoBg);

			// Marks
			let playerMark = new createjs.Shape();
			playerMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 11);
			playerMark.x = 25;
			playerMark.y = 30;
			this.addChild(playerMark);

			let playerMarkText = new createjs.Text(window.language.locale == "zh" ? "闲" : "P", '16px Arial', '#fff');
			playerMarkText.x = 25;
			playerMarkText.y = playerMark.y - 8;
			playerMarkText.textAlign = 'center';
			this.addChild(playerMarkText);

			let playerPairMark = new createjs.Shape();
			playerPairMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 11);
			playerPairMark.x = 25;
			playerPairMark.y = playerMark.y + 45;
			this.addChild(playerPairMark);

			let playerCircle = new createjs.Shape();
			playerCircle.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 3);
			playerCircle.x = playerPairMark.x + 8;
			playerCircle.y = playerPairMark.y + 8;
			this.addChild(playerCircle);

			let playerPairMarkText = new createjs.Text(window.language.locale == "zh" ? "闲" : "P", '16px Arial', '#fff');
			playerPairMarkText.x = 25;
			playerPairMarkText.y = playerPairMark.y - 8;
			playerPairMarkText.textAlign = 'center';
			this.addChild(playerPairMarkText);

			let bankerMark = new createjs.Shape();
			bankerMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 11);
			bankerMark.x = 25;
			bankerMark.y = playerPairMark.y + 45;
			this.addChild(bankerMark);

			let bankerMarkText = new createjs.Text(window.language.locale == "zh" ? "庄" : "B", '16px Arial', '#fff');
			bankerMarkText.x = bankerMark.x;
			bankerMarkText.y = bankerMark.y - 8;
			bankerMarkText.textAlign = 'center';
			this.addChild(bankerMarkText);

			let bankerPairMark = new createjs.Shape();
			bankerPairMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 11);
			bankerPairMark.x = 25;
			bankerPairMark.y = bankerMark.y + 45;
			this.addChild(bankerPairMark);

			let bankerPairMarkText = new createjs.Text(window.language.locale == "zh" ? "庄" : "B", '16px Arial', '#fff');
			bankerPairMarkText.x = bankerPairMark.x;
			bankerPairMarkText.y = bankerPairMark.y - 8;
			bankerPairMarkText.textAlign = 'center';
			this.addChild(bankerPairMarkText);

			let bankerCircle = new createjs.Shape();
			bankerCircle.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 3);
			bankerCircle.x = bankerPairMark.x - 8;
			bankerCircle.y = bankerPairMark.y - 8;
			this.addChild(bankerCircle);

			let tiePairMark = new createjs.Shape();
			tiePairMark.graphics.ss(1).beginStroke('#fff').beginFill('#689f38').drawCircle(0, 0, 11);
			tiePairMark.x = 25;
			tiePairMark.y = bankerPairMark.y + 45;
			this.addChild(tiePairMark);

			let tieMarkText = new createjs.Text(window.language.locale == "zh" ? '和' : 'T', '16px Arial', '#fff');
			tieMarkText.x = tiePairMark.x;
			tieMarkText.y = tiePairMark.y - 8;
			tieMarkText.textAlign = 'center';
			this.addChild(tieMarkText);

			if (window.language.locale == 'zh') {
				playerMarkText.font = '14px Arial';
				playerPairMarkText.font = '14px Arial';
				bankerMarkText.font = '14px Arial';
				bankerPairMarkText.font = '14px Arial';
				tieMarkText.font = '14px Arial';
			}

			// Percentage bar
			this.playerPercBar = new createjs.Shape();
			this.playerPercBar.graphics.beginFill('#1565c0').drawRect(0, 0, 130, 15);
			this.playerPercBar.setBounds(0, 0, 130, 15);
			this.playerPercBar.x = 45;
			this.playerPercBar.y = 23;
			this.playerPercBar.scaleX = 0;
			this.addChild(this.playerPercBar);

			this.playerPairPercBar = new createjs.Shape();
			this.playerPairPercBar.graphics.beginFill('#1565c0').drawRect(0, 0, 130, 15);
			this.playerPairPercBar.setBounds(0, 0, 130, 15);
			this.playerPairPercBar.x = 45;
			this.playerPairPercBar.y = this.playerPercBar.y + 45;
			this.playerPairPercBar.scaleX = 0;
			this.addChild(this.playerPairPercBar);

			this.bankerPercBar = new createjs.Shape();
			this.bankerPercBar.graphics.beginFill('#d32f2f').drawRect(0, 0, 130, 15);
			this.bankerPercBar.setBounds(0, 0, 130, 15);
			this.bankerPercBar.x = 45;
			this.bankerPercBar.y = this.playerPairPercBar.y + 45;
			this.bankerPercBar.scaleX = 0;
			this.addChild(this.bankerPercBar);

			this.bankerPairPercBar = new createjs.Shape();
			this.bankerPairPercBar.graphics.beginFill('#d32f2f').drawRect(0, 0, 130, 15);
			this.bankerPairPercBar.setBounds(0, 0, 130, 15);
			this.bankerPairPercBar.x = 45;
			this.bankerPairPercBar.y = this.bankerPercBar.y + 45;
			this.bankerPairPercBar.scaleX = 0;
			this.addChild(this.bankerPairPercBar);

			this.tiePercBar = new createjs.Shape();
			this.tiePercBar.graphics.beginFill('#689f38').drawRect(0, 0, 130, 15);
			this.tiePercBar.setBounds(0, 0, 130, 15);
			this.tiePercBar.x = 45;
			this.tiePercBar.y = this.bankerPairPercBar.y + 45;
			this.tiePercBar.scaleX = 0;
			this.addChild(this.tiePercBar);

			// Percentage
			this.playerPerc = new createjs.Text('0%', '25px Bebasneue', '#1565c0');
			this.playerPerc.x = 50;
			this.playerPerc.y = 16;
			this.playerPerc.textAlign = 'left';
			this.addChild(this.playerPerc);

			this.playerPairPerc = new createjs.Text('0%', '25px Bebasneue', '#1565c0');
			this.playerPairPerc.x = 50;
			this.playerPairPerc.y = this.playerPerc.y + 45;
			this.playerPairPerc.textAlign = 'left';
			this.addChild(this.playerPairPerc);

			this.bankerPerc = new createjs.Text('0%', '25px Bebasneue', '#d32f2f');
			this.bankerPerc.x = 50;
			this.bankerPerc.y = this.playerPairPerc.y + 45;
			this.bankerPerc.textAlign = 'left';
			this.addChild(this.bankerPerc);

			this.bankerPairPerc = new createjs.Text('0%', '25px Bebasneue', '#d32f2f');
			this.bankerPairPerc.x = 50;
			this.bankerPairPerc.y = this.bankerPerc.y + 45;
			this.bankerPairPerc.textAlign = 'left';
			this.addChild(this.bankerPairPerc);

			this.tiePerc = new createjs.Text('0%', '25px Bebasneue', '#689f38');
			this.tiePerc.x = 50;
			this.tiePerc.y = this.bankerPairPerc.y + 45;
			this.tiePerc.textAlign = 'left';
			this.addChild(this.tiePerc);

			// Total bets
			this.playerBets = new createjs.Text('0', '25px Bebasneue', '#fff');
			this.playerBets.x = 335;
			this.playerBets.y = 16;
			this.playerBets.textAlign = 'right';
			this.addChild(this.playerBets);

			this.playerPairBets = new createjs.Text('0', '25px Bebasneue', '#fff');
			this.playerPairBets.x = 335;
			this.playerPairBets.y = this.playerBets.y + 45;
			this.playerPairBets.textAlign = 'right';
			this.addChild(this.playerPairBets);

			this.bankerBets = new createjs.Text('0', '25px Bebasneue', '#fff');
			this.bankerBets.x = 335;
			this.bankerBets.y = this.playerPairBets.y + 45;
			this.bankerBets.textAlign = 'right';
			this.addChild(this.bankerBets);

			this.bankerPairBets = new createjs.Text('0', '25px Bebasneue', '#fff');
			this.bankerPairBets.x = 335;
			this.bankerPairBets.y = this.bankerBets.y + 45;
			this.bankerPairBets.textAlign = 'right';
			this.addChild(this.bankerPairBets);

			this.tieBets = new createjs.Text('0', '25px Bebasneue', '#fff');
			this.tieBets.x = 335;
			this.tieBets.y = this.bankerPairBets.y + 45;
			this.tieBets.textAlign = 'right';
			this.addChild(this.tieBets);

			// Users
			let userIcon = [];
			for (var i = 0; i < 5; i++) {
				userIcon[i] = new createjs.Bitmap(this.context.getResources('user_ico'));
				userIcon[i].x = 350;
				userIcon[i].y = 21 + (i * 45);
				userIcon[i].scaleX = userIcon[i].scaleY = 1.3;
				this.addChild(userIcon[i]);
			}

			this.playerUsers = new createjs.Text('0', '18px Bebasneue', '#a1a1a1')
			this.playerUsers.x = 392;
			this.playerUsers.y = 22;
			this.playerUsers.textAlign = 'right';
			this.addChild(this.playerUsers);

			this.playerPairUsers = new createjs.Text('0', '18px Bebasneue', '#a1a1a1')
			this.playerPairUsers.x = 392;
			this.playerPairUsers.y = this.playerUsers.y + 45;
			this.playerPairUsers.textAlign = 'right';
			this.addChild(this.playerPairUsers);

			this.bankerUsers = new createjs.Text('0', '18px Bebasneue', '#a1a1a1');
			this.bankerUsers.x = 392;
			this.bankerUsers.y = this.playerPairUsers.y + 45;
			this.bankerUsers.textAlign = 'right';
			this.addChild(this.bankerUsers);

			this.bankerPairUsers = new createjs.Text('0', '18px Bebasneue', '#a1a1a1');
			this.bankerPairUsers.x = 392;
			this.bankerPairUsers.y = this.bankerUsers.y + 45;
			this.bankerPairUsers.textAlign = 'right';
			this.addChild(this.bankerPairUsers);

			this.tieUsers = new createjs.Text('0', '18px Bebasneue', '#a1a1a1')
			this.tieUsers.x = 392;
			this.tieUsers.y = this.bankerPairUsers.y + 45;
			this.tieUsers.textAlign = 'right';
			this.addChild(this.tieUsers);
		},

		updateInfo(data) {
			this.resetData();
			
			if (!data) return;

			let playerBetAmt = 0;
			let playerPairBetAmt = 0;
			let bankerBetAmt = 0;
			let bankerPairBetAmt = 0;
			let tieBetAmt = 0;
			let totalBetCount = 0;

			if (data.player) {
				playerBetAmt = data.player.totalBets;
				totalBetCount += data.player.totalBets;

				this.playerBets.text = numberWithCommas(data.player.totalBets);
				this.playerUsers.text = numberWithCommas(data.player.totalUsers);

				if (data.player.totalUsers > 1000) {
					this.playerUsers.text = (data.player.totalUsers / 1000) + 'K';
				}
			}

			if (data.playerpair) {
				playerPairBetAmt = data.playerpair.totalBets;
				totalBetCount += data.playerpair.totalBets;

				this.playerPairBets.text = numberWithCommas(data.playerpair.totalBets);
				this.playerPairUsers.text = numberWithCommas(data.playerpair.totalUsers);

				if (data.playerpair.totalUsers > 1000) {
					this.playerPairUsers.text = (data.playerpair.totalUsers / 1000) + 'K';
				}
			}

			if (data.banker) {
				bankerBetAmt = data.banker.totalBets;
				totalBetCount += data.banker.totalBets;

				this.bankerBets.text = numberWithCommas(data.banker.totalBets);
				this.bankerUsers.text = numberWithCommas(data.banker.totalUsers);
				
				if (data.banker.totalUsers > 1000) {
					this.bankerUsers.text = (data.banker.totalUsers / 1000) + 'K';
				}
			}

			if (data.bankerpair) {
				bankerPairBetAmt = data.bankerpair.totalBets;
				totalBetCount += data.bankerpair.totalBets;

				this.bankerPairBets.text = numberWithCommas(data.bankerpair.totalBets);
				this.bankerPairUsers.text = numberWithCommas(data.bankerpair.totalUsers);
				
				if (data.bankerpair.totalUsers > 1000) {
					this.bankerPairUsers.text = (data.bankerpair.totalUsers / 1000) + 'K';
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
				let playerPerc = Math.round((playerBetAmt / totalBetCount) * 100);
				let playerPairPerc =  Math.round((playerPairBetAmt / totalBetCount) * 100);
				let bankerPerc = Math.round((bankerBetAmt / totalBetCount) * 100);
				let bankerPairPerc = Math.round((bankerPairBetAmt / totalBetCount) * 100);
				let totalPerc = playerPerc + playerPairPerc + bankerPerc + bankerPairPerc;

				this.playerPercBar.scaleX = playerBetAmt / totalBetCount;
				this.playerPairPercBar.scaleX = playerPairBetAmt / totalBetCount;
				this.bankerPercBar.scaleX = bankerBetAmt / totalBetCount;
				this.bankerPairPercBar.scaleX = bankerPairBetAmt / totalBetCount;
				this.tiePercBar.scaleX = tieBetAmt / totalBetCount;

				let remainder = 0;
				if ((playerPerc + playerPairPerc + bankerPerc + bankerPairPerc) > 100) {
					remainder = totalPerc - 100;

					if (bankerPairPerc !== 0) {
						bankerPairPerc -= remainder;
					}
					else if (playerPairPerc !== 0) {
						playerPairPerc -= remainder;
					}
				}
				else if ((playerPerc + playerPairPerc + bankerPerc + bankerPairPerc) < 100 && !data.tie) {
					remainder = 100 - totalPerc;

					if (bankerPairPerc !== 0) {
						bankerPairPerc += remainder;
					}
					else if (playerPairPerc !== 0) {
						playerPairPerc += remainder;
					}
				}

				this.playerPerc.x = this.playerPercBar.x + this.playerPercBar.getTransformedBounds().width + 5;
				this.playerPairPerc.x = this.playerPairPercBar.x + this.playerPairPercBar.getTransformedBounds().width + 5;
				this.bankerPerc.x = this.bankerPercBar.x + this.bankerPercBar.getTransformedBounds().width + 5;
				this.bankerPairPerc.x = this.bankerPairPercBar.x + this.bankerPairPercBar.getTransformedBounds().width + 5;
				this.tiePerc.x = this.tiePercBar.x + this.tiePercBar.getTransformedBounds().width + 5;

				this.playerPerc.text = playerPerc + '%';
				this.playerPairPerc.text = playerPairPerc + '%';
				this.bankerPerc.text = bankerPerc + '%';
				this.bankerPairPerc.text = bankerPairPerc + '%';
				this.tiePerc.text = (100 - (playerPerc + playerPairPerc + bankerPerc + bankerPairPerc)) + '%';
			}
			else {
				this.playerPercBar.scaleX = 0;
				this.playerPairPercBar.scaleX = 0;
				this.bankerPercBar.scaleX = 0;
				this.bankerPairPercBar.scaleX = 0;
				this.tiePercBar.scaleX = 0;

				this.playerPerc.text = '0%';
				this.playerPairPerc.text = '0%';
				this.bankerPerc.text = '0%';
				this.bankerPairPerc.text = '0%';
				this.tiePerc.text = '0%';
			}
		},

		resetData() {
			this.playerBets.text = 0;
			this.playerPairBets.text = 0;
			this.bankerBets.text = 0;
			this.bankerPairBets.text = 0;
			this.tieBets.text = 0;

			this.playerUsers.text = 0;
			this.playerPairUsers.text = 0;
			this.bankerUsers.text = 0;
			this.bankerPairUsers.text = 0;
			this.tieUsers.text = 0;

			this.playerPerc.x = 50;
			this.playerPairPerc.x = 50;
			this.bankerPerc.x = 50;
			this.bankerPairPerc.x = 50;
			this.tiePerc.x = 50;

			this.playerPercBar.scaleX = 0;
			this.playerPairPercBar.scaleX = 0;
			this.bankerPercBar.scaleX = 0;
			this.bankerPairPercBar.scaleX = 0;
			this.tiePercBar.scaleX = 0;

			this.playerPerc.text = '0%';
			this.playerPairPerc.text = '0%';
			this.bankerPerc.text = '0%';
			this.bankerPairPerc.text = '0%';
			this.tiePerc.text = '0%';
		}
	});

	return instance;
}
