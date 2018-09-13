let instance = null;


export default (config) => {
	instance = instance || new blu.Component({
		bet_areas: [],
		main() {

			var table_outline = null;

			if(this.context.getResources("the_betboard")) {
				table_outline = new createjs.Bitmap(this.context.getResources("the_betboard"));
				table_outline.regX =  table_outline.getBounds().width/2;
				table_outline.regY =  table_outline.getBounds().height/2;
				table_outline.x = this.context.stage.baseWidth/2 + 52
				table_outline.y = this.context.stage.baseHeight/2 + 100
				table_outline.alpha = 1
				table_outline.scaleY = 0.76
				table_outline.scaleX = 0.76
				table_outline.singleplayer = true
			}

			let adjustPosX = (130/2) + 25;
			let adjustPosy = 16;

			for (var x = 0;x<config.length;x++) {
				if(!this.context.getResources(config[x].name)) { //false checking name in resouce file
					let borderColor = '#fff';

					this.bet_areas[x]  = new createjs.Shape();
					this.bet_areas[x].graphics.clear().ss(2).beginStroke(borderColor).beginFill(config[x].bg).drawRoundRect(0,0,parseInt(config[x].width),parseInt(config[x].height),8);

					this.bet_areas[x].dropped_state = (e,x) => {  /** function returns graphics with border **/
						return e.graphics.clear().ss(2).beginStroke(borderColor).beginFill(config[x].bg).drawRoundRect(0,0,parseInt(config[x].width),parseInt(config[x].height),8);
					}

					this.bet_areas[x].normal_state = (e,x) => {  /** function returns graphics with border **/
						e.dropped_state(e,x);
					}


					this.bet_areas[x].win_state = (e,x) => {  /** function returns graphics with border **/
						e.dropped_state(e,x);
					}

					this.bet_areas[x].setBounds(0,0,parseInt(config[x].width),parseInt(config[x].height));
					this.bet_areas[x].scaleX = this.bet_areas[x].scaleY = 1;
				} else { //else if image name in resource file
					this.bet_areas[x] = createSprite(this.context.getResources(config[x].name),parseInt(config[x].width),parseInt(config[x].height), this.bet_areas[x]);
				}

				this.bet_areas[x].chip_drop_scale = (config[x].chip_drop_scale !== undefined) ? config[x].chip_drop_scale :  1 ;
				this.bet_areas[x].chip_anim_toPlay = (config[x].chip_anim_toPlay !== undefined) ? config[x].chip_anim_toPlay :  0 ;

				this.bet_areas[x].x = parseInt(config[x].posX);
				this.bet_areas[x].y = parseInt(config[x].posY);
				this.bet_areas[x].table_name = config[x].name;
				
				this.bet_areas[x].min_betAmt = parseInt(config[x].min_bet);
    			this.bet_areas[x].max_betAmt = parseInt(config[x].max_bet);

				this.bet_areas[x].singleplayer = true;
				this.bet_areas[x].multiplayer = false;
				this.bet_areas[x].payout_multiplier = 1;

				if(this.bet_areas[x].table_name == "tie") {
					this.bet_areas[x].payout_multiplier = 10;
				}
				else if (this.bet_areas[x].table_name == "suited_tie") {
					this.bet_areas[x].payout_multiplier = 50;
				}

				if(this.bet_areas[x].table_name == "tiger_hearts" || this.bet_areas[x].table_name == "tiger_clubs"
					|| this.bet_areas[x].table_name == "tiger_diamonds" || this.bet_areas[x].table_name == "tiger_spades"
					|| this.bet_areas[x].table_name == "dragon_hearts" || this.bet_areas[x].table_name == "dragon_spades"
					|| this.bet_areas[x].table_name == "dragon_clubs"|| this.bet_areas[x].table_name == "dragon_diamonds") {

					this.bet_areas[x].payout_multiplier = 3;
				}

				if(config[x].text_config) {
					this.bet_areas[x].text = new createjs.Text(config[x].text_config.text.toUpperCase(),config[x].text_config.font +"px arial",config[x].text_config.beginFill);
					this.bet_areas[x].text.textAlign = "center";
					this.bet_areas[x].text.x = this.bet_areas[x].x + this.bet_areas[x].getTransformedBounds().width / 2;
					this.bet_areas[x].text.y = this.bet_areas[x].y + 5;

					if (config[x].name == 'suited_tie') {
						this.bet_areas[x].text.y = this.bet_areas[x].y + 100;
					}
				}

				if(config[x].bet_amt !== undefined) {
					this.bet_areas[x].bet_amt_text = new createjs.Text(config[x].bet_amt,"20px arial","#e4e4e4");
					this.bet_areas[x].bet_amt_text.textAlign = "center";
					this.bet_areas[x].bet_amt_text.alpha = 0.8;
					this.bet_areas[x].bet_amt_text.x = this.bet_areas[x].x +  this.bet_areas[x].getTransformedBounds().width / 2;
					this.bet_areas[x].bet_amt_text.y = this.bet_areas[x].y + this.bet_areas[x].getTransformedBounds().height - 25;
				}

				if(config[x].betboard_img) {
					this.bet_areas[x].board_img = new createjs.Bitmap(this.context.getResources(config[x].betboard_img));
					this.bet_areas[x].board_img.scaleX = this.bet_areas[x].board_img.scaleY = 0.5;
					this.bet_areas[x].board_img.regX = this.bet_areas[x].board_img.getBounds().width/2;
					this.bet_areas[x].board_img.regY = this.bet_areas[x].board_img.getBounds().height/2;

					this.bet_areas[x].board_img.x = this.bet_areas[x].x + (this.bet_areas[x].getTransformedBounds().width/2);
					this.bet_areas[x].board_img.y = this.bet_areas[x].y + (this.bet_areas[x].getTransformedBounds().height/2) - 10;

					if (this.bet_areas[x].table_name == 'suited_tie') {
						this.bet_areas[x].board_img.y = this.bet_areas[x].y + 55;
					}

					this.bet_areas[x].board_img.hitArea = this.bet_areas[x];
				}
			} // end for
		},

	    redrawChips() {
	    	if (window.multiplayer) {
		      	this.context.component_firstViewMultiplayer.removeAllChips();

		      	for (var i = 0; i < this.context.component_firstViewMultiplayer.currentBet.length; i++) {
		      		this.context.component_firstViewMultiplayer.setMultiplayer(this.context.component_firstViewMultiplayer.currentBet[i]);
		      	}

			    this.context.component_betBoard.bet_areas.forEach((e) => {
			        if(e.chips.length) {
			           	_.find(this.context.component_firstViewMultiplayer.bet_areas, (area)=>{
			              	if(area.table_name == e.table_name) {
			               		area.total_bet_amt = e.total_bet_amt;
			                  	// this.context.component_firstViewMultiplayer.addChips(area, e.total_bet_amt);
			                  	this.context.component_firstViewMultiplayer.changeCurrentChips(e.total_bet_amt, area, false, true);
			              	}
			          	})
			        }
			    });
			}
			else {
				this.context.component_secondView.removeAllChips();

			    this.context.component_betBoard.bet_areas.forEach((e) => {
			        if(e.chips.length) {
			           	_.find(this.context.component_secondView.bet_areas, (area)=>{
			              	if(area.table_name == e.table_name) {
			               		area.total_bet_amt = e.total_bet_amt;
			                  	this.context.component_secondView.addChips(area, e.total_bet_amt);
			              	}
			          	})
			        }
			    });
			}
		},
	});

	return instance;
}
