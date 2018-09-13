/**
 * menuChips.js
 * @author Kevin Villanueva
 * @since 2017.06.15
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 * Handles all modify chips functionalities
**/
import { createSprite, fontFormat } from '../../factories/factories';
let instance = null;

export default() => {

	let countSelectedChips = 4;
	let chip_container = [];
	let user_chip_container = [];
	let chipCon = [];

	instance = instance || new blu.Component({
		userChips : [],
		main() {
			this.y = 690;
			this.x = 720;

			this.addEventListener("mousedown", (e) => {
				return;
			});

			this.visible = false;
			this._modalWidth = 480;
			this._modalHeight = 255;
			this.chipsConf = this.context.chipsConf;

			this.modchipsCon = [];
			this.bgoverlayChips = [];

			this.chip_names = this.context.component_chips.chip_names;
			this.chipval = this.context.component_chips.chipval[window.currencyAbbrev];

			//this.context.component_chips.visible = false;

			//Modal Header
			this._modalHeader = new createjs.Shape();
			this._modalHeader.graphics.beginLinearGradientFill(["#EEDE7E","#a99143"], [0, 1], 0,0,this._modalWidth,0).drawRect(0,0, this._modalWidth, 35);
			this.addChild(this._modalHeader);

			//Header Text
			this._headerTxt = new createjs.Text(window.language2.com_sub_bottomgamedetails_modifychips, window.language.locale == "zh" ? fontFormat(22, 'normal', 'lato') : fontFormat(20, 'bold', 'lato') , "#000");
			this._headerTxt.textAlign = "center";
			this._headerTxt.textBaseline = "middle";
			this._headerTxt.x = this._modalWidth / 2;
			this._headerTxt.y = this._modalHeader.y + (window.language.locale == "zh" ? 16 : 18);
			this.addChild(this._headerTxt);

			//Header Close button
			this._headerClose = new createjs.Text("X","bold 25px arial", "#D32F2F");
			this._headerClose.x = this._modalWidth - 25;
			this._headerClose.y = this._modalHeader.y + 4;
			this.addChild(this._headerClose);

			//Close button hitarea
			this._headerCloseHit = new createjs.Shape();
			this._headerCloseHit.graphics.beginFill("#000").drawRect(0, 0, 25, 25);
			this._headerCloseHit.x = this._headerClose.x;
			this._headerCloseHit.y = this._headerClose.y;
			this._headerCloseHit.cursor = "pointer";
			this._headerCloseHit.alpha = 0.01;
			this.addChild(this._headerCloseHit);

			//Close modal
			this._headerCloseHit.addEventListener("mousedown", (e) => {
				this.visible = false;
				this.context.component_chips.modChipsStateOverlay.visible = false;
	        });

			this._modalBg = new createjs.Shape();
			this._modalBg.graphics.beginFill("#2b2b2b").moveTo(0,0)
				.moveTo(0,0)
				.lineTo(this._modalWidth, 0)
				.lineTo(this._modalWidth, this._modalHeight)
				.lineTo(this._modalWidth - 105, this._modalHeight)
				.lineTo(this._modalWidth - 105, this._modalHeight + 90)
				.lineTo(0, this._modalHeight + 90)
				.closePath();
			this._modalBg.y = this._modalHeader.y + 35;
			this.addChild(this._modalBg);

			//Button clear chips border
			this.btnClearChips = new createjs.Shape();
			this.btnClearChips.graphics.beginStroke("#F1E382");
			this.btnClearChips.graphics.setStrokeStyle(2);
			this.btnClearChips.graphics.drawRect(0, 0, 166, 36);
			this.btnClearChips.x = 62;
			this.btnClearChips.y = this._modalHeader.y + 231;

			//Button clear chips hit area
			this.btnClearChipsHit = new createjs.Shape();
			this.btnClearChipsHit.graphics.beginFill("#000").drawRect(0, 0, 166, 36);
			this.btnClearChipsHit.x = this.btnClearChips.x;
			this.btnClearChipsHit.y = this.btnClearChips.y;
			this.btnClearChipsHit.alpha = 0.01;
			this.btnClearChipsHit.cursor = "pointer";

			this.txtClearChips = new createjs.Text(window.language2.com_sub_bottomgamedetails_clearchips, window.language.locale == "zh" ? fontFormat(25, 'normal', 'lato') : fontFormat(18, 'bold', 'lato'), "#F1E382");
			this.txtClearChips.textAlign = "center";
			this.txtClearChips.textBaseline = "middle";
			this.txtClearChips.x = this.btnClearChips.x + (166/2);
			this.txtClearChips.y = this.btnClearChips.y + (36/2);

			this.btnApply = new createjs.Shape();
			this.btnApply.graphics.beginLinearGradientFill(["#EEDE7E","#a99143"], [0, 1], 0, 0, 0, 166).drawRect(0,0, 166, 36);
			this.btnApply.x = this.btnClearChipsHit.x + 166 + 23;
			this.btnApply.y = this.btnClearChips.y - 1;
			this.btnApply.cursor = "pointer";

			this.txtBtnApply = new createjs.Text(window.language2.com_sub_bottomgamedetails_applynow, window.language.locale == "zh" ? fontFormat(25, 'normal', 'lato') : fontFormat(18, 'bold', 'lato'), "#000");
			this.txtBtnApply.y = this.btnApply.y + (36/2);
			this.txtBtnApply.x = this.btnApply.x + (166/2);
			this.txtBtnApply.textAlign = "center";
			this.txtBtnApply.textBaseline = "middle";

			//Button apply chips hit area
			this.btnApplyChipsHit = new createjs.Shape();
			this.btnApplyChipsHit.graphics.beginFill("#000").drawRect(0, 0, 166, 36);
			this.btnApplyChipsHit.x = this.btnApply.x;
			this.btnApplyChipsHit.y = this.btnApply.y;
			this.btnApplyChipsHit.alpha = 0.01;
			this.btnApplyChipsHit.cursor = "pointer";

			this.addChild(this.btnApply, this.txtBtnApply, this.btnClearChips, this.txtClearChips, this.btnClearChipsHit, this.btnApplyChipsHit);

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
      	this.context.component_chips.modChipsStateOverlay.visible = false;
      	this.visible = false;
      	this.context.component_chips.selected_chip = null;
      });

	    //Click Clear Chips button
	    this.btnClearChipsHit.addEventListener("mousedown", (e) => {
				let tempChips = chipCon;
				countSelectedChips = 0;
				chipCon = [];
				
				for(let i = 0; i < chip_container.length; i++) {
					let index = _.findIndex(tempChips, (user_chip) =>{ return user_chip.value == chip_container[i].value });
					if(index < 0) continue;
					tempChips[index].chipTxt.font = fontFormat(28, 'normal', 'bebas', false);
					tempChips[index].last_activity = "removed";

					if(tempChips[index].chip_index != undefined && tempChips[index].chip_index >= 0) {
						user_chip_container[tempChips[index].chip_index].status = "vacant";
						tempChips[index].chip_index = -1;
					}

					let has_one = tempChips[index].value.toString().indexOf('1') == 0 ? 2 : 0;
					createjs.Tween.get(tempChips[index], { loop: false })
						.to({
							x: chip_container[i].ox,
							y: chip_container[i].oy,
						}).call((obj) =>{
							obj.chipImg.scaleX = obj.chipImg.scaleY = 0.9;
							obj.chipTxt.scaleX = obj.chipTxt.scaleY = 0.9;
							obj.chipTxt.x = obj.chipImg.x + 34 - has_one;
							obj.chipTxt.y = obj.chipImg.y + 35;
							obj.chipImg.regX = obj.chipImg.regY = 3;
						}, [tempChips[index]]);
				}
			});

			this.reInitChips();
		},

		reInitChips() {
			let chipWidth = 66;
			let chipHeight = 66;
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
			for (var i = 0; i < this.chip_names.length; i++) {
				let chipName = this.chip_names[i].split('_');
				let chipAmt = this.chipval[i] != "max" ? parseInt(this.chipval[i]) * window.currencyMultiplier : "max";

				//chip container init
				if(!chip_container[i]) {
					chip_container[i] = new createjs.Container();
					chip_container[i].x = 16 + ((chipWidth + 10) * (i>=6?i-6 : i));
					chip_container[i].y = 55 + (i>=6? chipHeight + 20 : 0);
					chip_container[i].cursor = "pointer";
					this.allchips_container.addChild(chip_container[i]);

					//background chip
					chip_container[i].bg = new createjs.Shape();
					chip_container[i].bg.graphics.ss(1).beginLinearGradientFill(["transparent","#636467"], [0, 1], 0, -32, 0, 12).drawCircle(0, 0, 33);
					chip_container[i].bg.regX = chip_container[i].bg.regY = -33;
					chip_container[i].bg.x = chip_container[i].x;
					chip_container[i].bg.y = chip_container[i].y;
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

				chip_container[i].x = 16 + ((chipWidth + 10) * (i>=6?i-6 : i));
				chip_container[i].y = 55 + (i>=6? chipHeight + 20 : 0);
				chip_container[i].ox = chip_container[i].x;
				chip_container[i].oy = chip_container[i].y;
				chip_container[i].value =  this.chipval[i] != "max" ? this.chipval[i] : "max";
				chip_container[i].last_activity = "unselected";

				//reset chip styling
				chip_container[i].removeAllChildren();
				if(_.includes(this.userChips, this.chip_names[i])) continue;

				let chipImg = createSprite(this.context.getResources(this.chip_names[i]), 80, 80, chipImg);
				chipImg.scaleX = chipImg.scaleY = 0.9;
				chipImg.regX = chipImg.regY = 3;
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
				let chipTxt = new createjs.Text(chipText, fontFormat(28, 'normal', 'bebas', false), '#000');
				chipTxt.textBaseline = 'middle';
				chipTxt.textAlign = 'center';
				chipTxt.x = chipImg.x + 34;
				chipTxt.y = chipImg.y + 35;
				chipTxt.scaleX = chipTxt.scaleY = 0.9;
				chip_container[i].chipTxt = chipTxt;
				chip_container[i].addChild(chipTxt);
				if(chipText.toString().indexOf('1') == 0) {
					chipTxt.x -= 2;
				}
			}

			chipCon = [];
			for ( let j=0; j<4 ;j++ ) {

				if(!user_chip_container[j]) {
					user_chip_container[j] = new createjs.Container();
					user_chip_container[j].x = 18 + (92 * j);
					user_chip_container[j].y = 297;
					user_chip_container[j].cursor = "pointer";
					this.allchips_container.addChild(user_chip_container[j]);

					let chipBG = new createjs.Shape();
					chipBG.graphics.ss(1).beginLinearGradientFill(["transparent","#636467"], [0, 1], 0, -40, 0, 20).drawCircle(0, 0, 42);
					chipBG.regX = -38;
					chipBG.regY = -40;
					chipBG.alpha = 0.7;
					chipBG.x = user_chip_container[j].x;
					chipBG.y = user_chip_container[j].y;
					this.addChild(chipBG);

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

				user_chip_container[j].x = 18 + (92 * j);
				user_chip_container[j].y = 297;
				user_chip_container[j].ox = user_chip_container[j].x;
				user_chip_container[j].oy = user_chip_container[j].y;
				user_chip_container[j].value = this.userChips[j].split('_')[1];
				user_chip_container[j].last_activity = "selected";
				user_chip_container[j].status = "occupied";
				user_chip_container[j].chip_index = j;
				chipCon.push(user_chip_container[j]);

				user_chip_container[j].removeAllChildren();

				let chipImg = createSprite(this.context.getResources(this.userChips[j]), 80, 80, chipImg);
				chipImg.scaleX = chipImg.scaleY = 0.95;
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
				let chipTxt = new createjs.Text(chipText, fontFormat(28, 'normal', 'bebas', false), '#000');
				chipTxt.textBaseline = 'middle';
				chipTxt.textAlign = 'center';
				chipTxt.x = chipImg.x + 38;
				chipTxt.y = chipImg.y + 40;
				chipTxt.scaleX = chipTxt.scaleY = 0.95;
				user_chip_container[j].chipTxt = chipTxt;
				user_chip_container[j].addChild(chipTxt);
				this.addChild(this.allchips_container);

				if(chipText.toString().indexOf('1') == 0) {
					chipTxt.x -= 2;
				}
			}
		},
		transferChips(action, chip) {
			let has_one = 0;
			if(chip.value.toString().indexOf('1') == 0) {
				has_one = 2;
			}

			if(action == "remove") {
				for(let i = 0; i < chip_container.length; i++) {
					if(chip_container[i].value == chip.value) {
						chip.last_activity = "removed";
						countSelectedChips--;

						if(chip.chip_index != undefined && chip.chip_index >= 0) {
							user_chip_container[chip.chip_index].status = "vacant";
							chipCon.splice(_.findIndex(chipCon, (o) => { return chip.value == o.value }), 1);
							chip.chip_index = -2;
						}

						createjs.Tween.get(chip, { loop: false })
						.to({
							x: chip_container[i].ox,
							y: chip_container[i].oy,
						 }).call((obj) =>{
							obj.chipImg.scaleX = obj.chipImg.scaleY = 0.9;
							obj.chipTxt.scaleX = obj.chipTxt.scaleY = 0.9;
							obj.chipTxt.x = obj.chipImg.x + 34 - has_one;
							obj.chipTxt.y = obj.chipImg.y + 35;
							obj.chipImg.regX = obj.chipImg.regY = 3;
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
						obj.chipImg.scaleX = obj.chipImg.scaleY = 0.95;
						obj.chipTxt.scaleX = obj.chipTxt.scaleY = 0.95;
						obj.chipTxt.x = obj.chipImg.x + 38 - has_one;
						obj.chipTxt.y = obj.chipImg.y + 40;
						obj.chipImg.regX = obj.chipImg.regY = 0;
					 }, [chip]);
				}
			}
		}, //transferChips
	});
	return instance;
}
