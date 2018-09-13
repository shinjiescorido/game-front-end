import timer from '../../timer-animation';
import { setCurrentTimezone, fontFormat } from '../../factories/factories';

class Game {

	constructor(data, x, y, w, h, parent, self, isjunket, roomdata) {
		this.data = data;
		this.roomdata = [];
		this.namespace = data.namespace;
		this.ctx = self;

		this.isDealAnimation = false;

		let _this = this;

		let gameNameTable = this.namespace.split("/")[0];

		if (isJunket) {
			if (roomdata.length) {
				this.roomdata = _.cloneDeep(roomdata);
			}
		}
		// } else if(isJunket == 1) {
		// 	if (roomdata) {
		// 		this.roomdata.push(roomdata)
		// 	}
		// }

		this.roomdata = _.uniqBy(this.roomdata, function(e) { return e.token });
		this.isMulti = false;

		this.canvas = document.createElement("canvas");
		this.canvas.setAttribute('width', `${w}px`);
		this.canvas.setAttribute('height',`${h}px`);

		// if(isjunket == 1) {
		// 	this.canvas.setAttribute('id', data.namespace+'-'+this.roomdata[0].roomId);
		// 	this.canvas.setAttribute('data', data.namespace+'-'+this.roomdata[0].roomId);
		// } else {
			this.canvas.setAttribute('id', data.namespace);
			this.canvas.setAttribute('data', data.namespace);
		// }

		this.isDisabled = false;
		this.isMaintenance = false;

		// canvas hover
		this.canvasHover = document.createElement('div');

		if(window.isJunket > 0) {
			this.canvasHover.className = "game-hover";

			if(window.isJunket == 1) {
				if(gameNameTable == 'Poker' || gameNameTable == 'Sicbo' || gameNameTable == 'Pai-Gow')  {
					this.canvasHover.className = 'game-hover noButton';
					if(this.roomdata.length) {
						this.canvasHover.className = "game-hover";
					}
				}
			}

		} else {
			if(gameNameTable == "Baccarat" || gameNameTable == "Dragon-Tiger") {
				this.canvasHover.className = "game-hover";
			} else {
				this.canvasHover.className = "game-hover noButton";
			}
		}


		let gameHover = data.namespace.split("/").join("-");
		this.canvasHover.setAttribute('id',  `${gameHover}-hover`);
		//disabled enabled overlay
		this.canvasOverlay = document.createElement("div");
		this.canvasOverlay.className = `game-room-overlay ${this.data.namespace.replace('/', '-')}`

		$(this.canvasOverlay).css({
			width : `${w+2}px`,
			height: `${h+2}px`
		})

		var checkBox = document.createElement('input');
		checkBox.setAttribute("type", "checkbox");
		checkBox.setAttribute("value", `${this.data.namespace}`);

		var slider = document.createElement('span');
		slider.className = "slider"

		//checkbox button for enabling/disabling game
		this.toggleActiveButton = document.createElement('label');
		$(this.toggleActiveButton).append(checkBox, slider);
		this.toggleActiveButton.className = "room-active-toggle"
		$(this.toggleActiveButton).attr('data-namespace', `${this.data.namespace.replace('/', '-')}`)

		// canvas game container
		this.canvasCon = document.createElement('div');
		this.canvasCon.className = "game-con";

		// bet range container
		this.betrangeCon = document.createElement('div');
		this.betrangeCon.className = 'betRangeButtons';

		// maintenance container
		this.maintenanceCon = document.createElement('div');
		this.maintenanceCon.className = "maintenance-con";
		this.maintenanceCon.setAttribute('id',  `${gameHover}`);

		this.maintenanceHeader = document.createElement('div');
		this.maintenanceHeader.className = 'maintenance-header';
		this.maintenanceHeaderText = document.createElement('p');
		// let tableName = document.createTextNode(`${data.gameName} ${data.tableNumber}`);
		//$(this.maintenanceHeaderText).append(tableName);

		this.maintenanceBody = document.createElement('div');
		this.maintenanceBody.className = 'maintenance-body';
		this.maintextCap1 = document.createElement('p');
		this.maintextCap1.className = 'maintext';
		this.subtextCap1 = document.createElement('p');
		this.subtextCap1.className = 'subtext';
		$(this.maintenanceBody).append(this.maintextCap1, this.subtextCap1);

		// BUTTONS
		// baccarat & other games
		this.singleplayerButton = document.createElement('input');
		this.singleplayerButton.className = "singleplayer gameButtons";
		this.singleplayerButton.setAttribute("type", "button");
		this.singleplayerButton.value = window.language2.com_sub_betlayout_singleplayer;

		this.multiplayerButton = document.createElement('input');
		this.multiplayerButton.className = "multiplayer gameButtons";
		this.multiplayerButton.setAttribute("type", "button");
		this.multiplayerButton.value = window.language2.com_sub_betlayout_multiplayer;

		// junket rooms button
		this.createroomButton = document.createElement('input');
		this.createroomButton.className = "createroom gameButtons";
		this.createroomButton.setAttribute('id', `create-${this.data.gameName}-${this.data.tableNumber}`)
		this.createroomButton.setAttribute("type", "button");
		this.createroomButton.value = window.language2.nihtanjunket_lobby_createroom;

		// input password
		this.inputPassword = document.createElement('input');
		this.inputPassword.className = "createroom gameButtons password";
		this.inputPassword.setAttribute('id', `password-${this.data.gameName}-${this.data.tableNumber}`)
		this.inputPassword.setAttribute("type", "password");
		this.inputPassword.setAttribute("placeholder", window.language2.nihtanjunket_clientpage_password);
		this.inputPassword.setAttribute("maxlength", "4");

		this.inputPasswordFail = document.createElement('p');
		this.inputPasswordFail.className = "user error-mes";
		let inputPasswordFailMessage = document.createTextNode(window.language2.nihtanjunket_lobby_wrongpassword);
		$(this.inputPasswordFail).append(inputPasswordFailMessage);

		this.enterButton = document.createElement('input');
		this.enterButton.className = "enter gameButtons";
		this.enterButton.setAttribute("type", "button");
		this.enterButton.setAttribute("maxlength", "4");
		this.enterButton.value = window.language2.nihtanjunket_lobby_enter;
		if(this.roomdata.length) {
			this.enterButton.setAttribute('data-room_id', `${this.roomdata[0].roomId}`)
			this.enterButton.setAttribute('data-token', `${this.roomdata[0].token}`)
		}
		// if(isJunket == 1) {
		// 	this.enterButton.setAttribute('id', `enter-${this.data.gameName}-${this.data.tableNumber}-${this.roomdata[0].roomId}`)
		// } else {
			this.enterButton.setAttribute('id', `enter-${this.data.gameName}-${this.data.tableNumber}`)
		// }


		this.createroomSubmitButton = document.createElement('button');
		this.createroomSubmitButton.setAttribute("id", "junket-create");
		this.createroomSubmitButton.setAttribute('class', 'popup-btn--create');
		this.createroomSubmitButton.setAttribute("type", "button");
		this.createroomSubmitTxt =  document.createTextNode(window.language.lobby.create_room);
		$(this.createroomSubmitButton).append(this.createroomSubmitTxt)

		this.cancelButton =  document.createElement('button');
		this.cancelButton.setAttribute("id", "junket-cancel");
		this.cancelButton.setAttribute('class', 'popup-btn--cancel');
		this.cancelButton.setAttribute("type", "button");
		this.cancelTxt = document.createTextNode(window.language.rooms.cancel);
		$(this.cancelButton).append(this.cancelTxt)

		// create div
		// this.roomCon = document.createElement('div');
		// this.roomCon.setAttribute('class', 'room-con');
		// let gameRoom = data.namespace.split("/").join("-");
		// this.roomCon.setAttribute('id',  `${gameRoom}-room`);

		// if(isJunket==1 && this.roomdata.length > 0) {
		// 	this.roomCon.setAttribute('class', `room-con room--${this.roomdata[0].roomId}`);
		// 	this.roomCon.setAttribute('id',  `${gameRoom}-room-${this.roomdata[0].roomId}`);
		// }

		this.buttonCon = document.createElement('div');
		this.buttonCon.setAttribute('class', 'popup-btn-inner');
		$(this.buttonCon).append(this.cancelButton, this.createroomSubmitButton)

		let rangeToUse = [];
		let roomsDropDown = "";
		let gameButtonsClassName = ["firstBetRange", "secondBetRange", "thirdBetRange", "fourthBetRange", "fifthBetRange", "sixthBetRange"];
		if (window.junket) {
			rangeToUse = data.sportBetRanges;
		} else {
			rangeToUse = data.casinoBetRanges;
		}

		// if (window.userType == 'TS' || window.userType == 'S') {
		// 	rangeToUse = data.sportBetRanges;
		// } else if (window.userType == 'TC' || window.userType == 'C') {
		// 	rangeToUse = data.casinoBetRanges;
		// }

    // agent range checking starts here
    let roomType = this.data.roomType === 'n'? 'normal' : this.data.roomType === 'v'? 'vip' : 'premium';
    let isFlippy = this.data.gameName === 'Baccarat' && this.data.type === 'flippy';
    let a_range = _.find(agent_range, (a)=> {
      if(a.gameType.toLowerCase() === 'flippy') {
        return a.game === data.gameName && a.type === roomType && isFlippy;
      } else {
        return a.game === data.gameName && a.type === roomType && !isFlippy;
      }
    });
    if(window.agent_range.length && !_.isEmpty(a_range)) {
      rangeToUse = a_range.ranges;
    }

		this.betRangeButtons = [];
		for(let i = 0; i < rangeToUse.length; i++) {
			// if(rangeToUse.length == 6) {
			// 	this.canvasCon.className = "game-con morebutton";
			// }
			this.betRangeButtons[i] = document.createElement('input');
			this.betRangeButtons[i].setAttribute("type", "button");
			this.betRangeButtons[i].setAttribute("data-range", `${rangeToUse[i].min}-${rangeToUse[i].max}`);
			this.betRangeButtons[i].className =  `${gameButtonsClassName[i]} gameButtons`;
			this.betRangeButtons[i].value = `${self.popup_notification.numberWithCommas(rangeToUse[i].min * window.currencyMultiplier)}-${self.popup_notification.numberWithCommas(rangeToUse[i].max * window.currencyMultiplier)}`;
			$(this.betrangeCon).append(this.betRangeButtons[i]);

			roomsDropDown += `<button class="range-selected" data-range="${rangeToUse[i].min}-${rangeToUse[i].max}">
													<span class="range-min">${self.popup_notification.numberWithCommas(rangeToUse[i].min * window.currencyMultiplier)}</span>
													<span class="range-dash">-</span>
													<span class="range-max">${self.popup_notification.numberWithCommas(rangeToUse[i].max * window.currencyMultiplier)}</span></button>`;

			$(this.betRangeButtons[i]).on("click",  function (e) {
	      $.post("/settingGame", {range: $(e.currentTarget).attr('data-range'), game: _this.namespace, slave:'normal', multiplayer: _this.isMulti === true ? 1 : 0}, function () {
	        if(_this.data.gameName == 'Pai-Gow') {
	          location.assign(window.paigow_domain+_this.data.tableNumber)
	        } else if (_this.data.gameName == 'Sicbo') {
	          location.assign(window.sb_domain+_this.data.tableNumber)
	        } else if (_this.data.gameName == 'Baccarat') {
	          location.assign(window.bc_domain+_this.data.tableNumber)
	        } else if (_this.data.gameName == 'Dragon-Tiger') {
	          location.assign(window.dt_domain+_this.data.tableNumber)
	        } else if (_this.data.gameName == 'Poker') {
	          location.assign(window.poker_domain+_this.data.tableNumber)
	        }
	      });
			});
		}

		this.currentRange = rangeToUse;

		this.timerCanvas = document.createElement("canvas");

		this.timerCanvas.setAttribute('width', `300px`);
		this.timerCanvas.setAttribute('height',`215px`);

		// if(isJunket == 1) {
		// 	this.timerCanvas.setAttribute('id', `${data.namespace}-timer-${this.roomdata[0].roomId}`);
		// } else {
			this.timerCanvas.setAttribute('id', `${data.namespace}-timer`);
		// }

		let auth = (typeof window.junketAuth ==='string') ? JSON.parse(window.junketAuth) : window.junketAuth;



		if (window.isJunket > 0) { //if junket
			let bcCount = 0;
			let pgCount = 0;
			let dtCount = 0;
			let sbCount = 0;

			let count = [];

			// let allrooms = window.all_Rooms;

			for (var i = 0; i < self.allRooms.length; i++) {
				if(self.allRooms[i].gameName == "Baccarat") {
					bcCount++;
				} else if (self.allRooms[i].gameName == "Pai-Gow") {
					pgCount++;
				} else if (self.allRooms[i].gameName == "Dragon-Tiger") {
					dtCount++;
				} else if (self.allRooms[i].gameName == "Sicbo") {
					sbCount++;
				}
			}

			if(window.isJunket == 2) { //if junket agent
				let gname = data.gameName.toLowerCase();
				if(gname === 'dragon-tiger') gname = 'dragontiger';
				if(gname === 'pai-gow') gname = 'paigow';

				if((data.gameName == 'Baccarat' && auth.baccarat.count > bcCount)
					|| (data.gameName == 'Sicbo' && auth.sicbo.count > sbCount)
					|| (data.gameName == 'Dragon-Tiger' && auth.dragontiger.count > dtCount)
					|| (data.gameName == 'Pai-Gow' && auth.paigow.count > pgCount)  ) {
					if(this.roomdata.length) {
						this.enterButton.className = "enter enter--agent gameButtons";
						$(this.canvasCon).append(this.enterButton);
					} else {

						let createClass = 'createroom createroom--agent disabled-btn gameButtons  noroom-create--agent';
						let enterClass = 'enter enter--users gameButtons';
						if(auth[gname].auth) {
							createClass = 'createroom createroom--agent gameButtons  noroom-create--agent'
							enterClass = 'enter enter--agent gameButtons noroom-enter--agent';
							this.createroomButton.className = createClass;
							$(this.canvasCon).append(this.createroomButton);
						}

						this.enterButton.className = enterClass;
						$(this.canvasCon).append(this.enterButton);
					}

				} else {
					if(this.roomdata.length) {
						this.enterButton.className = "enter enter--agent gameButtons";
						$(this.canvasCon).append(this.enterButton);
					} else {
						if(data.gameName == 'Poker') { //if poker always have enter
							this.enterButton.className = "enter enter--users gameButtons";
							$(this.canvasCon).append(this.enterButton);
						} else {

							let createClass = 'createroom createroom--agent disabled-btn gameButtons  noroom-create--agent';
							if(auth[gname].count > 0) {
								createClass = 'createroom createroom--agent gameButtons  noroom-create--agent';
							}
							console.log('here 11', data.namespace)
							this.enterButton.className = "enter enter--agent gameButtons noroom-enter--agent";
							$(this.canvasCon).append(this.enterButton);

							this.createroomButton.className = createClass;
							$(this.canvasCon).append(this.createroomButton);
						}
					}

				}

				// if(this.roomdata.length) {
				// 	this.enterButton.className = "enter enter--users gameButtons";
				// 	this.canvasCon.append(this.enterButton);
				// } else {
				// 	this.createroomButton.className = "createroom createroom--agent gameButtons";
				// 	this.canvasCon.append(this.createroomButton);
				// }

			} else { //if not junket user
				if(this.roomdata.length) { //if has rooms
					this.enterButton.className = "enter gameButtons";
					$(this.canvasCon).append(this.inputPassword,this.enterButton, this.inputPasswordFail);
				} else { //if no rooms
					this.enterButton.className = "enter enter--users gameButtons";
					$(this.canvasCon).append(this.enterButton, this.betrangeCon);
					// if(gameNameTable == "Baccarat" || gameNameTable == "Dragon-Tiger") {
					// 	this.canvasCon.append(this.enterButton, this.betrangeCon);
					// } else {
					// 	this.betrangeCon.className = "betRangeButtons betrange";
					// 	this.canvasCon.append(this.betrangeCon);
					// }
				}
			}
		} else { //if not junket
			this.enterButton.className = "enter enter--users gameButtons";
			$(this.canvasCon).append(this.enterButton, this.betrangeCon);
			// if(gameNameTable == "Baccarat" || gameNameTable == "Dragon-Tiger") {
			// 	this.canvasCon.append(this.enterButton, this.betrangeCon);
			// } else {
			// 	this.betrangeCon.className = "betRangeButtons betrange";
			// 	this.canvasCon.append(this.betrangeCon);
			// }

		}

		// maintenance
		$(this.maintenanceHeader).append(this.maintenanceHeaderText);
		$(this.maintenanceCon).append(this.maintenanceHeader, this.maintenanceBody);
		// canvas
		$(this.canvasHover).append(this.canvasCon);
		// parent
		parent.append(this.canvasOverlay, this.canvas, this.timerCanvas, this.maintenanceCon, this.canvasHover);

		if(window.isJunket == 2 && _.isEmpty(this.roomdata)){
			//appends only if agent
			parent.append(this.toggleActiveButton);
		}

		$(this.canvasOverlay).css({
			'margin-top': 5,
	  	position : 'absolute',
	  	left : `${x-1}px`,
	  	top : `${y-1}px`,
	  	'border-radius': '14px 0px 0px 0px',
	  	transform: 'translate(0,0)'
	  	// background: '#2b2b2b'
	  });

		$(this.toggleActiveButton).css({
			'margin-top': 5,
	  	position : 'absolute',
	  	left : `${x+5}px`,
	  	top : `${y+5}px`,
		});

		$(this.canvas).css({
	  	position : 'absolute',
			'margin-top': 5,
	  	left : `${x}px`,
	  	top : `${y}px`,
	  	'border-radius': '14px 0px 0px 0px',
	  	transform: 'translate(0,0)'
	  	// background: '#2b2b2b'
	  });

		$(this.timerCanvas).css({
	  	position : 'absolute',
			'margin-top': 5,
	  	left : `${x-4}px`,
	  	top : `${y-3}px`,
	  	transform: 'translate(0,0)'
	  });

		$(this.canvasHover).css({
			'margin-top': 5,
			position : 'absolute',
			left : `${x-1}px`,
			top : `${y+34}px`,
			transform: 'translate(0,0)'
		});
		// $(this.roomCon).css({
		// 	position : 'absolute',
		// 	left : `${(x-1)+399}px`,
		// 	top : `${y+34}px`,
		// 	transform: 'translate(0,0)'
		// });

		$(this.maintenanceCon).css({
			'margin-top': 5,
			position : 'absolute',
	  	left : `${x}px`,
	  	top : `${y}px`,
	  	'border-radius': '10px 0px 0px 0px',
	  	transform: 'translate(0,0)',
	  	height: '215px',
			width: '915px'
		});

		if(!_.isEmpty(window.vendorTables)) {
			let disabledList = typeof window.vendorTables === 'string' && window.vendorTables != "" ? _.cloneDeep(JSON.parse(window.vendorTables)) : _.cloneDeep(window.vendorTables);
			disabledList.disable_table = _.map(disabledList.disable_table, function (e) {
				if(e.indexOf('Dragon') > -1 || e.indexOf('Pai') > -1) {
					var stringSplit = e.split('-');
					return `${stringSplit[0]}-${stringSplit[1]}/${stringSplit[2]}`
				}
				return e.replace('-','/')
			});

			//onload if on disabled list and is junket agent/user
			if(_.find(disabledList.disable_table, (e) => {return e == this.namespace} ) && window.isJunket > 0) {
				this.isDisabled = true;
				this.toggleActiveButton.className = 'room-active-toggle checked';
				$(this.canvasHover).addClass('disabled-table');
				$(this.canvasOverlay).css({
					'z-index' : 2,
					'background' : 'rgba(16, 16, 16, 0.7)'
				});
			}


		}

		$(this.canvasHover).hover(
			function() {

				if($(this).hasClass('disabled-table')) return;

				if($(this).hasClass('inactive')) {
					$(this).removeClass('inactive');
				}
				$(this).addClass('active').siblings().removeClass('active')
				$(this).children('.roominfo-wrap').css({display:'block'})
				// if(isJunket == 2) {
				// 	$(this).children('.remove-con').css({display : 'block'})
				// }
			},
			function() {

				if($(this).hasClass('disabled-table')) return;
				// if(isJunket == 2) {
				// 	$(this).children('.remove-con').css({display : ''})
				// }
				// $(this).children('.roominfo-wrap').css({display:''})
				$(this).children('.roominfo-wrap').css({opacity:'0'})
				if ($(this).hasClass("clicked")) {
					$(this).addClass('not-clicked').siblings().removeClass('not-clicked');
					setTimeout(() => {
						$(this).removeClass('not-clicked inactive')
					}, 1200)

				}

				if($(_this.roomCon).hasClass('active')) {
				} else {
					$(this).addClass('inactive').removeClass('active').removeClass('clicked').siblings().removeClass('not-clicked inactive');
					$(_this.roomCon).removeClass('active');
				}
				setTimeout(() => {
					$('.user.error-mes').css('display', '');
				}, 600)
				setTimeout(() => {
					$(this).removeClass('inactive')
				}, 1200)
			}
		);

		$(this.singleplayerButton).add(this.multiplayerButton).on('click', function(){
			$(this).parent().parent().addClass('clicked');
			if($(this).attr('value') === 'Multiplayer') {
				_this.isMulti = true;
			} else {
				_this.isMulti = false;
			}
		});

		$(this.toggleActiveButton).on('click', function (e) {
			_this.isDisabled = false;

			e.preventDefault();
			var active = 0;
			if($(this).hasClass('checked')) {
				$(this).removeClass('checked');
			} else {
				$(this).addClass('checked');
				active = 1;
			}

			let gamename = $(this).data('namespace');

			$.post('/setTableInfo', {game: gamename, active : active, type:'disable_table'}, function (e) {
				e = typeof e === 'string' ? JSON.parse(e) : e;
				let gameName = e.current_game.split('-')[0];
				let tableId = e.current_game.split('-')[1];

				if(e.current_game.toLowerCase().indexOf('dragon-tiger') > -1 || e.current_game.toLowerCase().indexOf('pai-gow') > -1) {
					gameName = `${e.current_game.split('-')[0]}-${e.current_game.split('-')[1]}`;
					tableId = e.current_game.split('-')[2];
				}

				console.log(":::emit disable", {
	        eventName : 'disablechange',
	        gameName : gameName,
	        tableId : tableId,
	        status : active,
	        vendor_id : window.vendor_id
	      });

				_this.ctx.eventListener.socket.emit('data',{
	        eventName : 'disablechange',
	        gameName : gameName,
	        tableId : tableId,
	        status : active,
	        vendor_id : window.vendor_id
	      });
				window.vendorTables = typeof window.vendorTables === 'string'  && window.vendorTables != "" ? JSON.parse(window.vendorTables) : window.vendorTables;
				if(window.vendorTables  != '') {
					window.vendorTables.disable_table = e.all_disabled != '' && typeof e.all_disabled === 'string' ? JSON.parse(e.all_disabled) : e.all_disabled;
				}

				_this.ctx.setEnableDisable(e);
			});
		});
		// if(isJunket==1) {
		// 	this.stage = new createjs.Stage(`${data.namespace}-${this.roomdata[0].roomId}`);
		// 	this.stage.tickEnabled = false;
		// 	this.stage.ctx = this;
		// 	// this.stage.cache(0,0,w,h);
		// 	this.timer_stage = new createjs.Stage(`${data.namespace}-timer-${this.roomdata[0].roomId}`);
		// 	this.timer_stage.tickEnabled = true;
		// 	this.timer_stage.ctx = this;
		// } else {
			this.stage = new createjs.Stage(data.namespace);
			this.stage.tickEnabled = false;
			this.stage.ctx = this;
			// this.stage.cache(0,0,w,h);
			this.timer_stage = new createjs.Stage(`${data.namespace}-timer`);
			this.timer_stage.tickEnabled = true;
			this.timer_stage.ctx = this;
		// }


		//background
		this.bgCon = new createjs.Shape();
		this.bgCon.graphics.beginFill('#2b2b2b').drawRoundRectComplex(0,0, 915, 215, 10, 0, 0, 0)
		this.stage.addChild(this.bgCon);

		//header
		let headerText = "";
		let tableNameText = "";
		let level = "";
		let tableNumber = 0;
		let headerColor = {
			main : ['#871a51','#280f1a'],
			baccarat : ['#970000','#2d0000'],
			junket : ['#ffd67a','#ad800f']
		}

		this.header = new createjs.Shape();
		if(data.tableNumber < 10) {
			 tableNumber = `0${data.tableNumber}`;
		} else {
			tableNumber = `${data.tableNumber}`;
		}
		if(data.gameName == "Baccarat") {
			if(data.roomType == "p") {
				level = window.language2.lobby_baccaratpage_premium;
			} else if(data.roomType == "v") {
				level = window.language2.lobby_baccaratpage_vip;
			} else {
				level = window.language2.lobby_baccaratpage_main;
			}

			if(window.isJunket > 0) {
				if(this.roomdata.length && this.roomdata[0].balance > 0) {
					level = window.language2.nihtanjunket_ingame_balancebet;
				}
			}

			headerText = `${level} ${tableNumber}`;

		} else {
			if(data.gameName == "Dragon-Tiger") {
				tableNameText = window.language2.lobby_gamename_dragontiger;
			} else if(data.gameName == "Pai-Gow") {
				tableNameText = window.language2.lobby_gamename_paigow;
			} else if(data.gameName == "Poker") {
				tableNameText = window.language2.lobby_gamename_poker;
			} else {
				tableNameText = window.language2.lobby_gamename_sicbo;
			}
			headerText = `${tableNameText} ${tableNumber}`;
		}

		this.gameName = new createjs.Text(headerText,"20px arvoItalic","#000");
		this.gameName.x = 15;
		this.gameName.y = 35/2 + 2;
		this.gameName.textAlign = "left";
		this.gameName.textBaseline = "middle";
		//this.getText(10,35/2, headerText,"20px arvoItalic","#000","left","middle");
		let tableName = document.createTextNode(`${headerText}`);
		$(this.maintenanceHeaderText).append(tableName);

		if(window.isJunket == 2 && _.isEmpty(this.roomdata)) {
			this.gameName.x += 46
		}

		if(window.isJunket > 0) {
			if(!_.isEmpty(this.roomdata)) {
				let isMulti = this.roomdata[0].isMulti == false? 'S' : 'M';
				let isMultiClass = this.roomdata[0].isMulti == false? 'single' : 'multi';
				let rangesplit = this.roomdata[0].betRange.split('-')
				let betRange =  this.betRange(rangesplit[0], rangesplit[1]);
				let roomId = this.roomdata[0].roomId;
				let slave =  this.roomdata[0].slave;
				// $(this.canvas).css('border', '2px solid #ffd67a');
				$(this.canvasOverlay).addClass('-hasroom');
				$(this.canvasHover).addClass('roomactive');
				$(this.canvasHover).prepend('<div class="password-con"></div>');
				$(this.canvasHover).prepend(`<div id="room-close-${roomId}" class="remove-con"></div>`);
				this.header.graphics.beginLinearGradientFill(headerColor.junket, [0,1], 0, 0, 400, 0).drawRoundRect(0, 0, 400, 34, 0);
				this.gameName.color = "#000"

				if(slave == 'supersix') {
					$(this.canvasOverlay).prepend('<i class="ico-room-supersix"></i>')
				}

				if(this.data.gameName == 'Baccarat' || this.data.gameName == 'Dragon-Tiger') {
					$(this.canvasHover).prepend(`<div class="roominfo-wrap">
						<div class="roominfo-inner">
							<div class="roominfo__con">
								<div class="roominfo__gametype -${isMultiClass}"><span>${isMulti}</span></div>
								<div class="roominfo__betrange"><span>${betRange.rangemin}-${betRange.rangemax}</span></div>
							</div>
						</div>
					</div>`);
				} else {
					$(this.canvasHover).prepend(`<div class="roominfo-wrap">
						<div class="roominfo-inner">
							<div class="roominfo__con">
								<div class="roominfo__betrange"><span>${betRange.rangemin}-${betRange.rangemax}</span></div>
							</div>
						</div>
					</div>`);
				}

				if(window.isJunket == 2) {
					$('.roominfo-wrap').removeClass('-users').addClass('-agent')
				} else {
					$('.roominfo-wrap').removeClass('-agent').addClass('-users')
				}

			} else {
				$(this.canvasOverlay).removeClass('-hasroom');
				$(this.canvasOverlay).find('.ico-room-supersix').remove();
				$(this.canvas).css('border', '');
				$(this.canvasHover).find('password-con').remove();
				$(this.canvasHover).find('remove-con').remove();
				$(this.canvasHover).find('roominfo-wrap').remove();
				$(this.canvasHover).find('.remove-con').remove();
				$(this.canvasHover).removeClass('roomactive');
				if(data.gameName == "Baccarat") {
					this.header.graphics.beginLinearGradientFill(headerColor.baccarat, [0,1], 0, 0, 400, 0).drawRoundRect(0, 0, 400, 35, 0);
				} else {
					this.header.graphics.beginLinearGradientFill(headerColor.main, [0,1], 0, 0, 400, 0).drawRoundRect(0, 0, 400, 35, 0);
				}
				this.gameName.color = "#f1e382"
			}
		} else {
			if(data.gameName == "Baccarat") {
				this.header.graphics.beginLinearGradientFill(headerColor.baccarat, [0,1], 0, 0, 400, 0).drawRoundRect(0, 0, 400, 35, 0);
			} else {
				this.header.graphics.beginLinearGradientFill(headerColor.main, [0,1], 0, 0, 400, 0).drawRoundRect(0, 0, 400, 35, 0);
			}
			this.gameName.color = "#f1e382"
		}

		this.stage.addChild(this.header);
		this.timer_stage.addChild(this.gameName);

		//status
		let status = "";
		if(data.roundStatus == "P") {
			if(data.gameName != "Sicbo") {
				status = window.language.lobby.dealing;
			} else {
				status = window.language.lobby.result;
			}
		}
		if(data.roundStatus == "S") {
			status = window.language.lobby.nowbetting;
		}
		if(data.roundStatus == "E") {
			status = window.language.lobby.bettingend;
			if(!data.marks.length) {
				status = window.language.prompts.promptshuffling;
			}
		}
		if(data.roundStatus == "R") {
			status = window.language.lobby.result;
		}

		if(data.is_shoeChange) {
			if(!data.marks.length) {
				status = window.language.prompts.promptshuffling;
			}
		}

		//status
		if(window.isJunket > 0) {
			if(!_.isEmpty(this.roomdata)) {
				this.status = this.getText(390,35/2, status,fontFormat(20, 'black', 'lato', true),"#000","right","middle");
			} else {
				this.status = this.getText(390,35/2, status,fontFormat(20, 'black', 'lato', true),"#fff","right","middle");
			}
		} else {
			this.status = this.getText(390,35/2, status,fontFormat(20, 'black', 'lato', true),"#fff","right","middle");
		}
		this.stage.addChild(this.status);

		//dealer
		this.dealerBg = new createjs.Shape();
		this.dealerBg.graphics.beginFill("#deca72").drawCircle(0,0,50);
		this.dealerBg.set({x : 80, y : 108})
		this.stage.addChild(this.dealerBg);

		// === dealer name
		this.dealer_name = new createjs.Text(data.currentDealer, "20px lato-black","#fff");
		this.dealer_name.set({x: this.dealerBg.x, y: this.dealerBg.y + 80, textBaseline: 'middle', textAlign: 'center'});
		this.stage.addChild(this.dealer_name);

		//dealer image
		this.dealerImg = new createjs.Bitmap();
		this.dealerImg.set({x:this.dealerBg.x, y: this.dealerBg.y - 1, regX:60, regY:60});
		this.dealerImg.scaleX = this.dealerImg.scaleY = 0.77;
		this.timer_stage.addChild(this.dealerImg);

		for (var i = 0; i < window.dealerImg.length; i++) {
      if (window.dealerImg[i].id == data.dealerId) {
        let dbImage = new Image();
        dbImage.src = window.dealerImg[i].dealer_image;

        this.dealerImg.image = dbImage;
      }
    }

		this.timer = _.clone(timer());
		this.timer.scaleX = this.timer.scaleY = 0.98;
		this.timer.x = 0;
		this.timer.y = 28;
		this.timer_stage.addChild(this.timer);

		// flippy image

		// if(data.gameName == "Baccarat") {
		// 	let gameNamemain = _.find(window.all_tables, function (e) { return `${e.namespace}` ===  "Baccarat/4"});
		// 	gameNamemain.type = "flippy";
		// }
		if(data.gameName == "Baccarat" && data.type == "flippy") {
			let flippy_spritesheet_data = {
				images: ["/img/v3/icons/flippy/flippy_sprite.png"],
				frames: {width:51,height:37},
				animations: {
					"first": {
						frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 23, 24, 25, 26, 27],
						speed: 0.4
					},
				}
			}

			this.flippy_spriteSheet = new createjs.SpriteSheet(flippy_spritesheet_data);
			this.flippyImg = new createjs.Sprite(this.flippy_spriteSheet,"first");
			this.flippyImg.scaleX = this.flippyImg.scaleY = 0.8;
			// if(data.roomType == "p") {
			// 	if(window.isJunket == 2) {
			// 		if(!_.isEmpty(this.roomdata)) {
			// 			this.flippyImg.x = this.gameName.getBounds().width + 50;
			// 		} else {
			// 			this.flippyImg.x = this.gameName.getBounds().width + 90;
			// 		}

			// 	} else {
			// 		this.flippyImg.x = this.gameName.getBounds().width + 30;
			// 		if(window.language2.locale == "zh") {
			// 			this.flippyImg.x = 110;
			// 		} else if(window.language2.locale == "jp") {
			// 			this.flippyImg.x = 150;
			// 		} else if(window.language2.locale == "kr") {
			// 			this.flippyImg.x = 130;
			// 		} else {
			// 			this.flippyImg.x = 145;
			// 		}
			// 	}
			// } else if(data.roomType == "v") {
			// 	if(window.isJunket == 2) {
			// 		if(!_.isEmpty(this.roomdata)) {
			// 			this.flippyImg.x = this.gameName.getBounds().width + 30;
			// 		} else {
			// 			this.flippyImg.x = this.gameName.getBounds().width + 85;
			// 		}
			// 	} else {
			// 		console.log("crash hereeee");
			// 		this.flippyImg.x = this.gameName.x + this.gameName.getBounds().width + 30;
			// 	}
			// } else {
			// 	this.flippyImg.x = this.gameName.getBounds().width + 30;
			// }
			this.flippyImg.y = 5;
			this.flippyImg.x = this.gameName.x + this.gameName.getBounds().width + 30;
			this.timer_stage.addChild(this.flippyImg);
		}

