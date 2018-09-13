let component_session = {
	type : "redirect_casino",
	main() {
	  var c = document.createElement("canvas");
    c.setAttribute("id", "popup-session");
    c.setAttribute("width", "1280px");
    c.setAttribute("height", "930px");
    c.setAttribute("style", "position: absolute;top: 96px;display:none; z-index:999");
	  $(".container").append(c);

		this.stage = new createjs.Stage("popup-session");
    createjs.Touch.enable(this.stage);

		this.overlayBg = new createjs.Shape();
		this.overlayBg.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0,0,1280,638);
		this.overlayBg.x = 0;
		this.overlayBg.y = 0;
		this.overlayBg.name = "overlay";
		this.stage.addChild(this.overlayBg);

		this.modalBg = new createjs.Bitmap(this.context.load.getResources("modal_bg"));
		this.modalBg.scaleX = this.modalBg.scaleY = 0.499;
		this.modalBg.x = 360;
		this.modalBg.y = 100;
		this.stage.addChild(this.modalBg);

		let nihtanLogo = new createjs.Bitmap(this.context.load.getResources("modal_nihtan_logo"));
		nihtanLogo.x = this.modalBg.x + 160;
		nihtanLogo.y = this.modalBg.y + 50;
		nihtanLogo.scaleY = nihtanLogo.scaleX = 0.499;
		this.stage.addChild(nihtanLogo);

		this.mainText = new createjs.Text(window.language.modal.exitnihtancaps,'bold 30px Lato',"#ffffff");
		this.mainText.x = this.modalBg.x + 280;
		this.mainText.y = this.modalBg.y + 108;
		this.mainText.textAlign = 'center';
		this.stage.addChild(this.mainText);
		
		this.subText1 = new createjs.Text(window.language.prompts.sessionexpire, 'bold 21px Lato',"#ffffff");
		this.subText1.x = this.mainText.x;
		this.subText1.y = this.mainText.y + 50;
		this.subText1.textAlign = 'center';
		this.stage.addChild(this.subText1);

		this.modalYesBg = new createjs.Shape();
		this.modalYesBg.graphics.beginFill("#68A12E").drawRoundRectComplex(0,0,559,70,0,0,8,8);
		this.modalYesBg.x = this.modalBg.x + 2;
		this.modalYesBg.y = this.modalBg.y + 231.5;
		this.modalYesBg.cursor = 'pointer';
		this.stage.addChild(this.modalYesBg);

		this.yesText = new createjs.Text(window.language.modal.okcaps,'bold 30px Lato',"#fff");
		this.yesText.x = this.modalYesBg.x + 279.5;
		this.yesText.y = this.modalYesBg.y + 17;
		this.yesText.hitArea = this.modalYesBg;
		this.yesText.textAlign = 'center';
		this.stage.addChild(this.yesText);

		this.modalYesBg.addEventListener('mousedown', () => {
			this.modalYesBg.graphics.beginFill("#68A12E").drawRoundRectComplex(0,0,559,70,0,0,8,8);
		});

		let clickedYes = false;
		this.modalYesBg.addEventListener('click', (e) => {
			if(clickedYes) return;
			clickedYes = true;

			switch(this.type) {
				case ("redirect_casino"):
				$.post('/logout', { mobile : true }, (redirect) => {
					var mobileString = this.detectmob();
					
				  if(mobileString == 'iPhone') {	
						let redirect_location = 'nihtandemo';
						switch(window.vendor_id) {
							case 2 :
								redirect_location = 'ssangssang';
								break;
							case 4 :
								redirect_location = 'galaxy';
								break;
							default:
								redirect_location = 'nihtandemo';
						}
						
						window.webkit.messageHandlers.observe.postMessage(window.vendor_id); 
					  document.location = `${redirect_location}://bluefrog?verdorname=${window.vendor_id}`;
				  }
				  else {
						location.assign(redirect);
				  }
				}).fail(function(){
					clickedYes = false;
				});
				break;

				default: 
					this.visible = false;
					$("#popup-logout").hide();
					break;
			}
		});

		this.stage.addEventListener('click', (e) => {
			if(!e.target.name) return;
			if(e.target.name == "overlay") {
				this.visible = false;
				$("#popup-logout").hide();
				this.modalYesBg.graphics.beginFill("#68A12E").drawRoundRectComplex(0,0,280,70,0,0,8,0);
			}
		});
	},
	detectmob() {
		if( navigator.userAgent.match(/Android/i))
		{
			return 'Android';
		}else if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i))
		{
			return 'iPhone';
		}else {
			return 'none';
		}
	},
}

export default {
	component_session
}