import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../factories/factories';
import {instance as all} from './factory/all.js';
import {instance as paigow} from './factory/paigow.js';
import rmformat from '../factories/formatter';

let formatData = rmformat();

let component_paigow = {
  stage_list : [],
  dynamic_list : [],
  timer_stage :[],
  rtimer_stage :[],
  main (data) {

    for(var x = 0; x < data.length;x++) {
      var pg_list = document.createElement("canvas");
      var timer_thumb = document.createElement("canvas");

      pg_list.setAttribute("id", "pg-cl-"+x)
      pg_list.setAttribute("width", "1680px");
      pg_list.setAttribute("height", "283px");

      $(".pg-classic-tables.table-list").append(pg_list);

      $(pg_list).css({
        left : '0',
        top : (x * 300) +'px',
        transform : 'translate(0,0)'
      });

      this.stage_list[x] = new createjs.Stage("pg-cl-"+x);
      this.stage_list[x].enableMouseOver(10)
      this.stage_list[x].x = 15;
    }
  },

  setMaintenance (data, x) {
    switch (data.eventName)  {
      case "maintenanceChange" :
        paigow.checkMaintenance(data, true, x);
        break;
    }
  },
  
  createClassicTables (data) {
		if(!data) return;
		if(!data.length) return;

    if(!this.stage_list.length) {
			this.main(this.context.instance.paigowTables)
		}

    for(var x = 0; x < data.length; x++) {
      this.stage_list[x].tables = [];
      this.stage_list[x].data = data[x];
      all.makeListTables(data[x], this.stage_list[x], null, x, this);
      paigow.makeListTables(data[x], this.stage_list[x], null, x,this);
      // this.checkReset(data[x], 'Pai-Gow', x);
    }
  },

  inputResult (data,card_data) {
    // marks
		for(var x = 0; x < data.length; x++) {
      let roadMarks = data[x].marks;

      _.forEach(roadMarks, (m) => {
        if(typeof m.game_info == 'string') m.game_info = JSON.parse(m.game_info); // format game_info
        if(typeof m.game_result == 'string') m.game_result = JSON.parse(m.game_result); //format game_result
      });

			// if((card_data.tableId == data[x].tableNumber) && (card_data.gameName == data[x].gameName)) {
      if(data[x].namespace.toLowerCase() == `${card_data.gameName.toLowerCase()}/${card_data.tableId}`) {
        paigow.drawTilesInput(this.stage_list[x], this, card_data.type, card_data);
			}
		}
	},

  setResult(data, gameName, tId) {
    if(!data) return;
    if(!data.length) return;

    for(var x = 0; x < data.length; x++) {
      if(data[x].gameName == "Pai-Gow" && data[x].tableNumber ==  tId) {
        
        _.forEach(data[x].marks, (m) => {
          if(typeof m.game_info == 'string') m.game_info = JSON.parse(m.game_info); // format game_info
          if(typeof m.game_result == 'string') m.game_result = JSON.parse(m.game_result); //format game_result
        });
        
        let game_result = data[x].gameResult;

        paigow.displayRounds(game_result, this.stage_list[x], this);
        paigow.drawGameRoute(data[x].marks, this.stage_list[x], null, x, this);
        paigow.drawRoadMap(data[x].marks, this.stage_list[x], null, x, this);
        paigow.setResult(data[x], this.stage_list[x], this.timer_stage[x], x,this);
        paigow.setStats(data[x].marks, this.stage_list[x], x,this);
      }
    }
  },
  checkReset(data, gameName, index) {
    if(gameName.toLowerCase() === "pai-gow") {
      let check = data.marks;
      check = rmformat().fnPaigowLastRounds(check);
      check  = rmformat().fnPaigowRoadMap(check);
      if(check.length >= 5 || !check.length){
        paigow.resetInfos(this.stage_list[index]);
        data.marks = [];
        return true;
      }
    }
    return false;
  },
  setRoomInfo(data, x) {
    paigow.setRoomInfo(data.data, x, data.totalBettingUsers);
  },
  resetRoomInfo(x) {
    paigow.resetRoomInfo(x);
  },
  removeItem(data, x) {
    console.log("calll hereeee test", this.stage_list[x])
    paigow.removeItem(data, this.stage_list[x])
  }

}

  export default {
  	component_paigow
  }