		if(!_.isEmpty(this.roomdata)) {
			if(data.gameName == "Baccarat") {
				$(this.canvasOverlay).find('.ico-room-supersix').css({left: this.gameName.x + this.gameName.getBounds().width + 30})
			}
			if(data.gameName == "Baccarat" && data.type == "flippy") {
				$(this.canvasOverlay).find('.ico-room-supersix').css({left : this.flippyImg.x + 50})
			}
		}

		//roadmap set here
		this.roadmapBg = new createjs.Shape();
		this.roadmapBg.graphics.beginFill("#fff").drawRect(160,35, w-160, h-35);
		this.stage.addChild(this.roadmapBg);

		//roadmap container
		this.roadmap_container = new createjs.Container();
		this.roadmap_container.x = this.roadmapBg.x;
		this.roadmap_container.y = this.roadmapBg.y;
		// this.roadmap_container.visible = false;
		this.roadmap_container.cache(0,0,952, 274);
		this.stage.addChild(this.roadmap_container);

		this.resultContainer = new createjs.Container();
		this.resultContainer.x = 160;
		this.resultContainer.y = 35;
		this.stage.addChild(this.resultContainer);

		this.dealingCardAnimationBg = new createjs.Shape();
		this.dealingCardAnimationBg.graphics.beginFill("rgba(22, 22, 22, 0.9)").drawRect(0,0,240,180);
		this.dealingCardAnimationBg.scaleX = 0;
		this.resultContainer.addChild(this.dealingCardAnimationBg);

