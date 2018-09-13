import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../../factories/factories';

import listPoker from './factory/l_poker';
import all from './factory/l_all';
import rmformat from '../../factories/formatter';

let formatData = rmformat();
let instance = null;

export default() => {
	instance = instance || new blu.Component({
		poker_tables : [],
		all_list_table : [],
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
					if (data.gameName == 'Poker') {
						listPoker(this,data,x).checkMaintenance(data.data.status, true, x);
					}
					break;
			}
		},
		makePokerTables (data) {
			if(!data) return;
			if(!data.length) return;
			
			this.all_list_table = _.clone(this.context.lobby_liveGames.all_list_table);
			all(this, data).makeListTables(poker_c);
			
			for(var x = 0; x < data.length; x++) {
				if(data[x].gameName == "Poker") {
					listPoker(this,data[x],x).createTable();
					listPoker(this,data[x],x).drawRoadMap(formatData.fnFormatPokerRoadMap(data[x].marks,6,23), "list");
					listPoker(this,data[x],x).drawTableData(data[x].meta);
        		}
			}
		},

		inputResult (data,card_data) {
			if(!data) return;
			if(!data.length) return;

			for(var x = 0; x < data.length; x++) {
				if((card_data.tableId == data[x].tableNumber) && (card_data.gameName == data[x].gameName)) {
					listPoker(this,data[x],x).inputRes(card_data,"list");
				}
			}
		},
		setResult(data, gameName, tId) {
			if(!data) return;
			if(!data.length) return;
			
			for(var x = 0; x < data.length; x++) {
				if((tId == data[x].tableNumber) && (gameName == data[x].gameName)) {
					listPoker(this,data[x],x).drawRoadMap(formatData.fnFormatPokerRoadMap(data[x].marks,6,23), "list");
					listPoker(this,data[x],x).drawTableData(data[x].meta);
      		try {
      			this.all_list_table[x].status.text = window.language.lobby.result;
					} catch(err) {
						
					}
				}
			}

		}


	});

	return instance;
}