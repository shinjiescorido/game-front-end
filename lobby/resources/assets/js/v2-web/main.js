import '../boot';
import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';
import scrollbar from '../factories/scrollbar';

import {loadproc as load} from './loadqueue.js';
import {instance} from './frmsocket.js';
import {toggle} from './toggleHandler.js';
import {component_landing} from './main-landing.js';
import {component_reelgames} from './reelgames.js';
import {component_baccarat} from './baccarat.js';
import {component_dragonTiger} from './dragontiger.js';
import {component_sicbo} from './sicbo.js';
import {component_poker} from './poker.js';
import {component_paigow} from './paigow.js';
import {component_banner} from './banner.js';

import {component_settings} from './popup-settings.js';
import {component_transaction} from './popup-transaction.js';
import {component_bethistory} from './popup-bethistory.js';
import {component_howtoplay} from './howtoplay.js';
import {component_notification} from './popup-notification.js';
import {component_confirmation} from './popup-logout.js';
import {component_session} from './popup-session.js';
import {component_createroom} from './popup-createroom.js';
import {component_userbased} from './userbased.js';
import {component_language} from './popup-language.js';

let main = {
	baseWidth : 1920,
	baseHeight : 1080,
	load : load,
	toggle : toggle,
	instance : instance,
	component_baccarat : component_baccarat,
	component_landing : component_landing,
	component_reelgames : component_reelgames,
	component_dragonTiger : component_dragonTiger,
	component_sicbo : component_sicbo,
	component_poker : component_poker,
	component_paigow : component_paigow,
	component_banner : component_banner,
	component_howtoplay : component_howtoplay,
	component_notification : component_notification,
	component_bethistory : component_bethistory,
	component_transaction : component_transaction,
	component_confirmation : component_confirmation,
	component_session : component_session,
	component_settings : component_settings,
	component_createroom : component_createroom,
	component_userbased : component_userbased,
	component_language : component_language,
	lobby_scrollbar : scrollbar(),
	run () {
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

			if(window.reel_yn != 2) {
				$(".hotgame-wrap.clearfix").append(
					"<div class='hotgame__con hot--reel "+reelaccess+"' data='kagaming'>"
						+"<div class='hotgame__name'><span>"+window.language.lobby.kagamingreelcaps+"</span></div>"
							+"<div class='hotgame__thumbnail thumb-kagaming'>"
							+"<div class='hotgame--img-wrap'><img src='"+imgSrc1+"' alt='' style='height: 100%;'></div>"
						+"</div>"
					+"</div>"
				)
			}
    	this.toggle.registerClick();
		});

		this.resize(window.innerWidth, window.innerHeight);
		window.addEventListener("resize", () => {
			this.resize(window.innerWidth, window.innerHeight);
		});

		this.load.main();
		load.context = this;
		toggle.context = this;
		instance.context = this;
		component_landing.context = this;
		component_baccarat.context = this;
		component_reelgames.context = this;
		component_dragonTiger.context = this;
		component_sicbo.context = this;
		component_poker.context = this;
		component_paigow.context = this;
		component_banner.context = this;
		component_howtoplay.context = this;
		component_notification.context = this;
		component_bethistory.context = this;
		component_transaction.context = this;
		component_confirmation.context = this;
		component_session.context = this;
		component_settings.context = this;
		component_createroom.context = this;
		component_userbased.context = this;
		component_language.context = this;

		// === Session handling
		var timeCount;
		var countdownTime = 1800; // (30mins -> 1800)
		const startTimer = () => {
		  function timer() {
		    countdownTime--;

		    if (countdownTime <= 0) {
		      clearInterval(timeCount);
		      toggle.togglePopups("session");

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
	setNotice(data) {
		// Update notice setting
		for (var i = 0; i < window.all_tables.length; i++) {
			window.all_tables[i].mainNotice.status = data.status;
		}

		let maintenanceData = [];
		if (typeof data.content == 'string') {
			maintenanceData = JSON.parse(data.content)[window.language.locale];
		}

		if (window.language.locale == "zh") {
			if (typeof data.content == 'string') {
				maintenanceData = JSON.parse(data.content)["cn"];
			}
		}

  		let maintenanceDataText = new createjs.Text(maintenanceData, '25px lato', '#fff');

  		if (parseInt(data.status) === 1) {
			$(".announcement").addClass("active");
			$(".announcement__msg > div").css({"width" :  maintenanceDataText.getBounds().width});
			$(".announcement__msg > div span").append(maintenanceData);

			if ($('#livegames').hasClass('active')) {
				$(".announcement").addClass("innerpage");
			}

			$('#lobby').click(function() {
				$(".announcement").removeClass("innerpage").addClass("active");
			});

			$('#reelgames, .game__con.game--reelgames').click(function() {
				if (!window.reel_yn) return;
				$(".announcement").removeClass("active");
			});

			$('#livegames, .game__con.game--livegames').click(function() {
				$(".announcement").addClass("innerpage");
			});
		}
		else {
    		if (!parseInt(window.all_tables[0].mainNotice.status)) {
				$(".announcement").removeClass("active");
			}

			$('#lobby').click(function() {
				$(".announcement").removeClass("innerpage").removeClass("active");
			});

			$('#reelgames, .game__con.game--reelgames').click(function() {
				$(".announcement").removeClass("active");
			});

			$('#livegames, .game__con.game--livegames').click(function() {
				$(".announcement").removeClass("active");
			});
		}
	},
	main () {
		// if(!this.getUrlParameter('game')) {
			// playSound('welcome')
		// }

		if (parseInt(JSON.parse(window.maintenance).status)) {
			if(window.userAuthority == "admin") {
			    playSound('welcome');
			}
		} else {
			playSound('welcome')
		}

		// component_landing.main();
		component_landing.setUser();
		component_landing.setTimeDate();
		component_banner.main();
		component_reelgames.main();
		component_howtoplay.main();
		component_notification.main();
		component_bethistory.main();
		component_transaction.main();
		component_confirmation.main();
		component_session.main();
		component_settings.main();
		component_createroom.main();
		component_language.main();
		// this.toggle.main();
	},
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
	resize (newWidth, newHeight) {
		var baseRatio = this.baseWidth / this.baseHeight,
			newRatio = newWidth / newHeight;

		if(newRatio > baseRatio) {
			newWidth = newHeight * baseRatio;
		} else {
			newHeight = newWidth / baseRatio;
		}
		//landing scaling and etc
		component_landing.stage.width = newWidth;
		component_landing.stage.height = newHeight;
		// component_landing.stage.scaleX = component_landing.stage.scaleY =  newWidth / this.baseWidth

		$(".container").css({
        width:newWidth , height: newHeight
    });

    $(".canvas-container").css({
        width:newWidth , height: newHeight
    });

    // $(".main-container").css({
    //     width:newWidth - (newWidth/7.8)  , height: newHeight - (newHeight/3.2)
    // });

    // $(".hot-container").css({
    //     width:newWidth - (newWidth/3.6)
    // });

    // $(".dom-resizable").css({
    //     transform: "scale(" + (newWidth / newHeight) + ")"
    // });

    $(".wrapper").css({
        width:newWidth , height: newHeight
    });

    // $(".wrapper--outer").css({
    //     transform: "scale(" + (newWidth / newHeight) + ") "
    // });

		$(".dom-resizable").css({
    	transform: "scale(" + (newWidth / this.baseWidth) + ")"
		});

		$(".wrapper--outer").css({
    	transform: "scale(" + (newWidth / this.baseWidth) + ") "
		});
	}
}

main.run();

createjs.Ticker.framerate = 60;
createjs.Ticker.addEventListener('tick', (e) => {
	if(component_landing.stage) {
		component_landing.stage.update(e)
	}

	if(component_landing.hot_stages.length) {
		if(component_landing.hot_stages[0].is_hover || component_landing.hot_stages[0].is_tween) {
			component_landing.hot_stages[0].update(e)
		}
		if(component_landing.hot_stages[1].is_hover || component_landing.hot_stages[1].is_tween) {
			component_landing.hot_stages[1].update(e)
		}
		if(component_landing.hot_stages[2].is_hover || component_landing.hot_stages[2].is_tween) {
			component_landing.hot_stages[2].update(e)
		}
		if(component_landing.hot_stages[3] && (component_landing.hot_stages[3].is_hover || component_landing.hot_stages[3].is_tween)) {
			component_landing.hot_stages[3].update(e)
		}
	}
	for(var x = 0; x < component_baccarat.stage_thumb.length; x++) {
		component_baccarat.stage_thumb[x].update(e)
	}
	for(var x = 0; x < component_baccarat.stage_list.length; x++) {
		if(component_baccarat.stage_list[x].isUpdate) {
			component_baccarat.stage_list[x].update(e)
		}
		component_baccarat.timer_stage[x].update(e)
	}

	for(var x = 0; x < component_dragonTiger.stage_list.length; x++) {
		component_dragonTiger.stage_list[x].update(e)
	}

	for(var x = 0; x < component_sicbo.stage_list.length; x++) {
		component_sicbo.stage_list[x].update(e)
	}
	for(var x = 0; x < component_poker.stage_list.length; x++) {
		component_poker.stage_list[x].update(e)
	}
	for(var x = 0; x < component_paigow.stage_list.length; x++) {
		component_paigow.stage_list[x].update(e)
	}
	for(var x = 0; x < component_userbased.stage_list.length; x++) {
		component_userbased.stage_list[x].update(e)
	}
	if(component_banner.stage) {
		component_banner.stage.update(e)
	}

	if(component_howtoplay.stage) {
		// component_howtoplay.stage.update(e)
	}
	if(component_landing.announcementStage) {
		component_landing.announcementStage.update(e)
	}

	if(component_bethistory.stage) {
		component_bethistory.stage.update(e)
	}
	if(component_transaction.stage) {
		component_transaction.stage.update(e)
	}
	if(component_confirmation.stage) {
		component_confirmation.stage.update(e)
	}
	if(component_session.stage) {
		component_session.stage.update(e)
	}
	if(component_settings.stage) {
		component_settings.stage.update(e)
	}
	if(component_createroom.stage) {
		component_createroom.stage.update(e)
	}
	if(component_language.stage) {
		component_language.stage.update(e)
	}
})