		this.dealingCardAnimation = new createjs.Container();
		this.dealingCardAnimation.x = this.dealingCardAnimationBg.x + 20;
		this.dealingCardAnimation.y = this.dealingCardAnimationBg.y;
		this.dealingCardAnimation.visible = false;
		this.dealingCardAnimation.alpha = 0;
		this.resultContainer.addChild(this.dealingCardAnimation);

		/***for balance bet ***/
		this.balanceContainer = new createjs.Container();
		this.balanceContainer.x = 160;
		this.balanceContainer.y = 35;
		this.stage.addChild(this.balanceContainer);

		this.balanceAnimationBg = new createjs.Shape();
		this.balanceAnimationBg.graphics.beginFill("rgba(22, 22, 22, 0.9)").drawRect(0,0,240,180);
		this.balanceAnimationBg.scaleX = 0;
		this.balanceContainer.addChild(this.balanceAnimationBg);

		this.balanceLabel = new createjs.Text("Balance Bet", "20px lato-black", "#deca72");
		this.balanceLabel.set({x: 20, textAlign: 'left', textBaseline: 'middle', y : 40, alpha : 0});
		this.balanceContainer.addChild(this.balanceLabel);

		this.balanceVal = new createjs.Text("0", "20px bebas-regular", "#fff");
		this.balanceVal.set({x: 240 - 20, textAlign: 'right', textBaseline: 'middle', y : 40, alpha : 0});
		this.balanceContainer.addChild(this.balanceVal);

