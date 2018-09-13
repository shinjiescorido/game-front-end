import {createSprite, randomNum, getSlaveParam, fontFormat, numberWithCommas} from '../../factories/factories';

let instance = null;

export default (config) => {
	instance = instance || new blu.Component({
		main () {
			this.y = this.context.stage.baseHeight - 400;

			//slave toggle
			this.classicButton = this.toggleButtons(window.language2.lobby_gamename_texasholdem.toUpperCase(), 180,true);
			this.classicButton.skewX = 10;
			this.classicButton.scaleY = 0.8;
			this.classicButton.x = this.classicButton.ox = 695;
			this.classicButton.y = 20;
			this.addChild(this.classicButton);

			this.classicButton.on('click', (e) => {
				if(this.context.component_gameButtons.yourBets.length == 0) {
					window.slave = '';
					window.bet_type = 'r';
				}

				this.toggleSlave(e.currentTarget);

				$('.slave-classic').show();
				$('.slave-bonus').hide();
			});

			this.classicButton.on('mouseover', (e) => {
				if(e.currentTarget.isActive) return;
				$('body').css('cursor', 'pointer');
				e.currentTarget.hover();
			});

			this.classicButton.on('mouseout', (e) => {
				if(e.currentTarget.isActive) return;
				$('body').css('cursor', 'default');
				e.currentTarget.default();
			});

			this.bonusButton = this.toggleButtons(window.language2.poker_betlayout_bonusplus.toUpperCase(), 130,true);
			this.bonusButton.x = this.bonusButton.ox = 1045;
			this.bonusButton.y = 20;
			this.bonusButton.skewX = -5;
			this.bonusButton.scaleY = 0.8
			this.addChild(this.bonusButton);

			this.bonusButton.on('click', (e) => {
				if(this.context.component_gameButtons.yourBets.length == 0) {
					window.slave = 'bonusplus';
					window.bet_type = 'b';
				}

				this.toggleSlave(e.currentTarget);

				$('.slave-classic').hide();
				$('.slave-bonus').show();
			});

			this.bonusButton.on('mouseover', (e) => {
				if(e.currentTarget.isActive) return;
				$('body').css('cursor', 'pointer');
				e.currentTarget.hover();
			});

			this.bonusButton.on('mouseout', (e) => {
				if(e.currentTarget.isActive) return;
				$('body').css('cursor', 'default');
				e.currentTarget.default();
			});

			if(window.slave === 'bonusplus') this.bonusButton.active();
			if(window.slave === '') this.classicButton.active();
		},
		toggleMultibet() {
			if($('#menu-multibet').hasClass('multibet-active')) {
        $('#multibet').show();
				$("#menu-container").animate({'right': '19%'}, {
					duration: 200,
					start: function () {
						$(this).css({'overflow' : 'hidden'})
					}
				})

        $("#table-redirect-list").css({
        	'right' : '-13%'
        });

        $("#table-redirect-list").removeClass('show');
				$("#roadmap-container").hide();
				$("#roadmap-list-container").hide();
				$("#table-redirect-list > .button-list").removeClass('hide');

				createjs.Tween.get(this.context.component_lastRounds)
					.to({
							x : this.context.stage.baseWidth - 510
					}, 200)

        if(this.context.component_multibetv2.eyeRoadmap) {
	        this.context.component_multibetv2.eyeRoadmap.eye.removeAllChildren();
					this.context.component_multibetv2.eyeRoadmap.eyeRoadmap = null;
        }

				$(".channel-container").animate({'right':'59.5%'}, 'fast')

				this.context.component_multibetv2.toggleMultibet(true);

				createjs.Tween.get(this.context.component_betBoard)
					.to({
						alpha : 0
					},100)
					.call((board)=>{
						board.scaleX = 0.8;
						board.x = 190;
					}, [this.context.component_betBoard])
					.to({
						alpha : 1
					},100)

				this.context.component_tableDraw.togglePositions(true);
			} else {
				$("#menu-container").animate({'right': '0'}, {
					complete: function () {
						$(this).css({'overflow' : 'initial'});

		        $("#table-redirect-list").css({
		        	'right' : '-10.45%'
		        });
					}
				})

				$(".channel-container").animate({'right':'78.6%'}, 'fast')

				createjs.Tween.get(this.context.component_lastRounds)
					.to({
							x : this.context.stage.baseWidth - 165
					}, 200)

				this.context.component_tableDraw.togglePositions(false);
				this.context.component_multibetv2.toggleMultibet(false);
				createjs.Tween.get(this.context.component_betBoard)
				.to({
					alpha : 0
				},100)
				.call((board)=>{
					board.scaleX = 1;
					board.x = 0;
        $('#multibet').hide();
				}, [this.context.component_betBoard])
				.to({
					alpha : 1
				},100)
			}
		},
		toggleButtons(text, width = 206, isCenter) {
			var container = new createjs.Container();

			var shape = new createjs.Shape();
			container.strokeFill = shape.graphics.ss(2).s('#d7bd6a').command;
			container.fillCmd = shape.graphics.beginLinearGradientFill(["rgba(255,255,255,0.01)", "rgba(255,255,255,0.01)","rgba(255,255,255,0.01)"], [0,0.5,1], 0,0 , width,0).command;
			shape.graphics.drawRoundRect(0,0,width,30,15);
			container.addChild(shape);

			container.text = new createjs.Text(text, fontFormat(16,'black','lato', true),"#d9bf6b");;
			container.text.x = isCenter ? width/2 : 120;
			container.text.y = 30/2;
			container.text.textAlign = 'center';
			container.text.textBaseline = 'middle';
			// container.text.skewX = -10;
			container.addChild(container.text);

			container.hover = function () {
				container.strokeFill.style = 'transparent';
				container.fillCmd.linearGradient(["#d8be6a", "#efe180","#d9bf6b"], [0,0.5,1], 0,0 , width,0);
				container.text.color = '#202020'
			}

			container.active = function () {
				container.strokeFill.style = 'transparent';
				container.fillCmd.linearGradient(["#d8be6a", "#efe180","#d9bf6b"], [0,0.5,1], 0,0 , width,0);
				container.isActive = true;
				container.text.color = '#202020'
			}

			container.default = function () {
				container.strokeFill.style = '#d7bd6a';
				container.fillCmd.linearGradient(["rgba(255,255,255,0.01)", "rgba(255,255,255,0.01)","rgba(255,255,255,0.01)"], [0,0.5,1], 0,0 , width,0)
				container.isActive = false;
				container.text.color = '#d7bd6a'
			}

			return container;
		},
		toggleSlave (button, flag) {
			if(!flag && this.context.component_gameButtons.yourBets.length) {
				this.context.component_messages.setMessage('cannot switch', 1);
				return;
			}

			this.bonusButton.default();
			this.classicButton.default();

			var ante = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'ante' });
			var bonus = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'bonus' });
			var bonusplus = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'bonusplus' });
			var pocket = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'pocket' });
			var flop = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'flop' });
			var turn = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'turn' });
			var river = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'river' });

			button.active();

			if(window.slave === 'bonusplus') {
				bonusplus.visible = true;
				bonus.visible = false;
				pocket.visible = true;
			} else {
				bonusplus.visible = false;
				bonus.visible = true;
				pocket.visible = false;
			}

			// toggle unconfirmed bets
			// this.toggleSlaveBet();

      $.post("/setGameSettings", {slave: window.slave !== '' ? window.slave : 'classic', game: `Poker/${window.tableNum}`});
		},

		toggleSlaveBet() {
			var tempBets = [];
			if(this.context.component_timer.betting_start) {
				this.context.component_betBoard.bet_areas.forEach((area) => {
					if(area.chips.length) {
						area.chips.forEach((e) => {
							this.context.component_betBoard.removeChild(e);
						});

						tempBets.push({
							table_id : area.table_name,
							total_bet_amt : area.total_bet_amt
						});

						if(window.slave != 'bonus') {
							tempBets = _.filter(tempBets, function(e) {
								return e.table_id != 'bonus_player' && e.table_id != 'bonus_banker' && e.table_id != 'big' && e.table_id != 'small';
							});
						}

						if(window.slave != 'supersix') {
							tempBets = _.filter(tempBets, function(e) {
								return e.table_id != 'supersix';
							});
						}

						area.chips = [];
					}
				});
				tempBets.forEach((temp) => {
					var test = _.find(this.context.component_betBoard.bet_areas, function (e) {return e.table_name === temp.table_id && e.multiplayer == window.multiplayer} )
					this.context.component_chips.changeCurrentChips(temp.total_bet_amt,test,false, false)
				});
			}
		},
		toggleRange (range) {
			let selectedRange = _.filter(window.allRange, function(e) {
				return parseInt(e.max) === parseInt(range.split('-')[1]) && parseInt(e.min) === parseInt(range.split('-')[0]);
			})[0];

			//Main area range
			let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
			if (window.mainMultiplier % 10) mainMultiplier = 1;
			let mainAreaMin = (selectedRange.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
			let mainAreaMax = ((selectedRange.max * parseInt(window.currencyMultiplier)) * window.userMultiplier) * mainMultiplier;

			//Side bet ranges
			let sideBet = [];
			for (var i = 0; i < selectedRange.side_bet.length; i++) {
				sideBet = selectedRange.side_bet[i];
				switch (sideBet.division) {
					case ('BonusBet'):
					let bonusMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					let bonusMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					break;

					case ('BonusplusBet'):
					let bonusplusMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					let bonusplusMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					break;

					case ('FlopBet'):
					let flopMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					let flopMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					break;

					case ('TurnBet'):
					let turnMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					let turnMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					break;

					case ('RiverBet'):
					let riverMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					let riverMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
					break;
				}
			}

			this.context.component_betBoard.bet_areas.forEach((e) => {
				if(e.table_name === 'ante') {
					e.min_betAmt = mainAreaMin;
					e.max_betAmt = mainAreaMax;

					$('.bet-limit-min').text(numberWithCommas(mainAreaMin));
					$('.bet-limit-max').text(numberWithCommas(mainAreaMax));
				}

				if(e.table_name === 'bonus') {
					e.min_betAmt = bonusMin;
					e.max_betAmt = bonusMax;
				}

				if(e.table_name === 'bonusplus') {
					e.min_betAmt = bonusplusMin;
					e.max_betAmt = bonusplusMax;
				}

				if(e.table_name === 'pocket') {
					e.min_betAmt = bonusMin;
					e.max_betAmt = bonusMax;
				}
			});

			// Remove repeat
			this.context.component_gameButtons.previousBet = [];
			this.context.component_gameButtons.checkButtonState();
		},
		togglePositions (isActive) {
			if(isActive) {
				createjs.Tween.get(this)
				.to({
					alpha : 0
				},100)
				.to({
					alpha : 1
				},1).call(() => {
				})
			} else {
				createjs.Tween.get(this)
				.to({
					alpha : 0
				},100)
				.to({
					alpha : 1
				},1).call(() => {
				});
			}
		}
	})

	return instance;
}
