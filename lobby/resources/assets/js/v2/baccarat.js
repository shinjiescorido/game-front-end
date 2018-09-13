import {instance as all} from './factory/all.js';
import {instance as baccarat} from './factory/baccarat.js';
import rmformat from '../factories/formatter';

let formatData = rmformat();

let component_baccarat = {
	baccarat_stage : [],
	timer_stage :[],
	main (data) {
		for(var x = 0; x < data.length;x++) {
	      var c = document.createElement("canvas");
	      var t = document.createElement("canvas");

	      c.setAttribute("id", "bc-"+x)
	      c.setAttribute("width", "1280px");
	      c.setAttribute("height", "300px");

	      t.setAttribute("id", "bc-timer-"+x)
				t.setAttribute("class", "bc-timer")
	      t.setAttribute("width", "800px");
	      t.setAttribute("height", "284px");

	      $(".bc-tables").append(c);
	      $(".bc-tables").append(t);

	      $(c).css({
	      	position : 'absolute',
	      	left : 0,
	      	top : x* 306+'px'
	      });

	      $(t).css({
	      	position : 'absolute',
	      	left : 0,
	      	top : (x* 306) + 5 +'px'
	      });

	      this.baccarat_stage[x] = new createjs.Stage("bc-"+x);
	      this.baccarat_stage[x].x = 15;
	      this.baccarat_stage[x].y = 5;

	      this.timer_stage[x] = new createjs.Stage("bc-timer-"+x);
	      this.timer_stage[x].x = 15;
	      this.timer_stage[x].y = 5;

				if (window.nonInstall) {
					if (window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
						t.setAttribute("width", "284px");
						t.setAttribute("height", "800px");
						$(t).css({
							position : 'absolute',
							transform: 'rotate(-90deg)',
							left : 273,
							top  : ((x*306) - 245) +'px'
						});

						this.timer_stage[x].regX =  5;
						this.timer_stage[x].regY =  272;
						this.timer_stage[x].rotation = 90;

					} else {
						this.timer_stage[x].regX =  0;
						this.timer_stage[x].regY =  0;
						this.timer_stage[x].rotation = 0;
					}
				} //nonInstall


	    }
	},
	createTables (data, type) {
		if(!data) return;
		if(!data.length) return;

		for(var x = 0; x < data.length; x++) {
			let miscData = (data[x].slave && data[x].slave == 'supersix')?data[x]:{};
			this.baccarat_stage[x].tables = [];
			this.baccarat_stage[x].data = data[x];
			all.makeListTables(data[x], this.baccarat_stage[x], this.timer_stage[x], x, this);
			baccarat.makeListTables(data[x], this.baccarat_stage[x], this.timer_stage[x], x,this);
		}
	},

	setMaintenance (data, x) {
		switch (data.eventName)  {
			case "maintenanceChange" :
				baccarat.checkMaintenance(data, true, x, this.timer_stage[x]);
				break;
		}
	},

	setResult(data, gameName, tId) {
		if(!data) return;
		if(!data.length) return;

		for(var x = 0; x < data.length; x++) {
			if(data[x].gameName == "Baccarat" && data[x].tableNumber ==  tId) {
				if(!this.baccarat_stage[x].children.length) continue;
				let miscData = (data[x].slave && data[x].slave == 'supersix')?data[x]:{};
				baccarat.setPercentages(data[x], this.baccarat_stage[x], this.timer_stage[x], x,this);
				baccarat.drawPearlRoad(data[x], this.baccarat_stage[x], this.timer_stage[x], x,this);
				baccarat.drawBigRoad(data[x], this.baccarat_stage[x], this.timer_stage[x], x,this);
				baccarat.drawBigEyeBoy(data[x], this.baccarat_stage[x], this.timer_stage[x], x,this);
				baccarat.drawSmallRoad(data[x], this.baccarat_stage[x], this.timer_stage[x], x,this);
				baccarat.drawCockradRoad(data[x], this.baccarat_stage[x], this.timer_stage[x], x,this);
				baccarat.setResult(data[x], this.baccarat_stage[x], this.timer_stage[x], x,this);
			}
		}
	},

	setRoomInfo(data, x) {
		baccarat.setRoomInfo(data.data, x);
	},

	resetRoomInfo(x) {
		baccarat.resetRoomInfo(x);
	}
}

export default {
	component_baccarat
}