		this.balanceContainer.visible = false;
		this.isBalance = false;

		if(window.isJunket > 0) {
			if(!_.isEmpty(this.roomdata)) {
				let balance = this.roomdata[0].balance;
				if(balance != 0) {
					this.isBalance = true;
				}
			}
		}
		/***for balance bet ***/

		window.vendorTables = typeof window.vendorTables === 'string'  && window.vendorTables != "" ? JSON.parse(window.vendorTables) : window.vendorTables;

		let disabledTables = window.vendorTables.disable_table;
		let tblCheck = false;
		if(disabledTables) {
			for (var i = 0; i < disabledTables.length; i++) {
				if (disabledTables[i] == `${this.data.gameName}-${this.data.tableNumber}` && window.isJunket == 1) {
					tblCheck = true;
				}

				if(disabledTables[i] == `${this.data.gameName}-${this.data.tableNumber}`) {
					$(this.createroomButton).addClass('disabled-btn');
				}
			}


		}

		if (!tblCheck) {
			this.setMaintenance(data, true);
		}


		this.local_time = 0;
		this.timerStart = false;
		this.balanceAnimStart = false;

		//for create rooms
		// $(`#create-${this.data.gameName}-${this.data.tableNumber}`).unbind('click').on('click', (e) => {
		$(document).on("click",`#create-${this.data.gameName}-${this.data.tableNumber}` ,function(e){
			e.preventDefault();
			if($(this).hasClass('disabled-btn')) return;
			$(_this.enterButton).show();
			$.post('/canCreateRoom', { vendor_id: window.vendor_id}, (response) => {
        console.log("response", response[0].flag);

				if(response[0].flag == 'F') {
					$('#popup-fail .popup-alert-btn').empty();
					$(".popup-container").animate({
						top: '0'
					}, {
						duration: 200,
						start: function () {
							$('.popup-bg').show();
							$('.popup-box, .popup-alert-box').hide();
							$('#fail-msg').html(window.language2.nihtanjunket_lobby_outofdate);
							$('#poup-fail .alert-txt').text(window.language2.nihtanjunket_lobby_roomcreationfailed)
							$('#popup-fail .fail-msg2').text('')
							$('#popup-fail .popup-alert-btn').append(`
								<div class="btn-popup popup-btn--close -alert">
									<span>${window.language2.nihtanjunket_lobby_close}</span>
								</div>
							`)
							$('#popup-fail').show();
						}
					})
				} else {
					$('#popup-junket .popup-body').empty()
					$('#popup-junket .popup-room-btn').empty()

					let tempdata = _this.data;

					$(".popup-container").animate({
						top: '0'
					}, {
						duration: 200,
						start: function () {
							$('.popup-bg').css({ 'top' : 0 }).show();
							$('.popup-box').hide();
							$('#popup-junket').show();
						}
					})

					let betrange = _this.betRange(rangeToUse[0].min, rangeToUse[0].max)

					let rangeDropDown = '';
					let rangeDropDownmin = [];
					let rangeDropDownmax = [];
					let betranges = []
					for(let i = 0; i < rangeToUse.length; i++) {
						betranges[i] = _this.betRange(rangeToUse[i].min, rangeToUse[i].max);

						rangeDropDown += `<button class="range-selected" data-range="${rangeToUse[i].min}-${rangeToUse[i].max}">
																<span class="range-min">${betranges[i].rangemin}</span>
																<span class="range-dash">-</span>
																<span class="range-max">${betranges[i].rangemax}</span></button>`;
					}

					if(tempdata.gameName == 'Baccarat') {
						$('#popup-junket').addClass('-junketcreate')
						$('#popup-junket').addClass('popup--'+tempdata.gameName);

						var balanceNode = `<div class="radio-con">
							        <div class="radio-btn">
							          <i><input type="radio" name="" data-value="balance" class="input-radio radio--${tempdata.gameName}-${tempdata.tableNumber}"/></i>
							        </div>
							        <span>${window.language2.nihtanjunket_ingame_balancebet}</span>
							      </div>`;

						// if(window.userAuthority != 'admin') balanceNode = '';

						$('#popup-junket .popup-body').append(`
							<div class="popup-body-inner">
							  <div class="popup-body__items">
							    <div class="popup-body-con">
							      <h3>${window.language2.nihtanjunket_lobby_gametype}</h3>
							      <div class="radio-con">
							        <div class="radio-btn checkedRadio">
							          <i><input type="radio" name="" data-value="normal" class="input-radio radio-slave--${tempdata.gameName}-${tempdata.tableNumber}" checked ="checked"/></i>
							        </div>
							        <span>${window.language2.baccarat_betlayout_classic}</span>
							      </div>
							      <div class="radio-con">
							        <div class="radio-btn">
							          <i><input type="radio" name="" data-value="supersix" class="input-radio radio-slave--${tempdata.gameName}-${tempdata.tableNumber}" /></i>
							        </div>
							        <span>${window.language2.lobby_gamename_supersix}</span>
							      </div>
							    </div>
							    <div class="popup-body-con -bettype">
							      <h3>${window.language2.nihtanjunket_lobby_bettype}</h3>
							      <div class="radio-con">
							        <div class="radio-btn checkedRadio">
							          <i><input type="radio" name="" data-value="false" class="input-radio radio--${tempdata.gameName}-${tempdata.tableNumber}" checked ="checked"/></i>
							        </div>
							        <span>${window.language2.lobby_baccaratpage_singleplayer}</span>
							      </div>
							      <div class="radio-con">
							        <div class="radio-btn">
							          <i><input type="radio" name="" data-value="true" class="input-radio radio--${tempdata.gameName}-${tempdata.tableNumber}"/></i>
							        </div>
							        <span>${window.language2.lobby_baccaratpage_multiplayer}</span>
							      </div>
							      ${balanceNode}
							    </div>
							  </div>
							  <div class="popup-body__items -betrange">
							    <h3>${window.language2.nihtanjunket_lobby_betrange}</h3>
							    <div class="input-con popup-channel-con -betrange-${tempdata.gameName}-${tempdata.tableNumber}">
							      <button class="range-selected" data-range="${rangeToUse[0].min}-${rangeToUse[0].max}">
							        <span class="range-min">${betrange.rangemin}</span>
							        <span class="range-dash">-</span>
							        <span class="range-max">${betrange.rangemax}</span>
							      </button>

							      <div class="popup-range-list -betrange-list-${tempdata.gameName}-${tempdata.tableNumber}" hidden>
							        ${rangeDropDown}
							      </div>
							    </div>
							  </div>
							  <div class="popup-body__items -password">
							    <h3>${window.language2.nihtanjunket_clientpage_password}</h3>
							    <div class="password-con input-con">
							      <input type="password" id="junket-${tempdata.gameName}-${tempdata.tableNumber}-roompass" placeholder="${window.language2.nihtanjunket_clientpage_password}" maxlength="4">
							    </div>
									<span class="password error-mes">${window.language2.nihtanjunket_lobby_atleast4}</span>
									<span class="error-empty">${window.language2.nihtanjunket_lobby_allfieldsrequired}</span>
							  </div>
							  <div class="popup-body__items -password">
							    <h3>${window.language2.com_sub_rooms_confirmpassword}</h3>
							    <div class="password-con input-con">
							      <input type="password" id="junket-${tempdata.gameName}-${tempdata.tableNumber}-confirm-roompass" placeholder="${window.language2.com_sub_rooms_confirmpassword}" maxlength="4">
							    </div>

									<span class="confirm-password error-mes">${window.language2.nihtanjunket_lobby_passwordnotmatch}</span>
									<span class="error-empty">${window.language2.nihtanjunket_lobby_allfieldsrequired}</span>
							  </div>
							</div>
						`)
					} else {
						let classActive = '';
						if(	tempdata.gameName == 'Dragon-Tiger') classActive = 'active';

						tempdata.gameName == 'Baccarat'
						$('#popup-junket .popup-body').append(`
							<div class="popup-body__items popup--roomname">
								<div class="popup-body__items -bettype ${classActive}">
									<h3>${window.language2.nihtanjunket_lobby_bettype}</h3>
									<div class="bettype-con">
										<div class="radio-con">
											<div class="radio-btn checkedRadio">
												<i><input type="radio" name="" data-value="false" class="input-radio radio--${tempdata.gameName}-${tempdata.tableNumber}" checked ="checked"/></i>
											</div>
											<span>${window.language2.lobby_baccaratpage_singleplayer}</span>
										</div>
										<div class="radio-con">
											<div class="radio-btn">
												<i><input type="radio" name="" data-value="true" class="input-radio radio--${tempdata.gameName}-${tempdata.tableNumber}"/></i>
											</div>
											<span>${window.language2.lobby_baccaratpage_multiplayer}</span>
										</div>
									</div>
								</div>
							  <div class="popup-body__items -betrange">
							    <h3>${window.language2.nihtanjunket_lobby_betrange}</h3>
							    <div class="input-con popup-channel-con -betrange-${tempdata.gameName}-${tempdata.tableNumber}">
							      <button class="range-selected" data-range="${rangeToUse[0].min}-${rangeToUse[0].max}">
							        <span class="range-min">${betrange.rangemin}</span>
							        <span class="range-dash">-</span>
							        <span class="range-max">${betrange.rangemax}</span>
							      </button>

							      <div class="popup-range-list -betrange-list-${tempdata.gameName}-${tempdata.tableNumber}" hidden>
							        ${rangeDropDown}
							      </div>
							    </div>
							  </div>
							  <div class="popup-body__items -password">
							    <h3>${window.language2.nihtanjunket_clientpage_password}</h3>
							    <div class="password-con input-con">
							      <input type="password" id="junket-${tempdata.gameName}-${tempdata.tableNumber}-roompass" placeholder="${window.language2.nihtanjunket_clientpage_password}" maxlength="4">
							    </div>
									<span class="password error-mes">${window.language2.nihtanjunket_lobby_atleast4}</span>
									<span class="error-empty">${window.language2.nihtanjunket_lobby_allfieldsrequired}</span>
							  </div>
							  <div class="popup-body__items -password">
							    <h3>${window.language2.com_sub_rooms_confirmpassword}</h3>
							    <div class="password-con input-con">
							      <input type="password" id="junket-${tempdata.gameName}-${tempdata.tableNumber}-confirm-roompass" placeholder="${window.language2.com_sub_rooms_confirmpassword}" maxlength="4">
							    </div>
									<span class="confirm-password error-mes">${window.language2.nihtanjunket_lobby_passwordnotmatch}</span>
									<span class="error-empty">${window.language2.nihtanjunket_lobby_allfieldsrequired}</span>
							  </div>
							</div>
						`)
					}

					$('#popup-junket .popup-room-btn').append(
						// _this.cancelButton,  _this.createroomSubmitButton
						`<div class="popup-btn-inner"><div id="junket-cancel-${tempdata.gameName}-${tempdata.tableNumber}"  class="btn-popup popup-btn--cancel">
						<span>${window.language.rooms.cancel}</span>
						</div>
						<div id="junket-createroom-${tempdata.gameName}-${tempdata.tableNumber}"  class="btn-popup popup-btn--create">
						<span>${window.language.lobby.create_room}</span>
						</div></div>`
					);

					self.createRooms (tempdata, false)
				}
      });
		});

