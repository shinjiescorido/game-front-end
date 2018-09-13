import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, fontFormat, setCurrentTimezone } from '../../../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		bankerTotal : 0,
		playerTotal: 0,
		currentBalance : 0,
		bankerLimit : 0,
		playerLimit : 0,
		totalUsers : {
			banker : [],
			player : []
		},
		cancelClickable : true,
		main () {

			$(".room-balance").on("click", function () {
				$('.btn-junket').removeClass('active');
				$(this).addClass('active');
				$(".junket-player-con").hide();
				$(".-junket-room").hide();
				$(".-junket-buttons").hide();
				$("#balance-info").show();
			});


      let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
      if (window.mainMultiplier % 10) mainMultiplier = 1;

			this.currentBalance = (parseInt(range.split('-')[1]) * window.currencyMultiplier) * mainMultiplier;
			console.log("this.currentBalance", this.currentBalance)
			$("#balance").html(numberWithCommas(this.currentBalance));
			$("#confirmbet").on("click", () => {
				let bankerBet = parseInt($("#banker-bet").val());
				let playerBet = parseInt($("#player-bet").val());

				this.bankerTotal +=  bankerBet ? bankerBet : 0;
				this.playerTotal +=  playerBet ? playerBet : 0;
				console.log("::::: balance", this.currentBalance, "::: banker total", this.bankerTotal, "::: player total", this.playerTotal)
				console.log(":::::", this.fnCalcBalanceBet());
				this.setBalanceBet();
			});

			$("#clear").on("click", () => {
				this.playerTotal = 0;
				this.bankerTotal = 0;
			})

			this.toolTipCon = new createjs.Container();
			this.toolTip = new createjs.Shape();
			this.toolTipCon.addChild(this.toolTip);

			this.toolTip.graphics.f("rgba(22,22,22,0.8)").ss(2).s('#cdb871').moveTo(0,0)
			.lineTo(200,0)
			.lineTo(200,50)
			.lineTo(110,50)
			.lineTo(100,58)
			.lineTo(90,50)
			.lineTo(0,50)
			.lineTo(0,0)
			this.toolTip.regX = 100;
			this.toolTip.regY = 25;

			this.balanceText = new createjs.Text("0", "20px lato-black", "#cd2f30");
			this.balanceText.set({textAlign:'center', textBaseline: 'middle'});

			this.toolTipCon.addChild(this.balanceText);

			this.toolTipCon.x = 500
			this.toolTipCon.y = 500

			this.addChild(this.toolTipCon)
			this.visible = false;
		},
		generateToolTip (target) {
			var balance = this.fnCalcBalanceBet();
			this.toolTipCon.x = target.x + (target.getBounds().width/2);
			this.toolTipCon.y = target.y - (target.getBounds().height/2);
			
			if(!target.multiplayer) return;

			if(target.table_name === 'banker') {
				this.visible = true;
				this.balanceText.text = numberWithCommas(balance.banker);
				this.balanceText.color = "#cd2f30";
			}else if(target.table_name === 'player') {
				this.balanceText.text = numberWithCommas(balance.player);
				this.balanceText.color = "#1665c1";
				this.visible = true;
			} else {
				this.visible = false;
			}
		},
		initData(data) {
			if(!_.isEmpty(data.totalUsers)) {

				let players = !_.isEmpty(data.totalUsers.player) ? data.totalUsers.player.userList : [];
				let bankers = !_.isEmpty(data.totalUsers.banker) ? data.totalUsers.banker.userList : [];

				this.totalUsers.player = players;
				this.totalUsers.banker = bankers;

				this.bankerTotal = !_.isEmpty(data.totalUsers.banker) ? data.totalUsers.banker.totalBets : 0;
				this.playerTotal = !_.isEmpty(data.totalUsers.player) ? data.totalUsers.player.totalBets : 0;

				this.setBalanceBet();
			}
		},
		setBets (data, type) {

			let userId = data[0].id;
			let betType = '';

			if(type === 'bet') {
				//when receive bet
				let playerBet = _.find(data, function(e){return e.bet == 'player'}); //bet on player
				let bankerBet = _.find(data, function(e){return e.bet == 'banker'}); //bet on banker

				betType = 'banker';
				if(playerBet) {
					betType = 'player';
				}

				let user = _.find(this.totalUsers[betType], (e) => {return e.userId == userId});
				
				if(user) { //if user exists (onload bet)
					let prev = _.find(user.bets, function (e) {return e.bet == betType});
					this[`${betType}Total`] -= parseInt(prev.bet_amount);
					user.bets = data;
				} else { //new user not onload bet
					this.totalUsers[betType].push({
						userId: userId,
						bets : data
					})
				}
				
				this[`${betType}Total`] += parseInt(_.find(data, function(e){return e.bet == betType}).bet_amount);
			} else {
				//when cancel bet
				for(var key in this.totalUsers) {
					// finding user in data[key]
					let user = _.find(this.totalUsers[key], (e) => {return e.userId == userId});
					if(user) {
						betType = key;
						let prev = _.find(user.bets, function (e) {return e.bet == key});
						this[`${key}Total`] -= parseInt(prev.bet_amount);
					}
				}
				//removing user from bet data[key]
				this.totalUsers[betType] = _.filter(this.totalUsers[betType], function (e) {
					return e.userId != userId;
				});
				console.log(this.totalUsers, "cancel", betType)
			}
			
			this.setBalanceBet();
			this.checkCancel();
		},
		checkCancel() {
			//find my current bet
			let betType = '';
			let oppositeBetType = '';
			let playerBet = _.find(this.context.component_gameButtons.yourBets, function (e) {return e.table_id == 'player'});
			let bankerBet = _.find(this.context.component_gameButtons.yourBets, function (e) {return e.table_id == 'banker'});

			if(playerBet) {
				betType = 'player';
				oppositeBetType = 'banker';
			} else if(bankerBet) {
				betType = 'banker';
				oppositeBetType = 'player';
			} else if(_.isEmpty(playerBet) && _.isEmpty(bankerBet)) {
				return;
			}

			let bet = _.find(this.context.component_gameButtons.yourBets, function (e) {return e.table_id == betType});
			let amt = this[`${betType}Total`] - bet.amount + this.currentBalance;

			if(amt < this[`${oppositeBetType}Total`]) {
				this.cancelClickable = false;
				this.context.component_gameButtons.clearButton.gotoAndStop('disabled');
			} else {
				this.cancelClickable = true;
				if (this.context.component_timer.betting_start) {
					this.context.component_gameButtons.clearButton.gotoAndStop('up');
				}
			}

		},
		resetBalanceBet () {
			this.bankerTotal = 0;
			this.playerTotal = 0;

			this.totalUsers.banker = [];
			this.totalUsers.player = [];

			this.cancelClickable = true;
			this.setBalanceBet();
		},
		setBalanceBet () {
			var balance = this.fnCalcBalanceBet();

			$("#banker-total-bet").html(numberWithCommas(this.bankerTotal));
			$("#player-total-bet").html(numberWithCommas(this.playerTotal));

			$("#all-total-bet").html(numberWithCommas(balance.total_bets));
			$("#all-total-limit").html(numberWithCommas(balance.total_limit));

			$("#player-limit").html(numberWithCommas(balance.player_limit));
			$("#banker-limit").html(numberWithCommas(balance.banker_limit));

			//percent
			let playerPercent = (this.playerTotal / balance.player_limit) * 100;
			let bankerPercent = (this.bankerTotal / balance.banker_limit) * 100;

			$('.bar-percent.-player').css('width', `${playerPercent}%`)
			$('.bar-percent.-banker').css('width', `${bankerPercent}%`)

			$("#player-user-cnt").html(this.totalUsers.player.length);
			$("#banker-user-cnt").html(this.totalUsers.banker.length);
		},
		fnCalcBalanceBet () {
			let bankerBalance = this.currentBalance + this.playerTotal - this.bankerTotal;
			let playerBalance = this.currentBalance + this.bankerTotal - this.playerTotal;
			this.bankerLimit = this.currentBalance + this.playerTotal;
			this.playerLimit = this.currentBalance + this.bankerTotal;

			return {
			
				banker : bankerBalance,
				player : playerBalance,
				banker_limit : this.bankerLimit,
				player_limit : this.playerLimit,
				total_bets : this.playerTotal + this.bankerTotal,
				total_limit : this.bankerLimit + this.playerLimit
			};
		},
		screenOrientation () {
			if(this.context.portrait) {
				$("#balance-info").addClass('-portrait');
			} else {
				$("#balance-info").removeClass('-portrait');
			}
		}
	});

	return instance;
}