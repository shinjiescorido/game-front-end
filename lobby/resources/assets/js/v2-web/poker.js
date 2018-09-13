import {instance as all} from './factory/all.js';
import {instance as poker} from './factory/poker.js';
import rmformat from '../factories/formatter';

let formatData = rmformat();

let component_poker = {
	stage_thumb : [],
	stage_list : [],
	main (data) {
	  
	  $(".poker-tables").empty();
		
		for(var x = 0; x < data.length;x++) {
	      var c = document.createElement("canvas");

	      c.setAttribute("id", "poker-"+x)
	      c.setAttribute("width", "1680px");
	      c.setAttribute("height", "283px");

	      $(".poker-tables").append(c);

	      $(c).css({
	      	left : '0',
	      	top : (x * 300) +'px',
	      	transform : 'translate(0,0)'
	      });

	      this.stage_list[x] = new createjs.Stage("poker-"+x);
	    	this.stage_list[x].enableMouseOver(10)
	      this.stage_list[x].x = 15;
	      // this.poker_stage[x].y = 5;
	    }
	},

	setMaintenance (data, x) {
		switch (data.eventName)  {
			case "maintenanceChange" :
				poker.checkMaintenance(data, true, x);
				break;
		}
	},

	createTables (data, type) {
		if(!data) return;
		if(!data.length) return;
		for(var x = 0; x < data.length; x++) {
			this.stage_list[x].tables = [];
			this.stage_list[x].data = data[x];
			all.makeListTables(data[x], this.stage_list[x], null, x, this);
			poker.makeListTables(data[x], this.stage_list[x], null, x, this);
		}
	},
	inputResult (data,card_data) {
		for(var x = 0; x < data.length; x++) {
			if((card_data.tableId == data[x].tableNumber) && (card_data.gameName == data[x].gameName)) {
				poker.inputRes(card_data, this.stage_list[x], null, x,this);
			}
		}
	},
	setResult(data, gameName, tId, meta) {
		for(var x = 0; x < data.length; x++) {
			if((tId == data[x].tableNumber) && (gameName == data[x].gameName)) {
				if(!this.stage_list[x].children.length) continue;
				poker.drawTableData(data[x], this.stage_list[x], null,  x, this);
				poker.drawRoadMap(data[x], this.stage_list[x], null,  x, this);
				this.stage_list[x].list_tables.status.text = window.language.lobby.result
			}
		}

	}

}

export default {
	component_poker
}