let component_confirmation = {
	type : "redirect_casino",
	stage:null,
	main () {
		var c = document.createElement("canvas");
		c.setAttribute("id", "popup-logout");
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

		this.stage = new createjs.Stage("popup-logout");

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
		
		this.subText1 = new createjs.Text(window.language.modal.redirectcasino,'bold 21px Lato',"#ffffff");
		this.subText1.x = this.mainText.x;
		this.subText1.y = this.mainText.y + 50;
		this.subText1.textAlign = 'center';
		this.container.addChild(this.subText1);
		// this.addChild(this.subText1);

		this.subText2 = new createjs.Text(window.language.modal.redirectcontinue,'bold 21px Lato',"#ffffff");
		this.subText2.x = this.subText1.x;
		this.subText2.y = this.subText1.y + 30;
		this.subText2.textAlign = 'center';
		this.container.addChild(this.subText2);

		this.modalNoBg = new createjs.Shape();
		this.modalNoBg.graphics.beginFill("#D32F2E").drawRoundRectComplex(0,0,279,70,0,0,0,8);
		this.modalNoBg.x = this.modalBg.x + 3;
		this.modalNoBg.y = this.modalBg.y + 231.5;
		this.modalNoBg.cursor = 'pointer'; 
		this.container.addChild(this.modalNoBg);

		this.noText = new createjs.Text(window.language.modal.promptnocaps,'bold 30px Lato',"#fff");
		this.noText.x = this.modalNoBg.x + 140;
		this.noText.y = this.modalNoBg.y + 17;
		this.noText.hitArea = this.modalNoBg;
		this.noText.textAlign = 'center';
		this.container.addChild(this.noText);

		this.modalYesBg = new createjs.Shape();
		this.modalYesBg.graphics.beginFill("#68A12E").drawRoundRectComplex(0,0,279,70,0,0,8,0);
		this.modalYesBg.x = this.modalBg.x + 281;
		this.modalYesBg.y = this.modalBg.y + 231.5;
		this.modalYesBg.cursor = 'pointer';
		this.container.addChild(this.modalYesBg);

		this.yesText = new createjs.Text(window.language.modal.promptyescaps,'bold 30px Lato',"#fff");
		this.yesText.x = this.modalYesBg.x + 140;
		this.yesText.y = this.modalYesBg.y + 17;
		this.yesText.hitArea = this.modalYesBg;
		this.yesText.textAlign = 'center';
		this.container.addChild(this.yesText);

		this.modalYesBg.addEventListener('mousedown', () => {
			this.modalYesBg.graphics.beginFill("#999999").drawRoundRectComplex(0,0,280,70,0,0,8,0);
		});

		let clickedYes = false;
		this.modalYesBg.addEventListener('click', (e) => {
			e.nativeEvent.preventDefault();
			this.modalYesBg.graphics.beginFill("#68A12E").drawRoundRectComplex(0,0,280,70,0,0,8,0);
			//click once
			if(clickedYes) return;
			clickedYes = true;

			switch(this.type)
			{
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

		this.modalNoBg.addEventListener('click', (e) => {
			e.nativeEvent.preventDefault();
			this.modalYesBg.graphics.beginFill("#68A12E").drawRoundRectComplex(0,0,280,70,0,0,8,0);
     		toggle.togglePopups("logout");
		});

		this.overlay.addEventListener('click', (e) => {
			console.log(e.target);
			this.modalYesBg.graphics.beginFill("#68A12E").drawRoundRectComplex(0,0,280,70,0,0,8,0);
			toggle.togglePopups("logout");	
		});	

	},

	redirectCasinoPage () {
		// this.visible = true;
		this.container.visible = true;
		this.type = "redirect_casino";
		
		//if use custom redirect texts provided for different vendor; else use translations
		if(window.config.language == "korea"){
			
			if(window.vendor_id == 2){
				this.subText1.text = "쌍쌍 홈페이지로 이동하시겠습니까?";
			   }
			   else if(window.vendor_id == 4){
				this.subText1.text = "갤럭시 홈페이지로 이동하시겠습니까?";
			   }
			   else{
				this.subText1.text = "게임을 종료 하시겠습니까?";
			   }	
			   
				this.mainText.text = "";
				this.subText2.text = ""; 
		}

		else if(window.vendor_id != 2 && window.vendor_id != 4){
			
			if(window.config.language == "chinese")
			{
				this.subText1.text = "您想退出吗？";
			}
			else if(window.config.language == "japan")
			{
				this.subText1.text = "ゲームを終了しますか?";
			}
			else if(window.config.language == "english")
			{
				this.subText1.text = "Do you want to exit?";
			}
			this.mainText.text = "";
			this.subText2.text = ""; 
		}

		else{
			this.mainText.text = window.language.modal.exitnihtancaps;
			this.subText1.text = window.language.modal.redirectcasino;
			this.subText2.text = window.language.modal.redirectcontinue;
		}

		
		this.noText.text = window.language.modal.promptnocaps;
		this.yesText.text = window.language.modal.promptyescaps;
	}
}
export default {
	component_confirmation
}