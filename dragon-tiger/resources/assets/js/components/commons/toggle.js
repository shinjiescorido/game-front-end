import {createSprite, randomNum, getSlaveParam, numberWithCommas, fontFormat} from '../../factories/factories';

let instance = null;

export default (config) => {
  instance = instance || new blu.Component({
    main () {
      if(window.junket && !_.isEmpty(window.vendorData) ) {
        $("#table-redirect-list").remove();
        $("#range-disp").addClass(`disabled`);
      }
      
      this.singleButton = this.toggleButtons(window.language2.com_sub_betlayout_singleplayer.toUpperCase());
      this.singleButton.active();
      this.singleButton.skewX = 20;
      this.singleButton.scaleY = 0.8;
      this.singleButton.x = 600;
      this.singleButton.y = 20;
      this.addChild(this.singleButton);

      this.singleButton.on('click', (e) => {
        if((window.junket == 1 && !_.isEmpty(window.vendorData))) return;
        if(this.context.component_gameButtons.yourBets.length) {
          this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_unabletochange, 1);
          return;
        }

        window.multiplayer = 0;
        this.context.multiplayer = parseInt(window.multiplayer);
        this.context.toggleBet();
        e.currentTarget.active();
        this.multiButton.default();
        $.post("/setGameSettings", {multiplayer: 0, game: `${window.game}/${window.tableNum}`});
      })

      this.singleButton.on('mouseover', (e) => {
        if((window.junket == 1 &&  !_.isEmpty(window.vendorData))) return;
        if(e.currentTarget.isActive) return;
        $('body').css('cursor', 'pointer');
        e.currentTarget.hover();
      });

      this.singleButton.on('mouseout', (e) => {
        if((window.junket == 1 &&  !_.isEmpty(window.vendorData))) return;
        if(e.currentTarget.isActive) return;
        $('body').css('cursor', 'default');
        e.currentTarget.default();
      });

      this.multiButton = this.toggleButtons(window.language2.com_sub_betlayout_multiplayer.toUpperCase(), 206, false, false, true);
      this.multiButton.skewX = -15;
      this.multiButton.scaleY = 0.8;
      this.multiButton.x = 1115;
      this.multiButton.y = 20;
      this.addChild(this.multiButton);

      this.multiButton.on('click', (e) => {
        if((window.junket == 1 && !_.isEmpty(window.vendorData))) return;
        if(this.context.component_gameButtons.yourBets.length) {
          this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_unabletochange, 1);
          return;
        }

        window.multiplayer = 1;
        this.context.multiplayer = parseInt(window.multiplayer);
        this.context.toggleBet();
        e.currentTarget.active();
        this.singleButton.default();
        $.post("/setGameSettings", {multiplayer: 1, game: `${window.game}/${window.tableNum}`});
      })

      this.multiButton.on('mouseover', (e) => {
        if((window.junket == 1 &&  !_.isEmpty(window.vendorData))) return;
        if(e.currentTarget.isActive) return;
        $('body').css('cursor', 'pointer');
        e.currentTarget.hover();
      });

      this.multiButton.on('mouseout', (e) => {
        if((window.junket == 1 && !_.isEmpty(window.vendorData))) return;
        if(e.currentTarget.isActive) return;
        $('body').css('cursor', 'default');
        e.currentTarget.default();
      });

      this.y = this.context.stage.baseHeight - 500;
      
      if(window.junket != 0 && !_.isEmpty(window.vendorData)) this.visible = false;
    },
    toggleButtons(text, width = 206, isCenter, isslave, multi) {
      var container = new createjs.Container();

      let toggle_icon =  new createjs.Shape();
      toggle_icon.strokeFill = toggle_icon.graphics.ss(2.5).s('#d7bd6a').command;
      toggle_icon.graphics.drawRoundRect(15,7,33,15,7);

      let toggle_icon2 =  new createjs.Shape();
      toggle_icon2.strokeFill = toggle_icon2.graphics.ss(1.5).s('#d7bd6a').command;
      toggle_icon2.graphics.drawRoundRect(21,11,21,7,4);

      let line = new createjs.Shape();
      line.strokeFill = line.graphics.ss(1.5).s('#d7bd6a').command;
      line.graphics.moveTo(16,10).lineTo(21,13)

      line.graphics.moveTo(26,6).lineTo(27,11)

      line.graphics.moveTo(38,6).lineTo(37,11)

      line.graphics.moveTo(48,10).lineTo(41,12.5)

      line.graphics.moveTo(40,17).lineTo(47,20)

      line.graphics.moveTo(35,18).lineTo(36,21)

      line.graphics.moveTo(27,18).lineTo(26,21)

      line.graphics.moveTo(21,17).lineTo(16,20)

      var shape = new createjs.Shape();
      container.strokeFill = shape.graphics.ss(2).s('#d7bd6a').command;
      container.fillCmd = shape.graphics.beginLinearGradientFill(["rgba(255,255,255,0.01)", "rgba(255,255,255,0.01)","rgba(255,255,255,0.01)"], [0,0.5,1], 0,0 , width,0).command;
      shape.graphics.drawRoundRect(0,0,width,30,15);
      container.addChild(shape,toggle_icon, toggle_icon2);

      container.text = new createjs.Text(text, fontFormat(16, 'black', 'lato', true ) ,"#d9bf6b");
      container.text.x = isCenter ? width/2 : 120;
      container.text.y = (30/2) - 1;
      container.text.textAlign = 'center';
      container.text.textBaseline = 'middle';
      // container.text.skewX = -10;
      container.addChild(container.text);

      if(multi) {
        container.addChild(line);
      }

      container.hover = function () {
        container.strokeFill.style = 'transparent';
        container.fillCmd.linearGradient(["#d8be6a", "#efe180","#d9bf6b"], [0,0.5,1], 0,0 , width,0);
        container.text.color = '#202020';
        toggle_icon.strokeFill.style = '#473006';
        toggle_icon2.strokeFill.style = '#473006';
        line.strokeFill.style= '#473006';
      }

      container.active = function () {
        container.strokeFill.style = 'transparent';
        container.fillCmd.linearGradient(["#d8be6a", "#efe180","#d9bf6b"], [0,0.5,1], 0,0 , width,0);
        container.isActive = true;
        container.text.color = '#202020'
        toggle_icon.strokeFill.style = '#473006';
        toggle_icon2.strokeFill.style = '#473006';
        line.strokeFill.style= '#473006';
      }

      container.default = function () {
        container.strokeFill.style = '#d7bd6a';
        container.fillCmd.linearGradient(["rgba(255,255,255,0.01)", "rgba(255,255,255,0.01)","rgba(255,255,255,0.01)"], [0,0.5,1], 0,0 , width,0)
        container.isActive = false;
        container.text.color = '#d7bd6a'
        toggle_icon.strokeFill.style = '#d7bd6a';
        toggle_icon2.strokeFill.style = '#d7bd6a';
        line.strokeFill.style= '#d7bd6a';
      }

      return container;
    },
    toggleSlave (flag) {
      if(!flag && this.context.component_gameButtons.yourBets.length) {
        this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_unabletochange, 1);
        return;
      }

      var dragon = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'dragon' && e.singleplayer});
      var dragon_big = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'dragon_big' && e.singleplayer});
      var dragon_small = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'dragon_small' && e.singleplayer});
      var dragon_odd = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'dragon_odd' && e.singleplayer});
      var dragon_even = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'dragon_even' && e.singleplayer});

      var tiger = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'tiger' && e.singleplayer});
      var tiger_big = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'tiger_big' && e.singleplayer});
      var tiger_small = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'tiger_small' && e.singleplayer});
      var tiger_odd = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'tiger_odd' && e.singleplayer});
      var tiger_even = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'tiger_even' && e.singleplayer});

      var tie  = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'tie' && e.singleplayer});

      var suitedtie = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'suited_tie' && e.singleplayer});


      if(!parseInt(this.context.multiplayer)) {
        this.context.component_tableDraw.classic_outline.visible = true;
      }

      // toggle unconfirmed bets
      this.toggleSlaveBet();
    },
		toggleMultiSlave (flag) {
      if(!flag && this.context.component_gameButtons.yourBets.length) {
        this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_unabletochange, 1);
        return;
      }

      var dragon = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'dragon' && e.singleplayer});
			var dragon_big = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'dragon_big' && e.singleplayer});
			var dragon_small = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'dragon_small' && e.singleplayer});
			var dragon_odd = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'dragon_odd' && e.singleplayer});
			var dragon_even = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'dragon_even' && e.singleplayer});

      var tiger = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'tiger' && e.singleplayer});
      var tiger_big = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'tiger_big' && e.singleplayer});
			var tiger_small = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'tiger_small' && e.singleplayer});
			var tiger_odd = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'tiger_odd' && e.singleplayer});
			var tiger_even = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'tiger_even' && e.singleplayer});

			var tie  = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'tie' && e.singleplayer});

			var suitedtie = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'suited_tie' && e.singleplayer});
      if(parseInt(window.multiplayer)) {
        this.context.component_multiplayer.classic_outline.visible = true;
      }




      // toggle unconfirmed bets
      this.toggleSlaveBet();

      //toggle multiplayer data
      this.context.component_multiplayer.reset();//reset other player bets
      if(!_.isEmpty(this.context.multiplayer_data) && this.context.multiplayer_data.data.length) {
        let slave = this.context.multiplayer_data.data[0].slave;
        if(slave ===  this.context.getSlave()) {
          this.context.component_multiplayer.setMultiplayer(this.context.multiplayer_data)
        }
      }
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
      console.log("max", mainAreaMax);
      console.log("min", mainAreaMin);

      //Side bet ranges
      let sideBet = [];
      for (var i = 0; i < selectedRange.side_bet.length; i++) {
        sideBet = selectedRange.side_bet[i];
        switch (sideBet.division) {
          case ('Tie'):
            let tieMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
            let tieMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
            break;

          case ('Big&Small'):
          let bigSmallMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          let bigSmallMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          break;

          case ('Odd or Even'):
          let oddEvenMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          let oddEvenMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          break;

          case ('Suited Tie'):
          let suitedTieMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          let suitedTieMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          break;

          case ('Suit'):
          let suitMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          let suitMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
          break;
        }
      }

      this.context.component_betBoard.bet_areas.forEach((e) => {
        if(e.table_name.indexOf('tie') >-1) {
          e.min_betAmt = tieMin;
          e.max_betAmt = tieMax;
          $('.bet-limit-tie-min').text(numberWithCommas(tieMin));
					$('.bet-limit-tie-max').text(numberWithCommas(tieMax));
        }

        if(e.table_name =='dragon' || e.table_name == 'tiger') {
          e.min_betAmt = mainAreaMin;
          e.max_betAmt = mainAreaMax;
          $('.bet-limit-min').text(numberWithCommas(mainAreaMin));
					$('.bet-limit-max').text(numberWithCommas(mainAreaMax));
        }

        if(e.table_name.indexOf('_big') >-1 || e.table_name.indexOf('_small')>-1) {
          e.min_betAmt = bigSmallMin;
          e.max_betAmt = bigSmallMax;
        }

        if(e.table_name.indexOf('_odd') >-1|| e.table_name.indexOf('_even')>-1) {
          e.min_betAmt = oddEvenMin;
          e.max_betAmt = oddEvenMax;
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

					// this.multiButton.x -= 60;
					// this.singleButton.x -= 60;
        })
			} else {
				createjs.Tween.get(this)
        .to({
          alpha : 0
        },100)
        .to({
          alpha : 1
        },1).call(() => {
					// this.multiButton.x = this.multiButton.ox;
					// this.singleButton.x = this.singleButton.ox;
        });
			}
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

        createjs.Tween.get(this.context.component_multiplayer)
          .to({
            alpha : 0
          },100)
          .call((board)=>{
            board.scaleX = 0.8;
            board.x = 190;

            let classic_texts = board.classic_outline.texts;
            for(let i = 0; i < classic_texts.length; i++) {
              classic_texts[i].scaleX = 1.2;
            }
            board.classic_outline.updateCache();
          }, [this.context.component_multiplayer])
          .to({
            alpha : 1
          },100)

        this.context.component_toggle.togglePositions(true);
      } else {
        $("#menu-container").animate({'right': '0'}, {
          complete: function () {
            $(this).css({'overflow' : 'initial'})
            $("#table-redirect-list").css({
              'right' : '-10.45%'
            });
            $('#multibet').hide();
          }
        })
        $(".channel-container").animate({'right':'78.6%'}, 'fast')
        this.context.component_multibetv2.toggleMultibet(false);
        createjs.Tween.get(this.context.component_betBoard)
        .to({
          alpha : 0
        },100)
        .call((board)=>{
          $('#multibet').hide();
          board.scaleX = 1;
          board.x = 0;
        }, [this.context.component_betBoard])
        .to({
          alpha : 1
        },100)
        this.context.component_toggle.togglePositions(false);

        createjs.Tween.get(this.context.component_multiplayer)
        .to({
          alpha : 0
        },100)
        .call((board)=>{
          board.scaleX = 1;
          board.x = 0;
        }, [this.context.component_multiplayer])
        .to({
          alpha : 1
        },100)
      }
    }
  })
  return instance;
}
