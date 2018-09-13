import {createSprite, randomNum, createCardSprite, numberCounter, playSound } from '../../factories/factories';

let cardScale = 0.55;
export default()=> {
	return new blu.Component({
		main() {

			this.visible = false;
			this.x = 238;
            this.y = 901;
            
            this.bg = new createjs.Shape();
            this.bg.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(-18,-11,990, 190);
            this.addChild(this.bg);

            this.overlay = new createjs.Shape();
            this.overlay.graphics.beginFill('rgba(0,0,0,0.6)').drawRect(-18,-11,990, 190);
            this.addChild(this.overlay);

			let dealer_bg = new createjs.Shape();
			dealer_bg.graphics.beginFill("#7f1d1d").drawRoundRect(0,0,205,165,10);
			dealer_bg.isBg = true;
			this.addChild(dealer_bg)

			let community_bg = new createjs.Shape();
			community_bg.graphics.beginFill("rgba(255,255,255,0.2)").drawRoundRect(223,0,510,165,10);
			community_bg.isBg = true;
			this.addChild(community_bg)

			let player_bg = new createjs.Shape();
			player_bg.graphics.beginFill("#0c3e66").drawRoundRect(752,0,205,165,10);
			player_bg.isBg = true;
            this.addChild(player_bg);
            
            this.playerCards = ["C0038", "C0024"];
            this.communityCards = ["C0023", "C0044", "C0021", "C0035","C0014"];
            this.dealerCards = ["C0045", "C0004"];
            this.playerCardObj = [];
            this.communityCardObj = [];
            this.dealerCardObj = [];

            let self = this;
            this.playerCards.forEach((player, x) => {
                self.playerCardObj[x] = createCardSprite(self, 190, 263,"new_cards");
				self.playerCardObj[x].scaleX = self.playerCardObj[x].scaleY = cardScale;
                self.playerCardObj[x].regX = self.playerCardObj[x].getBounds().width/2;
                this.playerCardObj[x].x = (x*74) + 815.7;
                this.playerCardObj[x].y = 10;
                self.playerCardObj[x].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
                self.playerCardObj[x].gotoAndStop("back_blue");
                self.addChild(self.playerCardObj[x]);
            });

            this.communityCards.forEach((community, x) => {
                self.communityCardObj[x] = createCardSprite(self, 190, 263,"new_cards");
				self.communityCardObj[x].scaleX = self.communityCardObj[x].scaleY = cardScale;
                self.communityCardObj[x].regX = self.communityCardObj[x].getBounds().width/2;
                this.communityCardObj[x].x = (x*94.7) +  288.5;
                this.communityCardObj[x].y = 10;
                self.communityCardObj[x].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
                self.communityCardObj[x].gotoAndStop("back_blue");
                self.addChild(self.communityCardObj[x]);
            });

            this.dealerCards.forEach((dealer, x) => {
                self.dealerCardObj[x] = createCardSprite(self, 190, 263,"new_cards");
				self.dealerCardObj[x].scaleX = self.dealerCardObj[x].scaleY = cardScale;
                self.dealerCardObj[x].regX = self.dealerCardObj[x].getBounds().width/2;
                this.dealerCardObj[x].x = (x*74) + 65;
                this.dealerCardObj[x].y = 10;
                self.dealerCardObj[x].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
                self.dealerCardObj[x].gotoAndStop("back_blue");
                self.addChild(self.dealerCardObj[x]);
            });

        },
        
        changeTheme(new_theme){
            this.bg.graphics.beginFill(this.context.theme_color[new_theme].base_color).drawRect(-18,-11,990, 190);
        },
        
        play() {
            this.visible = true;
            this.playerCardObj[0].shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0,0,15);
            this.playerCardObj[1].shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0,0,15);
        },

        playFlop() {
            let self = this;
            
            for(let i =0; i < this.playerCards.length;i++)
            {
                createjs.Tween.get(self.playerCardObj[i])
                .to({
                    scaleX:0
                },200)
                .call((obj,anim)=>{
                    obj.gotoAndPlay(anim);
                },[self.playerCardObj[i], self.playerCards[i]])
                .to( {
                    scaleX: cardScale
                },200)
                .call(() => {
                    self.playerCardObj[0].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
                    self.playerCardObj[1].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
                    self.communityCardObj[0].shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0,0,15);
                    self.communityCardObj[1].shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0,0,15);
                    self.communityCardObj[2].shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0,0,15);
                });
            }

        },

        playTurn()
        {
            let self = this;
            for(let i=0; i < self.communityCards.length - 2;i++)
            {
                createjs.Tween.get(self.communityCardObj[i])
                .to({
                    scaleX:0
                },200)
                .call((obj,anim)=>{
                    obj.gotoAndPlay(anim);
                },[self.communityCardObj[i], self.communityCards[i]])
                .to( {
                    scaleX: cardScale
                },200)
                .wait(300)
                .call(() => {
                    self.communityCardObj[i].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4);
                    self.communityCardObj[3].shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0,0,15);
                });
            }   
        },

        playRiver(){
            let self = this;
            createjs.Tween.get(self.communityCardObj[3])
            .to({
                scaleX:0
            },200)
            .call((obj,anim)=>{
                obj.gotoAndPlay(anim);
            },[self.communityCardObj[3], self.communityCards[3]])
            .to( {
                scaleX: cardScale
            },200)
            .call(() => {
                self.communityCardObj[3].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
                setTimeout(() => {
                    self.communityCardObj[4].shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0,0,15);
                    self.dealerCardObj[0].shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0,0,15);
                    self.dealerCardObj[1].shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0,0,15);
                }, 300);
            });
        },

        finishPlay(){
            let self = this;
            this.overlay.visible = false;
            createjs.Tween.get(self.communityCardObj[4])
            .to({
                scaleX:0
            },200)
            .call((obj,anim)=>{
                obj.gotoAndPlay(anim);
            },[self.communityCardObj[4], self.communityCards[4]])
            .to( {
                scaleX: cardScale
            },200)
            .call(() => {
                self.communityCardObj[4].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
            });

            for(let i =0; i < self.dealerCards.length;i++)
            {
                createjs.Tween.get(self.dealerCardObj[i])
                .to({
                    scaleX:0
                },200)
                .call((obj,anim)=>{
                    obj.gotoAndPlay(anim);
                },[self.dealerCardObj[i], self.dealerCards[i]])
                .to( {
                    scaleX: cardScale
                },200)
                .call(() => {
                    self.dealerCardObj[i].shadow = new createjs.Shadow("rgba(0,0,0,0.8)", -2,0,4)
                });
            }
        }

	});
}
