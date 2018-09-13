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
		main() {
			let width = 100;

			this.menu_background = new createjs.Shape();
			this.x = this.context.context.width - width;
			this.menu_background.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0, 0, width, this.context.context.height - 190);
			this.addChild(this.menu_background);

			// let menu_names = [
			// 	"exit-menu-"+window.theme,
			// 	"fullscreen-menu-"+window.theme,
			// 	"videoRefresh-menu-"+window.theme,
			// 	"howto-menu-"+window.theme,
			// 	"playerInfo-menu-"+window.theme,
			// 	"transferhist-menu-"+window.theme,
			// 	"bethist-menu-"+window.theme,
			// 	"gamehist-menu-"+window.theme,
			// 	"modifyChips-menu-"+window.theme,
			// 	"settings-menu-"+window.theme
			// ];
			//
			//
			// let menu_text = [
			// 	window.language.menu.exit,
			// 	window.language.menu.fullscreen,
			// 	window.language.menu.refreshvideo,
			// 	window.language.menu.howtoplay,
			// 	window.language.menu.playerinfo,
			// 	window.language.menu.transferlogs,
			// 	window.language.menu.betlogs,
			// 	window.language.menu.gamehistory,
			// 	window.language.menu.modifychips,
			// 	window.language.menu.settings
			// ];
			//
			// for(var x = 0;x<menu_names.length;x++) {
			// 	let menu_spritesheet_data = {
			// 		images: [this.context.getResources([menu_names[x]])],
			// 		frames: {width:100,height:87},
			// 		animations: {
			// 			"up": [0],
			// 			"hover" : [1],
			// 			"clicked" : [2]
			// 		}
			// 	}
			//
			// 	let menu_spriteSheet = new createjs.SpriteSheet(menu_spritesheet_data);
			// 	this.menu[x] = new createjs.Sprite(menu_spriteSheet,"up");
			// 	this.menu[x].scaleX = 1
			// 	this.menu[x].scaleY = 1.023
			// 	this.menu[x].y = x*this.menu[x].getTransformedBounds().height;
			// 	this.menu[x].name = menu_names[x];
      //   this.menu[x].cursor = 'pointer';
			// 	this.addChild(this.menu[x]);
			//
			// 	this.menu[x].addEventListener("click", (e) => {
			// 		e.target.gotoAndStop("clicked")
			// 		this.menuClick(e.target.name);
			// 	});
			// 	this.menu[x].addEventListener("pressup", (e) => {
			// 		e.target.gotoAndStop("up")
			// 	});
			//
			// 	this.menu[x].addEventListener("mouseover", (e) => {
			// 		e.target.gotoAndStop("hover")
			// 	});
			//
			// 	this.menu[x].addEventListener("mouseout", (e) => {
			// 		e.target.gotoAndStop("up")
			// 	});
			//
			// }
			//
			// for(var x = 0;x<menu_names.length;x++) {
			//
			// 	this.menu_label[x] = new createjs.Text(menu_text[x], window.language.locale == "zh" ? "17px lato-regular" : "12px lato-regular", this.context.theme_color[window.theme].menu_text_color);
			// 	this.menu_label[x].y = (this.menu[x].y) + 68 - 10;
			// 	this.menu_label[x].x = 50;
			// 	this.menu_label[x].textAlign = "center";
			// 	this.addChild(this.menu_label[x]);
			// }
		},

		menuClick(buttonName) {
			let toggle = '';

			switch(buttonName) {
				case 'exit-menu-'+window.theme+'':
					if(window.lobby_type == 'integrated'){
          	window.location = window.lobby_redirect_url //"http://lobby.nihtanv2.com";
	        } else {
							window.location = window.lobby_domain+"?game=true;" //"http://lobby.nihtanv2.com";
	        }
					break;

				case 'fullscreen-menu-'+window.theme+'':
					screenfull.toggle();
					break;

				case 'howto-menu-'+window.theme+'':
					toggle = this.toggleModal('howToPlay');
					if (toggle) {
						g_modalActive = 'howToPlay';
						this.showMenuModal('howToPlay');
						$(".howto-wrap").show();
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
					break;

				case 'videoRefresh-menu-'+window.theme+'':
					toggle = this.toggleModal('videoSettings');
          if (toggle) {
            g_modalActive = 'videoSettings';
            this.showMenuModal('videoSettings');
          } else {
            this.context.component_menuVideoSettings.visible = false;
          } // end if
					break;

				case 'playerInfo-menu-'+window.theme+'':
					toggle = this.toggleModal('playerInfo');
					if (toggle) {
						g_modalActive = 'playerInfo';
						this.showMenuModal('playerInfo');
					}
					else {
						this.context.component_menuPlayerInfo.visible = false;
					} // end if

					break;

				case 'transferhist-menu-'+window.theme+'':
					toggle = this.toggleModal('transferRecords');
					if (toggle) {
						g_modalActive = 'transferRecords';
						this.showMenuModal('transferRecords');
					}
					else {
						this.context.component_betRecords.visible = false;
					} // end if

					break;

				case 'bethist-menu-'+window.theme+'':
					toggle = this.toggleModal('betRecords');
					if (toggle) {
						g_modalActive = 'betRecords';
						this.showMenuModal('betRecords');
					}
					else {
						this.context.component_betRecords.visible = false;
					} // end if

					break;

				case 'gamehist-menu-'+window.theme+'':
					toggle = this.toggleModal('gameRecords');
					if (toggle) {
						g_modalActive = 'gameRecords';
						this.showMenuModal('gameRecords');
					}
					else {
						this.context.component_betRecords.visible = false;
					} // end if
					break;

				case 'transfer-menu-'+window.theme+'':
					toggle = this.toggleModal('transferFunds');
					if (toggle) {
						g_modalActive = 'transferFunds';
						this.showMenuModal('transferFunds');
					}
					else {
						this.context.component_transfer.visible = false;
						$('#canvasTextbox').hide();
					} // end if

					break;

				case 'modifyChips-menu-'+window.theme+'':
					toggle = this.toggleModal('modifyChips');
					if (toggle) {
						g_modalActive = 'modifyChips';
						this.showMenuModal('modifyChips');

						this.context.component_menuChips.reInitChips();
					}
					else {
						this.context.component_menuChips.visible = false;
					} // end if

					break;

				case 'settings-menu-'+window.theme+'':
					toggle = this.toggleModal('settings');
					if (toggle) {
						g_modalActive = 'settings';
						this.showMenuModal('settings');
					}
					else {
						this.context.component_settings.visible = false;
					} // end if

					break;
			}
		},
		changeTheme(new_theme) {
			this.menu_background.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0, 0, 100, this.context.context.height - 190);

			let menu_names = [
				"exit-menu-" + new_theme,
				"fullscreen-menu-" + new_theme,
				"videoRefresh-menu-" + new_theme,
				"howto-menu-" + new_theme,
				"playerInfo-menu-" + new_theme,
				"transferhist-menu-" + new_theme,
				"bethist-menu-" + new_theme,
				"gamehist-menu-" + new_theme,
				"modifyChips-menu-" + new_theme,
				"settings-menu-" + new_theme
			];

			for (var x = 0; x < menu_names.length; x++) {
				let menu_spritesheet_data = {
				images: [this.context.getResources([menu_names[x]])],
				frames: {
					width: 100,
					height: 87
				},
				animations: {
					"up": [0],
					"hover": [1],
					"clicked": [2]
				}
				}

				let menu_spriteSheet = new createjs.SpriteSheet(menu_spritesheet_data);
				this.menu[x].spriteSheet = menu_spriteSheet;
				this.menu[x].gotoAndStop("up");
				this.menu[x].name = menu_names[x];
				this.menu_label[x].color = this.context.theme_color[new_theme].menu_text_color;
			}

			this.context.component_menuVideoSettings.changeTheme(new_theme);
			this.context.component_howToPlay.changeTheme(new_theme);
			this.context.component_menuPlayerInfo.changeTheme(new_theme);
			this.context.component_transfer.changeTheme(new_theme);
			this.context.component_betRecords.changeTheme(new_theme);
			this.context.component_menuChips.changeTheme(new_theme);
			this.context.component_settings.changeTheme(new_theme);

		},
		toggleModal(modalName) {
			if(g_modalActive != '') {
				if (g_modalActive == modalName) {
					g_modalActive = '';
					return false;
				}else{
					g_modalActive = '';
					return true;
				}
			}
			else {
				return true;
			} // end if
		},

		setActiveModal() {
			g_modalActive = '';
		},

		showMenuModal(btnName) {
			this.hideAllModal();

			switch(btnName) {
				case 'howToPlay':
					this.context.component_howToPlay.visible = true;
					this.context.component_howToPlay.reInitTab();
					break;

				case 'videoSettings':
          this.context.component_menuVideoSettings.visible = true;
          break;

				case 'playerInfo':
					this.context.component_menuPlayerInfo.visible = true;
					break;

				case 'transferRecords':
					this.context.component_betRecords.visible = true;
					this.context.component_betRecords.initRecords('transferlogs');
					break;

				case 'betRecords':
					this.context.component_betRecords.visible = true;
					this.context.component_betRecords.initRecords('betlogs');
					break;

				case 'gameRecords':
					this.context.component_betRecords.visible = true;
					this.context.component_betRecords.initRecords('gamehistory');
					break;

				case 'modifyChips':
					this.context.component_menuChips.visible = true;
					break;

				case 'settings':
					this.context.component_settings.visible = true;
					break;

				case 'videoRefresh':
					break;
			}
		},

		hideAllModal(hideAll){
			if (hideAll) {
				g_modalActive = '';
			}

			this.context.component_howToPlay.visible = false;
			this.context.component_menuVideoSettings.visible = false;
			this.context.component_menuPlayerInfo.visible = false;
			this.context.component_betRecords.visible = false;
			this.context.component_transfer.visible = false;
			this.context.component_menuChips.visible = false;
			this.context.component_settings.visible = false;

			//Hide DOM elements
			$('#canvasTextbox').hide();
			$(".howto-wrap").hide();
	  	$(".howto-wrap--accent").hide();
			$(".arrow-up").hide();
		},

	})
}
