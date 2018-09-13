/**
* menuChips.js
* @author Kevin Villanueva
* @since 2017.06.15
* @version 1.0
* Copyright (C) 2017 Blue Frog INC. All rights reserved.
* Handles all modify chips functionalities
**/
import { createSprite, fontFormat } from '../../../factories/factories';
let instance = null;

export default() => {

	let countSelectedChips = 4;
	let chip_container = [];
	let user_chip_container = [];
	let user_chip_bg = [];
	let chipCon = [];

	instance = instance || new blu.Component({
		userChips : [],
		main() {
			this.x = 0;
			this.y = 56;
			this.visible = false;

			this.addEventListener("mousedown", (e) => {
				return;
			});

			this._modalWidth = this.context.stage.baseWidth;
			this._modalHeight = this.context.stage.baseHeight - 56;
			this.chipsConf = this.context.chipsConf;

			this.modchipsCon = [];
			this.bgoverlayChips = [];

			this.chip_names = this.context.component_chips.chip_names;

			this.chipval = this.context.component_chips.chipval[window.currencyAbbrev];

			this._modalBg = new createjs.Shape();
			this._modalBg.graphics.beginFill('rgba(22, 22, 22, 0.9)').drawRect(0, 0, this._modalWidth, this._modalHeight);
			this.addChild(this._modalBg);

			//Button clear chips border
			this.btnClearChips = new createjs.Shape();
			this.btnClearChips.graphics.f('#F1E382').drawRect(0,0,270, 67);
			this.btnClearChips.x = 260;
			this.btnClearChips.y = 530;

			//Button clear chips hit area
			this.btnClearChipsHit = new createjs.Shape();
			this.btnClearChipsHit.graphics.beginFill("#000").drawRect(0, 0, 270, 67);
			this.btnClearChipsHit.x = this.btnClearChips.x;
			this.btnClearChipsHit.y = this.btnClearChips.y;
			this.btnClearChipsHit.alpha = 0.01;
			this.btnClearChipsHit.cursor = "pointer";

			this.txtClearChips = new createjs.Text(window.language.menu.clearchipscaps, window.language.locale == "zh" ? fontFormat(25, 'normal', 'lato') : fontFormat(22, 'bold', 'lato'), "#000");
			this.txtClearChips.textAlign = "center";
			this.txtClearChips.textBaseline = "middle";
			this.txtClearChips.x = this.btnClearChips.x + (270/2);
			this.txtClearChips.y = this.btnClearChips.y + (67/2);

			this.btnApply = new createjs.Shape();
			this.btnApply.graphics.f('#68A12E').drawRect(0,0,270, 67);
			this.btnApply.x = this.btnClearChipsHit.x + 270 + 32;
			this.btnApply.y = this.btnClearChipsHit.y;
			this.btnApply.cursor = "pointer";

			this.txtBtnApply = new createjs.Text(window.language.menu.applynowcaps, window.language.locale == "zh" ? fontFormat(25, 'normal', 'lato') : fontFormat(22, 'bold', 'lato'), "#fff");
			this.txtBtnApply.y = this.btnApply.y + (67/2);
			this.txtBtnApply.x = this.btnApply.x + (270/2);
			this.txtBtnApply.textAlign = "center";
			this.txtBtnApply.textBaseline = "middle";

			//Button apply chips hit area
			this.btnApplyChipsHit = new createjs.Shape();
			this.btnApplyChipsHit.graphics.beginFill("#000").drawRect(0, 0, 270, 67);
			this.btnApplyChipsHit.x = this.btnApply.x;
			this.btnApplyChipsHit.y = this.btnApply.y;
			this.btnApplyChipsHit.alpha = 0.01;
			this.btnApplyChipsHit.cursor = "pointer";

			this.addChild(this.btnClearChips, this.txtClearChips, this.btnClearChipsHit, this.btnApply, this.txtBtnApply, this.btnApplyChipsHit);

			this.allchips_container = new createjs.Container();

			//Click Apply Now button
			this.btnApplyChipsHit.addEventListener("mousedown", (e) => {
				if (countSelectedChips != 4) return;
				window.user_chips = [];
				for (var i = 0; i < chipCon.length; i++) {
					window.user_chips.push(chipCon[i].value);
				}
				// Save new chips
				$.post("/settings", {chips : window.user_chips}, (response) => {
				});

				this.context.component_chips.init(true);
				this.context.component_menuEvents.toggleModal('modifychips', false);
			});

			//Click Clear Chips button
			this.btnClearChipsHit.addEventListener("mousedown", (e) => {
				countSelectedChips = 0;
				let tempChips = chipCon;
				chipCon = [];
				for(let i = 0; i < chip_container.length; i++) {
					let index = _.findIndex(tempChips, (user_chip) =>{ return user_chip.value == chip_container[i].value });
					if(index < 0) continue;
					tempChips[index].last_activity = "removed";

					if(tempChips[index].chip_index != undefined && tempChips[index].chip_index >= 0) {
						user_chip_container[tempChips[index].chip_index].status = "vacant";
						tempChips[index].chip_index = -1;
					}

					createjs.Tween.get(tempChips[index], { loop: false })
					.to({
						x: chip_container[i].ox,
						y: chip_container[i].oy,
					}).call((obj) =>{
						obj.chipTxt.x = obj.chipImg.x + 60;
						obj.chipTxt.y = obj.chipImg.y + 64;
						obj.chipImg.regX = obj.chipImg.regY = 3;
						if(obj.chipTxt.text.toString().indexOf('1') == 0) {
							obj.chipTxt.x -= 1;
						}
					}, [tempChips[index]]);
				}
			});

			this.reInitChips();

		}, //modifyChips
		reInitChips() {
			let chipWidth = 120;
			let chipHeight = 120;
			let chipCol = 0;
			let chipX = 0;
			let chipY = 0;
			let chipMargin = 0;
			let userChipX = 0
			let userChipXMargin = 0
			let userChipY = 0
			let userChipYMargin = 0

			if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
				chipCol = 3;
				chipX = 135;
				chipY = 300;
				chipMargin = 50;
				userChipX =  40;
				userChipXMargin = 170;
				userChipY = 50;
				userChipYMargin = 0;
			} else {
				chipCol = 6;
				chipX = 83;
				chipY = 173;
				chipMargin = 42;
				userChipX =  this.context.stage.baseWidth - 168;
				userChipXMargin = 0;
				userChipY = 20;
				userChipYMargin = 160;
			}

			countSelectedChips = 4;
			this.userChips = [];

			// chips order on init
			_.forEach(window.user_chips, (chip, k)=> {
				_.forEach(this.chipsConf, (conf) =>{
					if(conf.chipval === chip && k < 4) {
						this.userChips.push("chip_"+conf.chipName.split("_")[2]);
					}
				});
			});


			//loop each chips and display
			let tempCount = 0;
			for (var i = 0; i < this.chip_names.length; i++) {
				let chipName = this.chip_names[i].split('_');
				let chipAmt = this.chipval[i] != "max" ? parseInt(this.chipval[i]) * window.currencyMultiplier : "max";
				tempCount++;
				if(tempCount > chipCol ) tempCount = 1;

				//chip container init
				if(!chip_container[i]) {
					chip_container[i] = new createjs.Container();
					// chip_container[i].x = chipX + ((chipWidth + chipMargin) * (i>=chipCol?i-chipCol : ));
					// chip_container[i].y = chipY + (i>=chipCol? chipHeight + chipMargin : 0);
					chip_container[i].x = chipX + ((chipWidth + chipMargin) * tempCount);
					chip_container[i].y = chipY + (((Math.floor((i+1)/(chipCol+0.1))) * chipHeight) + (i>=chipCol? chipMargin : 0))
					chip_container[i].cursor = "pointer";
					this.allchips_container.addChild(chip_container[i]);

					//background chip
					chip_container[i].bg = new createjs.Shape();
					chip_container[i].bg.graphics.beginLinearGradientFill(["transparent","#636467"], [0, 1], 0, -60, 0, 22).drawCircle(0, 0, 60);
					chip_container[i].bg.regX = chip_container[i].bg.regY = -60;
					chip_container[i].bg.x = chip_container[i].x;
					chip_container[i].bg.y = chip_container[i].y + 3;
					this.addChild(chip_container[i].bg);

					((i) => {
						chip_container[i].addEventListener("mousedown", (e)=>{
							if(chip_container[i].last_activity == "selected") {
								this.transferChips("remove", chip_container[i]);
							} else{
								this.transferChips("add", chip_container[i]);
							}
						});
					} (i));
				}

				// chip_container[i].x = chipX + ((chipWidth + chipMargin) * (i>=chipCol?i-chipCol : i));
				// chip_container[i].y = chipY + (i>=chipCol? chipHeight + chipMargin : 0);
				let total = Math.floor((i+1)/(chipCol+0.1))
				chip_container[i].x = chipX + ((chipWidth + chipMargin) * (tempCount-1));
				chip_container[i].y = chipY + (( total * chipHeight) + (total * chipMargin))
				chip_container[i].ox = chip_container[i].x;
				chip_container[i].oy = chip_container[i].y;
				chip_container[i].value =  this.chipval[i] != "max" ? this.chipval[i] : "max";
				chip_container[i].last_activity = "unselected";


				chip_container[i].bg.x = chip_container[i].x;
				chip_container[i].bg.y = chip_container[i].y + 3;


				//reset chip styling
				chip_container[i].removeAllChildren();
				if(_.includes(this.userChips, this.chip_names[i])) continue;

				let chipImg = createSprite(this.context.getResources(this.chip_names[i]), 80, 80, chipImg);
				chipImg.scaleX = chipImg.scaleY = 1.65;
				chipImg.regX = chipImg.regY = 3;
				chipImg.sReg = -3;
				chipImg.rScale = 1;
				chipImg.rReg = 0;
				chip_container[i].chipImg = chipImg;
				chip_container[i].addChild(chipImg);

				//chip text
				let chipText = chipAmt;
				if (parseInt(chipText) > 999 && parseInt(chipText) < 1000000) {
					chipText = (chipText/1000) + 'K';
				}
				else if (parseInt(chipText) >= 1000000) {
					chipText = (chipText/1000000) + 'M';
				}
				else if (isNaN(parseInt(chipName[1]))) {
					chipText = 'MAX';
				}
				//set text to chip
				let chipTxt = new createjs.Text(chipText, fontFormat(50, 'normal', 'bebas', false), '#000');
				chipTxt.textBaseline = 'middle';
				chipTxt.textAlign = 'center';
				chipTxt.x = chipImg.x + 60;
				chipTxt.y = chipImg.y + 64;
				chip_container[i].chipTxt = chipTxt;
				chip_container[i].addChild(chipTxt);
				if(chipText.toString().indexOf('1') == 0) {
					chipTxt.x -= 1;
				}
			}

			chipCon = [];
			for ( let j=0; j<4 ;j++ ) {

				if(!user_chip_container[j]) {
					user_chip_container[j] = new createjs.Container();
					user_chip_container[j].x = this.context.stage.baseWidth - 168;
					user_chip_container[j].y = 20 + (160 * j);
					user_chip_container[j].cursor = "pointer";
					this.allchips_container.addChild(user_chip_container[j]);

					user_chip_container[j].bg = new createjs.Shape();
					user_chip_container[j].bg.graphics.ss(1).beginLinearGradientFill(["transparent","#636467"], [0, 1], 0, -72, 0, 36).drawCircle(0, 0, 72);
					user_chip_container[j].bg.regX = -72;
					user_chip_container[j].bg.regY = -72;
					user_chip_container[j].bg.x = user_chip_container[j].x;
					user_chip_container[j].bg.y = user_chip_container[j].y;
					this.addChild(user_chip_container[j].bg);

					((j) => {
						user_chip_container[j].addEventListener("mousedown", (e)=>{
							if(user_chip_container[j].last_activity == "selected") {
								this.transferChips("remove", user_chip_container[j]);
							} else{
								this.transferChips("add", user_chip_container[j]);
							}
						});
					} (j));
				}

				user_chip_container[j].x = userChipX + (userChipXMargin * j);
				user_chip_container[j].y = userChipY + (userChipYMargin * j);
				user_chip_container[j].ox = user_chip_container[j].x;
				user_chip_container[j].oy = user_chip_container[j].y;
				user_chip_container[j].value = this.userChips[j].split('_')[1];
				user_chip_container[j].last_activity = "selected";
				user_chip_container[j].status = "occupied";
				user_chip_container[j].chip_index = j;
				chipCon.push(user_chip_container[j]);

				user_chip_container[j].bg.x = user_chip_container[j].x;
				user_chip_container[j].bg.y = user_chip_container[j].y;

				user_chip_container[j].removeAllChildren();

				let chipImg = createSprite(this.context.getResources(this.userChips[j]), 80, 80, chipImg);
				chipImg.scaleX = chipImg.scaleY = 1.65;
				chipImg.regX = -4;
				chipImg.regY = -2;
				user_chip_container[j].chipImg = chipImg;
				user_chip_container[j].addChild(chipImg);


				//chip text
				let chipText = this.userChips[j].split('_')[1];
				chipText = chipText != "max" ? parseInt(chipText) * window.currencyMultiplier : "max";
				if (parseInt(chipText) > 999 && parseInt(chipText) < 1000000) {
					chipText = (chipText/1000) + 'K';
				}
				else if (parseInt(chipText) >= 1000000) {
					chipText = (chipText/1000000) + 'M';
				}
				else if (isNaN(parseInt(chipText))) {
					chipText = 'MAX';
				}
				//set text to chip
				let chipTxt = new createjs.Text(chipText, fontFormat(50, 'normal', 'bebas', false), '#000');
				chipTxt.textBaseline = 'middle';
				chipTxt.textAlign = 'center';
				chipTxt.x = chipImg.x + 60 + 12;
				chipTxt.y = chipImg.y + 64 + 10;
				user_chip_container[j].chipTxt = chipTxt;
				user_chip_container[j].addChild(chipTxt);
				this.addChild(this.allchips_container);
				if(chipText.toString().indexOf('1') == 0) {
					chipTxt.x -= 1;
				}
			}
		},
		transferChips(action, chip) {
			if(action == "remove") {
				for(let i = 0; i < chip_container.length; i++) {
					if(chip_container[i].value == chip.value) {
						chip.last_activity = "removed";
						countSelectedChips--;

						if(chip.chip_index != undefined && chip.chip_index >= 0) {
							user_chip_container[chip.chip_index].status = "vacant";
							chipCon.splice(chip.chip_index, 1);
							chip.chip_index = -1;
						}
						createjs.Tween.get(chip, { loop: false })
						.to({
							x: chip_container[i].ox,
							y: chip_container[i].oy,
						}).call((obj) =>{
							obj.chipTxt.x = obj.chipImg.x + 60;
							obj.chipTxt.y = obj.chipImg.y + 64;
							obj.chipImg.regX = obj.chipImg.regY = 3;
							if(obj.chipTxt.text.toString().indexOf('1') == 0) {
								obj.chipTxt.x -= 1;
							}
						}, [chip]);
					}
				}
			} else if(action == "add" && countSelectedChips < 4) {
				let index = _.findIndex(user_chip_container, (user_chip) =>{ return user_chip.status == "vacant" });
				if(index >= 0) {
					chip.chip_index = index;
					chip.last_activity = "selected";

					user_chip_container[index].status = "occupied";
					countSelectedChips++;
					chipCon.splice(index, 0, chip);
					createjs.Tween.get(chip, { loop: false })
					.to({
						x: user_chip_container[index].ox,
						y: user_chip_container[index].oy,
					}).call((obj) =>{
						obj.chipTxt.x = obj.chipImg.x + 60 + 12;
						obj.chipTxt.y = obj.chipImg.y + 64 + 10;
						obj.chipImg.regX = -4;
						obj.chipImg.regY = -2;
						if(obj.chipTxt.text.toString().indexOf('1') == 0) {
							obj.chipTxt.x -= 1;
						}
					}, [chip]);
				}
			}
		}, //transferChips
		changeTheme(new_theme) {
			this._modalHeader.graphics.clear().beginLinearGradientFill([this.context.theme_color[new_theme].base_color, this.context.theme_color[new_theme].gradColor2], [.1, .9], 10, 10, 10, 35)
			.drawRoundRect(0, 0, this._modalWidth, 35 * 1.5, 3);
			this._headerTxt.color = this.context.theme_color[new_theme].labelcolor;
			this._headerClose.color = this.context.theme_color[new_theme].labelcolor;
			// this._modalBg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);

			this.txtTitleModify.color = this.context.theme_color[new_theme].labelcolor;
			this.btnClearChips.graphics.clear().beginStroke(this.context.theme_color[new_theme].btnBorder).setStrokeStyle(2).drawRect(0, 0, 138, 38);
			this.txtClearChips.color = this.context.theme_color[new_theme].btnBorder;
			new_theme == "white" ? this.chipsBg.alpha = 0.3 : this.chipsBg.alpha = 1;
			for(var x = 0; x < 4; x++) {
				new_theme == "white" ? chipCon[x].alpha = 0.5 : chipCon[x].alpha = 1;
			}
			for(var i = 0; i < this.chip_names.length; i++) {
				if(new_theme == 'white') {
					this.bgoverlayChips[i] = new createjs.Shape();
					this.bgoverlayChips[i].graphics.clear().beginFill("#000").drawCircle(0, 0, 34);
					this.bgoverlayChips[i].alpha = 0.6;
					this.bgoverlayChips[i].x = 35;
					this.bgoverlayChips[i].y = 35;
					bgmodCon[i].addChild(this.bgoverlayChips[i]);
				} else {
					this.bgoverlayChips[i].graphics.clear().beginFill("transparent").drawCircle(0, 0, 34);
					bgmodCon[i].removeChild(this.bgoverlayChips[i]);
				}
			}

		},
		screenOrientation() {
			let btnX = 0;
			let btnY = 0;
			if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
				this._modalWidth = this.context.stage.baseHeight;
				this._modalHeight = this.context.stage.baseWidth - 56;
				btnX = 75
				btnY = this.context.stage.baseWidth - 180;
			} else {
				this._modalWidth = this.context.stage.baseWidth;
				this._modalHeight = this.context.stage.baseHeight - 56;
				btnX = 260;
				btnY = 530
			}
			this._modalBg.graphics.clear().beginFill('rgba(22, 22, 22, 0.9)').drawRect(0, 0, this._modalWidth, this._modalHeight);
			this.btnClearChips.x = btnX;
			this.btnClearChips.y = btnY;
			this.btnClearChipsHit.x = this.btnClearChips.x;
			this.btnClearChipsHit.y = this.btnClearChips.y;
			this.txtClearChips.x = this.btnClearChips.x + (270/2);
			this.txtClearChips.y = this.btnClearChips.y + (67/2);

			this.btnApply.x = this.btnClearChipsHit.x + 270 + 32;
			this.btnApply.y = this.btnClearChipsHit.y;
			this.txtBtnApply.y = this.btnApply.y + (67/2);
			this.txtBtnApply.x = this.btnApply.x + (270/2);
			this.btnApplyChipsHit.x = this.btnApply.x;
			this.btnApplyChipsHit.y = this.btnApply.y;

			this.reInitChips();
		}
	});
	return instance;
}
