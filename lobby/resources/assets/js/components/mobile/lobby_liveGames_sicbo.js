import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../../factories/factories';
import listSicbo from './factory/l_sicbo';
import rmformat from '../../factories/formatter';
import all from './factory/l_all';

let instance = null;
let formatData = rmformat();

export default() => {
	instance = instance || new blu.Component({
		sicbo_tables: [],
		all_list_table: [],
		main() {

			let bg = new createjs.Shape();
			bg.graphics.beginFill("#4d4d4d").drawRect(0,0,this.context.context.width - this.context.body_bg_width,1050);
			this.addChild(bg);
			
			this.visible = false;

			this.list_view = new createjs.Container();
			this.list_view.x = 16;
			this.list_view.y = 10;
			this.addChild(this.list_view);

		},
		setMaintenance (data, x) {
			switch (data.eventName)  {
				case "maintenanceChange" :
					if (data.gameName == 'Sicbo') {
						listSicbo(this,data,x).checkMaintenance(data.data.status, true, x);
					}
					break;
			}
		},
		makeSicboTables (data) {
			if(!data) return;
			if(!data.length) return;
			this.all_list_table = _.clone(this.context.lobby_liveGames.all_list_table);
			all(this, data).makeListTables(sicbo_c);
			
			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Sicbo") {
					listSicbo(this,data[x],x).createTable();
        		}
			}
		},
		setResult(data, gameName) {
			if(!data) return;
			if(!data.length) return;
			
			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Sicbo") {
					listSicbo(this,data[x],x).setResult(data[x])
					listSicbo(this,data[x],x).setHotColdResult(data[x].marks)
					listSicbo(this,data[x],x).drawRoadMap(formatData.fnFormatSicbo(data[x].marks,18,6), "list")
				}
			}
		}
	});

	return instance;
}