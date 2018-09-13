let component_session = {
	type : "redirect_casino",
	stage:null,
	main () {
		var c = document.createElement("canvas");
		c.setAttribute("id", "popup-session");
		c.setAttribute("width", "1920px");
		c.setAttribute("height", "1080px");
		$(c).css({
			position: 'absolute',
			top: '0',
			transform: 'translate(0,0)',
			display : 'none',
			left : '45%'
		});
		
		$(".popup-container").append(c);

		this.stage = new createjs.Stage("popup-session");

		this.overlay = new createjs.Shape();
		this.overlay.graphics.f('rgba(0,0,0,0.01)').drawRect(0,0,1920,1080);
		this.overlay.name = 'overlay';
		this.stage.addChild(this.overlay);

		this.container = new createjs.Container();
		this.container.x = (1920 / 2) - (563 / 2);
		this.container.y = (1080 / 2) - (303 / 2);
		this.stage.addChild(this.container);

		this.modalBg = new createjs.Bitmap(this.context.load.getResources("modal_bg"));
		this.modalBg.scaleX = this.modalBg.scaleY = 0.499;
		this.modalBg.x = 0;
		this.modalBg.y = 0;
		this.container.addChild(this.modalBg);

		let nihtanLogo = new createjs.Bitmap(this.context.load.getResources("modal_nihtan_logo"));
		nihtanLogo.x = this.modalBg.x + 160;
		nihtanLogo.y = this.modalBg.y + 50;
		nihtanLogo.scaleY = nihtanLogo.scaleX = 0.499;
		this.container.addChild(nihtanLogo);

		this.mainText = new createjs.Text(window.language.modal.exitnihtancaps,'bold 30px Lato',"#ffffff");
		this.mainText.x = this.modalBg.x + 280;
		this.mainText.y = this.modalBg.y + 108;
		this.mainText.textAlign = 'center';
		this.container.addChild(this.mainText);
		
		this.subText1 = new createjs.Text(window.language.prompts.sessionexpire,'bold 21px Lato',"#ffffff");
		this.subText1.x = this.mainText.x;
		this.subText1.y = this.mainText.y + 50;
		this.subText1.textAlign = 'center';
		this.container.addChild(this.subText1);

		this.modalYesBg = new createjs.Shape();
		this.modalYesBg.graphics.beginFill("#68A12E").drawRoundRectComplex(0,0,559,70,0,0,8,8);
		this.modalYesBg.x = this.modalBg.x + 2;
		this.modalYesBg.y = this.modalBg.y + 231.5;
		this.modalYesBg.cursor = 'pointer';
		this.container.addChild(this.modalYesBg);

		this.yesText = new createjs.Text(window.language.modal.okcaps,'bold 30px Lato',"#fff");
		this.yesText.x = this.modalYesBg.x + 279.5;
		this.yesText.y = this.modalYesBg.y + 17;
		this.yesText.hitArea = this.modalYesBg;
		this.yesText.textAlign = 'center';
		this.container.addChild(this.yesText);

		this.modalYesBg.addEventListener('mousedown', () => {
			this.modalYesBg.graphics.beginFill("#68A12E").drawRoundRectComplex(0,0,559,70,0,0,8,8);
		});

		let clickedYes = false;
		this.modalYesBg.addEventListener('click', (e) => {
			e.nativeEvent.preventDefault();
			this.modalYesBg.graphics.beginFill("#68A12E").drawRoundRectComplex(0,0,559,70,0,0,8,8);

			//click once
			if(clickedYes) return;
			clickedYes = true;

			switch(this.type) {
				case ("redirect_casino"):
					$.post('/logout', { }, (redirect) => {
						window.location.href = redirect;
					}).fail(function(){
						clickedYes = false;
					});
					
					break;

				default: 
					toggle.togglePopups("logout");
					break;
			}

		});

		this.overlay.addEventListener('click', (e) => {
			console.log(e.target);
			this.modalYesBg.graphics.beginFill("#68A12E").drawRoundRectComplex(0,0,280,70,0,0,8,0);
			toggle.togglePopups("logout");	
		});	

	}
}
export default {
	component_session
}