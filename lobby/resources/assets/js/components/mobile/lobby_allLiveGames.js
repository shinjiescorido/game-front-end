import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../../factories/factories';
import rmformat from '../../factories/formatter';
import listSicbo from './factory/l_sicbo';
import listDt from './factory/l_dragonTiger';
import listPoker from './factory/l_poker';
import listBaccarat from './factory/l_baccarat';
import all from './factory/l_all';

let instance = null;
let formatData = rmformat();

export default() => {
	instance = instance || new blu.Component({
		all_list_table : [],
		main() {

			let bg = new createjs.Shape();
			bg.graphics.beginFill("#4d4d4d").drawRect(0,0,1500,1050);

			this.visible = false;

			this.list_view = new createjs.Container();
			this.list_view.x = 16;
			this.list_view.y = 10;
			this.addChild(this.list_view);

			this.down = false;

		},
		setMaintenance (data, x) {
			switch (data.eventName)  {
				case "maintenanceChange" :
					if (data.gameName == 'Baccarat') {
						listBaccarat(this,data,x).checkMaintenance(data.data.status, true);
					}
					if (data.gameName == 'Sicbo') {
						listSicbo(this,data,x).checkMaintenance(data.data.status, true);
					}
					if (data.gameName == 'Sicbo') {
						listPoker(this,data,x).checkMaintenance(data.data.status, true);
					}
					if (data.gameName == 'Dragon-Tiger') {
						listDt(this,data,x).checkMaintenance(data.data.status, true);
					}
					break;
			}
		},
		setResult(data, gameName, tId) {
			for(var x = 0; x < data.length; x++) {
				if(gameName != data[x].gameName || tId != data[x].tableNumber) {
					continue;
				}

				switch (data[x].gameName)  {
					case "Sicbo" :
						listSicbo(this,data[x],x).setResult(data[x])
						listSicbo(this,data[x],x).setHotColdResult(data[x].marks)
						listSicbo(this,data[x],x).drawRoadMap(formatData.fnFormatSicbo(data[x].marks,19,6),"list")
						break;
					case "Baccarat" :
						let miscData = (data[x].slave && data[x].slave == 'supersix')?data[x]:{};
						listBaccarat(this,data[x],x).setPercentages(data[x].marks);
						listBaccarat(this,data[x],x).setResult(data[x].marks);
						listBaccarat(this,data[x],x).drawPearlRoad(formatData.fnFormatBCPearlRoad(data[x].marks,6,12,miscData),"list");
						listBaccarat(this,data[x],x).drawBigRoad(formatData.fnFormatBCBigRoad(data[x].marks,6,23,miscData),"list");
						listBaccarat(this,data[x],x).drawBigEyeBoy(formatData.fnFormatBigEyeBoy(data[x].marks),"list");
						listBaccarat(this,data[x],x).drawSmallRoad(formatData.fnFormatSmallRoad(data[x].marks,6,24),"list");
						listBaccarat(this,data[x],x).drawCockradRoad(formatData.fnFormatCockroachPig(data[x].marks,6,24),"list");
						break;
					case "dragontiger" :
					case "Dragon-Tiger" :
						listDt(this,data[x],x).setResult(data[x]);
						listDt(this,data[x],x).setPercentages(data[x].marks);
						listDt(this,data[x],x).drawBigRoad(formatData.fnFormatDTBigRoad(data[x].marks,6,23),"list");
						listDt(this,data[x],x).drawPearlRoad(formatData.fnFormatDTPearlRoad(data[x].marks,6,12),"list");
						listDt(this,data[x],x).drawBigEyeBoy(formatData.fnFormatDTBigEyeBoy(data[x].marks,6,23),"list");
						listDt(this,data[x],x).drawSmallRoad(formatData.fnFormatDTSmallRoad(data[x].marks,6,24),"list");
						listDt(this,data[x],x).drawCockroachRoad(formatData.fnFormatDTCockroachPig(data[x].marks,6,24),"list");
						break;
					case "Poker" :
						listPoker(this,data[x],x).drawRoadMap(formatData.fnFormatPokerRoadMap(data[x].marks,6,24), "list");
						listPoker(this,data[x],x).drawTableData(data[x].meta);
						break;
				}

			}
		},
		inputResult (data,card_data) {

			for(var x = 0; x < data.length; x++) {
				if((card_data.tableId == data[x].tableNumber) && (card_data.gameName == data[x].gameName)) {

					if(data[x].gameName == "Baccarat") {
						listBaccarat(this,data[x],x).inputRes(card_data);
					}
					else if(data[x].gameName == "dragontiger" || data[x].gameName == "Dragon-Tiger") {
						// listDt(this,data[x],x).inputRes(card_data);
					} //end if
					else if(data[x].gameName == "Poker") {
						listPoker(this,data[x],x).inputRes(card_data, "thumbnail");
						listPoker(this,data[x],x).inputRes(card_data, "list");
					} //end if
				}
			}
		},
		makeListTables (data, parent, child) {
			if(!data) return;
			if(!data.length) return;

			all(parent.parent, data).makeListTables(baccarat_c);

			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Baccarat") {
					let miscData = (data[x].slave && data[x].slave == 'supersix')?data[x]:{};
					listBaccarat(parent.parent,data[x],x).createTable();
					listBaccarat(parent.parent,data[x],x).drawBigRoad(formatData.fnFormatBCBigRoad(data[x].marks,6,23,miscData),"list");
					listBaccarat(parent.parent,data[x],x).drawPearlRoad(formatData.fnFormatBCPearlRoad(data[x].marks,6,12,miscData),"list");
					listBaccarat(parent.parent,data[x],x).drawBigEyeBoy(formatData.fnFormatBigEyeBoy(data[x].marks,6,23),"list");
					listBaccarat(parent.parent,data[x],x).drawSmallRoad(formatData.fnFormatSmallRoad(data[x].marks,6,24),"list");
					listBaccarat(parent.parent,data[x],x).drawCockradRoad(formatData.fnFormatCockroachPig(data[x].marks,6,24),"list");

				} else if(data[x].gameName == "Dragon-Tiger" || data[x].gameName == "dragontiger") {
					listDt(parent.parent,data[x],x).createTable();
					listDt(parent.parent,data[x],x).drawPearlRoad(formatData.fnFormatDTPearlRoad(data[x].marks, 6,12),"list");
					listDt(parent.parent,data[x],x).drawBigRoad(formatData.fnFormatDTBigRoad(data[x].marks,6,23),"list");
					listDt(parent.parent,data[x],x).drawBigEyeBoy(formatData.fnFormatDTBigEyeBoy(data[x].marks, 6,23),"list");
				} else if(data[x].gameName == "Sicbo") {
					listSicbo(parent.parent,data[x],x).createTable();
        		} else if(data[x].gameName == "Poker") {
					listPoker(parent.parent,data[x],x).createTable();
					listPoker(parent.parent,data[x],x).drawRoadMap(formatData.fnFormatPokerRoadMap(data[x].marks,6,24),"list");
					listPoker(parent.parent,data[x],x).drawTableData(data[x].meta);
        		}

			} // end for

		}

	});

	return instance;
}
