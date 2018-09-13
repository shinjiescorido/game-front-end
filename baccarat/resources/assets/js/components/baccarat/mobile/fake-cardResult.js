import {createSprite, randomNum, createCardSprite, numberCounter, playSound } from '../../../factories/factories';

export default()=> {
	return new blu.Component({
		main() {

            let cardContainer = new createjs.Container();
            
			let background = new createjs.Shape();
			background.graphics.beginFill("rgba(0,0,0,0.5)").drawRoundRect(-20,-60,486,340,14);
			background.y = -29;
			this.addChild(background);

			this.player_circle = new createjs.Shape();
			this.player_circle.graphics.ss(2).beginStroke("#595a5a").beginFill("#1976d2").drawCircle(0,0,40);
			this.player_circle.y = -25;
			this.player_circle.x = 140;
			this.addChild(this.player_circle);

			this.banker_circle = new createjs.Shape();
			this.banker_circle.graphics.ss(2).beginStroke("#595a5a").beginFill("#d32f2f").drawCircle(0,0,40);
			this.banker_circle.y = -25;
			this.banker_circle.x = 350;
			this.addChild(this.banker_circle);

			// === total
			this.player_total = new createjs.Text("0", "bold 60px arial" ,"#fff");
			this.player_total.y = this.player_circle.y;
			this.player_total.x = 140;
			this.player_total.textBaseline = "middle";
			this.player_total.textAlign = "center";
			this.addChild(this.player_total);

			this.banker_total = new createjs.Text("0", "bold 60px arial", "#fff");
			this.banker_total.y = this.banker_circle.y;
			this.banker_total.x = 350;
			this.banker_total.textBaseline = "middle";
			this.banker_total.textAlign = "center";

            this.addChild(this.banker_total);
            
            this.x = -15;
            this.visible = false;
            this.y = 300;
            this.scaleX = this.scaleY = 0.9;
            this.playerCards = ["C0023", "C0038", "C0024"];
			this.bankerCards = ["C0044", "C0045", "C0004"];
			this.playerCardObj = [];
			this.bankerCardObj = [];
			let self = this;
			this.playerCards.forEach((player, x) => {
				self.playerCardObj[x] = createCardSprite(self, 80, 120,"new_cards");
				self.playerCardObj[x].scaleX = self.playerCardObj[x].scaleY = 0.94;
				self.playerCardObj[x].regX = self.playerCardObj[x].getBounds().width/2;
				self.playerCardObj[x].gotoAndStop("back_blue");
				switch(x)
				{
					case 0:
					self.playerCardObj[x].x = 180;
					self.playerCardObj[x].y = 39;
					break;
					case 1:
					self.playerCardObj[x].x = 100;
					self.playerCardObj[x].y = 39;
					break;
					case 2:
					self.playerCardObj[x].x = 195;
					self.playerCardObj[x].y = 194;
					self.playerCardObj[x].rotation = 90;
					break;
				}
				cardContainer.addChild(self.playerCardObj[x]);
			});

			this.bankerCards.forEach((banker, y) => {
				self.bankerCardObj[y] = createCardSprite(self, 80, 120,"new_cards");
				self.bankerCardObj[y].scaleX = self.bankerCardObj[y].scaleY = 0.94;
				self.bankerCardObj[y].regX = self.bankerCardObj[y].getBounds().width/2;
                if(window.t_type == "flippy" && y < 2)
				{
					self.bankerCardObj[y].gotoAndStop(60);
				}
				else
				{
					self.bankerCardObj[y].gotoAndStop("back_red");
				}
				switch(y)
				{
					case 0:
					self.bankerCardObj[y].x = 310;
					self.bankerCardObj[y].y = 39;
					break;
					case 1:
					self.bankerCardObj[y].x = 390;
					self.bankerCardObj[y].y = 39;
					break;
					case 2:
					self.bankerCardObj[y].x = 408;
					self.bankerCardObj[y].y = 194;
					self.bankerCardObj[y].rotation = 90;
					break;
				}
				cardContainer.addChild(self.bankerCardObj[y]);
			});
			
			this.addChild(cardContainer);
        },

        play(){
            this.visible = true;
			let playerResult = [0,0,0];
			let bankerResult = [6,3,8];

			if(window.t_type == "flippy") return;
			for(let i =0; i < this.playerCards.length;i++)
			{
				let self = this;
				setTimeout(()=>{
					createjs.Tween.get(self.playerCardObj[i])
					.to({
						scaleX:0
					},200)
					.call((obj,anim)=>{
						obj.gotoAndPlay(anim);
					},[self.playerCardObj[i], self.playerCards[i]])
					.to( {
						scaleX: 0.94
					},200)
					.call(()=>{
						self.setPlayerValue(playerResult[i])
					});

				}, 1000 * (i+1));
			}
			for(let j =0; j < this.bankerCards.length;j++)
			{
				let self = this;
				setTimeout(()=>{
					createjs.Tween.get(self.bankerCardObj[j])
					.to({
						scaleX:0
					},200)
					.call((obj,anim)=>{
						obj.gotoAndPlay(anim);
					},[self.bankerCardObj[j], self.bankerCards[j]])
					.to( {
						scaleX: 0.94
					},200)
					.call(()=>{
						self.setBankerValue(bankerResult[j]);
					});

				}, 1000 * (j+1));
			}
        },
        
        playFlippy(){
            
            this.visible = true;
            for(let j =0; j < this.bankerCards.length - 1;j++){
                let self = this;
                setTimeout(()=>{
                    createjs.Tween.get(self.bankerCardObj[j])
                    .to({
                        scaleX:0
                    },200)
                    .call((obj,anim)=>{
                        obj.gotoAndPlay(anim);
                    },[self.bankerCardObj[j], self.bankerCards[j]])
                    .to( {
                        scaleX: 0.94
                    },200)
                    .call(()=>{
                        self.setBankerValue(3);
                    });

                }, 500);
            }
        },
        
		setPlayerValue(val) {
			this.player_total.text = val;
		},
		setBankerValue(val) {
			this.banker_total.text = val;
		}
	});
}
