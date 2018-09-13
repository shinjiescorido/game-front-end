import {instance as all} from './factory/all.js';
import {instance as dragonTiger} from './factory/dragontiger.js';
import rmformat from '../factories/formatter';

let formatData = rmformat();

let component_dragonTiger = {
	stage_thumb : [],
	stage_list : [],
	main (data) {
    
    $(".dt-tables").empty();
		
		for(var x = 0; x < data.length;x++) {
      var c = document.createElement("canvas");

      c.setAttribute("id", "dt-"+x)
      c.setAttribute("width", "1680px");
      c.setAttribute("height", "283px");

      $(".dt-tables").append(c);

     $(c).css({
      	left : '0',
      	top : (x * 300) +'px',
      	transform : 'translate(0,0)'
      });

      this.stage_list[x] = new createjs.Stage("dt-"+x);
	    this.stage_list[x].enableMouseOver(10)
      this.stage_list[x].x = 15;
	  }
	},
	createTables (data, type) {
		if(!data) return;
		if(!data.length) return;

		if(!this.stage_list.length) {
			this.main(this.context.instance.dragontigerTables)
		}
			
		all.list_tables = []; // setting empty list tables/ bug on baccarat bc mishandled data(reinitialized list data)

		for(var x = 0; x < data.length; x++) {
			this.stage_list[x].tables = [];
			this.stage_list[x].data = data[x];
			all.makeListTables(data[x], this.stage_list[x], null, x, this);
			dragonTiger.makeListTables(data[x], this.stage_list[x], null, x,this);
		}

	},
	inputResult (data,card_data) {
		for(var x = 0; x < data.length; x++) {
			if((card_data.tableId == data[x].tableNumber) && (card_data.gameName == data[x].gameName)) {
				dragonTiger.inputRes(card_data, this.stage_list[x], null, x,this);
			}
		}
	}, 

	setMaintenance (data, x) {
		switch (data.eventName)  {
			case "maintenanceChange" :
				dragonTiger.checkMaintenance(data, true, x);
				break;
		}
	},

	setResult (data, gameName, tId) {
		if(!data) return;
		if(!data.length) return;
		
		for(var x = 0; x < data.length; x++) {
			if(data[x].gameName == "Dragon-Tiger" && data[x].tableNumber ==  tId) {
				if(this.stage_list[x].children.length) {
					dragonTiger.setPercentages(data[x], this.stage_list[x], null,  x, this)
					dragonTiger.drawPearlRoad(data[x], this.stage_list[x], null,  x, this);
					dragonTiger.drawBigRoad(data[x], this.stage_list[x], null,  x, this, "list");
					dragonTiger.drawBigEyeBoy(data[x], this.stage_list[x], null,  x, this);
					dragonTiger.drawSmallRoad(data[x], this.stage_list[x], null,  x, this);
					dragonTiger.drawCockroachRoad(data[x], this.stage_list[x], null,  x, this);
					dragonTiger.setResult(data[x], this.stage_list[x], null,  x, this);
				}
			}
		}
	},

	setRoomInfo(data, x) {
		dragonTiger.setRoomInfo(data.data, x, data.totalBettingUsers);
	},

	resetRoomInfo(x) {
		dragonTiger.resetRoomInfo(x);
	}
	
}

export default {
	component_dragonTiger
}