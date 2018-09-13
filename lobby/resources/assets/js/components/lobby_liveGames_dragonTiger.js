let instance = null;
import listDt from './factory/l_dragonTiger';
import all from './factory/l_all';
import rmformat from '../factories/formatter';

let formatData = rmformat();

export default() => {
	instance = instance || new blu.Component({
		all_thumbnial_table: [],
		all_list_table: [],
		main() {
		    this._modalWidth = 450;
		    this._modalHeight = 750;

			this.visible = false;

			this.list_view = new createjs.Container();
			this.list_view.x = 16;

			this.addChild(this.list_view);

		},
		inputResult (data,card_data) {
			for(var x = 0; x < data.length; x++) {
				if((card_data.tableId == data[x].tableNumber) && (card_data.gameName == data[x].gameName)) {
					listDt(this,data[x],x).inputRes(card_data);
				}
			}
		}, 

		setMaintenance (data, x) {
			switch (data.eventName)  {
				case "maintenanceChange" :
					listDt(this,data,x).checkMaintenance(data.data.status, true, x);
					break;
			}
		},
		setResult(data, gameName, tId) {
			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Dragon-Tiger"  && data[x].tableNumber ==  tId) {
					listDt(this,data[x],x).setPercentages(data[x].marks)
					listDt(this,data[x],x).setResult(data[x]);
					listDt(this,data[x],x).drawPearlRoad(formatData.fnFormatDTPearlRoad(data[x].marks,6,14));
					listDt(this,data[x],x).drawBigRoad(formatData.fnFormatDTBigRoad(data[x].marks,6,30),"list");
					listDt(this,data[x],x).drawBigEyeBoy(formatData.fnFormatDTBigEyeBoy(data[x].marks,6,28),"list");
					listDt(this,data[x],x).drawSmallRoad(formatData.fnFormatDTSmallRoad(data[x].marks,6,28),"list");
					listDt(this,data[x],x).drawCockroachRoad(formatData.fnFormatDTCockroachPig(data[x].marks,6,28),"list");
				}
			}
		}		,
		makeDtTables (data) {
			this.all_list_table = _.clone(this.context.lobby_liveGames.all_list_table);
			all(this, data).makeListTables();
			
			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "dragontiger" || data[x].gameName == "Dragon-Tiger") {
					listDt(this,data[x],x).createTable();
					listDt(this,data[x],x).drawPearlRoad(formatData.fnFormatDTPearlRoad(data[x].marks,6,14),"list");
					listDt(this,data[x],x).drawBigRoad(formatData.fnFormatDTBigRoad(data[x].marks,6,30),"list");
					listDt(this,data[x],x).drawBigEyeBoy(formatData.fnFormatDTBigEyeBoy(data[x].marks,6,28),"list");
					listDt(this,data[x],x).drawSmallRoad(formatData.fnFormatDTSmallRoad(data[x].marks,6,28),"list");
					listDt(this,data[x],x).drawCockroachRoad(formatData.fnFormatDTCockroachPig(data[x].marks,6,28),"list");
        }
			}
		}
	});

	return instance;
}