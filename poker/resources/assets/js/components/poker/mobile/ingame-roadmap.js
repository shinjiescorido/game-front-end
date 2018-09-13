let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main() {
			this.y = 570;
			this.x = 0;

			var box_bg = [];

			var row = 0;
			var col = 0;

			// for(var x = 0 ; x < 144; x++) {
			// 	box_bg[x] = new createjs.Shape();
			// 	box_bg[x].graphics.ss(1).beginStroke(this.context.theme_color[window.theme].roadMap_border).beginFill(this.context.theme_color[window.theme].roadMap_bg).drawRect(0,0,24.8,24.8);
			// 	box_bg[x].x = col * 24.8;
			// 	box_bg[x].y = row * 24.8;

			// 	col++;

			// 	if(col == 24 ) {
			// 		col = 0;
			// 		row++;
			// 	}

			// 	this.addChild(box_bg[x]);
			// } //end for
			//
			this.rmbg = new createjs.Shape();
			this.rmbg.graphics.ss(1).beginFill(this.context.theme_color[window.theme].roadMap_bg).drawRect(0,0,(24.8*24),(24.8*6));
			this.addChild(this.rmbg);

			this.lines = new createjs.Shape();
			this.lines.graphics.ss(.8).s(this.context.theme_color[window.theme].roadMap_border).moveTo(0,24.8)
			this.addChild(this.lines);

			//pearl
			for(var i = 0; i <= 6; i++) {
				this.lines.graphics.moveTo(0,24.8*i).lineTo(595.2,24.8*i)
			} // end for

			this.lines.graphics.moveTo(29,0);
			for(var x = 0; x <= 24; x++) {
				this.lines.graphics.moveTo(24.8*x,0).lineTo(24.8*x,148.8)
			}

			let mask = new createjs.Shape();
			mask.graphics.beginFill("red").drawRect(0,0,295,190);
			mask.alpha = 0.2;

			this.roadMap_container = new createjs.Container();
			this.roadMap_container.x = 12;
			this.roadMap_container.y = 12;
			this.addChild(this.roadMap_container);

			this.cache(0,0,900,180)

		},
		drawRoad(arr) {
			this.roadMap_container.removeAllChildren();

			let color = "";
			let res_text = "";

			let data = {
				total_num_games : 0,
				total_win : 0,
				total_lose : 0
			}

			for(var x = 0; x < arr.length; x++) {
				for(var i = 0;i < arr[x].length; i++) {
					if(arr[x][i] !== undefined ) {

						if(arr[x][i] == "D") {
							color = "#d32f2f"
							res_text = window.language.locale == "zh" ? '荷' : 'D';
							data.total_num_games ++
							data.total_win ++
						} //end if
						else if(arr[x][i] == "P") {
							color = "#1565c0"
							res_text = window.language.locale == "zh" ? '闲' : 'P';
							data.total_num_games ++
							data.total_lose ++
						} //else if
						else if(arr[x][i] == "T") {
							res_text = window.language.locale == "zh" ? '和' : 'T';
							color = "#689f39"
						} //else if

						arr[x][i] = new createjs.Shape();
						arr[x][i].graphics.beginFill(color).drawCircle(0,0,10.6);
						arr[x][i].x = x*24.81;
						arr[x][i].y = i*24.9;

						arr[x][i].text = new createjs.Text(res_text,window.language.locale == "zh" ? "15px arial" : "13px arial" ,"#fff");

						if(window.language.locale == "zh") {
									arr[x][i].text.x = arr[x][i].x - 8;
									arr[x][i].text.y = arr[x][i].y - 8;
						} else {
									arr[x][i].text.x = arr[x][i].x - 4;
									arr[x][i].text.y = arr[x][i].y - 7;
						}

						if(arr[x+1] == undefined && arr[x][i+1] == undefined) {
							arr[x][i].last_child = true;
						}

						this.roadMap_container.addChild(arr[x][i], arr[x][i].text);
					} //end of if
				}
			}

			this.uncache();

			this.roadMap_container.children.forEach((e) => {
				if(e.last_child) {
					createjs.Tween.get(e).wait(100)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)

					createjs.Tween.get(e.text).wait(100)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.to({ alpha : 0 },150)
					.to({ alpha : 1 },150)
					.call(()=>{
						this.cache(0,0,900,180)
						this.updateCache();
					})
				}
			});

			// this.context.component_dealer_data.setData(data);
		},
		changeTheme(new_theme) {
			this.context.component_fake_cardResult.changeTheme(new_theme);
			this.rmbg.graphics.clear().ss(1).beginFill(this.context.theme_color[new_theme].roadMap_bg).drawRect(0,0,(24.8*24),(24.8*6));
			this.lines.graphics.clear().ss(.8).s(this.context.theme_color[new_theme].roadMap_border).moveTo(0,24.8)
			for(var i = 0; i <= 6; i++) {
				this.lines.graphics.moveTo(0,24.8*i).lineTo(595.2,24.8*i)
			} // end for

			this.lines.graphics.moveTo(29,0);
			for(var x = 0; x <= 24; x++) {
				this.lines.graphics.moveTo(24.8*x,0).lineTo(24.8*x,148.8)
			}

			this.updateCache();
		},
	});

	return instance;
}
