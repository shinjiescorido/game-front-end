import Xpacket from '../lib/XPacket';
import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';

window.all_tables = [];

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
  socket : io.connect(window.socket+'all', { transports: ['websocket']}),
  main () {

    this.socket.on('connect', (e) => {
      this.socket.emit('register', {id: window.userId});
    });

    this.socket.on('disconnect', (e) => {
      this.isInit = false;
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

          console.log('init: ', initData);
          window.isBanker = false;
          window.isPaigowBanker = false;

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
                $('#reelgames, .game--reelgames, .game__con, .hot--reel').addClass('not-allowed');
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

          if(!this.context.finishedLoad) return
          this.initTable(data_res)
          this.context.toggle.toggleRefresh();
          if (data_res.data[0].mainNotice && parseInt(data_res.data[0].mainNotice.status)) {
            this.context.setNotice(data_res.data[0].mainNotice);
          }
          break;
        case ("displayresult") :
        case ("displayresults") :
          this.setResult(data_res);
          // console.log("displayresults");
          break;
        case "maintenanceChange" :
          this.setMaintenance(data_res);
          break;
        case ("setbettingtime") :
          if(!this.context.finishedLoad) return
          this.setTimer(data_res);
          // console.log("setbettingtime");
          break;
        case("inputitem") :
          this.setCardSwipe(data_res);
          // console.log("inputitem");
          break;
        case ("newround") :
          this.setNewRound(data_res);
          // console.log("newround");
          break;
        case "shoechange" :
          this.shoechange(data_res)
          // console.log("shoechange");
          break;
        case ("dealerchange") :
          this.setDealer(data_res);
          // console.log("dealerchange");
          break;
        case ("updatecredits") :
          if(!this.context.finishedLoad) return
          this.updateCredits(data_res);
          // console.log("updatecredits");
          break;
        case ("displaymodify") :
          this.displaymodify(data_res)
          // console.log("displaymodify");
          break;
        case ("mainnoticechange") :
          this.context.setNotice(data_res.data);
          // if(!this.context.finishedLoad) return
          break;
        case ("mainmaintenancechange") :
          // if(!this.context.finishedLoad) return
          this.setMainMaintenance(data_res.data);
          break;
          case ("bets") :
          this.setRoomInfo(data_res);
          // console.log("bets");
          break;
        case ("displayRollback") :
          this.setVoid(data_res);
          this.context.toggle.toggleRefresh();
          // console.log("displayRollback");
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
        case ("lobby_update_room") : //same as create split (|)
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

      if(this.context.component_paigow.stage_list.length) {
        this.context.component_paigow.stage_list.forEach((e, x)=>{
          if (!e.data) return;
          if(e.data.gameName != data.gameName || e.data.tableNumber != data.tableId) return;
          this.context.component_paigow.removeItem(data, x);
        });
      }
    } //end of if paigow

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
        if (!this.context.component_baccarat.stage_list[0].data) return;

        if (this.context.component_baccarat.stage_list[0].data) {
          this.context.component_baccarat.stage_list.forEach((e, x)=>{
            if(e.data.gameName != data.gameName || e.data.tableNumber != data.tableId) return;
            this.context.component_baccarat.setRoomInfo(data, x);
            this.context.component_baccarat.stage_list[x].isUpdate = true;
            this.handleBaccaratUpdate(x, this)
          });
        }
        else {
          if(!this.context.component_baccarat.stage_thumb.length) return;
          this.context.component_baccarat.stage_thumb.forEach((e, x)=>{
            if (!e.data) return;
            if (e.data.gameName != data.gameName || e.data.tableNumber != data.tableId) return;
            this.context.component_baccarat.setRoomInfo(data, x);
          });
        }
        break;

      case 'Dragon-Tiger':
        if (!this.context.component_dragonTiger.stage_list[0].data) return;

        if (this.context.component_dragonTiger.stage_list[0].data) {
          this.context.component_dragonTiger.stage_list.forEach((e, x)=>{
            if (!e.data) return;
            if(e.data.gameName != data.gameName || e.data.tableNumber != data.tableId) return;
            this.context.component_dragonTiger.setRoomInfo(data, x);
          });
        }
        break;

      case 'Sicbo':
        if (!this.context.component_sicbo.stage_list[0].data) return;

        if (this.context.component_sicbo.stage_list[0].data) {
          this.context.component_sicbo.stage_list.forEach((e, x)=>{
            if (!e.data) return;
            if(e.data.gameName != data.gameName || e.data.tableNumber != data.tableId) return;
            this.context.component_sicbo.setRoomInfo(data, x);
          });
        }
        break;

      case 'Pai-Gow':
        if (!this.context.component_paigow.stage_list[0].data) return;

        if (this.context.component_paigow.stage_list[0].data) {
          this.context.component_paigow.stage_list.forEach((e, x)=>{
            if (!e.data) return;
            if(e.data.gameName != data.gameName || e.data.tableNumber != data.tableId) return;
            this.context.component_paigow.setRoomInfo(data, x);
          });
        }
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
    console.log("display modify", data);
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

    if(!this.context.finishedLoad) return

    // bc
    this.baccaratTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && (!row.slave || !row.slave.length) });
    this.baccaratSuper6Tables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'supersix' });
    this.baccaratBonusTables = _.filter(all_tables, function(row) { return row.gameName == "Baccarat" && row.slave == 'bonus' });
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
      break;
      case 'Poker':
      this.context.component_poker.setResult(this.pokerTables, data.gameName, data.tableId);
      break;
      case "Pai-Gow" :
      this.context.component_paigow.setResult(this.paigowTables, data.gameName, data.tableId);
      break;
    }
    // == affects banner also when selected
    if(this.context.component_banner.currentSelected && this.context.component_banner.currentSelected === `${data.gameName}/${data.tableId}`) {
      this.context.component_banner.bannerTableShow(_.find(all_tables, (e)=>{ return e.namespace === `${data.gameName}/${data.tableId}`}));
    }

    if(toggle.getCurrentOpen().toLowerCase() === "userbased_sicbo") {
      this.context.component_banner.bannerUserBased(this.sicboTables[0], 'Sicbo', this.roomTables);
    }

    if(toggle.getCurrentOpen().toLowerCase() === "userbased_paigow") {
      this.context.component_banner.bannerUserBased(this.paigowTables[1], 'Paigow', this.paigow_roomTables);
    }
  },
  updateCredits (data) {
    let user_money = 0;

    let currency = "";
    if(window.currencyAbbrev == "USD" || window.currencyAbbrev == "JPY") {
      currency = "$"
    } else if(window.currencyAbbrev == "KRW"){
      currency = "₩"
    } else if(window.currencyAbbrev == "CNY"){
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
      $(".userinfo-dtl__holdings").html(this.context.component_notification.numberWithCommas(currency + money))

    } else {
      $.post('/getUserMoney', (response) => {
        if(response) {
          let money2 = (window.casino == 'SS') ? parseFloat(response).toFixed(2) : parseInt(response);

          $(".userinfo-dtl__holdings").html(this.context.component_notification.numberWithCommas(currency + money2))

          if($(".userinfo-dtl__holdings").html().length > 10) {
            $(".userinfo-dtl__holdings").wrap("<div class='marquee'>")
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

      this.context.component_notification.animatePopup(`${gameText} #${data.tableId}`, parseInt(data.payload.credits.total_winning));
    }
  },
  setMaintenance (data) {
    for (var i = 0; i < window.all_tables.length; i++) {

      if (window.all_tables[i].tableNumber === data.tableId && window.all_tables[i].gameName === data.gameName) {
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

    if(!this.context.finishedLoad) return

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
        else {
          if (parseInt(window.all_tables[i].maintenanceSetting[0].status) === 0 && parseInt(window.all_tables[i].maintenanceSetting[1].status) === 0) {
            tempTable1.push(window.all_tables[i]);
          }
        }
      }

      if (window.userAuthority === 'admin') {
        this.hotLiveGames = _.uniqBy(window.all_tables, (row) => { return row.gameName });
      }
      else {
        this.hotLiveGames = _.uniqBy(tempTable1, (row) => { return row.gameName });
      }

      this.hotLiveGames = _.filter((e) => {return e.gameName != 'Pai-Gow'});

      // this.context.component_landing.createHotGames(this.hotLiveGames);
    }

    this.context.component_baccarat.stage_list.forEach((e, x)=>{
      if(e.game_name != data.gameName || e.table_number != data.tableId) {
        return;
      }

      if (data.gameName == 'Baccarat') {
        this.context.component_baccarat.setMaintenance(data, x);
      }
    });

    this.context.component_baccarat.stage_thumb.forEach((e, x)=>{
      if(e.thumb_tables)
      {
        if(e.thumb_tables.game_name != data.gameName || e.thumb_tables.table_number != data.tableId) {
          return;
        }

        if (data.gameName == 'Baccarat') {
          this.context.component_baccarat.setMaintenance(data, x);
        }
      }
    });


    this.context.component_sicbo.stage_list.forEach((e, x)=>{
      if(e.game_name != data.gameName || e.table_number != data.tableId) {
        return;
      }

      if (data.gameName == 'Sicbo') {
        this.context.component_sicbo.setMaintenance(data, x);
      }
    });

    this.context.component_poker.stage_list.forEach((e, x)=>{
      if(e.game_name != data.gameName || e.table_number != data.tableId) {
        return;
      }

      if (data.gameName == 'Poker') {
        this.context.component_poker.setMaintenance(data, x);
      }
    });

    this.context.component_dragonTiger.stage_list.forEach((e, x)=>{
      if(e.game_name != data.gameName || e.table_number != data.tableId) {
        return;
      }

      if (data.gameName == 'Dragon-Tiger') {
        this.context.component_dragonTiger.setMaintenance(data, x);
      }
    });

    this.context.component_paigow.stage_list.forEach((e, x)=>{
      if(e.game_name != data.gameName || e.table_number != data.tableId) {
        return;
      }

      if (data.gameName == 'Pai-Gow') {
        this.context.component_paigow.setMaintenance(data, x);
      }
    });

    toggle.toggleRefresh();
    //hiding banner selected if maintenance
    if(this.context.component_banner.currentSelected === `${data.gameName}/${data.tableId}`) {
      this.context.component_banner.banner_container.visible = true;
      this.context.component_banner.table_banner_container.removeAllChildren()
      this.context.component_banner.userBased_banner_container.removeAllChildren()
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

      let gameUpdated = data.gameName.toLowerCase();

      gameUpdated = gameUpdated == "dragon-tiger" ? "dragonTiger" : gameUpdated =='pai-gow' ? 'paigow' : gameUpdated;

      if(this.context.finishedLoad) {

        if(this.context["component_"+gameUpdated].stage_list.length) {
          this.context["component_"+gameUpdated].stage_list.forEach((e, x) => {
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

        if(this.context["component_"+gameUpdated].stage_thumb.length) {
          this.context["component_"+gameUpdated].stage_thumb.forEach((e, x) => {
            if(!e.children[0]) return;

            if(e.data.gameName != data.gameName || parseInt(e.data.tableNumber) != parseInt(data.tableId)) {
              return;
            }

            let dbImage = new Image();
            dbImage.src = response[0].dealer_image;
            e.children[0].dealer_img.image = dbImage;
            e.children[0].dealer_name.text = data.dealerName;
            e.children[0].dealer_id = response[0].id;
          });
        }
      } // end

    });
  },
  shoechange (data) {
    for(var x = 0; x < all_tables.length; x++) {
      if(all_tables[x].gameName == data.gameName && all_tables[x].tableNumber == data.tableId) {
        all_tables[x].marks = [];
        if(all_tables[x].gameName == "Baccarat") {
          all_tables[x].gameInfo = {
            'banker1' : null,
            'banker2' : null,
            'banker3' : null,
            'player1' : null,
            'player2' : null,
            'player3' : null,
          };
        }
        if(all_tables[x].gameName == "Dragon-Tiger") {
          all_tables[x].gameInfo = {
            'burn' : null,
            'dragon' : null,
            'tiger' : null
          };
        }
      }
    }

    window.all_tables.forEach((row)=>{
      if(row.tableNumber == data.tableId && row.gameName == data.gameName) {
        row.marks = [];
        row.is_shoeChange = true;
      }
    });

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
    // DT
    this.dragontigerTables = _.filter(all_tables, function(row) { return row.gameName == "Dragon-Tiger"});
    this.context.component_dragonTiger.setResult(this.dragontigerTables, data.gameName, data.tableId);

    // this.context.component_landing.createHotGames(this.hotLiveGames);
    switch(data.gameName) {
      case "Baccarat" :
      for(var x = 0; x < this.context.component_baccarat.stage_list.length; x++) {
        if(!this.context.component_baccarat.stage_list[x].children.length) continue;
        if(this.context.component_baccarat.stage_list[x].data.namespace === `${data.gameName}/${data.tableId}`) {
          this.context.component_baccarat.stage_list[x].list_tables.status.text = window.language.prompts.promptshuffling;
          this.context.component_baccarat.stage_list[x].isUpdate = true;
          this.context.component_baccarat.stage_list[x].list_tables.card_result_container.removeAllChildren();
        }
        this.handleBaccaratUpdate(x, this)
      }

      for(var x = 0; x < this.context.component_baccarat.stage_thumb.length; x++) {
        if(!this.context.component_baccarat.stage_thumb[x].children.length) continue;
        if(this.context.component_baccarat.stage_thumb[x].data.namespace === `${data.gameName}/${data.tableId}`) {
          this.context.component_baccarat.stage_thumb[x].thumb_tables.status.text = window.language.prompts.promptshuffling;
        }
      }
      break;
      case "Dragon-Tiger" :
      for(var x = 0; x < this.context.component_dragonTiger.stage_list.length; x++) {
        if(!this.context.component_dragonTiger.stage_list[x].children.length) continue;
        if(this.context.component_dragonTiger.stage_list[x].data.namespace === `${data.gameName}/${data.tableId}`) {
          this.context.component_dragonTiger.stage_list[x].list_tables.status.text = window.language.prompts.promptshuffling;
          this.context.component_dragonTiger.stage_list[x].list_tables.card_result_container.removeAllChildren();
        }
      }
      break;
    }

    // == affects banner also when selected
    if(this.context.component_banner.currentSelected) {

      if(this.context.component_banner.currentSelected === `${data.gameName}/${data.tableId}`) {
        this.context.component_banner.bannerTableShow(_.find(all_tables, (e)=>{ return e.namespace === `${data.gameName}/${data.tableId}`}));
      }

      // if(this.context.component_banner.currentSelected === `Sicbo/${data.tableId}`) {
      //   this.context.component_banner.bannerUserBased(_.find(all_tables, (e)=>{ return e.namespace === `${data.gameName}/${data.tableId}`}));
      // }

    }

  },
  handleBaccaratUpdate(x, self) {
    setTimeout(() =>{
      self.context.component_baccarat.stage_list[x].isUpdate = false;
    },400)
  },
  isInit : false,
  initTable (data) {
    if(this.isInit) return;
    this.isInit = true;
    window.dealerImg = [];
    // window.all_tables = data.data;

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

    function handleImage (target, disp = 'list') {
      if (target.length) {
        for (var i = 0; i < target.length; i++) {
          for (var j = 0; j < window.dealerImg.length; j++) {
            if(!target[i].data) continue;
            if (target[i].data.dealerId == window.dealerImg[j].id) {
              let dbImage = new Image();
              dbImage.src = window.dealerImg[j].dealer_image;
              if(disp == 'thumbnail') {
                target[i].thumb_tables.dealer_img.image = dbImage;
                target[i].update();
              } else {
                target[i].list_tables.dealer_img.image = dbImage;
                target[i].update();
              } //end list

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
      handleImage(this.context.component_baccarat.stage_thumb, "thumbnail") //thumbnail;
      handleImage(this.context.component_baccarat.stage_list) //thumbnail;
      handleImage(this.context.component_dragonTiger.stage_list);
      handleImage(this.context.component_sicbo.stage_list);
      handleImage(this.context.component_poker.stage_list);
      handleImage(this.context.component_paigow.stage_list);
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
    this.hotLiveGames = _.filter(this.hotLiveGames, (e) => {
      return e.gameName != "Pai-Gow";
    });

    // this.context.component_landing.createHotGames(this.hotLiveGames);
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

    // ==hot games for dom
    let h_games_clone = _.clone(this.hotLiveGames);
    let tempArr = [];

    for (var i = 0; i < h_games_clone.length; i++) {
      switch (h_games_clone[i].gameName) {
        case "Dragon-Tiger" :
          tempArr[0] = h_games_clone[i];
          break;

        case "Sicbo" :
          tempArr[1] = h_games_clone[i];
          break;

        case "Poker" :
          tempArr[2] = h_games_clone[i];
          break;

        case "Baccarat" :
          tempArr[3] = h_games_clone[i];
          break;
      }
    }

    tempArr = _.reject(tempArr, _.isEmpty);
    h_games_clone = tempArr;

   //  h_games_clone.push({
   //    gameName : "kagaming"
   // })

   //  h_games_clone.push({
   //      gameName : "betsoft"
   //  })

    var children = $(".hotgame-wrap").children();

    for(var x = 0; x < children.length; x++) {
      if(!$(children[x]).hasClass('hot--reel')) $(children[x]).remove()
    }
    
    for(var x = 0; x < h_games_clone.length; x++) {
      let image = "";
      let text = "";
      let data = "";
      let reelaccess = "";
      let comingsoon = "";
      if(h_games_clone[x].gameName == "Baccarat") {
        image = "/img/sidebar/hotgames/baccarat-hotgame.png";
        text = window.language.lobby.baccaratcaps;
        data = "sub_baccarat"
      }
      if(h_games_clone[x].gameName == "Dragon-Tiger") {
        image = "/img/sidebar/hotgames/dragontiger-hotgame.png"
        text = window.language.lobby.dragontigercaps;
        data = "sub_dragonTiger"
      }
      if(h_games_clone[x].gameName == "Poker") {
        image = "/img/sidebar/hotgames/poker-hotgame.png"
        text = window.language.lobby.texascaps;
        data = "sub_poker"
      }
      if(h_games_clone[x].gameName == "Sicbo") {
        image = "/img/sidebar/hotgames/sicbo-hotgame.png"
        text = window.language.lobby.sicbocaps;
        data = "sub_sicbo"
      }

      if(h_games_clone[x].gameName == 'betsoft') {
        if(window.language.locale == "zh") {
            image = "/img/sidebar/hotgames/betsoft-hotgame-zh.png"
        } else {
            image = "/img/sidebar/hotgames/betsoft-hotgame.png"
        }

        text = window.language.lobby.betsoftreelcaps;
        data = "";
        comingsoon = "soon";
      }
      // if(h_games_clone[x].gameName == 'kagaming') {

      //   if(window.language.locale == "zh") {
      //     image = "/img/sidebar/hotgames/ka-hotgame_zh.png"
      //   } else {
      //     image = "/img/sidebar/hotgames/ka-hotgame-new.png"
      //   }

      //   if(!parseInt(window.reel_yn)) {
      //     reelaccess = "no-access"
      //   } else {
      //     reelaccess = ""
      //   }

      //   text = window.language.lobby.kagamingreelcaps;
      //   data = "kagaming"

      // }
      $(".hotgame-wrap.clearfix").prepend(
        "<div class='hotgame__con "+reelaccess + comingsoon+"' data = '"+data+"'>"
        +"<div class='hotgame__name'><span>"+text+"</span></div>"
        +"<div class='hotgame__thumbnail'>"
        +"<div class='hotgame--img-wrap'><img src='"+image+"' alt=''></div>"
        +"</div>"
        +"</div>"
      )
    }


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

    this.context.component_userbased.main(this.roomTables, this.sicboTables);

    //baccarat main
    this.context.component_baccarat.main(this.baccaratTables, "normal");
    this.context.toggle.init();

  },
  setResult(data) {
    all_tables.forEach( (e,x) => {
      switch(`${e.gameName} ${data.gameName} ${data.tableId}` ) {
        case "Sicbo Sicbo "+e.tableNumber :
        e.marks.shift();
        e.marks.push(data.mark);
        if(this.context.finishedLoad) {
          this.context.component_banner.setResultUserBased(e, data.gameName);
        }
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

        if(this.context.finishedLoad) {
          this.context.component_banner.setResult(e);
        }
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

        if(this.context.finishedLoad) {
          this.context.component_banner.setResultUserBased(e, data.gameName);
        }
        break;

      } // end switch
    });

    if(!this.context.finishedLoad) return

    /** updating landing roadmarks */
    for(var x = 0; x < this.hotLiveGames.length; x++) {
      if(`${data.gameName}/${data.tableId}` == this.hotLiveGames[x].namespace) {
        // this.context.component_landing.makeRoadmap(this.hotLiveGames[x], x)
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
      break;
      case "Poker" :
      this.context.component_poker.setResult(this.pokerTables, data.gameName, data.tableId);
      break;
      case "Pai-Gow" :
      this.context.component_paigow.setResult(this.paigowTables, data.gameName, data.tableId);
      break;
    }
  },
  setTimer(data) {
    function timerStartHandle(target, disp = 'list') {
      if(disp == 'list') {
        target.list_tables.bettingStart = true

        if(!_.find(target.data.maintenanceSetting, (e) => { return e.status == 1}) || window.userAuthority == "admin") {
          target.list_tables.timer.visible = true;
        } else {
          target.list_tables.timer.visible = false;
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

        target.list_tables.status.text = window.language.lobby.nowbetting;
        target.list_tables.timer.timer(data.bettingTime, data.totalTime)
      } else {
        target.thumb_tables.bettingStart = true

        if(!_.find(target.data.maintenanceSetting, (e) => { return e.status == 1})) {
          target.thumb_tables.timer.visible = true;
        } else {
          target.thumb_tables.timer.visible = false;
        }

        target.thumb_tables.status.text = window.language.lobby.nowbetting;
        target.thumb_tables.timer.timer(data.bettingTime, data.totalTime)
      }

    } // end timer start
    function timerEndHandle(target, disp = 'list') {
      if(disp == 'list') {
        target.list_tables.status.text = window.language.lobby.bettingend;
        target.list_tables.timer.visible = false;
        target.list_tables.bettingStart = false;
      } else {
        target.thumb_tables.status.text = window.language.lobby.bettingend;
        target.thumb_tables.timer.visible = false;
        target.thumb_tables.bettingStart = false;
      }

    } // end timer tend

    // == banner
    if(data.bettingTime <= 0) {

      if(this.context.component_banner.currentSelected) {
        if(data.gameName =="Baccarat" || data.gameName =="Dragon-Tiger"|| data.gameName =="Poker" || data.gameName =="Sicbo" || data.gameName == "Pai-Gow") {
          if(this.context.component_banner.currentSelected == `${data.gameName}/${data.tableId}`) {
            this.context.component_banner.gameStatus.text = window.language.lobby.bettingend;
          }
        }
      }
      // if() {
      //
      // }

    } // end if

    switch(data.gameName) {
      case "Baccarat" :
        if(!this.context.component_baccarat.stage_list.length) return;
        if(!this.context.component_baccarat.stage_thumb.length) return;

        for(var x = 0; x < this.context.component_baccarat.stage_list.length; x++) {
          if(!this.context.component_baccarat.stage_list[x].data) continue;
          if(this.context.component_baccarat.stage_list[x].data.tableNumber == data.tableId) {
            if(!this.context.component_baccarat.stage_list[x].list_tables.bettingStart) {
              timerStartHandle(this.context.component_baccarat.stage_list[x]);
            } // end of !betting start

            if(data.bettingTime <= 0) {
              timerEndHandle(this.context.component_baccarat.stage_list[x])
            }
          }
        } // end list


        for(var x = 0; x < this.context.component_baccarat.stage_thumb.length; x++) {
          if(!this.context.component_baccarat.stage_thumb[x].data) continue;
          if(this.context.component_baccarat.stage_thumb[x].data.tableNumber == data.tableId) {
            if(!this.context.component_baccarat.stage_thumb[x].thumb_tables.bettingStart) {
              timerStartHandle(this.context.component_baccarat.stage_thumb[x], 'thumbnail');
            } // end of !betting start

            if(data.bettingTime <= 0) {
              timerEndHandle(this.context.component_baccarat.stage_thumb[x], 'thumbnail')
            }
          }
        } // end list

        break;
      case "Dragon-Tiger" :
        if(!this.context.component_dragonTiger.stage_list.length) return;
        for(var x = 0; x < this.context.component_dragonTiger.stage_list.length; x++) {
          if(!this.context.component_dragonTiger.stage_list[x].data) continue;
          if(this.context.component_dragonTiger.stage_list[x].data.tableNumber == data.tableId) {
            if(!this.context.component_dragonTiger.stage_list[x].list_tables.bettingStart) {
              timerStartHandle(this.context.component_dragonTiger.stage_list[x]);
            } // end of !betting start
            if(data.bettingTime <= 0) {
              timerEndHandle(this.context.component_dragonTiger.stage_list[x])
            }
          }
        }
        break;
      case "Sicbo" :
        if ($('#sicbo-userbased').hasClass('active')) {
          if(!this.context.component_banner.stage.list_tables.bettingStart) {
            timerStartHandle(this.context.component_banner.stage, 'list');
          }
          if(data.bettingTime <= 0) {
            timerEndHandle(this.context.component_banner.stage, 'list');
          }
        }

        if(!this.context.component_sicbo.stage_list.length) return;
        for(var x = 0; x < this.context.component_sicbo.stage_list.length; x++) {
          if(!this.context.component_sicbo.stage_list[x].data) continue;
          if(this.context.component_sicbo.stage_list[x].data.tableNumber == data.tableId) {
            if(!this.context.component_sicbo.stage_list[x].list_tables.bettingStart) {
              timerStartHandle(this.context.component_sicbo.stage_list[x]);
            } // end of !betting start
            if(data.bettingTime <= 0) {
              timerEndHandle(this.context.component_sicbo.stage_list[x])
            }
          }
        }
        break;
      case "Poker" :
        if(!this.context.component_poker.stage_list.length) return;
        for(var x = 0; x < this.context.component_poker.stage_list.length; x++) {
          if(!this.context.component_poker.stage_list[x].data) continue;
          if(this.context.component_poker.stage_list[x].data.tableNumber == data.tableId) {
            if(!this.context.component_poker.stage_list[x].list_tables.bettingStart) {
              timerStartHandle(this.context.component_poker.stage_list[x]);
              switch(data.type) {
                case "flop" :
                this.context.component_poker.stage_list[x].list_tables.status.text = window.language.poker.betflop;
                break;
                case "river" :
                this.context.component_poker.stage_list[x].list_tables.status.text = window.language.poker.betriver;
                break;
                case "turn" :
                this.context.component_poker.stage_list[x].list_tables.status.text = window.language.poker.betturn;
                break;
              }
            } // end of !betting start
            if(data.bettingTime <= 0) {
              timerEndHandle(this.context.component_poker.stage_list[x])
            }
          }
        }
        break;
        case "Pai-Gow" :
        if ($('#paigow-userbased').hasClass('active')) {
          if(!this.context.component_banner.stage.list_tables.bettingStart) {
            timerStartHandle(this.context.component_banner.stage, 'list');
          }
          if(data.bettingTime <= 0) {
            timerEndHandle(this.context.component_banner.stage, 'list');
          }
        }

        if(!this.context.component_paigow.stage_list.length) return;
        for(var x = 0; x < this.context.component_paigow.stage_list.length; x++) {
          if(!this.context.component_paigow.stage_list[x].data) continue;
          if(this.context.component_paigow.stage_list[x].data.tableNumber == data.tableId) {
            if(!this.context.component_paigow.stage_list[x].list_tables.bettingStart) {
              timerStartHandle(this.context.component_paigow.stage_list[x]);
            } // end of !betting start
            if(data.bettingTime <= 0) {
              timerEndHandle(this.context.component_paigow.stage_list[x])
            }
          }
        }
        break;

    }
  },
  dt_card_info : {'burn': null, 'tiger': null, 'dragon' : null},
  setCardSwipe (data) {

    if(data.gameName == "Sicbo") return;

    window.all_tables.forEach((table)=>{
      if(table.gameName == data.gameName && table.tableNumber == data.tableId ) {
        table.roundStatus = 'P';
        if(table.gameName != "Dragon-Tiger") {
          table.gameInfo = data.gameInfo
        } else if(table.gameName == "Dragon-Tiger") {
          this.dt_card_info[data.type] = data.value;
          table.gameInfo = _.pickBy(data.gameInfo, (value, key)=>{ return value; });
        }
      }
    });

    if(!this.context.finishedLoad) return
    // == banner
    if(this.context.component_banner.currentSelected) {
      if(data.gameName =="Baccarat" || data.gameName =="Dragon-Tiger"|| data.gameName =="Poker" || data.gameName =="Pai-Gow") {
        if(this.context.component_banner.currentSelected == `${data.gameName}/${data.tableId}`) {
          this.context.component_banner.gameStatus.text = window.language.lobby.dealing;
        }
      }
    }

    switch(data.gameName) {
      case "Baccarat" :
      data.roundStatus = 'P';
      this.context.component_baccarat.inputResult(this.context.toggle.sortData(this.baccaratTables, "normal"), data);

      if(!this.context.component_baccarat.stage_list.length) return;
      for(var x = 0; x < this.context.component_baccarat.stage_list.length; x++) {
        if(!this.context.component_baccarat.stage_list[x].data) continue;
        if(this.context.component_baccarat.stage_list[x].data.tableNumber == data.tableId) {
          this.context.component_baccarat.stage_list[x].list_tables.status.text = window.language.lobby.dealing;
        }
      }
      break;
      case "Dragon-Tiger" :
      if(data.type === "burn") return;
      this.context.component_dragonTiger.inputResult(this.dragontigerTables, data);

      if(!this.context.component_dragonTiger.stage_list.length) return;
      for(var x = 0; x < this.context.component_dragonTiger.stage_list.length; x++) {
        if(!this.context.component_dragonTiger.stage_list[x].data) continue;
        if(this.context.component_dragonTiger.stage_list[x].data.tableNumber == data.tableId) {
          this.context.component_dragonTiger.stage_list[x].list_tables.status.text = window.language.lobby.dealing;
        }
      }
      break;
      case "Poker" :
      if(this.isBurnCard(data)) return;
      this.context.component_poker.inputResult(this.pokerTables, data);
      if(!this.context.component_poker.stage_list.length) return;
      for(var x = 0; x < this.context.component_poker.stage_list.length; x++) {
        if(!this.context.component_poker.stage_list[x].data) continue;
        if(this.context.component_poker.stage_list[x].data.tableNumber == data.tableId) {
          this.context.component_poker.stage_list[x].list_tables.status.text = window.language.lobby.dealing;
        }
      }
      break;
      case "Pai-Gow" :
      if(data.type.indexOf('dices') > -1 || data.type == "seat") return;
      this.context.component_paigow.inputResult(this.paigowTables, data);
      if(!this.context.component_paigow.stage_list.length) return;
      for(var x = 0; x < this.context.component_paigow.stage_list.length; x++) {
        if(!this.context.component_paigow.stage_list[x].data) continue;
        if(this.context.component_paigow.stage_list[x].data.tableNumber == data.tableId) {
          this.context.component_paigow.stage_list[x].list_tables.status.text = window.language.lobby.dealing;
        }
      }
      // == userbased banner handle
      if (this.context.component_banner.currentSelected) {
        this.context.component_banner.setInputItemUserBased(data, data.gameName, data.tableId);
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

    // == banner handle
    if (this.context.component_banner.currentSelected) {
      this.context.component_banner.setNewround(all_tables, data.gameName, data.tableId, data.meta);
      if(this.context.component_banner.currentSelected == data.gameName+"/"+data.tableId) {
        if(this.context.component_banner.card_result_container) {
          this.context.component_banner.card_result_container.removeAllChildren();
        }
      }
    }

    function handleNewRound(target, disp = 'list') {
      if(disp == 'list') {
        target.list_tables.round_num.text = data.roundNum
        if(target.list_tables.card_result_container) {
          target.list_tables.card_result_container.removeAllChildren()
          target.list_tables.status.text =  window.language.lobby.nowbetting
        }
      } else {
        target.thumb_tables.status.text =  window.language.lobby.nowbetting
      }
    }

    switch(data.gameName) {
      case "Baccarat" :
        for(var x = 0; x < this.context.component_baccarat.stage_list.length; x++) {
          if(!this.context.component_baccarat.stage_list[x].data) continue;
          if(this.context.component_baccarat.stage_list[x].data.tableNumber == data.tableId) {
            this.context.component_baccarat.stage_list[x].isUpdate = true;
            handleNewRound(this.context.component_baccarat.stage_list[x]);
            this.handleBaccaratUpdate(x, this)

            this.context.component_baccarat.resetRoomInfo(x);
          }
        }
        break;
      case "Dragon-Tiger" :
        for(var x = 0; x < this.context.component_dragonTiger.stage_list.length; x++) {
          if(!this.context.component_dragonTiger.stage_list[x].data) continue;
          if(this.context.component_dragonTiger.stage_list[x].data.tableNumber == data.tableId) {
            handleNewRound(this.context.component_dragonTiger.stage_list[x])

            this.context.component_dragonTiger.resetRoomInfo(x);
          }
        }
        break;
      case "Sicbo" :
        for(var x = 0; x < this.context.component_sicbo.stage_list.length; x++) {
          if(!this.context.component_sicbo.stage_list[x].data) continue;
          if(this.context.component_sicbo.stage_list[x].data.tableNumber == data.tableId) {
            handleNewRound(this.context.component_sicbo.stage_list[x])

            this.context.component_sicbo.resetRoomInfo(x);
          }
        }
        break;
      case "Poker" :
        for(var x = 0; x < this.context.component_poker.stage_list.length; x++) {
          if(!this.context.component_poker.stage_list[x].data) continue;
          if(this.context.component_poker.stage_list[x].data.tableNumber == data.tableId) {
            handleNewRound(this.context.component_poker.stage_list[x])
          }
        }
        break;
        case "Pai-Gow" :
        for(var x = 0; x < this.context.component_paigow.stage_list.length; x++) {
          if(!this.context.component_paigow.stage_list[x].data) continue;
          if(this.context.component_paigow.stage_list[x].data.tableNumber == data.tableId) {
            this.context.component_paigow.checkReset(this.paigowTables[x], data.gameName, x)
            handleNewRound(this.context.component_paigow.stage_list[x]);

            this.context.component_paigow.resetRoomInfo(x);
          }
        }
        break;
    }
  },

  setCreateRoom (data) {
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
      type = 'Paigow';
    }

    rooms.unshift({'banker': bankerdata, 'data': data.data.id.split(/[|:]/)});

    if(toggle.getCurrentOpen().toLowerCase().indexOf(type.toLowerCase()) > -1) {
      this.context.component_userbased.createTables(rooms, gameTables, type);
    }

  }, //setCreateRoom
  setRemoveRoom (data) {
    console.log(data, "remove_room event === room-event");
    let removedata = data.data.roomId.split(/[|:]/);
    let count = 0;
    window.isBanker = false;

    // temp
    let rooms = this.roomTables;
    var gameName = data.gameName;
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
          this.context.component_userbased.createTables(rooms, gameTables, type);
          this.context.component_banner.bannerUserBased(gameTables[0], gamename_param, rooms);
        }
        window.isBanker = false;
      }

      count++;
    });
  }, //setRemoveRoom
  setUserCount(data) {
    console.log("setUserCount", data);
    let gameName = data.gameName;
    let rooms = this.roomTables;
    let gameTables = this.sicboTables[0];
    let type = 'Sicbo';

    if(gameName.toLowerCase() == 'pai-gow') {
      rooms = this.paigow_roomTables;
      gameTables = this.paigowTables[1];
      type = 'Paigow';
    }

    console.log(rooms, "setUserCount");
    rooms.forEach((row)=>{
      console.log(row.data[8], "setUserCount *******", data.roomId);
      if(row.data[8] == data.roomId) {
				row.banker.users = parseInt(data.userCount);
        if(toggle.getCurrentOpen().toLowerCase().indexOf(type.toLowerCase()) > -1) {
          this.context.component_userbased.createTables(rooms, gameTables, type);
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

    console.log("setUserLeave", game, data);

    if(game.toLowerCase() == 'pai-gow') game = 'paigow';

    if(game.toLowerCase() == 'paigow' || game.toLowerCase() == 'pai-gow') {
      rooms = this.paigow_roomTables;
      gameTables = this.paigowTables[1];
      type = 'Paigow';
    }

    rooms.forEach((row)=>{
      if(row.data[8] == data.data.roomId) {
        row.banker.users--;
        if(toggle.getCurrentOpen().toLowerCase().indexOf(type.toLowerCase()) > -1) {
          this.context.component_userbased.createTables(rooms, gameTables, type);
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
          this.context.component_userbased.createTables(rooms, gameTables, type);
        }
			}
    });

  }, //setBankerMoney
  setIsPublic (data) {

    let game = data.data.id.split("|")[2];

    let rooms = this.roomTables;
    let gameTables = this.sicboTables[0];
    var type = 'Sicbo';

    if(game.toLowerCase() == 'pai-gow') game = 'paigow';

    if(game.toLowerCase() == 'paigow') {
      rooms = this.paigow_roomTables;
      gameTables = this.paigowTables[1];
      type = 'Paigow';
    }

    rooms.forEach((row)=>{
      if(row.data[8] == data.data.roomId) {
        row.banker.password = data.data.isPublic === true ? '' : true;
        if(toggle.getCurrentOpen().toLowerCase().indexOf(type.toLowerCase()) > -1) {
          this.context.component_userbased.createTables(rooms, gameTables, type);
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
