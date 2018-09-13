let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {

			this.bg = new createjs.Shape();
			this.bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRoundRectComplex(0,0,220,185, 0, 10, 10, 0);
			this.bg.alpha = 0.8;
			this.addChild(this.bg);

			this.label = new createjs.Text(window.language.game_specific.bonuspayout.toUpperCase(), window.language.locale == "zh" && window.bet_type !='b' ? "20px lato-black" : "18px lato-black",this.context.theme_color[window.theme].text_color);
			this.label.textAlign = "center";
			this.label.x = 95;
			this.label.y = 10;

			this.y = this.context.context.height/2 - 110
			this.addChild(this.label);

			this.win_1 = {
				label : new createjs.Text(window.language.payouts.players_whole_card_1, window.language.locale == "zh" ? "17px lato-regular" : "14px lato-regular",this.context.theme_color[window.theme].text_color),
				payout : new createjs.Text("30","14px lato-regular",this.context.theme_color[window.theme].text_color)
			}
			this.win_1.label.x = 10;
			this.win_1.label.y = 40;
			this.win_1.payout.y = 40 ;
			this.win_1.payout.x = 210; //190;
			this.win_1.payout.textAlign = 'right';
			this.addChild(this.win_1.label, this.win_1.payout);

			console.log("this.win_1.label", this.win_1.label);

			this.win_2 = {
				label : new createjs.Text(window.language.payouts.players_whole_card_2, window.language.locale == "zh" ? "17px lato-regular" : "14px lato-regular",this.context.theme_color[window.theme].text_color),
				payout : new createjs.Text("25","14px lato-regular",this.context.theme_color[window.theme].text_color)
			}
			this.win_2.label.x = 10;
			this.win_2.label.y = 60;
			this.win_2.payout.y = 60;
			this.win_2.payout.x =  210;//190;
			this.win_2.payout.textAlign = 'right';
			this.addChild(this.win_2.label, this.win_2.payout);

			this.win_3 = {
				label : new createjs.Text(window.language.payouts.players_whole_card_3, window.language.locale == "zh" ? "17px lato-regular" : "14px lato-regular",this.context.theme_color[window.theme].text_color),
				payout : new createjs.Text("20","14px lato-regular",this.context.theme_color[window.theme].text_color)
			}
			this.win_3.label.x = 10;
			this.win_3.label.y = 80;
			this.win_3.payout.y = 80;
			this.win_3.payout.x =  210;//190;
			this.win_3.payout.textAlign = 'right';
			this.addChild(this.win_3.label, this.win_3.payout);

			this.win_4 = {
				label : new createjs.Text(window.language.payouts.players_whole_card_4, window.language.locale == "zh" ? "17px lato-regular" : "14px lato-regular",this.context.theme_color[window.theme].text_color),
				payout : new createjs.Text("15","14px lato-regular",this.context.theme_color[window.theme].text_color)
			}
			this.win_4.label.x = 10;
			this.win_4.label.y = 100;
			this.win_4.payout.y = 100;
			this.win_4.payout.x =  210;//190;
			this.win_4.payout.textAlign = 'right';
			this.addChild(this.win_4.label, this.win_4.payout);

			this.win_5 = {
				label : new createjs.Text(window.language.payouts.players_whole_card_5, window.language.locale == "zh" ? "17px lato-regular" : "14px lato-regular",this.context.theme_color[window.theme].text_color),
				payout : new createjs.Text("10","14px lato-regular",this.context.theme_color[window.theme].text_color)
			}
			this.win_5.label.x = 10;
			this.win_5.label.y = 120;
			this.win_5.payout.y = 120;
			this.win_5.payout.x =  210//190;
			this.win_5.payout.textAlign = 'right';
			this.addChild(this.win_5.label, this.win_5.payout);

			this.win_6 = {
				label : new createjs.Text(window.language.payouts.players_whole_card_6, window.language.locale == "zh" ? "17px lato-regular" : "14px lato-regular",this.context.theme_color[window.theme].text_color),
				payout : new createjs.Text("5","14px lato-regular",this.context.theme_color[window.theme].text_color)
			}
			this.win_6.label.x = 10;
			if(window.language.locale == 'jp')  this.win_6.label.font = "12px lato-regular";
			this.win_6.label.y = 140;
			this.win_6.payout.y = 140;
			this.win_6.payout.x =  210;//190;
			this.win_6.payout.textAlign = 'right';
			this.addChild(this.win_6.label, this.win_6.payout);

			this.win_7 = {
				label : new createjs.Text(window.language.payouts.players_whole_card_7, window.language.locale == "zh" ? "17px lato-regular" : "14px lato-regular",this.context.theme_color[window.theme].text_color),
				payout : new createjs.Text("3","14px lato-regular",this.context.theme_color[window.theme].text_color)
			}
			this.win_7.label.x = 10;
			this.win_7.label.y = 160;
			this.win_7.payout.y = 160;
			this.win_7.payout.x =  210;//190;
			this.win_7.payout.textAlign = 'right';
			this.addChild(this.win_7.label, this.win_7.payout);

			//--- bonusplus paginator start
			let payout_page = 0;
			this.arrow_right = new createjs.Container();
			this.arrow_left = new createjs.Container();

			if(window.bet_type == 'b'){
				//---  right arrow start
				this.arrow_right_bg = new createjs.Shape();
				this.arrow_right_bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawCircle(0,0,15);
				this.arrow_right_bg.alpha = 0.03;
				this.arrow_right_bg.set({
					x: 8,
					y: 27
				});

				this.arrow_right_text = new createjs.Text('>', window.language.locale == "zh" ? "27px lato-black" : "27px lato-black",this.context.theme_color[window.theme].menu_text_color);
				this.arrow_right_text.scaleY = 1.5;
				this.arrow_right_text.set({
					scaleY: 1.5,
					textAlign: 'center',
					x: 5
				});

				this.arrow_right.addChild(this.arrow_right_bg, this.arrow_right_text);
				this.arrow_right.graphics = true;
				this.arrow_right.x =  200;//176;
				this.arrow_right.y = -5;
				this.arrow_right.addEventListener('click', () => {
					this.change_page(
						['bonusplus','pocket','badbeat'][(++payout_page > 1 ? payout_page = 2 : payout_page)],
						this.arrow_left,
						this.arrow_right,
						this.label
					);
				});

				this.addChild(this.arrow_right);
				//--- right arrow end

				//--- left arrow start
				this.arrow_left_bg = new createjs.Shape();
				this.arrow_left_bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawCircle(0,0,18);
				this.arrow_left_bg.alpha = 0.03;
				this.arrow_left_bg.set({
					x: 1,
					y: 27
				});


				this.arrow_left_text = new createjs.Text('<', window.language.locale == "zh" ? "27px lato-black" : "27px lato-black",this.context.theme_color[window.theme].menu_text_color);
				this.arrow_left_text.scaleY = 1.5;
				this.arrow_left_text.set({
					scaleY: 1.5,
					textAlign: 'center',
					x: 5
				});

				this.arrow_left.addChild(this.arrow_left_bg, this.arrow_left_text);
				this.arrow_left.graphics = true;
				this.arrow_left.x = 12;
				this.arrow_left.y = -5;
				this.arrow_left.addEventListener('click', () => {
					this.change_page(
						['bonusplus','pocket','badbeat'][(--payout_page < 1 ? payout_page = 0 : payout_page)],
						this.arrow_left,
						this.arrow_right
					);
				});


				this.addChild(this.arrow_left);

				this.change_page('bonusplus', this.arrow_left, this.arrow_right);//init page
				//--- left arrow end
			}
			//--- bonusplus paginator end
		},
		changeTheme(new_theme) {
			this.bg.graphics.beginFill(this.context.theme_color[new_theme].base_color).drawRoundRectComplex(0,0,220,185, 0, 10, 10, 0);
			this.label.color = this.context.theme_color[new_theme].text_color;
			this.win_1.label.color = this.context.theme_color[new_theme].text_color;
			this.win_1.payout.color = this.context.theme_color[new_theme].text_color;
			this.win_2.label.color = this.context.theme_color[new_theme].text_color;
			this.win_2.payout.color = this.context.theme_color[new_theme].text_color;
			this.win_3.label.color = this.context.theme_color[new_theme].text_color;
			this.win_3.payout.color = this.context.theme_color[new_theme].text_color;
			this.win_4.label.color = this.context.theme_color[new_theme].text_color;
			this.win_4.payout.color = this.context.theme_color[new_theme].text_color;
			this.win_5.label.color = this.context.theme_color[new_theme].text_color;
			this.win_5.payout.color = this.context.theme_color[new_theme].text_color;
			this.win_6.label.color = this.context.theme_color[new_theme].text_color;
			this.win_6.payout.color = this.context.theme_color[new_theme].text_color;
			this.win_7.label.color = this.context.theme_color[new_theme].text_color;
			this.win_7.payout.color = this.context.theme_color[new_theme].text_color;
			if(window.bet_type == 'b'){
				this.arrow_left_text.color = this.context.theme_color[new_theme].menu_text_color;
				this.arrow_left_bg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawCircle(0,0,15);
				this.arrow_right_text.color = this.context.theme_color[new_theme].menu_text_color;
				this.arrow_right_bg.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawCircle(0,0,15);
			}
		},
		/**
		*
		* @param payout_page
		* @param arrow_left
		* @param arrow_right
		*/
		change_page(payout_page, arrow_left, arrow_right) {
			for(let i=1;i<8;i++){//clear text
				this['win_'+i].label.text = '';
				this['win_'+i].payout.text = '';
			}

			this.label.text = window.language.game_specific[payout_page+'payout'].toUpperCase();
			this.label.x = 98;
			
			if(payout_page == 'bonusplus'){
				arrow_left.visible = false;
				for(let i=1;i<7;i++){
					this['win_'+i].label.text = window.language.payouts['bonus_plus_payout_'+i];
					this['win_'+i].payout.text = this.getPayout(i);

				}
			}

			if(payout_page == 'pocket'){
				this.label.x = 110;
				arrow_left.visible = true;
				arrow_right.visible = true;
				this['win_1'].label.text = window.language.payouts['players_whole_card_1'];
				this['win_1'].payout.text = '30:1';
				this['win_2'].label.text = window.language.payouts['players_whole_card_8'];
				this['win_2'].payout.text = '3:1';
			}

			if(payout_page == 'badbeat'){
				arrow_right.visible = false;
				this.label.x = 104.5;
				for(let i=1;i<6;i++){//no royal flush in badbeat
					let list_index = i + 1;
					this['win_'+i].label.text = window.language.payouts['bonus_plus_payout_'+list_index];
					this['win_'+i].payout.text = this.getPayout(list_index,1);
				}
			}

		},
		/**
		*
		* @param index
		* @param isBadBeat
		* @returns {*}
		*/
		getPayout(index,isBadBeat = 0) {
			return [
				['500:1','-'],//royal flush
				['50:1','500:1'],//strait flush
				['10:1','50:1'],//four of a kind
				['3:1','10:1'],//full house
				['1.5:1','8:1'],//flush
				['1:1','5:1']//strait
			][index-1][isBadBeat];
		}
	});

	return instance;
}
