import {instance as all} from './factory/all.js';
import {instance as paigow} from './factory/paigow.js';
import rmformat from '../factories/formatter';

let formatData = rmformat();

let component_paigow = {
  paigow_stage : [],
  banker_stage : null,
  main (data) {
    for(var x = 0; x < data.length;x++) {
      var c = document.createElement("canvas");
      var t = document.createElement("canvas");

      c.setAttribute("id", "pg-"+x)
      c.setAttribute("class", "pg-cont")
      c.setAttribute("width", "1280px");
      c.setAttribute("height", "300px");

      $(".pg-tables").append(c);

      $(c).css({
        position : 'absolute',
        left : 0,
        top : x* 306+'px'
      });

      this.paigow_stage[x] = new createjs.Stage("pg-"+x);
      this.paigow_stage[x].x = 15;
      this.paigow_stage[x].y = 5;

      if (window.nonInstall) {
        if(window.innerWidth < 992 && window.matchMedia("(orientation: portrait)").matches) {
          this.paigow_stage[x].regX =  -10;
          this.paigow_stage[x].regY =  280;
          this.paigow_stage[x].rotation = 90;
          console.log("if", this.paigow_stage[x]);
        } else {
          this.paigow_stage[x].regX =  0;
          this.paigow_stage[x].regY =  0;
          this.paigow_stage[x].rotation = 0;

          console.log("else", this.paigow_stage[x]);
        }
      } //nonInstall
    }
  },

  setMaintenance (data, x) {
    switch (data.eventName)  {
      case "maintenanceChange" :
        paigow.checkMaintenance(data, true, x);
        break;
    }
  },

  createClassicTables (data, type) {
    if(!data) return;
    if(!data.length) return;

    if(!this.paigow_stage.length) {
      this.main(this.context.instance.paigowTables)
    }

    for(var x = 0; x < data.length; x++) {
      this.paigow_stage[x].tables = [];
      this.paigow_stage[x].data = data[x];
      all.makeListTables(data[x], this.paigow_stage[x], null, x);
      paigow.makeListTables(data[x], this.paigow_stage[x], null, x,this);
      // this.checkReset(data[x], 'Pai-Gow', x);
    }
  }, // createClassicTables

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
        paigow.drawTilesInput(this.paigow_stage[x], this, card_data.type, card_data);
      }
    }
  }, // inputResult

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

        paigow.displayRounds(game_result, this.paigow_stage[x], this);
        paigow.drawGameRoute(data[x].marks, this.paigow_stage[x], null, x, this);
        paigow.drawRoadMap(data[x].marks, this.paigow_stage[x], null, x, this);
        paigow.setStatus(data[x], this.paigow_stage[x], x);
        paigow.setCurrentTiles(data[x], this.paigow_stage[x], x);
        paigow.setStats(data[x].marks, this.paigow_stage[x], x,this);
      }
    }
  }, // setResult
  checkReset(data, gameName, index) {
    if(gameName.toLowerCase() === "pai-gow") {
      let check = data.marks;
      check = rmformat().fnPaigowLastRounds(check);
      check  = rmformat().fnPaigowRoadMap(check);
      console.log("check reset another", check)
      if(check.length >= 5 || !check.length){
        paigow.resetInfos(this.paigow_stage[index]);
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
    paigow.removeItem(data, this.paigow_stage[x])
  }
}

export default {
	component_paigow
}
