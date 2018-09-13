
import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';

var self  =  null;
let current_open = 'main';
let current_state = 'thumbnail';
toggle = {
	main () {
		self = this.context;
	},
	getCurrentOpen() {
		return current_open;
	},
	hideBanner () {
		// hiding banner
		self.component_banner.banner_container.visible = true;
		self.component_banner.table_banner_container.removeAllChildren()
		self.component_banner.userBased_banner_container.removeAllChildren()
		self.component_banner.currentSelected = null;
	},
	hideAll () {
		$("#popup-howto").hide();
		$("#popup-history").hide();

		$("#bet-history").hide();
		$("#trans-history").hide();
		$("#popup-settings").hide();
		$("#popup-language").hide();
		$(".tables-container").hide();
		// $(".header-subnav").hide();
		$(".header-subnav.language").hide();

		$(".table-thumbnail").hide();
		$(".table-list").hide();

		let arrayElement = ["#sicbo-toggle","#poker-toggle","#baccarat-toggle","#dragontiger-toggle","#paigow-toggle","#red-white-toggle","#bigwheel-toggle","#roulette-toggle"];

		arrayElement.forEach((e) => {
			$(e).hide();
		});

		let components = ['component_dragonTiger','component_baccarat', 'component_poker', 'component_sicbo'];

		if(self.component_baccarat.stage_thumb.length) {
			self.component_baccarat.stage_thumb.forEach((e) =>{
				e.removeAllChildren();
			});
		}


		for(var x = 0; x < components.length; x++) {
			if(self[components[x]].stage_list.length) {
				self[components[x]].stage_list.forEach((e) =>{
					e.removeAllChildren();
				});
			}
		}

		this.hideBanner();
	},
	open_popup : null,
	togglePopups (type) {
		let timeout = 0;

		let arrayElement = [
			"#sicbo-toggle",
			"#poker-toggle",
			"#baccarat-toggle",
			"#dragontiger-toggle",
			"#paigow-toggle",
			"#red-white-toggle",
			"#bigwheel-toggle",
			"#roulette-toggle"
		];

		arrayElement.forEach((e) => {
			$(e).hide();
		});

		let numofPopupHeader = $('.lobby-popup-con__header .popup-name');
		let numofPopupBody = $('.lobby-popup-con__body .popup-name');
		let removePopupname = $(".lobby-popup-con .ico-not").attr('class').split(" ")[2];

		$(".lobby-popup-con .ico-not").removeClass(removePopupname);
		$(".lobby-popup-con .ico-not").addClass(type);

		for(let a = 0; a < numofPopupHeader.length; a++) {
			let popupNameHeader = numofPopupHeader[a].className.split(" ")[0];
			if(popupNameHeader == type) {
				$(numofPopupHeader[a]).css('display', 'block');
				$(numofPopupBody[a]).css('display', 'block');
			} else {
				$(numofPopupHeader[a]).hide();
				$(numofPopupBody[a]).hide();
			}
		}

		if(this.open_popup && this.open_popup != type) {
			$(".lobby-popup-con").animate({
				top: '-100%',
				opacity : 0
			}, 100)
			setTimeout(() => {
				$("#popup-howto").hide();
				$("#popup-history").hide();
				$("#trans-history").hide();
				$("#popup-logout").hide();
				$("#popup-settings").hide();
				$("#popup-language").hide();
				$(".header-subnav.language").hide();
				$(".popup-container").removeClass("isShow");
				$(".lobby-popup-con").removeClass("isShow");
			}, 100)
			timeout = 200
		}

		setTimeout ( () => {
			if(type == "howtoplay") {
				if(!$('.lobby-popup-con').hasClass('isShow')) {
					$(".lobby-popup-con").animate({
						top: '7%',
						opacity : 1
					}, 200)

					$('#howtoplay, .popup-bg').addClass('active');

					for(let e = 0; e < arrayElement.length; e++) {
						$(".howto-contents").scrollTop(0);
						$('a[href*="#"]').on("mouseover", () => {
							$('html,body').css('cursor','pointer');
						});
						$('a[href*="#"]').click(function() {
							if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
								var target = $(this.hash);
								target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
								var scale = $(`${arrayElement[e]} #top`)[0].getBoundingClientRect().width / $(`${arrayElement[e]} #top`).width();
								var topPosition = $(this).attr('href') == '#game-objective' ? topPosition = 0 : ((target.position().top / scale) + $(`${arrayElement[e]} .howto-contents`).scrollTop()) + 20;
								if (target.length) {
									$(`${arrayElement[e]} .howto-contents`).animate({
										scrollTop: topPosition
									}, 500);
									return false;
								}
							}
						});
					}

					setTimeout(() => {
						$(".lobby-popup-con").addClass("isShow");
						$(`#${$(".howtoplay_games").val()}`).show();
						$('.howtoplay_games').change(function(){
							let selected = `#${$(this).val()}`;
							arrayElement.forEach((e) => {
								if(selected == e) {
									$(e).show();
								} else {
									$(e).hide();
								}
							});
							// self.component_howtoplay.openRulesPage();
						});
					}, 200)

					$(".lobby-popup-con").show()
				} //end if show
				else {
					let arrayElement = ["#sicbo-toggle","#poker-toggle","#baccarat-toggle","#dragontiger-toggle","#paigow-toggle","#red-white-toggle","#bigwheel-toggle","#roulette-toggle"];

					arrayElement.forEach((e) => {
						$(e).hide();
					});

					$(".lobby-popup-con").animate({
						top: '-100%',
						opacity : 0
					}, 200)

					setTimeout(() => {
						$("#popup-howto").hide();
						$(".lobby-popup-con").removeClass("isShow");
						$( ".popup-bg, .menu__items" ).removeClass('active');
						$(".lobby-popup-con").hide();
						$(".lobby-popup-con .ico-not").removeClass(type);
					}, 200)
				} // end else !show
			} // end if howtoplay

			if(type == 'bethistory') {
				if(!$('.lobby-popup-con').hasClass('isShow')) {
					$(".lobby-popup-con").animate({
						top: '7%',
						opacity : 1
					}, 200)

					// $("#popup-history").show();
					$('#bethistory, .popup-bg').addClass('active');
					$(".lobby-popup-con").show()
					self.component_bethistory.initRecords("BACCARAT");

					setTimeout(() => {
						$(".lobby-popup-con").addClass("isShow");
					}, 200)
				} //end if show
				else {
					$(".lobby-popup-con").animate({
						top: '-50%',
						opacity : 0
					}, 200)

					setTimeout(() => {
						$("#popup-history").hide();
						$(".lobby-popup-con").removeClass("isShow");
						$( ".popup-bg, .menu__items" ).removeClass('active');
						$(".lobby-popup-con").hide()
						$(".lobby-popup-con .ico-not").removeClass(type);
					}, 200)
				} // end else !show
			}

			if(type == 'transactions') {
				if(!$('.lobby-popup-con').hasClass('isShow')) {
					$(".lobby-popup-con").animate({
						top: '7%',
						opacity : 1
					}, 200)

					$("#trans-history").show();
					$('#transactions, .popup-bg').addClass('active');
					$(".lobby-popup-con").show()
					self.component_transaction.initRecords();

					setTimeout(() => {
						$(".lobby-popup-con").addClass("isShow");
					}, 200)
				} //end if show
				else {
					$(".lobby-popup-con").animate({
						top: '-50%',
						opacity : 0
					}, 200)

					setTimeout(() => {
						$("#trans-history").hide();
						$(".lobby-popup-con").removeClass("isShow");
						$( ".popup-bg, .menu__items" ).removeClass('active');
						$(".lobby-popup-con").hide()
						$(".lobby-popup-con .ico-not").removeClass(type);
					}, 200)
				} // end else !show
			}

			if(type == 'logout') {
				if(!$('.popup-container').hasClass('isShow')) {
					$(".popup-container").animate({
						top: '0%',
						opacity : 1
					}, 200)

					$("#popup-logout").show();
					$('.popup-bg').addClass('active');
					$(".popup-container").show()

					setTimeout(() => {
						$(".popup-container").addClass("isShow");
					}, 200)
				} //end if show
				else {
					$(".popup-container").animate({
						top: '-50%',
						opacity : 0
					}, 200)
					setTimeout(() => {
						$("#popup-logout").hide();
						$(".popup-container").removeClass("isShow");
						$(".popup-container").hide();
						$( ".popup-bg" ).removeClass('active');
					}, 200)
				} // end else !show
			}

			if(type == 'session') {
				if(!$('.popup-container').hasClass('isShow')) {
					$(".popup-container").animate({
						top: '0%',
						opacity : 1
					}, 200)

					$("#popup-session").show();
					$('.popup-bg').addClass('active');
					$(".popup-container").show()

					setTimeout(() => {
						$(".popup-container").addClass("isShow");
					}, 200)
				} //end if show
				else {
					$(".popup-container").animate({
						top: '-50%',
						opacity : 0
					}, 200)
					setTimeout(() => {
						$("#popup-session").hide();
						$(".popup-container").removeClass("isShow");
						$(".popup-container").hide();
						$( ".popup-bg" ).removeClass('active');
					}, 200)
				} // end else !show
			}

			if(type == 'settings') {
				if(!$('.lobby-popup-con').hasClass('isShow')) {
					$(".lobby-popup-con").animate({
						top: '7%',
						opacity : 1
					}, 200)

					$("#popup-settings").show();
					$('#settings, .popup-bg').addClass('active');
					$(".lobby-popup-con").show();

					setTimeout(() => {
						$(".lobby-popup-con").addClass("isShow");
					}, 200)
				} //end if show
				else {
					$(".lobby-popup-con").animate({
						top: '-50%',
						opacity : 0
					}, 200)
					setTimeout(() => {
						$("#popup-settings").hide();
						$(".lobby-popup-con").removeClass("isShow");
						$( ".popup-bg, .menu__items" ).removeClass('active');
						$(".lobby-popup-con").hide();
						$(".lobby-popup-con .ico-not").removeClass(type);
					}, 200)
				} // end else !show

				//rangeSlider
				$('input[type="range"]').on('mouseup', function() {
					this.blur();
				}).on('mousedown input', function() {
					styl.inject('input[type=range]:focus::-webkit-slider-thumb:after, input[type=range]:focus::-ms-thumb:after, input[type=range]:focus::-moz-range-thumb:after', {content: "'"+this.value+"'"}).apply();
				});

			}

			if(type == 'createroom') {
				if(!$('.popup-container').hasClass('isShow')) {
					this.context.component_createroom.main(self.instance.roomTables);
					$(".popup-container").animate({
						top: '0',
						opacity : 1
					}, 200)

					$("#popup-createroom").show();
					$('.popup-bg').addClass('active');
					$(".popup-container").show();

					setTimeout(() => {
						$(".popup-container").addClass("isShow");
					}, 200)
				} //end if show
				else {
					$(".popup-container").animate({
						top: '-50%',
						opacity : 0
					}, 200)
					setTimeout(() => {
						$("#popup-createroom").hide();
						$(".popup-container").removeClass("isShow");
						$( ".popup-bg, .menu__items" ).removeClass('active');
						$(".popup-container").hide();
					}, 200)
				} // end else !show
			} //createroom

			if(type == 'roomverification') {
				if(!$('.popup-container').hasClass('isShow')) {
					$(".popup-container").animate({
						top: '0',
						opacity : 1
					}, 200)

					$("#popup-verification").show();
					$('.popup-bg').addClass('active');
					$(".popup-container").show();

					setTimeout(() => {
						$(".popup-container").addClass("isShow");
					}, 200)
				} //end if show
				else {
					$(".popup-container").animate({
						top: '-50%',
						opacity : 0
					}, 200)
					setTimeout(() => {
						$("#popup-verification").hide();
						$(".popup-container").removeClass("isShow");
						$( ".popup-bg, .menu__items" ).removeClass('active');
						$(".popup-container").hide();
					}, 200)
				} // end else !show
			}

			if (type == 'language') {
				$('.ico-lang').click(function(e) {
					e.preventDefault();
					var $items = $(this);
					$items.addClass('active').siblings().removeClass('active');
				});

				let numOfLanguage = $('.header-subnav.language ul li');
				if(!$('.popup-container').hasClass('isShow')) {
					$(".popup-container").animate({
						top: '105%',
						opacity : 1
					}, 200)

					$(".menu__items").removeClass('active');
					$('.popup-bg').removeClass('active');
					$(".header-subnav.language").toggle();
					$(".popup-container").show();

					numOfLanguage.each((chosenLanguageIndex, el) => {
						let nameLanguage = $(el).attr('class').split(' ')[1];
						let currentLanguage = nameLanguage.split('--')[1];
						if(window.language.locale == currentLanguage) {
							$(el).addClass('active').siblings().removeClass('active');
						}
						$(el).on("click", () => {
							$.post('/settings', {language : chosenLanguageIndex}, function (response) {
								location.reload();
							});
						});
					});
					// setTimeout(() => {
					// 	$(".popup-container").addClass("isShow");
					// }, 200)
				} //end if show
				else {
					$(".popup-container").animate({
						top: '6.6%',
						opacity: 0
					}, 200)

					setTimeout(() => {
						$("#popup-language, .header-subnav.language").hide();
						$(".popup-container").removeClass("isShow");
						$(".popup-bg, .menu__items").removeClass('active');
						$(".popup-container").hide();
					}, 200)
				} // end else !show
			}
		}, timeout)

		this.open_popup = type;
	},
	toggleRefresh () {
		switch(current_open){
			case 'baccarat_normal':
				this.toggleBaccarat('normal', current_state);
				break;
			case 'baccarat_supersix':
				this.toggleBaccarat('supersix', current_state);
				break;
			case 'baccarat_dragonbonus':
				this.toggleBaccarat('dragonbonus', current_state);
				break;
			case 'sicbo':
				this.toggleSicbo();
				break;
			case 'dragon_tiger':
				this.toggledragonTiger();
				break;
			case 'poker':
				this.togglePoker();
				break;
			case 'paigow':
				this.togglePaigowClassic();
				break;
			case 'userbased_Sicbo':
				this.toggleUserBased('Sicbo');
				break;
			case 'userbased_Paigow':
				this.toggleUserBased('Paigow');
				break;
		}
	},
	toggleMain() {
		this.hideAll();
		current_open = 'main';
		// self.component_header.liveGames_subheader.visible = false;
		self.component_landing.main();
		self.component_landing.createHotGames(self.instance.hotLiveGames);
		// $("#landing").show();
		// $(".tables-container").hide();
		$(".hot-container").show();
		$(".main-container").hide();
		$(".banner-container").hide();
		$('.reelgames-container').hide();
		$('.notification-container').removeClass('toggle');
		$('.canvas-container').removeClass('black-theme');


    $('.header-subnav__items').removeClass("active")
    $('.header-subnav__items#allgames').addClass("active")
    $('#lobby').next().children().removeClass("active");
    $('.header-subnav').css({'display': 'none'});
    $( ".popup-bg, .menu__items" ).removeClass('active');
    $( ".popup-container" ).removeClass('isShow').css({'top' : '-100%'});
	},
	toggleReelGames (type='ka_gaming') {
		this.hideAll();
		current_open = 'reelgames';
		self = this.context;
		self.component_landing.stage.removeAllChildren();
		self.component_landing.stage.update();
		$('.reelgames-container').show();
		self.component_reelgames.toggleList(type);
		$('.notification-container').addClass('toggle');
	},
	togglePoker (){
		if(!window.all_tables.length) return;
		this.hideAll();
		current_open = 'poker';
		self = this.context;
		self.component_landing.stage.removeAllChildren();
		self.component_landing.stage.update();
		self.component_poker.createTables(self.instance.pokerTables);
		$(".poker-tables").show();
		$('.reelgames-container').hide();
		$('.header-subnav__items').removeClass("active")
		$('.header-subnav__items.-poker').addClass("active")
		$('.notification-container').addClass('toggle');
		$('.canvas-container').addClass('black-theme');

		return;
	},
	toggleSicbo () {
		if(!window.all_tables.length) return;
		current_open = 'sicbo';
		self = this.context;
		self.component_landing.stage.removeAllChildren();
		self.component_landing.stage.update();
		self.component_sicbo.createTables(self.instance.sicboTables);
		$(".sb-tables").show();
		$('.reelgames-container').hide();
		$('.header-subnav__items').removeClass("active")
		$('.header-subnav__items.-scbo').addClass("active")
		$('.notification-container').addClass('toggle');
		$('.canvas-container').addClass('black-theme');

		return;
	},
	toggledragonTiger () {
		if(!window.all_tables.length) return;
		current_open = 'dragon_tiger';
		self = this.context;
		self.component_landing.stage.removeAllChildren();
		self.component_landing.stage.update();
		$('.reelgames-container').hide();
		$('.header-subnav__items').removeClass("active")
		$('.header-subnav__items.-dragontiger').addClass("active")
		$(".dt-tables").show();
		$('.notification-container').addClass('toggle');
		$('.canvas-container').addClass('black-theme');
		self.component_dragonTiger.createTables(self.instance.dragontigerTables);

		return;
	},
	toggleBaccarat(type, disp) {
		if(!window.all_tables.length) return;
		current_open = 'baccarat_'+type;
		current_state = disp;

		if(disp == "thumbnail") {
			$(".table-thumbnail.bc-tables").show();
		} else {
			$(".table-list.bc-tables").show();
		}
		self = this.context;
		self.component_landing.stage.removeAllChildren();
		self.component_landing.stage.update();
		$('.reelgames-container').hide();
		// $('.header-subnav__items').removeClass("active")
		$('.notification-container').addClass('toggle');
		$('.canvas-container').addClass('black-theme');

		if(type == "normal") {
			self.component_baccarat.createTables(this.sortData(self.instance.baccaratTables, type), type, disp);
			// $('.header-subnav__items.-baccarat').addClass("active")
		} else if(type == "rooms") {
			self.component_baccarat.createTables(this.sortData(self.instance.baccaratSuper6Tables, type), type, disp);
			// $('.header-subnav__items.-rooms').addClass("active")
		} else if(type == "dragonbonus") {
			self.component_baccarat.createTables(this.sortData(self.instance.baccaratBonusTables, 'bonus'), type,  disp);
			$('.header-subnav__items.-bonus').addClass("active")
		}

		// self.component_baccarat.stage_list.forEach((e, x) =>{
		// 	if(!e.children.length){
		// 		$(e.canvas).hide()
		// 		$("#bc-timer-"+x).hide()
		// 	} else {
		// 		$("#bc-timer-"+x).show()
		// 		$(e.canvas).show()
		// 	}
		// });

		return;
	},
	toggleUserBased (type) {
		if(!window.all_tables.length) return;
		current_open = 'userbased_'+type;
		self = this.context;
		self.component_landing.stage.removeAllChildren();
		self.component_landing.stage.update();

		$('.reelgames-container').hide();
		$('.header-subnav__items').removeClass("active")
		$('.notification-container').addClass('toggle');
		$('.canvas-container').addClass('black-theme');
		$(".userbased-rooms").show().addClass('test');
		$(".ub-tables").show();

		if(type == "Sicbo") {
			self.component_userbased.createTables(self.instance.roomTables, self.instance.sicboTables[0], type);
			self.component_banner.currentSelected = self.instance.sicboTables[0];
			self.component_banner.bannerUserBased(self.instance.sicboTables[0], type, self.instance.roomTables);
		}

		if(type == "Paigow") {
			$('.canvas-container').removeClass('black-theme');
			self.component_userbased.createTables(self.instance.paigow_roomTables, self.instance.paigowTables[1], type);
			self.component_banner.currentSelected = self.instance.paigowTables[1];
			self.component_banner.bannerUserBased(self.instance.paigowTables[1], type, self.instance.paigow_roomTables);
		}

		return;
	},
	togglePaigowClassic () {
		if(!window.all_tables.length) return;
		current_open = 'paigow';
		self = this.context;
		self.component_landing.stage.removeAllChildren();
		self.component_landing.stage.update();
		self.component_paigow.createClassicTables(self.instance.paigowTables);
		$('.pg-classic-tables').show();
		$(".banner-container, .header-subnav").show();
		$('.reelgames-container, .header-subnav.reelgames, .header-subnav.language, .hot-container, .bc-tables').hide();
		$('.header-subnav__items, .canvas-container').removeClass("active");
		$('.header-subnav__items.-paigow').addClass("active");
	},

	hotGames () {
		$(".hot-container").hide();
		$(".main-container").show();
		$(".banner-container").show();
		$('.header-subnav').css({'display': 'block'});
		$(".header-subnav.reelgames, .header-subnav.language").hide();
		$('#livegames').addClass("active");
		$('#reelgames').removeClass("active");
	},

	reelGames () {
		$(".hot-container").hide();
		$(".main-container").hide();
		$(".banner-container").hide();
		$('#livegames').removeClass("active")
		$('.header-subnav').css({'display': 'block'});
		$(".header-subnav").hide();
		$(".header-subnav.reelgames").show();
		$('#reelgames').addClass("active")
	},

	sortData (data, type) {
		if(window.userAuthority === "admin") return data;

		let maintenanceTables = _.filter(data, (data) => {
			return _.find(data.maintenanceSetting.maintenance, (m)=>{
				return m.type == type && _.find(m.info, (s)=>{ return s.status == 1})
			})
		})

		// maintenanceTables = _.sortBy(maintenanceTables, 'tableNumber');
		let activeTbl = _.differenceBy(data, maintenanceTables, 'tableNumber');
		data = activeTbl.concat(maintenanceTables);

		return data;
	}
}

let sortData = function(data, type) {
	if(window.userAuthority === "admin") return data;

	let maintenanceTables = _.filter(data, (data) => {
		return _.find(data.maintenanceSetting.maintenance, (m)=>{
			return m.type == type && _.find(m.info, (s)=>{ return s.status == 1})
		})
	})

	// maintenanceTables = _.sortBy(maintenanceTables, 'tableNumber');
	let activeTbl = _.differenceBy(data, maintenanceTables, 'tableNumber');
	data = activeTbl.concat(maintenanceTables);

	return data;
}

export default {
	toggle
}
