import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../factories/factories';
import {instance as all} from './factory/all.js';
import {instance as sicbo} from './factory/sicbo.js';
import rmformat from '../factories/formatter';

let formatData = rmformat();

let component_sicbo = {
	sicbo_stage : [],
	main (data) {
		for(var x = 0; x < data.length;x++) {
	      var c = document.createElement("canvas");
	      var t = document.createElement("canvas");

	      c.setAttribute("id", "sb-"+x)
				c.setAttribute("class", "sb-cont")
	      c.setAttribute("width", "1280px");
	      c.setAttribute("height", "300px");

	      $(".sb-tables").append(c);

	      $(c).css({
	      	position : 'absolute',
	      	left : 0,
	      	top : x* 306+'px'
	      });

	      this.sicbo_stage[x] = new createjs.Stage("sb-"+x);
	      this.sicbo_stage[x].x = 15;
				this.sicbo_stage[x].y = 5;

				if (window.nonInstall) {
					if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
						this.sicbo_stage[x].regX =  -10;
						this.sicbo_stage[x].regY =  280;
						this.sicbo_stage[x].rotation = 90;
					} else {
						this.sicbo_stage[x].regX =  0;
						this.sicbo_stage[x].regY =  0;
						this.sicbo_stage[x].rotation = 0;
					}
				} //nonInstall

	    }
	},
	createTables (data, type) {
		if(!data) return;
		if(!data.length) return;

		if(!this.sicbo_stage.length) {
			this.main(this.context.instance.sicboTables)
		}

		for(var x = 0; x < data.length; x++) {
			this.sicbo_stage[x].tables = [];
			this.sicbo_stage[x].data = data[x];
			all.makeListTables(data[x], this.sicbo_stage[x], null, x);
			sicbo.makeListTables(data[x], this.sicbo_stage[x], null, x,this);
		}

	},

	setMaintenance (data, x) {
		switch (data.eventName)  {
			case "maintenanceChange" :
				sicbo.checkMaintenance(data, true, x);
				break;
		}
	},

	setResult(data, gameName, tId) {
		if(!data) return;
		if(!data.length) return;

		for(var x = 0; x < data.length; x++) {
			if(data[x].gameName == "Sicbo" && data[x].tableNumber ==  tId) {
				if(!this.sicbo_stage[x].children.length) continue;
				sicbo.setResult(data[x], this.sicbo_stage[x], null, x,this);
				sicbo.setHotColdResult(data[x], this.sicbo_stage[x], null, x,this);
				sicbo.drawRoadMap(data[x], this.sicbo_stage[x], null, x,this);
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
