/**
 * menuChips.js
 * @author Kevin Villanueva
 * @since 2017.06.15
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
 * Handles all modify chips functionalities
**/

let instance = null;

export default() => {

	let countSelectedChips = 4;
	let bgmodchips = [];
	let modchips = [];
	let chipCon = [];
	let bgmodCon = [];

	instance = instance || new blu.Component({
		tempUserChips :  [],
		main() {
			this.x = (this.context.stage.baseWidth / 2) - 39.5;
			this.y = 90;
			this.visible = false;

			this.addEventListener("mousedown", (e) => {
				return;
			});

			this._modalWidth = 550;
			this._modalHeight = 440;

			this.modchipsCon = [];
			this.bgoverlayChips = [];

			this.chip_names = this.context.component_chips.chip_names;

			this.chipval = this.context.component_chips.chipval[window.currencyAbbrev];

			//Modal Header
			this._modalHeader = new createjs.Shape();
			this._modalHeader.graphics.beginLinearGradientFill([this.context.theme_color[window.theme].base_color, this.context.theme_color[window.theme].gradColor2], [.1, .9], 10, 10, 10, 35)
				.drawRoundRect(0, 0, this._modalWidth, 35 * 1.5, 3);
			this.addChild(this._modalHeader);

			//Header Text
			this._headerTxt = new createjs.Text(window.language.menu.modifychipscaps, window.language.locale == "zh" ? "bold 20px arial" : "bold 15px arial", this.context.theme_color[window.theme].labelcolor);
			this._headerTxt.x = this._modalHeader.x + 15;

			if(window.language.locale == "zh") {
				this._headerTxt.y = this._modalHeader.y + 10;
			} else {
				this._headerTxt.y = this._modalHeader.y + 13.5;
			}

			this._headerTxt.scaleX = this._headerTxt.scaleY = 1.5;
			this.addChild(this._headerTxt);

			//Header Close button
			this._headerClose = new createjs.Text("X","bold 15px arial", this.context.theme_color[window.theme].labelcolor);
			this._headerClose.x = this._modalWidth - (30 * 1.5);
			this._headerClose.y = this._modalHeader.y + 13.5;
			this._headerClose.scaleX = this._headerClose.scaleY = 1.5;
			this.addChild(this._headerClose);

			//Close button hitarea
			this._headerCloseHit = new createjs.Shape();
			this._headerCloseHit.graphics.beginFill("#000").drawRect(0, 0, 45, 35);
			this._headerCloseHit.x = this._headerClose.x - 15;
			this._headerCloseHit.y = this._headerClose.y - 8;
			this._headerCloseHit.cursor = "pointer";
			this._headerCloseHit.alpha = 0.01;
			this.addChild(this._headerCloseHit);

			//Close modal
			this._headerCloseHit.addEventListener("mousedown", (e) => {
	        	this.context.component_menu.setActiveModal();
	        	this.visible = false;
	        });

			this._modalBg = new createjs.Shape();
			this._modalBg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);
			this._modalBg.y = this._modalHeader.y + (35 * 1.5);
			this.addChild(this._modalBg);

			//Modify Chips Body
			this.txtTitleModify = new createjs.Text(window.language.menu.changechipshere, window.language.locale == "zh" ? "bold 25px arial" : "bold 13px arial", this.context.theme_color[window.theme].labelcolor);
			this.txtTitleModify.x = this._modalWidth / 2;
			this.txtTitleModify.textAlign = "center";

			if(window.language.locale == "zh") {
							this.txtTitleModify.y = this._modalHeader.y + (55 * 1.5) - 15;
			} else {
							this.txtTitleModify.y = this._modalHeader.y + (55 * 1.5);
			}

			this.chipsBg = new createjs.Shape();
			this.chipsBg.graphics.beginFill("#000").drawRect(0, 0, this._modalWidth, 50);
			this.chipsBg.y = this.txtTitleModify.y + 80;
			window.theme == "white" ? this.chipsBg.alpha = 0.3 : this.chipsBg.alpha = 1;

			this.btnApply = new createjs.Shape();
			this.btnApply.graphics.beginFill("#ff9b28").drawRect(0, 0, 140, 40);
			this.btnApply.x = 120;
			this.btnApply.y = this._modalHeader.y + 418;
			this.btnApply.cursor = "pointer";

			//Button apply chips hit area
			this.btnApplyChipsHit = new createjs.Shape();
			this.btnApplyChipsHit.graphics.beginFill("#000").drawRect(0, 0, 138, 38);
			this.btnApplyChipsHit.x = this.btnApply.x;
			this.btnApplyChipsHit.y = this.btnApply.y;
			this.btnApplyChipsHit.alpha = 0.01;
			this.btnApplyChipsHit.cursor = "pointer";

			this.txtBtnApply = new createjs.Text(window.language.menu.applynowcaps, window.language.locale == "zh" ? "bold 27px arial" : "bold 13px arial", "#000");
			this.txtBtnApply.x = this.btnApply.x + 70;
			this.txtBtnApply.textAlign = "center";

			if(window.language.locale == "zh") {
				this.txtBtnApply.y = this.btnApply.y + 5;
			} else {
				this.txtBtnApply.y = this.btnApply.y + 13;
			}

			//Button clear chips border
			this.btnClearChips = new createjs.Shape();
			this.btnClearChips.graphics.beginStroke(this.context.theme_color[window.theme].btnBorder);
			this.btnClearChips.graphics.setStrokeStyle(2);
			this.btnClearChips.graphics.drawRect(0, 0, 138, 38);
			this.btnClearChips.x = this.btnApply.x + 170;
			this.btnClearChips.y = this.btnApply.y + 1;

			//Button clear chips hit area
			this.btnClearChipsHit = new createjs.Shape();
			this.btnClearChipsHit.graphics.beginFill("#000").drawRect(0, 0, 138, 38);
			this.btnClearChipsHit.x = this.btnClearChips.x;
			this.btnClearChipsHit.y = this.btnClearChips.y;
			this.btnClearChipsHit.alpha = 0.01;
			this.btnClearChipsHit.cursor = "pointer";

			this.txtClearChips = new createjs.Text(window.language.menu.clearchipscaps,	window.language.locale == "zh" ? "bold 27px arial" : "bold 13px arial", this.context.theme_color[window.theme].btnBorder);
			this.txtClearChips.x = this.btnClearChips.x + 70;
			this.txtClearChips.textAlign = "center";

			if(window.language.locale == "zh") {
				this.txtClearChips.y = this.btnClearChips.y + 5;
			} else {
				this.txtClearChips.y = this.btnClearChips.y + 12;
			}

			this.addChild(this.txtTitleModify, this.chipsBg, this.btnApply, this.txtBtnApply, this.btnClearChips, this.txtClearChips, this.btnApplyChipsHit, this.btnClearChipsHit);

			// chips order on init
			window.user_chips.forEach( (chip)=> {
				this.context.component_chips.chipsConf.forEach((conf) =>{
					if(conf.chipval === chip) {
						this.tempUserChips.push(conf.chipName.split("_")[2])
					}
				});
			});
			//Click Apply Now button
			this.btnApplyChipsHit.addEventListener("mousedown", (e) => {
				if (countSelectedChips != 4) return;

	        	let newChip = "";
						let chipArr = window.currencyAbbrev != "PTS" ?  ['1','3','5','10','30','50','100','200','300','500','1000'] : ['1', '5', '10', '50', '100', '500', '1000', '5000', '10000', '20000','50000'];
	        	window.user_chips = [];
						this.tempUserChips = [];

	        	for (var i = 0; i < chipCon.length; i++) {
	        		// let newChipSplit = chipCon[i].name.split('_');
	        		let newChip = chipCon[i].value;
	        		this.tempUserChips.push(chipCon[i].name.split("_")[2]);
	        		// let multiplier = newChipSplit[2].substr(-1).toLowerCase();

	        		// if (multiplier == "k") {
	        		// 	newChip = newChipSplit[2].slice(0, -1);
	        		// 	newChip = newChip+"000";
	        		// }else{
	        		// 	newChip =  newChipSplit[2];
	        		// }

	        		window.user_chips.push(newChip);
	        	}

	        	// Fill array to 5 chips to avoid error in web
	        	for (var i = 0; i < chipArr.length; i++) {
	        		if (!window.user_chips.includes(chipArr[i])) {
	        			window.user_chips.push(chipArr[i]);
	        			break;
	        		}
	        	}

	        	// Save new chips
        		$.post("/settings", {chips : window.user_chips}, (response) => {
				});

	        	this.context.component_chips.init(true);
	        	this.context.component_menu.toggleModal('modifyChips');
	        	this.visible = false;
	        });

	        //Click Clear Chips button
	        this.btnClearChipsHit.addEventListener("mousedown", (e) => {
				countSelectedChips = 0;

	        	for (var i = 0; i < chipCon.length; i++) {
	        		for (var x = 0; x < bgmodCon.length; x++) {
	        			if (this.modchipsCon[x].name == chipCon[i].name) {
	        				createjs.Tween.get(this.modchipsCon[x], { loop: false })
						  		.to({ x: bgmodCon[x].x, y: bgmodCon[x].y })

						  	chipCon[i].status = "vacant";
							chipCon[i].name = "";
							this.modchipsCon[x].status = "notselected";
	        			}
	        		}
	        	}
	        });

	        //Init selected chips container
			for(var x = 0; x < 4; x++) {
				chipCon[x] = new createjs.Bitmap(this.context.getResources("chip_container"));
				chipCon[x].scaleX = 0.65;
				chipCon[x].scaleY = 0.65;
				chipCon[x].x = 110 + (85 * x);
				chipCon[x].y = this.chipsBg.y - 40;
				chipCon[x].status = "occupied";
				window.theme == "white" ? chipCon[x].alpha = 0.5 : chipCon[x].alpha = 1;
				this.addChild(chipCon[x]);
			}

			// Chips container
        	this.chipsCon = new createjs.Container();
        	this.addChild(this.chipsCon);

        	this.reInitChips();
		}, //modifyChips
		reInitChips() {
			let chipsX = 30;
			let chipsRowX = 30;
			let bgmodMask = [];
			let bgmodTxt = [];
			let modchipsMask = [];
			let modchipsTxt = [];

			countSelectedChips = 4;

			let userChips = [];
			this.context.component_chips.chipsConf.forEach((e) => {
				window.user_chips.forEach((chip) => {
					if(e.chipval == chip) {
						userChips.push(e.chipName.split("_")[2]);
					}
				});
			});

			this.userchips = this.tempUserChips.length ? this.tempUserChips : userChips;
			this.chipsCon.removeAllChildren();

			//Init chips displayed in modal
			for(var i = 0; i < this.chip_names.length; i++) {
		    let chipName = this.chip_names[i].split('_');
        // let chipAmt = (parseInt(chipName[2]) * window.currencyMultiplier) * this.context.chipsMultiplier;
        let chipAmt = this.chipval[i] != "max" ? parseInt(this.chipval[i]) * window.currencyMultiplier : "max";
				let chipText = chipAmt;

				if (parseInt(chipText) > 999 && parseInt(chipText) < 1000000) {
					chipText = (chipText/1000) + 'K';
				}
				else if (parseInt(chipText) >= 1000000) {
					chipText = (chipText/1000000) + 'M';
				}
				else if (isNaN(parseInt(chipName[2]))) {
					chipText = 'MAX';
				}

				// Background chips
				bgmodCon[i] = new createjs.Container();
				bgmodCon[i].name = this.chip_names[i];
				bgmodCon[i].value = this.chipval[i];
				this.chipsCon.addChild(bgmodCon[i]);

				bgmodchips[i] = new createjs.Bitmap(this.context.getResources(this.chip_names[i]));
				if(window.theme == 'white') {
					this.bgoverlayChips[i] = new createjs.Shape();
					this.bgoverlayChips[i].graphics.beginFill("#000").drawCircle(0, 0, 34);
					this.bgoverlayChips[i].alpha = 0.7;
					this.bgoverlayChips[i].x = 35;
					this.bgoverlayChips[i].y = 35;
				}
				bgmodchips[i].scaleX = 0.95;
				bgmodchips[i].scaleY = 0.95;
				bgmodchips[i].alpha = 0.3;
				bgmodchips[i].cursor = "pointer";
				bgmodchips[i].name = this.chip_names[i];
				bgmodchips[i].value = this.chipval[i];

				//Chips used for selecting
				this.modchipsCon[i] = new createjs.Container();
				this.modchipsCon[i].name = this.chip_names[i];
				this.modchipsCon[i].value = this.chipval[i];
				this.modchipsCon[i].cursor = "pointer";
				this.modchipsCon[i].status = "notselected";
				this.chipsCon.addChild(this.modchipsCon[i]);

				modchips[i] = new createjs.Bitmap(this.context.getResources(this.chip_names[i]));
				modchips[i].scaleX = 0.95;
				modchips[i].scaleY = 0.95;
				modchips[i].cursor = "pointer";
				modchips[i].name = this.chip_names[i];
				modchips[i].value = this.chipval[i];
				modchips[i].status = "notselected";

				if(i <= 5){
					bgmodCon[i].x = chipsX;
					bgmodCon[i].y = this.chipsBg.y + 80;
					this.modchipsCon[i].x = chipsX;
					this.modchipsCon[i].y = this.chipsBg.y + 80;
					chipsX = chipsX + 85;
				}else{
					bgmodCon[i].x = chipsRowX;
					bgmodCon[i].y = this.chipsBg.y + 170;
					this.modchipsCon[i].x = chipsRowX;
					this.modchipsCon[i].y = this.chipsBg.y + 170;
					chipsRowX = chipsRowX + 85;
				}

				for (var j = 0; j < 4; j++) {
					let condition = (isNaN(parseInt(this.userchips[j])) && this.userchips[j].toLowerCase() == "max")
					let chip_name = '';
					let selectedChips = condition ? "single_chip_max" : "single_chip_"+ parseInt(this.userchips[j]);

					chipCon[j].status = "occupied";

					if (this.chip_names[i] == selectedChips){
						this.modchipsCon[i].status = "selected";
						this.modchipsCon[i].x = 110 + (85 * j);
						this.modchipsCon[i].y = this.chipsBg.y - 40;
						chipCon[j].name = this.chip_names[i];
						chipCon[j].value = this.chipval[i];
					}
				}

				// Background chips' mask & text
				bgmodMask[i] = new createjs.Shape();
		        bgmodMask[i].graphics.beginFill('#62646a').drawCircle(0, 0, 23);
		        bgmodMask[i].x = 34;
		        bgmodMask[i].y = 34;

		        bgmodTxt[i] = new createjs.Text(chipText, 'normal 25px bebas-regular', '#000');
		        bgmodTxt[i].textBaseline = 'middle';
		        bgmodTxt[i].textAlign = 'center';
		        bgmodTxt[i].x = 34;
		        bgmodTxt[i].y = 35;

				// Chips mask & text
				modchipsMask[i] = new createjs.Shape();
		        modchipsMask[i].graphics.beginFill('#e1e9ff').drawCircle(0, 0, 23);
		        modchipsMask[i].x = 34;
		        modchipsMask[i].y = 34;

		        modchipsTxt[i] = new createjs.Text(chipText, 'normal 25px bebas-regular', '#000');
		        modchipsTxt[i].textBaseline = 'middle';
		        modchipsTxt[i].textAlign = 'center';
		        modchipsTxt[i].x = 34;
		        modchipsTxt[i].y = 35;

		        bgmodCon[i].addChild(bgmodchips[i], bgmodMask[i], bgmodTxt[i], this.bgoverlayChips[i]);
		        this.modchipsCon[i].addChild(modchips[i], modchipsMask[i], modchipsTxt[i]);

				((i) => {
			       	this.modchipsCon[i].addEventListener("mousedown", (e) => {
			        	if(this.modchipsCon[i].status == "selected"){
			        		this.transferChips("remove", this.modchipsCon[i])
			        	}else{
			        		this.transferChips("add", this.modchipsCon[i])
			        	}
			        });
			    }(i));
			}
		},
		changeTheme(new_theme) {
			this._modalHeader.graphics.clear().beginLinearGradientFill([this.context.theme_color[new_theme].base_color, this.context.theme_color[new_theme].gradColor2], [.1, .9], 10, 10, 10, 35)
			.drawRoundRect(0, 0, this._modalWidth, 35 * 1.5, 3);
			this._headerTxt.color = this.context.theme_color[new_theme].labelcolor;
			this._headerClose.color = this.context.theme_color[new_theme].labelcolor;
			this._modalBg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0, 0, this._modalWidth, this._modalHeight);
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
					this.bgoverlayChips[i].alpha = 0.7;
					this.bgoverlayChips[i].x = 35;
					this.bgoverlayChips[i].y = 35;
					bgmodCon[i].addChild(this.bgoverlayChips[i]);
				} else {
					bgmodCon[i].removeChild(this.bgoverlayChips[i]);
				}
			}

		},
		transferChips(action, chip) {
			if (action == "remove") {
				for (var i = 0; i < bgmodCon.length; i++) {
					if (bgmodCon[i].name == chip.name) {
						createjs.Tween.get(chip, { loop: false })
							.to({ x: bgmodCon[i].x, y: bgmodCon[i].y })

						chip.status = "notselected";
						countSelectedChips--;
					}

					if (i < 4 && chipCon[i].name == chip.name) {
						chipCon[i].status = "vacant";
						chipCon[i].value = 0;
						chipCon[i].name = "";
					}
				}
			}else{
				for (var i = 0; i < chipCon.length; i++) {
					if (chipCon[i].status == "vacant" && countSelectedChips != 4) {
						createjs.Tween.get(chip, { loop: false })
							.to({ x: chipCon[i].x, y: chipCon[i].y })

						chip.status = "selected";
						chipCon[i].name = chip.name;
						chipCon[i].value = chip.value;
						chipCon[i].status = "occupied";
						countSelectedChips++;
						return false;
					}
				}
			}
  		}, //transferChips
	});
	return instance;
}
