import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';

let self  =  null;
let current_open = 'main';

toggle = {
	main () {
		self = this.context;
		self.component_header.stage.on("click", (e) => {
			if(e.target.name == "reel_games" && window.reel_yn === 0) return;
			if(e.target.name == null || e.target.name == "themed_games" || e.target.name == "betsoft") return;

			this.toggleView(e.target.name);

			try {
				e.target.active(e.target)
			} catch(err){

			}

			playSound('click')

		});
	},

	getCurrentOpen() {
		return current_open;
	},
	toggleRefresh () {
		switch(current_open){
			case 'baccarat_normal':
				this.toggleBaccarat('normal');
				break;
			case 'baccarat_supersix':
				this.toggleBaccarat('supersix');
				break;
			case 'baccarat_dragonbonus':
				this.toggleBaccarat('dragonbonus');
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
			case 'userbased_Sicbo':
				this.toggleUserBased('Sicbo');
				break;
			case 'userbased_Paigow':
					this.toggleUserBased('Paigow');
				break;
			case 'paigow':
					this.togglePaigowClassic('Paigow');
				break;
		}
	},

	toggleView (view) {
		if(!window.all_tables.length) return;
		self = this.context;
		this.hideAll();

		self.component_header.normalSubHead()
		self.component_header.normalMainHead();
		//removing all children baccarat
		if(self.component_baccarat.baccarat_stage.length) {
			self.component_baccarat.baccarat_stage.forEach((e) =>{
				e.removeAllChildren();
			});
		}
		//removing all children dragontiger
		if(self.component_dragonTiger.dt_stage.length) {
			self.component_dragonTiger.dt_stage.forEach((e) =>{
				e.removeAllChildren();
			});
		}

		console.log('view: ', view)

		switch(view) {
			case "live_games" :
			case "baccarat" :
				this.toggleBaccarat("normal");
				self.component_header.sub_baccarat.active(self.component_header.sub_baccarat);
				self.component_header.live_games_header.active(self.component_header.live_games_header);
				break;
			case "main" :
				this.toggleMain();
				break;
			case "supersix":
				this.toggleBaccarat("supersix");
				self.component_header.sub_supersix.active(self.component_header.sub_supersix);
				self.component_header.live_games_header.active(self.component_header.live_games_header);
				break;
			case "bonusbaccarat":
				this.toggleBaccarat("dragonbonus");
				self.component_header.sub_bonusbaccarat.active(self.component_header.sub_bonusbaccarat);
				self.component_header.live_games_header.active(self.component_header.live_games_header);
				break;
			case "dragonTiger":
				this.toggledragonTiger();
				self.component_header.sub_dragonTiger.active(self.component_header.sub_dragonTiger);
				self.component_header.live_games_header.active(self.component_header.live_games_header);
				break;

			case "sicbo":
				this.toggleSicbo();
				self.component_header.sub_sicbo.active(self.component_header.sub_sicbo);
				self.component_header.live_games_header.active(self.component_header.live_games_header);
				break;

			case "poker":
				this.togglePoker();
				self.component_header.sub_poker.active(self.component_header.sub_poker);
				self.component_header.live_games_header.active(self.component_header.live_games_header);
				break;
			case "allgames":
				this.toggleReelGames();
				self.component_header.reel_games_header.active(self.component_header.reel_games_header);
				break;
			case "reel_games":
				this.toggleReelGames('ka_gaming');
				self.component_header.reel_games_header.active(self.component_header.reel_games_header);
				break;
			case "kagaming":
			case "kagaming_zh":
				this.toggleReelGames('ka_gaming');
				self.component_header.reel_games_header.active(self.component_header.reel_games_header);
				break;
			case "thumbnail_bethistory" :
				this.togglePopups('bethistory');
				self.component_bethistory.initRecords("BACCARAT");
				break;
			case "thumbnail_transactions" :
				this.togglePopups('transhistory');
				self.component_transaction.initRecords();
				break;
			case "thumbnail_settings" :
				this.togglePopups('settings');
				break;
			case "logout" :
				this.hideAll();
				this.toggleMain();
				self.component_confirmation.stage.update();
				$("#popup-logout").show();
				break;
			case "thumbnail_howtoplay" :
				this.togglePopups('howto');
				self.component_howtoplay.openRulesPage();
				break;
		}
	},

	hideAll() {
		$("#landing").hide();
		$("#bet-history").hide();
		$("#trans-history").hide();
		$("#popup-settings").hide();
		$(".tables-container").hide();
		$("#popup-howto").hide();
		$('.reelgames-container').hide();

		let arrayElement = ["#sicbo-toggle","#poker-toggle","#baccarat-toggle","#dragontiger-toggle","#red-white-toggle","#bigwheel-toggle","#roulette-toggle"];

		arrayElement.forEach((e) => {
			$(e).hide();
		});
		$("#popup-howto").hide();
		self.component_howtoplay.closeAll();
	},
	togglePopups (type) {
		// hiding all by default
		$("#landing").hide();
		$("#bet-history").hide();
		$("#trans-history").hide();
		$("#popup-settings").hide();
		$("#popup-howto").hide();
		$(".tables-container").hide();
		$('.reelgames-container').hide();
		self.component_howtoplay.closeAll();
		self.component_header.liveGames_subheader.visible = false;
		self.component_header.reelGames_subheader.visible = false;

		$("#sicbo-toggle, #poker-toggle, #baccarat-toggle, #dragontiger-toggle, #red-white-toggle, #bigwheel-toggle, #roulette-toggle").hide()

		if(type == 'bethistory') {
			$("#bet-history").show();
			self.component_bethistory.initRecords("BACCARAT");
		}
		if(type == 'transhistory') {
			$("#trans-history").show();
			self.component_transaction.initRecords();
		}
		if(type == 'settings') {
			$("#popup-settings").show();
		}
		if(type == 'howto') {
			$("#popup-howto").show();
			self.component_howtoplay.openRulesPage();
		}
		if(type == 'createroom') {
			$(".tables-container").show();
			if(!$('.popup-mb-container').hasClass('isShow')) {
				this.context.component_createroom.main(self.instance.roomTables);
				$(".createroom-wrap").animate({
					top: '23%',
					opacity : 1
				}, 200)
				$(".popup-mb-container").show();
				$("#popup-createroom").show();
				setTimeout(() => {
					$(".popup-mb-container").addClass("isShow");
				}, 200)
			} else {
				$(".createroom-wrap").animate({
					top: '-50%',
					opacity : 0
				}, 200)
				setTimeout(() => {
					$(".popup-mb-container").removeClass("isShow").hide();;
				}, 200)
			}
		} //createroom

		if(type == 'roomverification') {
			$(".tables-container").show();
			if(!$('.popup-mb-container').hasClass('isShow')) {
				this.context.component_createroom.main(self.instance.roomTables);
				$(".verification-wrap").animate({
					top: '27%',
					opacity : 1
				}, 200)
				$(".popup-mb-container").show();
				$("#popup-verification").show();
				setTimeout(() => {
					$(".popup-mb-container").addClass("isShow");
				}, 200)
			} else {
				$(".verification-wrap").animate({
					top: '-50%',
					opacity : 0
				}, 200)
				setTimeout(() => {
					$(".popup-mb-container").removeClass("isShow").hide();;
				}, 200)
			}
		} //createroom
	},
	toggleMain() {
		current_open = 'main';
		self.component_header.liveGames_subheader.visible = false;
		self.component_header.reelGames_subheader.visible = false;
		self.component_landing.main();
		this.hideAll();
		$("#landing").show();
		$(".tables-container").hide();
	},
	togglePoker (){
		if(!window.all_tables.length) return;
		current_open = 'poker';
		self = this.context;
		self.component_landing.stage.removeAllChildren();
		self.component_landing.stage.update();
		$("#landing").hide();
		$("#bet-history").hide();
		$("#trans-history").hide();
		$("#popup-settings").hide();
		$("#popup-howto").hide();
		$('.reelgames-container').hide();
		$(".tables-container.dt-tables").hide();
		$(".tables-container.bc-tables").hide();
		$(".tables-container.sb-tables").hide();
		$(".tables-container.pg-tables").hide();
		$(".tables-container.poker-tables").show();
		$(".tables-container.ub-tables").hide();
		self.component_howtoplay.closeAll();
		self.component_header.liveGames_subheader.visible = true;
		self.component_header.reelGames_subheader.visible = false;
		self.component_poker.createTables( sortData(self.instance.pokerTables) );
	},
	toggleReelGames (type='ka_gaming') {
		this.hideAll();
		current_open = 'reelgames';
		self = this.context;
		self.component_landing.stage.removeAllChildren();
		self.component_landing.stage.update();
		$("#landing").hide();
		$("#bet-history").hide();
		$("#trans-history").hide();
		$("#popup-settings").hide();
		$("#popup-howto").hide();
		$(".tables-container").hide();
		$('.reelgames-container').show();
		self.component_howtoplay.closeAll();
		self.component_reelgames.toggleList(type);
		self.component_header.liveGames_subheader.visible = false;
		self.component_header.reelGames_subheader.visible = true;
	},
	toggleSicbo () {
		if(!window.all_tables.length) return;
		current_open = 'sicbo';
		self = this.context;
		self.component_landing.stage.removeAllChildren();
		self.component_landing.stage.update();
		$("#landing").hide();
		$("#bet-history").hide();
		$("#trans-history").hide();
		$("#popup-settings").hide();
		$("#popup-howto").hide();
		$('.reelgames-container').hide();
		$(".tables-container.poker-tables").hide();
		$(".tables-container.dt-tables").hide();
		$(".tables-container.bc-tables").hide();
		$(".tables-container.sb-tables").show();
		$(".tables-container.pg-tables").hide();
		$(".tables-container.ub-tables").hide();
		self.component_howtoplay.closeAll();
		self.component_header.liveGames_subheader.visible = true;
		self.component_header.reelGames_subheader.visible = false;
		self.component_sicbo.createTables( sortData(self.instance.sicboTables) );
	},
	toggledragonTiger () {
		if(!window.all_tables.length) return;
		current_open = 'dragon_tiger';
		self = this.context;
		self.component_landing.stage.removeAllChildren();
		self.component_landing.stage.update();
		$("#landing").hide();
		$("#bet-history").hide();
		$("#trans-history").hide();
		$("#popup-settings").hide();
		$("#popup-howto").hide();
		$('.reelgames-container').hide();
		$(".tables-container.poker-tables").hide();
		$(".tables-container.dt-tables").show();
		$(".tables-container.bc-tables").hide();
		$(".tables-container.sb-tables").hide();
		$(".tables-container.pg-tables").hide();
		$(".tables-container.ub-tables").hide();
		self.component_howtoplay.closeAll();
		self.component_header.liveGames_subheader.visible = true;
		self.component_header.reelGames_subheader.visible = false;
		self.component_dragonTiger.createTables( sortData(self.instance.dragontigerTables) );
	},
	toggleBaccarat(type) {
		if(!window.all_tables.length) return;
		current_open = 'baccarat_'+type;
		self = this.context;
		self.component_landing.stage.removeAllChildren();
		self.component_landing.stage.update();
		if(type == "normal") {
			self.component_baccarat.createTables( sortData(self.instance.baccaratTables, type) );
		} else if(type == "supersix") {
			self.component_baccarat.createTables( sortData(self.instance.baccaratSuper6Tables, type) );
		} else if(type == "dragonbonus") {
			self.component_baccarat.createTables( sortData(self.instance.baccaratBonusTables, 'bonus') );
		}
		$("#landing").hide();
		$("#bet-history").hide();
		$("#bet-history").hide();
		$("#trans-history").hide();
		$("#popup-settings").hide();
		$("#popup-howto").hide();
		$('.reelgames-container').hide();
		$(".tables-container.poker-tables").hide();
		$(".tables-container.bc-tables").show();
		$(".tables-container.dt-tables").hide();
		$(".tables-container.sb-tables").hide();
		$(".tables-container.pg-tables").hide();
		$(".tables-container.ub-tables").hide();
		self.component_howtoplay.closeAll();
		self.component_header.liveGames_subheader.visible = true;
		self.component_header.reelGames_subheader.visible = false;

		// self.component_baccarat.baccarat_stage.forEach((e, x) =>{
		// 	if(!e.children.length){
		// 		$(e.canvas).hide()
		// 		$("#bc-timer-"+x).hide()
		// 	} else {
		// 		$("#bc-timer-"+x).show()
		// 		$(e.canvas).show()
		// 	}
		// });
	},
	toggleUserBased (type) {
		if(!window.all_tables.length) return;
		current_open = 'userbased_'+type;
		self = this.context;
		self.component_landing.stage.removeAllChildren();
		self.component_landing.stage.update();

		$("#landing").hide();
		$("#bet-history").hide();
		$("#trans-history").hide();
		$("#popup-settings").hide();
		$("#popup-howto").hide();
		$('.reelgames-container').hide();
		$(".tables-container.poker-tables").hide();
		$(".tables-container.dt-tables").hide();
		$(".tables-container.bc-tables").hide();
		$(".tables-container.pg-tables").hide();
		$(".tables-container.sb-tables").hide();
		$(".tables-container.ub-tables").show();

		if(type == "Sicbo") {
			self.component_userbased.createRoomTables(self.instance.roomTables, self.instance.sicboTables[0]);
			self.component_userbased.currentSelected = `sicbo/${self.instance.sicboTables[0].tableNumber}`;
			self.component_userbased.createGameInfoTable(self.instance.sicboTables[0], type, self.instance.roomTables);
		}

		if(type == "Paigow") {
			self.component_userbased.createRoomTables(self.instance.paigow_roomTables, self.instance.paigowTables[1]);
			self.component_userbased.currentSelected = `pai-gow/${self.instance.paigowTables[1].tableNumber}`;
			console.log(self.instance.paigowTables[1], "toggleee")
			self.component_userbased.createGameInfoTable(self.instance.paigowTables[1], type, self.instance.paigow_roomTables);
		}
		return;
	},
	togglePaigowClassic () {
		this.hideAll();
		current_open = 'paigow';
		self = this.context;
		self.component_landing.stage.removeAllChildren();
		self.component_landing.stage.update();
		self.component_paigow.createClassicTables(self.instance.paigowTables);
		$("#landing").hide();
		$("#bet-history").hide();
		$("#trans-history").hide();
		$("#popup-settings").hide();
		$("#popup-howto").hide();
		$(".tables-container").hide();
		$(".reelgames-container").hide();
		$(".header-subnav__sort.-paigow").show();
		$(".tables-container.pg-tables").show();
		self.component_howtoplay.closeAll();
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
