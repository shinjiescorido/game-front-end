/**
 * scoreboard.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** draws the scoreboard **/

import {createSprite, randomNum, createCardSprite, numberCounter, playSound } from '../../factories/factories';

let instance = null;

export default () => {

	instance = instance || new blu.Component({

		round_num : [],
		dealer_card: [],
		community_card: [],
		player_card: [],
		theme: window.theme,
		result: [],
		main() {

			let table_width = 495;

			// === init
			this.table = new createjs.Shape();
			this.table.graphics.ss(1).beginStroke(this.context.theme_color[this.theme].table_border).beginFill(this.context.theme_color[this.theme].tableBg).drawRoundRectComplex(0,0,table_width,170.4,8,8,8,0);
			this.addChild(this.table);

			this.table_line = new createjs.Shape();
			this.table_line.graphics.ss(1).beginStroke(this.context.theme_color[this.theme].table_border).drawRoundRectComplex(0,0,table_width,32,8,8,0,0);
			this.addChild(this.table_line);

			this.table_1 = new createjs.Shape();
			this.table_1.graphics.ss(1).beginStroke(this.context.theme_color[this.theme].table_border).drawRect(0,32,table_width,46);
			this.addChild(this.table_1);

			this.table_2 = new createjs.Shape();
			this.table_2.graphics.ss(1).beginStroke(this.context.theme_color[this.theme].table_border).drawRect(0,79,table_width,45);
			this.addChild(this.table_2);

			this.x = 500;
			this.y = 900;

			this.game_no_label = new createjs.Text(window.language.menu.gamenocaps, window.language.locale == "zh" ? "bold 21px arial" : "bold 16px arial", this.context.theme_color[window.theme].text_color);
			window.language.locale == "zh" ? this.game_no_label.y = 5 : this.game_no_label.y = 8;
			this.game_no_label.x = 10;

			this.addChild(this.game_no_label);

			this.dealer_label = new createjs.Text(window.language.game_specific.dealer, window.language.locale == "zh" ? "bold 21px arial" : "bold 16px arial", this.context.theme_color[window.theme].text_color);
			window.language.locale == "zh" ? this.dealer_label.y = 5 : this.dealer_label.y = 8;
			this.dealer_label.x = 120;
			this.dealer_label.textAlign = 'center';
			this.addChild(this.dealer_label)


			this.community_card_label = new createjs.Text(window.language.game_specific.communitycard, window.language.locale == "zh" ? "bold 21px arial" : "bold 16px arial", this.context.theme_color[window.theme].text_color);
			window.language.locale == "zh" ? this.community_card_label.y = 5 : this.community_card_label.y = 8;
			this.community_card_label.x = 235;
			this.community_card_label.textAlign = 'center';
			this.addChild(this.community_card_label)

			this.player_label = new createjs.Text(window.language.game_specific.player, window.language.locale == "zh" ? "bold 21px arial" : "bold 16px arial", this.context.theme_color[window.theme].text_color);
			window.language.locale == "zh" ? this.player_label.y = 5 : this.player_label.y = 8;
			this.player_label.x = 355;
			this.player_label.textAlign = 'center';
			this.addChild(this.player_label);

			this.result_label = new createjs.Text(window.language.game_specific.result, window.language.locale == "zh" ? "bold 21px arial" : "bold 16px arial", this.context.theme_color[window.theme].text_color);
			window.language.locale == "zh" ? this.result_label.y = 5 : this.result_label.y = 8;
			this.result_label.x = 440;
			this.result_label.textAlign = 'center';
			this.addChild(this.result_label);

			this.table_container = new createjs.Container();
			this.addChild(this.table_container);
			// this.setResult(window.result);
			//
			this.cache(0,0,800,300)
		},
		changeTheme(new_theme) {
			let table_width = 495;
			this.theme = new_theme;
			this.table.graphics.clear().ss(1).beginStroke(this.context.theme_color[new_theme].table_border).beginFill(this.context.theme_color[new_theme].tableBg).drawRoundRectComplex(0,0,table_width,170.4,8,8,8,0);
			this.table_line.graphics.clear().ss(1).beginStroke(this.context.theme_color[new_theme].table_border).drawRoundRectComplex(0,0,table_width,32,8,8,0,0);
			this.table_1.graphics.clear().ss(1).beginStroke(this.context.theme_color[new_theme].table_border).drawRect(0,32,table_width,46);
			this.table_2.graphics.clear().ss(1).beginStroke(this.context.theme_color[new_theme].table_border).drawRect(0,79,table_width,45);
			this.game_no_label.color = this.context.theme_color[new_theme].text_color;
			this.dealer_label.color = this.context.theme_color[new_theme].text_color;
			this.community_card_label.color = this.context.theme_color[new_theme].text_color;
			this.player_label.color = this.context.theme_color[new_theme].text_color;
			this.result_label.color = this.context.theme_color[new_theme].text_color;
			if(this.round_num.length > 0)
			{
				for(var x = 0; x < this.round_num.length; x++) {
					this.round_num[x].color = this.context.theme_color[new_theme].text_color;
				}
			}
			this.updateCache();
		},
		setResult (data) {
			this.table_container.removeAllChildren();
			let res = _.cloneDeep(data);
			for(var x = 0; x < res.length; x++) {
				this.round_num[x] = new createjs.Text(res[x].roundNum,"16px arial", this.context.theme_color[this.theme].text_color);
				this.round_num[x].y = (x*46.5) + 46.5;
				this.round_num[x].textAlign = "center";
				this.round_num[x].x = 35;

				this.table_container.addChild(this.round_num[x]);
				//== dealerc

				this.dealer_card[x] = [];

				for(var i = 0;  i < res[x].gameInfo.dealer.length; i++ ) {
					this.dealer_card[x][i] = createCardSprite(this,74,99,"table_cards");
					this.dealer_card[x][i].gotoAndPlay("C"+res[x].gameInfo.dealer[i]);
					this.dealer_card[x][i].scaleX = this.dealer_card[x][i].scaleY = 0.36
					this.dealer_card[x][i].y = (x*46.1) + 37.5;
					this.dealer_card[x][i].x = (i*24) + 92;
					this.dealer_card[x][i].shadow = new createjs.Shadow("#000000", 1, 0, 6);
				} //end for

				let cnt = res[x].gameInfo.dealer.length - 1;
				for(var i = 0;  i < res[x].gameInfo.dealer.length; i++ ) {
					this.table_container.addChild(this.dealer_card[x][cnt]);
					cnt--;
				} //end for

				//== community
				let community_card = res[x].gameInfo.flop;
				community_card.push(res[x].gameInfo.turn)
				community_card.push(res[x].gameInfo.river)
				this.community_card[x] = [];
				for(var i = 0;  i < community_card.length; i++ ) {
					this.community_card[x][i]= createCardSprite(this,74,99,"table_cards");
					this.community_card[x][i].gotoAndPlay("C"+community_card[i]);
					this.community_card[x][i].x = 175 + (i*24);
					this.community_card[x][i].y = 36 + (x*46.1) + 1.5;
					this.community_card[x][i].scaleY = this.community_card[x][i].scaleX = 0.36
					this.community_card[x][i].shadow = new createjs.Shadow("#000000", 1, 0, 6);
				} // end for

				let cnt2 = community_card.length - 1;
				for(var i = 0;  i < community_card.length; i++ ) {
					this.table_container.addChild(this.community_card[x][cnt2]);
					cnt2--;
				}

				//== player
				this.player_card[x] = [];

				for(var i = 0;  i < res[x].gameInfo.player.length; i++ ) {
					this.player_card[x][i]= createCardSprite(this,74,99,"table_cards");
					this.player_card[x][i].gotoAndPlay("C"+res[x].gameInfo.player[i]);
					this.player_card[x][i].x = 328 + (i*24);
					this.player_card[x][i].y = 36 + (x*46.1) + 1.5;
					this.player_card[x][i].scaleY = this.player_card[x][i].scaleX = 0.36
					this.player_card[x][i].shadow = new createjs.Shadow("#000000", 1, 0, 6);
				} // end for

				let cnt3 = res[x].gameInfo.player.length - 1;
				for(var i = 0;  i < res[x].gameInfo.player.length; i++ ) {
					this.table_container.addChild(this.player_card[x][cnt3]);
					cnt3--;
				}
				let color = "#0059e4";
				if(res[x].result == "dealer") {
					color = "#b71c1c";
				}

				let winner = "";
				if( res[x].gameResult.winner.toLowerCase() == 'dealer') {
					winner = window.language.game_specific.dealerwins
					color = '#d32f2f';
				} else if(res[x].gameResult.winner.toLowerCase() == 'player') {
					winner =window.language.game_specific.playerwins;
					color = '#1565c0';
				} else {
					winner =window.language.game_specific.tie;
					color = '#567f2e';
				}

				this.result[x] = new createjs.Text(winner, window.language.locale == "zh" ? "bold 21px arial" : "bold 14px arial", color);
        this.result[x].textAlign = "center";
 				this.result[x].x = 435;
				if(window.language.locale == "jp") {
 				    this.result[x].font = "bold 13px arial";
				}
				this.result[x].y = (x*46) + 47;
				this.table_container.addChild(this.result[x])

				if(res[x].gameInfo.isVoid) {

				  let voidContainer = new createjs.Container();

				  let voidShape = new createjs.Shape();
				  voidShape.graphics.beginFill("#212120").drawRect(-15,-4,512,45);
				  voidContainer.addChild(voidShape);
				  voidContainer.y = 36 + (x*46.1) + 1.5;
				  voidContainer.x = 0;

				  let voidText = new createjs.Text("GAME VOID", "16px lato-regular", "#fff");
				  voidText.set({x: (500/3) + 14, y: (45/2) - 4, textBaseline:"middle"});
				  voidContainer.addChild(voidText);

				  let voidImg = new createjs.Bitmap(this.context.getResources("void"));
				  voidImg.set({x: voidText.x + voidText.getMeasuredWidth() + 14 , regY: voidImg.getBounds().height/2, y: (45/2) - 4});
				  voidContainer.addChild(voidImg);

				  this.table_container.addChild(voidContainer);
				}
			} // end for

			this.updateCache();
		},
		capitalizeFirstLetter(string) {
		    return string.charAt(0).toUpperCase() + string.slice(1);
		}
	});

	return instance;
}
