import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../../factories/factories';
import listBigWheel from './factory/l_bigwheel';
import all from './factory/l_themedGames_all';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		sicbo_tables: [],
		all_list_table: [],
		main() {

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
		makeBigWheelTables (data) {
			this.all_list_table = _.clone(this.context.lobby_themedGames.all_list_table);
			all(this, data).makeListTables();
      // all(parent.parent, data).makeListTables();

			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Big-Wheel") {
					listBigWheel(this,data[x],x).createTable();
        }
			}
			// this.context.lobby_liveGames.makeListTables(data, this.list_view, this.all_list_table)
		},
		setResult(data, gameName) {
			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Big-Wheel") {
					listBigWheel(this,data[x],x).setResult(data[x])
				}
			}
		},
    setMaintenance (data, x) {
			switch (data.eventName)  {
				case "maintenanceChange" :
					listBigWheel(this,data,x).checkMaintenance(data.data, true);
					break;
			}
		},
	});

	return instance;
}
