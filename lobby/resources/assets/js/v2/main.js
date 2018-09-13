import '../boot-mobile';
import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';
import {loadproc as load} from './loadquee.js';
import {instance} from './frmsocket.js';
import {toggle} from './toggleHandler.js';
import {component_header} from './header.js';
import {component_landing} from './main-landing.js';
import {component_reelgames} from './reelgames.js';
import {component_baccarat} from './baccarat.js';
import {component_dragonTiger} from './dragontiger.js';
import {component_sicbo} from './sicbo.js';
import {component_poker} from './poker.js';
import {component_paigow} from './paigow.js';
import {component_bethistory} from './popup-bethistory.js';
import {component_transaction} from './popup-transaction.js';
import {component_settings} from './popup-settings.js';
import {component_notification} from './popup-notification.js';
import {component_confirmation} from './popup-logout.js';
import {component_session} from './popup-session.js';
import {component_howtoplay} from './howtoplay.js';
import {component_userbased} from './userbased.js';
import {component_createroom} from './popup-createroom.js';

$(".wrapper").hide()

function getOS() {
  var userAgent        = window.navigator.userAgent,
      platform         = window.navigator.platform,
      macosPlatforms   = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms     = ['iPhone', 'iPad', 'iPod'],
      os               = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'MacOS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }
  return os;
};

let resize = function(newWidth, newHeight) {

	var baseRatio = 1920 / 1080,
			newRatio =  newWidth / newHeight;

	var w = window.innerWidth,
		  h = window.innerHeight;

	var devicePixelRatio = window.devicePixelRatio;

	if (getOS() == "Android") {
		if (w > 1440) {
			w = window.innerWidth / devicePixelRatio;
			h = window.innerHeight / devicePixelRatio;
		} else {
			w = window.innerWidth;
			h = window.innerHeight;
		}
	} else {
		w = window.innerWidth;
		h = window.innerHeight;
	}

	if(newRatio > baseRatio) {
		newWidth = newHeight * baseRatio;
	} else {
		newHeight = newWidth / baseRatio;
	}

	if (window.nonInstall) {
	  if (w < h && window.matchMedia("(orientation: portrait)").matches) {
	    $('#SUPER-CONTAINER').css({
	      'transform': 'rotate(90deg) scale('+((h / 1280) )+')'
	    })
	  } else if (w < 992  && window.matchMedia("(orientation: landscape)").matches) {
	    if(window.screen.height == 412 && window.screen.width == 846) {
	      $('#SUPER-CONTAINER').css({
	        'transform': 'scale('+(((w - 105)/ 1280) )+')'
	      })
	    } else {
	      $('#SUPER-CONTAINER').css({
	        'transform': 'scale('+((w/ 1280) )+')'
	      })
	    }

	  }  else {
	    $('#SUPER-CONTAINER').css({
	      'transform': 'scale('+((newWidth / 1280) )+')'
	    })
	  }
	} else {
	  $('#SUPER-CONTAINER').css({
	    'transform': 'scale('+((newWidth / 1280) )+')'
	  })
	}
};

