import {instance as all} from './factory/all.js';
import {instance as poker} from './factory/poker.js';
import rmformat from '../factories/formatter';

let formatData = rmformat();

let component_poker = {
	poker_stage : [],
	main (data) {
		for(var x = 0; x < data.length;x++) {
			var c = document.createElement("canvas");

			c.setAttribute("id", "poker-"+x)
			c.setAttribute("class", "poker-cont")
			c.setAttribute("width", "1280px");
			c.setAttribute("height", "300px");

			$(".poker-tables").append(c);

			$(c).css({
				position : 'absolute',
				left : 0,
				top : x* 306+'px'
			});

			this.poker_stage[x] = new createjs.Stage("poker-"+x);
			this.poker_stage[x].x = 15;
			this.poker_stage[x].y = 5;

			if (window.nonInstall) {
				if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
					this.poker_stage[x].regX =  -10;
					this.poker_stage[x].regY =  280;
					this.poker_stage[x].rotation = 90;
				} else {
					this.poker_stage[x].regX =  0;
					this.poker_stage[x].regY =  0;
					this.poker_stage[x].rotation = 0;
				}
			} //nonInstall


		} //END FOR
	},
	createTables (data, type) {
		if(!data) return;
		if(!data.length) return;
		for(var x = 0; x < data.length; x++) {
			this.poker_stage[x].tables = [];
			this.poker_stage[x].data = data[x];
			all.makeListTables(data[x], this.poker_stage[x], null, x, this);
			poker.makeListTables(data[x], this.poker_stage[x], null, x, this);
		}

	},
	setMaintenance (data, x) {
		switch (data.eventName)  {
			case "maintenanceChange" :
			poker.checkMaintenance(data, true, x);
			break;
		}
	},
	setResult(data, gameName, tId) {
		if(!data) return;
		if(!data.length) return;

		for(var x = 0; x < data.length; x++) {
			if(data[x].gameName == "Poker" && data[x].tableNumber ==  tId) {
				poker.drawRoadMap(data[x], this.poker_stage[x], null, x, this);
				poker.setResult(data[x], this.poker_stage[x], null, x, this);
				poker.drawTableData(data[x], this.poker_stage[x], null, x, this);
			}
		}
	},
	inputResult (data, gameName, tId, card_data) {
		if(!data) return;
		if(!data.length) return;

		for(var x = 0; x < data.length; x++) {
			if(data[x].gameName == "Poker" && data[x].tableNumber ==  tId) {
				poker.inputRes(data[x], this.poker_stage[x], null, x, this, card_data);
			}
		}
	},
}

export default {
	component_poker
}
