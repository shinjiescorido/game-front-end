let instance = null;
import listDt from './factory/l_dragonTiger';
import all from './factory/l_all';
import rmformat from '../../factories/formatter';

let formatData = rmformat();

export default() => {
	instance = instance || new blu.Component({
		all_thumbnial_table: [],
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
					if (data.gameName == 'Dragon-Tiger') {
						listSicbo(this,data,x).checkMaintenance(data.data.status, true, x);
					}
					break;
			}
		},
		inputResult (data,card_data) {
			if(!data) return;
			if(!data.length) return;
			
			for(var x = 0; x < data.length; x++) {
				if((card_data.tableId == data[x].tableNumber) && (card_data.gameName == data[x].gameName)) {
					listDt(this,data[x],x).inputRes(card_data);
				}
			}
		}, 
		setResult(data, gameName) {
			if(!data) return;
			if(!data.length) return;
			
			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "dragontiger" || data[x].gameName == "Dragon-Tiger") {
					listDt(this,data[x],x).setPercentages(data[x].marks)
					listDt(this,data[x],x).setResult(data[x]);
					listDt(this,data[x],x).drawPearlRoad(formatData.fnFormatDTPearlRoad(data[x].marks, 6,14));
					listDt(this,data[x],x).drawBigRoad(formatData.fnFormatDTBigRoad(data[x].marks, 6,24));
					listDt(this,data[x],x).drawBigEyeBoy(formatData.fnFormatDTBigEyeBoy(data[x].marks, 6,24),"list");
					listDt(this,data[x],x).drawSmallRoad(formatData.fnFormatDTSmallRoad(data[x].marks,6,24),"list");
					listDt(this,data[x],x).drawCockroachRoad(formatData.fnFormatDTCockroachPig(data[x].marks,6,24),"list");
				}
			}
		}		,
		makeDtTables (data) {
			if(!data) return;
			if(!data.length) return;
			this.all_list_table = _.clone(this.context.lobby_liveGames.all_list_table);
			all(this, data).makeListTables(dragontiger_c);
			
			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "dragontiger" || data[x].gameName == "Dragon-Tiger") {
					listDt(this,data[x],x).createTable();
					listDt(this,data[x],x).drawPearlRoad(formatData.fnFormatDTPearlRoad(data[x].marks, 6,14),"list");
					listDt(this,data[x],x).drawBigRoad(formatData.fnFormatDTBigRoad(data[x].marks, 6,24),"list");
					listDt(this,data[x],x).drawBigEyeBoy(formatData.fnFormatDTBigEyeBoy(data[x].marks, 6,24),"list");
					listDt(this,data[x],x).drawSmallRoad(formatData.fnFormatDTSmallRoad(data[x].marks,6,24),"list");
					listDt(this,data[x],x).drawCockroachRoad(formatData.fnFormatDTCockroachPig(data[x].marks,6,24),"list");
        		}
			}
		}
	});

	return instance;
}