let main = {
	load : load,
	instance : instance,
	toggle : toggle,
	component_header :component_header,
	component_landing:component_landing,
	component_reelgames:component_reelgames,
	component_baccarat : component_baccarat,
	component_dragonTiger : component_dragonTiger,
	component_sicbo : component_sicbo,
	component_poker : component_poker,
	component_paigow : component_paigow,
	component_bethistory : component_bethistory,
	component_transaction : component_transaction,
	component_settings : component_settings,
	component_notification : component_notification,
	component_confirmation : component_confirmation,
	component_session : component_session,
	component_howtoplay : component_howtoplay,
	component_userbased : component_userbased,
	component_createroom : component_createroom,
	imgSrc1 : '',
	imgSrc2 : '',
	run () {
		$.get('/kaga/list', {}, (response)=> {
			ka_games = response.games;

			let randomKaGame1 = this.setRandom(ka_games);
			this.imgSrc1 = 'https://rmpiconcdn.kaga88.com/kaga/gameIcon?game='+randomKaGame1.gameId+'&lang=en&type=square';

			let randomKaGame2 = this.setRandom(ka_games);
			if (randomKaGame1.gameId == randomKaGame2.gameId) randomKaGame2 = this.setRandom(ka_games);
			this.imgSrc2 = 'https://rmpiconcdn.kaga88.com/kaga/gameIcon?game='+randomKaGame2.gameId+'&lang=en&type=square';
		});

		instance.context = this;
		component_header.context = this;
		component_landing.context = this;
		component_reelgames.context = this;
		component_baccarat.context = this;
		component_dragonTiger.context = this;
		component_sicbo.context = this;
		component_poker.context = this;
		component_paigow.context = this;
		component_bethistory.context = this;
		component_transaction.context = this;
		component_settings.context = this;
		component_notification.context = this;
		component_confirmation.context = this;
		component_session.context = this;
		component_howtoplay.context = this;
		component_userbased.context = this;
		component_createroom.context = this;
		load.context = this;
		toggle.context = this;
		this.load.main()

        if (window.vendorData.lobby_type == 'exit') {
            $('.header-logout-mb').remove();
        }

		// === Session handling
		var timeCount;
		var countdownTime = 1800; // (30mins -> 1800)
		const startTimer = () => {
		  function timer() {
		    countdownTime--;

		    if (countdownTime <= 0) {
		      clearInterval(timeCount);
		      $("#popup-session").show();

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
	setRandom(data) {
		let random = data[Math.floor(Math.random()*data.length)];
		return random;
	},
	setNotice(data) {
		let maintenanceData = [];
		if (typeof data.content == 'string') {
			maintenanceData = JSON.parse(data.content)[window.language.locale];
		}

		if(window.language.locale == "zh") {
			if (typeof data.content == 'string') {
				maintenanceData = JSON.parse(data.content)["cn"];
			}
		}

		let maintenanceDataText = new createjs.Text(maintenanceData, '25px lato', '#fff');

		if (parseInt(data.status) === 1) {
			$(".announcement").addClass("active");
			$(".announcement__msg > div").css({"width" :  maintenanceDataText.getBounds().width});
			$(".announcement__msg > div span").append(maintenanceData);
		}
		else {
			$(".announcement").removeClass("active");
			window.all_tables[0].mainNotice.status = 0;
		}
	},
	main () {
		// if(!this.getUrlParameter('game')) {
			// playSound('welcome')
		// }
		
		if (parseInt(JSON.parse(window.maintenance).status)) {
			if(window.userAuthority == "admin") {
			  this.playWelcome();
			}
		} else {
			this.playWelcome();
		}

		// this.component_landing.main();
		this.component_landing.setUser();
		this.component_bethistory.main()
		this.component_transaction.main()
		this.component_settings.main()
		this.component_notification.main()
		this.component_confirmation.main()
		this.component_session.main()
		this.component_howtoplay.main()
		this.component_header.main()
		this.component_reelgames.main()
		component_createroom.main();
		// this.toggle.main();
	},
	playWelcome() {
		// === for detecting ios or android
    function getOS() {
      var userAgent        = window.navigator.userAgent,
      platform         = window.navigator.platform,
      macosPlatforms   = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms     = ['iPhone', 'iPad', 'iPod'],
      os               = null;

      if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'MacOS';
      } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
      } else if (/Android/.test(userAgent)) {
        os = 'Android';
      } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
      }
      return os;
    }

		if (getOS() == "iOS" && window.nonInstall) {
      $('#popup-enable-sound').show();
      $('#popup-enable-sound').off().on('click', () => {
        $('#popup-enable-sound').hide();
        window.config.effect = 1;
        playSound("welcome");

        createjs.Tween.get(this.component_settings.settingsToggleHit[0].settingsCircle, { loop: false })
					.to({ x: this.component_settings.settingsToggleHit[0].settingsToggle.x + 78 }, 100)

				this.component_settings.settingsToggleHit[0].settingsToggle.graphics.clear().beginFill("#fff").drawRoundRect(0, 0, 100, 40, 20);
				this.component_settings.settingsToggleHit[0].settingsCircle.graphics.clear().beginFill("#2e7d32").drawCircle(0, 0, 18);
				this.component_settings.settingsToggleHit[0].status = "enabled";

				$.post("/settings", {effect : 1}, (response) => { });
      });
    } else {
      playSound("welcome");
    }
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
}

main.run();

resize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
	resize(window.innerWidth, window.innerHeight);

	if (window.nonInstall) {
		for(var x = 0; x < component_baccarat.timer_stage.length; x++) {
			if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
				component_baccarat.timer_stage[x].regX =  5;
				component_baccarat.timer_stage[x].regY =  272;
				component_baccarat.timer_stage[x].rotation = 90;
			} else {
				component_baccarat.timer_stage[x].regX =  0;
				component_baccarat.timer_stage[x].regY =  0;
				component_baccarat.timer_stage[x].rotation = 0;
			}
		} //baccarat
		for(var x = 0; x < component_dragonTiger.dt_stage.length; x++) {
			if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
				component_dragonTiger.dt_stage[x].regX =  -10;
				component_dragonTiger.dt_stage[x].regY =  280;
				component_dragonTiger.dt_stage[x].rotation = 90;
			} else {
				component_dragonTiger.dt_stage[x].regX =  0;
				component_dragonTiger.dt_stage[x].regY =  0;
				component_dragonTiger.dt_stage[x].rotation = 0;
			}
		} //dragon-tigercap

		for(var x = 0; x < component_sicbo.sicbo_stage.length; x++) {
			if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
				component_sicbo.sicbo_stage[x].regX =  -10;
				component_sicbo.sicbo_stage[x].regY =  280;
				component_sicbo.sicbo_stage[x].rotation = 90;
			} else {
				component_sicbo.sicbo_stage[x].regX =  0;
				component_sicbo.sicbo_stage[x].regY =  0;
				component_sicbo.sicbo_stage[x].rotation = 0;
			}
		} //sicbo

		for(var x = 0; x < component_poker.poker_stage.length; x++) {
			if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
				component_poker.poker_stage[x].regX =  -10;
				component_poker.poker_stage[x].regY =  280;
				component_poker.poker_stage[x].rotation = 90;

			} else {
				component_poker.poker_stage[x].regX =  0;
				component_poker.poker_stage[x].regY =  0;
				component_poker.poker_stage[x].rotation = 0;
			}
		} //poker

		for(var x = 0; x < component_paigow.paigow_stage.length; x++) {
			if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
				component_paigow.paigow_stage[x].regX =  -10;
				component_paigow.paigow_stage[x].regY =  280;
				component_paigow.paigow_stage[x].rotation = 90;

			} else {
				component_paigow.paigow_stage[x].regX =  0;
				component_paigow.paigow_stage[x].regY =  0;
				component_paigow.paigow_stage[x].rotation = 0;
			}
		} //paigow

		for(var x = 0; x < component_userbased.room_stage.length; x++) {
			if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
				component_userbased.room_stage[x].regX =  0;
				component_userbased.room_stage[x].regY =  104;
				component_userbased.room_stage[x].rotation = 90;
			} else {
				component_userbased.room_stage[x].regX = 0;
				component_userbased.room_stage[x].regY =  0;
				component_userbased.room_stage[x].rotation = 0;
			}
		} // userbased

		if(component_landing.stage){
			if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
				component_landing.stage.regX = 2;
				component_landing.stage.regY = 610;
				component_landing.stage.rotation = 90;
			} else {
				component_landing.stage.regX = 0;
				component_landing.stage.regY = 0;
				component_landing.stage.rotation = 0;
			}
		}

		if(component_bethistory.stage){
			if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
				component_bethistory.stage.regX =  0;
				component_bethistory.stage.regY =  1199;
				component_bethistory.stage.rotation = 90;
			} else {
				component_bethistory.stage.regX =  0;
				component_bethistory.stage.regY =  0;
				component_bethistory.stage.rotation = 0;
			}
		}

		if(component_transaction.stage){
			if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
				component_transaction.stage.regX =  0;
				component_transaction.stage.regY =  1199;
				component_transaction.stage.rotation = 90;
			} else {
				component_transaction.stage.regX =  0;
				component_transaction.stage.regY =  0;
				component_transaction.stage.rotation = 0;
			}
		}

		if(component_settings.stage){
			if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
				component_settings.stage.regX =  0;
				component_settings.stage.regY =  800;
				component_settings.stage.rotation = 90;
			} else {
				component_settings.stage.regX =  0;
				component_settings.stage.regY =  0;
				component_settings.stage.rotation = 0;
			}
		}
		if(component_howtoplay.stage){
			if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
				component_howtoplay.stage.regX =  0;
				component_howtoplay.stage.regY =  778;
				component_howtoplay.stage.rotation = 90;
			} else {
				component_howtoplay.stage.regX =  0;
				component_howtoplay.stage.regY =  0;
				component_howtoplay.stage.rotation = 0;
			}
		}
		if(component_userbased.game_stage) {
			if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
				component_userbased.game_stage.regX =  0;
				component_userbased.game_stage.regY =  530;
				component_userbased.game_stage.rotation = 90;
			} else {
				component_userbased.game_stage.regX = 0;
				component_userbased.game_stage.regY =  0;
				component_userbased.game_stage.rotation = 0;
			}
		}
	}


}) //RESIZE