		// $(`#enter-${this.data.gameName}-${this.data.tableNumber}`).unbind('click').on('click', (e) => {

		// if(isJunket==1) {
		// 	$(document).on("click",`#enter-${this.data.gameName}-${this.data.tableNumber}-${this.roomdata[0].roomId}` ,function(e){
		// 		e.preventDefault();
		// 		let tempdata = data;
		// 		let gamecon = data.namespace.split("/").join("-");

		// 		let allgames = self.games;

		// 		$(`#${gamecon}-room-${_this.roomdata[0].roomId}`).addClass('active');
		// 	});
		// } else {

		var roomdata = this.roomdata;
		var dataContext = this;
		$(document).off("click",`#enter-${this.data.gameName}-${this.data.tableNumber}`);
		$(document).on("click",`#enter-${this.data.gameName}-${this.data.tableNumber}`, function(e){
				e.preventDefault();
				let tempdata = data;
				let gamecon = data.namespace.split("/").join("-");
				let allgames = self.games;

				let gamedata = _.filter(self.games, function (e) { return e.namespace == _this.data.namespace })
				let roomdata = gamedata[0].roomdata;

				let game = $(this).attr('id');
				game = game.replace('enter-', '');
				let password = $(`#password-${game}`).val();


				// let roomId = '';//$(this).data('room_id');
				// let token = '';//$(this).data('token');


				// let gameName = game.split('-')[0].toLowerCase();
				// let tableId = game.split('-')[1];

				if(game.toLowerCase().indexOf('pai')>-1) {
					gameName = 'Pai-Gow';
				}

				//teet
				let betrange = `${_this.currentRange[0].min}-${_this.currentRange[0].max}`
				// let range = `${betRange.rangemin}-${betRange.rangemax}`;
				let temproom = [];
				let tableId = '';
				let token = '';
				let gameName = '';
				let roomId = '';

				tableId = _this.data.tableNumber;
				gameName = _this.data.gameName.toLowerCase();

				if(roomdata.length) {
					temproom = roomdata[0];
					roomId = temproom.roomId;
					token = temproom.token;
					betrange = temproom.betRange;
				}

				console.log("betrange", betrange);

				if(window.isJunket == 1 && roomdata.length) {
					$.post('/canCreateRoom', { vendor_id: window.vendor_id}, (response) => {
						if(response[0].flag == 'F') {
							$('#popup-fail .popup-alert-btn').empty();
							$(".popup-container").animate({
								top: '0'
							}, {
								duration: 200,
								start: function () {
									$('.popup-bg').show();
									$('.popup-box, .popup-alert-box').hide();
									$('#popup-fail .alert-txt').text('')
									$('#fail-msg').text(window.language2.nihtanjunket_lobby_currentroomoutofdate);
									$('#popup-fail .fail-msg2').text('')
									$('#popup-fail .popup-alert-btn').append(`
										<div class="btn-popup popup-btn--close -alert">
											<span>${window.language2.nihtanjunket_lobby_close}</span>
										</div>
									`)
									$('#popup-fail').show();
								}
							})
						} else {
							$.post('/checkPass', {roomId, password, game : gameName}, function (response) {
								console.log("response", response);
								if(response == "true") {
									//siccess passowrd

									$.post("/settingGame", {range: betrange, game: _this.namespace, slave:'normal', multiplayer: roomdata[0].isMulti ? 1 : 0}, function () {
										$(e.currentTarget).next().hide();
										gameName = gameName.toLowerCase();
					          if(gameName.toLowerCase() == 'pai-gow') {
					            location.assign(window.paigow_domain+tableId+"/j?token="+token)
					          } else if (gameName == 'sicbo') {
					            location.assign(window.sb_domain+ tableId+"/j?token="+token)
					          } else if (gameName == 'baccarat') {
					            location.assign(window.bc_domain+ tableId+"/j?token="+token)
					          } else if (gameName == 'dragon-tiger') {
					            location.assign(window.dt_domain+ tableId+"/j?token="+token)
					          }
						      });

								} else {
									//fail password
									$(e.currentTarget).next().show();
								}
							});
						}
					})
				} else if(window.isJunket == 2 && roomdata.length) {
					$.post('/canCreateRoom', { vendor_id: window.vendor_id}, (response) => {
						if(response[0].flag == 'F') {
							$('#popup-fail .popup-alert-btn').empty();
							$(".popup-container").animate({
								top: '0'
							}, {
								duration: 200,
								start: function () {
									$('.popup-bg').show();
									$('.popup-box, .popup-alert-box').hide();
									$('#popup-fail .alert-txt').text('')
									$('#fail-msg').text(window.language2.nihtanjunket_lobby_currentroomoutofdate);
									$('#popup-fail .fail-msg2').text('')
									$('#popup-fail .popup-alert-btn').append(`
										<div class="btn-popup popup-btn--close -alert">
											<span>${window.language2.nihtanjunket_lobby_close}</span>
										</div>
									`)
									$('#popup-fail').show();
								}
							})
						} else {
							$.post("/settingGame", {range: betrange, game: _this.namespace, slave:'normal', multiplayer: roomdata[0].isMulti ? 1 : 0}, function (response) {
				        if(_this.data.gameName == 'Pai-Gow') {
		            	location.assign(window.paigow_domain+tableId+"/j?token="+token)
				        } else if (_this.data.gameName == 'Sicbo') {
		            	location.assign(window.sb_domain+ tableId+"/j?token="+token)
				        } else if (_this.data.gameName == 'Baccarat') {
		            	location.assign(window.bc_domain+ tableId+"/j?token="+token)
				        } else if (_this.data.gameName == 'Dragon-Tiger') {
		            	location.assign(window.dt_domain+ tableId+"/j?token="+token)
				        }
				      });
						}
					})
				} else {
					if(window.isJunket == 1) {
						$.post('/canCreateRoom', { vendor_id: window.vendor_id}, (response) => {
							console.log("response", response[0].flag);

							if(response[0].flag == 'F') {
								$('#popup-fail .popup-alert-btn').empty();
						    $(".popup-container").animate({
						      top: '0'
						    }, {
						      duration: 200,
						      start: function () {
						        $('.popup-bg').show();
						        $('.popup-box, .popup-alert-box').hide();
						        $('#popup-fail .alert-txt').text('');
						        $('#fail-msg').text(window.language2.nihtanjunket_lobby_currentroomoutofdate);
						        $('#popup-fail .fail-msg2').text('')
						        $('#popup-fail .popup-alert-btn').append(`
						          <div class="btn-popup popup-btn--close -alert">
						            <span>${window.language2.nihtanjunket_lobby_close}</span>
						          </div>
						        `)
						        $('#popup-fail').show();
						      }
						    })
							} else {
								$.post("/settingGame", {range: betrange, game: _this.namespace, slave:'normal', multiplayer: 0}, function () {
						      if(_this.data.gameName == 'Pai-Gow') {
						        location.assign(window.paigow_domain+_this.data.tableNumber)
						      } else if (_this.data.gameName == 'Sicbo') {
						        location.assign(window.sb_domain+_this.data.tableNumber)
						      } else if (_this.data.gameName == 'Baccarat') {
						        location.assign(window.bc_domain+_this.data.tableNumber)
						      } else if (_this.data.gameName == 'Dragon-Tiger') {
						        location.assign(window.dt_domain+_this.data.tableNumber)
						      } else if (_this.data.gameName == 'Poker') {
						        location.assign(window.poker_domain+_this.data.tableNumber)
						      }
						    });
							}
						})
					} else {
						$.post("/settingGame", {range: betrange, game: _this.namespace, slave:'normal', multiplayer: 0}, function () {
					    if(_this.data.gameName == 'Pai-Gow') {
					      location.assign(window.paigow_domain+_this.data.tableNumber)
					    } else if (_this.data.gameName == 'Sicbo') {
					      location.assign(window.sb_domain+_this.data.tableNumber)
					    } else if (_this.data.gameName == 'Baccarat') {
					      location.assign(window.bc_domain+_this.data.tableNumber)
					    } else if (_this.data.gameName == 'Dragon-Tiger') {
					      location.assign(window.dt_domain+_this.data.tableNumber)
					    } else if (_this.data.gameName == 'Poker') {
					      location.assign(window.poker_domain+_this.data.tableNumber)
					    }
					  });
					}
				}

				// $(`#${gamecon}-room`).addClass('active');
			});
		// }

