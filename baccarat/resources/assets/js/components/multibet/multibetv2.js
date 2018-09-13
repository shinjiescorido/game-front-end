import {numberWithCommas } from '../../factories/factories';

import multibetListen from '../../listeners/multibet-events2';
import {Baccarat} from './factory/3.0/Baccarat';
import {Dragontiger} from './factory/3.0/Dragontiger';
import {Sicbo} from './factory/3.0/Sicbo';
import {Poker} from './factory/3.0/Poker';
import {Paigow} from './factory/3.0/Paigow';
//roadmap eye
import {Baccarat as BCrm,
	DragonTiger as DTrm, 
	Poker as Prm,
	Sicbo as Srm,
	Paigow as PGrm} from './factory/3.0/roadmap';

import {Baccarat as l_BCrm,
	DragonTiger as l_DTrm, 
	Poker as l_Prm,
	Sicbo as l_Srm,
	Paigow as l_PGrm} from './factory/3.0/Roadmap-list';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		games: [],
		data: [],
		selectedGames : [],
		marks : [],
		bg : [],
		theme: window.theme,
		height : 450,
		multibetGames : [],
		isRoom: (window.isRoom && window.isBanker) === undefined ? false : (window.isRoom && window.isBanker),
		toSwitchRoom : null,
		isActive : false,
		maintenanceGames : [],
		disabledGames : [],
		roomGames : [],
		isInit : false,
		main() {
			// multibetListen(this);

			this.bar = new createjs.Shape();
			this.bar.graphics.beginFill('rgba(25, 25, 25, 0.9)').drawRect(0,0,355,this.context.stage.baseHeight);
			this.bar.cache(0,0,355,this.context.stage.baseHeight);
			this.bar.x = -355

			this.bar2 = new createjs.Shape();
			this.bar2.graphics.beginFill('rgba(25, 25, 25, 0.9)').drawRect(0,0,355,this.context.stage.baseHeight);
			this.bar2.cache(0,0,355,this.context.stage.baseHeight);
			this.bar2.x = this.context.stage.baseWidth;
			this.addChild(this.bar, this.bar2);

			this.multi_left = new createjs.Container();
			this.multi_left.x = -355

			this.multi_right = new createjs.Container();
			this.multi_right.x = this.context.stage.baseWidth + 355;
			this.addChild(this.multi_left, this.multi_right);
			this.isActive = false;
			// this.toggleMultibet(false);

			//unavailable display
			this.unavailables = [];
			this.unavailables.push(new createjs.Bitmap(this.context.getResources('multi-unavailable')));
			this.unavailables.push(new createjs.Bitmap(this.context.getResources('multi-unavailable')));
			this.unavailables.push(new createjs.Bitmap(this.context.getResources('multi-unavailable')));
			this.unavailables.push(new createjs.Bitmap(this.context.getResources('multi-unavailable')));

			this.multi_left.addChild(this.unavailables[0], this.unavailables[1]);
			this.multi_right.addChild(this.unavailables[2], this.unavailables[3]);

			this.unavailables[0].x = this.unavailables[1].x = this.unavailables[2].x  =this.unavailables[3].x = 80;

			this.unavailables[0].y = this.unavailables[2].y = 130; 
			this.unavailables[1].y = this.unavailables[3].y = 590; 

			$("#myCanvas").on("click", function() {
				$('#roadmap-container').hide();
				if(this.eyeRoadmap) {
					this.eyeRoadmap.eye.removeAllChildren();
					this.eyeRoadmap = null;
				}
			});


			var self = this;
			$(".link-go").on("click", function() {
				if(window.tutorial_enabled) return;
				// alert($(this).attr('data-index'));
				var index = $(this).attr('data-index');
				var game = $($('.multi-game-name')[index]).attr('data');
				var range = $($('.multi-range')[index]).attr('data');
				var slave = self.games[index].slave;
				var location = $(this).attr('data-href');

        $.post("/setGameSettings", {range : range, game: game, slave:slave}, function () {
        	window.location = location;
        });

			});

			//list tables
			$('.button-list').on("click", function () {
				if($("#table-redirect-list").hasClass("show") ) {
					$("#table-redirect-list").removeClass("show");
					$(this).removeClass('hide');
					$("#roadmap-list-container").hide();
					if(this.eyeRoadmap) {
						this.eyeRoadmap.eye.removeAllChildren();
						this.eyeRoadmap = null;
					}
				} else {
					$("#table-redirect-list").addClass("show");
					$(this).addClass('hide');
				}
			});

			$(".win-wrap .win-close-icon").on("click", function() {
				$($(this).parent()).animate({
					right: '-360px',
					opacity: 0
				}, 200)
			});
			

			$("#checkslected").on('click', () => {
				console.log("selected games", this.selectedGames, this.games, this.toSwitchRoom, this.disabledGames, this.maintenanceGames, this.roomGames)
			});
		},
		createGames(game, x, register, flag) {
			$(".multi-game-name .drop-down").removeClass('up');

			if(this.games.length && this.toSwitchRoom) {
				this.games[x].disconnectSocket();

				$($(".multi-game-name")[x]).removeClass('flippy');
				$($(".multi-game-name")[x].children[0]).html('');
				$($(".multi-range")[x].children[0]).html('');

				this.multi_left.removeChild(this.games[x].game);	
				this.multi_right.removeChild(this.games[x].game);	

				this.games[x].isRemoved = true;
				// return;
			}

			if(flag) return; //stop rendering when disabling all

			//remove unavaible tables
			this.unavailables[x].visible = false;
			this.unavailables[x].namespace = game.namespace;
			$('.unavailable-stat')[x].className = 'unavailable-stat'; 

			if(game.gameName === 'Baccarat') {
				this.games[x] = new Baccarat(game, this);		
			}

			if(game.gameName === 'Dragon-Tiger') {
				this.games[x] = new Dragontiger(game, this);		
				this.games[x].setRoadmapData(game.marks);		
			}
			
			if(game.gameName === 'Sicbo') {
				this.games[x] = new Sicbo(game, this);		
				this.games[x].setRoadmapData(game.marks);		
			}

			if(game.gameName === 'Poker') {
				this.games[x] = new Poker(game, this);		
				this.games[x].setRoadmapData(game.marks);		
			}
			if(game.gameName === 'Pai-Gow') {
				this.games[x] = new Paigow(game, this);		
			}

			if(x >= 2) {
				this.multi_right.addChild(this.games[x].game);
			} else if(x < 2){
				this.multi_left.addChild(this.games[x].game);
			}

			let range = this.games[x].allRanges;

			let selected_range = null;
			let g = _.find(window.gameInfo.multibet, function (e) { return e.game === game.namespace});
			if(g) {
				selected_range = _.find(range, function(e) { return `${e.min}-${e.max}` === g.range});
			}

			if(!this.games[x].socketConnected) {
				this.games[x].connectToSocket();
			}

			if(!_.isEmpty(selected_range)) {
				this.games[x].setBetrange(selected_range); //change to selected range
			}

			let tempX = x;
			
			if(x == 2) {
				tempX = 0
			}
			if(x == 3) {
				tempX = 1
			}

			this.games[x].game.y = (tempX*this.height) + 25;
			this.games[x].game.x = 0;

			this.context.component_multibetBetting2.register(this.games[x]);

			// dom data & display
			let min = (this.games[x].betrange.min * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier);
			let max = (this.games[x].betrange.max * parseInt(window.currencyMultiplier)) * parseInt(window.userMultiplier) * this.games[x].mainMultiplier;
			min = parseInt(min);
			max = parseInt(max);

			let gamename = "";
			let gameText = "";
			switch(`${game.gameName}`) {
				case "Baccarat":
					gamename = window.language.locale != 'zh' ? 'BAC' : window.language.gamename.baccarat_game;
					gameText = `${gamename} ${game.tableNumber}`;
					break;
				case "Dragon-Tiger":
					gamename = window.language.locale != 'zh' ? 'DT' : window.language.gamename.dragontiger_game;
					gameText = `${gamename} ${game.tableNumber}`;
					break;
				case "Poker":
					gamename = window.language.locale != 'zh' ? 'POK' :window.language.gamename.poker_game;
					gameText = `${gamename}`;
					break;
				case "Sicbo":
					gamename = window.language.locale != 'zh' ? 'SIC' :window.language.gamename.sicbo_game;
					gameText = `${gamename}`;
					break;
				case "Pai-Gow":
					gamename = window.language.locale != 'zh' ? 'PAI' :window.language.gamename.paigow_game;
					gameText = `${gamename}`;
					break;
			}

			$($(".multi-game-name")[x]).removeClass('flippy');
			
			if(game.type && game.type === 'flippy') {
				$($(".multi-game-name")[x]).addClass('flippy');
			}

			$($(".multi-game-name")[x].children[0]).html(gameText);
			$($(".multibet-win-notif")[x]).attr('data', `${game.namespace}`);
			if(this.toSwitchRoom) {
				$($(".multibet-win-notif")[x]).removeClass(`${this.toSwitchRoom.split('/')[0]}-${this.toSwitchRoom.split('/')[1]}-win`);
			}
			$($(".multibet-win-notif")[x]).addClass(`${game.gameName}-${game.tableNumber}-win`);

			let indiMin = '';
			let indiMax = '';
			if(min >= 1000 && min < 999999 ) {
				min = min/1000;
				indiMin = 'K';
			}

			if(min >= 1000000 ) {
				min = min/1000000;
				indiMin = 'M';
			}

			if(max >= 1000 && max < 999999 ) {
				max = max/1000;
				indiMax = 'K';
			}

			if(max >= 1000000 ) {
				max = max/1000000;
				indiMax = 'M';
			}

			let text = `${numberWithCommas(min)}${indiMin} - ${numberWithCommas(max)}${indiMax}`;
		
			$($(".multi-range")[x].children[0]).html(text);

			$($(".multi-game-name")[x]).attr('data', game.namespace);
			$($(".multi-range")[x]).attr('data',`${this.games[x].betrange.min}-${this.games[x].betrange.max}`);

			let link = '';
			switch(game.gameName) {
				case 'Baccarat':
					link = `${window.bc_domain}${game.tableNumber}`
					break;
				case 'Poker':
					link = `${window.p_domain}${game.tableNumber}`
					break;
				case 'Dragon-Tiger':
					link = `${window.dt_domain}${game.tableNumber}`
					break;
				case 'Sicbo':
					link = `${window.sb_domain}${game.tableNumber}`
					break;
				case 'Pai-Gow':
					link = `${window.pg_domain}${game.tableNumber}`
					break;
			}
			$($(".link-go")[x]).attr('data-href', link);
			$($(".link-go")[x]).attr('data-index', x);
				
			var self = this;
			if(!register) {							
				$($(".multi-range")[x]).unbind('click').on('click', function (e) {
					e.preventDefault();
					if(window.tutorial_enabled) return;
					self.toggleEye(self.eyeId, $('.eye-cion'));
					var target = $(e.currentTarget).next();
					if($(target).is(':visible') ){
						$(target).hide();
						$($(e.currentTarget).children()[1]).removeClass('up');
						$(".game-list").hide();
						$(".range-list").hide();
					} else {
						$(".game-list").hide();
						$(".range-list").hide();
						$(target).show();
						$(".multi-game-name .drop-down").removeClass('up');
						$(".multi-range .drop-down").removeClass('up');
						$($(e.currentTarget).children()[1]).addClass('up');
					}

				});
				
				$($(".multi-game-name")[x]).unbind('click').on('click', function(e) {
					e.preventDefault();
					if(window.tutorial_enabled) return;
					self.toggleEye(self.eyeId, $('.eye-cion'));
					var target = $(e.currentTarget).next();
					if($(target).is(':visible') ){
						$(target).hide();
						self.toSwitchRoom = null;
						$($(e.currentTarget).children()[1]).removeClass('up');
						$(".range-list").hide();
						$(".game-list").hide();
					} else {
						$(".range-list").hide();
						$(".game-list").hide();
						$(target).show();
						self.toSwitchRoom = $(e.currentTarget).attr('data');
						$(".multi-game-name .drop-down").removeClass('up');
						$(".multi-range .drop-down").removeClass('up');
						$($(e.currentTarget).children()[1]).addClass('up');
					}
				});
			}
		},
		startBetting(data) {
			let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
			if(!_.isEmpty(game)) {

				if(data.gameName !== 'Poker') {
					game.startTime(parseInt(data.bettingTime), parseInt(data.totalTime))
				}

				if(game.namespace.indexOf('Poker') > -1) {
					if(data.type === "startround") {
						game.timerType = data.type;
						game.startTime(parseInt(data.bettingTime), parseInt(data.totalTime))
					} else {
						game.extraTime(data);
					}
				}
			}

			let domEl = this.getDom(data);
			if(domEl) {
				if(data.gameName !== 'Poker') {
					$(domEl).html(`${data.bettingTime}`)
				} else {
					$(domEl).html(data.type === 'startround' ? `${data.bettingTime}` :  `${data.type} ${data.bettingTime}`)
				}
				if(data.bettingTime <= 0) {
					$(domEl).html(window.language.multibet_status.dealing)
				}
			}

			let listId = `#${data.gameName}-${data.tableId}`;
			$(`${listId}.game-table > .game-status`).html(data.bettingTime)
			if(data.bettingTime <= 0) {
				$(`${listId}.game-table > .game-status`).html(window.language.multibet_status.dealing)
			}
			$(`${listId}.game-table > .game-status`).removeClass().addClass('game-status');
		},
		flippytimer(data) {
			let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}` && e.flippy});
			if(!_.isEmpty(game)) {
				game.flippytimer(parseInt(data.bettingTime), parseInt(data.totalTime))
			}
		},
		flip (data) {
			let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}` && e.flippy});
			if(!_.isEmpty(game)) {
				game.flip(data);
			}
		},
		setRoundProgress (data) {
			let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
			if(!_.isEmpty(game)) {
				game.timerStart = false;
				this.context.component_multibetBetting2.repeatBet({currentTarget : game.repeatButton}, true, false);
			}
		},
		inputItem (data) {
			//eye 
			if(this.eyeRoadmap) {
				if(this.eyeRoadmap.namespace === `${data.gameName}/${data.tableId}`) {
					this.eyeRoadmap.inputitem(data)
				}
			}
			
			let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
			if(!_.isEmpty(game)) {
				game.data.gameInfo = data.gameInfo; 
				game.inputItem(data);
			}
			
			if(data.type === 'burn') return;

			let domEl = this.getDom(data);
			if(domEl) {
				$(domEl).html(data.gameName == 'Sicbo' ? 'Shaking' : window.language.multibet_status.dealing);
				$(domEl).addClass('inputitem')
			}
			
			let listId = `#${data.gameName}-${data.tableId}`;
			$(`${listId}.game-table > .game-status`).html(data.gameName == 'Sicbo' ? 'Shaking' : window.language.multibet_status.dealing)
			$(`${listId}.game-table > .game-status`).addClass('inputitem')
		},
		maintenanceChange (data) {
			console.log(data, ":::maintenanceChange")
			let status = parseInt(data.data.status); //1 mantenance true / 0 maintenance false
			let listId = `#${data.gameName}-${data.tableId}`;
			if(status) {
				$(listId).addClass('maintenance')
				$(listId).removeClass('disabled')
			} else {
				$(listId).removeClass('maintenance')
			}
		},
		enableDsiableChange (data) {
			console.log(data, ":::maintenanceChange")
			let status = parseInt(data.status); //1 mantenance true / 0 maintenance false
			let listId = `#${data.gameName}-${data.tableId}`;
			if(status && !$(listId).hasClass('maintenance')) {
				$(listId).addClass('disabled')
			} else {
				$(listId).removeClass('disabled')
			}
		},
		newRound (data) {
			//eye 
			let d = _.find(all_games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
			
			if(d) {
				d.isNewRound = true;
			}

			if(this.eyeRoadmap) {
				if(d.namespace === this.eyeRoadmap.namespace) {
					this.eyeRoadmap.newRound(d)
				}
			}

			let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
			if(!_.isEmpty(game)) {
				game.newRound(data);
				game.gameNewRound(data);
			}
		},
		displayResult (data) {
			//update eyedata
			if(this.eyeRoadmap && this.eyeRoadmap.namespace === `${data.gameName}/${data.tableId}`) {
				let d = _.find(all_games,  (e) => {return e.namespace === this.eyeRoadmap.namespace});
				this.eyeRoadmap.setRoadmap(d);
				this.eyeRoadmap.setGameRoute(d);
			}

			let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
			if(!_.isEmpty(game)) {
				this.selectedGames.forEach((d) => {
					if(`${data.gameName}/${data.tableId}` === `${d.gameName}/${d.tableNumber}`) {
						game.setRoadmapData(d.marks);
						game.displayResult(data);
						game.data = _.clone(d);
					}
				});
			}

			let domEl = this.getDom(data);
			let classtoadd = 'result-red';
			let winner = data.gameResult.winner;
			let winText = '';

			if(data.gameName === 'Pai-Gow') {
				let w = data.gameResult.winner;
				for(var x=  0; x < w.length; x++) {
					if(w[x] === 'up') {
						winText += window.language.multibet_status.up;
						classtoadd = 'result-blue'
					}
					if(w[x] === 'down') {
						winText += window.language.multibet_status.down
						classtoadd = 'result-blue'
					}
					if(w[x] === 'heaven') {
						winText += window.language.multibet_status.heaven
						classtoadd = 'result-blue'
					}

					if(w[x] === 'banker') {
						winText += window.language.multibet_status.banker
					}
				}
			}

			if(data.gameName == 'Sicbo') {
				let dice = data.gameResult.winner.split('');
				var sum = _.reduce(dice, function(sum, n) { return parseInt(sum) + parseInt(n)})
				winner = sum > 10 ? 'big' : 'small';
				if(_.uniqBy(dice).length === 1) {
					winner = 'triple';
				}
			}

			if(winner == 'player' || winner == 'small' || winner == 'dragon') {
				classtoadd = 'result-blue';
			} else if(winner == 'tie') {
				classtoadd = 'result-green';
			} else if(winner == 'suitedtie') {
				classtoadd = 'result-gold';
			}

			switch(winner) {
				case 'player' :
					winText = window.language.multibet_status.player;
					break;
				case 'banker' :
					winText = window.language.multibet_status.banker;
					break;
				case 'dealer' :
					winText = window.language.multibet_status.dealer;
					break;
				case 'big' :
					winText = window.language.multibet_status.big;
					break;
				case 'small' :
					winText = window.language.multibet_status.small;
					break;
				case 'triple' :
					winText = window.language.multibet_status.triple;
					break;
				case 'dragon' :
					winText = window.language.multibet_status.dragon;
					break;
				case 'tiger' :
					winText = window.language.multibet_status.tiger;
					break;
				case 'tie' :
					winText = window.language.multibet_status.tie;
					break;
				case 'suited tie' :
					winText = window.language.multibet_status.suitedtie;
					break;
			}

			if(domEl) {
				if(winText !== '') {
					$(domEl).html(winText);
				} else {
					$(domEl).html(winner);
				}
				$(domEl).addClass('winner')
				$(domEl).addClass(classtoadd)
			}

			let listId = `#${data.gameName}-${data.tableId}`;
			if(winText != '') {
				$(`${listId}.game-table > .game-status`).html(winText)
			} else {
				$(`${listId}.game-table > .game-status`).html(winner)
			}
			$(`${listId}.game-table > .game-status`).addClass('winner')
			$(`${listId}.game-table > .game-status`).addClass(classtoadd)
		
		},
		updateCredits(data) {
			let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
			if(!_.isEmpty(game)) {
				game.setWin(data);
				game.setWinLoseChips(data);
			}
		},
		resetData () {
			for(var x = 0; x < all_games.length;x++) {
				let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${all_games[x].gameName}/${all_games[x].tableNumber}`});
				if(!_.isEmpty(game)) {
					game.data = all_games[x];
					this.toSwitchRoom = game.namespace;
					let index = _.findIndex(this.selectedGames, (o) => { return o.namespace == this.toSwitchRoom });
					this.createGames(all_games[x], index, true);
				} 
			}
		},
		eyeId : null,
		eyeRoadmap: null,
		toggleEye (data, el, evt, type = 'multibet') {
			
			if(this.eyeRoadmap) {
				this.eyeRoadmap.eye.removeAllChildren();
				this.eyeRoadmap = null;
			}

			$('.eye-cion').removeClass('active');
			
			if(this.eyeId == data) {
				this.eyeId = null;
				$("#roadmap-container").hide();
			} else {
				$("#roadmap-container").show();
				this.eyeId = data;

				el.addClass('active');

				let d = _.find(window.all_games, function(e) {return e.namespace == data});

				switch(this.eyeId.split('/')[0]) {
					case 'Baccarat':
						if(type !== 'list')
							this.eyeRoadmap = new BCrm(d,el, evt, this);
						else 
							this.eyeRoadmap = new l_BCrm(d,el, evt, this);
						break;
					case 'Dragon-Tiger':
						if(type !== 'list')
							this.eyeRoadmap = new DTrm(d,el, evt, this);
						else 
							this.eyeRoadmap = new l_DTrm(d,el, evt, this);
						break;
					case 'Sicbo':
						if(type !== 'list')
							this.eyeRoadmap = new Srm(d,el, evt, this);
						else 
							this.eyeRoadmap = new l_Srm(d,el, evt, this);
						break;
					case 'Poker':
						if(type !== 'list')
							this.eyeRoadmap = new Prm(d,el, evt, this);
						else 
							this.eyeRoadmap = new l_Prm(d,el, evt, this);
						break;
					case 'Pai-Gow':
						if(type !== 'list')
							this.eyeRoadmap = new PGrm(d,el, evt, this);
						else 
							this.eyeRoadmap = new l_PGrm(d,el, evt, this);
						// this.eyeRoadmap.setGameRoute(d);
						break;
				}
				// this.eyeRoadmap.setRoadmap(d);
				
				// this.addChild(this.eyeRoadmap.eye);
			}
			
		},
		getDom(data) {
			let dom = $(`.${data.gameName}-${data.tableId}`);
			$(dom).removeClass('inputitem');
			$(dom).removeClass('result-red');
			$(dom).removeClass('result-green');
			$(dom).removeClass('result-blue');
			$(dom).removeClass('result-gold');
			$(dom).removeClass('winner');
			return dom;
		},
		toggleMultibet(visible) {
			if(window.tutorial_enabled && visible == false) return;
			this.isActive = visible;
			var gameName = document.getElementsByClassName('game-range-sel');
			if(visible) { //show
				
				$(gameName[0]).animate({
					'right': '81.5%'
				}, 200);
				$(gameName[1]).animate({
					'right': '81.5%'
				}, 200);
				$(gameName[2]).animate({
					'right': '0%'
				}, 200);
				$(gameName[3]).animate({
					'right': '0%'
				}, 200);

				createjs.Tween.get(this.bar)
				.to({
					x : 0
				}, 200)
				createjs.Tween.get(this.multi_left)
				.to({
					x : 0
				}, 200)

				createjs.Tween.get(this.bar2)
				.to({
					x : this.context.stage.baseWidth - 355
				}, 200)
				createjs.Tween.get(this.multi_right)
				.to({
					x : this.context.stage.baseWidth - 355
				}, 200)

				setTimeout(()=>{
					$(".multibet-win-notif").show()
				},200);

			} else { // hide
				
				$('#roadmap-container').hide();
				$('.game-list').hide();
				this.toSwitchRoom = null;
				
				if(this.eyeRoadmap) {
					this.eyeRoadmap.eye.removeAllChildren();
					this.eyeRoadmap = null;
				}
				$(gameName[0]).animate({
					'right': '100%'
				}, 200);
				$(gameName[1]).animate({
					'right': '100%'
				}, 200);
				$(gameName[2]).animate({
					'right': '-20%'
				}, 200);
				$(gameName[3]).animate({
					'right': '-20%'
				}, 200);

				$(".multibet-win-notif").hide()

				createjs.Tween.get(this.bar)
				.to({
					x : -360
				}, 200)
				createjs.Tween.get(this.multi_left)
				.to({
					x : -360
				}, 200)

				createjs.Tween.get(this.bar2)
				.to({
					x : this.context.stage.baseWidth
				}, 200)
				createjs.Tween.get(this.multi_right)
				.to({
					x : this.context.stage.baseWidth
				}, 200)

			}

			for(var x = 0; x < this.games.length; x++) {
				if(visible) {
					if(!this.games[x].socketConnected) {
						this.games[x].connectToSocket()
					}
				} else {
					this.games[x].disconnectSocket()
				}
			}
		},
		shoechange(data) {
			let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
			if(!_.isEmpty(game)) {
				game.shoechange(data);
				this.selectedGames.forEach((d) => {
					if(`${data.gameName}/${data.tableId}` === `${d.gameName}/${d.tableNumber}`) {
						game.data = _.clone(d);
					}
				});
			}

			let listId = `#${data.gameName}-${data.tableId}`;
			$(`${listId}.game-table > .game-status`).removeClass('inputitem')
			$(`${listId}.game-table > .game-status`).removeClass('result-red')
			$(`${listId}.game-table > .game-status`).removeClass('result-blue')
			$(`${listId}.game-table > .game-status`).removeClass('result-green')
			$(`${listId}.game-table > .game-status`).removeClass('result-gold')
			$(`${listId}.game-table > .game-status`).removeClass('winner')

			let domEl = this.getDom(data);
			if(domEl) {
				$(domEl).html(`${window.language2.com_sub_ingameprompts_shoechange}`)
			}
			$(`${listId}.game-table > .game-status`).html(`${window.language2.com_sub_ingameprompts_shoechange}`)

		},
		dealerchange (data) {
			let listId = `#${data.gameName}-${data.tableId}`;
			$(`${listId}.game-table > .game-status`).removeClass('inputitem')
			$(`${listId}.game-table > .game-status`).removeClass('result-red')
			$(`${listId}.game-table > .game-status`).removeClass('result-blue')
			$(`${listId}.game-table > .game-status`).removeClass('result-green')
			$(`${listId}.game-table > .game-status`).removeClass('result-gold')
			$(`${listId}.game-table > .game-status`).removeClass('winner')
		},
		storeSettings () {
			
		},
		setActionLogs(type, game, chip, target) {
			
			// let _t = target;
			game.type = game.slave === 'supersix' ? 's' : game.slave === 'normal' || game.slave === 'classic' ? 'r' : 'b';
			
			let amt = game.totAllBet// _.sumBy(target.bets, 'amount'); 
			let comment = `${type}, ${amt}`;
			let u_money = this.context.context.user_money;
			
			switch(type) {
				case "repeat":
					comment = 'repeat';
					game.prevBets.forEach( (e) => {
						comment += `, ${e.table_id} ${e.amount}`
					});
					break;
				case "insert":
					if(chip.chip_amt == 'max') {
						amt = target.total_bet_amt;
					} else {
						amt = chip.chip_amt
					}
					// _t = target.parent.parent;
					comment = `${target.table}, ${amt}`;
					// u_money = u_money - _.sumBy(target.parent.parent.betarea, 'total_bet_amt');
					break;
				case "confirm":
					if(game.data.gameName === 'Poker') {
						if(game.timerType === 'flop' || game.timerType === 'turn' || game.timerType === 'river') {
							amt = _.find(game.extra_areas, function(e) {
								return e.table === game.timerType;
							});
							if(amt) {
								comment = `${game.timerType}, ${amt.total_bet_amt}`;
							}
						}
					}
					// u_money = u_money - _.sumBy(target.bets, 'amount');
					break;
				case "setFoldCheck":
					comment = game.timerType == 'flop' ? 'fold' : 'check';
					break;
			}
			
			game.logs = [];
			game.logs.push({action: type, "comment" : comment, user_money: u_money , timeDate : this.fnFormatTime(new Date().getTime(), 'MM/dd/yyyy HH:mm:ss')});
			
			if(type === 'insert'|| type === 'repeat'|| type === 'clear') {//(type === 'clear' && !game.is_confirmed)) {
				
				if(type == 'clear') {
					game.logs.pop();	
					game.logs.push({action: type});	
				}
        $.post(game.links.logs, {logs : game.logs, type : 'm'},  (response) => {
        });
			}
		},
		fnFormatTime(time, format) {

			var t = new Date(time);
      var tf = function (i) { return (i < 10 ? '0' : '') + i };
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
          switch (a) {
              case 'yyyy':
                  return tf(t.getFullYear());
                  break;
              case 'MM':
                  return tf(t.getMonth() + 1);
                  break;
              case 'mm':
                  return tf(t.getMinutes());
                  break;
              case 'dd':
                  return tf(t.getDate());
                  break;
              case 'HH':
                  return tf(t.getHours());
                  break;
              case 'ss':
                  return tf(t.getSeconds());
                  break;
          }
      });
		},
		displaymodify (data) {

			if(this.eyeRoadmap && this.eyeRoadmap.namespace === `${data.gameName}/${data.tableId}`) {
				let d = _.find(all_games,  (e) => {return e.namespace === this.eyeRoadmap.namespace});
				this.eyeRoadmap.setRoadmap(d);
				this.eyeRoadmap.setGameRoute(d);
			}

			let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
			let all = _.find(window.all_games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
			if(!_.isEmpty(game)) {
				game.data = all;
				game.setRoadmapData(game.data.marks);
			}
		},
		displayRollback(data) {

			if(this.eyeRoadmap && this.eyeRoadmap.namespace === `${data.gameName}/${data.tableId}`) {
				let d = _.find(all_games,  (e) => {return e.namespace === this.eyeRoadmap.namespace});
				this.eyeRoadmap.setRoadmap(d);
				this.eyeRoadmap.setGameRoute(d);
			}

			let game = _.find(this.games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
			let all = _.find(window.all_games, function (e) { return `${e.namespace}` ===  `${data.gameName}/${data.tableId}`});
			if(!_.isEmpty(game)) {
				game.data = all;
				game.setRoadmapData(game.data.marks);
			}
		},
		setUnavailable (status) {
			let g = _.find(this.unavailables, (e) => {return e.namespace == this.toSwitchRoom});
			let index = _.findIndex(this.unavailables, (e) => {return e.namespace == this.toSwitchRoom});
			if(status && !_.isEmpty(g)) {
				g.visible = true;
				g.namespace = ''
				if(index > -1) {
					$('.unavailable-stat')[index].className = 'unavailable-stat active'; 
				}
			}
		}
	});

	return instance;
}