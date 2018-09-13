import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../../factories/factories';
import listPulaputi from './factory/l_pulaputi';
import all from './factory/l_themedGames_all';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		// pulaputi_tables: [],
		all_list_table: [],
		main() {

			// this.y = 72;

			let bg = new createjs.Shape();
			bg.graphics.beginFill("#4d4d4d").drawRect(0,0,this.context.context.width - this.context.body_bg_width,1050);
			this.addChild(bg);

			this.visible = false;
      this.dealer = {};

			this.list_view = new createjs.Container();
			this.list_view.x = 16;
			this.list_view.y = 10;
			this.addChild(this.list_view);

		},
		setMaintenance (data, x) {
			switch (data.eventName)  {
				case "mainmaintenancechange" :
					if (data.data.status == 1) {
					}
					break;
				case "maintenanceChange" :
					listPulaputi(this,data[x],x).checkMaintenance(data.data.status, true);
					break;
			}
		},
		makePulaputiTables (data) {
			this.all_list_table = _.clone(this.context.lobby_themedGames.all_list_table);
			all(this, data).makeListTables();

			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Pula-Puti") {
					listPulaputi(this,data[x],x).createTable();
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
			listPulaputi(this,data[x],x).reInitAnim(data[x]);
		}
	});

	return instance;
}
