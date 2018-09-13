import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../factories/factories';
import {instance as all} from './factory/all.js';
import {instance as sicbo} from './factory/sicbo.js';
import rmformat from '../factories/formatter';

let formatData = rmformat();

let component_sicbo = {
	stage_thumb : [],
	stage_list : [],
	main (data) {

		$(".sb-tables").empty();

		for(var x = 0; x < data.length;x++) {
			var c = document.createElement("canvas");
			var t = document.createElement("canvas");

			c.setAttribute("id", "sb-"+x)
			c.setAttribute("width", "1680px");
			c.setAttribute("height", "283px");

			$(".sb-tables").append(c);

			$(c).css({
				left : '0',
				top : (x * 300) +'px',
				transform : 'translate(0,0)'
			});

			this.stage_list[x] = new createjs.Stage("sb-"+x);
	    this.stage_list[x].enableMouseOver(10)
			this.stage_list[x].x = 15;
			// this.sicbo_stage[x].y = 5;
	  } // end for
	},

	setMaintenance (data, x) {
		switch (data.eventName)  {
			case "maintenanceChange" :
				sicbo.checkMaintenance(data, true, x);
				break;
		}
	},

	createTables (data, type) {
		if(!data) return;
		if(!data.length) return;

		if(!this.stage_list.length) {
			this.main(this.context.instance.sicboTables)
		}
		for(var x = 0; x < data.length; x++) {
			this.stage_list[x].tables = [];
			this.stage_list[x].data = data[x];
			all.makeListTables(data[x], this.stage_list[x], null, x, this);
			sicbo.makeListTables(data[x], this.stage_list[x], null, x,this);
		}
	},
	setResult(data, gameName, tId) {
		if(!data) return;
		if(!data.length) return;

		for(var x = 0; x < data.length; x++) {
			if(data[x].gameName == "Sicbo" && data[x].tableNumber ==  tId) {
				sicbo.setResult(data[x], this.stage_list[x], null, x, this);
				sicbo.setHotColdResult(data[x], this.stage_list[x], null, x, this);
		    sicbo.doubleTripleCount(data[x], this.stage_list[x], null, x, this)
		    sicbo.setPercentages(data[x], this.stage_list[x], null, x, this);
		    sicbo.drawRoadMap(data[x], this.stage_list[x], null, x, this);
			}
		}
	},
	setRoomInfo(data, x) {
		sicbo.setRoomInfo(data.data, x, data.totalBettingUsers);
	},

	resetRoomInfo(x) {
		sicbo.resetRoomInfo(x);
	}
}

export default {
	component_sicbo
}