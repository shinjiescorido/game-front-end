import {createSprite, randomNum, getSlaveParam, fontFormat, numberWithCommas} from '../../factories/factories';

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
			this.singleButton.skewX = -20;
			this.singleButton.scaleY = 0.8;
			this.singleButton.x = this.singleButton.ox = 1185;
			this.singleButton.toX = this.singleButton.x - 60;
			this.singleButton.y = 10;
			this.addChild(this.singleButton);

			this.singleButton.on('click', (e) => {
				if((window.junket == 1 && !_.isEmpty(window.vendorData))) return;
        if(this.context.component_gameButtons.yourBets.length) {
					this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_unabletochange,1);
          return;
        }
        window.multiplayer = 0;
        this.context.multiplayer = parseInt(window.multiplayer);
        this.context.toggleBet();
        e.currentTarget.active();
        this.multiButton.default();
      	$.post("/setGameSettings", {multiplayer: 0, game: `Baccarat/${window.tableNum}`});
			})

			this.singleButton.on('mouseover', (e) => {
				if((window.junket == 1 && !_.isEmpty(window.vendorData))) return;
				console.log("single hover")
				if(e.currentTarget.isActive) return;
				$('body').css('cursor', 'pointer');
				e.currentTarget.hover();
			});

			this.singleButton.on('mouseout', (e) => {
				if((window.junket == 1 && !_.isEmpty(window.vendorData))) return;
				if(e.currentTarget.isActive) return;
				$('body').css('cursor', 'default');
				e.currentTarget.default();
			});


			this.multiButton = this.toggleButtons(window.language2.com_sub_betlayout_multiplayer.toUpperCase(), 206, false, false, true);
			this.multiButton.skewX = -26;
			this.multiButton.scaleY = 0.8;
			this.multiButton.x = this.multiButton.ox = 1400;
			this.multiButton.toX = this.multiButton.x - 60;
			this.multiButton.y = 10;
			this.addChild(this.multiButton);

			this.multiButton.on('click', (e) => {
				if((window.junket == 1 && !_.isEmpty(window.vendorData))) return;
        if(this.context.component_gameButtons.yourBets.length) {
					this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_unabletochange,1);
          return;
        }
        window.multiplayer = 1;
        this.context.multiplayer = parseInt(window.multiplayer);
        this.context.toggleBet();
        e.currentTarget.active();
        this.singleButton.default();
      	$.post("/setGameSettings", {multiplayer: 1, game: `Baccarat/${window.tableNum}`});
			})

			this.multiButton.on('mouseover', (e) => {
				if((window.junket == 1 && !_.isEmpty(window.vendorData))) return;
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

			//slave toggle
			this.classicButton = this.toggleButtons(window.language2.baccarat_betlayout_classic.toUpperCase(), 130,true, true);
			this.classicButton.skewX = 26;
			this.classicButton.scaleY = 0.8;
			this.classicButton.x = this.classicButton.ox = 310;
			this.classicButton.y = 10;
			this.classicButton.toX = this.classicButton.x + 60;
			this.addChild(this.classicButton);

			this.classicButton.on('click', (e) => {
				if((window.junket == 1 && !_.isEmpty(window.vendorData))) return;

        if(this.context.component_gameButtons.yourBets.length) {
					this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_unabletochange,1);
          return;
        }

        window.slave = '';
        if(this.context.multiplayer) {
        	this.toggleMultiSlave(e.currentTarget);
        } else {
        	this.toggleSlave(e.currentTarget);
        }

				console.log(window.slave, "lalalalala")
				this.context.component_roadmap.drawPearlRoad(this.context.roadMarks);
				this.context.component_roadmap.drawBigRoad(this.context.roadMarks);
				this.context.component_roadmap.fnUpdateCaching();
				this.context.toggleSlaveDisp();
			});

			this.classicButton.on('mouseover', (e) => {
				if((window.junket == 1 && !_.isEmpty(window.vendorData))) return;
				if(e.currentTarget.isActive) return;
				$('body').css('cursor', 'pointer');
				e.currentTarget.hover();
			});

			this.classicButton.on('mouseout', (e) => {
				if((window.junket == 1 && !_.isEmpty(window.vendorData))) return;
				if(e.currentTarget.isActive) return;
				$('body').css('cursor', 'default');
				e.currentTarget.default();
			});

			// this.bonusButton = this.toggleButtons('BONUS', 130,true, true);
			// this.bonusButton.x = this.bonusButton.ox = 456;
			// this.bonusButton.y = 10;
			// this.bonusButton.skewX = 26;
			// this.bonusButton.scaleY = 0.8;
			// this.bonusButton.toX = this.bonusButton.x + 60;
			// this.addChild(this.bonusButton);

			// this.bonusButton.on('click', (e) => {
   //      window.slave = 'bonus';
   //      if(this.context.multiplayer) {
   //      	this.toggleMultiSlave(e.currentTarget);
   //      } else {
   //      	this.toggleSlave(e.currentTarget);
   //      }
			// });

			// this.bonusButton.on('mouseover', (e) => {
			// 	if(e.currentTarget.isActive) return;
			// 	$('body').css('cursor', 'pointer');
			// 	e.currentTarget.hover();
			// });

			// this.bonusButton.on('mouseout', (e) => {
			// 	if(e.currentTarget.isActive) return;
			// 	$('body').css('cursor', 'default');
			// 	e.currentTarget.default();
			// });

			this.supersixButton = this.toggleButtons(window.language2.lobby_gamename_supersix.toUpperCase(), 130, true, true);
			this.supersixButton.x = this.supersixButton.ox = this.classicButton.x + 145;
			this.supersixButton.toX = this.supersixButton.x + 60;
			this.supersixButton.y = 10;
			this.supersixButton.skewX = 24;
			this.supersixButton.scaleY = 0.8
			this.addChild(this.supersixButton);

			this.supersixButton.on('click', (e) => {
				if((window.junket == 1 && !_.isEmpty(window.vendorData))) return;
        if(this.context.component_gameButtons.yourBets.length) {
					this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_unabletochange,1);
          return;
        }
        
        window.slave = 'supersix';
        if(this.context.multiplayer) {
        	this.toggleMultiSlave(e.currentTarget);
        } else {
        	this.toggleSlave(e.currentTarget);
        }
				console.log(window.slave, "lalalalala")
				this.context.component_roadmap.drawPearlRoad(this.context.roadMarks);
				this.context.component_roadmap.drawBigRoad(this.context.roadMarks);
				this.context.component_roadmap.fnUpdateCaching();
				this.context.toggleSlaveDisp();
			});

			this.supersixButton.on('mouseover', (e) => {
				if((window.junket == 1 && !_.isEmpty(window.vendorData))) return;
				if(e.currentTarget.isActive) return;
				$('body').css('cursor', 'pointer');
				e.currentTarget.hover();
			});

			this.supersixButton.on('mouseout', (e) => {
				if((window.junket == 1 && !_.isEmpty(window.vendorData))) return;
				if(e.currentTarget.isActive) return;
				$('body').css('cursor', 'default');
				e.currentTarget.default();
			});


			if(window.slave === 'supersix') this.supersixButton.active();
			// if(window.slave === 'bonus') this.bonusButton.active();
			if(window.slave === '') this.classicButton.active();

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
      container.addChild(shape);

			if(!isslave) {
      	container.addChild(toggle_icon, toggle_icon2);
			}
			if(multi) {
      	container.addChild(line);
			}
			container.text = new createjs.Text(text, fontFormat(16, 'black', 'lato', true ) ,"#d9bf6b");
			container.text.x = isCenter ? width/2 : 120;
			container.text.y = 30/2;
			container.text.textAlign = 'center';
			container.text.textBaseline = 'middle';
			// container.text.skewX = -10;
			container.addChild(container.text);

			container.hover =  () => {
				container.strokeFill.style = 'transparent';
				container.fillCmd.linearGradient(["#d8be6a", "#efe180","#d9bf6b"], [0,0.5,1], 0,0 , width,0);
				container.text.color = '#202020'
        toggle_icon.strokeFill.style = '#473006';
        toggle_icon2.strokeFill.style = '#473006';
        line.strokeFill.style= '#473006';
			}

			container.active = () =>  {
				container.strokeFill.style = 'transparent';
				container.fillCmd.linearGradient(["#d8be6a", "#efe180","#d9bf6b"], [0,0.5,1], 0,0 , width,0);
				container.isActive = true;
				container.text.color = '#202020'
        toggle_icon.strokeFill.style = '#473006';
        toggle_icon2.strokeFill.style = '#473006';
        line.strokeFill.style= '#473006';
			}

			container.default = () =>  {
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
		toggleSlave (button, flag) {

			if(!flag && this.context.component_gameButtons.yourBets.length) {
				this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_unabletochange,1);
				return;
			}

      // this.bonusButton.default();
      this.supersixButton.default();
      this.classicButton.default();

      button.active();

			var big = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'big' && e.singleplayer});
			var small = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'small' && e.singleplayer});
			var bonus_player = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'bonus_player' && e.singleplayer});
			var bonus_banker = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'bonus_banker' && e.singleplayer});
			var supersix = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'supersix' && e.singleplayer});

			var playerpair = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'playerpair' && e.singleplayer});
			var player = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'player' && e.singleplayer});
			var tie  = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'tie' && e.singleplayer});
			var banker = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'banker' && e.singleplayer});
			var bankerpair = _.find(this.context.component_tableDraw.bet_areas, function(e) {return e.table_name === 'bankerpair' && e.singleplayer});

			//hide default slaves
			small.visible = false;
			bonus_player.visible = false;
			supersix.visible = false;
			bonus_banker.visible = false;
			big.visible = false;


			if(window.slave === 'supersix') {
				supersix.visible = true;
				// playerpair
				playerpair.width = 278;
				playerpair.x = 295;
				playerpair.color = this.context.component_tableDraw.playerpair_color;
				playerpair.gradientOptions = [[0.2,1], 10,-136,playerpair.width,0];
				playerpair.fillCmd = playerpair.graphics.clear().beginLinearGradientFill(playerpair.color.default, ...playerpair.gradientOptions).command;
				playerpair.graphics.moveTo(0, 0).lineTo(playerpair.width, 0)
				.lineTo(playerpair.width-78, 210)
				.lineTo(-136, 210)
				.lineTo(0, 0);
				playerpair.setBounds(0,0,playerpair.width,210);

				// player
				player.width = 260;
				player.x = 574;
				player.color = this.context.component_tableDraw.player_color;
				player.gradientOptions = [[0,1], 0,0,player.width,0];
				player.fillCmd = player.graphics.clear().beginLinearGradientFill(player.color.default, ...player.gradientOptions).command;
				player.graphics.moveTo(0, 0).lineTo(player.width, 0)
				.lineTo(player.width-28, 210)
				.lineTo(-78, 210)
				.lineTo(0, 0);
				player.setBounds(0,0,player.width,210);

				//tie
				tie.width = 256;
				tie.x = 832;
				tie.gradientOptions = [[0,1], 0,0,tie.width,0];
				tie.fillCmd = tie.graphics.clear().beginLinearGradientFill(tie.color.default, ...tie.gradientOptions).command;
				tie.graphics.moveTo(0, 0).lineTo(tie.width, 0)
				.lineTo(tie.width+14, 100).lineTo(-14, 100) .lineTo(0, 0);
				tie.setBounds(0,0,tie.width,100);

				//banker
				banker.width = 258;
				banker.x = 1090;
				banker.color = banker.color;
				banker.gradientOptions = [[0,1], 0,0,banker.width,0];
				banker.fillCmd = banker.graphics.clear().beginLinearGradientFill(banker.color.default, ...banker.gradientOptions).command;
				banker.graphics.moveTo(0, 0).lineTo(banker.width, 0)
				.lineTo(banker.width+78, 210)
				.lineTo(28, 210)
				.lineTo(0, 0);
				banker.setBounds(0,0,banker.width,210);

				banker.payout_multiplier = 1;

				//bankerpair
				bankerpair.width = 258;
				bankerpair.x = 1348;
				bankerpair.color = this.context.component_tableDraw.bankerpair_color;
				bankerpair.gradientOptions = [[0.2,1], 0,136,bankerpair.width,0];
				bankerpair.fillCmd = bankerpair.graphics.clear().beginLinearGradientFill(bankerpair.color.default, ...bankerpair.gradientOptions).command;
				bankerpair.graphics.moveTo(0, 0).lineTo(bankerpair.width, 0)
				.lineTo(bankerpair.width+136, 210)
				.lineTo(78, 210)
				.lineTo(0, 0);
				bankerpair.setBounds(0,0,bankerpair.width,210);


				if(!parseInt(this.context.multiplayer)) {
					this.context.component_tableDraw.supersix_outline.visible = true;
					this.context.component_tableDraw.classic_outline.visible = false;
					this.context.component_tableDraw.bonus_outline.visible = false;
				}

			} else if(window.slave === "bonus") {

				if(!parseInt(this.context.multiplayer)) {
					this.context.component_tableDraw.supersix_outline.visible = false;
					this.context.component_tableDraw.classic_outline.visible = false;
					this.context.component_tableDraw.bonus_outline.visible = true;
				}

				big.visible = true;
				small.visible = true;
				bonus_player.visible = true;
				bonus_banker.visible = true;

				//alter playerpair design
				playerpair.x = 452;
				playerpair.width = 178;
				playerpair.color = this.context.component_tableDraw.player_color;
				playerpair.graphics.clear();
				playerpair.gradientOptions = [[0,1], 0,0,playerpair.width,0];
				playerpair.fillCmd = playerpair.graphics.clear().beginLinearGradientFill(playerpair.color.default, ...playerpair.gradientOptions).command;
				playerpair.graphics.moveTo(0, 0)
				.lineTo(playerpair.width, 0)
				.lineTo(playerpair.width-30, 100)
				.lineTo(playerpair.width-80, 110)
				.lineTo(playerpair.width-118, 130)
				.lineTo(playerpair.width-125, 162)
				.lineTo(-80, 162)
				.lineTo(0, 0);
				playerpair.setBounds(0,0,playerpair.width - 20,100);

				//alter player design
				player.x = 629;
				player.width = 222;
				player.color = this.context.component_tableDraw.player_color;
				player.graphics.clear();
				player.gradientOptions = [[0,1], 0,0,player.width,0];
				player.fillCmd = player.graphics.clear().beginLinearGradientFill(player.color.default, ...player.gradientOptions).command;
				player.graphics.moveTo(0, 0).lineTo(player.width, 0)
				.lineTo(player.width-14, 162)
				.lineTo(40, 162)
				.lineTo(30, 120)
				.lineTo(-30, 100)
				.lineTo(0, 0);
				player.setBounds(0,0,player.width,162);

				//tie
				tie.width = 216;
				tie.x = 852;
				tie.color = this.context.component_tableDraw.tie_color;
				tie.graphics.clear();
				tie.gradientOptions = [[0,1], 0,0,tie.width,0];
				tie.fillCmd = tie.graphics.clear().beginLinearGradientFill(tie.color.default, ...tie.gradientOptions).command;
				tie.graphics.moveTo(0, 0).lineTo(tie.width, 0)
				.lineTo(tie.width+18, 162)
				.lineTo(-18, 162)
				.lineTo(0, 0);
				tie.setBounds(0,0,tie.width,162);

				//banker
				banker.width = 222;
				banker.x = 1066;
				banker.color = this.context.component_tableDraw.banker_color;
				banker.graphics.clear();
				banker.gradientOptions = [[0,1], 0,0,banker.width,0];
				banker.fillCmd = banker.graphics.clear().beginLinearGradientFill(banker.color.default, ...banker.gradientOptions).command;
				banker.graphics.moveTo(0, 0).lineTo(banker.width, 0)
				.lineTo(banker.width+30, 100)
				.lineTo(banker.width -10, 100)
				.lineTo(banker.width-25, 162)
				.lineTo(20, 162)
				.lineTo(0, 0);
				banker.setBounds(0,0,banker.width,162);

				//bankerpair
				bankerpair.width = 180;
				bankerpair.x = 1288;
				bankerpair.color = this.context.component_tableDraw.banker_color;
				bankerpair.graphics.clear();
				bankerpair.gradientOptions = [[0.2,1], 0,136,bankerpair.width,0];
				bankerpair.fillCmd = bankerpair.graphics.clear().beginLinearGradientFill(bankerpair.color.default, ...bankerpair.gradientOptions).command;

				bankerpair.graphics.moveTo(0, 0).lineTo(bankerpair.width, 0)
				.lineTo(bankerpair.width+80, 162)
				.lineTo(126, 162)
				.lineTo(116, 120)
				.lineTo(80, 100)
				.lineTo(30, 100)
				.lineTo(0, 0);
				bankerpair.setBounds(0,0,bankerpair.width + 20,100);
			} else {

				this.context.component_gameButtons.previousBet = _.filter(this.context.component_gameButtons.previousBet, function(e) {
					return e.table_id != 'supersix'
				})

				// playerpair
				playerpair.width = 278;
				playerpair.x = 295;
				playerpair.color = this.context.component_tableDraw.playerpair_color;
				playerpair.gradientOptions = [[0.2,1], 10,-136,playerpair.width,0];
				playerpair.fillCmd = playerpair.graphics.clear().beginLinearGradientFill(playerpair.color.default, ...playerpair.gradientOptions).command;
				playerpair.graphics.moveTo(0, 0).lineTo(playerpair.width, 0)
				.lineTo(playerpair.width-78, 210)
				.lineTo(-136, 210)
				.lineTo(0, 0);
				playerpair.setBounds(0,0,playerpair.width,210);

				// player
				player.width = 260;
				player.x = 574;
				player.color = this.context.component_tableDraw.player_color;
				player.gradientOptions = [[0,1], 0,0,player.width,0];
				player.fillCmd = player.graphics.clear().beginLinearGradientFill(player.color.default, ...player.gradientOptions).command;
				player.graphics.moveTo(0, 0).lineTo(player.width, 0)
				.lineTo(player.width-28, 210)
				.lineTo(-78, 210)
				.lineTo(0, 0);
				player.setBounds(0,0,player.width,210);

				// tie
				tie.width = 256;
				tie.x = 832;
				tie.color = this.context.component_tableDraw.tie_color;
				tie.gradientOptions = [[0,1], 0,0,tie.width,0];
				tie.fillCmd = tie.graphics.clear().beginLinearGradientFill(tie.color.default, ...tie.gradientOptions).command;
				tie.graphics.moveTo(0, 0).lineTo(tie.width, 0)
				.lineTo(tie.width+27, 210)
				.lineTo(-28, 210)
				.lineTo(0, 0);
				tie.setBounds(0,0,tie.width,210);

				//banker
				banker.width = 258;
				banker.x = 1090;
				banker.color = this.context.component_tableDraw.banker_color;
				banker.gradientOptions = [[0,1], 0,0,banker.width,0];
				banker.fillCmd = banker.graphics.clear().beginLinearGradientFill(banker.color.default, ...banker.gradientOptions).command;
				banker.graphics.moveTo(0, 0).lineTo(banker.width, 0)
				.lineTo(banker.width+78, 210)
				.lineTo(28, 210)
				.lineTo(0, 0);
				banker.setBounds(0,0,banker.width,210);

				banker.payout_multiplier = 0.95;
				//bankerpair
				bankerpair.width = 258;
				bankerpair.x = 1348;
				bankerpair.color = this.context.component_tableDraw.bankerpair_color;
				bankerpair.gradientOptions = [[0.2,1], 0,136,bankerpair.width,0];
				bankerpair.fillCmd = bankerpair.graphics.clear().beginLinearGradientFill(bankerpair.color.default, ...bankerpair.gradientOptions).command;
				bankerpair.graphics.moveTo(0, 0).lineTo(bankerpair.width, 0)
				.lineTo(bankerpair.width+136, 210)
				.lineTo(78, 210)
				.lineTo(0, 0);
				bankerpair.setBounds(0,0,bankerpair.width,210);


				if(!parseInt(this.context.multiplayer)) {
					this.context.component_tableDraw.supersix_outline.visible = false;
					this.context.component_tableDraw.classic_outline.visible = true;
					this.context.component_tableDraw.bonus_outline.visible = false;
				}
			}

			// toggle unconfirmed bets
			this.toggleSlaveBet();
      //store change slave
      $.post("/setGameSettings", {slave : window.slave !== '' ? window.slave : 'classic', game: `Baccarat/${window.tableNum}`});
		},
		toggleMultiSlave (button, flag) {

			let area_color = this.context.component_multiplayer.default_color;

			let users = this.context.component_multiplayer.toSet;

			if(!flag && this.context.component_gameButtons.yourBets.length) {
				this.context.component_messages.setMessage(window.language2.com_sub_ingameprompts_unabletochange,1);
				return;
			}

      // this.bonusButton.default();
      this.supersixButton.default();
      this.classicButton.default();

      button.active();

			var big = _.find(this.context.component_multiplayer.bet_areas, function(e) {return e.table_name === 'big' && e.multiplayer});
			big.visible = false;
			var small = _.find(this.context.component_multiplayer.bet_areas, function(e) {return e.table_name === 'small' && e.multiplayer});
			small.visible = false;
			var bonus_player = _.find(this.context.component_multiplayer.bet_areas, function(e) {return e.table_name === 'bonus_player' && e.multiplayer});
			bonus_player.visible = false;
			var bonus_banker = _.find(this.context.component_multiplayer.bet_areas, function(e) {return e.table_name === 'bonus_banker' && e.multiplayer});
			bonus_banker.visible = false;
			var supersix = _.find(this.context.component_multiplayer.bet_areas, function(e) {return e.table_name === 'supersix' && e.multiplayer});
			supersix.visible = false;

			var playerpair = _.find(this.context.component_multiplayer.bet_areas, function(e) {return e.table_name === 'playerpair' && e.multiplayer});
			var player = _.find(this.context.component_multiplayer.bet_areas, function(e) {return e.table_name === 'player' && e.multiplayer});;
			var tie  = _.find(this.context.component_multiplayer.bet_areas, function(e) {return e.table_name === 'tie' && e.multiplayer});;
			var banker = _.find(this.context.component_multiplayer.bet_areas, function(e) {return e.table_name === 'banker' && e.multiplayer});;
			var bankerpair = _.find(this.context.component_multiplayer.bet_areas, function(e) {return e.table_name === 'bankerpair' && e.multiplayer});;


			///*** toggle multiplayer classic reset
			for(var x = 0; x < users.length; x++ ) {
				let bet_areas = this.context.component_multiplayer[users[x]];
				for( var i = 0 ; i < bet_areas.length; i++) {
					if(bet_areas[i].betarea === 'bankerpair' || bet_areas[i].betarea === 'playerpair') bet_areas[i].visible = true;
					if(bet_areas[i].betarea === 'supersix') bet_areas[i].visible = false;

					if(bet_areas[i].betarea === 'banker') {
						bet_areas[i].payout_multiplier = 0.95;
					}

					if(bet_areas[i].classic) {
						let cmd = bet_areas[i].classic;
						bet_areas[i].graphics.clear();

						if(users[x]  === 'user_1') {
							bet_areas[i].graphics.beginLinearGradientFill(['rgba(255,255,255,0.01)',area_color,area_color], [0,0.5, 1], 0,cmd[1], cmd[2]/2,cmd[5])
							.moveTo(cmd[0],cmd[1])
							.lineTo(cmd[2], cmd[3]).lineTo(cmd[4], cmd[5])
							.lineTo(cmd[6], cmd[7]).lineTo(cmd[8], cmd[9]);
						} else if(users[x]  === 'user_8') {
							bet_areas[i].graphics.beginLinearGradientFill([area_color,area_color,'rgba(255,255,255,0.1)'], [0,0.5,1], cmd[2]/2,cmd[5],cmd[2],cmd[1])
							.moveTo(cmd[0],cmd[1])
							.lineTo(cmd[2], cmd[3]).lineTo(cmd[4], cmd[5])
							.lineTo(cmd[6], cmd[7]).lineTo(cmd[8], cmd[9]);
						} else {
							bet_areas[i].graphics.beginFill(area_color).moveTo(cmd[0],cmd[1])
							.lineTo(cmd[2], cmd[3]).lineTo(cmd[4], cmd[5])
							.lineTo(cmd[6], cmd[7]).lineTo(cmd[8], cmd[9]);
						}
						bet_areas[i].setBounds(0,cmd[1],cmd[2],cmd[5]);
					}
				} //end for
			} //end for
			///*** end multiplayer
			///
			if(window.slave === 'supersix') {

				if(parseInt(window.multiplayer)) {
					this.context.component_multiplayer.supersix_outline.visible = true;
					this.context.component_multiplayer.classic_outline.visible = false;
					this.context.component_multiplayer.bonus_outline.visible = false;
				}

				player.width = 288;
				player.height = 54;
				player.x = 816;
				player.y = 762;
				player.color = this.context.component_tableDraw.player_color;
				player.gradientOptions = [[0.2,1], 10,-136,player.width,0];
				player.fillCmd = player.graphics.clear().beginLinearGradientFill(player.color.default, ...player.gradientOptions).command
				player.graphics.moveTo(0, 0).lineTo(player.width, 0)
				.lineTo(player.width+8, player.height)
				.lineTo(-8, player.height)
				.lineTo(0, 0);
				player.setBounds(0,0,player.width,player.height);
				//tie
				tie.width = 264;
				tie.height = 48;
				tie.x = 828;
				tie.y = 714 - 46;
				tie.color = this.context.component_tableDraw.tie_color;
				tie.gradientOptions = [[0.2,1], 10,-136,tie.width,0];
				tie.fillCmd = tie.graphics.clear().beginLinearGradientFill(tie.color.default, ...tie.gradientOptions).command;
				tie.graphics.moveTo(0, 0).lineTo(tie.width, 0)
				.lineTo(tie.width+6.5, tie.height)
				.lineTo(-6.5, tie.height)
				.lineTo(0, 0);
				tie.setBounds(0,0,tie.width,tie.height);
				//playerpair
				playerpair.width = 160;
				playerpair.height = 48;
				playerpair.x = 546;
				playerpair.y = 624;
				playerpair.color = this.context.component_tableDraw.player_color;
				playerpair.gradientOptions = [[0.2,1], 10,-136,playerpair.width,0];
				playerpair.fillCmd = playerpair.graphics.clear().beginLinearGradientFill(playerpair.color.default, ...playerpair.gradientOptions).command;
				playerpair.graphics.moveTo(0, 0).lineTo(playerpair.width, 0)
				.lineTo(playerpair.width-14, playerpair.height)
				.lineTo(-20, playerpair.height)
				.lineTo(0, 0);
				playerpair.setBounds(0,0,playerpair.width,playerpair.height);
				//bankerpair
				bankerpair.width = 160;
				bankerpair.height = 48;
				bankerpair.x = 1212;
				bankerpair.y = 624;
				bankerpair.color = this.context.component_tableDraw.banker_color;
				bankerpair.gradientOptions = [[0.2,1], 10,-136,bankerpair.width,0];
				bankerpair.fillCmd = bankerpair.graphics.clear().beginLinearGradientFill(bankerpair.color.default, ...bankerpair.gradientOptions).command;
				bankerpair.graphics.moveTo(0, 0).lineTo(bankerpair.width, 0)
				.lineTo(bankerpair.width+20, bankerpair.height)
				.lineTo(14, bankerpair.height)
				.lineTo(0, 0);
				bankerpair.setBounds(0,0,bankerpair.width,bankerpair.height);

				//adjust for supersix
				banker.width = 138;
				banker.height = 48;
				banker.x = 822;
				banker.y = 714;
				banker.gradientOptions = [[0.2,1], 10,-136,banker.width,0];
				banker.fillCmd = banker.graphics.clear().beginLinearGradientFill(banker.color.default, ...banker.gradientOptions).command;
				banker.graphics.moveTo(0, 0).lineTo(banker.width, 0)
				.lineTo(banker.width, banker.height)
				.lineTo(-6, banker.height)
				.lineTo(0, 0);
				banker.setBounds(0,0,banker.width, banker.height)

				supersix.visible = true;
				/** multiplayer toggle start */
				for(var x = 0; x < users.length; x++ ) {
					let bet_areas = this.context.component_multiplayer[users[x]];
					for( var i = 0 ; i < bet_areas.length; i++) {
						if(bet_areas[i].betarea === 'bankerpair' || bet_areas[i].betarea === 'playerpair' || bet_areas[i].betarea === 'supersix') bet_areas[i].visible = true;

						if(bet_areas[i].betarea === 'banker') {
							bet_areas[i].payout_multiplier = 1;
						}
						if(bet_areas[i].supersix) {
							let cmd = bet_areas[i].supersix;
							bet_areas[i].graphics.clear();

							if(users[x]  === 'user_1' && bet_areas[i].betarea != 'supersix') {
								bet_areas[i].graphics.beginLinearGradientFill(['rgba(255,255,255,0.01)',area_color,area_color], [0,0.5, 1], 0,cmd[1], cmd[2]/2,cmd[5])
								.moveTo(cmd[0],cmd[1])
								.lineTo(cmd[2], cmd[3]).lineTo(cmd[4], cmd[5])
								.lineTo(cmd[6], cmd[7]).lineTo(cmd[8], cmd[9]);
							}  else {
								bet_areas[i].graphics.beginFill(area_color).moveTo(cmd[0],cmd[1])
								.lineTo(cmd[2], cmd[3]).lineTo(cmd[4], cmd[5])
								.lineTo(cmd[6], cmd[7]).lineTo(cmd[8], cmd[9]);
							}
							bet_areas[i].setBounds(0,cmd[1],cmd[2],cmd[5]);
						}

					} //end for
				} //end for
				// /* end multiplayer
			} else if(window.slave ==='bonus') {

				if(parseInt(window.multiplayer)) {
					this.context.component_multiplayer.supersix_outline.visible = false;
					this.context.component_multiplayer.classic_outline.visible = false;
					this.context.component_multiplayer.bonus_outline.visible = true;
				}

				big.visible = true;
				small.visible = true;
				bonus_player.visible = true;
				bonus_banker.visible = true;

				var playerpair = _.find(this.context.component_multiplayer.bet_areas, function(e) {return e.table_name === 'playerpair' && e.multiplayer});
				playerpair.width = 216;
				playerpair.height = 42;
				playerpair.x = 736;
				playerpair.y = 630;
				playerpair.fillCmd = playerpair.graphics.clear().beginLinearGradientFill(playerpair.color.default, ...playerpair.gradientOptions).command;
				playerpair.graphics.moveTo(0, 0).lineTo(playerpair.width, 0)
				.lineTo(playerpair.width, playerpair.height)
				.lineTo(-10, playerpair.height)
				.lineTo(0, 0);
				playerpair.setBounds(0,0,playerpair.width, playerpair.height)

				var bankerpair = _.find(this.context.component_multiplayer.bet_areas, function(e) {return e.table_name === 'bankerpair' && e.multiplayer});
				bankerpair.width = 216;
				bankerpair.height = 42;
				bankerpair.x = 972;
				bankerpair.y = 630;
				bankerpair.fillCmd = bankerpair.graphics.clear().beginLinearGradientFill(bankerpair.color.default, ...bankerpair.gradientOptions).command;
				bankerpair.graphics.moveTo(0, 0).lineTo(bankerpair.width, 0)
				.lineTo(bankerpair.width+8, bankerpair.height)
				.lineTo(0, bankerpair.height)
				.lineTo(0, 0);
				bankerpair.setBounds(0,0,bankerpair.width, bankerpair.height)

				var tie = _.find(this.context.component_multiplayer.bet_areas, function(e) {return e.table_name === 'tie' && e.multiplayer});
				tie.width = 270;
				tie.height = 42;
				tie.x = 824;
				tie.y = 690;
				tie.gradientOptions = [[0.2,1], 0,0,tie.width,0];
				tie.fillCmd = tie.graphics.clear().beginLinearGradientFill(tie.color.default, ...tie.gradientOptions).command;
				tie.graphics.moveTo(0, 0).lineTo(tie.width, 0)
				.lineTo(tie.width+7, tie.height)
				.lineTo(-6.5, tie.height)
				.lineTo(0, 0);
				tie.setBounds(0,0,tie.width,tie.height);

				var banker = _.find(this.context.component_multiplayer.bet_areas, function(e) {return e.table_name === 'banker' && e.multiplayer});
				banker.width = 282;
				banker.height = 42;
				banker.y = 730;
				banker.x = 820;
				banker.gradientOptions = [[0.2,1], 10,-136,banker.width,0];
				banker.fillCmd = banker.graphics.clear().beginLinearGradientFill(banker.color.default, ...banker.gradientOptions).command;
				banker.graphics.moveTo(0, 0).lineTo(banker.width, 0)
				.lineTo(banker.width+6, banker.height)
				.lineTo(-6, banker.height)
				.lineTo(0, 0);
				banker.setBounds(0,0,banker.width,banker.height);

				var player = _.find(this.context.component_multiplayer.bet_areas, function(e) {return e.table_name === 'player' && e.multiplayer});
				player.width = 292;
				player.height = 46;
				player.x = 814;
				player.y = 772;
				player.gradientOptions = [[0.2,1], 0,0,player.width,0];
				player.fillCmd = player.graphics.clear().beginLinearGradientFill(player.color.default, ...player.gradientOptions).command;
				player.graphics.moveTo(0, 0).lineTo(player.width, 0)
				.lineTo(player.width+6, player.height)
				.lineTo(-6, player.height)
				.lineTo(0, 0);
				player.setBounds(0,0,player.width,player.height);


				/** multiplayer toggle start */
				for(var x = 0; x < users.length; x++ ) {
					let bet_areas = this.context.component_multiplayer[users[x]];
					for( var i = 0 ; i < bet_areas.length; i++) {
						if(bet_areas[i].betarea === 'supersix') bet_areas[i].visible = false;
						if(bet_areas[i].betarea === 'bankerpair' || bet_areas[i].betarea === 'playerpair') bet_areas[i].visible = false;
						if(bet_areas[i].bonus) {

							let cmd = bet_areas[i].bonus;
							bet_areas[i].graphics.clear();
							if(users[x]  === 'user_1') {
								bet_areas[i].graphics.beginLinearGradientFill(['rgba(255,255,255,0.01)',area_color,area_color], [0,0.5, 1], 0,cmd[1], cmd[2]/2,cmd[5])
								.moveTo(cmd[0],cmd[1])
								.lineTo(cmd[2], cmd[3]).lineTo(cmd[4], cmd[5])
								.lineTo(cmd[6], cmd[7]).lineTo(cmd[8], cmd[9]);
							} else if(users[x]  === 'user_8') {
								bet_areas[i].graphics.beginLinearGradientFill([area_color,area_color,'rgba(255,255,255,0.01)'], [0,0.5,1], cmd[2]/2,cmd[5],cmd[2],cmd[1])
								.moveTo(cmd[0],cmd[1])
								.lineTo(cmd[2], cmd[3]).lineTo(cmd[4], cmd[5])
								.lineTo(cmd[6], cmd[7]).lineTo(cmd[8], cmd[9]);
							} else {
								bet_areas[i].graphics.beginFill(area_color).moveTo(cmd[0],cmd[1])
								.lineTo(cmd[2], cmd[3]).lineTo(cmd[4], cmd[5])
								.lineTo(cmd[6], cmd[7]).lineTo(cmd[8], cmd[9]);
							}
							bet_areas[i].setBounds(0,cmd[1],cmd[2],cmd[5]);
						}
					} //end for
				} //end for
				// /* end multiplayer
			} else {

				this.context.component_gameButtons.previousBet = _.filter(this.context.component_gameButtons.previousBet, function(e) {
					return e.table_id != 'supersix'
				})

				player.width = 288;
				player.height = 54;
				player.x = 816;
				player.y = 762;
				player.color = this.context.component_tableDraw.player_color;
				player.gradientOptions = [[0.2,1], 10,-136,player.width,0];
				player.fillCmd = player.graphics.clear().beginLinearGradientFill(player.color.default, ...player.gradientOptions).command
				player.graphics.moveTo(0, 0).lineTo(player.width, 0)
				.lineTo(player.width+8, player.height)
				.lineTo(-8, player.height)
				.lineTo(0, 0);
				player.setBounds(0,0,player.width,player.height);
				//banker
				banker.width = 276;
				banker.height = 48;
				banker.x = 822;
				banker.y = 714;
				banker.color = this.context.component_tableDraw.banker_color;
				banker.gradientOptions = [[0.2,1], 10,-136,banker.width,0];
				banker.fillCmd = banker.graphics.clear().beginLinearGradientFill(banker.color.default, ...banker.gradientOptions).command
				banker.graphics.moveTo(0, 0).lineTo(banker.width, 0)
				.lineTo(banker.width+6.5, banker.height)
				.lineTo(-6.5, banker.height)
				.lineTo(0, 0);
				banker.setBounds(0,0,banker.width,banker.height);

				//tie
				tie.width = 264;
				tie.height = 48;
				tie.x = 828;
				tie.y = 714 - 46;
				tie.color = this.context.component_tableDraw.tie_color;
				tie.gradientOptions = [[0.2,1], 10,-136,tie.width,0];
				tie.fillCmd = tie.graphics.clear().beginLinearGradientFill(tie.color.default, ...tie.gradientOptions).command;
				tie.graphics.moveTo(0, 0).lineTo(tie.width, 0)
				.lineTo(tie.width+6.5, tie.height)
				.lineTo(-6.5, tie.height)
				.lineTo(0, 0);
				tie.setBounds(0,0,tie.width,tie.height);

				//playerpair
				playerpair.width = 160;
				playerpair.height = 48;
				playerpair.x = 546;
				playerpair.y = 624;
				playerpair.color = this.context.component_tableDraw.player_color;
				playerpair.gradientOptions = [[0.2,1], 10,-136,playerpair.width,0];
				playerpair.fillCmd = playerpair.graphics.clear().beginLinearGradientFill(playerpair.color.default, ...playerpair.gradientOptions).command;
				playerpair.graphics.moveTo(0, 0).lineTo(playerpair.width, 0)
				.lineTo(playerpair.width-14, playerpair.height)
				.lineTo(-20, playerpair.height)
				.lineTo(0, 0);
				playerpair.setBounds(0,0,playerpair.width,playerpair.height);

				//bankerpair
				bankerpair.width = 160;
				bankerpair.height = 48;
				bankerpair.x = 1212;
				bankerpair.y = 624;
				bankerpair.color = this.context.component_tableDraw.banker_color;
				bankerpair.gradientOptions = [[0.2,1], 10,-136,bankerpair.width,0];
				bankerpair.fillCmd = bankerpair.graphics.clear().beginLinearGradientFill(bankerpair.color.default, ...bankerpair.gradientOptions).command;
				bankerpair.graphics.moveTo(0, 0).lineTo(bankerpair.width, 0)
				.lineTo(bankerpair.width+20, bankerpair.height)
				.lineTo(14, bankerpair.height)
				.lineTo(0, 0);
				bankerpair.setBounds(0,0,bankerpair.width,bankerpair.height);

				if(parseInt(window.multiplayer)) {
					this.context.component_multiplayer.supersix_outline.visible = false;
					this.context.component_multiplayer.classic_outline.visible = true;
					this.context.component_multiplayer.bonus_outline.visible = false;
				}
			}

			// toggle unconfirmed bets
			this.toggleSlaveBet();

      //toggle multiplayer data
      this.context.component_multiplayer.reset();//reset other player bets
      if(this.context.allMultiplayer_data && this.context.allMultiplayer_data.length) {
      	for(var x = 0; x < this.context.allMultiplayer_data.length; x++)  {
      		if(this.context.allMultiplayer_data[x].data.length) {
		      	let slave = this.context.allMultiplayer_data[x].data[0].slave;
		      	if(slave ===  this.context.getSlave()) {
							this.context.component_multiplayer.setMultiplayer(this.context.allMultiplayer_data[x])
		      	} // end if
      		} //end if
      	} // end of for
      } // end of if
      //store change slave
      $.post("/setGameSettings", {slave : window.slave !== '' ? window.slave : 'classic', game: `Baccarat/${window.tableNum}`});
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

            if(window.slave !='bonus') {
            	tempBets = _.filter(tempBets, function(e) {
            		return e.table_id != 'bonus_player' && e.table_id != 'bonus_banker' && e.table_id != 'big' && e.table_id != 'small';
            	});
            }

            if(window.slave !='supersix') {
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
          case ('Player Pair - Banker Pair'):
            let pairMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
            let pairMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
            break;

          case ('Tie'):
            let tieMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
            let tieMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
            break;

          case ('Super 6'):
            let superMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
            let superMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
            break;

          case ('Big - Small'):
            let sizeMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
            let sizeMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
            break;

          case ('Bonus'):
            let bonusMin = (sideBet.min * parseInt(window.currencyMultiplier)) * window.userMultiplier;
            let bonusMax = (sideBet.max * parseInt(window.currencyMultiplier)) * window.userMultiplier;
            break;
        }
      }

      $(".-banker-min, .-player-min").html(numberWithCommas(mainAreaMin));
      $(".-banker-max, .-player-max").html(numberWithCommas(mainAreaMax));
      $(".-tie-min").html(numberWithCommas(tieMin));
      $(".-tie-max").html(numberWithCommas(tieMax));
      $(".-pair-min").html(numberWithCommas(pairMin));
      $(".-pair-max").html(numberWithCommas(pairMax));

      $(".-supersix-max").html(numberWithCommas(superMin));
      $(".-supersix-min").html(numberWithCommas(superMax));

      if(window.slave == 'supersix') {
      		$(".-banker-payout").html('1:1');
      } else {
      		$(".-banker-payout").html('0.95:1');
      }

      this.context.component_betBoard.bet_areas.forEach((e) => {
        if(e.table_name.indexOf('tie') >-1) {
          e.min_betAmt = tieMin;
          e.max_betAmt = tieMax;
        }

        if(e.table_name =='player' || e.table_name == 'banker') {
          e.min_betAmt = mainAreaMin;
          e.max_betAmt = mainAreaMax;
        }

        if(e.table_name.indexOf('pair') >-1) {
          e.min_betAmt = pairMin;
          e.max_betAmt = pairMax;
        }

        if(e.table_name === 'supersix') {
          e.min_betAmt = superMin;
          e.max_betAmt = superMax;
        }

        if(e.table_name === 'big' || e.table_name === 'smal') {
          e.min_betAmt = sizeMin;
          e.max_betAmt = sizeMax;
        }

        if(e.table_name.indexOf('bonus') >-1) {
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
					this.supersixButton.x = this.supersixButton.toX;
					this.classicButton.x = this.classicButton.toX;
					// this.bonusButton.x = this.bonusButton.toX;

					this.multiButton.x = this.multiButton.toX;
					this.singleButton.x = this.singleButton.toX;
        })
			} else {
				createjs.Tween.get(this)
        .to({
          alpha : 0
        },100)
        .to({
          alpha : 1
        },1).call(() => {
					this.supersixButton.x = this.supersixButton.ox;
					this.classicButton.x =  this.classicButton.ox;
					// this.bonusButton.x = this.bonusButton.ox;

					this.multiButton.x = this.multiButton.ox;
					this.singleButton.x = this.singleButton.ox;
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
				  board.x = 178;

				  let classic_texts = board.classic_outline.texts;

					for(let i = 0; i < classic_texts.length; i++) {
						classic_texts[i].scaleX = 1.2;
					}
					board.classic_outline.updateCache();

					let supersix_texts = board.supersix_outline.texts;

					for(let i = 0; i < classic_texts.length; i++) {
						supersix_texts[i].scaleX = 1.2;
					}
					board.supersix_outline.updateCache();

        }, [this.context.component_multiplayer])
        .to({
          alpha : 1
        },100)

        createjs.Tween.get(this.context.component_burnCard)
        .to({
          x : -355
        },200)

        this.context.component_toggle.togglePositions(true);
      } else {
        $("#menu-container").animate({'right': '0'}, {
          complete: function () {
            $(this).css({'overflow' : 'initial'});
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
		  board.x = -15;

		  let classic_texts = board.classic_outline.texts;

			for(let i = 0; i < classic_texts.length; i++) {
				classic_texts[i].scaleX = 1;
			}
			board.classic_outline.updateCache();

			let supersix_texts = board.supersix_outline.texts;

			for(let i = 0; i < classic_texts.length; i++) {
				supersix_texts[i].scaleX = 1;
			}
			board.supersix_outline.updateCache();

        }, [this.context.component_multiplayer])
        .to({
          alpha : 1
        },100)

        createjs.Tween.get(this.context.component_burnCard)
        .to({
          x : 0
        },200)

      }
    }
	})

	return instance;
}