createjs.Ticker.framerate = 60;

// var no_update_c = false;
// $(".tables-container.bc-tables").on("scroll", function() {
// 	no_update_c = true;
// })

//  $.fn.scrollEnd = function(callback, timeout) {
//   $(this).scroll(function(){
//     var $this = $(this);
//     if ($this.data('scrollTimeout')) {
//       clearTimeout($this.data('scrollTimeout'));
//     }
//     $this.data('scrollTimeout', setTimeout(callback,timeout));
//   });
// };

// $(".tables-container.bc-tables").scrollEnd(function(){
// 	no_update_c = false;
// },500);

createjs.Ticker.addEventListener("tick",function (e) {
	component_header.stage.update(e)
	for(var x = 0; x < component_baccarat.baccarat_stage.length; x++) {
		// if(!no_update_c) {
		// 	// component_baccarat.baccarat_stage[x].update(e)
		// }
		if(component_baccarat.baccarat_stage[x].isUpdate) {
			component_baccarat.baccarat_stage[x].update(e);
		}
		component_baccarat.timer_stage[x].update(e)
	}

	for(var x = 0; x < component_dragonTiger.dt_stage.length; x++) {
		component_dragonTiger.dt_stage[x].update(e)
	}
	for(var x = 0; x < component_sicbo.sicbo_stage.length; x++) {
		component_sicbo.sicbo_stage[x].update(e)
	}
	for(var x = 0; x < component_poker.poker_stage.length; x++) {
		component_poker.poker_stage[x].update(e)
	}
	for(var x = 0; x < component_paigow.paigow_stage.length; x++) {
		component_paigow.paigow_stage[x].update(e)
	}
	for(var x = 0; x < component_userbased.room_stage.length; x++) {
		component_userbased.room_stage[x].update(e)
	}
	if(component_bethistory.stage){
		component_bethistory.stage.update(e)
	}

	if(component_transaction.stage){
		component_transaction.stage.update(e)
	}

	if(component_settings.stage){
		component_settings.stage.update(e)
	}
	if(component_confirmation.stage){
		component_confirmation.stage.update(e)
	}
	if(component_session.stage){
		component_session.stage.update(e)
	}
	if(component_howtoplay.stage){
		component_howtoplay.stage.update(e)
	}
	if(component_userbased.game_stage) {
		component_userbased.game_stage.update(e)
	}
	if(component_createroom.stage) {
		component_createroom.stage.update(e)
	}
	// component_landing.stage.update(e)
});
