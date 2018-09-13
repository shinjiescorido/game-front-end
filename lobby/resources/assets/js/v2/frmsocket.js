import Xpacket from '../lib/XPacket';
import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';

window.all_tables = [];
window.sicbo_rooms = [];
function byKey(key) {
  return function (o) {
    var v = parseInt(o[key], 10);
    return isNaN(v) ? o[key] : v;
  };
}
let initData = null;

let instance = {
  dealer_id : [],
  hotLiveGames : [],
  // socket : io.connect(window.socket+'all', { transports: ['websocket']}),
  main () {
    this.socket = io.connect(window.socket+'all', { transports: ['websocket']}),
    this.socket.on('connect', (e) => {
      this.socket.emit('register', {id: window.userId});
    });

    this.socket.on('disconnect', (e) => {
      this.isInit = false;
      $('.tables-container.bc-tables').empty();
      $('.tables-container.sb-tables').empty();
      $('.tables-container.dt-tables').empty();
      $('.tables-container.poker-tables').empty();
      $('.tables-container.pg-tables').empty();
    });

    $("#void").on('click', () => {
      this.setVoid({gameName: 'Sicbo'});
      this.context.toggle.toggleRefresh();
    })

    $("#voidP").on('click', () => {
      this.setVoid({gameName: 'Poker'});
      this.context.toggle.toggleRefresh();
    });

    this.socket.on('data', (data) => {
      let data_res = Xpacket.received(data)

      switch(data_res.eventName ) {
        case "reject":
        window.location = "/rejected"
          break;
        case "init":
          initData = data_res;

          console.log("initData:", data_res);
          window.isBanker = false;
          window.all_tables = _.cloneDeep(data_res.data);

          let rooms = _.cloneDeep(data_res.rooms);

          window.paigow_rooms = {}
          window.sicbo_rooms = {}

          // filtering of rooms
          for(var key in rooms) {
            if(key.toLowerCase().indexOf('pai') > -1) {
              paigow_rooms[key] = rooms[key];
            } else {
              sicbo_rooms[key] = rooms[key];
            }
          }

          if (sicbo_rooms) {
            for (var key in sicbo_rooms) {
              if (parseInt(window.sicbo_rooms[key].banker.user_id) == parseInt(window.userId)) {
                window.isBanker = true;
                break;
              }
            }
          }

          if (paigow_rooms) {
            for (var key in paigow_rooms) {
              if (parseInt(window.paigow_rooms[key].banker.user_id) == parseInt(window.userId)) {
                window.isBanker = true;
                break;
              }
            }
          }

          if(!this.context.finishedLoad) return;
          this.initTable(data_res)

          console.log("----------------- INIT -----------------");
          this.context.toggle.toggleRefresh()
          if (data_res.data[0].mainNotice && parseInt(data_res.data[0].mainNotice.status)) {
            this.context.setNotice(data_res.data[0].mainNotice);
          }
          break;
        case ("displayresult") :
        case ("displayresults") :
          this.setResult(data_res);
          break;
        case "maintenanceChange" :
          if(!this.context.finishedLoad) return
          this.setMaintenance(data_res)
          break;
        case ("setbettingtime") :
          if(!this.context.finishedLoad) return
          this.setTimer(data_res);
          break;
        case("inputitem") :
          if(!this.context.finishedLoad) return
          this.setCardSwipe(data_res);
          break;
        case ("newround") :
          // if(!this.context.finishedLoad) return
          this.setNewRound(data_res);
          break;
        case ("dealerchange") :
          // if(!this.context.finishedLoad) return
          this.setDealer(data_res);
          break;
        case "shoechange" :
          // if(!this.context.finishedLoad) return
          this.shoechange(data_res)
          break;
        case ("updatecredits") :
          if(!this.context.finishedLoad) return
          this.updateCredits(data_res);
          break;
        case "displaymodify" :
          // if(!this.context.finishedLoad) return
          this.displaymodify(data_res)
          break;
        case ("mainnoticechange") :
          // if(!this.context.finishedLoad) return
          this.context.setNotice(data_res.data);
          break;
        case ("mainmaintenancechange") :
          // if(!this.context.finishedLoad) return
          this.setMainMaintenance(data_res.data);
          break;
        case ("bets") :
          this.setRoomInfo(data_res);
          break;
        case ("displayRollback") :
          this.setVoid(data_res);
          this.context.toggle.toggleRefresh();
          break;
        case ("removeitem") :
          this.removeItem(data_res);
          break;
        case ("create_room") :
          if(!this.context.finishedLoad) return;
          this.setCreateRoom(data_res);
          break;
        case ("remove_room") :
          if(!this.context.finishedLoad) return;
          this.setRemoveRoom(data_res);
          break;
        case ("update_banker_credits") :
          if(!this.context.finishedLoad) return;
          this.setBankerMoney(data_res);
          break;
        case ("room_player_left") :
          if(!this.context.finishedLoad) return;
          this.setUserLeave(data_res);
          break;
        case ("room_user_count") :
          if(!this.context.finishedLoad) return;
          this.setUserCount(data_res);
          break;
        case ("lobby_update_room") :
          this.setIsPublic(data_res);
          break;
      }
    });
  },
  removeItem(data) {
    if(data.gameName.toLowerCase() === 'pai-gow') {
      window.all_tables.forEach((game) => {
        if(game.namespace.toLowerCase() === `${data.gameName}/${data.tableId}`.toLowerCase()) {
          game.gameInfo = data.gameInfo;
        }
      });

      console.log(this.context.component_paigow.paigow_stage.length, "test")
      if(this.context.component_paigow.paigow_stage.length) {
        this.context.component_paigow.paigow_stage.forEach((e, x)=>{
          if(e.data.gameName != data.gameName || e.data.tableNumber != data.tableId) return;
          this.context.component_paigow.removeItem(data, x);
        });
      }
    } //end of if paigow

  },
  setRoomInfo(data) {
    if (data.gameName == 'Poker') return;

    window.all_tables.forEach((e, x) => {
      if(e.gameName == data.gameName && parseInt(e.tableNumber) == parseInt(data.tableId)) {
        e.betInfo = data.data;
        e.totalBettingUsers = data.totalBettingUsers;
      }
    });

    switch(data.gameName) {
      case 'Baccarat':
        if (!this.context.component_baccarat.baccarat_stage[0].data) return;

        if (this.context.component_baccarat.baccarat_stage[0].data) {
          this.context.component_baccarat.baccarat_stage.forEach((e, x)=>{
            if(e.data.gameName != data.gameName || e.data.tableNumber != data.tableId) return;
            this.context.component_baccarat.setRoomInfo(data, x);
            this.context.component_baccarat.baccarat_stage[x].isUpdate = true;
            this.handleBaccaratUpdate(x, this)
          });
        }
        break;

      case 'Dragon-Tiger':
        if (!this.context.component_dragonTiger.dt_stage[0].data) return;

        if (this.context.component_dragonTiger.dt_stage[0].data) {
          this.context.component_dragonTiger.dt_stage.forEach((e, x)=>{
            if(e.data.gameName != data.gameName || e.data.tableNumber != data.tableId) return;
            this.context.component_dragonTiger.setRoomInfo(data, x);
          });
        }
        break;

      case 'Sicbo':
        if (!this.context.component_sicbo.sicbo_stage[0].data) return;

        if (this.context.component_sicbo.sicbo_stage[0].data) {
          this.context.component_sicbo.sicbo_stage.forEach((e, x)=>{
            if(e.data.gameName != data.gameName || e.data.tableNumber != data.tableId) return;
            this.context.component_sicbo.setRoomInfo(data, x);
            console.log("Sicbo:", x);
          });
        }
        break;
      case 'Pai-Gow':
        if (!this.context.component_paigow.paigow_stage[0].data) return;

        for(var x = 0; x < this.context.component_paigow.paigow_stage.length; x++) {
          if(!this.context.component_paigow.paigow_stage[x].data) continue;
          if(this.context.component_paigow.paigow_stage[x].data.tableNumber == data.tableId) {
            this.context.component_paigow.setRoomInfo(data, x);
          }
        }
        break;
    }
  },

  setVoid (data) {
    switch(data.gameName) {
      case "Sicbo":
      let sb = _.filter(window.all_tables, (e) => { return e.gameName === 'Sicbo'})[0];

      if(typeof sb.marks[sb.marks.length-1].game_info === 'string') {
        sb.marks[sb.marks.length-1].game_info = JSON.parse(sb.marks[sb.marks.length-1].game_info);
      }

      sb.marks[sb.marks.length-1].game_info.isVoid = true;
      sb.marks[sb.marks.length-1].isVoid = true;
      break;
      case "Poker":

      let poker = _.filter(window.all_tables, (e) => { return e.gameName === 'Poker'});

      for(var i = 0; i < poker.length; i++) {
        poker[i].meta = data.meta;

        for(var x = 0; x < poker[i].meta.length; x++) {
          if(typeof poker[i].meta[x].gameInfo === 'string') {
            poker[i].meta[x].gameInfo = JSON.parse(poker[i].meta[x].gameInfo)
          }
          if(poker[i].meta[x].gameInfo.isVoid) {
            poker[i].meta[x].isVoid = true
          }
        }

        // poker[i].meta[0].gameInfo.isVoid = true;
        // poker[i].meta[0].isVoid = true;

        if(poker[i].slave == "bonusplus") {
          let pMark = _.find(poker, (e) => { return !e.slave})
          poker[i].marks = pMark.marks;
        } else {
          poker[i].marks.pop();
        }
      }

      break;
      case "Baccarat":
      let bc = _.filter(window.all_tables, (e) => { return `${e.gameName}${e.tableNumber}` === `Baccarat${data.tableId}`});
      bc.forEach((game) => {

        if(game.slave === 'bonus' || game.slave === 'supersix') {
          let bcGame = _.find(bc, (e) => { return !e.slave});
          game.marks = bcGame.marks
        } else {
          game.marks.pop();
        }
      });
      break;
      case "Dragon-Tiger":
      let dt = _.filter(window.all_tables, (e) => { return `${e.gameName}${e.tableNumber}` === `Dragon-Tiger${data.tableId}`});
      dt.forEach((game) => {
        game.marks.pop();
      });
      break;
    }
  },

  setMainMaintenance(data) {

    if (data.status === undefined) return;

    let mainText = '';
    let subText = '';

    let newStartTime = setCurrentTimezone(data.start_time);
    let newEndTime = setCurrentTimezone(data.end_time);

    if (parseInt(data.mainText) == 1 || parseInt(data.main_text) == 1) {
      mainText = window.language.lobby.maintextCap1;
    }
    else if (parseInt(data.mainText) == 2 || parseInt(data.main_text) == 2) {
      mainText = window.language.lobby.maintextCap2;
    }
    else if (parseInt(data.mainText) == 3  || parseInt(data.main_text) == 3) {
      mainText = window.language.lobby.maintextCap3;
    }

    if (parseInt(data.subText) == 1 || parseInt(data.sub_text) == 1) {
      subText = window.language.lobby.subtextCap1;
    }
    else if (parseInt(data.subText) == 2 || parseInt(data.sub_text) == 2) {
      subText = window.language.lobby.subtextCap2;
    }
    else if (parseInt(data.subText) == 3 || parseInt(data.sub_text) == 3) {
      subText = window.language.lobby.subtextCap3;
    }

    if (data.status == 1 && window.userAuthority != "admin") {
      $('.mainText').html(mainText);
      if(window.language.locale == "zh") {
        $(".mainText").css("margin-left","20px")
      }
      $('.subText').html(subText);
      $('.schedule').html(newStartTime+' ~ '+newEndTime);
      $('.maintenanceOverlay').show();
      $("#myCanvas").hide()
      $(".content-container").hide()
    }
    else {
      $('.maintenanceOverlay').hide();
      $("#myCanvas").show()
      $(".content-container").show()
    }
  },

  displaymodify (data) {
    window.all_tables.forEach((row)=>{
      if(row.tableNumber == data.tableId && row.gameName == data.gameName) {
        row.is_shoeChange = false;
        row.roundStatus = 'R';
        if (data.gameName == 'Poker') {
          row.marks.pop();
          row.marks.push(data.data.mark);
          row.meta = data.meta;
        } else if (data.gameName == 'Sicbo') {
          row.marks.pop();
          row.marks.push(data.data.mark);
        } else if (data.gameName == 'Pai-Gow') {
          row.marks.pop();
          row.marks.push(data.data.mark);
          row.gameInfo = data.data.mark.game_info;
          if(typeof row.gameInfo === 'string') {
            row.gameInfo = JSON.parse(row.gameInfo);
          }
        } else {
          row.marks = data.data.mark;
        }
      }
    });

    if(!this.context.finishedLoad) return;

    // bc
    this.baccaratTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && (!row.slave || !row.slave.length) });
    this.baccaratSuper6Tables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'supersix' });
    this.baccaratBonusTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'bonus' });
    // this.baccaratTables = this.context.toggle.sortData(this.baccaratTables, "normal");

    this.baccaratTables = this.context.toggle.sortData(this.baccaratTables, "normal");
    this.baccaratSuper6Tables = this.context.toggle.sortData(this.baccaratSuper6Tables, "supersix");
    this.baccaratBonusTables = this.context.toggle.sortData(this.baccaratBonusTables, "bonus");

    // dt
    this.dragontigerTables = _.filter(all_tables, function(row) { return row.gameName == "Dragon-Tiger"});

    this.sicboTables = _.filter(all_tables, function(row) { return row.gameName == "Sicbo" });
    this.pokerTables = _.filter(all_tables, function(row) { return row.gameName == "Poker"  });
    this.paigowTables = _.filter(all_tables, function(row) { return row.gameName == "Pai-Gow"  });

    switch(data.gameName) {
      case 'Baccarat':
      if(this.context.toggle.getCurrentOpen()=='baccarat_supersix') {
        this.context.component_baccarat.setResult(this.baccaratSuper6Tables, data.gameName, data.tableId);
      } else if(this.context.toggle.getCurrentOpen()=='baccarat_dragonbonus') {
        this.context.component_baccarat.setResult(this.baccaratBonusTables, data.gameName, data.tableId);
      } else {
        this.context.component_baccarat.setResult(this.baccaratTables, data.gameName, data.tableId);
      }
      break;
      case 'Dragon-Tiger':
      this.context.component_dragonTiger.setResult(this.dragontigerTables, data.gameName, data.tableId);
      break;
      case 'Sicbo':
      this.context.component_sicbo.setResult(this.sicboTables, data.gameName, data.tableId);
      this.context.component_userbased.setResultGameTable(this.sicboTables[0], data.gameName);
      break;
      case 'Poker':
      this.context.component_poker.setResult(this.pokerTables, data.gameName, data.tableId);
      break;
      case "Pai-Gow" :
      this.context.component_paigow.setResult(this.paigowTables, data.gameName, data.tableId);
      this.context.component_userbased.setResultGameTable(this.paigowTables[1], data.gameName);
      break;
    }

    if(this.context.component_userbased.currentSelected && this.context.component_userbased.currentSelected === `${data.gameName}/${data.tableId}`) {
      this.context.component_userbased.createGameInfoTable(_.find(all_tables, (e)=>{ return e.namespace === `${data.gameName}/${data.tableId}`}));
    }
  },

  updateCredits (data) {
    let user_money = 0;

    let currency = "";
    if(window.currencyAbbrev == "USD") {
      currency = "$"
    } else if(window.currencyAbbrev == "KRW"){
      currency = "₩"
    } else if(window.currencyAbbrev == "JPY" || window.currencyAbbrev == "CNY"){
      currency = "¥"
    } else if(window.currencyAbbrev == "IDR") {
      currency = "Rp"
    } else if(window.currencyAbbrev == "MYR") {
      currency = "RM"
    } else if(window.currencyAbbrev == "THB") {
      currency = "฿"
    } else {
      currency = "RM "
    }

    if(window.integrationType == "transfer") {
      let money = (window.casino == 'SS') ? parseFloat(data.payload.credits.money).toFixed(2) : parseInt(data.payload.credits.money);

      $(".header-userinfo-mb__holdings span").html(this.context.component_notification.numberWithCommas(currency + money));

      if($(".header-userinfo-mb__holdings span").html().length > 8) {
        $(".header-userinfo-mb__holdings span").wrap("<div class='marquee'>")
      }
    } else {
      // if seamless get money frm api
      console.log("INTEGARATION TYPE", window.integrationType)
      $.post('/getUserMoney', (response) => {
        if(response) {
          let money = (window.casino == 'SS') ? parseFloat(response).toFixed(2) : parseInt(response);

          $(".header-userinfo-mb__holdings span").html(this.context.component_notification.numberWithCommas(currency + money));

          if($(".header-userinfo-mb__holdings span").html().length > 8) {
            $(".header-userinfo-mb__holdings span").wrap("<div class='marquee'>")
          }
        }
      });
    }

    if (data.payload.credits.total_winning) {

      let gameText = data.gameName;

      switch(data.gameName){
        case "Baccarat" :
        gameText = window.language.lobby.baccarat;
        break;
        case "Dragon-Tiger" :
        gameText = window.language.lobby.dragontiger;
        break;
        case "Sicbo":
        gameText = window.language.lobby.sicbo;
        break;
        case "Poker":
        gameText = window.language.lobby.texas;
        break;
      }
      // this.context.lobby_win_popup.animatePopup(data.gameName, parseInt(data.payload.credits.total_winning));

      this.context.component_notification.animatePopup(`${gameText} #${data.tableId}`, parseInt(data.payload.credits.total_winning));
    }
  },

  shoechange (data) {

    for(var x = 0; x < all_tables.length; x++) {
      if(all_tables[x].gameName == data.gameName && all_tables[x].tableNumber == data.tableId) {
        all_tables[x].marks = [];
        all_tables[x].is_shoeChange = true;
      }
    }

    if(!this.context.finishedLoad) return

    this.baccaratTables = _.filter(all_tables, (row) => { return row.gameName == "Baccarat" && (!row.slave || !row.slave.length) });
    this.baccaratSuper6Tables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'supersix' });
    this.baccaratBonusTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'bonus' });

    this.baccaratTables = this.context.toggle.sortData(this.baccaratTables, "normal");
    this.baccaratSuper6Tables = this.context.toggle.sortData(this.baccaratSuper6Tables, "supersix");
    this.baccaratBonusTables = this.context.toggle.sortData(this.baccaratBonusTables, "bonus");

    let toPass = null;
    // handles shoechange on different slaves.
    switch(this.context.toggle.getCurrentOpen()) {
      case "baccarat_supersix":
      toPass = this.baccaratSuper6Tables;
      break;
      case "baccarat_dragonbonus":
      toPass = this.baccaratBonusTables;
      break;
      case "baccarat_normal":
      toPass = this.baccaratTables;
      break;
    }

    this.context.component_baccarat.setResult(toPass, data.gameName, data.tableId);

    this.dragontigerTables = _.filter(all_tables, function(row) { return row.gameName == "Dragon-Tiger"});
    this.context.component_dragonTiger.setResult(this.dragontigerTables, data.gameName, data.tableId);

    switch(data.gameName) {
      case "Baccarat" :
      for(var x = 0; x < this.context.component_baccarat.baccarat_stage.length; x++) {
        if(!this.context.component_baccarat.baccarat_stage[x].children.length) continue;
        if(this.context.component_baccarat.baccarat_stage[x].data.namespace === `${data.gameName}/${data.tableId}`) {
          this.context.component_baccarat.baccarat_stage[x].tables.status.text = window.language.prompts.promptshuffling;
          this.context.component_baccarat.baccarat_stage[x].isUpdate = true;
        }
        this.handleBaccaratUpdate(x, this)
      }
      break;
      case "Dragon-Tiger" :
      for(var x = 0; x < this.context.component_dragonTiger.dt_stage.length; x++) {
        if(!this.context.component_dragonTiger.dt_stage[x].children.length) continue;
        if(this.context.component_dragonTiger.dt_stage[x].data.namespace === `${data.gameName}/${data.tableId}`) {
          this.context.component_dragonTiger.dt_stage[x].tables.status.text = window.language.prompts.promptshuffling;
        }
      }
      break;
    }

    if(this.context.component_userbased.currentSelected && this.context.component_userbased.currentSelected === `${data.gameName}/${data.tableId}`) {
      this.context.component_userbased.createGameInfoTable(_.find(all_tables, (e)=>{ return e.namespace === `${data.gameName}/${data.tableId}`}));
    }

  },

  setNewRound (data) {
    window.all_tables.forEach((table)=>{
      if(table.gameName == data.gameName && table.tableNumber == data.tableId) {
        if(table.gameName == "Baccarat") {
          table.gameInfo =  { 'banker1' : null ,'banker2' : null, 'banker3' : null, 'player1' : null, 'player2' : null, 'player3' : null}
        }

        if(table.gameName == "Poker") {
          table.gameInfo = { burn: [], dealer : [], flop : [], player : [] , 'river' : null, 'turn' : null}
        }

        if(table.gameName == "Dragon-Tiger") {
          table.gameInfo = {'burn': null, 'tiger': null, 'dragon' : null};
        }

        if(table.gameName == "Pai-Gow") {
          table.gameInfo.tiles = {};
        }

        table.roundStatus = "S";
        table.currentRound = data.roundNum
      }
    });

    if(!this.context.finishedLoad) return

    if (this.context.component_userbased.currentSelected) {
      this.context.component_userbased.setNewround(all_tables, data.gameName, data.tableId, data.meta);
    }

    function handleNewRound(target) {
      target.tables.round_num.text = data.roundNum
      if(target.tables.card_result_container) {
        target.tables.card_result_container.removeAllChildren()
      }
      if(target.up_0) {
        target.up_0.alpha = 0;
        target.up_1.alpha  = 0;
        target.down_0.alpha  = 0;
        target.down_1.alpha   = 0;
        target.heaven_0.alpha = 0;
        target.heaven_1.alpha = 0;
        target.banker_0.alpha = 0;
        target.banker_1.alpha = 0;
        target.up.tileBg.alpha = 0;
        target.down.tileBg.alpha = 0;
        target.heaven.tileBg.alpha = 0;
        target.banker.tileBg.alpha = 0;
      }
    }

    switch(data.gameName) {
      case "Baccarat" :
      for(var x = 0; x < this.context.component_baccarat.baccarat_stage.length; x++) {
        if(!this.context.component_baccarat.baccarat_stage[x].data) continue;
        if(this.context.component_baccarat.baccarat_stage[x].data.tableNumber == data.tableId) {
          handleNewRound(this.context.component_baccarat.baccarat_stage[x])
          this.context.component_baccarat.baccarat_stage[x].isUpdate = true;
          this.handleBaccaratUpdate(x, this);

          this.context.component_baccarat.resetRoomInfo(x);
        }
      }
      break;
      case "Dragon-Tiger" :
      for(var x = 0; x < this.context.component_dragonTiger.dt_stage.length; x++) {
        if(!this.context.component_dragonTiger.dt_stage[x].data) continue;
        if(this.context.component_dragonTiger.dt_stage[x].data.tableNumber == data.tableId) {
          handleNewRound(this.context.component_dragonTiger.dt_stage[x])

          this.context.component_dragonTiger.resetRoomInfo(x);
        }
      }
      break;
      case "Sicbo" :
      for(var x = 0; x < this.context.component_sicbo.sicbo_stage.length; x++) {
        if(!this.context.component_sicbo.sicbo_stage[x].data) continue;
        if(this.context.component_sicbo.sicbo_stage[x].data.tableNumber == data.tableId) {
          handleNewRound(this.context.component_sicbo.sicbo_stage[x])

          this.context.component_sicbo.resetRoomInfo(x);
        }
      }
      break;
      case "Poker" :
      for(var x = 0; x < this.context.component_poker.poker_stage.length; x++) {
        if(!this.context.component_poker.poker_stage[x].data) continue;
        if(this.context.component_poker.poker_stage[x].data.tableNumber == data.tableId) {
          handleNewRound(this.context.component_poker.poker_stage[x])
        }
      }
      break;
      case "Pai-Gow" :
      for(var x = 0; x < this.context.component_paigow.paigow_stage.length; x++) {
        if(!this.context.component_paigow.paigow_stage[x].data) continue;
        if(this.context.component_paigow.paigow_stage[x].data.tableNumber == data.tableId) {
          this.context.component_paigow.checkReset(this.paigowTables[x], data.gameName, x)
          this.context.component_userbased.checkReset(this.paigowTables[1], data.gameName, x)
          handleNewRound(this.context.component_paigow.paigow_stage[x])
        }
      }
      break;

    }

  },

  setCardSwipe (data) {

    window.all_tables.forEach((table)=>{
      if(table.gameName == data.gameName && table.tableNumber == data.tableId ) {
        table.roundStatus = 'P';
        if(table.gameName == "Pai-Gow") {
          table.gameInfo = data.gameInfo
        }
      }
    });

    switch(data.gameName) {
      case "Baccarat" :
      if(!this.context.component_baccarat.baccarat_stage.length) return;
      for(var x = 0; x < this.context.component_baccarat.baccarat_stage.length; x++) {
        if(!this.context.component_baccarat.baccarat_stage[x].data) continue;
        if(this.context.component_baccarat.baccarat_stage[x].data.tableNumber == data.tableId) {

          this.context.component_baccarat.baccarat_stage[x].isUpdate = true;
          this.context.component_baccarat.baccarat_stage[x].tables.status.text = window.language.lobby.dealing;
          this.handleBaccaratUpdate(x, this);
        }
      }
      break;
      case "Dragon-Tiger" :
      if(data.type === "burn") return;
      if(!this.context.component_dragonTiger.dt_stage.length) return;
      for(var x = 0; x < this.context.component_dragonTiger.dt_stage.length; x++) {
        if(!this.context.component_dragonTiger.dt_stage[x].data) continue;
        if(this.context.component_dragonTiger.dt_stage[x].data.tableNumber == data.tableId) {
          this.context.component_dragonTiger.dt_stage[x].tables.status.text = window.language.lobby.dealing;
        }
      }
      break;
      case "Poker" :
      for(var x = 0; x < all_tables.length; x++) {
        if(all_tables[x].gameName == data.gameName && all_tables[x].tableNumber == data.tableId) {
          all_tables[x].gameInfo = data.gameInfo;
        }
      }

      this.pokerTables = _.filter(all_tables, function(row) { return row.gameName == "Poker"  });

      if(this.isBurnCard(data)) return;
      if(!this.context.component_poker.poker_stage.length) return;
      for(var x = 0; x < this.context.component_poker.poker_stage.length; x++) {
        if(!this.context.component_poker.poker_stage[x].data) continue;
        if(this.context.component_poker.poker_stage[x].data.tableNumber == data.tableId) {
          this.context.component_poker.poker_stage[x].tables.status.text = window.language.lobby.dealing;
          this.context.component_poker.inputResult(this.pokerTables, data.gameName, data.tableId, data)
        }
      }
      break;

      case "Pai-Gow" :
      if(data.type.indexOf('dices') > -1 || data.type == "seat") return;
      this.context.component_paigow.inputResult(this.paigowTables, data);
      if(!this.context.component_paigow.paigow_stage.length) return;
      for(var x = 0; x < this.context.component_paigow.paigow_stage.length; x++) {
        if(!this.context.component_paigow.paigow_stage[x].data) continue;
        if(this.context.component_paigow.paigow_stage[x].data.tableNumber == data.tableId) {
          this.context.component_paigow.paigow_stage[x].tables.status.text = window.language.lobby.dealing;
        }
      }

      if(toggle.getCurrentOpen().toLowerCase() === "userbased_paigow") {
        if (this.context.component_userbased.game_stage.children.length > 0) {
          this.context.component_userbased.setCardSwipe(data, 'pai-gow');
        }
      }

      break;
    }
  },

  isBurnCard (data) {
    let isBurn = false;
    if(data.gameInfo.player.length == 2 && data.gameInfo.burn.length == 1 && !data.gameInfo.flop.length)
    isBurn = true;
    if(data.gameInfo.player.length == 2 && data.gameInfo.flop.length == 3 && data.gameInfo.burn.length == 2 && !data.gameInfo.turn)
    isBurn = true;
    if(data.gameInfo.player.length == 2 && data.gameInfo.flop.length == 3 && data.gameInfo.burn.length == 3 && !data.gameInfo.turn)
    isBurn = true;
    if(data.gameInfo.player.length == 2 && data.gameInfo.flop.length == 3 && data.gameInfo.burn.length == 3 && data.gameInfo.turn && !data.gameInfo.river)
    isBurn = true;

    return isBurn;
  },

  setTimer (data) {

    function timerStartHandle(target) {
      target.tables.bettingStart = true

      if(!_.find(target.data.maintenanceSetting, (e) => { return e.status == 1}) || window.userAuthority == "admin" ) {
        target.tables.timer.visible = true;
      } else {
        target.tables.timer.visible = false;
      }
      // for paigow
      if(target.up_0) {
        target.up_0.alpha = 0;
        target.up_1.alpha  = 0;
        target.down_0.alpha  = 0;
        target.down_1.alpha   = 0;
        target.heaven_0.alpha = 0;
        target.heaven_1.alpha = 0;
        target.banker_0.alpha = 0;
        target.banker_1.alpha = 0;
        target.up.tileBg.alpha = 0;
        target.down.tileBg.alpha = 0;
        target.heaven.tileBg.alpha = 0;
        target.banker.tileBg.alpha = 0;
      }

      target.tables.status.text = window.language.lobby.nowbetting;

      target.tables.timer.timer(data.bettingTime, data.totalTime)
    }
    function timerEndHandle(target) {
      target.tables.status.text = window.language.lobby.bettingend;
      target.tables.timer.visible = false;
      target.tables.bettingStart = false;
    }

    switch(data.gameName) {
      case "Baccarat" :
      if(!this.context.component_baccarat.baccarat_stage.length) return;
      for(var x = 0; x < this.context.component_baccarat.baccarat_stage.length; x++) {
        if(!this.context.component_baccarat.baccarat_stage[x].data) continue;
        if(this.context.component_baccarat.baccarat_stage[x].data.tableNumber == data.tableId) {
          if(!this.context.component_baccarat.baccarat_stage[x].tables.bettingStart) {
            timerStartHandle(this.context.component_baccarat.baccarat_stage[x]);
            this.context.component_baccarat.baccarat_stage[x].isUpdate = true;
            this.handleBaccaratUpdate(x, this)

          } // end of !betting start

          if(data.bettingTime <= 0) {
            timerEndHandle(this.context.component_baccarat.baccarat_stage[x])
            this.context.component_baccarat.baccarat_stage[x].isUpdate = true;
            this.handleBaccaratUpdate(x, this)
          }
        }
      }
      break;
      case "Dragon-Tiger" :
      if(!this.context.component_dragonTiger.dt_stage.length) return;
      for(var x = 0; x < this.context.component_dragonTiger.dt_stage.length; x++) {
        if(!this.context.component_dragonTiger.dt_stage[x].data) continue;
        if(this.context.component_dragonTiger.dt_stage[x].data.tableNumber == data.tableId) {
          if(!this.context.component_dragonTiger.dt_stage[x].tables.bettingStart) {
            timerStartHandle(this.context.component_dragonTiger.dt_stage[x]);
          } // end of !betting start
          if(data.bettingTime <= 0) {
            timerEndHandle(this.context.component_dragonTiger.dt_stage[x])
          }
        }
      }
      break;
      case "Sicbo" :
      if(toggle.getCurrentOpen().toLowerCase() === "userbased_sicbo") {
        if (this.context.component_userbased.game_stage.children.length > 0) {
          if(!this.context.component_userbased.game_stage.tables.bettingStart) {
            timerStartHandle(this.context.component_userbased.game_stage);
          }
          if(data.bettingTime <= 0) {
            timerEndHandle(this.context.component_userbased.game_stage);
          }
        }
      }

      if(!this.context.component_sicbo.sicbo_stage.length) return;
      for(var x = 0; x < this.context.component_sicbo.sicbo_stage.length; x++) {
        if(!this.context.component_sicbo.sicbo_stage[x].data) continue;
        if(this.context.component_sicbo.sicbo_stage[x].data.tableNumber == data.tableId) {
          if(!this.context.component_sicbo.sicbo_stage[x].tables.bettingStart) {
            timerStartHandle(this.context.component_sicbo.sicbo_stage[x]);
          } // end of !betting start
          if(data.bettingTime <= 0) {
            timerEndHandle(this.context.component_sicbo.sicbo_stage[x])
          }
        }
      }
      break;
      case "Poker" :
      if(!this.context.component_poker.poker_stage.length) return;
      for(var x = 0; x < this.context.component_poker.poker_stage.length; x++) {
        if(!this.context.component_poker.poker_stage[x].data) continue;
        if(this.context.component_poker.poker_stage[x].data.tableNumber == data.tableId) {
          if(!this.context.component_poker.poker_stage[x].tables.bettingStart) {
            timerStartHandle(this.context.component_poker.poker_stage[x]);
            switch(data.type) {
              case "flop" :
              this.context.component_poker.poker_stage[x].tables.status.text = window.language.poker.betflop;
              break;
              case "river" :
              this.context.component_poker.poker_stage[x].tables.status.text = window.language.poker.betriver;
              break;
              case "turn" :
              this.context.component_poker.poker_stage[x].tables.status.text = window.language.poker.betturn;
              break;
            }
          } // end of !betting start
          if(data.bettingTime <= 0) {
            timerEndHandle(this.context.component_poker.poker_stage[x])
          }
        }
      }
      break;
      case "Pai-Gow" :
      if(toggle.getCurrentOpen().toLowerCase() === "userbased_paigow") {
        if (this.context.component_userbased.game_stage.children.length > 0) {
          if(!this.context.component_userbased.game_stage.tables.bettingStart) {
            if(this.context.component_userbased.currentSelected === `pai-gow/${data.tableId}`) {
              timerStartHandle(this.context.component_userbased.game_stage);
            }
          }
          if(data.bettingTime <= 0) {
            if(this.context.component_userbased.currentSelected === `pai-gow/${data.tableId}`) {
              timerEndHandle(this.context.component_userbased.game_stage);
            }
          }
        }
      }

      if(!this.context.component_paigow.paigow_stage.length) return;
      for(var x = 0; x < this.context.component_paigow.paigow_stage.length; x++) {
        if(!this.context.component_paigow.paigow_stage[x].data) continue;
        if(this.context.component_paigow.paigow_stage[x].data.tableNumber == data.tableId) {
          if(!this.context.component_paigow.paigow_stage[x].tables.bettingStart) {
            timerStartHandle(this.context.component_paigow.paigow_stage[x]);
          } // end of !betting start
          if(data.bettingTime <= 0) {
            timerEndHandle(this.context.component_paigow.paigow_stage[x])
          }
        }
      }
      break;

    }

    if(data.bettingTime <= 0) {
      if(this.context.component_userbased.currentSelected) {
        if(data.gameName =="Baccarat" || data.gameName =="Dragon-Tiger"|| data.gameName =="Poker" || data.gameName =="Sicbo") {
          if(this.context.component_userbased.currentSelected == `${data.gameName}/${data.tableId}`) {
            this.context.component_userbased.gameStatus.text = window.language.lobby.bettingend;
          }
        }
      }
    } // end if
  },

  handleBaccaratUpdate(x, self) {
    setTimeout(() =>{
      self.context.component_baccarat.baccarat_stage[x].isUpdate = false;
    },400)
  },

  isInit: false,
  initTable (data) {
    if(this.isInit) return;
    this.isInit = true;
    window.dealerImg = [];
    // window.all_tables = data.data;

    console.log("initTable", data);

    let slaveTables = [];
    window.all_tables = _.filter(window.all_tables, (e) => { // === filtering data
      if (e.dealerId !== undefined) {
        this.dealer_id.push(e.dealerId)
      }
      if(e.gameName == 'Poker' && e.slave && e.slave){
        if(e.slave == 'bonusplus'){
          slaveTables.push(Object.assign({}, e));
          e.slave=null;
        }
      }

      if(e.gameName == 'Baccarat' && e.slave && e.slave) {
        if(Array.isArray(e.slave)) {
          _.each(e.slave,s=>{
            if(s=='bonus'){
              let objBonus = Object.assign({}, e);
              objBonus.slave = 'bonus';
              slaveTables.push(objBonus);
              e.slave=null;
            }
            if(s=='supersix'){
              let objSS = Object.assign({}, e);

              objSS.slave = 'supersix';
              slaveTables.push(objSS);
              e.slave=null;
            }
          });
        }
        if(e.slave == 'supersix'){
          let obj = Object.assign({}, e);
          obj.slave = 'supersix';
          slaveTables.push(obj);
          e.slave=null;
        }
      }
      if(e.gameName == "Baccarat" || e.gameName == "Dragon-Tiger" || e.gameName == "Poker"  || e.gameName == "Sicbo" || e.gameName == "Pai-Gow") {
        return e;
      }

      if(e.gameName == "Sicbo") {
        e.marks = _.filter (_.filter(e.marks,(m) => {
          if('game_info' in m) return m;
        }), (mark) => {
          if(mark.game_info) return mark
        });
      }
      //filtering emptyy obj
      e.marks =  _.filter(e.marks, (m) => {
        return !_.isEmpty(m);
      });
    });

    if(slaveTables.length){
      _.each(slaveTables,t=>{
        window.all_tables.push(t);
      });
    }

    all_tables = _.sortBy (all_tables, (row) => {
      return row.gameName
    });

    function handleImage (target) {
      if (target.length) {
        for (var i = 0; i < target.length; i++) {
          for (var j = 0; j < window.dealerImg.length; j++) {
            if(!target[i].data) continue;
            if (target[i].data.dealerId == window.dealerImg[j].id) {
              let dbImage = new Image();
              dbImage.src = window.dealerImg[j].dealer_image;
              target[i].tables.dealer_img.image = dbImage;
              ((_target, dbImage) => {
                $(dbImage).on('load', function() {
                  _target.update();
                })
              })(target[i], dbImage);
            } //end if
          } // end for
        }// end for
      } // end of if
    } //end of function

    // For blob dealer image
    $.post(`/getDealerImg`, {dealerId : this.dealer_id},  (response) => {
      window.dealerImg = response;
      handleImage(this.context.component_baccarat.baccarat_stage);
      handleImage(this.context.component_dragonTiger.dt_stage);
      handleImage(this.context.component_sicbo.sicbo_stage);
      handleImage(this.context.component_poker.poker_stage);
      handleImage(this.context.component_paigow.paigow_stage);
    });

    all_tables = _.sortBy(all_tables, ['gameName', byKey('tableNumber')]);

    let game = ["Poker/1", "Sicbo/1", "Baccarat/1","Dragon-Tiger/1"];

    // === Hot live games filter
    let tempTable1 = [];
    for (var i = 0; i < window.all_tables.length; i++) {
      if (window.all_tables[i].gameName === 'Baccarat' || window.all_tables[i].gameName === 'Poker') {
        for (var x = 0; x < window.all_tables[i].maintenanceSetting.maintenance.length; x++) {
          let mainTable = window.all_tables[i].maintenanceSetting.maintenance[x];

          if (parseInt(mainTable.info[0].status) === 0 && parseInt(mainTable.info[1].status) === 0 && mainTable.type === 'normal') {
            tempTable1.push(window.all_tables[i]);
          }
        }
      }
      else if (window.all_tables[i].gameName === 'Rooms:Sicbo') {
        continue;
      }
      else {
        if (parseInt(window.all_tables[i].maintenanceSetting[0].status) === 0 && parseInt(window.all_tables[i].maintenanceSetting[1].status) === 0) {
          tempTable1.push(window.all_tables[i]);
        }
      }
    }

    if (window.userAuthority === 'admin') {
      this.hotLiveGames = _.uniqBy(window.all_tables, (row) => { return row.gameName });
      this.hotLiveGames = _.filter(this.hotLiveGames, (row) => { return row.gameName !== 'Rooms:Sicbo' });
    }
    else {
      this.hotLiveGames = _.uniqBy(tempTable1, (row) => { return row.gameName });
      this.hotLiveGames = _.filter(this.hotLiveGames, (row) => { return row.gameName !== 'Rooms:Sicbo' });
    }
    // === Hot live games filter

    for(var x = 0; x < window.all_tables.length; x++) {
      if(window.all_tables[x].gameName == "Dragon-Tiger") {
        window.all_tables[x].marks = _.filter(window.all_tables[x].marks,(e)=>{
          return typeof e.mark == "string";
        });

        window.all_tables[x].marks = _.filter(window.all_tables[x].marks,(e)=>{
          if('mark' in e ) {
            return e;
          }
        });

        window.all_tables[x].marks = _.filter(window.all_tables[x].marks, (e) => {
          return e.mark !== undefined && e.mark !== "undefined"
        });
      }

      if(window.all_tables[x].gameName == "Sicbo") {
        window.all_tables[x].marks = _.filter (_.filter(window.all_tables[x].marks,(m) => {
          if('game_info' in m) return m;
        }), (mark) => {
          if(mark.game_info) return mark
        });
      }
    } // end for

    // Admin
    if (window.userAuthority === "admin") {
      for (var i = 0; i < window.all_tables.length; i++) {
        if (window.all_tables[i].gameName === 'Baccarat' || window.all_tables[i].gameName === 'Poker') {
          for (var x = 0; x < window.all_tables[i].maintenanceSetting.maintenance; x++) {
            if (parseInt(window.all_tables[i].maintenanceSetting.maintenance[x].info[0].status) === 1) {
              window.all_tables[i].maintenanceSetting.maintenance[x].info[0].status = 0;
            }

            if (parseInt(window.all_tables[i].maintenanceSetting.maintenance[x].info[1].status) === 1) {
              window.all_tables[i].maintenanceSetting.maintenance[x].info[1].status = 0;
            }
          }
        }
        else if (window.all_tables[i].gameName === 'Rooms:Sicbo') {
          continue;
        }
        else {
          if (parseInt(window.all_tables[i].maintenanceSetting.status) === 1) {
            window.all_tables[i].maintenanceSetting.status = 0;
          }

          if (parseInt(window.all_tables[i].maintenanceSetting.status) === 1) {
            window.all_tables[i].maintenanceSetting.status = 0;
          }
        }
      }
    }
    //filtering paigow in main
    this.hotLiveGames = _.filter(this.hotLiveGames, (e) => {
      return e.gameName != "Pai-Gow";
    });

    this.hotLiveGames.splice(3, 1);
    // this.context.component_landing.createHotGames(this.hotLiveGames);

    //== baccarat tables
    this.baccaratTables = _.filter(all_tables, (row) => { return row.gameName == "Baccarat" && (!row.slave || !row.slave.length) });
    this.baccaratSuper6Tables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'supersix' });
    this.baccaratBonusTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'bonus' });
    // DT tables
    this.dragontigerTables = _.filter(all_tables, function(row) { return row.gameName == "Dragon-Tiger"  });
    this.context.component_dragonTiger.main(this.dragontigerTables);

    //sicbo tables
    this.sicboTables = _.filter(all_tables, function(row) { return row.gameName == "Sicbo" });
    this.context.component_sicbo.main(this.sicboTables);

    //poker tables
    this.pokerTables = _.filter(all_tables, function(row) { return row.gameName == "Poker"  });
    this.context.component_poker.main(this.pokerTables);

    //paigow tables
    this.paigowTables = _.filter(all_tables, function(row) { return row.gameName == "Pai-Gow"  });
    this.context.component_paigow.main(this.paigowTables);


    let sicborooms = [];
    let paigowrooms = [];
    for (var key in sicbo_rooms) {
      sicborooms.push({'banker': window.sicbo_rooms[key], 'data': key.split(/[|:]/)})
    }

    for (var key in paigow_rooms) {
      paigowrooms.push({'banker': window.paigow_rooms[key], 'data': key.split(/[|:]/)})
    }

    this.roomTables = _.filter(sicborooms, function(row) { return row.data[2] == window.vendor_id  });
    this.paigow_roomTables = _.filter(paigowrooms, function(row) { return row.data[2] == window.vendor_id  });
    this.context.component_userbased.main(this.roomTables, this.sicboTables[0]);

    this.context.component_baccarat.main(this.baccaratTables, "normal");
    this.context.toggle.init();

  },

  setMaintenance (data) {
    for (var i = 0; i < window.all_tables.length; i++) {
      if (parseInt(window.all_tables[i].tableNumber) === parseInt(data.tableId) && window.all_tables[i].gameName === data.gameName) {
        if (data.gameName === 'Baccarat' || data.gameName === 'Poker') {
          for (var x = 0; x < window.all_tables[i].maintenanceSetting.maintenance.length; x++) {
            let maintenanceData = window.all_tables[i].maintenanceSetting.maintenance[x];

            if (maintenanceData.type === data.data.slave || data.data.slave === 'all') {
              for (var j = 0; j < maintenanceData.info.length; j++) {
                if (maintenanceData.info[j].division === data.data.division) {
                  maintenanceData.info[j] = data.data;
                }
              }
            }
            else if (maintenanceData.type === 'normal' && data.data.slave === 'flippy') {
              for (var j = 0; j < maintenanceData.info.length; j++) {
                if (maintenanceData.info[j].division === data.data.division) {
                  maintenanceData.info[j] = data.data;
                }
              }
            }
          }
        }
        else {
          for (var x = 0; x < window.all_tables[i].maintenanceSetting.length; x++) {
            if (window.all_tables[i].maintenanceSetting[x].division === data.data.division) {
              window.all_tables[i].maintenanceSetting[x] = data.data;
            }
          }
        }
      }
    }

    function byKey(key) {
      return function (o) {
        var v = parseInt(o[key], 10);
        return isNaN(v) ? o[key] : v;
      };
    }

    all_tables = _.sortBy(all_tables, ['gameName', byKey('tableNumber')]);

    // Admin
    if (window.userAuthority === "admin") {
      for (var i = 0; i < window.all_tables.length; i++) {
        if (window.all_tables[i].gameName === 'Baccarat' || window.all_tables[i].gameName === 'Poker') {
          for (var x = 0; x < window.all_tables[i].maintenanceSetting.maintenance; x++) {
            if (parseInt(window.all_tables[i].maintenanceSetting.maintenance[x].info[0].status) === 1) {
              window.all_tables[i].maintenanceSetting.maintenance[x].info[0].status = 0;
            }

            if (parseInt(window.all_tables[i].maintenanceSetting.maintenance[x].info[1].status) === 1) {
              window.all_tables[i].maintenanceSetting.maintenance[x].info[1].status = 0;
            }
          }
        }
        else {
          if (parseInt(window.all_tables[i].maintenanceSetting.status) === 1) {
            window.all_tables[i].maintenanceSetting.status = 0;
          }

          if (parseInt(window.all_tables[i].maintenanceSetting.status) === 1) {
            window.all_tables[i].maintenanceSetting.status = 0;
          }
        }
      }
    }

    //== baccarat tables
    this.baccaratTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && (!row.slave || !row.slave.length) });
    this.baccaratSuper6Tables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'supersix' });
    this.baccaratBonusTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'bonus' });

    if(data.data.status) {
      let tempTable1 = [];
      for (var i = 0; i < window.all_tables.length; i++) {
        if (window.all_tables[i].gameName === 'Baccarat' || window.all_tables[i].gameName === 'Poker') {
          for (var x = 0; x < window.all_tables[i].maintenanceSetting.maintenance.length; x++) {
            let mainTable = window.all_tables[i].maintenanceSetting.maintenance[x];

            if (parseInt(mainTable.info[0].status) === 0 && parseInt(mainTable.info[1].status) === 0 && mainTable.type === 'normal') {
              tempTable1.push(window.all_tables[i]);
            }
          }
        }
        else if (window.all_tables[i].gameName === 'Rooms:Sicbo') {
          continue;
        }
        else {
          if (parseInt(window.all_tables[i].maintenanceSetting[0].status) === 0 && parseInt(window.all_tables[i].maintenanceSetting[1].status) === 0) {
            tempTable1.push(window.all_tables[i]);
          }
        }
      }

      if (window.userAuthority === 'admin') {
        this.hotLiveGames = _.uniqBy(window.all_tables, (row) => { return row.gameName });
        this.hotLiveGames = _.filter(this.hotLiveGames, (row) => { return row.gameName !== 'Rooms:Sicbo' });
      }
      else {
        this.hotLiveGames = _.uniqBy(tempTable1, (row) => { return row.gameName });
        this.hotLiveGames = _.filter(this.hotLiveGames, (row) => { return row.gameName !== 'Rooms:Sicbo' });
      }

      this.hotLiveGames.splice(3, 1);
      this.hotLiveGames = _.filter((e) => {return e.gameName != 'Pai-Gow'});

      // this.context.component_landing.createHotGames(this.hotLiveGames);
    }

    this.context.component_baccarat.baccarat_stage.forEach((e, x)=>{
      if(e.game_name != data.gameName || e.table_number != data.tableId) {
        return;
      }

      if (data.gameName == 'Baccarat') {
        this.context.component_baccarat.setMaintenance(data, x);
      }
    });


    this.context.component_sicbo.sicbo_stage.forEach((e, x)=>{
      if(e.game_name != data.gameName || e.table_number != data.tableId) {
        return;
      }

      if (data.gameName == 'Sicbo') {
        this.context.component_sicbo.setMaintenance(data, x);
      }
    });

    this.context.component_poker.poker_stage.forEach((e, x)=>{
      if(e.game_name != data.gameName || e.table_number != data.tableId) {
        return;
      }

      if (data.gameName == 'Poker') {
        this.context.component_poker.setMaintenance(data, x);
      }
    });

    this.context.component_dragonTiger.dt_stage.forEach((e, x)=>{
      if(e.game_name != data.gameName || e.table_number != data.tableId) {
        return;
      }

      if (data.gameName == 'Dragon-Tiger') {
        this.context.component_dragonTiger.setMaintenance(data, x);
      }
    });

    this.context.component_paigow.paigow_stage.forEach((e, x)=>{
      console.log(e, "sud sha here")
      if(e.game_name != data.gameName || e.table_number != data.tableId) {
        return;
      }

      if (data.gameName == 'Pai-Gow') {
        this.context.component_paigow.setMaintenance(data, x);
      }
    });

    toggle.toggleRefresh();

    if(this.context.component_userbased.currentSelected === `${data.gameName}/${data.tableId}`) {
      this.context.component_userbased.game_stage.removeAllChildren()
    }
  },

  setDealer (data) {
    window.all_tables.forEach((e, x)=>{
      if(e.gameName == data.gameName && parseInt(e.tableNumber) == parseInt(data.tableId)) {
        e.dealerId = data.dealerId;
        e.currentDealer = data.dealerName;
      }
    });

    // For blob dealer image
    $.post(`/getChangeDealerImg`, {dealerId : data.dealerId}, (response) => {
      window.dealerImg.push(response[0]);

      let gameUpdated = data.gameName.toLowerCase() === 'pai-gow' ? 'paigow' : data.gameName.toLowerCase();
      let stage = data.gameName.toLowerCase();

      if(stage == 'dragon-tiger') {
        stage = 'dt';
      }
      if(stage == 'pai-gow') {
        stage = 'paigow';
      }

      gameUpdated = gameUpdated == "dragon-tiger" ? "dragonTiger" : gameUpdated;
      if(this.context.finishedLoad) {
        if(this.context["component_"+gameUpdated][stage+"_stage"].length) {
          this.context["component_"+gameUpdated][stage+"_stage"].forEach((e, x) => {
            if(!e.children[0]) return;

            if(e.data.gameName != data.gameName || parseInt(e.data.tableNumber) != parseInt(data.tableId)) {
              return;
            }

            let dbImage = new Image();
            dbImage.src = response[0].dealer_image;
            e.children[0].dealer_img.image = dbImage;
            e.children[0].dealer_name.text = data.dealerName;
            e.children[0].dealer_id = response[0].id;

            if(data.gameName == "Baccarat") {
              e.isUpdate = true;
              this.handleBaccaratUpdate(x, this)
            }
          });
        }
      }

    });
  },

  setResult (data) {
    if(data.gameName === 'Pai-Gow') console.log(data, "result data")
    all_tables.forEach((e,x) => {
      switch(`${e.gameName} ${data.gameName} ${data.tableId}` ) {
        case "Sicbo Sicbo "+e.tableNumber :
          e.marks.shift();
          e.marks.push(data.mark);
          break;
        case "Baccarat Baccarat "+e.tableNumber :
          e.roundStatus = 'R';
          if(parseInt(data.tableId) != parseInt(e.tableNumber)) return;

          if (e.slave == 'supersix' || e.slave == 'bonus') {
            for (var i = 0; i < all_tables.length; i++) {
              if (parseInt(data.tableId) == parseInt(all_tables[i].tableNumber)) {
                if (e.slave == 'bonus' && !all_tables[i].slave) {
                  e.marks = all_tables[i].marks;
                  return;
                }
                else if (e.slave == 'supersix' && !all_tables[i].slave) {
                  e.marks = all_tables[i].marks;
                  return;
                }
              }
            }
          }

          e.marks.push(data.mark);
          break;
        case "dragontiger dragontiger "+e.tableNumber :
        case "Dragon-Tiger Dragon-Tiger "+e.tableNumber :
          if('mark' in data.mark && data.mark.mark !== "undefined" && data.mark.mark !== undefined) {
            e.marks.push(data.mark);
          }
          break;
          case "Poker Poker "+e.tableNumber :
          e.meta = data.meta;

          if (e.slave == 'bonusplus') {
            for (var i = 0; i < all_tables.length; i++) {
              if (`${data.gameName}${data.tableId}` === `${all_tables[i].gameName}${all_tables[i].tableNumber}`) {
                if (e.slave == 'bonusplus' && !all_tables[i].slave) {
                  e.marks = all_tables[i].marks;
                  return;
                }
              }
            }
          }

          e.marks.push(data.mark);
          break;
          case "Pai-Gow Pai-Gow "+e.tableNumber :
          data.mark.game_result = data.gameResult;
          e.gameResult = data.gameResult;
          e.roundStatus = 'R';
          //set count
          if(data.mark.game_info.setCount == 5) {
            e.marks = [];
          }

          data.mark.game_info = {tiles : data.gameInfo.tiles};
          data.mark.game_info.setCount = data.gameInfo.setCount;
          data.mark.game_result = data.gameResult;

          // if(e.marks.length && e.marks[0].game_info.setCount) {
          //   let lastCount = parseInt(e.marks[0].game_info.setCount);
          //   if(lastCount < 5)
          //   {
          //     data.mark.game_info.setCount = lastCount+1;
          //   }
          // }

          // e.marks.shift();
          e.marks.push(data.mark);
          break;
      } // end switch
    });

    if(!this.context.finishedLoad) return

    /** updating landing roadmarks */
    for(var x = 0; x < this.hotLiveGames.length; x++) {
      if(`${data.gameName}/${data.tableId}` == this.hotLiveGames[x].namespace) {
        // this.context.component_landing.makeRoadmap(this.hotLiveGames[x], this.context.component_landing.hotGames[x])
      } // end if
    } // end for

    this.baccaratTables = _.filter(all_tables, (row) => { return row.gameName == "Baccarat" && (!row.slave || !row.slave.length) });
    this.baccaratSuper6Tables = _.filter(all_tables, (row) => { return row.gameName == "Baccarat" && row.slave == 'supersix' });
    this.baccaratBonusTables = _.filter(all_tables, (row) => { return row.gameName == "Baccarat" && row.slave == 'bonus' });

    this.baccaratTables = this.context.toggle.sortData(this.baccaratTables, "normal");
    this.baccaratSuper6Tables = this.context.toggle.sortData(this.baccaratSuper6Tables, "supersix");
    this.baccaratBonusTables = this.context.toggle.sortData(this.baccaratBonusTables, "bonus");

    this.dragontigerTables = _.filter(all_tables, function(row) { return row.gameName == "Dragon-Tiger"  });
    this.sicboTables = _.filter(all_tables, function(row) { return row.gameName == "Sicbo" });
    this.pokerTables = _.filter(all_tables, function(row) { return row.gameName == "Poker"  });
    this.paigowTables = _.filter(all_tables, function(row) { return row.gameName == "Pai-Gow"  });

    this.baccaratTables = this.context.toggle.sortData(this.baccaratTables, "normal")

    switch (data.gameName) {
      case "Baccarat" :
      if(this.context.toggle.getCurrentOpen()=='baccarat_supersix') {
        this.context.component_baccarat.setResult(this.baccaratSuper6Tables, data.gameName, data.tableId);
      } else if(this.context.toggle.getCurrentOpen()=='baccarat_dragonbonus') {
        this.context.component_baccarat.setResult(this.baccaratBonusTables, data.gameName, data.tableId);
      } else {
        this.context.component_baccarat.setResult(this.baccaratTables, data.gameName, data.tableId);
      }
      break;
      case "Dragon-Tiger" :
      this.context.component_dragonTiger.setResult(this.dragontigerTables, data.gameName, data.tableId);
      break;
      case "Sicbo" :
      this.context.component_sicbo.setResult(this.sicboTables, data.gameName, data.tableId);
      this.context.component_userbased.setResultGameTable(this.sicboTables[0], data.gameName);
      break;
      case "Poker" :
      this.context.component_poker.setResult(this.pokerTables, data.gameName, data.tableId);
      break;
      case "Pai-Gow" :
      this.context.component_paigow.setResult(this.paigowTables, data.gameName, data.tableId);
      this.context.component_userbased.setResultGameTable(this.paigowTables[1], data.gameName);
      break;
    }
  }, // end of set result

  setCreateRoom (data) {
    console.log("setCreateRoom", data)
    let bankerdata = {
      avatar: data.data.avatar,
      banker: data.data.banker,
      money: data.data.money,
      password: data.data.password,
      users: parseInt(data.data.users)
    };

    let game = data.data.id.split("|")[2];
    let rooms = this.roomTables;
    var type = 'Sicbo';
    var gameTables = this.sicboTables[0];

    if(game.toLowerCase() == 'pai-gow' || game.toLowerCase() == 'paigow') {
      rooms = this.paigow_roomTables;
      gameTables = this.paigowTables[1];
      type = 'paigow';
    }

    rooms.unshift({'banker': bankerdata, 'data': data.data.id.split(/[|:]/)});

    if(toggle.getCurrentOpen().toLowerCase().indexOf(type.toLowerCase()) > -1) {
      this.context.component_userbased.createRoomTables(rooms, gameTables);
    }

    for (var i = 0; i < this.roomTables.length; i++) {
      if (parseInt(this.roomTables[i].banker.banker.user_id) == parseInt(window.userId)) {
        window.isBanker = true;
        break;
      }
    }
  }, //setCreateRoom

  setRemoveRoom (data) {
    console.log("setRemoveRoom", data)
    let removedata = data.data.roomId.split(/[|:]/);
    let count = 0;

    //temp
    let rooms = this.roomTables;
    let gameName = data.gameName;
    var gameTables = this.sicboTables[0];
    var gamename_param = 'Sicbo';
    var type = 'Sicbo';

    if(gameName.toLowerCase() === 'pai-gow') {
      gameTables = this.paigowTables[1];
      rooms = this.paigow_roomTables;
      gamename_param = 'Paigow';
      type = 'Paigow';
    }

    rooms.forEach((row)=>{
      if(row.data[8] == removedata[8]) {
        rooms.splice(count, 1);
          if(toggle.getCurrentOpen().toLowerCase().indexOf(type.toLowerCase()) > -1) {
            this.context.component_userbased.createRoomTables(rooms, gameTables);
          }
      }

      count++;
    });
  }, //setRemoveRoom

  setUserCount(data) {
    console.log("setUserCount", data)
    //temp
    let rooms = this.roomTables;
    let gameName = data.gameName;
    var gameTables = this.sicboTables[0];
    var gamename_param = 'Sicbo';
    var type = 'Sicbo';

    if(gameName.toLowerCase() === 'pai-gow') {
      gameTables = this.paigowTables[1];
      rooms = this.paigow_roomTables;
      gamename_param = 'Paigow';
      type = 'Paigow';
    }

    rooms.forEach((row)=>{
      if(row.data[8] == data.roomId) {
        row.banker.users = parseInt(data.userCount);
        if(toggle.getCurrentOpen().toLowerCase().indexOf(type.toLowerCase()) > -1) {
          this.context.component_userbased.createRoomTables(rooms, gameTables);
        }
      }
    });
  }, //setUserCount

  setUserLeave(data) {
    console.log("setUserLeave", data);
    if(data.data.id.indexOf(':Auto:') > -1 ) return;

    let game = data.data.id.split("|")[2];
    let rooms = this.roomTables;
    let gameTables = this.sicboTables[0];
    let type = 'Sicbo';

    if(game.toLowerCase() == 'paigow' || game.toLowerCase() == 'pai-gow') {
      rooms = this.paigow_roomTables;
      gameTables = this.paigowTables[1];
      type = 'Paigow';
    }
    // console.log("setUserLeave", data);
    rooms.forEach((row)=>{
      if(row.data[8] == data.data.roomId) {
        row.banker.users--;
        if(toggle.getCurrentOpen().toLowerCase().indexOf(type.toLowerCase()) > -1) {
          this.context.component_userbased.createRoomTables(rooms, gameTables);
        }
      }
    });
  }, //setUserCount

  setBankerMoney (data) {
    let gameName =  data.gameName;
    var gameTables = this.sicboTables[0];
    let rooms = this.roomTables;
    var type = 'Sicbo';

    if(gameName.toLowerCase() === 'pai-gow') {
      gameTables = this.paigowTables[1];
      rooms = this.paigow_roomTables;
      type = 'Paigow';
    }

    rooms.forEach((row)=>{
      if(row.data[5] == data.data.token) {
        row.banker.money = data.data.money;
        if(toggle.getCurrentOpen().toLowerCase().indexOf(type.toLowerCase()) > -1) {
          this.context.component_userbased.createRoomTables(rooms, gameTables);
        }
      }
    });

  }, //setBankerMoney

  setIsPublic (data) {
    console.log("setIsPublic", data)

    let game = data.data.id.split("|")[2];

    let rooms = this.roomTables;
    let gameTables = this.sicboTables[0];
    var type = 'Sicbo';

    if(game.toLowerCase() == 'paigow' || game.toLowerCase() == 'pai-gow') {
      rooms = this.paigow_roomTables;
      gameTables = this.paigowTables[1];
      type = 'Paigow';
    }

    rooms.forEach((row)=>{
      if(row.data[8] == data.data.roomId) {
        row.banker.password = data.data.isPublic == true ? '' : 'true';
        if(toggle.getCurrentOpen().toLowerCase().indexOf(type.toLowerCase()) > -1) {
          this.context.component_userbased.createRoomTables(rooms, gameTables);
        }
      }
    });
  }, //setBankerMoney
}

instance.main();

let checker = ()=>{
  let c = setInterval(()=>{
    if(instance.context.finishedLoad) {
      clearInterval(c);
      if(!initData || instance.isInit) return;
      instance.initTable(initData);
      if (initData.data[0].mainNotice && parseInt(initData.data[0].mainNotice.status)) {
        instance.context.setNotice(initData.data[0].mainNotice);
      }
    }
  }, 500)
}

checker();

if(parseInt(JSON.parse(window.maintenance).status)) {
  if(window.userAuthority != "admin") {
    $(".maintenanceOverlay").show();
  }
  instance.setMainMaintenance(typeof window.maintenance === 'string' ? JSON.parse(window.maintenance) : window.maintenance)
}

export default {
  instance
}
