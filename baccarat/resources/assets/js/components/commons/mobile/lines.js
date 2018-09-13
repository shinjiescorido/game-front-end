let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
			let startx = 0;
			let starty = 0;
			let width = 0;
			let height = 0;
			let goldHeight = 45;
			let rmStartx = 0;
			let rmStarty = 0;
			let predWidth = 50;
			let portrait = true;
			let rmWidth = 0
			this.x = 0;
			this.y = 0;

			if (window.innerWidth < window.innerHeight && window.matchMedia("(orientation: portrait)").matches) {
				width = 210;
				height = 168;
				goldHeight = 45;
				starty = this.context.stage.baseWidth  - (height+210);
				startx = 0;
				rmStarty = starty + height;
				rmStartx = 15*35
				predWidth = 50;
				portrait = true;
				rmWidth = 625;
			} else {
				width = this.context.stage.baseWidth;
				height = 143.5;
				goldHeight = 35;
				starty = this.context.stage.baseHeight  - height;
				rmStarty = starty;
				rmStartx = (8*24) + (31* 12)
				startx = 0;
				predWidth = 40;
				portrait = false;
				rmWidth = 655;
			}


			this.lines = new createjs.Shape();
			this.lines.graphics.ss(0.8).s(this.context.theme_color[window.theme].bar_separator).moveTo(startx,starty).lineTo(startx+width, starty);

			this.lines.graphics.ss(0.8).moveTo(startx,starty).lineTo(startx, starty+height);

			this.lines.graphics.ss(0.8).moveTo(startx+width,starty).lineTo(startx+width, starty+height);

			starty = starty + goldHeight;
			width = width != 165? 165: width;
			startx = startx!= 735? 735: startx;

			this.lines.graphics.ss(1.2).moveTo(startx,starty).lineTo(startx+width, starty);

			starty = starty + (height - goldHeight + 1);
			this.lines.graphics.ss(0.8).moveTo(startx,starty).lineTo(startx+width, starty-2);

			//roadmap line
			height = height==168? 205: height;
			// this.lines.graphics.ss(2).moveTo(rmStartx,rmStarty).lineTo(rmStartx, rmStarty + height);

			rmStartx = rmStartx + (rmWidth - rmStartx);
			this.lines.graphics.ss(2).moveTo(rmStartx,rmStarty).lineTo(rmStartx, rmStarty + height);

			rmStartx = rmStartx + predWidth;
			this.lines.graphics.ss(2).moveTo(rmStartx,rmStarty).lineTo(rmStartx, rmStarty + height);

			rmStartx = rmStartx + predWidth;
			this.lines.graphics.ss(1).moveTo(rmStartx,rmStarty).lineTo(rmStartx, rmStarty + height);

			this.addChild(this.lines);
		},
		changeTheme(new_theme) {
			this.lines.s(this.context.theme_color[new_theme].bar_separator);
		},
		screenOrientation() {
			this.removeAllChildren();
			this.main();
		}
	});
	return instance;
}