		if(!_.isEmpty(this.roomdata)) {
			let roomId = this.roomdata[0].roomId;
			let token = this.roomdata[0].token;
			let gameName = this.roomdata[0].gameName;
			let userId = this.roomdata[0].userId;
			let btncon = $('#popup-removeroom .popup-room-btn').empty();

			$(document).on("click",`#room-close-${roomId}` ,function(e){
				$(btncon).empty();
	      $(".popup-container").animate({
		      top: '0'
		    }, {
		      duration: 200,
		      start: function () {
						$('.popup-bg').show();
	          $('.popup-box').hide();
	          $('#popup-removeroom p').text(window.language2.nihtanjunket_lobby_changetoclassic)
						$('#popup-removeroom').show();
	        }
		    })
	      btncon.append(`
	         <div id="junket-cancelremove" class="btn-popup popup-btn--cancel cancelremove-room${roomId}">
	          <span>${window.language.modal.promptnocaps}</span>
	        </div>
	        <div id="junket-removeroom" class="btn-popup popup-btn--create remove-room${roomId}">
	          <span>${window.language.modal.promptyescaps}</span>
	        </div>
	      `)
			})

			$(document).on("click",`.remove-room${roomId}` ,function(e){
	      $(".popup-container").animate({
	        top: '-100%'
	      }, {
	        duration: 200,
	        complete: function () {
	          $('.popup-bg').hide();
	          $('.popup-box').hide();
	        }

	      })

	      _this.ctx.eventListener.socket.emit('data',{
	        eventName : 'disband_room',
	        token     : token,
	        gameName  : gameName,
	        agentId   : userId
	      }, (response) => {
	        console.log("response", response);
	        // window.location = window.lobby_domain;
	      });

	      // $(`.room--${selected.token}`).remove();
	      btncon.empty();

	    });

	    //Button cancel remove room button confirmation
	    $(document).on("click",`.cancelremove-room${roomId}` ,function(e){
	      $(".popup-container").animate({
	        top: '-100%'
	      }, {
	        duration: 200,
	        complete: function () {
	          $('.popup-bg').hide();
	          $('.popup-box').hide();
	        }
	      })
	      btncon.empty();
	    })
		}


