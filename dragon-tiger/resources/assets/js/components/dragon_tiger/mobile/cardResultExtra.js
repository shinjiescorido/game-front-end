/**
 * cardResultExtra.js
 * @author Marjo Sobrecaray
 * @since 2017.05.10
 * @version 1.0
 * Copyright (C) 2017 Blue Frog INC. All rights reserved.
**/

/** extra assets for card result **/

export default()=> {
	return new blu.Component({
		main() {
			this.dragon_circle = new createjs.Shape();
			this.dragon_circle.graphics.ss(4).beginStroke("#595a5a").beginFill("#1976d2").drawCircle(0,0,50);
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
			this.tiger_circle.y = this.dragon_circle.y + 120;
			this.tiger_circle.scaleX = this.tiger_circle.scaleY = 0.7;
			this.addChild(this.tiger_circle);

			this.tiger_total = new createjs.Text("0", "bold 60px arial", "#fff");
			this.tiger_total.y = this.tiger_circle.y;
			this.tiger_total.scaleX = this.tiger_total.scaleY = 0.7;
			this.tiger_total.textBaseline = "middle";
			this.tiger_total.textAlign = "center";

			this.addChild(this.tiger_total);

			this.cache(-100,-100,200,300)

			this.x = 65;
			this.y = 340;
      
      this.visible = false;
		},
		setVal(type, data) {
			this[type+"_total"].text = data;
			this.updateCache();
		}

	});
}
