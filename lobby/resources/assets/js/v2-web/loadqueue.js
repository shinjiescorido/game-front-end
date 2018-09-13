let to_load = [
	{
		"id" : "small_tiles",
		"src": "/img/tiles/small_tiles.png"
	},
	{
		"id" : "big_tiles",
		"src": "/img/tiles/big_tiles.png"
	},
	{
		"id" : "table_cards",
		"src" : "/img/cards/lobby_sprite_cards.png"
	},
	{
		"comment" : "***---------cards-------****",
		"id" : "bet-cards",
		"src" : "/img/cards/3.0/mobile-cards_31x42.png"
	},
	{
		"id" : "bet-cards-medium",
		"src" : "/img/cards/3.0/mobile-cards_42x56.png"
	},
	{
		"id" : "bet-cards-large",
		"src" : "/img/cards/3.0/mobile-cards_51x68.png"
	},
	{
		"id" : "bet-cards-extra-large",
		"src" : "/img/cards/3.0/mobile-cards_90x120.png"
	},
	{
		"comment" : "**----------------sounds------------------**",
		"id" : "click",
		"src" : "/sound/click.mp3"
	},
	{
		"id" : "void",
		"src" : "/img/icons/void/void_web.png"
	},
	{
		"id" : "user_ico",
		"src": "/img/v2_1/icons/room_info/lobby_users.png"
	},
	{
		"id" : "junketsignifier_ico",
		"src": "/img/v3/icons/room_info/junket_signifier.png"
	},
	{
		"id" : "mobile_user_ico",
		"src": "/img/v3/icons/room_info/mobile_user-ico.png"
	}
]

let snd = [
	{
		"id" : "click",
		"src" : "/sound/click.mp3"
	},
	{
    id: "welcome",
    src: "/sound/" + window.language.locale + "/mode-1/welcome-nihtan.mp3"
  },
  {
    id:"music_1",
    src:`/sound/bgm/music_1.mp3`
  },
  {
    id:"music_2",
    src:`/sound/bgm/music_2.mp3`
  },
  {
    id:"music_3",
    src:`/sound/bgm/music_3.mp3`
  },
  {
    id:"music_4",
    src:`/sound/bgm/music_4.mp3`
  },
  {
    id:"music_5",
    src:`/sound/bgm/music_5.mp3`
  }
]

import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';

let loadproc = {
	queue : new createjs.LoadQueue(true),
	main () {

		$(".wrapper").show()
		$(".card--wrapper>.card").show();

		snd.forEach((e) => {
			createjs.Sound.registerSound(e);
		});

		this.queue.on("complete", () => {
			this.context.main();
			this.context.finishedLoad = true;
			$(".wrapper").hide();
			$(".content-container").show();
			$(".hot-container").show();
			config.effect = 1;
		});

		this.queue.on("progress", this.handleProg);
		this.queue.loadManifest(to_load);
	},
	handleProg (e) {
		$(".card--percent").html(parseInt(e.progress*100)+'%')
	},
	getResources (key)  {
		return this.queue.getResult(key);

		let ret = _.filter(to_load , (e) => {
			if(e.id == key) return e.src
		});

		return ret[0].src;
	}
}

export default {
	loadproc
};
