import {createSprite, randomNum, createCardSprite, numberCounter, playSound } from '../../../factories/factories';

export default()=> {
	return new blu.Component({
		main() {
			this.dragon_circle = new createjs.Shape();
			this.dragon_circle.graphics.ss(4).beginStroke("#595a5a").beginFill("#1976d2").drawCircle(0,0,50);
			this.dragon_circle.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);
			this.dragon_circle.y = -45;
			this.dragon_circle.scaleX = this.dragon_circle.scaleY = 0.7;
			this.addChild(this.dragon_circle);

			this.dragon_total = new createjs.Text("0", "bold 60px arial" ,"#fff");
			this.dragon_total.y = this.dragon_circle.y;
			this.dragon_total.scaleX = this.dragon_total.scaleY = 0.7;
			this.dragon_total.textBaseline = "middle";
			this.dragon_total.textAlign = "center";
			this.addChild(this.dragon_total);

			this.tiger_circle = new createjs.Shape();
			this.tiger_circle.graphics.ss(4).beginStroke("#595a5a").beginFill("#d32f2f").drawCircle(0,0,50);
			this.tiger_circle.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);
			this.tiger_circle.y = this.dragon_circle.y + 120;
			this.tiger_circle.scaleX = this.tiger_circle.scaleY = 0.7;
			this.addChild(this.tiger_circle);

			this.tiger_total = new createjs.Text("0", "bold 60px arial", "#fff");
			this.tiger_total.y = this.tiger_circle.y;
			this.tiger_total.scaleX = this.tiger_total.scaleY = 0.7;
			this.tiger_total.textBaseline = "middle";
			this.tiger_total.textAlign = "center";

            this.addChild(this.tiger_total);
            
            //170 250 370
            this.dragon = createCardSprite(this, 80, 120,"cards");
			this.dragon.scaleX = this.dragon.scaleY = 0.74;
			this.dragon.regX = this.dragon.getBounds().width/2;
			this.dragon.gotoAndStop("back_blue");
			this.dragon.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);
			this.dragon.x = 105;
			this.dragon.y = -90;
			this.addChild(this.dragon);

			this.tiger = createCardSprite(this, 80, 120,"cards");
			this.tiger.scaleX = this.tiger.scaleY = 0.74;
			this.tiger.regX = this.tiger.getBounds().width/2;
			this.tiger.gotoAndStop("back_red");
			this.tiger.shadow = new createjs.Shadow('rgba(241, 227, 130, 1)', 0 ,0, 30);
			this.tiger.x = 105;
			this.tiger.y = 30;
			this.addChild(this.tiger);

			this.x = 65;
			this.y = 340;
      
            this.visible = false;
        },

        play() {
            this.visible = true;
            let self = this;
			let dragonCard = "C0020";
			let tigerCard = "C0039";
			setTimeout(() =>{
				createjs.Tween.get(self.dragon)
				.to({
					scaleX:0
				},200)
				.call((obj,anim)=>{
					obj.gotoAndPlay(anim);
				},[self.dragon, dragonCard])
				.to( {
					scaleX: 0.74
				},200);
				createjs.Tween.get(self.tiger)
				.to({
					scaleX:0
				},200)
				.call((obj,anim)=>{
					obj.gotoAndPlay(anim);
				},[self.tiger, tigerCard])
				.to( {
					scaleX: 0.74
				},200);
			}, 1000);
        },
        
		setVal(type, data) {
			this[type+"_total"].text = data;
		}

	});
}
