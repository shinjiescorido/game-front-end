import {instance as all} from './factory/all.js';
import {instance as dragonTiger} from './factory/dragontiger.js';
import rmformat from '../factories/formatter';

let formatData = rmformat();

let component_dragonTiger = {
	dt_stage : [],
	main (data) {
		for(var x = 0; x < data.length;x++) {
      var c = document.createElement("canvas");

      c.setAttribute("id", "dt-"+x)
			c.setAttribute("class", "dt-cont")
      c.setAttribute("width", "1280px");
      c.setAttribute("height", "300px");

      $(".dt-tables").append(c);

      $(c).css({
      	position : 'absolute',
      	left : 0,
      	top : x* 306+'px'
      });

      this.dt_stage[x] = new createjs.Stage("dt-"+x);
      this.dt_stage[x].x = 15;
      this.dt_stage[x].y = 5;

			if (window.nonInstall) {
				if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
					this.dt_stage[x].regX =  -10;
					this.dt_stage[x].regY =  280;
					this.dt_stage[x].rotation = 90;
				} else {
					this.dt_stage[x].regX =  0;
					this.dt_stage[x].regY =  0;
					this.dt_stage[x].rotation = 0;
				}
			} //nonInstall

	  }
	},
	createTables (data, type) {
		if(!data) return;
		if(!data.length) return;

		if(!this.dt_stage.length) {
			this.main(this.context.instance.dragontigerTables)
		}

		for(var x = 0; x < data.length; x++) {
			this.dt_stage[x].tables = [];
			this.dt_stage[x].data = data[x];
			all.makeListTables(data[x], this.dt_stage[x], null, x, this);
			dragonTiger.makeListTables(data[x], this.dt_stage[x], null, x,this);
		}

	},

	setMaintenance (data, x) {
		switch (data.eventName)  {
			case "maintenanceChange" :
				dragonTiger.checkMaintenance(data, true, x);
				break;
		}
	},

	setResult(data, gameName, tId) {
		if(!data) return;
		if(!data.length) return;

		for(var x = 0; x < data.length; x++) {
			if(data[x].gameName == "Dragon-Tiger" && data[x].tableNumber ==  tId) {
				if(!this.dt_stage[x].children.length) continue;
				dragonTiger.setPercentages(data[x], this.dt_stage[x], null, x,this);
				dragonTiger.drawPearlRoad(data[x], this.dt_stage[x], null, x,this);
				dragonTiger.drawBigRoad(data[x], this.dt_stage[x], null, x,this);
				dragonTiger.drawBigEyeBoy(data[x], this.dt_stage[x], null, x,this);
				dragonTiger.drawSmallRoad(data[x], this.dt_stage[x], null, x,this);
				dragonTiger.drawCockroachRoad(data[x], this.dt_stage[x], null, x,this);
				dragonTiger.setResult(data[x], this.dt_stage[x], null, x,this);
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
