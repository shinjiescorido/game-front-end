/**
 * menu.js
 * @author Kevin Villanueva
 * @since 2017.05.01
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 * Handles all right menu functionalities
**/

export default () => {

	let g_modalActive = '';

	return new blu.Component({
		menu: [],
		menu_label: [],
		theme: window.theme,
		main() {

			// this.toggled = false;
			// this.sub_toggled = false;
			// this.hd_toggled = false;
			// let width = 100;

			// this.cache(0,0,this.context.context.width,300)

			// let exit_spritesheet_data = {
			// 	images: [this.context.getResources("exit-menu-"+this.theme)],
			// 	frames: {width:104,height:124},
			// 	animations: {
			// 		"up": [0],
			// 		"clicked" : [1],
			// 	}
			// }

			// let exit_spriteSheet = new createjs.SpriteSheet(exit_spritesheet_data);
			// this.exitMenu = new createjs.Sprite(exit_spriteSheet,"up");
			// this.exitMenu.x = -2;
			// this.exitMenu.y = -2;
			// this.addChild(this.exitMenu);

			// this.exitText = new createjs.Text(window.language.menu.exit.toUpperCase(), window.language.locale == "zh" ? "26px Lato, arial" : "20px Lato, arial" , this.context.theme_color[window.theme].menu_text_color);
			// this.exitText.set({textAlign:'center', textBaseline: 'middle', x:46, y: 90});
			// this.addChild(this.exitText);

			// this.exitHit = new createjs.Shape();
			// this.exitHit.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0, 0, 104, 124);
			// this.exitHit.alpha = 0.01;
			// this.addChild(this.exitHit);
			// this.exitHit.x = this.exitMenu.x;
			// this.exitHit.y = this.exitMenu.y;

			// //let self = this;
			// this.exitHit.addEventListener("mousedown", (e) => {
			// 	this.exitMenu.gotoAndStop("clicked");
			// 	this.updateCache();
			// 	var mobileString = this.detectmob();
			// 	if(mobileString == 'iPhone')
			// 	{
			// 		try{
			// 			window.webkit.messageHandlers.observe.postMessage('nihstopbutton,')
			// 		} catch(e) {
			// 			// not using ios device
			// 		}
			// 	}
			// 	if(window.lobby_type == 'integrated'){
   //        window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
   //      } else {
   //      	if (window.nonInstall) {
   //      		window.location.href = window.lobby_domain+'non?game=true';
   //      	}
   //      	else {
			// 			window.location.href = window.lobby_domain+'m?game=true';
   //      	}
   //      }
			// });

			// //Toggle button
			// let toggle_spritesheet_data = {
			// 	images: [this.context.getResources("toggle-menu")],
			// 	frames: {width:76,height:76},
			// 	animations: {
			// 		"up": [0],
			// 		"clicked": [1]
			// 	}
			// }

			// let toggle_spriteSheet = new createjs.SpriteSheet(toggle_spritesheet_data);
			// this.toggleMenu = new createjs.Sprite(toggle_spriteSheet,"up");
			// this.toggleMenu.x = this.context.stage.baseWidth - 115;
			// this.toggleMenu.y = 5;
			// this.addChild(this.toggleMenu);

			// //Toggle events
			// this.toggleMenu.addEventListener("mousedown", (e) => {
   // 			this.setToggleMenu();
			// 	e.target.gotoAndStop("clicked");
 		// 	});

			// // Video refresh button
			// let refresh_spritesheet_data = {
			// 	images: [this.context.getResources("videoRefresh-menu-"+this.theme)],
			// 	frames: {width:80,height:80},
			// 	animations: {
			// 		"up": [0],
			// 		"clicked" : [1],
			// 		"hover" : [2]
			// 	}
			// }


			// let refresh_spriteSheet = new createjs.SpriteSheet(refresh_spritesheet_data);
			// this.refreshMenu = new createjs.Sprite(refresh_spriteSheet,"up");
			// this.refreshMenu.x = this.context.stage.baseWidth - 207;
			// this.refreshMenu.y = 3;
			// this.refreshMenu.name = "videoRefresh-menu-"+this.theme;
			// this.addChild(this.refreshMenu);

			// this.refreshMenu.addEventListener("mousedown", (e) => {
			// 	e.target.gotoAndStop("clicked");
			//   this.menuClick(e.target.name);
 		// 	});
			// this.refreshMenu.addEventListener("pressup", (e) => {
			// 	e.target.gotoAndStop("up");
			// });

			// let refreshVid_spritesheet_data = {
			// 	images: [this.context.getResources("refreshVideo-menu-"+this.theme)],
			// 	frames: {width:80,height:80},
			// 	animations: {
			// 		"up": [0],
			// 		"clicked" : [1],
			// 		"hover" : [2]
			// 	}
			// }

			// let refreshVid_spriteSheet = new createjs.SpriteSheet(refreshVid_spritesheet_data);
			// this.refreshSubMenu = new createjs.Sprite(refreshVid_spriteSheet,"up");
			// this.refreshSubMenu.x = this.context.stage.baseWidth - 290;
			// this.refreshSubMenu.y = 3;
			// this.refreshSubMenu.alpha = 0;
			// this.refreshSubMenu.name = "refreshVideo-menu-"+this.theme;
			// this.addChild(this.refreshSubMenu);

			// this.refreshSubMenu.addEventListener("mousedown", (e) => {
			// 	e.target.gotoAndStop("clicked");
			//   this.updateCache();

			//   if (window.nonInstall) {
			//   	let vidQuality = this.hd_toggled == true ? 'HD' : 'SD';
			//   	this.context.setVideo(vidQuality);
			//   }
			//   else {
			//   	this.menuClick(e.target.name);
			//   }
 		// 	});
			// this.refreshSubMenu.addEventListener("pressup", (e) => {
			// 	e.target.gotoAndStop("up");
			// 	this.updateCache();
			// });

			// let hdVid_spritesheet_data = {
			// 	images: [this.context.getResources("hdVideo-menu-"+this.theme)],
			// 	frames: {width:80,height:80},
			// 	animations: {
			// 		"up": [0],
			// 		"clicked" : [1],
			// 		"hover" : [2]
			// 	}
			// }

			// let hdVid_spriteSheet = new createjs.SpriteSheet(hdVid_spritesheet_data);
			// this.hdSubMenu = new createjs.Sprite(hdVid_spriteSheet,"up");
			// this.hdSubMenu.x = this.context.stage.baseWidth - 290;
			// this.hdSubMenu.y = 3;
			// this.hdSubMenu.alpha = 0;
			// this.hdSubMenu.name = "hdVideo-menu-"+this.theme;
			// this.hdSubMenu.visible = false;
			// this.addChild(this.hdSubMenu);

			// this.hdSubMenu.addEventListener("mousedown", (e) => {
			// 	e.target.gotoAndStop("clicked");
			//   this.updateCache();
			//   if (!window.nonInstall) this.menuClick(e.target.name);
 		// 	});
			// this.hdSubMenu.addEventListener("pressup", (e) => {
			// 	e.target.gotoAndStop("up");
			// 	this.toggleVid();
			// 	this.updateCache();

			// 	if (window.nonInstall) this.context.setVideo('HD');
			// });

			// let sdVid_spritesheet_data = {
			// 	images: [this.context.getResources("sdVideo-menu-"+this.theme)],
			// 	frames: {width:80,height:80},
			// 	animations: {
			// 		"up": [0],
			// 		"clicked" : [1],
			// 		"hover" : [2]
			// 	}
			// }

			// let sdVid_spriteSheet = new createjs.SpriteSheet(sdVid_spritesheet_data);
			// this.sdSubMenu = new createjs.Sprite(sdVid_spriteSheet,"up");
			// this.sdSubMenu.x = this.context.stage.baseWidth - 290;
			// this.sdSubMenu.y = 3;
			// this.sdSubMenu.alpha = 0;
			// this.sdSubMenu.visible = false;
			// this.sdSubMenu.name = "sdVideo-menu-"+this.theme;
			// this.addChild(this.sdSubMenu);

			// //Refresh events
			// this.sdSubMenu.addEventListener("mousedown", (e) => {
			// 	e.target.gotoAndStop("clicked");
			//   this.updateCache();
			//   if (!window.nonInstall) this.menuClick(e.target.name);
 		// 	});
			// this.sdSubMenu.addEventListener("pressup", (e) => {
			// 	e.target.gotoAndStop("up");
			// 	this.toggleVid();
			// 	this.updateCache();

			// 	if (window.nonInstall) this.context.setVideo('SD');
			// });

			// // Set active quality
			// if (window.config.video == 'HD') {
			// 	this.sdSubMenu.visible = true;
			// 	this.hd_toggled = true;
			// }
			// else {
			// 	this.hdSubMenu.visible = true;
			// 	this.hd_toggled = false;
			// }

			// // Other menu
			// let menu_names = ["settings-menu-"+this.theme, "modifyChips-menu-"+this.theme, "betRecords-menu-"+this.theme, "playerInfo-menu-"+this.theme, "howto-menu-"+this.theme];

			// for(var x = 0; x < menu_names.length; x++) {
			// 	let menu_spritesheet_data = {
			// 		images: [this.context.getResources([menu_names[x]])],
			// 		frames: {width:76,height:76},
			// 		animations: {
			// 			"up": [0],
			// 			"clicked" : [1],
			// 			"hover" : [2]
			// 		}
			// 	}

			// 	let menu_spriteSheet = new createjs.SpriteSheet(menu_spritesheet_data);
			// 	this.menu[x] = new createjs.Sprite(menu_spriteSheet,"up");
			// 	this.menu[x].scaleX = this.menu[x].scaleY = 1;
			// 	this.menu[x].x = this.context.stage.baseWidth - 115;
			// 	this.menu[x].y = 5;
			// 	this.menu[x].name = menu_names[x];
			// 	this.menu[x].alpha = 0;
			// 	this.addChild(this.menu[x]);

			// 	this.menu[x].addEventListener("mousedown", (e) => {
   //   			e.target.gotoAndStop("clicked")
			// 		this.menuClick(e.target.name);
			// 		this.updateCache();
   // 			 });
			// 	this.menu[x].addEventListener("pressup", (e) => {
			// 		e.target.gotoAndStop("up")
			// 		this.updateCache();
			// 	});
			// } //end for loop

			// this.updateCache();
		},

		toggleVid() {
			// this.hd_toggled = !this.hd_toggled;
			// this.sdSubMenu.visible = this.hd_toggled;
			// this.hdSubMenu.visible = !this.hd_toggled;
		},

		cloneMenu(new_theme){
			// let menuCon = new createjs.Container();
			// //Toggle button
			// let toggle_spritesheet_data = {
			// 	images: [this.context.getResources("toggle-menu")],
			// 	frames: {width:76,height:76},
			// 	animations: {
			// 		"up": [0],
			// 		"clicked": [1]
			// 	}
			// }

			// let toggle_spriteSheet = new createjs.SpriteSheet(toggle_spritesheet_data);
			// let toggleMenu = new createjs.Sprite(toggle_spriteSheet,"up");
			// toggleMenu.x = this.context.stage.baseWidth - 115;
			// toggleMenu.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);
			// toggleMenu.y = 5;
			// menuCon.addChild(toggleMenu);

			// // Video refresh button
			// let refresh_spritesheet_data = {
			// 	images: [this.context.getResources("videoRefresh-menu-"+new_theme)],
			// 	frames: {width:80,height:80},
			// 	animations: {
			// 		"up": [0],
			// 		"clicked" : [1],
			// 		"hover" : [2]
			// 	}
			// }


			// let refresh_spriteSheet = new createjs.SpriteSheet(refresh_spritesheet_data);
			// let refreshMenu = new createjs.Sprite(refresh_spriteSheet,"up");
			// refreshMenu.x = this.context.stage.baseWidth - 207;
			// refreshMenu.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);
			// refreshMenu.y = 3;
			
			// menuCon.addChild(refreshMenu);

			// return menuCon;
		},

		menuClick(buttonName) {
		/*	$('#canvasTextbox').hide();
			$(".howto-wrap").hide();
      $(".howto-wrap--accent").hide();
  		$(".arrow-up").hide();
  		if (window.nonInstall) {
				$('#volumeCircle').hide();
			}

			if(buttonName == 'exit-menu-'+window.theme+'') {
        if(window.lobby_type == 'integrated'){
          window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
        } else {
					if (window.nonInstall) {
        		window.location.href = window.lobby_domain+'non?game=true';
        	}
        	else {
						window.location.href = window.lobby_domain+'m?game=true';
        	}
        }
			}
			else if(buttonName == 'fullscreen-menu-'+this.theme+'') {
				screenfull.toggle();
			}
			else if(buttonName == "howto-menu-"+this.theme+"") {
				let toggle = this.toggleModal('howToPlay');
				if (toggle) {
					g_modalActive = 'howToPlay';
					this.showMenuModal('howToPlay');
					$(".howto-wrap").show()
          $(".-gamerules").show();
				}
				else {
					this.context.component_howToPlay.visible = false;
					$(".howto-wrap").hide();
          $(".howto-wrap--accent").hide();
    			$(".arrow-up").hide()
        	$(".-gamerules").hide();
        	$(".-gameplay").hide();
				} // end if
			}
			else if(buttonName == 'videoRefresh-menu-'+this.theme+'') {
				g_modalActive = 'videoRefresh';
				this.showMenuModal('videoRefresh');
			}
			else if(buttonName == 'refreshVideo-menu-'+this.theme+'') {
				// document.location = 'nihrebutton://bluefrog';
				g_modalActive = 'refreshVideo';
				this.showMenuModal('refreshVideo');
				this.startMyApp();
			}
			else if(buttonName == 'hdVideo-menu-'+this.theme+'') {
				g_modalActive = 'hdVideo';
				this.showMenuModal('hdVideo');
			}
			else if(buttonName == 'sdVideo-menu-'+this.theme+'') {
				g_modalActive = 'sdVideo';
				this.showMenuModal('sdVideo');
			}
			else if(buttonName == 'playerInfo-menu-'+this.theme+'') {
				let toggle = this.toggleModal('playerInfo');
				if (toggle) {
					g_modalActive = 'playerInfo';
					this.showMenuModal('playerInfo');
				}
				else {
					this.context.component_menuPlayerInfo.visible = false;
				} // end if
			}
			else if(buttonName == 'betRecords-menu-'+this.theme+'') {
				let toggle = this.toggleModal('betRecords');
				if (toggle) {
					g_modalActive = 'betRecords';
					this.showMenuModal('betRecords');
				}
				else {
					this.context.component_betRecords.visible = false;
				} // end if
			}
			else if(buttonName == 'transfer-menu-'+this.theme+'') {
				let toggle = this.toggleModal('transferFunds');
				if (toggle) {
					g_modalActive = 'transferFunds';
					this.showMenuModal('transferFunds');
					$('#transferFunds').show();
				}
				else {
					this.context.component_transfer.visible = false;
					$('#canvasTextbox').hide();
					$('#transferFunds').hide();
				} // end if
			}
			else if(buttonName == 'modifyChips-menu-'+this.theme+'') {
				let toggle = this.toggleModal('modifyChips');
				if (toggle) {
					g_modalActive = 'modifyChips';
					this.showMenuModal('modifyChips');

					this.context.component_menuChips.reInitChips();
				}
				else {
					this.context.component_menuChips.visible = false;
				} // end if
			}
			else if(buttonName == 'settings-menu-'+this.theme+'') {
				let toggle = this.toggleModal('settings');
				if (toggle) {
					g_modalActive = 'settings';
					this.showMenuModal('settings');
				}
				else {
					this.context.component_settings.visible = false;
				} // end if
			} //end if*/
		},

		toggleModal(modalName) {
			// if(g_modalActive != '') {
			// 	if (g_modalActive == modalName) {
			// 		g_modalActive = '';
			// 		return false;
			// 	}else{
			// 		g_modalActive = '';
			// 		return true;
			// 	}
			// }
			// else {
			// 	return true;
			// } // end if
		},
		setActiveModal() {
			// g_modalActive = '';
		},
		startMyApp () {
			 //  var mobileString = this.detectmob();

			 //  if(mobileString == 'Android')
			 //  {
			 //    if(typeof Android !== "undefined" && Android !== null)
			 //    {
			 //      Android.reflashVideo();
			 //    }
			 //  }else if(mobileString == 'iPhone') {
				// try{
				// 	window.webkit.messageHandlers.observe.postMessage('nihrebutton,');
				//   } catch(e) {
				// 	// not using ios device
				//   }
			 //  	document.location = 'nihrebutton://bluefrog';
			 //  }
			 //  else{

			 //  }
		},
		detectmob() {
			 // if( navigator.userAgent.match(/Android/i))
			 // {
			 //    return 'Android';
			 // }else if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i))
			 // {
			 //    return 'iPhone';
			 // }else {
			 //    return 'none';
			 // }
		},
		showMenuModal(btnName) {
			// this.hideAllModal(false);
			// switch(btnName) {
   //    	case "howToPlay":
			// 		this.context.component_howToPlay.visible = true;
			// 		this.context.component_howToPlay.reInitTab();
   //    		break

   //    	case "playerInfo":
			// 		this.context.component_menuPlayerInfo.visible = true;
   //    		break

   //    	case "betRecords":
			// 		this.context.component_betRecords.visible = true;
			// 		this.context.component_betRecords.initRecords('transferlogs');
   //    		break

   //    	case "modifyChips":
			// 		this.context.component_menuChips.visible = true;
   //    		break

   //    	case "settings":
			// 		this.context.component_settings.visible = true;

			// 		if (window.nonInstall) {
			// 			$('#volumeCircle').show();
			// 		}
   //    		break

			// 	case "videoRefresh":
			// 		this.uncache();
			// 		this.sub_toggled = !this.sub_toggled;

			// 		let subCoor = 3;
			// 		let alpha = 0;
			// 		if(this.sub_toggled)
			// 		{
			// 			subCoor = 80;
			// 			alpha = 1;
			// 		}
					
			// 		createjs.Tween.get(this.refreshSubMenu, {loop: false})
			// 			.to({ y: 3, alpha : alpha }, 100)
			// 			.call(() => {
			// 				this.refreshSubMenu.gotoAndStop("up");
			// 				this.cache(0,0,this.context.context.width,300)
			// 			});

			// 		createjs.Tween.get(this.hdSubMenu, {loop: false})
			// 			.to({ y: subCoor, alpha : alpha }, 100)
			// 			.call(() => {
			// 				this.hdSubMenu.gotoAndStop("up");
			// 				this.cache(0,0,this.context.context.width,300)
			// 			});

			// 		createjs.Tween.get(this.sdSubMenu, {loop: false})
			// 			.to({ y: subCoor , alpha : alpha }, 100)
			// 			.call(() => {
			// 				this.sdSubMenu.gotoAndStop("up");
			// 				this.cache(0,0,this.context.context.width,300)
			// 			});
			// 		break
				
			// 	case "hdVideo":
			// 		try {
			// 			if (this.detectmob() == 'iPhone') {
			// 				window.webkit.messageHandlers.observe.postMessage('highvideoplayer,');
			// 			}
			// 			else {
			// 				window.Android.highvideoplayer();						
			// 			}
			// 		}
			// 		catch(err) {
			// 			console.log(err.message);
			// 		}

			// 		setTimeout(() => { this.showMenuModal('videoRefresh') }, 100);
			// 		break

			// 	case "sdVideo":
			// 		try {
			// 			if (this.detectmob() == 'iPhone') {
			// 				window.webkit.messageHandlers.observe.postMessage('lowvideoplayer,');
			// 			}
			// 			else {
			// 				window.Android.lowvideoplayer();				
			// 			}
			// 		}
			// 		catch(err) {
			// 			console.log(err.message);
			// 		}
			// 		setTimeout(() => { this.showMenuModal('videoRefresh') }, 100);
			// 		break
   //    };
		},

		hideAllModal(hideAll){
			// if (hideAll) {
			// 	g_modalActive = '';
			// }

			// this.context.component_howToPlay.visible = false;
			// this.context.component_menuPlayerInfo.visible = false;
			// this.context.component_betRecords.visible = false;
			// this.context.component_transfer.visible = false;
			// this.context.component_menuChips.visible = false;
			// this.context.component_settings.visible = false;

			// //Hide DOM elements
			// $('#canvasTextbox').hide();
			// $(".howto-wrap").hide();
   //    $(".howto-wrap--accent").hide();
  	// 	$(".arrow-up").hide();

  	// 	if (window.nonInstall) {
			// 	$('#volumeCircle').hide();
			// }
		},
		setToggleMenu() {
			// this.uncache();

			// let coordinate;
			// let alpha;
			// let refreshCoor;
			// let subCoor;

			// for (var i = 0; i < this.menu.length; i++) {
			// 	if (this.toggled) {
			// 		alpha = 0;
			// 		coordinate = this.context.stage.baseWidth - 115;
			// 	}
			// 	else {
			// 		alpha = 1;
			// 		coordinate = (this.context.stage.baseWidth - 205) - (90 * i);
			// 	} //end if

			// 	// Animate menu
			// 	createjs.Tween.get(this.menu[i], {loop: false})
   //        .to({
   //        	alpha: alpha,
   //        	x: coordinate
   //        }, 100)
   //        .call(() => {
		 //      	//Update cache
			// 			this.cache(0,0,this.context.context.width,300)
		 //      });
			// } //end for loop


			// if (this.toggled) {
			// 	refreshCoor = this.context.stage.baseWidth - 205;
			// 	subCoor =  this.context.stage.baseWidth - 290;
			// 	this.toggled = false;
			// 	this.hideAllModal(true);
			// }
			// else {
			// 	refreshCoor = (this.context.stage.baseWidth - 205) - (90 * this.menu.length);
			// 	subCoor = (this.context.stage.baseWidth - 290) - (90 * this.menu.length);
			// 	this.toggled = true;
			// } //end if

			// // Animate refresh button
			// createjs.Tween.get(this.refreshMenu, {loop: false})
   //      .to({ x: refreshCoor }, 100)
   //      .call(() => {
			// 		this.toggleMenu.gotoAndStop("up");
   //      });
			// createjs.Tween.get(this.refreshSubMenu, {loop: false})
   //      .to({ x: subCoor }, 100)
   //      .call(() => {
			// 		this.refreshSubMenu.gotoAndStop("up");
   //      });
			// createjs.Tween.get(this.hdSubMenu, {loop: false})
   //      .to({ x: subCoor }, 100)
   //      .call(() => {
			// 		this.hdSubMenu.gotoAndStop("up");
   //      });
			// createjs.Tween.get(this.sdSubMenu, {loop: false})
   //      .to({ x: subCoor }, 100)
   //      .call(() => {
			// 		this.sdSubMenu.gotoAndStop("up");
   //      });
		},
		changeExitTheme(new_theme) {
			// let exit_spritesheet_data = {
			// 	images: [this.context.getResources("exit-menu-"+new_theme)],
			// 	frames: {width:104,height:124},
			// 	animations: {
			// 		"up": [0],
			// 		"clicked" : [1],
			// 	}
			// }

			// let exit_spriteSheet = new createjs.SpriteSheet(exit_spritesheet_data);
			// this.exitMenu.spriteSheet = exit_spriteSheet;
			// this.exitMenu.gotoAndStop("up");
			// this.cache(0,0,this.context.context.width,300);
		},

		changeTheme(new_theme) {
			// this.theme = new_theme;

			// this.exitText.color = this.context.theme_color[new_theme].menu_text_color;
			
			// // Video refresh button
			// let refresh_spritesheet_data = {
			// 	images: [this.context.getResources("videoRefresh-menu-"+new_theme)],
			// 	frames: {width:80,height:80},
			// 	animations: {
			// 		"up": [0],
			// 		"clicked" : [1],
			// 		"hover" : [2]
			// 	}
			// }

			// let refresh_spriteSheet = new createjs.SpriteSheet(refresh_spritesheet_data);
			// this.refreshMenu.spriteSheet = refresh_spriteSheet;
			// this.refreshMenu.gotoAndStop("up");
			// this.refreshMenu.name = "videoRefresh-menu-"+new_theme;

			// let refreshVid_spritesheet_data = {
			// 	images: [this.context.getResources("refreshVideo-menu-"+new_theme)],
			// 	frames: {width:80,height:80},
			// 	animations: {
			// 		"up": [0],
			// 		"clicked" : [1],
			// 		"hover" : [2]
			// 	}
			// }

			// let refreshVid_spriteSheet = new createjs.SpriteSheet(refreshVid_spritesheet_data);
			// this.refreshSubMenu.spriteSheet = refreshVid_spriteSheet;
			// this.refreshSubMenu.gotoAndStop("up");
			// this.refreshSubMenu.name = "refreshVideo-menu-"+new_theme;

			// let hdVid_spritesheet_data = {
			// 	images: [this.context.getResources("hdVideo-menu-"+new_theme)],
			// 	frames: {width:80,height:80},
			// 	animations: {
			// 		"up": [0],
			// 		"clicked" : [1],
			// 		"hover" : [2]
			// 	}
			// }

			// let hdVid_spriteSheet = new createjs.SpriteSheet(hdVid_spritesheet_data);
			// this.hdSubMenu.spriteSheet = hdVid_spriteSheet;
			// this.hdSubMenu.gotoAndStop("up");
			// this.hdSubMenu.name = "hdVideo-menu-"+new_theme;

			// let sdVid_spritesheet_data = {
			// 	images: [this.context.getResources("sdVideo-menu-"+new_theme)],
			// 	frames: {width:80,height:80},
			// 	animations: {
			// 		"up": [0],
			// 		"clicked" : [1],
			// 		"hover" : [2]
			// 	}
			// }

			// let sdVid_spriteSheet = new createjs.SpriteSheet(sdVid_spritesheet_data);
			// this.sdSubMenu.spriteSheet = sdVid_spriteSheet;
			// this.sdSubMenu.gotoAndStop("up");
			// this.sdSubMenu.name = "sdVideo-menu-"+new_theme;
			
			// // Other menu
			// let menu_names = ["settings-menu-"+new_theme, "modifyChips-menu-"+new_theme, "betRecords-menu-"+new_theme, "playerInfo-menu-"+new_theme, "howto-menu-"+new_theme];
			
			// for(var x = 0; x < menu_names.length; x++) {
			// 	let menu_spritesheet_data = {
			// 		images: [this.context.getResources([menu_names[x]])],
			// 		frames: {width:76,height:76},
			// 		animations: {
			// 			"up": [0],
			// 			"clicked" : [1],
			// 			"hover" : [2]
			// 		}
			// 	}

			// 	let menu_spriteSheet = new createjs.SpriteSheet(menu_spritesheet_data);
			// 	this.menu[x].spriteSheet = menu_spriteSheet;
			// 	this.menu[x].gotoAndStop("up");
			// 	this.menu[x].name = menu_names[x];
			// } //end for loop

			// this.context.component_howToPlay.changeTheme(new_theme);
			// this.context.component_menuPlayerInfo.changeTheme(new_theme);
			// this.context.component_betRecords.changeTheme(new_theme);
			// this.context.component_menuChips.changeTheme(new_theme);
			// this.context.component_settings.changeTheme(new_theme);

			// this.updateCache();
			
		}
	})
}
