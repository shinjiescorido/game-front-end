import '../boot';
import {loadproc as load} from '../v2-web/loadqueue.js';
import {instance as eventListener} from './frmsocket.js';
import {toggle} from './toggleHandler.js';
import {settings} from './menuSettingsEvents.js';
import {popup_notification} from './popup-notification.js';
import {bet_records} from './menuBetRecords.js';
import {reelgames} from './reelgames.js';
import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';

//importing game classess
import {Room} from './Classes/Room';
import {Baccarat} from './Classes/Baccarat';
import {DragonTiger} from './Classes/DragonTiger';
import {Sicbo} from './Classes/Sicbo';
import {Poker} from './Classes/Poker';
import {PaiGow} from './Classes/PaiGow';


let main = {
	baseWidth : 1920,
	baseHeight : 1080,
	load: load,
	toggle: toggle,
	settings: settings,
	popup_notification: popup_notification,
	bet_records: bet_records,
	reelgames: reelgames,
	eventListener : eventListener,

	allGames : [],
	games : [],
	allRooms : [],
	rooms : [],
	bannerGame: [],
	isInit : false,
	finishedLoad : false,
	getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
	},
	run () {
		this.resize(window.innerWidth, window.innerHeight);
		window.addEventListener("resize", () => {
			this.resize(window.innerWidth, window.innerHeight);
		});

		if(window.isJunket) {
			if(window.vendorTables === "") {
				window.vendorTables = {"created_room": [], "disable_table": []};
			}
		}

		$.get('/kaga/list', {}, (response)=> {
			ka_games = response.games;

	    let random1 = Math.floor(Math.random()*ka_games.length);
	    let random2 = random1 == 0 ? (random1 + 1) : (random1 - 1);

			let randomKaGame1 = ka_games[random1];
			let imgSrc1 = 'https://rmpiconcdn.kaga88.com/kaga/gameIcon?game='+randomKaGame1.gameId+'&lang=en&type=square';
			$('#kaga_1').css({
				'background'      : 'url('+imgSrc1+') no-repeat',
				'background-size' : 'contain',
				'transform'		  : 'scale(1.28, 0.94)',
				'left'			  : '31px'
			});

			let randomKaGame2 = ka_games[random2];
			let imgSrc2 = 'https://rmpiconcdn.kaga88.com/kaga/gameIcon?game='+randomKaGame2.gameId+'&lang=en&type=square';
			$('#kaga_2').css({
				'background'      : 'url('+imgSrc2+') no-repeat',
				'background-size' : 'contain',
				'transform'		  : 'scale(1.28, 0.94)',
				'left'			  : '31px'
			});

			let reelaccess = '';
			if (!window.reel_yn) {
				reelaccess = 'not-allowed';
			}

			$(".hotgame-wrap.clearfix").append(
				"<div class='hotgame__con hot--reel "+reelaccess+"' data='kagaming'>"
					+"<div class='hotgame__name'><span>"+window.language.lobby.kagamingreelcaps+"</span></div>"
						+"<div class='hotgame__thumbnail thumb-kagaming'>"
						+"<div class='hotgame--img-wrap'><img src='"+imgSrc1+"' alt='' style='height: 100%;'></div>"
					+"</div>"
				+"</div>"
			)
		});

		load.context = this;
		this.toggle.context = this;
		this.settings.context = this;
		this.popup_notification.context = this;
		this.bet_records.context = this;
		this.reelgames.context = this;
		this.eventListener.context = this;
		this.eventListener.main();
		this.load.main();
		this.popup_notification.main();

		if (window.vendorData.lobby_type == 'exit') {
			$('.header__logout').remove();
		}

		// === Session handling
		var timeCount;
		var countdownTime = 1800; // (30mins -> 1800)
		const startTimer = () => {
		  function timer() {
		    countdownTime--;

		    if (countdownTime <= 0) {
		      clearInterval(timeCount);

			    $(".popup-container").animate({
			      top: '0'
			    }, {
			      duration: 200,
			      start: function () {
							$('.popup-box, .popup-alert-box ').hide();
			        $("#popup-sessionlogout").show();
			        $(".popup-bg").addClass('active').show();
			      }
			    })

			    $('#session-logout').click((e) => {
			    	logout();
			    });

		      setTimeout(() => {
		        logout();
		      }, 5000)
		    }
		  };

		  let logout = function () {
		    $.post('/logout', { }, (redirect) => {
		      window.location.href = redirect;
		    }).fail(function(){
		      // logout();
		    });
		  }

		  timer();
		  timeCount = setInterval(timer, 1000);
		}

		$('.container').click(function() {
		  countdownTime = 1800;
		})

		startTimer();
		// === Session handling
	},
	resize (newWidth, newHeight) {
		var baseRatio = this.baseWidth / this.baseHeight,
			newRatio = newWidth / newHeight;

		if(newRatio > baseRatio) {
			newWidth = newHeight * baseRatio;
		} else {
			newHeight = newWidth / baseRatio;
		}

		$(".container").css({
        width:newWidth , height: newHeight
    });

    $(".canvas-container").css({
        width:newWidth , height: newHeight
    });

    $(".wrapper").css({
        width:newWidth , height: newHeight
    });

		$(".dom-resizable").css({
    	transform: "scale(" + (newWidth / this.baseWidth) + ")"
		});

		$(".wrapper--outer").css({
    	transform: "scale(" + (newWidth / this.baseWidth) + ") "
		});
	},
	main () {

		$("#checktick").on("click", function () {
			for(var x = 0; x < main.games.length; x++) {
				if(main.games[x].stage.tickEnabled && !main.games[x].override) {
					console.log("\nticker going:::=>",main.games[x].namespace)
				}
			}
		});

		// if(!this.getUrlParameter('game')) {
  	if(!parseInt(window.maintenance.status) || window.userAuthority == 'admin') {
    	window.maintenance = typeof window.maintenance === 'string' ? JSON.parse(window.maintenance) : window.maintenance;
			var soundinstance = playSound('welcome');
	    this.settings.setBgm(window.config.bgm);
		}
		// }

		this.setUser();

		if(this.allGames.length) {
			if (window.isJunket > 0) {
				this.createJunketGamesMod(this.allGames, this.allRooms);
				// this.createJunketGames(this.allGames, this.allRooms); //for easey revert
			} else {
				this.createGames(this.allGames);
			}
			this.forceStopTick();
		}
		this.finishedLoad = true;


		//mainmaintenance check
		if(window.maintenance && window.userAuthority != "admin") {
			this.mainmaintenancechange(window.maintenance);
		}

		if(window.isJunket > 1) {
			let secretKey = typeof window.vendorData === 'string' ? JSON.parse(window.vendorData).secret_key : vendorData.secret_key;
			$("#admin-btn").on("click", function () {
				let link = `http://13.230.33.123:9090/`
				// link for when live
				let tempLink = '';
				let link_split = window.pc_redirect_url.split('//');
				let protoCol = link_split[0];
				if(link_split[1].split('/').length > 1) {
					tempLink = `${protoCol}//junket.${link_split[1].split('/')[0]}/`
				}
				console.log(tempLink, 'call link', `${tempLink}api/junket/token`);

				$.post(`${tempLink}api/junket/token`, {
					vendor_name : window.vendorName,
					secret_key : secretKey
				}, function (response) {
					if(response.status === 'ok') {
						tempLink += `login-from-client/${response.token}`;
						console.log("tempLink on response", tempLink)
						window.open(tempLink, "", `width=${window.innerWidth},height=${window.innerHeight}`);
					} else {
						alert(response.message)
					}

				})
			})
		}
	},
	dealerImages : [],
	createGames (games) {
		let pos = 0;
		let cntr = -1;
		let thumbTop = 240;
		let otherGamesX = 0;
		let otherGamesY = 0;

		let otherGamesCount = 0;
		let allContainerCount = 0;

		for(var x = 0; x < games.length; x++) {

			if(games[x].gameName != 'Baccarat') {
				if(otherGamesCount%2 == 0) {
					otherGamesX = 15;
				} else {
					otherGamesX = 953;
				}

				if(otherGamesCount >= 2) {
					if(otherGamesCount%2 == 0) {
						otherGamesY += 240;
					}
				}

				switch(games[x].gameName) {
					case 'Dragon-Tiger':
					this.games[x] = new DragonTiger(games[x], otherGamesX, otherGamesY, 915,215, $('#other-container'), this, window.isJunket);
					break;
					case 'Pai-Gow':
					this.games[x] = new PaiGow(games[x], otherGamesX, otherGamesY, 915,215, $('#other-container'), this, window.isJunket);
					break;
					case 'Poker':
					this.games[x] = new Poker(games[x], otherGamesX, otherGamesY, 915,215, $('#other-container'), this, window.isJunket);
					break;
					case 'Sicbo':
					this.games[x] = new Sicbo(games[x], otherGamesX, otherGamesY, 915,215, $('#other-container'), this, window.isJunket);
					break;
				}
				otherGamesCount++;
			} else {
				if(allContainerCount%2 == 0) {
					allContainerCount = 0;
					cntr++;
				}

				this.games[x] = new Baccarat(games[x], (allContainerCount * 938)+15, (cntr * thumbTop), 915,215, $('#all-container'), this, window.isJunket);
				allContainerCount++;
			}
		}
	},
	createJunketGames(games, rooms) {
		let pos = 0;
		let cntr = -1;
		let thumbTop = 240;
		let otherGamesX = 0;
		let otherGamesY = 0;

		let temp= [];


		if(window.isJunket == 2) {
    	$(".junket-menu__information").show();
			let auth = (typeof window.junketAuth ==='string') ? JSON.parse(window.junketAuth) : window.junketAuth;
			if(!auth.baccarat.auth) $(".junket-menu__information.-baccarat_limit").hide();
			if(!auth.sicbo.auth) $(".junket-menu__information.-sicbo_limit").hide();
			if(!auth.paigow.auth) $(".junket-menu__information.-paigow_limit").hide();
			if(!auth.dragontiger.auth) $(".junket-menu__information.-dragontiger_limit").hide();
		}

		$('.room-con').empty();

		if(window.isJunket == 2 ) {
			let auth = (typeof window.junketAuth ==='string') ? JSON.parse(window.junketAuth) : window.junketAuth;

			if(auth.baccarat.auth == 0) {
				$('#junket-baccarat').hide().removeClass('active');
				$('#junket-baccarat-list').hide();
				$('#junket-other-list').show()
				$('#junket-other').addClass('active');

				games = _.reject(games, function(e) { return e.gameName == "Baccarat" || e.gameName == "Poker"});
			}
      if(!auth.sicbo.auth && !auth.paigow.auth && !auth.dragontiger.auth) {
				$('#junket-other').hide();
				games = _.filter(games, function(e) { return e.gameName == "Baccarat" || e.gameName == "Poker"});
			}
      if (!auth.sicbo.auth) {
				games = _.reject(games, function(e) { return e.gameName == "Sicbo" || e.gameName == "Poker"});
			}
      if (!auth.paigow.auth) {
				games = _.reject(games, function(e) { return e.gameName == "Pai-Gow" || e.gameName == "Poker"});
			}
      if (!auth.dragontiger.auth) {
				games = _.reject(games, function(e) { return e.gameName == "Dragon-Tiger" || e.gameName == "Poker"});
			}
      if(auth.sicbo.auth && auth.paigow.auth && auth.dragontiger.auth){
				games = _.reject(games, function(e) { return e.gameName == "Poker"});
			}

		} else {
			let bcroom = 0;
			let dtroom = 0;
			let sbroom = 0;
			let pgroom = 0;

			for (var j = 0; j < rooms.length; j++) {

				for (var k = 0; k < games.length; k++) {
					if(games[k].namespace == rooms[j].namespace) {
							temp.push(games[k])
					}

				}
			}
			// temp =_.uniq(temp, function(e) { return e.namespace });
			games = _.sortBy(temp, function (e) {
				let table = e.tableNumber > 1 ? e.tableNumber : `0${e.tableNumber}`;
				return `${e.gameName}/${table}`//e.namespace
			});

			var auth = (typeof window.junketAuth ==='string') ? JSON.parse(window.junketAuth) : window.junketAuth;


			if (auth.baccarat.auth == 0 && auth.sicbo.auth == 0 && auth.dragontiger.auth == 0 && auth.paigow.auth == 0 ){
				let auth = (typeof window.junketAuth ==='string') ? JSON.parse(window.junketAuth) : window.junketAuth;
				$('.junket-con').hide();
				$('.junket-menu__items').removeClass('active');
				// if(auth.baccarat.auth == 1) {
				// 	$('#junket-baccarat').show().addClass('active');
				// 	$('#junket-baccarat-list').show()
				// } else if(auth.sicbo.auth == 1 || auth.paigow.auth == 1 || auth.dragontiger.auth == 1) {
				// 	$('#junket-other').show();
				// }
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
		} //end else

		let otherCount = 0;
		let junketBaccaratCount = 0;
		let temproom = [];
		let countGame = 0;
    let tempCount = 0;
    let pgCount = 0;
    let dtCount = 0;
    let sbCount = 0;

    let bcRooms = _.filter(rooms, function (e) {
    	return e.namespace.indexOf('Baccarat') > -1;
    });

 		bcRooms = _.sortBy(bcRooms, function (e) {
			return e.namespace
		});

 		if(window.isJunket == 1) {
	    let cnt = 0;
	    //baccarat rooms
	    for(var x = 0; x < bcRooms.length; x++) {
    		if(bcRooms[x].namespace ===  games[cnt].namespace) {
					if(junketBaccaratCount%2 == 0) {
						junketBaccaratCount = 0;
						cntr++;
					}
	    		this.games[cnt] = new Baccarat(games[cnt], (junketBaccaratCount * 938)+15, (cntr * thumbTop), 915,215, $('#junket-baccarat-list'), this, window.isJunket, bcRooms[x]);
	    		cnt++;
	    		junketBaccaratCount++;
    		}
	    }
 		}

		for(var x = 0; x < games.length; x++) {
			temproom = _.filter(rooms, function (e) { return e.namespace === games[x].namespace });

			if(games[x].gameName != 'Baccarat') {
				if(otherCount%2 == 0) {
					otherGamesX = 15;
				} else {
					otherGamesX = 953;
				}
				if(otherCount >= 2) {
					if(otherCount%2 == 0) {
						otherGamesY += 240;
					}
				}

				switch(games[x].gameName) {
					case 'Dragon-Tiger':
						dtCount++;
						if(window.isJunket==2) {
							this.games[x] = new DragonTiger(games[x], otherGamesX, otherGamesY, 915,215, $('#junket-other-list'), this, window.isJunket, temproom);
						} else {
							this.games[x] = new DragonTiger(games[x], otherGamesX, otherGamesY, 915,215, $('#junket-other-list'), this, window.isJunket, temproom[dtCount-1]);
						}

						break;
					case 'Pai-Gow':
						pgCount++;
						if(window.isJunket == 2) {
							this.games[x] = new PaiGow(games[x], otherGamesX, otherGamesY, 915,215, $('#junket-other-list'), this, window.isJunket, temproom);
						} else {
							this.games[x] = new PaiGow(games[x], otherGamesX, otherGamesY, 915,215, $('#junket-other-list'), this, window.isJunket, temproom[pgCount-1]);
						}

						break;
					case 'Sicbo':
						sbCount++;
						if(window.isJunket==2) {
							this.games[x] = new Sicbo(games[x], otherGamesX, otherGamesY, 915,215, $('#junket-other-list'), this, window.isJunket, temproom);
						} else {
							this.games[x] = new Sicbo(games[x], otherGamesX, otherGamesY, 915,215, $('#junket-other-list'), this, window.isJunket, temproom[sbCount-1]);
						}

						break;
				}

				otherCount++;
			} else {
				if(junketBaccaratCount%2 == 0) {
					junketBaccaratCount = 0;
					cntr++;
				}
				if(window.isJunket==2) {
					this.games[x] = new Baccarat(games[x], (junketBaccaratCount * 938)+15, (cntr * thumbTop), 915,215, $('#junket-baccarat-list'), this, window.isJunket, temproom );
				}

				junketBaccaratCount++;
			}

      if(window.isJunket==2) {
        let parentid = games[x].namespace.split("/").join("-");
  			for (var i = 0; i < rooms.length; i++) {
  				if(games[x].namespace == rooms[i].namespace) {
  					this.rooms[i] = new Room(rooms[i], $(`#${parentid}-room`), this, false); //to avoid [array,array,undefined,array]
  				}
  			}
      }

		}

    if(window.isJunket == 1) {
      for (var x = 0; x < this.games.length; x++) {
        let parentid = this.games[x].roomdata[0].namespace.split("/").join("-");
        for (var i = 0; i < rooms.length; i++) {
  				if(this.games[x].roomdata[0].roomId == rooms[i].roomId) {
  					this.rooms[i] = new Room(rooms[i], $(`#${parentid}-room`), this, false); //to avoid [array,array,undefined,array]
  				}
  			}
      }
    }


		this.setRoomLimitDisp();
		if(window.isJunket ==1) {
	    if($("#junket-baccarat").hasClass('active')) {
	      let bc = _.filter(window.all_Rooms, function (e) {return e.namespace.indexOf('Baccarat') > -1});
	      if(!bc.length) {
	        $('#junket-no-rooms').show();
	      } else {
	        $('#junket-no-rooms').hide();
	      }
	    } else {
	      let other = _.filter(window.all_Rooms, function (e) {return e.namespace.indexOf('Baccarat') <= -1});
	      if(!other.length) {
	        $('#junket-no-rooms').show();
	      } else {
	        $('#junket-no-rooms').hide();
	      }
	    }
	  }
	},
	createJunketGamesMod (games, rooms) {
		let pos = 0;
		let cntr = -1;
		let thumbTop = 240;
		let otherGamesX = 0;
		let otherGamesY = 0;

		let otherGamesCount = 0;
		let allContainerCount = 0;

		// if (window.userAuthority == 'user') {
		// 	_.remove(games, function(n) { return n.gameName == 'Pai-Gow'; });
		// 	_.remove(rooms, function(n) { return n.gameName == 'Pai-Gow'; });
		// }

		//ordering
		let roomgames = _.filter(games, function (e) {
			return _.includes(_.map(rooms, function(a) {return a.namespace}), e.namespace)
		});
		let noroomgames = _.filter(games, function (e) {
			return !_.includes(_.map(rooms, function(a) {return a.namespace}), e.namespace)
		});

		games = roomgames;
		games.push(...noroomgames);
		//end of ordering

		for(var x = 0; x < games.length; x++) {
			let temproom = _.filter(rooms, function (e) { return e.namespace === games[x].namespace });



			if(games[x].gameName != 'Baccarat') {
				if(otherGamesCount%2 == 0) {
					otherGamesX = 15;
				} else {
					otherGamesX = 953;
				}

				if(otherGamesCount >= 2) {
					if(otherGamesCount%2 == 0) {
						otherGamesY += 240;
					}
				}

				switch(games[x].gameName) {
					case 'Dragon-Tiger':
					this.games[x] = new DragonTiger(games[x], otherGamesX, otherGamesY, 915,215, $('#junket-other-list'), this, window.isJunket, temproom);
					break;
					case 'Pai-Gow':
					this.games[x] = new PaiGow(games[x], otherGamesX, otherGamesY, 915,215, $('#junket-other-list'), this, window.isJunket, temproom);
					break;
					case 'Poker':
					this.games[x] = new Poker(games[x], otherGamesX, otherGamesY, 915,215, $('#junket-other-list'), this, window.isJunket, temproom);
					break;
					case 'Sicbo':
					this.games[x] = new Sicbo(games[x], otherGamesX, otherGamesY, 915,215, $('#junket-other-list'), this, window.isJunket, temproom);
					break;
				}
				otherGamesCount++;
			} else {
				if(allContainerCount%2 == 0) {
					allContainerCount = 0;
					cntr++;
				}

				this.games[x] = new Baccarat(games[x], (allContainerCount * 938)+15, (cntr * thumbTop), 915,215, $('#junket-baccarat-list'), this, window.isJunket, temproom);
				allContainerCount++;
			}


      let parentid = games[x].namespace.split("/").join("-");
			for (var i = 0; i < rooms.length; i++) {
				if(games[x].namespace == rooms[i].namespace) {
					this.rooms[i] = new Room(rooms[i], $(`#${parentid}-room`), this, false); //to avoid [array,array,undefined,array]
				}
			}

		}
		this.repositionStages();
	},
	createRooms (data, state) {
		if(state) {
			let parentid = data.namespace.split("/").join("-");
			let tempgame = [];
			let temproom = [];
			let tempdata = {};

			let newrooms = [];
			let newgames = [];

			// if(window.isJunket) {
				// for (var i = 0; i < this.allGames.length; i++) {
				// 	if(this.allGames[i].namespace == data.namespace) {
				// 		tempdata = this.allGames[i]
				// 	}

					// if(this.games.length) {
					// 	for (var x = 0; x < this.games.length; x++) {
					// 		if(tempdata.namespace == this.games[x].data.namespace) {
          //
					// 			tempgame[x] = this.games[x].data;
					// 		} else {
					// 			tempgame[x] = this.games[x].data;
					// 			tempgame.push(tempdata)
					// 		}
					// 	}
					// } else {
					// 	tempgame.push(tempdata)
					// }
				// } //end for

				// if(this.games.length) {
				// 	for (var x = 0; x < this.games.length; x++) {
				// 		if(tempdata.namespace == this.games[x].data.namespace) {
				// 			tempgame[x] = this.games[x].data;
				// 		} else {
				// 			tempgame[x] = this.games[x].data;
				// 			tempgame.push(tempdata)
				// 		}
				// 	}
				// } else {
				// 	tempgame.push(tempdata)
				// }
        //
        // if(this.games.length) {
				// 	for (var x = 0; x < this.games.length; x++) {
				// 		tempgame.push(this.games[x].data);
				// 	}
				// }
        //

				$('#junket-baccarat-list, #junket-other-list').empty()
				window.all_Rooms.push(data)
				// this.createJunketGames(this.allGames, window.all_Rooms)

				this.createJunketGamesMod(this.allGames, window.all_Rooms)
			// }
			/*else if(window.isJunket == 2){
				window.all_Rooms.push(data)

				this.rooms.push(new Room(data,$(`#${parentid}-room`), this, true))

				$(".popup-container").animate({
					top: '0'
				}, {
					duration: 200,
					start: function () {
						$('.popup-body-inner').remove();
						$('.popup-btn-inner').remove();
						$('.popup-bg').show();
						$('.popup-box').hide();
						$('#popup-success .popup-alert-btn').empty();
						$('#popup-success .popup-alert-btn').append(`
							<div class="btn-popup popup-btn--close">
								<span>Close</span>
							</div>
						`)
						$("#popup-success").show();
					}
				})

			}*/
		} else {
			Room.createRoom(data, this, true)
		}
	}, //createRooms

	setRoomLimitDisp () {
		let auth = (typeof window.junketAuth ==='string') ? JSON.parse(window.junketAuth) : window.junketAuth;

		//let limit
		let bc_rooms = _.filter(this.allRooms, function (e) {return e && e.gameName.toLowerCase() === 'baccarat'});
		let sb_rooms = _.filter(this.allRooms, function (e) {return e && e.gameName.toLowerCase() === 'sicbo'});
		let paigow_rooms = _.filter(this.allRooms, function (e) {return e && e.gameName.toLowerCase() === 'pai-gow'});
		let dt_rooms = _.filter(this.allRooms, function (e) {return e && e.gameName.toLowerCase() === 'dragon-tiger'});
		$(".-baccarat_limit > .junket_limit").html(`${bc_rooms.length}`);
		$(".-paigow_limit > .junket_limit").html(`${paigow_rooms.length}`);
		$(".-sicbo_limit > .junket_limit").html(`${sb_rooms.length}`);
		$(".-dragontiger_limit > .junket_limit").html(`${dt_rooms.length}`);

	},

	forceStopTick () {
		// enabling and disbaling ticker for inactive tabs
		// if(this.toggle.getCurrentOpen() == 'baccarat') {
		// 	for(var x=  0; x < this.games.length; x++) {
		// 		if(this.games[x].namespace.indexOf('Baccarat') <= -1) {
		// 			this.games[x].stage.tickEnabled = false;
		// 			this.games[x].override = true;
		// 			this.games[x].isDealAnimation = false;
		// 			this.games[x].resetAnimation();
		// 			this.games[x].stage.update();
		// 		} else {
		// 			// this.games[x].stage.tickEnabled = true;
		// 			this.games[x].override = false;
		// 		}
		// 	}
		// } else if (this.toggle.getCurrentOpen() == 'othergames') {
		// 	for(var x=  0; x < this.games.length; x++) {
		// 		if(this.games[x].namespace.indexOf('Baccarat') > -1) {
		// 			this.games[x].stage.tickEnabled = false;
		// 			this.games[x].override = true;
		// 			this.games[x].isDealAnimation = false;
		// 			this.games[x].resetAnimation();
		// 			this.games[x].stage.update();
		// 		} else {
		// 			// this.games[x].stage.tickEnabled = true;
		// 			this.games[x].override = false;
		// 		}
		// 	}
		// }
	},
	/**
	 * ordering disabled and maintenance tables. alters [this.games] array but does not reorder global all_tables array
	 * @return {[null]}
	 */
	repositionStages() {
		//ordering
		let tables = {
			disabled: {
				bc:  _.filter(this.games, function (e) { return e.isDisabled && !e.isMaintenance && e.data.gameName === 'Baccarat' }),
				other : _.filter(this.games, function (e) { return e.isDisabled && !e.isMaintenance && e.data.gameName !== 'Baccarat' })
			},
			active : {
				bc : _.filter(this.games, function (e) { return !e.isDisabled  && !e.isMaintenance && e.data.gameName === 'Baccarat'}),
				other : _.filter(this.games, function (e) { return !e.isDisabled  && !e.isMaintenance && e.data.gameName !== 'Baccarat'})
			},
			maintenance: {
				bc:  _.filter(this.games, function (e) { return e.isMaintenance && e.data.gameName === 'Baccarat' }),
				other : _.filter(this.games, function (e) { return e.isMaintenance && e.data.gameName !== 'Baccarat' })
			}
		}


		let tablesClass = ["disabled", "active", "maintenance"];

		for(var key in tables) {
			tables[key].bc = _.sortBy(tables[key].bc, function (e) {
	      let table = e.data.tableNumber.length > 1 ? e.data.tableNumber : `0${e.data.tableNumber}`;
	      return `${e.data.gameName}/${table}`//e.namespace
			})

			tables[key].other = _.sortBy(tables[key].other, function (e) {
	      let table = e.data.tableNumber.length > 1 ? e.data.tableNumber : `0${e.data.tableNumber}`;
	      return `${e.data.gameName}/${table}`//e.namespace
			})
		}

		//if disabled  or has rooms but inside maintenance, remove from disabled || hasrooms

		tables.disabled.bc = _.filter(tables.disabled.bc, function (e) {
			return !_.find(tables.maintenance.bc, function (a) {return a == e});
		});
		tables.disabled.other = _.filter(tables.disabled.other, function (e) {
			return !_.find(tables.maintenance.other, function (a) {return a == e});
		});

		tables.active.bc = _.sortBy(tables.active.bc, function (e) {
			return !e.roomdata.length
		});

		tables.active.other = _.sortBy(tables.active.other, function (e) {
			return !e.roomdata.length
		});
		//re-ordering array
		this.games = [];

		if(window.isJunket == 2) {
			this.games.push(...tables.active.bc);
			this.games.push(...tables.disabled.bc);
			this.games.push(...tables.maintenance.bc);

			this.games.push(...tables.active.other);
			this.games.push(...tables.disabled.other);
			this.games.push(...tables.maintenance.other);
		} else if(window.isJunket == 1) {
			this.games.push(...tables.active.bc);
			this.games.push(...tables.maintenance.bc);
			this.games.push(...tables.disabled.bc);

			this.games.push(...tables.active.other);
			this.games.push(...tables.maintenance.other);
			this.games.push(...tables.disabled.other);
		} else {
			this.games.push(...tables.active.bc);
			this.games.push(...tables.disabled.bc);
			this.games.push(...tables.maintenance.bc);

			this.games.push(...tables.active.other);
			this.games.push(...tables.disabled.other);
			this.games.push(...tables.maintenance.other);
		}

		let posX = 0, posY = 0

		//order
		for(var x = 0; x < this.games.length; x++) {
			this.games[x].reposition((posX * 938)+15, posY * 240)
			if(this.games[x].isDisabled) {
				if(window.isJunket == 1) {
					$(this.games[x].canvasOverlay).hide()
					$(this.games[x].toggleActiveButton).hide()
					$(this.games[x].canvas).hide()
					$(this.games[x].timerCanvas).hide()
					$(this.games[x].canvasHover).hide()
					$(this.games[x].roomCon).hide()
					$(this.games[x].maintenanceCon).hide()
				}
			} else {
				if(!this.games[x].isMaintenance) {
					$(this.games[x].canvas).show()
					$(this.games[x].timerCanvas).show()
				}
			}

			if(window.isJunket == 2) {
				if(this.games[x].roomdata.length) {
					$(this.games[x].toggleActiveButton).hide();
					this.games[x].gameName.x = 15;
				} else {
					$(this.games[x].toggleActiveButton).show();
					this.games[x].gameName.x = 61;
				}
			}

			posX ++;
			if (posX % 2 === 0) {
				posX = 0;
				posY ++;
			}

			if(this.games[x+1] && this.games[x-1]) {
				if(this.games[x+1].data.gameName != 'Baccarat' && this.games[x-1].data.gameName == 'Baccarat') {
					posY = 0
				}
			}

		}
	},
	/**
	 * admin function to enable and disable table
	 * @param {[array]} games [array response from db. list of disabled tables]
	 */
	setEnableDisable (data) {
		$(`.game-room-overlay`).css({
			'z-index' : 0,
			background: 'transparent'
		});
		$(`.game-hover`).removeClass('disabled-table');
		for(var x = 0; x < data.all_disabled.length; x++) {
			var game = _.find(this.games, function (e) {
				let gameName = data.all_disabled[x];


				if(gameName.indexOf('Dragon')>-1 || gameName.indexOf('Pai')>-1) {
					var stringSplit = gameName.split('-');
					gameName = `${stringSplit[0]}-${stringSplit[1]}/${stringSplit[2]}`
				} else {
					gameName = gameName.replace('-', '/');
				}
				return e.namespace === gameName;
			});



			if(!_.isEmpty(game)) {
				game.isDisabled = true;
			}

			let g = _.find(this.games , function (e) {
				let gameName = data.current_game;
				if(gameName.indexOf('Dragon')>-1 || gameName.indexOf('Pai')>-1) {
					var stringSplit = gameName.split('-');
					gameName = `${stringSplit[0]}-${stringSplit[1]}/${stringSplit[2]}`
				} else {
					gameName = gameName.replace('-', '/');
				}
				return e.namespace === gameName;
			});

			if(!_.isEmpty(g)) {
				if(data.current_state) {
					g.isDisabled = true;
				} else {
					g.isDisabled = false;
				}
			}

			$(`#${data.all_disabled[x]}-hover.game-hover`).addClass('disabled-table');

			$(`.game-room-overlay.${data.all_disabled[x]}`).css({
				'z-index' : 2,
				'background' : 'rgba(16, 16, 16, 0.7)'
			});


		}

		if(!data.all_disabled.length) {
			for(var x = 0; x < this.games.length; x++) {
				this.games[x].isDisabled = false;
			}
		}

		let selectedgame = _.find(this.games, function (e) { return e.namespace.split("/").join("-") == data.current_game});

		if(!data.current_state && selectedgame.namespace.split("/").join("-") == data.current_game) {
			$(selectedgame.createroomButton).removeClass('disabled-btn');
		} else {
			$(selectedgame.createroomButton).addClass('disabled-btn');
		}

		let auth = (typeof window.junketAuth ==='string') ? JSON.parse(window.junketAuth) : window.junketAuth;

		for (var key in auth) {
			if(key == selectedgame.data.gameName.split('-').join('').toLowerCase() && auth[key].count == 0 || selectedgame.data.gameName == 'Poker') {
				$(selectedgame.createroomButton).addClass('disabled-btn');
			}
		}

		this.repositionStages();
	},
	enableDsiableChange(data) {
		if(window.isJunket == 2) return;

		window.vendorTables = typeof window.vendorTables === 'string' ? JSON.parse(window.vendorTables) : window.vendorTables;

		if(window.vendor_id != data.vendor_id) return;

		let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});

		if(!_.isEmpty(game)) {
			if(data.status == 1) {
				game.isDisabled = true;
				game.toggleActiveButton.className = 'room-active-toggle checked';
				$(game.canvasOverlay).css({
					'z-index' : 2,
					'background' : 'rgba(16, 16, 16, 0.7)'
				});

				let appendthis = game.namespace.split('/');
				appendthis = `${appendthis[0]}-${appendthis[1]}`;
				window.vendorTables.disable_table.push(appendthis);
			} else {
				game.isDisabled = false;
				game.toggleActiveButton.className = 'room-active-toggle';

				$(game.canvasHover).show()
				$(game.canvasOverlay).css({
					'z-index' : 0,
					'background' : 'transparent'
				});

				let removethis = game.namespace.split('/');
				removethis = `${removethis[0]}-${removethis[1]}`;

				window.vendorTables.disable_table = _.filter(window.vendorTables.disable_table, function (e) {
					return e != removethis;
				});

			}
		}

		this.repositionStages();

    $('.game-hover').removeClass('disabled-table');
	},
	maintenanceChange(data) {
		let game = _.find(this.games, function (e) { return e.namespace ===  `${data.gameName}/${data.tableId}` });

		let disabledTables = _.cloneDeep(window.vendorTables);
		if(disabledTables != '') {
			disabledTables = typeof disabledTables === 'string' ? JSON.parse(disabledTables).disable_table : disabledTables.disable_table;
		}

		if(!_.isEmpty(game)) {
			let tblCheck = false;
			for (var i = 0; i < disabledTables.length; i++) {
				if (disabledTables[i] == `${data.gameName}-${data.tableId}` && window.isJunket == 1) {
					tblCheck = true;
				}
			}
			if (!tblCheck) {
				game.maintenanceChange(data);
			}
		}

		this.repositionStages();
	},
	mainmaintenancechange (data) {

		if (data.status === undefined) return;

    let mainText = '';
    let subText = '';

    let newStartTime = setCurrentTimezone(data.start_time);
    let newEndTime = setCurrentTimezone(data.end_time);

    if (parseInt(data.mainText) == 1 || parseInt(data.main_text) == 1) {
      mainText = window.language.lobby.maintextCap1;
    }
    else if (parseInt(data.mainText) == 2 || parseInt(data.main_text) == 2) {
      mainText = window.language.lobby.maintextCap2;
    }
    else if (parseInt(data.mainText) == 3  || parseInt(data.main_text) == 3) {
      mainText = window.language.lobby.maintextCap3;
    }

    if (parseInt(data.subText) == 1 || parseInt(data.sub_text) == 1) {
      subText = window.language.lobby.subtextCap1;
    }
    else if (parseInt(data.subText) == 2 || parseInt(data.sub_text) == 2) {
      subText = window.language.lobby.subtextCap2;
    }
    else if (parseInt(data.subText) == 3 || parseInt(data.sub_text) == 3) {
      subText = window.language.lobby.subtextCap3;
    }

    if (data.status == 1 && window.userAuthority != "admin") {
      $('.mainText').html(mainText);
      if(window.language.locale == "zh") {
        $(".mainText").css("margin-left","20px")
      }
      $('.subText').html(subText);
      $('.schedule').html(newStartTime+' ~ '+newEndTime);
      $('.maintenanceOverlay').show();
      $("#myCanvas").hide()
      $(".content-container").hide()
    }
    else {
      $('.maintenanceOverlay').hide();
      $("#myCanvas").show()
      $(".content-container").show()
    }
	},
	setBettingTime (data) {

		let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});

		if(!_.isEmpty(game)) {
			game.startTime(parseInt(data.bettingTime), parseInt(data.totalTime));
			if(data.bettingTime > 0) {
				game.animateBalance('show');
			}
			if(data.bettingTime <= 0) {
				game.setStatus(window.language.lobby.bettingend);
				game.endBettingTime(data);
			}
		}
	},
	inputItem (data) {
		let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
		if(!_.isEmpty(game)) {
			if((data.gameName == "Baccarat" && data.type == "player1")  || (data.gameName == "Dragon-Tiger" && data.type == "tiger") || (data.gameName == "Poker" && data.gameInfo.player.length == 1)) {
				game.setStatus(window.language.lobby.dealing);
			}
			game.inputItem(data)
		}
	},
	displayResult(data) {
		let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
		let gameTable = _.find(window.all_tables, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});

		if(!_.isEmpty(gameTable)) {
			if(gameTable.gameName === 'Sicbo') {
				gameTable.marks.shift();
				gameTable.marks.push(data.mark);
			} else {
				gameTable.marks.push(data.mark);
			}
		}

		this.allGames = window.all_tables;

		if(!_.isEmpty(game)) {
			game.setStatus(window.language.lobby.result);

			game.data.marks = gameTable.marks;
			game.displayResult(data)
		}
	},
	newround (data) {
		let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
		if(!_.isEmpty(game)) {
			game.setStatus(window.language.lobby.nowbetting);
			game.newRound(data)
			if(window.isJunket > 0) {
				if(!_.isEmpty(game.roomdata) && !_.isEmpty(this.rooms)) {
					for (var i = 0; i < this.rooms.length; i++) {
						_.compact(this.rooms[i]);
						if(this.rooms[i].namespace == `${data.gameName}/${data.tableId}`) {
							this.rooms[i].setRoundCount(data)
						}
					}
				}
			}
		}
	},
	shoechange (data) {
		let gameTable = _.find(window.all_tables, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
		if(!_.isEmpty(gameTable)) {
			gameTable.marks = [];
		}

		this.allGames = window.all_tables;

		let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
		if(!_.isEmpty(game)) {
			game.setStatus(window.language.prompts.promptshuffling);
			game.data.marks = [];
			game.shoechange(data)
		}
	},
	dealerChange (data) {
		let gameTable = _.find(window.all_tables, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
		if(!_.isEmpty(gameTable)) {
			gameTable.dealerId = data.dealerId;
			gameTable.currentDealer = data.dealerName;
		}

		this.allGames = window.all_tables;

		let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
		$.post(`/getDealerImg`, {dealerId : _.map(this.allGames, function(e){return e.dealerId})},  (response) => {
			window.dealerImg = response;
			if(!_.isEmpty(game)) {
				game.data.dealerId = data.dealerId;
				game.data.currentDealer = data.dealerName;
				game.dealerChange(data)
			}
		});
	},
	updateCredits (data) {
		let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
		if(!_.isEmpty(game)) {
			game.updateCredits(data, this.allGames)
		}
	},
	setRoomInfo (data) {
		let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
		if(!_.isEmpty(game)) {
			 let gameTable = _.find(all_tables, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});

			gameTable.betInfo = data.data;
			gameTable.totalBettingUsers = data.totalBettingUsers;
			game.data.betInfo = gameTable.betInfo;
			game.data.totalBettingUsers = gameTable.totalBettingUsers;
			if(window.room_info == 1) {
				game.setRoomInfo(data);
			}
		}
	},
	setUser() {
		let currency = "";
		if(window.currencyAbbrev == "USD" || window.currencyAbbrev == 'HKD') {
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
		} else if(window.currencyAbbrev == "PTS") {
			currency = "";
		} else if(window.currencyAbbrev == 'JPY') {
			currency = "¥"
		} else if(window.currencyAbbrev == 'RUB') {
			currency = "₽"
		}else if(window.currencyAbbrev == 'UAH') {
			currency = "₴"
		}else if(window.currencyAbbrev == 'GEL') {
			currency = "ლ"
		}else if(window.currencyAbbrev == 'EUR') {
			currency = "€"
		}else if(window.currencyAbbrev == 'GBP') {
			currency = "£"
		}else if(window.currencyAbbrev == 'TRY') {
			currency = "₺"
		}else if(window.currencyAbbrev == 'IRR') {
			currency = "IRR"
		}else if(window.currencyAbbrev == 'DGN') {
			currency = "DGN"
		}else if(window.currencyAbbrev == 'CZK') {
			currency = "Kč"
		}else if(window.currencyAbbrev == 'HUF') {
			currency = "Ft"
		}else if(window.currencyAbbrev == 'SEK') {
			currency = "kr"
		}else if(window.currencyAbbrev == 'VND') {
			currency = "₫"
		}else if(window.currencyAbbrev == 'BYN') {
			currency = "Br"
		}else if(window.currencyAbbrev == 'BYN') {
			currency = "Br"
		}else if(window.currencyAbbrev == 'INR') {
			currency = "INR"
		}

		window.money = (window.casino == 'SS') ? parseFloat(window.money).toFixed(2) : parseInt(window.money);

		$(".userinfo__avatar img").attr("src","/img/avatar/"+window.config.default+'.png')
		$(".userinfo-dtl__name").text(window.username)
		$(".userinfo-dtl__holdings").text(currency+numberWithCommas(window.money))

		if(window.money.toString().split('').length > 8) {
			$(".userinfo-dtl__holdings").wrap("<div class='marquee'>")
		}
		if(window.username.toString().split('').length > 14) {
			$(".userinfo-dtl__name").wrap("<div class='marquee'>")
		}
	},
	// setStatus (data) {
	// 	let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
	// 	if(!_.isEmpty(game)) {
	// 		game.setStatus(data)
	// 	}
	// },
	checkingEnterCreate(data) {
    // count checking
		if(window.isJunket < 2) return
    // var auth = (typeof window.junketAuth ==='string') ? JSON.parse(window.junketAuth) : window.junketAuth;
    var count = [];

    for(var x = 0; x < this.games.length; x++) {
      if(this.games[x].data.gameName === data.gameName) {
        count.push(...this.games[x].roomdata)
      }
    }

		let gamename = data.gameName.split("-").join("");

    // let authCount =  auth[gamename.toLowerCase()];

    let games = _.filter(this.games, (e) => {return e.data.gameName == data.gameName});

		games.forEach((game) => {
			if(game.roomdata.length) {
				$(game.canvasCon).empty();
	      $(this.canvasHover).addClass('inactive');
	      game.enterButton.className = "enter enter--agent gameButtons";
	      $(game.createroomButton).hide();
				game.canvasCon.append(game.enterButton);
			} else {

			}
		});
	},
	setRoomUserCount(data, type) {
		for (var i = 0; i < this.rooms.length; i++) {
			if(data.data.token == this.rooms[i].data.token) {
				this.rooms[i].setUserCount(data, type)
			}
		}

	},
	handleDealerimg () {
		for(var x = 0; x < this.games.length; x++) {
			let dealerImg = _.find(window.dealerImg, (e) => {return e.id === this.games[x].data.dealerId});

			if(_.isEmpty(dealerImg)) continue;
	    let dbImage = new Image();
	    dbImage.src = dealerImg.dealer_image;
	    this.games[x].dealerImg.image = dbImage;
	    this.games[x].stage.update();
		}
	},
	displaymodify (data) {
		let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});

		if(!_.isEmpty(game)) {
			 let gameTable = _.find(all_tables, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
			 if(game.data.gameName == 'Sicbo' || game.data.gameName == 'Pai-Gow' || game.data.gameName == 'Poker') {
				gameTable.marks.pop();
				gameTable.marks.push(data.data.mark);
				game.data.marks = gameTable.marks;
			 } else {
				gameTable.marks = data.data.mark;
				game.data.marks = data.data.mark;
			 }

			game.displaymodify();

			console.log(data.data.mark, "displaymodify")
		}
	},
	displayRollback (data) {
		let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});

		if(!_.isEmpty(game)) {
			 let gameTable = _.find(all_tables, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
			if(game.data.gameName == 'Sicbo' || game.data.gameName == 'Pai-Gow' || game.data.gameName == 'Poker') {
				gameTable.marks.pop();
				game.data.marks = gameTable.marks;
			 } else {
				gameTable.marks = data.data.mark;
				game.data.marks = data.data.mark;
			 }

			game.displaymodify();

			console.log(data.data.mark, "displaymodify")
		}
	},
	changeTableHeaderBg(slave) {
		let headerColor = {
			main : ['#871a51','#280f1a'],
			baccarat : ['#970000','#2d0000'],
			junket : ['#ffd67a','#ad800f']
		}


		for(let x=0; x < this.games.length; x++) {
			if(this.games[x].roomdata.length) {
				this.games[x].header.graphics.beginLinearGradientFill(headerColor.junket, [0,1], 0, 0, 400, 0).drawRoundRect(0, 0, 400, 35, 0);
				this.games[x].gameName.color = "#000";
				this.games[x].status.color = "#000";
				if(this.games[x].flippyImg) {
					this.games[x].flippyImg.x = this.games[x].gameName.x + this.games[x].gameName.getBounds().width + 15;
				}
				if(this.games[x].roomdata[0].slave && this.games[x].roomdata[0].slave == 'supersix') {
					$(this.games[x].canvasOverlay).prepend('<i class="ico-room-supersix"></i>');
					if(this.games[x].flippyImg) {
						$(this.games[x].canvasOverlay).find('.ico-room-supersix').css({left :this.games[x].flippyImg.x + 40 });
					} else {
						$(this.games[x].canvasOverlay).find('.ico-room-supersix').css({left : this.games[x].gameName.getBounds().width + 30 });
					}
				}

				this.games[x].stage.update();
			} else {
				if(this.games[x].data.gameName == "Baccarat") {
					this.games[x].header.graphics.beginLinearGradientFill(headerColor.baccarat, [0,1], 0, 0, 400, 0).drawRoundRect(0, 0, 400, 35, 0);
				} else {
					this.games[x].header.graphics.beginLinearGradientFill(headerColor.main, [0,1], 0, 0, 400, 0).drawRoundRect(0, 0, 400, 35, 0);
				}
				this.games[x].gameName.color = "#f1e382";
				this.games[x].status.color = "#fff";
				this.games[x].stage.update();
			} // end else
		} // end for
	},

	domEvents() {
		$('.menu-list-bg').click((e) => {
			$('.range-list').attr('style', '');
			$('.modal-con, .howto-wrap').css('z-index', '');
			$('.howto-submenu').css('opacity', '');
			$(".modal-select").removeClass('range-drop').addClass('range-hide');

			$(e.target).addClass('active').siblings().removeClass('active');

			var elementAttr = $(e.currentTarget).attr('value');
			var arrayElement = ["#sicbo-toggle","#poker-toggle","#baccarat-toggle","#dragontiger-toggle","#paigow-toggle","#red-white-toggle","#bigwheel-toggle","#roulette-toggle"];
			arrayElement.forEach( (e) => {
				$(e).hide();
			});

			if(elementAttr == 'betlogs') {
				$('.modal-con.-result').css('display', '');
				var datenow = new Date();
				var year = datenow.getFullYear();
				var month = datenow.getMonth()+1
				var date =  datenow.getDate()

				var monthCurr = month < 10? '0'+month : month;
				var dateCurr = date < 10? '0'+date : date;
				$('#date_timepicker_start').val(year+'-'+monthCurr+'-'+dateCurr)
				$('#date_timepicker_end').val(year+'-'+monthCurr+'-'+dateCurr)

				var gameName = $('.range-disp.betlogs').attr('game');
				var startDate = year+'-'+month+'-'+date;
				var endDate = year+'-'+month+'-'+date;
				var searchId = '';
				var timeZone = -(-(new Date().getTimezoneOffset() / 60));

				console.log("gameName",gameName, startDate, endDate);

				if (!$(e.currentTarget).hasClass('menu-toggled')) {
					$('#modalResult').hide();
					$('.modal-body-betlogs').show();

					// bet_records.initRecords('betlogs', $('.range-disp.betlogs').attr('game'));
					bet_records.initRecords('betlogs', gameName, startDate, endDate, searchId, timeZone);
					// self.eventListener.links.baccaratlogs
				}

			}

			if(elementAttr == 'howtoplay') {
				$('.range-disp.howtoplay').html(window.language2.lobby_gamename_baccarat);
				if(window.language2.locale == "th") {
					$(".payoutbankerwin").css('font-size', '14px');
				} else {
					$(".payoutbankerwin").css('font-size', '');
				}
				for(let e = 0; e < arrayElement.length; e++) {
					$(".howto-contents").scrollTop(0);
					$('a[href*="#"]').on("mouseover", function() {
						$('html,body').css('cursor','pointer');
					});
					$('a[href*="#"]').click(function() {
						if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
							var target = $(this.hash);
							target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
							var scale = $(""+arrayElement[e]+" #top")[0].getBoundingClientRect().width / $(""+arrayElement[e]+" #top").width();
							// var scale = $(`${arrayElement[e]} #top`)[0].getBoundingClientRect().width / $(`${arrayElement[e]} #top`).width();
							var topPosition = $(this).attr('href') == '#game-objective' ? topPosition = 0 : ((target.position().top / scale) + $(""+arrayElement[e]+" .howto-contents").scrollTop()) + 5;
							// var topPosition = $(this).attr('href') == '#game-objective' ? topPosition = 0 : ((target.position().top / scale) + $(`${arrayElement[e]} .howto-contents`).scrollTop()) + 5;
							if (target.length) {
								// $(`${arrayElement[e]} .howto-contents`).animate({
								$(""+arrayElement[e]+" .howto-contents").animate({
									scrollTop: topPosition
								}, 500);
								return false;
							}
						}
					});
				}
			}

			if ($(e.currentTarget).hasClass('menu-toggled')) {
				toggle.toggleModalMenu(elementAttr, false);
				$(e.target).removeClass('active');
			} else {
				var currentOpen = $('.menu-toggled').attr('value');
				toggle.toggleModalMenu(currentOpen, false);
				toggle.toggleModalMenu(elementAttr, true);
			}
		});
	}


}

main.run();
main.domEvents();

createjs.Ticker.framerate = 45;
createjs.Ticker.addEventListener('tick', (e) => {
	for(var x = 0; x < main.games.length; x++) {

		if(main.games[x].timer_stage.tickEnabled) {
			main.games[x].timer_stage.update();
		}

		if(main.games[x].stage.tickEnabled && !main.games[x].override) {
			main.games[x].stage.update();
		}

	}
});