		//end for create room
		this.stage.update();
		this.stage.update();
	}

	reposition (x, y) {

		$(this.canvasOverlay).css({
			'margin-top': 5,
	  	position : 'absolute',
	  	left : `${x-1}px`,
	  	top : `${y-1}px`,
	  	'border-radius': '14px 0px 0px 0px',
	  	transform: 'translate(0,0)'
	  });

		$(this.toggleActiveButton).css({
			'margin-top': 5,
	  	position : 'absolute',
	  	left : `${x+5}px`,
	  	top : `${y+5}px`,
		});

		$(this.canvas).css({
	  	position : 'absolute',
			'margin-top' : 5,
	  	left : `${x}px`,
	  	top : `${y}px`,
	  	'border-radius': '14px 0px 0px 0px',
	  	transform: 'translate(0,0)'
	  	// background: '#2b2b2b'
	  });

		$(this.timerCanvas).css({
	  	position : 'absolute',
			'margin-top': 5,
	  	// left : `${x-4}px`,
	  	// top : `${y-1}px`,
			left : `${x-4}px`,
	  	top : `${y-3}px`,
	  	transform: 'translate(0,0)'
	  });

		$(this.canvasHover).css({
			'margin-top': 5,
			position : 'absolute',
			left : `${x-1}px`,
			top : `${y+34}px`,
			transform: 'translate(0,0)'
		});
		// $(this.roomCon).css({
		// 	position : 'absolute',
		// 	left : `${(x-1)+399}px`,
		// 	top : `${y+34}px`,
		// 	transform: 'translate(0,0)'
		// });

		$(this.maintenanceCon).css({
			'margin-top': 5,
			position : 'absolute',
	  	left : `${x}px`,
	  	top : `${y}px`,
	  	'border-radius': '10px 0px 0px 0px',
	  	transform: 'translate(0,0)',
	  	height: '215px',
			width: '915px'
		});
	}

	betRange(min, max) {
    let rangemin = '';
    let rangemax = '' ;
		let mainMultiplier = (Math.floor(parseInt(window.mainMultiplier) / 10) * 10) * 0.01;
		if (window.mainMultiplier % 10) mainMultiplier = 1;

		max = max * mainMultiplier;

    if(min * window.currencyMultiplier  > 999999) {
      rangemin = ((min * window.currencyMultiplier)/1000000) + "M"
    } else if(min * window.currencyMultiplier  > 999) {
      rangemin = ((min * window.currencyMultiplier)/1000) + "K"
    } else {
      rangemin = min * window.currencyMultiplier
    }

    if(max * window.currencyMultiplier  > 999999) {
      rangemax = ((max* window.currencyMultiplier)/1000000) + "M"
    } else if( max* window.currencyMultiplier  > 999) {
      rangemax = ((max* window.currencyMultiplier)/1000) + "K"
    } else {
      rangemax = max* window.currencyMultiplier
    }

    return {rangemin : rangemin, rangemax : rangemax}
  }


	checkRoom(data, state) {

		// if(window.verdor_id != JSON.parse(data.vendorId)) return
		let  auth = (typeof window.junketAuth ==='string') ? JSON.parse(window.junketAuth) : window.junketAuth;
		let bcCount = 0;
		let pgCount = 0;
		let dtCount = 0;
		let sbCount = 0;

		if(window.isJunket==1) {
			if (auth.baccarat.auth == 0 && auth.sicbo.auth == 0 && auth.dragontiger.auth == 0 && auth.paigow.auth == 0 ){
				let auth = (typeof window.junketAuth ==='string') ? JSON.parse(window.junketAuth) : window.junketAuth;
				$('.junket-menu__items').removeClass('active');
			} else if(auth.baccarat.auth == 0) {
				$('#junket-baccarat').hide().removeClass('active');
				$('#junket-other-list').show()
				$('#junket-other').addClass('active');
				$('#junket-baccarat-list').hide()
			} else if (auth.sicbo.auth == 0 && auth.dragontiger.auth == 0 && auth.paigow.auth == 0 ) {
				$('#junket-other').hide();
			} else if(auth.baccarat.auth == 1 || auth.sicbo.auth == 1 || auth.dragontiger.auth == 1 || auth.paigow.auth == 1) {
				if($('.junket-menu__items').hasClass('active')) {
					let linkactive = $(".junket-menu__items.active").attr('id');
					$('.junket-con').hide();
					$('.junket-menu__items').show().removeClass('active');
					$(`#${linkactive}`).show().addClass('active');
					$(`#${linkactive}-list`).show().addClass('active');
				}
			}
		}

		for (var i = 0; i < window.all_Rooms.length; i++) {
			if(window.all_Rooms[i].gameName == "Baccarat") {
				bcCount++;
			} else if (window.all_Rooms[i].gameName == "Pai-Gow") {
				pgCount++;
			} else if (window.all_Rooms[i].gameName == "Dragon-Tiger") {
				dtCount++;
			} else if (window.all_Rooms[i].gameName == "Sicbo") {
				sbCount++;
			}
		}


		let allgames = this.ctx.games;

    var count = [];


		if(window.isJunket == 2) {

			for (var i = 0; i < allgames.length; i++) {

				let auth = (typeof window.junketAuth ==='string') ? JSON.parse(window.junketAuth) : window.junketAuth;

				if (allgames[i].namespace.split('/')[0] == data.gameName) {
					if (data.gameName == 'Pai-Gow' && auth.paigow.count > pgCount
					|| data.gameName == 'Baccarat' && auth.baccarat.count > bcCount
					|| data.gameName == 'Sicbo' && auth.sicbo.count > sbCount
					|| data.gameName == 'Dragon-Tiger' && auth.dragontiger.count > dtCount) {
						if(allgames[i].roomdata.length) {
							$(allgames[i].canvasHover).addClass('active');
							$(allgames[i].canvasCon).empty();
							allgames[i].createroomButton.className = "createroom gameButtons";
							allgames[i].enterButton.className = "enter gameButtons";

							allgames[i].canvasCon.append(allgames[i].createroomButton, allgames[i].enterButton);
						} else {
							$(allgames[i].canvasCon).empty();
							allgames[i].createroomButton.className = "createroom createroom--agent gameButtons noroom-create--agent";
							allgames[i].enterButton.className = "enter enter--agent gameButtons noroom-enter--agent";
							allgames[i].canvasCon.append(allgames[i].createroomButton, allgames[i].enterButton);
						}
					}	else {
						if(allgames[i].roomdata.length > 0) {
							$(allgames[i].canvasCon).empty();
							allgames[i].enterButton.className = "enter enter--users gameButtons";
							allgames[i].canvasCon.append(allgames[i].enterButton);
						} else {
							$(allgames[i].canvasCon).empty();
							allgames[i].enterButton.className = "enter enter--agent gameButtons noroom-enter--agent";
							allgames[i].createroomButton.className = "createroom createroom--agent disabled-btn gameButtons noroom-create--agent";
							allgames[i].canvasCon.append(allgames[i].createroomButton, allgames[i].enterButton)
						}
					}
				}
			} //end for
		}

	} //addRemoveRoom

	maintenanceChange(data) {
		this.stage.tickEnabled = false;
		this.setMaintenance(data, false);
	}

	endBettingTime(data) {
		this.stage.tickEnabled = true;
	}

	resetAnimation () {

	}

	inputItem (data) {
		this.stage.tickEnabled = true;
		if(data.gameName.toLowerCase() === "poker" || data.gameName.toLowerCase() === "pai-gow") {
			this.roadmap_container.uncache();
		}
	}

	displayResult (data) {
		this.stage.tickEnabled = true;

		if(this.roadmap_container.cacheCanvas) {
			this.roadmap_container.updateCache();
		}

		let timeout = 850;
		if(data.gameName.toLowerCase() === 'pai-gow') {
			timeout = 3000;
		}
		this.roadmap_container.uncache();
		setTimeout(() => {
			this.roadmap_container.cache(0,0,952, 274);
			this.stage.update();
		}, timeout);

		this.stage.update();
	}

	displaymodify() {
		if(this.roadmap_container.cacheCanvas) {
			this.roadmap_container.updateCache();
		}

		this.roadmap_container.uncache();
		setTimeout(() => {
			this.roadmap_container.cache(0,0,952, 274);
			this.stage.update();
		}, 850);

		this.stage.update();
	}

	newRound(data) {
		this.timerStart = false;
		setTimeout( () => {
			this.stage.tickEnabled = false;
		}, 3000);
		setTimeout(() => {
			if(this.roadmap_container.cacheCanvas) {
				this.roadmap_container.updateCache();
			}
		},200)
		this.stage.update();
	}

	shoechange(data) {
		this.stage.tickEnabled = true;

		if(this.roadmap_container.cacheCanvas) {
			this.roadmap_container.updateCache();
		}
	}

	dealerChange(data, gameList) {

		for (var x = 0; x < window.dealerImg.length; x++) {
			if (this.data.dealerId == window.dealerImg[x].id) {
				let dbImage = new Image();
				dbImage.src = window.dealerImg[x].dealer_image;
				this.dealerImg.image = dbImage;
			}
		}

		this.dealer_name.text = this.data.currentDealer;
		this.stage.update();
	}

	updateCredits(data, game) {
		let user_money = 0;

		let currency = "";
		if(window.currencyAbbrev == "USD" || window.currencyAbbrev == "JPY") {
			currency = "$"
		} else if(window.currencyAbbrev == "KRW"){
			currency = "₩"
		} else if(window.currencyAbbrev == "CNY"){
			currency = "¥"
		} else if(window.currencyAbbrev == "IDR") {
			currency = "Rp"
		} else if(window.currencyAbbrev == "MYR") {
			currency = "RM"
		} else if(window.currencyAbbrev == "THB") {
			currency = "฿"
		} else {
			currency = "RM "
		}

		if(window.integrationType == "transfer") {
			let money = (window.casino == 'SS') ? parseFloat(data.payload.credits.money).toFixed(2) : parseInt(data.payload.credits.money);
			$(".userinfo-dtl__holdings").html(self.popup_notification.numberWithCommas(currency + money))

		} else {
			$.post('/getUserMoney', (response) => {
				if(response) {
					let money2 = (window.casino == 'SS') ? parseFloat(response).toFixed(2) : parseInt(response);

					$(".userinfo-dtl__holdings").html(self.popup_notification.numberWithCommas(currency + money2))

					if($(".userinfo-dtl__holdings").html().length > 11) {
						$(".userinfo-dtl__holdings").wrap("<div class='marquee'>")
					}
				}
			});
		}

		if (data.payload.credits.total_winning) {
			let gameText = data.gameName;

			switch(data.gameName){
				case "Baccarat" :
				gameText = window.language.lobby.baccarat;
				break;
				case "Dragon-Tiger" :
				gameText = window.language.lobby.dragontiger;
				break;
				case "Sicbo":
				gameText = window.language.lobby.sicbo;
				break;
				case "Poker":
				gameText = window.language.lobby.texas;
				break;
			}

			self.popup_notification.animatePopup(`${gameText} #${data.tableId}`, parseInt(data.payload.credits.total_winning));
		}
	}

	setRoomInfo(data) {
		// this.stage.tickEnabled = true;
	}

	setMaintenance(data, init) {
		let maintenance = '';
		let mainTextThumb = '';
		let mainText = '';
		let subText = '';
		let activeMaintenance = [];
		let maintenanceSetting = [];

		if(init) {
			if (data.gameName === 'Baccarat' || data.gameName === 'Poker') {
				maintenanceSetting = data.maintenanceSetting.maintenance[0].info;

				for (let j = 0; j < maintenanceSetting.length; j++) {
					if (maintenanceSetting[j].status === 1) {
						maintenance = true;
						activeMaintenance = maintenanceSetting[j];
					} // end if
				} // end for
			} else {
				maintenanceSetting = data.maintenanceSetting;
				for (let i = 0; i < maintenanceSetting.length; i++) {
					if (maintenanceSetting[i].status == 1) {
						maintenance = true;
						activeMaintenance = maintenanceSetting[i];
					}
				} // end for
			} // end else

		} else {
			if(data.data.status == 1) {
				maintenance = true;
			} else {
				maintenance = false;
			}
			activeMaintenance = data.data;
		} // else

		if (activeMaintenance.status === undefined) return;

		let newStartTime = setCurrentTimezone(activeMaintenance.start_time);
		let newEndTime = setCurrentTimezone(activeMaintenance.end_time);

		if (maintenance === true && window.userAuthority != 'admin') {
			$(this.maintenanceCon).show();
			$(this.canvasHover).hide();
			$(this.canvas).hide();
			this.isMaintenance = true;
		} else {
			$(this.maintenanceCon).hide();
			$(this.canvasHover).show();
			$(this.canvas).show();
			this.isMaintenance = false;
		}


		mainText = window.language.lobby[`maintextCap${parseInt(activeMaintenance.main_text)}`]
		subText = window.language.lobby[`subtextCap${parseInt(activeMaintenance.sub_text)}`]

		$(this.maintextCap1).html(mainText);
		$(this.subtextCap1).html(subText);

		if (parseInt(activeMaintenance.time_yn) == 1 ||activeMaintenance.time_yn === undefined) {
			$(this.subtextCap1).html(subText + ', ' + newStartTime +' ~ '+ newEndTime);
		}




		// if(parseInt(activeMaintenance.main_text) == 1  && parseInt(activeMaintenance.sub_text) == 1) {
		// 	mainText = document.createTextNode(window.language.lobby.maintextCap1);
		// 	subText = window.language.lobby.subtextCap1;
		// 	if(parseInt(activeMaintenance.time_yn) == 1 ||activeMaintenance.time_yn === undefined) {
		// 		$(this.subtextCap1).html(subText + '<br/>' + newStartTime +' ~ '+ newEndTime);
		// 	}
		//
		// } else if(parseInt(activeMaintenance.main_text) == 2 && parseInt(activeMaintenance.sub_text) == 2) {
		// 	mainText = document.createTextNode(window.language.lobby.maintextCap2);
		// 	subText = window.language.lobby.subtextCap2;
		// 	if(parseInt(activeMaintenance.time_yn) == 1 || activeMaintenance.time_yn === undefined) {
		// 		$(this.subtextCap1).html(subText + ', ' + newStartTime +' ~ '+ newEndTime);
		// 	}
		// } else {
		// 	mainText = window.language.lobby.maintextCap3;
		// 	subText = window.language.lobby.subtextCap3;
		// 	if(parseInt(activeMaintenance.time_yn) == 1 || activeMaintenance.time_yn === undefined) {
		// 		$(this.subtextCap1).html(subText + ' ' + newStartTime +' ~ '+ newEndTime);
		// 	}
		// }
	}

	setStatus(status) {
		this.status.text = status;
		createjs.Tween.get(this.status).wait(100)
		.to({ alpha : 1 },150)
		.to({ alpha : 0 },150)
		.to({ alpha : 1 },150)
		.to({ alpha : 0 },150)
		.to({ alpha : 1 },150)
	}
	//for balance bet
	animateBalance () {}

	startTime (time, tot) {
		if(!this.timerStart) {

			this.local_time = time;
			this.timer.timer(time, tot);
			this.timerStart = true;
			this.timer.visible = true;

			var loc = setInterval(() => {
				this.local_time--;
				if(this.local_time <= 0) {
					this.timer.timer(0, tot);
					this.timer.visible = false;
					this.timerStart = false;
					clearInterval(loc);
				}
			},1000)
		}
	}

	endTimer (data) {

	}

	getText(x,y,text,font,color,align,valign) {
		let ctrl = new createjs.Text(text,font,color);
		ctrl.x = x;
		ctrl.y = y;
		ctrl.textAlign = align;
		ctrl.textBaseline = valign;//"middle"
		return ctrl;
	}

}

export default {Game};
