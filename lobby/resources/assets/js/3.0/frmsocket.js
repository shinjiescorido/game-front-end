import Xpacket from '../lib/XPacket';
import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas, createSpriteRoadMap, setCurrentTimezone } from '../factories/factories';

window.all_tables = [];

let instance = {
  main () {
    window.maintenance = typeof window.maintenance === 'string' ? JSON.parse(window.maintenance) : window.maintenance;

    if(parseInt(window.maintenance.status)) {
      if(window.userAuthority != "admin") {
        $(".maintenanceOverlay").show();
      }
      this.context.mainmaintenancechange(typeof window.maintenance === 'string' ? JSON.parse(window.maintenance) : window.maintenance)
    }


    $("#maintenanceOnn").on("click", ()=> {
      var gameName = $("#maintenance-gamename").val();
      var gametable = $("#maintenance-tableid").val();

      this.context.maintenanceChange({
        gameName : gameName,
        tableId : gametable,
        data:{"status":1,"division":"Periodic","end_time":"2018-08-06 07:00","sub_text":"2","main_text":"2","start_time":"2018-08-06 01:00"}
      });
    });

    $("#maintenanceOff").on("click", ()=> {
      var gameName = $("#maintenance-gamename").val();
      var gametable = $("#maintenance-tableid").val();

      this.context.maintenanceChange({
        gameName : gameName,
        tableId : gametable,
        data:{"status":0,"division":"Periodic","end_time":"2018-08-06 07:00","sub_text":"2","main_text":"2","start_time":"2018-08-06 01:00"}
      });
    });


    $("#enable").on("click", ()=> {
      var gameName = $("#maintenance-gamename").val();
      var gametable = $("#maintenance-tableid").val();

      this.context.enableDsiableChange({
        gameName : gameName,
        tableId : gametable,
        status : 0
      });
    });

    $("#disable").on("click", ()=> {
      var gameName = $("#maintenance-gamename").val();
      var gametable = $("#maintenance-tableid").val();

      this.context.enableDsiableChange({
        gameName : gameName,
        tableId : gametable,
        status : 1
      });
    });


    window.socketConnect = () => {

    this.socket = io.connect(window.socket+'all', { transports: ['websocket']}),
    this.socket.on('connect', (e) => {
      this.socket.emit('register', {id: window.userId});
    });

    this.socket.on('disconnect', (e) => {
      this.socket.disconnect();
      this.context.isInit = false;
      window.socketConnect();
      $("#all-container").empty();
      $("#other-container").empty();
      $("#junket-baccarat-list").empty();
      $("#junket-other-list").empty();
      this.context.games =[];
    });


    this.socket.on('data', (data) => {
      data = Xpacket.received(data)

      switch(data.eventName) {
        case "reject":
          window.location = "/rejected"
          break;
        case "init":

          console.log('init data', data)

          // this.context.allGames =  _.sortBy(data.data, ['gameName', byKey('tableNumber')]);

          window.all_tables = _.cloneDeep(data.data);

          window.all_tables = _.sortBy(window.all_tables, function (e) {
            let table = e.tableNumber.length > 1 ? e.tableNumber : `0${e.tableNumber}`;
            return `${e.gameName}/${table}`//e.namespace
          });

          let maintenanceGames = [];
          let games = window.all_tables;

          //check maintenance games to store
          if(window.userAuthority != 'admin') {
            for(var x = 0; x < games.length;x++) {
              let maintenanceCheck = {};

              if(games[x].gameName.indexOf('Baccarat') > -1 || games[x].gameName.indexOf('Poker') > -1) {
                maintenanceCheck = _.find(games[x].maintenanceSetting.maintenance, function (e) {
                  return _.find(e.info, function (a) {return a.status === 1})
                })
              } else {
                maintenanceCheck = _.find(games[x].maintenanceSetting, function(e) {
                  return e.status === 1
                });
              }
              if(!_.isEmpty(maintenanceCheck)) {
                maintenanceGames.push(games[x]);
              }
            }

            let temp = _.filter(games, function (disp) {
              return !_.find(maintenanceGames, function(e){return e.namespace == disp.namespace});
            });

            maintenanceGames = _.sortBy(maintenanceGames, function (e) {
              let table = e.tableNumber.length > 1 ? e.tableNumber : `0${e.tableNumber}`;
              return `${e.gameName}/${table}`//e.namespace
            });

            temp.push(...maintenanceGames);
            window.all_tables = temp;
          }

          //check paigow//
          // let pg_table = _.find(window.all_tables, function (e) {return e.gameName == 'Pai-Gow'});

          // window.all_tables = _.filter(window.all_tables, function (e) {
          //   return e.gameName != 'Pai-Gow';
          // });

          // if(window.userAuthority == 'admin') {
          //   window.all_tables.push(pg_table);
          // }

          this.context.allGames = window.all_tables;

          window.dealerImg =[];

          $.post(`/getDealerImg`, {dealerId : _.map(this.context.allGames, function(e){return e.dealerId})},  (response) => {
            window.dealerImg = response;
            this.context.handleDealerimg()
          });

          this.links = {
            baccaratlogs: "/baccaratlogs/baccarat",
            pokerlogs: "/pokerlogs/poker",
            sicbologs: "/sicbologs/sicbo",
            dragontigerlogs: "/dragontigerlogs/dragontiger",
            paigowlogs: "/paigowlogs/paigow",
            alllogs: "/alllogs",
          }

          this.socket.emit('data',{
            eventName: 'get_vendor_junket_room',
            vendor: window.vendor_id
          },(roomdata)=>{
            console.log('roomdata',roomdata); // result of rooms

            let rooms = _.cloneDeep(roomdata);
            let temproom = [];
            for (var key in rooms) {
              let split_data = key.split(/[|:]+/);

              let split_objt= {};
              split_objt.roomTable = split_data[1];
              split_objt.vendorId = split_data[2];
              split_objt.roomName = split_data[3];
              split_objt.gameName = split_data[4];
              split_objt.roomType = split_data[5];
              split_objt.token = split_data[6];
              split_objt.betRange = split_data[7];
              split_objt.maxPlayer = split_data[8];
              split_objt.roomId = split_data[9];
              split_objt.namespace = split_data[4]+'/'+split_data[1];
              split_objt.avatar = rooms[key].avatar;
              split_objt.money = rooms[key].money;
              split_objt.password = rooms[key].password;
              split_objt.users = rooms[key].users;
              split_objt.userId = rooms[key].banker.user_id;
              split_objt.userName = rooms[key].banker.user_name;
              split_objt.isMulti = rooms[key].isMulti;
              split_objt.gameDuration = rooms[key].expireDateUTC;
              split_objt.seatMates = rooms[key].seatMates;
              split_objt.slave = rooms[key].slave;
              split_objt.roundCount = rooms[key].roundCount;
              split_objt.balance = rooms[key].balance;

              temproom.push(split_objt)
            }

            this.context.allRooms = _.filter(temproom, function(e) {
              return e.vendorId == window.vendor_id;
            });
            window.all_Rooms =  this.context.allRooms;

            console.log('11: ', window.all_tables)
            console.log("all games", this.context.allGames);
            console.log("all rooms", this.context.allRooms);

            if(!this.context.finishedLoad) return
            if (window.isJunket > 0 && window.all_tables.length) {
              console.log("all rooms 222", this.context.allRooms);
              // this.context.createJunketGames(window.all_tables, this.context.allRooms);
              this.context.createJunketGamesMod(window.all_tables, this.context.allRooms);
            }
          });

          this.context.toggle.init();

          if(!this.context.finishedLoad) return
          // setTimeout(() => {
          if (window.isJunket > 0) {
            // this.context.createJunketGames(this.context.allGames, this.context.allRooms);
          } else {
            this.context.createGames(this.context.allGames);
          }
          // }, 800)
          break;

        case "mainmaintenancechange":
          this.context.mainmaintenancechange(data.data);
          break;
        case "maintenanceChange":
          this.context.maintenanceChange(data);
          break;
        case "setbettingtime":
          this.context.setBettingTime(data);
          break;
        case "inputitem":
          this.context.inputItem(data);
          break;
        case "displayresults" :
          this.context.displayResult(data);
          break;
        case "newround":
          this.context.newround(data);
          break;
        case "shoechange":
          this.context.shoechange(data);
          break;
        case "dealerchange":
          this.context.dealerChange(data);
          break;
        case "updatecredits":
          this.context.updateCredits(data);
          break;
        case "mainnoticechange":
          break;
        case "bets":
          this.context.setRoomInfo(data);
          break;
        case "displayRollback":
          console.log(data, "displaymodify")
          this.context.displayRollback(data);
          break;
        case "displaymodify":
          this.context.displaymodify(data);
          break;
        case "removeitem":
          break;
          //room events
        case "create_room":
          if(!window.isJunket) return; //filter for users not in junket

          let split_objt = {};
          let getdata = data.data;
    			let split_data = getdata.id.split(/[|:]+/);

    			split_objt.roomTable = split_data[1];
    			split_objt.vendorId = split_data[2];
    			split_objt.roomName = split_data[3];
    			split_objt.gameName = split_data[4];
    			split_objt.roomType = split_data[5];
    			split_objt.token = split_data[6];
    			split_objt.betRange = split_data[7];
    			split_objt.maxPlayer = split_data[8];
    			split_objt.roomId = split_data[9];
    			split_objt.namespace = split_data[4]+'/'+split_data[1];
    			split_objt.avatar = getdata.avatar;
    			split_objt.money = getdata.money;
    			split_objt.password = getdata.password;
    			split_objt.users = getdata.users;
    			split_objt.userId = getdata.banker.user_id;
          split_objt.roundCount = getdata.roundCount;
    			split_objt.userName = getdata.banker.user_name;
    			split_objt.isMulti = getdata.isMulti;
    			split_objt.gameDuration = getdata.expireDateUTC;
          split_objt.slave = getdata.slave;
          split_objt.balance = getdata.balanceBet;


          data = split_objt;

          if(data.vendorId != window.vendor_id) return;

          this.context.createRooms(data, true);
          this.context.setRoomLimitDisp();


          for (var i = 0; i < this.context.games.length; i++) {
            if(this.context.games[i].namespace == data.namespace) {
              // this.context.games[i].roomdata.push(data);
              this.context.games[i].checkRoom(data,'create');
              //populate room data after success create
            }
          }

          this.context.checkingEnterCreate(data);

          console.log("data create", data);
          this.context.changeTableHeaderBg(data.slave);
          // if(window.isJunket ==1) {
          //   if($("#junket-baccarat").hasClass('active')) {
          //     let bc = _.filter(window.all_Rooms, function (e) {return e.namespace.indexOf('Baccarat') > -1});
          //     console.log(bc, "asdhaskdsadjahjdsd")
          //     if(!bc.length) {
          //       $('#junket-no-rooms').show();
          //     } else {
          //       $('#junket-no-rooms').hide();
          //     }
          //   } else {
          //     let other = _.filter(window.all_Rooms, function (e) {return e.namespace.indexOf('Baccarat') <= -1});
          //     console.log(other, "asdhaskdsadjahjdsd")
          //     if(!other.length) {
          //       $('#junket-no-rooms').show();
          //     } else {
          //       $('#junket-no-rooms').hide();
          //     }
          //   }
          // }
          break;
        case "remove_room":
          if(!window.isJunket) return; //filter for users not in junket

          split_objt = {};
          getdata = data.data;
    			split_data = getdata.roomId.split(/[|:]+/);

          split_objt.roomTable = split_data[1];
    			split_objt.vendorId = split_data[2];
    			split_objt.roomName = split_data[3];
    			split_objt.gameName = split_data[4];
    			split_objt.roomType = split_data[5];
    			split_objt.token = split_data[6];
    			split_objt.betRange = split_data[7];
    			split_objt.maxPlayer = split_data[8];
    			split_objt.roomId = split_data[9];
    			split_objt.namespace = split_data[4]+'/'+split_data[1];

          data = split_objt;

          console.log("data remove", data);

          // $('.room-con').removeClass('active');
          if(data.vendorId != window.vendor_id) return;

          $(`.room--${data.token}`).remove();
          // $('.room-con').removeClass('.active')

          for (var i = 0; i < window.all_Rooms.length; i++) {
            if(window.all_Rooms[i].token == data.token) {
              window.all_Rooms.splice(i, 1)
              i--;
            }
          }

          for (var i = 0; i < this.context.games.length; i++) {
            if(this.context.games[i].namespace == data.namespace) {
              //removing removed room from roomdata array
              this.context.games[i].roomdata = _.filter(this.context.games[i].roomdata, function (e) {return e.token != data.token});

              this.context.games[i].checkRoom(data, 'remove');
            }
          }
          this.context.setRoomLimitDisp();
          this.context.checkingEnterCreate(data);

          if(window.isJunket) {
            $('#junket-baccarat-list, #junket-other-list').empty()
            // this.context.createJunketGames(window.all_tables, window.all_Rooms)
            this.context.createJunketGamesMod(window.all_tables, window.all_Rooms)
          }

          this.context.changeTableHeaderBg();


          // if(window.isJunket ==1) {
          //   if($("#junket-baccarat").hasClass('active')) {
          //     let bc = _.filter(window.all_Rooms, function (e) {return e.namespace.indexOf('Baccarat') > -1});
          //     console.log(bc, "asdhaskdsadjahjdsd")
          //     if(!bc.length) {
          //       $('#junket-no-rooms').show();
          //     } else {
          //       $('#junket-no-rooms').hide();
          //     }
          //   } else {
          //     let other = _.filter(window.all_Rooms, function (e) {return e.namespace.indexOf('Baccarat') <= -1});
          //     console.log(other, "asdhaskdsadjahjdsd")
          //     if(!other.length) {
          //       $('#junket-no-rooms').show();
          //     } else {
          //       $('#junket-no-rooms').hide();
          //     }
          //   }
          // }
          break;
        case "update_banker_credits":
          break;
        case "room_player_left":
          if(!window.isJunket) return;
          this.context.setRoomUserCount(data, 'leave')
          break;
        case "room_user_count":
          break;
        case "lobby_update_room":
          break;
        case "get_junket_room":
          if(!window.isJunket) return; //filter for users not in junket
          console.log("crash", data);
          break;
        case "get_room_bet_info":
          if(!window.isJunket) return; //filter for users not in junket
          break;
        case "disband_room":
          if(!window.isJunket) return; //filter for users not in junket
          break;
        case "edit_user_junket_room_range":
          if(!window.isJunket) return; //filter for users not in junket
          break;
        case "junket_room_mates":
          if(!window.isJunket) return; //filter for users not in junket
          break;
        case "junket_flipper_who":
          if(!window.isJunket) return; //filter for users not in junket
          break;
        case "get_room_bet_info":
          if(!window.isJunket) return; //filter for users not in junket
          break;
        case "junket_joiners":
          if(!window.isJunket) return; //filter for users not in junket
          this.context.setRoomUserCount(data, 'join')
          break;

        case "disablechange":
          //sample event for ordering and setting enable disable
          console.log(data, "::::enableDsiableChange")
          this.context.enableDsiableChange(data);
          break;


      } //end of switch

      function byKey(key) {
        return function (o) {
          var v = parseInt(o[key], 10);
          return isNaN(v) ? o[key] : v;
        };
      }
    });

    } //end socket connect func

    window.socketConnect();
  } //end main
} //end instance

export default {instance};
