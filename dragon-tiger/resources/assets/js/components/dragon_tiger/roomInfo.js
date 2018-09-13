import { moneyFormat, numberWithCommas } from '../../factories/factories';

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
			this.y = 10;
			this.x = 1410;
			// this.visible = false;

			// let roomInfoBg = new createjs.Shape();
			// roomInfoBg.graphics.beginFill('#000').drawRoundRect(0, 0, 400, 190, 5);
			// roomInfoBg.alpha = 0.8;
			// this.addChild(roomInfoBg);

			// Marks
			// let dragonMark = new createjs.Shape();
			// dragonMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 11);
			// dragonMark.x = 25;
			// dragonMark.y = 30;
			// this.addChild(dragonMark);
			//
			// let dragonMarkText = new createjs.Text(window.language.locale == "zh" ? '龙' : 'D', '16px Arial', '#fff');
			// dragonMarkText.x = dragonMark.x;
			// dragonMarkText.y = dragonMark.y - 9.5;
			// dragonMarkText.textAlign = 'center';
			// this.addChild(dragonMarkText);
			//
			// let tigerMark = new createjs.Shape();
			// tigerMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 11);
			// tigerMark.x = dragonMark.x;
			// tigerMark.y = dragonMark.y + 45;
			// this.addChild(tigerMark);
			//
			// let tigerMarkText = new createjs.Text(window.language.locale == "zh" ? '虎' : 'T', '16px Arial', '#fff');
			// tigerMarkText.x = tigerMark.x;
			// tigerMarkText.y = tigerMark.y - 8;
			// tigerMarkText.textAlign = 'center';
			// this.addChild(tigerMarkText);
			//
			// let tieMark = new createjs.Shape();
			// tieMark.graphics.ss(1).beginStroke('#fff').beginFill('#689f38').drawCircle(0, 0, 11);
			// tieMark.x = tigerMark.x;
			// tieMark.y = tigerMark.y + 45;
			// this.addChild(tieMark);
			//
			// let tieMarkText = new createjs.Text(window.language.locale == "zh" ? '和' : 'T', '16px Arial', '#fff');
			// tieMarkText.x = tieMark.x;
			// tieMarkText.y = tieMark.y - 8;
			// tieMarkText.textAlign = 'center';
			// this.addChild(tieMarkText);
			//
			// if (window.language.locale == 'zh') {
			// 	dragonMarkText.font = '14px Arial';
			// 	tigerMarkText.font = '14px Arial';
			// 	tieMarkText.font = '14px Arial';
			// }

			// Percentage
			// let dragonText = new createjs.Text(window.language.game_specific.dragon, 'bold 22px lato-regular', '#1565c0');
			// dragonText.x = 50;
			// dragonText.y = 15;
			// this.addChild(dragonText);
			//
			// this.dragonPerc = new createjs.Text('0%', '25px bebas-regular', '#1565c0');
			// this.dragonPerc.x = dragonText.x + 125;
			// this.dragonPerc.y = dragonText.y - 1;
			// this.dragonPerc.textAlign = 'right';
			// this.addChild(this.dragonPerc);
			//
			// let tigerText = new createjs.Text(window.language.game_specific.tiger, 'bold 22px lato-regular', '#d32f2f');
			// tigerText.x = dragonText.x;
			// tigerText.y = dragonText.y + 45;
			// this.addChild(tigerText);
			//
			// this.tigerPerc = new createjs.Text('0%', '25px bebas-regular', '#d32f2f');
			// this.tigerPerc.x = tigerText.x + 125;
			// this.tigerPerc.y = tigerText.y - 1;
			// this.tigerPerc.textAlign = 'right';
			// this.addChild(this.tigerPerc);
			//
			// let tieText = new createjs.Text(window.language.game_specific.tie, 'bold 22px lato-regular', '#689f38');
			// tieText.x = tigerText.x;
			// tieText.y = tigerText.y + 45;
			// this.addChild(tieText);
			//
			// this.tiePerc = new createjs.Text('0%', '25px bebas-regular', '#689f38');
			// this.tiePerc.x = tieText.x + 125;
			// this.tiePerc.y = tieText.y - 1;
			// this.tiePerc.textAlign = 'right';
			// this.addChild(this.tiePerc);
			//
			// // Percentage bar
			// this.dragonPercBar = new createjs.Shape();
			// this.dragonPercBar.graphics.beginFill('#1565c0').drawRect(0, 0, 125, 8);
			// this.dragonPercBar.x = 50;
			// this.dragonPercBar.y = 43;
			// this.dragonPercBar.scaleX = 0;
			// this.addChild(this.dragonPercBar);
			//
			// this.tigerPercBar = new createjs.Shape();
			// this.tigerPercBar.graphics.beginFill('#d32f2f').drawRect(0, 0, 125, 8);
			// this.tigerPercBar.x = 50;
			// this.tigerPercBar.y = this.dragonPercBar.y + 45;
			// this.tigerPercBar.scaleX = 0;
			// this.addChild(this.tigerPercBar);
			//
			// this.tiePercBar = new createjs.Shape();
			// this.tiePercBar.graphics.beginFill('#689f38').drawRect(0, 0, 125, 8);
			// this.tiePercBar.x = 50;
			// this.tiePercBar.y = this.tigerPercBar.y + 45;
			// this.tiePercBar.scaleX = 0;
			// this.addChild(this.tiePercBar);
			//
			// // Total bets
			// this.dragonBets = new createjs.Text('0', '25px bebas-regular', '#fff');
			// this.dragonBets.x = 300;
			// this.dragonBets.y = 14;
			// this.dragonBets.textAlign = 'right';
			// this.addChild(this.dragonBets);
			//
			// this.tigerBets = new createjs.Text('0', '25px bebas-regular', '#fff');
			// this.tigerBets.x = this.dragonBets.x;
			// this.tigerBets.y = this.dragonBets.y + 45;
			// this.tigerBets.textAlign = 'right';
			// this.addChild(this.tigerBets);
			//
			// this.tieBets = new createjs.Text('0', '25px bebas-regular', '#fff');
			// this.tieBets.x = this.dragonBets.x;
			// this.tieBets.y = this.tigerBets.y + 45;
			// this.tieBets.textAlign = 'right';
			// this.addChild(this.tieBets);
			//
			// this.totalBets = new createjs.Text('0', '25px bebas-regular', '#fff');
			// this.totalBets.x = this.tieBets.x;
			// this.totalBets.y = this.tieBets.y + 45;
			// this.totalBets.textAlign = 'right';
			// this.addChild(this.totalBets);
			//
			// let moneyIcon = new createjs.Bitmap(this.context.getResources('money_ico'));
			// moneyIcon.x = this.totalBets.x - 135;
			// moneyIcon.y = this.totalBets.y + 1;
			// moneyIcon.scaleX = moneyIcon.scaleY = 1.3;
			// this.addChild(moneyIcon);

			// Users
			// let userIcon = [];
			// for (var i = 0; i < 3; i++) {
			// 	userIcon[i] = new createjs.Bitmap(this.context.getResources('user_ico'));
			// 	userIcon[i].x = 325;
			// 	userIcon[i].y = 19 + (i * 45);
			// 	userIcon[i].scaleX = userIcon[i].scaleY = 1.3;
			// 	this.addChild(userIcon[i]);
			// }

			// this.dragonUsers = new createjs.Text('0', '18px bebas-regular', '#a1a1a1')
			// this.dragonUsers.x = 385;
			// this.dragonUsers.y = 19;
			// this.dragonUsers.textAlign = 'right';
			// this.addChild(this.dragonUsers);
			//
			// this.tigerUsers = new createjs.Text('0', '18px bebas-regular', '#a1a1a1');
			// this.tigerUsers.x = 385;
			// this.tigerUsers.y = this.dragonUsers.y + 45;
			// this.tigerUsers.textAlign = 'right';
			// this.addChild(this.tigerUsers);
			//
			// this.tieUsers = new createjs.Text('0', '18px bebas-regular', '#a1a1a1')
			// this.tieUsers.x = 385;
			// this.tieUsers.y = this.tigerUsers.y + 45;
			// this.tieUsers.textAlign = 'right';
			// this.addChild(this.tieUsers);
			//
			// this.totalUsers = new createjs.Text('0', '18px bebas-regular', '#a1a1a1');
			// this.totalUsers.x = 385;
			// this.totalUsers.y = this.tieUsers.y + 45;
			// this.totalUsers.textAlign = 'right';
			// this.addChild(this.totalUsers);
			//
			// let totalUsersIcon = new createjs.Bitmap(this.context.getResources('total_user_ico'));
			// totalUsersIcon.x = 318;
			// totalUsersIcon.y = this.totalUsers.y - 2;
			// totalUsersIcon.scaleX = totalUsersIcon.scaleY = 1.3;
			// this.addChild(totalUsersIcon);

			// $('.bets-dragon').text('0');
			// $('.bets-dragonplayer').text('0');
			//
			// $('.bets-tiger').text('0');
			// $('.bets-tigerplayer').text('0');
			//
			// $('.bets-tie').text('0');
			// $('.bets-tieplayer').text('0');
			//
			// $('.bets-total').text('0');
			// $('.bets-totalplayer').text('0');
		},

		updateInfo(data, totalBettingUsers) {
			this.resetData();

			if (totalBettingUsers) {
				// this.totalUsers.text = numberWithCommas(totalBettingUsers);
				$('.bets-totalplayer').text(numberWithCommas(totalBettingUsers));
			}

			if (!data) return;

			let dragonBetAmt = 0;
			let tigerBetAmt = 0;
			let tieBetAmt = 0;
			let totalBetCount = 0;

			if (data.dragon) {
				dragonBetAmt = data.dragon.totalBets;

				// this.dragonBets.text = numberWithCommas(data.dragon.totalBets);
				// this.dragonUsers.text = numberWithCommas(data.dragon.totalUsers);
				$('.bets-dragon').text(numberWithCommas(data.dragon.totalBets));
				$('.bets-dragonplayer').text(numberWithCommas(data.dragon.totalUsers));

				totalBetCount += data.dragon.totalBets;
			}

			if (data.tiger) {
				tigerBetAmt = data.tiger.totalBets;

				// this.tigerBets.text = numberWithCommas(data.tiger.totalBets);
				// this.tigerUsers.text = numberWithCommas(data.tiger.totalUsers);
				$('.bets-tiger').text(numberWithCommas(data.tiger.totalBets));
				$('.bets-tigerplayer').text(numberWithCommas(data.tiger.totalUsers));

				totalBetCount += data.tiger.totalBets;
			}

			if (data.tie) {
				tieBetAmt = data.tie.totalBets;

				// this.tieBets.text = numberWithCommas(data.tie.totalBets);
				// this.tieUsers.text = numberWithCommas(data.tie.totalUsers);
				$('.bets-tie').text(numberWithCommas(data.tie.totalBets));
				$('.bets-tieplayer').text(numberWithCommas(data.tie.totalUsers));

				totalBetCount += data.tie.totalBets;
			}

			// this.totalBets.text = numberWithCommas(totalBetCount);

			$('.bets-total').text(numberWithCommas(totalBetCount));

			if (parseInt(totalBetCount) !== 0) {
				let dragonPerc = Math.round((dragonBetAmt / totalBetCount) * 100);
				let tigerPerc =  Math.round((tigerBetAmt / totalBetCount) * 100);
				let tiePerc = Math.round((tieBetAmt / totalBetCount) * 100);
				let totalPerc = dragonPerc + tigerPerc + tiePerc;

				// this.dragonPercBar.scaleX = dragonBetAmt / totalBetCount;
				// this.tigerPercBar.scaleX = tigerBetAmt / totalBetCount;
				// this.tiePercBar.scaleX = tieBetAmt / totalBetCount;


				$('.bar--dragon .bar-inner').animate({ 'width' : dragonPerc+'%' },'fast');
				$('.bar--tiger .bar-inner').animate({ 'width' : tigerPerc+'%' },'fast');
				$('.bar--tie .bar-inner').animate({ 'width' : tiePerc+'%' },'fast');

				// this.dragonPerc.text = `${dragonPerc}%`;
				// this.tigerPerc.text = `${tigerPerc}%`;
				// this.tiePerc.text = `${tiePerc}%`;
			}
			else {
				// this.dragonPercBar.scaleX = 0;
				// this.tigerPercBar.scaleX = 0;
				// this.tiePercBar.scaleX = 0;
				//
				// this.dragonPerc.text = '0%';
				// this.tigerPerc.text = '0%';
				// this.tiePerc.text = '0%';
				$('.bets-dragon').text('0');
				$('.bets-dragonplayer').text('0');

				$('.bets-tiger').text('0');
				$('.bets-tigerplayer').text('0');

				$('.bets-tie').text('0');
				$('.bets-tieplayer').text('0');

				$('.bets-total').text('0');
				$('.bets-totalplayer').text('0');

				$('.bar--dragon .bar-inner').animate({ 'width' : 0 },'fast');
				$('.bar--tiger .bar-inner').animate({ 'width' : 0 },'fast');
				$('.bar--tie .bar-inner').animate({ 'width' : 0 },'fast');
			}
		},

		resetData() {
			$('.bets-dragon').text('0');
			$('.bets-dragonplayer').text('0');

			$('.bets-tiger').text('0');
			$('.bets-tigerplayer').text('0');

			$('.bets-tie').text('0');
			$('.bets-tieplayer').text('0');

			$('.bets-total').text('0');
			$('.bets-totalplayer').text('0');

			$('.bar--dragon .bar-inner').animate({ 'width' : 0 },'fast');
			$('.bar--tiger .bar-inner').animate({ 'width' : 0 },'fast');
			$('.bar--tie .bar-inner').animate({ 'width' : 0 },'fast');

			// this.dragonBets.text = 0;
			// this.tigerBets.text = 0;
			// this.tieBets.text = 0;
			// this.totalBets.text = 0;
			//
			// this.dragonUsers.text = 0;
			// this.tigerUsers.text = 0;
			// this.tieUsers.text = 0;
			// this.totalUsers.text = 0;
			//
			// this.dragonPercBar.scaleX = 0;
			// this.tigerPercBar.scaleX = 0;
			// this.tiePercBar.scaleX = 0;
			//
			// this.dragonPerc.text = '0%';
			// this.tigerPerc.text = '0%';
			// this.tiePerc.text = '0%';
		}
	});

	return instance;
}
