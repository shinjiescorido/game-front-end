

import cardsModule from '../factories/cards';

let instance = null;
let CONTROLLER = {};

let is_click = false;

const baccaratTotal = (gameInfo) => {
	let total = {
		player: 0,
		banker: 0
	};

	_.forEach(gameInfo, (row, key) => {
		if (!row) {
			return ;
		}

		let card = cardsModule(row).value;
		card = card >= 10 ? 0 : card;

		total[key.indexOf('banker') !== -1 ? 'banker': 'player'] += card;
		total[key.indexOf('banker') !== -1 ? 'banker': 'player'] %= 10;
	});

	return total;
};


export default (self) => {
	instance = {
		initFpf : () => {

			window.clickFlip = new createjs.Stage("flipclick");
			window.clickFlip.update();

			CONTROLLER.FPF1 = FPF_CONTROLLER2.create();

		    CONTROLLER.FPF2 = FPF_CONTROLLER2.create();

		    CONTROLLER.FPF1.init("#flip-card-canvas1", false);

		    CONTROLLER.FPF2.init("#flip-card-canvas2", false);

			window.addEventListener("resize",()=>{
				CONTROLLER.FPF1.getStage().resizeUpdate();
				CONTROLLER.FPF2.getStage().resizeUpdate();
			});
		},
		handleForceFlip : (selected_flip_card) => {

			selected_flip_card.clicky.visible = false;
			
			var currCard = null //hide card
			var control_canvas =  null;
			var flip_ctrl =  null;

			if(!self.selected_flip_card) return;

			if(self.selected_flip_card.card_type == "banker") {
				currCard = CONTROLLER.FPF2.doFlip("/img/cards/"+self.selected_flip_card.code.split("C")[1] + ".png"); //hide card
				control_canvas =  CONTROLLER.FPF2.getCanvas();
				flip_ctrl =  CONTROLLER.FPF2;
				CONTROLLER.FPF1.getCanvas().hide();
			} else {
				currCard =  CONTROLLER.FPF1.doFlip("/img/cards/"+self.selected_flip_card.code.split("C")[1] + ".png");
				control_canvas = CONTROLLER.FPF1.getCanvas()
			 	flip_ctrl =  CONTROLLER.FPF1;
				CONTROLLER.FPF2.getCanvas().hide();
			}

			// if(self.mobile) {
				currCard.changeOrientation("portrait");
			// } else {
			// 	if(!is_click) {
			// 		currCard.changeOrientation("portrait");
			// 		is_click = true;
			// 	}
			// }
			setTimeout(()=>{
				// if(self.mobile) {
					currCard.changeOrientation("landscape");
				// }
			}, 100)

			if (!currCard.isFront && currCard.context.el.style.visibility!="hidden"){
				control_canvas.show()
	        	currCard.forceFlip('l');
	        	currCard.onFlipEnd = function(e) {
	        		
					selected_flip_card.gotoAndStop(selected_flip_card.code);
					selected_flip_card.isAnim = true
					selected_flip_card.is_flip = true
					let total = baccaratTotal(self.cards_gameInfo);
					let player_val = total.player;
					let banker_val = total.banker;

					self.component_card_result_total.setPlayerValue(player_val);
					self.component_card_result_total.setBankerValue(banker_val);
					// *** flip val** //

					// self.component_card_result.setCardResult(cards)
	        	}
	        }

	        setTimeout(function() {
	          flip_ctrl.doFlipClose();
	          control_canvas.hide();
	          flip_ctrl.reset()
	        }, 2000);

			selected_flip_card.clicky.visible = false;

			// console.log(self.cards_gameInfo, "waaaat")
			// let total = baccaratTotal(self.cards_gameInfo);
			// console.log(total, "waaaat")
			// let player_val = total.player;
			// let banker_val = total.banker;

			// self.component_card_result_total.setPlayerValue(player_val);
			// self.component_card_result_total.setBankerValue(banker_val);
			// // *** flip val** //

			// self.component_card_result.setCardResult(cards)
		},

		handleClickFlip : (toFlipcards) => {
			let selected_flip_card = null;

			$(".hack").show();

			$("#flipclick").show();
			let selectHack = [];

			window.clickFlip.removeAllChildren();
			window.clickFlip.update();

			let width = 100;
			let height = 135;
			let adjust_banker = 255;
			let cardsY2= 280;
			let cardsY= 140;
			let xx = 10;
			toFlipcards.forEach((e, x) => {

				if(self.mobile) {
					width = 75; height = 110;
					adjust_banker = 220;
					cardsY2 = 235;
					cardsY = 114;
					xx = 5
				}

				selectHack.push(new createjs.Shape());
				selectHack[selectHack.length-1].graphics.beginFill("rgba(255,255,255,0.01)").drawRect(0,0,width,height);

				window.clickFlip.addChild(selectHack[selectHack.length-1]);

				if(toFlipcards[x].card_type == "banker") {
					selectHack[selectHack.length-1].x = (x* (width+xx)) +adjust_banker;
					if((selectHack.length-1) == 2) {
						if(self.mobile) {
							selectHack[selectHack.length-1].x -= 20;
						}else {
							selectHack[selectHack.length-1].x -= 45;
						}
					}

				} else {
					if((selectHack.length-1) == 0) {
						if(self.mobile) {
							selectHack[selectHack.length-1].x = 122;
						} else {
							selectHack[selectHack.length-1].x = 132;
						}
					} else if((selectHack.length-1) == 1 ) {
						selectHack[selectHack.length-1].x = 40;
					}
					 else if((selectHack.length-1) == 2 ) {
					 	if(self.mobile) {
							selectHack[selectHack.length-1].x = 165;
					 	} else {
							selectHack[selectHack.length-1].x = 200;
					 	}
					}
				}

				selectHack[selectHack.length-1].y = cardsY;
				selectHack[selectHack.length-1].attached = toFlipcards[x];

				if((selectHack.length-1) == 2) {
					if(self.mobile) {
						selectHack[selectHack.length-1].rotation = toFlipcards[x].rotation;
					} else {
						selectHack[selectHack.length-1].rotation = toFlipcards[x].rotation;
					}
					selectHack[selectHack.length-1].y = cardsY2;
				}

				// console.log(selectHack[selectHack.length-1], "slected");

				window.clickFlip.update();
			});

			toFlipcards.forEach((e)=>{

				if(!e.is_flip) {
					e.shadow = new createjs.Shadow("#fff",0,0,10);
					createjs.Tween.get(e.shadow,{loop:true})
					.to({ blur: 25 },500)
					.to({ blur: 0 },500)
				} else {
					e.shadow = null;
				}
			});


			selectHack.forEach((e)=> {
				e.addEventListener("click", (card) => {
					card.currentTarget = card.currentTarget.attached;
					// console.log(card, "walalalala selected flip")

					// if(card.currentTarget.is_selected) return;
					if(card.currentTarget.is_flip) return;

					CONTROLLER.FPF1.reset();
					CONTROLLER.FPF2.reset();

					card.currentTarget.is_selected = true;

					if(e.attached.card_type == "player") {

						CONTROLLER.FPF1.doFlipClose();

						var cardFp = CONTROLLER.FPF1.getCard();
						cardFp.setBackImage("/img/cards/back-"+e.attached.card_type+".png");

						var currCard = CONTROLLER.FPF1.doFlip("/img/cards/hidden/"+card.currentTarget.code.split("C")[1] + ".png"); //hide card
						CONTROLLER.FPF1.getCanvas().hide();
						
						// if(self.mobile) {
							currCard.changeOrientation("portrait");
						// } else {
						// 	if(!is_click) {
						// 		currCard.changeOrientation("portrait");
						// 		is_click = true;
						// 	}
						// }

						let control = CONTROLLER.FPF1;
						setTimeout(() => {
							control.getCanvas().show();
							// if(self.mobile) {
								currCard.changeOrientation("landscape");
							// }
						}, 100);


							selected_flip_card = card.currentTarget;
							self.selected_flip_card = card.currentTarget;

							currCard.onFlipEnd = function(e) {
								if (e.isFront) {
										self.card_flip_cnt++
										var cardFp = CONTROLLER.FPF1.getCard();
										cardFp.setBackImage("/img/cards/"+card.currentTarget.code.split("C")[1] + ".png"); // show card
										card.currentTarget.shadow = null;
										card.currentTarget.gotoAndStop(card.currentTarget.code);
										card.currentTarget.isAnim = true
										card.currentTarget.is_flip = true
										let control = CONTROLLER.FPF1;
										card.currentTarget.clicky.visible = false

								 		self.flipped_game_info[self.selected_flip_card.card_type+""+self.card_flip_cnt] = self.selected_flip_card.code.split("C")[1]
										
										setTimeout(()=>{
											control.reset();
											control.getCanvas().hide();
											self.selected_flip_card  = null
											control.doFlipClose();
									          // control_canvas.hide();
									          // flip_ctrl.reset()
										}, 800)
										
										// if(self.mobile) {
										// 	setTimeout(()=>{
										// 		control.reset();
										// 		control.getCanvas().hide();
										// 		self.selected_flip_card  = null
										// 	}, 2000)
										// }
										//** card total **//
								 		let total = baccaratTotal(self.flipped_game_info);

								 		let val = total[self.selected_flip_card.card_type];
										// 	console.log(self.flipped_game_info, "watataattat")
									 	if(self.selected_flip_card.card_type== "player") {
									 		self.component_card_result_total.setPlayerValue(val);
									 	} else {
									 		self.component_card_result_total.setBankerValue(val);

									 	}

									}
							}

					}	else {

							CONTROLLER.FPF2.doFlipClose();

							var cardFp = CONTROLLER.FPF2.getCard();
							cardFp.setBackImage("/img/cards/back-"+e.attached.card_type+".png");

							var currCard =CONTROLLER.FPF2.doFlip("/img/cards/hidden/"+card.currentTarget.code.split("C")[1] + ".png"); // hide card

							CONTROLLER.FPF2.getCanvas().hide();

							// if(self.mobile) {
							// 	currCard.changeOrientation("portrait");
							// } else {
								// if(!is_click) {
									currCard.changeOrientation("portrait");
							// 		is_click = true
							// 	}
							// }

							let control = CONTROLLER.FPF2;

							selected_flip_card = card.currentTarget;
							self.selected_flip_card = card.currentTarget;

							setTimeout(function() {
								control.getCanvas().show();
								// if(self.mobile) {
									currCard.changeOrientation("landscape");
								// }
							}, 100);

							currCard.onFlipEnd = function(e) {
								self.card_flip_cnt++
								if (e.isFront) {
									var cardFp = CONTROLLER.FPF2.getCard();

									cardFp.setBackImage("/img/cards/"+card.currentTarget.code.split("C")[1] + ".png");// show card
									card.currentTarget.shadow = null;
									card.currentTarget.gotoAndStop(card.currentTarget.code);
									card.currentTarget.isAnim = true;
									card.currentTarget.is_flip  = true;

									let control = CONTROLLER.FPF2;

									card.currentTarget.clicky.visible = false;

							 		self.flipped_game_info[self.selected_flip_card.card_type+""+self.card_flip_cnt] = self.selected_flip_card.code.split("C")[1];

									setTimeout(()=>{
										control.reset();
										control.getCanvas().hide();
										self.selected_flip_card  = null
										control.doFlipClose();
									}, 800)

									// if(self.mobile) {
									// 	setTimeout(()=>{
									// 		control.reset();
									// 		control.getCanvas().hide();
									// 		self.selected_flip_card  = null
									// 	}, 2000)
									// }

								 	let total = baccaratTotal(self.flipped_game_info);

								 	let val = total[self.selected_flip_card.card_type];

								 	if(self.selected_flip_card.card_type== "player") {
								 		self.component_card_result_total.setPlayerValue(val);
								 	} else {
								 		self.component_card_result_total.setBankerValue(val);

								 	}

								}
							}
						}

						// console.log(self.selected_flip_card,"selected card")

						self.selected_flip_card = selected_flip_card;

						// return selected_flip_card;
				});

			});

		},
		reset : () => {
			CONTROLLER.FPF1.reset();
			CONTROLLER.FPF2.reset();
			window.clickFlip.removeAllChildren();
			window.clickFlip.update();

			$(".hack").hide();

		} ,
		hide : () => {
			CONTROLLER.FPF1.getCanvas().hide();
			CONTROLLER.FPF2.getCanvas().hide();
			$(".hack").hide();
		},
		orientationReset : () => {
			// is_click = false;
		}
	}

	return instance;

}
