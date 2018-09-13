import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../../factories/factories';
import listPulaputi from './factory/l_pulaputi';
import listBigWheel from './factory/l_bigwheel';
import all from './factory/l_themedGames_all';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		all_list_table : [],
		main() {
			let bg = new createjs.Shape();
			bg.graphics.beginFill("#4d4d4d").drawRect(0,0,1500,1050);

			this.visible = false;
      this.dealer = {};

			this.list_view = new createjs.Container();
			this.list_view.x = 16;
			this.list_view.y = 10;
			this.addChild(this.list_view);

			this.down = false;
		},
		setMaintenance (data, x) {
			switch (data.eventName)  {
				case "maintenanceChange" :
					if (data.gameName == 'Pula-Puti') {
						listPulaputi(this,data,x).checkMaintenance(data.data.status, true);
					}
					if (data.gameName == 'Big-Wheel') {
						listBigWheel(this,data,x).checkMaintenance(data.data, true);
					}
					break;
			}
		},
		setResult(data, gameName, tId, eventName) {
			for(var x = 0; x < data.length; x++) {
				if(gameName != data[x].gameName || tId != data[x].tableNumber) {
					continue;
				}

				switch (data[x].gameName)  {
					case "Pula-Puti" :
						listPulaputi(this,data[x],x).setResult(data[x]);
						listPulaputi(this,data[x],x).drawRoadMap(data[x].marks);
						listPulaputi(this,data[x],x).setStatsCount(data[x]);
						listPulaputi(this,data[x],x).setResultText(data[x].marks, eventName);
						listPulaputi(this,data[x],x).animateDice(data[x].marks);
						break;
					case "Big-Wheel" :
						listBigWheel(this,data[x],x).setResult(data[x]);
						break;
				}

			}
		},
		makeListTables (data, parent, child) {
			all(parent.parent, data).makeListTables();

			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Big-Wheel") {
					listBigWheel(parent.parent,data[x],x).createTable();
				} else if(data[x].gameName == "Pula-Puti") {
					listPulaputi(parent.parent,data[x],x).createTable();
				}
			}
		},

		reInitAnim(data, x) {
	      	switch (data.gameName)  {
				case "Pula-Puti" :
        			listPulaputi(this,data[x],x).reInitAnim();
      				break;
			}
		}
	});

	return instance;
}
