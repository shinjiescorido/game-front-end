let instance = null;
import listBaccarat from './factory/l_baccarat';
import all from './factory/l_all';
import rmformat from '../../factories/formatter';

let formatData = rmformat();

export default() => {
	instance = instance || new blu.Component({
		all_thumbnial_table: [],
		all_list_table: [],
		main(data) {

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
					if (data.gameName == 'Baccarat') {
						listBaccarat(this,data,x).checkMaintenance(data.data.status, true, x);
					}
					break;
			}
		},
		inputResult (data,card_data) {
			if(!data) return;
			if(!data.length) return;
			
			for(var x = 0; x < data.length; x++) {
				if((card_data.tableId == data[x].tableNumber) && (card_data.gameName == data[x].gameName)) {
					listBaccarat(this,data[x],x).inputRes(card_data);
				}
			}
		}, 
		setResult(data, gameName, tId) {
			if(!data) return;
			if(!data.length) return;
			
			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Baccarat" && data[x].tableNumber ==  tId) {
					let miscData = (data[x].slave && data[x].slave == 'supersix')?data[x]:{};
					listBaccarat(this,data[x],x).setPercentages(data[x].marks);
					listBaccarat(this,data[x],x).setResult(data[x].marks);
					listBaccarat(this,data[x],x).drawPearlRoad(formatData.fnFormatBCPearlRoad(data[x].marks,6,14,miscData),"list");
					listBaccarat(this,data[x],x).drawBigRoad(formatData.fnFormatBCBigRoad(data[x].marks,6,23,miscData),"list");
					listBaccarat(this,data[x],x).drawBigEyeBoy(formatData.fnFormatBigEyeBoy(data[x].marks),"list");
					listBaccarat(this,data[x],x).drawSmallRoad(formatData.fnFormatSmallRoad(data[x].marks,6,24),"list");
					listBaccarat(this,data[x],x).drawCockradRoad(formatData.fnFormatCockroachPig(data[x].marks,6,24),"list");
				}
			}
		},
		makeBaccaratTables (data) {
			if(!data) return;
			if(!data.length) return;
			
			this.all_list_table = _.clone(this.context.lobby_liveGames.all_list_table);
			all(this, data).makeListTables(baccarat_c);
			
			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Baccarat") {
					let miscData = (data[x].slave && data[x].slave == 'supersix')?data[x]:{};
					listBaccarat(this,data[x],x).createTable();
					listBaccarat(this,data[x],x).drawPearlRoad(formatData.fnFormatBCPearlRoad(data[x].marks,6,14,miscData),"list");
					listBaccarat(this,data[x],x).drawBigRoad(formatData.fnFormatBCBigRoad(data[x].marks,6,24,miscData),"list");
					listBaccarat(this,data[x],x).drawBigEyeBoy(formatData.fnFormatBigEyeBoy(data[x].marks,6,24),"list");
					listBaccarat(this,data[x],x).drawSmallRoad(formatData.fnFormatSmallRoad(data[x].marks,6,24),"list");
					listBaccarat(this,data[x],x).drawCockradRoad(formatData.fnFormatCockroachPig(data[x].marks,6,24),"list");
        		}
			}
		}
	});

	return instance;
}