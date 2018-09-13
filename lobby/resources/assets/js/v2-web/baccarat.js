import {instance as all} from './factory/all.js';
import {instance as baccarat} from './factory/baccarat.js';
import rmformat from '../factories/formatter';

let formatData = rmformat();

let component_baccarat = {
	stage_thumb : [],
	stage_list : [],
	timer_stage :[],
	main (data) {

	  let pos = 0;
	  let cntr = -1;
	  let thumbHeight = '215px';
	  let thumbTop = 240;

	  if (parseInt(window.room_info) === 1) {
			thumbHeight = '215px';
	  	thumbTop = 260;
	  }

    $(".bc-tables.table-list").empty();
    $(".bc-tables.table-list").empty();
    $(".bc-tables.table-thumbnail").empty();

		for(var x = 0; x < data.length;x++) {
	      var bc_list = document.createElement("canvas");
	      var bc_thumb = document.createElement("canvas");
	      var timer_thumb = document.createElement("canvas");
				var bc_hover = document.createElement('div');
				var buttons = '<div class="singleplayer"></div><div class="multiplayer"></div>';

	      bc_thumb.setAttribute("id", "bc-"+x)
	      bc_thumb.setAttribute("width", "915px");
	      bc_thumb.setAttribute("height", thumbHeight);

	      bc_list.setAttribute("id", "bc-l-"+x)
	      bc_list.setAttribute("width", "1680px");
	      bc_list.setAttribute("height", "283px");

	      timer_thumb.setAttribute("id", "bc-timer-"+x)
	      timer_thumb.setAttribute("width", "370px");
	      timer_thumb.setAttribute("height", "250px");

				bc_hover.className = "bc-hover";

	      $(".bc-tables.table-list").append(bc_list);
				$(".bc-tables.table-thumbnail").append(bc_hover);
	      $(".bc-tables.table-list").append(timer_thumb);
	      $(".bc-tables.table-thumbnail").append(bc_thumb);

	      if(pos%2 == 0) {
	      	pos = 0;
	      	cntr++;
	      }

	      $(bc_list).css({
	      	left : '0',
	      	top : (x * 300) +'px',
	      	transform : 'translate(0,0)'
	      });

	      $(bc_thumb).css({
	      	position : 'absolute',
	      	left : (pos * 938)+15+'px',
	      	top : (cntr * thumbTop)+'px',
	      	transform : 'translate(0,0)'
	      });

	      $(timer_thumb).css({
	      	position : 'absolute',
	      	left : '0',
	      	top : (x * 300) +'px',
	      	transform : 'translate(0,0)'
	      });

				$(bc_hover).css({
					position : 'absolute',
					left : (pos * 938)+15+'px',
					top : (cntr * thumbTop)+'px',
					transform : 'translate(0,0)',
					height : thumbHeight,
					// width : '916px',
					'z-index' : 1
				});

	      pos ++;

				$(bc_hover).hover(
					function() {
						$(this).addClass('active').siblings().removeClass('active');
					}
				)


	      this.stage_thumb[x] = new createjs.Stage("bc-"+x);
	      this.stage_thumb[x].enableMouseOver(10)


	      this.stage_list[x] = new createjs.Stage("bc-l-"+x);
	      this.stage_list[x].enableMouseOver(10)
	      this.stage_list[x].x = 15;
	      // this.stage_thumb[x].y = 5;

	      this.timer_stage[x] = new createjs.Stage("bc-timer-"+x);
	      this.timer_stage[x].enableMouseOver(10);
	      this.timer_stage[x].x = 15;
	      // this.timer_stage[x].y = 5;
	    }
	},
	createTables (data, type, disp) {
		if(!data) return;
		if(!data.length) return;

		all.list_tables = []; // (reinitialized list data)
		all.thumb_tables = []; //(reinitialized thumb data)

		for(var x = 0; x < data.length; x++) {
			let miscData = (data[x].slave && data[x].slave == 'supersix')?data[x]:{};

			if(disp == "thumbnail") {
				this.stage_thumb[x].thumb_tables = []
				this.stage_thumb[x].data = data[x]

				all.makeThumbnailTables(data[x], this.stage_thumb[x], null, x, this);
				baccarat.makeThumbnailTables(data[x], this.stage_thumb[x], null, x,this);
			}

			if(disp == "list") {
				this.stage_list[x].list_tables = []
				this.stage_list[x].data = data[x]

				all.makeListTables(data[x], this.stage_list[x], this.timer_stage[x], x, this);
				baccarat.makeListTables(data[x], this.stage_list[x], this.timer_stage[x], x,this);
			}
		}
	},
	inputResult (data,card_data) {
		if(!data && !data.length) return;

		for(var x = 0; x < data.length; x++) {
			if((card_data.tableId == data[x].tableNumber) && (card_data.gameName == data[x].gameName)) {
				baccarat.inputRes(card_data, this.stage_list[x], this.timer_stage[x], x,this);
			}
		}
	},

	setMaintenance (data, x) {
		switch (data.eventName)  {
			case "maintenanceChange" :
				all.checkMaintenance(data, true, x);
				baccarat.checkMaintenance(data, true, x);
				break;
		}
	},

	setResult(data, gameName, tId) {
		if(!data) return;
		if(!data.length) return;

		for(var x = 0; x < data.length; x++) {
			if(data[x].gameName == "Baccarat" && data[x].tableNumber ==  tId) {
				if(this.stage_thumb[x].children.length) {
					baccarat.drawBigRoad(data[x], this.stage_list[x], this.timer_stage[x], x,this, 'thumbnail');
					baccarat.setResult(data[x], this.stage_list[x], this.timer_stage[x], x,this, 'thumbnail');
				}

				if(this.stage_list[x].children.length) {
					let miscData = (data[x].slave && data[x].slave == 'supersix')?data[x]:{};

					baccarat.setPercentages(data[x], this.stage_list[x], this.timer_stage[x], x,this);
					baccarat.drawPearlRoad(data[x], this.stage_list[x], this.timer_stage[x], x,this);
					baccarat.drawBigRoad(data[x], this.stage_list[x], this.timer_stage[x], x,this, 'list');
					baccarat.drawBigEyeBoy(data[x], this.stage_list[x], this.timer_stage[x], x,this);
					baccarat.drawSmallRoad(data[x], this.stage_list[x], this.timer_stage[x], x,this);
					baccarat.drawCockradRoad(data[x], this.stage_list[x], this.timer_stage[x], x,this);

					baccarat.setResult(data[x], this.stage_list[x], this.timer_stage[x], x,this, 'list');
				}

			}
		}
	},

	setRoomInfo(data, x) {
		if (all.list_tables.length) {
			baccarat.setRoomInfo(data.data, x);
		}
		else {
			all.setRoomInfo(data.data, x);
		}
	},

	resetRoomInfo(x) {
		if (all.list_tables.length) {
			baccarat.resetRoomInfo(x);
		}
		else {
			all.resetRoomInfo(x);
		}
	}
}

export default {
	component_baccarat
}
