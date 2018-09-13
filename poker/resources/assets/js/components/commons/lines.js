let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
			let startx = 0;
			let starty = this.context.context.height - 180;
			let width = 720;
			let height = 180;

			//roadmap top
			this.lines = new createjs.Shape();
			this.lines.graphics.ss(1).s(this.context.theme_color[window.theme].bar_separator).moveTo(startx,starty).lineTo(startx+width, starty);

			startx = 0;
			width = 720;
			this.lines.graphics.ss(1.5).moveTo(startx,starty+179).lineTo(startx+width, starty+179);

			//stats side
			startx = 420;
			// this.lines.graphics.ss(1).moveTo(startx,starty).lineTo(startx, starty+height);

			//betDetails
			startx = 510;
			this.lines.graphics.ss(1.5).moveTo(startx,starty).lineTo(startx, starty+height);

			startx = startx + 210;
			this.lines.graphics.ss(1).moveTo(startx,starty).lineTo(startx, starty+height);

			startx = 510;
			starty = starty + 45;
			width = 210;
			this.lines.graphics.ss(1).moveTo(startx,starty).lineTo(startx + width, starty);

			//prediction side
			startx = 1200;
			starty = starty - 45;
			this.lines.graphics.moveTo(startx,starty).lineTo(startx, starty + height);
			//
			startx = startx + 45;
			// this.lines.graphics.ss(1.5).moveTo(startx,starty).lineTo(startx, starty + height);
			//
			startx = startx + 45;
			// this.lines.graphics.ss(1.5).moveTo(startx,starty).lineTo(startx, starty + height);

			//roadmap top
			startx = 1200;
			width = 720;
			this.lines.graphics.ss(1).moveTo(startx,starty).lineTo(startx + width, starty);

			this.lines.graphics.ss(1.5).moveTo(startx,starty+179).lineTo(startx + width, starty+179);

			// baccarat && dragon-tiger roadmap bigroad,smallroad,bigeye, roach
			// startx = startx + 90;
			// starty = starty + 90;
			// width = 630
			// this.lines.graphics.ss(1.5).moveTo(startx, starty).lineTo(startx+width, starty);
			//
			// starty = starty + 45;
			// this.lines.graphics.ss(2).moveTo(startx, starty).lineTo(startx+width, starty);
			//
			// startx = startx + 315;
			// this.lines.graphics.ss(2).moveTo(startx, starty).lineTo(startx, starty + 45);

			this.addChild(this.lines);

		},
		changeTheme (new_theme) {
			this.lines.s(this.context.theme_color[window.theme].bar_separator);
		}
	});

	return instance;
}
