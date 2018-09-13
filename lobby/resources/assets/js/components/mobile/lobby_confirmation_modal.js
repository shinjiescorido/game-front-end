import { numberCounter, playSound, numberWithCommas } from '../../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({

		type : "redirect_casino",
		main() {
			// this.y = 72;

			this.visible = false;

			this.overlayBg = new createjs.Shape();
			this.overlayBg.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0,0,1280,638);
			this.overlayBg.x = 0;
			this.overlayBg.y = 0;
			this.overlayBg.name = "overlay";
			this.addChild(this.overlayBg);
			
			// === sub header poker
			this.modalBg = new createjs.Bitmap(this.context.getResources("modal_bg"));
			//this.modalBg.graphics.beginFill("#E6E6E6").drawRoundRect(0,0,560,300,8);
			//this.modalBg.graphics.bitmap("#E6E6E6").drawRoundRect(0,0,560,300,8);
			this.modalBg.scaleX = this.modalBg.scaleY = 0.499;
			this.modalBg.x = 360;
			this.modalBg.y = 100;
			this.addChild(this.modalBg);

			let nihtanLogo = new createjs.Bitmap(this.context.getResources("modal_nihtan_logo"));
			nihtanLogo.x = this.modalBg.x + 160;
			nihtanLogo.y = this.modalBg.y + 50;
			nihtanLogo.scaleY = nihtanLogo.scaleX = 0.499;
			this.addChild(nihtanLogo);

			this.mainText = new createjs.Text(window.language.modal.exitnihtancaps,'bold 30px Lato',"#ffffff");
			this.mainText.x = this.modalBg.x + 280;
			this.mainText.y = this.modalBg.y + 108;
			this.mainText.textAlign = 'center';
			this.addChild(this.mainText);
			
			this.subText1 = new createjs.Text(window.language.modal.redirectcasino,'bold 21px Lato',"#ffffff");
			this.subText1.x = this.mainText.x;
			this.subText1.y = this.mainText.y + 50;
			this.subText1.textAlign = 'center';
			this.addChild(this.subText1);

			this.subText2 = new createjs.Text(window.language.modal.redirectcontinue,'bold 21px Lato',"#ffffff");
			this.subText2.x = this.subText1.x;
			this.subText2.y = this.subText1.y + 30;
			this.subText2.textAlign = 'center';
			this.addChild(this.subText2);

			this.modalNoBg = new createjs.Shape();
			this.modalNoBg.graphics.beginFill("#D32F2E").drawRoundRectComplex(0,0,279,70,0,0,0,8);
			this.modalNoBg.x = this.modalBg.x + 3;
			this.modalNoBg.y = this.modalBg.y + 231.5;
			this.modalNoBg.cursor = 'pointer'; 
			this.addChild(this.modalNoBg);

			this.noText = new createjs.Text(window.language.modal.promptnocaps,'bold 30px Lato',"#fff");
			this.noText.x = this.modalNoBg.x + 140;
			this.noText.y = this.modalNoBg.y + 17;
			this.noText.hitArea = this.modalNoBg;
			this.noText.textAlign = 'center';
			this.addChild(this.noText);

			this.modalYesBg = new createjs.Shape();
			this.modalYesBg.graphics.beginFill("#68A12E").drawRoundRectComplex(0,0,279,70,0,0,8,0);
			this.modalYesBg.x = this.modalBg.x + 281;
			this.modalYesBg.y = this.modalBg.y + 231.5;
			this.modalYesBg.cursor = 'pointer';
			this.addChild(this.modalYesBg);

			this.yesText = new createjs.Text(window.language.modal.promptyescaps,'bold 30px Lato',"#fff");
			this.yesText.x = this.modalYesBg.x + 140;
			this.yesText.y = this.modalYesBg.y + 17;
			this.yesText.hitArea = this.modalYesBg;
			this.yesText.textAlign = 'center';
			this.addChild(this.yesText);

			this.modalYesBg.addEventListener('mousedown', () => {
				this.modalYesBg.graphics.beginFill("#999999").drawRoundRectComplex(0,0,280,70,0,0,8,0);
			});

			let clickedYes = false;
			this.modalYesBg.addEventListener('click', (e) => {
				e.nativeEvent.preventDefault();
				//click once
				if(clickedYes) return;
				clickedYes = true;

				switch(this.type)
				{
					case ("redirect_casino"):
					

					$.post('/logout', { mobile : true }, (redirect) => {

						var mobileString = this.detectmob();
						
						  if(mobileString == 'iPhone')
						  {	
	
							let redirect_location = 'nihtandemo';
							switch(window.vendor_id)
							{
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
						  else
						  {
							location.assign(redirect);
						  }

					}).fail(function(){
						clickedYes = false;
					});
					break;

					default: 
					this.visible = false;
					break;
				}

			});

			this.modalNoBg.addEventListener('click', (e) => {
				e.nativeEvent.preventDefault();
				this.visible = false;
				this.modalYesBg.graphics.beginFill("#68A12E").drawRoundRectComplex(0,0,280,70,0,0,8,0);
			});

			this.addEventListener('click', (e) => {
				e.nativeEvent.preventDefault();
				if(!e.target.name) return;
				if(e.target.name == "overlay")
				{
					this.visible = false;
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

		redirectCasinoPage () {
			this.visible = true;
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

		// hideActive()
		// {
		// 	this.sub_header_allGames.normal(this.sub_header_allGames);
		// 	this.sub_header_baccarat.normal(this.sub_header_baccarat);
		// 	this.sub_header_sicbo.normal(this.sub_header_sicbo);
		// 	this.sub_header_poker.normal(this.sub_header_poker);
		// 	this.sub_header_dragonTiger.normal(this.sub_header_dragonTiger);

		// 	this.sub_header_allGames.clicked = false;
		// 	this.sub_header_baccarat.clicked = false;
		// 	this.sub_header_sicbo.clicked = false;
		// 	this.sub_header_poker.clicked = false;
		// 	this.sub_header_dragonTiger.clicked = false;
		// }
	});

	return instance;
}
