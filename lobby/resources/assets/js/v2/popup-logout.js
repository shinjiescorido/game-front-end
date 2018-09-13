let component_confirmation = {
	type : "redirect_casino",
	main() {

		$('#logout-no').click(function() {
			$('.popup-mb-container').css({'top': ''}).hide()
		  $('#popup-logout').hide()
			$('#logout-yes').css({'background' : ''})
		});

		let _this = this;

		$('#logout-yes').click(function() {
			$('#logout-yes').css({'background' : '#999999'})
			console.log("crash", _this.type);
			switch(_this.type)
			{
				case ("redirect_casino"):
				$.post('/logout', { mobile : true }, (redirect) => {

					if(window.nonInstall) { //not app
						document.location = `${redirect}`;
					} else { //mobile app
						var mobileString = _this.detectmob();
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

						}else {
							location.assign(redirect);
						}
					}

				}).fail(function(){
					// clickedYes = false;
				});
				break;

				default:
				// this.visible = false;
				$("#popup-logout").hide();
				$('.popup-mb-container').css({'top': ''}).hide()
				break;
			}
		});
	  // var c = document.createElement("canvas");
    // c.setAttribute("id", "popup-logout");
    // c.setAttribute("width", "1280px");
    // c.setAttribute("height", "930px");
    // c.setAttribute("style", "position: absolute;top: 96px;display:none; z-index:999");
		//
		//
	  // $(".container").append(c);
		//
		// this.stage = new createjs.Stage("popup-logout");
    // createjs.Touch.enable(this.stage);
		//
    // if (window.nonInstall) {
		// 	if (window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
		// 		c.setAttribute("width", "930px");
		// 		c.setAttribute("height", "1280px");
		// 		$(c).css({
		// 			position : 'absolute',
		// 			transform: 'rotate(-90deg)',
		// 			top  : '-78px',
		// 			left:  '175px'
		// 		});
		// 		this.stage.x = 950;
		// 		this.stage.rotation = 90;
		// 	} else {
		// 		c.setAttribute("width", "1280px");
		// 		c.setAttribute("height", "930px");
		// 		$(c).css({
		// 			position : 'absolute',
		// 			transform: '',
		// 			top  : '96px',
		// 			left:  ''
		// 		});
		// 		this.stage.x = 0;
		// 		this.stage.rotation = 0;
		// 	}
		// } //nonInstall
		// window.addEventListener("resize", () => {
		// 	if (window.nonInstall) {
		// 		if (window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
		// 			c.setAttribute("width", "930px");
		// 			c.setAttribute("height", "1280px");
		// 			$(c).css({
		// 				position : 'absolute',
		// 				transform: 'rotate(-90deg)',
		// 				top  : '-78px',
		// 				left:  '175px'
		// 			});
		// 			this.stage.x = 950;
		// 			this.stage.rotation = 90;
		// 		} else {
		// 			c.setAttribute("width", "1280px");
		// 			c.setAttribute("height", "930px");
		// 			$(c).css({
		// 				position : 'absolute',
		// 				transform: '',
		// 				top  : '96px',
		// 				left:  ''
		// 			});
		// 			this.stage.x = 0;
		// 			this.stage.rotation = 0;
		// 		}
		// 	} //nonInstall
		//
		// 	console.log("this.stage",this.stage);
		// })
		//
		//
		// this.overlayBg = new createjs.Shape();
		// this.overlayBg.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0,0,1280,638);
		// this.overlayBg.x = 0;
		// this.overlayBg.y = 0;
		// this.overlayBg.name = "overlay";
		// this.stage.addChild(this.overlayBg);
		//
		// this.modalBg = new createjs.Bitmap(this.context.load.getResources("modal_bg"));
		// this.modalBg.scaleX = this.modalBg.scaleY = 0.499;
		// this.modalBg.x = 360;
		// this.modalBg.y = 100;
		// this.stage.addChild(this.modalBg);
		//
		// let nihtanLogo = new createjs.Bitmap(this.context.load.getResources("modal_nihtan_logo"));
		// nihtanLogo.x = this.modalBg.x + 160;
		// nihtanLogo.y = this.modalBg.y + 50;
		// nihtanLogo.scaleY = nihtanLogo.scaleX = 0.499;
		// this.stage.addChild(nihtanLogo);
		//
		// this.mainText = new createjs.Text(window.language.modal.exitnihtancaps,'bold 30px Lato',"#ffffff");
		// this.mainText.x = this.modalBg.x + 280;
		// this.mainText.y = this.modalBg.y + 108;
		// this.mainText.textAlign = 'center';
		// this.stage.addChild(this.mainText);
		//
		// this.subText1 = new createjs.Text(window.language.modal.redirectcasino,'bold 21px Lato',"#ffffff");
		// this.subText1.x = this.mainText.x;
		// this.subText1.y = this.mainText.y + 50;
		// this.subText1.textAlign = 'center';
		// this.stage.addChild(this.subText1);
		//
		// this.subText2 = new createjs.Text(window.language.modal.redirectcontinue,'bold 21px Lato',"#ffffff");
		// this.subText2.x = this.subText1.x;
		// this.subText2.y = this.subText1.y + 30;
		// this.subText2.textAlign = 'center';
		// this.stage.addChild(this.subText2);
		//
		// this.modalNoBg = new createjs.Shape();
		// this.modalNoBg.graphics.beginFill("#D32F2E").drawRoundRectComplex(0,0,279,70,0,0,0,8);
		// this.modalNoBg.x = this.modalBg.x + 3;
		// this.modalNoBg.y = this.modalBg.y + 231.5;
		// this.modalNoBg.cursor = 'pointer';
		// this.stage.addChild(this.modalNoBg);
		//
		// this.noText = new createjs.Text(window.language.modal.promptnocaps,'bold 30px Lato',"#fff");
		// this.noText.x = this.modalNoBg.x + 140;
		// this.noText.y = this.modalNoBg.y + 17;
		// this.noText.hitArea = this.modalNoBg;
		// this.noText.textAlign = 'center';
		// this.stage.addChild(this.noText);
		//
		// this.modalYesBg = new createjs.Shape();
		// this.modalYesBg.graphics.beginFill("#68A12E").drawRoundRectComplex(0,0,279,70,0,0,8,0);
		// this.modalYesBg.x = this.modalBg.x + 281;
		// this.modalYesBg.y = this.modalBg.y + 231.5;
		// this.modalYesBg.cursor = 'pointer';
		// this.stage.addChild(this.modalYesBg);
		//
		// this.yesText = new createjs.Text(window.language.modal.promptyescaps,'bold 30px Lato',"#fff");
		// this.yesText.x = this.modalYesBg.x + 140;
		// this.yesText.y = this.modalYesBg.y + 17;
		// this.yesText.hitArea = this.modalYesBg;
		// this.yesText.textAlign = 'center';
		// this.stage.addChild(this.yesText);
		//
		// this.modalYesBg.addEventListener('mousedown', () => {
		// 	this.modalYesBg.graphics.beginFill("#999999").drawRoundRectComplex(0,0,280,70,0,0,8,0);
		// });

		// let clickedYes = false;
		// this.modalYesBg.addEventListener('click', (e) => {
		// 	if(clickedYes) return;
		// 	clickedYes = true;
		//
		// 	switch(this.type)
		// 	{
		// 		case ("redirect_casino"):
		//
		//
		// 		$.post('/logout', { mobile : true }, (redirect) => {
		//
		// 			if(window.nonInstall) { //not app
		// 				document.location = `${redirect}`;
		// 			} else { //mobile app
		// 				var mobileString = this.detectmob();
		// 			  if(mobileString == 'iPhone') {
		// 					let redirect_location = 'nihtandemo';
		// 					switch(window.vendor_id) {
		// 						case 2 :
		// 						redirect_location = 'ssangssang';
		// 						break;
		// 						case 4 :
		// 						redirect_location = 'galaxy';
		// 						break;
		// 						default:
		// 						redirect_location = 'nihtandemo';
		// 					}
		//
		// 					window.webkit.messageHandlers.observe.postMessage(window.vendor_id);
		//
		// 					document.location = `${redirect_location}://bluefrog?verdorname=${window.vendor_id}`;
		//
		// 				}else {
		// 					location.assign(redirect);
		// 				}
		// 			}
		//
		// 		}).fail(function(){
		// 			clickedYes = false;
		// 		});
		// 		break;
		//
		// 		default:
		// 		this.visible = false;
		// 		$("#popup-logout").hide();
		// 		break;
		// 	}
		// });



		// this.modalNoBg.addEventListener('click', (e) => {
		// 	this.visible = false;
		// 		$("#popup-logout").hide();
		// 	this.modalYesBg.graphics.beginFill("#68A12E").drawRoundRectComplex(0,0,280,70,0,0,8,0);
		// });
		//
		// this.stage.addEventListener('click', (e) => {
		// 	if(!e.target.name) return;
		// 	if(e.target.name == "overlay")
		// 	{
		// 		this.visible = false;
		// 		$("#popup-logout").hide();
		// 		this.modalYesBg.graphics.beginFill("#68A12E").drawRoundRectComplex(0,0,280,70,0,0,8,0);
		// 	}
		// });
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
			// this.visible = true;
			$("#popup-logout").show();
			this.type = "redirect_casino";

			//if use custom redirect texts provided for different vendor; else use translations
			if(window.config.language == "korea"){

				if(window.vendor_id == 2){
					$('#logout-msg').text = "쌍쌍 홈페이지로 이동하시겠습니까?";
				   }
				   else if(window.vendor_id == 4){
					$('#logout-msg').text = "갤럭시 홈페이지로 이동하시겠습니까?";
				   }
				   else{
					$('#logout-msg').text = "게임을 종료 하시겠습니까?";
				   }

					// this.mainText.text = "";
					// this.subText2.text = "";
			}


			else if(window.vendor_id != 2 && window.vendor_id != 4){

				if(window.config.language == "chinese")
				{
					$('#logout-msg').text = "您想退出吗？";
				}
				else if(window.config.language == "japan")
				{
					$('#logout-msg').text = "ゲームを終了しますか?";
				}
				else if(window.config.language == "english")
				{
					$('#logout-msg').text = "Do you want to exit?";
				}
				// this.mainText.text = "";
				// this.subText2.text = "";
			}

			else{
				// this.mainText.text = window.language.modal.exitnihtancaps;
				$('#logout-msg').text = window.language.modal.redirectcasino;
				// this.subText2.text = window.language.modal.redirectcontinue;
			}


			// this.noText.text = window.language.modal.promptnocaps;
			// this.yesText.text = window.language.modal.promptyescaps;
		}
}

export default {
	component_confirmation
}
