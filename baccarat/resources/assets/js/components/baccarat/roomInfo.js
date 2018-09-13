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
			// this.y = 5;
			// this.x = 1365;
			// this.visible = false;
			//
			// let roomInfoBg = new createjs.Shape();
			// roomInfoBg.graphics.beginFill('#000').drawRoundRect(0, 0, 450, 280, 5);
			// roomInfoBg.alpha = 0.8;
			// this.addChild(roomInfoBg);
			//
			// // Marks
			// let playerMark = new createjs.Shape();
			// playerMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 11);
			// playerMark.x = 25;
			// playerMark.y = 30;
			// this.addChild(playerMark);
			//
			// let playerMarkText = new createjs.Text(window.language.locale == "zh" ? "闲" : "P", '16px Arial', '#fff');
			// playerMarkText.x = 25;
			// playerMarkText.y = playerMark.y - 8;
			// playerMarkText.textAlign = 'center';
			// this.addChild(playerMarkText);
			//
			// let playerPairMark = new createjs.Shape();
			// playerPairMark.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 11);
			// playerPairMark.x = 25;
			// playerPairMark.y = playerMark.y + 45;
			// this.addChild(playerPairMark);
			//
			// let playerCircle = new createjs.Shape();
			// playerCircle.graphics.ss(1).beginStroke('#fff').beginFill('#1565c0').drawCircle(0, 0, 3);
			// playerCircle.x = playerPairMark.x + 8;
			// playerCircle.y = playerPairMark.y + 8;
			// this.addChild(playerCircle);
			//
			// let playerPairMarkText = new createjs.Text(window.language.locale == "zh" ? "闲" : "P", '16px Arial', '#fff');
			// playerPairMarkText.x = 25;
			// playerPairMarkText.y = playerPairMark.y - 8;
			// playerPairMarkText.textAlign = 'center';
			// this.addChild(playerPairMarkText);
			//
			// let bankerMark = new createjs.Shape();
			// bankerMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 11);
			// bankerMark.x = 25;
			// bankerMark.y = playerPairMark.y + 45;
			// this.addChild(bankerMark);
			//
			// let bankerMarkText = new createjs.Text(window.language.locale == "zh" ? "庄" : "B", '16px Arial', '#fff');
			// bankerMarkText.x = bankerMark.x;
			// bankerMarkText.y = bankerMark.y - 8;
			// bankerMarkText.textAlign = 'center';
			// this.addChild(bankerMarkText);
			//
			// let bankerPairMark = new createjs.Shape();
			// bankerPairMark.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 11);
			// bankerPairMark.x = 25;
			// bankerPairMark.y = bankerMark.y + 45;
			// this.addChild(bankerPairMark);
			//
			// let bankerPairMarkText = new createjs.Text(window.language.locale == "zh" ? "庄" : "B", '16px Arial', '#fff');
			// bankerPairMarkText.x = bankerPairMark.x;
			// bankerPairMarkText.y = bankerPairMark.y - 8;
			// bankerPairMarkText.textAlign = 'center';
			// this.addChild(bankerPairMarkText);
			//
			// let bankerCircle = new createjs.Shape();
			// bankerCircle.graphics.ss(1).beginStroke('#fff').beginFill('#d32f2f').drawCircle(0, 0, 3);
			// bankerCircle.x = bankerPairMark.x - 8;
			// bankerCircle.y = bankerPairMark.y - 8;
			// this.addChild(bankerCircle);
			//
			// let tiePairMark = new createjs.Shape();
			// tiePairMark.graphics.ss(1).beginStroke('#fff').beginFill('#689f38').drawCircle(0, 0, 11);
			// tiePairMark.x = 25;
			// tiePairMark.y = bankerPairMark.y + 45;
			// this.addChild(tiePairMark);
			//
			// let tieMarkText = new createjs.Text(window.language.locale == "zh" ? '和' : 'T', '16px Arial', '#fff');
			// tieMarkText.x = tiePairMark.x;
			// tieMarkText.y = tiePairMark.y - 8;
			// tieMarkText.textAlign = 'center';
			// this.addChild(tieMarkText);
			//
			// if (window.language.locale == 'zh') {
			// 	playerMarkText.font = '14px Arial';
			// 	playerPairMarkText.font = '14px Arial';
			// 	bankerMarkText.font = '14px Arial';
			// 	bankerPairMarkText.font = '14px Arial';
			// 	tieMarkText.font = '14px Arial';
			// }
			//
			// // Percentage
			// let playerText = new createjs.Text(window.language.game_specific.player, 'bold 22px Lato', '#1565c0');
			// playerText.x = 50;
			// playerText.y = 15;
			// this.addChild(playerText);
			//
			// this.playerPerc = new createjs.Text('0%', '25px Bebasneue', '#1565c0');
			// this.playerPerc.x = playerText.x + 170;
			// this.playerPerc.y = playerText.y - 1;
			// this.playerPerc.textAlign = 'right';
			// this.addChild(this.playerPerc);
			//
			// let playerPairText = new createjs.Text(window.language.game_specific.playerpair, 'bold 22px Lato', '#1565c0');
			// playerPairText.x = 50;
			// playerPairText.y = playerText.y + 45;
			// this.addChild(playerPairText);
			//
			// this.playerPairPerc = new createjs.Text('0%', '25px Bebasneue', '#1565c0');
			// this.playerPairPerc.x = playerPairText.x + 170;
			// this.playerPairPerc.y = playerPairText.y - 1;
			// this.playerPairPerc.textAlign = 'right';
			// this.addChild(this.playerPairPerc);
			//
			// let bankerText = new createjs.Text(window.language.game_specific.banker, 'bold 22px Lato', '#d32f2f');
			// bankerText.x = 50;
			// bankerText.y = playerPairText.y + 45;
			// this.addChild(bankerText);
			//
			// this.bankerPerc = new createjs.Text('0%', '25px Bebasneue', '#d32f2f');
			// this.bankerPerc.x = bankerText.x + 170;
			// this.bankerPerc.y = bankerText.y - 1;
			// this.bankerPerc.textAlign = 'right';
			// this.addChild(this.bankerPerc);
			//
			// let bankerPairText = new createjs.Text(window.language.game_specific.bankerpair, 'bold 22px Lato', '#d32f2f');
			// bankerPairText.x = 50;
			// bankerPairText.y = bankerText.y + 45;
			// this.addChild(bankerPairText);
			//
			// this.bankerPairPerc = new createjs.Text('0%', '25px Bebasneue', '#d32f2f');
			// this.bankerPairPerc.x = bankerPairText.x + 170;
			// this.bankerPairPerc.y = bankerPairText.y - 1;
			// this.bankerPairPerc.textAlign = 'right';
			// this.addChild(this.bankerPairPerc);
			//
			// let tieText = new createjs.Text(window.language.multibet_poker.tie, 'bold 22px Lato', '#689f38');
			// tieText.x = 50;
			// tieText.y = bankerPairText.y + 45;
			// this.addChild(tieText);
			//
			// this.tiePerc = new createjs.Text('0%', '25px Bebasneue', '#689f38');
			// this.tiePerc.x = tieText.x + 170;
			// this.tiePerc.y = tieText.y - 1;
			// this.tiePerc.textAlign = 'right';
			// this.addChild(this.tiePerc);
			//
			// if (window.language.locale == 'jp' || window.language.locale == 'th') {
			// 	playerText.font = 'bold 19px Lato';
			// 	playerPairText.font = 'bold 19px Lato';
			// 	bankerText.font = 'bold 19px Lato';
			// 	bankerPairText.font = 'bold 19px Lato';
			// 	tieText.font = 'bold 19px Lato';
			//
			// 	playerText.y += 3;
			// 	playerPairText.y += 3;
			// 	bankerText.y += 3;
			// 	bankerPairText.y += 3;
			// 	tieText.y += 3;
			// }
			//
			// // Percentage bar
			// this.playerPercBar = new createjs.Shape();
			// this.playerPercBar.graphics.beginFill('#1565c0').drawRect(0, 0, 170, 8);
			// this.playerPercBar.x = 50;
			// this.playerPercBar.y = 43;
			// this.playerPercBar.scaleX = 0;
			// this.addChild(this.playerPercBar);
			//
			// this.playerPairPercBar = new createjs.Shape();
			// this.playerPairPercBar.graphics.beginFill('#1565c0').drawRect(0, 0, 170, 8);
			// this.playerPairPercBar.x = 50;
			// this.playerPairPercBar.y = this.playerPercBar.y + 45;
			// this.playerPairPercBar.scaleX = 0;
			// this.addChild(this.playerPairPercBar);
			//
			// this.bankerPercBar = new createjs.Shape();
			// this.bankerPercBar.graphics.beginFill('#d32f2f').drawRect(0, 0, 170, 8);
			// this.bankerPercBar.x = 50;
			// this.bankerPercBar.y = this.playerPairPercBar.y + 45;
			// this.bankerPercBar.scaleX = 0;
			// this.addChild(this.bankerPercBar);
			//
			// this.bankerPairPercBar = new createjs.Shape();
			// this.bankerPairPercBar.graphics.beginFill('#d32f2f').drawRect(0, 0, 170, 8);
			// this.bankerPairPercBar.x = 50;
			// this.bankerPairPercBar.y = this.bankerPercBar.y + 45;
			// this.bankerPairPercBar.scaleX = 0;
			// this.addChild(this.bankerPairPercBar);
			//
			// this.tiePercBar = new createjs.Shape();
			// this.tiePercBar.graphics.beginFill('#689f38').drawRect(0, 0, 170, 8);
			// this.tiePercBar.x = 50;
			// this.tiePercBar.y = this.bankerPairPercBar.y + 45;
			// this.tiePercBar.scaleX = 0;
			// this.addChild(this.tiePercBar);
			//
			// // Total bets
			// this.playerBets = new createjs.Text('0', '25px Bebasneue', '#fff');
			// this.playerBets.x = 350;
			// this.playerBets.y = 14;
			// this.playerBets.textAlign = 'right';
			// this.addChild(this.playerBets);
			//
			// this.playerPairBets = new createjs.Text('0', '25px Bebasneue', '#fff');
			// this.playerPairBets.x = 350;
			// this.playerPairBets.y = this.playerBets.y + 45;
			// this.playerPairBets.textAlign = 'right';
			// this.addChild(this.playerPairBets);
			//
			// this.bankerBets = new createjs.Text('0', '25px Bebasneue', '#fff');
			// this.bankerBets.x = 350;
			// this.bankerBets.y = this.playerPairBets.y + 45;
			// this.bankerBets.textAlign = 'right';
			// this.addChild(this.bankerBets);
			//
			// this.bankerPairBets = new createjs.Text('0', '25px Bebasneue', '#fff');
			// this.bankerPairBets.x = 350;
			// this.bankerPairBets.y = this.bankerBets.y + 45;
			// this.bankerPairBets.textAlign = 'right';
			// this.addChild(this.bankerPairBets);
			//
			// this.tieBets = new createjs.Text('0', '25px Bebasneue', '#fff');
			// this.tieBets.x = 350;
			// this.tieBets.y = this.bankerPairBets.y + 45;
			// this.tieBets.textAlign = 'right';
			// this.addChild(this.tieBets);
			//
			// this.totalBets = new createjs.Text('0', '25px Bebasneue', '#fff');
			// this.totalBets.x = 350;
			// this.totalBets.y = this.tieBets.y + 45;
			// this.totalBets.textAlign = 'right';
			// this.addChild(this.totalBets);
			//
			// let moneyIcon = new createjs.Bitmap(this.context.getResources('money_ico'));
			// moneyIcon.x = this.totalBets.x - 155;
			// moneyIcon.y = this.totalBets.y + 1;
			// moneyIcon.scaleX = moneyIcon.scaleY = 1.3;
			// this.addChild(moneyIcon);
			//
			// // Users
			// let userIcon = [];
			// for (var i = 0; i < 5; i++) {
			// 	userIcon[i] = new createjs.Bitmap(this.context.getResources('user_ico'));
			// 	userIcon[i].x = 370;
			// 	userIcon[i].y = 19 + (i * 45);
			// 	userIcon[i].scaleX = userIcon[i].scaleY = 1.3;
			// 	this.addChild(userIcon[i]);
			// }
			//
			// this.playerUsers = new createjs.Text('0', '18px Bebasneue', '#a1a1a1')
			// this.playerUsers.x = 435;
			// this.playerUsers.y = 19;
			// this.playerUsers.textAlign = 'right';
			// this.addChild(this.playerUsers);
			//
			// this.playerPairUsers = new createjs.Text('0', '18px Bebasneue', '#a1a1a1')
			// this.playerPairUsers.x = 435;
			// this.playerPairUsers.y = this.playerUsers.y + 45;
			// this.playerPairUsers.textAlign = 'right';
			// this.addChild(this.playerPairUsers);
			//
			// this.bankerUsers = new createjs.Text('0', '18px Bebasneue', '#a1a1a1');
			// this.bankerUsers.x = 435;
			// this.bankerUsers.y = this.playerPairUsers.y + 45;
			// this.bankerUsers.textAlign = 'right';
			// this.addChild(this.bankerUsers);
			//
			// this.bankerPairUsers = new createjs.Text('0', '18px Bebasneue', '#a1a1a1');
			// this.bankerPairUsers.x = 435;
			// this.bankerPairUsers.y = this.bankerUsers.y + 45;
			// this.bankerPairUsers.textAlign = 'right';
			// this.addChild(this.bankerPairUsers);
			//
			// this.tieUsers = new createjs.Text('0', '18px Bebasneue', '#a1a1a1')
			// this.tieUsers.x = 435;
			// this.tieUsers.y = this.bankerPairUsers.y + 45;
			// this.tieUsers.textAlign = 'right';
			// this.addChild(this.tieUsers);
			//
			// this.totalUsers = new createjs.Text('0', '18px Bebasneue', '#a1a1a1');
			// this.totalUsers.x = 435;
			// this.totalUsers.y = this.tieUsers.y + 45;
			// this.totalUsers.textAlign = 'right';
			// this.addChild(this.totalUsers);
			//
			// let totalUsersIcon = new createjs.Bitmap(this.context.getResources('total_user_ico'));
			// totalUsersIcon.x = 363;
			// totalUsersIcon.y = this.totalUsers.y - 2;
			// totalUsersIcon.scaleX = totalUsersIcon.scaleY = 1.3;
			// this.addChild(totalUsersIcon);
		},

		updateInfo(data, totalBettingUsers) {
			this.resetData();

			if (totalBettingUsers) {
				// this.totalUsers.text = numberWithCommas(totalBettingUsers);
				$('.bets-total-players').text(numberWithCommas(totalBettingUsers));
			}

			if (!data) return;

			let playerBetAmt = 0;
			let playerPairBetAmt = 0;
			let bankerBetAmt = 0;
			let bankerPairBetAmt = 0;
			let tieBetAmt = 0;
			let totalBetCount = 0;
			let totalUsersCount = 0;

			if (data.player) {
				playerBetAmt = data.player.totalBets;

				// this.playerBets.text = numberWithCommas(data.player.totalBets);
				// this.playerUsers.text = numberWithCommas(data.player.totalUsers);
				$('.bets-player').text(numberWithCommas(data.player.totalBets));
				$('.bets-player-players').text(numberWithCommas(data.player.totalUsers));

				totalBetCount += data.player.totalBets;
				// totalUsersCount += data.player.totalUsers;
			}

			if (data.playerpair) {
				playerPairBetAmt = data.playerpair.totalBets;

				// this.playerPairBets.text = numberWithCommas(data.playerpair.totalBets);
				// this.playerPairUsers.text = numberWithCommas(data.playerpair.totalUsers);

				$('.bets-playerpair').text(numberWithCommas(data.playerpair.totalBets));
				$('.bets-playerpair-players').text(numberWithCommas(data.playerpair.totalUsers));

				totalBetCount += data.playerpair.totalBets;
				// totalUsersCount += data.playerpair.totalUsers;
			}

			if (data.banker) {
				bankerBetAmt = data.banker.totalBets;

				// this.bankerBets.text = numberWithCommas(data.banker.totalBets);
				// this.bankerUsers.text = numberWithCommas(data.banker.totalUsers);

				$('.bets-banker').text(numberWithCommas(data.banker.totalBets));
				$('.bets-banker-players').text(numberWithCommas(data.banker.totalUsers));

				totalBetCount += data.banker.totalBets;
				// totalUsersCount += data.banker.totalUsers;
			}

			if (data.bankerpair) {
				bankerPairBetAmt = data.bankerpair.totalBets;

				// this.bankerPairBets.text = numberWithCommas(data.bankerpair.totalBets);
				// this.bankerPairUsers.text = numberWithCommas(data.bankerpair.totalUsers);

				$('.bets-bankerpair').text(numberWithCommas(data.bankerpair.totalBets));
				$('.bets-bankerpair-players').text(numberWithCommas(data.bankerpair.totalUsers));

				totalBetCount += data.bankerpair.totalBets;
				// totalUsersCount += data.bankerpair.totalUsers;
			}

			if (data.tie) {
				tieBetAmt = data.tie.totalBets;

				// this.tieBets.text = numberWithCommas(data.tie.totalBets);
				// this.tieUsers.text = numberWithCommas(data.tie.totalUsers);

				$('.bets-tie').text(numberWithCommas(data.tie.totalBets));
				$('.bets-tie-players').text(numberWithCommas(data.tie.totalUsers));

				totalBetCount += data.tie.totalBets;
				// totalUsersCount += data.tie.totalUsers;
			}

			// this.totalBets.text = numberWithCommas(totalBetCount);
			// this.totalUsers.text = numberWithCommas(totalUsersCount);


			$('.bets-total').text(numberWithCommas(totalBetCount));


			if (parseInt(totalBetCount) !== 0) {
				let playerPerc = Math.round((playerBetAmt / totalBetCount) * 100);
				let playerPairPerc =  Math.round((playerPairBetAmt / totalBetCount) * 100);
				let bankerPerc = Math.round((bankerBetAmt / totalBetCount) * 100);
				let bankerPairPerc = Math.round((bankerPairBetAmt / totalBetCount) * 100);
				let totalPerc = playerPerc + playerPairPerc + bankerPerc + bankerPairPerc;

				// this.playerPercBar.scaleX = playerBetAmt / totalBetCount;
				// this.playerPairPercBar.scaleX = playerPairBetAmt / totalBetCount;
				// this.bankerPercBar.scaleX = bankerBetAmt / totalBetCount;
				// this.bankerPairPercBar.scaleX = bankerPairBetAmt / totalBetCount;
				// this.tiePercBar.scaleX = tieBetAmt / totalBetCount;

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

				// this.playerPerc.text = playerPerc + '%';
				// this.playerPairPerc.text = playerPairPerc + '%';
				// this.bankerPerc.text = bankerPerc + '%';
				// this.bankerPairPerc.text = bankerPairPerc + '%';
				// this.tiePerc.text = (100 - (playerPerc + playerPairPerc + bankerPerc + bankerPairPerc)) + '%';
			}
			else {
				// this.playerPercBar.scaleX = 0;
				// this.playerPairPercBar.scaleX = 0;
				// this.bankerPercBar.scaleX = 0;
				// this.bankerPairPercBar.scaleX = 0;
				// this.tiePercBar.scaleX = 0;
				//
				// this.playerPerc.text = '0%';
				// this.playerPairPerc.text = '0%';
				// this.bankerPerc.text = '0%';
				// this.bankerPairPerc.text = '0%';
				// this.tiePerc.text = '0%';

				$('.bets-player').text(0);
				$('.bets-player-players').text(0);

				$('.bets-banker').text(0);
				$('.bets-banker-players').text(0);

				$('.bets-tie').text(0);
				$('.bets-tie-players').text(0);

				$('.bets-playerpair').text(0);
				$('.bets-playerpair-players').text(0);

				$('.bets-bankerpair').text(0);
				$('.bets-bankerpair-players').text(0);

				$('.bets-total').text(0);
				$('.bets-totalplayers').text(0);

				$('.bar--player .bar-inner').animate({ 'width' : 0 },'fast');
				$('.bar--banker .bar-inner').animate({ 'width' : 0 },'fast');
				$('.bar--playerpair .bar-inner').animate({ 'width' : 0 },'fast');
				$('.bar--bankerpair .bar-inner').animate({ 'width' : 0 },'fast');
				$('.bar--tie .bar-inner').animate({ 'width' : 0 },'fast');
			}
		},

		resetData() {

			$('.bets-player').text(0);
			$('.bets-player-players').text(0);

			$('.bets-banker').text(0);
			$('.bets-banker-players').text(0);

			$('.bets-tie').text(0);
			$('.bets-tie-players').text(0);

			$('.bets-playerpair').text(0);
			$('.bets-playerpair-players').text(0);

			$('.bets-bankerpair').text(0);
			$('.bets-bankerpair-players').text(0);

			$('.bets-total').text(0);
			$('.bets-totalplayers').text(0);

			$('.bar--player .bar-inner').animate({ 'width' : 0 },'fast');
			$('.bar--banker .bar-inner').animate({ 'width' : 0 },'fast');
			$('.bar--playerpair .bar-inner').animate({ 'width' : 0 },'fast');
			$('.bar--bankerpair .bar-inner').animate({ 'width' : 0 },'fast');
			$('.bar--tie .bar-inner').animate({ 'width' : 0 },'fast');

			// this.playerBets.text = 0;
			// this.playerPairBets.text = 0;
			// this.bankerBets.text = 0;
			// this.bankerPairBets.text = 0;
			// this.tieBets.text = 0;
			// this.totalBets.text = 0;
			//
			// this.playerUsers.text = 0;
			// this.playerPairUsers.text = 0;
			// this.bankerUsers.text = 0;
			// this.bankerPairUsers.text = 0;
			// this.tieUsers.text = 0;
			// this.totalUsers.text = 0;
			//
			// this.playerPercBar.scaleX = 0;
			// this.playerPairPercBar.scaleX = 0;
			// this.bankerPercBar.scaleX = 0;
			// this.bankerPairPercBar.scaleX = 0;
			// this.tiePercBar.scaleX = 0;
			//
			// this.playerPerc.text = '0%';
			// this.playerPairPerc.text = '0%';
			// this.bankerPerc.text = '0%';
			// this.bankerPairPerc.text = '0%';
			// this.tiePerc.text = '0%';
		}
	});

	return instance;
}
