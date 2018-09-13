
let component_language = {
	ads : [],
	circle_indicator : [],
	main() {
	  var c = document.createElement("canvas");
    c.setAttribute("id", "popup-language");
    c.setAttribute("width", "480px");
    c.setAttribute("height", "160px");
		$(c).css({
			position: 'absolute',
			top: '-100%',
			transform: 'translate(0,0)',
			display : 'none',
			left : '111%'
		});
		$(".popup-container").append(c);
		$(".ico-language").css('background-image', `url(/img/v2_1/icons/language/${window.language.locale}.png)`);

		this.stage = new createjs.Stage("popup-language");
    this.stage.enableMouseOver(10);
		this.container = new createjs.Container();
		this.container.y = 30;
		this.stage.addChild(this.container);
		this.stage.addEventListener("mousedown", (e) => {
			return;
	  });

	  let popup_bg = new createjs.Shape();
		popup_bg.graphics.ss(2).s("#5d5d5d").beginFill("#2b2b2b").drawRect(10,0,450,120);
		this.container.addChild(popup_bg);

		let arrow = new createjs.Shape();
		arrow.graphics.ss(2).s("#5d5d5d").beginFill("#2b2b2b").drawRect(0,0,40,40);
		arrow.x = 240;
		arrow.y = -15;
		arrow.rotation = 45;
		this.container.addChild(arrow);

		let arrow_mask = new createjs.Shape();
		arrow_mask.graphics.beginFill("red").drawRect(0,0,100,49);
		arrow_mask.x = arrow.x - 50;
		arrow_mask.y = -48;
		arrow.mask = arrow_mask;

		//Close button
		let closetext = new createjs.Text('X', 'bold 25px Arial', '#9e9e9e');
		closetext.x = 435;
		closetext.y = 10;
		closetext.textAlign = 'center';
		this.container.addChild(closetext);

		//Close button hitarea
		let closeHit = new createjs.Shape();
		closeHit.graphics.beginFill("#262626").drawRect(0, 0, 50, 50);
		closeHit.x = closetext.x - 25;
		closeHit.y = 0;
		closeHit.cursor = "pointer";
		closeHit.alpha = 0.01;
		this.container.addChild(closeHit);

		closeHit.on("click", function() {
			toggle.togglePopups('language');
		})

		this.chosenLang = [];
		let langArr = [
			{lang: 'english', abrev: 'en'}, 
			{lang: 'japan', abrev: 'jp'}, 
			{lang: 'korea', abrev: 'kr'}, 
			{lang: 'chinese', abrev: 'zh'}, 
			{lang: 'thai', abrev: 'th'}
		];

		for (var i = 0; i < langArr.length; i++) {
			let xCoor = 58 + (i * 75);

			this.chosenLang[i] = new createjs.Shape();
			this.chosenLang[i].graphics.ss(2).s("#f0e282").beginFill("#2b2b2b").drawCircle(0,0,29);
			this.chosenLang[i].x = xCoor + 25;
			this.chosenLang[i].y = 70;
			this.chosenLang[i].visible = false;
			this.chosenLang[i].val = langArr[i].abrev;
			this.container.addChild(this.chosenLang[i]);

			let langFlag = new createjs.Bitmap(`/img/v2_1/icons/language/${langArr[i].abrev}.png`);
			langFlag.x = xCoor;
			langFlag.y = 45;
			langFlag.scaleX = langFlag.scaleY = 1.2;
			langFlag.cursor = 'pointer';
			langFlag.val = langArr[i].abrev;
			langFlag.lang = langArr[i].lang;
      this.container.addChild(langFlag);

      langFlag.addEventListener("mousedown", (e) => {
				this.setLanguage(e.currentTarget.val);
				$(".ico-language").css('background-image', `url(/img/v2_1/icons/language/${e.currentTarget.val}.png)`);

				let chosenLanguageIndex = 0;
		    for (var i = 0; i < rawConfig.language.length; i++) {
		      if (rawConfig.language[i] == e.currentTarget.lang) {
		        chosenLanguageIndex = i;
		      }
		    }

		    $.post('/settings', {language : chosenLanguageIndex}, function (response) {
		      location.reload();
		    });
		  });
		}

		this.setLanguage(window.language.locale);
	},
	setLanguage(lang) {
		for (var i = 0; i < this.chosenLang.length; i++) {
			this.chosenLang[i].visible = false;
			if (this.chosenLang[i].val == lang) this.chosenLang[i].visible = true;
		}
	}
}
export default {
	component_language
}
