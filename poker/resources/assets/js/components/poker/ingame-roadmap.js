let instance = null;
import {fontFormat} from '../../factories/factories';
export default() => {
	instance = instance || new blu.Component({

		main() {
			this.cache(0,0, this.context.context.width, 180);
			this.y = this.context.context.height - 180;
			this.x = 0;

			var box_bg = [];

			var row = 6;
			var col = 17;
			let w = 30;
			let h = 30;

			this.footerBg1 = new createjs.Shape();
			this.footerBg1.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0,0,512,180);
			this.addChild(this.footerBg1);

			this.footerBg2 = new createjs.Shape();
			this.footerBg2.graphics.beginFill(this.context.theme_color[window.theme].base_color).drawRect(0,0,730,180);
			this.addChild(this.footerBg2);
			this.footerBg2.x = 1200;

			// this.rmbg = new createjs.Shape();
			// this.rmbg.graphics.ss(1).beginFill(this.context.theme_color[window.theme].roadMap_bg).drawRect(0,0,(32*8)	,(32*6));
			// this.addChild(this.rmbg);

			this.lines = new createjs.Shape();
			this.lines.graphics.ss(.8).s(this.context.theme_color[window.theme].roadMap_border).moveTo(0,29)
			this.addChild(this.lines);

			//pearl
			for(var i = 1; i < row; i++) {
				let adjust = i === 0 ? 1 : i === row ? -1 : 0
				this.lines.graphics.moveTo(0,h*i + adjust).lineTo(w*col,h*i + adjust)
			} // end for

			this.lines.graphics.moveTo(29,0);
			for(var x = 0; x <= col; x++) {
				this.lines.graphics.moveTo(w*x,0).lineTo(w*x,h*row)
			}


			this.roadMap_container = new createjs.Container();
			this.roadMap_container.x = 12;
			this.roadMap_container.y = 12;
			this.addChild(this.roadMap_container);

			this.updateCache();
		},
		changeTheme(new_theme) {
			var row = 6;
			var col = 17;
			let w = 30;
			let h = 30;
			// this.rmbg.graphics.clear().ss(1).beginFill(this.context.theme_color[new_theme].roadMap_bg).drawRect(0,0,(32*8),(32*6));
			this.footerBg1.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0,0,512,180);
				this.footerBg2.graphics.clear().beginFill(this.context.theme_color[new_theme].base_color).drawRect(0,0,730,180);
			this.lines.graphics.clear().ss(.8).s(this.context.theme_color[new_theme].roadMap_border).moveTo(0,30.8)
			for(var i = 1; i < row; i++) {
				let adjust = i === 0 ? 1 : i === row ? -1 : 0
				this.lines.graphics.moveTo(0,h*i + adjust).lineTo(w*col,h*i + adjust)
			} // end for

			this.lines.graphics.moveTo(29,0);
			for(var x = 0; x <= col; x++) {
				this.lines.graphics.moveTo(w*x,0).lineTo(w*x,h*row)
			}
			this.updateCache();
		},
		drawRoad(arr) {
			this.roadMap_container.removeAllChildren();

			let color = "";
			let res_text = "";
			let w = 30;
			let h = 30;

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
						arr[x][i].graphics.beginFill(color).drawCircle(0,0,13.5);
						arr[x][i].x = (x*w)+3;
						arr[x][i].y = (i*h)+3;

						arr[x][i].text = new createjs.Text(res_text, fontFormat(18,'black', 'lato', window.language.locale == 'zh' ? true : false) ,"#fff");
						arr[x][i].text.set({textAlign:'center', textBaseline: 'middle'});

						if(window.language.locale == "zh") {
									arr[x][i].text.x = arr[x][i].x;
									arr[x][i].text.y = arr[x][i].y;
						} else {
									arr[x][i].text.x = arr[x][i].x;
									arr[x][i].text.y = arr[x][i].y;
						}

						if(arr[x+1] == undefined && arr[x][i+1] == undefined) {
							arr[x][i].last_child = true;
						}

						this.roadMap_container.addChild(arr[x][i], arr[x][i].text);
					} //end of if
				}
			}
			// this.uncache();

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
						// this.cache(0,0,300,300)
						// this.updateCache();
					})
				}
			});

			// this.context.component_dealer_data.setData(data);
		},

		fnUpdateCaching(anim) {
			if(anim) {
				this.uncache();
				var _self = this;
				setTimeout(() => {
					_self.cache(0,0,_self.context.context.width, 180);
					_self.updateCache();
				},2000)
			} else {
				this.updateCache();
			}

		}
	});

	return instance;
}
