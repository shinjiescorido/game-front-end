import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../factories/factories';
import listPulaputi from './factory/l_pulaputi';
import rmformat from '../factories/formatter';
import all from './factory/l_themedGames_all';

let instance = null;
let formatData = rmformat();

export default() => {
	instance = instance || new blu.Component({
		// pulaputi_tables: [],
		all_list_table: [],
		main() {

			this.y = 72;

			let bg = new createjs.Shape();
			bg.graphics.beginFill("#4d4d4d").drawRect(0,0,this.context.context.width - this.context.body_bg_width,1050);
			this.addChild(bg);

			this.visible = false;
      this.dealer = {};

			this.list_view = new createjs.Container();
			this.list_view.x = 16;
			this.list_view.y = 250;
			this.addChild(this.list_view);

		},
		setMaintenance (data, x) {
			switch (data.eventName)  {
				case "maintenanceChange" :
					listPulaputi(this,data,x).checkMaintenance(data.data.status, true);
					break;
			}
		},
		makePulaputiTables (data) {
      this.list_view.y = 250;
			this.all_list_table = _.clone(this.context.lobby_themedGames.all_list_table);
			all(this, data).makeListTables();

			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Pula-Puti") {
					listPulaputi(this,data[x],x).createTable();
        		}
			}

			if(this.list_view.children.length > 0) {
        if(!this.list_view.scrollprop) {
          this.list_view.setBounds(0, 0, 1680, this.list_view.getBounds().height + 150);
  		    this.list_view.scrollprop = this.context.lobby_scrollbar.scrollable(this, this.list_view, 1680, 850);
        }
        else {
          // this.list_view.scrollprop.scrollbar.y = this.list_view.scrollprop.top;
        }

      }
		},
		setResult(data, gameName, tId, eventName) {
			for(var x = 0; x < data.length; x++) {
				if(gameName != data[x].gameName || tId != data[x].tableNumber) {
					continue;
				}

				if(data[x].gameName == "Pula-Puti") {
					listPulaputi(this,data[x],x).setResult(data[x]);
					listPulaputi(this,data[x],x).drawRoadMap(data[x].marks);
					listPulaputi(this,data[x],x).setStatsCount(data[x]);
					listPulaputi(this,data[x],x).setResultText(data[x].marks, eventName);
					listPulaputi(this,data[x],x).animateDice(data[x].marks);
				}
			}
		},
		reInitAnim(data, x) {
			listPulaputi(this,data[x],x).reInitAnim();
		}
	});

	return instance;
}
